const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

// Return all locais
exports.getAll = async (req, res) => {
    try {
        const response = await prisma.local.findMany();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Return local by its id_local
exports.getById = async (req, res) => {
    const id = req.params.id_local;
    try {
        const response = await prisma.local.findUnique({
            where: { id_local: id },
        });
        if (!response) {
            return res.status(404).json({ msg: "Local não encontrado" });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Create local
exports.create = async (req, res) => {
    const { nome, localizacao, tipo, classificacao, id_viagem } = req.body;

    if (!nome || !localizacao || !tipo || !classificacao || !id_viagem) {
        return res.status(400).json({ msg: "Campos obrigatórios em falta" });
    }

    try {
        const local = await prisma.local.create({
            data: { nome, localizacao, tipo, classificacao, id_viagem },
        });
        res.status(201).json(local);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Update local
exports.update = async (req, res) => {
    const { id_local, nome, localizacao, tipo, classificacao, id_viagem } = req.body;

    if (!id_local || !nome || !localizacao || !tipo || !classificacao || !id_viagem) {
        return res.status(400).json({ msg: "Campos obrigatórios em falta" });
    }

    try {
        const existingLocal = await prisma.local.findUnique({
            where: { id_local },
        });

        if (!existingLocal) {
            return res.status(404).json({ msg: "Local não encontrado" });
        }

        const local = await prisma.local.update({
            where: { id_local },
            data: { nome, localizacao, tipo, classificacao, id_viagem },
        });
        res.status(200).json(local);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Delete local by its id_local
exports.delete = async (req, res) => {
    const id = req.params.id_local;
    try {
        const existingLocal = await prisma.local.findUnique({
            where: { id_local },
        });

        if (!existingLocal) {
            return res.status(404).json({ msg: "Local não encontrado" });
        }

        await prisma.local.delete({
            where: { id_local },
        });
        res.status(200).send("Local eliminado com sucesso");
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
