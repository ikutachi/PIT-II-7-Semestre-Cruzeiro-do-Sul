fetch("readOrder.php")
  .then((response) => response.json())
  .then((data) => displayOrders(data))
  .catch((error) => console.error("Error fetching order data:", error));

async function checkLoginStatus() {
  const response = await fetch("login.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ action: "check_login" }),
  });

  const result = await response.json();
  return result.loggedIn;
}

async function displayOrderPage() {
  const loggedIn = await checkLoginStatus();

  if (loggedIn) {
  } else {
    document.getElementById("order-page").style.display = "none";
    alert("Você Precisa Estar Logado Para Ver Esta Página");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  displayOrderPage();
});

function displayOrders(orders) {
  const orderList = document.getElementById("orderList");
  orderList.innerHTML = "";

  orders.forEach((order) => {
    const filename = order.filename.replace(".txt", "");

    const orderItem = document.createElement("div");
    orderItem.className = "order-item";

    const filteredContent = order.content
      .split("\n")
      .filter((line) => line.trim() !== "- Name: , Price: $, Quantity: ")
      .join("\n");

    orderItem.innerHTML = `
            <div class="oldOrder">        
            <div class="orderNo"><h2>Pedido: ${filename}</h2></div>
            <div class="orderDat"><pre>${filteredContent}</pre></div>
            </div>
        `;

    orderList.appendChild(orderItem);
  });
}
