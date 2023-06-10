const axios = require('axios');
const qs = require('querystring');
const dotenv = require("dotenv").config();

const line_test = function () {};

line_test.prototype.syutoku = function(text) {
    return axios({
        method: 'post',
        url: 'https://notify-api.line.me/api/notify',
        headers: {
            Authorization: `Bearer ${process.env.line_test_NOTIFY_TOKEN}`,
        },
        data: qs.stringify({
            message: text,
        })
    })
}

module.exports = line_test;