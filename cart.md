---
layout: null
---

<h1>Carrito</h1>

<div id="cart"></div>
<h2>Total: <span id="total"></span> €</h2>

<script>
  // Cargar carrito desde localStorage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const container = document.getElementById("cart");
  let total = 0;

  cart.forEach(item => {
    total += item.price;

    const div = document.createElement("div");
    div.style = "border:1px solid #ccc; padding:10px; margin:10px 0;";

    div.innerHTML = `
      <img src="${item.img}" width="120"><br>
      <strong>${item.name}</strong><br>
      Precio: ${item.price} €
    `;

    container.appendChild(div);
  });

  document.getElementById("total").textContent = total.toFixed(2);
</script>
