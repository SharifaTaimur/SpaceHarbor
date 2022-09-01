import { useState, useEffect, useContext } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import Spinner from '../components/Spinner';
// import { SiteContext } from '../context/siteContext';
// import axios from 'axios';
// import { BASE_URL } from '../utils/constant';

function Login() {
 
  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        {/* <p>Login and start setting </p> */}
      </section>

      <section className="form">
        <form>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
             /* value={password} */
              placeholder="Enter password"
              /*onChange={onChange} */
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
