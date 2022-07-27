const Header = (props) => {
  console.log('header', props)
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}
const Part = (props) => {
  console.log('part', props)
  return (
    <div>
      <p>{props.part.name} {props.part.exercises}</p>
    </div>
  )
}

const Content = (props) => {
  console.log('content', props)
  return (
    <div>
      <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
    </div>
  )
}

const Total = (props) => {
  console.log('total', props)
  return (
    <div>
      <p>Number of exercises {props.total.reduce((sum, {exercises}) => sum + exercises, 0)} </p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

    return (
      <>
        <Header course={course} />
        <Content parts={parts} />
        <Total total={parts} />
      </>
    )
  }
  
  export default App
