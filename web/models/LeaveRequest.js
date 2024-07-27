'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class LeaveRequest extends Model {
        static associate(models) {
            
        }
    };
    LeaveRequest.init({
        id_leave: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        employee_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Employees',
                key: 'employee_id'
            }
        },
        start_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        end_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        leave_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Pending',
        },
        manager_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Employees',
                key: 'employee_id'
            }
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true,
        }
    }, {
        sequelize,
        modelName: 'LeaveRequest',
        tableName: 'leave_requests', // Ensure your table name matches
        timestamps: true, // Adds createdAt and updatedAt fields
    });
    return LeaveRequest;
};
