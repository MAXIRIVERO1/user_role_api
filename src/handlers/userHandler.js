const { User } = require("../db/db.js");
const bcrypt = require("bcryptjs");



const userPostHandler = async({ _id, email, password, isAdmin }) => {
    const foundAdmin = await User.findByPk(_id);
    if(!foundAdmin.isAdmin){
        return "No admin"
    }
    const existingUser = await User.findOne({ where: { email } });
    if(existingUser){
        return false;
    } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const created = await User.create({email, password: hashedPassword, isAdmin});
        return created;
    }
};

const userGetAllHandler = async() => {
    const found = await User.findAll();
    return found;
};

const userGetByIdHandler = async(id) => {
    const found = await User.findByPk(id);
    if(!found){
        return false
    }else {
        return found;
    }
};

const userPutHandler = async(_id, id, email, password, isAdmin) => {
    const foundAdmin = await User.findByPk(_id);
    if(!foundAdmin.isAdmin){
        return "No admin"
    }
    const found = await User.findByPk(id);
    if(!found){
        return false;
    } else{
        if(!password){
            const updated = await found.update({ email, password: found.password, isAdmin });
            return updated;
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const updated = await found.update({ email, password: hashedPassword, isAdmin });
        return updated;
    };
};

const userDeleteHandler = async(_id, id) => {
    const foundAdmin = await User.findByPk(_id);
    if(!foundAdmin.isAdmin){
        return "No admin"
    }
    const found = await User.findByPk(id);
    if(!found){
        return false;
    } else{
        await found.destroy()
        return "Deletion complete";
    };
};


module.exports = {
    userGetAllHandler,
    userPostHandler,
    userGetByIdHandler,
    userPutHandler,
    userDeleteHandler
}