import {Request, Response} from 'express';
import prisma from '../Config/prisma';
import {hashPassword, comparePassword} from '../Utils/hasing'
import {generateToken} from '../Utils/jwt';

export const Register = async (req: Request, res: Response) =>{
    
     const body = req.body || {};
     const { name, email, password } = body;

     if(!name || !email || !password){
        return res.status(400).json({message: "name, email and password are required"});
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
            passwordHash: hashedPassword
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
            token
        }
    });
}