var _ = require("lodash");

function Model (schema, attributes) {

	var $ = this;
	
	// We dont want schema to be a property of the instance...
	// So we simulate a private member accessible through a getter
	this.getSchema = function () {
		return schema;		
	}

	// Assign all properties to null at first
	_(schema).each(function (val, key) {		
		$[key] = null;
	});

	_(attributes).each(function (val, key) {

		if ($[key] !== undefined) {

			$.set(key, val, false);

		}

	});
	
}

Model.prototype.get = function (attribute) {
	return this[attribute];
}

// @todo add validation
Model.prototype.set = function (attribute, val) {
	
	var schema = this.getSchema();	

	if (!schema[attribute]) {
		throw new Error("Can't set attribute that does not exist in schema.");
	}

	this[attribute] = val;

	return this;
};


module.exports = Model;