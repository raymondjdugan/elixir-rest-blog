import createView from "../createView.js";

export default function PostIndex(props) {
    // language=HTML
    return `
        <header class="text-center">
            <h1>Posts Page</h1>
        </header>
        <main class="d-flex mx-2 h-100">
            <div id="posts-container" class="d-flex flex-wrap justify-content-between mb-auto">
                ${props.posts.map(post =>
                        `<div class="post-container card mx-1 mb-2 text-dark" >
                            <h3 id="title-${post.id}" class="card-title">${post.title}</h3> 
                            <p id="content-${post.id}" class="card-body">${post.content}</p>
                           ${post.categories.forEach(category => category.name)}
                            <div class="card-footer d-flex justify-content-around">
                                <button data-id="${post.id}" class="edit-btn btn btn-sm btn-primary"">Edit Post</button>
                                <button data-id="${post.id}" class="del-btn btn btn-sm btn-primary"">Delete Post</button>
                            </div>
                        </div>
            `)
                        .join('')}
            </div>

            <form id="post-form" class="h-100 my-auto">
                <div class="text-center">
                    <h3>Create/Update Post</h3>
                    <label for="title" class="form-label"></label>
                    <input class="form-control" id="title" name="title" type="text" placeholder="Enter Title Here"/>
                    <label for="content" class="form-label"></label>
                    <textarea class="form-control" name="content" id="content" placeholder="Enter Content Here"></textarea>
                    <button class="btn btn-primary mt-2" id="clear-btn" type="button">Clear</button>
                    <button class="btn btn-primary mt-2" id="submit-btn" type="button">Submit</button>
                </div>
            </form>
        </main>
    `;
}

const createPost = _ => {
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
}

const editPost = id => {
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
        .then(_ => {
            createView("/posts")
        }).catch(_ => {
        createView("/posts");
    });
}

const deletePost = _ => {
    $(".del-btn").click((e) => {
        const index = parseInt((e.target.getAttribute("data-id")))
        fetch(`http://localhost:8081/api/posts/${index}`, {method: "DELETE"})
            .then(res => {
                createView("/posts")
            }).catch(error => {
            console.log(error);
            createView("/posts");
        });
    });
}

const submit = _ => {
    let id = null;
    $(".edit-btn").click((e) => {
        id = e.target.getAttribute("data-id")
        $("#title").val($(`#title-${id}`).html())
        $("#content").val($(`#content-${id}`).html())
    });
    $('#submit-btn').click(function () {
        if (id === null) {
            createPost()
        } else {
            editPost(id)
        }
    });
}

const clearForm = _ => {
    $("#clear-btn").click(_ => {
        $("#title").val("")
        $("#content").val("")
    })
}

export function PostsEvent() {
    submit();
    deletePost();
    clearForm();
}
