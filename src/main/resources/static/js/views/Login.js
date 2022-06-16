export default function Login(props) {
    //language=HTML
    return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8"/>
        <title>Log In</title>
    </head>
    <body>
    <header>
        <h1 class="text-center">Log In</h1>
    </header>
    <main class="d-flex justify-content-center">
        <form id="login-form" class="d-flex flex-column w-25">
            <div class="text-center text-danger" id="log-error-message"></div>
            <label class="form-label" for="username">Username</label>
            <input class="form-control" id="username" name="username" type="text"/>
            <label class="form-label" for="password">Password</label>
            <input class="form-control" id="password" name="password" type="password"/>
            <button class="mt-2 btn btn-primary" id="login-btn" type="button">Log In</button>
        </form>
    </main>
    </body>
    </html>`;
}

