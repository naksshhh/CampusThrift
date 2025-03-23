
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bell, MessageSquare, Heart, Tag, DollarSign, 
  ShoppingCart, AlertCircle, Settings, Check, Trash2
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  // Mock notifications data
  const allNotifications = [
    {
      id: '1',
      type: 'message',
      title: 'New message from Jake Wilson',
      content: 'Hey, is the calculator still available?',
      time: new Date(Date.now() - 1000 * 60 * 5),
      read: false,
      icon: <MessageSquare className="h-4 w-4" />,
      color: 'bg-blue-500',
      link: '/messages/1',
      user: {
        name: 'Jake Wilson',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      }
    },
    {
      id: '2',
      type: 'like',
      title: 'Your listing received a like',
      content: 'Someone liked your "TI-84 Calculator" listing',
      time: new Date(Date.now() - 1000 * 60 * 60 * 2),
      read: false,
      icon: <Heart className="h-4 w-4" />,
      color: 'bg-pink-500',
      link: '/listings/201',
      user: {
        name: 'Alex Johnson',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
      }
    },
    {
      id: '3',
      type: 'price',
      title: 'Price drop alert',
      content: 'A textbook on your wishlist has dropped in price',
      time: new Date(Date.now() - 1000 * 60 * 60 * 5),
      read: true,
      icon: <Tag className="h-4 w-4" />,
      color: 'bg-green-500',
      link: '/listings/301'
    },
    {
      id: '4',
      type: 'payment',
      title: 'Payment received',
      content: 'You received a payment of $45 for TI-84 Calculator',
      time: new Date(Date.now() - 1000 * 60 * 60 * 24),
      read: true,
      icon: <DollarSign className="h-4 w-4" />,
      color: 'bg-emerald-500',
      link: '/payments/history'
    },
    {
      id: '5',
      type: 'purchase',
      title: 'Order confirmed',
      content: 'Your purchase of "Psychology Textbook" has been confirmed',
      time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      read: true,
      icon: <ShoppingCart className="h-4 w-4" />,
      color: 'bg-indigo-500',
      link: '/orders/101'
    },
    {
      id: '6',
      type: 'system',
      title: 'Verify your email',
      content: 'Please verify your email address to unlock all features',
      time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
      read: true,
      icon: <AlertCircle className="h-4 w-4" />,
      color: 'bg-amber-500',
      link: '/settings/account'
    },
    {
      id: '7',
      type: 'message',
      title: 'New message from Maria Lopez',
      content: 'Would you take $25 for the textbook?',
      time: new Date(Date.now() - 1000 * 60 * 60 * 3),
      read: true,
      icon: <MessageSquare className="h-4 w-4" />,
      color: 'bg-blue-500',
      link: '/messages/2',
      user: {
        name: 'Maria Lopez',
        avatar: 'https://randomuser.me/api/portraits/women/65.jpg'
      }
    }
  ];
  
  // Filter notifications based on active tab
  const filteredNotifications = allNotifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification.read;
    if (activeTab === 'messages') return notification.type === 'message';
    if (activeTab === 'system') return notification.type === 'system';
    return true;
  });
  
  const formatNotificationTime = (time: Date) => {
    const now = new Date();
    const timeDifference = now.getTime() - time.getTime();
    
    // If less than 24 hours ago
    if (timeDifference < 24 * 60 * 60 * 1000) {
      return formatDistanceToNow(time, { addSuffix: true });
    }
    
    // If this year
    if (time.getFullYear() === now.getFullYear()) {
      return format(time, 'MMM d, h:mm a');
    }
    
    // If different year
    return format(time, 'MMM d, yyyy');
  };
  
  const unreadCount = allNotifications.filter(notification => !notification.read).length;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container max-w-4xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">Notifications</h1>
              <p className="text-muted-foreground">
                {unreadCount > 0 ? `You have ${unreadCount} unread notifications` : 'You\'re all caught up!'}
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Check className="h-4 w-4 mr-2" />
                Mark all as read
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList>
              <TabsTrigger value="all">
                All
                {unreadCount > 0 && (
                  <span className="ml-1 px-1.5 bg-primary/10 text-primary rounded-full text-xs">
                    {allNotifications.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="unread">
                Unread
                {unreadCount > 0 && (
                  <span className="ml-1 px-1.5 bg-primary/10 text-primary rounded-full text-xs">
                    {unreadCount}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="space-y-4">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map(notification => (
                <div 
                  key={notification.id}
                  className={`p-4 border rounded-lg transition-colors ${
                    notification.read ? 'bg-white' : 'bg-primary/5'
                  }`}
                >
                  <div className="flex items-start">
                    {notification.user ? (
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={notification.user.avatar} alt={notification.user.name} />
                        <AvatarFallback>{notification.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className={`h-10 w-10 rounded-full ${notification.color} flex items-center justify-center text-white`}>
                        {notification.icon}
                      </div>
                    )}
                    
                    <div className="ml-3 flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className={`font-medium ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {notification.title}
                          </h3>
                          <p className={`text-sm mt-1 ${!notification.read ? 'text-muted-foreground' : 'text-muted-foreground/80'}`}>
                            {notification.content}
                          </p>
                        </div>
                        
                        <div className="flex items-center ml-2">
                          <span className="text-xs text-muted-foreground">
                            {formatNotificationTime(notification.time)}
                          </span>
                          <Button variant="ghost" size="icon" className="h-8 w-8 ml-2">
                            <Trash2 className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </div>
                      </div>
                      
                      {!notification.read && (
                        <Button variant="link" size="sm" className="h-auto p-0 mt-2">
                          Mark as read
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 border rounded-lg">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No notifications</h3>
                <p className="text-muted-foreground mb-4">
                  {activeTab === 'all' 
                    ? 'You don\'t have any notifications yet' 
                    : activeTab === 'unread'
                      ? 'You don\'t have any unread notifications'
                      : `You don\'t have any ${activeTab} notifications`
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Notifications;
