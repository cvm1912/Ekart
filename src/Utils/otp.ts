// Generate 6-digit OTP
import crypto from "crypto";
export const generateOTP = (): string =>{
    return  crypto.randomInt(100000, 999999).toString();
}

// Get OTP expiry time (default: 10 minutes from now)
export const getOtpExpiry = (minutes: number = 2): Date => {
  return new Date(Date.now() + minutes * 60 * 1000);
};
