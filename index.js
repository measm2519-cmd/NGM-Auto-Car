let cart = [];

// Displayproducts Function
const Displayproducts = (products = cart) => {
  let show = ``;
  products.forEach((item) => {
    show += `<div class="col-12 col-sm-6 col-md-4 col-lg-3">
        <div class="card  pb-4 shadow-sm">
          <img  style="height: 350px;" class=" object-fit-cover"
            src="${item.image}" alt="">
          <div class=" w-100 px-2 py-2">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text flex-grow-1">${item.description.substring(
              0,
              40
            )}...</p>

            <h5  style="font-size: 15px;" class="card-title">${
              item.category
            }</h5>
            <p class="text-success fw-semibold fs-5">${item.price}</p>
          </div>
          <div class=" w-100 px-2">
            <a href="#" class="btn btn-primary mt-auto w-50">Add to Cart</a>
          </div>
        </div>
      </div>`;
  });
  document.getElementById("show-products").innerHTML = show;
};

fetch("https://measm2519-cmd.github.io/API-project/Fetch.json")
  .then((res) => res.json())
  .then((data) => {
    cart = data;
    Displayproducts();
  })
  .catch((err) => console.log(err));

// search Name products

document.getElementById("search-input").addEventListener("input", (e) => {
  const valuesearch = e.target.value.toLowerCase()
  const finds = cart.filter((pro) => {
    return pro.name.toLowerCase().includes(valuesearch)
  });
  if (finds.length > 0) {
    Displayproducts(finds);
  } else {
    document.getElementById("show-products").innerHTML = `
      
      <div class="w-100">
        <h4 class=" text-center text-danger">Search not found.</h4>
      </div>
    
  
    `;
  }
});
