const routes = require("express").Router();
const DateApi = require("../apis/DateApi");
const axios = require("axios")

routes.get("/", (req, res) => {
    const api_key = "dbf659144293578a6f88b6672bc9a26e17d29ec6"
    DateApi.get(`/holidays?api_key=${api_key}&country=ID&year=2019`)
        .then(({data}) => {
            // console.log(data.response.holidays)
            res.status(200).json(data.response.holidays) 
        })
        .catch((err) => {
            console.log(err)
        });
})

routes.post("/", (req, res) => {
    let tanggal = req.body.date;
    console.log(tanggal)
    // res.send(200).json(tanggal)
})

module.exports = routes;