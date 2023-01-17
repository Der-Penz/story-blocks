import classNames from 'clean-react-classnames';
import { motion } from 'framer-motion';
import { ReactElement } from 'react';
import { LineValue } from '../types/StoryTypes';

interface CodeLineProps {
	children: ReactElement;
	changed: boolean;
	lineInfo: LineValue;
	showLineNumber: boolean;
	preservedLineNumber?: number;
}

export default function CodeLine({
	children,
	lineInfo,
	showLineNumber,
	changed,
	preservedLineNumber,
}: CodeLineProps) {
	return (
		<motion.div
			key={lineInfo.lineNumber}
			className={classNames('flex gap-2 origin-top px-2 border-l-4', {
				'bg-[#c084fc1f]': changed,
				'border-l-purple-400': changed,
				'border-l-transparent': !changed,
			})}
			initial={{
				height: 0,
				scaleY: 0,
			}}
			transition={{ ease: 'easeOut' }}
			animate={{
				height: 'auto',
				scaleY: 1,
			}}
			exit={{
				height: 0,
				scaleY: 0,
			}}
		>
			{showLineNumber && (
				<div>{preservedLineNumber ?? lineInfo.lineNumber}</div>
			)}
			{children}
		</motion.div>
	);
}
