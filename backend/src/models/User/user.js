import { Model, DataTypes } from 'sequelize';

const initUserModel =  (sequelize) => {
  class User extends Model {}

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      api_token: {
        type: DataTypes.STRING,
        allowNull: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      phoneNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
          references: {
            model: "roles",
            key: "id",
        },
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
      modelName: 'User',
      tableName: 'users',
      schema: 'public',
      timestamps: true,
      paranoid: true,
    }
  );

  return User;
};
export default initUserModel;