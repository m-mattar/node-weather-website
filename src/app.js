const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Maria Mattar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Maria Mattar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpMessage: 'I am trying to help you out!',
        title: 'Help',
        name: 'Maria Mattar'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {} ) => {
        if(error) return res.send({error})

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) return res.send({error})

            res.send({
                forecast: forecastData,
                location: location, 
                address: req.query.address         
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Maria Mattar',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Maria Mattar',
        errorMessage: 'Page not found'
    })
})

// start server 
// port 3000 is a common dev port, works locally on our machine
app.listen(3000, () => {
    console.log('Server is up on port 3000')
}) 