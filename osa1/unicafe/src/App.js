import { useState } from 'react'

const Headline = ({headline}) => (
  <h1>{headline}</h1>
)

const Button = ({handleclick, text}) => (
  <button onClick={handleclick}>{text}</button>
)

const StatisticLine = ({text, value, char}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
    <td>{char}</td>
  </tr>
)

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const average = (good*1 + bad*-1)/all
  const positive = good/(good+neutral+bad)*100
  
  if (all === 0) {
    return (
      <div>No feedback given</div>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={all} />
        <StatisticLine text='average' value={average} />
        <StatisticLine text='positive' value={positive} char='%' />
      </tbody>
    </table>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increase = (review) => {
    if (review === 'good') {
      setGood(good + 1)
    } else if (review === 'neutral') {
      setNeutral(neutral + 1)
    } else {
      setBad(bad + 1)
    }
  }

  return (
    <>
      <Headline headline={'give feedback'} />
      <Button handleclick={() => increase('good')} text='good' />
      <Button handleclick={() => increase('neutral')} text='neutral' />
      <Button handleclick={() => increase('bad')} text='bad' />
      <Headline headline={'statistics'} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App
