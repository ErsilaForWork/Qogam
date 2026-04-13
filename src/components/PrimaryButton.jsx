export function PrimaryButton({ 
  children, 
  onClick, 
  disabled = false, 
  variant = 'primary',
  size = 'md',
  className = ''
}) {
  const variants = {
    primary: 'bg-primary hover:bg-blue-700 text-white',
    secondary: 'bg-secondary hover:bg-green-700 text-white',
    outline: 'border-2 border-primary text-primary hover:bg-blue-50',
    ghost: 'text-primary hover:bg-blue-50'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        font-medium rounded-lg transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        active:scale-95
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}
