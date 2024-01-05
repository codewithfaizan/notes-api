import express from "express";
import userModel from "../../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js"
import { userSignupValidations, userLoginValidations, errorMiddelware } from "../../middlewares/validation/index.js";

const router = express();

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

router.get('/get', async (req, res) => {
    try {
        const userData = await userModel.find({});

        res.status(200).json({ success: true, message: "All Users Data", userData })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, error: "Internal Server Error" })
    }
})
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params
        const userData = await userModel.findByIdAndDelete(id);
        if (!userData) return res.json(404).json({ error: "User id not found" })
        res.status(200).json({ success: true, message: "User Deleted" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, error: "Internal Server Error" })
    }
})

// const url = req.protocol + '://' + req.get('host')

router.post('/login', userLoginValidations(), errorMiddelware, async (req, res) => {
    try {
        const { email, password } = req.body;

        const userData = await userModel.findOne({ email });

        if (!userData) return res.json({ error: "Email Not found" });

        console.log(userData)
        let payload = {
            user_id: userData._id,
            email: userData.email
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY,);
        const encryptAccessToken = CryptoJS.AES.encrypt(token, process.env.CRYPTO_SECRET_KEY).toString()

        res.status(200).json({ success: true, message: "Login Successfull", accessToken: encryptAccessToken })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, error: "Internal Server Error" })
    }
})

export default router;