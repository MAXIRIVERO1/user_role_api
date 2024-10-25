const { Router } = require("express");
const { userRouter } = require("./userRouter.js");
const { contactRouter } = require("./contactRouter.js");

const router = Router();

router.use("/user", userRouter);
router.use("/contact", contactRouter)


module.exports = {
    router
}