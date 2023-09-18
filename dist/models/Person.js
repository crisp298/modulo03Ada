"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Person {
    //timeOfContract()
    constructor(name, id, nationalID) {
        //this.name = name;///propriedade abstrata não entra no construtor, só na classe filha.
        // this.id = id;
        this.nationalID = nationalID; //esta é concreta, e precisa ser inicializada no construtor aqui. Nasfilhas queherdam deixa de ser opcional
    }
}
exports.default = Person;
