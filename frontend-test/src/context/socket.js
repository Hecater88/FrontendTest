import React from 'react';

export const socket = new WebSocket('wss://unified-live.betfire.com/test/ws/live-feed?lang=en');

// Connection opened
socket.addEventListener('open', function (event) {
    socket.send('{"type":"login","data":{"lang":"en","skin":"api-new.betbuq.com"}}');
});
socket.addEventListener('open', function (event) {
  socket.send('{"type":"menu"}');
});
// Listen for messages
socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
});

export const SocketContext = React.createContext();
