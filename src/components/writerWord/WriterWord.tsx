import { memo, useState, useEffect } from "react";
import Letter from "../../models/Letter";
import Word from "../../models/Word";
import { Cursor } from "../cursor/Cursor";
import styles from "./WriterWord.module.scss";

export interface IWriterWordProps {
    word: Word;
    isCurrentWord: boolean;
    letterIndex: number;
    isLastLetter: boolean
}

export const WriterWord: React.FC<IWriterWordProps> = memo((props: IWriterWordProps) => {

    const { word, isCurrentWord, letterIndex, isLastLetter } = props;

    return (
        <div className={styles.word}>
            {word.letters.map((letter: Letter, li) => (
                <>
                    {
                        isCurrentWord &&
                        li === letterIndex &&
                        <Cursor />
                    }
                    
                    <div
                        key={li}
                        className={`${styles.letter} ${styles[letter.color]}`}
                    >
                        {letter.key}
                    </div>
                </>
            ))}

            {
                isCurrentWord &&
                isLastLetter &&
                <Cursor />
            }
        </div>
    );
});