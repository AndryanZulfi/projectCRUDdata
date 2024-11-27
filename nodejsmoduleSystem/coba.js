function greeting(name, age){
    return `My name is ${name} and I am ${age}`
}


const dataSiswa = {
    name: 'Andryan',
    age: 17,
    introduction(){
        console.log(`My name is ${this.name} and I am ${this.age}`)
    }
}


class Person{
    constructor(name, age){
        this.name = name
        this.age = age
    }
    eat(){
        return`${this.name} is eating`
    }
}



module.exports = {greeting, dataSiswa, Person} 
