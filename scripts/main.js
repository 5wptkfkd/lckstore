let cart = [];

function addToCart(productName, price) {
  const item = cart.find(product => product.name === productName);
  if (item) {
    item.quantity += 1;
  } else {
    cart.push({ name: productName, price: price, quantity: 1 });
  }
  alert(`${productName} added to cart!`);
  updateCart();
}

function updateCart() {
  console.log("Current Cart:", cart);
}
