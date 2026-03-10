export const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

export const fragmentShader = `
  uniform float uProgress;
  uniform vec2 uResolution;
  uniform vec3 uColor;
  uniform float uSpread;

  varying vec2 vUv;

  void main() {
    float dist = distance(vUv, vec2(0.5));
    float alpha = smoothstep(uProgress, uProgress - uSpread, dist);
    gl_FragColor = vec4(uColor, alpha);
  }
`;
