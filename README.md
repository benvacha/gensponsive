esoCss
======

A dynamically generated standards based CSS responsive grid system with goodies. Allows you to define custom responsive behaviors by simply writing class names. Unique class names are cached between pages and minimized CSS definitions are generated and applied to the page in seamless real time. 

### Note
**This project has been depreciated.** Please see the new [gensponsive](https://github.com/benvacha/gensponsive) project.

---
### Compatability
esoCss is tested in all modern desktop browsers, iOS, and android to ensure proper and consistent operation.

### Javascript
esoCss requires javascript (not jQuery) during the development phase. Once development is complete, the minimized CSS should be saved to a static CSS file and served in place of using esoCss. Javascript is no longer required once the static CSS has been saved.

---
### Importing

#### esocss.min.js
```html
<head>
  <script type="text/javascript" src="pathtofile/esocss.min.js"></script>
  <style type="text/css" id="esocss"></style>
</head>
```

#### esocss.go.js
```html
<body>
  <!--- The content of the page --->
  <script type="text/javascript" src="pathtofile/esocss.go.js"></script>
</body>
```

---
### Usage

#### Setup
 * Add esocss.min.js to the head of each page
 * Add a style tag with id 'esocss' to the head of each page
 * Add your own stylesheets after the 'esocss' style tag
 * Add esocss.go.js to the end of the body tag of each page

#### Development
 * Write class names and develop your pages
 * Unique class names are automagically cached for all pages you navigate to that have esoCss

#### Output
 * Create a page that imports esoCSS and has a visible element with id 'esocssoutput'
 * Navigate to every page that uses esoCss to ensure all current class names are cached
 * Navigate to the page with the 'esocssoutput' element to see the raw css

#### Production
 * Copy the raw css from the output and save it to a static css file
 * Remove the esoCss imports and style tag
 * Import the static css file you created

---
### Regions
A region is essCss is defined by the boundry of the previous region and a boundry on the width. Region boundries are used to generate the media query tags that define responsive behavior as the browser width is reduced. By default the boundries are [null, 960, 500]. The null boundry is for definitions applied to infinite width (desktop). When the browser width decreases below 960 the second region is applied (tablet). When the browser width decreases below 550 the third region is applied (phone).

Any number of regions can be defined with any integer value for the boundries by altering the value in the esocss.go.js. The first region boundry should be null, and should be the only null, for correct behavior.

---
### Class Definitions
A class is composed of two sections, the pattern and the specifications.

The pattern defines what general behavior is applied by the class. Current patterns are defined below.

Specifications are what dynamic value should be applied for that region. A specification can be defined for each region or for a subset of the regions, with the last specification cascading to the remaining regions. Acceptable specifications for each pattern are defined below.

```html
<!-- All examples assume the default regions of [null, 960, 550] -->

<!-- Will apply a width of 25% to the null, 960, and 550 regions -->
<div class="width-25"></div>

<!-- Will apply a width of 25% to the null region, and 50% to the 960 and 550 regions -->
<div class="width-25-50"></div>

<!-- Will apply a width of 25%, 50%, and 100% to the regions respectively -->
<div class="width-25-50-100"></div>

<!-- Will apply right align to null region, and center align to 960 and 550 regions -->
<div class="pos-r-c"></div>
```

---
### Patterns

| Pattern      | Values      | Description                                                                    |
|--------------|-------------|--------------------------------------------------------------------------------|
| body         |             | sets the page width and height to fill the entire browser window               |
| footer       | int         | creates a sticky footer                                                        |
| footerspacer |             | should be used along with the footer                                           |
| grid         |             | sets the element to behave as a grid                                           |
| col          |             | sets the element to behave as a column                                         |
| clear        | f, int      | if f then 0 height and no clear, if integer then clear and have integer height |
| hide         | t, f        | if t then hide the element, if f then show the element                         |
| show         | t, f        | if t then show the element, if f then hide the element                         |
| pos          | l, r, c     | l is left align element, r is right align element, c is left align element     |
| width        | int, intx   | element has (int)% width, element has (intx)px width                           |
| height       | int, intx   | element has (int)% height, element has (intx)px height                         |
| color        | hex         | element has #hex text color                                                    |
| bgcolor      | hex         | element has #hex background color                                              |
| pad          | int         | element has (integer)px padding on all sides                                   |
| padtb        | int         | element has (integer)px padding on top and bottom                              |
| padlr        | int         | element has (integer)px padding on left and right                              |
| padt         | int         | element has (integer)px padding on top                                         |
| padr         | int         | element has (integer)px padding on right                                       |
| padb         | int         | element has (integer)px padding on bottom                                      |
| padl         | int         | element has (integer)px padding on left                                        |
| push         | int         | element has (integer)px 'margin' on all sides                                  |
| pushtb       | int         | element has (integer)px 'margin' on top and bottom                             |
| pushlr       | int         | element has (integer)px 'margin' on left and right                             |
| pusht        | int         | element has (integer)px 'margin' on top                                        |
| pushr        | int         | element has (integer)px 'margin' on right                                      |
| pushb        | int         | element has (integer)px 'margin' on bottom                                     |
| pushl        | int         | element has (integer)px 'margin' on left                                       |
