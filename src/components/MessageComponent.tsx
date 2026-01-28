import { useEffect, useState } from 'react';
import socket from "@/lib/socket"; // ✅ Correct way to import

socket.on("connect", () => {
    console.log("Connected to WebSocket server");
});

const MessageComponent = () => {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    // Listen for 'messageReceived' event from the backend
    socket.on('messageReceived', (message: string) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Cleanup the listener when the component unmounts
    return () => {
      socket.off('messageReceived');
    };
  }, []);

  return (
    <div>
      <h2>Chat Messages</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default MessageComponent;
