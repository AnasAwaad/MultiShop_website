let userName = document.querySelector("#name");
let userPassword = document.querySelector("#password");
let btnLogin = document.querySelector("#btn-login");



btnLogin.addEventListener("click", login);

function login(){
  if(localStorage.getItem("name") && localStorage.getItem("password")){
  
  
    if(localStorage.getItem("name")==userName.value.trim() && localStorage.getItem("password")==userPassword.value){
      setTimeout(() => {
        window.location = "index.html";
      }, 0);
      console.log("correct")
    }else{
      alert("name or password is not correct")
    }
    
    
  }
}