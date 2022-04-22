import createView from "../createView.js";

const BASE = "http://localhost:8080/api/posts"

export default function PostIndex(props) {
    // language=HTML
    return `
        <header class="d-flex justify-content-end">
            <form class="w-25 my-3 mr-2">
                <select class="form-select category-select" id="search-by-category">
                    <option value="" disabled selected>Select Category To Search By</option>
                </select>
            </form>
        </header>
        <main class="d-flex mx-2 h-100 justify-content-center">
            <div id="posts-container" class="d-flex flex-column justify-content-between mb-auto w-50">
                ${getPosts(props)}
            </div>
            <form id="post-form" class="h-100 w-50 hidden">
                <div class="text-center">
                    <h3>Create/Update Post</h3>
                    <label for="title" class="form-label"></label>
                    <input class="form-control" id="title" name="title" type="text" placeholder="Enter Title Here"/>
                    <label for="content" class="form-label"></label>
                    <textarea class="form-control" name="content" id="content" placeholder="Enter Content Here"></textarea>
                    <select class="form-select category-select" multiple id="category-select">
                    </select>
                    <button class="btn btn-primary mt-2" id="clear-btn" type="button">Clear</button>
                    <button class="btn btn-primary mt-2" id="submit-btn" type="button">Submit</button>
                </div>
            </form>
        </main>
    `;
}

const loggedIn = "Ray"

const showForm = () => {
    if (loggedIn != null) {
        $("#post-form").removeClass("hidden");
        $(".edit-btn").removeClass("hidden");
        $(".del-btn").removeClass("hidden");
    }
}

const getCategories = (categoriesArray) => {
    let html = "<div>"
    categoriesArray.forEach(category => html += `<span>${category.name}</span>`)
    html += "</div>"
    return html;
}

const getPosts = (props) => {
    //language=HTML
    return props.posts.map(post =>
        `
            <div class="post-container card mx-1 mb-2 text-dark bg-transparent border-0">
                <h3 id="title-${post.id}" class="card-title">${post.title}</h3>
                <p id="content-${post.id}" class="card-body">${post.content}</p>
                <div class="d-flex justify-content-end">${getCategories(post.categories)}</div>
                <div class="card-footer d-flex justify-content-between bg-transparent mb-5">
                    <div>
                        <button data-id="${post.id}" class="edit-btn btn btn-sm btn-primary hidden"
                        ">Edit Post</button>
                        <button data-id="${post.id}" class="del-btn btn btn-sm btn-primary hidden"
                        ">Delete Post</button>
                    </div>
                    <div>
                        <p>${getUsername(post.author)}</p>
                    </div>
                </div>
            </div>
        `).join('')
}

const getFormCategories = _ => {
    fetch("http://localhost:8080/api/categories", {method: 'GET'})
        .then(results => results.json())
        .then(r => {
            r.forEach(cat => {
                //language=HTML
                let html = `
                    <option value="${cat.name}">${cat.name}</option>
                `
                $(".category-select").append(html)
            })
        })
}

const getUsername = (user) => {
    return user === null ? "Author Not Found" : user.username;
}

const createPost = _ => {
    let categories = $("#category-select").val();
    const newPost = {
        title: $('#title').val(),
        content: $('#content').val()
    }

    let postRequest = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newPost)
    }

    fetch(`http://localhost:8080/api/posts?username=${loggedIn}&categories=${categories}`, postRequest)
        .then(res => {
            console.log(res.status)
            createView("/posts")
        }).catch(error => {
        console.log(error);
        createView("/posts");
    });
}

const editPost = id => {
    let categories = $("#category-select").val();
    const updatePost = {
        title: $("#title").val(),
        content: $("#content").val()
    }

    const editRequest = {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(updatePost)
    }

    fetch(`http://localhost:8080/api/posts/${id}?categories=${categories}`, editRequest)
        .then(_ => {
            createView("/posts")
        }).catch(_ => {
        createView("/posts");
    });
}

const deletePost = _ => {
    $(".del-btn").click((e) => {
        const index = parseInt((e.target.getAttribute("data-id")))
        fetch(`http://localhost:8080/api/posts/${index}`, {method: "DELETE"})
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
        id === null ? createPost() : editPost(id)
    });
}

const clearForm = _ => {
    $("#clear-btn").click(_ => {
        $("#title").val("")
        $("#content").val("")
    })
}

const searchByCategory = _ => {
    $("#search-by-category").change(() => {
        const category = $("#search-by-category").val()
        fetch(`${BASE}/searchByCategory?category=${category}`)
            .then(results => results.json())
            .then(posts => {
                PostIndex(posts)
                createView("/posts")
            })
    })
}
$("#post-form").scroll(function () {
    $(this).scroll({top: window.scrollY})
})


export function PostsEvent() {
    submit();
    deletePost();
    clearForm();
    getFormCategories();
    showForm();
    searchByCategory();
}
