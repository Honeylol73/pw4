export class MainPage {
	constructor(page) {
		this.page = page;
		this.signupButton = page.getByRole('link', { name: 'Sign up' });
		this.loginButton = page.getByRole('link', { name: 'Login' });
	}

	async open() {
		// todo урл унести в конфиги
		await this.page.goto('https://realworld.qa.guru/');
	}

	async gotoSignUp() {
		await this.signupButton.click();
	}
	async gotoLogin() {
		await this.loginButton.click();
	}
}
