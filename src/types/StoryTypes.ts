import { Language } from 'prism-react-renderer';

type HighlightedValue = {
	lineNumber: number | number[];
	value: string;
	data?: string | object;
	preserve: boolean;
};

export type StoryStep = {
	deleteLine?: number[] | number;
	addLine?: number[] | number;
	highlights?: HighlightedValue[];
};

export type StoryState = {
	lines: {
		[lineNumber: number]: LineValue;
	};
};

export type LineValue = {
	visible: boolean;
	lineNumber: number;
	highlight?: HighlightedValue[];
};

export type Story = {
	story: StoryState[];
	code: string;
	fileName: string;
	language: Language;
};
