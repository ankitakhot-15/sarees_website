import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "gold" | "outline" | "ghost" | "whatsapp";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  fullWidth = false,
  className = "",
  disabled,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-sm cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed text-center";

  const sizeClasses = {
    sm: "px-4 py-2 text-xs uppercase tracking-wider gap-1.5",
    md: "px-6 py-3 text-sm tracking-wide gap-2",
    lg: "px-8 py-3.5 text-base tracking-wide gap-2.5",
  }[size];

  const variantClasses = {
    primary:
      "bg-[#5A1022] text-[#FFFDF8] hover:bg-[#7A1730] border border-[#5A1022] hover:border-[#C9A227] shadow-sm hover:shadow-md",
    secondary:
      "bg-[#F8F1E5] text-[#5A1022] hover:bg-[#FFFDF8] border border-[#C9A227]/40 hover:border-[#C9A227]",
    gold:
      "bg-[#C9A227] text-[#2C1B16] font-semibold hover:bg-[#DFBB4C] border border-[#C9A227] shadow-sm hover:shadow-md",
    outline:
      "bg-transparent text-[#5A1022] border border-[#5A1022] hover:bg-[#5A1022] hover:text-[#FFFDF8]",
    ghost:
      "bg-transparent text-[#2C1B16] hover:bg-[#F8F1E5] hover:text-[#5A1022]",
    whatsapp:
      "bg-[#25D366] text-white hover:bg-[#1EBE5D] border border-[#25D366] shadow-sm hover:shadow-md",
  }[variant];

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${widthClass} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="shrink-0">{icon}</span>}
    </button>
  );
};
