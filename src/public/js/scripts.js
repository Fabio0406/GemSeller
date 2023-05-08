function productosEnElCarrito() {
  if (localStorage.carrito) {
    return JSON.parse(localStorage.carrito).length;
  } else {
    return 0;
  }
}

window.addEventListener("load", function () {
  /*  Animations initialization */
  new WOW().init();

 
  /* Numero del carrito */
  let cartNumber = document.querySelector(".cart-number");
  if(cartNumber){
    cartNumber.innerText = productosEnElCarrito();
  }
  

  /* Selecciono todos los productos de la página */
  let productos = document.querySelectorAll(".agregar_carrito");

  /* Creo un event listener por cada boton */
  productos.forEach((producto) => {
    producto.addEventListener("click", function (e) {
      if (localStorage.carrito) {
        let carrito = JSON.parse(localStorage.carrito);
        let index = carrito.findIndex((prod) => prod.id == e.target.id);
        if (index != -1) {
          carrito[index].cantidad = carrito[index].cantidad + 1;
        } else {
          carrito.push({ id: e.target.id, cantidad: 1 });
        }
        localStorage.setItem("carrito", JSON.stringify(carrito));
      } else {
        localStorage.setItem(
          "carrito",
          JSON.stringify([{ id: e.target.id, cantidad: 1 }])
        );
      }
      cartNumber.innerText = productosEnElCarrito();      
    });
  });
});