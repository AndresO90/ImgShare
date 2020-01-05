const mongoose = require('mongoose');
const { Schema } = mongoose;
const path = require('path');
const ImageSchema = new Schema({
    title: {type : String},
    description: {type : String},
    filename: {type : String},
    views: {type : Number, default: 0},
    likes: {type : Number, default: 0},
    timestamp: {type : Date, default: Date.now}
});


                    //unique id srá el nombre de la foto sin extension,filename - ext
ImageSchema.virtual('uniqueId')   //variable virtual no se almacena en bbdd
    .get(function () {
        return this.filename.replace(path.extname(this.filename),'');//Para quedarnos solo el nombre de la foto,el filename sin la ext, sin la extension al pedir uniqueId, al llamarle
    });

    //Exportamos el modelo Image del esquema ImageSchema

module.exports = mongoose.model('Image', ImageSchema)
