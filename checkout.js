let buttonCheckout = document.getElementById("buttonCheckout");
let listCart = [];

function checkCart() {
  var cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith("listCart="));
  if (cookieValue) {
    listCart = JSON.parse(cookieValue.split("=")[1]);
  }
}

checkCart();
addCartToHTML();

function addCartToHTML() {
  let listCartHTML = document.querySelector(".returnCart .list");
  listCartHTML.innerHTML = "";

  let totalQuantityHTML = document.querySelector(".totalQuantity");
  let totalPriceHTML = document.querySelector(".totalPrice");
  let totalQuantity = 0;
  let totalPrice = 0;
  if (listCart) {
    listCart.forEach((product) => {
      if (product) {
        let newCart = document.createElement("div");
        newCart.classList.add("item");
        newCart.innerHTML = `<img class="checkImg" src="${product.image}">
                    <div class="info">
                        <div class="name">${product.name}</div>
                        <div class="price">R$${product.price}/${
          product.quantity
        } un.</div>
                    </div>
                    
                    <div class="returnPrice">R$${(
                      product.price * product.quantity
                    ).toFixed(2)}</div>`;

        listCartHTML.appendChild(newCart);

        totalQuantity += product.quantity;
        totalPrice += product.price * product.quantity;
      }
    });
  }
  totalQuantityHTML.innerText = totalQuantity;
  totalPriceHTML.innerText = "R$" + totalPrice.toFixed(2);
}

function saveOrder() {
  let orderNumber = "P" + Math.floor(Math.random() * 100000);

  let orderDetails = {
    orderNumber: orderNumber,
    items: listCart,
    totalQuantity: document.querySelector(".totalQuantity").textContent,
    totalPrice: document.querySelector(".totalPrice").textContent,
  };

  fetch("/saveOrder.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderDetails),
  })
    .then((response) => response.text())
    .then((data) => {
      console.log(data);
      alert("Pedido Concluído! Código: " + orderNumber);
    })
    .catch((error) => console.error("Error saving order:", error));
}

buttonCheckout.addEventListener("click", saveOrder);

buttonCheckout.addEventListener("click", clearCart);

function clearCart() {
  listCart = [];
  document.cookie = "listCart=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  addCartToHTML();
}
