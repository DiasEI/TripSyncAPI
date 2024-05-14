const fs = require('fs');

// Return all fotos
exports.getAll = async (req, res) => {
    try {
        // Read local data JSON file
        const dataJson = fs.readFileSync("data/local/data.json", "utf-8"); 
        // Parse to JSON
        const data = JSON.parse(dataJson);
        // Return fotos array
        return res.send(data.fotos);
    } catch (error) {
        return res.status(500).send("Erro interno do servidor");
    }
}

// Return foto by its id_foto
exports.getById = async (req, res) => {
    try {
        // Get foto id requested
        const id = req.params.id_foto;
        // Read local data JSON file
        const dataJson = fs.readFileSync("data/local/data.json", "utf-8"); 
        // Parse to JSON
        const data = JSON.parse(dataJson);
        // Find foto by its id
        const foto = data.fotos.find(foto => foto.id_foto == id);
        // Check if foto exists
        if (!foto) {
            return res.status(404).send("Foto não encontrada");
        }
        // Return foto
        return res.send(foto);
    } catch (error) {
        return res.status(500).send("Erro interno do servidor");
    }
}

// Create foto
exports.create = async (req, res) => {
    try {
        // Read local data JSON file
        const dataJson = fs.readFileSync("data/local/data.json", "utf-8"); 
        // Parse to JSON
        const data = JSON.parse(dataJson);
        // Get requested foto properties
        const { imagemData, id_viagem } = req.body;
        // Generate new id_foto (auto-increment)
        const id_foto = data.fotos.length > 0 ? data.fotos[data.fotos.length - 1].id_foto + 1 : 1;
        // Create new foto object
        const newFoto = { id_foto, imagemData, id_viagem };
        // Add to fotos array
        data.fotos.push(newFoto);
        // Update local database
        fs.writeFileSync('data/local/data.json', JSON.stringify(data));
        // Return new foto
        return res.status(201).send(newFoto);
    } catch (error) {
        return res.status(500).send("Erro interno do servidor");
    }
}

// Update foto
exports.update = async (req, res) => {
    try {
        // Get requested foto properties
        const { id_foto, imagemData, id_viagem } = req.body;
        // Read local data JSON file
        const dataJson = fs.readFileSync("data/local/data.json", "utf-8");
        // Parse to JSON
        const data = JSON.parse(dataJson);
        // Find foto to update
        const foto = data.fotos.find(foto => foto.id_foto == id_foto);
        // Check if foto exists
        if (!foto) {
            return res.status(404).send("Foto não encontrada");
        }
        // Update properties
        foto.imagemData = imagemData;
        // Update local database
        fs.writeFileSync('data/local/data.json', JSON.stringify(data));
        // Return updated foto
        return res.send({ id_foto, imagemData, id_viagem });
    } catch (error) {
        return res.status(500).send("Erro interno do servidor");
    }
}

// Delete foto by its id_foto
exports.delete = async (req, res) => {
    try {
        // Get foto id requested
        const id = req.params.id_foto;
        // Read local data JSON file
        const dataJson = fs.readFileSync("data/local/data.json", "utf-8"); 
        // Parse to JSON
        const data = JSON.parse(dataJson);
        // Find foto to delete
        const fotoIndex = data.fotos.findIndex(foto => foto.id_foto == id);
        // Check if foto exists
        if (fotoIndex === -1) {
            return res.status(404).send("Foto não encontrada");
        }
        // Delete foto
        data.fotos.splice(fotoIndex, 1);
        // Update local database
        fs.writeFileSync('data/local/data.json', JSON.stringify(data));
        // Return ok
        return res.status(200).send("ok");
    } catch (error) {
        return res.status(500).send("Erro interno do servidor");
    }
}
