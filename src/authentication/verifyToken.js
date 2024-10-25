const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;


const verifyToken = async(req, res, next) => {
    try {
        const token = req.body.token || req.headers["authorization"]?.split(" ")[1];
        console.log(token);
        if(!token){
            return res.status(403).json({
                success: false,
                message: "No token provided, please log in"
            })
        } else {
            const decoded = jwt.verify(token, jwtSecret);
            req.userId = decoded.userId;
            next();
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    };
};


module.exports = {
    verifyToken
}