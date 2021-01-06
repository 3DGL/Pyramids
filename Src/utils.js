'use strict';

 // Global variables that are set and used
    // across the application
    let gl,
      program,
      squareVertexBuffer;

    // Given an id, extract the content's of a shader script
    // from the DOM and return the compiled shader
    function getShader(id) {
      const script = document.getElementById(id);
      const shaderString = script.text.trim();

      // Assign shader depending on the type of shader
      let shader;
      if (script.type === 'x-shader/x-vertex') {
        shader = gl.createShader(gl.VERTEX_SHADER);
      }
      else if (script.type === 'x-shader/x-fragment') {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
      }
      else {
        return null;
      }

      // Compile the shader using the supplied shader code
      gl.shaderSource(shader, shaderString);
      gl.compileShader(shader);

      // Ensure the shader is valid
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        return null;
      }

      return shader;
    }

    function getCanvas(id) {
        const canvas = document.getElementById(id);
    
        if (!canvas) {
          console.error(`There is no canvas with id ${id} on this page.`);
          return null;
        }
    
        return canvas;
      }
    
      // Given a canvas element, return the WebGL2 context
      function getGLContext(canvas) {
        return canvas.getContext('webgl2') || console.error('WebGL2 is not available in your browser.');
      }

    // Create a program with the appropriate vertex and fragment shaders
    function initProgram() {
      const vertexShader = getShader(document.getElementById("vertex-shader"));
      const fragmentShader = getShader(document.getElementById("fragment-shader"));

      // Create a program
      program = gl.createProgram();
      // Attach the shaders to this program
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Could not initialize shaders');
      }

      // Use this program instance
      gl.useProgram(program);
      // We attach the location of these shader values to the program instance
      // for easy access later in the code
      program.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
    }

    // Set up the buffers for the square
    function initBuffers() {
      /*
        V0                    V3
        (-0.5, 0.5, 0)        (0.5, 0.5, 0)
        X---------------------X
        |                     |
        |                     |
        |       (0, 0)        |
        |                     |
        |                     |
        X---------------------X
        V1                    V2
        (-0.5, -0.5, 0)       (0.5, -0.5, 0)
      */
      const vertices = [
        // first triangle (V0, V1, V2)
        -0.5, 0.5, 0,
        -0.5, -0.5, 0,
        0.5, -0.5, 0,

        // second triangle (V0, V2, V3)
        -0.5, 0.5, 0,
        0.5, -0.5, 0,
        0.5, 0.5, 0
      ];

      // Setting up the VBO
      squareVertexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

      // Clean
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }

    // We call draw to render to our canvas
    function draw() {
      // Clear the scene
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

      // Use the buffers we've constructed
      gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexBuffer);
      gl.vertexAttribPointer(program.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(program.aVertexPosition);

      // Draw to the scene using triangle primitives and the number of vertices
      // that define our geometry (i.e. six in this case)
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      // Clean
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }

    // Entry point to our application
    function init() {
      // Retrieve the canvas
      const canvas = getCanvas('webgl-canvas');
      // Set the canvas to the size of the screen
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Retrieve a WebGL context
      gl = getGLContext(canvas);
      // Set the clear color to be black
      gl.clearColor(0, 0, 0, 1);

      // Call the functions in an appropriate order
      initProgram();
      initBuffers();
      draw();
    }












/*
function init() {
    const canvas = document.getElementById('webgl-canvas');

    // Certifica que há o elemento Canvas na página
    if (!canvas) {
      console.error('Não achamos o elemento Canvas na sua página!!!');
      return;
    }

    const gl = canvas.getContext('webgl2');

    //teste do buffer de ClearColor
    gl.clearColor(0,1,0,1);
    gl.clear(gl.COLOR_BUFFER_BIT);


    //cria o buffer com os parametros
    const vertices = [
        -0.5,  0.5, 0,
        -0.5, -0.5, 0,
         0.5, -0.5, 0,
         0.5,  0.5, 0
      ];
      
    const positionBuffer = gl.createBuffer();

    //aloca o buffer na memória
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    
    

  }
 */