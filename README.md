WebSQL-Polyfill
===============

Polyfill for browsers lacking WebSQL implementation (i.e. Firefox &amp; IE)

## Purpose

Simply put, imagine you an application at hand that uses web sql storage methods, such as those found in the [Cordova Storage API](http://docs.phonegap.com/en/2.3.0/cordova_storage_storage.md.html#Storage).
This project tries to make these kinds of projects run- and testable on Firefox and IE.

## Usage

Clone the project recursively in order to get the depending sql.js code:  

    git clone --recursive git@github.com:Philzen/WebSQL-Polyfill.git {target_folder}  

Then, simply include the script in your html:

	<script src="{target_folder}/websql-polyfill.js" type="text/javascript" ></script>


## Current known limitations

- Datastore is not persisted during requests
- Though asynchronous websql API is adapted, currently everthing executes in a synchronous manner

## ToDos / Roadmap

- use exportData()-method of sql.js to persist data after each transaction
- add option to select localStorage vs. IndexedDb for persistence, when both are available (where indexedDb persistence should restore asynchronous behaviour)

## Acknowledgements

This project currently uses [sql.js](https://github.com/kripken/sql.js) to enable easy abstraction of an SQL Lite database in memory.