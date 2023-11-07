window.addEventListener('dataReady', (event) => {
    const data = event.detail;

    sortByTitle();

});

function findShelfNameById(id) {
    for (const shelf of data.shelfData) {
        if (shelf.books.includes(parseInt(id))) {
            return shelf.name;
        }
    }
    return null;
}

function createBooksList(books){
    const listPosition = document.getElementById("list-position");
    listPosition.innerHTML = "";

    for (const book of books) {
        const a = document.createElement("a");
        a.setAttribute("href", "livre.html?id=" + book.id);

        a.classList = "group relative w-80 block rounded-lg border border-gray-300 px-8 pb-4 pt-8 hover:bg-gray-100 hover:cursor-pointer"
        a.innerHTML = `<h1 class="text-2xl font-bold tracking-tight text-gray-900">`+ book.title +`</h1>\
                 <h2 class="text-lg tracking-tight text-gray-600 mt-1">`+ book.author +`</h2>\
                 <ul role="list" class="list-disc space-y-2 pl-4 text-sm mt-3">\
                   <li class="text-gray-400"><span class="text-gray-600">Catégorie : `+ findShelfNameById(book.id) +`</span></li>\
                   <li class="text-gray-400"><span class="text-gray-600">Genre : `+ book.genre +`</span></li>\
                   <li class="text-gray-400"><span class="text-gray-600">Date : `+ book.year +`</span></li>\
                 </ul>\
                 <div class="flex justify-end mt-5">\
                     <p class="text-gray-600">Statut : <span class="text-gray-900">`+ book.status +`</span></p>\
                 </div>`
                    
        listPosition.appendChild(a);
    }
}

function sortByTitle() {
    let books = data.bookData;
    books.sort((a, b) => a.title.localeCompare(b.title));
    createBooksList(books);
}

function sortByAuthor() {
    let books = data.bookData;
    books.sort((a, b) => a.author.localeCompare(b.author));
    createBooksList(books);
}

function sortByGenre() {
    let books = data.bookData;
    books.sort((a, b) => a.genre.localeCompare(b.genre));
    createBooksList(books);
}

function sortByShelf() {
    const books = data.bookData;
    const shelfData = data.shelfData;
  
    const bookMap = books.reduce((map, book) => {
      map[book.id] = book;
      return map;
    }, {});
  
    shelfData.sort((a, b) => a.name.localeCompare(b.name));
  
    const sortedBooks = shelfData.flatMap((shelf) =>
      shelf.books.map((bookId) => bookMap[bookId])
    );
  
    createBooksList(sortedBooks);
}

function sortByDate() {
    let books = data.bookData;
    books.sort((a, b) => a.year - b.year);
    createBooksList(books);
}

function sortByStatus() {
    let books = data.bookData;
    books.sort((a, b) => a.status.localeCompare(b.status));
    createBooksList(books);
}

const dropdownButton = document.getElementById("dropdown-button");

dropdownButton.addEventListener("change", ()=>{
    const dropdownValue = dropdownButton.value;
    const options = dropdownButton.children;
    for (const option of options) {
        if(option.classList.contains("bg-indigo-600")){
            option.classList="";
        }
        if(option.getAttribute("value") == dropdownValue){
            option.classList = "bg-indigo-600 text-white";
        }
    }

    switch (dropdownValue) {
        case "nom":
            sortByTitle();
            break;
        case "auteur":
            sortByAuthor();
            break;
        case "categorie":
            sortByShelf();
            break;
        case "genre":
            sortByGenre();
            break;
        case "date":
            sortByDate();
            break;
        case "statut":
            sortByStatus();
            break;
        default:
            createBooksList(data.bookData);
            break;
    }
});

document.getElementById("search-bar-btn").addEventListener("click", () => openOrCloseModal("search-modal"))