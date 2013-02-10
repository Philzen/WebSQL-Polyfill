
if (typeof window.openDatabase === 'undefined')
	(function() {

		function sqlLoader() {
			var basePath = '';
			(function(name) {
				var scripts = document.getElementsByTagName('script');

				for (var i = scripts.length - 1; i >= 0; --i) {
					var src = scripts[i].src;
					var l = src.length;
					var length = name.length;
					if (src.substr(l - length) == name) {
						// set a global propery here
						basePath = src.substr(0, l - length);
					}
				}
			})('wsp.js');

			var js = document.createElement("script");
			js.type = "text/javascript";
			function load(url) {

				if (window.XMLHttpRequest) {
					req = new XMLHttpRequest();
				} else if (window.ActiveXObject) {
					req = new ActiveXObject("Microsoft.XMLHTTP");
				}
				if (req != undefined) {
					req.onreadystatechange = function() {
						loadDone(url);
					};
					req.open("GET", url, false);
					req.send("");
				}
			}
			function loadDone(url) {
				if (req.readyState == 4) { // only if req is "loaded"
					document.body.appendChild(js);
					if (req.status == 200 || req.status == 0) { // only if "OK"
						js.innerHTML = '(function() { ' + req.responseText + ' window._WebSqlJs = SQL})(window);';
					} else {
						alert('could not load SQL.js lib!');
					}
				}
			}
			load(basePath + 'sql.js/sql.js');
		}

		var SQLTransaction = function() {
			this.executeSql = function(sql, bindVars, successCallback, errorCallback) {
				console.log('about to execute command: ' + sql);
			};
		};

		var Database = function Database(name, version, description, size) {
			sqlLoader();
			var db = _WebSqlJs.open();
			
			this.transaction = function(transactionFunction, errorCallback, successCallback) {
				if (arguments.length < 1)
					throw new TypeError('Not enough arguments');
				if (typeof transactionFunction !== 'function' || (errorCallback !== undefined && typeof errorCallback !== 'function') || (successCallback !== undefined && typeof successCallback !== 'function'))
					throw new TypeError('At least one supplied argument is not a function');

				transactionFunction(new SQLTransaction());
			};
		};

		function openDatabase(name, version, description, size) {
			if (arguments.length < 4) {
				throw new TypeError('Not enough arguments');
			}

			return new Database(name, version, description, size);
		}

		window.openDatabase = openDatabase;
	})(window);

console.log(typeof window.openDatabase);
