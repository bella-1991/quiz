import React from 'react'

import './styles/take-test.css'

export default function TakeTest ({ takeTest }) {
    return (
        <div className="quizz-initial">
            <p className="quizz-initial__title">Sample Front End Developer questions</p>
            <button className="btn quizz-initial__button" onClick={takeTest}>Take Test</button>
        </div>
    )
}