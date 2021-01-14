'use strict';

import * as vs from "../shaders/vertex.mjs";
import * as fs from "../shaders/fragment.mjs";

export var gl, program;



function init_shader(){
  //Variáveis para carregar os Shaders
  const VSHADER_SOURCE = vs.vshader;
  const FSHADER_SOURCE = fs.fshader;

  var ver_shader = gl.createShader(gl.VERTEX_SHADER);
  var frag_shader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(ver_shader, VSHADER_SOURCE);
  gl.shaderSource(frag_shader, FSHADER_SOURCE);
      
  gl.compileShader(ver_shader);
  gl.compileShader(frag_shader);

  program = gl.createProgram();
  console.log(ver_shader);
  gl.attachShader(program, ver_shader);
  gl.attachShader(program, frag_shader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Could not initialize shaders');
  }


  gl.useProgram(program);
}


function webgl2_context(){
  const canvas = document.getElementById('webgl-canvas');

  if (!canvas) {
    console.error('Sorry! No HTML5 Canvas was found on this page');
    return;
  }

  gl = canvas.getContext('webgl2');
}

export function webgl_init() {
  webgl2_context();
  init_shader();

}