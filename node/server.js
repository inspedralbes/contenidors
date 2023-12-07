const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (socket) => {
  console.log('Client connected');

  // Envia um nombre aleatori cada segón
  const interval = setInterval(() => {
    const randomNumber = Math.floor(Math.random() * 100);
    socket.send(randomNumber.toString());
  }, 1000);

  // Close the connection after 60 seconds
  setTimeout(() => {
    clearInterval(interval);
    socket.close();
  }, 60000);

  // Gestiona el tancament del socket
  socket.on('close', () => {
    console.log('Client disconnected');
    clearInterval(interval);
  });
});
