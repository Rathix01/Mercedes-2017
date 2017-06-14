
// Section - Helpers to fill in jQuery dependencies.
// ie, provide some simple replacements for functions that jQuery was providing to jquery-filedrop

// returns the index of the item in the list, or -1 otherwise.
function inArray( item, list ) {
  return !list
    ? -1
    : list.indexOf(item);  // ECMAScript 5 compliant.
}

// $.each implementation that works for both lists and maps
function each( listOrMap, func) {
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
        func.call(item, key, item)
      }
    }
  }
}

var r20 = /%20/g,
  rbracket = /\[\]$/;

// jQuery 2.1.4's buildParams method
function buildParams( prefix, obj, add ) {
  var name;

  if ( Array.isArray( obj ) ) {
    // Serialize array item.
    each( obj, function( i, v ) {
      if ( rbracket.test( prefix ) ) {
        // Treat each array item as a scalar.
        add( prefix, v );

      } else {
        // Item is non-scalar (array or object), encode its numeric index.
        buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v,  add );
      }
    });

  } else if ( typeof( obj ) === "object" ) {
    // Serialize object item.
    for ( name in obj ) {
      buildParams( prefix + "[" + name + "]", obj[ name ], add );
    }

  } else {
    // Serialize scalar item.
    add( prefix, obj );
  }
}

// Adjusted and extracted from jQuery-2.1.4
// Serialize an array of form elements or a set of
// key/values into a query string
function param ( a ) {
  var prefix,
    s = [],
    add = function( key, value ) {
      // If value is a function, invoke it and return its value
      value = typeof( value ) === 'function' ? value() : ( value == null ? "" : value );
      s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
    };

  // If an array was passed in, assume that it is an array of form elements.
  if ( Array.isArray( a ) ) {
    // Serialize the form elements
    each( a, function() {
      add( this.name, this.value );
    });

  } else {
    for ( prefix in a ) {
      buildParams( prefix, a[ prefix ], add );
    }
  }

  // Return the resulting serialization
  return s.join( "&" ).replace( r20, "+" );
};

function triggerClickEvent(el) {
  // TODO: may need to use el.ownerDocument instead
  if ("createEvent" in document) {
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent('click', false, true);
    el.dispatchEvent(evt);
  }
  else
    el.fireEvent("onclick");
}

function triggerSubmitEvent(el) {
  if ("createEvent" in el.ownerDocument) {
    var evt = el.ownerDocument.createEvent("HTMLEvents");
    evt.initEvent('submit', false, true);
    el.dispatchEvent(evt);
  }
  else
    el.fireEvent("onsubmit");
}


function preventDefault(e) {
  if ( e && e.preventDefault )
    e.preventDefault();
}



// NB: By necessity, this has significantly different syntax than jquery .remove
function remove( elOrList) {
  var elem,
    elems = Array.isArray(elOrList) ? elOrList : [elOrList],
    i = 0;

  for ( ; (elem = elems[i]) != null; i++ ) {
    if ( elem.parentNode ) {
      elem.parentNode.removeChild( elem );
    }
  }
}

function nodeName( elem, name ) {
  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
};




function empty(elemOrArray) {
  var elems = Array.isArray(elemOrArray) ? elemOrArray : [elemOrArray],
    elem,
    i = 0;

  for ( ; (elem = elems[i]) != null; i++ ) {
    if ( elem.nodeType === 1 ) {
      // Volo: shouldn't need jQuery.cleanData as not using jQuery events, or jQUery data.
      // Prevent memory leaks
      // jQuery.cleanData( getAll( elem, false ) );

      // Remove any remaining nodes
      elem.textContent = "";
    }
  }
}

// $.html --> setInnerHtml
function html(elemOrArray, value ) {
  var elems = Array.isArray(elemOrArray) ? elemOrArray : [elemOrArray],
    elem = elems[0];

  var i = 0,
    l = elems.length;

  if ( value === undefined && elem.nodeType === 1 ) {
    return elem.innerHTML;
  }

  // See if we can take a shortcut and just use innerHTML
  if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
    !wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

    value = value.replace( rxhtmlTag, "<$1></$2>" );

    try {
      for ( ; i < l; i++ ) {
        elem = elems[ i ] || {};

        // Remove element nodes and prevent memory leaks
        if ( elem.nodeType === 1 ) {
          // Volo: not using jQuery, shouldn't need to cleanData
          // jQuery.cleanData( getAll( elem, false ) );
          elem.innerHTML = value;
        }
      }
      elem = 0;

      // If using innerHTML throws an exception, use the fallback method
    } catch( e ) {}
  }

  // if elem hasn't been handled already by shortcut method
  if ( elem ) {
    empty(elems);
    if( elems.length > 0 )
      elems[0].appendChild( value );
  }
}

function createElement(name, propsMap, doc) {
  var document = doc || window.document;

  var el = document.createElement(name);
  each( propsMap, function(key, val) {
    el.setAttribute(key, val);
  });

  return el;
}


module.exports = {
  inArray: inArray,
  each: each,
  buildParams: buildParams,
  param: param,
  createElement: createElement,
  triggerClickEvent: triggerClickEvent,
  triggerSubmitEvent: triggerSubmitEvent,
  preventDefault: preventDefault,
  remove: remove,
  empty: empty,
  html: html
}