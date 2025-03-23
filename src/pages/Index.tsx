
import Hero from '@/components/home/Hero';
import FeaturedListings from '@/components/home/FeaturedListings';
import CategorySection from '@/components/home/CategorySection';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageSquare, Shield, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />
        
        {/* Features Section */}
        <section className="bg-white py-16">
          <div className="container max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="text-center flex flex-col items-center">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Secure Transactions</h3>
                <p className="text-muted-foreground">Shop with confidence through our verified student accounts and secure meetup locations.</p>
              </div>
              
              <div className="text-center flex flex-col items-center">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Campus Delivery</h3>
                <p className="text-muted-foreground">Arrange for convenient pickup or delivery at various campus locations.</p>
              </div>
              
              <div className="text-center flex flex-col items-center">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Direct Messaging</h3>
                <p className="text-muted-foreground">Connect directly with sellers through our in-app messaging system.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Listings */}
        <FeaturedListings />
        
        {/* Categories */}
        <CategorySection />
        
        {/* CTA Section */}
        <section className="relative py-20 bg-primary/5 overflow-hidden">
          <div className="absolute inset-0 -z-10 opacity-30">
            <div className="absolute -top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-[10%] -left-[10%] w-[40%] h-[60%] rounded-full bg-primary/20 blur-3xl" />
          </div>
          
          <div className="container max-w-6xl">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-medium">Ready to Sell Your Items?</h2>
              <p className="text-muted-foreground text-lg">
                Join thousands of students buying and selling on campus. 
                Create a listing in minutes and reach students instantly.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/sell">
                    Create Listing
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/about">Learn How It Works</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="bg-white border-t border-border py-12">
          <div className="container max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-semibold mb-4">Marketplace</h3>
                <ul className="space-y-2">
                  <li><Link to="/categories" className="text-muted-foreground hover:text-foreground">Categories</Link></li>
                  <li><Link to="/popular" className="text-muted-foreground hover:text-foreground">Popular Items</Link></li>
                  <li><Link to="/deals" className="text-muted-foreground hover:text-foreground">New Listings</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Account</h3>
                <ul className="space-y-2">
                  <li><Link to="/profile" className="text-muted-foreground hover:text-foreground">My Profile</Link></li>
                  <li><Link to="/listings/my" className="text-muted-foreground hover:text-foreground">My Listings</Link></li>
                  <li><Link to="/messages" className="text-muted-foreground hover:text-foreground">Messages</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Help</h3>
                <ul className="space-y-2">
                  <li><Link to="/faq" className="text-muted-foreground hover:text-foreground">FAQ</Link></li>
                  <li><Link to="/safety" className="text-muted-foreground hover:text-foreground">Safety Tips</Link></li>
                  <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact Us</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">About</h3>
                <ul className="space-y-2">
                  <li><Link to="/about" className="text-muted-foreground hover:text-foreground">How It Works</Link></li>
                  <li><Link to="/terms" className="text-muted-foreground hover:text-foreground">Terms & Conditions</Link></li>
                  <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
                </ul>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="h-6 w-6 text-primary" strokeWidth={1.5} />
                <span className="text-lg font-medium">Campus<span className="text-primary font-semibold">Trade</span></span>
              </div>
              
              <p className="text-sm text-muted-foreground text-center md:text-right">
                © {new Date().getFullYear()} CampusTrade. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
