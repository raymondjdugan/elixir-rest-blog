import createView from "../createView.js";

export default function PostIndex(props) {
    let num = 0
    // language=HTML
    return `
        <header>
            <h1>Posts Page</h1>
        </header>
        <main>
            <div id="posts-container">
                ${props.posts.map(post =>
                        `    <div class="post-container">
           <h3>${post.title}</h3> 
           <p>${post.content}</p>
           <button data-id="${num}" class="edit-btn">Edit Post</button>
           <button data-id="${num++}" class="delete-btn">Delete Post</button>
           </div>
            `)
                        .join('')}
            </div>
            <form id="post-form">
                <label for="title">Title</label>
                <input id="title" name="title" type="text"/>
                <label for="content"></label>
                <textarea name="content" id="content" cols="30" rows="10"></textarea>
                <button id="create-btn" type="button">Create Post</button>
            </form>
            <form id="edit-form">
                <label for="edit-title">Title</label>
                <input id="edit-title" name="edit-title" type="text"/>
                <label for="edit-content"></label>
                <textarea name="edit-content" id="edit-content" cols="30" rows="10"></textarea>
                <button id="update-btn" type="button">Update Post</button>
            </form>
    `;
}

const createPost = _ => {
    $('#create-btn').click(function () {

        const newPost = {
            title: $('#title').val(),
            content: $('#content').val()
        }

        let postRequest = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newPost)
        }

        fetch("http://localhost:8081/api/posts", postRequest)
            .then(res => {
                console.log(res.status)
                createView("/posts")
            }).catch(error => {
            console.log(error);
            createView("/posts");
        });
    })
}

const editPost = _ => {
    let id = null;
    $(".edit-btn").click((e) => {
        $(".post-container").each((index, el) => {
            if (parseInt(e.target.getAttribute("data-id")) === index) {
                id = index;
                $("#edit-title").val($(el).children("h3").text())
                $("#edit-content").val($(el).children("p").text())
            }
        });
    });

    $("#update-btn").click(() => {
        const updatePost = {
            title: $("#edit-title").val(),
            content: $("#edit-content").val()
        }

        const editRequest = {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(updatePost)
        }

        fetch(`http://localhost:8081/api/posts/${id}`, editRequest)
            .then(res => {
                console.log(res.status)
                createView("/posts")
            }).catch(error => {
            console.log(error);
            createView("/posts");
        });
    });
}

const deletePost = _ => {
    $(".delete-btn").click((e) => {
        console.log(e.target.getAttribute("data-id"))
        $(".post-container").each((index, el) => {
            if (parseInt((e.target.getAttribute("data-id"))) === index) {
                fetch(`http://localhost:8081/api/posts/${index}`, {method: "DELETE"})
                    .then(res => {
                        console.log(res.status)
                        createView("/posts")
                    }).catch(error => {
                    console.log(error);
                    createView("/posts");
                });
            }
        })
    });
}

export function PostsEvent() {
    createPost();
    editPost();
    deletePost();
}
