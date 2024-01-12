import Vf from "crypto";
import _u from "fs";
import { LRUCache as Yf } from "lru-cache";
import i0 from "path";
import { hideBin as Wf } from "yargs/helpers";
import Xf from "yargs/yargs";
import Tn from "os";
import zf from "process";
import * as Qf from "sass";
import { spawn as Kf } from "child_process";
function Jf(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var _o = { exports: {} }, Pe = _o.exports = {}, Fu, qu;
function Kn() {
  throw new Error("setTimeout has not been defined");
}
function Jn() {
  throw new Error("clearTimeout has not been defined");
}
(function() {
  try {
    typeof setTimeout == "function" ? Fu = setTimeout : Fu = Kn;
  } catch {
    Fu = Kn;
  }
  try {
    typeof clearTimeout == "function" ? qu = clearTimeout : qu = Jn;
  } catch {
    qu = Jn;
  }
})();
function yo(e) {
  if (Fu === setTimeout)
    return setTimeout(e, 0);
  if ((Fu === Kn || !Fu) && setTimeout)
    return Fu = setTimeout, setTimeout(e, 0);
  try {
    return Fu(e, 0);
  } catch {
    try {
      return Fu.call(null, e, 0);
    } catch {
      return Fu.call(this, e, 0);
    }
  }
}
function Zf(e) {
  if (qu === clearTimeout)
    return clearTimeout(e);
  if ((qu === Jn || !qu) && clearTimeout)
    return qu = clearTimeout, clearTimeout(e);
  try {
    return qu(e);
  } catch {
    try {
      return qu.call(null, e);
    } catch {
      return qu.call(this, e);
    }
  }
}
var rt = [], c0 = !1, Ot, $r = -1;
function e2() {
  !c0 || !Ot || (c0 = !1, Ot.length ? rt = Ot.concat(rt) : $r = -1, rt.length && Ao());
}
function Ao() {
  if (!c0) {
    var e = yo(e2);
    c0 = !0;
    for (var u = rt.length; u; ) {
      for (Ot = rt, rt = []; ++$r < u; )
        Ot && Ot[$r].run();
      $r = -1, u = rt.length;
    }
    Ot = null, c0 = !1, Zf(e);
  }
}
Pe.nextTick = function(e) {
  var u = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var t = 1; t < arguments.length; t++)
      u[t - 1] = arguments[t];
  rt.push(new vo(e, u)), rt.length === 1 && !c0 && yo(Ao);
};
function vo(e, u) {
  this.fun = e, this.array = u;
}
vo.prototype.run = function() {
  this.fun.apply(null, this.array);
};
Pe.title = "browser";
Pe.browser = !0;
Pe.env = {};
Pe.argv = [];
Pe.version = "";
Pe.versions = {};
function it() {
}
Pe.on = it;
Pe.addListener = it;
Pe.once = it;
Pe.off = it;
Pe.removeListener = it;
Pe.removeAllListeners = it;
Pe.emit = it;
Pe.prependListener = it;
Pe.prependOnceListener = it;
Pe.listeners = function(e) {
  return [];
};
Pe.binding = function(e) {
  throw new Error("process.binding is not supported");
};
Pe.cwd = function() {
  return "/";
};
Pe.chdir = function(e) {
  throw new Error("process.chdir is not supported");
};
Pe.umask = function() {
  return 0;
};
var u2 = _o.exports;
const ji = /* @__PURE__ */ Jf(u2), _n = 10, jc = (e = 0) => (u) => `\x1B[${u + e}m`, $c = (e = 0) => (u) => `\x1B[${38 + e};5;${u}m`, Vc = (e = 0) => (u, t, r) => `\x1B[${38 + e};2;${u};${t};${r}m`, ve = {
  modifier: {
    reset: [0, 0],
    // 21 isn't widely supported and 22 does the same thing
    bold: [1, 22],
    dim: [2, 22],
    italic: [3, 23],
    underline: [4, 24],
    overline: [53, 55],
    inverse: [7, 27],
    hidden: [8, 28],
    strikethrough: [9, 29]
  },
  color: {
    black: [30, 39],
    red: [31, 39],
    green: [32, 39],
    yellow: [33, 39],
    blue: [34, 39],
    magenta: [35, 39],
    cyan: [36, 39],
    white: [37, 39],
    // Bright color
    blackBright: [90, 39],
    gray: [90, 39],
    // Alias of `blackBright`
    grey: [90, 39],
    // Alias of `blackBright`
    redBright: [91, 39],
    greenBright: [92, 39],
    yellowBright: [93, 39],
    blueBright: [94, 39],
    magentaBright: [95, 39],
    cyanBright: [96, 39],
    whiteBright: [97, 39]
  },
  bgColor: {
    bgBlack: [40, 49],
    bgRed: [41, 49],
    bgGreen: [42, 49],
    bgYellow: [43, 49],
    bgBlue: [44, 49],
    bgMagenta: [45, 49],
    bgCyan: [46, 49],
    bgWhite: [47, 49],
    // Bright color
    bgBlackBright: [100, 49],
    bgGray: [100, 49],
    // Alias of `bgBlackBright`
    bgGrey: [100, 49],
    // Alias of `bgBlackBright`
    bgRedBright: [101, 49],
    bgGreenBright: [102, 49],
    bgYellowBright: [103, 49],
    bgBlueBright: [104, 49],
    bgMagentaBright: [105, 49],
    bgCyanBright: [106, 49],
    bgWhiteBright: [107, 49]
  }
};
Object.keys(ve.modifier);
const t2 = Object.keys(ve.color), r2 = Object.keys(ve.bgColor);
[...t2, ...r2];
function a2() {
  const e = /* @__PURE__ */ new Map();
  for (const [u, t] of Object.entries(ve)) {
    for (const [r, a] of Object.entries(t))
      ve[r] = {
        open: `\x1B[${a[0]}m`,
        close: `\x1B[${a[1]}m`
      }, t[r] = ve[r], e.set(a[0], a[1]);
    Object.defineProperty(ve, u, {
      value: t,
      enumerable: !1
    });
  }
  return Object.defineProperty(ve, "codes", {
    value: e,
    enumerable: !1
  }), ve.color.close = "\x1B[39m", ve.bgColor.close = "\x1B[49m", ve.color.ansi = jc(), ve.color.ansi256 = $c(), ve.color.ansi16m = Vc(), ve.bgColor.ansi = jc(_n), ve.bgColor.ansi256 = $c(_n), ve.bgColor.ansi16m = Vc(_n), Object.defineProperties(ve, {
    rgbToAnsi256: {
      value(u, t, r) {
        return u === t && t === r ? u < 8 ? 16 : u > 248 ? 231 : Math.round((u - 8) / 247 * 24) + 232 : 16 + 36 * Math.round(u / 255 * 5) + 6 * Math.round(t / 255 * 5) + Math.round(r / 255 * 5);
      },
      enumerable: !1
    },
    hexToRgb: {
      value(u) {
        const t = /[a-f\d]{6}|[a-f\d]{3}/i.exec(u.toString(16));
        if (!t)
          return [0, 0, 0];
        let [r] = t;
        r.length === 3 && (r = [...r].map((n) => n + n).join(""));
        const a = Number.parseInt(r, 16);
        return [
          /* eslint-disable no-bitwise */
          a >> 16 & 255,
          a >> 8 & 255,
          a & 255
          /* eslint-enable no-bitwise */
        ];
      },
      enumerable: !1
    },
    hexToAnsi256: {
      value: (u) => ve.rgbToAnsi256(...ve.hexToRgb(u)),
      enumerable: !1
    },
    ansi256ToAnsi: {
      value(u) {
        if (u < 8)
          return 30 + u;
        if (u < 16)
          return 90 + (u - 8);
        let t, r, a;
        if (u >= 232)
          t = ((u - 232) * 10 + 8) / 255, r = t, a = t;
        else {
          u -= 16;
          const s = u % 36;
          t = Math.floor(u / 36) / 5, r = Math.floor(s / 6) / 5, a = s % 6 / 5;
        }
        const n = Math.max(t, r, a) * 2;
        if (n === 0)
          return 30;
        let i = 30 + (Math.round(a) << 2 | Math.round(r) << 1 | Math.round(t));
        return n === 2 && (i += 60), i;
      },
      enumerable: !1
    },
    rgbToAnsi: {
      value: (u, t, r) => ve.ansi256ToAnsi(ve.rgbToAnsi256(u, t, r)),
      enumerable: !1
    },
    hexToAnsi: {
      value: (u) => ve.ansi256ToAnsi(ve.hexToAnsi256(u)),
      enumerable: !1
    }
  }), ve;
}
const n2 = a2(), Gu = n2, Or = (() => {
  if (navigator.userAgentData) {
    const e = navigator.userAgentData.brands.find(({ brand: u }) => u === "Chromium");
    if (e && e.version > 93)
      return 3;
  }
  return /\b(Chrome|Chromium)\//.test(navigator.userAgent) ? 1 : 0;
})(), Yc = Or !== 0 && {
  level: Or,
  hasBasic: !0,
  has256: Or >= 2,
  has16m: Or >= 3
}, i2 = {
  stdout: Yc,
  stderr: Yc
}, c2 = i2;
function s2(e, u, t) {
  let r = e.indexOf(u);
  if (r === -1)
    return e;
  const a = u.length;
  let n = 0, i = "";
  do
    i += e.slice(n, r) + u + t, n = r + a, r = e.indexOf(u, n);
  while (r !== -1);
  return i += e.slice(n), i;
}
function o2(e, u, t, r) {
  let a = 0, n = "";
  do {
    const i = e[r - 1] === "\r";
    n += e.slice(a, i ? r - 1 : r) + u + (i ? `\r
` : `
`) + t, a = r + 1, r = e.indexOf(`
`, a);
  } while (r !== -1);
  return n += e.slice(a), n;
}
const { stdout: Wc, stderr: Xc } = c2, Zn = Symbol("GENERATOR"), f0 = Symbol("STYLER"), J0 = Symbol("IS_EMPTY"), zc = [
  "ansi",
  "ansi",
  "ansi256",
  "ansi16m"
], b0 = /* @__PURE__ */ Object.create(null), d2 = (e, u = {}) => {
  if (u.level && !(Number.isInteger(u.level) && u.level >= 0 && u.level <= 3))
    throw new Error("The `level` option should be an integer from 0 to 3");
  const t = Wc ? Wc.level : 0;
  e.level = u.level === void 0 ? t : u.level;
}, l2 = (e) => {
  const u = (...t) => t.join(" ");
  return d2(u, e), Object.setPrototypeOf(u, cr.prototype), u;
};
function cr(e) {
  return l2(e);
}
Object.setPrototypeOf(cr.prototype, Function.prototype);
for (const [e, u] of Object.entries(Gu))
  b0[e] = {
    get() {
      const t = ua(this, ui(u.open, u.close, this[f0]), this[J0]);
      return Object.defineProperty(this, e, { value: t }), t;
    }
  };
b0.visible = {
  get() {
    const e = ua(this, this[f0], !0);
    return Object.defineProperty(this, "visible", { value: e }), e;
  }
};
const ei = (e, u, t, ...r) => e === "rgb" ? u === "ansi16m" ? Gu[t].ansi16m(...r) : u === "ansi256" ? Gu[t].ansi256(Gu.rgbToAnsi256(...r)) : Gu[t].ansi(Gu.rgbToAnsi(...r)) : e === "hex" ? ei("rgb", u, t, ...Gu.hexToRgb(...r)) : Gu[t][e](...r), f2 = ["rgb", "hex", "ansi256"];
for (const e of f2) {
  b0[e] = {
    get() {
      const { level: t } = this;
      return function(...r) {
        const a = ui(ei(e, zc[t], "color", ...r), Gu.color.close, this[f0]);
        return ua(this, a, this[J0]);
      };
    }
  };
  const u = "bg" + e[0].toUpperCase() + e.slice(1);
  b0[u] = {
    get() {
      const { level: t } = this;
      return function(...r) {
        const a = ui(ei(e, zc[t], "bgColor", ...r), Gu.bgColor.close, this[f0]);
        return ua(this, a, this[J0]);
      };
    }
  };
}
const b2 = Object.defineProperties(() => {
}, {
  ...b0,
  level: {
    enumerable: !0,
    get() {
      return this[Zn].level;
    },
    set(e) {
      this[Zn].level = e;
    }
  }
}), ui = (e, u, t) => {
  let r, a;
  return t === void 0 ? (r = e, a = u) : (r = t.openAll + e, a = u + t.closeAll), {
    open: e,
    close: u,
    openAll: r,
    closeAll: a,
    parent: t
  };
}, ua = (e, u, t) => {
  const r = (...a) => h2(r, a.length === 1 ? "" + a[0] : a.join(" "));
  return Object.setPrototypeOf(r, b2), r[Zn] = e, r[f0] = u, r[J0] = t, r;
}, h2 = (e, u) => {
  if (e.level <= 0 || !u)
    return e[J0] ? "" : u;
  let t = e[f0];
  if (t === void 0)
    return u;
  const { openAll: r, closeAll: a } = t;
  if (u.includes("\x1B"))
    for (; t !== void 0; )
      u = s2(u, t.close, t.open), t = t.parent;
  const n = u.indexOf(`
`);
  return n !== -1 && (u = o2(u, a, r, n)), r + u + a;
};
Object.defineProperties(cr.prototype, b0);
const p2 = cr();
cr({ level: Xc ? Xc.level : 0 });
const m2 = p2;
var C = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function $i(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function xo(e) {
  if (e.__esModule)
    return e;
  var u = e.default;
  if (typeof u == "function") {
    var t = function r() {
      return this instanceof r ? Reflect.construct(u, arguments, this.constructor) : u.apply(this, arguments);
    };
    t.prototype = u.prototype;
  } else
    t = {};
  return Object.defineProperty(t, "__esModule", { value: !0 }), Object.keys(e).forEach(function(r) {
    var a = Object.getOwnPropertyDescriptor(e, r);
    Object.defineProperty(t, r, a.get ? a : {
      enumerable: !0,
      get: function() {
        return e[r];
      }
    });
  }), t;
}
var No = { exports: {} }, Io = {}, Do = {};
Object.defineProperty(Do, "__esModule", { value: !0 });
var va = {}, I0 = {}, ta = C && C.__assign || function() {
  return ta = Object.assign || function(e) {
    for (var u, t = 1, r = arguments.length; t < r; t++) {
      u = arguments[t];
      for (var a in u)
        Object.prototype.hasOwnProperty.call(u, a) && (e[a] = u[a]);
    }
    return e;
  }, ta.apply(this, arguments);
};
Object.defineProperty(I0, "__esModule", { value: !0 });
I0.flatten = void 0;
var g2 = {
  xml: !1,
  decodeEntities: !0
};
I0.default = g2;
var Qc = {
  _useHtmlParser2: !0,
  xmlMode: !0
};
function E2(e) {
  return e != null && e.xml ? typeof e.xml == "boolean" ? Qc : ta(ta({}, Qc), e.xml) : e ?? void 0;
}
I0.flatten = E2;
var Le = {}, D0 = {}, Au = {}, Ou = {}, Be = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.Doctype = e.CDATA = e.Tag = e.Style = e.Script = e.Comment = e.Directive = e.Text = e.Root = e.isTag = e.ElementType = void 0;
  var u;
  (function(r) {
    r.Root = "root", r.Text = "text", r.Directive = "directive", r.Comment = "comment", r.Script = "script", r.Style = "style", r.Tag = "tag", r.CDATA = "cdata", r.Doctype = "doctype";
  })(u = e.ElementType || (e.ElementType = {}));
  function t(r) {
    return r.type === u.Tag || r.type === u.Script || r.type === u.Style;
  }
  e.isTag = t, e.Root = u.Root, e.Text = u.Text, e.Directive = u.Directive, e.Comment = u.Comment, e.Script = u.Script, e.Style = u.Style, e.Tag = u.Tag, e.CDATA = u.CDATA, e.Doctype = u.Doctype;
})(Be);
var ne = {}, gt = C && C.__extends || /* @__PURE__ */ function() {
  var e = function(u, t) {
    return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, a) {
      r.__proto__ = a;
    } || function(r, a) {
      for (var n in a)
        Object.prototype.hasOwnProperty.call(a, n) && (r[n] = a[n]);
    }, e(u, t);
  };
  return function(u, t) {
    if (typeof t != "function" && t !== null)
      throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
    e(u, t);
    function r() {
      this.constructor = u;
    }
    u.prototype = t === null ? Object.create(t) : (r.prototype = t.prototype, new r());
  };
}(), q0 = C && C.__assign || function() {
  return q0 = Object.assign || function(e) {
    for (var u, t = 1, r = arguments.length; t < r; t++) {
      u = arguments[t];
      for (var a in u)
        Object.prototype.hasOwnProperty.call(u, a) && (e[a] = u[a]);
    }
    return e;
  }, q0.apply(this, arguments);
};
Object.defineProperty(ne, "__esModule", { value: !0 });
ne.cloneNode = ne.hasChildren = ne.isDocument = ne.isDirective = ne.isComment = ne.isText = ne.isCDATA = ne.isTag = ne.Element = ne.Document = ne.CDATA = ne.NodeWithChildren = ne.ProcessingInstruction = ne.Comment = ne.Text = ne.DataNode = ne.Node = void 0;
var bu = Be, Vi = (
  /** @class */
  function() {
    function e() {
      this.parent = null, this.prev = null, this.next = null, this.startIndex = null, this.endIndex = null;
    }
    return Object.defineProperty(e.prototype, "parentNode", {
      // Read-write aliases for properties
      /**
       * Same as {@link parent}.
       * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
       */
      get: function() {
        return this.parent;
      },
      set: function(u) {
        this.parent = u;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "previousSibling", {
      /**
       * Same as {@link prev}.
       * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
       */
      get: function() {
        return this.prev;
      },
      set: function(u) {
        this.prev = u;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "nextSibling", {
      /**
       * Same as {@link next}.
       * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
       */
      get: function() {
        return this.next;
      },
      set: function(u) {
        this.next = u;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.cloneNode = function(u) {
      return u === void 0 && (u = !1), Yi(this, u);
    }, e;
  }()
);
ne.Node = Vi;
var xa = (
  /** @class */
  function(e) {
    gt(u, e);
    function u(t) {
      var r = e.call(this) || this;
      return r.data = t, r;
    }
    return Object.defineProperty(u.prototype, "nodeValue", {
      /**
       * Same as {@link data}.
       * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
       */
      get: function() {
        return this.data;
      },
      set: function(t) {
        this.data = t;
      },
      enumerable: !1,
      configurable: !0
    }), u;
  }(Vi)
);
ne.DataNode = xa;
var Co = (
  /** @class */
  function(e) {
    gt(u, e);
    function u() {
      var t = e !== null && e.apply(this, arguments) || this;
      return t.type = bu.ElementType.Text, t;
    }
    return Object.defineProperty(u.prototype, "nodeType", {
      get: function() {
        return 3;
      },
      enumerable: !1,
      configurable: !0
    }), u;
  }(xa)
);
ne.Text = Co;
var So = (
  /** @class */
  function(e) {
    gt(u, e);
    function u() {
      var t = e !== null && e.apply(this, arguments) || this;
      return t.type = bu.ElementType.Comment, t;
    }
    return Object.defineProperty(u.prototype, "nodeType", {
      get: function() {
        return 8;
      },
      enumerable: !1,
      configurable: !0
    }), u;
  }(xa)
);
ne.Comment = So;
var Oo = (
  /** @class */
  function(e) {
    gt(u, e);
    function u(t, r) {
      var a = e.call(this, r) || this;
      return a.name = t, a.type = bu.ElementType.Directive, a;
    }
    return Object.defineProperty(u.prototype, "nodeType", {
      get: function() {
        return 1;
      },
      enumerable: !1,
      configurable: !0
    }), u;
  }(xa)
);
ne.ProcessingInstruction = Oo;
var Na = (
  /** @class */
  function(e) {
    gt(u, e);
    function u(t) {
      var r = e.call(this) || this;
      return r.children = t, r;
    }
    return Object.defineProperty(u.prototype, "firstChild", {
      // Aliases
      /** First child of the node. */
      get: function() {
        var t;
        return (t = this.children[0]) !== null && t !== void 0 ? t : null;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(u.prototype, "lastChild", {
      /** Last child of the node. */
      get: function() {
        return this.children.length > 0 ? this.children[this.children.length - 1] : null;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(u.prototype, "childNodes", {
      /**
       * Same as {@link children}.
       * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
       */
      get: function() {
        return this.children;
      },
      set: function(t) {
        this.children = t;
      },
      enumerable: !1,
      configurable: !0
    }), u;
  }(Vi)
);
ne.NodeWithChildren = Na;
var Lo = (
  /** @class */
  function(e) {
    gt(u, e);
    function u() {
      var t = e !== null && e.apply(this, arguments) || this;
      return t.type = bu.ElementType.CDATA, t;
    }
    return Object.defineProperty(u.prototype, "nodeType", {
      get: function() {
        return 4;
      },
      enumerable: !1,
      configurable: !0
    }), u;
  }(Na)
);
ne.CDATA = Lo;
var Po = (
  /** @class */
  function(e) {
    gt(u, e);
    function u() {
      var t = e !== null && e.apply(this, arguments) || this;
      return t.type = bu.ElementType.Root, t;
    }
    return Object.defineProperty(u.prototype, "nodeType", {
      get: function() {
        return 9;
      },
      enumerable: !1,
      configurable: !0
    }), u;
  }(Na)
);
ne.Document = Po;
var wo = (
  /** @class */
  function(e) {
    gt(u, e);
    function u(t, r, a, n) {
      a === void 0 && (a = []), n === void 0 && (n = t === "script" ? bu.ElementType.Script : t === "style" ? bu.ElementType.Style : bu.ElementType.Tag);
      var i = e.call(this, a) || this;
      return i.name = t, i.attribs = r, i.type = n, i;
    }
    return Object.defineProperty(u.prototype, "nodeType", {
      get: function() {
        return 1;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(u.prototype, "tagName", {
      // DOM Level 1 aliases
      /**
       * Same as {@link name}.
       * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
       */
      get: function() {
        return this.name;
      },
      set: function(t) {
        this.name = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(u.prototype, "attributes", {
      get: function() {
        var t = this;
        return Object.keys(this.attribs).map(function(r) {
          var a, n;
          return {
            name: r,
            value: t.attribs[r],
            namespace: (a = t["x-attribsNamespace"]) === null || a === void 0 ? void 0 : a[r],
            prefix: (n = t["x-attribsPrefix"]) === null || n === void 0 ? void 0 : n[r]
          };
        });
      },
      enumerable: !1,
      configurable: !0
    }), u;
  }(Na)
);
ne.Element = wo;
function Ro(e) {
  return (0, bu.isTag)(e);
}
ne.isTag = Ro;
function Mo(e) {
  return e.type === bu.ElementType.CDATA;
}
ne.isCDATA = Mo;
function ko(e) {
  return e.type === bu.ElementType.Text;
}
ne.isText = ko;
function Bo(e) {
  return e.type === bu.ElementType.Comment;
}
ne.isComment = Bo;
function Uo(e) {
  return e.type === bu.ElementType.Directive;
}
ne.isDirective = Uo;
function Ho(e) {
  return e.type === bu.ElementType.Root;
}
ne.isDocument = Ho;
function T2(e) {
  return Object.prototype.hasOwnProperty.call(e, "children");
}
ne.hasChildren = T2;
function Yi(e, u) {
  u === void 0 && (u = !1);
  var t;
  if (ko(e))
    t = new Co(e.data);
  else if (Bo(e))
    t = new So(e.data);
  else if (Ro(e)) {
    var r = u ? yn(e.children) : [], a = new wo(e.name, q0({}, e.attribs), r);
    r.forEach(function(o) {
      return o.parent = a;
    }), e.namespace != null && (a.namespace = e.namespace), e["x-attribsNamespace"] && (a["x-attribsNamespace"] = q0({}, e["x-attribsNamespace"])), e["x-attribsPrefix"] && (a["x-attribsPrefix"] = q0({}, e["x-attribsPrefix"])), t = a;
  } else if (Mo(e)) {
    var r = u ? yn(e.children) : [], n = new Lo(r);
    r.forEach(function(d) {
      return d.parent = n;
    }), t = n;
  } else if (Ho(e)) {
    var r = u ? yn(e.children) : [], i = new Po(r);
    r.forEach(function(d) {
      return d.parent = i;
    }), e["x-mode"] && (i["x-mode"] = e["x-mode"]), t = i;
  } else if (Uo(e)) {
    var s = new Oo(e.name, e.data);
    e["x-name"] != null && (s["x-name"] = e["x-name"], s["x-publicId"] = e["x-publicId"], s["x-systemId"] = e["x-systemId"]), t = s;
  } else
    throw new Error("Not implemented yet: ".concat(e.type));
  return t.startIndex = e.startIndex, t.endIndex = e.endIndex, e.sourceCodeLocation != null && (t.sourceCodeLocation = e.sourceCodeLocation), t;
}
ne.cloneNode = Yi;
function yn(e) {
  for (var u = e.map(function(r) {
    return Yi(r, !0);
  }), t = 1; t < u.length; t++)
    u[t].prev = u[t - 1], u[t - 1].next = u[t];
  return u;
}
(function(e) {
  var u = C && C.__createBinding || (Object.create ? function(s, o, d, c) {
    c === void 0 && (c = d);
    var E = Object.getOwnPropertyDescriptor(o, d);
    (!E || ("get" in E ? !o.__esModule : E.writable || E.configurable)) && (E = { enumerable: !0, get: function() {
      return o[d];
    } }), Object.defineProperty(s, c, E);
  } : function(s, o, d, c) {
    c === void 0 && (c = d), s[c] = o[d];
  }), t = C && C.__exportStar || function(s, o) {
    for (var d in s)
      d !== "default" && !Object.prototype.hasOwnProperty.call(o, d) && u(o, s, d);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.DomHandler = void 0;
  var r = Be, a = ne;
  t(ne, e);
  var n = {
    withStartIndices: !1,
    withEndIndices: !1,
    xmlMode: !1
  }, i = (
    /** @class */
    function() {
      function s(o, d, c) {
        this.dom = [], this.root = new a.Document(this.dom), this.done = !1, this.tagStack = [this.root], this.lastNode = null, this.parser = null, typeof d == "function" && (c = d, d = n), typeof o == "object" && (d = o, o = void 0), this.callback = o ?? null, this.options = d ?? n, this.elementCB = c ?? null;
      }
      return s.prototype.onparserinit = function(o) {
        this.parser = o;
      }, s.prototype.onreset = function() {
        this.dom = [], this.root = new a.Document(this.dom), this.done = !1, this.tagStack = [this.root], this.lastNode = null, this.parser = null;
      }, s.prototype.onend = function() {
        this.done || (this.done = !0, this.parser = null, this.handleCallback(null));
      }, s.prototype.onerror = function(o) {
        this.handleCallback(o);
      }, s.prototype.onclosetag = function() {
        this.lastNode = null;
        var o = this.tagStack.pop();
        this.options.withEndIndices && (o.endIndex = this.parser.endIndex), this.elementCB && this.elementCB(o);
      }, s.prototype.onopentag = function(o, d) {
        var c = this.options.xmlMode ? r.ElementType.Tag : void 0, E = new a.Element(o, d, void 0, c);
        this.addNode(E), this.tagStack.push(E);
      }, s.prototype.ontext = function(o) {
        var d = this.lastNode;
        if (d && d.type === r.ElementType.Text)
          d.data += o, this.options.withEndIndices && (d.endIndex = this.parser.endIndex);
        else {
          var c = new a.Text(o);
          this.addNode(c), this.lastNode = c;
        }
      }, s.prototype.oncomment = function(o) {
        if (this.lastNode && this.lastNode.type === r.ElementType.Comment) {
          this.lastNode.data += o;
          return;
        }
        var d = new a.Comment(o);
        this.addNode(d), this.lastNode = d;
      }, s.prototype.oncommentend = function() {
        this.lastNode = null;
      }, s.prototype.oncdatastart = function() {
        var o = new a.Text(""), d = new a.CDATA([o]);
        this.addNode(d), o.parent = d, this.lastNode = o;
      }, s.prototype.oncdataend = function() {
        this.lastNode = null;
      }, s.prototype.onprocessinginstruction = function(o, d) {
        var c = new a.ProcessingInstruction(o, d);
        this.addNode(c);
      }, s.prototype.handleCallback = function(o) {
        if (typeof this.callback == "function")
          this.callback(o, this.dom);
        else if (o)
          throw o;
      }, s.prototype.addNode = function(o) {
        var d = this.tagStack[this.tagStack.length - 1], c = d.children[d.children.length - 1];
        this.options.withStartIndices && (o.startIndex = this.parser.startIndex), this.options.withEndIndices && (o.endIndex = this.parser.endIndex), d.children.push(o), c && (o.prev = c, c.next = o), o.parent = d, this.lastNode = null;
      }, s;
    }()
  );
  e.DomHandler = i, e.default = i;
})(Ou);
var C0 = {}, Fo = {}, ti = {}, Wi = {};
Object.defineProperty(Wi, "__esModule", { value: !0 });
Wi.default = new Uint16Array(
  // prettier-ignore
  'ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map(function(e) {
    return e.charCodeAt(0);
  })
);
var Xi = {};
Object.defineProperty(Xi, "__esModule", { value: !0 });
Xi.default = new Uint16Array(
  // prettier-ignore
  "Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map(function(e) {
    return e.charCodeAt(0);
  })
);
var ri = {};
(function(e) {
  var u;
  Object.defineProperty(e, "__esModule", { value: !0 }), e.replaceCodePoint = e.fromCodePoint = void 0;
  var t = /* @__PURE__ */ new Map([
    [0, 65533],
    // C1 Unicode control character reference replacements
    [128, 8364],
    [130, 8218],
    [131, 402],
    [132, 8222],
    [133, 8230],
    [134, 8224],
    [135, 8225],
    [136, 710],
    [137, 8240],
    [138, 352],
    [139, 8249],
    [140, 338],
    [142, 381],
    [145, 8216],
    [146, 8217],
    [147, 8220],
    [148, 8221],
    [149, 8226],
    [150, 8211],
    [151, 8212],
    [152, 732],
    [153, 8482],
    [154, 353],
    [155, 8250],
    [156, 339],
    [158, 382],
    [159, 376]
  ]);
  e.fromCodePoint = // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, node/no-unsupported-features/es-builtins
  (u = String.fromCodePoint) !== null && u !== void 0 ? u : function(n) {
    var i = "";
    return n > 65535 && (n -= 65536, i += String.fromCharCode(n >>> 10 & 1023 | 55296), n = 56320 | n & 1023), i += String.fromCharCode(n), i;
  };
  function r(n) {
    var i;
    return n >= 55296 && n <= 57343 || n > 1114111 ? 65533 : (i = t.get(n)) !== null && i !== void 0 ? i : n;
  }
  e.replaceCodePoint = r;
  function a(n) {
    return (0, e.fromCodePoint)(r(n));
  }
  e.default = a;
})(ri);
(function(e) {
  var u = C && C.__createBinding || (Object.create ? function(l, g, T, A) {
    A === void 0 && (A = T);
    var D = Object.getOwnPropertyDescriptor(g, T);
    (!D || ("get" in D ? !g.__esModule : D.writable || D.configurable)) && (D = { enumerable: !0, get: function() {
      return g[T];
    } }), Object.defineProperty(l, A, D);
  } : function(l, g, T, A) {
    A === void 0 && (A = T), l[A] = g[T];
  }), t = C && C.__setModuleDefault || (Object.create ? function(l, g) {
    Object.defineProperty(l, "default", { enumerable: !0, value: g });
  } : function(l, g) {
    l.default = g;
  }), r = C && C.__importStar || function(l) {
    if (l && l.__esModule)
      return l;
    var g = {};
    if (l != null)
      for (var T in l)
        T !== "default" && Object.prototype.hasOwnProperty.call(l, T) && u(g, l, T);
    return t(g, l), g;
  }, a = C && C.__importDefault || function(l) {
    return l && l.__esModule ? l : { default: l };
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.decodeXML = e.decodeHTMLStrict = e.decodeHTMLAttribute = e.decodeHTML = e.determineBranch = e.EntityDecoder = e.DecodingMode = e.BinTrieFlags = e.fromCodePoint = e.replaceCodePoint = e.decodeCodePoint = e.xmlDecodeTree = e.htmlDecodeTree = void 0;
  var n = a(Wi);
  e.htmlDecodeTree = n.default;
  var i = a(Xi);
  e.xmlDecodeTree = i.default;
  var s = r(ri);
  e.decodeCodePoint = s.default;
  var o = ri;
  Object.defineProperty(e, "replaceCodePoint", { enumerable: !0, get: function() {
    return o.replaceCodePoint;
  } }), Object.defineProperty(e, "fromCodePoint", { enumerable: !0, get: function() {
    return o.fromCodePoint;
  } });
  var d;
  (function(l) {
    l[l.NUM = 35] = "NUM", l[l.SEMI = 59] = "SEMI", l[l.EQUALS = 61] = "EQUALS", l[l.ZERO = 48] = "ZERO", l[l.NINE = 57] = "NINE", l[l.LOWER_A = 97] = "LOWER_A", l[l.LOWER_F = 102] = "LOWER_F", l[l.LOWER_X = 120] = "LOWER_X", l[l.LOWER_Z = 122] = "LOWER_Z", l[l.UPPER_A = 65] = "UPPER_A", l[l.UPPER_F = 70] = "UPPER_F", l[l.UPPER_Z = 90] = "UPPER_Z";
  })(d || (d = {}));
  var c = 32, E;
  (function(l) {
    l[l.VALUE_LENGTH = 49152] = "VALUE_LENGTH", l[l.BRANCH_LENGTH = 16256] = "BRANCH_LENGTH", l[l.JUMP_TABLE = 127] = "JUMP_TABLE";
  })(E = e.BinTrieFlags || (e.BinTrieFlags = {}));
  function f(l) {
    return l >= d.ZERO && l <= d.NINE;
  }
  function m(l) {
    return l >= d.UPPER_A && l <= d.UPPER_F || l >= d.LOWER_A && l <= d.LOWER_F;
  }
  function v(l) {
    return l >= d.UPPER_A && l <= d.UPPER_Z || l >= d.LOWER_A && l <= d.LOWER_Z || f(l);
  }
  function L(l) {
    return l === d.EQUALS || v(l);
  }
  var N;
  (function(l) {
    l[l.EntityStart = 0] = "EntityStart", l[l.NumericStart = 1] = "NumericStart", l[l.NumericDecimal = 2] = "NumericDecimal", l[l.NumericHex = 3] = "NumericHex", l[l.NamedEntity = 4] = "NamedEntity";
  })(N || (N = {}));
  var O;
  (function(l) {
    l[l.Legacy = 0] = "Legacy", l[l.Strict = 1] = "Strict", l[l.Attribute = 2] = "Attribute";
  })(O = e.DecodingMode || (e.DecodingMode = {}));
  var w = (
    /** @class */
    function() {
      function l(g, T, A) {
        this.decodeTree = g, this.emitCodePoint = T, this.errors = A, this.state = N.EntityStart, this.consumed = 1, this.result = 0, this.treeIndex = 0, this.excess = 1, this.decodeMode = O.Strict;
      }
      return l.prototype.startEntity = function(g) {
        this.decodeMode = g, this.state = N.EntityStart, this.result = 0, this.treeIndex = 0, this.excess = 1, this.consumed = 1;
      }, l.prototype.write = function(g, T) {
        switch (this.state) {
          case N.EntityStart:
            return g.charCodeAt(T) === d.NUM ? (this.state = N.NumericStart, this.consumed += 1, this.stateNumericStart(g, T + 1)) : (this.state = N.NamedEntity, this.stateNamedEntity(g, T));
          case N.NumericStart:
            return this.stateNumericStart(g, T);
          case N.NumericDecimal:
            return this.stateNumericDecimal(g, T);
          case N.NumericHex:
            return this.stateNumericHex(g, T);
          case N.NamedEntity:
            return this.stateNamedEntity(g, T);
        }
      }, l.prototype.stateNumericStart = function(g, T) {
        return T >= g.length ? -1 : (g.charCodeAt(T) | c) === d.LOWER_X ? (this.state = N.NumericHex, this.consumed += 1, this.stateNumericHex(g, T + 1)) : (this.state = N.NumericDecimal, this.stateNumericDecimal(g, T));
      }, l.prototype.addToNumericResult = function(g, T, A, D) {
        if (T !== A) {
          var B = A - T;
          this.result = this.result * Math.pow(D, B) + parseInt(g.substr(T, B), D), this.consumed += B;
        }
      }, l.prototype.stateNumericHex = function(g, T) {
        for (var A = T; T < g.length; ) {
          var D = g.charCodeAt(T);
          if (f(D) || m(D))
            T += 1;
          else
            return this.addToNumericResult(g, A, T, 16), this.emitNumericEntity(D, 3);
        }
        return this.addToNumericResult(g, A, T, 16), -1;
      }, l.prototype.stateNumericDecimal = function(g, T) {
        for (var A = T; T < g.length; ) {
          var D = g.charCodeAt(T);
          if (f(D))
            T += 1;
          else
            return this.addToNumericResult(g, A, T, 10), this.emitNumericEntity(D, 2);
        }
        return this.addToNumericResult(g, A, T, 10), -1;
      }, l.prototype.emitNumericEntity = function(g, T) {
        var A;
        if (this.consumed <= T)
          return (A = this.errors) === null || A === void 0 || A.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
        if (g === d.SEMI)
          this.consumed += 1;
        else if (this.decodeMode === O.Strict)
          return 0;
        return this.emitCodePoint((0, s.replaceCodePoint)(this.result), this.consumed), this.errors && (g !== d.SEMI && this.errors.missingSemicolonAfterCharacterReference(), this.errors.validateNumericCharacterReference(this.result)), this.consumed;
      }, l.prototype.stateNamedEntity = function(g, T) {
        for (var A = this.decodeTree, D = A[this.treeIndex], B = (D & E.VALUE_LENGTH) >> 14; T < g.length; T++, this.excess++) {
          var M = g.charCodeAt(T);
          if (this.treeIndex = k(A, D, this.treeIndex + Math.max(1, B), M), this.treeIndex < 0)
            return this.result === 0 || // If we are parsing an attribute
            this.decodeMode === O.Attribute && // We shouldn't have consumed any characters after the entity,
            (B === 0 || // And there should be no invalid characters.
            L(M)) ? 0 : this.emitNotTerminatedNamedEntity();
          if (D = A[this.treeIndex], B = (D & E.VALUE_LENGTH) >> 14, B !== 0) {
            if (M === d.SEMI)
              return this.emitNamedEntityData(this.treeIndex, B, this.consumed + this.excess);
            this.decodeMode !== O.Strict && (this.result = this.treeIndex, this.consumed += this.excess, this.excess = 0);
          }
        }
        return -1;
      }, l.prototype.emitNotTerminatedNamedEntity = function() {
        var g, T = this, A = T.result, D = T.decodeTree, B = (D[A] & E.VALUE_LENGTH) >> 14;
        return this.emitNamedEntityData(A, B, this.consumed), (g = this.errors) === null || g === void 0 || g.missingSemicolonAfterCharacterReference(), this.consumed;
      }, l.prototype.emitNamedEntityData = function(g, T, A) {
        var D = this.decodeTree;
        return this.emitCodePoint(T === 1 ? D[g] & ~E.VALUE_LENGTH : D[g + 1], A), T === 3 && this.emitCodePoint(D[g + 2], A), A;
      }, l.prototype.end = function() {
        var g;
        switch (this.state) {
          case N.NamedEntity:
            return this.result !== 0 && (this.decodeMode !== O.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
          case N.NumericDecimal:
            return this.emitNumericEntity(0, 2);
          case N.NumericHex:
            return this.emitNumericEntity(0, 3);
          case N.NumericStart:
            return (g = this.errors) === null || g === void 0 || g.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
          case N.EntityStart:
            return 0;
        }
      }, l;
    }()
  );
  e.EntityDecoder = w;
  function H(l) {
    var g = "", T = new w(l, function(A) {
      return g += (0, s.fromCodePoint)(A);
    });
    return function(D, B) {
      for (var M = 0, $ = 0; ($ = D.indexOf("&", $)) >= 0; ) {
        g += D.slice(M, $), T.startEntity(B);
        var J = T.write(
          D,
          // Skip the "&"
          $ + 1
        );
        if (J < 0) {
          M = $ + T.end();
          break;
        }
        M = $ + J, $ = J === 0 ? M + 1 : M;
      }
      var z = g + D.slice(M);
      return g = "", z;
    };
  }
  function k(l, g, T, A) {
    var D = (g & E.BRANCH_LENGTH) >> 7, B = g & E.JUMP_TABLE;
    if (D === 0)
      return B !== 0 && A === B ? T : -1;
    if (B) {
      var M = A - B;
      return M < 0 || M >= D ? -1 : l[T + M] - 1;
    }
    for (var $ = T, J = $ + D - 1; $ <= J; ) {
      var z = $ + J >>> 1, be = l[z];
      if (be < A)
        $ = z + 1;
      else if (be > A)
        J = z - 1;
      else
        return l[z + D];
    }
    return -1;
  }
  e.determineBranch = k;
  var R = H(n.default), G = H(i.default);
  function X(l, g) {
    return g === void 0 && (g = O.Legacy), R(l, g);
  }
  e.decodeHTML = X;
  function Z(l) {
    return R(l, O.Attribute);
  }
  e.decodeHTMLAttribute = Z;
  function re(l) {
    return R(l, O.Strict);
  }
  e.decodeHTMLStrict = re;
  function Y(l) {
    return G(l, O.Strict);
  }
  e.decodeXML = Y;
})(ti);
var Pt = {}, zi = {};
Object.defineProperty(zi, "__esModule", { value: !0 });
function Lr(e) {
  for (var u = 1; u < e.length; u++)
    e[u][0] += e[u - 1][0] + 1;
  return e;
}
zi.default = new Map(/* @__PURE__ */ Lr([[9, "&Tab;"], [0, "&NewLine;"], [22, "&excl;"], [0, "&quot;"], [0, "&num;"], [0, "&dollar;"], [0, "&percnt;"], [0, "&amp;"], [0, "&apos;"], [0, "&lpar;"], [0, "&rpar;"], [0, "&ast;"], [0, "&plus;"], [0, "&comma;"], [1, "&period;"], [0, "&sol;"], [10, "&colon;"], [0, "&semi;"], [0, { v: "&lt;", n: 8402, o: "&nvlt;" }], [0, { v: "&equals;", n: 8421, o: "&bne;" }], [0, { v: "&gt;", n: 8402, o: "&nvgt;" }], [0, "&quest;"], [0, "&commat;"], [26, "&lbrack;"], [0, "&bsol;"], [0, "&rbrack;"], [0, "&Hat;"], [0, "&lowbar;"], [0, "&DiacriticalGrave;"], [5, { n: 106, o: "&fjlig;" }], [20, "&lbrace;"], [0, "&verbar;"], [0, "&rbrace;"], [34, "&nbsp;"], [0, "&iexcl;"], [0, "&cent;"], [0, "&pound;"], [0, "&curren;"], [0, "&yen;"], [0, "&brvbar;"], [0, "&sect;"], [0, "&die;"], [0, "&copy;"], [0, "&ordf;"], [0, "&laquo;"], [0, "&not;"], [0, "&shy;"], [0, "&circledR;"], [0, "&macr;"], [0, "&deg;"], [0, "&PlusMinus;"], [0, "&sup2;"], [0, "&sup3;"], [0, "&acute;"], [0, "&micro;"], [0, "&para;"], [0, "&centerdot;"], [0, "&cedil;"], [0, "&sup1;"], [0, "&ordm;"], [0, "&raquo;"], [0, "&frac14;"], [0, "&frac12;"], [0, "&frac34;"], [0, "&iquest;"], [0, "&Agrave;"], [0, "&Aacute;"], [0, "&Acirc;"], [0, "&Atilde;"], [0, "&Auml;"], [0, "&angst;"], [0, "&AElig;"], [0, "&Ccedil;"], [0, "&Egrave;"], [0, "&Eacute;"], [0, "&Ecirc;"], [0, "&Euml;"], [0, "&Igrave;"], [0, "&Iacute;"], [0, "&Icirc;"], [0, "&Iuml;"], [0, "&ETH;"], [0, "&Ntilde;"], [0, "&Ograve;"], [0, "&Oacute;"], [0, "&Ocirc;"], [0, "&Otilde;"], [0, "&Ouml;"], [0, "&times;"], [0, "&Oslash;"], [0, "&Ugrave;"], [0, "&Uacute;"], [0, "&Ucirc;"], [0, "&Uuml;"], [0, "&Yacute;"], [0, "&THORN;"], [0, "&szlig;"], [0, "&agrave;"], [0, "&aacute;"], [0, "&acirc;"], [0, "&atilde;"], [0, "&auml;"], [0, "&aring;"], [0, "&aelig;"], [0, "&ccedil;"], [0, "&egrave;"], [0, "&eacute;"], [0, "&ecirc;"], [0, "&euml;"], [0, "&igrave;"], [0, "&iacute;"], [0, "&icirc;"], [0, "&iuml;"], [0, "&eth;"], [0, "&ntilde;"], [0, "&ograve;"], [0, "&oacute;"], [0, "&ocirc;"], [0, "&otilde;"], [0, "&ouml;"], [0, "&div;"], [0, "&oslash;"], [0, "&ugrave;"], [0, "&uacute;"], [0, "&ucirc;"], [0, "&uuml;"], [0, "&yacute;"], [0, "&thorn;"], [0, "&yuml;"], [0, "&Amacr;"], [0, "&amacr;"], [0, "&Abreve;"], [0, "&abreve;"], [0, "&Aogon;"], [0, "&aogon;"], [0, "&Cacute;"], [0, "&cacute;"], [0, "&Ccirc;"], [0, "&ccirc;"], [0, "&Cdot;"], [0, "&cdot;"], [0, "&Ccaron;"], [0, "&ccaron;"], [0, "&Dcaron;"], [0, "&dcaron;"], [0, "&Dstrok;"], [0, "&dstrok;"], [0, "&Emacr;"], [0, "&emacr;"], [2, "&Edot;"], [0, "&edot;"], [0, "&Eogon;"], [0, "&eogon;"], [0, "&Ecaron;"], [0, "&ecaron;"], [0, "&Gcirc;"], [0, "&gcirc;"], [0, "&Gbreve;"], [0, "&gbreve;"], [0, "&Gdot;"], [0, "&gdot;"], [0, "&Gcedil;"], [1, "&Hcirc;"], [0, "&hcirc;"], [0, "&Hstrok;"], [0, "&hstrok;"], [0, "&Itilde;"], [0, "&itilde;"], [0, "&Imacr;"], [0, "&imacr;"], [2, "&Iogon;"], [0, "&iogon;"], [0, "&Idot;"], [0, "&imath;"], [0, "&IJlig;"], [0, "&ijlig;"], [0, "&Jcirc;"], [0, "&jcirc;"], [0, "&Kcedil;"], [0, "&kcedil;"], [0, "&kgreen;"], [0, "&Lacute;"], [0, "&lacute;"], [0, "&Lcedil;"], [0, "&lcedil;"], [0, "&Lcaron;"], [0, "&lcaron;"], [0, "&Lmidot;"], [0, "&lmidot;"], [0, "&Lstrok;"], [0, "&lstrok;"], [0, "&Nacute;"], [0, "&nacute;"], [0, "&Ncedil;"], [0, "&ncedil;"], [0, "&Ncaron;"], [0, "&ncaron;"], [0, "&napos;"], [0, "&ENG;"], [0, "&eng;"], [0, "&Omacr;"], [0, "&omacr;"], [2, "&Odblac;"], [0, "&odblac;"], [0, "&OElig;"], [0, "&oelig;"], [0, "&Racute;"], [0, "&racute;"], [0, "&Rcedil;"], [0, "&rcedil;"], [0, "&Rcaron;"], [0, "&rcaron;"], [0, "&Sacute;"], [0, "&sacute;"], [0, "&Scirc;"], [0, "&scirc;"], [0, "&Scedil;"], [0, "&scedil;"], [0, "&Scaron;"], [0, "&scaron;"], [0, "&Tcedil;"], [0, "&tcedil;"], [0, "&Tcaron;"], [0, "&tcaron;"], [0, "&Tstrok;"], [0, "&tstrok;"], [0, "&Utilde;"], [0, "&utilde;"], [0, "&Umacr;"], [0, "&umacr;"], [0, "&Ubreve;"], [0, "&ubreve;"], [0, "&Uring;"], [0, "&uring;"], [0, "&Udblac;"], [0, "&udblac;"], [0, "&Uogon;"], [0, "&uogon;"], [0, "&Wcirc;"], [0, "&wcirc;"], [0, "&Ycirc;"], [0, "&ycirc;"], [0, "&Yuml;"], [0, "&Zacute;"], [0, "&zacute;"], [0, "&Zdot;"], [0, "&zdot;"], [0, "&Zcaron;"], [0, "&zcaron;"], [19, "&fnof;"], [34, "&imped;"], [63, "&gacute;"], [65, "&jmath;"], [142, "&circ;"], [0, "&caron;"], [16, "&breve;"], [0, "&DiacriticalDot;"], [0, "&ring;"], [0, "&ogon;"], [0, "&DiacriticalTilde;"], [0, "&dblac;"], [51, "&DownBreve;"], [127, "&Alpha;"], [0, "&Beta;"], [0, "&Gamma;"], [0, "&Delta;"], [0, "&Epsilon;"], [0, "&Zeta;"], [0, "&Eta;"], [0, "&Theta;"], [0, "&Iota;"], [0, "&Kappa;"], [0, "&Lambda;"], [0, "&Mu;"], [0, "&Nu;"], [0, "&Xi;"], [0, "&Omicron;"], [0, "&Pi;"], [0, "&Rho;"], [1, "&Sigma;"], [0, "&Tau;"], [0, "&Upsilon;"], [0, "&Phi;"], [0, "&Chi;"], [0, "&Psi;"], [0, "&ohm;"], [7, "&alpha;"], [0, "&beta;"], [0, "&gamma;"], [0, "&delta;"], [0, "&epsi;"], [0, "&zeta;"], [0, "&eta;"], [0, "&theta;"], [0, "&iota;"], [0, "&kappa;"], [0, "&lambda;"], [0, "&mu;"], [0, "&nu;"], [0, "&xi;"], [0, "&omicron;"], [0, "&pi;"], [0, "&rho;"], [0, "&sigmaf;"], [0, "&sigma;"], [0, "&tau;"], [0, "&upsi;"], [0, "&phi;"], [0, "&chi;"], [0, "&psi;"], [0, "&omega;"], [7, "&thetasym;"], [0, "&Upsi;"], [2, "&phiv;"], [0, "&piv;"], [5, "&Gammad;"], [0, "&digamma;"], [18, "&kappav;"], [0, "&rhov;"], [3, "&epsiv;"], [0, "&backepsilon;"], [10, "&IOcy;"], [0, "&DJcy;"], [0, "&GJcy;"], [0, "&Jukcy;"], [0, "&DScy;"], [0, "&Iukcy;"], [0, "&YIcy;"], [0, "&Jsercy;"], [0, "&LJcy;"], [0, "&NJcy;"], [0, "&TSHcy;"], [0, "&KJcy;"], [1, "&Ubrcy;"], [0, "&DZcy;"], [0, "&Acy;"], [0, "&Bcy;"], [0, "&Vcy;"], [0, "&Gcy;"], [0, "&Dcy;"], [0, "&IEcy;"], [0, "&ZHcy;"], [0, "&Zcy;"], [0, "&Icy;"], [0, "&Jcy;"], [0, "&Kcy;"], [0, "&Lcy;"], [0, "&Mcy;"], [0, "&Ncy;"], [0, "&Ocy;"], [0, "&Pcy;"], [0, "&Rcy;"], [0, "&Scy;"], [0, "&Tcy;"], [0, "&Ucy;"], [0, "&Fcy;"], [0, "&KHcy;"], [0, "&TScy;"], [0, "&CHcy;"], [0, "&SHcy;"], [0, "&SHCHcy;"], [0, "&HARDcy;"], [0, "&Ycy;"], [0, "&SOFTcy;"], [0, "&Ecy;"], [0, "&YUcy;"], [0, "&YAcy;"], [0, "&acy;"], [0, "&bcy;"], [0, "&vcy;"], [0, "&gcy;"], [0, "&dcy;"], [0, "&iecy;"], [0, "&zhcy;"], [0, "&zcy;"], [0, "&icy;"], [0, "&jcy;"], [0, "&kcy;"], [0, "&lcy;"], [0, "&mcy;"], [0, "&ncy;"], [0, "&ocy;"], [0, "&pcy;"], [0, "&rcy;"], [0, "&scy;"], [0, "&tcy;"], [0, "&ucy;"], [0, "&fcy;"], [0, "&khcy;"], [0, "&tscy;"], [0, "&chcy;"], [0, "&shcy;"], [0, "&shchcy;"], [0, "&hardcy;"], [0, "&ycy;"], [0, "&softcy;"], [0, "&ecy;"], [0, "&yucy;"], [0, "&yacy;"], [1, "&iocy;"], [0, "&djcy;"], [0, "&gjcy;"], [0, "&jukcy;"], [0, "&dscy;"], [0, "&iukcy;"], [0, "&yicy;"], [0, "&jsercy;"], [0, "&ljcy;"], [0, "&njcy;"], [0, "&tshcy;"], [0, "&kjcy;"], [1, "&ubrcy;"], [0, "&dzcy;"], [7074, "&ensp;"], [0, "&emsp;"], [0, "&emsp13;"], [0, "&emsp14;"], [1, "&numsp;"], [0, "&puncsp;"], [0, "&ThinSpace;"], [0, "&hairsp;"], [0, "&NegativeMediumSpace;"], [0, "&zwnj;"], [0, "&zwj;"], [0, "&lrm;"], [0, "&rlm;"], [0, "&dash;"], [2, "&ndash;"], [0, "&mdash;"], [0, "&horbar;"], [0, "&Verbar;"], [1, "&lsquo;"], [0, "&CloseCurlyQuote;"], [0, "&lsquor;"], [1, "&ldquo;"], [0, "&CloseCurlyDoubleQuote;"], [0, "&bdquo;"], [1, "&dagger;"], [0, "&Dagger;"], [0, "&bull;"], [2, "&nldr;"], [0, "&hellip;"], [9, "&permil;"], [0, "&pertenk;"], [0, "&prime;"], [0, "&Prime;"], [0, "&tprime;"], [0, "&backprime;"], [3, "&lsaquo;"], [0, "&rsaquo;"], [3, "&oline;"], [2, "&caret;"], [1, "&hybull;"], [0, "&frasl;"], [10, "&bsemi;"], [7, "&qprime;"], [7, { v: "&MediumSpace;", n: 8202, o: "&ThickSpace;" }], [0, "&NoBreak;"], [0, "&af;"], [0, "&InvisibleTimes;"], [0, "&ic;"], [72, "&euro;"], [46, "&tdot;"], [0, "&DotDot;"], [37, "&complexes;"], [2, "&incare;"], [4, "&gscr;"], [0, "&hamilt;"], [0, "&Hfr;"], [0, "&Hopf;"], [0, "&planckh;"], [0, "&hbar;"], [0, "&imagline;"], [0, "&Ifr;"], [0, "&lagran;"], [0, "&ell;"], [1, "&naturals;"], [0, "&numero;"], [0, "&copysr;"], [0, "&weierp;"], [0, "&Popf;"], [0, "&Qopf;"], [0, "&realine;"], [0, "&real;"], [0, "&reals;"], [0, "&rx;"], [3, "&trade;"], [1, "&integers;"], [2, "&mho;"], [0, "&zeetrf;"], [0, "&iiota;"], [2, "&bernou;"], [0, "&Cayleys;"], [1, "&escr;"], [0, "&Escr;"], [0, "&Fouriertrf;"], [1, "&Mellintrf;"], [0, "&order;"], [0, "&alefsym;"], [0, "&beth;"], [0, "&gimel;"], [0, "&daleth;"], [12, "&CapitalDifferentialD;"], [0, "&dd;"], [0, "&ee;"], [0, "&ii;"], [10, "&frac13;"], [0, "&frac23;"], [0, "&frac15;"], [0, "&frac25;"], [0, "&frac35;"], [0, "&frac45;"], [0, "&frac16;"], [0, "&frac56;"], [0, "&frac18;"], [0, "&frac38;"], [0, "&frac58;"], [0, "&frac78;"], [49, "&larr;"], [0, "&ShortUpArrow;"], [0, "&rarr;"], [0, "&darr;"], [0, "&harr;"], [0, "&updownarrow;"], [0, "&nwarr;"], [0, "&nearr;"], [0, "&LowerRightArrow;"], [0, "&LowerLeftArrow;"], [0, "&nlarr;"], [0, "&nrarr;"], [1, { v: "&rarrw;", n: 824, o: "&nrarrw;" }], [0, "&Larr;"], [0, "&Uarr;"], [0, "&Rarr;"], [0, "&Darr;"], [0, "&larrtl;"], [0, "&rarrtl;"], [0, "&LeftTeeArrow;"], [0, "&mapstoup;"], [0, "&map;"], [0, "&DownTeeArrow;"], [1, "&hookleftarrow;"], [0, "&hookrightarrow;"], [0, "&larrlp;"], [0, "&looparrowright;"], [0, "&harrw;"], [0, "&nharr;"], [1, "&lsh;"], [0, "&rsh;"], [0, "&ldsh;"], [0, "&rdsh;"], [1, "&crarr;"], [0, "&cularr;"], [0, "&curarr;"], [2, "&circlearrowleft;"], [0, "&circlearrowright;"], [0, "&leftharpoonup;"], [0, "&DownLeftVector;"], [0, "&RightUpVector;"], [0, "&LeftUpVector;"], [0, "&rharu;"], [0, "&DownRightVector;"], [0, "&dharr;"], [0, "&dharl;"], [0, "&RightArrowLeftArrow;"], [0, "&udarr;"], [0, "&LeftArrowRightArrow;"], [0, "&leftleftarrows;"], [0, "&upuparrows;"], [0, "&rightrightarrows;"], [0, "&ddarr;"], [0, "&leftrightharpoons;"], [0, "&Equilibrium;"], [0, "&nlArr;"], [0, "&nhArr;"], [0, "&nrArr;"], [0, "&DoubleLeftArrow;"], [0, "&DoubleUpArrow;"], [0, "&DoubleRightArrow;"], [0, "&dArr;"], [0, "&DoubleLeftRightArrow;"], [0, "&DoubleUpDownArrow;"], [0, "&nwArr;"], [0, "&neArr;"], [0, "&seArr;"], [0, "&swArr;"], [0, "&lAarr;"], [0, "&rAarr;"], [1, "&zigrarr;"], [6, "&larrb;"], [0, "&rarrb;"], [15, "&DownArrowUpArrow;"], [7, "&loarr;"], [0, "&roarr;"], [0, "&hoarr;"], [0, "&forall;"], [0, "&comp;"], [0, { v: "&part;", n: 824, o: "&npart;" }], [0, "&exist;"], [0, "&nexist;"], [0, "&empty;"], [1, "&Del;"], [0, "&Element;"], [0, "&NotElement;"], [1, "&ni;"], [0, "&notni;"], [2, "&prod;"], [0, "&coprod;"], [0, "&sum;"], [0, "&minus;"], [0, "&MinusPlus;"], [0, "&dotplus;"], [1, "&Backslash;"], [0, "&lowast;"], [0, "&compfn;"], [1, "&radic;"], [2, "&prop;"], [0, "&infin;"], [0, "&angrt;"], [0, { v: "&ang;", n: 8402, o: "&nang;" }], [0, "&angmsd;"], [0, "&angsph;"], [0, "&mid;"], [0, "&nmid;"], [0, "&DoubleVerticalBar;"], [0, "&NotDoubleVerticalBar;"], [0, "&and;"], [0, "&or;"], [0, { v: "&cap;", n: 65024, o: "&caps;" }], [0, { v: "&cup;", n: 65024, o: "&cups;" }], [0, "&int;"], [0, "&Int;"], [0, "&iiint;"], [0, "&conint;"], [0, "&Conint;"], [0, "&Cconint;"], [0, "&cwint;"], [0, "&ClockwiseContourIntegral;"], [0, "&awconint;"], [0, "&there4;"], [0, "&becaus;"], [0, "&ratio;"], [0, "&Colon;"], [0, "&dotminus;"], [1, "&mDDot;"], [0, "&homtht;"], [0, { v: "&sim;", n: 8402, o: "&nvsim;" }], [0, { v: "&backsim;", n: 817, o: "&race;" }], [0, { v: "&ac;", n: 819, o: "&acE;" }], [0, "&acd;"], [0, "&VerticalTilde;"], [0, "&NotTilde;"], [0, { v: "&eqsim;", n: 824, o: "&nesim;" }], [0, "&sime;"], [0, "&NotTildeEqual;"], [0, "&cong;"], [0, "&simne;"], [0, "&ncong;"], [0, "&ap;"], [0, "&nap;"], [0, "&ape;"], [0, { v: "&apid;", n: 824, o: "&napid;" }], [0, "&backcong;"], [0, { v: "&asympeq;", n: 8402, o: "&nvap;" }], [0, { v: "&bump;", n: 824, o: "&nbump;" }], [0, { v: "&bumpe;", n: 824, o: "&nbumpe;" }], [0, { v: "&doteq;", n: 824, o: "&nedot;" }], [0, "&doteqdot;"], [0, "&efDot;"], [0, "&erDot;"], [0, "&Assign;"], [0, "&ecolon;"], [0, "&ecir;"], [0, "&circeq;"], [1, "&wedgeq;"], [0, "&veeeq;"], [1, "&triangleq;"], [2, "&equest;"], [0, "&ne;"], [0, { v: "&Congruent;", n: 8421, o: "&bnequiv;" }], [0, "&nequiv;"], [1, { v: "&le;", n: 8402, o: "&nvle;" }], [0, { v: "&ge;", n: 8402, o: "&nvge;" }], [0, { v: "&lE;", n: 824, o: "&nlE;" }], [0, { v: "&gE;", n: 824, o: "&ngE;" }], [0, { v: "&lnE;", n: 65024, o: "&lvertneqq;" }], [0, { v: "&gnE;", n: 65024, o: "&gvertneqq;" }], [0, { v: "&ll;", n: new Map(/* @__PURE__ */ Lr([[824, "&nLtv;"], [7577, "&nLt;"]])) }], [0, { v: "&gg;", n: new Map(/* @__PURE__ */ Lr([[824, "&nGtv;"], [7577, "&nGt;"]])) }], [0, "&between;"], [0, "&NotCupCap;"], [0, "&nless;"], [0, "&ngt;"], [0, "&nle;"], [0, "&nge;"], [0, "&lesssim;"], [0, "&GreaterTilde;"], [0, "&nlsim;"], [0, "&ngsim;"], [0, "&LessGreater;"], [0, "&gl;"], [0, "&NotLessGreater;"], [0, "&NotGreaterLess;"], [0, "&pr;"], [0, "&sc;"], [0, "&prcue;"], [0, "&sccue;"], [0, "&PrecedesTilde;"], [0, { v: "&scsim;", n: 824, o: "&NotSucceedsTilde;" }], [0, "&NotPrecedes;"], [0, "&NotSucceeds;"], [0, { v: "&sub;", n: 8402, o: "&NotSubset;" }], [0, { v: "&sup;", n: 8402, o: "&NotSuperset;" }], [0, "&nsub;"], [0, "&nsup;"], [0, "&sube;"], [0, "&supe;"], [0, "&NotSubsetEqual;"], [0, "&NotSupersetEqual;"], [0, { v: "&subne;", n: 65024, o: "&varsubsetneq;" }], [0, { v: "&supne;", n: 65024, o: "&varsupsetneq;" }], [1, "&cupdot;"], [0, "&UnionPlus;"], [0, { v: "&sqsub;", n: 824, o: "&NotSquareSubset;" }], [0, { v: "&sqsup;", n: 824, o: "&NotSquareSuperset;" }], [0, "&sqsube;"], [0, "&sqsupe;"], [0, { v: "&sqcap;", n: 65024, o: "&sqcaps;" }], [0, { v: "&sqcup;", n: 65024, o: "&sqcups;" }], [0, "&CirclePlus;"], [0, "&CircleMinus;"], [0, "&CircleTimes;"], [0, "&osol;"], [0, "&CircleDot;"], [0, "&circledcirc;"], [0, "&circledast;"], [1, "&circleddash;"], [0, "&boxplus;"], [0, "&boxminus;"], [0, "&boxtimes;"], [0, "&dotsquare;"], [0, "&RightTee;"], [0, "&dashv;"], [0, "&DownTee;"], [0, "&bot;"], [1, "&models;"], [0, "&DoubleRightTee;"], [0, "&Vdash;"], [0, "&Vvdash;"], [0, "&VDash;"], [0, "&nvdash;"], [0, "&nvDash;"], [0, "&nVdash;"], [0, "&nVDash;"], [0, "&prurel;"], [1, "&LeftTriangle;"], [0, "&RightTriangle;"], [0, { v: "&LeftTriangleEqual;", n: 8402, o: "&nvltrie;" }], [0, { v: "&RightTriangleEqual;", n: 8402, o: "&nvrtrie;" }], [0, "&origof;"], [0, "&imof;"], [0, "&multimap;"], [0, "&hercon;"], [0, "&intcal;"], [0, "&veebar;"], [1, "&barvee;"], [0, "&angrtvb;"], [0, "&lrtri;"], [0, "&bigwedge;"], [0, "&bigvee;"], [0, "&bigcap;"], [0, "&bigcup;"], [0, "&diam;"], [0, "&sdot;"], [0, "&sstarf;"], [0, "&divideontimes;"], [0, "&bowtie;"], [0, "&ltimes;"], [0, "&rtimes;"], [0, "&leftthreetimes;"], [0, "&rightthreetimes;"], [0, "&backsimeq;"], [0, "&curlyvee;"], [0, "&curlywedge;"], [0, "&Sub;"], [0, "&Sup;"], [0, "&Cap;"], [0, "&Cup;"], [0, "&fork;"], [0, "&epar;"], [0, "&lessdot;"], [0, "&gtdot;"], [0, { v: "&Ll;", n: 824, o: "&nLl;" }], [0, { v: "&Gg;", n: 824, o: "&nGg;" }], [0, { v: "&leg;", n: 65024, o: "&lesg;" }], [0, { v: "&gel;", n: 65024, o: "&gesl;" }], [2, "&cuepr;"], [0, "&cuesc;"], [0, "&NotPrecedesSlantEqual;"], [0, "&NotSucceedsSlantEqual;"], [0, "&NotSquareSubsetEqual;"], [0, "&NotSquareSupersetEqual;"], [2, "&lnsim;"], [0, "&gnsim;"], [0, "&precnsim;"], [0, "&scnsim;"], [0, "&nltri;"], [0, "&NotRightTriangle;"], [0, "&nltrie;"], [0, "&NotRightTriangleEqual;"], [0, "&vellip;"], [0, "&ctdot;"], [0, "&utdot;"], [0, "&dtdot;"], [0, "&disin;"], [0, "&isinsv;"], [0, "&isins;"], [0, { v: "&isindot;", n: 824, o: "&notindot;" }], [0, "&notinvc;"], [0, "&notinvb;"], [1, { v: "&isinE;", n: 824, o: "&notinE;" }], [0, "&nisd;"], [0, "&xnis;"], [0, "&nis;"], [0, "&notnivc;"], [0, "&notnivb;"], [6, "&barwed;"], [0, "&Barwed;"], [1, "&lceil;"], [0, "&rceil;"], [0, "&LeftFloor;"], [0, "&rfloor;"], [0, "&drcrop;"], [0, "&dlcrop;"], [0, "&urcrop;"], [0, "&ulcrop;"], [0, "&bnot;"], [1, "&profline;"], [0, "&profsurf;"], [1, "&telrec;"], [0, "&target;"], [5, "&ulcorn;"], [0, "&urcorn;"], [0, "&dlcorn;"], [0, "&drcorn;"], [2, "&frown;"], [0, "&smile;"], [9, "&cylcty;"], [0, "&profalar;"], [7, "&topbot;"], [6, "&ovbar;"], [1, "&solbar;"], [60, "&angzarr;"], [51, "&lmoustache;"], [0, "&rmoustache;"], [2, "&OverBracket;"], [0, "&bbrk;"], [0, "&bbrktbrk;"], [37, "&OverParenthesis;"], [0, "&UnderParenthesis;"], [0, "&OverBrace;"], [0, "&UnderBrace;"], [2, "&trpezium;"], [4, "&elinters;"], [59, "&blank;"], [164, "&circledS;"], [55, "&boxh;"], [1, "&boxv;"], [9, "&boxdr;"], [3, "&boxdl;"], [3, "&boxur;"], [3, "&boxul;"], [3, "&boxvr;"], [7, "&boxvl;"], [7, "&boxhd;"], [7, "&boxhu;"], [7, "&boxvh;"], [19, "&boxH;"], [0, "&boxV;"], [0, "&boxdR;"], [0, "&boxDr;"], [0, "&boxDR;"], [0, "&boxdL;"], [0, "&boxDl;"], [0, "&boxDL;"], [0, "&boxuR;"], [0, "&boxUr;"], [0, "&boxUR;"], [0, "&boxuL;"], [0, "&boxUl;"], [0, "&boxUL;"], [0, "&boxvR;"], [0, "&boxVr;"], [0, "&boxVR;"], [0, "&boxvL;"], [0, "&boxVl;"], [0, "&boxVL;"], [0, "&boxHd;"], [0, "&boxhD;"], [0, "&boxHD;"], [0, "&boxHu;"], [0, "&boxhU;"], [0, "&boxHU;"], [0, "&boxvH;"], [0, "&boxVh;"], [0, "&boxVH;"], [19, "&uhblk;"], [3, "&lhblk;"], [3, "&block;"], [8, "&blk14;"], [0, "&blk12;"], [0, "&blk34;"], [13, "&square;"], [8, "&blacksquare;"], [0, "&EmptyVerySmallSquare;"], [1, "&rect;"], [0, "&marker;"], [2, "&fltns;"], [1, "&bigtriangleup;"], [0, "&blacktriangle;"], [0, "&triangle;"], [2, "&blacktriangleright;"], [0, "&rtri;"], [3, "&bigtriangledown;"], [0, "&blacktriangledown;"], [0, "&dtri;"], [2, "&blacktriangleleft;"], [0, "&ltri;"], [6, "&loz;"], [0, "&cir;"], [32, "&tridot;"], [2, "&bigcirc;"], [8, "&ultri;"], [0, "&urtri;"], [0, "&lltri;"], [0, "&EmptySmallSquare;"], [0, "&FilledSmallSquare;"], [8, "&bigstar;"], [0, "&star;"], [7, "&phone;"], [49, "&female;"], [1, "&male;"], [29, "&spades;"], [2, "&clubs;"], [1, "&hearts;"], [0, "&diamondsuit;"], [3, "&sung;"], [2, "&flat;"], [0, "&natural;"], [0, "&sharp;"], [163, "&check;"], [3, "&cross;"], [8, "&malt;"], [21, "&sext;"], [33, "&VerticalSeparator;"], [25, "&lbbrk;"], [0, "&rbbrk;"], [84, "&bsolhsub;"], [0, "&suphsol;"], [28, "&LeftDoubleBracket;"], [0, "&RightDoubleBracket;"], [0, "&lang;"], [0, "&rang;"], [0, "&Lang;"], [0, "&Rang;"], [0, "&loang;"], [0, "&roang;"], [7, "&longleftarrow;"], [0, "&longrightarrow;"], [0, "&longleftrightarrow;"], [0, "&DoubleLongLeftArrow;"], [0, "&DoubleLongRightArrow;"], [0, "&DoubleLongLeftRightArrow;"], [1, "&longmapsto;"], [2, "&dzigrarr;"], [258, "&nvlArr;"], [0, "&nvrArr;"], [0, "&nvHarr;"], [0, "&Map;"], [6, "&lbarr;"], [0, "&bkarow;"], [0, "&lBarr;"], [0, "&dbkarow;"], [0, "&drbkarow;"], [0, "&DDotrahd;"], [0, "&UpArrowBar;"], [0, "&DownArrowBar;"], [2, "&Rarrtl;"], [2, "&latail;"], [0, "&ratail;"], [0, "&lAtail;"], [0, "&rAtail;"], [0, "&larrfs;"], [0, "&rarrfs;"], [0, "&larrbfs;"], [0, "&rarrbfs;"], [2, "&nwarhk;"], [0, "&nearhk;"], [0, "&hksearow;"], [0, "&hkswarow;"], [0, "&nwnear;"], [0, "&nesear;"], [0, "&seswar;"], [0, "&swnwar;"], [8, { v: "&rarrc;", n: 824, o: "&nrarrc;" }], [1, "&cudarrr;"], [0, "&ldca;"], [0, "&rdca;"], [0, "&cudarrl;"], [0, "&larrpl;"], [2, "&curarrm;"], [0, "&cularrp;"], [7, "&rarrpl;"], [2, "&harrcir;"], [0, "&Uarrocir;"], [0, "&lurdshar;"], [0, "&ldrushar;"], [2, "&LeftRightVector;"], [0, "&RightUpDownVector;"], [0, "&DownLeftRightVector;"], [0, "&LeftUpDownVector;"], [0, "&LeftVectorBar;"], [0, "&RightVectorBar;"], [0, "&RightUpVectorBar;"], [0, "&RightDownVectorBar;"], [0, "&DownLeftVectorBar;"], [0, "&DownRightVectorBar;"], [0, "&LeftUpVectorBar;"], [0, "&LeftDownVectorBar;"], [0, "&LeftTeeVector;"], [0, "&RightTeeVector;"], [0, "&RightUpTeeVector;"], [0, "&RightDownTeeVector;"], [0, "&DownLeftTeeVector;"], [0, "&DownRightTeeVector;"], [0, "&LeftUpTeeVector;"], [0, "&LeftDownTeeVector;"], [0, "&lHar;"], [0, "&uHar;"], [0, "&rHar;"], [0, "&dHar;"], [0, "&luruhar;"], [0, "&ldrdhar;"], [0, "&ruluhar;"], [0, "&rdldhar;"], [0, "&lharul;"], [0, "&llhard;"], [0, "&rharul;"], [0, "&lrhard;"], [0, "&udhar;"], [0, "&duhar;"], [0, "&RoundImplies;"], [0, "&erarr;"], [0, "&simrarr;"], [0, "&larrsim;"], [0, "&rarrsim;"], [0, "&rarrap;"], [0, "&ltlarr;"], [1, "&gtrarr;"], [0, "&subrarr;"], [1, "&suplarr;"], [0, "&lfisht;"], [0, "&rfisht;"], [0, "&ufisht;"], [0, "&dfisht;"], [5, "&lopar;"], [0, "&ropar;"], [4, "&lbrke;"], [0, "&rbrke;"], [0, "&lbrkslu;"], [0, "&rbrksld;"], [0, "&lbrksld;"], [0, "&rbrkslu;"], [0, "&langd;"], [0, "&rangd;"], [0, "&lparlt;"], [0, "&rpargt;"], [0, "&gtlPar;"], [0, "&ltrPar;"], [3, "&vzigzag;"], [1, "&vangrt;"], [0, "&angrtvbd;"], [6, "&ange;"], [0, "&range;"], [0, "&dwangle;"], [0, "&uwangle;"], [0, "&angmsdaa;"], [0, "&angmsdab;"], [0, "&angmsdac;"], [0, "&angmsdad;"], [0, "&angmsdae;"], [0, "&angmsdaf;"], [0, "&angmsdag;"], [0, "&angmsdah;"], [0, "&bemptyv;"], [0, "&demptyv;"], [0, "&cemptyv;"], [0, "&raemptyv;"], [0, "&laemptyv;"], [0, "&ohbar;"], [0, "&omid;"], [0, "&opar;"], [1, "&operp;"], [1, "&olcross;"], [0, "&odsold;"], [1, "&olcir;"], [0, "&ofcir;"], [0, "&olt;"], [0, "&ogt;"], [0, "&cirscir;"], [0, "&cirE;"], [0, "&solb;"], [0, "&bsolb;"], [3, "&boxbox;"], [3, "&trisb;"], [0, "&rtriltri;"], [0, { v: "&LeftTriangleBar;", n: 824, o: "&NotLeftTriangleBar;" }], [0, { v: "&RightTriangleBar;", n: 824, o: "&NotRightTriangleBar;" }], [11, "&iinfin;"], [0, "&infintie;"], [0, "&nvinfin;"], [4, "&eparsl;"], [0, "&smeparsl;"], [0, "&eqvparsl;"], [5, "&blacklozenge;"], [8, "&RuleDelayed;"], [1, "&dsol;"], [9, "&bigodot;"], [0, "&bigoplus;"], [0, "&bigotimes;"], [1, "&biguplus;"], [1, "&bigsqcup;"], [5, "&iiiint;"], [0, "&fpartint;"], [2, "&cirfnint;"], [0, "&awint;"], [0, "&rppolint;"], [0, "&scpolint;"], [0, "&npolint;"], [0, "&pointint;"], [0, "&quatint;"], [0, "&intlarhk;"], [10, "&pluscir;"], [0, "&plusacir;"], [0, "&simplus;"], [0, "&plusdu;"], [0, "&plussim;"], [0, "&plustwo;"], [1, "&mcomma;"], [0, "&minusdu;"], [2, "&loplus;"], [0, "&roplus;"], [0, "&Cross;"], [0, "&timesd;"], [0, "&timesbar;"], [1, "&smashp;"], [0, "&lotimes;"], [0, "&rotimes;"], [0, "&otimesas;"], [0, "&Otimes;"], [0, "&odiv;"], [0, "&triplus;"], [0, "&triminus;"], [0, "&tritime;"], [0, "&intprod;"], [2, "&amalg;"], [0, "&capdot;"], [1, "&ncup;"], [0, "&ncap;"], [0, "&capand;"], [0, "&cupor;"], [0, "&cupcap;"], [0, "&capcup;"], [0, "&cupbrcap;"], [0, "&capbrcup;"], [0, "&cupcup;"], [0, "&capcap;"], [0, "&ccups;"], [0, "&ccaps;"], [2, "&ccupssm;"], [2, "&And;"], [0, "&Or;"], [0, "&andand;"], [0, "&oror;"], [0, "&orslope;"], [0, "&andslope;"], [1, "&andv;"], [0, "&orv;"], [0, "&andd;"], [0, "&ord;"], [1, "&wedbar;"], [6, "&sdote;"], [3, "&simdot;"], [2, { v: "&congdot;", n: 824, o: "&ncongdot;" }], [0, "&easter;"], [0, "&apacir;"], [0, { v: "&apE;", n: 824, o: "&napE;" }], [0, "&eplus;"], [0, "&pluse;"], [0, "&Esim;"], [0, "&Colone;"], [0, "&Equal;"], [1, "&ddotseq;"], [0, "&equivDD;"], [0, "&ltcir;"], [0, "&gtcir;"], [0, "&ltquest;"], [0, "&gtquest;"], [0, { v: "&leqslant;", n: 824, o: "&nleqslant;" }], [0, { v: "&geqslant;", n: 824, o: "&ngeqslant;" }], [0, "&lesdot;"], [0, "&gesdot;"], [0, "&lesdoto;"], [0, "&gesdoto;"], [0, "&lesdotor;"], [0, "&gesdotol;"], [0, "&lap;"], [0, "&gap;"], [0, "&lne;"], [0, "&gne;"], [0, "&lnap;"], [0, "&gnap;"], [0, "&lEg;"], [0, "&gEl;"], [0, "&lsime;"], [0, "&gsime;"], [0, "&lsimg;"], [0, "&gsiml;"], [0, "&lgE;"], [0, "&glE;"], [0, "&lesges;"], [0, "&gesles;"], [0, "&els;"], [0, "&egs;"], [0, "&elsdot;"], [0, "&egsdot;"], [0, "&el;"], [0, "&eg;"], [2, "&siml;"], [0, "&simg;"], [0, "&simlE;"], [0, "&simgE;"], [0, { v: "&LessLess;", n: 824, o: "&NotNestedLessLess;" }], [0, { v: "&GreaterGreater;", n: 824, o: "&NotNestedGreaterGreater;" }], [1, "&glj;"], [0, "&gla;"], [0, "&ltcc;"], [0, "&gtcc;"], [0, "&lescc;"], [0, "&gescc;"], [0, "&smt;"], [0, "&lat;"], [0, { v: "&smte;", n: 65024, o: "&smtes;" }], [0, { v: "&late;", n: 65024, o: "&lates;" }], [0, "&bumpE;"], [0, { v: "&PrecedesEqual;", n: 824, o: "&NotPrecedesEqual;" }], [0, { v: "&sce;", n: 824, o: "&NotSucceedsEqual;" }], [2, "&prE;"], [0, "&scE;"], [0, "&precneqq;"], [0, "&scnE;"], [0, "&prap;"], [0, "&scap;"], [0, "&precnapprox;"], [0, "&scnap;"], [0, "&Pr;"], [0, "&Sc;"], [0, "&subdot;"], [0, "&supdot;"], [0, "&subplus;"], [0, "&supplus;"], [0, "&submult;"], [0, "&supmult;"], [0, "&subedot;"], [0, "&supedot;"], [0, { v: "&subE;", n: 824, o: "&nsubE;" }], [0, { v: "&supE;", n: 824, o: "&nsupE;" }], [0, "&subsim;"], [0, "&supsim;"], [2, { v: "&subnE;", n: 65024, o: "&varsubsetneqq;" }], [0, { v: "&supnE;", n: 65024, o: "&varsupsetneqq;" }], [2, "&csub;"], [0, "&csup;"], [0, "&csube;"], [0, "&csupe;"], [0, "&subsup;"], [0, "&supsub;"], [0, "&subsub;"], [0, "&supsup;"], [0, "&suphsub;"], [0, "&supdsub;"], [0, "&forkv;"], [0, "&topfork;"], [0, "&mlcp;"], [8, "&Dashv;"], [1, "&Vdashl;"], [0, "&Barv;"], [0, "&vBar;"], [0, "&vBarv;"], [1, "&Vbar;"], [0, "&Not;"], [0, "&bNot;"], [0, "&rnmid;"], [0, "&cirmid;"], [0, "&midcir;"], [0, "&topcir;"], [0, "&nhpar;"], [0, "&parsim;"], [9, { v: "&parsl;", n: 8421, o: "&nparsl;" }], [44343, { n: new Map(/* @__PURE__ */ Lr([[56476, "&Ascr;"], [1, "&Cscr;"], [0, "&Dscr;"], [2, "&Gscr;"], [2, "&Jscr;"], [0, "&Kscr;"], [2, "&Nscr;"], [0, "&Oscr;"], [0, "&Pscr;"], [0, "&Qscr;"], [1, "&Sscr;"], [0, "&Tscr;"], [0, "&Uscr;"], [0, "&Vscr;"], [0, "&Wscr;"], [0, "&Xscr;"], [0, "&Yscr;"], [0, "&Zscr;"], [0, "&ascr;"], [0, "&bscr;"], [0, "&cscr;"], [0, "&dscr;"], [1, "&fscr;"], [1, "&hscr;"], [0, "&iscr;"], [0, "&jscr;"], [0, "&kscr;"], [0, "&lscr;"], [0, "&mscr;"], [0, "&nscr;"], [1, "&pscr;"], [0, "&qscr;"], [0, "&rscr;"], [0, "&sscr;"], [0, "&tscr;"], [0, "&uscr;"], [0, "&vscr;"], [0, "&wscr;"], [0, "&xscr;"], [0, "&yscr;"], [0, "&zscr;"], [52, "&Afr;"], [0, "&Bfr;"], [1, "&Dfr;"], [0, "&Efr;"], [0, "&Ffr;"], [0, "&Gfr;"], [2, "&Jfr;"], [0, "&Kfr;"], [0, "&Lfr;"], [0, "&Mfr;"], [0, "&Nfr;"], [0, "&Ofr;"], [0, "&Pfr;"], [0, "&Qfr;"], [1, "&Sfr;"], [0, "&Tfr;"], [0, "&Ufr;"], [0, "&Vfr;"], [0, "&Wfr;"], [0, "&Xfr;"], [0, "&Yfr;"], [1, "&afr;"], [0, "&bfr;"], [0, "&cfr;"], [0, "&dfr;"], [0, "&efr;"], [0, "&ffr;"], [0, "&gfr;"], [0, "&hfr;"], [0, "&ifr;"], [0, "&jfr;"], [0, "&kfr;"], [0, "&lfr;"], [0, "&mfr;"], [0, "&nfr;"], [0, "&ofr;"], [0, "&pfr;"], [0, "&qfr;"], [0, "&rfr;"], [0, "&sfr;"], [0, "&tfr;"], [0, "&ufr;"], [0, "&vfr;"], [0, "&wfr;"], [0, "&xfr;"], [0, "&yfr;"], [0, "&zfr;"], [0, "&Aopf;"], [0, "&Bopf;"], [1, "&Dopf;"], [0, "&Eopf;"], [0, "&Fopf;"], [0, "&Gopf;"], [1, "&Iopf;"], [0, "&Jopf;"], [0, "&Kopf;"], [0, "&Lopf;"], [0, "&Mopf;"], [1, "&Oopf;"], [3, "&Sopf;"], [0, "&Topf;"], [0, "&Uopf;"], [0, "&Vopf;"], [0, "&Wopf;"], [0, "&Xopf;"], [0, "&Yopf;"], [1, "&aopf;"], [0, "&bopf;"], [0, "&copf;"], [0, "&dopf;"], [0, "&eopf;"], [0, "&fopf;"], [0, "&gopf;"], [0, "&hopf;"], [0, "&iopf;"], [0, "&jopf;"], [0, "&kopf;"], [0, "&lopf;"], [0, "&mopf;"], [0, "&nopf;"], [0, "&oopf;"], [0, "&popf;"], [0, "&qopf;"], [0, "&ropf;"], [0, "&sopf;"], [0, "&topf;"], [0, "&uopf;"], [0, "&vopf;"], [0, "&wopf;"], [0, "&xopf;"], [0, "&yopf;"], [0, "&zopf;"]])) }], [8906, "&fflig;"], [0, "&filig;"], [0, "&fllig;"], [0, "&ffilig;"], [0, "&ffllig;"]]));
var ra = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.escapeText = e.escapeAttribute = e.escapeUTF8 = e.escape = e.encodeXML = e.getCodePoint = e.xmlReplacer = void 0, e.xmlReplacer = /["&'<>$\x80-\uFFFF]/g;
  var u = /* @__PURE__ */ new Map([
    [34, "&quot;"],
    [38, "&amp;"],
    [39, "&apos;"],
    [60, "&lt;"],
    [62, "&gt;"]
  ]);
  e.getCodePoint = // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  String.prototype.codePointAt != null ? function(a, n) {
    return a.codePointAt(n);
  } : (
    // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
    function(a, n) {
      return (a.charCodeAt(n) & 64512) === 55296 ? (a.charCodeAt(n) - 55296) * 1024 + a.charCodeAt(n + 1) - 56320 + 65536 : a.charCodeAt(n);
    }
  );
  function t(a) {
    for (var n = "", i = 0, s; (s = e.xmlReplacer.exec(a)) !== null; ) {
      var o = s.index, d = a.charCodeAt(o), c = u.get(d);
      c !== void 0 ? (n += a.substring(i, o) + c, i = o + 1) : (n += "".concat(a.substring(i, o), "&#x").concat((0, e.getCodePoint)(a, o).toString(16), ";"), i = e.xmlReplacer.lastIndex += +((d & 64512) === 55296));
    }
    return n + a.substr(i);
  }
  e.encodeXML = t, e.escape = t;
  function r(a, n) {
    return function(s) {
      for (var o, d = 0, c = ""; o = a.exec(s); )
        d !== o.index && (c += s.substring(d, o.index)), c += n.get(o[0].charCodeAt(0)), d = o.index + 1;
      return c + s.substring(d);
    };
  }
  e.escapeUTF8 = r(/[&<>'"]/g, u), e.escapeAttribute = r(/["&\u00A0]/g, /* @__PURE__ */ new Map([
    [34, "&quot;"],
    [38, "&amp;"],
    [160, "&nbsp;"]
  ])), e.escapeText = r(/[&<>\u00A0]/g, /* @__PURE__ */ new Map([
    [38, "&amp;"],
    [60, "&lt;"],
    [62, "&gt;"],
    [160, "&nbsp;"]
  ]));
})(ra);
var _2 = C && C.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Pt, "__esModule", { value: !0 });
Pt.encodeNonAsciiHTML = Pt.encodeHTML = void 0;
var y2 = _2(zi), qo = ra, A2 = /[\t\n!-,./:-@[-`\f{-}$\x80-\uFFFF]/g;
function v2(e) {
  return Go(A2, e);
}
Pt.encodeHTML = v2;
function x2(e) {
  return Go(qo.xmlReplacer, e);
}
Pt.encodeNonAsciiHTML = x2;
function Go(e, u) {
  for (var t = "", r = 0, a; (a = e.exec(u)) !== null; ) {
    var n = a.index;
    t += u.substring(r, n);
    var i = u.charCodeAt(n), s = y2.default.get(i);
    if (typeof s == "object") {
      if (n + 1 < u.length) {
        var o = u.charCodeAt(n + 1), d = typeof s.n == "number" ? s.n === o ? s.o : void 0 : s.n.get(o);
        if (d !== void 0) {
          t += d, r = e.lastIndex += 1;
          continue;
        }
      }
      s = s.v;
    }
    if (s !== void 0)
      t += s, r = n + 1;
    else {
      var c = (0, qo.getCodePoint)(u, n);
      t += "&#x".concat(c.toString(16), ";"), r = e.lastIndex += +(c !== i);
    }
  }
  return t + u.substr(r);
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.decodeXMLStrict = e.decodeHTML5Strict = e.decodeHTML4Strict = e.decodeHTML5 = e.decodeHTML4 = e.decodeHTMLAttribute = e.decodeHTMLStrict = e.decodeHTML = e.decodeXML = e.DecodingMode = e.EntityDecoder = e.encodeHTML5 = e.encodeHTML4 = e.encodeNonAsciiHTML = e.encodeHTML = e.escapeText = e.escapeAttribute = e.escapeUTF8 = e.escape = e.encodeXML = e.encode = e.decodeStrict = e.decode = e.EncodingMode = e.EntityLevel = void 0;
  var u = ti, t = Pt, r = ra, a;
  (function(f) {
    f[f.XML = 0] = "XML", f[f.HTML = 1] = "HTML";
  })(a = e.EntityLevel || (e.EntityLevel = {}));
  var n;
  (function(f) {
    f[f.UTF8 = 0] = "UTF8", f[f.ASCII = 1] = "ASCII", f[f.Extensive = 2] = "Extensive", f[f.Attribute = 3] = "Attribute", f[f.Text = 4] = "Text";
  })(n = e.EncodingMode || (e.EncodingMode = {}));
  function i(f, m) {
    m === void 0 && (m = a.XML);
    var v = typeof m == "number" ? m : m.level;
    if (v === a.HTML) {
      var L = typeof m == "object" ? m.mode : void 0;
      return (0, u.decodeHTML)(f, L);
    }
    return (0, u.decodeXML)(f);
  }
  e.decode = i;
  function s(f, m) {
    var v;
    m === void 0 && (m = a.XML);
    var L = typeof m == "number" ? { level: m } : m;
    return (v = L.mode) !== null && v !== void 0 || (L.mode = u.DecodingMode.Strict), i(f, L);
  }
  e.decodeStrict = s;
  function o(f, m) {
    m === void 0 && (m = a.XML);
    var v = typeof m == "number" ? { level: m } : m;
    return v.mode === n.UTF8 ? (0, r.escapeUTF8)(f) : v.mode === n.Attribute ? (0, r.escapeAttribute)(f) : v.mode === n.Text ? (0, r.escapeText)(f) : v.level === a.HTML ? v.mode === n.ASCII ? (0, t.encodeNonAsciiHTML)(f) : (0, t.encodeHTML)(f) : (0, r.encodeXML)(f);
  }
  e.encode = o;
  var d = ra;
  Object.defineProperty(e, "encodeXML", { enumerable: !0, get: function() {
    return d.encodeXML;
  } }), Object.defineProperty(e, "escape", { enumerable: !0, get: function() {
    return d.escape;
  } }), Object.defineProperty(e, "escapeUTF8", { enumerable: !0, get: function() {
    return d.escapeUTF8;
  } }), Object.defineProperty(e, "escapeAttribute", { enumerable: !0, get: function() {
    return d.escapeAttribute;
  } }), Object.defineProperty(e, "escapeText", { enumerable: !0, get: function() {
    return d.escapeText;
  } });
  var c = Pt;
  Object.defineProperty(e, "encodeHTML", { enumerable: !0, get: function() {
    return c.encodeHTML;
  } }), Object.defineProperty(e, "encodeNonAsciiHTML", { enumerable: !0, get: function() {
    return c.encodeNonAsciiHTML;
  } }), Object.defineProperty(e, "encodeHTML4", { enumerable: !0, get: function() {
    return c.encodeHTML;
  } }), Object.defineProperty(e, "encodeHTML5", { enumerable: !0, get: function() {
    return c.encodeHTML;
  } });
  var E = ti;
  Object.defineProperty(e, "EntityDecoder", { enumerable: !0, get: function() {
    return E.EntityDecoder;
  } }), Object.defineProperty(e, "DecodingMode", { enumerable: !0, get: function() {
    return E.DecodingMode;
  } }), Object.defineProperty(e, "decodeXML", { enumerable: !0, get: function() {
    return E.decodeXML;
  } }), Object.defineProperty(e, "decodeHTML", { enumerable: !0, get: function() {
    return E.decodeHTML;
  } }), Object.defineProperty(e, "decodeHTMLStrict", { enumerable: !0, get: function() {
    return E.decodeHTMLStrict;
  } }), Object.defineProperty(e, "decodeHTMLAttribute", { enumerable: !0, get: function() {
    return E.decodeHTMLAttribute;
  } }), Object.defineProperty(e, "decodeHTML4", { enumerable: !0, get: function() {
    return E.decodeHTML;
  } }), Object.defineProperty(e, "decodeHTML5", { enumerable: !0, get: function() {
    return E.decodeHTML;
  } }), Object.defineProperty(e, "decodeHTML4Strict", { enumerable: !0, get: function() {
    return E.decodeHTMLStrict;
  } }), Object.defineProperty(e, "decodeHTML5Strict", { enumerable: !0, get: function() {
    return E.decodeHTMLStrict;
  } }), Object.defineProperty(e, "decodeXMLStrict", { enumerable: !0, get: function() {
    return E.decodeXML;
  } });
})(Fo);
var h0 = {};
Object.defineProperty(h0, "__esModule", { value: !0 });
h0.attributeNames = h0.elementNames = void 0;
h0.elementNames = new Map([
  "altGlyph",
  "altGlyphDef",
  "altGlyphItem",
  "animateColor",
  "animateMotion",
  "animateTransform",
  "clipPath",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDistantLight",
  "feDropShadow",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence",
  "foreignObject",
  "glyphRef",
  "linearGradient",
  "radialGradient",
  "textPath"
].map(function(e) {
  return [e.toLowerCase(), e];
}));
h0.attributeNames = new Map([
  "definitionURL",
  "attributeName",
  "attributeType",
  "baseFrequency",
  "baseProfile",
  "calcMode",
  "clipPathUnits",
  "diffuseConstant",
  "edgeMode",
  "filterUnits",
  "glyphRef",
  "gradientTransform",
  "gradientUnits",
  "kernelMatrix",
  "kernelUnitLength",
  "keyPoints",
  "keySplines",
  "keyTimes",
  "lengthAdjust",
  "limitingConeAngle",
  "markerHeight",
  "markerUnits",
  "markerWidth",
  "maskContentUnits",
  "maskUnits",
  "numOctaves",
  "pathLength",
  "patternContentUnits",
  "patternTransform",
  "patternUnits",
  "pointsAtX",
  "pointsAtY",
  "pointsAtZ",
  "preserveAlpha",
  "preserveAspectRatio",
  "primitiveUnits",
  "refX",
  "refY",
  "repeatCount",
  "repeatDur",
  "requiredExtensions",
  "requiredFeatures",
  "specularConstant",
  "specularExponent",
  "spreadMethod",
  "startOffset",
  "stdDeviation",
  "stitchTiles",
  "surfaceScale",
  "systemLanguage",
  "tableValues",
  "targetX",
  "targetY",
  "textLength",
  "viewBox",
  "viewTarget",
  "xChannelSelector",
  "yChannelSelector",
  "zoomAndPan"
].map(function(e) {
  return [e.toLowerCase(), e];
}));
var Jt = C && C.__assign || function() {
  return Jt = Object.assign || function(e) {
    for (var u, t = 1, r = arguments.length; t < r; t++) {
      u = arguments[t];
      for (var a in u)
        Object.prototype.hasOwnProperty.call(u, a) && (e[a] = u[a]);
    }
    return e;
  }, Jt.apply(this, arguments);
}, N2 = C && C.__createBinding || (Object.create ? function(e, u, t, r) {
  r === void 0 && (r = t);
  var a = Object.getOwnPropertyDescriptor(u, t);
  (!a || ("get" in a ? !u.__esModule : a.writable || a.configurable)) && (a = { enumerable: !0, get: function() {
    return u[t];
  } }), Object.defineProperty(e, r, a);
} : function(e, u, t, r) {
  r === void 0 && (r = t), e[r] = u[t];
}), I2 = C && C.__setModuleDefault || (Object.create ? function(e, u) {
  Object.defineProperty(e, "default", { enumerable: !0, value: u });
} : function(e, u) {
  e.default = u;
}), D2 = C && C.__importStar || function(e) {
  if (e && e.__esModule)
    return e;
  var u = {};
  if (e != null)
    for (var t in e)
      t !== "default" && Object.prototype.hasOwnProperty.call(e, t) && N2(u, e, t);
  return I2(u, e), u;
};
Object.defineProperty(C0, "__esModule", { value: !0 });
C0.render = void 0;
var Ju = D2(Be), aa = Fo, jo = h0, C2 = /* @__PURE__ */ new Set([
  "style",
  "script",
  "xmp",
  "iframe",
  "noembed",
  "noframes",
  "plaintext",
  "noscript"
]);
function S2(e) {
  return e.replace(/"/g, "&quot;");
}
function O2(e, u) {
  var t;
  if (e) {
    var r = ((t = u.encodeEntities) !== null && t !== void 0 ? t : u.decodeEntities) === !1 ? S2 : u.xmlMode || u.encodeEntities !== "utf8" ? aa.encodeXML : aa.escapeAttribute;
    return Object.keys(e).map(function(a) {
      var n, i, s = (n = e[a]) !== null && n !== void 0 ? n : "";
      return u.xmlMode === "foreign" && (a = (i = jo.attributeNames.get(a)) !== null && i !== void 0 ? i : a), !u.emptyAttrs && !u.xmlMode && s === "" ? a : "".concat(a, '="').concat(r(s), '"');
    }).join(" ");
  }
}
var Kc = /* @__PURE__ */ new Set([
  "area",
  "base",
  "basefont",
  "br",
  "col",
  "command",
  "embed",
  "frame",
  "hr",
  "img",
  "input",
  "isindex",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
]);
function Ia(e, u) {
  u === void 0 && (u = {});
  for (var t = ("length" in e) ? e : [e], r = "", a = 0; a < t.length; a++)
    r += L2(t[a], u);
  return r;
}
C0.render = Ia;
C0.default = Ia;
function L2(e, u) {
  switch (e.type) {
    case Ju.Root:
      return Ia(e.children, u);
    case Ju.Doctype:
    case Ju.Directive:
      return M2(e);
    case Ju.Comment:
      return U2(e);
    case Ju.CDATA:
      return B2(e);
    case Ju.Script:
    case Ju.Style:
    case Ju.Tag:
      return R2(e, u);
    case Ju.Text:
      return k2(e, u);
  }
}
var P2 = /* @__PURE__ */ new Set([
  "mi",
  "mo",
  "mn",
  "ms",
  "mtext",
  "annotation-xml",
  "foreignObject",
  "desc",
  "title"
]), w2 = /* @__PURE__ */ new Set(["svg", "math"]);
function R2(e, u) {
  var t;
  u.xmlMode === "foreign" && (e.name = (t = jo.elementNames.get(e.name)) !== null && t !== void 0 ? t : e.name, e.parent && P2.has(e.parent.name) && (u = Jt(Jt({}, u), { xmlMode: !1 }))), !u.xmlMode && w2.has(e.name) && (u = Jt(Jt({}, u), { xmlMode: "foreign" }));
  var r = "<".concat(e.name), a = O2(e.attribs, u);
  return a && (r += " ".concat(a)), e.children.length === 0 && (u.xmlMode ? (
    // In XML mode or foreign mode, and user hasn't explicitly turned off self-closing tags
    u.selfClosingTags !== !1
  ) : (
    // User explicitly asked for self-closing tags, even in HTML mode
    u.selfClosingTags && Kc.has(e.name)
  )) ? (u.xmlMode || (r += " "), r += "/>") : (r += ">", e.children.length > 0 && (r += Ia(e.children, u)), (u.xmlMode || !Kc.has(e.name)) && (r += "</".concat(e.name, ">"))), r;
}
function M2(e) {
  return "<".concat(e.data, ">");
}
function k2(e, u) {
  var t, r = e.data || "";
  return ((t = u.encodeEntities) !== null && t !== void 0 ? t : u.decodeEntities) !== !1 && !(!u.xmlMode && e.parent && C2.has(e.parent.name)) && (r = u.xmlMode || u.encodeEntities !== "utf8" ? (0, aa.encodeXML)(r) : (0, aa.escapeText)(r)), r;
}
function B2(e) {
  return "<![CDATA[".concat(e.children[0].data, "]]>");
}
function U2(e) {
  return "<!--".concat(e.data, "-->");
}
var H2 = C && C.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Au, "__esModule", { value: !0 });
Au.innerText = Au.textContent = Au.getText = Au.getInnerHTML = Au.getOuterHTML = void 0;
var Vu = Ou, F2 = H2(C0), q2 = Be;
function $o(e, u) {
  return (0, F2.default)(e, u);
}
Au.getOuterHTML = $o;
function G2(e, u) {
  return (0, Vu.hasChildren)(e) ? e.children.map(function(t) {
    return $o(t, u);
  }).join("") : "";
}
Au.getInnerHTML = G2;
function Vr(e) {
  return Array.isArray(e) ? e.map(Vr).join("") : (0, Vu.isTag)(e) ? e.name === "br" ? `
` : Vr(e.children) : (0, Vu.isCDATA)(e) ? Vr(e.children) : (0, Vu.isText)(e) ? e.data : "";
}
Au.getText = Vr;
function ai(e) {
  return Array.isArray(e) ? e.map(ai).join("") : (0, Vu.hasChildren)(e) && !(0, Vu.isComment)(e) ? ai(e.children) : (0, Vu.isText)(e) ? e.data : "";
}
Au.textContent = ai;
function ni(e) {
  return Array.isArray(e) ? e.map(ni).join("") : (0, Vu.hasChildren)(e) && (e.type === q2.ElementType.Tag || (0, Vu.isCDATA)(e)) ? ni(e.children) : (0, Vu.isText)(e) ? e.data : "";
}
Au.innerText = ni;
var Ge = {};
Object.defineProperty(Ge, "__esModule", { value: !0 });
Ge.prevElementSibling = Ge.nextElementSibling = Ge.getName = Ge.hasAttrib = Ge.getAttributeValue = Ge.getSiblings = Ge.getParent = Ge.getChildren = void 0;
var Qi = Ou;
function Vo(e) {
  return (0, Qi.hasChildren)(e) ? e.children : [];
}
Ge.getChildren = Vo;
function Yo(e) {
  return e.parent || null;
}
Ge.getParent = Yo;
function j2(e) {
  var u, t, r = Yo(e);
  if (r != null)
    return Vo(r);
  for (var a = [e], n = e.prev, i = e.next; n != null; )
    a.unshift(n), u = n, n = u.prev;
  for (; i != null; )
    a.push(i), t = i, i = t.next;
  return a;
}
Ge.getSiblings = j2;
function $2(e, u) {
  var t;
  return (t = e.attribs) === null || t === void 0 ? void 0 : t[u];
}
Ge.getAttributeValue = $2;
function V2(e, u) {
  return e.attribs != null && Object.prototype.hasOwnProperty.call(e.attribs, u) && e.attribs[u] != null;
}
Ge.hasAttrib = V2;
function Y2(e) {
  return e.name;
}
Ge.getName = Y2;
function W2(e) {
  for (var u, t = e.next; t !== null && !(0, Qi.isTag)(t); )
    u = t, t = u.next;
  return t;
}
Ge.nextElementSibling = W2;
function X2(e) {
  for (var u, t = e.prev; t !== null && !(0, Qi.isTag)(t); )
    u = t, t = u.prev;
  return t;
}
Ge.prevElementSibling = X2;
var ou = {};
Object.defineProperty(ou, "__esModule", { value: !0 });
ou.prepend = ou.prependChild = ou.append = ou.appendChild = ou.replaceElement = ou.removeElement = void 0;
function sr(e) {
  if (e.prev && (e.prev.next = e.next), e.next && (e.next.prev = e.prev), e.parent) {
    var u = e.parent.children, t = u.lastIndexOf(e);
    t >= 0 && u.splice(t, 1);
  }
  e.next = null, e.prev = null, e.parent = null;
}
ou.removeElement = sr;
function z2(e, u) {
  var t = u.prev = e.prev;
  t && (t.next = u);
  var r = u.next = e.next;
  r && (r.prev = u);
  var a = u.parent = e.parent;
  if (a) {
    var n = a.children;
    n[n.lastIndexOf(e)] = u, e.parent = null;
  }
}
ou.replaceElement = z2;
function Q2(e, u) {
  if (sr(u), u.next = null, u.parent = e, e.children.push(u) > 1) {
    var t = e.children[e.children.length - 2];
    t.next = u, u.prev = t;
  } else
    u.prev = null;
}
ou.appendChild = Q2;
function K2(e, u) {
  sr(u);
  var t = e.parent, r = e.next;
  if (u.next = r, u.prev = e, e.next = u, u.parent = t, r) {
    if (r.prev = u, t) {
      var a = t.children;
      a.splice(a.lastIndexOf(r), 0, u);
    }
  } else
    t && t.children.push(u);
}
ou.append = K2;
function J2(e, u) {
  if (sr(u), u.parent = e, u.prev = null, e.children.unshift(u) !== 1) {
    var t = e.children[1];
    t.prev = u, u.next = t;
  } else
    u.next = null;
}
ou.prependChild = J2;
function Z2(e, u) {
  sr(u);
  var t = e.parent;
  if (t) {
    var r = t.children;
    r.splice(r.indexOf(e), 0, u);
  }
  e.prev && (e.prev.next = u), u.parent = t, u.prev = e.prev, u.next = e, e.prev = u;
}
ou.prepend = Z2;
var Ke = {};
Object.defineProperty(Ke, "__esModule", { value: !0 });
Ke.findAll = Ke.existsOne = Ke.findOne = Ke.findOneChild = Ke.find = Ke.filter = void 0;
var Da = Ou;
function eb(e, u, t, r) {
  return t === void 0 && (t = !0), r === void 0 && (r = 1 / 0), Wo(e, Array.isArray(u) ? u : [u], t, r);
}
Ke.filter = eb;
function Wo(e, u, t, r) {
  for (var a = [], n = [u], i = [0]; ; ) {
    if (i[0] >= n[0].length) {
      if (i.length === 1)
        return a;
      n.shift(), i.shift();
      continue;
    }
    var s = n[0][i[0]++];
    if (e(s) && (a.push(s), --r <= 0))
      return a;
    t && (0, Da.hasChildren)(s) && s.children.length > 0 && (i.unshift(0), n.unshift(s.children));
  }
}
Ke.find = Wo;
function ub(e, u) {
  return u.find(e);
}
Ke.findOneChild = ub;
function Xo(e, u, t) {
  t === void 0 && (t = !0);
  for (var r = null, a = 0; a < u.length && !r; a++) {
    var n = u[a];
    if ((0, Da.isTag)(n))
      e(n) ? r = n : t && n.children.length > 0 && (r = Xo(e, n.children, !0));
    else
      continue;
  }
  return r;
}
Ke.findOne = Xo;
function zo(e, u) {
  return u.some(function(t) {
    return (0, Da.isTag)(t) && (e(t) || zo(e, t.children));
  });
}
Ke.existsOne = zo;
function tb(e, u) {
  for (var t = [], r = [u], a = [0]; ; ) {
    if (a[0] >= r[0].length) {
      if (r.length === 1)
        return t;
      r.shift(), a.shift();
      continue;
    }
    var n = r[0][a[0]++];
    (0, Da.isTag)(n) && (e(n) && t.push(n), n.children.length > 0 && (a.unshift(0), r.unshift(n.children)));
  }
}
Ke.findAll = tb;
var vu = {};
Object.defineProperty(vu, "__esModule", { value: !0 });
vu.getElementsByTagType = vu.getElementsByTagName = vu.getElementById = vu.getElements = vu.testElement = void 0;
var It = Ou, Ca = Ke, na = {
  tag_name: function(e) {
    return typeof e == "function" ? function(u) {
      return (0, It.isTag)(u) && e(u.name);
    } : e === "*" ? It.isTag : function(u) {
      return (0, It.isTag)(u) && u.name === e;
    };
  },
  tag_type: function(e) {
    return typeof e == "function" ? function(u) {
      return e(u.type);
    } : function(u) {
      return u.type === e;
    };
  },
  tag_contains: function(e) {
    return typeof e == "function" ? function(u) {
      return (0, It.isText)(u) && e(u.data);
    } : function(u) {
      return (0, It.isText)(u) && u.data === e;
    };
  }
};
function Qo(e, u) {
  return typeof u == "function" ? function(t) {
    return (0, It.isTag)(t) && u(t.attribs[e]);
  } : function(t) {
    return (0, It.isTag)(t) && t.attribs[e] === u;
  };
}
function rb(e, u) {
  return function(t) {
    return e(t) || u(t);
  };
}
function Ko(e) {
  var u = Object.keys(e).map(function(t) {
    var r = e[t];
    return Object.prototype.hasOwnProperty.call(na, t) ? na[t](r) : Qo(t, r);
  });
  return u.length === 0 ? null : u.reduce(rb);
}
function ab(e, u) {
  var t = Ko(e);
  return t ? t(u) : !0;
}
vu.testElement = ab;
function nb(e, u, t, r) {
  r === void 0 && (r = 1 / 0);
  var a = Ko(e);
  return a ? (0, Ca.filter)(a, u, t, r) : [];
}
vu.getElements = nb;
function ib(e, u, t) {
  return t === void 0 && (t = !0), Array.isArray(u) || (u = [u]), (0, Ca.findOne)(Qo("id", e), u, t);
}
vu.getElementById = ib;
function cb(e, u, t, r) {
  return t === void 0 && (t = !0), r === void 0 && (r = 1 / 0), (0, Ca.filter)(na.tag_name(e), u, t, r);
}
vu.getElementsByTagName = cb;
function sb(e, u, t, r) {
  return t === void 0 && (t = !0), r === void 0 && (r = 1 / 0), (0, Ca.filter)(na.tag_type(e), u, t, r);
}
vu.getElementsByTagType = sb;
var Jo = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.uniqueSort = e.compareDocumentPosition = e.DocumentPosition = e.removeSubsets = void 0;
  var u = Ou;
  function t(i) {
    for (var s = i.length; --s >= 0; ) {
      var o = i[s];
      if (s > 0 && i.lastIndexOf(o, s - 1) >= 0) {
        i.splice(s, 1);
        continue;
      }
      for (var d = o.parent; d; d = d.parent)
        if (i.includes(d)) {
          i.splice(s, 1);
          break;
        }
    }
    return i;
  }
  e.removeSubsets = t;
  var r;
  (function(i) {
    i[i.DISCONNECTED = 1] = "DISCONNECTED", i[i.PRECEDING = 2] = "PRECEDING", i[i.FOLLOWING = 4] = "FOLLOWING", i[i.CONTAINS = 8] = "CONTAINS", i[i.CONTAINED_BY = 16] = "CONTAINED_BY";
  })(r = e.DocumentPosition || (e.DocumentPosition = {}));
  function a(i, s) {
    var o = [], d = [];
    if (i === s)
      return 0;
    for (var c = (0, u.hasChildren)(i) ? i : i.parent; c; )
      o.unshift(c), c = c.parent;
    for (c = (0, u.hasChildren)(s) ? s : s.parent; c; )
      d.unshift(c), c = c.parent;
    for (var E = Math.min(o.length, d.length), f = 0; f < E && o[f] === d[f]; )
      f++;
    if (f === 0)
      return r.DISCONNECTED;
    var m = o[f - 1], v = m.children, L = o[f], N = d[f];
    return v.indexOf(L) > v.indexOf(N) ? m === s ? r.FOLLOWING | r.CONTAINED_BY : r.FOLLOWING : m === i ? r.PRECEDING | r.CONTAINS : r.PRECEDING;
  }
  e.compareDocumentPosition = a;
  function n(i) {
    return i = i.filter(function(s, o, d) {
      return !d.includes(s, o + 1);
    }), i.sort(function(s, o) {
      var d = a(s, o);
      return d & r.PRECEDING ? -1 : d & r.FOLLOWING ? 1 : 0;
    }), i;
  }
  e.uniqueSort = n;
})(Jo);
var Sa = {};
Object.defineProperty(Sa, "__esModule", { value: !0 });
Sa.getFeed = void 0;
var ob = Au, or = vu;
function db(e) {
  var u = ia(pb, e);
  return u ? u.name === "feed" ? lb(u) : fb(u) : null;
}
Sa.getFeed = db;
function lb(e) {
  var u, t = e.children, r = {
    type: "atom",
    items: (0, or.getElementsByTagName)("entry", t).map(function(i) {
      var s, o = i.children, d = { media: Zo(o) };
      nu(d, "id", "id", o), nu(d, "title", "title", o);
      var c = (s = ia("link", o)) === null || s === void 0 ? void 0 : s.attribs.href;
      c && (d.link = c);
      var E = lt("summary", o) || lt("content", o);
      E && (d.description = E);
      var f = lt("updated", o);
      return f && (d.pubDate = new Date(f)), d;
    })
  };
  nu(r, "id", "id", t), nu(r, "title", "title", t);
  var a = (u = ia("link", t)) === null || u === void 0 ? void 0 : u.attribs.href;
  a && (r.link = a), nu(r, "description", "subtitle", t);
  var n = lt("updated", t);
  return n && (r.updated = new Date(n)), nu(r, "author", "email", t, !0), r;
}
function fb(e) {
  var u, t, r = (t = (u = ia("channel", e.children)) === null || u === void 0 ? void 0 : u.children) !== null && t !== void 0 ? t : [], a = {
    type: e.name.substr(0, 3),
    id: "",
    items: (0, or.getElementsByTagName)("item", e.children).map(function(i) {
      var s = i.children, o = { media: Zo(s) };
      nu(o, "id", "guid", s), nu(o, "title", "title", s), nu(o, "link", "link", s), nu(o, "description", "description", s);
      var d = lt("pubDate", s) || lt("dc:date", s);
      return d && (o.pubDate = new Date(d)), o;
    })
  };
  nu(a, "title", "title", r), nu(a, "link", "link", r), nu(a, "description", "description", r);
  var n = lt("lastBuildDate", r);
  return n && (a.updated = new Date(n)), nu(a, "author", "managingEditor", r, !0), a;
}
var bb = ["url", "type", "lang"], hb = [
  "fileSize",
  "bitrate",
  "framerate",
  "samplingrate",
  "channels",
  "duration",
  "height",
  "width"
];
function Zo(e) {
  return (0, or.getElementsByTagName)("media:content", e).map(function(u) {
    for (var t = u.attribs, r = {
      medium: t.medium,
      isDefault: !!t.isDefault
    }, a = 0, n = bb; a < n.length; a++) {
      var i = n[a];
      t[i] && (r[i] = t[i]);
    }
    for (var s = 0, o = hb; s < o.length; s++) {
      var i = o[s];
      t[i] && (r[i] = parseInt(t[i], 10));
    }
    return t.expression && (r.expression = t.expression), r;
  });
}
function ia(e, u) {
  return (0, or.getElementsByTagName)(e, u, !0, 1)[0];
}
function lt(e, u, t) {
  return t === void 0 && (t = !1), (0, ob.textContent)((0, or.getElementsByTagName)(e, u, t, 1)).trim();
}
function nu(e, u, t, r, a) {
  a === void 0 && (a = !1);
  var n = lt(t, r, a);
  n && (e[u] = n);
}
function pb(e) {
  return e === "rss" || e === "feed" || e === "rdf:RDF";
}
(function(e) {
  var u = C && C.__createBinding || (Object.create ? function(a, n, i, s) {
    s === void 0 && (s = i);
    var o = Object.getOwnPropertyDescriptor(n, i);
    (!o || ("get" in o ? !n.__esModule : o.writable || o.configurable)) && (o = { enumerable: !0, get: function() {
      return n[i];
    } }), Object.defineProperty(a, s, o);
  } : function(a, n, i, s) {
    s === void 0 && (s = i), a[s] = n[i];
  }), t = C && C.__exportStar || function(a, n) {
    for (var i in a)
      i !== "default" && !Object.prototype.hasOwnProperty.call(n, i) && u(n, a, i);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.hasChildren = e.isDocument = e.isComment = e.isText = e.isCDATA = e.isTag = void 0, t(Au, e), t(Ge, e), t(ou, e), t(Ke, e), t(vu, e), t(Jo, e), t(Sa, e);
  var r = Ou;
  Object.defineProperty(e, "isTag", { enumerable: !0, get: function() {
    return r.isTag;
  } }), Object.defineProperty(e, "isCDATA", { enumerable: !0, get: function() {
    return r.isCDATA;
  } }), Object.defineProperty(e, "isText", { enumerable: !0, get: function() {
    return r.isText;
  } }), Object.defineProperty(e, "isComment", { enumerable: !0, get: function() {
    return r.isComment;
  } }), Object.defineProperty(e, "isDocument", { enumerable: !0, get: function() {
    return r.isDocument;
  } }), Object.defineProperty(e, "hasChildren", { enumerable: !0, get: function() {
    return r.hasChildren;
  } });
})(D0);
var Lt = C && C.__assign || function() {
  return Lt = Object.assign || function(e) {
    for (var u, t = 1, r = arguments.length; t < r; t++) {
      u = arguments[t];
      for (var a in u)
        Object.prototype.hasOwnProperty.call(u, a) && (e[a] = u[a]);
    }
    return e;
  }, Lt.apply(this, arguments);
}, mb = C && C.__createBinding || (Object.create ? function(e, u, t, r) {
  r === void 0 && (r = t);
  var a = Object.getOwnPropertyDescriptor(u, t);
  (!a || ("get" in a ? !u.__esModule : a.writable || a.configurable)) && (a = { enumerable: !0, get: function() {
    return u[t];
  } }), Object.defineProperty(e, r, a);
} : function(e, u, t, r) {
  r === void 0 && (r = t), e[r] = u[t];
}), gb = C && C.__setModuleDefault || (Object.create ? function(e, u) {
  Object.defineProperty(e, "default", { enumerable: !0, value: u });
} : function(e, u) {
  e.default = u;
}), Eb = C && C.__importStar || function(e) {
  if (e && e.__esModule)
    return e;
  var u = {};
  if (e != null)
    for (var t in e)
      t !== "default" && Object.prototype.hasOwnProperty.call(e, t) && mb(u, e, t);
  return gb(u, e), u;
};
Object.defineProperty(Le, "__esModule", { value: !0 });
Le.merge = Le.contains = Le.root = Le.parseHTML = Le.text = Le.xml = Le.html = void 0;
var Tb = D0, ii = Eb(I0);
function ed(e, u, t) {
  return e ? e(u ?? e._root.children, null, void 0, t).toString() : "";
}
function _b(e, u) {
  return !u && typeof e == "object" && e != null && !("length" in e) && !("type" in e);
}
function yb(e, u) {
  var t = _b(e) ? (u = e, void 0) : e, r = Lt(Lt(Lt({}, ii.default), this === null || this === void 0 ? void 0 : this._options), (0, ii.flatten)(u ?? {}));
  return ed(this, t, r);
}
Le.html = yb;
function Ab(e) {
  var u = Lt(Lt({}, this._options), { xmlMode: !0 });
  return ed(this, e, u);
}
Le.xml = Ab;
function vb(e) {
  for (var u = e || (this ? this.root() : []), t = "", r = 0; r < u.length; r++)
    t += (0, Tb.textContent)(u[r]);
  return t;
}
Le.text = vb;
function xb(e, u, t) {
  if (t === void 0 && (t = typeof u == "boolean" ? u : !1), !e || typeof e != "string")
    return null;
  typeof u == "boolean" && (t = u);
  var r = this.load(e, ii.default, !1);
  return t || r("script").remove(), r.root()[0].children.slice();
}
Le.parseHTML = xb;
function Nb() {
  return this(this._root);
}
Le.root = Nb;
function Ib(e, u) {
  if (u === e)
    return !1;
  for (var t = u; t && t !== t.parent; )
    if (t = t.parent, t === e)
      return !0;
  return !1;
}
Le.contains = Ib;
function Db(e, u) {
  if (!(!Jc(e) || !Jc(u))) {
    for (var t = e.length, r = +u.length, a = 0; a < r; a++)
      e[t++] = u[a];
    return e.length = t, e;
  }
}
Le.merge = Db;
function Jc(e) {
  if (Array.isArray(e))
    return !0;
  if (typeof e != "object" || !Object.prototype.hasOwnProperty.call(e, "length") || typeof e.length != "number" || e.length < 0)
    return !1;
  for (var u = 0; u < e.length; u++)
    if (!(u in e))
      return !1;
  return !0;
}
var Oa = {}, ke = {}, Ht = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.isHtml = e.cloneDom = e.domEach = e.cssCase = e.camelCase = e.isCheerio = e.isTag = void 0;
  var u = Ou, t = Ou;
  Object.defineProperty(e, "isTag", { enumerable: !0, get: function() {
    return t.isTag;
  } });
  function r(c) {
    return c.cheerio != null;
  }
  e.isCheerio = r;
  function a(c) {
    return c.replace(/[_.-](\w|$)/g, function(E, f) {
      return f.toUpperCase();
    });
  }
  e.camelCase = a;
  function n(c) {
    return c.replace(/[A-Z]/g, "-$&").toLowerCase();
  }
  e.cssCase = n;
  function i(c, E) {
    for (var f = c.length, m = 0; m < f; m++)
      E(c[m], m);
    return c;
  }
  e.domEach = i;
  function s(c) {
    var E = "length" in c ? Array.prototype.map.call(c, function(m) {
      return (0, u.cloneNode)(m, !0);
    }) : [(0, u.cloneNode)(c, !0)], f = new u.Document(E);
    return E.forEach(function(m) {
      m.parent = f;
    }), E;
  }
  e.cloneDom = s;
  var o;
  (function(c) {
    c[c.LowerA = 97] = "LowerA", c[c.LowerZ = 122] = "LowerZ", c[c.UpperA = 65] = "UpperA", c[c.UpperZ = 90] = "UpperZ", c[c.Exclamation = 33] = "Exclamation";
  })(o || (o = {}));
  function d(c) {
    var E = c.indexOf("<");
    if (E < 0 || E > c.length - 3)
      return !1;
    var f = c.charCodeAt(E + 1);
    return (f >= o.LowerA && f <= o.LowerZ || f >= o.UpperA && f <= o.UpperZ || f === o.Exclamation) && c.includes(">", E + 2);
  }
  e.isHtml = d;
})(Ht);
Object.defineProperty(ke, "__esModule", { value: !0 });
ke.toggleClass = ke.removeClass = ke.addClass = ke.hasClass = ke.removeAttr = ke.val = ke.data = ke.prop = ke.attr = void 0;
var ud = Le, he = Ht, Zc = D0, s0 = Object.prototype.hasOwnProperty, Z0 = /\s+/, An = "data-", es = {
  null: null,
  true: !0,
  false: !1
}, Ki = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, Cb = /^{[^]*}$|^\[[^]*]$/;
function ca(e, u, t) {
  var r;
  if (!(!e || !(0, he.isTag)(e))) {
    if ((r = e.attribs) !== null && r !== void 0 || (e.attribs = {}), !u)
      return e.attribs;
    if (s0.call(e.attribs, u))
      return !t && Ki.test(u) ? u : e.attribs[u];
    if (e.name === "option" && u === "value")
      return (0, ud.text)(e.children);
    if (e.name === "input" && (e.attribs.type === "radio" || e.attribs.type === "checkbox") && u === "value")
      return "on";
  }
}
function o0(e, u, t) {
  t === null ? td(e, u) : e.attribs[u] = "".concat(t);
}
function Sb(e, u) {
  if (typeof e == "object" || u !== void 0) {
    if (typeof u == "function") {
      if (typeof e != "string")
        throw new Error("Bad combination of arguments.");
      return (0, he.domEach)(this, function(t, r) {
        (0, he.isTag)(t) && o0(t, e, u.call(t, r, t.attribs[e]));
      });
    }
    return (0, he.domEach)(this, function(t) {
      (0, he.isTag)(t) && (typeof e == "object" ? Object.keys(e).forEach(function(r) {
        var a = e[r];
        o0(t, r, a);
      }) : o0(t, e, u));
    });
  }
  return arguments.length > 1 ? this : ca(this[0], e, this.options.xmlMode);
}
ke.attr = Sb;
function us(e, u, t) {
  return u in e ? (
    // @ts-expect-error TS doesn't like us accessing the value directly here.
    e[u]
  ) : !t && Ki.test(u) ? ca(e, u, !1) !== void 0 : ca(e, u, t);
}
function vn(e, u, t, r) {
  u in e ? e[u] = t : o0(e, u, !r && Ki.test(u) ? t ? "" : null : "".concat(t));
}
function Ob(e, u) {
  var t = this, r;
  if (typeof e == "string" && u === void 0) {
    var a = this[0];
    if (!a || !(0, he.isTag)(a))
      return;
    switch (e) {
      case "style": {
        var n = this.css(), i = Object.keys(n);
        return i.forEach(function(o, d) {
          n[d] = o;
        }), n.length = i.length, n;
      }
      case "tagName":
      case "nodeName":
        return a.name.toUpperCase();
      case "href":
      case "src": {
        var s = (r = a.attribs) === null || r === void 0 ? void 0 : r[e];
        return typeof URL < "u" && (e === "href" && (a.tagName === "a" || a.name === "link") || e === "src" && (a.tagName === "img" || a.tagName === "iframe" || a.tagName === "audio" || a.tagName === "video" || a.tagName === "source")) && s !== void 0 && this.options.baseURI ? new URL(s, this.options.baseURI).href : s;
      }
      case "innerText":
        return (0, Zc.innerText)(a);
      case "textContent":
        return (0, Zc.textContent)(a);
      case "outerHTML":
        return this.clone().wrap("<container />").parent().html();
      case "innerHTML":
        return this.html();
      default:
        return us(a, e, this.options.xmlMode);
    }
  }
  if (typeof e == "object" || u !== void 0) {
    if (typeof u == "function") {
      if (typeof e == "object")
        throw new Error("Bad combination of arguments.");
      return (0, he.domEach)(this, function(o, d) {
        (0, he.isTag)(o) && vn(o, e, u.call(o, d, us(o, e, t.options.xmlMode)), t.options.xmlMode);
      });
    }
    return (0, he.domEach)(this, function(o) {
      (0, he.isTag)(o) && (typeof e == "object" ? Object.keys(e).forEach(function(d) {
        var c = e[d];
        vn(o, d, c, t.options.xmlMode);
      }) : vn(o, e, u, t.options.xmlMode));
    });
  }
}
ke.prop = Ob;
function ts(e, u, t) {
  var r, a = e;
  (r = a.data) !== null && r !== void 0 || (a.data = {}), typeof u == "object" ? Object.assign(a.data, u) : typeof u == "string" && t !== void 0 && (a.data[u] = t);
}
function rs(e, u) {
  var t, r, a;
  u == null ? (t = Object.keys(e.attribs).filter(function(o) {
    return o.startsWith(An);
  }), r = t.map(function(o) {
    return (0, he.camelCase)(o.slice(An.length));
  })) : (t = [An + (0, he.cssCase)(u)], r = [u]);
  for (var n = 0; n < t.length; ++n) {
    var i = t[n], s = r[n];
    if (s0.call(e.attribs, i) && !s0.call(e.data, s)) {
      if (a = e.attribs[i], s0.call(es, a))
        a = es[a];
      else if (a === String(Number(a)))
        a = Number(a);
      else if (Cb.test(a))
        try {
          a = JSON.parse(a);
        } catch {
        }
      e.data[s] = a;
    }
  }
  return u == null ? e.data : a;
}
function Lb(e, u) {
  var t, r = this[0];
  if (!(!r || !(0, he.isTag)(r))) {
    var a = r;
    return (t = a.data) !== null && t !== void 0 || (a.data = {}), e ? typeof e == "object" || u !== void 0 ? ((0, he.domEach)(this, function(n) {
      (0, he.isTag)(n) && (typeof e == "object" ? ts(n, e) : ts(n, e, u));
    }), this) : s0.call(a.data, e) ? a.data[e] : rs(a, e) : rs(a);
  }
}
ke.data = Lb;
function Pb(e) {
  var u = arguments.length === 0, t = this[0];
  if (!t || !(0, he.isTag)(t))
    return u ? void 0 : this;
  switch (t.name) {
    case "textarea":
      return this.text(e);
    case "select": {
      var r = this.find("option:selected");
      if (!u) {
        if (this.attr("multiple") == null && typeof e == "object")
          return this;
        this.find("option").removeAttr("selected");
        for (var a = typeof e != "object" ? [e] : e, n = 0; n < a.length; n++)
          this.find('option[value="'.concat(a[n], '"]')).attr("selected", "");
        return this;
      }
      return this.attr("multiple") ? r.toArray().map(function(i) {
        return (0, ud.text)(i.children);
      }) : r.attr("value");
    }
    case "input":
    case "option":
      return u ? this.attr("value") : this.attr("value", e);
  }
}
ke.val = Pb;
function td(e, u) {
  !e.attribs || !s0.call(e.attribs, u) || delete e.attribs[u];
}
function sa(e) {
  return e ? e.trim().split(Z0) : [];
}
function wb(e) {
  for (var u = sa(e), t = function(n) {
    (0, he.domEach)(r, function(i) {
      (0, he.isTag)(i) && td(i, u[n]);
    });
  }, r = this, a = 0; a < u.length; a++)
    t(a);
  return this;
}
ke.removeAttr = wb;
function Rb(e) {
  return this.toArray().some(function(u) {
    var t = (0, he.isTag)(u) && u.attribs.class, r = -1;
    if (t && e.length)
      for (; (r = t.indexOf(e, r + 1)) > -1; ) {
        var a = r + e.length;
        if ((r === 0 || Z0.test(t[r - 1])) && (a === t.length || Z0.test(t[a])))
          return !0;
      }
    return !1;
  });
}
ke.hasClass = Rb;
function rd(e) {
  if (typeof e == "function")
    return (0, he.domEach)(this, function(d, c) {
      if ((0, he.isTag)(d)) {
        var E = d.attribs.class || "";
        rd.call([d], e.call(d, c, E));
      }
    });
  if (!e || typeof e != "string")
    return this;
  for (var u = e.split(Z0), t = this.length, r = 0; r < t; r++) {
    var a = this[r];
    if ((0, he.isTag)(a)) {
      var n = ca(a, "class", !1);
      if (!n)
        o0(a, "class", u.join(" ").trim());
      else {
        for (var i = " ".concat(n, " "), s = 0; s < u.length; s++) {
          var o = "".concat(u[s], " ");
          i.includes(" ".concat(o)) || (i += o);
        }
        o0(a, "class", i.trim());
      }
    }
  }
  return this;
}
ke.addClass = rd;
function ad(e) {
  if (typeof e == "function")
    return (0, he.domEach)(this, function(a, n) {
      (0, he.isTag)(a) && ad.call([a], e.call(a, n, a.attribs.class || ""));
    });
  var u = sa(e), t = u.length, r = arguments.length === 0;
  return (0, he.domEach)(this, function(a) {
    if ((0, he.isTag)(a))
      if (r)
        a.attribs.class = "";
      else {
        for (var n = sa(a.attribs.class), i = !1, s = 0; s < t; s++) {
          var o = n.indexOf(u[s]);
          o >= 0 && (n.splice(o, 1), i = !0, s--);
        }
        i && (a.attribs.class = n.join(" "));
      }
  });
}
ke.removeClass = ad;
function nd(e, u) {
  if (typeof e == "function")
    return (0, he.domEach)(this, function(E, f) {
      (0, he.isTag)(E) && nd.call([E], e.call(E, f, E.attribs.class || "", u), u);
    });
  if (!e || typeof e != "string")
    return this;
  for (var t = e.split(Z0), r = t.length, a = typeof u == "boolean" ? u ? 1 : -1 : 0, n = this.length, i = 0; i < n; i++) {
    var s = this[i];
    if ((0, he.isTag)(s)) {
      for (var o = sa(s.attribs.class), d = 0; d < r; d++) {
        var c = o.indexOf(t[d]);
        a >= 0 && c < 0 ? o.push(t[d]) : a <= 0 && c >= 0 && o.splice(c, 1);
      }
      s.attribs.class = o.join(" ");
    }
  }
  return this;
}
ke.toggleClass = nd;
var Q = {}, id = {}, fe;
(function(e) {
  e.Attribute = "attribute", e.Pseudo = "pseudo", e.PseudoElement = "pseudo-element", e.Tag = "tag", e.Universal = "universal", e.Adjacent = "adjacent", e.Child = "child", e.Descendant = "descendant", e.Parent = "parent", e.Sibling = "sibling", e.ColumnCombinator = "column-combinator";
})(fe || (fe = {}));
const Mb = {
  Unknown: null,
  QuirksMode: "quirks",
  IgnoreCase: !0,
  CaseSensitive: !1
};
var xe;
(function(e) {
  e.Any = "any", e.Element = "element", e.End = "end", e.Equals = "equals", e.Exists = "exists", e.Hyphen = "hyphen", e.Not = "not", e.Start = "start";
})(xe || (xe = {}));
const as = /^[^\\#]?(?:\\(?:[\da-f]{1,6}\s?|.)|[\w\-\u00b0-\uFFFF])+/, kb = /\\([\da-f]{1,6}\s?|(\s)|.)/gi, Bb = /* @__PURE__ */ new Map([
  [126, xe.Element],
  [94, xe.Start],
  [36, xe.End],
  [42, xe.Any],
  [33, xe.Not],
  [124, xe.Hyphen]
]), Ub = /* @__PURE__ */ new Set([
  "has",
  "not",
  "matches",
  "is",
  "where",
  "host",
  "host-context"
]);
function cd(e) {
  switch (e.type) {
    case fe.Adjacent:
    case fe.Child:
    case fe.Descendant:
    case fe.Parent:
    case fe.Sibling:
    case fe.ColumnCombinator:
      return !0;
    default:
      return !1;
  }
}
const Hb = /* @__PURE__ */ new Set(["contains", "icontains"]);
function Fb(e, u, t) {
  const r = parseInt(u, 16) - 65536;
  return r !== r || t ? u : r < 0 ? (
    // BMP codepoint
    String.fromCharCode(r + 65536)
  ) : (
    // Supplemental Plane codepoint (surrogate pair)
    String.fromCharCode(r >> 10 | 55296, r & 1023 | 56320)
  );
}
function w0(e) {
  return e.replace(kb, Fb);
}
function xn(e) {
  return e === 39 || e === 34;
}
function ns(e) {
  return e === 32 || e === 9 || e === 10 || e === 12 || e === 13;
}
function qb(e) {
  const u = [], t = sd(u, `${e}`, 0);
  if (t < e.length)
    throw new Error(`Unmatched selector: ${e.slice(t)}`);
  return u;
}
function sd(e, u, t) {
  let r = [];
  function a(f) {
    const m = u.slice(t + f).match(as);
    if (!m)
      throw new Error(`Expected name, found ${u.slice(t)}`);
    const [v] = m;
    return t += f + v.length, w0(v);
  }
  function n(f) {
    for (t += f; t < u.length && ns(u.charCodeAt(t)); )
      t++;
  }
  function i() {
    t += 1;
    const f = t;
    let m = 1;
    for (; m > 0 && t < u.length; t++)
      u.charCodeAt(t) === 40 && !s(t) ? m++ : u.charCodeAt(t) === 41 && !s(t) && m--;
    if (m)
      throw new Error("Parenthesis not matched");
    return w0(u.slice(f, t - 1));
  }
  function s(f) {
    let m = 0;
    for (; u.charCodeAt(--f) === 92; )
      m++;
    return (m & 1) === 1;
  }
  function o() {
    if (r.length > 0 && cd(r[r.length - 1]))
      throw new Error("Did not expect successive traversals.");
  }
  function d(f) {
    if (r.length > 0 && r[r.length - 1].type === fe.Descendant) {
      r[r.length - 1].type = f;
      return;
    }
    o(), r.push({ type: f });
  }
  function c(f, m) {
    r.push({
      type: fe.Attribute,
      name: f,
      action: m,
      value: a(1),
      namespace: null,
      ignoreCase: "quirks"
    });
  }
  function E() {
    if (r.length && r[r.length - 1].type === fe.Descendant && r.pop(), r.length === 0)
      throw new Error("Empty sub-selector");
    e.push(r);
  }
  if (n(0), u.length === t)
    return t;
  e:
    for (; t < u.length; ) {
      const f = u.charCodeAt(t);
      switch (f) {
        case 32:
        case 9:
        case 10:
        case 12:
        case 13: {
          (r.length === 0 || r[0].type !== fe.Descendant) && (o(), r.push({ type: fe.Descendant })), n(1);
          break;
        }
        case 62: {
          d(fe.Child), n(1);
          break;
        }
        case 60: {
          d(fe.Parent), n(1);
          break;
        }
        case 126: {
          d(fe.Sibling), n(1);
          break;
        }
        case 43: {
          d(fe.Adjacent), n(1);
          break;
        }
        case 46: {
          c("class", xe.Element);
          break;
        }
        case 35: {
          c("id", xe.Equals);
          break;
        }
        case 91: {
          n(1);
          let m, v = null;
          u.charCodeAt(t) === 124 ? m = a(1) : u.startsWith("*|", t) ? (v = "*", m = a(2)) : (m = a(0), u.charCodeAt(t) === 124 && u.charCodeAt(t + 1) !== 61 && (v = m, m = a(1))), n(0);
          let L = xe.Exists;
          const N = Bb.get(u.charCodeAt(t));
          if (N) {
            if (L = N, u.charCodeAt(t + 1) !== 61)
              throw new Error("Expected `=`");
            n(2);
          } else
            u.charCodeAt(t) === 61 && (L = xe.Equals, n(1));
          let O = "", w = null;
          if (L !== "exists") {
            if (xn(u.charCodeAt(t))) {
              const R = u.charCodeAt(t);
              let G = t + 1;
              for (; G < u.length && (u.charCodeAt(G) !== R || s(G)); )
                G += 1;
              if (u.charCodeAt(G) !== R)
                throw new Error("Attribute value didn't end");
              O = w0(u.slice(t + 1, G)), t = G + 1;
            } else {
              const R = t;
              for (; t < u.length && (!ns(u.charCodeAt(t)) && u.charCodeAt(t) !== 93 || s(t)); )
                t += 1;
              O = w0(u.slice(R, t));
            }
            n(0);
            const k = u.charCodeAt(t) | 32;
            k === 115 ? (w = !1, n(1)) : k === 105 && (w = !0, n(1));
          }
          if (u.charCodeAt(t) !== 93)
            throw new Error("Attribute selector didn't terminate");
          t += 1;
          const H = {
            type: fe.Attribute,
            name: m,
            action: L,
            value: O,
            namespace: v,
            ignoreCase: w
          };
          r.push(H);
          break;
        }
        case 58: {
          if (u.charCodeAt(t + 1) === 58) {
            r.push({
              type: fe.PseudoElement,
              name: a(2).toLowerCase(),
              data: u.charCodeAt(t) === 40 ? i() : null
            });
            continue;
          }
          const m = a(1).toLowerCase();
          let v = null;
          if (u.charCodeAt(t) === 40)
            if (Ub.has(m)) {
              if (xn(u.charCodeAt(t + 1)))
                throw new Error(`Pseudo-selector ${m} cannot be quoted`);
              if (v = [], t = sd(v, u, t + 1), u.charCodeAt(t) !== 41)
                throw new Error(`Missing closing parenthesis in :${m} (${u})`);
              t += 1;
            } else {
              if (v = i(), Hb.has(m)) {
                const L = v.charCodeAt(0);
                L === v.charCodeAt(v.length - 1) && xn(L) && (v = v.slice(1, -1));
              }
              v = w0(v);
            }
          r.push({ type: fe.Pseudo, name: m, data: v });
          break;
        }
        case 44: {
          E(), r = [], n(1);
          break;
        }
        default: {
          if (u.startsWith("/*", t)) {
            const L = u.indexOf("*/", t + 2);
            if (L < 0)
              throw new Error("Comment was not terminated");
            t = L + 2, r.length === 0 && n(0);
            break;
          }
          let m = null, v;
          if (f === 42)
            t += 1, v = "*";
          else if (f === 124) {
            if (v = "", u.charCodeAt(t + 1) === 124) {
              d(fe.ColumnCombinator), n(2);
              break;
            }
          } else if (as.test(u.slice(t)))
            v = a(0);
          else
            break e;
          u.charCodeAt(t) === 124 && u.charCodeAt(t + 1) !== 124 && (m = v, u.charCodeAt(t + 1) === 42 ? (v = "*", t += 2) : v = a(1)), r.push(v === "*" ? { type: fe.Universal, namespace: m } : { type: fe.Tag, name: v, namespace: m });
        }
      }
    }
  return E(), t;
}
const od = ["\\", '"'], dd = [...od, "(", ")"], Gb = new Set(od.map((e) => e.charCodeAt(0))), is = new Set(dd.map((e) => e.charCodeAt(0))), Zt = new Set([
  ...dd,
  "~",
  "^",
  "$",
  "*",
  "+",
  "!",
  "|",
  ":",
  "[",
  "]",
  " ",
  "."
].map((e) => e.charCodeAt(0)));
function ld(e) {
  return e.map((u) => u.map(jb).join("")).join(", ");
}
function jb(e, u, t) {
  switch (e.type) {
    case fe.Child:
      return u === 0 ? "> " : " > ";
    case fe.Parent:
      return u === 0 ? "< " : " < ";
    case fe.Sibling:
      return u === 0 ? "~ " : " ~ ";
    case fe.Adjacent:
      return u === 0 ? "+ " : " + ";
    case fe.Descendant:
      return " ";
    case fe.ColumnCombinator:
      return u === 0 ? "|| " : " || ";
    case fe.Universal:
      return e.namespace === "*" && u + 1 < t.length && "name" in t[u + 1] ? "" : `${fd(e.namespace)}*`;
    case fe.Tag:
      return cs(e);
    case fe.PseudoElement:
      return `::${tt(e.name, Zt)}${e.data === null ? "" : `(${tt(e.data, is)})`}`;
    case fe.Pseudo:
      return `:${tt(e.name, Zt)}${e.data === null ? "" : `(${typeof e.data == "string" ? tt(e.data, is) : ld(e.data)})`}`;
    case fe.Attribute: {
      if (e.name === "id" && e.action === xe.Equals && e.ignoreCase === "quirks" && !e.namespace)
        return `#${tt(e.value, Zt)}`;
      if (e.name === "class" && e.action === xe.Element && e.ignoreCase === "quirks" && !e.namespace)
        return `.${tt(e.value, Zt)}`;
      const r = cs(e);
      return e.action === xe.Exists ? `[${r}]` : `[${r}${$b(e.action)}="${tt(e.value, Gb)}"${e.ignoreCase === null ? "" : e.ignoreCase ? " i" : " s"}]`;
    }
  }
}
function $b(e) {
  switch (e) {
    case xe.Equals:
      return "";
    case xe.Element:
      return "~";
    case xe.Start:
      return "^";
    case xe.End:
      return "$";
    case xe.Any:
      return "*";
    case xe.Not:
      return "!";
    case xe.Hyphen:
      return "|";
    case xe.Exists:
      throw new Error("Shouldn't be here");
  }
}
function cs(e) {
  return `${fd(e.namespace)}${tt(e.name, Zt)}`;
}
function fd(e) {
  return e !== null ? `${e === "*" ? "*" : tt(e, Zt)}|` : "";
}
function tt(e, u) {
  let t = 0, r = "";
  for (let a = 0; a < e.length; a++)
    u.has(e.charCodeAt(a)) && (r += `${e.slice(t, a)}\\${e.charAt(a)}`, t = a + 1);
  return r.length > 0 ? r + e.slice(t) : e;
}
const Vb = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get AttributeAction() {
    return xe;
  },
  IgnoreCaseMode: Mb,
  get SelectorType() {
    return fe;
  },
  isTraversal: cd,
  parse: qb,
  stringify: ld
}, Symbol.toStringTag, { value: "Module" })), dr = /* @__PURE__ */ xo(Vb);
var ci = {}, bd = {}, xu = {}, Ft = {}, ie = {}, Et = C && C.__extends || /* @__PURE__ */ function() {
  var e = function(u, t) {
    return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, a) {
      r.__proto__ = a;
    } || function(r, a) {
      for (var n in a)
        Object.prototype.hasOwnProperty.call(a, n) && (r[n] = a[n]);
    }, e(u, t);
  };
  return function(u, t) {
    if (typeof t != "function" && t !== null)
      throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
    e(u, t);
    function r() {
      this.constructor = u;
    }
    u.prototype = t === null ? Object.create(t) : (r.prototype = t.prototype, new r());
  };
}(), G0 = C && C.__assign || function() {
  return G0 = Object.assign || function(e) {
    for (var u, t = 1, r = arguments.length; t < r; t++) {
      u = arguments[t];
      for (var a in u)
        Object.prototype.hasOwnProperty.call(u, a) && (e[a] = u[a]);
    }
    return e;
  }, G0.apply(this, arguments);
};
Object.defineProperty(ie, "__esModule", { value: !0 });
ie.cloneNode = ie.hasChildren = ie.isDocument = ie.isDirective = ie.isComment = ie.isText = ie.isCDATA = ie.isTag = ie.Element = ie.Document = ie.CDATA = ie.NodeWithChildren = ie.ProcessingInstruction = ie.Comment = ie.Text = ie.DataNode = ie.Node = void 0;
var hu = Be, Ji = (
  /** @class */
  function() {
    function e() {
      this.parent = null, this.prev = null, this.next = null, this.startIndex = null, this.endIndex = null;
    }
    return Object.defineProperty(e.prototype, "parentNode", {
      // Read-write aliases for properties
      /**
       * Same as {@link parent}.
       * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
       */
      get: function() {
        return this.parent;
      },
      set: function(u) {
        this.parent = u;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "previousSibling", {
      /**
       * Same as {@link prev}.
       * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
       */
      get: function() {
        return this.prev;
      },
      set: function(u) {
        this.prev = u;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "nextSibling", {
      /**
       * Same as {@link next}.
       * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
       */
      get: function() {
        return this.next;
      },
      set: function(u) {
        this.next = u;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.cloneNode = function(u) {
      return u === void 0 && (u = !1), Zi(this, u);
    }, e;
  }()
);
ie.Node = Ji;
var La = (
  /** @class */
  function(e) {
    Et(u, e);
    function u(t) {
      var r = e.call(this) || this;
      return r.data = t, r;
    }
    return Object.defineProperty(u.prototype, "nodeValue", {
      /**
       * Same as {@link data}.
       * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
       */
      get: function() {
        return this.data;
      },
      set: function(t) {
        this.data = t;
      },
      enumerable: !1,
      configurable: !0
    }), u;
  }(Ji)
);
ie.DataNode = La;
var hd = (
  /** @class */
  function(e) {
    Et(u, e);
    function u() {
      var t = e !== null && e.apply(this, arguments) || this;
      return t.type = hu.ElementType.Text, t;
    }
    return Object.defineProperty(u.prototype, "nodeType", {
      get: function() {
        return 3;
      },
      enumerable: !1,
      configurable: !0
    }), u;
  }(La)
);
ie.Text = hd;
var pd = (
  /** @class */
  function(e) {
    Et(u, e);
    function u() {
      var t = e !== null && e.apply(this, arguments) || this;
      return t.type = hu.ElementType.Comment, t;
    }
    return Object.defineProperty(u.prototype, "nodeType", {
      get: function() {
        return 8;
      },
      enumerable: !1,
      configurable: !0
    }), u;
  }(La)
);
ie.Comment = pd;
var md = (
  /** @class */
  function(e) {
    Et(u, e);
    function u(t, r) {
      var a = e.call(this, r) || this;
      return a.name = t, a.type = hu.ElementType.Directive, a;
    }
    return Object.defineProperty(u.prototype, "nodeType", {
      get: function() {
        return 1;
      },
      enumerable: !1,
      configurable: !0
    }), u;
  }(La)
);
ie.ProcessingInstruction = md;
var Pa = (
  /** @class */
  function(e) {
    Et(u, e);
    function u(t) {
      var r = e.call(this) || this;
      return r.children = t, r;
    }
    return Object.defineProperty(u.prototype, "firstChild", {
      // Aliases
      /** First child of the node. */
      get: function() {
        var t;
        return (t = this.children[0]) !== null && t !== void 0 ? t : null;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(u.prototype, "lastChild", {
      /** Last child of the node. */
      get: function() {
        return this.children.length > 0 ? this.children[this.children.length - 1] : null;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(u.prototype, "childNodes", {
      /**
       * Same as {@link children}.
       * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
       */
      get: function() {
        return this.children;
      },
      set: function(t) {
        this.children = t;
      },
      enumerable: !1,
      configurable: !0
    }), u;
  }(Ji)
);
ie.NodeWithChildren = Pa;
var gd = (
  /** @class */
  function(e) {
    Et(u, e);
    function u() {
      var t = e !== null && e.apply(this, arguments) || this;
      return t.type = hu.ElementType.CDATA, t;
    }
    return Object.defineProperty(u.prototype, "nodeType", {
      get: function() {
        return 4;
      },
      enumerable: !1,
      configurable: !0
    }), u;
  }(Pa)
);
ie.CDATA = gd;
var Ed = (
  /** @class */
  function(e) {
    Et(u, e);
    function u() {
      var t = e !== null && e.apply(this, arguments) || this;
      return t.type = hu.ElementType.Root, t;
    }
    return Object.defineProperty(u.prototype, "nodeType", {
      get: function() {
        return 9;
      },
      enumerable: !1,
      configurable: !0
    }), u;
  }(Pa)
);
ie.Document = Ed;
var Td = (
  /** @class */
  function(e) {
    Et(u, e);
    function u(t, r, a, n) {
      a === void 0 && (a = []), n === void 0 && (n = t === "script" ? hu.ElementType.Script : t === "style" ? hu.ElementType.Style : hu.ElementType.Tag);
      var i = e.call(this, a) || this;
      return i.name = t, i.attribs = r, i.type = n, i;
    }
    return Object.defineProperty(u.prototype, "nodeType", {
      get: function() {
        return 1;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(u.prototype, "tagName", {
      // DOM Level 1 aliases
      /**
       * Same as {@link name}.
       * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
       */
      get: function() {
        return this.name;
      },
      set: function(t) {
        this.name = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(u.prototype, "attributes", {
      get: function() {
        var t = this;
        return Object.keys(this.attribs).map(function(r) {
          var a, n;
          return {
            name: r,
            value: t.attribs[r],
            namespace: (a = t["x-attribsNamespace"]) === null || a === void 0 ? void 0 : a[r],
            prefix: (n = t["x-attribsPrefix"]) === null || n === void 0 ? void 0 : n[r]
          };
        });
      },
      enumerable: !1,
      configurable: !0
    }), u;
  }(Pa)
);
ie.Element = Td;
function _d(e) {
  return (0, hu.isTag)(e);
}
ie.isTag = _d;
function yd(e) {
  return e.type === hu.ElementType.CDATA;
}
ie.isCDATA = yd;
function Ad(e) {
  return e.type === hu.ElementType.Text;
}
ie.isText = Ad;
function vd(e) {
  return e.type === hu.ElementType.Comment;
}
ie.isComment = vd;
function xd(e) {
  return e.type === hu.ElementType.Directive;
}
ie.isDirective = xd;
function Nd(e) {
  return e.type === hu.ElementType.Root;
}
ie.isDocument = Nd;
function Yb(e) {
  return Object.prototype.hasOwnProperty.call(e, "children");
}
ie.hasChildren = Yb;
function Zi(e, u) {
  u === void 0 && (u = !1);
  var t;
  if (Ad(e))
    t = new hd(e.data);
  else if (vd(e))
    t = new pd(e.data);
  else if (_d(e)) {
    var r = u ? Nn(e.children) : [], a = new Td(e.name, G0({}, e.attribs), r);
    r.forEach(function(o) {
      return o.parent = a;
    }), e.namespace != null && (a.namespace = e.namespace), e["x-attribsNamespace"] && (a["x-attribsNamespace"] = G0({}, e["x-attribsNamespace"])), e["x-attribsPrefix"] && (a["x-attribsPrefix"] = G0({}, e["x-attribsPrefix"])), t = a;
  } else if (yd(e)) {
    var r = u ? Nn(e.children) : [], n = new gd(r);
    r.forEach(function(d) {
      return d.parent = n;
    }), t = n;
  } else if (Nd(e)) {
    var r = u ? Nn(e.children) : [], i = new Ed(r);
    r.forEach(function(d) {
      return d.parent = i;
    }), e["x-mode"] && (i["x-mode"] = e["x-mode"]), t = i;
  } else if (xd(e)) {
    var s = new md(e.name, e.data);
    e["x-name"] != null && (s["x-name"] = e["x-name"], s["x-publicId"] = e["x-publicId"], s["x-systemId"] = e["x-systemId"]), t = s;
  } else
    throw new Error("Not implemented yet: ".concat(e.type));
  return t.startIndex = e.startIndex, t.endIndex = e.endIndex, e.sourceCodeLocation != null && (t.sourceCodeLocation = e.sourceCodeLocation), t;
}
ie.cloneNode = Zi;
function Nn(e) {
  for (var u = e.map(function(r) {
    return Zi(r, !0);
  }), t = 1; t < u.length; t++)
    u[t].prev = u[t - 1], u[t - 1].next = u[t];
  return u;
}
(function(e) {
  var u = C && C.__createBinding || (Object.create ? function(s, o, d, c) {
    c === void 0 && (c = d);
    var E = Object.getOwnPropertyDescriptor(o, d);
    (!E || ("get" in E ? !o.__esModule : E.writable || E.configurable)) && (E = { enumerable: !0, get: function() {
      return o[d];
    } }), Object.defineProperty(s, c, E);
  } : function(s, o, d, c) {
    c === void 0 && (c = d), s[c] = o[d];
  }), t = C && C.__exportStar || function(s, o) {
    for (var d in s)
      d !== "default" && !Object.prototype.hasOwnProperty.call(o, d) && u(o, s, d);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.DomHandler = void 0;
  var r = Be, a = ie;
  t(ie, e);
  var n = {
    withStartIndices: !1,
    withEndIndices: !1,
    xmlMode: !1
  }, i = (
    /** @class */
    function() {
      function s(o, d, c) {
        this.dom = [], this.root = new a.Document(this.dom), this.done = !1, this.tagStack = [this.root], this.lastNode = null, this.parser = null, typeof d == "function" && (c = d, d = n), typeof o == "object" && (d = o, o = void 0), this.callback = o ?? null, this.options = d ?? n, this.elementCB = c ?? null;
      }
      return s.prototype.onparserinit = function(o) {
        this.parser = o;
      }, s.prototype.onreset = function() {
        this.dom = [], this.root = new a.Document(this.dom), this.done = !1, this.tagStack = [this.root], this.lastNode = null, this.parser = null;
      }, s.prototype.onend = function() {
        this.done || (this.done = !0, this.parser = null, this.handleCallback(null));
      }, s.prototype.onerror = function(o) {
        this.handleCallback(o);
      }, s.prototype.onclosetag = function() {
        this.lastNode = null;
        var o = this.tagStack.pop();
        this.options.withEndIndices && (o.endIndex = this.parser.endIndex), this.elementCB && this.elementCB(o);
      }, s.prototype.onopentag = function(o, d) {
        var c = this.options.xmlMode ? r.ElementType.Tag : void 0, E = new a.Element(o, d, void 0, c);
        this.addNode(E), this.tagStack.push(E);
      }, s.prototype.ontext = function(o) {
        var d = this.lastNode;
        if (d && d.type === r.ElementType.Text)
          d.data += o, this.options.withEndIndices && (d.endIndex = this.parser.endIndex);
        else {
          var c = new a.Text(o);
          this.addNode(c), this.lastNode = c;
        }
      }, s.prototype.oncomment = function(o) {
        if (this.lastNode && this.lastNode.type === r.ElementType.Comment) {
          this.lastNode.data += o;
          return;
        }
        var d = new a.Comment(o);
        this.addNode(d), this.lastNode = d;
      }, s.prototype.oncommentend = function() {
        this.lastNode = null;
      }, s.prototype.oncdatastart = function() {
        var o = new a.Text(""), d = new a.CDATA([o]);
        this.addNode(d), o.parent = d, this.lastNode = o;
      }, s.prototype.oncdataend = function() {
        this.lastNode = null;
      }, s.prototype.onprocessinginstruction = function(o, d) {
        var c = new a.ProcessingInstruction(o, d);
        this.addNode(c);
      }, s.prototype.handleCallback = function(o) {
        if (typeof this.callback == "function")
          this.callback(o, this.dom);
        else if (o)
          throw o;
      }, s.prototype.addNode = function(o) {
        var d = this.tagStack[this.tagStack.length - 1], c = d.children[d.children.length - 1];
        this.options.withStartIndices && (o.startIndex = this.parser.startIndex), this.options.withEndIndices && (o.endIndex = this.parser.endIndex), d.children.push(o), c && (o.prev = c, c.next = o), o.parent = d, this.lastNode = null;
      }, s;
    }()
  );
  e.DomHandler = i, e.default = i;
})(Ft);
var lr = {}, Id = {}, si = {}, ec = {};
Object.defineProperty(ec, "__esModule", { value: !0 });
ec.default = new Uint16Array(
  // prettier-ignore
  'ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map(function(e) {
    return e.charCodeAt(0);
  })
);
var uc = {};
Object.defineProperty(uc, "__esModule", { value: !0 });
uc.default = new Uint16Array(
  // prettier-ignore
  "Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map(function(e) {
    return e.charCodeAt(0);
  })
);
var oi = {};
(function(e) {
  var u;
  Object.defineProperty(e, "__esModule", { value: !0 }), e.replaceCodePoint = e.fromCodePoint = void 0;
  var t = /* @__PURE__ */ new Map([
    [0, 65533],
    // C1 Unicode control character reference replacements
    [128, 8364],
    [130, 8218],
    [131, 402],
    [132, 8222],
    [133, 8230],
    [134, 8224],
    [135, 8225],
    [136, 710],
    [137, 8240],
    [138, 352],
    [139, 8249],
    [140, 338],
    [142, 381],
    [145, 8216],
    [146, 8217],
    [147, 8220],
    [148, 8221],
    [149, 8226],
    [150, 8211],
    [151, 8212],
    [152, 732],
    [153, 8482],
    [154, 353],
    [155, 8250],
    [156, 339],
    [158, 382],
    [159, 376]
  ]);
  e.fromCodePoint = // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, node/no-unsupported-features/es-builtins
  (u = String.fromCodePoint) !== null && u !== void 0 ? u : function(n) {
    var i = "";
    return n > 65535 && (n -= 65536, i += String.fromCharCode(n >>> 10 & 1023 | 55296), n = 56320 | n & 1023), i += String.fromCharCode(n), i;
  };
  function r(n) {
    var i;
    return n >= 55296 && n <= 57343 || n > 1114111 ? 65533 : (i = t.get(n)) !== null && i !== void 0 ? i : n;
  }
  e.replaceCodePoint = r;
  function a(n) {
    return (0, e.fromCodePoint)(r(n));
  }
  e.default = a;
})(oi);
(function(e) {
  var u = C && C.__createBinding || (Object.create ? function(l, g, T, A) {
    A === void 0 && (A = T);
    var D = Object.getOwnPropertyDescriptor(g, T);
    (!D || ("get" in D ? !g.__esModule : D.writable || D.configurable)) && (D = { enumerable: !0, get: function() {
      return g[T];
    } }), Object.defineProperty(l, A, D);
  } : function(l, g, T, A) {
    A === void 0 && (A = T), l[A] = g[T];
  }), t = C && C.__setModuleDefault || (Object.create ? function(l, g) {
    Object.defineProperty(l, "default", { enumerable: !0, value: g });
  } : function(l, g) {
    l.default = g;
  }), r = C && C.__importStar || function(l) {
    if (l && l.__esModule)
      return l;
    var g = {};
    if (l != null)
      for (var T in l)
        T !== "default" && Object.prototype.hasOwnProperty.call(l, T) && u(g, l, T);
    return t(g, l), g;
  }, a = C && C.__importDefault || function(l) {
    return l && l.__esModule ? l : { default: l };
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.decodeXML = e.decodeHTMLStrict = e.decodeHTMLAttribute = e.decodeHTML = e.determineBranch = e.EntityDecoder = e.DecodingMode = e.BinTrieFlags = e.fromCodePoint = e.replaceCodePoint = e.decodeCodePoint = e.xmlDecodeTree = e.htmlDecodeTree = void 0;
  var n = a(ec);
  e.htmlDecodeTree = n.default;
  var i = a(uc);
  e.xmlDecodeTree = i.default;
  var s = r(oi);
  e.decodeCodePoint = s.default;
  var o = oi;
  Object.defineProperty(e, "replaceCodePoint", { enumerable: !0, get: function() {
    return o.replaceCodePoint;
  } }), Object.defineProperty(e, "fromCodePoint", { enumerable: !0, get: function() {
    return o.fromCodePoint;
  } });
  var d;
  (function(l) {
    l[l.NUM = 35] = "NUM", l[l.SEMI = 59] = "SEMI", l[l.EQUALS = 61] = "EQUALS", l[l.ZERO = 48] = "ZERO", l[l.NINE = 57] = "NINE", l[l.LOWER_A = 97] = "LOWER_A", l[l.LOWER_F = 102] = "LOWER_F", l[l.LOWER_X = 120] = "LOWER_X", l[l.LOWER_Z = 122] = "LOWER_Z", l[l.UPPER_A = 65] = "UPPER_A", l[l.UPPER_F = 70] = "UPPER_F", l[l.UPPER_Z = 90] = "UPPER_Z";
  })(d || (d = {}));
  var c = 32, E;
  (function(l) {
    l[l.VALUE_LENGTH = 49152] = "VALUE_LENGTH", l[l.BRANCH_LENGTH = 16256] = "BRANCH_LENGTH", l[l.JUMP_TABLE = 127] = "JUMP_TABLE";
  })(E = e.BinTrieFlags || (e.BinTrieFlags = {}));
  function f(l) {
    return l >= d.ZERO && l <= d.NINE;
  }
  function m(l) {
    return l >= d.UPPER_A && l <= d.UPPER_F || l >= d.LOWER_A && l <= d.LOWER_F;
  }
  function v(l) {
    return l >= d.UPPER_A && l <= d.UPPER_Z || l >= d.LOWER_A && l <= d.LOWER_Z || f(l);
  }
  function L(l) {
    return l === d.EQUALS || v(l);
  }
  var N;
  (function(l) {
    l[l.EntityStart = 0] = "EntityStart", l[l.NumericStart = 1] = "NumericStart", l[l.NumericDecimal = 2] = "NumericDecimal", l[l.NumericHex = 3] = "NumericHex", l[l.NamedEntity = 4] = "NamedEntity";
  })(N || (N = {}));
  var O;
  (function(l) {
    l[l.Legacy = 0] = "Legacy", l[l.Strict = 1] = "Strict", l[l.Attribute = 2] = "Attribute";
  })(O = e.DecodingMode || (e.DecodingMode = {}));
  var w = (
    /** @class */
    function() {
      function l(g, T, A) {
        this.decodeTree = g, this.emitCodePoint = T, this.errors = A, this.state = N.EntityStart, this.consumed = 1, this.result = 0, this.treeIndex = 0, this.excess = 1, this.decodeMode = O.Strict;
      }
      return l.prototype.startEntity = function(g) {
        this.decodeMode = g, this.state = N.EntityStart, this.result = 0, this.treeIndex = 0, this.excess = 1, this.consumed = 1;
      }, l.prototype.write = function(g, T) {
        switch (this.state) {
          case N.EntityStart:
            return g.charCodeAt(T) === d.NUM ? (this.state = N.NumericStart, this.consumed += 1, this.stateNumericStart(g, T + 1)) : (this.state = N.NamedEntity, this.stateNamedEntity(g, T));
          case N.NumericStart:
            return this.stateNumericStart(g, T);
          case N.NumericDecimal:
            return this.stateNumericDecimal(g, T);
          case N.NumericHex:
            return this.stateNumericHex(g, T);
          case N.NamedEntity:
            return this.stateNamedEntity(g, T);
        }
      }, l.prototype.stateNumericStart = function(g, T) {
        return T >= g.length ? -1 : (g.charCodeAt(T) | c) === d.LOWER_X ? (this.state = N.NumericHex, this.consumed += 1, this.stateNumericHex(g, T + 1)) : (this.state = N.NumericDecimal, this.stateNumericDecimal(g, T));
      }, l.prototype.addToNumericResult = function(g, T, A, D) {
        if (T !== A) {
          var B = A - T;
          this.result = this.result * Math.pow(D, B) + parseInt(g.substr(T, B), D), this.consumed += B;
        }
      }, l.prototype.stateNumericHex = function(g, T) {
        for (var A = T; T < g.length; ) {
          var D = g.charCodeAt(T);
          if (f(D) || m(D))
            T += 1;
          else
            return this.addToNumericResult(g, A, T, 16), this.emitNumericEntity(D, 3);
        }
        return this.addToNumericResult(g, A, T, 16), -1;
      }, l.prototype.stateNumericDecimal = function(g, T) {
        for (var A = T; T < g.length; ) {
          var D = g.charCodeAt(T);
          if (f(D))
            T += 1;
          else
            return this.addToNumericResult(g, A, T, 10), this.emitNumericEntity(D, 2);
        }
        return this.addToNumericResult(g, A, T, 10), -1;
      }, l.prototype.emitNumericEntity = function(g, T) {
        var A;
        if (this.consumed <= T)
          return (A = this.errors) === null || A === void 0 || A.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
        if (g === d.SEMI)
          this.consumed += 1;
        else if (this.decodeMode === O.Strict)
          return 0;
        return this.emitCodePoint((0, s.replaceCodePoint)(this.result), this.consumed), this.errors && (g !== d.SEMI && this.errors.missingSemicolonAfterCharacterReference(), this.errors.validateNumericCharacterReference(this.result)), this.consumed;
      }, l.prototype.stateNamedEntity = function(g, T) {
        for (var A = this.decodeTree, D = A[this.treeIndex], B = (D & E.VALUE_LENGTH) >> 14; T < g.length; T++, this.excess++) {
          var M = g.charCodeAt(T);
          if (this.treeIndex = k(A, D, this.treeIndex + Math.max(1, B), M), this.treeIndex < 0)
            return this.result === 0 || // If we are parsing an attribute
            this.decodeMode === O.Attribute && // We shouldn't have consumed any characters after the entity,
            (B === 0 || // And there should be no invalid characters.
            L(M)) ? 0 : this.emitNotTerminatedNamedEntity();
          if (D = A[this.treeIndex], B = (D & E.VALUE_LENGTH) >> 14, B !== 0) {
            if (M === d.SEMI)
              return this.emitNamedEntityData(this.treeIndex, B, this.consumed + this.excess);
            this.decodeMode !== O.Strict && (this.result = this.treeIndex, this.consumed += this.excess, this.excess = 0);
          }
        }
        return -1;
      }, l.prototype.emitNotTerminatedNamedEntity = function() {
        var g, T = this, A = T.result, D = T.decodeTree, B = (D[A] & E.VALUE_LENGTH) >> 14;
        return this.emitNamedEntityData(A, B, this.consumed), (g = this.errors) === null || g === void 0 || g.missingSemicolonAfterCharacterReference(), this.consumed;
      }, l.prototype.emitNamedEntityData = function(g, T, A) {
        var D = this.decodeTree;
        return this.emitCodePoint(T === 1 ? D[g] & ~E.VALUE_LENGTH : D[g + 1], A), T === 3 && this.emitCodePoint(D[g + 2], A), A;
      }, l.prototype.end = function() {
        var g;
        switch (this.state) {
          case N.NamedEntity:
            return this.result !== 0 && (this.decodeMode !== O.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
          case N.NumericDecimal:
            return this.emitNumericEntity(0, 2);
          case N.NumericHex:
            return this.emitNumericEntity(0, 3);
          case N.NumericStart:
            return (g = this.errors) === null || g === void 0 || g.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
          case N.EntityStart:
            return 0;
        }
      }, l;
    }()
  );
  e.EntityDecoder = w;
  function H(l) {
    var g = "", T = new w(l, function(A) {
      return g += (0, s.fromCodePoint)(A);
    });
    return function(D, B) {
      for (var M = 0, $ = 0; ($ = D.indexOf("&", $)) >= 0; ) {
        g += D.slice(M, $), T.startEntity(B);
        var J = T.write(
          D,
          // Skip the "&"
          $ + 1
        );
        if (J < 0) {
          M = $ + T.end();
          break;
        }
        M = $ + J, $ = J === 0 ? M + 1 : M;
      }
      var z = g + D.slice(M);
      return g = "", z;
    };
  }
  function k(l, g, T, A) {
    var D = (g & E.BRANCH_LENGTH) >> 7, B = g & E.JUMP_TABLE;
    if (D === 0)
      return B !== 0 && A === B ? T : -1;
    if (B) {
      var M = A - B;
      return M < 0 || M >= D ? -1 : l[T + M] - 1;
    }
    for (var $ = T, J = $ + D - 1; $ <= J; ) {
      var z = $ + J >>> 1, be = l[z];
      if (be < A)
        $ = z + 1;
      else if (be > A)
        J = z - 1;
      else
        return l[z + D];
    }
    return -1;
  }
  e.determineBranch = k;
  var R = H(n.default), G = H(i.default);
  function X(l, g) {
    return g === void 0 && (g = O.Legacy), R(l, g);
  }
  e.decodeHTML = X;
  function Z(l) {
    return R(l, O.Attribute);
  }
  e.decodeHTMLAttribute = Z;
  function re(l) {
    return R(l, O.Strict);
  }
  e.decodeHTMLStrict = re;
  function Y(l) {
    return G(l, O.Strict);
  }
  e.decodeXML = Y;
})(si);
var wt = {}, tc = {};
Object.defineProperty(tc, "__esModule", { value: !0 });
function Pr(e) {
  for (var u = 1; u < e.length; u++)
    e[u][0] += e[u - 1][0] + 1;
  return e;
}
tc.default = new Map(/* @__PURE__ */ Pr([[9, "&Tab;"], [0, "&NewLine;"], [22, "&excl;"], [0, "&quot;"], [0, "&num;"], [0, "&dollar;"], [0, "&percnt;"], [0, "&amp;"], [0, "&apos;"], [0, "&lpar;"], [0, "&rpar;"], [0, "&ast;"], [0, "&plus;"], [0, "&comma;"], [1, "&period;"], [0, "&sol;"], [10, "&colon;"], [0, "&semi;"], [0, { v: "&lt;", n: 8402, o: "&nvlt;" }], [0, { v: "&equals;", n: 8421, o: "&bne;" }], [0, { v: "&gt;", n: 8402, o: "&nvgt;" }], [0, "&quest;"], [0, "&commat;"], [26, "&lbrack;"], [0, "&bsol;"], [0, "&rbrack;"], [0, "&Hat;"], [0, "&lowbar;"], [0, "&DiacriticalGrave;"], [5, { n: 106, o: "&fjlig;" }], [20, "&lbrace;"], [0, "&verbar;"], [0, "&rbrace;"], [34, "&nbsp;"], [0, "&iexcl;"], [0, "&cent;"], [0, "&pound;"], [0, "&curren;"], [0, "&yen;"], [0, "&brvbar;"], [0, "&sect;"], [0, "&die;"], [0, "&copy;"], [0, "&ordf;"], [0, "&laquo;"], [0, "&not;"], [0, "&shy;"], [0, "&circledR;"], [0, "&macr;"], [0, "&deg;"], [0, "&PlusMinus;"], [0, "&sup2;"], [0, "&sup3;"], [0, "&acute;"], [0, "&micro;"], [0, "&para;"], [0, "&centerdot;"], [0, "&cedil;"], [0, "&sup1;"], [0, "&ordm;"], [0, "&raquo;"], [0, "&frac14;"], [0, "&frac12;"], [0, "&frac34;"], [0, "&iquest;"], [0, "&Agrave;"], [0, "&Aacute;"], [0, "&Acirc;"], [0, "&Atilde;"], [0, "&Auml;"], [0, "&angst;"], [0, "&AElig;"], [0, "&Ccedil;"], [0, "&Egrave;"], [0, "&Eacute;"], [0, "&Ecirc;"], [0, "&Euml;"], [0, "&Igrave;"], [0, "&Iacute;"], [0, "&Icirc;"], [0, "&Iuml;"], [0, "&ETH;"], [0, "&Ntilde;"], [0, "&Ograve;"], [0, "&Oacute;"], [0, "&Ocirc;"], [0, "&Otilde;"], [0, "&Ouml;"], [0, "&times;"], [0, "&Oslash;"], [0, "&Ugrave;"], [0, "&Uacute;"], [0, "&Ucirc;"], [0, "&Uuml;"], [0, "&Yacute;"], [0, "&THORN;"], [0, "&szlig;"], [0, "&agrave;"], [0, "&aacute;"], [0, "&acirc;"], [0, "&atilde;"], [0, "&auml;"], [0, "&aring;"], [0, "&aelig;"], [0, "&ccedil;"], [0, "&egrave;"], [0, "&eacute;"], [0, "&ecirc;"], [0, "&euml;"], [0, "&igrave;"], [0, "&iacute;"], [0, "&icirc;"], [0, "&iuml;"], [0, "&eth;"], [0, "&ntilde;"], [0, "&ograve;"], [0, "&oacute;"], [0, "&ocirc;"], [0, "&otilde;"], [0, "&ouml;"], [0, "&div;"], [0, "&oslash;"], [0, "&ugrave;"], [0, "&uacute;"], [0, "&ucirc;"], [0, "&uuml;"], [0, "&yacute;"], [0, "&thorn;"], [0, "&yuml;"], [0, "&Amacr;"], [0, "&amacr;"], [0, "&Abreve;"], [0, "&abreve;"], [0, "&Aogon;"], [0, "&aogon;"], [0, "&Cacute;"], [0, "&cacute;"], [0, "&Ccirc;"], [0, "&ccirc;"], [0, "&Cdot;"], [0, "&cdot;"], [0, "&Ccaron;"], [0, "&ccaron;"], [0, "&Dcaron;"], [0, "&dcaron;"], [0, "&Dstrok;"], [0, "&dstrok;"], [0, "&Emacr;"], [0, "&emacr;"], [2, "&Edot;"], [0, "&edot;"], [0, "&Eogon;"], [0, "&eogon;"], [0, "&Ecaron;"], [0, "&ecaron;"], [0, "&Gcirc;"], [0, "&gcirc;"], [0, "&Gbreve;"], [0, "&gbreve;"], [0, "&Gdot;"], [0, "&gdot;"], [0, "&Gcedil;"], [1, "&Hcirc;"], [0, "&hcirc;"], [0, "&Hstrok;"], [0, "&hstrok;"], [0, "&Itilde;"], [0, "&itilde;"], [0, "&Imacr;"], [0, "&imacr;"], [2, "&Iogon;"], [0, "&iogon;"], [0, "&Idot;"], [0, "&imath;"], [0, "&IJlig;"], [0, "&ijlig;"], [0, "&Jcirc;"], [0, "&jcirc;"], [0, "&Kcedil;"], [0, "&kcedil;"], [0, "&kgreen;"], [0, "&Lacute;"], [0, "&lacute;"], [0, "&Lcedil;"], [0, "&lcedil;"], [0, "&Lcaron;"], [0, "&lcaron;"], [0, "&Lmidot;"], [0, "&lmidot;"], [0, "&Lstrok;"], [0, "&lstrok;"], [0, "&Nacute;"], [0, "&nacute;"], [0, "&Ncedil;"], [0, "&ncedil;"], [0, "&Ncaron;"], [0, "&ncaron;"], [0, "&napos;"], [0, "&ENG;"], [0, "&eng;"], [0, "&Omacr;"], [0, "&omacr;"], [2, "&Odblac;"], [0, "&odblac;"], [0, "&OElig;"], [0, "&oelig;"], [0, "&Racute;"], [0, "&racute;"], [0, "&Rcedil;"], [0, "&rcedil;"], [0, "&Rcaron;"], [0, "&rcaron;"], [0, "&Sacute;"], [0, "&sacute;"], [0, "&Scirc;"], [0, "&scirc;"], [0, "&Scedil;"], [0, "&scedil;"], [0, "&Scaron;"], [0, "&scaron;"], [0, "&Tcedil;"], [0, "&tcedil;"], [0, "&Tcaron;"], [0, "&tcaron;"], [0, "&Tstrok;"], [0, "&tstrok;"], [0, "&Utilde;"], [0, "&utilde;"], [0, "&Umacr;"], [0, "&umacr;"], [0, "&Ubreve;"], [0, "&ubreve;"], [0, "&Uring;"], [0, "&uring;"], [0, "&Udblac;"], [0, "&udblac;"], [0, "&Uogon;"], [0, "&uogon;"], [0, "&Wcirc;"], [0, "&wcirc;"], [0, "&Ycirc;"], [0, "&ycirc;"], [0, "&Yuml;"], [0, "&Zacute;"], [0, "&zacute;"], [0, "&Zdot;"], [0, "&zdot;"], [0, "&Zcaron;"], [0, "&zcaron;"], [19, "&fnof;"], [34, "&imped;"], [63, "&gacute;"], [65, "&jmath;"], [142, "&circ;"], [0, "&caron;"], [16, "&breve;"], [0, "&DiacriticalDot;"], [0, "&ring;"], [0, "&ogon;"], [0, "&DiacriticalTilde;"], [0, "&dblac;"], [51, "&DownBreve;"], [127, "&Alpha;"], [0, "&Beta;"], [0, "&Gamma;"], [0, "&Delta;"], [0, "&Epsilon;"], [0, "&Zeta;"], [0, "&Eta;"], [0, "&Theta;"], [0, "&Iota;"], [0, "&Kappa;"], [0, "&Lambda;"], [0, "&Mu;"], [0, "&Nu;"], [0, "&Xi;"], [0, "&Omicron;"], [0, "&Pi;"], [0, "&Rho;"], [1, "&Sigma;"], [0, "&Tau;"], [0, "&Upsilon;"], [0, "&Phi;"], [0, "&Chi;"], [0, "&Psi;"], [0, "&ohm;"], [7, "&alpha;"], [0, "&beta;"], [0, "&gamma;"], [0, "&delta;"], [0, "&epsi;"], [0, "&zeta;"], [0, "&eta;"], [0, "&theta;"], [0, "&iota;"], [0, "&kappa;"], [0, "&lambda;"], [0, "&mu;"], [0, "&nu;"], [0, "&xi;"], [0, "&omicron;"], [0, "&pi;"], [0, "&rho;"], [0, "&sigmaf;"], [0, "&sigma;"], [0, "&tau;"], [0, "&upsi;"], [0, "&phi;"], [0, "&chi;"], [0, "&psi;"], [0, "&omega;"], [7, "&thetasym;"], [0, "&Upsi;"], [2, "&phiv;"], [0, "&piv;"], [5, "&Gammad;"], [0, "&digamma;"], [18, "&kappav;"], [0, "&rhov;"], [3, "&epsiv;"], [0, "&backepsilon;"], [10, "&IOcy;"], [0, "&DJcy;"], [0, "&GJcy;"], [0, "&Jukcy;"], [0, "&DScy;"], [0, "&Iukcy;"], [0, "&YIcy;"], [0, "&Jsercy;"], [0, "&LJcy;"], [0, "&NJcy;"], [0, "&TSHcy;"], [0, "&KJcy;"], [1, "&Ubrcy;"], [0, "&DZcy;"], [0, "&Acy;"], [0, "&Bcy;"], [0, "&Vcy;"], [0, "&Gcy;"], [0, "&Dcy;"], [0, "&IEcy;"], [0, "&ZHcy;"], [0, "&Zcy;"], [0, "&Icy;"], [0, "&Jcy;"], [0, "&Kcy;"], [0, "&Lcy;"], [0, "&Mcy;"], [0, "&Ncy;"], [0, "&Ocy;"], [0, "&Pcy;"], [0, "&Rcy;"], [0, "&Scy;"], [0, "&Tcy;"], [0, "&Ucy;"], [0, "&Fcy;"], [0, "&KHcy;"], [0, "&TScy;"], [0, "&CHcy;"], [0, "&SHcy;"], [0, "&SHCHcy;"], [0, "&HARDcy;"], [0, "&Ycy;"], [0, "&SOFTcy;"], [0, "&Ecy;"], [0, "&YUcy;"], [0, "&YAcy;"], [0, "&acy;"], [0, "&bcy;"], [0, "&vcy;"], [0, "&gcy;"], [0, "&dcy;"], [0, "&iecy;"], [0, "&zhcy;"], [0, "&zcy;"], [0, "&icy;"], [0, "&jcy;"], [0, "&kcy;"], [0, "&lcy;"], [0, "&mcy;"], [0, "&ncy;"], [0, "&ocy;"], [0, "&pcy;"], [0, "&rcy;"], [0, "&scy;"], [0, "&tcy;"], [0, "&ucy;"], [0, "&fcy;"], [0, "&khcy;"], [0, "&tscy;"], [0, "&chcy;"], [0, "&shcy;"], [0, "&shchcy;"], [0, "&hardcy;"], [0, "&ycy;"], [0, "&softcy;"], [0, "&ecy;"], [0, "&yucy;"], [0, "&yacy;"], [1, "&iocy;"], [0, "&djcy;"], [0, "&gjcy;"], [0, "&jukcy;"], [0, "&dscy;"], [0, "&iukcy;"], [0, "&yicy;"], [0, "&jsercy;"], [0, "&ljcy;"], [0, "&njcy;"], [0, "&tshcy;"], [0, "&kjcy;"], [1, "&ubrcy;"], [0, "&dzcy;"], [7074, "&ensp;"], [0, "&emsp;"], [0, "&emsp13;"], [0, "&emsp14;"], [1, "&numsp;"], [0, "&puncsp;"], [0, "&ThinSpace;"], [0, "&hairsp;"], [0, "&NegativeMediumSpace;"], [0, "&zwnj;"], [0, "&zwj;"], [0, "&lrm;"], [0, "&rlm;"], [0, "&dash;"], [2, "&ndash;"], [0, "&mdash;"], [0, "&horbar;"], [0, "&Verbar;"], [1, "&lsquo;"], [0, "&CloseCurlyQuote;"], [0, "&lsquor;"], [1, "&ldquo;"], [0, "&CloseCurlyDoubleQuote;"], [0, "&bdquo;"], [1, "&dagger;"], [0, "&Dagger;"], [0, "&bull;"], [2, "&nldr;"], [0, "&hellip;"], [9, "&permil;"], [0, "&pertenk;"], [0, "&prime;"], [0, "&Prime;"], [0, "&tprime;"], [0, "&backprime;"], [3, "&lsaquo;"], [0, "&rsaquo;"], [3, "&oline;"], [2, "&caret;"], [1, "&hybull;"], [0, "&frasl;"], [10, "&bsemi;"], [7, "&qprime;"], [7, { v: "&MediumSpace;", n: 8202, o: "&ThickSpace;" }], [0, "&NoBreak;"], [0, "&af;"], [0, "&InvisibleTimes;"], [0, "&ic;"], [72, "&euro;"], [46, "&tdot;"], [0, "&DotDot;"], [37, "&complexes;"], [2, "&incare;"], [4, "&gscr;"], [0, "&hamilt;"], [0, "&Hfr;"], [0, "&Hopf;"], [0, "&planckh;"], [0, "&hbar;"], [0, "&imagline;"], [0, "&Ifr;"], [0, "&lagran;"], [0, "&ell;"], [1, "&naturals;"], [0, "&numero;"], [0, "&copysr;"], [0, "&weierp;"], [0, "&Popf;"], [0, "&Qopf;"], [0, "&realine;"], [0, "&real;"], [0, "&reals;"], [0, "&rx;"], [3, "&trade;"], [1, "&integers;"], [2, "&mho;"], [0, "&zeetrf;"], [0, "&iiota;"], [2, "&bernou;"], [0, "&Cayleys;"], [1, "&escr;"], [0, "&Escr;"], [0, "&Fouriertrf;"], [1, "&Mellintrf;"], [0, "&order;"], [0, "&alefsym;"], [0, "&beth;"], [0, "&gimel;"], [0, "&daleth;"], [12, "&CapitalDifferentialD;"], [0, "&dd;"], [0, "&ee;"], [0, "&ii;"], [10, "&frac13;"], [0, "&frac23;"], [0, "&frac15;"], [0, "&frac25;"], [0, "&frac35;"], [0, "&frac45;"], [0, "&frac16;"], [0, "&frac56;"], [0, "&frac18;"], [0, "&frac38;"], [0, "&frac58;"], [0, "&frac78;"], [49, "&larr;"], [0, "&ShortUpArrow;"], [0, "&rarr;"], [0, "&darr;"], [0, "&harr;"], [0, "&updownarrow;"], [0, "&nwarr;"], [0, "&nearr;"], [0, "&LowerRightArrow;"], [0, "&LowerLeftArrow;"], [0, "&nlarr;"], [0, "&nrarr;"], [1, { v: "&rarrw;", n: 824, o: "&nrarrw;" }], [0, "&Larr;"], [0, "&Uarr;"], [0, "&Rarr;"], [0, "&Darr;"], [0, "&larrtl;"], [0, "&rarrtl;"], [0, "&LeftTeeArrow;"], [0, "&mapstoup;"], [0, "&map;"], [0, "&DownTeeArrow;"], [1, "&hookleftarrow;"], [0, "&hookrightarrow;"], [0, "&larrlp;"], [0, "&looparrowright;"], [0, "&harrw;"], [0, "&nharr;"], [1, "&lsh;"], [0, "&rsh;"], [0, "&ldsh;"], [0, "&rdsh;"], [1, "&crarr;"], [0, "&cularr;"], [0, "&curarr;"], [2, "&circlearrowleft;"], [0, "&circlearrowright;"], [0, "&leftharpoonup;"], [0, "&DownLeftVector;"], [0, "&RightUpVector;"], [0, "&LeftUpVector;"], [0, "&rharu;"], [0, "&DownRightVector;"], [0, "&dharr;"], [0, "&dharl;"], [0, "&RightArrowLeftArrow;"], [0, "&udarr;"], [0, "&LeftArrowRightArrow;"], [0, "&leftleftarrows;"], [0, "&upuparrows;"], [0, "&rightrightarrows;"], [0, "&ddarr;"], [0, "&leftrightharpoons;"], [0, "&Equilibrium;"], [0, "&nlArr;"], [0, "&nhArr;"], [0, "&nrArr;"], [0, "&DoubleLeftArrow;"], [0, "&DoubleUpArrow;"], [0, "&DoubleRightArrow;"], [0, "&dArr;"], [0, "&DoubleLeftRightArrow;"], [0, "&DoubleUpDownArrow;"], [0, "&nwArr;"], [0, "&neArr;"], [0, "&seArr;"], [0, "&swArr;"], [0, "&lAarr;"], [0, "&rAarr;"], [1, "&zigrarr;"], [6, "&larrb;"], [0, "&rarrb;"], [15, "&DownArrowUpArrow;"], [7, "&loarr;"], [0, "&roarr;"], [0, "&hoarr;"], [0, "&forall;"], [0, "&comp;"], [0, { v: "&part;", n: 824, o: "&npart;" }], [0, "&exist;"], [0, "&nexist;"], [0, "&empty;"], [1, "&Del;"], [0, "&Element;"], [0, "&NotElement;"], [1, "&ni;"], [0, "&notni;"], [2, "&prod;"], [0, "&coprod;"], [0, "&sum;"], [0, "&minus;"], [0, "&MinusPlus;"], [0, "&dotplus;"], [1, "&Backslash;"], [0, "&lowast;"], [0, "&compfn;"], [1, "&radic;"], [2, "&prop;"], [0, "&infin;"], [0, "&angrt;"], [0, { v: "&ang;", n: 8402, o: "&nang;" }], [0, "&angmsd;"], [0, "&angsph;"], [0, "&mid;"], [0, "&nmid;"], [0, "&DoubleVerticalBar;"], [0, "&NotDoubleVerticalBar;"], [0, "&and;"], [0, "&or;"], [0, { v: "&cap;", n: 65024, o: "&caps;" }], [0, { v: "&cup;", n: 65024, o: "&cups;" }], [0, "&int;"], [0, "&Int;"], [0, "&iiint;"], [0, "&conint;"], [0, "&Conint;"], [0, "&Cconint;"], [0, "&cwint;"], [0, "&ClockwiseContourIntegral;"], [0, "&awconint;"], [0, "&there4;"], [0, "&becaus;"], [0, "&ratio;"], [0, "&Colon;"], [0, "&dotminus;"], [1, "&mDDot;"], [0, "&homtht;"], [0, { v: "&sim;", n: 8402, o: "&nvsim;" }], [0, { v: "&backsim;", n: 817, o: "&race;" }], [0, { v: "&ac;", n: 819, o: "&acE;" }], [0, "&acd;"], [0, "&VerticalTilde;"], [0, "&NotTilde;"], [0, { v: "&eqsim;", n: 824, o: "&nesim;" }], [0, "&sime;"], [0, "&NotTildeEqual;"], [0, "&cong;"], [0, "&simne;"], [0, "&ncong;"], [0, "&ap;"], [0, "&nap;"], [0, "&ape;"], [0, { v: "&apid;", n: 824, o: "&napid;" }], [0, "&backcong;"], [0, { v: "&asympeq;", n: 8402, o: "&nvap;" }], [0, { v: "&bump;", n: 824, o: "&nbump;" }], [0, { v: "&bumpe;", n: 824, o: "&nbumpe;" }], [0, { v: "&doteq;", n: 824, o: "&nedot;" }], [0, "&doteqdot;"], [0, "&efDot;"], [0, "&erDot;"], [0, "&Assign;"], [0, "&ecolon;"], [0, "&ecir;"], [0, "&circeq;"], [1, "&wedgeq;"], [0, "&veeeq;"], [1, "&triangleq;"], [2, "&equest;"], [0, "&ne;"], [0, { v: "&Congruent;", n: 8421, o: "&bnequiv;" }], [0, "&nequiv;"], [1, { v: "&le;", n: 8402, o: "&nvle;" }], [0, { v: "&ge;", n: 8402, o: "&nvge;" }], [0, { v: "&lE;", n: 824, o: "&nlE;" }], [0, { v: "&gE;", n: 824, o: "&ngE;" }], [0, { v: "&lnE;", n: 65024, o: "&lvertneqq;" }], [0, { v: "&gnE;", n: 65024, o: "&gvertneqq;" }], [0, { v: "&ll;", n: new Map(/* @__PURE__ */ Pr([[824, "&nLtv;"], [7577, "&nLt;"]])) }], [0, { v: "&gg;", n: new Map(/* @__PURE__ */ Pr([[824, "&nGtv;"], [7577, "&nGt;"]])) }], [0, "&between;"], [0, "&NotCupCap;"], [0, "&nless;"], [0, "&ngt;"], [0, "&nle;"], [0, "&nge;"], [0, "&lesssim;"], [0, "&GreaterTilde;"], [0, "&nlsim;"], [0, "&ngsim;"], [0, "&LessGreater;"], [0, "&gl;"], [0, "&NotLessGreater;"], [0, "&NotGreaterLess;"], [0, "&pr;"], [0, "&sc;"], [0, "&prcue;"], [0, "&sccue;"], [0, "&PrecedesTilde;"], [0, { v: "&scsim;", n: 824, o: "&NotSucceedsTilde;" }], [0, "&NotPrecedes;"], [0, "&NotSucceeds;"], [0, { v: "&sub;", n: 8402, o: "&NotSubset;" }], [0, { v: "&sup;", n: 8402, o: "&NotSuperset;" }], [0, "&nsub;"], [0, "&nsup;"], [0, "&sube;"], [0, "&supe;"], [0, "&NotSubsetEqual;"], [0, "&NotSupersetEqual;"], [0, { v: "&subne;", n: 65024, o: "&varsubsetneq;" }], [0, { v: "&supne;", n: 65024, o: "&varsupsetneq;" }], [1, "&cupdot;"], [0, "&UnionPlus;"], [0, { v: "&sqsub;", n: 824, o: "&NotSquareSubset;" }], [0, { v: "&sqsup;", n: 824, o: "&NotSquareSuperset;" }], [0, "&sqsube;"], [0, "&sqsupe;"], [0, { v: "&sqcap;", n: 65024, o: "&sqcaps;" }], [0, { v: "&sqcup;", n: 65024, o: "&sqcups;" }], [0, "&CirclePlus;"], [0, "&CircleMinus;"], [0, "&CircleTimes;"], [0, "&osol;"], [0, "&CircleDot;"], [0, "&circledcirc;"], [0, "&circledast;"], [1, "&circleddash;"], [0, "&boxplus;"], [0, "&boxminus;"], [0, "&boxtimes;"], [0, "&dotsquare;"], [0, "&RightTee;"], [0, "&dashv;"], [0, "&DownTee;"], [0, "&bot;"], [1, "&models;"], [0, "&DoubleRightTee;"], [0, "&Vdash;"], [0, "&Vvdash;"], [0, "&VDash;"], [0, "&nvdash;"], [0, "&nvDash;"], [0, "&nVdash;"], [0, "&nVDash;"], [0, "&prurel;"], [1, "&LeftTriangle;"], [0, "&RightTriangle;"], [0, { v: "&LeftTriangleEqual;", n: 8402, o: "&nvltrie;" }], [0, { v: "&RightTriangleEqual;", n: 8402, o: "&nvrtrie;" }], [0, "&origof;"], [0, "&imof;"], [0, "&multimap;"], [0, "&hercon;"], [0, "&intcal;"], [0, "&veebar;"], [1, "&barvee;"], [0, "&angrtvb;"], [0, "&lrtri;"], [0, "&bigwedge;"], [0, "&bigvee;"], [0, "&bigcap;"], [0, "&bigcup;"], [0, "&diam;"], [0, "&sdot;"], [0, "&sstarf;"], [0, "&divideontimes;"], [0, "&bowtie;"], [0, "&ltimes;"], [0, "&rtimes;"], [0, "&leftthreetimes;"], [0, "&rightthreetimes;"], [0, "&backsimeq;"], [0, "&curlyvee;"], [0, "&curlywedge;"], [0, "&Sub;"], [0, "&Sup;"], [0, "&Cap;"], [0, "&Cup;"], [0, "&fork;"], [0, "&epar;"], [0, "&lessdot;"], [0, "&gtdot;"], [0, { v: "&Ll;", n: 824, o: "&nLl;" }], [0, { v: "&Gg;", n: 824, o: "&nGg;" }], [0, { v: "&leg;", n: 65024, o: "&lesg;" }], [0, { v: "&gel;", n: 65024, o: "&gesl;" }], [2, "&cuepr;"], [0, "&cuesc;"], [0, "&NotPrecedesSlantEqual;"], [0, "&NotSucceedsSlantEqual;"], [0, "&NotSquareSubsetEqual;"], [0, "&NotSquareSupersetEqual;"], [2, "&lnsim;"], [0, "&gnsim;"], [0, "&precnsim;"], [0, "&scnsim;"], [0, "&nltri;"], [0, "&NotRightTriangle;"], [0, "&nltrie;"], [0, "&NotRightTriangleEqual;"], [0, "&vellip;"], [0, "&ctdot;"], [0, "&utdot;"], [0, "&dtdot;"], [0, "&disin;"], [0, "&isinsv;"], [0, "&isins;"], [0, { v: "&isindot;", n: 824, o: "&notindot;" }], [0, "&notinvc;"], [0, "&notinvb;"], [1, { v: "&isinE;", n: 824, o: "&notinE;" }], [0, "&nisd;"], [0, "&xnis;"], [0, "&nis;"], [0, "&notnivc;"], [0, "&notnivb;"], [6, "&barwed;"], [0, "&Barwed;"], [1, "&lceil;"], [0, "&rceil;"], [0, "&LeftFloor;"], [0, "&rfloor;"], [0, "&drcrop;"], [0, "&dlcrop;"], [0, "&urcrop;"], [0, "&ulcrop;"], [0, "&bnot;"], [1, "&profline;"], [0, "&profsurf;"], [1, "&telrec;"], [0, "&target;"], [5, "&ulcorn;"], [0, "&urcorn;"], [0, "&dlcorn;"], [0, "&drcorn;"], [2, "&frown;"], [0, "&smile;"], [9, "&cylcty;"], [0, "&profalar;"], [7, "&topbot;"], [6, "&ovbar;"], [1, "&solbar;"], [60, "&angzarr;"], [51, "&lmoustache;"], [0, "&rmoustache;"], [2, "&OverBracket;"], [0, "&bbrk;"], [0, "&bbrktbrk;"], [37, "&OverParenthesis;"], [0, "&UnderParenthesis;"], [0, "&OverBrace;"], [0, "&UnderBrace;"], [2, "&trpezium;"], [4, "&elinters;"], [59, "&blank;"], [164, "&circledS;"], [55, "&boxh;"], [1, "&boxv;"], [9, "&boxdr;"], [3, "&boxdl;"], [3, "&boxur;"], [3, "&boxul;"], [3, "&boxvr;"], [7, "&boxvl;"], [7, "&boxhd;"], [7, "&boxhu;"], [7, "&boxvh;"], [19, "&boxH;"], [0, "&boxV;"], [0, "&boxdR;"], [0, "&boxDr;"], [0, "&boxDR;"], [0, "&boxdL;"], [0, "&boxDl;"], [0, "&boxDL;"], [0, "&boxuR;"], [0, "&boxUr;"], [0, "&boxUR;"], [0, "&boxuL;"], [0, "&boxUl;"], [0, "&boxUL;"], [0, "&boxvR;"], [0, "&boxVr;"], [0, "&boxVR;"], [0, "&boxvL;"], [0, "&boxVl;"], [0, "&boxVL;"], [0, "&boxHd;"], [0, "&boxhD;"], [0, "&boxHD;"], [0, "&boxHu;"], [0, "&boxhU;"], [0, "&boxHU;"], [0, "&boxvH;"], [0, "&boxVh;"], [0, "&boxVH;"], [19, "&uhblk;"], [3, "&lhblk;"], [3, "&block;"], [8, "&blk14;"], [0, "&blk12;"], [0, "&blk34;"], [13, "&square;"], [8, "&blacksquare;"], [0, "&EmptyVerySmallSquare;"], [1, "&rect;"], [0, "&marker;"], [2, "&fltns;"], [1, "&bigtriangleup;"], [0, "&blacktriangle;"], [0, "&triangle;"], [2, "&blacktriangleright;"], [0, "&rtri;"], [3, "&bigtriangledown;"], [0, "&blacktriangledown;"], [0, "&dtri;"], [2, "&blacktriangleleft;"], [0, "&ltri;"], [6, "&loz;"], [0, "&cir;"], [32, "&tridot;"], [2, "&bigcirc;"], [8, "&ultri;"], [0, "&urtri;"], [0, "&lltri;"], [0, "&EmptySmallSquare;"], [0, "&FilledSmallSquare;"], [8, "&bigstar;"], [0, "&star;"], [7, "&phone;"], [49, "&female;"], [1, "&male;"], [29, "&spades;"], [2, "&clubs;"], [1, "&hearts;"], [0, "&diamondsuit;"], [3, "&sung;"], [2, "&flat;"], [0, "&natural;"], [0, "&sharp;"], [163, "&check;"], [3, "&cross;"], [8, "&malt;"], [21, "&sext;"], [33, "&VerticalSeparator;"], [25, "&lbbrk;"], [0, "&rbbrk;"], [84, "&bsolhsub;"], [0, "&suphsol;"], [28, "&LeftDoubleBracket;"], [0, "&RightDoubleBracket;"], [0, "&lang;"], [0, "&rang;"], [0, "&Lang;"], [0, "&Rang;"], [0, "&loang;"], [0, "&roang;"], [7, "&longleftarrow;"], [0, "&longrightarrow;"], [0, "&longleftrightarrow;"], [0, "&DoubleLongLeftArrow;"], [0, "&DoubleLongRightArrow;"], [0, "&DoubleLongLeftRightArrow;"], [1, "&longmapsto;"], [2, "&dzigrarr;"], [258, "&nvlArr;"], [0, "&nvrArr;"], [0, "&nvHarr;"], [0, "&Map;"], [6, "&lbarr;"], [0, "&bkarow;"], [0, "&lBarr;"], [0, "&dbkarow;"], [0, "&drbkarow;"], [0, "&DDotrahd;"], [0, "&UpArrowBar;"], [0, "&DownArrowBar;"], [2, "&Rarrtl;"], [2, "&latail;"], [0, "&ratail;"], [0, "&lAtail;"], [0, "&rAtail;"], [0, "&larrfs;"], [0, "&rarrfs;"], [0, "&larrbfs;"], [0, "&rarrbfs;"], [2, "&nwarhk;"], [0, "&nearhk;"], [0, "&hksearow;"], [0, "&hkswarow;"], [0, "&nwnear;"], [0, "&nesear;"], [0, "&seswar;"], [0, "&swnwar;"], [8, { v: "&rarrc;", n: 824, o: "&nrarrc;" }], [1, "&cudarrr;"], [0, "&ldca;"], [0, "&rdca;"], [0, "&cudarrl;"], [0, "&larrpl;"], [2, "&curarrm;"], [0, "&cularrp;"], [7, "&rarrpl;"], [2, "&harrcir;"], [0, "&Uarrocir;"], [0, "&lurdshar;"], [0, "&ldrushar;"], [2, "&LeftRightVector;"], [0, "&RightUpDownVector;"], [0, "&DownLeftRightVector;"], [0, "&LeftUpDownVector;"], [0, "&LeftVectorBar;"], [0, "&RightVectorBar;"], [0, "&RightUpVectorBar;"], [0, "&RightDownVectorBar;"], [0, "&DownLeftVectorBar;"], [0, "&DownRightVectorBar;"], [0, "&LeftUpVectorBar;"], [0, "&LeftDownVectorBar;"], [0, "&LeftTeeVector;"], [0, "&RightTeeVector;"], [0, "&RightUpTeeVector;"], [0, "&RightDownTeeVector;"], [0, "&DownLeftTeeVector;"], [0, "&DownRightTeeVector;"], [0, "&LeftUpTeeVector;"], [0, "&LeftDownTeeVector;"], [0, "&lHar;"], [0, "&uHar;"], [0, "&rHar;"], [0, "&dHar;"], [0, "&luruhar;"], [0, "&ldrdhar;"], [0, "&ruluhar;"], [0, "&rdldhar;"], [0, "&lharul;"], [0, "&llhard;"], [0, "&rharul;"], [0, "&lrhard;"], [0, "&udhar;"], [0, "&duhar;"], [0, "&RoundImplies;"], [0, "&erarr;"], [0, "&simrarr;"], [0, "&larrsim;"], [0, "&rarrsim;"], [0, "&rarrap;"], [0, "&ltlarr;"], [1, "&gtrarr;"], [0, "&subrarr;"], [1, "&suplarr;"], [0, "&lfisht;"], [0, "&rfisht;"], [0, "&ufisht;"], [0, "&dfisht;"], [5, "&lopar;"], [0, "&ropar;"], [4, "&lbrke;"], [0, "&rbrke;"], [0, "&lbrkslu;"], [0, "&rbrksld;"], [0, "&lbrksld;"], [0, "&rbrkslu;"], [0, "&langd;"], [0, "&rangd;"], [0, "&lparlt;"], [0, "&rpargt;"], [0, "&gtlPar;"], [0, "&ltrPar;"], [3, "&vzigzag;"], [1, "&vangrt;"], [0, "&angrtvbd;"], [6, "&ange;"], [0, "&range;"], [0, "&dwangle;"], [0, "&uwangle;"], [0, "&angmsdaa;"], [0, "&angmsdab;"], [0, "&angmsdac;"], [0, "&angmsdad;"], [0, "&angmsdae;"], [0, "&angmsdaf;"], [0, "&angmsdag;"], [0, "&angmsdah;"], [0, "&bemptyv;"], [0, "&demptyv;"], [0, "&cemptyv;"], [0, "&raemptyv;"], [0, "&laemptyv;"], [0, "&ohbar;"], [0, "&omid;"], [0, "&opar;"], [1, "&operp;"], [1, "&olcross;"], [0, "&odsold;"], [1, "&olcir;"], [0, "&ofcir;"], [0, "&olt;"], [0, "&ogt;"], [0, "&cirscir;"], [0, "&cirE;"], [0, "&solb;"], [0, "&bsolb;"], [3, "&boxbox;"], [3, "&trisb;"], [0, "&rtriltri;"], [0, { v: "&LeftTriangleBar;", n: 824, o: "&NotLeftTriangleBar;" }], [0, { v: "&RightTriangleBar;", n: 824, o: "&NotRightTriangleBar;" }], [11, "&iinfin;"], [0, "&infintie;"], [0, "&nvinfin;"], [4, "&eparsl;"], [0, "&smeparsl;"], [0, "&eqvparsl;"], [5, "&blacklozenge;"], [8, "&RuleDelayed;"], [1, "&dsol;"], [9, "&bigodot;"], [0, "&bigoplus;"], [0, "&bigotimes;"], [1, "&biguplus;"], [1, "&bigsqcup;"], [5, "&iiiint;"], [0, "&fpartint;"], [2, "&cirfnint;"], [0, "&awint;"], [0, "&rppolint;"], [0, "&scpolint;"], [0, "&npolint;"], [0, "&pointint;"], [0, "&quatint;"], [0, "&intlarhk;"], [10, "&pluscir;"], [0, "&plusacir;"], [0, "&simplus;"], [0, "&plusdu;"], [0, "&plussim;"], [0, "&plustwo;"], [1, "&mcomma;"], [0, "&minusdu;"], [2, "&loplus;"], [0, "&roplus;"], [0, "&Cross;"], [0, "&timesd;"], [0, "&timesbar;"], [1, "&smashp;"], [0, "&lotimes;"], [0, "&rotimes;"], [0, "&otimesas;"], [0, "&Otimes;"], [0, "&odiv;"], [0, "&triplus;"], [0, "&triminus;"], [0, "&tritime;"], [0, "&intprod;"], [2, "&amalg;"], [0, "&capdot;"], [1, "&ncup;"], [0, "&ncap;"], [0, "&capand;"], [0, "&cupor;"], [0, "&cupcap;"], [0, "&capcup;"], [0, "&cupbrcap;"], [0, "&capbrcup;"], [0, "&cupcup;"], [0, "&capcap;"], [0, "&ccups;"], [0, "&ccaps;"], [2, "&ccupssm;"], [2, "&And;"], [0, "&Or;"], [0, "&andand;"], [0, "&oror;"], [0, "&orslope;"], [0, "&andslope;"], [1, "&andv;"], [0, "&orv;"], [0, "&andd;"], [0, "&ord;"], [1, "&wedbar;"], [6, "&sdote;"], [3, "&simdot;"], [2, { v: "&congdot;", n: 824, o: "&ncongdot;" }], [0, "&easter;"], [0, "&apacir;"], [0, { v: "&apE;", n: 824, o: "&napE;" }], [0, "&eplus;"], [0, "&pluse;"], [0, "&Esim;"], [0, "&Colone;"], [0, "&Equal;"], [1, "&ddotseq;"], [0, "&equivDD;"], [0, "&ltcir;"], [0, "&gtcir;"], [0, "&ltquest;"], [0, "&gtquest;"], [0, { v: "&leqslant;", n: 824, o: "&nleqslant;" }], [0, { v: "&geqslant;", n: 824, o: "&ngeqslant;" }], [0, "&lesdot;"], [0, "&gesdot;"], [0, "&lesdoto;"], [0, "&gesdoto;"], [0, "&lesdotor;"], [0, "&gesdotol;"], [0, "&lap;"], [0, "&gap;"], [0, "&lne;"], [0, "&gne;"], [0, "&lnap;"], [0, "&gnap;"], [0, "&lEg;"], [0, "&gEl;"], [0, "&lsime;"], [0, "&gsime;"], [0, "&lsimg;"], [0, "&gsiml;"], [0, "&lgE;"], [0, "&glE;"], [0, "&lesges;"], [0, "&gesles;"], [0, "&els;"], [0, "&egs;"], [0, "&elsdot;"], [0, "&egsdot;"], [0, "&el;"], [0, "&eg;"], [2, "&siml;"], [0, "&simg;"], [0, "&simlE;"], [0, "&simgE;"], [0, { v: "&LessLess;", n: 824, o: "&NotNestedLessLess;" }], [0, { v: "&GreaterGreater;", n: 824, o: "&NotNestedGreaterGreater;" }], [1, "&glj;"], [0, "&gla;"], [0, "&ltcc;"], [0, "&gtcc;"], [0, "&lescc;"], [0, "&gescc;"], [0, "&smt;"], [0, "&lat;"], [0, { v: "&smte;", n: 65024, o: "&smtes;" }], [0, { v: "&late;", n: 65024, o: "&lates;" }], [0, "&bumpE;"], [0, { v: "&PrecedesEqual;", n: 824, o: "&NotPrecedesEqual;" }], [0, { v: "&sce;", n: 824, o: "&NotSucceedsEqual;" }], [2, "&prE;"], [0, "&scE;"], [0, "&precneqq;"], [0, "&scnE;"], [0, "&prap;"], [0, "&scap;"], [0, "&precnapprox;"], [0, "&scnap;"], [0, "&Pr;"], [0, "&Sc;"], [0, "&subdot;"], [0, "&supdot;"], [0, "&subplus;"], [0, "&supplus;"], [0, "&submult;"], [0, "&supmult;"], [0, "&subedot;"], [0, "&supedot;"], [0, { v: "&subE;", n: 824, o: "&nsubE;" }], [0, { v: "&supE;", n: 824, o: "&nsupE;" }], [0, "&subsim;"], [0, "&supsim;"], [2, { v: "&subnE;", n: 65024, o: "&varsubsetneqq;" }], [0, { v: "&supnE;", n: 65024, o: "&varsupsetneqq;" }], [2, "&csub;"], [0, "&csup;"], [0, "&csube;"], [0, "&csupe;"], [0, "&subsup;"], [0, "&supsub;"], [0, "&subsub;"], [0, "&supsup;"], [0, "&suphsub;"], [0, "&supdsub;"], [0, "&forkv;"], [0, "&topfork;"], [0, "&mlcp;"], [8, "&Dashv;"], [1, "&Vdashl;"], [0, "&Barv;"], [0, "&vBar;"], [0, "&vBarv;"], [1, "&Vbar;"], [0, "&Not;"], [0, "&bNot;"], [0, "&rnmid;"], [0, "&cirmid;"], [0, "&midcir;"], [0, "&topcir;"], [0, "&nhpar;"], [0, "&parsim;"], [9, { v: "&parsl;", n: 8421, o: "&nparsl;" }], [44343, { n: new Map(/* @__PURE__ */ Pr([[56476, "&Ascr;"], [1, "&Cscr;"], [0, "&Dscr;"], [2, "&Gscr;"], [2, "&Jscr;"], [0, "&Kscr;"], [2, "&Nscr;"], [0, "&Oscr;"], [0, "&Pscr;"], [0, "&Qscr;"], [1, "&Sscr;"], [0, "&Tscr;"], [0, "&Uscr;"], [0, "&Vscr;"], [0, "&Wscr;"], [0, "&Xscr;"], [0, "&Yscr;"], [0, "&Zscr;"], [0, "&ascr;"], [0, "&bscr;"], [0, "&cscr;"], [0, "&dscr;"], [1, "&fscr;"], [1, "&hscr;"], [0, "&iscr;"], [0, "&jscr;"], [0, "&kscr;"], [0, "&lscr;"], [0, "&mscr;"], [0, "&nscr;"], [1, "&pscr;"], [0, "&qscr;"], [0, "&rscr;"], [0, "&sscr;"], [0, "&tscr;"], [0, "&uscr;"], [0, "&vscr;"], [0, "&wscr;"], [0, "&xscr;"], [0, "&yscr;"], [0, "&zscr;"], [52, "&Afr;"], [0, "&Bfr;"], [1, "&Dfr;"], [0, "&Efr;"], [0, "&Ffr;"], [0, "&Gfr;"], [2, "&Jfr;"], [0, "&Kfr;"], [0, "&Lfr;"], [0, "&Mfr;"], [0, "&Nfr;"], [0, "&Ofr;"], [0, "&Pfr;"], [0, "&Qfr;"], [1, "&Sfr;"], [0, "&Tfr;"], [0, "&Ufr;"], [0, "&Vfr;"], [0, "&Wfr;"], [0, "&Xfr;"], [0, "&Yfr;"], [1, "&afr;"], [0, "&bfr;"], [0, "&cfr;"], [0, "&dfr;"], [0, "&efr;"], [0, "&ffr;"], [0, "&gfr;"], [0, "&hfr;"], [0, "&ifr;"], [0, "&jfr;"], [0, "&kfr;"], [0, "&lfr;"], [0, "&mfr;"], [0, "&nfr;"], [0, "&ofr;"], [0, "&pfr;"], [0, "&qfr;"], [0, "&rfr;"], [0, "&sfr;"], [0, "&tfr;"], [0, "&ufr;"], [0, "&vfr;"], [0, "&wfr;"], [0, "&xfr;"], [0, "&yfr;"], [0, "&zfr;"], [0, "&Aopf;"], [0, "&Bopf;"], [1, "&Dopf;"], [0, "&Eopf;"], [0, "&Fopf;"], [0, "&Gopf;"], [1, "&Iopf;"], [0, "&Jopf;"], [0, "&Kopf;"], [0, "&Lopf;"], [0, "&Mopf;"], [1, "&Oopf;"], [3, "&Sopf;"], [0, "&Topf;"], [0, "&Uopf;"], [0, "&Vopf;"], [0, "&Wopf;"], [0, "&Xopf;"], [0, "&Yopf;"], [1, "&aopf;"], [0, "&bopf;"], [0, "&copf;"], [0, "&dopf;"], [0, "&eopf;"], [0, "&fopf;"], [0, "&gopf;"], [0, "&hopf;"], [0, "&iopf;"], [0, "&jopf;"], [0, "&kopf;"], [0, "&lopf;"], [0, "&mopf;"], [0, "&nopf;"], [0, "&oopf;"], [0, "&popf;"], [0, "&qopf;"], [0, "&ropf;"], [0, "&sopf;"], [0, "&topf;"], [0, "&uopf;"], [0, "&vopf;"], [0, "&wopf;"], [0, "&xopf;"], [0, "&yopf;"], [0, "&zopf;"]])) }], [8906, "&fflig;"], [0, "&filig;"], [0, "&fllig;"], [0, "&ffilig;"], [0, "&ffllig;"]]));
var oa = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.escapeText = e.escapeAttribute = e.escapeUTF8 = e.escape = e.encodeXML = e.getCodePoint = e.xmlReplacer = void 0, e.xmlReplacer = /["&'<>$\x80-\uFFFF]/g;
  var u = /* @__PURE__ */ new Map([
    [34, "&quot;"],
    [38, "&amp;"],
    [39, "&apos;"],
    [60, "&lt;"],
    [62, "&gt;"]
  ]);
  e.getCodePoint = // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  String.prototype.codePointAt != null ? function(a, n) {
    return a.codePointAt(n);
  } : (
    // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
    function(a, n) {
      return (a.charCodeAt(n) & 64512) === 55296 ? (a.charCodeAt(n) - 55296) * 1024 + a.charCodeAt(n + 1) - 56320 + 65536 : a.charCodeAt(n);
    }
  );
  function t(a) {
    for (var n = "", i = 0, s; (s = e.xmlReplacer.exec(a)) !== null; ) {
      var o = s.index, d = a.charCodeAt(o), c = u.get(d);
      c !== void 0 ? (n += a.substring(i, o) + c, i = o + 1) : (n += "".concat(a.substring(i, o), "&#x").concat((0, e.getCodePoint)(a, o).toString(16), ";"), i = e.xmlReplacer.lastIndex += +((d & 64512) === 55296));
    }
    return n + a.substr(i);
  }
  e.encodeXML = t, e.escape = t;
  function r(a, n) {
    return function(s) {
      for (var o, d = 0, c = ""; o = a.exec(s); )
        d !== o.index && (c += s.substring(d, o.index)), c += n.get(o[0].charCodeAt(0)), d = o.index + 1;
      return c + s.substring(d);
    };
  }
  e.escapeUTF8 = r(/[&<>'"]/g, u), e.escapeAttribute = r(/["&\u00A0]/g, /* @__PURE__ */ new Map([
    [34, "&quot;"],
    [38, "&amp;"],
    [160, "&nbsp;"]
  ])), e.escapeText = r(/[&<>\u00A0]/g, /* @__PURE__ */ new Map([
    [38, "&amp;"],
    [60, "&lt;"],
    [62, "&gt;"],
    [160, "&nbsp;"]
  ]));
})(oa);
var Wb = C && C.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(wt, "__esModule", { value: !0 });
wt.encodeNonAsciiHTML = wt.encodeHTML = void 0;
var Xb = Wb(tc), Dd = oa, zb = /[\t\n!-,./:-@[-`\f{-}$\x80-\uFFFF]/g;
function Qb(e) {
  return Cd(zb, e);
}
wt.encodeHTML = Qb;
function Kb(e) {
  return Cd(Dd.xmlReplacer, e);
}
wt.encodeNonAsciiHTML = Kb;
function Cd(e, u) {
  for (var t = "", r = 0, a; (a = e.exec(u)) !== null; ) {
    var n = a.index;
    t += u.substring(r, n);
    var i = u.charCodeAt(n), s = Xb.default.get(i);
    if (typeof s == "object") {
      if (n + 1 < u.length) {
        var o = u.charCodeAt(n + 1), d = typeof s.n == "number" ? s.n === o ? s.o : void 0 : s.n.get(o);
        if (d !== void 0) {
          t += d, r = e.lastIndex += 1;
          continue;
        }
      }
      s = s.v;
    }
    if (s !== void 0)
      t += s, r = n + 1;
    else {
      var c = (0, Dd.getCodePoint)(u, n);
      t += "&#x".concat(c.toString(16), ";"), r = e.lastIndex += +(c !== i);
    }
  }
  return t + u.substr(r);
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.decodeXMLStrict = e.decodeHTML5Strict = e.decodeHTML4Strict = e.decodeHTML5 = e.decodeHTML4 = e.decodeHTMLAttribute = e.decodeHTMLStrict = e.decodeHTML = e.decodeXML = e.DecodingMode = e.EntityDecoder = e.encodeHTML5 = e.encodeHTML4 = e.encodeNonAsciiHTML = e.encodeHTML = e.escapeText = e.escapeAttribute = e.escapeUTF8 = e.escape = e.encodeXML = e.encode = e.decodeStrict = e.decode = e.EncodingMode = e.EntityLevel = void 0;
  var u = si, t = wt, r = oa, a;
  (function(f) {
    f[f.XML = 0] = "XML", f[f.HTML = 1] = "HTML";
  })(a = e.EntityLevel || (e.EntityLevel = {}));
  var n;
  (function(f) {
    f[f.UTF8 = 0] = "UTF8", f[f.ASCII = 1] = "ASCII", f[f.Extensive = 2] = "Extensive", f[f.Attribute = 3] = "Attribute", f[f.Text = 4] = "Text";
  })(n = e.EncodingMode || (e.EncodingMode = {}));
  function i(f, m) {
    m === void 0 && (m = a.XML);
    var v = typeof m == "number" ? m : m.level;
    if (v === a.HTML) {
      var L = typeof m == "object" ? m.mode : void 0;
      return (0, u.decodeHTML)(f, L);
    }
    return (0, u.decodeXML)(f);
  }
  e.decode = i;
  function s(f, m) {
    var v;
    m === void 0 && (m = a.XML);
    var L = typeof m == "number" ? { level: m } : m;
    return (v = L.mode) !== null && v !== void 0 || (L.mode = u.DecodingMode.Strict), i(f, L);
  }
  e.decodeStrict = s;
  function o(f, m) {
    m === void 0 && (m = a.XML);
    var v = typeof m == "number" ? { level: m } : m;
    return v.mode === n.UTF8 ? (0, r.escapeUTF8)(f) : v.mode === n.Attribute ? (0, r.escapeAttribute)(f) : v.mode === n.Text ? (0, r.escapeText)(f) : v.level === a.HTML ? v.mode === n.ASCII ? (0, t.encodeNonAsciiHTML)(f) : (0, t.encodeHTML)(f) : (0, r.encodeXML)(f);
  }
  e.encode = o;
  var d = oa;
  Object.defineProperty(e, "encodeXML", { enumerable: !0, get: function() {
    return d.encodeXML;
  } }), Object.defineProperty(e, "escape", { enumerable: !0, get: function() {
    return d.escape;
  } }), Object.defineProperty(e, "escapeUTF8", { enumerable: !0, get: function() {
    return d.escapeUTF8;
  } }), Object.defineProperty(e, "escapeAttribute", { enumerable: !0, get: function() {
    return d.escapeAttribute;
  } }), Object.defineProperty(e, "escapeText", { enumerable: !0, get: function() {
    return d.escapeText;
  } });
  var c = wt;
  Object.defineProperty(e, "encodeHTML", { enumerable: !0, get: function() {
    return c.encodeHTML;
  } }), Object.defineProperty(e, "encodeNonAsciiHTML", { enumerable: !0, get: function() {
    return c.encodeNonAsciiHTML;
  } }), Object.defineProperty(e, "encodeHTML4", { enumerable: !0, get: function() {
    return c.encodeHTML;
  } }), Object.defineProperty(e, "encodeHTML5", { enumerable: !0, get: function() {
    return c.encodeHTML;
  } });
  var E = si;
  Object.defineProperty(e, "EntityDecoder", { enumerable: !0, get: function() {
    return E.EntityDecoder;
  } }), Object.defineProperty(e, "DecodingMode", { enumerable: !0, get: function() {
    return E.DecodingMode;
  } }), Object.defineProperty(e, "decodeXML", { enumerable: !0, get: function() {
    return E.decodeXML;
  } }), Object.defineProperty(e, "decodeHTML", { enumerable: !0, get: function() {
    return E.decodeHTML;
  } }), Object.defineProperty(e, "decodeHTMLStrict", { enumerable: !0, get: function() {
    return E.decodeHTMLStrict;
  } }), Object.defineProperty(e, "decodeHTMLAttribute", { enumerable: !0, get: function() {
    return E.decodeHTMLAttribute;
  } }), Object.defineProperty(e, "decodeHTML4", { enumerable: !0, get: function() {
    return E.decodeHTML;
  } }), Object.defineProperty(e, "decodeHTML5", { enumerable: !0, get: function() {
    return E.decodeHTML;
  } }), Object.defineProperty(e, "decodeHTML4Strict", { enumerable: !0, get: function() {
    return E.decodeHTMLStrict;
  } }), Object.defineProperty(e, "decodeHTML5Strict", { enumerable: !0, get: function() {
    return E.decodeHTMLStrict;
  } }), Object.defineProperty(e, "decodeXMLStrict", { enumerable: !0, get: function() {
    return E.decodeXML;
  } });
})(Id);
var p0 = {};
Object.defineProperty(p0, "__esModule", { value: !0 });
p0.attributeNames = p0.elementNames = void 0;
p0.elementNames = new Map([
  "altGlyph",
  "altGlyphDef",
  "altGlyphItem",
  "animateColor",
  "animateMotion",
  "animateTransform",
  "clipPath",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDistantLight",
  "feDropShadow",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence",
  "foreignObject",
  "glyphRef",
  "linearGradient",
  "radialGradient",
  "textPath"
].map(function(e) {
  return [e.toLowerCase(), e];
}));
p0.attributeNames = new Map([
  "definitionURL",
  "attributeName",
  "attributeType",
  "baseFrequency",
  "baseProfile",
  "calcMode",
  "clipPathUnits",
  "diffuseConstant",
  "edgeMode",
  "filterUnits",
  "glyphRef",
  "gradientTransform",
  "gradientUnits",
  "kernelMatrix",
  "kernelUnitLength",
  "keyPoints",
  "keySplines",
  "keyTimes",
  "lengthAdjust",
  "limitingConeAngle",
  "markerHeight",
  "markerUnits",
  "markerWidth",
  "maskContentUnits",
  "maskUnits",
  "numOctaves",
  "pathLength",
  "patternContentUnits",
  "patternTransform",
  "patternUnits",
  "pointsAtX",
  "pointsAtY",
  "pointsAtZ",
  "preserveAlpha",
  "preserveAspectRatio",
  "primitiveUnits",
  "refX",
  "refY",
  "repeatCount",
  "repeatDur",
  "requiredExtensions",
  "requiredFeatures",
  "specularConstant",
  "specularExponent",
  "spreadMethod",
  "startOffset",
  "stdDeviation",
  "stitchTiles",
  "surfaceScale",
  "systemLanguage",
  "tableValues",
  "targetX",
  "targetY",
  "textLength",
  "viewBox",
  "viewTarget",
  "xChannelSelector",
  "yChannelSelector",
  "zoomAndPan"
].map(function(e) {
  return [e.toLowerCase(), e];
}));
var e0 = C && C.__assign || function() {
  return e0 = Object.assign || function(e) {
    for (var u, t = 1, r = arguments.length; t < r; t++) {
      u = arguments[t];
      for (var a in u)
        Object.prototype.hasOwnProperty.call(u, a) && (e[a] = u[a]);
    }
    return e;
  }, e0.apply(this, arguments);
}, Jb = C && C.__createBinding || (Object.create ? function(e, u, t, r) {
  r === void 0 && (r = t);
  var a = Object.getOwnPropertyDescriptor(u, t);
  (!a || ("get" in a ? !u.__esModule : a.writable || a.configurable)) && (a = { enumerable: !0, get: function() {
    return u[t];
  } }), Object.defineProperty(e, r, a);
} : function(e, u, t, r) {
  r === void 0 && (r = t), e[r] = u[t];
}), Zb = C && C.__setModuleDefault || (Object.create ? function(e, u) {
  Object.defineProperty(e, "default", { enumerable: !0, value: u });
} : function(e, u) {
  e.default = u;
}), e3 = C && C.__importStar || function(e) {
  if (e && e.__esModule)
    return e;
  var u = {};
  if (e != null)
    for (var t in e)
      t !== "default" && Object.prototype.hasOwnProperty.call(e, t) && Jb(u, e, t);
  return Zb(u, e), u;
};
Object.defineProperty(lr, "__esModule", { value: !0 });
lr.render = void 0;
var Zu = e3(Be), da = Id, Sd = p0, u3 = /* @__PURE__ */ new Set([
  "style",
  "script",
  "xmp",
  "iframe",
  "noembed",
  "noframes",
  "plaintext",
  "noscript"
]);
function t3(e) {
  return e.replace(/"/g, "&quot;");
}
function r3(e, u) {
  var t;
  if (e) {
    var r = ((t = u.encodeEntities) !== null && t !== void 0 ? t : u.decodeEntities) === !1 ? t3 : u.xmlMode || u.encodeEntities !== "utf8" ? da.encodeXML : da.escapeAttribute;
    return Object.keys(e).map(function(a) {
      var n, i, s = (n = e[a]) !== null && n !== void 0 ? n : "";
      return u.xmlMode === "foreign" && (a = (i = Sd.attributeNames.get(a)) !== null && i !== void 0 ? i : a), !u.emptyAttrs && !u.xmlMode && s === "" ? a : "".concat(a, '="').concat(r(s), '"');
    }).join(" ");
  }
}
var ss = /* @__PURE__ */ new Set([
  "area",
  "base",
  "basefont",
  "br",
  "col",
  "command",
  "embed",
  "frame",
  "hr",
  "img",
  "input",
  "isindex",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
]);
function wa(e, u) {
  u === void 0 && (u = {});
  for (var t = ("length" in e) ? e : [e], r = "", a = 0; a < t.length; a++)
    r += a3(t[a], u);
  return r;
}
lr.render = wa;
lr.default = wa;
function a3(e, u) {
  switch (e.type) {
    case Zu.Root:
      return wa(e.children, u);
    case Zu.Doctype:
    case Zu.Directive:
      return s3(e);
    case Zu.Comment:
      return l3(e);
    case Zu.CDATA:
      return d3(e);
    case Zu.Script:
    case Zu.Style:
    case Zu.Tag:
      return c3(e, u);
    case Zu.Text:
      return o3(e, u);
  }
}
var n3 = /* @__PURE__ */ new Set([
  "mi",
  "mo",
  "mn",
  "ms",
  "mtext",
  "annotation-xml",
  "foreignObject",
  "desc",
  "title"
]), i3 = /* @__PURE__ */ new Set(["svg", "math"]);
function c3(e, u) {
  var t;
  u.xmlMode === "foreign" && (e.name = (t = Sd.elementNames.get(e.name)) !== null && t !== void 0 ? t : e.name, e.parent && n3.has(e.parent.name) && (u = e0(e0({}, u), { xmlMode: !1 }))), !u.xmlMode && i3.has(e.name) && (u = e0(e0({}, u), { xmlMode: "foreign" }));
  var r = "<".concat(e.name), a = r3(e.attribs, u);
  return a && (r += " ".concat(a)), e.children.length === 0 && (u.xmlMode ? (
    // In XML mode or foreign mode, and user hasn't explicitly turned off self-closing tags
    u.selfClosingTags !== !1
  ) : (
    // User explicitly asked for self-closing tags, even in HTML mode
    u.selfClosingTags && ss.has(e.name)
  )) ? (u.xmlMode || (r += " "), r += "/>") : (r += ">", e.children.length > 0 && (r += wa(e.children, u)), (u.xmlMode || !ss.has(e.name)) && (r += "</".concat(e.name, ">"))), r;
}
function s3(e) {
  return "<".concat(e.data, ">");
}
function o3(e, u) {
  var t, r = e.data || "";
  return ((t = u.encodeEntities) !== null && t !== void 0 ? t : u.decodeEntities) !== !1 && !(!u.xmlMode && e.parent && u3.has(e.parent.name)) && (r = u.xmlMode || u.encodeEntities !== "utf8" ? (0, da.encodeXML)(r) : (0, da.escapeText)(r)), r;
}
function d3(e) {
  return "<![CDATA[".concat(e.children[0].data, "]]>");
}
function l3(e) {
  return "<!--".concat(e.data, "-->");
}
var f3 = C && C.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(xu, "__esModule", { value: !0 });
xu.innerText = xu.textContent = xu.getText = xu.getInnerHTML = xu.getOuterHTML = void 0;
var Yu = Ft, b3 = f3(lr), h3 = Be;
function Od(e, u) {
  return (0, b3.default)(e, u);
}
xu.getOuterHTML = Od;
function p3(e, u) {
  return (0, Yu.hasChildren)(e) ? e.children.map(function(t) {
    return Od(t, u);
  }).join("") : "";
}
xu.getInnerHTML = p3;
function Yr(e) {
  return Array.isArray(e) ? e.map(Yr).join("") : (0, Yu.isTag)(e) ? e.name === "br" ? `
` : Yr(e.children) : (0, Yu.isCDATA)(e) ? Yr(e.children) : (0, Yu.isText)(e) ? e.data : "";
}
xu.getText = Yr;
function di(e) {
  return Array.isArray(e) ? e.map(di).join("") : (0, Yu.hasChildren)(e) && !(0, Yu.isComment)(e) ? di(e.children) : (0, Yu.isText)(e) ? e.data : "";
}
xu.textContent = di;
function li(e) {
  return Array.isArray(e) ? e.map(li).join("") : (0, Yu.hasChildren)(e) && (e.type === h3.ElementType.Tag || (0, Yu.isCDATA)(e)) ? li(e.children) : (0, Yu.isText)(e) ? e.data : "";
}
xu.innerText = li;
var je = {};
Object.defineProperty(je, "__esModule", { value: !0 });
je.prevElementSibling = je.nextElementSibling = je.getName = je.hasAttrib = je.getAttributeValue = je.getSiblings = je.getParent = je.getChildren = void 0;
var rc = Ft;
function Ld(e) {
  return (0, rc.hasChildren)(e) ? e.children : [];
}
je.getChildren = Ld;
function Pd(e) {
  return e.parent || null;
}
je.getParent = Pd;
function m3(e) {
  var u, t, r = Pd(e);
  if (r != null)
    return Ld(r);
  for (var a = [e], n = e.prev, i = e.next; n != null; )
    a.unshift(n), u = n, n = u.prev;
  for (; i != null; )
    a.push(i), t = i, i = t.next;
  return a;
}
je.getSiblings = m3;
function g3(e, u) {
  var t;
  return (t = e.attribs) === null || t === void 0 ? void 0 : t[u];
}
je.getAttributeValue = g3;
function E3(e, u) {
  return e.attribs != null && Object.prototype.hasOwnProperty.call(e.attribs, u) && e.attribs[u] != null;
}
je.hasAttrib = E3;
function T3(e) {
  return e.name;
}
je.getName = T3;
function _3(e) {
  for (var u, t = e.next; t !== null && !(0, rc.isTag)(t); )
    u = t, t = u.next;
  return t;
}
je.nextElementSibling = _3;
function y3(e) {
  for (var u, t = e.prev; t !== null && !(0, rc.isTag)(t); )
    u = t, t = u.prev;
  return t;
}
je.prevElementSibling = y3;
var du = {};
Object.defineProperty(du, "__esModule", { value: !0 });
du.prepend = du.prependChild = du.append = du.appendChild = du.replaceElement = du.removeElement = void 0;
function fr(e) {
  if (e.prev && (e.prev.next = e.next), e.next && (e.next.prev = e.prev), e.parent) {
    var u = e.parent.children, t = u.lastIndexOf(e);
    t >= 0 && u.splice(t, 1);
  }
  e.next = null, e.prev = null, e.parent = null;
}
du.removeElement = fr;
function A3(e, u) {
  var t = u.prev = e.prev;
  t && (t.next = u);
  var r = u.next = e.next;
  r && (r.prev = u);
  var a = u.parent = e.parent;
  if (a) {
    var n = a.children;
    n[n.lastIndexOf(e)] = u, e.parent = null;
  }
}
du.replaceElement = A3;
function v3(e, u) {
  if (fr(u), u.next = null, u.parent = e, e.children.push(u) > 1) {
    var t = e.children[e.children.length - 2];
    t.next = u, u.prev = t;
  } else
    u.prev = null;
}
du.appendChild = v3;
function x3(e, u) {
  fr(u);
  var t = e.parent, r = e.next;
  if (u.next = r, u.prev = e, e.next = u, u.parent = t, r) {
    if (r.prev = u, t) {
      var a = t.children;
      a.splice(a.lastIndexOf(r), 0, u);
    }
  } else
    t && t.children.push(u);
}
du.append = x3;
function N3(e, u) {
  if (fr(u), u.parent = e, u.prev = null, e.children.unshift(u) !== 1) {
    var t = e.children[1];
    t.prev = u, u.next = t;
  } else
    u.next = null;
}
du.prependChild = N3;
function I3(e, u) {
  fr(u);
  var t = e.parent;
  if (t) {
    var r = t.children;
    r.splice(r.indexOf(e), 0, u);
  }
  e.prev && (e.prev.next = u), u.parent = t, u.prev = e.prev, u.next = e, e.prev = u;
}
du.prepend = I3;
var Je = {};
Object.defineProperty(Je, "__esModule", { value: !0 });
Je.findAll = Je.existsOne = Je.findOne = Je.findOneChild = Je.find = Je.filter = void 0;
var Ra = Ft;
function D3(e, u, t, r) {
  return t === void 0 && (t = !0), r === void 0 && (r = 1 / 0), wd(e, Array.isArray(u) ? u : [u], t, r);
}
Je.filter = D3;
function wd(e, u, t, r) {
  for (var a = [], n = [u], i = [0]; ; ) {
    if (i[0] >= n[0].length) {
      if (i.length === 1)
        return a;
      n.shift(), i.shift();
      continue;
    }
    var s = n[0][i[0]++];
    if (e(s) && (a.push(s), --r <= 0))
      return a;
    t && (0, Ra.hasChildren)(s) && s.children.length > 0 && (i.unshift(0), n.unshift(s.children));
  }
}
Je.find = wd;
function C3(e, u) {
  return u.find(e);
}
Je.findOneChild = C3;
function Rd(e, u, t) {
  t === void 0 && (t = !0);
  for (var r = null, a = 0; a < u.length && !r; a++) {
    var n = u[a];
    if ((0, Ra.isTag)(n))
      e(n) ? r = n : t && n.children.length > 0 && (r = Rd(e, n.children, !0));
    else
      continue;
  }
  return r;
}
Je.findOne = Rd;
function Md(e, u) {
  return u.some(function(t) {
    return (0, Ra.isTag)(t) && (e(t) || Md(e, t.children));
  });
}
Je.existsOne = Md;
function S3(e, u) {
  for (var t = [], r = [u], a = [0]; ; ) {
    if (a[0] >= r[0].length) {
      if (r.length === 1)
        return t;
      r.shift(), a.shift();
      continue;
    }
    var n = r[0][a[0]++];
    (0, Ra.isTag)(n) && (e(n) && t.push(n), n.children.length > 0 && (a.unshift(0), r.unshift(n.children)));
  }
}
Je.findAll = S3;
var Nu = {};
Object.defineProperty(Nu, "__esModule", { value: !0 });
Nu.getElementsByTagType = Nu.getElementsByTagName = Nu.getElementById = Nu.getElements = Nu.testElement = void 0;
var Dt = Ft, Ma = Je, la = {
  tag_name: function(e) {
    return typeof e == "function" ? function(u) {
      return (0, Dt.isTag)(u) && e(u.name);
    } : e === "*" ? Dt.isTag : function(u) {
      return (0, Dt.isTag)(u) && u.name === e;
    };
  },
  tag_type: function(e) {
    return typeof e == "function" ? function(u) {
      return e(u.type);
    } : function(u) {
      return u.type === e;
    };
  },
  tag_contains: function(e) {
    return typeof e == "function" ? function(u) {
      return (0, Dt.isText)(u) && e(u.data);
    } : function(u) {
      return (0, Dt.isText)(u) && u.data === e;
    };
  }
};
function kd(e, u) {
  return typeof u == "function" ? function(t) {
    return (0, Dt.isTag)(t) && u(t.attribs[e]);
  } : function(t) {
    return (0, Dt.isTag)(t) && t.attribs[e] === u;
  };
}
function O3(e, u) {
  return function(t) {
    return e(t) || u(t);
  };
}
function Bd(e) {
  var u = Object.keys(e).map(function(t) {
    var r = e[t];
    return Object.prototype.hasOwnProperty.call(la, t) ? la[t](r) : kd(t, r);
  });
  return u.length === 0 ? null : u.reduce(O3);
}
function L3(e, u) {
  var t = Bd(e);
  return t ? t(u) : !0;
}
Nu.testElement = L3;
function P3(e, u, t, r) {
  r === void 0 && (r = 1 / 0);
  var a = Bd(e);
  return a ? (0, Ma.filter)(a, u, t, r) : [];
}
Nu.getElements = P3;
function w3(e, u, t) {
  return t === void 0 && (t = !0), Array.isArray(u) || (u = [u]), (0, Ma.findOne)(kd("id", e), u, t);
}
Nu.getElementById = w3;
function R3(e, u, t, r) {
  return t === void 0 && (t = !0), r === void 0 && (r = 1 / 0), (0, Ma.filter)(la.tag_name(e), u, t, r);
}
Nu.getElementsByTagName = R3;
function M3(e, u, t, r) {
  return t === void 0 && (t = !0), r === void 0 && (r = 1 / 0), (0, Ma.filter)(la.tag_type(e), u, t, r);
}
Nu.getElementsByTagType = M3;
var Ud = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.uniqueSort = e.compareDocumentPosition = e.DocumentPosition = e.removeSubsets = void 0;
  var u = Ft;
  function t(i) {
    for (var s = i.length; --s >= 0; ) {
      var o = i[s];
      if (s > 0 && i.lastIndexOf(o, s - 1) >= 0) {
        i.splice(s, 1);
        continue;
      }
      for (var d = o.parent; d; d = d.parent)
        if (i.includes(d)) {
          i.splice(s, 1);
          break;
        }
    }
    return i;
  }
  e.removeSubsets = t;
  var r;
  (function(i) {
    i[i.DISCONNECTED = 1] = "DISCONNECTED", i[i.PRECEDING = 2] = "PRECEDING", i[i.FOLLOWING = 4] = "FOLLOWING", i[i.CONTAINS = 8] = "CONTAINS", i[i.CONTAINED_BY = 16] = "CONTAINED_BY";
  })(r = e.DocumentPosition || (e.DocumentPosition = {}));
  function a(i, s) {
    var o = [], d = [];
    if (i === s)
      return 0;
    for (var c = (0, u.hasChildren)(i) ? i : i.parent; c; )
      o.unshift(c), c = c.parent;
    for (c = (0, u.hasChildren)(s) ? s : s.parent; c; )
      d.unshift(c), c = c.parent;
    for (var E = Math.min(o.length, d.length), f = 0; f < E && o[f] === d[f]; )
      f++;
    if (f === 0)
      return r.DISCONNECTED;
    var m = o[f - 1], v = m.children, L = o[f], N = d[f];
    return v.indexOf(L) > v.indexOf(N) ? m === s ? r.FOLLOWING | r.CONTAINED_BY : r.FOLLOWING : m === i ? r.PRECEDING | r.CONTAINS : r.PRECEDING;
  }
  e.compareDocumentPosition = a;
  function n(i) {
    return i = i.filter(function(s, o, d) {
      return !d.includes(s, o + 1);
    }), i.sort(function(s, o) {
      var d = a(s, o);
      return d & r.PRECEDING ? -1 : d & r.FOLLOWING ? 1 : 0;
    }), i;
  }
  e.uniqueSort = n;
})(Ud);
var ka = {};
Object.defineProperty(ka, "__esModule", { value: !0 });
ka.getFeed = void 0;
var k3 = xu, br = Nu;
function B3(e) {
  var u = fa(G3, e);
  return u ? u.name === "feed" ? U3(u) : H3(u) : null;
}
ka.getFeed = B3;
function U3(e) {
  var u, t = e.children, r = {
    type: "atom",
    items: (0, br.getElementsByTagName)("entry", t).map(function(i) {
      var s, o = i.children, d = { media: Hd(o) };
      iu(d, "id", "id", o), iu(d, "title", "title", o);
      var c = (s = fa("link", o)) === null || s === void 0 ? void 0 : s.attribs.href;
      c && (d.link = c);
      var E = ft("summary", o) || ft("content", o);
      E && (d.description = E);
      var f = ft("updated", o);
      return f && (d.pubDate = new Date(f)), d;
    })
  };
  iu(r, "id", "id", t), iu(r, "title", "title", t);
  var a = (u = fa("link", t)) === null || u === void 0 ? void 0 : u.attribs.href;
  a && (r.link = a), iu(r, "description", "subtitle", t);
  var n = ft("updated", t);
  return n && (r.updated = new Date(n)), iu(r, "author", "email", t, !0), r;
}
function H3(e) {
  var u, t, r = (t = (u = fa("channel", e.children)) === null || u === void 0 ? void 0 : u.children) !== null && t !== void 0 ? t : [], a = {
    type: e.name.substr(0, 3),
    id: "",
    items: (0, br.getElementsByTagName)("item", e.children).map(function(i) {
      var s = i.children, o = { media: Hd(s) };
      iu(o, "id", "guid", s), iu(o, "title", "title", s), iu(o, "link", "link", s), iu(o, "description", "description", s);
      var d = ft("pubDate", s) || ft("dc:date", s);
      return d && (o.pubDate = new Date(d)), o;
    })
  };
  iu(a, "title", "title", r), iu(a, "link", "link", r), iu(a, "description", "description", r);
  var n = ft("lastBuildDate", r);
  return n && (a.updated = new Date(n)), iu(a, "author", "managingEditor", r, !0), a;
}
var F3 = ["url", "type", "lang"], q3 = [
  "fileSize",
  "bitrate",
  "framerate",
  "samplingrate",
  "channels",
  "duration",
  "height",
  "width"
];
function Hd(e) {
  return (0, br.getElementsByTagName)("media:content", e).map(function(u) {
    for (var t = u.attribs, r = {
      medium: t.medium,
      isDefault: !!t.isDefault
    }, a = 0, n = F3; a < n.length; a++) {
      var i = n[a];
      t[i] && (r[i] = t[i]);
    }
    for (var s = 0, o = q3; s < o.length; s++) {
      var i = o[s];
      t[i] && (r[i] = parseInt(t[i], 10));
    }
    return t.expression && (r.expression = t.expression), r;
  });
}
function fa(e, u) {
  return (0, br.getElementsByTagName)(e, u, !0, 1)[0];
}
function ft(e, u, t) {
  return t === void 0 && (t = !1), (0, k3.textContent)((0, br.getElementsByTagName)(e, u, t, 1)).trim();
}
function iu(e, u, t, r, a) {
  a === void 0 && (a = !1);
  var n = ft(t, r, a);
  n && (e[u] = n);
}
function G3(e) {
  return e === "rss" || e === "feed" || e === "rdf:RDF";
}
(function(e) {
  var u = C && C.__createBinding || (Object.create ? function(a, n, i, s) {
    s === void 0 && (s = i);
    var o = Object.getOwnPropertyDescriptor(n, i);
    (!o || ("get" in o ? !n.__esModule : o.writable || o.configurable)) && (o = { enumerable: !0, get: function() {
      return n[i];
    } }), Object.defineProperty(a, s, o);
  } : function(a, n, i, s) {
    s === void 0 && (s = i), a[s] = n[i];
  }), t = C && C.__exportStar || function(a, n) {
    for (var i in a)
      i !== "default" && !Object.prototype.hasOwnProperty.call(n, i) && u(n, a, i);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.hasChildren = e.isDocument = e.isComment = e.isText = e.isCDATA = e.isTag = void 0, t(xu, e), t(je, e), t(du, e), t(Je, e), t(Nu, e), t(Ud, e), t(ka, e);
  var r = Ft;
  Object.defineProperty(e, "isTag", { enumerable: !0, get: function() {
    return r.isTag;
  } }), Object.defineProperty(e, "isCDATA", { enumerable: !0, get: function() {
    return r.isCDATA;
  } }), Object.defineProperty(e, "isText", { enumerable: !0, get: function() {
    return r.isText;
  } }), Object.defineProperty(e, "isComment", { enumerable: !0, get: function() {
    return r.isComment;
  } }), Object.defineProperty(e, "isDocument", { enumerable: !0, get: function() {
    return r.isDocument;
  } }), Object.defineProperty(e, "hasChildren", { enumerable: !0, get: function() {
    return r.hasChildren;
  } });
})(bd);
var qt = {
  trueFunc: function() {
    return !0;
  },
  falseFunc: function() {
    return !1;
  }
};
const os = /* @__PURE__ */ $i(qt);
var mt = {}, S0 = {};
Object.defineProperty(S0, "__esModule", { value: !0 });
S0.isTraversal = void 0;
var yu = dr, Fd = /* @__PURE__ */ new Map([
  [yu.SelectorType.Universal, 50],
  [yu.SelectorType.Tag, 30],
  [yu.SelectorType.Attribute, 1],
  [yu.SelectorType.Pseudo, 0]
]);
function j3(e) {
  return !Fd.has(e.type);
}
S0.isTraversal = j3;
var $3 = /* @__PURE__ */ new Map([
  [yu.AttributeAction.Exists, 10],
  [yu.AttributeAction.Equals, 8],
  [yu.AttributeAction.Not, 7],
  [yu.AttributeAction.Start, 6],
  [yu.AttributeAction.End, 6],
  [yu.AttributeAction.Any, 5]
]);
function V3(e) {
  for (var u = e.map(qd), t = 1; t < e.length; t++) {
    var r = u[t];
    if (!(r < 0))
      for (var a = t - 1; a >= 0 && r < u[a]; a--) {
        var n = e[a + 1];
        e[a + 1] = e[a], e[a] = n, u[a + 1] = u[a], u[a] = r;
      }
  }
}
S0.default = V3;
function qd(e) {
  var u, t, r = (u = Fd.get(e.type)) !== null && u !== void 0 ? u : -1;
  return e.type === yu.SelectorType.Attribute ? (r = (t = $3.get(e.action)) !== null && t !== void 0 ? t : 4, e.action === yu.AttributeAction.Equals && e.name === "id" && (r = 9), e.ignoreCase && (r >>= 1)) : e.type === yu.SelectorType.Pseudo && (e.data ? e.name === "has" || e.name === "contains" ? r = 0 : Array.isArray(e.data) ? (r = Math.min.apply(Math, e.data.map(function(a) {
    return Math.min.apply(Math, a.map(qd));
  })), r < 0 && (r = 0)) : r = 2 : r = 3), r;
}
var Ba = {}, Ua = {}, Y3 = C && C.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Ua, "__esModule", { value: !0 });
Ua.attributeRules = void 0;
var wr = Y3(qt), W3 = /[-[\]{}()*+?.,\\^$|#\s]/g;
function ds(e) {
  return e.replace(W3, "\\$&");
}
var X3 = /* @__PURE__ */ new Set([
  "accept",
  "accept-charset",
  "align",
  "alink",
  "axis",
  "bgcolor",
  "charset",
  "checked",
  "clear",
  "codetype",
  "color",
  "compact",
  "declare",
  "defer",
  "dir",
  "direction",
  "disabled",
  "enctype",
  "face",
  "frame",
  "hreflang",
  "http-equiv",
  "lang",
  "language",
  "link",
  "media",
  "method",
  "multiple",
  "nohref",
  "noresize",
  "noshade",
  "nowrap",
  "readonly",
  "rel",
  "rev",
  "rules",
  "scope",
  "scrolling",
  "selected",
  "shape",
  "target",
  "text",
  "type",
  "valign",
  "valuetype",
  "vlink"
]);
function vt(e, u) {
  return typeof e.ignoreCase == "boolean" ? e.ignoreCase : e.ignoreCase === "quirks" ? !!u.quirksMode : !u.xmlMode && X3.has(e.name);
}
Ua.attributeRules = {
  equals: function(e, u, t) {
    var r = t.adapter, a = u.name, n = u.value;
    return vt(u, t) ? (n = n.toLowerCase(), function(i) {
      var s = r.getAttributeValue(i, a);
      return s != null && s.length === n.length && s.toLowerCase() === n && e(i);
    }) : function(i) {
      return r.getAttributeValue(i, a) === n && e(i);
    };
  },
  hyphen: function(e, u, t) {
    var r = t.adapter, a = u.name, n = u.value, i = n.length;
    return vt(u, t) ? (n = n.toLowerCase(), function(o) {
      var d = r.getAttributeValue(o, a);
      return d != null && (d.length === i || d.charAt(i) === "-") && d.substr(0, i).toLowerCase() === n && e(o);
    }) : function(o) {
      var d = r.getAttributeValue(o, a);
      return d != null && (d.length === i || d.charAt(i) === "-") && d.substr(0, i) === n && e(o);
    };
  },
  element: function(e, u, t) {
    var r = t.adapter, a = u.name, n = u.value;
    if (/\s/.test(n))
      return wr.default.falseFunc;
    var i = new RegExp("(?:^|\\s)".concat(ds(n), "(?:$|\\s)"), vt(u, t) ? "i" : "");
    return function(o) {
      var d = r.getAttributeValue(o, a);
      return d != null && d.length >= n.length && i.test(d) && e(o);
    };
  },
  exists: function(e, u, t) {
    var r = u.name, a = t.adapter;
    return function(n) {
      return a.hasAttrib(n, r) && e(n);
    };
  },
  start: function(e, u, t) {
    var r = t.adapter, a = u.name, n = u.value, i = n.length;
    return i === 0 ? wr.default.falseFunc : vt(u, t) ? (n = n.toLowerCase(), function(s) {
      var o = r.getAttributeValue(s, a);
      return o != null && o.length >= i && o.substr(0, i).toLowerCase() === n && e(s);
    }) : function(s) {
      var o;
      return !!(!((o = r.getAttributeValue(s, a)) === null || o === void 0) && o.startsWith(n)) && e(s);
    };
  },
  end: function(e, u, t) {
    var r = t.adapter, a = u.name, n = u.value, i = -n.length;
    return i === 0 ? wr.default.falseFunc : vt(u, t) ? (n = n.toLowerCase(), function(s) {
      var o;
      return ((o = r.getAttributeValue(s, a)) === null || o === void 0 ? void 0 : o.substr(i).toLowerCase()) === n && e(s);
    }) : function(s) {
      var o;
      return !!(!((o = r.getAttributeValue(s, a)) === null || o === void 0) && o.endsWith(n)) && e(s);
    };
  },
  any: function(e, u, t) {
    var r = t.adapter, a = u.name, n = u.value;
    if (n === "")
      return wr.default.falseFunc;
    if (vt(u, t)) {
      var i = new RegExp(ds(n), "i");
      return function(o) {
        var d = r.getAttributeValue(o, a);
        return d != null && d.length >= n.length && i.test(d) && e(o);
      };
    }
    return function(s) {
      var o;
      return !!(!((o = r.getAttributeValue(s, a)) === null || o === void 0) && o.includes(n)) && e(s);
    };
  },
  not: function(e, u, t) {
    var r = t.adapter, a = u.name, n = u.value;
    return n === "" ? function(i) {
      return !!r.getAttributeValue(i, a) && e(i);
    } : vt(u, t) ? (n = n.toLowerCase(), function(i) {
      var s = r.getAttributeValue(i, a);
      return (s == null || s.length !== n.length || s.toLowerCase() !== n) && e(i);
    }) : function(i) {
      return r.getAttributeValue(i, a) !== n && e(i);
    };
  }
};
var ac = {}, Gd = {};
const z3 = /* @__PURE__ */ new Set([9, 10, 12, 13, 32]), ls = 48, Q3 = 57;
function nc(e) {
  if (e = e.trim().toLowerCase(), e === "even")
    return [2, 0];
  if (e === "odd")
    return [2, 1];
  let u = 0, t = 0, r = n(), a = i();
  if (u < e.length && e.charAt(u) === "n" && (u++, t = r * (a ?? 1), s(), u < e.length ? (r = n(), s(), a = i()) : r = a = 0), a === null || u < e.length)
    throw new Error(`n-th rule couldn't be parsed ('${e}')`);
  return [t, r * a];
  function n() {
    return e.charAt(u) === "-" ? (u++, -1) : (e.charAt(u) === "+" && u++, 1);
  }
  function i() {
    const o = u;
    let d = 0;
    for (; u < e.length && e.charCodeAt(u) >= ls && e.charCodeAt(u) <= Q3; )
      d = d * 10 + (e.charCodeAt(u) - ls), u++;
    return u === o ? null : d;
  }
  function s() {
    for (; u < e.length && z3.has(e.charCodeAt(u)); )
      u++;
  }
}
function jd(e) {
  const u = e[0], t = e[1] - 1;
  if (t < 0 && u <= 0)
    return os.falseFunc;
  if (u === -1)
    return (n) => n <= t;
  if (u === 0)
    return (n) => n === t;
  if (u === 1)
    return t < 0 ? os.trueFunc : (n) => n >= t;
  const r = Math.abs(u), a = (t % r + r) % r;
  return u > 1 ? (n) => n >= t && n % r === a : (n) => n <= t && n % r === a;
}
function $d(e) {
  const u = e[0];
  let t = e[1] - 1, r = 0;
  if (u < 0) {
    const a = -u, n = (t % a + a) % a;
    return () => {
      const i = n + a * r++;
      return i > t ? null : i;
    };
  }
  return u === 0 ? t < 0 ? (
    // There are no result — always return `null`
    () => null
  ) : (
    // Return `b` exactly once
    () => r++ === 0 ? t : null
  ) : (t < 0 && (t += u * Math.ceil(-t / u)), () => u * r++ + t);
}
function fi(e) {
  return jd(nc(e));
}
function K3(e) {
  return $d(nc(e));
}
const J3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  compile: jd,
  default: fi,
  generate: $d,
  parse: nc,
  sequence: K3
}, Symbol.toStringTag, { value: "Module" })), Z3 = /* @__PURE__ */ xo(J3);
(function(e) {
  var u = C && C.__importDefault || function(i) {
    return i && i.__esModule ? i : { default: i };
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.filters = void 0;
  var t = u(Z3), r = u(qt);
  function a(i, s) {
    return function(o) {
      var d = s.getParent(o);
      return d != null && s.isTag(d) && i(o);
    };
  }
  e.filters = {
    contains: function(i, s, o) {
      var d = o.adapter;
      return function(E) {
        return i(E) && d.getText(E).includes(s);
      };
    },
    icontains: function(i, s, o) {
      var d = o.adapter, c = s.toLowerCase();
      return function(f) {
        return i(f) && d.getText(f).toLowerCase().includes(c);
      };
    },
    // Location specific methods
    "nth-child": function(i, s, o) {
      var d = o.adapter, c = o.equals, E = (0, t.default)(s);
      return E === r.default.falseFunc ? r.default.falseFunc : E === r.default.trueFunc ? a(i, d) : function(m) {
        for (var v = d.getSiblings(m), L = 0, N = 0; N < v.length && !c(m, v[N]); N++)
          d.isTag(v[N]) && L++;
        return E(L) && i(m);
      };
    },
    "nth-last-child": function(i, s, o) {
      var d = o.adapter, c = o.equals, E = (0, t.default)(s);
      return E === r.default.falseFunc ? r.default.falseFunc : E === r.default.trueFunc ? a(i, d) : function(m) {
        for (var v = d.getSiblings(m), L = 0, N = v.length - 1; N >= 0 && !c(m, v[N]); N--)
          d.isTag(v[N]) && L++;
        return E(L) && i(m);
      };
    },
    "nth-of-type": function(i, s, o) {
      var d = o.adapter, c = o.equals, E = (0, t.default)(s);
      return E === r.default.falseFunc ? r.default.falseFunc : E === r.default.trueFunc ? a(i, d) : function(m) {
        for (var v = d.getSiblings(m), L = 0, N = 0; N < v.length; N++) {
          var O = v[N];
          if (c(m, O))
            break;
          d.isTag(O) && d.getName(O) === d.getName(m) && L++;
        }
        return E(L) && i(m);
      };
    },
    "nth-last-of-type": function(i, s, o) {
      var d = o.adapter, c = o.equals, E = (0, t.default)(s);
      return E === r.default.falseFunc ? r.default.falseFunc : E === r.default.trueFunc ? a(i, d) : function(m) {
        for (var v = d.getSiblings(m), L = 0, N = v.length - 1; N >= 0; N--) {
          var O = v[N];
          if (c(m, O))
            break;
          d.isTag(O) && d.getName(O) === d.getName(m) && L++;
        }
        return E(L) && i(m);
      };
    },
    // TODO determine the actual root element
    root: function(i, s, o) {
      var d = o.adapter;
      return function(c) {
        var E = d.getParent(c);
        return (E == null || !d.isTag(E)) && i(c);
      };
    },
    scope: function(i, s, o, d) {
      var c = o.equals;
      return !d || d.length === 0 ? e.filters.root(i, s, o) : d.length === 1 ? function(E) {
        return c(d[0], E) && i(E);
      } : function(E) {
        return d.includes(E) && i(E);
      };
    },
    hover: n("isHovered"),
    visited: n("isVisited"),
    active: n("isActive")
  };
  function n(i) {
    return function(o, d, c) {
      var E = c.adapter, f = E[i];
      return typeof f != "function" ? r.default.falseFunc : function(v) {
        return f(v) && o(v);
      };
    };
  }
})(Gd);
var m0 = {};
Object.defineProperty(m0, "__esModule", { value: !0 });
m0.verifyPseudoArgs = m0.pseudos = void 0;
m0.pseudos = {
  empty: function(e, u) {
    var t = u.adapter;
    return !t.getChildren(e).some(function(r) {
      return t.isTag(r) || t.getText(r) !== "";
    });
  },
  "first-child": function(e, u) {
    var t = u.adapter, r = u.equals;
    if (t.prevElementSibling)
      return t.prevElementSibling(e) == null;
    var a = t.getSiblings(e).find(function(n) {
      return t.isTag(n);
    });
    return a != null && r(e, a);
  },
  "last-child": function(e, u) {
    for (var t = u.adapter, r = u.equals, a = t.getSiblings(e), n = a.length - 1; n >= 0; n--) {
      if (r(e, a[n]))
        return !0;
      if (t.isTag(a[n]))
        break;
    }
    return !1;
  },
  "first-of-type": function(e, u) {
    for (var t = u.adapter, r = u.equals, a = t.getSiblings(e), n = t.getName(e), i = 0; i < a.length; i++) {
      var s = a[i];
      if (r(e, s))
        return !0;
      if (t.isTag(s) && t.getName(s) === n)
        break;
    }
    return !1;
  },
  "last-of-type": function(e, u) {
    for (var t = u.adapter, r = u.equals, a = t.getSiblings(e), n = t.getName(e), i = a.length - 1; i >= 0; i--) {
      var s = a[i];
      if (r(e, s))
        return !0;
      if (t.isTag(s) && t.getName(s) === n)
        break;
    }
    return !1;
  },
  "only-of-type": function(e, u) {
    var t = u.adapter, r = u.equals, a = t.getName(e);
    return t.getSiblings(e).every(function(n) {
      return r(e, n) || !t.isTag(n) || t.getName(n) !== a;
    });
  },
  "only-child": function(e, u) {
    var t = u.adapter, r = u.equals;
    return t.getSiblings(e).every(function(a) {
      return r(e, a) || !t.isTag(a);
    });
  }
};
function eh(e, u, t, r) {
  if (t === null) {
    if (e.length > r)
      throw new Error("Pseudo-class :".concat(u, " requires an argument"));
  } else if (e.length === r)
    throw new Error("Pseudo-class :".concat(u, " doesn't have any arguments"));
}
m0.verifyPseudoArgs = eh;
var Ha = {};
Object.defineProperty(Ha, "__esModule", { value: !0 });
Ha.aliases = void 0;
Ha.aliases = {
  // Links
  "any-link": ":is(a, area, link)[href]",
  link: ":any-link:not(:visited)",
  // Forms
  // https://html.spec.whatwg.org/multipage/scripting.html#disabled-elements
  disabled: `:is(
        :is(button, input, select, textarea, optgroup, option)[disabled],
        optgroup[disabled] > option,
        fieldset[disabled]:not(fieldset[disabled] legend:first-of-type *)
    )`,
  enabled: ":not(:disabled)",
  checked: ":is(:is(input[type=radio], input[type=checkbox])[checked], option:selected)",
  required: ":is(input, select, textarea)[required]",
  optional: ":is(input, select, textarea):not([required])",
  // JQuery extensions
  // https://html.spec.whatwg.org/multipage/form-elements.html#concept-option-selectedness
  selected: "option:is([selected], select:not([multiple]):not(:has(> option[selected])) > :first-of-type)",
  checkbox: "[type=checkbox]",
  file: "[type=file]",
  password: "[type=password]",
  radio: "[type=radio]",
  reset: "[type=reset]",
  image: "[type=image]",
  submit: "[type=submit]",
  parent: ":not(:empty)",
  header: ":is(h1, h2, h3, h4, h5, h6)",
  button: ":is(button, input[type=button])",
  input: ":is(input, textarea, select, button)",
  text: "input:is(:not([type!='']), [type=text])"
};
var Fa = {};
(function(e) {
  var u = C && C.__spreadArray || function(d, c, E) {
    if (E || arguments.length === 2)
      for (var f = 0, m = c.length, v; f < m; f++)
        (v || !(f in c)) && (v || (v = Array.prototype.slice.call(c, 0, f)), v[f] = c[f]);
    return d.concat(v || Array.prototype.slice.call(c));
  }, t = C && C.__importDefault || function(d) {
    return d && d.__esModule ? d : { default: d };
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.subselects = e.getNextSiblings = e.ensureIsTag = e.PLACEHOLDER_ELEMENT = void 0;
  var r = t(qt), a = S0;
  e.PLACEHOLDER_ELEMENT = {};
  function n(d, c) {
    return d === r.default.falseFunc ? r.default.falseFunc : function(E) {
      return c.isTag(E) && d(E);
    };
  }
  e.ensureIsTag = n;
  function i(d, c) {
    var E = c.getSiblings(d);
    if (E.length <= 1)
      return [];
    var f = E.indexOf(d);
    return f < 0 || f === E.length - 1 ? [] : E.slice(f + 1).filter(c.isTag);
  }
  e.getNextSiblings = i;
  function s(d) {
    return {
      xmlMode: !!d.xmlMode,
      lowerCaseAttributeNames: !!d.lowerCaseAttributeNames,
      lowerCaseTags: !!d.lowerCaseTags,
      quirksMode: !!d.quirksMode,
      cacheResults: !!d.cacheResults,
      pseudos: d.pseudos,
      adapter: d.adapter,
      equals: d.equals
    };
  }
  var o = function(d, c, E, f, m) {
    var v = m(c, s(E), f);
    return v === r.default.trueFunc ? d : v === r.default.falseFunc ? r.default.falseFunc : function(L) {
      return v(L) && d(L);
    };
  };
  e.subselects = {
    is: o,
    /**
     * `:matches` and `:where` are aliases for `:is`.
     */
    matches: o,
    where: o,
    not: function(d, c, E, f, m) {
      var v = m(c, s(E), f);
      return v === r.default.falseFunc ? d : v === r.default.trueFunc ? r.default.falseFunc : function(L) {
        return !v(L) && d(L);
      };
    },
    has: function(d, c, E, f, m) {
      var v = E.adapter, L = s(E);
      L.relativeSelector = !0;
      var N = c.some(function(R) {
        return R.some(a.isTraversal);
      }) ? (
        // Used as a placeholder. Will be replaced with the actual element.
        [e.PLACEHOLDER_ELEMENT]
      ) : void 0, O = m(c, L, N);
      if (O === r.default.falseFunc)
        return r.default.falseFunc;
      var w = n(O, v);
      if (N && O !== r.default.trueFunc) {
        var H = O.shouldTestNextSiblings, k = H === void 0 ? !1 : H;
        return function(R) {
          if (!d(R))
            return !1;
          N[0] = R;
          var G = v.getChildren(R), X = k ? u(u([], G, !0), i(R, v), !0) : G;
          return v.existsOne(w, X);
        };
      }
      return function(R) {
        return d(R) && v.existsOne(w, v.getChildren(R));
      };
    }
  };
})(Fa);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.compilePseudoSelector = e.aliases = e.pseudos = e.filters = void 0;
  var u = dr, t = Gd;
  Object.defineProperty(e, "filters", { enumerable: !0, get: function() {
    return t.filters;
  } });
  var r = m0;
  Object.defineProperty(e, "pseudos", { enumerable: !0, get: function() {
    return r.pseudos;
  } });
  var a = Ha;
  Object.defineProperty(e, "aliases", { enumerable: !0, get: function() {
    return a.aliases;
  } });
  var n = Fa;
  function i(s, o, d, c, E) {
    var f, m = o.name, v = o.data;
    if (Array.isArray(v)) {
      if (!(m in n.subselects))
        throw new Error("Unknown pseudo-class :".concat(m, "(").concat(v, ")"));
      return n.subselects[m](s, v, d, c, E);
    }
    var L = (f = d.pseudos) === null || f === void 0 ? void 0 : f[m], N = typeof L == "string" ? L : a.aliases[m];
    if (typeof N == "string") {
      if (v != null)
        throw new Error("Pseudo ".concat(m, " doesn't have any arguments"));
      var O = (0, u.parse)(N);
      return n.subselects.is(s, O, d, c, E);
    }
    if (typeof L == "function")
      return (0, r.verifyPseudoArgs)(L, m, v, 1), function(H) {
        return L(H, v) && s(H);
      };
    if (m in t.filters)
      return t.filters[m](s, v, d, c);
    if (m in r.pseudos) {
      var w = r.pseudos[m];
      return (0, r.verifyPseudoArgs)(w, m, v, 2), function(H) {
        return w(H, d, v) && s(H);
      };
    }
    throw new Error("Unknown pseudo-class :".concat(m));
  }
  e.compilePseudoSelector = i;
})(ac);
Object.defineProperty(Ba, "__esModule", { value: !0 });
Ba.compileGeneralSelector = void 0;
var uh = Ua, th = ac, Mu = dr;
function In(e, u) {
  var t = u.getParent(e);
  return t && u.isTag(t) ? t : null;
}
function rh(e, u, t, r, a) {
  var n = t.adapter, i = t.equals;
  switch (u.type) {
    case Mu.SelectorType.PseudoElement:
      throw new Error("Pseudo-elements are not supported by css-select");
    case Mu.SelectorType.ColumnCombinator:
      throw new Error("Column combinators are not yet supported by css-select");
    case Mu.SelectorType.Attribute: {
      if (u.namespace != null)
        throw new Error("Namespaced attributes are not yet supported by css-select");
      return (!t.xmlMode || t.lowerCaseAttributeNames) && (u.name = u.name.toLowerCase()), uh.attributeRules[u.action](e, u, t);
    }
    case Mu.SelectorType.Pseudo:
      return (0, th.compilePseudoSelector)(e, u, t, r, a);
    case Mu.SelectorType.Tag: {
      if (u.namespace != null)
        throw new Error("Namespaced tag names are not yet supported by css-select");
      var s = u.name;
      return (!t.xmlMode || t.lowerCaseTags) && (s = s.toLowerCase()), function(c) {
        return n.getName(c) === s && e(c);
      };
    }
    case Mu.SelectorType.Descendant: {
      if (t.cacheResults === !1 || typeof WeakSet > "u")
        return function(c) {
          for (var E = c; E = In(E, n); )
            if (e(E))
              return !0;
          return !1;
        };
      var o = /* @__PURE__ */ new WeakSet();
      return function(c) {
        for (var E = c; E = In(E, n); )
          if (!o.has(E)) {
            if (n.isTag(E) && e(E))
              return !0;
            o.add(E);
          }
        return !1;
      };
    }
    case "_flexibleDescendant":
      return function(c) {
        var E = c;
        do
          if (e(E))
            return !0;
        while (E = In(E, n));
        return !1;
      };
    case Mu.SelectorType.Parent:
      return function(c) {
        return n.getChildren(c).some(function(E) {
          return n.isTag(E) && e(E);
        });
      };
    case Mu.SelectorType.Child:
      return function(c) {
        var E = n.getParent(c);
        return E != null && n.isTag(E) && e(E);
      };
    case Mu.SelectorType.Sibling:
      return function(c) {
        for (var E = n.getSiblings(c), f = 0; f < E.length; f++) {
          var m = E[f];
          if (i(c, m))
            break;
          if (n.isTag(m) && e(m))
            return !0;
        }
        return !1;
      };
    case Mu.SelectorType.Adjacent:
      return n.prevElementSibling ? function(c) {
        var E = n.prevElementSibling(c);
        return E != null && e(E);
      } : function(c) {
        for (var E = n.getSiblings(c), f, m = 0; m < E.length; m++) {
          var v = E[m];
          if (i(c, v))
            break;
          n.isTag(v) && (f = v);
        }
        return !!f && e(f);
      };
    case Mu.SelectorType.Universal: {
      if (u.namespace != null && u.namespace !== "*")
        throw new Error("Namespaced universal selectors are not yet supported by css-select");
      return e;
    }
  }
}
Ba.compileGeneralSelector = rh;
var ah = C && C.__createBinding || (Object.create ? function(e, u, t, r) {
  r === void 0 && (r = t);
  var a = Object.getOwnPropertyDescriptor(u, t);
  (!a || ("get" in a ? !u.__esModule : a.writable || a.configurable)) && (a = { enumerable: !0, get: function() {
    return u[t];
  } }), Object.defineProperty(e, r, a);
} : function(e, u, t, r) {
  r === void 0 && (r = t), e[r] = u[t];
}), nh = C && C.__setModuleDefault || (Object.create ? function(e, u) {
  Object.defineProperty(e, "default", { enumerable: !0, value: u });
} : function(e, u) {
  e.default = u;
}), ih = C && C.__importStar || function(e) {
  if (e && e.__esModule)
    return e;
  var u = {};
  if (e != null)
    for (var t in e)
      t !== "default" && Object.prototype.hasOwnProperty.call(e, t) && ah(u, e, t);
  return nh(u, e), u;
}, ch = C && C.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(mt, "__esModule", { value: !0 });
mt.compileToken = mt.compileUnsafe = mt.compile = void 0;
var at = dr, bt = ch(qt), bi = ih(S0), sh = Ba, Vd = Fa;
function oh(e, u, t) {
  var r = Yd(e, u, t);
  return (0, Vd.ensureIsTag)(r, u.adapter);
}
mt.compile = oh;
function Yd(e, u, t) {
  var r = typeof e == "string" ? (0, at.parse)(e) : e;
  return ic(r, u, t);
}
mt.compileUnsafe = Yd;
function Wd(e) {
  return e.type === at.SelectorType.Pseudo && (e.name === "scope" || Array.isArray(e.data) && e.data.some(function(u) {
    return u.some(Wd);
  }));
}
var dh = { type: at.SelectorType.Descendant }, lh = {
  type: "_flexibleDescendant"
}, fh = {
  type: at.SelectorType.Pseudo,
  name: "scope",
  data: null
};
function bh(e, u, t) {
  for (var r = u.adapter, a = !!(t != null && t.every(function(o) {
    var d = r.isTag(o) && r.getParent(o);
    return o === Vd.PLACEHOLDER_ELEMENT || d && r.isTag(d);
  })), n = 0, i = e; n < i.length; n++) {
    var s = i[n];
    if (!(s.length > 0 && (0, bi.isTraversal)(s[0]) && s[0].type !== at.SelectorType.Descendant))
      if (a && !s.some(Wd))
        s.unshift(dh);
      else
        continue;
    s.unshift(fh);
  }
}
function ic(e, u, t) {
  var r;
  e.forEach(bi.default), t = (r = u.context) !== null && r !== void 0 ? r : t;
  var a = Array.isArray(t), n = t && (Array.isArray(t) ? t : [t]);
  if (u.relativeSelector !== !1)
    bh(e, u, n);
  else if (e.some(function(o) {
    return o.length > 0 && (0, bi.isTraversal)(o[0]);
  }))
    throw new Error("Relative selectors are not allowed when the `relativeSelector` option is disabled");
  var i = !1, s = e.map(function(o) {
    if (o.length >= 2) {
      var d = o[0], c = o[1];
      d.type !== at.SelectorType.Pseudo || d.name !== "scope" || (a && c.type === at.SelectorType.Descendant ? o[1] = lh : (c.type === at.SelectorType.Adjacent || c.type === at.SelectorType.Sibling) && (i = !0));
    }
    return hh(o, u, n);
  }).reduce(ph, bt.default.falseFunc);
  return s.shouldTestNextSiblings = i, s;
}
mt.compileToken = ic;
function hh(e, u, t) {
  var r;
  return e.reduce(function(a, n) {
    return a === bt.default.falseFunc ? bt.default.falseFunc : (0, sh.compileGeneralSelector)(a, n, u, t, ic);
  }, (r = u.rootFunc) !== null && r !== void 0 ? r : bt.default.trueFunc);
}
function ph(e, u) {
  return u === bt.default.falseFunc || e === bt.default.trueFunc ? e : e === bt.default.falseFunc || u === bt.default.trueFunc ? u : function(r) {
    return e(r) || u(r);
  };
}
(function(e) {
  var u = C && C.__createBinding || (Object.create ? function(w, H, k, R) {
    R === void 0 && (R = k);
    var G = Object.getOwnPropertyDescriptor(H, k);
    (!G || ("get" in G ? !H.__esModule : G.writable || G.configurable)) && (G = { enumerable: !0, get: function() {
      return H[k];
    } }), Object.defineProperty(w, R, G);
  } : function(w, H, k, R) {
    R === void 0 && (R = k), w[R] = H[k];
  }), t = C && C.__setModuleDefault || (Object.create ? function(w, H) {
    Object.defineProperty(w, "default", { enumerable: !0, value: H });
  } : function(w, H) {
    w.default = H;
  }), r = C && C.__importStar || function(w) {
    if (w && w.__esModule)
      return w;
    var H = {};
    if (w != null)
      for (var k in w)
        k !== "default" && Object.prototype.hasOwnProperty.call(w, k) && u(H, w, k);
    return t(H, w), H;
  }, a = C && C.__importDefault || function(w) {
    return w && w.__esModule ? w : { default: w };
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.aliases = e.pseudos = e.filters = e.is = e.selectOne = e.selectAll = e.prepareContext = e._compileToken = e._compileUnsafe = e.compile = void 0;
  var n = r(bd), i = a(qt), s = mt, o = Fa, d = function(w, H) {
    return w === H;
  }, c = {
    adapter: n,
    equals: d
  };
  function E(w) {
    var H, k, R, G, X = w ?? c;
    return (H = X.adapter) !== null && H !== void 0 || (X.adapter = n), (k = X.equals) !== null && k !== void 0 || (X.equals = (G = (R = X.adapter) === null || R === void 0 ? void 0 : R.equals) !== null && G !== void 0 ? G : d), X;
  }
  function f(w) {
    return function(k, R, G) {
      var X = E(R);
      return w(k, X, G);
    };
  }
  e.compile = f(s.compile), e._compileUnsafe = f(s.compileUnsafe), e._compileToken = f(s.compileToken);
  function m(w) {
    return function(k, R, G) {
      var X = E(G);
      typeof k != "function" && (k = (0, s.compileUnsafe)(k, X, R));
      var Z = v(R, X.adapter, k.shouldTestNextSiblings);
      return w(k, Z, X);
    };
  }
  function v(w, H, k) {
    return k === void 0 && (k = !1), k && (w = L(w, H)), Array.isArray(w) ? H.removeSubsets(w) : H.getChildren(w);
  }
  e.prepareContext = v;
  function L(w, H) {
    for (var k = Array.isArray(w) ? w.slice(0) : [w], R = k.length, G = 0; G < R; G++) {
      var X = (0, o.getNextSiblings)(k[G], H);
      k.push.apply(k, X);
    }
    return k;
  }
  e.selectAll = m(function(w, H, k) {
    return w === i.default.falseFunc || !H || H.length === 0 ? [] : k.adapter.findAll(w, H);
  }), e.selectOne = m(function(w, H, k) {
    return w === i.default.falseFunc || !H || H.length === 0 ? null : k.adapter.findOne(w, H);
  });
  function N(w, H, k) {
    var R = E(k);
    return (typeof H == "function" ? H : (0, s.compile)(H, R))(w);
  }
  e.is = N, e.default = e.selectAll;
  var O = ac;
  Object.defineProperty(e, "filters", { enumerable: !0, get: function() {
    return O.filters;
  } }), Object.defineProperty(e, "pseudos", { enumerable: !0, get: function() {
    return O.pseudos;
  } }), Object.defineProperty(e, "aliases", { enumerable: !0, get: function() {
    return O.aliases;
  } });
})(ci);
var Xd = {}, Iu = {}, Gt = {}, ce = {}, Tt = C && C.__extends || /* @__PURE__ */ function() {
  var e = function(u, t) {
    return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, a) {
      r.__proto__ = a;
    } || function(r, a) {
      for (var n in a)
        Object.prototype.hasOwnProperty.call(a, n) && (r[n] = a[n]);
    }, e(u, t);
  };
  return function(u, t) {
    if (typeof t != "function" && t !== null)
      throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
    e(u, t);
    function r() {
      this.constructor = u;
    }
    u.prototype = t === null ? Object.create(t) : (r.prototype = t.prototype, new r());
  };
}(), j0 = C && C.__assign || function() {
  return j0 = Object.assign || function(e) {
    for (var u, t = 1, r = arguments.length; t < r; t++) {
      u = arguments[t];
      for (var a in u)
        Object.prototype.hasOwnProperty.call(u, a) && (e[a] = u[a]);
    }
    return e;
  }, j0.apply(this, arguments);
};
Object.defineProperty(ce, "__esModule", { value: !0 });
ce.cloneNode = ce.hasChildren = ce.isDocument = ce.isDirective = ce.isComment = ce.isText = ce.isCDATA = ce.isTag = ce.Element = ce.Document = ce.CDATA = ce.NodeWithChildren = ce.ProcessingInstruction = ce.Comment = ce.Text = ce.DataNode = ce.Node = void 0;
var pu = Be, cc = (
  /** @class */
  function() {
    function e() {
      this.parent = null, this.prev = null, this.next = null, this.startIndex = null, this.endIndex = null;
    }
    return Object.defineProperty(e.prototype, "parentNode", {
      // Read-write aliases for properties
      /**
       * Same as {@link parent}.
       * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
       */
      get: function() {
        return this.parent;
      },
      set: function(u) {
        this.parent = u;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "previousSibling", {
      /**
       * Same as {@link prev}.
       * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
       */
      get: function() {
        return this.prev;
      },
      set: function(u) {
        this.prev = u;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "nextSibling", {
      /**
       * Same as {@link next}.
       * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
       */
      get: function() {
        return this.next;
      },
      set: function(u) {
        this.next = u;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.cloneNode = function(u) {
      return u === void 0 && (u = !1), sc(this, u);
    }, e;
  }()
);
ce.Node = cc;
var qa = (
  /** @class */
  function(e) {
    Tt(u, e);
    function u(t) {
      var r = e.call(this) || this;
      return r.data = t, r;
    }
    return Object.defineProperty(u.prototype, "nodeValue", {
      /**
       * Same as {@link data}.
       * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
       */
      get: function() {
        return this.data;
      },
      set: function(t) {
        this.data = t;
      },
      enumerable: !1,
      configurable: !0
    }), u;
  }(cc)
);
ce.DataNode = qa;
var zd = (
  /** @class */
  function(e) {
    Tt(u, e);
    function u() {
      var t = e !== null && e.apply(this, arguments) || this;
      return t.type = pu.ElementType.Text, t;
    }
    return Object.defineProperty(u.prototype, "nodeType", {
      get: function() {
        return 3;
      },
      enumerable: !1,
      configurable: !0
    }), u;
  }(qa)
);
ce.Text = zd;
var Qd = (
  /** @class */
  function(e) {
    Tt(u, e);
    function u() {
      var t = e !== null && e.apply(this, arguments) || this;
      return t.type = pu.ElementType.Comment, t;
    }
    return Object.defineProperty(u.prototype, "nodeType", {
      get: function() {
        return 8;
      },
      enumerable: !1,
      configurable: !0
    }), u;
  }(qa)
);
ce.Comment = Qd;
var Kd = (
  /** @class */
  function(e) {
    Tt(u, e);
    function u(t, r) {
      var a = e.call(this, r) || this;
      return a.name = t, a.type = pu.ElementType.Directive, a;
    }
    return Object.defineProperty(u.prototype, "nodeType", {
      get: function() {
        return 1;
      },
      enumerable: !1,
      configurable: !0
    }), u;
  }(qa)
);
ce.ProcessingInstruction = Kd;
var Ga = (
  /** @class */
  function(e) {
    Tt(u, e);
    function u(t) {
      var r = e.call(this) || this;
      return r.children = t, r;
    }
    return Object.defineProperty(u.prototype, "firstChild", {
      // Aliases
      /** First child of the node. */
      get: function() {
        var t;
        return (t = this.children[0]) !== null && t !== void 0 ? t : null;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(u.prototype, "lastChild", {
      /** Last child of the node. */
      get: function() {
        return this.children.length > 0 ? this.children[this.children.length - 1] : null;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(u.prototype, "childNodes", {
      /**
       * Same as {@link children}.
       * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
       */
      get: function() {
        return this.children;
      },
      set: function(t) {
        this.children = t;
      },
      enumerable: !1,
      configurable: !0
    }), u;
  }(cc)
);
ce.NodeWithChildren = Ga;
var Jd = (
  /** @class */
  function(e) {
    Tt(u, e);
    function u() {
      var t = e !== null && e.apply(this, arguments) || this;
      return t.type = pu.ElementType.CDATA, t;
    }
    return Object.defineProperty(u.prototype, "nodeType", {
      get: function() {
        return 4;
      },
      enumerable: !1,
      configurable: !0
    }), u;
  }(Ga)
);
ce.CDATA = Jd;
var Zd = (
  /** @class */
  function(e) {
    Tt(u, e);
    function u() {
      var t = e !== null && e.apply(this, arguments) || this;
      return t.type = pu.ElementType.Root, t;
    }
    return Object.defineProperty(u.prototype, "nodeType", {
      get: function() {
        return 9;
      },
      enumerable: !1,
      configurable: !0
    }), u;
  }(Ga)
);
ce.Document = Zd;
var el = (
  /** @class */
  function(e) {
    Tt(u, e);
    function u(t, r, a, n) {
      a === void 0 && (a = []), n === void 0 && (n = t === "script" ? pu.ElementType.Script : t === "style" ? pu.ElementType.Style : pu.ElementType.Tag);
      var i = e.call(this, a) || this;
      return i.name = t, i.attribs = r, i.type = n, i;
    }
    return Object.defineProperty(u.prototype, "nodeType", {
      get: function() {
        return 1;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(u.prototype, "tagName", {
      // DOM Level 1 aliases
      /**
       * Same as {@link name}.
       * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
       */
      get: function() {
        return this.name;
      },
      set: function(t) {
        this.name = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(u.prototype, "attributes", {
      get: function() {
        var t = this;
        return Object.keys(this.attribs).map(function(r) {
          var a, n;
          return {
            name: r,
            value: t.attribs[r],
            namespace: (a = t["x-attribsNamespace"]) === null || a === void 0 ? void 0 : a[r],
            prefix: (n = t["x-attribsPrefix"]) === null || n === void 0 ? void 0 : n[r]
          };
        });
      },
      enumerable: !1,
      configurable: !0
    }), u;
  }(Ga)
);
ce.Element = el;
function ul(e) {
  return (0, pu.isTag)(e);
}
ce.isTag = ul;
function tl(e) {
  return e.type === pu.ElementType.CDATA;
}
ce.isCDATA = tl;
function rl(e) {
  return e.type === pu.ElementType.Text;
}
ce.isText = rl;
function al(e) {
  return e.type === pu.ElementType.Comment;
}
ce.isComment = al;
function nl(e) {
  return e.type === pu.ElementType.Directive;
}
ce.isDirective = nl;
function il(e) {
  return e.type === pu.ElementType.Root;
}
ce.isDocument = il;
function mh(e) {
  return Object.prototype.hasOwnProperty.call(e, "children");
}
ce.hasChildren = mh;
function sc(e, u) {
  u === void 0 && (u = !1);
  var t;
  if (rl(e))
    t = new zd(e.data);
  else if (al(e))
    t = new Qd(e.data);
  else if (ul(e)) {
    var r = u ? Dn(e.children) : [], a = new el(e.name, j0({}, e.attribs), r);
    r.forEach(function(o) {
      return o.parent = a;
    }), e.namespace != null && (a.namespace = e.namespace), e["x-attribsNamespace"] && (a["x-attribsNamespace"] = j0({}, e["x-attribsNamespace"])), e["x-attribsPrefix"] && (a["x-attribsPrefix"] = j0({}, e["x-attribsPrefix"])), t = a;
  } else if (tl(e)) {
    var r = u ? Dn(e.children) : [], n = new Jd(r);
    r.forEach(function(d) {
      return d.parent = n;
    }), t = n;
  } else if (il(e)) {
    var r = u ? Dn(e.children) : [], i = new Zd(r);
    r.forEach(function(d) {
      return d.parent = i;
    }), e["x-mode"] && (i["x-mode"] = e["x-mode"]), t = i;
  } else if (nl(e)) {
    var s = new Kd(e.name, e.data);
    e["x-name"] != null && (s["x-name"] = e["x-name"], s["x-publicId"] = e["x-publicId"], s["x-systemId"] = e["x-systemId"]), t = s;
  } else
    throw new Error("Not implemented yet: ".concat(e.type));
  return t.startIndex = e.startIndex, t.endIndex = e.endIndex, e.sourceCodeLocation != null && (t.sourceCodeLocation = e.sourceCodeLocation), t;
}
ce.cloneNode = sc;
function Dn(e) {
  for (var u = e.map(function(r) {
    return sc(r, !0);
  }), t = 1; t < u.length; t++)
    u[t].prev = u[t - 1], u[t - 1].next = u[t];
  return u;
}
(function(e) {
  var u = C && C.__createBinding || (Object.create ? function(s, o, d, c) {
    c === void 0 && (c = d);
    var E = Object.getOwnPropertyDescriptor(o, d);
    (!E || ("get" in E ? !o.__esModule : E.writable || E.configurable)) && (E = { enumerable: !0, get: function() {
      return o[d];
    } }), Object.defineProperty(s, c, E);
  } : function(s, o, d, c) {
    c === void 0 && (c = d), s[c] = o[d];
  }), t = C && C.__exportStar || function(s, o) {
    for (var d in s)
      d !== "default" && !Object.prototype.hasOwnProperty.call(o, d) && u(o, s, d);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.DomHandler = void 0;
  var r = Be, a = ce;
  t(ce, e);
  var n = {
    withStartIndices: !1,
    withEndIndices: !1,
    xmlMode: !1
  }, i = (
    /** @class */
    function() {
      function s(o, d, c) {
        this.dom = [], this.root = new a.Document(this.dom), this.done = !1, this.tagStack = [this.root], this.lastNode = null, this.parser = null, typeof d == "function" && (c = d, d = n), typeof o == "object" && (d = o, o = void 0), this.callback = o ?? null, this.options = d ?? n, this.elementCB = c ?? null;
      }
      return s.prototype.onparserinit = function(o) {
        this.parser = o;
      }, s.prototype.onreset = function() {
        this.dom = [], this.root = new a.Document(this.dom), this.done = !1, this.tagStack = [this.root], this.lastNode = null, this.parser = null;
      }, s.prototype.onend = function() {
        this.done || (this.done = !0, this.parser = null, this.handleCallback(null));
      }, s.prototype.onerror = function(o) {
        this.handleCallback(o);
      }, s.prototype.onclosetag = function() {
        this.lastNode = null;
        var o = this.tagStack.pop();
        this.options.withEndIndices && (o.endIndex = this.parser.endIndex), this.elementCB && this.elementCB(o);
      }, s.prototype.onopentag = function(o, d) {
        var c = this.options.xmlMode ? r.ElementType.Tag : void 0, E = new a.Element(o, d, void 0, c);
        this.addNode(E), this.tagStack.push(E);
      }, s.prototype.ontext = function(o) {
        var d = this.lastNode;
        if (d && d.type === r.ElementType.Text)
          d.data += o, this.options.withEndIndices && (d.endIndex = this.parser.endIndex);
        else {
          var c = new a.Text(o);
          this.addNode(c), this.lastNode = c;
        }
      }, s.prototype.oncomment = function(o) {
        if (this.lastNode && this.lastNode.type === r.ElementType.Comment) {
          this.lastNode.data += o;
          return;
        }
        var d = new a.Comment(o);
        this.addNode(d), this.lastNode = d;
      }, s.prototype.oncommentend = function() {
        this.lastNode = null;
      }, s.prototype.oncdatastart = function() {
        var o = new a.Text(""), d = new a.CDATA([o]);
        this.addNode(d), o.parent = d, this.lastNode = o;
      }, s.prototype.oncdataend = function() {
        this.lastNode = null;
      }, s.prototype.onprocessinginstruction = function(o, d) {
        var c = new a.ProcessingInstruction(o, d);
        this.addNode(c);
      }, s.prototype.handleCallback = function(o) {
        if (typeof this.callback == "function")
          this.callback(o, this.dom);
        else if (o)
          throw o;
      }, s.prototype.addNode = function(o) {
        var d = this.tagStack[this.tagStack.length - 1], c = d.children[d.children.length - 1];
        this.options.withStartIndices && (o.startIndex = this.parser.startIndex), this.options.withEndIndices && (o.endIndex = this.parser.endIndex), d.children.push(o), c && (o.prev = c, c.next = o), o.parent = d, this.lastNode = null;
      }, s;
    }()
  );
  e.DomHandler = i, e.default = i;
})(Gt);
var hr = {}, cl = {}, hi = {}, oc = {};
Object.defineProperty(oc, "__esModule", { value: !0 });
oc.default = new Uint16Array(
  // prettier-ignore
  'ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map(function(e) {
    return e.charCodeAt(0);
  })
);
var dc = {};
Object.defineProperty(dc, "__esModule", { value: !0 });
dc.default = new Uint16Array(
  // prettier-ignore
  "Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map(function(e) {
    return e.charCodeAt(0);
  })
);
var pi = {};
(function(e) {
  var u;
  Object.defineProperty(e, "__esModule", { value: !0 }), e.replaceCodePoint = e.fromCodePoint = void 0;
  var t = /* @__PURE__ */ new Map([
    [0, 65533],
    // C1 Unicode control character reference replacements
    [128, 8364],
    [130, 8218],
    [131, 402],
    [132, 8222],
    [133, 8230],
    [134, 8224],
    [135, 8225],
    [136, 710],
    [137, 8240],
    [138, 352],
    [139, 8249],
    [140, 338],
    [142, 381],
    [145, 8216],
    [146, 8217],
    [147, 8220],
    [148, 8221],
    [149, 8226],
    [150, 8211],
    [151, 8212],
    [152, 732],
    [153, 8482],
    [154, 353],
    [155, 8250],
    [156, 339],
    [158, 382],
    [159, 376]
  ]);
  e.fromCodePoint = // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, node/no-unsupported-features/es-builtins
  (u = String.fromCodePoint) !== null && u !== void 0 ? u : function(n) {
    var i = "";
    return n > 65535 && (n -= 65536, i += String.fromCharCode(n >>> 10 & 1023 | 55296), n = 56320 | n & 1023), i += String.fromCharCode(n), i;
  };
  function r(n) {
    var i;
    return n >= 55296 && n <= 57343 || n > 1114111 ? 65533 : (i = t.get(n)) !== null && i !== void 0 ? i : n;
  }
  e.replaceCodePoint = r;
  function a(n) {
    return (0, e.fromCodePoint)(r(n));
  }
  e.default = a;
})(pi);
(function(e) {
  var u = C && C.__createBinding || (Object.create ? function(l, g, T, A) {
    A === void 0 && (A = T);
    var D = Object.getOwnPropertyDescriptor(g, T);
    (!D || ("get" in D ? !g.__esModule : D.writable || D.configurable)) && (D = { enumerable: !0, get: function() {
      return g[T];
    } }), Object.defineProperty(l, A, D);
  } : function(l, g, T, A) {
    A === void 0 && (A = T), l[A] = g[T];
  }), t = C && C.__setModuleDefault || (Object.create ? function(l, g) {
    Object.defineProperty(l, "default", { enumerable: !0, value: g });
  } : function(l, g) {
    l.default = g;
  }), r = C && C.__importStar || function(l) {
    if (l && l.__esModule)
      return l;
    var g = {};
    if (l != null)
      for (var T in l)
        T !== "default" && Object.prototype.hasOwnProperty.call(l, T) && u(g, l, T);
    return t(g, l), g;
  }, a = C && C.__importDefault || function(l) {
    return l && l.__esModule ? l : { default: l };
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.decodeXML = e.decodeHTMLStrict = e.decodeHTMLAttribute = e.decodeHTML = e.determineBranch = e.EntityDecoder = e.DecodingMode = e.BinTrieFlags = e.fromCodePoint = e.replaceCodePoint = e.decodeCodePoint = e.xmlDecodeTree = e.htmlDecodeTree = void 0;
  var n = a(oc);
  e.htmlDecodeTree = n.default;
  var i = a(dc);
  e.xmlDecodeTree = i.default;
  var s = r(pi);
  e.decodeCodePoint = s.default;
  var o = pi;
  Object.defineProperty(e, "replaceCodePoint", { enumerable: !0, get: function() {
    return o.replaceCodePoint;
  } }), Object.defineProperty(e, "fromCodePoint", { enumerable: !0, get: function() {
    return o.fromCodePoint;
  } });
  var d;
  (function(l) {
    l[l.NUM = 35] = "NUM", l[l.SEMI = 59] = "SEMI", l[l.EQUALS = 61] = "EQUALS", l[l.ZERO = 48] = "ZERO", l[l.NINE = 57] = "NINE", l[l.LOWER_A = 97] = "LOWER_A", l[l.LOWER_F = 102] = "LOWER_F", l[l.LOWER_X = 120] = "LOWER_X", l[l.LOWER_Z = 122] = "LOWER_Z", l[l.UPPER_A = 65] = "UPPER_A", l[l.UPPER_F = 70] = "UPPER_F", l[l.UPPER_Z = 90] = "UPPER_Z";
  })(d || (d = {}));
  var c = 32, E;
  (function(l) {
    l[l.VALUE_LENGTH = 49152] = "VALUE_LENGTH", l[l.BRANCH_LENGTH = 16256] = "BRANCH_LENGTH", l[l.JUMP_TABLE = 127] = "JUMP_TABLE";
  })(E = e.BinTrieFlags || (e.BinTrieFlags = {}));
  function f(l) {
    return l >= d.ZERO && l <= d.NINE;
  }
  function m(l) {
    return l >= d.UPPER_A && l <= d.UPPER_F || l >= d.LOWER_A && l <= d.LOWER_F;
  }
  function v(l) {
    return l >= d.UPPER_A && l <= d.UPPER_Z || l >= d.LOWER_A && l <= d.LOWER_Z || f(l);
  }
  function L(l) {
    return l === d.EQUALS || v(l);
  }
  var N;
  (function(l) {
    l[l.EntityStart = 0] = "EntityStart", l[l.NumericStart = 1] = "NumericStart", l[l.NumericDecimal = 2] = "NumericDecimal", l[l.NumericHex = 3] = "NumericHex", l[l.NamedEntity = 4] = "NamedEntity";
  })(N || (N = {}));
  var O;
  (function(l) {
    l[l.Legacy = 0] = "Legacy", l[l.Strict = 1] = "Strict", l[l.Attribute = 2] = "Attribute";
  })(O = e.DecodingMode || (e.DecodingMode = {}));
  var w = (
    /** @class */
    function() {
      function l(g, T, A) {
        this.decodeTree = g, this.emitCodePoint = T, this.errors = A, this.state = N.EntityStart, this.consumed = 1, this.result = 0, this.treeIndex = 0, this.excess = 1, this.decodeMode = O.Strict;
      }
      return l.prototype.startEntity = function(g) {
        this.decodeMode = g, this.state = N.EntityStart, this.result = 0, this.treeIndex = 0, this.excess = 1, this.consumed = 1;
      }, l.prototype.write = function(g, T) {
        switch (this.state) {
          case N.EntityStart:
            return g.charCodeAt(T) === d.NUM ? (this.state = N.NumericStart, this.consumed += 1, this.stateNumericStart(g, T + 1)) : (this.state = N.NamedEntity, this.stateNamedEntity(g, T));
          case N.NumericStart:
            return this.stateNumericStart(g, T);
          case N.NumericDecimal:
            return this.stateNumericDecimal(g, T);
          case N.NumericHex:
            return this.stateNumericHex(g, T);
          case N.NamedEntity:
            return this.stateNamedEntity(g, T);
        }
      }, l.prototype.stateNumericStart = function(g, T) {
        return T >= g.length ? -1 : (g.charCodeAt(T) | c) === d.LOWER_X ? (this.state = N.NumericHex, this.consumed += 1, this.stateNumericHex(g, T + 1)) : (this.state = N.NumericDecimal, this.stateNumericDecimal(g, T));
      }, l.prototype.addToNumericResult = function(g, T, A, D) {
        if (T !== A) {
          var B = A - T;
          this.result = this.result * Math.pow(D, B) + parseInt(g.substr(T, B), D), this.consumed += B;
        }
      }, l.prototype.stateNumericHex = function(g, T) {
        for (var A = T; T < g.length; ) {
          var D = g.charCodeAt(T);
          if (f(D) || m(D))
            T += 1;
          else
            return this.addToNumericResult(g, A, T, 16), this.emitNumericEntity(D, 3);
        }
        return this.addToNumericResult(g, A, T, 16), -1;
      }, l.prototype.stateNumericDecimal = function(g, T) {
        for (var A = T; T < g.length; ) {
          var D = g.charCodeAt(T);
          if (f(D))
            T += 1;
          else
            return this.addToNumericResult(g, A, T, 10), this.emitNumericEntity(D, 2);
        }
        return this.addToNumericResult(g, A, T, 10), -1;
      }, l.prototype.emitNumericEntity = function(g, T) {
        var A;
        if (this.consumed <= T)
          return (A = this.errors) === null || A === void 0 || A.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
        if (g === d.SEMI)
          this.consumed += 1;
        else if (this.decodeMode === O.Strict)
          return 0;
        return this.emitCodePoint((0, s.replaceCodePoint)(this.result), this.consumed), this.errors && (g !== d.SEMI && this.errors.missingSemicolonAfterCharacterReference(), this.errors.validateNumericCharacterReference(this.result)), this.consumed;
      }, l.prototype.stateNamedEntity = function(g, T) {
        for (var A = this.decodeTree, D = A[this.treeIndex], B = (D & E.VALUE_LENGTH) >> 14; T < g.length; T++, this.excess++) {
          var M = g.charCodeAt(T);
          if (this.treeIndex = k(A, D, this.treeIndex + Math.max(1, B), M), this.treeIndex < 0)
            return this.result === 0 || // If we are parsing an attribute
            this.decodeMode === O.Attribute && // We shouldn't have consumed any characters after the entity,
            (B === 0 || // And there should be no invalid characters.
            L(M)) ? 0 : this.emitNotTerminatedNamedEntity();
          if (D = A[this.treeIndex], B = (D & E.VALUE_LENGTH) >> 14, B !== 0) {
            if (M === d.SEMI)
              return this.emitNamedEntityData(this.treeIndex, B, this.consumed + this.excess);
            this.decodeMode !== O.Strict && (this.result = this.treeIndex, this.consumed += this.excess, this.excess = 0);
          }
        }
        return -1;
      }, l.prototype.emitNotTerminatedNamedEntity = function() {
        var g, T = this, A = T.result, D = T.decodeTree, B = (D[A] & E.VALUE_LENGTH) >> 14;
        return this.emitNamedEntityData(A, B, this.consumed), (g = this.errors) === null || g === void 0 || g.missingSemicolonAfterCharacterReference(), this.consumed;
      }, l.prototype.emitNamedEntityData = function(g, T, A) {
        var D = this.decodeTree;
        return this.emitCodePoint(T === 1 ? D[g] & ~E.VALUE_LENGTH : D[g + 1], A), T === 3 && this.emitCodePoint(D[g + 2], A), A;
      }, l.prototype.end = function() {
        var g;
        switch (this.state) {
          case N.NamedEntity:
            return this.result !== 0 && (this.decodeMode !== O.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
          case N.NumericDecimal:
            return this.emitNumericEntity(0, 2);
          case N.NumericHex:
            return this.emitNumericEntity(0, 3);
          case N.NumericStart:
            return (g = this.errors) === null || g === void 0 || g.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
          case N.EntityStart:
            return 0;
        }
      }, l;
    }()
  );
  e.EntityDecoder = w;
  function H(l) {
    var g = "", T = new w(l, function(A) {
      return g += (0, s.fromCodePoint)(A);
    });
    return function(D, B) {
      for (var M = 0, $ = 0; ($ = D.indexOf("&", $)) >= 0; ) {
        g += D.slice(M, $), T.startEntity(B);
        var J = T.write(
          D,
          // Skip the "&"
          $ + 1
        );
        if (J < 0) {
          M = $ + T.end();
          break;
        }
        M = $ + J, $ = J === 0 ? M + 1 : M;
      }
      var z = g + D.slice(M);
      return g = "", z;
    };
  }
  function k(l, g, T, A) {
    var D = (g & E.BRANCH_LENGTH) >> 7, B = g & E.JUMP_TABLE;
    if (D === 0)
      return B !== 0 && A === B ? T : -1;
    if (B) {
      var M = A - B;
      return M < 0 || M >= D ? -1 : l[T + M] - 1;
    }
    for (var $ = T, J = $ + D - 1; $ <= J; ) {
      var z = $ + J >>> 1, be = l[z];
      if (be < A)
        $ = z + 1;
      else if (be > A)
        J = z - 1;
      else
        return l[z + D];
    }
    return -1;
  }
  e.determineBranch = k;
  var R = H(n.default), G = H(i.default);
  function X(l, g) {
    return g === void 0 && (g = O.Legacy), R(l, g);
  }
  e.decodeHTML = X;
  function Z(l) {
    return R(l, O.Attribute);
  }
  e.decodeHTMLAttribute = Z;
  function re(l) {
    return R(l, O.Strict);
  }
  e.decodeHTMLStrict = re;
  function Y(l) {
    return G(l, O.Strict);
  }
  e.decodeXML = Y;
})(hi);
var Rt = {}, lc = {};
Object.defineProperty(lc, "__esModule", { value: !0 });
function Rr(e) {
  for (var u = 1; u < e.length; u++)
    e[u][0] += e[u - 1][0] + 1;
  return e;
}
lc.default = new Map(/* @__PURE__ */ Rr([[9, "&Tab;"], [0, "&NewLine;"], [22, "&excl;"], [0, "&quot;"], [0, "&num;"], [0, "&dollar;"], [0, "&percnt;"], [0, "&amp;"], [0, "&apos;"], [0, "&lpar;"], [0, "&rpar;"], [0, "&ast;"], [0, "&plus;"], [0, "&comma;"], [1, "&period;"], [0, "&sol;"], [10, "&colon;"], [0, "&semi;"], [0, { v: "&lt;", n: 8402, o: "&nvlt;" }], [0, { v: "&equals;", n: 8421, o: "&bne;" }], [0, { v: "&gt;", n: 8402, o: "&nvgt;" }], [0, "&quest;"], [0, "&commat;"], [26, "&lbrack;"], [0, "&bsol;"], [0, "&rbrack;"], [0, "&Hat;"], [0, "&lowbar;"], [0, "&DiacriticalGrave;"], [5, { n: 106, o: "&fjlig;" }], [20, "&lbrace;"], [0, "&verbar;"], [0, "&rbrace;"], [34, "&nbsp;"], [0, "&iexcl;"], [0, "&cent;"], [0, "&pound;"], [0, "&curren;"], [0, "&yen;"], [0, "&brvbar;"], [0, "&sect;"], [0, "&die;"], [0, "&copy;"], [0, "&ordf;"], [0, "&laquo;"], [0, "&not;"], [0, "&shy;"], [0, "&circledR;"], [0, "&macr;"], [0, "&deg;"], [0, "&PlusMinus;"], [0, "&sup2;"], [0, "&sup3;"], [0, "&acute;"], [0, "&micro;"], [0, "&para;"], [0, "&centerdot;"], [0, "&cedil;"], [0, "&sup1;"], [0, "&ordm;"], [0, "&raquo;"], [0, "&frac14;"], [0, "&frac12;"], [0, "&frac34;"], [0, "&iquest;"], [0, "&Agrave;"], [0, "&Aacute;"], [0, "&Acirc;"], [0, "&Atilde;"], [0, "&Auml;"], [0, "&angst;"], [0, "&AElig;"], [0, "&Ccedil;"], [0, "&Egrave;"], [0, "&Eacute;"], [0, "&Ecirc;"], [0, "&Euml;"], [0, "&Igrave;"], [0, "&Iacute;"], [0, "&Icirc;"], [0, "&Iuml;"], [0, "&ETH;"], [0, "&Ntilde;"], [0, "&Ograve;"], [0, "&Oacute;"], [0, "&Ocirc;"], [0, "&Otilde;"], [0, "&Ouml;"], [0, "&times;"], [0, "&Oslash;"], [0, "&Ugrave;"], [0, "&Uacute;"], [0, "&Ucirc;"], [0, "&Uuml;"], [0, "&Yacute;"], [0, "&THORN;"], [0, "&szlig;"], [0, "&agrave;"], [0, "&aacute;"], [0, "&acirc;"], [0, "&atilde;"], [0, "&auml;"], [0, "&aring;"], [0, "&aelig;"], [0, "&ccedil;"], [0, "&egrave;"], [0, "&eacute;"], [0, "&ecirc;"], [0, "&euml;"], [0, "&igrave;"], [0, "&iacute;"], [0, "&icirc;"], [0, "&iuml;"], [0, "&eth;"], [0, "&ntilde;"], [0, "&ograve;"], [0, "&oacute;"], [0, "&ocirc;"], [0, "&otilde;"], [0, "&ouml;"], [0, "&div;"], [0, "&oslash;"], [0, "&ugrave;"], [0, "&uacute;"], [0, "&ucirc;"], [0, "&uuml;"], [0, "&yacute;"], [0, "&thorn;"], [0, "&yuml;"], [0, "&Amacr;"], [0, "&amacr;"], [0, "&Abreve;"], [0, "&abreve;"], [0, "&Aogon;"], [0, "&aogon;"], [0, "&Cacute;"], [0, "&cacute;"], [0, "&Ccirc;"], [0, "&ccirc;"], [0, "&Cdot;"], [0, "&cdot;"], [0, "&Ccaron;"], [0, "&ccaron;"], [0, "&Dcaron;"], [0, "&dcaron;"], [0, "&Dstrok;"], [0, "&dstrok;"], [0, "&Emacr;"], [0, "&emacr;"], [2, "&Edot;"], [0, "&edot;"], [0, "&Eogon;"], [0, "&eogon;"], [0, "&Ecaron;"], [0, "&ecaron;"], [0, "&Gcirc;"], [0, "&gcirc;"], [0, "&Gbreve;"], [0, "&gbreve;"], [0, "&Gdot;"], [0, "&gdot;"], [0, "&Gcedil;"], [1, "&Hcirc;"], [0, "&hcirc;"], [0, "&Hstrok;"], [0, "&hstrok;"], [0, "&Itilde;"], [0, "&itilde;"], [0, "&Imacr;"], [0, "&imacr;"], [2, "&Iogon;"], [0, "&iogon;"], [0, "&Idot;"], [0, "&imath;"], [0, "&IJlig;"], [0, "&ijlig;"], [0, "&Jcirc;"], [0, "&jcirc;"], [0, "&Kcedil;"], [0, "&kcedil;"], [0, "&kgreen;"], [0, "&Lacute;"], [0, "&lacute;"], [0, "&Lcedil;"], [0, "&lcedil;"], [0, "&Lcaron;"], [0, "&lcaron;"], [0, "&Lmidot;"], [0, "&lmidot;"], [0, "&Lstrok;"], [0, "&lstrok;"], [0, "&Nacute;"], [0, "&nacute;"], [0, "&Ncedil;"], [0, "&ncedil;"], [0, "&Ncaron;"], [0, "&ncaron;"], [0, "&napos;"], [0, "&ENG;"], [0, "&eng;"], [0, "&Omacr;"], [0, "&omacr;"], [2, "&Odblac;"], [0, "&odblac;"], [0, "&OElig;"], [0, "&oelig;"], [0, "&Racute;"], [0, "&racute;"], [0, "&Rcedil;"], [0, "&rcedil;"], [0, "&Rcaron;"], [0, "&rcaron;"], [0, "&Sacute;"], [0, "&sacute;"], [0, "&Scirc;"], [0, "&scirc;"], [0, "&Scedil;"], [0, "&scedil;"], [0, "&Scaron;"], [0, "&scaron;"], [0, "&Tcedil;"], [0, "&tcedil;"], [0, "&Tcaron;"], [0, "&tcaron;"], [0, "&Tstrok;"], [0, "&tstrok;"], [0, "&Utilde;"], [0, "&utilde;"], [0, "&Umacr;"], [0, "&umacr;"], [0, "&Ubreve;"], [0, "&ubreve;"], [0, "&Uring;"], [0, "&uring;"], [0, "&Udblac;"], [0, "&udblac;"], [0, "&Uogon;"], [0, "&uogon;"], [0, "&Wcirc;"], [0, "&wcirc;"], [0, "&Ycirc;"], [0, "&ycirc;"], [0, "&Yuml;"], [0, "&Zacute;"], [0, "&zacute;"], [0, "&Zdot;"], [0, "&zdot;"], [0, "&Zcaron;"], [0, "&zcaron;"], [19, "&fnof;"], [34, "&imped;"], [63, "&gacute;"], [65, "&jmath;"], [142, "&circ;"], [0, "&caron;"], [16, "&breve;"], [0, "&DiacriticalDot;"], [0, "&ring;"], [0, "&ogon;"], [0, "&DiacriticalTilde;"], [0, "&dblac;"], [51, "&DownBreve;"], [127, "&Alpha;"], [0, "&Beta;"], [0, "&Gamma;"], [0, "&Delta;"], [0, "&Epsilon;"], [0, "&Zeta;"], [0, "&Eta;"], [0, "&Theta;"], [0, "&Iota;"], [0, "&Kappa;"], [0, "&Lambda;"], [0, "&Mu;"], [0, "&Nu;"], [0, "&Xi;"], [0, "&Omicron;"], [0, "&Pi;"], [0, "&Rho;"], [1, "&Sigma;"], [0, "&Tau;"], [0, "&Upsilon;"], [0, "&Phi;"], [0, "&Chi;"], [0, "&Psi;"], [0, "&ohm;"], [7, "&alpha;"], [0, "&beta;"], [0, "&gamma;"], [0, "&delta;"], [0, "&epsi;"], [0, "&zeta;"], [0, "&eta;"], [0, "&theta;"], [0, "&iota;"], [0, "&kappa;"], [0, "&lambda;"], [0, "&mu;"], [0, "&nu;"], [0, "&xi;"], [0, "&omicron;"], [0, "&pi;"], [0, "&rho;"], [0, "&sigmaf;"], [0, "&sigma;"], [0, "&tau;"], [0, "&upsi;"], [0, "&phi;"], [0, "&chi;"], [0, "&psi;"], [0, "&omega;"], [7, "&thetasym;"], [0, "&Upsi;"], [2, "&phiv;"], [0, "&piv;"], [5, "&Gammad;"], [0, "&digamma;"], [18, "&kappav;"], [0, "&rhov;"], [3, "&epsiv;"], [0, "&backepsilon;"], [10, "&IOcy;"], [0, "&DJcy;"], [0, "&GJcy;"], [0, "&Jukcy;"], [0, "&DScy;"], [0, "&Iukcy;"], [0, "&YIcy;"], [0, "&Jsercy;"], [0, "&LJcy;"], [0, "&NJcy;"], [0, "&TSHcy;"], [0, "&KJcy;"], [1, "&Ubrcy;"], [0, "&DZcy;"], [0, "&Acy;"], [0, "&Bcy;"], [0, "&Vcy;"], [0, "&Gcy;"], [0, "&Dcy;"], [0, "&IEcy;"], [0, "&ZHcy;"], [0, "&Zcy;"], [0, "&Icy;"], [0, "&Jcy;"], [0, "&Kcy;"], [0, "&Lcy;"], [0, "&Mcy;"], [0, "&Ncy;"], [0, "&Ocy;"], [0, "&Pcy;"], [0, "&Rcy;"], [0, "&Scy;"], [0, "&Tcy;"], [0, "&Ucy;"], [0, "&Fcy;"], [0, "&KHcy;"], [0, "&TScy;"], [0, "&CHcy;"], [0, "&SHcy;"], [0, "&SHCHcy;"], [0, "&HARDcy;"], [0, "&Ycy;"], [0, "&SOFTcy;"], [0, "&Ecy;"], [0, "&YUcy;"], [0, "&YAcy;"], [0, "&acy;"], [0, "&bcy;"], [0, "&vcy;"], [0, "&gcy;"], [0, "&dcy;"], [0, "&iecy;"], [0, "&zhcy;"], [0, "&zcy;"], [0, "&icy;"], [0, "&jcy;"], [0, "&kcy;"], [0, "&lcy;"], [0, "&mcy;"], [0, "&ncy;"], [0, "&ocy;"], [0, "&pcy;"], [0, "&rcy;"], [0, "&scy;"], [0, "&tcy;"], [0, "&ucy;"], [0, "&fcy;"], [0, "&khcy;"], [0, "&tscy;"], [0, "&chcy;"], [0, "&shcy;"], [0, "&shchcy;"], [0, "&hardcy;"], [0, "&ycy;"], [0, "&softcy;"], [0, "&ecy;"], [0, "&yucy;"], [0, "&yacy;"], [1, "&iocy;"], [0, "&djcy;"], [0, "&gjcy;"], [0, "&jukcy;"], [0, "&dscy;"], [0, "&iukcy;"], [0, "&yicy;"], [0, "&jsercy;"], [0, "&ljcy;"], [0, "&njcy;"], [0, "&tshcy;"], [0, "&kjcy;"], [1, "&ubrcy;"], [0, "&dzcy;"], [7074, "&ensp;"], [0, "&emsp;"], [0, "&emsp13;"], [0, "&emsp14;"], [1, "&numsp;"], [0, "&puncsp;"], [0, "&ThinSpace;"], [0, "&hairsp;"], [0, "&NegativeMediumSpace;"], [0, "&zwnj;"], [0, "&zwj;"], [0, "&lrm;"], [0, "&rlm;"], [0, "&dash;"], [2, "&ndash;"], [0, "&mdash;"], [0, "&horbar;"], [0, "&Verbar;"], [1, "&lsquo;"], [0, "&CloseCurlyQuote;"], [0, "&lsquor;"], [1, "&ldquo;"], [0, "&CloseCurlyDoubleQuote;"], [0, "&bdquo;"], [1, "&dagger;"], [0, "&Dagger;"], [0, "&bull;"], [2, "&nldr;"], [0, "&hellip;"], [9, "&permil;"], [0, "&pertenk;"], [0, "&prime;"], [0, "&Prime;"], [0, "&tprime;"], [0, "&backprime;"], [3, "&lsaquo;"], [0, "&rsaquo;"], [3, "&oline;"], [2, "&caret;"], [1, "&hybull;"], [0, "&frasl;"], [10, "&bsemi;"], [7, "&qprime;"], [7, { v: "&MediumSpace;", n: 8202, o: "&ThickSpace;" }], [0, "&NoBreak;"], [0, "&af;"], [0, "&InvisibleTimes;"], [0, "&ic;"], [72, "&euro;"], [46, "&tdot;"], [0, "&DotDot;"], [37, "&complexes;"], [2, "&incare;"], [4, "&gscr;"], [0, "&hamilt;"], [0, "&Hfr;"], [0, "&Hopf;"], [0, "&planckh;"], [0, "&hbar;"], [0, "&imagline;"], [0, "&Ifr;"], [0, "&lagran;"], [0, "&ell;"], [1, "&naturals;"], [0, "&numero;"], [0, "&copysr;"], [0, "&weierp;"], [0, "&Popf;"], [0, "&Qopf;"], [0, "&realine;"], [0, "&real;"], [0, "&reals;"], [0, "&rx;"], [3, "&trade;"], [1, "&integers;"], [2, "&mho;"], [0, "&zeetrf;"], [0, "&iiota;"], [2, "&bernou;"], [0, "&Cayleys;"], [1, "&escr;"], [0, "&Escr;"], [0, "&Fouriertrf;"], [1, "&Mellintrf;"], [0, "&order;"], [0, "&alefsym;"], [0, "&beth;"], [0, "&gimel;"], [0, "&daleth;"], [12, "&CapitalDifferentialD;"], [0, "&dd;"], [0, "&ee;"], [0, "&ii;"], [10, "&frac13;"], [0, "&frac23;"], [0, "&frac15;"], [0, "&frac25;"], [0, "&frac35;"], [0, "&frac45;"], [0, "&frac16;"], [0, "&frac56;"], [0, "&frac18;"], [0, "&frac38;"], [0, "&frac58;"], [0, "&frac78;"], [49, "&larr;"], [0, "&ShortUpArrow;"], [0, "&rarr;"], [0, "&darr;"], [0, "&harr;"], [0, "&updownarrow;"], [0, "&nwarr;"], [0, "&nearr;"], [0, "&LowerRightArrow;"], [0, "&LowerLeftArrow;"], [0, "&nlarr;"], [0, "&nrarr;"], [1, { v: "&rarrw;", n: 824, o: "&nrarrw;" }], [0, "&Larr;"], [0, "&Uarr;"], [0, "&Rarr;"], [0, "&Darr;"], [0, "&larrtl;"], [0, "&rarrtl;"], [0, "&LeftTeeArrow;"], [0, "&mapstoup;"], [0, "&map;"], [0, "&DownTeeArrow;"], [1, "&hookleftarrow;"], [0, "&hookrightarrow;"], [0, "&larrlp;"], [0, "&looparrowright;"], [0, "&harrw;"], [0, "&nharr;"], [1, "&lsh;"], [0, "&rsh;"], [0, "&ldsh;"], [0, "&rdsh;"], [1, "&crarr;"], [0, "&cularr;"], [0, "&curarr;"], [2, "&circlearrowleft;"], [0, "&circlearrowright;"], [0, "&leftharpoonup;"], [0, "&DownLeftVector;"], [0, "&RightUpVector;"], [0, "&LeftUpVector;"], [0, "&rharu;"], [0, "&DownRightVector;"], [0, "&dharr;"], [0, "&dharl;"], [0, "&RightArrowLeftArrow;"], [0, "&udarr;"], [0, "&LeftArrowRightArrow;"], [0, "&leftleftarrows;"], [0, "&upuparrows;"], [0, "&rightrightarrows;"], [0, "&ddarr;"], [0, "&leftrightharpoons;"], [0, "&Equilibrium;"], [0, "&nlArr;"], [0, "&nhArr;"], [0, "&nrArr;"], [0, "&DoubleLeftArrow;"], [0, "&DoubleUpArrow;"], [0, "&DoubleRightArrow;"], [0, "&dArr;"], [0, "&DoubleLeftRightArrow;"], [0, "&DoubleUpDownArrow;"], [0, "&nwArr;"], [0, "&neArr;"], [0, "&seArr;"], [0, "&swArr;"], [0, "&lAarr;"], [0, "&rAarr;"], [1, "&zigrarr;"], [6, "&larrb;"], [0, "&rarrb;"], [15, "&DownArrowUpArrow;"], [7, "&loarr;"], [0, "&roarr;"], [0, "&hoarr;"], [0, "&forall;"], [0, "&comp;"], [0, { v: "&part;", n: 824, o: "&npart;" }], [0, "&exist;"], [0, "&nexist;"], [0, "&empty;"], [1, "&Del;"], [0, "&Element;"], [0, "&NotElement;"], [1, "&ni;"], [0, "&notni;"], [2, "&prod;"], [0, "&coprod;"], [0, "&sum;"], [0, "&minus;"], [0, "&MinusPlus;"], [0, "&dotplus;"], [1, "&Backslash;"], [0, "&lowast;"], [0, "&compfn;"], [1, "&radic;"], [2, "&prop;"], [0, "&infin;"], [0, "&angrt;"], [0, { v: "&ang;", n: 8402, o: "&nang;" }], [0, "&angmsd;"], [0, "&angsph;"], [0, "&mid;"], [0, "&nmid;"], [0, "&DoubleVerticalBar;"], [0, "&NotDoubleVerticalBar;"], [0, "&and;"], [0, "&or;"], [0, { v: "&cap;", n: 65024, o: "&caps;" }], [0, { v: "&cup;", n: 65024, o: "&cups;" }], [0, "&int;"], [0, "&Int;"], [0, "&iiint;"], [0, "&conint;"], [0, "&Conint;"], [0, "&Cconint;"], [0, "&cwint;"], [0, "&ClockwiseContourIntegral;"], [0, "&awconint;"], [0, "&there4;"], [0, "&becaus;"], [0, "&ratio;"], [0, "&Colon;"], [0, "&dotminus;"], [1, "&mDDot;"], [0, "&homtht;"], [0, { v: "&sim;", n: 8402, o: "&nvsim;" }], [0, { v: "&backsim;", n: 817, o: "&race;" }], [0, { v: "&ac;", n: 819, o: "&acE;" }], [0, "&acd;"], [0, "&VerticalTilde;"], [0, "&NotTilde;"], [0, { v: "&eqsim;", n: 824, o: "&nesim;" }], [0, "&sime;"], [0, "&NotTildeEqual;"], [0, "&cong;"], [0, "&simne;"], [0, "&ncong;"], [0, "&ap;"], [0, "&nap;"], [0, "&ape;"], [0, { v: "&apid;", n: 824, o: "&napid;" }], [0, "&backcong;"], [0, { v: "&asympeq;", n: 8402, o: "&nvap;" }], [0, { v: "&bump;", n: 824, o: "&nbump;" }], [0, { v: "&bumpe;", n: 824, o: "&nbumpe;" }], [0, { v: "&doteq;", n: 824, o: "&nedot;" }], [0, "&doteqdot;"], [0, "&efDot;"], [0, "&erDot;"], [0, "&Assign;"], [0, "&ecolon;"], [0, "&ecir;"], [0, "&circeq;"], [1, "&wedgeq;"], [0, "&veeeq;"], [1, "&triangleq;"], [2, "&equest;"], [0, "&ne;"], [0, { v: "&Congruent;", n: 8421, o: "&bnequiv;" }], [0, "&nequiv;"], [1, { v: "&le;", n: 8402, o: "&nvle;" }], [0, { v: "&ge;", n: 8402, o: "&nvge;" }], [0, { v: "&lE;", n: 824, o: "&nlE;" }], [0, { v: "&gE;", n: 824, o: "&ngE;" }], [0, { v: "&lnE;", n: 65024, o: "&lvertneqq;" }], [0, { v: "&gnE;", n: 65024, o: "&gvertneqq;" }], [0, { v: "&ll;", n: new Map(/* @__PURE__ */ Rr([[824, "&nLtv;"], [7577, "&nLt;"]])) }], [0, { v: "&gg;", n: new Map(/* @__PURE__ */ Rr([[824, "&nGtv;"], [7577, "&nGt;"]])) }], [0, "&between;"], [0, "&NotCupCap;"], [0, "&nless;"], [0, "&ngt;"], [0, "&nle;"], [0, "&nge;"], [0, "&lesssim;"], [0, "&GreaterTilde;"], [0, "&nlsim;"], [0, "&ngsim;"], [0, "&LessGreater;"], [0, "&gl;"], [0, "&NotLessGreater;"], [0, "&NotGreaterLess;"], [0, "&pr;"], [0, "&sc;"], [0, "&prcue;"], [0, "&sccue;"], [0, "&PrecedesTilde;"], [0, { v: "&scsim;", n: 824, o: "&NotSucceedsTilde;" }], [0, "&NotPrecedes;"], [0, "&NotSucceeds;"], [0, { v: "&sub;", n: 8402, o: "&NotSubset;" }], [0, { v: "&sup;", n: 8402, o: "&NotSuperset;" }], [0, "&nsub;"], [0, "&nsup;"], [0, "&sube;"], [0, "&supe;"], [0, "&NotSubsetEqual;"], [0, "&NotSupersetEqual;"], [0, { v: "&subne;", n: 65024, o: "&varsubsetneq;" }], [0, { v: "&supne;", n: 65024, o: "&varsupsetneq;" }], [1, "&cupdot;"], [0, "&UnionPlus;"], [0, { v: "&sqsub;", n: 824, o: "&NotSquareSubset;" }], [0, { v: "&sqsup;", n: 824, o: "&NotSquareSuperset;" }], [0, "&sqsube;"], [0, "&sqsupe;"], [0, { v: "&sqcap;", n: 65024, o: "&sqcaps;" }], [0, { v: "&sqcup;", n: 65024, o: "&sqcups;" }], [0, "&CirclePlus;"], [0, "&CircleMinus;"], [0, "&CircleTimes;"], [0, "&osol;"], [0, "&CircleDot;"], [0, "&circledcirc;"], [0, "&circledast;"], [1, "&circleddash;"], [0, "&boxplus;"], [0, "&boxminus;"], [0, "&boxtimes;"], [0, "&dotsquare;"], [0, "&RightTee;"], [0, "&dashv;"], [0, "&DownTee;"], [0, "&bot;"], [1, "&models;"], [0, "&DoubleRightTee;"], [0, "&Vdash;"], [0, "&Vvdash;"], [0, "&VDash;"], [0, "&nvdash;"], [0, "&nvDash;"], [0, "&nVdash;"], [0, "&nVDash;"], [0, "&prurel;"], [1, "&LeftTriangle;"], [0, "&RightTriangle;"], [0, { v: "&LeftTriangleEqual;", n: 8402, o: "&nvltrie;" }], [0, { v: "&RightTriangleEqual;", n: 8402, o: "&nvrtrie;" }], [0, "&origof;"], [0, "&imof;"], [0, "&multimap;"], [0, "&hercon;"], [0, "&intcal;"], [0, "&veebar;"], [1, "&barvee;"], [0, "&angrtvb;"], [0, "&lrtri;"], [0, "&bigwedge;"], [0, "&bigvee;"], [0, "&bigcap;"], [0, "&bigcup;"], [0, "&diam;"], [0, "&sdot;"], [0, "&sstarf;"], [0, "&divideontimes;"], [0, "&bowtie;"], [0, "&ltimes;"], [0, "&rtimes;"], [0, "&leftthreetimes;"], [0, "&rightthreetimes;"], [0, "&backsimeq;"], [0, "&curlyvee;"], [0, "&curlywedge;"], [0, "&Sub;"], [0, "&Sup;"], [0, "&Cap;"], [0, "&Cup;"], [0, "&fork;"], [0, "&epar;"], [0, "&lessdot;"], [0, "&gtdot;"], [0, { v: "&Ll;", n: 824, o: "&nLl;" }], [0, { v: "&Gg;", n: 824, o: "&nGg;" }], [0, { v: "&leg;", n: 65024, o: "&lesg;" }], [0, { v: "&gel;", n: 65024, o: "&gesl;" }], [2, "&cuepr;"], [0, "&cuesc;"], [0, "&NotPrecedesSlantEqual;"], [0, "&NotSucceedsSlantEqual;"], [0, "&NotSquareSubsetEqual;"], [0, "&NotSquareSupersetEqual;"], [2, "&lnsim;"], [0, "&gnsim;"], [0, "&precnsim;"], [0, "&scnsim;"], [0, "&nltri;"], [0, "&NotRightTriangle;"], [0, "&nltrie;"], [0, "&NotRightTriangleEqual;"], [0, "&vellip;"], [0, "&ctdot;"], [0, "&utdot;"], [0, "&dtdot;"], [0, "&disin;"], [0, "&isinsv;"], [0, "&isins;"], [0, { v: "&isindot;", n: 824, o: "&notindot;" }], [0, "&notinvc;"], [0, "&notinvb;"], [1, { v: "&isinE;", n: 824, o: "&notinE;" }], [0, "&nisd;"], [0, "&xnis;"], [0, "&nis;"], [0, "&notnivc;"], [0, "&notnivb;"], [6, "&barwed;"], [0, "&Barwed;"], [1, "&lceil;"], [0, "&rceil;"], [0, "&LeftFloor;"], [0, "&rfloor;"], [0, "&drcrop;"], [0, "&dlcrop;"], [0, "&urcrop;"], [0, "&ulcrop;"], [0, "&bnot;"], [1, "&profline;"], [0, "&profsurf;"], [1, "&telrec;"], [0, "&target;"], [5, "&ulcorn;"], [0, "&urcorn;"], [0, "&dlcorn;"], [0, "&drcorn;"], [2, "&frown;"], [0, "&smile;"], [9, "&cylcty;"], [0, "&profalar;"], [7, "&topbot;"], [6, "&ovbar;"], [1, "&solbar;"], [60, "&angzarr;"], [51, "&lmoustache;"], [0, "&rmoustache;"], [2, "&OverBracket;"], [0, "&bbrk;"], [0, "&bbrktbrk;"], [37, "&OverParenthesis;"], [0, "&UnderParenthesis;"], [0, "&OverBrace;"], [0, "&UnderBrace;"], [2, "&trpezium;"], [4, "&elinters;"], [59, "&blank;"], [164, "&circledS;"], [55, "&boxh;"], [1, "&boxv;"], [9, "&boxdr;"], [3, "&boxdl;"], [3, "&boxur;"], [3, "&boxul;"], [3, "&boxvr;"], [7, "&boxvl;"], [7, "&boxhd;"], [7, "&boxhu;"], [7, "&boxvh;"], [19, "&boxH;"], [0, "&boxV;"], [0, "&boxdR;"], [0, "&boxDr;"], [0, "&boxDR;"], [0, "&boxdL;"], [0, "&boxDl;"], [0, "&boxDL;"], [0, "&boxuR;"], [0, "&boxUr;"], [0, "&boxUR;"], [0, "&boxuL;"], [0, "&boxUl;"], [0, "&boxUL;"], [0, "&boxvR;"], [0, "&boxVr;"], [0, "&boxVR;"], [0, "&boxvL;"], [0, "&boxVl;"], [0, "&boxVL;"], [0, "&boxHd;"], [0, "&boxhD;"], [0, "&boxHD;"], [0, "&boxHu;"], [0, "&boxhU;"], [0, "&boxHU;"], [0, "&boxvH;"], [0, "&boxVh;"], [0, "&boxVH;"], [19, "&uhblk;"], [3, "&lhblk;"], [3, "&block;"], [8, "&blk14;"], [0, "&blk12;"], [0, "&blk34;"], [13, "&square;"], [8, "&blacksquare;"], [0, "&EmptyVerySmallSquare;"], [1, "&rect;"], [0, "&marker;"], [2, "&fltns;"], [1, "&bigtriangleup;"], [0, "&blacktriangle;"], [0, "&triangle;"], [2, "&blacktriangleright;"], [0, "&rtri;"], [3, "&bigtriangledown;"], [0, "&blacktriangledown;"], [0, "&dtri;"], [2, "&blacktriangleleft;"], [0, "&ltri;"], [6, "&loz;"], [0, "&cir;"], [32, "&tridot;"], [2, "&bigcirc;"], [8, "&ultri;"], [0, "&urtri;"], [0, "&lltri;"], [0, "&EmptySmallSquare;"], [0, "&FilledSmallSquare;"], [8, "&bigstar;"], [0, "&star;"], [7, "&phone;"], [49, "&female;"], [1, "&male;"], [29, "&spades;"], [2, "&clubs;"], [1, "&hearts;"], [0, "&diamondsuit;"], [3, "&sung;"], [2, "&flat;"], [0, "&natural;"], [0, "&sharp;"], [163, "&check;"], [3, "&cross;"], [8, "&malt;"], [21, "&sext;"], [33, "&VerticalSeparator;"], [25, "&lbbrk;"], [0, "&rbbrk;"], [84, "&bsolhsub;"], [0, "&suphsol;"], [28, "&LeftDoubleBracket;"], [0, "&RightDoubleBracket;"], [0, "&lang;"], [0, "&rang;"], [0, "&Lang;"], [0, "&Rang;"], [0, "&loang;"], [0, "&roang;"], [7, "&longleftarrow;"], [0, "&longrightarrow;"], [0, "&longleftrightarrow;"], [0, "&DoubleLongLeftArrow;"], [0, "&DoubleLongRightArrow;"], [0, "&DoubleLongLeftRightArrow;"], [1, "&longmapsto;"], [2, "&dzigrarr;"], [258, "&nvlArr;"], [0, "&nvrArr;"], [0, "&nvHarr;"], [0, "&Map;"], [6, "&lbarr;"], [0, "&bkarow;"], [0, "&lBarr;"], [0, "&dbkarow;"], [0, "&drbkarow;"], [0, "&DDotrahd;"], [0, "&UpArrowBar;"], [0, "&DownArrowBar;"], [2, "&Rarrtl;"], [2, "&latail;"], [0, "&ratail;"], [0, "&lAtail;"], [0, "&rAtail;"], [0, "&larrfs;"], [0, "&rarrfs;"], [0, "&larrbfs;"], [0, "&rarrbfs;"], [2, "&nwarhk;"], [0, "&nearhk;"], [0, "&hksearow;"], [0, "&hkswarow;"], [0, "&nwnear;"], [0, "&nesear;"], [0, "&seswar;"], [0, "&swnwar;"], [8, { v: "&rarrc;", n: 824, o: "&nrarrc;" }], [1, "&cudarrr;"], [0, "&ldca;"], [0, "&rdca;"], [0, "&cudarrl;"], [0, "&larrpl;"], [2, "&curarrm;"], [0, "&cularrp;"], [7, "&rarrpl;"], [2, "&harrcir;"], [0, "&Uarrocir;"], [0, "&lurdshar;"], [0, "&ldrushar;"], [2, "&LeftRightVector;"], [0, "&RightUpDownVector;"], [0, "&DownLeftRightVector;"], [0, "&LeftUpDownVector;"], [0, "&LeftVectorBar;"], [0, "&RightVectorBar;"], [0, "&RightUpVectorBar;"], [0, "&RightDownVectorBar;"], [0, "&DownLeftVectorBar;"], [0, "&DownRightVectorBar;"], [0, "&LeftUpVectorBar;"], [0, "&LeftDownVectorBar;"], [0, "&LeftTeeVector;"], [0, "&RightTeeVector;"], [0, "&RightUpTeeVector;"], [0, "&RightDownTeeVector;"], [0, "&DownLeftTeeVector;"], [0, "&DownRightTeeVector;"], [0, "&LeftUpTeeVector;"], [0, "&LeftDownTeeVector;"], [0, "&lHar;"], [0, "&uHar;"], [0, "&rHar;"], [0, "&dHar;"], [0, "&luruhar;"], [0, "&ldrdhar;"], [0, "&ruluhar;"], [0, "&rdldhar;"], [0, "&lharul;"], [0, "&llhard;"], [0, "&rharul;"], [0, "&lrhard;"], [0, "&udhar;"], [0, "&duhar;"], [0, "&RoundImplies;"], [0, "&erarr;"], [0, "&simrarr;"], [0, "&larrsim;"], [0, "&rarrsim;"], [0, "&rarrap;"], [0, "&ltlarr;"], [1, "&gtrarr;"], [0, "&subrarr;"], [1, "&suplarr;"], [0, "&lfisht;"], [0, "&rfisht;"], [0, "&ufisht;"], [0, "&dfisht;"], [5, "&lopar;"], [0, "&ropar;"], [4, "&lbrke;"], [0, "&rbrke;"], [0, "&lbrkslu;"], [0, "&rbrksld;"], [0, "&lbrksld;"], [0, "&rbrkslu;"], [0, "&langd;"], [0, "&rangd;"], [0, "&lparlt;"], [0, "&rpargt;"], [0, "&gtlPar;"], [0, "&ltrPar;"], [3, "&vzigzag;"], [1, "&vangrt;"], [0, "&angrtvbd;"], [6, "&ange;"], [0, "&range;"], [0, "&dwangle;"], [0, "&uwangle;"], [0, "&angmsdaa;"], [0, "&angmsdab;"], [0, "&angmsdac;"], [0, "&angmsdad;"], [0, "&angmsdae;"], [0, "&angmsdaf;"], [0, "&angmsdag;"], [0, "&angmsdah;"], [0, "&bemptyv;"], [0, "&demptyv;"], [0, "&cemptyv;"], [0, "&raemptyv;"], [0, "&laemptyv;"], [0, "&ohbar;"], [0, "&omid;"], [0, "&opar;"], [1, "&operp;"], [1, "&olcross;"], [0, "&odsold;"], [1, "&olcir;"], [0, "&ofcir;"], [0, "&olt;"], [0, "&ogt;"], [0, "&cirscir;"], [0, "&cirE;"], [0, "&solb;"], [0, "&bsolb;"], [3, "&boxbox;"], [3, "&trisb;"], [0, "&rtriltri;"], [0, { v: "&LeftTriangleBar;", n: 824, o: "&NotLeftTriangleBar;" }], [0, { v: "&RightTriangleBar;", n: 824, o: "&NotRightTriangleBar;" }], [11, "&iinfin;"], [0, "&infintie;"], [0, "&nvinfin;"], [4, "&eparsl;"], [0, "&smeparsl;"], [0, "&eqvparsl;"], [5, "&blacklozenge;"], [8, "&RuleDelayed;"], [1, "&dsol;"], [9, "&bigodot;"], [0, "&bigoplus;"], [0, "&bigotimes;"], [1, "&biguplus;"], [1, "&bigsqcup;"], [5, "&iiiint;"], [0, "&fpartint;"], [2, "&cirfnint;"], [0, "&awint;"], [0, "&rppolint;"], [0, "&scpolint;"], [0, "&npolint;"], [0, "&pointint;"], [0, "&quatint;"], [0, "&intlarhk;"], [10, "&pluscir;"], [0, "&plusacir;"], [0, "&simplus;"], [0, "&plusdu;"], [0, "&plussim;"], [0, "&plustwo;"], [1, "&mcomma;"], [0, "&minusdu;"], [2, "&loplus;"], [0, "&roplus;"], [0, "&Cross;"], [0, "&timesd;"], [0, "&timesbar;"], [1, "&smashp;"], [0, "&lotimes;"], [0, "&rotimes;"], [0, "&otimesas;"], [0, "&Otimes;"], [0, "&odiv;"], [0, "&triplus;"], [0, "&triminus;"], [0, "&tritime;"], [0, "&intprod;"], [2, "&amalg;"], [0, "&capdot;"], [1, "&ncup;"], [0, "&ncap;"], [0, "&capand;"], [0, "&cupor;"], [0, "&cupcap;"], [0, "&capcup;"], [0, "&cupbrcap;"], [0, "&capbrcup;"], [0, "&cupcup;"], [0, "&capcap;"], [0, "&ccups;"], [0, "&ccaps;"], [2, "&ccupssm;"], [2, "&And;"], [0, "&Or;"], [0, "&andand;"], [0, "&oror;"], [0, "&orslope;"], [0, "&andslope;"], [1, "&andv;"], [0, "&orv;"], [0, "&andd;"], [0, "&ord;"], [1, "&wedbar;"], [6, "&sdote;"], [3, "&simdot;"], [2, { v: "&congdot;", n: 824, o: "&ncongdot;" }], [0, "&easter;"], [0, "&apacir;"], [0, { v: "&apE;", n: 824, o: "&napE;" }], [0, "&eplus;"], [0, "&pluse;"], [0, "&Esim;"], [0, "&Colone;"], [0, "&Equal;"], [1, "&ddotseq;"], [0, "&equivDD;"], [0, "&ltcir;"], [0, "&gtcir;"], [0, "&ltquest;"], [0, "&gtquest;"], [0, { v: "&leqslant;", n: 824, o: "&nleqslant;" }], [0, { v: "&geqslant;", n: 824, o: "&ngeqslant;" }], [0, "&lesdot;"], [0, "&gesdot;"], [0, "&lesdoto;"], [0, "&gesdoto;"], [0, "&lesdotor;"], [0, "&gesdotol;"], [0, "&lap;"], [0, "&gap;"], [0, "&lne;"], [0, "&gne;"], [0, "&lnap;"], [0, "&gnap;"], [0, "&lEg;"], [0, "&gEl;"], [0, "&lsime;"], [0, "&gsime;"], [0, "&lsimg;"], [0, "&gsiml;"], [0, "&lgE;"], [0, "&glE;"], [0, "&lesges;"], [0, "&gesles;"], [0, "&els;"], [0, "&egs;"], [0, "&elsdot;"], [0, "&egsdot;"], [0, "&el;"], [0, "&eg;"], [2, "&siml;"], [0, "&simg;"], [0, "&simlE;"], [0, "&simgE;"], [0, { v: "&LessLess;", n: 824, o: "&NotNestedLessLess;" }], [0, { v: "&GreaterGreater;", n: 824, o: "&NotNestedGreaterGreater;" }], [1, "&glj;"], [0, "&gla;"], [0, "&ltcc;"], [0, "&gtcc;"], [0, "&lescc;"], [0, "&gescc;"], [0, "&smt;"], [0, "&lat;"], [0, { v: "&smte;", n: 65024, o: "&smtes;" }], [0, { v: "&late;", n: 65024, o: "&lates;" }], [0, "&bumpE;"], [0, { v: "&PrecedesEqual;", n: 824, o: "&NotPrecedesEqual;" }], [0, { v: "&sce;", n: 824, o: "&NotSucceedsEqual;" }], [2, "&prE;"], [0, "&scE;"], [0, "&precneqq;"], [0, "&scnE;"], [0, "&prap;"], [0, "&scap;"], [0, "&precnapprox;"], [0, "&scnap;"], [0, "&Pr;"], [0, "&Sc;"], [0, "&subdot;"], [0, "&supdot;"], [0, "&subplus;"], [0, "&supplus;"], [0, "&submult;"], [0, "&supmult;"], [0, "&subedot;"], [0, "&supedot;"], [0, { v: "&subE;", n: 824, o: "&nsubE;" }], [0, { v: "&supE;", n: 824, o: "&nsupE;" }], [0, "&subsim;"], [0, "&supsim;"], [2, { v: "&subnE;", n: 65024, o: "&varsubsetneqq;" }], [0, { v: "&supnE;", n: 65024, o: "&varsupsetneqq;" }], [2, "&csub;"], [0, "&csup;"], [0, "&csube;"], [0, "&csupe;"], [0, "&subsup;"], [0, "&supsub;"], [0, "&subsub;"], [0, "&supsup;"], [0, "&suphsub;"], [0, "&supdsub;"], [0, "&forkv;"], [0, "&topfork;"], [0, "&mlcp;"], [8, "&Dashv;"], [1, "&Vdashl;"], [0, "&Barv;"], [0, "&vBar;"], [0, "&vBarv;"], [1, "&Vbar;"], [0, "&Not;"], [0, "&bNot;"], [0, "&rnmid;"], [0, "&cirmid;"], [0, "&midcir;"], [0, "&topcir;"], [0, "&nhpar;"], [0, "&parsim;"], [9, { v: "&parsl;", n: 8421, o: "&nparsl;" }], [44343, { n: new Map(/* @__PURE__ */ Rr([[56476, "&Ascr;"], [1, "&Cscr;"], [0, "&Dscr;"], [2, "&Gscr;"], [2, "&Jscr;"], [0, "&Kscr;"], [2, "&Nscr;"], [0, "&Oscr;"], [0, "&Pscr;"], [0, "&Qscr;"], [1, "&Sscr;"], [0, "&Tscr;"], [0, "&Uscr;"], [0, "&Vscr;"], [0, "&Wscr;"], [0, "&Xscr;"], [0, "&Yscr;"], [0, "&Zscr;"], [0, "&ascr;"], [0, "&bscr;"], [0, "&cscr;"], [0, "&dscr;"], [1, "&fscr;"], [1, "&hscr;"], [0, "&iscr;"], [0, "&jscr;"], [0, "&kscr;"], [0, "&lscr;"], [0, "&mscr;"], [0, "&nscr;"], [1, "&pscr;"], [0, "&qscr;"], [0, "&rscr;"], [0, "&sscr;"], [0, "&tscr;"], [0, "&uscr;"], [0, "&vscr;"], [0, "&wscr;"], [0, "&xscr;"], [0, "&yscr;"], [0, "&zscr;"], [52, "&Afr;"], [0, "&Bfr;"], [1, "&Dfr;"], [0, "&Efr;"], [0, "&Ffr;"], [0, "&Gfr;"], [2, "&Jfr;"], [0, "&Kfr;"], [0, "&Lfr;"], [0, "&Mfr;"], [0, "&Nfr;"], [0, "&Ofr;"], [0, "&Pfr;"], [0, "&Qfr;"], [1, "&Sfr;"], [0, "&Tfr;"], [0, "&Ufr;"], [0, "&Vfr;"], [0, "&Wfr;"], [0, "&Xfr;"], [0, "&Yfr;"], [1, "&afr;"], [0, "&bfr;"], [0, "&cfr;"], [0, "&dfr;"], [0, "&efr;"], [0, "&ffr;"], [0, "&gfr;"], [0, "&hfr;"], [0, "&ifr;"], [0, "&jfr;"], [0, "&kfr;"], [0, "&lfr;"], [0, "&mfr;"], [0, "&nfr;"], [0, "&ofr;"], [0, "&pfr;"], [0, "&qfr;"], [0, "&rfr;"], [0, "&sfr;"], [0, "&tfr;"], [0, "&ufr;"], [0, "&vfr;"], [0, "&wfr;"], [0, "&xfr;"], [0, "&yfr;"], [0, "&zfr;"], [0, "&Aopf;"], [0, "&Bopf;"], [1, "&Dopf;"], [0, "&Eopf;"], [0, "&Fopf;"], [0, "&Gopf;"], [1, "&Iopf;"], [0, "&Jopf;"], [0, "&Kopf;"], [0, "&Lopf;"], [0, "&Mopf;"], [1, "&Oopf;"], [3, "&Sopf;"], [0, "&Topf;"], [0, "&Uopf;"], [0, "&Vopf;"], [0, "&Wopf;"], [0, "&Xopf;"], [0, "&Yopf;"], [1, "&aopf;"], [0, "&bopf;"], [0, "&copf;"], [0, "&dopf;"], [0, "&eopf;"], [0, "&fopf;"], [0, "&gopf;"], [0, "&hopf;"], [0, "&iopf;"], [0, "&jopf;"], [0, "&kopf;"], [0, "&lopf;"], [0, "&mopf;"], [0, "&nopf;"], [0, "&oopf;"], [0, "&popf;"], [0, "&qopf;"], [0, "&ropf;"], [0, "&sopf;"], [0, "&topf;"], [0, "&uopf;"], [0, "&vopf;"], [0, "&wopf;"], [0, "&xopf;"], [0, "&yopf;"], [0, "&zopf;"]])) }], [8906, "&fflig;"], [0, "&filig;"], [0, "&fllig;"], [0, "&ffilig;"], [0, "&ffllig;"]]));
var ba = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.escapeText = e.escapeAttribute = e.escapeUTF8 = e.escape = e.encodeXML = e.getCodePoint = e.xmlReplacer = void 0, e.xmlReplacer = /["&'<>$\x80-\uFFFF]/g;
  var u = /* @__PURE__ */ new Map([
    [34, "&quot;"],
    [38, "&amp;"],
    [39, "&apos;"],
    [60, "&lt;"],
    [62, "&gt;"]
  ]);
  e.getCodePoint = // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  String.prototype.codePointAt != null ? function(a, n) {
    return a.codePointAt(n);
  } : (
    // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
    function(a, n) {
      return (a.charCodeAt(n) & 64512) === 55296 ? (a.charCodeAt(n) - 55296) * 1024 + a.charCodeAt(n + 1) - 56320 + 65536 : a.charCodeAt(n);
    }
  );
  function t(a) {
    for (var n = "", i = 0, s; (s = e.xmlReplacer.exec(a)) !== null; ) {
      var o = s.index, d = a.charCodeAt(o), c = u.get(d);
      c !== void 0 ? (n += a.substring(i, o) + c, i = o + 1) : (n += "".concat(a.substring(i, o), "&#x").concat((0, e.getCodePoint)(a, o).toString(16), ";"), i = e.xmlReplacer.lastIndex += +((d & 64512) === 55296));
    }
    return n + a.substr(i);
  }
  e.encodeXML = t, e.escape = t;
  function r(a, n) {
    return function(s) {
      for (var o, d = 0, c = ""; o = a.exec(s); )
        d !== o.index && (c += s.substring(d, o.index)), c += n.get(o[0].charCodeAt(0)), d = o.index + 1;
      return c + s.substring(d);
    };
  }
  e.escapeUTF8 = r(/[&<>'"]/g, u), e.escapeAttribute = r(/["&\u00A0]/g, /* @__PURE__ */ new Map([
    [34, "&quot;"],
    [38, "&amp;"],
    [160, "&nbsp;"]
  ])), e.escapeText = r(/[&<>\u00A0]/g, /* @__PURE__ */ new Map([
    [38, "&amp;"],
    [60, "&lt;"],
    [62, "&gt;"],
    [160, "&nbsp;"]
  ]));
})(ba);
var gh = C && C.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Rt, "__esModule", { value: !0 });
Rt.encodeNonAsciiHTML = Rt.encodeHTML = void 0;
var Eh = gh(lc), sl = ba, Th = /[\t\n!-,./:-@[-`\f{-}$\x80-\uFFFF]/g;
function _h(e) {
  return ol(Th, e);
}
Rt.encodeHTML = _h;
function yh(e) {
  return ol(sl.xmlReplacer, e);
}
Rt.encodeNonAsciiHTML = yh;
function ol(e, u) {
  for (var t = "", r = 0, a; (a = e.exec(u)) !== null; ) {
    var n = a.index;
    t += u.substring(r, n);
    var i = u.charCodeAt(n), s = Eh.default.get(i);
    if (typeof s == "object") {
      if (n + 1 < u.length) {
        var o = u.charCodeAt(n + 1), d = typeof s.n == "number" ? s.n === o ? s.o : void 0 : s.n.get(o);
        if (d !== void 0) {
          t += d, r = e.lastIndex += 1;
          continue;
        }
      }
      s = s.v;
    }
    if (s !== void 0)
      t += s, r = n + 1;
    else {
      var c = (0, sl.getCodePoint)(u, n);
      t += "&#x".concat(c.toString(16), ";"), r = e.lastIndex += +(c !== i);
    }
  }
  return t + u.substr(r);
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.decodeXMLStrict = e.decodeHTML5Strict = e.decodeHTML4Strict = e.decodeHTML5 = e.decodeHTML4 = e.decodeHTMLAttribute = e.decodeHTMLStrict = e.decodeHTML = e.decodeXML = e.DecodingMode = e.EntityDecoder = e.encodeHTML5 = e.encodeHTML4 = e.encodeNonAsciiHTML = e.encodeHTML = e.escapeText = e.escapeAttribute = e.escapeUTF8 = e.escape = e.encodeXML = e.encode = e.decodeStrict = e.decode = e.EncodingMode = e.EntityLevel = void 0;
  var u = hi, t = Rt, r = ba, a;
  (function(f) {
    f[f.XML = 0] = "XML", f[f.HTML = 1] = "HTML";
  })(a = e.EntityLevel || (e.EntityLevel = {}));
  var n;
  (function(f) {
    f[f.UTF8 = 0] = "UTF8", f[f.ASCII = 1] = "ASCII", f[f.Extensive = 2] = "Extensive", f[f.Attribute = 3] = "Attribute", f[f.Text = 4] = "Text";
  })(n = e.EncodingMode || (e.EncodingMode = {}));
  function i(f, m) {
    m === void 0 && (m = a.XML);
    var v = typeof m == "number" ? m : m.level;
    if (v === a.HTML) {
      var L = typeof m == "object" ? m.mode : void 0;
      return (0, u.decodeHTML)(f, L);
    }
    return (0, u.decodeXML)(f);
  }
  e.decode = i;
  function s(f, m) {
    var v;
    m === void 0 && (m = a.XML);
    var L = typeof m == "number" ? { level: m } : m;
    return (v = L.mode) !== null && v !== void 0 || (L.mode = u.DecodingMode.Strict), i(f, L);
  }
  e.decodeStrict = s;
  function o(f, m) {
    m === void 0 && (m = a.XML);
    var v = typeof m == "number" ? { level: m } : m;
    return v.mode === n.UTF8 ? (0, r.escapeUTF8)(f) : v.mode === n.Attribute ? (0, r.escapeAttribute)(f) : v.mode === n.Text ? (0, r.escapeText)(f) : v.level === a.HTML ? v.mode === n.ASCII ? (0, t.encodeNonAsciiHTML)(f) : (0, t.encodeHTML)(f) : (0, r.encodeXML)(f);
  }
  e.encode = o;
  var d = ba;
  Object.defineProperty(e, "encodeXML", { enumerable: !0, get: function() {
    return d.encodeXML;
  } }), Object.defineProperty(e, "escape", { enumerable: !0, get: function() {
    return d.escape;
  } }), Object.defineProperty(e, "escapeUTF8", { enumerable: !0, get: function() {
    return d.escapeUTF8;
  } }), Object.defineProperty(e, "escapeAttribute", { enumerable: !0, get: function() {
    return d.escapeAttribute;
  } }), Object.defineProperty(e, "escapeText", { enumerable: !0, get: function() {
    return d.escapeText;
  } });
  var c = Rt;
  Object.defineProperty(e, "encodeHTML", { enumerable: !0, get: function() {
    return c.encodeHTML;
  } }), Object.defineProperty(e, "encodeNonAsciiHTML", { enumerable: !0, get: function() {
    return c.encodeNonAsciiHTML;
  } }), Object.defineProperty(e, "encodeHTML4", { enumerable: !0, get: function() {
    return c.encodeHTML;
  } }), Object.defineProperty(e, "encodeHTML5", { enumerable: !0, get: function() {
    return c.encodeHTML;
  } });
  var E = hi;
  Object.defineProperty(e, "EntityDecoder", { enumerable: !0, get: function() {
    return E.EntityDecoder;
  } }), Object.defineProperty(e, "DecodingMode", { enumerable: !0, get: function() {
    return E.DecodingMode;
  } }), Object.defineProperty(e, "decodeXML", { enumerable: !0, get: function() {
    return E.decodeXML;
  } }), Object.defineProperty(e, "decodeHTML", { enumerable: !0, get: function() {
    return E.decodeHTML;
  } }), Object.defineProperty(e, "decodeHTMLStrict", { enumerable: !0, get: function() {
    return E.decodeHTMLStrict;
  } }), Object.defineProperty(e, "decodeHTMLAttribute", { enumerable: !0, get: function() {
    return E.decodeHTMLAttribute;
  } }), Object.defineProperty(e, "decodeHTML4", { enumerable: !0, get: function() {
    return E.decodeHTML;
  } }), Object.defineProperty(e, "decodeHTML5", { enumerable: !0, get: function() {
    return E.decodeHTML;
  } }), Object.defineProperty(e, "decodeHTML4Strict", { enumerable: !0, get: function() {
    return E.decodeHTMLStrict;
  } }), Object.defineProperty(e, "decodeHTML5Strict", { enumerable: !0, get: function() {
    return E.decodeHTMLStrict;
  } }), Object.defineProperty(e, "decodeXMLStrict", { enumerable: !0, get: function() {
    return E.decodeXML;
  } });
})(cl);
var g0 = {};
Object.defineProperty(g0, "__esModule", { value: !0 });
g0.attributeNames = g0.elementNames = void 0;
g0.elementNames = new Map([
  "altGlyph",
  "altGlyphDef",
  "altGlyphItem",
  "animateColor",
  "animateMotion",
  "animateTransform",
  "clipPath",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDistantLight",
  "feDropShadow",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence",
  "foreignObject",
  "glyphRef",
  "linearGradient",
  "radialGradient",
  "textPath"
].map(function(e) {
  return [e.toLowerCase(), e];
}));
g0.attributeNames = new Map([
  "definitionURL",
  "attributeName",
  "attributeType",
  "baseFrequency",
  "baseProfile",
  "calcMode",
  "clipPathUnits",
  "diffuseConstant",
  "edgeMode",
  "filterUnits",
  "glyphRef",
  "gradientTransform",
  "gradientUnits",
  "kernelMatrix",
  "kernelUnitLength",
  "keyPoints",
  "keySplines",
  "keyTimes",
  "lengthAdjust",
  "limitingConeAngle",
  "markerHeight",
  "markerUnits",
  "markerWidth",
  "maskContentUnits",
  "maskUnits",
  "numOctaves",
  "pathLength",
  "patternContentUnits",
  "patternTransform",
  "patternUnits",
  "pointsAtX",
  "pointsAtY",
  "pointsAtZ",
  "preserveAlpha",
  "preserveAspectRatio",
  "primitiveUnits",
  "refX",
  "refY",
  "repeatCount",
  "repeatDur",
  "requiredExtensions",
  "requiredFeatures",
  "specularConstant",
  "specularExponent",
  "spreadMethod",
  "startOffset",
  "stdDeviation",
  "stitchTiles",
  "surfaceScale",
  "systemLanguage",
  "tableValues",
  "targetX",
  "targetY",
  "textLength",
  "viewBox",
  "viewTarget",
  "xChannelSelector",
  "yChannelSelector",
  "zoomAndPan"
].map(function(e) {
  return [e.toLowerCase(), e];
}));
var u0 = C && C.__assign || function() {
  return u0 = Object.assign || function(e) {
    for (var u, t = 1, r = arguments.length; t < r; t++) {
      u = arguments[t];
      for (var a in u)
        Object.prototype.hasOwnProperty.call(u, a) && (e[a] = u[a]);
    }
    return e;
  }, u0.apply(this, arguments);
}, Ah = C && C.__createBinding || (Object.create ? function(e, u, t, r) {
  r === void 0 && (r = t);
  var a = Object.getOwnPropertyDescriptor(u, t);
  (!a || ("get" in a ? !u.__esModule : a.writable || a.configurable)) && (a = { enumerable: !0, get: function() {
    return u[t];
  } }), Object.defineProperty(e, r, a);
} : function(e, u, t, r) {
  r === void 0 && (r = t), e[r] = u[t];
}), vh = C && C.__setModuleDefault || (Object.create ? function(e, u) {
  Object.defineProperty(e, "default", { enumerable: !0, value: u });
} : function(e, u) {
  e.default = u;
}), xh = C && C.__importStar || function(e) {
  if (e && e.__esModule)
    return e;
  var u = {};
  if (e != null)
    for (var t in e)
      t !== "default" && Object.prototype.hasOwnProperty.call(e, t) && Ah(u, e, t);
  return vh(u, e), u;
};
Object.defineProperty(hr, "__esModule", { value: !0 });
hr.render = void 0;
var et = xh(Be), ha = cl, dl = g0, Nh = /* @__PURE__ */ new Set([
  "style",
  "script",
  "xmp",
  "iframe",
  "noembed",
  "noframes",
  "plaintext",
  "noscript"
]);
function Ih(e) {
  return e.replace(/"/g, "&quot;");
}
function Dh(e, u) {
  var t;
  if (e) {
    var r = ((t = u.encodeEntities) !== null && t !== void 0 ? t : u.decodeEntities) === !1 ? Ih : u.xmlMode || u.encodeEntities !== "utf8" ? ha.encodeXML : ha.escapeAttribute;
    return Object.keys(e).map(function(a) {
      var n, i, s = (n = e[a]) !== null && n !== void 0 ? n : "";
      return u.xmlMode === "foreign" && (a = (i = dl.attributeNames.get(a)) !== null && i !== void 0 ? i : a), !u.emptyAttrs && !u.xmlMode && s === "" ? a : "".concat(a, '="').concat(r(s), '"');
    }).join(" ");
  }
}
var fs = /* @__PURE__ */ new Set([
  "area",
  "base",
  "basefont",
  "br",
  "col",
  "command",
  "embed",
  "frame",
  "hr",
  "img",
  "input",
  "isindex",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
]);
function ja(e, u) {
  u === void 0 && (u = {});
  for (var t = ("length" in e) ? e : [e], r = "", a = 0; a < t.length; a++)
    r += Ch(t[a], u);
  return r;
}
hr.render = ja;
hr.default = ja;
function Ch(e, u) {
  switch (e.type) {
    case et.Root:
      return ja(e.children, u);
    case et.Doctype:
    case et.Directive:
      return Ph(e);
    case et.Comment:
      return Mh(e);
    case et.CDATA:
      return Rh(e);
    case et.Script:
    case et.Style:
    case et.Tag:
      return Lh(e, u);
    case et.Text:
      return wh(e, u);
  }
}
var Sh = /* @__PURE__ */ new Set([
  "mi",
  "mo",
  "mn",
  "ms",
  "mtext",
  "annotation-xml",
  "foreignObject",
  "desc",
  "title"
]), Oh = /* @__PURE__ */ new Set(["svg", "math"]);
function Lh(e, u) {
  var t;
  u.xmlMode === "foreign" && (e.name = (t = dl.elementNames.get(e.name)) !== null && t !== void 0 ? t : e.name, e.parent && Sh.has(e.parent.name) && (u = u0(u0({}, u), { xmlMode: !1 }))), !u.xmlMode && Oh.has(e.name) && (u = u0(u0({}, u), { xmlMode: "foreign" }));
  var r = "<".concat(e.name), a = Dh(e.attribs, u);
  return a && (r += " ".concat(a)), e.children.length === 0 && (u.xmlMode ? (
    // In XML mode or foreign mode, and user hasn't explicitly turned off self-closing tags
    u.selfClosingTags !== !1
  ) : (
    // User explicitly asked for self-closing tags, even in HTML mode
    u.selfClosingTags && fs.has(e.name)
  )) ? (u.xmlMode || (r += " "), r += "/>") : (r += ">", e.children.length > 0 && (r += ja(e.children, u)), (u.xmlMode || !fs.has(e.name)) && (r += "</".concat(e.name, ">"))), r;
}
function Ph(e) {
  return "<".concat(e.data, ">");
}
function wh(e, u) {
  var t, r = e.data || "";
  return ((t = u.encodeEntities) !== null && t !== void 0 ? t : u.decodeEntities) !== !1 && !(!u.xmlMode && e.parent && Nh.has(e.parent.name)) && (r = u.xmlMode || u.encodeEntities !== "utf8" ? (0, ha.encodeXML)(r) : (0, ha.escapeText)(r)), r;
}
function Rh(e) {
  return "<![CDATA[".concat(e.children[0].data, "]]>");
}
function Mh(e) {
  return "<!--".concat(e.data, "-->");
}
var kh = C && C.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Iu, "__esModule", { value: !0 });
Iu.innerText = Iu.textContent = Iu.getText = Iu.getInnerHTML = Iu.getOuterHTML = void 0;
var Wu = Gt, Bh = kh(hr), Uh = Be;
function ll(e, u) {
  return (0, Bh.default)(e, u);
}
Iu.getOuterHTML = ll;
function Hh(e, u) {
  return (0, Wu.hasChildren)(e) ? e.children.map(function(t) {
    return ll(t, u);
  }).join("") : "";
}
Iu.getInnerHTML = Hh;
function Wr(e) {
  return Array.isArray(e) ? e.map(Wr).join("") : (0, Wu.isTag)(e) ? e.name === "br" ? `
` : Wr(e.children) : (0, Wu.isCDATA)(e) ? Wr(e.children) : (0, Wu.isText)(e) ? e.data : "";
}
Iu.getText = Wr;
function mi(e) {
  return Array.isArray(e) ? e.map(mi).join("") : (0, Wu.hasChildren)(e) && !(0, Wu.isComment)(e) ? mi(e.children) : (0, Wu.isText)(e) ? e.data : "";
}
Iu.textContent = mi;
function gi(e) {
  return Array.isArray(e) ? e.map(gi).join("") : (0, Wu.hasChildren)(e) && (e.type === Uh.ElementType.Tag || (0, Wu.isCDATA)(e)) ? gi(e.children) : (0, Wu.isText)(e) ? e.data : "";
}
Iu.innerText = gi;
var $e = {};
Object.defineProperty($e, "__esModule", { value: !0 });
$e.prevElementSibling = $e.nextElementSibling = $e.getName = $e.hasAttrib = $e.getAttributeValue = $e.getSiblings = $e.getParent = $e.getChildren = void 0;
var fc = Gt;
function fl(e) {
  return (0, fc.hasChildren)(e) ? e.children : [];
}
$e.getChildren = fl;
function bl(e) {
  return e.parent || null;
}
$e.getParent = bl;
function Fh(e) {
  var u, t, r = bl(e);
  if (r != null)
    return fl(r);
  for (var a = [e], n = e.prev, i = e.next; n != null; )
    a.unshift(n), u = n, n = u.prev;
  for (; i != null; )
    a.push(i), t = i, i = t.next;
  return a;
}
$e.getSiblings = Fh;
function qh(e, u) {
  var t;
  return (t = e.attribs) === null || t === void 0 ? void 0 : t[u];
}
$e.getAttributeValue = qh;
function Gh(e, u) {
  return e.attribs != null && Object.prototype.hasOwnProperty.call(e.attribs, u) && e.attribs[u] != null;
}
$e.hasAttrib = Gh;
function jh(e) {
  return e.name;
}
$e.getName = jh;
function $h(e) {
  for (var u, t = e.next; t !== null && !(0, fc.isTag)(t); )
    u = t, t = u.next;
  return t;
}
$e.nextElementSibling = $h;
function Vh(e) {
  for (var u, t = e.prev; t !== null && !(0, fc.isTag)(t); )
    u = t, t = u.prev;
  return t;
}
$e.prevElementSibling = Vh;
var lu = {};
Object.defineProperty(lu, "__esModule", { value: !0 });
lu.prepend = lu.prependChild = lu.append = lu.appendChild = lu.replaceElement = lu.removeElement = void 0;
function pr(e) {
  if (e.prev && (e.prev.next = e.next), e.next && (e.next.prev = e.prev), e.parent) {
    var u = e.parent.children, t = u.lastIndexOf(e);
    t >= 0 && u.splice(t, 1);
  }
  e.next = null, e.prev = null, e.parent = null;
}
lu.removeElement = pr;
function Yh(e, u) {
  var t = u.prev = e.prev;
  t && (t.next = u);
  var r = u.next = e.next;
  r && (r.prev = u);
  var a = u.parent = e.parent;
  if (a) {
    var n = a.children;
    n[n.lastIndexOf(e)] = u, e.parent = null;
  }
}
lu.replaceElement = Yh;
function Wh(e, u) {
  if (pr(u), u.next = null, u.parent = e, e.children.push(u) > 1) {
    var t = e.children[e.children.length - 2];
    t.next = u, u.prev = t;
  } else
    u.prev = null;
}
lu.appendChild = Wh;
function Xh(e, u) {
  pr(u);
  var t = e.parent, r = e.next;
  if (u.next = r, u.prev = e, e.next = u, u.parent = t, r) {
    if (r.prev = u, t) {
      var a = t.children;
      a.splice(a.lastIndexOf(r), 0, u);
    }
  } else
    t && t.children.push(u);
}
lu.append = Xh;
function zh(e, u) {
  if (pr(u), u.parent = e, u.prev = null, e.children.unshift(u) !== 1) {
    var t = e.children[1];
    t.prev = u, u.next = t;
  } else
    u.next = null;
}
lu.prependChild = zh;
function Qh(e, u) {
  pr(u);
  var t = e.parent;
  if (t) {
    var r = t.children;
    r.splice(r.indexOf(e), 0, u);
  }
  e.prev && (e.prev.next = u), u.parent = t, u.prev = e.prev, u.next = e, e.prev = u;
}
lu.prepend = Qh;
var Ze = {};
Object.defineProperty(Ze, "__esModule", { value: !0 });
Ze.findAll = Ze.existsOne = Ze.findOne = Ze.findOneChild = Ze.find = Ze.filter = void 0;
var $a = Gt;
function Kh(e, u, t, r) {
  return t === void 0 && (t = !0), r === void 0 && (r = 1 / 0), hl(e, Array.isArray(u) ? u : [u], t, r);
}
Ze.filter = Kh;
function hl(e, u, t, r) {
  for (var a = [], n = [u], i = [0]; ; ) {
    if (i[0] >= n[0].length) {
      if (i.length === 1)
        return a;
      n.shift(), i.shift();
      continue;
    }
    var s = n[0][i[0]++];
    if (e(s) && (a.push(s), --r <= 0))
      return a;
    t && (0, $a.hasChildren)(s) && s.children.length > 0 && (i.unshift(0), n.unshift(s.children));
  }
}
Ze.find = hl;
function Jh(e, u) {
  return u.find(e);
}
Ze.findOneChild = Jh;
function pl(e, u, t) {
  t === void 0 && (t = !0);
  for (var r = null, a = 0; a < u.length && !r; a++) {
    var n = u[a];
    if ((0, $a.isTag)(n))
      e(n) ? r = n : t && n.children.length > 0 && (r = pl(e, n.children, !0));
    else
      continue;
  }
  return r;
}
Ze.findOne = pl;
function ml(e, u) {
  return u.some(function(t) {
    return (0, $a.isTag)(t) && (e(t) || ml(e, t.children));
  });
}
Ze.existsOne = ml;
function Zh(e, u) {
  for (var t = [], r = [u], a = [0]; ; ) {
    if (a[0] >= r[0].length) {
      if (r.length === 1)
        return t;
      r.shift(), a.shift();
      continue;
    }
    var n = r[0][a[0]++];
    (0, $a.isTag)(n) && (e(n) && t.push(n), n.children.length > 0 && (a.unshift(0), r.unshift(n.children)));
  }
}
Ze.findAll = Zh;
var Du = {};
Object.defineProperty(Du, "__esModule", { value: !0 });
Du.getElementsByTagType = Du.getElementsByTagName = Du.getElementById = Du.getElements = Du.testElement = void 0;
var Ct = Gt, Va = Ze, pa = {
  tag_name: function(e) {
    return typeof e == "function" ? function(u) {
      return (0, Ct.isTag)(u) && e(u.name);
    } : e === "*" ? Ct.isTag : function(u) {
      return (0, Ct.isTag)(u) && u.name === e;
    };
  },
  tag_type: function(e) {
    return typeof e == "function" ? function(u) {
      return e(u.type);
    } : function(u) {
      return u.type === e;
    };
  },
  tag_contains: function(e) {
    return typeof e == "function" ? function(u) {
      return (0, Ct.isText)(u) && e(u.data);
    } : function(u) {
      return (0, Ct.isText)(u) && u.data === e;
    };
  }
};
function gl(e, u) {
  return typeof u == "function" ? function(t) {
    return (0, Ct.isTag)(t) && u(t.attribs[e]);
  } : function(t) {
    return (0, Ct.isTag)(t) && t.attribs[e] === u;
  };
}
function e6(e, u) {
  return function(t) {
    return e(t) || u(t);
  };
}
function El(e) {
  var u = Object.keys(e).map(function(t) {
    var r = e[t];
    return Object.prototype.hasOwnProperty.call(pa, t) ? pa[t](r) : gl(t, r);
  });
  return u.length === 0 ? null : u.reduce(e6);
}
function u6(e, u) {
  var t = El(e);
  return t ? t(u) : !0;
}
Du.testElement = u6;
function t6(e, u, t, r) {
  r === void 0 && (r = 1 / 0);
  var a = El(e);
  return a ? (0, Va.filter)(a, u, t, r) : [];
}
Du.getElements = t6;
function r6(e, u, t) {
  return t === void 0 && (t = !0), Array.isArray(u) || (u = [u]), (0, Va.findOne)(gl("id", e), u, t);
}
Du.getElementById = r6;
function a6(e, u, t, r) {
  return t === void 0 && (t = !0), r === void 0 && (r = 1 / 0), (0, Va.filter)(pa.tag_name(e), u, t, r);
}
Du.getElementsByTagName = a6;
function n6(e, u, t, r) {
  return t === void 0 && (t = !0), r === void 0 && (r = 1 / 0), (0, Va.filter)(pa.tag_type(e), u, t, r);
}
Du.getElementsByTagType = n6;
var Tl = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.uniqueSort = e.compareDocumentPosition = e.DocumentPosition = e.removeSubsets = void 0;
  var u = Gt;
  function t(i) {
    for (var s = i.length; --s >= 0; ) {
      var o = i[s];
      if (s > 0 && i.lastIndexOf(o, s - 1) >= 0) {
        i.splice(s, 1);
        continue;
      }
      for (var d = o.parent; d; d = d.parent)
        if (i.includes(d)) {
          i.splice(s, 1);
          break;
        }
    }
    return i;
  }
  e.removeSubsets = t;
  var r;
  (function(i) {
    i[i.DISCONNECTED = 1] = "DISCONNECTED", i[i.PRECEDING = 2] = "PRECEDING", i[i.FOLLOWING = 4] = "FOLLOWING", i[i.CONTAINS = 8] = "CONTAINS", i[i.CONTAINED_BY = 16] = "CONTAINED_BY";
  })(r = e.DocumentPosition || (e.DocumentPosition = {}));
  function a(i, s) {
    var o = [], d = [];
    if (i === s)
      return 0;
    for (var c = (0, u.hasChildren)(i) ? i : i.parent; c; )
      o.unshift(c), c = c.parent;
    for (c = (0, u.hasChildren)(s) ? s : s.parent; c; )
      d.unshift(c), c = c.parent;
    for (var E = Math.min(o.length, d.length), f = 0; f < E && o[f] === d[f]; )
      f++;
    if (f === 0)
      return r.DISCONNECTED;
    var m = o[f - 1], v = m.children, L = o[f], N = d[f];
    return v.indexOf(L) > v.indexOf(N) ? m === s ? r.FOLLOWING | r.CONTAINED_BY : r.FOLLOWING : m === i ? r.PRECEDING | r.CONTAINS : r.PRECEDING;
  }
  e.compareDocumentPosition = a;
  function n(i) {
    return i = i.filter(function(s, o, d) {
      return !d.includes(s, o + 1);
    }), i.sort(function(s, o) {
      var d = a(s, o);
      return d & r.PRECEDING ? -1 : d & r.FOLLOWING ? 1 : 0;
    }), i;
  }
  e.uniqueSort = n;
})(Tl);
var Ya = {};
Object.defineProperty(Ya, "__esModule", { value: !0 });
Ya.getFeed = void 0;
var i6 = Iu, mr = Du;
function c6(e) {
  var u = ma(f6, e);
  return u ? u.name === "feed" ? s6(u) : o6(u) : null;
}
Ya.getFeed = c6;
function s6(e) {
  var u, t = e.children, r = {
    type: "atom",
    items: (0, mr.getElementsByTagName)("entry", t).map(function(i) {
      var s, o = i.children, d = { media: _l(o) };
      cu(d, "id", "id", o), cu(d, "title", "title", o);
      var c = (s = ma("link", o)) === null || s === void 0 ? void 0 : s.attribs.href;
      c && (d.link = c);
      var E = ht("summary", o) || ht("content", o);
      E && (d.description = E);
      var f = ht("updated", o);
      return f && (d.pubDate = new Date(f)), d;
    })
  };
  cu(r, "id", "id", t), cu(r, "title", "title", t);
  var a = (u = ma("link", t)) === null || u === void 0 ? void 0 : u.attribs.href;
  a && (r.link = a), cu(r, "description", "subtitle", t);
  var n = ht("updated", t);
  return n && (r.updated = new Date(n)), cu(r, "author", "email", t, !0), r;
}
function o6(e) {
  var u, t, r = (t = (u = ma("channel", e.children)) === null || u === void 0 ? void 0 : u.children) !== null && t !== void 0 ? t : [], a = {
    type: e.name.substr(0, 3),
    id: "",
    items: (0, mr.getElementsByTagName)("item", e.children).map(function(i) {
      var s = i.children, o = { media: _l(s) };
      cu(o, "id", "guid", s), cu(o, "title", "title", s), cu(o, "link", "link", s), cu(o, "description", "description", s);
      var d = ht("pubDate", s) || ht("dc:date", s);
      return d && (o.pubDate = new Date(d)), o;
    })
  };
  cu(a, "title", "title", r), cu(a, "link", "link", r), cu(a, "description", "description", r);
  var n = ht("lastBuildDate", r);
  return n && (a.updated = new Date(n)), cu(a, "author", "managingEditor", r, !0), a;
}
var d6 = ["url", "type", "lang"], l6 = [
  "fileSize",
  "bitrate",
  "framerate",
  "samplingrate",
  "channels",
  "duration",
  "height",
  "width"
];
function _l(e) {
  return (0, mr.getElementsByTagName)("media:content", e).map(function(u) {
    for (var t = u.attribs, r = {
      medium: t.medium,
      isDefault: !!t.isDefault
    }, a = 0, n = d6; a < n.length; a++) {
      var i = n[a];
      t[i] && (r[i] = t[i]);
    }
    for (var s = 0, o = l6; s < o.length; s++) {
      var i = o[s];
      t[i] && (r[i] = parseInt(t[i], 10));
    }
    return t.expression && (r.expression = t.expression), r;
  });
}
function ma(e, u) {
  return (0, mr.getElementsByTagName)(e, u, !0, 1)[0];
}
function ht(e, u, t) {
  return t === void 0 && (t = !1), (0, i6.textContent)((0, mr.getElementsByTagName)(e, u, t, 1)).trim();
}
function cu(e, u, t, r, a) {
  a === void 0 && (a = !1);
  var n = ht(t, r, a);
  n && (e[u] = n);
}
function f6(e) {
  return e === "rss" || e === "feed" || e === "rdf:RDF";
}
(function(e) {
  var u = C && C.__createBinding || (Object.create ? function(a, n, i, s) {
    s === void 0 && (s = i);
    var o = Object.getOwnPropertyDescriptor(n, i);
    (!o || ("get" in o ? !n.__esModule : o.writable || o.configurable)) && (o = { enumerable: !0, get: function() {
      return n[i];
    } }), Object.defineProperty(a, s, o);
  } : function(a, n, i, s) {
    s === void 0 && (s = i), a[s] = n[i];
  }), t = C && C.__exportStar || function(a, n) {
    for (var i in a)
      i !== "default" && !Object.prototype.hasOwnProperty.call(n, i) && u(n, a, i);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.hasChildren = e.isDocument = e.isComment = e.isText = e.isCDATA = e.isTag = void 0, t(Iu, e), t($e, e), t(lu, e), t(Ze, e), t(Du, e), t(Tl, e), t(Ya, e);
  var r = Gt;
  Object.defineProperty(e, "isTag", { enumerable: !0, get: function() {
    return r.isTag;
  } }), Object.defineProperty(e, "isCDATA", { enumerable: !0, get: function() {
    return r.isCDATA;
  } }), Object.defineProperty(e, "isText", { enumerable: !0, get: function() {
    return r.isText;
  } }), Object.defineProperty(e, "isComment", { enumerable: !0, get: function() {
    return r.isComment;
  } }), Object.defineProperty(e, "isDocument", { enumerable: !0, get: function() {
    return r.isDocument;
  } }), Object.defineProperty(e, "hasChildren", { enumerable: !0, get: function() {
    return r.hasChildren;
  } });
})(Xd);
var E0 = {}, bc = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.getLimit = e.isFilter = e.filterNames = void 0, e.filterNames = /* @__PURE__ */ new Set([
    "first",
    "last",
    "eq",
    "gt",
    "nth",
    "lt",
    "even",
    "odd"
  ]);
  function u(r) {
    return r.type !== "pseudo" ? !1 : e.filterNames.has(r.name) ? !0 : r.name === "not" && Array.isArray(r.data) ? r.data.some(function(a) {
      return a.some(u);
    }) : !1;
  }
  e.isFilter = u;
  function t(r, a, n) {
    var i = a != null ? parseInt(a, 10) : NaN;
    switch (r) {
      case "first":
        return 1;
      case "nth":
      case "eq":
        return isFinite(i) ? i >= 0 ? i + 1 : 1 / 0 : 0;
      case "lt":
        return isFinite(i) ? i >= 0 ? Math.min(i, n) : 1 / 0 : 0;
      case "gt":
        return isFinite(i) ? 1 / 0 : 0;
      case "odd":
        return 2 * n;
      case "even":
        return 2 * n - 1;
      case "last":
      case "not":
        return 1 / 0;
    }
  }
  e.getLimit = t;
})(bc);
Object.defineProperty(E0, "__esModule", { value: !0 });
E0.groupSelectors = E0.getDocumentRoot = void 0;
var b6 = bc;
function h6(e) {
  for (; e.parent; )
    e = e.parent;
  return e;
}
E0.getDocumentRoot = h6;
function p6(e) {
  for (var u = [], t = [], r = 0, a = e; r < a.length; r++) {
    var n = a[r];
    n.some(b6.isFilter) ? u.push(n) : t.push(n);
  }
  return [t, u];
}
E0.groupSelectors = p6;
(function(e) {
  var u = C && C.__assign || function() {
    return u = Object.assign || function(Y) {
      for (var l, g = 1, T = arguments.length; g < T; g++) {
        l = arguments[g];
        for (var A in l)
          Object.prototype.hasOwnProperty.call(l, A) && (Y[A] = l[A]);
      }
      return Y;
    }, u.apply(this, arguments);
  }, t = C && C.__createBinding || (Object.create ? function(Y, l, g, T) {
    T === void 0 && (T = g);
    var A = Object.getOwnPropertyDescriptor(l, g);
    (!A || ("get" in A ? !l.__esModule : A.writable || A.configurable)) && (A = { enumerable: !0, get: function() {
      return l[g];
    } }), Object.defineProperty(Y, T, A);
  } : function(Y, l, g, T) {
    T === void 0 && (T = g), Y[T] = l[g];
  }), r = C && C.__setModuleDefault || (Object.create ? function(Y, l) {
    Object.defineProperty(Y, "default", { enumerable: !0, value: l });
  } : function(Y, l) {
    Y.default = l;
  }), a = C && C.__importStar || function(Y) {
    if (Y && Y.__esModule)
      return Y;
    var l = {};
    if (Y != null)
      for (var g in Y)
        g !== "default" && Object.prototype.hasOwnProperty.call(Y, g) && t(l, Y, g);
    return r(l, Y), l;
  }, n = C && C.__spreadArray || function(Y, l, g) {
    if (g || arguments.length === 2)
      for (var T = 0, A = l.length, D; T < A; T++)
        (D || !(T in l)) && (D || (D = Array.prototype.slice.call(l, 0, T)), D[T] = l[T]);
    return Y.concat(D || Array.prototype.slice.call(l));
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.select = e.filter = e.some = e.is = e.aliases = e.pseudos = e.filters = void 0;
  var i = dr, s = ci, o = a(Xd), d = a(qt), c = E0, E = bc, f = ci;
  Object.defineProperty(e, "filters", { enumerable: !0, get: function() {
    return f.filters;
  } }), Object.defineProperty(e, "pseudos", { enumerable: !0, get: function() {
    return f.pseudos;
  } }), Object.defineProperty(e, "aliases", { enumerable: !0, get: function() {
    return f.aliases;
  } });
  var m = {
    type: i.SelectorType.Universal,
    namespace: null
  }, v = {
    type: i.SelectorType.Pseudo,
    name: "scope",
    data: null
  };
  function L(Y, l, g) {
    return g === void 0 && (g = {}), N([Y], l, g);
  }
  e.is = L;
  function N(Y, l, g) {
    if (g === void 0 && (g = {}), typeof l == "function")
      return Y.some(l);
    var T = (0, c.groupSelectors)((0, i.parse)(l)), A = T[0], D = T[1];
    return A.length > 0 && Y.some((0, s._compileToken)(A, g)) || D.some(function(B) {
      return k(B, Y, g).length > 0;
    });
  }
  e.some = N;
  function O(Y, l, g, T) {
    var A = typeof g == "string" ? parseInt(g, 10) : NaN;
    switch (Y) {
      case "first":
      case "lt":
        return l;
      case "last":
        return l.length > 0 ? [l[l.length - 1]] : l;
      case "nth":
      case "eq":
        return isFinite(A) && Math.abs(A) < l.length ? [A < 0 ? l[l.length + A] : l[A]] : [];
      case "gt":
        return isFinite(A) ? l.slice(A + 1) : [];
      case "even":
        return l.filter(function(B, M) {
          return M % 2 === 0;
        });
      case "odd":
        return l.filter(function(B, M) {
          return M % 2 === 1;
        });
      case "not": {
        var D = new Set(H(g, l, T));
        return l.filter(function(B) {
          return !D.has(B);
        });
      }
    }
  }
  function w(Y, l, g) {
    return g === void 0 && (g = {}), H((0, i.parse)(Y), l, g);
  }
  e.filter = w;
  function H(Y, l, g) {
    if (l.length === 0)
      return [];
    var T = (0, c.groupSelectors)(Y), A = T[0], D = T[1], B;
    if (A.length) {
      var M = re(l, A, g);
      if (D.length === 0)
        return M;
      M.length && (B = new Set(M));
    }
    for (var $ = 0; $ < D.length && (B == null ? void 0 : B.size) !== l.length; $++) {
      var J = D[$], z = B ? l.filter(function(ge) {
        return o.isTag(ge) && !B.has(ge);
      }) : l;
      if (z.length === 0)
        break;
      var M = k(J, l, g);
      if (M.length)
        if (B)
          M.forEach(function(ge) {
            return B.add(ge);
          });
        else {
          if ($ === D.length - 1)
            return M;
          B = new Set(M);
        }
    }
    return typeof B < "u" ? B.size === l.length ? l : (
      // Filter elements to preserve order
      l.filter(function(be) {
        return B.has(be);
      })
    ) : [];
  }
  function k(Y, l, g) {
    var T;
    if (Y.some(i.isTraversal)) {
      var A = (T = g.root) !== null && T !== void 0 ? T : (0, c.getDocumentRoot)(l[0]), D = u(u({}, g), { context: l, relativeSelector: !1 });
      return Y.push(v), G(A, Y, D, !0, l.length);
    }
    return G(l, Y, g, !1, l.length);
  }
  function R(Y, l, g, T) {
    if (g === void 0 && (g = {}), T === void 0 && (T = 1 / 0), typeof Y == "function")
      return Z(l, Y);
    var A = (0, c.groupSelectors)((0, i.parse)(Y)), D = A[0], B = A[1], M = B.map(function($) {
      return G(l, $, g, !0, T);
    });
    return D.length && M.push(X(l, D, g, T)), M.length === 0 ? [] : M.length === 1 ? M[0] : o.uniqueSort(M.reduce(function($, J) {
      return n(n([], $, !0), J, !0);
    }));
  }
  e.select = R;
  function G(Y, l, g, T, A) {
    var D = l.findIndex(E.isFilter), B = l.slice(0, D), M = l[D], $ = l.length - 1 === D ? A : 1 / 0, J = (0, E.getLimit)(M.name, M.data, $);
    if (J === 0)
      return [];
    var z = B.length === 0 && !Array.isArray(Y) ? o.getChildren(Y).filter(o.isTag) : B.length === 0 ? (Array.isArray(Y) ? Y : [Y]).filter(o.isTag) : T || B.some(i.isTraversal) ? X(Y, [B], g, J) : re(Y, [B], g), be = z.slice(0, J), ge = O(M.name, be, M.data, g);
    if (ge.length === 0 || l.length === D + 1)
      return ge;
    var Ue = l.slice(D + 1), ee = Ue.some(i.isTraversal);
    if (ee) {
      if ((0, i.isTraversal)(Ue[0])) {
        var _e = Ue[0].type;
        (_e === i.SelectorType.Sibling || _e === i.SelectorType.Adjacent) && (ge = (0, s.prepareContext)(ge, o, !0)), Ue.unshift(m);
      }
      g = u(u({}, g), {
        // Avoid absolutizing the selector
        relativeSelector: !1,
        /*
         * Add a custom root func, to make sure traversals don't match elements
         * that aren't a part of the considered tree.
         */
        rootFunc: function(Ye) {
          return ge.includes(Ye);
        }
      });
    } else
      g.rootFunc && g.rootFunc !== d.trueFunc && (g = u(u({}, g), { rootFunc: d.trueFunc }));
    return Ue.some(E.isFilter) ? G(ge, Ue, g, !1, A) : ee ? (
      // Query existing elements to resolve traversal.
      X(ge, [Ue], g, A)
    ) : (
      // If we don't have any more traversals, simply filter elements.
      re(ge, [Ue], g)
    );
  }
  function X(Y, l, g, T) {
    var A = (0, s._compileToken)(l, g, Y);
    return Z(Y, A, T);
  }
  function Z(Y, l, g) {
    g === void 0 && (g = 1 / 0);
    var T = (0, s.prepareContext)(Y, o, l.shouldTestNextSiblings);
    return o.find(function(A) {
      return o.isTag(A) && l(A);
    }, T, !0, g);
  }
  function re(Y, l, g) {
    var T = (Array.isArray(Y) ? Y : [Y]).filter(o.isTag);
    if (T.length === 0)
      return T;
    var A = (0, s._compileToken)(l, g);
    return A === d.trueFunc ? T : T.filter(A);
  }
})(id);
var m6 = C && C.__createBinding || (Object.create ? function(e, u, t, r) {
  r === void 0 && (r = t);
  var a = Object.getOwnPropertyDescriptor(u, t);
  (!a || ("get" in a ? !u.__esModule : a.writable || a.configurable)) && (a = { enumerable: !0, get: function() {
    return u[t];
  } }), Object.defineProperty(e, r, a);
} : function(e, u, t, r) {
  r === void 0 && (r = t), e[r] = u[t];
}), g6 = C && C.__setModuleDefault || (Object.create ? function(e, u) {
  Object.defineProperty(e, "default", { enumerable: !0, value: u });
} : function(e, u) {
  e.default = u;
}), E6 = C && C.__importStar || function(e) {
  if (e && e.__esModule)
    return e;
  var u = {};
  if (e != null)
    for (var t in e)
      t !== "default" && Object.prototype.hasOwnProperty.call(e, t) && m6(u, e, t);
  return g6(u, e), u;
}, Ei = C && C.__spreadArray || function(e, u, t) {
  if (t || arguments.length === 2)
    for (var r = 0, a = u.length, n; r < a; r++)
      (n || !(r in u)) && (n || (n = Array.prototype.slice.call(u, 0, r)), n[r] = u[r]);
  return e.concat(n || Array.prototype.slice.call(u));
};
Object.defineProperty(Q, "__esModule", { value: !0 });
Q.addBack = Q.add = Q.end = Q.slice = Q.index = Q.toArray = Q.get = Q.eq = Q.last = Q.first = Q.has = Q.not = Q.is = Q.filterArray = Q.filter = Q.map = Q.each = Q.contents = Q.children = Q.siblings = Q.prevUntil = Q.prevAll = Q.prev = Q.nextUntil = Q.nextAll = Q.next = Q.closest = Q.parentsUntil = Q.parents = Q.parent = Q.find = void 0;
var Wa = Ou, O0 = E6(id), ku = Ht, T6 = Le, zu = D0, _6 = /^\s*[~+]/;
function y6(e) {
  var u;
  if (!e)
    return this._make([]);
  var t = this.toArray();
  if (typeof e != "string") {
    var r = (0, ku.isCheerio)(e) ? e.toArray() : [e];
    return this._make(r.filter(function(i) {
      return t.some(function(s) {
        return (0, T6.contains)(s, i);
      });
    }));
  }
  var a = _6.test(e) ? t : this.children().toArray(), n = {
    context: t,
    root: (u = this._root) === null || u === void 0 ? void 0 : u[0],
    // Pass options that are recognized by `cheerio-select`
    xmlMode: this.options.xmlMode,
    lowerCaseTags: this.options.lowerCaseTags,
    lowerCaseAttributeNames: this.options.lowerCaseAttributeNames,
    pseudos: this.options.pseudos,
    quirksMode: this.options.quirksMode
  };
  return this._make(O0.select(e, a, n));
}
Q.find = y6;
function hc(e) {
  return function(u) {
    for (var t = [], r = 1; r < arguments.length; r++)
      t[r - 1] = arguments[r];
    return function(a) {
      var n, i = e(u, this);
      return a && (i = gc(i, a, this.options.xmlMode, (n = this._root) === null || n === void 0 ? void 0 : n[0])), this._make(
        // Post processing is only necessary if there is more than one element.
        this.length > 1 && i.length > 1 ? t.reduce(function(s, o) {
          return o(s);
        }, i) : i
      );
    };
  };
}
var gr = hc(function(e, u) {
  for (var t, r = [], a = 0; a < u.length; a++) {
    var n = e(u[a]);
    r.push(n);
  }
  return (t = new Array()).concat.apply(t, r);
}), pc = hc(function(e, u) {
  for (var t = [], r = 0; r < u.length; r++) {
    var a = e(u[r]);
    a !== null && t.push(a);
  }
  return t;
});
function mc(e) {
  for (var u = [], t = 1; t < arguments.length; t++)
    u[t - 1] = arguments[t];
  var r = null, a = hc(function(n, i) {
    var s = [];
    return (0, ku.domEach)(i, function(o) {
      for (var d; (d = n(o)) && !(r != null && r(d, s.length)); o = d)
        s.push(d);
    }), s;
  }).apply(void 0, Ei([e], u, !1));
  return function(n, i) {
    var s = this;
    r = typeof n == "string" ? function(d) {
      return O0.is(d, n, s.options);
    } : n ? Er(n) : null;
    var o = a.call(this, i);
    return r = null, o;
  };
}
function L0(e) {
  return Array.from(new Set(e));
}
Q.parent = pc(function(e) {
  var u = e.parent;
  return u && !(0, Wa.isDocument)(u) ? u : null;
}, L0);
Q.parents = gr(function(e) {
  for (var u = []; e.parent && !(0, Wa.isDocument)(e.parent); )
    u.push(e.parent), e = e.parent;
  return u;
}, zu.uniqueSort, function(e) {
  return e.reverse();
});
Q.parentsUntil = mc(function(e) {
  var u = e.parent;
  return u && !(0, Wa.isDocument)(u) ? u : null;
}, zu.uniqueSort, function(e) {
  return e.reverse();
});
function A6(e) {
  var u, t = [];
  if (!e)
    return this._make(t);
  var r = {
    xmlMode: this.options.xmlMode,
    root: (u = this._root) === null || u === void 0 ? void 0 : u[0]
  }, a = typeof e == "string" ? function(n) {
    return O0.is(n, e, r);
  } : Er(e);
  return (0, ku.domEach)(this, function(n) {
    for (; n && (0, ku.isTag)(n); ) {
      if (a(n, 0)) {
        t.includes(n) || t.push(n);
        break;
      }
      n = n.parent;
    }
  }), this._make(t);
}
Q.closest = A6;
Q.next = pc(function(e) {
  return (0, zu.nextElementSibling)(e);
});
Q.nextAll = gr(function(e) {
  for (var u = []; e.next; )
    e = e.next, (0, ku.isTag)(e) && u.push(e);
  return u;
}, L0);
Q.nextUntil = mc(function(e) {
  return (0, zu.nextElementSibling)(e);
}, L0);
Q.prev = pc(function(e) {
  return (0, zu.prevElementSibling)(e);
});
Q.prevAll = gr(function(e) {
  for (var u = []; e.prev; )
    e = e.prev, (0, ku.isTag)(e) && u.push(e);
  return u;
}, L0);
Q.prevUntil = mc(function(e) {
  return (0, zu.prevElementSibling)(e);
}, L0);
Q.siblings = gr(function(e) {
  return (0, zu.getSiblings)(e).filter(function(u) {
    return (0, ku.isTag)(u) && u !== e;
  });
}, zu.uniqueSort);
Q.children = gr(function(e) {
  return (0, zu.getChildren)(e).filter(ku.isTag);
}, L0);
function v6() {
  var e = this.toArray().reduce(function(u, t) {
    return (0, Wa.hasChildren)(t) ? u.concat(t.children) : u;
  }, []);
  return this._make(e);
}
Q.contents = v6;
function x6(e) {
  for (var u = 0, t = this.length; u < t && e.call(this[u], u, this[u]) !== !1; )
    ++u;
  return this;
}
Q.each = x6;
function N6(e) {
  for (var u = [], t = 0; t < this.length; t++) {
    var r = this[t], a = e.call(r, t, r);
    a != null && (u = u.concat(a));
  }
  return this._make(u);
}
Q.map = N6;
function Er(e) {
  return typeof e == "function" ? function(u, t) {
    return e.call(u, t, u);
  } : (0, ku.isCheerio)(e) ? function(u) {
    return Array.prototype.includes.call(e, u);
  } : function(u) {
    return e === u;
  };
}
function I6(e) {
  var u;
  return this._make(gc(this.toArray(), e, this.options.xmlMode, (u = this._root) === null || u === void 0 ? void 0 : u[0]));
}
Q.filter = I6;
function gc(e, u, t, r) {
  return typeof u == "string" ? O0.filter(u, e, { xmlMode: t, root: r }) : e.filter(Er(u));
}
Q.filterArray = gc;
function D6(e) {
  var u = this.toArray();
  return typeof e == "string" ? O0.some(u.filter(ku.isTag), e, this.options) : e ? u.some(Er(e)) : !1;
}
Q.is = D6;
function C6(e) {
  var u = this.toArray();
  if (typeof e == "string") {
    var t = new Set(O0.filter(e, u, this.options));
    u = u.filter(function(a) {
      return !t.has(a);
    });
  } else {
    var r = Er(e);
    u = u.filter(function(a, n) {
      return !r(a, n);
    });
  }
  return this._make(u);
}
Q.not = C6;
function S6(e) {
  var u = this;
  return this.filter(typeof e == "string" ? (
    // Using the `:has` selector here short-circuits searches.
    ":has(".concat(e, ")")
  ) : function(t, r) {
    return u._make(r).find(e).length > 0;
  });
}
Q.has = S6;
function O6() {
  return this.length > 1 ? this._make(this[0]) : this;
}
Q.first = O6;
function L6() {
  return this.length > 0 ? this._make(this[this.length - 1]) : this;
}
Q.last = L6;
function P6(e) {
  var u;
  return e = +e, e === 0 && this.length <= 1 ? this : (e < 0 && (e = this.length + e), this._make((u = this[e]) !== null && u !== void 0 ? u : []));
}
Q.eq = P6;
function w6(e) {
  return e == null ? this.toArray() : this[e < 0 ? this.length + e : e];
}
Q.get = w6;
function R6() {
  return Array.prototype.slice.call(this);
}
Q.toArray = R6;
function M6(e) {
  var u, t;
  return e == null ? (u = this.parent().children(), t = this[0]) : typeof e == "string" ? (u = this._make(e), t = this[0]) : (u = this, t = (0, ku.isCheerio)(e) ? e[0] : e), Array.prototype.indexOf.call(u, t);
}
Q.index = M6;
function k6(e, u) {
  return this._make(Array.prototype.slice.call(this, e, u));
}
Q.slice = k6;
function B6() {
  var e;
  return (e = this.prevObject) !== null && e !== void 0 ? e : this._make([]);
}
Q.end = B6;
function U6(e, u) {
  var t = this._make(e, u), r = (0, zu.uniqueSort)(Ei(Ei([], this.get(), !0), t.get(), !0));
  return this._make(r);
}
Q.add = U6;
function H6(e) {
  return this.prevObject ? this.add(e ? this.prevObject.filter(e) : this.prevObject) : this;
}
Q.addBack = H6;
var te = {}, yl = {}, Xa = {};
Xa.byteLength = G6;
Xa.toByteArray = $6;
Xa.fromByteArray = W6;
var ju = [], Pu = [], F6 = typeof Uint8Array < "u" ? Uint8Array : Array, Cn = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var zt = 0, q6 = Cn.length; zt < q6; ++zt)
  ju[zt] = Cn[zt], Pu[Cn.charCodeAt(zt)] = zt;
Pu[45] = 62;
Pu[95] = 63;
function Al(e) {
  var u = e.length;
  if (u % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  var t = e.indexOf("=");
  t === -1 && (t = u);
  var r = t === u ? 0 : 4 - t % 4;
  return [t, r];
}
function G6(e) {
  var u = Al(e), t = u[0], r = u[1];
  return (t + r) * 3 / 4 - r;
}
function j6(e, u, t) {
  return (u + t) * 3 / 4 - t;
}
function $6(e) {
  var u, t = Al(e), r = t[0], a = t[1], n = new F6(j6(e, r, a)), i = 0, s = a > 0 ? r - 4 : r, o;
  for (o = 0; o < s; o += 4)
    u = Pu[e.charCodeAt(o)] << 18 | Pu[e.charCodeAt(o + 1)] << 12 | Pu[e.charCodeAt(o + 2)] << 6 | Pu[e.charCodeAt(o + 3)], n[i++] = u >> 16 & 255, n[i++] = u >> 8 & 255, n[i++] = u & 255;
  return a === 2 && (u = Pu[e.charCodeAt(o)] << 2 | Pu[e.charCodeAt(o + 1)] >> 4, n[i++] = u & 255), a === 1 && (u = Pu[e.charCodeAt(o)] << 10 | Pu[e.charCodeAt(o + 1)] << 4 | Pu[e.charCodeAt(o + 2)] >> 2, n[i++] = u >> 8 & 255, n[i++] = u & 255), n;
}
function V6(e) {
  return ju[e >> 18 & 63] + ju[e >> 12 & 63] + ju[e >> 6 & 63] + ju[e & 63];
}
function Y6(e, u, t) {
  for (var r, a = [], n = u; n < t; n += 3)
    r = (e[n] << 16 & 16711680) + (e[n + 1] << 8 & 65280) + (e[n + 2] & 255), a.push(V6(r));
  return a.join("");
}
function W6(e) {
  for (var u, t = e.length, r = t % 3, a = [], n = 16383, i = 0, s = t - r; i < s; i += n)
    a.push(Y6(e, i, i + n > s ? s : i + n));
  return r === 1 ? (u = e[t - 1], a.push(
    ju[u >> 2] + ju[u << 4 & 63] + "=="
  )) : r === 2 && (u = (e[t - 2] << 8) + e[t - 1], a.push(
    ju[u >> 10] + ju[u >> 4 & 63] + ju[u << 2 & 63] + "="
  )), a.join("");
}
var Ec = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
Ec.read = function(e, u, t, r, a) {
  var n, i, s = a * 8 - r - 1, o = (1 << s) - 1, d = o >> 1, c = -7, E = t ? a - 1 : 0, f = t ? -1 : 1, m = e[u + E];
  for (E += f, n = m & (1 << -c) - 1, m >>= -c, c += s; c > 0; n = n * 256 + e[u + E], E += f, c -= 8)
    ;
  for (i = n & (1 << -c) - 1, n >>= -c, c += r; c > 0; i = i * 256 + e[u + E], E += f, c -= 8)
    ;
  if (n === 0)
    n = 1 - d;
  else {
    if (n === o)
      return i ? NaN : (m ? -1 : 1) * (1 / 0);
    i = i + Math.pow(2, r), n = n - d;
  }
  return (m ? -1 : 1) * i * Math.pow(2, n - r);
};
Ec.write = function(e, u, t, r, a, n) {
  var i, s, o, d = n * 8 - a - 1, c = (1 << d) - 1, E = c >> 1, f = a === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, m = r ? 0 : n - 1, v = r ? 1 : -1, L = u < 0 || u === 0 && 1 / u < 0 ? 1 : 0;
  for (u = Math.abs(u), isNaN(u) || u === 1 / 0 ? (s = isNaN(u) ? 1 : 0, i = c) : (i = Math.floor(Math.log(u) / Math.LN2), u * (o = Math.pow(2, -i)) < 1 && (i--, o *= 2), i + E >= 1 ? u += f / o : u += f * Math.pow(2, 1 - E), u * o >= 2 && (i++, o /= 2), i + E >= c ? (s = 0, i = c) : i + E >= 1 ? (s = (u * o - 1) * Math.pow(2, a), i = i + E) : (s = u * Math.pow(2, E - 1) * Math.pow(2, a), i = 0)); a >= 8; e[t + m] = s & 255, m += v, s /= 256, a -= 8)
    ;
  for (i = i << a | s, d += a; d > 0; e[t + m] = i & 255, m += v, i /= 256, d -= 8)
    ;
  e[t + m - v] |= L * 128;
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
(function(e) {
  const u = Xa, t = Ec, r = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  e.Buffer = c, e.SlowBuffer = R, e.INSPECT_MAX_BYTES = 50;
  const a = 2147483647;
  e.kMaxLength = a;
  const { Uint8Array: n, ArrayBuffer: i, SharedArrayBuffer: s } = globalThis;
  c.TYPED_ARRAY_SUPPORT = o(), !c.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error(
    "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
  );
  function o() {
    try {
      const y = new n(1), h = { foo: function() {
        return 42;
      } };
      return Object.setPrototypeOf(h, n.prototype), Object.setPrototypeOf(y, h), y.foo() === 42;
    } catch {
      return !1;
    }
  }
  Object.defineProperty(c.prototype, "parent", {
    enumerable: !0,
    get: function() {
      if (c.isBuffer(this))
        return this.buffer;
    }
  }), Object.defineProperty(c.prototype, "offset", {
    enumerable: !0,
    get: function() {
      if (c.isBuffer(this))
        return this.byteOffset;
    }
  });
  function d(y) {
    if (y > a)
      throw new RangeError('The value "' + y + '" is invalid for option "size"');
    const h = new n(y);
    return Object.setPrototypeOf(h, c.prototype), h;
  }
  function c(y, h, p) {
    if (typeof y == "number") {
      if (typeof h == "string")
        throw new TypeError(
          'The "string" argument must be of type string. Received type number'
        );
      return v(y);
    }
    return E(y, h, p);
  }
  c.poolSize = 8192;
  function E(y, h, p) {
    if (typeof y == "string")
      return L(y, h);
    if (i.isView(y))
      return O(y);
    if (y == null)
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof y
      );
    if (Re(y, i) || y && Re(y.buffer, i) || typeof s < "u" && (Re(y, s) || y && Re(y.buffer, s)))
      return w(y, h, p);
    if (typeof y == "number")
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number'
      );
    const I = y.valueOf && y.valueOf();
    if (I != null && I !== y)
      return c.from(I, h, p);
    const P = H(y);
    if (P)
      return P;
    if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof y[Symbol.toPrimitive] == "function")
      return c.from(y[Symbol.toPrimitive]("string"), h, p);
    throw new TypeError(
      "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof y
    );
  }
  c.from = function(y, h, p) {
    return E(y, h, p);
  }, Object.setPrototypeOf(c.prototype, n.prototype), Object.setPrototypeOf(c, n);
  function f(y) {
    if (typeof y != "number")
      throw new TypeError('"size" argument must be of type number');
    if (y < 0)
      throw new RangeError('The value "' + y + '" is invalid for option "size"');
  }
  function m(y, h, p) {
    return f(y), y <= 0 ? d(y) : h !== void 0 ? typeof p == "string" ? d(y).fill(h, p) : d(y).fill(h) : d(y);
  }
  c.alloc = function(y, h, p) {
    return m(y, h, p);
  };
  function v(y) {
    return f(y), d(y < 0 ? 0 : k(y) | 0);
  }
  c.allocUnsafe = function(y) {
    return v(y);
  }, c.allocUnsafeSlow = function(y) {
    return v(y);
  };
  function L(y, h) {
    if ((typeof h != "string" || h === "") && (h = "utf8"), !c.isEncoding(h))
      throw new TypeError("Unknown encoding: " + h);
    const p = G(y, h) | 0;
    let I = d(p);
    const P = I.write(y, h);
    return P !== p && (I = I.slice(0, P)), I;
  }
  function N(y) {
    const h = y.length < 0 ? 0 : k(y.length) | 0, p = d(h);
    for (let I = 0; I < h; I += 1)
      p[I] = y[I] & 255;
    return p;
  }
  function O(y) {
    if (Re(y, n)) {
      const h = new n(y);
      return w(h.buffer, h.byteOffset, h.byteLength);
    }
    return N(y);
  }
  function w(y, h, p) {
    if (h < 0 || y.byteLength < h)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (y.byteLength < h + (p || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    let I;
    return h === void 0 && p === void 0 ? I = new n(y) : p === void 0 ? I = new n(y, h) : I = new n(y, h, p), Object.setPrototypeOf(I, c.prototype), I;
  }
  function H(y) {
    if (c.isBuffer(y)) {
      const h = k(y.length) | 0, p = d(h);
      return p.length === 0 || y.copy(p, 0, 0, h), p;
    }
    if (y.length !== void 0)
      return typeof y.length != "number" || En(y.length) ? d(0) : N(y);
    if (y.type === "Buffer" && Array.isArray(y.data))
      return N(y.data);
  }
  function k(y) {
    if (y >= a)
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + a.toString(16) + " bytes");
    return y | 0;
  }
  function R(y) {
    return +y != y && (y = 0), c.alloc(+y);
  }
  c.isBuffer = function(h) {
    return h != null && h._isBuffer === !0 && h !== c.prototype;
  }, c.compare = function(h, p) {
    if (Re(h, n) && (h = c.from(h, h.offset, h.byteLength)), Re(p, n) && (p = c.from(p, p.offset, p.byteLength)), !c.isBuffer(h) || !c.isBuffer(p))
      throw new TypeError(
        'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
      );
    if (h === p)
      return 0;
    let I = h.length, P = p.length;
    for (let U = 0, F = Math.min(I, P); U < F; ++U)
      if (h[U] !== p[U]) {
        I = h[U], P = p[U];
        break;
      }
    return I < P ? -1 : P < I ? 1 : 0;
  }, c.isEncoding = function(h) {
    switch (String(h).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return !0;
      default:
        return !1;
    }
  }, c.concat = function(h, p) {
    if (!Array.isArray(h))
      throw new TypeError('"list" argument must be an Array of Buffers');
    if (h.length === 0)
      return c.alloc(0);
    let I;
    if (p === void 0)
      for (p = 0, I = 0; I < h.length; ++I)
        p += h[I].length;
    const P = c.allocUnsafe(p);
    let U = 0;
    for (I = 0; I < h.length; ++I) {
      let F = h[I];
      if (Re(F, n))
        U + F.length > P.length ? (c.isBuffer(F) || (F = c.from(F)), F.copy(P, U)) : n.prototype.set.call(
          P,
          F,
          U
        );
      else if (c.isBuffer(F))
        F.copy(P, U);
      else
        throw new TypeError('"list" argument must be an Array of Buffers');
      U += F.length;
    }
    return P;
  };
  function G(y, h) {
    if (c.isBuffer(y))
      return y.length;
    if (i.isView(y) || Re(y, i))
      return y.byteLength;
    if (typeof y != "string")
      throw new TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof y
      );
    const p = y.length, I = arguments.length > 2 && arguments[2] === !0;
    if (!I && p === 0)
      return 0;
    let P = !1;
    for (; ; )
      switch (h) {
        case "ascii":
        case "latin1":
        case "binary":
          return p;
        case "utf8":
        case "utf-8":
          return V(y).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return p * 2;
        case "hex":
          return p >>> 1;
        case "base64":
          return le(y).length;
        default:
          if (P)
            return I ? -1 : V(y).length;
          h = ("" + h).toLowerCase(), P = !0;
      }
  }
  c.byteLength = G;
  function X(y, h, p) {
    let I = !1;
    if ((h === void 0 || h < 0) && (h = 0), h > this.length || ((p === void 0 || p > this.length) && (p = this.length), p <= 0) || (p >>>= 0, h >>>= 0, p <= h))
      return "";
    for (y || (y = "utf8"); ; )
      switch (y) {
        case "hex":
          return ge(this, h, p);
        case "utf8":
        case "utf-8":
          return M(this, h, p);
        case "ascii":
          return z(this, h, p);
        case "latin1":
        case "binary":
          return be(this, h, p);
        case "base64":
          return B(this, h, p);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return Ue(this, h, p);
        default:
          if (I)
            throw new TypeError("Unknown encoding: " + y);
          y = (y + "").toLowerCase(), I = !0;
      }
  }
  c.prototype._isBuffer = !0;
  function Z(y, h, p) {
    const I = y[h];
    y[h] = y[p], y[p] = I;
  }
  c.prototype.swap16 = function() {
    const h = this.length;
    if (h % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (let p = 0; p < h; p += 2)
      Z(this, p, p + 1);
    return this;
  }, c.prototype.swap32 = function() {
    const h = this.length;
    if (h % 4 !== 0)
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (let p = 0; p < h; p += 4)
      Z(this, p, p + 3), Z(this, p + 1, p + 2);
    return this;
  }, c.prototype.swap64 = function() {
    const h = this.length;
    if (h % 8 !== 0)
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (let p = 0; p < h; p += 8)
      Z(this, p, p + 7), Z(this, p + 1, p + 6), Z(this, p + 2, p + 5), Z(this, p + 3, p + 4);
    return this;
  }, c.prototype.toString = function() {
    const h = this.length;
    return h === 0 ? "" : arguments.length === 0 ? M(this, 0, h) : X.apply(this, arguments);
  }, c.prototype.toLocaleString = c.prototype.toString, c.prototype.equals = function(h) {
    if (!c.isBuffer(h))
      throw new TypeError("Argument must be a Buffer");
    return this === h ? !0 : c.compare(this, h) === 0;
  }, c.prototype.inspect = function() {
    let h = "";
    const p = e.INSPECT_MAX_BYTES;
    return h = this.toString("hex", 0, p).replace(/(.{2})/g, "$1 ").trim(), this.length > p && (h += " ... "), "<Buffer " + h + ">";
  }, r && (c.prototype[r] = c.prototype.inspect), c.prototype.compare = function(h, p, I, P, U) {
    if (Re(h, n) && (h = c.from(h, h.offset, h.byteLength)), !c.isBuffer(h))
      throw new TypeError(
        'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof h
      );
    if (p === void 0 && (p = 0), I === void 0 && (I = h ? h.length : 0), P === void 0 && (P = 0), U === void 0 && (U = this.length), p < 0 || I > h.length || P < 0 || U > this.length)
      throw new RangeError("out of range index");
    if (P >= U && p >= I)
      return 0;
    if (P >= U)
      return -1;
    if (p >= I)
      return 1;
    if (p >>>= 0, I >>>= 0, P >>>= 0, U >>>= 0, this === h)
      return 0;
    let F = U - P, ae = I - p;
    const De = Math.min(F, ae), Ae = this.slice(P, U), Ce = h.slice(p, I);
    for (let me = 0; me < De; ++me)
      if (Ae[me] !== Ce[me]) {
        F = Ae[me], ae = Ce[me];
        break;
      }
    return F < ae ? -1 : ae < F ? 1 : 0;
  };
  function re(y, h, p, I, P) {
    if (y.length === 0)
      return -1;
    if (typeof p == "string" ? (I = p, p = 0) : p > 2147483647 ? p = 2147483647 : p < -2147483648 && (p = -2147483648), p = +p, En(p) && (p = P ? 0 : y.length - 1), p < 0 && (p = y.length + p), p >= y.length) {
      if (P)
        return -1;
      p = y.length - 1;
    } else if (p < 0)
      if (P)
        p = 0;
      else
        return -1;
    if (typeof h == "string" && (h = c.from(h, I)), c.isBuffer(h))
      return h.length === 0 ? -1 : Y(y, h, p, I, P);
    if (typeof h == "number")
      return h = h & 255, typeof n.prototype.indexOf == "function" ? P ? n.prototype.indexOf.call(y, h, p) : n.prototype.lastIndexOf.call(y, h, p) : Y(y, [h], p, I, P);
    throw new TypeError("val must be string, number or Buffer");
  }
  function Y(y, h, p, I, P) {
    let U = 1, F = y.length, ae = h.length;
    if (I !== void 0 && (I = String(I).toLowerCase(), I === "ucs2" || I === "ucs-2" || I === "utf16le" || I === "utf-16le")) {
      if (y.length < 2 || h.length < 2)
        return -1;
      U = 2, F /= 2, ae /= 2, p /= 2;
    }
    function De(Ce, me) {
      return U === 1 ? Ce[me] : Ce.readUInt16BE(me * U);
    }
    let Ae;
    if (P) {
      let Ce = -1;
      for (Ae = p; Ae < F; Ae++)
        if (De(y, Ae) === De(h, Ce === -1 ? 0 : Ae - Ce)) {
          if (Ce === -1 && (Ce = Ae), Ae - Ce + 1 === ae)
            return Ce * U;
        } else
          Ce !== -1 && (Ae -= Ae - Ce), Ce = -1;
    } else
      for (p + ae > F && (p = F - ae), Ae = p; Ae >= 0; Ae--) {
        let Ce = !0;
        for (let me = 0; me < ae; me++)
          if (De(y, Ae + me) !== De(h, me)) {
            Ce = !1;
            break;
          }
        if (Ce)
          return Ae;
      }
    return -1;
  }
  c.prototype.includes = function(h, p, I) {
    return this.indexOf(h, p, I) !== -1;
  }, c.prototype.indexOf = function(h, p, I) {
    return re(this, h, p, I, !0);
  }, c.prototype.lastIndexOf = function(h, p, I) {
    return re(this, h, p, I, !1);
  };
  function l(y, h, p, I) {
    p = Number(p) || 0;
    const P = y.length - p;
    I ? (I = Number(I), I > P && (I = P)) : I = P;
    const U = h.length;
    I > U / 2 && (I = U / 2);
    let F;
    for (F = 0; F < I; ++F) {
      const ae = parseInt(h.substr(F * 2, 2), 16);
      if (En(ae))
        return F;
      y[p + F] = ae;
    }
    return F;
  }
  function g(y, h, p, I) {
    return Eu(V(h, y.length - p), y, p, I);
  }
  function T(y, h, p, I) {
    return Eu(K(h), y, p, I);
  }
  function A(y, h, p, I) {
    return Eu(le(h), y, p, I);
  }
  function D(y, h, p, I) {
    return Eu(de(h, y.length - p), y, p, I);
  }
  c.prototype.write = function(h, p, I, P) {
    if (p === void 0)
      P = "utf8", I = this.length, p = 0;
    else if (I === void 0 && typeof p == "string")
      P = p, I = this.length, p = 0;
    else if (isFinite(p))
      p = p >>> 0, isFinite(I) ? (I = I >>> 0, P === void 0 && (P = "utf8")) : (P = I, I = void 0);
    else
      throw new Error(
        "Buffer.write(string, encoding, offset[, length]) is no longer supported"
      );
    const U = this.length - p;
    if ((I === void 0 || I > U) && (I = U), h.length > 0 && (I < 0 || p < 0) || p > this.length)
      throw new RangeError("Attempt to write outside buffer bounds");
    P || (P = "utf8");
    let F = !1;
    for (; ; )
      switch (P) {
        case "hex":
          return l(this, h, p, I);
        case "utf8":
        case "utf-8":
          return g(this, h, p, I);
        case "ascii":
        case "latin1":
        case "binary":
          return T(this, h, p, I);
        case "base64":
          return A(this, h, p, I);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return D(this, h, p, I);
        default:
          if (F)
            throw new TypeError("Unknown encoding: " + P);
          P = ("" + P).toLowerCase(), F = !0;
      }
  }, c.prototype.toJSON = function() {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  function B(y, h, p) {
    return h === 0 && p === y.length ? u.fromByteArray(y) : u.fromByteArray(y.slice(h, p));
  }
  function M(y, h, p) {
    p = Math.min(y.length, p);
    const I = [];
    let P = h;
    for (; P < p; ) {
      const U = y[P];
      let F = null, ae = U > 239 ? 4 : U > 223 ? 3 : U > 191 ? 2 : 1;
      if (P + ae <= p) {
        let De, Ae, Ce, me;
        switch (ae) {
          case 1:
            U < 128 && (F = U);
            break;
          case 2:
            De = y[P + 1], (De & 192) === 128 && (me = (U & 31) << 6 | De & 63, me > 127 && (F = me));
            break;
          case 3:
            De = y[P + 1], Ae = y[P + 2], (De & 192) === 128 && (Ae & 192) === 128 && (me = (U & 15) << 12 | (De & 63) << 6 | Ae & 63, me > 2047 && (me < 55296 || me > 57343) && (F = me));
            break;
          case 4:
            De = y[P + 1], Ae = y[P + 2], Ce = y[P + 3], (De & 192) === 128 && (Ae & 192) === 128 && (Ce & 192) === 128 && (me = (U & 15) << 18 | (De & 63) << 12 | (Ae & 63) << 6 | Ce & 63, me > 65535 && me < 1114112 && (F = me));
        }
      }
      F === null ? (F = 65533, ae = 1) : F > 65535 && (F -= 65536, I.push(F >>> 10 & 1023 | 55296), F = 56320 | F & 1023), I.push(F), P += ae;
    }
    return J(I);
  }
  const $ = 4096;
  function J(y) {
    const h = y.length;
    if (h <= $)
      return String.fromCharCode.apply(String, y);
    let p = "", I = 0;
    for (; I < h; )
      p += String.fromCharCode.apply(
        String,
        y.slice(I, I += $)
      );
    return p;
  }
  function z(y, h, p) {
    let I = "";
    p = Math.min(y.length, p);
    for (let P = h; P < p; ++P)
      I += String.fromCharCode(y[P] & 127);
    return I;
  }
  function be(y, h, p) {
    let I = "";
    p = Math.min(y.length, p);
    for (let P = h; P < p; ++P)
      I += String.fromCharCode(y[P]);
    return I;
  }
  function ge(y, h, p) {
    const I = y.length;
    (!h || h < 0) && (h = 0), (!p || p < 0 || p > I) && (p = I);
    let P = "";
    for (let U = h; U < p; ++U)
      P += jf[y[U]];
    return P;
  }
  function Ue(y, h, p) {
    const I = y.slice(h, p);
    let P = "";
    for (let U = 0; U < I.length - 1; U += 2)
      P += String.fromCharCode(I[U] + I[U + 1] * 256);
    return P;
  }
  c.prototype.slice = function(h, p) {
    const I = this.length;
    h = ~~h, p = p === void 0 ? I : ~~p, h < 0 ? (h += I, h < 0 && (h = 0)) : h > I && (h = I), p < 0 ? (p += I, p < 0 && (p = 0)) : p > I && (p = I), p < h && (p = h);
    const P = this.subarray(h, p);
    return Object.setPrototypeOf(P, c.prototype), P;
  };
  function ee(y, h, p) {
    if (y % 1 !== 0 || y < 0)
      throw new RangeError("offset is not uint");
    if (y + h > p)
      throw new RangeError("Trying to access beyond buffer length");
  }
  c.prototype.readUintLE = c.prototype.readUIntLE = function(h, p, I) {
    h = h >>> 0, p = p >>> 0, I || ee(h, p, this.length);
    let P = this[h], U = 1, F = 0;
    for (; ++F < p && (U *= 256); )
      P += this[h + F] * U;
    return P;
  }, c.prototype.readUintBE = c.prototype.readUIntBE = function(h, p, I) {
    h = h >>> 0, p = p >>> 0, I || ee(h, p, this.length);
    let P = this[h + --p], U = 1;
    for (; p > 0 && (U *= 256); )
      P += this[h + --p] * U;
    return P;
  }, c.prototype.readUint8 = c.prototype.readUInt8 = function(h, p) {
    return h = h >>> 0, p || ee(h, 1, this.length), this[h];
  }, c.prototype.readUint16LE = c.prototype.readUInt16LE = function(h, p) {
    return h = h >>> 0, p || ee(h, 2, this.length), this[h] | this[h + 1] << 8;
  }, c.prototype.readUint16BE = c.prototype.readUInt16BE = function(h, p) {
    return h = h >>> 0, p || ee(h, 2, this.length), this[h] << 8 | this[h + 1];
  }, c.prototype.readUint32LE = c.prototype.readUInt32LE = function(h, p) {
    return h = h >>> 0, p || ee(h, 4, this.length), (this[h] | this[h + 1] << 8 | this[h + 2] << 16) + this[h + 3] * 16777216;
  }, c.prototype.readUint32BE = c.prototype.readUInt32BE = function(h, p) {
    return h = h >>> 0, p || ee(h, 4, this.length), this[h] * 16777216 + (this[h + 1] << 16 | this[h + 2] << 8 | this[h + 3]);
  }, c.prototype.readBigUInt64LE = st(function(h) {
    h = h >>> 0, Oe(h, "offset");
    const p = this[h], I = this[h + 7];
    (p === void 0 || I === void 0) && ru(h, this.length - 8);
    const P = p + this[++h] * 2 ** 8 + this[++h] * 2 ** 16 + this[++h] * 2 ** 24, U = this[++h] + this[++h] * 2 ** 8 + this[++h] * 2 ** 16 + I * 2 ** 24;
    return BigInt(P) + (BigInt(U) << BigInt(32));
  }), c.prototype.readBigUInt64BE = st(function(h) {
    h = h >>> 0, Oe(h, "offset");
    const p = this[h], I = this[h + 7];
    (p === void 0 || I === void 0) && ru(h, this.length - 8);
    const P = p * 2 ** 24 + this[++h] * 2 ** 16 + this[++h] * 2 ** 8 + this[++h], U = this[++h] * 2 ** 24 + this[++h] * 2 ** 16 + this[++h] * 2 ** 8 + I;
    return (BigInt(P) << BigInt(32)) + BigInt(U);
  }), c.prototype.readIntLE = function(h, p, I) {
    h = h >>> 0, p = p >>> 0, I || ee(h, p, this.length);
    let P = this[h], U = 1, F = 0;
    for (; ++F < p && (U *= 256); )
      P += this[h + F] * U;
    return U *= 128, P >= U && (P -= Math.pow(2, 8 * p)), P;
  }, c.prototype.readIntBE = function(h, p, I) {
    h = h >>> 0, p = p >>> 0, I || ee(h, p, this.length);
    let P = p, U = 1, F = this[h + --P];
    for (; P > 0 && (U *= 256); )
      F += this[h + --P] * U;
    return U *= 128, F >= U && (F -= Math.pow(2, 8 * p)), F;
  }, c.prototype.readInt8 = function(h, p) {
    return h = h >>> 0, p || ee(h, 1, this.length), this[h] & 128 ? (255 - this[h] + 1) * -1 : this[h];
  }, c.prototype.readInt16LE = function(h, p) {
    h = h >>> 0, p || ee(h, 2, this.length);
    const I = this[h] | this[h + 1] << 8;
    return I & 32768 ? I | 4294901760 : I;
  }, c.prototype.readInt16BE = function(h, p) {
    h = h >>> 0, p || ee(h, 2, this.length);
    const I = this[h + 1] | this[h] << 8;
    return I & 32768 ? I | 4294901760 : I;
  }, c.prototype.readInt32LE = function(h, p) {
    return h = h >>> 0, p || ee(h, 4, this.length), this[h] | this[h + 1] << 8 | this[h + 2] << 16 | this[h + 3] << 24;
  }, c.prototype.readInt32BE = function(h, p) {
    return h = h >>> 0, p || ee(h, 4, this.length), this[h] << 24 | this[h + 1] << 16 | this[h + 2] << 8 | this[h + 3];
  }, c.prototype.readBigInt64LE = st(function(h) {
    h = h >>> 0, Oe(h, "offset");
    const p = this[h], I = this[h + 7];
    (p === void 0 || I === void 0) && ru(h, this.length - 8);
    const P = this[h + 4] + this[h + 5] * 2 ** 8 + this[h + 6] * 2 ** 16 + (I << 24);
    return (BigInt(P) << BigInt(32)) + BigInt(p + this[++h] * 2 ** 8 + this[++h] * 2 ** 16 + this[++h] * 2 ** 24);
  }), c.prototype.readBigInt64BE = st(function(h) {
    h = h >>> 0, Oe(h, "offset");
    const p = this[h], I = this[h + 7];
    (p === void 0 || I === void 0) && ru(h, this.length - 8);
    const P = (p << 24) + // Overflow
    this[++h] * 2 ** 16 + this[++h] * 2 ** 8 + this[++h];
    return (BigInt(P) << BigInt(32)) + BigInt(this[++h] * 2 ** 24 + this[++h] * 2 ** 16 + this[++h] * 2 ** 8 + I);
  }), c.prototype.readFloatLE = function(h, p) {
    return h = h >>> 0, p || ee(h, 4, this.length), t.read(this, h, !0, 23, 4);
  }, c.prototype.readFloatBE = function(h, p) {
    return h = h >>> 0, p || ee(h, 4, this.length), t.read(this, h, !1, 23, 4);
  }, c.prototype.readDoubleLE = function(h, p) {
    return h = h >>> 0, p || ee(h, 8, this.length), t.read(this, h, !0, 52, 8);
  }, c.prototype.readDoubleBE = function(h, p) {
    return h = h >>> 0, p || ee(h, 8, this.length), t.read(this, h, !1, 52, 8);
  };
  function _e(y, h, p, I, P, U) {
    if (!c.isBuffer(y))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (h > P || h < U)
      throw new RangeError('"value" argument is out of bounds');
    if (p + I > y.length)
      throw new RangeError("Index out of range");
  }
  c.prototype.writeUintLE = c.prototype.writeUIntLE = function(h, p, I, P) {
    if (h = +h, p = p >>> 0, I = I >>> 0, !P) {
      const ae = Math.pow(2, 8 * I) - 1;
      _e(this, h, p, I, ae, 0);
    }
    let U = 1, F = 0;
    for (this[p] = h & 255; ++F < I && (U *= 256); )
      this[p + F] = h / U & 255;
    return p + I;
  }, c.prototype.writeUintBE = c.prototype.writeUIntBE = function(h, p, I, P) {
    if (h = +h, p = p >>> 0, I = I >>> 0, !P) {
      const ae = Math.pow(2, 8 * I) - 1;
      _e(this, h, p, I, ae, 0);
    }
    let U = I - 1, F = 1;
    for (this[p + U] = h & 255; --U >= 0 && (F *= 256); )
      this[p + U] = h / F & 255;
    return p + I;
  }, c.prototype.writeUint8 = c.prototype.writeUInt8 = function(h, p, I) {
    return h = +h, p = p >>> 0, I || _e(this, h, p, 1, 255, 0), this[p] = h & 255, p + 1;
  }, c.prototype.writeUint16LE = c.prototype.writeUInt16LE = function(h, p, I) {
    return h = +h, p = p >>> 0, I || _e(this, h, p, 2, 65535, 0), this[p] = h & 255, this[p + 1] = h >>> 8, p + 2;
  }, c.prototype.writeUint16BE = c.prototype.writeUInt16BE = function(h, p, I) {
    return h = +h, p = p >>> 0, I || _e(this, h, p, 2, 65535, 0), this[p] = h >>> 8, this[p + 1] = h & 255, p + 2;
  }, c.prototype.writeUint32LE = c.prototype.writeUInt32LE = function(h, p, I) {
    return h = +h, p = p >>> 0, I || _e(this, h, p, 4, 4294967295, 0), this[p + 3] = h >>> 24, this[p + 2] = h >>> 16, this[p + 1] = h >>> 8, this[p] = h & 255, p + 4;
  }, c.prototype.writeUint32BE = c.prototype.writeUInt32BE = function(h, p, I) {
    return h = +h, p = p >>> 0, I || _e(this, h, p, 4, 4294967295, 0), this[p] = h >>> 24, this[p + 1] = h >>> 16, this[p + 2] = h >>> 8, this[p + 3] = h & 255, p + 4;
  };
  function Ye(y, h, p, I, P) {
    Se(h, I, P, y, p, 7);
    let U = Number(h & BigInt(4294967295));
    y[p++] = U, U = U >> 8, y[p++] = U, U = U >> 8, y[p++] = U, U = U >> 8, y[p++] = U;
    let F = Number(h >> BigInt(32) & BigInt(4294967295));
    return y[p++] = F, F = F >> 8, y[p++] = F, F = F >> 8, y[p++] = F, F = F >> 8, y[p++] = F, p;
  }
  function Yt(y, h, p, I, P) {
    Se(h, I, P, y, p, 7);
    let U = Number(h & BigInt(4294967295));
    y[p + 7] = U, U = U >> 8, y[p + 6] = U, U = U >> 8, y[p + 5] = U, U = U >> 8, y[p + 4] = U;
    let F = Number(h >> BigInt(32) & BigInt(4294967295));
    return y[p + 3] = F, F = F >> 8, y[p + 2] = F, F = F >> 8, y[p + 1] = F, F = F >> 8, y[p] = F, p + 8;
  }
  c.prototype.writeBigUInt64LE = st(function(h, p = 0) {
    return Ye(this, h, p, BigInt(0), BigInt("0xffffffffffffffff"));
  }), c.prototype.writeBigUInt64BE = st(function(h, p = 0) {
    return Yt(this, h, p, BigInt(0), BigInt("0xffffffffffffffff"));
  }), c.prototype.writeIntLE = function(h, p, I, P) {
    if (h = +h, p = p >>> 0, !P) {
      const De = Math.pow(2, 8 * I - 1);
      _e(this, h, p, I, De - 1, -De);
    }
    let U = 0, F = 1, ae = 0;
    for (this[p] = h & 255; ++U < I && (F *= 256); )
      h < 0 && ae === 0 && this[p + U - 1] !== 0 && (ae = 1), this[p + U] = (h / F >> 0) - ae & 255;
    return p + I;
  }, c.prototype.writeIntBE = function(h, p, I, P) {
    if (h = +h, p = p >>> 0, !P) {
      const De = Math.pow(2, 8 * I - 1);
      _e(this, h, p, I, De - 1, -De);
    }
    let U = I - 1, F = 1, ae = 0;
    for (this[p + U] = h & 255; --U >= 0 && (F *= 256); )
      h < 0 && ae === 0 && this[p + U + 1] !== 0 && (ae = 1), this[p + U] = (h / F >> 0) - ae & 255;
    return p + I;
  }, c.prototype.writeInt8 = function(h, p, I) {
    return h = +h, p = p >>> 0, I || _e(this, h, p, 1, 127, -128), h < 0 && (h = 255 + h + 1), this[p] = h & 255, p + 1;
  }, c.prototype.writeInt16LE = function(h, p, I) {
    return h = +h, p = p >>> 0, I || _e(this, h, p, 2, 32767, -32768), this[p] = h & 255, this[p + 1] = h >>> 8, p + 2;
  }, c.prototype.writeInt16BE = function(h, p, I) {
    return h = +h, p = p >>> 0, I || _e(this, h, p, 2, 32767, -32768), this[p] = h >>> 8, this[p + 1] = h & 255, p + 2;
  }, c.prototype.writeInt32LE = function(h, p, I) {
    return h = +h, p = p >>> 0, I || _e(this, h, p, 4, 2147483647, -2147483648), this[p] = h & 255, this[p + 1] = h >>> 8, this[p + 2] = h >>> 16, this[p + 3] = h >>> 24, p + 4;
  }, c.prototype.writeInt32BE = function(h, p, I) {
    return h = +h, p = p >>> 0, I || _e(this, h, p, 4, 2147483647, -2147483648), h < 0 && (h = 4294967295 + h + 1), this[p] = h >>> 24, this[p + 1] = h >>> 16, this[p + 2] = h >>> 8, this[p + 3] = h & 255, p + 4;
  }, c.prototype.writeBigInt64LE = st(function(h, p = 0) {
    return Ye(this, h, p, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  }), c.prototype.writeBigInt64BE = st(function(h, p = 0) {
    return Yt(this, h, p, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  });
  function we(y, h, p, I, P, U) {
    if (p + I > y.length)
      throw new RangeError("Index out of range");
    if (p < 0)
      throw new RangeError("Index out of range");
  }
  function Wt(y, h, p, I, P) {
    return h = +h, p = p >>> 0, P || we(y, h, p, 4), t.write(y, h, p, I, 23, 4), p + 4;
  }
  c.prototype.writeFloatLE = function(h, p, I) {
    return Wt(this, h, p, !0, I);
  }, c.prototype.writeFloatBE = function(h, p, I) {
    return Wt(this, h, p, !1, I);
  };
  function ye(y, h, p, I, P) {
    return h = +h, p = p >>> 0, P || we(y, h, p, 8), t.write(y, h, p, I, 52, 8), p + 8;
  }
  c.prototype.writeDoubleLE = function(h, p, I) {
    return ye(this, h, p, !0, I);
  }, c.prototype.writeDoubleBE = function(h, p, I) {
    return ye(this, h, p, !1, I);
  }, c.prototype.copy = function(h, p, I, P) {
    if (!c.isBuffer(h))
      throw new TypeError("argument should be a Buffer");
    if (I || (I = 0), !P && P !== 0 && (P = this.length), p >= h.length && (p = h.length), p || (p = 0), P > 0 && P < I && (P = I), P === I || h.length === 0 || this.length === 0)
      return 0;
    if (p < 0)
      throw new RangeError("targetStart out of bounds");
    if (I < 0 || I >= this.length)
      throw new RangeError("Index out of range");
    if (P < 0)
      throw new RangeError("sourceEnd out of bounds");
    P > this.length && (P = this.length), h.length - p < P - I && (P = h.length - p + I);
    const U = P - I;
    return this === h && typeof n.prototype.copyWithin == "function" ? this.copyWithin(p, I, P) : n.prototype.set.call(
      h,
      this.subarray(I, P),
      p
    ), U;
  }, c.prototype.fill = function(h, p, I, P) {
    if (typeof h == "string") {
      if (typeof p == "string" ? (P = p, p = 0, I = this.length) : typeof I == "string" && (P = I, I = this.length), P !== void 0 && typeof P != "string")
        throw new TypeError("encoding must be a string");
      if (typeof P == "string" && !c.isEncoding(P))
        throw new TypeError("Unknown encoding: " + P);
      if (h.length === 1) {
        const F = h.charCodeAt(0);
        (P === "utf8" && F < 128 || P === "latin1") && (h = F);
      }
    } else
      typeof h == "number" ? h = h & 255 : typeof h == "boolean" && (h = Number(h));
    if (p < 0 || this.length < p || this.length < I)
      throw new RangeError("Out of range index");
    if (I <= p)
      return this;
    p = p >>> 0, I = I === void 0 ? this.length : I >>> 0, h || (h = 0);
    let U;
    if (typeof h == "number")
      for (U = p; U < I; ++U)
        this[U] = h;
    else {
      const F = c.isBuffer(h) ? h : c.from(h, P), ae = F.length;
      if (ae === 0)
        throw new TypeError('The value "' + h + '" is invalid for argument "value"');
      for (U = 0; U < I - p; ++U)
        this[U + p] = F[U % ae];
    }
    return this;
  };
  const Ne = {};
  function Lu(y, h, p) {
    Ne[y] = class extends p {
      constructor() {
        super(), Object.defineProperty(this, "message", {
          value: h.apply(this, arguments),
          writable: !0,
          configurable: !0
        }), this.name = `${this.name} [${y}]`, this.stack, delete this.name;
      }
      get code() {
        return y;
      }
      set code(P) {
        Object.defineProperty(this, "code", {
          configurable: !0,
          enumerable: !0,
          value: P,
          writable: !0
        });
      }
      toString() {
        return `${this.name} [${y}]: ${this.message}`;
      }
    };
  }
  Lu(
    "ERR_BUFFER_OUT_OF_BOUNDS",
    function(y) {
      return y ? `${y} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
    },
    RangeError
  ), Lu(
    "ERR_INVALID_ARG_TYPE",
    function(y, h) {
      return `The "${y}" argument must be of type number. Received type ${typeof h}`;
    },
    TypeError
  ), Lu(
    "ERR_OUT_OF_RANGE",
    function(y, h, p) {
      let I = `The value of "${y}" is out of range.`, P = p;
      return Number.isInteger(p) && Math.abs(p) > 2 ** 32 ? P = Ie(String(p)) : typeof p == "bigint" && (P = String(p), (p > BigInt(2) ** BigInt(32) || p < -(BigInt(2) ** BigInt(32))) && (P = Ie(P)), P += "n"), I += ` It must be ${h}. Received ${P}`, I;
    },
    RangeError
  );
  function Ie(y) {
    let h = "", p = y.length;
    const I = y[0] === "-" ? 1 : 0;
    for (; p >= I + 4; p -= 3)
      h = `_${y.slice(p - 3, p)}${h}`;
    return `${y.slice(0, p)}${h}`;
  }
  function We(y, h, p) {
    Oe(h, "offset"), (y[h] === void 0 || y[h + p] === void 0) && ru(h, y.length - (p + 1));
  }
  function Se(y, h, p, I, P, U) {
    if (y > p || y < h) {
      const F = typeof h == "bigint" ? "n" : "";
      let ae;
      throw U > 3 ? h === 0 || h === BigInt(0) ? ae = `>= 0${F} and < 2${F} ** ${(U + 1) * 8}${F}` : ae = `>= -(2${F} ** ${(U + 1) * 8 - 1}${F}) and < 2 ** ${(U + 1) * 8 - 1}${F}` : ae = `>= ${h}${F} and <= ${p}${F}`, new Ne.ERR_OUT_OF_RANGE("value", ae, y);
    }
    We(I, P, U);
  }
  function Oe(y, h) {
    if (typeof y != "number")
      throw new Ne.ERR_INVALID_ARG_TYPE(h, "number", y);
  }
  function ru(y, h, p) {
    throw Math.floor(y) !== y ? (Oe(y, p), new Ne.ERR_OUT_OF_RANGE(p || "offset", "an integer", y)) : h < 0 ? new Ne.ERR_BUFFER_OUT_OF_BOUNDS() : new Ne.ERR_OUT_OF_RANGE(
      p || "offset",
      `>= ${p ? 1 : 0} and <= ${h}`,
      y
    );
  }
  const Xt = /[^+/0-9A-Za-z-_]/g;
  function Ru(y) {
    if (y = y.split("=")[0], y = y.trim().replace(Xt, ""), y.length < 2)
      return "";
    for (; y.length % 4 !== 0; )
      y = y + "=";
    return y;
  }
  function V(y, h) {
    h = h || 1 / 0;
    let p;
    const I = y.length;
    let P = null;
    const U = [];
    for (let F = 0; F < I; ++F) {
      if (p = y.charCodeAt(F), p > 55295 && p < 57344) {
        if (!P) {
          if (p > 56319) {
            (h -= 3) > -1 && U.push(239, 191, 189);
            continue;
          } else if (F + 1 === I) {
            (h -= 3) > -1 && U.push(239, 191, 189);
            continue;
          }
          P = p;
          continue;
        }
        if (p < 56320) {
          (h -= 3) > -1 && U.push(239, 191, 189), P = p;
          continue;
        }
        p = (P - 55296 << 10 | p - 56320) + 65536;
      } else
        P && (h -= 3) > -1 && U.push(239, 191, 189);
      if (P = null, p < 128) {
        if ((h -= 1) < 0)
          break;
        U.push(p);
      } else if (p < 2048) {
        if ((h -= 2) < 0)
          break;
        U.push(
          p >> 6 | 192,
          p & 63 | 128
        );
      } else if (p < 65536) {
        if ((h -= 3) < 0)
          break;
        U.push(
          p >> 12 | 224,
          p >> 6 & 63 | 128,
          p & 63 | 128
        );
      } else if (p < 1114112) {
        if ((h -= 4) < 0)
          break;
        U.push(
          p >> 18 | 240,
          p >> 12 & 63 | 128,
          p >> 6 & 63 | 128,
          p & 63 | 128
        );
      } else
        throw new Error("Invalid code point");
    }
    return U;
  }
  function K(y) {
    const h = [];
    for (let p = 0; p < y.length; ++p)
      h.push(y.charCodeAt(p) & 255);
    return h;
  }
  function de(y, h) {
    let p, I, P;
    const U = [];
    for (let F = 0; F < y.length && !((h -= 2) < 0); ++F)
      p = y.charCodeAt(F), I = p >> 8, P = p % 256, U.push(P), U.push(I);
    return U;
  }
  function le(y) {
    return u.toByteArray(Ru(y));
  }
  function Eu(y, h, p, I) {
    let P;
    for (P = 0; P < I && !(P + p >= h.length || P >= y.length); ++P)
      h[P + p] = y[P];
    return P;
  }
  function Re(y, h) {
    return y instanceof h || y != null && y.constructor != null && y.constructor.name != null && y.constructor.name === h.name;
  }
  function En(y) {
    return y !== y;
  }
  const jf = function() {
    const y = "0123456789abcdef", h = new Array(256);
    for (let p = 0; p < 16; ++p) {
      const I = p * 16;
      for (let P = 0; P < 16; ++P)
        h[I + P] = y[p] + y[P];
    }
    return h;
  }();
  function st(y) {
    return typeof BigInt > "u" ? $f : y;
  }
  function $f() {
    throw new Error("BigInt not supported");
  }
})(yl);
const t0 = yl.Buffer;
var Mt = {};
Object.defineProperty(Mt, "__esModule", { value: !0 });
Mt.update = Mt.getParse = void 0;
var X6 = D0, bs = Ou;
function z6(e) {
  return function(t, r, a, n) {
    if (typeof t0 < "u" && t0.isBuffer(t) && (t = t.toString()), typeof t == "string")
      return e(t, r, a, n);
    var i = t;
    if (!Array.isArray(i) && (0, bs.isDocument)(i))
      return i;
    var s = new bs.Document([]);
    return vl(i, s), s;
  };
}
Mt.getParse = z6;
function vl(e, u) {
  var t = Array.isArray(e) ? e : [e];
  u ? u.children = t : u = null;
  for (var r = 0; r < t.length; r++) {
    var a = t[r];
    a.parent && a.parent.children !== t && (0, X6.removeElement)(a), u ? (a.prev = t[r - 1] || null, a.next = t[r + 1] || null) : a.prev = a.next = null, a.parent = u;
  }
  return u;
}
Mt.update = vl;
var Q6 = C && C.__spreadArray || function(e, u, t) {
  if (t || arguments.length === 2)
    for (var r = 0, a = u.length, n; r < a; r++)
      (n || !(r in u)) && (n || (n = Array.prototype.slice.call(u, 0, r)), n[r] = u[r]);
  return e.concat(n || Array.prototype.slice.call(u));
};
Object.defineProperty(te, "__esModule", { value: !0 });
te.clone = te.text = te.toString = te.html = te.empty = te.replaceWith = te.remove = te.insertBefore = te.before = te.insertAfter = te.after = te.wrapAll = te.unwrap = te.wrapInner = te.wrap = te.prepend = te.append = te.prependTo = te.appendTo = te._makeDomArray = void 0;
var Qu = Ou, T0 = Mt, hs = Le, Fe = Ht, K6 = D0;
function J6(e, u) {
  var t = this;
  return e == null ? [] : (0, Fe.isCheerio)(e) ? u ? (0, Fe.cloneDom)(e.get()) : e.get() : Array.isArray(e) ? e.reduce(function(r, a) {
    return r.concat(t._makeDomArray(a, u));
  }, []) : typeof e == "string" ? this._parse(e, this.options, !1, null).children : u ? (0, Fe.cloneDom)([e]) : [e];
}
te._makeDomArray = J6;
function xl(e) {
  return function() {
    for (var u = this, t = [], r = 0; r < arguments.length; r++)
      t[r] = arguments[r];
    var a = this.length - 1;
    return (0, Fe.domEach)(this, function(n, i) {
      if ((0, Qu.hasChildren)(n)) {
        var s = typeof t[0] == "function" ? t[0].call(n, i, u._render(n.children)) : t, o = u._makeDomArray(s, i < a);
        e(o, n.children, n);
      }
    });
  };
}
function _t(e, u, t, r, a) {
  for (var n, i, s = Q6([
    u,
    t
  ], r, !0), o = u === 0 ? null : e[u - 1], d = u + t >= e.length ? null : e[u + t], c = 0; c < r.length; ++c) {
    var E = r[c], f = E.parent;
    if (f) {
      var m = f.children, v = m.indexOf(E);
      v > -1 && (f.children.splice(v, 1), a === f && u > v && s[0]--);
    }
    E.parent = a, E.prev && (E.prev.next = (n = E.next) !== null && n !== void 0 ? n : null), E.next && (E.next.prev = (i = E.prev) !== null && i !== void 0 ? i : null), E.prev = c === 0 ? o : r[c - 1], E.next = c === r.length - 1 ? d : r[c + 1];
  }
  return o && (o.next = r[0]), d && (d.prev = r[r.length - 1]), e.splice.apply(e, s);
}
function Z6(e) {
  var u = (0, Fe.isCheerio)(e) ? e : this._make(e);
  return u.append(this), this;
}
te.appendTo = Z6;
function ep(e) {
  var u = (0, Fe.isCheerio)(e) ? e : this._make(e);
  return u.prepend(this), this;
}
te.prependTo = ep;
te.append = xl(function(e, u, t) {
  _t(u, u.length, 0, e, t);
});
te.prepend = xl(function(e, u, t) {
  _t(u, 0, 0, e, t);
});
function Nl(e) {
  return function(u) {
    for (var t = this.length - 1, r = this.parents().last(), a = 0; a < this.length; a++) {
      var n = this[a], i = typeof u == "function" ? u.call(n, a, n) : typeof u == "string" && !(0, Fe.isHtml)(u) ? r.find(u).clone() : u, s = this._makeDomArray(i, a < t)[0];
      if (!(!s || !(0, Qu.hasChildren)(s))) {
        for (var o = s, d = 0; d < o.children.length; ) {
          var c = o.children[d];
          (0, Fe.isTag)(c) ? (o = c, d = 0) : d++;
        }
        e(n, o, [s]);
      }
    }
    return this;
  };
}
te.wrap = Nl(function(e, u, t) {
  var r = e.parent;
  if (r) {
    var a = r.children, n = a.indexOf(e);
    (0, T0.update)([e], u), _t(a, n, 0, t, r);
  }
});
te.wrapInner = Nl(function(e, u, t) {
  (0, Qu.hasChildren)(e) && ((0, T0.update)(e.children, u), (0, T0.update)(t, e));
});
function up(e) {
  var u = this;
  return this.parent(e).not("body").each(function(t, r) {
    u._make(r).replaceWith(r.children);
  }), this;
}
te.unwrap = up;
function tp(e) {
  var u = this[0];
  if (u) {
    for (var t = this._make(typeof e == "function" ? e.call(u, 0, u) : e).insertBefore(u), r = void 0, a = 0; a < t.length; a++)
      t[a].type === "tag" && (r = t[a]);
    for (var n = 0; r && n < r.children.length; ) {
      var i = r.children[n];
      i.type === "tag" ? (r = i, n = 0) : n++;
    }
    r && this._make(r).append(this);
  }
  return this;
}
te.wrapAll = tp;
function rp() {
  for (var e = this, u = [], t = 0; t < arguments.length; t++)
    u[t] = arguments[t];
  var r = this.length - 1;
  return (0, Fe.domEach)(this, function(a, n) {
    var i = a.parent;
    if (!(!(0, Qu.hasChildren)(a) || !i)) {
      var s = i.children, o = s.indexOf(a);
      if (!(o < 0)) {
        var d = typeof u[0] == "function" ? u[0].call(a, n, e._render(a.children)) : u, c = e._makeDomArray(d, n < r);
        _t(s, o + 1, 0, c, i);
      }
    }
  });
}
te.after = rp;
function ap(e) {
  var u = this;
  typeof e == "string" && (e = this._make(e)), this.remove();
  var t = [];
  return this._makeDomArray(e).forEach(function(r) {
    var a = u.clone().toArray(), n = r.parent;
    if (n) {
      var i = n.children, s = i.indexOf(r);
      s < 0 || (_t(i, s + 1, 0, a, n), t.push.apply(t, a));
    }
  }), this._make(t);
}
te.insertAfter = ap;
function np() {
  for (var e = this, u = [], t = 0; t < arguments.length; t++)
    u[t] = arguments[t];
  var r = this.length - 1;
  return (0, Fe.domEach)(this, function(a, n) {
    var i = a.parent;
    if (!(!(0, Qu.hasChildren)(a) || !i)) {
      var s = i.children, o = s.indexOf(a);
      if (!(o < 0)) {
        var d = typeof u[0] == "function" ? u[0].call(a, n, e._render(a.children)) : u, c = e._makeDomArray(d, n < r);
        _t(s, o, 0, c, i);
      }
    }
  });
}
te.before = np;
function ip(e) {
  var u = this, t = this._make(e);
  this.remove();
  var r = [];
  return (0, Fe.domEach)(t, function(a) {
    var n = u.clone().toArray(), i = a.parent;
    if (i) {
      var s = i.children, o = s.indexOf(a);
      o < 0 || (_t(s, o, 0, n, i), r.push.apply(r, n));
    }
  }), this._make(r);
}
te.insertBefore = ip;
function cp(e) {
  var u = e ? this.filter(e) : this;
  return (0, Fe.domEach)(u, function(t) {
    (0, K6.removeElement)(t), t.prev = t.next = t.parent = null;
  }), this;
}
te.remove = cp;
function sp(e) {
  var u = this;
  return (0, Fe.domEach)(this, function(t, r) {
    var a = t.parent;
    if (a) {
      var n = a.children, i = typeof e == "function" ? e.call(t, r, t) : e, s = u._makeDomArray(i);
      (0, T0.update)(s, null);
      var o = n.indexOf(t);
      _t(n, o, 1, s, a), s.includes(t) || (t.parent = t.prev = t.next = null);
    }
  });
}
te.replaceWith = sp;
function op() {
  return (0, Fe.domEach)(this, function(e) {
    (0, Qu.hasChildren)(e) && (e.children.forEach(function(u) {
      u.next = u.prev = u.parent = null;
    }), e.children.length = 0);
  });
}
te.empty = op;
function dp(e) {
  var u = this;
  if (e === void 0) {
    var t = this[0];
    return !t || !(0, Qu.hasChildren)(t) ? null : this._render(t.children);
  }
  return (0, Fe.domEach)(this, function(r) {
    if ((0, Qu.hasChildren)(r)) {
      r.children.forEach(function(n) {
        n.next = n.prev = n.parent = null;
      });
      var a = (0, Fe.isCheerio)(e) ? e.toArray() : u._parse("".concat(e), u.options, !1, r).children;
      (0, T0.update)(a, r);
    }
  });
}
te.html = dp;
function lp() {
  return this._render(this);
}
te.toString = lp;
function fp(e) {
  var u = this;
  return e === void 0 ? (0, hs.text)(this) : typeof e == "function" ? (0, Fe.domEach)(this, function(t, r) {
    return u._make(t).text(e.call(t, r, (0, hs.text)([t])));
  }) : (0, Fe.domEach)(this, function(t) {
    if ((0, Qu.hasChildren)(t)) {
      t.children.forEach(function(a) {
        a.next = a.prev = a.parent = null;
      });
      var r = new Qu.Text("".concat(e));
      (0, T0.update)(r, t);
    }
  });
}
te.text = fp;
function bp() {
  return this._make((0, Fe.cloneDom)(this.get()));
}
te.clone = bp;
var za = {};
Object.defineProperty(za, "__esModule", { value: !0 });
za.css = void 0;
var Ti = Ht;
function hp(e, u) {
  if (e != null && u != null || // When `prop` is a "plain" object
  typeof e == "object" && !Array.isArray(e))
    return (0, Ti.domEach)(this, function(t, r) {
      (0, Ti.isTag)(t) && Il(t, e, u, r);
    });
  if (this.length !== 0)
    return Dl(this[0], e);
}
za.css = hp;
function Il(e, u, t, r) {
  if (typeof u == "string") {
    var a = Dl(e), n = typeof t == "function" ? t.call(e, r, a[u]) : t;
    n === "" ? delete a[u] : n != null && (a[u] = n), e.attribs.style = pp(a);
  } else
    typeof u == "object" && Object.keys(u).forEach(function(i, s) {
      Il(e, i, u[i], s);
    });
}
function Dl(e, u) {
  if (!(!e || !(0, Ti.isTag)(e))) {
    var t = mp(e.attribs.style);
    if (typeof u == "string")
      return t[u];
    if (Array.isArray(u)) {
      var r = {};
      return u.forEach(function(a) {
        t[a] != null && (r[a] = t[a]);
      }), r;
    }
    return t;
  }
}
function pp(e) {
  return Object.keys(e).reduce(function(u, t) {
    return "".concat(u).concat(u ? " " : "").concat(t, ": ").concat(e[t], ";");
  }, "");
}
function mp(e) {
  if (e = (e || "").trim(), !e)
    return {};
  for (var u = {}, t, r = 0, a = e.split(";"); r < a.length; r++) {
    var n = a[r], i = n.indexOf(":");
    if (i < 1 || i === n.length - 1) {
      var s = n.trimEnd();
      s.length > 0 && t !== void 0 && (u[t] += ";".concat(s));
    } else
      t = n.slice(0, i).trim(), u[t] = n.slice(i + 1).trim();
  }
  return u;
}
var _0 = {};
Object.defineProperty(_0, "__esModule", { value: !0 });
_0.serializeArray = _0.serialize = void 0;
var gp = Ht, ps = "input,select,textarea,keygen", Ep = /%20/g, ms = /\r?\n/g;
function Tp() {
  var e = this.serializeArray(), u = e.map(function(t) {
    return "".concat(encodeURIComponent(t.name), "=").concat(encodeURIComponent(t.value));
  });
  return u.join("&").replace(Ep, "+");
}
_0.serialize = Tp;
function _p() {
  var e = this;
  return this.map(function(u, t) {
    var r = e._make(t);
    return (0, gp.isTag)(t) && t.name === "form" ? r.find(ps).toArray() : r.filter(ps).toArray();
  }).filter(
    // Verify elements have a name (`attr.name`) and are not disabled (`:enabled`)
    '[name!=""]:enabled:not(:submit, :button, :image, :reset, :file):matches([checked], :not(:checkbox, :radio))'
    // Convert each of the elements to its value(s)
  ).map(function(u, t) {
    var r, a = e._make(t), n = a.attr("name"), i = (r = a.val()) !== null && r !== void 0 ? r : "";
    return Array.isArray(i) ? i.map(function(s) {
      return { name: n, value: s.replace(ms, `\r
`) };
    }) : { name: n, value: i.replace(ms, `\r
`) };
  }).toArray();
}
_0.serializeArray = _p;
var yp = C && C.__createBinding || (Object.create ? function(e, u, t, r) {
  r === void 0 && (r = t);
  var a = Object.getOwnPropertyDescriptor(u, t);
  (!a || ("get" in a ? !u.__esModule : a.writable || a.configurable)) && (a = { enumerable: !0, get: function() {
    return u[t];
  } }), Object.defineProperty(e, r, a);
} : function(e, u, t, r) {
  r === void 0 && (r = t), e[r] = u[t];
}), Ap = C && C.__setModuleDefault || (Object.create ? function(e, u) {
  Object.defineProperty(e, "default", { enumerable: !0, value: u });
} : function(e, u) {
  e.default = u;
}), Tr = C && C.__importStar || function(e) {
  if (e && e.__esModule)
    return e;
  var u = {};
  if (e != null)
    for (var t in e)
      t !== "default" && Object.prototype.hasOwnProperty.call(e, t) && yp(u, e, t);
  return Ap(u, e), u;
};
Object.defineProperty(Oa, "__esModule", { value: !0 });
Oa.Cheerio = void 0;
var vp = Tr(ke), xp = Tr(Q), Np = Tr(te), Ip = Tr(za), Dp = Tr(_0), _r = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(u, t, r) {
      if (this.length = 0, this.options = r, this._root = t, u) {
        for (var a = 0; a < u.length; a++)
          this[a] = u[a];
        this.length = u.length;
      }
    }
    return e;
  }()
);
Oa.Cheerio = _r;
_r.prototype.cheerio = "[cheerio object]";
_r.prototype.splice = Array.prototype.splice;
_r.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
Object.assign(_r.prototype, vp, xp, Np, Ip, Dp);
var Cp = C && C.__extends || /* @__PURE__ */ function() {
  var e = function(u, t) {
    return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, a) {
      r.__proto__ = a;
    } || function(r, a) {
      for (var n in a)
        Object.prototype.hasOwnProperty.call(a, n) && (r[n] = a[n]);
    }, e(u, t);
  };
  return function(u, t) {
    if (typeof t != "function" && t !== null)
      throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
    e(u, t);
    function r() {
      this.constructor = u;
    }
    u.prototype = t === null ? Object.create(t) : (r.prototype = t.prototype, new r());
  };
}(), r0 = C && C.__assign || function() {
  return r0 = Object.assign || function(e) {
    for (var u, t = 1, r = arguments.length; t < r; t++) {
      u = arguments[t];
      for (var a in u)
        Object.prototype.hasOwnProperty.call(u, a) && (e[a] = u[a]);
    }
    return e;
  }, r0.apply(this, arguments);
}, Sp = C && C.__createBinding || (Object.create ? function(e, u, t, r) {
  r === void 0 && (r = t);
  var a = Object.getOwnPropertyDescriptor(u, t);
  (!a || ("get" in a ? !u.__esModule : a.writable || a.configurable)) && (a = { enumerable: !0, get: function() {
    return u[t];
  } }), Object.defineProperty(e, r, a);
} : function(e, u, t, r) {
  r === void 0 && (r = t), e[r] = u[t];
}), Op = C && C.__setModuleDefault || (Object.create ? function(e, u) {
  Object.defineProperty(e, "default", { enumerable: !0, value: u });
} : function(e, u) {
  e.default = u;
}), Cl = C && C.__importStar || function(e) {
  if (e && e.__esModule)
    return e;
  var u = {};
  if (e != null)
    for (var t in e)
      t !== "default" && Object.prototype.hasOwnProperty.call(e, t) && Sp(u, e, t);
  return Op(u, e), u;
};
Object.defineProperty(va, "__esModule", { value: !0 });
va.getLoad = void 0;
var Sn = Cl(I0), Lp = Cl(Le), Pp = Oa, R0 = Ht;
function wp(e, u) {
  return function t(r, a, n) {
    if (n === void 0 && (n = !0), r == null)
      throw new Error("cheerio.load() expects a string");
    var i = r0(r0({}, Sn.default), (0, Sn.flatten)(a)), s = e(r, i, n, null), o = (
      /** @class */
      function(c) {
        Cp(E, c);
        function E() {
          return c !== null && c.apply(this, arguments) || this;
        }
        return E.prototype._make = function(f, m) {
          var v = d(f, m);
          return v.prevObject = this, v;
        }, E.prototype._parse = function(f, m, v, L) {
          return e(f, m, v, L);
        }, E.prototype._render = function(f) {
          return u(f, this.options);
        }, E;
      }(Pp.Cheerio)
    );
    function d(c, E, f, m) {
      if (f === void 0 && (f = s), c && (0, R0.isCheerio)(c))
        return c;
      var v = r0(r0({}, i), (0, Sn.flatten)(m)), L = typeof f == "string" ? [e(f, v, !1, null)] : "length" in f ? f : [f], N = (0, R0.isCheerio)(L) ? L : new o(L, null, v);
      if (N._root = N, !c)
        return new o(void 0, N, v);
      var O = typeof c == "string" && (0, R0.isHtml)(c) ? (
        // $(<html>)
        e(c, v, !1, null).children
      ) : Rp(c) ? (
        // $(dom)
        [c]
      ) : Array.isArray(c) ? (
        // $([dom])
        c
      ) : void 0, w = new o(O, N, v);
      if (O)
        return w;
      if (typeof c != "string")
        throw new Error("Unexpected type of selector");
      var H = c, k = E ? typeof E == "string" ? (0, R0.isHtml)(E) ? (
        // $('li', '<ul>...</ul>')
        new o([e(E, v, !1, null)], N, v)
      ) : (
        // $('li', 'ul')
        (H = "".concat(E, " ").concat(H), N)
      ) : (0, R0.isCheerio)(E) ? (
        // $('li', $)
        E
      ) : (
        // $('li', node), $('li', [nodes])
        new o(Array.isArray(E) ? E : [E], N, v)
      ) : (
        // If we don't have a context, maybe we have a root, from loading
        N
      );
      return k ? k.find(H) : w;
    }
    return Object.assign(d, Lp, {
      load: t,
      // `_root` and `_options` are used in static methods.
      _root: s,
      _options: i,
      // Add `fn` for plugins
      fn: o.prototype,
      // Add the prototype here to maintain `instanceof` behavior.
      prototype: o.prototype
    }), d;
  };
}
va.getLoad = wp;
function Rp(e) {
  return !!e.name || e.type === "root" || e.type === "text" || e.type === "comment";
}
var y0 = {}, er = {}, ur = {}, kt = {}, Qa = {}, Ka = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.isUndefinedCodePoint = e.isControlCodePoint = e.getSurrogatePairCodePoint = e.isSurrogatePair = e.isSurrogate = e.SEQUENCES = e.CODE_POINTS = e.REPLACEMENT_CHARACTER = void 0;
  const u = /* @__PURE__ */ new Set([
    65534,
    65535,
    131070,
    131071,
    196606,
    196607,
    262142,
    262143,
    327678,
    327679,
    393214,
    393215,
    458750,
    458751,
    524286,
    524287,
    589822,
    589823,
    655358,
    655359,
    720894,
    720895,
    786430,
    786431,
    851966,
    851967,
    917502,
    917503,
    983038,
    983039,
    1048574,
    1048575,
    1114110,
    1114111
  ]);
  e.REPLACEMENT_CHARACTER = "�", function(s) {
    s[s.EOF = -1] = "EOF", s[s.NULL = 0] = "NULL", s[s.TABULATION = 9] = "TABULATION", s[s.CARRIAGE_RETURN = 13] = "CARRIAGE_RETURN", s[s.LINE_FEED = 10] = "LINE_FEED", s[s.FORM_FEED = 12] = "FORM_FEED", s[s.SPACE = 32] = "SPACE", s[s.EXCLAMATION_MARK = 33] = "EXCLAMATION_MARK", s[s.QUOTATION_MARK = 34] = "QUOTATION_MARK", s[s.NUMBER_SIGN = 35] = "NUMBER_SIGN", s[s.AMPERSAND = 38] = "AMPERSAND", s[s.APOSTROPHE = 39] = "APOSTROPHE", s[s.HYPHEN_MINUS = 45] = "HYPHEN_MINUS", s[s.SOLIDUS = 47] = "SOLIDUS", s[s.DIGIT_0 = 48] = "DIGIT_0", s[s.DIGIT_9 = 57] = "DIGIT_9", s[s.SEMICOLON = 59] = "SEMICOLON", s[s.LESS_THAN_SIGN = 60] = "LESS_THAN_SIGN", s[s.EQUALS_SIGN = 61] = "EQUALS_SIGN", s[s.GREATER_THAN_SIGN = 62] = "GREATER_THAN_SIGN", s[s.QUESTION_MARK = 63] = "QUESTION_MARK", s[s.LATIN_CAPITAL_A = 65] = "LATIN_CAPITAL_A", s[s.LATIN_CAPITAL_F = 70] = "LATIN_CAPITAL_F", s[s.LATIN_CAPITAL_X = 88] = "LATIN_CAPITAL_X", s[s.LATIN_CAPITAL_Z = 90] = "LATIN_CAPITAL_Z", s[s.RIGHT_SQUARE_BRACKET = 93] = "RIGHT_SQUARE_BRACKET", s[s.GRAVE_ACCENT = 96] = "GRAVE_ACCENT", s[s.LATIN_SMALL_A = 97] = "LATIN_SMALL_A", s[s.LATIN_SMALL_F = 102] = "LATIN_SMALL_F", s[s.LATIN_SMALL_X = 120] = "LATIN_SMALL_X", s[s.LATIN_SMALL_Z = 122] = "LATIN_SMALL_Z", s[s.REPLACEMENT_CHARACTER = 65533] = "REPLACEMENT_CHARACTER";
  }(e.CODE_POINTS || (e.CODE_POINTS = {})), e.SEQUENCES = {
    DASH_DASH: "--",
    CDATA_START: "[CDATA[",
    DOCTYPE: "doctype",
    SCRIPT: "script",
    PUBLIC: "public",
    SYSTEM: "system"
  };
  function t(s) {
    return s >= 55296 && s <= 57343;
  }
  e.isSurrogate = t;
  function r(s) {
    return s >= 56320 && s <= 57343;
  }
  e.isSurrogatePair = r;
  function a(s, o) {
    return (s - 55296) * 1024 + 9216 + o;
  }
  e.getSurrogatePairCodePoint = a;
  function n(s) {
    return s !== 32 && s !== 10 && s !== 13 && s !== 9 && s !== 12 && s >= 1 && s <= 31 || s >= 127 && s <= 159;
  }
  e.isControlCodePoint = n;
  function i(s) {
    return s >= 64976 && s <= 65007 || u.has(s);
  }
  e.isUndefinedCodePoint = i;
})(Ka);
var yr = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ERR = void 0, function(u) {
    u.controlCharacterInInputStream = "control-character-in-input-stream", u.noncharacterInInputStream = "noncharacter-in-input-stream", u.surrogateInInputStream = "surrogate-in-input-stream", u.nonVoidHtmlElementStartTagWithTrailingSolidus = "non-void-html-element-start-tag-with-trailing-solidus", u.endTagWithAttributes = "end-tag-with-attributes", u.endTagWithTrailingSolidus = "end-tag-with-trailing-solidus", u.unexpectedSolidusInTag = "unexpected-solidus-in-tag", u.unexpectedNullCharacter = "unexpected-null-character", u.unexpectedQuestionMarkInsteadOfTagName = "unexpected-question-mark-instead-of-tag-name", u.invalidFirstCharacterOfTagName = "invalid-first-character-of-tag-name", u.unexpectedEqualsSignBeforeAttributeName = "unexpected-equals-sign-before-attribute-name", u.missingEndTagName = "missing-end-tag-name", u.unexpectedCharacterInAttributeName = "unexpected-character-in-attribute-name", u.unknownNamedCharacterReference = "unknown-named-character-reference", u.missingSemicolonAfterCharacterReference = "missing-semicolon-after-character-reference", u.unexpectedCharacterAfterDoctypeSystemIdentifier = "unexpected-character-after-doctype-system-identifier", u.unexpectedCharacterInUnquotedAttributeValue = "unexpected-character-in-unquoted-attribute-value", u.eofBeforeTagName = "eof-before-tag-name", u.eofInTag = "eof-in-tag", u.missingAttributeValue = "missing-attribute-value", u.missingWhitespaceBetweenAttributes = "missing-whitespace-between-attributes", u.missingWhitespaceAfterDoctypePublicKeyword = "missing-whitespace-after-doctype-public-keyword", u.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers = "missing-whitespace-between-doctype-public-and-system-identifiers", u.missingWhitespaceAfterDoctypeSystemKeyword = "missing-whitespace-after-doctype-system-keyword", u.missingQuoteBeforeDoctypePublicIdentifier = "missing-quote-before-doctype-public-identifier", u.missingQuoteBeforeDoctypeSystemIdentifier = "missing-quote-before-doctype-system-identifier", u.missingDoctypePublicIdentifier = "missing-doctype-public-identifier", u.missingDoctypeSystemIdentifier = "missing-doctype-system-identifier", u.abruptDoctypePublicIdentifier = "abrupt-doctype-public-identifier", u.abruptDoctypeSystemIdentifier = "abrupt-doctype-system-identifier", u.cdataInHtmlContent = "cdata-in-html-content", u.incorrectlyOpenedComment = "incorrectly-opened-comment", u.eofInScriptHtmlCommentLikeText = "eof-in-script-html-comment-like-text", u.eofInDoctype = "eof-in-doctype", u.nestedComment = "nested-comment", u.abruptClosingOfEmptyComment = "abrupt-closing-of-empty-comment", u.eofInComment = "eof-in-comment", u.incorrectlyClosedComment = "incorrectly-closed-comment", u.eofInCdata = "eof-in-cdata", u.absenceOfDigitsInNumericCharacterReference = "absence-of-digits-in-numeric-character-reference", u.nullCharacterReference = "null-character-reference", u.surrogateCharacterReference = "surrogate-character-reference", u.characterReferenceOutsideUnicodeRange = "character-reference-outside-unicode-range", u.controlCharacterReference = "control-character-reference", u.noncharacterCharacterReference = "noncharacter-character-reference", u.missingWhitespaceBeforeDoctypeName = "missing-whitespace-before-doctype-name", u.missingDoctypeName = "missing-doctype-name", u.invalidCharacterSequenceAfterDoctypeName = "invalid-character-sequence-after-doctype-name", u.duplicateAttribute = "duplicate-attribute", u.nonConformingDoctype = "non-conforming-doctype", u.missingDoctype = "missing-doctype", u.misplacedDoctype = "misplaced-doctype", u.endTagWithoutMatchingOpenElement = "end-tag-without-matching-open-element", u.closingOfElementWithOpenChildElements = "closing-of-element-with-open-child-elements", u.disallowedContentInNoscriptInHead = "disallowed-content-in-noscript-in-head", u.openElementsLeftAfterEof = "open-elements-left-after-eof", u.abandonedHeadElementChild = "abandoned-head-element-child", u.misplacedStartTagForHeadElement = "misplaced-start-tag-for-head-element", u.nestedNoscriptInHead = "nested-noscript-in-head", u.eofInElementThatCanContainOnlyText = "eof-in-element-that-can-contain-only-text";
  }(e.ERR || (e.ERR = {}));
})(yr);
Object.defineProperty(Qa, "__esModule", { value: !0 });
Qa.Preprocessor = void 0;
const Qe = Ka, On = yr, Mp = 65536;
class kp {
  constructor(u) {
    this.handler = u, this.html = "", this.pos = -1, this.lastGapPos = -2, this.gapStack = [], this.skipNextNewLine = !1, this.lastChunkWritten = !1, this.endOfChunkHit = !1, this.bufferWaterline = Mp, this.isEol = !1, this.lineStartPos = 0, this.droppedBufferSize = 0, this.line = 1, this.lastErrOffset = -1;
  }
  /** The column on the current line. If we just saw a gap (eg. a surrogate pair), return the index before. */
  get col() {
    return this.pos - this.lineStartPos + +(this.lastGapPos !== this.pos);
  }
  get offset() {
    return this.droppedBufferSize + this.pos;
  }
  getError(u) {
    const { line: t, col: r, offset: a } = this;
    return {
      code: u,
      startLine: t,
      endLine: t,
      startCol: r,
      endCol: r,
      startOffset: a,
      endOffset: a
    };
  }
  _err(u) {
    this.handler.onParseError && this.lastErrOffset !== this.offset && (this.lastErrOffset = this.offset, this.handler.onParseError(this.getError(u)));
  }
  _addGap() {
    this.gapStack.push(this.lastGapPos), this.lastGapPos = this.pos;
  }
  _processSurrogate(u) {
    if (this.pos !== this.html.length - 1) {
      const t = this.html.charCodeAt(this.pos + 1);
      if ((0, Qe.isSurrogatePair)(t))
        return this.pos++, this._addGap(), (0, Qe.getSurrogatePairCodePoint)(u, t);
    } else if (!this.lastChunkWritten)
      return this.endOfChunkHit = !0, Qe.CODE_POINTS.EOF;
    return this._err(On.ERR.surrogateInInputStream), u;
  }
  willDropParsedChunk() {
    return this.pos > this.bufferWaterline;
  }
  dropParsedChunk() {
    this.willDropParsedChunk() && (this.html = this.html.substring(this.pos), this.lineStartPos -= this.pos, this.droppedBufferSize += this.pos, this.pos = 0, this.lastGapPos = -2, this.gapStack.length = 0);
  }
  write(u, t) {
    this.html.length > 0 ? this.html += u : this.html = u, this.endOfChunkHit = !1, this.lastChunkWritten = t;
  }
  insertHtmlAtCurrentPos(u) {
    this.html = this.html.substring(0, this.pos + 1) + u + this.html.substring(this.pos + 1), this.endOfChunkHit = !1;
  }
  startsWith(u, t) {
    if (this.pos + u.length > this.html.length)
      return this.endOfChunkHit = !this.lastChunkWritten, !1;
    if (t)
      return this.html.startsWith(u, this.pos);
    for (let r = 0; r < u.length; r++)
      if ((this.html.charCodeAt(this.pos + r) | 32) !== u.charCodeAt(r))
        return !1;
    return !0;
  }
  peek(u) {
    const t = this.pos + u;
    if (t >= this.html.length)
      return this.endOfChunkHit = !this.lastChunkWritten, Qe.CODE_POINTS.EOF;
    const r = this.html.charCodeAt(t);
    return r === Qe.CODE_POINTS.CARRIAGE_RETURN ? Qe.CODE_POINTS.LINE_FEED : r;
  }
  advance() {
    if (this.pos++, this.isEol && (this.isEol = !1, this.line++, this.lineStartPos = this.pos), this.pos >= this.html.length)
      return this.endOfChunkHit = !this.lastChunkWritten, Qe.CODE_POINTS.EOF;
    let u = this.html.charCodeAt(this.pos);
    return u === Qe.CODE_POINTS.CARRIAGE_RETURN ? (this.isEol = !0, this.skipNextNewLine = !0, Qe.CODE_POINTS.LINE_FEED) : u === Qe.CODE_POINTS.LINE_FEED && (this.isEol = !0, this.skipNextNewLine) ? (this.line--, this.skipNextNewLine = !1, this._addGap(), this.advance()) : (this.skipNextNewLine = !1, (0, Qe.isSurrogate)(u) && (u = this._processSurrogate(u)), this.handler.onParseError === null || u > 31 && u < 127 || u === Qe.CODE_POINTS.LINE_FEED || u === Qe.CODE_POINTS.CARRIAGE_RETURN || u > 159 && u < 64976 || this._checkForProblematicCharacters(u), u);
  }
  _checkForProblematicCharacters(u) {
    (0, Qe.isControlCodePoint)(u) ? this._err(On.ERR.controlCharacterInInputStream) : (0, Qe.isUndefinedCodePoint)(u) && this._err(On.ERR.noncharacterInInputStream);
  }
  retreat(u) {
    for (this.pos -= u; this.pos < this.lastGapPos; )
      this.lastGapPos = this.gapStack.pop(), this.pos--;
    this.isEol = !1;
  }
}
Qa.Preprocessor = kp;
var Ja = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.getTokenAttr = e.TokenType = void 0, function(t) {
    t[t.CHARACTER = 0] = "CHARACTER", t[t.NULL_CHARACTER = 1] = "NULL_CHARACTER", t[t.WHITESPACE_CHARACTER = 2] = "WHITESPACE_CHARACTER", t[t.START_TAG = 3] = "START_TAG", t[t.END_TAG = 4] = "END_TAG", t[t.COMMENT = 5] = "COMMENT", t[t.DOCTYPE = 6] = "DOCTYPE", t[t.EOF = 7] = "EOF", t[t.HIBERNATION = 8] = "HIBERNATION";
  }(e.TokenType || (e.TokenType = {}));
  function u(t, r) {
    for (let a = t.attrs.length - 1; a >= 0; a--)
      if (t.attrs[a].name === r)
        return t.attrs[a].value;
    return null;
  }
  e.getTokenAttr = u;
})(Ja);
var Sl = {}, Tc = {};
Object.defineProperty(Tc, "__esModule", { value: !0 });
Tc.default = new Uint16Array(
  // prettier-ignore
  'ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map(function(e) {
    return e.charCodeAt(0);
  })
);
var _c = {};
Object.defineProperty(_c, "__esModule", { value: !0 });
_c.default = new Uint16Array(
  // prettier-ignore
  "Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map(function(e) {
    return e.charCodeAt(0);
  })
);
var _i = {};
(function(e) {
  var u;
  Object.defineProperty(e, "__esModule", { value: !0 }), e.replaceCodePoint = e.fromCodePoint = void 0;
  var t = /* @__PURE__ */ new Map([
    [0, 65533],
    // C1 Unicode control character reference replacements
    [128, 8364],
    [130, 8218],
    [131, 402],
    [132, 8222],
    [133, 8230],
    [134, 8224],
    [135, 8225],
    [136, 710],
    [137, 8240],
    [138, 352],
    [139, 8249],
    [140, 338],
    [142, 381],
    [145, 8216],
    [146, 8217],
    [147, 8220],
    [148, 8221],
    [149, 8226],
    [150, 8211],
    [151, 8212],
    [152, 732],
    [153, 8482],
    [154, 353],
    [155, 8250],
    [156, 339],
    [158, 382],
    [159, 376]
  ]);
  e.fromCodePoint = // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, node/no-unsupported-features/es-builtins
  (u = String.fromCodePoint) !== null && u !== void 0 ? u : function(n) {
    var i = "";
    return n > 65535 && (n -= 65536, i += String.fromCharCode(n >>> 10 & 1023 | 55296), n = 56320 | n & 1023), i += String.fromCharCode(n), i;
  };
  function r(n) {
    var i;
    return n >= 55296 && n <= 57343 || n > 1114111 ? 65533 : (i = t.get(n)) !== null && i !== void 0 ? i : n;
  }
  e.replaceCodePoint = r;
  function a(n) {
    return (0, e.fromCodePoint)(r(n));
  }
  e.default = a;
})(_i);
(function(e) {
  var u = C && C.__createBinding || (Object.create ? function(l, g, T, A) {
    A === void 0 && (A = T);
    var D = Object.getOwnPropertyDescriptor(g, T);
    (!D || ("get" in D ? !g.__esModule : D.writable || D.configurable)) && (D = { enumerable: !0, get: function() {
      return g[T];
    } }), Object.defineProperty(l, A, D);
  } : function(l, g, T, A) {
    A === void 0 && (A = T), l[A] = g[T];
  }), t = C && C.__setModuleDefault || (Object.create ? function(l, g) {
    Object.defineProperty(l, "default", { enumerable: !0, value: g });
  } : function(l, g) {
    l.default = g;
  }), r = C && C.__importStar || function(l) {
    if (l && l.__esModule)
      return l;
    var g = {};
    if (l != null)
      for (var T in l)
        T !== "default" && Object.prototype.hasOwnProperty.call(l, T) && u(g, l, T);
    return t(g, l), g;
  }, a = C && C.__importDefault || function(l) {
    return l && l.__esModule ? l : { default: l };
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.decodeXML = e.decodeHTMLStrict = e.decodeHTMLAttribute = e.decodeHTML = e.determineBranch = e.EntityDecoder = e.DecodingMode = e.BinTrieFlags = e.fromCodePoint = e.replaceCodePoint = e.decodeCodePoint = e.xmlDecodeTree = e.htmlDecodeTree = void 0;
  var n = a(Tc);
  e.htmlDecodeTree = n.default;
  var i = a(_c);
  e.xmlDecodeTree = i.default;
  var s = r(_i);
  e.decodeCodePoint = s.default;
  var o = _i;
  Object.defineProperty(e, "replaceCodePoint", { enumerable: !0, get: function() {
    return o.replaceCodePoint;
  } }), Object.defineProperty(e, "fromCodePoint", { enumerable: !0, get: function() {
    return o.fromCodePoint;
  } });
  var d;
  (function(l) {
    l[l.NUM = 35] = "NUM", l[l.SEMI = 59] = "SEMI", l[l.EQUALS = 61] = "EQUALS", l[l.ZERO = 48] = "ZERO", l[l.NINE = 57] = "NINE", l[l.LOWER_A = 97] = "LOWER_A", l[l.LOWER_F = 102] = "LOWER_F", l[l.LOWER_X = 120] = "LOWER_X", l[l.LOWER_Z = 122] = "LOWER_Z", l[l.UPPER_A = 65] = "UPPER_A", l[l.UPPER_F = 70] = "UPPER_F", l[l.UPPER_Z = 90] = "UPPER_Z";
  })(d || (d = {}));
  var c = 32, E;
  (function(l) {
    l[l.VALUE_LENGTH = 49152] = "VALUE_LENGTH", l[l.BRANCH_LENGTH = 16256] = "BRANCH_LENGTH", l[l.JUMP_TABLE = 127] = "JUMP_TABLE";
  })(E = e.BinTrieFlags || (e.BinTrieFlags = {}));
  function f(l) {
    return l >= d.ZERO && l <= d.NINE;
  }
  function m(l) {
    return l >= d.UPPER_A && l <= d.UPPER_F || l >= d.LOWER_A && l <= d.LOWER_F;
  }
  function v(l) {
    return l >= d.UPPER_A && l <= d.UPPER_Z || l >= d.LOWER_A && l <= d.LOWER_Z || f(l);
  }
  function L(l) {
    return l === d.EQUALS || v(l);
  }
  var N;
  (function(l) {
    l[l.EntityStart = 0] = "EntityStart", l[l.NumericStart = 1] = "NumericStart", l[l.NumericDecimal = 2] = "NumericDecimal", l[l.NumericHex = 3] = "NumericHex", l[l.NamedEntity = 4] = "NamedEntity";
  })(N || (N = {}));
  var O;
  (function(l) {
    l[l.Legacy = 0] = "Legacy", l[l.Strict = 1] = "Strict", l[l.Attribute = 2] = "Attribute";
  })(O = e.DecodingMode || (e.DecodingMode = {}));
  var w = (
    /** @class */
    function() {
      function l(g, T, A) {
        this.decodeTree = g, this.emitCodePoint = T, this.errors = A, this.state = N.EntityStart, this.consumed = 1, this.result = 0, this.treeIndex = 0, this.excess = 1, this.decodeMode = O.Strict;
      }
      return l.prototype.startEntity = function(g) {
        this.decodeMode = g, this.state = N.EntityStart, this.result = 0, this.treeIndex = 0, this.excess = 1, this.consumed = 1;
      }, l.prototype.write = function(g, T) {
        switch (this.state) {
          case N.EntityStart:
            return g.charCodeAt(T) === d.NUM ? (this.state = N.NumericStart, this.consumed += 1, this.stateNumericStart(g, T + 1)) : (this.state = N.NamedEntity, this.stateNamedEntity(g, T));
          case N.NumericStart:
            return this.stateNumericStart(g, T);
          case N.NumericDecimal:
            return this.stateNumericDecimal(g, T);
          case N.NumericHex:
            return this.stateNumericHex(g, T);
          case N.NamedEntity:
            return this.stateNamedEntity(g, T);
        }
      }, l.prototype.stateNumericStart = function(g, T) {
        return T >= g.length ? -1 : (g.charCodeAt(T) | c) === d.LOWER_X ? (this.state = N.NumericHex, this.consumed += 1, this.stateNumericHex(g, T + 1)) : (this.state = N.NumericDecimal, this.stateNumericDecimal(g, T));
      }, l.prototype.addToNumericResult = function(g, T, A, D) {
        if (T !== A) {
          var B = A - T;
          this.result = this.result * Math.pow(D, B) + parseInt(g.substr(T, B), D), this.consumed += B;
        }
      }, l.prototype.stateNumericHex = function(g, T) {
        for (var A = T; T < g.length; ) {
          var D = g.charCodeAt(T);
          if (f(D) || m(D))
            T += 1;
          else
            return this.addToNumericResult(g, A, T, 16), this.emitNumericEntity(D, 3);
        }
        return this.addToNumericResult(g, A, T, 16), -1;
      }, l.prototype.stateNumericDecimal = function(g, T) {
        for (var A = T; T < g.length; ) {
          var D = g.charCodeAt(T);
          if (f(D))
            T += 1;
          else
            return this.addToNumericResult(g, A, T, 10), this.emitNumericEntity(D, 2);
        }
        return this.addToNumericResult(g, A, T, 10), -1;
      }, l.prototype.emitNumericEntity = function(g, T) {
        var A;
        if (this.consumed <= T)
          return (A = this.errors) === null || A === void 0 || A.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
        if (g === d.SEMI)
          this.consumed += 1;
        else if (this.decodeMode === O.Strict)
          return 0;
        return this.emitCodePoint((0, s.replaceCodePoint)(this.result), this.consumed), this.errors && (g !== d.SEMI && this.errors.missingSemicolonAfterCharacterReference(), this.errors.validateNumericCharacterReference(this.result)), this.consumed;
      }, l.prototype.stateNamedEntity = function(g, T) {
        for (var A = this.decodeTree, D = A[this.treeIndex], B = (D & E.VALUE_LENGTH) >> 14; T < g.length; T++, this.excess++) {
          var M = g.charCodeAt(T);
          if (this.treeIndex = k(A, D, this.treeIndex + Math.max(1, B), M), this.treeIndex < 0)
            return this.result === 0 || // If we are parsing an attribute
            this.decodeMode === O.Attribute && // We shouldn't have consumed any characters after the entity,
            (B === 0 || // And there should be no invalid characters.
            L(M)) ? 0 : this.emitNotTerminatedNamedEntity();
          if (D = A[this.treeIndex], B = (D & E.VALUE_LENGTH) >> 14, B !== 0) {
            if (M === d.SEMI)
              return this.emitNamedEntityData(this.treeIndex, B, this.consumed + this.excess);
            this.decodeMode !== O.Strict && (this.result = this.treeIndex, this.consumed += this.excess, this.excess = 0);
          }
        }
        return -1;
      }, l.prototype.emitNotTerminatedNamedEntity = function() {
        var g, T = this, A = T.result, D = T.decodeTree, B = (D[A] & E.VALUE_LENGTH) >> 14;
        return this.emitNamedEntityData(A, B, this.consumed), (g = this.errors) === null || g === void 0 || g.missingSemicolonAfterCharacterReference(), this.consumed;
      }, l.prototype.emitNamedEntityData = function(g, T, A) {
        var D = this.decodeTree;
        return this.emitCodePoint(T === 1 ? D[g] & ~E.VALUE_LENGTH : D[g + 1], A), T === 3 && this.emitCodePoint(D[g + 2], A), A;
      }, l.prototype.end = function() {
        var g;
        switch (this.state) {
          case N.NamedEntity:
            return this.result !== 0 && (this.decodeMode !== O.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
          case N.NumericDecimal:
            return this.emitNumericEntity(0, 2);
          case N.NumericHex:
            return this.emitNumericEntity(0, 3);
          case N.NumericStart:
            return (g = this.errors) === null || g === void 0 || g.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
          case N.EntityStart:
            return 0;
        }
      }, l;
    }()
  );
  e.EntityDecoder = w;
  function H(l) {
    var g = "", T = new w(l, function(A) {
      return g += (0, s.fromCodePoint)(A);
    });
    return function(D, B) {
      for (var M = 0, $ = 0; ($ = D.indexOf("&", $)) >= 0; ) {
        g += D.slice(M, $), T.startEntity(B);
        var J = T.write(
          D,
          // Skip the "&"
          $ + 1
        );
        if (J < 0) {
          M = $ + T.end();
          break;
        }
        M = $ + J, $ = J === 0 ? M + 1 : M;
      }
      var z = g + D.slice(M);
      return g = "", z;
    };
  }
  function k(l, g, T, A) {
    var D = (g & E.BRANCH_LENGTH) >> 7, B = g & E.JUMP_TABLE;
    if (D === 0)
      return B !== 0 && A === B ? T : -1;
    if (B) {
      var M = A - B;
      return M < 0 || M >= D ? -1 : l[T + M] - 1;
    }
    for (var $ = T, J = $ + D - 1; $ <= J; ) {
      var z = $ + J >>> 1, be = l[z];
      if (be < A)
        $ = z + 1;
      else if (be > A)
        J = z - 1;
      else
        return l[z + D];
    }
    return -1;
  }
  e.determineBranch = k;
  var R = H(n.default), G = H(i.default);
  function X(l, g) {
    return g === void 0 && (g = O.Legacy), R(l, g);
  }
  e.decodeHTML = X;
  function Z(l) {
    return R(l, O.Attribute);
  }
  e.decodeHTMLAttribute = Z;
  function re(l) {
    return R(l, O.Strict);
  }
  e.decodeHTMLStrict = re;
  function Y(l) {
    return G(l, O.Strict);
  }
  e.decodeXML = Y;
})(Sl);
var ct = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.hasUnescapedText = e.isNumberedHeader = e.SPECIAL_ELEMENTS = e.getTagID = e.TAG_ID = e.TAG_NAMES = e.DOCUMENT_MODE = e.ATTRS = e.NS = void 0;
  var u;
  (function(c) {
    c.HTML = "http://www.w3.org/1999/xhtml", c.MATHML = "http://www.w3.org/1998/Math/MathML", c.SVG = "http://www.w3.org/2000/svg", c.XLINK = "http://www.w3.org/1999/xlink", c.XML = "http://www.w3.org/XML/1998/namespace", c.XMLNS = "http://www.w3.org/2000/xmlns/";
  })(u = e.NS || (e.NS = {})), function(c) {
    c.TYPE = "type", c.ACTION = "action", c.ENCODING = "encoding", c.PROMPT = "prompt", c.NAME = "name", c.COLOR = "color", c.FACE = "face", c.SIZE = "size";
  }(e.ATTRS || (e.ATTRS = {})), function(c) {
    c.NO_QUIRKS = "no-quirks", c.QUIRKS = "quirks", c.LIMITED_QUIRKS = "limited-quirks";
  }(e.DOCUMENT_MODE || (e.DOCUMENT_MODE = {}));
  var t;
  (function(c) {
    c.A = "a", c.ADDRESS = "address", c.ANNOTATION_XML = "annotation-xml", c.APPLET = "applet", c.AREA = "area", c.ARTICLE = "article", c.ASIDE = "aside", c.B = "b", c.BASE = "base", c.BASEFONT = "basefont", c.BGSOUND = "bgsound", c.BIG = "big", c.BLOCKQUOTE = "blockquote", c.BODY = "body", c.BR = "br", c.BUTTON = "button", c.CAPTION = "caption", c.CENTER = "center", c.CODE = "code", c.COL = "col", c.COLGROUP = "colgroup", c.DD = "dd", c.DESC = "desc", c.DETAILS = "details", c.DIALOG = "dialog", c.DIR = "dir", c.DIV = "div", c.DL = "dl", c.DT = "dt", c.EM = "em", c.EMBED = "embed", c.FIELDSET = "fieldset", c.FIGCAPTION = "figcaption", c.FIGURE = "figure", c.FONT = "font", c.FOOTER = "footer", c.FOREIGN_OBJECT = "foreignObject", c.FORM = "form", c.FRAME = "frame", c.FRAMESET = "frameset", c.H1 = "h1", c.H2 = "h2", c.H3 = "h3", c.H4 = "h4", c.H5 = "h5", c.H6 = "h6", c.HEAD = "head", c.HEADER = "header", c.HGROUP = "hgroup", c.HR = "hr", c.HTML = "html", c.I = "i", c.IMG = "img", c.IMAGE = "image", c.INPUT = "input", c.IFRAME = "iframe", c.KEYGEN = "keygen", c.LABEL = "label", c.LI = "li", c.LINK = "link", c.LISTING = "listing", c.MAIN = "main", c.MALIGNMARK = "malignmark", c.MARQUEE = "marquee", c.MATH = "math", c.MENU = "menu", c.META = "meta", c.MGLYPH = "mglyph", c.MI = "mi", c.MO = "mo", c.MN = "mn", c.MS = "ms", c.MTEXT = "mtext", c.NAV = "nav", c.NOBR = "nobr", c.NOFRAMES = "noframes", c.NOEMBED = "noembed", c.NOSCRIPT = "noscript", c.OBJECT = "object", c.OL = "ol", c.OPTGROUP = "optgroup", c.OPTION = "option", c.P = "p", c.PARAM = "param", c.PLAINTEXT = "plaintext", c.PRE = "pre", c.RB = "rb", c.RP = "rp", c.RT = "rt", c.RTC = "rtc", c.RUBY = "ruby", c.S = "s", c.SCRIPT = "script", c.SECTION = "section", c.SELECT = "select", c.SOURCE = "source", c.SMALL = "small", c.SPAN = "span", c.STRIKE = "strike", c.STRONG = "strong", c.STYLE = "style", c.SUB = "sub", c.SUMMARY = "summary", c.SUP = "sup", c.TABLE = "table", c.TBODY = "tbody", c.TEMPLATE = "template", c.TEXTAREA = "textarea", c.TFOOT = "tfoot", c.TD = "td", c.TH = "th", c.THEAD = "thead", c.TITLE = "title", c.TR = "tr", c.TRACK = "track", c.TT = "tt", c.U = "u", c.UL = "ul", c.SVG = "svg", c.VAR = "var", c.WBR = "wbr", c.XMP = "xmp";
  })(t = e.TAG_NAMES || (e.TAG_NAMES = {}));
  var r;
  (function(c) {
    c[c.UNKNOWN = 0] = "UNKNOWN", c[c.A = 1] = "A", c[c.ADDRESS = 2] = "ADDRESS", c[c.ANNOTATION_XML = 3] = "ANNOTATION_XML", c[c.APPLET = 4] = "APPLET", c[c.AREA = 5] = "AREA", c[c.ARTICLE = 6] = "ARTICLE", c[c.ASIDE = 7] = "ASIDE", c[c.B = 8] = "B", c[c.BASE = 9] = "BASE", c[c.BASEFONT = 10] = "BASEFONT", c[c.BGSOUND = 11] = "BGSOUND", c[c.BIG = 12] = "BIG", c[c.BLOCKQUOTE = 13] = "BLOCKQUOTE", c[c.BODY = 14] = "BODY", c[c.BR = 15] = "BR", c[c.BUTTON = 16] = "BUTTON", c[c.CAPTION = 17] = "CAPTION", c[c.CENTER = 18] = "CENTER", c[c.CODE = 19] = "CODE", c[c.COL = 20] = "COL", c[c.COLGROUP = 21] = "COLGROUP", c[c.DD = 22] = "DD", c[c.DESC = 23] = "DESC", c[c.DETAILS = 24] = "DETAILS", c[c.DIALOG = 25] = "DIALOG", c[c.DIR = 26] = "DIR", c[c.DIV = 27] = "DIV", c[c.DL = 28] = "DL", c[c.DT = 29] = "DT", c[c.EM = 30] = "EM", c[c.EMBED = 31] = "EMBED", c[c.FIELDSET = 32] = "FIELDSET", c[c.FIGCAPTION = 33] = "FIGCAPTION", c[c.FIGURE = 34] = "FIGURE", c[c.FONT = 35] = "FONT", c[c.FOOTER = 36] = "FOOTER", c[c.FOREIGN_OBJECT = 37] = "FOREIGN_OBJECT", c[c.FORM = 38] = "FORM", c[c.FRAME = 39] = "FRAME", c[c.FRAMESET = 40] = "FRAMESET", c[c.H1 = 41] = "H1", c[c.H2 = 42] = "H2", c[c.H3 = 43] = "H3", c[c.H4 = 44] = "H4", c[c.H5 = 45] = "H5", c[c.H6 = 46] = "H6", c[c.HEAD = 47] = "HEAD", c[c.HEADER = 48] = "HEADER", c[c.HGROUP = 49] = "HGROUP", c[c.HR = 50] = "HR", c[c.HTML = 51] = "HTML", c[c.I = 52] = "I", c[c.IMG = 53] = "IMG", c[c.IMAGE = 54] = "IMAGE", c[c.INPUT = 55] = "INPUT", c[c.IFRAME = 56] = "IFRAME", c[c.KEYGEN = 57] = "KEYGEN", c[c.LABEL = 58] = "LABEL", c[c.LI = 59] = "LI", c[c.LINK = 60] = "LINK", c[c.LISTING = 61] = "LISTING", c[c.MAIN = 62] = "MAIN", c[c.MALIGNMARK = 63] = "MALIGNMARK", c[c.MARQUEE = 64] = "MARQUEE", c[c.MATH = 65] = "MATH", c[c.MENU = 66] = "MENU", c[c.META = 67] = "META", c[c.MGLYPH = 68] = "MGLYPH", c[c.MI = 69] = "MI", c[c.MO = 70] = "MO", c[c.MN = 71] = "MN", c[c.MS = 72] = "MS", c[c.MTEXT = 73] = "MTEXT", c[c.NAV = 74] = "NAV", c[c.NOBR = 75] = "NOBR", c[c.NOFRAMES = 76] = "NOFRAMES", c[c.NOEMBED = 77] = "NOEMBED", c[c.NOSCRIPT = 78] = "NOSCRIPT", c[c.OBJECT = 79] = "OBJECT", c[c.OL = 80] = "OL", c[c.OPTGROUP = 81] = "OPTGROUP", c[c.OPTION = 82] = "OPTION", c[c.P = 83] = "P", c[c.PARAM = 84] = "PARAM", c[c.PLAINTEXT = 85] = "PLAINTEXT", c[c.PRE = 86] = "PRE", c[c.RB = 87] = "RB", c[c.RP = 88] = "RP", c[c.RT = 89] = "RT", c[c.RTC = 90] = "RTC", c[c.RUBY = 91] = "RUBY", c[c.S = 92] = "S", c[c.SCRIPT = 93] = "SCRIPT", c[c.SECTION = 94] = "SECTION", c[c.SELECT = 95] = "SELECT", c[c.SOURCE = 96] = "SOURCE", c[c.SMALL = 97] = "SMALL", c[c.SPAN = 98] = "SPAN", c[c.STRIKE = 99] = "STRIKE", c[c.STRONG = 100] = "STRONG", c[c.STYLE = 101] = "STYLE", c[c.SUB = 102] = "SUB", c[c.SUMMARY = 103] = "SUMMARY", c[c.SUP = 104] = "SUP", c[c.TABLE = 105] = "TABLE", c[c.TBODY = 106] = "TBODY", c[c.TEMPLATE = 107] = "TEMPLATE", c[c.TEXTAREA = 108] = "TEXTAREA", c[c.TFOOT = 109] = "TFOOT", c[c.TD = 110] = "TD", c[c.TH = 111] = "TH", c[c.THEAD = 112] = "THEAD", c[c.TITLE = 113] = "TITLE", c[c.TR = 114] = "TR", c[c.TRACK = 115] = "TRACK", c[c.TT = 116] = "TT", c[c.U = 117] = "U", c[c.UL = 118] = "UL", c[c.SVG = 119] = "SVG", c[c.VAR = 120] = "VAR", c[c.WBR = 121] = "WBR", c[c.XMP = 122] = "XMP";
  })(r = e.TAG_ID || (e.TAG_ID = {}));
  const a = /* @__PURE__ */ new Map([
    [t.A, r.A],
    [t.ADDRESS, r.ADDRESS],
    [t.ANNOTATION_XML, r.ANNOTATION_XML],
    [t.APPLET, r.APPLET],
    [t.AREA, r.AREA],
    [t.ARTICLE, r.ARTICLE],
    [t.ASIDE, r.ASIDE],
    [t.B, r.B],
    [t.BASE, r.BASE],
    [t.BASEFONT, r.BASEFONT],
    [t.BGSOUND, r.BGSOUND],
    [t.BIG, r.BIG],
    [t.BLOCKQUOTE, r.BLOCKQUOTE],
    [t.BODY, r.BODY],
    [t.BR, r.BR],
    [t.BUTTON, r.BUTTON],
    [t.CAPTION, r.CAPTION],
    [t.CENTER, r.CENTER],
    [t.CODE, r.CODE],
    [t.COL, r.COL],
    [t.COLGROUP, r.COLGROUP],
    [t.DD, r.DD],
    [t.DESC, r.DESC],
    [t.DETAILS, r.DETAILS],
    [t.DIALOG, r.DIALOG],
    [t.DIR, r.DIR],
    [t.DIV, r.DIV],
    [t.DL, r.DL],
    [t.DT, r.DT],
    [t.EM, r.EM],
    [t.EMBED, r.EMBED],
    [t.FIELDSET, r.FIELDSET],
    [t.FIGCAPTION, r.FIGCAPTION],
    [t.FIGURE, r.FIGURE],
    [t.FONT, r.FONT],
    [t.FOOTER, r.FOOTER],
    [t.FOREIGN_OBJECT, r.FOREIGN_OBJECT],
    [t.FORM, r.FORM],
    [t.FRAME, r.FRAME],
    [t.FRAMESET, r.FRAMESET],
    [t.H1, r.H1],
    [t.H2, r.H2],
    [t.H3, r.H3],
    [t.H4, r.H4],
    [t.H5, r.H5],
    [t.H6, r.H6],
    [t.HEAD, r.HEAD],
    [t.HEADER, r.HEADER],
    [t.HGROUP, r.HGROUP],
    [t.HR, r.HR],
    [t.HTML, r.HTML],
    [t.I, r.I],
    [t.IMG, r.IMG],
    [t.IMAGE, r.IMAGE],
    [t.INPUT, r.INPUT],
    [t.IFRAME, r.IFRAME],
    [t.KEYGEN, r.KEYGEN],
    [t.LABEL, r.LABEL],
    [t.LI, r.LI],
    [t.LINK, r.LINK],
    [t.LISTING, r.LISTING],
    [t.MAIN, r.MAIN],
    [t.MALIGNMARK, r.MALIGNMARK],
    [t.MARQUEE, r.MARQUEE],
    [t.MATH, r.MATH],
    [t.MENU, r.MENU],
    [t.META, r.META],
    [t.MGLYPH, r.MGLYPH],
    [t.MI, r.MI],
    [t.MO, r.MO],
    [t.MN, r.MN],
    [t.MS, r.MS],
    [t.MTEXT, r.MTEXT],
    [t.NAV, r.NAV],
    [t.NOBR, r.NOBR],
    [t.NOFRAMES, r.NOFRAMES],
    [t.NOEMBED, r.NOEMBED],
    [t.NOSCRIPT, r.NOSCRIPT],
    [t.OBJECT, r.OBJECT],
    [t.OL, r.OL],
    [t.OPTGROUP, r.OPTGROUP],
    [t.OPTION, r.OPTION],
    [t.P, r.P],
    [t.PARAM, r.PARAM],
    [t.PLAINTEXT, r.PLAINTEXT],
    [t.PRE, r.PRE],
    [t.RB, r.RB],
    [t.RP, r.RP],
    [t.RT, r.RT],
    [t.RTC, r.RTC],
    [t.RUBY, r.RUBY],
    [t.S, r.S],
    [t.SCRIPT, r.SCRIPT],
    [t.SECTION, r.SECTION],
    [t.SELECT, r.SELECT],
    [t.SOURCE, r.SOURCE],
    [t.SMALL, r.SMALL],
    [t.SPAN, r.SPAN],
    [t.STRIKE, r.STRIKE],
    [t.STRONG, r.STRONG],
    [t.STYLE, r.STYLE],
    [t.SUB, r.SUB],
    [t.SUMMARY, r.SUMMARY],
    [t.SUP, r.SUP],
    [t.TABLE, r.TABLE],
    [t.TBODY, r.TBODY],
    [t.TEMPLATE, r.TEMPLATE],
    [t.TEXTAREA, r.TEXTAREA],
    [t.TFOOT, r.TFOOT],
    [t.TD, r.TD],
    [t.TH, r.TH],
    [t.THEAD, r.THEAD],
    [t.TITLE, r.TITLE],
    [t.TR, r.TR],
    [t.TRACK, r.TRACK],
    [t.TT, r.TT],
    [t.U, r.U],
    [t.UL, r.UL],
    [t.SVG, r.SVG],
    [t.VAR, r.VAR],
    [t.WBR, r.WBR],
    [t.XMP, r.XMP]
  ]);
  function n(c) {
    var E;
    return (E = a.get(c)) !== null && E !== void 0 ? E : r.UNKNOWN;
  }
  e.getTagID = n;
  const i = r;
  e.SPECIAL_ELEMENTS = {
    [u.HTML]: /* @__PURE__ */ new Set([
      i.ADDRESS,
      i.APPLET,
      i.AREA,
      i.ARTICLE,
      i.ASIDE,
      i.BASE,
      i.BASEFONT,
      i.BGSOUND,
      i.BLOCKQUOTE,
      i.BODY,
      i.BR,
      i.BUTTON,
      i.CAPTION,
      i.CENTER,
      i.COL,
      i.COLGROUP,
      i.DD,
      i.DETAILS,
      i.DIR,
      i.DIV,
      i.DL,
      i.DT,
      i.EMBED,
      i.FIELDSET,
      i.FIGCAPTION,
      i.FIGURE,
      i.FOOTER,
      i.FORM,
      i.FRAME,
      i.FRAMESET,
      i.H1,
      i.H2,
      i.H3,
      i.H4,
      i.H5,
      i.H6,
      i.HEAD,
      i.HEADER,
      i.HGROUP,
      i.HR,
      i.HTML,
      i.IFRAME,
      i.IMG,
      i.INPUT,
      i.LI,
      i.LINK,
      i.LISTING,
      i.MAIN,
      i.MARQUEE,
      i.MENU,
      i.META,
      i.NAV,
      i.NOEMBED,
      i.NOFRAMES,
      i.NOSCRIPT,
      i.OBJECT,
      i.OL,
      i.P,
      i.PARAM,
      i.PLAINTEXT,
      i.PRE,
      i.SCRIPT,
      i.SECTION,
      i.SELECT,
      i.SOURCE,
      i.STYLE,
      i.SUMMARY,
      i.TABLE,
      i.TBODY,
      i.TD,
      i.TEMPLATE,
      i.TEXTAREA,
      i.TFOOT,
      i.TH,
      i.THEAD,
      i.TITLE,
      i.TR,
      i.TRACK,
      i.UL,
      i.WBR,
      i.XMP
    ]),
    [u.MATHML]: /* @__PURE__ */ new Set([i.MI, i.MO, i.MN, i.MS, i.MTEXT, i.ANNOTATION_XML]),
    [u.SVG]: /* @__PURE__ */ new Set([i.TITLE, i.FOREIGN_OBJECT, i.DESC]),
    [u.XLINK]: /* @__PURE__ */ new Set(),
    [u.XML]: /* @__PURE__ */ new Set(),
    [u.XMLNS]: /* @__PURE__ */ new Set()
  };
  function s(c) {
    return c === i.H1 || c === i.H2 || c === i.H3 || c === i.H4 || c === i.H5 || c === i.H6;
  }
  e.isNumberedHeader = s;
  const o = /* @__PURE__ */ new Set([
    t.STYLE,
    t.SCRIPT,
    t.XMP,
    t.IFRAME,
    t.NOEMBED,
    t.NOFRAMES,
    t.PLAINTEXT
  ]);
  function d(c, E) {
    return o.has(c) || E && c === t.NOSCRIPT;
  }
  e.hasUnescapedText = d;
})(ct);
Object.defineProperty(kt, "__esModule", { value: !0 });
kt.Tokenizer = kt.TokenizerMode = void 0;
const Bp = Qa, _ = Ka, au = Ja, Uu = Sl, q = yr, Ln = ct, Up = /* @__PURE__ */ new Map([
  [128, 8364],
  [130, 8218],
  [131, 402],
  [132, 8222],
  [133, 8230],
  [134, 8224],
  [135, 8225],
  [136, 710],
  [137, 8240],
  [138, 352],
  [139, 8249],
  [140, 338],
  [142, 381],
  [145, 8216],
  [146, 8217],
  [147, 8220],
  [148, 8221],
  [149, 8226],
  [150, 8211],
  [151, 8212],
  [152, 732],
  [153, 8482],
  [154, 353],
  [155, 8250],
  [156, 339],
  [158, 382],
  [159, 376]
]);
var x;
(function(e) {
  e[e.DATA = 0] = "DATA", e[e.RCDATA = 1] = "RCDATA", e[e.RAWTEXT = 2] = "RAWTEXT", e[e.SCRIPT_DATA = 3] = "SCRIPT_DATA", e[e.PLAINTEXT = 4] = "PLAINTEXT", e[e.TAG_OPEN = 5] = "TAG_OPEN", e[e.END_TAG_OPEN = 6] = "END_TAG_OPEN", e[e.TAG_NAME = 7] = "TAG_NAME", e[e.RCDATA_LESS_THAN_SIGN = 8] = "RCDATA_LESS_THAN_SIGN", e[e.RCDATA_END_TAG_OPEN = 9] = "RCDATA_END_TAG_OPEN", e[e.RCDATA_END_TAG_NAME = 10] = "RCDATA_END_TAG_NAME", e[e.RAWTEXT_LESS_THAN_SIGN = 11] = "RAWTEXT_LESS_THAN_SIGN", e[e.RAWTEXT_END_TAG_OPEN = 12] = "RAWTEXT_END_TAG_OPEN", e[e.RAWTEXT_END_TAG_NAME = 13] = "RAWTEXT_END_TAG_NAME", e[e.SCRIPT_DATA_LESS_THAN_SIGN = 14] = "SCRIPT_DATA_LESS_THAN_SIGN", e[e.SCRIPT_DATA_END_TAG_OPEN = 15] = "SCRIPT_DATA_END_TAG_OPEN", e[e.SCRIPT_DATA_END_TAG_NAME = 16] = "SCRIPT_DATA_END_TAG_NAME", e[e.SCRIPT_DATA_ESCAPE_START = 17] = "SCRIPT_DATA_ESCAPE_START", e[e.SCRIPT_DATA_ESCAPE_START_DASH = 18] = "SCRIPT_DATA_ESCAPE_START_DASH", e[e.SCRIPT_DATA_ESCAPED = 19] = "SCRIPT_DATA_ESCAPED", e[e.SCRIPT_DATA_ESCAPED_DASH = 20] = "SCRIPT_DATA_ESCAPED_DASH", e[e.SCRIPT_DATA_ESCAPED_DASH_DASH = 21] = "SCRIPT_DATA_ESCAPED_DASH_DASH", e[e.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN = 22] = "SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN", e[e.SCRIPT_DATA_ESCAPED_END_TAG_OPEN = 23] = "SCRIPT_DATA_ESCAPED_END_TAG_OPEN", e[e.SCRIPT_DATA_ESCAPED_END_TAG_NAME = 24] = "SCRIPT_DATA_ESCAPED_END_TAG_NAME", e[e.SCRIPT_DATA_DOUBLE_ESCAPE_START = 25] = "SCRIPT_DATA_DOUBLE_ESCAPE_START", e[e.SCRIPT_DATA_DOUBLE_ESCAPED = 26] = "SCRIPT_DATA_DOUBLE_ESCAPED", e[e.SCRIPT_DATA_DOUBLE_ESCAPED_DASH = 27] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH", e[e.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH = 28] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH", e[e.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN = 29] = "SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN", e[e.SCRIPT_DATA_DOUBLE_ESCAPE_END = 30] = "SCRIPT_DATA_DOUBLE_ESCAPE_END", e[e.BEFORE_ATTRIBUTE_NAME = 31] = "BEFORE_ATTRIBUTE_NAME", e[e.ATTRIBUTE_NAME = 32] = "ATTRIBUTE_NAME", e[e.AFTER_ATTRIBUTE_NAME = 33] = "AFTER_ATTRIBUTE_NAME", e[e.BEFORE_ATTRIBUTE_VALUE = 34] = "BEFORE_ATTRIBUTE_VALUE", e[e.ATTRIBUTE_VALUE_DOUBLE_QUOTED = 35] = "ATTRIBUTE_VALUE_DOUBLE_QUOTED", e[e.ATTRIBUTE_VALUE_SINGLE_QUOTED = 36] = "ATTRIBUTE_VALUE_SINGLE_QUOTED", e[e.ATTRIBUTE_VALUE_UNQUOTED = 37] = "ATTRIBUTE_VALUE_UNQUOTED", e[e.AFTER_ATTRIBUTE_VALUE_QUOTED = 38] = "AFTER_ATTRIBUTE_VALUE_QUOTED", e[e.SELF_CLOSING_START_TAG = 39] = "SELF_CLOSING_START_TAG", e[e.BOGUS_COMMENT = 40] = "BOGUS_COMMENT", e[e.MARKUP_DECLARATION_OPEN = 41] = "MARKUP_DECLARATION_OPEN", e[e.COMMENT_START = 42] = "COMMENT_START", e[e.COMMENT_START_DASH = 43] = "COMMENT_START_DASH", e[e.COMMENT = 44] = "COMMENT", e[e.COMMENT_LESS_THAN_SIGN = 45] = "COMMENT_LESS_THAN_SIGN", e[e.COMMENT_LESS_THAN_SIGN_BANG = 46] = "COMMENT_LESS_THAN_SIGN_BANG", e[e.COMMENT_LESS_THAN_SIGN_BANG_DASH = 47] = "COMMENT_LESS_THAN_SIGN_BANG_DASH", e[e.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH = 48] = "COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH", e[e.COMMENT_END_DASH = 49] = "COMMENT_END_DASH", e[e.COMMENT_END = 50] = "COMMENT_END", e[e.COMMENT_END_BANG = 51] = "COMMENT_END_BANG", e[e.DOCTYPE = 52] = "DOCTYPE", e[e.BEFORE_DOCTYPE_NAME = 53] = "BEFORE_DOCTYPE_NAME", e[e.DOCTYPE_NAME = 54] = "DOCTYPE_NAME", e[e.AFTER_DOCTYPE_NAME = 55] = "AFTER_DOCTYPE_NAME", e[e.AFTER_DOCTYPE_PUBLIC_KEYWORD = 56] = "AFTER_DOCTYPE_PUBLIC_KEYWORD", e[e.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER = 57] = "BEFORE_DOCTYPE_PUBLIC_IDENTIFIER", e[e.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED = 58] = "DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED", e[e.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED = 59] = "DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED", e[e.AFTER_DOCTYPE_PUBLIC_IDENTIFIER = 60] = "AFTER_DOCTYPE_PUBLIC_IDENTIFIER", e[e.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS = 61] = "BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS", e[e.AFTER_DOCTYPE_SYSTEM_KEYWORD = 62] = "AFTER_DOCTYPE_SYSTEM_KEYWORD", e[e.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER = 63] = "BEFORE_DOCTYPE_SYSTEM_IDENTIFIER", e[e.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED = 64] = "DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED", e[e.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED = 65] = "DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED", e[e.AFTER_DOCTYPE_SYSTEM_IDENTIFIER = 66] = "AFTER_DOCTYPE_SYSTEM_IDENTIFIER", e[e.BOGUS_DOCTYPE = 67] = "BOGUS_DOCTYPE", e[e.CDATA_SECTION = 68] = "CDATA_SECTION", e[e.CDATA_SECTION_BRACKET = 69] = "CDATA_SECTION_BRACKET", e[e.CDATA_SECTION_END = 70] = "CDATA_SECTION_END", e[e.CHARACTER_REFERENCE = 71] = "CHARACTER_REFERENCE", e[e.NAMED_CHARACTER_REFERENCE = 72] = "NAMED_CHARACTER_REFERENCE", e[e.AMBIGUOUS_AMPERSAND = 73] = "AMBIGUOUS_AMPERSAND", e[e.NUMERIC_CHARACTER_REFERENCE = 74] = "NUMERIC_CHARACTER_REFERENCE", e[e.HEXADEMICAL_CHARACTER_REFERENCE_START = 75] = "HEXADEMICAL_CHARACTER_REFERENCE_START", e[e.HEXADEMICAL_CHARACTER_REFERENCE = 76] = "HEXADEMICAL_CHARACTER_REFERENCE", e[e.DECIMAL_CHARACTER_REFERENCE = 77] = "DECIMAL_CHARACTER_REFERENCE", e[e.NUMERIC_CHARACTER_REFERENCE_END = 78] = "NUMERIC_CHARACTER_REFERENCE_END";
})(x || (x = {}));
kt.TokenizerMode = {
  DATA: x.DATA,
  RCDATA: x.RCDATA,
  RAWTEXT: x.RAWTEXT,
  SCRIPT_DATA: x.SCRIPT_DATA,
  PLAINTEXT: x.PLAINTEXT,
  CDATA_SECTION: x.CDATA_SECTION
};
function $0(e) {
  return e >= _.CODE_POINTS.DIGIT_0 && e <= _.CODE_POINTS.DIGIT_9;
}
function U0(e) {
  return e >= _.CODE_POINTS.LATIN_CAPITAL_A && e <= _.CODE_POINTS.LATIN_CAPITAL_Z;
}
function Hp(e) {
  return e >= _.CODE_POINTS.LATIN_SMALL_A && e <= _.CODE_POINTS.LATIN_SMALL_Z;
}
function dt(e) {
  return Hp(e) || U0(e);
}
function yi(e) {
  return dt(e) || $0(e);
}
function Ol(e) {
  return e >= _.CODE_POINTS.LATIN_CAPITAL_A && e <= _.CODE_POINTS.LATIN_CAPITAL_F;
}
function Ll(e) {
  return e >= _.CODE_POINTS.LATIN_SMALL_A && e <= _.CODE_POINTS.LATIN_SMALL_F;
}
function Fp(e) {
  return $0(e) || Ol(e) || Ll(e);
}
function Mr(e) {
  return e + 32;
}
function Pl(e) {
  return e === _.CODE_POINTS.SPACE || e === _.CODE_POINTS.LINE_FEED || e === _.CODE_POINTS.TABULATION || e === _.CODE_POINTS.FORM_FEED;
}
function qp(e) {
  return e === _.CODE_POINTS.EQUALS_SIGN || yi(e);
}
function gs(e) {
  return Pl(e) || e === _.CODE_POINTS.SOLIDUS || e === _.CODE_POINTS.GREATER_THAN_SIGN;
}
let Gp = class {
  constructor(u, t) {
    this.options = u, this.handler = t, this.paused = !1, this.inLoop = !1, this.inForeignNode = !1, this.lastStartTagName = "", this.active = !1, this.state = x.DATA, this.returnState = x.DATA, this.charRefCode = -1, this.consumedAfterSnapshot = -1, this.currentCharacterToken = null, this.currentToken = null, this.currentAttr = { name: "", value: "" }, this.preprocessor = new Bp.Preprocessor(t), this.currentLocation = this.getCurrentLocation(-1);
  }
  //Errors
  _err(u) {
    var t, r;
    (r = (t = this.handler).onParseError) === null || r === void 0 || r.call(t, this.preprocessor.getError(u));
  }
  // NOTE: `offset` may never run across line boundaries.
  getCurrentLocation(u) {
    return this.options.sourceCodeLocationInfo ? {
      startLine: this.preprocessor.line,
      startCol: this.preprocessor.col - u,
      startOffset: this.preprocessor.offset - u,
      endLine: -1,
      endCol: -1,
      endOffset: -1
    } : null;
  }
  _runParsingLoop() {
    if (!this.inLoop) {
      for (this.inLoop = !0; this.active && !this.paused; ) {
        this.consumedAfterSnapshot = 0;
        const u = this._consume();
        this._ensureHibernation() || this._callState(u);
      }
      this.inLoop = !1;
    }
  }
  //API
  pause() {
    this.paused = !0;
  }
  resume(u) {
    if (!this.paused)
      throw new Error("Parser was already resumed");
    this.paused = !1, !this.inLoop && (this._runParsingLoop(), this.paused || u == null || u());
  }
  write(u, t, r) {
    this.active = !0, this.preprocessor.write(u, t), this._runParsingLoop(), this.paused || r == null || r();
  }
  insertHtmlAtCurrentPos(u) {
    this.active = !0, this.preprocessor.insertHtmlAtCurrentPos(u), this._runParsingLoop();
  }
  //Hibernation
  _ensureHibernation() {
    return this.preprocessor.endOfChunkHit ? (this._unconsume(this.consumedAfterSnapshot), this.active = !1, !0) : !1;
  }
  //Consumption
  _consume() {
    return this.consumedAfterSnapshot++, this.preprocessor.advance();
  }
  _unconsume(u) {
    this.consumedAfterSnapshot -= u, this.preprocessor.retreat(u);
  }
  _reconsumeInState(u, t) {
    this.state = u, this._callState(t);
  }
  _advanceBy(u) {
    this.consumedAfterSnapshot += u;
    for (let t = 0; t < u; t++)
      this.preprocessor.advance();
  }
  _consumeSequenceIfMatch(u, t) {
    return this.preprocessor.startsWith(u, t) ? (this._advanceBy(u.length - 1), !0) : !1;
  }
  //Token creation
  _createStartTagToken() {
    this.currentToken = {
      type: au.TokenType.START_TAG,
      tagName: "",
      tagID: Ln.TAG_ID.UNKNOWN,
      selfClosing: !1,
      ackSelfClosing: !1,
      attrs: [],
      location: this.getCurrentLocation(1)
    };
  }
  _createEndTagToken() {
    this.currentToken = {
      type: au.TokenType.END_TAG,
      tagName: "",
      tagID: Ln.TAG_ID.UNKNOWN,
      selfClosing: !1,
      ackSelfClosing: !1,
      attrs: [],
      location: this.getCurrentLocation(2)
    };
  }
  _createCommentToken(u) {
    this.currentToken = {
      type: au.TokenType.COMMENT,
      data: "",
      location: this.getCurrentLocation(u)
    };
  }
  _createDoctypeToken(u) {
    this.currentToken = {
      type: au.TokenType.DOCTYPE,
      name: u,
      forceQuirks: !1,
      publicId: null,
      systemId: null,
      location: this.currentLocation
    };
  }
  _createCharacterToken(u, t) {
    this.currentCharacterToken = {
      type: u,
      chars: t,
      location: this.currentLocation
    };
  }
  //Tag attributes
  _createAttr(u) {
    this.currentAttr = {
      name: u,
      value: ""
    }, this.currentLocation = this.getCurrentLocation(0);
  }
  _leaveAttrName() {
    var u, t;
    const r = this.currentToken;
    if ((0, au.getTokenAttr)(r, this.currentAttr.name) === null) {
      if (r.attrs.push(this.currentAttr), r.location && this.currentLocation) {
        const a = (u = (t = r.location).attrs) !== null && u !== void 0 ? u : t.attrs = /* @__PURE__ */ Object.create(null);
        a[this.currentAttr.name] = this.currentLocation, this._leaveAttrValue();
      }
    } else
      this._err(q.ERR.duplicateAttribute);
  }
  _leaveAttrValue() {
    this.currentLocation && (this.currentLocation.endLine = this.preprocessor.line, this.currentLocation.endCol = this.preprocessor.col, this.currentLocation.endOffset = this.preprocessor.offset);
  }
  //Token emission
  prepareToken(u) {
    this._emitCurrentCharacterToken(u.location), this.currentToken = null, u.location && (u.location.endLine = this.preprocessor.line, u.location.endCol = this.preprocessor.col + 1, u.location.endOffset = this.preprocessor.offset + 1), this.currentLocation = this.getCurrentLocation(-1);
  }
  emitCurrentTagToken() {
    const u = this.currentToken;
    this.prepareToken(u), u.tagID = (0, Ln.getTagID)(u.tagName), u.type === au.TokenType.START_TAG ? (this.lastStartTagName = u.tagName, this.handler.onStartTag(u)) : (u.attrs.length > 0 && this._err(q.ERR.endTagWithAttributes), u.selfClosing && this._err(q.ERR.endTagWithTrailingSolidus), this.handler.onEndTag(u)), this.preprocessor.dropParsedChunk();
  }
  emitCurrentComment(u) {
    this.prepareToken(u), this.handler.onComment(u), this.preprocessor.dropParsedChunk();
  }
  emitCurrentDoctype(u) {
    this.prepareToken(u), this.handler.onDoctype(u), this.preprocessor.dropParsedChunk();
  }
  _emitCurrentCharacterToken(u) {
    if (this.currentCharacterToken) {
      switch (u && this.currentCharacterToken.location && (this.currentCharacterToken.location.endLine = u.startLine, this.currentCharacterToken.location.endCol = u.startCol, this.currentCharacterToken.location.endOffset = u.startOffset), this.currentCharacterToken.type) {
        case au.TokenType.CHARACTER: {
          this.handler.onCharacter(this.currentCharacterToken);
          break;
        }
        case au.TokenType.NULL_CHARACTER: {
          this.handler.onNullCharacter(this.currentCharacterToken);
          break;
        }
        case au.TokenType.WHITESPACE_CHARACTER: {
          this.handler.onWhitespaceCharacter(this.currentCharacterToken);
          break;
        }
      }
      this.currentCharacterToken = null;
    }
  }
  _emitEOFToken() {
    const u = this.getCurrentLocation(0);
    u && (u.endLine = u.startLine, u.endCol = u.startCol, u.endOffset = u.startOffset), this._emitCurrentCharacterToken(u), this.handler.onEof({ type: au.TokenType.EOF, location: u }), this.active = !1;
  }
  //Characters emission
  //OPTIMIZATION: specification uses only one type of character tokens (one token per character).
  //This causes a huge memory overhead and a lot of unnecessary parser loops. parse5 uses 3 groups of characters.
  //If we have a sequence of characters that belong to the same group, the parser can process it
  //as a single solid character token.
  //So, there are 3 types of character tokens in parse5:
  //1)TokenType.NULL_CHARACTER - \u0000-character sequences (e.g. '\u0000\u0000\u0000')
  //2)TokenType.WHITESPACE_CHARACTER - any whitespace/new-line character sequences (e.g. '\n  \r\t   \f')
  //3)TokenType.CHARACTER - any character sequence which don't belong to groups 1 and 2 (e.g. 'abcdef1234@@#$%^')
  _appendCharToCurrentCharacterToken(u, t) {
    if (this.currentCharacterToken)
      if (this.currentCharacterToken.type !== u)
        this.currentLocation = this.getCurrentLocation(0), this._emitCurrentCharacterToken(this.currentLocation), this.preprocessor.dropParsedChunk();
      else {
        this.currentCharacterToken.chars += t;
        return;
      }
    this._createCharacterToken(u, t);
  }
  _emitCodePoint(u) {
    const t = Pl(u) ? au.TokenType.WHITESPACE_CHARACTER : u === _.CODE_POINTS.NULL ? au.TokenType.NULL_CHARACTER : au.TokenType.CHARACTER;
    this._appendCharToCurrentCharacterToken(t, String.fromCodePoint(u));
  }
  //NOTE: used when we emit characters explicitly.
  //This is always for non-whitespace and non-null characters, which allows us to avoid additional checks.
  _emitChars(u) {
    this._appendCharToCurrentCharacterToken(au.TokenType.CHARACTER, u);
  }
  // Character reference helpers
  _matchNamedCharacterReference(u) {
    let t = null, r = 0, a = !1;
    for (let n = 0, i = Uu.htmlDecodeTree[0]; n >= 0 && (n = (0, Uu.determineBranch)(Uu.htmlDecodeTree, i, n + 1, u), !(n < 0)); u = this._consume()) {
      r += 1, i = Uu.htmlDecodeTree[n];
      const s = i & Uu.BinTrieFlags.VALUE_LENGTH;
      if (s) {
        const o = (s >> 14) - 1;
        if (u !== _.CODE_POINTS.SEMICOLON && this._isCharacterReferenceInAttribute() && qp(this.preprocessor.peek(1)) ? (t = [_.CODE_POINTS.AMPERSAND], n += o) : (t = o === 0 ? [Uu.htmlDecodeTree[n] & ~Uu.BinTrieFlags.VALUE_LENGTH] : o === 1 ? [Uu.htmlDecodeTree[++n]] : [Uu.htmlDecodeTree[++n], Uu.htmlDecodeTree[++n]], r = 0, a = u !== _.CODE_POINTS.SEMICOLON), o === 0) {
          this._consume();
          break;
        }
      }
    }
    return this._unconsume(r), a && !this.preprocessor.endOfChunkHit && this._err(q.ERR.missingSemicolonAfterCharacterReference), this._unconsume(1), t;
  }
  _isCharacterReferenceInAttribute() {
    return this.returnState === x.ATTRIBUTE_VALUE_DOUBLE_QUOTED || this.returnState === x.ATTRIBUTE_VALUE_SINGLE_QUOTED || this.returnState === x.ATTRIBUTE_VALUE_UNQUOTED;
  }
  _flushCodePointConsumedAsCharacterReference(u) {
    this._isCharacterReferenceInAttribute() ? this.currentAttr.value += String.fromCodePoint(u) : this._emitCodePoint(u);
  }
  // Calling states this way turns out to be much faster than any other approach.
  _callState(u) {
    switch (this.state) {
      case x.DATA: {
        this._stateData(u);
        break;
      }
      case x.RCDATA: {
        this._stateRcdata(u);
        break;
      }
      case x.RAWTEXT: {
        this._stateRawtext(u);
        break;
      }
      case x.SCRIPT_DATA: {
        this._stateScriptData(u);
        break;
      }
      case x.PLAINTEXT: {
        this._statePlaintext(u);
        break;
      }
      case x.TAG_OPEN: {
        this._stateTagOpen(u);
        break;
      }
      case x.END_TAG_OPEN: {
        this._stateEndTagOpen(u);
        break;
      }
      case x.TAG_NAME: {
        this._stateTagName(u);
        break;
      }
      case x.RCDATA_LESS_THAN_SIGN: {
        this._stateRcdataLessThanSign(u);
        break;
      }
      case x.RCDATA_END_TAG_OPEN: {
        this._stateRcdataEndTagOpen(u);
        break;
      }
      case x.RCDATA_END_TAG_NAME: {
        this._stateRcdataEndTagName(u);
        break;
      }
      case x.RAWTEXT_LESS_THAN_SIGN: {
        this._stateRawtextLessThanSign(u);
        break;
      }
      case x.RAWTEXT_END_TAG_OPEN: {
        this._stateRawtextEndTagOpen(u);
        break;
      }
      case x.RAWTEXT_END_TAG_NAME: {
        this._stateRawtextEndTagName(u);
        break;
      }
      case x.SCRIPT_DATA_LESS_THAN_SIGN: {
        this._stateScriptDataLessThanSign(u);
        break;
      }
      case x.SCRIPT_DATA_END_TAG_OPEN: {
        this._stateScriptDataEndTagOpen(u);
        break;
      }
      case x.SCRIPT_DATA_END_TAG_NAME: {
        this._stateScriptDataEndTagName(u);
        break;
      }
      case x.SCRIPT_DATA_ESCAPE_START: {
        this._stateScriptDataEscapeStart(u);
        break;
      }
      case x.SCRIPT_DATA_ESCAPE_START_DASH: {
        this._stateScriptDataEscapeStartDash(u);
        break;
      }
      case x.SCRIPT_DATA_ESCAPED: {
        this._stateScriptDataEscaped(u);
        break;
      }
      case x.SCRIPT_DATA_ESCAPED_DASH: {
        this._stateScriptDataEscapedDash(u);
        break;
      }
      case x.SCRIPT_DATA_ESCAPED_DASH_DASH: {
        this._stateScriptDataEscapedDashDash(u);
        break;
      }
      case x.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN: {
        this._stateScriptDataEscapedLessThanSign(u);
        break;
      }
      case x.SCRIPT_DATA_ESCAPED_END_TAG_OPEN: {
        this._stateScriptDataEscapedEndTagOpen(u);
        break;
      }
      case x.SCRIPT_DATA_ESCAPED_END_TAG_NAME: {
        this._stateScriptDataEscapedEndTagName(u);
        break;
      }
      case x.SCRIPT_DATA_DOUBLE_ESCAPE_START: {
        this._stateScriptDataDoubleEscapeStart(u);
        break;
      }
      case x.SCRIPT_DATA_DOUBLE_ESCAPED: {
        this._stateScriptDataDoubleEscaped(u);
        break;
      }
      case x.SCRIPT_DATA_DOUBLE_ESCAPED_DASH: {
        this._stateScriptDataDoubleEscapedDash(u);
        break;
      }
      case x.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH: {
        this._stateScriptDataDoubleEscapedDashDash(u);
        break;
      }
      case x.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN: {
        this._stateScriptDataDoubleEscapedLessThanSign(u);
        break;
      }
      case x.SCRIPT_DATA_DOUBLE_ESCAPE_END: {
        this._stateScriptDataDoubleEscapeEnd(u);
        break;
      }
      case x.BEFORE_ATTRIBUTE_NAME: {
        this._stateBeforeAttributeName(u);
        break;
      }
      case x.ATTRIBUTE_NAME: {
        this._stateAttributeName(u);
        break;
      }
      case x.AFTER_ATTRIBUTE_NAME: {
        this._stateAfterAttributeName(u);
        break;
      }
      case x.BEFORE_ATTRIBUTE_VALUE: {
        this._stateBeforeAttributeValue(u);
        break;
      }
      case x.ATTRIBUTE_VALUE_DOUBLE_QUOTED: {
        this._stateAttributeValueDoubleQuoted(u);
        break;
      }
      case x.ATTRIBUTE_VALUE_SINGLE_QUOTED: {
        this._stateAttributeValueSingleQuoted(u);
        break;
      }
      case x.ATTRIBUTE_VALUE_UNQUOTED: {
        this._stateAttributeValueUnquoted(u);
        break;
      }
      case x.AFTER_ATTRIBUTE_VALUE_QUOTED: {
        this._stateAfterAttributeValueQuoted(u);
        break;
      }
      case x.SELF_CLOSING_START_TAG: {
        this._stateSelfClosingStartTag(u);
        break;
      }
      case x.BOGUS_COMMENT: {
        this._stateBogusComment(u);
        break;
      }
      case x.MARKUP_DECLARATION_OPEN: {
        this._stateMarkupDeclarationOpen(u);
        break;
      }
      case x.COMMENT_START: {
        this._stateCommentStart(u);
        break;
      }
      case x.COMMENT_START_DASH: {
        this._stateCommentStartDash(u);
        break;
      }
      case x.COMMENT: {
        this._stateComment(u);
        break;
      }
      case x.COMMENT_LESS_THAN_SIGN: {
        this._stateCommentLessThanSign(u);
        break;
      }
      case x.COMMENT_LESS_THAN_SIGN_BANG: {
        this._stateCommentLessThanSignBang(u);
        break;
      }
      case x.COMMENT_LESS_THAN_SIGN_BANG_DASH: {
        this._stateCommentLessThanSignBangDash(u);
        break;
      }
      case x.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH: {
        this._stateCommentLessThanSignBangDashDash(u);
        break;
      }
      case x.COMMENT_END_DASH: {
        this._stateCommentEndDash(u);
        break;
      }
      case x.COMMENT_END: {
        this._stateCommentEnd(u);
        break;
      }
      case x.COMMENT_END_BANG: {
        this._stateCommentEndBang(u);
        break;
      }
      case x.DOCTYPE: {
        this._stateDoctype(u);
        break;
      }
      case x.BEFORE_DOCTYPE_NAME: {
        this._stateBeforeDoctypeName(u);
        break;
      }
      case x.DOCTYPE_NAME: {
        this._stateDoctypeName(u);
        break;
      }
      case x.AFTER_DOCTYPE_NAME: {
        this._stateAfterDoctypeName(u);
        break;
      }
      case x.AFTER_DOCTYPE_PUBLIC_KEYWORD: {
        this._stateAfterDoctypePublicKeyword(u);
        break;
      }
      case x.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER: {
        this._stateBeforeDoctypePublicIdentifier(u);
        break;
      }
      case x.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED: {
        this._stateDoctypePublicIdentifierDoubleQuoted(u);
        break;
      }
      case x.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED: {
        this._stateDoctypePublicIdentifierSingleQuoted(u);
        break;
      }
      case x.AFTER_DOCTYPE_PUBLIC_IDENTIFIER: {
        this._stateAfterDoctypePublicIdentifier(u);
        break;
      }
      case x.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS: {
        this._stateBetweenDoctypePublicAndSystemIdentifiers(u);
        break;
      }
      case x.AFTER_DOCTYPE_SYSTEM_KEYWORD: {
        this._stateAfterDoctypeSystemKeyword(u);
        break;
      }
      case x.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER: {
        this._stateBeforeDoctypeSystemIdentifier(u);
        break;
      }
      case x.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED: {
        this._stateDoctypeSystemIdentifierDoubleQuoted(u);
        break;
      }
      case x.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED: {
        this._stateDoctypeSystemIdentifierSingleQuoted(u);
        break;
      }
      case x.AFTER_DOCTYPE_SYSTEM_IDENTIFIER: {
        this._stateAfterDoctypeSystemIdentifier(u);
        break;
      }
      case x.BOGUS_DOCTYPE: {
        this._stateBogusDoctype(u);
        break;
      }
      case x.CDATA_SECTION: {
        this._stateCdataSection(u);
        break;
      }
      case x.CDATA_SECTION_BRACKET: {
        this._stateCdataSectionBracket(u);
        break;
      }
      case x.CDATA_SECTION_END: {
        this._stateCdataSectionEnd(u);
        break;
      }
      case x.CHARACTER_REFERENCE: {
        this._stateCharacterReference(u);
        break;
      }
      case x.NAMED_CHARACTER_REFERENCE: {
        this._stateNamedCharacterReference(u);
        break;
      }
      case x.AMBIGUOUS_AMPERSAND: {
        this._stateAmbiguousAmpersand(u);
        break;
      }
      case x.NUMERIC_CHARACTER_REFERENCE: {
        this._stateNumericCharacterReference(u);
        break;
      }
      case x.HEXADEMICAL_CHARACTER_REFERENCE_START: {
        this._stateHexademicalCharacterReferenceStart(u);
        break;
      }
      case x.HEXADEMICAL_CHARACTER_REFERENCE: {
        this._stateHexademicalCharacterReference(u);
        break;
      }
      case x.DECIMAL_CHARACTER_REFERENCE: {
        this._stateDecimalCharacterReference(u);
        break;
      }
      case x.NUMERIC_CHARACTER_REFERENCE_END: {
        this._stateNumericCharacterReferenceEnd(u);
        break;
      }
      default:
        throw new Error("Unknown state");
    }
  }
  // State machine
  // Data state
  //------------------------------------------------------------------
  _stateData(u) {
    switch (u) {
      case _.CODE_POINTS.LESS_THAN_SIGN: {
        this.state = x.TAG_OPEN;
        break;
      }
      case _.CODE_POINTS.AMPERSAND: {
        this.returnState = x.DATA, this.state = x.CHARACTER_REFERENCE;
        break;
      }
      case _.CODE_POINTS.NULL: {
        this._err(q.ERR.unexpectedNullCharacter), this._emitCodePoint(u);
        break;
      }
      case _.CODE_POINTS.EOF: {
        this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(u);
    }
  }
  //  RCDATA state
  //------------------------------------------------------------------
  _stateRcdata(u) {
    switch (u) {
      case _.CODE_POINTS.AMPERSAND: {
        this.returnState = x.RCDATA, this.state = x.CHARACTER_REFERENCE;
        break;
      }
      case _.CODE_POINTS.LESS_THAN_SIGN: {
        this.state = x.RCDATA_LESS_THAN_SIGN;
        break;
      }
      case _.CODE_POINTS.NULL: {
        this._err(q.ERR.unexpectedNullCharacter), this._emitChars(_.REPLACEMENT_CHARACTER);
        break;
      }
      case _.CODE_POINTS.EOF: {
        this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(u);
    }
  }
  // RAWTEXT state
  //------------------------------------------------------------------
  _stateRawtext(u) {
    switch (u) {
      case _.CODE_POINTS.LESS_THAN_SIGN: {
        this.state = x.RAWTEXT_LESS_THAN_SIGN;
        break;
      }
      case _.CODE_POINTS.NULL: {
        this._err(q.ERR.unexpectedNullCharacter), this._emitChars(_.REPLACEMENT_CHARACTER);
        break;
      }
      case _.CODE_POINTS.EOF: {
        this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(u);
    }
  }
  // Script data state
  //------------------------------------------------------------------
  _stateScriptData(u) {
    switch (u) {
      case _.CODE_POINTS.LESS_THAN_SIGN: {
        this.state = x.SCRIPT_DATA_LESS_THAN_SIGN;
        break;
      }
      case _.CODE_POINTS.NULL: {
        this._err(q.ERR.unexpectedNullCharacter), this._emitChars(_.REPLACEMENT_CHARACTER);
        break;
      }
      case _.CODE_POINTS.EOF: {
        this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(u);
    }
  }
  // PLAINTEXT state
  //------------------------------------------------------------------
  _statePlaintext(u) {
    switch (u) {
      case _.CODE_POINTS.NULL: {
        this._err(q.ERR.unexpectedNullCharacter), this._emitChars(_.REPLACEMENT_CHARACTER);
        break;
      }
      case _.CODE_POINTS.EOF: {
        this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(u);
    }
  }
  // Tag open state
  //------------------------------------------------------------------
  _stateTagOpen(u) {
    if (dt(u))
      this._createStartTagToken(), this.state = x.TAG_NAME, this._stateTagName(u);
    else
      switch (u) {
        case _.CODE_POINTS.EXCLAMATION_MARK: {
          this.state = x.MARKUP_DECLARATION_OPEN;
          break;
        }
        case _.CODE_POINTS.SOLIDUS: {
          this.state = x.END_TAG_OPEN;
          break;
        }
        case _.CODE_POINTS.QUESTION_MARK: {
          this._err(q.ERR.unexpectedQuestionMarkInsteadOfTagName), this._createCommentToken(1), this.state = x.BOGUS_COMMENT, this._stateBogusComment(u);
          break;
        }
        case _.CODE_POINTS.EOF: {
          this._err(q.ERR.eofBeforeTagName), this._emitChars("<"), this._emitEOFToken();
          break;
        }
        default:
          this._err(q.ERR.invalidFirstCharacterOfTagName), this._emitChars("<"), this.state = x.DATA, this._stateData(u);
      }
  }
  // End tag open state
  //------------------------------------------------------------------
  _stateEndTagOpen(u) {
    if (dt(u))
      this._createEndTagToken(), this.state = x.TAG_NAME, this._stateTagName(u);
    else
      switch (u) {
        case _.CODE_POINTS.GREATER_THAN_SIGN: {
          this._err(q.ERR.missingEndTagName), this.state = x.DATA;
          break;
        }
        case _.CODE_POINTS.EOF: {
          this._err(q.ERR.eofBeforeTagName), this._emitChars("</"), this._emitEOFToken();
          break;
        }
        default:
          this._err(q.ERR.invalidFirstCharacterOfTagName), this._createCommentToken(2), this.state = x.BOGUS_COMMENT, this._stateBogusComment(u);
      }
  }
  // Tag name state
  //------------------------------------------------------------------
  _stateTagName(u) {
    const t = this.currentToken;
    switch (u) {
      case _.CODE_POINTS.SPACE:
      case _.CODE_POINTS.LINE_FEED:
      case _.CODE_POINTS.TABULATION:
      case _.CODE_POINTS.FORM_FEED: {
        this.state = x.BEFORE_ATTRIBUTE_NAME;
        break;
      }
      case _.CODE_POINTS.SOLIDUS: {
        this.state = x.SELF_CLOSING_START_TAG;
        break;
      }
      case _.CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = x.DATA, this.emitCurrentTagToken();
        break;
      }
      case _.CODE_POINTS.NULL: {
        this._err(q.ERR.unexpectedNullCharacter), t.tagName += _.REPLACEMENT_CHARACTER;
        break;
      }
      case _.CODE_POINTS.EOF: {
        this._err(q.ERR.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        t.tagName += String.fromCodePoint(U0(u) ? Mr(u) : u);
    }
  }
  // RCDATA less-than sign state
  //------------------------------------------------------------------
  _stateRcdataLessThanSign(u) {
    u === _.CODE_POINTS.SOLIDUS ? this.state = x.RCDATA_END_TAG_OPEN : (this._emitChars("<"), this.state = x.RCDATA, this._stateRcdata(u));
  }
  // RCDATA end tag open state
  //------------------------------------------------------------------
  _stateRcdataEndTagOpen(u) {
    dt(u) ? (this.state = x.RCDATA_END_TAG_NAME, this._stateRcdataEndTagName(u)) : (this._emitChars("</"), this.state = x.RCDATA, this._stateRcdata(u));
  }
  handleSpecialEndTag(u) {
    if (!this.preprocessor.startsWith(this.lastStartTagName, !1))
      return !this._ensureHibernation();
    this._createEndTagToken();
    const t = this.currentToken;
    switch (t.tagName = this.lastStartTagName, this.preprocessor.peek(this.lastStartTagName.length)) {
      case _.CODE_POINTS.SPACE:
      case _.CODE_POINTS.LINE_FEED:
      case _.CODE_POINTS.TABULATION:
      case _.CODE_POINTS.FORM_FEED:
        return this._advanceBy(this.lastStartTagName.length), this.state = x.BEFORE_ATTRIBUTE_NAME, !1;
      case _.CODE_POINTS.SOLIDUS:
        return this._advanceBy(this.lastStartTagName.length), this.state = x.SELF_CLOSING_START_TAG, !1;
      case _.CODE_POINTS.GREATER_THAN_SIGN:
        return this._advanceBy(this.lastStartTagName.length), this.emitCurrentTagToken(), this.state = x.DATA, !1;
      default:
        return !this._ensureHibernation();
    }
  }
  // RCDATA end tag name state
  //------------------------------------------------------------------
  _stateRcdataEndTagName(u) {
    this.handleSpecialEndTag(u) && (this._emitChars("</"), this.state = x.RCDATA, this._stateRcdata(u));
  }
  // RAWTEXT less-than sign state
  //------------------------------------------------------------------
  _stateRawtextLessThanSign(u) {
    u === _.CODE_POINTS.SOLIDUS ? this.state = x.RAWTEXT_END_TAG_OPEN : (this._emitChars("<"), this.state = x.RAWTEXT, this._stateRawtext(u));
  }
  // RAWTEXT end tag open state
  //------------------------------------------------------------------
  _stateRawtextEndTagOpen(u) {
    dt(u) ? (this.state = x.RAWTEXT_END_TAG_NAME, this._stateRawtextEndTagName(u)) : (this._emitChars("</"), this.state = x.RAWTEXT, this._stateRawtext(u));
  }
  // RAWTEXT end tag name state
  //------------------------------------------------------------------
  _stateRawtextEndTagName(u) {
    this.handleSpecialEndTag(u) && (this._emitChars("</"), this.state = x.RAWTEXT, this._stateRawtext(u));
  }
  // Script data less-than sign state
  //------------------------------------------------------------------
  _stateScriptDataLessThanSign(u) {
    switch (u) {
      case _.CODE_POINTS.SOLIDUS: {
        this.state = x.SCRIPT_DATA_END_TAG_OPEN;
        break;
      }
      case _.CODE_POINTS.EXCLAMATION_MARK: {
        this.state = x.SCRIPT_DATA_ESCAPE_START, this._emitChars("<!");
        break;
      }
      default:
        this._emitChars("<"), this.state = x.SCRIPT_DATA, this._stateScriptData(u);
    }
  }
  // Script data end tag open state
  //------------------------------------------------------------------
  _stateScriptDataEndTagOpen(u) {
    dt(u) ? (this.state = x.SCRIPT_DATA_END_TAG_NAME, this._stateScriptDataEndTagName(u)) : (this._emitChars("</"), this.state = x.SCRIPT_DATA, this._stateScriptData(u));
  }
  // Script data end tag name state
  //------------------------------------------------------------------
  _stateScriptDataEndTagName(u) {
    this.handleSpecialEndTag(u) && (this._emitChars("</"), this.state = x.SCRIPT_DATA, this._stateScriptData(u));
  }
  // Script data escape start state
  //------------------------------------------------------------------
  _stateScriptDataEscapeStart(u) {
    u === _.CODE_POINTS.HYPHEN_MINUS ? (this.state = x.SCRIPT_DATA_ESCAPE_START_DASH, this._emitChars("-")) : (this.state = x.SCRIPT_DATA, this._stateScriptData(u));
  }
  // Script data escape start dash state
  //------------------------------------------------------------------
  _stateScriptDataEscapeStartDash(u) {
    u === _.CODE_POINTS.HYPHEN_MINUS ? (this.state = x.SCRIPT_DATA_ESCAPED_DASH_DASH, this._emitChars("-")) : (this.state = x.SCRIPT_DATA, this._stateScriptData(u));
  }
  // Script data escaped state
  //------------------------------------------------------------------
  _stateScriptDataEscaped(u) {
    switch (u) {
      case _.CODE_POINTS.HYPHEN_MINUS: {
        this.state = x.SCRIPT_DATA_ESCAPED_DASH, this._emitChars("-");
        break;
      }
      case _.CODE_POINTS.LESS_THAN_SIGN: {
        this.state = x.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
        break;
      }
      case _.CODE_POINTS.NULL: {
        this._err(q.ERR.unexpectedNullCharacter), this._emitChars(_.REPLACEMENT_CHARACTER);
        break;
      }
      case _.CODE_POINTS.EOF: {
        this._err(q.ERR.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(u);
    }
  }
  // Script data escaped dash state
  //------------------------------------------------------------------
  _stateScriptDataEscapedDash(u) {
    switch (u) {
      case _.CODE_POINTS.HYPHEN_MINUS: {
        this.state = x.SCRIPT_DATA_ESCAPED_DASH_DASH, this._emitChars("-");
        break;
      }
      case _.CODE_POINTS.LESS_THAN_SIGN: {
        this.state = x.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
        break;
      }
      case _.CODE_POINTS.NULL: {
        this._err(q.ERR.unexpectedNullCharacter), this.state = x.SCRIPT_DATA_ESCAPED, this._emitChars(_.REPLACEMENT_CHARACTER);
        break;
      }
      case _.CODE_POINTS.EOF: {
        this._err(q.ERR.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this.state = x.SCRIPT_DATA_ESCAPED, this._emitCodePoint(u);
    }
  }
  // Script data escaped dash dash state
  //------------------------------------------------------------------
  _stateScriptDataEscapedDashDash(u) {
    switch (u) {
      case _.CODE_POINTS.HYPHEN_MINUS: {
        this._emitChars("-");
        break;
      }
      case _.CODE_POINTS.LESS_THAN_SIGN: {
        this.state = x.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
        break;
      }
      case _.CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = x.SCRIPT_DATA, this._emitChars(">");
        break;
      }
      case _.CODE_POINTS.NULL: {
        this._err(q.ERR.unexpectedNullCharacter), this.state = x.SCRIPT_DATA_ESCAPED, this._emitChars(_.REPLACEMENT_CHARACTER);
        break;
      }
      case _.CODE_POINTS.EOF: {
        this._err(q.ERR.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this.state = x.SCRIPT_DATA_ESCAPED, this._emitCodePoint(u);
    }
  }
  // Script data escaped less-than sign state
  //------------------------------------------------------------------
  _stateScriptDataEscapedLessThanSign(u) {
    u === _.CODE_POINTS.SOLIDUS ? this.state = x.SCRIPT_DATA_ESCAPED_END_TAG_OPEN : dt(u) ? (this._emitChars("<"), this.state = x.SCRIPT_DATA_DOUBLE_ESCAPE_START, this._stateScriptDataDoubleEscapeStart(u)) : (this._emitChars("<"), this.state = x.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(u));
  }
  // Script data escaped end tag open state
  //------------------------------------------------------------------
  _stateScriptDataEscapedEndTagOpen(u) {
    dt(u) ? (this.state = x.SCRIPT_DATA_ESCAPED_END_TAG_NAME, this._stateScriptDataEscapedEndTagName(u)) : (this._emitChars("</"), this.state = x.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(u));
  }
  // Script data escaped end tag name state
  //------------------------------------------------------------------
  _stateScriptDataEscapedEndTagName(u) {
    this.handleSpecialEndTag(u) && (this._emitChars("</"), this.state = x.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(u));
  }
  // Script data double escape start state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapeStart(u) {
    if (this.preprocessor.startsWith(_.SEQUENCES.SCRIPT, !1) && gs(this.preprocessor.peek(_.SEQUENCES.SCRIPT.length))) {
      this._emitCodePoint(u);
      for (let t = 0; t < _.SEQUENCES.SCRIPT.length; t++)
        this._emitCodePoint(this._consume());
      this.state = x.SCRIPT_DATA_DOUBLE_ESCAPED;
    } else
      this._ensureHibernation() || (this.state = x.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(u));
  }
  // Script data double escaped state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscaped(u) {
    switch (u) {
      case _.CODE_POINTS.HYPHEN_MINUS: {
        this.state = x.SCRIPT_DATA_DOUBLE_ESCAPED_DASH, this._emitChars("-");
        break;
      }
      case _.CODE_POINTS.LESS_THAN_SIGN: {
        this.state = x.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN, this._emitChars("<");
        break;
      }
      case _.CODE_POINTS.NULL: {
        this._err(q.ERR.unexpectedNullCharacter), this._emitChars(_.REPLACEMENT_CHARACTER);
        break;
      }
      case _.CODE_POINTS.EOF: {
        this._err(q.ERR.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(u);
    }
  }
  // Script data double escaped dash state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapedDash(u) {
    switch (u) {
      case _.CODE_POINTS.HYPHEN_MINUS: {
        this.state = x.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH, this._emitChars("-");
        break;
      }
      case _.CODE_POINTS.LESS_THAN_SIGN: {
        this.state = x.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN, this._emitChars("<");
        break;
      }
      case _.CODE_POINTS.NULL: {
        this._err(q.ERR.unexpectedNullCharacter), this.state = x.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitChars(_.REPLACEMENT_CHARACTER);
        break;
      }
      case _.CODE_POINTS.EOF: {
        this._err(q.ERR.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this.state = x.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitCodePoint(u);
    }
  }
  // Script data double escaped dash dash state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapedDashDash(u) {
    switch (u) {
      case _.CODE_POINTS.HYPHEN_MINUS: {
        this._emitChars("-");
        break;
      }
      case _.CODE_POINTS.LESS_THAN_SIGN: {
        this.state = x.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN, this._emitChars("<");
        break;
      }
      case _.CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = x.SCRIPT_DATA, this._emitChars(">");
        break;
      }
      case _.CODE_POINTS.NULL: {
        this._err(q.ERR.unexpectedNullCharacter), this.state = x.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitChars(_.REPLACEMENT_CHARACTER);
        break;
      }
      case _.CODE_POINTS.EOF: {
        this._err(q.ERR.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this.state = x.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitCodePoint(u);
    }
  }
  // Script data double escaped less-than sign state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapedLessThanSign(u) {
    u === _.CODE_POINTS.SOLIDUS ? (this.state = x.SCRIPT_DATA_DOUBLE_ESCAPE_END, this._emitChars("/")) : (this.state = x.SCRIPT_DATA_DOUBLE_ESCAPED, this._stateScriptDataDoubleEscaped(u));
  }
  // Script data double escape end state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapeEnd(u) {
    if (this.preprocessor.startsWith(_.SEQUENCES.SCRIPT, !1) && gs(this.preprocessor.peek(_.SEQUENCES.SCRIPT.length))) {
      this._emitCodePoint(u);
      for (let t = 0; t < _.SEQUENCES.SCRIPT.length; t++)
        this._emitCodePoint(this._consume());
      this.state = x.SCRIPT_DATA_ESCAPED;
    } else
      this._ensureHibernation() || (this.state = x.SCRIPT_DATA_DOUBLE_ESCAPED, this._stateScriptDataDoubleEscaped(u));
  }
  // Before attribute name state
  //------------------------------------------------------------------
  _stateBeforeAttributeName(u) {
    switch (u) {
      case _.CODE_POINTS.SPACE:
      case _.CODE_POINTS.LINE_FEED:
      case _.CODE_POINTS.TABULATION:
      case _.CODE_POINTS.FORM_FEED:
        break;
      case _.CODE_POINTS.SOLIDUS:
      case _.CODE_POINTS.GREATER_THAN_SIGN:
      case _.CODE_POINTS.EOF: {
        this.state = x.AFTER_ATTRIBUTE_NAME, this._stateAfterAttributeName(u);
        break;
      }
      case _.CODE_POINTS.EQUALS_SIGN: {
        this._err(q.ERR.unexpectedEqualsSignBeforeAttributeName), this._createAttr("="), this.state = x.ATTRIBUTE_NAME;
        break;
      }
      default:
        this._createAttr(""), this.state = x.ATTRIBUTE_NAME, this._stateAttributeName(u);
    }
  }
  // Attribute name state
  //------------------------------------------------------------------
  _stateAttributeName(u) {
    switch (u) {
      case _.CODE_POINTS.SPACE:
      case _.CODE_POINTS.LINE_FEED:
      case _.CODE_POINTS.TABULATION:
      case _.CODE_POINTS.FORM_FEED:
      case _.CODE_POINTS.SOLIDUS:
      case _.CODE_POINTS.GREATER_THAN_SIGN:
      case _.CODE_POINTS.EOF: {
        this._leaveAttrName(), this.state = x.AFTER_ATTRIBUTE_NAME, this._stateAfterAttributeName(u);
        break;
      }
      case _.CODE_POINTS.EQUALS_SIGN: {
        this._leaveAttrName(), this.state = x.BEFORE_ATTRIBUTE_VALUE;
        break;
      }
      case _.CODE_POINTS.QUOTATION_MARK:
      case _.CODE_POINTS.APOSTROPHE:
      case _.CODE_POINTS.LESS_THAN_SIGN: {
        this._err(q.ERR.unexpectedCharacterInAttributeName), this.currentAttr.name += String.fromCodePoint(u);
        break;
      }
      case _.CODE_POINTS.NULL: {
        this._err(q.ERR.unexpectedNullCharacter), this.currentAttr.name += _.REPLACEMENT_CHARACTER;
        break;
      }
      default:
        this.currentAttr.name += String.fromCodePoint(U0(u) ? Mr(u) : u);
    }
  }
  // After attribute name state
  //------------------------------------------------------------------
  _stateAfterAttributeName(u) {
    switch (u) {
      case _.CODE_POINTS.SPACE:
      case _.CODE_POINTS.LINE_FEED:
      case _.CODE_POINTS.TABULATION:
      case _.CODE_POINTS.FORM_FEED:
        break;
      case _.CODE_POINTS.SOLIDUS: {
        this.state = x.SELF_CLOSING_START_TAG;
        break;
      }
      case _.CODE_POINTS.EQUALS_SIGN: {
        this.state = x.BEFORE_ATTRIBUTE_VALUE;
        break;
      }
      case _.CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = x.DATA, this.emitCurrentTagToken();
        break;
      }
      case _.CODE_POINTS.EOF: {
        this._err(q.ERR.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this._createAttr(""), this.state = x.ATTRIBUTE_NAME, this._stateAttributeName(u);
    }
  }
  // Before attribute value state
  //------------------------------------------------------------------
  _stateBeforeAttributeValue(u) {
    switch (u) {
      case _.CODE_POINTS.SPACE:
      case _.CODE_POINTS.LINE_FEED:
      case _.CODE_POINTS.TABULATION:
      case _.CODE_POINTS.FORM_FEED:
        break;
      case _.CODE_POINTS.QUOTATION_MARK: {
        this.state = x.ATTRIBUTE_VALUE_DOUBLE_QUOTED;
        break;
      }
      case _.CODE_POINTS.APOSTROPHE: {
        this.state = x.ATTRIBUTE_VALUE_SINGLE_QUOTED;
        break;
      }
      case _.CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(q.ERR.missingAttributeValue), this.state = x.DATA, this.emitCurrentTagToken();
        break;
      }
      default:
        this.state = x.ATTRIBUTE_VALUE_UNQUOTED, this._stateAttributeValueUnquoted(u);
    }
  }
  // Attribute value (double-quoted) state
  //------------------------------------------------------------------
  _stateAttributeValueDoubleQuoted(u) {
    switch (u) {
      case _.CODE_POINTS.QUOTATION_MARK: {
        this.state = x.AFTER_ATTRIBUTE_VALUE_QUOTED;
        break;
      }
      case _.CODE_POINTS.AMPERSAND: {
        this.returnState = x.ATTRIBUTE_VALUE_DOUBLE_QUOTED, this.state = x.CHARACTER_REFERENCE;
        break;
      }
      case _.CODE_POINTS.NULL: {
        this._err(q.ERR.unexpectedNullCharacter), this.currentAttr.value += _.REPLACEMENT_CHARACTER;
        break;
      }
      case _.CODE_POINTS.EOF: {
        this._err(q.ERR.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this.currentAttr.value += String.fromCodePoint(u);
    }
  }
  // Attribute value (single-quoted) state
  //------------------------------------------------------------------
  _stateAttributeValueSingleQuoted(u) {
    switch (u) {
      case _.CODE_POINTS.APOSTROPHE: {
        this.state = x.AFTER_ATTRIBUTE_VALUE_QUOTED;
        break;
      }
      case _.CODE_POINTS.AMPERSAND: {
        this.returnState = x.ATTRIBUTE_VALUE_SINGLE_QUOTED, this.state = x.CHARACTER_REFERENCE;
        break;
      }
      case _.CODE_POINTS.NULL: {
        this._err(q.ERR.unexpectedNullCharacter), this.currentAttr.value += _.REPLACEMENT_CHARACTER;
        break;
      }
      case _.CODE_POINTS.EOF: {
        this._err(q.ERR.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this.currentAttr.value += String.fromCodePoint(u);
    }
  }
  // Attribute value (unquoted) state
  //------------------------------------------------------------------
  _stateAttributeValueUnquoted(u) {
    switch (u) {
      case _.CODE_POINTS.SPACE:
      case _.CODE_POINTS.LINE_FEED:
      case _.CODE_POINTS.TABULATION:
      case _.CODE_POINTS.FORM_FEED: {
        this._leaveAttrValue(), this.state = x.BEFORE_ATTRIBUTE_NAME;
        break;
      }
      case _.CODE_POINTS.AMPERSAND: {
        this.returnState = x.ATTRIBUTE_VALUE_UNQUOTED, this.state = x.CHARACTER_REFERENCE;
        break;
      }
      case _.CODE_POINTS.GREATER_THAN_SIGN: {
        this._leaveAttrValue(), this.state = x.DATA, this.emitCurrentTagToken();
        break;
      }
      case _.CODE_POINTS.NULL: {
        this._err(q.ERR.unexpectedNullCharacter), this.currentAttr.value += _.REPLACEMENT_CHARACTER;
        break;
      }
      case _.CODE_POINTS.QUOTATION_MARK:
      case _.CODE_POINTS.APOSTROPHE:
      case _.CODE_POINTS.LESS_THAN_SIGN:
      case _.CODE_POINTS.EQUALS_SIGN:
      case _.CODE_POINTS.GRAVE_ACCENT: {
        this._err(q.ERR.unexpectedCharacterInUnquotedAttributeValue), this.currentAttr.value += String.fromCodePoint(u);
        break;
      }
      case _.CODE_POINTS.EOF: {
        this._err(q.ERR.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this.currentAttr.value += String.fromCodePoint(u);
    }
  }
  // After attribute value (quoted) state
  //------------------------------------------------------------------
  _stateAfterAttributeValueQuoted(u) {
    switch (u) {
      case _.CODE_POINTS.SPACE:
      case _.CODE_POINTS.LINE_FEED:
      case _.CODE_POINTS.TABULATION:
      case _.CODE_POINTS.FORM_FEED: {
        this._leaveAttrValue(), this.state = x.BEFORE_ATTRIBUTE_NAME;
        break;
      }
      case _.CODE_POINTS.SOLIDUS: {
        this._leaveAttrValue(), this.state = x.SELF_CLOSING_START_TAG;
        break;
      }
      case _.CODE_POINTS.GREATER_THAN_SIGN: {
        this._leaveAttrValue(), this.state = x.DATA, this.emitCurrentTagToken();
        break;
      }
      case _.CODE_POINTS.EOF: {
        this._err(q.ERR.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this._err(q.ERR.missingWhitespaceBetweenAttributes), this.state = x.BEFORE_ATTRIBUTE_NAME, this._stateBeforeAttributeName(u);
    }
  }
  // Self-closing start tag state
  //------------------------------------------------------------------
  _stateSelfClosingStartTag(u) {
    switch (u) {
      case _.CODE_POINTS.GREATER_THAN_SIGN: {
        const t = this.currentToken;
        t.selfClosing = !0, this.state = x.DATA, this.emitCurrentTagToken();
        break;
      }
      case _.CODE_POINTS.EOF: {
        this._err(q.ERR.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this._err(q.ERR.unexpectedSolidusInTag), this.state = x.BEFORE_ATTRIBUTE_NAME, this._stateBeforeAttributeName(u);
    }
  }
  // Bogus comment state
  //------------------------------------------------------------------
  _stateBogusComment(u) {
    const t = this.currentToken;
    switch (u) {
      case _.CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = x.DATA, this.emitCurrentComment(t);
        break;
      }
      case _.CODE_POINTS.EOF: {
        this.emitCurrentComment(t), this._emitEOFToken();
        break;
      }
      case _.CODE_POINTS.NULL: {
        this._err(q.ERR.unexpectedNullCharacter), t.data += _.REPLACEMENT_CHARACTER;
        break;
      }
      default:
        t.data += String.fromCodePoint(u);
    }
  }
  // Markup declaration open state
  //------------------------------------------------------------------
  _stateMarkupDeclarationOpen(u) {
    this._consumeSequenceIfMatch(_.SEQUENCES.DASH_DASH, !0) ? (this._createCommentToken(_.SEQUENCES.DASH_DASH.length + 1), this.state = x.COMMENT_START) : this._consumeSequenceIfMatch(_.SEQUENCES.DOCTYPE, !1) ? (this.currentLocation = this.getCurrentLocation(_.SEQUENCES.DOCTYPE.length + 1), this.state = x.DOCTYPE) : this._consumeSequenceIfMatch(_.SEQUENCES.CDATA_START, !0) ? this.inForeignNode ? this.state = x.CDATA_SECTION : (this._err(q.ERR.cdataInHtmlContent), this._createCommentToken(_.SEQUENCES.CDATA_START.length + 1), this.currentToken.data = "[CDATA[", this.state = x.BOGUS_COMMENT) : this._ensureHibernation() || (this._err(q.ERR.incorrectlyOpenedComment), this._createCommentToken(2), this.state = x.BOGUS_COMMENT, this._stateBogusComment(u));
  }
  // Comment start state
  //------------------------------------------------------------------
  _stateCommentStart(u) {
    switch (u) {
      case _.CODE_POINTS.HYPHEN_MINUS: {
        this.state = x.COMMENT_START_DASH;
        break;
      }
      case _.CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(q.ERR.abruptClosingOfEmptyComment), this.state = x.DATA;
        const t = this.currentToken;
        this.emitCurrentComment(t);
        break;
      }
      default:
        this.state = x.COMMENT, this._stateComment(u);
    }
  }
  // Comment start dash state
  //------------------------------------------------------------------
  _stateCommentStartDash(u) {
    const t = this.currentToken;
    switch (u) {
      case _.CODE_POINTS.HYPHEN_MINUS: {
        this.state = x.COMMENT_END;
        break;
      }
      case _.CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(q.ERR.abruptClosingOfEmptyComment), this.state = x.DATA, this.emitCurrentComment(t);
        break;
      }
      case _.CODE_POINTS.EOF: {
        this._err(q.ERR.eofInComment), this.emitCurrentComment(t), this._emitEOFToken();
        break;
      }
      default:
        t.data += "-", this.state = x.COMMENT, this._stateComment(u);
    }
  }
  // Comment state
  //------------------------------------------------------------------
  _stateComment(u) {
    const t = this.currentToken;
    switch (u) {
      case _.CODE_POINTS.HYPHEN_MINUS: {
        this.state = x.COMMENT_END_DASH;
        break;
      }
      case _.CODE_POINTS.LESS_THAN_SIGN: {
        t.data += "<", this.state = x.COMMENT_LESS_THAN_SIGN;
        break;
      }
      case _.CODE_POINTS.NULL: {
        this._err(q.ERR.unexpectedNullCharacter), t.data += _.REPLACEMENT_CHARACTER;
        break;
      }
      case _.CODE_POINTS.EOF: {
        this._err(q.ERR.eofInComment), this.emitCurrentComment(t), this._emitEOFToken();
        break;
      }
      default:
        t.data += String.fromCodePoint(u);
    }
  }
  // Comment less-than sign state
  //------------------------------------------------------------------
  _stateCommentLessThanSign(u) {
    const t = this.currentToken;
    switch (u) {
      case _.CODE_POINTS.EXCLAMATION_MARK: {
        t.data += "!", this.state = x.COMMENT_LESS_THAN_SIGN_BANG;
        break;
      }
      case _.CODE_POINTS.LESS_THAN_SIGN: {
        t.data += "<";
        break;
      }
      default:
        this.state = x.COMMENT, this._stateComment(u);
    }
  }
  // Comment less-than sign bang state
  //------------------------------------------------------------------
  _stateCommentLessThanSignBang(u) {
    u === _.CODE_POINTS.HYPHEN_MINUS ? this.state = x.COMMENT_LESS_THAN_SIGN_BANG_DASH : (this.state = x.COMMENT, this._stateComment(u));
  }
  // Comment less-than sign bang dash state
  //------------------------------------------------------------------
  _stateCommentLessThanSignBangDash(u) {
    u === _.CODE_POINTS.HYPHEN_MINUS ? this.state = x.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH : (this.state = x.COMMENT_END_DASH, this._stateCommentEndDash(u));
  }
  // Comment less-than sign bang dash dash state
  //------------------------------------------------------------------
  _stateCommentLessThanSignBangDashDash(u) {
    u !== _.CODE_POINTS.GREATER_THAN_SIGN && u !== _.CODE_POINTS.EOF && this._err(q.ERR.nestedComment), this.state = x.COMMENT_END, this._stateCommentEnd(u);
  }
  // Comment end dash state
  //------------------------------------------------------------------
  _stateCommentEndDash(u) {
    const t = this.currentToken;
    switch (u) {
      case _.CODE_POINTS.HYPHEN_MINUS: {
        this.state = x.COMMENT_END;
        break;
      }
      case _.CODE_POINTS.EOF: {
        this._err(q.ERR.eofInComment), this.emitCurrentComment(t), this._emitEOFToken();
        break;
      }
      default:
        t.data += "-", this.state = x.COMMENT, this._stateComment(u);
    }
  }
  // Comment end state
  //------------------------------------------------------------------
  _stateCommentEnd(u) {
    const t = this.currentToken;
    switch (u) {
      case _.CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = x.DATA, this.emitCurrentComment(t);
        break;
      }
      case _.CODE_POINTS.EXCLAMATION_MARK: {
        this.state = x.COMMENT_END_BANG;
        break;
      }
      case _.CODE_POINTS.HYPHEN_MINUS: {
        t.data += "-";
        break;
      }
      case _.CODE_POINTS.EOF: {
        this._err(q.ERR.eofInComment), this.emitCurrentComment(t), this._emitEOFToken();
        break;
      }
      default:
        t.data += "--", this.state = x.COMMENT, this._stateComment(u);
    }
  }
  // Comment end bang state
  //------------------------------------------------------------------
  _stateCommentEndBang(u) {
    const t = this.currentToken;
    switch (u) {
      case _.CODE_POINTS.HYPHEN_MINUS: {
        t.data += "--!", this.state = x.COMMENT_END_DASH;
        break;
      }
      case _.CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(q.ERR.incorrectlyClosedComment), this.state = x.DATA, this.emitCurrentComment(t);
        break;
      }
      case _.CODE_POINTS.EOF: {
        this._err(q.ERR.eofInComment), this.emitCurrentComment(t), this._emitEOFToken();
        break;
      }
      default:
        t.data += "--!", this.state = x.COMMENT, this._stateComment(u);
    }
  }
  // DOCTYPE state
  //------------------------------------------------------------------
  _stateDoctype(u) {
    switch (u) {
      case _.CODE_POINTS.SPACE:
      case _.CODE_POINTS.LINE_FEED:
      case _.CODE_POINTS.TABULATION:
      case _.CODE_POINTS.FORM_FEED: {
        this.state = x.BEFORE_DOCTYPE_NAME;
        break;
      }
      case _.CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = x.BEFORE_DOCTYPE_NAME, this._stateBeforeDoctypeName(u);
        break;
      }
      case _.CODE_POINTS.EOF: {
        this._err(q.ERR.eofInDoctype), this._createDoctypeToken(null);
        const t = this.currentToken;
        t.forceQuirks = !0, this.emitCurrentDoctype(t), this._emitEOFToken();
        break;
      }
      default:
        this._err(q.ERR.missingWhitespaceBeforeDoctypeName), this.state = x.BEFORE_DOCTYPE_NAME, this._stateBeforeDoctypeName(u);
    }
  }
  // Before DOCTYPE name state
  //------------------------------------------------------------------
  _stateBeforeDoctypeName(u) {
    if (U0(u))
      this._createDoctypeToken(String.fromCharCode(Mr(u))), this.state = x.DOCTYPE_NAME;
    else
      switch (u) {
        case _.CODE_POINTS.SPACE:
        case _.CODE_POINTS.LINE_FEED:
        case _.CODE_POINTS.TABULATION:
        case _.CODE_POINTS.FORM_FEED:
          break;
        case _.CODE_POINTS.NULL: {
          this._err(q.ERR.unexpectedNullCharacter), this._createDoctypeToken(_.REPLACEMENT_CHARACTER), this.state = x.DOCTYPE_NAME;
          break;
        }
        case _.CODE_POINTS.GREATER_THAN_SIGN: {
          this._err(q.ERR.missingDoctypeName), this._createDoctypeToken(null);
          const t = this.currentToken;
          t.forceQuirks = !0, this.emitCurrentDoctype(t), this.state = x.DATA;
          break;
        }
        case _.CODE_POINTS.EOF: {
          this._err(q.ERR.eofInDoctype), this._createDoctypeToken(null);
          const t = this.currentToken;
          t.forceQuirks = !0, this.emitCurrentDoctype(t), this._emitEOFToken();
          break;
        }
        default:
          this._createDoctypeToken(String.fromCodePoint(u)), this.state = x.DOCTYPE_NAME;
      }
  }
  // DOCTYPE name state
  //------------------------------------------------------------------
  _stateDoctypeName(u) {
    const t = this.currentToken;
    switch (u) {
      case _.CODE_POINTS.SPACE:
      case _.CODE_POINTS.LINE_FEED:
      case _.CODE_POINTS.TABULATION:
      case _.CODE_POINTS.FORM_FEED: {
        this.state = x.AFTER_DOCTYPE_NAME;
        break;
      }
      case _.CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = x.DATA, this.emitCurrentDoctype(t);
        break;
      }
      case _.CODE_POINTS.NULL: {
        this._err(q.ERR.unexpectedNullCharacter), t.name += _.REPLACEMENT_CHARACTER;
        break;
      }
      case _.CODE_POINTS.EOF: {
        this._err(q.ERR.eofInDoctype), t.forceQuirks = !0, this.emitCurrentDoctype(t), this._emitEOFToken();
        break;
      }
      default:
        t.name += String.fromCodePoint(U0(u) ? Mr(u) : u);
    }
  }
  // After DOCTYPE name state
  //------------------------------------------------------------------
  _stateAfterDoctypeName(u) {
    const t = this.currentToken;
    switch (u) {
      case _.CODE_POINTS.SPACE:
      case _.CODE_POINTS.LINE_FEED:
      case _.CODE_POINTS.TABULATION:
      case _.CODE_POINTS.FORM_FEED:
        break;
      case _.CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = x.DATA, this.emitCurrentDoctype(t);
        break;
      }
      case _.CODE_POINTS.EOF: {
        this._err(q.ERR.eofInDoctype), t.forceQuirks = !0, this.emitCurrentDoctype(t), this._emitEOFToken();
        break;
      }
      default:
        this._consumeSequenceIfMatch(_.SEQUENCES.PUBLIC, !1) ? this.state = x.AFTER_DOCTYPE_PUBLIC_KEYWORD : this._consumeSequenceIfMatch(_.SEQUENCES.SYSTEM, !1) ? this.state = x.AFTER_DOCTYPE_SYSTEM_KEYWORD : this._ensureHibernation() || (this._err(q.ERR.invalidCharacterSequenceAfterDoctypeName), t.forceQuirks = !0, this.state = x.BOGUS_DOCTYPE, this._stateBogusDoctype(u));
    }
  }
  // After DOCTYPE public keyword state
  //------------------------------------------------------------------
  _stateAfterDoctypePublicKeyword(u) {
    const t = this.currentToken;
    switch (u) {
      case _.CODE_POINTS.SPACE:
      case _.CODE_POINTS.LINE_FEED:
      case _.CODE_POINTS.TABULATION:
      case _.CODE_POINTS.FORM_FEED: {
        this.state = x.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER;
        break;
      }
      case _.CODE_POINTS.QUOTATION_MARK: {
        this._err(q.ERR.missingWhitespaceAfterDoctypePublicKeyword), t.publicId = "", this.state = x.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case _.CODE_POINTS.APOSTROPHE: {
        this._err(q.ERR.missingWhitespaceAfterDoctypePublicKeyword), t.publicId = "", this.state = x.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case _.CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(q.ERR.missingDoctypePublicIdentifier), t.forceQuirks = !0, this.state = x.DATA, this.emitCurrentDoctype(t);
        break;
      }
      case _.CODE_POINTS.EOF: {
        this._err(q.ERR.eofInDoctype), t.forceQuirks = !0, this.emitCurrentDoctype(t), this._emitEOFToken();
        break;
      }
      default:
        this._err(q.ERR.missingQuoteBeforeDoctypePublicIdentifier), t.forceQuirks = !0, this.state = x.BOGUS_DOCTYPE, this._stateBogusDoctype(u);
    }
  }
  // Before DOCTYPE public identifier state
  //------------------------------------------------------------------
  _stateBeforeDoctypePublicIdentifier(u) {
    const t = this.currentToken;
    switch (u) {
      case _.CODE_POINTS.SPACE:
      case _.CODE_POINTS.LINE_FEED:
      case _.CODE_POINTS.TABULATION:
      case _.CODE_POINTS.FORM_FEED:
        break;
      case _.CODE_POINTS.QUOTATION_MARK: {
        t.publicId = "", this.state = x.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case _.CODE_POINTS.APOSTROPHE: {
        t.publicId = "", this.state = x.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case _.CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(q.ERR.missingDoctypePublicIdentifier), t.forceQuirks = !0, this.state = x.DATA, this.emitCurrentDoctype(t);
        break;
      }
      case _.CODE_POINTS.EOF: {
        this._err(q.ERR.eofInDoctype), t.forceQuirks = !0, this.emitCurrentDoctype(t), this._emitEOFToken();
        break;
      }
      default:
        this._err(q.ERR.missingQuoteBeforeDoctypePublicIdentifier), t.forceQuirks = !0, this.state = x.BOGUS_DOCTYPE, this._stateBogusDoctype(u);
    }
  }
  // DOCTYPE public identifier (double-quoted) state
  //------------------------------------------------------------------
  _stateDoctypePublicIdentifierDoubleQuoted(u) {
    const t = this.currentToken;
    switch (u) {
      case _.CODE_POINTS.QUOTATION_MARK: {
        this.state = x.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
        break;
      }
      case _.CODE_POINTS.NULL: {
        this._err(q.ERR.unexpectedNullCharacter), t.publicId += _.REPLACEMENT_CHARACTER;
        break;
      }
      case _.CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(q.ERR.abruptDoctypePublicIdentifier), t.forceQuirks = !0, this.emitCurrentDoctype(t), this.state = x.DATA;
        break;
      }
      case _.CODE_POINTS.EOF: {
        this._err(q.ERR.eofInDoctype), t.forceQuirks = !0, this.emitCurrentDoctype(t), this._emitEOFToken();
        break;
      }
      default:
        t.publicId += String.fromCodePoint(u);
    }
  }
  // DOCTYPE public identifier (single-quoted) state
  //------------------------------------------------------------------
  _stateDoctypePublicIdentifierSingleQuoted(u) {
    const t = this.currentToken;
    switch (u) {
      case _.CODE_POINTS.APOSTROPHE: {
        this.state = x.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
        break;
      }
      case _.CODE_POINTS.NULL: {
        this._err(q.ERR.unexpectedNullCharacter), t.publicId += _.REPLACEMENT_CHARACTER;
        break;
      }
      case _.CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(q.ERR.abruptDoctypePublicIdentifier), t.forceQuirks = !0, this.emitCurrentDoctype(t), this.state = x.DATA;
        break;
      }
      case _.CODE_POINTS.EOF: {
        this._err(q.ERR.eofInDoctype), t.forceQuirks = !0, this.emitCurrentDoctype(t), this._emitEOFToken();
        break;
      }
      default:
        t.publicId += String.fromCodePoint(u);
    }
  }
  // After DOCTYPE public identifier state
  //------------------------------------------------------------------
  _stateAfterDoctypePublicIdentifier(u) {
    const t = this.currentToken;
    switch (u) {
      case _.CODE_POINTS.SPACE:
      case _.CODE_POINTS.LINE_FEED:
      case _.CODE_POINTS.TABULATION:
      case _.CODE_POINTS.FORM_FEED: {
        this.state = x.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS;
        break;
      }
      case _.CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = x.DATA, this.emitCurrentDoctype(t);
        break;
      }
      case _.CODE_POINTS.QUOTATION_MARK: {
        this._err(q.ERR.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers), t.systemId = "", this.state = x.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case _.CODE_POINTS.APOSTROPHE: {
        this._err(q.ERR.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers), t.systemId = "", this.state = x.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case _.CODE_POINTS.EOF: {
        this._err(q.ERR.eofInDoctype), t.forceQuirks = !0, this.emitCurrentDoctype(t), this._emitEOFToken();
        break;
      }
      default:
        this._err(q.ERR.missingQuoteBeforeDoctypeSystemIdentifier), t.forceQuirks = !0, this.state = x.BOGUS_DOCTYPE, this._stateBogusDoctype(u);
    }
  }
  // Between DOCTYPE public and system identifiers state
  //------------------------------------------------------------------
  _stateBetweenDoctypePublicAndSystemIdentifiers(u) {
    const t = this.currentToken;
    switch (u) {
      case _.CODE_POINTS.SPACE:
      case _.CODE_POINTS.LINE_FEED:
      case _.CODE_POINTS.TABULATION:
      case _.CODE_POINTS.FORM_FEED:
        break;
      case _.CODE_POINTS.GREATER_THAN_SIGN: {
        this.emitCurrentDoctype(t), this.state = x.DATA;
        break;
      }
      case _.CODE_POINTS.QUOTATION_MARK: {
        t.systemId = "", this.state = x.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case _.CODE_POINTS.APOSTROPHE: {
        t.systemId = "", this.state = x.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case _.CODE_POINTS.EOF: {
        this._err(q.ERR.eofInDoctype), t.forceQuirks = !0, this.emitCurrentDoctype(t), this._emitEOFToken();
        break;
      }
      default:
        this._err(q.ERR.missingQuoteBeforeDoctypeSystemIdentifier), t.forceQuirks = !0, this.state = x.BOGUS_DOCTYPE, this._stateBogusDoctype(u);
    }
  }
  // After DOCTYPE system keyword state
  //------------------------------------------------------------------
  _stateAfterDoctypeSystemKeyword(u) {
    const t = this.currentToken;
    switch (u) {
      case _.CODE_POINTS.SPACE:
      case _.CODE_POINTS.LINE_FEED:
      case _.CODE_POINTS.TABULATION:
      case _.CODE_POINTS.FORM_FEED: {
        this.state = x.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER;
        break;
      }
      case _.CODE_POINTS.QUOTATION_MARK: {
        this._err(q.ERR.missingWhitespaceAfterDoctypeSystemKeyword), t.systemId = "", this.state = x.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case _.CODE_POINTS.APOSTROPHE: {
        this._err(q.ERR.missingWhitespaceAfterDoctypeSystemKeyword), t.systemId = "", this.state = x.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case _.CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(q.ERR.missingDoctypeSystemIdentifier), t.forceQuirks = !0, this.state = x.DATA, this.emitCurrentDoctype(t);
        break;
      }
      case _.CODE_POINTS.EOF: {
        this._err(q.ERR.eofInDoctype), t.forceQuirks = !0, this.emitCurrentDoctype(t), this._emitEOFToken();
        break;
      }
      default:
        this._err(q.ERR.missingQuoteBeforeDoctypeSystemIdentifier), t.forceQuirks = !0, this.state = x.BOGUS_DOCTYPE, this._stateBogusDoctype(u);
    }
  }
  // Before DOCTYPE system identifier state
  //------------------------------------------------------------------
  _stateBeforeDoctypeSystemIdentifier(u) {
    const t = this.currentToken;
    switch (u) {
      case _.CODE_POINTS.SPACE:
      case _.CODE_POINTS.LINE_FEED:
      case _.CODE_POINTS.TABULATION:
      case _.CODE_POINTS.FORM_FEED:
        break;
      case _.CODE_POINTS.QUOTATION_MARK: {
        t.systemId = "", this.state = x.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case _.CODE_POINTS.APOSTROPHE: {
        t.systemId = "", this.state = x.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case _.CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(q.ERR.missingDoctypeSystemIdentifier), t.forceQuirks = !0, this.state = x.DATA, this.emitCurrentDoctype(t);
        break;
      }
      case _.CODE_POINTS.EOF: {
        this._err(q.ERR.eofInDoctype), t.forceQuirks = !0, this.emitCurrentDoctype(t), this._emitEOFToken();
        break;
      }
      default:
        this._err(q.ERR.missingQuoteBeforeDoctypeSystemIdentifier), t.forceQuirks = !0, this.state = x.BOGUS_DOCTYPE, this._stateBogusDoctype(u);
    }
  }
  // DOCTYPE system identifier (double-quoted) state
  //------------------------------------------------------------------
  _stateDoctypeSystemIdentifierDoubleQuoted(u) {
    const t = this.currentToken;
    switch (u) {
      case _.CODE_POINTS.QUOTATION_MARK: {
        this.state = x.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
        break;
      }
      case _.CODE_POINTS.NULL: {
        this._err(q.ERR.unexpectedNullCharacter), t.systemId += _.REPLACEMENT_CHARACTER;
        break;
      }
      case _.CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(q.ERR.abruptDoctypeSystemIdentifier), t.forceQuirks = !0, this.emitCurrentDoctype(t), this.state = x.DATA;
        break;
      }
      case _.CODE_POINTS.EOF: {
        this._err(q.ERR.eofInDoctype), t.forceQuirks = !0, this.emitCurrentDoctype(t), this._emitEOFToken();
        break;
      }
      default:
        t.systemId += String.fromCodePoint(u);
    }
  }
  // DOCTYPE system identifier (single-quoted) state
  //------------------------------------------------------------------
  _stateDoctypeSystemIdentifierSingleQuoted(u) {
    const t = this.currentToken;
    switch (u) {
      case _.CODE_POINTS.APOSTROPHE: {
        this.state = x.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
        break;
      }
      case _.CODE_POINTS.NULL: {
        this._err(q.ERR.unexpectedNullCharacter), t.systemId += _.REPLACEMENT_CHARACTER;
        break;
      }
      case _.CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(q.ERR.abruptDoctypeSystemIdentifier), t.forceQuirks = !0, this.emitCurrentDoctype(t), this.state = x.DATA;
        break;
      }
      case _.CODE_POINTS.EOF: {
        this._err(q.ERR.eofInDoctype), t.forceQuirks = !0, this.emitCurrentDoctype(t), this._emitEOFToken();
        break;
      }
      default:
        t.systemId += String.fromCodePoint(u);
    }
  }
  // After DOCTYPE system identifier state
  //------------------------------------------------------------------
  _stateAfterDoctypeSystemIdentifier(u) {
    const t = this.currentToken;
    switch (u) {
      case _.CODE_POINTS.SPACE:
      case _.CODE_POINTS.LINE_FEED:
      case _.CODE_POINTS.TABULATION:
      case _.CODE_POINTS.FORM_FEED:
        break;
      case _.CODE_POINTS.GREATER_THAN_SIGN: {
        this.emitCurrentDoctype(t), this.state = x.DATA;
        break;
      }
      case _.CODE_POINTS.EOF: {
        this._err(q.ERR.eofInDoctype), t.forceQuirks = !0, this.emitCurrentDoctype(t), this._emitEOFToken();
        break;
      }
      default:
        this._err(q.ERR.unexpectedCharacterAfterDoctypeSystemIdentifier), this.state = x.BOGUS_DOCTYPE, this._stateBogusDoctype(u);
    }
  }
  // Bogus DOCTYPE state
  //------------------------------------------------------------------
  _stateBogusDoctype(u) {
    const t = this.currentToken;
    switch (u) {
      case _.CODE_POINTS.GREATER_THAN_SIGN: {
        this.emitCurrentDoctype(t), this.state = x.DATA;
        break;
      }
      case _.CODE_POINTS.NULL: {
        this._err(q.ERR.unexpectedNullCharacter);
        break;
      }
      case _.CODE_POINTS.EOF: {
        this.emitCurrentDoctype(t), this._emitEOFToken();
        break;
      }
    }
  }
  // CDATA section state
  //------------------------------------------------------------------
  _stateCdataSection(u) {
    switch (u) {
      case _.CODE_POINTS.RIGHT_SQUARE_BRACKET: {
        this.state = x.CDATA_SECTION_BRACKET;
        break;
      }
      case _.CODE_POINTS.EOF: {
        this._err(q.ERR.eofInCdata), this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(u);
    }
  }
  // CDATA section bracket state
  //------------------------------------------------------------------
  _stateCdataSectionBracket(u) {
    u === _.CODE_POINTS.RIGHT_SQUARE_BRACKET ? this.state = x.CDATA_SECTION_END : (this._emitChars("]"), this.state = x.CDATA_SECTION, this._stateCdataSection(u));
  }
  // CDATA section end state
  //------------------------------------------------------------------
  _stateCdataSectionEnd(u) {
    switch (u) {
      case _.CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = x.DATA;
        break;
      }
      case _.CODE_POINTS.RIGHT_SQUARE_BRACKET: {
        this._emitChars("]");
        break;
      }
      default:
        this._emitChars("]]"), this.state = x.CDATA_SECTION, this._stateCdataSection(u);
    }
  }
  // Character reference state
  //------------------------------------------------------------------
  _stateCharacterReference(u) {
    u === _.CODE_POINTS.NUMBER_SIGN ? this.state = x.NUMERIC_CHARACTER_REFERENCE : yi(u) ? (this.state = x.NAMED_CHARACTER_REFERENCE, this._stateNamedCharacterReference(u)) : (this._flushCodePointConsumedAsCharacterReference(_.CODE_POINTS.AMPERSAND), this._reconsumeInState(this.returnState, u));
  }
  // Named character reference state
  //------------------------------------------------------------------
  _stateNamedCharacterReference(u) {
    const t = this._matchNamedCharacterReference(u);
    if (!this._ensureHibernation())
      if (t) {
        for (let r = 0; r < t.length; r++)
          this._flushCodePointConsumedAsCharacterReference(t[r]);
        this.state = this.returnState;
      } else
        this._flushCodePointConsumedAsCharacterReference(_.CODE_POINTS.AMPERSAND), this.state = x.AMBIGUOUS_AMPERSAND;
  }
  // Ambiguos ampersand state
  //------------------------------------------------------------------
  _stateAmbiguousAmpersand(u) {
    yi(u) ? this._flushCodePointConsumedAsCharacterReference(u) : (u === _.CODE_POINTS.SEMICOLON && this._err(q.ERR.unknownNamedCharacterReference), this._reconsumeInState(this.returnState, u));
  }
  // Numeric character reference state
  //------------------------------------------------------------------
  _stateNumericCharacterReference(u) {
    this.charRefCode = 0, u === _.CODE_POINTS.LATIN_SMALL_X || u === _.CODE_POINTS.LATIN_CAPITAL_X ? this.state = x.HEXADEMICAL_CHARACTER_REFERENCE_START : $0(u) ? (this.state = x.DECIMAL_CHARACTER_REFERENCE, this._stateDecimalCharacterReference(u)) : (this._err(q.ERR.absenceOfDigitsInNumericCharacterReference), this._flushCodePointConsumedAsCharacterReference(_.CODE_POINTS.AMPERSAND), this._flushCodePointConsumedAsCharacterReference(_.CODE_POINTS.NUMBER_SIGN), this._reconsumeInState(this.returnState, u));
  }
  // Hexademical character reference start state
  //------------------------------------------------------------------
  _stateHexademicalCharacterReferenceStart(u) {
    Fp(u) ? (this.state = x.HEXADEMICAL_CHARACTER_REFERENCE, this._stateHexademicalCharacterReference(u)) : (this._err(q.ERR.absenceOfDigitsInNumericCharacterReference), this._flushCodePointConsumedAsCharacterReference(_.CODE_POINTS.AMPERSAND), this._flushCodePointConsumedAsCharacterReference(_.CODE_POINTS.NUMBER_SIGN), this._unconsume(2), this.state = this.returnState);
  }
  // Hexademical character reference state
  //------------------------------------------------------------------
  _stateHexademicalCharacterReference(u) {
    Ol(u) ? this.charRefCode = this.charRefCode * 16 + u - 55 : Ll(u) ? this.charRefCode = this.charRefCode * 16 + u - 87 : $0(u) ? this.charRefCode = this.charRefCode * 16 + u - 48 : u === _.CODE_POINTS.SEMICOLON ? this.state = x.NUMERIC_CHARACTER_REFERENCE_END : (this._err(q.ERR.missingSemicolonAfterCharacterReference), this.state = x.NUMERIC_CHARACTER_REFERENCE_END, this._stateNumericCharacterReferenceEnd(u));
  }
  // Decimal character reference state
  //------------------------------------------------------------------
  _stateDecimalCharacterReference(u) {
    $0(u) ? this.charRefCode = this.charRefCode * 10 + u - 48 : u === _.CODE_POINTS.SEMICOLON ? this.state = x.NUMERIC_CHARACTER_REFERENCE_END : (this._err(q.ERR.missingSemicolonAfterCharacterReference), this.state = x.NUMERIC_CHARACTER_REFERENCE_END, this._stateNumericCharacterReferenceEnd(u));
  }
  // Numeric character reference end state
  //------------------------------------------------------------------
  _stateNumericCharacterReferenceEnd(u) {
    if (this.charRefCode === _.CODE_POINTS.NULL)
      this._err(q.ERR.nullCharacterReference), this.charRefCode = _.CODE_POINTS.REPLACEMENT_CHARACTER;
    else if (this.charRefCode > 1114111)
      this._err(q.ERR.characterReferenceOutsideUnicodeRange), this.charRefCode = _.CODE_POINTS.REPLACEMENT_CHARACTER;
    else if ((0, _.isSurrogate)(this.charRefCode))
      this._err(q.ERR.surrogateCharacterReference), this.charRefCode = _.CODE_POINTS.REPLACEMENT_CHARACTER;
    else if ((0, _.isUndefinedCodePoint)(this.charRefCode))
      this._err(q.ERR.noncharacterCharacterReference);
    else if ((0, _.isControlCodePoint)(this.charRefCode) || this.charRefCode === _.CODE_POINTS.CARRIAGE_RETURN) {
      this._err(q.ERR.controlCharacterReference);
      const t = Up.get(this.charRefCode);
      t !== void 0 && (this.charRefCode = t);
    }
    this._flushCodePointConsumedAsCharacterReference(this.charRefCode), this._reconsumeInState(this.returnState, u);
  }
};
kt.Tokenizer = Gp;
var Za = {};
Object.defineProperty(Za, "__esModule", { value: !0 });
Za.OpenElementStack = void 0;
const j = ct, wl = /* @__PURE__ */ new Set([j.TAG_ID.DD, j.TAG_ID.DT, j.TAG_ID.LI, j.TAG_ID.OPTGROUP, j.TAG_ID.OPTION, j.TAG_ID.P, j.TAG_ID.RB, j.TAG_ID.RP, j.TAG_ID.RT, j.TAG_ID.RTC]), Es = /* @__PURE__ */ new Set([
  ...wl,
  j.TAG_ID.CAPTION,
  j.TAG_ID.COLGROUP,
  j.TAG_ID.TBODY,
  j.TAG_ID.TD,
  j.TAG_ID.TFOOT,
  j.TAG_ID.TH,
  j.TAG_ID.THEAD,
  j.TAG_ID.TR
]), kr = /* @__PURE__ */ new Map([
  [j.TAG_ID.APPLET, j.NS.HTML],
  [j.TAG_ID.CAPTION, j.NS.HTML],
  [j.TAG_ID.HTML, j.NS.HTML],
  [j.TAG_ID.MARQUEE, j.NS.HTML],
  [j.TAG_ID.OBJECT, j.NS.HTML],
  [j.TAG_ID.TABLE, j.NS.HTML],
  [j.TAG_ID.TD, j.NS.HTML],
  [j.TAG_ID.TEMPLATE, j.NS.HTML],
  [j.TAG_ID.TH, j.NS.HTML],
  [j.TAG_ID.ANNOTATION_XML, j.NS.MATHML],
  [j.TAG_ID.MI, j.NS.MATHML],
  [j.TAG_ID.MN, j.NS.MATHML],
  [j.TAG_ID.MO, j.NS.MATHML],
  [j.TAG_ID.MS, j.NS.MATHML],
  [j.TAG_ID.MTEXT, j.NS.MATHML],
  [j.TAG_ID.DESC, j.NS.SVG],
  [j.TAG_ID.FOREIGN_OBJECT, j.NS.SVG],
  [j.TAG_ID.TITLE, j.NS.SVG]
]), jp = [j.TAG_ID.H1, j.TAG_ID.H2, j.TAG_ID.H3, j.TAG_ID.H4, j.TAG_ID.H5, j.TAG_ID.H6], $p = [j.TAG_ID.TR, j.TAG_ID.TEMPLATE, j.TAG_ID.HTML], Vp = [j.TAG_ID.TBODY, j.TAG_ID.TFOOT, j.TAG_ID.THEAD, j.TAG_ID.TEMPLATE, j.TAG_ID.HTML], Yp = [j.TAG_ID.TABLE, j.TAG_ID.TEMPLATE, j.TAG_ID.HTML], Wp = [j.TAG_ID.TD, j.TAG_ID.TH];
class Xp {
  get currentTmplContentOrNode() {
    return this._isInTemplate() ? this.treeAdapter.getTemplateContent(this.current) : this.current;
  }
  constructor(u, t, r) {
    this.treeAdapter = t, this.handler = r, this.items = [], this.tagIDs = [], this.stackTop = -1, this.tmplCount = 0, this.currentTagId = j.TAG_ID.UNKNOWN, this.current = u;
  }
  //Index of element
  _indexOf(u) {
    return this.items.lastIndexOf(u, this.stackTop);
  }
  //Update current element
  _isInTemplate() {
    return this.currentTagId === j.TAG_ID.TEMPLATE && this.treeAdapter.getNamespaceURI(this.current) === j.NS.HTML;
  }
  _updateCurrentElement() {
    this.current = this.items[this.stackTop], this.currentTagId = this.tagIDs[this.stackTop];
  }
  //Mutations
  push(u, t) {
    this.stackTop++, this.items[this.stackTop] = u, this.current = u, this.tagIDs[this.stackTop] = t, this.currentTagId = t, this._isInTemplate() && this.tmplCount++, this.handler.onItemPush(u, t, !0);
  }
  pop() {
    const u = this.current;
    this.tmplCount > 0 && this._isInTemplate() && this.tmplCount--, this.stackTop--, this._updateCurrentElement(), this.handler.onItemPop(u, !0);
  }
  replace(u, t) {
    const r = this._indexOf(u);
    this.items[r] = t, r === this.stackTop && (this.current = t);
  }
  insertAfter(u, t, r) {
    const a = this._indexOf(u) + 1;
    this.items.splice(a, 0, t), this.tagIDs.splice(a, 0, r), this.stackTop++, a === this.stackTop && this._updateCurrentElement(), this.handler.onItemPush(this.current, this.currentTagId, a === this.stackTop);
  }
  popUntilTagNamePopped(u) {
    let t = this.stackTop + 1;
    do
      t = this.tagIDs.lastIndexOf(u, t - 1);
    while (t > 0 && this.treeAdapter.getNamespaceURI(this.items[t]) !== j.NS.HTML);
    this.shortenToLength(t < 0 ? 0 : t);
  }
  shortenToLength(u) {
    for (; this.stackTop >= u; ) {
      const t = this.current;
      this.tmplCount > 0 && this._isInTemplate() && (this.tmplCount -= 1), this.stackTop--, this._updateCurrentElement(), this.handler.onItemPop(t, this.stackTop < u);
    }
  }
  popUntilElementPopped(u) {
    const t = this._indexOf(u);
    this.shortenToLength(t < 0 ? 0 : t);
  }
  popUntilPopped(u, t) {
    const r = this._indexOfTagNames(u, t);
    this.shortenToLength(r < 0 ? 0 : r);
  }
  popUntilNumberedHeaderPopped() {
    this.popUntilPopped(jp, j.NS.HTML);
  }
  popUntilTableCellPopped() {
    this.popUntilPopped(Wp, j.NS.HTML);
  }
  popAllUpToHtmlElement() {
    this.tmplCount = 0, this.shortenToLength(1);
  }
  _indexOfTagNames(u, t) {
    for (let r = this.stackTop; r >= 0; r--)
      if (u.includes(this.tagIDs[r]) && this.treeAdapter.getNamespaceURI(this.items[r]) === t)
        return r;
    return -1;
  }
  clearBackTo(u, t) {
    const r = this._indexOfTagNames(u, t);
    this.shortenToLength(r + 1);
  }
  clearBackToTableContext() {
    this.clearBackTo(Yp, j.NS.HTML);
  }
  clearBackToTableBodyContext() {
    this.clearBackTo(Vp, j.NS.HTML);
  }
  clearBackToTableRowContext() {
    this.clearBackTo($p, j.NS.HTML);
  }
  remove(u) {
    const t = this._indexOf(u);
    t >= 0 && (t === this.stackTop ? this.pop() : (this.items.splice(t, 1), this.tagIDs.splice(t, 1), this.stackTop--, this._updateCurrentElement(), this.handler.onItemPop(u, !1)));
  }
  //Search
  tryPeekProperlyNestedBodyElement() {
    return this.stackTop >= 1 && this.tagIDs[1] === j.TAG_ID.BODY ? this.items[1] : null;
  }
  contains(u) {
    return this._indexOf(u) > -1;
  }
  getCommonAncestor(u) {
    const t = this._indexOf(u) - 1;
    return t >= 0 ? this.items[t] : null;
  }
  isRootHtmlElementCurrent() {
    return this.stackTop === 0 && this.tagIDs[0] === j.TAG_ID.HTML;
  }
  //Element in scope
  hasInScope(u) {
    for (let t = this.stackTop; t >= 0; t--) {
      const r = this.tagIDs[t], a = this.treeAdapter.getNamespaceURI(this.items[t]);
      if (r === u && a === j.NS.HTML)
        return !0;
      if (kr.get(r) === a)
        return !1;
    }
    return !0;
  }
  hasNumberedHeaderInScope() {
    for (let u = this.stackTop; u >= 0; u--) {
      const t = this.tagIDs[u], r = this.treeAdapter.getNamespaceURI(this.items[u]);
      if ((0, j.isNumberedHeader)(t) && r === j.NS.HTML)
        return !0;
      if (kr.get(t) === r)
        return !1;
    }
    return !0;
  }
  hasInListItemScope(u) {
    for (let t = this.stackTop; t >= 0; t--) {
      const r = this.tagIDs[t], a = this.treeAdapter.getNamespaceURI(this.items[t]);
      if (r === u && a === j.NS.HTML)
        return !0;
      if ((r === j.TAG_ID.UL || r === j.TAG_ID.OL) && a === j.NS.HTML || kr.get(r) === a)
        return !1;
    }
    return !0;
  }
  hasInButtonScope(u) {
    for (let t = this.stackTop; t >= 0; t--) {
      const r = this.tagIDs[t], a = this.treeAdapter.getNamespaceURI(this.items[t]);
      if (r === u && a === j.NS.HTML)
        return !0;
      if (r === j.TAG_ID.BUTTON && a === j.NS.HTML || kr.get(r) === a)
        return !1;
    }
    return !0;
  }
  hasInTableScope(u) {
    for (let t = this.stackTop; t >= 0; t--) {
      const r = this.tagIDs[t];
      if (this.treeAdapter.getNamespaceURI(this.items[t]) === j.NS.HTML) {
        if (r === u)
          return !0;
        if (r === j.TAG_ID.TABLE || r === j.TAG_ID.TEMPLATE || r === j.TAG_ID.HTML)
          return !1;
      }
    }
    return !0;
  }
  hasTableBodyContextInTableScope() {
    for (let u = this.stackTop; u >= 0; u--) {
      const t = this.tagIDs[u];
      if (this.treeAdapter.getNamespaceURI(this.items[u]) === j.NS.HTML) {
        if (t === j.TAG_ID.TBODY || t === j.TAG_ID.THEAD || t === j.TAG_ID.TFOOT)
          return !0;
        if (t === j.TAG_ID.TABLE || t === j.TAG_ID.HTML)
          return !1;
      }
    }
    return !0;
  }
  hasInSelectScope(u) {
    for (let t = this.stackTop; t >= 0; t--) {
      const r = this.tagIDs[t];
      if (this.treeAdapter.getNamespaceURI(this.items[t]) === j.NS.HTML) {
        if (r === u)
          return !0;
        if (r !== j.TAG_ID.OPTION && r !== j.TAG_ID.OPTGROUP)
          return !1;
      }
    }
    return !0;
  }
  //Implied end tags
  generateImpliedEndTags() {
    for (; wl.has(this.currentTagId); )
      this.pop();
  }
  generateImpliedEndTagsThoroughly() {
    for (; Es.has(this.currentTagId); )
      this.pop();
  }
  generateImpliedEndTagsWithExclusion(u) {
    for (; this.currentTagId !== u && Es.has(this.currentTagId); )
      this.pop();
  }
}
Za.OpenElementStack = Xp;
var Rl = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.FormattingElementList = e.EntryType = void 0;
  const u = 3;
  var t;
  (function(n) {
    n[n.Marker = 0] = "Marker", n[n.Element = 1] = "Element";
  })(t = e.EntryType || (e.EntryType = {}));
  const r = { type: t.Marker };
  class a {
    constructor(i) {
      this.treeAdapter = i, this.entries = [], this.bookmark = null;
    }
    //Noah Ark's condition
    //OPTIMIZATION: at first we try to find possible candidates for exclusion using
    //lightweight heuristics without thorough attributes check.
    _getNoahArkConditionCandidates(i, s) {
      const o = [], d = s.length, c = this.treeAdapter.getTagName(i), E = this.treeAdapter.getNamespaceURI(i);
      for (let f = 0; f < this.entries.length; f++) {
        const m = this.entries[f];
        if (m.type === t.Marker)
          break;
        const { element: v } = m;
        if (this.treeAdapter.getTagName(v) === c && this.treeAdapter.getNamespaceURI(v) === E) {
          const L = this.treeAdapter.getAttrList(v);
          L.length === d && o.push({ idx: f, attrs: L });
        }
      }
      return o;
    }
    _ensureNoahArkCondition(i) {
      if (this.entries.length < u)
        return;
      const s = this.treeAdapter.getAttrList(i), o = this._getNoahArkConditionCandidates(i, s);
      if (o.length < u)
        return;
      const d = new Map(s.map((E) => [E.name, E.value]));
      let c = 0;
      for (let E = 0; E < o.length; E++) {
        const f = o[E];
        f.attrs.every((m) => d.get(m.name) === m.value) && (c += 1, c >= u && this.entries.splice(f.idx, 1));
      }
    }
    //Mutations
    insertMarker() {
      this.entries.unshift(r);
    }
    pushElement(i, s) {
      this._ensureNoahArkCondition(i), this.entries.unshift({
        type: t.Element,
        element: i,
        token: s
      });
    }
    insertElementAfterBookmark(i, s) {
      const o = this.entries.indexOf(this.bookmark);
      this.entries.splice(o, 0, {
        type: t.Element,
        element: i,
        token: s
      });
    }
    removeEntry(i) {
      const s = this.entries.indexOf(i);
      s >= 0 && this.entries.splice(s, 1);
    }
    /**
     * Clears the list of formatting elements up to the last marker.
     *
     * @see https://html.spec.whatwg.org/multipage/parsing.html#clear-the-list-of-active-formatting-elements-up-to-the-last-marker
     */
    clearToLastMarker() {
      const i = this.entries.indexOf(r);
      i >= 0 ? this.entries.splice(0, i + 1) : this.entries.length = 0;
    }
    //Search
    getElementEntryInScopeWithTagName(i) {
      const s = this.entries.find((o) => o.type === t.Marker || this.treeAdapter.getTagName(o.element) === i);
      return s && s.type === t.Element ? s : null;
    }
    getElementEntry(i) {
      return this.entries.find((s) => s.type === t.Element && s.element === i);
    }
  }
  e.FormattingElementList = a;
})(Rl);
var en = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.defaultTreeAdapter = void 0;
  const u = ct;
  function t(r) {
    return {
      nodeName: "#text",
      value: r,
      parentNode: null
    };
  }
  e.defaultTreeAdapter = {
    //Node construction
    createDocument() {
      return {
        nodeName: "#document",
        mode: u.DOCUMENT_MODE.NO_QUIRKS,
        childNodes: []
      };
    },
    createDocumentFragment() {
      return {
        nodeName: "#document-fragment",
        childNodes: []
      };
    },
    createElement(r, a, n) {
      return {
        nodeName: r,
        tagName: r,
        attrs: n,
        namespaceURI: a,
        childNodes: [],
        parentNode: null
      };
    },
    createCommentNode(r) {
      return {
        nodeName: "#comment",
        data: r,
        parentNode: null
      };
    },
    //Tree mutation
    appendChild(r, a) {
      r.childNodes.push(a), a.parentNode = r;
    },
    insertBefore(r, a, n) {
      const i = r.childNodes.indexOf(n);
      r.childNodes.splice(i, 0, a), a.parentNode = r;
    },
    setTemplateContent(r, a) {
      r.content = a;
    },
    getTemplateContent(r) {
      return r.content;
    },
    setDocumentType(r, a, n, i) {
      const s = r.childNodes.find((o) => o.nodeName === "#documentType");
      if (s)
        s.name = a, s.publicId = n, s.systemId = i;
      else {
        const o = {
          nodeName: "#documentType",
          name: a,
          publicId: n,
          systemId: i,
          parentNode: null
        };
        e.defaultTreeAdapter.appendChild(r, o);
      }
    },
    setDocumentMode(r, a) {
      r.mode = a;
    },
    getDocumentMode(r) {
      return r.mode;
    },
    detachNode(r) {
      if (r.parentNode) {
        const a = r.parentNode.childNodes.indexOf(r);
        r.parentNode.childNodes.splice(a, 1), r.parentNode = null;
      }
    },
    insertText(r, a) {
      if (r.childNodes.length > 0) {
        const n = r.childNodes[r.childNodes.length - 1];
        if (e.defaultTreeAdapter.isTextNode(n)) {
          n.value += a;
          return;
        }
      }
      e.defaultTreeAdapter.appendChild(r, t(a));
    },
    insertTextBefore(r, a, n) {
      const i = r.childNodes[r.childNodes.indexOf(n) - 1];
      i && e.defaultTreeAdapter.isTextNode(i) ? i.value += a : e.defaultTreeAdapter.insertBefore(r, t(a), n);
    },
    adoptAttributes(r, a) {
      const n = new Set(r.attrs.map((i) => i.name));
      for (let i = 0; i < a.length; i++)
        n.has(a[i].name) || r.attrs.push(a[i]);
    },
    //Tree traversing
    getFirstChild(r) {
      return r.childNodes[0];
    },
    getChildNodes(r) {
      return r.childNodes;
    },
    getParentNode(r) {
      return r.parentNode;
    },
    getAttrList(r) {
      return r.attrs;
    },
    //Node data
    getTagName(r) {
      return r.tagName;
    },
    getNamespaceURI(r) {
      return r.namespaceURI;
    },
    getTextNodeContent(r) {
      return r.value;
    },
    getCommentNodeContent(r) {
      return r.data;
    },
    getDocumentTypeNodeName(r) {
      return r.name;
    },
    getDocumentTypeNodePublicId(r) {
      return r.publicId;
    },
    getDocumentTypeNodeSystemId(r) {
      return r.systemId;
    },
    //Node types
    isTextNode(r) {
      return r.nodeName === "#text";
    },
    isCommentNode(r) {
      return r.nodeName === "#comment";
    },
    isDocumentTypeNode(r) {
      return r.nodeName === "#documentType";
    },
    isElementNode(r) {
      return Object.prototype.hasOwnProperty.call(r, "tagName");
    },
    // Source code location
    setNodeSourceCodeLocation(r, a) {
      r.sourceCodeLocation = a;
    },
    getNodeSourceCodeLocation(r) {
      return r.sourceCodeLocation;
    },
    updateNodeSourceCodeLocation(r, a) {
      r.sourceCodeLocation = Object.assign(Object.assign({}, r.sourceCodeLocation), a);
    }
  };
})(en);
var A0 = {};
Object.defineProperty(A0, "__esModule", { value: !0 });
A0.getDocumentMode = A0.isConforming = void 0;
const Qt = ct, Ml = "html", zp = "about:legacy-compat", Qp = "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd", kl = [
  "+//silmaril//dtd html pro v0r11 19970101//",
  "-//as//dtd html 3.0 aswedit + extensions//",
  "-//advasoft ltd//dtd html 3.0 aswedit + extensions//",
  "-//ietf//dtd html 2.0 level 1//",
  "-//ietf//dtd html 2.0 level 2//",
  "-//ietf//dtd html 2.0 strict level 1//",
  "-//ietf//dtd html 2.0 strict level 2//",
  "-//ietf//dtd html 2.0 strict//",
  "-//ietf//dtd html 2.0//",
  "-//ietf//dtd html 2.1e//",
  "-//ietf//dtd html 3.0//",
  "-//ietf//dtd html 3.2 final//",
  "-//ietf//dtd html 3.2//",
  "-//ietf//dtd html 3//",
  "-//ietf//dtd html level 0//",
  "-//ietf//dtd html level 1//",
  "-//ietf//dtd html level 2//",
  "-//ietf//dtd html level 3//",
  "-//ietf//dtd html strict level 0//",
  "-//ietf//dtd html strict level 1//",
  "-//ietf//dtd html strict level 2//",
  "-//ietf//dtd html strict level 3//",
  "-//ietf//dtd html strict//",
  "-//ietf//dtd html//",
  "-//metrius//dtd metrius presentational//",
  "-//microsoft//dtd internet explorer 2.0 html strict//",
  "-//microsoft//dtd internet explorer 2.0 html//",
  "-//microsoft//dtd internet explorer 2.0 tables//",
  "-//microsoft//dtd internet explorer 3.0 html strict//",
  "-//microsoft//dtd internet explorer 3.0 html//",
  "-//microsoft//dtd internet explorer 3.0 tables//",
  "-//netscape comm. corp.//dtd html//",
  "-//netscape comm. corp.//dtd strict html//",
  "-//o'reilly and associates//dtd html 2.0//",
  "-//o'reilly and associates//dtd html extended 1.0//",
  "-//o'reilly and associates//dtd html extended relaxed 1.0//",
  "-//sq//dtd html 2.0 hotmetal + extensions//",
  "-//softquad software//dtd hotmetal pro 6.0::19990601::extensions to html 4.0//",
  "-//softquad//dtd hotmetal pro 4.0::19971010::extensions to html 4.0//",
  "-//spyglass//dtd html 2.0 extended//",
  "-//sun microsystems corp.//dtd hotjava html//",
  "-//sun microsystems corp.//dtd hotjava strict html//",
  "-//w3c//dtd html 3 1995-03-24//",
  "-//w3c//dtd html 3.2 draft//",
  "-//w3c//dtd html 3.2 final//",
  "-//w3c//dtd html 3.2//",
  "-//w3c//dtd html 3.2s draft//",
  "-//w3c//dtd html 4.0 frameset//",
  "-//w3c//dtd html 4.0 transitional//",
  "-//w3c//dtd html experimental 19960712//",
  "-//w3c//dtd html experimental 970421//",
  "-//w3c//dtd w3 html//",
  "-//w3o//dtd w3 html 3.0//",
  "-//webtechs//dtd mozilla html 2.0//",
  "-//webtechs//dtd mozilla html//"
], Kp = [
  ...kl,
  "-//w3c//dtd html 4.01 frameset//",
  "-//w3c//dtd html 4.01 transitional//"
], Jp = /* @__PURE__ */ new Set([
  "-//w3o//dtd w3 html strict 3.0//en//",
  "-/w3c/dtd html 4.0 transitional/en",
  "html"
]), Bl = ["-//w3c//dtd xhtml 1.0 frameset//", "-//w3c//dtd xhtml 1.0 transitional//"], Zp = [
  ...Bl,
  "-//w3c//dtd html 4.01 frameset//",
  "-//w3c//dtd html 4.01 transitional//"
];
function Ts(e, u) {
  return u.some((t) => e.startsWith(t));
}
function e4(e) {
  return e.name === Ml && e.publicId === null && (e.systemId === null || e.systemId === zp);
}
A0.isConforming = e4;
function u4(e) {
  if (e.name !== Ml)
    return Qt.DOCUMENT_MODE.QUIRKS;
  const { systemId: u } = e;
  if (u && u.toLowerCase() === Qp)
    return Qt.DOCUMENT_MODE.QUIRKS;
  let { publicId: t } = e;
  if (t !== null) {
    if (t = t.toLowerCase(), Jp.has(t))
      return Qt.DOCUMENT_MODE.QUIRKS;
    let r = u === null ? Kp : kl;
    if (Ts(t, r))
      return Qt.DOCUMENT_MODE.QUIRKS;
    if (r = u === null ? Bl : Zp, Ts(t, r))
      return Qt.DOCUMENT_MODE.LIMITED_QUIRKS;
  }
  return Qt.DOCUMENT_MODE.NO_QUIRKS;
}
A0.getDocumentMode = u4;
var yc = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.isIntegrationPoint = e.adjustTokenSVGTagName = e.adjustTokenXMLAttrs = e.adjustTokenSVGAttrs = e.adjustTokenMathMLAttrs = e.causesExit = e.SVG_TAG_NAMES_ADJUSTMENT_MAP = void 0;
  const u = ct, t = {
    TEXT_HTML: "text/html",
    APPLICATION_XML: "application/xhtml+xml"
  }, r = "definitionurl", a = "definitionURL", n = new Map([
    "attributeName",
    "attributeType",
    "baseFrequency",
    "baseProfile",
    "calcMode",
    "clipPathUnits",
    "diffuseConstant",
    "edgeMode",
    "filterUnits",
    "glyphRef",
    "gradientTransform",
    "gradientUnits",
    "kernelMatrix",
    "kernelUnitLength",
    "keyPoints",
    "keySplines",
    "keyTimes",
    "lengthAdjust",
    "limitingConeAngle",
    "markerHeight",
    "markerUnits",
    "markerWidth",
    "maskContentUnits",
    "maskUnits",
    "numOctaves",
    "pathLength",
    "patternContentUnits",
    "patternTransform",
    "patternUnits",
    "pointsAtX",
    "pointsAtY",
    "pointsAtZ",
    "preserveAlpha",
    "preserveAspectRatio",
    "primitiveUnits",
    "refX",
    "refY",
    "repeatCount",
    "repeatDur",
    "requiredExtensions",
    "requiredFeatures",
    "specularConstant",
    "specularExponent",
    "spreadMethod",
    "startOffset",
    "stdDeviation",
    "stitchTiles",
    "surfaceScale",
    "systemLanguage",
    "tableValues",
    "targetX",
    "targetY",
    "textLength",
    "viewBox",
    "viewTarget",
    "xChannelSelector",
    "yChannelSelector",
    "zoomAndPan"
  ].map((N) => [N.toLowerCase(), N])), i = /* @__PURE__ */ new Map([
    ["xlink:actuate", { prefix: "xlink", name: "actuate", namespace: u.NS.XLINK }],
    ["xlink:arcrole", { prefix: "xlink", name: "arcrole", namespace: u.NS.XLINK }],
    ["xlink:href", { prefix: "xlink", name: "href", namespace: u.NS.XLINK }],
    ["xlink:role", { prefix: "xlink", name: "role", namespace: u.NS.XLINK }],
    ["xlink:show", { prefix: "xlink", name: "show", namespace: u.NS.XLINK }],
    ["xlink:title", { prefix: "xlink", name: "title", namespace: u.NS.XLINK }],
    ["xlink:type", { prefix: "xlink", name: "type", namespace: u.NS.XLINK }],
    ["xml:base", { prefix: "xml", name: "base", namespace: u.NS.XML }],
    ["xml:lang", { prefix: "xml", name: "lang", namespace: u.NS.XML }],
    ["xml:space", { prefix: "xml", name: "space", namespace: u.NS.XML }],
    ["xmlns", { prefix: "", name: "xmlns", namespace: u.NS.XMLNS }],
    ["xmlns:xlink", { prefix: "xmlns", name: "xlink", namespace: u.NS.XMLNS }]
  ]);
  e.SVG_TAG_NAMES_ADJUSTMENT_MAP = new Map([
    "altGlyph",
    "altGlyphDef",
    "altGlyphItem",
    "animateColor",
    "animateMotion",
    "animateTransform",
    "clipPath",
    "feBlend",
    "feColorMatrix",
    "feComponentTransfer",
    "feComposite",
    "feConvolveMatrix",
    "feDiffuseLighting",
    "feDisplacementMap",
    "feDistantLight",
    "feFlood",
    "feFuncA",
    "feFuncB",
    "feFuncG",
    "feFuncR",
    "feGaussianBlur",
    "feImage",
    "feMerge",
    "feMergeNode",
    "feMorphology",
    "feOffset",
    "fePointLight",
    "feSpecularLighting",
    "feSpotLight",
    "feTile",
    "feTurbulence",
    "foreignObject",
    "glyphRef",
    "linearGradient",
    "radialGradient",
    "textPath"
  ].map((N) => [N.toLowerCase(), N]));
  const s = /* @__PURE__ */ new Set([
    u.TAG_ID.B,
    u.TAG_ID.BIG,
    u.TAG_ID.BLOCKQUOTE,
    u.TAG_ID.BODY,
    u.TAG_ID.BR,
    u.TAG_ID.CENTER,
    u.TAG_ID.CODE,
    u.TAG_ID.DD,
    u.TAG_ID.DIV,
    u.TAG_ID.DL,
    u.TAG_ID.DT,
    u.TAG_ID.EM,
    u.TAG_ID.EMBED,
    u.TAG_ID.H1,
    u.TAG_ID.H2,
    u.TAG_ID.H3,
    u.TAG_ID.H4,
    u.TAG_ID.H5,
    u.TAG_ID.H6,
    u.TAG_ID.HEAD,
    u.TAG_ID.HR,
    u.TAG_ID.I,
    u.TAG_ID.IMG,
    u.TAG_ID.LI,
    u.TAG_ID.LISTING,
    u.TAG_ID.MENU,
    u.TAG_ID.META,
    u.TAG_ID.NOBR,
    u.TAG_ID.OL,
    u.TAG_ID.P,
    u.TAG_ID.PRE,
    u.TAG_ID.RUBY,
    u.TAG_ID.S,
    u.TAG_ID.SMALL,
    u.TAG_ID.SPAN,
    u.TAG_ID.STRONG,
    u.TAG_ID.STRIKE,
    u.TAG_ID.SUB,
    u.TAG_ID.SUP,
    u.TAG_ID.TABLE,
    u.TAG_ID.TT,
    u.TAG_ID.U,
    u.TAG_ID.UL,
    u.TAG_ID.VAR
  ]);
  function o(N) {
    const O = N.tagID;
    return O === u.TAG_ID.FONT && N.attrs.some(({ name: H }) => H === u.ATTRS.COLOR || H === u.ATTRS.SIZE || H === u.ATTRS.FACE) || s.has(O);
  }
  e.causesExit = o;
  function d(N) {
    for (let O = 0; O < N.attrs.length; O++)
      if (N.attrs[O].name === r) {
        N.attrs[O].name = a;
        break;
      }
  }
  e.adjustTokenMathMLAttrs = d;
  function c(N) {
    for (let O = 0; O < N.attrs.length; O++) {
      const w = n.get(N.attrs[O].name);
      w != null && (N.attrs[O].name = w);
    }
  }
  e.adjustTokenSVGAttrs = c;
  function E(N) {
    for (let O = 0; O < N.attrs.length; O++) {
      const w = i.get(N.attrs[O].name);
      w && (N.attrs[O].prefix = w.prefix, N.attrs[O].name = w.name, N.attrs[O].namespace = w.namespace);
    }
  }
  e.adjustTokenXMLAttrs = E;
  function f(N) {
    const O = e.SVG_TAG_NAMES_ADJUSTMENT_MAP.get(N.tagName);
    O != null && (N.tagName = O, N.tagID = (0, u.getTagID)(N.tagName));
  }
  e.adjustTokenSVGTagName = f;
  function m(N, O) {
    return O === u.NS.MATHML && (N === u.TAG_ID.MI || N === u.TAG_ID.MO || N === u.TAG_ID.MN || N === u.TAG_ID.MS || N === u.TAG_ID.MTEXT);
  }
  function v(N, O, w) {
    if (O === u.NS.MATHML && N === u.TAG_ID.ANNOTATION_XML) {
      for (let H = 0; H < w.length; H++)
        if (w[H].name === u.ATTRS.ENCODING) {
          const k = w[H].value.toLowerCase();
          return k === t.TEXT_HTML || k === t.APPLICATION_XML;
        }
    }
    return O === u.NS.SVG && (N === u.TAG_ID.FOREIGN_OBJECT || N === u.TAG_ID.DESC || N === u.TAG_ID.TITLE);
  }
  function L(N, O, w, H) {
    return (!H || H === u.NS.HTML) && v(N, O, w) || (!H || H === u.NS.MATHML) && m(N, O);
  }
  e.isIntegrationPoint = L;
})(yc);
Object.defineProperty(ur, "__esModule", { value: !0 });
ur.Parser = void 0;
const eu = kt, t4 = Za, _s = Rl, r4 = en, ys = A0, $u = yc, Xe = yr, Ul = Ka, b = ct, He = Ja, a4 = "hidden", n4 = 8, i4 = 3;
var S;
(function(e) {
  e[e.INITIAL = 0] = "INITIAL", e[e.BEFORE_HTML = 1] = "BEFORE_HTML", e[e.BEFORE_HEAD = 2] = "BEFORE_HEAD", e[e.IN_HEAD = 3] = "IN_HEAD", e[e.IN_HEAD_NO_SCRIPT = 4] = "IN_HEAD_NO_SCRIPT", e[e.AFTER_HEAD = 5] = "AFTER_HEAD", e[e.IN_BODY = 6] = "IN_BODY", e[e.TEXT = 7] = "TEXT", e[e.IN_TABLE = 8] = "IN_TABLE", e[e.IN_TABLE_TEXT = 9] = "IN_TABLE_TEXT", e[e.IN_CAPTION = 10] = "IN_CAPTION", e[e.IN_COLUMN_GROUP = 11] = "IN_COLUMN_GROUP", e[e.IN_TABLE_BODY = 12] = "IN_TABLE_BODY", e[e.IN_ROW = 13] = "IN_ROW", e[e.IN_CELL = 14] = "IN_CELL", e[e.IN_SELECT = 15] = "IN_SELECT", e[e.IN_SELECT_IN_TABLE = 16] = "IN_SELECT_IN_TABLE", e[e.IN_TEMPLATE = 17] = "IN_TEMPLATE", e[e.AFTER_BODY = 18] = "AFTER_BODY", e[e.IN_FRAMESET = 19] = "IN_FRAMESET", e[e.AFTER_FRAMESET = 20] = "AFTER_FRAMESET", e[e.AFTER_AFTER_BODY = 21] = "AFTER_AFTER_BODY", e[e.AFTER_AFTER_FRAMESET = 22] = "AFTER_AFTER_FRAMESET";
})(S || (S = {}));
const c4 = {
  startLine: -1,
  startCol: -1,
  startOffset: -1,
  endLine: -1,
  endCol: -1,
  endOffset: -1
}, Hl = /* @__PURE__ */ new Set([b.TAG_ID.TABLE, b.TAG_ID.TBODY, b.TAG_ID.TFOOT, b.TAG_ID.THEAD, b.TAG_ID.TR]), As = {
  scriptingEnabled: !0,
  sourceCodeLocationInfo: !1,
  treeAdapter: r4.defaultTreeAdapter,
  onParseError: null
};
let s4 = class {
  constructor(u, t, r = null, a = null) {
    this.fragmentContext = r, this.scriptHandler = a, this.currentToken = null, this.stopped = !1, this.insertionMode = S.INITIAL, this.originalInsertionMode = S.INITIAL, this.headElement = null, this.formElement = null, this.currentNotInHTML = !1, this.tmplInsertionModeStack = [], this.pendingCharacterTokens = [], this.hasNonWhitespacePendingCharacterToken = !1, this.framesetOk = !0, this.skipNextNewLine = !1, this.fosterParentingEnabled = !1, this.options = Object.assign(Object.assign({}, As), u), this.treeAdapter = this.options.treeAdapter, this.onParseError = this.options.onParseError, this.onParseError && (this.options.sourceCodeLocationInfo = !0), this.document = t ?? this.treeAdapter.createDocument(), this.tokenizer = new eu.Tokenizer(this.options, this), this.activeFormattingElements = new _s.FormattingElementList(this.treeAdapter), this.fragmentContextID = r ? (0, b.getTagID)(this.treeAdapter.getTagName(r)) : b.TAG_ID.UNKNOWN, this._setContextModes(r ?? this.document, this.fragmentContextID), this.openElements = new t4.OpenElementStack(this.document, this.treeAdapter, this);
  }
  // API
  static parse(u, t) {
    const r = new this(t);
    return r.tokenizer.write(u, !0), r.document;
  }
  static getFragmentParser(u, t) {
    const r = Object.assign(Object.assign({}, As), t);
    u ?? (u = r.treeAdapter.createElement(b.TAG_NAMES.TEMPLATE, b.NS.HTML, []));
    const a = r.treeAdapter.createElement("documentmock", b.NS.HTML, []), n = new this(r, a, u);
    return n.fragmentContextID === b.TAG_ID.TEMPLATE && n.tmplInsertionModeStack.unshift(S.IN_TEMPLATE), n._initTokenizerForFragmentParsing(), n._insertFakeRootElement(), n._resetInsertionMode(), n._findFormInFragmentContext(), n;
  }
  getFragment() {
    const u = this.treeAdapter.getFirstChild(this.document), t = this.treeAdapter.createDocumentFragment();
    return this._adoptNodes(u, t), t;
  }
  //Errors
  _err(u, t, r) {
    var a;
    if (!this.onParseError)
      return;
    const n = (a = u.location) !== null && a !== void 0 ? a : c4, i = {
      code: t,
      startLine: n.startLine,
      startCol: n.startCol,
      startOffset: n.startOffset,
      endLine: r ? n.startLine : n.endLine,
      endCol: r ? n.startCol : n.endCol,
      endOffset: r ? n.startOffset : n.endOffset
    };
    this.onParseError(i);
  }
  //Stack events
  onItemPush(u, t, r) {
    var a, n;
    (n = (a = this.treeAdapter).onItemPush) === null || n === void 0 || n.call(a, u), r && this.openElements.stackTop > 0 && this._setContextModes(u, t);
  }
  onItemPop(u, t) {
    var r, a;
    if (this.options.sourceCodeLocationInfo && this._setEndLocation(u, this.currentToken), (a = (r = this.treeAdapter).onItemPop) === null || a === void 0 || a.call(r, u, this.openElements.current), t) {
      let n, i;
      this.openElements.stackTop === 0 && this.fragmentContext ? (n = this.fragmentContext, i = this.fragmentContextID) : { current: n, currentTagId: i } = this.openElements, this._setContextModes(n, i);
    }
  }
  _setContextModes(u, t) {
    const r = u === this.document || this.treeAdapter.getNamespaceURI(u) === b.NS.HTML;
    this.currentNotInHTML = !r, this.tokenizer.inForeignNode = !r && !this._isIntegrationPoint(t, u);
  }
  _switchToTextParsing(u, t) {
    this._insertElement(u, b.NS.HTML), this.tokenizer.state = t, this.originalInsertionMode = this.insertionMode, this.insertionMode = S.TEXT;
  }
  switchToPlaintextParsing() {
    this.insertionMode = S.TEXT, this.originalInsertionMode = S.IN_BODY, this.tokenizer.state = eu.TokenizerMode.PLAINTEXT;
  }
  //Fragment parsing
  _getAdjustedCurrentElement() {
    return this.openElements.stackTop === 0 && this.fragmentContext ? this.fragmentContext : this.openElements.current;
  }
  _findFormInFragmentContext() {
    let u = this.fragmentContext;
    for (; u; ) {
      if (this.treeAdapter.getTagName(u) === b.TAG_NAMES.FORM) {
        this.formElement = u;
        break;
      }
      u = this.treeAdapter.getParentNode(u);
    }
  }
  _initTokenizerForFragmentParsing() {
    if (!(!this.fragmentContext || this.treeAdapter.getNamespaceURI(this.fragmentContext) !== b.NS.HTML))
      switch (this.fragmentContextID) {
        case b.TAG_ID.TITLE:
        case b.TAG_ID.TEXTAREA: {
          this.tokenizer.state = eu.TokenizerMode.RCDATA;
          break;
        }
        case b.TAG_ID.STYLE:
        case b.TAG_ID.XMP:
        case b.TAG_ID.IFRAME:
        case b.TAG_ID.NOEMBED:
        case b.TAG_ID.NOFRAMES:
        case b.TAG_ID.NOSCRIPT: {
          this.tokenizer.state = eu.TokenizerMode.RAWTEXT;
          break;
        }
        case b.TAG_ID.SCRIPT: {
          this.tokenizer.state = eu.TokenizerMode.SCRIPT_DATA;
          break;
        }
        case b.TAG_ID.PLAINTEXT: {
          this.tokenizer.state = eu.TokenizerMode.PLAINTEXT;
          break;
        }
      }
  }
  //Tree mutation
  _setDocumentType(u) {
    const t = u.name || "", r = u.publicId || "", a = u.systemId || "";
    if (this.treeAdapter.setDocumentType(this.document, t, r, a), u.location) {
      const i = this.treeAdapter.getChildNodes(this.document).find((s) => this.treeAdapter.isDocumentTypeNode(s));
      i && this.treeAdapter.setNodeSourceCodeLocation(i, u.location);
    }
  }
  _attachElementToTree(u, t) {
    if (this.options.sourceCodeLocationInfo) {
      const r = t && Object.assign(Object.assign({}, t), { startTag: t });
      this.treeAdapter.setNodeSourceCodeLocation(u, r);
    }
    if (this._shouldFosterParentOnInsertion())
      this._fosterParentElement(u);
    else {
      const r = this.openElements.currentTmplContentOrNode;
      this.treeAdapter.appendChild(r, u);
    }
  }
  _appendElement(u, t) {
    const r = this.treeAdapter.createElement(u.tagName, t, u.attrs);
    this._attachElementToTree(r, u.location);
  }
  _insertElement(u, t) {
    const r = this.treeAdapter.createElement(u.tagName, t, u.attrs);
    this._attachElementToTree(r, u.location), this.openElements.push(r, u.tagID);
  }
  _insertFakeElement(u, t) {
    const r = this.treeAdapter.createElement(u, b.NS.HTML, []);
    this._attachElementToTree(r, null), this.openElements.push(r, t);
  }
  _insertTemplate(u) {
    const t = this.treeAdapter.createElement(u.tagName, b.NS.HTML, u.attrs), r = this.treeAdapter.createDocumentFragment();
    this.treeAdapter.setTemplateContent(t, r), this._attachElementToTree(t, u.location), this.openElements.push(t, u.tagID), this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(r, null);
  }
  _insertFakeRootElement() {
    const u = this.treeAdapter.createElement(b.TAG_NAMES.HTML, b.NS.HTML, []);
    this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(u, null), this.treeAdapter.appendChild(this.openElements.current, u), this.openElements.push(u, b.TAG_ID.HTML);
  }
  _appendCommentNode(u, t) {
    const r = this.treeAdapter.createCommentNode(u.data);
    this.treeAdapter.appendChild(t, r), this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(r, u.location);
  }
  _insertCharacters(u) {
    let t, r;
    if (this._shouldFosterParentOnInsertion() ? ({ parent: t, beforeElement: r } = this._findFosterParentingLocation(), r ? this.treeAdapter.insertTextBefore(t, u.chars, r) : this.treeAdapter.insertText(t, u.chars)) : (t = this.openElements.currentTmplContentOrNode, this.treeAdapter.insertText(t, u.chars)), !u.location)
      return;
    const a = this.treeAdapter.getChildNodes(t), n = r ? a.lastIndexOf(r) : a.length, i = a[n - 1];
    if (this.treeAdapter.getNodeSourceCodeLocation(i)) {
      const { endLine: o, endCol: d, endOffset: c } = u.location;
      this.treeAdapter.updateNodeSourceCodeLocation(i, { endLine: o, endCol: d, endOffset: c });
    } else
      this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(i, u.location);
  }
  _adoptNodes(u, t) {
    for (let r = this.treeAdapter.getFirstChild(u); r; r = this.treeAdapter.getFirstChild(u))
      this.treeAdapter.detachNode(r), this.treeAdapter.appendChild(t, r);
  }
  _setEndLocation(u, t) {
    if (this.treeAdapter.getNodeSourceCodeLocation(u) && t.location) {
      const r = t.location, a = this.treeAdapter.getTagName(u), n = (
        // NOTE: For cases like <p> <p> </p> - First 'p' closes without a closing
        // tag and for cases like <td> <p> </td> - 'p' closes without a closing tag.
        t.type === He.TokenType.END_TAG && a === t.tagName ? {
          endTag: Object.assign({}, r),
          endLine: r.endLine,
          endCol: r.endCol,
          endOffset: r.endOffset
        } : {
          endLine: r.startLine,
          endCol: r.startCol,
          endOffset: r.startOffset
        }
      );
      this.treeAdapter.updateNodeSourceCodeLocation(u, n);
    }
  }
  //Token processing
  shouldProcessStartTagTokenInForeignContent(u) {
    if (!this.currentNotInHTML)
      return !1;
    let t, r;
    return this.openElements.stackTop === 0 && this.fragmentContext ? (t = this.fragmentContext, r = this.fragmentContextID) : { current: t, currentTagId: r } = this.openElements, u.tagID === b.TAG_ID.SVG && this.treeAdapter.getTagName(t) === b.TAG_NAMES.ANNOTATION_XML && this.treeAdapter.getNamespaceURI(t) === b.NS.MATHML ? !1 : (
      // Check that `current` is not an integration point for HTML or MathML elements.
      this.tokenizer.inForeignNode || // If it _is_ an integration point, then we might have to check that it is not an HTML
      // integration point.
      (u.tagID === b.TAG_ID.MGLYPH || u.tagID === b.TAG_ID.MALIGNMARK) && !this._isIntegrationPoint(r, t, b.NS.HTML)
    );
  }
  _processToken(u) {
    switch (u.type) {
      case He.TokenType.CHARACTER: {
        this.onCharacter(u);
        break;
      }
      case He.TokenType.NULL_CHARACTER: {
        this.onNullCharacter(u);
        break;
      }
      case He.TokenType.COMMENT: {
        this.onComment(u);
        break;
      }
      case He.TokenType.DOCTYPE: {
        this.onDoctype(u);
        break;
      }
      case He.TokenType.START_TAG: {
        this._processStartTag(u);
        break;
      }
      case He.TokenType.END_TAG: {
        this.onEndTag(u);
        break;
      }
      case He.TokenType.EOF: {
        this.onEof(u);
        break;
      }
      case He.TokenType.WHITESPACE_CHARACTER: {
        this.onWhitespaceCharacter(u);
        break;
      }
    }
  }
  //Integration points
  _isIntegrationPoint(u, t, r) {
    const a = this.treeAdapter.getNamespaceURI(t), n = this.treeAdapter.getAttrList(t);
    return $u.isIntegrationPoint(u, a, n, r);
  }
  //Active formatting elements reconstruction
  _reconstructActiveFormattingElements() {
    const u = this.activeFormattingElements.entries.length;
    if (u) {
      const t = this.activeFormattingElements.entries.findIndex((a) => a.type === _s.EntryType.Marker || this.openElements.contains(a.element)), r = t < 0 ? u - 1 : t - 1;
      for (let a = r; a >= 0; a--) {
        const n = this.activeFormattingElements.entries[a];
        this._insertElement(n.token, this.treeAdapter.getNamespaceURI(n.element)), n.element = this.openElements.current;
      }
    }
  }
  //Close elements
  _closeTableCell() {
    this.openElements.generateImpliedEndTags(), this.openElements.popUntilTableCellPopped(), this.activeFormattingElements.clearToLastMarker(), this.insertionMode = S.IN_ROW;
  }
  _closePElement() {
    this.openElements.generateImpliedEndTagsWithExclusion(b.TAG_ID.P), this.openElements.popUntilTagNamePopped(b.TAG_ID.P);
  }
  //Insertion modes
  _resetInsertionMode() {
    for (let u = this.openElements.stackTop; u >= 0; u--)
      switch (u === 0 && this.fragmentContext ? this.fragmentContextID : this.openElements.tagIDs[u]) {
        case b.TAG_ID.TR: {
          this.insertionMode = S.IN_ROW;
          return;
        }
        case b.TAG_ID.TBODY:
        case b.TAG_ID.THEAD:
        case b.TAG_ID.TFOOT: {
          this.insertionMode = S.IN_TABLE_BODY;
          return;
        }
        case b.TAG_ID.CAPTION: {
          this.insertionMode = S.IN_CAPTION;
          return;
        }
        case b.TAG_ID.COLGROUP: {
          this.insertionMode = S.IN_COLUMN_GROUP;
          return;
        }
        case b.TAG_ID.TABLE: {
          this.insertionMode = S.IN_TABLE;
          return;
        }
        case b.TAG_ID.BODY: {
          this.insertionMode = S.IN_BODY;
          return;
        }
        case b.TAG_ID.FRAMESET: {
          this.insertionMode = S.IN_FRAMESET;
          return;
        }
        case b.TAG_ID.SELECT: {
          this._resetInsertionModeForSelect(u);
          return;
        }
        case b.TAG_ID.TEMPLATE: {
          this.insertionMode = this.tmplInsertionModeStack[0];
          return;
        }
        case b.TAG_ID.HTML: {
          this.insertionMode = this.headElement ? S.AFTER_HEAD : S.BEFORE_HEAD;
          return;
        }
        case b.TAG_ID.TD:
        case b.TAG_ID.TH: {
          if (u > 0) {
            this.insertionMode = S.IN_CELL;
            return;
          }
          break;
        }
        case b.TAG_ID.HEAD: {
          if (u > 0) {
            this.insertionMode = S.IN_HEAD;
            return;
          }
          break;
        }
      }
    this.insertionMode = S.IN_BODY;
  }
  _resetInsertionModeForSelect(u) {
    if (u > 0)
      for (let t = u - 1; t > 0; t--) {
        const r = this.openElements.tagIDs[t];
        if (r === b.TAG_ID.TEMPLATE)
          break;
        if (r === b.TAG_ID.TABLE) {
          this.insertionMode = S.IN_SELECT_IN_TABLE;
          return;
        }
      }
    this.insertionMode = S.IN_SELECT;
  }
  //Foster parenting
  _isElementCausesFosterParenting(u) {
    return Hl.has(u);
  }
  _shouldFosterParentOnInsertion() {
    return this.fosterParentingEnabled && this._isElementCausesFosterParenting(this.openElements.currentTagId);
  }
  _findFosterParentingLocation() {
    for (let u = this.openElements.stackTop; u >= 0; u--) {
      const t = this.openElements.items[u];
      switch (this.openElements.tagIDs[u]) {
        case b.TAG_ID.TEMPLATE: {
          if (this.treeAdapter.getNamespaceURI(t) === b.NS.HTML)
            return { parent: this.treeAdapter.getTemplateContent(t), beforeElement: null };
          break;
        }
        case b.TAG_ID.TABLE: {
          const r = this.treeAdapter.getParentNode(t);
          return r ? { parent: r, beforeElement: t } : { parent: this.openElements.items[u - 1], beforeElement: null };
        }
      }
    }
    return { parent: this.openElements.items[0], beforeElement: null };
  }
  _fosterParentElement(u) {
    const t = this._findFosterParentingLocation();
    t.beforeElement ? this.treeAdapter.insertBefore(t.parent, u, t.beforeElement) : this.treeAdapter.appendChild(t.parent, u);
  }
  //Special elements
  _isSpecialElement(u, t) {
    const r = this.treeAdapter.getNamespaceURI(u);
    return b.SPECIAL_ELEMENTS[r].has(t);
  }
  onCharacter(u) {
    if (this.skipNextNewLine = !1, this.tokenizer.inForeignNode) {
      Um(this, u);
      return;
    }
    switch (this.insertionMode) {
      case S.INITIAL: {
        M0(this, u);
        break;
      }
      case S.BEFORE_HTML: {
        V0(this, u);
        break;
      }
      case S.BEFORE_HEAD: {
        Y0(this, u);
        break;
      }
      case S.IN_HEAD: {
        W0(this, u);
        break;
      }
      case S.IN_HEAD_NO_SCRIPT: {
        X0(this, u);
        break;
      }
      case S.AFTER_HEAD: {
        z0(this, u);
        break;
      }
      case S.IN_BODY:
      case S.IN_CAPTION:
      case S.IN_CELL:
      case S.IN_TEMPLATE: {
        ql(this, u);
        break;
      }
      case S.TEXT:
      case S.IN_SELECT:
      case S.IN_SELECT_IN_TABLE: {
        this._insertCharacters(u);
        break;
      }
      case S.IN_TABLE:
      case S.IN_TABLE_BODY:
      case S.IN_ROW: {
        Pn(this, u);
        break;
      }
      case S.IN_TABLE_TEXT: {
        Wl(this, u);
        break;
      }
      case S.IN_COLUMN_GROUP: {
        ga(this, u);
        break;
      }
      case S.AFTER_BODY: {
        Ea(this, u);
        break;
      }
      case S.AFTER_AFTER_BODY: {
        Xr(this, u);
        break;
      }
    }
  }
  onNullCharacter(u) {
    if (this.skipNextNewLine = !1, this.tokenizer.inForeignNode) {
      Bm(this, u);
      return;
    }
    switch (this.insertionMode) {
      case S.INITIAL: {
        M0(this, u);
        break;
      }
      case S.BEFORE_HTML: {
        V0(this, u);
        break;
      }
      case S.BEFORE_HEAD: {
        Y0(this, u);
        break;
      }
      case S.IN_HEAD: {
        W0(this, u);
        break;
      }
      case S.IN_HEAD_NO_SCRIPT: {
        X0(this, u);
        break;
      }
      case S.AFTER_HEAD: {
        z0(this, u);
        break;
      }
      case S.TEXT: {
        this._insertCharacters(u);
        break;
      }
      case S.IN_TABLE:
      case S.IN_TABLE_BODY:
      case S.IN_ROW: {
        Pn(this, u);
        break;
      }
      case S.IN_COLUMN_GROUP: {
        ga(this, u);
        break;
      }
      case S.AFTER_BODY: {
        Ea(this, u);
        break;
      }
      case S.AFTER_AFTER_BODY: {
        Xr(this, u);
        break;
      }
    }
  }
  onComment(u) {
    if (this.skipNextNewLine = !1, this.currentNotInHTML) {
      Ai(this, u);
      return;
    }
    switch (this.insertionMode) {
      case S.INITIAL:
      case S.BEFORE_HTML:
      case S.BEFORE_HEAD:
      case S.IN_HEAD:
      case S.IN_HEAD_NO_SCRIPT:
      case S.AFTER_HEAD:
      case S.IN_BODY:
      case S.IN_TABLE:
      case S.IN_CAPTION:
      case S.IN_COLUMN_GROUP:
      case S.IN_TABLE_BODY:
      case S.IN_ROW:
      case S.IN_CELL:
      case S.IN_SELECT:
      case S.IN_SELECT_IN_TABLE:
      case S.IN_TEMPLATE:
      case S.IN_FRAMESET:
      case S.AFTER_FRAMESET: {
        Ai(this, u);
        break;
      }
      case S.IN_TABLE_TEXT: {
        k0(this, u);
        break;
      }
      case S.AFTER_BODY: {
        p4(this, u);
        break;
      }
      case S.AFTER_AFTER_BODY:
      case S.AFTER_AFTER_FRAMESET: {
        m4(this, u);
        break;
      }
    }
  }
  onDoctype(u) {
    switch (this.skipNextNewLine = !1, this.insertionMode) {
      case S.INITIAL: {
        g4(this, u);
        break;
      }
      case S.BEFORE_HEAD:
      case S.IN_HEAD:
      case S.IN_HEAD_NO_SCRIPT:
      case S.AFTER_HEAD: {
        this._err(u, Xe.ERR.misplacedDoctype);
        break;
      }
      case S.IN_TABLE_TEXT: {
        k0(this, u);
        break;
      }
    }
  }
  onStartTag(u) {
    this.skipNextNewLine = !1, this.currentToken = u, this._processStartTag(u), u.selfClosing && !u.ackSelfClosing && this._err(u, Xe.ERR.nonVoidHtmlElementStartTagWithTrailingSolidus);
  }
  /**
   * Processes a given start tag.
   *
   * `onStartTag` checks if a self-closing tag was recognized. When a token
   * is moved inbetween multiple insertion modes, this check for self-closing
   * could lead to false positives. To avoid this, `_processStartTag` is used
   * for nested calls.
   *
   * @param token The token to process.
   */
  _processStartTag(u) {
    this.shouldProcessStartTagTokenInForeignContent(u) ? Hm(this, u) : this._startTagOutsideForeignContent(u);
  }
  _startTagOutsideForeignContent(u) {
    switch (this.insertionMode) {
      case S.INITIAL: {
        M0(this, u);
        break;
      }
      case S.BEFORE_HTML: {
        E4(this, u);
        break;
      }
      case S.BEFORE_HEAD: {
        _4(this, u);
        break;
      }
      case S.IN_HEAD: {
        Bu(this, u);
        break;
      }
      case S.IN_HEAD_NO_SCRIPT: {
        v4(this, u);
        break;
      }
      case S.AFTER_HEAD: {
        N4(this, u);
        break;
      }
      case S.IN_BODY: {
        ze(this, u);
        break;
      }
      case S.IN_TABLE: {
        v0(this, u);
        break;
      }
      case S.IN_TABLE_TEXT: {
        k0(this, u);
        break;
      }
      case S.IN_CAPTION: {
        ym(this, u);
        break;
      }
      case S.IN_COLUMN_GROUP: {
        xc(this, u);
        break;
      }
      case S.IN_TABLE_BODY: {
        rn(this, u);
        break;
      }
      case S.IN_ROW: {
        an(this, u);
        break;
      }
      case S.IN_CELL: {
        xm(this, u);
        break;
      }
      case S.IN_SELECT: {
        Ql(this, u);
        break;
      }
      case S.IN_SELECT_IN_TABLE: {
        Im(this, u);
        break;
      }
      case S.IN_TEMPLATE: {
        Cm(this, u);
        break;
      }
      case S.AFTER_BODY: {
        Om(this, u);
        break;
      }
      case S.IN_FRAMESET: {
        Lm(this, u);
        break;
      }
      case S.AFTER_FRAMESET: {
        wm(this, u);
        break;
      }
      case S.AFTER_AFTER_BODY: {
        Mm(this, u);
        break;
      }
      case S.AFTER_AFTER_FRAMESET: {
        km(this, u);
        break;
      }
    }
  }
  onEndTag(u) {
    this.skipNextNewLine = !1, this.currentToken = u, this.currentNotInHTML ? Fm(this, u) : this._endTagOutsideForeignContent(u);
  }
  _endTagOutsideForeignContent(u) {
    switch (this.insertionMode) {
      case S.INITIAL: {
        M0(this, u);
        break;
      }
      case S.BEFORE_HTML: {
        T4(this, u);
        break;
      }
      case S.BEFORE_HEAD: {
        y4(this, u);
        break;
      }
      case S.IN_HEAD: {
        A4(this, u);
        break;
      }
      case S.IN_HEAD_NO_SCRIPT: {
        x4(this, u);
        break;
      }
      case S.AFTER_HEAD: {
        I4(this, u);
        break;
      }
      case S.IN_BODY: {
        tn(this, u);
        break;
      }
      case S.TEXT: {
        lm(this, u);
        break;
      }
      case S.IN_TABLE: {
        tr(this, u);
        break;
      }
      case S.IN_TABLE_TEXT: {
        k0(this, u);
        break;
      }
      case S.IN_CAPTION: {
        Am(this, u);
        break;
      }
      case S.IN_COLUMN_GROUP: {
        vm(this, u);
        break;
      }
      case S.IN_TABLE_BODY: {
        vi(this, u);
        break;
      }
      case S.IN_ROW: {
        zl(this, u);
        break;
      }
      case S.IN_CELL: {
        Nm(this, u);
        break;
      }
      case S.IN_SELECT: {
        Kl(this, u);
        break;
      }
      case S.IN_SELECT_IN_TABLE: {
        Dm(this, u);
        break;
      }
      case S.IN_TEMPLATE: {
        Sm(this, u);
        break;
      }
      case S.AFTER_BODY: {
        Zl(this, u);
        break;
      }
      case S.IN_FRAMESET: {
        Pm(this, u);
        break;
      }
      case S.AFTER_FRAMESET: {
        Rm(this, u);
        break;
      }
      case S.AFTER_AFTER_BODY: {
        Xr(this, u);
        break;
      }
    }
  }
  onEof(u) {
    switch (this.insertionMode) {
      case S.INITIAL: {
        M0(this, u);
        break;
      }
      case S.BEFORE_HTML: {
        V0(this, u);
        break;
      }
      case S.BEFORE_HEAD: {
        Y0(this, u);
        break;
      }
      case S.IN_HEAD: {
        W0(this, u);
        break;
      }
      case S.IN_HEAD_NO_SCRIPT: {
        X0(this, u);
        break;
      }
      case S.AFTER_HEAD: {
        z0(this, u);
        break;
      }
      case S.IN_BODY:
      case S.IN_TABLE:
      case S.IN_CAPTION:
      case S.IN_COLUMN_GROUP:
      case S.IN_TABLE_BODY:
      case S.IN_ROW:
      case S.IN_CELL:
      case S.IN_SELECT:
      case S.IN_SELECT_IN_TABLE: {
        Vl(this, u);
        break;
      }
      case S.TEXT: {
        fm(this, u);
        break;
      }
      case S.IN_TABLE_TEXT: {
        k0(this, u);
        break;
      }
      case S.IN_TEMPLATE: {
        Jl(this, u);
        break;
      }
      case S.AFTER_BODY:
      case S.IN_FRAMESET:
      case S.AFTER_FRAMESET:
      case S.AFTER_AFTER_BODY:
      case S.AFTER_AFTER_FRAMESET: {
        vc(this, u);
        break;
      }
    }
  }
  onWhitespaceCharacter(u) {
    if (this.skipNextNewLine && (this.skipNextNewLine = !1, u.chars.charCodeAt(0) === Ul.CODE_POINTS.LINE_FEED)) {
      if (u.chars.length === 1)
        return;
      u.chars = u.chars.substr(1);
    }
    if (this.tokenizer.inForeignNode) {
      this._insertCharacters(u);
      return;
    }
    switch (this.insertionMode) {
      case S.IN_HEAD:
      case S.IN_HEAD_NO_SCRIPT:
      case S.AFTER_HEAD:
      case S.TEXT:
      case S.IN_COLUMN_GROUP:
      case S.IN_SELECT:
      case S.IN_SELECT_IN_TABLE:
      case S.IN_FRAMESET:
      case S.AFTER_FRAMESET: {
        this._insertCharacters(u);
        break;
      }
      case S.IN_BODY:
      case S.IN_CAPTION:
      case S.IN_CELL:
      case S.IN_TEMPLATE:
      case S.AFTER_BODY:
      case S.AFTER_AFTER_BODY:
      case S.AFTER_AFTER_FRAMESET: {
        Fl(this, u);
        break;
      }
      case S.IN_TABLE:
      case S.IN_TABLE_BODY:
      case S.IN_ROW: {
        Pn(this, u);
        break;
      }
      case S.IN_TABLE_TEXT: {
        Yl(this, u);
        break;
      }
    }
  }
};
ur.Parser = s4;
function o4(e, u) {
  let t = e.activeFormattingElements.getElementEntryInScopeWithTagName(u.tagName);
  return t ? e.openElements.contains(t.element) ? e.openElements.hasInScope(u.tagID) || (t = null) : (e.activeFormattingElements.removeEntry(t), t = null) : $l(e, u), t;
}
function d4(e, u) {
  let t = null, r = e.openElements.stackTop;
  for (; r >= 0; r--) {
    const a = e.openElements.items[r];
    if (a === u.element)
      break;
    e._isSpecialElement(a, e.openElements.tagIDs[r]) && (t = a);
  }
  return t || (e.openElements.shortenToLength(r < 0 ? 0 : r), e.activeFormattingElements.removeEntry(u)), t;
}
function l4(e, u, t) {
  let r = u, a = e.openElements.getCommonAncestor(u);
  for (let n = 0, i = a; i !== t; n++, i = a) {
    a = e.openElements.getCommonAncestor(i);
    const s = e.activeFormattingElements.getElementEntry(i), o = s && n >= i4;
    !s || o ? (o && e.activeFormattingElements.removeEntry(s), e.openElements.remove(i)) : (i = f4(e, s), r === u && (e.activeFormattingElements.bookmark = s), e.treeAdapter.detachNode(r), e.treeAdapter.appendChild(i, r), r = i);
  }
  return r;
}
function f4(e, u) {
  const t = e.treeAdapter.getNamespaceURI(u.element), r = e.treeAdapter.createElement(u.token.tagName, t, u.token.attrs);
  return e.openElements.replace(u.element, r), u.element = r, r;
}
function b4(e, u, t) {
  const r = e.treeAdapter.getTagName(u), a = (0, b.getTagID)(r);
  if (e._isElementCausesFosterParenting(a))
    e._fosterParentElement(t);
  else {
    const n = e.treeAdapter.getNamespaceURI(u);
    a === b.TAG_ID.TEMPLATE && n === b.NS.HTML && (u = e.treeAdapter.getTemplateContent(u)), e.treeAdapter.appendChild(u, t);
  }
}
function h4(e, u, t) {
  const r = e.treeAdapter.getNamespaceURI(t.element), { token: a } = t, n = e.treeAdapter.createElement(a.tagName, r, a.attrs);
  e._adoptNodes(u, n), e.treeAdapter.appendChild(u, n), e.activeFormattingElements.insertElementAfterBookmark(n, a), e.activeFormattingElements.removeEntry(t), e.openElements.remove(t.element), e.openElements.insertAfter(u, n, a.tagID);
}
function Ac(e, u) {
  for (let t = 0; t < n4; t++) {
    const r = o4(e, u);
    if (!r)
      break;
    const a = d4(e, r);
    if (!a)
      break;
    e.activeFormattingElements.bookmark = r;
    const n = l4(e, a, r.element), i = e.openElements.getCommonAncestor(r.element);
    e.treeAdapter.detachNode(n), i && b4(e, i, n), h4(e, a, r);
  }
}
function Ai(e, u) {
  e._appendCommentNode(u, e.openElements.currentTmplContentOrNode);
}
function p4(e, u) {
  e._appendCommentNode(u, e.openElements.items[0]);
}
function m4(e, u) {
  e._appendCommentNode(u, e.document);
}
function vc(e, u) {
  if (e.stopped = !0, u.location) {
    const t = e.fragmentContext ? 0 : 2;
    for (let r = e.openElements.stackTop; r >= t; r--)
      e._setEndLocation(e.openElements.items[r], u);
    if (!e.fragmentContext && e.openElements.stackTop >= 0) {
      const r = e.openElements.items[0], a = e.treeAdapter.getNodeSourceCodeLocation(r);
      if (a && !a.endTag && (e._setEndLocation(r, u), e.openElements.stackTop >= 1)) {
        const n = e.openElements.items[1], i = e.treeAdapter.getNodeSourceCodeLocation(n);
        i && !i.endTag && e._setEndLocation(n, u);
      }
    }
  }
}
function g4(e, u) {
  e._setDocumentType(u);
  const t = u.forceQuirks ? b.DOCUMENT_MODE.QUIRKS : ys.getDocumentMode(u);
  ys.isConforming(u) || e._err(u, Xe.ERR.nonConformingDoctype), e.treeAdapter.setDocumentMode(e.document, t), e.insertionMode = S.BEFORE_HTML;
}
function M0(e, u) {
  e._err(u, Xe.ERR.missingDoctype, !0), e.treeAdapter.setDocumentMode(e.document, b.DOCUMENT_MODE.QUIRKS), e.insertionMode = S.BEFORE_HTML, e._processToken(u);
}
function E4(e, u) {
  u.tagID === b.TAG_ID.HTML ? (e._insertElement(u, b.NS.HTML), e.insertionMode = S.BEFORE_HEAD) : V0(e, u);
}
function T4(e, u) {
  const t = u.tagID;
  (t === b.TAG_ID.HTML || t === b.TAG_ID.HEAD || t === b.TAG_ID.BODY || t === b.TAG_ID.BR) && V0(e, u);
}
function V0(e, u) {
  e._insertFakeRootElement(), e.insertionMode = S.BEFORE_HEAD, e._processToken(u);
}
function _4(e, u) {
  switch (u.tagID) {
    case b.TAG_ID.HTML: {
      ze(e, u);
      break;
    }
    case b.TAG_ID.HEAD: {
      e._insertElement(u, b.NS.HTML), e.headElement = e.openElements.current, e.insertionMode = S.IN_HEAD;
      break;
    }
    default:
      Y0(e, u);
  }
}
function y4(e, u) {
  const t = u.tagID;
  t === b.TAG_ID.HEAD || t === b.TAG_ID.BODY || t === b.TAG_ID.HTML || t === b.TAG_ID.BR ? Y0(e, u) : e._err(u, Xe.ERR.endTagWithoutMatchingOpenElement);
}
function Y0(e, u) {
  e._insertFakeElement(b.TAG_NAMES.HEAD, b.TAG_ID.HEAD), e.headElement = e.openElements.current, e.insertionMode = S.IN_HEAD, e._processToken(u);
}
function Bu(e, u) {
  switch (u.tagID) {
    case b.TAG_ID.HTML: {
      ze(e, u);
      break;
    }
    case b.TAG_ID.BASE:
    case b.TAG_ID.BASEFONT:
    case b.TAG_ID.BGSOUND:
    case b.TAG_ID.LINK:
    case b.TAG_ID.META: {
      e._appendElement(u, b.NS.HTML), u.ackSelfClosing = !0;
      break;
    }
    case b.TAG_ID.TITLE: {
      e._switchToTextParsing(u, eu.TokenizerMode.RCDATA);
      break;
    }
    case b.TAG_ID.NOSCRIPT: {
      e.options.scriptingEnabled ? e._switchToTextParsing(u, eu.TokenizerMode.RAWTEXT) : (e._insertElement(u, b.NS.HTML), e.insertionMode = S.IN_HEAD_NO_SCRIPT);
      break;
    }
    case b.TAG_ID.NOFRAMES:
    case b.TAG_ID.STYLE: {
      e._switchToTextParsing(u, eu.TokenizerMode.RAWTEXT);
      break;
    }
    case b.TAG_ID.SCRIPT: {
      e._switchToTextParsing(u, eu.TokenizerMode.SCRIPT_DATA);
      break;
    }
    case b.TAG_ID.TEMPLATE: {
      e._insertTemplate(u), e.activeFormattingElements.insertMarker(), e.framesetOk = !1, e.insertionMode = S.IN_TEMPLATE, e.tmplInsertionModeStack.unshift(S.IN_TEMPLATE);
      break;
    }
    case b.TAG_ID.HEAD: {
      e._err(u, Xe.ERR.misplacedStartTagForHeadElement);
      break;
    }
    default:
      W0(e, u);
  }
}
function A4(e, u) {
  switch (u.tagID) {
    case b.TAG_ID.HEAD: {
      e.openElements.pop(), e.insertionMode = S.AFTER_HEAD;
      break;
    }
    case b.TAG_ID.BODY:
    case b.TAG_ID.BR:
    case b.TAG_ID.HTML: {
      W0(e, u);
      break;
    }
    case b.TAG_ID.TEMPLATE: {
      jt(e, u);
      break;
    }
    default:
      e._err(u, Xe.ERR.endTagWithoutMatchingOpenElement);
  }
}
function jt(e, u) {
  e.openElements.tmplCount > 0 ? (e.openElements.generateImpliedEndTagsThoroughly(), e.openElements.currentTagId !== b.TAG_ID.TEMPLATE && e._err(u, Xe.ERR.closingOfElementWithOpenChildElements), e.openElements.popUntilTagNamePopped(b.TAG_ID.TEMPLATE), e.activeFormattingElements.clearToLastMarker(), e.tmplInsertionModeStack.shift(), e._resetInsertionMode()) : e._err(u, Xe.ERR.endTagWithoutMatchingOpenElement);
}
function W0(e, u) {
  e.openElements.pop(), e.insertionMode = S.AFTER_HEAD, e._processToken(u);
}
function v4(e, u) {
  switch (u.tagID) {
    case b.TAG_ID.HTML: {
      ze(e, u);
      break;
    }
    case b.TAG_ID.BASEFONT:
    case b.TAG_ID.BGSOUND:
    case b.TAG_ID.HEAD:
    case b.TAG_ID.LINK:
    case b.TAG_ID.META:
    case b.TAG_ID.NOFRAMES:
    case b.TAG_ID.STYLE: {
      Bu(e, u);
      break;
    }
    case b.TAG_ID.NOSCRIPT: {
      e._err(u, Xe.ERR.nestedNoscriptInHead);
      break;
    }
    default:
      X0(e, u);
  }
}
function x4(e, u) {
  switch (u.tagID) {
    case b.TAG_ID.NOSCRIPT: {
      e.openElements.pop(), e.insertionMode = S.IN_HEAD;
      break;
    }
    case b.TAG_ID.BR: {
      X0(e, u);
      break;
    }
    default:
      e._err(u, Xe.ERR.endTagWithoutMatchingOpenElement);
  }
}
function X0(e, u) {
  const t = u.type === He.TokenType.EOF ? Xe.ERR.openElementsLeftAfterEof : Xe.ERR.disallowedContentInNoscriptInHead;
  e._err(u, t), e.openElements.pop(), e.insertionMode = S.IN_HEAD, e._processToken(u);
}
function N4(e, u) {
  switch (u.tagID) {
    case b.TAG_ID.HTML: {
      ze(e, u);
      break;
    }
    case b.TAG_ID.BODY: {
      e._insertElement(u, b.NS.HTML), e.framesetOk = !1, e.insertionMode = S.IN_BODY;
      break;
    }
    case b.TAG_ID.FRAMESET: {
      e._insertElement(u, b.NS.HTML), e.insertionMode = S.IN_FRAMESET;
      break;
    }
    case b.TAG_ID.BASE:
    case b.TAG_ID.BASEFONT:
    case b.TAG_ID.BGSOUND:
    case b.TAG_ID.LINK:
    case b.TAG_ID.META:
    case b.TAG_ID.NOFRAMES:
    case b.TAG_ID.SCRIPT:
    case b.TAG_ID.STYLE:
    case b.TAG_ID.TEMPLATE:
    case b.TAG_ID.TITLE: {
      e._err(u, Xe.ERR.abandonedHeadElementChild), e.openElements.push(e.headElement, b.TAG_ID.HEAD), Bu(e, u), e.openElements.remove(e.headElement);
      break;
    }
    case b.TAG_ID.HEAD: {
      e._err(u, Xe.ERR.misplacedStartTagForHeadElement);
      break;
    }
    default:
      z0(e, u);
  }
}
function I4(e, u) {
  switch (u.tagID) {
    case b.TAG_ID.BODY:
    case b.TAG_ID.HTML:
    case b.TAG_ID.BR: {
      z0(e, u);
      break;
    }
    case b.TAG_ID.TEMPLATE: {
      jt(e, u);
      break;
    }
    default:
      e._err(u, Xe.ERR.endTagWithoutMatchingOpenElement);
  }
}
function z0(e, u) {
  e._insertFakeElement(b.TAG_NAMES.BODY, b.TAG_ID.BODY), e.insertionMode = S.IN_BODY, un(e, u);
}
function un(e, u) {
  switch (u.type) {
    case He.TokenType.CHARACTER: {
      ql(e, u);
      break;
    }
    case He.TokenType.WHITESPACE_CHARACTER: {
      Fl(e, u);
      break;
    }
    case He.TokenType.COMMENT: {
      Ai(e, u);
      break;
    }
    case He.TokenType.START_TAG: {
      ze(e, u);
      break;
    }
    case He.TokenType.END_TAG: {
      tn(e, u);
      break;
    }
    case He.TokenType.EOF: {
      Vl(e, u);
      break;
    }
  }
}
function Fl(e, u) {
  e._reconstructActiveFormattingElements(), e._insertCharacters(u);
}
function ql(e, u) {
  e._reconstructActiveFormattingElements(), e._insertCharacters(u), e.framesetOk = !1;
}
function D4(e, u) {
  e.openElements.tmplCount === 0 && e.treeAdapter.adoptAttributes(e.openElements.items[0], u.attrs);
}
function C4(e, u) {
  const t = e.openElements.tryPeekProperlyNestedBodyElement();
  t && e.openElements.tmplCount === 0 && (e.framesetOk = !1, e.treeAdapter.adoptAttributes(t, u.attrs));
}
function S4(e, u) {
  const t = e.openElements.tryPeekProperlyNestedBodyElement();
  e.framesetOk && t && (e.treeAdapter.detachNode(t), e.openElements.popAllUpToHtmlElement(), e._insertElement(u, b.NS.HTML), e.insertionMode = S.IN_FRAMESET);
}
function O4(e, u) {
  e.openElements.hasInButtonScope(b.TAG_ID.P) && e._closePElement(), e._insertElement(u, b.NS.HTML);
}
function L4(e, u) {
  e.openElements.hasInButtonScope(b.TAG_ID.P) && e._closePElement(), (0, b.isNumberedHeader)(e.openElements.currentTagId) && e.openElements.pop(), e._insertElement(u, b.NS.HTML);
}
function P4(e, u) {
  e.openElements.hasInButtonScope(b.TAG_ID.P) && e._closePElement(), e._insertElement(u, b.NS.HTML), e.skipNextNewLine = !0, e.framesetOk = !1;
}
function w4(e, u) {
  const t = e.openElements.tmplCount > 0;
  (!e.formElement || t) && (e.openElements.hasInButtonScope(b.TAG_ID.P) && e._closePElement(), e._insertElement(u, b.NS.HTML), t || (e.formElement = e.openElements.current));
}
function R4(e, u) {
  e.framesetOk = !1;
  const t = u.tagID;
  for (let r = e.openElements.stackTop; r >= 0; r--) {
    const a = e.openElements.tagIDs[r];
    if (t === b.TAG_ID.LI && a === b.TAG_ID.LI || (t === b.TAG_ID.DD || t === b.TAG_ID.DT) && (a === b.TAG_ID.DD || a === b.TAG_ID.DT)) {
      e.openElements.generateImpliedEndTagsWithExclusion(a), e.openElements.popUntilTagNamePopped(a);
      break;
    }
    if (a !== b.TAG_ID.ADDRESS && a !== b.TAG_ID.DIV && a !== b.TAG_ID.P && e._isSpecialElement(e.openElements.items[r], a))
      break;
  }
  e.openElements.hasInButtonScope(b.TAG_ID.P) && e._closePElement(), e._insertElement(u, b.NS.HTML);
}
function M4(e, u) {
  e.openElements.hasInButtonScope(b.TAG_ID.P) && e._closePElement(), e._insertElement(u, b.NS.HTML), e.tokenizer.state = eu.TokenizerMode.PLAINTEXT;
}
function k4(e, u) {
  e.openElements.hasInScope(b.TAG_ID.BUTTON) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(b.TAG_ID.BUTTON)), e._reconstructActiveFormattingElements(), e._insertElement(u, b.NS.HTML), e.framesetOk = !1;
}
function B4(e, u) {
  const t = e.activeFormattingElements.getElementEntryInScopeWithTagName(b.TAG_NAMES.A);
  t && (Ac(e, u), e.openElements.remove(t.element), e.activeFormattingElements.removeEntry(t)), e._reconstructActiveFormattingElements(), e._insertElement(u, b.NS.HTML), e.activeFormattingElements.pushElement(e.openElements.current, u);
}
function U4(e, u) {
  e._reconstructActiveFormattingElements(), e._insertElement(u, b.NS.HTML), e.activeFormattingElements.pushElement(e.openElements.current, u);
}
function H4(e, u) {
  e._reconstructActiveFormattingElements(), e.openElements.hasInScope(b.TAG_ID.NOBR) && (Ac(e, u), e._reconstructActiveFormattingElements()), e._insertElement(u, b.NS.HTML), e.activeFormattingElements.pushElement(e.openElements.current, u);
}
function F4(e, u) {
  e._reconstructActiveFormattingElements(), e._insertElement(u, b.NS.HTML), e.activeFormattingElements.insertMarker(), e.framesetOk = !1;
}
function q4(e, u) {
  e.treeAdapter.getDocumentMode(e.document) !== b.DOCUMENT_MODE.QUIRKS && e.openElements.hasInButtonScope(b.TAG_ID.P) && e._closePElement(), e._insertElement(u, b.NS.HTML), e.framesetOk = !1, e.insertionMode = S.IN_TABLE;
}
function Gl(e, u) {
  e._reconstructActiveFormattingElements(), e._appendElement(u, b.NS.HTML), e.framesetOk = !1, u.ackSelfClosing = !0;
}
function jl(e) {
  const u = (0, He.getTokenAttr)(e, b.ATTRS.TYPE);
  return u != null && u.toLowerCase() === a4;
}
function G4(e, u) {
  e._reconstructActiveFormattingElements(), e._appendElement(u, b.NS.HTML), jl(u) || (e.framesetOk = !1), u.ackSelfClosing = !0;
}
function j4(e, u) {
  e._appendElement(u, b.NS.HTML), u.ackSelfClosing = !0;
}
function $4(e, u) {
  e.openElements.hasInButtonScope(b.TAG_ID.P) && e._closePElement(), e._appendElement(u, b.NS.HTML), e.framesetOk = !1, u.ackSelfClosing = !0;
}
function V4(e, u) {
  u.tagName = b.TAG_NAMES.IMG, u.tagID = b.TAG_ID.IMG, Gl(e, u);
}
function Y4(e, u) {
  e._insertElement(u, b.NS.HTML), e.skipNextNewLine = !0, e.tokenizer.state = eu.TokenizerMode.RCDATA, e.originalInsertionMode = e.insertionMode, e.framesetOk = !1, e.insertionMode = S.TEXT;
}
function W4(e, u) {
  e.openElements.hasInButtonScope(b.TAG_ID.P) && e._closePElement(), e._reconstructActiveFormattingElements(), e.framesetOk = !1, e._switchToTextParsing(u, eu.TokenizerMode.RAWTEXT);
}
function X4(e, u) {
  e.framesetOk = !1, e._switchToTextParsing(u, eu.TokenizerMode.RAWTEXT);
}
function vs(e, u) {
  e._switchToTextParsing(u, eu.TokenizerMode.RAWTEXT);
}
function z4(e, u) {
  e._reconstructActiveFormattingElements(), e._insertElement(u, b.NS.HTML), e.framesetOk = !1, e.insertionMode = e.insertionMode === S.IN_TABLE || e.insertionMode === S.IN_CAPTION || e.insertionMode === S.IN_TABLE_BODY || e.insertionMode === S.IN_ROW || e.insertionMode === S.IN_CELL ? S.IN_SELECT_IN_TABLE : S.IN_SELECT;
}
function Q4(e, u) {
  e.openElements.currentTagId === b.TAG_ID.OPTION && e.openElements.pop(), e._reconstructActiveFormattingElements(), e._insertElement(u, b.NS.HTML);
}
function K4(e, u) {
  e.openElements.hasInScope(b.TAG_ID.RUBY) && e.openElements.generateImpliedEndTags(), e._insertElement(u, b.NS.HTML);
}
function J4(e, u) {
  e.openElements.hasInScope(b.TAG_ID.RUBY) && e.openElements.generateImpliedEndTagsWithExclusion(b.TAG_ID.RTC), e._insertElement(u, b.NS.HTML);
}
function Z4(e, u) {
  e._reconstructActiveFormattingElements(), $u.adjustTokenMathMLAttrs(u), $u.adjustTokenXMLAttrs(u), u.selfClosing ? e._appendElement(u, b.NS.MATHML) : e._insertElement(u, b.NS.MATHML), u.ackSelfClosing = !0;
}
function em(e, u) {
  e._reconstructActiveFormattingElements(), $u.adjustTokenSVGAttrs(u), $u.adjustTokenXMLAttrs(u), u.selfClosing ? e._appendElement(u, b.NS.SVG) : e._insertElement(u, b.NS.SVG), u.ackSelfClosing = !0;
}
function xs(e, u) {
  e._reconstructActiveFormattingElements(), e._insertElement(u, b.NS.HTML);
}
function ze(e, u) {
  switch (u.tagID) {
    case b.TAG_ID.I:
    case b.TAG_ID.S:
    case b.TAG_ID.B:
    case b.TAG_ID.U:
    case b.TAG_ID.EM:
    case b.TAG_ID.TT:
    case b.TAG_ID.BIG:
    case b.TAG_ID.CODE:
    case b.TAG_ID.FONT:
    case b.TAG_ID.SMALL:
    case b.TAG_ID.STRIKE:
    case b.TAG_ID.STRONG: {
      U4(e, u);
      break;
    }
    case b.TAG_ID.A: {
      B4(e, u);
      break;
    }
    case b.TAG_ID.H1:
    case b.TAG_ID.H2:
    case b.TAG_ID.H3:
    case b.TAG_ID.H4:
    case b.TAG_ID.H5:
    case b.TAG_ID.H6: {
      L4(e, u);
      break;
    }
    case b.TAG_ID.P:
    case b.TAG_ID.DL:
    case b.TAG_ID.OL:
    case b.TAG_ID.UL:
    case b.TAG_ID.DIV:
    case b.TAG_ID.DIR:
    case b.TAG_ID.NAV:
    case b.TAG_ID.MAIN:
    case b.TAG_ID.MENU:
    case b.TAG_ID.ASIDE:
    case b.TAG_ID.CENTER:
    case b.TAG_ID.FIGURE:
    case b.TAG_ID.FOOTER:
    case b.TAG_ID.HEADER:
    case b.TAG_ID.HGROUP:
    case b.TAG_ID.DIALOG:
    case b.TAG_ID.DETAILS:
    case b.TAG_ID.ADDRESS:
    case b.TAG_ID.ARTICLE:
    case b.TAG_ID.SECTION:
    case b.TAG_ID.SUMMARY:
    case b.TAG_ID.FIELDSET:
    case b.TAG_ID.BLOCKQUOTE:
    case b.TAG_ID.FIGCAPTION: {
      O4(e, u);
      break;
    }
    case b.TAG_ID.LI:
    case b.TAG_ID.DD:
    case b.TAG_ID.DT: {
      R4(e, u);
      break;
    }
    case b.TAG_ID.BR:
    case b.TAG_ID.IMG:
    case b.TAG_ID.WBR:
    case b.TAG_ID.AREA:
    case b.TAG_ID.EMBED:
    case b.TAG_ID.KEYGEN: {
      Gl(e, u);
      break;
    }
    case b.TAG_ID.HR: {
      $4(e, u);
      break;
    }
    case b.TAG_ID.RB:
    case b.TAG_ID.RTC: {
      K4(e, u);
      break;
    }
    case b.TAG_ID.RT:
    case b.TAG_ID.RP: {
      J4(e, u);
      break;
    }
    case b.TAG_ID.PRE:
    case b.TAG_ID.LISTING: {
      P4(e, u);
      break;
    }
    case b.TAG_ID.XMP: {
      W4(e, u);
      break;
    }
    case b.TAG_ID.SVG: {
      em(e, u);
      break;
    }
    case b.TAG_ID.HTML: {
      D4(e, u);
      break;
    }
    case b.TAG_ID.BASE:
    case b.TAG_ID.LINK:
    case b.TAG_ID.META:
    case b.TAG_ID.STYLE:
    case b.TAG_ID.TITLE:
    case b.TAG_ID.SCRIPT:
    case b.TAG_ID.BGSOUND:
    case b.TAG_ID.BASEFONT:
    case b.TAG_ID.TEMPLATE: {
      Bu(e, u);
      break;
    }
    case b.TAG_ID.BODY: {
      C4(e, u);
      break;
    }
    case b.TAG_ID.FORM: {
      w4(e, u);
      break;
    }
    case b.TAG_ID.NOBR: {
      H4(e, u);
      break;
    }
    case b.TAG_ID.MATH: {
      Z4(e, u);
      break;
    }
    case b.TAG_ID.TABLE: {
      q4(e, u);
      break;
    }
    case b.TAG_ID.INPUT: {
      G4(e, u);
      break;
    }
    case b.TAG_ID.PARAM:
    case b.TAG_ID.TRACK:
    case b.TAG_ID.SOURCE: {
      j4(e, u);
      break;
    }
    case b.TAG_ID.IMAGE: {
      V4(e, u);
      break;
    }
    case b.TAG_ID.BUTTON: {
      k4(e, u);
      break;
    }
    case b.TAG_ID.APPLET:
    case b.TAG_ID.OBJECT:
    case b.TAG_ID.MARQUEE: {
      F4(e, u);
      break;
    }
    case b.TAG_ID.IFRAME: {
      X4(e, u);
      break;
    }
    case b.TAG_ID.SELECT: {
      z4(e, u);
      break;
    }
    case b.TAG_ID.OPTION:
    case b.TAG_ID.OPTGROUP: {
      Q4(e, u);
      break;
    }
    case b.TAG_ID.NOEMBED: {
      vs(e, u);
      break;
    }
    case b.TAG_ID.FRAMESET: {
      S4(e, u);
      break;
    }
    case b.TAG_ID.TEXTAREA: {
      Y4(e, u);
      break;
    }
    case b.TAG_ID.NOSCRIPT: {
      e.options.scriptingEnabled ? vs(e, u) : xs(e, u);
      break;
    }
    case b.TAG_ID.PLAINTEXT: {
      M4(e, u);
      break;
    }
    case b.TAG_ID.COL:
    case b.TAG_ID.TH:
    case b.TAG_ID.TD:
    case b.TAG_ID.TR:
    case b.TAG_ID.HEAD:
    case b.TAG_ID.FRAME:
    case b.TAG_ID.TBODY:
    case b.TAG_ID.TFOOT:
    case b.TAG_ID.THEAD:
    case b.TAG_ID.CAPTION:
    case b.TAG_ID.COLGROUP:
      break;
    default:
      xs(e, u);
  }
}
function um(e, u) {
  if (e.openElements.hasInScope(b.TAG_ID.BODY) && (e.insertionMode = S.AFTER_BODY, e.options.sourceCodeLocationInfo)) {
    const t = e.openElements.tryPeekProperlyNestedBodyElement();
    t && e._setEndLocation(t, u);
  }
}
function tm(e, u) {
  e.openElements.hasInScope(b.TAG_ID.BODY) && (e.insertionMode = S.AFTER_BODY, Zl(e, u));
}
function rm(e, u) {
  const t = u.tagID;
  e.openElements.hasInScope(t) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(t));
}
function am(e) {
  const u = e.openElements.tmplCount > 0, { formElement: t } = e;
  u || (e.formElement = null), (t || u) && e.openElements.hasInScope(b.TAG_ID.FORM) && (e.openElements.generateImpliedEndTags(), u ? e.openElements.popUntilTagNamePopped(b.TAG_ID.FORM) : t && e.openElements.remove(t));
}
function nm(e) {
  e.openElements.hasInButtonScope(b.TAG_ID.P) || e._insertFakeElement(b.TAG_NAMES.P, b.TAG_ID.P), e._closePElement();
}
function im(e) {
  e.openElements.hasInListItemScope(b.TAG_ID.LI) && (e.openElements.generateImpliedEndTagsWithExclusion(b.TAG_ID.LI), e.openElements.popUntilTagNamePopped(b.TAG_ID.LI));
}
function cm(e, u) {
  const t = u.tagID;
  e.openElements.hasInScope(t) && (e.openElements.generateImpliedEndTagsWithExclusion(t), e.openElements.popUntilTagNamePopped(t));
}
function sm(e) {
  e.openElements.hasNumberedHeaderInScope() && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilNumberedHeaderPopped());
}
function om(e, u) {
  const t = u.tagID;
  e.openElements.hasInScope(t) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(t), e.activeFormattingElements.clearToLastMarker());
}
function dm(e) {
  e._reconstructActiveFormattingElements(), e._insertFakeElement(b.TAG_NAMES.BR, b.TAG_ID.BR), e.openElements.pop(), e.framesetOk = !1;
}
function $l(e, u) {
  const t = u.tagName, r = u.tagID;
  for (let a = e.openElements.stackTop; a > 0; a--) {
    const n = e.openElements.items[a], i = e.openElements.tagIDs[a];
    if (r === i && (r !== b.TAG_ID.UNKNOWN || e.treeAdapter.getTagName(n) === t)) {
      e.openElements.generateImpliedEndTagsWithExclusion(r), e.openElements.stackTop >= a && e.openElements.shortenToLength(a);
      break;
    }
    if (e._isSpecialElement(n, i))
      break;
  }
}
function tn(e, u) {
  switch (u.tagID) {
    case b.TAG_ID.A:
    case b.TAG_ID.B:
    case b.TAG_ID.I:
    case b.TAG_ID.S:
    case b.TAG_ID.U:
    case b.TAG_ID.EM:
    case b.TAG_ID.TT:
    case b.TAG_ID.BIG:
    case b.TAG_ID.CODE:
    case b.TAG_ID.FONT:
    case b.TAG_ID.NOBR:
    case b.TAG_ID.SMALL:
    case b.TAG_ID.STRIKE:
    case b.TAG_ID.STRONG: {
      Ac(e, u);
      break;
    }
    case b.TAG_ID.P: {
      nm(e);
      break;
    }
    case b.TAG_ID.DL:
    case b.TAG_ID.UL:
    case b.TAG_ID.OL:
    case b.TAG_ID.DIR:
    case b.TAG_ID.DIV:
    case b.TAG_ID.NAV:
    case b.TAG_ID.PRE:
    case b.TAG_ID.MAIN:
    case b.TAG_ID.MENU:
    case b.TAG_ID.ASIDE:
    case b.TAG_ID.BUTTON:
    case b.TAG_ID.CENTER:
    case b.TAG_ID.FIGURE:
    case b.TAG_ID.FOOTER:
    case b.TAG_ID.HEADER:
    case b.TAG_ID.HGROUP:
    case b.TAG_ID.DIALOG:
    case b.TAG_ID.ADDRESS:
    case b.TAG_ID.ARTICLE:
    case b.TAG_ID.DETAILS:
    case b.TAG_ID.SECTION:
    case b.TAG_ID.SUMMARY:
    case b.TAG_ID.LISTING:
    case b.TAG_ID.FIELDSET:
    case b.TAG_ID.BLOCKQUOTE:
    case b.TAG_ID.FIGCAPTION: {
      rm(e, u);
      break;
    }
    case b.TAG_ID.LI: {
      im(e);
      break;
    }
    case b.TAG_ID.DD:
    case b.TAG_ID.DT: {
      cm(e, u);
      break;
    }
    case b.TAG_ID.H1:
    case b.TAG_ID.H2:
    case b.TAG_ID.H3:
    case b.TAG_ID.H4:
    case b.TAG_ID.H5:
    case b.TAG_ID.H6: {
      sm(e);
      break;
    }
    case b.TAG_ID.BR: {
      dm(e);
      break;
    }
    case b.TAG_ID.BODY: {
      um(e, u);
      break;
    }
    case b.TAG_ID.HTML: {
      tm(e, u);
      break;
    }
    case b.TAG_ID.FORM: {
      am(e);
      break;
    }
    case b.TAG_ID.APPLET:
    case b.TAG_ID.OBJECT:
    case b.TAG_ID.MARQUEE: {
      om(e, u);
      break;
    }
    case b.TAG_ID.TEMPLATE: {
      jt(e, u);
      break;
    }
    default:
      $l(e, u);
  }
}
function Vl(e, u) {
  e.tmplInsertionModeStack.length > 0 ? Jl(e, u) : vc(e, u);
}
function lm(e, u) {
  var t;
  u.tagID === b.TAG_ID.SCRIPT && ((t = e.scriptHandler) === null || t === void 0 || t.call(e, e.openElements.current)), e.openElements.pop(), e.insertionMode = e.originalInsertionMode;
}
function fm(e, u) {
  e._err(u, Xe.ERR.eofInElementThatCanContainOnlyText), e.openElements.pop(), e.insertionMode = e.originalInsertionMode, e.onEof(u);
}
function Pn(e, u) {
  if (Hl.has(e.openElements.currentTagId))
    switch (e.pendingCharacterTokens.length = 0, e.hasNonWhitespacePendingCharacterToken = !1, e.originalInsertionMode = e.insertionMode, e.insertionMode = S.IN_TABLE_TEXT, u.type) {
      case He.TokenType.CHARACTER: {
        Wl(e, u);
        break;
      }
      case He.TokenType.WHITESPACE_CHARACTER: {
        Yl(e, u);
        break;
      }
    }
  else
    Ar(e, u);
}
function bm(e, u) {
  e.openElements.clearBackToTableContext(), e.activeFormattingElements.insertMarker(), e._insertElement(u, b.NS.HTML), e.insertionMode = S.IN_CAPTION;
}
function hm(e, u) {
  e.openElements.clearBackToTableContext(), e._insertElement(u, b.NS.HTML), e.insertionMode = S.IN_COLUMN_GROUP;
}
function pm(e, u) {
  e.openElements.clearBackToTableContext(), e._insertFakeElement(b.TAG_NAMES.COLGROUP, b.TAG_ID.COLGROUP), e.insertionMode = S.IN_COLUMN_GROUP, xc(e, u);
}
function mm(e, u) {
  e.openElements.clearBackToTableContext(), e._insertElement(u, b.NS.HTML), e.insertionMode = S.IN_TABLE_BODY;
}
function gm(e, u) {
  e.openElements.clearBackToTableContext(), e._insertFakeElement(b.TAG_NAMES.TBODY, b.TAG_ID.TBODY), e.insertionMode = S.IN_TABLE_BODY, rn(e, u);
}
function Em(e, u) {
  e.openElements.hasInTableScope(b.TAG_ID.TABLE) && (e.openElements.popUntilTagNamePopped(b.TAG_ID.TABLE), e._resetInsertionMode(), e._processStartTag(u));
}
function Tm(e, u) {
  jl(u) ? e._appendElement(u, b.NS.HTML) : Ar(e, u), u.ackSelfClosing = !0;
}
function _m(e, u) {
  !e.formElement && e.openElements.tmplCount === 0 && (e._insertElement(u, b.NS.HTML), e.formElement = e.openElements.current, e.openElements.pop());
}
function v0(e, u) {
  switch (u.tagID) {
    case b.TAG_ID.TD:
    case b.TAG_ID.TH:
    case b.TAG_ID.TR: {
      gm(e, u);
      break;
    }
    case b.TAG_ID.STYLE:
    case b.TAG_ID.SCRIPT:
    case b.TAG_ID.TEMPLATE: {
      Bu(e, u);
      break;
    }
    case b.TAG_ID.COL: {
      pm(e, u);
      break;
    }
    case b.TAG_ID.FORM: {
      _m(e, u);
      break;
    }
    case b.TAG_ID.TABLE: {
      Em(e, u);
      break;
    }
    case b.TAG_ID.TBODY:
    case b.TAG_ID.TFOOT:
    case b.TAG_ID.THEAD: {
      mm(e, u);
      break;
    }
    case b.TAG_ID.INPUT: {
      Tm(e, u);
      break;
    }
    case b.TAG_ID.CAPTION: {
      bm(e, u);
      break;
    }
    case b.TAG_ID.COLGROUP: {
      hm(e, u);
      break;
    }
    default:
      Ar(e, u);
  }
}
function tr(e, u) {
  switch (u.tagID) {
    case b.TAG_ID.TABLE: {
      e.openElements.hasInTableScope(b.TAG_ID.TABLE) && (e.openElements.popUntilTagNamePopped(b.TAG_ID.TABLE), e._resetInsertionMode());
      break;
    }
    case b.TAG_ID.TEMPLATE: {
      jt(e, u);
      break;
    }
    case b.TAG_ID.BODY:
    case b.TAG_ID.CAPTION:
    case b.TAG_ID.COL:
    case b.TAG_ID.COLGROUP:
    case b.TAG_ID.HTML:
    case b.TAG_ID.TBODY:
    case b.TAG_ID.TD:
    case b.TAG_ID.TFOOT:
    case b.TAG_ID.TH:
    case b.TAG_ID.THEAD:
    case b.TAG_ID.TR:
      break;
    default:
      Ar(e, u);
  }
}
function Ar(e, u) {
  const t = e.fosterParentingEnabled;
  e.fosterParentingEnabled = !0, un(e, u), e.fosterParentingEnabled = t;
}
function Yl(e, u) {
  e.pendingCharacterTokens.push(u);
}
function Wl(e, u) {
  e.pendingCharacterTokens.push(u), e.hasNonWhitespacePendingCharacterToken = !0;
}
function k0(e, u) {
  let t = 0;
  if (e.hasNonWhitespacePendingCharacterToken)
    for (; t < e.pendingCharacterTokens.length; t++)
      Ar(e, e.pendingCharacterTokens[t]);
  else
    for (; t < e.pendingCharacterTokens.length; t++)
      e._insertCharacters(e.pendingCharacterTokens[t]);
  e.insertionMode = e.originalInsertionMode, e._processToken(u);
}
const Xl = /* @__PURE__ */ new Set([b.TAG_ID.CAPTION, b.TAG_ID.COL, b.TAG_ID.COLGROUP, b.TAG_ID.TBODY, b.TAG_ID.TD, b.TAG_ID.TFOOT, b.TAG_ID.TH, b.TAG_ID.THEAD, b.TAG_ID.TR]);
function ym(e, u) {
  const t = u.tagID;
  Xl.has(t) ? e.openElements.hasInTableScope(b.TAG_ID.CAPTION) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(b.TAG_ID.CAPTION), e.activeFormattingElements.clearToLastMarker(), e.insertionMode = S.IN_TABLE, v0(e, u)) : ze(e, u);
}
function Am(e, u) {
  const t = u.tagID;
  switch (t) {
    case b.TAG_ID.CAPTION:
    case b.TAG_ID.TABLE: {
      e.openElements.hasInTableScope(b.TAG_ID.CAPTION) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(b.TAG_ID.CAPTION), e.activeFormattingElements.clearToLastMarker(), e.insertionMode = S.IN_TABLE, t === b.TAG_ID.TABLE && tr(e, u));
      break;
    }
    case b.TAG_ID.BODY:
    case b.TAG_ID.COL:
    case b.TAG_ID.COLGROUP:
    case b.TAG_ID.HTML:
    case b.TAG_ID.TBODY:
    case b.TAG_ID.TD:
    case b.TAG_ID.TFOOT:
    case b.TAG_ID.TH:
    case b.TAG_ID.THEAD:
    case b.TAG_ID.TR:
      break;
    default:
      tn(e, u);
  }
}
function xc(e, u) {
  switch (u.tagID) {
    case b.TAG_ID.HTML: {
      ze(e, u);
      break;
    }
    case b.TAG_ID.COL: {
      e._appendElement(u, b.NS.HTML), u.ackSelfClosing = !0;
      break;
    }
    case b.TAG_ID.TEMPLATE: {
      Bu(e, u);
      break;
    }
    default:
      ga(e, u);
  }
}
function vm(e, u) {
  switch (u.tagID) {
    case b.TAG_ID.COLGROUP: {
      e.openElements.currentTagId === b.TAG_ID.COLGROUP && (e.openElements.pop(), e.insertionMode = S.IN_TABLE);
      break;
    }
    case b.TAG_ID.TEMPLATE: {
      jt(e, u);
      break;
    }
    case b.TAG_ID.COL:
      break;
    default:
      ga(e, u);
  }
}
function ga(e, u) {
  e.openElements.currentTagId === b.TAG_ID.COLGROUP && (e.openElements.pop(), e.insertionMode = S.IN_TABLE, e._processToken(u));
}
function rn(e, u) {
  switch (u.tagID) {
    case b.TAG_ID.TR: {
      e.openElements.clearBackToTableBodyContext(), e._insertElement(u, b.NS.HTML), e.insertionMode = S.IN_ROW;
      break;
    }
    case b.TAG_ID.TH:
    case b.TAG_ID.TD: {
      e.openElements.clearBackToTableBodyContext(), e._insertFakeElement(b.TAG_NAMES.TR, b.TAG_ID.TR), e.insertionMode = S.IN_ROW, an(e, u);
      break;
    }
    case b.TAG_ID.CAPTION:
    case b.TAG_ID.COL:
    case b.TAG_ID.COLGROUP:
    case b.TAG_ID.TBODY:
    case b.TAG_ID.TFOOT:
    case b.TAG_ID.THEAD: {
      e.openElements.hasTableBodyContextInTableScope() && (e.openElements.clearBackToTableBodyContext(), e.openElements.pop(), e.insertionMode = S.IN_TABLE, v0(e, u));
      break;
    }
    default:
      v0(e, u);
  }
}
function vi(e, u) {
  const t = u.tagID;
  switch (u.tagID) {
    case b.TAG_ID.TBODY:
    case b.TAG_ID.TFOOT:
    case b.TAG_ID.THEAD: {
      e.openElements.hasInTableScope(t) && (e.openElements.clearBackToTableBodyContext(), e.openElements.pop(), e.insertionMode = S.IN_TABLE);
      break;
    }
    case b.TAG_ID.TABLE: {
      e.openElements.hasTableBodyContextInTableScope() && (e.openElements.clearBackToTableBodyContext(), e.openElements.pop(), e.insertionMode = S.IN_TABLE, tr(e, u));
      break;
    }
    case b.TAG_ID.BODY:
    case b.TAG_ID.CAPTION:
    case b.TAG_ID.COL:
    case b.TAG_ID.COLGROUP:
    case b.TAG_ID.HTML:
    case b.TAG_ID.TD:
    case b.TAG_ID.TH:
    case b.TAG_ID.TR:
      break;
    default:
      tr(e, u);
  }
}
function an(e, u) {
  switch (u.tagID) {
    case b.TAG_ID.TH:
    case b.TAG_ID.TD: {
      e.openElements.clearBackToTableRowContext(), e._insertElement(u, b.NS.HTML), e.insertionMode = S.IN_CELL, e.activeFormattingElements.insertMarker();
      break;
    }
    case b.TAG_ID.CAPTION:
    case b.TAG_ID.COL:
    case b.TAG_ID.COLGROUP:
    case b.TAG_ID.TBODY:
    case b.TAG_ID.TFOOT:
    case b.TAG_ID.THEAD:
    case b.TAG_ID.TR: {
      e.openElements.hasInTableScope(b.TAG_ID.TR) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = S.IN_TABLE_BODY, rn(e, u));
      break;
    }
    default:
      v0(e, u);
  }
}
function zl(e, u) {
  switch (u.tagID) {
    case b.TAG_ID.TR: {
      e.openElements.hasInTableScope(b.TAG_ID.TR) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = S.IN_TABLE_BODY);
      break;
    }
    case b.TAG_ID.TABLE: {
      e.openElements.hasInTableScope(b.TAG_ID.TR) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = S.IN_TABLE_BODY, vi(e, u));
      break;
    }
    case b.TAG_ID.TBODY:
    case b.TAG_ID.TFOOT:
    case b.TAG_ID.THEAD: {
      (e.openElements.hasInTableScope(u.tagID) || e.openElements.hasInTableScope(b.TAG_ID.TR)) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = S.IN_TABLE_BODY, vi(e, u));
      break;
    }
    case b.TAG_ID.BODY:
    case b.TAG_ID.CAPTION:
    case b.TAG_ID.COL:
    case b.TAG_ID.COLGROUP:
    case b.TAG_ID.HTML:
    case b.TAG_ID.TD:
    case b.TAG_ID.TH:
      break;
    default:
      tr(e, u);
  }
}
function xm(e, u) {
  const t = u.tagID;
  Xl.has(t) ? (e.openElements.hasInTableScope(b.TAG_ID.TD) || e.openElements.hasInTableScope(b.TAG_ID.TH)) && (e._closeTableCell(), an(e, u)) : ze(e, u);
}
function Nm(e, u) {
  const t = u.tagID;
  switch (t) {
    case b.TAG_ID.TD:
    case b.TAG_ID.TH: {
      e.openElements.hasInTableScope(t) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(t), e.activeFormattingElements.clearToLastMarker(), e.insertionMode = S.IN_ROW);
      break;
    }
    case b.TAG_ID.TABLE:
    case b.TAG_ID.TBODY:
    case b.TAG_ID.TFOOT:
    case b.TAG_ID.THEAD:
    case b.TAG_ID.TR: {
      e.openElements.hasInTableScope(t) && (e._closeTableCell(), zl(e, u));
      break;
    }
    case b.TAG_ID.BODY:
    case b.TAG_ID.CAPTION:
    case b.TAG_ID.COL:
    case b.TAG_ID.COLGROUP:
    case b.TAG_ID.HTML:
      break;
    default:
      tn(e, u);
  }
}
function Ql(e, u) {
  switch (u.tagID) {
    case b.TAG_ID.HTML: {
      ze(e, u);
      break;
    }
    case b.TAG_ID.OPTION: {
      e.openElements.currentTagId === b.TAG_ID.OPTION && e.openElements.pop(), e._insertElement(u, b.NS.HTML);
      break;
    }
    case b.TAG_ID.OPTGROUP: {
      e.openElements.currentTagId === b.TAG_ID.OPTION && e.openElements.pop(), e.openElements.currentTagId === b.TAG_ID.OPTGROUP && e.openElements.pop(), e._insertElement(u, b.NS.HTML);
      break;
    }
    case b.TAG_ID.INPUT:
    case b.TAG_ID.KEYGEN:
    case b.TAG_ID.TEXTAREA:
    case b.TAG_ID.SELECT: {
      e.openElements.hasInSelectScope(b.TAG_ID.SELECT) && (e.openElements.popUntilTagNamePopped(b.TAG_ID.SELECT), e._resetInsertionMode(), u.tagID !== b.TAG_ID.SELECT && e._processStartTag(u));
      break;
    }
    case b.TAG_ID.SCRIPT:
    case b.TAG_ID.TEMPLATE: {
      Bu(e, u);
      break;
    }
  }
}
function Kl(e, u) {
  switch (u.tagID) {
    case b.TAG_ID.OPTGROUP: {
      e.openElements.stackTop > 0 && e.openElements.currentTagId === b.TAG_ID.OPTION && e.openElements.tagIDs[e.openElements.stackTop - 1] === b.TAG_ID.OPTGROUP && e.openElements.pop(), e.openElements.currentTagId === b.TAG_ID.OPTGROUP && e.openElements.pop();
      break;
    }
    case b.TAG_ID.OPTION: {
      e.openElements.currentTagId === b.TAG_ID.OPTION && e.openElements.pop();
      break;
    }
    case b.TAG_ID.SELECT: {
      e.openElements.hasInSelectScope(b.TAG_ID.SELECT) && (e.openElements.popUntilTagNamePopped(b.TAG_ID.SELECT), e._resetInsertionMode());
      break;
    }
    case b.TAG_ID.TEMPLATE: {
      jt(e, u);
      break;
    }
  }
}
function Im(e, u) {
  const t = u.tagID;
  t === b.TAG_ID.CAPTION || t === b.TAG_ID.TABLE || t === b.TAG_ID.TBODY || t === b.TAG_ID.TFOOT || t === b.TAG_ID.THEAD || t === b.TAG_ID.TR || t === b.TAG_ID.TD || t === b.TAG_ID.TH ? (e.openElements.popUntilTagNamePopped(b.TAG_ID.SELECT), e._resetInsertionMode(), e._processStartTag(u)) : Ql(e, u);
}
function Dm(e, u) {
  const t = u.tagID;
  t === b.TAG_ID.CAPTION || t === b.TAG_ID.TABLE || t === b.TAG_ID.TBODY || t === b.TAG_ID.TFOOT || t === b.TAG_ID.THEAD || t === b.TAG_ID.TR || t === b.TAG_ID.TD || t === b.TAG_ID.TH ? e.openElements.hasInTableScope(t) && (e.openElements.popUntilTagNamePopped(b.TAG_ID.SELECT), e._resetInsertionMode(), e.onEndTag(u)) : Kl(e, u);
}
function Cm(e, u) {
  switch (u.tagID) {
    case b.TAG_ID.BASE:
    case b.TAG_ID.BASEFONT:
    case b.TAG_ID.BGSOUND:
    case b.TAG_ID.LINK:
    case b.TAG_ID.META:
    case b.TAG_ID.NOFRAMES:
    case b.TAG_ID.SCRIPT:
    case b.TAG_ID.STYLE:
    case b.TAG_ID.TEMPLATE:
    case b.TAG_ID.TITLE: {
      Bu(e, u);
      break;
    }
    case b.TAG_ID.CAPTION:
    case b.TAG_ID.COLGROUP:
    case b.TAG_ID.TBODY:
    case b.TAG_ID.TFOOT:
    case b.TAG_ID.THEAD: {
      e.tmplInsertionModeStack[0] = S.IN_TABLE, e.insertionMode = S.IN_TABLE, v0(e, u);
      break;
    }
    case b.TAG_ID.COL: {
      e.tmplInsertionModeStack[0] = S.IN_COLUMN_GROUP, e.insertionMode = S.IN_COLUMN_GROUP, xc(e, u);
      break;
    }
    case b.TAG_ID.TR: {
      e.tmplInsertionModeStack[0] = S.IN_TABLE_BODY, e.insertionMode = S.IN_TABLE_BODY, rn(e, u);
      break;
    }
    case b.TAG_ID.TD:
    case b.TAG_ID.TH: {
      e.tmplInsertionModeStack[0] = S.IN_ROW, e.insertionMode = S.IN_ROW, an(e, u);
      break;
    }
    default:
      e.tmplInsertionModeStack[0] = S.IN_BODY, e.insertionMode = S.IN_BODY, ze(e, u);
  }
}
function Sm(e, u) {
  u.tagID === b.TAG_ID.TEMPLATE && jt(e, u);
}
function Jl(e, u) {
  e.openElements.tmplCount > 0 ? (e.openElements.popUntilTagNamePopped(b.TAG_ID.TEMPLATE), e.activeFormattingElements.clearToLastMarker(), e.tmplInsertionModeStack.shift(), e._resetInsertionMode(), e.onEof(u)) : vc(e, u);
}
function Om(e, u) {
  u.tagID === b.TAG_ID.HTML ? ze(e, u) : Ea(e, u);
}
function Zl(e, u) {
  var t;
  if (u.tagID === b.TAG_ID.HTML) {
    if (e.fragmentContext || (e.insertionMode = S.AFTER_AFTER_BODY), e.options.sourceCodeLocationInfo && e.openElements.tagIDs[0] === b.TAG_ID.HTML) {
      e._setEndLocation(e.openElements.items[0], u);
      const r = e.openElements.items[1];
      r && !(!((t = e.treeAdapter.getNodeSourceCodeLocation(r)) === null || t === void 0) && t.endTag) && e._setEndLocation(r, u);
    }
  } else
    Ea(e, u);
}
function Ea(e, u) {
  e.insertionMode = S.IN_BODY, un(e, u);
}
function Lm(e, u) {
  switch (u.tagID) {
    case b.TAG_ID.HTML: {
      ze(e, u);
      break;
    }
    case b.TAG_ID.FRAMESET: {
      e._insertElement(u, b.NS.HTML);
      break;
    }
    case b.TAG_ID.FRAME: {
      e._appendElement(u, b.NS.HTML), u.ackSelfClosing = !0;
      break;
    }
    case b.TAG_ID.NOFRAMES: {
      Bu(e, u);
      break;
    }
  }
}
function Pm(e, u) {
  u.tagID === b.TAG_ID.FRAMESET && !e.openElements.isRootHtmlElementCurrent() && (e.openElements.pop(), !e.fragmentContext && e.openElements.currentTagId !== b.TAG_ID.FRAMESET && (e.insertionMode = S.AFTER_FRAMESET));
}
function wm(e, u) {
  switch (u.tagID) {
    case b.TAG_ID.HTML: {
      ze(e, u);
      break;
    }
    case b.TAG_ID.NOFRAMES: {
      Bu(e, u);
      break;
    }
  }
}
function Rm(e, u) {
  u.tagID === b.TAG_ID.HTML && (e.insertionMode = S.AFTER_AFTER_FRAMESET);
}
function Mm(e, u) {
  u.tagID === b.TAG_ID.HTML ? ze(e, u) : Xr(e, u);
}
function Xr(e, u) {
  e.insertionMode = S.IN_BODY, un(e, u);
}
function km(e, u) {
  switch (u.tagID) {
    case b.TAG_ID.HTML: {
      ze(e, u);
      break;
    }
    case b.TAG_ID.NOFRAMES: {
      Bu(e, u);
      break;
    }
  }
}
function Bm(e, u) {
  u.chars = Ul.REPLACEMENT_CHARACTER, e._insertCharacters(u);
}
function Um(e, u) {
  e._insertCharacters(u), e.framesetOk = !1;
}
function e1(e) {
  for (; e.treeAdapter.getNamespaceURI(e.openElements.current) !== b.NS.HTML && !e._isIntegrationPoint(e.openElements.currentTagId, e.openElements.current); )
    e.openElements.pop();
}
function Hm(e, u) {
  if ($u.causesExit(u))
    e1(e), e._startTagOutsideForeignContent(u);
  else {
    const t = e._getAdjustedCurrentElement(), r = e.treeAdapter.getNamespaceURI(t);
    r === b.NS.MATHML ? $u.adjustTokenMathMLAttrs(u) : r === b.NS.SVG && ($u.adjustTokenSVGTagName(u), $u.adjustTokenSVGAttrs(u)), $u.adjustTokenXMLAttrs(u), u.selfClosing ? e._appendElement(u, r) : e._insertElement(u, r), u.ackSelfClosing = !0;
  }
}
function Fm(e, u) {
  if (u.tagID === b.TAG_ID.P || u.tagID === b.TAG_ID.BR) {
    e1(e), e._endTagOutsideForeignContent(u);
    return;
  }
  for (let t = e.openElements.stackTop; t > 0; t--) {
    const r = e.openElements.items[t];
    if (e.treeAdapter.getNamespaceURI(r) === b.NS.HTML) {
      e._endTagOutsideForeignContent(u);
      break;
    }
    const a = e.treeAdapter.getTagName(r);
    if (a.toLowerCase() === u.tagName) {
      u.tagName = a, e.openElements.shortenToLength(t);
      break;
    }
  }
}
var x0 = {}, u1 = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.escapeText = e.escapeAttribute = e.escapeUTF8 = e.escape = e.encodeXML = e.getCodePoint = e.xmlReplacer = void 0, e.xmlReplacer = /["&'<>$\x80-\uFFFF]/g;
  var u = /* @__PURE__ */ new Map([
    [34, "&quot;"],
    [38, "&amp;"],
    [39, "&apos;"],
    [60, "&lt;"],
    [62, "&gt;"]
  ]);
  e.getCodePoint = // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  String.prototype.codePointAt != null ? function(a, n) {
    return a.codePointAt(n);
  } : (
    // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
    function(a, n) {
      return (a.charCodeAt(n) & 64512) === 55296 ? (a.charCodeAt(n) - 55296) * 1024 + a.charCodeAt(n + 1) - 56320 + 65536 : a.charCodeAt(n);
    }
  );
  function t(a) {
    for (var n = "", i = 0, s; (s = e.xmlReplacer.exec(a)) !== null; ) {
      var o = s.index, d = a.charCodeAt(o), c = u.get(d);
      c !== void 0 ? (n += a.substring(i, o) + c, i = o + 1) : (n += "".concat(a.substring(i, o), "&#x").concat((0, e.getCodePoint)(a, o).toString(16), ";"), i = e.xmlReplacer.lastIndex += +((d & 64512) === 55296));
    }
    return n + a.substr(i);
  }
  e.encodeXML = t, e.escape = t;
  function r(a, n) {
    return function(s) {
      for (var o, d = 0, c = ""; o = a.exec(s); )
        d !== o.index && (c += s.substring(d, o.index)), c += n.get(o[0].charCodeAt(0)), d = o.index + 1;
      return c + s.substring(d);
    };
  }
  e.escapeUTF8 = r(/[&<>'"]/g, u), e.escapeAttribute = r(/["&\u00A0]/g, /* @__PURE__ */ new Map([
    [34, "&quot;"],
    [38, "&amp;"],
    [160, "&nbsp;"]
  ])), e.escapeText = r(/[&<>\u00A0]/g, /* @__PURE__ */ new Map([
    [38, "&amp;"],
    [60, "&lt;"],
    [62, "&gt;"],
    [160, "&nbsp;"]
  ]));
})(u1);
Object.defineProperty(x0, "__esModule", { value: !0 });
x0.serializeOuter = x0.serialize = void 0;
const Ee = ct, t1 = u1, qm = en, Gm = /* @__PURE__ */ new Set([
  Ee.TAG_NAMES.AREA,
  Ee.TAG_NAMES.BASE,
  Ee.TAG_NAMES.BASEFONT,
  Ee.TAG_NAMES.BGSOUND,
  Ee.TAG_NAMES.BR,
  Ee.TAG_NAMES.COL,
  Ee.TAG_NAMES.EMBED,
  Ee.TAG_NAMES.FRAME,
  Ee.TAG_NAMES.HR,
  Ee.TAG_NAMES.IMG,
  Ee.TAG_NAMES.INPUT,
  Ee.TAG_NAMES.KEYGEN,
  Ee.TAG_NAMES.LINK,
  Ee.TAG_NAMES.META,
  Ee.TAG_NAMES.PARAM,
  Ee.TAG_NAMES.SOURCE,
  Ee.TAG_NAMES.TRACK,
  Ee.TAG_NAMES.WBR
]);
function r1(e, u) {
  return u.treeAdapter.isElementNode(e) && u.treeAdapter.getNamespaceURI(e) === Ee.NS.HTML && Gm.has(u.treeAdapter.getTagName(e));
}
const a1 = { treeAdapter: qm.defaultTreeAdapter, scriptingEnabled: !0 };
function jm(e, u) {
  const t = Object.assign(Object.assign({}, a1), u);
  return r1(e, t) ? "" : n1(e, t);
}
x0.serialize = jm;
function $m(e, u) {
  const t = Object.assign(Object.assign({}, a1), u);
  return i1(e, t);
}
x0.serializeOuter = $m;
function n1(e, u) {
  let t = "";
  const r = u.treeAdapter.isElementNode(e) && u.treeAdapter.getTagName(e) === Ee.TAG_NAMES.TEMPLATE && u.treeAdapter.getNamespaceURI(e) === Ee.NS.HTML ? u.treeAdapter.getTemplateContent(e) : e, a = u.treeAdapter.getChildNodes(r);
  if (a)
    for (const n of a)
      t += i1(n, u);
  return t;
}
function i1(e, u) {
  return u.treeAdapter.isElementNode(e) ? Vm(e, u) : u.treeAdapter.isTextNode(e) ? Wm(e, u) : u.treeAdapter.isCommentNode(e) ? Xm(e, u) : u.treeAdapter.isDocumentTypeNode(e) ? zm(e, u) : "";
}
function Vm(e, u) {
  const t = u.treeAdapter.getTagName(e);
  return `<${t}${Ym(e, u)}>${r1(e, u) ? "" : `${n1(e, u)}</${t}>`}`;
}
function Ym(e, { treeAdapter: u }) {
  let t = "";
  for (const r of u.getAttrList(e)) {
    if (t += " ", !r.namespace)
      t += r.name;
    else
      switch (r.namespace) {
        case Ee.NS.XML: {
          t += `xml:${r.name}`;
          break;
        }
        case Ee.NS.XMLNS: {
          r.name !== "xmlns" && (t += "xmlns:"), t += r.name;
          break;
        }
        case Ee.NS.XLINK: {
          t += `xlink:${r.name}`;
          break;
        }
        default:
          t += `${r.prefix}:${r.name}`;
      }
    t += `="${(0, t1.escapeAttribute)(r.value)}"`;
  }
  return t;
}
function Wm(e, u) {
  const { treeAdapter: t } = u, r = t.getTextNodeContent(e), a = t.getParentNode(e), n = a && t.isElementNode(a) && t.getTagName(a);
  return n && t.getNamespaceURI(a) === Ee.NS.HTML && (0, Ee.hasUnescapedText)(n, u.scriptingEnabled) ? r : (0, t1.escapeText)(r);
}
function Xm(e, { treeAdapter: u }) {
  return `<!--${u.getCommentNodeContent(e)}-->`;
}
function zm(e, { treeAdapter: u }) {
  return `<!DOCTYPE ${u.getDocumentTypeNodeName(e)}>`;
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.parseFragment = e.parse = e.TokenizerMode = e.Tokenizer = e.Token = e.html = e.foreignContent = e.ErrorCodes = e.serializeOuter = e.serialize = e.Parser = e.defaultTreeAdapter = void 0;
  const u = ur;
  var t = en;
  Object.defineProperty(e, "defaultTreeAdapter", { enumerable: !0, get: function() {
    return t.defaultTreeAdapter;
  } });
  var r = ur;
  Object.defineProperty(e, "Parser", { enumerable: !0, get: function() {
    return r.Parser;
  } });
  var a = x0;
  Object.defineProperty(e, "serialize", { enumerable: !0, get: function() {
    return a.serialize;
  } }), Object.defineProperty(e, "serializeOuter", { enumerable: !0, get: function() {
    return a.serializeOuter;
  } });
  var n = yr;
  Object.defineProperty(e, "ErrorCodes", { enumerable: !0, get: function() {
    return n.ERR;
  } }), e.foreignContent = yc, e.html = ct, e.Token = Ja;
  var i = kt;
  Object.defineProperty(e, "Tokenizer", { enumerable: !0, get: function() {
    return i.Tokenizer;
  } }), Object.defineProperty(e, "TokenizerMode", { enumerable: !0, get: function() {
    return i.TokenizerMode;
  } });
  function s(d, c) {
    return u.Parser.parse(d, c);
  }
  e.parse = s;
  function o(d, c, E) {
    typeof d == "string" && (E = c, c = d, d = null);
    const f = u.Parser.getFragmentParser(d, E);
    return f.tokenizer.write(c, !0), f.getFragment();
  }
  e.parseFragment = o;
})(er);
var c1 = {}, s1 = {}, se = {}, yt = C && C.__extends || /* @__PURE__ */ function() {
  var e = function(u, t) {
    return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, a) {
      r.__proto__ = a;
    } || function(r, a) {
      for (var n in a)
        Object.prototype.hasOwnProperty.call(a, n) && (r[n] = a[n]);
    }, e(u, t);
  };
  return function(u, t) {
    if (typeof t != "function" && t !== null)
      throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
    e(u, t);
    function r() {
      this.constructor = u;
    }
    u.prototype = t === null ? Object.create(t) : (r.prototype = t.prototype, new r());
  };
}(), Q0 = C && C.__assign || function() {
  return Q0 = Object.assign || function(e) {
    for (var u, t = 1, r = arguments.length; t < r; t++) {
      u = arguments[t];
      for (var a in u)
        Object.prototype.hasOwnProperty.call(u, a) && (e[a] = u[a]);
    }
    return e;
  }, Q0.apply(this, arguments);
};
Object.defineProperty(se, "__esModule", { value: !0 });
se.cloneNode = se.hasChildren = se.isDocument = se.isDirective = se.isComment = se.isText = se.isCDATA = se.isTag = se.Element = se.Document = se.CDATA = se.NodeWithChildren = se.ProcessingInstruction = se.Comment = se.Text = se.DataNode = se.Node = void 0;
var mu = Be, Nc = (
  /** @class */
  function() {
    function e() {
      this.parent = null, this.prev = null, this.next = null, this.startIndex = null, this.endIndex = null;
    }
    return Object.defineProperty(e.prototype, "parentNode", {
      // Read-write aliases for properties
      /**
       * Same as {@link parent}.
       * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
       */
      get: function() {
        return this.parent;
      },
      set: function(u) {
        this.parent = u;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "previousSibling", {
      /**
       * Same as {@link prev}.
       * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
       */
      get: function() {
        return this.prev;
      },
      set: function(u) {
        this.prev = u;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "nextSibling", {
      /**
       * Same as {@link next}.
       * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
       */
      get: function() {
        return this.next;
      },
      set: function(u) {
        this.next = u;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.cloneNode = function(u) {
      return u === void 0 && (u = !1), Ic(this, u);
    }, e;
  }()
);
se.Node = Nc;
var nn = (
  /** @class */
  function(e) {
    yt(u, e);
    function u(t) {
      var r = e.call(this) || this;
      return r.data = t, r;
    }
    return Object.defineProperty(u.prototype, "nodeValue", {
      /**
       * Same as {@link data}.
       * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
       */
      get: function() {
        return this.data;
      },
      set: function(t) {
        this.data = t;
      },
      enumerable: !1,
      configurable: !0
    }), u;
  }(Nc)
);
se.DataNode = nn;
var o1 = (
  /** @class */
  function(e) {
    yt(u, e);
    function u() {
      var t = e !== null && e.apply(this, arguments) || this;
      return t.type = mu.ElementType.Text, t;
    }
    return Object.defineProperty(u.prototype, "nodeType", {
      get: function() {
        return 3;
      },
      enumerable: !1,
      configurable: !0
    }), u;
  }(nn)
);
se.Text = o1;
var d1 = (
  /** @class */
  function(e) {
    yt(u, e);
    function u() {
      var t = e !== null && e.apply(this, arguments) || this;
      return t.type = mu.ElementType.Comment, t;
    }
    return Object.defineProperty(u.prototype, "nodeType", {
      get: function() {
        return 8;
      },
      enumerable: !1,
      configurable: !0
    }), u;
  }(nn)
);
se.Comment = d1;
var l1 = (
  /** @class */
  function(e) {
    yt(u, e);
    function u(t, r) {
      var a = e.call(this, r) || this;
      return a.name = t, a.type = mu.ElementType.Directive, a;
    }
    return Object.defineProperty(u.prototype, "nodeType", {
      get: function() {
        return 1;
      },
      enumerable: !1,
      configurable: !0
    }), u;
  }(nn)
);
se.ProcessingInstruction = l1;
var cn = (
  /** @class */
  function(e) {
    yt(u, e);
    function u(t) {
      var r = e.call(this) || this;
      return r.children = t, r;
    }
    return Object.defineProperty(u.prototype, "firstChild", {
      // Aliases
      /** First child of the node. */
      get: function() {
        var t;
        return (t = this.children[0]) !== null && t !== void 0 ? t : null;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(u.prototype, "lastChild", {
      /** Last child of the node. */
      get: function() {
        return this.children.length > 0 ? this.children[this.children.length - 1] : null;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(u.prototype, "childNodes", {
      /**
       * Same as {@link children}.
       * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
       */
      get: function() {
        return this.children;
      },
      set: function(t) {
        this.children = t;
      },
      enumerable: !1,
      configurable: !0
    }), u;
  }(Nc)
);
se.NodeWithChildren = cn;
var f1 = (
  /** @class */
  function(e) {
    yt(u, e);
    function u() {
      var t = e !== null && e.apply(this, arguments) || this;
      return t.type = mu.ElementType.CDATA, t;
    }
    return Object.defineProperty(u.prototype, "nodeType", {
      get: function() {
        return 4;
      },
      enumerable: !1,
      configurable: !0
    }), u;
  }(cn)
);
se.CDATA = f1;
var b1 = (
  /** @class */
  function(e) {
    yt(u, e);
    function u() {
      var t = e !== null && e.apply(this, arguments) || this;
      return t.type = mu.ElementType.Root, t;
    }
    return Object.defineProperty(u.prototype, "nodeType", {
      get: function() {
        return 9;
      },
      enumerable: !1,
      configurable: !0
    }), u;
  }(cn)
);
se.Document = b1;
var h1 = (
  /** @class */
  function(e) {
    yt(u, e);
    function u(t, r, a, n) {
      a === void 0 && (a = []), n === void 0 && (n = t === "script" ? mu.ElementType.Script : t === "style" ? mu.ElementType.Style : mu.ElementType.Tag);
      var i = e.call(this, a) || this;
      return i.name = t, i.attribs = r, i.type = n, i;
    }
    return Object.defineProperty(u.prototype, "nodeType", {
      get: function() {
        return 1;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(u.prototype, "tagName", {
      // DOM Level 1 aliases
      /**
       * Same as {@link name}.
       * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
       */
      get: function() {
        return this.name;
      },
      set: function(t) {
        this.name = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(u.prototype, "attributes", {
      get: function() {
        var t = this;
        return Object.keys(this.attribs).map(function(r) {
          var a, n;
          return {
            name: r,
            value: t.attribs[r],
            namespace: (a = t["x-attribsNamespace"]) === null || a === void 0 ? void 0 : a[r],
            prefix: (n = t["x-attribsPrefix"]) === null || n === void 0 ? void 0 : n[r]
          };
        });
      },
      enumerable: !1,
      configurable: !0
    }), u;
  }(cn)
);
se.Element = h1;
function p1(e) {
  return (0, mu.isTag)(e);
}
se.isTag = p1;
function m1(e) {
  return e.type === mu.ElementType.CDATA;
}
se.isCDATA = m1;
function g1(e) {
  return e.type === mu.ElementType.Text;
}
se.isText = g1;
function E1(e) {
  return e.type === mu.ElementType.Comment;
}
se.isComment = E1;
function T1(e) {
  return e.type === mu.ElementType.Directive;
}
se.isDirective = T1;
function _1(e) {
  return e.type === mu.ElementType.Root;
}
se.isDocument = _1;
function Qm(e) {
  return Object.prototype.hasOwnProperty.call(e, "children");
}
se.hasChildren = Qm;
function Ic(e, u) {
  u === void 0 && (u = !1);
  var t;
  if (g1(e))
    t = new o1(e.data);
  else if (E1(e))
    t = new d1(e.data);
  else if (p1(e)) {
    var r = u ? wn(e.children) : [], a = new h1(e.name, Q0({}, e.attribs), r);
    r.forEach(function(o) {
      return o.parent = a;
    }), e.namespace != null && (a.namespace = e.namespace), e["x-attribsNamespace"] && (a["x-attribsNamespace"] = Q0({}, e["x-attribsNamespace"])), e["x-attribsPrefix"] && (a["x-attribsPrefix"] = Q0({}, e["x-attribsPrefix"])), t = a;
  } else if (m1(e)) {
    var r = u ? wn(e.children) : [], n = new f1(r);
    r.forEach(function(d) {
      return d.parent = n;
    }), t = n;
  } else if (_1(e)) {
    var r = u ? wn(e.children) : [], i = new b1(r);
    r.forEach(function(d) {
      return d.parent = i;
    }), e["x-mode"] && (i["x-mode"] = e["x-mode"]), t = i;
  } else if (T1(e)) {
    var s = new l1(e.name, e.data);
    e["x-name"] != null && (s["x-name"] = e["x-name"], s["x-publicId"] = e["x-publicId"], s["x-systemId"] = e["x-systemId"]), t = s;
  } else
    throw new Error("Not implemented yet: ".concat(e.type));
  return t.startIndex = e.startIndex, t.endIndex = e.endIndex, e.sourceCodeLocation != null && (t.sourceCodeLocation = e.sourceCodeLocation), t;
}
se.cloneNode = Ic;
function wn(e) {
  for (var u = e.map(function(r) {
    return Ic(r, !0);
  }), t = 1; t < u.length; t++)
    u[t].prev = u[t - 1], u[t - 1].next = u[t];
  return u;
}
(function(e) {
  var u = C && C.__createBinding || (Object.create ? function(s, o, d, c) {
    c === void 0 && (c = d);
    var E = Object.getOwnPropertyDescriptor(o, d);
    (!E || ("get" in E ? !o.__esModule : E.writable || E.configurable)) && (E = { enumerable: !0, get: function() {
      return o[d];
    } }), Object.defineProperty(s, c, E);
  } : function(s, o, d, c) {
    c === void 0 && (c = d), s[c] = o[d];
  }), t = C && C.__exportStar || function(s, o) {
    for (var d in s)
      d !== "default" && !Object.prototype.hasOwnProperty.call(o, d) && u(o, s, d);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.DomHandler = void 0;
  var r = Be, a = se;
  t(se, e);
  var n = {
    withStartIndices: !1,
    withEndIndices: !1,
    xmlMode: !1
  }, i = (
    /** @class */
    function() {
      function s(o, d, c) {
        this.dom = [], this.root = new a.Document(this.dom), this.done = !1, this.tagStack = [this.root], this.lastNode = null, this.parser = null, typeof d == "function" && (c = d, d = n), typeof o == "object" && (d = o, o = void 0), this.callback = o ?? null, this.options = d ?? n, this.elementCB = c ?? null;
      }
      return s.prototype.onparserinit = function(o) {
        this.parser = o;
      }, s.prototype.onreset = function() {
        this.dom = [], this.root = new a.Document(this.dom), this.done = !1, this.tagStack = [this.root], this.lastNode = null, this.parser = null;
      }, s.prototype.onend = function() {
        this.done || (this.done = !0, this.parser = null, this.handleCallback(null));
      }, s.prototype.onerror = function(o) {
        this.handleCallback(o);
      }, s.prototype.onclosetag = function() {
        this.lastNode = null;
        var o = this.tagStack.pop();
        this.options.withEndIndices && (o.endIndex = this.parser.endIndex), this.elementCB && this.elementCB(o);
      }, s.prototype.onopentag = function(o, d) {
        var c = this.options.xmlMode ? r.ElementType.Tag : void 0, E = new a.Element(o, d, void 0, c);
        this.addNode(E), this.tagStack.push(E);
      }, s.prototype.ontext = function(o) {
        var d = this.lastNode;
        if (d && d.type === r.ElementType.Text)
          d.data += o, this.options.withEndIndices && (d.endIndex = this.parser.endIndex);
        else {
          var c = new a.Text(o);
          this.addNode(c), this.lastNode = c;
        }
      }, s.prototype.oncomment = function(o) {
        if (this.lastNode && this.lastNode.type === r.ElementType.Comment) {
          this.lastNode.data += o;
          return;
        }
        var d = new a.Comment(o);
        this.addNode(d), this.lastNode = d;
      }, s.prototype.oncommentend = function() {
        this.lastNode = null;
      }, s.prototype.oncdatastart = function() {
        var o = new a.Text(""), d = new a.CDATA([o]);
        this.addNode(d), o.parent = d, this.lastNode = o;
      }, s.prototype.oncdataend = function() {
        this.lastNode = null;
      }, s.prototype.onprocessinginstruction = function(o, d) {
        var c = new a.ProcessingInstruction(o, d);
        this.addNode(c);
      }, s.prototype.handleCallback = function(o) {
        if (typeof this.callback == "function")
          this.callback(o, this.dom);
        else if (o)
          throw o;
      }, s.prototype.addNode = function(o) {
        var d = this.tagStack[this.tagStack.length - 1], c = d.children[d.children.length - 1];
        this.options.withStartIndices && (o.startIndex = this.parser.startIndex), this.options.withEndIndices && (o.endIndex = this.parser.endIndex), d.children.push(o), c && (o.prev = c, c.next = o), o.parent = d, this.lastNode = null;
      }, s;
    }()
  );
  e.DomHandler = i, e.default = i;
})(s1);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.adapter = e.serializeDoctypeContent = void 0;
  const u = er, t = s1;
  function r(i) {
    return new t.Text(i);
  }
  function a(i) {
    const s = i.includes('"') ? "'" : '"';
    return s + i + s;
  }
  function n(i, s, o) {
    let d = "!DOCTYPE ";
    return i && (d += i), s ? d += ` PUBLIC ${a(s)}` : o && (d += " SYSTEM"), o && (d += ` ${a(o)}`), d;
  }
  e.serializeDoctypeContent = n, e.adapter = {
    // Re-exports from domhandler
    isCommentNode: t.isComment,
    isElementNode: t.isTag,
    isTextNode: t.isText,
    //Node construction
    createDocument() {
      const i = new t.Document([]);
      return i["x-mode"] = u.html.DOCUMENT_MODE.NO_QUIRKS, i;
    },
    createDocumentFragment() {
      return new t.Document([]);
    },
    createElement(i, s, o) {
      const d = /* @__PURE__ */ Object.create(null), c = /* @__PURE__ */ Object.create(null), E = /* @__PURE__ */ Object.create(null);
      for (let m = 0; m < o.length; m++) {
        const v = o[m].name;
        d[v] = o[m].value, c[v] = o[m].namespace, E[v] = o[m].prefix;
      }
      const f = new t.Element(i, d, []);
      return f.namespace = s, f["x-attribsNamespace"] = c, f["x-attribsPrefix"] = E, f;
    },
    createCommentNode(i) {
      return new t.Comment(i);
    },
    //Tree mutation
    appendChild(i, s) {
      const o = i.children[i.children.length - 1];
      o && (o.next = s, s.prev = o), i.children.push(s), s.parent = i;
    },
    insertBefore(i, s, o) {
      const d = i.children.indexOf(o), { prev: c } = o;
      c && (c.next = s, s.prev = c), o.prev = s, s.next = o, i.children.splice(d, 0, s), s.parent = i;
    },
    setTemplateContent(i, s) {
      e.adapter.appendChild(i, s);
    },
    getTemplateContent(i) {
      return i.children[0];
    },
    setDocumentType(i, s, o, d) {
      const c = n(s, o, d);
      let E = i.children.find((f) => (0, t.isDirective)(f) && f.name === "!doctype");
      E ? E.data = c ?? null : (E = new t.ProcessingInstruction("!doctype", c), e.adapter.appendChild(i, E)), E["x-name"] = s ?? void 0, E["x-publicId"] = o ?? void 0, E["x-systemId"] = d ?? void 0;
    },
    setDocumentMode(i, s) {
      i["x-mode"] = s;
    },
    getDocumentMode(i) {
      return i["x-mode"];
    },
    detachNode(i) {
      if (i.parent) {
        const s = i.parent.children.indexOf(i), { prev: o, next: d } = i;
        i.prev = null, i.next = null, o && (o.next = d), d && (d.prev = o), i.parent.children.splice(s, 1), i.parent = null;
      }
    },
    insertText(i, s) {
      const o = i.children[i.children.length - 1];
      o && (0, t.isText)(o) ? o.data += s : e.adapter.appendChild(i, r(s));
    },
    insertTextBefore(i, s, o) {
      const d = i.children[i.children.indexOf(o) - 1];
      d && (0, t.isText)(d) ? d.data += s : e.adapter.insertBefore(i, r(s), o);
    },
    adoptAttributes(i, s) {
      for (let o = 0; o < s.length; o++) {
        const d = s[o].name;
        typeof i.attribs[d] > "u" && (i.attribs[d] = s[o].value, i["x-attribsNamespace"][d] = s[o].namespace, i["x-attribsPrefix"][d] = s[o].prefix);
      }
    },
    //Tree traversing
    getFirstChild(i) {
      return i.children[0];
    },
    getChildNodes(i) {
      return i.children;
    },
    getParentNode(i) {
      return i.parent;
    },
    getAttrList(i) {
      return i.attributes;
    },
    //Node data
    getTagName(i) {
      return i.name;
    },
    getNamespaceURI(i) {
      return i.namespace;
    },
    getTextNodeContent(i) {
      return i.data;
    },
    getCommentNodeContent(i) {
      return i.data;
    },
    getDocumentTypeNodeName(i) {
      var s;
      return (s = i["x-name"]) !== null && s !== void 0 ? s : "";
    },
    getDocumentTypeNodePublicId(i) {
      var s;
      return (s = i["x-publicId"]) !== null && s !== void 0 ? s : "";
    },
    getDocumentTypeNodeSystemId(i) {
      var s;
      return (s = i["x-systemId"]) !== null && s !== void 0 ? s : "";
    },
    //Node types
    isDocumentTypeNode(i) {
      return (0, t.isDirective)(i) && i.name === "!doctype";
    },
    // Source code location
    setNodeSourceCodeLocation(i, s) {
      s && (i.startIndex = s.startOffset, i.endIndex = s.endOffset), i.sourceCodeLocation = s;
    },
    getNodeSourceCodeLocation(i) {
      return i.sourceCodeLocation;
    },
    updateNodeSourceCodeLocation(i, s) {
      s.endOffset != null && (i.endIndex = s.endOffset), i.sourceCodeLocation = Object.assign(Object.assign({}, i.sourceCodeLocation), s);
    }
  };
})(c1);
var Km = C && C.__spreadArray || function(e, u, t) {
  if (t || arguments.length === 2)
    for (var r = 0, a = u.length, n; r < a; r++)
      (n || !(r in u)) && (n || (n = Array.prototype.slice.call(u, 0, r)), n[r] = u[r]);
  return e.concat(n || Array.prototype.slice.call(u));
};
Object.defineProperty(y0, "__esModule", { value: !0 });
y0.renderWithParse5 = y0.parseWithParse5 = void 0;
var Jm = Ou, xi = er, y1 = c1;
function Zm(e, u, t, r) {
  var a = {
    scriptingEnabled: typeof u.scriptingEnabled == "boolean" ? u.scriptingEnabled : !0,
    treeAdapter: y1.adapter,
    sourceCodeLocationInfo: u.sourceCodeLocationInfo
  };
  return t ? (0, xi.parse)(e, a) : (0, xi.parseFragment)(r, e, a);
}
y0.parseWithParse5 = Zm;
var e8 = { treeAdapter: y1.adapter };
function u8(e) {
  for (var u, t = ("length" in e) ? e : [e], r = 0; r < t.length; r += 1) {
    var a = t[r];
    (0, Jm.isDocument)(a) && (u = Array.prototype.splice).call.apply(u, Km([t, r, 1], a.children, !1));
  }
  for (var n = "", r = 0; r < t.length; r += 1) {
    var a = t[r];
    n += (0, xi.serializeOuter)(a, e8);
  }
  return n;
}
y0.renderWithParse5 = u8;
var A1 = {}, rr = {}, Dc = {}, ar = {}, Cc = {};
Object.defineProperty(Cc, "__esModule", { value: !0 });
Cc.default = new Uint16Array(
  // prettier-ignore
  'ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map(function(e) {
    return e.charCodeAt(0);
  })
);
var Sc = {};
Object.defineProperty(Sc, "__esModule", { value: !0 });
Sc.default = new Uint16Array(
  // prettier-ignore
  "Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map(function(e) {
    return e.charCodeAt(0);
  })
);
var Ni = {};
(function(e) {
  var u;
  Object.defineProperty(e, "__esModule", { value: !0 }), e.replaceCodePoint = e.fromCodePoint = void 0;
  var t = /* @__PURE__ */ new Map([
    [0, 65533],
    // C1 Unicode control character reference replacements
    [128, 8364],
    [130, 8218],
    [131, 402],
    [132, 8222],
    [133, 8230],
    [134, 8224],
    [135, 8225],
    [136, 710],
    [137, 8240],
    [138, 352],
    [139, 8249],
    [140, 338],
    [142, 381],
    [145, 8216],
    [146, 8217],
    [147, 8220],
    [148, 8221],
    [149, 8226],
    [150, 8211],
    [151, 8212],
    [152, 732],
    [153, 8482],
    [154, 353],
    [155, 8250],
    [156, 339],
    [158, 382],
    [159, 376]
  ]);
  e.fromCodePoint = // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, node/no-unsupported-features/es-builtins
  (u = String.fromCodePoint) !== null && u !== void 0 ? u : function(n) {
    var i = "";
    return n > 65535 && (n -= 65536, i += String.fromCharCode(n >>> 10 & 1023 | 55296), n = 56320 | n & 1023), i += String.fromCharCode(n), i;
  };
  function r(n) {
    var i;
    return n >= 55296 && n <= 57343 || n > 1114111 ? 65533 : (i = t.get(n)) !== null && i !== void 0 ? i : n;
  }
  e.replaceCodePoint = r;
  function a(n) {
    return (0, e.fromCodePoint)(r(n));
  }
  e.default = a;
})(Ni);
(function(e) {
  var u = C && C.__createBinding || (Object.create ? function(l, g, T, A) {
    A === void 0 && (A = T);
    var D = Object.getOwnPropertyDescriptor(g, T);
    (!D || ("get" in D ? !g.__esModule : D.writable || D.configurable)) && (D = { enumerable: !0, get: function() {
      return g[T];
    } }), Object.defineProperty(l, A, D);
  } : function(l, g, T, A) {
    A === void 0 && (A = T), l[A] = g[T];
  }), t = C && C.__setModuleDefault || (Object.create ? function(l, g) {
    Object.defineProperty(l, "default", { enumerable: !0, value: g });
  } : function(l, g) {
    l.default = g;
  }), r = C && C.__importStar || function(l) {
    if (l && l.__esModule)
      return l;
    var g = {};
    if (l != null)
      for (var T in l)
        T !== "default" && Object.prototype.hasOwnProperty.call(l, T) && u(g, l, T);
    return t(g, l), g;
  }, a = C && C.__importDefault || function(l) {
    return l && l.__esModule ? l : { default: l };
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.decodeXML = e.decodeHTMLStrict = e.decodeHTMLAttribute = e.decodeHTML = e.determineBranch = e.EntityDecoder = e.DecodingMode = e.BinTrieFlags = e.fromCodePoint = e.replaceCodePoint = e.decodeCodePoint = e.xmlDecodeTree = e.htmlDecodeTree = void 0;
  var n = a(Cc);
  e.htmlDecodeTree = n.default;
  var i = a(Sc);
  e.xmlDecodeTree = i.default;
  var s = r(Ni);
  e.decodeCodePoint = s.default;
  var o = Ni;
  Object.defineProperty(e, "replaceCodePoint", { enumerable: !0, get: function() {
    return o.replaceCodePoint;
  } }), Object.defineProperty(e, "fromCodePoint", { enumerable: !0, get: function() {
    return o.fromCodePoint;
  } });
  var d;
  (function(l) {
    l[l.NUM = 35] = "NUM", l[l.SEMI = 59] = "SEMI", l[l.EQUALS = 61] = "EQUALS", l[l.ZERO = 48] = "ZERO", l[l.NINE = 57] = "NINE", l[l.LOWER_A = 97] = "LOWER_A", l[l.LOWER_F = 102] = "LOWER_F", l[l.LOWER_X = 120] = "LOWER_X", l[l.LOWER_Z = 122] = "LOWER_Z", l[l.UPPER_A = 65] = "UPPER_A", l[l.UPPER_F = 70] = "UPPER_F", l[l.UPPER_Z = 90] = "UPPER_Z";
  })(d || (d = {}));
  var c = 32, E;
  (function(l) {
    l[l.VALUE_LENGTH = 49152] = "VALUE_LENGTH", l[l.BRANCH_LENGTH = 16256] = "BRANCH_LENGTH", l[l.JUMP_TABLE = 127] = "JUMP_TABLE";
  })(E = e.BinTrieFlags || (e.BinTrieFlags = {}));
  function f(l) {
    return l >= d.ZERO && l <= d.NINE;
  }
  function m(l) {
    return l >= d.UPPER_A && l <= d.UPPER_F || l >= d.LOWER_A && l <= d.LOWER_F;
  }
  function v(l) {
    return l >= d.UPPER_A && l <= d.UPPER_Z || l >= d.LOWER_A && l <= d.LOWER_Z || f(l);
  }
  function L(l) {
    return l === d.EQUALS || v(l);
  }
  var N;
  (function(l) {
    l[l.EntityStart = 0] = "EntityStart", l[l.NumericStart = 1] = "NumericStart", l[l.NumericDecimal = 2] = "NumericDecimal", l[l.NumericHex = 3] = "NumericHex", l[l.NamedEntity = 4] = "NamedEntity";
  })(N || (N = {}));
  var O;
  (function(l) {
    l[l.Legacy = 0] = "Legacy", l[l.Strict = 1] = "Strict", l[l.Attribute = 2] = "Attribute";
  })(O = e.DecodingMode || (e.DecodingMode = {}));
  var w = (
    /** @class */
    function() {
      function l(g, T, A) {
        this.decodeTree = g, this.emitCodePoint = T, this.errors = A, this.state = N.EntityStart, this.consumed = 1, this.result = 0, this.treeIndex = 0, this.excess = 1, this.decodeMode = O.Strict;
      }
      return l.prototype.startEntity = function(g) {
        this.decodeMode = g, this.state = N.EntityStart, this.result = 0, this.treeIndex = 0, this.excess = 1, this.consumed = 1;
      }, l.prototype.write = function(g, T) {
        switch (this.state) {
          case N.EntityStart:
            return g.charCodeAt(T) === d.NUM ? (this.state = N.NumericStart, this.consumed += 1, this.stateNumericStart(g, T + 1)) : (this.state = N.NamedEntity, this.stateNamedEntity(g, T));
          case N.NumericStart:
            return this.stateNumericStart(g, T);
          case N.NumericDecimal:
            return this.stateNumericDecimal(g, T);
          case N.NumericHex:
            return this.stateNumericHex(g, T);
          case N.NamedEntity:
            return this.stateNamedEntity(g, T);
        }
      }, l.prototype.stateNumericStart = function(g, T) {
        return T >= g.length ? -1 : (g.charCodeAt(T) | c) === d.LOWER_X ? (this.state = N.NumericHex, this.consumed += 1, this.stateNumericHex(g, T + 1)) : (this.state = N.NumericDecimal, this.stateNumericDecimal(g, T));
      }, l.prototype.addToNumericResult = function(g, T, A, D) {
        if (T !== A) {
          var B = A - T;
          this.result = this.result * Math.pow(D, B) + parseInt(g.substr(T, B), D), this.consumed += B;
        }
      }, l.prototype.stateNumericHex = function(g, T) {
        for (var A = T; T < g.length; ) {
          var D = g.charCodeAt(T);
          if (f(D) || m(D))
            T += 1;
          else
            return this.addToNumericResult(g, A, T, 16), this.emitNumericEntity(D, 3);
        }
        return this.addToNumericResult(g, A, T, 16), -1;
      }, l.prototype.stateNumericDecimal = function(g, T) {
        for (var A = T; T < g.length; ) {
          var D = g.charCodeAt(T);
          if (f(D))
            T += 1;
          else
            return this.addToNumericResult(g, A, T, 10), this.emitNumericEntity(D, 2);
        }
        return this.addToNumericResult(g, A, T, 10), -1;
      }, l.prototype.emitNumericEntity = function(g, T) {
        var A;
        if (this.consumed <= T)
          return (A = this.errors) === null || A === void 0 || A.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
        if (g === d.SEMI)
          this.consumed += 1;
        else if (this.decodeMode === O.Strict)
          return 0;
        return this.emitCodePoint((0, s.replaceCodePoint)(this.result), this.consumed), this.errors && (g !== d.SEMI && this.errors.missingSemicolonAfterCharacterReference(), this.errors.validateNumericCharacterReference(this.result)), this.consumed;
      }, l.prototype.stateNamedEntity = function(g, T) {
        for (var A = this.decodeTree, D = A[this.treeIndex], B = (D & E.VALUE_LENGTH) >> 14; T < g.length; T++, this.excess++) {
          var M = g.charCodeAt(T);
          if (this.treeIndex = k(A, D, this.treeIndex + Math.max(1, B), M), this.treeIndex < 0)
            return this.result === 0 || // If we are parsing an attribute
            this.decodeMode === O.Attribute && // We shouldn't have consumed any characters after the entity,
            (B === 0 || // And there should be no invalid characters.
            L(M)) ? 0 : this.emitNotTerminatedNamedEntity();
          if (D = A[this.treeIndex], B = (D & E.VALUE_LENGTH) >> 14, B !== 0) {
            if (M === d.SEMI)
              return this.emitNamedEntityData(this.treeIndex, B, this.consumed + this.excess);
            this.decodeMode !== O.Strict && (this.result = this.treeIndex, this.consumed += this.excess, this.excess = 0);
          }
        }
        return -1;
      }, l.prototype.emitNotTerminatedNamedEntity = function() {
        var g, T = this, A = T.result, D = T.decodeTree, B = (D[A] & E.VALUE_LENGTH) >> 14;
        return this.emitNamedEntityData(A, B, this.consumed), (g = this.errors) === null || g === void 0 || g.missingSemicolonAfterCharacterReference(), this.consumed;
      }, l.prototype.emitNamedEntityData = function(g, T, A) {
        var D = this.decodeTree;
        return this.emitCodePoint(T === 1 ? D[g] & ~E.VALUE_LENGTH : D[g + 1], A), T === 3 && this.emitCodePoint(D[g + 2], A), A;
      }, l.prototype.end = function() {
        var g;
        switch (this.state) {
          case N.NamedEntity:
            return this.result !== 0 && (this.decodeMode !== O.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
          case N.NumericDecimal:
            return this.emitNumericEntity(0, 2);
          case N.NumericHex:
            return this.emitNumericEntity(0, 3);
          case N.NumericStart:
            return (g = this.errors) === null || g === void 0 || g.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
          case N.EntityStart:
            return 0;
        }
      }, l;
    }()
  );
  e.EntityDecoder = w;
  function H(l) {
    var g = "", T = new w(l, function(A) {
      return g += (0, s.fromCodePoint)(A);
    });
    return function(D, B) {
      for (var M = 0, $ = 0; ($ = D.indexOf("&", $)) >= 0; ) {
        g += D.slice(M, $), T.startEntity(B);
        var J = T.write(
          D,
          // Skip the "&"
          $ + 1
        );
        if (J < 0) {
          M = $ + T.end();
          break;
        }
        M = $ + J, $ = J === 0 ? M + 1 : M;
      }
      var z = g + D.slice(M);
      return g = "", z;
    };
  }
  function k(l, g, T, A) {
    var D = (g & E.BRANCH_LENGTH) >> 7, B = g & E.JUMP_TABLE;
    if (D === 0)
      return B !== 0 && A === B ? T : -1;
    if (B) {
      var M = A - B;
      return M < 0 || M >= D ? -1 : l[T + M] - 1;
    }
    for (var $ = T, J = $ + D - 1; $ <= J; ) {
      var z = $ + J >>> 1, be = l[z];
      if (be < A)
        $ = z + 1;
      else if (be > A)
        J = z - 1;
      else
        return l[z + D];
    }
    return -1;
  }
  e.determineBranch = k;
  var R = H(n.default), G = H(i.default);
  function X(l, g) {
    return g === void 0 && (g = O.Legacy), R(l, g);
  }
  e.decodeHTML = X;
  function Z(l) {
    return R(l, O.Attribute);
  }
  e.decodeHTMLAttribute = Z;
  function re(l) {
    return R(l, O.Strict);
  }
  e.decodeHTMLStrict = re;
  function Y(l) {
    return G(l, O.Strict);
  }
  e.decodeXML = Y;
})(ar);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.QuoteType = void 0;
  var u = ar, t;
  (function(f) {
    f[f.Tab = 9] = "Tab", f[f.NewLine = 10] = "NewLine", f[f.FormFeed = 12] = "FormFeed", f[f.CarriageReturn = 13] = "CarriageReturn", f[f.Space = 32] = "Space", f[f.ExclamationMark = 33] = "ExclamationMark", f[f.Number = 35] = "Number", f[f.Amp = 38] = "Amp", f[f.SingleQuote = 39] = "SingleQuote", f[f.DoubleQuote = 34] = "DoubleQuote", f[f.Dash = 45] = "Dash", f[f.Slash = 47] = "Slash", f[f.Zero = 48] = "Zero", f[f.Nine = 57] = "Nine", f[f.Semi = 59] = "Semi", f[f.Lt = 60] = "Lt", f[f.Eq = 61] = "Eq", f[f.Gt = 62] = "Gt", f[f.Questionmark = 63] = "Questionmark", f[f.UpperA = 65] = "UpperA", f[f.LowerA = 97] = "LowerA", f[f.UpperF = 70] = "UpperF", f[f.LowerF = 102] = "LowerF", f[f.UpperZ = 90] = "UpperZ", f[f.LowerZ = 122] = "LowerZ", f[f.LowerX = 120] = "LowerX", f[f.OpeningSquareBracket = 91] = "OpeningSquareBracket";
  })(t || (t = {}));
  var r;
  (function(f) {
    f[f.Text = 1] = "Text", f[f.BeforeTagName = 2] = "BeforeTagName", f[f.InTagName = 3] = "InTagName", f[f.InSelfClosingTag = 4] = "InSelfClosingTag", f[f.BeforeClosingTagName = 5] = "BeforeClosingTagName", f[f.InClosingTagName = 6] = "InClosingTagName", f[f.AfterClosingTagName = 7] = "AfterClosingTagName", f[f.BeforeAttributeName = 8] = "BeforeAttributeName", f[f.InAttributeName = 9] = "InAttributeName", f[f.AfterAttributeName = 10] = "AfterAttributeName", f[f.BeforeAttributeValue = 11] = "BeforeAttributeValue", f[f.InAttributeValueDq = 12] = "InAttributeValueDq", f[f.InAttributeValueSq = 13] = "InAttributeValueSq", f[f.InAttributeValueNq = 14] = "InAttributeValueNq", f[f.BeforeDeclaration = 15] = "BeforeDeclaration", f[f.InDeclaration = 16] = "InDeclaration", f[f.InProcessingInstruction = 17] = "InProcessingInstruction", f[f.BeforeComment = 18] = "BeforeComment", f[f.CDATASequence = 19] = "CDATASequence", f[f.InSpecialComment = 20] = "InSpecialComment", f[f.InCommentLike = 21] = "InCommentLike", f[f.BeforeSpecialS = 22] = "BeforeSpecialS", f[f.SpecialStartSequence = 23] = "SpecialStartSequence", f[f.InSpecialTag = 24] = "InSpecialTag", f[f.BeforeEntity = 25] = "BeforeEntity", f[f.BeforeNumericEntity = 26] = "BeforeNumericEntity", f[f.InNamedEntity = 27] = "InNamedEntity", f[f.InNumericEntity = 28] = "InNumericEntity", f[f.InHexEntity = 29] = "InHexEntity";
  })(r || (r = {}));
  function a(f) {
    return f === t.Space || f === t.NewLine || f === t.Tab || f === t.FormFeed || f === t.CarriageReturn;
  }
  function n(f) {
    return f === t.Slash || f === t.Gt || a(f);
  }
  function i(f) {
    return f >= t.Zero && f <= t.Nine;
  }
  function s(f) {
    return f >= t.LowerA && f <= t.LowerZ || f >= t.UpperA && f <= t.UpperZ;
  }
  function o(f) {
    return f >= t.UpperA && f <= t.UpperF || f >= t.LowerA && f <= t.LowerF;
  }
  var d;
  (function(f) {
    f[f.NoValue = 0] = "NoValue", f[f.Unquoted = 1] = "Unquoted", f[f.Single = 2] = "Single", f[f.Double = 3] = "Double";
  })(d = e.QuoteType || (e.QuoteType = {}));
  var c = {
    Cdata: new Uint8Array([67, 68, 65, 84, 65, 91]),
    CdataEnd: new Uint8Array([93, 93, 62]),
    CommentEnd: new Uint8Array([45, 45, 62]),
    ScriptEnd: new Uint8Array([60, 47, 115, 99, 114, 105, 112, 116]),
    StyleEnd: new Uint8Array([60, 47, 115, 116, 121, 108, 101]),
    TitleEnd: new Uint8Array([60, 47, 116, 105, 116, 108, 101])
    // `</title`
  }, E = (
    /** @class */
    function() {
      function f(m, v) {
        var L = m.xmlMode, N = L === void 0 ? !1 : L, O = m.decodeEntities, w = O === void 0 ? !0 : O;
        this.cbs = v, this.state = r.Text, this.buffer = "", this.sectionStart = 0, this.index = 0, this.baseState = r.Text, this.isSpecial = !1, this.running = !0, this.offset = 0, this.currentSequence = void 0, this.sequenceIndex = 0, this.trieIndex = 0, this.trieCurrent = 0, this.entityResult = 0, this.entityExcess = 0, this.xmlMode = N, this.decodeEntities = w, this.entityTrie = N ? u.xmlDecodeTree : u.htmlDecodeTree;
      }
      return f.prototype.reset = function() {
        this.state = r.Text, this.buffer = "", this.sectionStart = 0, this.index = 0, this.baseState = r.Text, this.currentSequence = void 0, this.running = !0, this.offset = 0;
      }, f.prototype.write = function(m) {
        this.offset += this.buffer.length, this.buffer = m, this.parse();
      }, f.prototype.end = function() {
        this.running && this.finish();
      }, f.prototype.pause = function() {
        this.running = !1;
      }, f.prototype.resume = function() {
        this.running = !0, this.index < this.buffer.length + this.offset && this.parse();
      }, f.prototype.getIndex = function() {
        return this.index;
      }, f.prototype.getSectionStart = function() {
        return this.sectionStart;
      }, f.prototype.stateText = function(m) {
        m === t.Lt || !this.decodeEntities && this.fastForwardTo(t.Lt) ? (this.index > this.sectionStart && this.cbs.ontext(this.sectionStart, this.index), this.state = r.BeforeTagName, this.sectionStart = this.index) : this.decodeEntities && m === t.Amp && (this.state = r.BeforeEntity);
      }, f.prototype.stateSpecialStartSequence = function(m) {
        var v = this.sequenceIndex === this.currentSequence.length, L = v ? (
          // If we are at the end of the sequence, make sure the tag name has ended
          n(m)
        ) : (
          // Otherwise, do a case-insensitive comparison
          (m | 32) === this.currentSequence[this.sequenceIndex]
        );
        if (!L)
          this.isSpecial = !1;
        else if (!v) {
          this.sequenceIndex++;
          return;
        }
        this.sequenceIndex = 0, this.state = r.InTagName, this.stateInTagName(m);
      }, f.prototype.stateInSpecialTag = function(m) {
        if (this.sequenceIndex === this.currentSequence.length) {
          if (m === t.Gt || a(m)) {
            var v = this.index - this.currentSequence.length;
            if (this.sectionStart < v) {
              var L = this.index;
              this.index = v, this.cbs.ontext(this.sectionStart, v), this.index = L;
            }
            this.isSpecial = !1, this.sectionStart = v + 2, this.stateInClosingTagName(m);
            return;
          }
          this.sequenceIndex = 0;
        }
        (m | 32) === this.currentSequence[this.sequenceIndex] ? this.sequenceIndex += 1 : this.sequenceIndex === 0 ? this.currentSequence === c.TitleEnd ? this.decodeEntities && m === t.Amp && (this.state = r.BeforeEntity) : this.fastForwardTo(t.Lt) && (this.sequenceIndex = 1) : this.sequenceIndex = +(m === t.Lt);
      }, f.prototype.stateCDATASequence = function(m) {
        m === c.Cdata[this.sequenceIndex] ? ++this.sequenceIndex === c.Cdata.length && (this.state = r.InCommentLike, this.currentSequence = c.CdataEnd, this.sequenceIndex = 0, this.sectionStart = this.index + 1) : (this.sequenceIndex = 0, this.state = r.InDeclaration, this.stateInDeclaration(m));
      }, f.prototype.fastForwardTo = function(m) {
        for (; ++this.index < this.buffer.length + this.offset; )
          if (this.buffer.charCodeAt(this.index - this.offset) === m)
            return !0;
        return this.index = this.buffer.length + this.offset - 1, !1;
      }, f.prototype.stateInCommentLike = function(m) {
        m === this.currentSequence[this.sequenceIndex] ? ++this.sequenceIndex === this.currentSequence.length && (this.currentSequence === c.CdataEnd ? this.cbs.oncdata(this.sectionStart, this.index, 2) : this.cbs.oncomment(this.sectionStart, this.index, 2), this.sequenceIndex = 0, this.sectionStart = this.index + 1, this.state = r.Text) : this.sequenceIndex === 0 ? this.fastForwardTo(this.currentSequence[0]) && (this.sequenceIndex = 1) : m !== this.currentSequence[this.sequenceIndex - 1] && (this.sequenceIndex = 0);
      }, f.prototype.isTagStartChar = function(m) {
        return this.xmlMode ? !n(m) : s(m);
      }, f.prototype.startSpecial = function(m, v) {
        this.isSpecial = !0, this.currentSequence = m, this.sequenceIndex = v, this.state = r.SpecialStartSequence;
      }, f.prototype.stateBeforeTagName = function(m) {
        if (m === t.ExclamationMark)
          this.state = r.BeforeDeclaration, this.sectionStart = this.index + 1;
        else if (m === t.Questionmark)
          this.state = r.InProcessingInstruction, this.sectionStart = this.index + 1;
        else if (this.isTagStartChar(m)) {
          var v = m | 32;
          this.sectionStart = this.index, !this.xmlMode && v === c.TitleEnd[2] ? this.startSpecial(c.TitleEnd, 3) : this.state = !this.xmlMode && v === c.ScriptEnd[2] ? r.BeforeSpecialS : r.InTagName;
        } else
          m === t.Slash ? this.state = r.BeforeClosingTagName : (this.state = r.Text, this.stateText(m));
      }, f.prototype.stateInTagName = function(m) {
        n(m) && (this.cbs.onopentagname(this.sectionStart, this.index), this.sectionStart = -1, this.state = r.BeforeAttributeName, this.stateBeforeAttributeName(m));
      }, f.prototype.stateBeforeClosingTagName = function(m) {
        a(m) || (m === t.Gt ? this.state = r.Text : (this.state = this.isTagStartChar(m) ? r.InClosingTagName : r.InSpecialComment, this.sectionStart = this.index));
      }, f.prototype.stateInClosingTagName = function(m) {
        (m === t.Gt || a(m)) && (this.cbs.onclosetag(this.sectionStart, this.index), this.sectionStart = -1, this.state = r.AfterClosingTagName, this.stateAfterClosingTagName(m));
      }, f.prototype.stateAfterClosingTagName = function(m) {
        (m === t.Gt || this.fastForwardTo(t.Gt)) && (this.state = r.Text, this.baseState = r.Text, this.sectionStart = this.index + 1);
      }, f.prototype.stateBeforeAttributeName = function(m) {
        m === t.Gt ? (this.cbs.onopentagend(this.index), this.isSpecial ? (this.state = r.InSpecialTag, this.sequenceIndex = 0) : this.state = r.Text, this.baseState = this.state, this.sectionStart = this.index + 1) : m === t.Slash ? this.state = r.InSelfClosingTag : a(m) || (this.state = r.InAttributeName, this.sectionStart = this.index);
      }, f.prototype.stateInSelfClosingTag = function(m) {
        m === t.Gt ? (this.cbs.onselfclosingtag(this.index), this.state = r.Text, this.baseState = r.Text, this.sectionStart = this.index + 1, this.isSpecial = !1) : a(m) || (this.state = r.BeforeAttributeName, this.stateBeforeAttributeName(m));
      }, f.prototype.stateInAttributeName = function(m) {
        (m === t.Eq || n(m)) && (this.cbs.onattribname(this.sectionStart, this.index), this.sectionStart = -1, this.state = r.AfterAttributeName, this.stateAfterAttributeName(m));
      }, f.prototype.stateAfterAttributeName = function(m) {
        m === t.Eq ? this.state = r.BeforeAttributeValue : m === t.Slash || m === t.Gt ? (this.cbs.onattribend(d.NoValue, this.index), this.state = r.BeforeAttributeName, this.stateBeforeAttributeName(m)) : a(m) || (this.cbs.onattribend(d.NoValue, this.index), this.state = r.InAttributeName, this.sectionStart = this.index);
      }, f.prototype.stateBeforeAttributeValue = function(m) {
        m === t.DoubleQuote ? (this.state = r.InAttributeValueDq, this.sectionStart = this.index + 1) : m === t.SingleQuote ? (this.state = r.InAttributeValueSq, this.sectionStart = this.index + 1) : a(m) || (this.sectionStart = this.index, this.state = r.InAttributeValueNq, this.stateInAttributeValueNoQuotes(m));
      }, f.prototype.handleInAttributeValue = function(m, v) {
        m === v || !this.decodeEntities && this.fastForwardTo(v) ? (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = -1, this.cbs.onattribend(v === t.DoubleQuote ? d.Double : d.Single, this.index), this.state = r.BeforeAttributeName) : this.decodeEntities && m === t.Amp && (this.baseState = this.state, this.state = r.BeforeEntity);
      }, f.prototype.stateInAttributeValueDoubleQuotes = function(m) {
        this.handleInAttributeValue(m, t.DoubleQuote);
      }, f.prototype.stateInAttributeValueSingleQuotes = function(m) {
        this.handleInAttributeValue(m, t.SingleQuote);
      }, f.prototype.stateInAttributeValueNoQuotes = function(m) {
        a(m) || m === t.Gt ? (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = -1, this.cbs.onattribend(d.Unquoted, this.index), this.state = r.BeforeAttributeName, this.stateBeforeAttributeName(m)) : this.decodeEntities && m === t.Amp && (this.baseState = this.state, this.state = r.BeforeEntity);
      }, f.prototype.stateBeforeDeclaration = function(m) {
        m === t.OpeningSquareBracket ? (this.state = r.CDATASequence, this.sequenceIndex = 0) : this.state = m === t.Dash ? r.BeforeComment : r.InDeclaration;
      }, f.prototype.stateInDeclaration = function(m) {
        (m === t.Gt || this.fastForwardTo(t.Gt)) && (this.cbs.ondeclaration(this.sectionStart, this.index), this.state = r.Text, this.sectionStart = this.index + 1);
      }, f.prototype.stateInProcessingInstruction = function(m) {
        (m === t.Gt || this.fastForwardTo(t.Gt)) && (this.cbs.onprocessinginstruction(this.sectionStart, this.index), this.state = r.Text, this.sectionStart = this.index + 1);
      }, f.prototype.stateBeforeComment = function(m) {
        m === t.Dash ? (this.state = r.InCommentLike, this.currentSequence = c.CommentEnd, this.sequenceIndex = 2, this.sectionStart = this.index + 1) : this.state = r.InDeclaration;
      }, f.prototype.stateInSpecialComment = function(m) {
        (m === t.Gt || this.fastForwardTo(t.Gt)) && (this.cbs.oncomment(this.sectionStart, this.index, 0), this.state = r.Text, this.sectionStart = this.index + 1);
      }, f.prototype.stateBeforeSpecialS = function(m) {
        var v = m | 32;
        v === c.ScriptEnd[3] ? this.startSpecial(c.ScriptEnd, 4) : v === c.StyleEnd[3] ? this.startSpecial(c.StyleEnd, 4) : (this.state = r.InTagName, this.stateInTagName(m));
      }, f.prototype.stateBeforeEntity = function(m) {
        this.entityExcess = 1, this.entityResult = 0, m === t.Number ? this.state = r.BeforeNumericEntity : m === t.Amp || (this.trieIndex = 0, this.trieCurrent = this.entityTrie[0], this.state = r.InNamedEntity, this.stateInNamedEntity(m));
      }, f.prototype.stateInNamedEntity = function(m) {
        if (this.entityExcess += 1, this.trieIndex = (0, u.determineBranch)(this.entityTrie, this.trieCurrent, this.trieIndex + 1, m), this.trieIndex < 0) {
          this.emitNamedEntity(), this.index--;
          return;
        }
        this.trieCurrent = this.entityTrie[this.trieIndex];
        var v = this.trieCurrent & u.BinTrieFlags.VALUE_LENGTH;
        if (v) {
          var L = (v >> 14) - 1;
          if (!this.allowLegacyEntity() && m !== t.Semi)
            this.trieIndex += L;
          else {
            var N = this.index - this.entityExcess + 1;
            N > this.sectionStart && this.emitPartial(this.sectionStart, N), this.entityResult = this.trieIndex, this.trieIndex += L, this.entityExcess = 0, this.sectionStart = this.index + 1, L === 0 && this.emitNamedEntity();
          }
        }
      }, f.prototype.emitNamedEntity = function() {
        if (this.state = this.baseState, this.entityResult !== 0) {
          var m = (this.entityTrie[this.entityResult] & u.BinTrieFlags.VALUE_LENGTH) >> 14;
          switch (m) {
            case 1: {
              this.emitCodePoint(this.entityTrie[this.entityResult] & ~u.BinTrieFlags.VALUE_LENGTH);
              break;
            }
            case 2: {
              this.emitCodePoint(this.entityTrie[this.entityResult + 1]);
              break;
            }
            case 3:
              this.emitCodePoint(this.entityTrie[this.entityResult + 1]), this.emitCodePoint(this.entityTrie[this.entityResult + 2]);
          }
        }
      }, f.prototype.stateBeforeNumericEntity = function(m) {
        (m | 32) === t.LowerX ? (this.entityExcess++, this.state = r.InHexEntity) : (this.state = r.InNumericEntity, this.stateInNumericEntity(m));
      }, f.prototype.emitNumericEntity = function(m) {
        var v = this.index - this.entityExcess - 1, L = v + 2 + +(this.state === r.InHexEntity);
        L !== this.index && (v > this.sectionStart && this.emitPartial(this.sectionStart, v), this.sectionStart = this.index + Number(m), this.emitCodePoint((0, u.replaceCodePoint)(this.entityResult))), this.state = this.baseState;
      }, f.prototype.stateInNumericEntity = function(m) {
        m === t.Semi ? this.emitNumericEntity(!0) : i(m) ? (this.entityResult = this.entityResult * 10 + (m - t.Zero), this.entityExcess++) : (this.allowLegacyEntity() ? this.emitNumericEntity(!1) : this.state = this.baseState, this.index--);
      }, f.prototype.stateInHexEntity = function(m) {
        m === t.Semi ? this.emitNumericEntity(!0) : i(m) ? (this.entityResult = this.entityResult * 16 + (m - t.Zero), this.entityExcess++) : o(m) ? (this.entityResult = this.entityResult * 16 + ((m | 32) - t.LowerA + 10), this.entityExcess++) : (this.allowLegacyEntity() ? this.emitNumericEntity(!1) : this.state = this.baseState, this.index--);
      }, f.prototype.allowLegacyEntity = function() {
        return !this.xmlMode && (this.baseState === r.Text || this.baseState === r.InSpecialTag);
      }, f.prototype.cleanup = function() {
        this.running && this.sectionStart !== this.index && (this.state === r.Text || this.state === r.InSpecialTag && this.sequenceIndex === 0 ? (this.cbs.ontext(this.sectionStart, this.index), this.sectionStart = this.index) : (this.state === r.InAttributeValueDq || this.state === r.InAttributeValueSq || this.state === r.InAttributeValueNq) && (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = this.index));
      }, f.prototype.shouldContinue = function() {
        return this.index < this.buffer.length + this.offset && this.running;
      }, f.prototype.parse = function() {
        for (; this.shouldContinue(); ) {
          var m = this.buffer.charCodeAt(this.index - this.offset);
          switch (this.state) {
            case r.Text: {
              this.stateText(m);
              break;
            }
            case r.SpecialStartSequence: {
              this.stateSpecialStartSequence(m);
              break;
            }
            case r.InSpecialTag: {
              this.stateInSpecialTag(m);
              break;
            }
            case r.CDATASequence: {
              this.stateCDATASequence(m);
              break;
            }
            case r.InAttributeValueDq: {
              this.stateInAttributeValueDoubleQuotes(m);
              break;
            }
            case r.InAttributeName: {
              this.stateInAttributeName(m);
              break;
            }
            case r.InCommentLike: {
              this.stateInCommentLike(m);
              break;
            }
            case r.InSpecialComment: {
              this.stateInSpecialComment(m);
              break;
            }
            case r.BeforeAttributeName: {
              this.stateBeforeAttributeName(m);
              break;
            }
            case r.InTagName: {
              this.stateInTagName(m);
              break;
            }
            case r.InClosingTagName: {
              this.stateInClosingTagName(m);
              break;
            }
            case r.BeforeTagName: {
              this.stateBeforeTagName(m);
              break;
            }
            case r.AfterAttributeName: {
              this.stateAfterAttributeName(m);
              break;
            }
            case r.InAttributeValueSq: {
              this.stateInAttributeValueSingleQuotes(m);
              break;
            }
            case r.BeforeAttributeValue: {
              this.stateBeforeAttributeValue(m);
              break;
            }
            case r.BeforeClosingTagName: {
              this.stateBeforeClosingTagName(m);
              break;
            }
            case r.AfterClosingTagName: {
              this.stateAfterClosingTagName(m);
              break;
            }
            case r.BeforeSpecialS: {
              this.stateBeforeSpecialS(m);
              break;
            }
            case r.InAttributeValueNq: {
              this.stateInAttributeValueNoQuotes(m);
              break;
            }
            case r.InSelfClosingTag: {
              this.stateInSelfClosingTag(m);
              break;
            }
            case r.InDeclaration: {
              this.stateInDeclaration(m);
              break;
            }
            case r.BeforeDeclaration: {
              this.stateBeforeDeclaration(m);
              break;
            }
            case r.BeforeComment: {
              this.stateBeforeComment(m);
              break;
            }
            case r.InProcessingInstruction: {
              this.stateInProcessingInstruction(m);
              break;
            }
            case r.InNamedEntity: {
              this.stateInNamedEntity(m);
              break;
            }
            case r.BeforeEntity: {
              this.stateBeforeEntity(m);
              break;
            }
            case r.InHexEntity: {
              this.stateInHexEntity(m);
              break;
            }
            case r.InNumericEntity: {
              this.stateInNumericEntity(m);
              break;
            }
            default:
              this.stateBeforeNumericEntity(m);
          }
          this.index++;
        }
        this.cleanup();
      }, f.prototype.finish = function() {
        this.state === r.InNamedEntity && this.emitNamedEntity(), this.sectionStart < this.index && this.handleTrailingData(), this.cbs.onend();
      }, f.prototype.handleTrailingData = function() {
        var m = this.buffer.length + this.offset;
        this.state === r.InCommentLike ? this.currentSequence === c.CdataEnd ? this.cbs.oncdata(this.sectionStart, m, 0) : this.cbs.oncomment(this.sectionStart, m, 0) : this.state === r.InNumericEntity && this.allowLegacyEntity() ? this.emitNumericEntity(!1) : this.state === r.InHexEntity && this.allowLegacyEntity() ? this.emitNumericEntity(!1) : this.state === r.InTagName || this.state === r.BeforeAttributeName || this.state === r.BeforeAttributeValue || this.state === r.AfterAttributeName || this.state === r.InAttributeName || this.state === r.InAttributeValueSq || this.state === r.InAttributeValueDq || this.state === r.InAttributeValueNq || this.state === r.InClosingTagName || this.cbs.ontext(this.sectionStart, m);
      }, f.prototype.emitPartial = function(m, v) {
        this.baseState !== r.Text && this.baseState !== r.InSpecialTag ? this.cbs.onattribdata(m, v) : this.cbs.ontext(m, v);
      }, f.prototype.emitCodePoint = function(m) {
        this.baseState !== r.Text && this.baseState !== r.InSpecialTag ? this.cbs.onattribentity(m) : this.cbs.ontextentity(m);
      }, f;
    }()
  );
  e.default = E;
})(Dc);
var t8 = C && C.__createBinding || (Object.create ? function(e, u, t, r) {
  r === void 0 && (r = t);
  var a = Object.getOwnPropertyDescriptor(u, t);
  (!a || ("get" in a ? !u.__esModule : a.writable || a.configurable)) && (a = { enumerable: !0, get: function() {
    return u[t];
  } }), Object.defineProperty(e, r, a);
} : function(e, u, t, r) {
  r === void 0 && (r = t), e[r] = u[t];
}), r8 = C && C.__setModuleDefault || (Object.create ? function(e, u) {
  Object.defineProperty(e, "default", { enumerable: !0, value: u });
} : function(e, u) {
  e.default = u;
}), a8 = C && C.__importStar || function(e) {
  if (e && e.__esModule)
    return e;
  var u = {};
  if (e != null)
    for (var t in e)
      t !== "default" && Object.prototype.hasOwnProperty.call(e, t) && t8(u, e, t);
  return r8(u, e), u;
};
Object.defineProperty(rr, "__esModule", { value: !0 });
rr.Parser = void 0;
var Br = a8(Dc), Ns = ar, Kt = /* @__PURE__ */ new Set([
  "input",
  "option",
  "optgroup",
  "select",
  "button",
  "datalist",
  "textarea"
]), pe = /* @__PURE__ */ new Set(["p"]), Is = /* @__PURE__ */ new Set(["thead", "tbody"]), Ds = /* @__PURE__ */ new Set(["dd", "dt"]), Cs = /* @__PURE__ */ new Set(["rt", "rp"]), n8 = /* @__PURE__ */ new Map([
  ["tr", /* @__PURE__ */ new Set(["tr", "th", "td"])],
  ["th", /* @__PURE__ */ new Set(["th"])],
  ["td", /* @__PURE__ */ new Set(["thead", "th", "td"])],
  ["body", /* @__PURE__ */ new Set(["head", "link", "script"])],
  ["li", /* @__PURE__ */ new Set(["li"])],
  ["p", pe],
  ["h1", pe],
  ["h2", pe],
  ["h3", pe],
  ["h4", pe],
  ["h5", pe],
  ["h6", pe],
  ["select", Kt],
  ["input", Kt],
  ["output", Kt],
  ["button", Kt],
  ["datalist", Kt],
  ["textarea", Kt],
  ["option", /* @__PURE__ */ new Set(["option"])],
  ["optgroup", /* @__PURE__ */ new Set(["optgroup", "option"])],
  ["dd", Ds],
  ["dt", Ds],
  ["address", pe],
  ["article", pe],
  ["aside", pe],
  ["blockquote", pe],
  ["details", pe],
  ["div", pe],
  ["dl", pe],
  ["fieldset", pe],
  ["figcaption", pe],
  ["figure", pe],
  ["footer", pe],
  ["form", pe],
  ["header", pe],
  ["hr", pe],
  ["main", pe],
  ["nav", pe],
  ["ol", pe],
  ["pre", pe],
  ["section", pe],
  ["table", pe],
  ["ul", pe],
  ["rt", Cs],
  ["rp", Cs],
  ["tbody", Is],
  ["tfoot", Is]
]), i8 = /* @__PURE__ */ new Set([
  "area",
  "base",
  "basefont",
  "br",
  "col",
  "command",
  "embed",
  "frame",
  "hr",
  "img",
  "input",
  "isindex",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
]), Ss = /* @__PURE__ */ new Set(["math", "svg"]), Os = /* @__PURE__ */ new Set([
  "mi",
  "mo",
  "mn",
  "ms",
  "mtext",
  "annotation-xml",
  "foreignobject",
  "desc",
  "title"
]), c8 = /\s|\//, s8 = (
  /** @class */
  function() {
    function e(u, t) {
      t === void 0 && (t = {});
      var r, a, n, i, s;
      this.options = t, this.startIndex = 0, this.endIndex = 0, this.openTagStart = 0, this.tagname = "", this.attribname = "", this.attribvalue = "", this.attribs = null, this.stack = [], this.foreignContext = [], this.buffers = [], this.bufferOffset = 0, this.writeIndex = 0, this.ended = !1, this.cbs = u ?? {}, this.lowerCaseTagNames = (r = t.lowerCaseTags) !== null && r !== void 0 ? r : !t.xmlMode, this.lowerCaseAttributeNames = (a = t.lowerCaseAttributeNames) !== null && a !== void 0 ? a : !t.xmlMode, this.tokenizer = new ((n = t.Tokenizer) !== null && n !== void 0 ? n : Br.default)(this.options, this), (s = (i = this.cbs).onparserinit) === null || s === void 0 || s.call(i, this);
    }
    return e.prototype.ontext = function(u, t) {
      var r, a, n = this.getSlice(u, t);
      this.endIndex = t - 1, (a = (r = this.cbs).ontext) === null || a === void 0 || a.call(r, n), this.startIndex = t;
    }, e.prototype.ontextentity = function(u) {
      var t, r, a = this.tokenizer.getSectionStart();
      this.endIndex = a - 1, (r = (t = this.cbs).ontext) === null || r === void 0 || r.call(t, (0, Ns.fromCodePoint)(u)), this.startIndex = a;
    }, e.prototype.isVoidElement = function(u) {
      return !this.options.xmlMode && i8.has(u);
    }, e.prototype.onopentagname = function(u, t) {
      this.endIndex = t;
      var r = this.getSlice(u, t);
      this.lowerCaseTagNames && (r = r.toLowerCase()), this.emitOpenTag(r);
    }, e.prototype.emitOpenTag = function(u) {
      var t, r, a, n;
      this.openTagStart = this.startIndex, this.tagname = u;
      var i = !this.options.xmlMode && n8.get(u);
      if (i)
        for (; this.stack.length > 0 && i.has(this.stack[this.stack.length - 1]); ) {
          var s = this.stack.pop();
          (r = (t = this.cbs).onclosetag) === null || r === void 0 || r.call(t, s, !0);
        }
      this.isVoidElement(u) || (this.stack.push(u), Ss.has(u) ? this.foreignContext.push(!0) : Os.has(u) && this.foreignContext.push(!1)), (n = (a = this.cbs).onopentagname) === null || n === void 0 || n.call(a, u), this.cbs.onopentag && (this.attribs = {});
    }, e.prototype.endOpenTag = function(u) {
      var t, r;
      this.startIndex = this.openTagStart, this.attribs && ((r = (t = this.cbs).onopentag) === null || r === void 0 || r.call(t, this.tagname, this.attribs, u), this.attribs = null), this.cbs.onclosetag && this.isVoidElement(this.tagname) && this.cbs.onclosetag(this.tagname, !0), this.tagname = "";
    }, e.prototype.onopentagend = function(u) {
      this.endIndex = u, this.endOpenTag(!1), this.startIndex = u + 1;
    }, e.prototype.onclosetag = function(u, t) {
      var r, a, n, i, s, o;
      this.endIndex = t;
      var d = this.getSlice(u, t);
      if (this.lowerCaseTagNames && (d = d.toLowerCase()), (Ss.has(d) || Os.has(d)) && this.foreignContext.pop(), this.isVoidElement(d))
        !this.options.xmlMode && d === "br" && ((a = (r = this.cbs).onopentagname) === null || a === void 0 || a.call(r, "br"), (i = (n = this.cbs).onopentag) === null || i === void 0 || i.call(n, "br", {}, !0), (o = (s = this.cbs).onclosetag) === null || o === void 0 || o.call(s, "br", !1));
      else {
        var c = this.stack.lastIndexOf(d);
        if (c !== -1)
          if (this.cbs.onclosetag)
            for (var E = this.stack.length - c; E--; )
              this.cbs.onclosetag(this.stack.pop(), E !== 0);
          else
            this.stack.length = c;
        else
          !this.options.xmlMode && d === "p" && (this.emitOpenTag("p"), this.closeCurrentTag(!0));
      }
      this.startIndex = t + 1;
    }, e.prototype.onselfclosingtag = function(u) {
      this.endIndex = u, this.options.xmlMode || this.options.recognizeSelfClosing || this.foreignContext[this.foreignContext.length - 1] ? (this.closeCurrentTag(!1), this.startIndex = u + 1) : this.onopentagend(u);
    }, e.prototype.closeCurrentTag = function(u) {
      var t, r, a = this.tagname;
      this.endOpenTag(u), this.stack[this.stack.length - 1] === a && ((r = (t = this.cbs).onclosetag) === null || r === void 0 || r.call(t, a, !u), this.stack.pop());
    }, e.prototype.onattribname = function(u, t) {
      this.startIndex = u;
      var r = this.getSlice(u, t);
      this.attribname = this.lowerCaseAttributeNames ? r.toLowerCase() : r;
    }, e.prototype.onattribdata = function(u, t) {
      this.attribvalue += this.getSlice(u, t);
    }, e.prototype.onattribentity = function(u) {
      this.attribvalue += (0, Ns.fromCodePoint)(u);
    }, e.prototype.onattribend = function(u, t) {
      var r, a;
      this.endIndex = t, (a = (r = this.cbs).onattribute) === null || a === void 0 || a.call(r, this.attribname, this.attribvalue, u === Br.QuoteType.Double ? '"' : u === Br.QuoteType.Single ? "'" : u === Br.QuoteType.NoValue ? void 0 : null), this.attribs && !Object.prototype.hasOwnProperty.call(this.attribs, this.attribname) && (this.attribs[this.attribname] = this.attribvalue), this.attribvalue = "";
    }, e.prototype.getInstructionName = function(u) {
      var t = u.search(c8), r = t < 0 ? u : u.substr(0, t);
      return this.lowerCaseTagNames && (r = r.toLowerCase()), r;
    }, e.prototype.ondeclaration = function(u, t) {
      this.endIndex = t;
      var r = this.getSlice(u, t);
      if (this.cbs.onprocessinginstruction) {
        var a = this.getInstructionName(r);
        this.cbs.onprocessinginstruction("!".concat(a), "!".concat(r));
      }
      this.startIndex = t + 1;
    }, e.prototype.onprocessinginstruction = function(u, t) {
      this.endIndex = t;
      var r = this.getSlice(u, t);
      if (this.cbs.onprocessinginstruction) {
        var a = this.getInstructionName(r);
        this.cbs.onprocessinginstruction("?".concat(a), "?".concat(r));
      }
      this.startIndex = t + 1;
    }, e.prototype.oncomment = function(u, t, r) {
      var a, n, i, s;
      this.endIndex = t, (n = (a = this.cbs).oncomment) === null || n === void 0 || n.call(a, this.getSlice(u, t - r)), (s = (i = this.cbs).oncommentend) === null || s === void 0 || s.call(i), this.startIndex = t + 1;
    }, e.prototype.oncdata = function(u, t, r) {
      var a, n, i, s, o, d, c, E, f, m;
      this.endIndex = t;
      var v = this.getSlice(u, t - r);
      this.options.xmlMode || this.options.recognizeCDATA ? ((n = (a = this.cbs).oncdatastart) === null || n === void 0 || n.call(a), (s = (i = this.cbs).ontext) === null || s === void 0 || s.call(i, v), (d = (o = this.cbs).oncdataend) === null || d === void 0 || d.call(o)) : ((E = (c = this.cbs).oncomment) === null || E === void 0 || E.call(c, "[CDATA[".concat(v, "]]")), (m = (f = this.cbs).oncommentend) === null || m === void 0 || m.call(f)), this.startIndex = t + 1;
    }, e.prototype.onend = function() {
      var u, t;
      if (this.cbs.onclosetag) {
        this.endIndex = this.startIndex;
        for (var r = this.stack.length; r > 0; this.cbs.onclosetag(this.stack[--r], !0))
          ;
      }
      (t = (u = this.cbs).onend) === null || t === void 0 || t.call(u);
    }, e.prototype.reset = function() {
      var u, t, r, a;
      (t = (u = this.cbs).onreset) === null || t === void 0 || t.call(u), this.tokenizer.reset(), this.tagname = "", this.attribname = "", this.attribs = null, this.stack.length = 0, this.startIndex = 0, this.endIndex = 0, (a = (r = this.cbs).onparserinit) === null || a === void 0 || a.call(r, this), this.buffers.length = 0, this.bufferOffset = 0, this.writeIndex = 0, this.ended = !1;
    }, e.prototype.parseComplete = function(u) {
      this.reset(), this.end(u);
    }, e.prototype.getSlice = function(u, t) {
      for (; u - this.bufferOffset >= this.buffers[0].length; )
        this.shiftBuffer();
      for (var r = this.buffers[0].slice(u - this.bufferOffset, t - this.bufferOffset); t - this.bufferOffset > this.buffers[0].length; )
        this.shiftBuffer(), r += this.buffers[0].slice(0, t - this.bufferOffset);
      return r;
    }, e.prototype.shiftBuffer = function() {
      this.bufferOffset += this.buffers[0].length, this.writeIndex--, this.buffers.shift();
    }, e.prototype.write = function(u) {
      var t, r;
      if (this.ended) {
        (r = (t = this.cbs).onerror) === null || r === void 0 || r.call(t, new Error(".write() after done!"));
        return;
      }
      this.buffers.push(u), this.tokenizer.running && (this.tokenizer.write(u), this.writeIndex++);
    }, e.prototype.end = function(u) {
      var t, r;
      if (this.ended) {
        (r = (t = this.cbs).onerror) === null || r === void 0 || r.call(t, new Error(".end() after done!"));
        return;
      }
      u && this.write(u), this.ended = !0, this.tokenizer.end();
    }, e.prototype.pause = function() {
      this.tokenizer.pause();
    }, e.prototype.resume = function() {
      for (this.tokenizer.resume(); this.tokenizer.running && this.writeIndex < this.buffers.length; )
        this.tokenizer.write(this.buffers[this.writeIndex++]);
      this.ended && this.tokenizer.end();
    }, e.prototype.parseChunk = function(u) {
      this.write(u);
    }, e.prototype.done = function(u) {
      this.end(u);
    }, e;
  }()
);
rr.Parser = s8;
var nt = {}, oe = {}, At = C && C.__extends || /* @__PURE__ */ function() {
  var e = function(u, t) {
    return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, a) {
      r.__proto__ = a;
    } || function(r, a) {
      for (var n in a)
        Object.prototype.hasOwnProperty.call(a, n) && (r[n] = a[n]);
    }, e(u, t);
  };
  return function(u, t) {
    if (typeof t != "function" && t !== null)
      throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
    e(u, t);
    function r() {
      this.constructor = u;
    }
    u.prototype = t === null ? Object.create(t) : (r.prototype = t.prototype, new r());
  };
}(), K0 = C && C.__assign || function() {
  return K0 = Object.assign || function(e) {
    for (var u, t = 1, r = arguments.length; t < r; t++) {
      u = arguments[t];
      for (var a in u)
        Object.prototype.hasOwnProperty.call(u, a) && (e[a] = u[a]);
    }
    return e;
  }, K0.apply(this, arguments);
};
Object.defineProperty(oe, "__esModule", { value: !0 });
oe.cloneNode = oe.hasChildren = oe.isDocument = oe.isDirective = oe.isComment = oe.isText = oe.isCDATA = oe.isTag = oe.Element = oe.Document = oe.CDATA = oe.NodeWithChildren = oe.ProcessingInstruction = oe.Comment = oe.Text = oe.DataNode = oe.Node = void 0;
var gu = Be, Oc = (
  /** @class */
  function() {
    function e() {
      this.parent = null, this.prev = null, this.next = null, this.startIndex = null, this.endIndex = null;
    }
    return Object.defineProperty(e.prototype, "parentNode", {
      // Read-write aliases for properties
      /**
       * Same as {@link parent}.
       * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
       */
      get: function() {
        return this.parent;
      },
      set: function(u) {
        this.parent = u;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "previousSibling", {
      /**
       * Same as {@link prev}.
       * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
       */
      get: function() {
        return this.prev;
      },
      set: function(u) {
        this.prev = u;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "nextSibling", {
      /**
       * Same as {@link next}.
       * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
       */
      get: function() {
        return this.next;
      },
      set: function(u) {
        this.next = u;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.cloneNode = function(u) {
      return u === void 0 && (u = !1), Lc(this, u);
    }, e;
  }()
);
oe.Node = Oc;
var sn = (
  /** @class */
  function(e) {
    At(u, e);
    function u(t) {
      var r = e.call(this) || this;
      return r.data = t, r;
    }
    return Object.defineProperty(u.prototype, "nodeValue", {
      /**
       * Same as {@link data}.
       * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
       */
      get: function() {
        return this.data;
      },
      set: function(t) {
        this.data = t;
      },
      enumerable: !1,
      configurable: !0
    }), u;
  }(Oc)
);
oe.DataNode = sn;
var v1 = (
  /** @class */
  function(e) {
    At(u, e);
    function u() {
      var t = e !== null && e.apply(this, arguments) || this;
      return t.type = gu.ElementType.Text, t;
    }
    return Object.defineProperty(u.prototype, "nodeType", {
      get: function() {
        return 3;
      },
      enumerable: !1,
      configurable: !0
    }), u;
  }(sn)
);
oe.Text = v1;
var x1 = (
  /** @class */
  function(e) {
    At(u, e);
    function u() {
      var t = e !== null && e.apply(this, arguments) || this;
      return t.type = gu.ElementType.Comment, t;
    }
    return Object.defineProperty(u.prototype, "nodeType", {
      get: function() {
        return 8;
      },
      enumerable: !1,
      configurable: !0
    }), u;
  }(sn)
);
oe.Comment = x1;
var N1 = (
  /** @class */
  function(e) {
    At(u, e);
    function u(t, r) {
      var a = e.call(this, r) || this;
      return a.name = t, a.type = gu.ElementType.Directive, a;
    }
    return Object.defineProperty(u.prototype, "nodeType", {
      get: function() {
        return 1;
      },
      enumerable: !1,
      configurable: !0
    }), u;
  }(sn)
);
oe.ProcessingInstruction = N1;
var on = (
  /** @class */
  function(e) {
    At(u, e);
    function u(t) {
      var r = e.call(this) || this;
      return r.children = t, r;
    }
    return Object.defineProperty(u.prototype, "firstChild", {
      // Aliases
      /** First child of the node. */
      get: function() {
        var t;
        return (t = this.children[0]) !== null && t !== void 0 ? t : null;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(u.prototype, "lastChild", {
      /** Last child of the node. */
      get: function() {
        return this.children.length > 0 ? this.children[this.children.length - 1] : null;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(u.prototype, "childNodes", {
      /**
       * Same as {@link children}.
       * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
       */
      get: function() {
        return this.children;
      },
      set: function(t) {
        this.children = t;
      },
      enumerable: !1,
      configurable: !0
    }), u;
  }(Oc)
);
oe.NodeWithChildren = on;
var I1 = (
  /** @class */
  function(e) {
    At(u, e);
    function u() {
      var t = e !== null && e.apply(this, arguments) || this;
      return t.type = gu.ElementType.CDATA, t;
    }
    return Object.defineProperty(u.prototype, "nodeType", {
      get: function() {
        return 4;
      },
      enumerable: !1,
      configurable: !0
    }), u;
  }(on)
);
oe.CDATA = I1;
var D1 = (
  /** @class */
  function(e) {
    At(u, e);
    function u() {
      var t = e !== null && e.apply(this, arguments) || this;
      return t.type = gu.ElementType.Root, t;
    }
    return Object.defineProperty(u.prototype, "nodeType", {
      get: function() {
        return 9;
      },
      enumerable: !1,
      configurable: !0
    }), u;
  }(on)
);
oe.Document = D1;
var C1 = (
  /** @class */
  function(e) {
    At(u, e);
    function u(t, r, a, n) {
      a === void 0 && (a = []), n === void 0 && (n = t === "script" ? gu.ElementType.Script : t === "style" ? gu.ElementType.Style : gu.ElementType.Tag);
      var i = e.call(this, a) || this;
      return i.name = t, i.attribs = r, i.type = n, i;
    }
    return Object.defineProperty(u.prototype, "nodeType", {
      get: function() {
        return 1;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(u.prototype, "tagName", {
      // DOM Level 1 aliases
      /**
       * Same as {@link name}.
       * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
       */
      get: function() {
        return this.name;
      },
      set: function(t) {
        this.name = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(u.prototype, "attributes", {
      get: function() {
        var t = this;
        return Object.keys(this.attribs).map(function(r) {
          var a, n;
          return {
            name: r,
            value: t.attribs[r],
            namespace: (a = t["x-attribsNamespace"]) === null || a === void 0 ? void 0 : a[r],
            prefix: (n = t["x-attribsPrefix"]) === null || n === void 0 ? void 0 : n[r]
          };
        });
      },
      enumerable: !1,
      configurable: !0
    }), u;
  }(on)
);
oe.Element = C1;
function S1(e) {
  return (0, gu.isTag)(e);
}
oe.isTag = S1;
function O1(e) {
  return e.type === gu.ElementType.CDATA;
}
oe.isCDATA = O1;
function L1(e) {
  return e.type === gu.ElementType.Text;
}
oe.isText = L1;
function P1(e) {
  return e.type === gu.ElementType.Comment;
}
oe.isComment = P1;
function w1(e) {
  return e.type === gu.ElementType.Directive;
}
oe.isDirective = w1;
function R1(e) {
  return e.type === gu.ElementType.Root;
}
oe.isDocument = R1;
function o8(e) {
  return Object.prototype.hasOwnProperty.call(e, "children");
}
oe.hasChildren = o8;
function Lc(e, u) {
  u === void 0 && (u = !1);
  var t;
  if (L1(e))
    t = new v1(e.data);
  else if (P1(e))
    t = new x1(e.data);
  else if (S1(e)) {
    var r = u ? Rn(e.children) : [], a = new C1(e.name, K0({}, e.attribs), r);
    r.forEach(function(o) {
      return o.parent = a;
    }), e.namespace != null && (a.namespace = e.namespace), e["x-attribsNamespace"] && (a["x-attribsNamespace"] = K0({}, e["x-attribsNamespace"])), e["x-attribsPrefix"] && (a["x-attribsPrefix"] = K0({}, e["x-attribsPrefix"])), t = a;
  } else if (O1(e)) {
    var r = u ? Rn(e.children) : [], n = new I1(r);
    r.forEach(function(d) {
      return d.parent = n;
    }), t = n;
  } else if (R1(e)) {
    var r = u ? Rn(e.children) : [], i = new D1(r);
    r.forEach(function(d) {
      return d.parent = i;
    }), e["x-mode"] && (i["x-mode"] = e["x-mode"]), t = i;
  } else if (w1(e)) {
    var s = new N1(e.name, e.data);
    e["x-name"] != null && (s["x-name"] = e["x-name"], s["x-publicId"] = e["x-publicId"], s["x-systemId"] = e["x-systemId"]), t = s;
  } else
    throw new Error("Not implemented yet: ".concat(e.type));
  return t.startIndex = e.startIndex, t.endIndex = e.endIndex, e.sourceCodeLocation != null && (t.sourceCodeLocation = e.sourceCodeLocation), t;
}
oe.cloneNode = Lc;
function Rn(e) {
  for (var u = e.map(function(r) {
    return Lc(r, !0);
  }), t = 1; t < u.length; t++)
    u[t].prev = u[t - 1], u[t - 1].next = u[t];
  return u;
}
(function(e) {
  var u = C && C.__createBinding || (Object.create ? function(s, o, d, c) {
    c === void 0 && (c = d);
    var E = Object.getOwnPropertyDescriptor(o, d);
    (!E || ("get" in E ? !o.__esModule : E.writable || E.configurable)) && (E = { enumerable: !0, get: function() {
      return o[d];
    } }), Object.defineProperty(s, c, E);
  } : function(s, o, d, c) {
    c === void 0 && (c = d), s[c] = o[d];
  }), t = C && C.__exportStar || function(s, o) {
    for (var d in s)
      d !== "default" && !Object.prototype.hasOwnProperty.call(o, d) && u(o, s, d);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.DomHandler = void 0;
  var r = Be, a = oe;
  t(oe, e);
  var n = {
    withStartIndices: !1,
    withEndIndices: !1,
    xmlMode: !1
  }, i = (
    /** @class */
    function() {
      function s(o, d, c) {
        this.dom = [], this.root = new a.Document(this.dom), this.done = !1, this.tagStack = [this.root], this.lastNode = null, this.parser = null, typeof d == "function" && (c = d, d = n), typeof o == "object" && (d = o, o = void 0), this.callback = o ?? null, this.options = d ?? n, this.elementCB = c ?? null;
      }
      return s.prototype.onparserinit = function(o) {
        this.parser = o;
      }, s.prototype.onreset = function() {
        this.dom = [], this.root = new a.Document(this.dom), this.done = !1, this.tagStack = [this.root], this.lastNode = null, this.parser = null;
      }, s.prototype.onend = function() {
        this.done || (this.done = !0, this.parser = null, this.handleCallback(null));
      }, s.prototype.onerror = function(o) {
        this.handleCallback(o);
      }, s.prototype.onclosetag = function() {
        this.lastNode = null;
        var o = this.tagStack.pop();
        this.options.withEndIndices && (o.endIndex = this.parser.endIndex), this.elementCB && this.elementCB(o);
      }, s.prototype.onopentag = function(o, d) {
        var c = this.options.xmlMode ? r.ElementType.Tag : void 0, E = new a.Element(o, d, void 0, c);
        this.addNode(E), this.tagStack.push(E);
      }, s.prototype.ontext = function(o) {
        var d = this.lastNode;
        if (d && d.type === r.ElementType.Text)
          d.data += o, this.options.withEndIndices && (d.endIndex = this.parser.endIndex);
        else {
          var c = new a.Text(o);
          this.addNode(c), this.lastNode = c;
        }
      }, s.prototype.oncomment = function(o) {
        if (this.lastNode && this.lastNode.type === r.ElementType.Comment) {
          this.lastNode.data += o;
          return;
        }
        var d = new a.Comment(o);
        this.addNode(d), this.lastNode = d;
      }, s.prototype.oncommentend = function() {
        this.lastNode = null;
      }, s.prototype.oncdatastart = function() {
        var o = new a.Text(""), d = new a.CDATA([o]);
        this.addNode(d), o.parent = d, this.lastNode = o;
      }, s.prototype.oncdataend = function() {
        this.lastNode = null;
      }, s.prototype.onprocessinginstruction = function(o, d) {
        var c = new a.ProcessingInstruction(o, d);
        this.addNode(c);
      }, s.prototype.handleCallback = function(o) {
        if (typeof this.callback == "function")
          this.callback(o, this.dom);
        else if (o)
          throw o;
      }, s.prototype.addNode = function(o) {
        var d = this.tagStack[this.tagStack.length - 1], c = d.children[d.children.length - 1];
        this.options.withStartIndices && (o.startIndex = this.parser.startIndex), this.options.withEndIndices && (o.endIndex = this.parser.endIndex), d.children.push(o), c && (o.prev = c, c.next = o), o.parent = d, this.lastNode = null;
      }, s;
    }()
  );
  e.DomHandler = i, e.default = i;
})(nt);
var zr = {}, Cu = {}, vr = {}, M1 = {}, Bt = {}, Pc = {};
Object.defineProperty(Pc, "__esModule", { value: !0 });
function Ur(e) {
  for (var u = 1; u < e.length; u++)
    e[u][0] += e[u - 1][0] + 1;
  return e;
}
Pc.default = new Map(/* @__PURE__ */ Ur([[9, "&Tab;"], [0, "&NewLine;"], [22, "&excl;"], [0, "&quot;"], [0, "&num;"], [0, "&dollar;"], [0, "&percnt;"], [0, "&amp;"], [0, "&apos;"], [0, "&lpar;"], [0, "&rpar;"], [0, "&ast;"], [0, "&plus;"], [0, "&comma;"], [1, "&period;"], [0, "&sol;"], [10, "&colon;"], [0, "&semi;"], [0, { v: "&lt;", n: 8402, o: "&nvlt;" }], [0, { v: "&equals;", n: 8421, o: "&bne;" }], [0, { v: "&gt;", n: 8402, o: "&nvgt;" }], [0, "&quest;"], [0, "&commat;"], [26, "&lbrack;"], [0, "&bsol;"], [0, "&rbrack;"], [0, "&Hat;"], [0, "&lowbar;"], [0, "&DiacriticalGrave;"], [5, { n: 106, o: "&fjlig;" }], [20, "&lbrace;"], [0, "&verbar;"], [0, "&rbrace;"], [34, "&nbsp;"], [0, "&iexcl;"], [0, "&cent;"], [0, "&pound;"], [0, "&curren;"], [0, "&yen;"], [0, "&brvbar;"], [0, "&sect;"], [0, "&die;"], [0, "&copy;"], [0, "&ordf;"], [0, "&laquo;"], [0, "&not;"], [0, "&shy;"], [0, "&circledR;"], [0, "&macr;"], [0, "&deg;"], [0, "&PlusMinus;"], [0, "&sup2;"], [0, "&sup3;"], [0, "&acute;"], [0, "&micro;"], [0, "&para;"], [0, "&centerdot;"], [0, "&cedil;"], [0, "&sup1;"], [0, "&ordm;"], [0, "&raquo;"], [0, "&frac14;"], [0, "&frac12;"], [0, "&frac34;"], [0, "&iquest;"], [0, "&Agrave;"], [0, "&Aacute;"], [0, "&Acirc;"], [0, "&Atilde;"], [0, "&Auml;"], [0, "&angst;"], [0, "&AElig;"], [0, "&Ccedil;"], [0, "&Egrave;"], [0, "&Eacute;"], [0, "&Ecirc;"], [0, "&Euml;"], [0, "&Igrave;"], [0, "&Iacute;"], [0, "&Icirc;"], [0, "&Iuml;"], [0, "&ETH;"], [0, "&Ntilde;"], [0, "&Ograve;"], [0, "&Oacute;"], [0, "&Ocirc;"], [0, "&Otilde;"], [0, "&Ouml;"], [0, "&times;"], [0, "&Oslash;"], [0, "&Ugrave;"], [0, "&Uacute;"], [0, "&Ucirc;"], [0, "&Uuml;"], [0, "&Yacute;"], [0, "&THORN;"], [0, "&szlig;"], [0, "&agrave;"], [0, "&aacute;"], [0, "&acirc;"], [0, "&atilde;"], [0, "&auml;"], [0, "&aring;"], [0, "&aelig;"], [0, "&ccedil;"], [0, "&egrave;"], [0, "&eacute;"], [0, "&ecirc;"], [0, "&euml;"], [0, "&igrave;"], [0, "&iacute;"], [0, "&icirc;"], [0, "&iuml;"], [0, "&eth;"], [0, "&ntilde;"], [0, "&ograve;"], [0, "&oacute;"], [0, "&ocirc;"], [0, "&otilde;"], [0, "&ouml;"], [0, "&div;"], [0, "&oslash;"], [0, "&ugrave;"], [0, "&uacute;"], [0, "&ucirc;"], [0, "&uuml;"], [0, "&yacute;"], [0, "&thorn;"], [0, "&yuml;"], [0, "&Amacr;"], [0, "&amacr;"], [0, "&Abreve;"], [0, "&abreve;"], [0, "&Aogon;"], [0, "&aogon;"], [0, "&Cacute;"], [0, "&cacute;"], [0, "&Ccirc;"], [0, "&ccirc;"], [0, "&Cdot;"], [0, "&cdot;"], [0, "&Ccaron;"], [0, "&ccaron;"], [0, "&Dcaron;"], [0, "&dcaron;"], [0, "&Dstrok;"], [0, "&dstrok;"], [0, "&Emacr;"], [0, "&emacr;"], [2, "&Edot;"], [0, "&edot;"], [0, "&Eogon;"], [0, "&eogon;"], [0, "&Ecaron;"], [0, "&ecaron;"], [0, "&Gcirc;"], [0, "&gcirc;"], [0, "&Gbreve;"], [0, "&gbreve;"], [0, "&Gdot;"], [0, "&gdot;"], [0, "&Gcedil;"], [1, "&Hcirc;"], [0, "&hcirc;"], [0, "&Hstrok;"], [0, "&hstrok;"], [0, "&Itilde;"], [0, "&itilde;"], [0, "&Imacr;"], [0, "&imacr;"], [2, "&Iogon;"], [0, "&iogon;"], [0, "&Idot;"], [0, "&imath;"], [0, "&IJlig;"], [0, "&ijlig;"], [0, "&Jcirc;"], [0, "&jcirc;"], [0, "&Kcedil;"], [0, "&kcedil;"], [0, "&kgreen;"], [0, "&Lacute;"], [0, "&lacute;"], [0, "&Lcedil;"], [0, "&lcedil;"], [0, "&Lcaron;"], [0, "&lcaron;"], [0, "&Lmidot;"], [0, "&lmidot;"], [0, "&Lstrok;"], [0, "&lstrok;"], [0, "&Nacute;"], [0, "&nacute;"], [0, "&Ncedil;"], [0, "&ncedil;"], [0, "&Ncaron;"], [0, "&ncaron;"], [0, "&napos;"], [0, "&ENG;"], [0, "&eng;"], [0, "&Omacr;"], [0, "&omacr;"], [2, "&Odblac;"], [0, "&odblac;"], [0, "&OElig;"], [0, "&oelig;"], [0, "&Racute;"], [0, "&racute;"], [0, "&Rcedil;"], [0, "&rcedil;"], [0, "&Rcaron;"], [0, "&rcaron;"], [0, "&Sacute;"], [0, "&sacute;"], [0, "&Scirc;"], [0, "&scirc;"], [0, "&Scedil;"], [0, "&scedil;"], [0, "&Scaron;"], [0, "&scaron;"], [0, "&Tcedil;"], [0, "&tcedil;"], [0, "&Tcaron;"], [0, "&tcaron;"], [0, "&Tstrok;"], [0, "&tstrok;"], [0, "&Utilde;"], [0, "&utilde;"], [0, "&Umacr;"], [0, "&umacr;"], [0, "&Ubreve;"], [0, "&ubreve;"], [0, "&Uring;"], [0, "&uring;"], [0, "&Udblac;"], [0, "&udblac;"], [0, "&Uogon;"], [0, "&uogon;"], [0, "&Wcirc;"], [0, "&wcirc;"], [0, "&Ycirc;"], [0, "&ycirc;"], [0, "&Yuml;"], [0, "&Zacute;"], [0, "&zacute;"], [0, "&Zdot;"], [0, "&zdot;"], [0, "&Zcaron;"], [0, "&zcaron;"], [19, "&fnof;"], [34, "&imped;"], [63, "&gacute;"], [65, "&jmath;"], [142, "&circ;"], [0, "&caron;"], [16, "&breve;"], [0, "&DiacriticalDot;"], [0, "&ring;"], [0, "&ogon;"], [0, "&DiacriticalTilde;"], [0, "&dblac;"], [51, "&DownBreve;"], [127, "&Alpha;"], [0, "&Beta;"], [0, "&Gamma;"], [0, "&Delta;"], [0, "&Epsilon;"], [0, "&Zeta;"], [0, "&Eta;"], [0, "&Theta;"], [0, "&Iota;"], [0, "&Kappa;"], [0, "&Lambda;"], [0, "&Mu;"], [0, "&Nu;"], [0, "&Xi;"], [0, "&Omicron;"], [0, "&Pi;"], [0, "&Rho;"], [1, "&Sigma;"], [0, "&Tau;"], [0, "&Upsilon;"], [0, "&Phi;"], [0, "&Chi;"], [0, "&Psi;"], [0, "&ohm;"], [7, "&alpha;"], [0, "&beta;"], [0, "&gamma;"], [0, "&delta;"], [0, "&epsi;"], [0, "&zeta;"], [0, "&eta;"], [0, "&theta;"], [0, "&iota;"], [0, "&kappa;"], [0, "&lambda;"], [0, "&mu;"], [0, "&nu;"], [0, "&xi;"], [0, "&omicron;"], [0, "&pi;"], [0, "&rho;"], [0, "&sigmaf;"], [0, "&sigma;"], [0, "&tau;"], [0, "&upsi;"], [0, "&phi;"], [0, "&chi;"], [0, "&psi;"], [0, "&omega;"], [7, "&thetasym;"], [0, "&Upsi;"], [2, "&phiv;"], [0, "&piv;"], [5, "&Gammad;"], [0, "&digamma;"], [18, "&kappav;"], [0, "&rhov;"], [3, "&epsiv;"], [0, "&backepsilon;"], [10, "&IOcy;"], [0, "&DJcy;"], [0, "&GJcy;"], [0, "&Jukcy;"], [0, "&DScy;"], [0, "&Iukcy;"], [0, "&YIcy;"], [0, "&Jsercy;"], [0, "&LJcy;"], [0, "&NJcy;"], [0, "&TSHcy;"], [0, "&KJcy;"], [1, "&Ubrcy;"], [0, "&DZcy;"], [0, "&Acy;"], [0, "&Bcy;"], [0, "&Vcy;"], [0, "&Gcy;"], [0, "&Dcy;"], [0, "&IEcy;"], [0, "&ZHcy;"], [0, "&Zcy;"], [0, "&Icy;"], [0, "&Jcy;"], [0, "&Kcy;"], [0, "&Lcy;"], [0, "&Mcy;"], [0, "&Ncy;"], [0, "&Ocy;"], [0, "&Pcy;"], [0, "&Rcy;"], [0, "&Scy;"], [0, "&Tcy;"], [0, "&Ucy;"], [0, "&Fcy;"], [0, "&KHcy;"], [0, "&TScy;"], [0, "&CHcy;"], [0, "&SHcy;"], [0, "&SHCHcy;"], [0, "&HARDcy;"], [0, "&Ycy;"], [0, "&SOFTcy;"], [0, "&Ecy;"], [0, "&YUcy;"], [0, "&YAcy;"], [0, "&acy;"], [0, "&bcy;"], [0, "&vcy;"], [0, "&gcy;"], [0, "&dcy;"], [0, "&iecy;"], [0, "&zhcy;"], [0, "&zcy;"], [0, "&icy;"], [0, "&jcy;"], [0, "&kcy;"], [0, "&lcy;"], [0, "&mcy;"], [0, "&ncy;"], [0, "&ocy;"], [0, "&pcy;"], [0, "&rcy;"], [0, "&scy;"], [0, "&tcy;"], [0, "&ucy;"], [0, "&fcy;"], [0, "&khcy;"], [0, "&tscy;"], [0, "&chcy;"], [0, "&shcy;"], [0, "&shchcy;"], [0, "&hardcy;"], [0, "&ycy;"], [0, "&softcy;"], [0, "&ecy;"], [0, "&yucy;"], [0, "&yacy;"], [1, "&iocy;"], [0, "&djcy;"], [0, "&gjcy;"], [0, "&jukcy;"], [0, "&dscy;"], [0, "&iukcy;"], [0, "&yicy;"], [0, "&jsercy;"], [0, "&ljcy;"], [0, "&njcy;"], [0, "&tshcy;"], [0, "&kjcy;"], [1, "&ubrcy;"], [0, "&dzcy;"], [7074, "&ensp;"], [0, "&emsp;"], [0, "&emsp13;"], [0, "&emsp14;"], [1, "&numsp;"], [0, "&puncsp;"], [0, "&ThinSpace;"], [0, "&hairsp;"], [0, "&NegativeMediumSpace;"], [0, "&zwnj;"], [0, "&zwj;"], [0, "&lrm;"], [0, "&rlm;"], [0, "&dash;"], [2, "&ndash;"], [0, "&mdash;"], [0, "&horbar;"], [0, "&Verbar;"], [1, "&lsquo;"], [0, "&CloseCurlyQuote;"], [0, "&lsquor;"], [1, "&ldquo;"], [0, "&CloseCurlyDoubleQuote;"], [0, "&bdquo;"], [1, "&dagger;"], [0, "&Dagger;"], [0, "&bull;"], [2, "&nldr;"], [0, "&hellip;"], [9, "&permil;"], [0, "&pertenk;"], [0, "&prime;"], [0, "&Prime;"], [0, "&tprime;"], [0, "&backprime;"], [3, "&lsaquo;"], [0, "&rsaquo;"], [3, "&oline;"], [2, "&caret;"], [1, "&hybull;"], [0, "&frasl;"], [10, "&bsemi;"], [7, "&qprime;"], [7, { v: "&MediumSpace;", n: 8202, o: "&ThickSpace;" }], [0, "&NoBreak;"], [0, "&af;"], [0, "&InvisibleTimes;"], [0, "&ic;"], [72, "&euro;"], [46, "&tdot;"], [0, "&DotDot;"], [37, "&complexes;"], [2, "&incare;"], [4, "&gscr;"], [0, "&hamilt;"], [0, "&Hfr;"], [0, "&Hopf;"], [0, "&planckh;"], [0, "&hbar;"], [0, "&imagline;"], [0, "&Ifr;"], [0, "&lagran;"], [0, "&ell;"], [1, "&naturals;"], [0, "&numero;"], [0, "&copysr;"], [0, "&weierp;"], [0, "&Popf;"], [0, "&Qopf;"], [0, "&realine;"], [0, "&real;"], [0, "&reals;"], [0, "&rx;"], [3, "&trade;"], [1, "&integers;"], [2, "&mho;"], [0, "&zeetrf;"], [0, "&iiota;"], [2, "&bernou;"], [0, "&Cayleys;"], [1, "&escr;"], [0, "&Escr;"], [0, "&Fouriertrf;"], [1, "&Mellintrf;"], [0, "&order;"], [0, "&alefsym;"], [0, "&beth;"], [0, "&gimel;"], [0, "&daleth;"], [12, "&CapitalDifferentialD;"], [0, "&dd;"], [0, "&ee;"], [0, "&ii;"], [10, "&frac13;"], [0, "&frac23;"], [0, "&frac15;"], [0, "&frac25;"], [0, "&frac35;"], [0, "&frac45;"], [0, "&frac16;"], [0, "&frac56;"], [0, "&frac18;"], [0, "&frac38;"], [0, "&frac58;"], [0, "&frac78;"], [49, "&larr;"], [0, "&ShortUpArrow;"], [0, "&rarr;"], [0, "&darr;"], [0, "&harr;"], [0, "&updownarrow;"], [0, "&nwarr;"], [0, "&nearr;"], [0, "&LowerRightArrow;"], [0, "&LowerLeftArrow;"], [0, "&nlarr;"], [0, "&nrarr;"], [1, { v: "&rarrw;", n: 824, o: "&nrarrw;" }], [0, "&Larr;"], [0, "&Uarr;"], [0, "&Rarr;"], [0, "&Darr;"], [0, "&larrtl;"], [0, "&rarrtl;"], [0, "&LeftTeeArrow;"], [0, "&mapstoup;"], [0, "&map;"], [0, "&DownTeeArrow;"], [1, "&hookleftarrow;"], [0, "&hookrightarrow;"], [0, "&larrlp;"], [0, "&looparrowright;"], [0, "&harrw;"], [0, "&nharr;"], [1, "&lsh;"], [0, "&rsh;"], [0, "&ldsh;"], [0, "&rdsh;"], [1, "&crarr;"], [0, "&cularr;"], [0, "&curarr;"], [2, "&circlearrowleft;"], [0, "&circlearrowright;"], [0, "&leftharpoonup;"], [0, "&DownLeftVector;"], [0, "&RightUpVector;"], [0, "&LeftUpVector;"], [0, "&rharu;"], [0, "&DownRightVector;"], [0, "&dharr;"], [0, "&dharl;"], [0, "&RightArrowLeftArrow;"], [0, "&udarr;"], [0, "&LeftArrowRightArrow;"], [0, "&leftleftarrows;"], [0, "&upuparrows;"], [0, "&rightrightarrows;"], [0, "&ddarr;"], [0, "&leftrightharpoons;"], [0, "&Equilibrium;"], [0, "&nlArr;"], [0, "&nhArr;"], [0, "&nrArr;"], [0, "&DoubleLeftArrow;"], [0, "&DoubleUpArrow;"], [0, "&DoubleRightArrow;"], [0, "&dArr;"], [0, "&DoubleLeftRightArrow;"], [0, "&DoubleUpDownArrow;"], [0, "&nwArr;"], [0, "&neArr;"], [0, "&seArr;"], [0, "&swArr;"], [0, "&lAarr;"], [0, "&rAarr;"], [1, "&zigrarr;"], [6, "&larrb;"], [0, "&rarrb;"], [15, "&DownArrowUpArrow;"], [7, "&loarr;"], [0, "&roarr;"], [0, "&hoarr;"], [0, "&forall;"], [0, "&comp;"], [0, { v: "&part;", n: 824, o: "&npart;" }], [0, "&exist;"], [0, "&nexist;"], [0, "&empty;"], [1, "&Del;"], [0, "&Element;"], [0, "&NotElement;"], [1, "&ni;"], [0, "&notni;"], [2, "&prod;"], [0, "&coprod;"], [0, "&sum;"], [0, "&minus;"], [0, "&MinusPlus;"], [0, "&dotplus;"], [1, "&Backslash;"], [0, "&lowast;"], [0, "&compfn;"], [1, "&radic;"], [2, "&prop;"], [0, "&infin;"], [0, "&angrt;"], [0, { v: "&ang;", n: 8402, o: "&nang;" }], [0, "&angmsd;"], [0, "&angsph;"], [0, "&mid;"], [0, "&nmid;"], [0, "&DoubleVerticalBar;"], [0, "&NotDoubleVerticalBar;"], [0, "&and;"], [0, "&or;"], [0, { v: "&cap;", n: 65024, o: "&caps;" }], [0, { v: "&cup;", n: 65024, o: "&cups;" }], [0, "&int;"], [0, "&Int;"], [0, "&iiint;"], [0, "&conint;"], [0, "&Conint;"], [0, "&Cconint;"], [0, "&cwint;"], [0, "&ClockwiseContourIntegral;"], [0, "&awconint;"], [0, "&there4;"], [0, "&becaus;"], [0, "&ratio;"], [0, "&Colon;"], [0, "&dotminus;"], [1, "&mDDot;"], [0, "&homtht;"], [0, { v: "&sim;", n: 8402, o: "&nvsim;" }], [0, { v: "&backsim;", n: 817, o: "&race;" }], [0, { v: "&ac;", n: 819, o: "&acE;" }], [0, "&acd;"], [0, "&VerticalTilde;"], [0, "&NotTilde;"], [0, { v: "&eqsim;", n: 824, o: "&nesim;" }], [0, "&sime;"], [0, "&NotTildeEqual;"], [0, "&cong;"], [0, "&simne;"], [0, "&ncong;"], [0, "&ap;"], [0, "&nap;"], [0, "&ape;"], [0, { v: "&apid;", n: 824, o: "&napid;" }], [0, "&backcong;"], [0, { v: "&asympeq;", n: 8402, o: "&nvap;" }], [0, { v: "&bump;", n: 824, o: "&nbump;" }], [0, { v: "&bumpe;", n: 824, o: "&nbumpe;" }], [0, { v: "&doteq;", n: 824, o: "&nedot;" }], [0, "&doteqdot;"], [0, "&efDot;"], [0, "&erDot;"], [0, "&Assign;"], [0, "&ecolon;"], [0, "&ecir;"], [0, "&circeq;"], [1, "&wedgeq;"], [0, "&veeeq;"], [1, "&triangleq;"], [2, "&equest;"], [0, "&ne;"], [0, { v: "&Congruent;", n: 8421, o: "&bnequiv;" }], [0, "&nequiv;"], [1, { v: "&le;", n: 8402, o: "&nvle;" }], [0, { v: "&ge;", n: 8402, o: "&nvge;" }], [0, { v: "&lE;", n: 824, o: "&nlE;" }], [0, { v: "&gE;", n: 824, o: "&ngE;" }], [0, { v: "&lnE;", n: 65024, o: "&lvertneqq;" }], [0, { v: "&gnE;", n: 65024, o: "&gvertneqq;" }], [0, { v: "&ll;", n: new Map(/* @__PURE__ */ Ur([[824, "&nLtv;"], [7577, "&nLt;"]])) }], [0, { v: "&gg;", n: new Map(/* @__PURE__ */ Ur([[824, "&nGtv;"], [7577, "&nGt;"]])) }], [0, "&between;"], [0, "&NotCupCap;"], [0, "&nless;"], [0, "&ngt;"], [0, "&nle;"], [0, "&nge;"], [0, "&lesssim;"], [0, "&GreaterTilde;"], [0, "&nlsim;"], [0, "&ngsim;"], [0, "&LessGreater;"], [0, "&gl;"], [0, "&NotLessGreater;"], [0, "&NotGreaterLess;"], [0, "&pr;"], [0, "&sc;"], [0, "&prcue;"], [0, "&sccue;"], [0, "&PrecedesTilde;"], [0, { v: "&scsim;", n: 824, o: "&NotSucceedsTilde;" }], [0, "&NotPrecedes;"], [0, "&NotSucceeds;"], [0, { v: "&sub;", n: 8402, o: "&NotSubset;" }], [0, { v: "&sup;", n: 8402, o: "&NotSuperset;" }], [0, "&nsub;"], [0, "&nsup;"], [0, "&sube;"], [0, "&supe;"], [0, "&NotSubsetEqual;"], [0, "&NotSupersetEqual;"], [0, { v: "&subne;", n: 65024, o: "&varsubsetneq;" }], [0, { v: "&supne;", n: 65024, o: "&varsupsetneq;" }], [1, "&cupdot;"], [0, "&UnionPlus;"], [0, { v: "&sqsub;", n: 824, o: "&NotSquareSubset;" }], [0, { v: "&sqsup;", n: 824, o: "&NotSquareSuperset;" }], [0, "&sqsube;"], [0, "&sqsupe;"], [0, { v: "&sqcap;", n: 65024, o: "&sqcaps;" }], [0, { v: "&sqcup;", n: 65024, o: "&sqcups;" }], [0, "&CirclePlus;"], [0, "&CircleMinus;"], [0, "&CircleTimes;"], [0, "&osol;"], [0, "&CircleDot;"], [0, "&circledcirc;"], [0, "&circledast;"], [1, "&circleddash;"], [0, "&boxplus;"], [0, "&boxminus;"], [0, "&boxtimes;"], [0, "&dotsquare;"], [0, "&RightTee;"], [0, "&dashv;"], [0, "&DownTee;"], [0, "&bot;"], [1, "&models;"], [0, "&DoubleRightTee;"], [0, "&Vdash;"], [0, "&Vvdash;"], [0, "&VDash;"], [0, "&nvdash;"], [0, "&nvDash;"], [0, "&nVdash;"], [0, "&nVDash;"], [0, "&prurel;"], [1, "&LeftTriangle;"], [0, "&RightTriangle;"], [0, { v: "&LeftTriangleEqual;", n: 8402, o: "&nvltrie;" }], [0, { v: "&RightTriangleEqual;", n: 8402, o: "&nvrtrie;" }], [0, "&origof;"], [0, "&imof;"], [0, "&multimap;"], [0, "&hercon;"], [0, "&intcal;"], [0, "&veebar;"], [1, "&barvee;"], [0, "&angrtvb;"], [0, "&lrtri;"], [0, "&bigwedge;"], [0, "&bigvee;"], [0, "&bigcap;"], [0, "&bigcup;"], [0, "&diam;"], [0, "&sdot;"], [0, "&sstarf;"], [0, "&divideontimes;"], [0, "&bowtie;"], [0, "&ltimes;"], [0, "&rtimes;"], [0, "&leftthreetimes;"], [0, "&rightthreetimes;"], [0, "&backsimeq;"], [0, "&curlyvee;"], [0, "&curlywedge;"], [0, "&Sub;"], [0, "&Sup;"], [0, "&Cap;"], [0, "&Cup;"], [0, "&fork;"], [0, "&epar;"], [0, "&lessdot;"], [0, "&gtdot;"], [0, { v: "&Ll;", n: 824, o: "&nLl;" }], [0, { v: "&Gg;", n: 824, o: "&nGg;" }], [0, { v: "&leg;", n: 65024, o: "&lesg;" }], [0, { v: "&gel;", n: 65024, o: "&gesl;" }], [2, "&cuepr;"], [0, "&cuesc;"], [0, "&NotPrecedesSlantEqual;"], [0, "&NotSucceedsSlantEqual;"], [0, "&NotSquareSubsetEqual;"], [0, "&NotSquareSupersetEqual;"], [2, "&lnsim;"], [0, "&gnsim;"], [0, "&precnsim;"], [0, "&scnsim;"], [0, "&nltri;"], [0, "&NotRightTriangle;"], [0, "&nltrie;"], [0, "&NotRightTriangleEqual;"], [0, "&vellip;"], [0, "&ctdot;"], [0, "&utdot;"], [0, "&dtdot;"], [0, "&disin;"], [0, "&isinsv;"], [0, "&isins;"], [0, { v: "&isindot;", n: 824, o: "&notindot;" }], [0, "&notinvc;"], [0, "&notinvb;"], [1, { v: "&isinE;", n: 824, o: "&notinE;" }], [0, "&nisd;"], [0, "&xnis;"], [0, "&nis;"], [0, "&notnivc;"], [0, "&notnivb;"], [6, "&barwed;"], [0, "&Barwed;"], [1, "&lceil;"], [0, "&rceil;"], [0, "&LeftFloor;"], [0, "&rfloor;"], [0, "&drcrop;"], [0, "&dlcrop;"], [0, "&urcrop;"], [0, "&ulcrop;"], [0, "&bnot;"], [1, "&profline;"], [0, "&profsurf;"], [1, "&telrec;"], [0, "&target;"], [5, "&ulcorn;"], [0, "&urcorn;"], [0, "&dlcorn;"], [0, "&drcorn;"], [2, "&frown;"], [0, "&smile;"], [9, "&cylcty;"], [0, "&profalar;"], [7, "&topbot;"], [6, "&ovbar;"], [1, "&solbar;"], [60, "&angzarr;"], [51, "&lmoustache;"], [0, "&rmoustache;"], [2, "&OverBracket;"], [0, "&bbrk;"], [0, "&bbrktbrk;"], [37, "&OverParenthesis;"], [0, "&UnderParenthesis;"], [0, "&OverBrace;"], [0, "&UnderBrace;"], [2, "&trpezium;"], [4, "&elinters;"], [59, "&blank;"], [164, "&circledS;"], [55, "&boxh;"], [1, "&boxv;"], [9, "&boxdr;"], [3, "&boxdl;"], [3, "&boxur;"], [3, "&boxul;"], [3, "&boxvr;"], [7, "&boxvl;"], [7, "&boxhd;"], [7, "&boxhu;"], [7, "&boxvh;"], [19, "&boxH;"], [0, "&boxV;"], [0, "&boxdR;"], [0, "&boxDr;"], [0, "&boxDR;"], [0, "&boxdL;"], [0, "&boxDl;"], [0, "&boxDL;"], [0, "&boxuR;"], [0, "&boxUr;"], [0, "&boxUR;"], [0, "&boxuL;"], [0, "&boxUl;"], [0, "&boxUL;"], [0, "&boxvR;"], [0, "&boxVr;"], [0, "&boxVR;"], [0, "&boxvL;"], [0, "&boxVl;"], [0, "&boxVL;"], [0, "&boxHd;"], [0, "&boxhD;"], [0, "&boxHD;"], [0, "&boxHu;"], [0, "&boxhU;"], [0, "&boxHU;"], [0, "&boxvH;"], [0, "&boxVh;"], [0, "&boxVH;"], [19, "&uhblk;"], [3, "&lhblk;"], [3, "&block;"], [8, "&blk14;"], [0, "&blk12;"], [0, "&blk34;"], [13, "&square;"], [8, "&blacksquare;"], [0, "&EmptyVerySmallSquare;"], [1, "&rect;"], [0, "&marker;"], [2, "&fltns;"], [1, "&bigtriangleup;"], [0, "&blacktriangle;"], [0, "&triangle;"], [2, "&blacktriangleright;"], [0, "&rtri;"], [3, "&bigtriangledown;"], [0, "&blacktriangledown;"], [0, "&dtri;"], [2, "&blacktriangleleft;"], [0, "&ltri;"], [6, "&loz;"], [0, "&cir;"], [32, "&tridot;"], [2, "&bigcirc;"], [8, "&ultri;"], [0, "&urtri;"], [0, "&lltri;"], [0, "&EmptySmallSquare;"], [0, "&FilledSmallSquare;"], [8, "&bigstar;"], [0, "&star;"], [7, "&phone;"], [49, "&female;"], [1, "&male;"], [29, "&spades;"], [2, "&clubs;"], [1, "&hearts;"], [0, "&diamondsuit;"], [3, "&sung;"], [2, "&flat;"], [0, "&natural;"], [0, "&sharp;"], [163, "&check;"], [3, "&cross;"], [8, "&malt;"], [21, "&sext;"], [33, "&VerticalSeparator;"], [25, "&lbbrk;"], [0, "&rbbrk;"], [84, "&bsolhsub;"], [0, "&suphsol;"], [28, "&LeftDoubleBracket;"], [0, "&RightDoubleBracket;"], [0, "&lang;"], [0, "&rang;"], [0, "&Lang;"], [0, "&Rang;"], [0, "&loang;"], [0, "&roang;"], [7, "&longleftarrow;"], [0, "&longrightarrow;"], [0, "&longleftrightarrow;"], [0, "&DoubleLongLeftArrow;"], [0, "&DoubleLongRightArrow;"], [0, "&DoubleLongLeftRightArrow;"], [1, "&longmapsto;"], [2, "&dzigrarr;"], [258, "&nvlArr;"], [0, "&nvrArr;"], [0, "&nvHarr;"], [0, "&Map;"], [6, "&lbarr;"], [0, "&bkarow;"], [0, "&lBarr;"], [0, "&dbkarow;"], [0, "&drbkarow;"], [0, "&DDotrahd;"], [0, "&UpArrowBar;"], [0, "&DownArrowBar;"], [2, "&Rarrtl;"], [2, "&latail;"], [0, "&ratail;"], [0, "&lAtail;"], [0, "&rAtail;"], [0, "&larrfs;"], [0, "&rarrfs;"], [0, "&larrbfs;"], [0, "&rarrbfs;"], [2, "&nwarhk;"], [0, "&nearhk;"], [0, "&hksearow;"], [0, "&hkswarow;"], [0, "&nwnear;"], [0, "&nesear;"], [0, "&seswar;"], [0, "&swnwar;"], [8, { v: "&rarrc;", n: 824, o: "&nrarrc;" }], [1, "&cudarrr;"], [0, "&ldca;"], [0, "&rdca;"], [0, "&cudarrl;"], [0, "&larrpl;"], [2, "&curarrm;"], [0, "&cularrp;"], [7, "&rarrpl;"], [2, "&harrcir;"], [0, "&Uarrocir;"], [0, "&lurdshar;"], [0, "&ldrushar;"], [2, "&LeftRightVector;"], [0, "&RightUpDownVector;"], [0, "&DownLeftRightVector;"], [0, "&LeftUpDownVector;"], [0, "&LeftVectorBar;"], [0, "&RightVectorBar;"], [0, "&RightUpVectorBar;"], [0, "&RightDownVectorBar;"], [0, "&DownLeftVectorBar;"], [0, "&DownRightVectorBar;"], [0, "&LeftUpVectorBar;"], [0, "&LeftDownVectorBar;"], [0, "&LeftTeeVector;"], [0, "&RightTeeVector;"], [0, "&RightUpTeeVector;"], [0, "&RightDownTeeVector;"], [0, "&DownLeftTeeVector;"], [0, "&DownRightTeeVector;"], [0, "&LeftUpTeeVector;"], [0, "&LeftDownTeeVector;"], [0, "&lHar;"], [0, "&uHar;"], [0, "&rHar;"], [0, "&dHar;"], [0, "&luruhar;"], [0, "&ldrdhar;"], [0, "&ruluhar;"], [0, "&rdldhar;"], [0, "&lharul;"], [0, "&llhard;"], [0, "&rharul;"], [0, "&lrhard;"], [0, "&udhar;"], [0, "&duhar;"], [0, "&RoundImplies;"], [0, "&erarr;"], [0, "&simrarr;"], [0, "&larrsim;"], [0, "&rarrsim;"], [0, "&rarrap;"], [0, "&ltlarr;"], [1, "&gtrarr;"], [0, "&subrarr;"], [1, "&suplarr;"], [0, "&lfisht;"], [0, "&rfisht;"], [0, "&ufisht;"], [0, "&dfisht;"], [5, "&lopar;"], [0, "&ropar;"], [4, "&lbrke;"], [0, "&rbrke;"], [0, "&lbrkslu;"], [0, "&rbrksld;"], [0, "&lbrksld;"], [0, "&rbrkslu;"], [0, "&langd;"], [0, "&rangd;"], [0, "&lparlt;"], [0, "&rpargt;"], [0, "&gtlPar;"], [0, "&ltrPar;"], [3, "&vzigzag;"], [1, "&vangrt;"], [0, "&angrtvbd;"], [6, "&ange;"], [0, "&range;"], [0, "&dwangle;"], [0, "&uwangle;"], [0, "&angmsdaa;"], [0, "&angmsdab;"], [0, "&angmsdac;"], [0, "&angmsdad;"], [0, "&angmsdae;"], [0, "&angmsdaf;"], [0, "&angmsdag;"], [0, "&angmsdah;"], [0, "&bemptyv;"], [0, "&demptyv;"], [0, "&cemptyv;"], [0, "&raemptyv;"], [0, "&laemptyv;"], [0, "&ohbar;"], [0, "&omid;"], [0, "&opar;"], [1, "&operp;"], [1, "&olcross;"], [0, "&odsold;"], [1, "&olcir;"], [0, "&ofcir;"], [0, "&olt;"], [0, "&ogt;"], [0, "&cirscir;"], [0, "&cirE;"], [0, "&solb;"], [0, "&bsolb;"], [3, "&boxbox;"], [3, "&trisb;"], [0, "&rtriltri;"], [0, { v: "&LeftTriangleBar;", n: 824, o: "&NotLeftTriangleBar;" }], [0, { v: "&RightTriangleBar;", n: 824, o: "&NotRightTriangleBar;" }], [11, "&iinfin;"], [0, "&infintie;"], [0, "&nvinfin;"], [4, "&eparsl;"], [0, "&smeparsl;"], [0, "&eqvparsl;"], [5, "&blacklozenge;"], [8, "&RuleDelayed;"], [1, "&dsol;"], [9, "&bigodot;"], [0, "&bigoplus;"], [0, "&bigotimes;"], [1, "&biguplus;"], [1, "&bigsqcup;"], [5, "&iiiint;"], [0, "&fpartint;"], [2, "&cirfnint;"], [0, "&awint;"], [0, "&rppolint;"], [0, "&scpolint;"], [0, "&npolint;"], [0, "&pointint;"], [0, "&quatint;"], [0, "&intlarhk;"], [10, "&pluscir;"], [0, "&plusacir;"], [0, "&simplus;"], [0, "&plusdu;"], [0, "&plussim;"], [0, "&plustwo;"], [1, "&mcomma;"], [0, "&minusdu;"], [2, "&loplus;"], [0, "&roplus;"], [0, "&Cross;"], [0, "&timesd;"], [0, "&timesbar;"], [1, "&smashp;"], [0, "&lotimes;"], [0, "&rotimes;"], [0, "&otimesas;"], [0, "&Otimes;"], [0, "&odiv;"], [0, "&triplus;"], [0, "&triminus;"], [0, "&tritime;"], [0, "&intprod;"], [2, "&amalg;"], [0, "&capdot;"], [1, "&ncup;"], [0, "&ncap;"], [0, "&capand;"], [0, "&cupor;"], [0, "&cupcap;"], [0, "&capcup;"], [0, "&cupbrcap;"], [0, "&capbrcup;"], [0, "&cupcup;"], [0, "&capcap;"], [0, "&ccups;"], [0, "&ccaps;"], [2, "&ccupssm;"], [2, "&And;"], [0, "&Or;"], [0, "&andand;"], [0, "&oror;"], [0, "&orslope;"], [0, "&andslope;"], [1, "&andv;"], [0, "&orv;"], [0, "&andd;"], [0, "&ord;"], [1, "&wedbar;"], [6, "&sdote;"], [3, "&simdot;"], [2, { v: "&congdot;", n: 824, o: "&ncongdot;" }], [0, "&easter;"], [0, "&apacir;"], [0, { v: "&apE;", n: 824, o: "&napE;" }], [0, "&eplus;"], [0, "&pluse;"], [0, "&Esim;"], [0, "&Colone;"], [0, "&Equal;"], [1, "&ddotseq;"], [0, "&equivDD;"], [0, "&ltcir;"], [0, "&gtcir;"], [0, "&ltquest;"], [0, "&gtquest;"], [0, { v: "&leqslant;", n: 824, o: "&nleqslant;" }], [0, { v: "&geqslant;", n: 824, o: "&ngeqslant;" }], [0, "&lesdot;"], [0, "&gesdot;"], [0, "&lesdoto;"], [0, "&gesdoto;"], [0, "&lesdotor;"], [0, "&gesdotol;"], [0, "&lap;"], [0, "&gap;"], [0, "&lne;"], [0, "&gne;"], [0, "&lnap;"], [0, "&gnap;"], [0, "&lEg;"], [0, "&gEl;"], [0, "&lsime;"], [0, "&gsime;"], [0, "&lsimg;"], [0, "&gsiml;"], [0, "&lgE;"], [0, "&glE;"], [0, "&lesges;"], [0, "&gesles;"], [0, "&els;"], [0, "&egs;"], [0, "&elsdot;"], [0, "&egsdot;"], [0, "&el;"], [0, "&eg;"], [2, "&siml;"], [0, "&simg;"], [0, "&simlE;"], [0, "&simgE;"], [0, { v: "&LessLess;", n: 824, o: "&NotNestedLessLess;" }], [0, { v: "&GreaterGreater;", n: 824, o: "&NotNestedGreaterGreater;" }], [1, "&glj;"], [0, "&gla;"], [0, "&ltcc;"], [0, "&gtcc;"], [0, "&lescc;"], [0, "&gescc;"], [0, "&smt;"], [0, "&lat;"], [0, { v: "&smte;", n: 65024, o: "&smtes;" }], [0, { v: "&late;", n: 65024, o: "&lates;" }], [0, "&bumpE;"], [0, { v: "&PrecedesEqual;", n: 824, o: "&NotPrecedesEqual;" }], [0, { v: "&sce;", n: 824, o: "&NotSucceedsEqual;" }], [2, "&prE;"], [0, "&scE;"], [0, "&precneqq;"], [0, "&scnE;"], [0, "&prap;"], [0, "&scap;"], [0, "&precnapprox;"], [0, "&scnap;"], [0, "&Pr;"], [0, "&Sc;"], [0, "&subdot;"], [0, "&supdot;"], [0, "&subplus;"], [0, "&supplus;"], [0, "&submult;"], [0, "&supmult;"], [0, "&subedot;"], [0, "&supedot;"], [0, { v: "&subE;", n: 824, o: "&nsubE;" }], [0, { v: "&supE;", n: 824, o: "&nsupE;" }], [0, "&subsim;"], [0, "&supsim;"], [2, { v: "&subnE;", n: 65024, o: "&varsubsetneqq;" }], [0, { v: "&supnE;", n: 65024, o: "&varsupsetneqq;" }], [2, "&csub;"], [0, "&csup;"], [0, "&csube;"], [0, "&csupe;"], [0, "&subsup;"], [0, "&supsub;"], [0, "&subsub;"], [0, "&supsup;"], [0, "&suphsub;"], [0, "&supdsub;"], [0, "&forkv;"], [0, "&topfork;"], [0, "&mlcp;"], [8, "&Dashv;"], [1, "&Vdashl;"], [0, "&Barv;"], [0, "&vBar;"], [0, "&vBarv;"], [1, "&Vbar;"], [0, "&Not;"], [0, "&bNot;"], [0, "&rnmid;"], [0, "&cirmid;"], [0, "&midcir;"], [0, "&topcir;"], [0, "&nhpar;"], [0, "&parsim;"], [9, { v: "&parsl;", n: 8421, o: "&nparsl;" }], [44343, { n: new Map(/* @__PURE__ */ Ur([[56476, "&Ascr;"], [1, "&Cscr;"], [0, "&Dscr;"], [2, "&Gscr;"], [2, "&Jscr;"], [0, "&Kscr;"], [2, "&Nscr;"], [0, "&Oscr;"], [0, "&Pscr;"], [0, "&Qscr;"], [1, "&Sscr;"], [0, "&Tscr;"], [0, "&Uscr;"], [0, "&Vscr;"], [0, "&Wscr;"], [0, "&Xscr;"], [0, "&Yscr;"], [0, "&Zscr;"], [0, "&ascr;"], [0, "&bscr;"], [0, "&cscr;"], [0, "&dscr;"], [1, "&fscr;"], [1, "&hscr;"], [0, "&iscr;"], [0, "&jscr;"], [0, "&kscr;"], [0, "&lscr;"], [0, "&mscr;"], [0, "&nscr;"], [1, "&pscr;"], [0, "&qscr;"], [0, "&rscr;"], [0, "&sscr;"], [0, "&tscr;"], [0, "&uscr;"], [0, "&vscr;"], [0, "&wscr;"], [0, "&xscr;"], [0, "&yscr;"], [0, "&zscr;"], [52, "&Afr;"], [0, "&Bfr;"], [1, "&Dfr;"], [0, "&Efr;"], [0, "&Ffr;"], [0, "&Gfr;"], [2, "&Jfr;"], [0, "&Kfr;"], [0, "&Lfr;"], [0, "&Mfr;"], [0, "&Nfr;"], [0, "&Ofr;"], [0, "&Pfr;"], [0, "&Qfr;"], [1, "&Sfr;"], [0, "&Tfr;"], [0, "&Ufr;"], [0, "&Vfr;"], [0, "&Wfr;"], [0, "&Xfr;"], [0, "&Yfr;"], [1, "&afr;"], [0, "&bfr;"], [0, "&cfr;"], [0, "&dfr;"], [0, "&efr;"], [0, "&ffr;"], [0, "&gfr;"], [0, "&hfr;"], [0, "&ifr;"], [0, "&jfr;"], [0, "&kfr;"], [0, "&lfr;"], [0, "&mfr;"], [0, "&nfr;"], [0, "&ofr;"], [0, "&pfr;"], [0, "&qfr;"], [0, "&rfr;"], [0, "&sfr;"], [0, "&tfr;"], [0, "&ufr;"], [0, "&vfr;"], [0, "&wfr;"], [0, "&xfr;"], [0, "&yfr;"], [0, "&zfr;"], [0, "&Aopf;"], [0, "&Bopf;"], [1, "&Dopf;"], [0, "&Eopf;"], [0, "&Fopf;"], [0, "&Gopf;"], [1, "&Iopf;"], [0, "&Jopf;"], [0, "&Kopf;"], [0, "&Lopf;"], [0, "&Mopf;"], [1, "&Oopf;"], [3, "&Sopf;"], [0, "&Topf;"], [0, "&Uopf;"], [0, "&Vopf;"], [0, "&Wopf;"], [0, "&Xopf;"], [0, "&Yopf;"], [1, "&aopf;"], [0, "&bopf;"], [0, "&copf;"], [0, "&dopf;"], [0, "&eopf;"], [0, "&fopf;"], [0, "&gopf;"], [0, "&hopf;"], [0, "&iopf;"], [0, "&jopf;"], [0, "&kopf;"], [0, "&lopf;"], [0, "&mopf;"], [0, "&nopf;"], [0, "&oopf;"], [0, "&popf;"], [0, "&qopf;"], [0, "&ropf;"], [0, "&sopf;"], [0, "&topf;"], [0, "&uopf;"], [0, "&vopf;"], [0, "&wopf;"], [0, "&xopf;"], [0, "&yopf;"], [0, "&zopf;"]])) }], [8906, "&fflig;"], [0, "&filig;"], [0, "&fllig;"], [0, "&ffilig;"], [0, "&ffllig;"]]));
var Ta = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.escapeText = e.escapeAttribute = e.escapeUTF8 = e.escape = e.encodeXML = e.getCodePoint = e.xmlReplacer = void 0, e.xmlReplacer = /["&'<>$\x80-\uFFFF]/g;
  var u = /* @__PURE__ */ new Map([
    [34, "&quot;"],
    [38, "&amp;"],
    [39, "&apos;"],
    [60, "&lt;"],
    [62, "&gt;"]
  ]);
  e.getCodePoint = // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  String.prototype.codePointAt != null ? function(a, n) {
    return a.codePointAt(n);
  } : (
    // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
    function(a, n) {
      return (a.charCodeAt(n) & 64512) === 55296 ? (a.charCodeAt(n) - 55296) * 1024 + a.charCodeAt(n + 1) - 56320 + 65536 : a.charCodeAt(n);
    }
  );
  function t(a) {
    for (var n = "", i = 0, s; (s = e.xmlReplacer.exec(a)) !== null; ) {
      var o = s.index, d = a.charCodeAt(o), c = u.get(d);
      c !== void 0 ? (n += a.substring(i, o) + c, i = o + 1) : (n += "".concat(a.substring(i, o), "&#x").concat((0, e.getCodePoint)(a, o).toString(16), ";"), i = e.xmlReplacer.lastIndex += +((d & 64512) === 55296));
    }
    return n + a.substr(i);
  }
  e.encodeXML = t, e.escape = t;
  function r(a, n) {
    return function(s) {
      for (var o, d = 0, c = ""; o = a.exec(s); )
        d !== o.index && (c += s.substring(d, o.index)), c += n.get(o[0].charCodeAt(0)), d = o.index + 1;
      return c + s.substring(d);
    };
  }
  e.escapeUTF8 = r(/[&<>'"]/g, u), e.escapeAttribute = r(/["&\u00A0]/g, /* @__PURE__ */ new Map([
    [34, "&quot;"],
    [38, "&amp;"],
    [160, "&nbsp;"]
  ])), e.escapeText = r(/[&<>\u00A0]/g, /* @__PURE__ */ new Map([
    [38, "&amp;"],
    [60, "&lt;"],
    [62, "&gt;"],
    [160, "&nbsp;"]
  ]));
})(Ta);
var d8 = C && C.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Bt, "__esModule", { value: !0 });
Bt.encodeNonAsciiHTML = Bt.encodeHTML = void 0;
var l8 = d8(Pc), k1 = Ta, f8 = /[\t\n!-,./:-@[-`\f{-}$\x80-\uFFFF]/g;
function b8(e) {
  return B1(f8, e);
}
Bt.encodeHTML = b8;
function h8(e) {
  return B1(k1.xmlReplacer, e);
}
Bt.encodeNonAsciiHTML = h8;
function B1(e, u) {
  for (var t = "", r = 0, a; (a = e.exec(u)) !== null; ) {
    var n = a.index;
    t += u.substring(r, n);
    var i = u.charCodeAt(n), s = l8.default.get(i);
    if (typeof s == "object") {
      if (n + 1 < u.length) {
        var o = u.charCodeAt(n + 1), d = typeof s.n == "number" ? s.n === o ? s.o : void 0 : s.n.get(o);
        if (d !== void 0) {
          t += d, r = e.lastIndex += 1;
          continue;
        }
      }
      s = s.v;
    }
    if (s !== void 0)
      t += s, r = n + 1;
    else {
      var c = (0, k1.getCodePoint)(u, n);
      t += "&#x".concat(c.toString(16), ";"), r = e.lastIndex += +(c !== i);
    }
  }
  return t + u.substr(r);
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.decodeXMLStrict = e.decodeHTML5Strict = e.decodeHTML4Strict = e.decodeHTML5 = e.decodeHTML4 = e.decodeHTMLAttribute = e.decodeHTMLStrict = e.decodeHTML = e.decodeXML = e.DecodingMode = e.EntityDecoder = e.encodeHTML5 = e.encodeHTML4 = e.encodeNonAsciiHTML = e.encodeHTML = e.escapeText = e.escapeAttribute = e.escapeUTF8 = e.escape = e.encodeXML = e.encode = e.decodeStrict = e.decode = e.EncodingMode = e.EntityLevel = void 0;
  var u = ar, t = Bt, r = Ta, a;
  (function(f) {
    f[f.XML = 0] = "XML", f[f.HTML = 1] = "HTML";
  })(a = e.EntityLevel || (e.EntityLevel = {}));
  var n;
  (function(f) {
    f[f.UTF8 = 0] = "UTF8", f[f.ASCII = 1] = "ASCII", f[f.Extensive = 2] = "Extensive", f[f.Attribute = 3] = "Attribute", f[f.Text = 4] = "Text";
  })(n = e.EncodingMode || (e.EncodingMode = {}));
  function i(f, m) {
    m === void 0 && (m = a.XML);
    var v = typeof m == "number" ? m : m.level;
    if (v === a.HTML) {
      var L = typeof m == "object" ? m.mode : void 0;
      return (0, u.decodeHTML)(f, L);
    }
    return (0, u.decodeXML)(f);
  }
  e.decode = i;
  function s(f, m) {
    var v;
    m === void 0 && (m = a.XML);
    var L = typeof m == "number" ? { level: m } : m;
    return (v = L.mode) !== null && v !== void 0 || (L.mode = u.DecodingMode.Strict), i(f, L);
  }
  e.decodeStrict = s;
  function o(f, m) {
    m === void 0 && (m = a.XML);
    var v = typeof m == "number" ? { level: m } : m;
    return v.mode === n.UTF8 ? (0, r.escapeUTF8)(f) : v.mode === n.Attribute ? (0, r.escapeAttribute)(f) : v.mode === n.Text ? (0, r.escapeText)(f) : v.level === a.HTML ? v.mode === n.ASCII ? (0, t.encodeNonAsciiHTML)(f) : (0, t.encodeHTML)(f) : (0, r.encodeXML)(f);
  }
  e.encode = o;
  var d = Ta;
  Object.defineProperty(e, "encodeXML", { enumerable: !0, get: function() {
    return d.encodeXML;
  } }), Object.defineProperty(e, "escape", { enumerable: !0, get: function() {
    return d.escape;
  } }), Object.defineProperty(e, "escapeUTF8", { enumerable: !0, get: function() {
    return d.escapeUTF8;
  } }), Object.defineProperty(e, "escapeAttribute", { enumerable: !0, get: function() {
    return d.escapeAttribute;
  } }), Object.defineProperty(e, "escapeText", { enumerable: !0, get: function() {
    return d.escapeText;
  } });
  var c = Bt;
  Object.defineProperty(e, "encodeHTML", { enumerable: !0, get: function() {
    return c.encodeHTML;
  } }), Object.defineProperty(e, "encodeNonAsciiHTML", { enumerable: !0, get: function() {
    return c.encodeNonAsciiHTML;
  } }), Object.defineProperty(e, "encodeHTML4", { enumerable: !0, get: function() {
    return c.encodeHTML;
  } }), Object.defineProperty(e, "encodeHTML5", { enumerable: !0, get: function() {
    return c.encodeHTML;
  } });
  var E = ar;
  Object.defineProperty(e, "EntityDecoder", { enumerable: !0, get: function() {
    return E.EntityDecoder;
  } }), Object.defineProperty(e, "DecodingMode", { enumerable: !0, get: function() {
    return E.DecodingMode;
  } }), Object.defineProperty(e, "decodeXML", { enumerable: !0, get: function() {
    return E.decodeXML;
  } }), Object.defineProperty(e, "decodeHTML", { enumerable: !0, get: function() {
    return E.decodeHTML;
  } }), Object.defineProperty(e, "decodeHTMLStrict", { enumerable: !0, get: function() {
    return E.decodeHTMLStrict;
  } }), Object.defineProperty(e, "decodeHTMLAttribute", { enumerable: !0, get: function() {
    return E.decodeHTMLAttribute;
  } }), Object.defineProperty(e, "decodeHTML4", { enumerable: !0, get: function() {
    return E.decodeHTML;
  } }), Object.defineProperty(e, "decodeHTML5", { enumerable: !0, get: function() {
    return E.decodeHTML;
  } }), Object.defineProperty(e, "decodeHTML4Strict", { enumerable: !0, get: function() {
    return E.decodeHTMLStrict;
  } }), Object.defineProperty(e, "decodeHTML5Strict", { enumerable: !0, get: function() {
    return E.decodeHTMLStrict;
  } }), Object.defineProperty(e, "decodeXMLStrict", { enumerable: !0, get: function() {
    return E.decodeXML;
  } });
})(M1);
var N0 = {};
Object.defineProperty(N0, "__esModule", { value: !0 });
N0.attributeNames = N0.elementNames = void 0;
N0.elementNames = new Map([
  "altGlyph",
  "altGlyphDef",
  "altGlyphItem",
  "animateColor",
  "animateMotion",
  "animateTransform",
  "clipPath",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDistantLight",
  "feDropShadow",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence",
  "foreignObject",
  "glyphRef",
  "linearGradient",
  "radialGradient",
  "textPath"
].map(function(e) {
  return [e.toLowerCase(), e];
}));
N0.attributeNames = new Map([
  "definitionURL",
  "attributeName",
  "attributeType",
  "baseFrequency",
  "baseProfile",
  "calcMode",
  "clipPathUnits",
  "diffuseConstant",
  "edgeMode",
  "filterUnits",
  "glyphRef",
  "gradientTransform",
  "gradientUnits",
  "kernelMatrix",
  "kernelUnitLength",
  "keyPoints",
  "keySplines",
  "keyTimes",
  "lengthAdjust",
  "limitingConeAngle",
  "markerHeight",
  "markerUnits",
  "markerWidth",
  "maskContentUnits",
  "maskUnits",
  "numOctaves",
  "pathLength",
  "patternContentUnits",
  "patternTransform",
  "patternUnits",
  "pointsAtX",
  "pointsAtY",
  "pointsAtZ",
  "preserveAlpha",
  "preserveAspectRatio",
  "primitiveUnits",
  "refX",
  "refY",
  "repeatCount",
  "repeatDur",
  "requiredExtensions",
  "requiredFeatures",
  "specularConstant",
  "specularExponent",
  "spreadMethod",
  "startOffset",
  "stdDeviation",
  "stitchTiles",
  "surfaceScale",
  "systemLanguage",
  "tableValues",
  "targetX",
  "targetY",
  "textLength",
  "viewBox",
  "viewTarget",
  "xChannelSelector",
  "yChannelSelector",
  "zoomAndPan"
].map(function(e) {
  return [e.toLowerCase(), e];
}));
var a0 = C && C.__assign || function() {
  return a0 = Object.assign || function(e) {
    for (var u, t = 1, r = arguments.length; t < r; t++) {
      u = arguments[t];
      for (var a in u)
        Object.prototype.hasOwnProperty.call(u, a) && (e[a] = u[a]);
    }
    return e;
  }, a0.apply(this, arguments);
}, p8 = C && C.__createBinding || (Object.create ? function(e, u, t, r) {
  r === void 0 && (r = t);
  var a = Object.getOwnPropertyDescriptor(u, t);
  (!a || ("get" in a ? !u.__esModule : a.writable || a.configurable)) && (a = { enumerable: !0, get: function() {
    return u[t];
  } }), Object.defineProperty(e, r, a);
} : function(e, u, t, r) {
  r === void 0 && (r = t), e[r] = u[t];
}), m8 = C && C.__setModuleDefault || (Object.create ? function(e, u) {
  Object.defineProperty(e, "default", { enumerable: !0, value: u });
} : function(e, u) {
  e.default = u;
}), g8 = C && C.__importStar || function(e) {
  if (e && e.__esModule)
    return e;
  var u = {};
  if (e != null)
    for (var t in e)
      t !== "default" && Object.prototype.hasOwnProperty.call(e, t) && p8(u, e, t);
  return m8(u, e), u;
};
Object.defineProperty(vr, "__esModule", { value: !0 });
vr.render = void 0;
var ut = g8(Be), _a = M1, U1 = N0, E8 = /* @__PURE__ */ new Set([
  "style",
  "script",
  "xmp",
  "iframe",
  "noembed",
  "noframes",
  "plaintext",
  "noscript"
]);
function T8(e) {
  return e.replace(/"/g, "&quot;");
}
function _8(e, u) {
  var t;
  if (e) {
    var r = ((t = u.encodeEntities) !== null && t !== void 0 ? t : u.decodeEntities) === !1 ? T8 : u.xmlMode || u.encodeEntities !== "utf8" ? _a.encodeXML : _a.escapeAttribute;
    return Object.keys(e).map(function(a) {
      var n, i, s = (n = e[a]) !== null && n !== void 0 ? n : "";
      return u.xmlMode === "foreign" && (a = (i = U1.attributeNames.get(a)) !== null && i !== void 0 ? i : a), !u.emptyAttrs && !u.xmlMode && s === "" ? a : "".concat(a, '="').concat(r(s), '"');
    }).join(" ");
  }
}
var Ls = /* @__PURE__ */ new Set([
  "area",
  "base",
  "basefont",
  "br",
  "col",
  "command",
  "embed",
  "frame",
  "hr",
  "img",
  "input",
  "isindex",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
]);
function dn(e, u) {
  u === void 0 && (u = {});
  for (var t = ("length" in e) ? e : [e], r = "", a = 0; a < t.length; a++)
    r += y8(t[a], u);
  return r;
}
vr.render = dn;
vr.default = dn;
function y8(e, u) {
  switch (e.type) {
    case ut.Root:
      return dn(e.children, u);
    case ut.Doctype:
    case ut.Directive:
      return N8(e);
    case ut.Comment:
      return C8(e);
    case ut.CDATA:
      return D8(e);
    case ut.Script:
    case ut.Style:
    case ut.Tag:
      return x8(e, u);
    case ut.Text:
      return I8(e, u);
  }
}
var A8 = /* @__PURE__ */ new Set([
  "mi",
  "mo",
  "mn",
  "ms",
  "mtext",
  "annotation-xml",
  "foreignObject",
  "desc",
  "title"
]), v8 = /* @__PURE__ */ new Set(["svg", "math"]);
function x8(e, u) {
  var t;
  u.xmlMode === "foreign" && (e.name = (t = U1.elementNames.get(e.name)) !== null && t !== void 0 ? t : e.name, e.parent && A8.has(e.parent.name) && (u = a0(a0({}, u), { xmlMode: !1 }))), !u.xmlMode && v8.has(e.name) && (u = a0(a0({}, u), { xmlMode: "foreign" }));
  var r = "<".concat(e.name), a = _8(e.attribs, u);
  return a && (r += " ".concat(a)), e.children.length === 0 && (u.xmlMode ? (
    // In XML mode or foreign mode, and user hasn't explicitly turned off self-closing tags
    u.selfClosingTags !== !1
  ) : (
    // User explicitly asked for self-closing tags, even in HTML mode
    u.selfClosingTags && Ls.has(e.name)
  )) ? (u.xmlMode || (r += " "), r += "/>") : (r += ">", e.children.length > 0 && (r += dn(e.children, u)), (u.xmlMode || !Ls.has(e.name)) && (r += "</".concat(e.name, ">"))), r;
}
function N8(e) {
  return "<".concat(e.data, ">");
}
function I8(e, u) {
  var t, r = e.data || "";
  return ((t = u.encodeEntities) !== null && t !== void 0 ? t : u.decodeEntities) !== !1 && !(!u.xmlMode && e.parent && E8.has(e.parent.name)) && (r = u.xmlMode || u.encodeEntities !== "utf8" ? (0, _a.encodeXML)(r) : (0, _a.escapeText)(r)), r;
}
function D8(e) {
  return "<![CDATA[".concat(e.children[0].data, "]]>");
}
function C8(e) {
  return "<!--".concat(e.data, "-->");
}
var S8 = C && C.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Cu, "__esModule", { value: !0 });
Cu.innerText = Cu.textContent = Cu.getText = Cu.getInnerHTML = Cu.getOuterHTML = void 0;
var Xu = nt, O8 = S8(vr), L8 = Be;
function H1(e, u) {
  return (0, O8.default)(e, u);
}
Cu.getOuterHTML = H1;
function P8(e, u) {
  return (0, Xu.hasChildren)(e) ? e.children.map(function(t) {
    return H1(t, u);
  }).join("") : "";
}
Cu.getInnerHTML = P8;
function Qr(e) {
  return Array.isArray(e) ? e.map(Qr).join("") : (0, Xu.isTag)(e) ? e.name === "br" ? `
` : Qr(e.children) : (0, Xu.isCDATA)(e) ? Qr(e.children) : (0, Xu.isText)(e) ? e.data : "";
}
Cu.getText = Qr;
function Ii(e) {
  return Array.isArray(e) ? e.map(Ii).join("") : (0, Xu.hasChildren)(e) && !(0, Xu.isComment)(e) ? Ii(e.children) : (0, Xu.isText)(e) ? e.data : "";
}
Cu.textContent = Ii;
function Di(e) {
  return Array.isArray(e) ? e.map(Di).join("") : (0, Xu.hasChildren)(e) && (e.type === L8.ElementType.Tag || (0, Xu.isCDATA)(e)) ? Di(e.children) : (0, Xu.isText)(e) ? e.data : "";
}
Cu.innerText = Di;
var Ve = {};
Object.defineProperty(Ve, "__esModule", { value: !0 });
Ve.prevElementSibling = Ve.nextElementSibling = Ve.getName = Ve.hasAttrib = Ve.getAttributeValue = Ve.getSiblings = Ve.getParent = Ve.getChildren = void 0;
var wc = nt;
function F1(e) {
  return (0, wc.hasChildren)(e) ? e.children : [];
}
Ve.getChildren = F1;
function q1(e) {
  return e.parent || null;
}
Ve.getParent = q1;
function w8(e) {
  var u, t, r = q1(e);
  if (r != null)
    return F1(r);
  for (var a = [e], n = e.prev, i = e.next; n != null; )
    a.unshift(n), u = n, n = u.prev;
  for (; i != null; )
    a.push(i), t = i, i = t.next;
  return a;
}
Ve.getSiblings = w8;
function R8(e, u) {
  var t;
  return (t = e.attribs) === null || t === void 0 ? void 0 : t[u];
}
Ve.getAttributeValue = R8;
function M8(e, u) {
  return e.attribs != null && Object.prototype.hasOwnProperty.call(e.attribs, u) && e.attribs[u] != null;
}
Ve.hasAttrib = M8;
function k8(e) {
  return e.name;
}
Ve.getName = k8;
function B8(e) {
  for (var u, t = e.next; t !== null && !(0, wc.isTag)(t); )
    u = t, t = u.next;
  return t;
}
Ve.nextElementSibling = B8;
function U8(e) {
  for (var u, t = e.prev; t !== null && !(0, wc.isTag)(t); )
    u = t, t = u.prev;
  return t;
}
Ve.prevElementSibling = U8;
var fu = {};
Object.defineProperty(fu, "__esModule", { value: !0 });
fu.prepend = fu.prependChild = fu.append = fu.appendChild = fu.replaceElement = fu.removeElement = void 0;
function xr(e) {
  if (e.prev && (e.prev.next = e.next), e.next && (e.next.prev = e.prev), e.parent) {
    var u = e.parent.children, t = u.lastIndexOf(e);
    t >= 0 && u.splice(t, 1);
  }
  e.next = null, e.prev = null, e.parent = null;
}
fu.removeElement = xr;
function H8(e, u) {
  var t = u.prev = e.prev;
  t && (t.next = u);
  var r = u.next = e.next;
  r && (r.prev = u);
  var a = u.parent = e.parent;
  if (a) {
    var n = a.children;
    n[n.lastIndexOf(e)] = u, e.parent = null;
  }
}
fu.replaceElement = H8;
function F8(e, u) {
  if (xr(u), u.next = null, u.parent = e, e.children.push(u) > 1) {
    var t = e.children[e.children.length - 2];
    t.next = u, u.prev = t;
  } else
    u.prev = null;
}
fu.appendChild = F8;
function q8(e, u) {
  xr(u);
  var t = e.parent, r = e.next;
  if (u.next = r, u.prev = e, e.next = u, u.parent = t, r) {
    if (r.prev = u, t) {
      var a = t.children;
      a.splice(a.lastIndexOf(r), 0, u);
    }
  } else
    t && t.children.push(u);
}
fu.append = q8;
function G8(e, u) {
  if (xr(u), u.parent = e, u.prev = null, e.children.unshift(u) !== 1) {
    var t = e.children[1];
    t.prev = u, u.next = t;
  } else
    u.next = null;
}
fu.prependChild = G8;
function j8(e, u) {
  xr(u);
  var t = e.parent;
  if (t) {
    var r = t.children;
    r.splice(r.indexOf(e), 0, u);
  }
  e.prev && (e.prev.next = u), u.parent = t, u.prev = e.prev, u.next = e, e.prev = u;
}
fu.prepend = j8;
var uu = {};
Object.defineProperty(uu, "__esModule", { value: !0 });
uu.findAll = uu.existsOne = uu.findOne = uu.findOneChild = uu.find = uu.filter = void 0;
var ln = nt;
function $8(e, u, t, r) {
  return t === void 0 && (t = !0), r === void 0 && (r = 1 / 0), G1(e, Array.isArray(u) ? u : [u], t, r);
}
uu.filter = $8;
function G1(e, u, t, r) {
  for (var a = [], n = [u], i = [0]; ; ) {
    if (i[0] >= n[0].length) {
      if (i.length === 1)
        return a;
      n.shift(), i.shift();
      continue;
    }
    var s = n[0][i[0]++];
    if (e(s) && (a.push(s), --r <= 0))
      return a;
    t && (0, ln.hasChildren)(s) && s.children.length > 0 && (i.unshift(0), n.unshift(s.children));
  }
}
uu.find = G1;
function V8(e, u) {
  return u.find(e);
}
uu.findOneChild = V8;
function j1(e, u, t) {
  t === void 0 && (t = !0);
  for (var r = null, a = 0; a < u.length && !r; a++) {
    var n = u[a];
    if ((0, ln.isTag)(n))
      e(n) ? r = n : t && n.children.length > 0 && (r = j1(e, n.children, !0));
    else
      continue;
  }
  return r;
}
uu.findOne = j1;
function $1(e, u) {
  return u.some(function(t) {
    return (0, ln.isTag)(t) && (e(t) || $1(e, t.children));
  });
}
uu.existsOne = $1;
function Y8(e, u) {
  for (var t = [], r = [u], a = [0]; ; ) {
    if (a[0] >= r[0].length) {
      if (r.length === 1)
        return t;
      r.shift(), a.shift();
      continue;
    }
    var n = r[0][a[0]++];
    (0, ln.isTag)(n) && (e(n) && t.push(n), n.children.length > 0 && (a.unshift(0), r.unshift(n.children)));
  }
}
uu.findAll = Y8;
var Su = {};
Object.defineProperty(Su, "__esModule", { value: !0 });
Su.getElementsByTagType = Su.getElementsByTagName = Su.getElementById = Su.getElements = Su.testElement = void 0;
var St = nt, fn = uu, ya = {
  tag_name: function(e) {
    return typeof e == "function" ? function(u) {
      return (0, St.isTag)(u) && e(u.name);
    } : e === "*" ? St.isTag : function(u) {
      return (0, St.isTag)(u) && u.name === e;
    };
  },
  tag_type: function(e) {
    return typeof e == "function" ? function(u) {
      return e(u.type);
    } : function(u) {
      return u.type === e;
    };
  },
  tag_contains: function(e) {
    return typeof e == "function" ? function(u) {
      return (0, St.isText)(u) && e(u.data);
    } : function(u) {
      return (0, St.isText)(u) && u.data === e;
    };
  }
};
function V1(e, u) {
  return typeof u == "function" ? function(t) {
    return (0, St.isTag)(t) && u(t.attribs[e]);
  } : function(t) {
    return (0, St.isTag)(t) && t.attribs[e] === u;
  };
}
function W8(e, u) {
  return function(t) {
    return e(t) || u(t);
  };
}
function Y1(e) {
  var u = Object.keys(e).map(function(t) {
    var r = e[t];
    return Object.prototype.hasOwnProperty.call(ya, t) ? ya[t](r) : V1(t, r);
  });
  return u.length === 0 ? null : u.reduce(W8);
}
function X8(e, u) {
  var t = Y1(e);
  return t ? t(u) : !0;
}
Su.testElement = X8;
function z8(e, u, t, r) {
  r === void 0 && (r = 1 / 0);
  var a = Y1(e);
  return a ? (0, fn.filter)(a, u, t, r) : [];
}
Su.getElements = z8;
function Q8(e, u, t) {
  return t === void 0 && (t = !0), Array.isArray(u) || (u = [u]), (0, fn.findOne)(V1("id", e), u, t);
}
Su.getElementById = Q8;
function K8(e, u, t, r) {
  return t === void 0 && (t = !0), r === void 0 && (r = 1 / 0), (0, fn.filter)(ya.tag_name(e), u, t, r);
}
Su.getElementsByTagName = K8;
function J8(e, u, t, r) {
  return t === void 0 && (t = !0), r === void 0 && (r = 1 / 0), (0, fn.filter)(ya.tag_type(e), u, t, r);
}
Su.getElementsByTagType = J8;
var W1 = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.uniqueSort = e.compareDocumentPosition = e.DocumentPosition = e.removeSubsets = void 0;
  var u = nt;
  function t(i) {
    for (var s = i.length; --s >= 0; ) {
      var o = i[s];
      if (s > 0 && i.lastIndexOf(o, s - 1) >= 0) {
        i.splice(s, 1);
        continue;
      }
      for (var d = o.parent; d; d = d.parent)
        if (i.includes(d)) {
          i.splice(s, 1);
          break;
        }
    }
    return i;
  }
  e.removeSubsets = t;
  var r;
  (function(i) {
    i[i.DISCONNECTED = 1] = "DISCONNECTED", i[i.PRECEDING = 2] = "PRECEDING", i[i.FOLLOWING = 4] = "FOLLOWING", i[i.CONTAINS = 8] = "CONTAINS", i[i.CONTAINED_BY = 16] = "CONTAINED_BY";
  })(r = e.DocumentPosition || (e.DocumentPosition = {}));
  function a(i, s) {
    var o = [], d = [];
    if (i === s)
      return 0;
    for (var c = (0, u.hasChildren)(i) ? i : i.parent; c; )
      o.unshift(c), c = c.parent;
    for (c = (0, u.hasChildren)(s) ? s : s.parent; c; )
      d.unshift(c), c = c.parent;
    for (var E = Math.min(o.length, d.length), f = 0; f < E && o[f] === d[f]; )
      f++;
    if (f === 0)
      return r.DISCONNECTED;
    var m = o[f - 1], v = m.children, L = o[f], N = d[f];
    return v.indexOf(L) > v.indexOf(N) ? m === s ? r.FOLLOWING | r.CONTAINED_BY : r.FOLLOWING : m === i ? r.PRECEDING | r.CONTAINS : r.PRECEDING;
  }
  e.compareDocumentPosition = a;
  function n(i) {
    return i = i.filter(function(s, o, d) {
      return !d.includes(s, o + 1);
    }), i.sort(function(s, o) {
      var d = a(s, o);
      return d & r.PRECEDING ? -1 : d & r.FOLLOWING ? 1 : 0;
    }), i;
  }
  e.uniqueSort = n;
})(W1);
var bn = {};
Object.defineProperty(bn, "__esModule", { value: !0 });
bn.getFeed = void 0;
var Z8 = Cu, Nr = Su;
function eg(e) {
  var u = Aa(ng, e);
  return u ? u.name === "feed" ? ug(u) : tg(u) : null;
}
bn.getFeed = eg;
function ug(e) {
  var u, t = e.children, r = {
    type: "atom",
    items: (0, Nr.getElementsByTagName)("entry", t).map(function(i) {
      var s, o = i.children, d = { media: X1(o) };
      su(d, "id", "id", o), su(d, "title", "title", o);
      var c = (s = Aa("link", o)) === null || s === void 0 ? void 0 : s.attribs.href;
      c && (d.link = c);
      var E = pt("summary", o) || pt("content", o);
      E && (d.description = E);
      var f = pt("updated", o);
      return f && (d.pubDate = new Date(f)), d;
    })
  };
  su(r, "id", "id", t), su(r, "title", "title", t);
  var a = (u = Aa("link", t)) === null || u === void 0 ? void 0 : u.attribs.href;
  a && (r.link = a), su(r, "description", "subtitle", t);
  var n = pt("updated", t);
  return n && (r.updated = new Date(n)), su(r, "author", "email", t, !0), r;
}
function tg(e) {
  var u, t, r = (t = (u = Aa("channel", e.children)) === null || u === void 0 ? void 0 : u.children) !== null && t !== void 0 ? t : [], a = {
    type: e.name.substr(0, 3),
    id: "",
    items: (0, Nr.getElementsByTagName)("item", e.children).map(function(i) {
      var s = i.children, o = { media: X1(s) };
      su(o, "id", "guid", s), su(o, "title", "title", s), su(o, "link", "link", s), su(o, "description", "description", s);
      var d = pt("pubDate", s) || pt("dc:date", s);
      return d && (o.pubDate = new Date(d)), o;
    })
  };
  su(a, "title", "title", r), su(a, "link", "link", r), su(a, "description", "description", r);
  var n = pt("lastBuildDate", r);
  return n && (a.updated = new Date(n)), su(a, "author", "managingEditor", r, !0), a;
}
var rg = ["url", "type", "lang"], ag = [
  "fileSize",
  "bitrate",
  "framerate",
  "samplingrate",
  "channels",
  "duration",
  "height",
  "width"
];
function X1(e) {
  return (0, Nr.getElementsByTagName)("media:content", e).map(function(u) {
    for (var t = u.attribs, r = {
      medium: t.medium,
      isDefault: !!t.isDefault
    }, a = 0, n = rg; a < n.length; a++) {
      var i = n[a];
      t[i] && (r[i] = t[i]);
    }
    for (var s = 0, o = ag; s < o.length; s++) {
      var i = o[s];
      t[i] && (r[i] = parseInt(t[i], 10));
    }
    return t.expression && (r.expression = t.expression), r;
  });
}
function Aa(e, u) {
  return (0, Nr.getElementsByTagName)(e, u, !0, 1)[0];
}
function pt(e, u, t) {
  return t === void 0 && (t = !1), (0, Z8.textContent)((0, Nr.getElementsByTagName)(e, u, t, 1)).trim();
}
function su(e, u, t, r, a) {
  a === void 0 && (a = !1);
  var n = pt(t, r, a);
  n && (e[u] = n);
}
function ng(e) {
  return e === "rss" || e === "feed" || e === "rdf:RDF";
}
(function(e) {
  var u = C && C.__createBinding || (Object.create ? function(a, n, i, s) {
    s === void 0 && (s = i);
    var o = Object.getOwnPropertyDescriptor(n, i);
    (!o || ("get" in o ? !n.__esModule : o.writable || o.configurable)) && (o = { enumerable: !0, get: function() {
      return n[i];
    } }), Object.defineProperty(a, s, o);
  } : function(a, n, i, s) {
    s === void 0 && (s = i), a[s] = n[i];
  }), t = C && C.__exportStar || function(a, n) {
    for (var i in a)
      i !== "default" && !Object.prototype.hasOwnProperty.call(n, i) && u(n, a, i);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.hasChildren = e.isDocument = e.isComment = e.isText = e.isCDATA = e.isTag = void 0, t(Cu, e), t(Ve, e), t(fu, e), t(uu, e), t(Su, e), t(W1, e), t(bn, e);
  var r = nt;
  Object.defineProperty(e, "isTag", { enumerable: !0, get: function() {
    return r.isTag;
  } }), Object.defineProperty(e, "isCDATA", { enumerable: !0, get: function() {
    return r.isCDATA;
  } }), Object.defineProperty(e, "isText", { enumerable: !0, get: function() {
    return r.isText;
  } }), Object.defineProperty(e, "isComment", { enumerable: !0, get: function() {
    return r.isComment;
  } }), Object.defineProperty(e, "isDocument", { enumerable: !0, get: function() {
    return r.isDocument;
  } }), Object.defineProperty(e, "hasChildren", { enumerable: !0, get: function() {
    return r.hasChildren;
  } });
})(zr);
(function(e) {
  var u = C && C.__createBinding || (Object.create ? function(O, w, H, k) {
    k === void 0 && (k = H);
    var R = Object.getOwnPropertyDescriptor(w, H);
    (!R || ("get" in R ? !w.__esModule : R.writable || R.configurable)) && (R = { enumerable: !0, get: function() {
      return w[H];
    } }), Object.defineProperty(O, k, R);
  } : function(O, w, H, k) {
    k === void 0 && (k = H), O[k] = w[H];
  }), t = C && C.__setModuleDefault || (Object.create ? function(O, w) {
    Object.defineProperty(O, "default", { enumerable: !0, value: w });
  } : function(O, w) {
    O.default = w;
  }), r = C && C.__importStar || function(O) {
    if (O && O.__esModule)
      return O;
    var w = {};
    if (O != null)
      for (var H in O)
        H !== "default" && Object.prototype.hasOwnProperty.call(O, H) && u(w, O, H);
    return t(w, O), w;
  }, a = C && C.__importDefault || function(O) {
    return O && O.__esModule ? O : { default: O };
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.DomUtils = e.parseFeed = e.getFeed = e.ElementType = e.Tokenizer = e.createDomStream = e.parseDOM = e.parseDocument = e.DefaultHandler = e.DomHandler = e.Parser = void 0;
  var n = rr, i = rr;
  Object.defineProperty(e, "Parser", { enumerable: !0, get: function() {
    return i.Parser;
  } });
  var s = nt, o = nt;
  Object.defineProperty(e, "DomHandler", { enumerable: !0, get: function() {
    return o.DomHandler;
  } }), Object.defineProperty(e, "DefaultHandler", { enumerable: !0, get: function() {
    return o.DomHandler;
  } });
  function d(O, w) {
    var H = new s.DomHandler(void 0, w);
    return new n.Parser(H, w).end(O), H.root;
  }
  e.parseDocument = d;
  function c(O, w) {
    return d(O, w).children;
  }
  e.parseDOM = c;
  function E(O, w, H) {
    var k = new s.DomHandler(O, w, H);
    return new n.Parser(k, w);
  }
  e.createDomStream = E;
  var f = Dc;
  Object.defineProperty(e, "Tokenizer", { enumerable: !0, get: function() {
    return a(f).default;
  } }), e.ElementType = r(Be);
  var m = zr, v = zr;
  Object.defineProperty(e, "getFeed", { enumerable: !0, get: function() {
    return v.getFeed;
  } });
  var L = { xmlMode: !0 };
  function N(O, w) {
    return w === void 0 && (w = L), (0, m.getFeed)(c(O, w));
  }
  e.parseFeed = N, e.DomUtils = r(zr);
})(A1);
(function(e) {
  var u = C && C.__createBinding || (Object.create ? function(v, L, N, O) {
    O === void 0 && (O = N);
    var w = Object.getOwnPropertyDescriptor(L, N);
    (!w || ("get" in w ? !L.__esModule : w.writable || w.configurable)) && (w = { enumerable: !0, get: function() {
      return L[N];
    } }), Object.defineProperty(v, O, w);
  } : function(v, L, N, O) {
    O === void 0 && (O = N), v[O] = L[N];
  }), t = C && C.__setModuleDefault || (Object.create ? function(v, L) {
    Object.defineProperty(v, "default", { enumerable: !0, value: L });
  } : function(v, L) {
    v.default = L;
  }), r = C && C.__exportStar || function(v, L) {
    for (var N in v)
      N !== "default" && !Object.prototype.hasOwnProperty.call(L, N) && u(L, v, N);
  }, a = C && C.__importStar || function(v) {
    if (v && v.__esModule)
      return v;
    var L = {};
    if (v != null)
      for (var N in v)
        N !== "default" && Object.prototype.hasOwnProperty.call(v, N) && u(L, v, N);
    return t(L, v), L;
  }, n = C && C.__importDefault || function(v) {
    return v && v.__esModule ? v : { default: v };
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.root = e.parseHTML = e.merge = e.contains = e.text = e.xml = e.html = e.load = void 0, r(Do, e);
  var i = va, s = Mt, o = y0, d = n(C0), c = A1, E = (0, s.getParse)(function(v, L, N, O) {
    return L.xmlMode || L._useHtmlParser2 ? (0, c.parseDocument)(v, L) : (0, o.parseWithParse5)(v, L, N, O);
  });
  e.load = (0, i.getLoad)(E, function(v, L) {
    return L.xmlMode || L._useHtmlParser2 ? (0, d.default)(v, L) : (0, o.renderWithParse5)(v);
  }), e.default = (0, e.load)([]);
  var f = Le;
  Object.defineProperty(e, "html", { enumerable: !0, get: function() {
    return f.html;
  } }), Object.defineProperty(e, "xml", { enumerable: !0, get: function() {
    return f.xml;
  } }), Object.defineProperty(e, "text", { enumerable: !0, get: function() {
    return f.text;
  } });
  var m = a(Le);
  e.contains = m.contains, e.merge = m.merge, e.parseHTML = m.parseHTML, e.root = m.root;
})(Io);
var Mn = {}, z1 = { exports: {} }, Q1 = { exports: {} };
(function(e, u) {
  e.exports = t;
  function t(a) {
    return r.bind(null, a);
  }
  function r(a) {
    var n = [].slice.call(arguments, 1);
    n.unshift("[" + a + "]"), ji.stderr.write(n.join(" ") + `
`);
  }
})(Q1);
var Rc = Q1.exports;
(function(e, u) {
  Rc("lex"), e.exports = t;
  function t(r) {
    var a = "", n, i = 0, s = -1, o = 0, d = 1, c = "before-selector", E = [c], f = {}, m = [], v = [
      "media",
      "keyframes",
      { name: "-webkit-keyframes", type: "keyframes", prefix: "-webkit-" },
      { name: "-moz-keyframes", type: "keyframes", prefix: "-moz-" },
      { name: "-ms-keyframes", type: "keyframes", prefix: "-ms-" },
      { name: "-o-keyframes", type: "keyframes", prefix: "-o-" },
      "font-face",
      { name: "import", state: "before-at-value" },
      { name: "charset", state: "before-at-value" },
      "supports",
      "viewport",
      { name: "namespace", state: "before-at-value" },
      "document",
      { name: "-moz-document", type: "document", prefix: "-moz-" },
      "page"
    ];
    function L() {
      return Z(), r[s];
    }
    function N(M) {
      return M ? E[E.length - 1 - M] : c;
    }
    function O(M) {
      var $ = s + 1;
      return M === r.slice($, $ + M.length);
    }
    function w(M) {
      var $ = r.slice(s).indexOf(M);
      return $ > 0 ? $ : !1;
    }
    function H(M) {
      return M === k(1);
    }
    function k(M) {
      return r[s + (M || 1)];
    }
    function R() {
      var M = E.pop();
      return c = E[E.length - 1], M;
    }
    function G(M) {
      return c = M, E.push(c), E.length;
    }
    function X(M) {
      var $ = c;
      return E[E.length - 1] = c = M, $;
    }
    function Z(M) {
      if ((M || 1) == 1)
        r[s] == `
` ? (d++, i = 1) : i++, s++;
      else {
        var $ = r.slice(s, s + M).split(`
`);
        $.length > 1 && (d += $.length - 1, i = 1), i += $[$.length - 1].length, s = s + M;
      }
    }
    function re() {
      f.end = {
        line: d,
        col: i
      }, m.push(f), a = "", f = {};
    }
    function Y(M) {
      f = {
        type: M,
        start: {
          line: d,
          col: i
        }
      };
    }
    for (; n = L(); )
      switch (n) {
        case " ":
          switch (N()) {
            case "selector":
            case "value":
            case "value-paren":
            case "at-group":
            case "at-value":
            case "comment":
            case "double-string":
            case "single-string":
              a += n;
              break;
          }
          break;
        case `
`:
        case "	":
        case "\r":
        case "\f":
          switch (N()) {
            case "value":
            case "value-paren":
            case "at-group":
            case "comment":
            case "single-string":
            case "double-string":
            case "selector":
              a += n;
              break;
            case "at-value":
              n === `
` && (f.value = a.trim(), re(), R());
              break;
          }
          break;
        case ":":
          switch (N()) {
            case "name":
              f.name = a.trim(), a = "", X("before-value");
              break;
            case "before-selector":
              a += n, Y("selector"), G("selector");
              break;
            case "before-value":
              X("value"), a += n;
              break;
            default:
              a += n;
              break;
          }
          break;
        case ";":
          switch (N()) {
            case "name":
            case "before-value":
            case "value":
              a.trim().length > 0 && (f.value = a.trim(), re()), X("before-name");
              break;
            case "value-paren":
              a += n;
              break;
            case "at-value":
              f.value = a.trim(), re(), R();
              break;
            case "before-name":
              break;
            default:
              a += n;
              break;
          }
          break;
        case "{":
          switch (N()) {
            case "selector":
              if (k(-1) === "\\") {
                a += n;
                break;
              }
              f.text = a.trim(), re(), X("before-name"), o = o + 1;
              break;
            case "at-group":
              switch (f.name = a.trim(), f.type) {
                case "font-face":
                case "viewport":
                case "page":
                  G("before-name");
                  break;
                default:
                  G("before-selector");
              }
              re(), o = o + 1;
              break;
            case "name":
            case "at-rule":
              f.name = a.trim(), re(), G("before-name"), o = o + 1;
              break;
            case "comment":
            case "double-string":
            case "single-string":
              a += n;
              break;
            case "before-value":
              X("value"), a += n;
              break;
          }
          break;
        case "}":
          switch (N()) {
            case "before-name":
            case "name":
            case "before-value":
            case "value":
              a && (f.value = a.trim()), f.name && f.value && re(), Y("end"), re(), R(), N() === "at-group" && (Y("at-group-end"), re(), R()), o > 0 && (o = o - 1);
              break;
            case "at-group":
            case "before-selector":
            case "selector":
              if (k(-1) === "\\") {
                a += n;
                break;
              }
              o > 0 && N(1) === "at-group" && (Y("at-group-end"), re()), o > 1 && R(), o > 0 && (o = o - 1);
              break;
            case "double-string":
            case "single-string":
            case "comment":
              a += n;
              break;
          }
          break;
        case '"':
        case "'":
          switch (N()) {
            case "double-string":
              n === '"' && k(-1) !== "\\" && R();
              break;
            case "single-string":
              n === "'" && k(-1) !== "\\" && R();
              break;
            case "before-at-value":
              X("at-value"), G(n === '"' ? "double-string" : "single-string");
              break;
            case "before-value":
              X("value"), G(n === '"' ? "double-string" : "single-string");
              break;
            case "comment":
              break;
            default:
              k(-1) !== "\\" && G(n === '"' ? "double-string" : "single-string");
          }
          a += n;
          break;
        case "/":
          switch (N()) {
            case "comment":
            case "double-string":
            case "single-string":
              a += n;
              break;
            case "before-value":
            case "selector":
            case "name":
            case "value":
              if (H("*")) {
                var l = w("*/");
                l && Z(l + 1);
              } else
                N() == "before-value" && X("value"), a += n;
              break;
            default:
              H("*") ? (Y("comment"), G("comment"), Z()) : a += n;
              break;
          }
          break;
        case "*":
          switch (N()) {
            case "comment":
              H("/") ? (f.text = a, Z(), re(), R()) : a += n;
              break;
            case "before-selector":
              a += n, Y("selector"), G("selector");
              break;
            case "before-value":
              X("value"), a += n;
              break;
            default:
              a += n;
          }
          break;
        case "@":
          switch (N()) {
            case "comment":
            case "double-string":
            case "single-string":
              a += n;
              break;
            case "before-value":
              X("value"), a += n;
              break;
            default:
              for (var g = !1, T, A, D = 0, B = v.length; !g && D < B; ++D)
                A = v[D], T = A.name || A, O(T) && (g = !0, Y(T), G(A.state || "at-group"), Z(T.length), A.prefix && (f.prefix = A.prefix), A.type && (f.type = A.type));
              g || (a += n);
              break;
          }
          break;
        case "(":
          switch (N()) {
            case "value":
              G("value-paren");
              break;
            case "before-value":
              X("value");
              break;
          }
          a += n;
          break;
        case ")":
          switch (N()) {
            case "value-paren":
              R();
              break;
            case "before-value":
              X("value");
              break;
          }
          a += n;
          break;
        default:
          switch (N()) {
            case "before-selector":
              Y("selector"), G("selector");
              break;
            case "before-name":
              Y("property"), X("name");
              break;
            case "before-value":
              X("value");
              break;
            case "before-at-value":
              X("at-value");
              break;
          }
          a += n;
          break;
      }
    return m;
  }
})(z1);
var K1 = z1.exports, J1 = { exports: {} };
(function(e, u) {
  Rc("parse");
  var t = K1;
  e.exports = s;
  var r, a, n, i;
  function s(R, G) {
    G || (G = {}), r = !!G.comments, n = !!G.position, a = 0, i = Array.isArray(R) ? R.slice() : t(R);
    for (var X, Z = [], re; re = d(); )
      X = O(re), X && Z.push(X);
    return {
      type: "stylesheet",
      stylesheet: {
        rules: Z
      }
    };
  }
  function o(R, G) {
    G || (G = {});
    for (var X, Z = ["type", "name", "value"], re = {}, Y = 0; Y < Z.length; ++Y)
      X = Z[Y], R[X] && (re[X] = G[X] || R[X]);
    for (Z = Object.keys(G), Y = 0; Y < Z.length; ++Y)
      X = Z[Y], re[X] || (re[X] = G[X]);
    return n && (re.position = {
      start: R.start,
      end: R.end
    }), re;
  }
  function d() {
    var R = i.shift();
    return R;
  }
  function c(R) {
    a = a + 1;
    var G = {};
    switch (R.type) {
      case "font-face":
      case "viewport":
        G.declarations = H();
        break;
      case "page":
        G.prefix = R.prefix, G.declarations = H();
        break;
      default:
        G.prefix = R.prefix, G.rules = k();
    }
    return o(R, G);
  }
  function E(R) {
    return o(R);
  }
  function f(R) {
    return o(R);
  }
  function m(R) {
    return o(R, { text: R.text });
  }
  function v(R) {
    return o(R);
  }
  function L(R) {
    return o(R);
  }
  function N(R) {
    function G(X) {
      return X.trim();
    }
    return o(R, {
      type: "rule",
      selectors: R.text.split(",").map(G),
      declarations: H()
    });
  }
  function O(R) {
    switch (R.type) {
      case "property":
        return L(R);
      case "selector":
        return N(R);
      case "at-group-end":
        a = a - 1;
        return;
      case "media":
      case "keyframes":
        return c(R);
      case "comment":
        if (r)
          return m(R);
        break;
      case "charset":
        return f(R);
      case "import":
        return E(R);
      case "namespace":
        return v(R);
      case "font-face":
      case "supports":
      case "viewport":
      case "document":
      case "page":
        return c(R);
    }
  }
  function w(R) {
    for (var G, X = [], Z; (Z = d()) && R && R(Z); )
      G = O(Z), G && X.push(G);
    return Z && Z.type !== "end" && i.unshift(Z), X;
  }
  function H() {
    return w(function(R) {
      return R.type === "property" || R.type === "comment";
    });
  }
  function k() {
    return w(function() {
      return a;
    });
  }
})(J1);
var ig = J1.exports, Z1 = { exports: {} };
(function(e, u) {
  Rc("stringify");
  var t, r, a, n, i, s;
  e.exports = o;
  function o(k, R) {
    R || (R = {}), a = R.indentation || "", r = !!R.compress, t = !!R.comments, n = 1, r ? i = s = "" : (i = `
`, s = " ");
    var G = v(k.stylesheet.rules, w).join(`
`).trim();
    return G;
  }
  function d(k) {
    if (k) {
      n += k;
      return;
    }
    return r ? "" : Array(n).join(a || "");
  }
  function c(k) {
    return "@" + k.type + " " + k.value + ";" + i;
  }
  function E(k) {
    var R = "", G = k.prefix || "";
    k.name && (R = " " + k.name);
    var X = k.type !== "page";
    return "@" + G + k.type + R + s + L(k, X) + i;
  }
  function f(k) {
    return t ? "/*" + (k.text || "") + "*/" + i : "";
  }
  function m(k) {
    var R;
    return k.selectors ? R = k.selectors.join("," + i) : (R = "@" + k.type, R += k.name ? " " + k.name : ""), d() + R + s + L(k) + i;
  }
  function v(k, R) {
    return k.reduce(function(G, X) {
      var Z = X.type === "comment" ? f(X) : R(X);
      return Z && G.push(Z), G;
    }, []);
  }
  function L(k, R) {
    var G = k.declarations, X = O;
    return k.rules && (G = k.rules, X = m), G = N(G, X), G && (G = i + G + (R ? "" : i)), "{" + G + d() + "}";
  }
  function N(k, R) {
    if (!k)
      return "";
    d(1);
    var G = v(k, R);
    return d(-1), G.length ? G.join(i) : "";
  }
  function O(k) {
    if (k.type === "property")
      return H(k);
  }
  function w(k) {
    switch (k.type) {
      case "rule":
        return m(k);
      case "media":
      case "keyframes":
        return E(k);
      case "comment":
        return f(k);
      case "import":
      case "charset":
      case "namespace":
        return c(k);
      case "font-face":
      case "supports":
      case "viewport":
      case "document":
      case "page":
        return E(k);
    }
  }
  function H(k) {
    var R = k.name ? k.name + ":" + s : "";
    return d() + R + k.value + ";";
  }
})(Z1);
var cg = Z1.exports, sg = {
  lex: K1,
  parse: ig,
  stringify: cg
}, ef = { exports: {} }, og = /([-.*+?^${}()|[\]\/\\])/g, dg = /\\/g, Nt = function(e) {
  return (e + "").replace(og, "\\$1");
}, xt = function(e) {
  return (e + "").replace(dg, "");
}, lg = RegExp(
  /*
  #!/usr/bin/env ruby
  puts "\t\t" + DATA.read.gsub(/\(\?x\)|\s+#.*$|\s+|\\$|\\n/,'')
  __END__
      "(?x)^(?:\
        \\s* ( , ) \\s*               # Separator          \n\
      | \\s* ( <combinator>+ ) \\s*   # Combinator         \n\
      |      ( \\s+ )                 # CombinatorChildren \n\
      |      ( <unicode>+ | \\* )     # Tag                \n\
      | \\#  ( <unicode>+       )     # ID                 \n\
      | \\.  ( <unicode>+       )     # ClassName          \n\
      |                               # Attribute          \n\
      \\[  \
          \\s* (<unicode1>+)  (?:  \
              \\s* ([*^$!~|]?=)  (?:  \
                  \\s* (?:\
                      ([\"']?)(.*?)\\9 \
                  )\
              )  \
          )?  \\s*  \
      \\](?!\\]) \n\
      |   :+ ( <unicode>+ )(?:\
      \\( (?:\
          (?:([\"'])([^\\12]*)\\12)|((?:\\([^)]+\\)|[^()]*)+)\
      ) \\)\
      )?\
      )"
  */
  `^(?:\\s*(,)\\s*|\\s*(<combinator>+)\\s*|(\\s+)|(<unicode>+|\\*)|\\#(<unicode>+)|\\.(<unicode>+)|\\[\\s*(<unicode1>+)(?:\\s*([*^$!~|]?=)(?:\\s*(?:(["']?)(.*?)\\9)))?\\s*\\](?!\\])|(:+)(<unicode>+)(?:\\((?:(?:(["'])([^\\13]*)\\13)|((?:\\([^)]+\\)|[^()]*)+))\\))?)`.replace(/<combinator>/, "[" + Nt(">+~`!@$%^&={}\\;</") + "]").replace(/<unicode>/g, "(?:[\\w\\u00a1-\\uFFFF-]|\\\\[^\\s0-9a-f])").replace(/<unicode1>/g, "(?:[:\\w\\u00a1-\\uFFFF-]|\\\\[^\\s0-9a-f])")
), uf = function(u) {
  this.combinator = u || " ", this.tag = "*";
};
uf.prototype.toString = function() {
  if (!this.raw) {
    var e = "", u, t;
    if (e += this.tag || "*", this.id && (e += "#" + this.id), this.classes && (e += "." + this.classList.join(".")), this.attributes)
      for (u = 0; t = this.attributes[u++]; )
        e += "[" + t.name + (t.operator ? t.operator + '"' + t.value + '"' : "") + "]";
    if (this.pseudos)
      for (u = 0; t = this.pseudos[u++]; )
        e += ":" + t.name, t.value && (e += "(" + t.value + ")");
    this.raw = e;
  }
  return this.raw;
};
var tf = function() {
  this.length = 0;
};
tf.prototype.toString = function() {
  if (!this.raw) {
    for (var e = "", u = 0, t; t = this[u++]; )
      u !== 1 && (e += " "), t.combinator !== " " && (e += t.combinator + " "), e += t;
    this.raw = e;
  }
  return this.raw;
};
var fg = function(e, u, t, r, a, n, i, s, o, d, c, E, f, m, v, L) {
  var N, O;
  if ((u || !this.length) && (N = this[this.length++] = new tf(), u))
    return "";
  if (N || (N = this[this.length - 1]), (t || r || !N.length) && (O = N[N.length++] = new uf(t)), O || (O = N[N.length - 1]), a)
    O.tag = xt(a);
  else if (n)
    O.id = xt(n);
  else if (i) {
    var w = xt(i), H = O.classes || (O.classes = {});
    if (!H[w]) {
      H[w] = Nt(i);
      var k = O.classList || (O.classList = []);
      k.push(w), k.sort();
    }
  } else
    f ? (L = L || v, (O.pseudos || (O.pseudos = [])).push({
      type: E.length == 1 ? "class" : "element",
      name: xt(f),
      escapedName: Nt(f),
      value: L ? xt(L) : null,
      escapedValue: L ? Nt(L) : null
    })) : s && (c = c ? Nt(c) : null, (O.attributes || (O.attributes = [])).push({
      operator: o,
      name: xt(s),
      escapedName: Nt(s),
      value: c ? xt(c) : null,
      escapedValue: c ? Nt(c) : null
    }));
  return "";
}, rf = function(u) {
  this.length = 0;
  for (var t = this, r = u, a; u; ) {
    if (a = u.replace(lg, function() {
      return fg.apply(t, arguments);
    }), a === u)
      throw new Error(r + " is an invalid expression");
    u = a;
  }
};
rf.prototype.toString = function() {
  if (!this.raw) {
    for (var e = [], u = 0, t; t = this[u++]; )
      e.push(t);
    this.raw = e.join(", ");
  }
  return this.raw;
};
var Ps = {}, bg = function(e) {
  return e == null ? null : (e = ("" + e).replace(/^\s+|\s+$/g, ""), Ps[e] || (Ps[e] = new rf(e)));
}, hg = bg;
(function(e, u) {
  var t = hg;
  e.exports = r;
  function r(n, i) {
    this.text = n, this.spec = void 0, this.styleAttribute = i || !1;
  }
  r.prototype.parsed = function() {
    return this.tokens || (this.tokens = a(this.text)), this.tokens;
  }, r.prototype.specificity = function() {
    var n = this.styleAttribute;
    return this.spec || (this.spec = i(this.text, this.parsed())), this.spec;
    function i(s, o) {
      for (var d = o || a(s), c = [n ? 1 : 0, 0, 0, 0], E = [], f = 0; f < d.length; f++) {
        var m = d[f], v = m.pseudos;
        if (m.id && c[1]++, m.attributes && (c[2] += m.attributes.length), m.classList && (c[2] += m.classList.length), m.tag && m.tag !== "*" && c[3]++, v) {
          c[3] += v.length;
          for (var L = 0; L < v.length; L++)
            v[L].name === "not" && (E.push(v[L].value), c[3]--);
        }
      }
      for (var N = E.length; N--; )
        for (var O = i(E[N]), w = 4; w--; )
          c[w] += O[w];
      return c;
    }
  };
  function a(n) {
    try {
      return t(n)[0];
    } catch {
      return [];
    }
  }
})(ef);
var pg = ef.exports, kn = { exports: {} }, ws;
function mg() {
  return ws || (ws = 1, function(e, u) {
    e.exports = r;
    var t = Mc();
    function r(a, n, i, s, o) {
      this.prop = a, this.value = n, this.selector = i, this.priority = s || 0, this.additionalPriority = o || [];
    }
    r.prototype.compareFunc = function(a) {
      var n = [];
      n.push.apply(n, this.selector.specificity()), n.push.apply(n, this.additionalPriority), n[0] += this.priority;
      var i = [];
      return i.push.apply(i, a.selector.specificity()), i.push.apply(i, a.additionalPriority), i[0] += a.priority, t.compareFunc(n, i);
    }, r.prototype.compare = function(a) {
      var n = this.compareFunc(a);
      return n === 1 ? this : a;
    }, r.prototype.toString = function() {
      return this.prop + ": " + this.value.replace(/['"]+/g, "") + ";";
    };
  }(kn)), kn.exports;
}
var Rs;
function Mc() {
  return Rs || (Rs = 1, function(e) {
    var u = sg, t = pg, r = mg();
    e.Selector = t, e.Property = r;
    /**
     * Returns an array of the selectors.
     *
     * @license Sizzle CSS Selector Engine - MIT
     * @param {String} selectorText from mensch
     * @api public
     */
    e.extract = function(n) {
      for (var i = 0, s = [], o = "", d = 0, c = n.length; d < c; d++) {
        var E = n.charAt(d);
        i ? ((E === "]" || E === ")") && i--, o += E) : E === "," ? (s.push(o), o = "") : ((E === "[" || E === "(") && i++, (o.length || E !== "," && E !== `
` && E !== " ") && (o += E));
      }
      return o.length && s.push(o), s;
    }, e.parseCSS = function(a) {
      for (var n = u.parse(a, { position: !0, comments: !0 }), i = typeof n.stylesheet < "u" && n.stylesheet.rules ? n.stylesheet.rules : [], s = [], o = 0, d = i.length; o < d; o++)
        if (i[o].type == "rule")
          for (var c = i[o], E = c.selectors, f = 0, m = E.length; f < m; f++)
            s.push([E[f], c.declarations]);
      return s;
    }, e.getPreservedText = function(a, n, i) {
      for (var s = u.parse(a, { position: !0, comments: !0 }), o = typeof s.stylesheet < "u" && s.stylesheet.rules ? s.stylesheet.rules : [], d = [], c = o.length - 1; c >= 0; c--)
        (n.fontFaces && o[c].type === "font-face" || n.mediaQueries && o[c].type === "media" || n.keyFrames && o[c].type === "keyframes" || n.pseudos && o[c].selectors && this.matchesPseudo(o[c].selectors[0], i)) && d.unshift(
          u.stringify(
            { stylesheet: { rules: [o[c]] } },
            { comments: !1, indentation: "  " }
          )
        ), o[c].position.start;
      return d.length === 0 ? !1 : `
` + d.join(`
`) + `
`;
    }, e.normalizeLineEndings = function(a) {
      return a.replace(/\r\n/g, `
`).replace(/\n/g, `\r
`);
    }, e.matchesPseudo = function(a, n) {
      return n.find(function(i) {
        return a.indexOf(i) > -1;
      });
    }, e.compareFunc = function(a, n) {
      for (var i = Math.min(a.length, n.length), s = 0; s < i; s++)
        if (a[s] !== n[s])
          return a[s] > n[s] ? 1 : -1;
      return a.length - n.length;
    }, e.compare = function(a, n) {
      return e.compareFunc(a, n) == 1 ? a : n;
    }, e.getDefaultOptions = function(a) {
      var n = Object.assign({
        extraCss: "",
        insertPreservedExtraCss: !0,
        applyStyleTags: !0,
        removeStyleTags: !0,
        preserveMediaQueries: !0,
        preserveFontFaces: !0,
        preserveKeyFrames: !0,
        preservePseudos: !0,
        applyWidthAttributes: !0,
        applyHeightAttributes: !0,
        applyAttributesTableElements: !0,
        resolveCSSVariables: !0,
        url: ""
      }, a);
      return n.webResources = n.webResources || {}, n;
    };
  }(Mn)), Mn;
}
(function(e) {
  var u = Io;
  Mc();
  var t = function(a, n, i) {
    return n = Object.assign({ decodeEntities: !1, _useHtmlParser2: !0 }, n), a = i(a), u.load(a, n);
  }, r = function() {
    var a = [], n = function(s) {
      var o = e.exports.codeBlocks;
      return Object.keys(o).forEach(function(d) {
        var c = new RegExp(o[d].start + "([\\S\\s]*?)" + o[d].end, "g");
        s = s.replace(c, function(E, f) {
          return a.push(E), "JUICE_CODE_BLOCK_" + (a.length - 1) + "_";
        });
      }), s;
    }, i = function(s) {
      for (var o = 0; o < a.length; o++) {
        var d = new RegExp("JUICE_CODE_BLOCK_" + o + '_(="")?', "gi");
        s = s.replace(d, function() {
          return a[o];
        });
      }
      return s;
    };
    return {
      encodeEntities: n,
      decodeEntities: i
    };
  };
  e.exports = function(a, n, i, s) {
    var o = r(), d = t(a, n, o.encodeEntities), c = [d];
    c.push.apply(c, s);
    var E = i.apply(void 0, c) || d;
    return n && n.xmlMode ? o.decodeEntities(E.xml()) : o.decodeEntities(E.html());
  }, e.exports.codeBlocks = {
    EJS: { start: "<%", end: "%>" },
    HBS: { start: "{{", end: "}}" }
  };
})(No);
var gg = No.exports, kc = {};
kc.romanize = function(e) {
  if (isNaN(e))
    return NaN;
  for (var u = String(+e).split(""), t = [
    "",
    "C",
    "CC",
    "CCC",
    "CD",
    "D",
    "DC",
    "DCC",
    "DCCC",
    "CM",
    "",
    "X",
    "XX",
    "XXX",
    "XL",
    "L",
    "LX",
    "LXX",
    "LXXX",
    "XC",
    "",
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX"
  ], r = "", a = 3; a--; )
    r = (t[+u.pop() + a * 10] || "") + r;
  return Array(+u.join("") + 1).join("M") + r;
};
kc.alphanumeric = function(e) {
  for (var u = "", t; e > 0; )
    t = (e - 1) % 26, u = String.fromCharCode(65 + t) + u, e = (e - t) / 26 | 0;
  return u || void 0;
};
const Eg = (e) => {
  let u = "";
  do
    u = (Math.random() + 1).toString(36).substring(2);
  while (e.indexOf(u) !== -1);
  return u;
}, Tg = (e, u) => {
  let t = /([a-z\-]+)\s*\(\s*([^\(\)]*?)\s*(?:,\s*([^\(\)]*?)\s*)?\s*\)/i, r = [], a, n = Eg(u);
  for (; (a = t.exec(u)) !== null; ) {
    let s = `${r.length}`;
    if (a[1].toLowerCase() == "var") {
      const d = af(e, a[2]);
      if (d) {
        u = u.replace(a[0], d);
        continue;
      }
      if (a[3]) {
        u = u.replace(a[0], a[3]);
        continue;
      }
    }
    let o = `${n}${s.padStart(5, "-")}`;
    u = u.replace(a[0], o), r.push({ placeholder: o, replace: a[0] });
  }
  for (var i = r.length - 1; i >= 0; i--) {
    const s = r[i];
    u = u.replace(s.placeholder, s.replace);
  }
  return u;
}, af = (e, u) => {
  for (; e; ) {
    if (e.styleProps && u in e.styleProps)
      return e.styleProps[u].value;
    var e = e.pseudoElementParent || e.parent;
  }
};
var _g = { replaceVariables: Tg, findVariableValue: af }, ot = Mc(), Hr = kc, Ms = _g, yg = function(u) {
  u.ignoredPseudos = ["hover", "active", "focus", "visited", "link"], u.widthElements = ["TABLE", "TD", "TH", "IMG"], u.heightElements = ["TABLE", "TD", "TH", "IMG"], u.tableElements = ["TABLE", "TH", "TR", "TD", "CAPTION", "COLGROUP", "COL", "THEAD", "TBODY", "TFOOT"], u.nonVisualElements = ["HEAD", "TITLE", "BASE", "LINK", "STYLE", "META", "SCRIPT", "NOSCRIPT"], u.styleToAttribute = {
    "background-color": "bgcolor",
    "background-image": "background",
    "text-align": "align",
    "vertical-align": "valign"
  }, u.excludedProperties = [], u.juiceDocument = d, u.inlineDocument = t;
  function t(f, m, v) {
    v = v || {};
    var L = ot.parseCSS(m), N = [], O = "style", w = {};
    if (v.styleAttributeName && (O = v.styleAttributeName), L.forEach(R), N.forEach(G), v.inlinePseudoElements && N.forEach(X), v.applyWidthAttributes && N.forEach(function(l) {
      Z(l, "width");
    }), v.applyHeightAttributes && N.forEach(function(l) {
      Z(l, "height");
    }), v.applyAttributesTableElements && N.forEach(Y), v.insertPreservedExtraCss && v.extraCss) {
      var H = ot.getPreservedText(v.extraCss, {
        mediaQueries: v.preserveMediaQueries,
        fontFaces: v.preserveFontFaces,
        keyFrames: v.preserveKeyFrames
      });
      if (H) {
        var k = null;
        v.insertPreservedExtraCss !== !0 ? k = f(v.insertPreservedExtraCss) : (k = f("head"), k.length || (k = f("body")), k.length || (k = f.root())), k.first().append("<style>" + H + "</style>");
      }
    }
    function R(l) {
      var g = l[0], T = l[1], A = new ot.Selector(g), D = A.parsed();
      if (D) {
        for (var B = i(D), M = 0; M < D.length; ++M) {
          var $ = D[M];
          if ($.pseudos)
            for (var J = 0; J < $.pseudos.length; ++J) {
              var z = $.pseudos[J];
              if (u.ignoredPseudos.indexOf(z.name) >= 0)
                return;
            }
        }
        if (B) {
          var be = D[D.length - 1], ge = be.pseudos;
          be.pseudos = o(be.pseudos), g = D.toString(), be.pseudos = ge;
        }
        var Ue;
        try {
          Ue = f(g);
        } catch {
          return;
        }
        Ue.each(function() {
          var ee = this;
          if (ee.name && u.nonVisualElements.indexOf(ee.name.toUpperCase()) >= 0)
            return;
          if (ee.counterProps || (ee.counterProps = ee.parent && ee.parent.counterProps ? Object.create(ee.parent.counterProps) : {}), B) {
            var _e = "pseudo" + B, Ye = ee[_e];
            Ye || (Ye = ee[_e] = f("<span />").get(0), Ye.pseudoElementType = B, Ye.pseudoElementParent = ee, Ye.counterProps = ee.counterProps, ee[_e] = Ye), ee = Ye;
          }
          if (!ee.styleProps) {
            if (ee.styleProps = {}, f(ee).attr(O)) {
              var Yt = "* { " + f(ee).attr(O) + " } ";
              ye(ot.parseCSS(Yt)[0][1], new ot.Selector("<style>", !0));
            }
            N.push(ee);
          }
          function we(Ne, Lu) {
            for (var Ie = Lu.split(/\s+/), We = 0; We < Ie.length; We++) {
              var Se = Ie[We], Oe = parseInt(Ie[We + 1], 10);
              isNaN(Oe) ? Ne.counterProps[Se] = w[Se] = 0 : Ne.counterProps[Se] = w[Ie[We++]] = Oe;
            }
          }
          function Wt(Ne, Lu) {
            for (var Ie = Lu.split(/\s+/), We = 0; We < Ie.length; We++) {
              var Se = Ie[We];
              if (Ne.counterProps[Se] !== void 0) {
                var Oe = parseInt(Ie[We + 1], 10);
                isNaN(Oe) ? Ne.counterProps[Se] = w[Se] += 1 : Ne.counterProps[Se] = w[Ie[We++]] += Oe;
              }
            }
          }
          function ye(Ne, Lu) {
            for (var Ie = 0, We = Ne.length; Ie < We; Ie++)
              if (Ne[Ie].type == "property") {
                var Se = Ne[Ie].name, Oe = Ne[Ie].value;
                Se === "counter-reset" && we(ee, Oe), Se === "counter-increment" && Wt(ee, Oe);
                var ru = Oe.match(/!important$/) !== null;
                ru && !v.preserveImportant && (Oe = r(Oe));
                var Xt = [Ne[Ie].position.start.line, Ne[Ie].position.start.col], Ru = new ot.Property(Se, Oe, Lu, ru ? 2 : 0, Xt), V = ee.styleProps[Se];
                u.excludedProperties.indexOf(Se) < 0 && (V && V.compare(Ru) === Ru || !V) && (V && V.selector !== Lu ? delete ee.styleProps[Se] : V && (Ru.nextProp = V), ee.styleProps[Se] = Ru);
              }
          }
          ye(T, A);
        });
      }
    }
    function G(l) {
      Object.keys(l.styleProps).length;
      var g = [];
      Object.keys(l.styleProps).forEach(function(A) {
        for (var D = l.styleProps[A]; typeof D < "u"; )
          g.push(D), D = D.nextProp;
      }), g.sort(function(A, D) {
        return A.compareFunc(D);
      });
      var T = g.filter(function(A) {
        return v.resolveCSSVariables && A.prop.indexOf("--") === 0 ? !1 : A.prop !== "content";
      }).map(function(A) {
        return v.resolveCSSVariables && (A.value = Ms.replaceVariables(l, A.value)), A.prop + ": " + A.value.replace(/["]/g, "'") + ";";
      }).join(" ");
      T && f(l).attr(O, T);
    }
    function X(l) {
      if (l.pseudoElementType && l.styleProps.content) {
        var g = n(l);
        g.img ? (l.name = "img", f(l).attr("src", g.img)) : f(l).text(g);
        var T = l.pseudoElementParent;
        l.pseudoElementType === "before" ? f(T).prepend(l) : f(T).append(l);
      }
    }
    function Z(l, g) {
      if (l.name) {
        var T = l.name.toUpperCase();
        if (u[g + "Elements"].indexOf(T) > -1) {
          for (var A in l.styleProps)
            if (l.styleProps[A].prop === g) {
              var D = l.styleProps[A].value;
              if (v.preserveImportant && (D = r(D)), D.match(/(px|auto)/)) {
                var B = D.replace("px", "");
                f(l).attr(g, B);
                return;
              }
              if (u.tableElements.indexOf(T) > -1 && D.match(/\%/)) {
                f(l).attr(g, D);
                return;
              }
            }
        }
      }
    }
    function re(l) {
      return l.indexOf("url(") !== 0 ? l : l.replace(/^url\((["'])?([^"']+)\1\)$/, "$2");
    }
    function Y(l) {
      if (l.name) {
        var g = l.name.toUpperCase(), T = Object.keys(u.styleToAttribute);
        if (u.tableElements.indexOf(g) > -1) {
          for (var A in l.styleProps)
            if (T.indexOf(l.styleProps[A].prop) > -1) {
              var D = u.styleToAttribute[l.styleProps[A].prop], B = l.styleProps[A].value;
              if (v.preserveImportant && (B = r(B)), D === "background" && (B = re(B)), /(linear|radial)-gradient\(/i.test(B))
                continue;
              f(l).attr(D, B);
            }
        }
      }
    }
  }
  function r(f) {
    return f.replace(/\s*!important$/, "");
  }
  function a(f, m) {
    switch (m) {
      case "lower-roman":
        return Hr.romanize(f).toLowerCase();
      case "upper-roman":
        return Hr.romanize(f);
      case "lower-latin":
      case "lower-alpha":
        return Hr.alphanumeric(f).toLowerCase();
      case "upper-latin":
      case "upper-alpha":
        return Hr.alphanumeric(f);
      default:
        return f.toString();
    }
  }
  function n(f) {
    var m = f.styleProps.content.value;
    if (m === "none" || m === "normal")
      return "";
    var v = m.match(/^\s*url\s*\(\s*(.*?)\s*\)\s*$/i);
    if (v) {
      var L = v[1].replace(/^['"]|['"]$/g, "");
      return { img: L };
    }
    for (var N = [], O = m.split(/['"]/), w = 0; w < O.length; w++)
      if (O[w] !== "") {
        var H = O[w].match(/var\s*\(\s*(.*?)\s*(,\s*(.*?)\s*)?\s*\)/i);
        if (H) {
          var k = Ms.findVariableValue(f, H[1]) || H[2];
          N.push(k.replace(/^['"]|['"]$/g, ""));
          continue;
        }
        var R = O[w].match(/counter\s*\(\s*(.*?)\s*(,\s*(.*?)\s*)?\s*\)/i);
        if (R && R[1] in f.counterProps) {
          var G = f.counterProps[R[1]];
          N.push(a(G, R[3]));
          continue;
        }
        var X = O[w].match(/attr\s*\(\s*(.*?)\s*\)/i);
        if (X) {
          var Z = X[1];
          N.push(
            f.pseudoElementParent ? f.pseudoElementParent.attribs[Z] : f.attribs[Z]
          );
          continue;
        }
        N.push(O[w]);
      }
    return m = N.join(""), m = m.replace(/\\/g, ""), m;
  }
  function i(f) {
    if (f.length !== 0) {
      var m = f[f.length - 1].pseudos;
      if (m) {
        for (var v = 0; v < m.length; v++)
          if (s(m[v]))
            return m[v].name;
      }
    }
  }
  function s(f) {
    return f.name === "before" || f.name === "after";
  }
  function o(f) {
    return f.filter(function(m) {
      return !s(m);
    });
  }
  function d(f, m) {
    m = ot.getDefaultOptions(m);
    var v = E(f, m);
    return v += `
` + m.extraCss, t(f, v, m), f;
  }
  function c(f, m) {
    var v = [], L = f("style"), N, O, w;
    return L.each(function() {
      w = this;
      var H = !!w.childNodes;
      if (N = H ? w.childNodes : w.children, N.length !== 1) {
        m.removeStyleTags && f(w).remove();
        return;
      }
      if (O = N[0].data, m.applyStyleTags && f(w).attr("data-embed") === void 0 && v.push(O), m.removeStyleTags && f(w).attr("data-embed") === void 0) {
        var k = H ? w.childNodes[0].nodeValue : w.children[0].data, R = ot.getPreservedText(k, {
          mediaQueries: m.preserveMediaQueries,
          fontFaces: m.preserveFontFaces,
          keyFrames: m.preserveKeyFrames,
          pseudos: m.preservePseudos
        }, u.ignoredPseudos);
        R ? H ? w.childNodes[0].nodeValue = R : w.children[0].data = R : f(w).remove();
      }
      f(w).removeAttr("data-embed");
    }), v;
  }
  function E(f, m) {
    var v = c(f, m), L = v.join(`
`);
    return L;
  }
  return u;
}, Bc = gg, Ag = yg, nr = Ag(function(e, u) {
  return Bc(e, { xmlMode: u && u.xmlMode }, vg, [u]);
}), vg = function(e, u) {
  return nr.juiceDocument(e, u);
};
nr.inlineContent = function(e, u, t) {
  return Bc(e, { xmlMode: t && t.xmlMode }, nr.inlineDocument, [u, t]);
};
nr.codeBlocks = Bc.codeBlocks;
var xg = nr;
const Ci = /* @__PURE__ */ $i(xg);
class Ir {
  /**
   * @constructor
   * @param {Properties} property
   * @param {Normal} normal
   * @param {string} [space]
   */
  constructor(u, t, r) {
    this.property = u, this.normal = t, r && (this.space = r);
  }
}
Ir.prototype.property = {};
Ir.prototype.normal = {};
Ir.prototype.space = null;
function nf(e, u) {
  const t = {}, r = {};
  let a = -1;
  for (; ++a < e.length; )
    Object.assign(t, e[a].property), Object.assign(r, e[a].normal);
  return new Ir(t, r, u);
}
function ir(e) {
  return e.toLowerCase();
}
class wu {
  /**
   * @constructor
   * @param {string} property
   * @param {string} attribute
   */
  constructor(u, t) {
    this.property = u, this.attribute = t;
  }
}
wu.prototype.space = null;
wu.prototype.boolean = !1;
wu.prototype.booleanish = !1;
wu.prototype.overloadedBoolean = !1;
wu.prototype.number = !1;
wu.prototype.commaSeparated = !1;
wu.prototype.spaceSeparated = !1;
wu.prototype.commaOrSpaceSeparated = !1;
wu.prototype.mustUseProperty = !1;
wu.prototype.defined = !1;
let Ng = 0;
const ue = $t(), Me = $t(), cf = $t(), W = $t(), Te = $t(), d0 = $t(), Tu = $t();
function $t() {
  return 2 ** ++Ng;
}
const Si = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: ue,
  booleanish: Me,
  commaOrSpaceSeparated: Tu,
  commaSeparated: d0,
  number: W,
  overloadedBoolean: cf,
  spaceSeparated: Te
}, Symbol.toStringTag, { value: "Module" })), Bn = Object.keys(Si);
class Uc extends wu {
  /**
   * @constructor
   * @param {string} property
   * @param {string} attribute
   * @param {number|null} [mask]
   * @param {string} [space]
   */
  constructor(u, t, r, a) {
    let n = -1;
    if (super(u, t), ks(this, "space", a), typeof r == "number")
      for (; ++n < Bn.length; ) {
        const i = Bn[n];
        ks(this, Bn[n], (r & Si[i]) === Si[i]);
      }
  }
}
Uc.prototype.defined = !0;
function ks(e, u, t) {
  t && (e[u] = t);
}
const Ig = {}.hasOwnProperty;
function P0(e) {
  const u = {}, t = {};
  let r;
  for (r in e.properties)
    if (Ig.call(e.properties, r)) {
      const a = e.properties[r], n = new Uc(
        r,
        e.transform(e.attributes || {}, r),
        a,
        e.space
      );
      e.mustUseProperty && e.mustUseProperty.includes(r) && (n.mustUseProperty = !0), u[r] = n, t[ir(r)] = r, t[ir(n.attribute)] = r;
    }
  return new Ir(u, t, e.space);
}
const sf = P0({
  space: "xlink",
  transform(e, u) {
    return "xlink:" + u.slice(5).toLowerCase();
  },
  properties: {
    xLinkActuate: null,
    xLinkArcRole: null,
    xLinkHref: null,
    xLinkRole: null,
    xLinkShow: null,
    xLinkTitle: null,
    xLinkType: null
  }
}), of = P0({
  space: "xml",
  transform(e, u) {
    return "xml:" + u.slice(3).toLowerCase();
  },
  properties: { xmlLang: null, xmlBase: null, xmlSpace: null }
});
function df(e, u) {
  return u in e ? e[u] : u;
}
function lf(e, u) {
  return df(e, u.toLowerCase());
}
const ff = P0({
  space: "xmlns",
  attributes: { xmlnsxlink: "xmlns:xlink" },
  transform: lf,
  properties: { xmlns: null, xmlnsXLink: null }
}), bf = P0({
  transform(e, u) {
    return u === "role" ? u : "aria-" + u.slice(4).toLowerCase();
  },
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: Me,
    ariaAutoComplete: null,
    ariaBusy: Me,
    ariaChecked: Me,
    ariaColCount: W,
    ariaColIndex: W,
    ariaColSpan: W,
    ariaControls: Te,
    ariaCurrent: null,
    ariaDescribedBy: Te,
    ariaDetails: null,
    ariaDisabled: Me,
    ariaDropEffect: Te,
    ariaErrorMessage: null,
    ariaExpanded: Me,
    ariaFlowTo: Te,
    ariaGrabbed: Me,
    ariaHasPopup: null,
    ariaHidden: Me,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: Te,
    ariaLevel: W,
    ariaLive: null,
    ariaModal: Me,
    ariaMultiLine: Me,
    ariaMultiSelectable: Me,
    ariaOrientation: null,
    ariaOwns: Te,
    ariaPlaceholder: null,
    ariaPosInSet: W,
    ariaPressed: Me,
    ariaReadOnly: Me,
    ariaRelevant: null,
    ariaRequired: Me,
    ariaRoleDescription: Te,
    ariaRowCount: W,
    ariaRowIndex: W,
    ariaRowSpan: W,
    ariaSelected: Me,
    ariaSetSize: W,
    ariaSort: null,
    ariaValueMax: W,
    ariaValueMin: W,
    ariaValueNow: W,
    ariaValueText: null,
    role: null
  }
}), Dg = P0({
  space: "html",
  attributes: {
    acceptcharset: "accept-charset",
    classname: "class",
    htmlfor: "for",
    httpequiv: "http-equiv"
  },
  transform: lf,
  mustUseProperty: ["checked", "multiple", "muted", "selected"],
  properties: {
    // Standard Properties.
    abbr: null,
    accept: d0,
    acceptCharset: Te,
    accessKey: Te,
    action: null,
    allow: null,
    allowFullScreen: ue,
    allowPaymentRequest: ue,
    allowUserMedia: ue,
    alt: null,
    as: null,
    async: ue,
    autoCapitalize: null,
    autoComplete: Te,
    autoFocus: ue,
    autoPlay: ue,
    blocking: Te,
    capture: ue,
    charSet: null,
    checked: ue,
    cite: null,
    className: Te,
    cols: W,
    colSpan: null,
    content: null,
    contentEditable: Me,
    controls: ue,
    controlsList: Te,
    coords: W | d0,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: ue,
    defer: ue,
    dir: null,
    dirName: null,
    disabled: ue,
    download: cf,
    draggable: Me,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: ue,
    formTarget: null,
    headers: Te,
    height: W,
    hidden: ue,
    high: W,
    href: null,
    hrefLang: null,
    htmlFor: Te,
    httpEquiv: Te,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: ue,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: ue,
    itemId: null,
    itemProp: Te,
    itemRef: Te,
    itemScope: ue,
    itemType: Te,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: ue,
    low: W,
    manifest: null,
    max: null,
    maxLength: W,
    media: null,
    method: null,
    min: null,
    minLength: W,
    multiple: ue,
    muted: ue,
    name: null,
    nonce: null,
    noModule: ue,
    noValidate: ue,
    onAbort: null,
    onAfterPrint: null,
    onAuxClick: null,
    onBeforeMatch: null,
    onBeforePrint: null,
    onBeforeToggle: null,
    onBeforeUnload: null,
    onBlur: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onContextLost: null,
    onContextMenu: null,
    onContextRestored: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFormData: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLanguageChange: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadEnd: null,
    onLoadStart: null,
    onMessage: null,
    onMessageError: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRejectionHandled: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onScrollEnd: null,
    onSecurityPolicyViolation: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onSlotChange: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnhandledRejection: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onWheel: null,
    open: ue,
    optimum: W,
    pattern: null,
    ping: Te,
    placeholder: null,
    playsInline: ue,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: ue,
    referrerPolicy: null,
    rel: Te,
    required: ue,
    reversed: ue,
    rows: W,
    rowSpan: W,
    sandbox: Te,
    scope: null,
    scoped: ue,
    seamless: ue,
    selected: ue,
    shadowRootDelegatesFocus: ue,
    shadowRootMode: null,
    shape: null,
    size: W,
    sizes: null,
    slot: null,
    span: W,
    spellCheck: Me,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: W,
    step: null,
    style: null,
    tabIndex: W,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: ue,
    useMap: null,
    value: Me,
    width: W,
    wrap: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: Te,
    // `<object>`. List of URIs to archives
    axis: null,
    // `<td>` and `<th>`. Use `scope` on `<th>`
    background: null,
    // `<body>`. Use CSS `background-image` instead
    bgColor: null,
    // `<body>` and table elements. Use CSS `background-color` instead
    border: W,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: W,
    // `<body>`
    cellPadding: null,
    // `<table>`
    cellSpacing: null,
    // `<table>`
    char: null,
    // Several table elements. When `align=char`, sets the character to align on
    charOff: null,
    // Several table elements. When `char`, offsets the alignment
    classId: null,
    // `<object>`
    clear: null,
    // `<br>`. Use CSS `clear` instead
    code: null,
    // `<object>`
    codeBase: null,
    // `<object>`
    codeType: null,
    // `<object>`
    color: null,
    // `<font>` and `<hr>`. Use CSS instead
    compact: ue,
    // Lists. Use CSS to reduce space between items instead
    declare: ue,
    // `<object>`
    event: null,
    // `<script>`
    face: null,
    // `<font>`. Use CSS instead
    frame: null,
    // `<table>`
    frameBorder: null,
    // `<iframe>`. Use CSS `border` instead
    hSpace: W,
    // `<img>` and `<object>`
    leftMargin: W,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: W,
    // `<body>`
    marginWidth: W,
    // `<body>`
    noResize: ue,
    // `<frame>`
    noHref: ue,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: ue,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: ue,
    // `<td>` and `<th>`
    object: null,
    // `<applet>`
    profile: null,
    // `<head>`
    prompt: null,
    // `<isindex>`
    rev: null,
    // `<link>`
    rightMargin: W,
    // `<body>`
    rules: null,
    // `<table>`
    scheme: null,
    // `<meta>`
    scrolling: Me,
    // `<frame>`. Use overflow in the child context
    standby: null,
    // `<object>`
    summary: null,
    // `<table>`
    text: null,
    // `<body>`. Use CSS `color` instead
    topMargin: W,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: W,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: ue,
    disableRemotePlayback: ue,
    prefix: null,
    property: null,
    results: W,
    security: null,
    unselectable: null
  }
}), Cg = P0({
  space: "svg",
  attributes: {
    accentHeight: "accent-height",
    alignmentBaseline: "alignment-baseline",
    arabicForm: "arabic-form",
    baselineShift: "baseline-shift",
    capHeight: "cap-height",
    className: "class",
    clipPath: "clip-path",
    clipRule: "clip-rule",
    colorInterpolation: "color-interpolation",
    colorInterpolationFilters: "color-interpolation-filters",
    colorProfile: "color-profile",
    colorRendering: "color-rendering",
    crossOrigin: "crossorigin",
    dataType: "datatype",
    dominantBaseline: "dominant-baseline",
    enableBackground: "enable-background",
    fillOpacity: "fill-opacity",
    fillRule: "fill-rule",
    floodColor: "flood-color",
    floodOpacity: "flood-opacity",
    fontFamily: "font-family",
    fontSize: "font-size",
    fontSizeAdjust: "font-size-adjust",
    fontStretch: "font-stretch",
    fontStyle: "font-style",
    fontVariant: "font-variant",
    fontWeight: "font-weight",
    glyphName: "glyph-name",
    glyphOrientationHorizontal: "glyph-orientation-horizontal",
    glyphOrientationVertical: "glyph-orientation-vertical",
    hrefLang: "hreflang",
    horizAdvX: "horiz-adv-x",
    horizOriginX: "horiz-origin-x",
    horizOriginY: "horiz-origin-y",
    imageRendering: "image-rendering",
    letterSpacing: "letter-spacing",
    lightingColor: "lighting-color",
    markerEnd: "marker-end",
    markerMid: "marker-mid",
    markerStart: "marker-start",
    navDown: "nav-down",
    navDownLeft: "nav-down-left",
    navDownRight: "nav-down-right",
    navLeft: "nav-left",
    navNext: "nav-next",
    navPrev: "nav-prev",
    navRight: "nav-right",
    navUp: "nav-up",
    navUpLeft: "nav-up-left",
    navUpRight: "nav-up-right",
    onAbort: "onabort",
    onActivate: "onactivate",
    onAfterPrint: "onafterprint",
    onBeforePrint: "onbeforeprint",
    onBegin: "onbegin",
    onCancel: "oncancel",
    onCanPlay: "oncanplay",
    onCanPlayThrough: "oncanplaythrough",
    onChange: "onchange",
    onClick: "onclick",
    onClose: "onclose",
    onCopy: "oncopy",
    onCueChange: "oncuechange",
    onCut: "oncut",
    onDblClick: "ondblclick",
    onDrag: "ondrag",
    onDragEnd: "ondragend",
    onDragEnter: "ondragenter",
    onDragExit: "ondragexit",
    onDragLeave: "ondragleave",
    onDragOver: "ondragover",
    onDragStart: "ondragstart",
    onDrop: "ondrop",
    onDurationChange: "ondurationchange",
    onEmptied: "onemptied",
    onEnd: "onend",
    onEnded: "onended",
    onError: "onerror",
    onFocus: "onfocus",
    onFocusIn: "onfocusin",
    onFocusOut: "onfocusout",
    onHashChange: "onhashchange",
    onInput: "oninput",
    onInvalid: "oninvalid",
    onKeyDown: "onkeydown",
    onKeyPress: "onkeypress",
    onKeyUp: "onkeyup",
    onLoad: "onload",
    onLoadedData: "onloadeddata",
    onLoadedMetadata: "onloadedmetadata",
    onLoadStart: "onloadstart",
    onMessage: "onmessage",
    onMouseDown: "onmousedown",
    onMouseEnter: "onmouseenter",
    onMouseLeave: "onmouseleave",
    onMouseMove: "onmousemove",
    onMouseOut: "onmouseout",
    onMouseOver: "onmouseover",
    onMouseUp: "onmouseup",
    onMouseWheel: "onmousewheel",
    onOffline: "onoffline",
    onOnline: "ononline",
    onPageHide: "onpagehide",
    onPageShow: "onpageshow",
    onPaste: "onpaste",
    onPause: "onpause",
    onPlay: "onplay",
    onPlaying: "onplaying",
    onPopState: "onpopstate",
    onProgress: "onprogress",
    onRateChange: "onratechange",
    onRepeat: "onrepeat",
    onReset: "onreset",
    onResize: "onresize",
    onScroll: "onscroll",
    onSeeked: "onseeked",
    onSeeking: "onseeking",
    onSelect: "onselect",
    onShow: "onshow",
    onStalled: "onstalled",
    onStorage: "onstorage",
    onSubmit: "onsubmit",
    onSuspend: "onsuspend",
    onTimeUpdate: "ontimeupdate",
    onToggle: "ontoggle",
    onUnload: "onunload",
    onVolumeChange: "onvolumechange",
    onWaiting: "onwaiting",
    onZoom: "onzoom",
    overlinePosition: "overline-position",
    overlineThickness: "overline-thickness",
    paintOrder: "paint-order",
    panose1: "panose-1",
    pointerEvents: "pointer-events",
    referrerPolicy: "referrerpolicy",
    renderingIntent: "rendering-intent",
    shapeRendering: "shape-rendering",
    stopColor: "stop-color",
    stopOpacity: "stop-opacity",
    strikethroughPosition: "strikethrough-position",
    strikethroughThickness: "strikethrough-thickness",
    strokeDashArray: "stroke-dasharray",
    strokeDashOffset: "stroke-dashoffset",
    strokeLineCap: "stroke-linecap",
    strokeLineJoin: "stroke-linejoin",
    strokeMiterLimit: "stroke-miterlimit",
    strokeOpacity: "stroke-opacity",
    strokeWidth: "stroke-width",
    tabIndex: "tabindex",
    textAnchor: "text-anchor",
    textDecoration: "text-decoration",
    textRendering: "text-rendering",
    transformOrigin: "transform-origin",
    typeOf: "typeof",
    underlinePosition: "underline-position",
    underlineThickness: "underline-thickness",
    unicodeBidi: "unicode-bidi",
    unicodeRange: "unicode-range",
    unitsPerEm: "units-per-em",
    vAlphabetic: "v-alphabetic",
    vHanging: "v-hanging",
    vIdeographic: "v-ideographic",
    vMathematical: "v-mathematical",
    vectorEffect: "vector-effect",
    vertAdvY: "vert-adv-y",
    vertOriginX: "vert-origin-x",
    vertOriginY: "vert-origin-y",
    wordSpacing: "word-spacing",
    writingMode: "writing-mode",
    xHeight: "x-height",
    // These were camelcased in Tiny. Now lowercased in SVG 2
    playbackOrder: "playbackorder",
    timelineBegin: "timelinebegin"
  },
  transform: df,
  properties: {
    about: Tu,
    accentHeight: W,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: W,
    amplitude: W,
    arabicForm: null,
    ascent: W,
    attributeName: null,
    attributeType: null,
    azimuth: W,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: W,
    by: null,
    calcMode: null,
    capHeight: W,
    className: Te,
    clip: null,
    clipPath: null,
    clipPathUnits: null,
    clipRule: null,
    color: null,
    colorInterpolation: null,
    colorInterpolationFilters: null,
    colorProfile: null,
    colorRendering: null,
    content: null,
    contentScriptType: null,
    contentStyleType: null,
    crossOrigin: null,
    cursor: null,
    cx: null,
    cy: null,
    d: null,
    dataType: null,
    defaultAction: null,
    descent: W,
    diffuseConstant: W,
    direction: null,
    display: null,
    dur: null,
    divisor: W,
    dominantBaseline: null,
    download: ue,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: W,
    enableBackground: null,
    end: null,
    event: null,
    exponent: W,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: W,
    fillRule: null,
    filter: null,
    filterRes: null,
    filterUnits: null,
    floodColor: null,
    floodOpacity: null,
    focusable: null,
    focusHighlight: null,
    fontFamily: null,
    fontSize: null,
    fontSizeAdjust: null,
    fontStretch: null,
    fontStyle: null,
    fontVariant: null,
    fontWeight: null,
    format: null,
    fr: null,
    from: null,
    fx: null,
    fy: null,
    g1: d0,
    g2: d0,
    glyphName: d0,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: W,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: W,
    horizOriginX: W,
    horizOriginY: W,
    id: null,
    ideographic: W,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: W,
    k: W,
    k1: W,
    k2: W,
    k3: W,
    k4: W,
    kernelMatrix: Tu,
    kernelUnitLength: null,
    keyPoints: null,
    // SEMI_COLON_SEPARATED
    keySplines: null,
    // SEMI_COLON_SEPARATED
    keyTimes: null,
    // SEMI_COLON_SEPARATED
    kerning: null,
    lang: null,
    lengthAdjust: null,
    letterSpacing: null,
    lightingColor: null,
    limitingConeAngle: W,
    local: null,
    markerEnd: null,
    markerMid: null,
    markerStart: null,
    markerHeight: null,
    markerUnits: null,
    markerWidth: null,
    mask: null,
    maskContentUnits: null,
    maskUnits: null,
    mathematical: null,
    max: null,
    media: null,
    mediaCharacterEncoding: null,
    mediaContentEncodings: null,
    mediaSize: W,
    mediaTime: null,
    method: null,
    min: null,
    mode: null,
    name: null,
    navDown: null,
    navDownLeft: null,
    navDownRight: null,
    navLeft: null,
    navNext: null,
    navPrev: null,
    navRight: null,
    navUp: null,
    navUpLeft: null,
    navUpRight: null,
    numOctaves: null,
    observer: null,
    offset: null,
    onAbort: null,
    onActivate: null,
    onAfterPrint: null,
    onBeforePrint: null,
    onBegin: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnd: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFocusIn: null,
    onFocusOut: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadStart: null,
    onMessage: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onMouseWheel: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRepeat: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onShow: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onZoom: null,
    opacity: null,
    operator: null,
    order: null,
    orient: null,
    orientation: null,
    origin: null,
    overflow: null,
    overlay: null,
    overlinePosition: W,
    overlineThickness: W,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: W,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: Te,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: W,
    pointsAtY: W,
    pointsAtZ: W,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: Tu,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: Tu,
    rev: Tu,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: Tu,
    requiredFeatures: Tu,
    requiredFonts: Tu,
    requiredFormats: Tu,
    resource: null,
    restart: null,
    result: null,
    rotate: null,
    rx: null,
    ry: null,
    scale: null,
    seed: null,
    shapeRendering: null,
    side: null,
    slope: null,
    snapshotTime: null,
    specularConstant: W,
    specularExponent: W,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: W,
    strikethroughThickness: W,
    string: null,
    stroke: null,
    strokeDashArray: Tu,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: W,
    strokeOpacity: W,
    strokeWidth: null,
    style: null,
    surfaceScale: W,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: Tu,
    tabIndex: W,
    tableValues: null,
    target: null,
    targetX: W,
    targetY: W,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: Tu,
    to: null,
    transform: null,
    transformOrigin: null,
    u1: null,
    u2: null,
    underlinePosition: W,
    underlineThickness: W,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: W,
    values: null,
    vAlphabetic: W,
    vMathematical: W,
    vectorEffect: null,
    vHanging: W,
    vIdeographic: W,
    version: null,
    vertAdvY: W,
    vertOriginX: W,
    vertOriginY: W,
    viewBox: null,
    viewTarget: null,
    visibility: null,
    width: null,
    widths: null,
    wordSpacing: null,
    writingMode: null,
    x: null,
    x1: null,
    x2: null,
    xChannelSelector: null,
    xHeight: W,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  }
}), Sg = /^data[-\w.:]+$/i, Bs = /-[a-z]/g, Og = /[A-Z]/g;
function hn(e, u) {
  const t = ir(u);
  let r = u, a = wu;
  if (t in e.normal)
    return e.property[e.normal[t]];
  if (t.length > 4 && t.slice(0, 4) === "data" && Sg.test(u)) {
    if (u.charAt(4) === "-") {
      const n = u.slice(5).replace(Bs, Pg);
      r = "data" + n.charAt(0).toUpperCase() + n.slice(1);
    } else {
      const n = u.slice(4);
      if (!Bs.test(n)) {
        let i = n.replace(Og, Lg);
        i.charAt(0) !== "-" && (i = "-" + i), u = "data" + i;
      }
    }
    a = Uc;
  }
  return new a(r, u);
}
function Lg(e) {
  return "-" + e.toLowerCase();
}
function Pg(e) {
  return e.charAt(1).toUpperCase();
}
const Dr = nf([of, sf, ff, bf, Dg], "html"), Vt = nf([of, sf, ff, bf, Cg], "svg");
function Oi(e) {
  const u = [], t = String(e || "");
  let r = t.indexOf(","), a = 0, n = !1;
  for (; !n; ) {
    r === -1 && (r = t.length, n = !0);
    const i = t.slice(a, r).trim();
    (i || !n) && u.push(i), a = r + 1, r = t.indexOf(",", a);
  }
  return u;
}
function hf(e, u) {
  const t = u || {};
  return (e[e.length - 1] === "" ? [...e, ""] : e).join(
    (t.padRight ? " " : "") + "," + (t.padLeft === !1 ? "" : " ")
  ).trim();
}
const Us = /[#.]/g;
function wg(e, u) {
  const t = e || "", r = {};
  let a = 0, n, i;
  for (; a < t.length; ) {
    Us.lastIndex = a;
    const s = Us.exec(t), o = t.slice(a, s ? s.index : t.length);
    o && (n ? n === "#" ? r.id = o : Array.isArray(r.className) ? r.className.push(o) : r.className = [o] : i = o, a += o.length), s && (n = s[0], a++);
  }
  return {
    type: "element",
    // @ts-expect-error: tag name is parsed.
    tagName: i || u || "div",
    properties: r,
    children: []
  };
}
function Li(e) {
  const u = String(e || "").trim();
  return u ? u.split(/[ \t\n\r\f]+/g) : [];
}
function pf(e) {
  return e.join(" ").trim();
}
const Rg = /* @__PURE__ */ new Set(["button", "menu", "reset", "submit"]), Pi = {}.hasOwnProperty;
function mf(e, u, t) {
  const r = t && Ug(t);
  function a(n, i, ...s) {
    let o = -1, d;
    if (n == null) {
      d = { type: "root", children: [] };
      const c = (
        /** @type {Child} */
        i
      );
      s.unshift(c);
    } else if (d = wg(n, u), d.tagName = d.tagName.toLowerCase(), r && Pi.call(r, d.tagName) && (d.tagName = r[d.tagName]), Mg(i, d.tagName)) {
      let c;
      for (c in i)
        Pi.call(i, c) && kg(e, d.properties, c, i[c]);
    } else
      s.unshift(i);
    for (; ++o < s.length; )
      wi(d.children, s[o]);
    return d.type === "element" && d.tagName === "template" && (d.content = { type: "root", children: d.children }, d.children = []), d;
  }
  return a;
}
function Mg(e, u) {
  return e == null || typeof e != "object" || Array.isArray(e) ? !1 : u === "input" || !e.type || typeof e.type != "string" ? !0 : "children" in e && Array.isArray(e.children) ? !1 : u === "button" ? Rg.has(e.type.toLowerCase()) : !("value" in e);
}
function kg(e, u, t, r) {
  const a = hn(e, t);
  let n = -1, i;
  if (r != null) {
    if (typeof r == "number") {
      if (Number.isNaN(r))
        return;
      i = r;
    } else
      typeof r == "boolean" ? i = r : typeof r == "string" ? a.spaceSeparated ? i = Li(r) : a.commaSeparated ? i = Oi(r) : a.commaOrSpaceSeparated ? i = Li(Oi(r).join(" ")) : i = Hs(a, a.property, r) : Array.isArray(r) ? i = r.concat() : i = a.property === "style" ? Bg(r) : String(r);
    if (Array.isArray(i)) {
      const s = [];
      for (; ++n < i.length; ) {
        const o = (
          /** @type {number | string} */
          Hs(a, a.property, i[n])
        );
        s[n] = o;
      }
      i = s;
    }
    if (a.property === "className" && Array.isArray(u.className)) {
      const s = (
        /** @type {number | string} */
        i
      );
      i = u.className.concat(s);
    }
    u[a.property] = i;
  }
}
function wi(e, u) {
  let t = -1;
  if (u != null)
    if (typeof u == "string" || typeof u == "number")
      e.push({ type: "text", value: String(u) });
    else if (Array.isArray(u))
      for (; ++t < u.length; )
        wi(e, u[t]);
    else if (typeof u == "object" && "type" in u)
      u.type === "root" ? wi(e, u.children) : e.push(u);
    else
      throw new Error("Expected node, nodes, or string, got `" + u + "`");
}
function Hs(e, u, t) {
  if (typeof t == "string") {
    if (e.number && t && !Number.isNaN(Number(t)))
      return Number(t);
    if ((e.boolean || e.overloadedBoolean) && (t === "" || ir(t) === ir(u)))
      return !0;
  }
  return t;
}
function Bg(e) {
  const u = [];
  let t;
  for (t in e)
    Pi.call(e, t) && u.push([t, e[t]].join(": "));
  return u.join("; ");
}
function Ug(e) {
  const u = {};
  let t = -1;
  for (; ++t < e.length; )
    u[e[t].toLowerCase()] = e[t];
  return u;
}
const Hg = [
  "altGlyph",
  "altGlyphDef",
  "altGlyphItem",
  "animateColor",
  "animateMotion",
  "animateTransform",
  "clipPath",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDistantLight",
  "feDropShadow",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence",
  "foreignObject",
  "glyphRef",
  "linearGradient",
  "radialGradient",
  "solidColor",
  "textArea",
  "textPath"
], Fg = mf(Dr, "div"), qg = mf(Vt, "g", Hg), Un = /\r?\n|\r/g;
function Gg(e) {
  const u = String(e), t = [];
  for (Un.lastIndex = 0; Un.test(u); )
    t.push(Un.lastIndex);
  return t.push(u.length + 1), { toPoint: r, toOffset: a };
  function r(n) {
    let i = -1;
    if (typeof n == "number" && n > -1 && n < t[t.length - 1]) {
      for (; ++i < t.length; )
        if (t[i] > n)
          return {
            line: i + 1,
            column: n - (i > 0 ? t[i - 1] : 0) + 1,
            offset: n
          };
    }
  }
  function a(n) {
    const i = n && n.line, s = n && n.column;
    if (typeof i == "number" && typeof s == "number" && !Number.isNaN(i) && !Number.isNaN(s) && i - 1 in t) {
      const o = (t[i - 2] || 0) + s - 1 || 0;
      if (o > -1 && o < t[t.length - 1])
        return o;
    }
  }
}
const jg = {
  html: "http://www.w3.org/1999/xhtml",
  mathml: "http://www.w3.org/1998/Math/MathML",
  svg: "http://www.w3.org/2000/svg",
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
}, gf = {}.hasOwnProperty, $g = Object.prototype;
function Vg(e, u) {
  const t = u || {};
  return Hc(
    {
      file: t.file || void 0,
      location: !1,
      schema: t.space === "svg" ? Vt : Dr,
      verbose: t.verbose || !1
    },
    e
  );
}
function Hc(e, u) {
  let t;
  switch (u.nodeName) {
    case "#comment": {
      const r = (
        /** @type {P5Comment} */
        u
      );
      return t = { type: "comment", value: r.data }, Kr(e, r, t), t;
    }
    case "#document":
    case "#document-fragment": {
      const r = (
        /** @type {P5Document | P5DocumentFragment} */
        u
      ), a = "mode" in r ? r.mode === "quirks" || r.mode === "limited-quirks" : !1;
      if (t = {
        type: "root",
        children: Ef(e, u.childNodes),
        data: { quirksMode: a }
      }, e.file && e.location) {
        const n = String(e.file), i = Gg(n), s = i.toPoint(0), o = i.toPoint(n.length);
        t.position = { start: s, end: o };
      }
      return t;
    }
    case "#documentType": {
      const r = (
        /** @type {P5DocumentType} */
        u
      );
      return t = { type: "doctype" }, Kr(e, r, t), t;
    }
    case "#text": {
      const r = (
        /** @type {P5Text} */
        u
      );
      return t = { type: "text", value: r.value }, Kr(e, r, t), t;
    }
    default:
      return t = Yg(
        e,
        /** @type {P5Element} */
        u
      ), t;
  }
}
function Ef(e, u) {
  let t = -1;
  const r = [];
  for (; ++t < u.length; ) {
    const a = (
      /** @type {RootContent} */
      Hc(e, u[t])
    );
    r.push(a);
  }
  return r;
}
function Yg(e, u) {
  const t = e.schema;
  e.schema = u.namespaceURI === jg.svg ? Vt : Dr;
  let r = -1;
  const a = {};
  for (; ++r < u.attrs.length; ) {
    const s = u.attrs[r], o = (s.prefix ? s.prefix + ":" : "") + s.name;
    gf.call($g, o) || (a[o] = s.value);
  }
  const i = (e.schema.space === "svg" ? qg : Fg)(u.tagName, a, Ef(e, u.childNodes));
  if (Kr(e, u, i), i.tagName === "template") {
    const s = (
      /** @type {P5Template} */
      u
    ), o = s.sourceCodeLocation, d = o && o.startTag && n0(o.startTag), c = o && o.endTag && n0(o.endTag), E = (
      /** @type {Root} */
      Hc(e, s.content)
    );
    d && c && e.file && (E.position = { start: d.end, end: c.start }), i.content = E;
  }
  return e.schema = t, i;
}
function Kr(e, u, t) {
  if ("sourceCodeLocation" in u && u.sourceCodeLocation && e.file) {
    const r = Wg(e, t, u.sourceCodeLocation);
    r && (e.location = !0, t.position = r);
  }
}
function Wg(e, u, t) {
  const r = n0(t);
  if (u.type === "element") {
    const a = u.children[u.children.length - 1];
    if (r && !t.endTag && a && a.position && a.position.end && (r.end = Object.assign({}, a.position.end)), e.verbose) {
      const n = {};
      let i;
      if (t.attrs)
        for (i in t.attrs)
          gf.call(t.attrs, i) && (n[hn(e.schema, i).property] = n0(
            t.attrs[i]
          ));
      t.startTag;
      const s = n0(t.startTag), o = t.endTag ? n0(t.endTag) : void 0, d = { opening: s };
      o && (d.closing = o), d.properties = n, u.data = { position: d };
    }
  }
  return r;
}
function n0(e) {
  const u = Fs({
    line: e.startLine,
    column: e.startCol,
    offset: e.startOffset
  }), t = Fs({
    line: e.endLine,
    column: e.endCol,
    offset: e.endOffset
  });
  return u || t ? { start: u, end: t } : void 0;
}
function Fs(e) {
  return e.line && e.column ? e : void 0;
}
function Xg(e) {
  return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? qs(e.position) : "start" in e || "end" in e ? qs(e) : "line" in e || "column" in e ? Ri(e) : "";
}
function Ri(e) {
  return Gs(e && e.line) + ":" + Gs(e && e.column);
}
function qs(e) {
  return Ri(e && e.start) + "-" + Ri(e && e.end);
}
function Gs(e) {
  return e && typeof e == "number" ? e : 1;
}
class tu extends Error {
  /**
   * Create a message for `reason`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {Options | null | undefined} [options]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | Options | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns
   *   Instance of `VFileMessage`.
   */
  // eslint-disable-next-line complexity
  constructor(u, t, r) {
    super(), typeof t == "string" && (r = t, t = void 0);
    let a = "", n = {}, i = !1;
    if (t && ("line" in t && "column" in t ? n = { place: t } : "start" in t && "end" in t ? n = { place: t } : "type" in t ? n = {
      ancestors: [t],
      place: t.position
    } : n = { ...t }), typeof u == "string" ? a = u : !n.cause && u && (i = !0, a = u.message, n.cause = u), !n.ruleId && !n.source && typeof r == "string") {
      const o = r.indexOf(":");
      o === -1 ? n.ruleId = r : (n.source = r.slice(0, o), n.ruleId = r.slice(o + 1));
    }
    if (!n.place && n.ancestors && n.ancestors) {
      const o = n.ancestors[n.ancestors.length - 1];
      o && (n.place = o.position);
    }
    const s = n.place && "start" in n.place ? n.place.start : n.place;
    this.ancestors = n.ancestors || void 0, this.cause = n.cause || void 0, this.column = s ? s.column : void 0, this.fatal = void 0, this.file, this.message = a, this.line = s ? s.line : void 0, this.name = Xg(n.place) || "1:1", this.place = n.place || void 0, this.reason = this.message, this.ruleId = n.ruleId || void 0, this.source = n.source || void 0, this.stack = i && n.cause && typeof n.cause.stack == "string" ? n.cause.stack : "", this.actual, this.expected, this.note, this.url;
  }
}
tu.prototype.file = "";
tu.prototype.name = "";
tu.prototype.reason = "";
tu.prototype.message = "";
tu.prototype.stack = "";
tu.prototype.column = void 0;
tu.prototype.line = void 0;
tu.prototype.ancestors = void 0;
tu.prototype.cause = void 0;
tu.prototype.fatal = void 0;
tu.prototype.place = void 0;
tu.prototype.ruleId = void 0;
tu.prototype.source = void 0;
const Hu = { basename: zg, dirname: Qg, extname: Kg, join: Jg, sep: "/" };
function zg(e, u) {
  if (u !== void 0 && typeof u != "string")
    throw new TypeError('"ext" argument must be a string');
  Cr(e);
  let t = 0, r = -1, a = e.length, n;
  if (u === void 0 || u.length === 0 || u.length > e.length) {
    for (; a--; )
      if (e.codePointAt(a) === 47) {
        if (n) {
          t = a + 1;
          break;
        }
      } else
        r < 0 && (n = !0, r = a + 1);
    return r < 0 ? "" : e.slice(t, r);
  }
  if (u === e)
    return "";
  let i = -1, s = u.length - 1;
  for (; a--; )
    if (e.codePointAt(a) === 47) {
      if (n) {
        t = a + 1;
        break;
      }
    } else
      i < 0 && (n = !0, i = a + 1), s > -1 && (e.codePointAt(a) === u.codePointAt(s--) ? s < 0 && (r = a) : (s = -1, r = i));
  return t === r ? r = i : r < 0 && (r = e.length), e.slice(t, r);
}
function Qg(e) {
  if (Cr(e), e.length === 0)
    return ".";
  let u = -1, t = e.length, r;
  for (; --t; )
    if (e.codePointAt(t) === 47) {
      if (r) {
        u = t;
        break;
      }
    } else
      r || (r = !0);
  return u < 0 ? e.codePointAt(0) === 47 ? "/" : "." : u === 1 && e.codePointAt(0) === 47 ? "//" : e.slice(0, u);
}
function Kg(e) {
  Cr(e);
  let u = e.length, t = -1, r = 0, a = -1, n = 0, i;
  for (; u--; ) {
    const s = e.codePointAt(u);
    if (s === 47) {
      if (i) {
        r = u + 1;
        break;
      }
      continue;
    }
    t < 0 && (i = !0, t = u + 1), s === 46 ? a < 0 ? a = u : n !== 1 && (n = 1) : a > -1 && (n = -1);
  }
  return a < 0 || t < 0 || // We saw a non-dot character immediately before the dot.
  n === 0 || // The (right-most) trimmed path component is exactly `..`.
  n === 1 && a === t - 1 && a === r + 1 ? "" : e.slice(a, t);
}
function Jg(...e) {
  let u = -1, t;
  for (; ++u < e.length; )
    Cr(e[u]), e[u] && (t = t === void 0 ? e[u] : t + "/" + e[u]);
  return t === void 0 ? "." : Zg(t);
}
function Zg(e) {
  Cr(e);
  const u = e.codePointAt(0) === 47;
  let t = eE(e, !u);
  return t.length === 0 && !u && (t = "."), t.length > 0 && e.codePointAt(e.length - 1) === 47 && (t += "/"), u ? "/" + t : t;
}
function eE(e, u) {
  let t = "", r = 0, a = -1, n = 0, i = -1, s, o;
  for (; ++i <= e.length; ) {
    if (i < e.length)
      s = e.codePointAt(i);
    else {
      if (s === 47)
        break;
      s = 47;
    }
    if (s === 47) {
      if (!(a === i - 1 || n === 1))
        if (a !== i - 1 && n === 2) {
          if (t.length < 2 || r !== 2 || t.codePointAt(t.length - 1) !== 46 || t.codePointAt(t.length - 2) !== 46) {
            if (t.length > 2) {
              if (o = t.lastIndexOf("/"), o !== t.length - 1) {
                o < 0 ? (t = "", r = 0) : (t = t.slice(0, o), r = t.length - 1 - t.lastIndexOf("/")), a = i, n = 0;
                continue;
              }
            } else if (t.length > 0) {
              t = "", r = 0, a = i, n = 0;
              continue;
            }
          }
          u && (t = t.length > 0 ? t + "/.." : "..", r = 2);
        } else
          t.length > 0 ? t += "/" + e.slice(a + 1, i) : t = e.slice(a + 1, i), r = i - a - 1;
      a = i, n = 0;
    } else
      s === 46 && n > -1 ? n++ : n = -1;
  }
  return t;
}
function Cr(e) {
  if (typeof e != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(e)
    );
}
const uE = { cwd: tE };
function tE() {
  return "/";
}
function Mi(e) {
  return !!(e !== null && typeof e == "object" && "href" in e && e.href && "protocol" in e && e.protocol && // @ts-expect-error: indexing is fine.
  e.auth === void 0);
}
function rE(e) {
  if (typeof e == "string")
    e = new URL(e);
  else if (!Mi(e)) {
    const u = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + e + "`"
    );
    throw u.code = "ERR_INVALID_ARG_TYPE", u;
  }
  if (e.protocol !== "file:") {
    const u = new TypeError("The URL must be of scheme file");
    throw u.code = "ERR_INVALID_URL_SCHEME", u;
  }
  return aE(e);
}
function aE(e) {
  if (e.hostname !== "") {
    const r = new TypeError(
      'File URL host must be "localhost" or empty on darwin'
    );
    throw r.code = "ERR_INVALID_FILE_URL_HOST", r;
  }
  const u = e.pathname;
  let t = -1;
  for (; ++t < u.length; )
    if (u.codePointAt(t) === 37 && u.codePointAt(t + 1) === 50) {
      const r = u.codePointAt(t + 2);
      if (r === 70 || r === 102) {
        const a = new TypeError(
          "File URL path must not include encoded / characters"
        );
        throw a.code = "ERR_INVALID_FILE_URL_PATH", a;
      }
    }
  return decodeURIComponent(u);
}
const Hn = (
  /** @type {const} */
  [
    "history",
    "path",
    "basename",
    "stem",
    "extname",
    "dirname"
  ]
);
class ki {
  /**
   * Create a new virtual file.
   *
   * `options` is treated as:
   *
   * *   `string` or `Uint8Array` — `{value: options}`
   * *   `URL` — `{path: options}`
   * *   `VFile` — shallow copies its data over to the new file
   * *   `object` — all fields are shallow copied over to the new file
   *
   * Path related fields are set in the following order (least specific to
   * most specific): `history`, `path`, `basename`, `stem`, `extname`,
   * `dirname`.
   *
   * You cannot set `dirname` or `extname` without setting either `history`,
   * `path`, `basename`, or `stem` too.
   *
   * @param {Compatible | null | undefined} [value]
   *   File value.
   * @returns
   *   New instance.
   */
  constructor(u) {
    let t;
    u ? Mi(u) ? t = { path: u } : typeof u == "string" || nE(u) ? t = { value: u } : t = u : t = {}, this.cwd = uE.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let r = -1;
    for (; ++r < Hn.length; ) {
      const n = Hn[r];
      n in t && t[n] !== void 0 && t[n] !== null && (this[n] = n === "history" ? [...t[n]] : t[n]);
    }
    let a;
    for (a in t)
      Hn.includes(a) || (this[a] = t[a]);
  }
  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   *
   * @returns {string | undefined}
   *   Basename.
   */
  get basename() {
    return typeof this.path == "string" ? Hu.basename(this.path) : void 0;
  }
  /**
   * Set basename (including extname) (`'index.min.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   *
   * @param {string} basename
   *   Basename.
   * @returns {undefined}
   *   Nothing.
   */
  set basename(u) {
    qn(u, "basename"), Fn(u, "basename"), this.path = Hu.join(this.dirname || "", u);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path == "string" ? Hu.dirname(this.path) : void 0;
  }
  /**
   * Set the parent path (example: `'~'`).
   *
   * Cannot be set if there’s no `path` yet.
   *
   * @param {string | undefined} dirname
   *   Dirname.
   * @returns {undefined}
   *   Nothing.
   */
  set dirname(u) {
    js(this.basename, "dirname"), this.path = Hu.join(u || "", this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path == "string" ? Hu.extname(this.path) : void 0;
  }
  /**
   * Set the extname (including dot) (example: `'.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be set if there’s no `path` yet.
   *
   * @param {string | undefined} extname
   *   Extname.
   * @returns {undefined}
   *   Nothing.
   */
  set extname(u) {
    if (Fn(u, "extname"), js(this.dirname, "extname"), u) {
      if (u.codePointAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (u.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = Hu.join(this.dirname, this.stem + (u || ""));
  }
  /**
   * Get the full path (example: `'~/index.min.js'`).
   *
   * @returns {string}
   *   Path.
   */
  get path() {
    return this.history[this.history.length - 1];
  }
  /**
   * Set the full path (example: `'~/index.min.js'`).
   *
   * Cannot be nullified.
   * You can set a file URL (a `URL` object with a `file:` protocol) which will
   * be turned into a path with `url.fileURLToPath`.
   *
   * @param {URL | string} path
   *   Path.
   * @returns {undefined}
   *   Nothing.
   */
  set path(u) {
    Mi(u) && (u = rE(u)), qn(u, "path"), this.path !== u && this.history.push(u);
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path == "string" ? Hu.basename(this.path, this.extname) : void 0;
  }
  /**
   * Set the stem (basename w/o extname) (example: `'index.min'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   *
   * @param {string} stem
   *   Stem.
   * @returns {undefined}
   *   Nothing.
   */
  set stem(u) {
    qn(u, "stem"), Fn(u, "stem"), this.path = Hu.join(this.dirname || "", u + (this.extname || ""));
  }
  // Normal prototypal methods.
  /**
   * Create a fatal message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `true` (error; file not usable)
   * and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {never}
   *   Never.
   * @throws {VFileMessage}
   *   Message.
   */
  fail(u, t, r) {
    const a = this.message(u, t, r);
    throw a.fatal = !0, a;
  }
  /**
   * Create an info message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `undefined` (info; change
   * likely not needed) and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */
  info(u, t, r) {
    const a = this.message(u, t, r);
    return a.fatal = void 0, a;
  }
  /**
   * Create a message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `false` (warning; change may be
   * needed) and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */
  message(u, t, r) {
    const a = new tu(
      // @ts-expect-error: the overloads are fine.
      u,
      t,
      r
    );
    return this.path && (a.name = this.path + ":" + a.name, a.file = this.path), a.fatal = !1, this.messages.push(a), a;
  }
  /**
   * Serialize the file.
   *
   * > **Note**: which encodings are supported depends on the engine.
   * > For info on Node.js, see:
   * > <https://nodejs.org/api/util.html#whatwg-supported-encodings>.
   *
   * @param {string | null | undefined} [encoding='utf8']
   *   Character encoding to understand `value` as when it’s a `Uint8Array`
   *   (default: `'utf-8'`).
   * @returns {string}
   *   Serialized file.
   */
  toString(u) {
    return this.value === void 0 ? "" : typeof this.value == "string" ? this.value : new TextDecoder(u || void 0).decode(this.value);
  }
}
function Fn(e, u) {
  if (e && e.includes(Hu.sep))
    throw new Error(
      "`" + u + "` cannot be a path: did not expect `" + Hu.sep + "`"
    );
}
function qn(e, u) {
  if (!e)
    throw new Error("`" + u + "` cannot be empty");
}
function js(e, u) {
  if (!e)
    throw new Error("Setting `" + u + "` requires `path` to be set too");
}
function nE(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const iE = {
  /** @type {ErrorInfo} */
  abandonedHeadElementChild: {
    reason: "Unexpected metadata element after head",
    description: "Unexpected element after head. Expected the element before `</head>`",
    url: !1
  },
  /** @type {ErrorInfo} */
  abruptClosingOfEmptyComment: {
    reason: "Unexpected abruptly closed empty comment",
    description: "Unexpected `>` or `->`. Expected `-->` to close comments"
  },
  /** @type {ErrorInfo} */
  abruptDoctypePublicIdentifier: {
    reason: "Unexpected abruptly closed public identifier",
    description: "Unexpected `>`. Expected a closing `\"` or `'` after the public identifier"
  },
  /** @type {ErrorInfo} */
  abruptDoctypeSystemIdentifier: {
    reason: "Unexpected abruptly closed system identifier",
    description: "Unexpected `>`. Expected a closing `\"` or `'` after the identifier identifier"
  },
  /** @type {ErrorInfo} */
  absenceOfDigitsInNumericCharacterReference: {
    reason: "Unexpected non-digit at start of numeric character reference",
    description: "Unexpected `%c`. Expected `[0-9]` for decimal references or `[0-9a-fA-F]` for hexadecimal references"
  },
  /** @type {ErrorInfo} */
  cdataInHtmlContent: {
    reason: "Unexpected CDATA section in HTML",
    description: "Unexpected `<![CDATA[` in HTML. Remove it, use a comment, or encode special characters instead"
  },
  /** @type {ErrorInfo} */
  characterReferenceOutsideUnicodeRange: {
    reason: "Unexpected too big numeric character reference",
    description: "Unexpectedly high character reference. Expected character references to be at most hexadecimal 10ffff (or decimal 1114111)"
  },
  /** @type {ErrorInfo} */
  closingOfElementWithOpenChildElements: {
    reason: "Unexpected closing tag with open child elements",
    description: "Unexpectedly closing tag. Expected other tags to be closed first",
    url: !1
  },
  /** @type {ErrorInfo} */
  controlCharacterInInputStream: {
    reason: "Unexpected control character",
    description: "Unexpected control character `%x`. Expected a non-control code point, 0x00, or ASCII whitespace"
  },
  /** @type {ErrorInfo} */
  controlCharacterReference: {
    reason: "Unexpected control character reference",
    description: "Unexpectedly control character in reference. Expected a non-control code point, 0x00, or ASCII whitespace"
  },
  /** @type {ErrorInfo} */
  disallowedContentInNoscriptInHead: {
    reason: "Disallowed content inside `<noscript>` in `<head>`",
    description: "Unexpected text character `%c`. Only use text in `<noscript>`s in `<body>`",
    url: !1
  },
  /** @type {ErrorInfo} */
  duplicateAttribute: {
    reason: "Unexpected duplicate attribute",
    description: "Unexpectedly double attribute. Expected attributes to occur only once"
  },
  /** @type {ErrorInfo} */
  endTagWithAttributes: {
    reason: "Unexpected attribute on closing tag",
    description: "Unexpected attribute. Expected `>` instead"
  },
  /** @type {ErrorInfo} */
  endTagWithTrailingSolidus: {
    reason: "Unexpected slash at end of closing tag",
    description: "Unexpected `%c-1`. Expected `>` instead"
  },
  /** @type {ErrorInfo} */
  endTagWithoutMatchingOpenElement: {
    reason: "Unexpected unopened end tag",
    description: "Unexpected end tag. Expected no end tag or another end tag",
    url: !1
  },
  /** @type {ErrorInfo} */
  eofBeforeTagName: {
    reason: "Unexpected end of file",
    description: "Unexpected end of file. Expected tag name instead"
  },
  /** @type {ErrorInfo} */
  eofInCdata: {
    reason: "Unexpected end of file in CDATA",
    description: "Unexpected end of file. Expected `]]>` to close the CDATA"
  },
  /** @type {ErrorInfo} */
  eofInComment: {
    reason: "Unexpected end of file in comment",
    description: "Unexpected end of file. Expected `-->` to close the comment"
  },
  /** @type {ErrorInfo} */
  eofInDoctype: {
    reason: "Unexpected end of file in doctype",
    description: "Unexpected end of file. Expected a valid doctype (such as `<!doctype html>`)"
  },
  /** @type {ErrorInfo} */
  eofInElementThatCanContainOnlyText: {
    reason: "Unexpected end of file in element that can only contain text",
    description: "Unexpected end of file. Expected text or a closing tag",
    url: !1
  },
  /** @type {ErrorInfo} */
  eofInScriptHtmlCommentLikeText: {
    reason: "Unexpected end of file in comment inside script",
    description: "Unexpected end of file. Expected `-->` to close the comment"
  },
  /** @type {ErrorInfo} */
  eofInTag: {
    reason: "Unexpected end of file in tag",
    description: "Unexpected end of file. Expected `>` to close the tag"
  },
  /** @type {ErrorInfo} */
  incorrectlyClosedComment: {
    reason: "Incorrectly closed comment",
    description: "Unexpected `%c-1`. Expected `-->` to close the comment"
  },
  /** @type {ErrorInfo} */
  incorrectlyOpenedComment: {
    reason: "Incorrectly opened comment",
    description: "Unexpected `%c`. Expected `<!--` to open the comment"
  },
  /** @type {ErrorInfo} */
  invalidCharacterSequenceAfterDoctypeName: {
    reason: "Invalid sequence after doctype name",
    description: "Unexpected sequence at `%c`. Expected `public` or `system`"
  },
  /** @type {ErrorInfo} */
  invalidFirstCharacterOfTagName: {
    reason: "Invalid first character in tag name",
    description: "Unexpected `%c`. Expected an ASCII letter instead"
  },
  /** @type {ErrorInfo} */
  misplacedDoctype: {
    reason: "Misplaced doctype",
    description: "Unexpected doctype. Expected doctype before head",
    url: !1
  },
  /** @type {ErrorInfo} */
  misplacedStartTagForHeadElement: {
    reason: "Misplaced `<head>` start tag",
    description: "Unexpected start tag `<head>`. Expected `<head>` directly after doctype",
    url: !1
  },
  /** @type {ErrorInfo} */
  missingAttributeValue: {
    reason: "Missing attribute value",
    description: "Unexpected `%c-1`. Expected an attribute value or no `%c-1` instead"
  },
  /** @type {ErrorInfo} */
  missingDoctype: {
    reason: "Missing doctype before other content",
    description: "Expected a `<!doctype html>` before anything else",
    url: !1
  },
  /** @type {ErrorInfo} */
  missingDoctypeName: {
    reason: "Missing doctype name",
    description: "Unexpected doctype end at `%c`. Expected `html` instead"
  },
  /** @type {ErrorInfo} */
  missingDoctypePublicIdentifier: {
    reason: "Missing public identifier in doctype",
    description: "Unexpected `%c`. Expected identifier for `public` instead"
  },
  /** @type {ErrorInfo} */
  missingDoctypeSystemIdentifier: {
    reason: "Missing system identifier in doctype",
    description: 'Unexpected `%c`. Expected identifier for `system` instead (suggested: `"about:legacy-compat"`)'
  },
  /** @type {ErrorInfo} */
  missingEndTagName: {
    reason: "Missing name in end tag",
    description: "Unexpected `%c`. Expected an ASCII letter instead"
  },
  /** @type {ErrorInfo} */
  missingQuoteBeforeDoctypePublicIdentifier: {
    reason: "Missing quote before public identifier in doctype",
    description: "Unexpected `%c`. Expected `\"` or `'` instead"
  },
  /** @type {ErrorInfo} */
  missingQuoteBeforeDoctypeSystemIdentifier: {
    reason: "Missing quote before system identifier in doctype",
    description: "Unexpected `%c`. Expected `\"` or `'` instead"
  },
  /** @type {ErrorInfo} */
  missingSemicolonAfterCharacterReference: {
    reason: "Missing semicolon after character reference",
    description: "Unexpected `%c`. Expected `;` instead"
  },
  /** @type {ErrorInfo} */
  missingWhitespaceAfterDoctypePublicKeyword: {
    reason: "Missing whitespace after public identifier in doctype",
    description: "Unexpected `%c`. Expected ASCII whitespace instead"
  },
  /** @type {ErrorInfo} */
  missingWhitespaceAfterDoctypeSystemKeyword: {
    reason: "Missing whitespace after system identifier in doctype",
    description: "Unexpected `%c`. Expected ASCII whitespace instead"
  },
  /** @type {ErrorInfo} */
  missingWhitespaceBeforeDoctypeName: {
    reason: "Missing whitespace before doctype name",
    description: "Unexpected `%c`. Expected ASCII whitespace instead"
  },
  /** @type {ErrorInfo} */
  missingWhitespaceBetweenAttributes: {
    reason: "Missing whitespace between attributes",
    description: "Unexpected `%c`. Expected ASCII whitespace instead"
  },
  /** @type {ErrorInfo} */
  missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers: {
    reason: "Missing whitespace between public and system identifiers in doctype",
    description: "Unexpected `%c`. Expected ASCII whitespace instead"
  },
  /** @type {ErrorInfo} */
  nestedComment: {
    reason: "Unexpected nested comment",
    description: "Unexpected `<!--`. Expected `-->`"
  },
  /** @type {ErrorInfo} */
  nestedNoscriptInHead: {
    reason: "Unexpected nested `<noscript>` in `<head>`",
    description: "Unexpected `<noscript>`. Expected a closing tag or a meta element",
    url: !1
  },
  /** @type {ErrorInfo} */
  nonConformingDoctype: {
    reason: "Unexpected non-conforming doctype declaration",
    description: 'Expected `<!doctype html>` or `<!doctype html system "about:legacy-compat">`',
    url: !1
  },
  /** @type {ErrorInfo} */
  nonVoidHtmlElementStartTagWithTrailingSolidus: {
    reason: "Unexpected trailing slash on start tag of non-void element",
    description: "Unexpected `/`. Expected `>` instead"
  },
  /** @type {ErrorInfo} */
  noncharacterCharacterReference: {
    reason: "Unexpected noncharacter code point referenced by character reference",
    description: "Unexpected code point. Do not use noncharacters in HTML"
  },
  /** @type {ErrorInfo} */
  noncharacterInInputStream: {
    reason: "Unexpected noncharacter character",
    description: "Unexpected code point `%x`. Do not use noncharacters in HTML"
  },
  /** @type {ErrorInfo} */
  nullCharacterReference: {
    reason: "Unexpected NULL character referenced by character reference",
    description: "Unexpected code point. Do not use NULL characters in HTML"
  },
  /** @type {ErrorInfo} */
  openElementsLeftAfterEof: {
    reason: "Unexpected end of file",
    description: "Unexpected end of file. Expected closing tag instead",
    url: !1
  },
  /** @type {ErrorInfo} */
  surrogateCharacterReference: {
    reason: "Unexpected surrogate character referenced by character reference",
    description: "Unexpected code point. Do not use lone surrogate characters in HTML"
  },
  /** @type {ErrorInfo} */
  surrogateInInputStream: {
    reason: "Unexpected surrogate character",
    description: "Unexpected code point `%x`. Do not use lone surrogate characters in HTML"
  },
  /** @type {ErrorInfo} */
  unexpectedCharacterAfterDoctypeSystemIdentifier: {
    reason: "Invalid character after system identifier in doctype",
    description: "Unexpected character at `%c`. Expected `>`"
  },
  /** @type {ErrorInfo} */
  unexpectedCharacterInAttributeName: {
    reason: "Unexpected character in attribute name",
    description: "Unexpected `%c`. Expected whitespace, `/`, `>`, `=`, or probably an ASCII letter"
  },
  /** @type {ErrorInfo} */
  unexpectedCharacterInUnquotedAttributeValue: {
    reason: "Unexpected character in unquoted attribute value",
    description: "Unexpected `%c`. Quote the attribute value to include it"
  },
  /** @type {ErrorInfo} */
  unexpectedEqualsSignBeforeAttributeName: {
    reason: "Unexpected equals sign before attribute name",
    description: "Unexpected `%c`. Add an attribute name before it"
  },
  /** @type {ErrorInfo} */
  unexpectedNullCharacter: {
    reason: "Unexpected NULL character",
    description: "Unexpected code point `%x`. Do not use NULL characters in HTML"
  },
  /** @type {ErrorInfo} */
  unexpectedQuestionMarkInsteadOfTagName: {
    reason: "Unexpected question mark instead of tag name",
    description: "Unexpected `%c`. Expected an ASCII letter instead"
  },
  /** @type {ErrorInfo} */
  unexpectedSolidusInTag: {
    reason: "Unexpected slash in tag",
    description: "Unexpected `%c-1`. Expected it followed by `>` or in a quoted attribute value"
  },
  /** @type {ErrorInfo} */
  unknownNamedCharacterReference: {
    reason: "Unexpected unknown named character reference",
    description: "Unexpected character reference. Expected known named character references"
  }
}, cE = "https://html.spec.whatwg.org/multipage/parsing.html#parse-error-", sE = /-[a-z]/g, oE = /%c(?:([-+])(\d+))?/g, dE = /%x/g, lE = { 2: !0, 1: !1, 0: null }, fE = {};
function bE(e, u) {
  const t = u || fE, r = t.onerror, a = e instanceof ki ? e : new ki(e), n = t.fragment ? er.parseFragment : er.parse, i = String(a), s = n(i, {
    sourceCodeLocationInfo: !0,
    // Note `parse5` types currently do not allow `undefined`.
    onParseError: t.onerror ? o : null,
    scriptingEnabled: !1
  });
  return (
    /** @type {Root} */
    Vg(s, {
      file: a,
      space: t.space,
      verbose: t.verbose
    })
  );
  function o(d) {
    const c = d.code, E = hE(c), f = t[E], m = f ?? !0, v = typeof m == "number" ? m : m ? 1 : 0;
    if (v) {
      const N = iE[E], O = new tu(L(N.reason), {
        place: {
          start: {
            line: d.startLine,
            column: d.startCol,
            offset: d.startOffset
          },
          end: {
            line: d.endLine,
            column: d.endCol,
            offset: d.endOffset
          }
        },
        ruleId: c,
        source: "hast-util-from-html"
      });
      a.path && (O.file = a.path, O.name = a.path + ":" + O.name), O.fatal = lE[v], O.note = L(N.description), O.url = N.url === !1 ? void 0 : cE + c, r(O);
    }
    function L(N) {
      return N.replace(oE, O).replace(dE, w);
      function O(H, k, R) {
        const G = (R ? Number.parseInt(R, 10) : 0) * (k === "-" ? -1 : 1), X = i.charAt(d.startOffset + G);
        return mE(X);
      }
      function w() {
        return gE(i.charCodeAt(d.startOffset));
      }
    }
  }
}
function hE(e) {
  return (
    /** @type {ErrorCode} */
    e.replace(sE, pE)
  );
}
function pE(e) {
  return e.charAt(1).toUpperCase();
}
function mE(e) {
  return e === "`" ? "` ` `" : e;
}
function gE(e) {
  return "0x" + e.toString(16).toUpperCase();
}
function EE(e) {
  const u = this, { emitParseErrors: t, ...r } = { ...u.data("settings"), ...e };
  u.parser = a;
  function a(n, i) {
    return bE(n, {
      ...r,
      onerror: t ? function(s) {
        i.path && (s.name = i.path + ":" + s.name, s.file = i.path), i.messages.push(s);
      } : void 0
    });
  }
}
const TE = [
  "area",
  "base",
  "basefont",
  "bgsound",
  "br",
  "col",
  "command",
  "embed",
  "frame",
  "hr",
  "image",
  "img",
  "input",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
], $s = {}.hasOwnProperty;
function Tf(e, u) {
  const t = u || {};
  function r(a, ...n) {
    let i = r.invalid;
    const s = r.handlers;
    if (a && $s.call(a, e)) {
      const o = String(a[e]);
      i = $s.call(s, o) ? s[o] : r.unknown;
    }
    if (i)
      return i.call(this, a, ...n);
  }
  return r.handlers = t.handlers || {}, r.invalid = t.invalid, r.unknown = t.unknown, r;
}
function _E(e, u) {
  if (e = e.replace(
    u.subset ? yE(u.subset) : /["&'<>`]/g,
    r
  ), u.subset || u.escapeOnly)
    return e;
  return e.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, t).replace(
    // eslint-disable-next-line no-control-regex, unicorn/no-hex-escape
    /[\x01-\t\v\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g,
    r
  );
  function t(a, n, i) {
    return u.format(
      (a.charCodeAt(0) - 55296) * 1024 + a.charCodeAt(1) - 56320 + 65536,
      i.charCodeAt(n + 2),
      u
    );
  }
  function r(a, n, i) {
    return u.format(
      a.charCodeAt(0),
      i.charCodeAt(n + 1),
      u
    );
  }
}
function yE(e) {
  const u = [];
  let t = -1;
  for (; ++t < e.length; )
    u.push(e[t].replace(/[|\\{}()[\]^$+*?.]/g, "\\$&"));
  return new RegExp("(?:" + u.join("|") + ")", "g");
}
function AE(e, u, t) {
  const r = "&#x" + e.toString(16).toUpperCase();
  return t && u && !/[\dA-Fa-f]/.test(String.fromCharCode(u)) ? r : r + ";";
}
function vE(e, u, t) {
  const r = "&#" + String(e);
  return t && u && !/\d/.test(String.fromCharCode(u)) ? r : r + ";";
}
const xE = [
  "AElig",
  "AMP",
  "Aacute",
  "Acirc",
  "Agrave",
  "Aring",
  "Atilde",
  "Auml",
  "COPY",
  "Ccedil",
  "ETH",
  "Eacute",
  "Ecirc",
  "Egrave",
  "Euml",
  "GT",
  "Iacute",
  "Icirc",
  "Igrave",
  "Iuml",
  "LT",
  "Ntilde",
  "Oacute",
  "Ocirc",
  "Ograve",
  "Oslash",
  "Otilde",
  "Ouml",
  "QUOT",
  "REG",
  "THORN",
  "Uacute",
  "Ucirc",
  "Ugrave",
  "Uuml",
  "Yacute",
  "aacute",
  "acirc",
  "acute",
  "aelig",
  "agrave",
  "amp",
  "aring",
  "atilde",
  "auml",
  "brvbar",
  "ccedil",
  "cedil",
  "cent",
  "copy",
  "curren",
  "deg",
  "divide",
  "eacute",
  "ecirc",
  "egrave",
  "eth",
  "euml",
  "frac12",
  "frac14",
  "frac34",
  "gt",
  "iacute",
  "icirc",
  "iexcl",
  "igrave",
  "iquest",
  "iuml",
  "laquo",
  "lt",
  "macr",
  "micro",
  "middot",
  "nbsp",
  "not",
  "ntilde",
  "oacute",
  "ocirc",
  "ograve",
  "ordf",
  "ordm",
  "oslash",
  "otilde",
  "ouml",
  "para",
  "plusmn",
  "pound",
  "quot",
  "raquo",
  "reg",
  "sect",
  "shy",
  "sup1",
  "sup2",
  "sup3",
  "szlig",
  "thorn",
  "times",
  "uacute",
  "ucirc",
  "ugrave",
  "uml",
  "uuml",
  "yacute",
  "yen",
  "yuml"
], Gn = {
  nbsp: " ",
  iexcl: "¡",
  cent: "¢",
  pound: "£",
  curren: "¤",
  yen: "¥",
  brvbar: "¦",
  sect: "§",
  uml: "¨",
  copy: "©",
  ordf: "ª",
  laquo: "«",
  not: "¬",
  shy: "­",
  reg: "®",
  macr: "¯",
  deg: "°",
  plusmn: "±",
  sup2: "²",
  sup3: "³",
  acute: "´",
  micro: "µ",
  para: "¶",
  middot: "·",
  cedil: "¸",
  sup1: "¹",
  ordm: "º",
  raquo: "»",
  frac14: "¼",
  frac12: "½",
  frac34: "¾",
  iquest: "¿",
  Agrave: "À",
  Aacute: "Á",
  Acirc: "Â",
  Atilde: "Ã",
  Auml: "Ä",
  Aring: "Å",
  AElig: "Æ",
  Ccedil: "Ç",
  Egrave: "È",
  Eacute: "É",
  Ecirc: "Ê",
  Euml: "Ë",
  Igrave: "Ì",
  Iacute: "Í",
  Icirc: "Î",
  Iuml: "Ï",
  ETH: "Ð",
  Ntilde: "Ñ",
  Ograve: "Ò",
  Oacute: "Ó",
  Ocirc: "Ô",
  Otilde: "Õ",
  Ouml: "Ö",
  times: "×",
  Oslash: "Ø",
  Ugrave: "Ù",
  Uacute: "Ú",
  Ucirc: "Û",
  Uuml: "Ü",
  Yacute: "Ý",
  THORN: "Þ",
  szlig: "ß",
  agrave: "à",
  aacute: "á",
  acirc: "â",
  atilde: "ã",
  auml: "ä",
  aring: "å",
  aelig: "æ",
  ccedil: "ç",
  egrave: "è",
  eacute: "é",
  ecirc: "ê",
  euml: "ë",
  igrave: "ì",
  iacute: "í",
  icirc: "î",
  iuml: "ï",
  eth: "ð",
  ntilde: "ñ",
  ograve: "ò",
  oacute: "ó",
  ocirc: "ô",
  otilde: "õ",
  ouml: "ö",
  divide: "÷",
  oslash: "ø",
  ugrave: "ù",
  uacute: "ú",
  ucirc: "û",
  uuml: "ü",
  yacute: "ý",
  thorn: "þ",
  yuml: "ÿ",
  fnof: "ƒ",
  Alpha: "Α",
  Beta: "Β",
  Gamma: "Γ",
  Delta: "Δ",
  Epsilon: "Ε",
  Zeta: "Ζ",
  Eta: "Η",
  Theta: "Θ",
  Iota: "Ι",
  Kappa: "Κ",
  Lambda: "Λ",
  Mu: "Μ",
  Nu: "Ν",
  Xi: "Ξ",
  Omicron: "Ο",
  Pi: "Π",
  Rho: "Ρ",
  Sigma: "Σ",
  Tau: "Τ",
  Upsilon: "Υ",
  Phi: "Φ",
  Chi: "Χ",
  Psi: "Ψ",
  Omega: "Ω",
  alpha: "α",
  beta: "β",
  gamma: "γ",
  delta: "δ",
  epsilon: "ε",
  zeta: "ζ",
  eta: "η",
  theta: "θ",
  iota: "ι",
  kappa: "κ",
  lambda: "λ",
  mu: "μ",
  nu: "ν",
  xi: "ξ",
  omicron: "ο",
  pi: "π",
  rho: "ρ",
  sigmaf: "ς",
  sigma: "σ",
  tau: "τ",
  upsilon: "υ",
  phi: "φ",
  chi: "χ",
  psi: "ψ",
  omega: "ω",
  thetasym: "ϑ",
  upsih: "ϒ",
  piv: "ϖ",
  bull: "•",
  hellip: "…",
  prime: "′",
  Prime: "″",
  oline: "‾",
  frasl: "⁄",
  weierp: "℘",
  image: "ℑ",
  real: "ℜ",
  trade: "™",
  alefsym: "ℵ",
  larr: "←",
  uarr: "↑",
  rarr: "→",
  darr: "↓",
  harr: "↔",
  crarr: "↵",
  lArr: "⇐",
  uArr: "⇑",
  rArr: "⇒",
  dArr: "⇓",
  hArr: "⇔",
  forall: "∀",
  part: "∂",
  exist: "∃",
  empty: "∅",
  nabla: "∇",
  isin: "∈",
  notin: "∉",
  ni: "∋",
  prod: "∏",
  sum: "∑",
  minus: "−",
  lowast: "∗",
  radic: "√",
  prop: "∝",
  infin: "∞",
  ang: "∠",
  and: "∧",
  or: "∨",
  cap: "∩",
  cup: "∪",
  int: "∫",
  there4: "∴",
  sim: "∼",
  cong: "≅",
  asymp: "≈",
  ne: "≠",
  equiv: "≡",
  le: "≤",
  ge: "≥",
  sub: "⊂",
  sup: "⊃",
  nsub: "⊄",
  sube: "⊆",
  supe: "⊇",
  oplus: "⊕",
  otimes: "⊗",
  perp: "⊥",
  sdot: "⋅",
  lceil: "⌈",
  rceil: "⌉",
  lfloor: "⌊",
  rfloor: "⌋",
  lang: "〈",
  rang: "〉",
  loz: "◊",
  spades: "♠",
  clubs: "♣",
  hearts: "♥",
  diams: "♦",
  quot: '"',
  amp: "&",
  lt: "<",
  gt: ">",
  OElig: "Œ",
  oelig: "œ",
  Scaron: "Š",
  scaron: "š",
  Yuml: "Ÿ",
  circ: "ˆ",
  tilde: "˜",
  ensp: " ",
  emsp: " ",
  thinsp: " ",
  zwnj: "‌",
  zwj: "‍",
  lrm: "‎",
  rlm: "‏",
  ndash: "–",
  mdash: "—",
  lsquo: "‘",
  rsquo: "’",
  sbquo: "‚",
  ldquo: "“",
  rdquo: "”",
  bdquo: "„",
  dagger: "†",
  Dagger: "‡",
  permil: "‰",
  lsaquo: "‹",
  rsaquo: "›",
  euro: "€"
}, NE = [
  "cent",
  "copy",
  "divide",
  "gt",
  "lt",
  "not",
  "para",
  "times"
], _f = {}.hasOwnProperty, Bi = {};
let Fr;
for (Fr in Gn)
  _f.call(Gn, Fr) && (Bi[Gn[Fr]] = Fr);
function IE(e, u, t, r) {
  const a = String.fromCharCode(e);
  if (_f.call(Bi, a)) {
    const n = Bi[a], i = "&" + n;
    return t && xE.includes(n) && !NE.includes(n) && (!r || u && u !== 61 && /[^\da-z]/i.test(String.fromCharCode(u))) ? i : i + ";";
  }
  return "";
}
function DE(e, u, t) {
  let r = AE(e, u, t.omitOptionalSemicolons), a;
  if ((t.useNamedReferences || t.useShortestReferences) && (a = IE(
    e,
    u,
    t.omitOptionalSemicolons,
    t.attribute
  )), (t.useShortestReferences || !a) && t.useShortestReferences) {
    const n = vE(e, u, t.omitOptionalSemicolons);
    n.length < r.length && (r = n);
  }
  return a && (!t.useShortestReferences || a.length < r.length) ? a : r;
}
function l0(e, u) {
  return _E(e, Object.assign({ format: DE }, u));
}
function CE(e, u, t, r) {
  return r.settings.bogusComments ? "<?" + l0(
    e.value,
    Object.assign({}, r.settings.characterReferences, { subset: [">"] })
  ) + ">" : "<!--" + e.value.replace(/^>|^->|<!--|-->|--!>|<!-$/g, a) + "-->";
  function a(n) {
    return l0(
      n,
      Object.assign({}, r.settings.characterReferences, {
        subset: ["<", ">"]
      })
    );
  }
}
function SE(e, u, t, r) {
  return "<!" + (r.settings.upperDoctype ? "DOCTYPE" : "doctype") + (r.settings.tightDoctype ? "" : " ") + "html>";
}
function Vs(e, u) {
  const t = String(e);
  if (typeof u != "string")
    throw new TypeError("Expected character");
  let r = 0, a = t.indexOf(u);
  for (; a !== -1; )
    r++, a = t.indexOf(u, a + u.length);
  return r;
}
const OE = /[ \t\n\f\r]/g;
function pn(e) {
  return typeof e == "object" ? e.type === "text" ? Ys(e.value) : !1 : Ys(e);
}
function Ys(e) {
  return e.replace(OE, "") === "";
}
const qe = Af(1), yf = Af(-1), LE = [];
function Af(e) {
  return u;
  function u(t, r, a) {
    const n = t ? t.children : LE;
    let i = (r || 0) + e, s = n[i];
    if (!a)
      for (; s && pn(s); )
        i += e, s = n[i];
    return s;
  }
}
const PE = {}.hasOwnProperty;
function vf(e) {
  return u;
  function u(t, r, a) {
    return PE.call(e, t.tagName) && e[t.tagName](t, r, a);
  }
}
const Fc = vf({
  body: RE,
  caption: jn,
  colgroup: jn,
  dd: UE,
  dt: BE,
  head: jn,
  html: wE,
  li: kE,
  optgroup: HE,
  option: FE,
  p: ME,
  rp: Ws,
  rt: Ws,
  tbody: GE,
  td: Xs,
  tfoot: jE,
  th: Xs,
  thead: qE,
  tr: $E
});
function jn(e, u, t) {
  const r = qe(t, u, !0);
  return !r || r.type !== "comment" && !(r.type === "text" && pn(r.value.charAt(0)));
}
function wE(e, u, t) {
  const r = qe(t, u);
  return !r || r.type !== "comment";
}
function RE(e, u, t) {
  const r = qe(t, u);
  return !r || r.type !== "comment";
}
function ME(e, u, t) {
  const r = qe(t, u);
  return r ? r.type === "element" && (r.tagName === "address" || r.tagName === "article" || r.tagName === "aside" || r.tagName === "blockquote" || r.tagName === "details" || r.tagName === "div" || r.tagName === "dl" || r.tagName === "fieldset" || r.tagName === "figcaption" || r.tagName === "figure" || r.tagName === "footer" || r.tagName === "form" || r.tagName === "h1" || r.tagName === "h2" || r.tagName === "h3" || r.tagName === "h4" || r.tagName === "h5" || r.tagName === "h6" || r.tagName === "header" || r.tagName === "hgroup" || r.tagName === "hr" || r.tagName === "main" || r.tagName === "menu" || r.tagName === "nav" || r.tagName === "ol" || r.tagName === "p" || r.tagName === "pre" || r.tagName === "section" || r.tagName === "table" || r.tagName === "ul") : !t || // Confusing parent.
  !(t.type === "element" && (t.tagName === "a" || t.tagName === "audio" || t.tagName === "del" || t.tagName === "ins" || t.tagName === "map" || t.tagName === "noscript" || t.tagName === "video"));
}
function kE(e, u, t) {
  const r = qe(t, u);
  return !r || r.type === "element" && r.tagName === "li";
}
function BE(e, u, t) {
  const r = qe(t, u);
  return !!(r && r.type === "element" && (r.tagName === "dt" || r.tagName === "dd"));
}
function UE(e, u, t) {
  const r = qe(t, u);
  return !r || r.type === "element" && (r.tagName === "dt" || r.tagName === "dd");
}
function Ws(e, u, t) {
  const r = qe(t, u);
  return !r || r.type === "element" && (r.tagName === "rp" || r.tagName === "rt");
}
function HE(e, u, t) {
  const r = qe(t, u);
  return !r || r.type === "element" && r.tagName === "optgroup";
}
function FE(e, u, t) {
  const r = qe(t, u);
  return !r || r.type === "element" && (r.tagName === "option" || r.tagName === "optgroup");
}
function qE(e, u, t) {
  const r = qe(t, u);
  return !!(r && r.type === "element" && (r.tagName === "tbody" || r.tagName === "tfoot"));
}
function GE(e, u, t) {
  const r = qe(t, u);
  return !r || r.type === "element" && (r.tagName === "tbody" || r.tagName === "tfoot");
}
function jE(e, u, t) {
  return !qe(t, u);
}
function $E(e, u, t) {
  const r = qe(t, u);
  return !r || r.type === "element" && r.tagName === "tr";
}
function Xs(e, u, t) {
  const r = qe(t, u);
  return !r || r.type === "element" && (r.tagName === "td" || r.tagName === "th");
}
const VE = vf({
  body: XE,
  colgroup: zE,
  head: WE,
  html: YE,
  tbody: QE
});
function YE(e) {
  const u = qe(e, -1);
  return !u || u.type !== "comment";
}
function WE(e) {
  const u = e.children, t = [];
  let r = -1;
  for (; ++r < u.length; ) {
    const a = u[r];
    if (a.type === "element" && (a.tagName === "title" || a.tagName === "base")) {
      if (t.includes(a.tagName))
        return !1;
      t.push(a.tagName);
    }
  }
  return u.length > 0;
}
function XE(e) {
  const u = qe(e, -1, !0);
  return !u || u.type !== "comment" && !(u.type === "text" && pn(u.value.charAt(0))) && !(u.type === "element" && (u.tagName === "meta" || u.tagName === "link" || u.tagName === "script" || u.tagName === "style" || u.tagName === "template"));
}
function zE(e, u, t) {
  const r = yf(t, u), a = qe(e, -1, !0);
  return t && r && r.type === "element" && r.tagName === "colgroup" && Fc(r, t.children.indexOf(r), t) ? !1 : !!(a && a.type === "element" && a.tagName === "col");
}
function QE(e, u, t) {
  const r = yf(t, u), a = qe(e, -1);
  return t && r && r.type === "element" && (r.tagName === "thead" || r.tagName === "tbody") && Fc(r, t.children.indexOf(r), t) ? !1 : !!(a && a.type === "element" && a.tagName === "tr");
}
const qr = {
  // See: <https://html.spec.whatwg.org/#attribute-name-state>.
  name: [
    [`	
\f\r &/=>`.split(""), `	
\f\r "&'/=>\``.split("")],
    [`\0	
\f\r "&'/<=>`.split(""), `\0	
\f\r "&'/<=>\``.split("")]
  ],
  // See: <https://html.spec.whatwg.org/#attribute-value-(unquoted)-state>.
  unquoted: [
    [`	
\f\r &>`.split(""), `\0	
\f\r "&'<=>\``.split("")],
    [`\0	
\f\r "&'<=>\``.split(""), `\0	
\f\r "&'<=>\``.split("")]
  ],
  // See: <https://html.spec.whatwg.org/#attribute-value-(single-quoted)-state>.
  single: [
    ["&'".split(""), "\"&'`".split("")],
    ["\0&'".split(""), "\0\"&'`".split("")]
  ],
  // See: <https://html.spec.whatwg.org/#attribute-value-(double-quoted)-state>.
  double: [
    ['"&'.split(""), "\"&'`".split("")],
    ['\0"&'.split(""), "\0\"&'`".split("")]
  ]
};
function KE(e, u, t, r) {
  const a = r.schema, n = a.space === "svg" ? !1 : r.settings.omitOptionalTags;
  let i = a.space === "svg" ? r.settings.closeEmptyElements : r.settings.voids.includes(e.tagName.toLowerCase());
  const s = [];
  let o;
  a.space === "html" && e.tagName === "svg" && (r.schema = Vt);
  const d = JE(r, e.properties), c = r.all(
    a.space === "html" && e.tagName === "template" ? e.content : e
  );
  return r.schema = a, c && (i = !1), (d || !n || !VE(e, u, t)) && (s.push("<", e.tagName, d ? " " + d : ""), i && (a.space === "svg" || r.settings.closeSelfClosing) && (o = d.charAt(d.length - 1), (!r.settings.tightSelfClosing || o === "/" || o && o !== '"' && o !== "'") && s.push(" "), s.push("/")), s.push(">")), s.push(c), !i && (!n || !Fc(e, u, t)) && s.push("</" + e.tagName + ">"), s.join("");
}
function JE(e, u) {
  const t = [];
  let r = -1, a;
  if (u) {
    for (a in u)
      if (u[a] !== null && u[a] !== void 0) {
        const n = ZE(e, a, u[a]);
        n && t.push(n);
      }
  }
  for (; ++r < t.length; ) {
    const n = e.settings.tightAttributes ? t[r].charAt(t[r].length - 1) : void 0;
    r !== t.length - 1 && n !== '"' && n !== "'" && (t[r] += " ");
  }
  return t.join("");
}
function ZE(e, u, t) {
  const r = hn(e.schema, u), a = e.settings.allowParseErrors && e.schema.space === "html" ? 0 : 1, n = e.settings.allowDangerousCharacters ? 0 : 1;
  let i = e.quote, s;
  if (r.overloadedBoolean && (t === r.attribute || t === "") ? t = !0 : (r.boolean || r.overloadedBoolean && typeof t != "string") && (t = !!t), t == null || t === !1 || typeof t == "number" && Number.isNaN(t))
    return "";
  const o = l0(
    r.attribute,
    Object.assign({}, e.settings.characterReferences, {
      // Always encode without parse errors in non-HTML.
      subset: qr.name[a][n]
    })
  );
  return t === !0 || (t = Array.isArray(t) ? (r.commaSeparated ? hf : pf)(t, {
    padLeft: !e.settings.tightCommaSeparatedLists
  }) : String(t), e.settings.collapseEmptyAttributes && !t) ? o : (e.settings.preferUnquoted && (s = l0(
    t,
    Object.assign({}, e.settings.characterReferences, {
      attribute: !0,
      subset: qr.unquoted[a][n]
    })
  )), s !== t && (e.settings.quoteSmart && Vs(t, i) > Vs(t, e.alternative) && (i = e.alternative), s = i + l0(
    t,
    Object.assign({}, e.settings.characterReferences, {
      // Always encode without parse errors in non-HTML.
      subset: (i === "'" ? qr.single : qr.double)[a][n],
      attribute: !0
    })
  ) + i), o + (s && "=" + s));
}
function xf(e, u, t, r) {
  return t && t.type === "element" && (t.tagName === "script" || t.tagName === "style") ? e.value : l0(
    e.value,
    Object.assign({}, r.settings.characterReferences, {
      subset: ["<", "&"]
    })
  );
}
function eT(e, u, t, r) {
  return r.settings.allowDangerousHtml ? e.value : xf(e, u, t, r);
}
function uT(e, u, t, r) {
  return r.all(e);
}
const tT = Tf("type", {
  invalid: rT,
  unknown: aT,
  handlers: { comment: CE, doctype: SE, element: KE, raw: eT, root: uT, text: xf }
});
function rT(e) {
  throw new Error("Expected node, not `" + e + "`");
}
function aT(e) {
  const u = (
    /** @type {Nodes} */
    e
  );
  throw new Error("Cannot compile unknown node `" + u.type + "`");
}
const nT = {}, iT = {}, cT = [];
function sT(e, u) {
  const t = u || nT, r = t.quote || '"', a = r === '"' ? "'" : '"';
  if (r !== '"' && r !== "'")
    throw new Error("Invalid quote `" + r + "`, expected `'` or `\"`");
  return {
    one: oT,
    all: dT,
    settings: {
      omitOptionalTags: t.omitOptionalTags || !1,
      allowParseErrors: t.allowParseErrors || !1,
      allowDangerousCharacters: t.allowDangerousCharacters || !1,
      quoteSmart: t.quoteSmart || !1,
      preferUnquoted: t.preferUnquoted || !1,
      tightAttributes: t.tightAttributes || !1,
      upperDoctype: t.upperDoctype || !1,
      tightDoctype: t.tightDoctype || !1,
      bogusComments: t.bogusComments || !1,
      tightCommaSeparatedLists: t.tightCommaSeparatedLists || !1,
      tightSelfClosing: t.tightSelfClosing || !1,
      collapseEmptyAttributes: t.collapseEmptyAttributes || !1,
      allowDangerousHtml: t.allowDangerousHtml || !1,
      voids: t.voids || TE,
      characterReferences: t.characterReferences || iT,
      closeSelfClosing: t.closeSelfClosing || !1,
      closeEmptyElements: t.closeEmptyElements || !1
    },
    schema: t.space === "svg" ? Vt : Dr,
    quote: r,
    alternative: a
  }.one(
    Array.isArray(e) ? { type: "root", children: e } : e,
    void 0,
    void 0
  );
}
function oT(e, u, t) {
  return tT(e, u, t, this);
}
function dT(e) {
  const u = [], t = e && e.children || cT;
  let r = -1;
  for (; ++r < t.length; )
    u[r] = this.one(t[r], r, e);
  return u.join("");
}
function Nf(e) {
  const u = this, t = { ...u.data("settings"), ...e };
  u.compiler = r;
  function r(a) {
    return sT(a, t);
  }
}
function zs(e) {
  if (e)
    throw e;
}
var Jr = Object.prototype.hasOwnProperty, If = Object.prototype.toString, Qs = Object.defineProperty, Ks = Object.getOwnPropertyDescriptor, Js = function(u) {
  return typeof Array.isArray == "function" ? Array.isArray(u) : If.call(u) === "[object Array]";
}, Zs = function(u) {
  if (!u || If.call(u) !== "[object Object]")
    return !1;
  var t = Jr.call(u, "constructor"), r = u.constructor && u.constructor.prototype && Jr.call(u.constructor.prototype, "isPrototypeOf");
  if (u.constructor && !t && !r)
    return !1;
  var a;
  for (a in u)
    ;
  return typeof a > "u" || Jr.call(u, a);
}, eo = function(u, t) {
  Qs && t.name === "__proto__" ? Qs(u, t.name, {
    enumerable: !0,
    configurable: !0,
    value: t.newValue,
    writable: !0
  }) : u[t.name] = t.newValue;
}, uo = function(u, t) {
  if (t === "__proto__")
    if (Jr.call(u, t)) {
      if (Ks)
        return Ks(u, t).value;
    } else
      return;
  return u[t];
}, lT = function e() {
  var u, t, r, a, n, i, s = arguments[0], o = 1, d = arguments.length, c = !1;
  for (typeof s == "boolean" && (c = s, s = arguments[1] || {}, o = 2), (s == null || typeof s != "object" && typeof s != "function") && (s = {}); o < d; ++o)
    if (u = arguments[o], u != null)
      for (t in u)
        r = uo(s, t), a = uo(u, t), s !== a && (c && a && (Zs(a) || (n = Js(a))) ? (n ? (n = !1, i = r && Js(r) ? r : []) : i = r && Zs(r) ? r : {}, eo(s, { name: t, newValue: e(c, i, a) })) : typeof a < "u" && eo(s, { name: t, newValue: a }));
  return s;
};
const $n = /* @__PURE__ */ $i(lT);
function Ui(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const u = Object.getPrototypeOf(e);
  return (u === null || u === Object.prototype || Object.getPrototypeOf(u) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function fT() {
  const e = [], u = { run: t, use: r };
  return u;
  function t(...a) {
    let n = -1;
    const i = a.pop();
    if (typeof i != "function")
      throw new TypeError("Expected function as last argument, not " + i);
    s(null, ...a);
    function s(o, ...d) {
      const c = e[++n];
      let E = -1;
      if (o) {
        i(o);
        return;
      }
      for (; ++E < a.length; )
        (d[E] === null || d[E] === void 0) && (d[E] = a[E]);
      a = d, c ? bT(c, s)(...d) : i(null, ...d);
    }
  }
  function r(a) {
    if (typeof a != "function")
      throw new TypeError(
        "Expected `middelware` to be a function, not " + a
      );
    return e.push(a), u;
  }
}
function bT(e, u) {
  let t;
  return r;
  function r(...i) {
    const s = e.length > i.length;
    let o;
    s && i.push(a);
    try {
      o = e.apply(this, i);
    } catch (d) {
      const c = (
        /** @type {Error} */
        d
      );
      if (s && t)
        throw c;
      return a(c);
    }
    s || (o instanceof Promise ? o.then(n, a) : o instanceof Error ? a(o) : n(o));
  }
  function a(i, ...s) {
    t || (t = !0, u(i, ...s));
  }
  function n(i) {
    a(null, i);
  }
}
const hT = (
  /**
   * @type {new <Parameters extends Array<unknown>, Result>(property: string | symbol) => (...parameters: Parameters) => Result}
   */
  /** @type {unknown} */
  /**
   * @this {Function}
   * @param {string | symbol} property
   * @returns {(...parameters: Array<unknown>) => unknown}
   */
  function(e) {
    const r = (
      /** @type {Record<string | symbol, Function>} */
      // Prototypes do exist.
      // type-coverage:ignore-next-line
      this.constructor.prototype
    ), a = r[e], n = function() {
      return a.apply(n, arguments);
    };
    Object.setPrototypeOf(n, r);
    const i = Object.getOwnPropertyNames(a);
    for (const s of i) {
      const o = Object.getOwnPropertyDescriptor(a, s);
      o && Object.defineProperty(n, s, o);
    }
    return n;
  }
), pT = {}.hasOwnProperty;
class qc extends hT {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = fT();
  }
  /**
   * Copy a processor.
   *
   * @deprecated
   *   This is a private internal method and should not be used.
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   New *unfrozen* processor ({@link Processor `Processor`}) that is
   *   configured to work the same as its ancestor.
   *   When the descendant processor is configured in the future it does not
   *   affect the ancestral processor.
   */
  copy() {
    const u = (
      /** @type {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>} */
      new qc()
    );
    let t = -1;
    for (; ++t < this.attachers.length; ) {
      const r = this.attachers[t];
      u.use(...r);
    }
    return u.data($n(!0, {}, this.namespace)), u;
  }
  /**
   * Configure the processor with info available to all plugins.
   * Information is stored in an object.
   *
   * Typically, options can be given to a specific plugin, but sometimes it
   * makes sense to have information shared with several plugins.
   * For example, a list of HTML elements that are self-closing, which is
   * needed during all phases.
   *
   * > 👉 **Note**: setting information cannot occur on *frozen* processors.
   * > Call the processor first to create a new unfrozen processor.
   *
   * > 👉 **Note**: to register custom data in TypeScript, augment the
   * > {@link Data `Data`} interface.
   *
   * @example
   *   This example show how to get and set info:
   *
   *   ```js
   *   import {unified} from 'unified'
   *
   *   const processor = unified().data('alpha', 'bravo')
   *
   *   processor.data('alpha') // => 'bravo'
   *
   *   processor.data() // => {alpha: 'bravo'}
   *
   *   processor.data({charlie: 'delta'})
   *
   *   processor.data() // => {charlie: 'delta'}
   *   ```
   *
   * @template {keyof Data} Key
   *
   * @overload
   * @returns {Data}
   *
   * @overload
   * @param {Data} dataset
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {Key} key
   * @returns {Data[Key]}
   *
   * @overload
   * @param {Key} key
   * @param {Data[Key]} value
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @param {Data | Key} [key]
   *   Key to get or set, or entire dataset to set, or nothing to get the
   *   entire dataset (optional).
   * @param {Data[Key]} [value]
   *   Value to set (optional).
   * @returns {unknown}
   *   The current processor when setting, the value at `key` when getting, or
   *   the entire dataset when getting without key.
   */
  data(u, t) {
    return typeof u == "string" ? arguments.length === 2 ? (Wn("data", this.frozen), this.namespace[u] = t, this) : pT.call(this.namespace, u) && this.namespace[u] || void 0 : u ? (Wn("data", this.frozen), this.namespace = u, this) : this.namespace;
  }
  /**
   * Freeze a processor.
   *
   * Frozen processors are meant to be extended and not to be configured
   * directly.
   *
   * When a processor is frozen it cannot be unfrozen.
   * New processors working the same way can be created by calling the
   * processor.
   *
   * It’s possible to freeze processors explicitly by calling `.freeze()`.
   * Processors freeze automatically when `.parse()`, `.run()`, `.runSync()`,
   * `.stringify()`, `.process()`, or `.processSync()` are called.
   *
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   The current processor.
   */
  freeze() {
    if (this.frozen)
      return this;
    const u = (
      /** @type {Processor} */
      /** @type {unknown} */
      this
    );
    for (; ++this.freezeIndex < this.attachers.length; ) {
      const [t, ...r] = this.attachers[this.freezeIndex];
      if (r[0] === !1)
        continue;
      r[0] === !0 && (r[0] = void 0);
      const a = t.call(u, ...r);
      typeof a == "function" && this.transformers.use(a);
    }
    return this.frozen = !0, this.freezeIndex = Number.POSITIVE_INFINITY, this;
  }
  /**
   * Parse text to a syntax tree.
   *
   * > 👉 **Note**: `parse` freezes the processor if not already *frozen*.
   *
   * > 👉 **Note**: `parse` performs the parse phase, not the run phase or other
   * > phases.
   *
   * @param {Compatible | undefined} [file]
   *   file to parse (optional); typically `string` or `VFile`; any value
   *   accepted as `x` in `new VFile(x)`.
   * @returns {ParseTree extends undefined ? Node : ParseTree}
   *   Syntax tree representing `file`.
   */
  parse(u) {
    this.freeze();
    const t = Gr(u), r = this.parser || this.Parser;
    return Vn("parse", r), r(String(t), t);
  }
  /**
   * Process the given file as configured on the processor.
   *
   * > 👉 **Note**: `process` freezes the processor if not already *frozen*.
   *
   * > 👉 **Note**: `process` performs the parse, run, and stringify phases.
   *
   * @overload
   * @param {Compatible | undefined} file
   * @param {ProcessCallback<VFileWithOutput<CompileResult>>} done
   * @returns {undefined}
   *
   * @overload
   * @param {Compatible | undefined} [file]
   * @returns {Promise<VFileWithOutput<CompileResult>>}
   *
   * @param {Compatible | undefined} [file]
   *   File (optional); typically `string` or `VFile`]; any value accepted as
   *   `x` in `new VFile(x)`.
   * @param {ProcessCallback<VFileWithOutput<CompileResult>> | undefined} [done]
   *   Callback (optional).
   * @returns {Promise<VFile> | undefined}
   *   Nothing if `done` is given.
   *   Otherwise a promise, rejected with a fatal error or resolved with the
   *   processed file.
   *
   *   The parsed, transformed, and compiled value is available at
   *   `file.value` (see note).
   *
   *   > 👉 **Note**: unified typically compiles by serializing: most
   *   > compilers return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@link CompileResultMap `CompileResultMap`}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  process(u, t) {
    const r = this;
    return this.freeze(), Vn("process", this.parser || this.Parser), Yn("process", this.compiler || this.Compiler), t ? a(void 0, t) : new Promise(a);
    function a(n, i) {
      const s = Gr(u), o = (
        /** @type {HeadTree extends undefined ? Node : HeadTree} */
        /** @type {unknown} */
        r.parse(s)
      );
      r.run(o, s, function(c, E, f) {
        if (c || !E || !f)
          return d(c);
        const m = (
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          E
        ), v = r.stringify(m, f);
        ET(v) ? f.value = v : f.result = v, d(
          c,
          /** @type {VFileWithOutput<CompileResult>} */
          f
        );
      });
      function d(c, E) {
        c || !E ? i(c) : n ? n(E) : t(void 0, E);
      }
    }
  }
  /**
   * Process the given file as configured on the processor.
   *
   * An error is thrown if asynchronous transforms are configured.
   *
   * > 👉 **Note**: `processSync` freezes the processor if not already *frozen*.
   *
   * > 👉 **Note**: `processSync` performs the parse, run, and stringify phases.
   *
   * @param {Compatible | undefined} [file]
   *   File (optional); typically `string` or `VFile`; any value accepted as
   *   `x` in `new VFile(x)`.
   * @returns {VFileWithOutput<CompileResult>}
   *   The processed file.
   *
   *   The parsed, transformed, and compiled value is available at
   *   `file.value` (see note).
   *
   *   > 👉 **Note**: unified typically compiles by serializing: most
   *   > compilers return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@link CompileResultMap `CompileResultMap`}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  processSync(u) {
    let t = !1, r;
    return this.freeze(), Vn("processSync", this.parser || this.Parser), Yn("processSync", this.compiler || this.Compiler), this.process(u, a), ro("processSync", "process", t), r;
    function a(n, i) {
      t = !0, zs(n), r = i;
    }
  }
  /**
   * Run *transformers* on a syntax tree.
   *
   * > 👉 **Note**: `run` freezes the processor if not already *frozen*.
   *
   * > 👉 **Note**: `run` performs the run phase, not other phases.
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
   * @returns {undefined}
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {Compatible | undefined} file
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
   * @returns {undefined}
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {Compatible | undefined} [file]
   * @returns {Promise<TailTree extends undefined ? Node : TailTree>}
   *
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   *   Tree to transform and inspect.
   * @param {(
   *   RunCallback<TailTree extends undefined ? Node : TailTree> |
   *   Compatible
   * )} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} [done]
   *   Callback (optional).
   * @returns {Promise<TailTree extends undefined ? Node : TailTree> | undefined}
   *   Nothing if `done` is given.
   *   Otherwise, a promise rejected with a fatal error or resolved with the
   *   transformed tree.
   */
  run(u, t, r) {
    to(u), this.freeze();
    const a = this.transformers;
    return !r && typeof t == "function" && (r = t, t = void 0), r ? n(void 0, r) : new Promise(n);
    function n(i, s) {
      const o = Gr(t);
      a.run(u, o, d);
      function d(c, E, f) {
        const m = (
          /** @type {TailTree extends undefined ? Node : TailTree} */
          E || u
        );
        c ? s(c) : i ? i(m) : r(void 0, m, f);
      }
    }
  }
  /**
   * Run *transformers* on a syntax tree.
   *
   * An error is thrown if asynchronous transforms are configured.
   *
   * > 👉 **Note**: `runSync` freezes the processor if not already *frozen*.
   *
   * > 👉 **Note**: `runSync` performs the run phase, not other phases.
   *
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   *   Tree to transform and inspect.
   * @param {Compatible | undefined} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @returns {TailTree extends undefined ? Node : TailTree}
   *   Transformed tree.
   */
  runSync(u, t) {
    let r = !1, a;
    return this.run(u, t, n), ro("runSync", "run", r), a;
    function n(i, s) {
      zs(i), a = s, r = !0;
    }
  }
  /**
   * Compile a syntax tree.
   *
   * > 👉 **Note**: `stringify` freezes the processor if not already *frozen*.
   *
   * > 👉 **Note**: `stringify` performs the stringify phase, not the run phase
   * > or other phases.
   *
   * @param {CompileTree extends undefined ? Node : CompileTree} tree
   *   Tree to compile.
   * @param {Compatible | undefined} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @returns {CompileResult extends undefined ? Value : CompileResult}
   *   Textual representation of the tree (see note).
   *
   *   > 👉 **Note**: unified typically compiles by serializing: most compilers
   *   > return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@link CompileResultMap `CompileResultMap`}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  stringify(u, t) {
    this.freeze();
    const r = Gr(t), a = this.compiler || this.Compiler;
    return Yn("stringify", a), to(u), a(u, r);
  }
  /**
   * Configure the processor to use a plugin, a list of usable values, or a
   * preset.
   *
   * If the processor is already using a plugin, the previous plugin
   * configuration is changed based on the options that are passed in.
   * In other words, the plugin is not added a second time.
   *
   * > 👉 **Note**: `use` cannot be called on *frozen* processors.
   * > Call the processor first to create a new unfrozen processor.
   *
   * @example
   *   There are many ways to pass plugins to `.use()`.
   *   This example gives an overview:
   *
   *   ```js
   *   import {unified} from 'unified'
   *
   *   unified()
   *     // Plugin with options:
   *     .use(pluginA, {x: true, y: true})
   *     // Passing the same plugin again merges configuration (to `{x: true, y: false, z: true}`):
   *     .use(pluginA, {y: false, z: true})
   *     // Plugins:
   *     .use([pluginB, pluginC])
   *     // Two plugins, the second with options:
   *     .use([pluginD, [pluginE, {}]])
   *     // Preset with plugins and settings:
   *     .use({plugins: [pluginF, [pluginG, {}]], settings: {position: false}})
   *     // Settings only:
   *     .use({settings: {position: false}})
   *   ```
   *
   * @template {Array<unknown>} [Parameters=[]]
   * @template {Node | string | undefined} [Input=undefined]
   * @template [Output=Input]
   *
   * @overload
   * @param {Preset | null | undefined} [preset]
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {PluggableList} list
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {Plugin<Parameters, Input, Output>} plugin
   * @param {...(Parameters | [boolean])} parameters
   * @returns {UsePlugin<ParseTree, HeadTree, TailTree, CompileTree, CompileResult, Input, Output>}
   *
   * @param {PluggableList | Plugin | Preset | null | undefined} value
   *   Usable value.
   * @param {...unknown} parameters
   *   Parameters, when a plugin is given as a usable value.
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   Current processor.
   */
  use(u, ...t) {
    const r = this.attachers, a = this.namespace;
    if (Wn("use", this.frozen), u != null)
      if (typeof u == "function")
        o(u, t);
      else if (typeof u == "object")
        Array.isArray(u) ? s(u) : i(u);
      else
        throw new TypeError("Expected usable value, not `" + u + "`");
    return this;
    function n(d) {
      if (typeof d == "function")
        o(d, []);
      else if (typeof d == "object")
        if (Array.isArray(d)) {
          const [c, ...E] = (
            /** @type {PluginTuple<Array<unknown>>} */
            d
          );
          o(c, E);
        } else
          i(d);
      else
        throw new TypeError("Expected usable value, not `" + d + "`");
    }
    function i(d) {
      if (!("plugins" in d) && !("settings" in d))
        throw new Error(
          "Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither"
        );
      s(d.plugins), d.settings && (a.settings = $n(!0, a.settings, d.settings));
    }
    function s(d) {
      let c = -1;
      if (d != null)
        if (Array.isArray(d))
          for (; ++c < d.length; ) {
            const E = d[c];
            n(E);
          }
        else
          throw new TypeError("Expected a list of plugins, not `" + d + "`");
    }
    function o(d, c) {
      let E = -1, f = -1;
      for (; ++E < r.length; )
        if (r[E][0] === d) {
          f = E;
          break;
        }
      if (f === -1)
        r.push([d, ...c]);
      else if (c.length > 0) {
        let [m, ...v] = c;
        const L = r[f][1];
        Ui(L) && Ui(m) && (m = $n(!0, L, m)), r[f] = [d, m, ...v];
      }
    }
  }
}
const mT = new qc().freeze();
function Vn(e, u) {
  if (typeof u != "function")
    throw new TypeError("Cannot `" + e + "` without `parser`");
}
function Yn(e, u) {
  if (typeof u != "function")
    throw new TypeError("Cannot `" + e + "` without `compiler`");
}
function Wn(e, u) {
  if (u)
    throw new Error(
      "Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function to(e) {
  if (!Ui(e) || typeof e.type != "string")
    throw new TypeError("Expected node, got `" + e + "`");
}
function ro(e, u, t) {
  if (!t)
    throw new Error(
      "`" + e + "` finished async. Use `" + u + "` instead"
    );
}
function Gr(e) {
  return gT(e) ? e : new ki(e);
}
function gT(e) {
  return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function ET(e) {
  return typeof e == "string" || TT(e);
}
function TT(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const _T = mT().use(EE).use(Nf).freeze(), Df = (
  // Note: overloads in JSDoc can’t yet use different `@template`s.
  /**
   * @type {(
   *   (<Condition extends string>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & {type: Condition}) &
   *   (<Condition extends Props>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Condition) &
   *   (<Condition extends TestFunction>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Predicate<Condition, Node>) &
   *   ((test?: null | undefined) => (node?: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node) &
   *   ((test?: Test) => Check)
   * )}
   */
  /**
   * @param {Test} [test]
   * @returns {Check}
   */
  function(e) {
    if (e == null)
      return xT;
    if (typeof e == "function")
      return mn(e);
    if (typeof e == "object")
      return Array.isArray(e) ? yT(e) : AT(e);
    if (typeof e == "string")
      return vT(e);
    throw new Error("Expected function, string, or object as test");
  }
);
function yT(e) {
  const u = [];
  let t = -1;
  for (; ++t < e.length; )
    u[t] = Df(e[t]);
  return mn(r);
  function r(...a) {
    let n = -1;
    for (; ++n < u.length; )
      if (u[n].apply(this, a))
        return !0;
    return !1;
  }
}
function AT(e) {
  const u = (
    /** @type {Record<string, unknown>} */
    e
  );
  return mn(t);
  function t(r) {
    const a = (
      /** @type {Record<string, unknown>} */
      /** @type {unknown} */
      r
    );
    let n;
    for (n in e)
      if (a[n] !== u[n])
        return !1;
    return !0;
  }
}
function vT(e) {
  return mn(u);
  function u(t) {
    return t && t.type === e;
  }
}
function mn(e) {
  return u;
  function u(t, r, a) {
    return !!(NT(t) && e.call(
      this,
      t,
      typeof r == "number" ? r : void 0,
      a || void 0
    ));
  }
}
function xT() {
  return !0;
}
function NT(e) {
  return e !== null && typeof e == "object" && "type" in e;
}
const Cf = [], IT = !0, Hi = !1, Sf = "skip";
function DT(e, u, t, r) {
  let a;
  typeof u == "function" && typeof t != "function" ? (r = t, t = u) : a = u;
  const n = Df(a), i = r ? -1 : 1;
  s(e, void 0, [])();
  function s(o, d, c) {
    const E = (
      /** @type {Record<string, unknown>} */
      o && typeof o == "object" ? o : {}
    );
    if (typeof E.type == "string") {
      const m = (
        // `hast`
        typeof E.tagName == "string" ? E.tagName : (
          // `xast`
          typeof E.name == "string" ? E.name : void 0
        )
      );
      Object.defineProperty(f, "name", {
        value: "node (" + (o.type + (m ? "<" + m + ">" : "")) + ")"
      });
    }
    return f;
    function f() {
      let m = Cf, v, L, N;
      if ((!u || n(o, d, c[c.length - 1] || void 0)) && (m = CT(t(o, c)), m[0] === Hi))
        return m;
      if ("children" in o && o.children) {
        const O = (
          /** @type {UnistParent} */
          o
        );
        if (O.children && m[0] !== Sf)
          for (L = (r ? O.children.length : -1) + i, N = c.concat(O); L > -1 && L < O.children.length; ) {
            const w = O.children[L];
            if (v = s(w, L, N)(), v[0] === Hi)
              return v;
            L = typeof v[1] == "number" ? v[1] : L + i;
          }
      }
      return m;
    }
  }
}
function CT(e) {
  return Array.isArray(e) ? e : typeof e == "number" ? [IT, e] : e == null ? Cf : [e];
}
function Fi(e, u, t, r) {
  let a, n, i;
  typeof u == "function" && typeof t != "function" ? (n = void 0, i = u, a = t) : (n = u, i = t, a = r), DT(e, n, s, a);
  function s(o, d) {
    const c = d[d.length - 1], E = c ? c.children.indexOf(o) : void 0;
    return i(o, E, c);
  }
}
const Zr = {}, H0 = {};
function ST(e, u) {
  let t = u;
  for (let r = 0; r < e.length; r++) {
    const a = r === e.length - 1, n = e.charAt(r), i = t[n] || (t[n] = { chars: {} });
    a && (i.self = e), t = i.chars;
  }
}
function ao(e) {
  if (e.length === 0)
    return Zr;
  const u = {};
  for (const t of e)
    ST(t, u);
  return u;
}
function no(e) {
  if (e.length === 0)
    return H0;
  const u = {};
  for (const t of e)
    u[t] = !0;
  return u;
}
const io = {}, OT = {
  type: "String",
  optional: !0
};
function LT(e) {
  const u = {
    optional: !1
  };
  function t(r) {
    if (u.type && u.type !== r)
      throw new Error(`Conflicting pseudo-class argument type: "${u.type}" vs "${r}".`);
    u.type = r;
  }
  for (const r of e)
    r === "NoArgument" && (u.optional = !0), r === "Formula" && t("Formula"), r === "FormulaOfSelector" && (t("Formula"), u.ofSelector = !0), r === "String" && t("String"), r === "Selector" && t("Selector");
  return u;
}
function PT(e) {
  const u = {};
  for (const t of Object.keys(e)) {
    const r = e[t];
    if (r)
      for (const a of r)
        (u[a] || (u[a] = [])).push(t);
  }
  return u;
}
function wT(e) {
  const u = PT(e), t = {};
  for (const r of Object.keys(u)) {
    const a = u[r];
    a && (t[r] = LT(a));
  }
  return t;
}
const RT = {}, MT = { wildcard: !0 };
function F0(e) {
  return e ? typeof e == "boolean" ? MT : e : RT;
}
function Sr(e, u) {
  const t = { ...e };
  if ("tag" in u)
    if (u.tag) {
      t.tag = { ...F0(e.tag) };
      const r = F0(u.tag);
      "wildcard" in r && (t.tag.wildcard = r.wildcard);
    } else
      t.tag = void 0;
  if ("ids" in u && (t.ids = u.ids), "classNames" in u && (t.classNames = u.classNames), "namespace" in u)
    if (u.namespace) {
      t.namespace = { ...F0(e.namespace) };
      const r = F0(u.namespace);
      "wildcard" in r && (t.namespace.wildcard = r.wildcard);
    } else
      t.namespace = void 0;
  if ("combinators" in u && (u.combinators ? t.combinators = t.combinators ? t.combinators.concat(u.combinators) : u.combinators : t.combinators = void 0), "attributes" in u && (u.attributes ? (t.attributes = { ...e.attributes }, "unknownCaseSensitivityModifiers" in u.attributes && (t.attributes.unknownCaseSensitivityModifiers = u.attributes.unknownCaseSensitivityModifiers), "operators" in u.attributes && (t.attributes.operators = u.attributes.operators ? t.attributes.operators ? t.attributes.operators.concat(u.attributes.operators) : u.attributes.operators : void 0), "caseSensitivityModifiers" in u.attributes && (t.attributes.caseSensitivityModifiers = u.attributes.caseSensitivityModifiers ? t.attributes.caseSensitivityModifiers ? t.attributes.caseSensitivityModifiers.concat(u.attributes.caseSensitivityModifiers) : u.attributes.caseSensitivityModifiers : void 0)) : t.attributes = void 0), "pseudoElements" in u && (u.pseudoElements ? (t.pseudoElements = { ...e.pseudoElements }, "unknown" in u.pseudoElements && (t.pseudoElements.unknown = u.pseudoElements.unknown), "notation" in u.pseudoElements && (t.pseudoElements.notation = u.pseudoElements.notation), "definitions" in u.pseudoElements && (t.pseudoElements.definitions = u.pseudoElements.definitions ? t.pseudoElements.definitions ? t.pseudoElements.definitions.concat(u.pseudoElements.definitions) : u.pseudoElements.definitions : void 0)) : t.pseudoElements = void 0), "pseudoClasses" in u)
    if (u.pseudoClasses) {
      if (t.pseudoClasses = { ...e.pseudoClasses }, "unknown" in u.pseudoClasses && (t.pseudoClasses.unknown = u.pseudoClasses.unknown), "definitions" in u.pseudoClasses) {
        const r = u.pseudoClasses.definitions;
        if (r) {
          t.pseudoClasses.definitions = {
            ...t.pseudoClasses.definitions
          };
          const a = t.pseudoClasses.definitions;
          for (const n of Object.keys(r)) {
            const i = r[n], s = a[n];
            i ? a[n] = s ? s.concat(i) : i : a[n] = void 0;
          }
        } else
          t.pseudoClasses.definitions = void 0;
      }
    } else
      t.pseudoClasses = void 0;
  return t;
}
const Of = {
  tag: {},
  ids: !0,
  classNames: !0,
  combinators: [],
  pseudoElements: {
    unknown: "reject",
    notation: "singleColon",
    definitions: ["first-letter", "first-line"]
  },
  pseudoClasses: {
    unknown: "reject",
    definitions: {
      NoArgument: ["link", "visited", "active"]
    }
  }
}, Lf = Sr(Of, {
  tag: { wildcard: !0 },
  combinators: [">", "+"],
  attributes: {
    unknownCaseSensitivityModifiers: "reject",
    operators: ["=", "~=", "|="]
  },
  pseudoElements: {
    definitions: ["before", "after"]
  },
  pseudoClasses: {
    unknown: "reject",
    definitions: {
      NoArgument: ["hover", "focus", "first-child"],
      String: ["lang"]
    }
  }
}), qi = Sr(Lf, {
  namespace: {
    wildcard: !0
  },
  combinators: ["~"],
  attributes: {
    operators: ["^=", "$=", "*="]
  },
  pseudoElements: {
    notation: "both"
  },
  pseudoClasses: {
    definitions: {
      NoArgument: [
        "root",
        "last-child",
        "first-of-type",
        "last-of-type",
        "only-child",
        "only-of-type",
        "empty",
        "target",
        "enabled",
        "disabled",
        "checked",
        "indeterminate"
      ],
      Formula: ["nth-child", "nth-last-child", "nth-of-type", "nth-last-of-type"],
      Selector: ["not"]
    }
  }
}), Gi = Sr(qi, {
  combinators: ["||"],
  attributes: {
    caseSensitivityModifiers: ["i", "I", "s", "S"]
  },
  pseudoClasses: {
    definitions: {
      NoArgument: [
        "any-link",
        "local-link",
        "target-within",
        "scope",
        "current",
        "past",
        "future",
        "focus-within",
        "focus-visible",
        "read-write",
        "read-only",
        "placeholder-shown",
        "default",
        "valid",
        "invalid",
        "in-range",
        "out-of-range",
        "required",
        "optional",
        "blank",
        "user-invalid"
      ],
      Formula: ["nth-col", "nth-last-col"],
      String: ["dir"],
      FormulaOfSelector: ["nth-child", "nth-last-child"],
      Selector: ["current", "is", "where", "has"]
    }
  }
}), kT = Sr(Gi, {
  pseudoElements: {
    unknown: "accept"
  },
  pseudoClasses: {
    unknown: "accept"
  },
  attributes: {
    unknownCaseSensitivityModifiers: "accept"
  }
}), co = {
  css1: Of,
  css2: Lf,
  css3: qi,
  "selectors-3": qi,
  "selectors-4": Gi,
  latest: Gi,
  progressive: kT
};
function jr(e) {
  return e >= "a" && e <= "z" || e >= "A" && e <= "Z" || e === "-" || e === "_";
}
function BT(e) {
  return e >= "a" && e <= "z" || e >= "A" && e <= "Z" || e >= "0" && e <= "9" || e === "-" || e === "_";
}
function B0(e) {
  return e >= "a" && e <= "f" || e >= "A" && e <= "F" || e >= "0" && e <= "9";
}
const UT = {
  n: `
`,
  r: "\r",
  t: "	",
  f: "\f",
  "\\": "\\"
}, so = {
  " ": !0,
  "	": !0,
  "\n": !0,
  "\r": !0,
  "\f": !0
}, HT = {
  '"': !0,
  "'": !0
}, oo = {
  0: !0,
  1: !0,
  2: !0,
  3: !0,
  4: !0,
  5: !0,
  6: !0,
  7: !0,
  8: !0,
  9: !0
}, Xn = "css-selector-parser parse error: ";
function FT(e = {}) {
  const { syntax: u = "latest", substitutes: t, strict: r = !0 } = e;
  let a = typeof u == "string" ? co[u] : u;
  a.baseSyntax && (a = Sr(co[a.baseSyntax], a));
  const [n, i] = a.tag ? [!0, !!F0(a.tag).wildcard] : [!1, !1], s = !!a.ids, o = !!a.classNames, d = !!a.namespace, c = a.namespace && (a.namespace === !0 || a.namespace.wildcard === !0);
  if (d && !n)
    throw new Error(`${Xn}Namespaces cannot be enabled while tags are disabled.`);
  const E = !!t, f = a.combinators ? ao(a.combinators) : Zr, [m, v, L, N] = a.attributes ? [
    !0,
    a.attributes.operators ? ao(a.attributes.operators) : Zr,
    a.attributes.caseSensitivityModifiers ? no(a.attributes.caseSensitivityModifiers) : H0,
    a.attributes.unknownCaseSensitivityModifiers === "accept"
  ] : [!1, Zr, H0, !1], O = N || Object.keys(L).length > 0, [w, H, k] = a.pseudoClasses ? [
    !0,
    a.pseudoClasses.definitions ? wT(a.pseudoClasses.definitions) : io,
    a.pseudoClasses.unknown === "accept"
  ] : [!1, io, !1], [R, G, X, Z, re] = a.pseudoElements ? [
    !0,
    a.pseudoElements.notation === "singleColon" || a.pseudoElements.notation === "both",
    !a.pseudoElements.notation || a.pseudoElements.notation === "doubleColon" || a.pseudoElements.notation === "both",
    a.pseudoElements.definitions ? no(a.pseudoElements.definitions) : H0,
    a.pseudoElements.unknown === "accept"
  ] : [!1, !1, !1, H0, !1];
  let Y = "", l = Y.length, g = 0, T = "";
  const A = (V) => T === V, D = () => A("*") || jr(T) || A("\\"), B = (V) => {
    g = V, T = Y.charAt(g);
  }, M = () => {
    g++, T = Y.charAt(g);
  }, $ = () => {
    const V = T;
    return g++, T = Y.charAt(g), V;
  };
  function J(V) {
    const K = Math.min(l - 1, g), de = new Error(`${Xn}${V} Pos: ${K}.`);
    throw de.position = K, de.name = "ParserError", de;
  }
  function z(V, K) {
    if (!V)
      return J(K);
  }
  const be = () => {
    z(g < l, "Unexpected end of input.");
  }, ge = () => g >= l, Ue = (V) => {
    z(g < l, `Expected "${V}" but end of input reached.`), z(T === V, `Expected "${V}" but "${T}" found.`), g++, T = Y.charAt(g);
  };
  function ee(V) {
    const K = _e(V, g);
    if (K)
      return g += K.length, T = Y.charAt(g), K;
  }
  function _e(V, K) {
    const de = Y.charAt(K), le = V[de];
    if (le) {
      const Eu = _e(le.chars, K + 1);
      if (Eu)
        return Eu;
      if (le.self)
        return le.self;
    }
  }
  function Ye() {
    let V = $();
    for (; B0(T); )
      V += $();
    return A(" ") && M(), String.fromCharCode(parseInt(V, 16));
  }
  function Yt(V) {
    let K = "";
    for (Ue(V); g < l; ) {
      if (A(V))
        return M(), K;
      if (A("\\")) {
        M();
        let de;
        if (A(V))
          K += V;
        else if ((de = UT[T]) !== void 0)
          K += de;
        else if (B0(T)) {
          K += Ye();
          continue;
        } else
          K += T;
      } else
        K += T;
      M();
    }
    return K;
  }
  function we() {
    let V = "";
    for (; g < l; )
      if (BT(T))
        V += $();
      else if (A("\\"))
        M(), be(), B0(T) ? V += Ye() : V += $();
      else
        return V;
    return V;
  }
  function Wt() {
    let V = "";
    for (; g < l && !A(")"); )
      if (A("\\")) {
        if (M(), ge() && !r)
          return (V + "\\").trim();
        be(), B0(T) ? V += Ye() : V += $();
      } else
        V += $();
    return V.trim();
  }
  function ye() {
    for (; so[T]; )
      M();
  }
  function Ne(V = !1) {
    ye();
    const K = [Ru(V)];
    for (; A(","); )
      M(), ye(), K.push(Ru(V));
    return {
      type: "Selector",
      rules: K
    };
  }
  function Lu() {
    Ue("["), ye();
    let V;
    if (A("|"))
      z(d, "Namespaces are not enabled."), M(), V = {
        type: "Attribute",
        name: we(),
        namespace: { type: "NoNamespace" }
      };
    else if (A("*"))
      z(d, "Namespaces are not enabled."), z(c, "Wildcard namespace is not enabled."), M(), Ue("|"), V = {
        type: "Attribute",
        name: we(),
        namespace: { type: "WildcardNamespace" }
      };
    else {
      const K = we();
      if (V = {
        type: "Attribute",
        name: K
      }, A("|")) {
        const de = g;
        M(), jr(T) || A("\\") ? (z(d, "Namespaces are not enabled."), V = {
          type: "Attribute",
          name: we(),
          namespace: { type: "NamespaceName", name: K }
        }) : B(de);
      }
    }
    if (z(V.name, "Expected attribute name."), ye(), ge() && !r)
      return V;
    if (A("]"))
      M();
    else {
      if (V.operator = ee(v), z(V.operator, "Expected a valid attribute selector operator."), ye(), be(), HT[T] ? V.value = {
        type: "String",
        value: Yt(T)
      } : E && A("$") ? (M(), V.value = {
        type: "Substitution",
        name: we()
      }, z(V.value.name, "Expected substitute name.")) : (V.value = {
        type: "String",
        value: we()
      }, z(V.value.value, "Expected attribute value.")), ye(), ge() && !r || !A("]") && (V.caseSensitivityModifier = we(), z(V.caseSensitivityModifier, "Expected end of attribute selector."), z(O, "Attribute case sensitivity modifiers are not enabled."), z(N || L[V.caseSensitivityModifier], "Unknown attribute case sensitivity modifier."), ye(), ge() && !r))
        return V;
      Ue("]");
    }
    return V;
  }
  function Ie() {
    let V = "";
    for (; oo[T]; )
      V += $();
    return z(V !== "", "Formula parse error."), parseInt(V);
  }
  const We = () => A("-") || A("+") || oo[T];
  function Se() {
    if (A("e") || A("o")) {
      const le = we();
      if (le === "even")
        return ye(), [2, 0];
      if (le === "odd")
        return ye(), [2, 1];
    }
    let V = null, K = 1;
    if (A("-") && (M(), K = -1), We() && (A("+") && M(), V = Ie(), !A("\\") && !A("n")))
      return [0, V * K];
    V === null && (V = 1), V *= K;
    let de;
    if (A("\\") ? (M(), B0(T) ? de = Ye() : de = $()) : de = $(), z(de === "n", 'Formula parse error: expected "n".'), ye(), A("+") || A("-")) {
      const le = A("+") ? 1 : -1;
      return M(), ye(), [V, le * Ie()];
    } else
      return [V, 0];
  }
  function Oe(V) {
    const K = {
      type: "PseudoClass",
      name: V
    };
    let de = H[V];
    if (!de && k && (de = OT), z(de, `Unknown pseudo-class: "${V}".`), de = de, A("(")) {
      if (M(), ye(), E && A("$"))
        M(), K.argument = {
          type: "Substitution",
          name: we()
        }, z(K.argument.name, "Expected substitute name.");
      else if (de.type === "String")
        K.argument = {
          type: "String",
          value: Wt()
        }, z(K.argument.value, "Expected pseudo-class argument value.");
      else if (de.type === "Selector")
        K.argument = Ne(!0);
      else if (de.type === "Formula") {
        const [le, Eu] = Se();
        if (K.argument = {
          type: "Formula",
          a: le,
          b: Eu
        }, de.ofSelector && (ye(), A("o") || A("\\"))) {
          const Re = we();
          z(Re === "of", "Formula of selector parse error."), ye(), K.argument = {
            type: "FormulaOfSelector",
            a: le,
            b: Eu,
            selector: Ru()
          };
        }
      } else
        return J("Invalid pseudo-class signature.");
      if (ye(), ge() && !r)
        return K;
      Ue(")");
    } else
      z(de.optional, `Argument is required for pseudo-class "${V}".`);
    return K;
  }
  function ru() {
    return A("*") ? (z(i, "Wildcard tag name is not enabled."), M(), { type: "WildcardTag" }) : jr(T) || A("\\") ? (z(n, "Tag names are not enabled."), {
      type: "TagName",
      name: we()
    }) : J("Expected tag name.");
  }
  function Xt() {
    if (A("*")) {
      const V = g;
      if (M(), !A("|") || (M(), !D()))
        return B(V), ru();
      z(d, "Namespaces are not enabled."), z(c, "Wildcard namespace is not enabled.");
      const K = ru();
      return K.namespace = { type: "WildcardNamespace" }, K;
    } else if (A("|")) {
      z(d, "Namespaces are not enabled."), M();
      const V = ru();
      return V.namespace = { type: "NoNamespace" }, V;
    } else if (jr(T) || A("\\")) {
      const V = we();
      if (!A("|"))
        return z(n, "Tag names are not enabled."), {
          type: "TagName",
          name: V
        };
      const K = g;
      if (M(), !D())
        return B(K), {
          type: "TagName",
          name: V
        };
      z(d, "Namespaces are not enabled.");
      const de = ru();
      return de.namespace = { type: "NamespaceName", name: V }, de;
    } else
      return J("Expected tag name.");
  }
  function Ru(V = !1) {
    const K = {};
    let de = !0;
    if (V) {
      const le = ee(f);
      le && (K.combinator = le, ye());
    }
    for (; g < l; ) {
      if (D())
        z(de, "Unexpected tag/namespace start."), K.tag = Xt();
      else if (A("|")) {
        const le = g;
        if (M(), D())
          z(de, "Unexpected tag/namespace start."), B(le), K.tag = Xt();
        else {
          B(le);
          break;
        }
      } else if (A(".")) {
        z(o, "Class names are not enabled."), M();
        const le = we();
        z(le, "Expected class name."), (K.classNames = K.classNames || []).push(le);
      } else if (A("#")) {
        z(s, "IDs are not enabled."), M();
        const le = we();
        z(le, "Expected ID name."), (K.ids = K.ids || []).push(le);
      } else if (A("["))
        z(m, "Attributes are not enabled."), (K.attributes = K.attributes || []).push(Lu());
      else if (A(":")) {
        let le = !1, Eu = !1;
        M(), A(":") && (z(R, "Pseudo elements are not enabled."), z(X, "Pseudo elements double colon notation is not enabled."), le = !0, M());
        const Re = we();
        if (z(le || Re, "Expected pseudo-class name."), z(!le || Re, "Expected pseudo-element name."), z(!le || re || Z[Re], `Unknown pseudo-element "${Re}".`), Eu = R && (le || !le && G && Z[Re]), Eu) {
          if (K.pseudoElement = Re, !so[T] && !A(",") && !A(")") && !ge())
            return J("Pseudo-element should be the last component of a CSS selector rule.");
        } else
          z(w, "Pseudo classes are not enabled."), (K.pseudoClasses = K.pseudoClasses || []).push(Oe(Re));
      } else
        break;
      de = !1;
    }
    if (de)
      return ge() ? J("Expected rule but end of input reached.") : J(`Expected rule but "${T}" found.`);
    if (K.type = "Rule", ye(), !ge() && !A(",") && !A(")")) {
      const le = ee(f);
      ye(), K.nestedRule = Ru(), K.nestedRule.combinator = le;
    }
    return K;
  }
  return (V) => {
    if (typeof V != "string")
      throw new Error(`${Xn}Expected string input.`);
    return Y = V, l = Y.length, g = 0, T = Y.charAt(0), Ne();
  };
}
const qT = FT({ syntax: "selectors-4" });
function GT(e) {
  if (typeof e != "string")
    throw new TypeError("Expected `string` as selector, not `" + e + "`");
  return qT(e);
}
const Pf = "֑-߿יִ-﷽ﹰ-ﻼ", wf = "A-Za-zÀ-ÖØ-öø-ʸ̀-֐ࠀ-῿‎Ⰰ-﬜︀-﹯﻽-￿", jT = new RegExp("^[^" + wf + "]*[" + Pf + "]"), $T = new RegExp("^[^" + Pf + "]*[" + wf + "]");
function VT(e) {
  const u = String(e || "");
  return jT.test(u) ? "rtl" : $T.test(u) ? "ltr" : "neutral";
}
function YT(e) {
  return "children" in e ? Rf(e) : "value" in e ? e.value : "";
}
function WT(e) {
  return e.type === "text" ? e.value : "children" in e ? Rf(e) : "";
}
function Rf(e) {
  let u = -1;
  const t = [];
  for (; ++u < e.children.length; )
    t[u] = WT(e.children[u]);
  return t.join("");
}
function XT(e, u) {
  const t = e.schema, r = e.language, a = e.direction, n = e.editableOrEditingHost;
  let i;
  if (u.type === "element") {
    const d = u.properties.xmlLang || u.properties.lang, c = u.properties.type || "text", E = lo(u);
    d != null && (e.language = String(d)), t && t.space === "html" ? (u.properties.contentEditable === "true" && (e.editableOrEditingHost = !0), u.tagName === "svg" && (e.schema = Vt), E === "rtl" ? i = E : /* Explicit `[dir=ltr]`. */ E === "ltr" || // HTML with an invalid or no `[dir]`.
    E !== "auto" && u.tagName === "html" || // `input[type=tel]` with an invalid or no `[dir]`.
    E !== "auto" && u.tagName === "input" && c === "tel" ? i = "ltr" : (E === "auto" || u.tagName === "bdi") && (u.tagName === "textarea" ? i = zn(YT(u)) : u.tagName === "input" && (c === "email" || c === "search" || c === "tel" || c === "text") ? i = u.properties.value ? zn(String(u.properties.value)) : "ltr" : Fi(u, o)), i && (e.direction = i)) : e.editableOrEditingHost && (e.editableOrEditingHost = !1);
  }
  return s;
  function s() {
    e.schema = t, e.language = r, e.direction = a, e.editableOrEditingHost = n;
  }
  function o(d) {
    if (d.type === "text")
      return i = zn(d.value), i ? Hi : void 0;
    if (d !== u && d.type === "element" && (d.tagName === "bdi" || d.tagName === "script" || d.tagName === "style" || d.tagName === "textare" || lo(d)))
      return Sf;
  }
}
function zn(e) {
  const u = VT(e);
  return u === "neutral" ? void 0 : u;
}
function lo(e) {
  const u = e.type === "element" && typeof e.properties.dir == "string" ? e.properties.dir.toLowerCase() : void 0;
  return u === "auto" || u === "ltr" || u === "rtl" ? u : void 0;
}
function zT(e, u, t) {
  let r = -1;
  if (e.attributes) {
    for (; ++r < e.attributes.length; )
      if (!QT(e.attributes[r], u, t))
        return !1;
  }
  return !0;
}
function QT(e, u, t) {
  const r = hn(t, e.name), a = u.properties[r.property];
  let n = KT(a, r);
  if (!e.value)
    return n !== void 0;
  e.value.type;
  let i = e.value.value;
  if (e.caseSensitivityModifier === "i" && (i = i.toLowerCase(), n && (n = n.toLowerCase())), n !== void 0)
    switch (e.operator) {
      case "=":
        return i === n;
      case "$=":
        return i === n.slice(-i.length);
      case "*=":
        return n.includes(i);
      case "^=":
        return i === n.slice(0, i.length);
      case "|=":
        return i === n || i === n.slice(0, i.length) && n.charAt(i.length) === "-";
      case "~=":
        return (
          // For all other values (including comma-separated lists), return whether this
          // is an exact match.
          i === n || // If this is a space-separated list, and the query is contained in it, return
          // true.
          Li(n).includes(i)
        );
    }
  return !1;
}
function KT(e, u) {
  if (e != null)
    if (typeof e == "boolean") {
      if (e)
        return u.attribute;
    } else if (Array.isArray(e)) {
      if (e.length > 0)
        return (u.commaSeparated ? hf : pf)(e);
    } else
      return String(e);
}
const JT = [];
function ZT(e, u) {
  const t = (
    /** @type {Readonly<Array<string>>} */
    u.properties.className || JT
  );
  let r = -1;
  if (e.classNames) {
    for (; ++r < e.classNames.length; )
      if (!t.includes(e.classNames[r]))
        return !1;
  }
  return !0;
}
function e5(e, u) {
  const t = e.ids;
  return t.length === 1 && u.properties.id === t[0];
}
function u5(e, u) {
  return e.tag, e.tag.type === "WildcardTag" || e.tag.name === u.tagName;
}
function t5(e, u) {
  return function(t, r) {
    let a = fo(t, "tag");
    const n = fo(
      r ?? "*",
      "range"
    ), i = [];
    let s = -1;
    for (; ++s < n.length; ) {
      const o = n[s].toLowerCase();
      if (!u && o === "*")
        continue;
      let d = -1;
      const c = [];
      for (; ++d < a.length; )
        if (e(a[d].toLowerCase(), o)) {
          if (!u)
            return (
              /** @type {IsFilter extends true ? Tags : Tag|undefined} */
              a[d]
            );
          i.push(a[d]);
        } else
          c.push(a[d]);
      a = c;
    }
    return (
      /** @type {IsFilter extends true ? Tags : Tag|undefined} */
      u ? i : void 0
    );
  };
}
const r5 = t5(function(e, u) {
  const t = e.split("-"), r = u.split("-");
  let a = 0, n = 0;
  if (r[n] !== "*" && t[a] !== r[n])
    return !1;
  for (a++, n++; n < r.length; ) {
    if (r[n] === "*") {
      n++;
      continue;
    }
    if (!t[a])
      return !1;
    if (t[a] === r[n]) {
      a++, n++;
      continue;
    }
    if (t[a].length === 1)
      return !1;
    a++;
  }
  return !0;
}, !0);
function fo(e, u) {
  const t = e && typeof e == "string" ? [e] : e;
  if (!t || typeof t != "object" || !("length" in t))
    throw new Error(
      "Invalid " + u + " `" + t + "`, expected non-empty string"
    );
  return t;
}
const a5 = {}.hasOwnProperty;
function Ut(e, u) {
  const t = e.type === "element" && a5.call(e.properties, u) && e.properties[u];
  return t != null && t !== !1;
}
const n5 = fi.default || fi, i5 = Tf("name", {
  handlers: {
    "any-link": s5,
    blank: o5,
    checked: d5,
    dir: l5,
    disabled: Mf,
    empty: f5,
    enabled: b5,
    "first-child": h5,
    "first-of-type": p5,
    has: m5,
    is: kf,
    lang: E5,
    "last-child": T5,
    "last-of-type": _5,
    not: y5,
    "nth-child": A5,
    "nth-last-child": v5,
    "nth-last-of-type": x5,
    "nth-of-type": N5,
    "only-child": I5,
    "only-of-type": D5,
    optional: C5,
    "read-only": S5,
    "read-write": Bf,
    required: Uf,
    root: O5,
    scope: L5
  },
  invalid: g5,
  unknown: P5
});
function c5(e, u, t, r, a) {
  const n = e.pseudoClasses;
  let i = -1;
  for (; ++i < n.length; )
    if (!i5(n[i], u, t, r, a))
      return !1;
  return !0;
}
function s5(e, u) {
  return (u.tagName === "a" || u.tagName === "area" || u.tagName === "link") && Ut(u, "href");
}
function Ku(e, u) {
  if (e.shallow)
    throw new Error("Cannot use `:" + u.name + "` without parent");
}
function o5(e, u) {
  return !Hf(u, t);
  function t(r) {
    return r.type === "element" || r.type === "text" && !pn(r);
  }
}
function d5(e, u) {
  return u.tagName === "input" || u.tagName === "menuitem" ? !!((u.properties.type === "checkbox" || u.properties.type === "radio") && Ut(u, "checked")) : u.tagName === "option" ? Ut(u, "selected") : !1;
}
function l5(e, u, t, r, a) {
  return e.argument, e.argument.type, a.direction === e.argument.value;
}
function Mf(e, u) {
  return (u.tagName === "button" || u.tagName === "input" || u.tagName === "select" || u.tagName === "textarea" || u.tagName === "optgroup" || u.tagName === "option" || u.tagName === "menuitem" || u.tagName === "fieldset") && Ut(u, "disabled");
}
function f5(e, u) {
  return !Hf(u, t);
  function t(r) {
    return r.type === "element" || r.type === "text";
  }
}
function b5(e, u) {
  return !Mf(e, u);
}
function h5(e, u, t, r, a) {
  return Ku(a, e), a.elementIndex === 0;
}
function p5(e, u, t, r, a) {
  return Ku(a, e), a.typeIndex === 0;
}
function gn(e) {
  let u = e._cachedFn;
  if (!u) {
    const t = e.argument;
    if (t.type !== "Formula")
      throw new Error(
        "Expected `nth` formula, such as `even` or `2n+1` (`of` is not yet supported)"
      );
    u = n5(t.a + "n+" + t.b), e._cachedFn = u;
  }
  return u;
}
function m5(e, u, t, r, a) {
  e.argument, e.argument.type;
  const n = {
    ...a,
    // Not found yet.
    found: !1,
    // One result is enough.
    one: !0,
    results: [],
    rootQuery: e.argument,
    scopeElements: [u],
    // Do walk deep.
    shallow: !1
  };
  return Gc(n, { type: "root", children: u.children }), n.results.length > 0;
}
function g5() {
}
function kf(e, u, t, r, a) {
  e.argument, e.argument.type;
  const n = {
    ...a,
    // Not found yet.
    found: !1,
    // One result is enough.
    one: !0,
    results: [],
    rootQuery: e.argument,
    scopeElements: [u],
    // Do walk deep.
    shallow: !1
  };
  return Gc(n, u), n.results[0] === u;
}
function E5(e, u, t, r, a) {
  return e.argument, e.argument.type, a.language !== "" && a.language !== void 0 && r5(a.language, Oi(e.argument.value)).length > 0;
}
function T5(e, u, t, r, a) {
  return Ku(a, e), !!(a.elementCount && a.elementIndex === a.elementCount - 1);
}
function _5(e, u, t, r, a) {
  return Ku(a, e), typeof a.typeIndex == "number" && typeof a.typeCount == "number" && a.typeIndex === a.typeCount - 1;
}
function y5(e, u, t, r, a) {
  return !kf(e, u, t, r, a);
}
function A5(e, u, t, r, a) {
  const n = gn(e);
  return Ku(a, e), typeof a.elementIndex == "number" && n(a.elementIndex);
}
function v5(e, u, t, r, a) {
  const n = gn(e);
  return Ku(a, e), !!(typeof a.elementCount == "number" && typeof a.elementIndex == "number" && n(a.elementCount - a.elementIndex - 1));
}
function x5(e, u, t, r, a) {
  const n = gn(e);
  return Ku(a, e), typeof a.typeCount == "number" && typeof a.typeIndex == "number" && n(a.typeCount - 1 - a.typeIndex);
}
function N5(e, u, t, r, a) {
  const n = gn(e);
  return Ku(a, e), typeof a.typeIndex == "number" && n(a.typeIndex);
}
function I5(e, u, t, r, a) {
  return Ku(a, e), a.elementCount === 1;
}
function D5(e, u, t, r, a) {
  return Ku(a, e), a.typeCount === 1;
}
function C5(e, u) {
  return !Uf(e, u);
}
function S5(e, u, t, r, a) {
  return !Bf(e, u, t, r, a);
}
function Bf(e, u, t, r, a) {
  return u.tagName === "input" || u.tagName === "textarea" ? !Ut(u, "readOnly") && !Ut(u, "disabled") : !!a.editableOrEditingHost;
}
function Uf(e, u) {
  return (u.tagName === "input" || u.tagName === "textarea" || u.tagName === "select") && Ut(u, "required");
}
function O5(e, u, t, r, a) {
  return !!((!r || r.type === "root") && a.schema && (a.schema.space === "html" || a.schema.space === "svg") && (u.tagName === "html" || u.tagName === "svg"));
}
function L5(e, u, t, r, a) {
  return a.scopeElements.includes(u);
}
function Hf(e, u) {
  const t = e.children;
  let r = -1;
  for (; ++r < t.length; )
    if (u(t[r]))
      return !0;
  return !1;
}
function P5(e) {
  const u = (
    /** @type {AstPseudoClass} */
    e
  );
  throw new Error("Unknown pseudo-selector `" + u.name + "`");
}
function w5(e, u, t, r, a) {
  if (e.pseudoElement)
    throw new Error("Invalid selector: `::" + e.pseudoElement + "`");
  return !!((!e.tag || u5(e, u)) && (!e.classNames || ZT(e, u)) && (!e.ids || e5(e, u)) && (!e.attributes || zT(e, u, a.schema)) && (!e.pseudoClasses || c5(e, u, t, r, a)));
}
const R5 = [];
function Gc(e, u) {
  u && Ff(e, [], u, void 0, void 0, u);
}
function Qn(e, u, t) {
  const r = e[u];
  r ? r.push(t) : e[u] = [t];
}
function M5(e, u, t, r) {
  const a = ea(u.descendant, u.directChild);
  let n, i = -1;
  const s = { count: 0, types: /* @__PURE__ */ new Map() }, o = { count: 0, types: /* @__PURE__ */ new Map() };
  for (; ++i < t.children.length; )
    bo(s, t.children[i]);
  for (i = -1; ++i < t.children.length; ) {
    const d = t.children[i], c = d.type === "element" ? d.tagName.toUpperCase() : void 0;
    if (e.elementIndex = o.count, e.typeIndex = c && o.types.get(c) || 0, e.elementCount = s.count, e.typeCount = c ? s.types.get(c) : 0, "children" in d) {
      const E = ea(a, n), f = Ff(
        e,
        E,
        t.children[i],
        i,
        t,
        r
      );
      n = ea(f.generalSibling, f.adjacentSibling);
    }
    if (e.one && e.found)
      break;
    bo(o, t.children[i]);
  }
}
function k5(e, u, t, r, a) {
  const n = {
    adjacentSibling: void 0,
    descendant: void 0,
    directChild: void 0,
    generalSibling: void 0
  };
  let i = -1;
  for (; ++i < u.length; ) {
    const s = u[i];
    if (e.one && e.found)
      break;
    if (e.shallow && s.nestedRule)
      throw new Error("Expected selector without nesting");
    if (w5(s, t, r, a, e)) {
      const o = s.nestedRule;
      if (o) {
        const d = o.combinator === "+" ? "adjacentSibling" : o.combinator === "~" ? "generalSibling" : o.combinator === ">" ? "directChild" : "descendant";
        Qn(n, d, o);
      } else
        e.found = !0, e.results.includes(t) || e.results.push(t);
    }
    s.combinator === void 0 ? Qn(n, "descendant", s) : s.combinator === "~" && Qn(n, "generalSibling", s);
  }
  return n;
}
function ea(e, u) {
  return e && u && e.length > 0 && u.length > 0 ? [...e, ...u] : e && e.length > 0 ? e : u && u.length > 0 ? u : R5;
}
function bo(e, u) {
  if (u.type === "element") {
    const t = u.tagName.toUpperCase(), r = (e.types.get(t) || 0) + 1;
    e.count++, e.types.set(t, r);
  }
}
function Ff(e, u, t, r, a, n) {
  let i = {
    adjacentSibling: void 0,
    descendant: void 0,
    directChild: void 0,
    generalSibling: void 0
  };
  const s = XT(e, t);
  if (t.type === "element") {
    let o = e.rootQuery.rules;
    a && a !== n && (o = e.rootQuery.rules.filter(
      (d) => d.combinator === void 0 || d.combinator === ">" && a === n
    )), i = k5(
      e,
      // Try the root rules for this element too.
      ea(u, o),
      t,
      r,
      a
    );
  }
  return "children" in t && !e.shallow && !(e.one && e.found) && M5(e, i, t, n), s(), i;
}
function B5(e, u, t) {
  const r = U5(e, u, t);
  return Gc(r, u || void 0), r.results;
}
function U5(e, u, t) {
  return {
    direction: "ltr",
    editableOrEditingHost: !1,
    elementCount: void 0,
    elementIndex: void 0,
    found: !1,
    language: void 0,
    one: !1,
    // State of the query.
    results: [],
    rootQuery: GT(e),
    schema: t === "svg" ? Vt : Dr,
    scopeElements: u ? u.type === "root" ? u.children : [u] : [],
    shallow: !1,
    typeIndex: void 0,
    typeCount: void 0
  };
}
const H5 = (e) => {
  const { selector: u, rewrite: t } = e || {};
  return (r) => {
    if (!(!t || typeof t != "function")) {
      if (u && typeof u == "string") {
        const a = B5(u, r);
        a && a.length > 0 && Fi(r, a, (n, i, s) => {
          t(n, i, s);
        });
        return;
      }
      Fi(r, (a, n, i) => {
        t(a, n, i);
      });
    }
  };
}, F5 = H5, q5 = "*{margin:0;padding:0;box-sizing:border-box}table,tr,td{height:100%}img{outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;display:block}a img{border:none}table{border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt}a[href^=tel],a[href^=sms]{text-decoration:none;pointer-events:none;cursor:default}", G5 = "#outlook a{padding:0}.ReadMsgBody,.ExternalClass{width:100%}.ExternalClass,.ExternalClass p,.ExternalClass span,.ExternalClass font,.ExternalClass td,.ExternalClass div{line-height:100%}body,table,td,p,a,li,blockquote{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}table,td{mso-table-lspace:0pt;mso-table-rspace:0pt}table td{border-collapse:collapse}img{-ms-interpolation-mode:bicubic}@media only screen and (max-device-width: 480px){a[href^=tel],a[href^=sms]{-webkit-text-decoration:default!important;text-decoration:default!important;pointer-events:auto!important;cursor:default!important}}@media only screen and (min-device-width: 768px) and (max-device-width: 1024px){a[href^=tel],a[href^=sms]{-webkit-text-decoration:default!important;text-decoration:default!important;pointer-events:auto!important;cursor:default!important}}", qf = i0.resolve(__dirname, "../tailwind.config.cjs"), j5 = async (e, u) => new Promise((t, r) => {
  const a = Kf(e, u);
  let n = t0.alloc(0), i = t0.alloc(0);
  a.stdout.on("data", (s) => {
    n = t0.concat([n, s]);
  }), a.stderr.on("data", (s) => {
    i = t0.concat([i, s]);
  }), a.on("error", (s) => {
    r({
      error: s,
      stdout: n.toString(),
      stderr: i.toString()
    });
  }), a.on("close", (s) => {
    if (s == null) {
      r({
        error: new Error("Process exited with null exit code."),
        stdout: n.toString(),
        stderr: i.toString()
      });
      return;
    }
    t({
      exit_code: s,
      stdout: n.toString(),
      stderr: i.toString()
    });
  });
}), $5 = (e) => ({
  type: "element",
  tagName: "style",
  children: [{ type: "text", value: e }]
}), V5 = (e) => {
  const u = /(--[a-zA-Z0-9-_]+)\s*:\s(.+?);/g, t = /var\((\s*--[a-zA-Z0-9-_]+\s*)(?:\)|,\s*(.*)\))/, r = /* @__PURE__ */ new Map();
  let a = e.replace(u, (s, o, d) => (r.set(o.trim(), d.trim()), "")), i = 1e3;
  for (; a.match(t); ) {
    if (i--, i <= 0)
      throw new Error("Max Cycles for replacement exceeded");
    a = a.replace(
      t,
      (s, o, d) => {
        const c = o.trim();
        return r.has(c) ? r.get(c) ?? "" : (d ?? "").trim();
      }
    );
  }
  return a;
}, ho = (e, u) => _T().use(F5, {
  rewrite: (r) => {
    var a;
    if (r.type !== "element")
      return r;
    if (r.tagName === "head" && u != null) {
      const n = [
        ...r.children,
        ...u.map((i) => $5(i))
      ];
      r.children = n;
    }
    if (((a = r.properties) == null ? void 0 : a.style) != null) {
      const n = V5(`${r.properties.style}`);
      r.properties = {
        ...r.properties,
        style: n
      };
    }
  }
}).use(Nf).processSync(e).toString(), po = (e) => {
  const u = new RegExp("(?<=\\:)[a-z0-9-]+(?=\\:)", "g");
  (e.match(u) || []).forEach((r) => {
    Ci.ignoredPseudos.includes(r) || Ci.ignoredPseudos.push(r);
  });
}, Y5 = (e, u, t) => {
  const r = {
    inlinePseudoElements: !0,
    preserveImportant: !0,
    applyStyleTags: !0,
    removeStyleTags: !0,
    insertPreservedExtraCss: !0,
    preservePseudos: !0,
    preserveFontFaces: !0,
    preserveMediaQueries: !0,
    preserveKeyFrames: !0
    // !BUG - this is not working
    // resolveCSSVariables: true,
  };
  po(u), t != null ? t.forEach((s) => {
    po(s);
  }) : t = [];
  const a = ho(e, [u]), n = Ci(a, r);
  let i = ho(n, t);
  return i = i.replace(/&#x27;/g, "'"), i;
}, W5 = async (e, u) => {
  const t = require.resolve("tailwindcss/lib/cli.js"), r = u.tailwindConfigPath ?? qf, a = i0.join(Tn.tmpdir(), "mailtyphoon-input.html");
  _u.writeFileSync(a, e);
  const n = i0.join(Tn.tmpdir(), "mailtyphoon-input.css"), i = u.css != null ? Qf.compileString(u.css).css : "";
  _u.writeFileSync(n, i);
  const s = i0.join(Tn.tmpdir(), "mailtyphoon-output.css");
  _u.writeFileSync(s, "");
  const o = [
    t,
    "--config",
    r,
    "--output",
    s,
    "--content",
    a
  ];
  u.css && (o.push("--input"), o.push(n));
  const d = await j5(zf.argv0, o);
  if (d.exit_code !== 0) {
    console.error("Failed to run Tailwind."), console.error(d.stderr);
    return;
  }
  const c = _u.readFileSync(s, "utf-8") ?? "";
  return {
    html: Y5(e, c, [q5, G5]),
    css: c
  };
}, mo = ji.cwd(), go = new Yf({ max: 100 }), Gf = Xf(Wf(ji.argv)).option("input-html", {
  alias: "i",
  describe: "The path to your input HTML file",
  type: "string",
  default: i0.resolve(mo, "./email.html"),
  demandOption: !0
}).option("output-html", {
  alias: "o",
  describe: "The path to the inlined HTML file that will be generated",
  type: "string",
  default: i0.resolve(mo, "./out.html"),
  demandOption: !0
}).option("input-css", {
  alias: "c",
  type: "string",
  describe: "The path to your custom CSS or SASS file"
}).option("output-css", {
  type: "string",
  describe: "The path to the CSS file that will be generated"
}).option("tailwind-config", {
  type: "string",
  describe: "The path to your custom Tailwind config file",
  default: qf
}).option("reset", {
  type: "string",
  describe: "Set to `false` to disable extended resets",
  default: !1
}).option("watch", {
  alias: "w",
  type: "boolean",
  describe: "Watch for changes in the input HTML or CSS file",
  default: !1
}), Eo = (e) => {
  const u = _u.existsSync(e) ? _u.readFileSync(e, "utf-8") : "";
  return Vf.createHash("sha256").update(u).digest("hex");
}, To = (e, u) => {
  _u.watchFile(e, { interval: 500 }, (t, r) => {
    t.mtime !== r.mtime && u();
  });
}, X5 = async () => {
  const e = await Gf.argv, u = e["input-html"], t = e["output-html"], r = e["input-css"], a = e["output-css"], n = e["tailwind-config"], i = e.reset, s = async () => {
    const o = Eo(u), d = Eo(r ?? ""), c = o + d, E = go.get(c);
    if (E) {
      _u.writeFileSync(t, E);
      return;
    }
    if (!_u.existsSync(u))
      throw new Error(`Input HTML file not found at ${u}`);
    const f = _u.readFileSync(u, "utf-8"), m = {
      css: r != null ? _u.readFileSync(r, "utf-8") : void 0,
      tailwindConfigPath: n,
      reset: i !== "false"
    }, v = await W5(f, m);
    if (v == null)
      throw new Error("Failed to compile HTML");
    const { html: L, css: N } = v;
    t != null && _u.writeFileSync(t, L), a != null && _u.writeFileSync(a, N), go.set(c, L);
  };
  await s(), e.watch && (To(u, s), r != null && To(r, s));
};
X5().catch((e) => {
  console.log(m2.red(e.message)), Gf.showHelp();
});
//# sourceMappingURL=mailtyphoon.js.map
