async function loadAdminProducts() {
  const res = await fetch("./back.json");
  const products = await res.json();

  const container = document.getElementById("admin-products");
  container.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "col";
    card.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${product.img}" class="card-img-top" alt="${product.title}" />
        <div class="card-body">
          <h5>${product.title}</h5>
          <p>${product.category}</p>
          <p class="fw-bold">€${product.price.toFixed(2)}</p>
          <button class="btn btn-danger w-100" onclick="deleteProduct(${product.id})">Elimina</button>
        </div>
      </div>`;
    container.appendChild(card);
  });
}

function deleteProduct(id) {
  alert(`Prodotto #${id} eliminato (mock)!`);
}

document.getElementById("add-product-form").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Prodotto aggiunto (mock)!");
  e.target.reset();
});

window.addEventListener("DOMContentLoaded", loadAdminProducts);
