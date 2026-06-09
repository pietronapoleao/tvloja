import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, ArrowLeft, Check, Globe, User, Mail, Phone, 
  Lock, Store, Sparkles, AlertCircle, Loader2 
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { authApi } from '../../lib/api';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { OTPInput } from '../../components/ui/OTPInput';
import { cn } from '../../utils/cn';

interface FormData {
  storeSlug: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  passwordConfirmation: string;
  otp: string;
  storeName: string;
  primaryColor: string;
}

interface StepProps {
  data: FormData;
  updateData: (field: string, value: string) => void;
  errors: Record<string, string>;
  setErrors: (errors: Record<string, string>) => void;
}

const COLORS = [
  '#6366f1', '#8b5cf6', '#ec4899', '#ef4444', '#f97316',
  '#eab308', '#22c55e', '#14b8a6', '#3b82f6', '#1e293b',
];

const SLUG_SUGGESTIONS = ['minha-loja', 'loja-online', 'meu-negocio', 'super-loja'];

// Step 1: Choose Slug
function Step1({ data, updateData, errors, setErrors }: StepProps) {
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  const checkSlug = useCallback(async (slug: string) => {
    if (slug.length < 3) {
      setIsAvailable(null);
      return;
    }

    setIsChecking(true);
    try {
      const response = await authApi.checkSlug(slug);
      setIsAvailable(response.data?.available ?? false);
      if (!response.data?.available) {
        setErrors({ ...errors, storeSlug: 'Este endereço já está em uso' });
      } else {
        const newErrors = { ...errors };
        delete newErrors.storeSlug;
        setErrors(newErrors);
      }
    } catch {
      setIsAvailable(null);
    } finally {
      setIsChecking(false);
    }
  }, [errors, setErrors]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (data.storeSlug) {
        checkSlug(data.storeSlug);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [data.storeSlug, checkSlug]);

  const handleSlugChange = (value: string) => {
    const slug = value.toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 30);
    updateData('storeSlug', slug);
    setIsAvailable(null);
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Crie sua Loja Virtual
      </h2>
      <p className="text-gray-600 mb-8">
        Qual será o endereço de acesso do seu site?
      </p>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Endereço do seu site *
        </label>
        <div className="flex items-center">
          <span className="px-4 py-3 bg-gray-100 text-gray-500 text-sm rounded-l-xl border border-r-0 border-gray-200">
            https://
          </span>
          <div className="relative flex-1">
            <input
              type="text"
              value={data.storeSlug}
              onChange={(e) => handleSlugChange(e.target.value)}
              placeholder="sua-loja"
              className={cn(
                'w-full px-4 py-3 text-sm border-y border-gray-200 focus:outline-none focus:ring-2 focus:ring-inset',
                errors.storeSlug
                  ? 'focus:ring-red-500/20 focus:border-red-500'
                  : isAvailable
                  ? 'focus:ring-green-500/20 focus:border-green-500'
                  : 'focus:ring-indigo-500/20 focus:border-indigo-500'
              )}
            />
            {isChecking && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
              </div>
            )}
            {!isChecking && isAvailable === true && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Check className="w-5 h-5 text-green-500" />
              </div>
            )}
            {!isChecking && isAvailable === false && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <AlertCircle className="w-5 h-5 text-red-500" />
              </div>
            )}
          </div>
          <span className="px-4 py-3 bg-gray-100 text-gray-500 text-sm rounded-r-xl border border-l-0 border-gray-200">
            .tvloja.com.br
          </span>
        </div>
        {errors.storeSlug ? (
          <p className="mt-2 text-sm text-red-600">{errors.storeSlug}</p>
        ) : (
          <p className="mt-2 text-sm text-gray-500">
            Este será o endereço da sua loja. Ex: suaempresa.tvloja.com.br
          </p>
        )}
      </div>

      <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
        <p className="text-sm font-medium text-indigo-800 mb-3">
          Crie um endereço com base nas sugestões:
        </p>
        <div className="flex flex-wrap gap-2">
          {SLUG_SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => handleSlugChange(suggestion)}
              className={cn(
                'px-3 py-1.5 text-sm rounded-lg border transition-all',
                data.storeSlug === suggestion
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-indigo-600 border-indigo-200 hover:border-indigo-400'
              )}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Step 2: Personal Data
