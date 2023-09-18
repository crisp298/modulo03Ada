"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Person_1 = __importDefault(require("./Person"));
class Employee extends Person_1.default {
    constructor(jobFunction, jobLocation, shift, name, id, nationalID) {
        super(name, id, nationalID);
        this.jobFunction = jobFunction;
        this.jobLocation = jobLocation;
        this.shift = shift;
        this.name = name;
        this.id = id;
        this.nationalID = nationalID;
    }
}
exports.default = Employee;
