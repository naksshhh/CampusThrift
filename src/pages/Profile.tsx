
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockListings } from '@/data/mockData';
import ListingCard from '@/components/listing/ListingCard';
import { Star, Mail, Phone, Edit, ExternalLink, Flag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('listings');
  
  // Mock user data
  const user = {
    id: '1',
    name: 'Sarah Johnson',
    username: 'sarahj',
    email: 'sarah.j@university.edu',
    phone: '(555) 123-4567',
    bio: 'Senior at State University studying Computer Science. I sell things I no longer need and buy unique finds for my dorm!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3',
    verified: true,
    joinedDate: 'September 2022',
    rating: 4.8,
    reviewCount: 27,
    activeListings: mockListings.slice(0, 3),
    soldListings: mockListings.slice(3, 8)
  };
  
  // Mock reviews
  const reviews = [
    {
      id: '1',
      from: 'Michael T.',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 5,
      date: '2 weeks ago',
      text: 'Sarah was great to work with! The textbook was in perfect condition as described. Very responsive and made the exchange easy.'
    },
    {
      id: '2',
      from: 'Alex R.',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      rating: 5,
      date: '1 month ago',
      text: 'Quick responses and fair price. Would definitely buy from again!'
    },
    {
      id: '3',
      from: 'Jamie L.',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
      rating: 4,
      date: '3 months ago',
      text: 'Good transaction overall. The item had a small scratch not mentioned in the listing, but Sarah was upfront about it when we met and offered a discount.'
    }
  ];

  // Render star rating
  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container max-w-6xl">
          {/* Profile Header */}
          <div className="bg-white rounded-lg border shadow-sm p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="mt-4 text-center">
                  <div className="flex items-center justify-center">
                    {renderStars(user.rating)}
                    <span className="ml-1 text-sm font-medium">{user.rating}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {user.reviewCount} reviews
                  </p>
                </div>
              </div>
              
              <div className="flex-1 md:border-l md:pl-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center">
                      <h1 className="text-2xl font-bold">{user.name}</h1>
                      {user.verified && (
                        <Badge variant="outline" className="ml-2">Verified Student</Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground">@{user.username}</p>
                    <p className="text-sm text-muted-foreground mt-1">Member since {user.joinedDate}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Mail className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Flag className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <p className="mt-4">{user.bio}</p>
                
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{user.phone}</span>
                  </div>
                </div>
                
                <div className="mt-6 flex flex-wrap gap-2">
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">Quick Responder</Badge>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-200">Trusted Seller</Badge>
                  <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">10+ Transactions</Badge>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs Section */}
          <Tabs defaultValue="listings" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8">
              <TabsTrigger value="listings">Listings</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="listings" className="space-y-8">
              {/* Active Listings */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Active Listings ({user.activeListings.length})</h2>
                {user.activeListings.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {user.activeListings.map(listing => (
                      <ListingCard key={listing.id} listing={listing} />
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No active listings.</p>
                )}
              </div>
              
              {/* Sold Listings */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Sold Items ({user.soldListings.length})</h2>
                {user.soldListings.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {user.soldListings.map(listing => (
                      <ListingCard key={listing.id} listing={{...listing, sold: true}} />
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No sold items yet.</p>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="reviews">
              {/* Rating Summary */}
              <div className="bg-white rounded-lg border p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Ratings & Reviews</h2>
                
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex flex-col items-center justify-center md:w-48">
                    <div className="text-5xl font-bold">{user.rating}</div>
                    <div className="mt-2">{renderStars(user.rating)}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Based on {user.reviewCount} reviews
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map(star => {
                      // Mock percentages
                      const percentage = star === 5 ? 75 : star === 4 ? 18 : star === 3 ? 5 : star === 2 ? 2 : 0;
                      return (
                        <div key={star} className="flex items-center">
                          <div className="flex items-center w-12">
                            <span className="text-sm mr-1">{star}</span>
                            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                          </div>
                          <div className="flex-1 mx-2">
                            <Progress value={percentage} className="h-2" />
                          </div>
                          <div className="w-8 text-right text-sm text-muted-foreground">
                            {percentage}%
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              {/* Review List */}
              <div className="space-y-6">
                {reviews.map(review => (
                  <div key={review.id} className="bg-white rounded-lg border p-6">
                    <div className="flex justify-between mb-4">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src={review.avatar} alt={review.from} />
                          <AvatarFallback>{review.from.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{review.from}</div>
                          <div className="text-sm text-muted-foreground">{review.date}</div>
                        </div>
                      </div>
                      {renderStars(review.rating)}
                    </div>
                    <p className="text-gray-700">{review.text}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Profile;
