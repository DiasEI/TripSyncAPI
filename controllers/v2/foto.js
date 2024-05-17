const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

// Return all fotos
exports.getAll = async (req, res) => {
    try {
        const response = await prisma.foto.findMany();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Return foto by its id_foto
exports.getById = async (req, res) => {
    const id = req.params.id_foto;
    try {
        const response = await prisma.foto.findUnique({
            where: { id_foto: id },
        });
        if (!response) {
            return res.status(404).json({ msg: "Foto não encontrada" });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Create foto
exports.create = async (req, res) => {
    const { imagemData, id_viagem } = req.body;

    if (!imagemData || !id_viagem) {
        return res.status(400).json({ msg: "Campos obrigatórios em falta" });
    }

    try {
        const foto = await prisma.foto.create({
            data: { imagemData, id_viagem },
        });
        res.status(201).json(foto);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Update foto
exports.update = async (req, res) => {
    const { id_foto, imagemData, id_viagem } = req.body;

    if (!id_foto || !imagemData || !id_viagem) {
        return res.status(400).json({ msg: "Campos obrigatórios em falta" });
    }

    try {
        const existingFoto = await prisma.foto.findUnique({
            where: { id_foto },
        });

        if (!existingFoto) {
            return res.status(404).json({ msg: "Foto não encontrada" });
        }

        const foto = await prisma.foto.update({
            where: { id_foto },
            data: { imagemData, id_viagem },
        });
        res.status(200).json(foto);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Delete foto by its id_foto
exports.delete = async (req, res) => {
    const id = req.params.id_foto;
    try {
        const existingFoto = await prisma.foto.findUnique({
            where: { id_foto },
        });

        if (!existingFoto) {
            return res.status(404).json({ msg: "Foto não encontrada" });
        }

        await prisma.foto.delete({
            where: { id_foto },
        });
        res.status(200).send("Foto eliminada com sucesso");
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
