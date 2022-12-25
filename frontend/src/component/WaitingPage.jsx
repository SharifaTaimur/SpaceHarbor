import React from 'react';
import styles from './WaitingPage.module.css';
import { Link } from 'react-router-dom';
const WaitingPage = ({ onStart }) => {
  console.log('rendered');

  return (
    <div className={styles.MainCon}>
      <div className={styles.container}>
        <h1>Waiting for the admin to start the game</h1>
        {/* <button
          className={styles.btn}
          onClick={() => {
            onStart();
          }}
        >
          Start the game
        </button> */}
        <ul>
          <li>
            <Link to="/game">Join Session</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WaitingPage;
