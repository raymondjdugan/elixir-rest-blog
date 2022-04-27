export function getAuthor(author) {
    return author === null ? "Author Not Found" : author.username;
}

export function getPostCategories(categoriesArray) {
    let html = "<div>"
    categoriesArray.forEach(category => html += `<span class="mx-2">${category.name}</span>`)
    html += "</div>"
    return html;
}

export function showFormCategories(categories) {
    let html = "";
    categories.forEach(category => {
        //language=HTML
        html += `<option value="${category.name}">${category.name}</option>`
    })
    return html
}
