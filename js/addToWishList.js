let heartIcon = document.querySelector(".heart-icon span");
heartIcon.addEventListener("click",function(){
  window.location = "wishlist.html";
})
function addToWishList(id) {
  let itemsInDb = JSON.parse(localStorage.getItem("wishList")) || [];
  let choosenItem = products.find((item) => item.id == id);

  if (itemsInDb) {
    let item = itemsInDb.find((i) => i.id == choosenItem.id);
    if (item) {
      console.log("exist in wish list");
    } else {
      itemsInDb.push(choosenItem);
    }
  } else {
    itemsInDb.push(choosenItem);
  }
  localStorage.setItem("wishList", JSON.stringify(itemsInDb));
  calcWishList();
}

function calcWishList() {
  let itemsInDb = JSON.parse(localStorage.getItem("wishList")) || [];
  heartIcon.innerHTML = itemsInDb.length;
}
calcWishList();