import React from 'react';
import img from '../images/T-DevOps3.svg';
import star from '../images/Star4.svg';
import star1 from '../images/Group1.svg';
import star2 from '../images/Star6.svg';
import styles from './Home.module.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.box}>
        {/* <img src={star1} alt="star" className={styles.stars} /> */}

        <img src={img} alt="title" className={styles.title} />
      </div>
      <div>
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
  );
}
