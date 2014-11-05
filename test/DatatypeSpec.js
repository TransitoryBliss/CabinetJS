var assert = require("assert");
var Cabinet = require("..");

describe("datatype", function () {
	
	it("STRING", function () {

		assert(Cabinet.datatype.STRING);
		assert(Cabinet.datatype.STRING());

	});

})