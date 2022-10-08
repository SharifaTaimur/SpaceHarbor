import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import Spinner from '../component/Spinner';
import { SiteContext } from '../context/siteContext';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { username, password } = formData;

  const navigate = useNavigate();
  const { siteData, setSiteData } = useContext(SiteContext);

  // const { user, isLoading, isError, isSuccess, message } = useSelector(
  //   (state) => state.auth
  // )

  useEffect(() => {
    if (siteData.isError) {
      toast.error(siteData.message);
    }

    if (siteData.isSuccess || siteData.user) {
      navigate('/');
    }
  }, [siteData]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // if (password !== password2) {
    //   toast.error('Passwords do not match');
    // } else {
    //   const userData = {

    //     username,
    //     password,
    //   };

    axios
      .post(BASE_URL + '/api/admin')
      .then((res) => {
        if (res.data) {
          setSiteData({ ...siteData, user: res.data });
        }
      })
      .catch((e) => {
        setSiteData({ ...siteData, isError: true, message: e.message });
      });
  };

  if (siteData.isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
           Create Session
        </h1>
       
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
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
