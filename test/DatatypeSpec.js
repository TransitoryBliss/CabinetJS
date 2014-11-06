var assert = require("assert");
var Cabinet = require("..");

describe("datatype", function () {

	describe("STRING", function () {

		it("allows String and null", function () {
			assert(Cabinet.datatype.STRING("My String"));
			assert(Cabinet.datatype.STRING(null));
		});

		it("does not allow non-String values", function () {
			assert.throws(function () {
				Cabinet.datatype.STRING(123)
			}, Error, "Allowed string to be number.");

			assert.throws(function () {
				Cabinet.datatype.STRING(true)
			}, Error, "Allowed string to be boolean.");			
		});	

	});

	describe("BOOLEAN", function () {

		it("allows Boolean and null", function () {
			assert(Cabinet.datatype.BOOLEAN(false));
			assert(Cabinet.datatype.BOOLEAN(null));
		});

		it("does not allow non-Boolean values", function () {
			assert.throws(function () {
				Cabinet.datatype.BOOLEAN(123)
			}, Error, "Allowed none Boolean to be set.");
		});	
		
	});	

	describe("ENUM", function () {
		var ENUM = Cabinet.datatype.ENUM("allowed", "allowed two");	

		it("allows only values passed on creation", function () {
			assert(ENUM("allowed"));
			assert(ENUM("allowed two"));
		});
		
		it("does not allow values not passed on creation", function () {
			assert.throws(function (){
				ENUM("non existing");
			}, Error);			
		})
		it("should allow multiple enums defined at the same time", function () {
			var SECOND_ENUM = Cabinet.datatype.ENUM("another");
			assert(ENUM("allowed"));
			assert(SECOND_ENUM("another"));
			assert.throws(function () {
				SECOND_ENUM("allowed");
			}, Error)
		});		

		it("must pass allowed values on creation", function () {
			assert.throws(function () {
				var NO_VALUES = Cabinet.datatype.ENUM();
			}, Error);
		});
	});		
})