function calcWishList() {
  let heartIcon = document.querySelector(".heart-icon span");

  let itemsInDb = JSON.parse(localStorage.getItem("wishList")) || [];
  heartIcon.innerHTML = itemsInDb.length;
}
calcWishList();
