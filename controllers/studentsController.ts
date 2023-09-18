import { Response, Request} from "express";
import Student from "../models/Students";
import { createDbConnection } from "../db/dbConfig";
import { request } from "http";
import logger from "../services/logger";

let db = createDbConnection();

const studentsRoot = (req: Request, res: Response) => {
   logger.info(req);//faz diferença se chama o log no início ou no fim do método - no fim chama o log só se a função rodar com sucesso
   logger.info(res);
    res.send("Students Main");
};

const studentsList = (req: Request, res: Response) => {
    logger.info(req);
    logger.info(res);

    let studentsList: Student[] = [];//para declarar um arry do tipo Student e aceitar array vazio declara-se Student[] - sem isso só aceita se passar any
    let sql = `SELECT * FROM students`;
    db.all(sql, [], (error: Error, rows: Student[]) => {
        if (error) {
            return console.error(error.message);
        }
        rows.forEach((row: Student) => { studentsList.push(row)}); 
        res.send(studentsList); 
    })
};

const addStudent = (req: Request, res: Response) => {
    logger.info(req);
    logger.info(res);

    let student: Student = req.body;
    let sql = `INSERT INTO students(name, shift, year, room) VALUES("${student.name}", "${student.shift}", "${student.year}","${student.room}")`
    if(student.name && student.shift && student.year && student.room){
    db.run(sql, 
        (error:Error) => {
        if (error) {
            return console.error(error.message);
        }
        res.send("Student Added");
    })
    res.send("Student Added");
}else{
    res.send("Erro na criação do estudante./ Verifique se todos os campos foram preenchidos");
}
};

const studentDetails = (req: Request, res: Response) => {
    logger.info(req);
    logger.info(res);

    let id = req.query.id;
    let sql = `SELECT * FROM students WHERE id=${id}`;
    console.log(id);
    //res.send("Student details");
    db.all(sql, [], (error: Error, rows: Student[]) => {
        if (error) {
            return console.error(error.message);
        }
        if(rows.length > 0){
            res.send(rows[0]);
        } else{
            res.send("Estudante não existe");
        }
    });
}

const studentsListByYearAndRoom = (req: Request, res: Response) => {
    logger.info(req);
    logger.info(res);

    let studentsList: Student[] = [];
    let year = req.query.year;
    let room = req.query.room?.toString().toUpperCase();
    let sql = `SELECT * FROM students WHERE year = "${year}" AND room = "${room}"`;
    db.all(sql, [], (error: Error, rows: Student[]) => {
        if (error) {
            return console.error(error.message);
        }
        if(rows.length > 0){
         rows.forEach((row: Student) => { studentsList.push(row) }); 
         res.send(studentsList); 
        } else{
            res.send("Os parâmetros não retornam resultado");
        }
    });
};

const studentsMiddleSchool = (req: Request, res: Response) => {
    logger.info(req);
    logger.info(res);

    let studentsList: Student[] = [];
    //let year = req.query.year;
    //let room = req.query.room?.toString().toUpperCase();
    let sql = `SELECT * FROM students WHERE year > 5`;
    db.all(sql, [], (error: Error, rows: Student[]) => {
        if (error) {
            return console.error(error.message);
        }
        if(rows.length > 0){
         rows.forEach((row: Student) => { studentsList.push(row) }); 
         res.send(studentsList); 
        } else{
            res.send("Os parâmetros não retornam resultado");
        }
    });
};

const updateStudent = (req: Request, res: Response) => {
    logger.info(req);
    logger.info(res);

    //let id: any = req.query.id; - se quiser usar id para identificar, mas pode usar o student todo
    let student: Student = req.body;
    let sql = `UPDATE students SET name ="${student.name}", shift="${student.shift}", year="${student.year}", room="${student.room}" WHERE id="${student.id}`;
    
    db.all(sql, [], (error: Error) => {
        if(error) {
            res.send(error.message);
        }
        res.send("Student Updated");
    });
};

const updateStudentBySpecificField = (req: Request, res: Response) => {
    logger.info(req);
    logger.info(res);

    let student: Student = req.body;
    let sql = `UPDATE students SET name = "${student.name}"
                            WHERE id = "${student.id}"`

    db.all(sql, [], (error: Error) => {
    if(error) {
         res.send(error.message);
        }
    res.send("Student Updated");
    });                  
};

const deleteStudent = (req: Request, res: Response) => {
    logger.info(req);
    logger.info(res);

    let id = req.query.id;
    let sql = `DELETE from students WHERE id="${id}"`;//não precisa* para dizer o que deleta pois parametro usado (id) é unico
    
    db.all(sql, [], (error: Error) => {
        if(error){
            res.send(error.message);
        }
        res.send("Studennt Deleted");

    });
    res.send("Student Deleted");
};



export {studentsRoot, 
     studentsList, 
     addStudent, 
     studentDetails, 
     studentsListByYearAndRoom, 
     studentsMiddleSchool, 
     updateStudent, 
     updateStudentBySpecificField, 
     deleteStudent};