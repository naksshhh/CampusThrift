
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import ListingCard, { ListingProps } from '@/components/listing/ListingCard';
import { ArrowRight } from 'lucide-react';

// Mock data for featured listings
const MOCK_LISTINGS: ListingProps[] = [
  {
    id: '1',
    title: 'Physics Textbook - University Physics 14th Edition',
    price: 45,
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765',
    location: 'University Library',
    category: 'Textbooks',
    isNegotiable: true,
    createdAt: '2023-09-01T12:00:00Z'
  },
  {
    id: '2',
    title: 'Apple MacBook Pro 2019 - Great Condition',
    price: 850,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
    location: 'Student Center',
    category: 'Electronics',
    isUrgent: true,
    createdAt: '2023-09-02T14:30:00Z'
  },
  {
    id: '3',
    title: 'Comfortable Desk Chair - Barely Used',
    price: 65,
    image: 'https://images.unsplash.com/photo-1595187139760-5cedf9d3fad0',
    location: 'North Campus',
    category: 'Furniture',
    createdAt: '2023-09-03T09:15:00Z'
  },
  {
    id: '4',
    title: 'Graphing Calculator - TI-84 Plus',
    price: 50,
    image: 'https://images.unsplash.com/photo-1564965278459-814e86dbd089',
    location: 'Math Building',
    category: 'Electronics',
    createdAt: '2023-09-04T16:45:00Z'
  },
  {
    id: '5',
    title: 'Mountain Bike - Trek 3500',
    price: 220,
    image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91',
    location: 'South Campus',
    category: 'Sports',
    isNegotiable: true,
    createdAt: '2023-09-05T11:20:00Z'
  },
  {
    id: '6',
    title: 'Dorm Room Mini Fridge',
    price: 75,
    image: 'https://images.unsplash.com/photo-1536353284924-9220c464e262',
    location: 'Freshman Dorms',
    category: 'Appliances',
    isUrgent: true,
    createdAt: '2023-09-06T10:00:00Z'
  },
  {
    id: '7',
    title: 'Psychology 101 Complete Notes Bundle',
    price: 25,
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8',
    location: 'Psychology Department',
    category: 'Notes',
    createdAt: '2023-09-07T13:35:00Z'
  },
  {
    id: '8',
    title: 'Dormitory Storage Bins (Set of 3)',
    price: 30,
    image: 'https://images.unsplash.com/photo-1584457644447-c0d637fd27ce',
    location: 'Campus Store',
    category: 'Home Goods',
    createdAt: '2023-09-08T15:15:00Z'
  }
];

const FeaturedListings = () => {
  const [listings, setListings] = useState<ListingProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    const fetchListings = async () => {
      setIsLoading(true);
      // In a real application, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 600));
      setListings(MOCK_LISTINGS);
      setIsLoading(false);
    };

    fetchListings();
  }, []);

  return (
    <section className="py-16 relative">
      <div className="container max-w-6xl">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl md:text-3xl font-medium">Featured Listings</h2>
          <Button variant="ghost" className="group" asChild>
            <a href="/listings">
              <span>View all</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="rounded-lg overflow-hidden animate-pulse">
                <div className="aspect-[4/3] bg-muted"></div>
                <div className="p-4 space-y-2">
                  <div className="h-5 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {listings.map((listing, index) => (
              <div 
                key={listing.id} 
                className="animate-scale-in" 
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <ListingCard listing={listing} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedListings;
