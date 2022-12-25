import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './component/home/Home';
import Login from './component/join/Login';
import Register from './component/register/Register';
import Session from './component/session/Session';
import QuestionPage from './component/inprogress/QuestionPage';
import StartGame from './component/game/StartGame';
import WaitingPage from './component/WaitingPage';
import Quiz from './component/quiz/CreateQuiz';
import { useEffect, useState } from 'react';
import { SiteContext } from './context/siteContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [siteData, setSiteData] = useState({
    user: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: null,
    notes: [],
    data_loaded: false,
  });

  useEffect(() => {
    const user = localStorage.getItem('user_infov1');

    if (user) {
      setSiteData(x => ({ ...x, user: JSON.parse(user), data_loaded: true }));
    }
  }, []);

  return (
    <>
      <SiteContext.Provider value={{ siteData, setSiteData }}>
        <Router>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/createquiz" element={<Quiz />} />

              <Route path="/session/:sessionId" element={<Session />} />
              <Route path="/inprogress" element={<QuestionPage />} />
              <Route path="/game" element={<StartGame />} />
            </Routes>
          </div>
        </Router>
        <ToastContainer />
      </SiteContext.Provider>
    </>
  );
}

export default App;
