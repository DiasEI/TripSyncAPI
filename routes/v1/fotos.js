const fotoRouter = require('express').Router();
const controller = require('../controllers/v1/foto');

//fotos CRUD
fotoRouter.get('/', controller.getAll); //read all
fotoRouter.get('/:id', controller.getById); //read one by his id
fotoRouter.post('/create', controller.create); //create new foto
fotoRouter.put('/update', controller.update); //update foto
fotoRouter.delete('/delete/:id', controller.delete); //delete foto

module.exports = fotoRouter;