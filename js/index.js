/*
    * render list of books
    * click book to see book info
    * like a book
    * update likes on book
*/

document.addEventListener("DOMContentLoaded", function(e) {
    const baseUrl = "http://localhost:3000/books"
    const listPanelDiv = document.querySelector('#list-panel')
    const showPanelDiv = document.querySelector('#show-panel')
    const listUl = document.querySelector('#list')

    const fetchBooks = () => {
        fetch(baseUrl)
        .then(resp => resp.json())
        .then(books => {
            renderBooks(books)
        })
    }

    const renderBooks = books => {
        books.forEach(book => {
            renderBook(book)
        })
    }

    const renderBook = book => {
        const listLi = document.createElement('li')
        listLi.dataset.id = book.id
        listLi.innerHTML = `
        ${book.title}
        `
        listUl.appendChild(listLi)
        listLi.addEventListener('click', function(e){
            const id = e.target.dataset.id
            fetch(`${baseUrl}/${id}`)
            .then(resp => resp.json())
            .then(book => renderBookInfo(book))
        })
    }

    const renderBookInfo = book => {
        showPanelDiv.innerHTML = `
        <h1>${book.title}</h1>
        <img src = ${book.img_url}>
        <br>
        ${book.description}
        <br>
        <button class="like" id=${book.id}>Like Book!</button>
        <h4>Users</h4>
        `
       
        const userName = document.createElement('ul')

        book.users.forEach(user => {
            const userLi = createUserLi(user)
            userName.appendChild(userLi)
        })
        showPanelDiv.append(userName)
        
    }

    const createUserLi = user => {
        const li = document.createElement('li')
        li.innerHTML = `
        ${user.username}
        `
        return li
    }

    document.addEventListener('click', function(e){
        if(e.target.className === 'like'){
            const button = e.target
            const id = button.id

            fetch(`${baseUrl}/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "accept": "application/json"
                },
                body: JSON.stringify({
                    users: [
                        {"id":2, "username":"auer"},
                        {"id":8, "username":"goodwin"},
                        {"id":1, "username":"pouros"}  
                    ]
                })
            })
            .then(resp => resp.json())
            .then(user => {
                const userLi = createUserLi(user)
                const ul = button.parentNode.querySelector('ul')
                ul.append(userLi)
            })
        }
    })

    fetchBooks()
});
