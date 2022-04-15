const imageLink = document.getElementById("img");
const link = document.getElementById("link");
const btn = document.getElementById("createWidget");

const alreadyMade = localStorage.getItem("image");
if (alreadyMade) {
  document.body.innerHTML = alreadyMade;
}

btn.addEventListener("click", () => {
  const page = `<a class="href" href="${link.value}"><img class="image" src="${imageLink.value}"></a>`;
  document.body.innerHTML = page;
  localStorage.setItem("image", page);
});
