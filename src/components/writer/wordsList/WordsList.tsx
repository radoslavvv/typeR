import React from "react";

import Word from "../../../models/Word";

import WordComponent from "../word/Word";

import { getWordWidth } from "../../../utils/Utilities";

interface IWordsListProps {
  words: Word[];
}

const WordsList = ({ words }: IWordsListProps) => {
  const [rows, setRows] = React.useState<JSX.Element[]>([]);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  React.useLayoutEffect(() => {
    const generateRows = (): void => {
      const generatedRows: JSX.Element[] = [];
      const maxRowWidth: number = containerRef?.current?.clientWidth || 1120;

      let currentRow: Word[] = [];
      let currentRowWidth: number = 0;

      words.forEach((word: Word, wi: number) => {
        const wordWidth: number = getWordWidth(word.content);

        console.log(word.content);
        console.log(wordWidth);
        console.log(currentRowWidth);
        console.log(currentRowWidth + wordWidth <= maxRowWidth - 50);

        if (currentRowWidth + wordWidth <= maxRowWidth - 50) {
          currentRow.push(word);
          currentRowWidth += wordWidth;
          currentRowWidth += 8;
        } else {
          const rowJSX: JSX.Element = generateRowJSX(
            currentRow,
            generatedRows.length,
          );
          generatedRows.push(rowJSX);

          currentRow = [word];
          currentRowWidth = wordWidth;
        }

        if (wi === words.length - 1) {
          const lastRowJSX: JSX.Element = generateRowJSX(
            currentRow,
            generatedRows.length,
          );
          generatedRows.push(lastRowJSX);
        }
      });

      setRows([...generatedRows]);
    };

    const generateRowJSX = (
      currentRow: Word[],
      generatedRowsCount: number,
    ): JSX.Element => {
      const rowJSX: JSX.Element = (
        <div
          key={JSON.stringify(currentRow)}
          className="row relative flex gap-2 duration-300"
        >
          {currentRow.map((w: Word, wi: number) => (
            <WordComponent
              key={w.content + wi}
              word={w}
              wordIndex={wi}
              rowIndex={generatedRowsCount}
            />
          ))}
        </div>
      );

      return rowJSX;
    };

    setTimeout(() => {
      generateRows();
    }, 4000);
  }, []);

  return (
    <div
      ref={containerRef}
      className="wordsList flex h-32 w-full  flex-col content-baseline gap-2 overflow-hidden text-lightGray duration-300"
    >
      {rows}
    </div>
  );
};

export default WordsList;
