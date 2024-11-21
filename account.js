document
  .getElementById("login-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    const response = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.json();
    if (response.ok) {
      alert(result.message);
    } else {
      alert(result.error);
    }
  });

document
  .getElementById("register-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;

    const response = await fetch("/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.json();
    if (response.ok) {
      alert(result.message);
    } else {
      alert(result.error);
    }
  });

async function handleFormSubmit(event, action) {
  event.preventDefault();
  const form = event.target;
  const username = form.querySelector("input[type='text']").value;
  const password = form.querySelector("input[type='password']").value;

  const response = await fetch("login.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ action, username, password }),
  });

  const result = await response.json();
  if (response.ok && result.message) {
    alert(result.message);
  } else {
    alert(result.error || "Algo Deu Errado");
  }
}

document
  .getElementById("login-form")
  .addEventListener("submit", (e) => handleFormSubmit(e, "login"));
document
  .getElementById("register-form")
  .addEventListener("submit", (e) => handleFormSubmit(e, "register"));
