import { Response, Request} from "express";
import Employee from "../models/Employee";
import { createDbConnection } from "../db/dbConfig";
import { request } from "http";
import logger from "../services/logger"

let db = createDbConnection();

const employeeRoot = (req: Request, res: Response) => {
    logger.info(req);
    logger.info(res);

    res.send("Employee Main");
};

const employeeList = (req: Request, res: Response) => {
    logger.info(req);
    logger.info(res);

    let employeeList: Employee[] = []; 
    let sql = `SELECT * FROM employee`;
    db.all(sql, [], (error: Error, rows: Employee[]) => {
        if (error) {
            return console.error(error.message);
        }
        rows.forEach((row: Employee) => { employeeList.push(row)}); 
        res.send(employeeList); 
    })
};

const addEmployee = (req: Request, res: Response) => {
    logger.info(req);
    logger.info(res);

    let employee: Employee = req.body;
    let sql = `INSERT INTO employee(name, jobFunction, jobLocation, shift, nationalID) VALUES("${employee.name}", "${employee.jobFunction}", "${employee.jobLocation}","${employee.shift}", "${employee.nationalID}")`
    if(employee.name && employee.jobFunction && employee.jobLocation && employee.shift && employee.nationalID){
    db.run(sql, 
        (error:Error) => {
        if (error) {
            return console.error(error.message);
        }
        res.send("Employee Added");
    })
    res.send("Employee Added");
}else{
    res.send("Erro na criação do funcinário./ Verifique se todos os campos foram preenchidos");
}
};

const employeeDetails = (req: Request, res: Response) => {
    logger.info(req);
    logger.info(res);
    
    let id = req.query.id;
    let sql = `SELECT * FROM employee WHERE id=${id}`;
    console.log(id);
    db.all(sql, [], (error: Error, rows: Employee[]) => {
        if (error) {
            return console.error(error.message);
        }
        if(rows.length > 0){
            res.send(rows[0]);
        } else{
            res.send("Funcionário não existe");
        }
    });
};

const employeeListByShift = (req: Request, res: Response) => {
    logger.info(req);
    logger.info(res);

    let employeeList: Employee[] = [];
    let shift = req.query.shift;
    let sql = `SELECT * FROM employee WHERE shift = "${shift}"`;
    db.all(sql, [], (error: Error, rows: Employee[]) => {
        if (error) {
            return console.error(error.message);
        }
        if(rows.length > 0){
         rows.forEach((row: Employee) => { employeeList.push(row) }); 
         res.send(employeeList); 
        } else{
            res.send("Os parâmetros não retornam resultado");
        }
    })
};

const updateEmployee = (req: Request, res: Response) => {
    logger.info(req);
    logger.info(res);

    let employee:Employee = req.body;
    let sql = `UPDATE employee SET name ="${employee.name}", 
                                    jobFunction ="${employee.jobFunction}", 
                                    jobLocation ="${employee.jobLocation}",
                                    shift ="${employee.shift}", 
                                    nationalID = "${employee.nationalID}" WHERE id =${employee.id}`;
    
    db.all(sql, [], (error: Error) => {
        if(error) {
            res.send(error.message);
        }
        res.send("Employee Updated");
    })
};

const updateEmployeeBySpecificField = (req: Request, res: Response) => {
    logger.info(req);
    logger.info(res);
     
    let employee: Employee = req.body;
    let sql = `UPDATE employee SET name = "${employee.name}"
                            WHERE id = "${employee.id}"`

    db.all(sql, [], (error: Error) => {
    if(error) {
       res.send(error.message);
     }
    res.send("Employee Updated");
    })                      
};

const deleteEmployee = (req: Request, res: Response) => {
    logger.info(req);
    logger.info(res);
    
    let id = req.query.id;
    let sql = `DELETE from employee WHERE id="${id}"`;
    
    db.all(sql, [], (error: Error) => {
        if(error){
            res.send(error.message);
        }
        res.send("Employee Deleted");

    })
    res.send("Employee Deleted");
};



export {employeeRoot, 
     employeeList, 
     addEmployee, 
     employeeDetails, 
     employeeListByShift, 
     updateEmployee, 
     updateEmployeeBySpecificField, 
     deleteEmployee};