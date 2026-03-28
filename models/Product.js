import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

// create product model
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   name VARCHAR(150) NOT NULL,
//   slug VARCHAR(200) NOT NULL,
//   description TEXT,
//   price DECIMAL(10,2) NOT NULL,
//   category_id INT,
//   brand VARCHAR(100),
//   is_active BOOLEAN DEFAULT TRUE,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//   FOREIGN KEY (category_id) REFERENCES categories(id)

export const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    slug: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    category_id: {
        type: DataTypes.INTEGER,    
        allowNull: true,
        defaultValue: null
    },
    brand: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'products',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});