//requerimos la info que usaremos en el sidebar
const Stats = require('./stats');
const Images = require('./images');
const Comments = require('./comments');

module.exports = async viewModel => {

   const results =  await Promise.all(
        [ Stats(),Images.popular(), Comments.newest()]//[[imagenesPopulares],{Estadisticas},[ComentariosNovedosos] ]
    );
    viewModel.sidebar = { //sidebar en una propiedad que creo con un objeto los resultados 
        stats : results[0],
        popular : results[1],
        comments :results[2]
    };
    
    return viewModel;
};