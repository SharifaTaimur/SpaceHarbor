import { useState, useEffect, useContext } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../Spinner';
import { SiteContext } from '../../context/siteContext';
import axios from 'axios';
import { BASE_URL } from '../../utils/constant';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    sessionId: '',
  });
  const { username, sessionId } = formData;
  const navigate = useNavigate();
  const { siteData, setSiteData } = useContext(SiteContext);

  useEffect(() => {
    if (siteData.isError) {
      toast.error(siteData.message);
    }

    if (siteData.isSuccess || siteData.user) {
      navigate('/');
    }
  }, [siteData, navigate]);

  const onChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    e.target.id === 'username' &&
      localStorage.setItem('name', JSON.stringify(e.target.value));
  };

  const onSubmit = e => {
    e.preventDefault();

    const userData = {
      username,
      sessionId,
    };

    axios
      .post(BASE_URL + '/players', userData)
      .then(res => {
        console.log('res', res);
        // localStorage.setItem('name', JSON.stringify(userData.name));
      })
      .catch(e => {
        setSiteData({ ...siteData, isError: true, message: e.message });
      });
  };

  if (siteData.isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Join Session</h1>
        {/* <p>Login and start play!!</p> */}
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={username}
              placeholder="Enter your username"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="sessionId"
              name="sessionId"
              value={sessionId}
              placeholder="Enter session Id"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Join Session
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
