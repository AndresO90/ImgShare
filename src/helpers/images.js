const { Image } = require('../models');

module.exports = {
    async popular(){
        const images = await Image.find() //buscamos todas las imagenes
        .limit(8) //las limitamos a 9
        .sort({likes: -1}) //y las ordenamos de las que mas likes tienen a las k menos
    return images;
    }
}