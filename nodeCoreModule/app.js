const addData = require('./addData')

const yargs = require("yargs");


// Yargs version
yargs.command({
  command: 'add',
  describe: 'Menambahkan data',
  builder: {
      name : {
          describe: 'Nama Lengkap',
          demandOption: true,
          type: 'string'
      },
      nisn : {
          describe : 'NISN',
          demandOption: true,
          type: 'string'
      },
      email : {
          describe : 'Email aktif',
          demandOption: true,
          type : 'string'
      },
      noHp : {
          describe: "Nomor hp aktif",
          demandOption: true,
          type: "string"
      }
  },
  handler(argv){
      addData.addData(argv.name, argv.nisn, argv.email, argv.noHp)
  }
})

yargs.command({
  command: "read",
  describe: "Lihat data",
  handler(argv){
      addData.readData(addData.dataPath)
  }
})

yargs.command({
  command : 'rm',
  describe : 'Menghapus data',
  builder: {
      name: {
          describe: 'Nama data yang ingin di hapus',
          demandOption: true,
          type: 'string'
      }
  },
  handler(argv){
      addData.hapusData(argv.name)
  }
})



yargs.parse()



