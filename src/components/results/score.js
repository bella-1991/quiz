import React, { useState } from 'react'

import './styles/score.css'

export default function Score ({ score, results, resit }) {
    const [scoreExplained, setScoreExplained] = useState(false)

    const showExplanation = _ => {
        setScoreExplained(!scoreExplained)
    }

    return (
        <div className="score">
            <div className="score__summary">
                <p>Your score is {score}</p>                
            </div>
            <div className="score__btn-container">
                <button className="btn score__view-explanation-button" onClick={showExplanation}>
                    { scoreExplained ? "Hide Explanation" : "View Explanation" }
                </button>
                <button className="btn score__resit-test-button" onClick={resit}>Retake test</button>
            </div>
            { scoreExplained && (
                <div className="score__explained">
                    { results.map(eachResult => {
                        return (
                            <div key={eachResult.questionNo} className={eachResult.correct ? "score__explanation score__explanation--correct" : "score__explanation"}>
                                <p className="score__question">{eachResult.questionNo}. {eachResult.question}</p>
                                <p className="score__user-answer">Your answer: {eachResult.userAnswer}</p>
                                <p className="score__correct-answer">Correct answer: {eachResult.correctAnswer}</p>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}