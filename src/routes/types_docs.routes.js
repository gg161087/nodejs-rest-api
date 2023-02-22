import { Router } from "express";
import { methods as types_docsController} from "../controllers/types_docs.controller";
import jwtMiddleware from '../middleware/authMiddleware';

const router = Router();

router.get("/", jwtMiddleware, types_docsController.getTypeDocs);
router.get("/:id", jwtMiddleware, types_docsController.getTypeDoc);
router.post("/", jwtMiddleware, types_docsController.createTypeDoc);
router.put("/:id", jwtMiddleware, types_docsController.updateTypeDoc);
router.delete("/:id", jwtMiddleware, types_docsController.deleteTypeDoc);

export default router;