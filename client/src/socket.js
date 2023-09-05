import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = 'https://crocodile-mykolaprimachenko.b4a.run/';
// const URL = 'https://wild-jade-crayfish-kit.cyclic.app';

export const socket = io(URL);