//login and register
let loginRegister = document.querySelector("#login-register");
let userInfo = document.querySelector("#user-info");
let user = document.querySelector("#user");
let logout = document.querySelector("#logout");

if (localStorage.getItem("name")) {
  loginRegister.remove();
  userInfo.style.display = "flex";
  user.innerHTML = localStorage.getItem("name");
}

logout.addEventListener("click", function () {
  localStorage.clear();
  setTimeout(() => {
    window.location = "register.html";
  }, 0);
});