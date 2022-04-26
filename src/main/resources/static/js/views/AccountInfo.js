import { getToken } from "../auth.js";
import createView from "../createView.js";

let userId = null;

export default function AccountInfo(props) {
    //language=HTML
    userId = props.users.id
    return `
        <header>
            <h1 class="text-center">Account Information</h1>
        </header>
        <main class="container w-50">
            <form class="mt-5">
                <div class="input-group mb-3">
                    <select class="form-select" id="find-by">
                        <option selected value="select-username">Username</option>
                        <option value="select-email">Email</option>
                    </select>

                    <label for="find-user" class="form-label"></label>
                    <input disabled class="form-control" id="find-user" name="find" type="text"/>

                    <button class="btn btn-dark" type="button" id="find">Find User</button>
                </div>
                <label for="username" class="form-label text-center w-100">Username</label>
                <input class="form-control" id="username" name="username" type="text" value="${props.users.username}"/>

                <label for="email" class="form-label text-center w-100">Email</label>
                <input class="form-control" id="email" name="email" type="text" value="${props.users.email}"/>

                <fieldset>
                    <label for="role" class="form-label text-center w-100">Current Role</label>
                    <input disabled class="form-control" id="role" name="role" type="text" value="${props.users.role}"/>

                    <label for="createdAt" class="form-label text-center w-100">Date Created</label>
                    <input disabled class="form-control" id="createdAt" name="createdAt" type="text" value="${props.users.createdAt}"/>
                </fieldset>

                <button class="btn btn-dark mt-2" id="update-info">Update Information</button>
            </form>
            <h2 class="mt-3 text-center">Upate Your Password</h2>
            <form class="mt-2">
                <label for="current-password" class="form-label text-center w-100">Current Password</label>
                <input class="form-control" id="current-password" name="current-password" type="text"/>

                <label for="new-password" class="form-label text-center w-100">New Password</label>
                <input class="form-control" id="new-password" name="new-password" type="text"/>

                <button class="btn btn-dark mt-2" id="change-pwd">Update Password</button>
            </form>
        </main>
    `
}

const getUserRole = _ => {
    const token = localStorage.getItem(("access_token"))
    const user = JSON.parse(atob(token.split(".")[1]))
    const [role] = user.authorities;
    if (role === "ADMIN") {
        $("#find-user").removeAttr("disabled")
        $("#role").removeAttr("disabled")
    }
}

const findUser = () => {
    $("#find").click(() => {
        const selectedOption = $("#find-by").val()
        let findby = null;
        let findUser = $("#find-user").val()
        if (selectedOption === "select-username") {
            findby = "username"
        } else if (selectedOption === "select-email") {
            findby = "email"
        } else {
            alert("Please select either email or usernmae from dropdown menu")
            return;
        }

        fetch(`http://localhost:8080/api/users/${findby}?${findby}=${findUser}`)
            .then(results => results.json())
            .then(user => {
                $("#username").val(user.username)
                $("#email").val(user.email)
                $("#createdAt").val(user.createdAt)
                $("#role").val(user.role?.toLowerCase())

                userId = user.id;
            })
    })
}

const updateUser = _ => {
    $("#update-info").click(_ => {
        const updateInfo = {
            username: $("#username").val(),
            email: $("#email").val(),
            role: $("#role").val().toUpperCase()
        }

        let userUpdateRequest = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: getToken()
            },
            body: JSON.stringify(updateInfo)
        }

        fetch(`http://localhost:8080/api/users/${userId}`, userUpdateRequest)
            .then(createView("/accountInfo"))
    })
}

const updatePassword = _ => {
    $("#change-pwd").click(e => {
        const curPass = $("#current-password").val()
        const newPass = $("#new-password").val()
        let updatePasswordRequest = {
            method: "PUT",
            headers: {Authorization: getToken()}
        }
        fetch(`http://localhost:8080/api/users/${userId}/updatePassword?currentPassword=${curPass}&newPassword=${newPass}`, updatePasswordRequest)
            .then(_ => {
                localStorage.clear();
                createView("/")
            })
    })
}

export function AccountInfoEvents() {
    findUser();
    updateUser();
    updatePassword();
    getUserRole();
}
