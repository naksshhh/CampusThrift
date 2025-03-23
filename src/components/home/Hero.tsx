
import { Search, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[30%] -right-[25%] w-[50%] h-[70%] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-[10%] -left-[10%] w-[40%] h-[50%] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container max-w-6xl">
        <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight">
            Find What You Need, <span className="text-primary">Right On Campus</span>
          </h1>
          
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            Buy and sell everything from used textbooks to furniture with 
            other students at your university.
          </p>
          
          <form 
            onSubmit={handleSearch}
            className="relative max-w-xl mx-auto mt-8 group"
          >
            <Input
              type="text"
              placeholder="Search for textbooks, electronics, furniture..."
              className="pl-4 pr-12 py-6 text-base shadow-md focus-visible:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button 
              type="submit" 
              size="icon" 
              className="absolute right-1 top-1 bottom-1 transition-all"
            >
              <Search className="h-5 w-5" />
            </Button>
          </form>
          
          <div className="flex flex-wrap gap-3 justify-center pt-4">
            <Button variant="outline" size="sm" className="rounded-full animate-slide-in" style={{animationDelay: '0.1s'}}>
              Textbooks
            </Button>
            <Button variant="outline" size="sm" className="rounded-full animate-slide-in" style={{animationDelay: '0.2s'}}>
              Electronics
            </Button>
            <Button variant="outline" size="sm" className="rounded-full animate-slide-in" style={{animationDelay: '0.3s'}}>
              Furniture
            </Button>
            <Button variant="outline" size="sm" className="rounded-full animate-slide-in" style={{animationDelay: '0.4s'}}>
              Clothing
            </Button>
            <Button variant="outline" size="sm" className="rounded-full animate-slide-in" style={{animationDelay: '0.5s'}}>
              Apartments
            </Button>
          </div>
          
          <div className="pt-6">
            <Button variant="link" className="group">
              <span>Browse all categories</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
