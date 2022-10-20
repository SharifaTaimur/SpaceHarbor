import React from 'react';
import { useParams } from 'react-router-dom';

/*
    Consider using a state management library
    - react-query
    - useSWR
    - GraphQL
*/

const Session = () => {
  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');
  const { sessionId } = useParams();
  // const { data, loading, error } = useQuery('http://localhost:5000/api/session', {
  //     variables: {
  //         username: username,
  //         password: password
  //     }
  // });

  // if (loading) {
  //     return <p>loading...</p>
  // }

  // if (error) {
  //     return <p>rejected access...</p>
  // }

  // if (data.status === 'IN_LOBBY') {
  //     return (
  //         <div>
  //             <p>people are still joining</p>
  //             <button>start game now</button>
  //         </div>
  //     )
  // }

  // if (data.status === 'IN_PROGRESS') {
  //     return (
  //         <p>game in progress</p>
  //     )
  // }

  //     if (data.status === 'IN_CREATION') {
  //         return (
  //           <div>
  //             <p>creating questions</p>
  //             {data.questions.map((question) => {
  //                 return (
  //                     <div>
  //                         <p>id: {question.id}</p>
  //                         <p>question: {question.body}</p>
  //                         {/* ... */}
  //                     </div>
  //                 )
  //             })}
  //             <div>
  //                 <p>Create a new question</p>
  //                 <input type="textarea" />

  //             </div>
  //           </div>
  //         );
  //     }

  return (
    <div className="CreateSessionContainer">
      <section className="heading">
        Session with id <mark>{sessionId} </mark>
      </section>
      ;
    </div>
  );
};

export default Session;
