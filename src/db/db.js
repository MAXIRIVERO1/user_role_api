const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');


dotenv.config();


const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;

// Initialize Sequelize
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
    logging: false,
    native: false
});

// Dynamically import all models from the 'models' folder
const modelDefiners = [];

// Read the models directory and add all model files to modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
    .filter((file) => (file.indexOf('.') !== 0) && (file.slice(-3) === '.js'))
    .forEach((file) => {
        modelDefiners.push(require(path.join(__dirname, '/models', file)));
    });

// Inject the sequelize connection (sequelize instance) into each model
modelDefiners.forEach((model) => model(sequelize));

// Capitalize model names and make them available in sequelize.models
const entries = Object.entries(sequelize.models);
const capsEntries = entries.map(([modelName, modelValue]) => [
    modelName[0].toUpperCase() + modelName.slice(1),
    modelValue,
]);
sequelize.models = Object.fromEntries(capsEntries);


module.exports = {
    ...sequelize.models,
    conn: sequelize
};
