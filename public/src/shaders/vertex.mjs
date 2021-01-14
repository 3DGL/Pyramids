export const vshader = `#version 300 es

precision mediump float;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

in vec3 aVertexPosition;
in vec4 aVertexColor;

out vec4 vVertexColor;

void main(void) {
  gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aVertexPosition, 1.0);
  vVertexColor = aVertexColor;
}
`;
