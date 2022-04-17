import createView from "../createView.js";

export default function PostIndex(props) {
    // language=HTML
    return `
        <header class="text-center">
            <h1>Posts Page</h1>
        </header>
        <main class="d-flex mx-2">
            <div id="posts-container" class="d-flex flex-wrap justify-content-between mb-auto">
                ${props.posts.map(post =>
                        `<div class="post-container card mx-1 mb-2">
                            <h3 class="card-title">${post.title}</h3> 
                            <p class="card-body">${post.content}</p>
                            <div class="card-footer d-flex justify-content-around">
                                <button data-edit-btn-pos="${post.id}" class="edit-btn btn btn-sm btn-primary"">Edit Post</button>
                                <button data-del-btn-pos="${post.id}" class="del-btn btn btn-sm btn-primary"">Delete Post</button>
                            </div>
                        </div>
            `)
                        .join('')}
            </div>

            <form id="post-form" class="">
                <div class="text-center">
                    <h3>Create/Update Post</h3>
                    <label for="title" class="form-label"></label>
                    <input class="form-control" id="title" name="title" type="text" placeholder="Title"/>
                    <label for="content" class="form-label"></label>
                    <textarea class="form-control" name="content" id="content" placeholder="Blog Content"></textarea>
                    <button class="btn btn-primary mt-2" id="create-btn" type="button">Create Post</button>
                    <button class="btn btn-primary mt-2" id="update-btn" type="button">Update Post</button>
                </div>
            </form>
        </main>
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
            if (parseInt(e.target.getAttribute("data-edit-btn-pos")) === (index + 1)) {
                id = index;
                $("#title").val($(el).children("h3").text())
                $("#content").val($(el).children("p").text())
            }
        });
    });

    $("#update-btn").click(() => {
        const updatePost = {
            title: $("#title").val(),
            content: $("#content").val()
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
    $(".del-btn").click((e) => {
        const index = parseInt((e.target.getAttribute("data-del-btn-pos")))
        fetch(`http://localhost:8081/api/posts/${index}`, {method: "DELETE"})
            .then(res => {
                console.log(res.status)
                createView("/posts")
            }).catch(error => {
            console.log(error);
            createView("/posts");
        });
    });
}

export function PostsEvent() {
    createPost();
    editPost();
    deletePost();
}
