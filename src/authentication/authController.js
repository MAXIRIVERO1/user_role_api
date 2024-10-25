const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../db/db.js");
const dotenv = require("dotenv");

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const found = await User.findOne({ where: { email } });
        if(!found){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        } else {
            const isPasswordValid = await bcrypt.compare(password, found.password);
            if(!isPasswordValid){
                return res.status(401).json({
                    success: false,
                    message: "Invalid credentials"
                });
            } else {
                const token = jwt.sign({ userId: found.id, email: email }, jwtSecret, { expiresIn: "1h" });
                return res.status(200).json({ success: true, token: token });
            };
        };
    } catch (error) {
        return res.status(500).json({ error: error.message })
    };
};




module.exports = {
    login
}