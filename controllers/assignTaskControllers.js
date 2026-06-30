const AssignTask = require("../models/assignTaskModels");
const User = require("../models/userModels");
const Task = require("../models/taskModels");

async function assignTask(req, res) {

    const { userID, taskID } = req.body;
    console.log(req.body)

    try {

        if (!userID || !taskID) {
            return res.status(400).send({
                success: false,
                msg: "User ID and Task ID are required"
            });
        }

        const user = await User.findByPk(userID);
console.log(user)
        if (!user) {
            return res.status(404).send({
                success: false,
                msg: "User not found"
            });
        }

        const task = await Task.findByPk(taskID);
console.log(task)
        if (!task) {
            return res.status(404).send({
                success: false,
                msg: "Task not found"
            });
        }

        const alreadyAssigned =
            await AssignTask.findOne({
                where: {
                    userID,
                    taskID
                }
            });

        if (alreadyAssigned) {
            return res.status(400).send({
                success: false,
                msg: "Task already assigned to this user"
            });
        }

        const assignment =
            await AssignTask.create({
                userID,
                taskID
            });

        res.status(201).send({
            success: true,
            msg: "Task assigned successfully",
            data: assignment
        });

    } catch (error) {

        console.log(error);

        res.status(500).send({
            success: false,
            msg: "Server Error"
        });
    }
}
async function getTaskWithUser(req, res) {

    try {

        const data =
            await AssignTask.findAll({

                include: [
                    {
                        model: User,
                        attributes: [
                            "id",
                            "username",
                            "email"
                        ]
                    },
                    {
                        model: Task
                    }
                ]

            });

        res.status(200).send({
            success: true,
            data
        });

    } catch (error) {

        console.log(error);

        res.status(500).send({
            success: false,
            msg: "Server Error"
        });
    }
}
async function getAllAssignedTask(req, res) {

    try {

        const assignments =
            await AssignTask.findAll();

        res.status(200).send({
            success: true,
            count: assignments.length,
            data: assignments
        });

    } catch (error) {

        console.log(error);

        res.status(500).send({
            success: false,
            msg: "Server Error"
        });
    }
}
async function getTasksByUser(req, res) {

    const { userID } = req.params;

    try {

        const assignments =
            await AssignTask.findAll({

                where: {
                    userID
                },

                include: [
                    {
                        model: Task
                    }
                ]
            });

        res.status(200).send({
            success: true,
            data: assignments
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
    assignTask,
    getTaskWithUser,
    getAllAssignedTask,
    getTasksByUser
};