import { Router } from "express";
import { methods as provincesController} from "../controllers/provinces.controller";
import jwtMiddleware from '../middleware/authMiddleware';

const router = Router();

router.get("/", jwtMiddleware, provincesController.getProvinces);
router.get("/:id", jwtMiddleware, provincesController.getProvince);
router.post("/", jwtMiddleware, provincesController.createProvince);
router.put("/:id", jwtMiddleware, provincesController.updateProvince);
router.delete("/:id", jwtMiddleware, provincesController.deleteProvince);

export default router;