const {MongoClient} = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017'
const dbName = 'zlf'

const client = new MongoClient(uri)
const db = client.db(dbName)


async function run(){
   try{
      await client.connect()
      await db.command({ping: 1})

      // Menambahkan satu data
      // db.collection('siswa').insertOne(
      //    {name: 'Bella', age: 16},
      //    (error, result) => {
      //       if(error){
      //          console.log('Gagal menambahkan data')
      //       }
      //       console.log(result)
      //       console.log('Data berhasil ditambahkan')
      //    })

      // Menambahkan beberapa data
      // await db.collection('siswa').insertMany(
      //    [
      //       {
      //          name: 'Handika',
      //          nisn : '8484785',
      //          email: 'han@gmail.com',
      //          noHp: '4848758474'
      //       },
      //       {
      //          name : "Rama",
      //          nisn : '384758394',
      //          email: 'rama@gmail.com',
      //          noHp: '844744453'
      //       }
      //    ],
      //    (error, result) => {
      //       if(error){
      //          return console.log('Gagal menambahkan data')
      //       }
      //       console.log('Berhasil menambahkan data' + result)
      //    }
      // )


      // Membaca data
   //   const data = await db.collection('siswa').find().toArray()
   //   console.log(data)

      // Membaca data dengan filter
      const data = await db.collection('siswa').find().toArray()
      const allData = data.map(el => el.name)
      console.log(allData)

      // MengUpdate satu data
      // const updateData = db.collection('siswa').updateOne(
      //    {_id : new ObjectId('6744171d86b36358bd5a7685')},
      //    {$set : {age : 17}},
      //    (error, result) => {
      //       if(error){
      //          console.log(error)
      //       }

      //       console.log(result)
      //    }
      // )

      // updateData.then((result) => {
      //    console.log(result)
      // })
      // .catch((e) => {
      //    console.log(e)
      // })


         // mengUpdate beberapa data

      // await db.collection('siswa').updateMany(
      //    {name: 'Bella'},
      //    {$set : {age : 17, email : 'bella@gmail.com'}},
      //    (error, result) => {
      //       if(error){
      //          console.log(error)
      //       }
      //       console.log(result)
      //    }
      // )
      
      // menghapus data

      // Menghapus satu data atau data yang sama
      // const deletData = db.collection('siswa').deleteOne(
      //    {name: 'Zulfi'},
      //    (error, result) => {
      //       if(error){
      //          console.log(error)
      //       }

      //       console.log(result)
      //    }
      // )

      // deletData
      // .then(result => console.log(result))
      // .catch(e => console.log('maaf' + e))

      // menghapus data lebih dari satu

      // await db.collection('siswa').deleteMany(
      //    {noHp: "0854893485"},
      //    ((e, result) => {
      //       if(e){
      //          console.log(e)
      //       }

      //       console.log(result)
      //    })
      // )

      // await db.collection('siswa').bulkWrite([
      //    {insertOne: {document : {_id: 1, name: 'Zulfi', noHp: '0854893485'}}},
      //    {insertOne: {document: {_id : 2, name: 'Saputra', noHp: '0854893486'}}},
      //    {updateOne: {
      //       filter: {name : "Bella"},
      //       update : {$set: {type: "myLove"}}
      //    }},
      //    {deleteOne:{ filter: {name: 'Rama'}} },
      //    {replaceOne : {
      //       filter: {name: 'Handika'},
      //       replacement: {name: 'Julpikri', age: 17}
      //    }}
      // ])
   }finally {
      await client.close()
   }
}
run().catch(console.dir)

//  client.connect((error, client) => {
//    if(error){
//       return console.log('Erorrr')
//    }
//    console.log('Berhasil konek')
//  })