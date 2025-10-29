// logica.js

let products = [];
let cart = [];
let productsLoaded = 1;

// Carica i prodotti da back.json
function loadProducts() {
  fetch("./back.json")
    .then((res) => res.json())
    .then((data) => {
      products = data;
      renderProducts();
    })
    .catch((err) => console.error("Errore nel caricamento dei prodotti:", err));
}

// Mostra prodotti (8 alla volta)
function renderProducts() {
  const booksRow = document.getElementById("books-row");
  const slice = products.slice(productsLoaded, productsLoaded + 8);

  slice.forEach((p) => {
    const col = document.createElement("div");
    col.classList.add("col");
    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${p.image}" class="card-img-top" alt="${p.name}" />
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${p.name}</h5>
          <p class="card-text text-muted">${p.author}</p>
          <p class="fw-bold text-success">€${p.price.toFixed(2)}</p>
          <button class="btn btn-primary mt-auto add-to-cart-btn" data-id="${p.id}">
            Aggiungi al carrello
          </button>
        </div>
      </div>`;
    booksRow.appendChild(col);
  });

  productsLoaded += slice.length;

  // Nascondi bottone se non ci sono più prodotti
  if (productsLoaded >= products.length) {
    document.getElementById("load-more-btn").style.display = "none";
  }

  attachAddToCartListeners();
}

// Aggiungi listener per i pulsanti "Aggiungi al carrello"
function attachAddToCartListeners() {
  document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.dataset.id);
      addToCart(id);
    });
  });
}

// Aggiungi un prodotto al carrello
function addToCart(id) {
  const product = products.find((p) => p.id === id);
  const existing = cart.find((item) => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
}

// Rimuovi un prodotto dal carrello
function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  renderCart();
}

// Mostra il carrello
function renderCart() {
  const cartContainer = document.getElementById("cart-items");
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Il carrello è vuoto.</p>";
    document.getElementById("cart-total").innerText = "Totale: €0.00";
    return;
  }

  let html = `
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Prodotto</th>
          <th>Prezzo</th>
          <th>Quantità</th>
          <th>Totale</th>
          <th>Azioni</th>
        </tr>
      </thead>
      <tbody>
  `;

  let total = 0;
  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    html += `
      <tr>
        <td>${item.name}</td>
        <td>€${item.price.toFixed(2)}</td>
        <td>${item.quantity}</td>
        <td>€${itemTotal.toFixed(2)}</td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})">Rimuovi</button>
        </td>
      </tr>
    `;
  });

  html += "</tbody></table>";
  cartContainer.innerHTML = html;
  document.getElementById("cart-total").innerText = `Totale: €${total.toFixed(2)}`;
}

// Bottone "Carica altri libri"
document.getElementById("load-more-btn").addEventListener("click", renderProducts);

// Inizializzazione
