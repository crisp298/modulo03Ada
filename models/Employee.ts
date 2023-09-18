import Person from "./Person";

class Employee extends Person{
    name: string;
    id: number;
    jobFunction: string;
    jobLocation: string;
    shift: string;
    nationalID?: string;


    constructor(jobFunction: string, jobLocation: string, shift: string, name: string, id:number, nationalID: string){
        super(name, id, nationalID)

        this.jobFunction = jobFunction;
        this.jobLocation = jobLocation;
        this.shift = shift;
        this.name = name;
        this.id = id;
        this.nationalID = nationalID;
    }
}





export default Employee