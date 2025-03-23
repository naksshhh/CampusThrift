
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockCategories } from '@/data/mockData';
import { toast } from '@/components/ui/use-toast';
import { UploadCloud, Plus, X } from 'lucide-react';

const Sell = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      
      if (images.length + newFiles.length > 5) {
        toast({
          title: "Maximum 5 images allowed",
          description: "Please select fewer images",
          variant: "destructive"
        });
        return;
      }
      
      setImages(prev => [...prev, ...newFiles]);
      
      // Generate preview URLs
      const newUrls = newFiles.map(file => URL.createObjectURL(file));
      setImageUrls(prev => [...prev, ...newUrls]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(imageUrls[index]);
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      toast({
        title: "Listing Created!",
        description: "Your item has been posted successfully.",
      });
      setIsSubmitting(false);
      
      // Reset form
      setTitle('');
      setDescription('');
      setPrice('');
      setCategory('');
      setCondition('');
      
      // Clean up image URLs
      imageUrls.forEach(url => URL.revokeObjectURL(url));
      setImages([]);
      setImageUrls([]);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container max-w-3xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Sell an Item</h1>
            <p className="text-muted-foreground">List your item to thousands of students on campus</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title*</Label>
              <Input 
                id="title" 
                placeholder="What are you selling?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            
            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description*</Label>
              <Textarea 
                id="description" 
                placeholder="Describe your item (condition, brand, why you're selling it)"
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Price */}
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)*</Label>
                <Input 
                  id="price" 
                  type="number"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              
              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Category*</Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCategories.map(cat => (
                      <SelectItem key={cat.id} value={cat.id.toString()}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Condition */}
            <div className="space-y-2">
              <Label htmlFor="condition">Condition*</Label>
              <Select value={condition} onValueChange={setCondition} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="like_new">Like New</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="fair">Fair</SelectItem>
                  <SelectItem value="poor">Poor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Images */}
            <div className="space-y-2">
              <Label>Images (up to 5)*</Label>
              
              <div className="flex flex-wrap gap-4 mt-2">
                {imageUrls.map((url, index) => (
                  <div key={index} className="relative w-24 h-24">
                    <img 
                      src={url} 
                      alt={`Preview ${index}`} 
                      className="w-24 h-24 object-cover rounded-md border" 
                    />
                    <button 
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-white rounded-full p-1 border shadow-sm"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                
                {imageUrls.length < 5 && (
                  <label className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
                    <Plus className="h-6 w-6 text-gray-400" />
                    <span className="text-xs text-gray-500 mt-1">Add Image</span>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handleImageUpload}
                      multiple={true}
                    />
                  </label>
                )}
              </div>
            </div>
            
            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating listing...' : 'Post Listing'}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Sell;
