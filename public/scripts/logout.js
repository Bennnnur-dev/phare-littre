const button = document.getElementById("connect-a");
const footerButton = document.getElementById("footer-a");

button.addEventListener("click", logout);
footerButton.addEventListener("click", logout);
document.addEventListener("DOMContentLoaded", () => {
  const state = localStorage.getItem("LOG_STATE");
  if (state === "LOGIN") {
    button.textContent = "DECONNEXION";
    footerButton.textContent = "Déconnexion";
  } else {
    button.textContent = "CONNEXION";
    footerButton.textContent = "Connexion";
  }
});

async function logout() {
  try {
    const f = await fetch("http://localhost:5500/auth/logout");
    const res = await f.json();
    if (res.code) {
      throw new Error(res.msg);
    }
    window.location = "/connexion.html";
    localStorage.setItem("LOG_STATE", "LOGOUT");
    localStorage.clear();
  } catch (error) {
    console.error(error);
    alert(`Impossible de se déconnecter: ${error}`);
  }
}
