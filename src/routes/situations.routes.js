import { Router } from 'express';
import { methods as situationsController} from '../controllers/situations.controller';
import jwtMiddleware from '../middleware/authMiddleware';

const router = Router();

router.get('/', jwtMiddleware, situationsController.getSituations);
router.get('/:id', jwtMiddleware, situationsController.getSituation);
router.post('/', jwtMiddleware, situationsController.createSituation);
router.put('/:id', jwtMiddleware, situationsController.updateSituation);
router.delete('/:id', jwtMiddleware, situationsController.deleteSituation);

export default router;