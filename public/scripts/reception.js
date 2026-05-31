const container = document.getElementById("container");

document.addEventListener("DOMContentLoaded", async () => {
  const res = await getForms("");
  console.log(res);
  renderForms(res.data);
});

async function getForms(id) {
  const res = await fetch(`http://localhost:5500/form?after=${id}`);
  const data = await res.json();
  return data;
}

function renderForms(forms) {
  let html = "";

  forms.forEach(form => {
    const date = new Intl.DateTimeFormat("en-GB").format(
      new Date(form.createdAt),
    );

    html += `
     <article class="profile">
          <div style="background-color: ${form.color}" class="profile-pic">${form.name[0].toUpperCase()}</div>
          <div>
            <h3 class="profile-name">${form.name}</h3>
            <div class="profile-date">${date}</div>
          </div>
          <a class="profile-href" href="">Consulter</a>
          <svg
            class="bookmark-svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
          >
            <path
              d="M128 128C128 92.7 156.7 64 192 64L448 64C483.3 64 512 92.7 512 128L512 545.1C512 570.7 483.5 585.9 462.2 571.7L320 476.8L177.8 571.7C156.5 585.9 128 570.6 128 545.1L128 128zM192 112C183.2 112 176 119.2 176 128L176 515.2L293.4 437C309.5 426.3 330.5 426.3 346.6 437L464 515.2L464 128C464 119.2 456.8 112 448 112L192 112z"
            />
          </svg>
        </article>
    `;

    container.innerHTML = html;
  });
}
