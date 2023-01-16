import { Language } from 'prism-react-renderer';

export type StoryStep = {
	deleteLine?: number[] | number;
	addLine?: number[] | number;
};

export type StoryState = {
	lines: {
		[lineNumber: number]: LineValue;
	};
};

export type LineValue = { visible: boolean; lineNumber: number };

export type Story = {
	story: StoryState[];
	code: string;
	fileName: string;
	language: Language;
};
