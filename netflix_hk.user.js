// ==UserScript==
// @name           Netflix Hotkeys
// @description    Adds hotkeys to netflix.com
// @match          *://*.netflix.com/*
// @version        1
// ==/UserScript==

// w - previous row
// s - next row
// a - scroll left
// d - scroll right
// f - start video

var row = 0;
var videoIndex = 0;

function clearItem(row, videoIndex) {
    try {
        var elem = document.getElementById("slider_" + row).childNodes[1].childNodes[videoIndex];
        elem.style.border="none";
    }
    catch (e) {
    }
}
function selectItem(row, videoIndex) {
    try {
        var elem = document.getElementById("slider_" + row).childNodes[1].childNodes[videoIndex];
        elem.style.border="thin dashed #CC0000";
        elem.scrollIntoView();
        window.scrollBy(0, -100);
    }
    catch (e) {
    }
}
function clickItem(row, videoIndex) {
    try {
        var elem = document.getElementById("slider_" + row).childNodes[1].childNodes[videoIndex].childNodes[1].childNodes[1];
        var e = document.createEvent("MouseEvents");
        e.initEvent("click", true, true);
        elem.dispatchEvent(e);
    }
    catch (e) {
    }
}

function scrollHorizontal(direction) {
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
    }
    catch (e) {
        if (videoIndex < 0) {
            // scroll right till we hit something
            scrollHorizontal(1);
            return;
        } else {
            // scroll left till we hit something
            scrollHorizontal(-1)
            return;
        }
    }
}
function scrollVertical(offset) {
    clearItem(row, videoIndex);

    row += offset;
    if (row < 0) {
        row = 0;
    }

  // scroll to the first item and highlight it
    videoIndex = 0;
    scrollHorizontal(1);
}

document.onkeydown = function (e) {
    switch (e.keyCode) {
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
    default:
        break;
    }
}

// init to first row, first index available
scrollVertical(0);
