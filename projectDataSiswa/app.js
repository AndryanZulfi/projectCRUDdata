const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const port = 3000

// Mongodb

const bodyParser = require('body-parser')

require('./utils/db')
const siswa = require('./model/siswa')

// EJS
app.set('view engine', 'ejs')
app.set('views', './views');
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))




// Halaman root
app.get('/', async(req, res)=>{

    const listSiswa = await siswa.readSiswa()
        res.render('index', {
                layout: 'layouts/main-layout',
                title: 'Home',
                listSiswa
            })
        })



// Halaman create
app.post('/create', (req, res)=>{
    const {name, email, age} = req.body
    try{
        siswa.addSiswa(name, email, age)
        res.redirect(`/create?id=${name}&&success=true`)
    }catch(e){
        res.redirect(`/create?id=${name}&&success=false`)
    }
})

        
app.get("/create", async(req, res) => {
    const listSiswa = await siswa.readSiswa()
    const id = req.query
        res.render('create',{
                layout: 'layouts/main-layout',
                title: 'Create Data',
                listSiswa,
                id
            })

        })


   // Halaman Update
app.post('/update', async(req, res)=>{
    const {updateId,updateName, updateEmail, updateAge} = req.body
    try{
        await siswa.updateSiswa(updateId, updateName, updateEmail, updateAge)
        res.redirect(`/update?id=${updateId}&&success=true`)
    }catch(e){
        res.redirect(`/update?id=${updateId}&&success=false`)
    }

})


app.get('/update', async(req,res) => {
    const listSiswa = await siswa.readSiswa()
    const id = req.query
        res.render('update', {
                layout: 'layouts/main-layout',
                title: 'Update Data',
                listSiswa,
                id
            })
        })
        

// Halaman Delete

app.post('/delete', async(req, res) =>{
        const {id} = req.body
        try{
            await siswa.delSiswa(parseInt(id))
            res.redirect(`/delete?id=${id}&&success=true`)
        }catch(e){
            res.redirect(`/delete?id=${id}&&success=false`)
            console.log('Data tidak ditemukan')
        }
    })
    
app.get(`/delete`,async(req,res)=>{
        const id = req.query
        const listSiswa = await siswa.readSiswa()
        res.render('./delete', {
            layout: 'layouts/main-layout',
            title: `Delete Data `,
            listSiswa,
            id
        })
    })     
// Haaman 404
app.use('/',(req, res)=>{
    res.status(404).send('404')
})

app.listen(port, ()=>{
    console.log(`Server berjalan di port ${port}`)
})











