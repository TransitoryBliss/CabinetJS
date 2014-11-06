var assert = require("assert");
var Cabinet = require("..");

describe("createModel", function () {
			
	it("model inherits \"static model\"", function () {	
		var MyModel = Cabinet.createModel({ title: Cabinet.datatype.STRING });		
		assert.equal(typeof(MyModel.create), typeof(Function));
	});

});