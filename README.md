WebSQL-Polyfill
===============

Polyfill for browsers lacking WebSQL implementation (i.e. Firefox &amp; IE)

## Purpose

Simply put, imagine an application at hand that uses web sql storage methods, such as those found in the [Cordova Storage API](http://docs.phonegap.com/en/2.3.0/cordova_storage_storage.md.html#Storage).
This Polyfill helps with making it run- and testable on Firefox and IE.

## Usage

Clone the project recursively in order to get the depending sql.js code:  

    git clone --recursive git@github.com:Philzen/WebSQL-Polyfill.git {target_folder}  

Then, simply include the script in your html:

    <script src="{target_folder}/websql-polyfill.js" type="text/javascript" ></script>  

WebSQL-Polyfill lazy-loads the dependency script into the DOM on-demand given that:  

a. window.openDatabase is not defined  
b. you are actually calling window.openDatabase at least once  

Otherwise, nothing will be loaded, executed and polyfilled, as there is no need for it in those cases.

## Current known limitations

- Datastore is not persisted during requests
- Though asynchronous websql API is adapted, currently everything executes in a synchronous manner

## ToDos / Roadmap

- use exportData()-method of sql.js to persist data after each transaction
- add option to select localStorage vs. IndexedDb for persistence, when both are available (where indexedDb persistence should restore asynchronous behaviour)

## Acknowledgements

This project currently uses [sql.js](https://github.com/kripken/sql.js) to enable easy abstraction of an SQL Lite database in memory.
