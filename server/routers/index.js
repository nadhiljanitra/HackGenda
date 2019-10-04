const DateRouter = require("./DateRouter")
const routes = require("express").Router();

routes.use("/dates", DateRouter)

module.exports = routes;