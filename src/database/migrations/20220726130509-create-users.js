'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('usuarios', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      celular: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      senha: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      senha_token_reset: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      senha_expira_reset: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      is_admin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      created_at: {
        type: Sequelize. Sequelize.DATE,
        allowNull: false,
      },

      updated_at: {
        type: Sequelize. Sequelize.DATE,
        allowNull: false,
      },
    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('usuarios');
  }
};
