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
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))



app.get('/', async(req, res)=>{

    const listSiswa = await siswa.readSiswa()
        res.render('index', {
                layout: 'layouts/main-layout',
                title: 'Home',
                listSiswa
            })
        })




app.post('/add', async(req, res)=>{
    const {name, email, age} = req.body
    await siswa.addSiswa(name, email, age)
    res.redirect('/')
})

        
app.get('/create', async(req, res) => {
    const listSiswa = await siswa.readSiswa()
        res.render('create',{
                layout: 'layouts/main-layout',
                title: 'Create Data',
                listSiswa
            })

        })

app.post('/update', async(req, res)=>{
    const {updateId,updateName, updateEmail, updateAge} = req.body
    await siswa.updateSiswa(updateId, updateName, updateEmail, updateAge)
    res.redirect('/')

})

app.get('/update', async(req,res) => {
    const listSiswa = await siswa.readSiswa()
        res.render('update', {
                layout: 'layouts/main-layout',
                title: 'Update Data',
                listSiswa
            })
        })
        
app.post('/delete', async(req, res) =>{
    const {deleteId} = req.body
    await siswa.delSiswa(deleteId)
    res.redirect('/'),
    (err, result) =>{
        if(err){
            res.send('404')
            res.status(404)
        }
        return result
    }
})



app.get('/delete', async(req, res) => {
    const listSiswa = await siswa.readSiswa()
        res.render('delete', {
                layout: 'layouts/main-layout',
                title: 'Delete Data',
                listSiswa
            })
        })
app.listen(port, ()=>{
    console.log(`Server berjalan di port ${port}`)
})











