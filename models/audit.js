"use strict";

module.exports = function(sequelize, DataTypes) {
  var Audit = sequelize.define('Audit', {
    username: {type: DataTypes.STRING, allowNull: false},
    environment: {type: DataTypes.STRING, allowNull: false},
    advertiser_id: {type: DataTypes.INTEGER, allowNull: false},
    advertiser_name: {type: DataTypes.STRING, allowNull: false},
    locale: {type: DataTypes.STRING, allowNull: false},
    trv_price: {type: DataTypes.INTEGER, allowNull: false},
    lp_price: {type: DataTypes.INTEGER, allowNull: false},
    q1: {type: DataTypes.STRING, allowNull: false},
    q2: {type: DataTypes.STRING, allowNull: false},
    q3: {type: DataTypes.STRING, allowNull: false},
    q4: {type: DataTypes.STRING, allowNull: false},
    q5: {type: DataTypes.STRING, allowNull: false},
    q6: {type: DataTypes.STRING, allowNull: false},
    q7: {type: DataTypes.STRING, allowNull: false},
    q8: {type: DataTypes.STRING, allowNull: false},
    q9: {type: DataTypes.STRING, allowNull: false},
    q10: {type: DataTypes.STRING, allowNull: false},
    q11: {type: DataTypes.STRING, allowNull: false},
    q12: {type: DataTypes.STRING, allowNull: false},
    q13: {type: DataTypes.STRING, allowNull: false},
    q14: {type: DataTypes.STRING, allowNull: false},
    q15: {type: DataTypes.STRING, allowNull: false},
    q16: {type: DataTypes.STRING, allowNull: false},
    q17: {type: DataTypes.STRING, allowNull: false},
    comment_e: {type: DataTypes.STRING, allowNull: true},
    mr1: {type: DataTypes.STRING, allowNull: false},
    mr2: {type: DataTypes.STRING, allowNull: false},
    mr3: {type: DataTypes.STRING, allowNull: false},
    mr4: {type: DataTypes.STRING, allowNull: false},
    mr5: {type: DataTypes.STRING, allowNull: false},
    mr6: {type: DataTypes.STRING, allowNull: false},
    comment_f: {type: DataTypes.STRING, allowNull: true},
  });

  return Audit;
};
