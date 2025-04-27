// checkout.js

// Get total from cart
const orderTotal = document.getElementById("order-total");
const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

let total = 0;
cartItems.forEach((item) => {
  total += item.price;
});

// Show total in HTML
orderTotal.textContent = `Total: ₹${total}`;

// Handle form submit
const form = document.getElementById("checkout-form");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent default form submission

  // You could also collect form data here if needed

  alert("Order placed successfully! 📦✨");

  // Clear the cart after placing the order
  localStorage.removeItem("cart");

  // Redirect to home or confirmation page
  window.location.href = "index.html";
});
