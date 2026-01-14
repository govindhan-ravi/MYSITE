import { Router } from 'express';
import { getDashboardStats } from '../controllers/analytics.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();

router.get('/dashboard', authenticate, authorize(['ROOT_ADMIN', 'SUB_ADMIN']), getDashboardStats);

export default router;
