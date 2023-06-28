interface BmiMeasurements {
  bodyMass: number;
  bodyHeight: number;
}

const weightCategory = (bmi: number) => {
  if (bmi < 18.5) return 'underweight (unhealthy)';
  if (18.5 < bmi && bmi < 24.9) return 'normal (healthy weight)';
  if (25 < bmi && bmi < 29.9) return 'overweight (pre-obese)';
  return 'obese';
};

export const calculateBmi = (bodyHeight: number, bodyMass: number) => {
  const bmi = bodyMass / (bodyHeight / 100) ** 2;
  return weightCategory(bmi);
};

const parseArguments = (args: string[]): BmiMeasurements => {
  const params = args.slice(2);
  if (params.length < 2) throw new Error(`Not enough arguments, only ${params.length} arguments given`);
  if (params.length > 2) throw new Error(`Too many arguments, ${params.length} arguments given`);

  if (params.filter(a => isNaN(Number(a)))[0]) {
    throw new Error(`All values needs to be numbers, provided values: ${params}`);
  }
  return {
    bodyHeight: Number(params[0]),
    bodyMass: Number(params[1]),
  };
};

if (process.argv[2]) {
  try {
    const { bodyHeight, bodyMass } = parseArguments(process.argv);
    console.log(calculateBmi(bodyHeight, bodyMass));
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error:' + error.message;
    }
    console.log(errorMessage);
  }
}
