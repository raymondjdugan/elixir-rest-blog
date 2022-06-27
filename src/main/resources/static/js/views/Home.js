export default function Home(props) {
    console.log(props)
    //language=HTML
    return `
        <header class="py-5 bg-light border-bottom mb-4">
            <div class="container">
                <div class="text-center my-5">
                    <h1 class="fw-bolder">Welcome to Sir Bloggify</h1>
                </div>
            </div>
        </header>
        <main>
            <div class="container">
                <div class="row">
                    <div class="col-lg-9">
                        <div class="card mb-4">
                            <div class="card-body">
                                <div class="small text-muted">January 1, 2022</div>
                                <h2 class="card-title">${props.posts[0].title}</h2>
                                <p class="card-text">${props.posts[0].content}</p>
                                <a class="btn btn-primary" href="#!">Read more →</a>
                            </div>
                        </div>
                        ${createCardsForPosts(props.posts)}
                    </div>
                    <div class="col-lg-3">
                        <div class="card mb-4">
                            <div class="card-header">Search</div>
                            <div class="card-body">
                                <div class="input-group">
                                    <input class="form-control" type="text" placeholder="Enter search term..." aria-label="Enter search term..." aria-describedby="button-search" />
                                    <button class="btn btn-primary" id="button-search" type="button">Go!</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    `;
}

const createCardsForPosts = posts => {
    let postCount = 0;
    let pageCount = 1;
    //language=HTML
    let postsHtml = `
        <div class="row" data-page="${pageCount}">
    `;

    //language=HTML
    posts.forEach((post, index) => {
        if (postCount === 4) {
            ++pageCount;
            //language=HTML
            postsHtml += `
                <div class="d-none row" data-page="${pageCount}">
            `
        }

        //language=HTML
        if (index > 0) {
            if (postCount === 0 || postCount === 2) {
                //language=HTML
                postsHtml += `
                    <div class="col-lg-6">`
            }

            postsHtml += `
                <div class="card mb-4">
                    <div class="card-body">
                        <div class="small text-muted">January 1, 2022</div>
                        <h2 class="card-title h4">${post.title}</h2>
                        <p class="card-text">${post.content}</p>
                       <a class="btn btn-primary" href="#!">Read more →</a>
                    </div>
                </div>
            `

            if (postCount === 1) {
                postsHtml += `</div>`
            }
            if (postCount === 4) {
                postsHtml += `</div></div>`
            }

            ++postCount;
        }
    })
    postsHtml += `</div>`

    return postsHtml;
}


// <nav aria-label="Page navigation example">
//     <ul className="pagination">
//         <li className="page-item"><a className="page-link" href="#">Previous</a></li>
//         <li className="page-item"><a className="page-link" href="#">1</a></li>
//         <li className="page-item"><a className="page-link" href="#">2</a></li>
//         <li className="page-item"><a className="page-link" href="#">3</a></li>
//         <li className="page-item"><a className="page-link" href="#">Next</a></li>
//     </ul>
// </nav>
