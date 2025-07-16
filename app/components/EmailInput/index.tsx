'use client';

import { useState, useEffect } from 'react';

interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  buttonText?: string;
  onSubmit?: () => void;
  className?: string;
  disabled?: boolean;
}

export default function EmailInput({
  value,
  onChange,
  placeholder = 'Email address',
  buttonText = 'Continue',
  onSubmit,
  className = '',
  disabled = false
}: EmailInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(0);
  const [isInCooldown, setIsInCooldown] = useState(false);

  // Cooldown timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isInCooldown && cooldownTime > 0) {
      interval = setInterval(() => {
        setCooldownTime((prev) => {
          if (prev <= 1) {
            setIsInCooldown(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isInCooldown, cooldownTime]);

  const handleSubmit = () => {
    if (value.trim() && !disabled && !isInCooldown) {
      setIsSubmitted(true);
      onSubmit?.();
      
      // Start cooldown period
      setCooldownTime(60);
      setIsInCooldown(true);
      
      // Reset submission state after animation
      setTimeout(() => setIsSubmitted(false), 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="relative">
        <input
          type="email"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full
            px-4 py-4
            bg-gray-50 dark:bg-gray-700/50
            border-2 transition-all duration-200
            rounded-2xl
            text-gray-900 dark:text-gray-100
            placeholder-gray-500 dark:placeholder-gray-400
            text-base
            focus:outline-none
            disabled:opacity-50 disabled:cursor-not-allowed
            ${isFocused 
              ? 'border-blue-500 dark:border-blue-400 bg-white dark:bg-gray-700' 
              : 'border-gray-200 dark:border-gray-600'
            }
            ${!isFocused && value && !isValidEmail 
              ? 'border-red-300 dark:border-red-400' 
              : ''
            }
            ${!isFocused && value && isValidEmail 
              ? 'border-green-300 dark:border-green-400' 
              : ''
            }
          `}
        />
        
        {/* Email validation indicator */}
        {value && !isFocused && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            {isValidEmail ? (
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={disabled || !value.trim() || !isValidEmail || isInCooldown}
        className={`
          w-full
          px-6 py-4
          bg-blue-600 dark:bg-blue-500
          text-white
          font-semibold text-base
          rounded-2xl
          transition-all duration-200
          hover:bg-blue-700 dark:hover:bg-blue-600
          hover:shadow-lg hover:shadow-blue-500/25
          active:scale-[0.98]
          disabled:opacity-50 disabled:cursor-not-allowed
          disabled:hover:bg-blue-600 dark:disabled:hover:bg-blue-500
          focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20
          ${isSubmitted ? 'bg-green-600 dark:bg-green-500' : ''}
          ${isInCooldown ? 'bg-gray-500 dark:bg-gray-600' : ''}
        `}
      >
        {isSubmitted ? (
          <div className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Sending...
          </div>
        ) : isInCooldown ? (
          <div className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray={`${(60 - cooldownTime) * (62.83 / 60)} 62.83`}
                strokeLinecap="round"
                className="opacity-75"
                style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
              />
            </svg>
            Wait {cooldownTime}s
          </div>
        ) : (
          buttonText
        )}
      </button>

      {/* Cooldown notification */}
      {isInCooldown && !isSubmitted && (
        <div className="text-center mt-2">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Please wait {cooldownTime} seconds before requesting another magic link
          </p>
        </div>
      )}
    </div>
  );
} 