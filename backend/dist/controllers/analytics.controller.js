"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardStats = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getDashboardStats = async (req, res) => {
    try {
        const totalSalesAgg = await prisma.order.aggregate({
            _sum: { total: true },
            where: { status: { not: 'CANCELLED' } }
        });
        const totalSales = totalSalesAgg._sum.total || 0;
        const totalOrders = await prisma.order.count();
        const pendingOrders = await prisma.order.count({ where: { status: 'PENDING' } });
        const totalProducts = await prisma.product.count();
        const lowStockProducts = await prisma.product.count({ where: { stock: { lte: 5 } } });
        const totalUsers = await prisma.user.count({ where: { role: 'CUSTOMER' } });
        // Get sales for last 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const recentSales = await prisma.order.findMany({
            where: { createdAt: { gte: sevenDaysAgo }, status: { not: 'CANCELLED' } },
            select: { total: true, createdAt: true }
        });
        const salesChart = recentSales.reduce((acc, order) => {
            const date = order.createdAt.toISOString().split('T')[0];
            acc[date] = (acc[date] || 0) + Number(order.total);
            return acc;
        }, {});
        res.json({
            stats: {
                totalSales,
                totalOrders,
                pendingOrders,
                totalProducts,
                lowStockProducts,
                totalUsers
            },
            salesChart
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching stats', error });
    }
};
exports.getDashboardStats = getDashboardStats;
