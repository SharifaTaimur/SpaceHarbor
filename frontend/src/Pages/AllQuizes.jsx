import React from "react";
import './AllQuizes.css';
import axios from "axios";

export default class AllQuizes extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            quizes: []
        }
    }

    componentDidMount(){
        axios.get('/api/quizes/allQuizes/' + localStorage.getItem('_ID')).then(res =>{
            this.setState({
                quizes: res.data
            })
        })
    }
    
    render(){
        return (
            <div className="allQuizes-wrapper">
                <div className="body">
                    <div className="header-top">
                        All Quizes
                    </div>
                    <div className="quizes-wrapper">
                        {this.state.quizes.map((quiz,idx)=> (
                            <div key={idx} className="quizCard card">
                                <div className="quizName">{quiz.name}</div>
                                <div className="category">{quiz.categoy}</div>
                                <div className="questions">{quiz.questions.length} questions</div>
                                <div className="takeQuize btn">start quiz</div>
                                
                              

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}