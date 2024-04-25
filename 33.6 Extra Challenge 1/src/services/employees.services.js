import { dbContext } from "../models/data/appDbContext.js";
import { CreateItem, DeleteItem, GetItemById, GetItems, UpdateItem } from "../models/respositories/employees.respository.js";

export const GetEmployees = async (req, res) => {
    
    try{

        const response = await GetItems();
        res.status(200).json({
            result: response.rows,
            isSuccess: true,
            message: ""
        });
    }catch(err){
        res.status(500).json({
            result: [],
            isSuccess: false,
            message: err
        });
    }

};

export const GetEmployeeById = async (req, res) => {

    try{
        const {id} = req.params;
        const response = await GetItemById(id);
        res.status(200).json({
            result: response.rows,
            isSuccess: true,
            message: ""
        });
    }catch(err){
        res.status(500).json({
            result: [],
            isSuccess: false,
            message: err
        });
    }

}

export const PostEmployees = async (req, res) => {

    try{
        const {name, salary} = req.body;
        await CreateItem(name, salary);
        res.status(200).json({
            result: [{name, salary}],
            isSuccess: true,
            message: "Employees created"
        });
    }catch(err){
        res.status(500).json({
            result: [],
            isSuccess: false,
            message: err
        });
    }

};

export const PutEmployees = async (req, res) => {
    
    try {
        const {id} = req.params;
        let result = await GetItemById(id);
        
        if(result.rowCount > 0) {
            const {name, salary} = req.body;
            await UpdateItem(name, salary, id);
            res.status(200).json({
                result: [{id, name, salary}],
                isSuccess: true,
                message: "Employees updated"
            });
        }else{
            res.status(404).json({
                result: [],
                isSuccess: false,
                message: "User not found"
            });
        }

    }catch(err){
        res.status(500).json({
            result: [],
            isSuccess: false,
            message: err
        });
    }
};

export const DeleteEmployees = async (req, res) => {

    try {
        const {id} = req.params;
        let result = await GetItemById(id);
        
        if(result.rowCount > 0) {
            await DeleteItem(id);
            res.status(200).json({
                result: result.rows,
                isSuccess: true,
                message: "Employees deleted"
            });
        }else{
            res.status(404).json({
                result: [],
                isSuccess: false,
                message: "User not found"
            });
        }

    }catch(err){
        res.status(500).json({
            result: [],
            isSuccess: false,
            message: err
        });
    }
};