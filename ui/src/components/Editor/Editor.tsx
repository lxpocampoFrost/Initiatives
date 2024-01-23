//@ts-nocheck
import { useEffect, useRef } from 'react';

interface EditorProps {
	mode?: String;
	postData?: any;
}

const Editor = ({ mode, postData }: EditorProps) => {
	const editorRef = useRef(null);

	const initializeEditor = async () => {
		const EditorJS = (await import('@editorjs/editorjs')).default;
		const Header = (await import('@editorjs/header')).default;
		const Paragraph = (await import('@editorjs/paragraph')).default;
		const List = (await import('@editorjs/list')).default;
		const Code = (await import('@editorjs/code')).default;
		const InlineCode = (await import('@editorjs/inline-code')).default;
		const Quote = (await import('@editorjs/quote')).default;
		const Checklist = (await import('@editorjs/checklist')).default;
		const Warning = (await import('@editorjs/warning')).default;
		const TextVariantTune = (await import('@editorjs/text-variant-tune')).default;
		const Underline = (await import('@editorjs/underline')).default;
		const ImageTool = (await import('@editorjs/image')).default;
		const Marker = (await import('@editorjs/marker')).default;
		const DragDrop = (await import('editorjs-drag-drop')).default;

		const editor = new EditorJS({
			holder: 'editor-js',
			inlineToolbar: true,
			tools: {
				header: Header,
				paragraph: {
					class: Paragraph,
					inlineToolbar: true,
				},
				list: {
					class: List,
					inlineToolbar: true,
					config: {
						defaultStyle: 'unordered',
					},
				},
				code: {
					class: Code,
				},
				inlineCode: {
					class: InlineCode,
					inlineToolbar: true,
				},
				quote: {
					class: Quote,
					inlineToolbar: true,
					config: {
						quotePlaceholder: 'Enter a quote',
						captionPlaceholder: "Quote's author",
					},
				},
				checklist: {
					class: Checklist,
					inlineToolbar: true,
				},
				textVariant: TextVariantTune,
				underline: Underline,
				warning: {
					class: Warning,
					inlineToolbar: true,
					shortcut: 'CMD+SHIFT+W',
					config: {
						titlePlaceholder: 'Title',
						messagePlaceholder: 'Message',
					},
				},
				image: {
					class: ImageTool,
				},
				marker: Marker,
			},
			data:
				mode === 'view' || mode === 'edit'
					? postData.post
					: {
							blocks: [
								{
									type: 'header',
									data: {
										text: 'Untitled',
										level: 1,
									},
								},
							],
					  },
			readOnly: mode === 'view' ? true : false,
			tunes: ['textVariant'],
			onChange: () => {
				editor.save().then((outputData) => {
					console.log('output', outputData);
				});
			},
			onReady: () => {
				new DragDrop(editor);
			},
		});

		editorRef.current = editor;
	};

	useEffect(() => {
		initializeEditor();

		return () => {
			if (editorRef.current) {
				editorRef.current.destroy();
			}
		};
	}, []);

	return (
		<>
			<div id='editor-js'></div>
			<button onClick={handleSubmit}>Submit Post</button>
		</>
	);
};

export default Editor;
