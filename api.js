let key = 'm3b6u';
let addTitle = document.getElementById('add-title');
let addAuthor = document.getElementById('add-author');
let updateBook = document.getElementById('update-book-button');
let addBookButton = document.getElementById('add-book-button');
let viewBooksButton = document.getElementById('view-books-button');
let viewListOfBooks = document.getElementById('view-books-list');
let removeBook = document.getElementById('delete-book');
let deleteButton = document.getElementById('del-button');
let listOfBooks;
let bookslistparsed;
//function getApi() {
//    let req = new XMLHttpRequest();
//    req.open('GET', 'https://www.forverkliga.se/JavaScript/api/crud.php?requestKey');
//    req.onreadystatechange = function (e) {
//        if (req.readyState === 4 && req.status === 200) {
//            key = JSON.parse(req.responseText);
//            console.log(key.key);
//            key = key.key;
//            addBooks();
//        }
//        console.log(key);
//        console.log(req.readyState);
//    };
//   
//    req.send();
//}
////////Events
addBookButton.addEventListener('click', addBooks);
viewBooksButton.addEventListener('click', getBooks);
deleteButton.addEventListener('click', deleteBooks);
let bookClass = document.getElementsByClassName('book-class');

function deleteBooks() {
    let thisIdToRemove = removeBook.value;
    let req = new XMLHttpRequest;
    req.open('GET', `https://www.forverkliga.se/JavaScript/api/crud.php?key=${key}&op=delete&id=${thisIdToRemove}`);
    req.onreadystatechange = function (e) {
        if (req.readyState === 4 && req.status === 200) {
            jsonTextParse = JSON.parse(req.responseText);
            
            
            if(jsonTextParse.status !== 'error'){
                   console.log(jsonTextParse);
                console.log('Borta!');
                getBooks();
            }
            else {
                deleteBooks();
            }
        
     
            }
    }
    req.send();
}

function editBooks(event) {
    let newInput = document.createElement('input');
    newInput.className = 'new-input';
    console.log(event.target);
    let editText = event.target.innerText;
    event.target.innerText = '';
    newInput.value = editText;
    event.target.appendChild(newInput);
    newInput.focus();
    newInput.addEventListener('blur', function () {
        let thisElement = newInput.parentElement;
        thisElement.innerHTML = newInput.value;
        let test = thisElement.innerText.split(',');
        console.log(test);
        console.log(thisElement.id);
        console.log(`https://www.forverkliga.se/JavaScript/api/crud.php?key=${key}&op=update&title=${test[0]}&author=${test[1]}&id=${thisElement.id}`);
        let req = new XMLHttpRequest();
        req.open('POST', `https://www.forverkliga.se/JavaScript/api/crud.php?key=${key}&op=update&title=${test[0]}&author=${test[1]}&id=${thisElement.id}`);
        req.onreadystatechange = function (e) {
            if (req.readyState === 4 && req.status === 200) {
                getBooks();
                udateParse = JSON.parse(req.responseText)
                console.log(udateParse);
                //            if (bookslistparsed.status != 'error') {
                //                console.log('Inne i edit med utan fel');
                //                getBooks();
                //            }
                //            else {
                //                console.log('Inne i edit med med felmeddelande');
                //                editBooks();
                //            }
            }
        };
        req.send();
    })
}

function addBooks() {
    let book = `https://www.forverkliga.se/JavaScript/api/crud.php?key=${key}&op=select`;
    console.log(book)
    console.log(key)
    let req = new XMLHttpRequest();
    req.open('GET', `https://www.forverkliga.se/JavaScript/api/crud.php?key=${key}&op=insert&title=${addTitle.value}&author=${addAuthor.value}`);
    req.onreadystatechange = function (e) {
        if (req.readyState === 4 && req.status === 200) {
            bookslistparsed = JSON.parse(req.responseText)
            if (bookslistparsed.status != 'error') {
                //console.log('Inne i addbook med utan fel');
                getBooks();
            }
            else {
                //console.log('Inne i addbook med med felmeddelande');
                addBooks();
            }
        }
    };
    req.send();
}

function viewBooks() {
    console.log(listOfBooks);
    //console.log('viewBooks är kallad');
    //console.log('Ska skapa li element här i loopen nu');
    for (i = 0; i < listOfBooks.data.length; i++) {
        let createLi = document.createElement('li');
        createLi.id = listOfBooks.data[i].id;
        createLi.className = 'book-class';
        createLi.innerHTML = listOfBooks.data[i].title + ', ' + listOfBooks.data[i].author;
        viewListOfBooks.appendChild(createLi);
        //console.log('Skapat li element från loopen nu');
    }
    //console.log('Finns li element?');
    for (let i = 0; i < bookClass.length; i++) {
        bookClass[i].addEventListener('click', editBooks)
    }
}

function getBooks() {
    removeChildren(viewListOfBooks);
    let req = new XMLHttpRequest();
    req.onreadystatechange = function (e) {
        if (req.readyState === 4 && req.status === 200) {
            listOfBooks = JSON.parse(req.responseText);
            if (listOfBooks.status != 'error') {
                viewBooks();
                //console.log('Bör visa böcker! Skickas nu till viewBook');
            }
            else {
                getBooks();
                //console.log('laddar om getBook');
            }
        }
    };
    req.open('GET', `https://www.forverkliga.se/JavaScript/api/crud.php?key=${key}&op=select`)
    req.send();
}

function removeChildren(parent) {
    //console.log('Rensa tidigare li element');
    while (parent.firstChild) parent.removeChild(parent.firstChild);
}