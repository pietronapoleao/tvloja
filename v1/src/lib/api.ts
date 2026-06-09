// API Client for TVLoja Backend
const API_URL = 'http://localhost:3333/api/v1';

interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  errors?: Record<string, string[]>;
}

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('accessToken');
    }
  }

  setToken(token: string | null) {
    this.token = token;
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('accessToken', token);
      } else {
        localStorage.removeItem('accessToken');
      }
    }
  }

  getToken() {
    return this.token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      (headers as Record<string, string>)['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw {
          status: response.status,
          message: data.message || 'Erro na requisição',
          errors: data.errors,
        };
      }

      return data;
    } catch (error: unknown) {
      const err = error as { status?: number; message?: string };
      if (err.status) {
        throw error;
      }
      throw {
        status: 0,
        message: 'Erro de conexão. Verifique sua internet.',
      };
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async patch<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async put<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const api = new ApiClient(API_URL);

// Auth API
export const authApi = {
  register: (data: {
    name: string;
    email: string;
    phone: string;
    password: string;
    passwordConfirmation: string;
    storeName: string;
    storeSlug: string;
    planSlug?: string;
  }) => api.post('/auth/register', data),

  login: (email: string, password: string) =>
    api.post<{
      accessToken: string;
      refreshToken: string;
      user: User;
      requiresVerification?: boolean;
    }>('/auth/login', { email, password }),

  verifyOTP: (email: string, otp: string) =>
    api.post('/auth/verify-otp', { email, otp }),

  resendOTP: (email: string) =>
    api.post('/auth/resend-otp', { email }),

  forgotPassword: (email: string) =>
    api.post('/auth/forgot-password', { email }),

  resetPassword: (token: string, password: string, passwordConfirmation: string) =>
    api.post('/auth/reset-password', { token, password, passwordConfirmation }),

  refreshToken: (refreshToken: string) =>
    api.post<{ accessToken: string; refreshToken: string }>('/auth/refresh', { refreshToken }),

  logout: () => api.post('/auth/logout'),

  me: () => api.get<User>('/auth/me'),

  checkSlug: (slug: string) =>
    api.get<{ available: boolean }>(`/auth/check-slug/${slug}`),

  checkEmail: (email: string) =>
    api.get<{ available: boolean }>(`/auth/check-email/${encodeURIComponent(email)}`),
};

// Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: string;
  emailVerified: boolean;
  tenant?: {
    id: string;
    name: string;
    slug: string;
    plan?: string;
  };
}

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  email: string;
  phone?: string;
  status: 'active' | 'suspended' | 'cancelled';
  plan: string;
  createdAt: string;
}

// Tenant API
export const tenantApi = {
  getCurrent: () => api.get<Tenant>('/tenants/current'),
  update: (data: Partial<Tenant>) => api.patch('/tenants/current', data),
  getMetrics: () => api.get('/tenants/current/metrics'),
};

// Products API
export const productsApi = {
  list: (params?: { page?: number; limit?: number; status?: string; search?: string }) => {
    const query = new URLSearchParams();
    if (params?.page) query.set('page', params.page.toString());
    if (params?.limit) query.set('limit', params.limit.toString());
    if (params?.status) query.set('status', params.status);
    if (params?.search) query.set('search', params.search);
    return api.get(`/products?${query.toString()}`);
  },
  get: (id: string) => api.get(`/products/${id}`),
  create: (data: unknown) => api.post('/products', data),
  update: (id: string, data: unknown) => api.patch(`/products/${id}`, data),
  delete: (id: string) => api.delete(`/products/${id}`),
};

// Sites API
export const sitesApi = {
  getCurrent: () => api.get('/sites/current'),
  update: (data: unknown) => api.patch('/sites/current', data),
  saveSections: (sections: unknown[]) => api.put('/sites/current/sections', { sections }),
};

export interface Invoice {
  id: string;
  amount: number;
  status: 'paid' | 'pending' | 'cancelled' | 'overdue';
  dueDate: string;
  paidAt?: string;
  paymentUrl?: string;
  pdfUrl?: string;
}

export interface Subscription {
  id: string;
  planName: string;
  planSlug: string;
  status: 'active' | 'past_due' | 'trialing' | 'cancelled';
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  amount: number;
  interval: 'month' | 'year';
}

// Subscriptions API
export const subscriptionsApi = {
  getCurrent: () => api.get<Subscription>('/subscriptions/current'),
  getInvoices: () => api.get<Invoice[]>('/subscriptions/invoices'),
  getPlans: () => api.get('/subscriptions/plans'),
  createCheckout: (planSlug: string, billingCycle: 'monthly' | 'yearly') =>
    api.post<{ checkoutUrl: string }>('/subscriptions/checkout', { planSlug, billingCycle }),
  cancel: (reason?: string) => api.post('/subscriptions/cancel', { reason }),
  reactivate: () => api.post('/subscriptions/reactivate'),
};

// Admin Types
export interface AdminTenant {
  id: string;
  name: string;
  slug: string;
  ownerName: string;
  ownerEmail: string;
  plan: string;
  status: 'active' | 'suspended' | 'cancelled' | 'trialing';
  productsCount: number;
  mrr: number;
  createdAt: string;
  lastLoginAt?: string;
}

export interface AdminMetrics {
  totalTenants: number;
  activeTenants: number;
  trialingTenants: number;
  suspendedTenants: number;
  totalMrr: number;
  totalRevenue: number;
  pendingInvoices: number;
  overdueInvoices: number;
  churnRate: number;
  newTenantsThisMonth: number;
  mrrHistory: { month: string; value: number }[];
  tenantsByPlan: { plan: string; count: number }[];
}

export interface AdminInvoice {
  id: string;
  tenantName: string;
  tenantSlug: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue' | 'cancelled';
  dueDate: string;
  paidAt?: string;
}

// Admin API
export const adminApi = {
  getMetrics: () => api.get<AdminMetrics>('/admin/metrics'),
  
  getTenants: (params?: { page?: number; limit?: number; status?: string; search?: string; plan?: string }) => {
    const query = new URLSearchParams();
    if (params?.page) query.set('page', params.page.toString());
    if (params?.limit) query.set('limit', params.limit.toString());
    if (params?.status) query.set('status', params.status);
    if (params?.search) query.set('search', params.search);
    if (params?.plan) query.set('plan', params.plan);
    return api.get<{ tenants: AdminTenant[]; total: number }>(`/admin/tenants?${query.toString()}`);
  },

  getTenant: (id: string) => api.get<AdminTenant>(`/admin/tenants/${id}`),

  updateTenantStatus: (id: string, status: 'active' | 'suspended' | 'cancelled') =>
    api.patch(`/admin/tenants/${id}/status`, { status }),

  getInvoices: (params?: { page?: number; status?: string }) => {
    const query = new URLSearchParams();
    if (params?.page) query.set('page', params.page.toString());
    if (params?.status) query.set('status', params.status);
    return api.get<{ invoices: AdminInvoice[]; total: number }>(`/admin/invoices?${query.toString()}`);
  },

  getSystemHealth: () => api.get<{
    api: 'up' | 'down';
    database: 'up' | 'down';
    redis: 'up' | 'down';
    ssl: 'up' | 'down';
    uptime: number;
  }>('/admin/health'),
};

export default api;
