'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class RedemptionRequest extends Model {
        static associate(models) {
            
        }
    };
    RedemptionRequest.init({
        id: {
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
        points: DataTypes.INTEGER,
        request_date: DataTypes.DATEONLY,
        voucher_code: DataTypes.STRING,
        status: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'RedemptionRequest',
        tableName: 'redemption_requests'
    });
    return RedemptionRequest;
};
