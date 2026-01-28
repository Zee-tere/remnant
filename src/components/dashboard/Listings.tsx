'use client';

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  Search, Filter, SortAsc, MoreVertical, 
  Eye, MessageSquare, Share2, Heart, 
  Edit, Trash2, Package, CheckCircle, 
  Clock, AlertCircle 
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock data with more details
const initialListings = [
  { 
    id: 1, 
    name: 'Left AirPod Pro', 
    status: 'active', 
    price: 25000, 
    category: 'Electronics',
    condition: 'Used - Good',
    location: 'Lagos, Nigeria',
    views: 124, 
    matches: 3,
    purpose: '✅ Looking to sell',
    description: 'Single left AirPod Pro in good condition. Works perfectly, includes charging case.',
    image: 'https://images.unsplash.com/photo-1588423771077-8c31c5b2c0c3?w=400&h=300&fit=crop',
    date: '2 days ago'
  },
  { 
    id: 2, 
    name: 'Mens Right Shoe Size 42', 
    status: 'pending', 
    price: 15000, 
    category: 'Clothing',
    condition: 'Used - Like New',
    location: 'Abuja, Nigeria',
    views: 89, 
    matches: 1,
    purpose: '🤝 Trade/barter',
    description: 'Right shoe only, Nike Air Max. Looking to trade for left shoe size 42.',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop',
    date: '1 week ago'
  },
  { 
    id: 3, 
    name: 'Wooden Dining Table', 
    status: 'sold', 
    price: 45000, 
    category: 'Furniture',
    condition: 'Used - Excellent',
    location: 'Port Harcourt',
    views: 256, 
    matches: 0,
    purpose: '🔄 Donate or give away',
    description: 'Solid wood table, free to good home. Minor scratches but structurally sound.',
    image: 'https://images.unsplash.com/photo-1565791380714-9d5d5188b6b6?w=400&h=300&fit=crop',
    date: '3 weeks ago'
  },
  { 
    id: 4, 
    name: 'Broken iPhone 12 Screen', 
    status: 'active', 
    price: 8000, 
    category: 'Electronics',
    condition: 'For Parts',
    location: 'Ibadan, Nigeria',
    views: 45, 
    matches: 2,
    purpose: '🔧 Fix/repurpose',
    description: 'Screen assembly only. Perfect for repair or parts.',
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop',
    date: '1 day ago'
  },
  { 
    id: 5, 
    name: 'Vintage Camera Lens', 
    status: 'active', 
    price: 35000, 
    category: 'Hobbies',
    condition: 'Vintage - Working',
    location: 'Enugu, Nigeria',
    views: 167, 
    matches: 5,
    purpose: '✅ Looking to sell',
    description: 'Canon FD 50mm f/1.4 lens. Great condition for vintage photography.',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=400&h=300&fit=crop',
    date: '5 days ago'
  },
  { 
    id: 6, 
    name: 'Single Gold Earring', 
    status: 'pending', 
    price: 12000, 
    category: 'Jewelry',
    condition: 'New - Never Worn',
    location: 'Kano, Nigeria',
    views: 78, 
    matches: 0,
    purpose: '🤝 Trade/barter',
    description: 'Lost the pair, looking to trade for something of equal value.',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=300&fit=crop',
    date: '4 days ago'
  },
];

// Status colors mapping
const statusColors = {
  active: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  sold: 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-400',
  expired: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
};

