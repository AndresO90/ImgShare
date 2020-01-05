//Encargado de las estadisticas
const { Comment, Image } = require('../models');

async function imageCounter() {
return await Image.countDocuments(); // Nos dice cuantas imagenes tengo en total
}

async function commentsCounter() {
    return await Comment.countDocuments(); // Nos dice cuantos comentarios hay
}

async function imageTotalViewsCounter() { // Nos da la suma de vistas de todas las imagenes
   const result = await Image.aggregate([{$group: { //de cada imagen va tomando las vistas y las va sumando
        _id: '1',
        viewsTotal : {$sum: '$views'} //viewsTotal = la suma de las views
    }}]);

    return result[0].viewsTotal; //result devuelve un array [{id:1,viewstotal:30}] pejemplo
}

async function likesTotalCounter() { //Total de likes de todas las imagenes
    const result = await Image.aggregate([{$group: {
        _id: '1',
        likesTotal : {$sum: '$likes'}
    }}]);
    return result[0].likesTotal;
}

//Como todas las funciones son async y no necesito que una espere a la otra, usamos el promise.all
//Así todas las funciones serán ejecutadas a la vez en paralelo
// Promise.all puede ejecutar un array de funciones
module.exports = async() => {

    const results = await Promise.all([
        imageCounter(),
        commentsCounter(),
        imageTotalViewsCounter(),
        likesTotalCounter()
    ]);
    //retornamos un objeto con los resultados de cada función
    return {
        images : results[0],
        comments : results[1],
        views : results[2],
        likes : results[3]
    }
}
