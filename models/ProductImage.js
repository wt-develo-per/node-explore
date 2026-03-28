import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

// create product image model
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   product_id INT NOT NULL,
//   image_url VARCHAR(255) NOT NULL,
//   is_primary BOOLEAN DEFAULT FALSE,
//   FOREIGN KEY (product_id) REFERENCES products(id)


export const ProductImage = sequelize.define('ProductImage', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    image_url: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    is_primary: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'product_images',
    timestamps: false
});