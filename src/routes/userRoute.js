import { Router } from "express";
import { methods as userController } from './../controllers/userController';
import jwtMiddleware from './../middleware/authMiddleware';

const router = Router();

router.post('/', userController.createUser);
router.get('/', jwtMiddleware, userController.getUsers);
router.get('/:id', userController.getUser);
//router.put('/:id', userController.updateUser);
//router.delete('/:id', userController.deleteUser);

export default router;