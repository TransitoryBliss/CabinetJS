var _ = require("lodash");
var format = require("util").format;

exports.STRING = function (value) {

	var msg = "%s is not a String.";

	if (_.isString(value) || value === null)
		return true;
	else 
		throw new Error(format(msg, value));	

};

exports.BOOLEAN = function (value) {

	var msg = "%s is not a Boolean.";

	if (_.isBoolean(value) || value === null)
		return true;
	else 
		throw new Error(format(msg, value));	

};