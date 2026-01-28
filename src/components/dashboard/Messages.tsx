'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function MessagesSection() {
  const messages = [
    { id: 1, sender: 'John Doe', subject: 'Interested in Wooden Table' },
    { id: 2, sender: 'Jane Smith', subject: 'Request for old books' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6">
      {messages.map((msg) => (
        <Card key={msg.id} className="hover:shadow-lg transition-all">
          <CardHeader>
            <CardTitle>{msg.subject}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-2">From: {msg.sender}</p>
            <div className="flex gap-2">
              <Button size="sm">Reply</Button>
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
