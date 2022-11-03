import axios from 'axios';
import React from 'react';
import './CreateQuiz.css';
import Dialog from './Dialog';

export default class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      addQuestion: false,
      questionName: '',
      answers: [],
      correctAnswer: '',
      showToast: false,
    };
  }

  selectPrivate = e => {
    if (e.target.checked === true) {
      this.setState({
        mustBeSignedIn: e.target.checked,
      });
    } else {
      this.setState({ mustBeSignedIn: false });
    }
  };

  addAnswer = () => {
    if (this.state.answers.length < 4) {
      this.setState({
        answers: this.state.answers.concat(''),
      });
    }
  };

  updateAnswer = (e, i) => {
    let newArr = Object.assign([], this.state.answers);
    newArr[i] = e.target.value;
    this.setState({
      answers: newArr,
    });
  };

  saveQuestion = () => {
    let question = {
      answers: this.state.answers,
      correctAnswer: this.state.correctAnswer,
      questionName: this.state.questionName,
    };
    this.setState({
      questions: this.state.questions.concat(question),
      addQuestion: false,
      questionName: '',
      answers: [],
      correctAnswer: '',
    });
  };

  removeQuestion = question => {
    this.setState({
      questions: this.state.questions.filter(
        ques => ques.questionName !== question.questionName,
      ),
    });
  };

  //edit question
  editQuestion = question => {
    this.setState({
      addQuestion: true,
      questionName: question.questionName,
      answers: question.answers,
      correctAnswer: question.correctAnswer,
    });

    this.removeQuestion(question);
  };

  saveQuiz = () => {
    let quiz = {
      mustBeSignedIn: this.state.mustBeSignedIn,
      nname: this.state.nname,
      questions: this.state.questions,
      category: this.state.categoryVal,
    };
    axios
      .post('/api/quizes/create', {
        quiz,
        createdBy: localStorage.getItem('_ID'),
        username: localStorage.getItem('username'),
        password: localStorage.getItem('password'),
      })
      .then(res => {
        if (res.data.success) {
          this.setState({
            questions: [],
            answers: [],
            categoryVal: 'Technology',
            showToast: true,
          });
          setTimeout(() => {
            this.setState({ showToast: false });
          }, 3000);
        }
      })
      .catch(er => {
        console.log(er);
      });
  };

  render() {
    return (
      <>
        <section className="heading">
          <h1>Create Quiz</h1>
        </section>
        <section className="form" id="Qform">
          <div className="quiz-wrapper">
            <div className="main">
              <div className="form card">
                <input
                  type="text"
                  className="input"
                  onChange={e => this.setState({ nname: e.target.value })}
                  value={this.state.nname}
                  placeholder="Quiz Name"
                />
                <br></br>

                {this.state.questions.map((ques, idx) => (
                  <div className="question" key={idx}>
                    <div>{ques.questionName}</div>
                    <div>Correct Answer: {ques.correctAnswer}</div>
                    <div className="NoOfAns">
                      Num of answers: {ques.answers.length}
                    </div>
                    <div className="buttons">
                      <span
                        className="btn delete"
                        onClick={() => this.removeQuestion(ques)}
                      >
                        Delete
                      </span>
                      <span
                        className="btn edit"
                        onClick={() => this.editQuestion(ques)}
                      >
                        Edit
                      </span>
                    </div>
                  </div>
                ))}

                <div className="questions">
                  <div
                    className="add-question"
                    onClick={() => this.setState({ addQuestion: true })}
                  >
                    Add Question
                  </div>
                </div>

                <span onClick={() => this.saveQuiz()} className="btn save-quiz">
                  Save Quiz
                </span>

                <Dialog model={this.state.addQuestion}>
                  <div className="new-question-form">
                    <input
                      className="qq"
                      placeholder="Question"
                      value={this.state.questionName}
                      onChange={e =>
                        this.setState({ questionName: e.target.value })
                      }
                    />
                    <div>Answers</div>
                    {this.state.answers.map((ans, idx) => (
                      <div className="answer-form" key={idx}>
                        <input
                          type="radio"
                          className="rr"
                          value={this.state.ans}
                          onChange={e => this.setState({ correctAnswer: ans })}
                          name="answer"
                        />{' '}
                        <input
                          className="ans"
                          type="text"
                          placeholder="Answer"
                          value={this.state.answers[idx]}
                          onChange={e => this.updateAnswer(e, idx)}
                        />
                      </div>
                    ))}
                    <div className="add-answer" onClick={this.addAnswer}>
                      Add Answer
                    </div>
                    <div className="btn-wrapper">
                      <div
                        className="btn"
                        onClick={() => this.setState({ addQuestion: false })}
                      >
                        Close
                      </div>
                      <div className="btn" onClick={this.saveQuestion}>
                        Add
                      </div>
                    </div>
                  </div>
                </Dialog>
                {/* <NavLink to="/allQuizes"><div className="Link">Go to Quizes</div></NavLink> */}
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}