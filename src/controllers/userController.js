const { userGetAllHandler } = require("../handlers/userHandler.js");
const { userPostHandler } = require("../handlers/userHandler.js");
const { userGetByIdHandler } = require("../handlers/userHandler.js");
const { userPutHandler } = require("../handlers/userHandler.js");
const { userDeleteHandler } = require("../handlers/userHandler.js");






const userPostController = async(req, res) => {
    try {
        const _id = req.userId;
        console.log(_id);
        const { email, password, isAdmin } = req.body;
        const created = await userPostHandler({ _id, email, password, isAdmin });
        if(created === "No admin"){
            return res.status(400).json({ success: false, message: "Admin privileges are required to perform this action" })
        }
        if(!created){
            return res.status(400).json({ success: false, message: "User already exists" });
        }else {
            return res.status(200).json(created);
        };
    } catch (error) {
        return res.status(500).json({ error: error.message });
    };
};

const userGetAllController = async(req, res) => {
    try {
        const found = await userGetAllHandler();
        return res.status(200).json(found);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const userGetByIdController = async(req, res) => {
    try {
        const { id } = req.params;
        const found = await userGetByIdHandler(id);
        if(!found){
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        } else{
            res.status(200).json(found);
        };
    } catch (error) {
        return res.status(500).json({ error: error.message });
    };
};

const userPutController = async(req, res) => {
    try {
        const _id = req.userId;
        console.log(_id)
        const { id } = req.params;
        const { email, password, isAdmin } = req.body;
        const updated = await userPutHandler(_id, id, email, password, isAdmin);
        if(updated === "No admin"){
            return res.status(400).json({ success: false, message: "Admin privileges are required to perform this action" })
        }
        if(!updated){
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        } else{
            return res.status(200).json(updated);
        }
    } catch (error) {
        return res.status(500).json({ error: error.message })
    };
};

const userDeleteController = async(req, res) => {
    try {
        const _id = req.userId;
        console.log(_id)
        const { id } = req.params;
        const response = await userDeleteHandler(_id, id);
        if(response === "No admin"){
            return res.status(400).json({ success: false, message: "Admin privileges are required to perform this action" })
        }
        if(!response){
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        } else{
            return res.status(200).json(response)
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    };
};


module.exports = {
    userPostController,
    userGetAllController,
    userGetByIdController,
    userPutController,
    userDeleteController
}