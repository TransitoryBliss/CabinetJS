var assert = require("assert");
var Cabinet = require("..");
var DriverMock = require("./mock/DriverMock.js");

describe("Cabinet", function () {
	describe("createModel", function () {

		it("model inherits \"static model\"", function () {	
			var MyModel = Cabinet.createModel({ title: Cabinet.datatype.STRING });		
			assert.equal(typeof(MyModel.create), typeof(Function));
		});

		it("can pass driver", function () {	

			var MyModel = Cabinet.createModel({ 
				title: Cabinet.datatype.STRING 
			}, DriverMock());			

			assert.ok(MyModel.driver);
		});

	});
});