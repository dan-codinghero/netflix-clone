import { Router } from 'express';
import * as controller from '../controllers/auth-controller';
import { signupValidator } from '../http/filters/auth-validation-filters';
import { tokenAuthorization } from '../http/middleware/identity';
import { validatorResult } from '../http/middleware/model-validation';

const router = Router();

router.post('/signup', signupValidator, validatorResult, controller.signup);
router.post('/login', signupValidator, validatorResult, controller.login);
router.get('/refresh-token', controller.refreshToken);
router.get('/logout', tokenAuthorization, controller.logout);

export default router;
