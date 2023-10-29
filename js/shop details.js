var slider_img=document.querySelector('.slider-image');
var images=['product-1.jpg','product-2.jpg','product-3.jpg','product-4.jpg']
var current_image=0;
var time =3000;

function prev(){
if (current_image<=0) 
    current_image=images.length;
current_image--;
return setImg();
}
function next(){
 if (current_image>=images.length-1) 
    current_image=-1;
 current_image++;
 return setImg();
}
function change_image(){

    if (current_image<images.length-1) {
        current_image++;
        setImg()
    }
    else
    {
        current_image=0;
        setImg();
    }
    setTimeout("change_image()",time)
}
function setImg(){
    return slider_img.setAttribute("src","images/"+images[current_image]);
}
function information(){
    document.getElementById("tab1").innerHTML=
        " Additional Information Eos no lorem eirmod diam diam, eos elitr et gubergren diam sea. Consetetur vero aliquyam invidunt duo dolores et duo sit. Vero diam ea vero et dolore rebum, dolor rebum eirmod consetetur invidunt sed sed et, lorem duo et eos elitr, sadipscing kasd ipsum rebum diam. Dolore diam stet rebum sed tempor kasd eirmod. Takimata kasd ipsum accusam sadipscing, eos dolores sit no ut diam consetetur duo justo est, sit sanctus diam tempor aliquyam eirmod nonumy rebum dolor accusam, ipsum kasd eos consetetur at sit rebum, diam kasd invidunt tempor lorem, ipsum lorem elitr sanctus eirmod takimata dolor ea invidunt.";
}
function reviews(){

}
function description(){
   
}
let tabs = document.querySelectorAll(".tabs li");
let tabsarry=Array.from(tabs);
let divs = document.querySelectorAll(".tab-content > div");
let divarry=Array.from(divs);
console.log(tabsarry);
// loop when clicking turn you to the tab 
tabsarry.forEach((ele) => {
    ele.addEventListener("click",function(e){
        tabsarry.forEach((ele)=>{
            ele.classList.remove("active");
        })
        e.currentTarget.classList.add("active")
        divarry.forEach((div)=>{
            div.style.display="none";
        })
     document.querySelector(e.currentTarget.dataset.content).style.display="block";   
    })
})
window.onload=change_image;


