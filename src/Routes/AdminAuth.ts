import {Register, Login, sendResetOTP} from '../Controller/AdminAuth.controller'
import {Router} from 'express'

const router = Router();
router.post('/register', Register)
router.post('/login', Login)
router.post('/send-otp', sendResetOTP)
export default router;

