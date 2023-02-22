import { Router } from "express";
import { methods as userController } from '../controllers/user.controller';
import jwtMiddleware from '../middleware/authMiddleware';

const router = Router();

router.post('/', jwtMiddleware, userController.createUser);
router.get('/', jwtMiddleware, userController.getUsers);
router.get('/:id', jwtMiddleware, userController.getUser);
router.put('/:id', jwtMiddleware, userController.updateUser);
router.delete('/:id', jwtMiddleware, userController.deleteUser);

export default router;