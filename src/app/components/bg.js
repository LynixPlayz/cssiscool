"use client"
import { useRef, useEffect } from 'react';
import * as dat from 'dat.gui';

const Noise = (hue) => {
    const isBrowser = () => typeof window !== 'undefined'; 
    const initialized = useRef(false)
  useEffect(() => {
    
    
    if (isBrowser()) {
        console.log(hue.hue)
        if (initialized.current) {
            return
        }
        initialized.current = true
        console.log("use effect")
        const noise = {};

        function Gradient(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        }
        Gradient.prototype.dot2 = function(x, y) {
        return this.x * x + this.y * y;
        };

        Gradient.prototype.dot3 = function(x, y, z) {
        return this.x * x + this.y * y + this.z * z;
        };

        const grad3 = [
        new Gradient(1, 1, 0), new Gradient(-1, 1, 0), new Gradient(1, -1, 0), new Gradient(-1, -1, 0),
        new Gradient(1, 0, 1), new Gradient(-1, 0, 1), new Gradient(1, 0, -1), new Gradient(-1, 0, -1),
        new Gradient(0, 1, 1), new Gradient(0, -1, 1), new Gradient(0, 1, -1), new Gradient(0, -1, -1)
        ];

        const perm = new Array(512);
        const gradP = new Array(512);
        const p = [151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180];

        noise.seed = function(seed) {
        if(seed > 0 && seed < 1) seed *= 65536;

        seed = Math.floor(seed);
        if (seed < 256) seed |= seed << 8;

        for (let i = 0; i < 256; i++) {
            let v;
            if (i & 1) {
            v = p[i] ^ (seed & 255);
            } else {
            v = p[i] ^ ((seed >> 8) & 255);
            }

            perm[i] = perm[i + 256] = v;
            gradP[i] = gradP[i + 256] = grad3[v % 12];
        }
        };

        noise.seed(0);

        const F2 = 0.5 * (Math.sqrt(3) - 1);
        const G2 = (3 - Math.sqrt(3)) / 6;
        const F3 = 1 / 3;
        const G3 = 1 / 6;

        function fade(t) {
        return t * t * t * (t * (t * 6 - 15) + 10);
        }

        function lerp(a, b, t) {
        return (1 - t) * a + t * b;
        }

        noise.simplex2 = function(xin, yin) {
        let n0, n1, n2;

        const s = (xin + yin) * F2;
        const i = Math.floor(xin + s);
        const j = Math.floor(yin + s);
        const t = (i + j) * G2;
        const X0 = i - t;
        const Y0 = j - t;
        const x0 = xin - X0;
        const y0 = yin - Y0;

        let i1, j1;
        if (x0 > y0) {
            i1 = 1;
            j1 = 0;
        } else {
            i1 = 0;
            j1 = 1;
        }

        const x1 = x0 - i1 + G2;
        const y1 = y0 - j1 + G2;
        const x2 = x0 - 1 + 2 * G2;
        const y2 = y0 - 1 + 2 * G2;

        const ii = i & 255;
        const jj = j & 255;

        const gi0 = gradP[ii + perm[jj]];
        const gi1 = gradP[ii + i1 + perm[jj + j1]];
        const gi2 = gradP[ii + 1 + perm[jj + 1]];

        const t0 = 0.5 - x0 * x0 - y0 * y0;
        if (t0 < 0) {
            n0 = 0;
        } else {
            n0 = t0 * t0;
            n0 *= n0 * gi0.dot2(x0, y0);
        }

        const t1 = 0.5 - x1 * x1 - y1 * y1;
        if (t1 < 0) {
            n1 = 0;
        } else {
            n1 = t1 * t1;
            n1 *= n1 * gi1.dot2(x1, y1);
        }

        const t2 = 0.5 - x2 * x2 - y2 * y2;
        if (t2 < 0) {
            n2 = 0;
        } else {
            n2 = t2 * t2;
            n2 *= n2 * gi2.dot2(x2, y2);
        }

        return 70 * (n0 + n1 + n2);
        };

        noise.simplex3 = function(xin, yin, zin) {
        let n0, n1, n2, n3;

        const s = (xin + yin + zin) * F3;
        const i = Math.floor(xin + s);
        const j = Math.floor(yin + s);
        const k = Math.floor(zin + s);
        const t = (i + j + k) * G3;
        const X0 = i - t;
        const Y0 = j - t;
        const Z0 = k - t;
        const x0 = xin - X0;
        const y0 = yin - Y0;
        const z0 = zin - Z0;

        let i1, j1, k1;
        let i2, j2, k2;
        if (x0 >= y0) {
            if (y0 >= z0) {
            i1 = 1; j1 = 0; k1 = 0;
            i2 = 1; j2 = 1; k2 = 0;
            } else if (x0 >= z0) {
            i1 = 1; j1 = 0; k1 = 0;
            i2 = 1; j2 = 0; k2 = 1;
            } else {
            i1 = 0; j1 = 0; k1 = 1;
            i2 = 1; j2 = 0; k2 = 1;
            }
        } else {
            if (y0 < z0) {
            i1 = 0; j1 = 0; k1 = 1;
            i2 = 0; j2 = 1; k2 = 1;
            } else if (x0 < z0) {
            i1 = 0; j1 = 1; k1 = 0;
            i2 = 0; j2 = 1; k2 = 1;
            } else {
            i1 = 0; j1 = 1; k1 = 0;
            i2 = 1; j2 = 1; k2 = 0;
            }
        }

        const x1 = x0 - i1 + G3;
        const y1 = y0 - j1 + G3;
        const z1 = z0 - k1 + G3;
        const x2 = x0 - i2 + 2 * G3;
        const y2 = y0 - j2 + 2 * G3;
        const z2 = z0 - k2 + 2 * G3;
        const x3 = x0 - 1 + 3 * G3;
        const y3 = y0 - 1 + 3 * G3;
        const z3 = z0 - 1 + 3 * G3;

        const ii = i & 255;
        const jj = j & 255;
        const kk = k & 255;

        const gi0 = gradP[ii + perm[jj + perm[kk]]];
        const gi1 = gradP[ii + i1 + perm[jj + j1 + perm[kk + k1]]];
        const gi2 = gradP[ii + i2 + perm[jj + j2 + perm[kk + k2]]];
        const gi3 = gradP[ii + 1 + perm[jj + 1 + perm[kk + 1]]];

        const t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
        if (t0 < 0) {
            n0 = 0;
        } else {
            n0 = t0 * t0;
            n0 *= n0 * gi0.dot3(x0, y0, z0);
        }

        const t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
        if (t1 < 0) {
            n1 = 0;
        } else {
            n1 = t1 * t1;
            n1 *= n1 * gi1.dot3(x1, y1, z1);
        }

        const t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
        if (t2 < 0) {
            n2 = 0;
        } else {
            n2 = t2 * t2;
            n2 *= n2 * gi2.dot3(x2, y2, z2);
        }

        const t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
        if (t3 < 0) {
            n3 = 0;
        } else {
            n3 = t3 * t3;
            n3 *= n3 * gi3.dot3(x3, y3, z3);
        }

        return 32 * (n0 + n1 + n2 + n3);
        };

        noise.perlin2 = function(x, y) {
        const X = Math.floor(x);
        const Y = Math.floor(y);
        x = x - X;
        y = y - Y;

        const n00 = gradP[X + perm[Y]].dot2(x, y);
        const n01 = gradP[X + perm[Y + 1]].dot2(x, y - 1);
        const n10 = gradP[X + 1 + perm[Y]].dot2(x - 1, y);
        const n11 = gradP[X + 1 + perm[Y + 1]].dot2(x - 1, y - 1);

        const u = fade(x);

        return lerp(
            lerp(n00, n10, u),
            lerp(n01, n11, u),
            fade(y)
        );
        };

        noise.perlin3 = function(x, y, z) {
        const X = Math.floor(x);
        const Y = Math.floor(y);
        const Z = Math.floor(z);
        x = x - X;
        y = y - Y;
        z = z - Z;

        const n000 = gradP[X + perm[Y + perm[Z]]].dot3(x, y, z);
        const n001 = gradP[X + perm[Y + perm[Z + 1]]].dot3(x, y, z - 1);
        const n010 = gradP[X + perm[Y + 1 + perm[Z]]].dot3(x, y - 1, z);
        const n011 = gradP[X + perm[Y + 1 + perm[Z + 1]]].dot3(x, y - 1, z - 1);
        const n100 = gradP[X + 1 + perm[Y + perm[Z]]].dot3(x - 1, y, z);
        const n101 = gradP[X + 1 + perm[Y + perm[Z + 1]]].dot3(x - 1, y, z - 1);
        const n110 = gradP[X + 1 + perm[Y + 1 + perm[Z]]].dot3(x - 1, y - 1, z);
        const n111 = gradP[X + 1 + perm[Y + 1 + perm[Z + 1]]].dot3(x - 1, y - 1, z - 1);

        const u = fade(x);
        const v = fade(y);
        const w = fade(z);

        return lerp(
            lerp(
            lerp(n000, n100, u),
            lerp(n001, n101, u),
            w
            ),
            lerp(
            lerp(n010, n110, u),
            lerp(n011, n111, u),
            w
            ),
            v
        );
        };

        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        var w = ctx.canvas.width = window.innerWidth;
        var h = ctx.canvas.height = window.innerHeight;

        window.onresize = function() {
        w = ctx.canvas.width = window.innerWidth;
        h = ctx.canvas.height = window.innerHeight;
        };

        var nt = 0;
        var noiseSpeed = 0.001;
        var noiseScale = 450;
        var dotSize = 18;
        var gap = 0;
        var hueBase = hue.hue;
        var hueRange = 22;
        var shape = 0;

        var controlsGUI = new function() {
        this.noiseSpeed = noiseSpeed;
        this.noiseScale = noiseScale;
        this.dotSize = dotSize;
        this.gap = gap;
        this.hueBase = hueBase;
        this.hueRange = hueRange;
        this.shape = shape;
        
        this.mainChange = function() {
            noiseSpeed = controlsGUI.noiseSpeed;
            noiseScale = controlsGUI.noiseScale;
            dotSize = controlsGUI.dotSize;
            gap = controlsGUI.gap;
            hueBase = controlsGUI.hueBase;
            hueRange = controlsGUI.hueRange;
            shape = controlsGUI.shape;
        }
        }

        var gui = new dat.GUI();
        gui.add(controlsGUI, "noiseSpeed", 0.000, 0.02).onChange(controlsGUI.mainChange);
        gui.add(controlsGUI, "noiseScale", 50, 1000).onChange(controlsGUI.mainChange);
        gui.add(controlsGUI, "dotSize", 1, 25).step(1).onChange(controlsGUI.mainChange);
        gui.add(controlsGUI, "gap", 0, 10).step(1).onChange(controlsGUI.mainChange);
        gui.add(controlsGUI, "hueBase", 0, 360).step(1).onChange(controlsGUI.mainChange);
        gui.add(controlsGUI, "hueRange", 0, 200).step(1).onChange(controlsGUI.mainChange);
        gui.add(controlsGUI, "shape", 0, 3).step(1).onChange(controlsGUI.mainChange);
        gui.close();
        console.log("created")
        function draw(){
        nt+=noiseSpeed;
        for(var x=0;x<w;x+=dotSize+gap){
            for(var y=0;y<h;y+=dotSize+gap){
            var yn = noise.perlin3(y/noiseScale, x/noiseScale, nt)*20;
            var cn = lerp(hueRange, yn*hueRange, 0.2);
            
            ctx.beginPath();
            ctx.fillStyle = "hsla("+(hueBase+cn)+",50%,50%,"+yn+")";
            if(shape==0){
                ctx.fillRect(x,y,dotSize,dotSize);
            }else if(shape==1){
                ctx.arc(x,y,dotSize/2,0,Math.PI*2);
                ctx.fill();
            } else if(shape==2){
                ctx.moveTo(x+(dotSize/2),y+dotSize);
                ctx.lineTo(x, y);
                ctx.lineTo(x+dotSize,y);
                ctx.fill();
            } else if(shape==3){
                if(y%((gap+dotSize)*2)==(gap+dotSize)){
                ctx.moveTo(x+(dotSize/2),y);
                ctx.lineTo(x+dotSize, y+dotSize);
                ctx.lineTo(x,y+dotSize);
                }else{
                ctx.moveTo(x+(dotSize/2),y+dotSize);
                ctx.lineTo(x, y);
                ctx.lineTo(x+dotSize,y);
                }
                ctx.fill();
            }
            ctx.closePath();
            }
        }
        }

        function clear(){
        ctx.fillStyle="rgba(0,0,0,1)";
        ctx.fillRect(0,0,w,h);
        };

        function render(){
        clear();
        draw();
        requestAnimationFrame(render);
        }
        render();
    }

  }, []);

  return (
<canvas id="canvas" className="blur-lg transform-gpu absolute -z-1 w-[100%]"></canvas>);
};

export default Noise;
