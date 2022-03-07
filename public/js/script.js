// import axios from '../../node_modules/axios';

const form = document.querySelector('#form');
const search = document.querySelector('#input');
const add = document.querySelector('.add');
const weatherDes = document.querySelector('.weatherDes');

async function getWeatherData(address='nainital') {
    try{
        const dataJson = await fetch(`http://localhost:3000/weather?address=${address}`);
        const data  = await dataJson.json();
         if(data.error) {
          add.innerText = data.error;
          weatherDes.innerText = '' 
        }
       else {
        add.innerText = data.location;
        weatherDes.innerText = data.forecastData;
       }
        
    }
    catch(e) {
        console.log(e);
    }
}


form.addEventListener('submit',(event)=>{
    event.preventDefault();

    const address = search.value;
    if(address) {
        getWeatherData(address);
        search.value = ''
        search.focus();
    }
    else alert('enter city name')
    
})