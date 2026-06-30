const { sequelize } = require("../config/db")
const Task = require("../models/taskModels")
const { Op } = require("sequelize");


async function createTask(req, res) {
    const { title, description, startDate, endDate } = req.body

    try {
        if (!title || !description || !startDate || !endDate) {
            return res.status(400).send({ msg: "All Fields are required", success: false })
        }
        if (new Date(endDate) < new Date(startDate)) {
            return res.status(400).send({ msg: "End date should be greater than start date", success: false })
        }
        const newTask = await Task.create({ title, description, startDate, endDate })
        console.log(newTask)
        res.status(200).send({ msg: "Task created succesfully", success: true })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ msg: "server error" })
    }

}
async function getAllTasks(req, res) {
    try {
        const tasks = await Task.findAll();

        res.status(200).send({
            msg: "Tasks fetched successfully",
            success: true,
            data: tasks
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            msg: "Server error",
            success: false
        });
    }
}
async function getTaskByID(req, res) {
    const { ID } = req.params;

    try {
        const task = await Task.findByPk(ID);

        if (!task) {
            return res.status(404).send({
                msg: "Task not found",
                success: false
            });
        }

        res.status(200).send({
            msg: "Task fetched successfully",
            success: true,
            data: task
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            msg: "Server error",
            success: false
        });
    }
}
async function updateTask(req, res) {
    const { ID } = req.params;
    const { title, description, status, startDate, endDate } = req.body;
    try {
        const task = await Task.findByPk(ID);
        if (!task) {
            return res.status(404).send({
                msg: "Task not found",
                success: false
            });
        }
        if (startDate && endDate &&
            new Date(endDate) < new Date(startDate)
        ) {
            return res.status(400).send({
                msg: "End date should be greater than start date",
                success: false
            });
        }
        await task.update({
            title: title || task.title,
            description: description || task.description,
            status: status || task.status,
            startDate: startDate || task.startDate,
            endDate: endDate || task.endDate
        });
        console.log(task)
        res.status(200).send({
            msg: "Task updated successfully",
            success: true,
            data: task
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            msg: "Server error",
            success: false
        });
    }
}
async function deleteTask(req, res) {
    const { ID } = req.params;

    try {
        const task = await Task.findByPk(ID);

        if (!task) {
            return res.status(404).send({
                msg: "Task not found",
                success: false
            });
        }

        await task.destroy();

        res.status(200).send({
            msg: "Task deleted successfully",
            success: true
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            msg: "Server error",
            success: false
        });
    }
}
async function searchTasks(req, res) {
    console.log(req.query);
    const { title, status } = req.query;

    try {
        const whereClause = {};

        if (title) {
            whereClause.title = {
                [Op.like]: `%${title}%`
            };
        }

        if (status) {
            whereClause.status = status;
        }

        const tasks = await Task.findAll({
            where: whereClause
        });

        res.status(200).send({
            success: true,
            data: tasks
        });
    } catch (error) {
        console.log(error);

        res.status(500).send({
            success: false,
            msg: "Server Error"
        });
    }
}
async function updateStatus(req, res) {
    const { ID } = req.params;
    const status = req.body.status;

    console.log("ID:", ID);
    console.log("BODY:", req.body);
    console.log("STATUS:", status);

    try {
        const statusArr = [
            "Pending",
            "In-Progress",
            "Completed"
        ];

        if (!statusArr.includes(status)) {
            return res.status(404).send({
                msg: "Invalid status",
                success: false
            });
        }

        const taskUpdate =
            await Task.findByPk(ID);

        if (!taskUpdate) {
            return res.status(404).send({
                msg: "Task not found",
                success: false
            });
        }

        await taskUpdate.update({
            status
        });

        res.status(200).send({
            msg: "Task Status Updated Successfully"
        });

    } catch (error) {
        console.log(error);

        res.status(500).send({
            success: false,
            msg: "Server Error"
        });
    }
}
module.exports = {
    createTask,
    getAllTasks,
    getTaskByID,
    updateTask,
    deleteTask,
    searchTasks,
    updateStatus
}