function Step2({ data, updateData, errors }: StepProps) {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Quase lá!
      </h2>
      <p className="text-gray-600 mb-8">
        Preencha seus dados para criar sua conta.
      </p>

      <Button
        type="button"
        variant="outline"
        className="w-full mb-6"
        size="lg"
      >
        <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        Continuar com Google
      </Button>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500">ou preencha seus dados</span>
        </div>
      </div>

      <div className="space-y-4">
        <Input
          label="Nome Completo"
          placeholder="Seu nome completo"
          value={data.name}
          onChange={(e) => updateData('name', e.target.value)}
          leftIcon={<User className="w-5 h-5" />}
          error={errors.name}
          required
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="E-mail"
            type="email"
            placeholder="seu@email.com"
            value={data.email}
            onChange={(e) => updateData('email', e.target.value)}
            leftIcon={<Mail className="w-5 h-5" />}
            error={errors.email}
            required
          />
          <Input
            label="WhatsApp"
            type="tel"
            placeholder="(11) 99999-9999"
            value={data.phone}
            onChange={(e) => updateData('phone', e.target.value)}
            leftIcon={<Phone className="w-5 h-5" />}
            error={errors.phone}
            required
          />
        </div>
        <Input
          label="Senha de Acesso"
          type="password"
          placeholder="Mínimo 8 caracteres"
          value={data.password}
          onChange={(e) => updateData('password', e.target.value)}
          leftIcon={<Lock className="w-5 h-5" />}
          error={errors.password}
          hint="Use letras maiúsculas, minúsculas e números"
          required
        />
        <Input
          label="Confirmar Senha"
          type="password"
          placeholder="Digite a senha novamente"
          value={data.passwordConfirmation}
          onChange={(e) => updateData('passwordConfirmation', e.target.value)}
          leftIcon={<Lock className="w-5 h-5" />}
          error={errors.passwordConfirmation}
          required
        />
      </div>
    </div>
  );
}

// Step 3: OTP Verification
function Step3({ data, updateData, errors }: StepProps) {
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleResend = async () => {
    try {
      await authApi.resendOTP(data.email);
      setCountdown(60);
      setCanResend(false);
    } catch {
      // Handle error
    }
  };

  return (
    <div className="animate-fade-in text-center">
      <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Mail className="w-10 h-10 text-indigo-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Verifique seu E-mail
      </h2>
      <p className="text-gray-600 mb-8">
        Enviamos um código de 6 dígitos para<br />
        <strong className="text-gray-900">{data.email}</strong>
      </p>

      <div className="mb-6">
        <OTPInput
          value={data.otp}
          onChange={(value) => updateData('otp', value)}
          error={!!errors.otp}
        />
        {errors.otp && (
          <p className="mt-3 text-sm text-red-600">{errors.otp}</p>
        )}
      </div>

      <p className="text-sm text-gray-500">
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
    </div>
  );
}

