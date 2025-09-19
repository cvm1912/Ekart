import { Request, Response } from "express";
import prisma from "../config/prisma";
import { hashPassword } from "../Utils/hasing";
import { generateOTP, getOtpExpiry } from "../Utils/otp";
import { sendMail } from "../Utils/mailer";
import { twilioClient, TWILIO_PHONE_NUMBER } from "../config/twillio";
import bcrypt from "bcrypt";


export const UserRegister = async (Req: Request, Res: Response)=>{
    const body = Req.body || {};
    const {name, email, password, confirmPassword, role} = body;

    if(!name || !email || !password || !confirmPassword || !role){
        return Res.status(400).json({message: "name, email, password, confirmPassword and role are required"});
    }

    if(password !== confirmPassword){
        return Res.status(400).json({message: "password and confirmPassword do not match"});
    }

    const existingUser = await prisma.user.findUnique({where:{email}});
    if(existingUser){
        return Res.status(400).json({message: "User with this email already exists"});
    }

    const otp = generateOTP();
    const hashedOtp = await bcrypt.hash(otp, 10);
    const otpExpiry = getOtpExpiry();
    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            passwordHash: hashedPassword,
            role
        }
    });

    await prisma.oTP.create({
        data: {
            target: email,
            codeHash: hashedOtp,
            purpose: 'SIGNUP',
            expiresAt: otpExpiry,
            userId: newUser.id
        }
    });

    await sendMail(email, "Email Verification", `Your verification OTP is: ${otp}`);

    return Res.status(201).json({
        message: "User registered successfully. Please verify your email with the OTP sent.",
        userId: newUser.id
    });
}

export const UserVerify = async(Req:Request, Res: Response)=>{
    const body =  Req.body || {};
    const {email, otp} = body;

    if(!email || !otp){
        return Res.status(400).json({message: "email and otp are required"});
    }

    const user = await prisma.user.findUnique({where: {email}});    
    if(!user){
        return Res.status(400).json({message: "User with this email does not exist"});
    }

    const existingOTP = await prisma.oTP.findFirst({
        where: {
            target: email,
            purpose: 'SIGNUP',
            consumed: false,
            expiresAt: {
                gte: new Date()
            }
        }
    });

    if(!existingOTP){
        return Res.status(400).json({message: "Invalid or expired OTP"});
    }

    const isOtpValid = await bcrypt.compare(otp, existingOTP.codeHash);
    if(!isOtpValid){
        return Res.status(400).json({message: "Invalid OTP"});
    }

    await prisma.oTP.update({
        where: { id: existingOTP.id },
        data: { consumed: true }
    });

    await prisma.user.update({
        where: { email },
        data: { isEmailVerified: true }
    });

    return Res.status(200).json({
        message: "Email verified successfully",
        userId: user.id
    });
}








