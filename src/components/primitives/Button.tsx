import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className,
  ...props
}) => {
  const base =
    "px-4 py-2 rounded-xl font-medium text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  const variants: Record<ButtonProps["variant"], string> = {
    primary:
      "bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500",
    secondary:
      "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 focus-visible:ring-neutral-300",
    danger:
      "bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-400"
  };

  return (
    <button className={clsx(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
};
