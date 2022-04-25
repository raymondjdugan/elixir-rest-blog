import { getToken } from "../auth.js";

export default function AccountInfo() {
    //language=HTML
    return `
        <header>
            <h1 class="text-center">User Information</h1>
        </header>
        <main class="container w-50">
            <form class="mt-5">
                <div class="input-group mb-3">
                    <select class="form-select" id="find-by">
                        <option selected value="select-username">Username</option>
                        <option value="select-email">Email</option>
                    </select>

                    <label for="find-user" class="form-label"></label>
                    <input class="form-control" id="find-user" name="find" type="text"/>

                    <button class="btn btn-dark" type="button" id="find">Find User</button>
                </div>
                <label for="username" class="form-label text-center w-100">Username</label>
                <input class="form-control" id="username" name="username" type="text"/>

                <label for="email" class="form-label text-center w-100">Email</label>
                <input class="form-control" id="email" name="email" type="text"/>

                <fieldset disabled>
                    <label for="role" class="form-label text-center w-100">Current Role</label>
                    <input class="form-control" id="role" name="role" type="text"/>

                    <label for="createdAt" class="form-label text-center w-100">Date Created</label>
                    <input class="form-control" id="createdAt" name="createdAt" type="text"/>
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
let userId = null;

const getCurrentUser = _ => {
    fetch(`http://localhost:8080/api/users/currentUser`, {headers: {Authorization: getToken()}})
        .then(results => results.json())
        .then(user => {
            console.log(user)
            $("#username").val(user.username)
            $("#email").val(user.email)
            $("#createdAt").val(user.createdAt)
            $("#role").val(user.role?.toLowerCase())

            userId = user.id;
        })
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
                console.log(user)
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
        }

        let userUpdateRequest = {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(updateInfo)
        }

        fetch(`http://localhost:8080/api/users/${userId}`, userUpdateRequest)
            .then(res => console.log(res))
    })
}



export function AccountInfoEvents() {
    findUser();
    updateUser();
    getCurrentUser()
}
