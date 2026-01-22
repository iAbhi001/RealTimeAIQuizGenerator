import React, { useEffect, useState } from 'react';

const Timer = ({ duration = 15, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const strokeDasharray = 251; // 2 * pi * r (r=40)

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const offset = strokeDasharray - (timeLeft / duration) * strokeDasharray;

  return (
    <div className="relative flex items-center justify-center w-24 h-24">
      <svg className="transform -rotate-90 w-full h-full">
        <circle
          cx="48" cy="48" r="40"
          stroke="currentColor" strokeWidth="8"
          fill="transparent" className="text-gray-700"
        />
        <circle
          cx="48" cy="48" r="40"
          stroke="currentColor" strokeWidth="8"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          style={{ strokeDashoffset: offset, transition: 'stroke-dashoffset 1s linear' }}
          className={`${timeLeft <= 5 ? 'text-red-500' : 'text-blue-400'}`}
        />
      </svg>
      <span className="absolute text-2xl font-bold text-white">{timeLeft}s</span>
    </div>
  );
};

export default Timer;