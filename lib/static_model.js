var _ = require("lodash");
var Model = require("./model.js");
var Query = require("./query.js");
/**
 * @namespace Cabinet.StaticModel 
 */
var StaticModel = {};

/**
 * Creates an instance of a model. 
 *   
 * @function create
 * @todo   Default to Cabinet.REST driver if !this.driver
 * @memberOf Cabinet.StaticModel
 * @param  [attributes] attributes Assign attributes on creation.
 * @return {Cabinet.Model} instance of the Model
 */
StaticModel.create = function (attributes) {	

	if (!this.schema)
		throw new Error("A schema must be attached to instantiate a model");

	return new Model(this.schema, attributes);

}

StaticModel.find = function () {

	return new Query(this.driver);

}

/**
 @todo

StaticModel.belongsTo = function () {
	
}

StaticModel.belongsToMany = function () {
	
}

StaticModel.hasOne = function () {
	
}

StaticModel.hasMany = function () {
	
}

StaticModel.remove = function () {

}


**/

module.exports = StaticModel;