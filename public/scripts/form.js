const form = document.querySelector("form");
const errMsg = document.getElementById("err-msg");

form.addEventListener("submit", async e => {
  errMsg.style.visibility = "hidden";
  e.preventDefault();
  await submitForm();
});

async function postData(data) {
  const res = await fetch("http://localhost:5500/form", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      data,
    }),
  });
  const json = await res.json();

  return json;
}

async function submitForm() {
  const formData = Object.fromEntries(new FormData(form));
  const sanitized = {
    ...formData,
    name: !formData.name ? "anonyme" : formData.name.trim(),
    message: formData.message.trim(),
  };
  res = await postData(sanitized);
  handleRes(res);
}

function handleRes(res) {
  errMsg.style.visibility = "visible";
  // err
  if (res.code) {
    console.error(res);
    if (res.code === 100) return (errMsg.textContent = res.msg.split("%%")[1]);
    errMsg.textContent = res.msg;
  } else {
    errMsg.textContent = "Envoyé avec succès!";
    errMsg.style.color = "green";
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  }
}
