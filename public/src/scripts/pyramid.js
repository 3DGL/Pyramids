'use strict';

import { program, gl } from "./qzr-webgl-utils.js";
import * as glm from "../../libs/gl-matrix/index.js";

let
pyrIndexBuffer,
pyrVAO,
indices,
vertices,
modelViewMatrix = glm.mat4.create(),
projectionMatrix = glm.mat4.create();

export function draw_pyramid() {
  console.log(program);

    program.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
    program.uProjectionMatrix = gl.getUniformLocation(program, 'uProjectionMatrix');
    program.uModelViewMatrix = gl.getUniformLocation(program, 'uModelViewMatrix');

    vertices = [
      1.5, 0, 0,
      -1.5, 1, 0,
      -1.5, 0.809017, 0.587785,
      -1.5, 0.309017, 0.951057,
      -1.5, -0.309017, 0.951057,
      -1.5, -0.809017, 0.587785,
      -1.5, -1, 0,
      -1.5, -0.809017, -0.587785,
      -1.5, -0.309017, -0.951057,
      -1.5, 0.309017, -0.951057,
      -1.5, 0.809017, -0.587785
        // 22, 22, 30,

        // 15, 0, 0,
        // 30, 0, 0,
        // 30, 15, 0,
        // 15, 15, 0,

        
        
      ];

      indices = [
        0, 1, 2,
        0, 2, 3,
        0, 3, 4,
        0, 4, 5,
        0, 5, 6,
        0, 6, 7,
        0, 7, 8,
        0, 8, 9,
        0, 9, 10,
        0, 10, 1
        // 0, 1, 2,
        // 0, 2, 3,
        // 0, 3, 4,
        // 0, 4, 5,
      ];

    pyrVAO = gl.createVertexArray();

    gl.bindVertexArray(pyrVAO);

    const pyrVertexBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, pyrVertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    // Configure instructions for VAO
    gl.vertexAttribPointer(program.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(program.aVertexPosition);

    pyrIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, pyrIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    // Clean
    gl.bindVertexArray(null);

    render();

}

export function render() {
  requestAnimationFrame(render);
  draw();
}

export function draw() {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  // We will discuss these operations in later chapters
  glm.mat4.perspective(projectionMatrix, 45, gl.canvas.width / gl.canvas.height, 0.1, 10000);
  glm.mat4.identity(modelViewMatrix);
  glm.mat4.translate(modelViewMatrix, modelViewMatrix, [0, 0, -5]);

  gl.uniformMatrix4fv(program.uProjectionMatrix, false, projectionMatrix);
  gl.uniformMatrix4fv(program.uModelViewMatrix, false, modelViewMatrix);

  // Bind
  gl.bindVertexArray(pyrVAO);

  gl.drawElements(gl.LINE_LOOP, indices.length, gl.UNSIGNED_SHORT, 0);

  // Clean
  gl.bindVertexArray(null);
}

