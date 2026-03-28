import { sequelize } from "../config/database";
import { DataTypes } from "sequelize";

// create address model
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   user_id INT,
//   name VARCHAR(100),
//   phone VARCHAR(20),
//   address_line1 VARCHAR(255),
//   address_line2 VARCHAR(255),
//   city VARCHAR(100),
//   state VARCHAR(100),
//   postal_code VARCHAR(20),
//   country VARCHAR(100),
//   is_default BOOLEAN DEFAULT FALSE,
//   FOREIGN KEY (user_id) REFERENCES users(id)

export const Address = sequelize.define('Address', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },  
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    address_line1: {    
        type: DataTypes.STRING(255),
        allowNull: false
    },
    address_line2: {    
        type: DataTypes.STRING(255),
        allowNull: true
    },
    city: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    state: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    postal_code: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    country: {  
        type: DataTypes.STRING(100),
        allowNull: false
    },
    is_default: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'addresses',
    timestamps: false
});