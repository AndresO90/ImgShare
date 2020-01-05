const { Comment, Image} = require('../models');
module.exports = {

    async newest() {   //Los comentarios mas novedosos
        const comments = await Comment.find() //bucamos todos los comentarios
        .limit(5) //limite 5
        .sort({timestamp: -1}); //ordenamos por la fecha de creacion el timestand

        for (let comment of comments) {  //para mostrar tambien la imagen de los comentarios los recorremos
            let image = await Image.findOne({_id: comment.image_id})
            comment.image = image;
        }
        return comments;
    }
}