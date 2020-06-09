const BASE_URL = "http://localhost:3000"
const BOOKS_URL = `${BASE_URL}/books`
const USERS_URL = `${BASE_URL}/users`

document.addEventListener("DOMContentLoaded", function() {
    
    fetch(BOOKS_URL).then(response => response.json())
    .then(books => books.forEach(book => {
        createLi(book)
    }))
    
    function createLi(book) {
        let booksUl = document.getElementById("list")
        let bookLi = document.createElement("li")
        bookLi.innerText = book.title
        bookLi.className = "book"
        bookLi.dataset.id = book.id
        booksUl.append(bookLi)
    }

    document.addEventListener("click", function(e){
  
        if (e.target.className === "book"){
            let book = e.target
            let bookId = book.dataset.id

            fetch(`${BOOKS_URL}/${bookId}`).then(response => response.json()).then(book => {
                let bookShow = document.getElementById("show-panel")
                bookShow.dataset.id = book.id
                bookShow.innerHTML = `
                <h2>${book.title}</h2>
                <img src="${book.img_url}" alt="${book.title}" width="150" height="200">
                <p>${book.description}</p>
                <ul></ul>
                <button class="Read Book">Read Book</button>
                `
                let bookShowUl = bookShow.querySelector("ul")
                function addUserLi(user){
                    let userLi = document.createElement("p")
                    userLi.dataset.userId = user.id
                    userLi.innerText = user.username
                    bookShowUl.append(userLi)
                }
                book.users.forEach(user => {addUserLi(user)})

            })

           // 
        } else if (e.target.className === "Read Book") {
            let bookId = e.target.parentNode.dataset.id
            //let userList = e.target.parentNode.childNodes[7]
            //console.log(pTags)
            let bookShowUl = e.target.parentNode.querySelector("ul")
            //console.log(bookShowUl)
            let pTags = bookShowUl.querySelectorAll("p")
            //console.log(pTags)
            let userList = []
            pTags.forEach(p => {
                userList.push({"id":p.dataset.id, "username":p.textContent})
                console.log(userList)
            })

            function addUserLi(user){
                let userLi = document.createElement("p")
                userLi.dataset.userId = user.id
                userLi.innerText = user.username
                bookShowUl.append(userLi)
            }    
            
            fetch(`${BOOKS_URL}/${bookId}`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json',
                'Accept': 'application/json'},
                body: JSON.stringify({
                    "users": [
                        {"id":1, "username":"pouros"}
                    ]
                    })
            }).then(body => body.json()).then(book => book.users.forEach(user => addUserLi(user))
         
//book => book.users.forEach(user => addUserLi(user)

            )}
    })

})
