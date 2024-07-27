'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class TimeSheet extends Model {
        static associate(models) {
            
        }
    };
    TimeSheet.init({
        id_timesheet: {
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
        date: DataTypes.DATEONLY,
        check_in_status: DataTypes.STRING,
        check_out_status: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'TimeSheet',
        tableName: 'time_sheet'
    });
    return TimeSheet;
};
