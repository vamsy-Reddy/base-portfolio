/**
 * GLSL for the hero: a field of fine luminous light strands.
 *
 * The strands' base curves are generated once on the CPU (curl-noise flow, see
 * LightField). This shader keeps them alive: a slow organic displacement whose
 * amplitude and speed scale with depth (parallax layers), an energy wave that
 * travels along each strand, and a localized cursor deformation that eases in on
 * hover and releases naturally. Color runs cyan -> ice blue -> violet along the
 * strand. Brightness is held down on the left so the headline stays readable.
 */

const simplex = /* glsl */ `
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x,289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+1.0*C.xxx;
  vec3 x2=x0-i2+2.0*C.xxx;
  vec3 x3=x0-1.0+3.0*C.xxx;
  i=mod(i,289.0);
  vec4 p=permute(permute(permute(
     i.z+vec4(0.0,i1.z,i2.z,1.0))
    +i.y+vec4(0.0,i1.y,i2.y,1.0))
    +i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=1.0/7.0;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`;

export const strandVertexShader = /* glsl */ `
uniform float uTime;
uniform vec2  uMouse;
uniform float uIntensity;

attribute float aSeed;   // per strand
attribute float aT;      // 0..1 along the strand
attribute float aDepth;  // 0 (far) .. 1 (near)

varying float vT;
varying float vDepth;
varying float vGlow;
varying float vFade;

${simplex}

void main() {
  vec3 pos = position;

  // Living flow: a gentle organic displacement. Deeper layers (aDepth -> 0)
  // move slower and less, nearer layers more, which reads as volumetric depth.
  float speed = mix(0.5, 1.25, aDepth);
  float t = uTime * 0.06 * speed;
  float amp = mix(0.14, 0.42, aDepth);
  // Two noise samples (z derived from them) keeps the vertex shader cheap.
  float n1 = snoise(vec3(pos.yz * 0.22, t + aSeed));
  float n2 = snoise(vec3(pos.xz * 0.22, t + aSeed + 5.1));
  pos += vec3(n1, n2, (n1 + n2) * 0.5) * amp;

  // Localized cursor deformation: strands near the pointer are pushed out and
  // lifted, eased by uIntensity so it fades in and releases naturally.
  vec2 toMouse = pos.xy - uMouse;
  float d = length(toMouse);
  float infl = smoothstep(2.1, 0.0, d) * uIntensity;
  pos.xy += normalize(toMouse + 0.0001) * infl * 0.85;
  pos.z  += infl * 0.35;

  // Energy wave travelling along the strand (brightness only, not shape).
  float wave = sin(aT * 9.0 - uTime * 1.3 + aSeed * 4.0) * 0.5 + 0.5;
  vGlow = wave + infl * 1.2;

  vT = aT;
  vDepth = aDepth;
  // Hold the left side (where the headline sits) calmer.
  vFade = smoothstep(-6.0, -1.2, pos.x);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

export const strandFragmentShader = /* glsl */ `
precision mediump float;

uniform vec3 uColorA; // cyan
uniform vec3 uColorB; // ice blue
uniform vec3 uColorC; // violet

varying float vT;
varying float vDepth;
varying float vGlow;
varying float vFade;

void main() {
  // Gradient along the strand.
  vec3 col = mix(uColorA, uColorB, smoothstep(0.0, 0.55, vT));
  col = mix(col, uColorC, smoothstep(0.5, 1.0, vT) * 0.85);

  float depthDim = mix(0.3, 1.0, vDepth);     // far strands dimmer
  float glow = 0.3 + 0.7 * clamp(vGlow, 0.0, 1.4);
  float alpha = 0.5 * glow * depthDim * (0.22 + 0.78 * vFade);

  gl_FragColor = vec4(col * glow, alpha);
}
`;
