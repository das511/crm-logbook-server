const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    surname: {type: DataTypes.STRING},
    firstName: {type: DataTypes.STRING},
    lastName: {type: DataTypes.STRING},
});

const Address = sequelize.define('address', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    value: {type: DataTypes.STRING},
    house: {type: DataTypes.STRING},
    liter: {type: DataTypes.STRING},
});

const Order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    address: {type: DataTypes.STRING, allowNull: false},
    customer: {type: DataTypes.STRING, allowNull: false}, 
    phone: {type: DataTypes.STRING},
    photoBefore: {type: DataTypes.STRING},
    photoAfter: {type: DataTypes.STRING},
    comment: {type: DataTypes.STRING},
    dateAppointed: {type: DataTypes.DATE},
    creator: {type: DataTypes.STRING}
});

const UserRole = sequelize.define('userRole', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    value: {type: DataTypes.STRING, allowNull: false}
});

const NameZk = sequelize.define('nameZk', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    value: {type: DataTypes.STRING, allowNull: false}
});

const Location = sequelize.define('location', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    value: {type: DataTypes.STRING, allowNull: false}
});

const PostType = sequelize.define('postType', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    value: {type: DataTypes.STRING, allowNull: false}
});

const Status = sequelize.define('status', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    value: {type: DataTypes.STRING, allowNull: false},
    color: {type: DataTypes.STRING, allowNull: true}
});

UserRole.hasMany(User);
User.belongsTo(UserRole);

NameZk.hasMany(Order);
Order.belongsTo(NameZk);

NameZk.hasMany(Address);
Address.belongsTo(NameZk);

Location.hasMany(Order);
Order.belongsTo(Location);

PostType.hasMany(Order);
Order.belongsTo(PostType);

Status.hasMany(Order);
Order.belongsTo(Status);

User.hasMany(Order, {as: "contractor"});
Order.belongsTo(User);

module.exports = {
    User,
    Order,
    UserRole,
    NameZk,
    Location,
    PostType,
    Status,
    Address
}