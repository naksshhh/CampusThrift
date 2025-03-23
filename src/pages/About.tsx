
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { 
  Shield, Truck, MessageSquare, Search, 
  Users, Zap, DollarSign, Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24">
        {/* Hero section */}
        <section className="py-16 bg-primary/5">
          <div className="container max-w-6xl">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">About CampusTrade</h1>
              <p className="text-lg text-muted-foreground mb-8">
                A secure marketplace built exclusively for college students to buy, sell, and trade items on campus.
              </p>
            </div>
          </div>
        </section>
        
        {/* How it works */}
        <section className="py-16">
          <div className="container max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                CampusTrade makes buying and selling among students simple, secure, and social.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-lg bg-white border">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">1. Browse Listings</h3>
                <p className="text-muted-foreground">
                  Search through categories or use filters to find exactly what you need from fellow students.
                </p>
              </div>
              
              <div className="text-center p-6 rounded-lg bg-white border">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">2. Connect & Chat</h3>
                <p className="text-muted-foreground">
                  Message sellers directly through our platform to ask questions and arrange meetups.
                </p>
              </div>
              
              <div className="text-center p-6 rounded-lg bg-white border">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">3. Meet & Exchange</h3>
                <p className="text-muted-foreground">
                  Meet at a safe campus location to complete your transaction with peace of mind.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Benefits */}
        <section className="py-16 bg-gray-50">
          <div className="container max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose CampusTrade?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our platform offers unique benefits for the college community.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Shield className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Verified Users</h3>
                <p className="text-muted-foreground">
                  Every user is verified with their college email for a trusted community.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Users className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Campus Community</h3>
                <p className="text-muted-foreground">
                  Connect with students on your campus for convenient transactions.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Zap className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Fast & Easy</h3>
                <p className="text-muted-foreground">
                  List items in minutes and find what you need with simple search.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <DollarSign className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Hidden Fees</h3>
                <p className="text-muted-foreground">
                  CampusTrade is free to use with no commissions on your sales.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16">
          <div className="container max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Get answers to common questions about using CampusTrade.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-2">How do I create an account?</h3>
                <p className="text-muted-foreground">
                  Sign up using your college email address to get verified. Once verified, you can create your profile and start listing items.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-2">Is it free to use CampusTrade?</h3>
                <p className="text-muted-foreground">
                  Yes! CampusTrade is completely free for college students. There are no fees for listing or selling items.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-2">How do I stay safe when meeting buyers/sellers?</h3>
                <p className="text-muted-foreground">
                  Always meet in public places on campus, bring a friend if possible, and use our in-app messaging to keep records of your communications.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-2">What items are not allowed on CampusTrade?</h3>
                <p className="text-muted-foreground">
                  Prohibited items include illegal goods, alcohol, tobacco, weapons, adult content, and counterfeit products. See our full policy for details.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-primary/5">
          <div className="container max-w-6xl">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of students buying and selling on campus today!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/sell">Start Selling</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/categories">Browse Items</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
