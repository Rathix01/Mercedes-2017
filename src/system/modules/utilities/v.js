var R = require('ramda');
var diff = require('deep-diff').diff;  // npm install deep-diff


/*
 "Greenspun's Tenth Rule of Programming: any sufficiently complicated C or
 Fortran program contains an ad hoc ,informally-specified, bug-ridden,
 slow implementation of half of Common Lisp."
 */

function wrap ( val ) {
  return { value: val };
}
function unwrap( obj ) {
  return obj.value;
}
var giveKey = R.curry(function( actionKey, obj ) {
  return R.merge(obj, {
    actionKey: actionKey
  })
});

// ie: function removeUndefinedValsFromMap( map ) {
var removeUndefinedValsFromMap = R.compose( R.fromPairs, R.filter(x => x[1]), R.toPairs );

// gets the given prop of an object or undefined if obj doesn't exist
var maybe = R.curry( function(propMame, obj) {
  return obj && obj[propMame];
});
// given obj, sets property propName to propVal. return obj. TODO: shotbolt thinks R.merge would be a better choice in most cases, maintain immutability pattern.
var mashInto = R.curry(function( propName, propVal, obj) {
  obj[propName] = propVal
  return obj;
});

// Returns true iff all key value pairs in props appear in item
function matches_impl( props, item) {
  return R.map(function(propKey) {
      return item[propKey] === props[propKey]
    }, R.keys(props)).indexOf(false) === -1;
}
// Curried function - whether the given properties match those of the given item
// Eg: matches( { Code: "bob" },  { Name: "James", Height: "1.56cm", Code: "bob" }) returns true.
var matches = R.curry(matches_impl);


// Gets the first item in the list that matches propOrFunc
// propOrFunc can be either a function to filter list, or a set of properties.
// returns undefined if not present.
var getFirst = R.curry(function ( list, propOrFunc ) {
  var matchFunc =
    typeof( propOrFunc) === 'function'
      ? matchFunc = propOrFunc
      : matchFunc = matches(propOrFunc);
  return R.filter(matchFunc, list)[0];
});


// This  uses propOrFunc to filter the given list.
// It is more versatile than R.filter as you can give it { propName: propValue } instead of a matchFunction, if you want
var filter = R.curry(function ( propOrFunc, list ) {
  var matchFunc =
    typeof( propOrFunc) === 'function'
      ? matchFunc = propOrFunc
      : matchFunc = matches(propOrFunc);
  return R.filter(matchFunc, list);
});

// This is the cleaner version of getFirst, with parameters in a more useful order, so
// that it can be used in a curried form more easily.
var first = R.curry(function ( propOrFunc, list ) {
  return filter(propOrFunc, list)[0];
});

// Given an expander function which returns one or more new properties, add these to the object
var expand = R.curry(function( expanderFunction, obj ) {
  return R.merge(obj, expanderFunction(obj));
});


function getDiff(lhs, rhs) {
  return diff(lhs, rhs);
}

function has(obj, key) {
  return obj != null && hasOwnProperty.call(obj, key);

}


// TODO: consider wehther  R.eqDeep is a better choice..

