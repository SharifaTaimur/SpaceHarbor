import { useState, useEffect, useContext } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import Spinner from '../component/Spinner';
import { SiteContext } from '../context/siteContext';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';
// import { locals } from '../../../backend/server';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const { username, password } = formData;
  const navigate = useNavigate();
  // const { siteData, setSiteData } = useContext(SiteContext);

  // const { user, isLoading, isError, isSuccess, message } = useSelector(
  //   (state) => state.auth
  // )

  // useEffect(() => {
  //   if (siteData.isError) {
  //     toast.error(siteData.message);
  //   }

  //   if (siteData.isSuccess || siteData.user) {
  //     redirect('/');
  //   }
  // }, [siteData]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // const {sessionID} = await fetch('backend.../create-session)
    //method:'POST',t
    //admin:userID
    // }).then(res)=> res.json())
    // redirect()
    //   };

    console.log('1');
    const response = await axios.post(BASE_URL + '/api/admin', {
      username: 'Iman',
      password: '1234',
    });
    // const response = {
    //   isSuccess: true,
    //   data: {
    //     sessionId: 'abc',
    //   },
    // };
    console.log('2');

    if (response.status === 201) {
      const { sessionId } = response.data;
      console.log(`sessionId is ${sessionId}`);
      /*
        Probably you should store 'username' and 'password' as encrypted strings
        So that other people cannot see them on your browser
      */
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      navigate(`/session/${sessionId}`);
    } else {
      console.log('some error happened');
    }
  };

  // if (siteData.isLoading) {
  //   return <Spinner />;
  // }

  return (
    <>
      <section className="heading">
        <h1>Create Session</h1>
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
              Create Session
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
