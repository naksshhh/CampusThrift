
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Search as SearchIcon, SlidersHorizontal, X } from 'lucide-react';
import { mockListings, mockCategories } from '@/data/mockData';
import ListingCard from '@/components/listing/ListingCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('newest');
  const [condition, setCondition] = useState<string[]>([]);
  
  // Filter listings based on search criteria
  const filteredListings = mockListings.filter(listing => {
    // Search term filter
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         listing.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Category filter
    const matchesCategory = selectedCategories.length === 0 || 
                           selectedCategories.includes(listing.category);
    
    // Price filter
    const matchesPrice = listing.price >= priceRange[0] && listing.price <= priceRange[1];
    
    // Condition filter
    const matchesCondition = condition.length === 0 || 
                            condition.includes(listing.condition);
    
    return matchesSearch && matchesCategory && matchesPrice && matchesCondition;
  });
  
  // Sort listings
  const sortedListings = [...filteredListings].sort((a, b) => {
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

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleCondition = (conditionValue: string) => {
    setCondition(prev => 
      prev.includes(conditionValue) 
        ? prev.filter(c => c !== conditionValue)
        : [...prev, conditionValue]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 1000]);
    setSortBy('newest');
    setCondition([]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container max-w-6xl">
          <div className="flex items-center mb-8">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for items..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {/* Categories */}
                <div>
                  <Label className="mb-2 block">Categories</Label>
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                    {mockCategories.map(category => (
                      <div key={category.id} className="flex items-center">
                        <Checkbox 
                          id={`category-${category.id}`}
                          checked={selectedCategories.includes(category.id.toString())}
                          onCheckedChange={() => toggleCategory(category.id.toString())}
                        />
                        <label 
                          htmlFor={`category-${category.id}`}
                          className="ml-2 text-sm cursor-pointer"
                        >
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
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
          <div>
            <h2 className="text-lg font-medium mb-4">
              {sortedListings.length} Results {searchTerm ? `for "${searchTerm}"` : ''}
            </h2>
            
            {sortedListings.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {sortedListings.map(listing => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground mb-4">No results found.</p>
                <p className="text-muted-foreground">Try adjusting your filters or search term.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Search;
