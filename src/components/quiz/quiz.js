import React, { useState } from 'react'

import './styles/quiz.css'

export default function Quiz ({ question, totalQuestions, setAnswer }) {
    const [selectedAnswer, setSelectedAnswer] = useState('')

    const answerSelected = e => {
        e.preventDefault()        
        setAnswer(question.questionNo, question.question, selectedAnswer)
        setSelectedAnswer('')
    }

    const checkStatus = val => {
        return selectedAnswer === val ? true : false
    }
    
    return (
        <div className="quiz-question">         
            <h4 className="quiz-question__header">Question No: {question.questionNo} out of {totalQuestions}</h4>
            <p className="quiz-question__question">{question.question}</p>
            <form onSubmit={answerSelected}>
                <div className="quiz-question__answers-radio-list">
                    
                        {question.answers.map((answer, key) => (
                            <label key={key} className="quiz-question__label">
                                <input 
                                    type="radio" 
                                    name={"question" + question.questionNo} 
                                    className="quiz-question__radio" 
                                    value={answer.code} 
                                    checked={checkStatus(answer.code)}
                                    onChange={e => setSelectedAnswer(e.target.value)} />
                                {answer.answer}
                            </label>
                        ))}
                </div>
                {question.questionNo !== totalQuestions ? (
                    <div className="quiz-question__btn-container">
                        <button className="btn quiz-question__submit-answer" disabled={!selectedAnswer}>Next</button>
                    </div>
                ):(
                    <div className="quiz-question__btn-container">
                        <button className="btn quiz-question__submit-answer" disabled={!selectedAnswer}>Submit</button>
                    </div>
                )}
                
            </form>
        </div>
    )
}