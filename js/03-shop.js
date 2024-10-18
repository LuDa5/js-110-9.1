const instruments = [
    {
        id: 1,
        img: "https://static.dnipro-m.ua/cache/products/7056/catalog_origin_218728.jpg",
        name: "Шуруповерт",
        price: 1150,
        description: "Мережевий дриль-шуруповерт TD-30 — надійний помічник для робіт по дому та в невеликій майстерні, якщо необхідно виконувати роботу переважно з закручування кріпильних елементів. Муфта регулювання крутного моменту робить інструмент універсальним вибором як для свердління, так і для роботи з кріпленнями."
    },
    {
        id: 3,
        img: "https://static.dnipro-m.ua/cache/products/992/catalog_origin_322784.jpg",
        name: "Шліфмашина",
        price : 1299,
        description: "Кутова шліфувальна машина Dnipro-M GS-98 – модель, яка поєднує в собі оптимальне співвідношення потужності, ваги та мобільності. Конструкція шліфмашини сприяє зручній та надійній роботі, навіть однією рукою. Інструмент ідеально підходить для виконання різу на висоті та використання у важкодоступних місцях. Низький рівень шуму та вібрації, двопозиційне розташування додаткової рукоятки під кутом 100 градусів, мінімізує втому під час шліфування."
    },
    {
        id: 4,
        img: "https://static.dnipro-m.ua/cache/products/5596/catalog_origin_191105.jpg",
        name: "Пила",
        price: 11049,
        description: "Мобільна акумуляторна ланцюгова пила DCS-200BC DUAL призначена для обрізання зайвих гілок, спилювання дерев та чагарника, заготівлі дров, покрою будматеріалів та демонтажних робіт. Її просто використовувати у будь-яких місцях: на висоті, на виїзних роботах, у лісі або саду. При цьому Вам не потрібно буде турбуватися про підключення до мережі."
    },
    {
        id: 5,
        img: "https://static.dnipro-m.ua/cache/products/2023/catalog_origin_323420.jpg",
        name: "Рівень",
        price: 897,
        description: "Рівень серії ProVision виробництва DNIPRO-M має не тільки високу точність вимірювань і чудові захисні властивості, а й надає максимальний комфорт користувачеві в процесі експлуатації."
    },
    {
        id: 6,
        img: "https://static.dnipro-m.ua/cache/products/9500/catalog_origin_470179.jpg",
        name: "Тример",
        price: 3699,
        description: "Тример електричний Dnipro-M 110 призначений для покосу густої трави, а також кущів з діаметром стовбура до 10 мм."
    },
    {
        id: 7,
        img: "https://static.dnipro-m.ua/cache/products/6483/catalog_origin_325859.jpg",
        name: "Мотокоса",
        price: 11049,
        description: "Мотокоса Dnipro-M 43 призначена для покосу трави, чагарників, бур'янів, газонів, а також для заготівлі сіна в невеликих масштабах.    Використовується для польових робіт на садовій ділянці площею до 2000 м2."
    },
    {
        id: 8,
        img: "https://static.dnipro-m.ua/cache/products/4980/catalog_origin_183761.jpg",
        name: "Генератор",
        price: 10890,
        description: "Бензиновий генератор GX-25 номінальною потужністю 2,5 кВт забезпечить автономність побутових приладів на дачі або у приватному будинку. Ви зможете одночасно підключити до нього освітлення, холодильник, зарядку телефону, ноутбук та водяний насос."
    }
]



const container = document.querySelector(".js-list");//контейнер для зберігюпродуків
const PRODUCT_LS = "basket"; // змінна в якій зберігю ключик для локал сторідж, туди будемо додавати прод. які кладем в корзину

container.insertAdjacentHTML("beforeend", createMarkup(instruments));//звертаемось до контейнера і додаємо результат функції!
container.addEventListener("click", handleAdd);//!робимо логіку,вішаємо слухача подій на контейнер при кліку!


//СТВОРЮЄМО ФУНКЦІЮ ЯКА СТВОРЮЄ НАМ РЯДОЧОК РОЗМІТКИ І ПОВЕРТА ТАКИЙЖЕ МАСИВ АЛЕ З ДРУГИМ КОНТЕНТОМ

function createMarkup(arr){
    return arr
    .map(({id, name, price, description, img}) => `
    <li data-id="${id}" class="product-card js-product">
    <img src="${img}" alt="${name}" class="product-img"/>
    <h2 class="product-title">${name}</h2>
    <p class="product-description">${description}</p>
    <p class="product-price">Ціна:${price} грн</p>
    <button class="product-add-btn js-add"> В корзину</button>
    </li>
    `).join("");//переводимо все в рядочок
    
}

//! РЕАЛІЗУЄМО ЛОГІКУ ДОДАВАННЯ ПРОДУКТІВ У КОРЗИНУ

function handleAdd(event){
if(!event.target.classList.contains("js-add")){
    return;//щоб тицялось тільки на кнопку!
}
const product = event.target.closest(".js-product");//отримуєм продукту з таким класом
// console.log(product);
const productId = Number(product.dataset.id);// витягуємо з цього елементу айді, і перетворюємо його з рядка на число є два способи
// const productId = +product.dataset.id;
// console.log(productId);
const currentProduct = instruments.find(({ id }) => id === productId);// знаходимо в масиві за одним унікальним aйдішником
// console.log(currentProduct);

    const products = JSON.parse(localStorage.getItem(PRODUCT_LS)) || [];
    const index = products.findIndex(({ id }) => id === productId);
    
    if(index !== -1) {
        products[index].qty += 1;
    } else {
        currentProduct.qty = 1;
        products.push(currentProduct);
    }

    localStorage.setItem(PRODUCT_LS, JSON.stringify(products));
 
}



    



    //!!щось тут не правильно

// const products = JSON.parse(localStorage.getItem("PRODUCT_LS")) ?? [];//! виводимо з локалсторідж, розпарсуємо і робимо умову якщо нічого нема то [] а якщо є то зберігай в змінну 
// const index = products.findIndex(({ id }) => id === productId);// повертає індекс першого знайденого     елементу за такою умовою якщо айді товару = productId

// if(index !== -1) {
// products[index].qty += 1;
// } else {
//     currentProduct.qty = 1;// додаємо квантіі який=1, у випадку якщо в нашому масиві немає поточного продукту
//     products.push(currentProduct);// і пушимо в сторідж
// }

// localStorage.setItem(PRODUCT_LS, JSON.stringify(products));

// } 