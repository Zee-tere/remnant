import { io } from "socket.io-client"; 

const socket = io('http://localhost:3001'); 

socket.on('connect', () => {
    console.log('Connected to WebSocket server');
});

socket.on('messageReceived', (data) => {
    console.log('New message received:', data);
});


socket.emit('sendMessage', { sender: 'TestUser', content: 'Hello WebSocket!' });

export default socket;