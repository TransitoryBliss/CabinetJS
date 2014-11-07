// 
// Dependencies
//
var _ = require("lodash");

/**
 * @namespace Cabinet 
 * @example
 *  // Create a Model
 *  var Post = Cabinet.createModel({ 
 *    title: Cabinet.datatype.STRING
 *  });
 *  // Create an instance of a Post
 *  var myPost = Post.create();
 *  // Set some attribute
 *  myPost.set("title", "My Post Title");
 *  myPost.get("title") // => "My Post Title"
 *  // Save it!
 *  myPost.save(function () { ... });
 *  
 *  // Fetch data
 *  var Posts = Post.find().where({ title: "My Post Title"});
 *  Posts.exec(function (err, data) { ... });
 */
var Cabinet = {};

Cabinet.Model = require("./model");
Cabinet.StaticModel = require("./static_model");

/** 
 * @namespace Cabinet.datatype 
 */
Cabinet.datatype = require("./datatype");

/**
 * Creates a static model.
 *
 * @function createModel
 * @memberOf Cabinet
 * @param  {Object} schema 
 * @param {Function} [driverInstance] - an instance of a CabinetJS model driver
 * @return {Cabinet.StaticModel}
 */
Cabinet.createModel = function (schema, driverInstance, methods) {
	
	var virtuals = {};
	
	if (schema && schema.virtuals) {		
		virtuals = _.cloneDeep(schema.virtuals)
		schema.virtuals = undefined;
	}

	var staticModel = _.merge({}, Cabinet.StaticModel, { 
		schema: schema,
		driver: driverInstance,
		methods: methods
	});

	_.each(virtuals, function (val, key) {
		return staticModel.addVirtual(key, val);
	});

	return staticModel;

}

module.exports = Cabinet;