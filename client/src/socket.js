import { io } from 'socket.io-client';

const URL = 'http://localhost:3000';
// const URL = 'https://crocodile-mykolaprimachenko.b4a.run/';

export const socket = io(URL);

