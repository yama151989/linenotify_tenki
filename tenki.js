const axios = require('axios');
const qs = require('querystring');
const dotenv = require("dotenv").config();

const ido = `${process.env.jitaku_ido}`;
const keido = `${process.env.jitaku_keido}`;
// console.log (ido);
// console.log(keido);

class tenki {
    constructor(){

    }
    // 天気情報取得
    tenki_for() {
        return axios({
            method: 'GET',
            url: `http://api.openweathermap.org/data/2.5/forecast?lon=${keido}&lat=${ido}&units=metric&lang=ja&appid=${process.env.API_KEY}`,
        })
    }

    // line通知
    linePost(text,env) {
        return axios({
            method: 'post',
            url: 'https://notify-api.line.me/api/notify',
            headers: {
                Authorization: `Bearer ${env}`,
            },
            data: qs.stringify({
                message: text,
            })
        })
    }
}

module.exports = tenki;
