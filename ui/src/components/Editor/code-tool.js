import CodeTool from '@editorjs/code';
import 'prismjs/themes/prism-okaidia.css';
import Prism from 'prismjs';
import copy from 'copy-to-clipboard';
export default class CustomCodeTool extends CodeTool {
	constructor(...args) {
		super(...args);
	}

	save(codeWrapper) {
		const textarea = codeWrapper.querySelector('textarea');

		return {
			code: textarea ? textarea.value : '',
		};
	}

	drawView() {
		const wrapper = document.createElement('div'),
			codeContainer = document.createElement('div'),
			copyButton = document.createElement('div');

		wrapper.classList.add(this.CSS.baseClass, this.CSS.wrapper);

		codeContainer.classList.add('codetool-container');

		if (this.readOnly) {
			copyButton.addEventListener('click', () => {
				this.copyToClipboard();
			});

			const codeElement = document.createElement('code');
			codeElement.classList.add(this.CSS.textarea, this.CSS.input, 'language-javascript');

			copyButton.classList.add('copy-button');
			copyButton.innerHTML = `
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<rect x="0.5" y="0.5" width="23" height="23" rx="3.5" fill="#222731"/>
		<rect x="0.5" y="0.5" width="23" height="23" rx="3.5" stroke="#2C313C"/>
		<path d="M17.5263 18.5455H9.42105V8.36364H17.5263V18.5455ZM17.5263 6.90909H9.42105C9.03021 6.90909 8.65537 7.06234 8.379 7.33512C8.10263 7.6079 7.94737 7.97787 7.94737 8.36364V18.5455C7.94737 18.9312 8.10263 19.3012 8.379 19.574C8.65537 19.8468 9.03021 20 9.42105 20H17.5263C17.9172 20 18.292 19.8468 18.5684 19.574C18.8447 19.3012 19 18.9312 19 18.5455V8.36364C19 7.97787 18.8447 7.6079 18.5684 7.33512C18.292 7.06234 17.9172 6.90909 17.5263 6.90909ZM15.3158 4H6.47368C6.08284 4 5.708 4.15325 5.43163 4.42603C5.15526 4.69881 5 5.06878 5 5.45455V15.6364H6.47368V5.45455H15.3158V4Z" fill="white"/>
		</svg>

    `;
			codeContainer.appendChild(copyButton);

			const formattedCode = this.formatCode(this.data.code);
			codeElement.textContent = formattedCode;

			codeContainer.appendChild(codeElement);
			Prism.highlightElement(codeElement);
		} else {
			const textarea = document.createElement('textarea');
			textarea.classList.add(this.CSS.textarea, this.CSS.input);
			textarea.value = this.data.code;
			codeContainer.appendChild(textarea);
		}

		wrapper.appendChild(codeContainer);

		return wrapper;
	}

	formatCode(code) {
		const lines = code.split('\n');

		const commonWhitespace = lines.reduce((minWhitespace, line) => {
			const leadingWhitespace = line.match(/^\s*/)[0];
			return leadingWhitespace.length < minWhitespace.length ? leadingWhitespace : minWhitespace;
		}, lines[0].match(/^\s*/)[0]);

		const formattedCode = lines.map((line) => line.replace(new RegExp(`^${commonWhitespace}`), '')).join('\n');

		return formattedCode;
	}

	copyToClipboard() {
		console.log('syntax', this.nodes);

		const syntaxContent = this.nodes.holder.innerText;

		copy(syntaxContent);

		this.changeIconToCheckmark();

		const tooltipContent = 'Copied';
		const tooltipOptions = {
			placement: 'bottom',
		};

		this.api.tooltip.show(this.nodes.holder.firstChild.children[0], tooltipContent, tooltipOptions);

		setTimeout(() => {
			this.revertIcon();
			this.api.tooltip.hide();
		}, 2000);
	}

	changeIconToCheckmark() {
		const checkButton = `
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect x="0.375" y="0.375" width="23.25" height="23.25" rx="3.625" fill="#222731"/>
			<rect x="0.375" y="0.375" width="23.25" height="23.25" rx="3.625" stroke="#2C313C" stroke-width="0.75"/>
			<path fill-rule="evenodd" clip-rule="evenodd" d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM15.7826 10.1483C16.0854 9.82655 16.07 9.32025 15.7483 9.01744C15.4266 8.71463 14.9203 8.72997 14.6174 9.05171L10.6824 13.2327L9.38256 11.8517C9.07975 11.53 8.57345 11.5146 8.25171 11.8174C7.92997 12.1203 7.91463 12.6266 8.21744 12.9483L10.0998 14.9483C10.251 15.1089 10.4618 15.2 10.6824 15.2C10.9029 15.2 11.1137 15.1089 11.2649 14.9483L15.7826 10.1483Z" fill="white"/>
			</svg>
    	`;

		this.nodes.holder.children[0].childNodes[0].innerHTML = checkButton;
	}

	revertIcon() {
		const copyButton = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.5" y="0.5" width="23" height="23" rx="3.5" fill="#222731"/>
<rect x="0.5" y="0.5" width="23" height="23" rx="3.5" stroke="#2C313C"/>
<path d="M17.5263 18.5455H9.42105V8.36364H17.5263V18.5455ZM17.5263 6.90909H9.42105C9.03021 6.90909 8.65537 7.06234 8.379 7.33512C8.10263 7.6079 7.94737 7.97787 7.94737 8.36364V18.5455C7.94737 18.9312 8.10263 19.3012 8.379 19.574C8.65537 19.8468 9.03021 20 9.42105 20H17.5263C17.9172 20 18.292 19.8468 18.5684 19.574C18.8447 19.3012 19 18.9312 19 18.5455V8.36364C19 7.97787 18.8447 7.6079 18.5684 7.33512C18.292 7.06234 17.9172 6.90909 17.5263 6.90909ZM15.3158 4H6.47368C6.08284 4 5.708 4.15325 5.43163 4.42603C5.15526 4.69881 5 5.06878 5 5.45455V15.6364H6.47368V5.45455H15.3158V4Z" fill="white"/>
</svg>

    `;

		this.nodes.holder.children[0].childNodes[0].innerHTML = copyButton;
	}
}
