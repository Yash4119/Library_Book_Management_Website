console.log("noww we will try all the methods using javascript es6 classes");

class Book {
  constructor(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
  }
}

class Display {
  show_books() {
    let books = localStorage.getItem("books");
    let booksobj;

    if (books == null) {
      booksobj = [];
    } else {
      booksobj = JSON.parse(books);
    }

    let html = "";

    booksobj.forEach((book, index) => {
      html += `
        <tr class="tableRow">
        <td>${index + 1}</td>
        <td>${book.name}</td>
        <td>${book.author}</td>
        <td>${book.type}</td>
        <td><button type="button" id="${index}" onclick="display.deleteNote(this.id)" class="btn btn-primary">Remove</button></td>
        </tr>
        `;
    });

    let tableBody = document.getElementById("tableBody");
    let err_msg = document.getElementById("dis-msg");

    if (booksobj.length != 0) {
      tableBody.innerHTML = html;
      err_msg.innerHTML = ``;
    } else {
      tableBody.innerHTML = ``;
      err_msg.innerHTML = `<h6 style="color:red">Add Books To the Collection............</h6>`;
    }
  }

  clear() {
    let libraryForm = document.getElementById("libraryForm");
    libraryForm.reset();
  }

  validate(book) {
    if (book.name.length < 2 || book.author.length < 2) {
      return false;
    } else {
      return true;
    }
  }

  show(type, displayMessage) {
    let message = document.getElementById("message");
    message.innerHTML = `
                      <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                        <strong>Message : !</strong> ${displayMessage}.
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                      </div>`;
    setTimeout(() => {
      message.innerHTML = ``;
    }, 5000);
  }

  deleteNote(index) {
    console.log("Now I am deleting note number :- " + index);

    let books = localStorage.getItem("books");
    let booksobj;

    if (books == null) {
      booksobj = [];
    } else {
      booksobj = JSON.parse(books);
    }

    booksobj.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(booksobj));

    display.show_books();
  }
}

// creating a global instance so as to show books even after the page is refreshed
let display = new Display();
display.show_books();

let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);

function libraryFormSubmit(e) {
  console.log("You have now entered the library from submit handler");

  let name = document.getElementById("bookName").value;
  let author = document.getElementById("author").value;
  let type;
  let books = localStorage.getItem("books");

  let fiction = document.getElementById("fiction");
  let nonFiction = document.getElementById("nonFiction");
  let programming = document.getElementById("programming");

  if (fiction.checked) {
    type = fiction.value;
  } else if (nonFiction.checked) {
    type = nonFiction.value;
  } else if (programming.checked) {
    type = programming.value;
  }

  let book = new Book(name, author, type);
  console.log(book);

  if (display.validate(book)) {
    let booksobj;

    if (books == null) {
      booksobj = [];
    } else {
      booksobj = JSON.parse(books);
    }

    booksobj.push(book);
    localStorage.setItem("books", JSON.stringify(booksobj));

    display.show_books();
    display.clear();
    display.show("success", "Your book has been added successfully");
  } else {
    display.clear();
    display.show("danger", "Enter the details Properly");
  }

  e.preventDefault();
}

// searching particular books
let searchText = document.getElementById("searchText");
searchText.addEventListener("input", function () {
  let inputval = searchText.value.toLowerCase();

  let books = document.getElementsByClassName("tableRow");
  Array.from(books).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("td")[1].innerText;
    if (cardTxt.includes(inputval)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
