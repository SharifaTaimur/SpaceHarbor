import axios from "axios";
import React from "react";
import "./CreateQuiz.css";
import Dialog from "./Dialog";

export default function CreateQuiz(props) {
  const [questions, setQuestions] = useState([]);
  const [addQuestion, setAddQuestion] = useState(false);
  const [questionName, setQuestionName] = useState("");
  const [answers, setAnswers] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [showToast, setShowToast] = useState(false);
  
  // const selectPrivate = (e) => {
  //   if (e.target.checked === true) {
  //     this.setState({
  //       mustBeSignedIn: e.target.checked,
  //     });
  //   } else {
  //     this.setState({ mustBeSignedIn: false });
  //   }
  // };

  const addAnswer = () => {
    if (this.state.answers.length < 4) {
      setAnswers(answers.concat(""));
    }
  };

  const updateAnswer = (e, i) => {
    let newArr = Object.assign([], this.state.answers);
    newArr[i] = e.target.value;
    setAnswers(newArr);
  };

   const saveQuestion = () => {
    let question = {
      answers: setAnswers,
      correctAnswer: setCorrectAnswer,
      questionName: setQuestionName,
    };
    setQuestions({
      questions: questions.concat(question),
      addQuestion: false,
      questionName: "",
      answers: [],
      correctAnswer: "",
    });
  };

  const removeQuestion = question => {
    setQuestions(questions.filter(
        (ques) => ques.questionName !== question.questionName
      ),
    );
  };

  const saveQuiz = () => {
    let quiz = {
      // mustBeSignedIn: this.state.mustBeSignedIn,
      nname: this.state.nname,
      questions: this.state.questions,
      category: this.state.categoryVal,
    };
    axios
      .post("/api/quizes/create", {
        quiz,
        createdBy: localStorage.getItem("_ID"),
        username: localStorage.getItem("username"),
        password: localStorage.getItem("password")
      })
      .then((res) => {
        if (res.data.success) {
          setQuestions([]);
          setAnswers([]);
          setTimeout(() => {
            this.setState({ showToast: false });
          }, 3000);
        }
      })
      .catch((er) => {
        console.log(er);
      });
  };

  
    return (
      <>
        <section className='heading'>
          <h1>Create Quiz</h1>
        </section>
        <section className='form'>
          <div className='quiz-wrapper'>
            <div className='main'>
              <div className='form card'>
                <input
                  type='text'
                  className='input'
                  onChange={setQuestionName(e.target.value )}
                  value={this.state.nname}
                  placeholder='Quiz Name'
                />
                <br></br>
             
                {this.state.questions.map((ques, idx) => (
                  <div className='question' key={idx}>
                    <div>{ques.questionName}</div>
                    <div>Correct Answer: {ques.correctAnswer}</div>
                    <div>Num of answers: {ques.answers.length}</div>
                    <span
                      className='btn delete'
                      onClick={removeQuestion(ques)}
                    >
                      Delete
                    </span>
                  </div>
                ))}

                <div className='questions'>
                  <div
                    className='add-question'
                    onClick={setAddQuestion( true )}
                  >
                    Add Question
                  </div>
                </div>

                <span onClick={saveQuiz} className='btn save-quiz'>
                  Save Quiz
                </span>

                <Dialog model={this.state.addQuestion}>
                  <div className='new-question-form'>
                    <input
                      className='input'
                      placeholder='Question'
                      value={this.state.questionName}
                      onChange={setQuestionName(e.target.value )
                      }
                    />
                    <div>Answers</div>
                    {this.state.answers.map((ans, idx) => (
                      <div className='answer-form' key={idx}>
                        <input
                          type='radio'
                          value={this.state.ans}
                          onChange={setCorrectAnswer(ans)
                          }
                          name='answer'
                        />{" "}
                        <input
                          className='input'
                          type='text'
                          placeholder='Answer'
                          value={this.state.answers[idx]}
                          onChange={updateAnswer(e, idx)}
                        />
                      </div>
                    ))}
                    <div className='add-answer' onClick={addAnswer}>
                      Add Answer
                    </div>
                    <div className='btn-wrapper'>
                      <div
                        className='btn'
                        onClick={setAddQuestion(false)}
                      >
                        Close
                      </div>
                      <div className='btn' onClick={aveQuestion}>
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
}
