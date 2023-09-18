"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const studentsController_1 = require("../controllers/studentsController");
const studentsRouter = (0, express_1.Router)();
studentsRouter.get("/", studentsController_1.studentsRoot);
studentsRouter.get("/studentsList", studentsController_1.studentsList);
studentsRouter.post("/addStudent", studentsController_1.addStudent);
studentsRouter.get("/studentDetails", studentsController_1.studentDetails);
studentsRouter.get("/studentsListByYearAndRoom", studentsController_1.studentsListByYearAndRoom);
studentsRouter.get("/studentsMiddleSchool", studentsController_1.studentsMiddleSchool);
studentsRouter.put("/updateStudents", studentsController_1.updateStudent);
studentsRouter.patch("/updateStudentBySpecificField", studentsController_1.updateStudentBySpecificField);
studentsRouter.delete("/deleteStudent", studentsController_1.deleteStudent);
exports.default = studentsRouter;