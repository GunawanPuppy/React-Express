'use strict';

const {
  Model
} = require('sequelize');
const {hashPassword} = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Product, {foreignKey : "authorId"})
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      // validate : {
      //   notNull : {
      //     args : true,
      //     msg : "Username cannot be null"
      //   },
      //   notEmpty : {
      //     args : true,
      //     msg: "Username cannot be Empty"
      //   },
      // }
    },
    email: {
      type: DataTypes.STRING,
      allowNull : false,
      unique : {
        msg: "Email already exist"
      },
      validate : {
        notNull : {
          args : true,
          msg : "Email cannot be null"
        },
        notEmpty : {
          args : true,
          msg: "Email is required"
        },
        isEmail : {
          args: true,
          msg: "Use the right email format"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          args : true,
          msg : "Password cannot be null"
        },
        notEmpty : {
          args : true,
          msg: "Password is required"
        },
        len :  {
          args : [5],
          msg: "Password minimum 5 karakter"
        }
      }
    },
    role: {
      type : DataTypes.STRING,
      defaultValue : "Staff"
    },
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    hooks :{
      beforeCreate : (user) => {
        user.password = hashPassword(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};