var Cabinet = require("..");
var assert = require("assert");

describe("Query", function () {

	var User = Cabinet.createModel({ username: Cabinet.datatype.STRING });


	describe("#where", function () {
		it("adds an equal clause on where(str, str)", function () {
			
			var query = User.find();
			query.where("username", "Robert");

			assert.deepEqual(query.query, { 
				username: {
					equals: "Robert"
				}
			})			
		});

		it("adds an equal clause on where({ attr: val, another: val })", function () {
			
			var query = User.find();
			query.where({ username: "John" })
				 .where("email", "john@mail.com");
			
			assert.deepEqual(query.query, { 
				username: {
					equals: "John"
				},
				email: {
					equals: "john@mail.com"
				}
			})	
		})

		it("parses a deep object where({ username: { equals: \"...\" }})", function () {
			
			var query = User.find();
			query.where({ 
				username: {
					equals: "John"
				}
			});
			
			assert.deepEqual(query.query, { 
				username: {
					equals: "John"
				}
			})	
	
		})		

		it("allows mixing deep and shallow objects", function () {

			var query = User.find();
			query.where({ username: "Robert", age: {
				greaterThan: 10
			}});

			assert.deepEqual(query.query, {
				username: {
					equals: "Robert"
				},
				age: {
					greaterThan: 10
				}
			})

		});			

	});

	describe("#limit", function () {
		var query = User.find();
		
		it("adds a limit clause", function () {
			
			query.limit(20);
			assert.deepEqual(query.query, {
				limit: 20
			});
		});

		it("only allow numbers", function () {

			assert.throws(function () {
				query.limit("str");
			}, Error);

		});	

	})

	describe("#skip", function () {
		var query = User.find();
		
		it("adds a skip clause", function () {
			
			query.skip(20);
			assert.deepEqual(query.query, {
				skip: 20
			});
		});

		it("only allow numbers", function () {

			assert.throws(function () {
				query.skip("str");
			}, Error);

		});	

	})	

	describe("#sort", function () {

		var query = User.find();
		var expectedAscending = {
			sort: {
				username: "ascending"
			}
		}
		var expectedDescending = {
			sort: {
				username: "descending"
			}
		}		
		it("adds a sort clause", function () {

			query.sort("ascending", "username");
			assert.deepEqual(query.query, expectedAscending)
			query.sort("descending", "username");
			assert.deepEqual(query.query, expectedDescending)

		});

		it("maps shorthand to correct algorithm", function () {

			query.sort("asc", "username");
			assert.deepEqual(query.query, expectedAscending)
			query.sort("+", "username");
			assert.deepEqual(query.query, expectedAscending)
			query.sort("desc", "username");
			assert.deepEqual(query.query, expectedDescending)
			query.sort("-", "username");
			assert.deepEqual(query.query, expectedDescending)

		});

		it("disallows unknown algorithms", function () {

			assert.throws(function () {
				query.sort("nonexisting")
			}, Error);

		});

	})

	describe("#exec", function () {

		it("throws error when no driver attached", function () {

			var query = User.find();
			query.where("username", "Robert");
			assert.throws(function () {
				query.exec();
			}, Error);
		});

	})

});
