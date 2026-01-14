import { Router } from 'express';
import { createOrder, getOrders, updateOrderStatus } from '../controllers/order.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticate);

router.post('/', createOrder);
router.get('/', getOrders);
router.patch('/:id/status', authorize(['ROOT_ADMIN', 'SUB_ADMIN']), updateOrderStatus);

export default router;
