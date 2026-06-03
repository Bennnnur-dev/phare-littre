const errMsg = document.getElementById("err-msg");
const bodyContainer = document.getElementById("profile-body");
const headContainer = document.getElementById("profile-head");
const delButton = document.getElementById("del-button");

const id = new URLSearchParams(window.location.search).get("id") || "";

delButton.addEventListener("click", async () => {
  if (!confirm("Etes-vous sûr(e) de vouloir supprimer cette plainte ?")) return;

  const res = await deleteForm(id);
  console.log(res);
  if (res.code) {
    if (res.code === 401) return (location.href = "/connexion.html");
    errMsg.style.visibility = "visible";
    errMsg.textContent = res.msg;
  } else window.location.href = "/reception.html";
});

document.addEventListener("DOMContentLoaded", async () => {
  errMsg.style.visibility = "hidden";
  const res = await getForm(id);
  console.log(res);
  if (res.code) {
    if (res.code === 401) return (location.href = "/connexion.html");

    errMsg.style.visibility = "visible";
    errMsg.textContent = res.msg;
  } else {
  }
  sessionStorage.setItem("FORM", JSON.stringify(res.data));
  renderForm(res.data);
});

async function getForm(id) {
  const res = await fetch(`http://localhost:5500/form/admin/single/${id}`);
  const data = await res.json();
  return data;
}

async function deleteForm(id) {
  const res = await fetch(`http://localhost:5500/form/admin/single/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return data;
}

async function patchForm(form) {
  const res = await fetch(`http://localhost:5500/form/admin/single/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: form }),
  });
  const data = await res.json();
  return data;
}

function renderForm(data) {
  const date = new Intl.DateTimeFormat("en-GB").format(
    new Date(data.createdAt),
  );

  headContainer.innerHTML = `
<article id="profile-info">
          <div id="profile-pic" style="background-color: ${data.color}" class="profile-pic">${data.name[0].toUpperCase()}</div>
  <div>
    <h3 class="profile-name">${data.name}</h3>
    <div class="profile-date">${date}</div>
  </div>
</article>

 <button id="pin-button" data-state="${data.important ? "PIN" : "NOPIN"}">
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
     <path
       d="M192 64C156.7 64 128 92.7 128 128L128 544C128 555.5 134.2 566.2 144.2 571.8C154.2 577.4 166.5 577.3 176.4 571.4L320 485.3L463.5 571.4C473.4 577.3 485.7 577.5 495.7 571.8C505.7 566.1 512 555.5 512 544L512 128C512 92.7 483.3 64 448 64L192 64z"
     />
    </svg>
    <div>${data.important ? "Désépingler" : "Epingler"}</div>
</button>
    `;

  bodyContainer.innerHTML = `
            <p class="body-info">Elève harcelé(e): <span>${data.bullied ? "OUI" : "NON"}</span></p>
<p class="body-info">Date de l'incident: <span>${data.date ? data.date.split("-").join("/") : "N/A"}</span></p>
<p id="body-desc">
  ${data.message}
</p>

    `;

  const impButton = document.getElementById("pin-button");
  impButton.addEventListener("click", async () => {
    const { state } = impButton.dataset;
    console.log(state);
    const form = JSON.parse(sessionStorage.getItem("FORM"));
    const res = await patchForm({
      ...form,
      important: state === "NOPIN" ? true : false,
    });
    if (res.code) {
      errMsg.style.visibility = "visible";
      errMsg.textContent = res.msg;
      return;
    }
    if (state === "NOPIN") {
      impButton.dataset.state = "PIN";
      impButton.lastElementChild.textContent = "Désépingler";
    } else {
      impButton.dataset.state = "NOPIN";
      impButton.lastElementChild.textContent = "Epingler";
    }
  });
}
