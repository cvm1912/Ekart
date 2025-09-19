import {Register, Login, sendResetOTP, verifyOTP, resetPassword} from '../Controller/AdminAuth.controller'
import {Router} from 'express'

const router = Router();

router.post('/register',
    /* #swagger.tags = ['Admin Auth']
    #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Admin registration',
        schema: {
            name: 'string',
            email: 'string',
            password: 'string',
            role: 'string'
        }
    } */
    Register)

router.post('/login',
    /* #swagger.tags = ['Admin Auth']
    #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Admin login',
        schema: {
            email: 'string',
            password: 'string',
            role: 'string'
        }
    } */
    Login)

router.post('/send-otp',
    /* #swagger.tags = ['Admin Auth']
    #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Send password reset OTP',
        schema: {
            email: 'string'
        }
    } */
    sendResetOTP)

router.post('/verify-otp',
    /* #swagger.tags = ['Admin Auth']
    #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Verify password reset OTP',
        schema: {
            email: 'string',
            otp: 'string'
        }
    } */
    verifyOTP)

router.post('/reset-password',
    /* #swagger.tags = ['Admin Auth']
    #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Reset password with OTP',
        schema: {
            email: 'string',
            otp: 'string',
            newPassword: 'string'
        }
    } */
    resetPassword);
export default router;