// Deep equals function here is extracted from underscore.js 1.8.3
// Internal recursive comparison function for `isEqual`.
var eq = function(a, b, aStack, bStack) {
  // Identical objects are equal. `0 === -0`, but they aren't identical.
  // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
  if (a === b) return a !== 0 || 1 / a === 1 / b;
  // A strict comparison is necessary because `null == undefined`.
  if (a == null || b == null) return a === b;
  //// Unwrap any wrapped objects.
  //if (a instanceof _) a = a._wrapped;
  //if (b instanceof _) b = b._wrapped;
  // Compare `[[Class]]` names.
  var toString = ({}).toString;
  var className = toString.call(a);
  if (className !== toString.call(b)) return false;
  switch (className) {
    // Strings, numbers, regular expressions, dates, and booleans are compared by value.
    case '[object RegExp]':
    // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
    case '[object String]':
      // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
      // equivalent to `new String("5")`.
      return '' + a === '' + b;
    case '[object Number]':
      // `NaN`s are equivalent, but non-reflexive.
      // Object(NaN) is equivalent to NaN
      if (+a !== +a) return +b !== +b;
      // An `egal` comparison is performed for other numeric values.
      return +a === 0 ? 1 / +a === 1 / b : +a === +b;
    case '[object Date]':
    case '[object Boolean]':
      // Coerce dates and booleans to numeric primitive values. Dates are compared by their
      // millisecond representations. Note that invalid dates with millisecond representations
      // of `NaN` are not equivalent.
      return +a === +b;
  }
  var areArrays = className === '[object Array]';
  if (!areArrays) {
    if (typeof a != 'object' || typeof b != 'object') return false;

    // Objects with different constructors are not equivalent, but `Object`s or `Array`s
    // from different frames are.
    var aCtor = a.constructor, bCtor = b.constructor;
    if (aCtor !== bCtor && !( typeof(aCtor) === 'function' && aCtor instanceof aCtor &&
      typeof(bCtor) === 'function' && bCtor instanceof bCtor)
      && ('constructor' in a && 'constructor' in b)) {
      return false;
    }
  }
  // Assume equality for cyclic structures. The algorithm for detecting cyclic
  // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

  // Initializing stack of traversed objects.
  // It's done here since we only need them for objects and arrays comparison.
  aStack = aStack || [];
  bStack = bStack || [];
  var length = aStack.length;
  while (length--) {
    // Linear search. Performance is inversely proportional to the number of
    // unique nested structures.
    if (aStack[length] === a) return bStack[length] === b;
  }

  // Add the first object to the stack of traversed objects.
  aStack.push(a);
  bStack.push(b);

  // Recursively compare objects and arrays.
  if (areArrays) {
    // Compare array lengths to determine if a deep comparison is necessary.
    length = a.length;
    if (length !== b.length) return false;
    // Deep compare the contents, ignoring non-numeric properties.
    while (length--) {
      if (!eq(a[length], b[length], aStack, bStack)) return false;
    }
  } else {
    // Deep compare objects.
    var keys = Object.keys(a), key;
    length = keys.length;
    // Ensure that both objects contain the same number of properties before comparing deep equality.
    if (Object.keys(b).length !== length) return false;
    while (length--) {
      // Deep compare each member
      key = keys[length];
      if (!(has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
    }
  }
  // Remove the first object from the stack of traversed objects.
  aStack.pop();
  bStack.pop();
  return true;
}

// from jQuery 1.11.3
// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
var whitespace = "[\\x20\\t\\r\\n\\f]";
var rtrim =  /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

function trim(text) {
  return text == null ?
    "" :
    ( text + "" ).replace( rtrim, "" );
}

function getNormalizedGender(val) {
  if( val && trim(val).toLowerCase() === 'male') return 'male';
  if( val && trim(val).toLowerCase() === 'female') return 'female';
  else
    return val; // cannot trim this or trailing spaces will get removed while typing.
}

// apparently HTMLElement.matches does not exist in all browsers, and so has some browser-specific implementations.
var elementMatches =
  HTMLElement.prototype.matches ? HTMLElement.prototype.matches :                       // chrome 34+, Firefox 34+
    HTMLElement.prototype.msMatchesSelector ? HTMLElement.prototype.msMatchesSelector :   // IE 9.0+
      HTMLElement.prototype.webkitMatchesSelector ? HTMLElement.prototype.webkitMatchesSelector : // Chrome, Safari 5.0+, Opera 15.0+
        HTMLElement.prototype.mozMatchesSelector ? HTMLElement.prototype.mozMatchesSelector : // Firefox 3.6 (1.9.2)+,
          undefined;

if( !elementMatches )
  throw 'Could not find required function "matches" (or substitute) in HTMLElement definition';

// Find an ancestor of an element that matches the selector. Browser independent.
function findAncestor (el, selector) {
  while (el && (el = el.parentElement) && el && !elementMatches.call( el, selector ));
  return el;
}

// Find a direct child
function findChild (el, selector) {
  var cursor = { nextElementSibling: el.children[0] }; // start just before child zero
  while ((cursor = cursor.nextElementSibling) && !elementMatches.call(cursor, selector));
  return elementMatches.call(cursor, selector) ? cursor : undefined;
}


var regexSymbolWithCombiningMarks = /([\0-\u02FF\u0370-\u1AAF\u1B00-\u1DBF\u1E00-\u20CF\u2100-\uD7FF\uE000-\uFE1F\uFE30-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])([\u0300-\u036F\u1AB0-\u1AFF\u1DC0-\u1DFF\u20D0-\u20FF\uFE20-\uFE2F]+)/g;
var regexSurrogatePair = /([\uD800-\uDBFF])([\uDC00-\uDFFF])/g;

// Reverse a (possibly Unicode) string in javascript
// See: http://stackoverflow.com/questions/958908/how-do-you-reverse-a-string-in-place-in-javascript
var reverse = function(string) {
  // Step 1: deal with combining marks and astral symbols (surrogate pairs)
  string = string
    // Swap symbols with their combining marks so the combining marks go first
    .replace(regexSymbolWithCombiningMarks, function($0, $1, $2) {
      // Reverse the combining marks so they will end up in the same order
      // later on (after another round of reversing)
      return reverse($2) + $1;
    })
    // Swap high and low surrogates so the low surrogates go first
    .replace(regexSurrogatePair, '$2$1');
  // Step 2: reverse the code units in the string
  var result = '';
  var index = string.length;
  while (index--) {
    result += string.charAt(index);
  }
  return result;
};


function lastToken( str ) {
  var inv = reverse(str);
  var ind = inv.indexOf('_') >= 0 ? inv.indexOf('_') : undefined;
  return reverse( inv.slice( 0, ind) );
}

// R.forEach substitute that works for both lists and maps
var forEach = R.curry(function( func, listOrMap) {
  if( !listOrMap )
    return;

  if( Array.isArray( listOrMap )) {
    var index = 0;
    listOrMap.forEach(function (item) {
        func.call(item, item, index++);
      }
    );
  }
  else {
    for(var key in listOrMap ) {
      if( listOrMap.hasOwnProperty(key)) {
        var item = listOrMap[key];
        func.call(item, item, key)
      }
    }
  }
});




var isDefinedField = R.curry( function(obj, propName) { return obj[propName] !== undefined; });
function stripUndefinedFields(obj) {
  return R.pick(R.filter(isDefinedField(obj), Object.keys(obj)), obj);
}

function sanitizeForClassName(text) {
  return trim(text).replace(' ', '-').toLowerCase();
}

function replaceNullWithEmptyString( val ) { return val === null ? '' : val }

function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
    return letter.toUpperCase();
    //return index == 0 ? letter.toLowerCase() : letter.toUpperCase();  // to UpperCamelCase
  }).replace(/\s+/g, '');
}

