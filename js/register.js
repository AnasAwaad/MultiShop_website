let userName = document.querySelector("#name");
let userEmail = document.querySelector("#email");
let userpassword = document.querySelector("#password");
let btnRegister = document.querySelector("#btn-register");
let confirmpass = document.querySelector("#confirmpass");

btnRegister.addEventListener("click", register);

function register () {
  
  if (userName.value == "" || userEmail.value == "" || userpassword.value == "" || confirmpass.value == "") {
    alert("please fill data");
  } else {
  
    
    localStorage.setItem("name", userName.value);
    localStorage.setItem("email", userEmail.value);
    localStorage.setItem("password", userpassword.value);
    
    
    // wait 0s then redirect to login page
    setTimeout(() => {
      window.location = "login.html";
    }, 0);
  }


}