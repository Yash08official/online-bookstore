// index.js
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".add-to-cart");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const userLoggedIn = localStorage.getItem("user");

      if (!userLoggedIn) {
        const shouldLogin = confirm(
          "You are not logged in. Would you like to log in now?"
        );

        if (shouldLogin) {
          window.location.href = "login.html"; // Redirect to login page
        } else {
          window.location.href = "register.html"; // Redirect to register page
        }
      } else {
        const title = button.getAttribute("data-title");
        const author = button.getAttribute("data-author");
        const price = parseInt(button.getAttribute("data-price"));
        const image = button.getAttribute("data-image");

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Prevent adding the same item twice
        const exists = cart.some((item) => item.title === title);
        if (exists) {
          alert(`${title} is already in your cart.`);
        } else {
          cart.push({ title, author, price, image });
          localStorage.setItem("cart", JSON.stringify(cart));
          alert(`${title} has been added to your cart.`);
        }
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Select all buttons with the "add-to-cart" class
  const buttons = document.querySelectorAll(".add-to-cart");

  buttons.forEach((button) => {
    // Use the data-bound attribute to prevent multiple event bindings
    if (!button.dataset.bound) {
      button.dataset.bound = true; // Prevent adding the event handler again

      // Add event listener for 'click'
      button.addEventListener("click", () => {
        // Check if user is logged in (For example, checking localStorage for a 'user' key)
        const userLoggedIn = localStorage.getItem("user"); // You can use your own method to check login status

        if (!userLoggedIn) {
          // If the user is not logged in, ask to login
          const shouldLogin = confirm(
            "You are not logged in. Would you like to log in now?"
          );

          if (shouldLogin) {
            // Redirect to login page if user agrees to log in
            window.location.href = "login.html";
          } else {
            // Redirect to register page if user wants to register
            window.location.href = "register.html";
          }
        } else {
          // If logged in, proceed to add the item to the cart
          const title = button.getAttribute("data-title");
          const author = button.getAttribute("data-author");
          const price = parseInt(button.getAttribute("data-price"));
          const image = button.getAttribute("data-image");

          // Get the current cart from localStorage, or initialize as an empty array
          let cart = JSON.parse(localStorage.getItem("cart")) || [];

          // Check if the item is already in the cart
          const exists = cart.some((item) => item.title === title);
          if (exists) {
            alert(`${title} is already in the cart.`);
            return; // Do not add the item again if it's already there
          }

          // Add the item to the cart
          cart.push({ title, author, price, image });
          localStorage.setItem("cart", JSON.stringify(cart));

          alert(`${title} has been added to your cart.`);
        }
      });
    }
  });
});
