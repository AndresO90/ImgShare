//Modulo para la configuración de URLS, aquí solo van las urls que llaman a la función que está en el controlador o controllers,usando modelo vista controlador enrutamiento
const express = require('express'); //Lo importamos para usar el enrutador de express,es un modulo de express

const router = express.Router(); // Objeto que nos permite definir rutas del servidor

const home = require('../controllers/home');
const image = require('../controllers/image');
module.exports = app => {       //Exportamos función que recibe app de parametro y define las rutas

    router.get('/',home.index); //Cuando ingresa en la app inicial lista todas las imagenes 
    router.get('/images/:image_id',image.index);//listar imagen especifica
    router.get('/allimages',image.allImages)
    router.post('/images',image.create);//subir imagen
    router.post('/images/:image_id/like',image.like);//dar like con metodo ajax
    router.post('/images/:image_id/comment',image.comment);//poner comentarios
    router.delete('/images/:image_id',image.remove);//eliminar imagen

    
app.use(router)
};