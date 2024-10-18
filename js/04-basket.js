const totalPrice = document.querySelector(".js-total-price");
const clear = document.querySelector(".js-clear");
const container = document.querySelector(".js-list");
const btnClick = document.querySelector(".js-carts-btn");

const PRODUCT_LS = "basket";
const products = JSON.parse(localStorage.getItem(PRODUCT_LS)) || [];
let totalCost; // сюди будемо зберігати суму всіх покупок якщо я щось купила

if(products.length){       // якщо корз.не порожня 
    clear.hidden = false;  //то зявляється кнопка для чищення
    totalCost = products.reduce((acc, { qty, price }) => acc += qty * price, 0);
}
totalPrice.textContent = totalCost ?`Ваша сума ${totalCost} грн`: `Ваша корзина пуста`;
container.insertAdjacentHTML("beforeend", createMarkup(products));
clear.addEventListener("click", handleClick);
container.addEventListener("click", handleDeleteClick);



function handleClick(){
    localStorage.removeItem(PRODUCT_LS);
    window.location.href = "./03-shop.html";
}

function handleDeleteClick(event) {
    if (!event.target.classList.contains("js-carts-btn")) {
        return; // Перевіряємо, чи клік був саме по кнопці "Видалити"
    }


    const cartItem = event.target.closest(".cart-item"); // Знаходимо елемент товару
    const productName = cartItem.querySelector("h2").textContent; // Отримуємо назву товару для ідентифікації

    // Знаходимо продукт за його назвою
    const index = products.findIndex(product => product.name === productName);

    if (index !== -1) {
        // Зменшуємо кількість товару на 1
        products[index].qty -= 1;

        // Якщо кількість товару стає 0, видаляємо його з масиву
        if (products[index].qty === 0) {
            products.splice(index, 1); // Видаляємо товар, якщо кількість 0
            cartItem.remove(); // Видаляємо елемент з DOM
        } else {
            // Оновлюємо DOM для зменшення кількості
            cartItem.querySelector("p:nth-child(3)").textContent = `Кількість: ${products[index].qty}`;
            cartItem.querySelector("p:nth-child(4)").textContent = `Сума: ${products[index].qty * products[index].price} грн`;
        }

        // Оновлюємо localStorage
        localStorage.setItem(PRODUCT_LS, JSON.stringify(products));

        // Оновлюємо загальну суму
        updateTotalPrice();
    }
}

// Оновлення загальної суми після видалення товару
function updateTotalPrice() {
    totalCost = products.reduce((acc, { qty, price }) => acc += qty * price, 0);

    // Відображаємо загальну суму або повідомлення про порожній кошик
    totalPrice.textContent = totalCost ? `Ваша сума ${totalCost} грн` : `Ваша корзина пуста`;

    // Якщо корзина порожня, ховаємо кнопку очищення
    if (products.length === 0) {
        clear.hidden = true;
    }
}



function createMarkup(arr){
    return arr.map(({ img, price, name, qty}) => `
    <li class="cart-item">
    <img src="${img}" alt="${name}" class="product-img"/>
    <h2>${name}</h2>
    <p>Ціна:${price}</p>
    <p>Кількість:${qty}</p>
    <p>Сума:${ qty * price} грн</p>
    <button class="button-carts js-carts-btn">Видалити</button>
    
    </li>
    `).join("");
}