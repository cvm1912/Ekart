import {UserRegister, UserVerify } from '../Controller/UserAuth.controller'
import {Router} from 'express'

const router = Router();

router.post('/register',
    /* #swagger.tags = ['User Auth']
    #swagger.parameters['obj'] = {
        in: 'body',
        description: 'User registration',
        schema: {
            name: 'string',
            email: 'string',
            password: 'string',
            confirmPassword: 'string',
            role: 'string'
        }
    } */
    UserRegister)

router.post('/verify',
    /* #swagger.tags = ['User Auth']
    #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Verify user email with OTP',
        schema: {
            email: 'string',
            otp: 'string'
        }
    } */
    UserVerify)


export default router;