"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cloudinary_1 = require("../config/cloudinary");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.post('/', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(['ROOT_ADMIN', 'SUB_ADMIN']), cloudinary_1.upload.single('image'), (req, res) => {
    if (!req.file)
        return res.status(400).json({ message: 'No file uploaded' });
    // Cloudinary storage puts the url in req.file.path
    res.json({ url: req.file.path });
});
exports.default = router;
