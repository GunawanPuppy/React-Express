'use strict';

/** @type {import('sequelize-cli').Migration} */
let category = [
  {
    name:"Kaos",
    createdAt : new Date(),
    updatedAt : new Date()
  },
  {
    name:"Kemeja",
    createdAt : new Date(),
    updatedAt : new Date()
  },
  {
    name:"Celana panjang",
    createdAt : new Date(),
    updatedAt : new Date()
  },
  {
    name:"Celana pendek",
    createdAt : new Date(),
    updatedAt : new Date()
  },
]
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert("Categories",category,{})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Categories", null, {})
  }
};
