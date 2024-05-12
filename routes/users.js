const userRouter = require('express').Router();
const controller = require('../controllers/user');

//users CRUD
userRouter.get('/', controller.getAll); //read all
userRouter.get('/:id_utilizador', controller.getById); //read one by his id (user number)
userRouter.post('/create', controller.create); //create new user
userRouter.put('/update', controller.update); //update user
userRouter.delete('/delete/:id_utilizador', controller.delete); //delete user

module.exports = userRouter;