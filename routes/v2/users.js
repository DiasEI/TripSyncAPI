const userRouter = require('express').Router();
const controller = require('../../controllers/v2/user');

//users CRUD
userRouter.get('/', controller.getAll); //read all
userRouter.get('/:id', controller.getById); //read one by his id
userRouter.post('/create', controller.create); //create new user
userRouter.put('/update', controller.update); //update user
userRouter.delete('/delete/:id', controller.delete); //delete user

module.exports = userRouter;