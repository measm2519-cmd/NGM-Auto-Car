let cart = [];
let cartItem = [];
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
            <p class="card-text flex-grow-1">${item.description.substring(0,40)}...</p>

            <h5  style="font-size: 15px;" class="card-title">${
              item.category
            }</h5>
            <p class="text-success fw-semibold fs-5">$ ${item.price}</p>
          </div>
          <div class=" w-100 px-2">
           <button type="button" onclick="AddtoCart(${item.id})" 
            class="btn btn-primary mt-auto w-50 ">Add to Cart</button>
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
  const valuesearch = e.target.value.toLowerCase();
  const finds = cart.filter((pro) => {
    return pro.name.toLowerCase().includes(valuesearch);
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

// add to cart
const AddtoCart = (productId) => {
  const products = cart.find((p) => p.id === productId);
  const itemcart = cartItem.find((i) => i.id === productId);
  if (itemcart) {
    itemcart.qty += 1;
  } else {
    cartItem.push({ ...products, qty: 1 });
  }
  Swal.fire({
  position: "top-end",
  icon: "success",
  title: `${products.name} Add Your Cart`,
  showConfirmButton: false,
  timer: 1500
});
  Updatecart();
};

// update cart order

const Updatecart = () => {
  const tocart = document.getElementById("tocart");
  const cart_count = document.getElementById("cart-count");

  const totalItem = cartItem.reduce((sum, i) => sum + i.qty, 0);
  cart_count.innerHTML = totalItem;
  let show = ``;
  let showitem = ``;
  if (cartItem.length === 0) {
    tocart.innerHTML = `<h4 class=" text-center">Your Cart Is Empty</h4>`;
    show += `<div class="d-flex justify-content-between">
        <span>Subtotal</span>
        <span class="fw-semibold">$0</span>
      </div>
      <div class="d-flex justify-content-between">
        <span>Delivery</span>
        <span class="fw-semibold">$0</span>
      </div>
      <div class="d-flex justify-content-between fs-5 fw-bold mt-2">
        <span>Total</span>
        <span>$0</span>
      </div>
      <button onclick="Checkout()" class="btn btn-sm btn-outline-danger ms-2"><i class="bi bi-trash"></i></button>`;
    document.getElementById("cart-sumary").innerHTML = show;
  } else {
    cartItem.forEach((item) => {
      showitem += ` <div class="d-flex align-items-center border-bottom pb-3 mb-3">
        <img src="${item.image}"
          class="rounded" style="width: 70px; height: 70px; object-fit: cover;" alt="">
        <div class="ms-3 flex-grow-1">
          <h6 class="mb-1">${item.name}</h6>
          <p class="text-success fw-semibold mb-1">${item.price} $</p>
          <div class="d-flex align-items-center gap-2">
            <button  onclick="UpdateQty(${item.id},-1)" class="btn btn-sm btn-outline-secondary">-</button>
            <span>${item.qty}</span>
            <button onclick="UpdateQty(${item.id},1)" class="btn btn-sm btn-outline-secondary">+</button>
          </div>
        </div>
        <button onclick="RemoveCart(${item.id})" class="btn btn-sm btn-outline-danger ms-2"><i class="bi bi-trash"></i></button>
      </div>`;
    });
    tocart.innerHTML = showitem;
    // total
    let subtotal = cartItem.reduce((sum, pro) => sum + pro.qty * pro.price, 0);
    let delivery = 150 ;
    let total = subtotal + delivery;
    show += `<div class="d-flex justify-content-between">
        <span>Subtotal</span>
        <span class="fw-semibold">${subtotal.toFixed(2)} $</span>
      </div>
      <div class="d-flex justify-content-between">
        <span>Delivery</span>
        <span class="fw-semibold">${delivery}$</span>
      </div>
      <div class="d-flex justify-content-between fs-5 fw-bold mt-2">
        <span>Total</span>
        <span>${total} $</span>
      </div>
      <button onclick="Checkout()" class="btn btn-success w-100 mt-3"><i class="bi bi-credit-card me-2"></i>Proceed to Checkout</button>`;

    document.getElementById("cart-sumary").innerHTML = show;
  }
};

/// Remove FromCart
const RemoveCart = (productId) => {
  cartItem = cartItem.filter((i) => i.id !== productId);
  Updatecart();
};

// Update Qty

const UpdateQty = (productId, chang) => {
  const item = cartItem.find((i) => i.id === productId);
  if (item) {
    item.qty += chang;
    if (item.qty < 1) {
      RemoveCart(productId);
    } else {
      Updatecart();
    }
  }
};


// Checkout

const Checkout = () =>{
  if(cartItem.length === 0){
    
    Swal.fire({
  icon: "error",
  title: "Your Cart Is Empty",
  text: "PLease Order Product!",
  
  });
  }else{
    cartItem=[]
    Updatecart()
    Swal.fire({
  title: "Thank For Order",
  text: "Nice To Meet You..",
  icon: "success"
});
  }
}