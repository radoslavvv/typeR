import Letter from "../../../models/Letter";
import LetterStatus from "../../../models/LetterStatus";
import WordModel from "../../../models/Word";

interface IWordProps {
  word: WordModel;
}

const Word = ({ word }: IWordProps) => {
  return (
    <div className="text-2xl font-normal text-lightGray">
      {word.letters.map((c: Letter, ci: number) => (
        <>
          <span
            style={{
              color:
                c.status === LetterStatus.Default
                  ? "#4b5975"
                  : c.status === LetterStatus.Wrong
                  ? "red"
                  : "#ccccb5",
            }}
          >
            {c.content}
          </span>
        </>
      ))}
    </div>
  );
};

export default Word;
