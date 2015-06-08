/* esocss : github.com/esocode/esocss :: v0.0.1 : Mar 2014 :: esocode : esocode.com */

//
var esocss = esocss || {};

/*
*
*/
(function() {
	
	// bluprint = object
	// return = str || null ? no blueprint or upstream pattern
	function getUpstreamPattern(blueprint) {
		if(blueprint && blueprint.upstreamPattern) {
			return blueprint.upstreamPattern;
		}
		return null;
	}
	
	// bluprint = object
	// return = str || null ? no blueprint or downstream pattern
	function getDownstreamPattern(blueprint) {
		if(blueprint && blueprint.downstreamPattern) {
			return blueprint.downstreamPattern;
		}
		return null;
	}
	
	// blueprint = {} :: projects = [str, str, ...]
	// return = str :: return = null ? no selectors
	function getSelectors(blueprint, projects) {
		var i, j, k, selectors = [];
		if(blueprint && blueprint.staticSelectors) {
			selectors = blueprint.staticSelectors;
		}
		if(blueprint && blueprint.selectorPrefixes && blueprint.selectorPostfixes) {
			for(i=0; i<projects.length; i++) {
				for(j=0; j<blueprint.selectorPrefixes.length; j++) {
					for(k=0; k<blueprint.selectorPostfixes.length; k++) {
						selectors.push(blueprint.selectorPrefixes[j] + projects[i] + blueprint.selectorPostfixes[k]);
					}
				}
			}
		} else if(blueprint && blueprint.selectorPrefixes) {
			for(i=0; i<projects.length; i++) {
				for(j=0; j<blueprint.selectorPrefixes.length; j++) {
					selectors.push(blueprint.selectorPrefixes[j] + projects[i]);
				}
			}
		} else if(blueprint && blueprint.selectorPostfixes) {
			for(i=0; i<projects.length; i++) {
				for(j=0; j<blueprint.selectorPostfixes.length; j++) {
					selectors.push(projects[i] + blueprint.selectorPostfixes[j]);
				}
			}
		}
		if(selectors.length !== 0) {
			return selectors.join(', ');
		} else {
			return null;
		}
	}
	
	// blueprint = {} :: spec = int | str :: depth = int
	// return = str :: return = null ? no properties for spec and depth
	function getProperties(blueprint, spec, depth) {
		if(depth === 0 && blueprint && blueprint.rootProperties) {
			return blueprint.rootProperties(spec);
		} else if(blueprint && blueprint.nthProperties) {
			return blueprint.nthProperties(spec, depth);
		}
		return null;
	}
	
	/*
	*
	*/
	
	// blueprints = null | {}
	var builder = function(buildOrder, blueprints) {
		this.buildOrder = (buildOrder) ? buildOrder : [];
		this.blueprints = (blueprints) ? blueprints : {};
	};
	
	// pattern = str :: projects = [str, str, ...] :: spec = int | str :: depth = int
	// return = str
	builder.prototype.build = function(pattern, projects, spec, depth) {
		var css = '',
			upstreamPattern = getUpstreamPattern(this.blueprints[pattern]),
			downstreamPattern = getDownstreamPattern(this.blueprints[pattern]),
			selectors = getSelectors(this.blueprints[pattern], projects),
			properties = getProperties(this.blueprints[pattern], spec, depth);
		if(upstreamPattern) {
			css += this.build(upstreamPattern, projects, spec, depth);
		}
		if(selectors && properties) {
			css += selectors + ' {' + properties + '}';
		}
		if(downstreamPattern) {
			css += this.build(downstreamPattern, projects, spec, depth);
		}
		return css;
	};
	
	//
	esocss.builder = builder;
	
})();