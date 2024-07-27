'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('requests', {
            id_request: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            employee_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'employees',
                    key: 'employee_id'
                },
                allowNull: false
            },
            request_type: {
                type: Sequelize.STRING,
                allowNull: false
            },
            request_date: {
                type: Sequelize.DATEONLY,
                allowNull: false
            },
            status: {
                type: Sequelize.STRING,
                allowNull: true
            },
            manager_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'employees',
                    key: 'employee_id'
                },
                allowNull: true
            },
            notes: {
                type: Sequelize.STRING,
                allowNull: true
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('requests');
    }
};
