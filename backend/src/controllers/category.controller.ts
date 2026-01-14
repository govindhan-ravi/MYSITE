import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { sortOrder: 'asc' },
            include: { _count: { select: { products: true } } }
        });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories', error });
    }
};

export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name, slug, imageUrl, description, sortOrder } = req.body;
        const category = await prisma.category.create({
            data: {
                name,
                slug: slug || name.toLowerCase().replace(/ /g, '-'),
                imageUrl,
                description,
                sortOrder: sortOrder || 0
            }
        });
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Error creating category', error });
    }
};
