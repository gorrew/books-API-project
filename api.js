let key = 'm3b6u';
let addTitle = document.getElementById('add-title');
let addAuthor = document.getElementById('add-author');
let addBookButton = document.getElementById('add-book-button');
let viewBooksButton = document.getElementById('view-books-button');
let viewListOfBooks = document.getElementById('view-books-list');
let listOfBooks;

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




function addBooks() {
    let book = `https://www.forverkliga.se/JavaScript/api/crud.php?key=${key}&op=select`;
    console.log(book)
    console.log(key)
    let req = new XMLHttpRequest();
    req.open('GET', `https://www.forverkliga.se/JavaScript/api/crud.php?key=${key}&op=insert&title=${addTitle.value}&author=${addAuthor.value}`);
    req.onreadystatechange = function (e) {
        if (req.readyState === 4 && req.status === 200) {
            console.log(JSON.parse(req.responseText));
            getBooks();
        }
    };
    req.send();
}


function viewBooks(){
    
    console.log(listOfBooks)
    
    for(i=0;i<listOfBooks.length;i++){
        
        let list = document.createElement('LI');
        let editable = document.createElement('input');
        editable.type='text';
        editable.value='Title: ' + listOfBooks[i].title + ', Author: ' + listOfBooks[i].author;
        viewListOfBooks.appendChild(list)
        list.appendChild(editable)
    }
}


function getBooks() {
    listOfBooks;
    let req = new XMLHttpRequest();
    req.onreadystatechange = function (e) {
        if (req.readyState === 4 && req.status === 200) {

            listOfBooks=JSON.parse(req.responseText)
            viewBooks();
        }
    };
    req.open('GET', `https://www.forverkliga.se/JavaScript/api/crud.php?key=${key}&op=select`)
    req.send();
    
}










