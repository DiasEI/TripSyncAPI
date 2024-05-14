const fs = require('fs');

// Return all viagens
exports.getAll = async (req, res) => {
    try {
        // Read local data JSON file
        const dataJson = fs.readFileSync("data/local/data.json", "utf-8"); 
        // Parse to JSON
        const data = JSON.parse(dataJson);
        // Return viagens array
        return res.send(data.viagens);
    } catch (error) {
        return res.status(500).send("Erro interno do servidor");
    }
}

// Return viagem by its id_viagem
exports.getById = async (req, res) => {
    try {
        // Get viagem id requested
        const id = req.params.id_viagem;
        // Read local data JSON file
        const dataJson = fs.readFileSync("data/local/data.json", "utf-8"); 
        // Parse to JSON
        const data = JSON.parse(dataJson);
        // Find viagem by its id
        const viagem = data.viagens.find(viagem => viagem.id_viagem == id);
        // Check if viagem exists
        if (!viagem) {
            return res.status(404).send("Viagem não encontrada");
        }
        // Return viagem
        return res.send(viagem);
    } catch (error) {
        return res.status(500).send("Erro interno do servidor");
    }
}

// Create viagem
exports.create = async (req, res) => {
    try {
        // Read local data JSON file
        const dataJson = fs.readFileSync("data/local/data.json", "utf-8"); 
        // Parse to JSON
        const data = JSON.parse(dataJson);
        // Get requested viagem properties
        const { titulo, descricao, cidade, custos, data_inicio, data_fim, classificacao, pais, id_utilizador } = req.body;
        // Generate new id_viagem (auto-increment)
        const id_viagem = data.viagens.length > 0 ? data.viagens[data.viagens.length - 1].id_viagem + 1 : 1;
        // Create new viagem object
        const newViagem = { id_viagem, titulo, descricao, cidade, custos, data_inicio, data_fim, classificacao, pais, id_utilizador };
        // Add to viagens array
        data.viagens.push(newViagem);
        // Update local database
        fs.writeFileSync('data/local/data.json', JSON.stringify(data));
        // Return new viagem
        return res.status(201).send(newViagem);
    } catch (error) {
        return res.status(500).send("Erro interno do servidor");
    }
}

// Update viagem
exports.update = async (req, res) => {
    try {
        // Get requested viagem properties
        const { id_viagem, titulo, descricao, cidade, custos, data_inicio, data_fim, classificacao, pais, id_utilizador } = req.body;
        // Read local data JSON file
        const dataJson = fs.readFileSync("data/local/data.json", "utf-8");
        // Parse to JSON
        const data = JSON.parse(dataJson);
        // Find viagem to update
        const viagem = data.viagens.find(viagem => viagem.id_viagem == id_viagem);
        // Check if viagem exists
        if (!viagem) {
            return res.status(404).send("Viagem não encontrada");
        }
        // Update properties
        viagem.titulo = titulo;
        viagem.descricao = descricao;
        viagem.cidade = cidade;
        viagem.custos = custos;
        viagem.data_inicio = data_inicio;
        viagem.data_fim = data_fim;
        viagem.classificacao = classificacao;
        viagem.pais = pais;
        // Update local database
        fs.writeFileSync('data/local/data.json', JSON.stringify(data));
        // Return updated viagem
        return res.send({ id_viagem, titulo, descricao, cidade, custos, data_inicio, data_fim, classificacao, pais, id_utilizador });
    } catch (error) {
        return res.status(500).send("Erro interno do servidor");
    }
}

// Delete viagem by its id_viagem
exports.delete = async (req, res) => {
    try {
        // Get viagem id requested
        const id = req.params.id_viagem;
        // Read local data JSON file
        const dataJson = fs.readFileSync("data/local/data.json", "utf-8"); 
        // Parse to JSON
        const data = JSON.parse(dataJson);
        // Find viagem to delete
        const viagemIndex = data.viagens.findIndex(viagem => viagem.id_viagem == id);
        // Check if viagem exists
        if (viagemIndex === -1) {
            return res.status(404).send("Viagem não encontrada");
        }
        // Delete viagem
        data.viagens.splice(viagemIndex, 1);
        // Update local database
        fs.writeFileSync('data/local/data.json', JSON.stringify(data));
        // Return ok
        return res.status(200).send("Viagem eliminada com sucesso");
    } catch (error) {
        return res.status(500).send("Erro interno do servidor");
    }
}
