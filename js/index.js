let data;

function openJson(){
    fetch('../data.json')
        .then(response => response.json())
        .then(_data => {
          data = _data;

          const dataReadyEvent = new CustomEvent("dataReady", {detail: _data});
          window.dispatchEvent(dataReadyEvent);
        })
        .catch(err => {
          console.error('Erreur de chargement du fichier JSON :', err);
          return null;
        });
}

openJson();

function openOrCloseModal(id, isCloseBtn = false){
    if(id == null) return;

    const modal = document.getElementById(id);

    if(!modal) return;

    if(isCloseBtn == true){
        modal.classList.add("hidden");
    }else{
        modal.classList.remove("hidden");
        modal.addEventListener("click", () => openOrCloseModal(id, true))

        const searchComponents = document.getElementById("search-components");
        searchComponents.addEventListener("click", (e) => {
            e.stopPropagation();
        });

        const searchInput = document.getElementById("search-input");

        searchInput.addEventListener("input", (e)=> {
            let value = e.target.value.toLowerCase();

            if(value && value.length > 0){
                const allValues = searchInData(value);
                createList(allValues);
            }else{
                clearList();
            }
        })
    }
}

const openSearchModalBtn = document.getElementById("openSearchModalBtn");
openSearchModalBtn.addEventListener("click", () => openOrCloseModal("search-modal"))

function searchInData(value){
    let list = [];

    for (const book of data.bookData) {
        if(book.title.toLowerCase().includes(value) || 
           book.author.toLowerCase().includes(value) || 
           book.genre.toLowerCase().includes(value) || 
           book.year.toString().toLowerCase().includes(value))
        {
            list.push(book)
        }
    }

    return list;
}

function createList(values){
    const list = document.getElementById("search-result-list");
    list.innerHTML = "";

    if(values.length > 0 ){
        for (const value of values) {
            let li = document.createElement("li");
            li.classList = "flex justify-between gap-x-6 py-5 hover:bg-gray-100 hover:cursor-pointer";

            li.innerHTML = `<div class="flex min-w-0 gap-x-4">\
              <div class="min-w-0 flex-auto">\
                <p class="text-sm font-semibold leading-6 text-gray-900">`+ value.title +`</p>\
                <p class="mt-1 truncate text-xs leading-5 text-gray-500">`+ value.author +`</p>\
              </div>\
            </div>\
            <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">\
              <p class="text-sm leading-6 text-gray-900">Genre : `+ value.genre +`</p>\
              <p class="mt-1 text-xs leading-5 text-gray-500">`+ value.year +`</p>\
            </div>`

            list.appendChild(li)

            li.addEventListener("click", ()=>{
                window.location.href = "livre.html?id=" + value.id;
            })
        }
    }else{
        list.innerHTML = '<p class="p-5 w-full text-center font-semibold">Aucun résultat</p>';
    }
    
}

function clearList(){
    const list = document.getElementById("search-result-list");
    list.innerHTML = '<p class="p-5 w-full text-center font-semibold">Aucun résultat</p>';
}