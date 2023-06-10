const tenki = require('./tenki');
const t = new tenki();

// 天気予報
t.tenki_for().then(function(res) {
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

    // ########## テスト ##########
    const env = `${process.env.line_test_NOTIFY_TOKEN}`;
    
    // ########## 本番 ##########
    // const env = `${process.env.LINE_NOTIFY_TOKEN}`;

    switch (mon_weather_icon_flag) {
        case "Rain":
            switch (eve_weather_icon_flag) {
                case "Rain":
                    const textRR = '\n' + `朝の天気は ${mon_weather}☂` + '\n' + `気温は ${mon_temp}℃` + '\n' + `帰りの天気は ${eve_weather}☂` + '\n' + `気温は ${eve_temp}℃`;
                    t.linePost(textRR,env).then(function(res) {
                        console.log(res.data);
                    })
                    break;
                case "Clouds":
                    const textRClo = '\n' + `朝の天気は ${mon_weather}☂` + '\n' + `気温は ${mon_temp}℃` + '\n' + `帰りの天気は ${eve_weather}☁` + '\n' + `気温は ${eve_temp}℃`;
                    t.linePost(textRClo,env).then(function(res) {
                        console.log(res.data);
                    })                
                    break;
                case "Clear":
                    const textRCle = '\n' + `朝の天気は ${mon_weather}☂` + '\n' + `気温は ${mon_temp}℃` + '\n' + `帰りの天気は ${eve_weather}☀` + '\n' + `気温は ${eve_temp}℃`;
                    t.linePost(textRCle,env).then(function(res) {
                        console.log(res.data);
                    })   
                    break;
            }
            break;

        case "Clouds":
            switch (eve_weather_icon_flag) {
                case "Rain":
                    const textCloR = '\n' + `朝の天気は ${mon_weather}☁` + '\n' + `気温は ${mon_temp}℃` + '\n' + `帰りの天気は ${eve_weather}☂` + '\n' + `気温は ${eve_temp}℃`;
                    t.linePost(textCloR,env).then(function(res) {
                        console.log(res.data);
                    })
                    break;
                case "Clouds":
                    const textCloClo = '\n' + `朝の天気は ${mon_weather}☁` + '\n' + `気温は ${mon_temp}℃` + '\n' + `帰りの天気は ${eve_weather}☁` + '\n' + `気温は ${eve_temp}℃`;
                    t.linePost(textCloClo,env).then(function(res) {
                        console.log(res.data);
                    })                
                    break;
                case "Clear":
                    const textCloCle = '\n' + `朝の天気は ${mon_weather}☁` + '\n' + `気温は ${mon_temp}℃` + '\n' + `帰りの天気は ${eve_weather}☀` + '\n' + `気温は ${eve_temp}℃`;
                    t.linePost(textCloCle,env).then(function(res) {
                        console.log(res.data);
                    })   
                    break;
            }
            break;

        case "Clear":
            switch (eve_weather_icon_flag) {
                case "Rain":
                    const textCleR = '\n' + `朝の天気は ${mon_weather}☀` + '\n' + `気温は ${mon_temp}℃` + '\n' + `帰りの天気は ${eve_weather}☂` + '\n' + `気温は ${eve_temp}℃`;
                    t.linePost(textCleR,env).then(function(res) {
                        console.log(res.data);
                    })
                    break;
                case "Clouds":
                    const textCleClo = '\n' + `朝の天気は ${mon_weather}☀` + '\n' + `気温は ${mon_temp}℃` + '\n' + `帰りの天気は ${eve_weather}☁` + '\n' + `気温は ${eve_temp}℃`;
                    t.linePost(textCleClo,env).then(function(res) {
                        console.log(res.data);
                    })                
                    break;
                case "Clear":
                    const textCleCle = '\n' + `朝の天気は ${mon_weather}☀` + '\n' + `気温は ${mon_temp}℃` + '\n' + `帰りの天気は ${eve_weather}☀` + '\n' + `気温は ${eve_temp}℃`;
                    t.linePost(textCleCle,env).then(function(res) {
                        console.log(res.data);
                    })   
                    break;
            }
            break;
        }
});



