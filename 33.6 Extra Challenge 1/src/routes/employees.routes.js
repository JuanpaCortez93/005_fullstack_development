import { Router } from "express";
import { DeleteEmployees, GetEmployees, GetEmployeeById, PostEmployees, PutEmployees } from "../services/employees.services.js";
import { dbContext } from "../models/data/appDbContext.js";

const router = Router();

dbContext.connect();

router.get("/employees", GetEmployees);

router.get("/employees/:id", GetEmployeeById);

router.post("/employees", PostEmployees);

router.put("/employees/:id", PutEmployees);

router.delete("/employees/:id", DeleteEmployees);

export default router; 