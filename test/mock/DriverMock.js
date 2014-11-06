function MockDriver (modelName, config) {

	this.config = config || {};

}

MockDriver.prototype.exec = function (query, fn) {

	if (typeof(fn) === typeof(Function))
		return fn(null, {});

}

module.exports = function (modelName, config) {

	return new MockDriver(modelName, config);
	
}