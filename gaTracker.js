// ==UserScript==
// @name Google Analytics Tracker
// @namespace gaTracker
// @match *://*/*
// @grant none
// ==/UserScript==

"use strict";
(function () {
    console.log("Overriding Google Analytics");
    window.gaRequests = window.gaRequests || [];
    var lsAllCount = "gaAllCount";
    var allCount = 0;

    window.ga = gaReplacement;

    // Setup localStorage
    var count = localStorage.getItem(lsAllCount);
    if (count != null) {
        allCount = parseInt(count);
    }

    // Add UI to website
    setTimeout(function () {
        setCss();
        var gaContainer = document.createElement("div");
        gaContainer.id = "gaAnalyzer";
        document.body.appendChild(gaContainer);

        gaContainer.innerHTML = "<span class='holder'><span id='gaCount'>" + window.gaRequests.length +
            " (" + allCount + ")</span> GA Requests&nbsp;<span id='gaToggle'>" +
            "[O]</span></span><div id='gaDetails'>" + formatRequests() + "</div>";

        var gaToggle = document.getElementById("gaToggle");
        gaToggle.onclick = clickHandler;
    }, 3000);

    // GA Replacement to log the trackers activities
    function gaReplacement() {
        window.gaRequests.push(arguments);
        allCount += 1;
        var gaCount = document.getElementById("gaCount");
        localStorage.setItem(lsAllCount, allCount);
        if (gaCount == null) return;
        gaCount.innerText = window.gaRequests.length + " (" + allCount + ")";
        document.getElementById("#gaDetails").innerHTML = formatRequests();
    };

    /****** Helper functions ******/
    /**
     * Formats the requests of the current session
     */
    function formatRequests() {
        var html = window.gaRequests.map(formatLine).join("");
        return "<table>" + html + "</table>";
    }

    /**
     * Turns the given object into a humareadable table
     * @param {Object} elm
     */
    function formatLine(elm) {
        var html = "<tr>";
        for (var i = 0; i < elm.length; i++) {
            if (typeof elm[i] == "object" || typeof elm[i] == "array") {
                html += `<td><pre>${ JSON.stringify( elm[i] ) }</pre></td>`;
            } else {
                html += `<td>${ elm[i] }</td>`;
            }
        }
        return html + "</tr>";
    }

    /**
     * Handles the clicks on the toggle element for the details
     */
    function clickHandler() {
        var elm = document.getElementById("gaToggle");
        var gaDetails = document.getElementById("gaDetails");
        if (elm.innerText == "[O]") {
            elm.innerText = "[X]";
        } else {
            elm.innerText = "[O]";
        }
        toggleClass(gaDetails, "showGADetails");
    }

    /**
     * Toggles a class on a given element
     * @param {Element} elm
     * @param {string} className
     */
    function toggleClass(elm, className) {
        if (elm.classList.contains(className)) {
            elm.classList.remove(className);
        } else {
            elm.classList.add(className);
        }
    }

    /**
     * Sets the CSS needed for this tool into the head section
     */
    function setCss() {
        var css = `/* Google Analytics Tracker CSS */
    #gaDetails table tr:nth-child(even) {
    background-color: #ddd;
    }
    #gaDetails table td {
    border-left: 1px solid #555;
    padding: 2px;
    }
    #gaDetails {
    max-height: 0px;
    max-width: 0px;
    overflow-y: scroll;
    clear: both;
    transition: max-height 0.4s,
                max-width 0.8s;
    }
    .holder {
    float: right;
    }
    #gaAnalyzer {
    position: fixed;
    bottom: 10px;
    right: 10px;
    background: white;
    border: 1px dotted #555;
    border-radius: 8px;
    z-index: 10001;
    padding: 5px;
    }
    .showGADetails {
        max-height: 500px !important;
        max-width: 1000px !important;
    }`;
        var style = document.createElement("style");
        style.innerHTML = css;
        document.head.appendChild(style);
    }
})();