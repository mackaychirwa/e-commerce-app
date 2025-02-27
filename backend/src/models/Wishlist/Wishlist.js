import { Model, DataTypes } from 'sequelize';

const WishlistModel = (sequelize) => {
  class Wishlist extends Model {
    static associate(models) {
      Wishlist.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
      Wishlist.belongsTo(models.Product, { foreignKey: "product_id", as: "product" });
    }
  }

  Wishlist.init(
    {
      id: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
        primaryKey: true,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "products", key: "id" },
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
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
      modelName: 'Wishlist',
      tableName: 'wishlists',
      schema: 'public',
      timestamps: true,
    }
  );

  return Wishlist;
};

export default WishlistModel;
