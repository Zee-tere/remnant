'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function AlertsSection() {
  const alerts = [
    { id: 1, message: 'Your listing "Wooden Table" has a new offer!' },
    { id: 2, message: 'Price alert: "Metal Scrap" matches your criteria.' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4">
      {alerts.map((alert) => (
        <Card key={alert.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors">
          <CardHeader>
            <CardTitle>Alert</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{alert.message}</p>
          </CardContent>
        </Card>
      ))}
    </motion.div>
  );
}
