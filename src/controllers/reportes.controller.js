import { pool } from "../db.js";

export const renderVistaReportes = (req, res) => {
  const rep = [
    {tipo: "Ventas", valor: 1},
    {tipo: "Envios", valor: 2},
    
  ];
  res.render("reportes", { rep });
};

export const generarPDF = async (req, res) => {
  const valor = parseInt(req.params.valor);
  let topdf = {};

  if (valor == 1) {
    //REPORTE DE Ventas pdf

    topdf.head = ['nombre', 'precio', 'descripcion', 'cantidad_disponible', 'categoria'];
    const rows = await pool.query('SELECT producto.id_producto,producto.nombre,producto.precio,producto.descripcion,inventario.cantidad_disponible,categoria.nombre as categoriaN FROM producto,inventario,categoria where inventario.id_producto = producto.id_producto and producto.id_categoria = categoria.id_categoria');

    let mat = [];
    rows.rows.forEach((element, index, array) => {
      mat.push([element.nombre, element.precio, element.descripcion, element.cantidad_disponible, element.categorian]);
    });
    topdf.body = mat;
    topdf.file = 'Reporte de Productos.pdf';
    topdf.titulo = 'Reporte - Productos';

  } else if (valor == 2) {
    //REPORTES DE Envios pdf

    topdf.head = ['id_cliente', 'fecha_compra', 'nombre', 'precio'];
    const rows = await pool.query('SELECT * FROM carrito,detalle_carrito,producto WHERE detalle_carrito.id_carrito = carrito.id_carrito and detalle_carrito.id_producto=producto.id_producto');
    console.log(rows.rows)
    let mat = [];
    rows.forEach((element, index, array) => {
      mat.push([element.id_cliente, element.fecha_compra, element.nombre, element.precio]);
    });
    topdf.body = mat;
    topdf.file = 'Reporte de Ventas.pdf';
    topdf.titulo = 'Reporte - Ventas';
  } 
  res.render('pdf.ejs', topdf);
};