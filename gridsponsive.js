/*  gridsponsive
**  Benjamin Vacha : github.com/benvacha
*/

 
(function( $ ){
    
    // order to build css
    var buildOrder = [
        'gridsponsive',
        'body',
        'footer',
        '_col', 'col',
        'clear',
        '_hide', '_show',
        '_pos',
        '_width', '_height',
        '_color', '_bgcolor',
        '_pad', '_padtb', '_padlr', '_padt', '_padr', '_padb', '_padl',
        '_push', '_pushtb', '_pushlr', '_pusht', '_pushr', '_pushb', '_pushl',
        'hide', 'show',
        'pos',
        'width', 'height',
        'color', 'bgcolor',
        'pad', 'padtb', 'padlr', 'padt',  'padr', 'padb', 'padl',
        'push', 'pushtb', 'pushlr', 'pusht', 'pushr', 'pushb', 'pushl'
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
                if(spec.indexOf('x')>=0) {
                    return 'content:"";position:relative;display:block;clear:both;margin:0px;width:100%;height:_px;padding:0px;'.replace(/_/g, spec.split('x').shift());
                }
                if(spec.indexOf('a')>=0) {
                    return 'content:"";position:relative;display:block;clear:both;margin:0px;width:100%;height:auto;padding:0px;'
                }
                return null;
            },
            nthProperties: function(spec, n) {
                if(spec.indexOf('x')>=0) {
                    return 'height:_px;'.replace(/_/g, spec.split('x').shift());
                }
                if(spec.indexOf('a')>=0) {
                    return 'height:auto;';
                }
                return null;
            }
        },
        footer: {
            upstreamPattern: 'bodyAfter',
            selectorPrefixes: ['.gridsponsive.'],
            rootProperties: function(spec) {
                if(spec.indexOf('x')>=0) {
                    return 'position:relative;display:block;clear:both;margin:-_px 0px 0px 0px;width:100%;height:_px;padding:0px;'.replace(/_/g, spec.split('x').shift());
                }
                if(spec.indexOf('a')>=0) {
                    return 'position:relative;display:block;clear:both;margin:0px 0px 0px 0px;width:100%;height:auto;padding:0px;';
                }
                return null;
            },
            nthProperties: function(spec, n) {
                if(spec.indexOf('x')>=0) {
                    return 'margin-top:-_px;height:_px;'.replace(/_/g, spec.split('x').shift());
                }
                if(spec.indexOf('a')>=0) {
                    return 'margin-top:0px;height:auto;';
                }
                return null;
            }
        },
        col: {
            downstreamPattern: 'colAfter',
            selectorPrefixes: ['.gridsponsive .'],
            rootProperties: function(spec) {
                return 'position:relative;display:block;float:left;margin:0px;padding:0px;list-style:none;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;-webkit-background-clip:padding;-moz-background-clip:padding;background-clip:padding-box;';
            }
        },
        _col: {
            downstreamPattern: '_colAfter',
            selectorPrefixes: ['.gridsponsive.', '.gridsponsive .'],
            selectorPostfixes: ['>div', '>ul', '>li'],
            rootProperties: function(spec) {
                return 'position:relative;display:block;float:left;margin:0px;padding:0px;list-style:none;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;-webkit-background-clip:padding;-moz-background-clip:padding;background-clip:padding-box;';
            }
        },
        colAfter: {
            selectorPrefixes: ['.gridsponsive .'],
            selectorPostfixes: [':after'],
            rootProperties: function(spec) {
                return "content:'';display:block;clear:both;";
            }
        },
        _colAfter: {
            selectorPrefixes: ['.gridsponsive.', '.gridsponsive .'],
            selectorPostfixes: ['>div:after', '>ul:after', '>li:after'],
            rootProperties: function(spec) {
                return "content:'';display:block;clear:both;";
            }
        },
        clear: {
            selectorPrefixes: ['.gridsponsive .'],
            nthProperties: function(spec, n) {
                if(spec.indexOf('x')>=0) {
                    return 'clear:both;height:_px;'.replace(/_/g, spec.split('x').shift());
                }
                if(spec.indexOf('f')>=0) {
                    return 'clear:none;height:0px;';
                }
                return 'clear:both;height:_%;'.replace(/_/g, spec);
            }
        },
        hide: {
            selectorPrefixes: ['.gridsponsive.', '.gridsponsive .'],
            nthProperties: function(spec, n) {
                if(spec.indexOf('t')>=0) {
                    return 'display:none;';
                }
                if(spec.indexOf('f')>=0) {
                    return 'display:block;';
                }
                return null;
            }
        },
        _hide: {
            selectorPrefixes: ['.gridsponsive.', '.gridsponsive .'],
            selectorPostfixes: ['>div', '>ul', '>li'],
            nthProperties: function(spec, n) {
                if(spec.indexOf('t')>=0) {
                    return 'display:none;';
                }
                if(spec.indexOf('f')>=0) {
                    return 'display:block;';
                }
                return null;
            }
        },
        show: {
            selectorPrefixes: ['.gridsponsive.', '.gridsponsive .'],
            nthProperties: function(spec, n) {
                if(spec.indexOf('t')>=0) {
                    return 'display:block;';
                }
                if(spec.indexOf('f')>=0) {
                    return 'display:none;';
                }
                return null;
            }
        },
        _show: {
            selectorPrefixes: ['.gridsponsive.', '.gridsponsive .'],
            selectorPostfixes: ['>div', '>ul', '>li'],
            nthProperties: function(spec, n) {
                if(spec.indexOf('t')>=0) {
                    return 'display:block;';
                }
                if(spec.indexOf('f')>=0) {
                    return 'display:none;';
                }
                return null;
            }
        },
        pos: {
            selectorPrefixes: ['.gridsponsive.', '.gridsponsive .'],
            nthProperties: function(spec, n) {
                if(spec.indexOf('l')>=0) {
                    return 'float:left;';
                }
                if(spec.indexOf('r')>=0) {
                    return 'float:right;';
                }
                if(spec.indexOf('c')>=0) {
                    return 'float:none;margin-left:auto;margin-right:auto;';
                }
                return null;
            }
        },
        _pos: {
            selectorPrefixes: ['.gridsponsive.', '.gridsponsive .'],
            selectorPostfixes: ['>div', '>ul', '>li'],
            nthProperties: function(spec, n) {
                if(spec.indexOf('l')>=0) {
                    return 'float:left;';
                }
                if(spec.indexOf('r')>=0) {
                    return 'float:right;';
                }
                if(spec.indexOf('c')>=0) {
                    return 'float:none;margin-left:auto;margin-right:auto;';
                }
                return null;
            }
        },
        width: {
            selectorPrefixes: ['.gridsponsive.', '.gridsponsive .'],
            nthProperties: function(spec, n) {
                if(spec.indexOf('a')>=0) {
                    return 'width:auto;';
                }
                if(spec.indexOf('x')>=0) {
                    return 'width:_px;'.replace(/_/g, spec.split('x').shift());
                }
                return 'width:_%;'.replace(/_/g, spec);
            }
        },
        _width: {
            selectorPrefixes: ['.gridsponsive.', '.gridsponsive .'],
            selectorPostfixes: ['>div', '>ul', '>li'],
            nthProperties: function(spec, n) {
                if(spec.indexOf('a')>=0) {
                    return 'width:auto;';
                }
                if(spec.indexOf('x')>=0) {
                    return 'width:_px;'.replace(/_/g, spec.split('x').shift());
                }
                return 'width:_%;'.replace(/_/g, spec);
            }
        },
        height: {
            selectorPrefixes: ['.gridsponsive.', '.gridsponsive .'],
            nthProperties: function(spec, n) {
                if(spec.indexOf('a')>=0) {
                    return 'height:auto;';
                }
                if(spec.indexOf('x')>=0) {
                    return 'height:_px;'.replace(/_/g, spec.split('x').shift());
                }
                return 'height:_%;'.replace(/_/g, spec);
            }
        },
        _height: {
            selectorPrefixes: ['.gridsponsive.', '.gridsponsive .'],
            selectorPostfixes: ['>div', '>ul', '>li'],
            nthProperties: function(spec, n) {
                if(spec.indexOf('a')>=0) {
                    return 'height:auto;';
                }
                if(spec.indexOf('x')>=0) {
                    return 'height:_px;'.replace(/_/g, spec.split('x').shift());
                }
                return 'height:_%;'.replace(/_/g, spec);
            }
        },
        color: {
            selectorPrefixes: ['.gridsponsive.', '.gridsponsive .'],
            nthProperties: function(spec, n) {
                if(spec.indexOf('t')>=0) {
                    return 'color:transparent;';
                }
                return 'color:#_;'.replace(/_/g, spec);
            }
        },
        _color: {
            selectorPrefixes: ['.gridsponsive.', '.gridsponsive .'],
            selectorPostfixes: ['>div', '>ul', '>li'],
            nthProperties: function(spec, n) {
                if(spec.indexOf('t')>=0) {
                    return 'color:transparent;';
                }
                return 'color:#_;'.replace(/_/g, spec);
            }
        },
        bgcolor: {
            selectorPrefixes: ['.gridsponsive.', '.gridsponsive .'],
            nthProperties: function(spec, n) {
                if(spec.indexOf('t')>=0) {
                    return 'background-color:transparent;';
                }
                return 'background-color:#_;'.replace(/_/g, spec);
            }
        },
        _bgcolor: {
            selectorPrefixes: ['.gridsponsive.', '.gridsponsive .'],
            selectorPostfixes: ['>div', '>ul', '>li'],
            nthProperties: function(spec, n) {
                if(spec.indexOf('t')>=0) {
                    return 'background-color:transparent;';
                }
                return 'background-color:#_;'.replace(/_/g, spec);
            }
        },
        pad: {
            selectorPrefixes: ['.gridsponsive.', '.gridsponsive .'],
            nthProperties: function(spec, n) {
                if(spec.indexOf('x')>=0) {
                    return 'padding:_px;'.replace(/_/g, spec.split('x').shift());
                }
                return 'padding:_%;'.replace(/_/g, spec);
            }
        },
        _pad: {
            selectorPrefixes: ['.gridsponsive.', '.gridsponsive .'],
            selectorPostfixes: ['>div', '>ul', '>li'],
            nthProperties: function(spec, n) {
                if(spec.indexOf('x')>=0) {
                    return 'padding:_px;'.replace(/_/g, spec.split('x').shift());
                }
                return 'padding:_%;'.replace(/_/g, spec);
            }
        },
        padtb: {
            selectorPrefixes: ['.gridsponsive.', '.gridsponsive .'],
            nthProperties: function(spec, n) {
                if(spec.indexOf('x')>=0) {
                    return 'padding-top:_px;padding-bottom:_px;'.replace(/_/g, spec.split('x').shift());
                }
                return 'padding-top:_%;padding-bottom:_px;'.replace(/_/g, spec);
            }
        },
        _padtb: {
            selectorPrefixes: ['.gridsponsive.', '.gridsponsive .'],
            selectorPostfixes: ['>div', '>ul', '>li'],
            nthProperties: function(spec, n) {
                if(spec.indexOf('x')>=0) {
                    return 'padding-top:_px;padding-bottom:_px;'.replace(/_/g, spec.split('x').shift());
                }
                return 'padding-top:_%;padding-bottom:_px;'.replace(/_/g, spec);
            }
        },
        padlr: {
            selectorPrefixes: ['.gridsponsive.', '.gridsponsive .'],
            nthProperties: function(spec, n) {
                if(spec.indexOf('x')>=0) {
                    return 'padding-left:_px;padding-right:_px;'.replace(/_/g, spec.split('x').shift());
                }
                return 'padding-left:_%;padding-right:_%;'.replace(/_/g, spec);
            }
        },
        _padlr: {
            selectorPrefixes: ['.gridsponsive.', '.gridsponsive .'],
            selectorPostfixes: ['>div', '>ul', '>li'],
            nthProperties: function(spec, n) {
                if(spec.indexOf('x')>=0) {
                    return 'padding-left:_px;padding-right:_px;'.replace(/_/g, spec.split('x').shift());
                }
                return 'padding-left:_%;padding-right:_%;'.replace(/_/g, spec);
            }
        },
        padt: {
            selectorPrefixes: ['.gridsponsive.', '.gridsponsive .'],
            nthProperties: function(spec, n) {
                if(spec.indexOf('x')>=0) {
                    return 'padding-top:_px;'.replace(/_/g, spec.split('x').shift());
                }
                return 'padding-top:_%;'.replace(/_/g, spec);
            }
        },
        _padt: {
            selectorPrefixes: ['.gridsponsive.', '.gridsponsive .'],
            selectorPostfixes: ['>div', '>ul', '>li'],
            nthProperties: function(spec, n) {
                if(spec.indexOf('x')>=0) {
                    return 'padding-top:_px;'.replace(/_/g, spec.split('x').shift());
                }
                return 'padding-top:_%;'.replace(/_/g, spec);
            }
        },
        padr: {
            selectorPrefixes: ['.gridsponsive.', '.gridsponsive .'],
            nthProperties: function(spec, n) {
                if(spec.indexOf('x')>=0) {
                    return 'padding-right:_px;'.replace(/_/g, spec.split('x').shift());
                }
                return 'padding-right:_%;'.replace(/_/g, spec);
            }
        },
        _padr: {
            selectorPrefixes: ['.gridsponsive.', '.gridsponsive .'],
            selectorPostfixes: ['>div', '>ul', '>li'],
            nthProperties: function(spec, n) {
                if(spec.indexOf('x')>=0) {
                    return 'padding-right:_px;'.replace(/_/g, spec.split('x').shift());
                }
                return 'padding-right:_%;'.replace(/_/g, spec);
            }
        },
        padb: {
            selectorPrefixes: ['.gridsponsive.', '.gridsponsive .'],
            nthProperties: function(spec, n) {
                if(spec.indexOf('x')>=0) {
                    return 'padding-bottom:_px;'.replace(/_/g, spec.split('x').shift());
                }
                return 'padding-bottom:_%;'.replace(/_/g, spec);
            }
        },
        _padb: {
            selectorPrefixes: ['.gridsponsive.', '.gridsponsive .'],
            selectorPostfixes: ['>div', '>ul', '>li'],
            nthProperties: function(spec, n) {
                if(spec.indexOf('x')>=0) {
                    return 'padding-bottom:_px;'.replace(/_/g, spec.split('x').shift());
                }
                return 'padding-bottom:_%;'.replace(/_/g, spec);
            }
        },
        padl: {
            selectorPrefixes: ['.gridsponsive.', '.gridsponsive .'],
            nthProperties: function(spec, n) {
                if(spec.indexOf('x')>=0) {
                    return 'padding-left:_px;'.replace(/_/g, spec.split('x').shift());
                }
                return 'padding-left:_%;'.replace(/_/g, spec);
            }
        },
        _padl: {
            selectorPrefixes: ['.gridsponsive.', '.gridsponsive .'],
            selectorPostfixes: ['>div', '>ul', '>li'],
            nthProperties: function(spec, n) {
                if(spec.indexOf('x')>=0) {
                    return 'padding-left:_px;'.replace(/_/g, spec.split('x').shift());
                }
                return 'padding-left:_%;'.replace(/_/g, spec);
            }
        },
        push: {
            selectorPrefixes: ['.gridsponsive.', '.gridsponsive .'],
            nthProperties: function(spec, n) {
                if(spec.indexOf('x')>=0) {
                    return 'border:_px solid transparent;'.replace(/_/g, spec.split('x').shift());
                }
                return 'border:_% solid transparent;'.replace(/_/g, spec);
            }
        },
        _push: {
            selectorPrefixes: ['.gridsponsive.', '.gridsponsive .'],
            selectorPostfixes: ['>div', '>ul', '>li'],
            nthProperties: function(spec, n) {
                if(spec.indexOf('x')>=0) {
                    return 'border:_px solid transparent;'.replace(/_/g, spec.split('x').shift());
                }
                return 'border:_% solid transparent;'.replace(/_/g, spec);
            }
        },
        pushtb: {
            selectorPrefixes: ['.gridsponsive.', '.gridsponsive .'],
            nthProperties: function(spec, n) {
                if(spec.indexOf('x')>=0) {
                    return 'border-top:_px solid transparent;border-bottom:_px solid transparent'.replace(/_/g, spec.split('x').shift());
                }
                return 'border-top:_% solid transparent;border-bottom:_% solid transparent'.replace(/_/g, spec);
            }
        },
        _pushtb: {
            selectorPrefixes: ['.gridsponsive.', '.gridsponsive .'],
            selectorPostfixes: ['>div', '>ul', '>li'],
            nthProperties: function(spec, n) {
                if(spec.indexOf('x')>=0) {
                    return 'border-top:_px solid transparent;border-bottom:_px solid transparent'.replace(/_/g, spec.split('x').shift());
                }
                return 'border-top:_% solid transparent;border-bottom:_% solid transparent'.replace(/_/g, spec);
            }
        },
        pushlr: {
            selectorPrefixes: ['.gridsponsive.', '.gridsponsive .'],
            nthProperties: function(spec, n) {
                if(spec.indexOf('x')>=0) {
                    return 'border-left:_px solid transparent;border-right:_px solid transparent'.replace(/_/g, spec.split('x').shift());
                }
                return 'border-left:_% solid transparent;border-right:_% solid transparent'.replace(/_/g, spec);
            }
        },
        _pushlr: {
            selectorPrefixes: ['.gridsponsive.', '.gridsponsive .'],
            selectorPostfixes: ['>div', '>ul', '>li'],
            nthProperties: function(spec, n) {
                if(spec.indexOf('x')>=0) {
                    return 'border-left:_px solid transparent;border-right:_px solid transparent'.replace(/_/g, spec.split('x').shift());
                }
                return 'border-left:_% solid transparent;border-right:_% solid transparent'.replace(/_/g, spec);
            }
        },
        pusht: {
            selectorPrefixes: ['.gridsponsive.', '.gridsponsive .'],
            nthProperties: function(spec, n) {
                if(spec.indexOf('x')>=0) {
                    return 'border-top:_px solid transparent;'.replace(/_/g, spec.split('x').shift());
                }
                return 'border-top:_% solid transparent;'.replace(/_/g, spec);
            }
        },
        _pusht: {
            selectorPrefixes: ['.gridsponsive.', '.gridsponsive .'],
            selectorPostfixes: ['>div', '>ul', '>li'],
            nthProperties: function(spec, n) {
                if(spec.indexOf('x')>=0) {
                    return 'border-top:_px solid transparent;'.replace(/_/g, spec.split('x').shift());
                }
                return 'border-top:_% solid transparent;'.replace(/_/g, spec);
            }
        },
        pushr: {
            selectorPrefixes: ['.gridsponsive.', '.gridsponsive .'],
            nthProperties: function(spec, n) {
                if(spec.indexOf('x')>=0) {
                    return 'border-right:_px solid transparent;'.replace(/_/g, spec.split('x').shift());
                }
                return 'border-right:_% solid transparent;'.replace(/_/g, spec);
            }
        },
        _pushr: {
            selectorPrefixes: ['.gridsponsive.', '.gridsponsive .'],
            selectorPostfixes: ['>div', '>ul', '>li'],
            nthProperties: function(spec, n) {
                if(spec.indexOf('x')>=0) {
                    return 'border-right:_px solid transparent;'.replace(/_/g, spec.split('x').shift());
                }
                return 'border-right:_% solid transparent;'.replace(/_/g, spec);
            }
        },
        pushb: {
            selectorPrefixes: ['.gridsponsive.', '.gridsponsive .'],
            nthProperties: function(spec, n) {
                if(spec.indexOf('x')>=0) {
                    return 'border-bottom:_px solid transparent;'.replace(/_/g, spec.split('x').shift());
                }
                return 'border-bottom:_% solid transparent;'.replace(/_/g, spec);
            }
        },
        _pushb: {
            selectorPrefixes: ['.gridsponsive.', '.gridsponsive .'],
            selectorPostfixes: ['>div', '>ul', '>li'],
            nthProperties: function(spec, n) {
                if(spec.indexOf('x')>=0) {
                    return 'border-bottom:_px solid transparent;'.replace(/_/g, spec.split('x').shift());
                }
                return 'border-bottom:_% solid transparent;'.replace(/_/g, spec);
            }
        },
        pushl: {
            selectorPrefixes: ['.gridsponsive.', '.gridsponsive .'],
            nthProperties: function(spec, n) {
                if(spec.indexOf('x')>=0) {
                    return 'border-left:_px solid transparent;'.replace(/_/g, spec.split('x').shift());
                }
                return 'border-left:_% solid transparent;'.replace(/_/g, spec);
            }
        },
        _pushl: {
            selectorPrefixes: ['.gridsponsive.', '.gridsponsive .'],
            selectorPostfixes: ['>div', '>ul', '>li'],
            nthProperties: function(spec, n) {
                if(spec.indexOf('x')>=0) {
                    return 'border-left:_px solid transparent;'.replace(/_/g, spec.split('x').shift());
                }
                return 'border-left:_% solid transparent;'.replace(/_/g, spec);
            }
        }
    };
    
    // scan source for unique tags
    var scanner = {
        // get array of unique sorted class definitions
        scan: function($source) {
            var i, j, slug, slugs = [], tokens, allTokens = [],
                lastToken, uniqueTokens = [];
            // get all class attributes
            $source.find('.gridsponsive').each(function() {
                slug = $(this).attr('class');
                if(slug) slugs.push(slug);
                $(this).find('*').each(function() {
                    slug = $(this).attr('class');
                    if(slug) slugs.push(slug);
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
        // build the css for the pattern, definitions, spec, and depth
        build: function(pattern, definitions, spec, depth) {
            var css = '',
                upstreamPattern = builder.getUpstreamPattern(blueprints[pattern]),
                downstreamPattern = builder.getDownstreamPattern(blueprints[pattern]),
                selectors = builder.getSelectors(blueprints[pattern], definitions),
                properties = builder.getProperties(blueprints[pattern], spec, depth);
            if(upstreamPattern) {
                css += builder.build(upstreamPattern, definitions, spec, depth);
            }
            if(selectors && properties) {
                css += selectors + ' {' + properties + '}';
            }
            if(downstreamPattern) {
                css += builder.build(downstreamPattern, definitions, spec, depth);
            }
            return css;
        },
        // get the upstream pattern for the blueprint
        getUpstreamPattern: function(blueprint) {
            return (blueprint && blueprint.upstreamPattern) ? blueprint.upstreamPattern : null;
        },
        // get the downstream pattern for the blueprint
        getDownstreamPattern: function(blueprint) {
            return (blueprint && blueprint.downstreamPattern) ? blueprint.downstreamPattern : null;
        },
        // get the combinations of selectors described by the blueprint
        getSelectors: function(blueprint, definitions) {
            var i, j, k, prefixes, postfixes,
                projects = definitions, selectors = [];
            // add static selectors
            if(blueprint && blueprint.staticSelectors) {
                selectors = blueprint.staticSelectors;
            }
            // projects are the statically defined patterns if defined
            if(blueprint && blueprint.selectorPatterns) {
                projects = blueprint.selectorPatterns;
            }
            // create all possible combinations of projects, prefixes, and postfixes
            prefixes = (blueprint && blueprint.selectorPrefixes) ? blueprint.selectorPrefixes : null;
            postfixes = (blueprint && blueprint.selectorPostfixes) ? blueprint.selectorPostfixes : null;
            if(prefixes && postfixes) {
                for(i=0; i<projects.length; i++) {
                    for(j=0; j<prefixes.length; j++) {
                        for(k=0; k<postfixes.length; k++) {
                            selectors.push(prefixes[j] + projects[i] + postfixes[k]);
                        }
                    }
                }
            } else if(prefixes) {
                for(i=0; i<projects.length; i++) {
                    for(j=0; j<prefixes.length; j++) {
                        selectors.push(prefixes[j] + projects[i]);
                    }
                }
            } else if(postfixes) {
                for(i=0; i<projects.length; i++) {
                    for(j=0; j<postfixes.length; j++) {
                        selectors.push(projects[i] + postfixes[j]);
                    }
                }
            }
            // return CSV string or null
            if(selectors.length) {
                return selectors.join(', ');
            } else {
                return null;
            }
        },
        // get the properties for the spec and depth
        getProperties: function(blueprint, spec, depth) {
            if(depth === 0 && blueprint && blueprint.rootProperties) {
                return blueprint.rootProperties(spec);
            } else if(blueprint && blueprint.nthProperties) {
                return blueprint.nthProperties(spec, depth);
            }
            return null;
        },
        // return the clusters based on patterns and depth
        getClusters: function(definitions, depth) {
            var i, pattern, specs,
                clusters = {};
            // for each defintion, split it into tokens, if a token exits for the
            // requested depth add the definition to the cluster based on pattern and spec
            for(i=0; i<definitions.length; i++) {
                specs = definitions[i].split('-');
                pattern = specs.shift();
                if(depth === 0 || specs[depth]) {
                    if(!clusters[pattern]) {
                        clusters[pattern] = {};
                    }
                    if(!clusters[pattern][specs[depth]]) {
                        clusters[pattern][specs[depth]] = [];
                    }
                    clusters[pattern][specs[depth]].push(definitions[i]);
                }
            }
            // clusters = {pattern1: {spec1: [definitions], spec2: [defintions]}, pattern2: ...}
            return clusters;
        },
        // return the media query for the cutoff
        // if cutoff is null return null
        getMediaQuery: function(cutoff) {
            if(cutoff) {
                return '@media screen and (max-width:' + cutoff + 'px)';
            }
            return null;
        },
        // return the css for the clusters at the depth
        // return null if no css for depth
        getCss: function(clusters, depth) {
            var i, j, css = '',
                pattern, cluster, definitions, spec;
            //
            for(i=0; i<buildOrder.length; i++) {
                pattern = buildOrder[i];
                cluster = clusters[pattern];
                for(spec in cluster) {
                    definitions = cluster[spec];
                    css += builder.build(pattern, definitions, spec, depth);
                }
            }
            //
            return css;
        }
    };
    
    // generate the minified css
    var generator = {
        // generate and return the minified css
        generate: function(cutoffs, definitions) {
            var i, j, css = '/* Generated using github.com/benvacha/gridsponsive */ ', 
                regions, regionQuery, regionClusters, regionCss;
            // for each region create the query and css
            regions = [null].concat(cutoffs);
            for(i=0; i<regions.length; i++) {
                regionQuery = builder.getMediaQuery(regions[i]);
                regionClusters = builder.getClusters(definitions, i);
                regionCss = builder.getCss(regionClusters, i);
                if(regionQuery && regionCss) {
                    css += regionQuery + ' {' + regionCss + '}';
                } else if(regionCss) {
                    css += regionCss;
                }
            }
            // return the collective css for each region
            return css;
        }
    };
    
    // output the css into the dom
    var outputter = {
        // output the css to a style element
        outputStyle: function(element, css) {
            $(element).append(css);
            // force webkit browser to redraw
            $('body').hide().show(0);
        },
        // create an output element that the css can be copied from
        output: function(css) {
            var $outputter = $('<div />').css({
                    position: 'fixed',
                    top: '0px', left: '0px',
                    width: '100%', height: '100%'
                }),
                $blackout = $('<div />').css({
                    position: 'absolute',
                    top: '0px', left: '0px',
                    width: '100%', height: '100%',
                    backgroundColor: 'rgba(0,0,0,.75)'
                }),
                $output = $('<textarea />').css({
                    position: 'absolute',
                    top: '10%', left: '15%',
                    width: '70%', height: '50%',
                    padding: '15px',
                    backgroundColor: '#FFF', outline: 'none',
                    WebkitBorderRadius: '10px', MozBoxShadow: '10px', borderRadius: '10px', 
                    WebkitBoxShadow: '3px 3px 10px rgba(0,0,0,.75)', MozBoxShadow: '3px 3px 10px rgba(0,0,0,.75)',
                    WebkitBoxSizing: 'border-box', MozBoxSizing: 'border-box',
                    boxShadow: '3px 3px 10px rgba(0,0,0,.75)', boxSizing: 'border-box'
                });
            $output.val(css);
            $outputter.append($blackout).append($output);
            $('body').append($outputter);
        }
    };
    
    // plugin public methods
    var methods = {
        // initialize the plugin for each matched element
        init : function( options ) { return this.each(function(){
            var $this = $(this);
            $this.data('gridsponsive', $.extend( {
                styleElement: '#gridsponsive',
                cutoffs: [960, 550],
                showOutput: false,
                storageKey: 'com.yoursite.gridsponsive',
                stateless: false
            }, options, $this.data('gridsponsive')));
            var data = $this.data('gridsponsive');
            
            /* */
            
            var liveDefs, uniqueDefs, css;
            liveDefs = scanner.scan($this);
            uniqueDefs = archiver.update(data.storageKey, liveDefs, data.stateless);
            css = generator.generate(data.cutoffs, uniqueDefs);
            outputter.outputStyle(data.styleElement, css);
            if(data.showOutput) outputter.output(css);
            
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