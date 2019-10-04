const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const router = require("./routers");
const port = 3000;
const app = express();

app.use(express.json());

app.use(express.urlencoded( {extended: false} ));

app.use(morgan("dev"))
app.use(cors())

app.use("/", router)

app.listen(port, () => {
    console.log(`you're listening to port ${port}`)
})