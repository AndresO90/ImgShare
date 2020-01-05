const { Schema, model } = require('mongoose');
const { ObjectId } = Schema; //const ObjectId = Schema.ObjectId

const CommentSchema = new Schema({
    image_id: { type: ObjectId },
    email: { type: String },
    name: { type: String },
    gravatar: { type: String},
    comment: { type:String },
    timestamp: { type:Date, default: Date.now }
});

//Creamos la propiedad virtual image que no se guarda en bbdd para usarla en helpers/comments.js
//Con el objetivo de usarlo para relacionar el comentario con su imagen

    CommentSchema.virtual('image')
    .set(function(image) {
        this._image = image;
    })
    .get(function() {
        return this._image;
    });

module.exports = model('Comment', CommentSchema);