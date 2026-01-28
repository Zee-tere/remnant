'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function ListingsSection() {
  const listings = [
    { id: 1, name: 'Wooden Table', status: 'Active' },
    { id: 2, name: 'Old Books', status: 'Pending' },
    { id: 3, name: 'Metal Scrap', status: 'Sold' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {listings.map((listing) => (
        <Card key={listing.id} className="hover:shadow-xl transition-all">
          <CardHeader>
            <CardTitle>{listing.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-2">Status: {listing.status}</p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                Edit
              </Button>
              <Button size="sm" variant="destructive">
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </motion.div>
  );
}
