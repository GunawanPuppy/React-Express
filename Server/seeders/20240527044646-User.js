'use strict';

const {hashPassword} = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
let data = [{
  username : "admin2",
  email : "admin2@mail.com",
  password : hashPassword("12345"),
  role: "admin",
  phoneNumber : "012345",
  address : "jl gatau",
  createdAt : new Date(),
  updatedAt : new Date()
}]
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
   await queryInterface.bulkInsert("Users",data,{})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users",null,{})
  }
};
