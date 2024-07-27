'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Request extends Model {
        static associate(models) {
            
        }
    };
    Request.init({
        id_request: {
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
        request_type: DataTypes.STRING,
        request_date: DataTypes.DATEONLY,
        status: DataTypes.STRING,
        manager_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Employees',
                key: 'employee_id'
            }
        },
        notes: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Request',
        tableName: 'request'
    });
    return Request;
};
