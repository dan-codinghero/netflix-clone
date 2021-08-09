import { Router } from 'express';
import * as controller from '../controllers/account-controller';
import { addRouteValidator } from '../http/filters/account-validation-filters';
import { tokenAuthorization } from '../http/middleware/identity';
import { validatorResult } from '../http/middleware/model-validation';

const router = Router();

router.post('/', addRouteValidator, validatorResult, controller.add);

export default router;
