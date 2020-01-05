//Modulo necesario para arrancar la aplicación, llama a config.js
const express = require('express');
const config = require('./server/config'); // función con configuración de express

//Database
require('./database'); //Al requerirlo así ejecuta el código de database.js

const app = config(express()); //a config le doy lo que express me devuelve(retorna app)
//Starting the server
app.listen(app.get('port'), () => { //Para establecer la conexión con el puerto.
    console.log("Server on port", app.get('port'));
});
