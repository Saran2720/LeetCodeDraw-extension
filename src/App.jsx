import Hero from './components/Hero'
import FeatureCard from './components/FeatureCard'
import Button from './components/Button'

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-accent">
      <div className="container mx-auto px-6 py-12">
        <Hero />
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            title="Vite Fast"
            description="Lightning-fast development with Vite's instant hot module replacement"
            icon="⚡"
          />
          <FeatureCard 
            title="Tailwind Styled"
            description="Beautiful, responsive designs with utility-first CSS framework"
            icon="🎨"
          />
          <FeatureCard 
            title="JSX Ready"
            description="Clean React JSX components without TypeScript complexity"
            icon="⚛️"
          />
        </div>

        <div className="mt-16 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="primary">Get Started</Button>
            <Button variant="secondary">Learn More</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App