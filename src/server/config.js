//Modulo para la lógica del servidor, el codigo del servidor, 
const path = require('path'); // Modulo para unir directorios, decir donde estan...
const exphbs = require('express-handlebars');  //Motor de plantillas integrado con Express, HTML con mejoras...
const morgan = require('morgan'); //Para el servidor, da  info que pide el usuario desde el navegador, lo va pintando en consola
const multer = require('multer'); // Nos ayuda a subir imagenes al servidor
const express = require('express');
const errorHandler = require('errorhandler'); //Para manejar errores en desarrollo
const routes = require('../routes/index'); //Lo que importamos desde el index.js de routes

//Configuración de express en una función que exporto a index.js
module.exports = app => {

    //Settings
    app.set('port', process.env.PORT || 3000); //Establecemos puerto
    app.set('views', path.join(__dirname, '../views')); //Definir donde esta la carpeta de vistas,dirname devuelve src,que concatenamos con views

    //Handlebars settings
    app.engine('.hbs', exphbs({ //Para configurar el motor de plantillas
        defaultLayout: 'main', //Marco principal, la plantilla principal
        partialsDir: path.join(app.get('views'), 'partials'), //Partes de las vistas que se pueden reutilizar
        layoutsDir: path.join(app.get('views'), 'layouts'), //Plantilla de html que se reutiliza
        extname: '.hbs', //extension de mis archivos de handlenbars
        helpers: require('./helpers') //funciones que usare dentro de handlenbars
    }));
    app.set('view engine','.hbs');  //Para establecer handlenbars como motor de plantillas

    //middlewares
    app.use(morgan('dev')); // Configurar morgan, con dev                         image es el input file que tiene index.hbs que recoge la imagen
    app.use(multer({dest: path.join(__dirname, '../public/upload/temp')}).single('image')); // configurar multer con el destino de las imagenes y le decimos single de una sola imagen que puedan subir, cuando llame a image puedo ver info de la imagen
    app.use(express.urlencoded({extended: false})); // Para poder recibir datos desde formularios, en esta app imagenes
    app.use(express.json()); //Las peticiones AJAX van x JSON, para entender json, en este caso likes

    //routes
    routes(app); // a la función routes le pasamos como parametro app para que pueda usarlo

    //static files, archivos que no cambian, contenido estatico, para configurar la carpeta public
    app.use('/public', express.static(path.join(__dirname, '../public'))); //para que el usuario pueda acceder a la informacion dentro de la carpeta public localhost:3000/public/img

    //errorhandlers configuration
    if('development' === app.get('env')) { //devuelve el entorno donde estoy
        app.use(errorHandler)
    } //Si estamos en desarrollo usamos errorHandler

    return app;
}