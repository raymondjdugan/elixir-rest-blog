export default function Navbar(props) {
    //language=HTML
    return `
            <nav class="navbar navbar-light bg-dark">
                <ul class="nav nav-fill w-100">
                    <li class="nav-item">
                        <a href="/" data-link class="nav-link text-white">Home</a>
                    </li>
                    <li class="nav-item">
                        <a href="/posts" data-link class="nav-link text-white">Posts</a>
                    </li>
                    <li class="nav-item">
                        <a href="/about" data-link class="nav-link text-white">About</a>
                    </li>
                    <li class="nav-item">
                        <a href="/login" data-link class="nav-link text-white">Login</a>
                    </li>
                    <li class="nav-item">
                        <a href="/register" data-link class="nav-link text-white">Register</a>
                    </li>
                    <li class="nav-item">
                        <a href="/user" data-link class="nav-link text-white">User</a>
                    </li>
                </ul>
            </nav>
    `;
}
