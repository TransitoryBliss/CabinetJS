var _ = require("lodash");
var format = require("util").format;

/**
 * @namespace Cabinet.Query 
 */
function Query (driver) {

	this.query = {};	
	this.driver = driver;

}

/** 
 * @memberOf Cabinet.Query
 * @function where
 * @param  {String|Object} attribute 
 * @param  {mixed} val
 * @return {this}
 * @example
 *  var query = User.find("username", "John");
 *  //or
 *  var query = User.find({ username: "John", email: "john@mail.com" });
 *  //or
 *  var query = User.find({ username: "John", age: { greaterThan: 10, lessThan: 20 }})
 */
Query.prototype.where = function (attribute, val) {

	if (_.isString(attribute)) {

		this.query[attribute] = {
			equals: val
		}

	} else if (_.isObject(attribute)) {
		var whereObject = Query.ParseWhereObject(attribute);
		_.merge(this.query, whereObject);
	}

	return this;

}

/**
 * Adds a limit to the query.
 * 
 * @memberOf Cabinet.Query#
 * @function limit
 * @param  {Number} num
 * @return {this}
 */
Query.prototype.limit = function (num) {
	
	if (!_.isNumber(num))
		throw new Error("Can only limit by number.");

	this.query.limit = num;

	return this;

}

/**
 * Adds a skip clause to the query.
 *
 * @memberOf Cabinet.Query#
 * @function skip
 * @param  {Number} num
 * @return {this}
 */
Query.prototype.skip = function (num) {

	if (!_.isNumber(num))
		throw new Error("Can only skip by number.");

	this.query.skip = num;

	return this;

}

/**
 * Adds a limit to the query.
 * 
 * @memberOf Cabinet.Query#
 * @function sort
 * @param  {String} algo - algorithm to use (allowed: asc, +, ascending or desc, -, descending)
 * @param  {String} attribute - attribute to sort by
 * @return {this}
 */
Query.prototype.sort = function (algo, attribute) {

	var map = {
		"asc": "ascending",
		"ascending": "ascending",
		"+": "ascending",
		"desc": "descending",
		"descending": "descending",
		"-": "descending"
	}
	
	if (!map[algo])
		throw new Error(format("Unknown sorting algorithm (%s)", algo));

	if (!this.query.sort) 
		this.query.sort = {};

	this.query.sort[attribute] = map[algo];

	return this;

}

/**
 * Sends the query to the attached driver.
 * @memberOf Cabinet.Query#
 * @function exec
 * @param  {Function} fn - callback, called when driver fires it.
 * @return {this}
 */
Query.prototype.exec = function (fn) {

	if (!this.driver)
		throw new Error("No driver attached");

	this.driver.exec(this.query, fn);

	return this;

}


/**
 * Parses a deep "where" object
 *
 * @example
 *  var query = MyModel.query().where({
 *    username: "John", 
 *    email: {
 *      equals: "john@mail.com"
 *    },
 *    age: {
 *      greaterThan: 18,
 *      lessThan: 24
 *    }
 *  });
 *  // results in the following query object
 *  // {
 *  //   username: { 
 *  //	   equals: "John"
 *  //   },
 *  //   email: {
 *  //     equals: "john@mail.com"
 *  //   }, 
 *  //   age: {
 *  //     greaterThan: 18,
 *  //     lessThan: 24
 *  //   }
 *  // }
 * @memberOf Cabinet.Query
 * @function ParseWhereObject
 * @param  {Number} num
 * @return {this}
 */
Query.ParseWhereObject = function (where) {

	var target = {};

	_.each(where, function (val, key) {

		if (_.isObject(val)) {			
			// We assume its a friendly where clause
			target[key] = val;

		} else if (_.isString(val)) {

			target[key] = {
				equals: val
			}			

		}

	})

	return target;

}

module.exports = Query;
/*
{
	username: {
		equals: "string"		
	},
	age: {
		greaterThan: 10,
		lessThan: 20,
		equal: 24
	}
}*/