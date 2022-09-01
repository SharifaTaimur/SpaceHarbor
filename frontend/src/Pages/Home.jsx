import React from 'react';
import img from '../images/img.png';
import styles from './Home.module.css';
import { motion } from 'framer-motion';
export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.title}>
        <h1>Thursday </h1>
        <h1>in DevOps</h1>
        {/* <button className="btn">
          Logout
        </button> */}
      </div>
      <motion.div
        className={styles.imgContainer}
        whileHover={{ scale: [null, 1.2, 1.1] }}
        transition={{ duration: 0.3 }}
      >
        <img src={img} alt="Logo" />;
      </motion.div>
    </div>
  );
}
