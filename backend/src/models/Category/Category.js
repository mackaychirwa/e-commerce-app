import { Model, DataTypes } from 'sequelize';

const CategoryModel =  (sequelize) => {
  class Category extends Model {}

  Category.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true 
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date(),
        field: 'created_at'
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date(),
        field: 'updated_at'
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'deleted_at'
      },
    },
    {
      sequelize,
      modelName: 'Category',
      tableName: 'categories',
      schema: 'public',
      timestamps: true,
      paranoid: true,
    }
  );

  return Category;
};
export default CategoryModel;