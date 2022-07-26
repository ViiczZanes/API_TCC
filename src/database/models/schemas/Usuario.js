const { DataTypes } = require('sequelize')


module.exports = {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      nome: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isEmail: true,
        },
      },

      celular: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      senha: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
      },

      senha_token_reset: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      senha_expira_reset: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
}