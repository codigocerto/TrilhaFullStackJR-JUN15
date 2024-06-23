const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = class UserController {
    static async register(req, res) {
        try {
            const { name, email, password, confirmPassword } = req.body;

            // Lista de campos obrigatórios
            const requiredFields = ['name', 'email', 'password', 'confirmPassword'];

            // Verifica se todos os campos obrigatórios estão presentes
            for (let field of requiredFields) {
                if (!req.body[field]) {
                    return res.status(422).json({ message: `${field} is required` });
                }
            }

            // Verificação se as senhas correspondem
            if (password !== confirmPassword) {
                return res.status(422).json({ message: 'Passwords do not match' });
            }

            // Verificação se o e-mail já existe
            const userExists = await User.findOne({ email: email });
            if (userExists) {
                return res.status(422).json({ message: 'This email is already in use, please use another' });
            }

            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(password, salt);

            // Se todas as verificações passarem, continue com o registro do usuário
            const newUser = new User({
                name,
                email,
                password: passwordHash
            });
            await newUser.save();

            // Resposta de sucesso após o registro do usuário
            return res.status(201).json({ message: 'User registered successfully' });

        } catch (error) {
            console.error('Error during user registration:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};