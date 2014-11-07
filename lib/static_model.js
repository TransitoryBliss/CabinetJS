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
 * @memberOf Cabinet.StaticModel#
 * @param  [attributes] attributes Assign attributes on creation.
 * @return {Cabinet.Model} instance of the Model
 */
StaticModel.create = function (attributes) {	

	if (!this.schema)
		throw new Error("A schema must be attached to instantiate a model");

	return new Model(this.schema, attributes);

}

/**
 * Creates a query object (passing the attached driver) and returns it.
 *
 * @function find
 * @memberOf Cabinet.StaticModel#
 * @return {Cabinet.Query}
 */
StaticModel.find = function () {

	return new Query(this.driver);

}

/**
 * Adds a virtual to the schema.
 *
 * @function addVirtual
 * @memberOf Cabinet.StaticModel#
 * @param {String} virtualName
 * @param {Function} virtualMethod
 * @return {this}
 */
StaticModel.addVirtual = function (virtualName, virtualMethod) {

	if (this.schema[virtualName])
		throw new Error("Can't create virtual with same name as an existing attribute.");

	this.schema.virtuals = this.schema.virtuals || {};
	this.schema.virtuals[virtualName] = virtualMethod;
	return this;

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

StaticModel.findAndRemove = function () {

}


**/

module.exports = StaticModel;