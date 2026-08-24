const container = document.getElementById("container");
const settings = document.getElementById("head-form");
const errMsg = document.getElementById("err-msg");

document.addEventListener("DOMContentLoaded", () => send(false, ""));

settings.addEventListener("input", async () => {
  const { important, search } = Object.fromEntries(new FormData(settings));
  console.log("IMP", important, search);
  await send(important, search);
});

const target = document.querySelector("footer");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(async entry => {
      if (entry.isIntersecting) {
        const { important, search } = Object.fromEntries(
          new FormData(settings),
        );
        await send(important, search);
      }
    });
  },
  {
    rootMargin: "100px",
  },
);

observer.observe(target);

async function send(imp = false, search = "") {
  const res = await getForms("", imp, search);
  if (res.code) {
    if (res.code === 401) return (location.href = "/connexion.html");
    errMsg.style.visibility = "visible";
    errMsg.textContent = res.msg;
  } else {
    renderForms(res.data);
  }
}

async function getForms(id, important, search) {
  const res = await fetch(
    `http://localhost:5500/form/admin?after=${id}&important=${important}&search=${search.trim()}`,
  );
  const data = await res.json();
  return data;
}

function renderForms(forms) {
  forms.forEach(form => {
    const date = new Intl.DateTimeFormat("en-GB").format(
      new Date(form.createdAt),
    );

    const article = document.createElement("article");
    article.classList.add("profile");
    article.dataset.id = form._id;
    const picture = document.createElement("div");
    picture.style.backgroundColor = form.color;
    picture.classList.add("profile-pic");
    picture.textContent = form.name[0].toUpperCase();
    article.appendChild(picture);
    const div = document.createElement("div");
    const h3 = document.createElement("h3");
    h3.classList.add("profile-name");
    h3.textContent = form.name;
    const dateDiv = document.createElement("div");
    dateDiv.classList.add("profile-date");
    dateDiv.textContent = date;
    div.appendChild(h3);
    div.appendChild(dateDiv);
    article.appendChild(div);
    const a = document.createElement("a");
    a.classList.add("profile-href");
    a.textContent = "Consulter";
    const params = new URLSearchParams({
      id: form._id,
    });
    a.href = `/profile.html?${params}`;
    article.appendChild(a);
    article.innerHTML += `
    <svg
    class="bookmark-svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            >
            <path
            d="${!form.important && typeof form.important === "boolean" ? "M128 128C128 92.7 156.7 64 192 64L448 64C483.3 64 512 92.7 512 128L512 545.1C512 570.7 483.5 585.9 462.2 571.7L320 476.8L177.8 571.7C156.5 585.9 128 570.6 128 545.1L128 128zM192 112C183.2 112 176 119.2 176 128L176 515.2L293.4 437C309.5 426.3 330.5 426.3 346.6 437L464 515.2L464 128C464 119.2 456.8 112 448 112L192 112z" : "M192 64C156.7 64 128 92.7 128 128L128 544C128 555.5 134.2 566.2 144.2 571.8C154.2 577.4 166.5 577.3 176.4 571.4L320 485.3L463.5 571.4C473.4 577.3 485.7 577.5 495.7 571.8C505.7 566.1 512 555.5 512 544L512 128C512 92.7 483.3 64 448 64L192 64z"}"
            />
            </svg>
            `;
    article.addEventListener("click", () => {
      const { id } = article.dataset;
      location.href = `/profile.html?id=${id}`;
    });

    container.appendChild(article);
  });
}
