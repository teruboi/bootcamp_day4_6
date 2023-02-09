const express = require('express')
const expressLayout = require('express-ejs-layouts')
const app = express()
const fs = require('fs')
const port = 3000

//Using EJS as the view engine
app.set('view engine', 'ejs')

//EJS Layouts using Express-EJS-Layouts
app.use(expressLayout)
app.set('layout', './layout/full-width')

app.use((req, res, next) => {
    console.log('Time:', Date.now())
    next()
})

app.use(express.static('public'))

app.get('/', (req, res) => {
//   res.sendFile('./index.html', {root: __dirname})
    res.render('index', {title: 'Homepage'})
})

app.get('/about', (req, res, next) => {
    // res.sendFile('./about.html', {root: __dirname})
    res.render('about', {title: 'About'})
    next()
})

app.get('/contact', (req, res) => {
    // res.sendFile('./contact.html', {root: __dirname})
    const contacts = [
        {nama: 'Reynaldi', no_telp: '081255556666'},
        {nama: 'Tomi', no_telp: '081233334444'},
        {nama: 'Joni', no_telp: '081277778888'},
        {nama: 'Budi', no_telp: '081299990000'},
    ]
    // const contacts = []
    res.render('contact', {title: 'Contacts', arr: contacts})
})

app.get('/product/:id', (req, res) => {
    const id = req.params.id
    res.send(`This ${req.query.category} have a product id ${id}`)
})

app.use('/', (req, res) => {
    res.status(404)
    res.send('Page Not Found: 404')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})