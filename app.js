const express = require('express')
const app = express()
const fs = require('fs')
const port = 3000

app.get('/', (req, res) => {
  res.sendFile('./index.html', {root: __dirname})
})

app.get('/about', (req, res) => {
    res.sendFile('./about.html', {root: __dirname})
})

app.get('/contact', (req, res) => {
    res.sendFile('./contact.html', {root: __dirname})
})

app.get('/product/:prodID/category/:cat', (req, res) => {
    const id = req.params.prodID
    const cat = req.params.cat
    res.send(`This ${cat} have a product id ${id}`)
})

app.use('/', (req, res) => {
    res.status(404)
    res.send('Page Not Found: 404')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})