const userModel = require('../model/userModel');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET || 'rahasia_development';
const register = async (req, res) => {
    const {
        username,
        email,
        password
    } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({});
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await userModel.createNewUser({
            username,
            email,
            password: hashedPassword
        });
        return res.status(201).json({
            message: 'Akun berhasil di buat',
            data: newUser
        });
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({
            message: 'Gagal melakukan registrasi pengguna',
            error: error.message
        });
    }
};

const login = async (req, res) => {
    const {
        username,
        password
    } = req.body;
    // 1. Cari user berdasarkan email di database 
    const user = await userModel.findUser(username);
    if (!user) {
        return res.status(401).json({
            message: 'username tidak ditemukan!!'
        });
    }
    // 2. Verifikasi password menggunakan bcrypt 
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({
            message: 'Email atau password salah'
        });
    }
    // 3. Buat JWT dengan masa berlaku 20 menit 
    const token = jwt.sign({
            id: user.id,
            email: user.email
        },
        JWT_SECRET, {
            expiresIn: '20m'
        }
    );
    res.status(200).json({
        message: 'Login berhasil',
        token
    });
};

module.exports = {
    register,
    login
};