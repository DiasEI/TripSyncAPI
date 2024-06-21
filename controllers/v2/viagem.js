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
    const id = req.params.id_viagem;
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
    const { titulo, descricao, cidade, custos, data_inicio, data_fim, classificacao, pais, id_utilizador, foto } = req.body;

    if (!titulo || !descricao || !cidade || !custos || !data_inicio || !data_fim || !classificacao || !pais || !id_utilizador) {
        return res.status(400).json({ msg: "Campos obrigatórios em falta" });
    }

    try {
        let viagemData = {
            titulo,
            descricao,
            cidade,
            custos,
            data_inicio,
            data_fim,
            classificacao,
            pais,
            id_utilizador
        };

        if (foto) {
            if (foto.startsWith("data:image")) {
                const base64Data = foto.replace(/^data:image\/\w+;base64,/, '');
                const buffer = Buffer.from(base64Data, 'base64');
                viagemData.foto = buffer;
            } else {
                return res.status(402).json({ msg: 'Formato inválido para o campo foto' });
            }
        }

        const viagem = await prisma.Viagem.create({
            data: viagemData,
        });

        res.status(201).json(viagem);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Update viagem
exports.update = async (req, res) => {
    const { id_viagem, titulo, descricao, cidade, custos, data_inicio, data_fim, classificacao, pais, id_utilizador, foto } = req.body;

    if (!id_viagem || !titulo || !descricao || !cidade || !custos || !data_inicio || !data_fim || !classificacao || !pais || !id_utilizador) {
        return res.status(400).json({ msg: "Campos obrigatórios em falta" });
    }

    try {
        const existingViagem = await prisma.Viagem.findUnique({
            where: { id_viagem },
        });

        if (!existingViagem) {
            return res.status(404).json({ msg: "Viagem não encontrada" });
        }

        let viagemData = {
            titulo,
            descricao,
            cidade,
            custos,
            data_inicio,
            data_fim,
            classificacao,
            pais,
            id_utilizador
        };

        if (foto) {
            if (foto.startsWith("data:image")) {
                const base64Data = foto.replace(/^data:image\/\w+;base64,/, '');
                const buffer = Buffer.from(base64Data, 'base64');
                viagemData.foto = buffer;
            } else {
                return res.status(400).json({ msg: 'Formato inválido para o campo foto' });
            }
        }

        const updatedViagem = await prisma.Viagem.update({
            where: { id_viagem },
            data: viagemData,
        });

        res.status(200).json(updatedViagem);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Delete viagem by its id_viagem
exports.delete = async (req, res) => {
    const id = req.params.id_viagem;
    try {
        const existingViagem = await prisma.Viagem.findUnique({
            where: { id_viagem },
        });

        if (!existingViagem) {
            return res.status(404).json({ msg: "Viagem não encontrada" });
        }

        await prisma.Viagem.delete({
            where: { id_viagem },
        });
        res.status(200).send("Viagem eliminada com sucesso");
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

