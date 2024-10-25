const { contactPostHandler } = require("../handlers/contactHandler.js");
const { contactGetAllHandler } = require("../handlers/contactHandler.js");
const { contactGetByIdHandler } = require("../handlers/contactHandler.js");
const { contactPutHandler } = require("../handlers/contactHandler.js");
const { contactDeleteHandler } = require("../handlers/contactHandler.js");




const contactPostController = async(req, res) => {
    try {
        const { name, email, phone, address } = req.body;
        const response = await contactPostHandler({ name, email, phone, address });
        if(!response){
            return res.status(400).json({ success: false, message: "User already exists."});
        }
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const contactGetAllController = async(req, res) => {
    try {
        const response = await contactGetAllHandler();
        if(response.length === 0){
            return res.status(200).json({ success: true, message: "There are no contacts." });
        }
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const contactGetByIdController = async(req, res) => {
    try {
        const { id } = await req.params;
        const response = await contactGetByIdHandler(id);
        if(!response){
            return res.status(404).json({ success: false, message: "User not found" });
        }
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const contactPutController = async(req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, address } = req.body;
        const response = await contactPutHandler({id, name, email, phone, address});
        if(!response){
            return res.status(404).json({ success: false, message: "User not found" });
        }
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const contactDeleteController = async(req, res) => {
    try {
        const { id } = req.params;
        const response = await contactDeleteHandler(id);
        if(!response){
            return res.status(404).json({ success: false, message: "User not found" });
        }
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};



module.exports = {
    contactPostController,
    contactGetAllController,
    contactGetByIdController,
    contactPutController,
    contactDeleteController
}