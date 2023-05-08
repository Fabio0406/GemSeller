import { pool } from "../db.js";

export const renderVistaReportes = (req, res) => {
  const rep = [
    {tipo: "Ventas", valor: 1},
    {tipo: "Envios", valor: 2},
    
  ];
  res.render("reportes/reportes.ejs", { rep });
};

export const generarPDF = async (req, res) => {
  const valor = parseInt(req.params.valor);
  let topdf = {};

  if (valor == 1) {
    //REPORTE DE Ventas pdf

    topdf.head = ['user', 'nombre', 'correo', 'edad', 'fecha de nacimiento', 'ocupacion'];
    const [rows] = await pool.query('select user, usuario.nombre, correo, edad, fechaNac, ocupacion.nombre as ocu from usuario, ocupacion where ocupacion.id = idOcupacion;');

    let mat = [];
    rows.forEach((element, index, array) => {
      mat.push([element.user, element.nombre, element.correo, element.edad, element.fechaNac, element.ocu]);
    });
    topdf.body = mat;
    topdf.file = 'Reporte de Ventas.pdf';
    topdf.titulo = 'Reporte - Ventas Realizadas';

  } else if (valor == 2) {
    //REPORTES DE Envios pdf

    topdf.head = ['usuario', 'nombre', 'sexo', 'edad', 'telefono', 'tutor'];
    const [rows] = await pool.query('select paciente.usuario, usuario.nombre, paciente.sexo, usuario.edad, paciente.telefono, usuarioTutor as tutor from paciente, usuario where usuario.user = paciente.usuario;');

    let mat = [];
    rows.forEach((element, index, array) => {
      mat.push([element.usuario, element.nombre, element.sexo, element.edad, element.telefono, element.tutor]);
    });
    topdf.body = mat;
    topdf.file = 'Reporte de Envios.pdf';
    topdf.titulo = 'Reporte - Envios en curso';
  } 
  res.render('reportes/pdf.ejs', topdf);
};