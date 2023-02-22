import { Router } from "express";
import {methods as locationsController} from "../controllers/locations.controller";
import jwtMiddleware from '../middleware/authMiddleware';

const router = Router();

router.get("/", jwtMiddleware, locationsController.getLocations);
router.get("/:id", jwtMiddleware, locationsController.getLocation);
router.post("/", jwtMiddleware, locationsController.createLocation);
router.put("/:id", jwtMiddleware, locationsController.updateLocation);
router.delete("/:id", jwtMiddleware, locationsController.deleteLocation);

export default router;