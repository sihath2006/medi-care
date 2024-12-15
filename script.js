// DOM Elements
const cartTable = document.querySelector("#cart-table tbody");
const totalPriceElement = document.getElementById("total-price");
const buyNowButton = document.getElementById("buy-now-btn");

let cart = [];
let total = 0;
// Function to add item to the cart
document.querySelectorAll(".medicine-box button").forEach((button) => {
    button.addEventListener("click", () => {
        const medicineBox = button.parentElement;
        const itemName = medicineBox.querySelector("p:nth-of-type(1)")?.innerText || "";
        const priceText = medicineBox.querySelector("p:nth-of-type(2)")?.innerText || "";
        const quantityInput = medicineBox.querySelector("input");


        if (!itemName || !priceText || !quantityInput) {
            alert("Error: Missing item details.");
            return;
        }

        const price = parseInt(priceText.replace("Price : Rs.", ""), 10);
        const quantity = parseInt(quantityInput.value, 10);

        if (isNaN(quantity) || quantity <= 0) {
            alert("Please enter a valid quantity.");
            return;
        }

        const existingItem = cart.find(item => item.name === itemName);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ name: itemName, quantity, price });
        }

        total += price * quantity;
        updateCartTable();
        quantityInput.value = ""; // Reset quantity
    });
});


// Update Cart Table
function updateCartTable() {
    cartTable.innerHTML = "";

    cart.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>Rs. ${item.quantity * item.price}</td>
        `;
        cartTable.appendChild(row);
    });

    totalPriceElement.innerText = `Rs. ${total}`;
}

// Proceed to Order Page
function proceedToOrder() {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add items to proceed.");
        return;
    }

    // Save cart to sessionStorage for use in the order page
    sessionStorage.setItem("cart", JSON.stringify(cart));
    sessionStorage.setItem("total", total);

    // Navigate to the order page
    window.location.href = "order.html";
}
