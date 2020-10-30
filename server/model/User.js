const { Sequelize, DataTypes, QueryTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./schoolbox.db",
  define: {
    timestamps: false,
  },
});

//sequelize.sync();
try {
  sequelize.authenticate();
  console.log("Connection has been established successfully!");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const User = sequelize.define("register_users", {
  // Model attributes are defined here
  users_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});
const getUser = async (obj) => {
  return await User.findOne({
    where: obj,
  });
};

module.exports = User;
exports.sequelize = sequelize;
exports.getUser = getUser;
