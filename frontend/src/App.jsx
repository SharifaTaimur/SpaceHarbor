import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Session from './Pages/Session';
import QuestionPage from './Pages/QuestionPage';
import StartGame from './Pages/StartGame';
import WaitingPage from './Pages/WaitingPage';
// import Header from './component/Header';
// import Footer from './component/Footer';
import Quiz from './Pages/CreateQuiz';
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
            {/* <Header /> */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/createquiz" element={<Quiz />} />

              <Route path="/session/:sessionId" element={<Session />} />
              <Route path="/inprogress" element={<QuestionPage />} />
              <Route path="/game" element={<StartGame />} />
            </Routes>
            {/* <Footer /> */}
          </div>
        </Router>
        <ToastContainer />
      </SiteContext.Provider>
    </>
  );
}

export default App;
