import { dbContext } from "../data/appDbContext.js";

export const GetItems = async () => {
    const response = await dbContext.query("SELECT * FROM employees");
    return response;
}

export const GetItemById = async (id) => {
    const response = await dbContext.query("SELECT * FROM employees WHERE id = $1", [id]);
    return response;
}

export const CreateItem = async (name, salary) => {
    const response = await dbContext.query("INSERT INTO employees (name, salary) VALUES ($1, $2)", [name, salary]);
    return response;
}

export const UpdateItem = async (name, salary, id) => {
    const result = await dbContext.query("UPDATE employees SET name = $1, salary = $2 WHERE id = $3", [name, Number(salary), id]);
    return result;
}

export const DeleteItem = async (id) => {
    const result = await dbContext.query("DELETE FROM employees WHERE id = $1", [id]);
    return result;
}