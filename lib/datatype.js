var _ = require("lodash");
var format = require("util").format;


/**
 * Expects a String.
 * 
 * @function STRING
 * @memberOf Cabinet.datatype
 * @param {string} value
 * @return {boolean} 
 */
exports.STRING = function (value) {

	var msg = "%s is not a String.";

	if (_.isString(value) || value === null)
		return true;
	else 
		throw new Error(format(msg, value));	

};

/**
 * Expects a Boolean.
 * 
 * @function BOOLEAN
 * @memberOf Cabinet.datatype
 * @param {boolean} value
 * @return {boolean} 
 */
exports.BOOLEAN = function (value) {

	var msg = "%s is not a Boolean.";

	if (_.isBoolean(value) || value === null)
		return true;
	else 
		throw new Error(format(msg, value));	

};

/**
 * Creates an ENUMERABLE datatype.
 *
 * @function ENUM
 * @memberOf Cabinet.datatype
 * @param {mixed} allowed  
 * @example
 * var ENUM = Cabinet.datatype.ENUM("allowed one", "allowed two"); 
 * ENUM("allowed"); => true
 * ENUM("non existing"); => throws Error
 */
exports.ENUM = function (allowed) {

	if (!allowed)
		throw new Error("Missing allowed enumerable values. ENUM(\"allow me\", \"and me\")");

	// Convert arguments to array...
	allowed = Array.prototype.slice.call(arguments);
	
	/**
	 * Expects a value that is set on creation
	 * @function VALIDATE_ENUM 
	 * @param {mixed} value
	 * @return {boolean}
	 */
	return function ENUM (value) {

		var allowedValues = this;		

		if (_.indexOf(allowedValues, value) >= 0) 
			return true;
		else
			throw new Error(format("%s is not in the allowed values.", value));

	}.bind(allowed);

};