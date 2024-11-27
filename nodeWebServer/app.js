const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/about', (req, res)=>{
    res.sendFile('./about.html', {root: __dirname})
})

app.get('/contact', (req, res)=> {
    res.send('Ini adalah halaman contact')
})

app.get('/product/:id', (req,res)=>{
    res.send(`Produk ${req.params.id} ${req.query.category}`)
})

app.use('/', (req, res) =>{
    res.status(404)
    res.send('404')
} )

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})