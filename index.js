// Get references to the tbody element and button for loading additional results
var $tbody = document.querySelector("tbody");
var $datetimeInput = document.querySelector("#datetime");
var $cityInput = document.querySelector("#city");
var $stateInput = document.querySelector("#state");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");
var $searchBtn = document.querySelector("#search");
var $loadMoreBtn = document.querySelector("#load-btn");

// Add an event listener to the $searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);

var startingIndex = 0;
var resultsPerPage = 50;

// Set filteredAddresses to addressData initially
// var filteredAddresses = addressData;
var filteredData = ufoData;


// ***************************************************************************
// One placed to customize - The id value of the table tag.

var TableIDvalue = "indextable";

//
//////////////////////////////////////
var TableLastSortedColumn = -1;

function SortTable() {
    var sortColumn = parseInt(arguments[0]);
    var type = arguments.length > 1 ? arguments[1] : 'T';
    var dateformat = arguments.length > 2 ? arguments[2] : '';
    var table = document.getElementById(TableIDvalue);
    var tbody = table.getElementsByTagName("tbody")[0];
    var rows = tbody.getElementsByTagName("tr");
    var arrayOfRows = new Array();
    type = type.toUpperCase();
    dateformat = dateformat.toLowerCase();
    for (var i = 0, len = rows.length; i < len; i++) {
        arrayOfRows[i] = new Object;
        arrayOfRows[i].oldIndex = i;
        var celltext = rows[i].getElementsByTagName("td")[sortColumn].innerHTML.replace(/<[^>]*>/g, "");
        if (type == 'D') { arrayOfRows[i].value = GetDateSortingKey(dateformat, celltext); } else {
            var re = type == "N" ? /[^\.\-\+\d]/g : /[^a-zA-Z0-9]/g;
            arrayOfRows[i].value = celltext.replace(re, "").substr(0, 25).toLowerCase();
        }
    }
    if (sortColumn == TableLastSortedColumn) { arrayOfRows.reverse(); } else {
        TableLastSortedColumn = sortColumn;
        switch (type) {
            case "N":
                arrayOfRows.sort(CompareRowOfNumbers);
                break;
            case "D":
                arrayOfRows.sort(CompareRowOfNumbers);
                break;
            default:
                arrayOfRows.sort(CompareRowOfText);
        }
    }
    var newTableBody = document.createElement("tbody");
    for (var i = 0, len = arrayOfRows.length; i < len; i++) {
        newTableBody.appendChild(rows[arrayOfRows[i].oldIndex].cloneNode(true));
    }
    table.replaceChild(newTableBody, tbody);
} // function SortTable()

function CompareRowOfText(a, b) {
    var aval = a.value;
    var bval = b.value;
    return (aval == bval ? 0 : (aval > bval ? 1 : -1));
} // function CompareRowOfText()

function CompareRowOfNumbers(a, b) {
    var aval = /\d/.test(a.value) ? parseFloat(a.value) : 0;
    var bval = /\d/.test(b.value) ? parseFloat(b.value) : 0;
    return (aval == bval ? 0 : (aval > bval ? 1 : -1));
} // function CompareRowOfNumbers()

function GetDateSortingKey(format, text) {
    if (format.length < 1) { return ""; }
    format = format.toLowerCase();
    text = text.toLowerCase();
    text = text.replace(/^[^a-z0-9]*/, "");
    text = text.replace(/[^a-z0-9]*$/, "");
    if (text.length < 1) { return ""; }
    text = text.replace(/[^a-z0-9]+/g, ",");
    var date = text.split(",");
    if (date.length < 3) { return ""; }
    var d = 0,
        m = 0,
        y = 0;
    for (var i = 0; i < 3; i++) {
        var ts = format.substr(i, 1);
        if (ts == "d") { d = date[i]; } else if (ts == "m") { m = date[i]; } else if (ts == "y") { y = date[i]; }
    }
    d = d.replace(/^0/, "");
    if (d < 10) { d = "0" + d; }
    if (/[a-z]/.test(m)) {
        m = m.substr(0, 3);
        switch (m) {
            case "jan":
                m = String(1);
                break;
            case "feb":
                m = String(2);
                break;
            case "mar":
                m = String(3);
                break;
            case "apr":
                m = String(4);
                break;
            case "may":
                m = String(5);
                break;
            case "jun":
                m = String(6);
                break;
            case "jul":
                m = String(7);
                break;
            case "aug":
                m = String(8);
                break;
            case "sep":
                m = String(9);
                break;
            case "oct":
                m = String(10);
                break;
            case "nov":
                m = String(11);
                break;
            case "dec":
                m = String(12);
                break;
            default:
                m = String(0);
        }
    }
    m = m.replace(/^0/, "");
    if (m < 10) { m = "0" + m; }
    y = parseInt(y);
    if (y < 100) { y = parseInt(y) + 2000; }
    return "" + String(y) + "" + String(m) + "" + String(d) + "";
} // function GetDateSortingKey()
// ***************************************************************************




// renderTable renders the filteredData to the tbody
function renderTable() {
    $tbody.innerHTML = "";
    var endingIndex = startingIndex + resultsPerPage;
    console.log(endingIndex)
    var filteredDataSubset = filteredData.slice(startingIndex, endingIndex);

    for (var i = 0; i < filteredDataSubset.length; i++) {
        // Get the current address object and its fields

        var address = filteredDataSubset[i];
        var fields = Object.keys(address);
        console.log("hello", i, " ", startingIndex)
            // Create a new row in the tbody, set the index to be i + startingIndex
        var $row = $tbody.insertRow(i);
        for (var j = 0; j < fields.length; j++) {
            // For every field in the address object, create a new cell and set its inner text to be the current value at the current address's field
            var field = fields[j];
            var $cell = $row.insertCell(j);
            $cell.innerText = address[field];
        }
    }
}

$loadMoreBtn.addEventListener("click", handleButtonClick);

function handleSearchButtonClick() {
    // Format the user's search by removing leading and trailing whitespace, lowercase the string
    var filterDateTime = $datetimeInput.value.trim().toLowerCase();
    var filterCity = $cityInput.value.trim().toLowerCase();
    var filterState = $stateInput.value.trim().toLowerCase();
    var filterCountry = $countryInput.value.trim().toLowerCase();
    var filterShape = $shapeInput.value.trim().toLowerCase();

    // Set filteredData to an array of all addresses who's "state" matches the filter
    filteredData = ufoData.filter(function(address) {
        var searchDateTime = address.datetime.substring(0, filterDateTime.length).toLowerCase();
        var searchCity = address.city.substring(0, filterCity.length).toLowerCase();
        var searchState = address.state.substring(0, filterState.length).toLowerCase();
        var searchCountry = address.country.substring(0, filterCountry.length).toLowerCase();
        var searchShape = address.shape.substring(0, filterShape.length).toLowerCase();
        // if (addressState === filterState && addressCity === filterCity) {
        if (searchDateTime === filterDateTime && searchCity === filterCity && searchState === filterState && searchCountry === filterCountry && searchShape === filterShape) {
            return true;
        }
        return false;
    });
    renderTable();
}

function handleButtonClick() {
    // Increase startingIndex by resultsPerPage, render the next section of the table
    startingIndex += resultsPerPage;
    console.log(startingIndex)
    renderTable();
    // Check to see if there are any more results to render
    if (startingIndex + resultsPerPage >= ufoData.length) {
        $loadMoreBtn.classList.add("disabled");
        $loadMoreBtn.innerText = "All Addresses Loaded";
        $loadMoreBtn.removeEventListener("click", handleButtonClick);
    }
}

// Render the table for the first time on page load
renderTable();