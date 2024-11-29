const fs = require('fs')
const readline = require('node:readline')
const { stdin: input, stdout: output } = require('node:process');
// const { resolve } = require('dns/promises');
var validator = require('validator');
const rl = readline.createInterface({input, output});

const dirPath = './data'
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath)
}

const dataPath = './data/dataSiswa.json'
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath, '[]', 'utf8')
}



class ValidatorData {
    constructor(data) {
        this.data = data
    }

    email(){
        return validator.isEmail(this.data)
    }
    name(){
        return validator.isAlpha(this.data)
    }
    nisn(){
        return validator.isNumeric(this.data) && this.data.length == 8
    }
    noHp(){
        return validator.isMobilePhone(this.data, 'id-ID')
    }
}


class ValidatorQuestion{
    constructor(question){
        this.question = question
    }

    addData(){
        return /a\s*d\s*d\s*D\s*a\s*t\s*a/i.test(this.question) 
    }
    readData(){
        return /r\s*e\s*a\s*d\s*D\s*a\s*t\s*a/i.test(this.question)
    }
    editData(){
        return /e\s*d\s*i\s*t\s*D\s*a\s*t\s*a/i.test(this.question)
    }
    addReadEdt(){
        return this.question.trim() !== '' && (this.addData() || this.readData() || this.editData())
    }
    hapusData(){
        return /h\s*a\s*p\s*u\s*s\s*d\s*a\s*t\s*a/i.test(this.question)
    }
    updatedata(){
        return /u\s*p\s*d\s*a\s*t\s*e\s*d\s*a\s*t\s*a/i.test(this.question)
    }
    rmUpdt(){
        return this.question.trim() !== '' && (this.hapusData() || this.updatedata())
        // return /h\s*a\s*p\s*u\s*s\s*d\s*a\s*t\s*a/i.test(this.data)
    }
    email(){
        return /email/i.test(this.question)
    }
    name(){
        return /name/i.test(this.question)
    }
    nisn(){
        return /nisn/i.test(this.question)
    }
    noHp(){
        return /noHp/i.test(this.question)
    }

    allData(){
        return this.question.trim() !== '' && (this.email() ||this.name() || this.nisn() || this.noHp())
    }
}


const createPertanyaan = async (pertanyaan, callback) =>{
        return new Promise((resolve) => {
            const tanya = () => {
                rl.question(pertanyaan, (answer) =>{
                    if(callback(answer)){
                        resolve(answer)
                    }else{
                        console.log('Input tidak valid. Silahkan coba lagi')
                        tanya()
                    }
                })
            }
            tanya()
        })
};

// add data
const addData = (name, nisn, email, noHp) =>{
        const data = {name, nisn, email, noHp}
        const file = fs.readFileSync(dataPath, 'utf8')
        const dataSiswa = JSON.parse(file)
        dataSiswa.push(data)
        fs.writeFileSync(dataPath, JSON.stringify(dataSiswa))
        console.log('Terima Kasih sudah menambahkan data')     
}
// hapus data
const hapusData = (name) =>{
    const data = fs.readFileSync(dataPath, 'utf8')
    const dataJson = JSON.parse(data)
    const newData = dataJson.filter(object => object.name !== name)
    fs.writeFileSync(dataPath, JSON.stringify(newData), 'utf-8')
    console.log(`Data ${name} berhasil dihapus`)
    

    if(dataJson.length == newData.length){
        console.log(`${name} tidak ditemukan`)
        return false
    }
}


// update data
const updatedata = (nameData, propData,  nilaidata) => {
    const file = fs.readFileSync(dataPath, 'utf8')
    const dataJson = JSON.parse(file)

    // mencari index data yang indin di ubah
    const findDataIndex = dataJson.findIndex(el => el.name === nameData)
    dataJson[findDataIndex][propData] = nilaidata
    fs.writeFileSync(dataPath, JSON.stringify(dataJson), 'utf-8')
    console.log(dataJson)
}
// readdata
const readData = (dataPath) =>{
    const file = fs.readFileSync(dataPath, 'utf8')
    const data =JSON.parse(file)
    console.log(data)
}

module.exports = {createPertanyaan, dataPath, dirPath, validator, fs, readData, hapusData, addData, updatedata, ValidatorData, ValidatorQuestion, rl}  //export module

