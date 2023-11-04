// export const shuffleArray = (array: string[]): string[] => {
//   const newArray = [...array];

//   for (var i = newArray.length - 1; i > 0; i--) {
//     var j = Math.floor(Math.random() * (i + 1));
//     var temp = newArray[i];
//     newArray[i] = newArray[j];
//     newArray[j] = temp;
//   }

//   return newArray;
// };

export const getRandomWords = (
  wordsArray: string[],
  wordsCount: number,
): string[] => {
  const randomWords: string[] = [];

  for (let i = 0; i < wordsCount; i++) {
    const randomWordIndex: number = generateRandomInteger(
      0,
      wordsArray.length - 1,
    );

    const currentWord = wordsArray[randomWordIndex];
    randomWords.push(currentWord);
  }

  return randomWords;
};

export const generateRandomInteger = (
  minNumber: number,
  maxNumber: number,
): number => {
  return Math.floor(minNumber + Math.random() * (maxNumber - minNumber + 1));
};
