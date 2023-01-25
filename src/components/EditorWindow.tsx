import classNames from 'clean-react-classnames';
import { useMemo, useState } from 'react';
import { clamp } from '../helpers/Math';
import { usePreviousValue } from '../hooks/usePreviousValue';
import { Story } from '../types/StoryTypes';
import CodeBlock from './CodeBlock';

interface IEditorWindowProps {
	storys: Story[];
	showLineNumbers: boolean;
	preserveLineNumbers: boolean;
	width: string | number;
}

export default function EditorWindow({
	storys,
	width = '50%',
	showLineNumbers = true,
	preserveLineNumbers = false,
}: IEditorWindowProps) {
	const [page, setPage] = useState(0);
	const [storyPage, setStoryPage] = useState(0);
	const previousPage = usePreviousValue(page);

	const currentStory = useMemo(() => storys[storyPage], [storyPage, storys]);

	const switchPage = (page: number) => {
		setPage(clamp(page, 0, currentStory.story.length - 1));
	};
	const switchStory = (page: number) => {
		setPage(0);

		setStoryPage(clamp(page, 0, storys.length - 1));
	};

	return (
		<div className="m-2" style={{ width }}>
			<section className="flex justify-center items-center gap-2 mx-auto my-2">
				{currentStory.story.map((_, i) => (
					<div
						key={i}
						className="flex justify-center items-center basis-8 flex-shrink"
					>
						<button
							className={classNames(
								'relative aspect-square w-full border-base-50/20 rounded-md sm:rounded-lg border-accent hover:scale-110 transition-all',
								page === i
									? 'bg-primary-700 border-0'
									: 'bg-base-900 border-1',
							)}
							onClick={() => switchPage(i)}
						>
							<div
								className={classNames(
									'absolute -inset-0.5 blur opacity-50 rounded-md bg-primary-700 -z-10',
									{
										invisible: page !== i,
									},
								)}
							></div>
						</button>
					</div>
				))}
			</section>
			<div className="rounded-lg bg-base-900 border-1 border-base-50/20">
				<div className="overflow-hidden rounded-t-lg">
					<header className="overflow-auto flex scrollbar-hide snap-mandatory snap-x">
						{storys.map((story, i) => (
							<span
								onClick={() => switchStory(i)}
								className={classNames(
									'snap-start relative font-thin text-base-50/60 px-6 py-2 text-center select-none transition-colors',
									storyPage === i
										? 'bg-primary-300/10 border-b-primary-300 border-b-4'
										: 'bg-transparent border-b-primary-50 border-b-1',
								)}
							>
								{story.fileName}
								<span className="text-base-100/50 absolute right-2 scale-150">
									×
								</span>
							</span>
						))}
						<span className="border-b-1 border-primary-50/50 flex-1"></span>
					</header>
				</div>
				<section>
					<CodeBlock
						pages={{
							current: page,
							prev: clamp(
								previousPage,
								0,
								currentStory.story.length - 1,
							),
						}}
						story={currentStory}
						showLineNumbers={showLineNumbers}
						preserveLineNumbers={preserveLineNumbers}
					/>
				</section>
			</div>
		</div>
	);
}
