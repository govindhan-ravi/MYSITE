import { Router } from 'express';
import { upload } from '../config/cloudinary';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticate, authorize(['ROOT_ADMIN', 'SUB_ADMIN']), upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    // Cloudinary storage puts the url in req.file.path
    res.json({ url: (req.file as any).path });
});

export default router;
