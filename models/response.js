"use strict";

module.exports = function(sequelize, DataTypes) {
	var Response = sequelize.define("Response", null, {
		classMethods: {
			associate: function(models) {
				Response.belongsTo(models.Question);
				Response.belongsTo(models.Option);
			}
		}
	});

	return Response;
};
