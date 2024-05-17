const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Return all users
exports.getAll = async (req, res) => {
    try {
        const response = await prisma.Users.findMany();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Return user by his id_utilizador
exports.getById = async (req, res) => {
    const id = req.params.id_utilizador;
    try {
        const response = await prisma.Users.findUnique({
            where: { id_utilizador: id },
        });
        if (!response) {
            return res.status(404).json({ msg: "Utilizador não encontrado" });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Create user
exports.create = async (req, res) => {
    const { nome, username, telemovel, password, email, foto } = req.body;

    if (!nome || !username || !telemovel || !password || !email) {
        return res.status(400).json({ msg: "Campos obrigatórios em falta" });
    }

    try {
        const existingUser = await prisma.Users.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(400).json({ msg: "O utilizador com este email já existe" });
        }

        const user = await prisma.Users.create({
            data: { nome, username, telemovel, password, email, foto },
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Update user
exports.update = async (req, res) => {
    const { id_utilizador, nome, username, telemovel, password, email, foto } = req.body;

    if (!id_utilizador || !nome || !username || !telemovel || !password || !email) {
        return res.status(400).json({ msg: "Campos obrigatórios em falta" });
    }

    try {
        const existingUser = await prisma.Users.findUnique({
            where: { id_utilizador },
        });

        if (!existingUser) {
            return res.status(404).json({ msg: "Utilizador não encontrado" });
        }

        const user = await prisma.Users.update({
            where: { id_utilizador },
            data: { nome, username, telemovel, password, email, foto },
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Delete user by his id_utilizador
exports.delete = async (req, res) => {
    const id = req.params.id_utilizador;
    try {
        const existingUser = await prisma.Users.findUnique({
            where: { id_utilizador },
        });

        if (!existingUser) {
            return res.status(404).json({ msg: "Utilizador não encontrado" });
        }

        await prisma.Users.delete({
            where: { id_utilizador },
        });
        res.status(200).send("Utilizador eliminado com sucesso");
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
