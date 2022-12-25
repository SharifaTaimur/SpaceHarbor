import React, { useState, useEffect } from 'react';
import WaitingPage from '../WaitingPage';
import styles from './QuestionPage.module.css';
// import charecter from '../images/Kwizzard-character.png';
//Mariyya sepret the files palyer and the admin
const defaultRemainingTime = 60;

export default function QuestionPage() {
  const [isWaiting, setIsWaiting] = useState(true);
  const [question, setQuestion] = useState(null);
  const [timer, setTimer] = useState(null);
  const [currentTime, setCurrentTime] = useState(defaultRemainingTime);
  const [showFinalRessults, setFinalResults] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    {
      text: 'What is the capital of America?',
      options: [
        { id: 0, text: 'New York City', isCorrect: false },
        { id: 1, text: 'Boston', isCorrect: false },
        { id: 2, text: 'Santa Fe', isCorrect: false },
        { id: 3, text: 'Washington DC', isCorrect: true },
      ],
    },
    {
      text: 'What year was the Constitution of America written?',
      options: [
        { id: 0, text: '1787', isCorrect: true },
        { id: 1, text: '1776', isCorrect: false },
        { id: 2, text: '1774', isCorrect: false },
        { id: 3, text: '1826', isCorrect: false },
      ],
    },

    {
      text: 'Which of the following countries DO NOT border the US?',
      options: [
        { id: 0, text: 'Canada', isCorrect: false },
        { id: 1, text: 'Russia', isCorrect: true },
        { id: 2, text: 'Cuba', isCorrect: true },
        { id: 3, text: 'Mexico', isCorrect: false },
      ],
    },
  ];

  useEffect(() => {
    if (timer) {
      const { start, duration } = timer;
      const elapsed = Date.now() - start;
      const remaining = duration - elapsed;

      if (remaining > 0) {
        setCurrentTime(remaining);

        const interval = setInterval(() => {
          setCurrentTime(x => (x > 0 ? x - 1 : 0));
        }, 1000);

        return () => {
          clearInterval(interval);
        };
      }
    }
  }, [timer]);

  if (isWaiting) {
    return (
      <WaitingPage
        onStart={() => {
          setIsWaiting(false);
          setQuestion({
            title: 'What is your name?',
            options: ['Mariya', 'Iman', 'Mohammed', 'Sharifa'],
          });

          const response = {
            start: Date.now() - 5,
            duration: 60,
          };

          setTimer(response);
        }}
      />
    );
  }

  const submitAnswer = index => {
    console.log('answer submitted with index', index);
  };

  return (
    <div>
      <div className={styles.mainC}>
        {showFinalRessults ? (
          <div className={styles.finalResult}>
            <h2> Your Score</h2>
            <h4> 1 out of 5 correct</h4>
          </div>
        ) : (
          <div className={styles.ountDownTimer}>
            <h3>current score {score}</h3>
            <h2>question {currentQuestion + 1} out of </h2>
            <h1>Question 1: {question.title}</h1>
            <p>Timer: {currentTime}</p>
            {question.options.map((item, index) => {
              return (
                <button
                  className={styles.btn}
                  onClick={() => {
                    submitAnswer(index);
                  }}
                >
                  {item}
                </button>
              );
            })}
            {/* <p>timer: {currentTime}</p> */}
          </div>
        )}
      </div>

      {/* <div className={styles.pic}>
        <img src={charecter} alt="star" className={styles.ch} />
      </div> */}
    </div>
  );
}
