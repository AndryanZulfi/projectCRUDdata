const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const app = express()


// EJS
app.set('view engine', 'ejs')
app.use(expressLayouts)

// middleware

app.use(express.static('public'))

app.get('/', (req, res) => {
    const data = [
        {name: 'Andryan', age: 20},
        {name: 'Budi', age: 21},
        {name: 'Caca', age: 22}
    ]

    res.render('home', {
        nama: 'ZLF', 
        title: "Halaman Home",
        data,
        layout: 'layouts/main-layout'
    })
})

app.get('/about', (req, res)=>{
    res.render('about',
        { 
            layout: 'layouts/main-layout',
            title: 'Halaman about',
            
        }
    )
})


app.get('/contact', (req, res)=> {
    res.render('contact',
        {
            layout: 'layouts/main-layout',
            title: 'Halaman kontak'
        }
    )
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

