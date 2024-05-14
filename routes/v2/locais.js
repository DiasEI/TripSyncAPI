const localRouter = require('express').Router();
const controller = require('../controllers/local');

//locais CRUD
localRouter.get('/', controller.getAll); //read all
localRouter.get('/:id', controller.getById); //read one by his id
localRouter.post('/create', controller.create); //create new local
localRouter.put('/update', controller.update); //update local
localRouter.delete('/delete/:id', controller.delete); //delete local

module.exports = localRouter;