function camelizeFileName( str ) {
  var pointIndex = reverse(str).indexOf('.');
  if( pointIndex === -1 )
    return camelize( str );
  else {
    var extension = str.substring( str.length - pointIndex - 1);
    var prefix = str.substring(0, str.length - extension.length);

    return camelize(prefix)+extension;
  }
}

function toUserFriendlyFileSize( fileSizeInBytes ) {
  if( fileSizeInBytes > 1024*1024) {
    var numInMB = parseInt( fileSizeInBytes / (1024 * 1024));
    return ''+numInMB + 'MB'
  }
  else if (fileSizeInBytes > 1024) {
    var numInkB = parseInt( fileSizeInBytes / 1024 );
    return ''+numInkB + 'kB';
  }
  else
    return ''+fileSizeInBytes+'B';
}


// returns function f of type   list --> table indexed by value of given propName
function listToMap(propName) {
  // Hopefullly more efficient than an R.reduce() that builds up a sequence of clones of objects and discards them));
  return R.compose( R.mergeAll, R.map( x => R.createMapEntry(x[propName], x)));
};


module.exports = {
  wrap: wrap,
  unwrap: unwrap,
  trim: trim,
  camelize: camelize,
  camelizeFileName: camelizeFileName,
  toUserFriendlyFileSize: toUserFriendlyFileSize,
  sanitizeForClassName: sanitizeForClassName,
  findAncestor: findAncestor,
  findChild: findChild,
  getNormalizedGender: getNormalizedGender,
  giveKey: giveKey,
  removeUndefinedValsFromMap: removeUndefinedValsFromMap,
  matches: matches,
  getFirst: getFirst, // Deprecated, use 'first' instead
  first: first,
  filter: filter,
  maybe: maybe,
  mashInto: mashInto,
  expand: expand,
  getDiff: getDiff,
  equals: eq, // deep equals
  listToMap: listToMap,
  lastToken: lastToken,
  forEach: forEach,
  stripUndefinedFields: stripUndefinedFields,
  replaceNullWithEmptyString: replaceNullWithEmptyString
}
