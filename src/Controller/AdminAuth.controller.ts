import {Request, Response} from 'express';
import prisma from '../Config/prisma';
import {hashPassword, comparePassword} from '../Utils/hasing'
import {generateToken} from '../Utils/jwt';
import {generateOTP,getOtpExpiry} from '../Utils/otp'
import {sendMail} from '../Utils/mailer'

export const Register = async (req: Request, res: Response) =>{
    
     const body = req.body || {};
     const { name, email, password, role} = body;

     if(!name || !email || !password || !role){
        return res.status(400).json({message: "name, email, password and role are required"});
     }

    const adminExists = await prisma.user.findUnique({where:{email}})
    if(adminExists){
        return res.status(400).json({message: "Admin with this email already exists"});
    }

    // hash password
    const hashedPassword = await hashPassword(password);

    // create admin
    const newAdmin = await prisma.user.create({
        data:{
            name,
            email,
            passwordHash: hashedPassword,
            role: role
        }
    })

    // generate token
    const token = generateToken(newAdmin.id, newAdmin.role);

    return res.status(201).json({
        message: "Admin registered successfully",
        admin: {
            id: newAdmin.id,
            name: newAdmin.name,    
            email: newAdmin.email,
            role: newAdmin.role,    
            token
        }
    });
}


export const Login = async(req: Request, res:Response)=>{
    const body = req.body || {};
    const {email, password, role} = body;

    if(!email || !password || !role){
        return res.status(400).json({message: "email, password and role are required"});
    }

    const admin = await prisma.user.findUnique({where:{email}})
    if(!admin){
        return res.status(400).json({message: "Admin with this email does not exist"});
    }

    // compare password
    if (!admin.passwordHash) {
        return res.status(400).json({message: "Invalid user data"});
    }

    const isPasswordValid = await comparePassword(password, admin.passwordHash);
    if(!isPasswordValid){
        return res.status(400).json({message: "Incorrect password"});
    }

    // genereate Token 
    const token = generateToken(admin.id, admin.role);

     return res.status(200).json({
        message: "Admin logged in successfully",
        admin: {
            id: admin.id,
            name: admin.name,    
            email: admin.email,
            token
        }
    });
}


export const sendResetOTP = async (req: Request, res: Response)=>{
    const body = req.body || {};
    const { email } = body;

    if (!email) {
        return res.status(400).json({ message: "email is required" });
    }

    // check if admin exists
    const admin = await prisma.user.findUnique({
        where: { email }
    });

    if(!admin){
        return res.status(400).json({message: "Admin with this email does not exist"});
    }

    // Generate OTP
    const otp =  generateOTP();
    const otpExpiry = getOtpExpiry(2); // OTP valid for 2 minutes

    // Store OTP in database
    await prisma.oTP.create({
        data: {
            target: email,
            codeHash: await hashPassword(otp),
            purpose: 'PASSWORD_RESET',
            expiresAt: otpExpiry,
            userId: admin.id
        }
    });

    await sendMail(email,
    "Admin Password Reset OTP",
    `Your OTP for resetting your password is ${otp}. It expires in 2 minutes.`
  );

  res.status(200).json({ message: "OTP sent successfully" },);
}

export const verifyOTP = async (req: Request, res: Response)=>{
    const body = req.body || {}
    const {email, otp} = body;

    if(!email || !otp){
        return res.status(400).json({message: "email and otp are required"});
    }

    const existingOTP = await prisma.oTP.findFirst({
        where: {
            target: email,
            purpose: 'PASSWORD_RESET',
            consumed: false,
            expiresAt: {
                gte: new Date()
            }
        }
    });

    if(!existingOTP){
        return res.status(400).json({message: "Invalid email or OTP"});
    }

    // Verify OTP
    const isOtpValid = await comparePassword(otp, existingOTP.codeHash);
    if(!isOtpValid){
       return res.status(400).json({ message: "Invalid OTP" });
    }

    // Mark OTP as consumed
    await prisma.oTP.update({
        where: { id: existingOTP.id },
        data: {
            consumed: true
        }
    });

    return res.status(200).json({ message: "OTP verified successfully" });

}

export const resetPassword = async (req: Request, res: Response) => {
    const body = req.body || {};
    const { email, newPassword } = body;
    if (!email || !newPassword) {
        return res.status(400).json({ message: "email and newPassword are required" });
    }

    // check if admin exists
    const admin = await prisma.user.findUnique({
        where: { email }
    });
    if (!admin) {
        return res.status(400).json({ message: "Admin with this email does not exist" });
    }

    // hash new password
    const hashedPassword = await hashPassword(newPassword);

    // update password in database
    await prisma.user.update({
        where: { email },
        data: { passwordHash: hashedPassword }
    });

    res.status(200).json({ message: "Password reset successfully" });
}



