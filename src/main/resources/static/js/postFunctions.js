import createView from "./createView.js";
import {isLoggedIn} from "./auth";

const insertButtons = _ => {
    if (isLoggedIn()) {
        //language=HTML
        return `
            <div>
                <button data-id="${post.id}" class="edit-btn btn btn-sm btn-primary hidden"
                ">Edit Post</button>
                <button data-id="${post.id}" class="del-btn btn btn-sm btn-primary hidden"
                ">Delete Post</button>
            </div>`
    }
}

export function getAuthor(author)  {
    return author === null ? "Author Not Found" : author.username;
}

export function getPostCategories(categoriesArray) {
    let html = "<div>"
    categoriesArray.forEach(category => html += `<span>${category.name}</span>`)
    html += "</div>"
    return html;
}

export function searchByCategory() {
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

export function getFormCategories() {
    fetch("http://localhost:8080/api/categories", {method: 'GET'})
        .then(results => results.json())
        .then(categories => {
            categories.forEach(category => {
                //language=HTML
                let html = `
                    <option value="${category.name}">${category.name}</option>
                `
                $(".category-select").append(html)
            })
        })
}
