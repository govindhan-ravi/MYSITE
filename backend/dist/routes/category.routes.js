"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = require("../controllers/category.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.get('/', category_controller_1.getCategories);
router.post('/', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(['ROOT_ADMIN', 'SUB_ADMIN']), category_controller_1.createCategory);
exports.default = router;
