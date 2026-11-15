/* Carrito de compras — Tienda
   JavaScript puro, sin dependencias.
   Los productos se leen del HTML y el carrito vive en memoria. */

const cart = document.querySelector(".cart");
const cartIcon = document.querySelector("#cart-icon");
const closeCart = document.querySelector("#cart-close");
const cartContent = document.querySelector(".cart-content");
const totalElement = document.querySelector(".total-price");
const buyButton = document.querySelector(".btn-buy");

const items = [];

cartIcon.addEventListener("click", openCart);
closeCart.addEventListener("click", closeCartPanel);
buyButton.addEventListener("click", handleBuy);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeCartPanel();
});

document.querySelectorAll(".add-cart").forEach((button) => {
  button.addEventListener("click", handleAddToCart);
});

function openCart() {
  cart.classList.add("active");
  cartIcon.setAttribute("aria-expanded", "true");
}

function closeCartPanel() {
  cart.classList.remove("active");
  cartIcon.setAttribute("aria-expanded", "false");
}

function handleAddToCart(event) {
  const product = event.currentTarget.closest(".product-box");
  const title = product.querySelector(".product-title").textContent.trim();
  const price = parsePrice(product.querySelector(".product-price").textContent);
  const image = product.querySelector(".product-img");

  if (items.some((item) => item.title === title)) {
    alert("Este artículo ya está en el carrito.");
    return;
  }

  items.push({
    title,
    price,
    imgSrc: image.getAttribute("src"),
    imgAlt: image.getAttribute("alt") || title,
    quantity: 1,
  });

  renderCart();
  openCart();
}

// Delegación de eventos: funciona aunque el carrito se vuelva a renderizar.
cartContent.addEventListener("click", (event) => {
  const removeButton = event.target.closest(".cart-remove");
  if (!removeButton) return;

  items.splice(getIndex(removeButton), 1);
  renderCart();
});

cartContent.addEventListener("change", (event) => {
  const input = event.target.closest(".cart-quantity");
  if (!input) return;

  let quantity = Math.floor(Number(input.value));
  if (!Number.isFinite(quantity) || quantity < 1) quantity = 1;

  items[getIndex(input)].quantity = quantity;
  input.value = String(quantity);
  updateTotal();
});

function handleBuy() {
  if (items.length === 0) {
    alert("Tu carrito está vacío. Agregá un producto para continuar.");
    return;
  }

  // Demo: acá iría la llamada al backend o a la pasarela de pagos.
  items.length = 0;
  renderCart();
  closeCartPanel();
  alert("¡Pedido realizado con éxito! Gracias por tu compra.");
}

function getIndex(element) {
  return Number(element.closest(".cart-box").dataset.index);
}

function renderCart() {
  cartContent.replaceChildren();

  items.forEach((item, index) => {
    cartContent.appendChild(createCartItem(item, index));
  });

  updateTotal();
}

function createCartItem(item, index) {
  const box = document.createElement("div");
  box.className = "cart-box";
  box.dataset.index = String(index);

  const image = document.createElement("img");
  image.className = "cart-img";
  image.src = item.imgSrc;
  image.alt = item.imgAlt;
  image.width = 72;
  image.height = 72;
  image.loading = "lazy";

  const detail = document.createElement("div");
  detail.className = "detail-box";

  // textContent en lugar de innerHTML: evita inyección de HTML si los
  // productos algún día vienen de una API o de un panel de administración.
  const title = document.createElement("div");
  title.className = "cart-product-title";
  title.textContent = item.title;

  const price = document.createElement("div");
  price.className = "cart-price";
  price.textContent = formatPrice(item.price);

  const quantity = document.createElement("input");
  quantity.type = "number";
  quantity.className = "cart-quantity";
  quantity.min = "1";
  quantity.step = "1";
  quantity.value = String(item.quantity);
  quantity.setAttribute("aria-label", `Cantidad de ${item.title}`);

  const remove = document.createElement("button");
  remove.type = "button";
  remove.className = "cart-remove";
  remove.setAttribute("aria-label", `Quitar ${item.title} del carrito`);

  const icon = document.createElement("i");
  icon.className = "bx bxs-trash-alt";
  icon.setAttribute("aria-hidden", "true");
  remove.appendChild(icon);

  detail.append(title, price, quantity);
  box.append(image, detail, remove);

  return box;
}

function updateTotal() {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  totalElement.textContent = formatPrice(total);
}

function parsePrice(text) {
  // Acepta "$1.000", "$1.000,50" y "$15".
  const normalized = text
    .replace(/[^\d.,]/g, "")
    .replace(/\./g, "")
    .replace(",", ".");
  const value = Number(normalized);
  return Number.isFinite(value) ? value : 0;
}

function formatPrice(value) {
  return "$" + value.toLocaleString("es-AR", { maximumFractionDigits: 2 });
}
