import React from 'react';
import { motion } from 'framer-motion';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'acid';
  size?: 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  icon,
  rightIcon,
  variant = 'primary',
  size = 'lg',
  fullWidth = true,
  className = '',
  disabled,
  ...props
}) => {
  const sizeClasses = {
    md: 'py-2.5 px-5 text-sm sm:text-base font-bold',
    lg: 'py-3.5 px-6 text-base sm:text-lg font-bold',
    xl: 'py-4 px-8 text-lg sm:text-xl font-extrabold',
  };

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-[#FF7A24] via-[#FF5B35] to-[#FF3E11] text-white shadow-glow-orange-lg hover:shadow-[0_12px_45px_-5px_rgba(255,91,53,0.7)] border-t border-white/25',
    secondary:
      'bg-surface hover:bg-surface-hover text-white border border-border-lab shadow-md hover:border-primary-orange/40',
    outline:
      'bg-transparent hover:bg-primary-orange/10 text-primary-orange border-2 border-primary-orange/60',
    acid:
      'bg-acid-yellow text-background font-black shadow-[0_0_25px_rgba(232,255,91,0.4)] hover:bg-[#d6ee4d]',
  };

  return (
    <motion.button
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      className={`
        relative inline-flex items-center justify-center gap-2.5 rounded-full font-heading tracking-wide transition-all duration-200 select-none cursor-pointer whitespace-nowrap
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed filter grayscale' : ''}
        ${className}
      `}
      disabled={disabled}
      {...(props as any)}
    >
      {icon && <span className="flex-shrink-0 inline-flex items-center justify-center">{icon}</span>}
      <span className="inline-flex items-center justify-center gap-2 whitespace-nowrap">{children}</span>
      {rightIcon && <span className="flex-shrink-0 inline-flex items-center justify-center">{rightIcon}</span>}
    </motion.button>
  );
};
