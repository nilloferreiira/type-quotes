import { useState, useEffect, useCallback } from "react";

const useTypingTimer = () => {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  const startTimer = useCallback(() => {
    setStartTime(Date.now());
    setEndTime(null);
    setElapsedTime(0);
  }, []);

  const stopTimer = useCallback(() => {
    setEndTime(Date.now());
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
  
    const updateElapsedTime = () => {
      if (startTime && !endTime) {
        setElapsedTime(Date.now() - startTime);
      }
    };
  
    timer = setInterval(updateElapsedTime, 100);
  
    return () => {
      clearInterval(timer);
    };
  }, [startTime, endTime]);
  
  return {
    startTimer,
    stopTimer,
    elapsedTime,
  };
};

export default useTypingTimer;
