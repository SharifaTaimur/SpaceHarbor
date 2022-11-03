import React from 'react';
import { useParams } from 'react-router-dom';
import Quiz from './CreateQuiz';

/*
    Consider using a state management library
    - react-query
    - useSWR
    - GraphQL
*/

// const GET_SESSION = gql`
//   query getSession($sessionId: String!, $username: String!, $password: String!) {

//   }
// `

const Session = () => {
  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');
  const { sessionId } = useParams();

  const { data, loading, error } = {
    loading: false,
    error: null,
    data: {
      status: 'IN_CREATION',
    },
  };

  // const { data, loading, error } = useSWR("http://localhost:5000/api/session", {
  //   variables: {
  //     username: username,
  //     password: password,
  //   },
  // });

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>rejected access...</p>;
  }

  if (data.status === 'IN_CREATION') {
    return <Quiz />;
  }

  if (data.status === 'IN_LOBBY') {
    return (
      <div>
        <p>people are still joining</p>
        <button>start game now</button>
      </div>
    );
  }

  if (data.status === 'IN_PROGRESS') {
    return <p>game in progress</p>;
  }

  // if (data.status === 'IN_CREATION') {
  //     return (
  //       <div>
  //         <p>creating questions</p>
  //         {data.questions.map((question) => {
  //             return (
  //                 <div>
  //                     <p>id: {question.id}</p>
  //                     <p>question: {question.body}</p>
  //                     {/* ... */}
  //                 </div>
  //             )
  //         })}
  //         <div>
  //             <p>Create a new question</p>
  //             <input type="textarea" />

  //         </div>
  //       </div>
  //     );
  // }

  return (
    <>
      <section className="heading">
        <h1>Create Quiz</h1>
        <div>Session ID: {sessionId}</div>
      </section>

      <section className="form">
        <form>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="question"
              name="question"
              value={username}
              placeholder="Enter a question"
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
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Create Quiz
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Session;
