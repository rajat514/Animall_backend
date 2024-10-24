require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const { join } = require('path');

const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
const PORT = process.env.PORT || 5001;
const dbURL = process.env.DATABASE_URL;

mongoose
    .connect(dbURL)
    .then(() => console.log("MongoDB Connected"))
    .catch(() => console.log("MongoDB Error"));

app.use(fileUpload());

app.use((err, req, res, next) => {
    res.json({ err })
});

app.use((req, res, next) => {
    req.body = {
        ...req.body,
        ...req.files,
    };
    next();
});

app.use(express.json());

app.use('/uploads', express.static(join(__dirname, 'uploads')));

app.use("/", userRoutes);
app.use("/admin", adminRoutes);



app.listen(PORT, () => {
    console.log(`server start at Port no-${PORT}`);
})