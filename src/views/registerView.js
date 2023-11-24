import {html} from '../../lit-html/lit-html.js';
import { userService } from "../userService.js";

const registerTemp = ()=> {
    return html `
        <section id="register">
            <div class="pad-large">
                <div class="glass narrow">
                    <header class="tab layout">
                        <a class="tab-item" href="/login">Login</a>
                        <h1 class="tab-item active">Register</h1>
                    </header>
                    <form class="pad-med centered" @submit=${onSubmit}>
                        <label class="block centered">Username: <input class="auth-input input" type="text"
                                name="username" /></label>
                        <label class="block centered">Email: <input class="auth-input input" type="text"
                                name="email" /></label>
                        <label class="block centered">Password: <input class="auth-input input" type="password"
                                name="password" /></label>
                        <label class="block centered">Repeat: <input class="auth-input input" type="password"
                                name="repass" /></label>
                        <input class="block action cta" type="submit" value="Create Account" />
                    </form>
                    <footer class="tab-footer">
                        Already have an account? <a class="invert" href="#">Sign in here</a>.
                    </footer>
                </div>
            </div>
        </section>
    `
}

let context = null;
export function registerView(ctx) {
    ctx.render(registerTemp());
    context = ctx;
}

async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const {username, email, password, repass} = Object.fromEntries(formData);

    if (!username || !email || !password || password !== repass) {
        return window.alert("error");
    }

    await userService.register(username, email, password);
    context.updateNav();
    context.goTo("/");

} 