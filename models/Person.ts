abstract class Person {
    abstract name: string;
    //dateOfBirth: string;
    //dateOfStartInSchool: string;
    abstract id: number;
    nationalID?: string;

    //timeOfContract()

    constructor(name: string, id: number, nationalID: string){
        //this.name = name;///propriedade abstrata não entra no construtor, só na classe filha.
       // this.id = id;
        this.nationalID = nationalID//esta é concreta, e precisa ser inicializada no construtor aqui. Nasfilhas queherdam deixa de ser opcional
    }

}

export default Person;