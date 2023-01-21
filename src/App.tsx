import StoryBuilder from './classes/StoryBuilder';
import EditorWindow from './components/EditorWindow';

const code = `async function t = 10;
let i = 10;
function c(number){
	return number * 10 * Math.random() * 2; //return number * 10 * Math.random() * 2;
}

c(10);
console.log({key: "mike"})`;

const storyBuilder = new StoryBuilder(code, 'javascript', 'server', [1]);

storyBuilder.addStep({ addLine: [2, 3, 5] });
storyBuilder.addStep({ addLine: 4, deleteLine: 3 });
storyBuilder.addStep({ addLine: [1, 2, 3, 4, 5, 6, 7, 8] });

const story = storyBuilder.buildStory();
storyBuilder.addStep({ addLine: [1, 2, 3, 4, 5, 6, 7, 8] });
storyBuilder.addStep({ addLine: [1, 2, 3, 4, 5, 6, 7, 8] });
const story2 = storyBuilder.buildStory();

function App() {
	return (
		<div className="App flex justify-center items-start h-[100vh]">
			<EditorWindow
				storys={[story, story2]}
				showLineNumbers={true}
				preserveLineNumbers={true}
			/>
		</div>
	);
}

export default App;
