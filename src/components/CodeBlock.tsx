import { AnimatePresence } from 'framer-motion';
import Highlight, { defaultProps } from 'prism-react-renderer';
import nightOwlTheme from 'prism-react-renderer/themes/nightOwl';
import { Story } from '../types/StoryTypes';
import CodeLine from './CodeLine';

interface ICodeBlockProps {
	story: Story;
	showLineNumbers: boolean;
	preserveLineNumbers: boolean;
	pages: {
		prev: number;
		current: number;
	};
}

export default function CodeBlock({
	story,
	showLineNumbers,
	preserveLineNumbers,
	pages,
}: ICodeBlockProps) {
	return (
		<Highlight
			{...defaultProps}
			code={story.code}
			theme={nightOwlTheme}
			language={story.language}
		>
			{({ className, style, tokens, getLineProps, getTokenProps }) => (
				<pre className={className} style={style}>
					<AnimatePresence>
						{tokens.map((line, i) => {
							const currentLine =
								story.story[pages.current].lines[i + 1];
							const previousLine =
								story.story[pages.prev].lines[i + 1];

							if (!currentLine.visible) {
								return;
							}
							return (
								<CodeLine
									changed={
										currentLine.visible !==
										previousLine.visible
									}
									key={i}
									lineInfo={currentLine}
									showLineNumber={showLineNumbers}
									preservedLineNumber={
										!preserveLineNumbers ? i + 1 : undefined
									}
								>
									<div {...getLineProps({ line })}>
										{line.map((token, key) => (
											<span
												{...getTokenProps({
													token,
													key,
												})}
											/>
										))}
									</div>
								</CodeLine>
							);
						})}
					</AnimatePresence>
				</pre>
			)}
		</Highlight>
	);
}
