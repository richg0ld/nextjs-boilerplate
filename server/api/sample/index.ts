import {Router} from 'express';
import * as controller from './controller';

const router  = Router();

router.get('/api', controller.api);

export default router;