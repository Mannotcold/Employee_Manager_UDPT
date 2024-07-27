'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    static associate(models) {
      
    }
  };
  Employee.init({
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    dob: DataTypes.DATE,
    gender: DataTypes.STRING,
    citizen_id: DataTypes.STRING,
    tax_code: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    bank_account: DataTypes.STRING,
    point_reward: DataTypes.INTEGER,
    account_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Accounts',
        key: 'id_accounts'
      }
    }
  }, {
    sequelize,
    modelName: 'Employee',
  });
  return Employee;
};
