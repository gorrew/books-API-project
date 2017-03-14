let googleButton = document.getElementById('google-button');
let googleInput = document.getElementById('input-google')
let parsedData;
let btn;

function searchGoogleBook() {
    let req = new XMLHttpRequest();
    googleInput = document.getElementById('input-google').value;
//    console.log('inne')
    let bookUrl = 'https://www.googleapis.com/books/v1/volumes?q=' + googleInput;
    console.log(bookUrl);
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            console.log('händer det nått?')
            parsedData = JSON.parse(req.responseText);
            console.log(parsedData);
            showGoogleBooks();
        }
        else {
            console.log('gick inte bra, körs igen kanske?')
        }
    }
    req.open('GET', bookUrl, true);
    req.send();
}


function showGoogleBooks() {
    removeChildren(viewListOfBooks);
//    console.log('kommer vi till Show?')
    for (let i = 0; i < parsedData.items.length; i++) {
//        console.log(parsedData + 'i show');
        let createLi = document.createElement('li');
        createLi.className = 'google-li';
        createLi.innerHTML = parsedData.items[i].volumeInfo.title + ', ' + parsedData.items[i].volumeInfo.authors;
        let btn = document.createElement('button');
        btn.className = 'google-add-button';
        btn.innerHTML = 'add';
        btn.id = i;
        createLi.appendChild(btn);
        viewListOfBooks.appendChild(createLi);
        btn.addEventListener('click', addGoogleBooks);
    }
} 

function addGoogleBooks() {
    console.log('inne i add google book')
    console.log("target id", event.target);
    let book = `https://www.forverkliga.se/JavaScript/api/crud.php?key=${key}&op=insert&title=${parsedData.items[event.target.id].volumeInfo.title}&author=${parsedData.items[event.target.id].volumeInfo.authors}`;
    console.log(parsedData);
    
    let req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            bookslistparsed = JSON.parse(req.responseText);
            if (bookslistparsed.status != 'error') {
                console.log(bookslistparsed);
                googleInput.value = '';
                getBooks();
            }
            else {
                addGoogleBooks();
            }
        }
    }
    req.open('GET', book);
    req.send();
}
googleButton.addEventListener('click', searchGoogleBook);
