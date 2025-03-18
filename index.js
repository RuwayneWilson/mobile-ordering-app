import { menuArray } from '/data.js'

const menuList = document.getElementById('menu-list')
const orderInfo = document.getElementById('order-info')
const totalCalc = document.getElementById('total-calc')
const orderList = document.getElementById('order-list')
const orderBtn = document.getElementById('order-btn')
const modalContainer = document.getElementById('modal-container')

let totalPrice = 0 
let orders = [] // Track orders
orderBtn.style.display = "none";

orderBtn.addEventListener('click', function(){
    orderList.style.display = 'none'
    modalContainer.style.display = 'block'
})

document.addEventListener('click', function(e){
    if(e.target.dataset.order){
        handleAddToOrderClick(e.target.dataset.order)
    } else if (e.target.dataset.remove) {
        handleRemoveFromOrderClick(e.target.dataset.remove)
    }
})

function handleAddToOrderClick(orderId){
    const targetMenuItem = menuArray.find(meal => meal.id === Number(orderId))
    
    orders.push(targetMenuItem)
    totalPrice += targetMenuItem.price
    renderOrderList()
    
}

function handleRemoveFromOrderClick(orderId){
    const index = orders.findIndex(item => item.id === Number(orderId))
    if (index !== -1) {
        totalPrice -= orders[index].price
        orders.splice(index, 1)
        renderOrderList()
    }
}

function renderOrderList() {
    orderInfo.innerHTML = ''
    orderList.style.display = orders.length > 0 ? 'block' : 'none'
    
    orders.forEach(order => {
        orderInfo.innerHTML += `
        <div class="flex">
            <h3>${order.name} <span class="remove-btn" data-remove="${order.id}">remove</span></h3>
            <p>R ${order.price}</p>
        </div>`
    })
    
    updateTotalPriceDisplay()
    orderBtn.style.display = "block";
}

function updateTotalPriceDisplay() {
    totalCalc.innerHTML = orders.length > 0 ? `
        <h3>Total</h3>
        <p>R ${totalPrice}</p>` : ''
}

function getMenuHtml(){
    return menuArray.map(menu => `
        <div class="menu">
            <div id="container">
                <div class="menu-item">
                    <div class="food-icon">${menu.emoji}</div>
                    <div class="menu-data">
                        <h2 class="food-name">${menu.name}</h2>
                        <h4 class="food-ingredients">${menu.ingredients.join(", ")}</h4>
                        <p class="item-price">R${menu.price}</p>
                    </div>
                </div>
            </div>
            <button id="add-btn" data-order="${menu.id}">+</button>
        </div>
    `).join('')
}

    modalContainer.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission
    
    const name = document.getElementById("name-input").value; // Replace with actual input ID
    const confirmationMessage = document.getElementById("order-confirmation");

    confirmationMessage.textContent = `Thanks, ${name}! Your order is on its way!`;
    confirmationMessage.style.display = "block";

    modalContainer.style.display = "none";
    orderBtn.style.display = "none"; 
});


function render(){
    menuList.innerHTML = getMenuHtml()
}

render()
