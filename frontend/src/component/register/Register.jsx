import { useState, useEffect, useContext } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import star from '../../images/Star4.svg';
import axios from 'axios';
import { BASE_URL } from '../../utils/constant';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const { username, password } = formData;
  const navigate = useNavigate();

  const onChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async e => {
    e.preventDefault();

    const userData = {
      username,
      password,
    };

    try {
      const response = await axios.post(BASE_URL + '/add', userData);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    }
  };

  return (
    <>
      <div className="CreateSessionContainer">
        <div className="star">
          <img src={star} alt="star" />
        </div>
        <section className="heading">
          <h1>Create Session</h1>
        </section>

        <section className="form">
          <form>
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
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                placeholder="Enter password"
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <button
                type="submit"
                className="btn btn-block"
                onClick={onSubmit}
              >
                Create Session
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
};

export default Register;
