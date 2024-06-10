const viagemRouter = require('express').Router();
const controller = require('../../controllers/v2/viagem');

//viagens CRUD
viagemRouter.get('/', controller.getAll); //read all
viagemRouter.get('/:idr', controller.getById); //read one by his id
viagemRouter.post('/create', controller.create); //create new viagem
viagemRouter.put('/update', controller.update); //update viagem
viagemRouter.delete('/delete/:idr', controller.delete); //delete viagem
viagemRouter.get('/byUser/:idr', controller.getViagensByUser);
module.exports = viagemRouter;