'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User, {foreignKey: "authorId"})
      Product.belongsTo(models.Category, {foreignKey: "categoryId"})
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          args : true,
          msg : "Name cannot be null"
        },
        notEmpty : {
          args : true,
          msg: "Name is required"
        },
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          args : true,
          msg : "Description cannot be null"
        },
        notEmpty : {
          args : true,
          msg: "Description is required"
        },
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : {
          args : true,
          msg : "Price cannot be null"
        },
        notEmpty : {
          args : true,
          msg: "Price is required"
        },
        min : {
          args: 1,
          msg: "Price minimum 1"
        }
      }
    },
    stock: DataTypes.INTEGER,
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'ImageUrl is required'
        },
        notEmpty: {
          msg: 'ImageUrl is required'
        }
      }
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : {
          args : true,
          msg : "CategoryId cannot be null"
        },
        notEmpty : {
          args : true,
          msg: "CategoryId is required"
        },
      }
    },
    authorId:{
      type: DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : {
          args : true,
          msg : "AuthorId cannot be null"
        },
        notEmpty : {
          args : true,
          msg: "AuthorId is required"
        },
      }
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};