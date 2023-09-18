"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.updateEmployeeBySpecificField = exports.updateEmployee = exports.employeeListByShift = exports.employeeDetails = exports.addEmployee = exports.employeeList = exports.employeeRoot = void 0;
const dbConfig_1 = require("../db/dbConfig");
const logger_1 = __importDefault(require("../services/logger"));
let db = (0, dbConfig_1.createDbConnection)();
const employeeRoot = (req, res) => {
    logger_1.default.info(req);
    logger_1.default.info(res);
    res.send("Employee Main");
};
exports.employeeRoot = employeeRoot;
const employeeList = (req, res) => {
    logger_1.default.info(req);
    logger_1.default.info(res);
    let employeeList = [];
    let sql = `SELECT * FROM employee`;
    db.all(sql, [], (error, rows) => {
        if (error) {
            return console.error(error.message);
        }
        rows.forEach((row) => { employeeList.push(row); });
        res.send(employeeList);
    });
};
exports.employeeList = employeeList;
const addEmployee = (req, res) => {
    logger_1.default.info(req);
    logger_1.default.info(res);
    let employee = req.body;
    let sql = `INSERT INTO employee(name, jobFunction, jobLocation, shift, nationalID) VALUES("${employee.name}", "${employee.jobFunction}", "${employee.jobLocation}","${employee.shift}", "${employee.nationalID}")`;
    if (employee.name && employee.jobFunction && employee.jobLocation && employee.shift && employee.nationalID) {
        db.run(sql, (error) => {
            if (error) {
                return console.error(error.message);
            }
            res.send("Employee Added");
        });
        res.send("Employee Added");
    }
    else {
        res.send("Erro na criação do funcinário./ Verifique se todos os campos foram preenchidos");
    }
};
exports.addEmployee = addEmployee;
const employeeDetails = (req, res) => {
    logger_1.default.info(req);
    logger_1.default.info(res);
    let id = req.query.id;
    let sql = `SELECT * FROM employee WHERE id=${id}`;
    console.log(id);
    db.all(sql, [], (error, rows) => {
        if (error) {
            return console.error(error.message);
        }
        if (rows.length > 0) {
            res.send(rows[0]);
        }
        else {
            res.send("Funcionário não existe");
        }
    });
};
exports.employeeDetails = employeeDetails;
const employeeListByShift = (req, res) => {
    logger_1.default.info(req);
    logger_1.default.info(res);
    let employeeList = [];
    let shift = req.query.shift;
    let sql = `SELECT * FROM employee WHERE shift = "${shift}"`;
    db.all(sql, [], (error, rows) => {
        if (error) {
            return console.error(error.message);
        }
        if (rows.length > 0) {
            rows.forEach((row) => { employeeList.push(row); });
            res.send(employeeList);
        }
        else {
            res.send("Os parâmetros não retornam resultado");
        }
    });
};
exports.employeeListByShift = employeeListByShift;
const updateEmployee = (req, res) => {
    logger_1.default.info(req);
    logger_1.default.info(res);
    let employee = req.body;
    let sql = `UPDATE employee SET name ="${employee.name}", 
                                    jobFunction ="${employee.jobFunction}", 
                                    jobLocation ="${employee.jobLocation}",
                                    shift ="${employee.shift}", 
                                    nationalID = "${employee.nationalID}" WHERE id =${employee.id}`;
    db.all(sql, [], (error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("Employee Updated");
    });
};
exports.updateEmployee = updateEmployee;
const updateEmployeeBySpecificField = (req, res) => {
    logger_1.default.info(req);
    logger_1.default.info(res);
    let employee = req.body;
    let sql = `UPDATE employee SET name = "${employee.name}"
                            WHERE id = "${employee.id}"`;
    db.all(sql, [], (error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("Employee Updated");
    });
};
exports.updateEmployeeBySpecificField = updateEmployeeBySpecificField;
const deleteEmployee = (req, res) => {
    logger_1.default.info(req);
    logger_1.default.info(res);
    let id = req.query.id;
    let sql = `DELETE from employee WHERE id="${id}"`;
    db.all(sql, [], (error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("Employee Deleted");
    });
    res.send("Employee Deleted");
};
exports.deleteEmployee = deleteEmployee;
