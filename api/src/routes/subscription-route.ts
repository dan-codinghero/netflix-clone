import { Router } from 'express';
import * as controller from '../controllers/subscription-controller';
import { tokenAuthorization } from '../http/middleware/identity';
import { validatorResult } from '../http/middleware/model-validation';

const router = Router();

router.post('/', tokenAuthorization, validatorResult, controller.add);

export default router;
