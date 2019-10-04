const axios = require("axios");

const instance = axios.create (
    {
        baseURL : "http://calendarific.com/api/v2"
    }
)

module.exports = instance;