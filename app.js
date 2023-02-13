const express = require('express')
const expressLayout = require('express-ejs-layouts')
const fs = require('fs')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const validator = require('validator')


const app = express()
const port = 3000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Using EJS as the view engine
app.set('view engine', 'ejs')

app.use(morgan('status'))

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
})

app.get('/contact', (req, res) => {
    // // res.sendFile('./contact.html', {root: __dirname})
    // const contacts = [
    //     {nama: 'Reynaldi', no_telp: '081255556666'},
    //     {nama: 'Tomi', no_telp: '081233334444'},
    //     {nama: 'Joni', no_telp: '081277778888'},
    //     {nama: 'Budi', no_telp: '081299990000'},
    // ]
    // const contacts = []
    res.render('contact', {title: 'Contacts', arr: (JSON.parse(fs.readFileSync('./public/contacts.json', 'utf-8'))), msg: req.query.success})
})

app.get('/contact/detail/:name', (req, res) => {
    let temp = JSON.parse(fs.readFileSync('./public/contacts.json', 'utf-8'))
    console.log(temp);
    let data = []
    temp.forEach(e => {
        if (e.name === req.params.name) {
            data.push(e)
        }
    });

    res.render('detail', {title: `${req.params.name}'s Contact Detail`, name: req.params.name, arr: data})
})

app.get('/contact/create', (req, res) => {
    res.render('create', {title: 'Create New Contact', name: "", email: "", phone: "", msg: req.query.err})
})

app.post('/contact/create', (req, res) => {    
    let data = JSON.parse(fs.readFileSync('./public/contacts.json', 'utf-8'))

    let same = data.filter((e) => e.name === req.body.newName)

    if (same.length > 0) {
        res.redirect('/contact/create?err=01')
    }else if(!validator.isMobilePhone(req.body.newPhone, ['id-ID'])) {
        res.redirect('/contact/create?err=02')
    }else {
        const newData = {name: req.body.newName, email: req.body.newEmail, phone: req.body.newPhone}
        data.push(newData)
        fs.writeFileSync('./public/contacts.json', JSON.stringify(data), 'utf-8')
        res.redirect('/contact?success=create')
    }
})

app.get('/contact/edit/:name', (req,res) => {
    const name = req.params.name
    let temp = JSON.parse(fs.readFileSync('./public/contacts.json', 'utf-8'))
    console.log(temp);
    let data = []
    temp.forEach(e => {
        if (e.name === name) {
            data.push(e)
        }
    });

    res.render('edit', {title: 'Edit contact detail', arr: data, oldName: name, msg: req.query.err})
})

app.post('/contact/edit/:oldname', (req,res) => {
    // let newData = {name: req.body.newName, email: req.body.newEmail, phone: req.body.newPhone}
    // console.log(newData)
    let data = JSON.parse(fs.readFileSync('./public/contacts.json', 'utf-8'))
    console.log(data);

    data = data.filter(e => e.name !== req.params.oldname)
    console.log(data);

    let same = data.filter((e) => e.name === req.body.newName)

    if (same.length > 0) {
        res.redirect(`/contact/edit/${req.params.oldname}?err=01`)
    }else if(!validator.isMobilePhone(req.body.newPhone, ['id-ID'])) {
        res.redirect(`/contact/edit/${req.params.oldname}?err=02`)
    }else {
        const newData = {name: req.body.newName, email: req.body.newEmail, phone: req.body.newPhone}
        data.push(newData)
        fs.writeFileSync('./public/contacts.json', JSON.stringify(data), 'utf-8')
        res.redirect('/contact?success=edit')
    }
})

app.get('/contact/delete/:name', (req,res) => {
    let data = JSON.parse(fs.readFileSync('./public/contacts.json', 'utf-8'))
    const newData = data.filter(e => e.name.toLowerCase() !== req.params.name.toLowerCase());
    fs.writeFileSync('./public/contacts.json', JSON.stringify(newData), 'utf-8')
    res.redirect('/contact?success=delete')
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