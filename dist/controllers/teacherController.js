"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTeacher = exports.updateTeacherShift = exports.updateTeacherName = exports.updateTeacher = exports.teacherListBySubject = exports.teacherDetails = exports.addTeacher = exports.teacherList = exports.teacherRoot = void 0;
const dbConfig_1 = require("../db/dbConfig");
const logger_1 = __importDefault(require("../services/logger"));
let db = (0, dbConfig_1.createDbConnection)();
const teacherRoot = (req, res) => {
    logger_1.default.info(req);
    logger_1.default.info(res);
    res.send("Teacher Main");
};
exports.teacherRoot = teacherRoot;
const teacherList = (req, res) => {
    logger_1.default.info(req);
    logger_1.default.info(res);
    let teacherList = [];
    let sql = `SELECT * FROM teacher`;
    db.all(sql, [], (error, rows) => {
        if (error) {
            return console.error(error.message);
        }
        rows.forEach((row) => { teacherList.push(row); });
        res.send(teacherList);
    });
};
exports.teacherList = teacherList;
const addTeacher = (req, res) => {
    logger_1.default.info(req);
    logger_1.default.info(res);
    let teacher = req.body;
    let sql = `INSERT INTO teacher(name, 
                                jobFunction, 
                                jobLocation, 
                                subject, 
                                isClassRegent, 
                                numberOfStudents, 
                                shift, 
                                nationalID) VALUES("${teacher.name}", "${teacher.jobFunction}", "${teacher.jobLocation}","${teacher.subject}","${teacher.isClassRegent}","${teacher.numberOfStudents}","${teacher.shift}", "${teacher.nationalID}")`;
    //if(teacher.name && teacher.jobFunction && teacher.jobLocation && teacher.subject && teacher.isClassRegent && teacher.numberOfStudents && teacher.shift && teacher.nationalID){
    db.run(sql, (error) => {
        if (error) {
            return console.error(error.message);
        }
        res.send("Teacher Added");
    });
    res.send("Teacher Added");
    //}else{
    //  res.send("Erro na criação do funcinário(professor)./ Verifique se todos os campos foram preenchidos");
    //}
};
exports.addTeacher = addTeacher;
const teacherDetails = (req, res) => {
    logger_1.default.info(req);
    logger_1.default.info(res);
    let id = req.query.id;
    let sql = `SELECT * FROM teacher WHERE id=${id}`;
    console.log(id);
    db.all(sql, [], (error, rows) => {
        if (error) {
            return console.error(error.message);
        }
        if (rows.length > 0) {
            res.send(rows[0]);
        }
        else {
            res.send("Professor não existe");
        }
    });
};
exports.teacherDetails = teacherDetails;
const teacherListBySubject = (req, res) => {
    logger_1.default.info(req);
    logger_1.default.info(res);
    let teacherList = [];
    let subject = req.query.subject;
    let sql = `SELECT * FROM teacher WHERE subject = "${subject}"`;
    db.all(sql, [], (error, rows) => {
        if (error) {
            return console.error(error.message);
        }
        if (rows.length > 0) {
            rows.forEach((row) => { teacherList.push(row); });
            res.send(teacherList);
        }
        else {
            res.send("Os parâmetros não retornam resultado");
        }
    });
};
exports.teacherListBySubject = teacherListBySubject;
const updateTeacher = (req, res) => {
    logger_1.default.info(req);
    logger_1.default.info(res);
    let teacher = req.body;
    let sql = `UPDATE teacher SET name ="${teacher.name}", 
                                    jobFunction= "${teacher.jobFunction}",  
                                    subject= "${teacher.subject}",
                                    isClassRegent= "${teacher.isClassRegent}",
                                    numberOfStudents= "${teacher.numberOfStudents}",
                                    jobLocation= "${teacher.jobLocation}",
                                    shift="${teacher.shift}", 
                                    nationalID= "${teacher.nationalID}" WHERE id=${teacher.id}`;
    db.all(sql, [], (error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("Teacher Updated");
    });
};
exports.updateTeacher = updateTeacher;
const updateTeacherName = (req, res) => {
    logger_1.default.info(req);
    logger_1.default.info(res);
    let teacher = req.body;
    let sql = `UPDATE teacher SET name = "${teacher.name}"
                            WHERE id = "${teacher.id}"`;
    db.all(sql, [], (error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("Teacher Updated");
    });
};
exports.updateTeacherName = updateTeacherName;
const updateTeacherShift = (req, res) => {
    logger_1.default.info(req);
    logger_1.default.info(res);
    let teacher = req.body;
    let sql = `UPDATE teacher SET shift = "${teacher.shift}"
                            WHERE id = "${teacher.id}"`;
    db.all(sql, [], (error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("Teacher Updated");
    });
};
exports.updateTeacherShift = updateTeacherShift;
const deleteTeacher = (req, res) => {
    logger_1.default.info(req);
    logger_1.default.info(res);
    let id = req.query.id;
    let sql = `DELETE from teacher WHERE id="${id}"`;
    db.all(sql, [], (error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("Teacher Deleted");
    });
    res.send("Teacher Deleted");
};
exports.deleteTeacher = deleteTeacher;
