const fs = require('fs');

// Return all users
exports.getAll = async (req, res) => {
    try {
        // Read local data JSON file
        const datajson = fs.readFileSync("data/local/data.json", "utf-8"); 
        // Parse to JSON
        const data = JSON.parse(datajson);
        // Return users array
        return res.send(data.users);
    } catch (error) {
        return res.status(500).send("Erro interno do servidor");
    }
}

// Return user by his id_utilizador
exports.getById = async (req, res) => {
    try {
        // Get user id requested
        const id = req.params.id_utilizador;
        // Read local data JSON file
        const datajson = fs.readFileSync("data/local/data.json", "utf-8"); 
        // Parse to JSON
        const data = JSON.parse(datajson);
        // Find user by his id
        const user = data.users.find(user => user.id_utilizador == id);
        // Check if user exists
        if (!user) {
            return res.status(404).send("Utilizador não encontrado");
        }
        // Return user
        return res.send(user);
    } catch (error) {
        return res.status(500).send("Erro interno do servidor");
    }
}

// creates user
exports.create = async (req, res) => {
    try {
        // read local data json file
        const datajson = fs.readFileSync("data/local/data.json", "utf-8");
        // parse to json
        const data = JSON.parse(datajson);
        // get requested user properties
        const { username, telemovel, password, email, foto } = req.body;
        // generate new id_utilizador (auto-increment)
        const id_utilizador = data.users.length > 0 ? data.users[data.users.length - 1].id_utilizador + 1 : 1;
        // create new user object
        const newUser = { id_utilizador, nome, username, telemovel, password, email, foto };
        // add to users array
        data.users.push(newUser);
        // update local database
        fs.writeFileSync('data/local/data.json', JSON.stringify(data));
        // return new user
        return res.status(201).send(newUser);
    } catch (error) {
        return res.status(500).send("Erro interno do servidor");
    }
}

// Update user
exports.update = async (req, res) => {
    try {
        // Get requested user properties
        const { id_utilizador, nome, username, telemovel, password, email, foto } = req.body;
        // Read local data JSON file
        const datajson = fs.readFileSync("data/local/data.json", "utf-8");
        // Parse to JSON
        const data = JSON.parse(datajson);
        // Find user to update
        const user = data.users.find(user => user.id_utilizador == id_utilizador);
        // Check if user exists
        if (!user) {
            return res.status(404).send("Utilizador não encontrado");
        }
        // Update properties
        user.nome = nome;
        user.username = username;
        user.telemovel = telemovel;
        user.password = password;
        user.email = email;
        user.foto = foto;
        // Update local database
        fs.writeFileSync('data/local/data.json', JSON.stringify(data));
        // Return updated user
        return res.send({ id_utilizador, nome, username, telemovel, password, email, foto });
    } catch (error) {
        return res.status(500).send("Erro interno do servidor");
    }
}

// Delete user by his id_utilizador
exports.delete = async (req, res) => {
    try {
        // Get user id requested
        const id = req.params.id_utilizador;
        // Read local data JSON file
        const datajson = fs.readFileSync("data/local/data.json", "utf-8"); 
        // Parse to JSON
        const data = JSON.parse(datajson);
        // Find user to delete
        const userIndex = data.users.findIndex(user => user.id_utilizador == id);
        // Check if user exists
        if (userIndex === -1) {
            return res.status(404).send("Utilizador não encontrado");
        }
        // Delete user
        data.users.splice(userIndex, 1);
        // Update local database
        fs.writeFileSync('data/local/data.json', JSON.stringify(data));
        // Return ok
        return res.status(200).send("Utilizador eliminado com sucesso");
    } catch (error) {
        return res.status(500).send("Erro interno do servidor");
    }
}
