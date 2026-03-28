import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

// create cart item model
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   cart_id INT,
//   product_id INT,
//   quantity INT NOT NULL,
//   price DECIMAL(10,2) NOT NULL,
//   FOREIGN KEY (cart_id) REFERENCES carts(id),
//   FOREIGN KEY (product_id) REFERENCES products(id)

export const CartItem = sequelize.define('CartItem', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cart_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: { 
        type: DataTypes.INTEGER,
        allowNull: false
    },  
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: 'cart_items',
    timestamps: false
});

