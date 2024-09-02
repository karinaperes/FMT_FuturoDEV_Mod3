'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('professores', 'createdAt', {
      allowNull: false,
      type: Sequelize.DATE
    });
    await queryInterface.addColumn('professores', 'updatedAt', {
      allowNull: false,
      type: Sequelize.DATE
    });
  },   

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('professores', 'createdAt')
    await queryInterface.removeColumn('professores', 'updatedAt')
  }
};
