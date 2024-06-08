const UserModel = require('../model/User-Model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createSecretToken } = require('./secret-token');

async function registerController(req, res, next) {
    try {
        const { fname, lname, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({ fname, lname, email, password: hashedPassword });
        const token = createSecretToken(user._id);
        res.cookie('token', token, {
            withCredentials: true,
            httpOnly: false,
        });
        res.status(201).send('User registered successfully');
        next();
    } catch (error) {
        console.error(error);
        if (error.code === 11000) {
            return res.status(400).send('Email already exists');
        }
        return res.status(500).send('Failed to register user');
    }
}

async function loginController(req, res) {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ message: "Invalid password" });
        }
        const token = createSecretToken(user._id);
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        });
        res.status(201).json({ message: "User logged in successfully", success: true });
    } catch (error) {
        console.error(error);
    }
}

async function LogoutController(req, res) {
    try {
        res.cookie('token', '', {
            httpOnly: true,
            expires: new Date(0)
        });
        return res.status(200).send('User logged out successfully');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Failed to logout');
    }
}

async function getUsersController(req, res) {
    try {
        const users = await UserModel.find({});
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to get user');
    }
}

function authenticateToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ isAuthenticated: false });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ isAuthenticated: false });
        }
        req.user = decoded;
        next();
    });
}

module.exports = { registerController, loginController, getUsersController, LogoutController, authenticateToken };