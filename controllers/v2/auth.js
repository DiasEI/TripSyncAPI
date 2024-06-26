const bcrypt = require('bcryptjs/dist/bcrypt');
const authenticateUtil = require('../../utils/authenticate.js');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.signin = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await prisma.Users.findUnique({
            where: {
                username: username,
            },
        });

        if (!user) {
            return res.status(404).json({ code: 404, msg: 'User not found' });
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password);

        if (!passwordIsValid) {
            return res.status(401).json({ code: 401, msg: 'Invalid password' });
        }

        const accessToken = authenticateUtil.generateAccessToken({ id: user.id, nome: user.nome, email: user.email });
        res.status(200).json({ code: 200, id: user.id_utilizador, nome: user.nome, token: accessToken });

    } catch (error) {
        res.status(500).json({ code: 500, msg: error.message });
    }
}

exports.signup = async (req, res) => {
    try {
        const { username, nome, email, telemovel, password, foto } = req.body;

        const existingUser = await prisma.Users.findUnique({
            where: { username: username },
        });

        if (existingUser) {
            return res.status(400).json({ code: 401, msg: 'Username already taken' });
        }

        const userData = {
            username: username,
            email: email,
            nome: nome,
            telemovel: telemovel,
            password: bcrypt.hashSync(password, 8),
        };

        if (foto) {
            if (foto.startsWith("data:image")) {
                const base64Data = foto.replace(/^data:image\/\w+;base64,/, '');
                const buffer = Buffer.from(base64Data, 'base64');
                userData.foto = buffer;
            } else {
                return res.status(402).json({ msg: 'Invalid format for foto field' });
            }
        }

        // Return success message and user data
        return res.status(200).json({ code: 200, msg: 'User created successfully'});

    } catch (error) {
        res.status(500).json({ code: 500, msg: error.message });
    }
}