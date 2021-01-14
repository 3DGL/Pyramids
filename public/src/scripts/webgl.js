'use strict';

import * as gui from "./GUI-Pyramids.js";
import * as wutils from "./qzr-webgl-utils.js";
import * as pyramid from "./pyramid.js";

window.onload = init();

export function init() {
    // Inicia as funções básicas do WebGL
    wutils.webgl_init();
    pyramid.draw_pyramid(wutils.gl, wutils.program);

    // Inicia a interface gráfica do projeto
    gui.initGUI();
}
