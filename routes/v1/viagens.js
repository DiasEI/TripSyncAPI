const viagemRouter = require('express').Router();
const controller = require('../controllers/v1/viagem');

//viagens CRUD
viagemRouter.get('/', controller.getAll); //read all
viagemRouter.get('/:idr', controller.getById); //read one by his id
viagemRouter.post('/create', controller.create); //create new viagem
viagemRouter.put('/update', controller.update); //update viagem
viagemRouter.delete('/delete/:idr', controller.delete); //delete viagem

module.exports = viagemRouter;