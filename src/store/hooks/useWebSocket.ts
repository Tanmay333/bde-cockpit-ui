import { useState, useEffect } from 'react';
import { useAppDispatch } from '../utils/hooks';
import { updateMachineDetails } from '../slices/machineDetailsSlice';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type WebSocketMessage = any | null;

type WebSocketHookReturn = {
  isConnected: boolean;
  messages: WebSocketMessage[];
  sendMessage: (message: WebSocketMessage) => void;
};

let sharedSocket: WebSocket | null = null;
const connectedComponents: Array<(socket: WebSocket) => void> = [];

const useWebSocket = (): WebSocketHookReturn => {
  const [socket, setSocket] = useState<WebSocket | null>(sharedSocket);
  const [messages, setMessages] = useState<WebSocketMessage>(null);
  const [isConnected, setIsConnected] = useState(false);
  const dispatch = useAppDispatch();

  // When a new message is received from the WebSocket, update the machine details state
  useEffect(() => {
    if (messages !== null) {
      dispatch(updateMachineDetails(messages));
    }
  }, [messages]);

  useEffect(() => {
    // If no WebSocket connection exists, create a new on
    if (!socket) {
      const newSocket = new WebSocket(
        'wss://0obop7y124.execute-api.eu-central-1.amazonaws.com/prod?token=76ad86b2-9ff8-418d-b7e1-2764412fe707',
      );

      // WebSocket onopen event handler - executed when the connection is established
      newSocket.onopen = () => {
        console.log('WebSocket connection established.');
        sharedSocket = newSocket;
        setSocket(newSocket);
        setIsConnected(true);

        // Notify all components waiting for the WebSocket connection to be established
        connectedComponents.forEach((callback) => {
          callback(newSocket);
        });
      };

      newSocket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        setMessages(message);
      };

      // WebSocket onclose event handler - executed when the connection is closed
      newSocket.onclose = () => {
        console.log('WebSocket connection closed.');
        sharedSocket = null;
        setSocket(null);
        setIsConnected(false);
      };
    } else {
      // If a WebSocket connection already exists, add the socket to the list of connected components
      connectedComponents.push(setSocket);

      // When the component using this WebSocket hook is unmounted,
      // remove the socket from the list of connected components
      return () => {
        const index = connectedComponents.indexOf(setSocket);
        if (index !== -1) {
          connectedComponents.splice(index, 1);
        }
      };
    }
  }, [socket]);

  // Function to send a message through the WebSocket
  const sendMessage = (message: WebSocketMessage) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    } else {
      console.error('WebSocket connection is not open.');
    }
  };

  return { isConnected, messages, sendMessage };
};

export default useWebSocket;
