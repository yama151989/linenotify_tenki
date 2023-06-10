// awsのlambda環境で動作確認済みのコード

import axios from 'axios';
import qs from 'querystring';
const ido = `${process.env.jitaku_ido}`;
const keido = `${process.env.jitaku_keido}`;
const env = `${process.env.LINE_TEST_NOTIFY_TOKEN}`;

export const handler = async(event) => {
    const obj1 = axios({
            method: 'GET',
            url: `http://api.openweathermap.org/data/2.5/forecast?lon=${keido}&lat=${ido}&units=metric&lang=ja&appid=${process.env.API_KEY}`,
    }).then(function(res) {
        const mon_temp = res.data.list[2].main.feels_like;
        let mon_weather = res.data.list[2].weather[0].description;
        const mon_kaze = res.data.list[2].wind.speed;
        const mon_time = res.data.list[2].dt_txt;
        const mon_weather_icon_flag = res.data.list[2].weather[0].main;
        const eve_temp = res.data.list[6].main.feels_like;
        let eve_weather = res.data.list[6].weather[0].description;
        const eve_kaze = res.data.list[6].wind.speed;
        const eve_time = res.data.list[6].dt_txt;
        const eve_weather_icon_flag = res.data.list[6].weather[0].main;
        
        if (mon_weather_icon_flag==='Rain'){
            mon_weather = mon_weather + '☂';
        } else if (mon_weather_icon_flag==='Clouds'){
            mon_weather = mon_weather + '☁';
        } else if (mon_weather_icon_flag==='Clear'){
            mon_weather = mon_weather + '☀';
        }
        
        if (eve_weather_icon_flag==='Rain'){
            eve_weather = eve_weather + '☂';
        } else if (eve_weather_icon_flag==='Clouds'){
            eve_weather = eve_weather + '☁';
        } else if (eve_weather_icon_flag==='Clear'){
            eve_weather = eve_weather + '☀';
        }
        
        // console.log(mon_temp);
        // console.log(mon_weather);
        // console.log(mon_kaze);
        // console.log(mon_time);
        // console.log(mon_weather_icon_flag);
        // console.log(eve_temp);
        // console.log(eve_weather);
        // console.log(eve_kaze);
        // console.log(eve_time);
        // console.log(eve_weather_icon_flag);
        
        const result_huku_mon = huku(mon_temp, mon_weather, mon_kaze);
        const result_huku_eve = huku(eve_temp, eve_weather, eve_kaze);
        function huku(t, w, k) {
            // 気温考慮
            let huku_flag = 0;
            if (t < 0) {
            } else if (t >= 0 && t < 4) {
                huku_flag += 1;
            } else if (t >= 4 && t < 8) {
                huku_flag += 2;
            } else if (t >= 8 && t < 12) {
                huku_flag += 3;
            } else if (t >= 12 && t < 16) {
                huku_flag += 4;
            } else if (t >= 16 && t < 20) {
                huku_flag += 5;
            } else if (t >= 20 && t < 24) {
                huku_flag += 6;
            } else if (t >= 24 && t < 28) {
                huku_flag += 7;
            } else if (t >= 28 && t < 32) {
                huku_flag += 8;
            } else if (t >= 32 && t < 36) {
                huku_flag += 9;
            } else if (t >= 36) {
                huku_flag += 10;
            }

            // 天気考慮
            if (w === "Clear") {
                huku_flag += 1;
            }
            if (w === "Rain") {
                huku_flag -= 1;
            }

            // 風考慮
            if (k > 5) {
                huku_flag -= 1;
            }

            if (huku_flag === 1 || huku_flag === 0 || huku_flag === -1 || huku_flag === -2) {
                var huku_text = `服装指数は レベル${huku_flag}！！\nぶるぶる、何を着ても寒い！！`;
            } else if (huku_flag === 2) {
                var huku_text = `服装指数は レベル${huku_flag}！\nダウンジャケットでしっかり防寒`;
            } else if (huku_flag === 3) {
                var huku_text = `服装指数は レベル${huku_flag}！\nコートを着ないと結構寒いなあ`;
            } else if (huku_flag === 4) {
                var huku_text = `服装指数は レベル${huku_flag}！\n裏地付トレンチコートがおすすめ`;
            } else if (huku_flag === 5) {
                var huku_text = `服装指数は レベル${huku_flag}！\n薄手のジャケットを羽織ろう`;
            } else if (huku_flag === 6) {
                var huku_text = `服装指数は レベル${huku_flag}！\n長袖シャツ・カットソーで快適に`;
            } else if (huku_flag === 7) {
                var huku_text = `服装指数は レベル${huku_flag}！\n半袖＋カーディガンで温度調節を`;
            } else if (huku_flag === 8) {
                var huku_text = `服装指数は レベル${huku_flag}！\n半袖Tシャツ一枚で過ごせる暑さ`;
            } else if (huku_flag === 9) {
                var huku_text = `服装指数は レベル${huku_flag}！\nノースリーブでもかなり暑い！！`;
            } else if (huku_flag >= 10) {
                var huku_text = `服装指数は レベルMAX！！\n暑さ対策必須！何を着ても暑い！`;
            }
            return huku_text;
        }
        
        const result_text = `\n${mon_time}\n朝の天気は ${mon_weather}\n${result_huku_mon}\n-----\n${eve_time}\n帰りの天気は ${eve_weather}\n${result_huku_eve}`;
        return axios({
            method: 'post',
            url: 'https://notify-api.line.me/api/notify',
            headers: {
                Authorization: `Bearer ${env}`,
            },
            data: qs.stringify({
                message: result_text,
            })
        });
    });
    return obj1;
};
