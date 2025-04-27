// cart.js

const cartContainer = document.getElementById("cart-items");
const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

if (cartItems.length === 0) {
  cartContainer.innerHTML = `<p class="text-center text-gray-600">Your cart is empty.</p>`;
} else {
  let total = 0;

  // Create HTML for each item
  const itemsHTML = cartItems
    .map((item) => {
      total += item.price;
      return `
      <div class="flex justify-between items-center border-b pb-4 mb-4">
        <div class="flex items-center gap-4">
          <img src="${item.image}" alt="${item.title}" class="w-16 h-20 object-cover rounded" />
          <div>
            <h2 class="font-semibold text-lg">${item.title}</h2>
            <p class="text-sm text-gray-500">by ${item.author}</p>
          </div>
        </div>
        <p class="font-bold text-blue-600">₹${item.price}</p>
      </div>
    `;
    })
    .join("");

  // Final HTML with total and checkout
  cartContainer.innerHTML = `
    ${itemsHTML}
    <div class="flex justify-between items-center mt-6 pt-4 border-t">
      <h3 class="text-xl font-semibold">Total: ₹${total}</h3>
      <a
        href="checkout.html"
        class="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Proceed to Checkout
      </a>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cart-items");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Render cart items
  function renderCart() {
    cartContainer.innerHTML = ""; // Clear previous content

    if (cart.length === 0) {
      cartContainer.innerHTML = `<p class="text-center text-gray-600">Your cart is empty.</p>`;
      return;
    }

    let total = 0;

    cart.forEach((item, index) => {
      total += item.price;

      const itemDiv = document.createElement("div");
      itemDiv.className =
        "flex justify-between items-center border-b pb-4 mb-4";

      itemDiv.innerHTML = `
          <div>
            <h2 class="font-semibold text-lg">${item.title}</h2>
            <p class="text-sm text-gray-500">by ${item.author}</p>
          </div>
          <div class="flex items-center gap-4">
            <p class="font-bold text-blue-600">₹${item.price}</p>
            <button 
              class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 delete-btn"
              data-index="${index}"
            >
              Delete
            </button>
          </div>
        `;

      cartContainer.appendChild(itemDiv);
    });

    // Show total and checkout button
    const totalDiv = document.createElement("div");
    totalDiv.className = "flex justify-between items-center pt-4 border-t mt-4";

    totalDiv.innerHTML = `
        <h3 class="text-xl font-semibold">Total: ₹${total}</h3>
        <a href="checkout.html" class="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Proceed to Checkout
        </a>
      `;

    cartContainer.appendChild(totalDiv);

    // Set up delete buttons
    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const index = button.getAttribute("data-index");
        cart.splice(index, 1); // Remove the item
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart(); // Re-render after deletion
      });
    });
  }

  renderCart();
});
