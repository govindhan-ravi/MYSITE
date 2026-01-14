"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategory = exports.getCategories = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { sortOrder: 'asc' },
            include: { _count: { select: { products: true } } }
        });
        res.json(categories);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching categories', error });
    }
};
exports.getCategories = getCategories;
const createCategory = async (req, res) => {
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
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating category', error });
    }
};
exports.createCategory = createCategory;
