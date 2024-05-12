const fs = require('fs');

//return all users
exports.getAll = async (req, res) => {
    //read local data json file
    const datajson = fs.readFileSync("data/local/data.json", "utf-8"); 
    //parse to json
    const data = JSON.parse(datajson);
    //returns users array
    return res.send(data.users);
}

//return user by his id_utilizador
exports.getById = async (req, res) => {
    //get user id requested
    const id = req.params.id_utilizador;
    //read local data json file
    const datajson = fs.readFileSync("data/local/data.json", "utf-8"); 
    //parse to json
    const data = JSON.parse(datajson);
    //finds user by his id
    const user = data.users.filter(user => user.id_utilizador == id);
    //return user
    res.send(user);
}

//creates user
exports.create = async (req, res) => {
    //get requested user properties
    const { id_utilizador, username, telemovel, password, email, foto } = req.body;
    //read local data json file
    const datajson = fs.readFileSync("data/local/data.json", "utf-8"); 
    //parse to json
    const data = JSON.parse(datajson);
    //add to users array
    data.users.push(req.body);
    fs.writeFileSync('data/local/data.json', JSON.stringify(data));
    //return new user
    return res.status(201).send(req.body);
}

//updates user
exports.update = async (req, res) => {
    //get requested user properties
    const { id_utilizador, username, telemovel, password, email, foto } = req.body;
    //read local data json file
    const datajson = fs.readFileSync("data/local/data.json", "utf-8");
    //parse to json
    const data = JSON.parse(datajson);
    //find user to update
    const user = data.users.find(user => user.id_utilizador == id);
    //update properties
    user.username = username;
    user.telemovel = telemovel;
    user.password = password;
    user.email = email;
    user.foto = foto;
    //update local database
    fs.writeFileSync('data/local/data.json', JSON.stringify(data));
    //return updated user
    return res.send({ id_utilizador, username, telemovel, password, email, foto });
}

//delete user by his id_utilizador
exports.delete = async (req, res) => {
    //get user id requested
    const id = req.params.id_utilizador;
    //read local data json file
    const datajson = fs.readFileSync("data/local/data.json", "utf-8"); 
    //parse to json
    const data = JSON.parse(datajson);
    //find user to delete
    const user = data.users.filter(user => user.id_utilizador == id);
    //delete user
    data.users.splice(user, 1);
    //update local database
    fs.writeFileSync('data/local/data.json', JSON.stringify(data));
    //return ok
    return res.status(200).send("ok");
}