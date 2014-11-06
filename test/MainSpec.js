var assert = require("assert");
var Cabinet = require("..");

describe("createModel", function () {
			
	it("model inherits \"static model\"", function () {	
		var MyModel = Cabinet.createModel({ title: Cabinet.datatype.STRING });		
		assert.equal(typeof(MyModel.create), typeof(Function));
	});

});

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

describe("Model", function () {

	var User = Cabinet.createModel({
		username: Cabinet.datatype.STRING,
		email: Cabinet.datatype.STRING
	});

	describe("#set", function () {

		var user = User.create();

		it("can set existing attribute", function () {
			user.set("username", "TestUser");
			assert.strictEqual(user.username, "TestUser");
		});

		it("can't set non-existing schema attribute", function () {
			assert.throws(function () {
				user.set("NonExisting", "some value");
			}, Error);
		});

	});

	describe("#get", function () {

		var user = User.create({ username: "TestUser" });		

		it("can get existing attribute", function () {
			assert.strictEqual(user.get("username"), "TestUser");
		});

		it("returns null if attribute without value", function () {
			assert.strictEqual(user.get("email"), null);
		});

		it("returns undefined if non-existing attribute", function () {
			assert.strictEqual(user.get("nonExisting"), undefined);
		});

	});	

	describe("#on (events)", function () {
		
		var User = Cabinet.createModel({ title: Cabinet.datatype.STRING });
		

		describe("before:set", function () {

			it("should emit with args", function (done) {						
				var user = User.create();
				var fired = false;			
				setTimeout(function () {
					assert(fired, "Did not fire in 100ms");				
					done();
				}, 100);

				user.on("before:set", function (attribute, value) {
					fired = true;			
					assert.equal(attribute, "title", "Did not pass attribute");
					assert.equal(value, "My Title", "Did not pass value");							
				});

				user.set("title", "My Title");

			});

		});

		describe("after:set", function () {

			it("should emit with args", function (done) {						
				var user = User.create();
				var fired = false;			
				setTimeout(function () {
					assert(fired, "Did not fire in 100ms");				
					done();
				}, 100);

				user.on("after:set", function (attribute, value) {
					fired = true;			
					assert.equal(attribute, "title", "Did not pass attribute");
					assert.equal(value, user.get("title"), "Did not set value");							
				});

				user.set("title", "My Title");

			});

		});		

	});

});