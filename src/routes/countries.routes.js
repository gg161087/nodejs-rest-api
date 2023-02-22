import { Router } from "express";
import { methods as countriesController} from "../controllers/countries.controller";
import jwtMiddleware from '../middleware/authMiddleware';

const router = Router();

router.get("/", jwtMiddleware, countriesController.getCountries);
router.get("/:id", jwtMiddleware, countriesController.getCountry);
router.post("/", jwtMiddleware, countriesController.createCountry);
router.put("/:id", jwtMiddleware, countriesController.updateCountry);
router.delete("/:id", jwtMiddleware, countriesController.deleteCountry);

export default router;