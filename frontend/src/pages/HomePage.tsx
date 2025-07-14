// frontend/src/pages/HomePage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Sparkles, BookOpenText, Lightbulb, Zap, BarChart, Settings, Users } from 'lucide-react'; // Plus d'icônes
import NavBar from '@/components/layout/NavBar'; // Importez le nouveau NavBar
import Hero from '@/components/layout/Hero';     // Importez le nouveau Hero
import Footer from '@/components/layout/Footer'; // Importez le nouveau Footer

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <NavBar /> {/* Utilisez le composant NavBar */}
      <Hero />   {/* Utilisez le composant Hero */}

      {/* Features Section (ID for direct linking from Hero) */}
      <section id="features" className="py-20 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl md:text-5xl font-bold mb-16 text-foreground animate-in slide-in-from-bottom duration-700">
            Why Choose XalimaFlow?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <Card className="p-8 transition-transform duration-300 hover:scale-105 hover:shadow-xl animate-in zoom-in delay-200 bg-secondary/10 border-primary/20">
              <CardHeader>
                <Brain className="h-12 w-12 text-primary mb-6 mx-auto" />
                <CardTitle className="text-2xl font-semibold text-foreground">Intelligent AI Assistance</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  Leverage cutting-edge AI to generate ideas, draft content, and refine your text with unparalleled speed and quality. Our algorithms learn from your style to produce truly unique creations.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="p-8 transition-transform duration-300 hover:scale-105 hover:shadow-xl animate-in zoom-in delay-300 bg-secondary/10 border-primary/20">
              <CardHeader>
                <BookOpenText className="h-12 w-12 text-primary mb-6 mx-auto" />
                <CardTitle className="text-2xl font-semibold text-foreground">Seamless Content Editor</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  Our intuitive rich text editor offers a distraction-free writing experience with powerful formatting options, collaboration tools, and version history.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="p-8 transition-transform duration-300 hover:scale-105 hover:shadow-xl animate-in zoom-in delay-400 bg-secondary/10 border-primary/20">
              <CardHeader>
                <Zap className="h-12 w-12 text-primary mb-6 mx-auto" />
                <CardTitle className="text-2xl font-semibold text-foreground">Boost Your Productivity</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  Automate repetitive tasks, get instant suggestions, and manage all your content in one centralized place to significantly cut down your workload.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="p-8 transition-transform duration-300 hover:scale-105 hover:shadow-xl animate-in zoom-in delay-500 bg-secondary/10 border-primary/20">
              <CardHeader>
                <BarChart className="h-12 w-12 text-primary mb-6 mx-auto" />
                <CardTitle className="text-2xl font-semibold text-foreground">Performance Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  Track the performance of your published content with built-in analytics, helping you understand your audience better and optimize for engagement.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Feature 5 */}
            <Card className="p-8 transition-transform duration-300 hover:scale-105 hover:shadow-xl animate-in zoom-in delay-600 bg-secondary/10 border-primary/20">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-6 mx-auto" />
                <CardTitle className="text-2xl font-semibold text-foreground">Collaborate Effortlessly</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  Work together with your team in real-time, share drafts, and gather feedback seamlessly to perfect your content before it goes live.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Feature 6 */}
            <Card className="p-8 transition-transform duration-300 hover:scale-105 hover:shadow-xl animate-in zoom-in delay-700 bg-secondary/10 border-primary/20">
              <CardHeader>
                <Settings className="h-12 w-12 text-primary mb-6 mx-auto" />
                <CardTitle className="text-2xl font-semibold text-foreground">Customizable & Adaptable</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  Tailor XalimaFlow to fit your unique content strategy with customizable templates, settings, and integrations for your preferred platforms.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl md:text-5xl font-bold text-center mb-16 text-foreground animate-in slide-in-from-bottom duration-700">
            How XalimaFlow Works
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            {/* Step 1 */}
            <div className="text-center animate-in slide-in-from-left duration-700 delay-200">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6 shadow-md">
                <Sparkles className="h-10 w-10 text-primary" />
              </div>
              <h4 className="text-2xl font-semibold mb-3 text-foreground">1. Generate Ideas</h4>
              <p className="text-muted-foreground">Start with AI-powered brainstorming or use our templates to kickstart your content.</p>
            </div>

            {/* Step 2 */}
            <div className="text-center animate-in zoom-in duration-700 delay-400">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6 shadow-md">
                <BookOpenText className="h-10 w-10 text-primary" />
              </div>
              <h4 className="text-2xl font-semibold mb-3 text-foreground">2. Create & Refine</h4>
              <p className="text-muted-foreground">Write and edit your content in our intuitive editor, with real-time suggestions and collaboration.</p>
            </div>

            {/* Step 3 */}
            <div className="text-center animate-in slide-in-from-right duration-700 delay-600">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6 shadow-md">
                <Lightbulb className="h-10 w-10 text-primary" />
              </div>
              <h4 className="text-2xl font-semibold mb-3 text-foreground">3. Publish & Analyze</h4>
              <p className="text-muted-foreground">Publish directly to your platforms and track performance with integrated analytics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section (Optional, but adds social proof) */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl md:text-5xl font-bold mb-16 text-foreground animate-in slide-in-from-bottom duration-700">
            What Our Users Say
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <Card className="p-8 bg-secondary/10 border-primary/20 animate-in fade-in duration-700 delay-200">
              <CardContent className="text-lg text-muted-foreground italic">
                "XalimaFlow has revolutionized our content creation process. The AI assistant is a game-changer!"
              </CardContent>
              <CardFooter className="mt-6">
                <div className="flex items-center mx-auto">
                  {/* <img src="/path/to/avatar1.jpg" alt="User Avatar" className="w-12 h-12 rounded-full mr-4 object-cover" /> */}
                  <div>
                    <p className="font-semibold text-foreground">Jane Doe</p>
                    <p className="text-sm text-primary">Content Manager, Creative Agency</p>
                  </div>
                </div>
              </CardFooter>
            </Card>
            <Card className="p-8 bg-secondary/10 border-primary/20 animate-in fade-in duration-700 delay-400">
              <CardContent className="text-lg text-muted-foreground italic">
                "The most intuitive content platform I've ever used. Highly recommend for any serious creator."
              </CardContent>
              <CardFooter className="mt-6">
                <div className="flex items-center mx-auto">
                  {/* <img src="/path/to/avatar2.jpg" alt="User Avatar" className="w-12 h-12 rounded-full mr-4 object-cover" /> */}
                  <div>
                    <p className="font-semibold text-foreground">John Smith</p>
                    <p className="text-sm text-primary">Freelance Writer</p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action Section (Reused from previous, but more prominent) */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10 text-foreground">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl md:text-5xl font-bold mb-8 animate-in slide-in-from-bottom duration-700">
            Join the Future of Content Creation
          </h3>
          <p className="text-xl text-foreground/80 mb-12 animate-in fade-in duration-1000 delay-200">
            Start transforming your ideas into powerful content today. No credit card required to get started!
          </p>
          <div className="animate-in fade-in duration-1000 delay-400">
            <Link to="/register">
              <Button size="lg" className="px-12 py-5 text-2xl transition-transform duration-300 hover:scale-105 shadow-xl">
                Get Started for Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer /> {/* Utilisez le composant Footer */}
    </div>
  );
};

export default HomePage;