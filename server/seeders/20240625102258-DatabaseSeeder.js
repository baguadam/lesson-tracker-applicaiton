"use strict";

const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");
const { Students, Teachers } = require("../models");

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    const teachers = [];
    const students = [];
    const teachersCount = faker.number.int({ min: 2, max: 5 });
    const studentsCount = faker.number.int({ min: 6, max: 12 });
    const subjects = [
      "Matematika",
      "Fizika",
      "Informatika",
      "Nyelvten",
      "Irodalom",
      "Angol",
      "Német",
      "Történelem",
    ];
    const dates = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

    for (let i = 0; i < teachersCount; i++) {
      const password = faker.internet.password();
      const hashedPassword = await bcrypt.hash(password, 10);
      const teacher = await Teachers.create({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: hashedPassword,
        subjects: faker.helpers.arrayElements(subjects, { min: 1, max: 3 }),
      });

      teachers.push(teacher);
    }

    for (let i = 0; i < studentsCount; i++) {
      const teacher = faker.helpers.arrayElement(teachers);

      const student = await Students.create({
        name: faker.person.fullName(),
        price: faker.number.int({ min: 4000, max: 6000 }),
        subject: faker.helpers.arrayElement(teacher.subjects),
        lessons: faker.helpers.arrayElements(dates, { min: 1, max: 3 }),
        TeacherId: teacher.id,
      });

      students.push(student);
    }

    console.log("The DatabaseSeeder ran successfully");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Students", null, {});
    await queryInterface.bulkDelete("Teachers", null, {});
  },
};
