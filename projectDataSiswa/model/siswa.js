const mongoose= require('mongoose')
const Siswa = new mongoose.model('siswa',{
    name: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    age: {
        type: String,
        required: true
    }
})


// membaca Data
const readSiswa = ()=>{
    return Siswa.find()
}



// Menambah  data

const addSiswa =(name, email, age) => {
    return new Siswa({
        name: name,
        email: email,
        age: age
    }).save()
} 

// Menghapus data

const delSiswa = async(i) =>{
        const getIdByIndex = await Siswa.find().skip(i-1).limit(1).select('_id');
            const id = getIdByIndex[0]._id
            return Siswa.deleteOne({
                _id: id
            })
        }

    
    // if (getIdByIndex.length > 0) { 
    //     const id = getIdByIndex[0]._id
    //     return Siswa.deleteOne({
    //         _id: id
    //     })
    //   } else {
    //    console.log('Data Tidak Ditemukan')
    //   }



// Update data

const updateSiswa =  async(i, name, email, age) =>{
    const getIdByIndex = await Siswa.find().skip(i-1).limit(1).select('_id')
    const id = getIdByIndex[0]._id

    return Siswa.updateOne(
        {_id:id},
        {$set:{name: name, email: email, age: age}}
    )
}









module.exports = {Siswa, readSiswa, addSiswa, delSiswa, updateSiswa}  // export semua fungsi yang ada di dalam file ini.  // export
