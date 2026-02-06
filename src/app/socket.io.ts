import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

socket
  .on('details', (...args) => console.log(args))

  // client-side
  .on('connect', () => console.log(`Client connected on socket ID: `, socket.id))
  .on('disconnect', () => console.log(socket.id));

