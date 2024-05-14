const fs = require('fs');

// Return all locais
exports.getAll = async (req, res) => {
    try {
        // Read local data JSON file
        const dataJson = fs.readFileSync("data/local/data.json", "utf-8"); 
        // Parse to JSON
        const data = JSON.parse(dataJson);
        // Return locais array
        return res.send(data.locais);
    } catch (error) {
        return res.status(500).send("Erro interno do servidor");
    }
}

// Return local by its id_local
exports.getById = async (req, res) => {
    try {
        // Get local id requested
        const id = req.params.id_local;
        // Read local data JSON file
        const dataJson = fs.readFileSync("data/local/data.json", "utf-8"); 
        // Parse to JSON
        const data = JSON.parse(dataJson);
        // Find local by its id
        const local = data.locais.find(local => local.id_local == id);
        // Check if local exists
        if (!local) {
            return res.status(404).send("Local não encontrado");
        }
        // Return local
        return res.send(local);
    } catch (error) {
        return res.status(500).send("Erro interno do servidor");
    }
}

// Create local
exports.create = async (req, res) => {
    try {
        // Read local data JSON file
        const dataJson = fs.readFileSync("data/local/data.json", "utf-8"); 
        // Parse to JSON
        const data = JSON.parse(dataJson);
        // Get requested local properties
        const { nome, localizacao, tipo, classificacao, id_viagem } = req.body;
        // Generate new id_local (auto-increment)
        const id_local = data.locais.length > 0 ? data.locais[data.locais.length - 1].id_local + 1 : 1;
        // Create new local object
        const newLocal = { id_local, nome, localizacao, tipo, classificacao, id_viagem };
        // Add to locais array
        data.locais.push(newLocal);
        // Update local database
        fs.writeFileSync('data/local/data.json', JSON.stringify(data));
        // Return new local
        return res.status(201).send(newLocal);
    } catch (error) {
        return res.status(500).send("Erro interno do servidor");
    }
}

// Update local
exports.update = async (req, res) => {
    try {
        // Get requested local properties
        const { id_local, nome, localizacao, tipo, classificacao, id_viagem } = req.body;
        // Read local data JSON file
        const dataJson = fs.readFileSync("data/local/data.json", "utf-8");
        // Parse to JSON
        const data = JSON.parse(dataJson);
        // Find local to update
        const local = data.locais.find(local => local.id_local == id_local);
        // Check if local exists
        if (!local) {
            return res.status(404).send("Local não encontrado");
        }
        // Update properties
        local.nome = nome;
        local.localizacao = localizacao;
        local.tipo = tipo;
        local.classificacao = classificacao;
        // Update local database
        fs.writeFileSync('data/local/data.json', JSON.stringify(data));
        // Return updated local
        return res.send({ id_local, nome, localizacao, tipo, classificacao, id_viagem });
    } catch (error) {
        return res.status(500).send("Erro interno do servidor");
    }
}

// Delete local by its id_local
exports.delete = async (req, res) => {
    try {
        // Get local id requested
        const id = req.params.id_local;
        // Read local data JSON file
        const dataJson = fs.readFileSync("data/local/data.json", "utf-8"); 
        // Parse to JSON
        const data = JSON.parse(dataJson);
        // Find local to delete
        const localIndex = data.locais.findIndex(local => local.id_local == id);
        // Check if local exists
        if (localIndex === -1) {
            return res.status(404).send("Local não encontrado");
        }
        // Delete local
        data.locais.splice(localIndex, 1);
        // Update local database
        fs.writeFileSync('data/local/data.json', JSON.stringify(data));
        // Return ok
        return res.status(200).send("Local eliminado com sucesso");
    } catch (error) {
        return res.status(500).send("Erro interno do servidor");
    }
}
