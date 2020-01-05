//Encargado de la pagina principal, de mostrar imagenes...
//Un controlador es un objeto con funciones para exportar
const ctrl = {};
const { Image } = require('../models'); 
const sidebar = require('../helpers/sidebar'); //Funcion que hay en sidebars

ctrl.index = async (req, res) => {
   const images =  await Image.find().sort({ timestamp : -1});
   //console.log(images);
    let viewModel = {images : []};
    viewModel.images = images;
    viewModel = await sidebar(viewModel);
    //console.log(viewModel);
    console.log("viewModel.sidebar",viewModel.sidebar);
   
    res.render('index', viewModel); //Renderiza o pinta por pantalla el archivo index.hbs
};



module.exports = ctrl;