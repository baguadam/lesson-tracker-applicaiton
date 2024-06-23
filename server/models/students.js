"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Students extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Students.belongsTo(models.Teacher, {
        foreignKey: "TeacherId",
        as: "teacher",
      });
    }
  }
  Students.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          isInSubject(value, next) {
            this.getTeacher().then((teacher) => {
              if (teacher && teacher.subjects.includes(value)) {
                return next();
              } else {
                return next(
                  "Subject must be one of the subjects taught by the teacher!"
                );
              }
            });
          },
        },
      },
      lessons: {
        type: DataTypes.JSON,
        allowNull: false,
        validate: {
          notNull: true,
        },
        defaultValue: [],
      },
      TeacherId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
    },
    {
      sequelize,
      modelName: "Students",
    }
  );
  return Students;
};
