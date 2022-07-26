require('dotenv').config()

module.exports = {
    dialect: 'postgres',
    host: process.env.HOST_DB,
    username: process.env.USER_DB,
    password: process.env.PASS_DB,
    database: process.env.DATABASE,
    define: {
        timestamps: true,
        underscored: true,
    }
}