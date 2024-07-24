'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Đọc và nạp các model từ thư mục hiện tại
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    try {
      // Yêu cầu mô hình và kiểm tra kiểu của đối tượng trả về
      const model = require(path.join(__dirname, file));

      // Kiểm tra xem mô hình có phải là một hàm không
      if (typeof model === 'function') {
        db[model(sequelize, Sequelize.DataTypes).name] = model(sequelize, Sequelize.DataTypes);
      } else {
        console.error(`Model ${file} is not a function.`);
      }
    } catch (error) {
      console.error(`Error loading model ${file}:`, error);
    }
  });

// Thiết lập mối quan hệ giữa các model (nếu có)
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

