import { Response, Request} from "express";
import Teacher from "../models/Teacher";
import { createDbConnection } from "../db/dbConfig";
import { request } from "http";
import logger from "../services/logger";

let db = createDbConnection();

const teacherRoot = (req: Request, res: Response) => {
    logger.info(req);
    logger.info(res);

    res.send("Teacher Main");
};

const teacherList = (req: Request, res: Response) => {
    logger.info(req);
    logger.info(res);

    let teacherList: Teacher[] = []; 
    let sql = `SELECT * FROM teacher`;
    db.all(sql, [], (error: Error, rows: Teacher[]) => {
        if (error) {
            return console.error(error.message);
        }
        rows.forEach((row: Teacher) => { teacherList.push(row)}); 
        res.send(teacherList); 
    })
};

const addTeacher = (req: Request, res: Response) => {
    logger.info(req);
    logger.info(res);

    let teacher: Teacher = req.body;
    let sql = `INSERT INTO teacher(name, 
                                jobFunction, 
                                jobLocation, 
                                subject, 
                                isClassRegent, 
                                numberOfStudents, 
                                shift, 
                                nationalID) VALUES("${teacher.name}", "${teacher.jobFunction}", "${teacher.jobLocation}","${teacher.subject}","${teacher.isClassRegent}","${teacher.numberOfStudents}","${teacher.shift}", "${teacher.nationalID}")`
    //if(teacher.name && teacher.jobFunction && teacher.jobLocation && teacher.subject && teacher.isClassRegent && teacher.numberOfStudents && teacher.shift && teacher.nationalID){
    db.run(sql, 
        (error:Error) => {
        if (error) {
            return console.error(error.message);
        }
        res.send("Teacher Added");
    })
    res.send("Teacher Added");
//}else{
  //  res.send("Erro na criação do funcinário(professor)./ Verifique se todos os campos foram preenchidos");
//}
};

const teacherDetails = (req: Request, res: Response) => {
    logger.info(req);
    logger.info(res);

    let id = req.query.id;
    let sql = `SELECT * FROM teacher WHERE id=${id}`;
    console.log(id);
    db.all(sql, [], (error: Error, rows: Teacher[]) => {
        if (error) {
            return console.error(error.message);
        }
        if(rows.length > 0){
            res.send(rows[0]);
        } else{
            res.send("Professor não existe");
        }
    });
};

const teacherListBySubject = (req: Request, res: Response) => {
    logger.info(req);
    logger.info(res);

    let teacherList: Teacher[] = [];
    let subject = req.query.subject;
    let sql = `SELECT * FROM teacher WHERE subject = "${subject}"`;
    db.all(sql, [], (error: Error, rows: Teacher[]) => {
        if (error) {
            return console.error(error.message);
        }
        if(rows.length > 0){
         rows.forEach((row: Teacher) => { teacherList.push(row) }); 
         res.send(teacherList); 
        } else{
            res.send("Os parâmetros não retornam resultado");
        }
    })
};

const updateTeacher = (req: Request, res: Response) => {
    logger.info(req);
    logger.info(res);

    let teacher:Teacher = req.body;
    let sql = `UPDATE teacher SET name ="${teacher.name}", 
                                    jobFunction= "${teacher.jobFunction}",  
                                    subject= "${teacher.subject}",
                                    isClassRegent= "${teacher.isClassRegent}",
                                    numberOfStudents= "${teacher.numberOfStudents}",
                                    jobLocation= "${teacher.jobLocation}",
                                    shift="${teacher.shift}", 
                                    nationalID= "${teacher.nationalID}" WHERE id=${teacher.id}`;
    
    db.all(sql, [], (error: Error) => {
        if(error) {
            res.send(error.message);
        }
        res.send("Teacher Updated");
    })
};

const updateTeacherName = (req: Request, res: Response) => {
    logger.info(req);
    logger.info(res);

    let teacher: Teacher = req.body;
    let sql = `UPDATE teacher SET name = "${teacher.name}"
                            WHERE id = "${teacher.id}"`

    db.all(sql, [], (error: Error) => {
    if(error) {
         res.send(error.message);
    }
    res.send("Teacher Updated");
    })                      
};

const updateTeacherShift = (req: Request, res: Response) => {
    logger.info(req);
    logger.info(res);

    let teacher: Teacher = req.body;
    let sql = `UPDATE teacher SET shift = "${teacher.shift}"
                            WHERE id = "${teacher.id}"`

    db.all(sql, [], (error: Error) => {
    if(error) {
         res.send(error.message);
    }
    res.send("Teacher Updated");
    })                      
};

const deleteTeacher = (req: Request, res: Response) => {
    logger.info(req);
    logger.info(res);

    let id = req.query.id;
    let sql = `DELETE from teacher WHERE id="${id}"`;
    
    db.all(sql, [], (error: Error) => {
        if(error){
            res.send(error.message);
        }
        res.send("Teacher Deleted");

    })
    res.send("Teacher Deleted");
};



export {teacherRoot, 
     teacherList, 
     addTeacher, 
     teacherDetails, 
     teacherListBySubject, 
     updateTeacher, 
     updateTeacherName, 
     updateTeacherShift,
     deleteTeacher};