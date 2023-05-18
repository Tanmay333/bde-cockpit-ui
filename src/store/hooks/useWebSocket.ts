import { useState, useEffect } from 'react';
import { useAppDispatch } from '../utils/hooks';
import { updateMachineDetails } from '../slices/machineDetailsSlice';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type WebSocketMessage = any | null;

type WebSocketHookReturn = {
  messages: WebSocketMessage[];
  sendMessage: (message: WebSocketMessage) => void;
};

let sharedSocket: WebSocket | null = null;
const connectedComponents: Array<(socket: WebSocket) => void> = [];

const useWebSocket = (): WebSocketHookReturn => {
  const [socket, setSocket] = useState<WebSocket | null>(sharedSocket);
  const [messages, setMessages] = useState<WebSocketMessage>(null);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (messages !== null) {
      dispatch(updateMachineDetails(messages));
    }
  }, [messages]);
  useEffect(() => {
    if (!socket) {
      const newSocket = new WebSocket(
        'wss://0obop7y124.execute-api.eu-central-1.amazonaws.com/prod?token=76ad86b2-9ff8-418d-b7e1-2764412fe707',
      );

      newSocket.onopen = () => {
        console.log('WebSocket connection established.');
        sharedSocket = newSocket;
        setSocket(newSocket);

        connectedComponents.forEach((callback) => {
          callback(newSocket);
        });
      };

      newSocket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        setMessages(message);
      };

      newSocket.onclose = () => {
        console.log('WebSocket connection closed.');
        sharedSocket = null;
        setSocket(null);
      };
    } else {
      connectedComponents.push(setSocket);

      return () => {
        const index = connectedComponents.indexOf(setSocket);
        if (index !== -1) {
          connectedComponents.splice(index, 1);
        }
      };
    }
  }, [socket]);

  const sendMessage = (message: WebSocketMessage) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    } else {
      console.error('WebSocket connection is not open.');
    }
  };

  return { messages, sendMessage };
};

export default useWebSocket;
