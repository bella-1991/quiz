import React from 'react'

import './styles/view-results.css'

export default function viewResults ({ calculateResults }) {
    return (
        <div className="score-view">
            <button className="btn score-view__button" onClick={calculateResults}>View Results</button>
        </div>
    )
}