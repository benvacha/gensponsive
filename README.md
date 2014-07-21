gridsponsive
============

A dynamically generated standards based accessible CSS responsive grid system. Allowing developers to define custom responsive behaviors by simply writing class names. Unique class names are cached between pages and minimized CSS definitions are generated and applied to the page in seamless real time.

---
### Compatability
gridsponsive is tested in all modern desktop, iOS, and android browsers to ensure proper and consistent operation.

### Javascript
gridsponsive requires javascript and jQuery during the development phase. Once development is complete, the minimized CSS should be saved to a static CSS file and served in place of using gridsponsive.

---
### Development Usage
```html
<head>
  <script type="text/javascript" src="pathtofile/jquery.js"></script>
  <script type="text/javascript" src="pathtofile/gridsponsive.js"></script>
  <style type="text/css" id="gridsponsive"></style>
  <script type="text/javascript">
    $(document).ready(function() {
      $('body').gridsponsive({
        styleId: 'gridsponsive',
        cutoffs: [960, 550],
        showOutput: false,
        storageKey: 'com.yoursite.gridsponsive',
        stateless: false
      });
    });
  </script>
```

---
### Cutoffs and Regions
Cutoffs are used to define regions in gridsponsive. A cutoff describes an integer width of the browser. By default cutoffs are defined at 960 px and 550 px. This creates 3 regions; width greater than 960 px (desktop), width less than 960 px but greater than 550 px (tablet), and width less than 550 px (phone). These regions are then applied as media queries in the resulting CSS and applied in cascading order from largest to smallest.

Any number of cutoffs can be defined with any integer values to customize behavior to your layout.

---
### Class Definitions
A class name is composed of two sections, the pattern and the specifications.

The pattern defines what general behavior is applied by the class. Patterns are defined below and include things such as width, widthx, and height.

Specifications are what dynamic values should be applied for that region. A specification can be defined for each region or for a subset of the regions, with the last defined specification cascading to the remaining regions. Acceptable specifications for each pattern are defined below.

```html
<!-- all examples assume the default cutoffs of [960, 550] and resulting regions of [d, t, p] -->

<!-- apply a width of 25% to the d, t, and p regions -->
<div class="width-25"></div>

<!-- apply a width of 25% to the d region, and 50% to the t and p regions -->
<div class="width-25-50"></div>

<!-- apply a width of 25%, 50%, and 100% to the regions respectively -->
<div class="width-25-50-100"></div>

<!-- apply a width of auto to the d and t regions, and 100px to p -->
<div class="width-a-a-100x"></div>

<!-- apply no width definition to the d region, and 50% to t and p regions -->
<div class="width--50"></div>
```

---
### Patterns
| Pattern      | Values      | Description                                                                    |
|--------------|-------------|--------------------------------------------------------------------------------|
| body         |             | sets the page width and height to fill the entire browser window               |
| footer       | intx        | creates a sticky footer with (intx)px height                                   |
| gridsponsive |             | sets the element to behave as a grid                                           |
| col          |             | sets the element to behave as a column                                         |
| clear        | f, intx     | if (f)alse then 0 height and no clear, or clear and have (intx)px height       |
| hide         | t, f        | if (t)rue then hide the element, if (f)alse then show the element              |
| show         | t, f        | if (t)rue then show the element, if (f)alse then hide the element              |
| pos          | l, r, c     | (l)eft align element, (r)ight align element, (c)enter align element            |
| width        | a, int, intx| element has (int)% width, or (intx)px width, or (a)uto width                   |
| height       | a, int, intx| element has (int)% height, or (intx)px height, or (a)uto height                |
| color        | t, hex      | element has #(hex) text color, or is (t)ransparent                             |
| bgcolor      | t, hex      | element has #(hex) background color, or is (t)ransparent                       |
| pad          | int, intx   | element has (int)% or (intx)px padding on all sides                            |
| padtb        | int, intx   | element has (int)% or (intx)px padding on top and bottom                       |
| padlr        | int, intx   | element has (int)% or (intx)px padding on left and right                       |
| padt         | int, intx   | element has (int)% or (intx)px padding on top                                  |
| padr         | int, intx   | element has (int)% or (intx)px padding on right                                |
| padb         | int, intx   | element has (int)% or (intx)px padding on bottom                               |
| padl         | int, intx   | element has (int)% or (intx)px padding on left                                 |
| push         | int, intx   | element has (int)% or (intx)px 'margin' on all sides                           |
| pushtb       | int, intx   | element has (int)% or (intx)px 'margin' on top and bottom                      |
| pushlr       | int, intx   | element has (int)% or (intx)px 'margin' on left and right                      |
| pusht        | int, intx   | element has (int)% or (intx)px 'margin' on top                                 |
| pushr        | int, intx   | element has (int)% or (intx)px 'margin' on right                               |
| pushb        | int, intx   | element has (int)% or (intx)px 'margin' on bottom                              |
| pushl        | int, intx   | element has (int)% or (intx)px 'margin' on left                                |

*note: all values can be left blank for a region

---
###The MIT License (MIT)

Copyright (c) 2014 Benjamin Vacha

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
