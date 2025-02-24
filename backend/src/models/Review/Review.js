import { Model, DataTypes } from 'sequelize';

const ReviewModel =  (sequelize) => {
  class Review extends Model {}

  Review.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      user_id: { 
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
              model: "users",
              key: "id",
          },
      },
      product_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
              model: "products",
              key: "id",
          },
      },
      rating: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
              min: 1,
              max: 5,
          },
      },
      comment: {
          type: DataTypes.TEXT,
          allowNull: false,
      },

    },
    {
      sequelize,
      modelName: 'Review',
      tableName: 'reviews',
      schema: 'public',
      timestamps: true,
      paranoid: true,
    },

      Review.associate = (models) => {
        Review.hasMany(models.ReviewReply, { foreignKey: "review_id", as: "replies" });
        Review.belongsTo(models.User, { foreignKey: "user_id" });
        Review.belongsTo(models.Product, { foreignKey: "product_id" });
    }
  );

  return Review;
};
export default ReviewModel;