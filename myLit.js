export class 	MyLitElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.attachEvents();
    }

    setState(state) {
        this.state = { ...this.state, ...state };
        this.render();
        this.attachEvents();
    }

    render() {
        const template = document.createElement('template');
		
        template.innerHTML = `
			<link rel="stylesheet" href="./styles/output.css">
			${this.template()}`
        const newContent = template.content.cloneNode(true);

        this.reconcile(this.shadowRoot, newContent);
    }

    reconcile(oldNode, newNode) {
        const oldChildren = Array.from(oldNode.childNodes);
        const newChildren = Array.from(newNode.childNodes);

        const maxLength = Math.max(oldChildren.length, newChildren.length);

        for (let i = 0; i < maxLength; i++) {
            const oldChild = oldChildren[i];
            const newChild = newChildren[i];

            if (!oldChild) {
                oldNode.appendChild(newChild);
            } else if (!newChild) {
                oldNode.removeChild(oldChild);
            } else if (this.isDifferentNode(oldChild, newChild)) {
                oldNode.replaceChild(newChild, oldChild);
            } else if (oldChild.nodeType === Node.ELEMENT_NODE) {
                this.reconcile(oldChild, newChild);
            }
        }
    }

    isDifferentNode(oldNode, newNode) {
        return (
            oldNode.nodeType !== newNode.nodeType ||
            (oldNode.nodeType === Node.ELEMENT_NODE && oldNode.tagName !== newNode.tagName) ||
            (oldNode.nodeType === Node.TEXT_NODE && oldNode.textContent !== newNode.textContent)
        );
    }

    attachEvents() {
        // To be overridden by child classes
    }

    template() {
        return '';
    }
}
