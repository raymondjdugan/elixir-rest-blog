import createView from "../createView.js";
import {getHeaders} from "../auth.js";
import { getAuthor, getPostCategories, showFormCategories } from "../postFunctions.js";
import fetchData from "../fetchData.js";

export default function UserPosts(props) {
    // language=HTML
    return `
        <div id="pageContainer" class="d-flex flex-column align-items-center mx-2 h-100 position-relative">
            <div class="w-50">
                <button type="button" id="create-form" class="btn btn-primary mt-2 position-absolute top-0 end-0 mt-2">Create New Post</button>
                <form id="post-form" class="hidden w-100">
                    <div id="form-scroll" class="text-center">
                        <label for="title" class="form-label"></label>
                        <input class="form-control" id="title" name="title" type="text" placeholder="Enter Title Here"/>
                        <div class="d-flex">
                            <textarea class="form-control w-75" name="content" id="content" placeholder="Enter Content Here"></textarea>
                            <select class="form-select w-25" multiple id="category-select">
                                ${showFormCategories(props.categories)}
                            </select>
                        </div>
                        <button class="btn btn-primary mt-2" id="clear-form-btn" type="button">Clear Form</button>
                        <button class="btn btn-primary mt-2" id="create-post-btn" type="button">Create Post</button>
                    </div>
                </form>
            </div>
            <div id="posts-container" class="d-flex flex-column justify-content-between mb-auto w-50">
                ${showUserPosts(props.posts, props.categories)}
            </div>
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
                    <label for="edit-title" class="form-label"></label>
                    <input class="form-control" id="edit-title" name="edit-title" type="text" placeholder="Post Title" value="${post.title}"/>
                    <div class="d-flex">
                        <textarea class="form-control w-75" name="content" id="edit-content" placeholder="Content">${post.content}</textarea>

                        <select class="form-select w-25" multiple id="edit-category-select">
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
            $(".edit-form", this).removeClass('hidden');
            $(".save-btn", this).removeClass('hidden');
            $(".cancel-edit-btn", this).removeClass('hidden');
            $(".post", this).addClass('hidden');
            $(".edit-btn", this).addClass('hidden');
            $(".del-btn", this).addClass('hidden');
        } else if (e.target.classList.contains("cancel-edit-btn")) {
            $(".edit-form", this).addClass('hidden');
            $(".save-btn", this).addClass('hidden');
            $(".cancel-edit-btn", this).addClass('hidden');
            $(".post", this).removeClass('hidden');
            $(".edit-btn", this).removeClass('hidden');
            $(".del-btn", this).removeClass('hidden');
        }
    });
}

const showCreateForm = _ => {
    const $postForm = $("#post-form");
    $('#create-form').click(function () {
        if ($postForm.css('display') === "none") {
            $postForm.fadeIn('slow')
        } else {
            $postForm.fadeOut('slow')
        }
    })
}

const createPost = _ => {
    $("#create-post-btn").click(function () {

        const newPost = {
            title: $('#title').val(),
            content: $('#content').val(),
            categories: $("#category-select").val()
        }

        let postRequest = {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(newPost)
        }
        fetchData({server: `/api/posts`}, postRequest)
            .then(res => {
                console.log(res.status)
                createView("/userPosts")
            })
    })
}

const savePost = _ => {
    $(".post-container").click(function (e) {
        if (e.target.classList.contains("save-btn")) {
            const postToUpdate = $(this).data("id");
            console.log(postToUpdate)
            const updatePost = {
                title: $("#edit-title", this).val(),
                content: $("#edit-content", this).val(),
                categories: $("#edit-category-select", this).val()
            }
            console.log(updatePost)

            const editRequest = {
                method: "PUT",
                headers: getHeaders(),
                body: JSON.stringify(updatePost)
            }
            fetchData({server: `/api/posts/${postToUpdate}`}, editRequest)
                .then(_ => {
                    createView("/userPosts")
                })
        }
    })
}

const deletePost = _ => {
    $(".del-btn").click(function () {
        console.log($(this))
        let deleteRequest = {
            method: "DELETE",
            headers: getHeaders()
        }
        const postToDelete = $(this).data("id")
        fetchData({server: `/api/posts/${postToDelete}`}, deleteRequest)
            .then(_ => {
                createView("/userPosts")
            })
    });
}

const clearForm = _ => {
    $("#clear-btn").click(_ => {
        $("#title").val("")
        $("#content").val("")
    })
}

export function UserPostsEvent() {
    showCreateForm();
    createPost();
    editPost();
    savePost();
    deletePost();
    clearForm();
}
