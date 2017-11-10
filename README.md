# Multiple Filters

In this activity, we will add the ability to also filter our data by 'City'.

## Instructions

1. Open [index.js](Unsolved/index.js) and take a moment to study the new code. Currently, we are only able to search for addresses by 'State'.

2. Within [index.html](Unsolved/index.html), create a new input field that will be used to search for addresses by 'City'. Give this element a unique class name before moving back into [index.js](Unsolved/index.js) and creating a `querySelector` which stores a reference to the element within the variable `$cityInput`.

3. Add code to the `handleSearchButtonClick` function to capture the value of the `$cityInput` into a new variable. Reassign `filteredAddresses` to be a new array containing only the addresses who's state is equal to the value of the `$stateInput` and who's city is equal to the value of `$cityInput`. Call `renderTable` in order to update the page.

## Bonus

* Add code to so that the partial filter matches can be made instead of exact filter matches. e.g `ca` should match `California`, `ne` should match `New Jersey`, and empty strings should match everything.

## Hints

* Filtering the array can be done with an if statement inside of a for-loop. But consider using [Array.prototype.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter?v=example)
