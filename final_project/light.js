"use strict";

function FPSCamera() {
    this.pos = vec3.V(0, 0, 0);
    this.dir = vec3.V(0, 0, 1);
    this.up = vec3.V(0, 1, 0);
    this.side = vec3.V(1, 0, 0);
    this.v = vec3.V(0, 0, 0);
    this.q = quat.Identity();
    this.mat = mat4.Identity();
    this.GLOBALUP = vec3.V(0, 1, 0);
    this.curPitch = 0;
    this.pitchLimit = Math.PI / 2.01;
    this.yaw(Math.PI)
}

function degreeToRadian(e) {
    return e * Math.PI / 180
}

function randomMesh(e, t, n) {
    var r = app.math.randChoice;
    var i = app.math.randInt;
    while (t > 0) {
        t -= 1;
        var s = r(e);
        data.newObject(s, [i(-n, n), i(-n, n), i(-n, n)], [1, 1, 1], degrees[i(-89, 89)], degrees[i(0, 359)], [i(50, 100) / 100, i(50, 100) / 100, i(50, 100) / 100])
    }
}

function rotateAll() {
    data.objects.forEach(function(e) {
        m4.rotateY(e.matrix, e.matrix, degrees[1])
    });
    data.render();
    requestAnimationFrame(rotateAll)
}
var matrix = function() {
    var e = {};
    var t;
    if (typeof Float32Array !== "undefined") {
        t = Float32Array
    } else {
        t = Array
    }
    if (n === undefined) {
        var n = 1e-7
    }
    e.mat4 = function() {
        var e = {};
        var t;
        if (typeof Float32Array !== "undefined") {
            t = Float32Array
        } else {
            t = Array
        }
        if (n === undefined) {
            var n = 1e-7
        }
        e.Identity = function() {
            var e = new t(16);
            e[0] = 1;
            e[1] = 0;
            e[2] = 0;
            e[3] = 0;
            e[4] = 0;
            e[5] = 1;
            e[6] = 0;
            e[7] = 0;
            e[8] = 0;
            e[9] = 0;
            e[10] = 1;
            e[11] = 0;
            e[12] = 0;
            e[13] = 0;
            e[14] = 0;
            e[15] = 1;
            return e
        };
        e.Clone = function(e) {
            var n = new t(16);
            n[0] = e[0];
            n[1] = e[1];
            n[2] = e[2];
            n[3] = e[3];
            n[4] = e[4];
            n[5] = e[5];
            n[6] = e[6];
            n[7] = e[7];
            n[8] = e[8];
            n[9] = e[9];
            n[10] = e[10];
            n[11] = e[11];
            n[12] = e[12];
            n[13] = e[13];
            n[14] = e[14];
            n[15] = e[15];
            return n
        };
        e.multiply = function(e, t, n) {
            var r = t[0],
                i = t[1],
                s = t[2],
                o = t[3],
                u = t[4],
                a = t[5],
                f = t[6],
                l = t[7],
                c = t[8],
                h = t[9],
                p = t[10],
                d = t[11],
                v = t[12],
                m = t[13],
                g = t[14],
                y = t[15];
            var b = n[0],
                w = n[1],
                E = n[2],
                S = n[3];
            e[0] = b * r + w * u + E * c + S * v;
            e[1] = b * i + w * a + E * h + S * m;
            e[2] = b * s + w * f + E * p + S * g;
            e[3] = b * o + w * l + E * d + S * y;
            b = n[4];
            w = n[5];
            E = n[6];
            S = n[7];
            e[4] = b * r + w * u + E * c + S * v;
            e[5] = b * i + w * a + E * h + S * m;
            e[6] = b * s + w * f + E * p + S * g;
            e[7] = b * o + w * l + E * d + S * y;
            b = n[8];
            w = n[9];
            E = n[10];
            S = n[11];
            e[8] = b * r + w * u + E * c + S * v;
            e[9] = b * i + w * a + E * h + S * m;
            e[10] = b * s + w * f + E * p + S * g;
            e[11] = b * o + w * l + E * d + S * y;
            b = n[12];
            w = n[13];
            E = n[14];
            S = n[15];
            e[12] = b * r + w * u + E * c + S * v;
            e[13] = b * i + w * a + E * h + S * m;
            e[14] = b * s + w * f + E * p + S * g;
            e[15] = b * o + w * l + E * d + S * y;
            return e
        };
        e.translate = function(e, t, n) {
            var r = n[0],
                i = n[1],
                s = n[2];
            if (t === e) {
                t[12] += t[0] * r + t[4] * i + t[8] * s;
                t[13] += t[1] * r + t[5] * i + t[9] * s;
                t[14] += t[2] * r + t[6] * i + t[10] * s;
                t[15] += t[3] * r + t[7] * i + t[11] * s;
                return t
            }
            var o = t[0];
            var u = t[1];
            var a = t[2];
            var f = t[3];
            var l = t[4];
            var c = t[5];
            var h = t[6];
            var p = t[7];
            var d = t[8];
            var v = t[9];
            var m = t[10];
            var g = t[11];
            e[0] = o;
            e[1] = u;
            e[2] = a;
            e[3] = f;
            e[4] = l;
            e[5] = c;
            e[6] = h;
            e[7] = p;
            e[8] = d;
            e[9] = v;
            e[10] = m;
            e[11] = g;
            e[12] = o * r + l * i + d * s + t[12];
            e[13] = u * r + c * i + v * s + t[13];
            e[14] = a * r + h * i + m * s + t[14];
            e[15] = f * r + p * i + g * s + t[15];
            return e
        };
        e.scale = function(e, t, n) {
            var r = n[0],
                i = n[1],
                s = n[2];
            if (e === t) {
                t[0] *= r;
                t[1] *= r;
                t[2] *= r;
                t[3] *= r;
                t[4] *= i;
                t[5] *= i;
                t[6] *= i;
                t[7] *= i;
                t[8] *= s;
                t[9] *= s;
                t[10] *= s;
                t[11] *= s;
                return t
            } else {
                e[0] = t[0] * r;
                e[1] = t[1] * r;
                e[2] = t[2] * r;
                e[3] = t[3] * r;
                e[4] = t[4] * i;
                e[5] = t[5] * i;
                e[6] = t[6] * i;
                e[7] = t[7] * i;
                e[8] = t[8] * s;
                e[9] = t[9] * s;
                e[10] = t[10] * s;
                e[11] = t[11] * s;
                e[12] = t[12];
                e[13] = t[13];
                e[14] = t[14];
                e[15] = t[15];
                return e
            }
        };
        e.transpose = function(e, t) {
            if (t === e) {
                var n = 0;
                n = t[1];
                t[1] = t[4];
                t[4] = n;
                n = t[2];
                t[2] = t[8];
                t[8] = n;
                n = t[3];
                t[3] = t[12];
                t[12] = n;
                n = t[6];
                t[6] = t[9];
                t[9] = n;
                n = t[7];
                t[7] = t[13];
                t[13] = n;
                n = t[11];
                t[11] = t[14];
                t[14] = n;
                return t
            } else {
                e[0] = t[0];
                e[1] = t[4];
                e[2] = t[8];
                e[3] = t[12];
                e[4] = t[1];
                e[5] = t[5];
                e[6] = t[9];
                e[7] = t[13];
                e[8] = t[2];
                e[9] = t[6];
                e[10] = t[10];
                e[11] = t[14];
                e[12] = t[3];
                e[13] = t[7];
                e[14] = t[11];
                e[15] = t[15];
                return e
            }
        };
        e.rotateX = function(e, t, n) {
            var r = Math.sin(n),
                i = Math.cos(n),
                s = t[4],
                o = t[5],
                u = t[6],
                a = t[7],
                f = t[8],
                l = t[9],
                c = t[10],
                h = t[11];
            if (t !== e) {
                e[0] = t[0];
                e[1] = t[1];
                e[2] = t[2];
                e[3] = t[3];
                e[12] = t[12];
                e[13] = t[13];
                e[14] = t[14];
                e[15] = t[15]
            }
            e[4] = s * i + f * r;
            e[5] = o * i + l * r;
            e[6] = u * i + c * r;
            e[7] = a * i + h * r;
            e[8] = f * i - s * r;
            e[9] = l * i - o * r;
            e[10] = c * i - u * r;
            e[11] = h * i - a * r;
            return e
        };
        e.rotateY = function(e, t, n) {
            var r = Math.sin(n),
                i = Math.cos(n),
                s = t[0],
                o = t[1],
                u = t[2],
                a = t[3],
                f = t[8],
                l = t[9],
                c = t[10],
                h = t[11];
            if (t !== e) {
                e[4] = t[4];
                e[5] = t[5];
                e[6] = t[6];
                e[7] = t[7];
                e[12] = t[12];
                e[13] = t[13];
                e[14] = t[14];
                e[15] = t[15]
            }
            e[0] = s * i - f * r;
            e[1] = o * i - l * r;
            e[2] = u * i - c * r;
            e[3] = a * i - h * r;
            e[8] = s * r + f * i;
            e[9] = o * r + l * i;
            e[10] = u * r + c * i;
            e[11] = a * r + h * i;
            return e
        };
        e.rotateZ = function(e, t, n) {
            var r = Math.sin(n),
                i = Math.cos(n),
                s = t[0],
                o = t[1],
                u = t[2],
                a = t[3],
                f = t[4],
                l = t[5],
                c = t[6],
                h = t[7];
            if (t !== e) {
                e[8] = t[8];
                e[9] = t[9];
                e[10] = t[10];
                e[11] = t[11];
                e[12] = t[12];
                e[13] = t[13];
                e[14] = t[14];
                e[15] = t[15]
            }
            e[0] = s * i + f * r;
            e[1] = o * i + l * r;
            e[2] = u * i + c * r;
            e[3] = a * i + h * r;
            e[4] = f * i - s * r;
            e[5] = l * i - o * r;
            e[6] = c * i - u * r;
            e[7] = h * i - a * r;
            return e
        };
        e.inverse = function(e, t) {
            var n = t[0],
                r = t[1],
                i = t[2],
                s = t[3],
                o = t[4],
                u = t[5],
                a = t[6],
                f = t[7],
                l = t[8],
                c = t[9],
                h = t[10],
                p = t[11],
                d = t[12],
                v = t[13],
                m = t[14],
                g = t[15],
                y = n * u - r * o,
                b = n * a - i * o,
                w = n * f - s * o,
                E = r * a - i * u,
                S = r * f - s * u,
                x = i * f - s * a,
                T = l * v - c * d,
                N = l * m - h * d,
                C = l * g - p * d,
                k = c * m - h * v,
                L = c * g - p * v,
                A = h * g - p * m,
                O = y * A - b * L + w * k + E * C - S * N + x * T;
            if (!O) {
                return null
            }
            O = 1 / O;
            e[0] = (u * A - a * L + f * k) * O;
            e[1] = (i * L - r * A - s * k) * O;
            e[2] = (v * x - m * S + g * E) * O;
            e[3] = (h * S - c * x - p * E) * O;
            e[4] = (a * C - o * A - f * N) * O;
            e[5] = (n * A - i * C + s * N) * O;
            e[6] = (m * w - d * x - g * b) * O;
            e[7] = (l * x - h * w + p * b) * O;
            e[8] = (o * L - u * C + f * T) * O;
            e[9] = (r * C - n * L - s * T) * O;
            e[10] = (d * S - v * w + g * y) * O;
            e[11] = (c * w - l * S - p * y) * O;
            e[12] = (u * N - o * k - a * T) * O;
            e[13] = (n * k - r * N + i * T) * O;
            e[14] = (v * b - d * E - m * y) * O;
            e[15] = (l * E - c * b + h * y) * O;
            return e
        };
        e.lookAt = function(t, r, i, s) {
            var o, u, a, f, l, c, h, p, d, v, m = r[0],
                g = r[1],
                y = r[2],
                b = s[0],
                w = s[1],
                E = s[2],
                S = i[0],
                x = i[1],
                T = i[2];
            if (Math.abs(m - S) < n && Math.abs(g - x) < n && Math.abs(y - T) < n) {
                console.log("wierd lookAT call");
                return e.identity(t)
            }
            h = m - S;
            p = g - x;
            d = y - T;
            v = 1 / Math.sqrt(h * h + p * p + d * d);
            h *= v;
            p *= v;
            d *= v;
            o = w * d - E * p;
            u = E * h - b * d;
            a = b * p - w * h;
            v = Math.sqrt(o * o + u * u + a * a);
            if (!v) {
                o = 0;
                u = 0;
                a = 0
            } else {
                v = 1 / v;
                o *= v;
                u *= v;
                a *= v
            }
            f = p * a - d * u;
            l = d * o - h * a;
            c = h * u - p * o;
            v = Math.sqrt(f * f + l * l + c * c);
            if (!v) {
                f = 0;
                l = 0;
                c = 0
            } else {
                v = 1 / v;
                f *= v;
                l *= v;
                c *= v
            }
            t[0] = o;
            t[1] = f;
            t[2] = h;
            t[3] = 0;
            t[4] = u;
            t[5] = l;
            t[6] = p;
            t[7] = 0;
            t[8] = a;
            t[9] = c;
            t[10] = d;
            t[11] = 0;
            t[12] = -(o * m + u * g + a * y);
            t[13] = -(f * m + l * g + c * y);
            t[14] = -(h * m + p * g + d * y);
            t[15] = 1;
            return t
        };
        e.identity = function(e) {
            e[0] = 1;
            e[1] = 0;
            e[2] = 0;
            e[3] = 0;
            e[4] = 0;
            e[5] = 1;
            e[6] = 0;
            e[7] = 0;
            e[8] = 0;
            e[9] = 0;
            e[10] = 1;
            e[11] = 0;
            e[12] = 0;
            e[13] = 0;
            e[14] = 0;
            e[15] = 1;
            return e
        };
        e.perspective = function(e, t, n, r, i) {
            var s = 1 / Math.tan(t / 2),
                o = 1 / (r - i);
            e[0] = s / n;
            e[1] = 0;
            e[2] = 0;
            e[3] = 0;
            e[4] = 0;
            e[5] = s;
            e[6] = 0;
            e[7] = 0;
            e[8] = 0;
            e[9] = 0;
            e[10] = (i + r) * o;
            e[11] = -1;
            e[12] = 0;
            e[13] = 0;
            e[14] = 2 * i * r * o;
            e[15] = 0;
            return e
        };
        return e
    }();
    e.vec3 = function() {
        var e = {};
        e.V = function(e, n, r) {
            var i = new t(3);
            i[0] = e;
            i[1] = n;
            i[2] = r;
            return i
        };
        e.minus = function(e, t, n) {
            e[0] = t[0] - n[0];
            e[1] = t[1] - n[1];
            e[2] = t[2] - n[2];
            return e
        };
        e.plus = function(e, t, n) {
            e[0] = t[0] + n[0];
            e[1] = t[1] + n[1];
            e[2] = t[2] + n[2];
            return e
        };
        e.scale = function(e, t, n) {
            e[0] = t[0] * n;
            e[1] = t[1] * n;
            e[2] = t[2] * n;
            return e
        };
        e.normalize = function(e, t) {
            var n = t[0],
                r = t[1],
                i = t[2];
            var s = n * n + r * r + i * i;
            if (s > 0) {
                s = 1 / Math.sqrt(s);
                e[0] = t[0] * s;
                e[1] = t[1] * s;
                e[2] = t[2] * s
            }
            return e
        };
        e.cross = function(e, t, n) {
            var r = t[0],
                i = t[1],
                s = t[2],
                o = n[0],
                u = n[1],
                a = n[2];
            e[0] = i * a - s * u;
            e[1] = s * o - r * a;
            e[2] = r * u - i * o;
            return e
        };
        e.dot = function(e, t) {
            return e[0] * t[0] + e[1] * t[1] + e[2] * t[2]
        };
        e.rotateByQuat = function(e, t, n) {
            var r = n[0],
                i = n[1],
                s = n[2],
                o = n[3],
                u = t[0],
                a = t[1],
                f = t[2],
                l = 2 * (i * f - s * a),
                c = 2 * (s * u - r * f),
                h = 2 * (r * a - i * u),
                p = i * h - s * c,
                d = s * l - r * h,
                v = r * c - i * l;
            e[0] = u + o * l + p;
            e[1] = a + o * c + d;
            e[2] = f + o * h + v;
            return e
        };
        e.rotateByQuat1 = function(e, t, n) {
            var r = n[0],
                i = n[1],
                s = n[2],
                o = n[3],
                u = t[0],
                a = t[1],
                f = t[2],
                l = o * u + i * f - s * a,
                c = o * a + s * u - r * f,
                h = o * f + r * a - i * u,
                p = -r * u - i * a - s * f;
            e[0] = l * o + p * -r + c * -s - h * -i;
            e[1] = c * o + p * -i + h * -r - l * -s;
            e[2] = h * o + p * -s + l * -i - c * -r;
            return e
        };
        e.mulMat4 = function(e, t, n) {
            var r = t[0],
                i = t[1],
                s = t[2],
                o = n[3] * r + n[7] * i + n[11] * s + n[15];
            o = o || 1;
            e[0] = (n[0] * r + n[4] * i + n[8] * s + n[12]) / o;
            e[1] = (n[1] * r + n[5] * i + n[9] * s + n[13]) / o;
            e[2] = (n[2] * r + n[6] * i + n[10] * s + n[14]) / o;
            return e
        };
        return e
    }();
    e.quat = function() {
        var e = {};
        e.Identity = function() {
            var e = new t(4);
            e[0] = 0;
            e[1] = 0;
            e[2] = 0;
            e[3] = 1;
            return e
        };
        e.axisAngle = function(e, t, n) {
            n /= 2;
            var r = Math.sin(n);
            e[0] = r * t[0];
            e[1] = r * t[1];
            e[2] = r * t[2];
            e[3] = Math.cos(n);
            return e
        };
        e.multiply = function(e, t, n) {
            var r = t[0],
                i = t[1],
                s = t[2],
                o = t[3],
                u = n[0],
                a = n[1],
                f = n[2],
                l = n[3];
            e[0] = r * l + o * u + i * f - s * a;
            e[1] = i * l + o * a + s * u - r * f;
            e[2] = s * l + o * f + r * a - i * u;
            e[3] = o * l - r * u - i * a - s * f;
            return e
        };
        e.conjugate = function(e, t) {
            e[0] = -t[0];
            e[1] = -t[1];
            e[2] = -t[2];
            e[3] = t[3];
            return e
        };
        e.reCalcW = function(e, t) {
            var n = t[0],
                r = t[1],
                i = t[2];
            e[0] = n;
            e[1] = r;
            e[2] = i;
            e[3] = Math.sqrt(Math.abs(1 - n * n - r * r - i * i));
            return e
        };
        return e
    }();
    return e
}();
"use strict";
var vec3 = vec3 || matrix.vec3;
var mat4 = mat4 || matrix.mat4;
var quat = quat || matrix.quat;
FPSCamera.prototype = {
    forward: function(e) {
        this.pos[0] += this.dir[0] * e;
        this.pos[1] += this.dir[1] * e;
        this.pos[2] += this.dir[2] * e
    },
    strife: function(e) {
        this.pos[0] += this.side[0] * e;
        this.pos[1] += this.side[1] * e;
        this.pos[2] += this.side[2] * e
    },
    fly: function(e) {
        this.pos[0] += this.up[0] * e;
        this.pos[1] += this.up[1] * e;
        this.pos[2] += this.up[2] * e
    },
    yaw: function(e) {
        this.q = quat.axisAngle(this.q, this.GLOBALUP, e);
        vec3.rotateByQuat(this.dir, this.dir, this.q);
        vec3.cross(this.side, this.GLOBALUP, this.dir);
        vec3.normalize(this.side, this.side)
    },
    pitch: function(e) {
        if (this.curPitch + e > this.pitchLimit) {
            e = this.pitchLimit - this.curPitch;
            this.curPitch = this.pitchLimit
        } else if (this.curPitch + e < -this.pitchLimit) {
            e = -this.pitchLimit - this.curPitch;
            this.curPitch = -this.pitchLimit
        } else {
            this.curPitch += e
        }
        this.q = quat.axisAngle(this.q, this.side, e);
        vec3.rotateByQuat(this.dir, this.dir, this.q);
        vec3.cross(this.up, this.dir, this.side);
        vec3.normalize(this.up, this.up)
    },
    cameraMatrix: function() {
        mat4.lookAt(this.mat, this.pos, vec3.plus(this.v, this.pos, this.dir), this.up);
        return this.mat
    }
};
"use strict";
var mesh = {};
mesh.cube = {};
mesh.cube.vertices = [1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1, 1, 1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1, 1, 1, 1, 1, -1, -1, 1, -1, -1, 1, 1, -1, 1, 1, -1, 1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, 1, -1, -1, 1, -1, 1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, 1, -1, 1, 1, -1];
mesh.cube.normals = [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1];
mesh.cube.colors = [.4, .4, 1, .4, .4, 1, .4, .4, 1, .4, .4, 1, .4, 1, .4, .4, 1, .4, .4, 1, .4, .4, 1, .4, 1, .4, .4, 1, .4, .4, 1, .4, .4, 1, .4, .4, 1, 1, .4, 1, 1, .4, 1, 1, .4, 1, 1, .4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, .4, 1, 1, .4, 1, 1, .4, 1, 1, .4, 1, 1];
mesh.cube.uv = [1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1];
mesh.cube.indices = [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23];
mesh.plane = {};
mesh.plane.vertices = [1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, 1, -1, -1, 1, -1, 1, -1, -1, 1];
mesh.plane.normals = [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0];
mesh.plane.uv = [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0];
mesh.plane.colors = [.8, .8, .8, .8, .8, .8, .8, .8, .8, .8, .8, .8, .3, .3, .3, .3, .3, .3, .3, .3, .3, .3, .3, .3];
mesh.plane.indices = [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7];
"use strict";
var app = {};
app.loop = function(e) {
    var t = {
        entities: [],
        push: function(e) {
            t.entities.push(e)
        },
        fps: 30,
        time: 0,
        stepSize: .01667
    };
    var n = .01667;
    var r = 0;
    var i = 0;
    t.start = function(e) {
        n = e || .01667;
        t.stepsize = n;
        if (!types.isNumber(n) || e <= 0) {
            throw new TypeError("Cant start loop, stepSize is invalid: " + n)
        }
        t.start = noOp;
        s(0)
    };
    var s = function(e) {
        e /= 1e3;
        var o = e - i;
        t.fps = 1 / o;
        i = e;
        t.time = i;
        o = o > .25 ? .25 : o;
        r += o;
        while (r > n) {
            r -= n;
            t.entities.forEach(function(e) {
                if (e.update) {
                    e.update(n)
                }
            })
        }
        t.entities.forEach(function(e) {
            if (e.draw) {
                e.draw(r)
            }
        });
        requestAnimationFrame(s, null)
    };
    return t
};
app.useKeyboard = function(e) {
    var t = {
        onKeyDown: [],
        preventDefaultBehaviours: true,
        A: 65,
        B: 66,
        C: 67,
        D: 68,
        E: 69,
        F: 70,
        G: 71,
        H: 72,
        I: 73,
        J: 74,
        K: 75,
        L: 76,
        M: 77,
        N: 78,
        O: 79,
        P: 80,
        Q: 81,
        R: 82,
        S: 83,
        T: 84,
        U: 85,
        V: 86,
        W: 87,
        X: 88,
        Y: 89,
        Z: 90,
        0: 48,
        1: 49,
        2: 50,
        3: 51,
        4: 52,
        5: 53,
        6: 54,
        7: 55,
        8: 56,
        9: 57,
        ENTER: 13,
        SPACE: 32,
        TAB: 9,
        ESC: 27,
        BACKSPACE: 8,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        SHIFT: 16,
        CONTROL: 17,
        ALT: 18,
        CAPSLOCK: 20,
        NUMSLOCK: 144,
        INSERT: 45,
        DELETE: 46,
        HOME: 36,
        END: 35,
        PAGEUP: 33,
        PAGEDOWN: 34,
        F1: 112,
        F2: 113,
        F3: 114,
        F4: 115,
        F5: 116,
        F6: 117,
        F7: 118,
        F8: 119,
        F9: 120,
        F10: 121,
        F11: 122,
        F12: 123
    };
    e.tabIndex = 0;
    var n = t.onKeyDown;
    e.addEventListener("keydown", function(e) {
        if (n[e.keyCode] !== undefined) {
            n[e.keyCode]()
        }
        if (t.preventDefaultBehaviours === true) {
            e.preventDefault()
        }
    }, false);
    return t
};
app.useCursor = function(e) {
    function n(e, t, n) {
        t = t.split(" ");
        var r = t.length;
        while (r--) {
            e.addEventListener(t[r], n, false)
        }
    }

    function r(e) {
        if (e.targetTouches !== undefined) {
            return e.targetTouches[0]
        } else {
            return e
        }
    }
    var t = {
        x: 0,
        y: 0,
        isPressed: false,
        lastX: 0,
        lastY: 0,
        lastT: 0,
        clickX: 0,
        clickY: 0,
        clickT: 0,
        dx: 0,
        dy: 0,
        duration: 0,
        button: 0,
        wheelDelta: 0,
        onDown: function() {},
        onMove: function() {},
        onUp: function() {},
        onWheel: function() {},
        BUTTONLEFT: 1,
        BUTTONWHEEL: 2,
        BUTTONRIGHT: 3
    };
    n(e, "contextmenu click", function(e) {
        e.preventDefault()
    });
    n(e, "touchstart mousedown", function(n) {
        n.preventDefault();
        var i = r(n);
        var s = e.getBoundingClientRect();
        t.x = t.lastX = i.clientX - s.left;
        t.y = t.lastY = i.clientY - s.top;
        t.button = n.which;
        t.isPressed = true;
        t.dx = 0;
        t.dy = 0;
        t.duration = 0;
        t.lastT = n.timeStamp;
        t.clickT = n.timeStamp;
        t.clickX = t.x;
        t.clickY = t.y;
        t.onDown()
    });
    n(e, "touchend mouseup touchcancel", function(e) {
        e.preventDefault();
        t.isPressed = false;
        t.onUp()
    });
    n(e, "touchmove mousemove", function(n) {
        n.preventDefault();
        var i = r(n);
        var s = e.getBoundingClientRect();
        t.x = i.clientX - s.left;
        t.y = i.clientY - s.top;
        if (t.isPressed) {
            t.dx = t.x - t.lastX;
            t.dy = t.y - t.lastY;
            t.duration = n.timeStamp - t.lastT;
            t.lastX = t.x;
            t.lastY = t.y;
            t.lastT = n.timeStamp
        }
        t.onMove()
    });
    n(e, "DOMMouseScroll mousewheel", function(e) {
        e.preventDefault();
        t.wheelDelta = e.detail ? e.detail * -120 : e.wheelDelta;
        t.onWheel()
    });
    return t
};
app.math = function() {
    var e = {};
    e.randInt = function(e, t) {
        return Math.floor(e + Math.random() * (t - e + 1))
    };
    e.randChoice = function(t) {
        return t[e.randInt(0, t.length - 1)]
    };
    e.clamp = function(e, t, n) {
        if (e < t) {
            return t
        } else if (e > n) {
            return n
        } else {
            return e
        }
    };
    return e
}();
"use strict";
var lib = function() {
    var t = {};
    t.initGL = function(e, t) {
        var n = document.getElementById(e);
        var r = null;
        try {
            r = n.getContext("webgl", t) || n.getContext("experimental-webgl", t)
        } catch (i) {}
        if (!r) {
            throw new Error("Unable to initialize WebGL. Your browser may not support it.")
        }
        return r
    };
    t.initShader = function(e, t) {
        var n = document.getElementById(t);
        if (!n) throw new Error("Can not find shader: " + t);
        var r = "";
        var i = n.firstChild;
        while (i) {
            if (i.nodeType == i.TEXT_NODE) {
                r += i.textContent
            }
            i = i.nextSibling
        }
        if (n.type == "x-shader/x-fragment") {
            var s = e.createShader(e.FRAGMENT_SHADER)
        } else if (n.type == "x-shader/x-vertex") {
            s = e.createShader(e.VERTEX_SHADER)
        } else {
            throw new Error("Unknown shader type")
        }
        e.shaderSource(s, r);
        e.compileShader(s);
        if (!e.getShaderParameter(s, e.COMPILE_STATUS)) {
            throw new Error("An error occurred compiling the shaders: " + e.getShaderInfoLog(s))
        }
        return s
    };
    t.initProgram = function(e, t) {
        var n = e.createProgram();
        t.forEach(function(r) {
            e.attachShader(n, r)
        });
        e.linkProgram(n);
        if (!e.getProgramParameter(n, e.LINK_STATUS)) {
            throw new Error("Unable to initialize the shader program.")
        }
        return n
    };
    return t
}();
var shaderVars = function(e, t) {
    var n = {};
    n.attributeInfo = {};
    n.uniformInfo = {};
    n.activeBuffer = null;
    n.createdElementArray = false;
    var r = e.getProgramParameter(t, e.ACTIVE_ATTRIBUTES);
    for (var i = 0; i < r; i++) {
        var s = e.getActiveAttrib(t, i);
        n.attributeInfo[s.name] = s;
        s.loc = e.getAttribLocation(t, s.name);
        s.noDataPassed = true;
        s.unConfigured = true
    }
    var o = e.getProgramParameter(t, e.ACTIVE_UNIFORMS);
    for (i = 0; i < o; i++) {
        s = e.getActiveUniform(t, i);
        n.uniformInfo[s.name] = s;
        s.loc = e.getUniformLocation(t, s.name);
        s.noDataPassed = true
    }
    n.newArrayBuffer = function(t) {
        if (n.attributeInfo[t] === undefined) throw new Error("The current program does not use " + t + " attribute.");
        var r = {
            data: [],
            size: 0,
            type: e.FLOAT,
            normalized: false,
            stride: 0,
            offset: 0,
            usage: e.STATIC_DRAW,
            enabled: true,
            location: n.attributeInfo[t].loc,
            glBuffer: e.createBuffer()
        };
        e.enableVertexAttribArray(r.location);
        r.cfg = function(i, s, o, u, a) {
            if (n.activeBuffer !== r) {
                e.bindBuffer(e.ARRAY_BUFFER, r.glBuffer);
                n.activeBuffer = r
            }
            e.vertexAttribPointer(r.location, i || r.size, s || r.type, o || r.normalized, u || r.stride, a || r.offset);
            if (i !== undefined) r.size = i;
            if (s !== undefined) r.type = s;
            if (o !== undefined) r.normalized = o;
            if (u !== undefined) r.stride = u;
            if (a !== undefined) r.offset = a;
            n.attributeInfo[t].unConfigured = false
        };
        r.pushData = function(i) {
            if (i instanceof Array) {
                if (r.type === e.FLOAT) i = new Float32Array(i)
            }
            if (n.activeBuffer !== r) {
                e.bindBuffer(e.ARRAY_BUFFER, r.glBuffer);
                n.activeBuffer = r
            }
            e.bufferData(e.ARRAY_BUFFER, i, r.usage);
            n.attributeInfo[t].noDataPassed = false
        };
        return r
    };
    n.newElementArrayBuffer = function() {
        var t = {
            usage: e.STATIC_DRAW,
            data: [],
            glBuffer: e.createBuffer()
        };
        t.cfg = function(t) {
            this.usage = t || e.STATIC_DRAW
        };
        t.pushData = function(r, i) {
            if (r instanceof Array) r = new Uint16Array(r);
            if (n.activeBuffer !== t) {
                e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, t.glBuffer);
                n.activeBuffer = t
            }
            e.bufferData(e.ELEMENT_ARRAY_BUFFER, r, t.usage)
        };
        return t
    };
    n.newUniformSetter = function(t) {
        if (n.uniformInfo[t] === undefined) {
            console.log("WARNING: The current program does not use " + t + " uniform.");
            return function() {}
        }
        var r = n.uniformInfo[t];
        r.data = null;
        return function() {
            var n = r.loc;
            var i = r.type;
            var s = r.size > 1 && r.name.substr(-3) === "[0]";
            if (i === e.FLOAT && s) return function(t) {
                e.uniform1fv(n, t);
                r.data = t
            };
            if (i === e.FLOAT) return function(t) {
                e.uniform1f(n, t);
                r.data = t
            };
            if (i === e.FLOAT_VEC2) return function(t) {
                e.uniform2fv(n, t);
                r.data = t
            };
            if (i === e.FLOAT_VEC3) return function(t) {
                e.uniform3fv(n, t);
                r.data = t
            };
            if (i === e.FLOAT_VEC4) return function(t) {
                e.uniform4fv(n, t);
                r.data = t
            };
            if (i === e.INT && s) return function(t) {
                e.uniform1iv(n, t);
                r.data = t
            };
            if (i === e.INT) return function(t) {
                e.uniform1i(n, t);
                r.data = t
            };
            if (i === e.INT_VEC2) return function(t) {
                e.uniform2iv(n, t);
                r.data = t
            };
            if (i === e.INT_VEC3) return function(t) {
                e.uniform3iv(n, t);
                r.data = t
            };
            if (i === e.INT_VEC4) return function(t) {
                e.uniform4iv(n, t);
                r.data = t
            };
            if (i === e.BOOL) return function(t) {
                e.uniform1iv(n, t);
                r.data = t
            };
            if (i === e.BOOL_VEC2) return function(t) {
                e.uniform2iv(n, t);
                r.data = t
            };
            if (i === e.BOOL_VEC3) return function(t) {
                e.uniform3iv(n, t);
                r.data = t
            };
            if (i === e.BOOL_VEC4) return function(t) {
                e.uniform4iv(n, t);
                r.data = t
            };
            if (i === e.FLOAT_MAT2) return function(t) {
                e.uniformMatrix2fv(n, false, t);
                r.data = t
            };
            if (i === e.FLOAT_MAT3) return function(t) {
                e.uniformMatrix3fv(n, false, t);
                r.data = t
            };
            if (i === e.FLOAT_MAT4) return function(t) {
                e.uniformMatrix4fv(n, false, t);
                r.data = t
            };
            throw new Error("Can not be used for textures, or unknown type: " + i)
        }()
    };
    n.resize = function(t, n) {
        e.canvas.width = t;
        e.canvas.height = n;
        e.viewport(0, 0, t, n)
    };
    return n
};
"use strict";
var m4 = matrix.mat4;
var v3 = matrix.vec3;
var gl = lib.initGL("canvas", {
    premultipliedAlpha: false
});
var vertexShader = lib.initShader(gl, "vertex-shader");
var fragmentShader = lib.initShader(gl, "fragment-shader");
var program = lib.initProgram(gl, [vertexShader, fragmentShader]);
gl.useProgram(program);
var util = shaderVars(gl, program);
util.resize(400, 400);
gl.clearColor(.5, .5, .5, 1);
gl.enable(gl.CULL_FACE);
gl.enable(gl.DEPTH_TEST);
var data = function() {
    var e = {};
    e.objects = [];
    e.vertexOffset = 0;
    e.indexOffset = 0;
    e.UINTLIMIT = Math.pow(2, 16) - 1;
    e.vertices = util.newArrayBuffer("a_position");
    e.vertices.cfg(3, gl.FLOAT, false, 0, 0);
    e.colors = util.newArrayBuffer("a_color");
    e.colors.cfg(3, gl.FLOAT, false, 0, 0);
    e.normals = util.newArrayBuffer("a_normal");
    e.normals.cfg(3, gl.FLOAT, false, 0, 0);
    e.indices = util.newElementArrayBuffer();
    e.newObject = function(t, n, r, i, s, o) {
        var u = {};
        u.matrix = m4.Identity();
        m4.scale(u.matrix, u.matrix, r);
        m4.rotateX(u.matrix, u.matrix, i);
        m4.rotateY(u.matrix, u.matrix, s);
        m4.translate(u.matrix, u.matrix, n);
        u.index = e.indexOffset;
        u.elemCount = t.indices.length;
        e.indexOffset += t.indices.length;
        u.vertices = t.vertices;
        u.normals = t.normals;
        u.indices = [];
        for (var a = 0, f = t.indices.length; a < f; a++) {
            u.indices[a] = t.indices[a] + e.vertexOffset
        }
        u.colors = [];
        for (a = 0, f = t.colors.length; a < f; a += 3) {
            u.colors[a] = t.colors[a] * o[0];
            u.colors[a + 1] = t.colors[a + 1] * o[1];
            u.colors[a + 2] = t.colors[a + 2] * o[2]
        }
        e.vertexOffset += t.vertices.length / 3;
        e.objects.push(u);
        return u
    };
    e.pushData = function() {
        e.objects.forEach(function(t) {
            e.vertices.data.push.apply(e.vertices.data, t.vertices);
            e.colors.data.push.apply(e.colors.data, t.colors);
            e.normals.data.push.apply(e.normals.data, t.normals);
            e.indices.data.push.apply(e.indices.data, t.indices)
        });
        e.vertices.pushData(e.vertices.data);
        e.colors.pushData(e.colors.data);
        e.normals.pushData(e.normals.data);
        e.indices.pushData(e.indices.data)
    };
    e.render = function() {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        var t = camera.cameraMatrix();
        u_lightPositionCameraSpace(v3.mulMat4(tempV3, lightPosition, t));
        u_vMatrix(t);
        u_cameraDirection(camera.dir);
        u_cameraPosition(camera.pos);
        v3.mulMat4(tempV3, camera.dir, t);
        e.objects.forEach(function(e) {
            m4.multiply(mvMatrix, t, e.matrix);
            m4.multiply(mvpMatrix, projection, mvMatrix);
            m4.inverse(tempM4, mvMatrix);
            m4.transpose(tempM4, tempM4);
            u_nMatrix(tempM4);
            u_mMatrix(e.matrix);
            u_mvMatrix(mvMatrix);
            u_mvpMatrix(mvpMatrix);
            gl.drawElements(gl.TRIANGLES, e.indices.length, gl.UNSIGNED_SHORT, e.index * 2)
        })
    };
    return e
}();
data.newObject(mesh.plane, [0, 0, 0], [10, 1, 10], 0, 0, [1, 1, 1]);
data.newObject(mesh.cube, [5, 0, 0], [1, 1, 1], 0, 0, [1, .5, .5]);
data.newObject(mesh.cube, [-5, 0, 0], [1, 1, 1], 0, 0, [.5, .5, 1]);
var degrees = {};
for (var i = 0; i < 360; i++) {
    degrees[i] = degreeToRadian(i)
}
var randChoice = app.math.randChoice;
randomMesh([mesh.cube, mesh.plane], 100, 10);
data.pushData();
var mvpMatrix = m4.Identity();
var mvMatrix = m4.Identity();
var projection = m4.perspective(m4.Identity(), Math.PI / 3, gl.canvas.clientWidth / gl.canvas.clientHeight, .01, 100);
var u_mvpMatrix = util.newUniformSetter("u_mvpMatrix");
var u_mvMatrix = util.newUniformSetter("u_mvMatrix");
var u_mMatrix = util.newUniformSetter("u_mMatrix");
var u_vMatrix = util.newUniformSetter("u_vMatrix");
var u_nMatrix = util.newUniformSetter("u_nMatrix");
var u_cameraDirection = util.newUniformSetter("u_cameraDirection");
var u_cameraPosition = util.newUniformSetter("u_cameraPosition");
var u_lightPositionCameraSpace = util.newUniformSetter("u_lightPositionCameraSpace");
var lightPosition = v3.V(0, 1, 0);
var tempV3 = v3.V(1, 1, 1);
var tempM4 = m4.Identity();
var camera = new FPSCamera;
var render = data.render;
rotateAll();
var mouse = app.useCursor(gl.canvas);
mouse.mode = 0;
mouse.modePANNING = 1;
mouse.modeROTATING = 2;
mouse.onWheel = function() {
    camera.forward(.1 * mouse.wheelDelta / 10);
    render()
};
mouse.onDown = function() {
    if (mouse.button === mouse.BUTTONRIGHT) {
        mouse.mode = mouse.modePANNING
    } else if (mouse.button === mouse.BUTTONLEFT) {
        mouse.mode = mouse.modeROTATING
    }
};
mouse.onMove = function() {
    if (!mouse.isPressed) return;
    if (mouse.mode === mouse.modePANNING) {
        camera.strife(-mouse.dx * .1);
        camera.fly(-mouse.dy * .1)
    } else if (mouse.mode === mouse.modeROTATING) {
        camera.pitch(mouse.dy * .01);
        camera.yaw(-mouse.dx * .01)
    }
    render()
}
