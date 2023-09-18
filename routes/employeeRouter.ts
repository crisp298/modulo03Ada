import {Router} from "express";
import {employeeRoot, 
    employeeList, 
    addEmployee, 
    employeeDetails,
    employeeListByShift,  
    updateEmployee, 
    updateEmployeeBySpecificField, 
    deleteEmployee} from "../controllers/employeeController";

const employeeRouter = Router();

employeeRouter.get("/", employeeRoot);

employeeRouter.get("/employeeList", employeeList);

employeeRouter.post("/addEmployee", addEmployee);

employeeRouter.get("/employeeDetails", employeeDetails);

employeeRouter.get("/employeeListByShift", employeeListByShift);

employeeRouter.put("/updateEmployee", updateEmployee);

employeeRouter.patch("/updateEmployeeBySpecificField", updateEmployeeBySpecificField);

employeeRouter.delete("/deleteEmployee", deleteEmployee);

export default employeeRouter;

