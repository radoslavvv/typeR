import LetterColor from "../enums/LetterColor";

class Letter {
	key: string;
	color: LetterColor;

	constructor(key: string) {
		this.key = key;
		this.color = LetterColor.Gray;
	}
}

export default Letter;
