
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { mockListings, mockCategories } from '@/data/mockData';
import ListingCard from '@/components/listing/ListingCard';
import { Button } from '@/components/ui/button';
import { Filter, SlidersHorizontal, X } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('newest');
  const [condition, setCondition] = useState<string[]>([]);

  // Find the current category
  const category = mockCategories.find((cat) => cat.id.toString() === slug || cat.name.toLowerCase() === slug?.toLowerCase());
  
  // Filter listings by the current category
  const categoryListings = mockListings.filter((listing) => {
    const matchesCategory = category ? 
      listing.category.toLowerCase() === category.name.toLowerCase() : 
      false;
    
    // Apply price filter
    const matchesPrice = listing.price >= priceRange[0] && listing.price <= priceRange[1];
    
    // Apply condition filter
    const matchesCondition = condition.length === 0 || 
                           condition.includes(listing.condition || '');
    
    return matchesCategory && matchesPrice && matchesCondition;
  });
  
  // Sort the filtered listings
  const sortedListings = [...categoryListings].sort((a, b) => {
    switch (sortBy) {
      case 'priceLow':
        return a.price - b.price;
      case 'priceHigh':
        return b.price - a.price;
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      default:
        return 0;
    }
  });

  const toggleCondition = (conditionValue: string) => {
    setCondition(prev => 
      prev.includes(conditionValue) 
        ? prev.filter(c => c !== conditionValue)
        : [...prev, conditionValue]
    );
  };

  const clearFilters = () => {
    setPriceRange([0, 1000]);
    setSortBy('newest');
    setCondition([]);
  };

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-16">
          <div className="container max-w-6xl text-center py-16">
            <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
            <p className="text-muted-foreground mb-8">Sorry, the category you're looking for doesn't exist.</p>
            <Button href="/categories" className="inline-flex">Browse All Categories</Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
            <p className="text-muted-foreground">
              Browse {sortedListings.length} items in the {category.name} category
            </p>
          </div>
          
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-muted-foreground">{sortedListings.length} items</span>
            </div>
            <Button 
              variant="outline" 
              className="ml-2"
              onClick={() => setFiltersVisible(!filtersVisible)}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
          
          {/* Filters Section */}
          {filtersVisible && (
            <div className="bg-white border rounded-lg p-6 mb-8 animate-fade-in">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg">Filters</h2>
                <div className="flex items-center">
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear All
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setFiltersVisible(false)}
                    className="ml-2"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Price Range */}
                <div>
                  <Label className="mb-2 block">Price Range</Label>
                  <div className="px-2">
                    <Slider 
                      defaultValue={[0, 1000]} 
                      max={1000} 
                      step={10}
                      value={priceRange}
                      onValueChange={setPriceRange}
                    />
                    <div className="flex justify-between mt-2 text-sm">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
                
                {/* Condition */}
                <div>
                  <Label className="mb-2 block">Condition</Label>
                  <div className="space-y-2">
                    {["new", "like_new", "good", "fair", "poor"].map(cond => (
                      <div key={cond} className="flex items-center">
                        <Checkbox 
                          id={`condition-${cond}`}
                          checked={condition.includes(cond)}
                          onCheckedChange={() => toggleCondition(cond)}
                        />
                        <label 
                          htmlFor={`condition-${cond}`}
                          className="ml-2 text-sm cursor-pointer"
                        >
                          {cond.replace('_', ' ').charAt(0).toUpperCase() + cond.replace('_', ' ').slice(1)}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Sort By */}
                <div>
                  <Label className="mb-2 block">Sort By</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="priceLow">Price: Low to High</SelectItem>
                      <SelectItem value="priceHigh">Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          
          {/* Results */}
          {sortedListings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {sortedListings.map(listing => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground mb-4">No items found in this category.</p>
              <p className="text-muted-foreground">Try adjusting your filters or check back later.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CategoryPage;
