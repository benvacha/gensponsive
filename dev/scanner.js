/* esocss : github.com/esocode/esocss :: v0.0.1 : Mar 2014 :: esocode : esocode.com */

//
var esocss = esocss || {};

/*
*
*/
(function() {
	
	// key = str
	// return = [str, str, ...]
	function getStoredTokens(key) {
		var tokens = localStorage.getItem(key);
		return (tokens===null) ? [] : tokens.split(',');
	};
	
	// key = str :: tokens = [str, str, ...]
	function setStoredTokens(key, tokens) {
		localStorage.setItem(key, tokens.join(','));
	};
	
	// key = str
	function clearStoredTokens(key) {
		localStorage.removeItem(key);
	};
	
	// source = DOM element
	// return = [str, str, ...]
	function getLiveTokens(source) {
		var i, j, 
			tokens = [], 
			slug, slugs, 
			elements = source.getElementsByTagName('*');
		for(i=0; i<elements.length; i++) {
			slug = elements[i].className.trim();
			slugs = (slug==='') ? [] : slug.split(/[ ]+/);
			for(j=0; j<slugs.length; j++) {
				tokens.push(slugs[j]);
			}
		}
		return tokens;
	};
	
	// tokens1 = [str, str, ...] :: tokens2 = [str, str, ...]
	// return = [str, str, ...]
	function getUniqueTokens(tokens1, tokens2) {
		var i, 
			sorted = (tokens1 && tokens2) ? tokens1.concat(tokens2).sort() : tokens1.sort(), 
			unique = [], 
			lastToken;
		for(i=0; i<sorted.length; i++) {
			if(sorted[i] !== lastToken) {
				lastToken = sorted[i];
				unique.push(sorted[i]);
			}
		}
		return unique;
	};
	
	/*
	*
	*/
	
	// storageKey = null | str
	var scanner = function(storageKey) {
		this.storageKey = (storageKey) ? storageKey : 'esoCssScanner';
	};
	
	// source = null | dom element
	// return = [str, ...]
	scanner.prototype.scan = function(source) {
		var source = (source) ? source : document.body,
			liveTokens = getLiveTokens(source),
			uniqueTokens = getUniqueTokens(liveTokens, []);
		return uniqueTokens;
	}
	
	// source = null | dom element
	// return = [str, ...]
	scanner.prototype.report = function(source) {
		var source = (source) ? source : document.body,
			liveTokens = getLiveTokens(source),
			storedTokens = getStoredTokens(this.storageKey),
			uniqueTokens = getUniqueTokens(liveTokens, storedTokens);
		setStoredTokens(this.storageKey, uniqueTokens);
		return uniqueTokens;
	}
	
	// 
	scanner.prototype.clean = function() {
		clearStoredTokens(this.storageKey);
	}
	
	//
	esocss.scanner = scanner;
	
})();