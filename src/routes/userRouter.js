const { userPostController } = require("../controllers/userController.js");
const { userGetAllController } = require("../controllers/userController.js");
const { userGetByIdController } = require("../controllers/userController.js");
const { userPutController } = require("../controllers/userController.js");
const { userDeleteController } = require("../controllers/userController.js");
const { login } = require("../authentication/authController.js");
const { verifyToken } = require("../authentication/verifyToken.js");

const userRouter = require("express").Router();

userRouter.post("/login", login);

userRouter.use(verifyToken);

userRouter.post("/create", userPostController);
userRouter.get("/getAll", userGetAllController);
userRouter.get("/:id", userGetByIdController);
userRouter.put("/update/:id", userPutController);
userRouter.delete("/delete/:id", userDeleteController);






module.exports = {
    userRouter
};