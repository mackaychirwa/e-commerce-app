import { Model, DataTypes } from 'sequelize';

const ProductModel = (sequelize) => {
  class Product extends Model {}

  Product.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      unit_cost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'image_url',
      },
      size: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date(),
        field: 'created_at',
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date(),
        field: 'updated_at',
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'deleted_at',
      },
    },
    {
      sequelize,
      modelName: 'Product',
      tableName: 'products',
      schema: 'public',
      timestamps: true,
      paranoid: true,
    }
  );

  // Define the relationship (Product belongs to Category)
  Product.associate = (models) => {
    Product.belongsTo(models.Category, {
      foreignKey: 'category_id',
      as: 'category', 
    });
  };

  return Product;
};

export default ProductModel;
