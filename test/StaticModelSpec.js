var assert = require("assert");
var Cabinet = require("..");

describe("StaticModel.create", function () {
		
	it("throws Error if no schema attached", function () {
		var MyModel = Cabinet.createModel();	
		assert.throws(MyModel.create, Error);
	})

	it("returns a Model instance", function () {	
		var MyModel = Cabinet.createModel({ title: Cabinet.datatype.STRING });
		var myModel = MyModel.create();
		assert(myModel instanceof Cabinet.Model);
	});

	it("assigns attributes to null if no value passed", function () {
		var MyModel = Cabinet.createModel({ 
			title: Cabinet.datatype.STRING 
		});
		var myModel = MyModel.create();		

		assert.strictEqual(myModel.title, null)
	});

	it("ignores attribute if non-existing in schema", function () {
		var MyModel = Cabinet.createModel({ 
			title: Cabinet.datatype.STRING 
		});
		var myModel = MyModel.create({title: "My Title", nonExisting: "non existing" });		

		assert.strictEqual(myModel.title, "My Title");
		assert.strictEqual(myModel.nonExisting, undefined);
	});	

	it("assigns attributes to value when passed", function () {
		var MyModel = Cabinet.createModel({ 
			title: Cabinet.datatype.STRING 
		});
		var myModel = MyModel.create({title: "My Title"});		

		assert.strictEqual(myModel.title, "My Title")
	});	

});