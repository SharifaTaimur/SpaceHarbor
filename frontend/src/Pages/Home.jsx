import React from 'react';
import img from '../images/T.svg';
import star from '../images/Star4.svg';
import gms from '../images/_.svg';
// import star1 from '../images/Group1.svg';
// import star2 from '../images/Star6.svg';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <div className={styles.qmark}>
        <img src={gms} alt="star" className={styles.stars} />
      </div>
      <div className={styles.homeContainer}>
        {/* <img src={qmark} alt="star" className={styles.stars} /> */}
        {/* <img src={qmark} alt="star" className={styles.stars} /> */}
        <img src={img} alt="title" className={styles.title} />
        {/* <img src={star} alt="star" className={styles.stars} /> */}

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
      <div className={styles.qmark}>
        {/* <img src={gms} alt="star" className={styles.stars} /> */}
      </div>
    </div>
  );
}
