const axios = require('axios');
const dotenv = require("dotenv").config();

const tenki_for = function () {};

const ido = `${process.env.jitaku_ido}`;
const keido = `${process.env.jitaku_keido}`;

tenki_for.prototype.syutoku = function() {
    return axios({
        method: 'GET',
        url: `http://api.openweathermap.org/data/2.5/forecast?lon=${keido}&lat=${ido}&units=metric&lang=ja&appid=${process.env.API_KEY}`,
    })
    // .then( function(res) {
    //     let data = res;
    //     return data;
    //     // console.log(res.data);
    // })
    // .catch( function(err) {
    //     console.error(err);
    // });

}


module.exports = tenki_for;
