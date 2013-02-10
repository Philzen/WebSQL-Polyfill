
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

		var db = null;

		var SQLResultSetRowList = function(data) {
			var rows = [];
			if (data) {
				rows = data;
			}
			this.length = rows.length;
			this.item = function(index) {
				return rows[index];
			}
		};

		/**
		 * Implementation of SQL Transaction object
		 * @returns {SQLTransaction}
		 */
		var SQLResultSet = function() {
			this.insertId = null,
					this.rows = null,
					this.rowsAffected = null;
		};

		/**
		 * Implementation of SQL Transaction object
		 * @returns {SQLTransaction}
		 */
		var SQLTransaction = function() {
			var hadErrors = false;
			this.executeSql = function(sql, bindVars, successCallback, errorCallback) {
				try {
					var data = db.exec(sql, bindVars);
					var resultSet = new SQLResultSet();
					resultSet.rows = new SQLResultSetRowList(data);
					if (successCallback)
						successCallback(this, resultSet);
					return resultSet;
				} catch (e) {
					console.log(e);
					if (e === undefined && successCallback) {
						successCallback(e);
						return e;
					}
					else {
							hadErrors = true;
						if (errorCallback)
							errorCallback(e);
						return e;
					}
				}
			}, this.hadErrors = function() {
				return hadErrors;
			};
		};

		var Database = function Database(name, version, description, size) {
			sqlLoader();
			db = _WebSqlJs.open();

			this.transaction = function(transactionFunction, errorCallback, successCallback) {
				if (arguments.length < 1)
					throw new TypeError('Not enough arguments');
				if (typeof transactionFunction !== 'function' || (errorCallback !== undefined && typeof errorCallback !== 'function') || (successCallback !== undefined && typeof successCallback !== 'function'))
					throw new TypeError('At least one supplied argument is not a function');

				var SQLtrans = new SQLTransaction();
				var result = transactionFunction(SQLtrans);
				if (SQLtrans.hadErrors() && errorCallback)
					errorCallback(result);
				else if (successCallback)
					successCallback(result);
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
