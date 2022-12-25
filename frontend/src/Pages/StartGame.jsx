import React, { useState, useEffect, useCallback } from 'react';
import Timer from '../component/Timer';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import Confetti from 'react-confetti';
import gms from '../images/_.svg';

const StartGame = () => {
  const defaultTimer = 60;
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [timer, setTimer] = useState(defaultTimer);
  const [data, setData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(x => (x > 0 ? x - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  const getQuestion = async () => {
    const response = await axios.get(BASE_URL + '/getQuestions');
    setData(response.data);
  };

  useEffect(() => {
    getQuestion();
  }, []);

  // test -- start Timer
  // const [counter, setCounter] = useState(59);

  // useEffect(() => {
  //   if (counter > 0) {
  //     setTimeout(() => setCounter(counter - 1), 1000);
  //   }
  // }, [counter]);

  // test -- end Timer

  const handleTimerEnd = useCallback(() => {
    console.log('inside function');
    if (currentQuestion < data?.q_and_a?.length) {
      console.log('are you in?');
      setCurrentQuestion(currentQuestion + 1);
      setSelected(null);
    } else {
      setShowResults(true);
    }
  }, [currentQuestion]);

  // original send

  /* A possible answer was clicked */
  // const optionClicked = (isCorrect, index) => {
  //   console.log('onClick', isCorrect, index);

  //   if (selected !== null) {
  //     return;
  //   }

  //   // Increment the score
  //   if (isCorrect) {
  //     setScore(score + 1);
  //   }

  //   setSelected(index);
  // };

  const optionClicked = async option => {
    data.q_and_a.map((val, indx) => {
      Object.keys(val).forEach(key => {
        if (indx === currentQuestion && key == 'answer') {
          console.log('right', val[key], option);
          val[key] === option && setScore(score + 1);
          setCurrentQuestion(currentQuestion + 1);
        }
      });
    });

    //  here we will pass score for each user
    // try {
    //   await axios.post(BASE_URL + '/players', score);
    // } catch {
    //   console.log('update error scores');
    // }
  };

  console.log('score', score, data?.q_and_a?.length - 1);

  return (
    <>
      <div className="quecontainer">
        {showResults ? (
          <div className="final-results">
            <h1>Final Results</h1>
            <h2>
              <Confetti width={window.innerWidth} height={window.innerHeight} />
              {score} out of {data?.q_and_a?.length - 1} correct - (
              {(score / data?.q_and_a?.length - 1) * 100}%)
            </h2>
          </div>
        ) : (
          <>
            {data.q_and_a?.map((val, indx) => {
              if (indx === currentQuestion) {
                return (
                  <div className="question-card" id={indx}>
                    <Timer
                      initialTimer={10}
                      onTimerFinish={handleTimerEnd}
                      key={currentQuestion}
                    />

                    <h3 className="question-text">{val.question}</h3>
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
                              onClick={e =>
                                // optionClicked(option.isCorrect, index)
                                optionClicked(option)
                              }
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
