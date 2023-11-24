import {html} from '../../lit-html/lit-html.js';
import { userService } from "../userService.js";

const loginTemp = ()=> {
    return html `
        <section id="login">
            <div class="pad-large">
                <div class="glass narrow">
                    <header class="tab layout">
                        <h1 class="tab-item active">Login</h1>
                        <a class="tab-item" href="/register">Register</a>
                    </header>
                    <form @submit=${onSubmit} class="pad-med centered">
                        <label class="block centered">Email: <input class="auth-input input" type="text"
                                name="email" /></label>
                        <label class="block centered">Password: <input class="auth-input input" type="password"
                                name="password" /></label>
                        <input class="block action cta" type="submit" value="Sign In" />
                    </form>
                    <footer class="tab-footer">
                        Don't have an account? <a class="invert" href="#">Create one here</a>.
                    </footer>
                </div>
            </div>
        </section>
    `
}

let context = null;
export function loginView(ctx) {
    ctx.render(loginTemp());
    context = ctx;
}

async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const {email, password} = Object.fromEntries(formData);

    if (!email || !password) {
        return window.alert("Error")
    }

    await userService.login(email, password);
    context.updateNav();
    context.goTo("/")
}