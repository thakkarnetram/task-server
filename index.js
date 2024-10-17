require("./utils/mongo-connection");
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const app = express();
const path = require("path");
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "src", "views"));
app.set("view engine", "ejs");
app.use(cors());
const authrouter = require("./routers/auth-router");
const actionRouter = require("./routers/action-router");
const { log } = require("console");
app.use("/", authrouter);
app.use("/", actionRouter);

app.listen(8082, () => {
  console.log("Connected");
});
