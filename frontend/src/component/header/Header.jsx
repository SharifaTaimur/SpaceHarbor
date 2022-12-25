import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { SiteContext } from '../../context/siteContext';
import { useContext } from 'react';

export default function Header() {
  const navigate = useNavigate();

  const { siteData, setSiteData } = useContext(SiteContext);

  const onLogout = () => {
    localStorage.removeItem('user_infov1');
    setSiteData({ ...siteData, user: null });
    navigate('/');
  };

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link to="/">DevOps</Link>
        </div>
        <ul>
          <li>
            <button className="btn" onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>

          <>
            <li>
              <Link to="/login">
                <FaSignInAlt /> Join Session
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser /> Create Session
              </Link>
            </li>
          </>
        </ul>
      </header>
    </div>
  );
}
