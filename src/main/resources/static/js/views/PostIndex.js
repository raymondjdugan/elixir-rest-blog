import createView from "../createView";

export default function PostIndex(props) {
    return `
        <header>
            <h1>Posts Page</h1>
        </header>
        <main>
            <div id="posts-container">
                ${props.posts.map(post => `<h3>${post.title}</h3><p>${post.content}</p>`).join('')}   
            </div>
            <form id="create-form">
                    <label for="title">Title</label>
                    <input id="title" name="title" type="text"/>
                    <label for="content"></label>
                    <textarea name="content" id="content" cols="30" rows="10"></textarea>
                    <button id="create-btn" type="button">Register</button>
                </form>
    `;
}

export function PostsEvent() {
    $('#create-btn').click(() => {

        const newPost = {
            title: $('#title').val(),
            content: $('#content').val()
        }

        let request = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newPost)
        }

        fetch("http://localhost:8080/api/users", request)
            .then(res => {
                console.log(res.status)
                createView("/posts")
            })
            .then(error => {
                console.log(error)
                createView("/posts")
            })
    })
}
