
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Heart,
  MapPin,
  Clock,
  Share2,
  MessageSquare,
  AlertTriangle,
  ChevronLeft,
  User,
  Star,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { ListingProps } from '@/components/listing/ListingCard';
import { MOCK_LISTINGS } from '@/data/mockData';

const ListingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [listing, setListing] = useState<ListingProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    // In a real app, fetch the listing from API
    setIsLoading(true);
    setTimeout(() => {
      const foundListing = MOCK_LISTINGS.find(item => item.id === id);
      if (foundListing) {
        setListing(foundListing);
      }
      setIsLoading(false);
    }, 600);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="container max-w-6xl py-20 mt-16">
          <div className="animate-pulse space-y-8">
            <div className="h-8 w-48 bg-muted rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="aspect-[4/3] bg-muted rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-muted rounded w-3/4"></div>
                <div className="h-6 bg-muted rounded w-1/4"></div>
                <div className="h-4 bg-muted rounded w-2/4 mt-8"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="container max-w-6xl py-20 mt-16 text-center">
          <h2 className="text-2xl font-medium mb-4">Listing Not Found</h2>
          <p className="text-muted-foreground mb-8">The listing you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </main>
      </div>
    );
  }

  // Create multiple images from the single image for demonstration
  const images = [
    listing.image,
    listing.image + '?random=1',
    listing.image + '?random=2',
    listing.image + '?random=3',
  ];

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  const formattedDate = new Date(listing.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container max-w-6xl py-8 pt-28">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6 -ml-2" onClick={() => navigate(-1)}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Listings
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 animate-fade-in">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-[4/3] rounded-lg overflow-hidden border">
              <img 
                src={images[selectedImage]} 
                alt={listing.title} 
                className="object-cover h-full w-full"
              />
            </div>
            
            <div className="flex gap-4 overflow-x-auto pb-2">
              {images.map((image, index) => (
                <button 
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-[4/3] w-20 rounded-md overflow-hidden border-2 flex-shrink-0 transition-all ${
                    selectedImage === index 
                      ? 'border-primary ring-2 ring-primary ring-opacity-20' 
                      : 'border-border opacity-70 hover:opacity-100'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`View ${index + 1}`} 
                    className="object-cover h-full w-full"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Listing Details */}
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-start gap-4">
                <h1 className="text-2xl md:text-3xl font-medium">{listing.title}</h1>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={handleFavorite}>
                    <Heart className={`h-5 w-5 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              <p className="text-2xl font-semibold mt-2">${listing.price}</p>
              
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="secondary">{listing.category}</Badge>
                {listing.isUrgent && <Badge variant="destructive">Urgent</Badge>}
                {listing.isNegotiable && <Badge variant="outline">Negotiable</Badge>}
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{listing.location}</span>
              </div>
              <div className="flex items-center text-sm">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>Posted on {formattedDate}</span>
              </div>
            </div>
            
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="seller">Seller Info</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="space-y-4 pt-4">
                <p className="text-muted-foreground">
                  {listing.title} in excellent condition. This item has been lightly used and is 
                  still in great shape. Selling because I no longer need it. 
                  Perfect for any student looking for a quality item at a reasonable price.
                </p>
                <div className="pt-2">
                  <h3 className="font-medium">Details:</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-2">
                    <li>Excellent condition</li>
                    <li>Purchased 6 months ago</li>
                    <li>Original packaging included</li>
                    <li>Pickup available at {listing.location}</li>
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="seller" className="pt-4">
                <Card className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                      <User className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium">Alex Johnson</h3>
                      <div className="flex items-center mt-1">
                        <div className="flex">
                          {[...Array(5)].map((_, index) => (
                            <Star 
                              key={index} 
                              className={`h-4 w-4 ${index < 4 ? 'fill-amber-400 text-amber-400' : 'text-muted'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground ml-2">4.0 (12 reviews)</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">Member since September 2023</p>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button className="flex-1" asChild>
                <Link to={`/messages/new?listing=${listing.id}`}>
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Contact Seller
                </Link>
              </Button>
              <Button variant="outline" className="flex-1" asChild>
                <Link to="/safety-tips">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Safety Tips
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Similar listings section would go here */}
      </main>
    </div>
  );
};

export default ListingDetail;
