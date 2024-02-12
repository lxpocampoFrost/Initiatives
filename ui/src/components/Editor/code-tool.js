import CodeTool from '@editorjs/code';
import 'prismjs/themes/prism-okaidia.css';
import Prism from 'prismjs';

export default class CustomCodeTool extends CodeTool {
	constructor(...args) {
		super(...args);

		this.copyButton = null;
	}

	save(codeWrapper) {
		const textarea = codeWrapper.querySelector('textarea');

		return {
			code: textarea ? textarea.value : '',
		};
	}

	drawView() {
		const wrapper = document.createElement('div'),
			codeContainer = document.createElement('div');
		// copyButton = document.createElement('div');

		this.copyButton = document.createElement('div');

		wrapper.classList.add(this.CSS.baseClass, this.CSS.wrapper);

		codeContainer.classList.add('codetool-container');

		if (this.readOnly) {
			this.copyButton.addEventListener('click', () => {
				this.copyToClipboard();
			});

			const codeElement = document.createElement('code');
			codeElement.classList.add(this.CSS.textarea, this.CSS.input, 'language-javascript');

			this.copyButton.classList.add('copy-button');
			this.copyButton.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 21H8V7H19V21ZM19 5H8C7.46957 5 6.96086 5.21071 6.58579 5.58579C6.21071 5.96086 6 6.46957 6 7V21C6 21.5304 6.21071 22.0391 6.58579 22.4142C6.96086 22.7893 7.46957 23 8 23H19C19.5304 23 20.0391 22.7893 20.4142 22.4142C20.7893 22.0391 21 21.5304 21 21V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5ZM16 1H4C3.46957 1 2.96086 1.21071 2.58579 1.58579C2.21071 1.96086 2 2.46957 2 3V17H4V3H16V1Z" fill="white"/>
      </svg>
    `;
			codeContainer.appendChild(this.copyButton);

			const formattedCode = this.formatCode(this.data.code);
			codeElement.textContent = formattedCode;

			codeContainer.appendChild(codeElement);
			Prism.highlightElement(codeElement);

			this.copyButton = this.copyButton;
			console.log('this', this.copyButton);
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
		const syntaxContent = this.nodes.holder.innerText;

		navigator.clipboard.writeText(syntaxContent);

		this.changeIconToCheckmark();

		const tooltipContent = 'Copied';
		const tooltipOptions = {
			placement: 'bottom',
		};

		console.log('this', this);

		this.api.tooltip.show(this.nodes.holder.firstChild.children[0], tooltipContent, tooltipOptions);

		setTimeout(() => {
			this.revertIcon();
			this.api.tooltip.hide();
		}, 2000);
	}

	changeIconToCheckmark() {
		const checkButton = `
			<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path fill-rule="evenodd" clip-rule="evenodd" d="M16 26C21.5228 26 26 21.5228 26 16C26 10.4772 21.5228 6 16 6C10.4772 6 6 10.4772 6 16C6 21.5228 10.4772 26 16 26ZM20.7282 13.6854C21.1067 13.2832 21.0875 12.6503 20.6854 12.2718C20.2832 11.8933 19.6503 11.9125 19.2718 12.3146L14.3529 17.5409L12.7282 15.8146C12.3497 15.4125 11.7168 15.3933 11.3146 15.7718C10.9125 16.1503 10.8933 16.7832 11.2718 17.1854L13.6247 19.6854C13.8137 19.8862 14.0772 20 14.3529 20C14.6287 20 14.8922 19.8862 15.0811 19.6854L20.7282 13.6854Z" fill="white"/>
		</svg>
    `;

		this.nodes.holder.children[0].childNodes[0].innerHTML = checkButton;
	}

	revertIcon() {
		const copyButton = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 21H8V7H19V21ZM19 5H8C7.46957 5 6.96086 5.21071 6.58579 5.58579C6.21071 5.96086 6 6.46957 6 7V21C6 21.5304 6.21071 22.0391 6.58579 22.4142C6.96086 22.7893 7.46957 23 8 23H19C19.5304 23 20.0391 22.7893 20.4142 22.4142C20.7893 22.0391 21 21.5304 21 21V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5ZM16 1H4C3.46957 1 2.96086 1.21071 2.58579 1.58579C2.21071 1.96086 2 2.46957 2 3V17H4V3H16V1Z" fill="white"/>
      </svg>
    `;

		this.nodes.holder.children[0].childNodes[0].innerHTML = copyButton;
	}
}
