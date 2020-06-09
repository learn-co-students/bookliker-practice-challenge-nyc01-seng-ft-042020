document.addEventListener("DOMContentLoaded", function() {
    const baseUrl = "http://localhost:3000/books"
    const bookList = document.getElementById('list')
    
    // render and list
    function renderBooks(books){
        books.forEach(book =>
            renderBook(book))
    }

    function renderBook(book){
        const bookEl = document.createElement('li')
        bookEl.id = book.id
        bookEl.innerText = book.title
        bookList.append(bookEl)
        bookEl.addEventListener('click', function(e){
            const showEl = document.getElementById('show-panel')
            showEl.innerHTML = `
            <h2>Book Description</h2>
            <img src=${book.img_url}>
            <p>${book.description}</p>
            <button id=${book.id}>Like</button>`
        } )
        
    }
    
    function fetchBooks(url){
        fetch(url)
        .then(resp => resp.json())
        .then(books => renderBooks(books))
    }

    fetchBooks(baseUrl)

    // Like Books

    document.addEventListener('click', function(e){
        if (e.target.tagName === "BUTTON") {
            if (e.target.innerText === "Like") {
                const bookId = e.target.id

                fetch(`${baseUrl}/${bookId}`)
                .then(resp => resp.json())
                .then(bookinfo => {
                    const users = bookinfo.users
                    users.push({ 
                        "id": 1,
                        "username": "pouros"
                    })
                    console.log(users)
                    fetch(`${baseUrl}/${bookId}`, {
                        method: "PATCH",
                        headers: {
                            "content-type": "application/json",
                            "accept": "application/json"
                        },
                        body: JSON.stringify({
                            users: users
                        })
                    })
                    .then(resp => resp.json())
                    .then(book => console.log(book))
                } )
                e.target.innerText = "Liked"
            }
        }
    })
});
