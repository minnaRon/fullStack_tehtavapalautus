interface Course {
  name: string;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartRequirements extends CoursePartDescription {
  requirements: string[];
  kind: 'special';
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartRequirements;

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = (props: { part: CoursePart }) => {
  const { part } = props
  switch (part.kind) {
    case 'basic':
      return (
        <div>
          <p><b>{part.name} {part.exerciseCount}</b><br />
            <i>{part.description}</i></p>
        </div>
      );
    case 'group':
      return (
        <div>
          <p><b>{part.name} {part.exerciseCount}</b><br />
            project exercises {part.groupProjectCount}</p>
        </div>
      );
    case 'background':
      return (
        <div>
          <p><b>{part.name} {part.exerciseCount}</b><br />
            <i>{part.description}</i><br />
            {part.backgroundMaterial}</p>
        </div>
      );
    case 'special':
      return (
        <div>
          <p><b>{part.name} {part.exerciseCount}</b><br />
            <i>{part.description}</i><br />
            required skills: {part.requirements}</p>
        </div>
      );
    default:
      return assertNever(part);
  }
};

const Header = (props: Course) => <h1>{props.name}</h1>;

const Content = (props: { courseParts: CoursePart[] }) => {
  return (
    <>
      {props.courseParts.map(part =>
        <Part key={part.name} part={part} />
      )
      }
    </>
  );
};

const Total = (props: { courseParts: CoursePart[] }) => {
  const { courseParts } = props
  return (
    <>
      <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </>
  );
};

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;
