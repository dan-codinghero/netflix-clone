import { Router } from 'express';
import * as controller from '../controllers/profile-controller';
import { addBulkRouteValidator, addRouteValidator } from '../http/filters/profile-validation-filters';
import { tokenAuthorization } from '../http/middleware/identity';
import { validatorResult } from '../http/middleware/model-validation';

const router = Router();

router.post('/', tokenAuthorization, addRouteValidator, validatorResult, controller.add);
router.post('/bulk', tokenAuthorization, addBulkRouteValidator, validatorResult, controller.addBulk);
router.get('/', tokenAuthorization, controller.get);

export default router;
