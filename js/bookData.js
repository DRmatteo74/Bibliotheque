// Récupère l'ID en paramètre de l'URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

if(!id){
    window.location.href = "/";
}

// Permet de trouver le nom de l'étagère par rapport à un livre 
function findShelfNameById(data, id) {
    for (const shelf of data.shelfData) {
        if (shelf.books.includes(parseInt(id))) {
            return shelf.name;
        }
    }
    return null;
}

// Evenement lorsque les données sont récupérées
window.addEventListener('dataReady', (event) => {
    // Récupère le livre correspondant à l'ID
    const data = event.detail;
    const book = data.bookData.find((book)=> book.id == id);
    if(!book){
        window.location.href = "/";
        return;
    } 

    const shelfName = findShelfNameById(data, id);

    // Affiche les données 
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


// Permet d'ouvrir et fermé la fenêtre de réservation
function openOrCloseReserveModal(isCloseBtn = false){
    const modal = document.getElementById("reserve-modal");

    if(!modal) return;

    if(isCloseBtn == true){
        modal.classList.add("hidden");
    }else{
        modal.classList.remove("hidden");
        modal.addEventListener("click", () => openOrCloseReserveModal(true))
        
        // Empêche la fermeture de la fenêtre lors du clique sur un élément de la fenêtre
        const reserveComponents = document.getElementById("reserve-components");
        reserveComponents.addEventListener("click", (e) => {
            e.stopPropagation();
        });
    }
}

document.getElementById("book-reserve-btn").addEventListener("click", () => openOrCloseReserveModal());

// Permet de réserver un livre
document.getElementById("book-reserve-validate-btn").addEventListener("click", ()=>{
    const date = document.getElementById("date-reserve").value;
    
    const dueDate = date.split(" to ")[1];

    const storedData = JSON.parse(sessionStorage.getItem('JSONData'));
    const bookData = storedData.bookData;

    const book = bookData.find(book => book.id == id);

    // Enregistre dans le sessionStorage les données modifiées
    if(book){
        book.status = "Emprunté";
        book.dueDate = dueDate;
        
        sessionStorage.setItem("JSONData", JSON.stringify(storedData));
        window.location.reload();
    }
})
