const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

if(!id){
    window.location.href = "/";
}

function findShelfNameById(data, id) {
    for (const shelf of data.shelfData) {
        if (shelf.books.includes(parseInt(id))) {
            return shelf.name;
        }
    }
    return null;
}

window.addEventListener('dataReady', (event) => {
    const data = event.detail;
    const book = data.bookData.find((book)=> book.id == id);
    if(!book){
        window.location.href = "/";
        return;
    } 

    const shelfName = findShelfNameById(data, id);

    document.title = "Bibliothèque - " + book.title;
    document.getElementById("book-title").textContent = book.title;
    document.getElementById("book-title-breadcrumb").textContent = book.title;
    document.getElementById("book-shelf-breadcrumb").textContent = shelfName;

    document.getElementById("book-author").textContent = book.author;
    document.getElementById("book-description").textContent = book.description;

    document.getElementById("book-genre").textContent = "Genre : " + book.genre
    document.getElementById("book-year").textContent = "Date : " + book.year
    document.getElementById("book-shelf").textContent = "Catégorie : " + shelfName;

    document.getElementById("book-status").textContent = book.status

    if(book.status == "Emprunté"){
        document.getElementById("book-reserve-btn").disabled = true;
        document.getElementById("book-dueDate-hidden").classList.remove("hidden");
        document.getElementById("book-dueDate").textContent = book.dueDate.split('-').reverse().join('/');
    }

})
