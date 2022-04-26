import { getAuthor, getFormCategories, getPostCategories} from "../postFunctions.js";
import createView from "../createView.js";


export default function PostIndex(props) {
    // language=HTML
    return `
        <header class="d-flex justify-content-end">
            <form class="w-25 my-3 mr-2">
                <select class="form-select category-select" id="search-by-category">
                    <option value="" disabled selected>Select Category To Search By</option>
                    <option value="All" >All Posts</option>
                </select>
            </form>
        </header>
        <main class="d-flex mx-2 h-100 justify-content-center">
            <div id="posts-container" class="d-flex flex-column justify-content-between mb-auto w-50">
                ${getPosts(props.posts)}
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

export function getPosts(posts) {
    //language=HTML
    return posts.map(post =>
        `
            <div class="post-container card mx-1 mb-2 text-dark bg-transparent border-0">
                <h3 id="title-${post.id}" class="card-title">${post.title}</h3>
                <p id="content-${post.id}" class="card-body">${post.content}</p>
                <div class="d-flex justify-content-end">${getPostCategories(post.categories)}</div>
                <div class="card-footer d-flex justify-content-between bg-transparent mb-5">
                    <div>
                        <p>${getAuthor(post.author)}</p>
                    </div>
                </div>
            </div>
        `).join('')
}

const searchByCategory = _ =>{
    $("#search-by-category").change(() => {
        const category = $("#search-by-category").val()
        if (category === 'All') {
            createView("/posts")
        } else {
            fetch(`http://localhost:8080/api/posts/searchByCategory?category=${category}`)
                .then(results => results.json())
                .then(posts => {
                    $("#posts-container").html(`${getPosts(posts)}`)
                })
        }
    })
}

export function PostsEvent() {
    searchByCategory();
    getFormCategories();
}
