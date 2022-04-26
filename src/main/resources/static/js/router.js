import Home from "./views/Home.js";
import PostIndex, { PostsEvent } from "./views/PostIndex.js";
import About from "./views/About.js";
import Error404 from "./views/Error404.js";
import Loading from "./views/Loading.js";
import Login from "./views/Login.js";
import Logout from "./views/Logout.js";
import LoginEvent from "./auth.js";
import Register, { RegisterEvent } from "./views/Register.js"
import AccountInfo, { AccountInfoEvents }  from "./views/AccountInfo.js"
import UserPosts, { UserPostsEvent } from "./views/UserPosts.js";

/**
 * Returns the route object for a specific route based on the given URI
 * @param URI
 * @returns {*}
 */
export default function router(URI) {
    const routes = {
        '/': {
            returnView: Home,
            state: {},
            uri: '/',
            title: 'Home',
        },
        '/login': {
            returnView: Login,
            state: {},
            uri: '/login',
            title: "Login",
            viewEvent: LoginEvent
        },
        '/logout': {
            returnView: Home,
            state: {},
            uri: '/logout',
            title: "logout",
            viewEvent: Logout
        },
        '/register': {
            returnView: Register,
            state: {},
            uri: '/register',
            title: 'Register',
            viewEvent: RegisterEvent
        },
        '/posts': {
            returnView: PostIndex,
            state: {
                posts: '/api/posts'
            },
            uri: '/posts',
            title: 'All Posts',
            viewEvent: PostsEvent
        },
        '/userPosts': {
            returnView: UserPosts,
            state: {},
            uri: '/userPosts',
            title: 'My Posts',
            viewEvent: UserPostsEvent
        },
        '/about': {
            returnView: About,
            state: {},
            uri: '/about',
            title: 'About',
        },
        '/error': {
            returnView: Error404,
            state: {},
            uri: location.pathname,
            title: ' ERROR',
        },
        '/loading': {
            returnView: Loading,
            state: {},
            uri: location.pathname,
            title: 'Loading...',
        },
        '/accountInfo': {
            returnView: AccountInfo,
            state: {},
            uri: "users/currentUser",
            title: 'AccountInfo',
            viewEvent: AccountInfoEvents
        }
    };

    return routes[URI];
}

