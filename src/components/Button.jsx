const Button = ({ children, variant = "primary", onClick, className = "" }) => {
  const baseStyles = "inline-flex items-center justify-center px-8 py-3 rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:scale-105 active:scale-95"
  
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary shadow-lg hover:shadow-xl",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-secondary border border-border hover:border-primary/20",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground focus:ring-primary"
  }
  
  const variantStyles = variants[variant] || variants.primary
  
  return (
    <button 
      className={`${baseStyles} ${variantStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button