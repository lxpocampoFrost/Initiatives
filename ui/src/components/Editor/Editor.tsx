//@ts-nocheck
import { useEffect, useRef } from 'react';
import { Box } from '@mui/material';

const Editor = () => {
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
		const CodeBox = (await import('@bomdi/codebox')).default;
		const Table = (await import('@editorjs/table')).default;

		const editor = new EditorJS({
			placeholder: 'Untitled',
			holder: 'editor-js',
			inlineToolbar: true,
			tools: {
				header: {
					class: Header,
				},
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
					config: {
						titlePlaceholder: 'Title',
						messagePlaceholder: 'Message',
					},
				},
				image: {
					class: ImageTool,
				},
				marker: Marker,
				table: Table,
			},
			data: {
				blocks: [
					{
						type: 'paragraph',
						data: {
							text: '',
							level: 1,
						},
					},
				],
			},
			autofocus: true,
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
		console.log('Editor mounted');
		initializeEditor();
		return () => {
			console.log('Editor unmounted');
			if (editorRef.current) {
				console.log('editor', editorRef);
				editorRef.current.destroy();
			}
		};
	}, []);

	return (
		<>
			<Box
				id='editor-js'
				sx={{
					color: '#ffffff',
					'.ce-popover--opened': {
						padding: '4px',
						background: '#16191F',
						borderRadius: '8px',
						border: 'none',
					},
					'.ce-popover__items': {
						display: 'flex',
						flexDirection: 'column',
						rowGap: '8px',
						margin: '8px 0',
						'&::-webkit-scrollbar': {
							width: '11px',
							background: '#2C313C',
						},
						'&::-webkit-scrollbar-track': {
							backgroundColor: '#2C313C',
						},
						'&::-webkit-scrollbar-thumb': {
							background: '#4F545F',
							borderRadius: '8px',
						},
					},
					'.ce-popover-item': {
						padding: '0',
						color: '#ffffff',
					},
					'.ce-popover-item__title': {
						fontFamily: 'Figtree-Medium,sans-serif',
						fontWeight: '500',
						lineHeight: '16.8px',
						color: '#ffffff',
					},
					'.ce-popover-item__icon': {
						border: '1px solid #2C313C',
						borderRadius: '6px',
						boxShadow: 'none',
						background: 'transparent',
						width: '24px',
						height: '24px',
					},
					'.ce-toolbar__plus, .ce-toolbar__settings-btn, .cdx-search-field__icon, .cdx-search-field__icon svg, .ce-popover-item__icon svg': {
						width: '24px',
						height: '24px',
					},
					'.codex-editor path': {
						stroke: '#ffffff',
					},
					'.cdx-search-field': {
						background: '#2C313C',
						borderRadius: '6px',
						padding: '4px 0px 4px 4px',
						marginBottom: '0',
						border: 'none',
					},
					'.cdx-search-field__input': {
						fontFamily: 'Figtree-Medium, sans-serif',
						fontWeight: '500',
						fontSize: '14px',
						lineHeight: '16.8px',
						color: '#ffffff',
					},
					'.cdx-search-field__input::placeholder': {
						color: '#ffffff',
						opacity: '0.3',
					},
					'.cdx-search-field__icon svg': {
						color: '#ffffff',
					},
					'.ce-popover__custom-content:not(:empty)': {
						marginBottom: '0',
					},
					'.ce-toolbar__settings-btn': {
						marginLeft: '4px',
					},
					'.ce-toolbar__actions': {
						paddingRight: '8px',
					},
					'.ce-block__content': {
						fontFamily: 'Figtree-Bold,sans-serif',
					},
					'.ce-code__textarea': {
						borderRadius: '8px',
						background: 'rgba(255, 255, 255, 0.08)',
						color: '#ffffff',
						border: 'none',
					},
				}}
			></Box>
			<button>Submit Post</button>
		</>
	);
};

export default Editor;
