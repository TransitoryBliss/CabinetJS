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
 * @param  {schema} schema
 * @return {Cabinet.StaticModel}
 */
Cabinet.createModel = function (schema) {
	
	var staticModel = _.merge({}, Cabinet.StaticModel, { schema: schema });
	return staticModel;

}

module.exports = Cabinet;