const viagemRouter = require('express').Router();
const controller = require('../../controllers/v2/viagem');

//viagens CRUD
viagemRouter.get('/', controller.getAll); //read all
viagemRouter.get('/:id', controller.getById); //read one by his id
viagemRouter.post('/create', controller.create); //create new viagem
viagemRouter.put('/update', controller.update); //update viagem
viagemRouter.delete('/delete/:id', controller.delete); //delete viagem
viagemRouter.get('/byUser/:id', controller.getViagensByUser);
module.exports = viagemRouter;