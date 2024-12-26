import { MyLitElement } from './myLit.js';

class Counter extends MyLitElement {
    constructor() {
        super();
        this.state = { count: 0 };
        this.increment = this.increment.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();
    }


    disconnectedCallback() {
        const button = this.querySelector("#inc")
		if (button)
			button.removeEventListener("click", this.increment);
    }

    increment() {
        this.setState({ count: this.state.count + 1 });
    }

    attachEvents() {
		const button = this.querySelector("#inc")
		if (button)
			button.addEventListener("click", this.increment);
    }

    template() {
        return `
			<p>${this.state.count}</p>
            <button id="inc">increment</button>
        `;
    }
}

customElements.define('my-counter', Counter);

class User extends MyLitElement {
    constructor() {
        super();
        this.state = { users: [] };
        this.fetchUser = this.fetchUser.bind(this);
    }

    async fetchUser() {
        const res = await fetch("https://randomuser.me/api/");
        const data = await res.json();
		console.log(data.results[0].email);
        this.setState({ users: data.results });
    }

    attachEvents() {
        const button = this.querySelector("#fetch");
        if (button) {
            // button.removeEventListener("click", this.fetchUser);
            button.addEventListener("click", this.fetchUser);
        }
    }

    template() {
        return `
            <my-counter></my-counter>
            <br/>
            ${this.state.users.map(user => `<p>${user.email}</p>`).join('')}
            <button id="fetch">fetch</button>
        `;
    }
}

customElements.define('user-fetch', User);
