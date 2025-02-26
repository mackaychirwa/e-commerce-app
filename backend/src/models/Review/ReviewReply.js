import { Model, DataTypes } from 'sequelize';

const ReviewReplyModel =  (sequelize) => {
  class ReviewReply extends Model {}

  ReviewReply.init(
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
      review_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          
      },     
      reply: {
          type: DataTypes.TEXT,
          allowNull: false,
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
      modelName: 'ReviewReply',
      tableName: 'review_replies',
      schema: 'public',
      timestamps: true,
      paranoid: true,
    },

  
  );

  return ReviewReply;
};
export default ReviewReplyModel;