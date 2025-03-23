
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Heart, MapPin } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export interface ListingProps {
  id: string;
  title: string;
  price: number;
  image: string;
  location: string;
  category: string;
  isUrgent?: boolean;
  isNegotiable?: boolean;
  createdAt: string;
}

const ListingCard = ({ listing }: { listing: ListingProps }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  
  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };
  
  const formattedDate = new Date(listing.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });

  return (
    <Link to={`/listings/${listing.id}`}>
      <Card className="overflow-hidden hover-lift h-full">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img 
            src={listing.image} 
            alt={listing.title}
            className="object-cover h-full w-full transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
          
          <button
            onClick={handleFavorite}
            className="absolute top-3 right-3 h-8 w-8 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow transition-colors hover:bg-white"
          >
            <Heart 
              className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
            />
          </button>
          
          {listing.isUrgent && (
            <Badge variant="destructive" className="absolute top-3 left-3">
              Urgent
            </Badge>
          )}
        </div>
        
        <CardContent className="p-4">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-medium line-clamp-1">{listing.title}</h3>
            <p className="text-lg font-semibold whitespace-nowrap">${listing.price}</p>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground mt-1">
            <MapPin className="h-3.5 w-3.5 mr-1" />
            <span className="line-clamp-1">{listing.location}</span>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 flex justify-between text-xs text-muted-foreground">
          <Badge variant="secondary">{listing.category}</Badge>
          <span>{formattedDate}</span>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ListingCard;
