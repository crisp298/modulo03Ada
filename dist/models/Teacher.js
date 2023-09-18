"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Employee_1 = __importDefault(require("./Employee"));
class Teacher extends Employee_1.default {
    constructor(subject, isClassRegent, numberOfStudents, jobFunction, jobLocation, shift, name, id, nationalID) {
        super(jobFunction, jobLocation, shift, name, id, nationalID);
        this.subject = subject;
        this.isClassRegent = isClassRegent;
        this.numberOfStudents = numberOfStudents;
    }
}
exports.default = Teacher;
