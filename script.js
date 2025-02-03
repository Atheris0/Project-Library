const myLibrary = [];

function Book(title, author, pages, hasRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;
}

Book.prototype.toggleReadStatus = function () {
  this.hasRead = !this.hasRead;
};

function addToLibrary(title, author, pages, hasRead) {
  const newBook = new Book(title, author, pages, hasRead);
  myLibrary.push(newBook);
  displayBooks();
}

function displayBooks() {
  const libraryDiv = document.getElementById("library");
  libraryDiv.innerHTML = "";

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("card");
    bookCard.innerHTML = `
    <h3>${book.title}</h3>
    <p>Author: ${book.author}</p>
    <p>Pages: ${book.pages}</p>
    <p>Read: ${book.hasRead ? "Yes" : "No"}</p>
    <button class="toggleBtn">Toggle Read</button>
    <button class="removeBtn">Remove</button>
    `;

    bookCard.querySelector(".removeBtn").addEventListener("click", (e) => {
      bookCard.remove();
      myLibrary.splice(index, 1);
    });

    bookCard.querySelector(".toggleBtn").addEventListener("click", (e) => {
      myLibrary[index].toggleReadStatus();
    });

    libraryDiv.appendChild(bookCard);
  });
}

// example books

addToLibrary("1984", "George Orwell", 328, true);
addToLibrary("To Kill a Mockingbird", "Harper Lee", 281, false);
addToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, true);

document
  .getElementById("bookForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const hasRead = document.getElementById("hasRead").checked;

    addToLibrary(title, author, parseInt(pages), hasRead);
    event.target.reset();
  });
