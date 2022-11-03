import React from 'react';
import img from '../images/BigTitle.svg';
import qmark from '../images/gmark1.svg';
import star from '../images/starss.svg';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import charecter from '../images/Kwizzard-character.png';

export default function Home() {
  return (
    <div>
      <div className={styles.qmark}>
        <img src={star} alt="star" className={styles.stars} />
      </div>
      <div className={styles.homeContainer}>
        <div className={styles.imgtitle}>
          <img src={img} alt="title" className={styles.title} />
        </div>
        <div className={styles.links}>
          <ul>
            <li>
              <Link to="/login">Join Session</Link>
            </li>
            <li>
              <Link to="/register">Create Session</Link>
            </li>
          </ul>
        </div>
      </div>
      {/* <div className={styles.qmark2}>
        <img src={star} alt="star" className={styles.stars} />
      </div> */}
    </div>
  );
}
