//Modulo para establecer conexión con la base de datos
const mongoose = require('mongoose'); //Módulo o driver de conexion con la bbdd y modular datos, conecta con mongodb

const { database } = require('./keys');

mongoose.connect(database.URI, { //Establece la conexión con una direccion, en este caso database.URI
    useNewUrlParser : true,
    useUnifiedTopology: true
})
.then(db =>console.log("DB is connected"))
.catch(err => console.error(err));