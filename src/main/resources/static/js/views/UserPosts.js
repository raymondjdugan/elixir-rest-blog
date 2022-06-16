import createView from "../createView.js";
import {getToken, getHeaders} from "../auth.js";
import {getAuthor, getPostCategories, showFormCategories} from "../postFunctions.js";
import fetchData from "../fetchData.js";

export default function UserPosts(props) {
    // language=HTML
    return `
        <div class="d-flex mx-2 h-100">
            <div>
                <button type="button"></button>
            </div>
            <div id="posts-container" class="d-flex flex-column justify-content-between mb-auto w-50">
                ${showUserPosts(props.posts, props.categories)}
            </div>
            <form id="post-form" class="h-100 w-50">
                <div id="form-scroll" class="text-center">
                    <h3>Create/Update Post</h3>
                    <label for="title" class="form-label"></label>
                    <input class="form-control" id="title" name="title" type="text" placeholder="Enter Title Here"/>

                    <div class="d-flex">
                        <textarea class="form-control w-75" name="content" id="content" placeholder="Enter Content Here"></textarea>

                        <select class="form-select w-25" multiple id="category-select">
                            ${showFormCategories(props.categories)}
                        </select>
                    </div>

                    <button class="btn btn-primary mt-2" id="clear-btn" type="button">Clear</button>
                    <button class="btn btn-primary mt-2" id="submit-btn" type="button">Submit</button>
                </div>
            </form>
        </div>
    `;
}
const showUserPosts = (posts, categories) => {
    //language=HTML
    return posts.map(post =>
        `
            <div data-id="${post.id}" class="post-container card mx-1 mb-2 text-dark bg-transparent border-0">
                <div class="post">
                    <h3 id="title-${post.id}" class="card-title">${post.title}</h3>
                    <p id="content-${post.id}" class="card-body">${post.content}</p>
                    <div class="d-flex justify-content-end">${getPostCategories(post.categories)}</div>
                </div>
                <div data-id="${post.id}" class="edit-form hidden">
                    <label for="title" class="form-label"></label>
                    <input class="form-control" id="title" name="title" type="text" placeholder="Post Title" value="${post.title}"/>
                    <div class="d-flex">
                        <textarea class="form-control w-75" name="content" id="content" placeholder="Content">${post.content}</textarea>

                        <select class="form-select w-25" multiple id="category-select">
                            ${showFormCategories(categories)}
                        </select>
                    </div>
                </div>
                <div class="card-footer d-flex justify-content-between bg-transparent mb-5">
                    <div>
                        <button type="button" data-id="${post.id}" class="edit-btn btn btn-sm btn-primary"
                        ">Edit Post</button>
                        <button type="button" data-id="${post.id}" class="del-btn btn btn-sm btn-primary"
                        ">Delete Post</button>
                        <button type="button" data-id="${post.id}" class="save-btn btn btn-sm btn-primary hidden"
                        ">Save Post</button>
                        <button type="button" data-id="${post.id}" class="cancel-edit-btn btn btn-sm btn-primary hidden"
                        ">Cancel</button>
                    </div>
                    <div>
                        <p>${getAuthor(post.author)}</p>
                    </div>
                </div>
            </div>
        `).join('')
}
const editPost = _ => {
    $(".post-container").click(function (e) {
        if (e.target.classList.contains("edit-btn")) {
            $(".edit-form",this).removeClass('hidden');
            $(".save-btn",this).removeClass('hidden');
            $(".cancel-edit-btn",this).removeClass('hidden');
            $(".post",this).addClass('hidden');
            $(".edit-btn",this).addClass('hidden');
            $(".del-btn",this).addClass('hidden');
        } else if (e.target.classList.contains("cancel-edit-btn")) {
            $(".edit-form",this).addClass('hidden');
            $(".save-btn",this).addClass('hidden');
            $(".cancel-edit-btn",this).addClass('hidden');
            $(".post",this).removeClass('hidden');
            $(".edit-btn",this).removeClass('hidden');
            $(".del-btn",this).removeClass('hidden');
        }
    });
}

const edit = _ => {

//     $('#submit-btn').click(function () {
//         id === null ? createPost() : editPost(id)
//     });
}

const createPost = _ => {
    let categories = $("#category-select").val();
    const newPost = {
        title: $('#title').val(),
        content: $('#content').val()
    }

    let postRequest = {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(newPost)
    }
    fetchData({server: `/api/posts?categories=${categories}`}, postRequest)
        .then(res => {
            console.log(res.status)
            createView("/userPosts")
        })
}

const savePost = _ => {
    let categories = $("#category-select").val();
    const updatePost = {
        title: $("#title").val(),
        content: $("#content").val()
    }

    const editRequest = {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(updatePost)
    }
    fetchData({server: `/api/posts/${id}?categories=${categories}`}, editRequest)
        .then(_ => {
            createView("/userPosts")
        })
}

const deletePost = _ => {
    $("main").click((e) => {
        let deleteRequest = {
            method: "DELETE",
            headers: getHeaders()
        }
        if (e.target.classList.contains("del-btn")) {
            const index = parseInt((e.target.getAttribute("data-id")))
            fetchData({server: `/api/posts/${index}`}, deleteRequest)
                .then(_ => {
                    createView("/userPosts")
                })
        }
    });
}

const clearForm = _ => {
    $("#clear-btn").click(_ => {
        $("#title").val("")
        $("#content").val("")
    })
}

const setScroll = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}

export function UserPostsEvent() {
    // submit();
    editPost();
    deletePost();
    clearForm();
}
