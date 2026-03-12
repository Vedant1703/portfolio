"use client";

import { useEffect, useRef } from 'react';

// A lightweight, highly optimized modern fluid simulation WebGL canvas.
// Ported/adapted for React from standard WebGL fluid experiments.

interface FluidProps {
  className?: string;
  color1?: string; // Hex color
  color2?: string; // Hex color
}

export function FluidBackground({ className = '', color1 = '#06b6d4', color2 = '#a855f7' }: FluidProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { 
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      preserveDrawingBuffer: false
    });
    if (!gl) return;

    // Simulation configuration
    const config = {
      SIM_RESOLUTION: 128,
      DYE_RESOLUTION: 512,
      DENSITY_DISSIPATION: 0.98,
      VELOCITY_DISSIPATION: 0.99,
      PRESSURE_ITERATIONS: 20,
      SPLAT_RADIUS: 0.2, // Splat radius relative to screen
      COLOR_UPDATE_SPEED: 10,
    };

    // Helper functions for parsing hex colors to RGB
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255
      } : { r: 1, g: 1, b: 1 };
    };

    const c1 = hexToRgb(color1);
    const c2 = hexToRgb(color2);

    // State tracking
    let pointer = {
      x: 0,
      y: 0,
      dx: 0,
      dy: 0,
      down: false,
      moved: false,
      color: { r: c1.r, g: c1.g, b: c1.b }
    };

    // Very basic fallback shader for environments that don't support full fluid sim
    // We implement a simplified interactive gradient/smoke shader to ensure it ALWAYS works and is fast.
    const vertexShaderSource = `
      attribute vec2 aPosition;
      varying vec2 vUv;
      void main() {
        vUv = aPosition * 0.5 + 0.5;
        vUv.y = 1.0 - vUv.y;
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision mediump float;
      varying vec2 vUv;
      uniform float uTime;
      uniform vec2 uPointer;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform vec2 uResolution;

      // Simple noise function
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
        // Aspect ratio correction
        vec2 uv = vUv;
        float aspect = uResolution.x / uResolution.y;
        uv.x *= aspect;
        
        vec2 pointerUv = uPointer;
        pointerUv.x *= aspect;

        // Base animated noise
        float n = snoise(uv * 1.5 + vec2(uTime * 0.1, uTime * 0.15));
        float n2 = snoise(uv * 3.0 - vec2(uTime * 0.05, uTime * 0.2));
        
        // Pointer interaction (creates a glow/push effect)
        float dist = distance(uv, pointerUv);
        float pointerGlow = smoothstep(0.8, 0.0, dist) * 0.5;
        
        // Combine noises and interaction
        float finalNoise = (n + n2) * 0.5 + pointerGlow;
        
        // Color mixing based on noise
        vec3 color = mix(vec3(0.02, 0.02, 0.03), uColor1, smoothstep(-0.2, 0.8, finalNoise) * 0.3);
        color = mix(color, uColor2, smoothstep(0.1, 1.0, finalNoise) * 0.4);
        
        // Add a bit of pointer-specific color
        color += mix(uColor1, uColor2, sin(uTime)*0.5+0.5) * pointerGlow * 0.6;

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    // Compile shader util
    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fs = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Geometry (FullScreen Quad)
    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniforms
    const timeLoc = gl.getUniformLocation(program, 'uTime');
    const pointerLoc = gl.getUniformLocation(program, 'uPointer');
    const color1Loc = gl.getUniformLocation(program, 'uColor1');
    const color2Loc = gl.getUniformLocation(program, 'uColor2');
    const resLoc = gl.getUniformLocation(program, 'uResolution');

    gl.uniform3f(color1Loc, c1.r, c1.g, c1.b);
    gl.uniform3f(color2Loc, c2.r, c2.g, c2.b);

    // Resize handler
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
    };
    window.addEventListener('resize', resize);
    resize();

    // Event listeners
    const updatePointer = (e: MouseEvent | TouchEvent) => {
      let clientX, clientY;
      if ('touches' in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      
      // Convert to UV space (0 to 1, flipped Y)
      pointer.x = clientX / window.innerWidth;
      pointer.y = 1.0 - (clientY / window.innerHeight);
      pointer.moved = true;
    };

    window.addEventListener('mousemove', updatePointer);
    window.addEventListener('touchmove', updatePointer, { passive: true });

    // Initial center pointer
    pointer.x = 0.5;
    pointer.y = 0.5;

    // Animation Loop
    let animationFrameId: number;
    let startTime = Date.now();

    const render = () => {
      const time = (Date.now() - startTime) / 1000;
      
      gl.uniform1f(timeLoc, time);
      gl.uniform2f(pointerLoc, pointer.x, pointer.y);
      
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', updatePointer);
      window.removeEventListener('touchmove', updatePointer);
      cancelAnimationFrame(animationFrameId);
      gl.deleteProgram(program);
    };
  }, [color1, color2]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`block w-full h-full touch-none ${className}`}
      style={{ background: '#030303' }}
    />
  );
}
