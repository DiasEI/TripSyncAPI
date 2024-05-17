const bcrypt = require('bcryptjs/dist/bcrypt');
const authenticateUtil = require('../../utils/authenticate.js');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

exports.signin = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await prisma.users.findUnique({
            where: {
                username: username,
            },
        })

        if (user) {
            var passwordIsValid = bcrypt.compareSync(
                password,
                user.password
            );

            if (passwordIsValid) {
                const accessToken = authenticateUtil.generateAccessToken({ id: user.id, nome: user.nome, email: user.email });
                res.status(200).json({ nome: user.nome, token: accessToken });
            }
        }

    } catch (error) {
        res.status(401).json({ msg: error.message })
    }
}


exports.signup = async (req, res) => {
    try {
        const { username, nome, email, password } = req.body;

        await prisma.users.create({
            data: {
                username: username,
                email: email,
                nome: nome,
                password: bcrypt.hashSync(password, 8),

            },
        })

        return this.signin(req, res);
    } catch (error) {
        res.status(401).json({ msg: error.message })
    }
}