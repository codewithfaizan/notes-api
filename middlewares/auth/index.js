import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
import dotenv from "dotenv";
dotenv.config();

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers["auth-token"] || req.headers.Authorization || req.headers["authorization"];
        if (!authHeader) { return res.status(401).json({ error: "Token Not provided and check the Header" }) }

        const decryptAccessToken = CryptoJS.AES.decrypt(authHeader, process.env.CRYPTO_SECRET_KEY)
        const accessToken = decryptAccessToken.toString(CryptoJS.enc.Utf8)

        const payload = jwt.verify(accessToken, process.env.JWT_SECRET_KEY)
        req.payload = payload;
        return next();
    } catch (error) {
        return res.status(401).json({ success: false, error: "Middleware Error" })
    }

}
export default authMiddleware