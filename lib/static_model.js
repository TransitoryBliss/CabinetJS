var _ = require("lodash");
var Model = require("./model.js");

/**
 * @namespace Cabinet.StaticModel 
 */
var StaticModel = {};

/**
 * Creates an instance of a model. 
 *   
 * @function create
 * @memberOf Cabinet.StaticModel
 * @param  [attributes] attributes Assign attributes on creation.
 * @return {Cabinet.Model} instance of the Model
 */
StaticModel.create = function (attributes) {

	if (!this.schema)
		throw new Error("A schema must be attached to instantiate a model");

	return new Model(this.schema, attributes);

}

module.exports = StaticModel;