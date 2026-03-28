import Sequelize from "sequelize";

// Create a connection to the database

const sequelize = new Sequelize(
    "ecom_api",
    "root",
    "",
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        logging: false
    }
)

export { sequelize };


