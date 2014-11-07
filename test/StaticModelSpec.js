var assert = require("assert");
var Cabinet = require("..");
var DriverMock = require("./mock/DriverMock.js");
var Query = require("../lib/query.js");

describe("StaticModel", function () {

	describe("#create", function () {

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

	describe("#find", function () {
		var User = Cabinet.createModel({ username: Cabinet.datatype.STRING });

		it("returns a Query instance on find", function () {

			var query = User.find();
			assert(query instanceof Query);

		});
	});

	describe("virtuals", function () {

		it("can't set virtual with same name as existing attribute", function () {
	
			var User = Cabinet.createModel({
				firstName: Cabinet.datatype.STRING				
			});			

			assert.throws(function () {
				User.addVirtual("firstName", function (){});
			}, Error);

		});

		it("virtual is called in correct context", function () {

			var User = Cabinet.createModel({
				firstName: Cabinet.datatype.STRING,
				lastName: Cabinet.datatype.STRING,					
			});			

			User.addVirtual("fullName", function () {
				return this.firstName + " " + this.lastName;
			});

			var user = User.create({firstName: "Robert", lastName: "Smith"});			
			
			assert.equal(user.get("fullName"), "Robert Smith");
		});

		it("can add virtuals on static model creation", function () {

			var User = Cabinet.createModel({
				firstName: Cabinet.datatype.STRING,
				lastName: Cabinet.datatype.STRING,
				virtuals: {
					fullName: function ()  {
						return this.firstName + " " + this.lastName;
					}
				}
			});

			var user = User.create({firstName: "Robert", lastName: "Smith"});						
			assert.equal(user.get("fullName"), "Robert Smith");			

		});	

	})
	
});