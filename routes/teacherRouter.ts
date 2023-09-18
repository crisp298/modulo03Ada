import {Router} from "express";
import{teacherRoot, 
    teacherList, 
    addTeacher, 
    teacherDetails, 
    teacherListBySubject, 
    updateTeacher, 
    updateTeacherName, 
    updateTeacherShift,
    deleteTeacher} from "../controllers/teacherController";

const teacherRouter = Router();

teacherRouter.get("/", teacherRoot);

teacherRouter.get("/teacherList", teacherList);

teacherRouter.post("/addTeacher", addTeacher);

teacherRouter.get("/teacherDetails", teacherDetails);

teacherRouter.get("/teacherListBySubject", teacherListBySubject);

teacherRouter.put("/updateTeacher", updateTeacher);

teacherRouter.patch("/updateTeacherName", updateTeacherName);

teacherRouter.patch("/updateTeacherShift", updateTeacherShift);

teacherRouter.delete("/deleteTeacher", deleteTeacher);

export default teacherRouter;

