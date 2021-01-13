'use strict';

import * as vs from "../shaders/vertex.mjs";
import * as fs from "../shaders/fragment.mjs";

export var gl; 
export var program;

export function webgl_init() {

    //Variáveis para carregar os Shaders
    const VSHADER_SOURCE = vs.vshader;
    const FSHADER_SOURCE = fs.fshader;
    
    //Pode se tornar uma possível função externa em alguma biblioteca
    const canvas = document.getElementById('webgl-canvas');

    if (!canvas) {
        console.error(`Não existe Canvas com esse ID.`);
      }

    gl = canvas.getContext('webgl2');

    var ver_shader = gl.createShader(gl.VERTEX_SHADER);
    var frag_shader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(ver_shader, VSHADER_SOURCE);
    gl.shaderSource(frag_shader, FSHADER_SOURCE);
        
    gl.compileShader(ver_shader);
    gl.compileShader(frag_shader);

    program = gl.createProgram();
    
        
    gl.attachShader(program, ver_shader);
    gl.attachShader(program, frag_shader);
    gl.linkProgram(program);

    gl.useProgram(program);

}