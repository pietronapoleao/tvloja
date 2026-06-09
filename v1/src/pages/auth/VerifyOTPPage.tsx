import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/Button';
import { OTPInput } from '../../components/ui/OTPInput';
import { authApi } from '../../lib/api';

export function VerifyOTPPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyOTP } = useAuth();
  
  const email = (location.state as { email?: string })?.email || '';
  
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (!email) {
      navigate('/auth/login');
    }
  }, [email, navigate]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleVerify = async (code: string) => {
    if (code.length !== 6) return;
    
    setError('');
    setIsLoading(true);

    try {
      await verifyOTP(email, code);
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/auth/login');
      }, 2000);
    } catch (err: unknown) {
      const error = err as { message?: string };
      setError(error.message || 'Código inválido');
      setOtp('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (value: string) => {
    setOtp(value);
    if (value.length === 6) {
      handleVerify(value);
    }
  };

  const handleResend = async () => {
    try {
      await authApi.resendOTP(email);
      setCountdown(60);
      setCanResend(false);
      setError('');
    } catch {
      setError('Erro ao reenviar código');
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-8 border border-gray-100">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Email verificado!
            </h2>
            <p className="text-gray-600">
              Redirecionando para o login...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <span className="text-white font-bold text-xl">TV</span>
            </div>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-8 border border-gray-100">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Verifique seu E-mail
            </h1>
            <p className="text-gray-600">
              Enviamos um código de 6 dígitos para<br />
              <strong className="text-gray-900">{email}</strong>
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl">
              <p className="text-sm text-red-600 text-center">{error}</p>
            </div>
          )}

          <div className="mb-6">
            <OTPInput
              value={otp}
              onChange={handleOtpChange}
              error={!!error}
              disabled={isLoading}
            />
          </div>

          <Button
            onClick={() => handleVerify(otp)}
            className="w-full"
            size="lg"
            isLoading={isLoading}
            disabled={otp.length !== 6}
          >
            Verificar código
          </Button>

          <p className="mt-6 text-center text-sm text-gray-500">
            Não recebeu o código?{' '}
            {canResend ? (
              <button
                type="button"
                onClick={handleResend}
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Reenviar código
              </button>
            ) : (
              <span className="text-gray-400">
                Reenviar em {countdown}s
              </span>
            )}
          </p>

          <div className="mt-6 text-center">
            <Link
              to="/auth/login"
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
