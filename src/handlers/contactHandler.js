const { Contact } = require("../db/db.js");


const contactPostHandler = async({ name, email, phone, address }) => {
    const found = await Contact.findOne({ where: { email } })
    if(found){
        return false;
    }
    const created = await Contact.create({ name, email, phone, address });
    return created;
};

const contactGetAllHandler = async() => {
    const found = await Contact.findAll();
    return found;
};

const contactGetByIdHandler = async(id) => {
    const found = await Contact.findByPk(id);
    if(!found){
        return false;
    }
    return found;
};
7
const contactPutHandler = async({ id, name, email, phone, address }) => {
    const found = await Contact.findByPk(id);
    if(!found){
        return false;
    };
    const updated = await found.update({ name, email, phone, address });
    return updated;
};

const contactDeleteHandler = async(id) => {
    const found = await Contact.findByPk(id);
    if(!found){
        return false;
    }
    await found.destroy();
    return "Deletion complete";
};






module.exports = {
    contactPostHandler,
    contactGetAllHandler,
    contactGetByIdHandler,
    contactPutHandler,
    contactDeleteHandler
}