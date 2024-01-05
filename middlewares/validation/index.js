import { body, validationResult } from "express-validator";

const userSignupValidations = () => {
    return [
        body("userName", "username is required &&  > 2 char").notEmpty().isLength({ min: 2, max: 15 }),

        body("email", "Should be a valid Email").isEmail(),

        body("password", "Should be a strong Password").isStrongPassword().isLength({ min: 8, max: 16 }),

        body("confirmPassword").custom((value, { req }) => {
            if (value !== req.body.password) { throw new Error('Passwords do not match') } else {
                return true;
            };
        })
    ]
}

const userLoginValidations = () => {
return [
    body("email", "Should be a valid email").isEmail(),
    body("password", "Password cannot be empty").notEmpty(),
]
}

const errorMiddelware = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }
    return next();
};

export { userSignupValidations, userLoginValidations, errorMiddelware };