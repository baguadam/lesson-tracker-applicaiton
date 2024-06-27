"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Lessons extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Lessons.belongsTo(models.Teachers, {
        foreignKey: "TeacherId",
        as: "teacher",
      });
      Lessons.belongsTo(models.Students, {
        foreignKey: "StudentId",
        as: "student",
      });
    }
  }
  Lessons.init(
    {
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
      status: {
        type: DataTypes.ENUM("PENDING", "HELD", "MISSED"),
        allowNull: false,
        defaultValue: "PENDING",
        validate: {
          notNull: true,
        },
      },
      paid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {
          notNull: true,
        },
      },
      TeacherId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
      StudentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
    },
    {
      sequelize,
      modelName: "Lessons",
    }
  );
  return Lessons;
};
