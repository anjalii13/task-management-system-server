const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const User = require("./userModels");
const Task = require("./taskModels");

const AssignTask = sequelize.define(
    "AssignTask",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        userID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: "id"
            }
        },

        taskID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Task,
                key: "id"
            }
        }
    },
    {
        tableName: "assign_tasks",
        timestamps: true
    }
);

/* ======================
   RELATIONSHIPS
====================== */

// User -> AssignTask
User.hasMany(AssignTask, {
    foreignKey: "userID"
});

AssignTask.belongsTo(User, {
    foreignKey: "userID"
});

// Task -> AssignTask
Task.hasMany(AssignTask, {
    foreignKey: "taskID"
});

AssignTask.belongsTo(Task, {
    foreignKey: "taskID"
});

module.exports = AssignTask;