// Simple Badge component since we removed the import
const StatusBadge = ({ 
  status, 
  className 
}: { 
  status: keyof typeof statusColors; 
  className?: string 
}) => {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[status]} ${className || ''}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const PurposeBadge = ({ 
  purpose, 
  className 
}: { 
  purpose: string; 
  className?: string 
}) => {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-neutral-300 bg-white/90 dark:bg-black/90 dark:border-neutral-700 ${className || ''}`}>
      {purpose.split(' ')[0]}
    </span>
  );
};

export default function ListingsSection() {
  const [listings, setListings] = useState(initialListings);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Filter and sort listings
  const filteredListings = listings
    .filter(listing => {
      const matchesSearch = listing.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          listing.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || listing.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'views': return b.views - a.views;
        case 'newest': return new Date(b.date).getTime() - new Date(a.date).getTime();
        default: return 0;
      }
    });

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      setListings(listings.filter(listing => listing.id !== id));
    }
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    setListings(listings.map(listing => 
      listing.id === id ? { ...listing, status: newStatus } : listing
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header with stats and filters */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">My Listings</h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            {listings.length} total listings • {listings.filter(l => l.status === 'active').length} active
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size={isMobile ? "sm" : "default"}>
            <Package className="mr-2" size={16} />
            Bulk Actions
          </Button>
          <Button size={isMobile ? "sm" : "default"}>
            + New Listing
          </Button>
        </div>
      </motion.div>

      {/* Search and Filter Bar */}
      <div className="bg-white dark:bg-neutral-900 rounded-xl p-4 shadow-sm border border-neutral-200 dark:border-neutral-800">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
            <Input
              placeholder="Search your listings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter size={16} className="mr-2" />
                  Status: {statusFilter === 'all' ? 'All' : statusFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setStatusFilter('all')}>All Status</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('active')}>Active</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('pending')}>Pending</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('sold')}>Sold</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <SortAsc size={16} className="mr-2" />
                  Sort: {sortBy}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSortBy('newest')}>Newest First</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('price-low')}>Price: Low to High</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('price-high')}>Price: High to Low</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('views')}>Most Viewed</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Views', value: '1,759', icon: Eye, color: 'blue' },
          { label: 'Active Matches', value: '12', icon: MessageSquare, color: 'green' },
          { label: 'Items Sold', value: '8', icon: CheckCircle, color: 'purple' },
          { label: 'Revenue', value: '₦245,000', icon: Package, color: 'amber' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">{stat.label}</p>
                    <p className="text-2xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-${stat.color}-100 dark:bg-${stat.color}-900/30`}>
                    <stat.icon className={`text-${stat.color}-600 dark:text-${stat.color}-400`} size={24} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <Package className="mx-auto text-neutral-400" size={48} />
            <h3 className="mt-4 text-lg font-semibold">No listings found</h3>
            <p className="text-neutral-500 mt-2">Try adjusting your search or filters</p>
          </div>
        ) : (
          filteredListings.map((listing, index) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              layout
            >
              <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300">
                {/* Listing Image */}
                <div className="relative aspect-square overflow-hidden rounded-t-xl">
                  <img
                    src={listing.image}
                    alt={listing.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  {/* Status Badge */}
                  <div className="absolute top-3 left-3">
                    <StatusBadge status={listing.status as keyof typeof statusColors} />
                  </div>
                  {/* Purpose Badge */}
                  <div className="absolute top-3 right-3">
                    <PurposeBadge purpose={listing.purpose} />
                  </div>
                  {/* Quick Actions Overlay */}
                  <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 hover:opacity-100 transition-opacity">
                    <Button size="icon" variant="secondary" className="h-8 w-8">
                      <Heart size={14} />
                    </Button>
                    <Button size="icon" variant="secondary" className="h-8 w-8">
                      <Share2 size={14} />
                    </Button>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-bold line-clamp-1">{listing.name}</CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleStatusChange(listing.id, 'active')}>
                          <CheckCircle className="mr-2" size={14} /> Mark Active
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(listing.id, 'sold')}>
                          <CheckCircle className="mr-2" size={14} /> Mark Sold
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Edit className="mr-2" size={14} /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(listing.id)}>
                          <Trash2 className="mr-2" size={14} /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <p className="text-lg font-bold text-green-600">{formatCurrency(listing.price)}</p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2">
                    {listing.description}
                  </p>
                </CardHeader>

                <CardContent className="pb-3">
                  <div className="space-y-3">
                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center">
                        <Package size={14} className="mr-2 text-neutral-400" />
                        <span>{listing.category}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock size={14} className="mr-2 text-neutral-400" />
                        <span>{listing.date}</span>
                      </div>
                    </div>
                    
                    {/* Engagement Stats */}
                    <div className="flex items-center justify-between text-sm text-neutral-500">
                      <span className="flex items-center">
                        <Eye size={14} className="mr-1" />
                        {listing.views} views
                      </span>
                      <span className="flex items-center">
                        <MessageSquare size={14} className="mr-1" />
                        {listing.matches} matches
                      </span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="pt-0 mt-auto">
                  <div className="flex gap-2 w-full">
                    <Button variant="outline" className="flex-1" size="sm">
                      <MessageSquare size={14} className="mr-2" />
                      Messages
                    </Button>
                    <Button variant="default" className="flex-1" size="sm">
                      <Edit size={14} className="mr-2" />
                      Edit
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      {/* Pagination */}
      {filteredListings.length > 0 && (
        <div className="flex justify-center items-center gap-2 pt-6">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="default" size="sm" className="w-8 h-8 p-0">
            1
          </Button>
          <Button variant="outline" size="sm" className="w-8 h-8 p-0">
            2
          </Button>
          <Button variant="outline" size="sm" className="w-8 h-8 p-0">
            3
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      )}
    </div>
  );
}