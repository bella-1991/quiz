import React, { useState, useEffect } from 'react';

import Header from './components/header/header'
import TakeTest from './components/quiz/takeTest'
import Quiz from './components/quiz/quiz'
import ViewResults from './components/results/viewResults'
import Score from './components/results/score'
import './App.css';

function App() {
  const [questions, setQuestions] = useState({}),
        [currentQuestion, setCurrentQuestion] = useState(0),
        [showQuestion, setShowQuestion] = useState(false),
        [answers, setAnswers] = useState([]),
        [showResults, setShowResults] = useState(false),
        [results, setResults] = useState([]),
        [completed, setCompleted] = useState(false),
        [score, setScore] = useState(0)

  useEffect(() => {
    fetch('/questions.json')
      .then(resp => resp.json())
      .then(allQuestions => {
        setQuestions(allQuestions)
      })
  }, [])

  const takeTest = _ => {
    setShowQuestion(true)
  }

  const setAnswer = (questionNo, question, answer) => {
    const newAnswer = {
      questionNo: questionNo,
      question: question,
      correctAnswer: questions[currentQuestion].answer,
      userAnswer: answer
    }

    setAnswers([ ...answers, newAnswer ])

    if (currentQuestion < questions.length-1) {
      setCurrentQuestion(currentQuestion+1)
    } else {
      setCurrentQuestion(0)
      setShowQuestion(false)
      setCompleted(true)
    }    
  }

  const calculateResults = _ => {
    let resultsCount = 0,
        results = [],
        correct

    answers.map(answer => {
      correct = false

      if (answer.correctAnswer === answer.userAnswer) {
        resultsCount++
        correct = true
      }

      results.push({ ...answer, correct: correct})
    })

    setScore(resultsCount)
    setResults(results)
    setShowResults(true)
  }

  const resitTest = _ => {
    setShowQuestion(false)
    setAnswers([])
    setShowResults(false)
    setResults([])
    setCompleted(false)
    setScore(0)
  }

  return (
    <div className="quizz">
      <Header />
      { !showQuestion && !completed && <TakeTest takeTest={takeTest} /> }
      { showQuestion && <Quiz question={questions[currentQuestion]} totalQuestions={questions.length} setAnswer={setAnswer} />}
      { completed && !showResults && <ViewResults calculateResults={calculateResults} /> }
      { showResults && <Score score={score} results={results} resit={resitTest} />}
    </div>
  );
}

export default App;
