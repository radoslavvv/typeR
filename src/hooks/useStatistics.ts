import { useEffect, useState } from "react";

const useStatitstics = () => {
	const [typedWords, setTypedWords] = useState<number>(0);
	const [correctTypedWords, setCorrectTypedWords] = useState<number>(0);
	const [wrongTypedWords, setWrongTypedWords] = useState<number>(0);

	const [keyStrokes, setKeyStrokes] = useState<number>(0);
	const [correctKeyStrokes, setCorrectKeyStrokes] = useState<number>(0);
	const [wrongKeyStrokes, setWrongKeyStrokes] = useState<number>(0);

	return {
		typedWords,
        setTypedWords,
		correctTypedWords,
        setCorrectTypedWords,
		wrongTypedWords,
        setWrongTypedWords,
		keyStrokes,
        setKeyStrokes,
		correctKeyStrokes,
        setCorrectKeyStrokes,
		wrongKeyStrokes,
        setWrongKeyStrokes
	};
};

export default useStatitstics;
