import {Register, Login, sendResetOTP, verifyOTP, resetPassword} from '../Controller/AdminAuth.controller'
import {Router} from 'express'

const router = Router();
router.post('/register', Register)
router.post('/login', Login)
router.post('/send-otp', sendResetOTP)
router.post('/verify-otp', verifyOTP)
router.post('/reset-password', resetPassword);
export default router;

