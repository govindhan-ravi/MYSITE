import { Router } from 'express';
import { getProducts, getProductById, createProduct } from '../controllers/product.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', authenticate, authorize(['ROOT_ADMIN', 'SUB_ADMIN']), createProduct);

export default router;
