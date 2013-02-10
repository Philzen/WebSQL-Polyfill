	

	if (typeof window.openDatabase === 'undefined') (function() {
		
		var Database = function Database (name, version, description, size) {
			
		};
		
		function openDatabase(name, version, description, size) {
			return new Database(name, version, description, size);
		}
		

		window.openDatabase = openDatabase;
	})(window);
	
	console.log(typeof window.openDatabase);
