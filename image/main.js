const imageLink = document.getElementById("img");
const link = document.getElementById("link");
const btn = document.getElementById("createWidget");
setTimeout(() => {
    const edit = document.getElementById('edit')
    edit.addEventListener('click', ()=> {
        localStorage.setItem('image', '')
        location.reload()
    })
}, 200)

const alreadyMade = localStorage.getItem("image");
if (alreadyMade) {
  document.body.innerHTML = alreadyMade;
}

btn.addEventListener("click", () => {
  const page = `<a class="href" target="_blank" href="${link.value}"><img class="image" src="${imageLink.value}"></a> <div class="edit" id="edit"></div>`;
  document.body.innerHTML = page;
  localStorage.setItem("image", page);

  const edit = document.getElementById('edit')
  edit.addEventListener('click', ()=> {
      localStorage.setItem('image', '')
      location.reload()
  })
});
// localStorage.setItem('image', "")
