import createView from "../createView.js";

export default function Logout() {
    localStorage.clear();
    createView("/")
}
