var key = 'm3b6u';

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
//        console.log(key + ' nr2');
//        console.log(req.readyState);
//    };
//   
//    req.send();
//}

function addBooks() {
    
    let book = `https://www.forverkliga.se/JavaScript/api/crud.php?key=${key}&op=select`;
    console.log(book)
    console.log(key)
    let req = new XMLHttpRequest();
    req.open('GET', book);
    req.onreadystatechange = function (e) {
        if (req.readyState === 4 && req.status === 200) {
            key = JSON.parse(req.responseText);
            console.log(key);
        }
    };
    req.send();
}
addBooks();
