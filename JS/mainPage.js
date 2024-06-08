var wecome = document.querySelector(".wecome");


var products = [];

var httpReq = new XMLHttpRequest();

httpReq.open("get", "https://forkify-api.herokuapp.com/api/search?q=mango");

httpReq.send();

httpReq.addEventListener("readystatechange", function () {
  if (httpReq.readyState == 4) {
    products = JSON.parse(httpReq.response).recipes;

    var cartona = "";
    for (var i = 0; i < products.length; i++) {
      cartona += `
      
      <div class="col-md-6 col-lg-4 col-xl-3 text-center">
       <div class="">
         <img src="${products[i].image_url}" class="w-100 pointer" alt="">
         <h3 class="text-black fw-medium">${products[i].title}</h3>
       </div>
                    
      </div>
      `;
    }
    document.querySelector(".row").innerHTML = cartona;
  }
});

