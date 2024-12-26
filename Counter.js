import { MyLitElement } from './myLit.js';

export class Counter extends MyLitElement {
    constructor() {
        super();
        this.state = { count: 0 };
        this.increment = this.increment.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();
    }


    disconnectedCallback() {
        const button = this.shadowRoot.querySelector("#inc")
		if (button)
			button.removeEventListener("click", this.increment);
    }

    increment() {
        this.setState({ count: this.state.count + 1 });
    }

    attachEvents() {
		const button = this.shadowRoot.querySelector("#inc")
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


export class User extends MyLitElement {
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
        const button = this.shadowRoot.querySelector("#fetch");
        if (button) {
            // button.removeEventListener("click", this.fetchUser);
            button.addEventListener("click", this.fetchUser);
        }
    }
	disconnectedCallback() {
		const button = this.shadowRoot.querySelector("#fetch");
		if (button)
			button.removeEventListener("click",  this.fetchUser);
    }


    template() {
        return `
			<div class="flex justify-center items-center" >
				<my-counter></my-counter>
				<br/>
				${this.state.users.map(user => `<p>${user.email}</p>`).join('')}
				<button id="fetch">fetch</button>
			</div>
        `;
    }
}

