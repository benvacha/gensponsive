/* esocss : github.com/esocode/esocss :: v0.0.1 : Mar 2014 :: esocode : esocode.com */

var scanner = new esocss.scanner(),
	sourceElement = document.body,
	projects = scanner.report(sourceElement);

var buildOrder = esocss.buildOrder,
	blueprints = esocss.blueprints,
	builder = new esocss.builder(buildOrder, blueprints);

var generator = new esocss.generator(),
	regions = [null, 960, 550],
	styleElement = document.getElementById('esocss'),
	outputElement = document.getElementById('esocssoutput'),
	css = generator.generate(builder, projects, regions);

if(styleElement) {
	generator.implement(styleElement, css);
}
if(outputElement) {
	generator.implement(outputElement, css);
}