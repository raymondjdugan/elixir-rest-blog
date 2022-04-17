export default function User() {
    //language=HTML
    return `
        <header>
            <h1 class="text-center">User</h1>
        </header>
        <main class="container w-50">
            <form>
                <div class="input-group mb-3">
                    <select class="form-select">
                        <option selected value="select-username">Username</option>
                        <option value="select-email">Email</option>
                    </select>
                    <label for="find" class="form-label"></label>
                    <input class="form-control" id="find" name="find" type="text"/>
                    <button class="btn btn-primary" type="button" id="find-user">Find User</button>
                </div>
                <label for="username" class="form-label"></label>
                <input class="form-control" id="username" name="username" type="text"/>
                <label for="email" class="form-label"></label>
                <input class="form-control" id="email" name="email" type="text"/>
                <label for="password" class="form-label"></label>
                <input class="form-control" id="password" name="password" type="password"/>
                <label for="role" class="form-label"></label>
                <input class="form-control" id="role" name="role" type="text"/>
                <label for="createdAt" class="form-label"></label>
                <input class="form-control" id="createdAt" name="createdAt" type="text"/>
            </form>
        </main>
    `
}

const findUser = () => {
    $("#find-user").click(() => {
        const findby = $("#find").val();
        fetch(`http://localhost:8081/api/users/${findby}`)
            .then(results => results.json())
            .then(user => console.log(user))
    })
}

export function UserEvent() {
    findUser();
}
