/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

import React from "react";
import ReactDOM from "react-dom";

// any CSS you require will output into a single css file (app.css in this case)
import "../css/app.css";
import Shell from "./components/Shell";

// Need jQuery? Install it with "yarn add jquery", then uncomment to require it.
// var $ = require('jquery');

ReactDOM.render(<Shell />, document.querySelector("#app"));
