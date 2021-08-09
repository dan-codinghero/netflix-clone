import { Router } from 'express';
import * as controller from '../controllers/plan-controller';

const router = Router();

router.get('/', controller.plans);

export default router;
