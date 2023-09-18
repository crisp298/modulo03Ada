import {Router} from "express";
import {studentsRoot, 
        studentsList,
      addStudent, 
      studentDetails, 
      updateStudent, 
      updateStudentBySpecificField,
      deleteStudent, 
      studentsListByYearAndRoom, 
     studentsMiddleSchool} from "../controllers/studentsController";

const studentsRouter = Router();

studentsRouter.get("/", studentsRoot);

studentsRouter.get("/studentsList", studentsList);

studentsRouter.post("/addStudent", addStudent);

studentsRouter.get("/studentDetails", studentDetails);

studentsRouter.get("/studentsListByYearAndRoom", studentsListByYearAndRoom);

studentsRouter.get("/studentsMiddleSchool", studentsMiddleSchool);

studentsRouter.put("/updateStudents", updateStudent);

studentsRouter.patch("/updateStudentBySpecificField", updateStudentBySpecificField);

studentsRouter.delete("/deleteStudent", deleteStudent);

export default studentsRouter;