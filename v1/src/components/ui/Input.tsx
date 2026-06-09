import { forwardRef, useState, InputHTMLAttributes, ReactNode } from 'react';
import { Eye, EyeOff, AlertCircle, Check } from 'lucide-react';
import { cn } from '../../utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
  hint?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, success, hint, leftIcon, rightIcon, type, className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            type={isPassword && showPassword ? 'text' : type}
            className={cn(
              'w-full px-4 py-3 text-sm border rounded-xl transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-offset-0',
              'placeholder:text-gray-400',
              leftIcon && 'pl-10',
              (rightIcon || isPassword) && 'pr-10',
              error
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20 bg-red-50/50'
                : success
                ? 'border-green-300 focus:border-green-500 focus:ring-green-500/20 bg-green-50/50'
                : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/20 bg-white',
              className
            )}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          )}
          {!isPassword && rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {rightIcon}
            </div>
          )}
          {error && !isPassword && !rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
              <AlertCircle className="w-5 h-5" />
            </div>
          )}
          {success && !isPassword && !rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
              <Check className="w-5 h-5" />
            </div>
          )}
        </div>
        {(error || hint) && (
          <p className={cn(
            'mt-1.5 text-sm',
            error ? 'text-red-600' : 'text-gray-500'
          )}>
            {error || hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
