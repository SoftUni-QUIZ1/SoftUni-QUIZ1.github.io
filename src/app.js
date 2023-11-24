import page from '../../node_modules/page/page.mjs';
import { render } from '../../node_modules/lit-html/lit-html.js'
import { userService } from './userService.js';
import { userHelper } from './userHelper.js';
import { loginView } from './views/loginView.js';
import { registerView } from './views/registerView.js';
import { browserView } from './views/quizBrowserView.js';
import { contestView } from './views/quizContestView.js';
import { detailsView } from './views/quizDetailsView.js';
import { editView } from './views/quizEditorView.js';
import { resultView } from './views/quizResultView.js';
import { homeView } from './views/homeView.js';
import { profileView } from './views/profileView.js';

const root = document.getElementById("content");
const userA = document.getElementById("user-nav");
const guestA = document.getElementById("guest-nav");

page(decorationContext);
page("/", homeView);
page("/login", loginView);
page("/register", registerView);
page("/logout", logout);
page("/browse", browserView);
page("/contest", contestView);
page("/details/:id", detailsView);
page("/create/:id", editView);
page("/profile/:id", profileView);
page("/result", resultView);


page.start();
updateNav();

async function logout() {
    debugger
    await userService.logout();
    updateNav();
    goTo("/")
}

function renderer(template) {
    render(template, root )
}
function updateNav () {
    const userData = userHelper.getUserData();
    if (userData) {
        userA.style.display = "inline";
        guestA.style.display = "none";
    } else {
        userA.style.display = "none";
        guestA.style.display = "inline";
    }
}

function goTo (path){
    page.redirect(path)
}

function decorationContext(ctx, next) {
    ctx.render = renderer;
    ctx.updateNav = updateNav;
    ctx.goTo = goTo;

    next();
}