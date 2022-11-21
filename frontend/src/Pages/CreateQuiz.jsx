import axios from 'axios';
import React, { useState } from 'react';
import './CreateQuiz.css';
import Dialog from './Dialog';
import { BASE_URL } from '../utils/constant';

const Quiz = () => {
  const [values, setValues] = useState({
    // questions: [],
    // answers: [],
    addQuestion: false,
    questionName: '',
    correctAnswer: '',
    showToast: false,
  });
  const [questions, setQuestions] = useState([]);
  const [questionList, setQuestionList] = useState([]);

  const addAnswer = () => {
    if (questionList.length < 4) {
      setQuestionList(questionList?.concat(''));
    }
  };

  const saveQuiz = () => {
    // let quiz = {
    //   mustBeSignedIn: values.mustBeSignedIn,
    //   name: values.name,
    //   questions: values.questions,
    //   category: values.categoryVal,
    // };
    // axios
    //   .post('/api/quizes/create', {
    //     quiz,
    //     createdBy: localStorage.getItem('_ID'),
    //     username: localStorage.getItem('username'),
    //     password: localStorage.getItem('password'),
    //   })
    //   .then(res => {
    //     if (res.data.success) {
    //       this.setState({
    //         questions: [],
    //         answers: [],
    //         categoryVal: 'Technology',
    //         showToast: true,
    //       });
    //       setTimeout(() => {
    //         this.setState({ showToast: false });
    //       }, 3000);
    //     }
    //   })
    //   .catch(er => {
    //     console.log(er);
    //   });
  };

  const saveQuestion = async () => {
    let question = {
      answers: questionList,
      correctAnswer: values.correctAnswer,
      questionName: values.questionName,
    };

    try {
      setQuestions(searches => [...searches, question]);
      setValues({
        addQuestion: false,
        questionName: '',
        answers: [],
        correctAnswer: '',
      });
      setQuestionList([]);

      // setValues(values => ({
      //   ...values,
      //   addQuestion: false,
      //   questions: [question],
      // }));

      await axios.post(BASE_URL + '/save', question);
    } catch {
      console.log('update error');
    }
  };

  const removeQuestion = question => {
    setQuestions(
      questions.filter(ques => ques.questionName !== question.questionName),
    );
  };

  //edit question
  const editQuestion = question => {
    setValues({
      addQuestion: true,
      questionName: question.questionName,
      answers: question.answers,
      correctAnswer: question.correctAnswer,
    });

    this.removeQuestion(question);
  };

  return (
    <>
      <section className="heading">
        <h1>Create Quiz</h1>
      </section>
      <section className="form">
        <div className="quiz-wrapper">
          <div className="main">
            <div className="form card">
              <input
                type="text"
                className="input"
                onChange={e =>
                  setValues(values => ({
                    ...values,
                    name: e.target.value,
                  }))
                }
                value={values.name}
                placeholder="Quiz Name"
              />
              <br></br>

              {questions?.map((ques, idx) => (
                <div className="question" key={idx}>
                  <div>{ques.questionName}</div>
                  <div>Correct Answer: {ques.correctAnswer}</div>
                  <div className="NoOfAns">
                    Num of answers: {ques.answers?.length}
                  </div>
                  <div className="buttons">
                    <span
                      className="btn delete"
                      onClick={() => removeQuestion(ques)}
                    >
                      Delete
                    </span>
                    <span
                      className="btn edit"
                      onClick={() => editQuestion(ques)}
                    >
                      Edit
                    </span>
                  </div>
                </div>
              ))}

              <div className="questions">
                <div
                  className="add-question"
                  onClick={() =>
                    setValues(() => ({
                      addQuestion: true,
                    }))
                  }
                >
                  Add Question
                </div>
              </div>

              <span onClick={() => saveQuiz()} className="btn save-quiz">
                Save Quiz
              </span>

              <Dialog model={values.addQuestion}>
                <div className="new-question-form">
                  <input
                    className="input"
                    placeholder="Question"
                    value={values.questionName}
                    onChange={e =>
                      setValues(values => ({
                        ...values,
                        questionName: e.target.value,
                      }))
                    }
                  />
                  <div>Answers</div>

                  {questionList.map((ans, idx) => (
                    <div className="answer-form" key={idx}>
                      <input
                        type="radio"
                        value={values.ans}
                        onChange={e =>
                          setValues(values => ({
                            ...values,
                            correctAnswer: ans,
                          }))
                        }
                        name="answer"
                      />
                      <input
                        className="input"
                        type="text"
                        placeholder="Answer"
                        value={questionList[idx]}
                        // onChange={e => updateAnswer(e, idx)}
                        onChange={e =>
                          setQuestionList(
                            questionList.map((value, j) => {
                              if (idx === j) value = e.target.value;
                              return value;
                            }),
                          )
                        }
                      />
                    </div>
                  ))}

                  <div className="add-answer" onClick={() => addAnswer()}>
                    Add Answer
                  </div>

                  <div className="btn-wrapper">
                    <div
                      className="btn"
                      onClick={() =>
                        setValues(() => ({
                          addQuestion: false,
                        }))
                      }
                    >
                      Close
                    </div>
                    <div className="btn" onClick={() => saveQuestion()}>
                      Add
                    </div>
                  </div>
                </div>
              </Dialog>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Quiz;
