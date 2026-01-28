'use client';

import { Home, UploadCloud, Bell, Mail, LogOut, Settings, User, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface DashboardSidebarProps {
  onSelectSection: (section: 'listings' | 'messages' | 'alerts' | 'upload' | 'profile' | 'settings') => void;
  activeSection: string;
}

export default function DashboardSidebar({ onSelectSection, activeSection }: DashboardSidebarProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const menuItems = [
    { 
      label: 'Dashboard', 
      icon: Home, 
      section: 'listings',
      description: 'Overview of your activity'
    },
    { 
      label: 'My Listings', 
      icon: Package, 
      section: 'listings',
      count: 3,
      badge: 'active'
    },
    { 
      label: 'Messages', 
      icon: Mail, 
      section: 'messages',
      count: 2,
      badge: 'new'
    },
    { 
      label: 'Alerts', 
      icon: Bell, 
      section: 'alerts',
      count: 5
    },
    { 
      label: 'Upload Item', 
      icon: UploadCloud, 
      section: 'upload',
      highlight: true
    },
    { 
      label: 'My Profile', 
      icon: User, 
      section: 'profile'
    },
    { 
      label: 'Settings', 
      icon: Settings, 
      section: 'settings'
    },
  ];

  const userStats = {
    listings: 12,
    sales: 8,
    rating: 4.8,
  };

  // Mobile toggle button
  const MobileToggle = () => (
    <Button
      variant="outline"
      className="fixed top-4 left-4 z-50 md:hidden"
      onClick={() => setSidebarOpen(!sidebarOpen)}
    >
      {sidebarOpen ? 'Close' : 'Menu'}
    </Button>
  );

  const SidebarContent = () => (
    <>
      {/* User Profile Card */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 bg-gradient-to-br from-neutral-900 to-black rounded-2xl mb-8"
      >
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">JD</span>
            </div>
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">John Doe</h3>
            <p className="text-sm text-neutral-300">Premium Seller</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2 bg-white/10 rounded-lg">
            <p className="text-white font-bold">{userStats.listings}</p>
            <p className="text-xs text-neutral-300">Listings</p>
          </div>
          <div className="p-2 bg-white/10 rounded-lg">
            <p className="text-white font-bold">{userStats.sales}</p>
            <p className="text-xs text-neutral-300">Sales</p>
          </div>
          <div className="p-2 bg-white/10 rounded-lg">
            <p className="text-white font-bold">{userStats.rating}</p>
            <p className="text-xs text-neutral-300">Rating</p>
          </div>
        </div>
      </motion.div>

      {/* Navigation Menu */}
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <motion.button
            key={item.section}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              onSelectSection(item.section as any);
              if (isMobile) setSidebarOpen(false);
            }}
            className={cn(
              "w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300",
              "hover:bg-neutral-100 dark:hover:bg-neutral-800",
              activeSection === item.section
                ? "bg-white dark:bg-neutral-800 shadow-md border border-neutral-200 dark:border-neutral-700"
                : "bg-transparent",
              item.highlight ? "border-l-4 border-l-green-500" : ""
            )}
          >
            <div className="flex items-center space-x-3">
              <div className={cn(
                "p-2 rounded-lg",
                activeSection === item.section 
                  ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
              )}>
                <item.icon size={20} />
              </div>
              <div className="text-left">
                <p className="font-medium">{item.label}</p>
                {item.description && (
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
            
            {/* Badges and counts */}
            {item.count && (
              <span className={cn(
                "px-2 py-1 rounded-full text-xs font-medium",
                item.badge === 'new' 
                  ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  : "bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300"
              )}>
                {item.count}
              </span>
            )}
            
            {item.highlight && (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                New
              </span>
            )}
          </motion.button>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="mt-auto pt-8 space-y-4">
        {/* Quick Stats */}
        <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
          <p className="text-sm font-medium mb-2">Quick Stats</p>
          <div className="flex justify-between text-xs text-neutral-600 dark:text-neutral-400">
            <span>Views: 1.2k</span>
            <span>Matches: 4</span>
            <span>Revenue: ₦45k</span>
          </div>
        </div>

        {/* Logout Button */}
        <Button
          variant="destructive"
          className="w-full flex items-center justify-center gap-2 py-6 rounded-xl"
          onClick={() => {
            console.log("Logging out...");
            if (isMobile) setSidebarOpen(false);
          }}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </Button>
      </div>
    </>
  );

  return (
    <>
      <MobileToggle />
      
      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={isMobile ? { x: -300 } : false}
        animate={isMobile ? { x: sidebarOpen ? 0 : -300 } : { x: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "fixed md:relative h-screen md:h-auto",
          "w-80 md:w-64 bg-white dark:bg-neutral-900 shadow-xl md:shadow-lg",
          "border-r border-neutral-200 dark:border-neutral-800",
          "z-40 md:z-auto",
          "overflow-y-auto scrollbar-hide",
          isMobile ? "top-0 left-0" : ""
        )}
      >
        {/* Close button for mobile */}
        {isMobile && (
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 md:hidden"
          >
            ✕
          </button>
        )}

        {/* Sidebar Content */}
        <div className="h-full flex flex-col p-6">
          {/* Logo */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                <span className="text-white font-bold">R</span>
              </div>
              <span className="text-xl font-bold">Dashboard</span>
            </div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Manage your listings and activity
            </p>
          </div>

          <SidebarContent />
        </div>
      </motion.aside>
    </>
  );
}