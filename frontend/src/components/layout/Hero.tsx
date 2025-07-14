// frontend/src/components/Hero.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0 z-0 opacity-50"> {/* <--- MODIFIED: opacity-50 */}
        {/* Grid pattern */}
        {/* Adjusted radial-gradient for a more visible grid. 
            The color var(--color-muted) needs to have enough contrast with background.
            Consider using a color like var(--color-border) or var(--color-input) for more visibility if muted is too light.
            Let's try with a more distinct color directly in the gradient for demonstration.
        */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-primary)_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div> {/* <--- MODIFIED: Using circle, background-size, and mask-image for a more typical grid/dot pattern */}
        
        {/* Blob shapes for organic feel, using custom colors */}
        {/* Decreased blur slightly and ensure colors have enough punch */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-red-500/50 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob [animation-delay:-2s]"></div> {/* <--- MODIFIED: blur-2xl, bg-accent/30 */}
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-green-500/50 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob [animation-delay:-4s]"></div> {/* <--- MODIFIED: blur-2xl, bg-primary/30 */}
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-blue-500/50 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob [animation-delay:-6s]"></div> {/* <--- MODIFIED: blur-2xl, bg-secondary/30 */}
      </div>

      <div className="container mx-auto text-center relative z-10 max-w-5xl px-4">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-tight mb-6 text-foreground animate-in slide-in-from-top duration-700">
          Unlock Your Creative Potential with <span className="text-primary animate-pulse-fast">AI-Powered Content</span>
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground mb-10 animate-in fade-in duration-1000 delay-200">
          From ideation to publication, XalimaFlow provides the tools you need to create compelling content efficiently and effortlessly.
        </p>
        <div className="flex justify-center space-x-4 animate-in fade-in duration-1000 delay-400">
          <Link to="/register">
            <Button size="lg" className="px-10 py-4 text-xl transition-transform duration-300 hover:scale-105 shadow-lg">
              Start Your Free Trial
            </Button>
          </Link>
          <Link to="#features"> {/* Lien vers la section fonctionnalités */}
            <Button variant="outline" size="lg" className="px-10 py-4 text-xl transition-transform duration-300 hover:scale-105 shadow-lg">
              Explore Features
            </Button>
          </Link>
        </div>
        {/* Optional: Add a subtle downward arrow to suggest scrolling */}
        <div className="mt-20 animate-bounce">
          <Sparkles className="h-8 w-8 mx-auto text-primary" />
        </div>
      </div>
    </section>
  );
};

export default Hero;