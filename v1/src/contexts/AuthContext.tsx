import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { api, authApi, User } from '../lib/api';

interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  passwordConfirmation: string;
  storeName: string;
  storeSlug: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ requiresVerification?: boolean; email?: string }>;
  register: (data: RegisterData) => Promise<void>;
  verifyOTP: (email: string, otp: string) => Promise<void>;
  resendOTP: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  setDemoUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadUser = useCallback(async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setIsLoading(false);
        return;
      }

      api.setToken(token);
      const response = await authApi.me();
      if (response.success && response.data) {
        setUser(response.data);
      } else {
        // Token inválido ou API inacessível
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        api.setToken(null);
      }
    } catch {
      // API não disponível — limpar tokens
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      api.setToken(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Verificar se temos um user salvo localmente (demo mode)
    const savedUser = localStorage.getItem('tvloja_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
        setIsLoading(false);
        return;
      } catch {
        localStorage.removeItem('tvloja_user');
      }
    }

    const token = localStorage.getItem('accessToken');
    if (token) {
      loadUser();
    } else {
      setIsLoading(false);
    }
  }, [loadUser]);

  const setDemoUser = () => {
    const demoUser: User = {
      id: 'demo-001',
      email: 'demo@tvloja.com.br',
      name: 'Usuário Demo',
      role: 'owner',
      emailVerified: true,
      tenant: {
        id: 'tenant-001',
        name: 'Minha Loja Demo',
        slug: 'minha-loja',
        plan: 'starter',
      },
    };
    setUser(demoUser);
    localStorage.setItem('tvloja_user', JSON.stringify(demoUser));
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await authApi.login(email, password);
      
      if (response.data?.requiresVerification) {
        return { requiresVerification: true, email };
      }

      if (response.data?.accessToken) {
        api.setToken(response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        setUser(response.data.user);
      }
      return {};
    } catch {
      // Se a API não está disponível, usar modo demo
      throw { message: 'Servidor indisponível. Use o modo demo.' };
    }
  };

  const register = async (data: RegisterData) => {
    try {
      await authApi.register(data);
    } catch {
      throw { message: 'Servidor indisponível. Tente novamente mais tarde.' };
    }
  };

  const verifyOTP = async (email: string, otp: string) => {
    try {
      await authApi.verifyOTP(email, otp);
    } catch {
      throw { message: 'Erro ao verificar código.' };
    }
  };

  const resendOTP = async (email: string) => {
    try {
      await authApi.resendOTP(email);
    } catch {
      throw { message: 'Erro ao reenviar código.' };
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch {
      // Ignore errors on logout
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('tvloja_user');
      api.setToken(null);
      setUser(null);
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      await authApi.forgotPassword(email);
    } catch {
      throw { message: 'Erro ao enviar email de recuperação.' };
    }
  };

  const resetPassword = async (token: string, password: string) => {
    try {
      await authApi.resetPassword(token, password, password);
    } catch {
      throw { message: 'Erro ao redefinir senha.' };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        verifyOTP,
        resendOTP,
        logout,
        forgotPassword,
        resetPassword,
        setDemoUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
