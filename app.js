const express = require('express')
const app = express()
const fs = require('fs')
const port = 3000

//Using EJS as the view engine
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
//   res.sendFile('./index.html', {root: __dirname})
    res.render('index')
})

app.get('/about', (req, res) => {
    // res.sendFile('./about.html', {root: __dirname})
    res.render('about')
})

app.get('/contact', (req, res) => {
    // res.sendFile('./contact.html', {root: __dirname})
    // const contacts = [
    //     {nama: 'Reynaldi', no_telp: '081255556666'},
    //     {nama: 'Tomi', no_telp: '081233334444'},
    //     {nama: 'Joni', no_telp: '081277778888'},
    //     {nama: 'Budi', no_telp: '081299990000'},
    // ]
    const contacts = []
    res.render('contact', {arr: contacts})
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