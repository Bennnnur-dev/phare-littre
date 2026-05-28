const name_div = document.getElementById("nameInput");
const text_name = document.getElementById("texte_name");
const identifie = document.getElementById("identifie");
const error = document.querySelector(".error-msg");
const radio = document.getElementById("radio_option");
const form = document.querySelector("#contactForm");
const message = document.getElementById("message");
const anonyme = document.getElementById("anonymous");

identifie.addEventListener("click", function () {
  name_div.style.display = "inline-block";
});

anonyme.addEventListener("click", function () {
  name_div.style.display = "none";
  text_name.value = "";
});

form.addEventListener("submit", async e => {
  e.preventDefault();
  postFormEvent();
});

async function postData(data) {
  const donnee = await fetch("http://localhost:5500/form", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      data,
    }),
  });
  const json = await donnee.json();

  return json;
}

function getAnonymousSelection() {
  const selected = document.querySelector("input[name=anonyme]:checked");
  const value = selected.getAttribute("value") == "true" ? true : false;
  return value;
}

async function postFormEvent() {
  const data = Object.fromEntries(new FormData(form));
  const anonymous = getAnonymousSelection();
  const res = await postData({
    ...data,
    anonymous,
    name: anonymous ? "anonyme" : data.name,
  });
  console.log(res);
  if (res.code == 100) {
    error.style.display = "inline-block";
    error.textContent = res.msg.split(":")[2];
  } else if (res.code) {
    error.style.display = "inline-block";
    error.textContent = res.msg;
  }
  message.value = "";
  text_name.value = "";
}
