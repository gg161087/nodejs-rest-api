import { Router } from "express";
import { methods as driverController} from "../controllers/drivers.controller";
import jwtMiddleware from '../middleware/authMiddleware';

const router = Router();

router.get("/", jwtMiddleware, driverController.getDrivers);
router.get("/:id", jwtMiddleware, driverController.getDriver);
router.post("/", jwtMiddleware, driverController.createDriver);
router.put("/:id", jwtMiddleware, driverController.updateDriver);
router.delete("/:id", jwtMiddleware, driverController.deleteDriver);

export default router;