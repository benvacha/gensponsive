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
        
    };
    
    // manage stored tags 
    var archiver = {
        
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
                showOutput: false
            }, options, $this.data('gridsponsive')));
            var data = $this.data('gridsponsive');
            
            /* */
            
            
                
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