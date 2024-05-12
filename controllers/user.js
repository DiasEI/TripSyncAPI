const fs = require('fs');

//return all users
exports.getAll = async (req, res) => {
    return res.send("ok");
}

//return user by his id_utilizador
exports.getById = async (req, res) => {
    //get user id requested
    const id = req.params.id_utilizador;
    //just return same id
    return res.send(id);
}

//creates user
exports.create = async (req, res) => {
    //get requested user properties
    const {id_utilizador, username, telemovel, password, email, foto } = req.body;
    //just return same new user
    return res.status(201).send(req.body);
}

//updates user
exports.update = async (req, res) => {
    //get requested user properties
    const {id_utilizador, username, telemovel, password, email, foto } = req.body;
    //just return same new user
    return res.send(req.body);
}

//delete user by his id_utilizador
exports.delete = async (req, res) => {
    //get student id requested
    const id = req.params.id_utilizador;
    //just return ok
    return res.send("ok");
}