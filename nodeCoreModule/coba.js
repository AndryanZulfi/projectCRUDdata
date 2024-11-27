const addData = require('./addData')

const main = async()=>{
    const opsi = await addData.createPertanyaan('addData : readData : editData? ', 
        (answer)=> new addData.ValidatorQuestion(answer).addReadEdt())

    
// edit data
    if (new addData.ValidatorQuestion(opsi).editData()){
        addData.readData(addData.dataPath)
        const choice = await addData.createPertanyaan('Hapusdata : updatedata? ',
            (answer)=> new addData.ValidatorQuestion(answer).rmUpdt())
        
        // hapus data
        if(new addData.ValidatorQuestion(choice).hapusData()){
             const data = await addData.createPertanyaan('Masukan nama yang ingin di hapus: ', (answer)=> answer.trim() !== '' && answer.trim().length > 0)
             addData.hapusData(data)
             console.log('Data Baru')
             addData.readData(addData.dataPath)
             addData.rl.close()
        // update data
        }else if(new addData.ValidatorQuestion(choice).updatedata()){
            const dataName =  await addData.createPertanyaan('Masukan nama yang ingin di update: ', (answer)=> answer.trim() !== '' && answer.trim().length > 0)
            const propData = await addData.createPertanyaan('Masukan data yang ingin di update : ', (answer)=> new addData.ValidatorQuestion(answer).allData())
            const newdata = await addData.createPertanyaan(`Masukkan nilai ${propData} baru: `, (answer) => answer.trim() !== '' && answer.trim().length > 0)
            addData.updatedata(dataName, propData, newdata)
            addData.rl.close()
        }
    }
// add data
    else if(new addData.ValidatorQuestion(opsi).addData()){
        const name = await addData.createPertanyaan('Masukkan nama Anda : ',
           (answer) => new addData.ValidatorData(answer).name())
        
        const nisn = await addData.createPertanyaan('Masukkan NISN Anda : ',
            (answer) => new addData.ValidatorData(answer).nisn() )
    
        const email = await addData.createPertanyaan('Masukan Email Anda : ', 
            (answer) => new addData.ValidatorData(answer).email())
        
        const noHp = await addData.createPertanyaan('Masukkan NoHp Anda: ',
            (answer) => new addData.ValidatorData(answer).noHp()
        )
    
        addData.addData(name, nisn, email, noHp)
        addData.rl.close()

// read data
    }else if(new addData.ValidatorQuestion(opsi).readData()){
        addData.readData(addData.dataPath)
        addData.rl.close()
    }
}




main()
