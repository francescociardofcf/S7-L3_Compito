async function getData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
async function checkout(cartItems, checkoutUrl) {
  try {
    const response = await fetch(checkoutUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({items: cartItems}),
    });
    if (!response.ok) {
      throw new Error(`Checkout failed! Status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Checkout error:", error);
    throw error;
  }
}
// Example usage:
// getData('https://api.example.com/data')
//   .then(data => console.log(data))
//   .catch(err => console.error(err));
