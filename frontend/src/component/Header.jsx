import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
export default function Header() {
  return (
    <div>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link to="/">
         DevOps
          </Link>
        </div>
        <ul>

          <li>
            <button className='btn'>
              <FaSignOutAlt /> Logout
            </button>
          </li>

          <>
            <li>
              <Link to="/login">
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser /> Register
              </Link>
            </li>
          </>
        </ul>
      </header>
    </div>
  );
}
