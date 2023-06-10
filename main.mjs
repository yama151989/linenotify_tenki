// const tenki = require('./tenki');
// // import * as tenki from './tenki.mjs';
// const t = new tenki();

// const axios = require('axios');
// const qs = require('querystring');
// const dotenv = require("dotenv").config();
import axios from 'axios';
import qs from 'querystring';
import * as dotenv from "dotenv";
dotenv.config();

const ido = `${process.env.jitaku_ido}`;
const keido = `${process.env.jitaku_keido}`;

function tenki_for() {
    return axios({
        method: 'GET',
        url: `http://api.openweathermap.org/data/2.5/forecast?lon=${keido}&lat=${ido}&units=metric&lang=ja&appid=${process.env.API_KEY}`,
    })
}
function linePost(text,env) {
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

// 天気予報
// t.tenki_for().then(function(res) {
tenki_for().then(function(res) {
    const mon_temp = `${res.data.list[2].main.feels_like}`;
    const mon_weather = `${res.data.list[2].weather[0].description}`;
    const mon_weather_icon_flag = `${res.data.list[2].weather[0].main}`;
    const eve_temp = `${res.data.list[6].main.feels_like}`;
    const eve_weather = `${res.data.list[6].weather[0].description}`;
    const eve_weather_icon_flag = `${res.data.list[6].weather[0].main}`;

    console.log(res.data.list[2].dt_txt);

    console.log(res.data.list[1].main.feels_like);
    console.log(res.data.list[1].weather[0].description);
    console.log(res.data.list[1].weather[0].main);
    
        // 天気種類：Clouds、Rain、Clear
    
        // ########## テスト ##########
        const env = `${process.env.LINE_TEST_NOTIFY_TOKEN}`;
    
        // ########## 本番 ##########
        // const env = `${process.env.LINE_NOTIFY_TOKEN}`;
    
        switch (mon_weather_icon_flag) {
                case "Rain":
                    switch (eve_weather_icon_flag) {
                            case "Rain":
                                const textRR = '\n' + `朝の天気は ${mon_weather}☂` + '\n' + `気温は ${mon_temp}℃` + '\n' + `帰りの天気は ${eve_weather}☂` + '\n' + `気温は ${eve_temp}℃`;
                                linePost(textRR,env).then(function(res) {
                                        console.log(res.data);
                                    })
                                    break;
                                case "Clouds":
                                    const textRClo = '\n' + `朝の天気は ${mon_weather}☂` + '\n' + `気温は ${mon_temp}℃` + '\n' + `帰りの天気は ${eve_weather}☁` + '\n' + `気温は ${eve_temp}℃`;
                                    linePost(textRClo,env).then(function(res) {
                                            console.log(res.data);
                                        })                
                                        break;
                case "Clear":
                    const textRCle = '\n' + `朝の天気は ${mon_weather}☂` + '\n' + `気温は ${mon_temp}℃` + '\n' + `帰りの天気は ${eve_weather}☀` + '\n' + `気温は ${eve_temp}℃`;
                    linePost(textRCle,env).then(function(res) {
                            console.log(res.data);
                        })   
                        break;
                }
                break;
    
            case "Clouds":
                switch (eve_weather_icon_flag) {
                        case "Rain":
                            const textCloR = '\n' + `朝の天気は ${mon_weather}☁` + '\n' + `気温は ${mon_temp}℃` + '\n' + `帰りの天気は ${eve_weather}☂` + '\n' + `気温は ${eve_temp}℃`;
                            linePost(textCloR,env).then(function(res) {
                                    console.log(res.data);
                                })
                                break;
                            case "Clouds":
                                const textCloClo = '\n' + `朝の天気は ${mon_weather}☁` + '\n' + `気温は ${mon_temp}℃` + '\n' + `帰りの天気は ${eve_weather}☁` + '\n' + `気温は ${eve_temp}℃`;
                                linePost(textCloClo,env).then(function(res) {
                                        console.log(res.data);
                                    })                
                                    break;
                                case "Clear":
                                    const textCloCle = '\n' + `朝の天気は ${mon_weather}☁` + '\n' + `気温は ${mon_temp}℃` + '\n' + `帰りの天気は ${eve_weather}☀` + '\n' + `気温は ${eve_temp}℃`;
                                    linePost(textCloCle,env).then(function(res) {
                                            console.log(res.data);
                                        })   
                                        break;
                                }
                                break;
                    
                            case "Clear":
                                switch (eve_weather_icon_flag) {
                                        case "Rain":
                                            const textCleR = '\n' + `朝の天気は ${mon_weather}☀` + '\n' + `気温は ${mon_temp}℃` + '\n' + `帰りの天気は ${eve_weather}☂` + '\n' + `気温は ${eve_temp}℃`;
                                            linePost(textCleR,env).then(function(res) {
                                                    console.log(res.data);
                                                })
                                                break;
                                            case "Clouds":
                                                const textCleClo = '\n' + `朝の天気は ${mon_weather}☀` + '\n' + `気温は ${mon_temp}℃` + '\n' + `帰りの天気は ${eve_weather}☁` + '\n' + `気温は ${eve_temp}℃`;
                                                linePost(textCleClo,env).then(function(res) {
                                                        console.log(res.data);
                                                    })                
                                                    break;
                case "Clear":
                    const textCleCle = '\n' + `朝の天気は ${mon_weather}☀` + '\n' + `気温は ${mon_temp}℃` + '\n' + `帰りの天気は ${eve_weather}☀` + '\n' + `気温は ${eve_temp}℃`;
                    linePost(textCleCle,env).then(function(res) {
                        console.log(res.data);
                    })   
                    break;
            }
            break;
        }
        
        
        // 天気予報
        tenki_for().then(function(res) {
                // 全てまるっと取得
                // const names = res.data.list;
                // names.forEach(element => console.log(element));
            
            
                const mon_temp = res.data.list[2].main.feels_like;
                const mon_weather = res.data.list[2].weather[0].description;
                const mon_kaze = res.data.list[2].wind.speed;
                const mon_time = res.data.list[2].dt_txt;
                const eve_temp = res.data.list[6].main.feels_like;
                const eve_weather = res.data.list[6].weather[0].description;
                const eve_kaze = res.data.list[6].wind.speed;
                const eve_time = res.data.list[6].dt_txt;
    
    // console.log(mon_temp);
    // console.log(mon_weather); 
    // console.log(mon_kaze);
    // console.log(mon_time);
    // console.log(eve_temp);
    // console.log(eve_weather);
    // console.log(eve_kaze);
    // console.log(eve_time);


    // 服装指数基準取得
    const result_huku_mon = huku(mon_temp,mon_weather,mon_kaze);
    const result_huku_eve = huku(eve_temp,eve_weather,eve_kaze);


    function huku(t,w,k) {
            // 気温考慮
            let huku_flag = 0;
            if (t < 0){  
                } else if (t >= 0 && t <4) {
                        huku_flag += 1;
                    } else if (t >= 4 && t < 8) {
                            huku_flag += 2;
                        } else if (t >=8 && t <12) {
                                huku_flag +=3;
                            } else if (t >= 12 && t <16) {
                                    huku_flag += 4;
                                } else if (t >=16 && t <20) {
                                        huku_flag += 5;
                                    }else if (t >= 20 && t <24) {
            huku_flag += 6;
        } else if (t >= 24 && t <28) {
                huku_flag += 7;
            } else if (t >= 28 && t <32) {
                    huku_flag += 8;
                } else if (t >= 32 && t <36) {
                        huku_flag += 9;
                    } else if (t >= 36) {
                            huku_flag += 10;
                        }
                        // console.log(huku_flag);
                        // console.log(t);
                
                        // 天気考慮
                        if (w==="Clear") {
                                huku_flag += 1;
                            }
                            if (w==="Rain") {
                                    huku_flag -= 1;
                                }
                        
                        
                                // 風考慮
                                if (k > 5) {
                                        huku_flag -= 1;
                                    }
                            
                                    // console.log(`今の風は${now_kaze}`);
                                    // console.log(`今の気温は${now_temp}`);
                                    // console.log(`今の天気は${now_weather}`);
                                    // console.log(huku_flag);
                            
                                    // コメント
                                    if (huku_flag===1 || huku_flag===0 || huku_flag===-1 || huku_flag===-2){
                                            var huku_text = `服装指数は レベル${huku_flag}！！\nぶるぶる、何を着ても寒い！！`;
                                        } else if (huku_flag===2){
                                                var huku_text = `服装指数は レベル${huku_flag}！\nダウンジャケットでしっかり防寒`
                                            }else if (huku_flag===3) {
                                                    var huku_text = `服装指数は レベル${huku_flag}！\nコートを着ないと結構寒いなあ`;
                                                }else if (huku_flag===4) {
                                                        var huku_text = `服装指数は レベル${huku_flag}！\n裏地付トレンチコートがおすすめ`;
                                                    }else if (huku_flag===5) {
                                                            var huku_text = `服装指数は レベル${huku_flag}！\n薄手のジャケットを羽織ろう`;
                                                        }else if (huku_flag===6) {
                                                                var huku_text = `服装指数は レベル${huku_flag}！\n長袖シャツ・カットソーで快適に`;
        } else if (huku_flag===7) {
                var huku_text = `服装指数は レベル${huku_flag}！\n半袖＋カーディガンで温度調節を`;
            }else if (huku_flag===8) {
                    var huku_text = `服装指数は レベル${huku_flag}！\n半袖Tシャツ一枚で過ごせる暑さ`;
                }else if (huku_flag===9) {
                        var huku_text = `服装指数は レベル${huku_flag}！\nノースリーブでもかなり暑い！！`;
                    }else if (huku_flag>=10) {
                            var huku_text = `服装指数は レベルMAX！！\n暑さ対策必須！何を着ても暑い！`;
                        }
                        return huku_text;
                    }
                    // console.log(result_huku_mon);
                    // console.log(result_huku_eve);
                
    // ########## テスト　##########
    const result_huku_text = `\n${mon_time}\n朝の${result_huku_mon}\n-----\n${eve_time}\n帰りの${result_huku_eve}`;
    const env = `${process.env.line_test_NOTIFY_TOKEN}`;
    linePost(result_huku_text,env).then(function(res) {console.log(res.data)});
    // console.log(result_huku_text);

    // // ########## 本番　##########
    // const result_huku_text = `\n${mon_time}\n朝の${result_huku_mon}\n-----\n${eve_time}\n帰りの${result_huku_eve}`;
    // const env = `${process.env.LINE_NOTIFY_TOKEN}`;
    // t.linePost(result_huku_text,env).then(function(res) {console.log(res.data)});
});
});