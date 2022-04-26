import createView from "./createView.js";
import {isLoggedIn} from "./auth.js";

export function getAuthor(author)  {
    return author === null ? "Author Not Found" : author.username;
}

export function getPostCategories(categoriesArray) {
    let html = "<div>"
    categoriesArray.forEach(category => html += `<span class="mx-2">${category.name}</span>`)
    html += "</div>"
    return html;
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
