const Hero = () => {
  return (
    <div className="text-center max-w-4xl mx-auto">
      <div className="inline-block animate-pulse mb-6">
        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20">
          ✨ New Project Created
        </span>
      </div>
      
      <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent mb-6">
        Vite + React + Tailwind
      </h1>
      
      <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
        A clean, modern starter template with JSX components, beautiful Tailwind styling, 
        and lightning-fast Vite development experience.
      </p>
      
      <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary-glow mx-auto rounded-full"></div>
    </div>
  )
}

export default Hero