//Funciones relacionadas con imagenes
const path = require('path'); //
const { randomNumber } = require('../helpers/libs');
const fs = require('fs-extra'); // Para mover la imagen, extra para usar async await
const md5 = require('md5');

const { Image, Comment } = require('../models');
const sidebar = require('../helpers/sidebar');
const ctrl = {};

ctrl.allImages = async(req,res) => {
    const allimages = await Image.find()
    res.send(allimages)
}

ctrl.index = async(req, res) => {
    let viewModel = { image : {} , comments : {}}
    const image =  await Image.findOne({filename: {$regex: req.params.image_id}}); //Expresion regular para que contenga ese nombre, x no tiene el .jpg
    if(image) {
        image.views = image.views + 1; //para incrementar las vistas
        viewModel.image = image;
        await image.save(); //guardamos las vistas
        const comments = await Comment.find({image_id: image._id});
        viewModel.comments = comments;
        viewModel = await sidebar(viewModel)
        //console.log("image",image);
        res.render('image', viewModel); //pinta por pantalla la vista de una imagen con comentarios etc
    } else {
        res.redirect('/');
   } 
};

ctrl.create = (req, res) => {
    const saveImage = async () => {
    const imgURL = randomNumber(); //almacenamos el nombre aleatorio para la imagen
    const images = await Image.find({filename: imgURL});

        if (images.length > 0) { //Validamos que el nombre aleatorio no se repite, si no se llama a la funcion de nuevo
            saveImage();
        } else { //Si no se repite lo guardamos en la base de datos
            console.log("imgURL", imgURL);
            //console.log(req.file); Da un objeto con las propiedades de la imagen o documento que subimos
            const imageTempPath = req.file.path; //Para quedarnos solo la ruta, que está en la carpeta temporal Temp
            const ext = path.extname(req.file.originalname).toLowerCase(); //Usamos path para extraer la extension del nombre
            const targetPath = path.resolve(`src/public/upload/${imgURL}${ext}`); //Indicamos la carpeta destino/objetivo,debe moverlo de temp a upload con nombre de archivo aleatorio

            if (ext === '.jpg' || ext === '.png' || ext === '.jpeg' || ext === '.gif') {
                await fs.rename(imageTempPath, targetPath); //Mueve Guarda en la carpeta destido dsde la temporal
               
                const newImg = new Image({              //Creamos el modelo con los datos deseados requeridos
                    title: req.body.title,
                    filename: imgURL + ext,
                    description: req.body.description
                });
                const imageSave = await newImg.save(); //Lo guardamos en BBDD
                res.redirect('/images/' + imgURL); // t redireccionamo a otra ruta
                //res.send('Works');
                //console.log("newImg",newImg);
            } else {
                await fs.unlink(imageTempPath); //Elimino el archivo de la imagen del servidor de la carpeta temporal
                res.status(500).json({
                    error: 'Only Images are allowed'
                });
            }
        }
    };
    saveImage();
};

ctrl.like = async(req, res) => {
    const image = await Image.findOne({filename: {$regex: req.params.image_id}});
    if(image) { 
        image.likes = image.likes + 1;
        await image.save();
        res.json({likes : image.likes});
    } else {
        res.status(500).json({error: "Internal Error"});
    }
};
ctrl.comment = async(req, res) => {
    //console.log("req.body",req.body);
    const image = await Image.findOne({filename: {$regex: req.params.image_id}});
    if(image) {
        const newComment = new Comment(req.body); //creamos comentario pasandole los datos del body
        newComment.gravatar = md5(newComment.email); //para convertir el email en un hash para gravatar
        newComment.image_id = image._id; //le damos de la consulta de la l83 el image._id
        await newComment.save(); //guardamos en bbdd
        res.redirect('/images/'+image.uniqueId) // redireccionamos
    } else {
        res.redirect('/');
    }
};
ctrl.remove = async(req, res) => {
     const image = await Image.findOne({filename: {$regex: req.params.image_id}});
     
     if(image) {
         await fs.unlink(path.resolve('./src/public/upload/' + image.filename)); //unlink elimina un archvo con la ruta k le de
         await Comment.deleteOne({image_id: image._id}); //para elminar los comentarios relacionados a la imagen
         await image.remove(); //eliminamos la imagen de la bbdd
        console.log("image",image.filename);
         res.json(true); //respuesta
     }
};
module.exports = ctrl;