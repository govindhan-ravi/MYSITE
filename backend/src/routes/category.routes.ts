import { Router } from 'express';
import { getCategories, createCategory } from '../controllers/category.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', getCategories);
router.post('/', authenticate, authorize(['ROOT_ADMIN', 'SUB_ADMIN']), createCategory);

export default router;
