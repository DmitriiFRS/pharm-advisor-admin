import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";

interface Props {
	index: number;
	count: number;
	onMove: (from: number, to: number) => void;
	onRemove: (index: number) => void;
	removeLabel: string;
}

const FieldArrayControls: React.FC<Props> = ({ index, count, onMove, onRemove, removeLabel }) => {
	const buttonClass =
		"p-2 rounded-lg border border-gray-200 text-gray-500 hover:text-black-primary hover:bg-gray-50 disabled:opacity-35 disabled:cursor-not-allowed transition-colors";

	return (
		<div className="flex items-center gap-2">
			<button
				type="button"
				onClick={() => onMove(index, index - 1)}
				disabled={index === 0}
				className={buttonClass}
				aria-label="Переместить вверх"
				title="Переместить вверх"
			>
				<ArrowUp className="w-4 h-4" />
			</button>
			<button
				type="button"
				onClick={() => onMove(index, index + 1)}
				disabled={index === count - 1}
				className={buttonClass}
				aria-label="Переместить вниз"
				title="Переместить вниз"
			>
				<ArrowDown className="w-4 h-4" />
			</button>
			<button
				type="button"
				onClick={() => onRemove(index)}
				className="p-2 rounded-lg border border-red-100 text-red-500 hover:bg-red-50 transition-colors"
				aria-label={removeLabel}
				title={removeLabel}
			>
				<Trash2 className="w-4 h-4" />
			</button>
		</div>
	);
};

export default FieldArrayControls;
