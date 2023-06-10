const tenki_for = require('./tenki_for');
const tenki_now = require('./tenki_now');
const line = require('./line');
const line_test = require('./line_test');
const mytenki_for = new tenki_for();
const mytenki_now = new tenki_now();
const myline = new line();
const myline_test = new line_test();
const axios = require('axios');

// 天気予報
mytenki_for.syutoku().then(function(res) {
    const mon_temp = `${res.data.list[2].main.feels_like}`;
    const mon_weather = `${res.data.list[2].weather[0].description}`;
    const mon_weather_icon_flag = `${res.data.list[2].weather[0].main}`;
    const eve_temp = `${res.data.list[6].main.feels_like}`;
    const eve_weather = `${res.data.list[6].weather[0].description}`;
    const eve_weather_icon_flag = `${res.data.list[6].weather[0].main}`;

    // console.log(res.data.list[2].dt_txt);

    // console.log(res.data.list[1].main.feels_like);
    // console.log(res.data.list[1].weather[0].description);
    // console.log(res.data.list[1].weather[0].main);

    // 天気種類：Clouds、Rain、Clear

// ########## 本番 ##########
    switch (mon_weather_icon_flag) {
        case "Rain":
            switch (eve_weather_icon_flag) {
                case "Rain":
                    const textRR = '\n' + `朝の天気は ${mon_weather}☂` + '\n' + `気温は ${mon_temp}℃` + '\n' + `帰りの天気は ${eve_weather}☂` + '\n' + `気温は ${eve_temp}℃`;
                    myline.syutoku(textRR).then(function(res) {
                        console.log(res.data);
                    })
                    break;
                case "Clouds":
                    const textRClo = '\n' + `朝の天気は ${mon_weather}☂` + '\n' + `気温は ${mon_temp}℃` + '\n' + `帰りの天気は ${eve_weather}☁` + '\n' + `気温は ${eve_temp}℃`;
                    myline.syutoku(textRClo).then(function(res) {
                        console.log(res.data);
                    })                
                    break;
                case "Clear":
                    const textRCle = '\n' + `朝の天気は ${mon_weather}☂` + '\n' + `気温は ${mon_temp}℃` + '\n' + `帰りの天気は ${eve_weather}☀` + '\n' + `気温は ${eve_temp}℃`;
                    myline.syutoku(textRCle).then(function(res) {
                        console.log(res.data);
                    })   
                    break;
            }
            break;

        case "Clouds":
            switch (eve_weather_icon_flag) {
                case "Rain":
                    const textCloR = '\n' + `朝の天気は ${mon_weather}☁` + '\n' + `気温は ${mon_temp}℃` + '\n' + `帰りの天気は ${eve_weather}☂` + '\n' + `気温は ${eve_temp}℃`;
                    myline.syutoku(textCloR).then(function(res) {
                        console.log(res.data);
                    })
                    break;
                case "Clouds":
                    const textCloClo = '\n' + `朝の天気は ${mon_weather}☁` + '\n' + `気温は ${mon_temp}℃` + '\n' + `帰りの天気は ${eve_weather}☁` + '\n' + `気温は ${eve_temp}℃`;
                    myline.syutoku(textCloClo).then(function(res) {
                        console.log(res.data);
                    })                
                    break;
                case "Clear":
                    const textCloCle = '\n' + `朝の天気は ${mon_weather}☁` + '\n' + `気温は ${mon_temp}℃` + '\n' + `帰りの天気は ${eve_weather}☀` + '\n' + `気温は ${eve_temp}℃`;
                    myline.syutoku(textCloCle).then(function(res) {
                        console.log(res.data);
                    })   
                    break;
            }
            break;

        case "Clear":
            switch (eve_weather_icon_flag) {
                case "Rain":
                    const textCleR = '\n' + `朝の天気は ${mon_weather}☀` + '\n' + `気温は ${mon_temp}℃` + '\n' + `帰りの天気は ${eve_weather}☂` + '\n' + `気温は ${eve_temp}℃`;
                    myline.syutoku(textCleR).then(function(res) {
                        console.log(res.data);
                    })
                    break;
                case "Clouds":
                    const textCleClo = '\n' + `朝の天気は ${mon_weather}☀` + '\n' + `気温は ${mon_temp}℃` + '\n' + `帰りの天気は ${eve_weather}☁` + '\n' + `気温は ${eve_temp}℃`;
                    myline.syutoku(textCleClo).then(function(res) {
                        console.log(res.data);
                    })                
                    break;
                case "Clear":
                    const textCleCle = '\n' + `朝の天気は ${mon_weather}☀` + '\n' + `気温は ${mon_temp}℃` + '\n' + `帰りの天気は ${eve_weather}☀` + '\n' + `気温は ${eve_temp}℃`;
                    myline.syutoku(textCleCle).then(function(res) {
                        console.log(res.data);
                    })   
                    break;
            }
            break;
        }
    // ########## 本番ここまで ##########


    // // ########## テスト　##########
    // switch (mon_weather_icon_flag) {
    //     case "Rain":
    //         switch (eve_weather_icon_flag) {
    //             case "Rain":
    //                 const textRR = '\n' + `朝の天気は ${mon_weather}☂` + '\n' + `気温は ${mon_temp}℃` + '\n' + `帰りの天気は ${eve_weather}☂` + '\n' + `気温は ${eve_temp}℃`;
    //                 myline_test.syutoku(textRR).then(function(res) {
    //                     console.log(res.data);
    //                 })
    //                 break;
    //             case "Clouds":
    //                 const textRClo = '\n' + `朝の天気は ${mon_weather}☂` + '\n' + `気温は ${mon_temp}℃` + '\n' + `帰りの天気は ${eve_weather}☁` + '\n' + `気温は ${eve_temp}℃`;
    //                 myline_test.syutoku(textRClo).then(function(res) {
    //                     console.log(res.data);
    //                 })                
    //                 break;
    //             case "Clear":
    //                 const textRCle = '\n' + `朝の天気は ${mon_weather}☂` + '\n' + `気温は ${mon_temp}℃` + '\n' + `帰りの天気は ${eve_weather}☀` + '\n' + `気温は ${eve_temp}℃`;
    //                 myline_test.syutoku(textRCle).then(function(res) {
    //                     console.log(res.data);
    //                 })   
    //                 break;
    //         }
    //         break;

    //     case "Clouds":
    //         switch (eve_weather_icon_flag) {
    //             case "Rain":
    //                 const textCloR = '\n' + `朝の天気は ${mon_weather}☁` + '\n' + `気温は ${mon_temp}℃` + '\n' + `帰りの天気は ${eve_weather}☂` + '\n' + `気温は ${eve_temp}℃`;
    //                 myline_test.syutoku(textCloR).then(function(res) {
    //                     console.log(res.data);
    //                 })
    //                 return textCloR;
    //                 case "Clouds":
    //                     const textCloClo = '\n' + `朝の天気は ${mon_weather}☁` + '\n' + `気温は ${mon_temp}℃` + '\n' + `帰りの天気は ${eve_weather}☁` + '\n' + `気温は ${eve_temp}℃`;
    //                     myline_test.syutoku(textCloClo).then(function(res) {
    //                         console.log(res.data);
    //                     })                
    //                     break;
    //                 case "Clear":
    //                     const textCloCle = '\n' + `朝の天気は ${mon_weather}☁` + '\n' + `気温は ${mon_temp}℃` + '\n' + `帰りの天気は ${eve_weather}☀` + '\n' + `気温は ${eve_temp}℃`;
    //                     myline_test.syutoku(textCloCle).then(function(res) {
    //                         console.log(res.data);
    //                     })   
    //                     break;
    //                 }
    //                 break;
                    
    //                 case "Clear":
    //                     switch (eve_weather_icon_flag) {
    //                         case "Rain":
    //                             const textCleR = '\n' + `朝の天気は ${mon_weather}☀` + '\n' + `気温は ${mon_temp}℃` + '\n' + `帰りの天気は ${eve_weather}☂` + '\n' + `気温は ${eve_temp}℃`;
    //                             myline_test.syutoku(textCleR).then(function(res) {
    //                                 console.log(res.data);
    //                             })
    //                             break;
    //                             case "Clouds":
    //                                 const textCleClo = '\n' + `朝の天気は ${mon_weather}☀` + '\n' + `気温は ${mon_temp}℃` + '\n' + `帰りの天気は ${eve_weather}☁` + '\n' + `気温は ${eve_temp}℃`;
    //                                 myline_test.syutoku(textCleClo).then(function(res) {
    //                                     console.log(res.data);
    //                                 })                
    //                                 break;
    //                                 case "Clear":
    //                                     const textCleCle = '\n' + `朝の天気は ${mon_weather}☀` + '\n' + `気温は ${mon_temp}℃` + '\n' + `帰りの天気は ${eve_weather}☀` + '\n' + `気温は ${eve_temp}℃`;
    //                                     myline_test.syutoku(textCleCle).then(function(res) {
    //                                         console.log(res.data);
    //                                     })   
    //                                     break;
    //         }
    //     break;
    // }
    // // ########## テストここまで ##########
                                



    // 全てまるっと取得
    // const names = res.data.list;
    // names.forEach(element => console.log(element));


    // エラー処理
    // myline.syutoku(text).then(function(res) {
    //     console.log(res.data);
    // })
    // .catch( function(err) {
    //   console.error(err);
    // });
});



