
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockCategories } from '@/data/mockData';

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredCategories = mockCategories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24">
        <div className="container max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Browse Categories</h1>
            <p className="text-muted-foreground">Find items within specific categories across campus</p>
          </div>
          
          {/* Search Bar */}
          <div className="relative mb-8">
            <Input
              type="text"
              placeholder="Search categories..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          
          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredCategories.map((category) => (
              <Link 
                key={category.id} 
                to={`/categories/${category.id}`}
                className="group hover:scale-105 transition-transform"
              >
                <div className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div 
                    className="aspect-video bg-cover bg-center"
                    style={{ backgroundImage: `url(${category.image})` }}
                  ></div>
                  <div className="p-4">
                    <h3 className="font-semibold group-hover:text-primary">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.count} items</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Categories;
