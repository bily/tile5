/*!
 * Sidelab T5 Javascript Library v@VERSION
 * http://sidelab.com/projects/T5/
 *
 * Copyright 2010, Damon Oehlman
 * Licensed under the MIT licence
 * http://sidelab.com/projects/T5/license
 *
 * Date: 
 */
 
/*jslint white: true, safe: true, onevar: true, undef: true, nomen: true, eqeqeq: true, newcap: true, immed: true, strict: true *//* GRUNTJS START */
/*
    http://www.JSON.org/json2.js
    2010-03-20

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint evil: true, strict: false */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (!this.JSON) {
    this.JSON = {};
}

(function () {

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf()) ?
                   this.getUTCFullYear()   + '-' +
                 f(this.getUTCMonth() + 1) + '-' +
                 f(this.getUTCDate())      + 'T' +
                 f(this.getUTCHours())     + ':' +
                 f(this.getUTCMinutes())   + ':' +
                 f(this.getUTCSeconds())   + 'Z' : null;
        };

        String.prototype.toJSON =
        Number.prototype.toJSON =
        Boolean.prototype.toJSON = function (key) {
            return this.valueOf();
        };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ?
            '"' + string.replace(escapable, function (a) {
                var c = meta[a];
                return typeof c === 'string' ? c :
                    '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' :
            '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0 ? '[]' :
                    gap ? '[\n' + gap +
                            partial.join(',\n' + gap) + '\n' +
                                mind + ']' :
                          '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    k = rep[i];
                    if (typeof k === 'string') {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0 ? '{}' :
                gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
                        mind + '}' : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                     typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/.
test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function' ?
                    walk({'': j}, '') : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());

/** @namespace */
GT = (function() {
    // initialise constants
    var REGEX_TEMPLATE_VAR = /\$\{(.*?)\}/ig;
    
    var hasOwn = Object.prototype.hasOwnProperty,
        objectCounter = 0;
    
    // define the GRUNT module
    var module = {
        /** @lends GRUNT */
        
        id: "GRUNT.core",
        
        /* 
        Very gr*nty jQuery stuff.
        Taken from http://github.com/jquery/jquery/blob/master/src/core.js
        */
        
        /** @static */
        extend: function() {
            // copy reference to target object
            var target = arguments[0] || {}, i = 1, length = arguments.length, deep = false, options, name, src, copy;

            // Handle a deep copy situation
            if ( typeof target === "boolean" ) {
                deep = target;
                target = arguments[1] || {};
                // skip the boolean and the target
                i = 2;
            }

            // Handle case when target is a string or something (possible in deep copy)
            if ( typeof target !== "object" && !module.isFunction(target) ) {
                target = {};
            }

            // extend module itself if only one argument is passed
            if ( length === i ) {
                target = this;
                --i;
            }

            for ( ; i < length; i++ ) {
                // Only deal with non-null/undefined values
                if ( (options = arguments[ i ]) != null ) {
                    // Extend the base object
                    for ( name in options ) {
                        src = target[ name ];
                        copy = options[ name ];

                        // Prevent never-ending loop
                        if ( target === copy ) {
                            continue;
                        }

                        // Recurse if we're merging object literal values or arrays
                        if ( deep && copy && ( module.isPlainObject(copy) || module.isArray(copy) ) ) {
                            var clone = src && ( module.isPlainObject(src) || module.isArray(src) ) ? src
                                : module.isArray(copy) ? [] : {};

                            // Never move original objects, clone them
                            target[ name ] = module.extend( deep, clone, copy );

                        // Don't bring in undefined values
                        } else if ( copy !== undefined ) {
                            target[ name ] = copy;
                        }
                    }
                }
            }

            // Return the modified object
            return target;
        },
        
        /** @static */
        isFunction: function( obj ) {
            return toString.call(obj) === "[object Function]";
        },

        /** @static */
        isArray: function( obj ) {
            return toString.call(obj) === "[object Array]";
        },

        /** @static */
        isPlainObject: function( obj ) {
            // Must be an Object.
            // Because of IE, we also have to check the presence of the constructor property.
            // Make sure that DOM nodes and window objects don't pass through, as well
            if ( !obj || toString.call(obj) !== "[object Object]" || obj.nodeType || obj.setInterval ) {
                return false;
            }

            // Not own constructor property must be Object
            if ( obj.constructor &&
                !hasOwn.call(obj, "constructor") &&
                !hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
                return false;
            }

            // Own properties are enumerated firstly, so to speed up,
            // if last one is own, then all properties are own.

            var key;
            for ( key in obj ) {}

            return key === undefined || hasOwn.call( obj, key );
        },

        /** @static */
        isEmptyObject: function( obj ) {
            for ( var name in obj ) {
                return false;
            }
            return true;
        },
        
        /** @static */
        isXmlDocument: function(obj) {
            return toString.call(obj) === "[object Document]";
        },
        
        /**
        This function is used to determine whether an object contains the specified names
        as specified by arguments beyond and including index 1.  For instance, if you wanted 
        to check whether object 'foo' contained the member 'name' then you would simply call
        GT.contains(foo, 'name'). 
        
        @static
        */
        contains: function(obj, members) {
            var fnresult = obj;
            var memberArray = arguments;
            var startIndex = 1;
            
            // if the second argument has been passed in, and it is an array use that instead of the arguments array
            if (members && module.isArray(members)) {
                memberArray = members;
                startIndex = 0;
            } // if
            
            // iterate through the arguments specified after the object, and check that they exist in the 
            for (var ii = startIndex; ii < memberArray; ii++) {
                fnresult = fnresult && (typeof foo[memberArray[ii]] !== 'undefined');
            } // for
            
            return fnresult;
        },
        
        /** @static */
        newModule: function(params) {
            params = module.extend({
                id: null,
                requires: [],
                parent: null
            }, params);
            
            // TODO: if parent is not assigned, then assign the default root module
            
            if (params.parent) {
                params = module.extend({}, params.parent, params);
            } // if
            
            return params;
        },
        
        toID: function(text) {
            return text.replace(/\s/g, "-");
        },
        
        /** @static */
        objId: function(prefix) {
            return (prefix ? prefix : "obj") + objectCounter++;
        },
        
        // TODO: rewrite implementation of this
        formatStr: function(text) {
            //check if there are two arguments in the arguments list
            if ( arguments.length <= 1 )
            {
                //if there are not 2 or more arguments there's nothing to replace
                //just return the original text
                return text;
            }
            //decrement to move to the second argument in the array
            var tokenCount = arguments.length - 2;
            for( var token = 0; token <= tokenCount; token++ )
            {
                //iterate through the tokens and replace their placeholders from the original text in order
                text = text.replace( new RegExp( "\\{" + token + "\\}", "gi" ),
                                                        arguments[ token + 1 ] );
            }
            return text;
        },
        
        wordExists: function(stringToCheck, word) {
            var testString = "";

            // if the word argument is an object, and can be converted to a string, then do so
            if (word.toString) {
                word = word.toString();
            } // if

            // iterate through the string and test escape special characters
            for (var ii = 0; ii < word.length; ii++) {
                testString += (! (/\w/).test(word[ii])) ? "\\" + word[ii] : word[ii];
            } // for

            var regex = new RegExp("(^|\\s|\\,)" + testString + "(\\,|\\s|$)", "i");

            return regex.test(stringToCheck);
        },
        
        /* some simple template parsing */
        
        parseTemplate: function(templateHtml, data) {
            // look for template variables in the html
            var matches = REGEX_TEMPLATE_VAR.exec(templateHtml);
            while (matches) {
                // remove the variable from the text
                templateHtml = templateHtml.replace(matches[0], GT.XPath.first(matches[1], data));

                // find the next match
                REGEX_TEMPLATE_VAR.lastIndex = 0;
                matches = REGEX_TEMPLATE_VAR.exec(templateHtml);
            } // while

            return templateHtml;
        }
    }; // module definition
    
    return module;
})();

GT.Log = (function() {
    var listeners = [];
    var jsonAvailable = (typeof JSON !== 'undefined'),
        traceAvailable = window.console && window.console.markTimeline;
    
    function writeEntry(level, entryDetails) {
        // initialise variables
        var ii;
        var message = entryDetails && (entryDetails.length > 0) ? entryDetails[0] : "";
        
        // iterate through the remaining arguments and append them as required
        for (ii = 1; entryDetails && (ii < entryDetails.length); ii++) {
            message += " " + (jsonAvailable && GT.isPlainObject(entryDetails[ii]) ? JSON.stringify(entryDetails[ii]) : entryDetails[ii]);
        } // for
        
        if (typeof console !== 'undefined') {
            console[level](message);
        } // if
        
        // if we have listeners, then tell them about the event
        for (ii = 0; ii < listeners.length; ii++) {
            listeners[ii].call(module, message, level);
        } // for
    } // writeEntry
    
    // define the module
    var module = {
        id: "GRUNT.log",
        
        /* logging functions */
        
        getTraceTicks: function() {
            return traceAvailable ? new Date().getTime() : null;
        },
        
        trace: function(message, startTicks) {
            if (traceAvailable) {
                console.markTimeline(message + (startTicks ? ": " + (module.getTraceTicks() - startTicks) + "ms" : ""));
            } // if
        },
        
        debug: function(message) {
            writeEntry("debug", arguments);
        },
        
        info: function(message) {
            writeEntry("info", arguments);
        },

        warn: function(message) {
            writeEntry("warn", arguments);
        },

        error: function(message) {
            writeEntry("error", arguments);
        },
        
        exception: function(error) {
            module.error(arguments);
            
            // iterate through the keys of the error and add them as info sections
            // TODO: make this targeted at the stack, etc
            for (var keyname in error) {
                module.info("ERROR DETAIL: " + keyname + ": " + error[keyname]);
            } // for
        },
        
        /* error monitoring, exception raising functions */
        
        watch: function(sectionDesc, callback) {
            try {
                callback();
            }
            catch (e) {
                module.exception(e, sectionDesc);
            } // try..catch
        },
        
        throwError: function(errorMsg) {
            // log the error
            module.error(errorMsg);
            throw new Error(errorMsg);
        },
        
        /* event handler functions */
        
        requestUpdates: function(callback) {
            listeners.push(callback);
        }
    };
    
    return module;
})();

(function() {
    
    function determineObjectMapping(line) {
        // if the line is empty, then return null
        if (! line) {
            return null;
        } // if
        
        // split the line on the pipe character
        var fields = line.split("|");
        var objectMapping = {};
        
        // iterate through the fields and initialise the object mapping
        for (var ii = 0; ii < fields.length; ii++) {
            objectMapping[fields[ii]] = ii;
        } // for
        
        return objectMapping;
    } // determineObjectMapping
    
    function mapLineToObject(line, mapping) {
        // split the line on the pipe character
        var fields = line.split("|");
        var objectData = {};
        
        // iterate through the mapping and pick up the fields and assign them to the object
        for (var fieldName in mapping) {
            var fieldIndex = mapping[fieldName];
            objectData[fieldName] = fields.length > fieldIndex ? fields[fieldIndex] : null;
        } // for
        
        return objectData;
    } // mapLineToObject
    
    function parsePDON(data) {
        // initialise variables
        var objectMapping = null;
        var results = [];

        // split the data on line breaks
        var lines = data.split("\n");
        for (var ii = 0; ii < lines.length; ii++) {
            // TODO: remove leading and trailing whitespace
            var lineData = lines[ii];

            // if the object mapping hasn't been initialised, then initialise it
            if (! objectMapping) {
                objectMapping = determineObjectMapping(lineData);
            }
            // otherwise create an object from the object mapping
            else {
                results.push(mapLineToObject(lineData, objectMapping));
            } // if..else
        } // for

        return results;
    } // parsePDON
    
    // define the supported formats
    var supportedFormats = {
        JSON: {
            parse: function(data) {
                return JSON.parse(data);
            }
        },
        
        PDON: {
            parse: function(data) {
                return parsePDON(data);
            }
        }
    }; // supportedFormats
    
    // define the module
    GT.parseData = function(data, format) {
        format = format ? format.toUpperCase() : "JSON";
        
        // check that the format is supported, if not raise an exception
        if (! supportedFormats[format]) {
            throw new Error("Unsupported data format: " + format);
        } // if
        
        try {
            return supportedFormats[format].parse(data);
        } 
        catch (e) {
            GT.Log.exception(e);
        } // try..catch
        
        return {};
    }; // parseData
})();

(function() {
    // initilialise local variables
    var configurables = {};
    
    /* internal functions */

    function attachHelper(target, helperName) {
        // if the helper is not defined, then attach
        if (! target[helperName]) {
            target[helperName] = function(value) {
                return target.configure(helperName, value);
            };
        } // if
    } // attachHelper

    function getSettings(target) {
        return target.gtConfig;
    } // getSettings

    function getConfigCallbacks(target) {
        return target.gtConfigFns;
    } // getConfigGetters
    
    function initSettings(target) {
        target.gtConfId = GT.objId("configurable");
        target.gtConfig = {};
        target.gtConfigFns = [];
        
        return target.gtConfig;
    } // initSettings

    /* define the param tweaker */
    
    GT.paramTweaker = function(params, getCallbacks, setCallbacks) {
        return function(name, value) {
            if (typeof value !== "undefined") {
                if (name in params) {
                    params[name] = value;
                } // if

                if (setCallbacks && (name in setCallbacks)) {
                    setCallbacks[name](name, value);
                } // if
            }
            else {
                return (getCallbacks && (name in getCallbacks)) ? 
                    getCallbacks[name](name) : 
                    params[name];
            } // if..else

            return undefined;
        };
    }; // paramTweaker
    
    /* define configurable */

    GT.configurable = function(target, configParams, callback, bindHelpers) {
        if (! target) { return; }

        // if the target doesn't yet have a configurable settings member, then add it
        if (! target.gtConfId) {
            initSettings(target);
        } // if

        var ii,
            targetId = target.gtConfId,
            targetSettings = getSettings(target),
            targetCallbacks = getConfigCallbacks(target);

        // update the configurables
        // this is a which gets the last object in an extension chain in
        // the configurables list, so make sure you extend before you make
        // an object configurable, otherwise things will get a bit wierd.
        configurables[targetId] = target;

        // add the callback to the list
        targetCallbacks.push(callback);

        for (ii = configParams.length; ii--; ) {
            targetSettings[configParams[ii]] = true;

            if (bindHelpers) {
                attachHelper(target, configParams[ii]);
            } // if
        } // for

        if (! target.configure) {
            target.configure = function(name, value) {
                if (targetSettings[name]) {
                    for (var ii = targetCallbacks.length; ii--; ) {
                        var result = targetCallbacks[ii](name, value);
                        if (typeof result !== "undefined") {
                            return result;
                        } // if
                    } // for

                    return configurables[targetId];
                } // if

                return null;
            };
        } // if
    };
})();
/** @namespace 

Lightweight JSONP fetcher - www.nonobstrusive.com
The JSONP namespace provides a lightweight JSONP implementation.  This code
is implemented as-is from the code released on www.nonobtrusive.com, as per the
blog post listed below.  Only two changes were made. First, rename the json function
to get around jslint warnings. Second, remove the params functionality from that
function (not needed for my implementation).  Oh, and fixed some scoping with the jsonp
variable (didn't work with multiple calls).

http://www.nonobtrusive.com/2010/05/20/lightweight-jsonp-without-any-3rd-party-libraries/
*/
(function(){
    var counter = 0, head, query, key, window = this;
    
    function load(url) {
        var script = document.createElement('script'),
            done = false;
        script.src = url;
        script.async = true;
 
        script.onload = script.onreadystatechange = function() {
            if ( !done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") ) {
                done = true;
                script.onload = script.onreadystatechange = null;
                if ( script && script.parentNode ) {
                    script.parentNode.removeChild( script );
                }
            }
        };
        if ( !head ) {
            head = document.getElementsByTagName('head')[0];
        }
        head.appendChild( script );
    } // load
    
    function prepAndLoad(url, callback, callbackParam) {
        // apply either a ? or & to the url depending on whether we already have query params
        url += url.indexOf("?") >= 0 ? "&" : "?";

        var jsonp = "json" + (++counter);
        window[ jsonp ] = function(data){
            callback(data);
            window[ jsonp ] = null;
            try {
                delete window[ jsonp ];
            } catch (e) {}
        };
 
        load(url + (callbackParam ? callbackParam : "callback") + "=" + jsonp);
        return jsonp;
    } // jsonp
    
    GT.jsonp = prepAndLoad;
}());/** @namespace 

The XHR namespace provides functionality for issuing AJAX requests in a similar style 
to the way jQuery does.  Why build a replacement for jQuery's ajax functionality you ask 
(and a fair question, I might add)?  Basically, because I was writing a library that I 
didn't want to have to rely on the presence of jQuery especially when the internals of the
way AJAX is handled changed between version 1.3.2 and 1.4.2. While not a big deal for 
end users of jQuery it became a problem when you wanted to implement a replacement XHR 
object.  So what does GRUNT XHR provide then?

TODO: add information here...
*/
(function() {
    // define some content types
    var CONTENT_TYPES = {
        HTML: "text/html",
        XML: "text/xml",
        TEXT: "text/plain",
        STREAM: "application/octet-stream"
    };

    // define some regular expressions to help determine the type of the request
    var REQUEST_URL_EXTENSIONS = {
        JSON: ['json'],
        PDON: ['pdon.txt']
    };
    
    var INDERMINATE_CONTENT_TYPES = ["TEXT", "STREAM"];
    
    // initialise some regexes
    var REGEX_URL = /^(\w+:)?\/\/([^\/?#]+)/;

    // define the variable content type processors
    var RESPONSE_TYPE_PROCESSORS = {
        XML: function(xhr, requestParams) {
            return xhr.responseXML;
        },
        
        JSON: function(xhr, requestParams) {
            return GT.parseData(xhr.responseText);
        },
        
        PDON: function(xhr, requestParams) {
            return GT.parseData(xhr.responseText, "PDON");
        },
        
        DEFAULT: function(xhr, requestParam) {
            return xhr.responseText;
        }
    }; // CONTENT_TYPE_PROCESSORS
    
    // define headers
    var HEADERS = {
        CONTENT_TYPE: "Content-Type"
    };
    
    /**
    This function is used to determine the appropriate request type based on the extension 
    of the url that was originally requested.  This function is only called in the case where
    an indeterminate type of content-type has been received from the server that has supplied the 
    response (such as application/octet-stream).  
    
    @private
    @param {XMLHttpRequest } xhr the XMLHttpRequest object
    @param requestParams the parameters that were passed to the xhr request
    @param fallbackType the type of request that we will fallback to 
    */
    function getProcessorForRequestUrl(xhr, requestParams, fallbackType) {
        for (var requestType in REQUEST_URL_EXTENSIONS) {
            // iterate through the file extensions
            for (var ii = 0; ii < REQUEST_URL_EXTENSIONS[requestType].length; ii++) {
                var fileExt = REQUEST_URL_EXTENSIONS[requestType][ii];

                // if the request url ends with the specified file extension we have a match
                if (new RegExp(fileExt + "$", "i").test(requestParams.url)) {
                    return requestType;
                } // if
            } // for
        } // for
        
        return fallbackType ? fallbackType : "DEFAULT";
    } // getProcessorForRequestUrl
    
    function requestOK(xhr, requestParams) {
        return ((! xhr.status) && (location.protocol === "file:")) ||
            (xhr.status >= 200 && xhr.status < 300) || 
            (xhr.status === 304) || 
            (xhr.status === 1223) || 
            (xhr.status === 0);
    } // getStatus
    
    function param(data) {
        // iterate through the members of the data and convert to a paramstring
        var params = [];
        var addKeyVal = function (key, value) {
            // If value is a function, invoke it and return its value
            value = GT.isFunction(value) ? value() : value;
            params[ params.length ] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
        };

        // If an array was passed in, assume that it is an array of form elements.
        if (GT.isArray(data)) {
            for (var ii = 0; ii < data.length; ii++) {
                addKeyVal(data[ii].name, data[ii].value);
            } // for
        }
        else {
            for (var keyname in data) {
                addKeyVal(keyname, data[keyname]);
            } // for
        } // if..else

        // Return the resulting serialization
        return params.join("&").replace(/%20/g, "+");
    } // param
    
    function processResponseData(xhr, requestParams) {
        // get the content type of the response
        var contentType = xhr.getResponseHeader(HEADERS.CONTENT_TYPE),
            processorId,
            matchedType = false;
        
        // GT.Log.info("processing response data, content type = " + contentType);
        
        // determine the matching content type
        for (processorId in CONTENT_TYPES) {
            if (contentType && (contentType.indexOf(CONTENT_TYPES[processorId]) >= 0)) {
                matchedType = true;
                break;
            }
        } // for
        
        // if the match type was indeterminate, then look at the url of the request to
        // determine which is the best type to match on
        var indeterminate = (! matchedType);
        for (var ii = 0; ii < INDERMINATE_CONTENT_TYPES.length; ii++) {
            indeterminate = indeterminate || (INDERMINATE_CONTENT_TYPES[ii] == processorId);
        } // for
        
        if (indeterminate) {
            processorId = getProcessorForRequestUrl(xhr, requestParams, processorId);
        } // if
        
        try {
            // GT.Log.info("using processor: " + processorId + " to process response");
            return RESPONSE_TYPE_PROCESSORS[processorId](xhr, requestParams);
        }
        catch (e) {
            // GT.Log.warn("error applying processor '" + processorId + "' to response type, falling back to default");
            return RESPONSE_TYPE_PROCESSORS.DEFAULT(xhr, requestParams);
        } // try..catch
    } // processResponseData
    
    GT.xhr = function(params) {
        
        function handleReadyStateChange() {
            if (this.readyState === 4) {
                var responseData = null,
                    success = requestOK(this, params);

                try {
                    // get and check the status
                    if (success) {
                        // process the response
                        if (params.handleResponse) {
                            params.handleResponse(this);
                        }
                        else {
                            responseData = processResponseData(this, params);
                        }
                    }
                    else if (params.error) {
                        params.error(this);
                    } // if..else
                }
                catch (e) {
                    GT.Log.exception(e, "PROCESSING AJAX RESPONSE");
                } // try..catch

                // if the success callback is defined, then call it
                // GT.Log.info("received response, calling success handler: " + params.success);
                if (success && responseData && params.success) {
                    params.success.call(this, responseData);
                } // if
            } // if
        } // handleReadyStateChange
        
        // given that I am having to write my own AJAX handling, I think it's safe to assume that I should
        // do that in the context of a try catch statement to catch the things that are going to go wrong...
        try {
            params = GT.extend({
                method: "GET",
                data: null,
                url: null,
                async: true,
                success: null,
                handleResponse: null,
                error: null,
                contentType: "application/x-www-form-urlencoded"
            }, params);
            
            // determine if this is a remote request (as per the jQuery ajax calls)
            var parts = REGEX_URL.exec(params.url),
                remote = parts && (parts[1] && parts[1] !== location.protocol || parts[2] !== location.host);                
            
            // if we have data, then update the method to POST
            if (params.data) {
                params.method = "POST";
            } // if

            // if the url is empty, then log an error
            if (! params.url) {
                GT.Log.warn("ajax request issued with no url - that ain't going to work...");
                return;
            } // if
            
            // if the we have an xhr creator registered, then let it decide whether it wants to create the client
            var xhr = null;
            if (params.xhr) {
                xhr = params.xhr(params);
            } // if
            
            // if the optional creator, didn't create the client, then create the default client
            if (! xhr) {
                xhr = new XMLHttpRequest();
            } // if

            // GT.Log.info("opening request: " + JSON.stringify(params));

            // open the request
            // TODO: support basic authentication
            xhr.open(params.method, params.url, params.async);

            // if we are sending data, then set the correct content type
            if (params.data) {
                xhr.setRequestHeader("Content-Type", params.contentType);
            } // if
            
            // if this is not a remote request, the set the requested with header
            if (! remote) {
                xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            } // if
            
            xhr.onreadystatechange = handleReadyStateChange;

            // send the request
            // GT.Log.info("sending request with data: " + param(params.data));
            xhr.send(params.method == "POST" ? param(params.data) : null);
        } 
        catch (e) {
            GT.Log.exception(e);
        } // try..catch                    
    }; // GT.xhr
})();

GT.XPath = (function() {
    var xpathEnabled = typeof XPathResult !== 'undefined';
    var nsResolvers = [];
    
    // defne a set of match handlers that are invoked for the various different type of xpath match results
    var MATCH_HANDLERS = [
        // 0: ANY_TYPE
        null, 
        
        // 1: NUMBER_TYPE
        function(match) {
            return match.numberValue;
        },
        
        // 2: STRING_TYPE
        function(match) {
            return match.stringValue;
        },
        
        // 3: BOOLEAN_TYPE
        function(match) {
            return match.booleanValue;
        },
        
        // 4: UNORDERED_NODE_ITERATOR_TYPE
        null,
        
        // 5: ORDERED_NODE_ITERATOR_TYPE
        null,
        
        // 6: UNORDERED_NODE_SNAPSHOT_TYPE
        null,
        
        // 7: ORDERED_NODE_SNAPSHOT_TYPE
        null,
        
        // 8: ANY_UNORDERED_NODE_TYPE
        function(match) {
            return match.singleNodeValue ? match.singleNodeValue.textContent : null;
        },
        
        // 9: FIRST_ORDERED_NODE_TYPE
        function(match) {
            return match.singleNodeValue ? match.singleNodeValue.textContent : null;
        }
    ];
    
    function namespaceResolver(prefix) {
        var namespace = null;
        
        // iterate through the registered resolvers and give them the opportunity to provide a namespace
        for (var ii = 0; ii < nsResolvers.length; ii++) {
            namespace = nsResolvers[ii](prefix);
            
            // if the namespace has been defined, by this resolver then break from the loop
            if (namespace) { break; }
        } // for
        
        return namespace;
    } // namespaceResolver
    
    // if xpath is not enabled, then throw a warning
    if (! xpathEnabled) {
        GT.Log.warn("No XPATH support");
    } // if
    
    function xpath(expression, context, resultType) {
        // if the result type is not specified, then use any type
        if (! resultType) {
            resultType = XPathResult.ANY_TYPE;
        } // if
        
        try {
            // if the context node is not xml, then return null and raise a warning
            if (! GT.isXmlDocument(context)) {
                GT.Log.warn("attempted xpath expression: " + expression + " on a non-xml document");
                return null;
            } // if
            
            // return the value of the expression
            return context.evaluate(expression, context, namespaceResolver, resultType, null);
        } 
        catch (e) {
            GT.Log.warn("invalid xpath expression: " + expression + " on node: " + context);
            return null;
        } // try..catch
    } // xpath
    
    // define the module
    var module = {
        SearchResult: function(matches) {
            // initialise self
            var self = {
                
                toString: function() {
                    var result = null;
                    
                    if (matches) {
                        var matchHandler = null;
                        if ((matches.resultType >= 0) && (matches.resultType < MATCH_HANDLERS.length)) {
                            matchHandler = MATCH_HANDLERS[matches.resultType];
                        } // if
                        
                        // if we have a match handler, then call it
                        if (matchHandler) {
                            // GT.Log.info("invoking match handler for result type: " + matches.resultType);
                            result = matchHandler(matches);
                        }
                    } // if
                    
                    return result ? result : "";
                }
            };
            
            return self;
        },
        
        first: function(expression, node) {
            return new module.SearchResult(xpath(expression, node, XPathResult.FIRST_ORDERED_NODE_TYPE));
        },
        
        registerResolver: function(callback) {
            nsResolvers.push(callback);
        }
    };
    
    return module;
})();

(function() {
    function getHandlers(target) {
        return target.gtObsHandlers;
    } // getHandlers
    
    function getHandlersForName(target, eventName) {
        var handlers = getHandlers(target);
        if (! handlers[eventName]) {
            handlers[eventName] = [];
        } // if

        return handlers[eventName];
    } // getHandlersForName
    
    GT.observable = function(target) {
        if (! target) { return; }

        /* initialization code */

        // check that the target has handlers 
        if (! getHandlers(target)) {
            target.gtObsHandlers = {};
        } // if

        var attached = target.bind || target.trigger || target.unbind;
        if (! attached) {
            target.bind = function(eventName, callback) {
                var callbackId = GT.objId("callback");
                getHandlersForName(target, eventName).push({
                    fn: callback,
                    id: callbackId
                });

                return callbackId;
            }; // bind

            target.trigger = function(eventName) {
                var eventCallbacks = getHandlersForName(target, eventName);

                // check that we have callbacks
                if (! eventCallbacks) {
                    return target;
                } // if

                for (var ii = eventCallbacks.length; ii--; ) {
                    eventCallbacks[ii].fn.apply(self, Array.prototype.slice.call(arguments, 1));
                } // for

                return target;
            }; // trigger

            target.unbind = function(eventName, callbackId) {
                var eventCallbacks = getHandlersForName(target, eventName);
                for (var ii = 0; eventCallbacks && (ii < eventCallbacks.length); ii++) {
                    if (eventCallbacks[ii].id === callbackId) {
                        eventCallbacks.splice(ii, 1);
                        break;
                    } // if
                } // for

                return target;
            }; // unbind
        } // if
    };
})();

// TODO: add functionality that allows you to stop listening to messages
(function() {
    // initialise variables
    var messageListeners = {},
        pipes = [];
    
    // define the module
    GT.addPipe = function(callback) {
        // test the pipe because if it is broke it will break everything
        callback("pipe.test", {});
        
        // given that didn't throw an exception and we got here, we can now add the pipe
        pipes.push(callback);
    }; // addPipe
    
    GT.listen = function(message, callback) {
        // if we don't have a message listener array configured, then create one now
        if (! messageListeners[message]) {
            messageListeners[message] = [];
        } // if
        
        // add the callback to the listener queue
        if (callback) {
            messageListeners[message].push(callback);
        } // if
    }; // listen
        
    GT.say = function(message, args) {
        var ii;
        
        // if there are pipes, then send the message through each
        for (ii = pipes.length; ii--; ) {
            pipes[ii](message, args);
        } // for
        
        // if we don't have any message listeners for that message, then return
        if (! messageListeners[message]) { return; }
        
        // iterate through the message callbacks
        for (ii = messageListeners[message].length; ii--; ) {
            messageListeners[message][ii](args);
        } // for
    }; // say
})();

GT.Storage = (function() {
    function getStorageScope(scope) {
        if (scope && (scope == "session")) {
            return sessionStorage;
        } // if
        
        return localStorage;
    } // getStorageTarget

    return {
        get: function(key, scope) {
            // get the storage target
            var value = getStorageScope(scope).getItem(key);
            
            // if the value looks like serialized JSON, parse it
            return (/^(\{|\[).*(\}|\])$/).test(value) ? JSON.parse(value) : value;
        },
        
        set: function(key, value, scope) {
            // if the value is an object, the stringify using JSON
            var serializable = jQuery.isArray(value) || jQuery.isPlainObject(value);
            var storeValue = serializable ? JSON.stringify(value) : value;
            
            // save the value
            getStorageScope(scope).setItem(key, storeValue);
        },
        
        remove: function(key, scope) {
            getStorageScope(scope).removeItem(key);
        }
    };
})();
GT.ParseRules = function(params) {
    var rules = [];
    
    var self = {
        add: function(regex, handler) {
            rules.push({
                regex: regex,
                handler: handler
            });
        },
        
        each: function(input, outputReceiver, allCompleteCallback) {
            var completionCounter = 0;
            
            function incCounter() {
                completionCounter++;
                if (allCompleteCallback && (completionCounter >= rules.length)) {
                    allCompleteCallback(outputReceiver);
                } // if
            } // incCounter
            
            for (var ii = 0; ii < rules.length; ii++) {
                var regex = rules[ii].regex,
                    handler = rules[ii].handler,
                    handled = false;
                
                if (regex) {
                    regex.lastIndex = -1;
                    
                    var matches = regex.exec(input);
                    if (matches && handler) {
                        handled = true;
                        if (handler(matches, outputReceiver, incCounter)) {
                            incCounter();
                        } // if
                    } // if
                } // if
                
                if (! handled) {
                    incCounter();
                } // if
            }
        }
    };
    
    return self;
}; // ParseRules
/* GRUNTJS END */
/**
T5.Core
=======

The T5.Core module contains classes and functionality that support basic drawing 
operations and math that are used in managing and drawing the graphical and tiling interfaces 
that are provided in the Tile5 library.

Classes
-------

- T5.Vector
- T5.Dimensions
- T5.Rect


Submodules
----------

- T5.Settings
- T5.V
- T5.D
- T5.R
*/
T5 = (function() {
    /**
    # T5.Vector

    A vector is used to encapsulate X and Y coordinates for a point, and rather than 
    bundle it with methods it has been kept to just core data to ensure it has a 
    lightweight memory footprint.


    */
    var Vector = function(initX, initY) {
        return {
            x: initX ? initX : 0,
            y: initY ? initY : 0
        };
    }; // Vector
    
    /**
    # T5.V

    This module defines functions that are used to maintain T5.Vector objects and this
    is removed from the actual Vector class to keep the Vector object lightweight.

    ## Functions

    */
    var vectorTools = (function() {
        function edges(vectors) {
            if ((! vectors) || (vectors.length <= 1)) {
                throw new Error("Cannot determine edge " +
                    "distances for a vector array of only one vector");
            } // if
            
            var fnresult = {
                edges: new Array(vectors.length - 1),
                accrued: new Array(vectors.length - 1),
                total: 0
            };
            
            var diffFn = vectorTools.diff;
            
            // iterate through the vectors and calculate the edges
            // OPTMIZE: look for speed up opportunities
            for (var ii = 0; ii < vectors.length - 1; ii++) {
                var diff = diffFn(vectors[ii], vectors[ii + 1]);
                
                fnresult.edges[ii] = 
                    Math.sqrt((diff.x * diff.x) + (diff.y * diff.y));
                fnresult.accrued[ii] = 
                    fnresult.total + fnresult.edges[ii];
                    
                fnresult.total += fnresult.edges[ii];
            } // for
            
            return fnresult;
        } // edges

        return {
            create: function(x, y) {
                return new Vector(x, y);
            },
            
            /**
            - `add(v*)`
            
            Return a new T5.Vector that is the total sum value of all the 
            vectors passed to the function.
            */
            add: function() {
                var fnresult = new Vector();
                for (var ii = arguments.length; ii--; ) {
                    fnresult.x += arguments[ii].x;
                    fnresult.y += arguments[ii].y;
                } // for
                
                return fnresult;
            },
            
            absSize: function(vector) {
                return Math.max(Math.abs(vector.x), Math.abs(vector.y));
            },
            
            /**
            - `diff(v1, v2)`
            
            Return a new T5.Vector that contains the result of v1 - v2.
            */
            diff: function(v1, v2) {
                return new Vector(v1.x - v2.x, v1.y - v2.y);
            },
            
            /**
            - `copy(src)`
            
            Return a new T5.Vector copy of the vector passed to the function 
            */
            copy: function(src) {
                return src ? new Vector(src.x, src.y) : null;
            },
            
            /**
            - `invert(v)`
            
            Return a new T5.Vector that contains the inverted values of the 
            vector passed to the function
            */
            invert: function(vector) {
                return new Vector(-vector.x, -vector.y);
            },
            
            /**
            - `offset(vector, offsetX, offsetY)`
            
            Return a new T5.Vector that is offset by the specified x and y offset
            */
            offset: function(vector, offsetX, offsetY) {
                return new Vector(
                                vector.x + offsetX, 
                                vector.y + (offsetY ? offsetY : offsetX));
            },
            
            edges: edges,
            
            /**
            - `distance(v*)`
            
            Return the total euclidean distance between all the points of the
            vectors supplied to the function
            */
            distance: function(vectors) {
                return edges(vectors).total;
            },
            
            /**
            - `theta (v1, v2, distance)`
            
            */
            theta: function(v1, v2, distance) {
                var theta = Math.asin((v1.y - v2.y) / distance);
                return v1.x > v2.x ? theta : Math.PI - theta;
            },
            
            
            /**
            - `pointOnEdge(v1, v2, theta, delta)`
            
            */
            pointOnEdge: function(v1, v2, theta, delta) {
                var xyDelta = new Vector(
                                    Math.cos(theta) * delta, 
                                    Math.sin(theta) * delta);
                
                return new Vector(
                                    v1.x - xyDelta.x, 
                                    v1.y - xyDelta.y);
            },
            
            /**
            - `getRect(v*)`
            
            */
            getRect: function(vectorArray) {
                var arrayLen = vectorArray.length;
                if (arrayLen > 1) {
                    return new Rect(
                        Math.min(
                            vectorArray[0].x, 
                            vectorArray[arrayLen - 1].x
                        ),
                        Math.min(
                            vectorArray[0].y, 
                            vectorArray[arrayLen - 1].y
                        ),
                        Math.abs(vectorArray[0].x - 
                            vectorArray[arrayLen - 1].x),
                        Math.abs(vectorArray[0].y - 
                            vectorArray[arrayLen - 1].y)
                    );
                }
            },
            
            /**
            - `toString(vector)`
            
            */
            toString: function(vector) {
                return vector.x + ', ' + vector.y;
            }
        };
    })(); // vectorTools
    
    /**
    # T5.Rect
    
    A class used to store details pertaining to a rectangular region.
    
    ## Constructor
    
    `new T5.Rect(x, y, width, height)`
    
    ## Properties
    
    - origin - the top left point of the rectangle
    - dimensions - the width and height of the rectangle
    */
    var Rect = function(x, y, width, height) {
        return {
            origin: new Vector(x, y),
            dimensions: new Dimensions(width, height)
        };
    }; // Rect
    
    /**
    # T5.R
    
    */
    var rectTools = (function() {
        var subModule = {
            copy: function(src) {
                return src ? 
                    new Rect(
                            src.origin.x, 
                            src.origin.y, 
                            src.dimensions.width, 
                            src.dimensions.height) :
                    null;
            },
            
            getCenter: function(rect) {
                return new Vector(
                            rect.origin.x + (rect.dimensions.width / 2), 
                            rect.origin.y + (rect.dimensions.height / 2));
            }
        };
        
        return subModule;
    })(); // rectTools

    /**
    # T5.Dimensions
    
    */
    var Dimensions = function(initWidth, initHeight) {
        return {
            width: initWidth ? initWidth : 0,
            height: initHeight ? initHeight : 0
        }; 
    }; // Dimensions
    
    /** 
    # T5.D
    
    */
    var dimensionTools = (function() {
        var subModule = {
            getAspectRatio: function(dimensions) {
                return dimensions.height !== 0 ? 
                    dimensions.width / dimensions.height : 1;
            },

            getCenter: function(dimensions) {
                return new Vector(
                            dimensions.width / 2, 
                            dimensions.height / 2);
            },
            
            getSize: function(dimensions) {
                return Math.sqrt(Math.pow(dimensions.width, 2) + 
                        Math.pow(dimensions.height, 2));
            }
        };
        
        return subModule;
    })(); // dimensionTools

    var module = {
        ex: GT.extend,
        
        newCanvas: function(width, height) {
            var tmpCanvas = document.createElement('canvas');

            // initialise the canvas element if using explorercanvas
            if (typeof(G_vmlCanvasManager) !== "undefined") {
                G_vmlCanvasManager.initElement(tmpCanvas);
            } // if

            // set the size of the canvas if specified
            tmpCanvas.width = width ? width : 0;
            tmpCanvas.height = height ? height : 0;
            
            return tmpCanvas;
        },
        
        time: function() {
            return new Date().getTime();
        },
        
        Vector: Vector, // Vector
        V: vectorTools,
        
        Dimensions: Dimensions, // Dimensions
        D: dimensionTools,
        
        Rect: Rect,
        R: rectTools
    };
    
    return module;
})();
(function() {
    var deviceConfigs = null,
        deviceCheckOrder = [],
        detectedConfig = null,
        urlBridgeTimeout = 0,
        queuedBridgeUrls = [],
        bridgeIgnoreMessages = ['view.wake', 'tile.loaded'];
        
    function processUrlBridgeNotifications() {
        while (queuedBridgeUrls.length > 0) {
            var notificationUrl = queuedBridgeUrls.shift();
            document.location = notificationUrl;
        } // while
        
        urlBridgeTimeout = 0;
    } // processUrlBridgeNotifications
    
    function shouldBridgeMessage(message) {
        var shouldBridge = true;
        for (var ii = bridgeIgnoreMessages.length; ii--; ) {
            shouldBridge = shouldBridge && (message != bridgeIgnoreMessages[ii]);
        } // for
        
        return shouldBridge;
    } // shouldBridgeMessage
    
    function messageToUrl(message, args) {
        var params = [];
        
        for (var key in args) {
            if (key) {
                params.push(key + "=" + escape(args[key]));
            }
        } // for
        
        return "tile5://" + message + "/" + (params.length > 0 ? "?" + params.join("&") : "");
    } // messageToUrl
        
    function bridgeNotifyLog(message, args) {
        if (shouldBridgeMessage(message)) {
            GT.Log.info("would push url: " + messageToUrl(message, args));
        } // if
    } // bridgeCommandEmpty
    
    function bridgeNotifyUrl(message, args) {
        if (shouldBridgeMessage(message)) {
            queuedBridgeUrls.push(messageToUrl(message, args));
        
            if (! urlBridgeTimeout) {
                urlBridgeTimeout = setTimeout(processUrlBridgeNotifications, 100);
            } // if
        } // if
    } // bridgeNotifyUrlScheme
    
    function loadDeviceConfigs() {
        deviceConfigs = {
            base: {
                name: "Unknown",
                eventTarget: document,
                supportsTouch: "createTouch" in document,
                imageCacheMaxSize: null, 
                getScaling: function() {
                    return 1;
                },
                maxImageLoads: null,
                requireFastDraw: false,
                bridgeNotify: bridgeNotifyLog,
                targetFps: null
            },
            
            ipod: {
                name: "iPod Touch",
                regex: /ipod/i,
                imageCacheMaxSize: 6 * 1024,
                maxImageLoads: 4,
                requireFastDraw: false,
                bridgeNotify: bridgeNotifyUrl,
                targetFps: 25
            },

            // TODO: can we detect the 3G ???
            iphone: {
                name: "iPhone",
                regex: /iphone/i,
                imageCacheMaxSize: 6 * 1024,
                maxImageLoads: 4,
                bridgeNotify: bridgeNotifyUrl
            },

            ipad: {
                name: "iPad",
                regex: /ipad/i,
                imageCacheMaxSize: 6 * 1024,
                bridgeNotify: bridgeNotifyUrl
            },

            android: {
                name: "Android OS <= 2.1",
                regex: /android/i,
                eventTarget: document.body,
                supportsTouch: true,
                getScaling: function() {
                    // TODO: need to detect what device dpi we have instructed the browser to use in the viewport tag
                    return 1 / window.devicePixelRatio;
                },
                bridgeNotify: bridgeNotifyUrl
            },
            
            froyo: {
                name: "Android OS >= 2.2",
                regex: /froyo/i,
                eventTarget: document.body,
                supportsTouch: true,
                bridgeNotify: bridgeNotifyUrl
            }
        };
        
        // initilaise the order in which we will check configurations
        deviceCheckOrder = [
            deviceConfigs.froyo,
            deviceConfigs.android,
            deviceConfigs.ipod,
            deviceConfigs.iphone,
            deviceConfigs.ipad
        ];
    } // loadDeviceConfigs
    
    T5.getConfig = function() {
        if (! deviceConfigs) {
            loadDeviceConfigs();
        } // if
        
        // if the device configuration hasn't already been detected do that now
        if (! detectedConfig) {
            GT.Log.info("ATTEMPTING TO DETECT PLATFORM: UserAgent = " + navigator.userAgent);

            // iterate through the platforms and run detection on the platform
            for (var ii = 0; ii < deviceCheckOrder.length; ii++) {
                var testPlatform = deviceCheckOrder[ii];

                if (testPlatform.regex && testPlatform.regex.test(navigator.userAgent)) {
                    detectedConfig = T5.ex({}, deviceConfigs.base, testPlatform);
                    GT.Log.info("PLATFORM DETECTED AS: " + detectedConfig.name);
                    break;
                } // if
            } // for

            if (! detectedConfig) {
                GT.Log.warn("UNABLE TO DETECT PLATFORM, REVERTING TO BASE CONFIGURATION");
                detectedConfig = deviceConfigs.base;
            }
            
            GT.Log.info("CURRENT DEVICE PIXEL RATIO = " + window.devicePixelRatio);
        } // if
        
        return detectedConfig;        
    }; // T5.getConfig
})();

T5.Dispatcher = (function() {
    // initialise variables
    var registeredActions = [];
    
    // initialise the module
    var module = {
        
        /* actions */
        
        execute: function(actionId) {
            // find the requested action
            var action = module.findAction(actionId);
            if (action) {
                action.execute.apply(action, Array.prototype.slice.call(arguments, 1));
            } // if
        },
        
        findAction: function(actionId) {
            for (var ii = registeredActions.length; ii--; ) {
                if (registeredActions[ii].id == actionId) {
                    return registeredActions[ii];
                } // if
            } // for
            
            return null;
        },
        
        getRegisteredActions: function() {
            return [].concat(registeredActions);
        },
        
        getRegisteredActionIds: function() {
            var actionIds = [];
            
            // get the action ids
            for (var ii = registeredActions.length; ii--; ) {
                registeredActions[ii].id ? actionIds.push(registeredActions[ii].id) : null;
            } // for
            
            return actionIds;
        },
        
        registerAction: function(action) {
            if (action && action.id) {
                registeredActions.push(action);
            } // if
        },
        
        Action: function(params) {
            // use default parameter when insufficient are provided
            params = T5.ex({
                autoRegister: true,
                id: '',
                title: '',
                icon: '',
                execute: null
            }, params);
            
            // initialise self
            var self = {
                id: params.id,
                
                execute: function() {
                    if (params.execute) {
                        params.execute.apply(this, arguments);
                    } // if
                },
                
                getParam: function(paramId) {
                    return params[paramId] ? params[paramId] : "";
                },
                
                toString: function() {
                    return GT.formatStr("{0} [title = {1}, icon = {2}]", self.id, params.title, params.icon);
                }
            };
            
            // if the action has been set to auto register, then add it to the registry
            if (params.autoRegister) {
                module.registerAction(self);
            } // if
            
            return self;
        },
        
        /* agents */
        
        Agent: function(params) {
            params = GT.extend({
                name: "Untitled",
                translator: null,
                execute: null
            }, params);
            
            // define the wrapper for the agent
            var self = {
                getName: function() {
                    return params.name;
                },
                
                getParam: function(key) {
                    return params[key];
                },
                
                getId: function() {
                    return GT.toID(self.getName());
                },
                
                run: function(args, callback) {
                    if (params.execute) {
                        // save the run instance ticks to a local variable so we can check it in the callback
                        // SEARCH ARGS changed
                        var searchArgs = params.translator ? params.translator(args) : args;
                        
                        // execute the agent
                        params.execute.call(self, searchArgs, function(data, agentParams) {
                            if (callback) {
                                callback(data, agentParams, searchArgs);
                            } // if
                        });
                    } // if
                } // run
            };
            
            return self;
        },
        
        runAgents: function(agents, args, callback) {
            // iterate through the agents and run them
            for (var ii = 0; ii < agents.length; ii++) {
                agents[ii].run(args, callback);
            } // for
        }
    };
    
    return module;
})();

T5.Resources = (function() {
    var basePath = "",
        cachedSnippets = {},
        cachedResources = {};
        
    var module = {
        getPath: function(path) {
            // if the path is an absolute url, then just return that
            if (/^(file|https?|\/)/.test(path)) {
                return path;
            }
            // otherwise prepend the base path
            else {
                return basePath + path;
            } // if..else
        },
        
        setBasePath: function(path) {
            basePath = path;
        },

        loadResource: function(params) {
            // extend parameters with defaults
            params = T5.ex({
                filename: "",
                cacheable: true,
                dataType: null,
                callback: null
            }, params);
            
            var callback = function(data) {
                if (params.callback) {
                    GT.Log.watch("CALLING RESOURCE CALLBACK", function() {
                        params.callback(data);
                    });
                } // if
            };
            
            if (params.cacheable && cachedResources[params.filename]) {
                callback(cachedResources[params.filename]); 
            }
            else {
                GT.xhr({
                    url: module.getPath(params.filename),
                    dataType: params.dataType,
                    success: function(data) {
                        // GT.Log.info("got data: " + data);
                        // add the snippet to the cache
                        if (params.cacheable) {
                            cachedResources[params.filename] = data;
                        }
                        
                        // trigger the callback
                        callback(data);
                    },
                    error: function(raw_request, textStatus, error_thrown) {
                        GT.Log.error("error loading resource [" + params.filename + "], error = " + error_thrown);
                    }
                });
            } // if..else
        },
        
        loadSnippet: function(snippetPath, callback) {
            // if the snippet path does not an extension, add the default
            if (! (/\.\w+$/).test(snippetPath)) {
                snippetPath += ".html";
            } // if
            
            module.loadResource({
                filename: "snippets/" + snippetPath,
                callback: callback,
                dataType: "html"
            });
        }
    };
    
    return module;
})();

T5.Images = (function() {
    // initialise image loader internal variables
    var images = {},
        loadWatchers = {},
        imageCounter = 0,
        queuedImages = [],
        loadingImages = [],
        cachedImages = [],
        interceptors = [],
        imageCacheFullness = 0,
        clearingCache = false;
        
    function postProcess(imageData) {
        if (! imageData.image) { return; }
        
        var width = imageData.realSize ? imageData.realSize.width : image.width,
            height = imageData.realSize ? imageData.realSize.height : image.height,
            canvas = T5.newCanvas(width, height),
            context = canvas.getContext('2d'),
            offset = imageData.offset ? imageData.offset : new T5.Vector();
            
        if (imageData.background) {
            context.drawImage(imageData.background, 0, 0);
        } // if
        
        context.drawImage(imageData.image, offset.x, offset.y);
        
        if (imageData.postProcess) {
            imageData.postProcess(context, imageData);
        }
        // update the image data image
        imageData.image = canvas;
    } // applyBackground
        
    function handleImageLoad() {
        // get the image data
        var imageData = loadWatchers[this.id];
        if (imageData && imageData.image.complete && (imageData.image.width > 0)) {
            imageData.loaded = true;
            // TODO: check the image width to ensure the image is loaded properly
            imageData.hitCount = 1;
            
            // remove the image data from the loading images array
            for (var ii = loadingImages.length; ii--; ) {
                if (loadingImages[ii].image.src == this.src) {
                    loadingImages.splice(ii, 1);
                    break;
                } // if
            } // for
            
            // if we have an image background, or overlay then apply
            if (imageData.background || imageData.postProcess) {
                postProcess(imageData);
            } // if
            
            // if the image data has a callback, fire it
            if (imageData.loadCallback) {
                imageData.loadCallback(this, false);
            } // if
            
            // add the image to the cached images
            cachedImages.push({
                url: this.src,
                created: imageData.requested
            });
            
            // remove the item from the load watchers
            delete loadWatchers[this.id];
            
            // load the next image
            loadNextImage();
        } // if
    } // handleImageLoad
    
    function loadNextImage() {
        var maxImageLoads = T5.getConfig().maxImageLoads;

        // if we have queued images and a loading slot available, then start a load operation
        while ((queuedImages.length > 0) && ((! maxImageLoads) || (loadingImages.length < maxImageLoads))) {
            var imageData = queuedImages.shift();
            
            if (imageData.imageLoader) {
                // add the image data to the loading images
                loadingImages.push(imageData);
                
                // run the image loader
                imageData.imageLoader(imageData, handleImageLoad);
            } // if
        } // if
    } // loadNextImage
    
    function getImageLoader(url) {
        var loaderFn = null;
        
        // iterate through the interceptors and see if any of them want it
        for (var ii = interceptors.length; ii-- && (! loaderFn); ) {
            loaderFn = interceptors[ii](url);
        } // for
        
        // if one of the interceptors provided an image loader, then use that otherwise provide the default
        return loaderFn ? loaderFn : function(imageData, onLoadCallback) {
            // reset the queued flag and attempt to load the image
            imageData.image.onload = onLoadCallback;
            imageData.image.src = T5.Resources.getPath(imageData.url);
            imageData.requested = T5.time();
        };
    } // getImageLoader
    
    function cleanupImageCache() {
        clearingCache = true;
        try {
            var halfLen = Math.floor(cachedImages.length / 2);
            if (halfLen > 0) {
                // TODO: make this more selective... currently some images on screen may be removed :/
                cachedImages.sort(function(itemA, itemB) {
                    return itemA.created - itemB.created;
                });

                // remove the cached image data
                for (var ii = halfLen; ii--; ) {
                    delete images[cachedImages[ii].url];
                } // for

                // now remove the images from the cached images
                cachedImages.splice(0, halfLen);
            } // if
        }
        finally {
            clearingCache = false;
        } // try..finally
        
        GT.say("imagecache.cleared");
    } // cleanupImageCache

    function checkTimeoutsAndCache() {
        var currentTickCount = T5.time(),
            timedOutLoad = false, ii = 0,
            config = T5.getConfig();
        
        // iterate through the loading images, and check if any of them have been active too long
        while (ii < loadingImages.length) {
            var loadingTime = currentTickCount - loadingImages[ii].requested;
            if (loadingTime > (module.loadTimeout * 1000)) {
                loadingImages.splice(ii, 1);
                timedOutLoad = true;
            }
            else {
                ii++;
            } // if..else
        } // while
        
        // if we timeout some images, then load next images
        if (timedOutLoad) {
            loadNextImage();
        } // if
        
        // if we have a configuration and an image cache max size, then ensure we haven't exceeded it
        if (config && config.imageCacheMaxSize) {
            imageCacheFullness = (cachedImages.length * module.avgImageSize) / config.imageCacheMaxSize;
            if (imageCacheFullness >= 1) {
                cleanupImageCache();
            } // if
        } // if
    } // checkTimeoutsAndCache
    
    function getImage(url) {
        var imageData = null,
            image = null;
            
        if (! clearingCache) {
            imageData = images[url];
        } // if

        // return the image from the image data
        image = imageData ? imageData.image : null;
        
        if (image && (image.getContext || (image.complete && (image.width > 0)))) {
            return image;
        } // if
    } // getImage
    
    function loadImage(url, callback, loadArgs) {
        // look for the image data
        var imageData = images[url];

        // if the image data is not defined, then create new image data
        if (! imageData) {
            // initialise the image data
            imageData = T5.ex({
                url: url,
                image: new Image(),
                loaded: false,
                imageLoader: getImageLoader(url),
                created: T5.time(),
                requested: null,
                hitCount: 0,
                loadCallback: callback
            }, loadArgs);
            
            // GT.Log.info("loading image, image args = ", loadArgs);
            
            // initialise the image id
            imageData.image.id = "resourceLoaderImage" + (imageCounter++);
            
            // add the image to the images lookup
            images[url] = imageData;
            loadWatchers[imageData.image.id] = imageData;
            
            // add the image to the queued images
            queuedImages.push(imageData);
            
            // trigger the next load event
            loadNextImage();
        }
        else {
            imageData.hitCount++;
            if (imageData.image.complete && callback) {
                callback(imageData.image, true);
            } // if
        }
        
        return imageData;
    } // loadImage
    
    var module = {
        avgImageSize: 25,
        loadTimeout: 10,
        
        addInterceptor: function(callback) {
            interceptors.push(callback);
        },
        
        cancelLoad: function() {
            loadingImages = [];
        },
        
        get: getImage,
        load: loadImage,
        
        stats: function() {
            return {
                imageLoadingCount: loadingImages.length,
                queuedImageCount: queuedImages.length,
                imageCacheFullness: imageCacheFullness
            };
        }
    }; // 
    
    setInterval(checkTimeoutsAndCache, 1000);
    
    return module;
})();
(function() {
    // initialise constants
    var WHEEL_DELTA_STEP = 120,
        DEFAULT_INERTIA_MAX = 500,
        INERTIA_TIMEOUT_MOUSE = 100,
        INERTIA_TIMEOUT_TOUCH = 250,
        THRESHOLD_DOUBLETAP = 300,
        THRESHOLD_PINCHZOOM = 5,
        THRESHOLD_PAN_EVENT = 2;
        
    // define the touch modes
    var TOUCH_MODE_TAP = 0,
        TOUCH_MODE_MOVE = 1,
        TOUCH_MODE_PINCH = 2;

    // TODO: configure the move distance to be screen size sensitive....
    var MIN_MOVEDIST = 7;

    var elementCounter = 0,
        listenerCount = 0,
        createVector = T5.V.create,
        vectorDistance = T5.V.distance,
        vectorDiff = T5.V.diff;
    
    function calcDistance(touches) {
        return vectorDistance(touches);
    } // calcDistance
    
    function calcChange(first, second) {
        var srcVector = (first && (first.length > 0)) ? first[0] : null;
        if (srcVector && second && (second.length > 0)) {
            return vectorDiff(srcVector, second[0]);
        } // if
        
        return null;
    } // calcChange
    
    function preventDefaultTouch(evt) {
        evt.preventDefault();
        evt.stopPropagation();
    } // preventDefaultTouch
    
    function getTouchPoints(touches) {
        var fnresult = new Array(touches.length);
        for (var ii = touches.length; ii--; ) {
            fnresult[ii] = createVector(touches[ii].pageX, touches[ii].pageY);
        } // for
        
        return fnresult;
    } // getTouchPoints
    
    function getMousePos(evt) {
        return [createVector(evt.pageX, evt.pageY)];
    } // getMousePos
    
    function debugTouchEvent(evt, title) {
        GT.Log.info("TOUCH EVENT '" + title + "':", evt);
        GT.Log.info("TOUCH EVENT '" + title + "': touches = ", evt.touches);
        GT.Log.info("TOUCH EVENT '" + title + "': targetTouches = ", evt.targetTouches);
        GT.Log.info("TOUCH EVENT '" + title + "': changedTouches = ", evt.changeTouches);
    } // debugTouchEvent
    
    /* touch helper */
    
    var TouchHelper =  function(params) {
        params = T5.ex({
            element: null,
            observable: null,
            inertiaTrigger: 20,
            maxDistDoubleTap: 20,
            touchStartHandler: null,
            moveHandler: null,
            moveEndHandler: null,
            pinchZoomHandler: null,
            pinchZoomEndHandler: null,
            tapHandler: null,
            doubleTapHandler: null,
            wheelZoomHandler: null
        }, params);

        /*
        // determine whether touch is supported
        // nice work to thomas fuchs on this:
        // http://mir.aculo.us/2010/06/04/making-an-ipad-html5-app-making-it-really-fast/
        var touchReady = 'createTouch' in document;
        */

        // initialise private members
        var doubleTap = false,
            tapTimer = 0,
            config = T5.getConfig(),
            supportsTouch = T5.getConfig().supportsTouch,
            touchesStart = null,
            touchesLast = null,
            touchDelta = null,
            totalDelta = null,
            panDelta = createVector(),
            touchMode = null,
            touchDown = false,
            touchStartTick = 0,
            listeners = [],
            lastXY = null,
            inertiaSettings = null,
            ticksCurrent = 0,
            ticksLast = 0,
            targetElement = params.element,
            observable = params.observable,
            BENCHMARK_INTERVAL = 300;
            
        function calculateInertia(upXY, currentXY, distance, tickDiff) {
            var theta = Math.asin((upXY.y - currentXY.y) / distance),
                // TODO: remove the magic numbers from here (pass through animation time from view, and determine max from dimensions)
                extraDistance = Math.min(Math.floor(distance * (inertiaSettings.duration / tickDiff)), inertiaSettings.max),
                distanceVector;
                
            theta = currentXY.x > upXY.x ? theta : Math.PI - theta;
            distanceVector = createVector(Math.cos(theta) * -extraDistance, Math.sin(theta) * extraDistance);
                
            triggerEvent("inertiaPan", distanceVector.x, distanceVector.y);
        } // calculateInertia
        
        function checkInertia(upXY, currentTick) {
            var tickDiff, distance;
            
            if (! supportsTouch) {
                lastXY = upXY;
                
                var checkInertiaInterval = setInterval(function() {
                    tickDiff = (T5.time()) - currentTick;
                    distance = vectorDistance([upXY, lastXY]);

                    // calculate the inertia
                    if ((tickDiff < INERTIA_TIMEOUT_MOUSE) && (distance > params.inertiaTrigger)) {
                        clearInterval(checkInertiaInterval);
                        calculateInertia(upXY, lastXY, distance, tickDiff);
                    }
                    else if (tickDiff > INERTIA_TIMEOUT_MOUSE) {
                        clearInterval(checkInertiaInterval);
                    } // if..else
                }, 5);
            }
            else {
                tickDiff = currentTick - touchStartTick;
                
                if ((tickDiff < INERTIA_TIMEOUT_TOUCH)) {
                    distance = vectorDistance([touchesStart[0], upXY]);
                    
                    if (distance > params.inertiaTrigger) {
                        calculateInertia(touchesStart[0], upXY, distance, tickDiff);
                    } // if
                } // if
            } // if..else                
        } // checkInertia
            
        function relativeTouches(touches) {
            var fnresult = [],
                offsetX = targetElement ? -targetElement.offsetLeft : 0,
                offsetY = targetElement ? -targetElement.offsetTop : 0;
            
            // apply the offset
            for (var ii = touches.length; ii--; ) {
                fnresult.push(T5.V.offset(touches[ii], offsetX, offsetY));
            } // for
            
            return fnresult;
        } // relativeTouches
        
        function triggerEvent() {
            if (observable) {
                observable.trigger.apply(null, arguments);
            } // if
        } // triggerEvent
        
        function triggerPositionEvent(eventName, absVector) {
            var offsetVector = null;
            
            // if an element is defined, then determine the element offset
            if (targetElement) {
                offsetVector = T5.V.offset(absVector, -targetElement.offsetLeft, -targetElement.offsetTop);
            } // if
            
            // fire the event
            triggerEvent(eventName, absVector, offsetVector);
        } // triggerPositionEvent

        function touchStart(evt) {
            if (evt.target && (evt.target === targetElement)) {
                touchesStart = supportsTouch ? getTouchPoints(evt.touches) : getMousePos(evt);
                touchDelta = createVector();
                totalDelta = createVector();
                touchDown = true;
                doubleTap = false;
                touchStartTick = T5.time();

                // cancel event propogation
                preventDefaultTouch(evt);
                evt.target.style.cursor = 'move';

                // trigger the inertia cancel event
                triggerEvent("inertiaCancel");

                // log the current touch start time
                ticksCurrent = touchStartTick;
        
                // fire the touch start event handler
                var touchVector = touchesStart.length > 0 ? touchesStart[0] : null;
        
                // if we don't have a touch vector, then log a warning, and exit
                if (! touchVector) {
                    GT.Log.warn("Touch start fired, but no touch vector found");
                    return;
                } // if
        
                // fire the touch start handler
                triggerEvent("touchStart", touchVector.x, touchVector.y);
        
                // check to see whether this is a double tap (if we are watching for them)
                if (ticksCurrent - ticksLast < THRESHOLD_DOUBLETAP) {
                    // calculate the difference between this and the last touch point
                    var touchChange = touchesLast ? T5.V.diff(touchesStart[0], touchesLast[0]) : null;
                    if (touchChange && (Math.abs(touchChange.x) < params.maxDistDoubleTap) && (Math.abs(touchChange.y) < params.maxDistDoubleTap)) {
                        doubleTap = true;
                    } // if
                } // if

                // reset the touch mode to unknown
                touchMode = TOUCH_MODE_TAP;
        
                // update the last touches
                touchesLast = [].concat(touchesStart);
            } // if
        } // touchStart
        
        function touchMove(evt) {
            if (evt.target && (evt.target === targetElement)) {
                lastXY = (supportsTouch ? getTouchPoints(evt.touches) : getMousePos(evt))[0];
                
                if (! touchDown) { return; }

                // cancel event propogation
                if (supportsTouch) {
                    preventDefaultTouch(evt);
                } // if

                // get the current touches
                var touchesCurrent = supportsTouch ? getTouchPoints(evt.touches) : getMousePos(evt),
                    zoomDistance = 0;

                // check to see if we are pinching or zooming
                if (touchesCurrent.length > 1) {
                    // if the start touches does have two touch points, then reset to the current
                    if (touchesStart.length === 1) {
                        touchesStart = [].concat(touchesCurrent);
                    } // if

                    zoomDistance = calcDistance(touchesStart) - calcDistance(touchesCurrent);
                } // if

                // if the touch mode is tap, then check to see if we have gone beyond a move threshhold
                if (touchMode === TOUCH_MODE_TAP) {
                    // get the delta between the first touch and the current touch
                    var tapDelta = calcChange(touchesCurrent, touchesStart);

                    // if the delta.x or delta.y is greater than the move threshhold, we are no longer moving
                    if (tapDelta && ((Math.abs(tapDelta.x) >= MIN_MOVEDIST) || (Math.abs(tapDelta.y) >= MIN_MOVEDIST))) {
                        touchMode = TOUCH_MODE_MOVE;
                    } // if
                } // if


                // if we aren't in tap mode, then let's see what we should do
                if (touchMode !== TOUCH_MODE_TAP) {
                    // TODO: queue touch count history to enable an informed decision on touch end whether
                    // a single or multitouch event is completing...

                    // if we aren't pinching or zooming then do the move 
                    if ((! zoomDistance) || (Math.abs(zoomDistance) < THRESHOLD_PINCHZOOM)) {
                        // calculate the pan delta
                        touchDelta = calcChange(touchesCurrent, touchesLast);

                        // update the total delta
                        if (touchDelta) {
                            totalDelta.x -= touchDelta.x; totalDelta.y -= touchDelta.y;
                            panDelta.x -= touchDelta.x; panDelta.y -= touchDelta.y;
                        } // if

                        // if the pan_delta is sufficient to fire an event, then do so
                        if (T5.V.absSize(panDelta) > THRESHOLD_PAN_EVENT) {
                            triggerEvent("pan", panDelta.x, panDelta.y);
                            panDelta = createVector();
                        } // if

                        // set the touch mode to move
                        touchMode = TOUCH_MODE_MOVE;
                    }
                    else {
                        triggerEvent('pinchZoom', relativeTouches(touchesStart), relativeTouches(touchesCurrent));

                        // set the touch mode to pinch zoom
                        touchMode = TOUCH_MODE_PINCH;
                    } // if..else
                } // if..else

                touchesLast = [].concat(touchesCurrent);                        
            } // if
        } // touchMove
        
        function touchEnd(evt) {
            if (evt.target && (evt.target === targetElement)) {
                var touchUpXY = (supportsTouch ? getTouchPoints(evt.changedTouches) : getMousePos(evt))[0];
                
                // cancel event propogation
                if (supportsTouch) {
                    preventDefaultTouch(evt);
                } // if

                // get the end tick
                var endTick = T5.time();

                // save the current ticks to the last ticks
                ticksLast = ticksCurrent;

                // if tapping, then first the tap event
                if (touchMode === TOUCH_MODE_TAP) {
                    // start the timer to fire the tap handler, if 
                    if (! tapTimer) {
                        tapTimer = setTimeout(function() {
                            // reset the timer 
                            tapTimer = 0;

                            // fire the appropriate tap event
                            triggerPositionEvent(doubleTap ? 'doubleTap' : 'tap', touchesStart[0]);
                        }, THRESHOLD_DOUBLETAP + 50);
                    }
                }
                // if moving, then fire the move end
                else if (touchMode == TOUCH_MODE_MOVE) {
                    triggerEvent("panEnd", totalDelta.x, totalDelta.y);
                    
                    if (inertiaSettings) {
                        checkInertia(touchUpXY, endTick);
                    } // if
                }
                // if pinchzooming, then fire the pinch zoom end
                else if (touchMode == TOUCH_MODE_PINCH) {
                    triggerEvent('pinchZoomEnd', relativeTouches(touchesStart), relativeTouches(touchesLast), endTick - touchStartTick);
                } // if..else
                
                evt.target.style.cursor = 'default';
                touchDown = false;
            } // if
        } // touchEnd
        
        function getWheelDelta(evt) {
            // process ff DOMMouseScroll event
            if (evt.detail) {
                var delta = -evt.detail * WHEEL_DELTA_STEP;
                return createVector(evt.axis === 1 ? delta : 0, evt.axis === 2 ? delta : 0);
            }
            else {
                return createVector(evt.wheelDeltaX, evt.wheelDeltaY);
            } // if..else
        } // getWheelDelta
        
        function wheelie(evt) {
            if (evt.target && (evt.target === targetElement)) {
                var delta = getWheelDelta(evt), 
                    zoomAmount = delta.y !== 0 ? Math.abs(delta.y / WHEEL_DELTA_STEP) : 0;

                if (lastXY && (zoomAmount !== 0)) {
                    // apply the offset to the xy
                    var xy = T5.V.offset(lastXY, -targetElement.offsetLeft, -targetElement.offsetTop);
                    triggerEvent("wheelZoom", xy, Math.pow(2, delta.y > 0 ? zoomAmount : -zoomAmount));
                } // if
                
                evt.preventDefault();
            } // if
        } // wheelie

        // initialise self
        var self = {
            supportsTouch: supportsTouch,

            /* define methods */
            
            addListeners: function(args) {
                listeners.push(args);
            },
            
            decoupleListeners: function(listenerId) {
                // iterate through the listeners and look for the matching listener id
                for (var ii = 0; listenerId && (ii < listeners.length); ii++) {
                    if (listeners[ii].listenerId === listenerId) {
                        listeners.splice(ii, 1);

                        break;
                    } // if
                } // for
            },
            
            release: function() {
                config.eventTarget.removeEventListener(supportsTouch ? 'touchstart' : 'mousedown', touchStart, false);
                config.eventTarget.removeEventListener(supportsTouch ? 'touchmove' : 'mousemove', touchMove, false);
                config.eventTarget.removeEventListener(supportsTouch ? 'touchend' : 'mouseup', touchEnd, false);
                
                // handle mouse wheel events by
                if (! supportsTouch) {
                    window.removeEventListener("mousewheel", wheelie, false);
                    window.removeEventListener("DOMMouseScroll", wheelie, false);
                } // if
            },

            inertiaEnable: function(animationTime, dimensions) {
                inertiaSettings = {
                    duration: animationTime,
                    max: dimensions ? Math.min(dimensions.width, dimensions.height) : DEFAULT_INERTIA_MAX
                };
            },
            
            inertiaDisable: function() {
                inertiaSettings = null;
            }
        };
        
        // wire up the events
        config.eventTarget.addEventListener(supportsTouch ? 'touchstart' : 'mousedown', touchStart, false);
        config.eventTarget.addEventListener(supportsTouch ? 'touchmove' : 'mousemove', touchMove, false);
        config.eventTarget.addEventListener(supportsTouch ? 'touchend' : 'mouseup', touchEnd, false);
        
        // handle mouse wheel events by
        if (! supportsTouch) {
            window.addEventListener("mousewheel", wheelie, false);
            window.addEventListener("DOMMouseScroll", wheelie, false);
        } // if

        return self;
    }; // TouchHelper
    
    // initialise touch helpers array
    var touchHelpers = [];
    
    T5.captureTouch = function(element, params) {
        if (! element) {
            throw new Error("Unable to capture touch of null element");
        } // if
        
        // if the element does not have an id, then generate on
        if (! element.id) {
            element.id = "touchable_" + elementCounter++;
        } // if
    
        // create the touch helper
        var touchHelper = touchHelpers[element.id];
        
        // if the touch helper has not been created, then create it and attach to events
        if (! touchHelper) {
            touchHelper = new TouchHelper(T5.ex({ element: element}, params));
            touchHelpers[element.id] = touchHelper;
        } // if
        
        // if we already have an association with listeners, then remove first
        if (params.listenerId) {
            touchHelper.decoupleListeners(params.listenerId);
        } // if
        
        // flag the parameters with touch listener ids so they can be removed later
        params.listenerId = (++listenerCount);

        // add the listeners to the helper
        touchHelper.addListeners(params);
        
        return touchHelper;
    }; // T5.captureTouch
    
    T5.resetTouch = function(element) {
        if (element && element.id && touchHelpers[element.id]) {
            touchHelpers[element.id].release();
            delete touchHelpers[element.id];
        } // if
    }; // T5.resetTouch
})();
/**
Easing functions

sourced from Robert Penner's excellent work:
http://www.robertpenner.com/easing/

Functions follow the function format of fn(t, b, c, d, s) where:
- t = time
- b = beginning position
- c = change
- d = duration
*/
(function() {
    // define some constants
    var TWO_PI = Math.PI * 2,
        HALF_PI = Math.PI / 2;
        
    // define some function references
    var abs = Math.abs,
        pow = Math.pow,
        sin = Math.sin,
        asin = Math.asin,
        cos = Math.cos;
    
    var s = 1.70158;
    
    function simpleTypeName(typeName) {
        return typeName.replace(/[\-\_\s\.]/g, '').toLowerCase();
    } // simpleTypeName
    
    var easingFns = {
        linear: function(t, b, c, d) {
            return c*t/d + b;
        },
        
        /* back easing functions */
        
        backin: function(t, b, c, d) {
            return c*(t/=d)*t*((s+1)*t - s) + b;
        },
            
        backout: function(t, b, c, d) {
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        },
            
        backinout: function(t, b, c, d) {
            return ((t/=d/2)<1) ? c/2*(t*t*(((s*=(1.525))+1)*t-s))+b : c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b;
        }, 
        
        /* bounce easing functions */
        
        bouncein: function(t, b, c, d) {
            return c - easingFns.bounceout(d-t, 0, c, d) + b;
        },
        
        bounceout: function(t, b, c, d) {
            if ((t/=d) < (1/2.75)) {
                return c*(7.5625*t*t) + b;
            } else if (t < (2/2.75)) {
                return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
            } else if (t < (2.5/2.75)) {
                return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
            } else {
                return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
            }
        },
            
        bounceinout: function(t, b, c, d) {
            if (t < d/2) return easingFns.bouncein(t*2, 0, c, d) / 2 + b;
            else return easingFns.bounceout(t*2-d, 0, c, d) / 2 + c/2 + b;
        },
        
        /* cubic easing functions */
        
        cubicin: function(t, b, c, d) {
            return c*(t/=d)*t*t + b;
        },
            
        cubicout: function(t, b, c, d) {
            return c*((t=t/d-1)*t*t + 1) + b;
        },
        
        cubicinout: function(t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t + b;
            return c/2*((t-=2)*t*t + 2) + b;
        },
        
        /* elastic easing functions */
        
        elasticin: function(t, b, c, d, a, p) {
            var s;
            
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*0.3;
            if (!a || a < abs(c)) { a=c; s=p/4; }
            else s = p/TWO_PI * asin (c/a);
            return -(a*pow(2,10*(t-=1)) * sin( (t*d-s)*TWO_PI/p )) + b;
        },
        
        elasticout: function(t, b, c, d, a, p) {
            var s;
            
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*0.3;
            if (!a || a < abs(c)) { a=c; s=p/4; }
            else s = p/TWO_PI * asin (c/a);
            return (a*pow(2,-10*t) * sin( (t*d-s)*TWO_PI/p ) + c + b);
        },
        
        elasticinout: function(t, b, c, d, a, p) {
            var s;
            
            if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(0.3*1.5);
            if (!a || a < abs(c)) { a=c; s=p/4; }
            else s = p/TWO_PI * asin (c/a);
            if (t < 1) return -0.5*(a*pow(2,10*(t-=1)) * sin( (t*d-s)*TWO_PI/p )) + b;
            return a*pow(2,-10*(t-=1)) * sin( (t*d-s)*TWO_PI/p )*0.5 + c + b;
        },
        
        /* quad easing */
        
        quadin: function(t, b, c, d) {
            return c*(t/=d)*t + b;
        },
            
        quadout: function(t, b, c, d) {
            return -c *(t/=d)*(t-2) + b;
        },
        
        quadinout: function(t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t + b;
            return -c/2 * ((--t)*(t-2) - 1) + b;
        },
        
        /* sine easing */
        
        sinein: function(t, b, c, d) {
            return -c * cos(t/d * HALF_PI) + c + b;
        },
        
        sineout: function(t, b, c, d) {
            return c * sin(t/d * HALF_PI) + b;
        },
        
        sineinout: function(t, b, c, d) {
            return -c/2 * (cos(Math.PI*t/d) - 1) + b;
        }
    };
    
    T5.easing = function(typeName) {
        return easingFns[simpleTypeName(typeName)];
    }; // easing
    
    T5.registerEasingType = function(typeName, callback) {
        easingFns[simpleTypeName(typeName)] = callback;
    }; // setEasing
})();
T5.Tween = function(params) {
    params = T5.ex({
        target: null,
        property: null,
        startValue: 0,
        endValue: null,
        duration: 2000,
        tweenFn: T5.easing('sine.out'),
        complete: null,
        cancelOnInteract: false
    }, params);
    
    // get the start ticks
    var startTicks = T5.time(),
        updateListeners = [],
        complete = false,
        beginningValue = 0.0,
        change = 0;
        
    function notifyListeners(updatedValue, complete) {
        for (var ii = updateListeners.length; ii--; ) {
            updateListeners[ii](updatedValue, complete);
        } // for
    } // notifyListeners
        
    var self = {
        cancelOnInteract: params.cancelOnInteract,
        
        isComplete: function() {
            return complete;
        },
        
        triggerComplete: function(cancelled) {
            if (params.complete) {
                params.complete(cancelled);
            } // if
        },
        
        update: function(tickCount) {
            try {
                // calculate the updated value
                var elapsed = tickCount - startTicks,
                    updatedValue = params.tweenFn(
                                        elapsed, 
                                        beginningValue, 
                                        change, 
                                        params.duration);
            
                // update the property value
                if (params.target) {
                    params.target[params.property] = updatedValue;
                } // if
            
                // iterate through the update listeners 
                // and let them know the updated value
                notifyListeners(updatedValue);

                complete = startTicks + params.duration <= tickCount;
                if (complete) {
                    if (params.target) {
                        params.target[params.property] = params.tweenFn(params.duration, beginningValue, change, params.duration);
                    } // if
                
                    notifyListeners(updatedValue, true);
                } // if
            }
            catch (e) {
                GT.Log.exception(e);
            } // try..catch
        },
        
        requestUpdates: function(callback) {
            updateListeners.push(callback);
        }
    };
    
    // calculate the beginning value
    beginningValue = 
        (params.target && params.property && params.target[params.property]) ? params.target[params.property] : params.startValue;

    // calculate the change and beginning position
    if (typeof params.endValue !== 'undefined') {
        change = (params.endValue - beginningValue);
    } // if
    
    // if no change is required, then mark as complete 
    // so the update method will never be called
    if (change == 0) {
        complete = true;
    } // if..else
    
    // wake the tween timer
    T5.wakeTweens();
    
    return self;
}; 
(function() {
    // initialise variables
    var tweens = [],
        updating = false,
        tweenTimer = 0;
        
    function update(tickCount) {
        if (updating) { return tweens.length; }
        
        updating = true;
        try {
            // iterate through the active tweens and update each
            var ii = 0;
            while (ii < tweens.length) {
                if (tweens[ii].isComplete()) {
                    tweens[ii].triggerComplete(false);
                    tweens.splice(ii, 1);
                }
                else {
                    tweens[ii].update(tickCount);
                    ii++;
                } // if..else
            } // while
        }
        finally {
            updating = false;
        } // try..finally
        
        return tweens.length;
    } // update
    
    T5.tweenValue = function(startValue, endValue, fn, callback, duration) {
        // create a tween that doesn't operate on a property
        var fnresult = new T5.Tween({
            startValue: startValue,
            endValue: endValue,
            tweenFn: fn,
            complete: callback,
            duration: duration
        });
        
        // add the the list return the new tween
        tweens.push(fnresult);
        return fnresult;
    }; // T5.tweenValue
    
    T5.tween = function(target, property, targetValue, fn, callback, duration) {
        var fnresult = new T5.Tween({
            target: target,
            property: property,
            endValue: targetValue,
            tweenFn: fn,
            duration: duration,
            complete: callback
        });
        
        // return the new tween
        tweens.push(fnresult);
        return fnresult;
    }; // T5.tween
    
    T5.tweenVector = function(target, dstX, dstY, fn, callback, duration) {
        var fnresult = [];
        
        if (target) {
            var xDone = target.x == dstX;
            var yDone = target.y == dstY;
            
            if (! xDone) {
                fnresult.push(T5.tween(target, "x", dstX, fn, function() {
                    xDone = true;
                    if (xDone && yDone) { callback(); }
                }, duration));
            } // if
            
            if (! yDone) {
                fnresult.push(T5.tween(target, "y", dstY, fn, function() {
                    yDone = true;
                    if (xDone && yDone) { callback(); }
                }, duration));
            } // if
        } // if
        
        return fnresult;
    }; // T5.tweenVector
    
    T5.cancelAnimation = function(checkCallback) {
        if (updating) { return ; }
        
        updating = true;
        try {
            var ii = 0;

            // trigger the complete for the tween marking it as cancelled
            while (ii < tweens.length) {
                if ((! checkCallback) || checkCallback(tweens[ii])) {
                    tweens[ii].triggerComplete(true);
                    tweens.splice(ii, 1);
                }
                else {
                    ii++;
                } // if..else
            } // for
        }
        finally {
            updating = false;
        } // try..finally
    }; // T5.cancelAnimation
    
    T5.isTweening = function() {
        return tweens.length > 0;
    }; // T5.isTweening

    T5.wakeTweens = function() {
        if (tweenTimer !== 0) { return; }
        
        tweenTimer = setInterval(function() {
            if (update(T5.time()) === 0) {
                clearInterval(tweenTimer);
                tweenTimer = 0;
            } // if
        }, 20);
    };
})();(function() {
    var viewStates = {
        NONE: 0,
        ACTIVE: 1,
        ANIMATING: 4,
        PAN: 8,
        PINCH: 16,
        FREEZE: 128
    };
    
    T5.viewState = function() {
        var result = 0;
        
        for (var ii = arguments.length; ii--; ) {
            var value = viewStates[arguments[ii].toUpperCase()];
            if (value) {
                result = result | value;
            } // if
        } // for
        
        return result;
    }; // T5.viewState
})();
T5.ViewLayer = function(params) {
    params = T5.ex({
        id: "",
        zindex: 0,
        supportFastDraw: false,
        validStates: T5.viewState("ACTIVE", "ANIMATING", "PAN", "PINCH")
    }, params);
    
    var parent = null,
        id = params.id,
        activeState = T5.viewState("ACTIVE");
    
    var self = T5.ex({
        addToView: function(view) {
            view.setLayer(id, self);
        },
        
        shouldDraw: function(displayState) {
            var stateValid = (displayState & params.validStates) !== 0,
                fastDraw = parent ? (parent.fastDraw && (displayState !== activeState)) : false;

            return stateValid && (fastDraw ? params.supportFastDraw : true);
        },
        
        cycle: function(tickCount, offset, state) {
            return 0;
        },
        
        draw: function(context, offset, dimensions, state, view) {
        },
        
        /**
        The remove method enables a view to flag that it is ready or should be removed
        from any views that it is contained in.  This was introduced specifically for
        animation layers that should only exist as long as an animation is active.
        */
        remove: function() {
            GT.say("layer.remove", { id: id });
        },
        
        wakeParent: function() {
            if (parent) {
                parent.trigger("wake");
            } // if
        },
        
        getId: function() {
            return id;
        },
        
        setId: function(value) {
            id = value;
        },

        getParent: function() {
            return parent;
        },
        
        setParent: function(view) {
            parent = view;
        }
    }, params); // self
    
    GT.observable(self);
    
    return self;
}; // T5.ViewLayer
/**
T5.View
=======

The Tile5 View is the fundamental building block for tiling and 
mapping interface.  Which this class does not implement any of 
the logic required for tiling, it does handle the redraw logic.  
Applications implementing Tile5 maps will not need to be aware of 
the implementation specifics of the View, but for those interested 
in building extensions or customizations should definitely take a look.  
Additionally, it is worth being familiar with the core methods that 
are implemented here around the layering as these are used extensively 
when creating overlays and the like for the map implementations.
*/
T5.View = function(params) {
    // initialise defaults
    params = T5.ex({
        id: GT.objId('view'),
        container: "",
        fastDraw: false,
        inertia: true,
        pannable: true,
        scalable: true,
        panAnimationEasing: T5.easing('sine.out'),
        panAnimationDuration: 750,
        pinchZoomAnimateTrigger: 400,
        adjustScaleFactor: null,
        autoSize: false
    }, params);
    
    // get the container context
    var layers = [],
        canvas = document.getElementById(params.container),
        mainContext = null,
        offset = new T5.Vector(),
        clearBackground = false,
        frozen = false,
        deviceScaling = 1,
        dimensions = null,
        wakeTriggers = 0,
        endCenter = null,
        idle = false,
        panimating = false,
        paintTimeout = 0,
        repaint = false,
        idleTimeout = 0,
        rescaleTimeout = 0,
        zoomCenter = null,
        tickCount = 0,
        scaling = false,
        startRect = null,
        endRect = null,
        scaleFactor = 1,
        lastDrawScaleFactor = 1,
        aniProgress = null,
        tweenStart = null,
        startCenter = null,
        touchHelper = null,
        
        /* state shortcuts */
        
        stateActive = T5.viewState('ACTIVE'),
        statePan = T5.viewState('PAN'),
        statePinch = T5.viewState('PINCH'),
        
        state = stateActive;
        
    // some function references for speed
    var vectorRect = T5.V.getRect,
        dimensionsSize = T5.D.getSize,
        rectCenter = T5.R.getCenter;
        
    /* panning functions */
    
    function pan(x, y, tweenFn, tweenDuration) {
        // update the offset by the specified amount
        panimating = typeof(tweenFn) !== "undefined";

        state = statePan;
        wake();
        self.updateOffset(offset.x + x, offset.y + y, tweenFn, tweenDuration);
    } // pan
    
    function panInertia(x, y) {
        if (params.inertia) {
            pan(x, y, params.panAnimationEasing, params.panAnimationDuration);
        } // if
    } // panIntertia
    
    function panEnd(x, y) {
        state = stateActive;
        panimating = false;
        setTimeout(wake, 50);
    } // panEnd
    
    /* scaling functions */
    
    function resetZoom() {
        scaleFactor = 1;
    } // resetZoom
    
    function checkTouches(start, end) {
        startRect = vectorRect(start);
        endRect = vectorRect(end);

        // get the sizes of the rects
        var startSize = dimensionsSize(startRect.dimensions),
            endSize = dimensionsSize(endRect.dimensions);

        // update the zoom center
        startCenter = rectCenter(startRect);
        endCenter = rectCenter(endRect);

        // determine the ratio between the start rect and the end rect
        scaleFactor = (startRect && (startSize !== 0)) ? (endSize / startSize) : 1;
    } // checkTouches            
    
    function pinchZoom(touchesStart, touchesCurrent) {
        checkTouches(touchesStart, touchesCurrent);
        scaling = scaleFactor !== 1;
        
        if (scaling) {
            state = statePinch;
            wake();
        } // if
    } // pinchZoom
    
    function pinchZoomEnd(touchesStart, touchesEnd, pinchZoomTime) {
        checkTouches(touchesStart, touchesEnd);
        
        if (params.adjustScaleFactor) {
            scaleFactor = params.adjustScaleFactor(scaleFactor);
            GT.Log.info("scale factor adjusted to: " + scaleFactor);
        } // if

        if (pinchZoomTime < params.pinchZoomAnimateTrigger) {
            // TODO: move this to the map to override
            animateZoom(
                lastDrawScaleFactor, 
                scaleFactor, 
                startCenter, 
                calcPinchZoomCenter(), 
                // TODO: make the animation configurable
                T5.easing('sine.out'),
                function() {
                    scaleView();
                    resetZoom();
                },
                // TODO: make the animation duration configurable
                300);
                
            // reset the scale factor to the last draw scale factor
            scaleFactor = lastDrawScaleFactor;
        }
        else {
            scaleView();
            resetZoom();
        } // if..else
    } // pinchZoomEnd
    
    function wheelZoom(relXY, zoom) {
        self.zoom(relXY, Math.min(Math.pow(2, Math.round(Math.log(zoom))), 8), 500);
    } // wheelZoom
    
    function scaleView() {
        scaling = false;
        self.trigger("scale", scaleFactor, startRect ? calcPinchZoomCenter() : endCenter);

        state = stateActive;
        wake();
    } // scaleView
    
    function handleContainerUpdate(name, value) {
        canvas = document.getElementById(value);
        
        // attach to the new canvas
        attachToCanvas();
    } // handleContainerUpdate
    
    /* private functions */
    
    function attachToCanvas() {
        if (canvas) {
            T5.resetTouch(canvas);

            // if we are autosizing the set the size
            if (params.autoSize) {
                canvas.height = window.innerHeight - canvas.offsetTop;
                canvas.width = window.innerWidth - canvas.offsetLeft;
            } // if

            try {
                mainContext = canvas.getContext('2d');
                mainContext.globalCompositeOperation = 'source-over';
                mainContext.clearRect(0, 0, canvas.width, canvas.height);
            } 
            catch (e) {
                GT.Log.exception(e);
                throw new Error("Could not initialise canvas on specified view element");
            }
            
            // capture touch events
            touchHelper = T5.captureTouch(canvas, {
                observable: self
            });
            
            // enable inertia if configured
            if (params.inertia) {
                touchHelper.inertiaEnable(params.panAnimationDuration, dimensions);
            } // if
            
            // get the dimensions
            dimensions = self.getDimensions();
            
            // iterate through the layers, and change the context
            for (var ii = layers.length; ii--; ) {
                layerContextChange(layers[ii]);
            } // for

            // tell the view to redraw
            wake();
        } // if        
    } // attachToCanvas
    
    function addLayer(id, value) {
        // make sure the layer has the correct id
        value.setId(id);
        value.added = T5.time();
        
        layerContextChanged(value);
        
        // tell the layer that I'm going to take care of it
        value.setParent(self);
        
        // add the new layer
        layers.push(value);
        
        // sort the layers
        layers.sort(function(itemA, itemB) {
            var result = itemB.zindex - itemA.zindex;
            if (result === 0) {
                result = itemB.added - itemA.added;
            } // if
            
            return result;
        });
    } // addLayer
    
    function getLayerIndex(id) {
        for (var ii = layers.length; ii--; ) {
            if (layers[ii].getId() == id) {
                return ii;
            } // if
        } // for
        
        return -1;
    } // getLayerIndex
    
    /* animation code */
    
    function animateZoom(scaleFactorFrom, scaleFactorTo, startXY, targetXY, tweenFn, callback, duration) {
        
        function finishAnimation() {
            // if we have a callback to complete, then call it
            if (callback) {
                callback();
            } // if

            scaleView();

            // reset the scale factor
            resetZoom();
            aniProgress = null;
        } // finishAnimation
        
        // update the zoom center
        scaling = true;
        startCenter = T5.V.copy(startXY);
        endCenter = T5.V.copy(targetXY);
        startRect = null;

        // if tweening then update the targetXY
        if (tweenFn) {
            var tween = T5.tweenValue(
                            0, 
                            scaleFactorTo - scaleFactorFrom, 
                            tweenFn, 
                            finishAnimation, 
                            duration ? duration : 1000);
                            
            tween.requestUpdates(function(updatedValue, completed) {
                // calculate the completion percentage
                aniProgress = updatedValue / (scaleFactorTo - scaleFactorFrom);

                // update the scale factor
                scaleFactor = scaleFactorFrom + updatedValue;

                // trigger the on animate handler
                state = statePinch;
                wake();
                self.trigger("animate");
            });
        }
        // otherwise, update the scale factor and fire the callback
        else {
            scaleFactor = targetScaleFactor;
            finishAnimation();
        }  // if..else                
    } // animateZoom
    
    /* draw code */
    
    function calcPinchZoomCenter() {
        var center = T5.D.getCenter(dimensions),
            endDist = T5.V.distance([endCenter, center]),
            endTheta = T5.V.theta(endCenter, center, endDist),
            shiftDelta = T5.V.diff(startCenter, endCenter);
            
        center = T5.V.pointOnEdge(endCenter, center, endTheta, endDist / scaleFactor);

        center.x = center.x + shiftDelta.x;
        center.y = center.y + shiftDelta.y; 
        
        return center;
    } // calcPinchZoomCenter
    
    function calcZoomCenter() {
        var displayCenter = T5.D.getCenter(dimensions),
            shiftFactor = (aniProgress ? aniProgress : 1) / 2,
            centerOffset = T5.V.diff(startCenter, endCenter);

        if (startRect) {
            zoomCenter = new T5.Vector(
                            endCenter.x + centerOffset.x, 
                            endCenter.y + centerOffset.y);
        } 
        else {
            zoomCenter = new T5.Vector(
                            endCenter.x - centerOffset.x * shiftFactor, 
                            endCenter.y - centerOffset.y * shiftFactor);
        } // if..else
    } // calcZoomCenter
    
    function triggerIdle() {
        self.trigger("idle");
        
        idle = true;
        idleTimeout = 0;
    } // idle
    
    function drawView(context, offset) {
        var changeCount = 0,
            drawState = frozen ? T5.viewState('FROZEN') : state,
            startTicks = T5.time(),
            isPinchZoom = (drawState & statePinch) !== 0,
            delayDrawLayers = [];
        
        var savedDrawn = false,
            ii = 0;
            
        if (clearBackground || isPinchZoom) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            clearBackground = false;
        } // if
        
        // if we are scaling then do some calcs
        if (isPinchZoom) {
            calcZoomCenter();
            
            // offset the draw args
            if (zoomCenter) {
                offset = T5.V.offset(offset, zoomCenter.x, zoomCenter.y);
            } // if
        } // if
        
        context.save();
        try {
            lastDrawScaleFactor = scaleFactor;
            
            // if the device dpi has scaled, then apply that to the display
            if (deviceScaling !== 1) {
                context.scale(deviceScaling, deviceScaling);
            }
            // if we are scaling, then tell the canvas to scale
            else if (isPinchZoom) {
                context.translate(endCenter.x, endCenter.y);
                context.scale(scaleFactor, scaleFactor);
            }
            
            for (ii = layers.length; ii--; ) {
                // draw the layer output to the main canvas
                // but only if we don't have a scale buffer or the layer is a draw on scale layer
                if (layers[ii].shouldDraw(drawState)) {
                    var layerChanges = layers[ii].draw(
                                            context, 
                                            offset, 
                                            dimensions, 
                                            drawState, 
                                            self);

                    changeCount += layerChanges ? layerChanges : 0;
                } // if
            } // for
        }
        finally {
            context.restore();
        } // try..finally
        
        GT.Log.trace("draw complete", startTicks);
        
        repaint = false;
        return changeCount;
    } // drawView
    
    function cycle() {
        // check to see if we are panning
        var changeCount = 0,
            interacting = (! panimating) && 
                ((state === statePinch) || (state === statePan));
            
        // get the tickcount
        tickCount = T5.time();
        
        // conver the offset x and y to integer values
        // while canvas implementations work fine with real numbers, the actual drawing of images
        // will not look crisp when a real number is used rather than an integer (or so I've found)
        offset.x = Math.floor(offset.x);
        offset.y = Math.floor(offset.y);
        
        if (interacting) {
            T5.cancelAnimation(function(tweenInstance) {
                return tweenInstance.cancelOnInteract;
            });
            
            idle = false;
            if (idleTimeout !== 0) {
                clearTimeout(idleTimeout);
                idleTimeout = 0;
            } // if
        }  // if

        // check that all is right with each layer
        for (var ii = layers.length; ii--; ) {
            var cycleChanges = layers[ii].cycle(tickCount, offset, state);
            changeCount += cycleChanges ? cycleChanges : 0;
        } // for
        
        changeCount += drawView(mainContext, offset);

        // include wake triggers in the change count
        paintTimeout = 0;
        if (wakeTriggers + changeCount > 0) {
            wake();
        } 
        else {
            if ((! idle) && (idleTimeout === 0)) {
                idleTimeout = setTimeout(triggerIdle, 500);
            } // if
        } // if..else
        
        GT.Log.trace("Completed draw cycle", tickCount);
    } // cycle
    
    function wake() {
        wakeTriggers++;
        if (frozen || (paintTimeout !== 0)) { return; }
    
        wakeTriggers = 0;
        paintTimeout = setTimeout(cycle, 0);
    } // wake
    
    function invalidate() {
        repaint = true;
    } // invalidate
    
    function layerContextChanged(layer) {
        layer.trigger("contextChanged", mainContext);
    } // layerContextChanged
    
    /* object definition */
    
    // initialise self
    var self = {
        id: params.id,
        deviceScaling: deviceScaling,
        fastDraw: params.fastDraw || T5.getConfig().requireFastDraw,
        
        // TODO: change name to be scaling related
        animate: function(targetScaleFactor, startXY, targetXY, tweenFn, callback) {
            animateZoom(
                scaleFactor, 
                targetScaleFactor, 
                startXY, 
                targetXY, 
                tweenFn, 
                callback);
        },
        
        centerOn: function(offset) {
            self.setOffset(offset.x - (canvas.width / 2), offset.y - (canvas.height / 2));
        },
        
        getDimensions: function() {
            if (canvas) {
                return new T5.Dimensions(canvas.width, canvas.height);
            } // if
        },
        
        getZoomCenter: function() {
            return zoomCenter;
        },
        
        /* layer getter and setters */
        
        getLayer: function(id) {
            // look for the matching layer, and return when found
            for (var ii = 0; ii < layers.length; ii++) {
                if (layers[ii].getId() == id) {
                    return layers[ii];
                } // if
            } // for
            
            return null;
        },
        
        setLayer: function(id, value) {
            // if the layer already exists, then remove it
            for (var ii = 0; ii < layers.length; ii++) {
                if (layers[ii].getId() === id) {
                    layers.splice(ii, 1);
                    break;
                } // if
            } // for
            
            if (value) {
                addLayer(id, value);
            } // if

            wake();
        },
        
        eachLayer: function(callback) {
            // iterate through each of the layers and fire the callback for each 
            for (var ii = 0; ii < layers.length; ii++) {
                callback(layers[ii]);
            } // for
        },
        
        clearBackground: function() {
            clearBackground = true;
        },
        
        freeze: function() {
            frozen = true;
        },
        
        unfreeze: function() {
            frozen = false;
            
            wake();
        },
        
        needRepaint: function() {
            return repaint;
        },
        
        snapshot: function(zindex) {
        },
        
        scale: function(targetScaling, tweenFn, callback, startXY, targetXY) {
            // if the start XY is not defined, used the center
            if (! startXY) {
                startXY = T5.D.getCenter(dimensions);
            } // if
            
            // if the target xy is not defined, then use the canvas center
            if (! targetXY) {
                targetXY = T5.D.getCenter(dimensions);
            } // if
            
            self.animate(
                    targetScaling, 
                    startXY, 
                    targetXY, 
                    tweenFn, 
                    callback);

            return self;
        },
        
        removeLayer: function(id) {
            var layerIndex = getLayerIndex(id);
            if ((layerIndex >= 0) && (layerIndex < layers.length)) {
                GT.say("layer.removed", { layer: layers[layerIndex] });

                layers.splice(layerIndex, 1);
            } // if
        },
        
        /* offset methods */
        
        getOffset: function() {
            return T5.V.copy(offset);
        },
        
        setOffset: function(x, y) {
            offset.x = x; 
            offset.y = y;
        },
        
        updateOffset: function(x, y, tweenFn, tweenDuration, callback) {
            
            function updateOffsetAnimationEnd() {
                panEnd(0, 0);
                if (callback) {
                    callback();
                } // if
            } // updateOffsetAnimationEnd
            
            if (tweenFn) {
                var endPosition = new T5.Vector(x, y);

                var tweens = T5.tweenVector(
                                offset, 
                                endPosition.x, 
                                endPosition.y, 
                                tweenFn, 
                                updateOffsetAnimationEnd,
                                tweenDuration);

                // set the tweens to cancel on interact
                for (var ii = tweens.length; ii--; ) {
                    tweens[ii].cancelOnInteract = true;
                    tweens[ii].requestUpdates(wake);
                } // for
            }
            else {
                self.setOffset(x, y);
            } // if..else
        },
        
        zoom: function(targetXY, newScaleFactor, rescaleAfter) {
            panimating = false;
            scaleFactor = newScaleFactor;
            scaling = scaleFactor !== 1;

            startCenter = T5.D.getCenter(self.getDimensions());
            endCenter = scaleFactor > 1 ? T5.V.copy(targetXY) : T5.D.getCenter(self.getDimensions());
            startRect = null;
            
            clearTimeout(rescaleTimeout);

            if (scaling) {
                state = statePinch;
                wake();

                if (rescaleAfter) {
                    rescaleTimeout = setTimeout(function() {
                        scaleView();
                        resetZoom();
                    }, parseInt(rescaleAfter, 10));
                } // if
            } // if
        }
    };

    // listen for layer removals
    GT.listen("layer.remove", function(args) {
        if (args.id) {
            self.removeLayer(args.id);
        } // if
    });
    
    deviceScaling = T5.getConfig().getScaling();
    
    // make the view observable
    GT.observable(self);
    
    // listen for being woken up
    self.bind("wake", wake);
    
    // handle invalidation
    self.bind("invalidate", invalidate);
    
    // if this is pannable, then attach event handlers
    if (params.pannable) {
        self.bind("pan", pan);
        self.bind("panEnd", panEnd);

        // handle intertia events
        self.bind("inertiaPan", panInertia);
        self.bind("inertiaCancel", function() {
            panimating = false;
            wake();
        });
    } // if

    // if this view is scalable, attach zooming event handlers
    if (params.scalable) {
        self.bind("pinchZoom", pinchZoom);
        self.bind("pinchZoomEnd", pinchZoomEnd);
        self.bind("wheelZoom", wheelZoom);
    }
    
    // make the view configurable
    GT.configurable(
        self, 
        ["inertia", "container"], 
        GT.paramTweaker(params, null, {
            "container": handleContainerUpdate
        }),
        true);
    
    // attach the map to the canvas
    attachToCanvas();
    
    return self;
}; // T5.View
T5.AnimatedPathLayer = function(params) {
    params = T5.ex({
        path: [],
        id: GT.objId('pathAni'),
        easing: T5.easing('sine.inout'),
        validStates: T5.viewState("ACTIVE", "PAN", "PINCH"),
        drawIndicator: null,
        duration: 2000,
        autoCenter: false
    }, params);
    
    // generate the edge data for the specified path
    var edgeData = T5.V.edges(params.path), 
        tween,
        theta,
        indicatorXY = null,
        pathOffset = 0;
    
    function drawDefaultIndicator(context, offset, indicatorXY) {
        // draw an arc at the specified position
        context.fillStyle = "#FFFFFF";
        context.strokeStyle = "#222222";
        context.beginPath();
        context.arc(
            indicatorXY.x, 
            indicatorXY.y,
            4,
            0,
            Math.PI * 2,
            false);             
        context.stroke();
        context.fill();
    } // drawDefaultIndicator
    
    // calculate the tween
    tween = T5.tweenValue(
        0, 
        edgeData.total, 
        params.easing, 
        function() {
            self.remove();
        },
        params.duration);
        
    // if we are autocentering then we need to cancel on interaction
    // tween.cancelOnInteract = autoCenter;
        
    // request updates from the tween
    tween.requestUpdates(function(updatedValue, complete) {
        pathOffset = updatedValue;

        if (complete) {
            self.remove();
        } // if
    });
    
    // initialise self
    var self =  T5.ex(new T5.ViewLayer(params), {
        cycle: function(tickCount, offset, state) {
            var edgeIndex = 0;

            // iterate through the edge data and determine the current journey coordinate index
            while ((edgeIndex < edgeData.accrued.length) && (edgeData.accrued[edgeIndex] < pathOffset)) {
                edgeIndex++;
            } // while

            // reset offset xy
            indicatorXY = null;

            // if the edge index is valid, then let's determine the xy coordinate
            if (edgeIndex < params.path.length-1) {
                var extra = pathOffset - (edgeIndex > 0 ? edgeData.accrued[edgeIndex - 1] : 0),
                    v1 = params.path[edgeIndex],
                    v2 = params.path[edgeIndex + 1];

                theta = T5.V.theta(v1, v2, edgeData.edges[edgeIndex]);
                indicatorXY = T5.V.pointOnEdge(v1, v2, theta, extra);

                if (params.autoCenter) {
                    var parent = self.getParent();
                    if (parent) {
                        parent.centerOn(indicatorXY);
                    } // if
                } // if
            } // if

            return indicatorXY ? 1 : 0;
        },
        
        draw: function(context, offset, dimensions, state, view) {
            if (indicatorXY) {
                // if the draw indicator method is specified, then draw
                (params.drawIndicator ? params.drawIndicator : drawDefaultIndicator)(
                    context,
                    offset,
                    new T5.Vector(indicatorXY.x - offset.x, indicatorXY.y - offset.y),
                    theta
                );
            } // if
        }
    });

    return self;
}; // T5.AnimatedPathLayer
(function() {
    // set the default tile size to 256 pixels
    T5.tileSize = 256;
    
    T5.Tile = function(params) {
        params = T5.ex({
            x: 0,
            y: 0,
            gridX: 0,
            gridY: 0,
            dirty: false
        }, params);
        
        return params;
    }; // T5.Tile
    
    T5.ImageTile = function(params) {
        // initialise parameters with defaults
        params = T5.ex({
            url: "",
            sessionParamRegex: null,
            loaded: false
        }, params);
        
        return new T5.Tile(params);
    }; // T5.ImageTile
})();T5.TileGrid = function(params) {
    // extend the params with the defaults
    params = T5.ex({
        tileSize: T5.tileSize,
        drawGrid: false,
        center: new T5.Vector(),
        gridSize: 25,
        shiftOrigin: null,
        supportFastDraw: true
    }, params);
    
    // initialise tile store related information
    var storage = new Array(Math.pow(params.gridSize, 2)),
        gridSize = params.gridSize,
        tileSize = params.tileSize,
        gridHalfWidth = Math.ceil(params.gridSize >> 1),
        topLeftOffset = T5.V.offset(params.center, -gridHalfWidth),
        lastTileCreator = null,
        tileShift = new T5.Vector(),
        lastNotifyListener = null;    
    
    // initialise varibles
    var halfTileSize = Math.round(params.tileSize / 2),
        invTileSize = params.tileSize ? 1 / params.tileSize : 0,
        active = true,
        tileDrawQueue = null,
        loadedTileCount = 0,
        lastTilesDrawn = false,
        lastCheckOffset = new T5.Vector(),
        shiftDelta = new T5.Vector(),
        repaintDistance = T5.getConfig().repaintDistance,
        reloadTimeout = 0,
        gridHeightWidth = gridSize * params.tileSize,
        tileCols, tileRows, centerPos;
        
    /* internal functions */
        
    function copyStorage(dst, src, delta) {
        // set the length of the destination to match the source
        dst.length = src.length;

        for (var xx = 0; xx < params.gridSize; xx++) {
            for (var yy = 0; yy < params.gridSize; yy++) {
                dst[getTileIndex(xx, yy)] = getTile(xx + delta.x, yy + delta.y);
            } // for
        } // for
    } // copyStorage

    function createTempTile(col, row) {
        var gridXY = getGridXY(col, row);
        return new T5.ImageTile({
            gridX: gridXY.x,
            gridY: gridXY.y
        });
    } // createTempTile
    
    function findTile(matcher) {
        if (! matcher) { return null; }
        
        for (var ii = storage.length; ii--; ) {
            var tile = storage[ii];
            if (tile && matcher(tile)) {
                return tile;
            } // if
        } // for
        
        return null;
    } // findTile
    
    function getGridXY(col, row) {
        return T5.Vector(
            col * tileSize - tileShift.x,
            row * tileSize - tileShift.y);
    } // getGridXY
    
    function getNormalizedPos(col, row) {
        return T5.V.add(new T5.Vector(col, row), T5.V.invert(topLeftOffset), tileShift);
    } // getNormalizedPos
    
    function getShiftDelta(topLeftX, topLeftY, cols, rows) {
        // initialise variables
        var shiftAmount = Math.floor(params.gridSize * 0.2),
            shiftDelta = new T5.Vector();
            
        // test the x
        if (topLeftX < 0 || topLeftX + cols > params.gridSize) {
            shiftDelta.x = topLeftX < 0 ? -shiftAmount : shiftAmount;
        } // if

        // test the y
        if (topLeftY < 0 || topLeftY + rows > params.gridSize) {
            shiftDelta.y = topLeftY < 0 ? -shiftAmount : shiftAmount;
        } // if
        
        return shiftDelta;
    } // getShiftDelta
    
    function getTile(col, row) {
        return (col >= 0 && col < params.gridSize) ? storage[getTileIndex(col, row)] : null;
    } // getTile
    
    function setTile(col, row, tile) {
        storage[getTileIndex(col, row)] = tile;
    } // setTile
    
    function getTileIndex(col, row) {
        return (row * params.gridSize) + col;
    } // getTileIndex
    
    /*
    What a cool function this is.  Basically, this goes through the tile
    grid and creates each of the tiles required at that position of the grid.
    The tileCreator is a callback function that takes a two parameters (col, row) and
    can do whatever it likes but should return a Tile object or null for the specified
    column and row.
    */
    function populate(tileCreator, notifyListener, resetStorage) {
        // take a tick count as we want to time this
        var startTicks = GT.Log.getTraceTicks(),
            tileIndex = 0,
            gridSize = params.gridSize,
            tileSize = params.tileSize,
            centerPos = new T5.Vector(gridSize / 2, gridSize / 2);
            
        // if the storage is to be reset, then do that now
        if (resetStorage) {
            storage = [];
        } // if
        
        if (tileCreator) {
            // GT.Log.info("populating grid, x shift = " + tileShift.x + ", y shift = " + tileShift.y);
            
            for (var row = 0; row < gridSize; row++) {
                for (var col = 0; col < gridSize; col++) {
                    if (! storage[tileIndex]) {
                        var tile = tileCreator(col, row, topLeftOffset, gridSize);
                        
                        // set the tile grid x and grid y position
                        tile.gridX = (col * tileSize) - tileShift.x;
                        tile.gridY = (row * tileSize) - tileShift.y;

                        // add the tile to storage
                        storage[tileIndex] = tile;
                    } // if
                    
                    // increment the tile index
                    tileIndex++;
                } // for
            } // for
        } // if
        
        // save the last tile creator
        lastTileCreator = tileCreator;
        lastNotifyListener = notifyListener;

        // log how long it took
        GT.Log.trace("tile grid populated", startTicks);
        
        // if we have an onpopulate listener defined, let them know
        self.dirty = true;
        self.wakeParent();
    } // populate
    
    function shift(shiftDelta, shiftOriginCallback) {
        // if the shift delta x and the shift delta y are both 0, then return
        if ((shiftDelta.x === 0) && (shiftDelta.y === 0)) { return; }
        
        var ii, startTicks = GT.Log.getTraceTicks();
        // GT.Log.info("need to shift tile store grid, " + shiftDelta.x + " cols and " + shiftDelta.y + " rows.");

        // create new storage
        var newStorage = Array(storage.length);

        // copy the storage from given the various offsets
        copyStorage(newStorage, storage, shiftDelta);

        // update the storage and top left offset
        storage = newStorage;

        // TODO: check whether this is right or not
        if (shiftOriginCallback) {
            topLeftOffset = shiftOriginCallback(topLeftOffset, shiftDelta);
        }
        else {
            topLeftOffset = T5.V.add(topLeftOffset, shiftDelta);
        } // if..else

        // create the tile shift offset
        tileShift.x += (-shiftDelta.x * params.tileSize);
        tileShift.y += (-shiftDelta.y * params.tileSize);
        GT.Log.trace("tile storage shifted", startTicks);

        // populate with the last tile creator (crazy talk)
        populate(lastTileCreator, lastNotifyListener);
    } // shift
    
    function updateDrawQueue(offset, state) {
        if (! centerPos) { return; }
        
        var tile, tmpQueue = [],
            tileStart = new T5.Vector(
                            Math.floor((offset.x + tileShift.x) * invTileSize), 
                            Math.floor((offset.y + tileShift.y) * invTileSize));

        // reset the tile draw queue
        tilesNeeded = false;

        // right, let's draw some tiles (draw rows first)
        for (var yy = tileRows; yy--; ) {
            // iterate through the columns and draw the tiles
            for (var xx = tileCols; xx--; ) {
                // get the tile
                tile = getTile(xx + tileStart.x, yy + tileStart.y);
                var centerDiff = new T5.Vector(xx - centerPos.x, yy - centerPos.y);

                if (! tile) {
                    shiftDelta = getShiftDelta(tileStart.x, tileStart.y, tileCols, tileRows);
                    
                    // TODO: replace the tile with a temporary draw tile here
                    tile = createTempTile(xx + tileStart.x, yy + tileStart.y);
                } // if
                
                // add the tile and position to the tile draw queue
                tmpQueue.push({
                    tile: tile,
                    centerness: T5.V.absSize(centerDiff)
                });
            } // for
        } // for

        // sort the tile queue by "centerness"
        tmpQueue.sort(function(itemA, itemB) {
            return itemB.centerness - itemA.centerness;
        });
        
        if (! tileDrawQueue) {
            tileDrawQueue = new Array(tmpQueue.length);
        } // if
        
        // copy the temporary queue item to the draw queue
        for (var ii = tmpQueue.length; ii--; ) {
            tileDrawQueue[ii] = tmpQueue[ii].tile;
            self.prepTile(tileDrawQueue[ii], state);
        } // for
    } // updateDrawQueue
    
    /* external object definition */
    
    // initialise self
    var self = T5.ex(new T5.ViewLayer(params), {
        gridDimensions: new T5.Dimensions(gridHeightWidth, gridHeightWidth),
        dirty: false,
        
        cycle: function(tickCount, offset, state) {
            var needTiles = shiftDelta.x !== 0 || shiftDelta.y !== 0,
                changeCount = 0;

            if (needTiles) {
                shift(shiftDelta, params.shiftOrigin);

                // reset the delta
                shiftDelta = new T5.Vector();
                
                // things need to happen
                changeCount++;
            } // if
            
            if (state !== T5.viewState('PINCH')) {
                updateDrawQueue(offset, state);
            } // if
            
            // if the grid is dirty let the calling view know
            return changeCount + self.dirty ? 1 : 0;
        },
        
        deactivate: function() {
            active = false;
        },
        
        find: findTile,
        
        prepTile: function(tile, state) {
        },
        
        drawTile: function(context, tile, x, y, state) {
            return false;
        },
        
        // TODO: convert to a configurable implementation
        getTileSize: function() {
            return params.tileSize;
        },
        
        draw: function(context, offset, dimensions, state, view) {
            if (! active) { return; }
            
            // initialise variables
            var startTicks = T5.time(),
                xShift = offset.x,
                yShift = offset.y,
                tilesDrawn = true,
                redraw = view.needRepaint() || (state === T5.viewState('PAN')) || (state === T5.viewState('PINCH')) || T5.isTweening();
                
            if (! centerPos) {
                tileCols = Math.ceil(dimensions.width * invTileSize) + 1;
                tileRows = Math.ceil(dimensions.height * invTileSize) + 1;
                centerPos = new T5.Vector(Math.floor((tileCols-1) / 2), Math.floor((tileRows-1) / 2));
            } // if
            
            // if we don't have a draq queue return
            if (! tileDrawQueue) { return; }
            
            // set the context stroke style for the border
            if (params.drawGrid) {
                context.strokeStyle = "rgba(50, 50, 50, 0.3)";
            } // if
            
            // begin the path for the tile borders
            context.beginPath();

            // iterate through the tiles in the draw queue
            for (var ii = tileDrawQueue.length; ii--; ) {
                var tile = tileDrawQueue[ii];

                // if the tile is loaded, then draw, otherwise load
                if (tile) {
                    var x = tile.gridX - xShift,
                        y = tile.gridY - yShift,
                        drawn = redraw ? false : (! tile.dirty);
                        
                    // draw the tile
                    if (! drawn) {
                        tilesDrawn =  self.drawTile(context, tile, x, y, state) && tilesDrawn;
                        
                        tile.x = x;
                        tile.y = y;
                    } // if
                } 
                else {
                    tilesDrawn = false;
                } // if..else

                // if we are drawing borders, then draw that now
                if (params.drawGrid) {
                    context.rect(x, y, params.tileSize, params.tileSize);
                } // if
            } // for

            // draw the borders if we have them...
            context.stroke();
            GT.Log.trace("drawn tiles", startTicks);
            
            // if the tiles have been drawn and previously haven't then fire the tiles drawn event
            if (tilesDrawn && (! lastTilesDrawn)) {
                view.trigger("tileDrawComplete");
            } // if
            
            // flag the grid as not dirty
            lastTilesDrawn = tilesDrawn;
            self.dirty = false;
        },
        
        getTileAtXY: function(x, y) {
            var queueLength = tileDrawQueue ? tileDrawQueue.length : 0,
                tileSize = params.tileSize;
            
            for (var ii = queueLength; ii--; ) {
                var tile = tileDrawQueue[ii];
                
                if (tile && (x >= tile.x) && (y >= tile.y)) {
                    if ((x <= tile.x + tileSize) && (y <= tile.y + tileSize)) {
                        return tile;
                    } // if
                } // if
            } // for
            
            return null;
        },
        
        getTileVirtualXY: function(col, row, getCenter) {
            // get the normalized position from the tile store
            var pos = getNormalizedPos(col, row),
                fnresult = new T5.Vector(pos.x * params.tileSize, pos.y * params.tileSize);
            
            if (getCenter) {
                fnresult.x += halfTileSize;
                fnresult.y += halfTileSize;
            } // if
            
            return fnresult;
        },
        
        populate: function(tileCreator) {
            populate(tileCreator, null, true);
        }
    });
    
    GT.listen("imagecache.cleared", function(args) {
        // reset all the tiles loaded state
        for (var ii = storage.length; ii--; ) {
            if (storage[ii]) {
                storage[ii].loaded = false;
            } // if
        } // for
    });
    
    GT.listen("tiler.repaint", function(args) {
        for (var ii = storage.length; ii--; ) {
            if (storage[ii]) {
                storage[ii].x = null;
                storage[ii].y = null;
            } // if
        } // for
    });

    return self;
}; // T5.TileGrid

/*

(function() {
    TileStore = function(params) {

        
        
        // initialise self
        var self = {
            setOrigin: function(col, row) {
                if (! tileOrigin) {
                    topLeftOffset = T5.V.offset(new T5.Vector(col, row), -tileHalfWidth);
                }
                else {
                    shiftOrigin(col, row);
                } // if..else
            }
        };
        
        
        return self;
    };
})();

*/
T5.ImageTileGrid = function(params) {
    params = T5.ex({
        emptyTile: getEmptyTile(T5.tileSize),
        panningTile: getPanningTile(T5.tileSize),
        tileOffset: new T5.Vector(),
        tileDrawArgs: {}
    }, params);
    
    function getEmptyTile(tileSize) {
        if ((! emptyTile) || (tileSize !== emptyTile.width)) {
            emptyTile = T5.newCanvas(tileSize, tileSize);

            var tileContext = emptyTile.getContext('2d');

            tileContext.fillStyle = "rgba(150, 150, 150, 0.01)";
            tileContext.fillRect(0, 0, emptyTile.width, emptyTile.height);
        } // if

        return emptyTile;
    } // getEmptyTile
    
    function getPanningTile(tileSize) {

        function getPattern() {
            var patternSize = 32,
                halfSize = patternSize / 2,
                patternCanvas = T5.newCanvas(patternSize, patternSize);

            // get the canvas context
            var context = patternCanvas.getContext("2d");

            // fill the canvas
            context.fillStyle = "#BBBBBB";
            context.fillRect(0, 0, patternSize, patternSize);

            // now draw two smaller rectangles
            context.fillStyle = "#C3C3C3";
            context.fillRect(0, 0, halfSize, halfSize);
            context.fillRect(halfSize, halfSize, halfSize, halfSize);

            return patternCanvas;
        } // getPattern

        if ((! panningTile) || (tileSize !== panningTile.width)) {
            panningTile = T5.newCanvas(tileSize, tileSize);

            var tileContext = panningTile.getContext('2d');

            // fill the panning tile with the pattern
            tileContext.fillStyle = tileContext.createPattern(getPattern(), "repeat");
            tileContext.fillRect(0, 0, panningTile.width, panningTile.height);
        } // if

        return panningTile;
    } // getPanningTile
    
    function handleImageLoad(loadedImage, fromCache) {
        self.getParent().trigger("invalidate");

        self.dirty = true;
        self.wakeParent();
    } // handleImageLoad
    
    // initialise variables
    var emptyTile = params.emptyTile,
        panningTile = params.panningTile,
        tileOffset = params.tileOffset,
        imageOverlay = params.imageOverlay,
        stateActive = T5.viewState('ACTIVE'),
        statePan = T5.viewState('PAN'),
        fastDraw = T5.getConfig().requireFastDraw,
        tileSize = params.tileSize ? params.tileSize : T5.tileSize,
        
        // some short cut functions
        getImage = T5.Images.get,
        loadImage = T5.Images.load;
        
    // initialise the tile draw args
    var tileDrawArgs = T5.ex({
        background: null, 
        overlay: null,
        offset: new T5.Vector(),
        realSize: new T5.Dimensions(tileSize, tileSize)
    }, params.tileDrawArgs);
        
    // initialise self
    var self = T5.ex(new T5.TileGrid(params), {
        drawTile: function(context, tile, x, y, state) {
            var image = tile.url ? getImage(tile.url) : null,
                drawn = false;
                
            if (image) {
                context.drawImage(image, x, y);
                tile.dirty = false;

                drawn = true;
            }
            else if (state === statePan) {
                panningTile ? context.drawImage(panningTile, x, y) : 0;
            }
            else if (emptyTile) {
                context.drawImage(emptyTile, x, y);
            } // if..else
            
            return drawn;
        },
        
        prepTile: function(tile, state) {
            if (tile) {
                tile.dirty = true;
            } // if
            
            if (tile && ((! fastDraw) || (state === stateActive))) {
                var image = getImage(tile.url);
                if (! image) {
                    loadImage(tile.url, handleImageLoad, tileDrawArgs);
                } // if
            } // if
        }
    });
    
    return self;
}; // T5.ImageTileGrid
T5.Tiler = function(params) {
    params = T5.ex({
        container: "",
        drawCenter: false,
        datasources: {},
        tileLoadThreshold: "first"
    }, params);
    
    // initialise layers
    var gridIndex = 0,
        lastTileLayerLoaded = "",
        actualTileLoadThreshold = 0;
        
    /* private methods */
    
    function selectTile(tile) {
        self.trigger("selectTile", tile);
    } // selectTile
    
    /* event handlers */
    
    function handleTap(absXY, relXY) {
        var grid = self.getTileLayer();
        if (grid) {
            var tile = grid.getTileAtXY(relXY.x, relXY.y);
            if (tile) {
                selectTile(tile);
            }
        } // grid
    } // handleTap
    
    /* object definition */
    
    // initialise self
    var self = T5.ex(new T5.View(params), {
        getTileLayer: function() {
            return self.getLayer("grid" + gridIndex);
        },

        setTileLayer: function(value) {
            self.setLayer("grid" + gridIndex, value);
            
            // update the tile load threshold
            GT.say("grid.updated", { id: "grid" + gridIndex });
        },

        viewPixToGridPix: function(vector) {
            var offset = self.getOffset();
            return new T5.Vector(vector.x + offset.x, vector.y + offset.y);
        },
        
        centerOn: function(tile, easing, duration, callback) {
            var grid = self.getTileLayer(),
                dimensions = self.getDimensions(),
                tileSize = grid ? grid.getTileSize() : 0;
                
            if (tileSize) {
                self.updateOffset(
                    tile.gridX - Math.floor((dimensions.width - tileSize) * 0.5), 
                    tile.gridY - Math.floor((dimensions.height - tileSize) * 0.5),
                    easing,
                    duration,
                    callback);
            } // if
        },
        
        cleanup: function() {
            self.removeLayer("grid" + gridIndex);
        },
        
        repaint: function() {
            // flag to the tile store to reset the image positions
            GT.say("tiler.repaint");
            
            self.trigger("wake");
        },
        
        select: function(tile) {
            selectTile(tile);
        }
    }); // self
    
    self.bind("tap", handleTap);

    return self;
}; // Tiler
