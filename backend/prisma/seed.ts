import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting seeding...');

    // Cleanup
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.variant.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();

    // Create Admin
    const adminPassword = await bcrypt.hash('admin123', 10);
    await prisma.user.create({
        data: {
            name: 'Root Admin',
            email: 'admin@iframeyouu.com',
            passwordHash: adminPassword,
            role: 'ROOT_ADMIN'
        }
    });

    // Create Sub-Admins
    const subAdminPassword = await bcrypt.hash('subadmin123', 10);
    for (let i = 1; i <= 3; i++) {
        await prisma.user.create({
            data: {
                name: `Sub Admin ${i}`,
                email: `subadmin${i}@iframeyouu.com`,
                passwordHash: subAdminPassword,
                role: 'SUB_ADMIN'
            }
        });
    }

    // Create Categories
    const categoriesData = [
        { name: 'Photo Frames', slug: 'photo-frames' },
        { name: 'Explosion Boxes', slug: 'explosion-boxes' },
        { name: 'Custom Mugs', slug: 'custom-mugs' },
        { name: 'Neon Signs', slug: 'neon-signs' },
        { name: 'Valentine Specials', slug: 'valentine-specials' },
        { name: 'Corporate Gifts', slug: 'corporate-gifts' },
        { name: 'Premium Wraps', slug: 'premium-wraps' },
        { name: 'Keychains', slug: 'keychains' },
        { name: 'Wallets & Combos', slug: 'wallets-combos' },
        { name: 'Flower Bouquets', slug: 'flower-bouquets' }
    ];

    const categories = [];
    for (const cat of categoriesData) {
        const c = await prisma.category.create({ data: cat });
        categories.push(c);
    }

    // Create Products (10,000 items)
    console.log('📦 Generating 10,000 products...');
    const productsData = [];
    for (let i = 0; i < 10000; i++) {
        const category = categories[i % categories.length];
        productsData.push({
            name: `${category.name} - Design ${i + 1}`,
            description: `Beautiful customized ${category.name} for your loved ones. Premium quality.`,
            sku: `SKU-${category.slug}-${i + 1}`,
            price: Math.floor(Math.random() * 2000) + 499, // 499 to 2499
            stock: Math.floor(Math.random() * 100),
            categoryId: category.id,
            images: ['https://via.placeholder.com/400x400.png?text=Product+Image'],
            featured: i < 50 // First 50 are featured
        });
    }

    // Batch insert optimization is not directly supported for relations in createMany if not using foreign keys directly,
    // but here we use createMany for speed
    await prisma.product.createMany({
        data: productsData
    });

    console.log('✅ Seeding complete.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
