import { motion } from 'framer-motion';
import { ReactElement } from 'react';
import { LineValue } from '../types/StoryTypes';

interface CodeLineProps {
	children: ReactElement;
	lineInfo: LineValue;
	showLineNumber: boolean;
	preservedLineNumber?: number;
}

export default function CodeLine({
	children,
	lineInfo,
	showLineNumber,
	preservedLineNumber,
}: CodeLineProps) {
	console.log(preservedLineNumber);
	return (
		<motion.div
			key={lineInfo.lineNumber}
			className="flex gap-2 origin-top px-2"
			initial={{
				height: 0,
				rotateX: 90,
			}}
			transition={{ ease: 'easeOut' }}
			animate={{
				height: 'auto',
				opacity: 100,
				rotateX: 0,
			}}
			exit={{
				height: 0,
				rotateX: 90,
			}}
		>
			{showLineNumber && (
				<div>{preservedLineNumber ?? lineInfo.lineNumber}</div>
			)}
			{children}
		</motion.div>
	);
}
