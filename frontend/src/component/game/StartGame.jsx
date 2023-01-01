import React, { useState, useEffect, useCallback } from 'react';
import Timer from '../Timer';
import axios from 'axios';
import { BASE_URL } from '../../utils/constant';
import Confetti from 'react-confetti';
import gms from '../../images/_.svg';

const StartGame = () => {
  const defaultTimer = 60;
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [timer, setTimer] = useState(defaultTimer);
  const [data, setData] = useState();
  const [values, setValues] = useState({
    total: score,
    currentPlayer: localStorage.getItem('name'),
  });

  useEffect(() => {
    axios
      .get(BASE_URL + '/getQuestions')
      .then(res => {
        setData(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(x => (x > 0 ? x - 1 : 0));
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  const optionClicked = async (option, index) => {
    data.q_and_a.map((val, indx) => {
      Object.keys(val).forEach(key => {
        if (indx === currentQuestion && key == 'answer') {
          // val[key] === option && setScore(score + 1);

          setValues(prevState => ({
            ...prevState,
            total: val[key] === option && prevState.total + 1,
          }));
          console.log('values', val[key] === option && values.total + 1);
          setSelected(index);
        }
      });
    });
  };

  const handleTimerEnd = useCallback(async () => {
    console.log('valuesHandle', values);

    const response = await axios.get(BASE_URL + '/getQuestions');
    if (currentQuestion + 1 < response.data?.q_and_a?.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelected(null);
    } else {
      setShowResults(true);
    }

    if (currentQuestion === response.data?.q_and_a?.length - 1) {
      try {
        await axios.post(BASE_URL + '/playersScore', values);
      } catch {
        console.log('update error scores');
      }
    }
  }, [currentQuestion, values]);

  return (
    <>
      <div className="quecontainer">
        {showResults ? (
          <div className="final-results">
            <h1>Final Results</h1>
            <h2>
              <Confetti width={window.innerWidth} height={window.innerHeight} />
              {values.total} out of {data?.q_and_a?.length - 1} correct
              {/* - (
              {(values.total / data?.q_and_a?.length) * 100}%) */}
            </h2>
          </div>
        ) : (
          <>
            {data?.q_and_a?.map((val, indx) => {
              if (indx === currentQuestion) {
                return (
                  <div className="question-card" id={indx}>
                    <Timer
                      initialTimer={10}
                      onTimerFinish={handleTimerEnd}
                      key={currentQuestion}
                    />

                    <h3 className="question-text">
                      {currentQuestion}. {val.question}
                    </h3>
                    <div className="opt">
                      {val.otherOptions.map((option, index) => {
                        return (
                          <>
                            <div
                              id="p"
                              className={
                                index === selected
                                  ? 'answersOptionsSelected'
                                  : 'answersOptions'
                              }
                              key={option.id}
                              onClick={e => optionClicked(option, index)}
                            >
                              {option}
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </div>
                );
              }
            })}
          </>
        )}
      </div>
    </>
  );
};

export default StartGame;
