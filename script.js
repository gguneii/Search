let data = []
const cards = document.getElementById('cards')
fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(fetchedData => {
        data = fetchedData
        console.log(data);
        displayCards(fetchedData)
    })

function displayCards(data) {
    cards.innerHTML = '';
    data.map(item => {
        cards.innerHTML += `
          <article class="flex flex-col dark:bg-gray-50">
                    <a rel="noopener noreferrer" href="#" class="h-full overflow-hidden" aria-label="Te nulla oportere reprimique his dolorum">
                        <img alt="" class="object-contain w-full h-52 overflow-hidden" src="${item.image}">
                    </a>
                    <div class="flex flex-col flex-1 p-6">
                        <p class="font-semibold text-lg text-ellipsis overflow-hidden whitespace-nowrap">${item.title}</p>
                        <h3 class="flex-1 py-2 leading-snug text-ellipsis overflow-hidden whitespace-nowrap">${item.description}</h3>
                        <p class="font-semibold text-lg">$${item.price}</p>
                        <div class="flex justify-center pt-3 space-x-2 text-md">
                           <button onclick="addBasket('${item.id}','${item.image}', '${item.title}', '${item.price}')"  class="bg-green-800 p-2 w-full text-white" >Add to basket</button>
                        </div>
                    </div>
                </article>
        `;
    });
}

function search(title) {
    const filteredData = data.filter(item => item.title.toLowerCase().includes(title.trim().toLowerCase()))
    displayCards(filteredData)
}

const basket = document.getElementById('addBasket')

function sideBar() {
    basket.classList.toggle('right-[0]')
}

let basket2 = []
function addBasket(id, image, title, price) {
    const existingProduct = basket2.find(item => item.id === id);
    if (existingProduct) {
        existingProduct.count +=1
    }
    else{
        basket2.push({ id, image, title, price, count: 1 })
    }
    // const obj = {
    //     id,
    //     image,
    //     title,
    //     price
    // }
    // basket2.push(obj)
    handleBasket()
}

const wishlist = document.getElementById('wishlist')
function handleBasket() {
    wishlist.innerHTML =''
    basket2.map(item => {
        wishlist.innerHTML += `
             <div class="relative flex gap-4  dark:bg-gray-50 border-black p-1 rounded-md overflow-hidden">
                    <p class="absolute right-[10px] top-[10px]">
                         <i onclick="sil(${item.id})" class="fa-solid fa-xmark text-[15px] cursor-pointer"></i>
                    </p>
                    <img class="w-[10%] object-contain" src="${item.image}" alt="image" />
                    <div class="w-[80%]">
                        <h4><span class="font-bold">Title:</span> ${item.title}</h4>
                        <p><span class="font-bold">Price:</span> $${item.price} </p>
                        <p><span class="font-bold">Number:</span> ${item.count}</p>
                    </div>
                </div>
                
        `       
    })
    wishlist.innerHTML +=`
    <div><span class="font-bold text-[20px]">Total: ${total()}</span> </div>
    `
}
handleBasket()

function sil(id){
    basket2 = basket2.filter(item => item.id != id)
    handleBasket() 
}
function total(){
    let sum =0
    basket2.forEach(item => {
        sum += item.count * item.price; 
    });
    return sum.toFixed(2);  
}
total()