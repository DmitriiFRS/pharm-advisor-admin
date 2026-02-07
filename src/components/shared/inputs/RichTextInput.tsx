"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { Bold, Italic, Underline as UnderunIcon, List, ListOrdered, Link as LinkIcon, Undo, Redo } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useEffect } from "react";

interface Props {
	value: string;
	onChange: (value: string) => void;
	error?: string;
	label?: string;
	className?: string;
}

const RichTextInput: React.FC<Props> = ({ value, onChange, error, label, className }) => {
	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			Link.configure({
				openOnClick: false,
			}),
		],
		content: value,
		editorProps: {
			attributes: {
				class: "prose prose-sm max-w-none focus:outline-none min-h-[150px] p-4 text-black-primary",
			},
		},
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML());
		},
		immediatelyRender: false, // Fix hydration mismatch
	});

	// Sync content if value changes externally (e.g. reset) and editor content is different
	useEffect(() => {
		if (editor && value !== editor.getHTML()) {
			if (value === "" && editor.getHTML() === "<p></p>") return; // Ignore empty state diff
			editor.commands.setContent(value);
		}
	}, [value, editor]);

	if (!editor) {
		return null;
	}

	return (
		<div className={cn("w-full", className)}>
			{label && <p className="text-14 font-medium text-black-primary mb-2">{label}</p>}
			<div
				className={cn(
					"border rounded-xl overflow-hidden bg-white transition-colors",
					error ? "border-red-500" : "border-gray-200 focus-within:border-e94190"
				)}
			>
				<div className="flex items-center gap-1 border-b border-gray-100 p-1 bg-gray-50 flex-wrap">
					<ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive("bold")} icon={Bold} />
					<ToolbarButton
						onClick={() => editor.chain().focus().toggleItalic().run()}
						isActive={editor.isActive("italic")}
						icon={Italic}
					/>
					<ToolbarButton
						onClick={() => editor.chain().focus().toggleUnderline().run()}
						isActive={editor.isActive("underline")}
						icon={UnderunIcon}
					/>
					<div className="w-px h-6 bg-gray-200 mx-1" />
					<ToolbarButton
						onClick={() => editor.chain().focus().toggleBulletList().run()}
						isActive={editor.isActive("bulletList")}
						icon={List}
					/>
					<ToolbarButton
						onClick={() => editor.chain().focus().toggleOrderedList().run()}
						isActive={editor.isActive("orderedList")}
						icon={ListOrdered}
					/>
					<div className="w-px h-6 bg-gray-200 mx-1" />
					<ToolbarButton
						onClick={() => {
							const previousUrl = editor.getAttributes("link").href;
							const url = window.prompt("URL", previousUrl);
							if (url === null) return;
							if (url === "") {
								editor.chain().focus().extendMarkRange("link").unsetLink().run();
								return;
							}
							editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
						}}
						isActive={editor.isActive("link")}
						icon={LinkIcon}
					/>
					<div className="ml-auto flex items-center gap-1">
						<ToolbarButton onClick={() => editor.chain().focus().undo().run()} icon={Undo} />
						<ToolbarButton onClick={() => editor.chain().focus().redo().run()} icon={Redo} />
					</div>
				</div>
				<EditorContent editor={editor} />
			</div>
			{error && <p className="text-12 text-red-500 mt-1">{error}</p>}
		</div>
	);
};

const ToolbarButton = ({ onClick, isActive, icon: Icon }: { onClick: () => void; isActive?: boolean; icon: React.ElementType }) => (
	<button
		type="button"
		onClick={onClick}
		className={cn(
			"p-2 rounded hover:bg-gray-100 transition-colors text-gray-600",
			isActive ? "bg-gray-100 text-black-primary font-medium" : ""
		)}
	>
		<Icon size={18} />
	</button>
);

export default RichTextInput;
