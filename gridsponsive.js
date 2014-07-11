/*  gridsponsive
**  Benjamin Vacha : github.com/benvacha
*/

 
(function( $ ){
    
    // order to build css
    var buildOrder = {
        
    };
    
    // how to build css
    var blueprints = {
        
    };
    
    // scan source for unique tags
    var scanner = {
        // get array of unique sorted class definitions
        scan: function($source) {
            var i, j, slugs = [], tokens, allTokens = [],
                lastToken, uniqueTokens = [];
            // get all class attributes
            $source.find('.gridsponsive').each(function() {
                slugs.push($(this).attr('class'));
                $(this).find('*').each(function() {
                    slugs.push($(this).attr('class'));
                });
            });
            // split class attributes to get class definitions
            for(i=0; i<slugs.length; i++) {
                tokens = slugs[i].split(/[ ]+/);
                for(j=0; j<tokens.length; j++) {
                    allTokens.push(tokens[j]);
                }
            }
            // find unique class definitions
            allTokens.sort();
            for(i=0; i<allTokens.length; i++) {
                if(allTokens[i] !== lastToken) {
                    lastToken = allTokens[i];
                    uniqueTokens.push(lastToken);
                }
            }
            //
            return uniqueTokens;
        }
    };
    
    // manage stored tags 
    var archiver = {
        // get array of stored tokens
        get: function(storageKey) {
            var slug = localStorage.getItem(storageKey);
            return (slug) ? slug.split(',') : [];
        },
        // store array of tokens
        set: function(storageKey, tokens) {
            localStorage.setItem(storageKey, tokens.join(','));
        },
        // clear stored tokens
        remove: function(storageKey) {
            localStorage.removeItem(storageKey);
        },
        // update stored tokens with unique tokens and return unique tokens
        // if stateless, remove stored tokens and return newTokens
        update: function(storageKey, newTokens, stateless) {
            if(stateless) {
                // remove stored tokens, return new tokens
                archiver.remove(storageKey);
                return newTokens;
            } else {
                // get stored tokens, merge and sort with new tokens
                var i, storedTokens, sortedTokens,
                    lastToken, uniqueTokens = [];
                storedTokens = archiver.get(storageKey);
                sortedTokens = storedTokens.concat(newTokens).sort();
                // find unique tokens
                for(i=0; i<sortedTokens.length; i++) {
                    if(sortedTokens[i] !== lastToken) {
                        lastToken = sortedTokens[i];
                        uniqueTokens.push(lastToken);
                    }
                }
                // store unique tokens, return unique tokens
                archiver.set(storageKey, uniqueTokens);
                return uniqueTokens;
            }
        }
    };
    
    // build the components of the css definitions
    var builder = {
        
    };
    
    // generate the minified css
    var generator = {
        
    };
    
    // plugin public methods
    var methods = {
        // initialize the plugin for each matched element
        init : function( options ) { return this.each(function(){
            var $this = $(this);
            $this.data('gridsponsive', $.extend( {
                styleId: 'gridsponsive',
                cutoffs: [960, 550],
                showOutput: false,
                storageKey: 'gridsponsive',
                stateless: false
            }, options, $this.data('gridsponsive')));
            var data = $this.data('gridsponsive');
            
            /* */
            
            var liveDefs, uniqueDefs;
            liveDefs = scanner.scan($this);
            uniqueDefs = archiver.update(data.storageKey, liveDefs, data.stateless);
            
                
        }); }
    };
 
    // adds gridsponsive to jQuery, handles method routing
    $.fn.gridsponsive = function( method ) {
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.gridsponsive' );
        }    
    };
    
})( jQuery );