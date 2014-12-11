"use strict";

module.exports = function(sequelize, DataTypes) {
	var Response = sequelize.define("Response", null, {
		classMethods: {
			associate: function(models) {
				Response.hasOne(models.Question);
				Response.hasOne(models.Option);
			}
		}
	});
	//

	return Response;
};
