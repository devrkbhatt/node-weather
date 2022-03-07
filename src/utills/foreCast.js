const axios = require('axios');

async function getWeather(lon, lat, callback) {
    try {
         const token = 'e0287b5881608dfeb0ba6bf9625b1437'
         const data = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${token}&units=metric`);
        //  console.log(data)
        if(data.cod===400) {
             throw 'wrong city coordinates'          
        }
        else callback(undefined,data.data.weather[0].description + ' It is currently ' + data.data.main.temp + ' degress out. There is a wind ' + data.data.wind.speed  + ' km/h')
         

    }
    catch(e) {

        if(e.isAxiosError) {
            callback('check your internet connection ', undefined)
        }
        else  callback(e, undefined)
       

    }
    
}

// export 
module.exports = {
    getWeather
}