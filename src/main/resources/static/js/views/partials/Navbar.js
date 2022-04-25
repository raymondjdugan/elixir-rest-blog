import {isLoggedIn} from "../../auth.js";

export default function Navbar(props) {
    const loggedIn = isLoggedIn();

    let html = `
        <nav class="navbar navbar-light bg-dark">
            <a class="navbar-brand text-white mx-2" href="/">Sir Bloggify</a>
            <ul class="nav">
                <li class="nav-item">
                    <a href="/" data-link class="nav-link text-white">Home</a>
                </li>
                <li class="nav-item">
                    <a href="/posts" data-link class="nav-link text-white">Posts</a>
                </li>
                <li class="nav-item">
                    <a href="/about" data-link class="nav-link text-white">About</a>
                </li>
    `
    if (!loggedIn) {
        //language=html
        html += `
            <li class="nav-item">
                <a href="/login" data-link class="nav-link text-white">Login</a>
            </li>
            <li class="nav-item">
                <a href="/register" data-link class="nav-link text-white">Register</a>
            </li>`
    } else {
        //language=html
        html += `
            <li class="nav-item">
                <a href="/logout" data-link class="nav-link text-white">Logout</a>
            </li>
            <li class="nav-item">
                <a href="/userPosts" data-link class="nav-link text-white">My Posts</a>
            </li>
            <li class="nav-item">
                <a href="/AccountInfo" data-link class="nav-link text-white">Account Information</a>
            </li>`
    }
    //language=HTML
    html += `
        </ul>
        </nav>`
    return html;
}
