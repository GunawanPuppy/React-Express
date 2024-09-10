'use strict';

/** @type {import('sequelize-cli').Migration} */
let product = [
  {
    name : "kaos bola",
    description : "ORI 100%",
    price: 10000,
    stock: 5,
    imgUrl: "set",
    categoryId : 1,
    authorId : 1,
    createdAt : new Date(),
    updatedAt : new Date()
  },
  {
    name : "Kemeja Batik",
    description : "ORI JOGJA",
    price:10000,
    stock: 5,
    imgUrl: "yoo",
    categoryId : 2,
    authorId : 1,
    createdAt : new Date(),
    updatedAt : new Date()
  },
  {
    name : "Navy Jeans",
    description : "PROMO MURAH CUI",
    price: 10000,
    stock: 10,
    imgUrl: "sau",
    categoryId : 3,
    authorId : 1,
    createdAt : new Date(),
    updatedAt : new Date()
  },
  {
    name : "Celana Tidur",
    description : "Nyaman Sekali",
    price: 10000,
    stock: 10,
    imgUrl: "aso",
    categoryId : 4,
    authorId : 1,
    createdAt : new Date(),
    updatedAt : new Date()
  },
]

let product2 = []
for(let i  =1; i<=50; i++){
  product2.push({
    name : "Product" + i,
    description : "Nyaman Sekali" + i,
    price: Math.floor(Math.random() * (100000-40000) +40000),
    stock: Math.floor(Math.random() * (100-90) + 10 ),
    imgUrl: "bweoqe",
    categoryId : Math.floor(Math.random() *4) + 1,
    authorId : 1,
    createdAt : new Date(),
    updatedAt : new Date()
  })
}
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
   await queryInterface.bulkInsert("Products", product,{})
   await queryInterface.bulkInsert("Products",product2,[])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Products",null, {})
  }
};
