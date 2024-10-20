import express from "express";

import uploadMiddleware from "../middlewares/Upload";
import uploadController from "../controllers/UploadController";
import productsController from "../controllers/ProductsController";
import categoriesController from "../controllers/CategoriesController";
import orderController from "../controllers/OrderController";

import authController from '../controllers/AuthController';
import authMiddleware from '../middlewares/AuthMiddleware';
import rbacMiddleware from '../middlewares/RbacMiddleware';

const router = express.Router();

router.post("/auth/login",authController.login);
router.post("/auth/register", authController.register);
router.post("/auth/me", [authMiddleware, rbacMiddleware(["admin"])], authController.me);
router.put("/auth/update-profile", authMiddleware, authController.updateProfile);

router.get("/categories", categoriesController.findAll);
router.post("/categories", categoriesController.create);
router.get("/categories/:id", categoriesController.findOne);
router.put("/categories/:id", categoriesController.update);
router.delete("/categories/:id", categoriesController.delete);

router.get("/products", productsController.findAll);
router.post("/products", productsController.create);
router.get("/products/:id", productsController.findOne);
router.put("/products/:id", productsController.update);
router.delete("/products/:id", productsController.delete);

router.get("/orders", [authMiddleware], orderController.findAll);
router.post("/orders", [authMiddleware],orderController.create);
router.get("/orders/user", [authMiddleware], orderController.findAllByUser);
router.get("/orders/:id", [authMiddleware],orderController.findOne);
router.delete("/order", [authMiddleware], orderController.delete);

router.post("/upload", uploadMiddleware.single, uploadController.single);
router.post("/uploads", uploadMiddleware.multiple, uploadController.multiple);

export default router;
