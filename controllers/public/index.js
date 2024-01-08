import express from "express";
import userModel from "../../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js"
import { userSignupValidations, userLoginValidations, errorMiddelware } from "../../middlewares/validation/index.js";

const router = express();


/*
METHOD : POST
PUBLIC
API Endpoint : /api/signup
desc : create a new user accoun
*/
router.post('/signup', userSignupValidations(), errorMiddelware, async (req, res) => {
    try {
        const data = new userModel(req.body);

        let emailCheck = await userModel.findOne({ email: data.email });
        if (emailCheck) return res.json({ error: "User already exists" });
        
        let hashPass = await bcrypt.hash(data.password, 10);
        data.password = hashPass;

        await data.save();
        res.status(201).json({ success: true, message: "User Created Successfully", data })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, error: "Internal Server Error" })
    }
});

/*
METHOD : POST
PUBLIC
API Endpoint : /api/login
desc : log in to an existing user account and receive an access token
*/
router.post('/login', userLoginValidations(), errorMiddelware, async (req, res) => {
    try {
        const { email, password } = req.body;
        const userData = await userModel.findOne({ email });

        if (userData) {
            let isFound = await bcrypt.compare(password, userData.password);
            if (isFound) {
                let payload = {
                    user_id: userData._id, email: userData.email
                }
                const token = jwt.sign(payload, process.env.JWT_SECRET_KEY,);
                const encryptAccessToken = CryptoJS.AES.encrypt(token, process.env.CRYPTO_SECRET_KEY).toString()

                return res.status(200).json({ success: true, message: "Login Successful", accessToken: encryptAccessToken });

            } else { return res.status(401).json({ error: "Password does not Match" }) }

        }

    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, error: "Internal Server Error" })
    }
})



// Additional testing route 

/*
METHOD : POST
PUBLIC
API Endpoint : /api/get
desc : get all users
*/
router.get('/get', async (req, res) => {
    try {
        const userData = await userModel.find({});

        res.status(200).json({ success: true, message: "All Users Data", userData })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, error: "Internal Server Error" })
    }
})
export default router;