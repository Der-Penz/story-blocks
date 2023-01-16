import { motion } from 'framer-motion';
import { useState } from 'react';
import { clamp } from '../helpers/Math';
import { Story } from '../types/StoryTypes';
import CodeBlock from './CodeBlock';

interface IEditorWindowProps {
	story: Story;
	showLineNumbers: boolean;
	preserveLineNumbers: boolean;
}

export default function EditorWindow({
	story,
	showLineNumbers = true,
	preserveLineNumbers = false,
}: IEditorWindowProps) {
	const [page, setPage] = useState(0);

	const switchPage = (page: number) => {
		setPage(clamp(page, 0, story.story.length));
	};

	return (
		<div className="rounded-lg bg-slate-900 p-2 w-1/2">
			<section className="flex gap-1 justify-center">
				{story.story.map((step, i) => (
					<motion.button
						className="aspect-square w-5  border-cyan-900 rounded-sm border-2"
						whileHover={{ scale: 1.1 }}
						style={{
							backgroundColor: page === i ? 'purple' : '',
						}}
						onClick={() => switchPage(i)}
						key={i}
					></motion.button>
				))}
			</section>
			<section className="border-b-2 border-black">
				<span>{story.fileName}</span>
			</section>
			<section>
				<CodeBlock
					page={page}
					story={story}
					showLineNumbers={showLineNumbers}
					preserveLineNumbers={preserveLineNumbers}
				/>
			</section>
		</div>
	);
}
