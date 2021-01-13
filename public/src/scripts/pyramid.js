'use strict';

import { program, gl } from "./qzr-webgl-utils.js";
import * as glm from "../libs/gl-matrix/gl-matrix.js";

export function draw_pyramid() {
    let
        modelViewMatrix = glm.mat4.create(),
        projectionMatrix = glm.mat4.create();

    program.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
    program.uProjectionMatrix = gl.getUniformLocation(program, 'uProjectionMatrix');
    program.uModelViewMatrix = gl.getUniformLocation(program, 'uModelViewMatrix');

    const vertices = [
        22, 22, 30,

        15, 0, 0,
        30, 0, 0,
        30, 15, 0,
        15, 15, 0,

        
        
      ];

      indices = [
        0, 1, 2,
        0, 2, 3,
        0, 3, 4,
        0, 4, 5,
      ];

    var pyrVAO = gl.createVertexArray();

    gl.bindVertexArray(pyrVAO);

    const pyrVertexBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, pyrVertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    // Configure instructions for VAO
    gl.vertexAttribPointer(program.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(program.aVertexPosition);

    coneIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, coneIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    // Clean
    gl.bindVertexArray(null);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    glm.mat4.perspective(projectionMatrix, 45, gl.canvas.width / gl.canvas.height, 0.1, 10000);
    glm.mat4.identity(modelViewMatrix);
    glm.mat4.translate(modelViewMatrix, modelViewMatrix, [0, 0, -5]);

    gl.uniformMatrix4fv(program.uProjectionMatrix, false, projectionMatrix);
    gl.uniformMatrix4fv(program.uModelViewMatrix, false, modelViewMatrix);

    gl.bindVertexArray(pyrVAO);

    gl.drawElements(gl.TRIANGLE_FAN, indices.length, gl.UNSIGNED_SHORT, 0);

    // Clean
    gl.bindVertexArray(null);

}