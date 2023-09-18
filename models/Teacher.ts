import Employee from "./Employee";

class Teacher extends Employee{
    subject: string;
    isClassRegent: number;
    numberOfStudents: number;

    constructor(subject: string, 
                isClassRegent: number, 
                numberOfStudents: number, 
                jobFunction: string, 
                jobLocation: string, 
                shift: string, 
                name: string, 
                id:number, 
                nationalID: string){
        super(jobFunction, jobLocation, shift, name, id, nationalID)

        this.subject = subject;
        this.isClassRegent = isClassRegent;
        this.numberOfStudents = numberOfStudents;
                }
}

export default Teacher;