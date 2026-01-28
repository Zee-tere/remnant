'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { 
  Search, Filter, MoreVertical, Send, Paperclip, 
  Image as ImageIcon, Smile, Phone, Video, 
  Check, CheckCheck, Clock, Reply, 
  Trash2, Archive, Ban, Flag
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Conversation {
  id: string;
  user: {
    name: string;
    avatar: string;
    online: boolean;
    rating: number;
  };
  listing: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  messages: {
    id: string;
    sender: 'me' | 'them';
    text: string;
    time: string;
  }[];
  archived?: boolean;
}

const initialConversations: Conversation[] = [
  {
    id: '1',
    user: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop',
      online: true,
      rating: 4.9,
    },
    listing: 'Left AirPod Pro',
    lastMessage: 'Is this still available? I can pick up today.',
    timestamp: '10:30 AM',
    unread: 2,
    messages: [
      { id: '1', sender: 'them', text: 'Hi, I saw your AirPod listing', time: '10:15 AM' },
      { id: '2', sender: 'them', text: 'Is this still available? I can pick up today.', time: '10:30 AM' },
    ],
  },
  {
    id: '2',
    user: {
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      online: false,
      rating: 4.7,
    },
    listing: 'Wooden Dining Table',
    lastMessage: 'Thanks for the table! It\'s perfect for my dining room.',
    timestamp: 'Yesterday',
    unread: 0,
    messages: [
      { id: '1', sender: 'them', text: 'Hi, interested in the table', time: '2 days ago' },
      { id: '2', sender: 'me', text: 'Yes, it\'s available for pickup', time: '1 day ago' },
      { id: '3', sender: 'them', text: 'Thanks for the table! It\'s perfect for my dining room.', time: 'Yesterday' },
    ],
  },
  {
    id: '3',
    user: {
      name: 'Amara Okeke',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
      online: true,
      rating: 5.0,
    },
    listing: 'Single Gold Earring',
    lastMessage: 'Can we trade for my silver bracelet?',
    timestamp: '2 days ago',
    unread: 1,
    messages: [
      { id: '1', sender: 'them', text: 'I have a silver bracelet, interested in trading?', time: '2 days ago' },
      { id: '2', sender: 'me', text: 'Can you send photos?', time: '1 day ago' },
      { id: '3', sender: 'them', text: 'Can we trade for my silver bracelet?', time: '2 days ago' },
    ],
  },
  {
    id: '4',
    user: {
      name: 'David Smith',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      online: true,
      rating: 4.5,
    },
    listing: 'Vintage Camera Lens',
    lastMessage: 'What\'s your best price?',
    timestamp: '3 days ago',
    unread: 0,
    messages: [
      { id: '1', sender: 'them', text: 'Hi, is the lens still available?', time: '3 days ago' },
      { id: '2', sender: 'me', text: 'Yes, it is!', time: '3 days ago' },
      { id: '3', sender: 'them', text: 'What\'s your best price?', time: '3 days ago' },
    ],
  },
];

