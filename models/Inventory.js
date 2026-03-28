import { sequelize } from "../config/database";
import { DataTypes } from "sequelize";

// create inventory model
//   product_id INT PRIMARY KEY,
//   quantity INT NOT NULL DEFAULT 0,
//   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//   FOREIGN KEY (product_id) REFERENCES products(id)

export const Inventory = sequelize.define('Inventory', {
    product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    quantity: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, {
    tableName: 'inventories',
    timestamps: true,
    createdAt: false,
    updatedAt: 'updated_at'
});