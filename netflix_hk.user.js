// ==UserScript==
// @name           Netflix Hotkeys
// @description    Adds hotkeys to netflix.com
// @match          *://*.netflix.com/*
// @version        2
// ==/UserScript==

// w - previous row
// s - next row
// a - scroll left
// d - scroll right
// f - start video

/*jslint browser: true*/
/*jslint vars: true */

var row = 0;
var videoIndex = 0;

function clearItem(row, videoIndex) {
    "use strict";
    try {
        var elem = document.getElementById("slider_" + row).childNodes[1].childNodes[videoIndex];
        elem.style.border = "none";
    } catch (err) {
    }
}
function selectItem(row, videoIndex) {
    "use strict";
    try {
        var elem = document.getElementById("slider_" + row).childNodes[1].childNodes[videoIndex];
        elem.style.border = "thin dashed #CC0000";
        elem.scrollIntoView();
        window.scrollBy(0, -100);
    } catch (err) {
    }
}
function clickItem(row, videoIndex) {
    "use strict";
    try {
        var elem = document.getElementById("slider_" + row).childNodes[1].childNodes[videoIndex].childNodes[1].childNodes[1];
        var ev = document.createEvent("MouseEvents");
        ev.initEvent("click", true, true);
        elem.dispatchEvent(ev);
    } catch (err) {
    }
}

function scrollHorizontal(direction) {
    "use strict";
    direction = direction / Math.abs(direction);

  // clear previously selected item
    clearItem(row, videoIndex);

  // move to next item
    videoIndex += direction;

    try {
        var elem = document.getElementById("slider_" + row).childNodes[1].childNodes[videoIndex];
        if (elem.nodeName === "DIV") {
            selectItem(row, videoIndex);
        } else {
            scrollHorizontal(direction);
        }
    } catch (err) {
        if (videoIndex < 0) {
            // scroll right till we hit something
            scrollHorizontal(1);
        } else {
            // scroll left till we hit something
            scrollHorizontal(-1);
        }
    }
}
function scrollVertical(offset) {
    "use strict";
    clearItem(row, videoIndex);

    row += offset;
    if (row < 0) {
        row = 0;
    }

  // scroll to the first item and highlight it
    videoIndex = 0;
    scrollHorizontal(1);
}

document.onkeydown = function (ev) {
    "use strict";
    switch (ev.keyCode) {
    case 65: // "A"
        scrollHorizontal(-1);
        break;
    case 68: // "D"
        scrollHorizontal(1);
        break;
    case 87: // "W"
        scrollVertical(-1);
        break;
    case 83: // "S"
        scrollVertical(1);
        break;
    case 70: // "F"
        clickItem(row, videoIndex);
        break;
    default:
        break;
    }
};

// init to first row, first index available
scrollVertical(0);
