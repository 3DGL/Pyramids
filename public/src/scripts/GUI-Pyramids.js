'use strict';

import { gl, program } from "./qzr-webgl-utils.js";

export function initGUI(){

    var obj = {
        message: 'Hello World',
        displayOutline: false,

        color: [0,255,0],

        x: 6.0,
        y: 5,
        z: 4,

        height: 10,
        noiseStrength: 10.2,
        growthSpeed: 0.2,
    
        type: 'three',
    
        explode: function () {
          alert('Bang!');
        },
    
        color0: "#ffae23", // CSS string
        color1: [ 0, 128, 255 ], // RGB array
        color2: [ 0, 128, 255, 0.3 ], // RGB with alphaimport * as gui from "./GUI-Pyramids.js"
        color3: { h: 350, s: 0.9, v: 0.3 } // Hue, saturation, value
    };
    
    var gui = new dat.gui.GUI();
    gui.remember(obj);
    
    gui.addColor(obj, 'color').onChange(setColor);
    
    gui.add(obj, 'message');
    gui.add(obj, 'displayOutline');
    gui.add(obj, 'explode');
    
    //gui.add(obj, 'maxSize').min(-10).max(10).step(0.25);
    gui.add(obj, 'height').step(5); // Increment amount
    
    // Choose from accepted values
    gui.add(obj, 'type', [ 'one', 'two', 'three' ] );
    
    // Choose from named values
    //gui.add(obj, 'speed', { Stopped: 0, Slow: 0.1, Fast: 5 } );
    
    var f1 = gui.addFolder('Colors');
    f1.addColor(obj, 'color0');
    f1.addColor(obj, 'color1');
    f1.addColor(obj, 'color2');
    f1.addColor(obj, 'color3');
    
    var f2 = gui.addFolder('Another Folder');
    f2.add(obj, 'noiseStrength');
    
    var f3 = f2.addFolder('Nested Folder');
    f3.add(obj, 'growthSpeed');
}

export function setColor(){
  var teste = [ 1,0,0,1];

  var vertexColor = gl.getAttribLocation(program, 'aVertexColor');

  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(teste), gl.STATIC_DRAW);

  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

  gl.vertexAttribPointer(vertexColor, 4, gl.FLOAT, false, 0, 0);

  gl.enableVertexAttribArray(vertexColor);
  gl.useProgram(program);
}
