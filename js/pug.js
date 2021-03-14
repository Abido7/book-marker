var bookMarkName = document.getElementById("bookName");
var bookMarkSite = document.getElementById("url");
var btnSubmite = document.getElementById("submit");
var nameError = document.getElementById("nameError");
var urlError = document.getElementById("urlError");
var bookList = [];
localStorage.getItem("list") == null ?
    (bookList = []) :
    ((bookList = getFromLocalStorage("list")), display(bookList));

function addBook() {
    if (bookMarkName.value == "" && bookMarkSite.value == "") {
        nameError.style.display = "block";
        urlError.style.display = "block";
    } else if (bookMarkName.value == "") {
        nameError.style.display = "block";
    } else if (bookMarkSite.value == "") {
        urlError.style.display = "block";
    } else {
        book = {
            bookName: bookMarkName.value,
            bookSite: bookMarkSite.value,
        };
        bookList.push(book);
        setToLocalStorage(bookList);
        display(bookList);
        clearInput();
    }
}

function setToLocalStorage(myarr) {
    localStorage.setItem("list", JSON.stringify(myarr));
    console.log(bookList);
}

function getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

function display(mainArr) {
    var htmlContainer = ``;
    mainArr.forEach((element, index) => {
        htmlContainer += `
        <div class="booklist p-4 d-flex justify-content-between">
            <h3>${element.bookName}</h3>
            <div>
                <a href="https://${element.bookSite}" target="_blank" blank="_" class="btn btn-info hover">visit</a>
                <button onclick="deleteItem(${index})" class="btn btn-danger hover">delete</button>
            </div>
        </div>`;
    });
    document.getElementById("myList").innerHTML = htmlContainer;
}

function deleteItem(index) {
    bookList.splice(index, 1);
    setToLocalStorage(bookList);
    display(bookList);
}

function clearInput() {
    bookMarkName.value = "";
    bookMarkSite.value = "";
}