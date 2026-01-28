'use client';

import { Home, UploadCloud, Bell, Mail, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function DashboardSidebar({
  onSelectSection,
  activeSection,
}: {
  onSelectSection: (section: 'listings' | 'messages' | 'alerts' | 'upload') => void;
  activeSection: string;
}) {
  const menuItems = [
    { label: 'Listings', icon: Home, section: 'listings' },
    { label: 'Messages', icon: Mail, section: 'messages' },
    { label: 'Alerts', icon: Bell, section: 'alerts' },
    { label: 'Upload Item', icon: UploadCloud, section: 'upload' },
  ];

  return (
    <motion.div
      initial={{ x: -50 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full md:w-64 bg-neutral-200 dark:bg-neutral-800 shadow-lg p-4 md:p-8 flex flex-row md:flex-col justify-between md:justify-start md:gap-8"
    >
      <div className="flex flex-row md:flex-col gap-4 md:gap-6 w-full">
        {menuItems.map((item) => (
          <Button
            key={item.section}
            variant={activeSection === item.section ? 'default' : 'ghost'}
            onClick={() => onSelectSection(item.section as any)}
            className="flex items-center justify-center md:justify-start gap-2 transition-all w-full"
          >
            <item.icon size={20} />
            <span className="hidden md:inline">{item.label}</span>
          </Button>
        ))}
      </div>

      <div className="hidden md:block mt-auto">
        <Button variant="destructive" className="w-full flex items-center gap-2">
          <LogOut size={20} />
          Logout
        </Button>
      </div>
    </motion.div>
  );
}
