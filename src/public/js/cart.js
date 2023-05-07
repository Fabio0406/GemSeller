function productosEnElCarrito() {
  if (localStorage.carrito) {
    return JSON.parse(localStorage.carrito).length;
  } else {
    return 0;
  }
}

function removeItem(index) {
  if (carrito.length > 1) {
    carrito.splice(index, 1);
    products.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    document.getElementById(`row${index}`).remove();
  } else {
    localStorage.removeItem("carrito");
    products = [];
    setCarritoVacio();
  }

  let cartNumber = document.querySelector(".cart-number");
  cartNumber.innerText = productsEnElCarrito();

  document.querySelector(".totalAmount").innerText = `$ ${calcularTotal(
    products
  )}`;

  toastr.success("Se borro el item del carrito");
}

function setCarritoVacio() {
  cartRows.innerHTML = `
  <tr>     
      <td colspan="5"><div class="alert alert-warning my-2 text-center">No tienes products en el carrito</div></td>
  </tr>            
  `;
}
function vaciarCarrito() {
  localStorage.removeItem("carrito");
}

function calcularTotal(products) {
  return products.reduce(
    (acum, product) => (acum += product.price * product.quantity),
    0
  );
}

let cartRows = document.querySelector(".cartRows");
let products = [];
let Nitem = document.querySelector(".Nitem")
window.addEventListener("load", function() { 
  if (localStorage.carrito && localStorage.carrito != "[]") {
    let carrito = JSON.parse(localStorage.carrito);
    Nitem.innerHTML +=`<span>${productosEnElCarrito()} Items</span>`
    carrito.forEach(async(item, index) => {
      fetch(`/product/${item.id}`).then((res)=> res.json()).then((product)=> {
        if(product){
          cartRows.innerHTML += `
          <li>                            
                            <a class="cart-img" href="#"><img
                                src="images/${product.imagen}" alt="#"></a>
                            <h4><a href="#">${product.nombre}</a></h4>
                            <p class="quantity">${item.cantidad}x - <span class="amount">${product.precio}</span></p>
          </li>
          `
        }
      })   
    });
  } else {
    setCarritoVacio();
  }
})




let formCheckout = document.querySelector("#checkoutCart");

