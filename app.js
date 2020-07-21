const express = require("express");
const dotenv = require("dotenv");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser({ extended: false }));

// ROUTE FILES

const auth = require("./routes/auth");

// ROUTE

app.use("/auth", auth);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
