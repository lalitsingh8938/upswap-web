import React, { useEffect, useState } from "react";

const CountdownTimer = ({ endDate, endTime }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const updateTimer = () => {
      const endDateTime = new Date(`${endDate}T${endTime}`);
      const now = new Date();
      const difference = endDateTime - now;

      if (difference <= 0) {
        setTimeLeft("Deal expired");
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    updateTimer(); // To show timer instantly without 1s delay
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [endDate, endTime]);

  return <div className="text-sm font-medium text-red-500">{timeLeft}</div>;
};

export default CountdownTimer;
