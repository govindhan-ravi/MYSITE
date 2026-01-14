"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = exports.getProductById = exports.getProducts = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Get all products with filtering and pagination
const getProducts = async (req, res) => {
    try {
        const { page = 1, limit = 10, search, category, minPrice, maxPrice, sort } = req.query;
        const skip = (Number(page) - 1) * Number(limit);
        const where = {};
        if (search) {
            where.OR = [
                { name: { contains: String(search), mode: 'insensitive' } },
                { description: { contains: String(search), mode: 'insensitive' } },
            ];
        }
        if (category) {
            where.category = { slug: String(category) };
        }
        if (minPrice || maxPrice) {
            where.price = {
                gte: minPrice ? Number(minPrice) : undefined,
                lte: maxPrice ? Number(maxPrice) : undefined,
            };
        }
        let orderBy = { createdAt: 'desc' };
        if (sort === 'price_asc')
            orderBy = { price: 'asc' };
        if (sort === 'price_desc')
            orderBy = { price: 'desc' };
        const products = await prisma.product.findMany({
            where,
            skip,
            take: Number(limit),
            orderBy,
            include: { category: true, variants: true }
        });
        const total = await prisma.product.count({ where });
        res.json({
            data: products,
            meta: {
                total,
                page: Number(page),
                limit: Number(limit),
                pages: Math.ceil(total / Number(limit))
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
};
exports.getProducts = getProducts;
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await prisma.product.findUnique({
            where: { id: String(id) },
            include: { category: true, variants: true }
        });
        if (!product)
            return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching product', error });
    }
};
exports.getProductById = getProductById;
const createProduct = async (req, res) => {
    try {
        const { name, description, price, stock, categoryId, SKU, images } = req.body;
        // SKU must be unique, handled by Prisma but good to check or catch
        const product = await prisma.product.create({
            data: {
                name,
                description,
                price: Number(price),
                stock: Number(stock),
                sku: SKU,
                categoryId,
                images: images || [],
            }
        });
        res.status(201).json(product);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating product', error });
    }
};
exports.createProduct = createProduct;
