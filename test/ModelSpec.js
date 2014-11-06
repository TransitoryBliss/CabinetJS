var assert = require("assert");
var Cabinet = require("..");

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

		it("cant set wrong datatype", function () {			
			assert.throws(function () {
				user.set("username", 123);
			}, Error);

			assert.throws(function () {
				user.set("username", true);
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

		it("should not trigger if notify=false", function (done) {
			
			var user = User.create();

			var before = false;
			var after = false;

			setTimeout(function () {				
				assert.strictEqual(before, false, "Should not trigger before");
				assert.strictEqual(after, false, "Should not trigger after");
				done();
			}, 500);			

			user.on("before:set", function () {
				before = true;
			});

			user.on("after:set", function () {
				after = true;
			});

			user.set("title", "my title", false);
		});

	});

});