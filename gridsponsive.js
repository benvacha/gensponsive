/*  gridsponsive
**  Benjamin Vacha : github.com/benvacha
*/

 
(function( $ ){
    
    // order to build css
    var buildOrder = [
        'gridsponsive',
        'body',
        'footer',
        'col'
    ];
    
    // how to build css
    /*
        pattern: {
            upstreamPattern: 'pattern',
            downstreamPattern: 'pattern',
            staticSelectors: ['static', 'static', ...],
            selectorPatterns: ['pattern', 'pattern', ...],
            selectorPrefixes: ['.', 'prefix', 'prefix', ...],
            selectorPostfixes: ['postfix', 'postfix', ...],
            rootProperties: function(spec) {
                return 'properties';
                // return null to ignore definition
            },
            nthProperties: function(spec, n) {
                return 'properties';
                // return null to ignore definition
            }
        }
    */
    var blueprints = {
        gridsponsive: {
            downstreamPattern: 'gridsponsiveAfter',
            selectorPrefixes: ['.'],
            rootProperties: function(spec) {
                return 'position:relative;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;-webkit-background-clip:padding;-moz-background-clip:padding;background-clip:padding-box;';
            }
        },
        gridsponsiveAfter: {
            selectorPrefixes: ['.'],
            selectorPostfixes: [':after'],
            rootProperties: function(spec) {
                return "content:'';display:block;clear:both;";
            }
        },
        html: {
            staticSelectors: ['html', 'body'],
            rootProperties: function(spec) {
                return 'margin:0px;width:100%;height:100% !important;height:auto;min-height:100%;';
            }
        },
        body: {
            upstreamPattern: 'html',
            selectorPrefixes: ['.gridsponsive.'],
            rootProperties: function(spec) {
                return 'position:relative;margin:0px;width:100%;height:auto !important;height:100%;min-height:100%;padding:0px;';
            }
        },
        bodyAfter: {
            selectorPatterns: ['body'],
            selectorPrefixes: ['.gridsponsive.'],
            selectorPostfixes: [':after'],
            rootProperties: function(spec) {
                return 'content:"";position:relative;display:block;clear:both;margin:0px;width:100%;height:_px;padding:0px;'.replace(/_/g, spec);
            },
            nthProperties: function(spec, n) {
                return 'height:_px;'.replace(/_/g, spec);
            }
        },
        footer: {
            upstreamPattern: 'bodyAfter',
            selectorPrefixes: ['.gridsponsive.'],
            rootProperties: function(spec) {
                return 'position:relative;display:block;clear:both;margin:-_px 0px 0px 0px;width:100%;height:_px;padding:0px;'.replace(/_/g, spec);
            },
            nthProperties: function(spec, n) {
                return 'margin-top:-_px;height:_px;'.replace(/_/g, spec);
            }
        },
        col: {
            downstreamPattern: 'colAfter',
            selectorPrefixes: ['.gridsponsive .'],
            rootProperties: function(spec) {
                return 'position:relative;display:block;float:left;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;-webkit-background-clip:padding;-moz-background-clip:padding;background-clip:padding-box;';
            }
        },
        colAfter: {
            selectorPrefixes: ['.gridsponsive .'],
            selectorPostfixes: [':after'],
            rootProperties: function(spec) {
                return "content:'';display:block;clear:both;";
            }
        }
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
                storageKey: 'com.yoursite.gridsponsive',
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