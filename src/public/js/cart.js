let cartRows = document.querySelector(".cartRows");

let T =localStorage.carrito
  
let carrito = JSON.parse(T ? localStorage.carrito : 0);
  
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
  if(cartNumber){
    cartNumber.innerText = productosEnElCarrito();
  }
  

  document.querySelector(".totalAmount").innerText = `$ ${calcularTotal(
    products
  )}`;

  //toastr.success("Se borro el item del carrito");
}

function setCarritoVacio() {
  if(cartRows){
    cartRows.innerHTML = `
    <tr>     
        <td colspan="5"><div class="alert alert-warning my-2 text-center">No tienes products en el carrito</div></td>
    </tr>            
    `;
  }
  
}
function vaciarCarrito() {
  localStorage.removeItem("carrito");
}

function calcularTotal(products) {
  return products.reduce(
    (acum, product) => (acum += product.precio * product.cantidad),
    0
  );
}


let products = [];
if (localStorage.carrito && localStorage.carrito != "[]") {
  let carrito = JSON.parse(localStorage.carrito);
  carrito.forEach((item, index) => {
    fetch(`/product/${item.id}`)
      .then((res) => res.json())
      .then((product) => {
        if (product) {
          cartRows.innerHTML += `
            <tr id="row${index}">
                <th scope="row">${index + 1}</th>
                <td>${product.nombre}</td>
                <td>$ ${product.precio}</td>
                <td class="text-center">${item.cantidad}</td>
                <td class="text-center">$ ${parseFloat(
                  product.precio * item.cantidad,
                  2
                ).toFixed(2)}</td>
                <td><button class="btn btn-danger btn-sm" onclick=removeItem(${index})><i class="fas fa-trash"></i></button></td>
            </tr>            
            `;
          products.push({
            id_producto: product.id_producto,
            nombre: product.nombre,
            precio: product.precio,
            cantidad: item.cantidad,
          });
        } else {
          carrito.splice(index, 1);
          localStorage.setItem("carrito", JSON.stringify(carrito));
        }
      })
      .then(() => {
        document.querySelector(".totalAmount").innerText = `$ ${calcularTotal(
          products
        )}`;
      });
  });
} else {
  setCarritoVacio();
}

let formCheckout = document.querySelector("#checkoutCart");
if(formCheckout){
  formCheckout.onsubmit = (e) => {
    e.preventDefault();
    const formData = {
      orderItems: products,
      paymentMethod: formCheckout.paymentMethod.value,
      shippingMethod: formCheckout.shippingMethod.value,
      total: calcularTotal(products),
      Direccion: Direccion.value,
      Pais: Pais.value,
      Ciudad: Ciudad.value,
      Departamento: Departamento.value,  
      CodigoPostal: CoP.value
    };
    fetch("/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((res) => {
        if (res.ok) {
          //borro el carrito
          vaciarCarrito();
          location.href = `/`;
        } else {
          toastr.error("No se pudo realizar la compra, intente mas tarde");
        }
      })
      .catch((error) => console.log(error));
    // console.log(formCheckout.elements, formData, products);
  };
}



let Listcart = document.querySelector(".Listcart");

let Nitem = document.querySelector(".Nitem")

  if (localStorage.carrito && localStorage.carrito != "[]") {
    let carrito = JSON.parse(localStorage.carrito);
    if(Nitem){
      Nitem.innerHTML += `<span>${productosEnElCarrito()} Items</span>`
    }
    
    carrito.forEach(async (item, index) => {
      fetch(`/product/${item.id}`).then((res) => res.json()).then((product) => {
        if (product) {
          if(Listcart){
            Listcart.innerHTML += `
            <li>                            
                              <a class="cart-img" href="#"><img
                                  src="images/${product.imagen}" alt="#"></a>
                              <h4><a href="#">${product.nombre}</a></h4>
                              <p class="quantity">${item.cantidad}x - <span class="amount">${product.precio}</span></p>
            </li>
            `
          }
          
        }
      })
    });
  } else {
    setCarritoVacio();
  }