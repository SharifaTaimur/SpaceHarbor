import { useEffect } from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
const Timer = ({ initialTimer, onTimerFinish }) => {
  const [timer, setTimer] = useState(initialTimer);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (timer <= 1) {
        onTimerFinish();
      } else {
        setTimer(x => x - 1);
      }
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [timer, onTimerFinish]);

  return (
    <div>
      <p className="timer">
        <FontAwesomeIcon icon={faClock} /> {timer}s
      </p>
    </div>
  );
};

export default Timer;
