import { Router } from 'express';
import { methods as dependencesController} from '../controllers/dependences.controller';
import jwtMiddleware from '../middleware/authMiddleware';

const router = Router();

router.get('/', jwtMiddleware, dependencesController.getDependences);
router.get('/:id', jwtMiddleware, dependencesController.getDependence);
router.post('/', jwtMiddleware, dependencesController.createDependence);
router.put('/:id', jwtMiddleware, dependencesController.updateDependence);
router.delete('/:id', jwtMiddleware, dependencesController.deleteDependence);

export default router;