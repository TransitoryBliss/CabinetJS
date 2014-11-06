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
			}, Error, "Allowed none string to be set.");
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
})