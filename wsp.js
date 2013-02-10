
	if (typeof window.openDatabase === 'undefined') (function() {
		
		var Transaction = function () {
			this.executeSql = function(sql, bindVars, successCallback, errorCallback) {
				console.log('about to execute command: ' + sql);
			};
		};
		
		var Database = function Database (name, version, description, size) {
			var db = SQL.open();
			this.transaction = function(transactionFunction, errorCallback, successCallback) {
				if (arguments.length < 1) 
					throw new TypeError('Not enough arguments');
				if (typeof transactionFunction !== 'function' || (errorCallback !== undefined && typeof errorCallback !== 'function') || (successCallback !== undefined && typeof successCallback !== 'function')) 
					throw new TypeError('At least one supplied argument is not a function');
				
				transactionFunction(new Transaction());
			};
		};
		
		function openDatabase(name, version, description, size) {
			if (arguments.length < 4) {
				throw new TypeError('Not enough arguments');
			}
			
			return new Database(name, version, description, size);
		};
		

		window.openDatabase = openDatabase;
	})(window);
	
	console.log(typeof window.openDatabase);
