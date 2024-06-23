const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Return all viagens
exports.getAll = async (req, res) => {
    try {
        const response = await prisma.Viagem.findMany();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Return viagem by its id_viagem
exports.getById = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await prisma.Viagem.findUnique({
            where: { id_viagem: id },
        });
        if (!response) {
            return res.status(404).json({ msg: "Viagem não encontrada" });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Create viagem
exports.create = async (req, res) => {
    const { titulo, descricao, cidade, custos, data_inicio, data_fim, classificacao, pais, id_utilizador } = req.body;

    if (!titulo || !descricao || !cidade || !custos || !data_inicio || !data_fim || !classificacao || !pais || !id_utilizador) {
        return res.status(400).json({ msg: "Campos obrigatórios em falta" });
    }

    try {
        const viagem = await prisma.viagem.create({
            data: {
                titulo,
                descricao,
                cidade,
                custos,
                data_inicio,
                data_fim,
                classificacao,
                pais,
                id_utilizador
            }
        });

        res.status(201).json(viagem);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Update viagem
exports.update = async (req, res) => {
    const {id_viagem, titulo, descricao, cidade, custos, data_inicio, data_fim, classificacao, pais, id_utilizador } = req.body;

    if (!id_viagem || !titulo || !descricao || !cidade || !custos || !data_inicio || !data_fim || !classificacao || !pais || !id_utilizador) {
        return res.status(400).json({ msg: "Campos obrigatórios em falta" });
    }

    try {
        const existingViagem = await prisma.viagem.findUnique({
            where: { id_viagem },
        });

        if (!existingViagem) {
            return res.status(404).json({ msg: "Viagem não encontrada" });
        }

        const updatedViagem = await prisma.viagem.update({
            where: { id_viagem },
            data: {
                titulo,
                descricao,
                cidade,
                custos,
                data_inicio,
                data_fim,
                classificacao,
                pais,
                id_utilizador
            },
        });

        res.status(200).json(updatedViagem);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Delete viagem by its id_viagem
exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        const existingViagem = await prisma.Viagem.findUnique({
            where: { id_viagem: id },
        });

        if (!existingViagem) {
            return res.status(404).json({ msg: "Viagem não encontrada" });
        }

        await prisma.Viagem.delete({
            where: { id_viagem: id },
        });
        res.status(200).send("Viagem eliminada com sucesso");
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Add fotos to a Viagem
exports.addFotos = async (req, res) => {
    const { id_viagem, foto } = req.body;

    if (!id_viagem || !foto || !Array.isArray(foto)) {
        return res.status(400).json({ msg: "Campos obrigatórios em falta" });
    }

    try {
        const existingViagem = await prisma.viagem.findUnique({
            where: { id_viagem },
        });

        if (!existingViagem) {
            return res.status(404).json({ msg: "Viagem não encontrada" });
        }

        // Prepare fotos data
        const fotosData = foto.map(foto => ({
            id_foto: foto.id_foto || undefined,
            imageData: Buffer.from(foto.imageData, 'base64'),
            id_viagem,
        }));

        // Add fotos to the database
        const createdFotos = await prisma.foto.createMany({
            data: fotosData,
        });

        res.status(201).json({ msg: "Fotos adicionadas com sucesso", fotos: createdFotos });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Get fotos by id_viagem
exports.getFotos = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ msg: "Campo id_viagem em falta" });
    }

    try {
        const fotos = await prisma.foto.findMany({
            where: { id_viagem: id },
            select: {
                id_foto: true,
                imageData: true,
            },
        });

        if (!fotos.length) {
            return res.status(404).json({ msg: "Nenhuma foto encontrada para esta viagem" });
        }

        const fotosResponse = fotos.map(foto => ({
            id_foto: foto.id_foto,
            imageData: foto.imageData.toString('base64'),
        }));

        res.status(200).json({ fotos: fotosResponse });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Add Local to a Viagem
exports.addLocal = async (req, res) => {
    const { id_viagem, locais } = req.body;

    if (!id_viagem || !Array.isArray(locais)) {
        return res.status(400).json({ msg: "Campos obrigatórios em falta" });
    }

    try {
        const existingViagem = await prisma.viagem.findUnique({
            where: { id_viagem },
        });

        if (!existingViagem) {
            return res.status(404).json({ msg: "Viagem não encontrada" });
        }

        // Prepare locais data
        const locaisData = locais.map(local => ({
            id_local: local.id_local || undefined,
            nome: local.nome,
            localizacao: local.localizacao,
            tipo: local.tipo,
            classificacao: local.classificacao,
            id_viagem
        }));

        // Add locais to the database
        const createdLocais = await prisma.local.createMany({
            data: locaisData,
        });

        res.status(201).json({ msg: "Locais adicionados com sucesso", locais: createdLocais });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Get locals by id_viagem
exports.getLocal = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ msg: "Campo id_viagem em falta" });
    }

    try {
        const locais = await prisma.local.findMany({
            where: { id_viagem: id },
            select: {
                id_local: true,
                nome: true,
                localizacao: true,
                tipo: true,
                classificacao: true,
            },
        });

        if (!locais.length) {
            return res.status(404).json({ msg: "Nenhum local encontrado para esta viagem" });
        }

        res.status(200).json({ locais });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//Return viagem by its id_viagem and by user logged
exports.getViagensByUser = async (req, res) => {
    const userId = req.params.id; // ID do usuário obtido dos parâmetros da solicitação

    try {
        const user = await prisma.Users.findUnique({
            where: { id_utilizador: userId },
            include: { Viagem: true }, // Inclui todas as viagens associadas a este usuário
        });

        if (!user) {
            return res.status(404).json({ msg: "Usuário não encontrado" });
        }

        res.status(200).json(user.Viagem);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

