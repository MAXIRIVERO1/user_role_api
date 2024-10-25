const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { conn } = require("./db/db.js");
const { router } = require("./routes/index.js");

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/", router);

app.get("/", (req, res) => {
    res.send("Backend server is online");
});

conn.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log("Backend is up and running on port ==>", PORT);
    })
});