export default function MessagesSection() {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [activeConversation, setActiveConversation] = useState<string | null>('1');
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [isMobile, setIsMobile] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation, conversations]);

  const activeConv = conversations.find(c => c.id === activeConversation);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeConversation) return;

    const updatedConversations = conversations.map(conv => {
      if (conv.id === activeConversation) {
        const newMsg = {
          id: Date.now().toString(),
          sender: 'me' as const,
          text: newMessage,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        return {
          ...conv,
          lastMessage: newMessage,
          timestamp: 'Now',
          unread: 0,
          messages: [...conv.messages, newMsg],
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = 
      conv.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.listing.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'unread' && conv.unread > 0);
    return matchesSearch && matchesFilter;
  });

  const ConversationList = () => (
    <div className={cn(
      "h-full flex flex-col",
      isMobile && !activeConversation ? "block" : isMobile ? "hidden" : "block"
    )}>
      <div className="p-4 border-b">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['all', 'unread', 'buyers', 'sellers', 'offers'].map((filterType) => (
            <Button
              key={filterType}
              variant={filter === filterType ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(filterType)}
              className="whitespace-nowrap"
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <AnimatePresence>
          {filteredConversations.map((conv) => (
            <motion.div
              key={conv.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
              className={cn(
                "p-4 border-b cursor-pointer transition-colors",
                activeConversation === conv.id && "bg-neutral-100 dark:bg-neutral-800"
              )}
              onClick={() => {
                setActiveConversation(conv.id);
                if (conv.unread > 0) {
                  setConversations(convs => 
                    convs.map(c => c.id === conv.id ? { ...c, unread: 0 } : c)
                  );
                }
              }}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={conv.user.avatar} alt={conv.user.name} />
                    <AvatarFallback>{conv.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {conv.user.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-sm truncate">{conv.user.name}</h4>
                      <p className="text-xs text-neutral-500 truncate">{conv.listing}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-neutral-500">{conv.timestamp}</span>
                      {conv.unread > 0 && (
                        <Badge className="bg-green-500 text-white text-xs px-1.5 py-0.5">
                          {conv.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 truncate mt-1">
                    {conv.lastMessage}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-neutral-500 flex items-center">
                      <span className="text-yellow-500 mr-1">★</span>
                      {conv.user.rating}
                    </span>
                    <span className="text-xs text-neutral-500">•</span>
                    <span className="text-xs text-green-600 font-medium">
                      {conv.listing.includes('AirPod') ? 'Pair Match Found!' : 'Active'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );

  const ChatWindow = () => {
    if (!activeConv) return null;

    return (
      <div className={cn(
        "h-full flex flex-col bg-white dark:bg-neutral-900",
        isMobile ? "block" : "rounded-xl border"
      )}>
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setActiveConversation(null)}
              >
                ←
              </Button>
            )}
            <Avatar>
              <AvatarImage src={activeConv.user.avatar} alt={activeConv.user.name} />
              <AvatarFallback>{activeConv.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{activeConv.user.name}</h3>
              <div className="flex items-center gap-2 text-sm">
                <span className="flex items-center text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-1" />
                  Online
                </span>
                <span>•</span>
                <span className="text-neutral-500">{activeConv.listing}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Phone size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <Video size={20} />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical size={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Archive size={16} className="mr-2" /> Archive
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Ban size={16} className="mr-2" /> Block
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Flag size={16} className="mr-2" /> Report
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <Trash2 size={16} className="mr-2" /> Delete Chat
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeConv.listing.includes('AirPod') && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold">🎯 Pair Match Found!</h4>
                  <p className="text-sm opacity-90">Sarah has the matching Right AirPod Pro</p>
                </div>
                <Button size="sm" className="bg-white text-green-600 hover:bg-white/90">
                  View Match
                </Button>
              </div>
            </motion.div>
          )}

          <AnimatePresence>
            {activeConv.messages.map((msg, index) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={cn(
                  "flex gap-3",
                  msg.sender === 'me' ? "justify-end" : "justify-start"
                )}
              >
                {msg.sender === 'them' && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={activeConv.user.avatar} alt={activeConv.user.name} />
                    <AvatarFallback>{activeConv.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
                <div className={cn(
                  "max-w-[70%] rounded-2xl p-3",
                  msg.sender === 'me'
                    ? "bg-green-500 text-white rounded-br-none"
                    : "bg-neutral-100 dark:bg-neutral-800 rounded-bl-none"
                )}>
                  <p className="text-sm">{msg.text}</p>
                  <div className={cn(
                    "flex items-center gap-1 mt-1 text-xs",
                    msg.sender === 'me' ? "text-white/70" : "text-neutral-500"
                  )}>
                    <span>{msg.time}</span>
                    {msg.sender === 'me' && (
                      <>
                        <CheckCheck size={12} />
                        <span>Read</span>
                      </>
                    )}
                  </div>
                </div>
                {msg.sender === 'me' && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage 
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" 
                      alt="You" 
                    />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t">
          <div className="flex items-end gap-2">
            <div className="flex-1 bg-neutral-100 dark:bg-neutral-800 rounded-2xl">
              <Textarea
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                className="min-h-[44px] max-h-32 border-0 bg-transparent resize-none focus-visible:ring-0"
                rows={1}
              />
              <div className="flex items-center justify-between px-3 pb-2">
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Paperclip size={18} />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ImageIcon size={18} />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Smile size={18} />
                  </Button>
                </div>
                <Button
                  size="sm"
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  Send <Send size={16} className="ml-2" />
                </Button>
              </div>
            </div>
          </div>
          <p className="text-xs text-neutral-500 text-center mt-2">
            Messages are end-to-end encrypted • Be safe when meeting in person
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="h-[calc(100vh-200px)] md:h-[600px]">
      {isMobile ? (
        <div className="h-full">
          {activeConversation ? <ChatWindow /> : <ConversationList />}
        </div>
      ) : (
        <div className="grid grid-cols-3 h-full gap-4">
          <div className="col-span-1 border rounded-xl overflow-hidden">
            <ConversationList />
          </div>
          <div className="col-span-2">
            <ChatWindow />
          </div>
        </div>
      )}
    </div>
  );
}