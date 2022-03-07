const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const geocode = require('./utills/geocode');
const foreCast= require('./utills/foreCast')


const publicPath = path.join(__dirname,'../public');
const viewPath = path.join(__dirname, '../templets/views');
const partialsPath = path.join(__dirname, '../templets/partials')

// to get syatic pages from folder public
app.use(express.static(publicPath));


// to render dynamic pages from the view folders
app.set('view engine', 'hbs');
app.set('views',viewPath);
hbs.registerPartials(partialsPath);

// route to index page
app.get('',(req,res)=>{
  res.render('index', {
    title: 'weather',
    name:'rajesh bhatt'
  });
})

app.get('/about', (req,res)=>{
    res.render('about', {
      title: 'about'
    });
});

app.get('/help',(req, res) => {
  res.render('help', {
    title: 'help page',
    message: 'pleasse check documentations before doing anythig'
  })
})
app.get('/contact', (req, res)=>{
   res.render('contact')
});


// weather page
app.get('/weather',(req,res)=>{

  if(!req.query.address) {
    return res.send({
      error: "address not found"
    })
  }

  geocode.getCords(req.query.address,(error,{log,lat,location}={}) =>{
    if(error) {
      return res.send({
         error,
       })
      }

      // call the weathar cast 
       foreCast.getWeather(log,lat,(error,forecastData)=>{
         if(error) {
           return res.send({
             error
           })  
         }
         res.send({
           location,
           forecastData
         })

       })

  
  });

// const result = geocode(req.query.address);
//  const result = geocode.getCords();

// (req.query.address,(cords,location)=>{
//    console.log(cords,location);
//  })

//   res.send(
   
//   )
 });

// 404 
app.get("*",(req,res) =>{
  res.render('404')
})


app.listen(3000,()=>{
    console.log('express is started');
})