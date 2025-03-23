
import { Button } from '@/components/ui/button';
import { 
  BookOpen, Laptop, Sofa, ShoppingBag, Bike, 
  UtensilsCrossed, Home, Music, Pencil, Shirt
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Category {
  name: string;
  icon: React.ReactNode;
  slug: string;
  color: string;
}

const categories: Category[] = [
  { 
    name: 'Textbooks', 
    icon: <BookOpen className="h-6 w-6" />, 
    slug: 'textbooks',
    color: 'bg-blue-50 text-blue-600'
  },
  { 
    name: 'Electronics', 
    icon: <Laptop className="h-6 w-6" />, 
    slug: 'electronics',
    color: 'bg-purple-50 text-purple-600'
  },
  { 
    name: 'Furniture', 
    icon: <Sofa className="h-6 w-6" />, 
    slug: 'furniture',
    color: 'bg-amber-50 text-amber-600'
  },
  { 
    name: 'Supplies', 
    icon: <ShoppingBag className="h-6 w-6" />, 
    slug: 'supplies',
    color: 'bg-green-50 text-green-600'
  },
  { 
    name: 'Sports', 
    icon: <Bike className="h-6 w-6" />, 
    slug: 'sports',
    color: 'bg-red-50 text-red-600'
  },
  { 
    name: 'Kitchen', 
    icon: <UtensilsCrossed className="h-6 w-6" />, 
    slug: 'kitchen',
    color: 'bg-pink-50 text-pink-600'
  },
  { 
    name: 'Housing', 
    icon: <Home className="h-6 w-6" />, 
    slug: 'housing',
    color: 'bg-indigo-50 text-indigo-600'
  },
  { 
    name: 'Music', 
    icon: <Music className="h-6 w-6" />, 
    slug: 'music',
    color: 'bg-cyan-50 text-cyan-600'
  },
  { 
    name: 'Stationery', 
    icon: <Pencil className="h-6 w-6" />, 
    slug: 'stationery',
    color: 'bg-teal-50 text-teal-600'
  },
  { 
    name: 'Clothing', 
    icon: <Shirt className="h-6 w-6" />, 
    slug: 'clothing',
    color: 'bg-orange-50 text-orange-600'
  },
];

const CategorySection = () => {
  return (
    <section className="py-16 bg-secondary/50">
      <div className="container max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-medium text-center mb-10">Browse by Category</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link 
              to={`/categories/${category.slug}`} 
              key={category.slug}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className={`${category.color} rounded-xl p-6 text-center hover-lift h-full flex flex-col items-center justify-center`}>
                <div className="mb-4">{category.icon}</div>
                <h3 className="font-medium">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button asChild>
            <Link to="/categories">View All Categories</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
