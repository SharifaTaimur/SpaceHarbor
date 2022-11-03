import React, { useState, useEffect, useCallback } from 'react';
import Timer from '../component/Timer';
// import useWindowSize from 'react-use/lib/useWindowSize';
// import useWindowSize from './useWindowSize';
import Confetti from 'react-confetti';
import gms from '../images/_.svg';

const defaultTimer = 60;

const questions = [
  {
    text: 'What does JSX stands for?',
    options: [
      { id: 0, text: 'JSON', isCorrect: false },
      { id: 1, text: 'Angular JS', isCorrect: false },
      { id: 2, text: 'JSON XML', isCorrect: false },
      { id: 3, text: 'Javascript XML', isCorrect: true },
    ],
  },
  {
    text: 'How can we select an element with a specific ID in css?',
    options: [
      { id: 0, text: '#', isCorrect: true },
      { id: 1, text: '.', isCorrect: false },
      { id: 2, text: '^', isCorrect: false },
      { id: 3, text: '*', isCorrect: false },
    ],
  },
  {
    text: 'How can we write comments in CSS',
    options: [
      { id: 0, text: '/* */', isCorrect: true },
      { id: 1, text: '//', isCorrect: false },
      { id: 2, text: '#', isCorrect: false },
      { id: 3, text: 'All of the above', isCorrect: false },
    ],
  },
  {
    text: 'Which company developed ReactJS?',
    options: [
      { id: 0, text: 'Apple', isCorrect: false },
      { id: 1, text: 'Facebook', isCorrect: true },
      { id: 2, text: 'Google', isCorrect: false },
      { id: 3, text: 'Twitter', isCorrect: false },
    ],
  },
  {
    text: 'In which language is React.js written?',
    options: [
      { id: 0, text: 'Python', isCorrect: false },
      { id: 1, text: 'JavaScript', isCorrect: true },
      { id: 2, text: 'Java', isCorrect: false },
      { id: 3, text: 'PHP', isCorrect: false },
    ],
  },
];

export default function StartGame() {
  //   const { width, height } = useWindowSize();

  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);

  const [timer, setTimer] = useState(defaultTimer);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(x => (x > 0 ? x - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  const handleTimerEnd = useCallback(() => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelected(null);
    } else {
      setShowResults(true);
    }
  }, [currentQuestion]);

  // Helper Functions

  /* A possible answer was clicked */
  const optionClicked = (isCorrect, index) => {
    if (selected !== null) {
      return;
    }

    // Increment the score
    if (isCorrect) {
      setScore(score + 1);
    }

    setSelected(index);
  };

  /* Resets the game back to default */
  const restartGame = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowResults(false);
    setSelected(null);
  };

  return (
    <>
      {/* <div className="questionMark">
        <img src={gms} alt="star" />
      </div> */}

      <div className="quecontainer">
        {/* 1. Header  */}
        {/* <h1>USA Quiz 🇺🇸</h1> */}

        {/* 2. Current Score  */}
        {/* <h2>Score: {score}</h2> */}

        {/* 3. Show results or show the question game  */}
        {showResults ? (
          /* 4. Final Results */
          <div className="final-results">
            <h1>Final Results</h1>
            <h2>
              <Confetti width={window.innerWidth} height={window.innerHeight} />
              {score} out of {questions.length} correct - (
              {(score / questions.length) * 100}%)
            </h2>
            {/* <button onClick={() => restartGame()}>Restart game</button> */}
          </div>
        ) : (
          /* 5. Question Card  */
          <div className="question-card">
            <Timer
              initialTimer={10}
              onTimerFinish={handleTimerEnd}
              key={currentQuestion}
            />
            {/* Current Question  */}

            <h3 className="question-text">
              {' '}
              {currentQuestion + 1}. {questions[currentQuestion].text}
            </h3>

            {/* List of possible answers  */}
            <div className="opt">
              {questions[currentQuestion].options.map((option, index) => {
                return (
                  <div
                    id="p"
                    className={
                      index === selected
                        ? 'answersOptionsSelected'
                        : 'answersOptions'
                    }
                    key={option.id}
                    onClick={() => optionClicked(option.isCorrect, index)}
                  >
                    {option.text}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
