import {Register} from '../Controller/AdminAuth.controller'
import {Router} from 'express'

const router = Router();
router.post('/register', Register)
export default router;