// Step 4: Customize
function Step4({ data, updateData, errors }: StepProps) {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Personalize seu Site
      </h2>
      <p className="text-gray-600 mb-8">
        Defina a cara do seu negócio na internet.
      </p>

      <div className="space-y-6">
        <Input
          label="Nome do Site / Marca"
          placeholder="Ex: Minha Loja Online"
          value={data.storeName}
          onChange={(e) => updateData('storeName', e.target.value)}
          leftIcon={<Store className="w-5 h-5" />}
          error={errors.storeName}
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Cor Principal da Marca
          </label>
          <div className="flex flex-wrap gap-3">
            {COLORS.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => updateData('primaryColor', color)}
                className={cn(
                  'w-12 h-12 rounded-xl transition-all',
                  data.primaryColor === color
                    ? 'ring-2 ring-offset-2 ring-gray-400 scale-110'
                    : 'hover:scale-105'
                )}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Selecione a cor que representa sua marca.
          </p>
        </div>

        <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-500 mb-3">Preview:</p>
          <div className="flex items-center space-x-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: data.primaryColor }}
            >
              {data.storeName?.[0]?.toUpperCase() || 'L'}
            </div>
            <div>
              <p className="font-semibold text-gray-900">
                {data.storeName || 'Nome da sua loja'}
              </p>
              <p className="text-sm text-gray-500">
                {data.storeSlug}.tvloja.com.br
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Step 5: Success
function Step5({ data }: { data: FormData }) {
  return (
    <div className="animate-fade-in text-center">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Sparkles className="w-12 h-12 text-green-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Site Publicado! 🎉
      </h2>
      <p className="text-gray-600 mb-8">
        Sua conta foi criada e seu site já está no ar.
      </p>

      <div className="p-6 bg-indigo-50 rounded-xl border border-indigo-100 mb-6">
        <p className="text-sm text-indigo-600 mb-2">Seu site está disponível em:</p>
        <a
          href={`https://${data.storeSlug}.tvloja.com.br`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl font-semibold text-indigo-700 hover:underline flex items-center justify-center gap-2"
        >
          <Globe className="w-5 h-5" />
          {data.storeSlug}.tvloja.com.br
        </a>
      </div>

      <Link to="/dashboard">
        <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
          Acessar meu Painel
        </Button>
      </Link>
    </div>
  );
}

// Main Register Page
export function RegisterPage() {
  const { register, verifyOTP } = useAuth();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState('');
  const [formData, setFormData] = useState<FormData>({
    storeSlug: '',
    name: '',
    email: '',
    phone: '',
    password: '',
    passwordConfirmation: '',
    otp: '',
    storeName: '',
    primaryColor: '#6366f1',
  });

  const updateData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.storeSlug || formData.storeSlug.length < 3) {
          newErrors.storeSlug = 'Endereço deve ter pelo menos 3 caracteres';
        }
        break;
      case 2:
        if (!formData.name || formData.name.length < 3) {
          newErrors.name = 'Nome deve ter pelo menos 3 caracteres';
        }
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Email inválido';
        }
        if (!formData.phone || formData.phone.replace(/\D/g, '').length < 10) {
          newErrors.phone = 'Telefone inválido';
        }
        if (!formData.password || formData.password.length < 8) {
          newErrors.password = 'Senha deve ter pelo menos 8 caracteres';
        }
        if (formData.password !== formData.passwordConfirmation) {
          newErrors.passwordConfirmation = 'Senhas não conferem';
        }
        break;
      case 3:
        if (!formData.otp || formData.otp.length !== 6) {
          newErrors.otp = 'Digite o código de 6 dígitos';
        }
        break;
      case 4:
        if (!formData.storeName || formData.storeName.length < 2) {
          newErrors.storeName = 'Nome da loja é obrigatório';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (!validateStep(currentStep)) return;

    setIsLoading(true);
    setGlobalError('');

    try {
      switch (currentStep) {
        case 2:
          await register({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
            passwordConfirmation: formData.passwordConfirmation,
            storeName: formData.storeName || formData.storeSlug,
            storeSlug: formData.storeSlug,
          });
          setCurrentStep(3);
          break;
        case 3:
          await verifyOTP(formData.email, formData.otp);
          setCurrentStep(4);
          break;
        case 4:
          setCurrentStep(5);
          break;
        default:
          setCurrentStep((prev) => prev + 1);
      }
    } catch (err: unknown) {
      const error = err as { message?: string };
      setGlobalError(error.message || 'Ocorreu um erro. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1 && currentStep < 5) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const steps = [
    { number: 1, title: 'Endereço' },
    { number: 2, title: 'Dados' },
    { number: 3, title: 'Verificar' },
    { number: 4, title: 'Personalizar' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <span className="text-white font-bold text-xl">TV</span>
            </div>
          </Link>
        </div>

        {/* Progress steps */}
        {currentStep < 5 && (
          <div className="flex items-center justify-center mb-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all',
                      currentStep > step.number
                        ? 'bg-green-500 text-white'
                        : currentStep === step.number
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    )}
                  >
                    {currentStep > step.number ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <span
                    className={cn(
                      'text-xs mt-1 hidden sm:block',
                      currentStep >= step.number ? 'text-indigo-600' : 'text-gray-400'
                    )}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      'w-12 sm:w-20 h-1 mx-2 rounded-full transition-all',
                      currentStep > step.number ? 'bg-green-500' : 'bg-gray-200'
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-8 border border-gray-100">
          {globalError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-600">{globalError}</p>
            </div>
          )}

          {currentStep === 1 && (
            <Step1 data={formData} updateData={updateData} errors={errors} setErrors={setErrors} />
          )}
          {currentStep === 2 && (
            <Step2 data={formData} updateData={updateData} errors={errors} setErrors={setErrors} />
          )}
          {currentStep === 3 && (
            <Step3 data={formData} updateData={updateData} errors={errors} setErrors={setErrors} />
          )}
          {currentStep === 4 && (
            <Step4 data={formData} updateData={updateData} errors={errors} setErrors={setErrors} />
          )}
          {currentStep === 5 && <Step5 data={formData} />}

          {currentStep < 5 && (
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
              {currentStep > 1 ? (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleBack}
                  leftIcon={<ArrowLeft className="w-5 h-5" />}
                >
                  Voltar
                </Button>
              ) : (
                <Link to="/auth/login">
                  <Button type="button" variant="ghost">
                    Já tenho conta
                  </Button>
                </Link>
              )}
              <Button
                type="button"
                onClick={handleNext}
                isLoading={isLoading}
                rightIcon={!isLoading ? <ArrowRight className="w-5 h-5" /> : undefined}
              >
                {currentStep === 4 ? 'Criar minha loja' : 'Continuar'}
              </Button>
            </div>
          )}
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Ao criar sua conta, você concorda com nossos{' '}
          <a href="#" className="text-indigo-600 hover:underline">Termos de Uso</a>
          {' '}e{' '}
          <a href="#" className="text-indigo-600 hover:underline">Política de Privacidade</a>
        </p>
      </div>
    </div>
  );
}
