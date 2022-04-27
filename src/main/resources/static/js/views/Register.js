import CreateView from "../createView.js"

export default function Register(props) {
    //language=HTML
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Register</title>
        </head>
        <body>
        <header>
            <h1 class="text-center">Register</h1>
        </header>
        <main class="d-flex justify-content-center">
            <form class="d-flex flex-column w-25" id="register-form">
                <div class="text-center text-danger" id="register-error-message"></div>
                <label class="form-label" for="username">Username</label>
                <input class="form-control" id="username" name="username" type="text"/>
                <label class="form-label" for="email">Email</label>
                <input class="form-control" id="email" name="email" type="email">
                <label class="form-label" for="password">Password</label>
                <input class="form-control" id="password" name="password" type="password"/>
                <button class="btn btn-primary mt-2" id="register-btn" type="button">Register</button>
            </form>
        </main>
        </body>
        </html>
    `;
}

export function RegisterEvent() {
    $("#register-btn").click(function () {

        let newUser = {
            username: $("#username").val(),
            email: $("#email").val(),
            password: $("#password").val()
        }
        for (let value of Object.values(newUser)) {
            if (value === "") {
                $("#register-error-message").html("Please Fill Out All Fields.")
                return
            }
        }

        let request = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newUser)
        }

        fetch("http://localhost:8080/api/users/create", request)
            .then(response => {
                if (response.status === 500) {
                    $("#register-error-message").html("That email already exists.")
                    return
                }
                CreateView("/");
            })
    })
}
