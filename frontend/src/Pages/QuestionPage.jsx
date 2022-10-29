import React, { useState, useEffect } from 'react';
const defaultRemainingTime = {
  seconds: '00',
};
export default function QuestionPage({countdownTimemstampMs}) {
  const [remainingTime, setremainingTime] = useState(defaultRemainingTime);
  useEffect(() => {
    const intervalId = setInterval(() => {
      updateRemainingTime(countdownTimemstampMs);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [countdownTimemstampMs]);

  function updateRemainingTime(countdown) {
   
  }
  return (
    <div className="ountDownTimer">
    
      <span>{remainingTime.seconds}</span>
      <span>seconds</span>
    </div>
  );
}
