import { useEffect, useRef, useState } from 'react';

const useWebSocket = (path: string) => {
  const [message, setMessage] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const wsUrl = `ws://${location.hostname}/ws${path}?token=${token}`; // `ws://${location.hostname}/ws`    `ws://localhost:8080/ws`

    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      console.log('WebSocket connection opened');
      setIsConnected(true);
    };

    ws.current.onmessage = (event) => {
    //   console.log('WebSocket message received:', event.data);
      setMessage(event.data);
    };

    ws.current.onclose = () => {
      console.log('WebSocket connection closed');
      setIsConnected(false);
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [path]);

  const sendMessage = (msg: string) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(msg);
    } else {
      console.error('WebSocket connection is not open');
    }
  };

  return { message, isConnected, sendMessage };
};

export default useWebSocket;
