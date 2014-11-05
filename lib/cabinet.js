// 
// Dependencies
//
var _ = require("lodash");

var Cabinet = {};

Cabinet.Model = require("./model");
Cabinet.StaticModel = require("./static_model");
Cabinet.datatype = require("./datatype");


Cabinet.createModel = function (schema) {
	
	var staticModel = _.merge({}, Cabinet.StaticModel, { schema: schema });
	return staticModel;

}

module.exports = Cabinet;