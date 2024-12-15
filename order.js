// DOM Elements
const orderTable = document.querySelector("#order-summary-table tbody");
const orderTotalPrice = document.getElementById("order-total-price");
const saveFavouritesButton = document.getElementById("save-favourites-btn");
const applyFavouritesButton = document.getElementById("apply-favourites-btn");
const orderForm = document.getElementById("order-form");

let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
let total = sessionStorage.getItem("total") || 0;

// Populate Order Summary Table
function populateOrderSummary() {
    cart.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>Rs. ${item.quantity * item.price}</td>
        `;
        orderTable.appendChild(row);
    });

    orderTotalPrice.innerText = `Rs. ${total}`;
}

// Save Favourites
saveFavouritesButton.addEventListener("click", () => {
    localStorage.setItem("favouriteOrder", JSON.stringify({ cart, total }));
    alert("Order saved as favourite.");
});

// Apply Favourites
applyFavouritesButton.addEventListener("click", () => {
    const favourite = JSON.parse(localStorage.getItem("favouriteOrder"));
    if (favourite) {
        cart = favourite.cart;
        total = favourite.total;

        orderTable.innerHTML = ""; // Clear table
        populateOrderSummary();
    } else {
        alert("No favourite order found.");
    }
});

// Form Submission
orderForm.addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const payment = document.getElementById("payment").value;

    if (name && address && payment) {
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 7);

        alert(`Thank you for your purchase, ${name}! Your order will be delivered by ${deliveryDate.toDateString()}.`);
        sessionStorage.clear();
    } else {
        alert("Please fill in all fields correctly.");
    }
});

// Populate on load
populateOrderSummary();
