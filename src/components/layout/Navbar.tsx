
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Search, Menu, X, ShoppingBag, MessageSquare, Bell, User, ShieldCheck
} from 'lucide-react';
import { usePermissions } from '@/hooks/use-permissions';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAdmin } = usePermissions();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-lg shadow-sm py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <ShoppingBag className="h-8 w-8 text-primary" strokeWidth={1.5} />
          <span className="text-xl font-medium tracking-tight">Campus<span className="text-primary font-semibold">Thrift</span></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="subtle-underline text-sm font-medium">Home</Link>
          <Link to="/categories" className="subtle-underline text-sm font-medium">Categories</Link>
          <Link to="/sell" className="subtle-underline text-sm font-medium">Sell</Link>
          <Link to="/about" className="subtle-underline text-sm font-medium">About</Link>
          {isAdmin && (
            <Link to="/admin" className="subtle-underline text-sm font-medium flex items-center">
              <ShieldCheck className="h-4 w-4 mr-1" />
              Admin
            </Link>
          )}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="rounded-full" asChild>
            <Link to="/search">
              <Search className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full" asChild>
            <Link to="/messages">
              <MessageSquare className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full" asChild>
            <Link to="/notifications">
              <Bell className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full" asChild>
            <Link to="/profile">
              <User className="h-5 w-5" />
            </Link>
          </Button>
          <Button asChild>
            <Link to="/sell">List an Item</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg shadow-lg animate-fade-in">
          <div className="container py-5 flex flex-col space-y-4">
            <Link to="/" className="px-4 py-2 hover:bg-secondary rounded-md">Home</Link>
            <Link to="/categories" className="px-4 py-2 hover:bg-secondary rounded-md">Categories</Link>
            <Link to="/sell" className="px-4 py-2 hover:bg-secondary rounded-md">Sell</Link>
            <Link to="/about" className="px-4 py-2 hover:bg-secondary rounded-md">About</Link>
            {isAdmin && (
              <Link to="/admin" className="px-4 py-2 hover:bg-secondary rounded-md flex items-center">
                <ShieldCheck className="h-4 w-4 mr-2" />
                Admin Dashboard
              </Link>
            )}
            <div className="pt-2 border-t border-border">
              <Button className="w-full" asChild>
                <Link to="/sell">List an Item</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
