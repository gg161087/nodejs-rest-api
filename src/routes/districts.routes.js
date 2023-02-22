import { Router } from "express";
import { methods as districtsController} from "../controllers/districts.controller";
import jwtMiddleware from '../middleware/authMiddleware';

const router = Router();

router.get("/", jwtMiddleware, districtsController.getDistricts);
router.get("/:id", jwtMiddleware, districtsController.getDistrict);
router.post("/", jwtMiddleware, districtsController.createDistrict);
router.put("/:id", jwtMiddleware, districtsController.updateDistrict);
router.delete("/:id", jwtMiddleware, districtsController.deleteDistrict);

export default router;