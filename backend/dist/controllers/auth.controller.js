"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../utils/jwt");
const prisma = new client_1.PrismaClient();
const signup = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        const existingUser = await prisma.user.findFirst({
            where: { OR: [{ email }, { phone }] }
        });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const passwordHash = await bcryptjs_1.default.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                phone,
                passwordHash,
                role: 'CUSTOMER' // Default role
            }
        });
        const tokens = (0, jwt_1.generateTokens)(user.id, user.role);
        res.status(201).json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, ...tokens });
    }
    catch (error) {
        res.status(500).json({ message: 'Signup failed', error });
    }
};
exports.signup = signup;
const login = async (req, res) => {
    try {
        const { emailOrPhone, password } = req.body;
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: emailOrPhone },
                    { phone: emailOrPhone }
                ]
            }
        });
        if (!user || !(await bcryptjs_1.default.compare(password, user.passwordHash))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const tokens = (0, jwt_1.generateTokens)(user.id, user.role);
        res.status(200).json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, ...tokens });
    }
    catch (error) {
        res.status(500).json({ message: 'Login failed', error });
    }
};
exports.login = login;
