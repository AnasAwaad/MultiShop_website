let carts = document.getElementById("featureCards");

function drowProductsUI() {
  let items = JSON.parse(localStorage.getItem("searchProducts"));
  if (items != null) {
    return (items = items
      .map((item) => {
        return `
        <div class="feature-card">
      <div class="feature-image">
        <img src=${item.img} alt="">
        <div class="feature-overlay">
          <ul class="overlay-content">
            <li  onclick="addCart(${item.id})"><i class="icon first-icon fa fa-shopping-cart fa-lg"></i></li>
            <li ><i class="icon sec-icon fa fa-heart fa-lg"></i></li>
            <li ><i class="icon third-icon fa fa-sync fa-lg"></i></li>
            <li ><i class="icon forth-icon fa fa-search fa-lg"></i></li>
          </ul>
        </div>
      </div>
      <div class="feature-info">
        <p class="feature-title"><a href="#">${item.title}</a></p>
        <p class="feature-amount">$${item.price} <del>${item.delPrice}</del></p>
        <div class="stars">
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <span>(99)</span>
        </div>
      </div>
    </div>`;
      })
      .join(""));
  }else{
    return `<h3 style="color:#777;">No product with this name</h3>`
  }
  
}

carts.innerHTML += drowProductsUI();
let txtSearch = document.getElementById("txt-search");
txtSearch.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    search( e.target.value);
  }
});

// search
function search( title) {
  let item = products.filter((item) => item.title.indexOf(title) != -1);
  if (item) {
    localStorage.setItem("searchProducts", JSON.stringify(item));
    drowProductsUI();
    carts.innerHTML = drowProductsUI();
  }
}







