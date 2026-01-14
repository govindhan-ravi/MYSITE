import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getDashboardStats = async (req: Request, res: Response) => {
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

        // Group by day using simple JS logic
        interface SalesChart {
            [key: string]: number;
        }

        const salesChart = recentSales.reduce((acc: SalesChart, order: { total: any, createdAt: Date }) => {
            const date = order.createdAt.toISOString().split('T')[0];
            acc[date] = (acc[date] || 0) + Number(order.total);
            return acc;
        }, {} as SalesChart);

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
    } catch (error) {
        res.status(500).json({ message: 'Error fetching stats', error });
    }
};
