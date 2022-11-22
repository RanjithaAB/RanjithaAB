const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))
// console.log(__filename)

const app=express()
const port=process.env.PORT||3000

// Define paths for express config
const publicDirectory=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//Set up handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

//Set up static directory to serve
app.use(express.static(publicDirectory))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Ranjitha A B'
    })
})

// app.get('/weather',(req,res)=>{
//     res.send('<h1>Weather</h1>')
//     // res.send('Hello Express!')

// })

// app.get('/help',(req,res)=>{
//     res.send([{
//         // name:'Ranjitha',
//         // age:24
//         name:'Ranjitha'
//     },{
//         name:'Suni'

//     }
//     ])
//     // res.send('Help page')
// })


// app.get('/about',(req,res)=>{
//     // res.send('About page')
//     res.send('<h1>About</h1>')

// })

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Ranjitha A B'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help App',
        name:'Ranjitha A B'
    })
})

app.get('/weather',(req,res)=>{
    // res.send('Your weather')
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })

    // res.send({
    //     forecast:'It is snowing',
    //     location:'Philadelphia',
    //     address:req.query.address
    // })
})

// app.get('/products',(req,res)=>{
//     res.send({
//         products:[]
//     })

// })

app.get('/products',(req,res)=>{
    if(!req.query.search){
      return  res.send({
            error:'You must provide a search term'
        })
    }

    console.log(req.query.search,req.query.rating)
    res.send({
        products:[]
    })
})


// app.get('/products',(req,res)=>{
//     console.log(req.query.search)
//     res.send({
//         products:[]
//     })
// })

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Ranjitha A B',
        errorMessage:'Help article not found. '
    })
    // res.send("Help article not found")
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Ranjitha A B',
        errorMessage:'Page not Found.'
    })
    // res.send('My 404 page')
})

//app.com
//app.com/help
//app.com/about

app.listen(port,()=>{
    console.log('Server is up on port'+port)
})