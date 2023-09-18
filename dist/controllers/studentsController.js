"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudent = exports.updateStudentBySpecificField = exports.updateStudent = exports.studentsMiddleSchool = exports.studentsListByYearAndRoom = exports.studentDetails = exports.addStudent = exports.studentsList = exports.studentsRoot = void 0;
const dbConfig_1 = require("../db/dbConfig");
const logger_1 = __importDefault(require("../services/logger"));
let db = (0, dbConfig_1.createDbConnection)();
const studentsRoot = (req, res) => {
    logger_1.default.info(req); //faz diferença se chama o log no início ou no fim do método - no fim chama o log só se a função rodar com sucesso
    logger_1.default.info(res);
    res.send("Students Main");
};
exports.studentsRoot = studentsRoot;
const studentsList = (req, res) => {
    logger_1.default.info(req);
    logger_1.default.info(res);
    let studentsList = []; //para declarar um arry do tipo Student e aceitar array vazio declara-se Student[] - sem isso só aceita se passar any
    let sql = `SELECT * FROM students`;
    db.all(sql, [], (error, rows) => {
        if (error) {
            return console.error(error.message);
        }
        rows.forEach((row) => { studentsList.push(row); });
        res.send(studentsList);
    });
};
exports.studentsList = studentsList;
const addStudent = (req, res) => {
    logger_1.default.info(req);
    logger_1.default.info(res);
    let student = req.body;
    let sql = `INSERT INTO students(name, shift, year, room) VALUES("${student.name}", "${student.shift}", "${student.year}","${student.room}")`;
    if (student.name && student.shift && student.year && student.room) {
        db.run(sql, (error) => {
            if (error) {
                return console.error(error.message);
            }
            res.send("Student Added");
        });
        res.send("Student Added");
    }
    else {
        res.send("Erro na criação do estudante./ Verifique se todos os campos foram preenchidos");
    }
};
exports.addStudent = addStudent;
const studentDetails = (req, res) => {
    logger_1.default.info(req);
    logger_1.default.info(res);
    let id = req.query.id;
    let sql = `SELECT * FROM students WHERE id=${id}`;
    console.log(id);
    //res.send("Student details");
    db.all(sql, [], (error, rows) => {
        if (error) {
            return console.error(error.message);
        }
        if (rows.length > 0) {
            res.send(rows[0]);
        }
        else {
            res.send("Estudante não existe");
        }
    });
};
exports.studentDetails = studentDetails;
const studentsListByYearAndRoom = (req, res) => {
    var _a;
    logger_1.default.info(req);
    logger_1.default.info(res);
    let studentsList = [];
    let year = req.query.year;
    let room = (_a = req.query.room) === null || _a === void 0 ? void 0 : _a.toString().toUpperCase();
    let sql = `SELECT * FROM students WHERE year = "${year}" AND room = "${room}"`;
    db.all(sql, [], (error, rows) => {
        if (error) {
            return console.error(error.message);
        }
        if (rows.length > 0) {
            rows.forEach((row) => { studentsList.push(row); });
            res.send(studentsList);
        }
        else {
            res.send("Os parâmetros não retornam resultado");
        }
    });
};
exports.studentsListByYearAndRoom = studentsListByYearAndRoom;
const studentsMiddleSchool = (req, res) => {
    logger_1.default.info(req);
    logger_1.default.info(res);
    let studentsList = [];
    //let year = req.query.year;
    //let room = req.query.room?.toString().toUpperCase();
    let sql = `SELECT * FROM students WHERE year > 5`;
    db.all(sql, [], (error, rows) => {
        if (error) {
            return console.error(error.message);
        }
        if (rows.length > 0) {
            rows.forEach((row) => { studentsList.push(row); });
            res.send(studentsList);
        }
        else {
            res.send("Os parâmetros não retornam resultado");
        }
    });
};
exports.studentsMiddleSchool = studentsMiddleSchool;
const updateStudent = (req, res) => {
    logger_1.default.info(req);
    logger_1.default.info(res);
    //let id: any = req.query.id; - se quiser usar id para identificar, mas pode usar o student todo
    let student = req.body;
    let sql = `UPDATE students SET name ="${student.name}", shift="${student.shift}", year="${student.year}", room="${student.room}" WHERE id="${student.id}`;
    db.all(sql, [], (error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("Student Updated");
    });
};
exports.updateStudent = updateStudent;
const updateStudentBySpecificField = (req, res) => {
    logger_1.default.info(req);
    logger_1.default.info(res);
    let student = req.body;
    let sql = `UPDATE students SET name = "${student.name}"
                            WHERE id = "${student.id}"`;
    db.all(sql, [], (error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("Student Updated");
    });
};
exports.updateStudentBySpecificField = updateStudentBySpecificField;
const deleteStudent = (req, res) => {
    logger_1.default.info(req);
    logger_1.default.info(res);
    let id = req.query.id;
    let sql = `DELETE from students WHERE id="${id}"`; //não precisa* para dizer o que deleta pois parametro usado (id) é unico
    db.all(sql, [], (error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("Studennt Deleted");
    });
    res.send("Student Deleted");
};
exports.deleteStudent = deleteStudent;
