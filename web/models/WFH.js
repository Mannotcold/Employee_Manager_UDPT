'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class WFH extends Model {
        static associate(models) {
           
            
        }
    };
    WFH.init({
        id_wfh: {
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
        date: DataTypes.DATEONLY
    }, {
        sequelize,
        modelName: 'WFH',
        tableName: 'wfh'
    });
    return WFH;
};
