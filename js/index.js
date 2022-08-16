console.log("this is index.js");

// NOTE : Default behaviour of a form is to reload the page whenever the submit button is clicked
//        this can be prevented using the e.preventDefault(); method.

// Constructor for book entry

//                                                        ***************   TO DO'S   **************
// STORE ALL THE DATA TO LOCAL STORAGE                                    :- Done
// PROVIDE A DELETE BUTTON TO DELETE BOOK RECORDS                         :- Done
// IF POSSIBLE YOU MAY ADD A BUTTON TO MODIFFY THE ORIGINAL DETAILS       :- Pending
// ADD A SCROLLBAR TO THE VIEW                                            :- Done

function Book(name, author, type) {
  this.name = name;
  this.author = author;
  this.type = type;
}

// Constructor to display books data
function Display() {}

// Add methoda to display prototype
Display.prototype.add = function (book) {
  let tableBody = document.getElementById("tableBody");
  let uistring = `
            <tr>
              <td>${book.name}</td>
              <td>${book.author}</td>
              <td>${book.type}</td>
            </tr>
  `;
  tableBody.innerHTML += uistring;
};

// implementing clear function to clear the data from text feilds
Display.prototype.clear = function () {
  let libraryForm = document.getElementById("libraryForm");
  libraryForm.reset();
};

// implementing the validation method to validate the inputs given by the user
Display.prototype.validate = function (book) {
  if (book.name.length < 2 || book.author.length < 2) {
    return false;
  } else {
    return true;
  }
};

// implementing the show function in order to display the toasts
Display.prototype.show = function (type, displayMessage) {
  let message = document.getElementById("message");
  message.innerHTML = `
                      <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                        <strong>Message : !</strong> ${displayMessage}.
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                      </div>`;
  setTimeout(function () {
    message.innerHTML = ``;
  }, 2000);
};

// Add submit event listener to libraryForm
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);

function libraryFormSubmit(e) {
  console.log("you have entered the library form");

  let name = document.getElementById("bookName").value;
  let author = document.getElementById("author").value;
  let type;

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

  let display = new Display();

  if (display.validate(book)) {
    display.add(book);
    display.clear();
    display.show("success", "Your Book has been added successfully");
  } else {
    display.show("danger", "error (Enter Valid Details)");
    display.clear();
  }

  e.preventDefault();
}
