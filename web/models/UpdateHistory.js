'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class UpdateHistory extends Model {
        static associate(models) {
            
        }
    };
    UpdateHistory.init({
        date: {
            type: DataTypes.DATEONLY,
            primaryKey: true,
        },
        time: {
            type: DataTypes.TIME,
            primaryKey: true,
        },
        employee_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Employees',
                key: 'employee_id'
            }
        },
        data_filed: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'UpdateHistory',
        tableName: 'update_history'
    });
    return UpdateHistory;
};
