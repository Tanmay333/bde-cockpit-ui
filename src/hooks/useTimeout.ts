import { useState, useEffect } from 'react';

let timerId: NodeJS.Timeout | null = null;

function useTimeout(): number {
  const [timestamp, setTimestamp] = useState(Date.now());

  useEffect(() => {
    timerId = setInterval(() => {
      setTimestamp(Date.now());
    }, 2000);

    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, []);

  return timestamp;
}

export default useTimeout;
