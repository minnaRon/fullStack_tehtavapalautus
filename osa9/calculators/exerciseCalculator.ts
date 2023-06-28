interface ExerciseStats {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface RatingValues {
  rating: number;
  ratingDescription: string;
}

const calcRating = (average: number, target: number): RatingValues => {
  if (average >= target) return { rating: 3, ratingDescription: 'Great job! target achieved' };
  if (average / target > 5 / 6) return { rating: 2, ratingDescription: 'not too bad but could be better' };
  if (average / target >= 2 / 3) return { rating: 2, ratingDescription: 'needs more focus to achieve the target' };
  return { rating: 1, ratingDescription: 'not even close, needs more serious concentration' };
};

export const calculateExercises = (dailyHours: number[], target: number): ExerciseStats => {
  const average: number = dailyHours.reduce((sum, hours) => sum + hours) / dailyHours.length;
  const { rating, ratingDescription }: RatingValues = calcRating(average, target);

  return {
    periodLength: dailyHours.length,
    trainingDays: dailyHours.filter(h => h !== 0).length,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average
  };
};

const parseArgs = (args: string[]) => {
  const [execPath, filePath, target, ...dailyhours] = args;
  console.log('exec', execPath);
  console.log('file', filePath);
  if (!target) throw new Error(`Arguments are missing.`);
  if (!dailyhours[0]) throw new Error(`Argument missing: With target also daily hours should be given as arguments.`);

  const dailyHours: number[] = dailyhours.map(h => Number(h));
  const dailyTarget = Number(target);

  if (dailyHours.includes(NaN) || isNaN(dailyTarget)) {
    throw new Error(`All values needs to be numbers, provided values: ${args.slice(2)}`);
  }
  return { dailyHours, dailyTarget };
};

if (process.argv[2]) {
  try {
    const { dailyHours, dailyTarget } = parseArgs(process.argv);
    console.log(calculateExercises(dailyHours, dailyTarget));
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error:' + error.message;
    }
    console.log(errorMessage);
  }
}
