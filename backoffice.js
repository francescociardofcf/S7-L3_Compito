/**
 * Simple Backoffice Logic Example
 * This module provides basic CRUD operations for managing products in a backoffice.
 */

const {type} = require("os");

// In-memory "database" for demonstration

fetch("./back.json")
  .then(response => response.json()) // Converte il JSON in un oggetto
  .then(back => {
    console.log(back.chiave); // Ora puoi accedere ai dati
  })
  .catch(error => {
    console.error("Errore nel recuperare il JSON:", error);
  });

const fs = typeof require !== "undefined" ? require("fs") : null;
let products;

// Try to load products from back.json if running in Node.js
if (typeof window === "undefined" && fs && fs.existsSync("./back.json")) {
  try {
    const data = fs.readFileSync("./back.json", "utf-8");
    products = JSON.parse(data);
  } catch (e) {
    // Fallback to default if error reading/parsing
    products = [
      {id: "1", name: "Laptop", price: 1200, stock: 10},
      {id: "2", name: "Smartphone", price: 800, stock: 25},
      {id: "3", name: "Headphones", price: 150, stock: 50},
    ];
  }
} else {
  products = undefined; // Will be set later depending on environment
}
if (typeof window !== "undefined") {
  // If running in browser, start with empty products array
  products = [];
  // Expose functions globally for index.html
  window.Backoffice = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
  };
} else {
  // Node.js: initialize products with demo data
  products = [
    {id: "1", name: "Laptop", price: 1200, stock: 10},
    {id: "2", name: "Smartphone", price: 800, stock: 25},
    {id: "3", name: "Headphones", price: 150, stock: 50},
  ];
}

// Create a new product
function createProduct(product) {
  product.id = Date.now().toString();
  products.push(product);
  return product;
}

// Read all products
function getAllProducts() {
  return products;
}

// Read a single product by ID
function getProductById(id) {
  return products.find(p => p.id === id) || null;
}

// Update a product by ID
function updateProduct(id, updatedFields) {
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return null;
  products[index] = {...products[index], ...updatedFields};
  return products[index];
}
/**
 * Attach event listeners to buttons if running in browser.
 * Assumes buttons have IDs: createBtn, updateBtn, deleteBtn, checkoutBtn, resetBtn
 */
if (typeof window !== "undefined") {
  window.addEventListener("DOMContentLoaded", () => {
    const $ = id => document.getElementById(id);

    if ($("createBtn")) {
      $("createBtn").onclick = () => {
        const name = prompt("Product name?");
        const price = parseFloat(prompt("Product price?"));
        const stock = parseInt(prompt("Product stock?"), 10);
        if (name && !isNaN(price) && !isNaN(stock)) {
          const product = window.Backoffice.createProduct({name, price, stock});
          alert("Created: " + JSON.stringify(product));
        } else {
          alert("Invalid input.");
        }
      };
    }

    if ($("updateBtn")) {
      $("updateBtn").onclick = () => {
        const id = prompt("Product ID to update?");
        const product = window.Backoffice.getProductById(id);
        if (!product) return alert("Product not found.");
        const name = prompt("New name?", product.name);
        const price = parseFloat(prompt("New price?", product.price));
        const stock = parseInt(prompt("New stock?", product.stock), 10);
        const updated = window.Backoffice.updateProduct(id, {name, price, stock});
        alert("Updated: " + JSON.stringify(updated));
      };
    }

    if ($("deleteBtn")) {
      $("deleteBtn").onclick = () => {
        const id = prompt("Product ID to delete?");
        const ok = window.Backoffice.deleteProduct(id);
        alert(ok ? "Deleted." : "Product not found.");
      };
    }

    if ($("checkoutBtn")) {
      $("checkoutBtn").onclick = () => {
        const id = prompt("Product ID to checkout?");
        const updated = window.Backoffice.checkoutProduct(id);
        alert(updated ? "Checked out: " + JSON.stringify(updated) : "Not found or out of stock.");
      };
    }

    if ($("resetBtn")) {
      $("resetBtn").onclick = () => {
        window.Backoffice.resetProducts();
        alert("Products reset.");
      };
    }
  });
}

// Delete a product by ID
function deleteProduct(id) {
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return false;
  products.splice(index, 1);
  return true;
}

// Export functions for use in other modules (Node.js only)
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    resetProducts,
    checkoutProduct,
  };
}

/**
 * Checkout function: reduces stock of a product by 1 if available.
 * Returns the updated product or null if out of stock or not found.
 */
function checkoutProduct(id) {
  const product = getProductById(id);
  if (!product || product.stock <= 0) return null;
  product.stock -= 1;
  return product;
}
/**
 * Add a function to reset the products array to its initial state.
 * Useful for testing or refreshing the backoffice data.
 */
function resetProducts() {
  products = [
    {id: "1", name: "Laptop", price: 1200, stock: 10},
    {id: "2", name: "Smartphone", price: 800, stock: 25},
    {id: "3", name: "Headphones", price: 150, stock: 50},
  ];
  return products;
}

// If running in browser, expose resetProducts and checkoutProduct globally
if (typeof window !== "undefined" && window.Backoffice) {
  window.Backoffice.resetProducts = resetProducts;
  window.Backoffice.checkoutProduct = checkoutProduct;
}
{
  ("css-button.json");
}
type: "json"("./css-button.json");
type = "json";
