const cart = JSON.parse(localStorage.getItem("cart")) || []; // Load cart data from localStorage or initialize as empty array
const cartItems = document.getElementById("cart-items");
const totalPriceElement = document.getElementById("total-price");


// Initialize the cart display on page load
updateCart();
document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", () => {
    const product = button.dataset.product;
    const price = parseFloat(button.dataset.price);
    
    // Add product to cart
    cart.push({ product, price });
    
    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCart();
  });
});

function updateCart() {
  cartItems.innerHTML = ""; // Clear the cart display
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.product} - $${item.price}`;

    // Add Remove button
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.className = "remove-button";
    removeButton.addEventListener("click", () => {
      removeFromCart(index);
    });

    li.appendChild(removeButton);
    cartItems.appendChild(li);
    total += item.price;
  });

  totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;
}

function removeFromCart(index) {
  cart.splice(index, 1); // Remove the item at the specified index

  // Save the updated cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  updateCart();
}
document.querySelectorAll(".view-details").forEach(button => {
  button.addEventListener("click", () => {
    const productDetails = {
      product: button.dataset.product,
      price: button.dataset.price,
      description: button.dataset.description,
      image: button.parentElement.parentElement.querySelector("img").src, // Extract image source
    };

    // Save product details to localStorage
    localStorage.setItem("productDetails", JSON.stringify(productDetails));

    // Redirect to the product details page
    window.location.href = "/product-details.html";
  });
});

