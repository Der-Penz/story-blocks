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
	let preservedLineNumber = 1;

	return (
		<Highlight
			{...defaultProps}
			code={story.code}
			theme={nightOwlTheme}
			language={story.language}
		>
			{({ className, style, tokens, getLineProps, getTokenProps }) => {
				return (
					<pre className={className}>
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
											preserveLineNumbers
												? i + 1
												: preservedLineNumber++
										}
									>
										<div {...getLineProps({ line })}>
											{line.map((token, key) => {
												const resultedHighlight =
													currentLine.highlight?.find(
														(highlight) =>
															highlight.value.trim() ===
															token.content.trim(),
													);
												if (resultedHighlight) {
													return (
														<span className="bg-base-50/20 rounded-sm relative group">
															<span
																{...getTokenProps(
																	{
																		token,
																		key,
																	},
																)}
															/>
															<div className="invisible left-0 bg-base-50/80 text-base-900 font-semibold rounded-md min-w-max p-1 group-hover:visible absolute isolate">
																{typeof resultedHighlight.data ===
																'string'
																	? resultedHighlight.data
																	: JSON.stringify(
																			resultedHighlight.data,
																			null,
																			2,
																	  )}
																<div className="absolute -inset-0.5 bg-base-50/50 -z-10 blur opacity-50"></div>
															</div>
														</span>
													);
												}

												return (
													<span
														{...getTokenProps({
															token,
															key,
														})}
													/>
												);
											})}
										</div>
									</CodeLine>
								);
							})}
						</AnimatePresence>
					</pre>
				);
			}}
		</Highlight>
	);
}
