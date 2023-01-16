import { Language } from 'prism-react-renderer';
import {} from 'prismjs';
import LANGUAGE_MAP from '../helpers/LanguageMap';
import { deepCopy } from '../helpers/Util';
import { Story, StoryState, StoryStep } from '../types/StoryTypes';

class StoryBuilder {
	public static readonly NEW_LINE_REGEX = /\r?\n/g;

	private _maxLineNumber: number;
	private _initialState: StoryState;
	private _steps: StoryStep[];
	private _code: string;
	private _fileName: string;
	private _language: Language;

	constructor(
		code: string,
		language: Language,
		fileName: string,
		initialState?: number[],
	) {
		this._steps = [];
		this._code = code;
		this._language = language;

		const fileExtensionRegex = /\.[a-zA-Z0-9]+$/;
		if (fileName.match(fileExtensionRegex)) {
			this._fileName = fileName;
		} else {
			this._fileName = `${fileName ?? 'index'}.${
				LANGUAGE_MAP[language] ?? ''
			}`;
		}

		this._maxLineNumber = code.split(StoryBuilder.NEW_LINE_REGEX).length;

		this._initialState = { lines: {} };
		if (initialState) {
			for (let i = 1; i <= this._maxLineNumber; i++) {
				this._initialState.lines[i] = {
					lineNumber: i,
					visible: initialState.includes(i),
				};
			}
		} else {
			for (let i = 1; i <= this._maxLineNumber; i++) {
				this._initialState.lines[i] = {
					lineNumber: i,
					visible: false,
				};
			}
		}
	}

	addStep(...steps: StoryStep[]): this {
		this._steps.push(...steps);

		return this;
	}

	buildStory(): Story {
		const story: StoryState[] = [this._initialState];

		this._steps.forEach((step) => {
			const previousState = story.at(-1)!;
			const nextState: StoryState = deepCopy(previousState) as StoryState;

			if (typeof step.deleteLine === 'number') {
				nextState.lines[step.deleteLine].visible = false;
			} else if (step.deleteLine) {
				step.deleteLine.forEach(
					(lineNumber) =>
						(nextState.lines[lineNumber].visible = false),
				);
			}

			if (typeof step.addLine === 'number') {
				nextState.lines[step.addLine].visible = true;
			} else if (step.addLine) {
				step.addLine.forEach(
					(lineNumber) =>
						(nextState.lines[lineNumber].visible = true),
				);
			}

			story.push(nextState);
		});
		return {
			story: story,
			code: this._code,
			fileName: this._fileName,
			language: this._language,
		};
	}

	get fileName() {
		return this._fileName;
	}

	set fileName(newName: string) {
		this._fileName = newName;
	}
}

export default StoryBuilder;
