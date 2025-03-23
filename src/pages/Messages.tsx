
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Send, Image, MapPin, Paperclip, MoreVertical } from 'lucide-react';
import { format } from 'date-fns';

const Messages = () => {
  const [activeConversation, setActiveConversation] = useState<string | null>('1');
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');
  
  // Mock conversations data
  const conversations = [
    {
      id: '1',
      user: {
        id: '101',
        name: 'Jake Wilson',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        online: true
      },
      lastMessage: {
        text: 'Hey, is the calculator still available?',
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        read: true,
        sentByMe: false
      },
      unread: 0,
      listing: {
        id: '201',
        title: 'TI-84 Calculator',
        price: 45,
        image: 'https://images.unsplash.com/photo-1564294646682-60abdd9d3b44?q=80&w=1000&auto=format&fit=crop'
      }
    },
    {
      id: '2',
      user: {
        id: '102',
        name: 'Maria Lopez',
        avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
        online: false
      },
      lastMessage: {
        text: 'Would you take $25 for it?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
        read: true,
        sentByMe: false
      },
      unread: 0,
      listing: {
        id: '202',
        title: 'Psychology Textbook',
        price: 30,
        image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1000&auto=format&fit=crop'
      }
    },
    {
      id: '3',
      user: {
        id: '103',
        name: 'Tyler Adams',
        avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
        online: true
      },
      lastMessage: {
        text: 'Great, let\'s meet tomorrow at the library around 3pm?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
        read: false,
        sentByMe: true
      },
      unread: 3,
      listing: {
        id: '203',
        title: 'Desk Lamp',
        price: 20,
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1000&auto=format&fit=crop'
      }
    }
  ];
  
  // Mock messages for active conversation
  const mockMessages = {
    '1': [
      {
        id: '1001',
        text: 'Hi there! I\'m interested in your TI-84 Calculator. Is it still available?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60),
        sender: '101',
      },
      {
        id: '1002',
        text: 'Yes, it\'s still available!',
        timestamp: new Date(Date.now() - 1000 * 60 * 55),
        sender: 'me',
      },
      {
        id: '1003',
        text: 'Great! What\'s the condition? Does it have all the accessories?',
        timestamp: new Date(Date.now() - 1000 * 60 * 50),
        sender: '101',
      },
      {
        id: '1004',
        text: 'It\'s in excellent condition, barely used. Yes, it comes with the charging cable and cover.',
        timestamp: new Date(Date.now() - 1000 * 60 * 45),
        sender: 'me',
      },
      {
        id: '1005',
        text: 'Perfect. Could I see some more detailed photos?',
        timestamp: new Date(Date.now() - 1000 * 60 * 40),
        sender: '101',
      },
      {
        id: '1006',
        text: 'Sure, here you go:',
        timestamp: new Date(Date.now() - 1000 * 60 * 35),
        sender: 'me',
      },
      {
        id: '1007',
        text: 'Hey, is the calculator still available?',
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        sender: '101',
      },
    ],
    '2': [
      {
        id: '2001',
        text: 'Hello! Is the Psychology textbook still for sale?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
        sender: '102',
      },
      {
        id: '2002',
        text: 'Yes it is!',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4.9),
        sender: 'me',
      },
      {
        id: '2003',
        text: 'The price is $30, right?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4.8),
        sender: '102',
      },
      {
        id: '2004',
        text: 'Would you take $25 for it?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
        sender: '102',
      },
    ],
    '3': [
      {
        id: '3001',
        text: 'Hi! I saw your desk lamp listing. Is it dimmable?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25),
        sender: '103',
      },
      {
        id: '3002',
        text: 'Yes, it has 3 brightness settings!',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24.8),
        sender: 'me',
      },
      {
        id: '3003',
        text: 'That\'s perfect. I\'d like to buy it. When can we meet?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24.5),
        sender: '103',
      },
      {
        id: '3004',
        text: 'I\'m free tomorrow afternoon. Does that work for you?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24.3),
        sender: '103',
      },
      {
        id: '3005',
        text: 'Great, let\'s meet tomorrow at the library around 3pm?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
        sender: 'me',
      },
      {
        id: '3006',
        text: 'Perfect, see you then!',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23.9),
        sender: '103',
      },
      {
        id: '3007',
        text: 'Hey, just confirming our meetup today at 3pm?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
        sender: '103',
      },
      {
        id: '3008',
        text: 'I might be a few minutes late. Is that okay?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
        sender: '103',
      },
    ]
  };
  
  const filteredConversations = conversations.filter(conv => 
    conv.user.name.toLowerCase().includes(search.toLowerCase()) ||
    conv.listing.title.toLowerCase().includes(search.toLowerCase())
  );
  
  const getActiveConversation = () => {
    return conversations.find(conv => conv.id === activeConversation) || null;
  };
  
  const getMessagesForConversation = (id: string) => {
    return mockMessages[id as keyof typeof mockMessages] || [];
  };
  
  const handleSendMessage = () => {
    if (message.trim() && activeConversation) {
      // Here you would typically send the message to an API
      // and then update the UI with the new message
      console.log(`Sending message to conversation ${activeConversation}: ${message}`);
      setMessage('');
    }
  };
  
  const formatTime = (date: Date) => {
    return format(date, 'h:mm a');
  };
  
  const formatMessageDate = (date: Date) => {
    const now = new Date();
    const isToday = date.getDate() === now.getDate() && 
                   date.getMonth() === now.getMonth() && 
                   date.getFullYear() === now.getFullYear();
    
    if (isToday) {
      return formatTime(date);
    }
    
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const isYesterday = date.getDate() === yesterday.getDate() &&
                        date.getMonth() === yesterday.getMonth() &&
                        date.getFullYear() === yesterday.getFullYear();
    
    if (isYesterday) {
      return `Yesterday, ${formatTime(date)}`;
    }
    
    return format(date, 'MMM d, h:mm a');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-8">
        <div className="container max-w-6xl">
          <div className="bg-white border rounded-lg overflow-hidden flex flex-col md:flex-row h-[75vh]">
            {/* Conversation List */}
            <div className="w-full md:w-1/3 border-r">
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search conversations..."
                    className="pl-10"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="overflow-y-auto h-full">
                {filteredConversations.length > 0 ? (
                  filteredConversations.map(conversation => (
                    <div 
                      key={conversation.id}
                      className={`p-3 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                        activeConversation === conversation.id ? 'bg-gray-50' : ''
                      }`}
                      onClick={() => setActiveConversation(conversation.id)}
                    >
                      <div className="flex items-start">
                        <div className="relative">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={conversation.user.avatar} alt={conversation.user.name} />
                            <AvatarFallback>{conversation.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {conversation.user.online && (
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                          )}
                        </div>
                        
                        <div className="ml-3 flex-1 min-w-0">
                          <div className="flex justify-between items-baseline">
                            <h3 className="font-medium truncate">{conversation.user.name}</h3>
                            <span className="text-xs text-muted-foreground">
                              {format(conversation.lastMessage.timestamp, 'h:mm a')}
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-start mt-1">
                            <p className={`text-sm truncate ${
                              conversation.unread && !conversation.lastMessage.sentByMe
                                ? 'font-medium'
                                : 'text-muted-foreground'
                            }`}>
                              {conversation.lastMessage.sentByMe ? 'You: ' : ''}
                              {conversation.lastMessage.text}
                            </p>
                            
                            {conversation.unread > 0 && !conversation.lastMessage.sentByMe && (
                              <div className="bg-primary text-primary-foreground text-xs rounded-full h-5 min-w-5 flex items-center justify-center px-1 ml-2">
                                {conversation.unread}
                              </div>
                            )}
                          </div>
                          
                          <div className="mt-2 flex items-center">
                            <div 
                              className="h-8 w-8 rounded-md bg-cover bg-center"
                              style={{ backgroundImage: `url(${conversation.listing.image})` }}
                            ></div>
                            <span className="text-xs ml-2 truncate">{conversation.listing.title}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-muted-foreground">
                    No conversations found.
                  </div>
                )}
              </div>
            </div>
            
            {/* Message Area */}
            <div className="flex-1 flex flex-col">
              {activeConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b flex justify-between items-center">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10">
                        <AvatarImage 
                          src={getActiveConversation()?.user.avatar} 
                          alt={getActiveConversation()?.user.name} 
                        />
                        <AvatarFallback>
                          {getActiveConversation()?.user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="ml-3">
                        <h3 className="font-medium">{getActiveConversation()?.user.name}</h3>
                        <div className="flex items-center">
                          <span className={`h-2 w-2 rounded-full ${
                            getActiveConversation()?.user.online ? 'bg-green-500' : 'bg-gray-300'
                          }`}></span>
                          <span className="text-xs text-muted-foreground ml-1">
                            {getActiveConversation()?.user.online ? 'Online' : 'Offline'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  {/* Item Details */}
                  <div className="p-3 border-b bg-gray-50 flex items-center">
                    <div 
                      className="h-12 w-12 rounded-md bg-cover bg-center"
                      style={{ backgroundImage: `url(${getActiveConversation()?.listing.image})` }}
                    ></div>
                    <div className="ml-3">
                      <h4 className="font-medium">{getActiveConversation()?.listing.title}</h4>
                      <p className="text-sm">${getActiveConversation()?.listing.price}</p>
                    </div>
                  </div>
                  
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {getMessagesForConversation(activeConversation).map(msg => (
                      <div 
                        key={msg.id} 
                        className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                      >
                        {msg.sender !== 'me' && (
                          <Avatar className="h-8 w-8 mr-2 mt-1">
                            <AvatarImage 
                              src={getActiveConversation()?.user.avatar} 
                              alt={getActiveConversation()?.user.name} 
                            />
                            <AvatarFallback>
                              {getActiveConversation()?.user.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        
                        <div className={`max-w-[75%] ${msg.sender === 'me' ? 'order-1' : 'order-2'}`}>
                          <div className={`p-3 rounded-lg ${
                            msg.sender === 'me' 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-gray-100'
                          }`}>
                            <p>{msg.text}</p>
                          </div>
                          <div className={`text-xs text-muted-foreground mt-1 ${
                            msg.sender === 'me' ? 'text-right' : 'text-left'
                          }`}>
                            {formatMessageDate(msg.timestamp)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Message Input */}
                  <div className="p-4 border-t">
                    <div className="flex items-center">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon" type="button">
                          <Image className="h-5 w-5 text-muted-foreground" />
                        </Button>
                        <Button variant="ghost" size="icon" type="button">
                          <Paperclip className="h-5 w-5 text-muted-foreground" />
                        </Button>
                        <Button variant="ghost" size="icon" type="button">
                          <MapPin className="h-5 w-5 text-muted-foreground" />
                        </Button>
                      </div>
                      
                      <Input
                        className="flex-1 mx-2"
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                      />
                      
                      <Button 
                        type="button"
                        onClick={handleSendMessage}
                        disabled={!message.trim()}
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Send
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-xl font-medium mb-2">Select a conversation</h3>
                    <p className="text-muted-foreground">
                      Choose a conversation from the list to start messaging
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Messages;
