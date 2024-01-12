import Nl from "crypto";
import et from "fs";
import { LRUCache as Dl } from "lru-cache";
import hr from "path";
import Kn from "process";
import { hideBin as Sl } from "yargs/helpers";
import Ol from "yargs/yargs";
import Oa from "os";
import * as vl from "sass";
import { spawn as Rl } from "child_process";
const va = 10, Eu = (e = 0) => (t) => `\x1B[${t + e}m`, Tu = (e = 0) => (t) => `\x1B[${38 + e};5;${t}m`, gu = (e = 0) => (t, r, n) => `\x1B[${38 + e};2;${t};${r};${n}m`, Ie = {
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
Object.keys(Ie.modifier);
const Pl = Object.keys(Ie.color), Ll = Object.keys(Ie.bgColor);
[...Pl, ...Ll];
function xl() {
  const e = /* @__PURE__ */ new Map();
  for (const [t, r] of Object.entries(Ie)) {
    for (const [n, a] of Object.entries(r))
      Ie[n] = {
        open: `\x1B[${a[0]}m`,
        close: `\x1B[${a[1]}m`
      }, r[n] = Ie[n], e.set(a[0], a[1]);
    Object.defineProperty(Ie, t, {
      value: r,
      enumerable: !1
    });
  }
  return Object.defineProperty(Ie, "codes", {
    value: e,
    enumerable: !1
  }), Ie.color.close = "\x1B[39m", Ie.bgColor.close = "\x1B[49m", Ie.color.ansi = Eu(), Ie.color.ansi256 = Tu(), Ie.color.ansi16m = gu(), Ie.bgColor.ansi = Eu(va), Ie.bgColor.ansi256 = Tu(va), Ie.bgColor.ansi16m = gu(va), Object.defineProperties(Ie, {
    rgbToAnsi256: {
      value(t, r, n) {
        return t === r && r === n ? t < 8 ? 16 : t > 248 ? 231 : Math.round((t - 8) / 247 * 24) + 232 : 16 + 36 * Math.round(t / 255 * 5) + 6 * Math.round(r / 255 * 5) + Math.round(n / 255 * 5);
      },
      enumerable: !1
    },
    hexToRgb: {
      value(t) {
        const r = /[a-f\d]{6}|[a-f\d]{3}/i.exec(t.toString(16));
        if (!r)
          return [0, 0, 0];
        let [n] = r;
        n.length === 3 && (n = [...n].map((i) => i + i).join(""));
        const a = Number.parseInt(n, 16);
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
      value: (t) => Ie.rgbToAnsi256(...Ie.hexToRgb(t)),
      enumerable: !1
    },
    ansi256ToAnsi: {
      value(t) {
        if (t < 8)
          return 30 + t;
        if (t < 16)
          return 90 + (t - 8);
        let r, n, a;
        if (t >= 232)
          r = ((t - 232) * 10 + 8) / 255, n = r, a = r;
        else {
          t -= 16;
          const o = t % 36;
          r = Math.floor(t / 36) / 5, n = Math.floor(o / 6) / 5, a = o % 6 / 5;
        }
        const i = Math.max(r, n, a) * 2;
        if (i === 0)
          return 30;
        let u = 30 + (Math.round(a) << 2 | Math.round(n) << 1 | Math.round(r));
        return i === 2 && (u += 60), u;
      },
      enumerable: !1
    },
    rgbToAnsi: {
      value: (t, r, n) => Ie.ansi256ToAnsi(Ie.rgbToAnsi256(t, r, n)),
      enumerable: !1
    },
    hexToAnsi: {
      value: (t) => Ie.ansi256ToAnsi(Ie.hexToAnsi256(t)),
      enumerable: !1
    }
  }), Ie;
}
const wl = xl(), mt = wl, yn = (() => {
  if (navigator.userAgentData) {
    const e = navigator.userAgentData.brands.find(({ brand: t }) => t === "Chromium");
    if (e && e.version > 93)
      return 3;
  }
  return /\b(Chrome|Chromium)\//.test(navigator.userAgent) ? 1 : 0;
})(), _u = yn !== 0 && {
  level: yn,
  hasBasic: !0,
  has256: yn >= 2,
  has16m: yn >= 3
}, Ml = {
  stdout: _u,
  stderr: _u
}, Bl = Ml;
function kl(e, t, r) {
  let n = e.indexOf(t);
  if (n === -1)
    return e;
  const a = t.length;
  let i = 0, u = "";
  do
    u += e.slice(i, n) + t + r, i = n + a, n = e.indexOf(t, i);
  while (n !== -1);
  return u += e.slice(i), u;
}
function Fl(e, t, r, n) {
  let a = 0, i = "";
  do {
    const u = e[n - 1] === "\r";
    i += e.slice(a, u ? n - 1 : n) + t + (u ? `\r
` : `
`) + r, a = n + 1, n = e.indexOf(`
`, a);
  } while (n !== -1);
  return i += e.slice(a), i;
}
const { stdout: bu, stderr: Au } = Bl, ai = Symbol("GENERATOR"), _r = Symbol("STYLER"), Jr = Symbol("IS_EMPTY"), Iu = [
  "ansi",
  "ansi",
  "ansi256",
  "ansi16m"
], br = /* @__PURE__ */ Object.create(null), Ul = (e, t = {}) => {
  if (t.level && !(Number.isInteger(t.level) && t.level >= 0 && t.level <= 3))
    throw new Error("The `level` option should be an integer from 0 to 3");
  const r = bu ? bu.level : 0;
  e.level = t.level === void 0 ? r : t.level;
}, Hl = (e) => {
  const t = (...r) => r.join(" ");
  return Ul(t, e), Object.setPrototypeOf(t, cn.prototype), t;
};
function cn(e) {
  return Hl(e);
}
Object.setPrototypeOf(cn.prototype, Function.prototype);
for (const [e, t] of Object.entries(mt))
  br[e] = {
    get() {
      const r = Gn(this, ui(t.open, t.close, this[_r]), this[Jr]);
      return Object.defineProperty(this, e, { value: r }), r;
    }
  };
br.visible = {
  get() {
    const e = Gn(this, this[_r], !0);
    return Object.defineProperty(this, "visible", { value: e }), e;
  }
};
const ii = (e, t, r, ...n) => e === "rgb" ? t === "ansi16m" ? mt[r].ansi16m(...n) : t === "ansi256" ? mt[r].ansi256(mt.rgbToAnsi256(...n)) : mt[r].ansi(mt.rgbToAnsi(...n)) : e === "hex" ? ii("rgb", t, r, ...mt.hexToRgb(...n)) : mt[r][e](...n), Gl = ["rgb", "hex", "ansi256"];
for (const e of Gl) {
  br[e] = {
    get() {
      const { level: r } = this;
      return function(...n) {
        const a = ui(ii(e, Iu[r], "color", ...n), mt.color.close, this[_r]);
        return Gn(this, a, this[Jr]);
      };
    }
  };
  const t = "bg" + e[0].toUpperCase() + e.slice(1);
  br[t] = {
    get() {
      const { level: r } = this;
      return function(...n) {
        const a = ui(ii(e, Iu[r], "bgColor", ...n), mt.bgColor.close, this[_r]);
        return Gn(this, a, this[Jr]);
      };
    }
  };
}
const jl = Object.defineProperties(() => {
}, {
  ...br,
  level: {
    enumerable: !0,
    get() {
      return this[ai].level;
    },
    set(e) {
      this[ai].level = e;
    }
  }
}), ui = (e, t, r) => {
  let n, a;
  return r === void 0 ? (n = e, a = t) : (n = r.openAll + e, a = t + r.closeAll), {
    open: e,
    close: t,
    openAll: n,
    closeAll: a,
    parent: r
  };
}, Gn = (e, t, r) => {
  const n = (...a) => ql(n, a.length === 1 ? "" + a[0] : a.join(" "));
  return Object.setPrototypeOf(n, jl), n[ai] = e, n[_r] = t, n[Jr] = r, n;
}, ql = (e, t) => {
  if (e.level <= 0 || !t)
    return e[Jr] ? "" : t;
  let r = e[_r];
  if (r === void 0)
    return t;
  const { openAll: n, closeAll: a } = r;
  if (t.includes("\x1B"))
    for (; r !== void 0; )
      t = kl(t, r.close, r.open), r = r.parent;
  const i = t.indexOf(`
`);
  return i !== -1 && (t = Fl(t, a, n, i)), n + t + a;
};
Object.defineProperties(cn.prototype, br);
const Yl = cn();
cn({ level: Au ? Au.level : 0 });
const Vl = Yl;
var w = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ui(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function qs(e) {
  if (e.__esModule)
    return e;
  var t = e.default;
  if (typeof t == "function") {
    var r = function n() {
      return this instanceof n ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    r.prototype = t.prototype;
  } else
    r = {};
  return Object.defineProperty(r, "__esModule", { value: !0 }), Object.keys(e).forEach(function(n) {
    var a = Object.getOwnPropertyDescriptor(e, n);
    Object.defineProperty(r, n, a.get ? a : {
      enumerable: !0,
      get: function() {
        return e[n];
      }
    });
  }), r;
}
var Ys = { exports: {} }, Vs = {}, $s = {};
Object.defineProperty($s, "__esModule", { value: !0 });
var Zn = {}, Pr = {}, jn = w && w.__assign || function() {
  return jn = Object.assign || function(e) {
    for (var t, r = 1, n = arguments.length; r < n; r++) {
      t = arguments[r];
      for (var a in t)
        Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
    }
    return e;
  }, jn.apply(this, arguments);
};
Object.defineProperty(Pr, "__esModule", { value: !0 });
Pr.flatten = void 0;
var $l = {
  xml: !1,
  decodeEntities: !0
};
Pr.default = $l;
var yu = {
  _useHtmlParser2: !0,
  xmlMode: !0
};
function Wl(e) {
  return e != null && e.xml ? typeof e.xml == "boolean" ? yu : jn(jn({}, yu), e.xml) : e ?? void 0;
}
Pr.flatten = Wl;
var Oe = {}, ot = {}, rt = {}, He = {}, Lr = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.Doctype = e.CDATA = e.Tag = e.Style = e.Script = e.Comment = e.Directive = e.Text = e.Root = e.isTag = e.ElementType = void 0;
  var t;
  (function(n) {
    n.Root = "root", n.Text = "text", n.Directive = "directive", n.Comment = "comment", n.Script = "script", n.Style = "style", n.Tag = "tag", n.CDATA = "cdata", n.Doctype = "doctype";
  })(t = e.ElementType || (e.ElementType = {}));
  function r(n) {
    return n.type === t.Tag || n.type === t.Script || n.type === t.Style;
  }
  e.isTag = r, e.Root = t.Root, e.Text = t.Text, e.Directive = t.Directive, e.Comment = t.Comment, e.Script = t.Script, e.Style = t.Style, e.Tag = t.Tag, e.CDATA = t.CDATA, e.Doctype = t.Doctype;
})(Lr);
var ue = {}, Ht = w && w.__extends || /* @__PURE__ */ function() {
  var e = function(t, r) {
    return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        Object.prototype.hasOwnProperty.call(a, i) && (n[i] = a[i]);
    }, e(t, r);
  };
  return function(t, r) {
    if (typeof r != "function" && r !== null)
      throw new TypeError("Class extends value " + String(r) + " is not a constructor or null");
    e(t, r);
    function n() {
      this.constructor = t;
    }
    t.prototype = r === null ? Object.create(r) : (n.prototype = r.prototype, new n());
  };
}(), $r = w && w.__assign || function() {
  return $r = Object.assign || function(e) {
    for (var t, r = 1, n = arguments.length; r < n; r++) {
      t = arguments[r];
      for (var a in t)
        Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
    }
    return e;
  }, $r.apply(this, arguments);
};
Object.defineProperty(ue, "__esModule", { value: !0 });
ue.cloneNode = ue.hasChildren = ue.isDocument = ue.isDirective = ue.isComment = ue.isText = ue.isCDATA = ue.isTag = ue.Element = ue.Document = ue.CDATA = ue.NodeWithChildren = ue.ProcessingInstruction = ue.Comment = ue.Text = ue.DataNode = ue.Node = void 0;
var Ke = Lr, Hi = (
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
      set: function(t) {
        this.parent = t;
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
      set: function(t) {
        this.prev = t;
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
      set: function(t) {
        this.next = t;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.cloneNode = function(t) {
      return t === void 0 && (t = !1), Gi(this, t);
    }, e;
  }()
);
ue.Node = Hi;
var Jn = (
  /** @class */
  function(e) {
    Ht(t, e);
    function t(r) {
      var n = e.call(this) || this;
      return n.data = r, n;
    }
    return Object.defineProperty(t.prototype, "nodeValue", {
      /**
       * Same as {@link data}.
       * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
       */
      get: function() {
        return this.data;
      },
      set: function(r) {
        this.data = r;
      },
      enumerable: !1,
      configurable: !0
    }), t;
  }(Hi)
);
ue.DataNode = Jn;
var Ws = (
  /** @class */
  function(e) {
    Ht(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = Ke.ElementType.Text, r;
    }
    return Object.defineProperty(t.prototype, "nodeType", {
      get: function() {
        return 3;
      },
      enumerable: !1,
      configurable: !0
    }), t;
  }(Jn)
);
ue.Text = Ws;
var Qs = (
  /** @class */
  function(e) {
    Ht(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = Ke.ElementType.Comment, r;
    }
    return Object.defineProperty(t.prototype, "nodeType", {
      get: function() {
        return 8;
      },
      enumerable: !1,
      configurable: !0
    }), t;
  }(Jn)
);
ue.Comment = Qs;
var Xs = (
  /** @class */
  function(e) {
    Ht(t, e);
    function t(r, n) {
      var a = e.call(this, n) || this;
      return a.name = r, a.type = Ke.ElementType.Directive, a;
    }
    return Object.defineProperty(t.prototype, "nodeType", {
      get: function() {
        return 1;
      },
      enumerable: !1,
      configurable: !0
    }), t;
  }(Jn)
);
ue.ProcessingInstruction = Xs;
var ea = (
  /** @class */
  function(e) {
    Ht(t, e);
    function t(r) {
      var n = e.call(this) || this;
      return n.children = r, n;
    }
    return Object.defineProperty(t.prototype, "firstChild", {
      // Aliases
      /** First child of the node. */
      get: function() {
        var r;
        return (r = this.children[0]) !== null && r !== void 0 ? r : null;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "lastChild", {
      /** Last child of the node. */
      get: function() {
        return this.children.length > 0 ? this.children[this.children.length - 1] : null;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "childNodes", {
      /**
       * Same as {@link children}.
       * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
       */
      get: function() {
        return this.children;
      },
      set: function(r) {
        this.children = r;
      },
      enumerable: !1,
      configurable: !0
    }), t;
  }(Hi)
);
ue.NodeWithChildren = ea;
var zs = (
  /** @class */
  function(e) {
    Ht(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = Ke.ElementType.CDATA, r;
    }
    return Object.defineProperty(t.prototype, "nodeType", {
      get: function() {
        return 4;
      },
      enumerable: !1,
      configurable: !0
    }), t;
  }(ea)
);
ue.CDATA = zs;
var Ks = (
  /** @class */
  function(e) {
    Ht(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = Ke.ElementType.Root, r;
    }
    return Object.defineProperty(t.prototype, "nodeType", {
      get: function() {
        return 9;
      },
      enumerable: !1,
      configurable: !0
    }), t;
  }(ea)
);
ue.Document = Ks;
var Zs = (
  /** @class */
  function(e) {
    Ht(t, e);
    function t(r, n, a, i) {
      a === void 0 && (a = []), i === void 0 && (i = r === "script" ? Ke.ElementType.Script : r === "style" ? Ke.ElementType.Style : Ke.ElementType.Tag);
      var u = e.call(this, a) || this;
      return u.name = r, u.attribs = n, u.type = i, u;
    }
    return Object.defineProperty(t.prototype, "nodeType", {
      get: function() {
        return 1;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "tagName", {
      // DOM Level 1 aliases
      /**
       * Same as {@link name}.
       * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
       */
      get: function() {
        return this.name;
      },
      set: function(r) {
        this.name = r;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "attributes", {
      get: function() {
        var r = this;
        return Object.keys(this.attribs).map(function(n) {
          var a, i;
          return {
            name: n,
            value: r.attribs[n],
            namespace: (a = r["x-attribsNamespace"]) === null || a === void 0 ? void 0 : a[n],
            prefix: (i = r["x-attribsPrefix"]) === null || i === void 0 ? void 0 : i[n]
          };
        });
      },
      enumerable: !1,
      configurable: !0
    }), t;
  }(ea)
);
ue.Element = Zs;
function Js(e) {
  return (0, Ke.isTag)(e);
}
ue.isTag = Js;
function eo(e) {
  return e.type === Ke.ElementType.CDATA;
}
ue.isCDATA = eo;
function to(e) {
  return e.type === Ke.ElementType.Text;
}
ue.isText = to;
function ro(e) {
  return e.type === Ke.ElementType.Comment;
}
ue.isComment = ro;
function no(e) {
  return e.type === Ke.ElementType.Directive;
}
ue.isDirective = no;
function ao(e) {
  return e.type === Ke.ElementType.Root;
}
ue.isDocument = ao;
function Ql(e) {
  return Object.prototype.hasOwnProperty.call(e, "children");
}
ue.hasChildren = Ql;
function Gi(e, t) {
  t === void 0 && (t = !1);
  var r;
  if (to(e))
    r = new Ws(e.data);
  else if (ro(e))
    r = new Qs(e.data);
  else if (Js(e)) {
    var n = t ? Ra(e.children) : [], a = new Zs(e.name, $r({}, e.attribs), n);
    n.forEach(function(c) {
      return c.parent = a;
    }), e.namespace != null && (a.namespace = e.namespace), e["x-attribsNamespace"] && (a["x-attribsNamespace"] = $r({}, e["x-attribsNamespace"])), e["x-attribsPrefix"] && (a["x-attribsPrefix"] = $r({}, e["x-attribsPrefix"])), r = a;
  } else if (eo(e)) {
    var n = t ? Ra(e.children) : [], i = new zs(n);
    n.forEach(function(h) {
      return h.parent = i;
    }), r = i;
  } else if (ao(e)) {
    var n = t ? Ra(e.children) : [], u = new Ks(n);
    n.forEach(function(h) {
      return h.parent = u;
    }), e["x-mode"] && (u["x-mode"] = e["x-mode"]), r = u;
  } else if (no(e)) {
    var o = new Xs(e.name, e.data);
    e["x-name"] != null && (o["x-name"] = e["x-name"], o["x-publicId"] = e["x-publicId"], o["x-systemId"] = e["x-systemId"]), r = o;
  } else
    throw new Error("Not implemented yet: ".concat(e.type));
  return r.startIndex = e.startIndex, r.endIndex = e.endIndex, e.sourceCodeLocation != null && (r.sourceCodeLocation = e.sourceCodeLocation), r;
}
ue.cloneNode = Gi;
function Ra(e) {
  for (var t = e.map(function(n) {
    return Gi(n, !0);
  }), r = 1; r < t.length; r++)
    t[r].prev = t[r - 1], t[r - 1].next = t[r];
  return t;
}
(function(e) {
  var t = w && w.__createBinding || (Object.create ? function(o, c, h, s) {
    s === void 0 && (s = h);
    var g = Object.getOwnPropertyDescriptor(c, h);
    (!g || ("get" in g ? !c.__esModule : g.writable || g.configurable)) && (g = { enumerable: !0, get: function() {
      return c[h];
    } }), Object.defineProperty(o, s, g);
  } : function(o, c, h, s) {
    s === void 0 && (s = h), o[s] = c[h];
  }), r = w && w.__exportStar || function(o, c) {
    for (var h in o)
      h !== "default" && !Object.prototype.hasOwnProperty.call(c, h) && t(c, o, h);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.DomHandler = void 0;
  var n = Lr, a = ue;
  r(ue, e);
  var i = {
    withStartIndices: !1,
    withEndIndices: !1,
    xmlMode: !1
  }, u = (
    /** @class */
    function() {
      function o(c, h, s) {
        this.dom = [], this.root = new a.Document(this.dom), this.done = !1, this.tagStack = [this.root], this.lastNode = null, this.parser = null, typeof h == "function" && (s = h, h = i), typeof c == "object" && (h = c, c = void 0), this.callback = c ?? null, this.options = h ?? i, this.elementCB = s ?? null;
      }
      return o.prototype.onparserinit = function(c) {
        this.parser = c;
      }, o.prototype.onreset = function() {
        this.dom = [], this.root = new a.Document(this.dom), this.done = !1, this.tagStack = [this.root], this.lastNode = null, this.parser = null;
      }, o.prototype.onend = function() {
        this.done || (this.done = !0, this.parser = null, this.handleCallback(null));
      }, o.prototype.onerror = function(c) {
        this.handleCallback(c);
      }, o.prototype.onclosetag = function() {
        this.lastNode = null;
        var c = this.tagStack.pop();
        this.options.withEndIndices && (c.endIndex = this.parser.endIndex), this.elementCB && this.elementCB(c);
      }, o.prototype.onopentag = function(c, h) {
        var s = this.options.xmlMode ? n.ElementType.Tag : void 0, g = new a.Element(c, h, void 0, s);
        this.addNode(g), this.tagStack.push(g);
      }, o.prototype.ontext = function(c) {
        var h = this.lastNode;
        if (h && h.type === n.ElementType.Text)
          h.data += c, this.options.withEndIndices && (h.endIndex = this.parser.endIndex);
        else {
          var s = new a.Text(c);
          this.addNode(s), this.lastNode = s;
        }
      }, o.prototype.oncomment = function(c) {
        if (this.lastNode && this.lastNode.type === n.ElementType.Comment) {
          this.lastNode.data += c;
          return;
        }
        var h = new a.Comment(c);
        this.addNode(h), this.lastNode = h;
      }, o.prototype.oncommentend = function() {
        this.lastNode = null;
      }, o.prototype.oncdatastart = function() {
        var c = new a.Text(""), h = new a.CDATA([c]);
        this.addNode(h), c.parent = h, this.lastNode = c;
      }, o.prototype.oncdataend = function() {
        this.lastNode = null;
      }, o.prototype.onprocessinginstruction = function(c, h) {
        var s = new a.ProcessingInstruction(c, h);
        this.addNode(s);
      }, o.prototype.handleCallback = function(c) {
        if (typeof this.callback == "function")
          this.callback(c, this.dom);
        else if (c)
          throw c;
      }, o.prototype.addNode = function(c) {
        var h = this.tagStack[this.tagStack.length - 1], s = h.children[h.children.length - 1];
        this.options.withStartIndices && (c.startIndex = this.parser.startIndex), this.options.withEndIndices && (c.endIndex = this.parser.endIndex), h.children.push(c), s && (c.prev = s, s.next = c), c.parent = h, this.lastNode = null;
      }, o;
    }()
  );
  e.DomHandler = u, e.default = u;
})(He);
var xr = {}, io = {}, Ar = {}, ji = {};
Object.defineProperty(ji, "__esModule", { value: !0 });
ji.default = new Uint16Array(
  // prettier-ignore
  'ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map(function(e) {
    return e.charCodeAt(0);
  })
);
var qi = {};
Object.defineProperty(qi, "__esModule", { value: !0 });
qi.default = new Uint16Array(
  // prettier-ignore
  "Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map(function(e) {
    return e.charCodeAt(0);
  })
);
var si = {};
(function(e) {
  var t;
  Object.defineProperty(e, "__esModule", { value: !0 }), e.replaceCodePoint = e.fromCodePoint = void 0;
  var r = /* @__PURE__ */ new Map([
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
  (t = String.fromCodePoint) !== null && t !== void 0 ? t : function(i) {
    var u = "";
    return i > 65535 && (i -= 65536, u += String.fromCharCode(i >>> 10 & 1023 | 55296), i = 56320 | i & 1023), u += String.fromCharCode(i), u;
  };
  function n(i) {
    var u;
    return i >= 55296 && i <= 57343 || i > 1114111 ? 65533 : (u = r.get(i)) !== null && u !== void 0 ? u : i;
  }
  e.replaceCodePoint = n;
  function a(i) {
    return (0, e.fromCodePoint)(n(i));
  }
  e.default = a;
})(si);
(function(e) {
  var t = w && w.__createBinding || (Object.create ? function(I, O, x, M) {
    M === void 0 && (M = x);
    var G = Object.getOwnPropertyDescriptor(O, x);
    (!G || ("get" in G ? !O.__esModule : G.writable || G.configurable)) && (G = { enumerable: !0, get: function() {
      return O[x];
    } }), Object.defineProperty(I, M, G);
  } : function(I, O, x, M) {
    M === void 0 && (M = x), I[M] = O[x];
  }), r = w && w.__setModuleDefault || (Object.create ? function(I, O) {
    Object.defineProperty(I, "default", { enumerable: !0, value: O });
  } : function(I, O) {
    I.default = O;
  }), n = w && w.__importStar || function(I) {
    if (I && I.__esModule)
      return I;
    var O = {};
    if (I != null)
      for (var x in I)
        x !== "default" && Object.prototype.hasOwnProperty.call(I, x) && t(O, I, x);
    return r(O, I), O;
  }, a = w && w.__importDefault || function(I) {
    return I && I.__esModule ? I : { default: I };
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.decodeXML = e.decodeHTMLStrict = e.decodeHTMLAttribute = e.decodeHTML = e.determineBranch = e.EntityDecoder = e.DecodingMode = e.BinTrieFlags = e.fromCodePoint = e.replaceCodePoint = e.decodeCodePoint = e.xmlDecodeTree = e.htmlDecodeTree = void 0;
  var i = a(ji);
  e.htmlDecodeTree = i.default;
  var u = a(qi);
  e.xmlDecodeTree = u.default;
  var o = n(si);
  e.decodeCodePoint = o.default;
  var c = si;
  Object.defineProperty(e, "replaceCodePoint", { enumerable: !0, get: function() {
    return c.replaceCodePoint;
  } }), Object.defineProperty(e, "fromCodePoint", { enumerable: !0, get: function() {
    return c.fromCodePoint;
  } });
  var h;
  (function(I) {
    I[I.NUM = 35] = "NUM", I[I.SEMI = 59] = "SEMI", I[I.EQUALS = 61] = "EQUALS", I[I.ZERO = 48] = "ZERO", I[I.NINE = 57] = "NINE", I[I.LOWER_A = 97] = "LOWER_A", I[I.LOWER_F = 102] = "LOWER_F", I[I.LOWER_X = 120] = "LOWER_X", I[I.LOWER_Z = 122] = "LOWER_Z", I[I.UPPER_A = 65] = "UPPER_A", I[I.UPPER_F = 70] = "UPPER_F", I[I.UPPER_Z = 90] = "UPPER_Z";
  })(h || (h = {}));
  var s = 32, g;
  (function(I) {
    I[I.VALUE_LENGTH = 49152] = "VALUE_LENGTH", I[I.BRANCH_LENGTH = 16256] = "BRANCH_LENGTH", I[I.JUMP_TABLE = 127] = "JUMP_TABLE";
  })(g = e.BinTrieFlags || (e.BinTrieFlags = {}));
  function p(I) {
    return I >= h.ZERO && I <= h.NINE;
  }
  function m(I) {
    return I >= h.UPPER_A && I <= h.UPPER_F || I >= h.LOWER_A && I <= h.LOWER_F;
  }
  function b(I) {
    return I >= h.UPPER_A && I <= h.UPPER_Z || I >= h.LOWER_A && I <= h.LOWER_Z || p(I);
  }
  function R(I) {
    return I === h.EQUALS || b(I);
  }
  var C;
  (function(I) {
    I[I.EntityStart = 0] = "EntityStart", I[I.NumericStart = 1] = "NumericStart", I[I.NumericDecimal = 2] = "NumericDecimal", I[I.NumericHex = 3] = "NumericHex", I[I.NamedEntity = 4] = "NamedEntity";
  })(C || (C = {}));
  var D;
  (function(I) {
    I[I.Legacy = 0] = "Legacy", I[I.Strict = 1] = "Strict", I[I.Attribute = 2] = "Attribute";
  })(D = e.DecodingMode || (e.DecodingMode = {}));
  var S = (
    /** @class */
    function() {
      function I(O, x, M) {
        this.decodeTree = O, this.emitCodePoint = x, this.errors = M, this.state = C.EntityStart, this.consumed = 1, this.result = 0, this.treeIndex = 0, this.excess = 1, this.decodeMode = D.Strict;
      }
      return I.prototype.startEntity = function(O) {
        this.decodeMode = O, this.state = C.EntityStart, this.result = 0, this.treeIndex = 0, this.excess = 1, this.consumed = 1;
      }, I.prototype.write = function(O, x) {
        switch (this.state) {
          case C.EntityStart:
            return O.charCodeAt(x) === h.NUM ? (this.state = C.NumericStart, this.consumed += 1, this.stateNumericStart(O, x + 1)) : (this.state = C.NamedEntity, this.stateNamedEntity(O, x));
          case C.NumericStart:
            return this.stateNumericStart(O, x);
          case C.NumericDecimal:
            return this.stateNumericDecimal(O, x);
          case C.NumericHex:
            return this.stateNumericHex(O, x);
          case C.NamedEntity:
            return this.stateNamedEntity(O, x);
        }
      }, I.prototype.stateNumericStart = function(O, x) {
        return x >= O.length ? -1 : (O.charCodeAt(x) | s) === h.LOWER_X ? (this.state = C.NumericHex, this.consumed += 1, this.stateNumericHex(O, x + 1)) : (this.state = C.NumericDecimal, this.stateNumericDecimal(O, x));
      }, I.prototype.addToNumericResult = function(O, x, M, G) {
        if (x !== M) {
          var W = M - x;
          this.result = this.result * Math.pow(G, W) + parseInt(O.substr(x, W), G), this.consumed += W;
        }
      }, I.prototype.stateNumericHex = function(O, x) {
        for (var M = x; x < O.length; ) {
          var G = O.charCodeAt(x);
          if (p(G) || m(G))
            x += 1;
          else
            return this.addToNumericResult(O, M, x, 16), this.emitNumericEntity(G, 3);
        }
        return this.addToNumericResult(O, M, x, 16), -1;
      }, I.prototype.stateNumericDecimal = function(O, x) {
        for (var M = x; x < O.length; ) {
          var G = O.charCodeAt(x);
          if (p(G))
            x += 1;
          else
            return this.addToNumericResult(O, M, x, 10), this.emitNumericEntity(G, 2);
        }
        return this.addToNumericResult(O, M, x, 10), -1;
      }, I.prototype.emitNumericEntity = function(O, x) {
        var M;
        if (this.consumed <= x)
          return (M = this.errors) === null || M === void 0 || M.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
        if (O === h.SEMI)
          this.consumed += 1;
        else if (this.decodeMode === D.Strict)
          return 0;
        return this.emitCodePoint((0, o.replaceCodePoint)(this.result), this.consumed), this.errors && (O !== h.SEMI && this.errors.missingSemicolonAfterCharacterReference(), this.errors.validateNumericCharacterReference(this.result)), this.consumed;
      }, I.prototype.stateNamedEntity = function(O, x) {
        for (var M = this.decodeTree, G = M[this.treeIndex], W = (G & g.VALUE_LENGTH) >> 14; x < O.length; x++, this.excess++) {
          var V = O.charCodeAt(x);
          if (this.treeIndex = P(M, G, this.treeIndex + Math.max(1, W), V), this.treeIndex < 0)
            return this.result === 0 || // If we are parsing an attribute
            this.decodeMode === D.Attribute && // We shouldn't have consumed any characters after the entity,
            (W === 0 || // And there should be no invalid characters.
            R(V)) ? 0 : this.emitNotTerminatedNamedEntity();
          if (G = M[this.treeIndex], W = (G & g.VALUE_LENGTH) >> 14, W !== 0) {
            if (V === h.SEMI)
              return this.emitNamedEntityData(this.treeIndex, W, this.consumed + this.excess);
            this.decodeMode !== D.Strict && (this.result = this.treeIndex, this.consumed += this.excess, this.excess = 0);
          }
        }
        return -1;
      }, I.prototype.emitNotTerminatedNamedEntity = function() {
        var O, x = this, M = x.result, G = x.decodeTree, W = (G[M] & g.VALUE_LENGTH) >> 14;
        return this.emitNamedEntityData(M, W, this.consumed), (O = this.errors) === null || O === void 0 || O.missingSemicolonAfterCharacterReference(), this.consumed;
      }, I.prototype.emitNamedEntityData = function(O, x, M) {
        var G = this.decodeTree;
        return this.emitCodePoint(x === 1 ? G[O] & ~g.VALUE_LENGTH : G[O + 1], M), x === 3 && this.emitCodePoint(G[O + 2], M), M;
      }, I.prototype.end = function() {
        var O;
        switch (this.state) {
          case C.NamedEntity:
            return this.result !== 0 && (this.decodeMode !== D.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
          case C.NumericDecimal:
            return this.emitNumericEntity(0, 2);
          case C.NumericHex:
            return this.emitNumericEntity(0, 3);
          case C.NumericStart:
            return (O = this.errors) === null || O === void 0 || O.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
          case C.EntityStart:
            return 0;
        }
      }, I;
    }()
  );
  e.EntityDecoder = S;
  function B(I) {
    var O = "", x = new S(I, function(M) {
      return O += (0, o.fromCodePoint)(M);
    });
    return function(G, W) {
      for (var V = 0, Q = 0; (Q = G.indexOf("&", Q)) >= 0; ) {
        O += G.slice(V, Q), x.startEntity(W);
        var z = x.write(
          G,
          // Skip the "&"
          Q + 1
        );
        if (z < 0) {
          V = Q + x.end();
          break;
        }
        V = Q + z, Q = z === 0 ? V + 1 : V;
      }
      var J = O + G.slice(V);
      return O = "", J;
    };
  }
  function P(I, O, x, M) {
    var G = (O & g.BRANCH_LENGTH) >> 7, W = O & g.JUMP_TABLE;
    if (G === 0)
      return W !== 0 && M === W ? x : -1;
    if (W) {
      var V = M - W;
      return V < 0 || V >= G ? -1 : I[x + V] - 1;
    }
    for (var Q = x, z = Q + G - 1; Q <= z; ) {
      var J = Q + z >>> 1, Be = I[J];
      if (Be < M)
        Q = J + 1;
      else if (Be > M)
        z = J - 1;
      else
        return I[J + G];
    }
    return -1;
  }
  e.determineBranch = P;
  var L = B(i.default), H = B(u.default);
  function $(I, O) {
    return O === void 0 && (O = D.Legacy), L(I, O);
  }
  e.decodeHTML = $;
  function ne(I) {
    return L(I, D.Attribute);
  }
  e.decodeHTMLAttribute = ne;
  function oe(I) {
    return L(I, D.Strict);
  }
  e.decodeHTMLStrict = oe;
  function q(I) {
    return H(I, D.Strict);
  }
  e.decodeXML = q;
})(Ar);
var Qt = {}, Yi = {};
Object.defineProperty(Yi, "__esModule", { value: !0 });
function Cn(e) {
  for (var t = 1; t < e.length; t++)
    e[t][0] += e[t - 1][0] + 1;
  return e;
}
Yi.default = new Map(/* @__PURE__ */ Cn([[9, "&Tab;"], [0, "&NewLine;"], [22, "&excl;"], [0, "&quot;"], [0, "&num;"], [0, "&dollar;"], [0, "&percnt;"], [0, "&amp;"], [0, "&apos;"], [0, "&lpar;"], [0, "&rpar;"], [0, "&ast;"], [0, "&plus;"], [0, "&comma;"], [1, "&period;"], [0, "&sol;"], [10, "&colon;"], [0, "&semi;"], [0, { v: "&lt;", n: 8402, o: "&nvlt;" }], [0, { v: "&equals;", n: 8421, o: "&bne;" }], [0, { v: "&gt;", n: 8402, o: "&nvgt;" }], [0, "&quest;"], [0, "&commat;"], [26, "&lbrack;"], [0, "&bsol;"], [0, "&rbrack;"], [0, "&Hat;"], [0, "&lowbar;"], [0, "&DiacriticalGrave;"], [5, { n: 106, o: "&fjlig;" }], [20, "&lbrace;"], [0, "&verbar;"], [0, "&rbrace;"], [34, "&nbsp;"], [0, "&iexcl;"], [0, "&cent;"], [0, "&pound;"], [0, "&curren;"], [0, "&yen;"], [0, "&brvbar;"], [0, "&sect;"], [0, "&die;"], [0, "&copy;"], [0, "&ordf;"], [0, "&laquo;"], [0, "&not;"], [0, "&shy;"], [0, "&circledR;"], [0, "&macr;"], [0, "&deg;"], [0, "&PlusMinus;"], [0, "&sup2;"], [0, "&sup3;"], [0, "&acute;"], [0, "&micro;"], [0, "&para;"], [0, "&centerdot;"], [0, "&cedil;"], [0, "&sup1;"], [0, "&ordm;"], [0, "&raquo;"], [0, "&frac14;"], [0, "&frac12;"], [0, "&frac34;"], [0, "&iquest;"], [0, "&Agrave;"], [0, "&Aacute;"], [0, "&Acirc;"], [0, "&Atilde;"], [0, "&Auml;"], [0, "&angst;"], [0, "&AElig;"], [0, "&Ccedil;"], [0, "&Egrave;"], [0, "&Eacute;"], [0, "&Ecirc;"], [0, "&Euml;"], [0, "&Igrave;"], [0, "&Iacute;"], [0, "&Icirc;"], [0, "&Iuml;"], [0, "&ETH;"], [0, "&Ntilde;"], [0, "&Ograve;"], [0, "&Oacute;"], [0, "&Ocirc;"], [0, "&Otilde;"], [0, "&Ouml;"], [0, "&times;"], [0, "&Oslash;"], [0, "&Ugrave;"], [0, "&Uacute;"], [0, "&Ucirc;"], [0, "&Uuml;"], [0, "&Yacute;"], [0, "&THORN;"], [0, "&szlig;"], [0, "&agrave;"], [0, "&aacute;"], [0, "&acirc;"], [0, "&atilde;"], [0, "&auml;"], [0, "&aring;"], [0, "&aelig;"], [0, "&ccedil;"], [0, "&egrave;"], [0, "&eacute;"], [0, "&ecirc;"], [0, "&euml;"], [0, "&igrave;"], [0, "&iacute;"], [0, "&icirc;"], [0, "&iuml;"], [0, "&eth;"], [0, "&ntilde;"], [0, "&ograve;"], [0, "&oacute;"], [0, "&ocirc;"], [0, "&otilde;"], [0, "&ouml;"], [0, "&div;"], [0, "&oslash;"], [0, "&ugrave;"], [0, "&uacute;"], [0, "&ucirc;"], [0, "&uuml;"], [0, "&yacute;"], [0, "&thorn;"], [0, "&yuml;"], [0, "&Amacr;"], [0, "&amacr;"], [0, "&Abreve;"], [0, "&abreve;"], [0, "&Aogon;"], [0, "&aogon;"], [0, "&Cacute;"], [0, "&cacute;"], [0, "&Ccirc;"], [0, "&ccirc;"], [0, "&Cdot;"], [0, "&cdot;"], [0, "&Ccaron;"], [0, "&ccaron;"], [0, "&Dcaron;"], [0, "&dcaron;"], [0, "&Dstrok;"], [0, "&dstrok;"], [0, "&Emacr;"], [0, "&emacr;"], [2, "&Edot;"], [0, "&edot;"], [0, "&Eogon;"], [0, "&eogon;"], [0, "&Ecaron;"], [0, "&ecaron;"], [0, "&Gcirc;"], [0, "&gcirc;"], [0, "&Gbreve;"], [0, "&gbreve;"], [0, "&Gdot;"], [0, "&gdot;"], [0, "&Gcedil;"], [1, "&Hcirc;"], [0, "&hcirc;"], [0, "&Hstrok;"], [0, "&hstrok;"], [0, "&Itilde;"], [0, "&itilde;"], [0, "&Imacr;"], [0, "&imacr;"], [2, "&Iogon;"], [0, "&iogon;"], [0, "&Idot;"], [0, "&imath;"], [0, "&IJlig;"], [0, "&ijlig;"], [0, "&Jcirc;"], [0, "&jcirc;"], [0, "&Kcedil;"], [0, "&kcedil;"], [0, "&kgreen;"], [0, "&Lacute;"], [0, "&lacute;"], [0, "&Lcedil;"], [0, "&lcedil;"], [0, "&Lcaron;"], [0, "&lcaron;"], [0, "&Lmidot;"], [0, "&lmidot;"], [0, "&Lstrok;"], [0, "&lstrok;"], [0, "&Nacute;"], [0, "&nacute;"], [0, "&Ncedil;"], [0, "&ncedil;"], [0, "&Ncaron;"], [0, "&ncaron;"], [0, "&napos;"], [0, "&ENG;"], [0, "&eng;"], [0, "&Omacr;"], [0, "&omacr;"], [2, "&Odblac;"], [0, "&odblac;"], [0, "&OElig;"], [0, "&oelig;"], [0, "&Racute;"], [0, "&racute;"], [0, "&Rcedil;"], [0, "&rcedil;"], [0, "&Rcaron;"], [0, "&rcaron;"], [0, "&Sacute;"], [0, "&sacute;"], [0, "&Scirc;"], [0, "&scirc;"], [0, "&Scedil;"], [0, "&scedil;"], [0, "&Scaron;"], [0, "&scaron;"], [0, "&Tcedil;"], [0, "&tcedil;"], [0, "&Tcaron;"], [0, "&tcaron;"], [0, "&Tstrok;"], [0, "&tstrok;"], [0, "&Utilde;"], [0, "&utilde;"], [0, "&Umacr;"], [0, "&umacr;"], [0, "&Ubreve;"], [0, "&ubreve;"], [0, "&Uring;"], [0, "&uring;"], [0, "&Udblac;"], [0, "&udblac;"], [0, "&Uogon;"], [0, "&uogon;"], [0, "&Wcirc;"], [0, "&wcirc;"], [0, "&Ycirc;"], [0, "&ycirc;"], [0, "&Yuml;"], [0, "&Zacute;"], [0, "&zacute;"], [0, "&Zdot;"], [0, "&zdot;"], [0, "&Zcaron;"], [0, "&zcaron;"], [19, "&fnof;"], [34, "&imped;"], [63, "&gacute;"], [65, "&jmath;"], [142, "&circ;"], [0, "&caron;"], [16, "&breve;"], [0, "&DiacriticalDot;"], [0, "&ring;"], [0, "&ogon;"], [0, "&DiacriticalTilde;"], [0, "&dblac;"], [51, "&DownBreve;"], [127, "&Alpha;"], [0, "&Beta;"], [0, "&Gamma;"], [0, "&Delta;"], [0, "&Epsilon;"], [0, "&Zeta;"], [0, "&Eta;"], [0, "&Theta;"], [0, "&Iota;"], [0, "&Kappa;"], [0, "&Lambda;"], [0, "&Mu;"], [0, "&Nu;"], [0, "&Xi;"], [0, "&Omicron;"], [0, "&Pi;"], [0, "&Rho;"], [1, "&Sigma;"], [0, "&Tau;"], [0, "&Upsilon;"], [0, "&Phi;"], [0, "&Chi;"], [0, "&Psi;"], [0, "&ohm;"], [7, "&alpha;"], [0, "&beta;"], [0, "&gamma;"], [0, "&delta;"], [0, "&epsi;"], [0, "&zeta;"], [0, "&eta;"], [0, "&theta;"], [0, "&iota;"], [0, "&kappa;"], [0, "&lambda;"], [0, "&mu;"], [0, "&nu;"], [0, "&xi;"], [0, "&omicron;"], [0, "&pi;"], [0, "&rho;"], [0, "&sigmaf;"], [0, "&sigma;"], [0, "&tau;"], [0, "&upsi;"], [0, "&phi;"], [0, "&chi;"], [0, "&psi;"], [0, "&omega;"], [7, "&thetasym;"], [0, "&Upsi;"], [2, "&phiv;"], [0, "&piv;"], [5, "&Gammad;"], [0, "&digamma;"], [18, "&kappav;"], [0, "&rhov;"], [3, "&epsiv;"], [0, "&backepsilon;"], [10, "&IOcy;"], [0, "&DJcy;"], [0, "&GJcy;"], [0, "&Jukcy;"], [0, "&DScy;"], [0, "&Iukcy;"], [0, "&YIcy;"], [0, "&Jsercy;"], [0, "&LJcy;"], [0, "&NJcy;"], [0, "&TSHcy;"], [0, "&KJcy;"], [1, "&Ubrcy;"], [0, "&DZcy;"], [0, "&Acy;"], [0, "&Bcy;"], [0, "&Vcy;"], [0, "&Gcy;"], [0, "&Dcy;"], [0, "&IEcy;"], [0, "&ZHcy;"], [0, "&Zcy;"], [0, "&Icy;"], [0, "&Jcy;"], [0, "&Kcy;"], [0, "&Lcy;"], [0, "&Mcy;"], [0, "&Ncy;"], [0, "&Ocy;"], [0, "&Pcy;"], [0, "&Rcy;"], [0, "&Scy;"], [0, "&Tcy;"], [0, "&Ucy;"], [0, "&Fcy;"], [0, "&KHcy;"], [0, "&TScy;"], [0, "&CHcy;"], [0, "&SHcy;"], [0, "&SHCHcy;"], [0, "&HARDcy;"], [0, "&Ycy;"], [0, "&SOFTcy;"], [0, "&Ecy;"], [0, "&YUcy;"], [0, "&YAcy;"], [0, "&acy;"], [0, "&bcy;"], [0, "&vcy;"], [0, "&gcy;"], [0, "&dcy;"], [0, "&iecy;"], [0, "&zhcy;"], [0, "&zcy;"], [0, "&icy;"], [0, "&jcy;"], [0, "&kcy;"], [0, "&lcy;"], [0, "&mcy;"], [0, "&ncy;"], [0, "&ocy;"], [0, "&pcy;"], [0, "&rcy;"], [0, "&scy;"], [0, "&tcy;"], [0, "&ucy;"], [0, "&fcy;"], [0, "&khcy;"], [0, "&tscy;"], [0, "&chcy;"], [0, "&shcy;"], [0, "&shchcy;"], [0, "&hardcy;"], [0, "&ycy;"], [0, "&softcy;"], [0, "&ecy;"], [0, "&yucy;"], [0, "&yacy;"], [1, "&iocy;"], [0, "&djcy;"], [0, "&gjcy;"], [0, "&jukcy;"], [0, "&dscy;"], [0, "&iukcy;"], [0, "&yicy;"], [0, "&jsercy;"], [0, "&ljcy;"], [0, "&njcy;"], [0, "&tshcy;"], [0, "&kjcy;"], [1, "&ubrcy;"], [0, "&dzcy;"], [7074, "&ensp;"], [0, "&emsp;"], [0, "&emsp13;"], [0, "&emsp14;"], [1, "&numsp;"], [0, "&puncsp;"], [0, "&ThinSpace;"], [0, "&hairsp;"], [0, "&NegativeMediumSpace;"], [0, "&zwnj;"], [0, "&zwj;"], [0, "&lrm;"], [0, "&rlm;"], [0, "&dash;"], [2, "&ndash;"], [0, "&mdash;"], [0, "&horbar;"], [0, "&Verbar;"], [1, "&lsquo;"], [0, "&CloseCurlyQuote;"], [0, "&lsquor;"], [1, "&ldquo;"], [0, "&CloseCurlyDoubleQuote;"], [0, "&bdquo;"], [1, "&dagger;"], [0, "&Dagger;"], [0, "&bull;"], [2, "&nldr;"], [0, "&hellip;"], [9, "&permil;"], [0, "&pertenk;"], [0, "&prime;"], [0, "&Prime;"], [0, "&tprime;"], [0, "&backprime;"], [3, "&lsaquo;"], [0, "&rsaquo;"], [3, "&oline;"], [2, "&caret;"], [1, "&hybull;"], [0, "&frasl;"], [10, "&bsemi;"], [7, "&qprime;"], [7, { v: "&MediumSpace;", n: 8202, o: "&ThickSpace;" }], [0, "&NoBreak;"], [0, "&af;"], [0, "&InvisibleTimes;"], [0, "&ic;"], [72, "&euro;"], [46, "&tdot;"], [0, "&DotDot;"], [37, "&complexes;"], [2, "&incare;"], [4, "&gscr;"], [0, "&hamilt;"], [0, "&Hfr;"], [0, "&Hopf;"], [0, "&planckh;"], [0, "&hbar;"], [0, "&imagline;"], [0, "&Ifr;"], [0, "&lagran;"], [0, "&ell;"], [1, "&naturals;"], [0, "&numero;"], [0, "&copysr;"], [0, "&weierp;"], [0, "&Popf;"], [0, "&Qopf;"], [0, "&realine;"], [0, "&real;"], [0, "&reals;"], [0, "&rx;"], [3, "&trade;"], [1, "&integers;"], [2, "&mho;"], [0, "&zeetrf;"], [0, "&iiota;"], [2, "&bernou;"], [0, "&Cayleys;"], [1, "&escr;"], [0, "&Escr;"], [0, "&Fouriertrf;"], [1, "&Mellintrf;"], [0, "&order;"], [0, "&alefsym;"], [0, "&beth;"], [0, "&gimel;"], [0, "&daleth;"], [12, "&CapitalDifferentialD;"], [0, "&dd;"], [0, "&ee;"], [0, "&ii;"], [10, "&frac13;"], [0, "&frac23;"], [0, "&frac15;"], [0, "&frac25;"], [0, "&frac35;"], [0, "&frac45;"], [0, "&frac16;"], [0, "&frac56;"], [0, "&frac18;"], [0, "&frac38;"], [0, "&frac58;"], [0, "&frac78;"], [49, "&larr;"], [0, "&ShortUpArrow;"], [0, "&rarr;"], [0, "&darr;"], [0, "&harr;"], [0, "&updownarrow;"], [0, "&nwarr;"], [0, "&nearr;"], [0, "&LowerRightArrow;"], [0, "&LowerLeftArrow;"], [0, "&nlarr;"], [0, "&nrarr;"], [1, { v: "&rarrw;", n: 824, o: "&nrarrw;" }], [0, "&Larr;"], [0, "&Uarr;"], [0, "&Rarr;"], [0, "&Darr;"], [0, "&larrtl;"], [0, "&rarrtl;"], [0, "&LeftTeeArrow;"], [0, "&mapstoup;"], [0, "&map;"], [0, "&DownTeeArrow;"], [1, "&hookleftarrow;"], [0, "&hookrightarrow;"], [0, "&larrlp;"], [0, "&looparrowright;"], [0, "&harrw;"], [0, "&nharr;"], [1, "&lsh;"], [0, "&rsh;"], [0, "&ldsh;"], [0, "&rdsh;"], [1, "&crarr;"], [0, "&cularr;"], [0, "&curarr;"], [2, "&circlearrowleft;"], [0, "&circlearrowright;"], [0, "&leftharpoonup;"], [0, "&DownLeftVector;"], [0, "&RightUpVector;"], [0, "&LeftUpVector;"], [0, "&rharu;"], [0, "&DownRightVector;"], [0, "&dharr;"], [0, "&dharl;"], [0, "&RightArrowLeftArrow;"], [0, "&udarr;"], [0, "&LeftArrowRightArrow;"], [0, "&leftleftarrows;"], [0, "&upuparrows;"], [0, "&rightrightarrows;"], [0, "&ddarr;"], [0, "&leftrightharpoons;"], [0, "&Equilibrium;"], [0, "&nlArr;"], [0, "&nhArr;"], [0, "&nrArr;"], [0, "&DoubleLeftArrow;"], [0, "&DoubleUpArrow;"], [0, "&DoubleRightArrow;"], [0, "&dArr;"], [0, "&DoubleLeftRightArrow;"], [0, "&DoubleUpDownArrow;"], [0, "&nwArr;"], [0, "&neArr;"], [0, "&seArr;"], [0, "&swArr;"], [0, "&lAarr;"], [0, "&rAarr;"], [1, "&zigrarr;"], [6, "&larrb;"], [0, "&rarrb;"], [15, "&DownArrowUpArrow;"], [7, "&loarr;"], [0, "&roarr;"], [0, "&hoarr;"], [0, "&forall;"], [0, "&comp;"], [0, { v: "&part;", n: 824, o: "&npart;" }], [0, "&exist;"], [0, "&nexist;"], [0, "&empty;"], [1, "&Del;"], [0, "&Element;"], [0, "&NotElement;"], [1, "&ni;"], [0, "&notni;"], [2, "&prod;"], [0, "&coprod;"], [0, "&sum;"], [0, "&minus;"], [0, "&MinusPlus;"], [0, "&dotplus;"], [1, "&Backslash;"], [0, "&lowast;"], [0, "&compfn;"], [1, "&radic;"], [2, "&prop;"], [0, "&infin;"], [0, "&angrt;"], [0, { v: "&ang;", n: 8402, o: "&nang;" }], [0, "&angmsd;"], [0, "&angsph;"], [0, "&mid;"], [0, "&nmid;"], [0, "&DoubleVerticalBar;"], [0, "&NotDoubleVerticalBar;"], [0, "&and;"], [0, "&or;"], [0, { v: "&cap;", n: 65024, o: "&caps;" }], [0, { v: "&cup;", n: 65024, o: "&cups;" }], [0, "&int;"], [0, "&Int;"], [0, "&iiint;"], [0, "&conint;"], [0, "&Conint;"], [0, "&Cconint;"], [0, "&cwint;"], [0, "&ClockwiseContourIntegral;"], [0, "&awconint;"], [0, "&there4;"], [0, "&becaus;"], [0, "&ratio;"], [0, "&Colon;"], [0, "&dotminus;"], [1, "&mDDot;"], [0, "&homtht;"], [0, { v: "&sim;", n: 8402, o: "&nvsim;" }], [0, { v: "&backsim;", n: 817, o: "&race;" }], [0, { v: "&ac;", n: 819, o: "&acE;" }], [0, "&acd;"], [0, "&VerticalTilde;"], [0, "&NotTilde;"], [0, { v: "&eqsim;", n: 824, o: "&nesim;" }], [0, "&sime;"], [0, "&NotTildeEqual;"], [0, "&cong;"], [0, "&simne;"], [0, "&ncong;"], [0, "&ap;"], [0, "&nap;"], [0, "&ape;"], [0, { v: "&apid;", n: 824, o: "&napid;" }], [0, "&backcong;"], [0, { v: "&asympeq;", n: 8402, o: "&nvap;" }], [0, { v: "&bump;", n: 824, o: "&nbump;" }], [0, { v: "&bumpe;", n: 824, o: "&nbumpe;" }], [0, { v: "&doteq;", n: 824, o: "&nedot;" }], [0, "&doteqdot;"], [0, "&efDot;"], [0, "&erDot;"], [0, "&Assign;"], [0, "&ecolon;"], [0, "&ecir;"], [0, "&circeq;"], [1, "&wedgeq;"], [0, "&veeeq;"], [1, "&triangleq;"], [2, "&equest;"], [0, "&ne;"], [0, { v: "&Congruent;", n: 8421, o: "&bnequiv;" }], [0, "&nequiv;"], [1, { v: "&le;", n: 8402, o: "&nvle;" }], [0, { v: "&ge;", n: 8402, o: "&nvge;" }], [0, { v: "&lE;", n: 824, o: "&nlE;" }], [0, { v: "&gE;", n: 824, o: "&ngE;" }], [0, { v: "&lnE;", n: 65024, o: "&lvertneqq;" }], [0, { v: "&gnE;", n: 65024, o: "&gvertneqq;" }], [0, { v: "&ll;", n: new Map(/* @__PURE__ */ Cn([[824, "&nLtv;"], [7577, "&nLt;"]])) }], [0, { v: "&gg;", n: new Map(/* @__PURE__ */ Cn([[824, "&nGtv;"], [7577, "&nGt;"]])) }], [0, "&between;"], [0, "&NotCupCap;"], [0, "&nless;"], [0, "&ngt;"], [0, "&nle;"], [0, "&nge;"], [0, "&lesssim;"], [0, "&GreaterTilde;"], [0, "&nlsim;"], [0, "&ngsim;"], [0, "&LessGreater;"], [0, "&gl;"], [0, "&NotLessGreater;"], [0, "&NotGreaterLess;"], [0, "&pr;"], [0, "&sc;"], [0, "&prcue;"], [0, "&sccue;"], [0, "&PrecedesTilde;"], [0, { v: "&scsim;", n: 824, o: "&NotSucceedsTilde;" }], [0, "&NotPrecedes;"], [0, "&NotSucceeds;"], [0, { v: "&sub;", n: 8402, o: "&NotSubset;" }], [0, { v: "&sup;", n: 8402, o: "&NotSuperset;" }], [0, "&nsub;"], [0, "&nsup;"], [0, "&sube;"], [0, "&supe;"], [0, "&NotSubsetEqual;"], [0, "&NotSupersetEqual;"], [0, { v: "&subne;", n: 65024, o: "&varsubsetneq;" }], [0, { v: "&supne;", n: 65024, o: "&varsupsetneq;" }], [1, "&cupdot;"], [0, "&UnionPlus;"], [0, { v: "&sqsub;", n: 824, o: "&NotSquareSubset;" }], [0, { v: "&sqsup;", n: 824, o: "&NotSquareSuperset;" }], [0, "&sqsube;"], [0, "&sqsupe;"], [0, { v: "&sqcap;", n: 65024, o: "&sqcaps;" }], [0, { v: "&sqcup;", n: 65024, o: "&sqcups;" }], [0, "&CirclePlus;"], [0, "&CircleMinus;"], [0, "&CircleTimes;"], [0, "&osol;"], [0, "&CircleDot;"], [0, "&circledcirc;"], [0, "&circledast;"], [1, "&circleddash;"], [0, "&boxplus;"], [0, "&boxminus;"], [0, "&boxtimes;"], [0, "&dotsquare;"], [0, "&RightTee;"], [0, "&dashv;"], [0, "&DownTee;"], [0, "&bot;"], [1, "&models;"], [0, "&DoubleRightTee;"], [0, "&Vdash;"], [0, "&Vvdash;"], [0, "&VDash;"], [0, "&nvdash;"], [0, "&nvDash;"], [0, "&nVdash;"], [0, "&nVDash;"], [0, "&prurel;"], [1, "&LeftTriangle;"], [0, "&RightTriangle;"], [0, { v: "&LeftTriangleEqual;", n: 8402, o: "&nvltrie;" }], [0, { v: "&RightTriangleEqual;", n: 8402, o: "&nvrtrie;" }], [0, "&origof;"], [0, "&imof;"], [0, "&multimap;"], [0, "&hercon;"], [0, "&intcal;"], [0, "&veebar;"], [1, "&barvee;"], [0, "&angrtvb;"], [0, "&lrtri;"], [0, "&bigwedge;"], [0, "&bigvee;"], [0, "&bigcap;"], [0, "&bigcup;"], [0, "&diam;"], [0, "&sdot;"], [0, "&sstarf;"], [0, "&divideontimes;"], [0, "&bowtie;"], [0, "&ltimes;"], [0, "&rtimes;"], [0, "&leftthreetimes;"], [0, "&rightthreetimes;"], [0, "&backsimeq;"], [0, "&curlyvee;"], [0, "&curlywedge;"], [0, "&Sub;"], [0, "&Sup;"], [0, "&Cap;"], [0, "&Cup;"], [0, "&fork;"], [0, "&epar;"], [0, "&lessdot;"], [0, "&gtdot;"], [0, { v: "&Ll;", n: 824, o: "&nLl;" }], [0, { v: "&Gg;", n: 824, o: "&nGg;" }], [0, { v: "&leg;", n: 65024, o: "&lesg;" }], [0, { v: "&gel;", n: 65024, o: "&gesl;" }], [2, "&cuepr;"], [0, "&cuesc;"], [0, "&NotPrecedesSlantEqual;"], [0, "&NotSucceedsSlantEqual;"], [0, "&NotSquareSubsetEqual;"], [0, "&NotSquareSupersetEqual;"], [2, "&lnsim;"], [0, "&gnsim;"], [0, "&precnsim;"], [0, "&scnsim;"], [0, "&nltri;"], [0, "&NotRightTriangle;"], [0, "&nltrie;"], [0, "&NotRightTriangleEqual;"], [0, "&vellip;"], [0, "&ctdot;"], [0, "&utdot;"], [0, "&dtdot;"], [0, "&disin;"], [0, "&isinsv;"], [0, "&isins;"], [0, { v: "&isindot;", n: 824, o: "&notindot;" }], [0, "&notinvc;"], [0, "&notinvb;"], [1, { v: "&isinE;", n: 824, o: "&notinE;" }], [0, "&nisd;"], [0, "&xnis;"], [0, "&nis;"], [0, "&notnivc;"], [0, "&notnivb;"], [6, "&barwed;"], [0, "&Barwed;"], [1, "&lceil;"], [0, "&rceil;"], [0, "&LeftFloor;"], [0, "&rfloor;"], [0, "&drcrop;"], [0, "&dlcrop;"], [0, "&urcrop;"], [0, "&ulcrop;"], [0, "&bnot;"], [1, "&profline;"], [0, "&profsurf;"], [1, "&telrec;"], [0, "&target;"], [5, "&ulcorn;"], [0, "&urcorn;"], [0, "&dlcorn;"], [0, "&drcorn;"], [2, "&frown;"], [0, "&smile;"], [9, "&cylcty;"], [0, "&profalar;"], [7, "&topbot;"], [6, "&ovbar;"], [1, "&solbar;"], [60, "&angzarr;"], [51, "&lmoustache;"], [0, "&rmoustache;"], [2, "&OverBracket;"], [0, "&bbrk;"], [0, "&bbrktbrk;"], [37, "&OverParenthesis;"], [0, "&UnderParenthesis;"], [0, "&OverBrace;"], [0, "&UnderBrace;"], [2, "&trpezium;"], [4, "&elinters;"], [59, "&blank;"], [164, "&circledS;"], [55, "&boxh;"], [1, "&boxv;"], [9, "&boxdr;"], [3, "&boxdl;"], [3, "&boxur;"], [3, "&boxul;"], [3, "&boxvr;"], [7, "&boxvl;"], [7, "&boxhd;"], [7, "&boxhu;"], [7, "&boxvh;"], [19, "&boxH;"], [0, "&boxV;"], [0, "&boxdR;"], [0, "&boxDr;"], [0, "&boxDR;"], [0, "&boxdL;"], [0, "&boxDl;"], [0, "&boxDL;"], [0, "&boxuR;"], [0, "&boxUr;"], [0, "&boxUR;"], [0, "&boxuL;"], [0, "&boxUl;"], [0, "&boxUL;"], [0, "&boxvR;"], [0, "&boxVr;"], [0, "&boxVR;"], [0, "&boxvL;"], [0, "&boxVl;"], [0, "&boxVL;"], [0, "&boxHd;"], [0, "&boxhD;"], [0, "&boxHD;"], [0, "&boxHu;"], [0, "&boxhU;"], [0, "&boxHU;"], [0, "&boxvH;"], [0, "&boxVh;"], [0, "&boxVH;"], [19, "&uhblk;"], [3, "&lhblk;"], [3, "&block;"], [8, "&blk14;"], [0, "&blk12;"], [0, "&blk34;"], [13, "&square;"], [8, "&blacksquare;"], [0, "&EmptyVerySmallSquare;"], [1, "&rect;"], [0, "&marker;"], [2, "&fltns;"], [1, "&bigtriangleup;"], [0, "&blacktriangle;"], [0, "&triangle;"], [2, "&blacktriangleright;"], [0, "&rtri;"], [3, "&bigtriangledown;"], [0, "&blacktriangledown;"], [0, "&dtri;"], [2, "&blacktriangleleft;"], [0, "&ltri;"], [6, "&loz;"], [0, "&cir;"], [32, "&tridot;"], [2, "&bigcirc;"], [8, "&ultri;"], [0, "&urtri;"], [0, "&lltri;"], [0, "&EmptySmallSquare;"], [0, "&FilledSmallSquare;"], [8, "&bigstar;"], [0, "&star;"], [7, "&phone;"], [49, "&female;"], [1, "&male;"], [29, "&spades;"], [2, "&clubs;"], [1, "&hearts;"], [0, "&diamondsuit;"], [3, "&sung;"], [2, "&flat;"], [0, "&natural;"], [0, "&sharp;"], [163, "&check;"], [3, "&cross;"], [8, "&malt;"], [21, "&sext;"], [33, "&VerticalSeparator;"], [25, "&lbbrk;"], [0, "&rbbrk;"], [84, "&bsolhsub;"], [0, "&suphsol;"], [28, "&LeftDoubleBracket;"], [0, "&RightDoubleBracket;"], [0, "&lang;"], [0, "&rang;"], [0, "&Lang;"], [0, "&Rang;"], [0, "&loang;"], [0, "&roang;"], [7, "&longleftarrow;"], [0, "&longrightarrow;"], [0, "&longleftrightarrow;"], [0, "&DoubleLongLeftArrow;"], [0, "&DoubleLongRightArrow;"], [0, "&DoubleLongLeftRightArrow;"], [1, "&longmapsto;"], [2, "&dzigrarr;"], [258, "&nvlArr;"], [0, "&nvrArr;"], [0, "&nvHarr;"], [0, "&Map;"], [6, "&lbarr;"], [0, "&bkarow;"], [0, "&lBarr;"], [0, "&dbkarow;"], [0, "&drbkarow;"], [0, "&DDotrahd;"], [0, "&UpArrowBar;"], [0, "&DownArrowBar;"], [2, "&Rarrtl;"], [2, "&latail;"], [0, "&ratail;"], [0, "&lAtail;"], [0, "&rAtail;"], [0, "&larrfs;"], [0, "&rarrfs;"], [0, "&larrbfs;"], [0, "&rarrbfs;"], [2, "&nwarhk;"], [0, "&nearhk;"], [0, "&hksearow;"], [0, "&hkswarow;"], [0, "&nwnear;"], [0, "&nesear;"], [0, "&seswar;"], [0, "&swnwar;"], [8, { v: "&rarrc;", n: 824, o: "&nrarrc;" }], [1, "&cudarrr;"], [0, "&ldca;"], [0, "&rdca;"], [0, "&cudarrl;"], [0, "&larrpl;"], [2, "&curarrm;"], [0, "&cularrp;"], [7, "&rarrpl;"], [2, "&harrcir;"], [0, "&Uarrocir;"], [0, "&lurdshar;"], [0, "&ldrushar;"], [2, "&LeftRightVector;"], [0, "&RightUpDownVector;"], [0, "&DownLeftRightVector;"], [0, "&LeftUpDownVector;"], [0, "&LeftVectorBar;"], [0, "&RightVectorBar;"], [0, "&RightUpVectorBar;"], [0, "&RightDownVectorBar;"], [0, "&DownLeftVectorBar;"], [0, "&DownRightVectorBar;"], [0, "&LeftUpVectorBar;"], [0, "&LeftDownVectorBar;"], [0, "&LeftTeeVector;"], [0, "&RightTeeVector;"], [0, "&RightUpTeeVector;"], [0, "&RightDownTeeVector;"], [0, "&DownLeftTeeVector;"], [0, "&DownRightTeeVector;"], [0, "&LeftUpTeeVector;"], [0, "&LeftDownTeeVector;"], [0, "&lHar;"], [0, "&uHar;"], [0, "&rHar;"], [0, "&dHar;"], [0, "&luruhar;"], [0, "&ldrdhar;"], [0, "&ruluhar;"], [0, "&rdldhar;"], [0, "&lharul;"], [0, "&llhard;"], [0, "&rharul;"], [0, "&lrhard;"], [0, "&udhar;"], [0, "&duhar;"], [0, "&RoundImplies;"], [0, "&erarr;"], [0, "&simrarr;"], [0, "&larrsim;"], [0, "&rarrsim;"], [0, "&rarrap;"], [0, "&ltlarr;"], [1, "&gtrarr;"], [0, "&subrarr;"], [1, "&suplarr;"], [0, "&lfisht;"], [0, "&rfisht;"], [0, "&ufisht;"], [0, "&dfisht;"], [5, "&lopar;"], [0, "&ropar;"], [4, "&lbrke;"], [0, "&rbrke;"], [0, "&lbrkslu;"], [0, "&rbrksld;"], [0, "&lbrksld;"], [0, "&rbrkslu;"], [0, "&langd;"], [0, "&rangd;"], [0, "&lparlt;"], [0, "&rpargt;"], [0, "&gtlPar;"], [0, "&ltrPar;"], [3, "&vzigzag;"], [1, "&vangrt;"], [0, "&angrtvbd;"], [6, "&ange;"], [0, "&range;"], [0, "&dwangle;"], [0, "&uwangle;"], [0, "&angmsdaa;"], [0, "&angmsdab;"], [0, "&angmsdac;"], [0, "&angmsdad;"], [0, "&angmsdae;"], [0, "&angmsdaf;"], [0, "&angmsdag;"], [0, "&angmsdah;"], [0, "&bemptyv;"], [0, "&demptyv;"], [0, "&cemptyv;"], [0, "&raemptyv;"], [0, "&laemptyv;"], [0, "&ohbar;"], [0, "&omid;"], [0, "&opar;"], [1, "&operp;"], [1, "&olcross;"], [0, "&odsold;"], [1, "&olcir;"], [0, "&ofcir;"], [0, "&olt;"], [0, "&ogt;"], [0, "&cirscir;"], [0, "&cirE;"], [0, "&solb;"], [0, "&bsolb;"], [3, "&boxbox;"], [3, "&trisb;"], [0, "&rtriltri;"], [0, { v: "&LeftTriangleBar;", n: 824, o: "&NotLeftTriangleBar;" }], [0, { v: "&RightTriangleBar;", n: 824, o: "&NotRightTriangleBar;" }], [11, "&iinfin;"], [0, "&infintie;"], [0, "&nvinfin;"], [4, "&eparsl;"], [0, "&smeparsl;"], [0, "&eqvparsl;"], [5, "&blacklozenge;"], [8, "&RuleDelayed;"], [1, "&dsol;"], [9, "&bigodot;"], [0, "&bigoplus;"], [0, "&bigotimes;"], [1, "&biguplus;"], [1, "&bigsqcup;"], [5, "&iiiint;"], [0, "&fpartint;"], [2, "&cirfnint;"], [0, "&awint;"], [0, "&rppolint;"], [0, "&scpolint;"], [0, "&npolint;"], [0, "&pointint;"], [0, "&quatint;"], [0, "&intlarhk;"], [10, "&pluscir;"], [0, "&plusacir;"], [0, "&simplus;"], [0, "&plusdu;"], [0, "&plussim;"], [0, "&plustwo;"], [1, "&mcomma;"], [0, "&minusdu;"], [2, "&loplus;"], [0, "&roplus;"], [0, "&Cross;"], [0, "&timesd;"], [0, "&timesbar;"], [1, "&smashp;"], [0, "&lotimes;"], [0, "&rotimes;"], [0, "&otimesas;"], [0, "&Otimes;"], [0, "&odiv;"], [0, "&triplus;"], [0, "&triminus;"], [0, "&tritime;"], [0, "&intprod;"], [2, "&amalg;"], [0, "&capdot;"], [1, "&ncup;"], [0, "&ncap;"], [0, "&capand;"], [0, "&cupor;"], [0, "&cupcap;"], [0, "&capcup;"], [0, "&cupbrcap;"], [0, "&capbrcup;"], [0, "&cupcup;"], [0, "&capcap;"], [0, "&ccups;"], [0, "&ccaps;"], [2, "&ccupssm;"], [2, "&And;"], [0, "&Or;"], [0, "&andand;"], [0, "&oror;"], [0, "&orslope;"], [0, "&andslope;"], [1, "&andv;"], [0, "&orv;"], [0, "&andd;"], [0, "&ord;"], [1, "&wedbar;"], [6, "&sdote;"], [3, "&simdot;"], [2, { v: "&congdot;", n: 824, o: "&ncongdot;" }], [0, "&easter;"], [0, "&apacir;"], [0, { v: "&apE;", n: 824, o: "&napE;" }], [0, "&eplus;"], [0, "&pluse;"], [0, "&Esim;"], [0, "&Colone;"], [0, "&Equal;"], [1, "&ddotseq;"], [0, "&equivDD;"], [0, "&ltcir;"], [0, "&gtcir;"], [0, "&ltquest;"], [0, "&gtquest;"], [0, { v: "&leqslant;", n: 824, o: "&nleqslant;" }], [0, { v: "&geqslant;", n: 824, o: "&ngeqslant;" }], [0, "&lesdot;"], [0, "&gesdot;"], [0, "&lesdoto;"], [0, "&gesdoto;"], [0, "&lesdotor;"], [0, "&gesdotol;"], [0, "&lap;"], [0, "&gap;"], [0, "&lne;"], [0, "&gne;"], [0, "&lnap;"], [0, "&gnap;"], [0, "&lEg;"], [0, "&gEl;"], [0, "&lsime;"], [0, "&gsime;"], [0, "&lsimg;"], [0, "&gsiml;"], [0, "&lgE;"], [0, "&glE;"], [0, "&lesges;"], [0, "&gesles;"], [0, "&els;"], [0, "&egs;"], [0, "&elsdot;"], [0, "&egsdot;"], [0, "&el;"], [0, "&eg;"], [2, "&siml;"], [0, "&simg;"], [0, "&simlE;"], [0, "&simgE;"], [0, { v: "&LessLess;", n: 824, o: "&NotNestedLessLess;" }], [0, { v: "&GreaterGreater;", n: 824, o: "&NotNestedGreaterGreater;" }], [1, "&glj;"], [0, "&gla;"], [0, "&ltcc;"], [0, "&gtcc;"], [0, "&lescc;"], [0, "&gescc;"], [0, "&smt;"], [0, "&lat;"], [0, { v: "&smte;", n: 65024, o: "&smtes;" }], [0, { v: "&late;", n: 65024, o: "&lates;" }], [0, "&bumpE;"], [0, { v: "&PrecedesEqual;", n: 824, o: "&NotPrecedesEqual;" }], [0, { v: "&sce;", n: 824, o: "&NotSucceedsEqual;" }], [2, "&prE;"], [0, "&scE;"], [0, "&precneqq;"], [0, "&scnE;"], [0, "&prap;"], [0, "&scap;"], [0, "&precnapprox;"], [0, "&scnap;"], [0, "&Pr;"], [0, "&Sc;"], [0, "&subdot;"], [0, "&supdot;"], [0, "&subplus;"], [0, "&supplus;"], [0, "&submult;"], [0, "&supmult;"], [0, "&subedot;"], [0, "&supedot;"], [0, { v: "&subE;", n: 824, o: "&nsubE;" }], [0, { v: "&supE;", n: 824, o: "&nsupE;" }], [0, "&subsim;"], [0, "&supsim;"], [2, { v: "&subnE;", n: 65024, o: "&varsubsetneqq;" }], [0, { v: "&supnE;", n: 65024, o: "&varsupsetneqq;" }], [2, "&csub;"], [0, "&csup;"], [0, "&csube;"], [0, "&csupe;"], [0, "&subsup;"], [0, "&supsub;"], [0, "&subsub;"], [0, "&supsup;"], [0, "&suphsub;"], [0, "&supdsub;"], [0, "&forkv;"], [0, "&topfork;"], [0, "&mlcp;"], [8, "&Dashv;"], [1, "&Vdashl;"], [0, "&Barv;"], [0, "&vBar;"], [0, "&vBarv;"], [1, "&Vbar;"], [0, "&Not;"], [0, "&bNot;"], [0, "&rnmid;"], [0, "&cirmid;"], [0, "&midcir;"], [0, "&topcir;"], [0, "&nhpar;"], [0, "&parsim;"], [9, { v: "&parsl;", n: 8421, o: "&nparsl;" }], [44343, { n: new Map(/* @__PURE__ */ Cn([[56476, "&Ascr;"], [1, "&Cscr;"], [0, "&Dscr;"], [2, "&Gscr;"], [2, "&Jscr;"], [0, "&Kscr;"], [2, "&Nscr;"], [0, "&Oscr;"], [0, "&Pscr;"], [0, "&Qscr;"], [1, "&Sscr;"], [0, "&Tscr;"], [0, "&Uscr;"], [0, "&Vscr;"], [0, "&Wscr;"], [0, "&Xscr;"], [0, "&Yscr;"], [0, "&Zscr;"], [0, "&ascr;"], [0, "&bscr;"], [0, "&cscr;"], [0, "&dscr;"], [1, "&fscr;"], [1, "&hscr;"], [0, "&iscr;"], [0, "&jscr;"], [0, "&kscr;"], [0, "&lscr;"], [0, "&mscr;"], [0, "&nscr;"], [1, "&pscr;"], [0, "&qscr;"], [0, "&rscr;"], [0, "&sscr;"], [0, "&tscr;"], [0, "&uscr;"], [0, "&vscr;"], [0, "&wscr;"], [0, "&xscr;"], [0, "&yscr;"], [0, "&zscr;"], [52, "&Afr;"], [0, "&Bfr;"], [1, "&Dfr;"], [0, "&Efr;"], [0, "&Ffr;"], [0, "&Gfr;"], [2, "&Jfr;"], [0, "&Kfr;"], [0, "&Lfr;"], [0, "&Mfr;"], [0, "&Nfr;"], [0, "&Ofr;"], [0, "&Pfr;"], [0, "&Qfr;"], [1, "&Sfr;"], [0, "&Tfr;"], [0, "&Ufr;"], [0, "&Vfr;"], [0, "&Wfr;"], [0, "&Xfr;"], [0, "&Yfr;"], [1, "&afr;"], [0, "&bfr;"], [0, "&cfr;"], [0, "&dfr;"], [0, "&efr;"], [0, "&ffr;"], [0, "&gfr;"], [0, "&hfr;"], [0, "&ifr;"], [0, "&jfr;"], [0, "&kfr;"], [0, "&lfr;"], [0, "&mfr;"], [0, "&nfr;"], [0, "&ofr;"], [0, "&pfr;"], [0, "&qfr;"], [0, "&rfr;"], [0, "&sfr;"], [0, "&tfr;"], [0, "&ufr;"], [0, "&vfr;"], [0, "&wfr;"], [0, "&xfr;"], [0, "&yfr;"], [0, "&zfr;"], [0, "&Aopf;"], [0, "&Bopf;"], [1, "&Dopf;"], [0, "&Eopf;"], [0, "&Fopf;"], [0, "&Gopf;"], [1, "&Iopf;"], [0, "&Jopf;"], [0, "&Kopf;"], [0, "&Lopf;"], [0, "&Mopf;"], [1, "&Oopf;"], [3, "&Sopf;"], [0, "&Topf;"], [0, "&Uopf;"], [0, "&Vopf;"], [0, "&Wopf;"], [0, "&Xopf;"], [0, "&Yopf;"], [1, "&aopf;"], [0, "&bopf;"], [0, "&copf;"], [0, "&dopf;"], [0, "&eopf;"], [0, "&fopf;"], [0, "&gopf;"], [0, "&hopf;"], [0, "&iopf;"], [0, "&jopf;"], [0, "&kopf;"], [0, "&lopf;"], [0, "&mopf;"], [0, "&nopf;"], [0, "&oopf;"], [0, "&popf;"], [0, "&qopf;"], [0, "&ropf;"], [0, "&sopf;"], [0, "&topf;"], [0, "&uopf;"], [0, "&vopf;"], [0, "&wopf;"], [0, "&xopf;"], [0, "&yopf;"], [0, "&zopf;"]])) }], [8906, "&fflig;"], [0, "&filig;"], [0, "&fllig;"], [0, "&ffilig;"], [0, "&ffllig;"]]));
var en = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.escapeText = e.escapeAttribute = e.escapeUTF8 = e.escape = e.encodeXML = e.getCodePoint = e.xmlReplacer = void 0, e.xmlReplacer = /["&'<>$\x80-\uFFFF]/g;
  var t = /* @__PURE__ */ new Map([
    [34, "&quot;"],
    [38, "&amp;"],
    [39, "&apos;"],
    [60, "&lt;"],
    [62, "&gt;"]
  ]);
  e.getCodePoint = // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  String.prototype.codePointAt != null ? function(a, i) {
    return a.codePointAt(i);
  } : (
    // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
    function(a, i) {
      return (a.charCodeAt(i) & 64512) === 55296 ? (a.charCodeAt(i) - 55296) * 1024 + a.charCodeAt(i + 1) - 56320 + 65536 : a.charCodeAt(i);
    }
  );
  function r(a) {
    for (var i = "", u = 0, o; (o = e.xmlReplacer.exec(a)) !== null; ) {
      var c = o.index, h = a.charCodeAt(c), s = t.get(h);
      s !== void 0 ? (i += a.substring(u, c) + s, u = c + 1) : (i += "".concat(a.substring(u, c), "&#x").concat((0, e.getCodePoint)(a, c).toString(16), ";"), u = e.xmlReplacer.lastIndex += +((h & 64512) === 55296));
    }
    return i + a.substr(u);
  }
  e.encodeXML = r, e.escape = r;
  function n(a, i) {
    return function(o) {
      for (var c, h = 0, s = ""; c = a.exec(o); )
        h !== c.index && (s += o.substring(h, c.index)), s += i.get(c[0].charCodeAt(0)), h = c.index + 1;
      return s + o.substring(h);
    };
  }
  e.escapeUTF8 = n(/[&<>'"]/g, t), e.escapeAttribute = n(/["&\u00A0]/g, /* @__PURE__ */ new Map([
    [34, "&quot;"],
    [38, "&amp;"],
    [160, "&nbsp;"]
  ])), e.escapeText = n(/[&<>\u00A0]/g, /* @__PURE__ */ new Map([
    [38, "&amp;"],
    [60, "&lt;"],
    [62, "&gt;"],
    [160, "&nbsp;"]
  ]));
})(en);
var Xl = w && w.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Qt, "__esModule", { value: !0 });
Qt.encodeNonAsciiHTML = Qt.encodeHTML = void 0;
var zl = Xl(Yi), uo = en, Kl = /[\t\n!-,./:-@[-`\f{-}$\x80-\uFFFF]/g;
function Zl(e) {
  return so(Kl, e);
}
Qt.encodeHTML = Zl;
function Jl(e) {
  return so(uo.xmlReplacer, e);
}
Qt.encodeNonAsciiHTML = Jl;
function so(e, t) {
  for (var r = "", n = 0, a; (a = e.exec(t)) !== null; ) {
    var i = a.index;
    r += t.substring(n, i);
    var u = t.charCodeAt(i), o = zl.default.get(u);
    if (typeof o == "object") {
      if (i + 1 < t.length) {
        var c = t.charCodeAt(i + 1), h = typeof o.n == "number" ? o.n === c ? o.o : void 0 : o.n.get(c);
        if (h !== void 0) {
          r += h, n = e.lastIndex += 1;
          continue;
        }
      }
      o = o.v;
    }
    if (o !== void 0)
      r += o, n = i + 1;
    else {
      var s = (0, uo.getCodePoint)(t, i);
      r += "&#x".concat(s.toString(16), ";"), n = e.lastIndex += +(s !== u);
    }
  }
  return r + t.substr(n);
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.decodeXMLStrict = e.decodeHTML5Strict = e.decodeHTML4Strict = e.decodeHTML5 = e.decodeHTML4 = e.decodeHTMLAttribute = e.decodeHTMLStrict = e.decodeHTML = e.decodeXML = e.DecodingMode = e.EntityDecoder = e.encodeHTML5 = e.encodeHTML4 = e.encodeNonAsciiHTML = e.encodeHTML = e.escapeText = e.escapeAttribute = e.escapeUTF8 = e.escape = e.encodeXML = e.encode = e.decodeStrict = e.decode = e.EncodingMode = e.EntityLevel = void 0;
  var t = Ar, r = Qt, n = en, a;
  (function(p) {
    p[p.XML = 0] = "XML", p[p.HTML = 1] = "HTML";
  })(a = e.EntityLevel || (e.EntityLevel = {}));
  var i;
  (function(p) {
    p[p.UTF8 = 0] = "UTF8", p[p.ASCII = 1] = "ASCII", p[p.Extensive = 2] = "Extensive", p[p.Attribute = 3] = "Attribute", p[p.Text = 4] = "Text";
  })(i = e.EncodingMode || (e.EncodingMode = {}));
  function u(p, m) {
    m === void 0 && (m = a.XML);
    var b = typeof m == "number" ? m : m.level;
    if (b === a.HTML) {
      var R = typeof m == "object" ? m.mode : void 0;
      return (0, t.decodeHTML)(p, R);
    }
    return (0, t.decodeXML)(p);
  }
  e.decode = u;
  function o(p, m) {
    var b;
    m === void 0 && (m = a.XML);
    var R = typeof m == "number" ? { level: m } : m;
    return (b = R.mode) !== null && b !== void 0 || (R.mode = t.DecodingMode.Strict), u(p, R);
  }
  e.decodeStrict = o;
  function c(p, m) {
    m === void 0 && (m = a.XML);
    var b = typeof m == "number" ? { level: m } : m;
    return b.mode === i.UTF8 ? (0, n.escapeUTF8)(p) : b.mode === i.Attribute ? (0, n.escapeAttribute)(p) : b.mode === i.Text ? (0, n.escapeText)(p) : b.level === a.HTML ? b.mode === i.ASCII ? (0, r.encodeNonAsciiHTML)(p) : (0, r.encodeHTML)(p) : (0, n.encodeXML)(p);
  }
  e.encode = c;
  var h = en;
  Object.defineProperty(e, "encodeXML", { enumerable: !0, get: function() {
    return h.encodeXML;
  } }), Object.defineProperty(e, "escape", { enumerable: !0, get: function() {
    return h.escape;
  } }), Object.defineProperty(e, "escapeUTF8", { enumerable: !0, get: function() {
    return h.escapeUTF8;
  } }), Object.defineProperty(e, "escapeAttribute", { enumerable: !0, get: function() {
    return h.escapeAttribute;
  } }), Object.defineProperty(e, "escapeText", { enumerable: !0, get: function() {
    return h.escapeText;
  } });
  var s = Qt;
  Object.defineProperty(e, "encodeHTML", { enumerable: !0, get: function() {
    return s.encodeHTML;
  } }), Object.defineProperty(e, "encodeNonAsciiHTML", { enumerable: !0, get: function() {
    return s.encodeNonAsciiHTML;
  } }), Object.defineProperty(e, "encodeHTML4", { enumerable: !0, get: function() {
    return s.encodeHTML;
  } }), Object.defineProperty(e, "encodeHTML5", { enumerable: !0, get: function() {
    return s.encodeHTML;
  } });
  var g = Ar;
  Object.defineProperty(e, "EntityDecoder", { enumerable: !0, get: function() {
    return g.EntityDecoder;
  } }), Object.defineProperty(e, "DecodingMode", { enumerable: !0, get: function() {
    return g.DecodingMode;
  } }), Object.defineProperty(e, "decodeXML", { enumerable: !0, get: function() {
    return g.decodeXML;
  } }), Object.defineProperty(e, "decodeHTML", { enumerable: !0, get: function() {
    return g.decodeHTML;
  } }), Object.defineProperty(e, "decodeHTMLStrict", { enumerable: !0, get: function() {
    return g.decodeHTMLStrict;
  } }), Object.defineProperty(e, "decodeHTMLAttribute", { enumerable: !0, get: function() {
    return g.decodeHTMLAttribute;
  } }), Object.defineProperty(e, "decodeHTML4", { enumerable: !0, get: function() {
    return g.decodeHTML;
  } }), Object.defineProperty(e, "decodeHTML5", { enumerable: !0, get: function() {
    return g.decodeHTML;
  } }), Object.defineProperty(e, "decodeHTML4Strict", { enumerable: !0, get: function() {
    return g.decodeHTMLStrict;
  } }), Object.defineProperty(e, "decodeHTML5Strict", { enumerable: !0, get: function() {
    return g.decodeHTMLStrict;
  } }), Object.defineProperty(e, "decodeXMLStrict", { enumerable: !0, get: function() {
    return g.decodeXML;
  } });
})(io);
var Ir = {};
Object.defineProperty(Ir, "__esModule", { value: !0 });
Ir.attributeNames = Ir.elementNames = void 0;
Ir.elementNames = new Map([
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
Ir.attributeNames = new Map([
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
var or = w && w.__assign || function() {
  return or = Object.assign || function(e) {
    for (var t, r = 1, n = arguments.length; r < n; r++) {
      t = arguments[r];
      for (var a in t)
        Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
    }
    return e;
  }, or.apply(this, arguments);
}, e0 = w && w.__createBinding || (Object.create ? function(e, t, r, n) {
  n === void 0 && (n = r);
  var a = Object.getOwnPropertyDescriptor(t, r);
  (!a || ("get" in a ? !t.__esModule : a.writable || a.configurable)) && (a = { enumerable: !0, get: function() {
    return t[r];
  } }), Object.defineProperty(e, n, a);
} : function(e, t, r, n) {
  n === void 0 && (n = r), e[n] = t[r];
}), t0 = w && w.__setModuleDefault || (Object.create ? function(e, t) {
  Object.defineProperty(e, "default", { enumerable: !0, value: t });
} : function(e, t) {
  e.default = t;
}), r0 = w && w.__importStar || function(e) {
  if (e && e.__esModule)
    return e;
  var t = {};
  if (e != null)
    for (var r in e)
      r !== "default" && Object.prototype.hasOwnProperty.call(e, r) && e0(t, e, r);
  return t0(t, e), t;
};
Object.defineProperty(xr, "__esModule", { value: !0 });
xr.render = void 0;
var Nt = r0(Lr), qn = io, oo = Ir, n0 = /* @__PURE__ */ new Set([
  "style",
  "script",
  "xmp",
  "iframe",
  "noembed",
  "noframes",
  "plaintext",
  "noscript"
]);
function a0(e) {
  return e.replace(/"/g, "&quot;");
}
function i0(e, t) {
  var r;
  if (e) {
    var n = ((r = t.encodeEntities) !== null && r !== void 0 ? r : t.decodeEntities) === !1 ? a0 : t.xmlMode || t.encodeEntities !== "utf8" ? qn.encodeXML : qn.escapeAttribute;
    return Object.keys(e).map(function(a) {
      var i, u, o = (i = e[a]) !== null && i !== void 0 ? i : "";
      return t.xmlMode === "foreign" && (a = (u = oo.attributeNames.get(a)) !== null && u !== void 0 ? u : a), !t.emptyAttrs && !t.xmlMode && o === "" ? a : "".concat(a, '="').concat(n(o), '"');
    }).join(" ");
  }
}
var Cu = /* @__PURE__ */ new Set([
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
function ta(e, t) {
  t === void 0 && (t = {});
  for (var r = ("length" in e) ? e : [e], n = "", a = 0; a < r.length; a++)
    n += u0(r[a], t);
  return n;
}
xr.render = ta;
xr.default = ta;
function u0(e, t) {
  switch (e.type) {
    case Nt.Root:
      return ta(e.children, t);
    case Nt.Doctype:
    case Nt.Directive:
      return l0(e);
    case Nt.Comment:
      return h0(e);
    case Nt.CDATA:
      return d0(e);
    case Nt.Script:
    case Nt.Style:
    case Nt.Tag:
      return c0(e, t);
    case Nt.Text:
      return f0(e, t);
  }
}
var s0 = /* @__PURE__ */ new Set([
  "mi",
  "mo",
  "mn",
  "ms",
  "mtext",
  "annotation-xml",
  "foreignObject",
  "desc",
  "title"
]), o0 = /* @__PURE__ */ new Set(["svg", "math"]);
function c0(e, t) {
  var r;
  t.xmlMode === "foreign" && (e.name = (r = oo.elementNames.get(e.name)) !== null && r !== void 0 ? r : e.name, e.parent && s0.has(e.parent.name) && (t = or(or({}, t), { xmlMode: !1 }))), !t.xmlMode && o0.has(e.name) && (t = or(or({}, t), { xmlMode: "foreign" }));
  var n = "<".concat(e.name), a = i0(e.attribs, t);
  return a && (n += " ".concat(a)), e.children.length === 0 && (t.xmlMode ? (
    // In XML mode or foreign mode, and user hasn't explicitly turned off self-closing tags
    t.selfClosingTags !== !1
  ) : (
    // User explicitly asked for self-closing tags, even in HTML mode
    t.selfClosingTags && Cu.has(e.name)
  )) ? (t.xmlMode || (n += " "), n += "/>") : (n += ">", e.children.length > 0 && (n += ta(e.children, t)), (t.xmlMode || !Cu.has(e.name)) && (n += "</".concat(e.name, ">"))), n;
}
function l0(e) {
  return "<".concat(e.data, ">");
}
function f0(e, t) {
  var r, n = e.data || "";
  return ((r = t.encodeEntities) !== null && r !== void 0 ? r : t.decodeEntities) !== !1 && !(!t.xmlMode && e.parent && n0.has(e.parent.name)) && (n = t.xmlMode || t.encodeEntities !== "utf8" ? (0, qn.encodeXML)(n) : (0, qn.escapeText)(n)), n;
}
function d0(e) {
  return "<![CDATA[".concat(e.children[0].data, "]]>");
}
function h0(e) {
  return "<!--".concat(e.data, "-->");
}
var p0 = w && w.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(rt, "__esModule", { value: !0 });
rt.innerText = rt.textContent = rt.getText = rt.getInnerHTML = rt.getOuterHTML = void 0;
var bt = He, m0 = p0(xr), E0 = Lr;
function co(e, t) {
  return (0, m0.default)(e, t);
}
rt.getOuterHTML = co;
function T0(e, t) {
  return (0, bt.hasChildren)(e) ? e.children.map(function(r) {
    return co(r, t);
  }).join("") : "";
}
rt.getInnerHTML = T0;
function wn(e) {
  return Array.isArray(e) ? e.map(wn).join("") : (0, bt.isTag)(e) ? e.name === "br" ? `
` : wn(e.children) : (0, bt.isCDATA)(e) ? wn(e.children) : (0, bt.isText)(e) ? e.data : "";
}
rt.getText = wn;
function oi(e) {
  return Array.isArray(e) ? e.map(oi).join("") : (0, bt.hasChildren)(e) && !(0, bt.isComment)(e) ? oi(e.children) : (0, bt.isText)(e) ? e.data : "";
}
rt.textContent = oi;
function ci(e) {
  return Array.isArray(e) ? e.map(ci).join("") : (0, bt.hasChildren)(e) && (e.type === E0.ElementType.Tag || (0, bt.isCDATA)(e)) ? ci(e.children) : (0, bt.isText)(e) ? e.data : "";
}
rt.innerText = ci;
var ke = {};
Object.defineProperty(ke, "__esModule", { value: !0 });
ke.prevElementSibling = ke.nextElementSibling = ke.getName = ke.hasAttrib = ke.getAttributeValue = ke.getSiblings = ke.getParent = ke.getChildren = void 0;
var Vi = He;
function lo(e) {
  return (0, Vi.hasChildren)(e) ? e.children : [];
}
ke.getChildren = lo;
function fo(e) {
  return e.parent || null;
}
ke.getParent = fo;
function g0(e) {
  var t, r, n = fo(e);
  if (n != null)
    return lo(n);
  for (var a = [e], i = e.prev, u = e.next; i != null; )
    a.unshift(i), t = i, i = t.prev;
  for (; u != null; )
    a.push(u), r = u, u = r.next;
  return a;
}
ke.getSiblings = g0;
function _0(e, t) {
  var r;
  return (r = e.attribs) === null || r === void 0 ? void 0 : r[t];
}
ke.getAttributeValue = _0;
function b0(e, t) {
  return e.attribs != null && Object.prototype.hasOwnProperty.call(e.attribs, t) && e.attribs[t] != null;
}
ke.hasAttrib = b0;
function A0(e) {
  return e.name;
}
ke.getName = A0;
function I0(e) {
  for (var t, r = e.next; r !== null && !(0, Vi.isTag)(r); )
    t = r, r = t.next;
  return r;
}
ke.nextElementSibling = I0;
function y0(e) {
  for (var t, r = e.prev; r !== null && !(0, Vi.isTag)(r); )
    t = r, r = t.prev;
  return r;
}
ke.prevElementSibling = y0;
var ze = {};
Object.defineProperty(ze, "__esModule", { value: !0 });
ze.prepend = ze.prependChild = ze.append = ze.appendChild = ze.replaceElement = ze.removeElement = void 0;
function ln(e) {
  if (e.prev && (e.prev.next = e.next), e.next && (e.next.prev = e.prev), e.parent) {
    var t = e.parent.children, r = t.lastIndexOf(e);
    r >= 0 && t.splice(r, 1);
  }
  e.next = null, e.prev = null, e.parent = null;
}
ze.removeElement = ln;
function C0(e, t) {
  var r = t.prev = e.prev;
  r && (r.next = t);
  var n = t.next = e.next;
  n && (n.prev = t);
  var a = t.parent = e.parent;
  if (a) {
    var i = a.children;
    i[i.lastIndexOf(e)] = t, e.parent = null;
  }
}
ze.replaceElement = C0;
function N0(e, t) {
  if (ln(t), t.next = null, t.parent = e, e.children.push(t) > 1) {
    var r = e.children[e.children.length - 2];
    r.next = t, t.prev = r;
  } else
    t.prev = null;
}
ze.appendChild = N0;
function D0(e, t) {
  ln(t);
  var r = e.parent, n = e.next;
  if (t.next = n, t.prev = e, e.next = t, t.parent = r, n) {
    if (n.prev = t, r) {
      var a = r.children;
      a.splice(a.lastIndexOf(n), 0, t);
    }
  } else
    r && r.children.push(t);
}
ze.append = D0;
function S0(e, t) {
  if (ln(t), t.parent = e, t.prev = null, e.children.unshift(t) !== 1) {
    var r = e.children[1];
    r.prev = t, t.next = r;
  } else
    t.next = null;
}
ze.prependChild = S0;
function O0(e, t) {
  ln(t);
  var r = e.parent;
  if (r) {
    var n = r.children;
    n.splice(n.indexOf(e), 0, t);
  }
  e.prev && (e.prev.next = t), t.parent = r, t.prev = e.prev, t.next = e, e.prev = t;
}
ze.prepend = O0;
var Ye = {};
Object.defineProperty(Ye, "__esModule", { value: !0 });
Ye.findAll = Ye.existsOne = Ye.findOne = Ye.findOneChild = Ye.find = Ye.filter = void 0;
var ra = He;
function v0(e, t, r, n) {
  return r === void 0 && (r = !0), n === void 0 && (n = 1 / 0), ho(e, Array.isArray(t) ? t : [t], r, n);
}
Ye.filter = v0;
function ho(e, t, r, n) {
  for (var a = [], i = [t], u = [0]; ; ) {
    if (u[0] >= i[0].length) {
      if (u.length === 1)
        return a;
      i.shift(), u.shift();
      continue;
    }
    var o = i[0][u[0]++];
    if (e(o) && (a.push(o), --n <= 0))
      return a;
    r && (0, ra.hasChildren)(o) && o.children.length > 0 && (u.unshift(0), i.unshift(o.children));
  }
}
Ye.find = ho;
function R0(e, t) {
  return t.find(e);
}
Ye.findOneChild = R0;
function po(e, t, r) {
  r === void 0 && (r = !0);
  for (var n = null, a = 0; a < t.length && !n; a++) {
    var i = t[a];
    if ((0, ra.isTag)(i))
      e(i) ? n = i : r && i.children.length > 0 && (n = po(e, i.children, !0));
    else
      continue;
  }
  return n;
}
Ye.findOne = po;
function mo(e, t) {
  return t.some(function(r) {
    return (0, ra.isTag)(r) && (e(r) || mo(e, r.children));
  });
}
Ye.existsOne = mo;
function P0(e, t) {
  for (var r = [], n = [t], a = [0]; ; ) {
    if (a[0] >= n[0].length) {
      if (n.length === 1)
        return r;
      n.shift(), a.shift();
      continue;
    }
    var i = n[0][a[0]++];
    (0, ra.isTag)(i) && (e(i) && r.push(i), i.children.length > 0 && (a.unshift(0), n.unshift(i.children)));
  }
}
Ye.findAll = P0;
var nt = {};
Object.defineProperty(nt, "__esModule", { value: !0 });
nt.getElementsByTagType = nt.getElementsByTagName = nt.getElementById = nt.getElements = nt.testElement = void 0;
var Vt = He, na = Ye, Yn = {
  tag_name: function(e) {
    return typeof e == "function" ? function(t) {
      return (0, Vt.isTag)(t) && e(t.name);
    } : e === "*" ? Vt.isTag : function(t) {
      return (0, Vt.isTag)(t) && t.name === e;
    };
  },
  tag_type: function(e) {
    return typeof e == "function" ? function(t) {
      return e(t.type);
    } : function(t) {
      return t.type === e;
    };
  },
  tag_contains: function(e) {
    return typeof e == "function" ? function(t) {
      return (0, Vt.isText)(t) && e(t.data);
    } : function(t) {
      return (0, Vt.isText)(t) && t.data === e;
    };
  }
};
function Eo(e, t) {
  return typeof t == "function" ? function(r) {
    return (0, Vt.isTag)(r) && t(r.attribs[e]);
  } : function(r) {
    return (0, Vt.isTag)(r) && r.attribs[e] === t;
  };
}
function L0(e, t) {
  return function(r) {
    return e(r) || t(r);
  };
}
function To(e) {
  var t = Object.keys(e).map(function(r) {
    var n = e[r];
    return Object.prototype.hasOwnProperty.call(Yn, r) ? Yn[r](n) : Eo(r, n);
  });
  return t.length === 0 ? null : t.reduce(L0);
}
function x0(e, t) {
  var r = To(e);
  return r ? r(t) : !0;
}
nt.testElement = x0;
function w0(e, t, r, n) {
  n === void 0 && (n = 1 / 0);
  var a = To(e);
  return a ? (0, na.filter)(a, t, r, n) : [];
}
nt.getElements = w0;
function M0(e, t, r) {
  return r === void 0 && (r = !0), Array.isArray(t) || (t = [t]), (0, na.findOne)(Eo("id", e), t, r);
}
nt.getElementById = M0;
function B0(e, t, r, n) {
  return r === void 0 && (r = !0), n === void 0 && (n = 1 / 0), (0, na.filter)(Yn.tag_name(e), t, r, n);
}
nt.getElementsByTagName = B0;
function k0(e, t, r, n) {
  return r === void 0 && (r = !0), n === void 0 && (n = 1 / 0), (0, na.filter)(Yn.tag_type(e), t, r, n);
}
nt.getElementsByTagType = k0;
var go = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.uniqueSort = e.compareDocumentPosition = e.DocumentPosition = e.removeSubsets = void 0;
  var t = He;
  function r(u) {
    for (var o = u.length; --o >= 0; ) {
      var c = u[o];
      if (o > 0 && u.lastIndexOf(c, o - 1) >= 0) {
        u.splice(o, 1);
        continue;
      }
      for (var h = c.parent; h; h = h.parent)
        if (u.includes(h)) {
          u.splice(o, 1);
          break;
        }
    }
    return u;
  }
  e.removeSubsets = r;
  var n;
  (function(u) {
    u[u.DISCONNECTED = 1] = "DISCONNECTED", u[u.PRECEDING = 2] = "PRECEDING", u[u.FOLLOWING = 4] = "FOLLOWING", u[u.CONTAINS = 8] = "CONTAINS", u[u.CONTAINED_BY = 16] = "CONTAINED_BY";
  })(n = e.DocumentPosition || (e.DocumentPosition = {}));
  function a(u, o) {
    var c = [], h = [];
    if (u === o)
      return 0;
    for (var s = (0, t.hasChildren)(u) ? u : u.parent; s; )
      c.unshift(s), s = s.parent;
    for (s = (0, t.hasChildren)(o) ? o : o.parent; s; )
      h.unshift(s), s = s.parent;
    for (var g = Math.min(c.length, h.length), p = 0; p < g && c[p] === h[p]; )
      p++;
    if (p === 0)
      return n.DISCONNECTED;
    var m = c[p - 1], b = m.children, R = c[p], C = h[p];
    return b.indexOf(R) > b.indexOf(C) ? m === o ? n.FOLLOWING | n.CONTAINED_BY : n.FOLLOWING : m === u ? n.PRECEDING | n.CONTAINS : n.PRECEDING;
  }
  e.compareDocumentPosition = a;
  function i(u) {
    return u = u.filter(function(o, c, h) {
      return !h.includes(o, c + 1);
    }), u.sort(function(o, c) {
      var h = a(o, c);
      return h & n.PRECEDING ? -1 : h & n.FOLLOWING ? 1 : 0;
    }), u;
  }
  e.uniqueSort = i;
})(go);
var aa = {};
Object.defineProperty(aa, "__esModule", { value: !0 });
aa.getFeed = void 0;
var F0 = rt, fn = nt;
function U0(e) {
  var t = Vn(Y0, e);
  return t ? t.name === "feed" ? H0(t) : G0(t) : null;
}
aa.getFeed = U0;
function H0(e) {
  var t, r = e.children, n = {
    type: "atom",
    items: (0, fn.getElementsByTagName)("entry", r).map(function(u) {
      var o, c = u.children, h = { media: _o(c) };
      Xe(h, "id", "id", c), Xe(h, "title", "title", c);
      var s = (o = Vn("link", c)) === null || o === void 0 ? void 0 : o.attribs.href;
      s && (h.link = s);
      var g = kt("summary", c) || kt("content", c);
      g && (h.description = g);
      var p = kt("updated", c);
      return p && (h.pubDate = new Date(p)), h;
    })
  };
  Xe(n, "id", "id", r), Xe(n, "title", "title", r);
  var a = (t = Vn("link", r)) === null || t === void 0 ? void 0 : t.attribs.href;
  a && (n.link = a), Xe(n, "description", "subtitle", r);
  var i = kt("updated", r);
  return i && (n.updated = new Date(i)), Xe(n, "author", "email", r, !0), n;
}
function G0(e) {
  var t, r, n = (r = (t = Vn("channel", e.children)) === null || t === void 0 ? void 0 : t.children) !== null && r !== void 0 ? r : [], a = {
    type: e.name.substr(0, 3),
    id: "",
    items: (0, fn.getElementsByTagName)("item", e.children).map(function(u) {
      var o = u.children, c = { media: _o(o) };
      Xe(c, "id", "guid", o), Xe(c, "title", "title", o), Xe(c, "link", "link", o), Xe(c, "description", "description", o);
      var h = kt("pubDate", o) || kt("dc:date", o);
      return h && (c.pubDate = new Date(h)), c;
    })
  };
  Xe(a, "title", "title", n), Xe(a, "link", "link", n), Xe(a, "description", "description", n);
  var i = kt("lastBuildDate", n);
  return i && (a.updated = new Date(i)), Xe(a, "author", "managingEditor", n, !0), a;
}
var j0 = ["url", "type", "lang"], q0 = [
  "fileSize",
  "bitrate",
  "framerate",
  "samplingrate",
  "channels",
  "duration",
  "height",
  "width"
];
function _o(e) {
  return (0, fn.getElementsByTagName)("media:content", e).map(function(t) {
    for (var r = t.attribs, n = {
      medium: r.medium,
      isDefault: !!r.isDefault
    }, a = 0, i = j0; a < i.length; a++) {
      var u = i[a];
      r[u] && (n[u] = r[u]);
    }
    for (var o = 0, c = q0; o < c.length; o++) {
      var u = c[o];
      r[u] && (n[u] = parseInt(r[u], 10));
    }
    return r.expression && (n.expression = r.expression), n;
  });
}
function Vn(e, t) {
  return (0, fn.getElementsByTagName)(e, t, !0, 1)[0];
}
function kt(e, t, r) {
  return r === void 0 && (r = !1), (0, F0.textContent)((0, fn.getElementsByTagName)(e, t, r, 1)).trim();
}
function Xe(e, t, r, n, a) {
  a === void 0 && (a = !1);
  var i = kt(r, n, a);
  i && (e[t] = i);
}
function Y0(e) {
  return e === "rss" || e === "feed" || e === "rdf:RDF";
}
(function(e) {
  var t = w && w.__createBinding || (Object.create ? function(a, i, u, o) {
    o === void 0 && (o = u);
    var c = Object.getOwnPropertyDescriptor(i, u);
    (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
      return i[u];
    } }), Object.defineProperty(a, o, c);
  } : function(a, i, u, o) {
    o === void 0 && (o = u), a[o] = i[u];
  }), r = w && w.__exportStar || function(a, i) {
    for (var u in a)
      u !== "default" && !Object.prototype.hasOwnProperty.call(i, u) && t(i, a, u);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.hasChildren = e.isDocument = e.isComment = e.isText = e.isCDATA = e.isTag = void 0, r(rt, e), r(ke, e), r(ze, e), r(Ye, e), r(nt, e), r(go, e), r(aa, e);
  var n = He;
  Object.defineProperty(e, "isTag", { enumerable: !0, get: function() {
    return n.isTag;
  } }), Object.defineProperty(e, "isCDATA", { enumerable: !0, get: function() {
    return n.isCDATA;
  } }), Object.defineProperty(e, "isText", { enumerable: !0, get: function() {
    return n.isText;
  } }), Object.defineProperty(e, "isComment", { enumerable: !0, get: function() {
    return n.isComment;
  } }), Object.defineProperty(e, "isDocument", { enumerable: !0, get: function() {
    return n.isDocument;
  } }), Object.defineProperty(e, "hasChildren", { enumerable: !0, get: function() {
    return n.hasChildren;
  } });
})(ot);
var Wt = w && w.__assign || function() {
  return Wt = Object.assign || function(e) {
    for (var t, r = 1, n = arguments.length; r < n; r++) {
      t = arguments[r];
      for (var a in t)
        Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
    }
    return e;
  }, Wt.apply(this, arguments);
}, V0 = w && w.__createBinding || (Object.create ? function(e, t, r, n) {
  n === void 0 && (n = r);
  var a = Object.getOwnPropertyDescriptor(t, r);
  (!a || ("get" in a ? !t.__esModule : a.writable || a.configurable)) && (a = { enumerable: !0, get: function() {
    return t[r];
  } }), Object.defineProperty(e, n, a);
} : function(e, t, r, n) {
  n === void 0 && (n = r), e[n] = t[r];
}), $0 = w && w.__setModuleDefault || (Object.create ? function(e, t) {
  Object.defineProperty(e, "default", { enumerable: !0, value: t });
} : function(e, t) {
  e.default = t;
}), W0 = w && w.__importStar || function(e) {
  if (e && e.__esModule)
    return e;
  var t = {};
  if (e != null)
    for (var r in e)
      r !== "default" && Object.prototype.hasOwnProperty.call(e, r) && V0(t, e, r);
  return $0(t, e), t;
};
Object.defineProperty(Oe, "__esModule", { value: !0 });
Oe.merge = Oe.contains = Oe.root = Oe.parseHTML = Oe.text = Oe.xml = Oe.html = void 0;
var Q0 = ot, li = W0(Pr);
function bo(e, t, r) {
  return e ? e(t ?? e._root.children, null, void 0, r).toString() : "";
}
function X0(e, t) {
  return !t && typeof e == "object" && e != null && !("length" in e) && !("type" in e);
}
function z0(e, t) {
  var r = X0(e) ? (t = e, void 0) : e, n = Wt(Wt(Wt({}, li.default), this === null || this === void 0 ? void 0 : this._options), (0, li.flatten)(t ?? {}));
  return bo(this, r, n);
}
Oe.html = z0;
function K0(e) {
  var t = Wt(Wt({}, this._options), { xmlMode: !0 });
  return bo(this, e, t);
}
Oe.xml = K0;
function Z0(e) {
  for (var t = e || (this ? this.root() : []), r = "", n = 0; n < t.length; n++)
    r += (0, Q0.textContent)(t[n]);
  return r;
}
Oe.text = Z0;
function J0(e, t, r) {
  if (r === void 0 && (r = typeof t == "boolean" ? t : !1), !e || typeof e != "string")
    return null;
  typeof t == "boolean" && (r = t);
  var n = this.load(e, li.default, !1);
  return r || n("script").remove(), n.root()[0].children.slice();
}
Oe.parseHTML = J0;
function ef() {
  return this(this._root);
}
Oe.root = ef;
function tf(e, t) {
  if (t === e)
    return !1;
  for (var r = t; r && r !== r.parent; )
    if (r = r.parent, r === e)
      return !0;
  return !1;
}
Oe.contains = tf;
function rf(e, t) {
  if (!(!Nu(e) || !Nu(t))) {
    for (var r = e.length, n = +t.length, a = 0; a < n; a++)
      e[r++] = t[a];
    return e.length = r, e;
  }
}
Oe.merge = rf;
function Nu(e) {
  if (Array.isArray(e))
    return !0;
  if (typeof e != "object" || !Object.prototype.hasOwnProperty.call(e, "length") || typeof e.length != "number" || e.length < 0)
    return !1;
  for (var t = 0; t < e.length; t++)
    if (!(t in e))
      return !1;
  return !0;
}
var ia = {}, Pe = {}, Zt = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.isHtml = e.cloneDom = e.domEach = e.cssCase = e.camelCase = e.isCheerio = e.isTag = void 0;
  var t = He, r = He;
  Object.defineProperty(e, "isTag", { enumerable: !0, get: function() {
    return r.isTag;
  } });
  function n(s) {
    return s.cheerio != null;
  }
  e.isCheerio = n;
  function a(s) {
    return s.replace(/[_.-](\w|$)/g, function(g, p) {
      return p.toUpperCase();
    });
  }
  e.camelCase = a;
  function i(s) {
    return s.replace(/[A-Z]/g, "-$&").toLowerCase();
  }
  e.cssCase = i;
  function u(s, g) {
    for (var p = s.length, m = 0; m < p; m++)
      g(s[m], m);
    return s;
  }
  e.domEach = u;
  function o(s) {
    var g = "length" in s ? Array.prototype.map.call(s, function(m) {
      return (0, t.cloneNode)(m, !0);
    }) : [(0, t.cloneNode)(s, !0)], p = new t.Document(g);
    return g.forEach(function(m) {
      m.parent = p;
    }), g;
  }
  e.cloneDom = o;
  var c;
  (function(s) {
    s[s.LowerA = 97] = "LowerA", s[s.LowerZ = 122] = "LowerZ", s[s.UpperA = 65] = "UpperA", s[s.UpperZ = 90] = "UpperZ", s[s.Exclamation = 33] = "Exclamation";
  })(c || (c = {}));
  function h(s) {
    var g = s.indexOf("<");
    if (g < 0 || g > s.length - 3)
      return !1;
    var p = s.charCodeAt(g + 1);
    return (p >= c.LowerA && p <= c.LowerZ || p >= c.UpperA && p <= c.UpperZ || p === c.Exclamation) && s.includes(">", g + 2);
  }
  e.isHtml = h;
})(Zt);
Object.defineProperty(Pe, "__esModule", { value: !0 });
Pe.toggleClass = Pe.removeClass = Pe.addClass = Pe.hasClass = Pe.removeAttr = Pe.val = Pe.data = Pe.prop = Pe.attr = void 0;
var Ao = Oe, pe = Zt, Du = ot, pr = Object.prototype.hasOwnProperty, tn = /\s+/, Pa = "data-", Su = {
  null: null,
  true: !0,
  false: !1
}, $i = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, nf = /^{[^]*}$|^\[[^]*]$/;
function $n(e, t, r) {
  var n;
  if (!(!e || !(0, pe.isTag)(e))) {
    if ((n = e.attribs) !== null && n !== void 0 || (e.attribs = {}), !t)
      return e.attribs;
    if (pr.call(e.attribs, t))
      return !r && $i.test(t) ? t : e.attribs[t];
    if (e.name === "option" && t === "value")
      return (0, Ao.text)(e.children);
    if (e.name === "input" && (e.attribs.type === "radio" || e.attribs.type === "checkbox") && t === "value")
      return "on";
  }
}
function mr(e, t, r) {
  r === null ? Io(e, t) : e.attribs[t] = "".concat(r);
}
function af(e, t) {
  if (typeof e == "object" || t !== void 0) {
    if (typeof t == "function") {
      if (typeof e != "string")
        throw new Error("Bad combination of arguments.");
      return (0, pe.domEach)(this, function(r, n) {
        (0, pe.isTag)(r) && mr(r, e, t.call(r, n, r.attribs[e]));
      });
    }
    return (0, pe.domEach)(this, function(r) {
      (0, pe.isTag)(r) && (typeof e == "object" ? Object.keys(e).forEach(function(n) {
        var a = e[n];
        mr(r, n, a);
      }) : mr(r, e, t));
    });
  }
  return arguments.length > 1 ? this : $n(this[0], e, this.options.xmlMode);
}
Pe.attr = af;
function Ou(e, t, r) {
  return t in e ? (
    // @ts-expect-error TS doesn't like us accessing the value directly here.
    e[t]
  ) : !r && $i.test(t) ? $n(e, t, !1) !== void 0 : $n(e, t, r);
}
function La(e, t, r, n) {
  t in e ? e[t] = r : mr(e, t, !n && $i.test(t) ? r ? "" : null : "".concat(r));
}
function uf(e, t) {
  var r = this, n;
  if (typeof e == "string" && t === void 0) {
    var a = this[0];
    if (!a || !(0, pe.isTag)(a))
      return;
    switch (e) {
      case "style": {
        var i = this.css(), u = Object.keys(i);
        return u.forEach(function(c, h) {
          i[h] = c;
        }), i.length = u.length, i;
      }
      case "tagName":
      case "nodeName":
        return a.name.toUpperCase();
      case "href":
      case "src": {
        var o = (n = a.attribs) === null || n === void 0 ? void 0 : n[e];
        return typeof URL < "u" && (e === "href" && (a.tagName === "a" || a.name === "link") || e === "src" && (a.tagName === "img" || a.tagName === "iframe" || a.tagName === "audio" || a.tagName === "video" || a.tagName === "source")) && o !== void 0 && this.options.baseURI ? new URL(o, this.options.baseURI).href : o;
      }
      case "innerText":
        return (0, Du.innerText)(a);
      case "textContent":
        return (0, Du.textContent)(a);
      case "outerHTML":
        return this.clone().wrap("<container />").parent().html();
      case "innerHTML":
        return this.html();
      default:
        return Ou(a, e, this.options.xmlMode);
    }
  }
  if (typeof e == "object" || t !== void 0) {
    if (typeof t == "function") {
      if (typeof e == "object")
        throw new Error("Bad combination of arguments.");
      return (0, pe.domEach)(this, function(c, h) {
        (0, pe.isTag)(c) && La(c, e, t.call(c, h, Ou(c, e, r.options.xmlMode)), r.options.xmlMode);
      });
    }
    return (0, pe.domEach)(this, function(c) {
      (0, pe.isTag)(c) && (typeof e == "object" ? Object.keys(e).forEach(function(h) {
        var s = e[h];
        La(c, h, s, r.options.xmlMode);
      }) : La(c, e, t, r.options.xmlMode));
    });
  }
}
Pe.prop = uf;
function vu(e, t, r) {
  var n, a = e;
  (n = a.data) !== null && n !== void 0 || (a.data = {}), typeof t == "object" ? Object.assign(a.data, t) : typeof t == "string" && r !== void 0 && (a.data[t] = r);
}
function Ru(e, t) {
  var r, n, a;
  t == null ? (r = Object.keys(e.attribs).filter(function(c) {
    return c.startsWith(Pa);
  }), n = r.map(function(c) {
    return (0, pe.camelCase)(c.slice(Pa.length));
  })) : (r = [Pa + (0, pe.cssCase)(t)], n = [t]);
  for (var i = 0; i < r.length; ++i) {
    var u = r[i], o = n[i];
    if (pr.call(e.attribs, u) && !pr.call(e.data, o)) {
      if (a = e.attribs[u], pr.call(Su, a))
        a = Su[a];
      else if (a === String(Number(a)))
        a = Number(a);
      else if (nf.test(a))
        try {
          a = JSON.parse(a);
        } catch {
        }
      e.data[o] = a;
    }
  }
  return t == null ? e.data : a;
}
function sf(e, t) {
  var r, n = this[0];
  if (!(!n || !(0, pe.isTag)(n))) {
    var a = n;
    return (r = a.data) !== null && r !== void 0 || (a.data = {}), e ? typeof e == "object" || t !== void 0 ? ((0, pe.domEach)(this, function(i) {
      (0, pe.isTag)(i) && (typeof e == "object" ? vu(i, e) : vu(i, e, t));
    }), this) : pr.call(a.data, e) ? a.data[e] : Ru(a, e) : Ru(a);
  }
}
Pe.data = sf;
function of(e) {
  var t = arguments.length === 0, r = this[0];
  if (!r || !(0, pe.isTag)(r))
    return t ? void 0 : this;
  switch (r.name) {
    case "textarea":
      return this.text(e);
    case "select": {
      var n = this.find("option:selected");
      if (!t) {
        if (this.attr("multiple") == null && typeof e == "object")
          return this;
        this.find("option").removeAttr("selected");
        for (var a = typeof e != "object" ? [e] : e, i = 0; i < a.length; i++)
          this.find('option[value="'.concat(a[i], '"]')).attr("selected", "");
        return this;
      }
      return this.attr("multiple") ? n.toArray().map(function(u) {
        return (0, Ao.text)(u.children);
      }) : n.attr("value");
    }
    case "input":
    case "option":
      return t ? this.attr("value") : this.attr("value", e);
  }
}
Pe.val = of;
function Io(e, t) {
  !e.attribs || !pr.call(e.attribs, t) || delete e.attribs[t];
}
function Wn(e) {
  return e ? e.trim().split(tn) : [];
}
function cf(e) {
  for (var t = Wn(e), r = function(i) {
    (0, pe.domEach)(n, function(u) {
      (0, pe.isTag)(u) && Io(u, t[i]);
    });
  }, n = this, a = 0; a < t.length; a++)
    r(a);
  return this;
}
Pe.removeAttr = cf;
function lf(e) {
  return this.toArray().some(function(t) {
    var r = (0, pe.isTag)(t) && t.attribs.class, n = -1;
    if (r && e.length)
      for (; (n = r.indexOf(e, n + 1)) > -1; ) {
        var a = n + e.length;
        if ((n === 0 || tn.test(r[n - 1])) && (a === r.length || tn.test(r[a])))
          return !0;
      }
    return !1;
  });
}
Pe.hasClass = lf;
function yo(e) {
  if (typeof e == "function")
    return (0, pe.domEach)(this, function(h, s) {
      if ((0, pe.isTag)(h)) {
        var g = h.attribs.class || "";
        yo.call([h], e.call(h, s, g));
      }
    });
  if (!e || typeof e != "string")
    return this;
  for (var t = e.split(tn), r = this.length, n = 0; n < r; n++) {
    var a = this[n];
    if ((0, pe.isTag)(a)) {
      var i = $n(a, "class", !1);
      if (!i)
        mr(a, "class", t.join(" ").trim());
      else {
        for (var u = " ".concat(i, " "), o = 0; o < t.length; o++) {
          var c = "".concat(t[o], " ");
          u.includes(" ".concat(c)) || (u += c);
        }
        mr(a, "class", u.trim());
      }
    }
  }
  return this;
}
Pe.addClass = yo;
function Co(e) {
  if (typeof e == "function")
    return (0, pe.domEach)(this, function(a, i) {
      (0, pe.isTag)(a) && Co.call([a], e.call(a, i, a.attribs.class || ""));
    });
  var t = Wn(e), r = t.length, n = arguments.length === 0;
  return (0, pe.domEach)(this, function(a) {
    if ((0, pe.isTag)(a))
      if (n)
        a.attribs.class = "";
      else {
        for (var i = Wn(a.attribs.class), u = !1, o = 0; o < r; o++) {
          var c = i.indexOf(t[o]);
          c >= 0 && (i.splice(c, 1), u = !0, o--);
        }
        u && (a.attribs.class = i.join(" "));
      }
  });
}
Pe.removeClass = Co;
function No(e, t) {
  if (typeof e == "function")
    return (0, pe.domEach)(this, function(g, p) {
      (0, pe.isTag)(g) && No.call([g], e.call(g, p, g.attribs.class || "", t), t);
    });
  if (!e || typeof e != "string")
    return this;
  for (var r = e.split(tn), n = r.length, a = typeof t == "boolean" ? t ? 1 : -1 : 0, i = this.length, u = 0; u < i; u++) {
    var o = this[u];
    if ((0, pe.isTag)(o)) {
      for (var c = Wn(o.attribs.class), h = 0; h < n; h++) {
        var s = c.indexOf(r[h]);
        a >= 0 && s < 0 ? c.push(r[h]) : a <= 0 && s >= 0 && c.splice(s, 1);
      }
      o.attribs.class = c.join(" ");
    }
  }
  return this;
}
Pe.toggleClass = No;
var X = {}, Do = {}, se;
(function(e) {
  e.Attribute = "attribute", e.Pseudo = "pseudo", e.PseudoElement = "pseudo-element", e.Tag = "tag", e.Universal = "universal", e.Adjacent = "adjacent", e.Child = "child", e.Descendant = "descendant", e.Parent = "parent", e.Sibling = "sibling", e.ColumnCombinator = "column-combinator";
})(se || (se = {}));
const ff = {
  Unknown: null,
  QuirksMode: "quirks",
  IgnoreCase: !0,
  CaseSensitive: !1
};
var ye;
(function(e) {
  e.Any = "any", e.Element = "element", e.End = "end", e.Equals = "equals", e.Exists = "exists", e.Hyphen = "hyphen", e.Not = "not", e.Start = "start";
})(ye || (ye = {}));
const Pu = /^[^\\#]?(?:\\(?:[\da-f]{1,6}\s?|.)|[\w\-\u00b0-\uFFFF])+/, df = /\\([\da-f]{1,6}\s?|(\s)|.)/gi, hf = /* @__PURE__ */ new Map([
  [126, ye.Element],
  [94, ye.Start],
  [36, ye.End],
  [42, ye.Any],
  [33, ye.Not],
  [124, ye.Hyphen]
]), pf = /* @__PURE__ */ new Set([
  "has",
  "not",
  "matches",
  "is",
  "where",
  "host",
  "host-context"
]);
function So(e) {
  switch (e.type) {
    case se.Adjacent:
    case se.Child:
    case se.Descendant:
    case se.Parent:
    case se.Sibling:
    case se.ColumnCombinator:
      return !0;
    default:
      return !1;
  }
}
const mf = /* @__PURE__ */ new Set(["contains", "icontains"]);
function Ef(e, t, r) {
  const n = parseInt(t, 16) - 65536;
  return n !== n || r ? t : n < 0 ? (
    // BMP codepoint
    String.fromCharCode(n + 65536)
  ) : (
    // Supplemental Plane codepoint (surrogate pair)
    String.fromCharCode(n >> 10 | 55296, n & 1023 | 56320)
  );
}
function Ur(e) {
  return e.replace(df, Ef);
}
function xa(e) {
  return e === 39 || e === 34;
}
function Lu(e) {
  return e === 32 || e === 9 || e === 10 || e === 12 || e === 13;
}
function Tf(e) {
  const t = [], r = Oo(t, `${e}`, 0);
  if (r < e.length)
    throw new Error(`Unmatched selector: ${e.slice(r)}`);
  return t;
}
function Oo(e, t, r) {
  let n = [];
  function a(p) {
    const m = t.slice(r + p).match(Pu);
    if (!m)
      throw new Error(`Expected name, found ${t.slice(r)}`);
    const [b] = m;
    return r += p + b.length, Ur(b);
  }
  function i(p) {
    for (r += p; r < t.length && Lu(t.charCodeAt(r)); )
      r++;
  }
  function u() {
    r += 1;
    const p = r;
    let m = 1;
    for (; m > 0 && r < t.length; r++)
      t.charCodeAt(r) === 40 && !o(r) ? m++ : t.charCodeAt(r) === 41 && !o(r) && m--;
    if (m)
      throw new Error("Parenthesis not matched");
    return Ur(t.slice(p, r - 1));
  }
  function o(p) {
    let m = 0;
    for (; t.charCodeAt(--p) === 92; )
      m++;
    return (m & 1) === 1;
  }
  function c() {
    if (n.length > 0 && So(n[n.length - 1]))
      throw new Error("Did not expect successive traversals.");
  }
  function h(p) {
    if (n.length > 0 && n[n.length - 1].type === se.Descendant) {
      n[n.length - 1].type = p;
      return;
    }
    c(), n.push({ type: p });
  }
  function s(p, m) {
    n.push({
      type: se.Attribute,
      name: p,
      action: m,
      value: a(1),
      namespace: null,
      ignoreCase: "quirks"
    });
  }
  function g() {
    if (n.length && n[n.length - 1].type === se.Descendant && n.pop(), n.length === 0)
      throw new Error("Empty sub-selector");
    e.push(n);
  }
  if (i(0), t.length === r)
    return r;
  e:
    for (; r < t.length; ) {
      const p = t.charCodeAt(r);
      switch (p) {
        case 32:
        case 9:
        case 10:
        case 12:
        case 13: {
          (n.length === 0 || n[0].type !== se.Descendant) && (c(), n.push({ type: se.Descendant })), i(1);
          break;
        }
        case 62: {
          h(se.Child), i(1);
          break;
        }
        case 60: {
          h(se.Parent), i(1);
          break;
        }
        case 126: {
          h(se.Sibling), i(1);
          break;
        }
        case 43: {
          h(se.Adjacent), i(1);
          break;
        }
        case 46: {
          s("class", ye.Element);
          break;
        }
        case 35: {
          s("id", ye.Equals);
          break;
        }
        case 91: {
          i(1);
          let m, b = null;
          t.charCodeAt(r) === 124 ? m = a(1) : t.startsWith("*|", r) ? (b = "*", m = a(2)) : (m = a(0), t.charCodeAt(r) === 124 && t.charCodeAt(r + 1) !== 61 && (b = m, m = a(1))), i(0);
          let R = ye.Exists;
          const C = hf.get(t.charCodeAt(r));
          if (C) {
            if (R = C, t.charCodeAt(r + 1) !== 61)
              throw new Error("Expected `=`");
            i(2);
          } else
            t.charCodeAt(r) === 61 && (R = ye.Equals, i(1));
          let D = "", S = null;
          if (R !== "exists") {
            if (xa(t.charCodeAt(r))) {
              const L = t.charCodeAt(r);
              let H = r + 1;
              for (; H < t.length && (t.charCodeAt(H) !== L || o(H)); )
                H += 1;
              if (t.charCodeAt(H) !== L)
                throw new Error("Attribute value didn't end");
              D = Ur(t.slice(r + 1, H)), r = H + 1;
            } else {
              const L = r;
              for (; r < t.length && (!Lu(t.charCodeAt(r)) && t.charCodeAt(r) !== 93 || o(r)); )
                r += 1;
              D = Ur(t.slice(L, r));
            }
            i(0);
            const P = t.charCodeAt(r) | 32;
            P === 115 ? (S = !1, i(1)) : P === 105 && (S = !0, i(1));
          }
          if (t.charCodeAt(r) !== 93)
            throw new Error("Attribute selector didn't terminate");
          r += 1;
          const B = {
            type: se.Attribute,
            name: m,
            action: R,
            value: D,
            namespace: b,
            ignoreCase: S
          };
          n.push(B);
          break;
        }
        case 58: {
          if (t.charCodeAt(r + 1) === 58) {
            n.push({
              type: se.PseudoElement,
              name: a(2).toLowerCase(),
              data: t.charCodeAt(r) === 40 ? u() : null
            });
            continue;
          }
          const m = a(1).toLowerCase();
          let b = null;
          if (t.charCodeAt(r) === 40)
            if (pf.has(m)) {
              if (xa(t.charCodeAt(r + 1)))
                throw new Error(`Pseudo-selector ${m} cannot be quoted`);
              if (b = [], r = Oo(b, t, r + 1), t.charCodeAt(r) !== 41)
                throw new Error(`Missing closing parenthesis in :${m} (${t})`);
              r += 1;
            } else {
              if (b = u(), mf.has(m)) {
                const R = b.charCodeAt(0);
                R === b.charCodeAt(b.length - 1) && xa(R) && (b = b.slice(1, -1));
              }
              b = Ur(b);
            }
          n.push({ type: se.Pseudo, name: m, data: b });
          break;
        }
        case 44: {
          g(), n = [], i(1);
          break;
        }
        default: {
          if (t.startsWith("/*", r)) {
            const R = t.indexOf("*/", r + 2);
            if (R < 0)
              throw new Error("Comment was not terminated");
            r = R + 2, n.length === 0 && i(0);
            break;
          }
          let m = null, b;
          if (p === 42)
            r += 1, b = "*";
          else if (p === 124) {
            if (b = "", t.charCodeAt(r + 1) === 124) {
              h(se.ColumnCombinator), i(2);
              break;
            }
          } else if (Pu.test(t.slice(r)))
            b = a(0);
          else
            break e;
          t.charCodeAt(r) === 124 && t.charCodeAt(r + 1) !== 124 && (m = b, t.charCodeAt(r + 1) === 42 ? (b = "*", r += 2) : b = a(1)), n.push(b === "*" ? { type: se.Universal, namespace: m } : { type: se.Tag, name: b, namespace: m });
        }
      }
    }
  return g(), r;
}
const vo = ["\\", '"'], Ro = [...vo, "(", ")"], gf = new Set(vo.map((e) => e.charCodeAt(0))), xu = new Set(Ro.map((e) => e.charCodeAt(0))), cr = new Set([
  ...Ro,
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
function Po(e) {
  return e.map((t) => t.map(_f).join("")).join(", ");
}
function _f(e, t, r) {
  switch (e.type) {
    case se.Child:
      return t === 0 ? "> " : " > ";
    case se.Parent:
      return t === 0 ? "< " : " < ";
    case se.Sibling:
      return t === 0 ? "~ " : " ~ ";
    case se.Adjacent:
      return t === 0 ? "+ " : " + ";
    case se.Descendant:
      return " ";
    case se.ColumnCombinator:
      return t === 0 ? "|| " : " || ";
    case se.Universal:
      return e.namespace === "*" && t + 1 < r.length && "name" in r[t + 1] ? "" : `${Lo(e.namespace)}*`;
    case se.Tag:
      return wu(e);
    case se.PseudoElement:
      return `::${St(e.name, cr)}${e.data === null ? "" : `(${St(e.data, xu)})`}`;
    case se.Pseudo:
      return `:${St(e.name, cr)}${e.data === null ? "" : `(${typeof e.data == "string" ? St(e.data, xu) : Po(e.data)})`}`;
    case se.Attribute: {
      if (e.name === "id" && e.action === ye.Equals && e.ignoreCase === "quirks" && !e.namespace)
        return `#${St(e.value, cr)}`;
      if (e.name === "class" && e.action === ye.Element && e.ignoreCase === "quirks" && !e.namespace)
        return `.${St(e.value, cr)}`;
      const n = wu(e);
      return e.action === ye.Exists ? `[${n}]` : `[${n}${bf(e.action)}="${St(e.value, gf)}"${e.ignoreCase === null ? "" : e.ignoreCase ? " i" : " s"}]`;
    }
  }
}
function bf(e) {
  switch (e) {
    case ye.Equals:
      return "";
    case ye.Element:
      return "~";
    case ye.Start:
      return "^";
    case ye.End:
      return "$";
    case ye.Any:
      return "*";
    case ye.Not:
      return "!";
    case ye.Hyphen:
      return "|";
    case ye.Exists:
      throw new Error("Shouldn't be here");
  }
}
function wu(e) {
  return `${Lo(e.namespace)}${St(e.name, cr)}`;
}
function Lo(e) {
  return e !== null ? `${e === "*" ? "*" : St(e, cr)}|` : "";
}
function St(e, t) {
  let r = 0, n = "";
  for (let a = 0; a < e.length; a++)
    t.has(e.charCodeAt(a)) && (n += `${e.slice(r, a)}\\${e.charAt(a)}`, r = a + 1);
  return n.length > 0 ? n + e.slice(r) : e;
}
const Af = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get AttributeAction() {
    return ye;
  },
  IgnoreCaseMode: ff,
  get SelectorType() {
    return se;
  },
  isTraversal: So,
  parse: Tf,
  stringify: Po
}, Symbol.toStringTag, { value: "Module" })), dn = /* @__PURE__ */ qs(Af);
var fi = {}, Jt = {
  trueFunc: function() {
    return !0;
  },
  falseFunc: function() {
    return !1;
  }
};
const Mu = /* @__PURE__ */ Ui(Jt);
var Ut = {}, wr = {};
Object.defineProperty(wr, "__esModule", { value: !0 });
wr.isTraversal = void 0;
var tt = dn, xo = /* @__PURE__ */ new Map([
  [tt.SelectorType.Universal, 50],
  [tt.SelectorType.Tag, 30],
  [tt.SelectorType.Attribute, 1],
  [tt.SelectorType.Pseudo, 0]
]);
function If(e) {
  return !xo.has(e.type);
}
wr.isTraversal = If;
var yf = /* @__PURE__ */ new Map([
  [tt.AttributeAction.Exists, 10],
  [tt.AttributeAction.Equals, 8],
  [tt.AttributeAction.Not, 7],
  [tt.AttributeAction.Start, 6],
  [tt.AttributeAction.End, 6],
  [tt.AttributeAction.Any, 5]
]);
function Cf(e) {
  for (var t = e.map(wo), r = 1; r < e.length; r++) {
    var n = t[r];
    if (!(n < 0))
      for (var a = r - 1; a >= 0 && n < t[a]; a--) {
        var i = e[a + 1];
        e[a + 1] = e[a], e[a] = i, t[a + 1] = t[a], t[a] = n;
      }
  }
}
wr.default = Cf;
function wo(e) {
  var t, r, n = (t = xo.get(e.type)) !== null && t !== void 0 ? t : -1;
  return e.type === tt.SelectorType.Attribute ? (n = (r = yf.get(e.action)) !== null && r !== void 0 ? r : 4, e.action === tt.AttributeAction.Equals && e.name === "id" && (n = 9), e.ignoreCase && (n >>= 1)) : e.type === tt.SelectorType.Pseudo && (e.data ? e.name === "has" || e.name === "contains" ? n = 0 : Array.isArray(e.data) ? (n = Math.min.apply(Math, e.data.map(function(a) {
    return Math.min.apply(Math, a.map(wo));
  })), n < 0 && (n = 0)) : n = 2 : n = 3), n;
}
var ua = {}, sa = {}, Nf = w && w.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(sa, "__esModule", { value: !0 });
sa.attributeRules = void 0;
var Nn = Nf(Jt), Df = /[-[\]{}()*+?.,\\^$|#\s]/g;
function Bu(e) {
  return e.replace(Df, "\\$&");
}
var Sf = /* @__PURE__ */ new Set([
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
function jt(e, t) {
  return typeof e.ignoreCase == "boolean" ? e.ignoreCase : e.ignoreCase === "quirks" ? !!t.quirksMode : !t.xmlMode && Sf.has(e.name);
}
sa.attributeRules = {
  equals: function(e, t, r) {
    var n = r.adapter, a = t.name, i = t.value;
    return jt(t, r) ? (i = i.toLowerCase(), function(u) {
      var o = n.getAttributeValue(u, a);
      return o != null && o.length === i.length && o.toLowerCase() === i && e(u);
    }) : function(u) {
      return n.getAttributeValue(u, a) === i && e(u);
    };
  },
  hyphen: function(e, t, r) {
    var n = r.adapter, a = t.name, i = t.value, u = i.length;
    return jt(t, r) ? (i = i.toLowerCase(), function(c) {
      var h = n.getAttributeValue(c, a);
      return h != null && (h.length === u || h.charAt(u) === "-") && h.substr(0, u).toLowerCase() === i && e(c);
    }) : function(c) {
      var h = n.getAttributeValue(c, a);
      return h != null && (h.length === u || h.charAt(u) === "-") && h.substr(0, u) === i && e(c);
    };
  },
  element: function(e, t, r) {
    var n = r.adapter, a = t.name, i = t.value;
    if (/\s/.test(i))
      return Nn.default.falseFunc;
    var u = new RegExp("(?:^|\\s)".concat(Bu(i), "(?:$|\\s)"), jt(t, r) ? "i" : "");
    return function(c) {
      var h = n.getAttributeValue(c, a);
      return h != null && h.length >= i.length && u.test(h) && e(c);
    };
  },
  exists: function(e, t, r) {
    var n = t.name, a = r.adapter;
    return function(i) {
      return a.hasAttrib(i, n) && e(i);
    };
  },
  start: function(e, t, r) {
    var n = r.adapter, a = t.name, i = t.value, u = i.length;
    return u === 0 ? Nn.default.falseFunc : jt(t, r) ? (i = i.toLowerCase(), function(o) {
      var c = n.getAttributeValue(o, a);
      return c != null && c.length >= u && c.substr(0, u).toLowerCase() === i && e(o);
    }) : function(o) {
      var c;
      return !!(!((c = n.getAttributeValue(o, a)) === null || c === void 0) && c.startsWith(i)) && e(o);
    };
  },
  end: function(e, t, r) {
    var n = r.adapter, a = t.name, i = t.value, u = -i.length;
    return u === 0 ? Nn.default.falseFunc : jt(t, r) ? (i = i.toLowerCase(), function(o) {
      var c;
      return ((c = n.getAttributeValue(o, a)) === null || c === void 0 ? void 0 : c.substr(u).toLowerCase()) === i && e(o);
    }) : function(o) {
      var c;
      return !!(!((c = n.getAttributeValue(o, a)) === null || c === void 0) && c.endsWith(i)) && e(o);
    };
  },
  any: function(e, t, r) {
    var n = r.adapter, a = t.name, i = t.value;
    if (i === "")
      return Nn.default.falseFunc;
    if (jt(t, r)) {
      var u = new RegExp(Bu(i), "i");
      return function(c) {
        var h = n.getAttributeValue(c, a);
        return h != null && h.length >= i.length && u.test(h) && e(c);
      };
    }
    return function(o) {
      var c;
      return !!(!((c = n.getAttributeValue(o, a)) === null || c === void 0) && c.includes(i)) && e(o);
    };
  },
  not: function(e, t, r) {
    var n = r.adapter, a = t.name, i = t.value;
    return i === "" ? function(u) {
      return !!n.getAttributeValue(u, a) && e(u);
    } : jt(t, r) ? (i = i.toLowerCase(), function(u) {
      var o = n.getAttributeValue(u, a);
      return (o == null || o.length !== i.length || o.toLowerCase() !== i) && e(u);
    }) : function(u) {
      return n.getAttributeValue(u, a) !== i && e(u);
    };
  }
};
var Wi = {}, Mo = {};
const Of = /* @__PURE__ */ new Set([9, 10, 12, 13, 32]), ku = 48, vf = 57;
function Qi(e) {
  if (e = e.trim().toLowerCase(), e === "even")
    return [2, 0];
  if (e === "odd")
    return [2, 1];
  let t = 0, r = 0, n = i(), a = u();
  if (t < e.length && e.charAt(t) === "n" && (t++, r = n * (a ?? 1), o(), t < e.length ? (n = i(), o(), a = u()) : n = a = 0), a === null || t < e.length)
    throw new Error(`n-th rule couldn't be parsed ('${e}')`);
  return [r, n * a];
  function i() {
    return e.charAt(t) === "-" ? (t++, -1) : (e.charAt(t) === "+" && t++, 1);
  }
  function u() {
    const c = t;
    let h = 0;
    for (; t < e.length && e.charCodeAt(t) >= ku && e.charCodeAt(t) <= vf; )
      h = h * 10 + (e.charCodeAt(t) - ku), t++;
    return t === c ? null : h;
  }
  function o() {
    for (; t < e.length && Of.has(e.charCodeAt(t)); )
      t++;
  }
}
function Bo(e) {
  const t = e[0], r = e[1] - 1;
  if (r < 0 && t <= 0)
    return Mu.falseFunc;
  if (t === -1)
    return (i) => i <= r;
  if (t === 0)
    return (i) => i === r;
  if (t === 1)
    return r < 0 ? Mu.trueFunc : (i) => i >= r;
  const n = Math.abs(t), a = (r % n + n) % n;
  return t > 1 ? (i) => i >= r && i % n === a : (i) => i <= r && i % n === a;
}
function ko(e) {
  const t = e[0];
  let r = e[1] - 1, n = 0;
  if (t < 0) {
    const a = -t, i = (r % a + a) % a;
    return () => {
      const u = i + a * n++;
      return u > r ? null : u;
    };
  }
  return t === 0 ? r < 0 ? (
    // There are no result — always return `null`
    () => null
  ) : (
    // Return `b` exactly once
    () => n++ === 0 ? r : null
  ) : (r < 0 && (r += t * Math.ceil(-r / t)), () => t * n++ + r);
}
function di(e) {
  return Bo(Qi(e));
}
function Rf(e) {
  return ko(Qi(e));
}
const Pf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  compile: Bo,
  default: di,
  generate: ko,
  parse: Qi,
  sequence: Rf
}, Symbol.toStringTag, { value: "Module" })), Lf = /* @__PURE__ */ qs(Pf);
(function(e) {
  var t = w && w.__importDefault || function(u) {
    return u && u.__esModule ? u : { default: u };
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.filters = void 0;
  var r = t(Lf), n = t(Jt);
  function a(u, o) {
    return function(c) {
      var h = o.getParent(c);
      return h != null && o.isTag(h) && u(c);
    };
  }
  e.filters = {
    contains: function(u, o, c) {
      var h = c.adapter;
      return function(g) {
        return u(g) && h.getText(g).includes(o);
      };
    },
    icontains: function(u, o, c) {
      var h = c.adapter, s = o.toLowerCase();
      return function(p) {
        return u(p) && h.getText(p).toLowerCase().includes(s);
      };
    },
    // Location specific methods
    "nth-child": function(u, o, c) {
      var h = c.adapter, s = c.equals, g = (0, r.default)(o);
      return g === n.default.falseFunc ? n.default.falseFunc : g === n.default.trueFunc ? a(u, h) : function(m) {
        for (var b = h.getSiblings(m), R = 0, C = 0; C < b.length && !s(m, b[C]); C++)
          h.isTag(b[C]) && R++;
        return g(R) && u(m);
      };
    },
    "nth-last-child": function(u, o, c) {
      var h = c.adapter, s = c.equals, g = (0, r.default)(o);
      return g === n.default.falseFunc ? n.default.falseFunc : g === n.default.trueFunc ? a(u, h) : function(m) {
        for (var b = h.getSiblings(m), R = 0, C = b.length - 1; C >= 0 && !s(m, b[C]); C--)
          h.isTag(b[C]) && R++;
        return g(R) && u(m);
      };
    },
    "nth-of-type": function(u, o, c) {
      var h = c.adapter, s = c.equals, g = (0, r.default)(o);
      return g === n.default.falseFunc ? n.default.falseFunc : g === n.default.trueFunc ? a(u, h) : function(m) {
        for (var b = h.getSiblings(m), R = 0, C = 0; C < b.length; C++) {
          var D = b[C];
          if (s(m, D))
            break;
          h.isTag(D) && h.getName(D) === h.getName(m) && R++;
        }
        return g(R) && u(m);
      };
    },
    "nth-last-of-type": function(u, o, c) {
      var h = c.adapter, s = c.equals, g = (0, r.default)(o);
      return g === n.default.falseFunc ? n.default.falseFunc : g === n.default.trueFunc ? a(u, h) : function(m) {
        for (var b = h.getSiblings(m), R = 0, C = b.length - 1; C >= 0; C--) {
          var D = b[C];
          if (s(m, D))
            break;
          h.isTag(D) && h.getName(D) === h.getName(m) && R++;
        }
        return g(R) && u(m);
      };
    },
    // TODO determine the actual root element
    root: function(u, o, c) {
      var h = c.adapter;
      return function(s) {
        var g = h.getParent(s);
        return (g == null || !h.isTag(g)) && u(s);
      };
    },
    scope: function(u, o, c, h) {
      var s = c.equals;
      return !h || h.length === 0 ? e.filters.root(u, o, c) : h.length === 1 ? function(g) {
        return s(h[0], g) && u(g);
      } : function(g) {
        return h.includes(g) && u(g);
      };
    },
    hover: i("isHovered"),
    visited: i("isVisited"),
    active: i("isActive")
  };
  function i(u) {
    return function(c, h, s) {
      var g = s.adapter, p = g[u];
      return typeof p != "function" ? n.default.falseFunc : function(b) {
        return p(b) && c(b);
      };
    };
  }
})(Mo);
var yr = {};
Object.defineProperty(yr, "__esModule", { value: !0 });
yr.verifyPseudoArgs = yr.pseudos = void 0;
yr.pseudos = {
  empty: function(e, t) {
    var r = t.adapter;
    return !r.getChildren(e).some(function(n) {
      return r.isTag(n) || r.getText(n) !== "";
    });
  },
  "first-child": function(e, t) {
    var r = t.adapter, n = t.equals;
    if (r.prevElementSibling)
      return r.prevElementSibling(e) == null;
    var a = r.getSiblings(e).find(function(i) {
      return r.isTag(i);
    });
    return a != null && n(e, a);
  },
  "last-child": function(e, t) {
    for (var r = t.adapter, n = t.equals, a = r.getSiblings(e), i = a.length - 1; i >= 0; i--) {
      if (n(e, a[i]))
        return !0;
      if (r.isTag(a[i]))
        break;
    }
    return !1;
  },
  "first-of-type": function(e, t) {
    for (var r = t.adapter, n = t.equals, a = r.getSiblings(e), i = r.getName(e), u = 0; u < a.length; u++) {
      var o = a[u];
      if (n(e, o))
        return !0;
      if (r.isTag(o) && r.getName(o) === i)
        break;
    }
    return !1;
  },
  "last-of-type": function(e, t) {
    for (var r = t.adapter, n = t.equals, a = r.getSiblings(e), i = r.getName(e), u = a.length - 1; u >= 0; u--) {
      var o = a[u];
      if (n(e, o))
        return !0;
      if (r.isTag(o) && r.getName(o) === i)
        break;
    }
    return !1;
  },
  "only-of-type": function(e, t) {
    var r = t.adapter, n = t.equals, a = r.getName(e);
    return r.getSiblings(e).every(function(i) {
      return n(e, i) || !r.isTag(i) || r.getName(i) !== a;
    });
  },
  "only-child": function(e, t) {
    var r = t.adapter, n = t.equals;
    return r.getSiblings(e).every(function(a) {
      return n(e, a) || !r.isTag(a);
    });
  }
};
function xf(e, t, r, n) {
  if (r === null) {
    if (e.length > n)
      throw new Error("Pseudo-class :".concat(t, " requires an argument"));
  } else if (e.length === n)
    throw new Error("Pseudo-class :".concat(t, " doesn't have any arguments"));
}
yr.verifyPseudoArgs = xf;
var oa = {};
Object.defineProperty(oa, "__esModule", { value: !0 });
oa.aliases = void 0;
oa.aliases = {
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
var ca = {};
(function(e) {
  var t = w && w.__spreadArray || function(h, s, g) {
    if (g || arguments.length === 2)
      for (var p = 0, m = s.length, b; p < m; p++)
        (b || !(p in s)) && (b || (b = Array.prototype.slice.call(s, 0, p)), b[p] = s[p]);
    return h.concat(b || Array.prototype.slice.call(s));
  }, r = w && w.__importDefault || function(h) {
    return h && h.__esModule ? h : { default: h };
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.subselects = e.getNextSiblings = e.ensureIsTag = e.PLACEHOLDER_ELEMENT = void 0;
  var n = r(Jt), a = wr;
  e.PLACEHOLDER_ELEMENT = {};
  function i(h, s) {
    return h === n.default.falseFunc ? n.default.falseFunc : function(g) {
      return s.isTag(g) && h(g);
    };
  }
  e.ensureIsTag = i;
  function u(h, s) {
    var g = s.getSiblings(h);
    if (g.length <= 1)
      return [];
    var p = g.indexOf(h);
    return p < 0 || p === g.length - 1 ? [] : g.slice(p + 1).filter(s.isTag);
  }
  e.getNextSiblings = u;
  function o(h) {
    return {
      xmlMode: !!h.xmlMode,
      lowerCaseAttributeNames: !!h.lowerCaseAttributeNames,
      lowerCaseTags: !!h.lowerCaseTags,
      quirksMode: !!h.quirksMode,
      cacheResults: !!h.cacheResults,
      pseudos: h.pseudos,
      adapter: h.adapter,
      equals: h.equals
    };
  }
  var c = function(h, s, g, p, m) {
    var b = m(s, o(g), p);
    return b === n.default.trueFunc ? h : b === n.default.falseFunc ? n.default.falseFunc : function(R) {
      return b(R) && h(R);
    };
  };
  e.subselects = {
    is: c,
    /**
     * `:matches` and `:where` are aliases for `:is`.
     */
    matches: c,
    where: c,
    not: function(h, s, g, p, m) {
      var b = m(s, o(g), p);
      return b === n.default.falseFunc ? h : b === n.default.trueFunc ? n.default.falseFunc : function(R) {
        return !b(R) && h(R);
      };
    },
    has: function(h, s, g, p, m) {
      var b = g.adapter, R = o(g);
      R.relativeSelector = !0;
      var C = s.some(function(L) {
        return L.some(a.isTraversal);
      }) ? (
        // Used as a placeholder. Will be replaced with the actual element.
        [e.PLACEHOLDER_ELEMENT]
      ) : void 0, D = m(s, R, C);
      if (D === n.default.falseFunc)
        return n.default.falseFunc;
      var S = i(D, b);
      if (C && D !== n.default.trueFunc) {
        var B = D.shouldTestNextSiblings, P = B === void 0 ? !1 : B;
        return function(L) {
          if (!h(L))
            return !1;
          C[0] = L;
          var H = b.getChildren(L), $ = P ? t(t([], H, !0), u(L, b), !0) : H;
          return b.existsOne(S, $);
        };
      }
      return function(L) {
        return h(L) && b.existsOne(S, b.getChildren(L));
      };
    }
  };
})(ca);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.compilePseudoSelector = e.aliases = e.pseudos = e.filters = void 0;
  var t = dn, r = Mo;
  Object.defineProperty(e, "filters", { enumerable: !0, get: function() {
    return r.filters;
  } });
  var n = yr;
  Object.defineProperty(e, "pseudos", { enumerable: !0, get: function() {
    return n.pseudos;
  } });
  var a = oa;
  Object.defineProperty(e, "aliases", { enumerable: !0, get: function() {
    return a.aliases;
  } });
  var i = ca;
  function u(o, c, h, s, g) {
    var p, m = c.name, b = c.data;
    if (Array.isArray(b)) {
      if (!(m in i.subselects))
        throw new Error("Unknown pseudo-class :".concat(m, "(").concat(b, ")"));
      return i.subselects[m](o, b, h, s, g);
    }
    var R = (p = h.pseudos) === null || p === void 0 ? void 0 : p[m], C = typeof R == "string" ? R : a.aliases[m];
    if (typeof C == "string") {
      if (b != null)
        throw new Error("Pseudo ".concat(m, " doesn't have any arguments"));
      var D = (0, t.parse)(C);
      return i.subselects.is(o, D, h, s, g);
    }
    if (typeof R == "function")
      return (0, n.verifyPseudoArgs)(R, m, b, 1), function(B) {
        return R(B, b) && o(B);
      };
    if (m in r.filters)
      return r.filters[m](o, b, h, s);
    if (m in n.pseudos) {
      var S = n.pseudos[m];
      return (0, n.verifyPseudoArgs)(S, m, b, 2), function(B) {
        return S(B, h, b) && o(B);
      };
    }
    throw new Error("Unknown pseudo-class :".concat(m));
  }
  e.compilePseudoSelector = u;
})(Wi);
Object.defineProperty(ua, "__esModule", { value: !0 });
ua.compileGeneralSelector = void 0;
var wf = sa, Mf = Wi, st = dn;
function wa(e, t) {
  var r = t.getParent(e);
  return r && t.isTag(r) ? r : null;
}
function Bf(e, t, r, n, a) {
  var i = r.adapter, u = r.equals;
  switch (t.type) {
    case st.SelectorType.PseudoElement:
      throw new Error("Pseudo-elements are not supported by css-select");
    case st.SelectorType.ColumnCombinator:
      throw new Error("Column combinators are not yet supported by css-select");
    case st.SelectorType.Attribute: {
      if (t.namespace != null)
        throw new Error("Namespaced attributes are not yet supported by css-select");
      return (!r.xmlMode || r.lowerCaseAttributeNames) && (t.name = t.name.toLowerCase()), wf.attributeRules[t.action](e, t, r);
    }
    case st.SelectorType.Pseudo:
      return (0, Mf.compilePseudoSelector)(e, t, r, n, a);
    case st.SelectorType.Tag: {
      if (t.namespace != null)
        throw new Error("Namespaced tag names are not yet supported by css-select");
      var o = t.name;
      return (!r.xmlMode || r.lowerCaseTags) && (o = o.toLowerCase()), function(s) {
        return i.getName(s) === o && e(s);
      };
    }
    case st.SelectorType.Descendant: {
      if (r.cacheResults === !1 || typeof WeakSet > "u")
        return function(s) {
          for (var g = s; g = wa(g, i); )
            if (e(g))
              return !0;
          return !1;
        };
      var c = /* @__PURE__ */ new WeakSet();
      return function(s) {
        for (var g = s; g = wa(g, i); )
          if (!c.has(g)) {
            if (i.isTag(g) && e(g))
              return !0;
            c.add(g);
          }
        return !1;
      };
    }
    case "_flexibleDescendant":
      return function(s) {
        var g = s;
        do
          if (e(g))
            return !0;
        while (g = wa(g, i));
        return !1;
      };
    case st.SelectorType.Parent:
      return function(s) {
        return i.getChildren(s).some(function(g) {
          return i.isTag(g) && e(g);
        });
      };
    case st.SelectorType.Child:
      return function(s) {
        var g = i.getParent(s);
        return g != null && i.isTag(g) && e(g);
      };
    case st.SelectorType.Sibling:
      return function(s) {
        for (var g = i.getSiblings(s), p = 0; p < g.length; p++) {
          var m = g[p];
          if (u(s, m))
            break;
          if (i.isTag(m) && e(m))
            return !0;
        }
        return !1;
      };
    case st.SelectorType.Adjacent:
      return i.prevElementSibling ? function(s) {
        var g = i.prevElementSibling(s);
        return g != null && e(g);
      } : function(s) {
        for (var g = i.getSiblings(s), p, m = 0; m < g.length; m++) {
          var b = g[m];
          if (u(s, b))
            break;
          i.isTag(b) && (p = b);
        }
        return !!p && e(p);
      };
    case st.SelectorType.Universal: {
      if (t.namespace != null && t.namespace !== "*")
        throw new Error("Namespaced universal selectors are not yet supported by css-select");
      return e;
    }
  }
}
ua.compileGeneralSelector = Bf;
var kf = w && w.__createBinding || (Object.create ? function(e, t, r, n) {
  n === void 0 && (n = r);
  var a = Object.getOwnPropertyDescriptor(t, r);
  (!a || ("get" in a ? !t.__esModule : a.writable || a.configurable)) && (a = { enumerable: !0, get: function() {
    return t[r];
  } }), Object.defineProperty(e, n, a);
} : function(e, t, r, n) {
  n === void 0 && (n = r), e[n] = t[r];
}), Ff = w && w.__setModuleDefault || (Object.create ? function(e, t) {
  Object.defineProperty(e, "default", { enumerable: !0, value: t });
} : function(e, t) {
  e.default = t;
}), Uf = w && w.__importStar || function(e) {
  if (e && e.__esModule)
    return e;
  var t = {};
  if (e != null)
    for (var r in e)
      r !== "default" && Object.prototype.hasOwnProperty.call(e, r) && kf(t, e, r);
  return Ff(t, e), t;
}, Hf = w && w.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Ut, "__esModule", { value: !0 });
Ut.compileToken = Ut.compileUnsafe = Ut.compile = void 0;
var Ot = dn, Ft = Hf(Jt), hi = Uf(wr), Gf = ua, Fo = ca;
function jf(e, t, r) {
  var n = Uo(e, t, r);
  return (0, Fo.ensureIsTag)(n, t.adapter);
}
Ut.compile = jf;
function Uo(e, t, r) {
  var n = typeof e == "string" ? (0, Ot.parse)(e) : e;
  return Xi(n, t, r);
}
Ut.compileUnsafe = Uo;
function Ho(e) {
  return e.type === Ot.SelectorType.Pseudo && (e.name === "scope" || Array.isArray(e.data) && e.data.some(function(t) {
    return t.some(Ho);
  }));
}
var qf = { type: Ot.SelectorType.Descendant }, Yf = {
  type: "_flexibleDescendant"
}, Vf = {
  type: Ot.SelectorType.Pseudo,
  name: "scope",
  data: null
};
function $f(e, t, r) {
  for (var n = t.adapter, a = !!(r != null && r.every(function(c) {
    var h = n.isTag(c) && n.getParent(c);
    return c === Fo.PLACEHOLDER_ELEMENT || h && n.isTag(h);
  })), i = 0, u = e; i < u.length; i++) {
    var o = u[i];
    if (!(o.length > 0 && (0, hi.isTraversal)(o[0]) && o[0].type !== Ot.SelectorType.Descendant))
      if (a && !o.some(Ho))
        o.unshift(qf);
      else
        continue;
    o.unshift(Vf);
  }
}
function Xi(e, t, r) {
  var n;
  e.forEach(hi.default), r = (n = t.context) !== null && n !== void 0 ? n : r;
  var a = Array.isArray(r), i = r && (Array.isArray(r) ? r : [r]);
  if (t.relativeSelector !== !1)
    $f(e, t, i);
  else if (e.some(function(c) {
    return c.length > 0 && (0, hi.isTraversal)(c[0]);
  }))
    throw new Error("Relative selectors are not allowed when the `relativeSelector` option is disabled");
  var u = !1, o = e.map(function(c) {
    if (c.length >= 2) {
      var h = c[0], s = c[1];
      h.type !== Ot.SelectorType.Pseudo || h.name !== "scope" || (a && s.type === Ot.SelectorType.Descendant ? c[1] = Yf : (s.type === Ot.SelectorType.Adjacent || s.type === Ot.SelectorType.Sibling) && (u = !0));
    }
    return Wf(c, t, i);
  }).reduce(Qf, Ft.default.falseFunc);
  return o.shouldTestNextSiblings = u, o;
}
Ut.compileToken = Xi;
function Wf(e, t, r) {
  var n;
  return e.reduce(function(a, i) {
    return a === Ft.default.falseFunc ? Ft.default.falseFunc : (0, Gf.compileGeneralSelector)(a, i, t, r, Xi);
  }, (n = t.rootFunc) !== null && n !== void 0 ? n : Ft.default.trueFunc);
}
function Qf(e, t) {
  return t === Ft.default.falseFunc || e === Ft.default.trueFunc ? e : e === Ft.default.falseFunc || t === Ft.default.trueFunc ? t : function(n) {
    return e(n) || t(n);
  };
}
(function(e) {
  var t = w && w.__createBinding || (Object.create ? function(S, B, P, L) {
    L === void 0 && (L = P);
    var H = Object.getOwnPropertyDescriptor(B, P);
    (!H || ("get" in H ? !B.__esModule : H.writable || H.configurable)) && (H = { enumerable: !0, get: function() {
      return B[P];
    } }), Object.defineProperty(S, L, H);
  } : function(S, B, P, L) {
    L === void 0 && (L = P), S[L] = B[P];
  }), r = w && w.__setModuleDefault || (Object.create ? function(S, B) {
    Object.defineProperty(S, "default", { enumerable: !0, value: B });
  } : function(S, B) {
    S.default = B;
  }), n = w && w.__importStar || function(S) {
    if (S && S.__esModule)
      return S;
    var B = {};
    if (S != null)
      for (var P in S)
        P !== "default" && Object.prototype.hasOwnProperty.call(S, P) && t(B, S, P);
    return r(B, S), B;
  }, a = w && w.__importDefault || function(S) {
    return S && S.__esModule ? S : { default: S };
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.aliases = e.pseudos = e.filters = e.is = e.selectOne = e.selectAll = e.prepareContext = e._compileToken = e._compileUnsafe = e.compile = void 0;
  var i = n(ot), u = a(Jt), o = Ut, c = ca, h = function(S, B) {
    return S === B;
  }, s = {
    adapter: i,
    equals: h
  };
  function g(S) {
    var B, P, L, H, $ = S ?? s;
    return (B = $.adapter) !== null && B !== void 0 || ($.adapter = i), (P = $.equals) !== null && P !== void 0 || ($.equals = (H = (L = $.adapter) === null || L === void 0 ? void 0 : L.equals) !== null && H !== void 0 ? H : h), $;
  }
  function p(S) {
    return function(P, L, H) {
      var $ = g(L);
      return S(P, $, H);
    };
  }
  e.compile = p(o.compile), e._compileUnsafe = p(o.compileUnsafe), e._compileToken = p(o.compileToken);
  function m(S) {
    return function(P, L, H) {
      var $ = g(H);
      typeof P != "function" && (P = (0, o.compileUnsafe)(P, $, L));
      var ne = b(L, $.adapter, P.shouldTestNextSiblings);
      return S(P, ne, $);
    };
  }
  function b(S, B, P) {
    return P === void 0 && (P = !1), P && (S = R(S, B)), Array.isArray(S) ? B.removeSubsets(S) : B.getChildren(S);
  }
  e.prepareContext = b;
  function R(S, B) {
    for (var P = Array.isArray(S) ? S.slice(0) : [S], L = P.length, H = 0; H < L; H++) {
      var $ = (0, c.getNextSiblings)(P[H], B);
      P.push.apply(P, $);
    }
    return P;
  }
  e.selectAll = m(function(S, B, P) {
    return S === u.default.falseFunc || !B || B.length === 0 ? [] : P.adapter.findAll(S, B);
  }), e.selectOne = m(function(S, B, P) {
    return S === u.default.falseFunc || !B || B.length === 0 ? null : P.adapter.findOne(S, B);
  });
  function C(S, B, P) {
    var L = g(P);
    return (typeof B == "function" ? B : (0, o.compile)(B, L))(S);
  }
  e.is = C, e.default = e.selectAll;
  var D = Wi;
  Object.defineProperty(e, "filters", { enumerable: !0, get: function() {
    return D.filters;
  } }), Object.defineProperty(e, "pseudos", { enumerable: !0, get: function() {
    return D.pseudos;
  } }), Object.defineProperty(e, "aliases", { enumerable: !0, get: function() {
    return D.aliases;
  } });
})(fi);
var Cr = {}, zi = {};
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
  function t(n) {
    return n.type !== "pseudo" ? !1 : e.filterNames.has(n.name) ? !0 : n.name === "not" && Array.isArray(n.data) ? n.data.some(function(a) {
      return a.some(t);
    }) : !1;
  }
  e.isFilter = t;
  function r(n, a, i) {
    var u = a != null ? parseInt(a, 10) : NaN;
    switch (n) {
      case "first":
        return 1;
      case "nth":
      case "eq":
        return isFinite(u) ? u >= 0 ? u + 1 : 1 / 0 : 0;
      case "lt":
        return isFinite(u) ? u >= 0 ? Math.min(u, i) : 1 / 0 : 0;
      case "gt":
        return isFinite(u) ? 1 / 0 : 0;
      case "odd":
        return 2 * i;
      case "even":
        return 2 * i - 1;
      case "last":
      case "not":
        return 1 / 0;
    }
  }
  e.getLimit = r;
})(zi);
Object.defineProperty(Cr, "__esModule", { value: !0 });
Cr.groupSelectors = Cr.getDocumentRoot = void 0;
var Xf = zi;
function zf(e) {
  for (; e.parent; )
    e = e.parent;
  return e;
}
Cr.getDocumentRoot = zf;
function Kf(e) {
  for (var t = [], r = [], n = 0, a = e; n < a.length; n++) {
    var i = a[n];
    i.some(Xf.isFilter) ? t.push(i) : r.push(i);
  }
  return [r, t];
}
Cr.groupSelectors = Kf;
(function(e) {
  var t = w && w.__assign || function() {
    return t = Object.assign || function(q) {
      for (var I, O = 1, x = arguments.length; O < x; O++) {
        I = arguments[O];
        for (var M in I)
          Object.prototype.hasOwnProperty.call(I, M) && (q[M] = I[M]);
      }
      return q;
    }, t.apply(this, arguments);
  }, r = w && w.__createBinding || (Object.create ? function(q, I, O, x) {
    x === void 0 && (x = O);
    var M = Object.getOwnPropertyDescriptor(I, O);
    (!M || ("get" in M ? !I.__esModule : M.writable || M.configurable)) && (M = { enumerable: !0, get: function() {
      return I[O];
    } }), Object.defineProperty(q, x, M);
  } : function(q, I, O, x) {
    x === void 0 && (x = O), q[x] = I[O];
  }), n = w && w.__setModuleDefault || (Object.create ? function(q, I) {
    Object.defineProperty(q, "default", { enumerable: !0, value: I });
  } : function(q, I) {
    q.default = I;
  }), a = w && w.__importStar || function(q) {
    if (q && q.__esModule)
      return q;
    var I = {};
    if (q != null)
      for (var O in q)
        O !== "default" && Object.prototype.hasOwnProperty.call(q, O) && r(I, q, O);
    return n(I, q), I;
  }, i = w && w.__spreadArray || function(q, I, O) {
    if (O || arguments.length === 2)
      for (var x = 0, M = I.length, G; x < M; x++)
        (G || !(x in I)) && (G || (G = Array.prototype.slice.call(I, 0, x)), G[x] = I[x]);
    return q.concat(G || Array.prototype.slice.call(I));
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.select = e.filter = e.some = e.is = e.aliases = e.pseudos = e.filters = void 0;
  var u = dn, o = fi, c = a(ot), h = a(Jt), s = Cr, g = zi, p = fi;
  Object.defineProperty(e, "filters", { enumerable: !0, get: function() {
    return p.filters;
  } }), Object.defineProperty(e, "pseudos", { enumerable: !0, get: function() {
    return p.pseudos;
  } }), Object.defineProperty(e, "aliases", { enumerable: !0, get: function() {
    return p.aliases;
  } });
  var m = {
    type: u.SelectorType.Universal,
    namespace: null
  }, b = {
    type: u.SelectorType.Pseudo,
    name: "scope",
    data: null
  };
  function R(q, I, O) {
    return O === void 0 && (O = {}), C([q], I, O);
  }
  e.is = R;
  function C(q, I, O) {
    if (O === void 0 && (O = {}), typeof I == "function")
      return q.some(I);
    var x = (0, s.groupSelectors)((0, u.parse)(I)), M = x[0], G = x[1];
    return M.length > 0 && q.some((0, o._compileToken)(M, O)) || G.some(function(W) {
      return P(W, q, O).length > 0;
    });
  }
  e.some = C;
  function D(q, I, O, x) {
    var M = typeof O == "string" ? parseInt(O, 10) : NaN;
    switch (q) {
      case "first":
      case "lt":
        return I;
      case "last":
        return I.length > 0 ? [I[I.length - 1]] : I;
      case "nth":
      case "eq":
        return isFinite(M) && Math.abs(M) < I.length ? [M < 0 ? I[I.length + M] : I[M]] : [];
      case "gt":
        return isFinite(M) ? I.slice(M + 1) : [];
      case "even":
        return I.filter(function(W, V) {
          return V % 2 === 0;
        });
      case "odd":
        return I.filter(function(W, V) {
          return V % 2 === 1;
        });
      case "not": {
        var G = new Set(B(O, I, x));
        return I.filter(function(W) {
          return !G.has(W);
        });
      }
    }
  }
  function S(q, I, O) {
    return O === void 0 && (O = {}), B((0, u.parse)(q), I, O);
  }
  e.filter = S;
  function B(q, I, O) {
    if (I.length === 0)
      return [];
    var x = (0, s.groupSelectors)(q), M = x[0], G = x[1], W;
    if (M.length) {
      var V = oe(I, M, O);
      if (G.length === 0)
        return V;
      V.length && (W = new Set(V));
    }
    for (var Q = 0; Q < G.length && (W == null ? void 0 : W.size) !== I.length; Q++) {
      var z = G[Q], J = W ? I.filter(function(Ae) {
        return c.isTag(Ae) && !W.has(Ae);
      }) : I;
      if (J.length === 0)
        break;
      var V = P(z, I, O);
      if (V.length)
        if (W)
          V.forEach(function(Ae) {
            return W.add(Ae);
          });
        else {
          if (Q === G.length - 1)
            return V;
          W = new Set(V);
        }
    }
    return typeof W < "u" ? W.size === I.length ? I : (
      // Filter elements to preserve order
      I.filter(function(Be) {
        return W.has(Be);
      })
    ) : [];
  }
  function P(q, I, O) {
    var x;
    if (q.some(u.isTraversal)) {
      var M = (x = O.root) !== null && x !== void 0 ? x : (0, s.getDocumentRoot)(I[0]), G = t(t({}, O), { context: I, relativeSelector: !1 });
      return q.push(b), H(M, q, G, !0, I.length);
    }
    return H(I, q, O, !1, I.length);
  }
  function L(q, I, O, x) {
    if (O === void 0 && (O = {}), x === void 0 && (x = 1 / 0), typeof q == "function")
      return ne(I, q);
    var M = (0, s.groupSelectors)((0, u.parse)(q)), G = M[0], W = M[1], V = W.map(function(Q) {
      return H(I, Q, O, !0, x);
    });
    return G.length && V.push($(I, G, O, x)), V.length === 0 ? [] : V.length === 1 ? V[0] : c.uniqueSort(V.reduce(function(Q, z) {
      return i(i([], Q, !0), z, !0);
    }));
  }
  e.select = L;
  function H(q, I, O, x, M) {
    var G = I.findIndex(g.isFilter), W = I.slice(0, G), V = I[G], Q = I.length - 1 === G ? M : 1 / 0, z = (0, g.getLimit)(V.name, V.data, Q);
    if (z === 0)
      return [];
    var J = W.length === 0 && !Array.isArray(q) ? c.getChildren(q).filter(c.isTag) : W.length === 0 ? (Array.isArray(q) ? q : [q]).filter(c.isTag) : x || W.some(u.isTraversal) ? $(q, [W], O, z) : oe(q, [W], O), Be = J.slice(0, z), Ae = D(V.name, Be, V.data, O);
    if (Ae.length === 0 || I.length === G + 1)
      return Ae;
    var re = I.slice(G + 1), ee = re.some(u.isTraversal);
    if (ee) {
      if ((0, u.isTraversal)(re[0])) {
        var le = re[0].type;
        (le === u.SelectorType.Sibling || le === u.SelectorType.Adjacent) && (Ae = (0, o.prepareContext)(Ae, c, !0)), re.unshift(m);
      }
      O = t(t({}, O), {
        // Avoid absolutizing the selector
        relativeSelector: !1,
        /*
         * Add a custom root func, to make sure traversals don't match elements
         * that aren't a part of the considered tree.
         */
        rootFunc: function(K) {
          return Ae.includes(K);
        }
      });
    } else
      O.rootFunc && O.rootFunc !== h.trueFunc && (O = t(t({}, O), { rootFunc: h.trueFunc }));
    return re.some(g.isFilter) ? H(Ae, re, O, !1, M) : ee ? (
      // Query existing elements to resolve traversal.
      $(Ae, [re], O, M)
    ) : (
      // If we don't have any more traversals, simply filter elements.
      oe(Ae, [re], O)
    );
  }
  function $(q, I, O, x) {
    var M = (0, o._compileToken)(I, O, q);
    return ne(q, M, x);
  }
  function ne(q, I, O) {
    O === void 0 && (O = 1 / 0);
    var x = (0, o.prepareContext)(q, c, I.shouldTestNextSiblings);
    return c.find(function(M) {
      return c.isTag(M) && I(M);
    }, x, !0, O);
  }
  function oe(q, I, O) {
    var x = (Array.isArray(q) ? q : [q]).filter(c.isTag);
    if (x.length === 0)
      return x;
    var M = (0, o._compileToken)(I, O);
    return M === h.trueFunc ? x : x.filter(M);
  }
})(Do);
var Zf = w && w.__createBinding || (Object.create ? function(e, t, r, n) {
  n === void 0 && (n = r);
  var a = Object.getOwnPropertyDescriptor(t, r);
  (!a || ("get" in a ? !t.__esModule : a.writable || a.configurable)) && (a = { enumerable: !0, get: function() {
    return t[r];
  } }), Object.defineProperty(e, n, a);
} : function(e, t, r, n) {
  n === void 0 && (n = r), e[n] = t[r];
}), Jf = w && w.__setModuleDefault || (Object.create ? function(e, t) {
  Object.defineProperty(e, "default", { enumerable: !0, value: t });
} : function(e, t) {
  e.default = t;
}), ed = w && w.__importStar || function(e) {
  if (e && e.__esModule)
    return e;
  var t = {};
  if (e != null)
    for (var r in e)
      r !== "default" && Object.prototype.hasOwnProperty.call(e, r) && Zf(t, e, r);
  return Jf(t, e), t;
}, pi = w && w.__spreadArray || function(e, t, r) {
  if (r || arguments.length === 2)
    for (var n = 0, a = t.length, i; n < a; n++)
      (i || !(n in t)) && (i || (i = Array.prototype.slice.call(t, 0, n)), i[n] = t[n]);
  return e.concat(i || Array.prototype.slice.call(t));
};
Object.defineProperty(X, "__esModule", { value: !0 });
X.addBack = X.add = X.end = X.slice = X.index = X.toArray = X.get = X.eq = X.last = X.first = X.has = X.not = X.is = X.filterArray = X.filter = X.map = X.each = X.contents = X.children = X.siblings = X.prevUntil = X.prevAll = X.prev = X.nextUntil = X.nextAll = X.next = X.closest = X.parentsUntil = X.parents = X.parent = X.find = void 0;
var la = He, Mr = ed(Do), ct = Zt, td = Oe, At = ot, rd = /^\s*[~+]/;
function nd(e) {
  var t;
  if (!e)
    return this._make([]);
  var r = this.toArray();
  if (typeof e != "string") {
    var n = (0, ct.isCheerio)(e) ? e.toArray() : [e];
    return this._make(n.filter(function(u) {
      return r.some(function(o) {
        return (0, td.contains)(o, u);
      });
    }));
  }
  var a = rd.test(e) ? r : this.children().toArray(), i = {
    context: r,
    root: (t = this._root) === null || t === void 0 ? void 0 : t[0],
    // Pass options that are recognized by `cheerio-select`
    xmlMode: this.options.xmlMode,
    lowerCaseTags: this.options.lowerCaseTags,
    lowerCaseAttributeNames: this.options.lowerCaseAttributeNames,
    pseudos: this.options.pseudos,
    quirksMode: this.options.quirksMode
  };
  return this._make(Mr.select(e, a, i));
}
X.find = nd;
function Ki(e) {
  return function(t) {
    for (var r = [], n = 1; n < arguments.length; n++)
      r[n - 1] = arguments[n];
    return function(a) {
      var i, u = e(t, this);
      return a && (u = eu(u, a, this.options.xmlMode, (i = this._root) === null || i === void 0 ? void 0 : i[0])), this._make(
        // Post processing is only necessary if there is more than one element.
        this.length > 1 && u.length > 1 ? r.reduce(function(o, c) {
          return c(o);
        }, u) : u
      );
    };
  };
}
var hn = Ki(function(e, t) {
  for (var r, n = [], a = 0; a < t.length; a++) {
    var i = e(t[a]);
    n.push(i);
  }
  return (r = new Array()).concat.apply(r, n);
}), Zi = Ki(function(e, t) {
  for (var r = [], n = 0; n < t.length; n++) {
    var a = e(t[n]);
    a !== null && r.push(a);
  }
  return r;
});
function Ji(e) {
  for (var t = [], r = 1; r < arguments.length; r++)
    t[r - 1] = arguments[r];
  var n = null, a = Ki(function(i, u) {
    var o = [];
    return (0, ct.domEach)(u, function(c) {
      for (var h; (h = i(c)) && !(n != null && n(h, o.length)); c = h)
        o.push(h);
    }), o;
  }).apply(void 0, pi([e], t, !1));
  return function(i, u) {
    var o = this;
    n = typeof i == "string" ? function(h) {
      return Mr.is(h, i, o.options);
    } : i ? pn(i) : null;
    var c = a.call(this, u);
    return n = null, c;
  };
}
function Br(e) {
  return Array.from(new Set(e));
}
X.parent = Zi(function(e) {
  var t = e.parent;
  return t && !(0, la.isDocument)(t) ? t : null;
}, Br);
X.parents = hn(function(e) {
  for (var t = []; e.parent && !(0, la.isDocument)(e.parent); )
    t.push(e.parent), e = e.parent;
  return t;
}, At.uniqueSort, function(e) {
  return e.reverse();
});
X.parentsUntil = Ji(function(e) {
  var t = e.parent;
  return t && !(0, la.isDocument)(t) ? t : null;
}, At.uniqueSort, function(e) {
  return e.reverse();
});
function ad(e) {
  var t, r = [];
  if (!e)
    return this._make(r);
  var n = {
    xmlMode: this.options.xmlMode,
    root: (t = this._root) === null || t === void 0 ? void 0 : t[0]
  }, a = typeof e == "string" ? function(i) {
    return Mr.is(i, e, n);
  } : pn(e);
  return (0, ct.domEach)(this, function(i) {
    for (; i && (0, ct.isTag)(i); ) {
      if (a(i, 0)) {
        r.includes(i) || r.push(i);
        break;
      }
      i = i.parent;
    }
  }), this._make(r);
}
X.closest = ad;
X.next = Zi(function(e) {
  return (0, At.nextElementSibling)(e);
});
X.nextAll = hn(function(e) {
  for (var t = []; e.next; )
    e = e.next, (0, ct.isTag)(e) && t.push(e);
  return t;
}, Br);
X.nextUntil = Ji(function(e) {
  return (0, At.nextElementSibling)(e);
}, Br);
X.prev = Zi(function(e) {
  return (0, At.prevElementSibling)(e);
});
X.prevAll = hn(function(e) {
  for (var t = []; e.prev; )
    e = e.prev, (0, ct.isTag)(e) && t.push(e);
  return t;
}, Br);
X.prevUntil = Ji(function(e) {
  return (0, At.prevElementSibling)(e);
}, Br);
X.siblings = hn(function(e) {
  return (0, At.getSiblings)(e).filter(function(t) {
    return (0, ct.isTag)(t) && t !== e;
  });
}, At.uniqueSort);
X.children = hn(function(e) {
  return (0, At.getChildren)(e).filter(ct.isTag);
}, Br);
function id() {
  var e = this.toArray().reduce(function(t, r) {
    return (0, la.hasChildren)(r) ? t.concat(r.children) : t;
  }, []);
  return this._make(e);
}
X.contents = id;
function ud(e) {
  for (var t = 0, r = this.length; t < r && e.call(this[t], t, this[t]) !== !1; )
    ++t;
  return this;
}
X.each = ud;
function sd(e) {
  for (var t = [], r = 0; r < this.length; r++) {
    var n = this[r], a = e.call(n, r, n);
    a != null && (t = t.concat(a));
  }
  return this._make(t);
}
X.map = sd;
function pn(e) {
  return typeof e == "function" ? function(t, r) {
    return e.call(t, r, t);
  } : (0, ct.isCheerio)(e) ? function(t) {
    return Array.prototype.includes.call(e, t);
  } : function(t) {
    return e === t;
  };
}
function od(e) {
  var t;
  return this._make(eu(this.toArray(), e, this.options.xmlMode, (t = this._root) === null || t === void 0 ? void 0 : t[0]));
}
X.filter = od;
function eu(e, t, r, n) {
  return typeof t == "string" ? Mr.filter(t, e, { xmlMode: r, root: n }) : e.filter(pn(t));
}
X.filterArray = eu;
function cd(e) {
  var t = this.toArray();
  return typeof e == "string" ? Mr.some(t.filter(ct.isTag), e, this.options) : e ? t.some(pn(e)) : !1;
}
X.is = cd;
function ld(e) {
  var t = this.toArray();
  if (typeof e == "string") {
    var r = new Set(Mr.filter(e, t, this.options));
    t = t.filter(function(a) {
      return !r.has(a);
    });
  } else {
    var n = pn(e);
    t = t.filter(function(a, i) {
      return !n(a, i);
    });
  }
  return this._make(t);
}
X.not = ld;
function fd(e) {
  var t = this;
  return this.filter(typeof e == "string" ? (
    // Using the `:has` selector here short-circuits searches.
    ":has(".concat(e, ")")
  ) : function(r, n) {
    return t._make(n).find(e).length > 0;
  });
}
X.has = fd;
function dd() {
  return this.length > 1 ? this._make(this[0]) : this;
}
X.first = dd;
function hd() {
  return this.length > 0 ? this._make(this[this.length - 1]) : this;
}
X.last = hd;
function pd(e) {
  var t;
  return e = +e, e === 0 && this.length <= 1 ? this : (e < 0 && (e = this.length + e), this._make((t = this[e]) !== null && t !== void 0 ? t : []));
}
X.eq = pd;
function md(e) {
  return e == null ? this.toArray() : this[e < 0 ? this.length + e : e];
}
X.get = md;
function Ed() {
  return Array.prototype.slice.call(this);
}
X.toArray = Ed;
function Td(e) {
  var t, r;
  return e == null ? (t = this.parent().children(), r = this[0]) : typeof e == "string" ? (t = this._make(e), r = this[0]) : (t = this, r = (0, ct.isCheerio)(e) ? e[0] : e), Array.prototype.indexOf.call(t, r);
}
X.index = Td;
function gd(e, t) {
  return this._make(Array.prototype.slice.call(this, e, t));
}
X.slice = gd;
function _d() {
  var e;
  return (e = this.prevObject) !== null && e !== void 0 ? e : this._make([]);
}
X.end = _d;
function bd(e, t) {
  var r = this._make(e, t), n = (0, At.uniqueSort)(pi(pi([], this.get(), !0), r.get(), !0));
  return this._make(n);
}
X.add = bd;
function Ad(e) {
  return this.prevObject ? this.add(e ? this.prevObject.filter(e) : this.prevObject) : this;
}
X.addBack = Ad;
var ie = {}, Go = {}, fa = {};
fa.byteLength = Cd;
fa.toByteArray = Dd;
fa.fromByteArray = vd;
var gt = [], it = [], Id = typeof Uint8Array < "u" ? Uint8Array : Array, Ma = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var ar = 0, yd = Ma.length; ar < yd; ++ar)
  gt[ar] = Ma[ar], it[Ma.charCodeAt(ar)] = ar;
it[45] = 62;
it[95] = 63;
function jo(e) {
  var t = e.length;
  if (t % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  var r = e.indexOf("=");
  r === -1 && (r = t);
  var n = r === t ? 0 : 4 - r % 4;
  return [r, n];
}
function Cd(e) {
  var t = jo(e), r = t[0], n = t[1];
  return (r + n) * 3 / 4 - n;
}
function Nd(e, t, r) {
  return (t + r) * 3 / 4 - r;
}
function Dd(e) {
  var t, r = jo(e), n = r[0], a = r[1], i = new Id(Nd(e, n, a)), u = 0, o = a > 0 ? n - 4 : n, c;
  for (c = 0; c < o; c += 4)
    t = it[e.charCodeAt(c)] << 18 | it[e.charCodeAt(c + 1)] << 12 | it[e.charCodeAt(c + 2)] << 6 | it[e.charCodeAt(c + 3)], i[u++] = t >> 16 & 255, i[u++] = t >> 8 & 255, i[u++] = t & 255;
  return a === 2 && (t = it[e.charCodeAt(c)] << 2 | it[e.charCodeAt(c + 1)] >> 4, i[u++] = t & 255), a === 1 && (t = it[e.charCodeAt(c)] << 10 | it[e.charCodeAt(c + 1)] << 4 | it[e.charCodeAt(c + 2)] >> 2, i[u++] = t >> 8 & 255, i[u++] = t & 255), i;
}
function Sd(e) {
  return gt[e >> 18 & 63] + gt[e >> 12 & 63] + gt[e >> 6 & 63] + gt[e & 63];
}
function Od(e, t, r) {
  for (var n, a = [], i = t; i < r; i += 3)
    n = (e[i] << 16 & 16711680) + (e[i + 1] << 8 & 65280) + (e[i + 2] & 255), a.push(Sd(n));
  return a.join("");
}
function vd(e) {
  for (var t, r = e.length, n = r % 3, a = [], i = 16383, u = 0, o = r - n; u < o; u += i)
    a.push(Od(e, u, u + i > o ? o : u + i));
  return n === 1 ? (t = e[r - 1], a.push(
    gt[t >> 2] + gt[t << 4 & 63] + "=="
  )) : n === 2 && (t = (e[r - 2] << 8) + e[r - 1], a.push(
    gt[t >> 10] + gt[t >> 4 & 63] + gt[t << 2 & 63] + "="
  )), a.join("");
}
var tu = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
tu.read = function(e, t, r, n, a) {
  var i, u, o = a * 8 - n - 1, c = (1 << o) - 1, h = c >> 1, s = -7, g = r ? a - 1 : 0, p = r ? -1 : 1, m = e[t + g];
  for (g += p, i = m & (1 << -s) - 1, m >>= -s, s += o; s > 0; i = i * 256 + e[t + g], g += p, s -= 8)
    ;
  for (u = i & (1 << -s) - 1, i >>= -s, s += n; s > 0; u = u * 256 + e[t + g], g += p, s -= 8)
    ;
  if (i === 0)
    i = 1 - h;
  else {
    if (i === c)
      return u ? NaN : (m ? -1 : 1) * (1 / 0);
    u = u + Math.pow(2, n), i = i - h;
  }
  return (m ? -1 : 1) * u * Math.pow(2, i - n);
};
tu.write = function(e, t, r, n, a, i) {
  var u, o, c, h = i * 8 - a - 1, s = (1 << h) - 1, g = s >> 1, p = a === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, m = n ? 0 : i - 1, b = n ? 1 : -1, R = t < 0 || t === 0 && 1 / t < 0 ? 1 : 0;
  for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (o = isNaN(t) ? 1 : 0, u = s) : (u = Math.floor(Math.log(t) / Math.LN2), t * (c = Math.pow(2, -u)) < 1 && (u--, c *= 2), u + g >= 1 ? t += p / c : t += p * Math.pow(2, 1 - g), t * c >= 2 && (u++, c /= 2), u + g >= s ? (o = 0, u = s) : u + g >= 1 ? (o = (t * c - 1) * Math.pow(2, a), u = u + g) : (o = t * Math.pow(2, g - 1) * Math.pow(2, a), u = 0)); a >= 8; e[r + m] = o & 255, m += b, o /= 256, a -= 8)
    ;
  for (u = u << a | o, h += a; h > 0; e[r + m] = u & 255, m += b, u /= 256, h -= 8)
    ;
  e[r + m - b] |= R * 128;
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
(function(e) {
  const t = fa, r = tu, n = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  e.Buffer = s, e.SlowBuffer = L, e.INSPECT_MAX_BYTES = 50;
  const a = 2147483647;
  e.kMaxLength = a;
  const { Uint8Array: i, ArrayBuffer: u, SharedArrayBuffer: o } = globalThis;
  s.TYPED_ARRAY_SUPPORT = c(), !s.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error(
    "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
  );
  function c() {
    try {
      const E = new i(1), f = { foo: function() {
        return 42;
      } };
      return Object.setPrototypeOf(f, i.prototype), Object.setPrototypeOf(E, f), E.foo() === 42;
    } catch {
      return !1;
    }
  }
  Object.defineProperty(s.prototype, "parent", {
    enumerable: !0,
    get: function() {
      if (s.isBuffer(this))
        return this.buffer;
    }
  }), Object.defineProperty(s.prototype, "offset", {
    enumerable: !0,
    get: function() {
      if (s.isBuffer(this))
        return this.byteOffset;
    }
  });
  function h(E) {
    if (E > a)
      throw new RangeError('The value "' + E + '" is invalid for option "size"');
    const f = new i(E);
    return Object.setPrototypeOf(f, s.prototype), f;
  }
  function s(E, f, d) {
    if (typeof E == "number") {
      if (typeof f == "string")
        throw new TypeError(
          'The "string" argument must be of type string. Received type number'
        );
      return b(E);
    }
    return g(E, f, d);
  }
  s.poolSize = 8192;
  function g(E, f, d) {
    if (typeof E == "string")
      return R(E, f);
    if (u.isView(E))
      return D(E);
    if (E == null)
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof E
      );
    if (Ze(E, u) || E && Ze(E.buffer, u) || typeof o < "u" && (Ze(E, o) || E && Ze(E.buffer, o)))
      return S(E, f, d);
    if (typeof E == "number")
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number'
      );
    const A = E.valueOf && E.valueOf();
    if (A != null && A !== E)
      return s.from(A, f, d);
    const N = B(E);
    if (N)
      return N;
    if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof E[Symbol.toPrimitive] == "function")
      return s.from(E[Symbol.toPrimitive]("string"), f, d);
    throw new TypeError(
      "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof E
    );
  }
  s.from = function(E, f, d) {
    return g(E, f, d);
  }, Object.setPrototypeOf(s.prototype, i.prototype), Object.setPrototypeOf(s, i);
  function p(E) {
    if (typeof E != "number")
      throw new TypeError('"size" argument must be of type number');
    if (E < 0)
      throw new RangeError('The value "' + E + '" is invalid for option "size"');
  }
  function m(E, f, d) {
    return p(E), E <= 0 ? h(E) : f !== void 0 ? typeof d == "string" ? h(E).fill(f, d) : h(E).fill(f) : h(E);
  }
  s.alloc = function(E, f, d) {
    return m(E, f, d);
  };
  function b(E) {
    return p(E), h(E < 0 ? 0 : P(E) | 0);
  }
  s.allocUnsafe = function(E) {
    return b(E);
  }, s.allocUnsafeSlow = function(E) {
    return b(E);
  };
  function R(E, f) {
    if ((typeof f != "string" || f === "") && (f = "utf8"), !s.isEncoding(f))
      throw new TypeError("Unknown encoding: " + f);
    const d = H(E, f) | 0;
    let A = h(d);
    const N = A.write(E, f);
    return N !== d && (A = A.slice(0, N)), A;
  }
  function C(E) {
    const f = E.length < 0 ? 0 : P(E.length) | 0, d = h(f);
    for (let A = 0; A < f; A += 1)
      d[A] = E[A] & 255;
    return d;
  }
  function D(E) {
    if (Ze(E, i)) {
      const f = new i(E);
      return S(f.buffer, f.byteOffset, f.byteLength);
    }
    return C(E);
  }
  function S(E, f, d) {
    if (f < 0 || E.byteLength < f)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (E.byteLength < f + (d || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    let A;
    return f === void 0 && d === void 0 ? A = new i(E) : d === void 0 ? A = new i(E, f) : A = new i(E, f, d), Object.setPrototypeOf(A, s.prototype), A;
  }
  function B(E) {
    if (s.isBuffer(E)) {
      const f = P(E.length) | 0, d = h(f);
      return d.length === 0 || E.copy(d, 0, 0, f), d;
    }
    if (E.length !== void 0)
      return typeof E.length != "number" || wt(E.length) ? h(0) : C(E);
    if (E.type === "Buffer" && Array.isArray(E.data))
      return C(E.data);
  }
  function P(E) {
    if (E >= a)
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + a.toString(16) + " bytes");
    return E | 0;
  }
  function L(E) {
    return +E != E && (E = 0), s.alloc(+E);
  }
  s.isBuffer = function(f) {
    return f != null && f._isBuffer === !0 && f !== s.prototype;
  }, s.compare = function(f, d) {
    if (Ze(f, i) && (f = s.from(f, f.offset, f.byteLength)), Ze(d, i) && (d = s.from(d, d.offset, d.byteLength)), !s.isBuffer(f) || !s.isBuffer(d))
      throw new TypeError(
        'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
      );
    if (f === d)
      return 0;
    let A = f.length, N = d.length;
    for (let v = 0, k = Math.min(A, N); v < k; ++v)
      if (f[v] !== d[v]) {
        A = f[v], N = d[v];
        break;
      }
    return A < N ? -1 : N < A ? 1 : 0;
  }, s.isEncoding = function(f) {
    switch (String(f).toLowerCase()) {
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
  }, s.concat = function(f, d) {
    if (!Array.isArray(f))
      throw new TypeError('"list" argument must be an Array of Buffers');
    if (f.length === 0)
      return s.alloc(0);
    let A;
    if (d === void 0)
      for (d = 0, A = 0; A < f.length; ++A)
        d += f[A].length;
    const N = s.allocUnsafe(d);
    let v = 0;
    for (A = 0; A < f.length; ++A) {
      let k = f[A];
      if (Ze(k, i))
        v + k.length > N.length ? (s.isBuffer(k) || (k = s.from(k)), k.copy(N, v)) : i.prototype.set.call(
          N,
          k,
          v
        );
      else if (s.isBuffer(k))
        k.copy(N, v);
      else
        throw new TypeError('"list" argument must be an Array of Buffers');
      v += k.length;
    }
    return N;
  };
  function H(E, f) {
    if (s.isBuffer(E))
      return E.length;
    if (u.isView(E) || Ze(E, u))
      return E.byteLength;
    if (typeof E != "string")
      throw new TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof E
      );
    const d = E.length, A = arguments.length > 2 && arguments[2] === !0;
    if (!A && d === 0)
      return 0;
    let N = !1;
    for (; ; )
      switch (f) {
        case "ascii":
        case "latin1":
        case "binary":
          return d;
        case "utf8":
        case "utf-8":
          return We(E).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return d * 2;
        case "hex":
          return d >>> 1;
        case "base64":
          return Fr(E).length;
        default:
          if (N)
            return A ? -1 : We(E).length;
          f = ("" + f).toLowerCase(), N = !0;
      }
  }
  s.byteLength = H;
  function $(E, f, d) {
    let A = !1;
    if ((f === void 0 || f < 0) && (f = 0), f > this.length || ((d === void 0 || d > this.length) && (d = this.length), d <= 0) || (d >>>= 0, f >>>= 0, d <= f))
      return "";
    for (E || (E = "utf8"); ; )
      switch (E) {
        case "hex":
          return Ae(this, f, d);
        case "utf8":
        case "utf-8":
          return V(this, f, d);
        case "ascii":
          return J(this, f, d);
        case "latin1":
        case "binary":
          return Be(this, f, d);
        case "base64":
          return W(this, f, d);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return re(this, f, d);
        default:
          if (A)
            throw new TypeError("Unknown encoding: " + E);
          E = (E + "").toLowerCase(), A = !0;
      }
  }
  s.prototype._isBuffer = !0;
  function ne(E, f, d) {
    const A = E[f];
    E[f] = E[d], E[d] = A;
  }
  s.prototype.swap16 = function() {
    const f = this.length;
    if (f % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (let d = 0; d < f; d += 2)
      ne(this, d, d + 1);
    return this;
  }, s.prototype.swap32 = function() {
    const f = this.length;
    if (f % 4 !== 0)
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (let d = 0; d < f; d += 4)
      ne(this, d, d + 3), ne(this, d + 1, d + 2);
    return this;
  }, s.prototype.swap64 = function() {
    const f = this.length;
    if (f % 8 !== 0)
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (let d = 0; d < f; d += 8)
      ne(this, d, d + 7), ne(this, d + 1, d + 6), ne(this, d + 2, d + 5), ne(this, d + 3, d + 4);
    return this;
  }, s.prototype.toString = function() {
    const f = this.length;
    return f === 0 ? "" : arguments.length === 0 ? V(this, 0, f) : $.apply(this, arguments);
  }, s.prototype.toLocaleString = s.prototype.toString, s.prototype.equals = function(f) {
    if (!s.isBuffer(f))
      throw new TypeError("Argument must be a Buffer");
    return this === f ? !0 : s.compare(this, f) === 0;
  }, s.prototype.inspect = function() {
    let f = "";
    const d = e.INSPECT_MAX_BYTES;
    return f = this.toString("hex", 0, d).replace(/(.{2})/g, "$1 ").trim(), this.length > d && (f += " ... "), "<Buffer " + f + ">";
  }, n && (s.prototype[n] = s.prototype.inspect), s.prototype.compare = function(f, d, A, N, v) {
    if (Ze(f, i) && (f = s.from(f, f.offset, f.byteLength)), !s.isBuffer(f))
      throw new TypeError(
        'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof f
      );
    if (d === void 0 && (d = 0), A === void 0 && (A = f ? f.length : 0), N === void 0 && (N = 0), v === void 0 && (v = this.length), d < 0 || A > f.length || N < 0 || v > this.length)
      throw new RangeError("out of range index");
    if (N >= v && d >= A)
      return 0;
    if (N >= v)
      return -1;
    if (d >= A)
      return 1;
    if (d >>>= 0, A >>>= 0, N >>>= 0, v >>>= 0, this === f)
      return 0;
    let k = v - N, te = A - d;
    const Te = Math.min(k, te), ge = this.slice(N, v), fe = f.slice(d, A);
    for (let de = 0; de < Te; ++de)
      if (ge[de] !== fe[de]) {
        k = ge[de], te = fe[de];
        break;
      }
    return k < te ? -1 : te < k ? 1 : 0;
  };
  function oe(E, f, d, A, N) {
    if (E.length === 0)
      return -1;
    if (typeof d == "string" ? (A = d, d = 0) : d > 2147483647 ? d = 2147483647 : d < -2147483648 && (d = -2147483648), d = +d, wt(d) && (d = N ? 0 : E.length - 1), d < 0 && (d = E.length + d), d >= E.length) {
      if (N)
        return -1;
      d = E.length - 1;
    } else if (d < 0)
      if (N)
        d = 0;
      else
        return -1;
    if (typeof f == "string" && (f = s.from(f, A)), s.isBuffer(f))
      return f.length === 0 ? -1 : q(E, f, d, A, N);
    if (typeof f == "number")
      return f = f & 255, typeof i.prototype.indexOf == "function" ? N ? i.prototype.indexOf.call(E, f, d) : i.prototype.lastIndexOf.call(E, f, d) : q(E, [f], d, A, N);
    throw new TypeError("val must be string, number or Buffer");
  }
  function q(E, f, d, A, N) {
    let v = 1, k = E.length, te = f.length;
    if (A !== void 0 && (A = String(A).toLowerCase(), A === "ucs2" || A === "ucs-2" || A === "utf16le" || A === "utf-16le")) {
      if (E.length < 2 || f.length < 2)
        return -1;
      v = 2, k /= 2, te /= 2, d /= 2;
    }
    function Te(fe, de) {
      return v === 1 ? fe[de] : fe.readUInt16BE(de * v);
    }
    let ge;
    if (N) {
      let fe = -1;
      for (ge = d; ge < k; ge++)
        if (Te(E, ge) === Te(f, fe === -1 ? 0 : ge - fe)) {
          if (fe === -1 && (fe = ge), ge - fe + 1 === te)
            return fe * v;
        } else
          fe !== -1 && (ge -= ge - fe), fe = -1;
    } else
      for (d + te > k && (d = k - te), ge = d; ge >= 0; ge--) {
        let fe = !0;
        for (let de = 0; de < te; de++)
          if (Te(E, ge + de) !== Te(f, de)) {
            fe = !1;
            break;
          }
        if (fe)
          return ge;
      }
    return -1;
  }
  s.prototype.includes = function(f, d, A) {
    return this.indexOf(f, d, A) !== -1;
  }, s.prototype.indexOf = function(f, d, A) {
    return oe(this, f, d, A, !0);
  }, s.prototype.lastIndexOf = function(f, d, A) {
    return oe(this, f, d, A, !1);
  };
  function I(E, f, d, A) {
    d = Number(d) || 0;
    const N = E.length - d;
    A ? (A = Number(A), A > N && (A = N)) : A = N;
    const v = f.length;
    A > v / 2 && (A = v / 2);
    let k;
    for (k = 0; k < A; ++k) {
      const te = parseInt(f.substr(k * 2, 2), 16);
      if (wt(te))
        return k;
      E[d + k] = te;
    }
    return k;
  }
  function O(E, f, d, A) {
    return dt(We(f, E.length - d), E, d, A);
  }
  function x(E, f, d, A) {
    return dt(Da(f), E, d, A);
  }
  function M(E, f, d, A) {
    return dt(Fr(f), E, d, A);
  }
  function G(E, f, d, A) {
    return dt(Sa(f, E.length - d), E, d, A);
  }
  s.prototype.write = function(f, d, A, N) {
    if (d === void 0)
      N = "utf8", A = this.length, d = 0;
    else if (A === void 0 && typeof d == "string")
      N = d, A = this.length, d = 0;
    else if (isFinite(d))
      d = d >>> 0, isFinite(A) ? (A = A >>> 0, N === void 0 && (N = "utf8")) : (N = A, A = void 0);
    else
      throw new Error(
        "Buffer.write(string, encoding, offset[, length]) is no longer supported"
      );
    const v = this.length - d;
    if ((A === void 0 || A > v) && (A = v), f.length > 0 && (A < 0 || d < 0) || d > this.length)
      throw new RangeError("Attempt to write outside buffer bounds");
    N || (N = "utf8");
    let k = !1;
    for (; ; )
      switch (N) {
        case "hex":
          return I(this, f, d, A);
        case "utf8":
        case "utf-8":
          return O(this, f, d, A);
        case "ascii":
        case "latin1":
        case "binary":
          return x(this, f, d, A);
        case "base64":
          return M(this, f, d, A);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return G(this, f, d, A);
        default:
          if (k)
            throw new TypeError("Unknown encoding: " + N);
          N = ("" + N).toLowerCase(), k = !0;
      }
  }, s.prototype.toJSON = function() {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  function W(E, f, d) {
    return f === 0 && d === E.length ? t.fromByteArray(E) : t.fromByteArray(E.slice(f, d));
  }
  function V(E, f, d) {
    d = Math.min(E.length, d);
    const A = [];
    let N = f;
    for (; N < d; ) {
      const v = E[N];
      let k = null, te = v > 239 ? 4 : v > 223 ? 3 : v > 191 ? 2 : 1;
      if (N + te <= d) {
        let Te, ge, fe, de;
        switch (te) {
          case 1:
            v < 128 && (k = v);
            break;
          case 2:
            Te = E[N + 1], (Te & 192) === 128 && (de = (v & 31) << 6 | Te & 63, de > 127 && (k = de));
            break;
          case 3:
            Te = E[N + 1], ge = E[N + 2], (Te & 192) === 128 && (ge & 192) === 128 && (de = (v & 15) << 12 | (Te & 63) << 6 | ge & 63, de > 2047 && (de < 55296 || de > 57343) && (k = de));
            break;
          case 4:
            Te = E[N + 1], ge = E[N + 2], fe = E[N + 3], (Te & 192) === 128 && (ge & 192) === 128 && (fe & 192) === 128 && (de = (v & 15) << 18 | (Te & 63) << 12 | (ge & 63) << 6 | fe & 63, de > 65535 && de < 1114112 && (k = de));
        }
      }
      k === null ? (k = 65533, te = 1) : k > 65535 && (k -= 65536, A.push(k >>> 10 & 1023 | 55296), k = 56320 | k & 1023), A.push(k), N += te;
    }
    return z(A);
  }
  const Q = 4096;
  function z(E) {
    const f = E.length;
    if (f <= Q)
      return String.fromCharCode.apply(String, E);
    let d = "", A = 0;
    for (; A < f; )
      d += String.fromCharCode.apply(
        String,
        E.slice(A, A += Q)
      );
    return d;
  }
  function J(E, f, d) {
    let A = "";
    d = Math.min(E.length, d);
    for (let N = f; N < d; ++N)
      A += String.fromCharCode(E[N] & 127);
    return A;
  }
  function Be(E, f, d) {
    let A = "";
    d = Math.min(E.length, d);
    for (let N = f; N < d; ++N)
      A += String.fromCharCode(E[N]);
    return A;
  }
  function Ae(E, f, d) {
    const A = E.length;
    (!f || f < 0) && (f = 0), (!d || d < 0 || d > A) && (d = A);
    let N = "";
    for (let v = f; v < d; ++v)
      N += Y[E[v]];
    return N;
  }
  function re(E, f, d) {
    const A = E.slice(f, d);
    let N = "";
    for (let v = 0; v < A.length - 1; v += 2)
      N += String.fromCharCode(A[v] + A[v + 1] * 256);
    return N;
  }
  s.prototype.slice = function(f, d) {
    const A = this.length;
    f = ~~f, d = d === void 0 ? A : ~~d, f < 0 ? (f += A, f < 0 && (f = 0)) : f > A && (f = A), d < 0 ? (d += A, d < 0 && (d = 0)) : d > A && (d = A), d < f && (d = f);
    const N = this.subarray(f, d);
    return Object.setPrototypeOf(N, s.prototype), N;
  };
  function ee(E, f, d) {
    if (E % 1 !== 0 || E < 0)
      throw new RangeError("offset is not uint");
    if (E + f > d)
      throw new RangeError("Trying to access beyond buffer length");
  }
  s.prototype.readUintLE = s.prototype.readUIntLE = function(f, d, A) {
    f = f >>> 0, d = d >>> 0, A || ee(f, d, this.length);
    let N = this[f], v = 1, k = 0;
    for (; ++k < d && (v *= 256); )
      N += this[f + k] * v;
    return N;
  }, s.prototype.readUintBE = s.prototype.readUIntBE = function(f, d, A) {
    f = f >>> 0, d = d >>> 0, A || ee(f, d, this.length);
    let N = this[f + --d], v = 1;
    for (; d > 0 && (v *= 256); )
      N += this[f + --d] * v;
    return N;
  }, s.prototype.readUint8 = s.prototype.readUInt8 = function(f, d) {
    return f = f >>> 0, d || ee(f, 1, this.length), this[f];
  }, s.prototype.readUint16LE = s.prototype.readUInt16LE = function(f, d) {
    return f = f >>> 0, d || ee(f, 2, this.length), this[f] | this[f + 1] << 8;
  }, s.prototype.readUint16BE = s.prototype.readUInt16BE = function(f, d) {
    return f = f >>> 0, d || ee(f, 2, this.length), this[f] << 8 | this[f + 1];
  }, s.prototype.readUint32LE = s.prototype.readUInt32LE = function(f, d) {
    return f = f >>> 0, d || ee(f, 4, this.length), (this[f] | this[f + 1] << 8 | this[f + 2] << 16) + this[f + 3] * 16777216;
  }, s.prototype.readUint32BE = s.prototype.readUInt32BE = function(f, d) {
    return f = f >>> 0, d || ee(f, 4, this.length), this[f] * 16777216 + (this[f + 1] << 16 | this[f + 2] << 8 | this[f + 3]);
  }, s.prototype.readBigUInt64LE = Z(function(f) {
    f = f >>> 0, Se(f, "offset");
    const d = this[f], A = this[f + 7];
    (d === void 0 || A === void 0) && Ee(f, this.length - 8);
    const N = d + this[++f] * 2 ** 8 + this[++f] * 2 ** 16 + this[++f] * 2 ** 24, v = this[++f] + this[++f] * 2 ** 8 + this[++f] * 2 ** 16 + A * 2 ** 24;
    return BigInt(N) + (BigInt(v) << BigInt(32));
  }), s.prototype.readBigUInt64BE = Z(function(f) {
    f = f >>> 0, Se(f, "offset");
    const d = this[f], A = this[f + 7];
    (d === void 0 || A === void 0) && Ee(f, this.length - 8);
    const N = d * 2 ** 24 + this[++f] * 2 ** 16 + this[++f] * 2 ** 8 + this[++f], v = this[++f] * 2 ** 24 + this[++f] * 2 ** 16 + this[++f] * 2 ** 8 + A;
    return (BigInt(N) << BigInt(32)) + BigInt(v);
  }), s.prototype.readIntLE = function(f, d, A) {
    f = f >>> 0, d = d >>> 0, A || ee(f, d, this.length);
    let N = this[f], v = 1, k = 0;
    for (; ++k < d && (v *= 256); )
      N += this[f + k] * v;
    return v *= 128, N >= v && (N -= Math.pow(2, 8 * d)), N;
  }, s.prototype.readIntBE = function(f, d, A) {
    f = f >>> 0, d = d >>> 0, A || ee(f, d, this.length);
    let N = d, v = 1, k = this[f + --N];
    for (; N > 0 && (v *= 256); )
      k += this[f + --N] * v;
    return v *= 128, k >= v && (k -= Math.pow(2, 8 * d)), k;
  }, s.prototype.readInt8 = function(f, d) {
    return f = f >>> 0, d || ee(f, 1, this.length), this[f] & 128 ? (255 - this[f] + 1) * -1 : this[f];
  }, s.prototype.readInt16LE = function(f, d) {
    f = f >>> 0, d || ee(f, 2, this.length);
    const A = this[f] | this[f + 1] << 8;
    return A & 32768 ? A | 4294901760 : A;
  }, s.prototype.readInt16BE = function(f, d) {
    f = f >>> 0, d || ee(f, 2, this.length);
    const A = this[f + 1] | this[f] << 8;
    return A & 32768 ? A | 4294901760 : A;
  }, s.prototype.readInt32LE = function(f, d) {
    return f = f >>> 0, d || ee(f, 4, this.length), this[f] | this[f + 1] << 8 | this[f + 2] << 16 | this[f + 3] << 24;
  }, s.prototype.readInt32BE = function(f, d) {
    return f = f >>> 0, d || ee(f, 4, this.length), this[f] << 24 | this[f + 1] << 16 | this[f + 2] << 8 | this[f + 3];
  }, s.prototype.readBigInt64LE = Z(function(f) {
    f = f >>> 0, Se(f, "offset");
    const d = this[f], A = this[f + 7];
    (d === void 0 || A === void 0) && Ee(f, this.length - 8);
    const N = this[f + 4] + this[f + 5] * 2 ** 8 + this[f + 6] * 2 ** 16 + (A << 24);
    return (BigInt(N) << BigInt(32)) + BigInt(d + this[++f] * 2 ** 8 + this[++f] * 2 ** 16 + this[++f] * 2 ** 24);
  }), s.prototype.readBigInt64BE = Z(function(f) {
    f = f >>> 0, Se(f, "offset");
    const d = this[f], A = this[f + 7];
    (d === void 0 || A === void 0) && Ee(f, this.length - 8);
    const N = (d << 24) + // Overflow
    this[++f] * 2 ** 16 + this[++f] * 2 ** 8 + this[++f];
    return (BigInt(N) << BigInt(32)) + BigInt(this[++f] * 2 ** 24 + this[++f] * 2 ** 16 + this[++f] * 2 ** 8 + A);
  }), s.prototype.readFloatLE = function(f, d) {
    return f = f >>> 0, d || ee(f, 4, this.length), r.read(this, f, !0, 23, 4);
  }, s.prototype.readFloatBE = function(f, d) {
    return f = f >>> 0, d || ee(f, 4, this.length), r.read(this, f, !1, 23, 4);
  }, s.prototype.readDoubleLE = function(f, d) {
    return f = f >>> 0, d || ee(f, 8, this.length), r.read(this, f, !0, 52, 8);
  }, s.prototype.readDoubleBE = function(f, d) {
    return f = f >>> 0, d || ee(f, 8, this.length), r.read(this, f, !1, 52, 8);
  };
  function le(E, f, d, A, N, v) {
    if (!s.isBuffer(E))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (f > N || f < v)
      throw new RangeError('"value" argument is out of bounds');
    if (d + A > E.length)
      throw new RangeError("Index out of range");
  }
  s.prototype.writeUintLE = s.prototype.writeUIntLE = function(f, d, A, N) {
    if (f = +f, d = d >>> 0, A = A >>> 0, !N) {
      const te = Math.pow(2, 8 * A) - 1;
      le(this, f, d, A, te, 0);
    }
    let v = 1, k = 0;
    for (this[d] = f & 255; ++k < A && (v *= 256); )
      this[d + k] = f / v & 255;
    return d + A;
  }, s.prototype.writeUintBE = s.prototype.writeUIntBE = function(f, d, A, N) {
    if (f = +f, d = d >>> 0, A = A >>> 0, !N) {
      const te = Math.pow(2, 8 * A) - 1;
      le(this, f, d, A, te, 0);
    }
    let v = A - 1, k = 1;
    for (this[d + v] = f & 255; --v >= 0 && (k *= 256); )
      this[d + v] = f / k & 255;
    return d + A;
  }, s.prototype.writeUint8 = s.prototype.writeUInt8 = function(f, d, A) {
    return f = +f, d = d >>> 0, A || le(this, f, d, 1, 255, 0), this[d] = f & 255, d + 1;
  }, s.prototype.writeUint16LE = s.prototype.writeUInt16LE = function(f, d, A) {
    return f = +f, d = d >>> 0, A || le(this, f, d, 2, 65535, 0), this[d] = f & 255, this[d + 1] = f >>> 8, d + 2;
  }, s.prototype.writeUint16BE = s.prototype.writeUInt16BE = function(f, d, A) {
    return f = +f, d = d >>> 0, A || le(this, f, d, 2, 65535, 0), this[d] = f >>> 8, this[d + 1] = f & 255, d + 2;
  }, s.prototype.writeUint32LE = s.prototype.writeUInt32LE = function(f, d, A) {
    return f = +f, d = d >>> 0, A || le(this, f, d, 4, 4294967295, 0), this[d + 3] = f >>> 24, this[d + 2] = f >>> 16, this[d + 1] = f >>> 8, this[d] = f & 255, d + 4;
  }, s.prototype.writeUint32BE = s.prototype.writeUInt32BE = function(f, d, A) {
    return f = +f, d = d >>> 0, A || le(this, f, d, 4, 4294967295, 0), this[d] = f >>> 24, this[d + 1] = f >>> 16, this[d + 2] = f >>> 8, this[d + 3] = f & 255, d + 4;
  };
  function K(E, f, d, A, N) {
    De(f, A, N, E, d, 7);
    let v = Number(f & BigInt(4294967295));
    E[d++] = v, v = v >> 8, E[d++] = v, v = v >> 8, E[d++] = v, v = v >> 8, E[d++] = v;
    let k = Number(f >> BigInt(32) & BigInt(4294967295));
    return E[d++] = k, k = k >> 8, E[d++] = k, k = k >> 8, E[d++] = k, k = k >> 8, E[d++] = k, d;
  }
  function Lt(E, f, d, A, N) {
    De(f, A, N, E, d, 7);
    let v = Number(f & BigInt(4294967295));
    E[d + 7] = v, v = v >> 8, E[d + 6] = v, v = v >> 8, E[d + 5] = v, v = v >> 8, E[d + 4] = v;
    let k = Number(f >> BigInt(32) & BigInt(4294967295));
    return E[d + 3] = k, k = k >> 8, E[d + 2] = k, k = k >> 8, E[d + 1] = k, k = k >> 8, E[d] = k, d + 8;
  }
  s.prototype.writeBigUInt64LE = Z(function(f, d = 0) {
    return K(this, f, d, BigInt(0), BigInt("0xffffffffffffffff"));
  }), s.prototype.writeBigUInt64BE = Z(function(f, d = 0) {
    return Lt(this, f, d, BigInt(0), BigInt("0xffffffffffffffff"));
  }), s.prototype.writeIntLE = function(f, d, A, N) {
    if (f = +f, d = d >>> 0, !N) {
      const Te = Math.pow(2, 8 * A - 1);
      le(this, f, d, A, Te - 1, -Te);
    }
    let v = 0, k = 1, te = 0;
    for (this[d] = f & 255; ++v < A && (k *= 256); )
      f < 0 && te === 0 && this[d + v - 1] !== 0 && (te = 1), this[d + v] = (f / k >> 0) - te & 255;
    return d + A;
  }, s.prototype.writeIntBE = function(f, d, A, N) {
    if (f = +f, d = d >>> 0, !N) {
      const Te = Math.pow(2, 8 * A - 1);
      le(this, f, d, A, Te - 1, -Te);
    }
    let v = A - 1, k = 1, te = 0;
    for (this[d + v] = f & 255; --v >= 0 && (k *= 256); )
      f < 0 && te === 0 && this[d + v + 1] !== 0 && (te = 1), this[d + v] = (f / k >> 0) - te & 255;
    return d + A;
  }, s.prototype.writeInt8 = function(f, d, A) {
    return f = +f, d = d >>> 0, A || le(this, f, d, 1, 127, -128), f < 0 && (f = 255 + f + 1), this[d] = f & 255, d + 1;
  }, s.prototype.writeInt16LE = function(f, d, A) {
    return f = +f, d = d >>> 0, A || le(this, f, d, 2, 32767, -32768), this[d] = f & 255, this[d + 1] = f >>> 8, d + 2;
  }, s.prototype.writeInt16BE = function(f, d, A) {
    return f = +f, d = d >>> 0, A || le(this, f, d, 2, 32767, -32768), this[d] = f >>> 8, this[d + 1] = f & 255, d + 2;
  }, s.prototype.writeInt32LE = function(f, d, A) {
    return f = +f, d = d >>> 0, A || le(this, f, d, 4, 2147483647, -2147483648), this[d] = f & 255, this[d + 1] = f >>> 8, this[d + 2] = f >>> 16, this[d + 3] = f >>> 24, d + 4;
  }, s.prototype.writeInt32BE = function(f, d, A) {
    return f = +f, d = d >>> 0, A || le(this, f, d, 4, 2147483647, -2147483648), f < 0 && (f = 4294967295 + f + 1), this[d] = f >>> 24, this[d + 1] = f >>> 16, this[d + 2] = f >>> 8, this[d + 3] = f & 255, d + 4;
  }, s.prototype.writeBigInt64LE = Z(function(f, d = 0) {
    return K(this, f, d, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  }), s.prototype.writeBigInt64BE = Z(function(f, d = 0) {
    return Lt(this, f, d, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  });
  function at(E, f, d, A, N, v) {
    if (d + A > E.length)
      throw new RangeError("Index out of range");
    if (d < 0)
      throw new RangeError("Index out of range");
  }
  function ft(E, f, d, A, N) {
    return f = +f, d = d >>> 0, N || at(E, f, d, 4), r.write(E, f, d, A, 23, 4), d + 4;
  }
  s.prototype.writeFloatLE = function(f, d, A) {
    return ft(this, f, d, !0, A);
  }, s.prototype.writeFloatBE = function(f, d, A) {
    return ft(this, f, d, !1, A);
  };
  function Ct(E, f, d, A, N) {
    return f = +f, d = d >>> 0, N || at(E, f, d, 8), r.write(E, f, d, A, 52, 8), d + 8;
  }
  s.prototype.writeDoubleLE = function(f, d, A) {
    return Ct(this, f, d, !0, A);
  }, s.prototype.writeDoubleBE = function(f, d, A) {
    return Ct(this, f, d, !1, A);
  }, s.prototype.copy = function(f, d, A, N) {
    if (!s.isBuffer(f))
      throw new TypeError("argument should be a Buffer");
    if (A || (A = 0), !N && N !== 0 && (N = this.length), d >= f.length && (d = f.length), d || (d = 0), N > 0 && N < A && (N = A), N === A || f.length === 0 || this.length === 0)
      return 0;
    if (d < 0)
      throw new RangeError("targetStart out of bounds");
    if (A < 0 || A >= this.length)
      throw new RangeError("Index out of range");
    if (N < 0)
      throw new RangeError("sourceEnd out of bounds");
    N > this.length && (N = this.length), f.length - d < N - A && (N = f.length - d + A);
    const v = N - A;
    return this === f && typeof i.prototype.copyWithin == "function" ? this.copyWithin(d, A, N) : i.prototype.set.call(
      f,
      this.subarray(A, N),
      d
    ), v;
  }, s.prototype.fill = function(f, d, A, N) {
    if (typeof f == "string") {
      if (typeof d == "string" ? (N = d, d = 0, A = this.length) : typeof A == "string" && (N = A, A = this.length), N !== void 0 && typeof N != "string")
        throw new TypeError("encoding must be a string");
      if (typeof N == "string" && !s.isEncoding(N))
        throw new TypeError("Unknown encoding: " + N);
      if (f.length === 1) {
        const k = f.charCodeAt(0);
        (N === "utf8" && k < 128 || N === "latin1") && (f = k);
      }
    } else
      typeof f == "number" ? f = f & 255 : typeof f == "boolean" && (f = Number(f));
    if (d < 0 || this.length < d || this.length < A)
      throw new RangeError("Out of range index");
    if (A <= d)
      return this;
    d = d >>> 0, A = A === void 0 ? this.length : A >>> 0, f || (f = 0);
    let v;
    if (typeof f == "number")
      for (v = d; v < A; ++v)
        this[v] = f;
    else {
      const k = s.isBuffer(f) ? f : s.from(f, N), te = k.length;
      if (te === 0)
        throw new TypeError('The value "' + f + '" is invalid for argument "value"');
      for (v = 0; v < A - d; ++v)
        this[v + d] = k[v % te];
    }
    return this;
  };
  const Ce = {};
  function je(E, f, d) {
    Ce[E] = class extends d {
      constructor() {
        super(), Object.defineProperty(this, "message", {
          value: f.apply(this, arguments),
          writable: !0,
          configurable: !0
        }), this.name = `${this.name} [${E}]`, this.stack, delete this.name;
      }
      get code() {
        return E;
      }
      set code(N) {
        Object.defineProperty(this, "code", {
          configurable: !0,
          enumerable: !0,
          value: N,
          writable: !0
        });
      }
      toString() {
        return `${this.name} [${E}]: ${this.message}`;
      }
    };
  }
  je(
    "ERR_BUFFER_OUT_OF_BOUNDS",
    function(E) {
      return E ? `${E} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
    },
    RangeError
  ), je(
    "ERR_INVALID_ARG_TYPE",
    function(E, f) {
      return `The "${E}" argument must be of type number. Received type ${typeof f}`;
    },
    TypeError
  ), je(
    "ERR_OUT_OF_RANGE",
    function(E, f, d) {
      let A = `The value of "${E}" is out of range.`, N = d;
      return Number.isInteger(d) && Math.abs(d) > 2 ** 32 ? N = Ne(String(d)) : typeof d == "bigint" && (N = String(d), (d > BigInt(2) ** BigInt(32) || d < -(BigInt(2) ** BigInt(32))) && (N = Ne(N)), N += "n"), A += ` It must be ${f}. Received ${N}`, A;
    },
    RangeError
  );
  function Ne(E) {
    let f = "", d = E.length;
    const A = E[0] === "-" ? 1 : 0;
    for (; d >= A + 4; d -= 3)
      f = `_${E.slice(d - 3, d)}${f}`;
    return `${E.slice(0, d)}${f}`;
  }
  function ce(E, f, d) {
    Se(f, "offset"), (E[f] === void 0 || E[f + d] === void 0) && Ee(f, E.length - (d + 1));
  }
  function De(E, f, d, A, N, v) {
    if (E > d || E < f) {
      const k = typeof f == "bigint" ? "n" : "";
      let te;
      throw v > 3 ? f === 0 || f === BigInt(0) ? te = `>= 0${k} and < 2${k} ** ${(v + 1) * 8}${k}` : te = `>= -(2${k} ** ${(v + 1) * 8 - 1}${k}) and < 2 ** ${(v + 1) * 8 - 1}${k}` : te = `>= ${f}${k} and <= ${d}${k}`, new Ce.ERR_OUT_OF_RANGE("value", te, E);
    }
    ce(A, N, v);
  }
  function Se(E, f) {
    if (typeof E != "number")
      throw new Ce.ERR_INVALID_ARG_TYPE(f, "number", E);
  }
  function Ee(E, f, d) {
    throw Math.floor(E) !== E ? (Se(E, d), new Ce.ERR_OUT_OF_RANGE(d || "offset", "an integer", E)) : f < 0 ? new Ce.ERR_BUFFER_OUT_OF_BOUNDS() : new Ce.ERR_OUT_OF_RANGE(
      d || "offset",
      `>= ${d ? 1 : 0} and <= ${f}`,
      E
    );
  }
  const nr = /[^+/0-9A-Za-z-_]/g;
  function xt(E) {
    if (E = E.split("=")[0], E = E.trim().replace(nr, ""), E.length < 2)
      return "";
    for (; E.length % 4 !== 0; )
      E = E + "=";
    return E;
  }
  function We(E, f) {
    f = f || 1 / 0;
    let d;
    const A = E.length;
    let N = null;
    const v = [];
    for (let k = 0; k < A; ++k) {
      if (d = E.charCodeAt(k), d > 55295 && d < 57344) {
        if (!N) {
          if (d > 56319) {
            (f -= 3) > -1 && v.push(239, 191, 189);
            continue;
          } else if (k + 1 === A) {
            (f -= 3) > -1 && v.push(239, 191, 189);
            continue;
          }
          N = d;
          continue;
        }
        if (d < 56320) {
          (f -= 3) > -1 && v.push(239, 191, 189), N = d;
          continue;
        }
        d = (N - 55296 << 10 | d - 56320) + 65536;
      } else
        N && (f -= 3) > -1 && v.push(239, 191, 189);
      if (N = null, d < 128) {
        if ((f -= 1) < 0)
          break;
        v.push(d);
      } else if (d < 2048) {
        if ((f -= 2) < 0)
          break;
        v.push(
          d >> 6 | 192,
          d & 63 | 128
        );
      } else if (d < 65536) {
        if ((f -= 3) < 0)
          break;
        v.push(
          d >> 12 | 224,
          d >> 6 & 63 | 128,
          d & 63 | 128
        );
      } else if (d < 1114112) {
        if ((f -= 4) < 0)
          break;
        v.push(
          d >> 18 | 240,
          d >> 12 & 63 | 128,
          d >> 6 & 63 | 128,
          d & 63 | 128
        );
      } else
        throw new Error("Invalid code point");
    }
    return v;
  }
  function Da(E) {
    const f = [];
    for (let d = 0; d < E.length; ++d)
      f.push(E.charCodeAt(d) & 255);
    return f;
  }
  function Sa(E, f) {
    let d, A, N;
    const v = [];
    for (let k = 0; k < E.length && !((f -= 2) < 0); ++k)
      d = E.charCodeAt(k), A = d >> 8, N = d % 256, v.push(N), v.push(A);
    return v;
  }
  function Fr(E) {
    return t.toByteArray(xt(E));
  }
  function dt(E, f, d, A) {
    let N;
    for (N = 0; N < A && !(N + d >= f.length || N >= E.length); ++N)
      f[N + d] = E[N];
    return N;
  }
  function Ze(E, f) {
    return E instanceof f || E != null && E.constructor != null && E.constructor.name != null && E.constructor.name === f.name;
  }
  function wt(E) {
    return E !== E;
  }
  const Y = function() {
    const E = "0123456789abcdef", f = new Array(256);
    for (let d = 0; d < 16; ++d) {
      const A = d * 16;
      for (let N = 0; N < 16; ++N)
        f[A + N] = E[d] + E[N];
    }
    return f;
  }();
  function Z(E) {
    return typeof BigInt > "u" ? he : E;
  }
  function he() {
    throw new Error("BigInt not supported");
  }
})(Go);
const lr = Go.Buffer;
var Xt = {};
Object.defineProperty(Xt, "__esModule", { value: !0 });
Xt.update = Xt.getParse = void 0;
var Rd = ot, Fu = He;
function Pd(e) {
  return function(r, n, a, i) {
    if (typeof lr < "u" && lr.isBuffer(r) && (r = r.toString()), typeof r == "string")
      return e(r, n, a, i);
    var u = r;
    if (!Array.isArray(u) && (0, Fu.isDocument)(u))
      return u;
    var o = new Fu.Document([]);
    return qo(u, o), o;
  };
}
Xt.getParse = Pd;
function qo(e, t) {
  var r = Array.isArray(e) ? e : [e];
  t ? t.children = r : t = null;
  for (var n = 0; n < r.length; n++) {
    var a = r[n];
    a.parent && a.parent.children !== r && (0, Rd.removeElement)(a), t ? (a.prev = r[n - 1] || null, a.next = r[n + 1] || null) : a.prev = a.next = null, a.parent = t;
  }
  return t;
}
Xt.update = qo;
var Ld = w && w.__spreadArray || function(e, t, r) {
  if (r || arguments.length === 2)
    for (var n = 0, a = t.length, i; n < a; n++)
      (i || !(n in t)) && (i || (i = Array.prototype.slice.call(t, 0, n)), i[n] = t[n]);
  return e.concat(i || Array.prototype.slice.call(t));
};
Object.defineProperty(ie, "__esModule", { value: !0 });
ie.clone = ie.text = ie.toString = ie.html = ie.empty = ie.replaceWith = ie.remove = ie.insertBefore = ie.before = ie.insertAfter = ie.after = ie.wrapAll = ie.unwrap = ie.wrapInner = ie.wrap = ie.prepend = ie.append = ie.prependTo = ie.appendTo = ie._makeDomArray = void 0;
var It = He, Nr = Xt, Uu = Oe, we = Zt, xd = ot;
function wd(e, t) {
  var r = this;
  return e == null ? [] : (0, we.isCheerio)(e) ? t ? (0, we.cloneDom)(e.get()) : e.get() : Array.isArray(e) ? e.reduce(function(n, a) {
    return n.concat(r._makeDomArray(a, t));
  }, []) : typeof e == "string" ? this._parse(e, this.options, !1, null).children : t ? (0, we.cloneDom)([e]) : [e];
}
ie._makeDomArray = wd;
function Yo(e) {
  return function() {
    for (var t = this, r = [], n = 0; n < arguments.length; n++)
      r[n] = arguments[n];
    var a = this.length - 1;
    return (0, we.domEach)(this, function(i, u) {
      if ((0, It.hasChildren)(i)) {
        var o = typeof r[0] == "function" ? r[0].call(i, u, t._render(i.children)) : r, c = t._makeDomArray(o, u < a);
        e(c, i.children, i);
      }
    });
  };
}
function Gt(e, t, r, n, a) {
  for (var i, u, o = Ld([
    t,
    r
  ], n, !0), c = t === 0 ? null : e[t - 1], h = t + r >= e.length ? null : e[t + r], s = 0; s < n.length; ++s) {
    var g = n[s], p = g.parent;
    if (p) {
      var m = p.children, b = m.indexOf(g);
      b > -1 && (p.children.splice(b, 1), a === p && t > b && o[0]--);
    }
    g.parent = a, g.prev && (g.prev.next = (i = g.next) !== null && i !== void 0 ? i : null), g.next && (g.next.prev = (u = g.prev) !== null && u !== void 0 ? u : null), g.prev = s === 0 ? c : n[s - 1], g.next = s === n.length - 1 ? h : n[s + 1];
  }
  return c && (c.next = n[0]), h && (h.prev = n[n.length - 1]), e.splice.apply(e, o);
}
function Md(e) {
  var t = (0, we.isCheerio)(e) ? e : this._make(e);
  return t.append(this), this;
}
ie.appendTo = Md;
function Bd(e) {
  var t = (0, we.isCheerio)(e) ? e : this._make(e);
  return t.prepend(this), this;
}
ie.prependTo = Bd;
ie.append = Yo(function(e, t, r) {
  Gt(t, t.length, 0, e, r);
});
ie.prepend = Yo(function(e, t, r) {
  Gt(t, 0, 0, e, r);
});
function Vo(e) {
  return function(t) {
    for (var r = this.length - 1, n = this.parents().last(), a = 0; a < this.length; a++) {
      var i = this[a], u = typeof t == "function" ? t.call(i, a, i) : typeof t == "string" && !(0, we.isHtml)(t) ? n.find(t).clone() : t, o = this._makeDomArray(u, a < r)[0];
      if (!(!o || !(0, It.hasChildren)(o))) {
        for (var c = o, h = 0; h < c.children.length; ) {
          var s = c.children[h];
          (0, we.isTag)(s) ? (c = s, h = 0) : h++;
        }
        e(i, c, [o]);
      }
    }
    return this;
  };
}
ie.wrap = Vo(function(e, t, r) {
  var n = e.parent;
  if (n) {
    var a = n.children, i = a.indexOf(e);
    (0, Nr.update)([e], t), Gt(a, i, 0, r, n);
  }
});
ie.wrapInner = Vo(function(e, t, r) {
  (0, It.hasChildren)(e) && ((0, Nr.update)(e.children, t), (0, Nr.update)(r, e));
});
function kd(e) {
  var t = this;
  return this.parent(e).not("body").each(function(r, n) {
    t._make(n).replaceWith(n.children);
  }), this;
}
ie.unwrap = kd;
function Fd(e) {
  var t = this[0];
  if (t) {
    for (var r = this._make(typeof e == "function" ? e.call(t, 0, t) : e).insertBefore(t), n = void 0, a = 0; a < r.length; a++)
      r[a].type === "tag" && (n = r[a]);
    for (var i = 0; n && i < n.children.length; ) {
      var u = n.children[i];
      u.type === "tag" ? (n = u, i = 0) : i++;
    }
    n && this._make(n).append(this);
  }
  return this;
}
ie.wrapAll = Fd;
function Ud() {
  for (var e = this, t = [], r = 0; r < arguments.length; r++)
    t[r] = arguments[r];
  var n = this.length - 1;
  return (0, we.domEach)(this, function(a, i) {
    var u = a.parent;
    if (!(!(0, It.hasChildren)(a) || !u)) {
      var o = u.children, c = o.indexOf(a);
      if (!(c < 0)) {
        var h = typeof t[0] == "function" ? t[0].call(a, i, e._render(a.children)) : t, s = e._makeDomArray(h, i < n);
        Gt(o, c + 1, 0, s, u);
      }
    }
  });
}
ie.after = Ud;
function Hd(e) {
  var t = this;
  typeof e == "string" && (e = this._make(e)), this.remove();
  var r = [];
  return this._makeDomArray(e).forEach(function(n) {
    var a = t.clone().toArray(), i = n.parent;
    if (i) {
      var u = i.children, o = u.indexOf(n);
      o < 0 || (Gt(u, o + 1, 0, a, i), r.push.apply(r, a));
    }
  }), this._make(r);
}
ie.insertAfter = Hd;
function Gd() {
  for (var e = this, t = [], r = 0; r < arguments.length; r++)
    t[r] = arguments[r];
  var n = this.length - 1;
  return (0, we.domEach)(this, function(a, i) {
    var u = a.parent;
    if (!(!(0, It.hasChildren)(a) || !u)) {
      var o = u.children, c = o.indexOf(a);
      if (!(c < 0)) {
        var h = typeof t[0] == "function" ? t[0].call(a, i, e._render(a.children)) : t, s = e._makeDomArray(h, i < n);
        Gt(o, c, 0, s, u);
      }
    }
  });
}
ie.before = Gd;
function jd(e) {
  var t = this, r = this._make(e);
  this.remove();
  var n = [];
  return (0, we.domEach)(r, function(a) {
    var i = t.clone().toArray(), u = a.parent;
    if (u) {
      var o = u.children, c = o.indexOf(a);
      c < 0 || (Gt(o, c, 0, i, u), n.push.apply(n, i));
    }
  }), this._make(n);
}
ie.insertBefore = jd;
function qd(e) {
  var t = e ? this.filter(e) : this;
  return (0, we.domEach)(t, function(r) {
    (0, xd.removeElement)(r), r.prev = r.next = r.parent = null;
  }), this;
}
ie.remove = qd;
function Yd(e) {
  var t = this;
  return (0, we.domEach)(this, function(r, n) {
    var a = r.parent;
    if (a) {
      var i = a.children, u = typeof e == "function" ? e.call(r, n, r) : e, o = t._makeDomArray(u);
      (0, Nr.update)(o, null);
      var c = i.indexOf(r);
      Gt(i, c, 1, o, a), o.includes(r) || (r.parent = r.prev = r.next = null);
    }
  });
}
ie.replaceWith = Yd;
function Vd() {
  return (0, we.domEach)(this, function(e) {
    (0, It.hasChildren)(e) && (e.children.forEach(function(t) {
      t.next = t.prev = t.parent = null;
    }), e.children.length = 0);
  });
}
ie.empty = Vd;
function $d(e) {
  var t = this;
  if (e === void 0) {
    var r = this[0];
    return !r || !(0, It.hasChildren)(r) ? null : this._render(r.children);
  }
  return (0, we.domEach)(this, function(n) {
    if ((0, It.hasChildren)(n)) {
      n.children.forEach(function(i) {
        i.next = i.prev = i.parent = null;
      });
      var a = (0, we.isCheerio)(e) ? e.toArray() : t._parse("".concat(e), t.options, !1, n).children;
      (0, Nr.update)(a, n);
    }
  });
}
ie.html = $d;
function Wd() {
  return this._render(this);
}
ie.toString = Wd;
function Qd(e) {
  var t = this;
  return e === void 0 ? (0, Uu.text)(this) : typeof e == "function" ? (0, we.domEach)(this, function(r, n) {
    return t._make(r).text(e.call(r, n, (0, Uu.text)([r])));
  }) : (0, we.domEach)(this, function(r) {
    if ((0, It.hasChildren)(r)) {
      r.children.forEach(function(a) {
        a.next = a.prev = a.parent = null;
      });
      var n = new It.Text("".concat(e));
      (0, Nr.update)(n, r);
    }
  });
}
ie.text = Qd;
function Xd() {
  return this._make((0, we.cloneDom)(this.get()));
}
ie.clone = Xd;
var da = {};
Object.defineProperty(da, "__esModule", { value: !0 });
da.css = void 0;
var mi = Zt;
function zd(e, t) {
  if (e != null && t != null || // When `prop` is a "plain" object
  typeof e == "object" && !Array.isArray(e))
    return (0, mi.domEach)(this, function(r, n) {
      (0, mi.isTag)(r) && $o(r, e, t, n);
    });
  if (this.length !== 0)
    return Wo(this[0], e);
}
da.css = zd;
function $o(e, t, r, n) {
  if (typeof t == "string") {
    var a = Wo(e), i = typeof r == "function" ? r.call(e, n, a[t]) : r;
    i === "" ? delete a[t] : i != null && (a[t] = i), e.attribs.style = Kd(a);
  } else
    typeof t == "object" && Object.keys(t).forEach(function(u, o) {
      $o(e, u, t[u], o);
    });
}
function Wo(e, t) {
  if (!(!e || !(0, mi.isTag)(e))) {
    var r = Zd(e.attribs.style);
    if (typeof t == "string")
      return r[t];
    if (Array.isArray(t)) {
      var n = {};
      return t.forEach(function(a) {
        r[a] != null && (n[a] = r[a]);
      }), n;
    }
    return r;
  }
}
function Kd(e) {
  return Object.keys(e).reduce(function(t, r) {
    return "".concat(t).concat(t ? " " : "").concat(r, ": ").concat(e[r], ";");
  }, "");
}
function Zd(e) {
  if (e = (e || "").trim(), !e)
    return {};
  for (var t = {}, r, n = 0, a = e.split(";"); n < a.length; n++) {
    var i = a[n], u = i.indexOf(":");
    if (u < 1 || u === i.length - 1) {
      var o = i.trimEnd();
      o.length > 0 && r !== void 0 && (t[r] += ";".concat(o));
    } else
      r = i.slice(0, u).trim(), t[r] = i.slice(u + 1).trim();
  }
  return t;
}
var Dr = {};
Object.defineProperty(Dr, "__esModule", { value: !0 });
Dr.serializeArray = Dr.serialize = void 0;
var Jd = Zt, Hu = "input,select,textarea,keygen", eh = /%20/g, Gu = /\r?\n/g;
function th() {
  var e = this.serializeArray(), t = e.map(function(r) {
    return "".concat(encodeURIComponent(r.name), "=").concat(encodeURIComponent(r.value));
  });
  return t.join("&").replace(eh, "+");
}
Dr.serialize = th;
function rh() {
  var e = this;
  return this.map(function(t, r) {
    var n = e._make(r);
    return (0, Jd.isTag)(r) && r.name === "form" ? n.find(Hu).toArray() : n.filter(Hu).toArray();
  }).filter(
    // Verify elements have a name (`attr.name`) and are not disabled (`:enabled`)
    '[name!=""]:enabled:not(:submit, :button, :image, :reset, :file):matches([checked], :not(:checkbox, :radio))'
    // Convert each of the elements to its value(s)
  ).map(function(t, r) {
    var n, a = e._make(r), i = a.attr("name"), u = (n = a.val()) !== null && n !== void 0 ? n : "";
    return Array.isArray(u) ? u.map(function(o) {
      return { name: i, value: o.replace(Gu, `\r
`) };
    }) : { name: i, value: u.replace(Gu, `\r
`) };
  }).toArray();
}
Dr.serializeArray = rh;
var nh = w && w.__createBinding || (Object.create ? function(e, t, r, n) {
  n === void 0 && (n = r);
  var a = Object.getOwnPropertyDescriptor(t, r);
  (!a || ("get" in a ? !t.__esModule : a.writable || a.configurable)) && (a = { enumerable: !0, get: function() {
    return t[r];
  } }), Object.defineProperty(e, n, a);
} : function(e, t, r, n) {
  n === void 0 && (n = r), e[n] = t[r];
}), ah = w && w.__setModuleDefault || (Object.create ? function(e, t) {
  Object.defineProperty(e, "default", { enumerable: !0, value: t });
} : function(e, t) {
  e.default = t;
}), mn = w && w.__importStar || function(e) {
  if (e && e.__esModule)
    return e;
  var t = {};
  if (e != null)
    for (var r in e)
      r !== "default" && Object.prototype.hasOwnProperty.call(e, r) && nh(t, e, r);
  return ah(t, e), t;
};
Object.defineProperty(ia, "__esModule", { value: !0 });
ia.Cheerio = void 0;
var ih = mn(Pe), uh = mn(X), sh = mn(ie), oh = mn(da), ch = mn(Dr), En = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(t, r, n) {
      if (this.length = 0, this.options = n, this._root = r, t) {
        for (var a = 0; a < t.length; a++)
          this[a] = t[a];
        this.length = t.length;
      }
    }
    return e;
  }()
);
ia.Cheerio = En;
En.prototype.cheerio = "[cheerio object]";
En.prototype.splice = Array.prototype.splice;
En.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
Object.assign(En.prototype, ih, uh, sh, oh, ch);
var lh = w && w.__extends || /* @__PURE__ */ function() {
  var e = function(t, r) {
    return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        Object.prototype.hasOwnProperty.call(a, i) && (n[i] = a[i]);
    }, e(t, r);
  };
  return function(t, r) {
    if (typeof r != "function" && r !== null)
      throw new TypeError("Class extends value " + String(r) + " is not a constructor or null");
    e(t, r);
    function n() {
      this.constructor = t;
    }
    t.prototype = r === null ? Object.create(r) : (n.prototype = r.prototype, new n());
  };
}(), fr = w && w.__assign || function() {
  return fr = Object.assign || function(e) {
    for (var t, r = 1, n = arguments.length; r < n; r++) {
      t = arguments[r];
      for (var a in t)
        Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
    }
    return e;
  }, fr.apply(this, arguments);
}, fh = w && w.__createBinding || (Object.create ? function(e, t, r, n) {
  n === void 0 && (n = r);
  var a = Object.getOwnPropertyDescriptor(t, r);
  (!a || ("get" in a ? !t.__esModule : a.writable || a.configurable)) && (a = { enumerable: !0, get: function() {
    return t[r];
  } }), Object.defineProperty(e, n, a);
} : function(e, t, r, n) {
  n === void 0 && (n = r), e[n] = t[r];
}), dh = w && w.__setModuleDefault || (Object.create ? function(e, t) {
  Object.defineProperty(e, "default", { enumerable: !0, value: t });
} : function(e, t) {
  e.default = t;
}), Qo = w && w.__importStar || function(e) {
  if (e && e.__esModule)
    return e;
  var t = {};
  if (e != null)
    for (var r in e)
      r !== "default" && Object.prototype.hasOwnProperty.call(e, r) && fh(t, e, r);
  return dh(t, e), t;
};
Object.defineProperty(Zn, "__esModule", { value: !0 });
Zn.getLoad = void 0;
var Ba = Qo(Pr), hh = Qo(Oe), ph = ia, Hr = Zt;
function mh(e, t) {
  return function r(n, a, i) {
    if (i === void 0 && (i = !0), n == null)
      throw new Error("cheerio.load() expects a string");
    var u = fr(fr({}, Ba.default), (0, Ba.flatten)(a)), o = e(n, u, i, null), c = (
      /** @class */
      function(s) {
        lh(g, s);
        function g() {
          return s !== null && s.apply(this, arguments) || this;
        }
        return g.prototype._make = function(p, m) {
          var b = h(p, m);
          return b.prevObject = this, b;
        }, g.prototype._parse = function(p, m, b, R) {
          return e(p, m, b, R);
        }, g.prototype._render = function(p) {
          return t(p, this.options);
        }, g;
      }(ph.Cheerio)
    );
    function h(s, g, p, m) {
      if (p === void 0 && (p = o), s && (0, Hr.isCheerio)(s))
        return s;
      var b = fr(fr({}, u), (0, Ba.flatten)(m)), R = typeof p == "string" ? [e(p, b, !1, null)] : "length" in p ? p : [p], C = (0, Hr.isCheerio)(R) ? R : new c(R, null, b);
      if (C._root = C, !s)
        return new c(void 0, C, b);
      var D = typeof s == "string" && (0, Hr.isHtml)(s) ? (
        // $(<html>)
        e(s, b, !1, null).children
      ) : Eh(s) ? (
        // $(dom)
        [s]
      ) : Array.isArray(s) ? (
        // $([dom])
        s
      ) : void 0, S = new c(D, C, b);
      if (D)
        return S;
      if (typeof s != "string")
        throw new Error("Unexpected type of selector");
      var B = s, P = g ? typeof g == "string" ? (0, Hr.isHtml)(g) ? (
        // $('li', '<ul>...</ul>')
        new c([e(g, b, !1, null)], C, b)
      ) : (
        // $('li', 'ul')
        (B = "".concat(g, " ").concat(B), C)
      ) : (0, Hr.isCheerio)(g) ? (
        // $('li', $)
        g
      ) : (
        // $('li', node), $('li', [nodes])
        new c(Array.isArray(g) ? g : [g], C, b)
      ) : (
        // If we don't have a context, maybe we have a root, from loading
        C
      );
      return P ? P.find(B) : S;
    }
    return Object.assign(h, hh, {
      load: r,
      // `_root` and `_options` are used in static methods.
      _root: o,
      _options: u,
      // Add `fn` for plugins
      fn: c.prototype,
      // Add the prototype here to maintain `instanceof` behavior.
      prototype: c.prototype
    }), h;
  };
}
Zn.getLoad = mh;
function Eh(e) {
  return !!e.name || e.type === "root" || e.type === "text" || e.type === "comment";
}
var Sr = {}, rn = {}, nn = {}, zt = {}, ha = {}, pa = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.isUndefinedCodePoint = e.isControlCodePoint = e.getSurrogatePairCodePoint = e.isSurrogatePair = e.isSurrogate = e.SEQUENCES = e.CODE_POINTS = e.REPLACEMENT_CHARACTER = void 0;
  const t = /* @__PURE__ */ new Set([
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
  e.REPLACEMENT_CHARACTER = "�", function(o) {
    o[o.EOF = -1] = "EOF", o[o.NULL = 0] = "NULL", o[o.TABULATION = 9] = "TABULATION", o[o.CARRIAGE_RETURN = 13] = "CARRIAGE_RETURN", o[o.LINE_FEED = 10] = "LINE_FEED", o[o.FORM_FEED = 12] = "FORM_FEED", o[o.SPACE = 32] = "SPACE", o[o.EXCLAMATION_MARK = 33] = "EXCLAMATION_MARK", o[o.QUOTATION_MARK = 34] = "QUOTATION_MARK", o[o.NUMBER_SIGN = 35] = "NUMBER_SIGN", o[o.AMPERSAND = 38] = "AMPERSAND", o[o.APOSTROPHE = 39] = "APOSTROPHE", o[o.HYPHEN_MINUS = 45] = "HYPHEN_MINUS", o[o.SOLIDUS = 47] = "SOLIDUS", o[o.DIGIT_0 = 48] = "DIGIT_0", o[o.DIGIT_9 = 57] = "DIGIT_9", o[o.SEMICOLON = 59] = "SEMICOLON", o[o.LESS_THAN_SIGN = 60] = "LESS_THAN_SIGN", o[o.EQUALS_SIGN = 61] = "EQUALS_SIGN", o[o.GREATER_THAN_SIGN = 62] = "GREATER_THAN_SIGN", o[o.QUESTION_MARK = 63] = "QUESTION_MARK", o[o.LATIN_CAPITAL_A = 65] = "LATIN_CAPITAL_A", o[o.LATIN_CAPITAL_F = 70] = "LATIN_CAPITAL_F", o[o.LATIN_CAPITAL_X = 88] = "LATIN_CAPITAL_X", o[o.LATIN_CAPITAL_Z = 90] = "LATIN_CAPITAL_Z", o[o.RIGHT_SQUARE_BRACKET = 93] = "RIGHT_SQUARE_BRACKET", o[o.GRAVE_ACCENT = 96] = "GRAVE_ACCENT", o[o.LATIN_SMALL_A = 97] = "LATIN_SMALL_A", o[o.LATIN_SMALL_F = 102] = "LATIN_SMALL_F", o[o.LATIN_SMALL_X = 120] = "LATIN_SMALL_X", o[o.LATIN_SMALL_Z = 122] = "LATIN_SMALL_Z", o[o.REPLACEMENT_CHARACTER = 65533] = "REPLACEMENT_CHARACTER";
  }(e.CODE_POINTS || (e.CODE_POINTS = {})), e.SEQUENCES = {
    DASH_DASH: "--",
    CDATA_START: "[CDATA[",
    DOCTYPE: "doctype",
    SCRIPT: "script",
    PUBLIC: "public",
    SYSTEM: "system"
  };
  function r(o) {
    return o >= 55296 && o <= 57343;
  }
  e.isSurrogate = r;
  function n(o) {
    return o >= 56320 && o <= 57343;
  }
  e.isSurrogatePair = n;
  function a(o, c) {
    return (o - 55296) * 1024 + 9216 + c;
  }
  e.getSurrogatePairCodePoint = a;
  function i(o) {
    return o !== 32 && o !== 10 && o !== 13 && o !== 9 && o !== 12 && o >= 1 && o <= 31 || o >= 127 && o <= 159;
  }
  e.isControlCodePoint = i;
  function u(o) {
    return o >= 64976 && o <= 65007 || t.has(o);
  }
  e.isUndefinedCodePoint = u;
})(pa);
var Tn = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ERR = void 0, function(t) {
    t.controlCharacterInInputStream = "control-character-in-input-stream", t.noncharacterInInputStream = "noncharacter-in-input-stream", t.surrogateInInputStream = "surrogate-in-input-stream", t.nonVoidHtmlElementStartTagWithTrailingSolidus = "non-void-html-element-start-tag-with-trailing-solidus", t.endTagWithAttributes = "end-tag-with-attributes", t.endTagWithTrailingSolidus = "end-tag-with-trailing-solidus", t.unexpectedSolidusInTag = "unexpected-solidus-in-tag", t.unexpectedNullCharacter = "unexpected-null-character", t.unexpectedQuestionMarkInsteadOfTagName = "unexpected-question-mark-instead-of-tag-name", t.invalidFirstCharacterOfTagName = "invalid-first-character-of-tag-name", t.unexpectedEqualsSignBeforeAttributeName = "unexpected-equals-sign-before-attribute-name", t.missingEndTagName = "missing-end-tag-name", t.unexpectedCharacterInAttributeName = "unexpected-character-in-attribute-name", t.unknownNamedCharacterReference = "unknown-named-character-reference", t.missingSemicolonAfterCharacterReference = "missing-semicolon-after-character-reference", t.unexpectedCharacterAfterDoctypeSystemIdentifier = "unexpected-character-after-doctype-system-identifier", t.unexpectedCharacterInUnquotedAttributeValue = "unexpected-character-in-unquoted-attribute-value", t.eofBeforeTagName = "eof-before-tag-name", t.eofInTag = "eof-in-tag", t.missingAttributeValue = "missing-attribute-value", t.missingWhitespaceBetweenAttributes = "missing-whitespace-between-attributes", t.missingWhitespaceAfterDoctypePublicKeyword = "missing-whitespace-after-doctype-public-keyword", t.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers = "missing-whitespace-between-doctype-public-and-system-identifiers", t.missingWhitespaceAfterDoctypeSystemKeyword = "missing-whitespace-after-doctype-system-keyword", t.missingQuoteBeforeDoctypePublicIdentifier = "missing-quote-before-doctype-public-identifier", t.missingQuoteBeforeDoctypeSystemIdentifier = "missing-quote-before-doctype-system-identifier", t.missingDoctypePublicIdentifier = "missing-doctype-public-identifier", t.missingDoctypeSystemIdentifier = "missing-doctype-system-identifier", t.abruptDoctypePublicIdentifier = "abrupt-doctype-public-identifier", t.abruptDoctypeSystemIdentifier = "abrupt-doctype-system-identifier", t.cdataInHtmlContent = "cdata-in-html-content", t.incorrectlyOpenedComment = "incorrectly-opened-comment", t.eofInScriptHtmlCommentLikeText = "eof-in-script-html-comment-like-text", t.eofInDoctype = "eof-in-doctype", t.nestedComment = "nested-comment", t.abruptClosingOfEmptyComment = "abrupt-closing-of-empty-comment", t.eofInComment = "eof-in-comment", t.incorrectlyClosedComment = "incorrectly-closed-comment", t.eofInCdata = "eof-in-cdata", t.absenceOfDigitsInNumericCharacterReference = "absence-of-digits-in-numeric-character-reference", t.nullCharacterReference = "null-character-reference", t.surrogateCharacterReference = "surrogate-character-reference", t.characterReferenceOutsideUnicodeRange = "character-reference-outside-unicode-range", t.controlCharacterReference = "control-character-reference", t.noncharacterCharacterReference = "noncharacter-character-reference", t.missingWhitespaceBeforeDoctypeName = "missing-whitespace-before-doctype-name", t.missingDoctypeName = "missing-doctype-name", t.invalidCharacterSequenceAfterDoctypeName = "invalid-character-sequence-after-doctype-name", t.duplicateAttribute = "duplicate-attribute", t.nonConformingDoctype = "non-conforming-doctype", t.missingDoctype = "missing-doctype", t.misplacedDoctype = "misplaced-doctype", t.endTagWithoutMatchingOpenElement = "end-tag-without-matching-open-element", t.closingOfElementWithOpenChildElements = "closing-of-element-with-open-child-elements", t.disallowedContentInNoscriptInHead = "disallowed-content-in-noscript-in-head", t.openElementsLeftAfterEof = "open-elements-left-after-eof", t.abandonedHeadElementChild = "abandoned-head-element-child", t.misplacedStartTagForHeadElement = "misplaced-start-tag-for-head-element", t.nestedNoscriptInHead = "nested-noscript-in-head", t.eofInElementThatCanContainOnlyText = "eof-in-element-that-can-contain-only-text";
  }(e.ERR || (e.ERR = {}));
})(Tn);
Object.defineProperty(ha, "__esModule", { value: !0 });
ha.Preprocessor = void 0;
const qe = pa, ka = Tn, Th = 65536;
class gh {
  constructor(t) {
    this.handler = t, this.html = "", this.pos = -1, this.lastGapPos = -2, this.gapStack = [], this.skipNextNewLine = !1, this.lastChunkWritten = !1, this.endOfChunkHit = !1, this.bufferWaterline = Th, this.isEol = !1, this.lineStartPos = 0, this.droppedBufferSize = 0, this.line = 1, this.lastErrOffset = -1;
  }
  /** The column on the current line. If we just saw a gap (eg. a surrogate pair), return the index before. */
  get col() {
    return this.pos - this.lineStartPos + +(this.lastGapPos !== this.pos);
  }
  get offset() {
    return this.droppedBufferSize + this.pos;
  }
  getError(t) {
    const { line: r, col: n, offset: a } = this;
    return {
      code: t,
      startLine: r,
      endLine: r,
      startCol: n,
      endCol: n,
      startOffset: a,
      endOffset: a
    };
  }
  _err(t) {
    this.handler.onParseError && this.lastErrOffset !== this.offset && (this.lastErrOffset = this.offset, this.handler.onParseError(this.getError(t)));
  }
  _addGap() {
    this.gapStack.push(this.lastGapPos), this.lastGapPos = this.pos;
  }
  _processSurrogate(t) {
    if (this.pos !== this.html.length - 1) {
      const r = this.html.charCodeAt(this.pos + 1);
      if ((0, qe.isSurrogatePair)(r))
        return this.pos++, this._addGap(), (0, qe.getSurrogatePairCodePoint)(t, r);
    } else if (!this.lastChunkWritten)
      return this.endOfChunkHit = !0, qe.CODE_POINTS.EOF;
    return this._err(ka.ERR.surrogateInInputStream), t;
  }
  willDropParsedChunk() {
    return this.pos > this.bufferWaterline;
  }
  dropParsedChunk() {
    this.willDropParsedChunk() && (this.html = this.html.substring(this.pos), this.lineStartPos -= this.pos, this.droppedBufferSize += this.pos, this.pos = 0, this.lastGapPos = -2, this.gapStack.length = 0);
  }
  write(t, r) {
    this.html.length > 0 ? this.html += t : this.html = t, this.endOfChunkHit = !1, this.lastChunkWritten = r;
  }
  insertHtmlAtCurrentPos(t) {
    this.html = this.html.substring(0, this.pos + 1) + t + this.html.substring(this.pos + 1), this.endOfChunkHit = !1;
  }
  startsWith(t, r) {
    if (this.pos + t.length > this.html.length)
      return this.endOfChunkHit = !this.lastChunkWritten, !1;
    if (r)
      return this.html.startsWith(t, this.pos);
    for (let n = 0; n < t.length; n++)
      if ((this.html.charCodeAt(this.pos + n) | 32) !== t.charCodeAt(n))
        return !1;
    return !0;
  }
  peek(t) {
    const r = this.pos + t;
    if (r >= this.html.length)
      return this.endOfChunkHit = !this.lastChunkWritten, qe.CODE_POINTS.EOF;
    const n = this.html.charCodeAt(r);
    return n === qe.CODE_POINTS.CARRIAGE_RETURN ? qe.CODE_POINTS.LINE_FEED : n;
  }
  advance() {
    if (this.pos++, this.isEol && (this.isEol = !1, this.line++, this.lineStartPos = this.pos), this.pos >= this.html.length)
      return this.endOfChunkHit = !this.lastChunkWritten, qe.CODE_POINTS.EOF;
    let t = this.html.charCodeAt(this.pos);
    return t === qe.CODE_POINTS.CARRIAGE_RETURN ? (this.isEol = !0, this.skipNextNewLine = !0, qe.CODE_POINTS.LINE_FEED) : t === qe.CODE_POINTS.LINE_FEED && (this.isEol = !0, this.skipNextNewLine) ? (this.line--, this.skipNextNewLine = !1, this._addGap(), this.advance()) : (this.skipNextNewLine = !1, (0, qe.isSurrogate)(t) && (t = this._processSurrogate(t)), this.handler.onParseError === null || t > 31 && t < 127 || t === qe.CODE_POINTS.LINE_FEED || t === qe.CODE_POINTS.CARRIAGE_RETURN || t > 159 && t < 64976 || this._checkForProblematicCharacters(t), t);
  }
  _checkForProblematicCharacters(t) {
    (0, qe.isControlCodePoint)(t) ? this._err(ka.ERR.controlCharacterInInputStream) : (0, qe.isUndefinedCodePoint)(t) && this._err(ka.ERR.noncharacterInInputStream);
  }
  retreat(t) {
    for (this.pos -= t; this.pos < this.lastGapPos; )
      this.lastGapPos = this.gapStack.pop(), this.pos--;
    this.isEol = !1;
  }
}
ha.Preprocessor = gh;
var ma = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.getTokenAttr = e.TokenType = void 0, function(r) {
    r[r.CHARACTER = 0] = "CHARACTER", r[r.NULL_CHARACTER = 1] = "NULL_CHARACTER", r[r.WHITESPACE_CHARACTER = 2] = "WHITESPACE_CHARACTER", r[r.START_TAG = 3] = "START_TAG", r[r.END_TAG = 4] = "END_TAG", r[r.COMMENT = 5] = "COMMENT", r[r.DOCTYPE = 6] = "DOCTYPE", r[r.EOF = 7] = "EOF", r[r.HIBERNATION = 8] = "HIBERNATION";
  }(e.TokenType || (e.TokenType = {}));
  function t(r, n) {
    for (let a = r.attrs.length - 1; a >= 0; a--)
      if (r.attrs[a].name === n)
        return r.attrs[a].value;
    return null;
  }
  e.getTokenAttr = t;
})(ma);
var Rt = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.hasUnescapedText = e.isNumberedHeader = e.SPECIAL_ELEMENTS = e.getTagID = e.TAG_ID = e.TAG_NAMES = e.DOCUMENT_MODE = e.ATTRS = e.NS = void 0;
  var t;
  (function(s) {
    s.HTML = "http://www.w3.org/1999/xhtml", s.MATHML = "http://www.w3.org/1998/Math/MathML", s.SVG = "http://www.w3.org/2000/svg", s.XLINK = "http://www.w3.org/1999/xlink", s.XML = "http://www.w3.org/XML/1998/namespace", s.XMLNS = "http://www.w3.org/2000/xmlns/";
  })(t = e.NS || (e.NS = {})), function(s) {
    s.TYPE = "type", s.ACTION = "action", s.ENCODING = "encoding", s.PROMPT = "prompt", s.NAME = "name", s.COLOR = "color", s.FACE = "face", s.SIZE = "size";
  }(e.ATTRS || (e.ATTRS = {})), function(s) {
    s.NO_QUIRKS = "no-quirks", s.QUIRKS = "quirks", s.LIMITED_QUIRKS = "limited-quirks";
  }(e.DOCUMENT_MODE || (e.DOCUMENT_MODE = {}));
  var r;
  (function(s) {
    s.A = "a", s.ADDRESS = "address", s.ANNOTATION_XML = "annotation-xml", s.APPLET = "applet", s.AREA = "area", s.ARTICLE = "article", s.ASIDE = "aside", s.B = "b", s.BASE = "base", s.BASEFONT = "basefont", s.BGSOUND = "bgsound", s.BIG = "big", s.BLOCKQUOTE = "blockquote", s.BODY = "body", s.BR = "br", s.BUTTON = "button", s.CAPTION = "caption", s.CENTER = "center", s.CODE = "code", s.COL = "col", s.COLGROUP = "colgroup", s.DD = "dd", s.DESC = "desc", s.DETAILS = "details", s.DIALOG = "dialog", s.DIR = "dir", s.DIV = "div", s.DL = "dl", s.DT = "dt", s.EM = "em", s.EMBED = "embed", s.FIELDSET = "fieldset", s.FIGCAPTION = "figcaption", s.FIGURE = "figure", s.FONT = "font", s.FOOTER = "footer", s.FOREIGN_OBJECT = "foreignObject", s.FORM = "form", s.FRAME = "frame", s.FRAMESET = "frameset", s.H1 = "h1", s.H2 = "h2", s.H3 = "h3", s.H4 = "h4", s.H5 = "h5", s.H6 = "h6", s.HEAD = "head", s.HEADER = "header", s.HGROUP = "hgroup", s.HR = "hr", s.HTML = "html", s.I = "i", s.IMG = "img", s.IMAGE = "image", s.INPUT = "input", s.IFRAME = "iframe", s.KEYGEN = "keygen", s.LABEL = "label", s.LI = "li", s.LINK = "link", s.LISTING = "listing", s.MAIN = "main", s.MALIGNMARK = "malignmark", s.MARQUEE = "marquee", s.MATH = "math", s.MENU = "menu", s.META = "meta", s.MGLYPH = "mglyph", s.MI = "mi", s.MO = "mo", s.MN = "mn", s.MS = "ms", s.MTEXT = "mtext", s.NAV = "nav", s.NOBR = "nobr", s.NOFRAMES = "noframes", s.NOEMBED = "noembed", s.NOSCRIPT = "noscript", s.OBJECT = "object", s.OL = "ol", s.OPTGROUP = "optgroup", s.OPTION = "option", s.P = "p", s.PARAM = "param", s.PLAINTEXT = "plaintext", s.PRE = "pre", s.RB = "rb", s.RP = "rp", s.RT = "rt", s.RTC = "rtc", s.RUBY = "ruby", s.S = "s", s.SCRIPT = "script", s.SECTION = "section", s.SELECT = "select", s.SOURCE = "source", s.SMALL = "small", s.SPAN = "span", s.STRIKE = "strike", s.STRONG = "strong", s.STYLE = "style", s.SUB = "sub", s.SUMMARY = "summary", s.SUP = "sup", s.TABLE = "table", s.TBODY = "tbody", s.TEMPLATE = "template", s.TEXTAREA = "textarea", s.TFOOT = "tfoot", s.TD = "td", s.TH = "th", s.THEAD = "thead", s.TITLE = "title", s.TR = "tr", s.TRACK = "track", s.TT = "tt", s.U = "u", s.UL = "ul", s.SVG = "svg", s.VAR = "var", s.WBR = "wbr", s.XMP = "xmp";
  })(r = e.TAG_NAMES || (e.TAG_NAMES = {}));
  var n;
  (function(s) {
    s[s.UNKNOWN = 0] = "UNKNOWN", s[s.A = 1] = "A", s[s.ADDRESS = 2] = "ADDRESS", s[s.ANNOTATION_XML = 3] = "ANNOTATION_XML", s[s.APPLET = 4] = "APPLET", s[s.AREA = 5] = "AREA", s[s.ARTICLE = 6] = "ARTICLE", s[s.ASIDE = 7] = "ASIDE", s[s.B = 8] = "B", s[s.BASE = 9] = "BASE", s[s.BASEFONT = 10] = "BASEFONT", s[s.BGSOUND = 11] = "BGSOUND", s[s.BIG = 12] = "BIG", s[s.BLOCKQUOTE = 13] = "BLOCKQUOTE", s[s.BODY = 14] = "BODY", s[s.BR = 15] = "BR", s[s.BUTTON = 16] = "BUTTON", s[s.CAPTION = 17] = "CAPTION", s[s.CENTER = 18] = "CENTER", s[s.CODE = 19] = "CODE", s[s.COL = 20] = "COL", s[s.COLGROUP = 21] = "COLGROUP", s[s.DD = 22] = "DD", s[s.DESC = 23] = "DESC", s[s.DETAILS = 24] = "DETAILS", s[s.DIALOG = 25] = "DIALOG", s[s.DIR = 26] = "DIR", s[s.DIV = 27] = "DIV", s[s.DL = 28] = "DL", s[s.DT = 29] = "DT", s[s.EM = 30] = "EM", s[s.EMBED = 31] = "EMBED", s[s.FIELDSET = 32] = "FIELDSET", s[s.FIGCAPTION = 33] = "FIGCAPTION", s[s.FIGURE = 34] = "FIGURE", s[s.FONT = 35] = "FONT", s[s.FOOTER = 36] = "FOOTER", s[s.FOREIGN_OBJECT = 37] = "FOREIGN_OBJECT", s[s.FORM = 38] = "FORM", s[s.FRAME = 39] = "FRAME", s[s.FRAMESET = 40] = "FRAMESET", s[s.H1 = 41] = "H1", s[s.H2 = 42] = "H2", s[s.H3 = 43] = "H3", s[s.H4 = 44] = "H4", s[s.H5 = 45] = "H5", s[s.H6 = 46] = "H6", s[s.HEAD = 47] = "HEAD", s[s.HEADER = 48] = "HEADER", s[s.HGROUP = 49] = "HGROUP", s[s.HR = 50] = "HR", s[s.HTML = 51] = "HTML", s[s.I = 52] = "I", s[s.IMG = 53] = "IMG", s[s.IMAGE = 54] = "IMAGE", s[s.INPUT = 55] = "INPUT", s[s.IFRAME = 56] = "IFRAME", s[s.KEYGEN = 57] = "KEYGEN", s[s.LABEL = 58] = "LABEL", s[s.LI = 59] = "LI", s[s.LINK = 60] = "LINK", s[s.LISTING = 61] = "LISTING", s[s.MAIN = 62] = "MAIN", s[s.MALIGNMARK = 63] = "MALIGNMARK", s[s.MARQUEE = 64] = "MARQUEE", s[s.MATH = 65] = "MATH", s[s.MENU = 66] = "MENU", s[s.META = 67] = "META", s[s.MGLYPH = 68] = "MGLYPH", s[s.MI = 69] = "MI", s[s.MO = 70] = "MO", s[s.MN = 71] = "MN", s[s.MS = 72] = "MS", s[s.MTEXT = 73] = "MTEXT", s[s.NAV = 74] = "NAV", s[s.NOBR = 75] = "NOBR", s[s.NOFRAMES = 76] = "NOFRAMES", s[s.NOEMBED = 77] = "NOEMBED", s[s.NOSCRIPT = 78] = "NOSCRIPT", s[s.OBJECT = 79] = "OBJECT", s[s.OL = 80] = "OL", s[s.OPTGROUP = 81] = "OPTGROUP", s[s.OPTION = 82] = "OPTION", s[s.P = 83] = "P", s[s.PARAM = 84] = "PARAM", s[s.PLAINTEXT = 85] = "PLAINTEXT", s[s.PRE = 86] = "PRE", s[s.RB = 87] = "RB", s[s.RP = 88] = "RP", s[s.RT = 89] = "RT", s[s.RTC = 90] = "RTC", s[s.RUBY = 91] = "RUBY", s[s.S = 92] = "S", s[s.SCRIPT = 93] = "SCRIPT", s[s.SECTION = 94] = "SECTION", s[s.SELECT = 95] = "SELECT", s[s.SOURCE = 96] = "SOURCE", s[s.SMALL = 97] = "SMALL", s[s.SPAN = 98] = "SPAN", s[s.STRIKE = 99] = "STRIKE", s[s.STRONG = 100] = "STRONG", s[s.STYLE = 101] = "STYLE", s[s.SUB = 102] = "SUB", s[s.SUMMARY = 103] = "SUMMARY", s[s.SUP = 104] = "SUP", s[s.TABLE = 105] = "TABLE", s[s.TBODY = 106] = "TBODY", s[s.TEMPLATE = 107] = "TEMPLATE", s[s.TEXTAREA = 108] = "TEXTAREA", s[s.TFOOT = 109] = "TFOOT", s[s.TD = 110] = "TD", s[s.TH = 111] = "TH", s[s.THEAD = 112] = "THEAD", s[s.TITLE = 113] = "TITLE", s[s.TR = 114] = "TR", s[s.TRACK = 115] = "TRACK", s[s.TT = 116] = "TT", s[s.U = 117] = "U", s[s.UL = 118] = "UL", s[s.SVG = 119] = "SVG", s[s.VAR = 120] = "VAR", s[s.WBR = 121] = "WBR", s[s.XMP = 122] = "XMP";
  })(n = e.TAG_ID || (e.TAG_ID = {}));
  const a = /* @__PURE__ */ new Map([
    [r.A, n.A],
    [r.ADDRESS, n.ADDRESS],
    [r.ANNOTATION_XML, n.ANNOTATION_XML],
    [r.APPLET, n.APPLET],
    [r.AREA, n.AREA],
    [r.ARTICLE, n.ARTICLE],
    [r.ASIDE, n.ASIDE],
    [r.B, n.B],
    [r.BASE, n.BASE],
    [r.BASEFONT, n.BASEFONT],
    [r.BGSOUND, n.BGSOUND],
    [r.BIG, n.BIG],
    [r.BLOCKQUOTE, n.BLOCKQUOTE],
    [r.BODY, n.BODY],
    [r.BR, n.BR],
    [r.BUTTON, n.BUTTON],
    [r.CAPTION, n.CAPTION],
    [r.CENTER, n.CENTER],
    [r.CODE, n.CODE],
    [r.COL, n.COL],
    [r.COLGROUP, n.COLGROUP],
    [r.DD, n.DD],
    [r.DESC, n.DESC],
    [r.DETAILS, n.DETAILS],
    [r.DIALOG, n.DIALOG],
    [r.DIR, n.DIR],
    [r.DIV, n.DIV],
    [r.DL, n.DL],
    [r.DT, n.DT],
    [r.EM, n.EM],
    [r.EMBED, n.EMBED],
    [r.FIELDSET, n.FIELDSET],
    [r.FIGCAPTION, n.FIGCAPTION],
    [r.FIGURE, n.FIGURE],
    [r.FONT, n.FONT],
    [r.FOOTER, n.FOOTER],
    [r.FOREIGN_OBJECT, n.FOREIGN_OBJECT],
    [r.FORM, n.FORM],
    [r.FRAME, n.FRAME],
    [r.FRAMESET, n.FRAMESET],
    [r.H1, n.H1],
    [r.H2, n.H2],
    [r.H3, n.H3],
    [r.H4, n.H4],
    [r.H5, n.H5],
    [r.H6, n.H6],
    [r.HEAD, n.HEAD],
    [r.HEADER, n.HEADER],
    [r.HGROUP, n.HGROUP],
    [r.HR, n.HR],
    [r.HTML, n.HTML],
    [r.I, n.I],
    [r.IMG, n.IMG],
    [r.IMAGE, n.IMAGE],
    [r.INPUT, n.INPUT],
    [r.IFRAME, n.IFRAME],
    [r.KEYGEN, n.KEYGEN],
    [r.LABEL, n.LABEL],
    [r.LI, n.LI],
    [r.LINK, n.LINK],
    [r.LISTING, n.LISTING],
    [r.MAIN, n.MAIN],
    [r.MALIGNMARK, n.MALIGNMARK],
    [r.MARQUEE, n.MARQUEE],
    [r.MATH, n.MATH],
    [r.MENU, n.MENU],
    [r.META, n.META],
    [r.MGLYPH, n.MGLYPH],
    [r.MI, n.MI],
    [r.MO, n.MO],
    [r.MN, n.MN],
    [r.MS, n.MS],
    [r.MTEXT, n.MTEXT],
    [r.NAV, n.NAV],
    [r.NOBR, n.NOBR],
    [r.NOFRAMES, n.NOFRAMES],
    [r.NOEMBED, n.NOEMBED],
    [r.NOSCRIPT, n.NOSCRIPT],
    [r.OBJECT, n.OBJECT],
    [r.OL, n.OL],
    [r.OPTGROUP, n.OPTGROUP],
    [r.OPTION, n.OPTION],
    [r.P, n.P],
    [r.PARAM, n.PARAM],
    [r.PLAINTEXT, n.PLAINTEXT],
    [r.PRE, n.PRE],
    [r.RB, n.RB],
    [r.RP, n.RP],
    [r.RT, n.RT],
    [r.RTC, n.RTC],
    [r.RUBY, n.RUBY],
    [r.S, n.S],
    [r.SCRIPT, n.SCRIPT],
    [r.SECTION, n.SECTION],
    [r.SELECT, n.SELECT],
    [r.SOURCE, n.SOURCE],
    [r.SMALL, n.SMALL],
    [r.SPAN, n.SPAN],
    [r.STRIKE, n.STRIKE],
    [r.STRONG, n.STRONG],
    [r.STYLE, n.STYLE],
    [r.SUB, n.SUB],
    [r.SUMMARY, n.SUMMARY],
    [r.SUP, n.SUP],
    [r.TABLE, n.TABLE],
    [r.TBODY, n.TBODY],
    [r.TEMPLATE, n.TEMPLATE],
    [r.TEXTAREA, n.TEXTAREA],
    [r.TFOOT, n.TFOOT],
    [r.TD, n.TD],
    [r.TH, n.TH],
    [r.THEAD, n.THEAD],
    [r.TITLE, n.TITLE],
    [r.TR, n.TR],
    [r.TRACK, n.TRACK],
    [r.TT, n.TT],
    [r.U, n.U],
    [r.UL, n.UL],
    [r.SVG, n.SVG],
    [r.VAR, n.VAR],
    [r.WBR, n.WBR],
    [r.XMP, n.XMP]
  ]);
  function i(s) {
    var g;
    return (g = a.get(s)) !== null && g !== void 0 ? g : n.UNKNOWN;
  }
  e.getTagID = i;
  const u = n;
  e.SPECIAL_ELEMENTS = {
    [t.HTML]: /* @__PURE__ */ new Set([
      u.ADDRESS,
      u.APPLET,
      u.AREA,
      u.ARTICLE,
      u.ASIDE,
      u.BASE,
      u.BASEFONT,
      u.BGSOUND,
      u.BLOCKQUOTE,
      u.BODY,
      u.BR,
      u.BUTTON,
      u.CAPTION,
      u.CENTER,
      u.COL,
      u.COLGROUP,
      u.DD,
      u.DETAILS,
      u.DIR,
      u.DIV,
      u.DL,
      u.DT,
      u.EMBED,
      u.FIELDSET,
      u.FIGCAPTION,
      u.FIGURE,
      u.FOOTER,
      u.FORM,
      u.FRAME,
      u.FRAMESET,
      u.H1,
      u.H2,
      u.H3,
      u.H4,
      u.H5,
      u.H6,
      u.HEAD,
      u.HEADER,
      u.HGROUP,
      u.HR,
      u.HTML,
      u.IFRAME,
      u.IMG,
      u.INPUT,
      u.LI,
      u.LINK,
      u.LISTING,
      u.MAIN,
      u.MARQUEE,
      u.MENU,
      u.META,
      u.NAV,
      u.NOEMBED,
      u.NOFRAMES,
      u.NOSCRIPT,
      u.OBJECT,
      u.OL,
      u.P,
      u.PARAM,
      u.PLAINTEXT,
      u.PRE,
      u.SCRIPT,
      u.SECTION,
      u.SELECT,
      u.SOURCE,
      u.STYLE,
      u.SUMMARY,
      u.TABLE,
      u.TBODY,
      u.TD,
      u.TEMPLATE,
      u.TEXTAREA,
      u.TFOOT,
      u.TH,
      u.THEAD,
      u.TITLE,
      u.TR,
      u.TRACK,
      u.UL,
      u.WBR,
      u.XMP
    ]),
    [t.MATHML]: /* @__PURE__ */ new Set([u.MI, u.MO, u.MN, u.MS, u.MTEXT, u.ANNOTATION_XML]),
    [t.SVG]: /* @__PURE__ */ new Set([u.TITLE, u.FOREIGN_OBJECT, u.DESC]),
    [t.XLINK]: /* @__PURE__ */ new Set(),
    [t.XML]: /* @__PURE__ */ new Set(),
    [t.XMLNS]: /* @__PURE__ */ new Set()
  };
  function o(s) {
    return s === u.H1 || s === u.H2 || s === u.H3 || s === u.H4 || s === u.H5 || s === u.H6;
  }
  e.isNumberedHeader = o;
  const c = /* @__PURE__ */ new Set([
    r.STYLE,
    r.SCRIPT,
    r.XMP,
    r.IFRAME,
    r.NOEMBED,
    r.NOFRAMES,
    r.PLAINTEXT
  ]);
  function h(s, g) {
    return c.has(s) || g && s === r.NOSCRIPT;
  }
  e.hasUnescapedText = h;
})(Rt);
Object.defineProperty(zt, "__esModule", { value: !0 });
zt.Tokenizer = zt.TokenizerMode = void 0;
const _h = ha, T = pa, Qe = ma, ht = Ar, F = Tn, Fa = Rt, bh = /* @__PURE__ */ new Map([
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
var _;
(function(e) {
  e[e.DATA = 0] = "DATA", e[e.RCDATA = 1] = "RCDATA", e[e.RAWTEXT = 2] = "RAWTEXT", e[e.SCRIPT_DATA = 3] = "SCRIPT_DATA", e[e.PLAINTEXT = 4] = "PLAINTEXT", e[e.TAG_OPEN = 5] = "TAG_OPEN", e[e.END_TAG_OPEN = 6] = "END_TAG_OPEN", e[e.TAG_NAME = 7] = "TAG_NAME", e[e.RCDATA_LESS_THAN_SIGN = 8] = "RCDATA_LESS_THAN_SIGN", e[e.RCDATA_END_TAG_OPEN = 9] = "RCDATA_END_TAG_OPEN", e[e.RCDATA_END_TAG_NAME = 10] = "RCDATA_END_TAG_NAME", e[e.RAWTEXT_LESS_THAN_SIGN = 11] = "RAWTEXT_LESS_THAN_SIGN", e[e.RAWTEXT_END_TAG_OPEN = 12] = "RAWTEXT_END_TAG_OPEN", e[e.RAWTEXT_END_TAG_NAME = 13] = "RAWTEXT_END_TAG_NAME", e[e.SCRIPT_DATA_LESS_THAN_SIGN = 14] = "SCRIPT_DATA_LESS_THAN_SIGN", e[e.SCRIPT_DATA_END_TAG_OPEN = 15] = "SCRIPT_DATA_END_TAG_OPEN", e[e.SCRIPT_DATA_END_TAG_NAME = 16] = "SCRIPT_DATA_END_TAG_NAME", e[e.SCRIPT_DATA_ESCAPE_START = 17] = "SCRIPT_DATA_ESCAPE_START", e[e.SCRIPT_DATA_ESCAPE_START_DASH = 18] = "SCRIPT_DATA_ESCAPE_START_DASH", e[e.SCRIPT_DATA_ESCAPED = 19] = "SCRIPT_DATA_ESCAPED", e[e.SCRIPT_DATA_ESCAPED_DASH = 20] = "SCRIPT_DATA_ESCAPED_DASH", e[e.SCRIPT_DATA_ESCAPED_DASH_DASH = 21] = "SCRIPT_DATA_ESCAPED_DASH_DASH", e[e.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN = 22] = "SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN", e[e.SCRIPT_DATA_ESCAPED_END_TAG_OPEN = 23] = "SCRIPT_DATA_ESCAPED_END_TAG_OPEN", e[e.SCRIPT_DATA_ESCAPED_END_TAG_NAME = 24] = "SCRIPT_DATA_ESCAPED_END_TAG_NAME", e[e.SCRIPT_DATA_DOUBLE_ESCAPE_START = 25] = "SCRIPT_DATA_DOUBLE_ESCAPE_START", e[e.SCRIPT_DATA_DOUBLE_ESCAPED = 26] = "SCRIPT_DATA_DOUBLE_ESCAPED", e[e.SCRIPT_DATA_DOUBLE_ESCAPED_DASH = 27] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH", e[e.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH = 28] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH", e[e.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN = 29] = "SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN", e[e.SCRIPT_DATA_DOUBLE_ESCAPE_END = 30] = "SCRIPT_DATA_DOUBLE_ESCAPE_END", e[e.BEFORE_ATTRIBUTE_NAME = 31] = "BEFORE_ATTRIBUTE_NAME", e[e.ATTRIBUTE_NAME = 32] = "ATTRIBUTE_NAME", e[e.AFTER_ATTRIBUTE_NAME = 33] = "AFTER_ATTRIBUTE_NAME", e[e.BEFORE_ATTRIBUTE_VALUE = 34] = "BEFORE_ATTRIBUTE_VALUE", e[e.ATTRIBUTE_VALUE_DOUBLE_QUOTED = 35] = "ATTRIBUTE_VALUE_DOUBLE_QUOTED", e[e.ATTRIBUTE_VALUE_SINGLE_QUOTED = 36] = "ATTRIBUTE_VALUE_SINGLE_QUOTED", e[e.ATTRIBUTE_VALUE_UNQUOTED = 37] = "ATTRIBUTE_VALUE_UNQUOTED", e[e.AFTER_ATTRIBUTE_VALUE_QUOTED = 38] = "AFTER_ATTRIBUTE_VALUE_QUOTED", e[e.SELF_CLOSING_START_TAG = 39] = "SELF_CLOSING_START_TAG", e[e.BOGUS_COMMENT = 40] = "BOGUS_COMMENT", e[e.MARKUP_DECLARATION_OPEN = 41] = "MARKUP_DECLARATION_OPEN", e[e.COMMENT_START = 42] = "COMMENT_START", e[e.COMMENT_START_DASH = 43] = "COMMENT_START_DASH", e[e.COMMENT = 44] = "COMMENT", e[e.COMMENT_LESS_THAN_SIGN = 45] = "COMMENT_LESS_THAN_SIGN", e[e.COMMENT_LESS_THAN_SIGN_BANG = 46] = "COMMENT_LESS_THAN_SIGN_BANG", e[e.COMMENT_LESS_THAN_SIGN_BANG_DASH = 47] = "COMMENT_LESS_THAN_SIGN_BANG_DASH", e[e.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH = 48] = "COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH", e[e.COMMENT_END_DASH = 49] = "COMMENT_END_DASH", e[e.COMMENT_END = 50] = "COMMENT_END", e[e.COMMENT_END_BANG = 51] = "COMMENT_END_BANG", e[e.DOCTYPE = 52] = "DOCTYPE", e[e.BEFORE_DOCTYPE_NAME = 53] = "BEFORE_DOCTYPE_NAME", e[e.DOCTYPE_NAME = 54] = "DOCTYPE_NAME", e[e.AFTER_DOCTYPE_NAME = 55] = "AFTER_DOCTYPE_NAME", e[e.AFTER_DOCTYPE_PUBLIC_KEYWORD = 56] = "AFTER_DOCTYPE_PUBLIC_KEYWORD", e[e.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER = 57] = "BEFORE_DOCTYPE_PUBLIC_IDENTIFIER", e[e.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED = 58] = "DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED", e[e.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED = 59] = "DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED", e[e.AFTER_DOCTYPE_PUBLIC_IDENTIFIER = 60] = "AFTER_DOCTYPE_PUBLIC_IDENTIFIER", e[e.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS = 61] = "BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS", e[e.AFTER_DOCTYPE_SYSTEM_KEYWORD = 62] = "AFTER_DOCTYPE_SYSTEM_KEYWORD", e[e.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER = 63] = "BEFORE_DOCTYPE_SYSTEM_IDENTIFIER", e[e.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED = 64] = "DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED", e[e.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED = 65] = "DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED", e[e.AFTER_DOCTYPE_SYSTEM_IDENTIFIER = 66] = "AFTER_DOCTYPE_SYSTEM_IDENTIFIER", e[e.BOGUS_DOCTYPE = 67] = "BOGUS_DOCTYPE", e[e.CDATA_SECTION = 68] = "CDATA_SECTION", e[e.CDATA_SECTION_BRACKET = 69] = "CDATA_SECTION_BRACKET", e[e.CDATA_SECTION_END = 70] = "CDATA_SECTION_END", e[e.CHARACTER_REFERENCE = 71] = "CHARACTER_REFERENCE", e[e.NAMED_CHARACTER_REFERENCE = 72] = "NAMED_CHARACTER_REFERENCE", e[e.AMBIGUOUS_AMPERSAND = 73] = "AMBIGUOUS_AMPERSAND", e[e.NUMERIC_CHARACTER_REFERENCE = 74] = "NUMERIC_CHARACTER_REFERENCE", e[e.HEXADEMICAL_CHARACTER_REFERENCE_START = 75] = "HEXADEMICAL_CHARACTER_REFERENCE_START", e[e.HEXADEMICAL_CHARACTER_REFERENCE = 76] = "HEXADEMICAL_CHARACTER_REFERENCE", e[e.DECIMAL_CHARACTER_REFERENCE = 77] = "DECIMAL_CHARACTER_REFERENCE", e[e.NUMERIC_CHARACTER_REFERENCE_END = 78] = "NUMERIC_CHARACTER_REFERENCE_END";
})(_ || (_ = {}));
zt.TokenizerMode = {
  DATA: _.DATA,
  RCDATA: _.RCDATA,
  RAWTEXT: _.RAWTEXT,
  SCRIPT_DATA: _.SCRIPT_DATA,
  PLAINTEXT: _.PLAINTEXT,
  CDATA_SECTION: _.CDATA_SECTION
};
function Wr(e) {
  return e >= T.CODE_POINTS.DIGIT_0 && e <= T.CODE_POINTS.DIGIT_9;
}
function Vr(e) {
  return e >= T.CODE_POINTS.LATIN_CAPITAL_A && e <= T.CODE_POINTS.LATIN_CAPITAL_Z;
}
function Ah(e) {
  return e >= T.CODE_POINTS.LATIN_SMALL_A && e <= T.CODE_POINTS.LATIN_SMALL_Z;
}
function Bt(e) {
  return Ah(e) || Vr(e);
}
function Ei(e) {
  return Bt(e) || Wr(e);
}
function Xo(e) {
  return e >= T.CODE_POINTS.LATIN_CAPITAL_A && e <= T.CODE_POINTS.LATIN_CAPITAL_F;
}
function zo(e) {
  return e >= T.CODE_POINTS.LATIN_SMALL_A && e <= T.CODE_POINTS.LATIN_SMALL_F;
}
function Ih(e) {
  return Wr(e) || Xo(e) || zo(e);
}
function Dn(e) {
  return e + 32;
}
function Ko(e) {
  return e === T.CODE_POINTS.SPACE || e === T.CODE_POINTS.LINE_FEED || e === T.CODE_POINTS.TABULATION || e === T.CODE_POINTS.FORM_FEED;
}
function yh(e) {
  return e === T.CODE_POINTS.EQUALS_SIGN || Ei(e);
}
function ju(e) {
  return Ko(e) || e === T.CODE_POINTS.SOLIDUS || e === T.CODE_POINTS.GREATER_THAN_SIGN;
}
let Ch = class {
  constructor(t, r) {
    this.options = t, this.handler = r, this.paused = !1, this.inLoop = !1, this.inForeignNode = !1, this.lastStartTagName = "", this.active = !1, this.state = _.DATA, this.returnState = _.DATA, this.charRefCode = -1, this.consumedAfterSnapshot = -1, this.currentCharacterToken = null, this.currentToken = null, this.currentAttr = { name: "", value: "" }, this.preprocessor = new _h.Preprocessor(r), this.currentLocation = this.getCurrentLocation(-1);
  }
  //Errors
  _err(t) {
    var r, n;
    (n = (r = this.handler).onParseError) === null || n === void 0 || n.call(r, this.preprocessor.getError(t));
  }
  // NOTE: `offset` may never run across line boundaries.
  getCurrentLocation(t) {
    return this.options.sourceCodeLocationInfo ? {
      startLine: this.preprocessor.line,
      startCol: this.preprocessor.col - t,
      startOffset: this.preprocessor.offset - t,
      endLine: -1,
      endCol: -1,
      endOffset: -1
    } : null;
  }
  _runParsingLoop() {
    if (!this.inLoop) {
      for (this.inLoop = !0; this.active && !this.paused; ) {
        this.consumedAfterSnapshot = 0;
        const t = this._consume();
        this._ensureHibernation() || this._callState(t);
      }
      this.inLoop = !1;
    }
  }
  //API
  pause() {
    this.paused = !0;
  }
  resume(t) {
    if (!this.paused)
      throw new Error("Parser was already resumed");
    this.paused = !1, !this.inLoop && (this._runParsingLoop(), this.paused || t == null || t());
  }
  write(t, r, n) {
    this.active = !0, this.preprocessor.write(t, r), this._runParsingLoop(), this.paused || n == null || n();
  }
  insertHtmlAtCurrentPos(t) {
    this.active = !0, this.preprocessor.insertHtmlAtCurrentPos(t), this._runParsingLoop();
  }
  //Hibernation
  _ensureHibernation() {
    return this.preprocessor.endOfChunkHit ? (this._unconsume(this.consumedAfterSnapshot), this.active = !1, !0) : !1;
  }
  //Consumption
  _consume() {
    return this.consumedAfterSnapshot++, this.preprocessor.advance();
  }
  _unconsume(t) {
    this.consumedAfterSnapshot -= t, this.preprocessor.retreat(t);
  }
  _reconsumeInState(t, r) {
    this.state = t, this._callState(r);
  }
  _advanceBy(t) {
    this.consumedAfterSnapshot += t;
    for (let r = 0; r < t; r++)
      this.preprocessor.advance();
  }
  _consumeSequenceIfMatch(t, r) {
    return this.preprocessor.startsWith(t, r) ? (this._advanceBy(t.length - 1), !0) : !1;
  }
  //Token creation
  _createStartTagToken() {
    this.currentToken = {
      type: Qe.TokenType.START_TAG,
      tagName: "",
      tagID: Fa.TAG_ID.UNKNOWN,
      selfClosing: !1,
      ackSelfClosing: !1,
      attrs: [],
      location: this.getCurrentLocation(1)
    };
  }
  _createEndTagToken() {
    this.currentToken = {
      type: Qe.TokenType.END_TAG,
      tagName: "",
      tagID: Fa.TAG_ID.UNKNOWN,
      selfClosing: !1,
      ackSelfClosing: !1,
      attrs: [],
      location: this.getCurrentLocation(2)
    };
  }
  _createCommentToken(t) {
    this.currentToken = {
      type: Qe.TokenType.COMMENT,
      data: "",
      location: this.getCurrentLocation(t)
    };
  }
  _createDoctypeToken(t) {
    this.currentToken = {
      type: Qe.TokenType.DOCTYPE,
      name: t,
      forceQuirks: !1,
      publicId: null,
      systemId: null,
      location: this.currentLocation
    };
  }
  _createCharacterToken(t, r) {
    this.currentCharacterToken = {
      type: t,
      chars: r,
      location: this.currentLocation
    };
  }
  //Tag attributes
  _createAttr(t) {
    this.currentAttr = {
      name: t,
      value: ""
    }, this.currentLocation = this.getCurrentLocation(0);
  }
  _leaveAttrName() {
    var t, r;
    const n = this.currentToken;
    if ((0, Qe.getTokenAttr)(n, this.currentAttr.name) === null) {
      if (n.attrs.push(this.currentAttr), n.location && this.currentLocation) {
        const a = (t = (r = n.location).attrs) !== null && t !== void 0 ? t : r.attrs = /* @__PURE__ */ Object.create(null);
        a[this.currentAttr.name] = this.currentLocation, this._leaveAttrValue();
      }
    } else
      this._err(F.ERR.duplicateAttribute);
  }
  _leaveAttrValue() {
    this.currentLocation && (this.currentLocation.endLine = this.preprocessor.line, this.currentLocation.endCol = this.preprocessor.col, this.currentLocation.endOffset = this.preprocessor.offset);
  }
  //Token emission
  prepareToken(t) {
    this._emitCurrentCharacterToken(t.location), this.currentToken = null, t.location && (t.location.endLine = this.preprocessor.line, t.location.endCol = this.preprocessor.col + 1, t.location.endOffset = this.preprocessor.offset + 1), this.currentLocation = this.getCurrentLocation(-1);
  }
  emitCurrentTagToken() {
    const t = this.currentToken;
    this.prepareToken(t), t.tagID = (0, Fa.getTagID)(t.tagName), t.type === Qe.TokenType.START_TAG ? (this.lastStartTagName = t.tagName, this.handler.onStartTag(t)) : (t.attrs.length > 0 && this._err(F.ERR.endTagWithAttributes), t.selfClosing && this._err(F.ERR.endTagWithTrailingSolidus), this.handler.onEndTag(t)), this.preprocessor.dropParsedChunk();
  }
  emitCurrentComment(t) {
    this.prepareToken(t), this.handler.onComment(t), this.preprocessor.dropParsedChunk();
  }
  emitCurrentDoctype(t) {
    this.prepareToken(t), this.handler.onDoctype(t), this.preprocessor.dropParsedChunk();
  }
  _emitCurrentCharacterToken(t) {
    if (this.currentCharacterToken) {
      switch (t && this.currentCharacterToken.location && (this.currentCharacterToken.location.endLine = t.startLine, this.currentCharacterToken.location.endCol = t.startCol, this.currentCharacterToken.location.endOffset = t.startOffset), this.currentCharacterToken.type) {
        case Qe.TokenType.CHARACTER: {
          this.handler.onCharacter(this.currentCharacterToken);
          break;
        }
        case Qe.TokenType.NULL_CHARACTER: {
          this.handler.onNullCharacter(this.currentCharacterToken);
          break;
        }
        case Qe.TokenType.WHITESPACE_CHARACTER: {
          this.handler.onWhitespaceCharacter(this.currentCharacterToken);
          break;
        }
      }
      this.currentCharacterToken = null;
    }
  }
  _emitEOFToken() {
    const t = this.getCurrentLocation(0);
    t && (t.endLine = t.startLine, t.endCol = t.startCol, t.endOffset = t.startOffset), this._emitCurrentCharacterToken(t), this.handler.onEof({ type: Qe.TokenType.EOF, location: t }), this.active = !1;
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
  _appendCharToCurrentCharacterToken(t, r) {
    if (this.currentCharacterToken)
      if (this.currentCharacterToken.type !== t)
        this.currentLocation = this.getCurrentLocation(0), this._emitCurrentCharacterToken(this.currentLocation), this.preprocessor.dropParsedChunk();
      else {
        this.currentCharacterToken.chars += r;
        return;
      }
    this._createCharacterToken(t, r);
  }
  _emitCodePoint(t) {
    const r = Ko(t) ? Qe.TokenType.WHITESPACE_CHARACTER : t === T.CODE_POINTS.NULL ? Qe.TokenType.NULL_CHARACTER : Qe.TokenType.CHARACTER;
    this._appendCharToCurrentCharacterToken(r, String.fromCodePoint(t));
  }
  //NOTE: used when we emit characters explicitly.
  //This is always for non-whitespace and non-null characters, which allows us to avoid additional checks.
  _emitChars(t) {
    this._appendCharToCurrentCharacterToken(Qe.TokenType.CHARACTER, t);
  }
  // Character reference helpers
  _matchNamedCharacterReference(t) {
    let r = null, n = 0, a = !1;
    for (let i = 0, u = ht.htmlDecodeTree[0]; i >= 0 && (i = (0, ht.determineBranch)(ht.htmlDecodeTree, u, i + 1, t), !(i < 0)); t = this._consume()) {
      n += 1, u = ht.htmlDecodeTree[i];
      const o = u & ht.BinTrieFlags.VALUE_LENGTH;
      if (o) {
        const c = (o >> 14) - 1;
        if (t !== T.CODE_POINTS.SEMICOLON && this._isCharacterReferenceInAttribute() && yh(this.preprocessor.peek(1)) ? (r = [T.CODE_POINTS.AMPERSAND], i += c) : (r = c === 0 ? [ht.htmlDecodeTree[i] & ~ht.BinTrieFlags.VALUE_LENGTH] : c === 1 ? [ht.htmlDecodeTree[++i]] : [ht.htmlDecodeTree[++i], ht.htmlDecodeTree[++i]], n = 0, a = t !== T.CODE_POINTS.SEMICOLON), c === 0) {
          this._consume();
          break;
        }
      }
    }
    return this._unconsume(n), a && !this.preprocessor.endOfChunkHit && this._err(F.ERR.missingSemicolonAfterCharacterReference), this._unconsume(1), r;
  }
  _isCharacterReferenceInAttribute() {
    return this.returnState === _.ATTRIBUTE_VALUE_DOUBLE_QUOTED || this.returnState === _.ATTRIBUTE_VALUE_SINGLE_QUOTED || this.returnState === _.ATTRIBUTE_VALUE_UNQUOTED;
  }
  _flushCodePointConsumedAsCharacterReference(t) {
    this._isCharacterReferenceInAttribute() ? this.currentAttr.value += String.fromCodePoint(t) : this._emitCodePoint(t);
  }
  // Calling states this way turns out to be much faster than any other approach.
  _callState(t) {
    switch (this.state) {
      case _.DATA: {
        this._stateData(t);
        break;
      }
      case _.RCDATA: {
        this._stateRcdata(t);
        break;
      }
      case _.RAWTEXT: {
        this._stateRawtext(t);
        break;
      }
      case _.SCRIPT_DATA: {
        this._stateScriptData(t);
        break;
      }
      case _.PLAINTEXT: {
        this._statePlaintext(t);
        break;
      }
      case _.TAG_OPEN: {
        this._stateTagOpen(t);
        break;
      }
      case _.END_TAG_OPEN: {
        this._stateEndTagOpen(t);
        break;
      }
      case _.TAG_NAME: {
        this._stateTagName(t);
        break;
      }
      case _.RCDATA_LESS_THAN_SIGN: {
        this._stateRcdataLessThanSign(t);
        break;
      }
      case _.RCDATA_END_TAG_OPEN: {
        this._stateRcdataEndTagOpen(t);
        break;
      }
      case _.RCDATA_END_TAG_NAME: {
        this._stateRcdataEndTagName(t);
        break;
      }
      case _.RAWTEXT_LESS_THAN_SIGN: {
        this._stateRawtextLessThanSign(t);
        break;
      }
      case _.RAWTEXT_END_TAG_OPEN: {
        this._stateRawtextEndTagOpen(t);
        break;
      }
      case _.RAWTEXT_END_TAG_NAME: {
        this._stateRawtextEndTagName(t);
        break;
      }
      case _.SCRIPT_DATA_LESS_THAN_SIGN: {
        this._stateScriptDataLessThanSign(t);
        break;
      }
      case _.SCRIPT_DATA_END_TAG_OPEN: {
        this._stateScriptDataEndTagOpen(t);
        break;
      }
      case _.SCRIPT_DATA_END_TAG_NAME: {
        this._stateScriptDataEndTagName(t);
        break;
      }
      case _.SCRIPT_DATA_ESCAPE_START: {
        this._stateScriptDataEscapeStart(t);
        break;
      }
      case _.SCRIPT_DATA_ESCAPE_START_DASH: {
        this._stateScriptDataEscapeStartDash(t);
        break;
      }
      case _.SCRIPT_DATA_ESCAPED: {
        this._stateScriptDataEscaped(t);
        break;
      }
      case _.SCRIPT_DATA_ESCAPED_DASH: {
        this._stateScriptDataEscapedDash(t);
        break;
      }
      case _.SCRIPT_DATA_ESCAPED_DASH_DASH: {
        this._stateScriptDataEscapedDashDash(t);
        break;
      }
      case _.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN: {
        this._stateScriptDataEscapedLessThanSign(t);
        break;
      }
      case _.SCRIPT_DATA_ESCAPED_END_TAG_OPEN: {
        this._stateScriptDataEscapedEndTagOpen(t);
        break;
      }
      case _.SCRIPT_DATA_ESCAPED_END_TAG_NAME: {
        this._stateScriptDataEscapedEndTagName(t);
        break;
      }
      case _.SCRIPT_DATA_DOUBLE_ESCAPE_START: {
        this._stateScriptDataDoubleEscapeStart(t);
        break;
      }
      case _.SCRIPT_DATA_DOUBLE_ESCAPED: {
        this._stateScriptDataDoubleEscaped(t);
        break;
      }
      case _.SCRIPT_DATA_DOUBLE_ESCAPED_DASH: {
        this._stateScriptDataDoubleEscapedDash(t);
        break;
      }
      case _.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH: {
        this._stateScriptDataDoubleEscapedDashDash(t);
        break;
      }
      case _.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN: {
        this._stateScriptDataDoubleEscapedLessThanSign(t);
        break;
      }
      case _.SCRIPT_DATA_DOUBLE_ESCAPE_END: {
        this._stateScriptDataDoubleEscapeEnd(t);
        break;
      }
      case _.BEFORE_ATTRIBUTE_NAME: {
        this._stateBeforeAttributeName(t);
        break;
      }
      case _.ATTRIBUTE_NAME: {
        this._stateAttributeName(t);
        break;
      }
      case _.AFTER_ATTRIBUTE_NAME: {
        this._stateAfterAttributeName(t);
        break;
      }
      case _.BEFORE_ATTRIBUTE_VALUE: {
        this._stateBeforeAttributeValue(t);
        break;
      }
      case _.ATTRIBUTE_VALUE_DOUBLE_QUOTED: {
        this._stateAttributeValueDoubleQuoted(t);
        break;
      }
      case _.ATTRIBUTE_VALUE_SINGLE_QUOTED: {
        this._stateAttributeValueSingleQuoted(t);
        break;
      }
      case _.ATTRIBUTE_VALUE_UNQUOTED: {
        this._stateAttributeValueUnquoted(t);
        break;
      }
      case _.AFTER_ATTRIBUTE_VALUE_QUOTED: {
        this._stateAfterAttributeValueQuoted(t);
        break;
      }
      case _.SELF_CLOSING_START_TAG: {
        this._stateSelfClosingStartTag(t);
        break;
      }
      case _.BOGUS_COMMENT: {
        this._stateBogusComment(t);
        break;
      }
      case _.MARKUP_DECLARATION_OPEN: {
        this._stateMarkupDeclarationOpen(t);
        break;
      }
      case _.COMMENT_START: {
        this._stateCommentStart(t);
        break;
      }
      case _.COMMENT_START_DASH: {
        this._stateCommentStartDash(t);
        break;
      }
      case _.COMMENT: {
        this._stateComment(t);
        break;
      }
      case _.COMMENT_LESS_THAN_SIGN: {
        this._stateCommentLessThanSign(t);
        break;
      }
      case _.COMMENT_LESS_THAN_SIGN_BANG: {
        this._stateCommentLessThanSignBang(t);
        break;
      }
      case _.COMMENT_LESS_THAN_SIGN_BANG_DASH: {
        this._stateCommentLessThanSignBangDash(t);
        break;
      }
      case _.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH: {
        this._stateCommentLessThanSignBangDashDash(t);
        break;
      }
      case _.COMMENT_END_DASH: {
        this._stateCommentEndDash(t);
        break;
      }
      case _.COMMENT_END: {
        this._stateCommentEnd(t);
        break;
      }
      case _.COMMENT_END_BANG: {
        this._stateCommentEndBang(t);
        break;
      }
      case _.DOCTYPE: {
        this._stateDoctype(t);
        break;
      }
      case _.BEFORE_DOCTYPE_NAME: {
        this._stateBeforeDoctypeName(t);
        break;
      }
      case _.DOCTYPE_NAME: {
        this._stateDoctypeName(t);
        break;
      }
      case _.AFTER_DOCTYPE_NAME: {
        this._stateAfterDoctypeName(t);
        break;
      }
      case _.AFTER_DOCTYPE_PUBLIC_KEYWORD: {
        this._stateAfterDoctypePublicKeyword(t);
        break;
      }
      case _.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER: {
        this._stateBeforeDoctypePublicIdentifier(t);
        break;
      }
      case _.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED: {
        this._stateDoctypePublicIdentifierDoubleQuoted(t);
        break;
      }
      case _.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED: {
        this._stateDoctypePublicIdentifierSingleQuoted(t);
        break;
      }
      case _.AFTER_DOCTYPE_PUBLIC_IDENTIFIER: {
        this._stateAfterDoctypePublicIdentifier(t);
        break;
      }
      case _.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS: {
        this._stateBetweenDoctypePublicAndSystemIdentifiers(t);
        break;
      }
      case _.AFTER_DOCTYPE_SYSTEM_KEYWORD: {
        this._stateAfterDoctypeSystemKeyword(t);
        break;
      }
      case _.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER: {
        this._stateBeforeDoctypeSystemIdentifier(t);
        break;
      }
      case _.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED: {
        this._stateDoctypeSystemIdentifierDoubleQuoted(t);
        break;
      }
      case _.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED: {
        this._stateDoctypeSystemIdentifierSingleQuoted(t);
        break;
      }
      case _.AFTER_DOCTYPE_SYSTEM_IDENTIFIER: {
        this._stateAfterDoctypeSystemIdentifier(t);
        break;
      }
      case _.BOGUS_DOCTYPE: {
        this._stateBogusDoctype(t);
        break;
      }
      case _.CDATA_SECTION: {
        this._stateCdataSection(t);
        break;
      }
      case _.CDATA_SECTION_BRACKET: {
        this._stateCdataSectionBracket(t);
        break;
      }
      case _.CDATA_SECTION_END: {
        this._stateCdataSectionEnd(t);
        break;
      }
      case _.CHARACTER_REFERENCE: {
        this._stateCharacterReference(t);
        break;
      }
      case _.NAMED_CHARACTER_REFERENCE: {
        this._stateNamedCharacterReference(t);
        break;
      }
      case _.AMBIGUOUS_AMPERSAND: {
        this._stateAmbiguousAmpersand(t);
        break;
      }
      case _.NUMERIC_CHARACTER_REFERENCE: {
        this._stateNumericCharacterReference(t);
        break;
      }
      case _.HEXADEMICAL_CHARACTER_REFERENCE_START: {
        this._stateHexademicalCharacterReferenceStart(t);
        break;
      }
      case _.HEXADEMICAL_CHARACTER_REFERENCE: {
        this._stateHexademicalCharacterReference(t);
        break;
      }
      case _.DECIMAL_CHARACTER_REFERENCE: {
        this._stateDecimalCharacterReference(t);
        break;
      }
      case _.NUMERIC_CHARACTER_REFERENCE_END: {
        this._stateNumericCharacterReferenceEnd(t);
        break;
      }
      default:
        throw new Error("Unknown state");
    }
  }
  // State machine
  // Data state
  //------------------------------------------------------------------
  _stateData(t) {
    switch (t) {
      case T.CODE_POINTS.LESS_THAN_SIGN: {
        this.state = _.TAG_OPEN;
        break;
      }
      case T.CODE_POINTS.AMPERSAND: {
        this.returnState = _.DATA, this.state = _.CHARACTER_REFERENCE;
        break;
      }
      case T.CODE_POINTS.NULL: {
        this._err(F.ERR.unexpectedNullCharacter), this._emitCodePoint(t);
        break;
      }
      case T.CODE_POINTS.EOF: {
        this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(t);
    }
  }
  //  RCDATA state
  //------------------------------------------------------------------
  _stateRcdata(t) {
    switch (t) {
      case T.CODE_POINTS.AMPERSAND: {
        this.returnState = _.RCDATA, this.state = _.CHARACTER_REFERENCE;
        break;
      }
      case T.CODE_POINTS.LESS_THAN_SIGN: {
        this.state = _.RCDATA_LESS_THAN_SIGN;
        break;
      }
      case T.CODE_POINTS.NULL: {
        this._err(F.ERR.unexpectedNullCharacter), this._emitChars(T.REPLACEMENT_CHARACTER);
        break;
      }
      case T.CODE_POINTS.EOF: {
        this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(t);
    }
  }
  // RAWTEXT state
  //------------------------------------------------------------------
  _stateRawtext(t) {
    switch (t) {
      case T.CODE_POINTS.LESS_THAN_SIGN: {
        this.state = _.RAWTEXT_LESS_THAN_SIGN;
        break;
      }
      case T.CODE_POINTS.NULL: {
        this._err(F.ERR.unexpectedNullCharacter), this._emitChars(T.REPLACEMENT_CHARACTER);
        break;
      }
      case T.CODE_POINTS.EOF: {
        this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(t);
    }
  }
  // Script data state
  //------------------------------------------------------------------
  _stateScriptData(t) {
    switch (t) {
      case T.CODE_POINTS.LESS_THAN_SIGN: {
        this.state = _.SCRIPT_DATA_LESS_THAN_SIGN;
        break;
      }
      case T.CODE_POINTS.NULL: {
        this._err(F.ERR.unexpectedNullCharacter), this._emitChars(T.REPLACEMENT_CHARACTER);
        break;
      }
      case T.CODE_POINTS.EOF: {
        this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(t);
    }
  }
  // PLAINTEXT state
  //------------------------------------------------------------------
  _statePlaintext(t) {
    switch (t) {
      case T.CODE_POINTS.NULL: {
        this._err(F.ERR.unexpectedNullCharacter), this._emitChars(T.REPLACEMENT_CHARACTER);
        break;
      }
      case T.CODE_POINTS.EOF: {
        this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(t);
    }
  }
  // Tag open state
  //------------------------------------------------------------------
  _stateTagOpen(t) {
    if (Bt(t))
      this._createStartTagToken(), this.state = _.TAG_NAME, this._stateTagName(t);
    else
      switch (t) {
        case T.CODE_POINTS.EXCLAMATION_MARK: {
          this.state = _.MARKUP_DECLARATION_OPEN;
          break;
        }
        case T.CODE_POINTS.SOLIDUS: {
          this.state = _.END_TAG_OPEN;
          break;
        }
        case T.CODE_POINTS.QUESTION_MARK: {
          this._err(F.ERR.unexpectedQuestionMarkInsteadOfTagName), this._createCommentToken(1), this.state = _.BOGUS_COMMENT, this._stateBogusComment(t);
          break;
        }
        case T.CODE_POINTS.EOF: {
          this._err(F.ERR.eofBeforeTagName), this._emitChars("<"), this._emitEOFToken();
          break;
        }
        default:
          this._err(F.ERR.invalidFirstCharacterOfTagName), this._emitChars("<"), this.state = _.DATA, this._stateData(t);
      }
  }
  // End tag open state
  //------------------------------------------------------------------
  _stateEndTagOpen(t) {
    if (Bt(t))
      this._createEndTagToken(), this.state = _.TAG_NAME, this._stateTagName(t);
    else
      switch (t) {
        case T.CODE_POINTS.GREATER_THAN_SIGN: {
          this._err(F.ERR.missingEndTagName), this.state = _.DATA;
          break;
        }
        case T.CODE_POINTS.EOF: {
          this._err(F.ERR.eofBeforeTagName), this._emitChars("</"), this._emitEOFToken();
          break;
        }
        default:
          this._err(F.ERR.invalidFirstCharacterOfTagName), this._createCommentToken(2), this.state = _.BOGUS_COMMENT, this._stateBogusComment(t);
      }
  }
  // Tag name state
  //------------------------------------------------------------------
  _stateTagName(t) {
    const r = this.currentToken;
    switch (t) {
      case T.CODE_POINTS.SPACE:
      case T.CODE_POINTS.LINE_FEED:
      case T.CODE_POINTS.TABULATION:
      case T.CODE_POINTS.FORM_FEED: {
        this.state = _.BEFORE_ATTRIBUTE_NAME;
        break;
      }
      case T.CODE_POINTS.SOLIDUS: {
        this.state = _.SELF_CLOSING_START_TAG;
        break;
      }
      case T.CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = _.DATA, this.emitCurrentTagToken();
        break;
      }
      case T.CODE_POINTS.NULL: {
        this._err(F.ERR.unexpectedNullCharacter), r.tagName += T.REPLACEMENT_CHARACTER;
        break;
      }
      case T.CODE_POINTS.EOF: {
        this._err(F.ERR.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        r.tagName += String.fromCodePoint(Vr(t) ? Dn(t) : t);
    }
  }
  // RCDATA less-than sign state
  //------------------------------------------------------------------
  _stateRcdataLessThanSign(t) {
    t === T.CODE_POINTS.SOLIDUS ? this.state = _.RCDATA_END_TAG_OPEN : (this._emitChars("<"), this.state = _.RCDATA, this._stateRcdata(t));
  }
  // RCDATA end tag open state
  //------------------------------------------------------------------
  _stateRcdataEndTagOpen(t) {
    Bt(t) ? (this.state = _.RCDATA_END_TAG_NAME, this._stateRcdataEndTagName(t)) : (this._emitChars("</"), this.state = _.RCDATA, this._stateRcdata(t));
  }
  handleSpecialEndTag(t) {
    if (!this.preprocessor.startsWith(this.lastStartTagName, !1))
      return !this._ensureHibernation();
    this._createEndTagToken();
    const r = this.currentToken;
    switch (r.tagName = this.lastStartTagName, this.preprocessor.peek(this.lastStartTagName.length)) {
      case T.CODE_POINTS.SPACE:
      case T.CODE_POINTS.LINE_FEED:
      case T.CODE_POINTS.TABULATION:
      case T.CODE_POINTS.FORM_FEED:
        return this._advanceBy(this.lastStartTagName.length), this.state = _.BEFORE_ATTRIBUTE_NAME, !1;
      case T.CODE_POINTS.SOLIDUS:
        return this._advanceBy(this.lastStartTagName.length), this.state = _.SELF_CLOSING_START_TAG, !1;
      case T.CODE_POINTS.GREATER_THAN_SIGN:
        return this._advanceBy(this.lastStartTagName.length), this.emitCurrentTagToken(), this.state = _.DATA, !1;
      default:
        return !this._ensureHibernation();
    }
  }
  // RCDATA end tag name state
  //------------------------------------------------------------------
  _stateRcdataEndTagName(t) {
    this.handleSpecialEndTag(t) && (this._emitChars("</"), this.state = _.RCDATA, this._stateRcdata(t));
  }
  // RAWTEXT less-than sign state
  //------------------------------------------------------------------
  _stateRawtextLessThanSign(t) {
    t === T.CODE_POINTS.SOLIDUS ? this.state = _.RAWTEXT_END_TAG_OPEN : (this._emitChars("<"), this.state = _.RAWTEXT, this._stateRawtext(t));
  }
  // RAWTEXT end tag open state
  //------------------------------------------------------------------
  _stateRawtextEndTagOpen(t) {
    Bt(t) ? (this.state = _.RAWTEXT_END_TAG_NAME, this._stateRawtextEndTagName(t)) : (this._emitChars("</"), this.state = _.RAWTEXT, this._stateRawtext(t));
  }
  // RAWTEXT end tag name state
  //------------------------------------------------------------------
  _stateRawtextEndTagName(t) {
    this.handleSpecialEndTag(t) && (this._emitChars("</"), this.state = _.RAWTEXT, this._stateRawtext(t));
  }
  // Script data less-than sign state
  //------------------------------------------------------------------
  _stateScriptDataLessThanSign(t) {
    switch (t) {
      case T.CODE_POINTS.SOLIDUS: {
        this.state = _.SCRIPT_DATA_END_TAG_OPEN;
        break;
      }
      case T.CODE_POINTS.EXCLAMATION_MARK: {
        this.state = _.SCRIPT_DATA_ESCAPE_START, this._emitChars("<!");
        break;
      }
      default:
        this._emitChars("<"), this.state = _.SCRIPT_DATA, this._stateScriptData(t);
    }
  }
  // Script data end tag open state
  //------------------------------------------------------------------
  _stateScriptDataEndTagOpen(t) {
    Bt(t) ? (this.state = _.SCRIPT_DATA_END_TAG_NAME, this._stateScriptDataEndTagName(t)) : (this._emitChars("</"), this.state = _.SCRIPT_DATA, this._stateScriptData(t));
  }
  // Script data end tag name state
  //------------------------------------------------------------------
  _stateScriptDataEndTagName(t) {
    this.handleSpecialEndTag(t) && (this._emitChars("</"), this.state = _.SCRIPT_DATA, this._stateScriptData(t));
  }
  // Script data escape start state
  //------------------------------------------------------------------
  _stateScriptDataEscapeStart(t) {
    t === T.CODE_POINTS.HYPHEN_MINUS ? (this.state = _.SCRIPT_DATA_ESCAPE_START_DASH, this._emitChars("-")) : (this.state = _.SCRIPT_DATA, this._stateScriptData(t));
  }
  // Script data escape start dash state
  //------------------------------------------------------------------
  _stateScriptDataEscapeStartDash(t) {
    t === T.CODE_POINTS.HYPHEN_MINUS ? (this.state = _.SCRIPT_DATA_ESCAPED_DASH_DASH, this._emitChars("-")) : (this.state = _.SCRIPT_DATA, this._stateScriptData(t));
  }
  // Script data escaped state
  //------------------------------------------------------------------
  _stateScriptDataEscaped(t) {
    switch (t) {
      case T.CODE_POINTS.HYPHEN_MINUS: {
        this.state = _.SCRIPT_DATA_ESCAPED_DASH, this._emitChars("-");
        break;
      }
      case T.CODE_POINTS.LESS_THAN_SIGN: {
        this.state = _.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
        break;
      }
      case T.CODE_POINTS.NULL: {
        this._err(F.ERR.unexpectedNullCharacter), this._emitChars(T.REPLACEMENT_CHARACTER);
        break;
      }
      case T.CODE_POINTS.EOF: {
        this._err(F.ERR.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(t);
    }
  }
  // Script data escaped dash state
  //------------------------------------------------------------------
  _stateScriptDataEscapedDash(t) {
    switch (t) {
      case T.CODE_POINTS.HYPHEN_MINUS: {
        this.state = _.SCRIPT_DATA_ESCAPED_DASH_DASH, this._emitChars("-");
        break;
      }
      case T.CODE_POINTS.LESS_THAN_SIGN: {
        this.state = _.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
        break;
      }
      case T.CODE_POINTS.NULL: {
        this._err(F.ERR.unexpectedNullCharacter), this.state = _.SCRIPT_DATA_ESCAPED, this._emitChars(T.REPLACEMENT_CHARACTER);
        break;
      }
      case T.CODE_POINTS.EOF: {
        this._err(F.ERR.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this.state = _.SCRIPT_DATA_ESCAPED, this._emitCodePoint(t);
    }
  }
  // Script data escaped dash dash state
  //------------------------------------------------------------------
  _stateScriptDataEscapedDashDash(t) {
    switch (t) {
      case T.CODE_POINTS.HYPHEN_MINUS: {
        this._emitChars("-");
        break;
      }
      case T.CODE_POINTS.LESS_THAN_SIGN: {
        this.state = _.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
        break;
      }
      case T.CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = _.SCRIPT_DATA, this._emitChars(">");
        break;
      }
      case T.CODE_POINTS.NULL: {
        this._err(F.ERR.unexpectedNullCharacter), this.state = _.SCRIPT_DATA_ESCAPED, this._emitChars(T.REPLACEMENT_CHARACTER);
        break;
      }
      case T.CODE_POINTS.EOF: {
        this._err(F.ERR.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this.state = _.SCRIPT_DATA_ESCAPED, this._emitCodePoint(t);
    }
  }
  // Script data escaped less-than sign state
  //------------------------------------------------------------------
  _stateScriptDataEscapedLessThanSign(t) {
    t === T.CODE_POINTS.SOLIDUS ? this.state = _.SCRIPT_DATA_ESCAPED_END_TAG_OPEN : Bt(t) ? (this._emitChars("<"), this.state = _.SCRIPT_DATA_DOUBLE_ESCAPE_START, this._stateScriptDataDoubleEscapeStart(t)) : (this._emitChars("<"), this.state = _.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(t));
  }
  // Script data escaped end tag open state
  //------------------------------------------------------------------
  _stateScriptDataEscapedEndTagOpen(t) {
    Bt(t) ? (this.state = _.SCRIPT_DATA_ESCAPED_END_TAG_NAME, this._stateScriptDataEscapedEndTagName(t)) : (this._emitChars("</"), this.state = _.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(t));
  }
  // Script data escaped end tag name state
  //------------------------------------------------------------------
  _stateScriptDataEscapedEndTagName(t) {
    this.handleSpecialEndTag(t) && (this._emitChars("</"), this.state = _.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(t));
  }
  // Script data double escape start state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapeStart(t) {
    if (this.preprocessor.startsWith(T.SEQUENCES.SCRIPT, !1) && ju(this.preprocessor.peek(T.SEQUENCES.SCRIPT.length))) {
      this._emitCodePoint(t);
      for (let r = 0; r < T.SEQUENCES.SCRIPT.length; r++)
        this._emitCodePoint(this._consume());
      this.state = _.SCRIPT_DATA_DOUBLE_ESCAPED;
    } else
      this._ensureHibernation() || (this.state = _.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(t));
  }
  // Script data double escaped state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscaped(t) {
    switch (t) {
      case T.CODE_POINTS.HYPHEN_MINUS: {
        this.state = _.SCRIPT_DATA_DOUBLE_ESCAPED_DASH, this._emitChars("-");
        break;
      }
      case T.CODE_POINTS.LESS_THAN_SIGN: {
        this.state = _.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN, this._emitChars("<");
        break;
      }
      case T.CODE_POINTS.NULL: {
        this._err(F.ERR.unexpectedNullCharacter), this._emitChars(T.REPLACEMENT_CHARACTER);
        break;
      }
      case T.CODE_POINTS.EOF: {
        this._err(F.ERR.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(t);
    }
  }
  // Script data double escaped dash state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapedDash(t) {
    switch (t) {
      case T.CODE_POINTS.HYPHEN_MINUS: {
        this.state = _.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH, this._emitChars("-");
        break;
      }
      case T.CODE_POINTS.LESS_THAN_SIGN: {
        this.state = _.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN, this._emitChars("<");
        break;
      }
      case T.CODE_POINTS.NULL: {
        this._err(F.ERR.unexpectedNullCharacter), this.state = _.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitChars(T.REPLACEMENT_CHARACTER);
        break;
      }
      case T.CODE_POINTS.EOF: {
        this._err(F.ERR.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this.state = _.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitCodePoint(t);
    }
  }
  // Script data double escaped dash dash state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapedDashDash(t) {
    switch (t) {
      case T.CODE_POINTS.HYPHEN_MINUS: {
        this._emitChars("-");
        break;
      }
      case T.CODE_POINTS.LESS_THAN_SIGN: {
        this.state = _.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN, this._emitChars("<");
        break;
      }
      case T.CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = _.SCRIPT_DATA, this._emitChars(">");
        break;
      }
      case T.CODE_POINTS.NULL: {
        this._err(F.ERR.unexpectedNullCharacter), this.state = _.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitChars(T.REPLACEMENT_CHARACTER);
        break;
      }
      case T.CODE_POINTS.EOF: {
        this._err(F.ERR.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this.state = _.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitCodePoint(t);
    }
  }
  // Script data double escaped less-than sign state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapedLessThanSign(t) {
    t === T.CODE_POINTS.SOLIDUS ? (this.state = _.SCRIPT_DATA_DOUBLE_ESCAPE_END, this._emitChars("/")) : (this.state = _.SCRIPT_DATA_DOUBLE_ESCAPED, this._stateScriptDataDoubleEscaped(t));
  }
  // Script data double escape end state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapeEnd(t) {
    if (this.preprocessor.startsWith(T.SEQUENCES.SCRIPT, !1) && ju(this.preprocessor.peek(T.SEQUENCES.SCRIPT.length))) {
      this._emitCodePoint(t);
      for (let r = 0; r < T.SEQUENCES.SCRIPT.length; r++)
        this._emitCodePoint(this._consume());
      this.state = _.SCRIPT_DATA_ESCAPED;
    } else
      this._ensureHibernation() || (this.state = _.SCRIPT_DATA_DOUBLE_ESCAPED, this._stateScriptDataDoubleEscaped(t));
  }
  // Before attribute name state
  //------------------------------------------------------------------
  _stateBeforeAttributeName(t) {
    switch (t) {
      case T.CODE_POINTS.SPACE:
      case T.CODE_POINTS.LINE_FEED:
      case T.CODE_POINTS.TABULATION:
      case T.CODE_POINTS.FORM_FEED:
        break;
      case T.CODE_POINTS.SOLIDUS:
      case T.CODE_POINTS.GREATER_THAN_SIGN:
      case T.CODE_POINTS.EOF: {
        this.state = _.AFTER_ATTRIBUTE_NAME, this._stateAfterAttributeName(t);
        break;
      }
      case T.CODE_POINTS.EQUALS_SIGN: {
        this._err(F.ERR.unexpectedEqualsSignBeforeAttributeName), this._createAttr("="), this.state = _.ATTRIBUTE_NAME;
        break;
      }
      default:
        this._createAttr(""), this.state = _.ATTRIBUTE_NAME, this._stateAttributeName(t);
    }
  }
  // Attribute name state
  //------------------------------------------------------------------
  _stateAttributeName(t) {
    switch (t) {
      case T.CODE_POINTS.SPACE:
      case T.CODE_POINTS.LINE_FEED:
      case T.CODE_POINTS.TABULATION:
      case T.CODE_POINTS.FORM_FEED:
      case T.CODE_POINTS.SOLIDUS:
      case T.CODE_POINTS.GREATER_THAN_SIGN:
      case T.CODE_POINTS.EOF: {
        this._leaveAttrName(), this.state = _.AFTER_ATTRIBUTE_NAME, this._stateAfterAttributeName(t);
        break;
      }
      case T.CODE_POINTS.EQUALS_SIGN: {
        this._leaveAttrName(), this.state = _.BEFORE_ATTRIBUTE_VALUE;
        break;
      }
      case T.CODE_POINTS.QUOTATION_MARK:
      case T.CODE_POINTS.APOSTROPHE:
      case T.CODE_POINTS.LESS_THAN_SIGN: {
        this._err(F.ERR.unexpectedCharacterInAttributeName), this.currentAttr.name += String.fromCodePoint(t);
        break;
      }
      case T.CODE_POINTS.NULL: {
        this._err(F.ERR.unexpectedNullCharacter), this.currentAttr.name += T.REPLACEMENT_CHARACTER;
        break;
      }
      default:
        this.currentAttr.name += String.fromCodePoint(Vr(t) ? Dn(t) : t);
    }
  }
  // After attribute name state
  //------------------------------------------------------------------
  _stateAfterAttributeName(t) {
    switch (t) {
      case T.CODE_POINTS.SPACE:
      case T.CODE_POINTS.LINE_FEED:
      case T.CODE_POINTS.TABULATION:
      case T.CODE_POINTS.FORM_FEED:
        break;
      case T.CODE_POINTS.SOLIDUS: {
        this.state = _.SELF_CLOSING_START_TAG;
        break;
      }
      case T.CODE_POINTS.EQUALS_SIGN: {
        this.state = _.BEFORE_ATTRIBUTE_VALUE;
        break;
      }
      case T.CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = _.DATA, this.emitCurrentTagToken();
        break;
      }
      case T.CODE_POINTS.EOF: {
        this._err(F.ERR.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this._createAttr(""), this.state = _.ATTRIBUTE_NAME, this._stateAttributeName(t);
    }
  }
  // Before attribute value state
  //------------------------------------------------------------------
  _stateBeforeAttributeValue(t) {
    switch (t) {
      case T.CODE_POINTS.SPACE:
      case T.CODE_POINTS.LINE_FEED:
      case T.CODE_POINTS.TABULATION:
      case T.CODE_POINTS.FORM_FEED:
        break;
      case T.CODE_POINTS.QUOTATION_MARK: {
        this.state = _.ATTRIBUTE_VALUE_DOUBLE_QUOTED;
        break;
      }
      case T.CODE_POINTS.APOSTROPHE: {
        this.state = _.ATTRIBUTE_VALUE_SINGLE_QUOTED;
        break;
      }
      case T.CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(F.ERR.missingAttributeValue), this.state = _.DATA, this.emitCurrentTagToken();
        break;
      }
      default:
        this.state = _.ATTRIBUTE_VALUE_UNQUOTED, this._stateAttributeValueUnquoted(t);
    }
  }
  // Attribute value (double-quoted) state
  //------------------------------------------------------------------
  _stateAttributeValueDoubleQuoted(t) {
    switch (t) {
      case T.CODE_POINTS.QUOTATION_MARK: {
        this.state = _.AFTER_ATTRIBUTE_VALUE_QUOTED;
        break;
      }
      case T.CODE_POINTS.AMPERSAND: {
        this.returnState = _.ATTRIBUTE_VALUE_DOUBLE_QUOTED, this.state = _.CHARACTER_REFERENCE;
        break;
      }
      case T.CODE_POINTS.NULL: {
        this._err(F.ERR.unexpectedNullCharacter), this.currentAttr.value += T.REPLACEMENT_CHARACTER;
        break;
      }
      case T.CODE_POINTS.EOF: {
        this._err(F.ERR.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this.currentAttr.value += String.fromCodePoint(t);
    }
  }
  // Attribute value (single-quoted) state
  //------------------------------------------------------------------
  _stateAttributeValueSingleQuoted(t) {
    switch (t) {
      case T.CODE_POINTS.APOSTROPHE: {
        this.state = _.AFTER_ATTRIBUTE_VALUE_QUOTED;
        break;
      }
      case T.CODE_POINTS.AMPERSAND: {
        this.returnState = _.ATTRIBUTE_VALUE_SINGLE_QUOTED, this.state = _.CHARACTER_REFERENCE;
        break;
      }
      case T.CODE_POINTS.NULL: {
        this._err(F.ERR.unexpectedNullCharacter), this.currentAttr.value += T.REPLACEMENT_CHARACTER;
        break;
      }
      case T.CODE_POINTS.EOF: {
        this._err(F.ERR.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this.currentAttr.value += String.fromCodePoint(t);
    }
  }
  // Attribute value (unquoted) state
  //------------------------------------------------------------------
  _stateAttributeValueUnquoted(t) {
    switch (t) {
      case T.CODE_POINTS.SPACE:
      case T.CODE_POINTS.LINE_FEED:
      case T.CODE_POINTS.TABULATION:
      case T.CODE_POINTS.FORM_FEED: {
        this._leaveAttrValue(), this.state = _.BEFORE_ATTRIBUTE_NAME;
        break;
      }
      case T.CODE_POINTS.AMPERSAND: {
        this.returnState = _.ATTRIBUTE_VALUE_UNQUOTED, this.state = _.CHARACTER_REFERENCE;
        break;
      }
      case T.CODE_POINTS.GREATER_THAN_SIGN: {
        this._leaveAttrValue(), this.state = _.DATA, this.emitCurrentTagToken();
        break;
      }
      case T.CODE_POINTS.NULL: {
        this._err(F.ERR.unexpectedNullCharacter), this.currentAttr.value += T.REPLACEMENT_CHARACTER;
        break;
      }
      case T.CODE_POINTS.QUOTATION_MARK:
      case T.CODE_POINTS.APOSTROPHE:
      case T.CODE_POINTS.LESS_THAN_SIGN:
      case T.CODE_POINTS.EQUALS_SIGN:
      case T.CODE_POINTS.GRAVE_ACCENT: {
        this._err(F.ERR.unexpectedCharacterInUnquotedAttributeValue), this.currentAttr.value += String.fromCodePoint(t);
        break;
      }
      case T.CODE_POINTS.EOF: {
        this._err(F.ERR.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this.currentAttr.value += String.fromCodePoint(t);
    }
  }
  // After attribute value (quoted) state
  //------------------------------------------------------------------
  _stateAfterAttributeValueQuoted(t) {
    switch (t) {
      case T.CODE_POINTS.SPACE:
      case T.CODE_POINTS.LINE_FEED:
      case T.CODE_POINTS.TABULATION:
      case T.CODE_POINTS.FORM_FEED: {
        this._leaveAttrValue(), this.state = _.BEFORE_ATTRIBUTE_NAME;
        break;
      }
      case T.CODE_POINTS.SOLIDUS: {
        this._leaveAttrValue(), this.state = _.SELF_CLOSING_START_TAG;
        break;
      }
      case T.CODE_POINTS.GREATER_THAN_SIGN: {
        this._leaveAttrValue(), this.state = _.DATA, this.emitCurrentTagToken();
        break;
      }
      case T.CODE_POINTS.EOF: {
        this._err(F.ERR.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this._err(F.ERR.missingWhitespaceBetweenAttributes), this.state = _.BEFORE_ATTRIBUTE_NAME, this._stateBeforeAttributeName(t);
    }
  }
  // Self-closing start tag state
  //------------------------------------------------------------------
  _stateSelfClosingStartTag(t) {
    switch (t) {
      case T.CODE_POINTS.GREATER_THAN_SIGN: {
        const r = this.currentToken;
        r.selfClosing = !0, this.state = _.DATA, this.emitCurrentTagToken();
        break;
      }
      case T.CODE_POINTS.EOF: {
        this._err(F.ERR.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this._err(F.ERR.unexpectedSolidusInTag), this.state = _.BEFORE_ATTRIBUTE_NAME, this._stateBeforeAttributeName(t);
    }
  }
  // Bogus comment state
  //------------------------------------------------------------------
  _stateBogusComment(t) {
    const r = this.currentToken;
    switch (t) {
      case T.CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = _.DATA, this.emitCurrentComment(r);
        break;
      }
      case T.CODE_POINTS.EOF: {
        this.emitCurrentComment(r), this._emitEOFToken();
        break;
      }
      case T.CODE_POINTS.NULL: {
        this._err(F.ERR.unexpectedNullCharacter), r.data += T.REPLACEMENT_CHARACTER;
        break;
      }
      default:
        r.data += String.fromCodePoint(t);
    }
  }
  // Markup declaration open state
  //------------------------------------------------------------------
  _stateMarkupDeclarationOpen(t) {
    this._consumeSequenceIfMatch(T.SEQUENCES.DASH_DASH, !0) ? (this._createCommentToken(T.SEQUENCES.DASH_DASH.length + 1), this.state = _.COMMENT_START) : this._consumeSequenceIfMatch(T.SEQUENCES.DOCTYPE, !1) ? (this.currentLocation = this.getCurrentLocation(T.SEQUENCES.DOCTYPE.length + 1), this.state = _.DOCTYPE) : this._consumeSequenceIfMatch(T.SEQUENCES.CDATA_START, !0) ? this.inForeignNode ? this.state = _.CDATA_SECTION : (this._err(F.ERR.cdataInHtmlContent), this._createCommentToken(T.SEQUENCES.CDATA_START.length + 1), this.currentToken.data = "[CDATA[", this.state = _.BOGUS_COMMENT) : this._ensureHibernation() || (this._err(F.ERR.incorrectlyOpenedComment), this._createCommentToken(2), this.state = _.BOGUS_COMMENT, this._stateBogusComment(t));
  }
  // Comment start state
  //------------------------------------------------------------------
  _stateCommentStart(t) {
    switch (t) {
      case T.CODE_POINTS.HYPHEN_MINUS: {
        this.state = _.COMMENT_START_DASH;
        break;
      }
      case T.CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(F.ERR.abruptClosingOfEmptyComment), this.state = _.DATA;
        const r = this.currentToken;
        this.emitCurrentComment(r);
        break;
      }
      default:
        this.state = _.COMMENT, this._stateComment(t);
    }
  }
  // Comment start dash state
  //------------------------------------------------------------------
  _stateCommentStartDash(t) {
    const r = this.currentToken;
    switch (t) {
      case T.CODE_POINTS.HYPHEN_MINUS: {
        this.state = _.COMMENT_END;
        break;
      }
      case T.CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(F.ERR.abruptClosingOfEmptyComment), this.state = _.DATA, this.emitCurrentComment(r);
        break;
      }
      case T.CODE_POINTS.EOF: {
        this._err(F.ERR.eofInComment), this.emitCurrentComment(r), this._emitEOFToken();
        break;
      }
      default:
        r.data += "-", this.state = _.COMMENT, this._stateComment(t);
    }
  }
  // Comment state
  //------------------------------------------------------------------
  _stateComment(t) {
    const r = this.currentToken;
    switch (t) {
      case T.CODE_POINTS.HYPHEN_MINUS: {
        this.state = _.COMMENT_END_DASH;
        break;
      }
      case T.CODE_POINTS.LESS_THAN_SIGN: {
        r.data += "<", this.state = _.COMMENT_LESS_THAN_SIGN;
        break;
      }
      case T.CODE_POINTS.NULL: {
        this._err(F.ERR.unexpectedNullCharacter), r.data += T.REPLACEMENT_CHARACTER;
        break;
      }
      case T.CODE_POINTS.EOF: {
        this._err(F.ERR.eofInComment), this.emitCurrentComment(r), this._emitEOFToken();
        break;
      }
      default:
        r.data += String.fromCodePoint(t);
    }
  }
  // Comment less-than sign state
  //------------------------------------------------------------------
  _stateCommentLessThanSign(t) {
    const r = this.currentToken;
    switch (t) {
      case T.CODE_POINTS.EXCLAMATION_MARK: {
        r.data += "!", this.state = _.COMMENT_LESS_THAN_SIGN_BANG;
        break;
      }
      case T.CODE_POINTS.LESS_THAN_SIGN: {
        r.data += "<";
        break;
      }
      default:
        this.state = _.COMMENT, this._stateComment(t);
    }
  }
  // Comment less-than sign bang state
  //------------------------------------------------------------------
  _stateCommentLessThanSignBang(t) {
    t === T.CODE_POINTS.HYPHEN_MINUS ? this.state = _.COMMENT_LESS_THAN_SIGN_BANG_DASH : (this.state = _.COMMENT, this._stateComment(t));
  }
  // Comment less-than sign bang dash state
  //------------------------------------------------------------------
  _stateCommentLessThanSignBangDash(t) {
    t === T.CODE_POINTS.HYPHEN_MINUS ? this.state = _.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH : (this.state = _.COMMENT_END_DASH, this._stateCommentEndDash(t));
  }
  // Comment less-than sign bang dash dash state
  //------------------------------------------------------------------
  _stateCommentLessThanSignBangDashDash(t) {
    t !== T.CODE_POINTS.GREATER_THAN_SIGN && t !== T.CODE_POINTS.EOF && this._err(F.ERR.nestedComment), this.state = _.COMMENT_END, this._stateCommentEnd(t);
  }
  // Comment end dash state
  //------------------------------------------------------------------
  _stateCommentEndDash(t) {
    const r = this.currentToken;
    switch (t) {
      case T.CODE_POINTS.HYPHEN_MINUS: {
        this.state = _.COMMENT_END;
        break;
      }
      case T.CODE_POINTS.EOF: {
        this._err(F.ERR.eofInComment), this.emitCurrentComment(r), this._emitEOFToken();
        break;
      }
      default:
        r.data += "-", this.state = _.COMMENT, this._stateComment(t);
    }
  }
  // Comment end state
  //------------------------------------------------------------------
  _stateCommentEnd(t) {
    const r = this.currentToken;
    switch (t) {
      case T.CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = _.DATA, this.emitCurrentComment(r);
        break;
      }
      case T.CODE_POINTS.EXCLAMATION_MARK: {
        this.state = _.COMMENT_END_BANG;
        break;
      }
      case T.CODE_POINTS.HYPHEN_MINUS: {
        r.data += "-";
        break;
      }
      case T.CODE_POINTS.EOF: {
        this._err(F.ERR.eofInComment), this.emitCurrentComment(r), this._emitEOFToken();
        break;
      }
      default:
        r.data += "--", this.state = _.COMMENT, this._stateComment(t);
    }
  }
  // Comment end bang state
  //------------------------------------------------------------------
  _stateCommentEndBang(t) {
    const r = this.currentToken;
    switch (t) {
      case T.CODE_POINTS.HYPHEN_MINUS: {
        r.data += "--!", this.state = _.COMMENT_END_DASH;
        break;
      }
      case T.CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(F.ERR.incorrectlyClosedComment), this.state = _.DATA, this.emitCurrentComment(r);
        break;
      }
      case T.CODE_POINTS.EOF: {
        this._err(F.ERR.eofInComment), this.emitCurrentComment(r), this._emitEOFToken();
        break;
      }
      default:
        r.data += "--!", this.state = _.COMMENT, this._stateComment(t);
    }
  }
  // DOCTYPE state
  //------------------------------------------------------------------
  _stateDoctype(t) {
    switch (t) {
      case T.CODE_POINTS.SPACE:
      case T.CODE_POINTS.LINE_FEED:
      case T.CODE_POINTS.TABULATION:
      case T.CODE_POINTS.FORM_FEED: {
        this.state = _.BEFORE_DOCTYPE_NAME;
        break;
      }
      case T.CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = _.BEFORE_DOCTYPE_NAME, this._stateBeforeDoctypeName(t);
        break;
      }
      case T.CODE_POINTS.EOF: {
        this._err(F.ERR.eofInDoctype), this._createDoctypeToken(null);
        const r = this.currentToken;
        r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
      default:
        this._err(F.ERR.missingWhitespaceBeforeDoctypeName), this.state = _.BEFORE_DOCTYPE_NAME, this._stateBeforeDoctypeName(t);
    }
  }
  // Before DOCTYPE name state
  //------------------------------------------------------------------
  _stateBeforeDoctypeName(t) {
    if (Vr(t))
      this._createDoctypeToken(String.fromCharCode(Dn(t))), this.state = _.DOCTYPE_NAME;
    else
      switch (t) {
        case T.CODE_POINTS.SPACE:
        case T.CODE_POINTS.LINE_FEED:
        case T.CODE_POINTS.TABULATION:
        case T.CODE_POINTS.FORM_FEED:
          break;
        case T.CODE_POINTS.NULL: {
          this._err(F.ERR.unexpectedNullCharacter), this._createDoctypeToken(T.REPLACEMENT_CHARACTER), this.state = _.DOCTYPE_NAME;
          break;
        }
        case T.CODE_POINTS.GREATER_THAN_SIGN: {
          this._err(F.ERR.missingDoctypeName), this._createDoctypeToken(null);
          const r = this.currentToken;
          r.forceQuirks = !0, this.emitCurrentDoctype(r), this.state = _.DATA;
          break;
        }
        case T.CODE_POINTS.EOF: {
          this._err(F.ERR.eofInDoctype), this._createDoctypeToken(null);
          const r = this.currentToken;
          r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
          break;
        }
        default:
          this._createDoctypeToken(String.fromCodePoint(t)), this.state = _.DOCTYPE_NAME;
      }
  }
  // DOCTYPE name state
  //------------------------------------------------------------------
  _stateDoctypeName(t) {
    const r = this.currentToken;
    switch (t) {
      case T.CODE_POINTS.SPACE:
      case T.CODE_POINTS.LINE_FEED:
      case T.CODE_POINTS.TABULATION:
      case T.CODE_POINTS.FORM_FEED: {
        this.state = _.AFTER_DOCTYPE_NAME;
        break;
      }
      case T.CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = _.DATA, this.emitCurrentDoctype(r);
        break;
      }
      case T.CODE_POINTS.NULL: {
        this._err(F.ERR.unexpectedNullCharacter), r.name += T.REPLACEMENT_CHARACTER;
        break;
      }
      case T.CODE_POINTS.EOF: {
        this._err(F.ERR.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
      default:
        r.name += String.fromCodePoint(Vr(t) ? Dn(t) : t);
    }
  }
  // After DOCTYPE name state
  //------------------------------------------------------------------
  _stateAfterDoctypeName(t) {
    const r = this.currentToken;
    switch (t) {
      case T.CODE_POINTS.SPACE:
      case T.CODE_POINTS.LINE_FEED:
      case T.CODE_POINTS.TABULATION:
      case T.CODE_POINTS.FORM_FEED:
        break;
      case T.CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = _.DATA, this.emitCurrentDoctype(r);
        break;
      }
      case T.CODE_POINTS.EOF: {
        this._err(F.ERR.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
      default:
        this._consumeSequenceIfMatch(T.SEQUENCES.PUBLIC, !1) ? this.state = _.AFTER_DOCTYPE_PUBLIC_KEYWORD : this._consumeSequenceIfMatch(T.SEQUENCES.SYSTEM, !1) ? this.state = _.AFTER_DOCTYPE_SYSTEM_KEYWORD : this._ensureHibernation() || (this._err(F.ERR.invalidCharacterSequenceAfterDoctypeName), r.forceQuirks = !0, this.state = _.BOGUS_DOCTYPE, this._stateBogusDoctype(t));
    }
  }
  // After DOCTYPE public keyword state
  //------------------------------------------------------------------
  _stateAfterDoctypePublicKeyword(t) {
    const r = this.currentToken;
    switch (t) {
      case T.CODE_POINTS.SPACE:
      case T.CODE_POINTS.LINE_FEED:
      case T.CODE_POINTS.TABULATION:
      case T.CODE_POINTS.FORM_FEED: {
        this.state = _.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER;
        break;
      }
      case T.CODE_POINTS.QUOTATION_MARK: {
        this._err(F.ERR.missingWhitespaceAfterDoctypePublicKeyword), r.publicId = "", this.state = _.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case T.CODE_POINTS.APOSTROPHE: {
        this._err(F.ERR.missingWhitespaceAfterDoctypePublicKeyword), r.publicId = "", this.state = _.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case T.CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(F.ERR.missingDoctypePublicIdentifier), r.forceQuirks = !0, this.state = _.DATA, this.emitCurrentDoctype(r);
        break;
      }
      case T.CODE_POINTS.EOF: {
        this._err(F.ERR.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
      default:
        this._err(F.ERR.missingQuoteBeforeDoctypePublicIdentifier), r.forceQuirks = !0, this.state = _.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
    }
  }
  // Before DOCTYPE public identifier state
  //------------------------------------------------------------------
  _stateBeforeDoctypePublicIdentifier(t) {
    const r = this.currentToken;
    switch (t) {
      case T.CODE_POINTS.SPACE:
      case T.CODE_POINTS.LINE_FEED:
      case T.CODE_POINTS.TABULATION:
      case T.CODE_POINTS.FORM_FEED:
        break;
      case T.CODE_POINTS.QUOTATION_MARK: {
        r.publicId = "", this.state = _.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case T.CODE_POINTS.APOSTROPHE: {
        r.publicId = "", this.state = _.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case T.CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(F.ERR.missingDoctypePublicIdentifier), r.forceQuirks = !0, this.state = _.DATA, this.emitCurrentDoctype(r);
        break;
      }
      case T.CODE_POINTS.EOF: {
        this._err(F.ERR.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
      default:
        this._err(F.ERR.missingQuoteBeforeDoctypePublicIdentifier), r.forceQuirks = !0, this.state = _.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
    }
  }
  // DOCTYPE public identifier (double-quoted) state
  //------------------------------------------------------------------
  _stateDoctypePublicIdentifierDoubleQuoted(t) {
    const r = this.currentToken;
    switch (t) {
      case T.CODE_POINTS.QUOTATION_MARK: {
        this.state = _.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
        break;
      }
      case T.CODE_POINTS.NULL: {
        this._err(F.ERR.unexpectedNullCharacter), r.publicId += T.REPLACEMENT_CHARACTER;
        break;
      }
      case T.CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(F.ERR.abruptDoctypePublicIdentifier), r.forceQuirks = !0, this.emitCurrentDoctype(r), this.state = _.DATA;
        break;
      }
      case T.CODE_POINTS.EOF: {
        this._err(F.ERR.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
      default:
        r.publicId += String.fromCodePoint(t);
    }
  }
  // DOCTYPE public identifier (single-quoted) state
  //------------------------------------------------------------------
  _stateDoctypePublicIdentifierSingleQuoted(t) {
    const r = this.currentToken;
    switch (t) {
      case T.CODE_POINTS.APOSTROPHE: {
        this.state = _.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
        break;
      }
      case T.CODE_POINTS.NULL: {
        this._err(F.ERR.unexpectedNullCharacter), r.publicId += T.REPLACEMENT_CHARACTER;
        break;
      }
      case T.CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(F.ERR.abruptDoctypePublicIdentifier), r.forceQuirks = !0, this.emitCurrentDoctype(r), this.state = _.DATA;
        break;
      }
      case T.CODE_POINTS.EOF: {
        this._err(F.ERR.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
      default:
        r.publicId += String.fromCodePoint(t);
    }
  }
  // After DOCTYPE public identifier state
  //------------------------------------------------------------------
  _stateAfterDoctypePublicIdentifier(t) {
    const r = this.currentToken;
    switch (t) {
      case T.CODE_POINTS.SPACE:
      case T.CODE_POINTS.LINE_FEED:
      case T.CODE_POINTS.TABULATION:
      case T.CODE_POINTS.FORM_FEED: {
        this.state = _.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS;
        break;
      }
      case T.CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = _.DATA, this.emitCurrentDoctype(r);
        break;
      }
      case T.CODE_POINTS.QUOTATION_MARK: {
        this._err(F.ERR.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers), r.systemId = "", this.state = _.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case T.CODE_POINTS.APOSTROPHE: {
        this._err(F.ERR.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers), r.systemId = "", this.state = _.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case T.CODE_POINTS.EOF: {
        this._err(F.ERR.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
      default:
        this._err(F.ERR.missingQuoteBeforeDoctypeSystemIdentifier), r.forceQuirks = !0, this.state = _.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
    }
  }
  // Between DOCTYPE public and system identifiers state
  //------------------------------------------------------------------
  _stateBetweenDoctypePublicAndSystemIdentifiers(t) {
    const r = this.currentToken;
    switch (t) {
      case T.CODE_POINTS.SPACE:
      case T.CODE_POINTS.LINE_FEED:
      case T.CODE_POINTS.TABULATION:
      case T.CODE_POINTS.FORM_FEED:
        break;
      case T.CODE_POINTS.GREATER_THAN_SIGN: {
        this.emitCurrentDoctype(r), this.state = _.DATA;
        break;
      }
      case T.CODE_POINTS.QUOTATION_MARK: {
        r.systemId = "", this.state = _.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case T.CODE_POINTS.APOSTROPHE: {
        r.systemId = "", this.state = _.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case T.CODE_POINTS.EOF: {
        this._err(F.ERR.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
      default:
        this._err(F.ERR.missingQuoteBeforeDoctypeSystemIdentifier), r.forceQuirks = !0, this.state = _.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
    }
  }
  // After DOCTYPE system keyword state
  //------------------------------------------------------------------
  _stateAfterDoctypeSystemKeyword(t) {
    const r = this.currentToken;
    switch (t) {
      case T.CODE_POINTS.SPACE:
      case T.CODE_POINTS.LINE_FEED:
      case T.CODE_POINTS.TABULATION:
      case T.CODE_POINTS.FORM_FEED: {
        this.state = _.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER;
        break;
      }
      case T.CODE_POINTS.QUOTATION_MARK: {
        this._err(F.ERR.missingWhitespaceAfterDoctypeSystemKeyword), r.systemId = "", this.state = _.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case T.CODE_POINTS.APOSTROPHE: {
        this._err(F.ERR.missingWhitespaceAfterDoctypeSystemKeyword), r.systemId = "", this.state = _.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case T.CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(F.ERR.missingDoctypeSystemIdentifier), r.forceQuirks = !0, this.state = _.DATA, this.emitCurrentDoctype(r);
        break;
      }
      case T.CODE_POINTS.EOF: {
        this._err(F.ERR.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
      default:
        this._err(F.ERR.missingQuoteBeforeDoctypeSystemIdentifier), r.forceQuirks = !0, this.state = _.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
    }
  }
  // Before DOCTYPE system identifier state
  //------------------------------------------------------------------
  _stateBeforeDoctypeSystemIdentifier(t) {
    const r = this.currentToken;
    switch (t) {
      case T.CODE_POINTS.SPACE:
      case T.CODE_POINTS.LINE_FEED:
      case T.CODE_POINTS.TABULATION:
      case T.CODE_POINTS.FORM_FEED:
        break;
      case T.CODE_POINTS.QUOTATION_MARK: {
        r.systemId = "", this.state = _.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case T.CODE_POINTS.APOSTROPHE: {
        r.systemId = "", this.state = _.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case T.CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(F.ERR.missingDoctypeSystemIdentifier), r.forceQuirks = !0, this.state = _.DATA, this.emitCurrentDoctype(r);
        break;
      }
      case T.CODE_POINTS.EOF: {
        this._err(F.ERR.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
      default:
        this._err(F.ERR.missingQuoteBeforeDoctypeSystemIdentifier), r.forceQuirks = !0, this.state = _.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
    }
  }
  // DOCTYPE system identifier (double-quoted) state
  //------------------------------------------------------------------
  _stateDoctypeSystemIdentifierDoubleQuoted(t) {
    const r = this.currentToken;
    switch (t) {
      case T.CODE_POINTS.QUOTATION_MARK: {
        this.state = _.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
        break;
      }
      case T.CODE_POINTS.NULL: {
        this._err(F.ERR.unexpectedNullCharacter), r.systemId += T.REPLACEMENT_CHARACTER;
        break;
      }
      case T.CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(F.ERR.abruptDoctypeSystemIdentifier), r.forceQuirks = !0, this.emitCurrentDoctype(r), this.state = _.DATA;
        break;
      }
      case T.CODE_POINTS.EOF: {
        this._err(F.ERR.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
      default:
        r.systemId += String.fromCodePoint(t);
    }
  }
  // DOCTYPE system identifier (single-quoted) state
  //------------------------------------------------------------------
  _stateDoctypeSystemIdentifierSingleQuoted(t) {
    const r = this.currentToken;
    switch (t) {
      case T.CODE_POINTS.APOSTROPHE: {
        this.state = _.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
        break;
      }
      case T.CODE_POINTS.NULL: {
        this._err(F.ERR.unexpectedNullCharacter), r.systemId += T.REPLACEMENT_CHARACTER;
        break;
      }
      case T.CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(F.ERR.abruptDoctypeSystemIdentifier), r.forceQuirks = !0, this.emitCurrentDoctype(r), this.state = _.DATA;
        break;
      }
      case T.CODE_POINTS.EOF: {
        this._err(F.ERR.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
      default:
        r.systemId += String.fromCodePoint(t);
    }
  }
  // After DOCTYPE system identifier state
  //------------------------------------------------------------------
  _stateAfterDoctypeSystemIdentifier(t) {
    const r = this.currentToken;
    switch (t) {
      case T.CODE_POINTS.SPACE:
      case T.CODE_POINTS.LINE_FEED:
      case T.CODE_POINTS.TABULATION:
      case T.CODE_POINTS.FORM_FEED:
        break;
      case T.CODE_POINTS.GREATER_THAN_SIGN: {
        this.emitCurrentDoctype(r), this.state = _.DATA;
        break;
      }
      case T.CODE_POINTS.EOF: {
        this._err(F.ERR.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
      default:
        this._err(F.ERR.unexpectedCharacterAfterDoctypeSystemIdentifier), this.state = _.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
    }
  }
  // Bogus DOCTYPE state
  //------------------------------------------------------------------
  _stateBogusDoctype(t) {
    const r = this.currentToken;
    switch (t) {
      case T.CODE_POINTS.GREATER_THAN_SIGN: {
        this.emitCurrentDoctype(r), this.state = _.DATA;
        break;
      }
      case T.CODE_POINTS.NULL: {
        this._err(F.ERR.unexpectedNullCharacter);
        break;
      }
      case T.CODE_POINTS.EOF: {
        this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
    }
  }
  // CDATA section state
  //------------------------------------------------------------------
  _stateCdataSection(t) {
    switch (t) {
      case T.CODE_POINTS.RIGHT_SQUARE_BRACKET: {
        this.state = _.CDATA_SECTION_BRACKET;
        break;
      }
      case T.CODE_POINTS.EOF: {
        this._err(F.ERR.eofInCdata), this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(t);
    }
  }
  // CDATA section bracket state
  //------------------------------------------------------------------
  _stateCdataSectionBracket(t) {
    t === T.CODE_POINTS.RIGHT_SQUARE_BRACKET ? this.state = _.CDATA_SECTION_END : (this._emitChars("]"), this.state = _.CDATA_SECTION, this._stateCdataSection(t));
  }
  // CDATA section end state
  //------------------------------------------------------------------
  _stateCdataSectionEnd(t) {
    switch (t) {
      case T.CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = _.DATA;
        break;
      }
      case T.CODE_POINTS.RIGHT_SQUARE_BRACKET: {
        this._emitChars("]");
        break;
      }
      default:
        this._emitChars("]]"), this.state = _.CDATA_SECTION, this._stateCdataSection(t);
    }
  }
  // Character reference state
  //------------------------------------------------------------------
  _stateCharacterReference(t) {
    t === T.CODE_POINTS.NUMBER_SIGN ? this.state = _.NUMERIC_CHARACTER_REFERENCE : Ei(t) ? (this.state = _.NAMED_CHARACTER_REFERENCE, this._stateNamedCharacterReference(t)) : (this._flushCodePointConsumedAsCharacterReference(T.CODE_POINTS.AMPERSAND), this._reconsumeInState(this.returnState, t));
  }
  // Named character reference state
  //------------------------------------------------------------------
  _stateNamedCharacterReference(t) {
    const r = this._matchNamedCharacterReference(t);
    if (!this._ensureHibernation())
      if (r) {
        for (let n = 0; n < r.length; n++)
          this._flushCodePointConsumedAsCharacterReference(r[n]);
        this.state = this.returnState;
      } else
        this._flushCodePointConsumedAsCharacterReference(T.CODE_POINTS.AMPERSAND), this.state = _.AMBIGUOUS_AMPERSAND;
  }
  // Ambiguos ampersand state
  //------------------------------------------------------------------
  _stateAmbiguousAmpersand(t) {
    Ei(t) ? this._flushCodePointConsumedAsCharacterReference(t) : (t === T.CODE_POINTS.SEMICOLON && this._err(F.ERR.unknownNamedCharacterReference), this._reconsumeInState(this.returnState, t));
  }
  // Numeric character reference state
  //------------------------------------------------------------------
  _stateNumericCharacterReference(t) {
    this.charRefCode = 0, t === T.CODE_POINTS.LATIN_SMALL_X || t === T.CODE_POINTS.LATIN_CAPITAL_X ? this.state = _.HEXADEMICAL_CHARACTER_REFERENCE_START : Wr(t) ? (this.state = _.DECIMAL_CHARACTER_REFERENCE, this._stateDecimalCharacterReference(t)) : (this._err(F.ERR.absenceOfDigitsInNumericCharacterReference), this._flushCodePointConsumedAsCharacterReference(T.CODE_POINTS.AMPERSAND), this._flushCodePointConsumedAsCharacterReference(T.CODE_POINTS.NUMBER_SIGN), this._reconsumeInState(this.returnState, t));
  }
  // Hexademical character reference start state
  //------------------------------------------------------------------
  _stateHexademicalCharacterReferenceStart(t) {
    Ih(t) ? (this.state = _.HEXADEMICAL_CHARACTER_REFERENCE, this._stateHexademicalCharacterReference(t)) : (this._err(F.ERR.absenceOfDigitsInNumericCharacterReference), this._flushCodePointConsumedAsCharacterReference(T.CODE_POINTS.AMPERSAND), this._flushCodePointConsumedAsCharacterReference(T.CODE_POINTS.NUMBER_SIGN), this._unconsume(2), this.state = this.returnState);
  }
  // Hexademical character reference state
  //------------------------------------------------------------------
  _stateHexademicalCharacterReference(t) {
    Xo(t) ? this.charRefCode = this.charRefCode * 16 + t - 55 : zo(t) ? this.charRefCode = this.charRefCode * 16 + t - 87 : Wr(t) ? this.charRefCode = this.charRefCode * 16 + t - 48 : t === T.CODE_POINTS.SEMICOLON ? this.state = _.NUMERIC_CHARACTER_REFERENCE_END : (this._err(F.ERR.missingSemicolonAfterCharacterReference), this.state = _.NUMERIC_CHARACTER_REFERENCE_END, this._stateNumericCharacterReferenceEnd(t));
  }
  // Decimal character reference state
  //------------------------------------------------------------------
  _stateDecimalCharacterReference(t) {
    Wr(t) ? this.charRefCode = this.charRefCode * 10 + t - 48 : t === T.CODE_POINTS.SEMICOLON ? this.state = _.NUMERIC_CHARACTER_REFERENCE_END : (this._err(F.ERR.missingSemicolonAfterCharacterReference), this.state = _.NUMERIC_CHARACTER_REFERENCE_END, this._stateNumericCharacterReferenceEnd(t));
  }
  // Numeric character reference end state
  //------------------------------------------------------------------
  _stateNumericCharacterReferenceEnd(t) {
    if (this.charRefCode === T.CODE_POINTS.NULL)
      this._err(F.ERR.nullCharacterReference), this.charRefCode = T.CODE_POINTS.REPLACEMENT_CHARACTER;
    else if (this.charRefCode > 1114111)
      this._err(F.ERR.characterReferenceOutsideUnicodeRange), this.charRefCode = T.CODE_POINTS.REPLACEMENT_CHARACTER;
    else if ((0, T.isSurrogate)(this.charRefCode))
      this._err(F.ERR.surrogateCharacterReference), this.charRefCode = T.CODE_POINTS.REPLACEMENT_CHARACTER;
    else if ((0, T.isUndefinedCodePoint)(this.charRefCode))
      this._err(F.ERR.noncharacterCharacterReference);
    else if ((0, T.isControlCodePoint)(this.charRefCode) || this.charRefCode === T.CODE_POINTS.CARRIAGE_RETURN) {
      this._err(F.ERR.controlCharacterReference);
      const r = bh.get(this.charRefCode);
      r !== void 0 && (this.charRefCode = r);
    }
    this._flushCodePointConsumedAsCharacterReference(this.charRefCode), this._reconsumeInState(this.returnState, t);
  }
};
zt.Tokenizer = Ch;
var Ea = {};
Object.defineProperty(Ea, "__esModule", { value: !0 });
Ea.OpenElementStack = void 0;
const U = Rt, Zo = /* @__PURE__ */ new Set([U.TAG_ID.DD, U.TAG_ID.DT, U.TAG_ID.LI, U.TAG_ID.OPTGROUP, U.TAG_ID.OPTION, U.TAG_ID.P, U.TAG_ID.RB, U.TAG_ID.RP, U.TAG_ID.RT, U.TAG_ID.RTC]), qu = /* @__PURE__ */ new Set([
  ...Zo,
  U.TAG_ID.CAPTION,
  U.TAG_ID.COLGROUP,
  U.TAG_ID.TBODY,
  U.TAG_ID.TD,
  U.TAG_ID.TFOOT,
  U.TAG_ID.TH,
  U.TAG_ID.THEAD,
  U.TAG_ID.TR
]), Sn = /* @__PURE__ */ new Map([
  [U.TAG_ID.APPLET, U.NS.HTML],
  [U.TAG_ID.CAPTION, U.NS.HTML],
  [U.TAG_ID.HTML, U.NS.HTML],
  [U.TAG_ID.MARQUEE, U.NS.HTML],
  [U.TAG_ID.OBJECT, U.NS.HTML],
  [U.TAG_ID.TABLE, U.NS.HTML],
  [U.TAG_ID.TD, U.NS.HTML],
  [U.TAG_ID.TEMPLATE, U.NS.HTML],
  [U.TAG_ID.TH, U.NS.HTML],
  [U.TAG_ID.ANNOTATION_XML, U.NS.MATHML],
  [U.TAG_ID.MI, U.NS.MATHML],
  [U.TAG_ID.MN, U.NS.MATHML],
  [U.TAG_ID.MO, U.NS.MATHML],
  [U.TAG_ID.MS, U.NS.MATHML],
  [U.TAG_ID.MTEXT, U.NS.MATHML],
  [U.TAG_ID.DESC, U.NS.SVG],
  [U.TAG_ID.FOREIGN_OBJECT, U.NS.SVG],
  [U.TAG_ID.TITLE, U.NS.SVG]
]), Nh = [U.TAG_ID.H1, U.TAG_ID.H2, U.TAG_ID.H3, U.TAG_ID.H4, U.TAG_ID.H5, U.TAG_ID.H6], Dh = [U.TAG_ID.TR, U.TAG_ID.TEMPLATE, U.TAG_ID.HTML], Sh = [U.TAG_ID.TBODY, U.TAG_ID.TFOOT, U.TAG_ID.THEAD, U.TAG_ID.TEMPLATE, U.TAG_ID.HTML], Oh = [U.TAG_ID.TABLE, U.TAG_ID.TEMPLATE, U.TAG_ID.HTML], vh = [U.TAG_ID.TD, U.TAG_ID.TH];
class Rh {
  get currentTmplContentOrNode() {
    return this._isInTemplate() ? this.treeAdapter.getTemplateContent(this.current) : this.current;
  }
  constructor(t, r, n) {
    this.treeAdapter = r, this.handler = n, this.items = [], this.tagIDs = [], this.stackTop = -1, this.tmplCount = 0, this.currentTagId = U.TAG_ID.UNKNOWN, this.current = t;
  }
  //Index of element
  _indexOf(t) {
    return this.items.lastIndexOf(t, this.stackTop);
  }
  //Update current element
  _isInTemplate() {
    return this.currentTagId === U.TAG_ID.TEMPLATE && this.treeAdapter.getNamespaceURI(this.current) === U.NS.HTML;
  }
  _updateCurrentElement() {
    this.current = this.items[this.stackTop], this.currentTagId = this.tagIDs[this.stackTop];
  }
  //Mutations
  push(t, r) {
    this.stackTop++, this.items[this.stackTop] = t, this.current = t, this.tagIDs[this.stackTop] = r, this.currentTagId = r, this._isInTemplate() && this.tmplCount++, this.handler.onItemPush(t, r, !0);
  }
  pop() {
    const t = this.current;
    this.tmplCount > 0 && this._isInTemplate() && this.tmplCount--, this.stackTop--, this._updateCurrentElement(), this.handler.onItemPop(t, !0);
  }
  replace(t, r) {
    const n = this._indexOf(t);
    this.items[n] = r, n === this.stackTop && (this.current = r);
  }
  insertAfter(t, r, n) {
    const a = this._indexOf(t) + 1;
    this.items.splice(a, 0, r), this.tagIDs.splice(a, 0, n), this.stackTop++, a === this.stackTop && this._updateCurrentElement(), this.handler.onItemPush(this.current, this.currentTagId, a === this.stackTop);
  }
  popUntilTagNamePopped(t) {
    let r = this.stackTop + 1;
    do
      r = this.tagIDs.lastIndexOf(t, r - 1);
    while (r > 0 && this.treeAdapter.getNamespaceURI(this.items[r]) !== U.NS.HTML);
    this.shortenToLength(r < 0 ? 0 : r);
  }
  shortenToLength(t) {
    for (; this.stackTop >= t; ) {
      const r = this.current;
      this.tmplCount > 0 && this._isInTemplate() && (this.tmplCount -= 1), this.stackTop--, this._updateCurrentElement(), this.handler.onItemPop(r, this.stackTop < t);
    }
  }
  popUntilElementPopped(t) {
    const r = this._indexOf(t);
    this.shortenToLength(r < 0 ? 0 : r);
  }
  popUntilPopped(t, r) {
    const n = this._indexOfTagNames(t, r);
    this.shortenToLength(n < 0 ? 0 : n);
  }
  popUntilNumberedHeaderPopped() {
    this.popUntilPopped(Nh, U.NS.HTML);
  }
  popUntilTableCellPopped() {
    this.popUntilPopped(vh, U.NS.HTML);
  }
  popAllUpToHtmlElement() {
    this.tmplCount = 0, this.shortenToLength(1);
  }
  _indexOfTagNames(t, r) {
    for (let n = this.stackTop; n >= 0; n--)
      if (t.includes(this.tagIDs[n]) && this.treeAdapter.getNamespaceURI(this.items[n]) === r)
        return n;
    return -1;
  }
  clearBackTo(t, r) {
    const n = this._indexOfTagNames(t, r);
    this.shortenToLength(n + 1);
  }
  clearBackToTableContext() {
    this.clearBackTo(Oh, U.NS.HTML);
  }
  clearBackToTableBodyContext() {
    this.clearBackTo(Sh, U.NS.HTML);
  }
  clearBackToTableRowContext() {
    this.clearBackTo(Dh, U.NS.HTML);
  }
  remove(t) {
    const r = this._indexOf(t);
    r >= 0 && (r === this.stackTop ? this.pop() : (this.items.splice(r, 1), this.tagIDs.splice(r, 1), this.stackTop--, this._updateCurrentElement(), this.handler.onItemPop(t, !1)));
  }
  //Search
  tryPeekProperlyNestedBodyElement() {
    return this.stackTop >= 1 && this.tagIDs[1] === U.TAG_ID.BODY ? this.items[1] : null;
  }
  contains(t) {
    return this._indexOf(t) > -1;
  }
  getCommonAncestor(t) {
    const r = this._indexOf(t) - 1;
    return r >= 0 ? this.items[r] : null;
  }
  isRootHtmlElementCurrent() {
    return this.stackTop === 0 && this.tagIDs[0] === U.TAG_ID.HTML;
  }
  //Element in scope
  hasInScope(t) {
    for (let r = this.stackTop; r >= 0; r--) {
      const n = this.tagIDs[r], a = this.treeAdapter.getNamespaceURI(this.items[r]);
      if (n === t && a === U.NS.HTML)
        return !0;
      if (Sn.get(n) === a)
        return !1;
    }
    return !0;
  }
  hasNumberedHeaderInScope() {
    for (let t = this.stackTop; t >= 0; t--) {
      const r = this.tagIDs[t], n = this.treeAdapter.getNamespaceURI(this.items[t]);
      if ((0, U.isNumberedHeader)(r) && n === U.NS.HTML)
        return !0;
      if (Sn.get(r) === n)
        return !1;
    }
    return !0;
  }
  hasInListItemScope(t) {
    for (let r = this.stackTop; r >= 0; r--) {
      const n = this.tagIDs[r], a = this.treeAdapter.getNamespaceURI(this.items[r]);
      if (n === t && a === U.NS.HTML)
        return !0;
      if ((n === U.TAG_ID.UL || n === U.TAG_ID.OL) && a === U.NS.HTML || Sn.get(n) === a)
        return !1;
    }
    return !0;
  }
  hasInButtonScope(t) {
    for (let r = this.stackTop; r >= 0; r--) {
      const n = this.tagIDs[r], a = this.treeAdapter.getNamespaceURI(this.items[r]);
      if (n === t && a === U.NS.HTML)
        return !0;
      if (n === U.TAG_ID.BUTTON && a === U.NS.HTML || Sn.get(n) === a)
        return !1;
    }
    return !0;
  }
  hasInTableScope(t) {
    for (let r = this.stackTop; r >= 0; r--) {
      const n = this.tagIDs[r];
      if (this.treeAdapter.getNamespaceURI(this.items[r]) === U.NS.HTML) {
        if (n === t)
          return !0;
        if (n === U.TAG_ID.TABLE || n === U.TAG_ID.TEMPLATE || n === U.TAG_ID.HTML)
          return !1;
      }
    }
    return !0;
  }
  hasTableBodyContextInTableScope() {
    for (let t = this.stackTop; t >= 0; t--) {
      const r = this.tagIDs[t];
      if (this.treeAdapter.getNamespaceURI(this.items[t]) === U.NS.HTML) {
        if (r === U.TAG_ID.TBODY || r === U.TAG_ID.THEAD || r === U.TAG_ID.TFOOT)
          return !0;
        if (r === U.TAG_ID.TABLE || r === U.TAG_ID.HTML)
          return !1;
      }
    }
    return !0;
  }
  hasInSelectScope(t) {
    for (let r = this.stackTop; r >= 0; r--) {
      const n = this.tagIDs[r];
      if (this.treeAdapter.getNamespaceURI(this.items[r]) === U.NS.HTML) {
        if (n === t)
          return !0;
        if (n !== U.TAG_ID.OPTION && n !== U.TAG_ID.OPTGROUP)
          return !1;
      }
    }
    return !0;
  }
  //Implied end tags
  generateImpliedEndTags() {
    for (; Zo.has(this.currentTagId); )
      this.pop();
  }
  generateImpliedEndTagsThoroughly() {
    for (; qu.has(this.currentTagId); )
      this.pop();
  }
  generateImpliedEndTagsWithExclusion(t) {
    for (; this.currentTagId !== t && qu.has(this.currentTagId); )
      this.pop();
  }
}
Ea.OpenElementStack = Rh;
var Jo = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.FormattingElementList = e.EntryType = void 0;
  const t = 3;
  var r;
  (function(i) {
    i[i.Marker = 0] = "Marker", i[i.Element = 1] = "Element";
  })(r = e.EntryType || (e.EntryType = {}));
  const n = { type: r.Marker };
  class a {
    constructor(u) {
      this.treeAdapter = u, this.entries = [], this.bookmark = null;
    }
    //Noah Ark's condition
    //OPTIMIZATION: at first we try to find possible candidates for exclusion using
    //lightweight heuristics without thorough attributes check.
    _getNoahArkConditionCandidates(u, o) {
      const c = [], h = o.length, s = this.treeAdapter.getTagName(u), g = this.treeAdapter.getNamespaceURI(u);
      for (let p = 0; p < this.entries.length; p++) {
        const m = this.entries[p];
        if (m.type === r.Marker)
          break;
        const { element: b } = m;
        if (this.treeAdapter.getTagName(b) === s && this.treeAdapter.getNamespaceURI(b) === g) {
          const R = this.treeAdapter.getAttrList(b);
          R.length === h && c.push({ idx: p, attrs: R });
        }
      }
      return c;
    }
    _ensureNoahArkCondition(u) {
      if (this.entries.length < t)
        return;
      const o = this.treeAdapter.getAttrList(u), c = this._getNoahArkConditionCandidates(u, o);
      if (c.length < t)
        return;
      const h = new Map(o.map((g) => [g.name, g.value]));
      let s = 0;
      for (let g = 0; g < c.length; g++) {
        const p = c[g];
        p.attrs.every((m) => h.get(m.name) === m.value) && (s += 1, s >= t && this.entries.splice(p.idx, 1));
      }
    }
    //Mutations
    insertMarker() {
      this.entries.unshift(n);
    }
    pushElement(u, o) {
      this._ensureNoahArkCondition(u), this.entries.unshift({
        type: r.Element,
        element: u,
        token: o
      });
    }
    insertElementAfterBookmark(u, o) {
      const c = this.entries.indexOf(this.bookmark);
      this.entries.splice(c, 0, {
        type: r.Element,
        element: u,
        token: o
      });
    }
    removeEntry(u) {
      const o = this.entries.indexOf(u);
      o >= 0 && this.entries.splice(o, 1);
    }
    /**
     * Clears the list of formatting elements up to the last marker.
     *
     * @see https://html.spec.whatwg.org/multipage/parsing.html#clear-the-list-of-active-formatting-elements-up-to-the-last-marker
     */
    clearToLastMarker() {
      const u = this.entries.indexOf(n);
      u >= 0 ? this.entries.splice(0, u + 1) : this.entries.length = 0;
    }
    //Search
    getElementEntryInScopeWithTagName(u) {
      const o = this.entries.find((c) => c.type === r.Marker || this.treeAdapter.getTagName(c.element) === u);
      return o && o.type === r.Element ? o : null;
    }
    getElementEntry(u) {
      return this.entries.find((o) => o.type === r.Element && o.element === u);
    }
  }
  e.FormattingElementList = a;
})(Jo);
var Ta = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.defaultTreeAdapter = void 0;
  const t = Rt;
  function r(n) {
    return {
      nodeName: "#text",
      value: n,
      parentNode: null
    };
  }
  e.defaultTreeAdapter = {
    //Node construction
    createDocument() {
      return {
        nodeName: "#document",
        mode: t.DOCUMENT_MODE.NO_QUIRKS,
        childNodes: []
      };
    },
    createDocumentFragment() {
      return {
        nodeName: "#document-fragment",
        childNodes: []
      };
    },
    createElement(n, a, i) {
      return {
        nodeName: n,
        tagName: n,
        attrs: i,
        namespaceURI: a,
        childNodes: [],
        parentNode: null
      };
    },
    createCommentNode(n) {
      return {
        nodeName: "#comment",
        data: n,
        parentNode: null
      };
    },
    //Tree mutation
    appendChild(n, a) {
      n.childNodes.push(a), a.parentNode = n;
    },
    insertBefore(n, a, i) {
      const u = n.childNodes.indexOf(i);
      n.childNodes.splice(u, 0, a), a.parentNode = n;
    },
    setTemplateContent(n, a) {
      n.content = a;
    },
    getTemplateContent(n) {
      return n.content;
    },
    setDocumentType(n, a, i, u) {
      const o = n.childNodes.find((c) => c.nodeName === "#documentType");
      if (o)
        o.name = a, o.publicId = i, o.systemId = u;
      else {
        const c = {
          nodeName: "#documentType",
          name: a,
          publicId: i,
          systemId: u,
          parentNode: null
        };
        e.defaultTreeAdapter.appendChild(n, c);
      }
    },
    setDocumentMode(n, a) {
      n.mode = a;
    },
    getDocumentMode(n) {
      return n.mode;
    },
    detachNode(n) {
      if (n.parentNode) {
        const a = n.parentNode.childNodes.indexOf(n);
        n.parentNode.childNodes.splice(a, 1), n.parentNode = null;
      }
    },
    insertText(n, a) {
      if (n.childNodes.length > 0) {
        const i = n.childNodes[n.childNodes.length - 1];
        if (e.defaultTreeAdapter.isTextNode(i)) {
          i.value += a;
          return;
        }
      }
      e.defaultTreeAdapter.appendChild(n, r(a));
    },
    insertTextBefore(n, a, i) {
      const u = n.childNodes[n.childNodes.indexOf(i) - 1];
      u && e.defaultTreeAdapter.isTextNode(u) ? u.value += a : e.defaultTreeAdapter.insertBefore(n, r(a), i);
    },
    adoptAttributes(n, a) {
      const i = new Set(n.attrs.map((u) => u.name));
      for (let u = 0; u < a.length; u++)
        i.has(a[u].name) || n.attrs.push(a[u]);
    },
    //Tree traversing
    getFirstChild(n) {
      return n.childNodes[0];
    },
    getChildNodes(n) {
      return n.childNodes;
    },
    getParentNode(n) {
      return n.parentNode;
    },
    getAttrList(n) {
      return n.attrs;
    },
    //Node data
    getTagName(n) {
      return n.tagName;
    },
    getNamespaceURI(n) {
      return n.namespaceURI;
    },
    getTextNodeContent(n) {
      return n.value;
    },
    getCommentNodeContent(n) {
      return n.data;
    },
    getDocumentTypeNodeName(n) {
      return n.name;
    },
    getDocumentTypeNodePublicId(n) {
      return n.publicId;
    },
    getDocumentTypeNodeSystemId(n) {
      return n.systemId;
    },
    //Node types
    isTextNode(n) {
      return n.nodeName === "#text";
    },
    isCommentNode(n) {
      return n.nodeName === "#comment";
    },
    isDocumentTypeNode(n) {
      return n.nodeName === "#documentType";
    },
    isElementNode(n) {
      return Object.prototype.hasOwnProperty.call(n, "tagName");
    },
    // Source code location
    setNodeSourceCodeLocation(n, a) {
      n.sourceCodeLocation = a;
    },
    getNodeSourceCodeLocation(n) {
      return n.sourceCodeLocation;
    },
    updateNodeSourceCodeLocation(n, a) {
      n.sourceCodeLocation = Object.assign(Object.assign({}, n.sourceCodeLocation), a);
    }
  };
})(Ta);
var Or = {};
Object.defineProperty(Or, "__esModule", { value: !0 });
Or.getDocumentMode = Or.isConforming = void 0;
const ir = Rt, ec = "html", Ph = "about:legacy-compat", Lh = "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd", tc = [
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
], xh = [
  ...tc,
  "-//w3c//dtd html 4.01 frameset//",
  "-//w3c//dtd html 4.01 transitional//"
], wh = /* @__PURE__ */ new Set([
  "-//w3o//dtd w3 html strict 3.0//en//",
  "-/w3c/dtd html 4.0 transitional/en",
  "html"
]), rc = ["-//w3c//dtd xhtml 1.0 frameset//", "-//w3c//dtd xhtml 1.0 transitional//"], Mh = [
  ...rc,
  "-//w3c//dtd html 4.01 frameset//",
  "-//w3c//dtd html 4.01 transitional//"
];
function Yu(e, t) {
  return t.some((r) => e.startsWith(r));
}
function Bh(e) {
  return e.name === ec && e.publicId === null && (e.systemId === null || e.systemId === Ph);
}
Or.isConforming = Bh;
function kh(e) {
  if (e.name !== ec)
    return ir.DOCUMENT_MODE.QUIRKS;
  const { systemId: t } = e;
  if (t && t.toLowerCase() === Lh)
    return ir.DOCUMENT_MODE.QUIRKS;
  let { publicId: r } = e;
  if (r !== null) {
    if (r = r.toLowerCase(), wh.has(r))
      return ir.DOCUMENT_MODE.QUIRKS;
    let n = t === null ? xh : tc;
    if (Yu(r, n))
      return ir.DOCUMENT_MODE.QUIRKS;
    if (n = t === null ? rc : Mh, Yu(r, n))
      return ir.DOCUMENT_MODE.LIMITED_QUIRKS;
  }
  return ir.DOCUMENT_MODE.NO_QUIRKS;
}
Or.getDocumentMode = kh;
var ru = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.isIntegrationPoint = e.adjustTokenSVGTagName = e.adjustTokenXMLAttrs = e.adjustTokenSVGAttrs = e.adjustTokenMathMLAttrs = e.causesExit = e.SVG_TAG_NAMES_ADJUSTMENT_MAP = void 0;
  const t = Rt, r = {
    TEXT_HTML: "text/html",
    APPLICATION_XML: "application/xhtml+xml"
  }, n = "definitionurl", a = "definitionURL", i = new Map([
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
  ].map((C) => [C.toLowerCase(), C])), u = /* @__PURE__ */ new Map([
    ["xlink:actuate", { prefix: "xlink", name: "actuate", namespace: t.NS.XLINK }],
    ["xlink:arcrole", { prefix: "xlink", name: "arcrole", namespace: t.NS.XLINK }],
    ["xlink:href", { prefix: "xlink", name: "href", namespace: t.NS.XLINK }],
    ["xlink:role", { prefix: "xlink", name: "role", namespace: t.NS.XLINK }],
    ["xlink:show", { prefix: "xlink", name: "show", namespace: t.NS.XLINK }],
    ["xlink:title", { prefix: "xlink", name: "title", namespace: t.NS.XLINK }],
    ["xlink:type", { prefix: "xlink", name: "type", namespace: t.NS.XLINK }],
    ["xml:base", { prefix: "xml", name: "base", namespace: t.NS.XML }],
    ["xml:lang", { prefix: "xml", name: "lang", namespace: t.NS.XML }],
    ["xml:space", { prefix: "xml", name: "space", namespace: t.NS.XML }],
    ["xmlns", { prefix: "", name: "xmlns", namespace: t.NS.XMLNS }],
    ["xmlns:xlink", { prefix: "xmlns", name: "xlink", namespace: t.NS.XMLNS }]
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
  ].map((C) => [C.toLowerCase(), C]));
  const o = /* @__PURE__ */ new Set([
    t.TAG_ID.B,
    t.TAG_ID.BIG,
    t.TAG_ID.BLOCKQUOTE,
    t.TAG_ID.BODY,
    t.TAG_ID.BR,
    t.TAG_ID.CENTER,
    t.TAG_ID.CODE,
    t.TAG_ID.DD,
    t.TAG_ID.DIV,
    t.TAG_ID.DL,
    t.TAG_ID.DT,
    t.TAG_ID.EM,
    t.TAG_ID.EMBED,
    t.TAG_ID.H1,
    t.TAG_ID.H2,
    t.TAG_ID.H3,
    t.TAG_ID.H4,
    t.TAG_ID.H5,
    t.TAG_ID.H6,
    t.TAG_ID.HEAD,
    t.TAG_ID.HR,
    t.TAG_ID.I,
    t.TAG_ID.IMG,
    t.TAG_ID.LI,
    t.TAG_ID.LISTING,
    t.TAG_ID.MENU,
    t.TAG_ID.META,
    t.TAG_ID.NOBR,
    t.TAG_ID.OL,
    t.TAG_ID.P,
    t.TAG_ID.PRE,
    t.TAG_ID.RUBY,
    t.TAG_ID.S,
    t.TAG_ID.SMALL,
    t.TAG_ID.SPAN,
    t.TAG_ID.STRONG,
    t.TAG_ID.STRIKE,
    t.TAG_ID.SUB,
    t.TAG_ID.SUP,
    t.TAG_ID.TABLE,
    t.TAG_ID.TT,
    t.TAG_ID.U,
    t.TAG_ID.UL,
    t.TAG_ID.VAR
  ]);
  function c(C) {
    const D = C.tagID;
    return D === t.TAG_ID.FONT && C.attrs.some(({ name: B }) => B === t.ATTRS.COLOR || B === t.ATTRS.SIZE || B === t.ATTRS.FACE) || o.has(D);
  }
  e.causesExit = c;
  function h(C) {
    for (let D = 0; D < C.attrs.length; D++)
      if (C.attrs[D].name === n) {
        C.attrs[D].name = a;
        break;
      }
  }
  e.adjustTokenMathMLAttrs = h;
  function s(C) {
    for (let D = 0; D < C.attrs.length; D++) {
      const S = i.get(C.attrs[D].name);
      S != null && (C.attrs[D].name = S);
    }
  }
  e.adjustTokenSVGAttrs = s;
  function g(C) {
    for (let D = 0; D < C.attrs.length; D++) {
      const S = u.get(C.attrs[D].name);
      S && (C.attrs[D].prefix = S.prefix, C.attrs[D].name = S.name, C.attrs[D].namespace = S.namespace);
    }
  }
  e.adjustTokenXMLAttrs = g;
  function p(C) {
    const D = e.SVG_TAG_NAMES_ADJUSTMENT_MAP.get(C.tagName);
    D != null && (C.tagName = D, C.tagID = (0, t.getTagID)(C.tagName));
  }
  e.adjustTokenSVGTagName = p;
  function m(C, D) {
    return D === t.NS.MATHML && (C === t.TAG_ID.MI || C === t.TAG_ID.MO || C === t.TAG_ID.MN || C === t.TAG_ID.MS || C === t.TAG_ID.MTEXT);
  }
  function b(C, D, S) {
    if (D === t.NS.MATHML && C === t.TAG_ID.ANNOTATION_XML) {
      for (let B = 0; B < S.length; B++)
        if (S[B].name === t.ATTRS.ENCODING) {
          const P = S[B].value.toLowerCase();
          return P === r.TEXT_HTML || P === r.APPLICATION_XML;
        }
    }
    return D === t.NS.SVG && (C === t.TAG_ID.FOREIGN_OBJECT || C === t.TAG_ID.DESC || C === t.TAG_ID.TITLE);
  }
  function R(C, D, S, B) {
    return (!B || B === t.NS.HTML) && b(C, D, S) || (!B || B === t.NS.MATHML) && m(C, D);
  }
  e.isIntegrationPoint = R;
})(ru);
Object.defineProperty(nn, "__esModule", { value: !0 });
nn.Parser = void 0;
const Ve = zt, Fh = Ea, Vu = Jo, Uh = Ta, $u = Or, _t = ru, Fe = Tn, nc = pa, l = Rt, xe = ma, Hh = "hidden", Gh = 8, jh = 3;
var y;
(function(e) {
  e[e.INITIAL = 0] = "INITIAL", e[e.BEFORE_HTML = 1] = "BEFORE_HTML", e[e.BEFORE_HEAD = 2] = "BEFORE_HEAD", e[e.IN_HEAD = 3] = "IN_HEAD", e[e.IN_HEAD_NO_SCRIPT = 4] = "IN_HEAD_NO_SCRIPT", e[e.AFTER_HEAD = 5] = "AFTER_HEAD", e[e.IN_BODY = 6] = "IN_BODY", e[e.TEXT = 7] = "TEXT", e[e.IN_TABLE = 8] = "IN_TABLE", e[e.IN_TABLE_TEXT = 9] = "IN_TABLE_TEXT", e[e.IN_CAPTION = 10] = "IN_CAPTION", e[e.IN_COLUMN_GROUP = 11] = "IN_COLUMN_GROUP", e[e.IN_TABLE_BODY = 12] = "IN_TABLE_BODY", e[e.IN_ROW = 13] = "IN_ROW", e[e.IN_CELL = 14] = "IN_CELL", e[e.IN_SELECT = 15] = "IN_SELECT", e[e.IN_SELECT_IN_TABLE = 16] = "IN_SELECT_IN_TABLE", e[e.IN_TEMPLATE = 17] = "IN_TEMPLATE", e[e.AFTER_BODY = 18] = "AFTER_BODY", e[e.IN_FRAMESET = 19] = "IN_FRAMESET", e[e.AFTER_FRAMESET = 20] = "AFTER_FRAMESET", e[e.AFTER_AFTER_BODY = 21] = "AFTER_AFTER_BODY", e[e.AFTER_AFTER_FRAMESET = 22] = "AFTER_AFTER_FRAMESET";
})(y || (y = {}));
const qh = {
  startLine: -1,
  startCol: -1,
  startOffset: -1,
  endLine: -1,
  endCol: -1,
  endOffset: -1
}, ac = /* @__PURE__ */ new Set([l.TAG_ID.TABLE, l.TAG_ID.TBODY, l.TAG_ID.TFOOT, l.TAG_ID.THEAD, l.TAG_ID.TR]), Wu = {
  scriptingEnabled: !0,
  sourceCodeLocationInfo: !1,
  treeAdapter: Uh.defaultTreeAdapter,
  onParseError: null
};
let Yh = class {
  constructor(t, r, n = null, a = null) {
    this.fragmentContext = n, this.scriptHandler = a, this.currentToken = null, this.stopped = !1, this.insertionMode = y.INITIAL, this.originalInsertionMode = y.INITIAL, this.headElement = null, this.formElement = null, this.currentNotInHTML = !1, this.tmplInsertionModeStack = [], this.pendingCharacterTokens = [], this.hasNonWhitespacePendingCharacterToken = !1, this.framesetOk = !0, this.skipNextNewLine = !1, this.fosterParentingEnabled = !1, this.options = Object.assign(Object.assign({}, Wu), t), this.treeAdapter = this.options.treeAdapter, this.onParseError = this.options.onParseError, this.onParseError && (this.options.sourceCodeLocationInfo = !0), this.document = r ?? this.treeAdapter.createDocument(), this.tokenizer = new Ve.Tokenizer(this.options, this), this.activeFormattingElements = new Vu.FormattingElementList(this.treeAdapter), this.fragmentContextID = n ? (0, l.getTagID)(this.treeAdapter.getTagName(n)) : l.TAG_ID.UNKNOWN, this._setContextModes(n ?? this.document, this.fragmentContextID), this.openElements = new Fh.OpenElementStack(this.document, this.treeAdapter, this);
  }
  // API
  static parse(t, r) {
    const n = new this(r);
    return n.tokenizer.write(t, !0), n.document;
  }
  static getFragmentParser(t, r) {
    const n = Object.assign(Object.assign({}, Wu), r);
    t ?? (t = n.treeAdapter.createElement(l.TAG_NAMES.TEMPLATE, l.NS.HTML, []));
    const a = n.treeAdapter.createElement("documentmock", l.NS.HTML, []), i = new this(n, a, t);
    return i.fragmentContextID === l.TAG_ID.TEMPLATE && i.tmplInsertionModeStack.unshift(y.IN_TEMPLATE), i._initTokenizerForFragmentParsing(), i._insertFakeRootElement(), i._resetInsertionMode(), i._findFormInFragmentContext(), i;
  }
  getFragment() {
    const t = this.treeAdapter.getFirstChild(this.document), r = this.treeAdapter.createDocumentFragment();
    return this._adoptNodes(t, r), r;
  }
  //Errors
  _err(t, r, n) {
    var a;
    if (!this.onParseError)
      return;
    const i = (a = t.location) !== null && a !== void 0 ? a : qh, u = {
      code: r,
      startLine: i.startLine,
      startCol: i.startCol,
      startOffset: i.startOffset,
      endLine: n ? i.startLine : i.endLine,
      endCol: n ? i.startCol : i.endCol,
      endOffset: n ? i.startOffset : i.endOffset
    };
    this.onParseError(u);
  }
  //Stack events
  onItemPush(t, r, n) {
    var a, i;
    (i = (a = this.treeAdapter).onItemPush) === null || i === void 0 || i.call(a, t), n && this.openElements.stackTop > 0 && this._setContextModes(t, r);
  }
  onItemPop(t, r) {
    var n, a;
    if (this.options.sourceCodeLocationInfo && this._setEndLocation(t, this.currentToken), (a = (n = this.treeAdapter).onItemPop) === null || a === void 0 || a.call(n, t, this.openElements.current), r) {
      let i, u;
      this.openElements.stackTop === 0 && this.fragmentContext ? (i = this.fragmentContext, u = this.fragmentContextID) : { current: i, currentTagId: u } = this.openElements, this._setContextModes(i, u);
    }
  }
  _setContextModes(t, r) {
    const n = t === this.document || this.treeAdapter.getNamespaceURI(t) === l.NS.HTML;
    this.currentNotInHTML = !n, this.tokenizer.inForeignNode = !n && !this._isIntegrationPoint(r, t);
  }
  _switchToTextParsing(t, r) {
    this._insertElement(t, l.NS.HTML), this.tokenizer.state = r, this.originalInsertionMode = this.insertionMode, this.insertionMode = y.TEXT;
  }
  switchToPlaintextParsing() {
    this.insertionMode = y.TEXT, this.originalInsertionMode = y.IN_BODY, this.tokenizer.state = Ve.TokenizerMode.PLAINTEXT;
  }
  //Fragment parsing
  _getAdjustedCurrentElement() {
    return this.openElements.stackTop === 0 && this.fragmentContext ? this.fragmentContext : this.openElements.current;
  }
  _findFormInFragmentContext() {
    let t = this.fragmentContext;
    for (; t; ) {
      if (this.treeAdapter.getTagName(t) === l.TAG_NAMES.FORM) {
        this.formElement = t;
        break;
      }
      t = this.treeAdapter.getParentNode(t);
    }
  }
  _initTokenizerForFragmentParsing() {
    if (!(!this.fragmentContext || this.treeAdapter.getNamespaceURI(this.fragmentContext) !== l.NS.HTML))
      switch (this.fragmentContextID) {
        case l.TAG_ID.TITLE:
        case l.TAG_ID.TEXTAREA: {
          this.tokenizer.state = Ve.TokenizerMode.RCDATA;
          break;
        }
        case l.TAG_ID.STYLE:
        case l.TAG_ID.XMP:
        case l.TAG_ID.IFRAME:
        case l.TAG_ID.NOEMBED:
        case l.TAG_ID.NOFRAMES:
        case l.TAG_ID.NOSCRIPT: {
          this.tokenizer.state = Ve.TokenizerMode.RAWTEXT;
          break;
        }
        case l.TAG_ID.SCRIPT: {
          this.tokenizer.state = Ve.TokenizerMode.SCRIPT_DATA;
          break;
        }
        case l.TAG_ID.PLAINTEXT: {
          this.tokenizer.state = Ve.TokenizerMode.PLAINTEXT;
          break;
        }
      }
  }
  //Tree mutation
  _setDocumentType(t) {
    const r = t.name || "", n = t.publicId || "", a = t.systemId || "";
    if (this.treeAdapter.setDocumentType(this.document, r, n, a), t.location) {
      const u = this.treeAdapter.getChildNodes(this.document).find((o) => this.treeAdapter.isDocumentTypeNode(o));
      u && this.treeAdapter.setNodeSourceCodeLocation(u, t.location);
    }
  }
  _attachElementToTree(t, r) {
    if (this.options.sourceCodeLocationInfo) {
      const n = r && Object.assign(Object.assign({}, r), { startTag: r });
      this.treeAdapter.setNodeSourceCodeLocation(t, n);
    }
    if (this._shouldFosterParentOnInsertion())
      this._fosterParentElement(t);
    else {
      const n = this.openElements.currentTmplContentOrNode;
      this.treeAdapter.appendChild(n, t);
    }
  }
  _appendElement(t, r) {
    const n = this.treeAdapter.createElement(t.tagName, r, t.attrs);
    this._attachElementToTree(n, t.location);
  }
  _insertElement(t, r) {
    const n = this.treeAdapter.createElement(t.tagName, r, t.attrs);
    this._attachElementToTree(n, t.location), this.openElements.push(n, t.tagID);
  }
  _insertFakeElement(t, r) {
    const n = this.treeAdapter.createElement(t, l.NS.HTML, []);
    this._attachElementToTree(n, null), this.openElements.push(n, r);
  }
  _insertTemplate(t) {
    const r = this.treeAdapter.createElement(t.tagName, l.NS.HTML, t.attrs), n = this.treeAdapter.createDocumentFragment();
    this.treeAdapter.setTemplateContent(r, n), this._attachElementToTree(r, t.location), this.openElements.push(r, t.tagID), this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(n, null);
  }
  _insertFakeRootElement() {
    const t = this.treeAdapter.createElement(l.TAG_NAMES.HTML, l.NS.HTML, []);
    this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(t, null), this.treeAdapter.appendChild(this.openElements.current, t), this.openElements.push(t, l.TAG_ID.HTML);
  }
  _appendCommentNode(t, r) {
    const n = this.treeAdapter.createCommentNode(t.data);
    this.treeAdapter.appendChild(r, n), this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(n, t.location);
  }
  _insertCharacters(t) {
    let r, n;
    if (this._shouldFosterParentOnInsertion() ? ({ parent: r, beforeElement: n } = this._findFosterParentingLocation(), n ? this.treeAdapter.insertTextBefore(r, t.chars, n) : this.treeAdapter.insertText(r, t.chars)) : (r = this.openElements.currentTmplContentOrNode, this.treeAdapter.insertText(r, t.chars)), !t.location)
      return;
    const a = this.treeAdapter.getChildNodes(r), i = n ? a.lastIndexOf(n) : a.length, u = a[i - 1];
    if (this.treeAdapter.getNodeSourceCodeLocation(u)) {
      const { endLine: c, endCol: h, endOffset: s } = t.location;
      this.treeAdapter.updateNodeSourceCodeLocation(u, { endLine: c, endCol: h, endOffset: s });
    } else
      this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(u, t.location);
  }
  _adoptNodes(t, r) {
    for (let n = this.treeAdapter.getFirstChild(t); n; n = this.treeAdapter.getFirstChild(t))
      this.treeAdapter.detachNode(n), this.treeAdapter.appendChild(r, n);
  }
  _setEndLocation(t, r) {
    if (this.treeAdapter.getNodeSourceCodeLocation(t) && r.location) {
      const n = r.location, a = this.treeAdapter.getTagName(t), i = (
        // NOTE: For cases like <p> <p> </p> - First 'p' closes without a closing
        // tag and for cases like <td> <p> </td> - 'p' closes without a closing tag.
        r.type === xe.TokenType.END_TAG && a === r.tagName ? {
          endTag: Object.assign({}, n),
          endLine: n.endLine,
          endCol: n.endCol,
          endOffset: n.endOffset
        } : {
          endLine: n.startLine,
          endCol: n.startCol,
          endOffset: n.startOffset
        }
      );
      this.treeAdapter.updateNodeSourceCodeLocation(t, i);
    }
  }
  //Token processing
  shouldProcessStartTagTokenInForeignContent(t) {
    if (!this.currentNotInHTML)
      return !1;
    let r, n;
    return this.openElements.stackTop === 0 && this.fragmentContext ? (r = this.fragmentContext, n = this.fragmentContextID) : { current: r, currentTagId: n } = this.openElements, t.tagID === l.TAG_ID.SVG && this.treeAdapter.getTagName(r) === l.TAG_NAMES.ANNOTATION_XML && this.treeAdapter.getNamespaceURI(r) === l.NS.MATHML ? !1 : (
      // Check that `current` is not an integration point for HTML or MathML elements.
      this.tokenizer.inForeignNode || // If it _is_ an integration point, then we might have to check that it is not an HTML
      // integration point.
      (t.tagID === l.TAG_ID.MGLYPH || t.tagID === l.TAG_ID.MALIGNMARK) && !this._isIntegrationPoint(n, r, l.NS.HTML)
    );
  }
  _processToken(t) {
    switch (t.type) {
      case xe.TokenType.CHARACTER: {
        this.onCharacter(t);
        break;
      }
      case xe.TokenType.NULL_CHARACTER: {
        this.onNullCharacter(t);
        break;
      }
      case xe.TokenType.COMMENT: {
        this.onComment(t);
        break;
      }
      case xe.TokenType.DOCTYPE: {
        this.onDoctype(t);
        break;
      }
      case xe.TokenType.START_TAG: {
        this._processStartTag(t);
        break;
      }
      case xe.TokenType.END_TAG: {
        this.onEndTag(t);
        break;
      }
      case xe.TokenType.EOF: {
        this.onEof(t);
        break;
      }
      case xe.TokenType.WHITESPACE_CHARACTER: {
        this.onWhitespaceCharacter(t);
        break;
      }
    }
  }
  //Integration points
  _isIntegrationPoint(t, r, n) {
    const a = this.treeAdapter.getNamespaceURI(r), i = this.treeAdapter.getAttrList(r);
    return _t.isIntegrationPoint(t, a, i, n);
  }
  //Active formatting elements reconstruction
  _reconstructActiveFormattingElements() {
    const t = this.activeFormattingElements.entries.length;
    if (t) {
      const r = this.activeFormattingElements.entries.findIndex((a) => a.type === Vu.EntryType.Marker || this.openElements.contains(a.element)), n = r < 0 ? t - 1 : r - 1;
      for (let a = n; a >= 0; a--) {
        const i = this.activeFormattingElements.entries[a];
        this._insertElement(i.token, this.treeAdapter.getNamespaceURI(i.element)), i.element = this.openElements.current;
      }
    }
  }
  //Close elements
  _closeTableCell() {
    this.openElements.generateImpliedEndTags(), this.openElements.popUntilTableCellPopped(), this.activeFormattingElements.clearToLastMarker(), this.insertionMode = y.IN_ROW;
  }
  _closePElement() {
    this.openElements.generateImpliedEndTagsWithExclusion(l.TAG_ID.P), this.openElements.popUntilTagNamePopped(l.TAG_ID.P);
  }
  //Insertion modes
  _resetInsertionMode() {
    for (let t = this.openElements.stackTop; t >= 0; t--)
      switch (t === 0 && this.fragmentContext ? this.fragmentContextID : this.openElements.tagIDs[t]) {
        case l.TAG_ID.TR: {
          this.insertionMode = y.IN_ROW;
          return;
        }
        case l.TAG_ID.TBODY:
        case l.TAG_ID.THEAD:
        case l.TAG_ID.TFOOT: {
          this.insertionMode = y.IN_TABLE_BODY;
          return;
        }
        case l.TAG_ID.CAPTION: {
          this.insertionMode = y.IN_CAPTION;
          return;
        }
        case l.TAG_ID.COLGROUP: {
          this.insertionMode = y.IN_COLUMN_GROUP;
          return;
        }
        case l.TAG_ID.TABLE: {
          this.insertionMode = y.IN_TABLE;
          return;
        }
        case l.TAG_ID.BODY: {
          this.insertionMode = y.IN_BODY;
          return;
        }
        case l.TAG_ID.FRAMESET: {
          this.insertionMode = y.IN_FRAMESET;
          return;
        }
        case l.TAG_ID.SELECT: {
          this._resetInsertionModeForSelect(t);
          return;
        }
        case l.TAG_ID.TEMPLATE: {
          this.insertionMode = this.tmplInsertionModeStack[0];
          return;
        }
        case l.TAG_ID.HTML: {
          this.insertionMode = this.headElement ? y.AFTER_HEAD : y.BEFORE_HEAD;
          return;
        }
        case l.TAG_ID.TD:
        case l.TAG_ID.TH: {
          if (t > 0) {
            this.insertionMode = y.IN_CELL;
            return;
          }
          break;
        }
        case l.TAG_ID.HEAD: {
          if (t > 0) {
            this.insertionMode = y.IN_HEAD;
            return;
          }
          break;
        }
      }
    this.insertionMode = y.IN_BODY;
  }
  _resetInsertionModeForSelect(t) {
    if (t > 0)
      for (let r = t - 1; r > 0; r--) {
        const n = this.openElements.tagIDs[r];
        if (n === l.TAG_ID.TEMPLATE)
          break;
        if (n === l.TAG_ID.TABLE) {
          this.insertionMode = y.IN_SELECT_IN_TABLE;
          return;
        }
      }
    this.insertionMode = y.IN_SELECT;
  }
  //Foster parenting
  _isElementCausesFosterParenting(t) {
    return ac.has(t);
  }
  _shouldFosterParentOnInsertion() {
    return this.fosterParentingEnabled && this._isElementCausesFosterParenting(this.openElements.currentTagId);
  }
  _findFosterParentingLocation() {
    for (let t = this.openElements.stackTop; t >= 0; t--) {
      const r = this.openElements.items[t];
      switch (this.openElements.tagIDs[t]) {
        case l.TAG_ID.TEMPLATE: {
          if (this.treeAdapter.getNamespaceURI(r) === l.NS.HTML)
            return { parent: this.treeAdapter.getTemplateContent(r), beforeElement: null };
          break;
        }
        case l.TAG_ID.TABLE: {
          const n = this.treeAdapter.getParentNode(r);
          return n ? { parent: n, beforeElement: r } : { parent: this.openElements.items[t - 1], beforeElement: null };
        }
      }
    }
    return { parent: this.openElements.items[0], beforeElement: null };
  }
  _fosterParentElement(t) {
    const r = this._findFosterParentingLocation();
    r.beforeElement ? this.treeAdapter.insertBefore(r.parent, t, r.beforeElement) : this.treeAdapter.appendChild(r.parent, t);
  }
  //Special elements
  _isSpecialElement(t, r) {
    const n = this.treeAdapter.getNamespaceURI(t);
    return l.SPECIAL_ELEMENTS[n].has(r);
  }
  onCharacter(t) {
    if (this.skipNextNewLine = !1, this.tokenizer.inForeignNode) {
      bm(this, t);
      return;
    }
    switch (this.insertionMode) {
      case y.INITIAL: {
        Gr(this, t);
        break;
      }
      case y.BEFORE_HTML: {
        Qr(this, t);
        break;
      }
      case y.BEFORE_HEAD: {
        Xr(this, t);
        break;
      }
      case y.IN_HEAD: {
        zr(this, t);
        break;
      }
      case y.IN_HEAD_NO_SCRIPT: {
        Kr(this, t);
        break;
      }
      case y.AFTER_HEAD: {
        Zr(this, t);
        break;
      }
      case y.IN_BODY:
      case y.IN_CAPTION:
      case y.IN_CELL:
      case y.IN_TEMPLATE: {
        uc(this, t);
        break;
      }
      case y.TEXT:
      case y.IN_SELECT:
      case y.IN_SELECT_IN_TABLE: {
        this._insertCharacters(t);
        break;
      }
      case y.IN_TABLE:
      case y.IN_TABLE_BODY:
      case y.IN_ROW: {
        Ua(this, t);
        break;
      }
      case y.IN_TABLE_TEXT: {
        dc(this, t);
        break;
      }
      case y.IN_COLUMN_GROUP: {
        Qn(this, t);
        break;
      }
      case y.AFTER_BODY: {
        Xn(this, t);
        break;
      }
      case y.AFTER_AFTER_BODY: {
        Mn(this, t);
        break;
      }
    }
  }
  onNullCharacter(t) {
    if (this.skipNextNewLine = !1, this.tokenizer.inForeignNode) {
      _m(this, t);
      return;
    }
    switch (this.insertionMode) {
      case y.INITIAL: {
        Gr(this, t);
        break;
      }
      case y.BEFORE_HTML: {
        Qr(this, t);
        break;
      }
      case y.BEFORE_HEAD: {
        Xr(this, t);
        break;
      }
      case y.IN_HEAD: {
        zr(this, t);
        break;
      }
      case y.IN_HEAD_NO_SCRIPT: {
        Kr(this, t);
        break;
      }
      case y.AFTER_HEAD: {
        Zr(this, t);
        break;
      }
      case y.TEXT: {
        this._insertCharacters(t);
        break;
      }
      case y.IN_TABLE:
      case y.IN_TABLE_BODY:
      case y.IN_ROW: {
        Ua(this, t);
        break;
      }
      case y.IN_COLUMN_GROUP: {
        Qn(this, t);
        break;
      }
      case y.AFTER_BODY: {
        Xn(this, t);
        break;
      }
      case y.AFTER_AFTER_BODY: {
        Mn(this, t);
        break;
      }
    }
  }
  onComment(t) {
    if (this.skipNextNewLine = !1, this.currentNotInHTML) {
      Ti(this, t);
      return;
    }
    switch (this.insertionMode) {
      case y.INITIAL:
      case y.BEFORE_HTML:
      case y.BEFORE_HEAD:
      case y.IN_HEAD:
      case y.IN_HEAD_NO_SCRIPT:
      case y.AFTER_HEAD:
      case y.IN_BODY:
      case y.IN_TABLE:
      case y.IN_CAPTION:
      case y.IN_COLUMN_GROUP:
      case y.IN_TABLE_BODY:
      case y.IN_ROW:
      case y.IN_CELL:
      case y.IN_SELECT:
      case y.IN_SELECT_IN_TABLE:
      case y.IN_TEMPLATE:
      case y.IN_FRAMESET:
      case y.AFTER_FRAMESET: {
        Ti(this, t);
        break;
      }
      case y.IN_TABLE_TEXT: {
        jr(this, t);
        break;
      }
      case y.AFTER_BODY: {
        Kh(this, t);
        break;
      }
      case y.AFTER_AFTER_BODY:
      case y.AFTER_AFTER_FRAMESET: {
        Zh(this, t);
        break;
      }
    }
  }
  onDoctype(t) {
    switch (this.skipNextNewLine = !1, this.insertionMode) {
      case y.INITIAL: {
        Jh(this, t);
        break;
      }
      case y.BEFORE_HEAD:
      case y.IN_HEAD:
      case y.IN_HEAD_NO_SCRIPT:
      case y.AFTER_HEAD: {
        this._err(t, Fe.ERR.misplacedDoctype);
        break;
      }
      case y.IN_TABLE_TEXT: {
        jr(this, t);
        break;
      }
    }
  }
  onStartTag(t) {
    this.skipNextNewLine = !1, this.currentToken = t, this._processStartTag(t), t.selfClosing && !t.ackSelfClosing && this._err(t, Fe.ERR.nonVoidHtmlElementStartTagWithTrailingSolidus);
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
  _processStartTag(t) {
    this.shouldProcessStartTagTokenInForeignContent(t) ? Am(this, t) : this._startTagOutsideForeignContent(t);
  }
  _startTagOutsideForeignContent(t) {
    switch (this.insertionMode) {
      case y.INITIAL: {
        Gr(this, t);
        break;
      }
      case y.BEFORE_HTML: {
        ep(this, t);
        break;
      }
      case y.BEFORE_HEAD: {
        rp(this, t);
        break;
      }
      case y.IN_HEAD: {
        lt(this, t);
        break;
      }
      case y.IN_HEAD_NO_SCRIPT: {
        ip(this, t);
        break;
      }
      case y.AFTER_HEAD: {
        sp(this, t);
        break;
      }
      case y.IN_BODY: {
        Ge(this, t);
        break;
      }
      case y.IN_TABLE: {
        vr(this, t);
        break;
      }
      case y.IN_TABLE_TEXT: {
        jr(this, t);
        break;
      }
      case y.IN_CAPTION: {
        nm(this, t);
        break;
      }
      case y.IN_COLUMN_GROUP: {
        iu(this, t);
        break;
      }
      case y.IN_TABLE_BODY: {
        ba(this, t);
        break;
      }
      case y.IN_ROW: {
        Aa(this, t);
        break;
      }
      case y.IN_CELL: {
        um(this, t);
        break;
      }
      case y.IN_SELECT: {
        mc(this, t);
        break;
      }
      case y.IN_SELECT_IN_TABLE: {
        om(this, t);
        break;
      }
      case y.IN_TEMPLATE: {
        lm(this, t);
        break;
      }
      case y.AFTER_BODY: {
        dm(this, t);
        break;
      }
      case y.IN_FRAMESET: {
        hm(this, t);
        break;
      }
      case y.AFTER_FRAMESET: {
        mm(this, t);
        break;
      }
      case y.AFTER_AFTER_BODY: {
        Tm(this, t);
        break;
      }
      case y.AFTER_AFTER_FRAMESET: {
        gm(this, t);
        break;
      }
    }
  }
  onEndTag(t) {
    this.skipNextNewLine = !1, this.currentToken = t, this.currentNotInHTML ? Im(this, t) : this._endTagOutsideForeignContent(t);
  }
  _endTagOutsideForeignContent(t) {
    switch (this.insertionMode) {
      case y.INITIAL: {
        Gr(this, t);
        break;
      }
      case y.BEFORE_HTML: {
        tp(this, t);
        break;
      }
      case y.BEFORE_HEAD: {
        np(this, t);
        break;
      }
      case y.IN_HEAD: {
        ap(this, t);
        break;
      }
      case y.IN_HEAD_NO_SCRIPT: {
        up(this, t);
        break;
      }
      case y.AFTER_HEAD: {
        op(this, t);
        break;
      }
      case y.IN_BODY: {
        _a(this, t);
        break;
      }
      case y.TEXT: {
        Wp(this, t);
        break;
      }
      case y.IN_TABLE: {
        an(this, t);
        break;
      }
      case y.IN_TABLE_TEXT: {
        jr(this, t);
        break;
      }
      case y.IN_CAPTION: {
        am(this, t);
        break;
      }
      case y.IN_COLUMN_GROUP: {
        im(this, t);
        break;
      }
      case y.IN_TABLE_BODY: {
        gi(this, t);
        break;
      }
      case y.IN_ROW: {
        pc(this, t);
        break;
      }
      case y.IN_CELL: {
        sm(this, t);
        break;
      }
      case y.IN_SELECT: {
        Ec(this, t);
        break;
      }
      case y.IN_SELECT_IN_TABLE: {
        cm(this, t);
        break;
      }
      case y.IN_TEMPLATE: {
        fm(this, t);
        break;
      }
      case y.AFTER_BODY: {
        gc(this, t);
        break;
      }
      case y.IN_FRAMESET: {
        pm(this, t);
        break;
      }
      case y.AFTER_FRAMESET: {
        Em(this, t);
        break;
      }
      case y.AFTER_AFTER_BODY: {
        Mn(this, t);
        break;
      }
    }
  }
  onEof(t) {
    switch (this.insertionMode) {
      case y.INITIAL: {
        Gr(this, t);
        break;
      }
      case y.BEFORE_HTML: {
        Qr(this, t);
        break;
      }
      case y.BEFORE_HEAD: {
        Xr(this, t);
        break;
      }
      case y.IN_HEAD: {
        zr(this, t);
        break;
      }
      case y.IN_HEAD_NO_SCRIPT: {
        Kr(this, t);
        break;
      }
      case y.AFTER_HEAD: {
        Zr(this, t);
        break;
      }
      case y.IN_BODY:
      case y.IN_TABLE:
      case y.IN_CAPTION:
      case y.IN_COLUMN_GROUP:
      case y.IN_TABLE_BODY:
      case y.IN_ROW:
      case y.IN_CELL:
      case y.IN_SELECT:
      case y.IN_SELECT_IN_TABLE: {
        lc(this, t);
        break;
      }
      case y.TEXT: {
        Qp(this, t);
        break;
      }
      case y.IN_TABLE_TEXT: {
        jr(this, t);
        break;
      }
      case y.IN_TEMPLATE: {
        Tc(this, t);
        break;
      }
      case y.AFTER_BODY:
      case y.IN_FRAMESET:
      case y.AFTER_FRAMESET:
      case y.AFTER_AFTER_BODY:
      case y.AFTER_AFTER_FRAMESET: {
        au(this, t);
        break;
      }
    }
  }
  onWhitespaceCharacter(t) {
    if (this.skipNextNewLine && (this.skipNextNewLine = !1, t.chars.charCodeAt(0) === nc.CODE_POINTS.LINE_FEED)) {
      if (t.chars.length === 1)
        return;
      t.chars = t.chars.substr(1);
    }
    if (this.tokenizer.inForeignNode) {
      this._insertCharacters(t);
      return;
    }
    switch (this.insertionMode) {
      case y.IN_HEAD:
      case y.IN_HEAD_NO_SCRIPT:
      case y.AFTER_HEAD:
      case y.TEXT:
      case y.IN_COLUMN_GROUP:
      case y.IN_SELECT:
      case y.IN_SELECT_IN_TABLE:
      case y.IN_FRAMESET:
      case y.AFTER_FRAMESET: {
        this._insertCharacters(t);
        break;
      }
      case y.IN_BODY:
      case y.IN_CAPTION:
      case y.IN_CELL:
      case y.IN_TEMPLATE:
      case y.AFTER_BODY:
      case y.AFTER_AFTER_BODY:
      case y.AFTER_AFTER_FRAMESET: {
        ic(this, t);
        break;
      }
      case y.IN_TABLE:
      case y.IN_TABLE_BODY:
      case y.IN_ROW: {
        Ua(this, t);
        break;
      }
      case y.IN_TABLE_TEXT: {
        fc(this, t);
        break;
      }
    }
  }
};
nn.Parser = Yh;
function Vh(e, t) {
  let r = e.activeFormattingElements.getElementEntryInScopeWithTagName(t.tagName);
  return r ? e.openElements.contains(r.element) ? e.openElements.hasInScope(t.tagID) || (r = null) : (e.activeFormattingElements.removeEntry(r), r = null) : cc(e, t), r;
}
function $h(e, t) {
  let r = null, n = e.openElements.stackTop;
  for (; n >= 0; n--) {
    const a = e.openElements.items[n];
    if (a === t.element)
      break;
    e._isSpecialElement(a, e.openElements.tagIDs[n]) && (r = a);
  }
  return r || (e.openElements.shortenToLength(n < 0 ? 0 : n), e.activeFormattingElements.removeEntry(t)), r;
}
function Wh(e, t, r) {
  let n = t, a = e.openElements.getCommonAncestor(t);
  for (let i = 0, u = a; u !== r; i++, u = a) {
    a = e.openElements.getCommonAncestor(u);
    const o = e.activeFormattingElements.getElementEntry(u), c = o && i >= jh;
    !o || c ? (c && e.activeFormattingElements.removeEntry(o), e.openElements.remove(u)) : (u = Qh(e, o), n === t && (e.activeFormattingElements.bookmark = o), e.treeAdapter.detachNode(n), e.treeAdapter.appendChild(u, n), n = u);
  }
  return n;
}
function Qh(e, t) {
  const r = e.treeAdapter.getNamespaceURI(t.element), n = e.treeAdapter.createElement(t.token.tagName, r, t.token.attrs);
  return e.openElements.replace(t.element, n), t.element = n, n;
}
function Xh(e, t, r) {
  const n = e.treeAdapter.getTagName(t), a = (0, l.getTagID)(n);
  if (e._isElementCausesFosterParenting(a))
    e._fosterParentElement(r);
  else {
    const i = e.treeAdapter.getNamespaceURI(t);
    a === l.TAG_ID.TEMPLATE && i === l.NS.HTML && (t = e.treeAdapter.getTemplateContent(t)), e.treeAdapter.appendChild(t, r);
  }
}
function zh(e, t, r) {
  const n = e.treeAdapter.getNamespaceURI(r.element), { token: a } = r, i = e.treeAdapter.createElement(a.tagName, n, a.attrs);
  e._adoptNodes(t, i), e.treeAdapter.appendChild(t, i), e.activeFormattingElements.insertElementAfterBookmark(i, a), e.activeFormattingElements.removeEntry(r), e.openElements.remove(r.element), e.openElements.insertAfter(t, i, a.tagID);
}
function nu(e, t) {
  for (let r = 0; r < Gh; r++) {
    const n = Vh(e, t);
    if (!n)
      break;
    const a = $h(e, n);
    if (!a)
      break;
    e.activeFormattingElements.bookmark = n;
    const i = Wh(e, a, n.element), u = e.openElements.getCommonAncestor(n.element);
    e.treeAdapter.detachNode(i), u && Xh(e, u, i), zh(e, a, n);
  }
}
function Ti(e, t) {
  e._appendCommentNode(t, e.openElements.currentTmplContentOrNode);
}
function Kh(e, t) {
  e._appendCommentNode(t, e.openElements.items[0]);
}
function Zh(e, t) {
  e._appendCommentNode(t, e.document);
}
function au(e, t) {
  if (e.stopped = !0, t.location) {
    const r = e.fragmentContext ? 0 : 2;
    for (let n = e.openElements.stackTop; n >= r; n--)
      e._setEndLocation(e.openElements.items[n], t);
    if (!e.fragmentContext && e.openElements.stackTop >= 0) {
      const n = e.openElements.items[0], a = e.treeAdapter.getNodeSourceCodeLocation(n);
      if (a && !a.endTag && (e._setEndLocation(n, t), e.openElements.stackTop >= 1)) {
        const i = e.openElements.items[1], u = e.treeAdapter.getNodeSourceCodeLocation(i);
        u && !u.endTag && e._setEndLocation(i, t);
      }
    }
  }
}
function Jh(e, t) {
  e._setDocumentType(t);
  const r = t.forceQuirks ? l.DOCUMENT_MODE.QUIRKS : $u.getDocumentMode(t);
  $u.isConforming(t) || e._err(t, Fe.ERR.nonConformingDoctype), e.treeAdapter.setDocumentMode(e.document, r), e.insertionMode = y.BEFORE_HTML;
}
function Gr(e, t) {
  e._err(t, Fe.ERR.missingDoctype, !0), e.treeAdapter.setDocumentMode(e.document, l.DOCUMENT_MODE.QUIRKS), e.insertionMode = y.BEFORE_HTML, e._processToken(t);
}
function ep(e, t) {
  t.tagID === l.TAG_ID.HTML ? (e._insertElement(t, l.NS.HTML), e.insertionMode = y.BEFORE_HEAD) : Qr(e, t);
}
function tp(e, t) {
  const r = t.tagID;
  (r === l.TAG_ID.HTML || r === l.TAG_ID.HEAD || r === l.TAG_ID.BODY || r === l.TAG_ID.BR) && Qr(e, t);
}
function Qr(e, t) {
  e._insertFakeRootElement(), e.insertionMode = y.BEFORE_HEAD, e._processToken(t);
}
function rp(e, t) {
  switch (t.tagID) {
    case l.TAG_ID.HTML: {
      Ge(e, t);
      break;
    }
    case l.TAG_ID.HEAD: {
      e._insertElement(t, l.NS.HTML), e.headElement = e.openElements.current, e.insertionMode = y.IN_HEAD;
      break;
    }
    default:
      Xr(e, t);
  }
}
function np(e, t) {
  const r = t.tagID;
  r === l.TAG_ID.HEAD || r === l.TAG_ID.BODY || r === l.TAG_ID.HTML || r === l.TAG_ID.BR ? Xr(e, t) : e._err(t, Fe.ERR.endTagWithoutMatchingOpenElement);
}
function Xr(e, t) {
  e._insertFakeElement(l.TAG_NAMES.HEAD, l.TAG_ID.HEAD), e.headElement = e.openElements.current, e.insertionMode = y.IN_HEAD, e._processToken(t);
}
function lt(e, t) {
  switch (t.tagID) {
    case l.TAG_ID.HTML: {
      Ge(e, t);
      break;
    }
    case l.TAG_ID.BASE:
    case l.TAG_ID.BASEFONT:
    case l.TAG_ID.BGSOUND:
    case l.TAG_ID.LINK:
    case l.TAG_ID.META: {
      e._appendElement(t, l.NS.HTML), t.ackSelfClosing = !0;
      break;
    }
    case l.TAG_ID.TITLE: {
      e._switchToTextParsing(t, Ve.TokenizerMode.RCDATA);
      break;
    }
    case l.TAG_ID.NOSCRIPT: {
      e.options.scriptingEnabled ? e._switchToTextParsing(t, Ve.TokenizerMode.RAWTEXT) : (e._insertElement(t, l.NS.HTML), e.insertionMode = y.IN_HEAD_NO_SCRIPT);
      break;
    }
    case l.TAG_ID.NOFRAMES:
    case l.TAG_ID.STYLE: {
      e._switchToTextParsing(t, Ve.TokenizerMode.RAWTEXT);
      break;
    }
    case l.TAG_ID.SCRIPT: {
      e._switchToTextParsing(t, Ve.TokenizerMode.SCRIPT_DATA);
      break;
    }
    case l.TAG_ID.TEMPLATE: {
      e._insertTemplate(t), e.activeFormattingElements.insertMarker(), e.framesetOk = !1, e.insertionMode = y.IN_TEMPLATE, e.tmplInsertionModeStack.unshift(y.IN_TEMPLATE);
      break;
    }
    case l.TAG_ID.HEAD: {
      e._err(t, Fe.ERR.misplacedStartTagForHeadElement);
      break;
    }
    default:
      zr(e, t);
  }
}
function ap(e, t) {
  switch (t.tagID) {
    case l.TAG_ID.HEAD: {
      e.openElements.pop(), e.insertionMode = y.AFTER_HEAD;
      break;
    }
    case l.TAG_ID.BODY:
    case l.TAG_ID.BR:
    case l.TAG_ID.HTML: {
      zr(e, t);
      break;
    }
    case l.TAG_ID.TEMPLATE: {
      er(e, t);
      break;
    }
    default:
      e._err(t, Fe.ERR.endTagWithoutMatchingOpenElement);
  }
}
function er(e, t) {
  e.openElements.tmplCount > 0 ? (e.openElements.generateImpliedEndTagsThoroughly(), e.openElements.currentTagId !== l.TAG_ID.TEMPLATE && e._err(t, Fe.ERR.closingOfElementWithOpenChildElements), e.openElements.popUntilTagNamePopped(l.TAG_ID.TEMPLATE), e.activeFormattingElements.clearToLastMarker(), e.tmplInsertionModeStack.shift(), e._resetInsertionMode()) : e._err(t, Fe.ERR.endTagWithoutMatchingOpenElement);
}
function zr(e, t) {
  e.openElements.pop(), e.insertionMode = y.AFTER_HEAD, e._processToken(t);
}
function ip(e, t) {
  switch (t.tagID) {
    case l.TAG_ID.HTML: {
      Ge(e, t);
      break;
    }
    case l.TAG_ID.BASEFONT:
    case l.TAG_ID.BGSOUND:
    case l.TAG_ID.HEAD:
    case l.TAG_ID.LINK:
    case l.TAG_ID.META:
    case l.TAG_ID.NOFRAMES:
    case l.TAG_ID.STYLE: {
      lt(e, t);
      break;
    }
    case l.TAG_ID.NOSCRIPT: {
      e._err(t, Fe.ERR.nestedNoscriptInHead);
      break;
    }
    default:
      Kr(e, t);
  }
}
function up(e, t) {
  switch (t.tagID) {
    case l.TAG_ID.NOSCRIPT: {
      e.openElements.pop(), e.insertionMode = y.IN_HEAD;
      break;
    }
    case l.TAG_ID.BR: {
      Kr(e, t);
      break;
    }
    default:
      e._err(t, Fe.ERR.endTagWithoutMatchingOpenElement);
  }
}
function Kr(e, t) {
  const r = t.type === xe.TokenType.EOF ? Fe.ERR.openElementsLeftAfterEof : Fe.ERR.disallowedContentInNoscriptInHead;
  e._err(t, r), e.openElements.pop(), e.insertionMode = y.IN_HEAD, e._processToken(t);
}
function sp(e, t) {
  switch (t.tagID) {
    case l.TAG_ID.HTML: {
      Ge(e, t);
      break;
    }
    case l.TAG_ID.BODY: {
      e._insertElement(t, l.NS.HTML), e.framesetOk = !1, e.insertionMode = y.IN_BODY;
      break;
    }
    case l.TAG_ID.FRAMESET: {
      e._insertElement(t, l.NS.HTML), e.insertionMode = y.IN_FRAMESET;
      break;
    }
    case l.TAG_ID.BASE:
    case l.TAG_ID.BASEFONT:
    case l.TAG_ID.BGSOUND:
    case l.TAG_ID.LINK:
    case l.TAG_ID.META:
    case l.TAG_ID.NOFRAMES:
    case l.TAG_ID.SCRIPT:
    case l.TAG_ID.STYLE:
    case l.TAG_ID.TEMPLATE:
    case l.TAG_ID.TITLE: {
      e._err(t, Fe.ERR.abandonedHeadElementChild), e.openElements.push(e.headElement, l.TAG_ID.HEAD), lt(e, t), e.openElements.remove(e.headElement);
      break;
    }
    case l.TAG_ID.HEAD: {
      e._err(t, Fe.ERR.misplacedStartTagForHeadElement);
      break;
    }
    default:
      Zr(e, t);
  }
}
function op(e, t) {
  switch (t.tagID) {
    case l.TAG_ID.BODY:
    case l.TAG_ID.HTML:
    case l.TAG_ID.BR: {
      Zr(e, t);
      break;
    }
    case l.TAG_ID.TEMPLATE: {
      er(e, t);
      break;
    }
    default:
      e._err(t, Fe.ERR.endTagWithoutMatchingOpenElement);
  }
}
function Zr(e, t) {
  e._insertFakeElement(l.TAG_NAMES.BODY, l.TAG_ID.BODY), e.insertionMode = y.IN_BODY, ga(e, t);
}
function ga(e, t) {
  switch (t.type) {
    case xe.TokenType.CHARACTER: {
      uc(e, t);
      break;
    }
    case xe.TokenType.WHITESPACE_CHARACTER: {
      ic(e, t);
      break;
    }
    case xe.TokenType.COMMENT: {
      Ti(e, t);
      break;
    }
    case xe.TokenType.START_TAG: {
      Ge(e, t);
      break;
    }
    case xe.TokenType.END_TAG: {
      _a(e, t);
      break;
    }
    case xe.TokenType.EOF: {
      lc(e, t);
      break;
    }
  }
}
function ic(e, t) {
  e._reconstructActiveFormattingElements(), e._insertCharacters(t);
}
function uc(e, t) {
  e._reconstructActiveFormattingElements(), e._insertCharacters(t), e.framesetOk = !1;
}
function cp(e, t) {
  e.openElements.tmplCount === 0 && e.treeAdapter.adoptAttributes(e.openElements.items[0], t.attrs);
}
function lp(e, t) {
  const r = e.openElements.tryPeekProperlyNestedBodyElement();
  r && e.openElements.tmplCount === 0 && (e.framesetOk = !1, e.treeAdapter.adoptAttributes(r, t.attrs));
}
function fp(e, t) {
  const r = e.openElements.tryPeekProperlyNestedBodyElement();
  e.framesetOk && r && (e.treeAdapter.detachNode(r), e.openElements.popAllUpToHtmlElement(), e._insertElement(t, l.NS.HTML), e.insertionMode = y.IN_FRAMESET);
}
function dp(e, t) {
  e.openElements.hasInButtonScope(l.TAG_ID.P) && e._closePElement(), e._insertElement(t, l.NS.HTML);
}
function hp(e, t) {
  e.openElements.hasInButtonScope(l.TAG_ID.P) && e._closePElement(), (0, l.isNumberedHeader)(e.openElements.currentTagId) && e.openElements.pop(), e._insertElement(t, l.NS.HTML);
}
function pp(e, t) {
  e.openElements.hasInButtonScope(l.TAG_ID.P) && e._closePElement(), e._insertElement(t, l.NS.HTML), e.skipNextNewLine = !0, e.framesetOk = !1;
}
function mp(e, t) {
  const r = e.openElements.tmplCount > 0;
  (!e.formElement || r) && (e.openElements.hasInButtonScope(l.TAG_ID.P) && e._closePElement(), e._insertElement(t, l.NS.HTML), r || (e.formElement = e.openElements.current));
}
function Ep(e, t) {
  e.framesetOk = !1;
  const r = t.tagID;
  for (let n = e.openElements.stackTop; n >= 0; n--) {
    const a = e.openElements.tagIDs[n];
    if (r === l.TAG_ID.LI && a === l.TAG_ID.LI || (r === l.TAG_ID.DD || r === l.TAG_ID.DT) && (a === l.TAG_ID.DD || a === l.TAG_ID.DT)) {
      e.openElements.generateImpliedEndTagsWithExclusion(a), e.openElements.popUntilTagNamePopped(a);
      break;
    }
    if (a !== l.TAG_ID.ADDRESS && a !== l.TAG_ID.DIV && a !== l.TAG_ID.P && e._isSpecialElement(e.openElements.items[n], a))
      break;
  }
  e.openElements.hasInButtonScope(l.TAG_ID.P) && e._closePElement(), e._insertElement(t, l.NS.HTML);
}
function Tp(e, t) {
  e.openElements.hasInButtonScope(l.TAG_ID.P) && e._closePElement(), e._insertElement(t, l.NS.HTML), e.tokenizer.state = Ve.TokenizerMode.PLAINTEXT;
}
function gp(e, t) {
  e.openElements.hasInScope(l.TAG_ID.BUTTON) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(l.TAG_ID.BUTTON)), e._reconstructActiveFormattingElements(), e._insertElement(t, l.NS.HTML), e.framesetOk = !1;
}
function _p(e, t) {
  const r = e.activeFormattingElements.getElementEntryInScopeWithTagName(l.TAG_NAMES.A);
  r && (nu(e, t), e.openElements.remove(r.element), e.activeFormattingElements.removeEntry(r)), e._reconstructActiveFormattingElements(), e._insertElement(t, l.NS.HTML), e.activeFormattingElements.pushElement(e.openElements.current, t);
}
function bp(e, t) {
  e._reconstructActiveFormattingElements(), e._insertElement(t, l.NS.HTML), e.activeFormattingElements.pushElement(e.openElements.current, t);
}
function Ap(e, t) {
  e._reconstructActiveFormattingElements(), e.openElements.hasInScope(l.TAG_ID.NOBR) && (nu(e, t), e._reconstructActiveFormattingElements()), e._insertElement(t, l.NS.HTML), e.activeFormattingElements.pushElement(e.openElements.current, t);
}
function Ip(e, t) {
  e._reconstructActiveFormattingElements(), e._insertElement(t, l.NS.HTML), e.activeFormattingElements.insertMarker(), e.framesetOk = !1;
}
function yp(e, t) {
  e.treeAdapter.getDocumentMode(e.document) !== l.DOCUMENT_MODE.QUIRKS && e.openElements.hasInButtonScope(l.TAG_ID.P) && e._closePElement(), e._insertElement(t, l.NS.HTML), e.framesetOk = !1, e.insertionMode = y.IN_TABLE;
}
function sc(e, t) {
  e._reconstructActiveFormattingElements(), e._appendElement(t, l.NS.HTML), e.framesetOk = !1, t.ackSelfClosing = !0;
}
function oc(e) {
  const t = (0, xe.getTokenAttr)(e, l.ATTRS.TYPE);
  return t != null && t.toLowerCase() === Hh;
}
function Cp(e, t) {
  e._reconstructActiveFormattingElements(), e._appendElement(t, l.NS.HTML), oc(t) || (e.framesetOk = !1), t.ackSelfClosing = !0;
}
function Np(e, t) {
  e._appendElement(t, l.NS.HTML), t.ackSelfClosing = !0;
}
function Dp(e, t) {
  e.openElements.hasInButtonScope(l.TAG_ID.P) && e._closePElement(), e._appendElement(t, l.NS.HTML), e.framesetOk = !1, t.ackSelfClosing = !0;
}
function Sp(e, t) {
  t.tagName = l.TAG_NAMES.IMG, t.tagID = l.TAG_ID.IMG, sc(e, t);
}
function Op(e, t) {
  e._insertElement(t, l.NS.HTML), e.skipNextNewLine = !0, e.tokenizer.state = Ve.TokenizerMode.RCDATA, e.originalInsertionMode = e.insertionMode, e.framesetOk = !1, e.insertionMode = y.TEXT;
}
function vp(e, t) {
  e.openElements.hasInButtonScope(l.TAG_ID.P) && e._closePElement(), e._reconstructActiveFormattingElements(), e.framesetOk = !1, e._switchToTextParsing(t, Ve.TokenizerMode.RAWTEXT);
}
function Rp(e, t) {
  e.framesetOk = !1, e._switchToTextParsing(t, Ve.TokenizerMode.RAWTEXT);
}
function Qu(e, t) {
  e._switchToTextParsing(t, Ve.TokenizerMode.RAWTEXT);
}
function Pp(e, t) {
  e._reconstructActiveFormattingElements(), e._insertElement(t, l.NS.HTML), e.framesetOk = !1, e.insertionMode = e.insertionMode === y.IN_TABLE || e.insertionMode === y.IN_CAPTION || e.insertionMode === y.IN_TABLE_BODY || e.insertionMode === y.IN_ROW || e.insertionMode === y.IN_CELL ? y.IN_SELECT_IN_TABLE : y.IN_SELECT;
}
function Lp(e, t) {
  e.openElements.currentTagId === l.TAG_ID.OPTION && e.openElements.pop(), e._reconstructActiveFormattingElements(), e._insertElement(t, l.NS.HTML);
}
function xp(e, t) {
  e.openElements.hasInScope(l.TAG_ID.RUBY) && e.openElements.generateImpliedEndTags(), e._insertElement(t, l.NS.HTML);
}
function wp(e, t) {
  e.openElements.hasInScope(l.TAG_ID.RUBY) && e.openElements.generateImpliedEndTagsWithExclusion(l.TAG_ID.RTC), e._insertElement(t, l.NS.HTML);
}
function Mp(e, t) {
  e._reconstructActiveFormattingElements(), _t.adjustTokenMathMLAttrs(t), _t.adjustTokenXMLAttrs(t), t.selfClosing ? e._appendElement(t, l.NS.MATHML) : e._insertElement(t, l.NS.MATHML), t.ackSelfClosing = !0;
}
function Bp(e, t) {
  e._reconstructActiveFormattingElements(), _t.adjustTokenSVGAttrs(t), _t.adjustTokenXMLAttrs(t), t.selfClosing ? e._appendElement(t, l.NS.SVG) : e._insertElement(t, l.NS.SVG), t.ackSelfClosing = !0;
}
function Xu(e, t) {
  e._reconstructActiveFormattingElements(), e._insertElement(t, l.NS.HTML);
}
function Ge(e, t) {
  switch (t.tagID) {
    case l.TAG_ID.I:
    case l.TAG_ID.S:
    case l.TAG_ID.B:
    case l.TAG_ID.U:
    case l.TAG_ID.EM:
    case l.TAG_ID.TT:
    case l.TAG_ID.BIG:
    case l.TAG_ID.CODE:
    case l.TAG_ID.FONT:
    case l.TAG_ID.SMALL:
    case l.TAG_ID.STRIKE:
    case l.TAG_ID.STRONG: {
      bp(e, t);
      break;
    }
    case l.TAG_ID.A: {
      _p(e, t);
      break;
    }
    case l.TAG_ID.H1:
    case l.TAG_ID.H2:
    case l.TAG_ID.H3:
    case l.TAG_ID.H4:
    case l.TAG_ID.H5:
    case l.TAG_ID.H6: {
      hp(e, t);
      break;
    }
    case l.TAG_ID.P:
    case l.TAG_ID.DL:
    case l.TAG_ID.OL:
    case l.TAG_ID.UL:
    case l.TAG_ID.DIV:
    case l.TAG_ID.DIR:
    case l.TAG_ID.NAV:
    case l.TAG_ID.MAIN:
    case l.TAG_ID.MENU:
    case l.TAG_ID.ASIDE:
    case l.TAG_ID.CENTER:
    case l.TAG_ID.FIGURE:
    case l.TAG_ID.FOOTER:
    case l.TAG_ID.HEADER:
    case l.TAG_ID.HGROUP:
    case l.TAG_ID.DIALOG:
    case l.TAG_ID.DETAILS:
    case l.TAG_ID.ADDRESS:
    case l.TAG_ID.ARTICLE:
    case l.TAG_ID.SECTION:
    case l.TAG_ID.SUMMARY:
    case l.TAG_ID.FIELDSET:
    case l.TAG_ID.BLOCKQUOTE:
    case l.TAG_ID.FIGCAPTION: {
      dp(e, t);
      break;
    }
    case l.TAG_ID.LI:
    case l.TAG_ID.DD:
    case l.TAG_ID.DT: {
      Ep(e, t);
      break;
    }
    case l.TAG_ID.BR:
    case l.TAG_ID.IMG:
    case l.TAG_ID.WBR:
    case l.TAG_ID.AREA:
    case l.TAG_ID.EMBED:
    case l.TAG_ID.KEYGEN: {
      sc(e, t);
      break;
    }
    case l.TAG_ID.HR: {
      Dp(e, t);
      break;
    }
    case l.TAG_ID.RB:
    case l.TAG_ID.RTC: {
      xp(e, t);
      break;
    }
    case l.TAG_ID.RT:
    case l.TAG_ID.RP: {
      wp(e, t);
      break;
    }
    case l.TAG_ID.PRE:
    case l.TAG_ID.LISTING: {
      pp(e, t);
      break;
    }
    case l.TAG_ID.XMP: {
      vp(e, t);
      break;
    }
    case l.TAG_ID.SVG: {
      Bp(e, t);
      break;
    }
    case l.TAG_ID.HTML: {
      cp(e, t);
      break;
    }
    case l.TAG_ID.BASE:
    case l.TAG_ID.LINK:
    case l.TAG_ID.META:
    case l.TAG_ID.STYLE:
    case l.TAG_ID.TITLE:
    case l.TAG_ID.SCRIPT:
    case l.TAG_ID.BGSOUND:
    case l.TAG_ID.BASEFONT:
    case l.TAG_ID.TEMPLATE: {
      lt(e, t);
      break;
    }
    case l.TAG_ID.BODY: {
      lp(e, t);
      break;
    }
    case l.TAG_ID.FORM: {
      mp(e, t);
      break;
    }
    case l.TAG_ID.NOBR: {
      Ap(e, t);
      break;
    }
    case l.TAG_ID.MATH: {
      Mp(e, t);
      break;
    }
    case l.TAG_ID.TABLE: {
      yp(e, t);
      break;
    }
    case l.TAG_ID.INPUT: {
      Cp(e, t);
      break;
    }
    case l.TAG_ID.PARAM:
    case l.TAG_ID.TRACK:
    case l.TAG_ID.SOURCE: {
      Np(e, t);
      break;
    }
    case l.TAG_ID.IMAGE: {
      Sp(e, t);
      break;
    }
    case l.TAG_ID.BUTTON: {
      gp(e, t);
      break;
    }
    case l.TAG_ID.APPLET:
    case l.TAG_ID.OBJECT:
    case l.TAG_ID.MARQUEE: {
      Ip(e, t);
      break;
    }
    case l.TAG_ID.IFRAME: {
      Rp(e, t);
      break;
    }
    case l.TAG_ID.SELECT: {
      Pp(e, t);
      break;
    }
    case l.TAG_ID.OPTION:
    case l.TAG_ID.OPTGROUP: {
      Lp(e, t);
      break;
    }
    case l.TAG_ID.NOEMBED: {
      Qu(e, t);
      break;
    }
    case l.TAG_ID.FRAMESET: {
      fp(e, t);
      break;
    }
    case l.TAG_ID.TEXTAREA: {
      Op(e, t);
      break;
    }
    case l.TAG_ID.NOSCRIPT: {
      e.options.scriptingEnabled ? Qu(e, t) : Xu(e, t);
      break;
    }
    case l.TAG_ID.PLAINTEXT: {
      Tp(e, t);
      break;
    }
    case l.TAG_ID.COL:
    case l.TAG_ID.TH:
    case l.TAG_ID.TD:
    case l.TAG_ID.TR:
    case l.TAG_ID.HEAD:
    case l.TAG_ID.FRAME:
    case l.TAG_ID.TBODY:
    case l.TAG_ID.TFOOT:
    case l.TAG_ID.THEAD:
    case l.TAG_ID.CAPTION:
    case l.TAG_ID.COLGROUP:
      break;
    default:
      Xu(e, t);
  }
}
function kp(e, t) {
  if (e.openElements.hasInScope(l.TAG_ID.BODY) && (e.insertionMode = y.AFTER_BODY, e.options.sourceCodeLocationInfo)) {
    const r = e.openElements.tryPeekProperlyNestedBodyElement();
    r && e._setEndLocation(r, t);
  }
}
function Fp(e, t) {
  e.openElements.hasInScope(l.TAG_ID.BODY) && (e.insertionMode = y.AFTER_BODY, gc(e, t));
}
function Up(e, t) {
  const r = t.tagID;
  e.openElements.hasInScope(r) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(r));
}
function Hp(e) {
  const t = e.openElements.tmplCount > 0, { formElement: r } = e;
  t || (e.formElement = null), (r || t) && e.openElements.hasInScope(l.TAG_ID.FORM) && (e.openElements.generateImpliedEndTags(), t ? e.openElements.popUntilTagNamePopped(l.TAG_ID.FORM) : r && e.openElements.remove(r));
}
function Gp(e) {
  e.openElements.hasInButtonScope(l.TAG_ID.P) || e._insertFakeElement(l.TAG_NAMES.P, l.TAG_ID.P), e._closePElement();
}
function jp(e) {
  e.openElements.hasInListItemScope(l.TAG_ID.LI) && (e.openElements.generateImpliedEndTagsWithExclusion(l.TAG_ID.LI), e.openElements.popUntilTagNamePopped(l.TAG_ID.LI));
}
function qp(e, t) {
  const r = t.tagID;
  e.openElements.hasInScope(r) && (e.openElements.generateImpliedEndTagsWithExclusion(r), e.openElements.popUntilTagNamePopped(r));
}
function Yp(e) {
  e.openElements.hasNumberedHeaderInScope() && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilNumberedHeaderPopped());
}
function Vp(e, t) {
  const r = t.tagID;
  e.openElements.hasInScope(r) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(r), e.activeFormattingElements.clearToLastMarker());
}
function $p(e) {
  e._reconstructActiveFormattingElements(), e._insertFakeElement(l.TAG_NAMES.BR, l.TAG_ID.BR), e.openElements.pop(), e.framesetOk = !1;
}
function cc(e, t) {
  const r = t.tagName, n = t.tagID;
  for (let a = e.openElements.stackTop; a > 0; a--) {
    const i = e.openElements.items[a], u = e.openElements.tagIDs[a];
    if (n === u && (n !== l.TAG_ID.UNKNOWN || e.treeAdapter.getTagName(i) === r)) {
      e.openElements.generateImpliedEndTagsWithExclusion(n), e.openElements.stackTop >= a && e.openElements.shortenToLength(a);
      break;
    }
    if (e._isSpecialElement(i, u))
      break;
  }
}
function _a(e, t) {
  switch (t.tagID) {
    case l.TAG_ID.A:
    case l.TAG_ID.B:
    case l.TAG_ID.I:
    case l.TAG_ID.S:
    case l.TAG_ID.U:
    case l.TAG_ID.EM:
    case l.TAG_ID.TT:
    case l.TAG_ID.BIG:
    case l.TAG_ID.CODE:
    case l.TAG_ID.FONT:
    case l.TAG_ID.NOBR:
    case l.TAG_ID.SMALL:
    case l.TAG_ID.STRIKE:
    case l.TAG_ID.STRONG: {
      nu(e, t);
      break;
    }
    case l.TAG_ID.P: {
      Gp(e);
      break;
    }
    case l.TAG_ID.DL:
    case l.TAG_ID.UL:
    case l.TAG_ID.OL:
    case l.TAG_ID.DIR:
    case l.TAG_ID.DIV:
    case l.TAG_ID.NAV:
    case l.TAG_ID.PRE:
    case l.TAG_ID.MAIN:
    case l.TAG_ID.MENU:
    case l.TAG_ID.ASIDE:
    case l.TAG_ID.BUTTON:
    case l.TAG_ID.CENTER:
    case l.TAG_ID.FIGURE:
    case l.TAG_ID.FOOTER:
    case l.TAG_ID.HEADER:
    case l.TAG_ID.HGROUP:
    case l.TAG_ID.DIALOG:
    case l.TAG_ID.ADDRESS:
    case l.TAG_ID.ARTICLE:
    case l.TAG_ID.DETAILS:
    case l.TAG_ID.SECTION:
    case l.TAG_ID.SUMMARY:
    case l.TAG_ID.LISTING:
    case l.TAG_ID.FIELDSET:
    case l.TAG_ID.BLOCKQUOTE:
    case l.TAG_ID.FIGCAPTION: {
      Up(e, t);
      break;
    }
    case l.TAG_ID.LI: {
      jp(e);
      break;
    }
    case l.TAG_ID.DD:
    case l.TAG_ID.DT: {
      qp(e, t);
      break;
    }
    case l.TAG_ID.H1:
    case l.TAG_ID.H2:
    case l.TAG_ID.H3:
    case l.TAG_ID.H4:
    case l.TAG_ID.H5:
    case l.TAG_ID.H6: {
      Yp(e);
      break;
    }
    case l.TAG_ID.BR: {
      $p(e);
      break;
    }
    case l.TAG_ID.BODY: {
      kp(e, t);
      break;
    }
    case l.TAG_ID.HTML: {
      Fp(e, t);
      break;
    }
    case l.TAG_ID.FORM: {
      Hp(e);
      break;
    }
    case l.TAG_ID.APPLET:
    case l.TAG_ID.OBJECT:
    case l.TAG_ID.MARQUEE: {
      Vp(e, t);
      break;
    }
    case l.TAG_ID.TEMPLATE: {
      er(e, t);
      break;
    }
    default:
      cc(e, t);
  }
}
function lc(e, t) {
  e.tmplInsertionModeStack.length > 0 ? Tc(e, t) : au(e, t);
}
function Wp(e, t) {
  var r;
  t.tagID === l.TAG_ID.SCRIPT && ((r = e.scriptHandler) === null || r === void 0 || r.call(e, e.openElements.current)), e.openElements.pop(), e.insertionMode = e.originalInsertionMode;
}
function Qp(e, t) {
  e._err(t, Fe.ERR.eofInElementThatCanContainOnlyText), e.openElements.pop(), e.insertionMode = e.originalInsertionMode, e.onEof(t);
}
function Ua(e, t) {
  if (ac.has(e.openElements.currentTagId))
    switch (e.pendingCharacterTokens.length = 0, e.hasNonWhitespacePendingCharacterToken = !1, e.originalInsertionMode = e.insertionMode, e.insertionMode = y.IN_TABLE_TEXT, t.type) {
      case xe.TokenType.CHARACTER: {
        dc(e, t);
        break;
      }
      case xe.TokenType.WHITESPACE_CHARACTER: {
        fc(e, t);
        break;
      }
    }
  else
    gn(e, t);
}
function Xp(e, t) {
  e.openElements.clearBackToTableContext(), e.activeFormattingElements.insertMarker(), e._insertElement(t, l.NS.HTML), e.insertionMode = y.IN_CAPTION;
}
function zp(e, t) {
  e.openElements.clearBackToTableContext(), e._insertElement(t, l.NS.HTML), e.insertionMode = y.IN_COLUMN_GROUP;
}
function Kp(e, t) {
  e.openElements.clearBackToTableContext(), e._insertFakeElement(l.TAG_NAMES.COLGROUP, l.TAG_ID.COLGROUP), e.insertionMode = y.IN_COLUMN_GROUP, iu(e, t);
}
function Zp(e, t) {
  e.openElements.clearBackToTableContext(), e._insertElement(t, l.NS.HTML), e.insertionMode = y.IN_TABLE_BODY;
}
function Jp(e, t) {
  e.openElements.clearBackToTableContext(), e._insertFakeElement(l.TAG_NAMES.TBODY, l.TAG_ID.TBODY), e.insertionMode = y.IN_TABLE_BODY, ba(e, t);
}
function em(e, t) {
  e.openElements.hasInTableScope(l.TAG_ID.TABLE) && (e.openElements.popUntilTagNamePopped(l.TAG_ID.TABLE), e._resetInsertionMode(), e._processStartTag(t));
}
function tm(e, t) {
  oc(t) ? e._appendElement(t, l.NS.HTML) : gn(e, t), t.ackSelfClosing = !0;
}
function rm(e, t) {
  !e.formElement && e.openElements.tmplCount === 0 && (e._insertElement(t, l.NS.HTML), e.formElement = e.openElements.current, e.openElements.pop());
}
function vr(e, t) {
  switch (t.tagID) {
    case l.TAG_ID.TD:
    case l.TAG_ID.TH:
    case l.TAG_ID.TR: {
      Jp(e, t);
      break;
    }
    case l.TAG_ID.STYLE:
    case l.TAG_ID.SCRIPT:
    case l.TAG_ID.TEMPLATE: {
      lt(e, t);
      break;
    }
    case l.TAG_ID.COL: {
      Kp(e, t);
      break;
    }
    case l.TAG_ID.FORM: {
      rm(e, t);
      break;
    }
    case l.TAG_ID.TABLE: {
      em(e, t);
      break;
    }
    case l.TAG_ID.TBODY:
    case l.TAG_ID.TFOOT:
    case l.TAG_ID.THEAD: {
      Zp(e, t);
      break;
    }
    case l.TAG_ID.INPUT: {
      tm(e, t);
      break;
    }
    case l.TAG_ID.CAPTION: {
      Xp(e, t);
      break;
    }
    case l.TAG_ID.COLGROUP: {
      zp(e, t);
      break;
    }
    default:
      gn(e, t);
  }
}
function an(e, t) {
  switch (t.tagID) {
    case l.TAG_ID.TABLE: {
      e.openElements.hasInTableScope(l.TAG_ID.TABLE) && (e.openElements.popUntilTagNamePopped(l.TAG_ID.TABLE), e._resetInsertionMode());
      break;
    }
    case l.TAG_ID.TEMPLATE: {
      er(e, t);
      break;
    }
    case l.TAG_ID.BODY:
    case l.TAG_ID.CAPTION:
    case l.TAG_ID.COL:
    case l.TAG_ID.COLGROUP:
    case l.TAG_ID.HTML:
    case l.TAG_ID.TBODY:
    case l.TAG_ID.TD:
    case l.TAG_ID.TFOOT:
    case l.TAG_ID.TH:
    case l.TAG_ID.THEAD:
    case l.TAG_ID.TR:
      break;
    default:
      gn(e, t);
  }
}
function gn(e, t) {
  const r = e.fosterParentingEnabled;
  e.fosterParentingEnabled = !0, ga(e, t), e.fosterParentingEnabled = r;
}
function fc(e, t) {
  e.pendingCharacterTokens.push(t);
}
function dc(e, t) {
  e.pendingCharacterTokens.push(t), e.hasNonWhitespacePendingCharacterToken = !0;
}
function jr(e, t) {
  let r = 0;
  if (e.hasNonWhitespacePendingCharacterToken)
    for (; r < e.pendingCharacterTokens.length; r++)
      gn(e, e.pendingCharacterTokens[r]);
  else
    for (; r < e.pendingCharacterTokens.length; r++)
      e._insertCharacters(e.pendingCharacterTokens[r]);
  e.insertionMode = e.originalInsertionMode, e._processToken(t);
}
const hc = /* @__PURE__ */ new Set([l.TAG_ID.CAPTION, l.TAG_ID.COL, l.TAG_ID.COLGROUP, l.TAG_ID.TBODY, l.TAG_ID.TD, l.TAG_ID.TFOOT, l.TAG_ID.TH, l.TAG_ID.THEAD, l.TAG_ID.TR]);
function nm(e, t) {
  const r = t.tagID;
  hc.has(r) ? e.openElements.hasInTableScope(l.TAG_ID.CAPTION) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(l.TAG_ID.CAPTION), e.activeFormattingElements.clearToLastMarker(), e.insertionMode = y.IN_TABLE, vr(e, t)) : Ge(e, t);
}
function am(e, t) {
  const r = t.tagID;
  switch (r) {
    case l.TAG_ID.CAPTION:
    case l.TAG_ID.TABLE: {
      e.openElements.hasInTableScope(l.TAG_ID.CAPTION) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(l.TAG_ID.CAPTION), e.activeFormattingElements.clearToLastMarker(), e.insertionMode = y.IN_TABLE, r === l.TAG_ID.TABLE && an(e, t));
      break;
    }
    case l.TAG_ID.BODY:
    case l.TAG_ID.COL:
    case l.TAG_ID.COLGROUP:
    case l.TAG_ID.HTML:
    case l.TAG_ID.TBODY:
    case l.TAG_ID.TD:
    case l.TAG_ID.TFOOT:
    case l.TAG_ID.TH:
    case l.TAG_ID.THEAD:
    case l.TAG_ID.TR:
      break;
    default:
      _a(e, t);
  }
}
function iu(e, t) {
  switch (t.tagID) {
    case l.TAG_ID.HTML: {
      Ge(e, t);
      break;
    }
    case l.TAG_ID.COL: {
      e._appendElement(t, l.NS.HTML), t.ackSelfClosing = !0;
      break;
    }
    case l.TAG_ID.TEMPLATE: {
      lt(e, t);
      break;
    }
    default:
      Qn(e, t);
  }
}
function im(e, t) {
  switch (t.tagID) {
    case l.TAG_ID.COLGROUP: {
      e.openElements.currentTagId === l.TAG_ID.COLGROUP && (e.openElements.pop(), e.insertionMode = y.IN_TABLE);
      break;
    }
    case l.TAG_ID.TEMPLATE: {
      er(e, t);
      break;
    }
    case l.TAG_ID.COL:
      break;
    default:
      Qn(e, t);
  }
}
function Qn(e, t) {
  e.openElements.currentTagId === l.TAG_ID.COLGROUP && (e.openElements.pop(), e.insertionMode = y.IN_TABLE, e._processToken(t));
}
function ba(e, t) {
  switch (t.tagID) {
    case l.TAG_ID.TR: {
      e.openElements.clearBackToTableBodyContext(), e._insertElement(t, l.NS.HTML), e.insertionMode = y.IN_ROW;
      break;
    }
    case l.TAG_ID.TH:
    case l.TAG_ID.TD: {
      e.openElements.clearBackToTableBodyContext(), e._insertFakeElement(l.TAG_NAMES.TR, l.TAG_ID.TR), e.insertionMode = y.IN_ROW, Aa(e, t);
      break;
    }
    case l.TAG_ID.CAPTION:
    case l.TAG_ID.COL:
    case l.TAG_ID.COLGROUP:
    case l.TAG_ID.TBODY:
    case l.TAG_ID.TFOOT:
    case l.TAG_ID.THEAD: {
      e.openElements.hasTableBodyContextInTableScope() && (e.openElements.clearBackToTableBodyContext(), e.openElements.pop(), e.insertionMode = y.IN_TABLE, vr(e, t));
      break;
    }
    default:
      vr(e, t);
  }
}
function gi(e, t) {
  const r = t.tagID;
  switch (t.tagID) {
    case l.TAG_ID.TBODY:
    case l.TAG_ID.TFOOT:
    case l.TAG_ID.THEAD: {
      e.openElements.hasInTableScope(r) && (e.openElements.clearBackToTableBodyContext(), e.openElements.pop(), e.insertionMode = y.IN_TABLE);
      break;
    }
    case l.TAG_ID.TABLE: {
      e.openElements.hasTableBodyContextInTableScope() && (e.openElements.clearBackToTableBodyContext(), e.openElements.pop(), e.insertionMode = y.IN_TABLE, an(e, t));
      break;
    }
    case l.TAG_ID.BODY:
    case l.TAG_ID.CAPTION:
    case l.TAG_ID.COL:
    case l.TAG_ID.COLGROUP:
    case l.TAG_ID.HTML:
    case l.TAG_ID.TD:
    case l.TAG_ID.TH:
    case l.TAG_ID.TR:
      break;
    default:
      an(e, t);
  }
}
function Aa(e, t) {
  switch (t.tagID) {
    case l.TAG_ID.TH:
    case l.TAG_ID.TD: {
      e.openElements.clearBackToTableRowContext(), e._insertElement(t, l.NS.HTML), e.insertionMode = y.IN_CELL, e.activeFormattingElements.insertMarker();
      break;
    }
    case l.TAG_ID.CAPTION:
    case l.TAG_ID.COL:
    case l.TAG_ID.COLGROUP:
    case l.TAG_ID.TBODY:
    case l.TAG_ID.TFOOT:
    case l.TAG_ID.THEAD:
    case l.TAG_ID.TR: {
      e.openElements.hasInTableScope(l.TAG_ID.TR) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = y.IN_TABLE_BODY, ba(e, t));
      break;
    }
    default:
      vr(e, t);
  }
}
function pc(e, t) {
  switch (t.tagID) {
    case l.TAG_ID.TR: {
      e.openElements.hasInTableScope(l.TAG_ID.TR) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = y.IN_TABLE_BODY);
      break;
    }
    case l.TAG_ID.TABLE: {
      e.openElements.hasInTableScope(l.TAG_ID.TR) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = y.IN_TABLE_BODY, gi(e, t));
      break;
    }
    case l.TAG_ID.TBODY:
    case l.TAG_ID.TFOOT:
    case l.TAG_ID.THEAD: {
      (e.openElements.hasInTableScope(t.tagID) || e.openElements.hasInTableScope(l.TAG_ID.TR)) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = y.IN_TABLE_BODY, gi(e, t));
      break;
    }
    case l.TAG_ID.BODY:
    case l.TAG_ID.CAPTION:
    case l.TAG_ID.COL:
    case l.TAG_ID.COLGROUP:
    case l.TAG_ID.HTML:
    case l.TAG_ID.TD:
    case l.TAG_ID.TH:
      break;
    default:
      an(e, t);
  }
}
function um(e, t) {
  const r = t.tagID;
  hc.has(r) ? (e.openElements.hasInTableScope(l.TAG_ID.TD) || e.openElements.hasInTableScope(l.TAG_ID.TH)) && (e._closeTableCell(), Aa(e, t)) : Ge(e, t);
}
function sm(e, t) {
  const r = t.tagID;
  switch (r) {
    case l.TAG_ID.TD:
    case l.TAG_ID.TH: {
      e.openElements.hasInTableScope(r) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(r), e.activeFormattingElements.clearToLastMarker(), e.insertionMode = y.IN_ROW);
      break;
    }
    case l.TAG_ID.TABLE:
    case l.TAG_ID.TBODY:
    case l.TAG_ID.TFOOT:
    case l.TAG_ID.THEAD:
    case l.TAG_ID.TR: {
      e.openElements.hasInTableScope(r) && (e._closeTableCell(), pc(e, t));
      break;
    }
    case l.TAG_ID.BODY:
    case l.TAG_ID.CAPTION:
    case l.TAG_ID.COL:
    case l.TAG_ID.COLGROUP:
    case l.TAG_ID.HTML:
      break;
    default:
      _a(e, t);
  }
}
function mc(e, t) {
  switch (t.tagID) {
    case l.TAG_ID.HTML: {
      Ge(e, t);
      break;
    }
    case l.TAG_ID.OPTION: {
      e.openElements.currentTagId === l.TAG_ID.OPTION && e.openElements.pop(), e._insertElement(t, l.NS.HTML);
      break;
    }
    case l.TAG_ID.OPTGROUP: {
      e.openElements.currentTagId === l.TAG_ID.OPTION && e.openElements.pop(), e.openElements.currentTagId === l.TAG_ID.OPTGROUP && e.openElements.pop(), e._insertElement(t, l.NS.HTML);
      break;
    }
    case l.TAG_ID.INPUT:
    case l.TAG_ID.KEYGEN:
    case l.TAG_ID.TEXTAREA:
    case l.TAG_ID.SELECT: {
      e.openElements.hasInSelectScope(l.TAG_ID.SELECT) && (e.openElements.popUntilTagNamePopped(l.TAG_ID.SELECT), e._resetInsertionMode(), t.tagID !== l.TAG_ID.SELECT && e._processStartTag(t));
      break;
    }
    case l.TAG_ID.SCRIPT:
    case l.TAG_ID.TEMPLATE: {
      lt(e, t);
      break;
    }
  }
}
function Ec(e, t) {
  switch (t.tagID) {
    case l.TAG_ID.OPTGROUP: {
      e.openElements.stackTop > 0 && e.openElements.currentTagId === l.TAG_ID.OPTION && e.openElements.tagIDs[e.openElements.stackTop - 1] === l.TAG_ID.OPTGROUP && e.openElements.pop(), e.openElements.currentTagId === l.TAG_ID.OPTGROUP && e.openElements.pop();
      break;
    }
    case l.TAG_ID.OPTION: {
      e.openElements.currentTagId === l.TAG_ID.OPTION && e.openElements.pop();
      break;
    }
    case l.TAG_ID.SELECT: {
      e.openElements.hasInSelectScope(l.TAG_ID.SELECT) && (e.openElements.popUntilTagNamePopped(l.TAG_ID.SELECT), e._resetInsertionMode());
      break;
    }
    case l.TAG_ID.TEMPLATE: {
      er(e, t);
      break;
    }
  }
}
function om(e, t) {
  const r = t.tagID;
  r === l.TAG_ID.CAPTION || r === l.TAG_ID.TABLE || r === l.TAG_ID.TBODY || r === l.TAG_ID.TFOOT || r === l.TAG_ID.THEAD || r === l.TAG_ID.TR || r === l.TAG_ID.TD || r === l.TAG_ID.TH ? (e.openElements.popUntilTagNamePopped(l.TAG_ID.SELECT), e._resetInsertionMode(), e._processStartTag(t)) : mc(e, t);
}
function cm(e, t) {
  const r = t.tagID;
  r === l.TAG_ID.CAPTION || r === l.TAG_ID.TABLE || r === l.TAG_ID.TBODY || r === l.TAG_ID.TFOOT || r === l.TAG_ID.THEAD || r === l.TAG_ID.TR || r === l.TAG_ID.TD || r === l.TAG_ID.TH ? e.openElements.hasInTableScope(r) && (e.openElements.popUntilTagNamePopped(l.TAG_ID.SELECT), e._resetInsertionMode(), e.onEndTag(t)) : Ec(e, t);
}
function lm(e, t) {
  switch (t.tagID) {
    case l.TAG_ID.BASE:
    case l.TAG_ID.BASEFONT:
    case l.TAG_ID.BGSOUND:
    case l.TAG_ID.LINK:
    case l.TAG_ID.META:
    case l.TAG_ID.NOFRAMES:
    case l.TAG_ID.SCRIPT:
    case l.TAG_ID.STYLE:
    case l.TAG_ID.TEMPLATE:
    case l.TAG_ID.TITLE: {
      lt(e, t);
      break;
    }
    case l.TAG_ID.CAPTION:
    case l.TAG_ID.COLGROUP:
    case l.TAG_ID.TBODY:
    case l.TAG_ID.TFOOT:
    case l.TAG_ID.THEAD: {
      e.tmplInsertionModeStack[0] = y.IN_TABLE, e.insertionMode = y.IN_TABLE, vr(e, t);
      break;
    }
    case l.TAG_ID.COL: {
      e.tmplInsertionModeStack[0] = y.IN_COLUMN_GROUP, e.insertionMode = y.IN_COLUMN_GROUP, iu(e, t);
      break;
    }
    case l.TAG_ID.TR: {
      e.tmplInsertionModeStack[0] = y.IN_TABLE_BODY, e.insertionMode = y.IN_TABLE_BODY, ba(e, t);
      break;
    }
    case l.TAG_ID.TD:
    case l.TAG_ID.TH: {
      e.tmplInsertionModeStack[0] = y.IN_ROW, e.insertionMode = y.IN_ROW, Aa(e, t);
      break;
    }
    default:
      e.tmplInsertionModeStack[0] = y.IN_BODY, e.insertionMode = y.IN_BODY, Ge(e, t);
  }
}
function fm(e, t) {
  t.tagID === l.TAG_ID.TEMPLATE && er(e, t);
}
function Tc(e, t) {
  e.openElements.tmplCount > 0 ? (e.openElements.popUntilTagNamePopped(l.TAG_ID.TEMPLATE), e.activeFormattingElements.clearToLastMarker(), e.tmplInsertionModeStack.shift(), e._resetInsertionMode(), e.onEof(t)) : au(e, t);
}
function dm(e, t) {
  t.tagID === l.TAG_ID.HTML ? Ge(e, t) : Xn(e, t);
}
function gc(e, t) {
  var r;
  if (t.tagID === l.TAG_ID.HTML) {
    if (e.fragmentContext || (e.insertionMode = y.AFTER_AFTER_BODY), e.options.sourceCodeLocationInfo && e.openElements.tagIDs[0] === l.TAG_ID.HTML) {
      e._setEndLocation(e.openElements.items[0], t);
      const n = e.openElements.items[1];
      n && !(!((r = e.treeAdapter.getNodeSourceCodeLocation(n)) === null || r === void 0) && r.endTag) && e._setEndLocation(n, t);
    }
  } else
    Xn(e, t);
}
function Xn(e, t) {
  e.insertionMode = y.IN_BODY, ga(e, t);
}
function hm(e, t) {
  switch (t.tagID) {
    case l.TAG_ID.HTML: {
      Ge(e, t);
      break;
    }
    case l.TAG_ID.FRAMESET: {
      e._insertElement(t, l.NS.HTML);
      break;
    }
    case l.TAG_ID.FRAME: {
      e._appendElement(t, l.NS.HTML), t.ackSelfClosing = !0;
      break;
    }
    case l.TAG_ID.NOFRAMES: {
      lt(e, t);
      break;
    }
  }
}
function pm(e, t) {
  t.tagID === l.TAG_ID.FRAMESET && !e.openElements.isRootHtmlElementCurrent() && (e.openElements.pop(), !e.fragmentContext && e.openElements.currentTagId !== l.TAG_ID.FRAMESET && (e.insertionMode = y.AFTER_FRAMESET));
}
function mm(e, t) {
  switch (t.tagID) {
    case l.TAG_ID.HTML: {
      Ge(e, t);
      break;
    }
    case l.TAG_ID.NOFRAMES: {
      lt(e, t);
      break;
    }
  }
}
function Em(e, t) {
  t.tagID === l.TAG_ID.HTML && (e.insertionMode = y.AFTER_AFTER_FRAMESET);
}
function Tm(e, t) {
  t.tagID === l.TAG_ID.HTML ? Ge(e, t) : Mn(e, t);
}
function Mn(e, t) {
  e.insertionMode = y.IN_BODY, ga(e, t);
}
function gm(e, t) {
  switch (t.tagID) {
    case l.TAG_ID.HTML: {
      Ge(e, t);
      break;
    }
    case l.TAG_ID.NOFRAMES: {
      lt(e, t);
      break;
    }
  }
}
function _m(e, t) {
  t.chars = nc.REPLACEMENT_CHARACTER, e._insertCharacters(t);
}
function bm(e, t) {
  e._insertCharacters(t), e.framesetOk = !1;
}
function _c(e) {
  for (; e.treeAdapter.getNamespaceURI(e.openElements.current) !== l.NS.HTML && !e._isIntegrationPoint(e.openElements.currentTagId, e.openElements.current); )
    e.openElements.pop();
}
function Am(e, t) {
  if (_t.causesExit(t))
    _c(e), e._startTagOutsideForeignContent(t);
  else {
    const r = e._getAdjustedCurrentElement(), n = e.treeAdapter.getNamespaceURI(r);
    n === l.NS.MATHML ? _t.adjustTokenMathMLAttrs(t) : n === l.NS.SVG && (_t.adjustTokenSVGTagName(t), _t.adjustTokenSVGAttrs(t)), _t.adjustTokenXMLAttrs(t), t.selfClosing ? e._appendElement(t, n) : e._insertElement(t, n), t.ackSelfClosing = !0;
  }
}
function Im(e, t) {
  if (t.tagID === l.TAG_ID.P || t.tagID === l.TAG_ID.BR) {
    _c(e), e._endTagOutsideForeignContent(t);
    return;
  }
  for (let r = e.openElements.stackTop; r > 0; r--) {
    const n = e.openElements.items[r];
    if (e.treeAdapter.getNamespaceURI(n) === l.NS.HTML) {
      e._endTagOutsideForeignContent(t);
      break;
    }
    const a = e.treeAdapter.getTagName(n);
    if (a.toLowerCase() === t.tagName) {
      t.tagName = a, e.openElements.shortenToLength(r);
      break;
    }
  }
}
var Rr = {};
Object.defineProperty(Rr, "__esModule", { value: !0 });
Rr.serializeOuter = Rr.serialize = void 0;
const _e = Rt, bc = en, ym = Ta, Cm = /* @__PURE__ */ new Set([
  _e.TAG_NAMES.AREA,
  _e.TAG_NAMES.BASE,
  _e.TAG_NAMES.BASEFONT,
  _e.TAG_NAMES.BGSOUND,
  _e.TAG_NAMES.BR,
  _e.TAG_NAMES.COL,
  _e.TAG_NAMES.EMBED,
  _e.TAG_NAMES.FRAME,
  _e.TAG_NAMES.HR,
  _e.TAG_NAMES.IMG,
  _e.TAG_NAMES.INPUT,
  _e.TAG_NAMES.KEYGEN,
  _e.TAG_NAMES.LINK,
  _e.TAG_NAMES.META,
  _e.TAG_NAMES.PARAM,
  _e.TAG_NAMES.SOURCE,
  _e.TAG_NAMES.TRACK,
  _e.TAG_NAMES.WBR
]);
function Ac(e, t) {
  return t.treeAdapter.isElementNode(e) && t.treeAdapter.getNamespaceURI(e) === _e.NS.HTML && Cm.has(t.treeAdapter.getTagName(e));
}
const Ic = { treeAdapter: ym.defaultTreeAdapter, scriptingEnabled: !0 };
function Nm(e, t) {
  const r = Object.assign(Object.assign({}, Ic), t);
  return Ac(e, r) ? "" : yc(e, r);
}
Rr.serialize = Nm;
function Dm(e, t) {
  const r = Object.assign(Object.assign({}, Ic), t);
  return Cc(e, r);
}
Rr.serializeOuter = Dm;
function yc(e, t) {
  let r = "";
  const n = t.treeAdapter.isElementNode(e) && t.treeAdapter.getTagName(e) === _e.TAG_NAMES.TEMPLATE && t.treeAdapter.getNamespaceURI(e) === _e.NS.HTML ? t.treeAdapter.getTemplateContent(e) : e, a = t.treeAdapter.getChildNodes(n);
  if (a)
    for (const i of a)
      r += Cc(i, t);
  return r;
}
function Cc(e, t) {
  return t.treeAdapter.isElementNode(e) ? Sm(e, t) : t.treeAdapter.isTextNode(e) ? vm(e, t) : t.treeAdapter.isCommentNode(e) ? Rm(e, t) : t.treeAdapter.isDocumentTypeNode(e) ? Pm(e, t) : "";
}
function Sm(e, t) {
  const r = t.treeAdapter.getTagName(e);
  return `<${r}${Om(e, t)}>${Ac(e, t) ? "" : `${yc(e, t)}</${r}>`}`;
}
function Om(e, { treeAdapter: t }) {
  let r = "";
  for (const n of t.getAttrList(e)) {
    if (r += " ", !n.namespace)
      r += n.name;
    else
      switch (n.namespace) {
        case _e.NS.XML: {
          r += `xml:${n.name}`;
          break;
        }
        case _e.NS.XMLNS: {
          n.name !== "xmlns" && (r += "xmlns:"), r += n.name;
          break;
        }
        case _e.NS.XLINK: {
          r += `xlink:${n.name}`;
          break;
        }
        default:
          r += `${n.prefix}:${n.name}`;
      }
    r += `="${(0, bc.escapeAttribute)(n.value)}"`;
  }
  return r;
}
function vm(e, t) {
  const { treeAdapter: r } = t, n = r.getTextNodeContent(e), a = r.getParentNode(e), i = a && r.isElementNode(a) && r.getTagName(a);
  return i && r.getNamespaceURI(a) === _e.NS.HTML && (0, _e.hasUnescapedText)(i, t.scriptingEnabled) ? n : (0, bc.escapeText)(n);
}
function Rm(e, { treeAdapter: t }) {
  return `<!--${t.getCommentNodeContent(e)}-->`;
}
function Pm(e, { treeAdapter: t }) {
  return `<!DOCTYPE ${t.getDocumentTypeNodeName(e)}>`;
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.parseFragment = e.parse = e.TokenizerMode = e.Tokenizer = e.Token = e.html = e.foreignContent = e.ErrorCodes = e.serializeOuter = e.serialize = e.Parser = e.defaultTreeAdapter = void 0;
  const t = nn;
  var r = Ta;
  Object.defineProperty(e, "defaultTreeAdapter", { enumerable: !0, get: function() {
    return r.defaultTreeAdapter;
  } });
  var n = nn;
  Object.defineProperty(e, "Parser", { enumerable: !0, get: function() {
    return n.Parser;
  } });
  var a = Rr;
  Object.defineProperty(e, "serialize", { enumerable: !0, get: function() {
    return a.serialize;
  } }), Object.defineProperty(e, "serializeOuter", { enumerable: !0, get: function() {
    return a.serializeOuter;
  } });
  var i = Tn;
  Object.defineProperty(e, "ErrorCodes", { enumerable: !0, get: function() {
    return i.ERR;
  } }), e.foreignContent = ru, e.html = Rt, e.Token = ma;
  var u = zt;
  Object.defineProperty(e, "Tokenizer", { enumerable: !0, get: function() {
    return u.Tokenizer;
  } }), Object.defineProperty(e, "TokenizerMode", { enumerable: !0, get: function() {
    return u.TokenizerMode;
  } });
  function o(h, s) {
    return t.Parser.parse(h, s);
  }
  e.parse = o;
  function c(h, s, g) {
    typeof h == "string" && (g = s, s = h, h = null);
    const p = t.Parser.getFragmentParser(h, g);
    return p.tokenizer.write(s, !0), p.getFragment();
  }
  e.parseFragment = c;
})(rn);
var Nc = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.adapter = e.serializeDoctypeContent = void 0;
  const t = rn, r = He;
  function n(u) {
    return new r.Text(u);
  }
  function a(u) {
    const o = u.includes('"') ? "'" : '"';
    return o + u + o;
  }
  function i(u, o, c) {
    let h = "!DOCTYPE ";
    return u && (h += u), o ? h += ` PUBLIC ${a(o)}` : c && (h += " SYSTEM"), c && (h += ` ${a(c)}`), h;
  }
  e.serializeDoctypeContent = i, e.adapter = {
    // Re-exports from domhandler
    isCommentNode: r.isComment,
    isElementNode: r.isTag,
    isTextNode: r.isText,
    //Node construction
    createDocument() {
      const u = new r.Document([]);
      return u["x-mode"] = t.html.DOCUMENT_MODE.NO_QUIRKS, u;
    },
    createDocumentFragment() {
      return new r.Document([]);
    },
    createElement(u, o, c) {
      const h = /* @__PURE__ */ Object.create(null), s = /* @__PURE__ */ Object.create(null), g = /* @__PURE__ */ Object.create(null);
      for (let m = 0; m < c.length; m++) {
        const b = c[m].name;
        h[b] = c[m].value, s[b] = c[m].namespace, g[b] = c[m].prefix;
      }
      const p = new r.Element(u, h, []);
      return p.namespace = o, p["x-attribsNamespace"] = s, p["x-attribsPrefix"] = g, p;
    },
    createCommentNode(u) {
      return new r.Comment(u);
    },
    //Tree mutation
    appendChild(u, o) {
      const c = u.children[u.children.length - 1];
      c && (c.next = o, o.prev = c), u.children.push(o), o.parent = u;
    },
    insertBefore(u, o, c) {
      const h = u.children.indexOf(c), { prev: s } = c;
      s && (s.next = o, o.prev = s), c.prev = o, o.next = c, u.children.splice(h, 0, o), o.parent = u;
    },
    setTemplateContent(u, o) {
      e.adapter.appendChild(u, o);
    },
    getTemplateContent(u) {
      return u.children[0];
    },
    setDocumentType(u, o, c, h) {
      const s = i(o, c, h);
      let g = u.children.find((p) => (0, r.isDirective)(p) && p.name === "!doctype");
      g ? g.data = s ?? null : (g = new r.ProcessingInstruction("!doctype", s), e.adapter.appendChild(u, g)), g["x-name"] = o ?? void 0, g["x-publicId"] = c ?? void 0, g["x-systemId"] = h ?? void 0;
    },
    setDocumentMode(u, o) {
      u["x-mode"] = o;
    },
    getDocumentMode(u) {
      return u["x-mode"];
    },
    detachNode(u) {
      if (u.parent) {
        const o = u.parent.children.indexOf(u), { prev: c, next: h } = u;
        u.prev = null, u.next = null, c && (c.next = h), h && (h.prev = c), u.parent.children.splice(o, 1), u.parent = null;
      }
    },
    insertText(u, o) {
      const c = u.children[u.children.length - 1];
      c && (0, r.isText)(c) ? c.data += o : e.adapter.appendChild(u, n(o));
    },
    insertTextBefore(u, o, c) {
      const h = u.children[u.children.indexOf(c) - 1];
      h && (0, r.isText)(h) ? h.data += o : e.adapter.insertBefore(u, n(o), c);
    },
    adoptAttributes(u, o) {
      for (let c = 0; c < o.length; c++) {
        const h = o[c].name;
        typeof u.attribs[h] > "u" && (u.attribs[h] = o[c].value, u["x-attribsNamespace"][h] = o[c].namespace, u["x-attribsPrefix"][h] = o[c].prefix);
      }
    },
    //Tree traversing
    getFirstChild(u) {
      return u.children[0];
    },
    getChildNodes(u) {
      return u.children;
    },
    getParentNode(u) {
      return u.parent;
    },
    getAttrList(u) {
      return u.attributes;
    },
    //Node data
    getTagName(u) {
      return u.name;
    },
    getNamespaceURI(u) {
      return u.namespace;
    },
    getTextNodeContent(u) {
      return u.data;
    },
    getCommentNodeContent(u) {
      return u.data;
    },
    getDocumentTypeNodeName(u) {
      var o;
      return (o = u["x-name"]) !== null && o !== void 0 ? o : "";
    },
    getDocumentTypeNodePublicId(u) {
      var o;
      return (o = u["x-publicId"]) !== null && o !== void 0 ? o : "";
    },
    getDocumentTypeNodeSystemId(u) {
      var o;
      return (o = u["x-systemId"]) !== null && o !== void 0 ? o : "";
    },
    //Node types
    isDocumentTypeNode(u) {
      return (0, r.isDirective)(u) && u.name === "!doctype";
    },
    // Source code location
    setNodeSourceCodeLocation(u, o) {
      o && (u.startIndex = o.startOffset, u.endIndex = o.endOffset), u.sourceCodeLocation = o;
    },
    getNodeSourceCodeLocation(u) {
      return u.sourceCodeLocation;
    },
    updateNodeSourceCodeLocation(u, o) {
      o.endOffset != null && (u.endIndex = o.endOffset), u.sourceCodeLocation = Object.assign(Object.assign({}, u.sourceCodeLocation), o);
    }
  };
})(Nc);
var Lm = w && w.__spreadArray || function(e, t, r) {
  if (r || arguments.length === 2)
    for (var n = 0, a = t.length, i; n < a; n++)
      (i || !(n in t)) && (i || (i = Array.prototype.slice.call(t, 0, n)), i[n] = t[n]);
  return e.concat(i || Array.prototype.slice.call(t));
};
Object.defineProperty(Sr, "__esModule", { value: !0 });
Sr.renderWithParse5 = Sr.parseWithParse5 = void 0;
var xm = He, _i = rn, Dc = Nc;
function wm(e, t, r, n) {
  var a = {
    scriptingEnabled: typeof t.scriptingEnabled == "boolean" ? t.scriptingEnabled : !0,
    treeAdapter: Dc.adapter,
    sourceCodeLocationInfo: t.sourceCodeLocationInfo
  };
  return r ? (0, _i.parse)(e, a) : (0, _i.parseFragment)(n, e, a);
}
Sr.parseWithParse5 = wm;
var Mm = { treeAdapter: Dc.adapter };
function Bm(e) {
  for (var t, r = ("length" in e) ? e : [e], n = 0; n < r.length; n += 1) {
    var a = r[n];
    (0, xm.isDocument)(a) && (t = Array.prototype.splice).call.apply(t, Lm([r, n, 1], a.children, !1));
  }
  for (var i = "", n = 0; n < r.length; n += 1) {
    var a = r[n];
    i += (0, _i.serializeOuter)(a, Mm);
  }
  return i;
}
Sr.renderWithParse5 = Bm;
var Sc = {}, un = {}, uu = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.QuoteType = void 0;
  var t = Ar, r;
  (function(p) {
    p[p.Tab = 9] = "Tab", p[p.NewLine = 10] = "NewLine", p[p.FormFeed = 12] = "FormFeed", p[p.CarriageReturn = 13] = "CarriageReturn", p[p.Space = 32] = "Space", p[p.ExclamationMark = 33] = "ExclamationMark", p[p.Number = 35] = "Number", p[p.Amp = 38] = "Amp", p[p.SingleQuote = 39] = "SingleQuote", p[p.DoubleQuote = 34] = "DoubleQuote", p[p.Dash = 45] = "Dash", p[p.Slash = 47] = "Slash", p[p.Zero = 48] = "Zero", p[p.Nine = 57] = "Nine", p[p.Semi = 59] = "Semi", p[p.Lt = 60] = "Lt", p[p.Eq = 61] = "Eq", p[p.Gt = 62] = "Gt", p[p.Questionmark = 63] = "Questionmark", p[p.UpperA = 65] = "UpperA", p[p.LowerA = 97] = "LowerA", p[p.UpperF = 70] = "UpperF", p[p.LowerF = 102] = "LowerF", p[p.UpperZ = 90] = "UpperZ", p[p.LowerZ = 122] = "LowerZ", p[p.LowerX = 120] = "LowerX", p[p.OpeningSquareBracket = 91] = "OpeningSquareBracket";
  })(r || (r = {}));
  var n;
  (function(p) {
    p[p.Text = 1] = "Text", p[p.BeforeTagName = 2] = "BeforeTagName", p[p.InTagName = 3] = "InTagName", p[p.InSelfClosingTag = 4] = "InSelfClosingTag", p[p.BeforeClosingTagName = 5] = "BeforeClosingTagName", p[p.InClosingTagName = 6] = "InClosingTagName", p[p.AfterClosingTagName = 7] = "AfterClosingTagName", p[p.BeforeAttributeName = 8] = "BeforeAttributeName", p[p.InAttributeName = 9] = "InAttributeName", p[p.AfterAttributeName = 10] = "AfterAttributeName", p[p.BeforeAttributeValue = 11] = "BeforeAttributeValue", p[p.InAttributeValueDq = 12] = "InAttributeValueDq", p[p.InAttributeValueSq = 13] = "InAttributeValueSq", p[p.InAttributeValueNq = 14] = "InAttributeValueNq", p[p.BeforeDeclaration = 15] = "BeforeDeclaration", p[p.InDeclaration = 16] = "InDeclaration", p[p.InProcessingInstruction = 17] = "InProcessingInstruction", p[p.BeforeComment = 18] = "BeforeComment", p[p.CDATASequence = 19] = "CDATASequence", p[p.InSpecialComment = 20] = "InSpecialComment", p[p.InCommentLike = 21] = "InCommentLike", p[p.BeforeSpecialS = 22] = "BeforeSpecialS", p[p.SpecialStartSequence = 23] = "SpecialStartSequence", p[p.InSpecialTag = 24] = "InSpecialTag", p[p.BeforeEntity = 25] = "BeforeEntity", p[p.BeforeNumericEntity = 26] = "BeforeNumericEntity", p[p.InNamedEntity = 27] = "InNamedEntity", p[p.InNumericEntity = 28] = "InNumericEntity", p[p.InHexEntity = 29] = "InHexEntity";
  })(n || (n = {}));
  function a(p) {
    return p === r.Space || p === r.NewLine || p === r.Tab || p === r.FormFeed || p === r.CarriageReturn;
  }
  function i(p) {
    return p === r.Slash || p === r.Gt || a(p);
  }
  function u(p) {
    return p >= r.Zero && p <= r.Nine;
  }
  function o(p) {
    return p >= r.LowerA && p <= r.LowerZ || p >= r.UpperA && p <= r.UpperZ;
  }
  function c(p) {
    return p >= r.UpperA && p <= r.UpperF || p >= r.LowerA && p <= r.LowerF;
  }
  var h;
  (function(p) {
    p[p.NoValue = 0] = "NoValue", p[p.Unquoted = 1] = "Unquoted", p[p.Single = 2] = "Single", p[p.Double = 3] = "Double";
  })(h = e.QuoteType || (e.QuoteType = {}));
  var s = {
    Cdata: new Uint8Array([67, 68, 65, 84, 65, 91]),
    CdataEnd: new Uint8Array([93, 93, 62]),
    CommentEnd: new Uint8Array([45, 45, 62]),
    ScriptEnd: new Uint8Array([60, 47, 115, 99, 114, 105, 112, 116]),
    StyleEnd: new Uint8Array([60, 47, 115, 116, 121, 108, 101]),
    TitleEnd: new Uint8Array([60, 47, 116, 105, 116, 108, 101])
    // `</title`
  }, g = (
    /** @class */
    function() {
      function p(m, b) {
        var R = m.xmlMode, C = R === void 0 ? !1 : R, D = m.decodeEntities, S = D === void 0 ? !0 : D;
        this.cbs = b, this.state = n.Text, this.buffer = "", this.sectionStart = 0, this.index = 0, this.baseState = n.Text, this.isSpecial = !1, this.running = !0, this.offset = 0, this.currentSequence = void 0, this.sequenceIndex = 0, this.trieIndex = 0, this.trieCurrent = 0, this.entityResult = 0, this.entityExcess = 0, this.xmlMode = C, this.decodeEntities = S, this.entityTrie = C ? t.xmlDecodeTree : t.htmlDecodeTree;
      }
      return p.prototype.reset = function() {
        this.state = n.Text, this.buffer = "", this.sectionStart = 0, this.index = 0, this.baseState = n.Text, this.currentSequence = void 0, this.running = !0, this.offset = 0;
      }, p.prototype.write = function(m) {
        this.offset += this.buffer.length, this.buffer = m, this.parse();
      }, p.prototype.end = function() {
        this.running && this.finish();
      }, p.prototype.pause = function() {
        this.running = !1;
      }, p.prototype.resume = function() {
        this.running = !0, this.index < this.buffer.length + this.offset && this.parse();
      }, p.prototype.getIndex = function() {
        return this.index;
      }, p.prototype.getSectionStart = function() {
        return this.sectionStart;
      }, p.prototype.stateText = function(m) {
        m === r.Lt || !this.decodeEntities && this.fastForwardTo(r.Lt) ? (this.index > this.sectionStart && this.cbs.ontext(this.sectionStart, this.index), this.state = n.BeforeTagName, this.sectionStart = this.index) : this.decodeEntities && m === r.Amp && (this.state = n.BeforeEntity);
      }, p.prototype.stateSpecialStartSequence = function(m) {
        var b = this.sequenceIndex === this.currentSequence.length, R = b ? (
          // If we are at the end of the sequence, make sure the tag name has ended
          i(m)
        ) : (
          // Otherwise, do a case-insensitive comparison
          (m | 32) === this.currentSequence[this.sequenceIndex]
        );
        if (!R)
          this.isSpecial = !1;
        else if (!b) {
          this.sequenceIndex++;
          return;
        }
        this.sequenceIndex = 0, this.state = n.InTagName, this.stateInTagName(m);
      }, p.prototype.stateInSpecialTag = function(m) {
        if (this.sequenceIndex === this.currentSequence.length) {
          if (m === r.Gt || a(m)) {
            var b = this.index - this.currentSequence.length;
            if (this.sectionStart < b) {
              var R = this.index;
              this.index = b, this.cbs.ontext(this.sectionStart, b), this.index = R;
            }
            this.isSpecial = !1, this.sectionStart = b + 2, this.stateInClosingTagName(m);
            return;
          }
          this.sequenceIndex = 0;
        }
        (m | 32) === this.currentSequence[this.sequenceIndex] ? this.sequenceIndex += 1 : this.sequenceIndex === 0 ? this.currentSequence === s.TitleEnd ? this.decodeEntities && m === r.Amp && (this.state = n.BeforeEntity) : this.fastForwardTo(r.Lt) && (this.sequenceIndex = 1) : this.sequenceIndex = +(m === r.Lt);
      }, p.prototype.stateCDATASequence = function(m) {
        m === s.Cdata[this.sequenceIndex] ? ++this.sequenceIndex === s.Cdata.length && (this.state = n.InCommentLike, this.currentSequence = s.CdataEnd, this.sequenceIndex = 0, this.sectionStart = this.index + 1) : (this.sequenceIndex = 0, this.state = n.InDeclaration, this.stateInDeclaration(m));
      }, p.prototype.fastForwardTo = function(m) {
        for (; ++this.index < this.buffer.length + this.offset; )
          if (this.buffer.charCodeAt(this.index - this.offset) === m)
            return !0;
        return this.index = this.buffer.length + this.offset - 1, !1;
      }, p.prototype.stateInCommentLike = function(m) {
        m === this.currentSequence[this.sequenceIndex] ? ++this.sequenceIndex === this.currentSequence.length && (this.currentSequence === s.CdataEnd ? this.cbs.oncdata(this.sectionStart, this.index, 2) : this.cbs.oncomment(this.sectionStart, this.index, 2), this.sequenceIndex = 0, this.sectionStart = this.index + 1, this.state = n.Text) : this.sequenceIndex === 0 ? this.fastForwardTo(this.currentSequence[0]) && (this.sequenceIndex = 1) : m !== this.currentSequence[this.sequenceIndex - 1] && (this.sequenceIndex = 0);
      }, p.prototype.isTagStartChar = function(m) {
        return this.xmlMode ? !i(m) : o(m);
      }, p.prototype.startSpecial = function(m, b) {
        this.isSpecial = !0, this.currentSequence = m, this.sequenceIndex = b, this.state = n.SpecialStartSequence;
      }, p.prototype.stateBeforeTagName = function(m) {
        if (m === r.ExclamationMark)
          this.state = n.BeforeDeclaration, this.sectionStart = this.index + 1;
        else if (m === r.Questionmark)
          this.state = n.InProcessingInstruction, this.sectionStart = this.index + 1;
        else if (this.isTagStartChar(m)) {
          var b = m | 32;
          this.sectionStart = this.index, !this.xmlMode && b === s.TitleEnd[2] ? this.startSpecial(s.TitleEnd, 3) : this.state = !this.xmlMode && b === s.ScriptEnd[2] ? n.BeforeSpecialS : n.InTagName;
        } else
          m === r.Slash ? this.state = n.BeforeClosingTagName : (this.state = n.Text, this.stateText(m));
      }, p.prototype.stateInTagName = function(m) {
        i(m) && (this.cbs.onopentagname(this.sectionStart, this.index), this.sectionStart = -1, this.state = n.BeforeAttributeName, this.stateBeforeAttributeName(m));
      }, p.prototype.stateBeforeClosingTagName = function(m) {
        a(m) || (m === r.Gt ? this.state = n.Text : (this.state = this.isTagStartChar(m) ? n.InClosingTagName : n.InSpecialComment, this.sectionStart = this.index));
      }, p.prototype.stateInClosingTagName = function(m) {
        (m === r.Gt || a(m)) && (this.cbs.onclosetag(this.sectionStart, this.index), this.sectionStart = -1, this.state = n.AfterClosingTagName, this.stateAfterClosingTagName(m));
      }, p.prototype.stateAfterClosingTagName = function(m) {
        (m === r.Gt || this.fastForwardTo(r.Gt)) && (this.state = n.Text, this.baseState = n.Text, this.sectionStart = this.index + 1);
      }, p.prototype.stateBeforeAttributeName = function(m) {
        m === r.Gt ? (this.cbs.onopentagend(this.index), this.isSpecial ? (this.state = n.InSpecialTag, this.sequenceIndex = 0) : this.state = n.Text, this.baseState = this.state, this.sectionStart = this.index + 1) : m === r.Slash ? this.state = n.InSelfClosingTag : a(m) || (this.state = n.InAttributeName, this.sectionStart = this.index);
      }, p.prototype.stateInSelfClosingTag = function(m) {
        m === r.Gt ? (this.cbs.onselfclosingtag(this.index), this.state = n.Text, this.baseState = n.Text, this.sectionStart = this.index + 1, this.isSpecial = !1) : a(m) || (this.state = n.BeforeAttributeName, this.stateBeforeAttributeName(m));
      }, p.prototype.stateInAttributeName = function(m) {
        (m === r.Eq || i(m)) && (this.cbs.onattribname(this.sectionStart, this.index), this.sectionStart = -1, this.state = n.AfterAttributeName, this.stateAfterAttributeName(m));
      }, p.prototype.stateAfterAttributeName = function(m) {
        m === r.Eq ? this.state = n.BeforeAttributeValue : m === r.Slash || m === r.Gt ? (this.cbs.onattribend(h.NoValue, this.index), this.state = n.BeforeAttributeName, this.stateBeforeAttributeName(m)) : a(m) || (this.cbs.onattribend(h.NoValue, this.index), this.state = n.InAttributeName, this.sectionStart = this.index);
      }, p.prototype.stateBeforeAttributeValue = function(m) {
        m === r.DoubleQuote ? (this.state = n.InAttributeValueDq, this.sectionStart = this.index + 1) : m === r.SingleQuote ? (this.state = n.InAttributeValueSq, this.sectionStart = this.index + 1) : a(m) || (this.sectionStart = this.index, this.state = n.InAttributeValueNq, this.stateInAttributeValueNoQuotes(m));
      }, p.prototype.handleInAttributeValue = function(m, b) {
        m === b || !this.decodeEntities && this.fastForwardTo(b) ? (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = -1, this.cbs.onattribend(b === r.DoubleQuote ? h.Double : h.Single, this.index), this.state = n.BeforeAttributeName) : this.decodeEntities && m === r.Amp && (this.baseState = this.state, this.state = n.BeforeEntity);
      }, p.prototype.stateInAttributeValueDoubleQuotes = function(m) {
        this.handleInAttributeValue(m, r.DoubleQuote);
      }, p.prototype.stateInAttributeValueSingleQuotes = function(m) {
        this.handleInAttributeValue(m, r.SingleQuote);
      }, p.prototype.stateInAttributeValueNoQuotes = function(m) {
        a(m) || m === r.Gt ? (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = -1, this.cbs.onattribend(h.Unquoted, this.index), this.state = n.BeforeAttributeName, this.stateBeforeAttributeName(m)) : this.decodeEntities && m === r.Amp && (this.baseState = this.state, this.state = n.BeforeEntity);
      }, p.prototype.stateBeforeDeclaration = function(m) {
        m === r.OpeningSquareBracket ? (this.state = n.CDATASequence, this.sequenceIndex = 0) : this.state = m === r.Dash ? n.BeforeComment : n.InDeclaration;
      }, p.prototype.stateInDeclaration = function(m) {
        (m === r.Gt || this.fastForwardTo(r.Gt)) && (this.cbs.ondeclaration(this.sectionStart, this.index), this.state = n.Text, this.sectionStart = this.index + 1);
      }, p.prototype.stateInProcessingInstruction = function(m) {
        (m === r.Gt || this.fastForwardTo(r.Gt)) && (this.cbs.onprocessinginstruction(this.sectionStart, this.index), this.state = n.Text, this.sectionStart = this.index + 1);
      }, p.prototype.stateBeforeComment = function(m) {
        m === r.Dash ? (this.state = n.InCommentLike, this.currentSequence = s.CommentEnd, this.sequenceIndex = 2, this.sectionStart = this.index + 1) : this.state = n.InDeclaration;
      }, p.prototype.stateInSpecialComment = function(m) {
        (m === r.Gt || this.fastForwardTo(r.Gt)) && (this.cbs.oncomment(this.sectionStart, this.index, 0), this.state = n.Text, this.sectionStart = this.index + 1);
      }, p.prototype.stateBeforeSpecialS = function(m) {
        var b = m | 32;
        b === s.ScriptEnd[3] ? this.startSpecial(s.ScriptEnd, 4) : b === s.StyleEnd[3] ? this.startSpecial(s.StyleEnd, 4) : (this.state = n.InTagName, this.stateInTagName(m));
      }, p.prototype.stateBeforeEntity = function(m) {
        this.entityExcess = 1, this.entityResult = 0, m === r.Number ? this.state = n.BeforeNumericEntity : m === r.Amp || (this.trieIndex = 0, this.trieCurrent = this.entityTrie[0], this.state = n.InNamedEntity, this.stateInNamedEntity(m));
      }, p.prototype.stateInNamedEntity = function(m) {
        if (this.entityExcess += 1, this.trieIndex = (0, t.determineBranch)(this.entityTrie, this.trieCurrent, this.trieIndex + 1, m), this.trieIndex < 0) {
          this.emitNamedEntity(), this.index--;
          return;
        }
        this.trieCurrent = this.entityTrie[this.trieIndex];
        var b = this.trieCurrent & t.BinTrieFlags.VALUE_LENGTH;
        if (b) {
          var R = (b >> 14) - 1;
          if (!this.allowLegacyEntity() && m !== r.Semi)
            this.trieIndex += R;
          else {
            var C = this.index - this.entityExcess + 1;
            C > this.sectionStart && this.emitPartial(this.sectionStart, C), this.entityResult = this.trieIndex, this.trieIndex += R, this.entityExcess = 0, this.sectionStart = this.index + 1, R === 0 && this.emitNamedEntity();
          }
        }
      }, p.prototype.emitNamedEntity = function() {
        if (this.state = this.baseState, this.entityResult !== 0) {
          var m = (this.entityTrie[this.entityResult] & t.BinTrieFlags.VALUE_LENGTH) >> 14;
          switch (m) {
            case 1: {
              this.emitCodePoint(this.entityTrie[this.entityResult] & ~t.BinTrieFlags.VALUE_LENGTH);
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
      }, p.prototype.stateBeforeNumericEntity = function(m) {
        (m | 32) === r.LowerX ? (this.entityExcess++, this.state = n.InHexEntity) : (this.state = n.InNumericEntity, this.stateInNumericEntity(m));
      }, p.prototype.emitNumericEntity = function(m) {
        var b = this.index - this.entityExcess - 1, R = b + 2 + +(this.state === n.InHexEntity);
        R !== this.index && (b > this.sectionStart && this.emitPartial(this.sectionStart, b), this.sectionStart = this.index + Number(m), this.emitCodePoint((0, t.replaceCodePoint)(this.entityResult))), this.state = this.baseState;
      }, p.prototype.stateInNumericEntity = function(m) {
        m === r.Semi ? this.emitNumericEntity(!0) : u(m) ? (this.entityResult = this.entityResult * 10 + (m - r.Zero), this.entityExcess++) : (this.allowLegacyEntity() ? this.emitNumericEntity(!1) : this.state = this.baseState, this.index--);
      }, p.prototype.stateInHexEntity = function(m) {
        m === r.Semi ? this.emitNumericEntity(!0) : u(m) ? (this.entityResult = this.entityResult * 16 + (m - r.Zero), this.entityExcess++) : c(m) ? (this.entityResult = this.entityResult * 16 + ((m | 32) - r.LowerA + 10), this.entityExcess++) : (this.allowLegacyEntity() ? this.emitNumericEntity(!1) : this.state = this.baseState, this.index--);
      }, p.prototype.allowLegacyEntity = function() {
        return !this.xmlMode && (this.baseState === n.Text || this.baseState === n.InSpecialTag);
      }, p.prototype.cleanup = function() {
        this.running && this.sectionStart !== this.index && (this.state === n.Text || this.state === n.InSpecialTag && this.sequenceIndex === 0 ? (this.cbs.ontext(this.sectionStart, this.index), this.sectionStart = this.index) : (this.state === n.InAttributeValueDq || this.state === n.InAttributeValueSq || this.state === n.InAttributeValueNq) && (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = this.index));
      }, p.prototype.shouldContinue = function() {
        return this.index < this.buffer.length + this.offset && this.running;
      }, p.prototype.parse = function() {
        for (; this.shouldContinue(); ) {
          var m = this.buffer.charCodeAt(this.index - this.offset);
          switch (this.state) {
            case n.Text: {
              this.stateText(m);
              break;
            }
            case n.SpecialStartSequence: {
              this.stateSpecialStartSequence(m);
              break;
            }
            case n.InSpecialTag: {
              this.stateInSpecialTag(m);
              break;
            }
            case n.CDATASequence: {
              this.stateCDATASequence(m);
              break;
            }
            case n.InAttributeValueDq: {
              this.stateInAttributeValueDoubleQuotes(m);
              break;
            }
            case n.InAttributeName: {
              this.stateInAttributeName(m);
              break;
            }
            case n.InCommentLike: {
              this.stateInCommentLike(m);
              break;
            }
            case n.InSpecialComment: {
              this.stateInSpecialComment(m);
              break;
            }
            case n.BeforeAttributeName: {
              this.stateBeforeAttributeName(m);
              break;
            }
            case n.InTagName: {
              this.stateInTagName(m);
              break;
            }
            case n.InClosingTagName: {
              this.stateInClosingTagName(m);
              break;
            }
            case n.BeforeTagName: {
              this.stateBeforeTagName(m);
              break;
            }
            case n.AfterAttributeName: {
              this.stateAfterAttributeName(m);
              break;
            }
            case n.InAttributeValueSq: {
              this.stateInAttributeValueSingleQuotes(m);
              break;
            }
            case n.BeforeAttributeValue: {
              this.stateBeforeAttributeValue(m);
              break;
            }
            case n.BeforeClosingTagName: {
              this.stateBeforeClosingTagName(m);
              break;
            }
            case n.AfterClosingTagName: {
              this.stateAfterClosingTagName(m);
              break;
            }
            case n.BeforeSpecialS: {
              this.stateBeforeSpecialS(m);
              break;
            }
            case n.InAttributeValueNq: {
              this.stateInAttributeValueNoQuotes(m);
              break;
            }
            case n.InSelfClosingTag: {
              this.stateInSelfClosingTag(m);
              break;
            }
            case n.InDeclaration: {
              this.stateInDeclaration(m);
              break;
            }
            case n.BeforeDeclaration: {
              this.stateBeforeDeclaration(m);
              break;
            }
            case n.BeforeComment: {
              this.stateBeforeComment(m);
              break;
            }
            case n.InProcessingInstruction: {
              this.stateInProcessingInstruction(m);
              break;
            }
            case n.InNamedEntity: {
              this.stateInNamedEntity(m);
              break;
            }
            case n.BeforeEntity: {
              this.stateBeforeEntity(m);
              break;
            }
            case n.InHexEntity: {
              this.stateInHexEntity(m);
              break;
            }
            case n.InNumericEntity: {
              this.stateInNumericEntity(m);
              break;
            }
            default:
              this.stateBeforeNumericEntity(m);
          }
          this.index++;
        }
        this.cleanup();
      }, p.prototype.finish = function() {
        this.state === n.InNamedEntity && this.emitNamedEntity(), this.sectionStart < this.index && this.handleTrailingData(), this.cbs.onend();
      }, p.prototype.handleTrailingData = function() {
        var m = this.buffer.length + this.offset;
        this.state === n.InCommentLike ? this.currentSequence === s.CdataEnd ? this.cbs.oncdata(this.sectionStart, m, 0) : this.cbs.oncomment(this.sectionStart, m, 0) : this.state === n.InNumericEntity && this.allowLegacyEntity() ? this.emitNumericEntity(!1) : this.state === n.InHexEntity && this.allowLegacyEntity() ? this.emitNumericEntity(!1) : this.state === n.InTagName || this.state === n.BeforeAttributeName || this.state === n.BeforeAttributeValue || this.state === n.AfterAttributeName || this.state === n.InAttributeName || this.state === n.InAttributeValueSq || this.state === n.InAttributeValueDq || this.state === n.InAttributeValueNq || this.state === n.InClosingTagName || this.cbs.ontext(this.sectionStart, m);
      }, p.prototype.emitPartial = function(m, b) {
        this.baseState !== n.Text && this.baseState !== n.InSpecialTag ? this.cbs.onattribdata(m, b) : this.cbs.ontext(m, b);
      }, p.prototype.emitCodePoint = function(m) {
        this.baseState !== n.Text && this.baseState !== n.InSpecialTag ? this.cbs.onattribentity(m) : this.cbs.ontextentity(m);
      }, p;
    }()
  );
  e.default = g;
})(uu);
var km = w && w.__createBinding || (Object.create ? function(e, t, r, n) {
  n === void 0 && (n = r);
  var a = Object.getOwnPropertyDescriptor(t, r);
  (!a || ("get" in a ? !t.__esModule : a.writable || a.configurable)) && (a = { enumerable: !0, get: function() {
    return t[r];
  } }), Object.defineProperty(e, n, a);
} : function(e, t, r, n) {
  n === void 0 && (n = r), e[n] = t[r];
}), Fm = w && w.__setModuleDefault || (Object.create ? function(e, t) {
  Object.defineProperty(e, "default", { enumerable: !0, value: t });
} : function(e, t) {
  e.default = t;
}), Um = w && w.__importStar || function(e) {
  if (e && e.__esModule)
    return e;
  var t = {};
  if (e != null)
    for (var r in e)
      r !== "default" && Object.prototype.hasOwnProperty.call(e, r) && km(t, e, r);
  return Fm(t, e), t;
};
Object.defineProperty(un, "__esModule", { value: !0 });
un.Parser = void 0;
var On = Um(uu), zu = Ar, ur = /* @__PURE__ */ new Set([
  "input",
  "option",
  "optgroup",
  "select",
  "button",
  "datalist",
  "textarea"
]), me = /* @__PURE__ */ new Set(["p"]), Ku = /* @__PURE__ */ new Set(["thead", "tbody"]), Zu = /* @__PURE__ */ new Set(["dd", "dt"]), Ju = /* @__PURE__ */ new Set(["rt", "rp"]), Hm = /* @__PURE__ */ new Map([
  ["tr", /* @__PURE__ */ new Set(["tr", "th", "td"])],
  ["th", /* @__PURE__ */ new Set(["th"])],
  ["td", /* @__PURE__ */ new Set(["thead", "th", "td"])],
  ["body", /* @__PURE__ */ new Set(["head", "link", "script"])],
  ["li", /* @__PURE__ */ new Set(["li"])],
  ["p", me],
  ["h1", me],
  ["h2", me],
  ["h3", me],
  ["h4", me],
  ["h5", me],
  ["h6", me],
  ["select", ur],
  ["input", ur],
  ["output", ur],
  ["button", ur],
  ["datalist", ur],
  ["textarea", ur],
  ["option", /* @__PURE__ */ new Set(["option"])],
  ["optgroup", /* @__PURE__ */ new Set(["optgroup", "option"])],
  ["dd", Zu],
  ["dt", Zu],
  ["address", me],
  ["article", me],
  ["aside", me],
  ["blockquote", me],
  ["details", me],
  ["div", me],
  ["dl", me],
  ["fieldset", me],
  ["figcaption", me],
  ["figure", me],
  ["footer", me],
  ["form", me],
  ["header", me],
  ["hr", me],
  ["main", me],
  ["nav", me],
  ["ol", me],
  ["pre", me],
  ["section", me],
  ["table", me],
  ["ul", me],
  ["rt", Ju],
  ["rp", Ju],
  ["tbody", Ku],
  ["tfoot", Ku]
]), Gm = /* @__PURE__ */ new Set([
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
]), es = /* @__PURE__ */ new Set(["math", "svg"]), ts = /* @__PURE__ */ new Set([
  "mi",
  "mo",
  "mn",
  "ms",
  "mtext",
  "annotation-xml",
  "foreignobject",
  "desc",
  "title"
]), jm = /\s|\//, qm = (
  /** @class */
  function() {
    function e(t, r) {
      r === void 0 && (r = {});
      var n, a, i, u, o;
      this.options = r, this.startIndex = 0, this.endIndex = 0, this.openTagStart = 0, this.tagname = "", this.attribname = "", this.attribvalue = "", this.attribs = null, this.stack = [], this.foreignContext = [], this.buffers = [], this.bufferOffset = 0, this.writeIndex = 0, this.ended = !1, this.cbs = t ?? {}, this.lowerCaseTagNames = (n = r.lowerCaseTags) !== null && n !== void 0 ? n : !r.xmlMode, this.lowerCaseAttributeNames = (a = r.lowerCaseAttributeNames) !== null && a !== void 0 ? a : !r.xmlMode, this.tokenizer = new ((i = r.Tokenizer) !== null && i !== void 0 ? i : On.default)(this.options, this), (o = (u = this.cbs).onparserinit) === null || o === void 0 || o.call(u, this);
    }
    return e.prototype.ontext = function(t, r) {
      var n, a, i = this.getSlice(t, r);
      this.endIndex = r - 1, (a = (n = this.cbs).ontext) === null || a === void 0 || a.call(n, i), this.startIndex = r;
    }, e.prototype.ontextentity = function(t) {
      var r, n, a = this.tokenizer.getSectionStart();
      this.endIndex = a - 1, (n = (r = this.cbs).ontext) === null || n === void 0 || n.call(r, (0, zu.fromCodePoint)(t)), this.startIndex = a;
    }, e.prototype.isVoidElement = function(t) {
      return !this.options.xmlMode && Gm.has(t);
    }, e.prototype.onopentagname = function(t, r) {
      this.endIndex = r;
      var n = this.getSlice(t, r);
      this.lowerCaseTagNames && (n = n.toLowerCase()), this.emitOpenTag(n);
    }, e.prototype.emitOpenTag = function(t) {
      var r, n, a, i;
      this.openTagStart = this.startIndex, this.tagname = t;
      var u = !this.options.xmlMode && Hm.get(t);
      if (u)
        for (; this.stack.length > 0 && u.has(this.stack[this.stack.length - 1]); ) {
          var o = this.stack.pop();
          (n = (r = this.cbs).onclosetag) === null || n === void 0 || n.call(r, o, !0);
        }
      this.isVoidElement(t) || (this.stack.push(t), es.has(t) ? this.foreignContext.push(!0) : ts.has(t) && this.foreignContext.push(!1)), (i = (a = this.cbs).onopentagname) === null || i === void 0 || i.call(a, t), this.cbs.onopentag && (this.attribs = {});
    }, e.prototype.endOpenTag = function(t) {
      var r, n;
      this.startIndex = this.openTagStart, this.attribs && ((n = (r = this.cbs).onopentag) === null || n === void 0 || n.call(r, this.tagname, this.attribs, t), this.attribs = null), this.cbs.onclosetag && this.isVoidElement(this.tagname) && this.cbs.onclosetag(this.tagname, !0), this.tagname = "";
    }, e.prototype.onopentagend = function(t) {
      this.endIndex = t, this.endOpenTag(!1), this.startIndex = t + 1;
    }, e.prototype.onclosetag = function(t, r) {
      var n, a, i, u, o, c;
      this.endIndex = r;
      var h = this.getSlice(t, r);
      if (this.lowerCaseTagNames && (h = h.toLowerCase()), (es.has(h) || ts.has(h)) && this.foreignContext.pop(), this.isVoidElement(h))
        !this.options.xmlMode && h === "br" && ((a = (n = this.cbs).onopentagname) === null || a === void 0 || a.call(n, "br"), (u = (i = this.cbs).onopentag) === null || u === void 0 || u.call(i, "br", {}, !0), (c = (o = this.cbs).onclosetag) === null || c === void 0 || c.call(o, "br", !1));
      else {
        var s = this.stack.lastIndexOf(h);
        if (s !== -1)
          if (this.cbs.onclosetag)
            for (var g = this.stack.length - s; g--; )
              this.cbs.onclosetag(this.stack.pop(), g !== 0);
          else
            this.stack.length = s;
        else
          !this.options.xmlMode && h === "p" && (this.emitOpenTag("p"), this.closeCurrentTag(!0));
      }
      this.startIndex = r + 1;
    }, e.prototype.onselfclosingtag = function(t) {
      this.endIndex = t, this.options.xmlMode || this.options.recognizeSelfClosing || this.foreignContext[this.foreignContext.length - 1] ? (this.closeCurrentTag(!1), this.startIndex = t + 1) : this.onopentagend(t);
    }, e.prototype.closeCurrentTag = function(t) {
      var r, n, a = this.tagname;
      this.endOpenTag(t), this.stack[this.stack.length - 1] === a && ((n = (r = this.cbs).onclosetag) === null || n === void 0 || n.call(r, a, !t), this.stack.pop());
    }, e.prototype.onattribname = function(t, r) {
      this.startIndex = t;
      var n = this.getSlice(t, r);
      this.attribname = this.lowerCaseAttributeNames ? n.toLowerCase() : n;
    }, e.prototype.onattribdata = function(t, r) {
      this.attribvalue += this.getSlice(t, r);
    }, e.prototype.onattribentity = function(t) {
      this.attribvalue += (0, zu.fromCodePoint)(t);
    }, e.prototype.onattribend = function(t, r) {
      var n, a;
      this.endIndex = r, (a = (n = this.cbs).onattribute) === null || a === void 0 || a.call(n, this.attribname, this.attribvalue, t === On.QuoteType.Double ? '"' : t === On.QuoteType.Single ? "'" : t === On.QuoteType.NoValue ? void 0 : null), this.attribs && !Object.prototype.hasOwnProperty.call(this.attribs, this.attribname) && (this.attribs[this.attribname] = this.attribvalue), this.attribvalue = "";
    }, e.prototype.getInstructionName = function(t) {
      var r = t.search(jm), n = r < 0 ? t : t.substr(0, r);
      return this.lowerCaseTagNames && (n = n.toLowerCase()), n;
    }, e.prototype.ondeclaration = function(t, r) {
      this.endIndex = r;
      var n = this.getSlice(t, r);
      if (this.cbs.onprocessinginstruction) {
        var a = this.getInstructionName(n);
        this.cbs.onprocessinginstruction("!".concat(a), "!".concat(n));
      }
      this.startIndex = r + 1;
    }, e.prototype.onprocessinginstruction = function(t, r) {
      this.endIndex = r;
      var n = this.getSlice(t, r);
      if (this.cbs.onprocessinginstruction) {
        var a = this.getInstructionName(n);
        this.cbs.onprocessinginstruction("?".concat(a), "?".concat(n));
      }
      this.startIndex = r + 1;
    }, e.prototype.oncomment = function(t, r, n) {
      var a, i, u, o;
      this.endIndex = r, (i = (a = this.cbs).oncomment) === null || i === void 0 || i.call(a, this.getSlice(t, r - n)), (o = (u = this.cbs).oncommentend) === null || o === void 0 || o.call(u), this.startIndex = r + 1;
    }, e.prototype.oncdata = function(t, r, n) {
      var a, i, u, o, c, h, s, g, p, m;
      this.endIndex = r;
      var b = this.getSlice(t, r - n);
      this.options.xmlMode || this.options.recognizeCDATA ? ((i = (a = this.cbs).oncdatastart) === null || i === void 0 || i.call(a), (o = (u = this.cbs).ontext) === null || o === void 0 || o.call(u, b), (h = (c = this.cbs).oncdataend) === null || h === void 0 || h.call(c)) : ((g = (s = this.cbs).oncomment) === null || g === void 0 || g.call(s, "[CDATA[".concat(b, "]]")), (m = (p = this.cbs).oncommentend) === null || m === void 0 || m.call(p)), this.startIndex = r + 1;
    }, e.prototype.onend = function() {
      var t, r;
      if (this.cbs.onclosetag) {
        this.endIndex = this.startIndex;
        for (var n = this.stack.length; n > 0; this.cbs.onclosetag(this.stack[--n], !0))
          ;
      }
      (r = (t = this.cbs).onend) === null || r === void 0 || r.call(t);
    }, e.prototype.reset = function() {
      var t, r, n, a;
      (r = (t = this.cbs).onreset) === null || r === void 0 || r.call(t), this.tokenizer.reset(), this.tagname = "", this.attribname = "", this.attribs = null, this.stack.length = 0, this.startIndex = 0, this.endIndex = 0, (a = (n = this.cbs).onparserinit) === null || a === void 0 || a.call(n, this), this.buffers.length = 0, this.bufferOffset = 0, this.writeIndex = 0, this.ended = !1;
    }, e.prototype.parseComplete = function(t) {
      this.reset(), this.end(t);
    }, e.prototype.getSlice = function(t, r) {
      for (; t - this.bufferOffset >= this.buffers[0].length; )
        this.shiftBuffer();
      for (var n = this.buffers[0].slice(t - this.bufferOffset, r - this.bufferOffset); r - this.bufferOffset > this.buffers[0].length; )
        this.shiftBuffer(), n += this.buffers[0].slice(0, r - this.bufferOffset);
      return n;
    }, e.prototype.shiftBuffer = function() {
      this.bufferOffset += this.buffers[0].length, this.writeIndex--, this.buffers.shift();
    }, e.prototype.write = function(t) {
      var r, n;
      if (this.ended) {
        (n = (r = this.cbs).onerror) === null || n === void 0 || n.call(r, new Error(".write() after done!"));
        return;
      }
      this.buffers.push(t), this.tokenizer.running && (this.tokenizer.write(t), this.writeIndex++);
    }, e.prototype.end = function(t) {
      var r, n;
      if (this.ended) {
        (n = (r = this.cbs).onerror) === null || n === void 0 || n.call(r, new Error(".end() after done!"));
        return;
      }
      t && this.write(t), this.ended = !0, this.tokenizer.end();
    }, e.prototype.pause = function() {
      this.tokenizer.pause();
    }, e.prototype.resume = function() {
      for (this.tokenizer.resume(); this.tokenizer.running && this.writeIndex < this.buffers.length; )
        this.tokenizer.write(this.buffers[this.writeIndex++]);
      this.ended && this.tokenizer.end();
    }, e.prototype.parseChunk = function(t) {
      this.write(t);
    }, e.prototype.done = function(t) {
      this.end(t);
    }, e;
  }()
);
un.Parser = qm;
(function(e) {
  var t = w && w.__createBinding || (Object.create ? function(D, S, B, P) {
    P === void 0 && (P = B);
    var L = Object.getOwnPropertyDescriptor(S, B);
    (!L || ("get" in L ? !S.__esModule : L.writable || L.configurable)) && (L = { enumerable: !0, get: function() {
      return S[B];
    } }), Object.defineProperty(D, P, L);
  } : function(D, S, B, P) {
    P === void 0 && (P = B), D[P] = S[B];
  }), r = w && w.__setModuleDefault || (Object.create ? function(D, S) {
    Object.defineProperty(D, "default", { enumerable: !0, value: S });
  } : function(D, S) {
    D.default = S;
  }), n = w && w.__importStar || function(D) {
    if (D && D.__esModule)
      return D;
    var S = {};
    if (D != null)
      for (var B in D)
        B !== "default" && Object.prototype.hasOwnProperty.call(D, B) && t(S, D, B);
    return r(S, D), S;
  }, a = w && w.__importDefault || function(D) {
    return D && D.__esModule ? D : { default: D };
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.DomUtils = e.parseFeed = e.getFeed = e.ElementType = e.Tokenizer = e.createDomStream = e.parseDOM = e.parseDocument = e.DefaultHandler = e.DomHandler = e.Parser = void 0;
  var i = un, u = un;
  Object.defineProperty(e, "Parser", { enumerable: !0, get: function() {
    return u.Parser;
  } });
  var o = He, c = He;
  Object.defineProperty(e, "DomHandler", { enumerable: !0, get: function() {
    return c.DomHandler;
  } }), Object.defineProperty(e, "DefaultHandler", { enumerable: !0, get: function() {
    return c.DomHandler;
  } });
  function h(D, S) {
    var B = new o.DomHandler(void 0, S);
    return new i.Parser(B, S).end(D), B.root;
  }
  e.parseDocument = h;
  function s(D, S) {
    return h(D, S).children;
  }
  e.parseDOM = s;
  function g(D, S, B) {
    var P = new o.DomHandler(D, S, B);
    return new i.Parser(P, S);
  }
  e.createDomStream = g;
  var p = uu;
  Object.defineProperty(e, "Tokenizer", { enumerable: !0, get: function() {
    return a(p).default;
  } }), e.ElementType = n(Lr);
  var m = ot, b = ot;
  Object.defineProperty(e, "getFeed", { enumerable: !0, get: function() {
    return b.getFeed;
  } });
  var R = { xmlMode: !0 };
  function C(D, S) {
    return S === void 0 && (S = R), (0, m.getFeed)(s(D, S));
  }
  e.parseFeed = C, e.DomUtils = n(ot);
})(Sc);
(function(e) {
  var t = w && w.__createBinding || (Object.create ? function(b, R, C, D) {
    D === void 0 && (D = C);
    var S = Object.getOwnPropertyDescriptor(R, C);
    (!S || ("get" in S ? !R.__esModule : S.writable || S.configurable)) && (S = { enumerable: !0, get: function() {
      return R[C];
    } }), Object.defineProperty(b, D, S);
  } : function(b, R, C, D) {
    D === void 0 && (D = C), b[D] = R[C];
  }), r = w && w.__setModuleDefault || (Object.create ? function(b, R) {
    Object.defineProperty(b, "default", { enumerable: !0, value: R });
  } : function(b, R) {
    b.default = R;
  }), n = w && w.__exportStar || function(b, R) {
    for (var C in b)
      C !== "default" && !Object.prototype.hasOwnProperty.call(R, C) && t(R, b, C);
  }, a = w && w.__importStar || function(b) {
    if (b && b.__esModule)
      return b;
    var R = {};
    if (b != null)
      for (var C in b)
        C !== "default" && Object.prototype.hasOwnProperty.call(b, C) && t(R, b, C);
    return r(R, b), R;
  }, i = w && w.__importDefault || function(b) {
    return b && b.__esModule ? b : { default: b };
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.root = e.parseHTML = e.merge = e.contains = e.text = e.xml = e.html = e.load = void 0, n($s, e);
  var u = Zn, o = Xt, c = Sr, h = i(xr), s = Sc, g = (0, o.getParse)(function(b, R, C, D) {
    return R.xmlMode || R._useHtmlParser2 ? (0, s.parseDocument)(b, R) : (0, c.parseWithParse5)(b, R, C, D);
  });
  e.load = (0, u.getLoad)(g, function(b, R) {
    return R.xmlMode || R._useHtmlParser2 ? (0, h.default)(b, R) : (0, c.renderWithParse5)(b);
  }), e.default = (0, e.load)([]);
  var p = Oe;
  Object.defineProperty(e, "html", { enumerable: !0, get: function() {
    return p.html;
  } }), Object.defineProperty(e, "xml", { enumerable: !0, get: function() {
    return p.xml;
  } }), Object.defineProperty(e, "text", { enumerable: !0, get: function() {
    return p.text;
  } });
  var m = a(Oe);
  e.contains = m.contains, e.merge = m.merge, e.parseHTML = m.parseHTML, e.root = m.root;
})(Vs);
var Ha = {}, Oc = { exports: {} };
function Ym(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var vc = { exports: {} }, ve = vc.exports = {}, Et, Tt;
function bi() {
  throw new Error("setTimeout has not been defined");
}
function Ai() {
  throw new Error("clearTimeout has not been defined");
}
(function() {
  try {
    typeof setTimeout == "function" ? Et = setTimeout : Et = bi;
  } catch {
    Et = bi;
  }
  try {
    typeof clearTimeout == "function" ? Tt = clearTimeout : Tt = Ai;
  } catch {
    Tt = Ai;
  }
})();
function Rc(e) {
  if (Et === setTimeout)
    return setTimeout(e, 0);
  if ((Et === bi || !Et) && setTimeout)
    return Et = setTimeout, setTimeout(e, 0);
  try {
    return Et(e, 0);
  } catch {
    try {
      return Et.call(null, e, 0);
    } catch {
      return Et.call(this, e, 0);
    }
  }
}
function Vm(e) {
  if (Tt === clearTimeout)
    return clearTimeout(e);
  if ((Tt === Ai || !Tt) && clearTimeout)
    return Tt = clearTimeout, clearTimeout(e);
  try {
    return Tt(e);
  } catch {
    try {
      return Tt.call(null, e);
    } catch {
      return Tt.call(this, e);
    }
  }
}
var vt = [], Er = !1, $t, Bn = -1;
function $m() {
  !Er || !$t || (Er = !1, $t.length ? vt = $t.concat(vt) : Bn = -1, vt.length && Pc());
}
function Pc() {
  if (!Er) {
    var e = Rc($m);
    Er = !0;
    for (var t = vt.length; t; ) {
      for ($t = vt, vt = []; ++Bn < t; )
        $t && $t[Bn].run();
      Bn = -1, t = vt.length;
    }
    $t = null, Er = !1, Vm(e);
  }
}
ve.nextTick = function(e) {
  var t = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var r = 1; r < arguments.length; r++)
      t[r - 1] = arguments[r];
  vt.push(new Lc(e, t)), vt.length === 1 && !Er && Rc(Pc);
};
function Lc(e, t) {
  this.fun = e, this.array = t;
}
Lc.prototype.run = function() {
  this.fun.apply(null, this.array);
};
ve.title = "browser";
ve.browser = !0;
ve.env = {};
ve.argv = [];
ve.version = "";
ve.versions = {};
function Pt() {
}
ve.on = Pt;
ve.addListener = Pt;
ve.once = Pt;
ve.off = Pt;
ve.removeListener = Pt;
ve.removeAllListeners = Pt;
ve.emit = Pt;
ve.prependListener = Pt;
ve.prependOnceListener = Pt;
ve.listeners = function(e) {
  return [];
};
ve.binding = function(e) {
  throw new Error("process.binding is not supported");
};
ve.cwd = function() {
  return "/";
};
ve.chdir = function(e) {
  throw new Error("process.chdir is not supported");
};
ve.umask = function() {
  return 0;
};
var Wm = vc.exports;
const Qm = /* @__PURE__ */ Ym(Wm);
var xc = { exports: {} };
(function(e, t) {
  e.exports = r;
  function r(a) {
    return n.bind(null, a);
  }
  function n(a) {
    var i = [].slice.call(arguments, 1);
    i.unshift("[" + a + "]"), Qm.stderr.write(i.join(" ") + `
`);
  }
})(xc);
var su = xc.exports;
(function(e, t) {
  su("lex"), e.exports = r;
  function r(n) {
    var a = "", i, u = 0, o = -1, c = 0, h = 1, s = "before-selector", g = [s], p = {}, m = [], b = [
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
    function R() {
      return ne(), n[o];
    }
    function C(V) {
      return V ? g[g.length - 1 - V] : s;
    }
    function D(V) {
      var Q = o + 1;
      return V === n.slice(Q, Q + V.length);
    }
    function S(V) {
      var Q = n.slice(o).indexOf(V);
      return Q > 0 ? Q : !1;
    }
    function B(V) {
      return V === P(1);
    }
    function P(V) {
      return n[o + (V || 1)];
    }
    function L() {
      var V = g.pop();
      return s = g[g.length - 1], V;
    }
    function H(V) {
      return s = V, g.push(s), g.length;
    }
    function $(V) {
      var Q = s;
      return g[g.length - 1] = s = V, Q;
    }
    function ne(V) {
      if ((V || 1) == 1)
        n[o] == `
` ? (h++, u = 1) : u++, o++;
      else {
        var Q = n.slice(o, o + V).split(`
`);
        Q.length > 1 && (h += Q.length - 1, u = 1), u += Q[Q.length - 1].length, o = o + V;
      }
    }
    function oe() {
      p.end = {
        line: h,
        col: u
      }, m.push(p), a = "", p = {};
    }
    function q(V) {
      p = {
        type: V,
        start: {
          line: h,
          col: u
        }
      };
    }
    for (; i = R(); )
      switch (i) {
        case " ":
          switch (C()) {
            case "selector":
            case "value":
            case "value-paren":
            case "at-group":
            case "at-value":
            case "comment":
            case "double-string":
            case "single-string":
              a += i;
              break;
          }
          break;
        case `
`:
        case "	":
        case "\r":
        case "\f":
          switch (C()) {
            case "value":
            case "value-paren":
            case "at-group":
            case "comment":
            case "single-string":
            case "double-string":
            case "selector":
              a += i;
              break;
            case "at-value":
              i === `
` && (p.value = a.trim(), oe(), L());
              break;
          }
          break;
        case ":":
          switch (C()) {
            case "name":
              p.name = a.trim(), a = "", $("before-value");
              break;
            case "before-selector":
              a += i, q("selector"), H("selector");
              break;
            case "before-value":
              $("value"), a += i;
              break;
            default:
              a += i;
              break;
          }
          break;
        case ";":
          switch (C()) {
            case "name":
            case "before-value":
            case "value":
              a.trim().length > 0 && (p.value = a.trim(), oe()), $("before-name");
              break;
            case "value-paren":
              a += i;
              break;
            case "at-value":
              p.value = a.trim(), oe(), L();
              break;
            case "before-name":
              break;
            default:
              a += i;
              break;
          }
          break;
        case "{":
          switch (C()) {
            case "selector":
              if (P(-1) === "\\") {
                a += i;
                break;
              }
              p.text = a.trim(), oe(), $("before-name"), c = c + 1;
              break;
            case "at-group":
              switch (p.name = a.trim(), p.type) {
                case "font-face":
                case "viewport":
                case "page":
                  H("before-name");
                  break;
                default:
                  H("before-selector");
              }
              oe(), c = c + 1;
              break;
            case "name":
            case "at-rule":
              p.name = a.trim(), oe(), H("before-name"), c = c + 1;
              break;
            case "comment":
            case "double-string":
            case "single-string":
              a += i;
              break;
            case "before-value":
              $("value"), a += i;
              break;
          }
          break;
        case "}":
          switch (C()) {
            case "before-name":
            case "name":
            case "before-value":
            case "value":
              a && (p.value = a.trim()), p.name && p.value && oe(), q("end"), oe(), L(), C() === "at-group" && (q("at-group-end"), oe(), L()), c > 0 && (c = c - 1);
              break;
            case "at-group":
            case "before-selector":
            case "selector":
              if (P(-1) === "\\") {
                a += i;
                break;
              }
              c > 0 && C(1) === "at-group" && (q("at-group-end"), oe()), c > 1 && L(), c > 0 && (c = c - 1);
              break;
            case "double-string":
            case "single-string":
            case "comment":
              a += i;
              break;
          }
          break;
        case '"':
        case "'":
          switch (C()) {
            case "double-string":
              i === '"' && P(-1) !== "\\" && L();
              break;
            case "single-string":
              i === "'" && P(-1) !== "\\" && L();
              break;
            case "before-at-value":
              $("at-value"), H(i === '"' ? "double-string" : "single-string");
              break;
            case "before-value":
              $("value"), H(i === '"' ? "double-string" : "single-string");
              break;
            case "comment":
              break;
            default:
              P(-1) !== "\\" && H(i === '"' ? "double-string" : "single-string");
          }
          a += i;
          break;
        case "/":
          switch (C()) {
            case "comment":
            case "double-string":
            case "single-string":
              a += i;
              break;
            case "before-value":
            case "selector":
            case "name":
            case "value":
              if (B("*")) {
                var I = S("*/");
                I && ne(I + 1);
              } else
                C() == "before-value" && $("value"), a += i;
              break;
            default:
              B("*") ? (q("comment"), H("comment"), ne()) : a += i;
              break;
          }
          break;
        case "*":
          switch (C()) {
            case "comment":
              B("/") ? (p.text = a, ne(), oe(), L()) : a += i;
              break;
            case "before-selector":
              a += i, q("selector"), H("selector");
              break;
            case "before-value":
              $("value"), a += i;
              break;
            default:
              a += i;
          }
          break;
        case "@":
          switch (C()) {
            case "comment":
            case "double-string":
            case "single-string":
              a += i;
              break;
            case "before-value":
              $("value"), a += i;
              break;
            default:
              for (var O = !1, x, M, G = 0, W = b.length; !O && G < W; ++G)
                M = b[G], x = M.name || M, D(x) && (O = !0, q(x), H(M.state || "at-group"), ne(x.length), M.prefix && (p.prefix = M.prefix), M.type && (p.type = M.type));
              O || (a += i);
              break;
          }
          break;
        case "(":
          switch (C()) {
            case "value":
              H("value-paren");
              break;
            case "before-value":
              $("value");
              break;
          }
          a += i;
          break;
        case ")":
          switch (C()) {
            case "value-paren":
              L();
              break;
            case "before-value":
              $("value");
              break;
          }
          a += i;
          break;
        default:
          switch (C()) {
            case "before-selector":
              q("selector"), H("selector");
              break;
            case "before-name":
              q("property"), $("name");
              break;
            case "before-value":
              $("value");
              break;
            case "before-at-value":
              $("at-value");
              break;
          }
          a += i;
          break;
      }
    return m;
  }
})(Oc);
var wc = Oc.exports, Mc = { exports: {} };
(function(e, t) {
  su("parse");
  var r = wc;
  e.exports = o;
  var n, a, i, u;
  function o(L, H) {
    H || (H = {}), n = !!H.comments, i = !!H.position, a = 0, u = Array.isArray(L) ? L.slice() : r(L);
    for (var $, ne = [], oe; oe = h(); )
      $ = D(oe), $ && ne.push($);
    return {
      type: "stylesheet",
      stylesheet: {
        rules: ne
      }
    };
  }
  function c(L, H) {
    H || (H = {});
    for (var $, ne = ["type", "name", "value"], oe = {}, q = 0; q < ne.length; ++q)
      $ = ne[q], L[$] && (oe[$] = H[$] || L[$]);
    for (ne = Object.keys(H), q = 0; q < ne.length; ++q)
      $ = ne[q], oe[$] || (oe[$] = H[$]);
    return i && (oe.position = {
      start: L.start,
      end: L.end
    }), oe;
  }
  function h() {
    var L = u.shift();
    return L;
  }
  function s(L) {
    a = a + 1;
    var H = {};
    switch (L.type) {
      case "font-face":
      case "viewport":
        H.declarations = B();
        break;
      case "page":
        H.prefix = L.prefix, H.declarations = B();
        break;
      default:
        H.prefix = L.prefix, H.rules = P();
    }
    return c(L, H);
  }
  function g(L) {
    return c(L);
  }
  function p(L) {
    return c(L);
  }
  function m(L) {
    return c(L, { text: L.text });
  }
  function b(L) {
    return c(L);
  }
  function R(L) {
    return c(L);
  }
  function C(L) {
    function H($) {
      return $.trim();
    }
    return c(L, {
      type: "rule",
      selectors: L.text.split(",").map(H),
      declarations: B()
    });
  }
  function D(L) {
    switch (L.type) {
      case "property":
        return R(L);
      case "selector":
        return C(L);
      case "at-group-end":
        a = a - 1;
        return;
      case "media":
      case "keyframes":
        return s(L);
      case "comment":
        if (n)
          return m(L);
        break;
      case "charset":
        return p(L);
      case "import":
        return g(L);
      case "namespace":
        return b(L);
      case "font-face":
      case "supports":
      case "viewport":
      case "document":
      case "page":
        return s(L);
    }
  }
  function S(L) {
    for (var H, $ = [], ne; (ne = h()) && L && L(ne); )
      H = D(ne), H && $.push(H);
    return ne && ne.type !== "end" && u.unshift(ne), $;
  }
  function B() {
    return S(function(L) {
      return L.type === "property" || L.type === "comment";
    });
  }
  function P() {
    return S(function() {
      return a;
    });
  }
})(Mc);
var Xm = Mc.exports, Bc = { exports: {} };
(function(e, t) {
  su("stringify");
  var r, n, a, i, u, o;
  e.exports = c;
  function c(P, L) {
    L || (L = {}), a = L.indentation || "", n = !!L.compress, r = !!L.comments, i = 1, n ? u = o = "" : (u = `
`, o = " ");
    var H = b(P.stylesheet.rules, S).join(`
`).trim();
    return H;
  }
  function h(P) {
    if (P) {
      i += P;
      return;
    }
    return n ? "" : Array(i).join(a || "");
  }
  function s(P) {
    return "@" + P.type + " " + P.value + ";" + u;
  }
  function g(P) {
    var L = "", H = P.prefix || "";
    P.name && (L = " " + P.name);
    var $ = P.type !== "page";
    return "@" + H + P.type + L + o + R(P, $) + u;
  }
  function p(P) {
    return r ? "/*" + (P.text || "") + "*/" + u : "";
  }
  function m(P) {
    var L;
    return P.selectors ? L = P.selectors.join("," + u) : (L = "@" + P.type, L += P.name ? " " + P.name : ""), h() + L + o + R(P) + u;
  }
  function b(P, L) {
    return P.reduce(function(H, $) {
      var ne = $.type === "comment" ? p($) : L($);
      return ne && H.push(ne), H;
    }, []);
  }
  function R(P, L) {
    var H = P.declarations, $ = D;
    return P.rules && (H = P.rules, $ = m), H = C(H, $), H && (H = u + H + (L ? "" : u)), "{" + H + h() + "}";
  }
  function C(P, L) {
    if (!P)
      return "";
    h(1);
    var H = b(P, L);
    return h(-1), H.length ? H.join(u) : "";
  }
  function D(P) {
    if (P.type === "property")
      return B(P);
  }
  function S(P) {
    switch (P.type) {
      case "rule":
        return m(P);
      case "media":
      case "keyframes":
        return g(P);
      case "comment":
        return p(P);
      case "import":
      case "charset":
      case "namespace":
        return s(P);
      case "font-face":
      case "supports":
      case "viewport":
      case "document":
      case "page":
        return g(P);
    }
  }
  function B(P) {
    var L = P.name ? P.name + ":" + o : "";
    return h() + L + P.value + ";";
  }
})(Bc);
var zm = Bc.exports, Km = {
  lex: wc,
  parse: Xm,
  stringify: zm
}, kc = { exports: {} }, Zm = /([-.*+?^${}()|[\]\/\\])/g, Jm = /\\/g, Yt = function(e) {
  return (e + "").replace(Zm, "\\$1");
}, qt = function(e) {
  return (e + "").replace(Jm, "");
}, eE = RegExp(
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
  `^(?:\\s*(,)\\s*|\\s*(<combinator>+)\\s*|(\\s+)|(<unicode>+|\\*)|\\#(<unicode>+)|\\.(<unicode>+)|\\[\\s*(<unicode1>+)(?:\\s*([*^$!~|]?=)(?:\\s*(?:(["']?)(.*?)\\9)))?\\s*\\](?!\\])|(:+)(<unicode>+)(?:\\((?:(?:(["'])([^\\13]*)\\13)|((?:\\([^)]+\\)|[^()]*)+))\\))?)`.replace(/<combinator>/, "[" + Yt(">+~`!@$%^&={}\\;</") + "]").replace(/<unicode>/g, "(?:[\\w\\u00a1-\\uFFFF-]|\\\\[^\\s0-9a-f])").replace(/<unicode1>/g, "(?:[:\\w\\u00a1-\\uFFFF-]|\\\\[^\\s0-9a-f])")
), Fc = function(t) {
  this.combinator = t || " ", this.tag = "*";
};
Fc.prototype.toString = function() {
  if (!this.raw) {
    var e = "", t, r;
    if (e += this.tag || "*", this.id && (e += "#" + this.id), this.classes && (e += "." + this.classList.join(".")), this.attributes)
      for (t = 0; r = this.attributes[t++]; )
        e += "[" + r.name + (r.operator ? r.operator + '"' + r.value + '"' : "") + "]";
    if (this.pseudos)
      for (t = 0; r = this.pseudos[t++]; )
        e += ":" + r.name, r.value && (e += "(" + r.value + ")");
    this.raw = e;
  }
  return this.raw;
};
var Uc = function() {
  this.length = 0;
};
Uc.prototype.toString = function() {
  if (!this.raw) {
    for (var e = "", t = 0, r; r = this[t++]; )
      t !== 1 && (e += " "), r.combinator !== " " && (e += r.combinator + " "), e += r;
    this.raw = e;
  }
  return this.raw;
};
var tE = function(e, t, r, n, a, i, u, o, c, h, s, g, p, m, b, R) {
  var C, D;
  if ((t || !this.length) && (C = this[this.length++] = new Uc(), t))
    return "";
  if (C || (C = this[this.length - 1]), (r || n || !C.length) && (D = C[C.length++] = new Fc(r)), D || (D = C[C.length - 1]), a)
    D.tag = qt(a);
  else if (i)
    D.id = qt(i);
  else if (u) {
    var S = qt(u), B = D.classes || (D.classes = {});
    if (!B[S]) {
      B[S] = Yt(u);
      var P = D.classList || (D.classList = []);
      P.push(S), P.sort();
    }
  } else
    p ? (R = R || b, (D.pseudos || (D.pseudos = [])).push({
      type: g.length == 1 ? "class" : "element",
      name: qt(p),
      escapedName: Yt(p),
      value: R ? qt(R) : null,
      escapedValue: R ? Yt(R) : null
    })) : o && (s = s ? Yt(s) : null, (D.attributes || (D.attributes = [])).push({
      operator: c,
      name: qt(o),
      escapedName: Yt(o),
      value: s ? qt(s) : null,
      escapedValue: s ? Yt(s) : null
    }));
  return "";
}, Hc = function(t) {
  this.length = 0;
  for (var r = this, n = t, a; t; ) {
    if (a = t.replace(eE, function() {
      return tE.apply(r, arguments);
    }), a === t)
      throw new Error(n + " is an invalid expression");
    t = a;
  }
};
Hc.prototype.toString = function() {
  if (!this.raw) {
    for (var e = [], t = 0, r; r = this[t++]; )
      e.push(r);
    this.raw = e.join(", ");
  }
  return this.raw;
};
var rs = {}, rE = function(e) {
  return e == null ? null : (e = ("" + e).replace(/^\s+|\s+$/g, ""), rs[e] || (rs[e] = new Hc(e)));
}, nE = rE;
(function(e, t) {
  var r = nE;
  e.exports = n;
  function n(i, u) {
    this.text = i, this.spec = void 0, this.styleAttribute = u || !1;
  }
  n.prototype.parsed = function() {
    return this.tokens || (this.tokens = a(this.text)), this.tokens;
  }, n.prototype.specificity = function() {
    var i = this.styleAttribute;
    return this.spec || (this.spec = u(this.text, this.parsed())), this.spec;
    function u(o, c) {
      for (var h = c || a(o), s = [i ? 1 : 0, 0, 0, 0], g = [], p = 0; p < h.length; p++) {
        var m = h[p], b = m.pseudos;
        if (m.id && s[1]++, m.attributes && (s[2] += m.attributes.length), m.classList && (s[2] += m.classList.length), m.tag && m.tag !== "*" && s[3]++, b) {
          s[3] += b.length;
          for (var R = 0; R < b.length; R++)
            b[R].name === "not" && (g.push(b[R].value), s[3]--);
        }
      }
      for (var C = g.length; C--; )
        for (var D = u(g[C]), S = 4; S--; )
          s[S] += D[S];
      return s;
    }
  };
  function a(i) {
    try {
      return r(i)[0];
    } catch {
      return [];
    }
  }
})(kc);
var aE = kc.exports, Ga = { exports: {} }, ns;
function iE() {
  return ns || (ns = 1, function(e, t) {
    e.exports = n;
    var r = ou();
    function n(a, i, u, o, c) {
      this.prop = a, this.value = i, this.selector = u, this.priority = o || 0, this.additionalPriority = c || [];
    }
    n.prototype.compareFunc = function(a) {
      var i = [];
      i.push.apply(i, this.selector.specificity()), i.push.apply(i, this.additionalPriority), i[0] += this.priority;
      var u = [];
      return u.push.apply(u, a.selector.specificity()), u.push.apply(u, a.additionalPriority), u[0] += a.priority, r.compareFunc(i, u);
    }, n.prototype.compare = function(a) {
      var i = this.compareFunc(a);
      return i === 1 ? this : a;
    }, n.prototype.toString = function() {
      return this.prop + ": " + this.value.replace(/['"]+/g, "") + ";";
    };
  }(Ga)), Ga.exports;
}
var as;
function ou() {
  return as || (as = 1, function(e) {
    var t = Km, r = aE, n = iE();
    e.Selector = r, e.Property = n;
    /**
     * Returns an array of the selectors.
     *
     * @license Sizzle CSS Selector Engine - MIT
     * @param {String} selectorText from mensch
     * @api public
     */
    e.extract = function(i) {
      for (var u = 0, o = [], c = "", h = 0, s = i.length; h < s; h++) {
        var g = i.charAt(h);
        u ? ((g === "]" || g === ")") && u--, c += g) : g === "," ? (o.push(c), c = "") : ((g === "[" || g === "(") && u++, (c.length || g !== "," && g !== `
` && g !== " ") && (c += g));
      }
      return c.length && o.push(c), o;
    }, e.parseCSS = function(a) {
      for (var i = t.parse(a, { position: !0, comments: !0 }), u = typeof i.stylesheet < "u" && i.stylesheet.rules ? i.stylesheet.rules : [], o = [], c = 0, h = u.length; c < h; c++)
        if (u[c].type == "rule")
          for (var s = u[c], g = s.selectors, p = 0, m = g.length; p < m; p++)
            o.push([g[p], s.declarations]);
      return o;
    }, e.getPreservedText = function(a, i, u) {
      for (var o = t.parse(a, { position: !0, comments: !0 }), c = typeof o.stylesheet < "u" && o.stylesheet.rules ? o.stylesheet.rules : [], h = [], s = c.length - 1; s >= 0; s--)
        (i.fontFaces && c[s].type === "font-face" || i.mediaQueries && c[s].type === "media" || i.keyFrames && c[s].type === "keyframes" || i.pseudos && c[s].selectors && this.matchesPseudo(c[s].selectors[0], u)) && h.unshift(
          t.stringify(
            { stylesheet: { rules: [c[s]] } },
            { comments: !1, indentation: "  " }
          )
        ), c[s].position.start;
      return h.length === 0 ? !1 : `
` + h.join(`
`) + `
`;
    }, e.normalizeLineEndings = function(a) {
      return a.replace(/\r\n/g, `
`).replace(/\n/g, `\r
`);
    }, e.matchesPseudo = function(a, i) {
      return i.find(function(u) {
        return a.indexOf(u) > -1;
      });
    }, e.compareFunc = function(a, i) {
      for (var u = Math.min(a.length, i.length), o = 0; o < u; o++)
        if (a[o] !== i[o])
          return a[o] > i[o] ? 1 : -1;
      return a.length - i.length;
    }, e.compare = function(a, i) {
      return e.compareFunc(a, i) == 1 ? a : i;
    }, e.getDefaultOptions = function(a) {
      var i = Object.assign({
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
      return i.webResources = i.webResources || {}, i;
    };
  }(Ha)), Ha;
}
(function(e) {
  var t = Vs;
  ou();
  var r = function(a, i, u) {
    return i = Object.assign({ decodeEntities: !1, _useHtmlParser2: !0 }, i), a = u(a), t.load(a, i);
  }, n = function() {
    var a = [], i = function(o) {
      var c = e.exports.codeBlocks;
      return Object.keys(c).forEach(function(h) {
        var s = new RegExp(c[h].start + "([\\S\\s]*?)" + c[h].end, "g");
        o = o.replace(s, function(g, p) {
          return a.push(g), "JUICE_CODE_BLOCK_" + (a.length - 1) + "_";
        });
      }), o;
    }, u = function(o) {
      for (var c = 0; c < a.length; c++) {
        var h = new RegExp("JUICE_CODE_BLOCK_" + c + '_(="")?', "gi");
        o = o.replace(h, function() {
          return a[c];
        });
      }
      return o;
    };
    return {
      encodeEntities: i,
      decodeEntities: u
    };
  };
  e.exports = function(a, i, u, o) {
    var c = n(), h = r(a, i, c.encodeEntities), s = [h];
    s.push.apply(s, o);
    var g = u.apply(void 0, s) || h;
    return i && i.xmlMode ? c.decodeEntities(g.xml()) : c.decodeEntities(g.html());
  }, e.exports.codeBlocks = {
    EJS: { start: "<%", end: "%>" },
    HBS: { start: "{{", end: "}}" }
  };
})(Ys);
var uE = Ys.exports, cu = {};
cu.romanize = function(e) {
  if (isNaN(e))
    return NaN;
  for (var t = String(+e).split(""), r = [
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
  ], n = "", a = 3; a--; )
    n = (r[+t.pop() + a * 10] || "") + n;
  return Array(+t.join("") + 1).join("M") + n;
};
cu.alphanumeric = function(e) {
  for (var t = "", r; e > 0; )
    r = (e - 1) % 26, t = String.fromCharCode(65 + r) + t, e = (e - r) / 26 | 0;
  return t || void 0;
};
const sE = (e) => {
  let t = "";
  do
    t = (Math.random() + 1).toString(36).substring(2);
  while (e.indexOf(t) !== -1);
  return t;
}, oE = (e, t) => {
  let r = /([a-z\-]+)\s*\(\s*([^\(\)]*?)\s*(?:,\s*([^\(\)]*?)\s*)?\s*\)/i, n = [], a, i = sE(t);
  for (; (a = r.exec(t)) !== null; ) {
    let o = `${n.length}`;
    if (a[1].toLowerCase() == "var") {
      const h = Gc(e, a[2]);
      if (h) {
        t = t.replace(a[0], h);
        continue;
      }
      if (a[3]) {
        t = t.replace(a[0], a[3]);
        continue;
      }
    }
    let c = `${i}${o.padStart(5, "-")}`;
    t = t.replace(a[0], c), n.push({ placeholder: c, replace: a[0] });
  }
  for (var u = n.length - 1; u >= 0; u--) {
    const o = n[u];
    t = t.replace(o.placeholder, o.replace);
  }
  return t;
}, Gc = (e, t) => {
  for (; e; ) {
    if (e.styleProps && t in e.styleProps)
      return e.styleProps[t].value;
    var e = e.pseudoElementParent || e.parent;
  }
};
var cE = { replaceVariables: oE, findVariableValue: Gc }, Mt = ou(), vn = cu, is = cE, lE = function(t) {
  t.ignoredPseudos = ["hover", "active", "focus", "visited", "link"], t.widthElements = ["TABLE", "TD", "TH", "IMG"], t.heightElements = ["TABLE", "TD", "TH", "IMG"], t.tableElements = ["TABLE", "TH", "TR", "TD", "CAPTION", "COLGROUP", "COL", "THEAD", "TBODY", "TFOOT"], t.nonVisualElements = ["HEAD", "TITLE", "BASE", "LINK", "STYLE", "META", "SCRIPT", "NOSCRIPT"], t.styleToAttribute = {
    "background-color": "bgcolor",
    "background-image": "background",
    "text-align": "align",
    "vertical-align": "valign"
  }, t.excludedProperties = [], t.juiceDocument = h, t.inlineDocument = r;
  function r(p, m, b) {
    b = b || {};
    var R = Mt.parseCSS(m), C = [], D = "style", S = {};
    if (b.styleAttributeName && (D = b.styleAttributeName), R.forEach(L), C.forEach(H), b.inlinePseudoElements && C.forEach($), b.applyWidthAttributes && C.forEach(function(I) {
      ne(I, "width");
    }), b.applyHeightAttributes && C.forEach(function(I) {
      ne(I, "height");
    }), b.applyAttributesTableElements && C.forEach(q), b.insertPreservedExtraCss && b.extraCss) {
      var B = Mt.getPreservedText(b.extraCss, {
        mediaQueries: b.preserveMediaQueries,
        fontFaces: b.preserveFontFaces,
        keyFrames: b.preserveKeyFrames
      });
      if (B) {
        var P = null;
        b.insertPreservedExtraCss !== !0 ? P = p(b.insertPreservedExtraCss) : (P = p("head"), P.length || (P = p("body")), P.length || (P = p.root())), P.first().append("<style>" + B + "</style>");
      }
    }
    function L(I) {
      var O = I[0], x = I[1], M = new Mt.Selector(O), G = M.parsed();
      if (G) {
        for (var W = u(G), V = 0; V < G.length; ++V) {
          var Q = G[V];
          if (Q.pseudos)
            for (var z = 0; z < Q.pseudos.length; ++z) {
              var J = Q.pseudos[z];
              if (t.ignoredPseudos.indexOf(J.name) >= 0)
                return;
            }
        }
        if (W) {
          var Be = G[G.length - 1], Ae = Be.pseudos;
          Be.pseudos = c(Be.pseudos), O = G.toString(), Be.pseudos = Ae;
        }
        var re;
        try {
          re = p(O);
        } catch {
          return;
        }
        re.each(function() {
          var ee = this;
          if (ee.name && t.nonVisualElements.indexOf(ee.name.toUpperCase()) >= 0)
            return;
          if (ee.counterProps || (ee.counterProps = ee.parent && ee.parent.counterProps ? Object.create(ee.parent.counterProps) : {}), W) {
            var le = "pseudo" + W, K = ee[le];
            K || (K = ee[le] = p("<span />").get(0), K.pseudoElementType = W, K.pseudoElementParent = ee, K.counterProps = ee.counterProps, ee[le] = K), ee = K;
          }
          if (!ee.styleProps) {
            if (ee.styleProps = {}, p(ee).attr(D)) {
              var Lt = "* { " + p(ee).attr(D) + " } ";
              Ct(Mt.parseCSS(Lt)[0][1], new Mt.Selector("<style>", !0));
            }
            C.push(ee);
          }
          function at(Ce, je) {
            for (var Ne = je.split(/\s+/), ce = 0; ce < Ne.length; ce++) {
              var De = Ne[ce], Se = parseInt(Ne[ce + 1], 10);
              isNaN(Se) ? Ce.counterProps[De] = S[De] = 0 : Ce.counterProps[De] = S[Ne[ce++]] = Se;
            }
          }
          function ft(Ce, je) {
            for (var Ne = je.split(/\s+/), ce = 0; ce < Ne.length; ce++) {
              var De = Ne[ce];
              if (Ce.counterProps[De] !== void 0) {
                var Se = parseInt(Ne[ce + 1], 10);
                isNaN(Se) ? Ce.counterProps[De] = S[De] += 1 : Ce.counterProps[De] = S[Ne[ce++]] += Se;
              }
            }
          }
          function Ct(Ce, je) {
            for (var Ne = 0, ce = Ce.length; Ne < ce; Ne++)
              if (Ce[Ne].type == "property") {
                var De = Ce[Ne].name, Se = Ce[Ne].value;
                De === "counter-reset" && at(ee, Se), De === "counter-increment" && ft(ee, Se);
                var Ee = Se.match(/!important$/) !== null;
                Ee && !b.preserveImportant && (Se = n(Se));
                var nr = [Ce[Ne].position.start.line, Ce[Ne].position.start.col], xt = new Mt.Property(De, Se, je, Ee ? 2 : 0, nr), We = ee.styleProps[De];
                t.excludedProperties.indexOf(De) < 0 && (We && We.compare(xt) === xt || !We) && (We && We.selector !== je ? delete ee.styleProps[De] : We && (xt.nextProp = We), ee.styleProps[De] = xt);
              }
          }
          Ct(x, M);
        });
      }
    }
    function H(I) {
      Object.keys(I.styleProps).length;
      var O = [];
      Object.keys(I.styleProps).forEach(function(M) {
        for (var G = I.styleProps[M]; typeof G < "u"; )
          O.push(G), G = G.nextProp;
      }), O.sort(function(M, G) {
        return M.compareFunc(G);
      });
      var x = O.filter(function(M) {
        return b.resolveCSSVariables && M.prop.indexOf("--") === 0 ? !1 : M.prop !== "content";
      }).map(function(M) {
        return b.resolveCSSVariables && (M.value = is.replaceVariables(I, M.value)), M.prop + ": " + M.value.replace(/["]/g, "'") + ";";
      }).join(" ");
      x && p(I).attr(D, x);
    }
    function $(I) {
      if (I.pseudoElementType && I.styleProps.content) {
        var O = i(I);
        O.img ? (I.name = "img", p(I).attr("src", O.img)) : p(I).text(O);
        var x = I.pseudoElementParent;
        I.pseudoElementType === "before" ? p(x).prepend(I) : p(x).append(I);
      }
    }
    function ne(I, O) {
      if (I.name) {
        var x = I.name.toUpperCase();
        if (t[O + "Elements"].indexOf(x) > -1) {
          for (var M in I.styleProps)
            if (I.styleProps[M].prop === O) {
              var G = I.styleProps[M].value;
              if (b.preserveImportant && (G = n(G)), G.match(/(px|auto)/)) {
                var W = G.replace("px", "");
                p(I).attr(O, W);
                return;
              }
              if (t.tableElements.indexOf(x) > -1 && G.match(/\%/)) {
                p(I).attr(O, G);
                return;
              }
            }
        }
      }
    }
    function oe(I) {
      return I.indexOf("url(") !== 0 ? I : I.replace(/^url\((["'])?([^"']+)\1\)$/, "$2");
    }
    function q(I) {
      if (I.name) {
        var O = I.name.toUpperCase(), x = Object.keys(t.styleToAttribute);
        if (t.tableElements.indexOf(O) > -1) {
          for (var M in I.styleProps)
            if (x.indexOf(I.styleProps[M].prop) > -1) {
              var G = t.styleToAttribute[I.styleProps[M].prop], W = I.styleProps[M].value;
              if (b.preserveImportant && (W = n(W)), G === "background" && (W = oe(W)), /(linear|radial)-gradient\(/i.test(W))
                continue;
              p(I).attr(G, W);
            }
        }
      }
    }
  }
  function n(p) {
    return p.replace(/\s*!important$/, "");
  }
  function a(p, m) {
    switch (m) {
      case "lower-roman":
        return vn.romanize(p).toLowerCase();
      case "upper-roman":
        return vn.romanize(p);
      case "lower-latin":
      case "lower-alpha":
        return vn.alphanumeric(p).toLowerCase();
      case "upper-latin":
      case "upper-alpha":
        return vn.alphanumeric(p);
      default:
        return p.toString();
    }
  }
  function i(p) {
    var m = p.styleProps.content.value;
    if (m === "none" || m === "normal")
      return "";
    var b = m.match(/^\s*url\s*\(\s*(.*?)\s*\)\s*$/i);
    if (b) {
      var R = b[1].replace(/^['"]|['"]$/g, "");
      return { img: R };
    }
    for (var C = [], D = m.split(/['"]/), S = 0; S < D.length; S++)
      if (D[S] !== "") {
        var B = D[S].match(/var\s*\(\s*(.*?)\s*(,\s*(.*?)\s*)?\s*\)/i);
        if (B) {
          var P = is.findVariableValue(p, B[1]) || B[2];
          C.push(P.replace(/^['"]|['"]$/g, ""));
          continue;
        }
        var L = D[S].match(/counter\s*\(\s*(.*?)\s*(,\s*(.*?)\s*)?\s*\)/i);
        if (L && L[1] in p.counterProps) {
          var H = p.counterProps[L[1]];
          C.push(a(H, L[3]));
          continue;
        }
        var $ = D[S].match(/attr\s*\(\s*(.*?)\s*\)/i);
        if ($) {
          var ne = $[1];
          C.push(
            p.pseudoElementParent ? p.pseudoElementParent.attribs[ne] : p.attribs[ne]
          );
          continue;
        }
        C.push(D[S]);
      }
    return m = C.join(""), m = m.replace(/\\/g, ""), m;
  }
  function u(p) {
    if (p.length !== 0) {
      var m = p[p.length - 1].pseudos;
      if (m) {
        for (var b = 0; b < m.length; b++)
          if (o(m[b]))
            return m[b].name;
      }
    }
  }
  function o(p) {
    return p.name === "before" || p.name === "after";
  }
  function c(p) {
    return p.filter(function(m) {
      return !o(m);
    });
  }
  function h(p, m) {
    m = Mt.getDefaultOptions(m);
    var b = g(p, m);
    return b += `
` + m.extraCss, r(p, b, m), p;
  }
  function s(p, m) {
    var b = [], R = p("style"), C, D, S;
    return R.each(function() {
      S = this;
      var B = !!S.childNodes;
      if (C = B ? S.childNodes : S.children, C.length !== 1) {
        m.removeStyleTags && p(S).remove();
        return;
      }
      if (D = C[0].data, m.applyStyleTags && p(S).attr("data-embed") === void 0 && b.push(D), m.removeStyleTags && p(S).attr("data-embed") === void 0) {
        var P = B ? S.childNodes[0].nodeValue : S.children[0].data, L = Mt.getPreservedText(P, {
          mediaQueries: m.preserveMediaQueries,
          fontFaces: m.preserveFontFaces,
          keyFrames: m.preserveKeyFrames,
          pseudos: m.preservePseudos
        }, t.ignoredPseudos);
        L ? B ? S.childNodes[0].nodeValue = L : S.children[0].data = L : p(S).remove();
      }
      p(S).removeAttr("data-embed");
    }), b;
  }
  function g(p, m) {
    var b = s(p, m), R = b.join(`
`);
    return R;
  }
  return t;
}, lu = uE, fE = lE, sn = fE(function(e, t) {
  return lu(e, { xmlMode: t && t.xmlMode }, dE, [t]);
}), dE = function(e, t) {
  return sn.juiceDocument(e, t);
};
sn.inlineContent = function(e, t, r) {
  return lu(e, { xmlMode: r && r.xmlMode }, sn.inlineDocument, [t, r]);
};
sn.codeBlocks = lu.codeBlocks;
var hE = sn;
const Ii = /* @__PURE__ */ Ui(hE);
class _n {
  /**
   * @constructor
   * @param {Properties} property
   * @param {Normal} normal
   * @param {string} [space]
   */
  constructor(t, r, n) {
    this.property = t, this.normal = r, n && (this.space = n);
  }
}
_n.prototype.property = {};
_n.prototype.normal = {};
_n.prototype.space = null;
function jc(e, t) {
  const r = {}, n = {};
  let a = -1;
  for (; ++a < e.length; )
    Object.assign(r, e[a].property), Object.assign(n, e[a].normal);
  return new _n(r, n, t);
}
function on(e) {
  return e.toLowerCase();
}
class ut {
  /**
   * @constructor
   * @param {string} property
   * @param {string} attribute
   */
  constructor(t, r) {
    this.property = t, this.attribute = r;
  }
}
ut.prototype.space = null;
ut.prototype.boolean = !1;
ut.prototype.booleanish = !1;
ut.prototype.overloadedBoolean = !1;
ut.prototype.number = !1;
ut.prototype.commaSeparated = !1;
ut.prototype.spaceSeparated = !1;
ut.prototype.commaOrSpaceSeparated = !1;
ut.prototype.mustUseProperty = !1;
ut.prototype.defined = !1;
let pE = 0;
const ae = tr(), Re = tr(), qc = tr(), j = tr(), be = tr(), Tr = tr(), Je = tr();
function tr() {
  return 2 ** ++pE;
}
const yi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: ae,
  booleanish: Re,
  commaOrSpaceSeparated: Je,
  commaSeparated: Tr,
  number: j,
  overloadedBoolean: qc,
  spaceSeparated: be
}, Symbol.toStringTag, { value: "Module" })), ja = Object.keys(yi);
class fu extends ut {
  /**
   * @constructor
   * @param {string} property
   * @param {string} attribute
   * @param {number|null} [mask]
   * @param {string} [space]
   */
  constructor(t, r, n, a) {
    let i = -1;
    if (super(t, r), us(this, "space", a), typeof n == "number")
      for (; ++i < ja.length; ) {
        const u = ja[i];
        us(this, ja[i], (n & yi[u]) === yi[u]);
      }
  }
}
fu.prototype.defined = !0;
function us(e, t, r) {
  r && (e[t] = r);
}
const mE = {}.hasOwnProperty;
function kr(e) {
  const t = {}, r = {};
  let n;
  for (n in e.properties)
    if (mE.call(e.properties, n)) {
      const a = e.properties[n], i = new fu(
        n,
        e.transform(e.attributes || {}, n),
        a,
        e.space
      );
      e.mustUseProperty && e.mustUseProperty.includes(n) && (i.mustUseProperty = !0), t[n] = i, r[on(n)] = n, r[on(i.attribute)] = n;
    }
  return new _n(t, r, e.space);
}
const Yc = kr({
  space: "xlink",
  transform(e, t) {
    return "xlink:" + t.slice(5).toLowerCase();
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
}), Vc = kr({
  space: "xml",
  transform(e, t) {
    return "xml:" + t.slice(3).toLowerCase();
  },
  properties: { xmlLang: null, xmlBase: null, xmlSpace: null }
});
function $c(e, t) {
  return t in e ? e[t] : t;
}
function Wc(e, t) {
  return $c(e, t.toLowerCase());
}
const Qc = kr({
  space: "xmlns",
  attributes: { xmlnsxlink: "xmlns:xlink" },
  transform: Wc,
  properties: { xmlns: null, xmlnsXLink: null }
}), Xc = kr({
  transform(e, t) {
    return t === "role" ? t : "aria-" + t.slice(4).toLowerCase();
  },
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: Re,
    ariaAutoComplete: null,
    ariaBusy: Re,
    ariaChecked: Re,
    ariaColCount: j,
    ariaColIndex: j,
    ariaColSpan: j,
    ariaControls: be,
    ariaCurrent: null,
    ariaDescribedBy: be,
    ariaDetails: null,
    ariaDisabled: Re,
    ariaDropEffect: be,
    ariaErrorMessage: null,
    ariaExpanded: Re,
    ariaFlowTo: be,
    ariaGrabbed: Re,
    ariaHasPopup: null,
    ariaHidden: Re,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: be,
    ariaLevel: j,
    ariaLive: null,
    ariaModal: Re,
    ariaMultiLine: Re,
    ariaMultiSelectable: Re,
    ariaOrientation: null,
    ariaOwns: be,
    ariaPlaceholder: null,
    ariaPosInSet: j,
    ariaPressed: Re,
    ariaReadOnly: Re,
    ariaRelevant: null,
    ariaRequired: Re,
    ariaRoleDescription: be,
    ariaRowCount: j,
    ariaRowIndex: j,
    ariaRowSpan: j,
    ariaSelected: Re,
    ariaSetSize: j,
    ariaSort: null,
    ariaValueMax: j,
    ariaValueMin: j,
    ariaValueNow: j,
    ariaValueText: null,
    role: null
  }
}), EE = kr({
  space: "html",
  attributes: {
    acceptcharset: "accept-charset",
    classname: "class",
    htmlfor: "for",
    httpequiv: "http-equiv"
  },
  transform: Wc,
  mustUseProperty: ["checked", "multiple", "muted", "selected"],
  properties: {
    // Standard Properties.
    abbr: null,
    accept: Tr,
    acceptCharset: be,
    accessKey: be,
    action: null,
    allow: null,
    allowFullScreen: ae,
    allowPaymentRequest: ae,
    allowUserMedia: ae,
    alt: null,
    as: null,
    async: ae,
    autoCapitalize: null,
    autoComplete: be,
    autoFocus: ae,
    autoPlay: ae,
    blocking: be,
    capture: ae,
    charSet: null,
    checked: ae,
    cite: null,
    className: be,
    cols: j,
    colSpan: null,
    content: null,
    contentEditable: Re,
    controls: ae,
    controlsList: be,
    coords: j | Tr,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: ae,
    defer: ae,
    dir: null,
    dirName: null,
    disabled: ae,
    download: qc,
    draggable: Re,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: ae,
    formTarget: null,
    headers: be,
    height: j,
    hidden: ae,
    high: j,
    href: null,
    hrefLang: null,
    htmlFor: be,
    httpEquiv: be,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: ae,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: ae,
    itemId: null,
    itemProp: be,
    itemRef: be,
    itemScope: ae,
    itemType: be,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: ae,
    low: j,
    manifest: null,
    max: null,
    maxLength: j,
    media: null,
    method: null,
    min: null,
    minLength: j,
    multiple: ae,
    muted: ae,
    name: null,
    nonce: null,
    noModule: ae,
    noValidate: ae,
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
    open: ae,
    optimum: j,
    pattern: null,
    ping: be,
    placeholder: null,
    playsInline: ae,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: ae,
    referrerPolicy: null,
    rel: be,
    required: ae,
    reversed: ae,
    rows: j,
    rowSpan: j,
    sandbox: be,
    scope: null,
    scoped: ae,
    seamless: ae,
    selected: ae,
    shadowRootDelegatesFocus: ae,
    shadowRootMode: null,
    shape: null,
    size: j,
    sizes: null,
    slot: null,
    span: j,
    spellCheck: Re,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: j,
    step: null,
    style: null,
    tabIndex: j,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: ae,
    useMap: null,
    value: Re,
    width: j,
    wrap: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: be,
    // `<object>`. List of URIs to archives
    axis: null,
    // `<td>` and `<th>`. Use `scope` on `<th>`
    background: null,
    // `<body>`. Use CSS `background-image` instead
    bgColor: null,
    // `<body>` and table elements. Use CSS `background-color` instead
    border: j,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: j,
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
    compact: ae,
    // Lists. Use CSS to reduce space between items instead
    declare: ae,
    // `<object>`
    event: null,
    // `<script>`
    face: null,
    // `<font>`. Use CSS instead
    frame: null,
    // `<table>`
    frameBorder: null,
    // `<iframe>`. Use CSS `border` instead
    hSpace: j,
    // `<img>` and `<object>`
    leftMargin: j,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: j,
    // `<body>`
    marginWidth: j,
    // `<body>`
    noResize: ae,
    // `<frame>`
    noHref: ae,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: ae,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: ae,
    // `<td>` and `<th>`
    object: null,
    // `<applet>`
    profile: null,
    // `<head>`
    prompt: null,
    // `<isindex>`
    rev: null,
    // `<link>`
    rightMargin: j,
    // `<body>`
    rules: null,
    // `<table>`
    scheme: null,
    // `<meta>`
    scrolling: Re,
    // `<frame>`. Use overflow in the child context
    standby: null,
    // `<object>`
    summary: null,
    // `<table>`
    text: null,
    // `<body>`. Use CSS `color` instead
    topMargin: j,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: j,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: ae,
    disableRemotePlayback: ae,
    prefix: null,
    property: null,
    results: j,
    security: null,
    unselectable: null
  }
}), TE = kr({
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
  transform: $c,
  properties: {
    about: Je,
    accentHeight: j,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: j,
    amplitude: j,
    arabicForm: null,
    ascent: j,
    attributeName: null,
    attributeType: null,
    azimuth: j,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: j,
    by: null,
    calcMode: null,
    capHeight: j,
    className: be,
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
    descent: j,
    diffuseConstant: j,
    direction: null,
    display: null,
    dur: null,
    divisor: j,
    dominantBaseline: null,
    download: ae,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: j,
    enableBackground: null,
    end: null,
    event: null,
    exponent: j,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: j,
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
    g1: Tr,
    g2: Tr,
    glyphName: Tr,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: j,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: j,
    horizOriginX: j,
    horizOriginY: j,
    id: null,
    ideographic: j,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: j,
    k: j,
    k1: j,
    k2: j,
    k3: j,
    k4: j,
    kernelMatrix: Je,
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
    limitingConeAngle: j,
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
    mediaSize: j,
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
    overlinePosition: j,
    overlineThickness: j,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: j,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: be,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: j,
    pointsAtY: j,
    pointsAtZ: j,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: Je,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: Je,
    rev: Je,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: Je,
    requiredFeatures: Je,
    requiredFonts: Je,
    requiredFormats: Je,
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
    specularConstant: j,
    specularExponent: j,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: j,
    strikethroughThickness: j,
    string: null,
    stroke: null,
    strokeDashArray: Je,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: j,
    strokeOpacity: j,
    strokeWidth: null,
    style: null,
    surfaceScale: j,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: Je,
    tabIndex: j,
    tableValues: null,
    target: null,
    targetX: j,
    targetY: j,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: Je,
    to: null,
    transform: null,
    transformOrigin: null,
    u1: null,
    u2: null,
    underlinePosition: j,
    underlineThickness: j,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: j,
    values: null,
    vAlphabetic: j,
    vMathematical: j,
    vectorEffect: null,
    vHanging: j,
    vIdeographic: j,
    version: null,
    vertAdvY: j,
    vertOriginX: j,
    vertOriginY: j,
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
    xHeight: j,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  }
}), gE = /^data[-\w.:]+$/i, ss = /-[a-z]/g, _E = /[A-Z]/g;
function Ia(e, t) {
  const r = on(t);
  let n = t, a = ut;
  if (r in e.normal)
    return e.property[e.normal[r]];
  if (r.length > 4 && r.slice(0, 4) === "data" && gE.test(t)) {
    if (t.charAt(4) === "-") {
      const i = t.slice(5).replace(ss, AE);
      n = "data" + i.charAt(0).toUpperCase() + i.slice(1);
    } else {
      const i = t.slice(4);
      if (!ss.test(i)) {
        let u = i.replace(_E, bE);
        u.charAt(0) !== "-" && (u = "-" + u), t = "data" + u;
      }
    }
    a = fu;
  }
  return new a(n, t);
}
function bE(e) {
  return "-" + e.toLowerCase();
}
function AE(e) {
  return e.charAt(1).toUpperCase();
}
const bn = jc([Vc, Yc, Qc, Xc, EE], "html"), rr = jc([Vc, Yc, Qc, Xc, TE], "svg");
function Ci(e) {
  const t = [], r = String(e || "");
  let n = r.indexOf(","), a = 0, i = !1;
  for (; !i; ) {
    n === -1 && (n = r.length, i = !0);
    const u = r.slice(a, n).trim();
    (u || !i) && t.push(u), a = n + 1, n = r.indexOf(",", a);
  }
  return t;
}
function zc(e, t) {
  const r = t || {};
  return (e[e.length - 1] === "" ? [...e, ""] : e).join(
    (r.padRight ? " " : "") + "," + (r.padLeft === !1 ? "" : " ")
  ).trim();
}
const os = /[#.]/g;
function IE(e, t) {
  const r = e || "", n = {};
  let a = 0, i, u;
  for (; a < r.length; ) {
    os.lastIndex = a;
    const o = os.exec(r), c = r.slice(a, o ? o.index : r.length);
    c && (i ? i === "#" ? n.id = c : Array.isArray(n.className) ? n.className.push(c) : n.className = [c] : u = c, a += c.length), o && (i = o[0], a++);
  }
  return {
    type: "element",
    // @ts-expect-error: tag name is parsed.
    tagName: u || t || "div",
    properties: n,
    children: []
  };
}
function Ni(e) {
  const t = String(e || "").trim();
  return t ? t.split(/[ \t\n\r\f]+/g) : [];
}
function Kc(e) {
  return e.join(" ").trim();
}
const yE = /* @__PURE__ */ new Set(["button", "menu", "reset", "submit"]), Di = {}.hasOwnProperty;
function Zc(e, t, r) {
  const n = r && SE(r);
  function a(i, u, ...o) {
    let c = -1, h;
    if (i == null) {
      h = { type: "root", children: [] };
      const s = (
        /** @type {Child} */
        u
      );
      o.unshift(s);
    } else if (h = IE(i, t), h.tagName = h.tagName.toLowerCase(), n && Di.call(n, h.tagName) && (h.tagName = n[h.tagName]), CE(u, h.tagName)) {
      let s;
      for (s in u)
        Di.call(u, s) && NE(e, h.properties, s, u[s]);
    } else
      o.unshift(u);
    for (; ++c < o.length; )
      Si(h.children, o[c]);
    return h.type === "element" && h.tagName === "template" && (h.content = { type: "root", children: h.children }, h.children = []), h;
  }
  return a;
}
function CE(e, t) {
  return e == null || typeof e != "object" || Array.isArray(e) ? !1 : t === "input" || !e.type || typeof e.type != "string" ? !0 : "children" in e && Array.isArray(e.children) ? !1 : t === "button" ? yE.has(e.type.toLowerCase()) : !("value" in e);
}
function NE(e, t, r, n) {
  const a = Ia(e, r);
  let i = -1, u;
  if (n != null) {
    if (typeof n == "number") {
      if (Number.isNaN(n))
        return;
      u = n;
    } else
      typeof n == "boolean" ? u = n : typeof n == "string" ? a.spaceSeparated ? u = Ni(n) : a.commaSeparated ? u = Ci(n) : a.commaOrSpaceSeparated ? u = Ni(Ci(n).join(" ")) : u = cs(a, a.property, n) : Array.isArray(n) ? u = n.concat() : u = a.property === "style" ? DE(n) : String(n);
    if (Array.isArray(u)) {
      const o = [];
      for (; ++i < u.length; ) {
        const c = (
          /** @type {number | string} */
          cs(a, a.property, u[i])
        );
        o[i] = c;
      }
      u = o;
    }
    if (a.property === "className" && Array.isArray(t.className)) {
      const o = (
        /** @type {number | string} */
        u
      );
      u = t.className.concat(o);
    }
    t[a.property] = u;
  }
}
function Si(e, t) {
  let r = -1;
  if (t != null)
    if (typeof t == "string" || typeof t == "number")
      e.push({ type: "text", value: String(t) });
    else if (Array.isArray(t))
      for (; ++r < t.length; )
        Si(e, t[r]);
    else if (typeof t == "object" && "type" in t)
      t.type === "root" ? Si(e, t.children) : e.push(t);
    else
      throw new Error("Expected node, nodes, or string, got `" + t + "`");
}
function cs(e, t, r) {
  if (typeof r == "string") {
    if (e.number && r && !Number.isNaN(Number(r)))
      return Number(r);
    if ((e.boolean || e.overloadedBoolean) && (r === "" || on(r) === on(t)))
      return !0;
  }
  return r;
}
function DE(e) {
  const t = [];
  let r;
  for (r in e)
    Di.call(e, r) && t.push([r, e[r]].join(": "));
  return t.join("; ");
}
function SE(e) {
  const t = {};
  let r = -1;
  for (; ++r < e.length; )
    t[e[r].toLowerCase()] = e[r];
  return t;
}
const OE = [
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
], vE = Zc(bn, "div"), RE = Zc(rr, "g", OE), qa = /\r?\n|\r/g;
function PE(e) {
  const t = String(e), r = [];
  for (qa.lastIndex = 0; qa.test(t); )
    r.push(qa.lastIndex);
  return r.push(t.length + 1), { toPoint: n, toOffset: a };
  function n(i) {
    let u = -1;
    if (typeof i == "number" && i > -1 && i < r[r.length - 1]) {
      for (; ++u < r.length; )
        if (r[u] > i)
          return {
            line: u + 1,
            column: i - (u > 0 ? r[u - 1] : 0) + 1,
            offset: i
          };
    }
  }
  function a(i) {
    const u = i && i.line, o = i && i.column;
    if (typeof u == "number" && typeof o == "number" && !Number.isNaN(u) && !Number.isNaN(o) && u - 1 in r) {
      const c = (r[u - 2] || 0) + o - 1 || 0;
      if (c > -1 && c < r[r.length - 1])
        return c;
    }
  }
}
const LE = {
  html: "http://www.w3.org/1999/xhtml",
  mathml: "http://www.w3.org/1998/Math/MathML",
  svg: "http://www.w3.org/2000/svg",
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
}, Jc = {}.hasOwnProperty, xE = Object.prototype;
function wE(e, t) {
  const r = t || {};
  return du(
    {
      file: r.file || void 0,
      location: !1,
      schema: r.space === "svg" ? rr : bn,
      verbose: r.verbose || !1
    },
    e
  );
}
function du(e, t) {
  let r;
  switch (t.nodeName) {
    case "#comment": {
      const n = (
        /** @type {P5Comment} */
        t
      );
      return r = { type: "comment", value: n.data }, kn(e, n, r), r;
    }
    case "#document":
    case "#document-fragment": {
      const n = (
        /** @type {P5Document | P5DocumentFragment} */
        t
      ), a = "mode" in n ? n.mode === "quirks" || n.mode === "limited-quirks" : !1;
      if (r = {
        type: "root",
        children: el(e, t.childNodes),
        data: { quirksMode: a }
      }, e.file && e.location) {
        const i = String(e.file), u = PE(i), o = u.toPoint(0), c = u.toPoint(i.length);
        r.position = { start: o, end: c };
      }
      return r;
    }
    case "#documentType": {
      const n = (
        /** @type {P5DocumentType} */
        t
      );
      return r = { type: "doctype" }, kn(e, n, r), r;
    }
    case "#text": {
      const n = (
        /** @type {P5Text} */
        t
      );
      return r = { type: "text", value: n.value }, kn(e, n, r), r;
    }
    default:
      return r = ME(
        e,
        /** @type {P5Element} */
        t
      ), r;
  }
}
function el(e, t) {
  let r = -1;
  const n = [];
  for (; ++r < t.length; ) {
    const a = (
      /** @type {RootContent} */
      du(e, t[r])
    );
    n.push(a);
  }
  return n;
}
function ME(e, t) {
  const r = e.schema;
  e.schema = t.namespaceURI === LE.svg ? rr : bn;
  let n = -1;
  const a = {};
  for (; ++n < t.attrs.length; ) {
    const o = t.attrs[n], c = (o.prefix ? o.prefix + ":" : "") + o.name;
    Jc.call(xE, c) || (a[c] = o.value);
  }
  const u = (e.schema.space === "svg" ? RE : vE)(t.tagName, a, el(e, t.childNodes));
  if (kn(e, t, u), u.tagName === "template") {
    const o = (
      /** @type {P5Template} */
      t
    ), c = o.sourceCodeLocation, h = c && c.startTag && dr(c.startTag), s = c && c.endTag && dr(c.endTag), g = (
      /** @type {Root} */
      du(e, o.content)
    );
    h && s && e.file && (g.position = { start: h.end, end: s.start }), u.content = g;
  }
  return e.schema = r, u;
}
function kn(e, t, r) {
  if ("sourceCodeLocation" in t && t.sourceCodeLocation && e.file) {
    const n = BE(e, r, t.sourceCodeLocation);
    n && (e.location = !0, r.position = n);
  }
}
function BE(e, t, r) {
  const n = dr(r);
  if (t.type === "element") {
    const a = t.children[t.children.length - 1];
    if (n && !r.endTag && a && a.position && a.position.end && (n.end = Object.assign({}, a.position.end)), e.verbose) {
      const i = {};
      let u;
      if (r.attrs)
        for (u in r.attrs)
          Jc.call(r.attrs, u) && (i[Ia(e.schema, u).property] = dr(
            r.attrs[u]
          ));
      r.startTag;
      const o = dr(r.startTag), c = r.endTag ? dr(r.endTag) : void 0, h = { opening: o };
      c && (h.closing = c), h.properties = i, t.data = { position: h };
    }
  }
  return n;
}
function dr(e) {
  const t = ls({
    line: e.startLine,
    column: e.startCol,
    offset: e.startOffset
  }), r = ls({
    line: e.endLine,
    column: e.endCol,
    offset: e.endOffset
  });
  return t || r ? { start: t, end: r } : void 0;
}
function ls(e) {
  return e.line && e.column ? e : void 0;
}
function kE(e) {
  return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? fs(e.position) : "start" in e || "end" in e ? fs(e) : "line" in e || "column" in e ? Oi(e) : "";
}
function Oi(e) {
  return ds(e && e.line) + ":" + ds(e && e.column);
}
function fs(e) {
  return Oi(e && e.start) + "-" + Oi(e && e.end);
}
function ds(e) {
  return e && typeof e == "number" ? e : 1;
}
class $e extends Error {
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
  constructor(t, r, n) {
    super(), typeof r == "string" && (n = r, r = void 0);
    let a = "", i = {}, u = !1;
    if (r && ("line" in r && "column" in r ? i = { place: r } : "start" in r && "end" in r ? i = { place: r } : "type" in r ? i = {
      ancestors: [r],
      place: r.position
    } : i = { ...r }), typeof t == "string" ? a = t : !i.cause && t && (u = !0, a = t.message, i.cause = t), !i.ruleId && !i.source && typeof n == "string") {
      const c = n.indexOf(":");
      c === -1 ? i.ruleId = n : (i.source = n.slice(0, c), i.ruleId = n.slice(c + 1));
    }
    if (!i.place && i.ancestors && i.ancestors) {
      const c = i.ancestors[i.ancestors.length - 1];
      c && (i.place = c.position);
    }
    const o = i.place && "start" in i.place ? i.place.start : i.place;
    this.ancestors = i.ancestors || void 0, this.cause = i.cause || void 0, this.column = o ? o.column : void 0, this.fatal = void 0, this.file, this.message = a, this.line = o ? o.line : void 0, this.name = kE(i.place) || "1:1", this.place = i.place || void 0, this.reason = this.message, this.ruleId = i.ruleId || void 0, this.source = i.source || void 0, this.stack = u && i.cause && typeof i.cause.stack == "string" ? i.cause.stack : "", this.actual, this.expected, this.note, this.url;
  }
}
$e.prototype.file = "";
$e.prototype.name = "";
$e.prototype.reason = "";
$e.prototype.message = "";
$e.prototype.stack = "";
$e.prototype.column = void 0;
$e.prototype.line = void 0;
$e.prototype.ancestors = void 0;
$e.prototype.cause = void 0;
$e.prototype.fatal = void 0;
$e.prototype.place = void 0;
$e.prototype.ruleId = void 0;
$e.prototype.source = void 0;
const pt = { basename: FE, dirname: UE, extname: HE, join: GE, sep: "/" };
function FE(e, t) {
  if (t !== void 0 && typeof t != "string")
    throw new TypeError('"ext" argument must be a string');
  An(e);
  let r = 0, n = -1, a = e.length, i;
  if (t === void 0 || t.length === 0 || t.length > e.length) {
    for (; a--; )
      if (e.codePointAt(a) === 47) {
        if (i) {
          r = a + 1;
          break;
        }
      } else
        n < 0 && (i = !0, n = a + 1);
    return n < 0 ? "" : e.slice(r, n);
  }
  if (t === e)
    return "";
  let u = -1, o = t.length - 1;
  for (; a--; )
    if (e.codePointAt(a) === 47) {
      if (i) {
        r = a + 1;
        break;
      }
    } else
      u < 0 && (i = !0, u = a + 1), o > -1 && (e.codePointAt(a) === t.codePointAt(o--) ? o < 0 && (n = a) : (o = -1, n = u));
  return r === n ? n = u : n < 0 && (n = e.length), e.slice(r, n);
}
function UE(e) {
  if (An(e), e.length === 0)
    return ".";
  let t = -1, r = e.length, n;
  for (; --r; )
    if (e.codePointAt(r) === 47) {
      if (n) {
        t = r;
        break;
      }
    } else
      n || (n = !0);
  return t < 0 ? e.codePointAt(0) === 47 ? "/" : "." : t === 1 && e.codePointAt(0) === 47 ? "//" : e.slice(0, t);
}
function HE(e) {
  An(e);
  let t = e.length, r = -1, n = 0, a = -1, i = 0, u;
  for (; t--; ) {
    const o = e.codePointAt(t);
    if (o === 47) {
      if (u) {
        n = t + 1;
        break;
      }
      continue;
    }
    r < 0 && (u = !0, r = t + 1), o === 46 ? a < 0 ? a = t : i !== 1 && (i = 1) : a > -1 && (i = -1);
  }
  return a < 0 || r < 0 || // We saw a non-dot character immediately before the dot.
  i === 0 || // The (right-most) trimmed path component is exactly `..`.
  i === 1 && a === r - 1 && a === n + 1 ? "" : e.slice(a, r);
}
function GE(...e) {
  let t = -1, r;
  for (; ++t < e.length; )
    An(e[t]), e[t] && (r = r === void 0 ? e[t] : r + "/" + e[t]);
  return r === void 0 ? "." : jE(r);
}
function jE(e) {
  An(e);
  const t = e.codePointAt(0) === 47;
  let r = qE(e, !t);
  return r.length === 0 && !t && (r = "."), r.length > 0 && e.codePointAt(e.length - 1) === 47 && (r += "/"), t ? "/" + r : r;
}
function qE(e, t) {
  let r = "", n = 0, a = -1, i = 0, u = -1, o, c;
  for (; ++u <= e.length; ) {
    if (u < e.length)
      o = e.codePointAt(u);
    else {
      if (o === 47)
        break;
      o = 47;
    }
    if (o === 47) {
      if (!(a === u - 1 || i === 1))
        if (a !== u - 1 && i === 2) {
          if (r.length < 2 || n !== 2 || r.codePointAt(r.length - 1) !== 46 || r.codePointAt(r.length - 2) !== 46) {
            if (r.length > 2) {
              if (c = r.lastIndexOf("/"), c !== r.length - 1) {
                c < 0 ? (r = "", n = 0) : (r = r.slice(0, c), n = r.length - 1 - r.lastIndexOf("/")), a = u, i = 0;
                continue;
              }
            } else if (r.length > 0) {
              r = "", n = 0, a = u, i = 0;
              continue;
            }
          }
          t && (r = r.length > 0 ? r + "/.." : "..", n = 2);
        } else
          r.length > 0 ? r += "/" + e.slice(a + 1, u) : r = e.slice(a + 1, u), n = u - a - 1;
      a = u, i = 0;
    } else
      o === 46 && i > -1 ? i++ : i = -1;
  }
  return r;
}
function An(e) {
  if (typeof e != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(e)
    );
}
const YE = { cwd: VE };
function VE() {
  return "/";
}
function vi(e) {
  return !!(e !== null && typeof e == "object" && "href" in e && e.href && "protocol" in e && e.protocol && // @ts-expect-error: indexing is fine.
  e.auth === void 0);
}
function $E(e) {
  if (typeof e == "string")
    e = new URL(e);
  else if (!vi(e)) {
    const t = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + e + "`"
    );
    throw t.code = "ERR_INVALID_ARG_TYPE", t;
  }
  if (e.protocol !== "file:") {
    const t = new TypeError("The URL must be of scheme file");
    throw t.code = "ERR_INVALID_URL_SCHEME", t;
  }
  return WE(e);
}
function WE(e) {
  if (e.hostname !== "") {
    const n = new TypeError(
      'File URL host must be "localhost" or empty on darwin'
    );
    throw n.code = "ERR_INVALID_FILE_URL_HOST", n;
  }
  const t = e.pathname;
  let r = -1;
  for (; ++r < t.length; )
    if (t.codePointAt(r) === 37 && t.codePointAt(r + 1) === 50) {
      const n = t.codePointAt(r + 2);
      if (n === 70 || n === 102) {
        const a = new TypeError(
          "File URL path must not include encoded / characters"
        );
        throw a.code = "ERR_INVALID_FILE_URL_PATH", a;
      }
    }
  return decodeURIComponent(t);
}
const Ya = (
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
class Ri {
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
  constructor(t) {
    let r;
    t ? vi(t) ? r = { path: t } : typeof t == "string" || QE(t) ? r = { value: t } : r = t : r = {}, this.cwd = YE.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let n = -1;
    for (; ++n < Ya.length; ) {
      const i = Ya[n];
      i in r && r[i] !== void 0 && r[i] !== null && (this[i] = i === "history" ? [...r[i]] : r[i]);
    }
    let a;
    for (a in r)
      Ya.includes(a) || (this[a] = r[a]);
  }
  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   *
   * @returns {string | undefined}
   *   Basename.
   */
  get basename() {
    return typeof this.path == "string" ? pt.basename(this.path) : void 0;
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
  set basename(t) {
    $a(t, "basename"), Va(t, "basename"), this.path = pt.join(this.dirname || "", t);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path == "string" ? pt.dirname(this.path) : void 0;
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
  set dirname(t) {
    hs(this.basename, "dirname"), this.path = pt.join(t || "", this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path == "string" ? pt.extname(this.path) : void 0;
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
  set extname(t) {
    if (Va(t, "extname"), hs(this.dirname, "extname"), t) {
      if (t.codePointAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (t.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = pt.join(this.dirname, this.stem + (t || ""));
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
  set path(t) {
    vi(t) && (t = $E(t)), $a(t, "path"), this.path !== t && this.history.push(t);
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path == "string" ? pt.basename(this.path, this.extname) : void 0;
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
  set stem(t) {
    $a(t, "stem"), Va(t, "stem"), this.path = pt.join(this.dirname || "", t + (this.extname || ""));
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
  fail(t, r, n) {
    const a = this.message(t, r, n);
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
  info(t, r, n) {
    const a = this.message(t, r, n);
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
  message(t, r, n) {
    const a = new $e(
      // @ts-expect-error: the overloads are fine.
      t,
      r,
      n
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
  toString(t) {
    return this.value === void 0 ? "" : typeof this.value == "string" ? this.value : new TextDecoder(t || void 0).decode(this.value);
  }
}
function Va(e, t) {
  if (e && e.includes(pt.sep))
    throw new Error(
      "`" + t + "` cannot be a path: did not expect `" + pt.sep + "`"
    );
}
function $a(e, t) {
  if (!e)
    throw new Error("`" + t + "` cannot be empty");
}
function hs(e, t) {
  if (!e)
    throw new Error("Setting `" + t + "` requires `path` to be set too");
}
function QE(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const XE = {
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
}, zE = "https://html.spec.whatwg.org/multipage/parsing.html#parse-error-", KE = /-[a-z]/g, ZE = /%c(?:([-+])(\d+))?/g, JE = /%x/g, eT = { 2: !0, 1: !1, 0: null }, tT = {};
function rT(e, t) {
  const r = t || tT, n = r.onerror, a = e instanceof Ri ? e : new Ri(e), i = r.fragment ? rn.parseFragment : rn.parse, u = String(a), o = i(u, {
    sourceCodeLocationInfo: !0,
    // Note `parse5` types currently do not allow `undefined`.
    onParseError: r.onerror ? c : null,
    scriptingEnabled: !1
  });
  return (
    /** @type {Root} */
    wE(o, {
      file: a,
      space: r.space,
      verbose: r.verbose
    })
  );
  function c(h) {
    const s = h.code, g = nT(s), p = r[g], m = p ?? !0, b = typeof m == "number" ? m : m ? 1 : 0;
    if (b) {
      const C = XE[g], D = new $e(R(C.reason), {
        place: {
          start: {
            line: h.startLine,
            column: h.startCol,
            offset: h.startOffset
          },
          end: {
            line: h.endLine,
            column: h.endCol,
            offset: h.endOffset
          }
        },
        ruleId: s,
        source: "hast-util-from-html"
      });
      a.path && (D.file = a.path, D.name = a.path + ":" + D.name), D.fatal = eT[b], D.note = R(C.description), D.url = C.url === !1 ? void 0 : zE + s, n(D);
    }
    function R(C) {
      return C.replace(ZE, D).replace(JE, S);
      function D(B, P, L) {
        const H = (L ? Number.parseInt(L, 10) : 0) * (P === "-" ? -1 : 1), $ = u.charAt(h.startOffset + H);
        return iT($);
      }
      function S() {
        return uT(u.charCodeAt(h.startOffset));
      }
    }
  }
}
function nT(e) {
  return (
    /** @type {ErrorCode} */
    e.replace(KE, aT)
  );
}
function aT(e) {
  return e.charAt(1).toUpperCase();
}
function iT(e) {
  return e === "`" ? "` ` `" : e;
}
function uT(e) {
  return "0x" + e.toString(16).toUpperCase();
}
function sT(e) {
  const t = this, { emitParseErrors: r, ...n } = { ...t.data("settings"), ...e };
  t.parser = a;
  function a(i, u) {
    return rT(i, {
      ...n,
      onerror: r ? function(o) {
        u.path && (o.name = u.path + ":" + o.name, o.file = u.path), u.messages.push(o);
      } : void 0
    });
  }
}
const oT = [
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
], ps = {}.hasOwnProperty;
function tl(e, t) {
  const r = t || {};
  function n(a, ...i) {
    let u = n.invalid;
    const o = n.handlers;
    if (a && ps.call(a, e)) {
      const c = String(a[e]);
      u = ps.call(o, c) ? o[c] : n.unknown;
    }
    if (u)
      return u.call(this, a, ...i);
  }
  return n.handlers = r.handlers || {}, n.invalid = r.invalid, n.unknown = r.unknown, n;
}
function cT(e, t) {
  if (e = e.replace(
    t.subset ? lT(t.subset) : /["&'<>`]/g,
    n
  ), t.subset || t.escapeOnly)
    return e;
  return e.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, r).replace(
    // eslint-disable-next-line no-control-regex, unicorn/no-hex-escape
    /[\x01-\t\v\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g,
    n
  );
  function r(a, i, u) {
    return t.format(
      (a.charCodeAt(0) - 55296) * 1024 + a.charCodeAt(1) - 56320 + 65536,
      u.charCodeAt(i + 2),
      t
    );
  }
  function n(a, i, u) {
    return t.format(
      a.charCodeAt(0),
      u.charCodeAt(i + 1),
      t
    );
  }
}
function lT(e) {
  const t = [];
  let r = -1;
  for (; ++r < e.length; )
    t.push(e[r].replace(/[|\\{}()[\]^$+*?.]/g, "\\$&"));
  return new RegExp("(?:" + t.join("|") + ")", "g");
}
function fT(e, t, r) {
  const n = "&#x" + e.toString(16).toUpperCase();
  return r && t && !/[\dA-Fa-f]/.test(String.fromCharCode(t)) ? n : n + ";";
}
function dT(e, t, r) {
  const n = "&#" + String(e);
  return r && t && !/\d/.test(String.fromCharCode(t)) ? n : n + ";";
}
const hT = [
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
], Wa = {
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
}, pT = [
  "cent",
  "copy",
  "divide",
  "gt",
  "lt",
  "not",
  "para",
  "times"
], rl = {}.hasOwnProperty, Pi = {};
let Rn;
for (Rn in Wa)
  rl.call(Wa, Rn) && (Pi[Wa[Rn]] = Rn);
function mT(e, t, r, n) {
  const a = String.fromCharCode(e);
  if (rl.call(Pi, a)) {
    const i = Pi[a], u = "&" + i;
    return r && hT.includes(i) && !pT.includes(i) && (!n || t && t !== 61 && /[^\da-z]/i.test(String.fromCharCode(t))) ? u : u + ";";
  }
  return "";
}
function ET(e, t, r) {
  let n = fT(e, t, r.omitOptionalSemicolons), a;
  if ((r.useNamedReferences || r.useShortestReferences) && (a = mT(
    e,
    t,
    r.omitOptionalSemicolons,
    r.attribute
  )), (r.useShortestReferences || !a) && r.useShortestReferences) {
    const i = dT(e, t, r.omitOptionalSemicolons);
    i.length < n.length && (n = i);
  }
  return a && (!r.useShortestReferences || a.length < n.length) ? a : n;
}
function gr(e, t) {
  return cT(e, Object.assign({ format: ET }, t));
}
function TT(e, t, r, n) {
  return n.settings.bogusComments ? "<?" + gr(
    e.value,
    Object.assign({}, n.settings.characterReferences, { subset: [">"] })
  ) + ">" : "<!--" + e.value.replace(/^>|^->|<!--|-->|--!>|<!-$/g, a) + "-->";
  function a(i) {
    return gr(
      i,
      Object.assign({}, n.settings.characterReferences, {
        subset: ["<", ">"]
      })
    );
  }
}
function gT(e, t, r, n) {
  return "<!" + (n.settings.upperDoctype ? "DOCTYPE" : "doctype") + (n.settings.tightDoctype ? "" : " ") + "html>";
}
function ms(e, t) {
  const r = String(e);
  if (typeof t != "string")
    throw new TypeError("Expected character");
  let n = 0, a = r.indexOf(t);
  for (; a !== -1; )
    n++, a = r.indexOf(t, a + t.length);
  return n;
}
const _T = /[ \t\n\f\r]/g;
function ya(e) {
  return typeof e == "object" ? e.type === "text" ? Es(e.value) : !1 : Es(e);
}
function Es(e) {
  return e.replace(_T, "") === "";
}
const Me = al(1), nl = al(-1), bT = [];
function al(e) {
  return t;
  function t(r, n, a) {
    const i = r ? r.children : bT;
    let u = (n || 0) + e, o = i[u];
    if (!a)
      for (; o && ya(o); )
        u += e, o = i[u];
    return o;
  }
}
const AT = {}.hasOwnProperty;
function il(e) {
  return t;
  function t(r, n, a) {
    return AT.call(e, r.tagName) && e[r.tagName](r, n, a);
  }
}
const hu = il({
  body: yT,
  caption: Qa,
  colgroup: Qa,
  dd: ST,
  dt: DT,
  head: Qa,
  html: IT,
  li: NT,
  optgroup: OT,
  option: vT,
  p: CT,
  rp: Ts,
  rt: Ts,
  tbody: PT,
  td: gs,
  tfoot: LT,
  th: gs,
  thead: RT,
  tr: xT
});
function Qa(e, t, r) {
  const n = Me(r, t, !0);
  return !n || n.type !== "comment" && !(n.type === "text" && ya(n.value.charAt(0)));
}
function IT(e, t, r) {
  const n = Me(r, t);
  return !n || n.type !== "comment";
}
function yT(e, t, r) {
  const n = Me(r, t);
  return !n || n.type !== "comment";
}
function CT(e, t, r) {
  const n = Me(r, t);
  return n ? n.type === "element" && (n.tagName === "address" || n.tagName === "article" || n.tagName === "aside" || n.tagName === "blockquote" || n.tagName === "details" || n.tagName === "div" || n.tagName === "dl" || n.tagName === "fieldset" || n.tagName === "figcaption" || n.tagName === "figure" || n.tagName === "footer" || n.tagName === "form" || n.tagName === "h1" || n.tagName === "h2" || n.tagName === "h3" || n.tagName === "h4" || n.tagName === "h5" || n.tagName === "h6" || n.tagName === "header" || n.tagName === "hgroup" || n.tagName === "hr" || n.tagName === "main" || n.tagName === "menu" || n.tagName === "nav" || n.tagName === "ol" || n.tagName === "p" || n.tagName === "pre" || n.tagName === "section" || n.tagName === "table" || n.tagName === "ul") : !r || // Confusing parent.
  !(r.type === "element" && (r.tagName === "a" || r.tagName === "audio" || r.tagName === "del" || r.tagName === "ins" || r.tagName === "map" || r.tagName === "noscript" || r.tagName === "video"));
}
function NT(e, t, r) {
  const n = Me(r, t);
  return !n || n.type === "element" && n.tagName === "li";
}
function DT(e, t, r) {
  const n = Me(r, t);
  return !!(n && n.type === "element" && (n.tagName === "dt" || n.tagName === "dd"));
}
function ST(e, t, r) {
  const n = Me(r, t);
  return !n || n.type === "element" && (n.tagName === "dt" || n.tagName === "dd");
}
function Ts(e, t, r) {
  const n = Me(r, t);
  return !n || n.type === "element" && (n.tagName === "rp" || n.tagName === "rt");
}
function OT(e, t, r) {
  const n = Me(r, t);
  return !n || n.type === "element" && n.tagName === "optgroup";
}
function vT(e, t, r) {
  const n = Me(r, t);
  return !n || n.type === "element" && (n.tagName === "option" || n.tagName === "optgroup");
}
function RT(e, t, r) {
  const n = Me(r, t);
  return !!(n && n.type === "element" && (n.tagName === "tbody" || n.tagName === "tfoot"));
}
function PT(e, t, r) {
  const n = Me(r, t);
  return !n || n.type === "element" && (n.tagName === "tbody" || n.tagName === "tfoot");
}
function LT(e, t, r) {
  return !Me(r, t);
}
function xT(e, t, r) {
  const n = Me(r, t);
  return !n || n.type === "element" && n.tagName === "tr";
}
function gs(e, t, r) {
  const n = Me(r, t);
  return !n || n.type === "element" && (n.tagName === "td" || n.tagName === "th");
}
const wT = il({
  body: kT,
  colgroup: FT,
  head: BT,
  html: MT,
  tbody: UT
});
function MT(e) {
  const t = Me(e, -1);
  return !t || t.type !== "comment";
}
function BT(e) {
  const t = e.children, r = [];
  let n = -1;
  for (; ++n < t.length; ) {
    const a = t[n];
    if (a.type === "element" && (a.tagName === "title" || a.tagName === "base")) {
      if (r.includes(a.tagName))
        return !1;
      r.push(a.tagName);
    }
  }
  return t.length > 0;
}
function kT(e) {
  const t = Me(e, -1, !0);
  return !t || t.type !== "comment" && !(t.type === "text" && ya(t.value.charAt(0))) && !(t.type === "element" && (t.tagName === "meta" || t.tagName === "link" || t.tagName === "script" || t.tagName === "style" || t.tagName === "template"));
}
function FT(e, t, r) {
  const n = nl(r, t), a = Me(e, -1, !0);
  return r && n && n.type === "element" && n.tagName === "colgroup" && hu(n, r.children.indexOf(n), r) ? !1 : !!(a && a.type === "element" && a.tagName === "col");
}
function UT(e, t, r) {
  const n = nl(r, t), a = Me(e, -1);
  return r && n && n.type === "element" && (n.tagName === "thead" || n.tagName === "tbody") && hu(n, r.children.indexOf(n), r) ? !1 : !!(a && a.type === "element" && a.tagName === "tr");
}
const Pn = {
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
function HT(e, t, r, n) {
  const a = n.schema, i = a.space === "svg" ? !1 : n.settings.omitOptionalTags;
  let u = a.space === "svg" ? n.settings.closeEmptyElements : n.settings.voids.includes(e.tagName.toLowerCase());
  const o = [];
  let c;
  a.space === "html" && e.tagName === "svg" && (n.schema = rr);
  const h = GT(n, e.properties), s = n.all(
    a.space === "html" && e.tagName === "template" ? e.content : e
  );
  return n.schema = a, s && (u = !1), (h || !i || !wT(e, t, r)) && (o.push("<", e.tagName, h ? " " + h : ""), u && (a.space === "svg" || n.settings.closeSelfClosing) && (c = h.charAt(h.length - 1), (!n.settings.tightSelfClosing || c === "/" || c && c !== '"' && c !== "'") && o.push(" "), o.push("/")), o.push(">")), o.push(s), !u && (!i || !hu(e, t, r)) && o.push("</" + e.tagName + ">"), o.join("");
}
function GT(e, t) {
  const r = [];
  let n = -1, a;
  if (t) {
    for (a in t)
      if (t[a] !== null && t[a] !== void 0) {
        const i = jT(e, a, t[a]);
        i && r.push(i);
      }
  }
  for (; ++n < r.length; ) {
    const i = e.settings.tightAttributes ? r[n].charAt(r[n].length - 1) : void 0;
    n !== r.length - 1 && i !== '"' && i !== "'" && (r[n] += " ");
  }
  return r.join("");
}
function jT(e, t, r) {
  const n = Ia(e.schema, t), a = e.settings.allowParseErrors && e.schema.space === "html" ? 0 : 1, i = e.settings.allowDangerousCharacters ? 0 : 1;
  let u = e.quote, o;
  if (n.overloadedBoolean && (r === n.attribute || r === "") ? r = !0 : (n.boolean || n.overloadedBoolean && typeof r != "string") && (r = !!r), r == null || r === !1 || typeof r == "number" && Number.isNaN(r))
    return "";
  const c = gr(
    n.attribute,
    Object.assign({}, e.settings.characterReferences, {
      // Always encode without parse errors in non-HTML.
      subset: Pn.name[a][i]
    })
  );
  return r === !0 || (r = Array.isArray(r) ? (n.commaSeparated ? zc : Kc)(r, {
    padLeft: !e.settings.tightCommaSeparatedLists
  }) : String(r), e.settings.collapseEmptyAttributes && !r) ? c : (e.settings.preferUnquoted && (o = gr(
    r,
    Object.assign({}, e.settings.characterReferences, {
      attribute: !0,
      subset: Pn.unquoted[a][i]
    })
  )), o !== r && (e.settings.quoteSmart && ms(r, u) > ms(r, e.alternative) && (u = e.alternative), o = u + gr(
    r,
    Object.assign({}, e.settings.characterReferences, {
      // Always encode without parse errors in non-HTML.
      subset: (u === "'" ? Pn.single : Pn.double)[a][i],
      attribute: !0
    })
  ) + u), c + (o && "=" + o));
}
function ul(e, t, r, n) {
  return r && r.type === "element" && (r.tagName === "script" || r.tagName === "style") ? e.value : gr(
    e.value,
    Object.assign({}, n.settings.characterReferences, {
      subset: ["<", "&"]
    })
  );
}
function qT(e, t, r, n) {
  return n.settings.allowDangerousHtml ? e.value : ul(e, t, r, n);
}
function YT(e, t, r, n) {
  return n.all(e);
}
const VT = tl("type", {
  invalid: $T,
  unknown: WT,
  handlers: { comment: TT, doctype: gT, element: HT, raw: qT, root: YT, text: ul }
});
function $T(e) {
  throw new Error("Expected node, not `" + e + "`");
}
function WT(e) {
  const t = (
    /** @type {Nodes} */
    e
  );
  throw new Error("Cannot compile unknown node `" + t.type + "`");
}
const QT = {}, XT = {}, zT = [];
function KT(e, t) {
  const r = t || QT, n = r.quote || '"', a = n === '"' ? "'" : '"';
  if (n !== '"' && n !== "'")
    throw new Error("Invalid quote `" + n + "`, expected `'` or `\"`");
  return {
    one: ZT,
    all: JT,
    settings: {
      omitOptionalTags: r.omitOptionalTags || !1,
      allowParseErrors: r.allowParseErrors || !1,
      allowDangerousCharacters: r.allowDangerousCharacters || !1,
      quoteSmart: r.quoteSmart || !1,
      preferUnquoted: r.preferUnquoted || !1,
      tightAttributes: r.tightAttributes || !1,
      upperDoctype: r.upperDoctype || !1,
      tightDoctype: r.tightDoctype || !1,
      bogusComments: r.bogusComments || !1,
      tightCommaSeparatedLists: r.tightCommaSeparatedLists || !1,
      tightSelfClosing: r.tightSelfClosing || !1,
      collapseEmptyAttributes: r.collapseEmptyAttributes || !1,
      allowDangerousHtml: r.allowDangerousHtml || !1,
      voids: r.voids || oT,
      characterReferences: r.characterReferences || XT,
      closeSelfClosing: r.closeSelfClosing || !1,
      closeEmptyElements: r.closeEmptyElements || !1
    },
    schema: r.space === "svg" ? rr : bn,
    quote: n,
    alternative: a
  }.one(
    Array.isArray(e) ? { type: "root", children: e } : e,
    void 0,
    void 0
  );
}
function ZT(e, t, r) {
  return VT(e, t, r, this);
}
function JT(e) {
  const t = [], r = e && e.children || zT;
  let n = -1;
  for (; ++n < r.length; )
    t[n] = this.one(r[n], n, e);
  return t.join("");
}
function sl(e) {
  const t = this, r = { ...t.data("settings"), ...e };
  t.compiler = n;
  function n(a) {
    return KT(a, r);
  }
}
function _s(e) {
  if (e)
    throw e;
}
var Fn = Object.prototype.hasOwnProperty, ol = Object.prototype.toString, bs = Object.defineProperty, As = Object.getOwnPropertyDescriptor, Is = function(t) {
  return typeof Array.isArray == "function" ? Array.isArray(t) : ol.call(t) === "[object Array]";
}, ys = function(t) {
  if (!t || ol.call(t) !== "[object Object]")
    return !1;
  var r = Fn.call(t, "constructor"), n = t.constructor && t.constructor.prototype && Fn.call(t.constructor.prototype, "isPrototypeOf");
  if (t.constructor && !r && !n)
    return !1;
  var a;
  for (a in t)
    ;
  return typeof a > "u" || Fn.call(t, a);
}, Cs = function(t, r) {
  bs && r.name === "__proto__" ? bs(t, r.name, {
    enumerable: !0,
    configurable: !0,
    value: r.newValue,
    writable: !0
  }) : t[r.name] = r.newValue;
}, Ns = function(t, r) {
  if (r === "__proto__")
    if (Fn.call(t, r)) {
      if (As)
        return As(t, r).value;
    } else
      return;
  return t[r];
}, eg = function e() {
  var t, r, n, a, i, u, o = arguments[0], c = 1, h = arguments.length, s = !1;
  for (typeof o == "boolean" && (s = o, o = arguments[1] || {}, c = 2), (o == null || typeof o != "object" && typeof o != "function") && (o = {}); c < h; ++c)
    if (t = arguments[c], t != null)
      for (r in t)
        n = Ns(o, r), a = Ns(t, r), o !== a && (s && a && (ys(a) || (i = Is(a))) ? (i ? (i = !1, u = n && Is(n) ? n : []) : u = n && ys(n) ? n : {}, Cs(o, { name: r, newValue: e(s, u, a) })) : typeof a < "u" && Cs(o, { name: r, newValue: a }));
  return o;
};
const Xa = /* @__PURE__ */ Ui(eg);
function Li(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function tg() {
  const e = [], t = { run: r, use: n };
  return t;
  function r(...a) {
    let i = -1;
    const u = a.pop();
    if (typeof u != "function")
      throw new TypeError("Expected function as last argument, not " + u);
    o(null, ...a);
    function o(c, ...h) {
      const s = e[++i];
      let g = -1;
      if (c) {
        u(c);
        return;
      }
      for (; ++g < a.length; )
        (h[g] === null || h[g] === void 0) && (h[g] = a[g]);
      a = h, s ? rg(s, o)(...h) : u(null, ...h);
    }
  }
  function n(a) {
    if (typeof a != "function")
      throw new TypeError(
        "Expected `middelware` to be a function, not " + a
      );
    return e.push(a), t;
  }
}
function rg(e, t) {
  let r;
  return n;
  function n(...u) {
    const o = e.length > u.length;
    let c;
    o && u.push(a);
    try {
      c = e.apply(this, u);
    } catch (h) {
      const s = (
        /** @type {Error} */
        h
      );
      if (o && r)
        throw s;
      return a(s);
    }
    o || (c instanceof Promise ? c.then(i, a) : c instanceof Error ? a(c) : i(c));
  }
  function a(u, ...o) {
    r || (r = !0, t(u, ...o));
  }
  function i(u) {
    a(null, u);
  }
}
const ng = (
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
    const n = (
      /** @type {Record<string | symbol, Function>} */
      // Prototypes do exist.
      // type-coverage:ignore-next-line
      this.constructor.prototype
    ), a = n[e], i = function() {
      return a.apply(i, arguments);
    };
    Object.setPrototypeOf(i, n);
    const u = Object.getOwnPropertyNames(a);
    for (const o of u) {
      const c = Object.getOwnPropertyDescriptor(a, o);
      c && Object.defineProperty(i, o, c);
    }
    return i;
  }
), ag = {}.hasOwnProperty;
class pu extends ng {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = tg();
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
    const t = (
      /** @type {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>} */
      new pu()
    );
    let r = -1;
    for (; ++r < this.attachers.length; ) {
      const n = this.attachers[r];
      t.use(...n);
    }
    return t.data(Xa(!0, {}, this.namespace)), t;
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
  data(t, r) {
    return typeof t == "string" ? arguments.length === 2 ? (Za("data", this.frozen), this.namespace[t] = r, this) : ag.call(this.namespace, t) && this.namespace[t] || void 0 : t ? (Za("data", this.frozen), this.namespace = t, this) : this.namespace;
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
    const t = (
      /** @type {Processor} */
      /** @type {unknown} */
      this
    );
    for (; ++this.freezeIndex < this.attachers.length; ) {
      const [r, ...n] = this.attachers[this.freezeIndex];
      if (n[0] === !1)
        continue;
      n[0] === !0 && (n[0] = void 0);
      const a = r.call(t, ...n);
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
  parse(t) {
    this.freeze();
    const r = Ln(t), n = this.parser || this.Parser;
    return za("parse", n), n(String(r), r);
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
  process(t, r) {
    const n = this;
    return this.freeze(), za("process", this.parser || this.Parser), Ka("process", this.compiler || this.Compiler), r ? a(void 0, r) : new Promise(a);
    function a(i, u) {
      const o = Ln(t), c = (
        /** @type {HeadTree extends undefined ? Node : HeadTree} */
        /** @type {unknown} */
        n.parse(o)
      );
      n.run(c, o, function(s, g, p) {
        if (s || !g || !p)
          return h(s);
        const m = (
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          g
        ), b = n.stringify(m, p);
        sg(b) ? p.value = b : p.result = b, h(
          s,
          /** @type {VFileWithOutput<CompileResult>} */
          p
        );
      });
      function h(s, g) {
        s || !g ? u(s) : i ? i(g) : r(void 0, g);
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
  processSync(t) {
    let r = !1, n;
    return this.freeze(), za("processSync", this.parser || this.Parser), Ka("processSync", this.compiler || this.Compiler), this.process(t, a), Ss("processSync", "process", r), n;
    function a(i, u) {
      r = !0, _s(i), n = u;
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
  run(t, r, n) {
    Ds(t), this.freeze();
    const a = this.transformers;
    return !n && typeof r == "function" && (n = r, r = void 0), n ? i(void 0, n) : new Promise(i);
    function i(u, o) {
      const c = Ln(r);
      a.run(t, c, h);
      function h(s, g, p) {
        const m = (
          /** @type {TailTree extends undefined ? Node : TailTree} */
          g || t
        );
        s ? o(s) : u ? u(m) : n(void 0, m, p);
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
  runSync(t, r) {
    let n = !1, a;
    return this.run(t, r, i), Ss("runSync", "run", n), a;
    function i(u, o) {
      _s(u), a = o, n = !0;
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
  stringify(t, r) {
    this.freeze();
    const n = Ln(r), a = this.compiler || this.Compiler;
    return Ka("stringify", a), Ds(t), a(t, n);
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
  use(t, ...r) {
    const n = this.attachers, a = this.namespace;
    if (Za("use", this.frozen), t != null)
      if (typeof t == "function")
        c(t, r);
      else if (typeof t == "object")
        Array.isArray(t) ? o(t) : u(t);
      else
        throw new TypeError("Expected usable value, not `" + t + "`");
    return this;
    function i(h) {
      if (typeof h == "function")
        c(h, []);
      else if (typeof h == "object")
        if (Array.isArray(h)) {
          const [s, ...g] = (
            /** @type {PluginTuple<Array<unknown>>} */
            h
          );
          c(s, g);
        } else
          u(h);
      else
        throw new TypeError("Expected usable value, not `" + h + "`");
    }
    function u(h) {
      if (!("plugins" in h) && !("settings" in h))
        throw new Error(
          "Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither"
        );
      o(h.plugins), h.settings && (a.settings = Xa(!0, a.settings, h.settings));
    }
    function o(h) {
      let s = -1;
      if (h != null)
        if (Array.isArray(h))
          for (; ++s < h.length; ) {
            const g = h[s];
            i(g);
          }
        else
          throw new TypeError("Expected a list of plugins, not `" + h + "`");
    }
    function c(h, s) {
      let g = -1, p = -1;
      for (; ++g < n.length; )
        if (n[g][0] === h) {
          p = g;
          break;
        }
      if (p === -1)
        n.push([h, ...s]);
      else if (s.length > 0) {
        let [m, ...b] = s;
        const R = n[p][1];
        Li(R) && Li(m) && (m = Xa(!0, R, m)), n[p] = [h, m, ...b];
      }
    }
  }
}
const ig = new pu().freeze();
function za(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `parser`");
}
function Ka(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `compiler`");
}
function Za(e, t) {
  if (t)
    throw new Error(
      "Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function Ds(e) {
  if (!Li(e) || typeof e.type != "string")
    throw new TypeError("Expected node, got `" + e + "`");
}
function Ss(e, t, r) {
  if (!r)
    throw new Error(
      "`" + e + "` finished async. Use `" + t + "` instead"
    );
}
function Ln(e) {
  return ug(e) ? e : new Ri(e);
}
function ug(e) {
  return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function sg(e) {
  return typeof e == "string" || og(e);
}
function og(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const cg = ig().use(sT).use(sl).freeze(), cl = (
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
      return hg;
    if (typeof e == "function")
      return Ca(e);
    if (typeof e == "object")
      return Array.isArray(e) ? lg(e) : fg(e);
    if (typeof e == "string")
      return dg(e);
    throw new Error("Expected function, string, or object as test");
  }
);
function lg(e) {
  const t = [];
  let r = -1;
  for (; ++r < e.length; )
    t[r] = cl(e[r]);
  return Ca(n);
  function n(...a) {
    let i = -1;
    for (; ++i < t.length; )
      if (t[i].apply(this, a))
        return !0;
    return !1;
  }
}
function fg(e) {
  const t = (
    /** @type {Record<string, unknown>} */
    e
  );
  return Ca(r);
  function r(n) {
    const a = (
      /** @type {Record<string, unknown>} */
      /** @type {unknown} */
      n
    );
    let i;
    for (i in e)
      if (a[i] !== t[i])
        return !1;
    return !0;
  }
}
function dg(e) {
  return Ca(t);
  function t(r) {
    return r && r.type === e;
  }
}
function Ca(e) {
  return t;
  function t(r, n, a) {
    return !!(pg(r) && e.call(
      this,
      r,
      typeof n == "number" ? n : void 0,
      a || void 0
    ));
  }
}
function hg() {
  return !0;
}
function pg(e) {
  return e !== null && typeof e == "object" && "type" in e;
}
const ll = [], mg = !0, xi = !1, fl = "skip";
function Eg(e, t, r, n) {
  let a;
  typeof t == "function" && typeof r != "function" ? (n = r, r = t) : a = t;
  const i = cl(a), u = n ? -1 : 1;
  o(e, void 0, [])();
  function o(c, h, s) {
    const g = (
      /** @type {Record<string, unknown>} */
      c && typeof c == "object" ? c : {}
    );
    if (typeof g.type == "string") {
      const m = (
        // `hast`
        typeof g.tagName == "string" ? g.tagName : (
          // `xast`
          typeof g.name == "string" ? g.name : void 0
        )
      );
      Object.defineProperty(p, "name", {
        value: "node (" + (c.type + (m ? "<" + m + ">" : "")) + ")"
      });
    }
    return p;
    function p() {
      let m = ll, b, R, C;
      if ((!t || i(c, h, s[s.length - 1] || void 0)) && (m = Tg(r(c, s)), m[0] === xi))
        return m;
      if ("children" in c && c.children) {
        const D = (
          /** @type {UnistParent} */
          c
        );
        if (D.children && m[0] !== fl)
          for (R = (n ? D.children.length : -1) + u, C = s.concat(D); R > -1 && R < D.children.length; ) {
            const S = D.children[R];
            if (b = o(S, R, C)(), b[0] === xi)
              return b;
            R = typeof b[1] == "number" ? b[1] : R + u;
          }
      }
      return m;
    }
  }
}
function Tg(e) {
  return Array.isArray(e) ? e : typeof e == "number" ? [mg, e] : e == null ? ll : [e];
}
function wi(e, t, r, n) {
  let a, i, u;
  typeof t == "function" && typeof r != "function" ? (i = void 0, u = t, a = r) : (i = t, u = r, a = n), Eg(e, i, o, a);
  function o(c, h) {
    const s = h[h.length - 1], g = s ? s.children.indexOf(c) : void 0;
    return u(c, g, s);
  }
}
var Un = {}, Mi = {};
function gg(e, t) {
  for (var r = t, n = 0; n < e.length; n++) {
    var a = n === e.length - 1, i = e.charAt(n), u = r[i] || (r[i] = { chars: {} });
    a && (u.self = e), r = u.chars;
  }
}
function Os(e) {
  if (e.length === 0)
    return Un;
  for (var t = {}, r = 0, n = e; r < n.length; r++) {
    var a = n[r];
    gg(a, t);
  }
  return t;
}
function _g(e) {
  if (e.length === 0)
    return Mi;
  for (var t = {}, r = 0, n = e; r < n.length; r++) {
    var a = n[r];
    t[a] = !0;
  }
  return t;
}
var xn = {}, vs = {
  type: "String",
  optional: !0
};
function bg(e) {
  var t = {
    type: "NoArgument",
    optional: !1
  };
  function r(u) {
    if (t.type && t.type !== u && t.type !== "NoArgument")
      throw new Error('Conflicting pseudo-class argument type: "'.concat(t.type, '" vs "').concat(u, '".'));
    t.type = u;
  }
  for (var n = 0, a = e; n < a.length; n++) {
    var i = a[n];
    i === "NoArgument" && (t.optional = !0), i === "Formula" && r("Formula"), i === "FormulaOfSelector" && (r("Formula"), t.ofSelector = !0), i === "String" && r("String"), i === "Selector" && r("Selector");
  }
  return t;
}
function Ag(e) {
  for (var t = {}, r = 0, n = Object.keys(e); r < n.length; r++) {
    var a = n[r], i = e[a];
    if (i)
      for (var u = 0, o = i; u < o.length; u++) {
        var c = o[u];
        (t[c] || (t[c] = [])).push(a);
      }
  }
  return t;
}
function Rs(e) {
  for (var t = Ag(e), r = {}, n = 0, a = Object.keys(t); n < a.length; n++) {
    var i = a[n], u = t[i];
    u && (r[i] = bg(u));
  }
  return r;
}
var zn = function() {
  return zn = Object.assign || function(e) {
    for (var t, r = 1, n = arguments.length; r < n; r++) {
      t = arguments[r];
      for (var a in t)
        Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
    }
    return e;
  }, zn.apply(this, arguments);
}, Ig = {}, Bi = { wildcard: !0 };
function yg(e) {
  return e ? typeof e == "boolean" ? Bi : e : Ig;
}
function Cg(e, t) {
  return function(r, n) {
    return t(e(r), e(n));
  };
}
function Ng(e) {
  return function(t, r) {
    var n = e(t, r);
    if (!n)
      throw new Error("Syntax definition cannot be null or undefined.");
    return n;
  };
}
function Ps(e, t) {
  return function(r, n) {
    return n === !0 ? e : t(r === !0 ? e : r, n);
  };
}
function sr(e) {
  return function(t, r) {
    if (!r || !t)
      return r;
    if (typeof r != "object" || r === null)
      throw new Error("Unexpected syntax definition extension type: ".concat(r, "."));
    for (var n = zn({}, t), a = 0, i = Object.entries(r); a < i.length; a++) {
      var u = i[a], o = u[0], c = u[1], h = e[o];
      n[o] = h(t[o], c);
    }
    return n;
  };
}
function Dt(e, t) {
  return t !== void 0 ? t : e;
}
function Ja(e, t) {
  return t ? e ? e.concat(t) : t : e;
}
function Ls(e, t) {
  if (!t)
    return e;
  if (!e)
    return t;
  for (var r = zn({}, e), n = 0, a = Object.entries(t); n < a.length; n++) {
    var i = a[n], u = i[0], o = i[1];
    if (!o) {
      delete r[u];
      continue;
    }
    var c = e[u];
    if (!c) {
      r[u] = o;
      continue;
    }
    r[u] = c.concat(o);
  }
  return r;
}
var In = Ng(sr({
  baseSyntax: Dt,
  tag: Ps(Bi, sr({
    wildcard: Dt
  })),
  ids: Dt,
  classNames: Dt,
  namespace: Ps(Bi, sr({
    wildcard: Dt
  })),
  combinators: Ja,
  attributes: sr({
    operators: Ja,
    caseSensitivityModifiers: Ja,
    unknownCaseSensitivityModifiers: Dt
  }),
  pseudoClasses: sr({
    unknown: Dt,
    definitions: Ls
  }),
  pseudoElements: sr({
    unknown: Dt,
    notation: Dt,
    definitions: Cg(function(e) {
      return Array.isArray(e) ? { NoArgument: e } : e;
    }, Ls)
  })
})), dl = {
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
}, hl = In(dl, {
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
}), ki = In(hl, {
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
}), Fi = In(ki, {
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
}), Dg = In(Fi, {
  pseudoElements: {
    unknown: "accept"
  },
  pseudoClasses: {
    unknown: "accept"
  },
  attributes: {
    unknownCaseSensitivityModifiers: "accept"
  }
}), xs = {
  css1: dl,
  css2: hl,
  css3: ki,
  "selectors-3": ki,
  "selectors-4": Fi,
  latest: Fi,
  progressive: Dg
};
function qr(e) {
  return e >= "a" && e <= "z" || e >= "A" && e <= "Z" || e === "-" || e === "_" || e === "\\" || e >= " ";
}
function Sg(e) {
  return e >= "a" && e <= "z" || e >= "A" && e <= "Z" || e >= "0" && e <= "9" || e === "-" || e === "_" || e >= " ";
}
function Yr(e) {
  return e >= "a" && e <= "f" || e >= "A" && e <= "F" || e >= "0" && e <= "9";
}
var Og = {
  " ": !0,
  "	": !0,
  "\n": !0,
  "\r": !0,
  "\f": !0
}, vg = {
  '"': !0,
  "'": !0
}, ei = {
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
}, Rg = 6, ti = "css-selector-parser parse error: ";
function Pg(e) {
  e === void 0 && (e = {});
  var t = e.syntax, r = t === void 0 ? "latest" : t, n = e.substitutes, a = e.strict, i = a === void 0 ? !0 : a, u = typeof r == "object" ? r : xs[r];
  u.baseSyntax && (u = In(xs[u.baseSyntax], u));
  var o = u.tag ? [!0, !!yg(u.tag).wildcard] : [!1, !1], c = o[0], h = o[1], s = !!u.ids, g = !!u.classNames, p = !!u.namespace, m = u.namespace && (u.namespace === !0 || u.namespace.wildcard === !0);
  if (p && !c)
    throw new Error("".concat(ti, "Namespaces cannot be enabled while tags are disabled."));
  var b = !!n, R = u.combinators ? Os(u.combinators) : Un, C = u.attributes ? [
    !0,
    u.attributes.operators ? Os(u.attributes.operators) : Un,
    u.attributes.caseSensitivityModifiers ? _g(u.attributes.caseSensitivityModifiers) : Mi,
    u.attributes.unknownCaseSensitivityModifiers === "accept"
  ] : [!1, Un, Mi, !1], D = C[0], S = C[1], B = C[2], P = C[3], L = P || Object.keys(B).length > 0, H = u.pseudoClasses ? [
    !0,
    u.pseudoClasses.definitions ? Rs(u.pseudoClasses.definitions) : xn,
    u.pseudoClasses.unknown === "accept"
  ] : [!1, xn, !1], $ = H[0], ne = H[1], oe = H[2], q = u.pseudoElements ? [
    !0,
    u.pseudoElements.notation === "singleColon" || u.pseudoElements.notation === "both",
    !u.pseudoElements.notation || u.pseudoElements.notation === "doubleColon" || u.pseudoElements.notation === "both",
    u.pseudoElements.definitions ? Rs(Array.isArray(u.pseudoElements.definitions) ? { NoArgument: u.pseudoElements.definitions } : u.pseudoElements.definitions) : xn,
    u.pseudoElements.unknown === "accept"
  ] : [!1, !1, !1, xn, !1], I = q[0], O = q[1], x = q[2], M = q[3], G = q[4], W = "", V = W.length, Q = 0, z = "", J = function(Y) {
    return z === Y;
  }, Be = function() {
    return J("*") || qr(z);
  }, Ae = function(Y) {
    Q = Y, z = W.charAt(Q);
  }, re = function() {
    Q++, z = W.charAt(Q);
  }, ee = function() {
    var Y = z;
    return Q++, z = W.charAt(Q), Y;
  };
  function le(Y) {
    var Z = Math.min(V - 1, Q), he = new Error("".concat(ti).concat(Y, " Pos: ").concat(Z, "."));
    throw he.position = Z, he.name = "ParserError", he;
  }
  function K(Y, Z) {
    if (!Y)
      return le(Z);
  }
  var Lt = function() {
    K(Q < V, "Unexpected end of input.");
  }, at = function() {
    return Q >= V;
  }, ft = function(Y) {
    K(Q < V, 'Expected "'.concat(Y, '" but end of input reached.')), K(z === Y, 'Expected "'.concat(Y, '" but "').concat(z, '" found.')), Q++, z = W.charAt(Q);
  };
  function Ct(Y) {
    var Z = Ce(Y, Q);
    if (Z)
      return Q += Z.length, z = W.charAt(Q), Z;
  }
  function Ce(Y, Z) {
    var he = W.charAt(Z), E = Y[he];
    if (E) {
      var f = Ce(E.chars, Z + 1);
      if (f)
        return f;
      if (E.self)
        return E.self;
    }
  }
  function je() {
    for (var Y = ee(), Z = 1; Yr(z) && Z < Rg; )
      Y += ee(), Z++;
    return Se(), String.fromCharCode(parseInt(Y, 16));
  }
  function Ne(Y) {
    var Z = "";
    for (ft(Y); Q < V; ) {
      if (J(Y))
        return re(), Z;
      J("\\") ? (re(), J(Y) ? (Z += Y, re()) : z === `
` || z === "\f" ? re() : z === "\r" ? (re(), J(`
`) && re()) : Yr(z) ? Z += je() : (Z += z, re())) : (Z += z, re());
    }
    return Z;
  }
  function ce() {
    if (!qr(z))
      return null;
    for (var Y = ""; J("-"); )
      Y += z, re();
    for (i && Y.length >= 2 && le("Identifiers cannot start with two hyphens with strict mode on."), ei[z] && le("Identifiers cannot start with hyphens followed by digits."); Q < V; )
      if (Sg(z))
        Y += ee();
      else if (J("\\"))
        re(), Lt(), Yr(z) ? Y += je() : Y += ee();
      else
        break;
    return Y;
  }
  function De() {
    for (var Y = ""; Q < V && !J(")"); )
      if (J("\\")) {
        if (re(), at() && !i)
          return (Y + "\\").trim();
        Lt(), Yr(z) ? Y += je() : Y += ee();
      } else
        Y += ee();
    return Y.trim();
  }
  function Se() {
    if (z === " " || z === "	" || z === "\f" || z === `
`) {
      re();
      return;
    }
    z === "\r" && re(), z === `
` && re();
  }
  function Ee() {
    for (; Og[z]; )
      re();
  }
  function nr(Y) {
    Y === void 0 && (Y = !1), Ee();
    for (var Z = [wt(Y)]; J(","); )
      re(), Ee(), Z.push(wt(Y));
    return {
      type: "Selector",
      rules: Z
    };
  }
  function xt() {
    ft("["), Ee();
    var Y;
    if (J("|")) {
      K(p, "Namespaces are not enabled."), re();
      var Z = ce();
      K(Z, "Expected attribute name."), Y = {
        type: "Attribute",
        name: Z,
        namespace: { type: "NoNamespace" }
      };
    } else if (J("*")) {
      K(p, "Namespaces are not enabled."), K(m, "Wildcard namespace is not enabled."), re(), ft("|");
      var he = ce();
      K(he, "Expected attribute name."), Y = {
        type: "Attribute",
        name: he,
        namespace: { type: "WildcardNamespace" }
      };
    } else {
      var E = ce();
      if (K(E, "Expected attribute name."), Y = {
        type: "Attribute",
        name: E
      }, J("|")) {
        var f = Q;
        if (re(), qr(z)) {
          K(p, "Namespaces are not enabled.");
          var d = ce();
          K(d, "Expected attribute name."), Y = {
            type: "Attribute",
            name: d,
            namespace: { type: "NamespaceName", name: E }
          };
        } else
          Ae(f);
      }
    }
    if (K(Y.name, "Expected attribute name."), Ee(), at() && !i)
      return Y;
    if (J("]"))
      re();
    else {
      if (Y.operator = Ct(S), K(Y.operator, "Expected a valid attribute selector operator."), Ee(), Lt(), vg[z])
        Y.value = {
          type: "String",
          value: Ne(z)
        };
      else if (b && J("$")) {
        re();
        var A = ce();
        K(A, "Expected substitute name."), Y.value = {
          type: "Substitution",
          name: A
        };
      } else {
        var N = ce();
        K(N, "Expected attribute value."), Y.value = {
          type: "String",
          value: N
        };
      }
      if (Ee(), at() && !i)
        return Y;
      if (!J("]")) {
        var v = ce();
        if (K(v, "Expected end of attribute selector."), Y.caseSensitivityModifier = v, K(L, "Attribute case sensitivity modifiers are not enabled."), K(P || B[Y.caseSensitivityModifier], "Unknown attribute case sensitivity modifier."), Ee(), at() && !i)
          return Y;
      }
      ft("]");
    }
    return Y;
  }
  function We() {
    for (var Y = ""; ei[z]; )
      Y += ee();
    return K(Y !== "", "Formula parse error."), parseInt(Y);
  }
  var Da = function() {
    return J("-") || J("+") || ei[z];
  };
  function Sa() {
    if (J("e") || J("o")) {
      var Y = ce();
      if (Y === "even")
        return Ee(), [2, 0];
      if (Y === "odd")
        return Ee(), [2, 1];
    }
    var Z = null, he = 1;
    if (J("-") && (re(), he = -1), Da() && (J("+") && re(), Z = We(), !J("\\") && !J("n")))
      return [0, Z * he];
    Z === null && (Z = 1), Z *= he;
    var E;
    if (J("\\") ? (re(), Yr(z) ? E = je() : E = ee()) : E = ee(), K(E === "n", 'Formula parse error: expected "n".'), Ee(), J("+") || J("-")) {
      var f = J("+") ? 1 : -1;
      return re(), Ee(), [Z, f * We()];
    } else
      return [Z, 0];
  }
  function Fr(Y, Z, he) {
    var E;
    if (J("(")) {
      if (re(), Ee(), b && J("$")) {
        re();
        var f = ce();
        K(f, "Expected substitute name."), E = {
          type: "Substitution",
          name: f
        };
      } else if (he.type === "String")
        E = {
          type: "String",
          value: De()
        }, K(E.value, "Expected ".concat(Z, " argument value."));
      else if (he.type === "Selector")
        E = nr(!0);
      else if (he.type === "Formula") {
        var d = Sa(), A = d[0], N = d[1];
        if (E = {
          type: "Formula",
          a: A,
          b: N
        }, he.ofSelector && (Ee(), J("o") || J("\\"))) {
          var v = ce();
          K(v === "of", "Formula of selector parse error."), Ee(), E = {
            type: "FormulaOfSelector",
            a: A,
            b: N,
            selector: wt()
          };
        }
      } else
        return le("Invalid ".concat(Z, " signature."));
      if (Ee(), at() && !i)
        return E;
      ft(")");
    } else
      K(he.optional, "Argument is required for ".concat(Z, ' "').concat(Y, '".'));
    return E;
  }
  function dt() {
    if (J("*"))
      return K(h, "Wildcard tag name is not enabled."), re(), { type: "WildcardTag" };
    if (qr(z)) {
      K(c, "Tag names are not enabled.");
      var Y = ce();
      return K(Y, "Expected tag name."), {
        type: "TagName",
        name: Y
      };
    } else
      return le("Expected tag name.");
  }
  function Ze() {
    if (J("*")) {
      var Y = Q;
      if (re(), !J("|") || (re(), !Be()))
        return Ae(Y), dt();
      K(p, "Namespaces are not enabled."), K(m, "Wildcard namespace is not enabled.");
      var Z = dt();
      return Z.namespace = { type: "WildcardNamespace" }, Z;
    } else if (J("|")) {
      K(p, "Namespaces are not enabled."), re();
      var Z = dt();
      return Z.namespace = { type: "NoNamespace" }, Z;
    } else if (qr(z)) {
      var he = ce();
      if (K(he, "Expected tag name."), !J("|"))
        return K(c, "Tag names are not enabled."), {
          type: "TagName",
          name: he
        };
      var Y = Q;
      if (re(), !Be())
        return Ae(Y), {
          type: "TagName",
          name: he
        };
      K(p, "Namespaces are not enabled.");
      var Z = dt();
      return Z.namespace = { type: "NamespaceName", name: he }, Z;
    } else
      return le("Expected tag name.");
  }
  function wt(Y) {
    var Z, he;
    Y === void 0 && (Y = !1);
    var E = { type: "Rule", items: [] };
    if (Y) {
      var f = Ct(R);
      f && (E.combinator = f, Ee());
    }
    for (; Q < V; )
      if (Be())
        K(E.items.length === 0, "Unexpected tag/namespace start."), E.items.push(Ze());
      else if (J("|")) {
        var d = Q;
        if (re(), Be())
          K(E.items.length === 0, "Unexpected tag/namespace start."), Ae(d), E.items.push(Ze());
        else {
          Ae(d);
          break;
        }
      } else if (J(".")) {
        K(g, "Class names are not enabled."), re();
        var A = ce();
        K(A, "Expected class name."), E.items.push({ type: "ClassName", name: A });
      } else if (J("#")) {
        K(s, "IDs are not enabled."), re();
        var N = ce();
        K(N, "Expected ID name."), E.items.push({ type: "Id", name: N });
      } else if (J("["))
        K(D, "Attributes are not enabled."), E.items.push(xt());
      else if (J(":")) {
        var v = !1, k = !1;
        re(), J(":") && (K(I, "Pseudo elements are not enabled."), K(x, "Pseudo elements double colon notation is not enabled."), v = !0, re());
        var te = ce();
        if (K(v || te, "Expected pseudo-class name."), K(!v || te, "Expected pseudo-element name."), K(te, "Expected pseudo-class name."), K(!v || G || Object.prototype.hasOwnProperty.call(M, te), 'Unknown pseudo-element "'.concat(te, '".')), k = I && (v || !v && O && Object.prototype.hasOwnProperty.call(M, te)), k) {
          var Te = (Z = M[te]) !== null && Z !== void 0 ? Z : G && vs, ge = {
            type: "PseudoElement",
            name: te
          }, fe = Fr(te, "pseudo-element", Te);
          fe && (K(fe.type !== "Formula" && fe.type !== "FormulaOfSelector", "Pseudo-elements cannot have formula argument."), ge.argument = fe), E.items.push(ge);
        } else {
          K($, "Pseudo-classes are not enabled.");
          var Te = (he = ne[te]) !== null && he !== void 0 ? he : oe && vs;
          K(Te, 'Unknown pseudo-class: "'.concat(te, '".'));
          var fe = Fr(te, "pseudo-class", Te), de = {
            type: "PseudoClass",
            name: te
          };
          fe && (de.argument = fe), E.items.push(de);
        }
      } else
        break;
    if (E.items.length === 0)
      return at() ? le("Expected rule but end of input reached.") : le('Expected rule but "'.concat(z, '" found.'));
    if (Ee(), !at() && !J(",") && !J(")")) {
      var f = Ct(R);
      Ee(), E.nestedRule = wt(), E.nestedRule.combinator = f;
    }
    return E;
  }
  return function(Y) {
    if (typeof Y != "string")
      throw new Error("".concat(ti, "Expected string input."));
    return W = Y, V = W.length, Q = 0, z = W.charAt(0), nr();
  };
}
var Le = function() {
  return Le = Object.assign || function(e) {
    for (var t, r = 1, n = arguments.length; r < n; r++) {
      t = arguments[r];
      for (var a in t)
        Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
    }
    return e;
  }, Le.apply(this, arguments);
};
function Ue(e) {
  return function(t, r) {
    var n;
    return n = {}, n[t] = function(a) {
      return Le({ type: e }, a);
    }, n[r] = function(a) {
      return typeof a == "object" && a !== null && a.type === e;
    }, n;
  };
}
Le(Le(Le(Le(Le(Le(Le(Le(Le(Le(Le(Le(Le(Le(Le(Le({}, Ue("Selector")("selector", "isSelector")), Ue("Rule")("rule", "isRule")), Ue("TagName")("tagName", "isTagName")), Ue("Id")("id", "isId")), Ue("ClassName")("className", "isClassName")), Ue("WildcardTag")("wildcardTag", "isWildcardTag")), Ue("NamespaceName")("namespaceName", "isNamespaceName")), Ue("WildcardNamespace")("wildcardNamespace", "isWildcardNamespace")), Ue("NoNamespace")("noNamespace", "isNoNamespace")), Ue("Attribute")("attribute", "isAttribute")), Ue("PseudoClass")("pseudoClass", "isPseudoClass")), Ue("PseudoElement")("pseudoElement", "isPseudoElement")), Ue("String")("string", "isString")), Ue("Formula")("formula", "isFormula")), Ue("FormulaOfSelector")("formulaOfSelector", "isFormulaOfSelector")), Ue("Substitution")("substitution", "isSubstitution"));
const Lg = Pg({ syntax: "selectors-4" });
function xg(e) {
  if (typeof e != "string")
    throw new TypeError("Expected `string` as selector, not `" + e + "`");
  return Lg(e);
}
const pl = "֑-߿יִ-﷽ﹰ-ﻼ", ml = "A-Za-zÀ-ÖØ-öø-ʸ̀-֐ࠀ-῿‎Ⰰ-﬜︀-﹯﻽-￿", wg = new RegExp("^[^" + ml + "]*[" + pl + "]"), Mg = new RegExp("^[^" + pl + "]*[" + ml + "]");
function Bg(e) {
  const t = String(e || "");
  return wg.test(t) ? "rtl" : Mg.test(t) ? "ltr" : "neutral";
}
function kg(e) {
  return "children" in e ? El(e) : "value" in e ? e.value : "";
}
function Fg(e) {
  return e.type === "text" ? e.value : "children" in e ? El(e) : "";
}
function El(e) {
  let t = -1;
  const r = [];
  for (; ++t < e.children.length; )
    r[t] = Fg(e.children[t]);
  return r.join("");
}
function Ug(e, t) {
  const r = e.schema, n = e.language, a = e.direction, i = e.editableOrEditingHost;
  let u;
  if (t.type === "element") {
    const h = t.properties.xmlLang || t.properties.lang, s = t.properties.type || "text", g = ws(t);
    h != null && (e.language = String(h)), r && r.space === "html" ? (t.properties.contentEditable === "true" && (e.editableOrEditingHost = !0), t.tagName === "svg" && (e.schema = rr), g === "rtl" ? u = g : /* Explicit `[dir=ltr]`. */ g === "ltr" || // HTML with an invalid or no `[dir]`.
    g !== "auto" && t.tagName === "html" || // `input[type=tel]` with an invalid or no `[dir]`.
    g !== "auto" && t.tagName === "input" && s === "tel" ? u = "ltr" : (g === "auto" || t.tagName === "bdi") && (t.tagName === "textarea" ? u = ri(kg(t)) : t.tagName === "input" && (s === "email" || s === "search" || s === "tel" || s === "text") ? u = t.properties.value ? ri(String(t.properties.value)) : "ltr" : wi(t, c)), u && (e.direction = u)) : e.editableOrEditingHost && (e.editableOrEditingHost = !1);
  }
  return o;
  function o() {
    e.schema = r, e.language = n, e.direction = a, e.editableOrEditingHost = i;
  }
  function c(h) {
    if (h.type === "text")
      return u = ri(h.value), u ? xi : void 0;
    if (h !== t && h.type === "element" && (h.tagName === "bdi" || h.tagName === "script" || h.tagName === "style" || h.tagName === "textare" || ws(h)))
      return fl;
  }
}
function ri(e) {
  const t = Bg(e);
  return t === "neutral" ? void 0 : t;
}
function ws(e) {
  const t = e.type === "element" && typeof e.properties.dir == "string" ? e.properties.dir.toLowerCase() : void 0;
  return t === "auto" || t === "ltr" || t === "rtl" ? t : void 0;
}
function Hg(e, t, r) {
  const n = Ia(r, e.name), a = t.properties[n.property];
  let i = Gg(a, n);
  if (!e.value)
    return i !== void 0;
  e.value.type;
  let u = e.value.value;
  if (e.caseSensitivityModifier === "i" && (u = u.toLowerCase(), i && (i = i.toLowerCase())), i !== void 0)
    switch (e.operator) {
      case "=":
        return u === i;
      case "$=":
        return u === i.slice(-u.length);
      case "*=":
        return i.includes(u);
      case "^=":
        return u === i.slice(0, u.length);
      case "|=":
        return u === i || u === i.slice(0, u.length) && i.charAt(u.length) === "-";
      case "~=":
        return (
          // For all other values (including comma-separated lists), return whether this
          // is an exact match.
          u === i || // If this is a space-separated list, and the query is contained in it, return
          // true.
          Ni(i).includes(u)
        );
    }
  return !1;
}
function Gg(e, t) {
  if (e != null)
    if (typeof e == "boolean") {
      if (e)
        return t.attribute;
    } else if (Array.isArray(e)) {
      if (e.length > 0)
        return (t.commaSeparated ? zc : Kc)(e);
    } else
      return String(e);
}
const jg = [];
function qg(e, t) {
  return /** @type {Readonly<Array<string>>} */ (t.properties.className || jg).includes(e.name);
}
function Yg(e, t) {
  return t.properties.id === e.name;
}
function Vg(e, t) {
  return e.name === t.tagName;
}
function $g(e, t) {
  return function(r, n) {
    let a = Ms(r, "tag");
    const i = Ms(
      n ?? "*",
      "range"
    ), u = [];
    let o = -1;
    for (; ++o < i.length; ) {
      const c = i[o].toLowerCase();
      if (!t && c === "*")
        continue;
      let h = -1;
      const s = [];
      for (; ++h < a.length; )
        if (e(a[h].toLowerCase(), c)) {
          if (!t)
            return (
              /** @type {IsFilter extends true ? Tags : Tag|undefined} */
              a[h]
            );
          u.push(a[h]);
        } else
          s.push(a[h]);
      a = s;
    }
    return (
      /** @type {IsFilter extends true ? Tags : Tag|undefined} */
      t ? u : void 0
    );
  };
}
const Wg = $g(function(e, t) {
  const r = e.split("-"), n = t.split("-");
  let a = 0, i = 0;
  if (n[i] !== "*" && r[a] !== n[i])
    return !1;
  for (a++, i++; i < n.length; ) {
    if (n[i] === "*") {
      i++;
      continue;
    }
    if (!r[a])
      return !1;
    if (r[a] === n[i]) {
      a++, i++;
      continue;
    }
    if (r[a].length === 1)
      return !1;
    a++;
  }
  return !0;
}, !0);
function Ms(e, t) {
  const r = e && typeof e == "string" ? [e] : e;
  if (!r || typeof r != "object" || !("length" in r))
    throw new Error(
      "Invalid " + t + " `" + r + "`, expected non-empty string"
    );
  return r;
}
const Qg = {}.hasOwnProperty;
function Kt(e, t) {
  const r = e.type === "element" && Qg.call(e.properties, t) && e.properties[t];
  return r != null && r !== !1;
}
const Xg = di.default || di, zg = tl("name", {
  handlers: {
    "any-link": Kg,
    blank: Zg,
    checked: Jg,
    dir: e_,
    disabled: Tl,
    empty: t_,
    enabled: r_,
    "first-child": n_,
    "first-of-type": a_,
    has: i_,
    is: gl,
    lang: s_,
    "last-child": o_,
    "last-of-type": c_,
    not: l_,
    "nth-child": f_,
    "nth-last-child": d_,
    "nth-last-of-type": h_,
    "nth-of-type": p_,
    "only-child": m_,
    "only-of-type": E_,
    optional: T_,
    "read-only": g_,
    "read-write": _l,
    required: bl,
    root: __,
    scope: b_
  },
  invalid: u_,
  unknown: A_
});
function Kg(e, t) {
  return (t.tagName === "a" || t.tagName === "area" || t.tagName === "link") && Kt(t, "href");
}
function yt(e, t) {
  if (e.shallow)
    throw new Error("Cannot use `:" + t.name + "` without parent");
}
function Zg(e, t) {
  return !Al(t, r);
  function r(n) {
    return n.type === "element" || n.type === "text" && !ya(n);
  }
}
function Jg(e, t) {
  return t.tagName === "input" || t.tagName === "menuitem" ? !!((t.properties.type === "checkbox" || t.properties.type === "radio") && Kt(t, "checked")) : t.tagName === "option" ? Kt(t, "selected") : !1;
}
function e_(e, t, r, n, a) {
  return e.argument, e.argument.type, a.direction === e.argument.value;
}
function Tl(e, t) {
  return (t.tagName === "button" || t.tagName === "input" || t.tagName === "select" || t.tagName === "textarea" || t.tagName === "optgroup" || t.tagName === "option" || t.tagName === "menuitem" || t.tagName === "fieldset") && Kt(t, "disabled");
}
function t_(e, t) {
  return !Al(t, r);
  function r(n) {
    return n.type === "element" || n.type === "text";
  }
}
function r_(e, t) {
  return !Tl(e, t);
}
function n_(e, t, r, n, a) {
  return yt(a, e), a.elementIndex === 0;
}
function a_(e, t, r, n, a) {
  return yt(a, e), a.typeIndex === 0;
}
function Na(e) {
  let t = e._cachedFn;
  if (!t) {
    const r = e.argument;
    if (r.type !== "Formula")
      throw new Error(
        "Expected `nth` formula, such as `even` or `2n+1` (`of` is not yet supported)"
      );
    t = Xg(r.a + "n+" + r.b), e._cachedFn = t;
  }
  return t;
}
function i_(e, t, r, n, a) {
  e.argument, e.argument.type;
  const i = {
    ...a,
    // Not found yet.
    found: !1,
    // One result is enough.
    one: !0,
    results: [],
    rootQuery: e.argument,
    scopeElements: [t],
    // Do walk deep.
    shallow: !1
  };
  return mu(i, { type: "root", children: t.children }), i.results.length > 0;
}
function u_() {
}
function gl(e, t, r, n, a) {
  e.argument, e.argument.type;
  const i = {
    ...a,
    // Not found yet.
    found: !1,
    // One result is enough.
    one: !0,
    results: [],
    rootQuery: e.argument,
    scopeElements: [t],
    // Do walk deep.
    shallow: !1
  };
  return mu(i, t), i.results[0] === t;
}
function s_(e, t, r, n, a) {
  return e.argument, e.argument.type, a.language !== "" && a.language !== void 0 && Wg(a.language, Ci(e.argument.value)).length > 0;
}
function o_(e, t, r, n, a) {
  return yt(a, e), !!(a.elementCount && a.elementIndex === a.elementCount - 1);
}
function c_(e, t, r, n, a) {
  return yt(a, e), typeof a.typeIndex == "number" && typeof a.typeCount == "number" && a.typeIndex === a.typeCount - 1;
}
function l_(e, t, r, n, a) {
  return !gl(e, t, r, n, a);
}
function f_(e, t, r, n, a) {
  const i = Na(e);
  return yt(a, e), typeof a.elementIndex == "number" && i(a.elementIndex);
}
function d_(e, t, r, n, a) {
  const i = Na(e);
  return yt(a, e), !!(typeof a.elementCount == "number" && typeof a.elementIndex == "number" && i(a.elementCount - a.elementIndex - 1));
}
function h_(e, t, r, n, a) {
  const i = Na(e);
  return yt(a, e), typeof a.typeCount == "number" && typeof a.typeIndex == "number" && i(a.typeCount - 1 - a.typeIndex);
}
function p_(e, t, r, n, a) {
  const i = Na(e);
  return yt(a, e), typeof a.typeIndex == "number" && i(a.typeIndex);
}
function m_(e, t, r, n, a) {
  return yt(a, e), a.elementCount === 1;
}
function E_(e, t, r, n, a) {
  return yt(a, e), a.typeCount === 1;
}
function T_(e, t) {
  return !bl(e, t);
}
function g_(e, t, r, n, a) {
  return !_l(e, t, r, n, a);
}
function _l(e, t, r, n, a) {
  return t.tagName === "input" || t.tagName === "textarea" ? !Kt(t, "readOnly") && !Kt(t, "disabled") : !!a.editableOrEditingHost;
}
function bl(e, t) {
  return (t.tagName === "input" || t.tagName === "textarea" || t.tagName === "select") && Kt(t, "required");
}
function __(e, t, r, n, a) {
  return !!((!n || n.type === "root") && a.schema && (a.schema.space === "html" || a.schema.space === "svg") && (t.tagName === "html" || t.tagName === "svg"));
}
function b_(e, t, r, n, a) {
  return a.scopeElements.includes(t);
}
function Al(e, t) {
  const r = e.children;
  let n = -1;
  for (; ++n < r.length; )
    if (t(r[n]))
      return !0;
  return !1;
}
function A_(e) {
  const t = (
    /** @type {AstPseudoClass} */
    e
  );
  throw new Error("Unknown pseudo-selector `" + t.name + "`");
}
function I_(e, t, r, n, a) {
  for (const i of e.items)
    if (i.type === "Attribute") {
      if (!Hg(i, t, a.schema))
        return !1;
    } else if (i.type === "Id") {
      if (!Yg(i, t))
        return !1;
    } else if (i.type === "ClassName") {
      if (!qg(i, t))
        return !1;
    } else if (i.type === "PseudoClass") {
      if (!zg(i, t, r, n, a))
        return !1;
    } else {
      if (i.type === "PseudoElement")
        throw new Error("Invalid selector: `::" + i.name + "`");
      if (i.type === "TagName" && !Vg(i, t))
        return !1;
    }
  return !0;
}
const y_ = [];
function mu(e, t) {
  t && Il(e, [], t, void 0, void 0, t);
}
function ni(e, t, r) {
  const n = e[t];
  n ? n.push(r) : e[t] = [r];
}
function C_(e, t, r, n) {
  const a = Hn(t.descendant, t.directChild);
  let i, u = -1;
  const o = { count: 0, types: /* @__PURE__ */ new Map() }, c = { count: 0, types: /* @__PURE__ */ new Map() };
  for (; ++u < r.children.length; )
    Bs(o, r.children[u]);
  for (u = -1; ++u < r.children.length; ) {
    const h = r.children[u], s = h.type === "element" ? h.tagName.toUpperCase() : void 0;
    if (e.elementIndex = c.count, e.typeIndex = s && c.types.get(s) || 0, e.elementCount = o.count, e.typeCount = s ? o.types.get(s) : 0, "children" in h) {
      const g = Hn(a, i), p = Il(
        e,
        g,
        r.children[u],
        u,
        r,
        n
      );
      i = Hn(p.generalSibling, p.adjacentSibling);
    }
    if (e.one && e.found)
      break;
    Bs(c, r.children[u]);
  }
}
function N_(e, t, r, n, a) {
  const i = {
    adjacentSibling: void 0,
    descendant: void 0,
    directChild: void 0,
    generalSibling: void 0
  };
  let u = -1;
  for (; ++u < t.length; ) {
    const o = t[u];
    if (e.one && e.found)
      break;
    if (e.shallow && o.nestedRule)
      throw new Error("Expected selector without nesting");
    if (I_(o, r, n, a, e)) {
      const c = o.nestedRule;
      if (c) {
        const h = c.combinator === "+" ? "adjacentSibling" : c.combinator === "~" ? "generalSibling" : c.combinator === ">" ? "directChild" : "descendant";
        ni(i, h, c);
      } else
        e.found = !0, e.results.includes(r) || e.results.push(r);
    }
    o.combinator === void 0 ? ni(i, "descendant", o) : o.combinator === "~" && ni(i, "generalSibling", o);
  }
  return i;
}
function Hn(e, t) {
  return e && t && e.length > 0 && t.length > 0 ? [...e, ...t] : e && e.length > 0 ? e : t && t.length > 0 ? t : y_;
}
function Bs(e, t) {
  if (t.type === "element") {
    const r = t.tagName.toUpperCase(), n = (e.types.get(r) || 0) + 1;
    e.count++, e.types.set(r, n);
  }
}
function Il(e, t, r, n, a, i) {
  let u = {
    adjacentSibling: void 0,
    descendant: void 0,
    directChild: void 0,
    generalSibling: void 0
  };
  const o = Ug(e, r);
  if (r.type === "element") {
    let c = e.rootQuery.rules;
    a && a !== i && (c = e.rootQuery.rules.filter(
      (h) => h.combinator === void 0 || h.combinator === ">" && a === i
    )), u = N_(
      e,
      // Try the root rules for this element too.
      Hn(t, c),
      r,
      n,
      a
    );
  }
  return "children" in r && !e.shallow && !(e.one && e.found) && C_(e, u, r, i), o(), u;
}
function D_(e, t, r) {
  const n = S_(e, t, r);
  return mu(n, t || void 0), n.results;
}
function S_(e, t, r) {
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
    rootQuery: xg(e),
    schema: r === "svg" ? rr : bn,
    scopeElements: t ? t.type === "root" ? t.children : [t] : [],
    shallow: !1,
    typeIndex: void 0,
    typeCount: void 0
  };
}
const O_ = (e) => {
  const { selector: t, rewrite: r } = e || {};
  return (n) => {
    if (!(!r || typeof r != "function")) {
      if (t && typeof t == "string") {
        const a = D_(t, n);
        a && a.length > 0 && wi(n, a, (i, u, o) => {
          r(i, u, o);
        });
        return;
      }
      wi(n, (a, i, u) => {
        r(a, i, u);
      });
    }
  };
}, v_ = O_, R_ = "*{margin:0;padding:0;box-sizing:border-box}table,tr,td{height:100%}img{outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;display:block}a img{border:none}table{border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt}a[href^=tel],a[href^=sms]{text-decoration:none;pointer-events:none;cursor:default}", P_ = "#outlook a{padding:0}.ReadMsgBody,.ExternalClass{width:100%}.ExternalClass,.ExternalClass p,.ExternalClass span,.ExternalClass font,.ExternalClass td,.ExternalClass div{line-height:100%}body,table,td,p,a,li,blockquote{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}table,td{mso-table-lspace:0pt;mso-table-rspace:0pt}table td{border-collapse:collapse}img{-ms-interpolation-mode:bicubic}@media only screen and (max-device-width: 480px){a[href^=tel],a[href^=sms]{-webkit-text-decoration:default!important;text-decoration:default!important;pointer-events:auto!important;cursor:default!important}}@media only screen and (min-device-width: 768px) and (max-device-width: 1024px){a[href^=tel],a[href^=sms]{-webkit-text-decoration:default!important;text-decoration:default!important;pointer-events:auto!important;cursor:default!important}}", yl = hr.resolve(__dirname, "../tailwind.config.cjs"), L_ = async (e, t) => new Promise((r, n) => {
  const a = Rl(e, t);
  let i = lr.alloc(0), u = lr.alloc(0);
  a.stdout.on("data", (o) => {
    i = lr.concat([i, o]);
  }), a.stderr.on("data", (o) => {
    u = lr.concat([u, o]);
  }), a.on("error", (o) => {
    n({
      error: o,
      stdout: i.toString(),
      stderr: u.toString()
    });
  }), a.on("close", (o) => {
    if (o == null) {
      n({
        error: new Error("Process exited with null exit code."),
        stdout: i.toString(),
        stderr: u.toString()
      });
      return;
    }
    r({
      exit_code: o,
      stdout: i.toString(),
      stderr: u.toString()
    });
  });
}), x_ = (e) => ({
  type: "element",
  tagName: "style",
  children: [{ type: "text", value: e }]
}), w_ = (e) => {
  const t = /(--[a-zA-Z0-9-_]+)\s*:\s(.+?);/g, r = /var\((\s*--[a-zA-Z0-9-_]+\s*)(?:\)|,\s*(.*)\))/, n = /* @__PURE__ */ new Map();
  let a = e.replace(t, (o, c, h) => (n.set(c.trim(), h.trim()), "")), u = 1e3;
  for (; a.match(r); ) {
    if (u--, u <= 0)
      throw new Error("Max Cycles for replacement exceeded");
    a = a.replace(
      r,
      (o, c, h) => {
        const s = c.trim();
        return n.has(s) ? n.get(s) ?? "" : (h ?? "").trim();
      }
    );
  }
  return a;
}, ks = (e, t) => cg().use(v_, {
  rewrite: (n) => {
    var a;
    if (n.type !== "element")
      return n;
    if (n.tagName === "head" && t != null) {
      const i = [
        ...n.children,
        ...t.map((u) => x_(u))
      ];
      n.children = i;
    }
    if (((a = n.properties) == null ? void 0 : a.style) != null) {
      const i = w_(`${n.properties.style}`);
      n.properties = {
        ...n.properties,
        style: i
      };
    }
  }
}).use(sl).processSync(e).toString(), Fs = (e) => {
  const t = new RegExp("(?<=\\:)[a-z0-9-]+(?=\\:)", "g");
  (e.match(t) || []).forEach((n) => {
    Ii.ignoredPseudos.includes(n) || Ii.ignoredPseudos.push(n);
  });
}, M_ = (e, t, r) => {
  const n = {
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
  Fs(t), r != null ? r.forEach((o) => {
    Fs(o);
  }) : r = [];
  const a = ks(e, [t]), i = Ii(a, n);
  let u = ks(i, r);
  return u = u.replace(/&#x27;/g, "'"), u;
}, B_ = async (e, t) => {
  const r = require.resolve("tailwindcss/lib/cli.js"), n = t.tailwindConfigPath ?? yl, a = hr.join(Oa.tmpdir(), "mailtyphoon-input.html");
  et.writeFileSync(a, e);
  const i = hr.join(Oa.tmpdir(), "mailtyphoon-input.css"), u = t.css != null ? vl.compileString(t.css).css : "";
  et.writeFileSync(i, u);
  const o = hr.join(Oa.tmpdir(), "mailtyphoon-output.css");
  et.writeFileSync(o, "");
  const c = [
    r,
    "--config",
    n,
    "--output",
    o,
    "--content",
    a
  ];
  t.css && (c.push("--input"), c.push(i));
  const h = await L_(Kn.argv0, c);
  if (h.exit_code !== 0) {
    console.error("Failed to run Tailwind."), console.error(h.stderr);
    return;
  }
  const s = et.readFileSync(o, "utf-8") ?? "";
  return {
    html: M_(e, s, [R_, P_]),
    css: s
  };
}, Us = Kn.cwd(), Hs = new Dl({ max: 100 }), Cl = Ol(Sl(Kn.argv)).option("input-html", {
  alias: "i",
  describe: "The path to your input HTML file",
  type: "string",
  default: hr.resolve(Us, "./email.html"),
  demandOption: !0
}).option("output-html", {
  alias: "o",
  describe: "The path to the inlined HTML file that will be generated",
  type: "string",
  default: hr.resolve(Us, "./out.html"),
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
  default: yl
}).option("reset", {
  type: "string",
  describe: "Set to `false` to disable extended resets",
  default: !1
}).option("watch", {
  alias: "w",
  type: "boolean",
  describe: "Watch for changes in the input HTML or CSS file",
  default: !1
}), Gs = (e) => {
  const t = et.existsSync(e) ? et.readFileSync(e, "utf-8") : "";
  return Nl.createHash("sha256").update(t).digest("hex");
}, js = (e, t) => {
  et.watchFile(e, { interval: 500 }, (r, n) => {
    r.mtime !== n.mtime && t();
  });
}, k_ = async () => {
  const e = await Cl.argv, t = e["input-html"], r = e["output-html"], n = e["input-css"], a = e["output-css"], i = e["tailwind-config"], u = e.reset, o = async () => {
    const c = Gs(t), h = Gs(n ?? ""), s = c + h, g = Hs.get(s);
    if (g) {
      et.writeFileSync(r, g);
      return;
    }
    if (!et.existsSync(t))
      throw new Error(`Input HTML file not found at ${t}`);
    const p = et.readFileSync(t, "utf-8"), m = {
      css: n != null ? et.readFileSync(n, "utf-8") : void 0,
      tailwindConfigPath: i,
      reset: u !== "false"
    }, b = await B_(p, m);
    if (b == null)
      throw new Error("Failed to compile HTML");
    const { html: R, css: C } = b;
    r != null && et.writeFileSync(r, R), a != null && et.writeFileSync(a, C), Hs.set(s, R);
  };
  await o(), e.watch && (js(t, o), n != null && js(n, o));
};
k_().catch((e) => {
  console.log(Vl.red((e == null ? void 0 : e.message) ?? "Unknown error")), Cl.showHelp(), Kn.exit(1);
});
//# sourceMappingURL=mailtyphoon.js.map
