const number = document.getElementById("num");
const display = document.getElementById("display");

const count = localStorage.getItem("count");
count ? (display.innerHTML = count) : (display.innerHTML = 0);

number.addEventListener("change", (e) => {
  display.innerHTML = e.target.value;
  localStorage.setItem("count", e.target.value);
});

//! Ideas for widgets with local storage:
//* A counter -- A navitgation widget -- a self uploaded picture that can link to a url
