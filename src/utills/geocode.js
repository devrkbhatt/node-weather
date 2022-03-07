
const axios = require('axios')

async function getCords(cityName,callback) {
    try {
      const token = 'pk.eyJ1IjoicmtiaGF0dCIsImEiOiJja2ZqeWljbGwwZHhlMzRuejJ3MHB3MWo4In0.6-dtobYG79CawZPy7pKzxg';
      const data = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${cityName}.json?limit=1&access_token=${token}`);
     
      // throw an error if features is empty
      if(data.data.features.length===0) {
          throw "City name not found";
      }
      // console.log(data.data.features);
      // // console.log(data.data.features);
      // console.log(data.data.features[0].place_name);
      // console.log(data.data.features[0].center);
    
      else {   

        callback(undefined,{
           log : data.data.features[0].center[0],
           lat : data.data.features[0].center[1],
           location : data.data.features[0].place_name,
        });
        
      }
      
    }
    catch(e) {
       if(e.isAxiosError) {
           callback('check your interconnection',undefined)
       }
       else {
        callback(e,undefined)
           }   
    }
  };

  module.exports = {
    getCords
  }