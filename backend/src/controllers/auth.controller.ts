import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { generateTokens } from '../utils/jwt';

const prisma = new PrismaClient();

export const signup = async (req: Request, res: Response) => {
    try {
        const { name, email, phone, password } = req.body;

        const existingUser = await prisma.user.findFirst({
            where: { OR: [{ email }, { phone }] }
        });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                phone,
                passwordHash,
                role: 'CUSTOMER' // Default role
            }
        });

        const tokens = generateTokens(user.id, user.role);

        res.status(201).json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, ...tokens });
    } catch (error) {
        res.status(500).json({ message: 'Signup failed', error });
    }
};

export const login = async (req: Request, res: Response) => {
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

        if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const tokens = generateTokens(user.id, user.role);

        res.status(200).json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, ...tokens });
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error });
    }
};
