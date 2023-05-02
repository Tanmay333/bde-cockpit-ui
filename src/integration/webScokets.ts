import { Socket } from '../components/api/socket';

export const webSocket = () => {
  const socket = Socket();

  const init = () => {
    const ws = socket.init();

    ws.onopen = () => console.log('WebSocket connection opened');
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      ws.close();
    };
    ws.onclose = () => console.log('WebSocket connection closed');

    return ws;
  };

  return { init };
};
