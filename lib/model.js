var _ = require("lodash");
var EventEmitter = require("events").EventEmitter;
var util = require("util");

/**
 * The Model instance.
 *
 * A model instance is created from the static model. 
 * *Do NOT use the new keyword*.
 *
 * @namespace Cabinet.Model
 * @example
 *  var User = Cabinet.createModel({ 
 *  	username: Cabinet.datatype.STRING 
 *  });
 *  var user = User.create({ 
 *  	username: "myUsername" 
 *  }); 
 *  user.set("username", "anotherUsername");
 *  console.log(user instanceof Cabinet.Model) // => true
 * @param {Object} schema
 * @param {Object} attributes 
 */
function Model (schema, attributes) {

	var $ = this;	
	/**	 
	 * We dont want schema to be a property of the instance (only attributes should be).
	 * So we simulate a private member accessible through a getter
	 * 
	 * @function getSchema
	 * @memberOf Cabinet.Model#
	 * @return {object} schema
	 */
	schema = Model.formatSchema(schema);
	this.getSchema = function () {
		return schema;		
	}
	/**	 
	 * We dont want virtuals to be a property of the instance (only attributes should be).
	 * So we simulate a private member accessible through a getter
	 * 
	 * @function getVirtual
	 * @memberOf Cabinet.Model#
	 * @return {Function} virtual
	 */
	var virtuals = {};	
	this.getVirtual = function (name) {

		return virtuals[name] || undefined;

	}

	this.addVirtuals = function (virtualObject) {		

		_.each(virtualObject, function (val, key) {
			return $.addVirtual(key, val);
		});

	}

	this.addVirtual = function (virtualName, virtualMethod) {				

		virtuals[virtualName] = virtualMethod;

		return this;
	}

	// 
	// Assign all properties to null at first. 
	// The reasoning here is that it's easier to see all 
	// attributes the model can hold. 
	// 
	_(schema).each(function (val, key) {			
		// handle virtuals 
		if (key === "virtuals")
			return $.addVirtuals(val);
		 
		return $[key] = null;					
	});

	_(attributes).each(function (val, key) {
		if ($[key] !== undefined)
			return $.set(key, val, false);
	});
	
}

util.inherits(Model, EventEmitter);

Model.formatSchema = function (schema) {
	var target = {};

	_(schema).each(function (val ,key) {
		
		if (_.isFunction(schema[key])) {			

			target[key] = {
				type: schema[key]
			}

		} else {
			
			target[key] = schema[key];

		}

	});



	return target;
}

/**
 * Get an attribute. If the attribute is undefined we check
 * for a virtual. 
 *
 * @function get
 * @memberOf Cabinet.Model#
 * @param  {string} attribute 
 * @return {mixed} 
 */
Model.prototype.get = function (attribute) {
	
	if (this[attribute] !== undefined)
		return this[attribute];

	var virtual = this.getVirtual(attribute);

	if (virtual)
		return virtual.call(this);

}

/**
 * Set an attribute.
 * @function set 
 * @memberOf Cabinet.Model#
 * @param  {string} attribute 
 * @param {mixed} val value
 * @param {boolean} [notify=true] - Trigger events or not.
 * @return {this} 
 */
Model.prototype.set = function (attribute, val, notify) {
	
	notify = (notify === false) ? false : true;

	var schema = this.getSchema();	
	var attributeObject = schema[attribute];

	if (!attributeObject)
		throw new Error("Can't set attribute that does not exist in the schema.");	

	if (notify === true)
		this.emit("before:set", attribute, val);		

	// Validates the datatype of the value
	attributeObject.type(val);

	// Validate against custom validations
	_.each(attributeObject, function (validator, validatorName) {

		if (validatorName === "type") 
			return;		

		validator(val);


	});

	this[attribute] = val;
	
	if (notify === true)
		this.emit("after:set", attribute, val);

	return this;
};


module.exports = Model;