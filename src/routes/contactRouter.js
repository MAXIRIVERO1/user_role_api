const { contactPostController } = require("../controllers/contactController.js");
const { contactGetAllController } = require("../controllers/contactController.js");
const { contactGetByIdController } = require("../controllers/contactController.js");
const { contactPutController } = require("../controllers/contactController.js");
const { contactDeleteController } = require("../controllers/contactController.js");
const { verifyToken } = require("../authentication/verifyToken.js");



const contactRouter = require("express").Router();

contactRouter.use(verifyToken);

contactRouter.post("/create", contactPostController);
contactRouter.get("/getAll", contactGetAllController);
contactRouter.get("/:id", contactGetByIdController);
contactRouter.put("/update/:id", contactPutController);
contactRouter.delete("/delete/:id", contactDeleteController);






module.exports = {
    contactRouter
};