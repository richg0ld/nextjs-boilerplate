import {Router} from 'express';
import sample from './sample';

const router  = Router();

router.use('/sample', sample);

export default router;