var _ = require("lodash");
var Model = require("./model.js");

exports.create = function (attributes) {

	if (!this.schema)
		throw new Error("A schema must be attached to instantiate a model");

	return new Model(this.schema, attributes);

}