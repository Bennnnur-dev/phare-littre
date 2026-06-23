const form = document.querySelector("form");
const errMsg = document.getElementById("err-msg");

form.addEventListener("submit", async e => {
  e.preventDefault();
  errMsg.style.visibility = "hidden";
  const { password, username } = Object.fromEntries(new FormData(form));
  const res = await postData(password, username);
  if (res.code) {
    console.error(res);
    errMsg.style.visibility = "visible";
    if (res.code === 100) return (errMsg.textContent = res.msg.split("%%")[1]);
    errMsg.textContent = res.msg;
  } else {
    location.href = "/index.html";
    localStorage.setItem("LOG_STATE", "LOGIN");
  }
});

async function postData(password, username) {
  const res = await fetch("http://localhost:5500/auth/login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      credentials: {
        password,
        username,
      },
    }),
  });
  const json = await res.json();

  return json;
}
