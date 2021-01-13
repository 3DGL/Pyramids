'use strict';

import * as gui from "./GUI-Pyramids.js";
import * as wutils from "./qzr-webgl-utils.js";
import * as pyramid from "./pyramid.js";

window.onload = init();

export function init() {
    gui.initGUI();

    wutils.webgl_init();
    
    pyramid.draw_pyramid(wutils.gl, wutils.program);
}
