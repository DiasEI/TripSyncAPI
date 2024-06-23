const viagemRouter = require('express').Router();
const controller = require('../../controllers/v2/viagem');

//viagens CRUD
viagemRouter.get('/', controller.getAll); //read all
viagemRouter.get('/:id', controller.getById); //read one by his id
viagemRouter.post('/create', controller.create); //create new viagem
viagemRouter.post('/fotos', controller.addFotos); //add fotos
viagemRouter.get('/fotos/:id', controller.getFotos); //get fotos by id_viagem
viagemRouter.post('/local', controller.addLocal); //add local
viagemRouter.get('/local/:id', controller.getLocal); //get local by id_viagem
viagemRouter.put('/update/:id', controller.update); //update viagem
viagemRouter.delete('/delete/:id', controller.delete); //delete viagem
viagemRouter.get('/byUser/:id', controller.getViagensByUser);
module.exports = viagemRouter;