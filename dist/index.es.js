import { jsx as h, jsxs as L, Fragment as Rt } from "react/jsx-runtime";
import * as p from "react";
import k, { forwardRef as St, useState as ye, useRef as xt, useEffect as Tt, useLayoutEffect as Aa, createContext as jc, useContext as Vc, useCallback as Ae, useMemo as Ee, createElement as zr } from "react";
import * as _a from "react-dom";
import Ia from "react-dom";
function Wa(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (n = Wa(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function $a() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++) (e = arguments[n]) && (t = Wa(e)) && (r && (r += " "), r += t);
  return r;
}
const no = "-", Gc = (e) => {
  const t = qc(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (s) => {
      const i = s.split(no);
      return i[0] === "" && i.length !== 1 && i.shift(), Fa(i, t) || Uc(s);
    },
    getConflictingClassGroupIds: (s, i) => {
      const c = n[s] || [];
      return i && r[s] ? [...c, ...r[s]] : c;
    }
  };
}, Fa = (e, t) => {
  var s;
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], r = t.nextPart.get(n), o = r ? Fa(e.slice(1), r) : void 0;
  if (o)
    return o;
  if (t.validators.length === 0)
    return;
  const a = e.join(no);
  return (s = t.validators.find(({
    validator: i
  }) => i(a))) == null ? void 0 : s.classGroupId;
}, Lo = /^\[(.+)\]$/, Uc = (e) => {
  if (Lo.test(e)) {
    const t = Lo.exec(e)[1], n = t == null ? void 0 : t.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, qc = (e) => {
  const {
    theme: t,
    prefix: n
  } = e, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return Kc(Object.entries(e.classGroups), n).forEach(([a, s]) => {
    jr(s, r, a, t);
  }), r;
}, jr = (e, t, n, r) => {
  e.forEach((o) => {
    if (typeof o == "string") {
      const a = o === "" ? t : Ho(t, o);
      a.classGroupId = n;
      return;
    }
    if (typeof o == "function") {
      if (Xc(o)) {
        jr(o(r), t, n, r);
        return;
      }
      t.validators.push({
        validator: o,
        classGroupId: n
      });
      return;
    }
    Object.entries(o).forEach(([a, s]) => {
      jr(s, Ho(t, a), n, r);
    });
  });
}, Ho = (e, t) => {
  let n = e;
  return t.split(no).forEach((r) => {
    n.nextPart.has(r) || n.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(r);
  }), n;
}, Xc = (e) => e.isThemeGetter, Kc = (e, t) => t ? e.map(([n, r]) => {
  const o = r.map((a) => typeof a == "string" ? t + a : typeof a == "object" ? Object.fromEntries(Object.entries(a).map(([s, i]) => [t + s, i])) : a);
  return [n, o];
}) : e, Qc = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let t = 0, n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  const o = (a, s) => {
    n.set(a, s), t++, t > e && (t = 0, r = n, n = /* @__PURE__ */ new Map());
  };
  return {
    get(a) {
      let s = n.get(a);
      if (s !== void 0)
        return s;
      if ((s = r.get(a)) !== void 0)
        return o(a, s), s;
    },
    set(a, s) {
      n.has(a) ? n.set(a, s) : o(a, s);
    }
  };
}, Ya = "!", Zc = (e) => {
  const {
    separator: t,
    experimentalParseClassName: n
  } = e, r = t.length === 1, o = t[0], a = t.length, s = (i) => {
    const c = [];
    let l = 0, u = 0, d;
    for (let b = 0; b < i.length; b++) {
      let v = i[b];
      if (l === 0) {
        if (v === o && (r || i.slice(b, b + a) === t)) {
          c.push(i.slice(u, b)), u = b + a;
          continue;
        }
        if (v === "/") {
          d = b;
          continue;
        }
      }
      v === "[" ? l++ : v === "]" && l--;
    }
    const f = c.length === 0 ? i : i.substring(u), m = f.startsWith(Ya), y = m ? f.substring(1) : f, g = d && d > u ? d - u : void 0;
    return {
      modifiers: c,
      hasImportantModifier: m,
      baseClassName: y,
      maybePostfixModifierPosition: g
    };
  };
  return n ? (i) => n({
    className: i,
    parseClassName: s
  }) : s;
}, Jc = (e) => {
  if (e.length <= 1)
    return e;
  const t = [];
  let n = [];
  return e.forEach((r) => {
    r[0] === "[" ? (t.push(...n.sort(), r), n = []) : n.push(r);
  }), t.push(...n.sort()), t;
}, el = (e) => ({
  cache: Qc(e.cacheSize),
  parseClassName: Zc(e),
  ...Gc(e)
}), tl = /\s+/, nl = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: r,
    getConflictingClassGroupIds: o
  } = t, a = [], s = e.trim().split(tl);
  let i = "";
  for (let c = s.length - 1; c >= 0; c -= 1) {
    const l = s[c], {
      modifiers: u,
      hasImportantModifier: d,
      baseClassName: f,
      maybePostfixModifierPosition: m
    } = n(l);
    let y = !!m, g = r(y ? f.substring(0, m) : f);
    if (!g) {
      if (!y) {
        i = l + (i.length > 0 ? " " + i : i);
        continue;
      }
      if (g = r(f), !g) {
        i = l + (i.length > 0 ? " " + i : i);
        continue;
      }
      y = !1;
    }
    const b = Jc(u).join(":"), v = d ? b + Ya : b, x = v + g;
    if (a.includes(x))
      continue;
    a.push(x);
    const w = o(g, y);
    for (let M = 0; M < w.length; ++M) {
      const N = w[M];
      a.push(v + N);
    }
    i = l + (i.length > 0 ? " " + i : i);
  }
  return i;
};
function rl() {
  let e = 0, t, n, r = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = Ba(t)) && (r && (r += " "), r += n);
  return r;
}
const Ba = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (t = Ba(e[r])) && (n && (n += " "), n += t);
  return n;
};
function ol(e, ...t) {
  let n, r, o, a = s;
  function s(c) {
    const l = t.reduce((u, d) => d(u), e());
    return n = el(l), r = n.cache.get, o = n.cache.set, a = i, i(c);
  }
  function i(c) {
    const l = r(c);
    if (l)
      return l;
    const u = nl(c, n);
    return o(c, u), u;
  }
  return function() {
    return a(rl.apply(null, arguments));
  };
}
const ie = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, La = /^\[(?:([a-z-]+):)?(.+)\]$/i, al = /^\d+\/\d+$/, sl = /* @__PURE__ */ new Set(["px", "full", "screen"]), il = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, cl = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, ll = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, dl = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, ul = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, it = (e) => Ut(e) || sl.has(e) || al.test(e), bt = (e) => tn(e, "length", yl), Ut = (e) => !!e && !Number.isNaN(Number(e)), Dr = (e) => tn(e, "number", Ut), un = (e) => !!e && Number.isInteger(Number(e)), fl = (e) => e.endsWith("%") && Ut(e.slice(0, -1)), Q = (e) => La.test(e), vt = (e) => il.test(e), hl = /* @__PURE__ */ new Set(["length", "size", "percentage"]), ml = (e) => tn(e, hl, Ha), pl = (e) => tn(e, "position", Ha), gl = /* @__PURE__ */ new Set(["image", "url"]), bl = (e) => tn(e, gl, xl), vl = (e) => tn(e, "", wl), fn = () => !0, tn = (e, t, n) => {
  const r = La.exec(e);
  return r ? r[1] ? typeof t == "string" ? r[1] === t : t.has(r[1]) : n(r[2]) : !1;
}, yl = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  cl.test(e) && !ll.test(e)
), Ha = () => !1, wl = (e) => dl.test(e), xl = (e) => ul.test(e), Cl = () => {
  const e = ie("colors"), t = ie("spacing"), n = ie("blur"), r = ie("brightness"), o = ie("borderColor"), a = ie("borderRadius"), s = ie("borderSpacing"), i = ie("borderWidth"), c = ie("contrast"), l = ie("grayscale"), u = ie("hueRotate"), d = ie("invert"), f = ie("gap"), m = ie("gradientColorStops"), y = ie("gradientColorStopPositions"), g = ie("inset"), b = ie("margin"), v = ie("opacity"), x = ie("padding"), w = ie("saturate"), M = ie("scale"), N = ie("sepia"), C = ie("skew"), O = ie("space"), _ = ie("translate"), B = () => ["auto", "contain", "none"], I = () => ["auto", "hidden", "clip", "visible", "scroll"], F = () => ["auto", Q, t], T = () => [Q, t], Y = () => ["", it, bt], D = () => ["auto", Ut, Q], R = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], S = () => ["solid", "dashed", "dotted", "double", "none"], A = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], E = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], W = () => ["", "0", Q], $ = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], z = () => [Ut, Q];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [fn],
      spacing: [it, bt],
      blur: ["none", "", vt, Q],
      brightness: z(),
      borderColor: [e],
      borderRadius: ["none", "", "full", vt, Q],
      borderSpacing: T(),
      borderWidth: Y(),
      contrast: z(),
      grayscale: W(),
      hueRotate: z(),
      invert: W(),
      gap: T(),
      gradientColorStops: [e],
      gradientColorStopPositions: [fl, bt],
      inset: F(),
      margin: F(),
      opacity: z(),
      padding: T(),
      saturate: z(),
      scale: z(),
      sepia: W(),
      skew: z(),
      space: T(),
      translate: T()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", Q]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [vt]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": $()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": $()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: [...R(), Q]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: I()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": I()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": I()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: B()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": B()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": B()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: [g]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [g]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [g]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [g]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [g]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [g]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [g]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [g]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [g]
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: ["auto", un, Q]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: F()
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["wrap", "wrap-reverse", "nowrap"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: ["1", "auto", "initial", "none", Q]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: W()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: W()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", un, Q]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [fn]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", un, Q]
        }, Q]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": D()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": D()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [fn]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [un, Q]
        }, Q]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": D()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": D()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": ["auto", "min", "max", "fr", Q]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", Q]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [f]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": [f]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": [f]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: ["normal", ...E()]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": ["start", "end", "center", "stretch"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", "start", "end", "center", "stretch"]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...E(), "baseline"]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", "start", "end", "center", "stretch", "baseline"]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": [...E(), "baseline"]
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", "start", "end", "center", "stretch"]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: [x]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [x]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [x]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [x]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [x]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [x]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [x]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [x]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [x]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [b]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [b]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [b]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [b]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [b]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [b]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [b]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [b]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [b]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      "space-x": [{
        "space-x": [O]
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/space
       */
      "space-y": [{
        "space-y": [O]
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-y-reverse": ["space-y-reverse"],
      // Sizing
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", Q, t]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [Q, t, "min", "max", "fit"]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [Q, t, "none", "full", "min", "max", "fit", "prose", {
          screen: [vt]
        }, vt]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [Q, t, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": [Q, t, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [Q, t, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [Q, t, "auto", "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", vt, bt]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", Dr]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [fn]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", Q]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", Ut, Dr]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", it, Q]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", Q]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", Q]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: [e]
      }],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      "placeholder-opacity": [{
        "placeholder-opacity": [v]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: [e]
      }],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      "text-opacity": [{
        "text-opacity": [v]
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...S(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", it, bt]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", it, Q]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: [e]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: T()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", Q]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", Q]
      }],
      // Backgrounds
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Opacity
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/background-opacity
       */
      "bg-opacity": [{
        "bg-opacity": [v]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: [...R(), pl]
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "round", "space"]
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ["auto", "cover", "contain", ml]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, bl]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: [e]
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: [y]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [y]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [y]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: [m]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [m]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [m]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [a]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": [a]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": [a]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": [a]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": [a]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": [a]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": [a]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": [a]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": [a]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": [a]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": [a]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": [a]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": [a]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": [a]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": [a]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: [i]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": [i]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": [i]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": [i]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": [i]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": [i]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": [i]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": [i]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": [i]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      "border-opacity": [{
        "border-opacity": [v]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...S(), "hidden"]
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x": [{
        "divide-x": [i]
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y": [{
        "divide-y": [i]
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Divide Opacity
       * @see https://tailwindcss.com/docs/divide-opacity
       */
      "divide-opacity": [{
        "divide-opacity": [v]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: S()
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: [o]
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": [o]
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": [o]
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": [o]
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": [o]
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": [o]
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": [o]
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": [o]
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": [o]
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: [o]
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: ["", ...S()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [it, Q]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [it, bt]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: [e]
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w": [{
        ring: Y()
      }],
      /**
       * Ring Width Inset
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/ring-color
       */
      "ring-color": [{
        ring: [e]
      }],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      "ring-opacity": [{
        "ring-opacity": [v]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [it, bt]
      }],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      "ring-offset-color": [{
        "ring-offset": [e]
      }],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: ["", "inner", "none", vt, vl]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [fn]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [v]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...A(), "plus-lighter", "plus-darker"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": A()
      }],
      // Filters
      /**
       * Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: ["", "none"]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: [n]
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [r]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [c]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", vt, Q]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [l]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [u]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [d]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [w]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [N]
      }],
      /**
       * Backdrop Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": ["", "none"]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": [n]
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [r]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [c]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": [l]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [u]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": [d]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [v]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [w]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": [N]
      }],
      // Tables
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": [s]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": [s]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": [s]
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // Transitions and Animation
      /**
       * Tranisition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", Q]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: z()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", Q]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: z()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", Q]
      }],
      // Transforms
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: ["", "gpu", "none"]
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: [M]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [M]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [M]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [un, Q]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [_]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [_]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [C]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [C]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", Q]
      }],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ["auto", e]
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", Q]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: [e]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["none", "auto"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "y", "x", ""]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": T()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": T()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": T()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": T()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": T()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": T()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": T()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": T()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": T()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": T()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": T()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": T()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": T()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": T()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": T()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": T()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": T()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": T()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", Q]
      }],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: [e, "none"]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [it, bt, Dr]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: [e, "none"]
      }],
      // Accessibility
      /**
       * Screen Readers
       * @see https://tailwindcss.com/docs/screen-readers
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    }
  };
}, kl = /* @__PURE__ */ ol(Cl);
function P(...e) {
  return kl($a(e));
}
const zo = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, jo = $a, Se = (e, t) => (n) => {
  var r;
  if ((t == null ? void 0 : t.variants) == null) return jo(e, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
  const { variants: o, defaultVariants: a } = t, s = Object.keys(o).map((l) => {
    const u = n == null ? void 0 : n[l], d = a == null ? void 0 : a[l];
    if (u === null) return null;
    const f = zo(u) || zo(d);
    return o[l][f];
  }), i = n && Object.entries(n).reduce((l, u) => {
    let [d, f] = u;
    return f === void 0 || (l[d] = f), l;
  }, {}), c = t == null || (r = t.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((l, u) => {
    let { class: d, className: f, ...m } = u;
    return Object.entries(m).every((y) => {
      let [g, b] = y;
      return Array.isArray(b) ? b.includes({
        ...a,
        ...i
      }[g]) : {
        ...a,
        ...i
      }[g] === b;
    }) ? [
      ...l,
      d,
      f
    ] : l;
  }, []);
  return jo(e, s, c, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
}, Ml = Se(
  P(
    "inline-flex items-center justify-center gap-2",
    "rounded-md ring-offset-white",
    "text-sm font-medium",
    "focus-visible:outline-none focus-visible:ring-2",
    "focus-visible:ring-slate-950 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-60",
    "transition-colors cursor-pointer"
  ),
  {
    variants: {
      variant: {
        default: "border-0 bg-cms-gray-850 text-cms-white hover:bg-cms-gray-750",
        secondary: P(
          "border-0 bg-cms-gray-300 text-cms-black",
          "hover:bg-cms-gray-200 hover:text-cms-gray-800"
        ),
        outline: P(
          "border border-cms-gray-400 bg-transparent",
          "hover:bg-cms-gray-200 hover:text-cms-gray-900"
        ),
        ghost: "border-0 bg-transparent hover:bg-cms-gray-200 hover:text-cms-gray-800",
        link: "border-0 text-cms-black underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-sm px-3",
        lg: "h-11 rounded-sm px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), dt = St(
  ({ className: e, variant: t, size: n, ...r }, o) => /* @__PURE__ */ h(
    "button",
    {
      className: P(Ml({ variant: t, size: n, className: e })),
      ref: o,
      ...r
    }
  )
);
dt.displayName = "Button";
const Nl = {
  sm: "h-4 w-4",
  md: "h-8 w-8",
  lg: "h-16 w-16"
};
function Cy({ size: e = "lg", className: t }) {
  return /* @__PURE__ */ h("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ h(
    "div",
    {
      className: P(
        Nl[e],
        "animate-spin rounded-full",
        "border-2 border-cms-gray-500 border-b-transparent",
        t
      )
    }
  ) });
}
const Sl = Se(
  P(
    "flex items-center justify-between",
    "rounded-lg px-4 py-2.5",
    "text-sm font-medium",
    "outline-none",
    "focus:ring-2 focus:ring-offset-2",
    "transition-all"
  ),
  {
    variants: {
      variant: {
        default: P(
          "bg-default text-black border border-cms-outline",
          "hover:bg-cms-gray-200"
        ),
        outline: P(
          "border border-cms-outline bg-transparent",
          "hover:bg-cms-gray-200"
        ),
        ghost: "hover:bg-cms-gray-200 hover:text-black"
      },
      size: {
        sm: "px-3 py-2 text-xs",
        default: "px-4 py-2.5 text-sm",
        lg: "px-6 py-3 text-base"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), Dl = ({
  className: e,
  isOpen: t
}) => /* @__PURE__ */ h(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "10",
    height: "6",
    viewBox: "0 0 10 6",
    fill: "none",
    className: P(
      "transition-transform duration-200",
      t && "rotate-180",
      e
    ),
    children: /* @__PURE__ */ h(
      "path",
      {
        d: "M8.75 0.75L4.57609 4.75L0.75 0.75",
        stroke: "currentColor",
        strokeWidth: "1.5",
        strokeLinecap: "round"
      }
    )
  }
), Ol = ({ className: e }) => /* @__PURE__ */ h(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none",
    className: e,
    children: /* @__PURE__ */ h(
      "path",
      {
        d: "M9 3L3 9M3 3L9 9",
        stroke: "currentColor",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  }
), ro = St(
  ({
    options: e,
    value: t,
    placeholder: n = "선택하세요",
    onValueChange: r,
    disabled: o = !1,
    className: a,
    dropdownClassName: s,
    variant: i,
    size: c,
    searchable: l = !1,
    clearable: u = !1,
    multiple: d = !1,
    maxHeight: f = 200,
    ...m
  }, y) => {
    const [g, b] = ye(!1), [v, x] = ye(""), [w, M] = ye(
      d ? t ? [t] : [] : []
    ), N = xt(null), C = xt(null), O = e.find((D) => D.value === t), _ = d ? w.length > 0 ? `${w.length}개 선택됨` : n : (O == null ? void 0 : O.label) || n, B = e.filter(
      (D) => D.label.toLowerCase().includes(v.toLowerCase())
    ), I = () => {
      o || (b(!g), x(""));
    }, F = (D) => {
      if (!D.disabled)
        if (d) {
          const R = w.includes(D.value) ? w.filter((S) => S !== D.value) : [...w, D.value];
          M(R), r == null || r(R.join(","));
        } else
          r == null || r(D.value), b(!1);
    }, T = (D) => {
      D.stopPropagation(), d && M([]), r == null || r("");
    }, Y = (D) => {
      D.key === "Escape" ? b(!1) : (D.key === "Enter" || D.key === " ") && (D.preventDefault(), I());
    };
    return Tt(() => {
      const D = (R) => {
        N.current && !N.current.contains(R.target) && b(!1);
      };
      return document.addEventListener("mousedown", D), () => document.removeEventListener("mousedown", D);
    }, []), Tt(() => {
      g && l && C.current && C.current.focus();
    }, [g, l]), /* @__PURE__ */ L("div", { ref: N, className: "relative w-full", children: [
      /* @__PURE__ */ L(
        "button",
        {
          ref: y,
          type: "button",
          className: P(
            Sl({ variant: i, size: c }),
            o && "opacity-50 cursor-not-allowed",
            a
          ),
          onClick: I,
          onKeyDown: Y,
          disabled: o,
          "aria-expanded": g,
          "aria-haspopup": "listbox",
          ...m,
          children: [
            /* @__PURE__ */ h(
              "span",
              {
                className: P(
                  "truncate flex-1 text-left",
                  !O && !d && "text-cms-gray-400"
                ),
                children: _
              }
            ),
            /* @__PURE__ */ L("div", { className: "flex items-center gap-2 ml-3", children: [
              u && (t || w.length > 0) && /* @__PURE__ */ h(
                "button",
                {
                  type: "button",
                  className: P(
                    "border-0 bg-transparent",
                    "p-1 rounded text-cms-gray-400 transition-colors",
                    "hover:text-cms-black"
                  ),
                  onClick: T,
                  "aria-label": "선택 취소",
                  children: /* @__PURE__ */ h(Ol, { className: "w-3 h-3" })
                }
              ),
              /* @__PURE__ */ h(
                Dl,
                {
                  isOpen: g,
                  className: "w-4 h-4 text-cms-gray-400"
                }
              )
            ] })
          ]
        }
      ),
      g && /* @__PURE__ */ L(
        "div",
        {
          className: P(
            "absolute z-50 mt-1 py-1 w-full",
            "rounded-lg border border-cms-gray-400",
            "bg-white shadow-lg",
            s
          ),
          style: { maxHeight: `${f}px` },
          children: [
            l && /* @__PURE__ */ h("div", { className: "px-3 py-2 border-b border-cms-gray-400", children: /* @__PURE__ */ h(
              "input",
              {
                ref: C,
                type: "text",
                value: v,
                onChange: (D) => x(D.target.value),
                placeholder: "검색...",
                className: P(
                  "w-full px-2 py-1 text-sm",
                  "rounded outline-none",
                  "border border-cms-gray-400",
                  "focus:ring-1 focus:ring-cms-black"
                )
              }
            ) }),
            /* @__PURE__ */ h("div", { className: "max-h-48 overflow-y-auto", children: B.length === 0 ? /* @__PURE__ */ h("div", { className: "px-3 py-2 text-sm text-cms-gray-400 text-center", children: v ? "검색 결과가 없습니다" : "옵션이 없습니다" }) : B.map((D) => {
              const R = d ? w.includes(D.value) : t === D.value;
              return /* @__PURE__ */ L(
                "button",
                {
                  type: "button",
                  className: P(
                    "border-0",
                    "flex items-center justify-between gap-2",
                    "w-full px-3 py-2 ",
                    "text-left text-sm",
                    "transition-colors",
                    D.disabled ? "text-cms-gray-400 cursor-not-allowed" : "text-cms-black hover:bg-cms-gray-200 cursor-pointer",
                    R && "bg-cms-gray-400 font-medium"
                  ),
                  onClick: () => F(D),
                  disabled: D.disabled,
                  children: [
                    /* @__PURE__ */ h("span", { className: "truncate", children: D.label }),
                    R && /* @__PURE__ */ h(
                      "svg",
                      {
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "16",
                        height: "16",
                        viewBox: "0 0 16 16",
                        fill: "none",
                        className: "w-4 h-4 text-black shrink-0",
                        children: /* @__PURE__ */ h(
                          "path",
                          {
                            d: "M13.5 4.5L6 12L2.5 8.5",
                            stroke: "currentColor",
                            strokeWidth: "2",
                            strokeLinecap: "round",
                            strokeLinejoin: "round"
                          }
                        )
                      }
                    )
                  ]
                },
                D.value
              );
            }) })
          ]
        }
      )
    ] });
  }
);
ro.displayName = "Dropdown";
const El = St(
  ({ label: e, helperText: t, error: n, required: r, className: o, ...a }, s) => /* @__PURE__ */ L("div", { className: P("space-y-1", o), children: [
    e && /* @__PURE__ */ L("label", { className: "block text-sm font-medium text-cms-black", children: [
      e,
      r && /* @__PURE__ */ h("span", { className: "text-cms-red-500 ml-1", children: "*" })
    ] }),
    /* @__PURE__ */ h(
      ro,
      {
        ref: s,
        ...a,
        className: P(n && "border-cms-red-500 focus:ring-cms-red-500")
      }
    ),
    (t || n) && /* @__PURE__ */ h(
      "p",
      {
        className: P(
          "text-xs",
          n ? "text-cms-red-500" : "text-cms-gray-400"
        ),
        children: n || t
      }
    )
  ] })
);
El.displayName = "Select";
const Pl = St(
  ({ options: e, loading: t = !1, createable: n = !1, onCreateOption: r, ...o }, a) => {
    const [s] = ye(""), i = e.filter(
      (u) => u.label.toLowerCase().includes(s.toLowerCase())
    ), c = i.some(
      (u) => u.label.toLowerCase() === s.toLowerCase()
    ), l = [
      ...i,
      ...n && s && !c ? [
        {
          value: `__create__${s}`,
          label: `"${s}" 생성`,
          disabled: !1
        }
      ] : []
    ];
    return /* @__PURE__ */ h(
      ro,
      {
        ref: a,
        ...o,
        options: l,
        searchable: !0,
        dropdownClassName: P(t && "opacity-75", o.dropdownClassName),
        onValueChange: (u) => {
          var d;
          if (u.startsWith("__create__")) {
            const f = u.replace("__create__", "");
            r == null || r(f);
          } else
            (d = o.onValueChange) == null || d.call(o, u);
        }
      }
    );
  }
);
Pl.displayName = "Combobox";
function ky(e) {
  return /* @__PURE__ */ h(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "20",
      height: "20",
      viewBox: "0 0 20 20",
      fill: "none",
      ...e,
      children: /* @__PURE__ */ h(
        "path",
        {
          d: "M7 5L12 10L7 15",
          stroke: "black",
          strokeWidth: "1.5",
          strokeLinecap: "round"
        }
      )
    }
  );
}
function ee(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(o) {
    if (e == null || e(o), n === !1 || !o.defaultPrevented)
      return t == null ? void 0 : t(o);
  };
}
function Vo(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function za(...e) {
  return (t) => {
    let n = !1;
    const r = e.map((o) => {
      const a = Vo(o, t);
      return !n && typeof a == "function" && (n = !0), a;
    });
    if (n)
      return () => {
        for (let o = 0; o < r.length; o++) {
          const a = r[o];
          typeof a == "function" ? a() : Vo(e[o], null);
        }
      };
  };
}
function ce(...e) {
  return p.useCallback(za(...e), e);
}
function Rl(e, t) {
  const n = p.createContext(t), r = (a) => {
    const { children: s, ...i } = a, c = p.useMemo(() => i, Object.values(i));
    return /* @__PURE__ */ h(n.Provider, { value: c, children: s });
  };
  r.displayName = e + "Provider";
  function o(a) {
    const s = p.useContext(n);
    if (s) return s;
    if (t !== void 0) return t;
    throw new Error(`\`${a}\` must be used within \`${e}\``);
  }
  return [r, o];
}
function Ie(e, t = []) {
  let n = [];
  function r(a, s) {
    const i = p.createContext(s), c = n.length;
    n = [...n, s];
    const l = (d) => {
      var v;
      const { scope: f, children: m, ...y } = d, g = ((v = f == null ? void 0 : f[e]) == null ? void 0 : v[c]) || i, b = p.useMemo(() => y, Object.values(y));
      return /* @__PURE__ */ h(g.Provider, { value: b, children: m });
    };
    l.displayName = a + "Provider";
    function u(d, f) {
      var g;
      const m = ((g = f == null ? void 0 : f[e]) == null ? void 0 : g[c]) || i, y = p.useContext(m);
      if (y) return y;
      if (s !== void 0) return s;
      throw new Error(`\`${d}\` must be used within \`${a}\``);
    }
    return [l, u];
  }
  const o = () => {
    const a = n.map((s) => p.createContext(s));
    return function(i) {
      const c = (i == null ? void 0 : i[e]) || a;
      return p.useMemo(
        () => ({ [`__scope${e}`]: { ...i, [e]: c } }),
        [i, c]
      );
    };
  };
  return o.scopeName = e, [r, Tl(o, ...t)];
}
function Tl(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((o) => ({
      useScope: o(),
      scopeName: o.scopeName
    }));
    return function(a) {
      const s = r.reduce((i, { useScope: c, scopeName: l }) => {
        const d = c(a)[`__scope${l}`];
        return { ...i, ...d };
      }, {});
      return p.useMemo(() => ({ [`__scope${t.scopeName}`]: s }), [s]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
// @__NO_SIDE_EFFECTS__
function pn(e) {
  const t = /* @__PURE__ */ Al(e), n = p.forwardRef((r, o) => {
    const { children: a, ...s } = r, i = p.Children.toArray(a), c = i.find(Il);
    if (c) {
      const l = c.props.children, u = i.map((d) => d === c ? p.Children.count(l) > 1 ? p.Children.only(null) : p.isValidElement(l) ? l.props.children : null : d);
      return /* @__PURE__ */ h(t, { ...s, ref: o, children: p.isValidElement(l) ? p.cloneElement(l, void 0, u) : null });
    }
    return /* @__PURE__ */ h(t, { ...s, ref: o, children: a });
  });
  return n.displayName = `${e}.Slot`, n;
}
// @__NO_SIDE_EFFECTS__
function Al(e) {
  const t = p.forwardRef((n, r) => {
    const { children: o, ...a } = n;
    if (p.isValidElement(o)) {
      const s = $l(o), i = Wl(a, o.props);
      return o.type !== p.Fragment && (i.ref = r ? za(r, s) : s), p.cloneElement(o, i);
    }
    return p.Children.count(o) > 1 ? p.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var ja = Symbol("radix.slottable");
// @__NO_SIDE_EFFECTS__
function _l(e) {
  const t = ({ children: n }) => /* @__PURE__ */ h(Rt, { children: n });
  return t.displayName = `${e}.Slottable`, t.__radixId = ja, t;
}
function Il(e) {
  return p.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === ja;
}
function Wl(e, t) {
  const n = { ...t };
  for (const r in t) {
    const o = e[r], a = t[r];
    /^on[A-Z]/.test(r) ? o && a ? n[r] = (...i) => {
      const c = a(...i);
      return o(...i), c;
    } : o && (n[r] = o) : r === "style" ? n[r] = { ...o, ...a } : r === "className" && (n[r] = [o, a].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function $l(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var Fl = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
], re = Fl.reduce((e, t) => {
  const n = /* @__PURE__ */ pn(`Primitive.${t}`), r = p.forwardRef((o, a) => {
    const { asChild: s, ...i } = o, c = s ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ h(c, { ...i, ref: a });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {});
function Yl(e, t) {
  e && _a.flushSync(() => e.dispatchEvent(t));
}
function At(e) {
  const t = p.useRef(e);
  return p.useEffect(() => {
    t.current = e;
  }), p.useMemo(() => (...n) => {
    var r;
    return (r = t.current) == null ? void 0 : r.call(t, ...n);
  }, []);
}
function Bl(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = At(e);
  p.useEffect(() => {
    const r = (o) => {
      o.key === "Escape" && n(o);
    };
    return t.addEventListener("keydown", r, { capture: !0 }), () => t.removeEventListener("keydown", r, { capture: !0 });
  }, [n, t]);
}
var Ll = "DismissableLayer", Vr = "dismissableLayer.update", Hl = "dismissableLayer.pointerDownOutside", zl = "dismissableLayer.focusOutside", Go, Va = p.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), Zn = p.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: r,
      onPointerDownOutside: o,
      onFocusOutside: a,
      onInteractOutside: s,
      onDismiss: i,
      ...c
    } = e, l = p.useContext(Va), [u, d] = p.useState(null), f = (u == null ? void 0 : u.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), [, m] = p.useState({}), y = ce(t, (O) => d(O)), g = Array.from(l.layers), [b] = [...l.layersWithOutsidePointerEventsDisabled].slice(-1), v = g.indexOf(b), x = u ? g.indexOf(u) : -1, w = l.layersWithOutsidePointerEventsDisabled.size > 0, M = x >= v, N = Gl((O) => {
      const _ = O.target, B = [...l.branches].some((I) => I.contains(_));
      !M || B || (o == null || o(O), s == null || s(O), O.defaultPrevented || i == null || i());
    }, f), C = Ul((O) => {
      const _ = O.target;
      [...l.branches].some((I) => I.contains(_)) || (a == null || a(O), s == null || s(O), O.defaultPrevented || i == null || i());
    }, f);
    return Bl((O) => {
      x === l.layers.size - 1 && (r == null || r(O), !O.defaultPrevented && i && (O.preventDefault(), i()));
    }, f), p.useEffect(() => {
      if (u)
        return n && (l.layersWithOutsidePointerEventsDisabled.size === 0 && (Go = f.body.style.pointerEvents, f.body.style.pointerEvents = "none"), l.layersWithOutsidePointerEventsDisabled.add(u)), l.layers.add(u), Uo(), () => {
          n && l.layersWithOutsidePointerEventsDisabled.size === 1 && (f.body.style.pointerEvents = Go);
        };
    }, [u, f, n, l]), p.useEffect(() => () => {
      u && (l.layers.delete(u), l.layersWithOutsidePointerEventsDisabled.delete(u), Uo());
    }, [u, l]), p.useEffect(() => {
      const O = () => m({});
      return document.addEventListener(Vr, O), () => document.removeEventListener(Vr, O);
    }, []), /* @__PURE__ */ h(
      re.div,
      {
        ...c,
        ref: y,
        style: {
          pointerEvents: w ? M ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: ee(e.onFocusCapture, C.onFocusCapture),
        onBlurCapture: ee(e.onBlurCapture, C.onBlurCapture),
        onPointerDownCapture: ee(
          e.onPointerDownCapture,
          N.onPointerDownCapture
        )
      }
    );
  }
);
Zn.displayName = Ll;
var jl = "DismissableLayerBranch", Vl = p.forwardRef((e, t) => {
  const n = p.useContext(Va), r = p.useRef(null), o = ce(t, r);
  return p.useEffect(() => {
    const a = r.current;
    if (a)
      return n.branches.add(a), () => {
        n.branches.delete(a);
      };
  }, [n.branches]), /* @__PURE__ */ h(re.div, { ...e, ref: o });
});
Vl.displayName = jl;
function Gl(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = At(e), r = p.useRef(!1), o = p.useRef(() => {
  });
  return p.useEffect(() => {
    const a = (i) => {
      if (i.target && !r.current) {
        let c = function() {
          Ga(
            Hl,
            n,
            l,
            { discrete: !0 }
          );
        };
        const l = { originalEvent: i };
        i.pointerType === "touch" ? (t.removeEventListener("click", o.current), o.current = c, t.addEventListener("click", o.current, { once: !0 })) : c();
      } else
        t.removeEventListener("click", o.current);
      r.current = !1;
    }, s = window.setTimeout(() => {
      t.addEventListener("pointerdown", a);
    }, 0);
    return () => {
      window.clearTimeout(s), t.removeEventListener("pointerdown", a), t.removeEventListener("click", o.current);
    };
  }, [t, n]), {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => r.current = !0
  };
}
function Ul(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = At(e), r = p.useRef(!1);
  return p.useEffect(() => {
    const o = (a) => {
      a.target && !r.current && Ga(zl, n, { originalEvent: a }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o);
  }, [t, n]), {
    onFocusCapture: () => r.current = !0,
    onBlurCapture: () => r.current = !1
  };
}
function Uo() {
  const e = new CustomEvent(Vr);
  document.dispatchEvent(e);
}
function Ga(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target, a = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && o.addEventListener(e, t, { once: !0 }), r ? Yl(o, a) : o.dispatchEvent(a);
}
var Or = 0;
function Ua() {
  p.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? qo()), document.body.insertAdjacentElement("beforeend", e[1] ?? qo()), Or++, () => {
      Or === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), Or--;
    };
  }, []);
}
function qo() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var Er = "focusScope.autoFocusOnMount", Pr = "focusScope.autoFocusOnUnmount", Xo = { bubbles: !1, cancelable: !0 }, ql = "FocusScope", oo = p.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: r = !1,
    onMountAutoFocus: o,
    onUnmountAutoFocus: a,
    ...s
  } = e, [i, c] = p.useState(null), l = At(o), u = At(a), d = p.useRef(null), f = ce(t, (g) => c(g)), m = p.useRef({
    paused: !1,
    pause() {
      this.paused = !0;
    },
    resume() {
      this.paused = !1;
    }
  }).current;
  p.useEffect(() => {
    if (r) {
      let g = function(w) {
        if (m.paused || !i) return;
        const M = w.target;
        i.contains(M) ? d.current = M : wt(d.current, { select: !0 });
      }, b = function(w) {
        if (m.paused || !i) return;
        const M = w.relatedTarget;
        M !== null && (i.contains(M) || wt(d.current, { select: !0 }));
      }, v = function(w) {
        if (document.activeElement === document.body)
          for (const N of w)
            N.removedNodes.length > 0 && wt(i);
      };
      document.addEventListener("focusin", g), document.addEventListener("focusout", b);
      const x = new MutationObserver(v);
      return i && x.observe(i, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", g), document.removeEventListener("focusout", b), x.disconnect();
      };
    }
  }, [r, i, m.paused]), p.useEffect(() => {
    if (i) {
      Qo.add(m);
      const g = document.activeElement;
      if (!i.contains(g)) {
        const v = new CustomEvent(Er, Xo);
        i.addEventListener(Er, l), i.dispatchEvent(v), v.defaultPrevented || (Xl(ed(qa(i)), { select: !0 }), document.activeElement === g && wt(i));
      }
      return () => {
        i.removeEventListener(Er, l), setTimeout(() => {
          const v = new CustomEvent(Pr, Xo);
          i.addEventListener(Pr, u), i.dispatchEvent(v), v.defaultPrevented || wt(g ?? document.body, { select: !0 }), i.removeEventListener(Pr, u), Qo.remove(m);
        }, 0);
      };
    }
  }, [i, l, u, m]);
  const y = p.useCallback(
    (g) => {
      if (!n && !r || m.paused) return;
      const b = g.key === "Tab" && !g.altKey && !g.ctrlKey && !g.metaKey, v = document.activeElement;
      if (b && v) {
        const x = g.currentTarget, [w, M] = Kl(x);
        w && M ? !g.shiftKey && v === M ? (g.preventDefault(), n && wt(w, { select: !0 })) : g.shiftKey && v === w && (g.preventDefault(), n && wt(M, { select: !0 })) : v === x && g.preventDefault();
      }
    },
    [n, r, m.paused]
  );
  return /* @__PURE__ */ h(re.div, { tabIndex: -1, ...s, ref: f, onKeyDown: y });
});
oo.displayName = ql;
function Xl(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if (wt(r, { select: t }), document.activeElement !== n) return;
}
function Kl(e) {
  const t = qa(e), n = Ko(t, e), r = Ko(t.reverse(), e);
  return [n, r];
}
function qa(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function Ko(e, t) {
  for (const n of e)
    if (!Ql(n, { upTo: t })) return n;
}
function Ql(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function Zl(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function wt(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && Zl(e) && t && e.select();
  }
}
var Qo = Jl();
function Jl() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && (n == null || n.pause()), e = Zo(e, t), e.unshift(t);
    },
    remove(t) {
      var n;
      e = Zo(e, t), (n = e[0]) == null || n.resume();
    }
  };
}
function Zo(e, t) {
  const n = [...e], r = n.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
function ed(e) {
  return e.filter((t) => t.tagName !== "A");
}
var ut = globalThis != null && globalThis.document ? p.useLayoutEffect : () => {
}, td = p[" useId ".trim().toString()] || (() => {
}), nd = 0;
function Ct(e) {
  const [t, n] = p.useState(td());
  return ut(() => {
    n((r) => r ?? String(nd++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
const rd = ["top", "right", "bottom", "left"], Mt = Math.min, Re = Math.max, Gn = Math.round, In = Math.floor, et = (e) => ({
  x: e,
  y: e
}), od = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, ad = {
  start: "end",
  end: "start"
};
function Gr(e, t, n) {
  return Re(e, Mt(t, n));
}
function ft(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function ht(e) {
  return e.split("-")[0];
}
function nn(e) {
  return e.split("-")[1];
}
function ao(e) {
  return e === "x" ? "y" : "x";
}
function so(e) {
  return e === "y" ? "height" : "width";
}
const sd = /* @__PURE__ */ new Set(["top", "bottom"]);
function Ze(e) {
  return sd.has(ht(e)) ? "y" : "x";
}
function io(e) {
  return ao(Ze(e));
}
function id(e, t, n) {
  n === void 0 && (n = !1);
  const r = nn(e), o = io(e), a = so(o);
  let s = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[a] > t.floating[a] && (s = Un(s)), [s, Un(s)];
}
function cd(e) {
  const t = Un(e);
  return [Ur(e), t, Ur(t)];
}
function Ur(e) {
  return e.replace(/start|end/g, (t) => ad[t]);
}
const Jo = ["left", "right"], ea = ["right", "left"], ld = ["top", "bottom"], dd = ["bottom", "top"];
function ud(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? ea : Jo : t ? Jo : ea;
    case "left":
    case "right":
      return t ? ld : dd;
    default:
      return [];
  }
}
function fd(e, t, n, r) {
  const o = nn(e);
  let a = ud(ht(e), n === "start", r);
  return o && (a = a.map((s) => s + "-" + o), t && (a = a.concat(a.map(Ur)))), a;
}
function Un(e) {
  return e.replace(/left|right|bottom|top/g, (t) => od[t]);
}
function hd(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Xa(e) {
  return typeof e != "number" ? hd(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function qn(e) {
  const {
    x: t,
    y: n,
    width: r,
    height: o
  } = e;
  return {
    width: r,
    height: o,
    top: n,
    left: t,
    right: t + r,
    bottom: n + o,
    x: t,
    y: n
  };
}
function ta(e, t, n) {
  let {
    reference: r,
    floating: o
  } = e;
  const a = Ze(t), s = io(t), i = so(s), c = ht(t), l = a === "y", u = r.x + r.width / 2 - o.width / 2, d = r.y + r.height / 2 - o.height / 2, f = r[i] / 2 - o[i] / 2;
  let m;
  switch (c) {
    case "top":
      m = {
        x: u,
        y: r.y - o.height
      };
      break;
    case "bottom":
      m = {
        x: u,
        y: r.y + r.height
      };
      break;
    case "right":
      m = {
        x: r.x + r.width,
        y: d
      };
      break;
    case "left":
      m = {
        x: r.x - o.width,
        y: d
      };
      break;
    default:
      m = {
        x: r.x,
        y: r.y
      };
  }
  switch (nn(t)) {
    case "start":
      m[s] -= f * (n && l ? -1 : 1);
      break;
    case "end":
      m[s] += f * (n && l ? -1 : 1);
      break;
  }
  return m;
}
const md = async (e, t, n) => {
  const {
    placement: r = "bottom",
    strategy: o = "absolute",
    middleware: a = [],
    platform: s
  } = n, i = a.filter(Boolean), c = await (s.isRTL == null ? void 0 : s.isRTL(t));
  let l = await s.getElementRects({
    reference: e,
    floating: t,
    strategy: o
  }), {
    x: u,
    y: d
  } = ta(l, r, c), f = r, m = {}, y = 0;
  for (let g = 0; g < i.length; g++) {
    const {
      name: b,
      fn: v
    } = i[g], {
      x,
      y: w,
      data: M,
      reset: N
    } = await v({
      x: u,
      y: d,
      initialPlacement: r,
      placement: f,
      strategy: o,
      middlewareData: m,
      rects: l,
      platform: s,
      elements: {
        reference: e,
        floating: t
      }
    });
    u = x ?? u, d = w ?? d, m = {
      ...m,
      [b]: {
        ...m[b],
        ...M
      }
    }, N && y <= 50 && (y++, typeof N == "object" && (N.placement && (f = N.placement), N.rects && (l = N.rects === !0 ? await s.getElementRects({
      reference: e,
      floating: t,
      strategy: o
    }) : N.rects), {
      x: u,
      y: d
    } = ta(l, f, c)), g = -1);
  }
  return {
    x: u,
    y: d,
    placement: f,
    strategy: o,
    middlewareData: m
  };
};
async function gn(e, t) {
  var n;
  t === void 0 && (t = {});
  const {
    x: r,
    y: o,
    platform: a,
    rects: s,
    elements: i,
    strategy: c
  } = e, {
    boundary: l = "clippingAncestors",
    rootBoundary: u = "viewport",
    elementContext: d = "floating",
    altBoundary: f = !1,
    padding: m = 0
  } = ft(t, e), y = Xa(m), b = i[f ? d === "floating" ? "reference" : "floating" : d], v = qn(await a.getClippingRect({
    element: (n = await (a.isElement == null ? void 0 : a.isElement(b))) == null || n ? b : b.contextElement || await (a.getDocumentElement == null ? void 0 : a.getDocumentElement(i.floating)),
    boundary: l,
    rootBoundary: u,
    strategy: c
  })), x = d === "floating" ? {
    x: r,
    y: o,
    width: s.floating.width,
    height: s.floating.height
  } : s.reference, w = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(i.floating)), M = await (a.isElement == null ? void 0 : a.isElement(w)) ? await (a.getScale == null ? void 0 : a.getScale(w)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, N = qn(a.convertOffsetParentRelativeRectToViewportRelativeRect ? await a.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: i,
    rect: x,
    offsetParent: w,
    strategy: c
  }) : x);
  return {
    top: (v.top - N.top + y.top) / M.y,
    bottom: (N.bottom - v.bottom + y.bottom) / M.y,
    left: (v.left - N.left + y.left) / M.x,
    right: (N.right - v.right + y.right) / M.x
  };
}
const pd = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      x: n,
      y: r,
      placement: o,
      rects: a,
      platform: s,
      elements: i,
      middlewareData: c
    } = t, {
      element: l,
      padding: u = 0
    } = ft(e, t) || {};
    if (l == null)
      return {};
    const d = Xa(u), f = {
      x: n,
      y: r
    }, m = io(o), y = so(m), g = await s.getDimensions(l), b = m === "y", v = b ? "top" : "left", x = b ? "bottom" : "right", w = b ? "clientHeight" : "clientWidth", M = a.reference[y] + a.reference[m] - f[m] - a.floating[y], N = f[m] - a.reference[m], C = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(l));
    let O = C ? C[w] : 0;
    (!O || !await (s.isElement == null ? void 0 : s.isElement(C))) && (O = i.floating[w] || a.floating[y]);
    const _ = M / 2 - N / 2, B = O / 2 - g[y] / 2 - 1, I = Mt(d[v], B), F = Mt(d[x], B), T = I, Y = O - g[y] - F, D = O / 2 - g[y] / 2 + _, R = Gr(T, D, Y), S = !c.arrow && nn(o) != null && D !== R && a.reference[y] / 2 - (D < T ? I : F) - g[y] / 2 < 0, A = S ? D < T ? D - T : D - Y : 0;
    return {
      [m]: f[m] + A,
      data: {
        [m]: R,
        centerOffset: D - R - A,
        ...S && {
          alignmentOffset: A
        }
      },
      reset: S
    };
  }
}), gd = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var n, r;
      const {
        placement: o,
        middlewareData: a,
        rects: s,
        initialPlacement: i,
        platform: c,
        elements: l
      } = t, {
        mainAxis: u = !0,
        crossAxis: d = !0,
        fallbackPlacements: f,
        fallbackStrategy: m = "bestFit",
        fallbackAxisSideDirection: y = "none",
        flipAlignment: g = !0,
        ...b
      } = ft(e, t);
      if ((n = a.arrow) != null && n.alignmentOffset)
        return {};
      const v = ht(o), x = Ze(i), w = ht(i) === i, M = await (c.isRTL == null ? void 0 : c.isRTL(l.floating)), N = f || (w || !g ? [Un(i)] : cd(i)), C = y !== "none";
      !f && C && N.push(...fd(i, g, y, M));
      const O = [i, ...N], _ = await gn(t, b), B = [];
      let I = ((r = a.flip) == null ? void 0 : r.overflows) || [];
      if (u && B.push(_[v]), d) {
        const D = id(o, s, M);
        B.push(_[D[0]], _[D[1]]);
      }
      if (I = [...I, {
        placement: o,
        overflows: B
      }], !B.every((D) => D <= 0)) {
        var F, T;
        const D = (((F = a.flip) == null ? void 0 : F.index) || 0) + 1, R = O[D];
        if (R && (!(d === "alignment" ? x !== Ze(R) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        I.every((E) => Ze(E.placement) === x ? E.overflows[0] > 0 : !0)))
          return {
            data: {
              index: D,
              overflows: I
            },
            reset: {
              placement: R
            }
          };
        let S = (T = I.filter((A) => A.overflows[0] <= 0).sort((A, E) => A.overflows[1] - E.overflows[1])[0]) == null ? void 0 : T.placement;
        if (!S)
          switch (m) {
            case "bestFit": {
              var Y;
              const A = (Y = I.filter((E) => {
                if (C) {
                  const W = Ze(E.placement);
                  return W === x || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  W === "y";
                }
                return !0;
              }).map((E) => [E.placement, E.overflows.filter((W) => W > 0).reduce((W, $) => W + $, 0)]).sort((E, W) => E[1] - W[1])[0]) == null ? void 0 : Y[0];
              A && (S = A);
              break;
            }
            case "initialPlacement":
              S = i;
              break;
          }
        if (o !== S)
          return {
            reset: {
              placement: S
            }
          };
      }
      return {};
    }
  };
};
function na(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function ra(e) {
  return rd.some((t) => e[t] >= 0);
}
const bd = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n
      } = t, {
        strategy: r = "referenceHidden",
        ...o
      } = ft(e, t);
      switch (r) {
        case "referenceHidden": {
          const a = await gn(t, {
            ...o,
            elementContext: "reference"
          }), s = na(a, n.reference);
          return {
            data: {
              referenceHiddenOffsets: s,
              referenceHidden: ra(s)
            }
          };
        }
        case "escaped": {
          const a = await gn(t, {
            ...o,
            altBoundary: !0
          }), s = na(a, n.floating);
          return {
            data: {
              escapedOffsets: s,
              escaped: ra(s)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, Ka = /* @__PURE__ */ new Set(["left", "top"]);
async function vd(e, t) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), s = ht(n), i = nn(n), c = Ze(n) === "y", l = Ka.has(s) ? -1 : 1, u = a && c ? -1 : 1, d = ft(t, e);
  let {
    mainAxis: f,
    crossAxis: m,
    alignmentAxis: y
  } = typeof d == "number" ? {
    mainAxis: d,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: d.mainAxis || 0,
    crossAxis: d.crossAxis || 0,
    alignmentAxis: d.alignmentAxis
  };
  return i && typeof y == "number" && (m = i === "end" ? y * -1 : y), c ? {
    x: m * u,
    y: f * l
  } : {
    x: f * l,
    y: m * u
  };
}
const yd = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var n, r;
      const {
        x: o,
        y: a,
        placement: s,
        middlewareData: i
      } = t, c = await vd(t, e);
      return s === ((n = i.offset) == null ? void 0 : n.placement) && (r = i.arrow) != null && r.alignmentOffset ? {} : {
        x: o + c.x,
        y: a + c.y,
        data: {
          ...c,
          placement: s
        }
      };
    }
  };
}, wd = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const {
        x: n,
        y: r,
        placement: o
      } = t, {
        mainAxis: a = !0,
        crossAxis: s = !1,
        limiter: i = {
          fn: (b) => {
            let {
              x: v,
              y: x
            } = b;
            return {
              x: v,
              y: x
            };
          }
        },
        ...c
      } = ft(e, t), l = {
        x: n,
        y: r
      }, u = await gn(t, c), d = Ze(ht(o)), f = ao(d);
      let m = l[f], y = l[d];
      if (a) {
        const b = f === "y" ? "top" : "left", v = f === "y" ? "bottom" : "right", x = m + u[b], w = m - u[v];
        m = Gr(x, m, w);
      }
      if (s) {
        const b = d === "y" ? "top" : "left", v = d === "y" ? "bottom" : "right", x = y + u[b], w = y - u[v];
        y = Gr(x, y, w);
      }
      const g = i.fn({
        ...t,
        [f]: m,
        [d]: y
      });
      return {
        ...g,
        data: {
          x: g.x - n,
          y: g.y - r,
          enabled: {
            [f]: a,
            [d]: s
          }
        }
      };
    }
  };
}, xd = function(e) {
  return e === void 0 && (e = {}), {
    options: e,
    fn(t) {
      const {
        x: n,
        y: r,
        placement: o,
        rects: a,
        middlewareData: s
      } = t, {
        offset: i = 0,
        mainAxis: c = !0,
        crossAxis: l = !0
      } = ft(e, t), u = {
        x: n,
        y: r
      }, d = Ze(o), f = ao(d);
      let m = u[f], y = u[d];
      const g = ft(i, t), b = typeof g == "number" ? {
        mainAxis: g,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...g
      };
      if (c) {
        const w = f === "y" ? "height" : "width", M = a.reference[f] - a.floating[w] + b.mainAxis, N = a.reference[f] + a.reference[w] - b.mainAxis;
        m < M ? m = M : m > N && (m = N);
      }
      if (l) {
        var v, x;
        const w = f === "y" ? "width" : "height", M = Ka.has(ht(o)), N = a.reference[d] - a.floating[w] + (M && ((v = s.offset) == null ? void 0 : v[d]) || 0) + (M ? 0 : b.crossAxis), C = a.reference[d] + a.reference[w] + (M ? 0 : ((x = s.offset) == null ? void 0 : x[d]) || 0) - (M ? b.crossAxis : 0);
        y < N ? y = N : y > C && (y = C);
      }
      return {
        [f]: m,
        [d]: y
      };
    }
  };
}, Cd = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(t) {
      var n, r;
      const {
        placement: o,
        rects: a,
        platform: s,
        elements: i
      } = t, {
        apply: c = () => {
        },
        ...l
      } = ft(e, t), u = await gn(t, l), d = ht(o), f = nn(o), m = Ze(o) === "y", {
        width: y,
        height: g
      } = a.floating;
      let b, v;
      d === "top" || d === "bottom" ? (b = d, v = f === (await (s.isRTL == null ? void 0 : s.isRTL(i.floating)) ? "start" : "end") ? "left" : "right") : (v = d, b = f === "end" ? "top" : "bottom");
      const x = g - u.top - u.bottom, w = y - u.left - u.right, M = Mt(g - u[b], x), N = Mt(y - u[v], w), C = !t.middlewareData.shift;
      let O = M, _ = N;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (_ = w), (r = t.middlewareData.shift) != null && r.enabled.y && (O = x), C && !f) {
        const I = Re(u.left, 0), F = Re(u.right, 0), T = Re(u.top, 0), Y = Re(u.bottom, 0);
        m ? _ = y - 2 * (I !== 0 || F !== 0 ? I + F : Re(u.left, u.right)) : O = g - 2 * (T !== 0 || Y !== 0 ? T + Y : Re(u.top, u.bottom));
      }
      await c({
        ...t,
        availableWidth: _,
        availableHeight: O
      });
      const B = await s.getDimensions(i.floating);
      return y !== B.width || g !== B.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function Jn() {
  return typeof window < "u";
}
function rn(e) {
  return Qa(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Te(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function nt(e) {
  var t;
  return (t = (Qa(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Qa(e) {
  return Jn() ? e instanceof Node || e instanceof Te(e).Node : !1;
}
function Le(e) {
  return Jn() ? e instanceof Element || e instanceof Te(e).Element : !1;
}
function tt(e) {
  return Jn() ? e instanceof HTMLElement || e instanceof Te(e).HTMLElement : !1;
}
function oa(e) {
  return !Jn() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Te(e).ShadowRoot;
}
const kd = /* @__PURE__ */ new Set(["inline", "contents"]);
function xn(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: o
  } = He(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !kd.has(o);
}
const Md = /* @__PURE__ */ new Set(["table", "td", "th"]);
function Nd(e) {
  return Md.has(rn(e));
}
const Sd = [":popover-open", ":modal"];
function er(e) {
  return Sd.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const Dd = ["transform", "translate", "scale", "rotate", "perspective"], Od = ["transform", "translate", "scale", "rotate", "perspective", "filter"], Ed = ["paint", "layout", "strict", "content"];
function co(e) {
  const t = lo(), n = Le(e) ? He(e) : e;
  return Dd.some((r) => n[r] ? n[r] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || Od.some((r) => (n.willChange || "").includes(r)) || Ed.some((r) => (n.contain || "").includes(r));
}
function Pd(e) {
  let t = Nt(e);
  for (; tt(t) && !Qt(t); ) {
    if (co(t))
      return t;
    if (er(t))
      return null;
    t = Nt(t);
  }
  return null;
}
function lo() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const Rd = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function Qt(e) {
  return Rd.has(rn(e));
}
function He(e) {
  return Te(e).getComputedStyle(e);
}
function tr(e) {
  return Le(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function Nt(e) {
  if (rn(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    oa(e) && e.host || // Fallback.
    nt(e)
  );
  return oa(t) ? t.host : t;
}
function Za(e) {
  const t = Nt(e);
  return Qt(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : tt(t) && xn(t) ? t : Za(t);
}
function bn(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = Za(e), a = o === ((r = e.ownerDocument) == null ? void 0 : r.body), s = Te(o);
  if (a) {
    const i = qr(s);
    return t.concat(s, s.visualViewport || [], xn(o) ? o : [], i && n ? bn(i) : []);
  }
  return t.concat(o, bn(o, [], n));
}
function qr(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function Ja(e) {
  const t = He(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const o = tt(e), a = o ? e.offsetWidth : n, s = o ? e.offsetHeight : r, i = Gn(n) !== a || Gn(r) !== s;
  return i && (n = a, r = s), {
    width: n,
    height: r,
    $: i
  };
}
function uo(e) {
  return Le(e) ? e : e.contextElement;
}
function qt(e) {
  const t = uo(e);
  if (!tt(t))
    return et(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: o,
    $: a
  } = Ja(t);
  let s = (a ? Gn(n.width) : n.width) / r, i = (a ? Gn(n.height) : n.height) / o;
  return (!s || !Number.isFinite(s)) && (s = 1), (!i || !Number.isFinite(i)) && (i = 1), {
    x: s,
    y: i
  };
}
const Td = /* @__PURE__ */ et(0);
function es(e) {
  const t = Te(e);
  return !lo() || !t.visualViewport ? Td : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function Ad(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== Te(e) ? !1 : t;
}
function _t(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), a = uo(e);
  let s = et(1);
  t && (r ? Le(r) && (s = qt(r)) : s = qt(e));
  const i = Ad(a, n, r) ? es(a) : et(0);
  let c = (o.left + i.x) / s.x, l = (o.top + i.y) / s.y, u = o.width / s.x, d = o.height / s.y;
  if (a) {
    const f = Te(a), m = r && Le(r) ? Te(r) : r;
    let y = f, g = qr(y);
    for (; g && r && m !== y; ) {
      const b = qt(g), v = g.getBoundingClientRect(), x = He(g), w = v.left + (g.clientLeft + parseFloat(x.paddingLeft)) * b.x, M = v.top + (g.clientTop + parseFloat(x.paddingTop)) * b.y;
      c *= b.x, l *= b.y, u *= b.x, d *= b.y, c += w, l += M, y = Te(g), g = qr(y);
    }
  }
  return qn({
    width: u,
    height: d,
    x: c,
    y: l
  });
}
function nr(e, t) {
  const n = tr(e).scrollLeft;
  return t ? t.left + n : _t(nt(e)).left + n;
}
function ts(e, t) {
  const n = e.getBoundingClientRect(), r = n.left + t.scrollLeft - nr(e, n), o = n.top + t.scrollTop;
  return {
    x: r,
    y: o
  };
}
function _d(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: r,
    strategy: o
  } = e;
  const a = o === "fixed", s = nt(r), i = t ? er(t.floating) : !1;
  if (r === s || i && a)
    return n;
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = et(1);
  const u = et(0), d = tt(r);
  if ((d || !d && !a) && ((rn(r) !== "body" || xn(s)) && (c = tr(r)), tt(r))) {
    const m = _t(r);
    l = qt(r), u.x = m.x + r.clientLeft, u.y = m.y + r.clientTop;
  }
  const f = s && !d && !a ? ts(s, c) : et(0);
  return {
    width: n.width * l.x,
    height: n.height * l.y,
    x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
    y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
  };
}
function Id(e) {
  return Array.from(e.getClientRects());
}
function Wd(e) {
  const t = nt(e), n = tr(e), r = e.ownerDocument.body, o = Re(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), a = Re(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let s = -n.scrollLeft + nr(e);
  const i = -n.scrollTop;
  return He(r).direction === "rtl" && (s += Re(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: a,
    x: s,
    y: i
  };
}
const aa = 25;
function $d(e, t) {
  const n = Te(e), r = nt(e), o = n.visualViewport;
  let a = r.clientWidth, s = r.clientHeight, i = 0, c = 0;
  if (o) {
    a = o.width, s = o.height;
    const u = lo();
    (!u || u && t === "fixed") && (i = o.offsetLeft, c = o.offsetTop);
  }
  const l = nr(r);
  if (l <= 0) {
    const u = r.ownerDocument, d = u.body, f = getComputedStyle(d), m = u.compatMode === "CSS1Compat" && parseFloat(f.marginLeft) + parseFloat(f.marginRight) || 0, y = Math.abs(r.clientWidth - d.clientWidth - m);
    y <= aa && (a -= y);
  } else l <= aa && (a += l);
  return {
    width: a,
    height: s,
    x: i,
    y: c
  };
}
const Fd = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function Yd(e, t) {
  const n = _t(e, !0, t === "fixed"), r = n.top + e.clientTop, o = n.left + e.clientLeft, a = tt(e) ? qt(e) : et(1), s = e.clientWidth * a.x, i = e.clientHeight * a.y, c = o * a.x, l = r * a.y;
  return {
    width: s,
    height: i,
    x: c,
    y: l
  };
}
function sa(e, t, n) {
  let r;
  if (t === "viewport")
    r = $d(e, n);
  else if (t === "document")
    r = Wd(nt(e));
  else if (Le(t))
    r = Yd(t, n);
  else {
    const o = es(e);
    r = {
      x: t.x - o.x,
      y: t.y - o.y,
      width: t.width,
      height: t.height
    };
  }
  return qn(r);
}
function ns(e, t) {
  const n = Nt(e);
  return n === t || !Le(n) || Qt(n) ? !1 : He(n).position === "fixed" || ns(n, t);
}
function Bd(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = bn(e, [], !1).filter((i) => Le(i) && rn(i) !== "body"), o = null;
  const a = He(e).position === "fixed";
  let s = a ? Nt(e) : e;
  for (; Le(s) && !Qt(s); ) {
    const i = He(s), c = co(s);
    !c && i.position === "fixed" && (o = null), (a ? !c && !o : !c && i.position === "static" && !!o && Fd.has(o.position) || xn(s) && !c && ns(e, s)) ? r = r.filter((u) => u !== s) : o = i, s = Nt(s);
  }
  return t.set(e, r), r;
}
function Ld(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = e;
  const s = [...n === "clippingAncestors" ? er(t) ? [] : Bd(t, this._c) : [].concat(n), r], i = s[0], c = s.reduce((l, u) => {
    const d = sa(t, u, o);
    return l.top = Re(d.top, l.top), l.right = Mt(d.right, l.right), l.bottom = Mt(d.bottom, l.bottom), l.left = Re(d.left, l.left), l;
  }, sa(t, i, o));
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top
  };
}
function Hd(e) {
  const {
    width: t,
    height: n
  } = Ja(e);
  return {
    width: t,
    height: n
  };
}
function zd(e, t, n) {
  const r = tt(t), o = nt(t), a = n === "fixed", s = _t(e, !0, a, t);
  let i = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = et(0);
  function l() {
    c.x = nr(o);
  }
  if (r || !r && !a)
    if ((rn(t) !== "body" || xn(o)) && (i = tr(t)), r) {
      const m = _t(t, !0, a, t);
      c.x = m.x + t.clientLeft, c.y = m.y + t.clientTop;
    } else o && l();
  a && !r && o && l();
  const u = o && !r && !a ? ts(o, i) : et(0), d = s.left + i.scrollLeft - c.x - u.x, f = s.top + i.scrollTop - c.y - u.y;
  return {
    x: d,
    y: f,
    width: s.width,
    height: s.height
  };
}
function Rr(e) {
  return He(e).position === "static";
}
function ia(e, t) {
  if (!tt(e) || He(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return nt(e) === n && (n = n.ownerDocument.body), n;
}
function rs(e, t) {
  const n = Te(e);
  if (er(e))
    return n;
  if (!tt(e)) {
    let o = Nt(e);
    for (; o && !Qt(o); ) {
      if (Le(o) && !Rr(o))
        return o;
      o = Nt(o);
    }
    return n;
  }
  let r = ia(e, t);
  for (; r && Nd(r) && Rr(r); )
    r = ia(r, t);
  return r && Qt(r) && Rr(r) && !co(r) ? n : r || Pd(e) || n;
}
const jd = async function(e) {
  const t = this.getOffsetParent || rs, n = this.getDimensions, r = await n(e.floating);
  return {
    reference: zd(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function Vd(e) {
  return He(e).direction === "rtl";
}
const Gd = {
  convertOffsetParentRelativeRectToViewportRelativeRect: _d,
  getDocumentElement: nt,
  getClippingRect: Ld,
  getOffsetParent: rs,
  getElementRects: jd,
  getClientRects: Id,
  getDimensions: Hd,
  getScale: qt,
  isElement: Le,
  isRTL: Vd
};
function os(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Ud(e, t) {
  let n = null, r;
  const o = nt(e);
  function a() {
    var i;
    clearTimeout(r), (i = n) == null || i.disconnect(), n = null;
  }
  function s(i, c) {
    i === void 0 && (i = !1), c === void 0 && (c = 1), a();
    const l = e.getBoundingClientRect(), {
      left: u,
      top: d,
      width: f,
      height: m
    } = l;
    if (i || t(), !f || !m)
      return;
    const y = In(d), g = In(o.clientWidth - (u + f)), b = In(o.clientHeight - (d + m)), v = In(u), w = {
      rootMargin: -y + "px " + -g + "px " + -b + "px " + -v + "px",
      threshold: Re(0, Mt(1, c)) || 1
    };
    let M = !0;
    function N(C) {
      const O = C[0].intersectionRatio;
      if (O !== c) {
        if (!M)
          return s();
        O ? s(!1, O) : r = setTimeout(() => {
          s(!1, 1e-7);
        }, 1e3);
      }
      O === 1 && !os(l, e.getBoundingClientRect()) && s(), M = !1;
    }
    try {
      n = new IntersectionObserver(N, {
        ...w,
        // Handle <iframe>s
        root: o.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(N, w);
    }
    n.observe(e);
  }
  return s(!0), a;
}
function qd(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: a = !0,
    elementResize: s = typeof ResizeObserver == "function",
    layoutShift: i = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = r, l = uo(e), u = o || a ? [...l ? bn(l) : [], ...bn(t)] : [];
  u.forEach((v) => {
    o && v.addEventListener("scroll", n, {
      passive: !0
    }), a && v.addEventListener("resize", n);
  });
  const d = l && i ? Ud(l, n) : null;
  let f = -1, m = null;
  s && (m = new ResizeObserver((v) => {
    let [x] = v;
    x && x.target === l && m && (m.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
      var w;
      (w = m) == null || w.observe(t);
    })), n();
  }), l && !c && m.observe(l), m.observe(t));
  let y, g = c ? _t(e) : null;
  c && b();
  function b() {
    const v = _t(e);
    g && !os(g, v) && n(), g = v, y = requestAnimationFrame(b);
  }
  return n(), () => {
    var v;
    u.forEach((x) => {
      o && x.removeEventListener("scroll", n), a && x.removeEventListener("resize", n);
    }), d == null || d(), (v = m) == null || v.disconnect(), m = null, c && cancelAnimationFrame(y);
  };
}
const Xd = yd, Kd = wd, Qd = gd, Zd = Cd, Jd = bd, ca = pd, eu = xd, tu = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: Gd,
    ...n
  }, a = {
    ...o.platform,
    _c: r
  };
  return md(e, t, {
    ...o,
    platform: a
  });
};
var nu = typeof document < "u", ru = function() {
}, zn = nu ? Aa : ru;
function Xn(e, t) {
  if (e === t)
    return !0;
  if (typeof e != typeof t)
    return !1;
  if (typeof e == "function" && e.toString() === t.toString())
    return !0;
  let n, r, o;
  if (e && t && typeof e == "object") {
    if (Array.isArray(e)) {
      if (n = e.length, n !== t.length) return !1;
      for (r = n; r-- !== 0; )
        if (!Xn(e[r], t[r]))
          return !1;
      return !0;
    }
    if (o = Object.keys(e), n = o.length, n !== Object.keys(t).length)
      return !1;
    for (r = n; r-- !== 0; )
      if (!{}.hasOwnProperty.call(t, o[r]))
        return !1;
    for (r = n; r-- !== 0; ) {
      const a = o[r];
      if (!(a === "_owner" && e.$$typeof) && !Xn(e[a], t[a]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function as(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function la(e, t) {
  const n = as(e);
  return Math.round(t * n) / n;
}
function Tr(e) {
  const t = p.useRef(e);
  return zn(() => {
    t.current = e;
  }), t;
}
function ou(e) {
  e === void 0 && (e = {});
  const {
    placement: t = "bottom",
    strategy: n = "absolute",
    middleware: r = [],
    platform: o,
    elements: {
      reference: a,
      floating: s
    } = {},
    transform: i = !0,
    whileElementsMounted: c,
    open: l
  } = e, [u, d] = p.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [f, m] = p.useState(r);
  Xn(f, r) || m(r);
  const [y, g] = p.useState(null), [b, v] = p.useState(null), x = p.useCallback((E) => {
    E !== C.current && (C.current = E, g(E));
  }, []), w = p.useCallback((E) => {
    E !== O.current && (O.current = E, v(E));
  }, []), M = a || y, N = s || b, C = p.useRef(null), O = p.useRef(null), _ = p.useRef(u), B = c != null, I = Tr(c), F = Tr(o), T = Tr(l), Y = p.useCallback(() => {
    if (!C.current || !O.current)
      return;
    const E = {
      placement: t,
      strategy: n,
      middleware: f
    };
    F.current && (E.platform = F.current), tu(C.current, O.current, E).then((W) => {
      const $ = {
        ...W,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: T.current !== !1
      };
      D.current && !Xn(_.current, $) && (_.current = $, _a.flushSync(() => {
        d($);
      }));
    });
  }, [f, t, n, F, T]);
  zn(() => {
    l === !1 && _.current.isPositioned && (_.current.isPositioned = !1, d((E) => ({
      ...E,
      isPositioned: !1
    })));
  }, [l]);
  const D = p.useRef(!1);
  zn(() => (D.current = !0, () => {
    D.current = !1;
  }), []), zn(() => {
    if (M && (C.current = M), N && (O.current = N), M && N) {
      if (I.current)
        return I.current(M, N, Y);
      Y();
    }
  }, [M, N, Y, I, B]);
  const R = p.useMemo(() => ({
    reference: C,
    floating: O,
    setReference: x,
    setFloating: w
  }), [x, w]), S = p.useMemo(() => ({
    reference: M,
    floating: N
  }), [M, N]), A = p.useMemo(() => {
    const E = {
      position: n,
      left: 0,
      top: 0
    };
    if (!S.floating)
      return E;
    const W = la(S.floating, u.x), $ = la(S.floating, u.y);
    return i ? {
      ...E,
      transform: "translate(" + W + "px, " + $ + "px)",
      ...as(S.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: W,
      top: $
    };
  }, [n, i, S.floating, u.x, u.y]);
  return p.useMemo(() => ({
    ...u,
    update: Y,
    refs: R,
    elements: S,
    floatingStyles: A
  }), [u, Y, R, S, A]);
}
const au = (e) => {
  function t(n) {
    return {}.hasOwnProperty.call(n, "current");
  }
  return {
    name: "arrow",
    options: e,
    fn(n) {
      const {
        element: r,
        padding: o
      } = typeof e == "function" ? e(n) : e;
      return r && t(r) ? r.current != null ? ca({
        element: r.current,
        padding: o
      }).fn(n) : {} : r ? ca({
        element: r,
        padding: o
      }).fn(n) : {};
    }
  };
}, su = (e, t) => ({
  ...Xd(e),
  options: [e, t]
}), iu = (e, t) => ({
  ...Kd(e),
  options: [e, t]
}), cu = (e, t) => ({
  ...eu(e),
  options: [e, t]
}), lu = (e, t) => ({
  ...Qd(e),
  options: [e, t]
}), du = (e, t) => ({
  ...Zd(e),
  options: [e, t]
}), uu = (e, t) => ({
  ...Jd(e),
  options: [e, t]
}), fu = (e, t) => ({
  ...au(e),
  options: [e, t]
});
var hu = "Arrow", ss = p.forwardRef((e, t) => {
  const { children: n, width: r = 10, height: o = 5, ...a } = e;
  return /* @__PURE__ */ h(
    re.svg,
    {
      ...a,
      ref: t,
      width: r,
      height: o,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? n : /* @__PURE__ */ h("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
ss.displayName = hu;
var mu = ss;
function rr(e) {
  const [t, n] = p.useState(void 0);
  return ut(() => {
    if (e) {
      n({ width: e.offsetWidth, height: e.offsetHeight });
      const r = new ResizeObserver((o) => {
        if (!Array.isArray(o) || !o.length)
          return;
        const a = o[0];
        let s, i;
        if ("borderBoxSize" in a) {
          const c = a.borderBoxSize, l = Array.isArray(c) ? c[0] : c;
          s = l.inlineSize, i = l.blockSize;
        } else
          s = e.offsetWidth, i = e.offsetHeight;
        n({ width: s, height: i });
      });
      return r.observe(e, { box: "border-box" }), () => r.unobserve(e);
    } else
      n(void 0);
  }, [e]), t;
}
var fo = "Popper", [is, or] = Ie(fo), [pu, cs] = is(fo), ls = (e) => {
  const { __scopePopper: t, children: n } = e, [r, o] = p.useState(null);
  return /* @__PURE__ */ h(pu, { scope: t, anchor: r, onAnchorChange: o, children: n });
};
ls.displayName = fo;
var ds = "PopperAnchor", us = p.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: r, ...o } = e, a = cs(ds, n), s = p.useRef(null), i = ce(t, s), c = p.useRef(null);
    return p.useEffect(() => {
      const l = c.current;
      c.current = (r == null ? void 0 : r.current) || s.current, l !== c.current && a.onAnchorChange(c.current);
    }), r ? null : /* @__PURE__ */ h(re.div, { ...o, ref: i });
  }
);
us.displayName = ds;
var ho = "PopperContent", [gu, bu] = is(ho), fs = p.forwardRef(
  (e, t) => {
    var ue, Z, he, se, ge, ve;
    const {
      __scopePopper: n,
      side: r = "bottom",
      sideOffset: o = 0,
      align: a = "center",
      alignOffset: s = 0,
      arrowPadding: i = 0,
      avoidCollisions: c = !0,
      collisionBoundary: l = [],
      collisionPadding: u = 0,
      sticky: d = "partial",
      hideWhenDetached: f = !1,
      updatePositionStrategy: m = "optimized",
      onPlaced: y,
      ...g
    } = e, b = cs(ho, n), [v, x] = p.useState(null), w = ce(t, (De) => x(De)), [M, N] = p.useState(null), C = rr(M), O = (C == null ? void 0 : C.width) ?? 0, _ = (C == null ? void 0 : C.height) ?? 0, B = r + (a !== "center" ? "-" + a : ""), I = typeof u == "number" ? u : { top: 0, right: 0, bottom: 0, left: 0, ...u }, F = Array.isArray(l) ? l : [l], T = F.length > 0, Y = {
      padding: I,
      boundary: F.filter(yu),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: T
    }, { refs: D, floatingStyles: R, placement: S, isPositioned: A, middlewareData: E } = ou({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: B,
      whileElementsMounted: (...De) => qd(...De, {
        animationFrame: m === "always"
      }),
      elements: {
        reference: b.anchor
      },
      middleware: [
        su({ mainAxis: o + _, alignmentAxis: s }),
        c && iu({
          mainAxis: !0,
          crossAxis: !1,
          limiter: d === "partial" ? cu() : void 0,
          ...Y
        }),
        c && lu({ ...Y }),
        du({
          ...Y,
          apply: ({ elements: De, rects: mt, availableWidth: Wt, availableHeight: $t }) => {
            const { width: at, height: Ft } = mt.reference, xe = De.floating.style;
            xe.setProperty("--radix-popper-available-width", `${Wt}px`), xe.setProperty("--radix-popper-available-height", `${$t}px`), xe.setProperty("--radix-popper-anchor-width", `${at}px`), xe.setProperty("--radix-popper-anchor-height", `${Ft}px`);
          }
        }),
        M && fu({ element: M, padding: i }),
        wu({ arrowWidth: O, arrowHeight: _ }),
        f && uu({ strategy: "referenceHidden", ...Y })
      ]
    }), [W, $] = ps(S), z = At(y);
    ut(() => {
      A && (z == null || z());
    }, [A, z]);
    const te = (ue = E.arrow) == null ? void 0 : ue.x, H = (Z = E.arrow) == null ? void 0 : Z.y, q = ((he = E.arrow) == null ? void 0 : he.centerOffset) !== 0, [K, le] = p.useState();
    return ut(() => {
      v && le(window.getComputedStyle(v).zIndex);
    }, [v]), /* @__PURE__ */ h(
      "div",
      {
        ref: D.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...R,
          transform: A ? R.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: K,
          "--radix-popper-transform-origin": [
            (se = E.transformOrigin) == null ? void 0 : se.x,
            (ge = E.transformOrigin) == null ? void 0 : ge.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...((ve = E.hide) == null ? void 0 : ve.referenceHidden) && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: e.dir,
        children: /* @__PURE__ */ h(
          gu,
          {
            scope: n,
            placedSide: W,
            onArrowChange: N,
            arrowX: te,
            arrowY: H,
            shouldHideArrow: q,
            children: /* @__PURE__ */ h(
              re.div,
              {
                "data-side": W,
                "data-align": $,
                ...g,
                ref: w,
                style: {
                  ...g.style,
                  // if the PopperContent hasn't been placed yet (not all measurements done)
                  // we prevent animations so that users's animation don't kick in too early referring wrong sides
                  animation: A ? void 0 : "none"
                }
              }
            )
          }
        )
      }
    );
  }
);
fs.displayName = ho;
var hs = "PopperArrow", vu = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, ms = p.forwardRef(function(t, n) {
  const { __scopePopper: r, ...o } = t, a = bu(hs, r), s = vu[a.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ h(
      "span",
      {
        ref: a.onArrowChange,
        style: {
          position: "absolute",
          left: a.arrowX,
          top: a.arrowY,
          [s]: 0,
          transformOrigin: {
            top: "",
            right: "0 0",
            bottom: "center 0",
            left: "100% 0"
          }[a.placedSide],
          transform: {
            top: "translateY(100%)",
            right: "translateY(50%) rotate(90deg) translateX(-50%)",
            bottom: "rotate(180deg)",
            left: "translateY(50%) rotate(-90deg) translateX(50%)"
          }[a.placedSide],
          visibility: a.shouldHideArrow ? "hidden" : void 0
        },
        children: /* @__PURE__ */ h(
          mu,
          {
            ...o,
            ref: n,
            style: {
              ...o.style,
              // ensures the element can be measured correctly (mostly for if SVG)
              display: "block"
            }
          }
        )
      }
    )
  );
});
ms.displayName = hs;
function yu(e) {
  return e !== null;
}
var wu = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    var b, v, x;
    const { placement: n, rects: r, middlewareData: o } = t, s = ((b = o.arrow) == null ? void 0 : b.centerOffset) !== 0, i = s ? 0 : e.arrowWidth, c = s ? 0 : e.arrowHeight, [l, u] = ps(n), d = { start: "0%", center: "50%", end: "100%" }[u], f = (((v = o.arrow) == null ? void 0 : v.x) ?? 0) + i / 2, m = (((x = o.arrow) == null ? void 0 : x.y) ?? 0) + c / 2;
    let y = "", g = "";
    return l === "bottom" ? (y = s ? d : `${f}px`, g = `${-c}px`) : l === "top" ? (y = s ? d : `${f}px`, g = `${r.floating.height + c}px`) : l === "right" ? (y = `${-c}px`, g = s ? d : `${m}px`) : l === "left" && (y = `${r.floating.width + c}px`, g = s ? d : `${m}px`), { data: { x: y, y: g } };
  }
});
function ps(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var gs = ls, mo = us, bs = fs, vs = ms, xu = "Portal", ar = p.forwardRef((e, t) => {
  var i;
  const { container: n, ...r } = e, [o, a] = p.useState(!1);
  ut(() => a(!0), []);
  const s = n || o && ((i = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : i.body);
  return s ? Ia.createPortal(/* @__PURE__ */ h(re.div, { ...r, ref: t }), s) : null;
});
ar.displayName = xu;
function Cu(e, t) {
  return p.useReducer((n, r) => t[n][r] ?? n, e);
}
var ze = (e) => {
  const { present: t, children: n } = e, r = ku(t), o = typeof n == "function" ? n({ present: r.isPresent }) : p.Children.only(n), a = ce(r.ref, Mu(o));
  return typeof n == "function" || r.isPresent ? p.cloneElement(o, { ref: a }) : null;
};
ze.displayName = "Presence";
function ku(e) {
  const [t, n] = p.useState(), r = p.useRef(null), o = p.useRef(e), a = p.useRef("none"), s = e ? "mounted" : "unmounted", [i, c] = Cu(s, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  return p.useEffect(() => {
    const l = Wn(r.current);
    a.current = i === "mounted" ? l : "none";
  }, [i]), ut(() => {
    const l = r.current, u = o.current;
    if (u !== e) {
      const f = a.current, m = Wn(l);
      e ? c("MOUNT") : m === "none" || (l == null ? void 0 : l.display) === "none" ? c("UNMOUNT") : c(u && f !== m ? "ANIMATION_OUT" : "UNMOUNT"), o.current = e;
    }
  }, [e, c]), ut(() => {
    if (t) {
      let l;
      const u = t.ownerDocument.defaultView ?? window, d = (m) => {
        const g = Wn(r.current).includes(CSS.escape(m.animationName));
        if (m.target === t && g && (c("ANIMATION_END"), !o.current)) {
          const b = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", l = u.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = b);
          });
        }
      }, f = (m) => {
        m.target === t && (a.current = Wn(r.current));
      };
      return t.addEventListener("animationstart", f), t.addEventListener("animationcancel", d), t.addEventListener("animationend", d), () => {
        u.clearTimeout(l), t.removeEventListener("animationstart", f), t.removeEventListener("animationcancel", d), t.removeEventListener("animationend", d);
      };
    } else
      c("ANIMATION_END");
  }, [t, c]), {
    isPresent: ["mounted", "unmountSuspended"].includes(i),
    ref: p.useCallback((l) => {
      r.current = l ? getComputedStyle(l) : null, n(l);
    }, [])
  };
}
function Wn(e) {
  return (e == null ? void 0 : e.animationName) || "none";
}
function Mu(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var Nu = p[" useInsertionEffect ".trim().toString()] || ut;
function rt({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: r
}) {
  const [o, a, s] = Su({
    defaultProp: t,
    onChange: n
  }), i = e !== void 0, c = i ? e : o;
  {
    const u = p.useRef(e !== void 0);
    p.useEffect(() => {
      const d = u.current;
      d !== i && console.warn(
        `${r} is changing from ${d ? "controlled" : "uncontrolled"} to ${i ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), u.current = i;
    }, [i, r]);
  }
  const l = p.useCallback(
    (u) => {
      var d;
      if (i) {
        const f = Du(u) ? u(e) : u;
        f !== e && ((d = s.current) == null || d.call(s, f));
      } else
        a(u);
    },
    [i, e, a, s]
  );
  return [c, l];
}
function Su({
  defaultProp: e,
  onChange: t
}) {
  const [n, r] = p.useState(e), o = p.useRef(n), a = p.useRef(t);
  return Nu(() => {
    a.current = t;
  }, [t]), p.useEffect(() => {
    var s;
    o.current !== n && ((s = a.current) == null || s.call(a, n), o.current = n);
  }, [n, o]), [n, r, a];
}
function Du(e) {
  return typeof e == "function";
}
var Ou = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, Lt = /* @__PURE__ */ new WeakMap(), $n = /* @__PURE__ */ new WeakMap(), Fn = {}, Ar = 0, ys = function(e) {
  return e && (e.host || ys(e.parentNode));
}, Eu = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var r = ys(n);
    return r && e.contains(r) ? r : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, Pu = function(e, t, n, r) {
  var o = Eu(t, Array.isArray(e) ? e : [e]);
  Fn[n] || (Fn[n] = /* @__PURE__ */ new WeakMap());
  var a = Fn[n], s = [], i = /* @__PURE__ */ new Set(), c = new Set(o), l = function(d) {
    !d || i.has(d) || (i.add(d), l(d.parentNode));
  };
  o.forEach(l);
  var u = function(d) {
    !d || c.has(d) || Array.prototype.forEach.call(d.children, function(f) {
      if (i.has(f))
        u(f);
      else
        try {
          var m = f.getAttribute(r), y = m !== null && m !== "false", g = (Lt.get(f) || 0) + 1, b = (a.get(f) || 0) + 1;
          Lt.set(f, g), a.set(f, b), s.push(f), g === 1 && y && $n.set(f, !0), b === 1 && f.setAttribute(n, "true"), y || f.setAttribute(r, "true");
        } catch (v) {
          console.error("aria-hidden: cannot operate on ", f, v);
        }
    });
  };
  return u(t), i.clear(), Ar++, function() {
    s.forEach(function(d) {
      var f = Lt.get(d) - 1, m = a.get(d) - 1;
      Lt.set(d, f), a.set(d, m), f || ($n.has(d) || d.removeAttribute(r), $n.delete(d)), m || d.removeAttribute(n);
    }), Ar--, Ar || (Lt = /* @__PURE__ */ new WeakMap(), Lt = /* @__PURE__ */ new WeakMap(), $n = /* @__PURE__ */ new WeakMap(), Fn = {});
  };
}, ws = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var r = Array.from(Array.isArray(e) ? e : [e]), o = Ou(e);
  return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live], script"))), Pu(r, o, n, "aria-hidden")) : function() {
    return null;
  };
}, Xe = function() {
  return Xe = Object.assign || function(t) {
    for (var n, r = 1, o = arguments.length; r < o; r++) {
      n = arguments[r];
      for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (t[a] = n[a]);
    }
    return t;
  }, Xe.apply(this, arguments);
};
function xs(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  return n;
}
function Ru(e, t, n) {
  if (n || arguments.length === 2) for (var r = 0, o = t.length, a; r < o; r++)
    (a || !(r in t)) && (a || (a = Array.prototype.slice.call(t, 0, r)), a[r] = t[r]);
  return e.concat(a || Array.prototype.slice.call(t));
}
var jn = "right-scroll-bar-position", Vn = "width-before-scroll-bar", Tu = "with-scroll-bars-hidden", Au = "--removed-body-scroll-bar-size";
function _r(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function _u(e, t) {
  var n = ye(function() {
    return {
      // value
      value: e,
      // last callback
      callback: t,
      // "memoized" public interface
      facade: {
        get current() {
          return n.value;
        },
        set current(r) {
          var o = n.value;
          o !== r && (n.value = r, n.callback(r, o));
        }
      }
    };
  })[0];
  return n.callback = t, n.facade;
}
var Iu = typeof window < "u" ? p.useLayoutEffect : p.useEffect, da = /* @__PURE__ */ new WeakMap();
function Wu(e, t) {
  var n = _u(null, function(r) {
    return e.forEach(function(o) {
      return _r(o, r);
    });
  });
  return Iu(function() {
    var r = da.get(n);
    if (r) {
      var o = new Set(r), a = new Set(e), s = n.current;
      o.forEach(function(i) {
        a.has(i) || _r(i, null);
      }), a.forEach(function(i) {
        o.has(i) || _r(i, s);
      });
    }
    da.set(n, e);
  }, [e]), n;
}
function $u(e) {
  return e;
}
function Fu(e, t) {
  t === void 0 && (t = $u);
  var n = [], r = !1, o = {
    read: function() {
      if (r)
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      return n.length ? n[n.length - 1] : e;
    },
    useMedium: function(a) {
      var s = t(a, r);
      return n.push(s), function() {
        n = n.filter(function(i) {
          return i !== s;
        });
      };
    },
    assignSyncMedium: function(a) {
      for (r = !0; n.length; ) {
        var s = n;
        n = [], s.forEach(a);
      }
      n = {
        push: function(i) {
          return a(i);
        },
        filter: function() {
          return n;
        }
      };
    },
    assignMedium: function(a) {
      r = !0;
      var s = [];
      if (n.length) {
        var i = n;
        n = [], i.forEach(a), s = n;
      }
      var c = function() {
        var u = s;
        s = [], u.forEach(a);
      }, l = function() {
        return Promise.resolve().then(c);
      };
      l(), n = {
        push: function(u) {
          s.push(u), l();
        },
        filter: function(u) {
          return s = s.filter(u), n;
        }
      };
    }
  };
  return o;
}
function Yu(e) {
  e === void 0 && (e = {});
  var t = Fu(null);
  return t.options = Xe({ async: !0, ssr: !1 }, e), t;
}
var Cs = function(e) {
  var t = e.sideCar, n = xs(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = t.read();
  if (!r)
    throw new Error("Sidecar medium not found");
  return p.createElement(r, Xe({}, n));
};
Cs.isSideCarExport = !0;
function Bu(e, t) {
  return e.useMedium(t), Cs;
}
var ks = Yu(), Ir = function() {
}, sr = p.forwardRef(function(e, t) {
  var n = p.useRef(null), r = p.useState({
    onScrollCapture: Ir,
    onWheelCapture: Ir,
    onTouchMoveCapture: Ir
  }), o = r[0], a = r[1], s = e.forwardProps, i = e.children, c = e.className, l = e.removeScrollBar, u = e.enabled, d = e.shards, f = e.sideCar, m = e.noRelative, y = e.noIsolation, g = e.inert, b = e.allowPinchZoom, v = e.as, x = v === void 0 ? "div" : v, w = e.gapMode, M = xs(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), N = f, C = Wu([n, t]), O = Xe(Xe({}, M), o);
  return p.createElement(
    p.Fragment,
    null,
    u && p.createElement(N, { sideCar: ks, removeScrollBar: l, shards: d, noRelative: m, noIsolation: y, inert: g, setCallbacks: a, allowPinchZoom: !!b, lockRef: n, gapMode: w }),
    s ? p.cloneElement(p.Children.only(i), Xe(Xe({}, O), { ref: C })) : p.createElement(x, Xe({}, O, { className: c, ref: C }), i)
  );
});
sr.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
sr.classNames = {
  fullWidth: Vn,
  zeroRight: jn
};
var Lu = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function Hu() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = Lu();
  return t && e.setAttribute("nonce", t), e;
}
function zu(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function ju(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var Vu = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = Hu()) && (zu(t, n), ju(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, Gu = function() {
  var e = Vu();
  return function(t, n) {
    p.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, Ms = function() {
  var e = Gu(), t = function(n) {
    var r = n.styles, o = n.dynamic;
    return e(r, o), null;
  };
  return t;
}, Uu = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, Wr = function(e) {
  return parseInt(e || "", 10) || 0;
}, qu = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [Wr(n), Wr(r), Wr(o)];
}, Xu = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return Uu;
  var t = qu(e), n = document.documentElement.clientWidth, r = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, r - n + t[2] - t[0])
  };
}, Ku = Ms(), Xt = "data-scroll-locked", Qu = function(e, t, n, r) {
  var o = e.left, a = e.top, s = e.right, i = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(Tu, ` {
   overflow: hidden `).concat(r, `;
   padding-right: `).concat(i, "px ").concat(r, `;
  }
  body[`).concat(Xt, `] {
    overflow: hidden `).concat(r, `;
    overscroll-behavior: contain;
    `).concat([
    t && "position: relative ".concat(r, ";"),
    n === "margin" && `
    padding-left: `.concat(o, `px;
    padding-top: `).concat(a, `px;
    padding-right: `).concat(s, `px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(i, "px ").concat(r, `;
    `),
    n === "padding" && "padding-right: ".concat(i, "px ").concat(r, ";")
  ].filter(Boolean).join(""), `
  }
  
  .`).concat(jn, ` {
    right: `).concat(i, "px ").concat(r, `;
  }
  
  .`).concat(Vn, ` {
    margin-right: `).concat(i, "px ").concat(r, `;
  }
  
  .`).concat(jn, " .").concat(jn, ` {
    right: 0 `).concat(r, `;
  }
  
  .`).concat(Vn, " .").concat(Vn, ` {
    margin-right: 0 `).concat(r, `;
  }
  
  body[`).concat(Xt, `] {
    `).concat(Au, ": ").concat(i, `px;
  }
`);
}, ua = function() {
  var e = parseInt(document.body.getAttribute(Xt) || "0", 10);
  return isFinite(e) ? e : 0;
}, Zu = function() {
  p.useEffect(function() {
    return document.body.setAttribute(Xt, (ua() + 1).toString()), function() {
      var e = ua() - 1;
      e <= 0 ? document.body.removeAttribute(Xt) : document.body.setAttribute(Xt, e.toString());
    };
  }, []);
}, Ju = function(e) {
  var t = e.noRelative, n = e.noImportant, r = e.gapMode, o = r === void 0 ? "margin" : r;
  Zu();
  var a = p.useMemo(function() {
    return Xu(o);
  }, [o]);
  return p.createElement(Ku, { styles: Qu(a, !t, o, n ? "" : "!important") });
}, Xr = !1;
if (typeof window < "u")
  try {
    var Yn = Object.defineProperty({}, "passive", {
      get: function() {
        return Xr = !0, !0;
      }
    });
    window.addEventListener("test", Yn, Yn), window.removeEventListener("test", Yn, Yn);
  } catch {
    Xr = !1;
  }
var Ht = Xr ? { passive: !1 } : !1, ef = function(e) {
  return e.tagName === "TEXTAREA";
}, Ns = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !ef(e) && n[t] === "visible")
  );
}, tf = function(e) {
  return Ns(e, "overflowY");
}, nf = function(e) {
  return Ns(e, "overflowX");
}, fa = function(e, t) {
  var n = t.ownerDocument, r = t;
  do {
    typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
    var o = Ss(e, r);
    if (o) {
      var a = Ds(e, r), s = a[1], i = a[2];
      if (s > i)
        return !0;
    }
    r = r.parentNode;
  } while (r && r !== n.body);
  return !1;
}, rf = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, r = e.clientHeight;
  return [
    t,
    n,
    r
  ];
}, of = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, r = e.clientWidth;
  return [
    t,
    n,
    r
  ];
}, Ss = function(e, t) {
  return e === "v" ? tf(t) : nf(t);
}, Ds = function(e, t) {
  return e === "v" ? rf(t) : of(t);
}, af = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, sf = function(e, t, n, r, o) {
  var a = af(e, window.getComputedStyle(t).direction), s = a * r, i = n.target, c = t.contains(i), l = !1, u = s > 0, d = 0, f = 0;
  do {
    if (!i)
      break;
    var m = Ds(e, i), y = m[0], g = m[1], b = m[2], v = g - b - a * y;
    (y || v) && Ss(e, i) && (d += v, f += y);
    var x = i.parentNode;
    i = x && x.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? x.host : x;
  } while (
    // portaled content
    !c && i !== document.body || // self content
    c && (t.contains(i) || t === i)
  );
  return (u && Math.abs(d) < 1 || !u && Math.abs(f) < 1) && (l = !0), l;
}, Bn = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, ha = function(e) {
  return [e.deltaX, e.deltaY];
}, ma = function(e) {
  return e && "current" in e ? e.current : e;
}, cf = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, lf = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, df = 0, zt = [];
function uf(e) {
  var t = p.useRef([]), n = p.useRef([0, 0]), r = p.useRef(), o = p.useState(df++)[0], a = p.useState(Ms)[0], s = p.useRef(e);
  p.useEffect(function() {
    s.current = e;
  }, [e]), p.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var g = Ru([e.lockRef.current], (e.shards || []).map(ma), !0).filter(Boolean);
      return g.forEach(function(b) {
        return b.classList.add("allow-interactivity-".concat(o));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(o)), g.forEach(function(b) {
          return b.classList.remove("allow-interactivity-".concat(o));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var i = p.useCallback(function(g, b) {
    if ("touches" in g && g.touches.length === 2 || g.type === "wheel" && g.ctrlKey)
      return !s.current.allowPinchZoom;
    var v = Bn(g), x = n.current, w = "deltaX" in g ? g.deltaX : x[0] - v[0], M = "deltaY" in g ? g.deltaY : x[1] - v[1], N, C = g.target, O = Math.abs(w) > Math.abs(M) ? "h" : "v";
    if ("touches" in g && O === "h" && C.type === "range")
      return !1;
    var _ = fa(O, C);
    if (!_)
      return !0;
    if (_ ? N = O : (N = O === "v" ? "h" : "v", _ = fa(O, C)), !_)
      return !1;
    if (!r.current && "changedTouches" in g && (w || M) && (r.current = N), !N)
      return !0;
    var B = r.current || N;
    return sf(B, b, g, B === "h" ? w : M);
  }, []), c = p.useCallback(function(g) {
    var b = g;
    if (!(!zt.length || zt[zt.length - 1] !== a)) {
      var v = "deltaY" in b ? ha(b) : Bn(b), x = t.current.filter(function(N) {
        return N.name === b.type && (N.target === b.target || b.target === N.shadowParent) && cf(N.delta, v);
      })[0];
      if (x && x.should) {
        b.cancelable && b.preventDefault();
        return;
      }
      if (!x) {
        var w = (s.current.shards || []).map(ma).filter(Boolean).filter(function(N) {
          return N.contains(b.target);
        }), M = w.length > 0 ? i(b, w[0]) : !s.current.noIsolation;
        M && b.cancelable && b.preventDefault();
      }
    }
  }, []), l = p.useCallback(function(g, b, v, x) {
    var w = { name: g, delta: b, target: v, should: x, shadowParent: ff(v) };
    t.current.push(w), setTimeout(function() {
      t.current = t.current.filter(function(M) {
        return M !== w;
      });
    }, 1);
  }, []), u = p.useCallback(function(g) {
    n.current = Bn(g), r.current = void 0;
  }, []), d = p.useCallback(function(g) {
    l(g.type, ha(g), g.target, i(g, e.lockRef.current));
  }, []), f = p.useCallback(function(g) {
    l(g.type, Bn(g), g.target, i(g, e.lockRef.current));
  }, []);
  p.useEffect(function() {
    return zt.push(a), e.setCallbacks({
      onScrollCapture: d,
      onWheelCapture: d,
      onTouchMoveCapture: f
    }), document.addEventListener("wheel", c, Ht), document.addEventListener("touchmove", c, Ht), document.addEventListener("touchstart", u, Ht), function() {
      zt = zt.filter(function(g) {
        return g !== a;
      }), document.removeEventListener("wheel", c, Ht), document.removeEventListener("touchmove", c, Ht), document.removeEventListener("touchstart", u, Ht);
    };
  }, []);
  var m = e.removeScrollBar, y = e.inert;
  return p.createElement(
    p.Fragment,
    null,
    y ? p.createElement(a, { styles: lf(o) }) : null,
    m ? p.createElement(Ju, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function ff(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const hf = Bu(ks, uf);
var po = p.forwardRef(function(e, t) {
  return p.createElement(sr, Xe({}, e, { ref: t, sideCar: hf }));
});
po.classNames = sr.classNames;
var ir = "Popover", [Os] = Ie(ir, [
  or
]), Cn = or(), [mf, Dt] = Os(ir), Es = (e) => {
  const {
    __scopePopover: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: a,
    modal: s = !1
  } = e, i = Cn(t), c = p.useRef(null), [l, u] = p.useState(!1), [d, f] = rt({
    prop: r,
    defaultProp: o ?? !1,
    onChange: a,
    caller: ir
  });
  return /* @__PURE__ */ h(gs, { ...i, children: /* @__PURE__ */ h(
    mf,
    {
      scope: t,
      contentId: Ct(),
      triggerRef: c,
      open: d,
      onOpenChange: f,
      onOpenToggle: p.useCallback(() => f((m) => !m), [f]),
      hasCustomAnchor: l,
      onCustomAnchorAdd: p.useCallback(() => u(!0), []),
      onCustomAnchorRemove: p.useCallback(() => u(!1), []),
      modal: s,
      children: n
    }
  ) });
};
Es.displayName = ir;
var Ps = "PopoverAnchor", pf = p.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = Dt(Ps, n), a = Cn(n), { onCustomAnchorAdd: s, onCustomAnchorRemove: i } = o;
    return p.useEffect(() => (s(), () => i()), [s, i]), /* @__PURE__ */ h(mo, { ...a, ...r, ref: t });
  }
);
pf.displayName = Ps;
var Rs = "PopoverTrigger", Ts = p.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = Dt(Rs, n), a = Cn(n), s = ce(t, o.triggerRef), i = /* @__PURE__ */ h(
      re.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": o.open,
        "aria-controls": o.contentId,
        "data-state": $s(o.open),
        ...r,
        ref: s,
        onClick: ee(e.onClick, o.onOpenToggle)
      }
    );
    return o.hasCustomAnchor ? i : /* @__PURE__ */ h(mo, { asChild: !0, ...a, children: i });
  }
);
Ts.displayName = Rs;
var go = "PopoverPortal", [gf, bf] = Os(go, {
  forceMount: void 0
}), As = (e) => {
  const { __scopePopover: t, forceMount: n, children: r, container: o } = e, a = Dt(go, t);
  return /* @__PURE__ */ h(gf, { scope: t, forceMount: n, children: /* @__PURE__ */ h(ze, { present: n || a.open, children: /* @__PURE__ */ h(ar, { asChild: !0, container: o, children: r }) }) });
};
As.displayName = go;
var Zt = "PopoverContent", _s = p.forwardRef(
  (e, t) => {
    const n = bf(Zt, e.__scopePopover), { forceMount: r = n.forceMount, ...o } = e, a = Dt(Zt, e.__scopePopover);
    return /* @__PURE__ */ h(ze, { present: r || a.open, children: a.modal ? /* @__PURE__ */ h(yf, { ...o, ref: t }) : /* @__PURE__ */ h(wf, { ...o, ref: t }) });
  }
);
_s.displayName = Zt;
var vf = /* @__PURE__ */ pn("PopoverContent.RemoveScroll"), yf = p.forwardRef(
  (e, t) => {
    const n = Dt(Zt, e.__scopePopover), r = p.useRef(null), o = ce(t, r), a = p.useRef(!1);
    return p.useEffect(() => {
      const s = r.current;
      if (s) return ws(s);
    }, []), /* @__PURE__ */ h(po, { as: vf, allowPinchZoom: !0, children: /* @__PURE__ */ h(
      Is,
      {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: ee(e.onCloseAutoFocus, (s) => {
          var i;
          s.preventDefault(), a.current || (i = n.triggerRef.current) == null || i.focus();
        }),
        onPointerDownOutside: ee(
          e.onPointerDownOutside,
          (s) => {
            const i = s.detail.originalEvent, c = i.button === 0 && i.ctrlKey === !0, l = i.button === 2 || c;
            a.current = l;
          },
          { checkForDefaultPrevented: !1 }
        ),
        onFocusOutside: ee(
          e.onFocusOutside,
          (s) => s.preventDefault(),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
), wf = p.forwardRef(
  (e, t) => {
    const n = Dt(Zt, e.__scopePopover), r = p.useRef(!1), o = p.useRef(!1);
    return /* @__PURE__ */ h(
      Is,
      {
        ...e,
        ref: t,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (a) => {
          var s, i;
          (s = e.onCloseAutoFocus) == null || s.call(e, a), a.defaultPrevented || (r.current || (i = n.triggerRef.current) == null || i.focus(), a.preventDefault()), r.current = !1, o.current = !1;
        },
        onInteractOutside: (a) => {
          var c, l;
          (c = e.onInteractOutside) == null || c.call(e, a), a.defaultPrevented || (r.current = !0, a.detail.originalEvent.type === "pointerdown" && (o.current = !0));
          const s = a.target;
          ((l = n.triggerRef.current) == null ? void 0 : l.contains(s)) && a.preventDefault(), a.detail.originalEvent.type === "focusin" && o.current && a.preventDefault();
        }
      }
    );
  }
), Is = p.forwardRef(
  (e, t) => {
    const {
      __scopePopover: n,
      trapFocus: r,
      onOpenAutoFocus: o,
      onCloseAutoFocus: a,
      disableOutsidePointerEvents: s,
      onEscapeKeyDown: i,
      onPointerDownOutside: c,
      onFocusOutside: l,
      onInteractOutside: u,
      ...d
    } = e, f = Dt(Zt, n), m = Cn(n);
    return Ua(), /* @__PURE__ */ h(
      oo,
      {
        asChild: !0,
        loop: !0,
        trapped: r,
        onMountAutoFocus: o,
        onUnmountAutoFocus: a,
        children: /* @__PURE__ */ h(
          Zn,
          {
            asChild: !0,
            disableOutsidePointerEvents: s,
            onInteractOutside: u,
            onEscapeKeyDown: i,
            onPointerDownOutside: c,
            onFocusOutside: l,
            onDismiss: () => f.onOpenChange(!1),
            children: /* @__PURE__ */ h(
              bs,
              {
                "data-state": $s(f.open),
                role: "dialog",
                id: f.contentId,
                ...m,
                ...d,
                ref: t,
                style: {
                  ...d.style,
                  "--radix-popover-content-transform-origin": "var(--radix-popper-transform-origin)",
                  "--radix-popover-content-available-width": "var(--radix-popper-available-width)",
                  "--radix-popover-content-available-height": "var(--radix-popper-available-height)",
                  "--radix-popover-trigger-width": "var(--radix-popper-anchor-width)",
                  "--radix-popover-trigger-height": "var(--radix-popper-anchor-height)"
                }
              }
            )
          }
        )
      }
    );
  }
), Ws = "PopoverClose", xf = p.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = Dt(Ws, n);
    return /* @__PURE__ */ h(
      re.button,
      {
        type: "button",
        ...r,
        ref: t,
        onClick: ee(e.onClick, () => o.onOpenChange(!1))
      }
    );
  }
);
xf.displayName = Ws;
var Cf = "PopoverArrow", kf = p.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = Cn(n);
    return /* @__PURE__ */ h(vs, { ...o, ...r, ref: t });
  }
);
kf.displayName = Cf;
function $s(e) {
  return e ? "open" : "closed";
}
var cr = Es, lr = Ts, dr = As, kn = _s;
const My = cr, Ny = lr, Mf = St(({ className: e, align: t = "end", sideOffset: n = 8, ...r }, o) => /* @__PURE__ */ h(dr, { children: /* @__PURE__ */ h(
  kn,
  {
    ref: o,
    align: t,
    sideOffset: n,
    className: P(
      "z-50 min-w-[200px] p-2",
      "border rounded-md border-cms-gray-200",
      "bg-cms-white shadow-lg",
      "animate-in fade-in-0 zoom-in-95",
      "data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0",
      "data-[state=closed]:zoom-out-95",
      "data-[side=bottom]:slide-in-from-top-2",
      "data-[side=left]:slide-in-from-right-2",
      "data-[side=right]:slide-in-from-left-2",
      "data-[side=top]:slide-in-from-bottom-2",
      e
    ),
    ...r
  }
) }));
Mf.displayName = kn.displayName;
const Nf = Se(
  P(
    "border-0 cursor-pointer flex w-full items-center gap-3 rounded-md px-3 py-2",
    "bg-white text-sm font-medium transition-colors",
    "hover:bg-cms-gray-100 active:bg-cms-gray-200",
    "disabled:pointer-events-none disabled:opacity-50"
  ),
  {
    variants: {
      variant: {
        default: "text-cms-foreground",
        destructive: "text-cms-red-400 hover:text-cms-red-500"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
), Sf = St(
  ({ className: e, variant: t, icon: n, children: r, ...o }, a) => /* @__PURE__ */ L(
    "button",
    {
      ref: a,
      className: P(Nf({ variant: t }), e),
      ...o,
      children: [
        n && /* @__PURE__ */ h("span", { className: "shrink-0", children: n }),
        r
      ]
    }
  )
);
Sf.displayName = "PopoverMenuItem";
const Df = Se("cms-font-pretendard cms-text-black", {
  variants: {
    variant: {
      h1: "text-3xl font-bold",
      h2: "text-2xl font-semibold",
      h3: "text-lg font-semibold",
      subtitle: "text-base font-medium",
      body: "text-sm font-normal",
      emphasis: "text-sm font-semibold",
      caption: "text-xs font-normal",
      price: "text-xs font-bold"
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right"
    },
    decoration: {
      underline: "underline",
      lineThrough: "line-through",
      none: "no-underline"
    }
  },
  defaultVariants: {
    variant: "body",
    align: "left"
  }
}), Of = k.forwardRef(
  ({
    className: e,
    variant: t,
    align: n,
    decoration: r,
    as: o = "p",
    children: a,
    ...s
  }, i) => /* @__PURE__ */ h(
    o,
    {
      className: P(Df({ variant: t, align: n, decoration: r }), e),
      ref: i,
      ...s,
      children: a
    }
  )
);
Of.displayName = "Text";
const pa = Se(
  P(
    "w-full box-border",
    "px-3 py-2",
    "rounded-cms-sm",
    "border border-solid",
    "font-normal leading-tight",
    "transition-colors duration-200",
    "outline-none",
    "text-md text-cms-black",
    "placeholder:text-cms-gray-500",
    "placeholder:text-md"
  ),
  {
    variants: {
      variant: {
        default: P(
          "bg-cms-white ",
          "border-cms-gray-450",
          "focus:border-cms-gray-800",
          "disabled:bg-cms-gray-150",
          "disabled:text-cms-gray-400",
          "disabled:cursor-not-allowed"
        ),
        error: P(
          "bg-cms-white",
          "border-cms-red-400",
          "focus:border-cms-red-500"
        )
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto"
      }
    },
    defaultVariants: {
      variant: "default",
      fullWidth: !0
    }
  }
), ga = Se("block text-md font-medium text-cms-black"), Ef = Se(
  "block text-sm font-medium text-cms-red-400 mt-1"
), Pf = Se(
  "block text-sm font-normal text-cms-gray-700 mt-1"
), Rf = k.forwardRef(
  ({
    className: e,
    variant: t,
    fullWidth: n,
    label: r,
    required: o,
    error: a,
    errorMessage: s,
    helperText: i,
    showCharCount: c,
    maxLength: l,
    value: u,
    defaultValue: d,
    onChange: f,
    id: m,
    labelLayout: y = "vertical",
    labelWidth: g = "120px",
    ...b
  }, v) => {
    const [x, w] = k.useState(
      u || d || ""
    ), M = m || `input-${Math.random().toString(36).substr(2, 9)}`, N = a ? "error" : t, C = u !== void 0 ? u : x, O = (C == null ? void 0 : C.length) || 0, _ = (F) => {
      u === void 0 && w(F.target.value), f == null || f(F);
    }, B = r || c && l, I = y === "horizontal";
    return /* @__PURE__ */ L("div", { className: P("w-full", !n && "w-auto"), children: [
      I && B ? /* @__PURE__ */ L("div", { className: "flex items-center gap-3", children: [
        r && /* @__PURE__ */ L(
          "label",
          {
            htmlFor: M,
            className: P(ga(), "mb-0 shrink-0"),
            style: { width: g },
            children: [
              r,
              o && /* @__PURE__ */ h("span", { className: "text-cms-red-400 ml-1", children: "*" })
            ]
          }
        ),
        /* @__PURE__ */ h("div", { className: "flex-1", children: /* @__PURE__ */ h(
          "input",
          {
            id: M,
            ref: v,
            className: P(
              pa({ variant: N, fullWidth: !0 }),
              e
            ),
            maxLength: l,
            value: u,
            defaultValue: d,
            onChange: _,
            required: o,
            ...b
          }
        ) }),
        c && l && /* @__PURE__ */ L("span", { className: "text-sm text-cms-gray-600 shrink-0", children: [
          O,
          " / ",
          l
        ] })
      ] }) : /* @__PURE__ */ L(Rt, { children: [
        B && /* @__PURE__ */ L("div", { className: "flex justify-between items-center mb-2", children: [
          r ? /* @__PURE__ */ L("label", { htmlFor: M, className: ga(), children: [
            r,
            o && /* @__PURE__ */ h("span", { className: "text-cms-red-400 ml-1", children: "*" })
          ] }) : /* @__PURE__ */ h("div", {}),
          c && l && /* @__PURE__ */ L("span", { className: "text-sm text-cms-gray-600", children: [
            O,
            " / ",
            l
          ] })
        ] }),
        /* @__PURE__ */ h(
          "input",
          {
            id: M,
            ref: v,
            className: P(
              pa({ variant: N, fullWidth: n }),
              e
            ),
            maxLength: l,
            value: u,
            defaultValue: d,
            onChange: _,
            required: o,
            ...b
          }
        )
      ] }),
      a && s && /* @__PURE__ */ h("span", { className: Ef(), children: s }),
      !a && i && /* @__PURE__ */ h("span", { className: Pf(), children: i })
    ] });
  }
);
Rf.displayName = "TextInput";
function Tf(e, t, n = "long") {
  return new Intl.DateTimeFormat("en-US", {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: "numeric",
    timeZone: e,
    timeZoneName: n
  }).format(t).split(/\s/g).slice(2).join(" ");
}
const $r = {}, hn = {};
function Pt(e, t) {
  try {
    const r = ($r[e] || ($r[e] = new Intl.DateTimeFormat("en-US", {
      timeZone: e,
      timeZoneName: "longOffset"
    }).format))(t).split("GMT")[1];
    return r in hn ? hn[r] : ba(r, r.split(":"));
  } catch {
    if (e in hn) return hn[e];
    const n = e == null ? void 0 : e.match(Af);
    return n ? ba(e, n.slice(1)) : NaN;
  }
}
const Af = /([+-]\d\d):?(\d\d)?/;
function ba(e, t) {
  const n = +(t[0] || 0), r = +(t[1] || 0), o = +(t[2] || 0) / 60;
  return hn[e] = n * 60 + r > 0 ? n * 60 + r + o : n * 60 - r - o;
}
class Je extends Date {
  //#region static
  constructor(...t) {
    super(), t.length > 1 && typeof t[t.length - 1] == "string" && (this.timeZone = t.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(Pt(this.timeZone, this)) ? this.setTime(NaN) : t.length ? typeof t[0] == "number" && (t.length === 1 || t.length === 2 && typeof t[1] != "number") ? this.setTime(t[0]) : typeof t[0] == "string" ? this.setTime(+new Date(t[0])) : t[0] instanceof Date ? this.setTime(+t[0]) : (this.setTime(+new Date(...t)), Fs(this), Kr(this)) : this.setTime(Date.now());
  }
  static tz(t, ...n) {
    return n.length ? new Je(...n, t) : new Je(Date.now(), t);
  }
  //#endregion
  //#region time zone
  withTimeZone(t) {
    return new Je(+this, t);
  }
  getTimezoneOffset() {
    const t = -Pt(this.timeZone, this);
    return t > 0 ? Math.floor(t) : Math.ceil(t);
  }
  //#endregion
  //#region time
  setTime(t) {
    return Date.prototype.setTime.apply(this, arguments), Kr(this), +this;
  }
  //#endregion
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new Je(+new Date(t), this.timeZone);
  }
  //#endregion
}
const va = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
  if (!va.test(e)) return;
  const t = e.replace(va, "$1UTC");
  Je.prototype[t] && (e.startsWith("get") ? Je.prototype[e] = function() {
    return this.internal[t]();
  } : (Je.prototype[e] = function() {
    return Date.prototype[t].apply(this.internal, arguments), _f(this), +this;
  }, Je.prototype[t] = function() {
    return Date.prototype[t].apply(this, arguments), Kr(this), +this;
  }));
});
function Kr(e) {
  e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - Math.round(-Pt(e.timeZone, e) * 60));
}
function _f(e) {
  Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), Fs(e);
}
function Fs(e) {
  const t = Pt(e.timeZone, e), n = t > 0 ? Math.floor(t) : Math.ceil(t), r = /* @__PURE__ */ new Date(+e);
  r.setUTCHours(r.getUTCHours() - 1);
  const o = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), a = -(/* @__PURE__ */ new Date(+r)).getTimezoneOffset(), s = o - a, i = Date.prototype.getHours.apply(e) !== e.internal.getUTCHours();
  s && i && e.internal.setUTCMinutes(e.internal.getUTCMinutes() + s);
  const c = o - n;
  c && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + c);
  const l = /* @__PURE__ */ new Date(+e);
  l.setUTCSeconds(0);
  const u = o > 0 ? l.getSeconds() : (l.getSeconds() - 60) % 60, d = Math.round(-(Pt(e.timeZone, e) * 60)) % 60;
  (d || u) && (e.internal.setUTCSeconds(e.internal.getUTCSeconds() + d), Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + d + u));
  const f = Pt(e.timeZone, e), m = f > 0 ? Math.floor(f) : Math.ceil(f), g = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - m, b = m !== n, v = g - c;
  if (b && v) {
    Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + v);
    const x = Pt(e.timeZone, e), w = x > 0 ? Math.floor(x) : Math.ceil(x), M = m - w;
    M && (e.internal.setUTCMinutes(e.internal.getUTCMinutes() + M), Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + M));
  }
}
class ke extends Je {
  //#region static
  static tz(t, ...n) {
    return n.length ? new ke(...n, t) : new ke(Date.now(), t);
  }
  //#endregion
  //#region representation
  toISOString() {
    const [t, n, r] = this.tzComponents(), o = `${t}${n}:${r}`;
    return this.internal.toISOString().slice(0, -1) + o;
  }
  toString() {
    return `${this.toDateString()} ${this.toTimeString()}`;
  }
  toDateString() {
    const [t, n, r, o] = this.internal.toUTCString().split(" ");
    return `${t == null ? void 0 : t.slice(0, -1)} ${r} ${n} ${o}`;
  }
  toTimeString() {
    const t = this.internal.toUTCString().split(" ")[4], [n, r, o] = this.tzComponents();
    return `${t} GMT${n}${r}${o} (${Tf(this.timeZone, this)})`;
  }
  toLocaleString(t, n) {
    return Date.prototype.toLocaleString.call(this, t, {
      ...n,
      timeZone: (n == null ? void 0 : n.timeZone) || this.timeZone
    });
  }
  toLocaleDateString(t, n) {
    return Date.prototype.toLocaleDateString.call(this, t, {
      ...n,
      timeZone: (n == null ? void 0 : n.timeZone) || this.timeZone
    });
  }
  toLocaleTimeString(t, n) {
    return Date.prototype.toLocaleTimeString.call(this, t, {
      ...n,
      timeZone: (n == null ? void 0 : n.timeZone) || this.timeZone
    });
  }
  //#endregion
  //#region private
  tzComponents() {
    const t = this.getTimezoneOffset(), n = t > 0 ? "-" : "+", r = String(Math.floor(Math.abs(t) / 60)).padStart(2, "0"), o = String(Math.abs(t) % 60).padStart(2, "0");
    return [n, r, o];
  }
  //#endregion
  withTimeZone(t) {
    return new ke(+this, t);
  }
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new ke(+new Date(t), this.timeZone);
  }
  //#endregion
}
const Ys = 6048e5, If = 864e5, ya = Symbol.for("constructDateFrom");
function pe(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && ya in e ? e[ya](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function ae(e, t) {
  return pe(t || e, e);
}
function Bs(e, t, n) {
  const r = ae(e, n == null ? void 0 : n.in);
  return isNaN(t) ? pe(e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
function Ls(e, t, n) {
  const r = ae(e, n == null ? void 0 : n.in);
  if (isNaN(t)) return pe(e, NaN);
  if (!t)
    return r;
  const o = r.getDate(), a = pe(e, r.getTime());
  a.setMonth(r.getMonth() + t + 1, 0);
  const s = a.getDate();
  return o >= s ? a : (r.setFullYear(
    a.getFullYear(),
    a.getMonth(),
    o
  ), r);
}
let Wf = {};
function Mn() {
  return Wf;
}
function Jt(e, t) {
  var i, c, l, u;
  const n = Mn(), r = (t == null ? void 0 : t.weekStartsOn) ?? ((c = (i = t == null ? void 0 : t.locale) == null ? void 0 : i.options) == null ? void 0 : c.weekStartsOn) ?? n.weekStartsOn ?? ((u = (l = n.locale) == null ? void 0 : l.options) == null ? void 0 : u.weekStartsOn) ?? 0, o = ae(e, t == null ? void 0 : t.in), a = o.getDay(), s = (a < r ? 7 : 0) + a - r;
  return o.setDate(o.getDate() - s), o.setHours(0, 0, 0, 0), o;
}
function vn(e, t) {
  return Jt(e, { ...t, weekStartsOn: 1 });
}
function Hs(e, t) {
  const n = ae(e, t == null ? void 0 : t.in), r = n.getFullYear(), o = pe(n, 0);
  o.setFullYear(r + 1, 0, 4), o.setHours(0, 0, 0, 0);
  const a = vn(o), s = pe(n, 0);
  s.setFullYear(r, 0, 4), s.setHours(0, 0, 0, 0);
  const i = vn(s);
  return n.getTime() >= a.getTime() ? r + 1 : n.getTime() >= i.getTime() ? r : r - 1;
}
function wa(e) {
  const t = ae(e), n = new Date(
    Date.UTC(
      t.getFullYear(),
      t.getMonth(),
      t.getDate(),
      t.getHours(),
      t.getMinutes(),
      t.getSeconds(),
      t.getMilliseconds()
    )
  );
  return n.setUTCFullYear(t.getFullYear()), +e - +n;
}
function on(e, ...t) {
  const n = pe.bind(
    null,
    t.find((r) => typeof r == "object")
  );
  return t.map(n);
}
function yn(e, t) {
  const n = ae(e, t == null ? void 0 : t.in);
  return n.setHours(0, 0, 0, 0), n;
}
function bo(e, t, n) {
  const [r, o] = on(
    n == null ? void 0 : n.in,
    e,
    t
  ), a = yn(r), s = yn(o), i = +a - wa(a), c = +s - wa(s);
  return Math.round((i - c) / If);
}
function $f(e, t) {
  const n = Hs(e, t), r = pe(e, 0);
  return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), vn(r);
}
function Ff(e, t, n) {
  return Bs(e, t * 7, n);
}
function Yf(e, t, n) {
  return Ls(e, t * 12, n);
}
function Bf(e, t) {
  let n, r = t == null ? void 0 : t.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = pe.bind(null, o));
    const a = ae(o, r);
    (!n || n < a || isNaN(+a)) && (n = a);
  }), pe(r, n || NaN);
}
function Lf(e, t) {
  let n, r = t == null ? void 0 : t.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = pe.bind(null, o));
    const a = ae(o, r);
    (!n || n > a || isNaN(+a)) && (n = a);
  }), pe(r, n || NaN);
}
function Hf(e, t, n) {
  const [r, o] = on(
    n == null ? void 0 : n.in,
    e,
    t
  );
  return +yn(r) == +yn(o);
}
function zs(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function zf(e) {
  return !(!zs(e) && typeof e != "number" || isNaN(+ae(e)));
}
function js(e, t, n) {
  const [r, o] = on(
    n == null ? void 0 : n.in,
    e,
    t
  ), a = r.getFullYear() - o.getFullYear(), s = r.getMonth() - o.getMonth();
  return a * 12 + s;
}
function jf(e, t) {
  const n = ae(e, t == null ? void 0 : t.in), r = n.getMonth();
  return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
function Vs(e, t) {
  const [n, r] = on(e, t.start, t.end);
  return { start: n, end: r };
}
function Vf(e, t) {
  const { start: n, end: r } = Vs(t == null ? void 0 : t.in, e);
  let o = +n > +r;
  const a = o ? +n : +r, s = o ? r : n;
  s.setHours(0, 0, 0, 0), s.setDate(1);
  let i = 1;
  const c = [];
  for (; +s <= a; )
    c.push(pe(n, s)), s.setMonth(s.getMonth() + i);
  return o ? c.reverse() : c;
}
function Gf(e, t) {
  const n = ae(e, t == null ? void 0 : t.in);
  return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function Uf(e, t) {
  const n = ae(e, t == null ? void 0 : t.in), r = n.getFullYear();
  return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
function Gs(e, t) {
  const n = ae(e, t == null ? void 0 : t.in);
  return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function qf(e, t) {
  const { start: n, end: r } = Vs(t == null ? void 0 : t.in, e);
  let o = +n > +r;
  const a = o ? +n : +r, s = o ? r : n;
  s.setHours(0, 0, 0, 0), s.setMonth(0, 1);
  let i = 1;
  const c = [];
  for (; +s <= a; )
    c.push(pe(n, s)), s.setFullYear(s.getFullYear() + i);
  return o ? c.reverse() : c;
}
function Us(e, t) {
  var i, c, l, u;
  const n = Mn(), r = (t == null ? void 0 : t.weekStartsOn) ?? ((c = (i = t == null ? void 0 : t.locale) == null ? void 0 : i.options) == null ? void 0 : c.weekStartsOn) ?? n.weekStartsOn ?? ((u = (l = n.locale) == null ? void 0 : l.options) == null ? void 0 : u.weekStartsOn) ?? 0, o = ae(e, t == null ? void 0 : t.in), a = o.getDay(), s = (a < r ? -7 : 0) + 6 - (a - r);
  return o.setDate(o.getDate() + s), o.setHours(23, 59, 59, 999), o;
}
function Xf(e, t) {
  return Us(e, { ...t, weekStartsOn: 1 });
}
const Kf = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
}, Qf = (e, t, n) => {
  let r;
  const o = Kf[e];
  return typeof o == "string" ? r = o : t === 1 ? r = o.one : r = o.other.replace("{{count}}", t.toString()), n != null && n.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
function Kt(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
const Zf = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, Jf = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, eh = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, th = {
  date: Kt({
    formats: Zf,
    defaultWidth: "full"
  }),
  time: Kt({
    formats: Jf,
    defaultWidth: "full"
  }),
  dateTime: Kt({
    formats: eh,
    defaultWidth: "full"
  })
}, nh = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, rh = (e, t, n, r) => nh[e];
function Ke(e) {
  return (t, n) => {
    const r = n != null && n.context ? String(n.context) : "standalone";
    let o;
    if (r === "formatting" && e.formattingValues) {
      const s = e.defaultFormattingWidth || e.defaultWidth, i = n != null && n.width ? String(n.width) : s;
      o = e.formattingValues[i] || e.formattingValues[s];
    } else {
      const s = e.defaultWidth, i = n != null && n.width ? String(n.width) : e.defaultWidth;
      o = e.values[i] || e.values[s];
    }
    const a = e.argumentCallback ? e.argumentCallback(t) : t;
    return o[a];
  };
}
const oh = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, ah = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, sh = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  wide: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
}, ih = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
}, ch = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
}, lh = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
}, dh = (e, t) => {
  const n = Number(e), r = n % 100;
  if (r > 20 || r < 10)
    switch (r % 10) {
      case 1:
        return n + "st";
      case 2:
        return n + "nd";
      case 3:
        return n + "rd";
    }
  return n + "th";
}, uh = {
  ordinalNumber: dh,
  era: Ke({
    values: oh,
    defaultWidth: "wide"
  }),
  quarter: Ke({
    values: ah,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: Ke({
    values: sh,
    defaultWidth: "wide"
  }),
  day: Ke({
    values: ih,
    defaultWidth: "wide"
  }),
  dayPeriod: Ke({
    values: ch,
    defaultWidth: "wide",
    formattingValues: lh,
    defaultFormattingWidth: "wide"
  })
};
function Qe(e) {
  return (t, n = {}) => {
    const r = n.width, o = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], a = t.match(o);
    if (!a)
      return null;
    const s = a[0], i = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], c = Array.isArray(i) ? hh(i, (d) => d.test(s)) : (
      // [TODO] -- I challenge you to fix the type
      fh(i, (d) => d.test(s))
    );
    let l;
    l = e.valueCallback ? e.valueCallback(c) : c, l = n.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      n.valueCallback(l)
    ) : l;
    const u = t.slice(s.length);
    return { value: l, rest: u };
  };
}
function fh(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function hh(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function qs(e) {
  return (t, n = {}) => {
    const r = t.match(e.matchPattern);
    if (!r) return null;
    const o = r[0], a = t.match(e.parsePattern);
    if (!a) return null;
    let s = e.valueCallback ? e.valueCallback(a[0]) : a[0];
    s = n.valueCallback ? n.valueCallback(s) : s;
    const i = t.slice(o.length);
    return { value: s, rest: i };
  };
}
const mh = /^(\d+)(th|st|nd|rd)?/i, ph = /\d+/i, gh = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, bh = {
  any: [/^b/i, /^(a|c)/i]
}, vh = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, yh = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, wh = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, xh = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
}, Ch = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, kh = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, Mh = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, Nh = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
}, Sh = {
  ordinalNumber: qs({
    matchPattern: mh,
    parsePattern: ph,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: Qe({
    matchPatterns: gh,
    defaultMatchWidth: "wide",
    parsePatterns: bh,
    defaultParseWidth: "any"
  }),
  quarter: Qe({
    matchPatterns: vh,
    defaultMatchWidth: "wide",
    parsePatterns: yh,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: Qe({
    matchPatterns: wh,
    defaultMatchWidth: "wide",
    parsePatterns: xh,
    defaultParseWidth: "any"
  }),
  day: Qe({
    matchPatterns: Ch,
    defaultMatchWidth: "wide",
    parsePatterns: kh,
    defaultParseWidth: "any"
  }),
  dayPeriod: Qe({
    matchPatterns: Mh,
    defaultMatchWidth: "any",
    parsePatterns: Nh,
    defaultParseWidth: "any"
  })
}, Gt = {
  code: "en-US",
  formatDistance: Qf,
  formatLong: th,
  formatRelative: rh,
  localize: uh,
  match: Sh,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function Dh(e, t) {
  const n = ae(e, t == null ? void 0 : t.in);
  return bo(n, Gs(n)) + 1;
}
function vo(e, t) {
  const n = ae(e, t == null ? void 0 : t.in), r = +vn(n) - +$f(n);
  return Math.round(r / Ys) + 1;
}
function Xs(e, t) {
  var u, d, f, m;
  const n = ae(e, t == null ? void 0 : t.in), r = n.getFullYear(), o = Mn(), a = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((d = (u = t == null ? void 0 : t.locale) == null ? void 0 : u.options) == null ? void 0 : d.firstWeekContainsDate) ?? o.firstWeekContainsDate ?? ((m = (f = o.locale) == null ? void 0 : f.options) == null ? void 0 : m.firstWeekContainsDate) ?? 1, s = pe((t == null ? void 0 : t.in) || e, 0);
  s.setFullYear(r + 1, 0, a), s.setHours(0, 0, 0, 0);
  const i = Jt(s, t), c = pe((t == null ? void 0 : t.in) || e, 0);
  c.setFullYear(r, 0, a), c.setHours(0, 0, 0, 0);
  const l = Jt(c, t);
  return +n >= +i ? r + 1 : +n >= +l ? r : r - 1;
}
function Oh(e, t) {
  var i, c, l, u;
  const n = Mn(), r = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((c = (i = t == null ? void 0 : t.locale) == null ? void 0 : i.options) == null ? void 0 : c.firstWeekContainsDate) ?? n.firstWeekContainsDate ?? ((u = (l = n.locale) == null ? void 0 : l.options) == null ? void 0 : u.firstWeekContainsDate) ?? 1, o = Xs(e, t), a = pe((t == null ? void 0 : t.in) || e, 0);
  return a.setFullYear(o, 0, r), a.setHours(0, 0, 0, 0), Jt(a, t);
}
function yo(e, t) {
  const n = ae(e, t == null ? void 0 : t.in), r = +Jt(n, t) - +Oh(n, t);
  return Math.round(r / Ys) + 1;
}
function oe(e, t) {
  const n = e < 0 ? "-" : "", r = Math.abs(e).toString().padStart(t, "0");
  return n + r;
}
const yt = {
  // Year
  y(e, t) {
    const n = e.getFullYear(), r = n > 0 ? n : 1 - n;
    return oe(t === "yy" ? r % 100 : r, t.length);
  },
  // Month
  M(e, t) {
    const n = e.getMonth();
    return t === "M" ? String(n + 1) : oe(n + 1, 2);
  },
  // Day of the month
  d(e, t) {
    return oe(e.getDate(), t.length);
  },
  // AM or PM
  a(e, t) {
    const n = e.getHours() / 12 >= 1 ? "pm" : "am";
    switch (t) {
      case "a":
      case "aa":
        return n.toUpperCase();
      case "aaa":
        return n;
      case "aaaaa":
        return n[0];
      case "aaaa":
      default:
        return n === "am" ? "a.m." : "p.m.";
    }
  },
  // Hour [1-12]
  h(e, t) {
    return oe(e.getHours() % 12 || 12, t.length);
  },
  // Hour [0-23]
  H(e, t) {
    return oe(e.getHours(), t.length);
  },
  // Minute
  m(e, t) {
    return oe(e.getMinutes(), t.length);
  },
  // Second
  s(e, t) {
    return oe(e.getSeconds(), t.length);
  },
  // Fraction of second
  S(e, t) {
    const n = t.length, r = e.getMilliseconds(), o = Math.trunc(
      r * Math.pow(10, n - 3)
    );
    return oe(o, t.length);
  }
}, jt = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, xa = {
  // Era
  G: function(e, t, n) {
    const r = e.getFullYear() > 0 ? 1 : 0;
    switch (t) {
      case "G":
      case "GG":
      case "GGG":
        return n.era(r, { width: "abbreviated" });
      case "GGGGG":
        return n.era(r, { width: "narrow" });
      case "GGGG":
      default:
        return n.era(r, { width: "wide" });
    }
  },
  // Year
  y: function(e, t, n) {
    if (t === "yo") {
      const r = e.getFullYear(), o = r > 0 ? r : 1 - r;
      return n.ordinalNumber(o, { unit: "year" });
    }
    return yt.y(e, t);
  },
  // Local week-numbering year
  Y: function(e, t, n, r) {
    const o = Xs(e, r), a = o > 0 ? o : 1 - o;
    if (t === "YY") {
      const s = a % 100;
      return oe(s, 2);
    }
    return t === "Yo" ? n.ordinalNumber(a, { unit: "year" }) : oe(a, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const n = Hs(e);
    return oe(n, t.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function(e, t) {
    const n = e.getFullYear();
    return oe(n, t.length);
  },
  // Quarter
  Q: function(e, t, n) {
    const r = Math.ceil((e.getMonth() + 1) / 3);
    switch (t) {
      case "Q":
        return String(r);
      case "QQ":
        return oe(r, 2);
      case "Qo":
        return n.ordinalNumber(r, { unit: "quarter" });
      case "QQQ":
        return n.quarter(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "QQQQQ":
        return n.quarter(r, {
          width: "narrow",
          context: "formatting"
        });
      case "QQQQ":
      default:
        return n.quarter(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone quarter
  q: function(e, t, n) {
    const r = Math.ceil((e.getMonth() + 1) / 3);
    switch (t) {
      case "q":
        return String(r);
      case "qq":
        return oe(r, 2);
      case "qo":
        return n.ordinalNumber(r, { unit: "quarter" });
      case "qqq":
        return n.quarter(r, {
          width: "abbreviated",
          context: "standalone"
        });
      case "qqqqq":
        return n.quarter(r, {
          width: "narrow",
          context: "standalone"
        });
      case "qqqq":
      default:
        return n.quarter(r, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Month
  M: function(e, t, n) {
    const r = e.getMonth();
    switch (t) {
      case "M":
      case "MM":
        return yt.M(e, t);
      case "Mo":
        return n.ordinalNumber(r + 1, { unit: "month" });
      case "MMM":
        return n.month(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "MMMMM":
        return n.month(r, {
          width: "narrow",
          context: "formatting"
        });
      case "MMMM":
      default:
        return n.month(r, { width: "wide", context: "formatting" });
    }
  },
  // Stand-alone month
  L: function(e, t, n) {
    const r = e.getMonth();
    switch (t) {
      case "L":
        return String(r + 1);
      case "LL":
        return oe(r + 1, 2);
      case "Lo":
        return n.ordinalNumber(r + 1, { unit: "month" });
      case "LLL":
        return n.month(r, {
          width: "abbreviated",
          context: "standalone"
        });
      case "LLLLL":
        return n.month(r, {
          width: "narrow",
          context: "standalone"
        });
      case "LLLL":
      default:
        return n.month(r, { width: "wide", context: "standalone" });
    }
  },
  // Local week of year
  w: function(e, t, n, r) {
    const o = yo(e, r);
    return t === "wo" ? n.ordinalNumber(o, { unit: "week" }) : oe(o, t.length);
  },
  // ISO week of year
  I: function(e, t, n) {
    const r = vo(e);
    return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : oe(r, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : yt.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const r = Dh(e);
    return t === "Do" ? n.ordinalNumber(r, { unit: "dayOfYear" }) : oe(r, t.length);
  },
  // Day of week
  E: function(e, t, n) {
    const r = e.getDay();
    switch (t) {
      case "E":
      case "EE":
      case "EEE":
        return n.day(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "EEEEE":
        return n.day(r, {
          width: "narrow",
          context: "formatting"
        });
      case "EEEEEE":
        return n.day(r, {
          width: "short",
          context: "formatting"
        });
      case "EEEE":
      default:
        return n.day(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Local day of week
  e: function(e, t, n, r) {
    const o = e.getDay(), a = (o - r.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      case "e":
        return String(a);
      case "ee":
        return oe(a, 2);
      case "eo":
        return n.ordinalNumber(a, { unit: "day" });
      case "eee":
        return n.day(o, {
          width: "abbreviated",
          context: "formatting"
        });
      case "eeeee":
        return n.day(o, {
          width: "narrow",
          context: "formatting"
        });
      case "eeeeee":
        return n.day(o, {
          width: "short",
          context: "formatting"
        });
      case "eeee":
      default:
        return n.day(o, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone local day of week
  c: function(e, t, n, r) {
    const o = e.getDay(), a = (o - r.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      case "c":
        return String(a);
      case "cc":
        return oe(a, t.length);
      case "co":
        return n.ordinalNumber(a, { unit: "day" });
      case "ccc":
        return n.day(o, {
          width: "abbreviated",
          context: "standalone"
        });
      case "ccccc":
        return n.day(o, {
          width: "narrow",
          context: "standalone"
        });
      case "cccccc":
        return n.day(o, {
          width: "short",
          context: "standalone"
        });
      case "cccc":
      default:
        return n.day(o, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // ISO day of week
  i: function(e, t, n) {
    const r = e.getDay(), o = r === 0 ? 7 : r;
    switch (t) {
      case "i":
        return String(o);
      case "ii":
        return oe(o, t.length);
      case "io":
        return n.ordinalNumber(o, { unit: "day" });
      case "iii":
        return n.day(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "iiiii":
        return n.day(r, {
          width: "narrow",
          context: "formatting"
        });
      case "iiiiii":
        return n.day(r, {
          width: "short",
          context: "formatting"
        });
      case "iiii":
      default:
        return n.day(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM or PM
  a: function(e, t, n) {
    const o = e.getHours() / 12 >= 1 ? "pm" : "am";
    switch (t) {
      case "a":
      case "aa":
        return n.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return n.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return n.dayPeriod(o, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return n.dayPeriod(o, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM, PM, midnight, noon
  b: function(e, t, n) {
    const r = e.getHours();
    let o;
    switch (r === 12 ? o = jt.noon : r === 0 ? o = jt.midnight : o = r / 12 >= 1 ? "pm" : "am", t) {
      case "b":
      case "bb":
        return n.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return n.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return n.dayPeriod(o, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return n.dayPeriod(o, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function(e, t, n) {
    const r = e.getHours();
    let o;
    switch (r >= 17 ? o = jt.evening : r >= 12 ? o = jt.afternoon : r >= 4 ? o = jt.morning : o = jt.night, t) {
      case "B":
      case "BB":
      case "BBB":
        return n.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return n.dayPeriod(o, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return n.dayPeriod(o, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Hour [1-12]
  h: function(e, t, n) {
    if (t === "ho") {
      let r = e.getHours() % 12;
      return r === 0 && (r = 12), n.ordinalNumber(r, { unit: "hour" });
    }
    return yt.h(e, t);
  },
  // Hour [0-23]
  H: function(e, t, n) {
    return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : yt.H(e, t);
  },
  // Hour [0-11]
  K: function(e, t, n) {
    const r = e.getHours() % 12;
    return t === "Ko" ? n.ordinalNumber(r, { unit: "hour" }) : oe(r, t.length);
  },
  // Hour [1-24]
  k: function(e, t, n) {
    let r = e.getHours();
    return r === 0 && (r = 24), t === "ko" ? n.ordinalNumber(r, { unit: "hour" }) : oe(r, t.length);
  },
  // Minute
  m: function(e, t, n) {
    return t === "mo" ? n.ordinalNumber(e.getMinutes(), { unit: "minute" }) : yt.m(e, t);
  },
  // Second
  s: function(e, t, n) {
    return t === "so" ? n.ordinalNumber(e.getSeconds(), { unit: "second" }) : yt.s(e, t);
  },
  // Fraction of second
  S: function(e, t) {
    return yt.S(e, t);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(e, t, n) {
    const r = e.getTimezoneOffset();
    if (r === 0)
      return "Z";
    switch (t) {
      case "X":
        return ka(r);
      case "XXXX":
      case "XX":
        return Et(r);
      case "XXXXX":
      case "XXX":
      default:
        return Et(r, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      case "x":
        return ka(r);
      case "xxxx":
      case "xx":
        return Et(r);
      case "xxxxx":
      case "xxx":
      default:
        return Et(r, ":");
    }
  },
  // Timezone (GMT)
  O: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + Ca(r, ":");
      case "OOOO":
      default:
        return "GMT" + Et(r, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + Ca(r, ":");
      case "zzzz":
      default:
        return "GMT" + Et(r, ":");
    }
  },
  // Seconds timestamp
  t: function(e, t, n) {
    const r = Math.trunc(+e / 1e3);
    return oe(r, t.length);
  },
  // Milliseconds timestamp
  T: function(e, t, n) {
    return oe(+e, t.length);
  }
};
function Ca(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = Math.trunc(r / 60), a = r % 60;
  return a === 0 ? n + String(o) : n + String(o) + t + oe(a, 2);
}
function ka(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + oe(Math.abs(e) / 60, 2) : Et(e, t);
}
function Et(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = oe(Math.trunc(r / 60), 2), a = oe(r % 60, 2);
  return n + o + t + a;
}
const Ma = (e, t) => {
  switch (e) {
    case "P":
      return t.date({ width: "short" });
    case "PP":
      return t.date({ width: "medium" });
    case "PPP":
      return t.date({ width: "long" });
    case "PPPP":
    default:
      return t.date({ width: "full" });
  }
}, Ks = (e, t) => {
  switch (e) {
    case "p":
      return t.time({ width: "short" });
    case "pp":
      return t.time({ width: "medium" });
    case "ppp":
      return t.time({ width: "long" });
    case "pppp":
    default:
      return t.time({ width: "full" });
  }
}, Eh = (e, t) => {
  const n = e.match(/(P+)(p+)?/) || [], r = n[1], o = n[2];
  if (!o)
    return Ma(e, t);
  let a;
  switch (r) {
    case "P":
      a = t.dateTime({ width: "short" });
      break;
    case "PP":
      a = t.dateTime({ width: "medium" });
      break;
    case "PPP":
      a = t.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      a = t.dateTime({ width: "full" });
      break;
  }
  return a.replace("{{date}}", Ma(r, t)).replace("{{time}}", Ks(o, t));
}, Ph = {
  p: Ks,
  P: Eh
}, Rh = /^D+$/, Th = /^Y+$/, Ah = ["D", "DD", "YY", "YYYY"];
function _h(e) {
  return Rh.test(e);
}
function Ih(e) {
  return Th.test(e);
}
function Wh(e, t, n) {
  const r = $h(e, t, n);
  if (console.warn(r), Ah.includes(e)) throw new RangeError(r);
}
function $h(e, t, n) {
  const r = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const Fh = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Yh = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Bh = /^'([^]*?)'?$/, Lh = /''/g, Hh = /[a-zA-Z]/;
function mn(e, t, n) {
  var u, d, f, m, y, g, b, v;
  const r = Mn(), o = (n == null ? void 0 : n.locale) ?? r.locale ?? Gt, a = (n == null ? void 0 : n.firstWeekContainsDate) ?? ((d = (u = n == null ? void 0 : n.locale) == null ? void 0 : u.options) == null ? void 0 : d.firstWeekContainsDate) ?? r.firstWeekContainsDate ?? ((m = (f = r.locale) == null ? void 0 : f.options) == null ? void 0 : m.firstWeekContainsDate) ?? 1, s = (n == null ? void 0 : n.weekStartsOn) ?? ((g = (y = n == null ? void 0 : n.locale) == null ? void 0 : y.options) == null ? void 0 : g.weekStartsOn) ?? r.weekStartsOn ?? ((v = (b = r.locale) == null ? void 0 : b.options) == null ? void 0 : v.weekStartsOn) ?? 0, i = ae(e, n == null ? void 0 : n.in);
  if (!zf(i))
    throw new RangeError("Invalid time value");
  let c = t.match(Yh).map((x) => {
    const w = x[0];
    if (w === "p" || w === "P") {
      const M = Ph[w];
      return M(x, o.formatLong);
    }
    return x;
  }).join("").match(Fh).map((x) => {
    if (x === "''")
      return { isToken: !1, value: "'" };
    const w = x[0];
    if (w === "'")
      return { isToken: !1, value: zh(x) };
    if (xa[w])
      return { isToken: !0, value: x };
    if (w.match(Hh))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + w + "`"
      );
    return { isToken: !1, value: x };
  });
  o.localize.preprocessor && (c = o.localize.preprocessor(i, c));
  const l = {
    firstWeekContainsDate: a,
    weekStartsOn: s,
    locale: o
  };
  return c.map((x) => {
    if (!x.isToken) return x.value;
    const w = x.value;
    (!(n != null && n.useAdditionalWeekYearTokens) && Ih(w) || !(n != null && n.useAdditionalDayOfYearTokens) && _h(w)) && Wh(w, t, String(e));
    const M = xa[w[0]];
    return M(i, w, o.localize, l);
  }).join("");
}
function zh(e) {
  const t = e.match(Bh);
  return t ? t[1].replace(Lh, "'") : e;
}
function jh(e, t) {
  const n = ae(e, t == null ? void 0 : t.in), r = n.getFullYear(), o = n.getMonth(), a = pe(n, 0);
  return a.setFullYear(r, o + 1, 0), a.setHours(0, 0, 0, 0), a.getDate();
}
function Vh(e, t) {
  return ae(e, t == null ? void 0 : t.in).getMonth();
}
function Gh(e, t) {
  return ae(e, t == null ? void 0 : t.in).getFullYear();
}
function Uh(e, t) {
  return +ae(e) > +ae(t);
}
function qh(e, t) {
  return +ae(e) < +ae(t);
}
function Xh(e, t, n) {
  const [r, o] = on(
    n == null ? void 0 : n.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear() && r.getMonth() === o.getMonth();
}
function Kh(e, t, n) {
  const [r, o] = on(
    n == null ? void 0 : n.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear();
}
function Qh(e, t, n) {
  const r = ae(e, n == null ? void 0 : n.in), o = r.getFullYear(), a = r.getDate(), s = pe(e, 0);
  s.setFullYear(o, t, 15), s.setHours(0, 0, 0, 0);
  const i = jh(s);
  return r.setMonth(t, Math.min(a, i)), r;
}
function Zh(e, t, n) {
  const r = ae(e, n == null ? void 0 : n.in);
  return isNaN(+r) ? pe(e, NaN) : (r.setFullYear(t), r);
}
const Na = 5, Jh = 4;
function em(e, t) {
  const n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, o = t.addDays(e, -r + 1), a = t.addDays(o, Na * 7 - 1);
  return t.getMonth(e) === t.getMonth(a) ? Na : Jh;
}
function Qs(e, t) {
  const n = t.startOfMonth(e), r = n.getDay();
  return r === 1 ? n : r === 0 ? t.addDays(n, -1 * 6) : t.addDays(n, -1 * (r - 1));
}
function tm(e, t) {
  const n = Qs(e, t), r = em(e, t);
  return t.addDays(n, r * 7 - 1);
}
const nm = {
  lessThanXSeconds: {
    one: "1초 미만",
    other: "{{count}}초 미만"
  },
  xSeconds: {
    one: "1초",
    other: "{{count}}초"
  },
  halfAMinute: "30초",
  lessThanXMinutes: {
    one: "1분 미만",
    other: "{{count}}분 미만"
  },
  xMinutes: {
    one: "1분",
    other: "{{count}}분"
  },
  aboutXHours: {
    one: "약 1시간",
    other: "약 {{count}}시간"
  },
  xHours: {
    one: "1시간",
    other: "{{count}}시간"
  },
  xDays: {
    one: "1일",
    other: "{{count}}일"
  },
  aboutXWeeks: {
    one: "약 1주",
    other: "약 {{count}}주"
  },
  xWeeks: {
    one: "1주",
    other: "{{count}}주"
  },
  aboutXMonths: {
    one: "약 1개월",
    other: "약 {{count}}개월"
  },
  xMonths: {
    one: "1개월",
    other: "{{count}}개월"
  },
  aboutXYears: {
    one: "약 1년",
    other: "약 {{count}}년"
  },
  xYears: {
    one: "1년",
    other: "{{count}}년"
  },
  overXYears: {
    one: "1년 이상",
    other: "{{count}}년 이상"
  },
  almostXYears: {
    one: "거의 1년",
    other: "거의 {{count}}년"
  }
}, rm = (e, t, n) => {
  let r;
  const o = nm[e];
  return typeof o == "string" ? r = o : t === 1 ? r = o.one : r = o.other.replace("{{count}}", t.toString()), n != null && n.addSuffix ? n.comparison && n.comparison > 0 ? r + " 후" : r + " 전" : r;
}, om = {
  full: "y년 M월 d일 EEEE",
  long: "y년 M월 d일",
  medium: "y.MM.dd",
  short: "y.MM.dd"
}, am = {
  full: "a H시 mm분 ss초 zzzz",
  long: "a H:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
}, sm = {
  full: "{{date}} {{time}}",
  long: "{{date}} {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
}, im = {
  date: Kt({
    formats: om,
    defaultWidth: "full"
  }),
  time: Kt({
    formats: am,
    defaultWidth: "full"
  }),
  dateTime: Kt({
    formats: sm,
    defaultWidth: "full"
  })
}, cm = {
  lastWeek: "'지난' eeee p",
  yesterday: "'어제' p",
  today: "'오늘' p",
  tomorrow: "'내일' p",
  nextWeek: "'다음' eeee p",
  other: "P"
}, lm = (e, t, n, r) => cm[e], dm = {
  narrow: ["BC", "AD"],
  abbreviated: ["BC", "AD"],
  wide: ["기원전", "서기"]
}, um = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1분기", "2분기", "3분기", "4분기"]
}, fm = {
  narrow: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
  abbreviated: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월"
  ],
  wide: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월"
  ]
}, hm = {
  narrow: ["일", "월", "화", "수", "목", "금", "토"],
  short: ["일", "월", "화", "수", "목", "금", "토"],
  abbreviated: ["일", "월", "화", "수", "목", "금", "토"],
  wide: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"]
}, mm = {
  narrow: {
    am: "오전",
    pm: "오후",
    midnight: "자정",
    noon: "정오",
    morning: "아침",
    afternoon: "오후",
    evening: "저녁",
    night: "밤"
  },
  abbreviated: {
    am: "오전",
    pm: "오후",
    midnight: "자정",
    noon: "정오",
    morning: "아침",
    afternoon: "오후",
    evening: "저녁",
    night: "밤"
  },
  wide: {
    am: "오전",
    pm: "오후",
    midnight: "자정",
    noon: "정오",
    morning: "아침",
    afternoon: "오후",
    evening: "저녁",
    night: "밤"
  }
}, pm = {
  narrow: {
    am: "오전",
    pm: "오후",
    midnight: "자정",
    noon: "정오",
    morning: "아침",
    afternoon: "오후",
    evening: "저녁",
    night: "밤"
  },
  abbreviated: {
    am: "오전",
    pm: "오후",
    midnight: "자정",
    noon: "정오",
    morning: "아침",
    afternoon: "오후",
    evening: "저녁",
    night: "밤"
  },
  wide: {
    am: "오전",
    pm: "오후",
    midnight: "자정",
    noon: "정오",
    morning: "아침",
    afternoon: "오후",
    evening: "저녁",
    night: "밤"
  }
}, gm = (e, t) => {
  const n = Number(e);
  switch (String(t == null ? void 0 : t.unit)) {
    case "minute":
    case "second":
      return String(n);
    case "date":
      return n + "일";
    default:
      return n + "번째";
  }
}, bm = {
  ordinalNumber: gm,
  era: Ke({
    values: dm,
    defaultWidth: "wide"
  }),
  quarter: Ke({
    values: um,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: Ke({
    values: fm,
    defaultWidth: "wide"
  }),
  day: Ke({
    values: hm,
    defaultWidth: "wide"
  }),
  dayPeriod: Ke({
    values: mm,
    defaultWidth: "wide",
    formattingValues: pm,
    defaultFormattingWidth: "wide"
  })
}, vm = /^(\d+)(일|번째)?/i, ym = /\d+/i, wm = {
  narrow: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(기원전|서기)/i
}, xm = {
  any: [/^(bc|기원전)/i, /^(ad|서기)/i]
}, Cm = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234]사?분기/i
}, km = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Mm = {
  narrow: /^(1[012]|[123456789])/,
  abbreviated: /^(1[012]|[123456789])월/i,
  wide: /^(1[012]|[123456789])월/i
}, Nm = {
  any: [
    /^1월?$/,
    /^2/,
    /^3/,
    /^4/,
    /^5/,
    /^6/,
    /^7/,
    /^8/,
    /^9/,
    /^10/,
    /^11/,
    /^12/
  ]
}, Sm = {
  narrow: /^[일월화수목금토]/,
  short: /^[일월화수목금토]/,
  abbreviated: /^[일월화수목금토]/,
  wide: /^[일월화수목금토]요일/
}, Dm = {
  any: [/^일/, /^월/, /^화/, /^수/, /^목/, /^금/, /^토/]
}, Om = {
  any: /^(am|pm|오전|오후|자정|정오|아침|저녁|밤)/i
}, Em = {
  any: {
    am: /^(am|오전)/i,
    pm: /^(pm|오후)/i,
    midnight: /^자정/i,
    noon: /^정오/i,
    morning: /^아침/i,
    afternoon: /^오후/i,
    evening: /^저녁/i,
    night: /^밤/i
  }
}, Pm = {
  ordinalNumber: qs({
    matchPattern: vm,
    parsePattern: ym,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: Qe({
    matchPatterns: wm,
    defaultMatchWidth: "wide",
    parsePatterns: xm,
    defaultParseWidth: "any"
  }),
  quarter: Qe({
    matchPatterns: Cm,
    defaultMatchWidth: "wide",
    parsePatterns: km,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: Qe({
    matchPatterns: Mm,
    defaultMatchWidth: "wide",
    parsePatterns: Nm,
    defaultParseWidth: "any"
  }),
  day: Qe({
    matchPatterns: Sm,
    defaultMatchWidth: "wide",
    parsePatterns: Dm,
    defaultParseWidth: "any"
  }),
  dayPeriod: Qe({
    matchPatterns: Om,
    defaultMatchWidth: "any",
    parsePatterns: Em,
    defaultParseWidth: "any"
  })
}, Rm = {
  code: "ko",
  formatDistance: rm,
  formatLong: im,
  formatRelative: lm,
  localize: bm,
  match: Pm,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
}, Zs = {
  ...Gt,
  labels: {
    labelDayButton: (e, t, n, r) => {
      let o;
      r && typeof r.format == "function" ? o = r.format.bind(r) : o = (s, i) => mn(s, i, { locale: Gt, ...n });
      let a = o(e, "PPPP");
      return t.today && (a = `Today, ${a}`), t.selected && (a = `${a}, selected`), a;
    },
    labelMonthDropdown: "Choose the Month",
    labelNext: "Go to the Next Month",
    labelPrevious: "Go to the Previous Month",
    labelWeekNumber: (e) => `Week ${e}`,
    labelYearDropdown: "Choose the Year",
    labelGrid: (e, t, n) => {
      let r;
      return n && typeof n.format == "function" ? r = n.format.bind(n) : r = (o, a) => mn(o, a, { locale: Gt, ...t }), r(e, "LLLL yyyy");
    },
    labelGridcell: (e, t, n, r) => {
      let o;
      r && typeof r.format == "function" ? o = r.format.bind(r) : o = (s, i) => mn(s, i, { locale: Gt, ...n });
      let a = o(e, "PPPP");
      return t != null && t.today && (a = `Today, ${a}`), a;
    },
    labelNav: "Navigation bar",
    labelWeekNumberHeader: "Week Number",
    labelWeekday: (e, t, n) => {
      let r;
      return n && typeof n.format == "function" ? r = n.format.bind(n) : r = (o, a) => mn(o, a, { locale: Gt, ...t }), r(e, "cccc");
    }
  }
};
class we {
  /**
   * Creates an instance of `DateLib`.
   *
   * @param options Configuration options for the date library.
   * @param overrides Custom overrides for the date library functions.
   */
  constructor(t, n) {
    this.Date = Date, this.today = () => {
      var r;
      return (r = this.overrides) != null && r.today ? this.overrides.today() : this.options.timeZone ? ke.tz(this.options.timeZone) : new this.Date();
    }, this.newDate = (r, o, a) => {
      var s;
      return (s = this.overrides) != null && s.newDate ? this.overrides.newDate(r, o, a) : this.options.timeZone ? new ke(r, o, a, this.options.timeZone) : new Date(r, o, a);
    }, this.addDays = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.addDays ? this.overrides.addDays(r, o) : Bs(r, o);
    }, this.addMonths = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.addMonths ? this.overrides.addMonths(r, o) : Ls(r, o);
    }, this.addWeeks = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.addWeeks ? this.overrides.addWeeks(r, o) : Ff(r, o);
    }, this.addYears = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.addYears ? this.overrides.addYears(r, o) : Yf(r, o);
    }, this.differenceInCalendarDays = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(r, o) : bo(r, o);
    }, this.differenceInCalendarMonths = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(r, o) : js(r, o);
    }, this.eachMonthOfInterval = (r) => {
      var o;
      return (o = this.overrides) != null && o.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(r) : Vf(r);
    }, this.eachYearOfInterval = (r) => {
      var i;
      const o = (i = this.overrides) != null && i.eachYearOfInterval ? this.overrides.eachYearOfInterval(r) : qf(r), a = new Set(o.map((c) => this.getYear(c)));
      if (a.size === o.length)
        return o;
      const s = [];
      return a.forEach((c) => {
        s.push(new Date(c, 0, 1));
      }), s;
    }, this.endOfBroadcastWeek = (r) => {
      var o;
      return (o = this.overrides) != null && o.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(r) : tm(r, this);
    }, this.endOfISOWeek = (r) => {
      var o;
      return (o = this.overrides) != null && o.endOfISOWeek ? this.overrides.endOfISOWeek(r) : Xf(r);
    }, this.endOfMonth = (r) => {
      var o;
      return (o = this.overrides) != null && o.endOfMonth ? this.overrides.endOfMonth(r) : jf(r);
    }, this.endOfWeek = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.endOfWeek ? this.overrides.endOfWeek(r, o) : Us(r, this.options);
    }, this.endOfYear = (r) => {
      var o;
      return (o = this.overrides) != null && o.endOfYear ? this.overrides.endOfYear(r) : Uf(r);
    }, this.format = (r, o, a) => {
      var i;
      const s = (i = this.overrides) != null && i.format ? this.overrides.format(r, o, this.options) : mn(r, o, this.options);
      return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(s) : s;
    }, this.getISOWeek = (r) => {
      var o;
      return (o = this.overrides) != null && o.getISOWeek ? this.overrides.getISOWeek(r) : vo(r);
    }, this.getMonth = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.getMonth ? this.overrides.getMonth(r, this.options) : Vh(r, this.options);
    }, this.getYear = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.getYear ? this.overrides.getYear(r, this.options) : Gh(r, this.options);
    }, this.getWeek = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.getWeek ? this.overrides.getWeek(r, this.options) : yo(r, this.options);
    }, this.isAfter = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isAfter ? this.overrides.isAfter(r, o) : Uh(r, o);
    }, this.isBefore = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isBefore ? this.overrides.isBefore(r, o) : qh(r, o);
    }, this.isDate = (r) => {
      var o;
      return (o = this.overrides) != null && o.isDate ? this.overrides.isDate(r) : zs(r);
    }, this.isSameDay = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isSameDay ? this.overrides.isSameDay(r, o) : Hf(r, o);
    }, this.isSameMonth = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isSameMonth ? this.overrides.isSameMonth(r, o) : Xh(r, o);
    }, this.isSameYear = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isSameYear ? this.overrides.isSameYear(r, o) : Kh(r, o);
    }, this.max = (r) => {
      var o;
      return (o = this.overrides) != null && o.max ? this.overrides.max(r) : Bf(r);
    }, this.min = (r) => {
      var o;
      return (o = this.overrides) != null && o.min ? this.overrides.min(r) : Lf(r);
    }, this.setMonth = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.setMonth ? this.overrides.setMonth(r, o) : Qh(r, o);
    }, this.setYear = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.setYear ? this.overrides.setYear(r, o) : Zh(r, o);
    }, this.startOfBroadcastWeek = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(r, this) : Qs(r, this);
    }, this.startOfDay = (r) => {
      var o;
      return (o = this.overrides) != null && o.startOfDay ? this.overrides.startOfDay(r) : yn(r);
    }, this.startOfISOWeek = (r) => {
      var o;
      return (o = this.overrides) != null && o.startOfISOWeek ? this.overrides.startOfISOWeek(r) : vn(r);
    }, this.startOfMonth = (r) => {
      var o;
      return (o = this.overrides) != null && o.startOfMonth ? this.overrides.startOfMonth(r) : Gf(r);
    }, this.startOfWeek = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.startOfWeek ? this.overrides.startOfWeek(r, this.options) : Jt(r, this.options);
    }, this.startOfYear = (r) => {
      var o;
      return (o = this.overrides) != null && o.startOfYear ? this.overrides.startOfYear(r) : Gs(r);
    }, this.options = { locale: Zs, ...t }, this.overrides = n;
  }
  /**
   * Generates a mapping of Arabic digits (0-9) to the target numbering system
   * digits.
   *
   * @since 9.5.0
   * @returns A record mapping Arabic digits to the target numerals.
   */
  getDigitMap() {
    const { numerals: t = "latn" } = this.options, n = new Intl.NumberFormat("en-US", {
      numberingSystem: t
    }), r = {};
    for (let o = 0; o < 10; o++)
      r[o.toString()] = n.format(o);
    return r;
  }
  /**
   * Replaces Arabic digits in a string with the target numbering system digits.
   *
   * @since 9.5.0
   * @param input The string containing Arabic digits.
   * @returns The string with digits replaced.
   */
  replaceDigits(t) {
    const n = this.getDigitMap();
    return t.replace(/\d/g, (r) => n[r] || r);
  }
  /**
   * Formats a number using the configured numbering system.
   *
   * @since 9.5.0
   * @param value The number to format.
   * @returns The formatted number as a string.
   */
  formatNumber(t) {
    return this.replaceDigits(t.toString());
  }
  /**
   * Returns the preferred ordering for month and year labels for the current
   * locale.
   */
  getMonthYearOrder() {
    var n;
    const t = (n = this.options.locale) == null ? void 0 : n.code;
    return t && we.yearFirstLocales.has(t) ? "year-first" : "month-first";
  }
  /**
   * Formats the month/year pair respecting locale conventions.
   *
   * @since 9.11.0
   */
  formatMonthYear(t) {
    const { locale: n, timeZone: r, numerals: o } = this.options, a = n == null ? void 0 : n.code;
    if (a && we.yearFirstLocales.has(a))
      try {
        return new Intl.DateTimeFormat(a, {
          month: "long",
          year: "numeric",
          timeZone: r,
          numberingSystem: o
        }).format(t);
      } catch {
      }
    const s = this.getMonthYearOrder() === "year-first" ? "y LLLL" : "LLLL y";
    return this.format(t, s);
  }
}
we.yearFirstLocales = /* @__PURE__ */ new Set([
  "eu",
  "hu",
  "ja",
  "ja-Hira",
  "ja-JP",
  "ko",
  "ko-KR",
  "lt",
  "lt-LT",
  "lv",
  "lv-LV",
  "mn",
  "mn-MN",
  "zh",
  "zh-CN",
  "zh-HK",
  "zh-TW"
]);
const ot = new we();
class Js {
  constructor(t, n, r = ot) {
    this.date = t, this.displayMonth = n, this.outside = !!(n && !r.isSameMonth(t, n)), this.dateLib = r, this.isoDate = r.format(t, "yyyy-MM-dd"), this.displayMonthId = r.format(n, "yyyy-MM"), this.dateMonthId = r.format(t, "yyyy-MM");
  }
  /**
   * Checks if this day is equal to another `CalendarDay`, considering both the
   * date and the displayed month.
   *
   * @param day The `CalendarDay` to compare with.
   * @returns `true` if the days are equal, otherwise `false`.
   */
  isEqualTo(t) {
    return this.dateLib.isSameDay(t.date, this.date) && this.dateLib.isSameMonth(t.displayMonth, this.displayMonth);
  }
}
class Tm {
  constructor(t, n) {
    this.date = t, this.weeks = n;
  }
}
class Am {
  constructor(t, n) {
    this.days = n, this.weekNumber = t;
  }
}
function _m(e) {
  return k.createElement("button", { ...e });
}
function Im(e) {
  return k.createElement("span", { ...e });
}
function Wm(e) {
  const { size: t = 24, orientation: n = "left", className: r } = e;
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: handled by the parent component
    k.createElement(
      "svg",
      { className: r, width: t, height: t, viewBox: "0 0 24 24" },
      n === "up" && k.createElement("polygon", { points: "6.77 17 12.5 11.43 18.24 17 20 15.28 12.5 8 5 15.28" }),
      n === "down" && k.createElement("polygon", { points: "6.77 8 12.5 13.57 18.24 8 20 9.72 12.5 17 5 9.72" }),
      n === "left" && k.createElement("polygon", { points: "16 18.112 9.81111111 12 16 5.87733333 14.0888889 4 6 12 14.0888889 20" }),
      n === "right" && k.createElement("polygon", { points: "8 18.112 14.18888889 12 8 5.87733333 9.91111111 4 18 12 9.91111111 20" })
    )
  );
}
function $m(e) {
  const { day: t, modifiers: n, ...r } = e;
  return k.createElement("td", { ...r });
}
function Fm(e) {
  const { day: t, modifiers: n, ...r } = e, o = k.useRef(null);
  return k.useEffect(() => {
    var a;
    n.focused && ((a = o.current) == null || a.focus());
  }, [n.focused]), k.createElement("button", { ref: o, ...r });
}
var j;
(function(e) {
  e.Root = "root", e.Chevron = "chevron", e.Day = "day", e.DayButton = "day_button", e.CaptionLabel = "caption_label", e.Dropdowns = "dropdowns", e.Dropdown = "dropdown", e.DropdownRoot = "dropdown_root", e.Footer = "footer", e.MonthGrid = "month_grid", e.MonthCaption = "month_caption", e.MonthsDropdown = "months_dropdown", e.Month = "month", e.Months = "months", e.Nav = "nav", e.NextMonthButton = "button_next", e.PreviousMonthButton = "button_previous", e.Week = "week", e.Weeks = "weeks", e.Weekday = "weekday", e.Weekdays = "weekdays", e.WeekNumber = "week_number", e.WeekNumberHeader = "week_number_header", e.YearsDropdown = "years_dropdown";
})(j || (j = {}));
var de;
(function(e) {
  e.disabled = "disabled", e.hidden = "hidden", e.outside = "outside", e.focused = "focused", e.today = "today";
})(de || (de = {}));
var Be;
(function(e) {
  e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})(Be || (Be = {}));
var Pe;
(function(e) {
  e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})(Pe || (Pe = {}));
function Ym(e) {
  const { options: t, className: n, components: r, classNames: o, ...a } = e, s = [o[j.Dropdown], n].join(" "), i = t == null ? void 0 : t.find(({ value: c }) => c === a.value);
  return k.createElement(
    "span",
    { "data-disabled": a.disabled, className: o[j.DropdownRoot] },
    k.createElement(r.Select, { className: s, ...a }, t == null ? void 0 : t.map(({ value: c, label: l, disabled: u }) => k.createElement(r.Option, { key: c, value: c, disabled: u }, l))),
    k.createElement(
      "span",
      { className: o[j.CaptionLabel], "aria-hidden": !0 },
      i == null ? void 0 : i.label,
      k.createElement(r.Chevron, { orientation: "down", size: 18, className: o[j.Chevron] })
    )
  );
}
function Bm(e) {
  return k.createElement("div", { ...e });
}
function Lm(e) {
  return k.createElement("div", { ...e });
}
function Hm(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return k.createElement("div", { ...r }, e.children);
}
function zm(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return k.createElement("div", { ...r });
}
function jm(e) {
  return k.createElement("table", { ...e });
}
function Vm(e) {
  return k.createElement("div", { ...e });
}
const ei = jc(void 0);
function Nn() {
  const e = Vc(ei);
  if (e === void 0)
    throw new Error("useDayPicker() must be used within a custom component.");
  return e;
}
function Gm(e) {
  const { components: t } = Nn();
  return k.createElement(t.Dropdown, { ...e });
}
function Um(e) {
  const { onPreviousClick: t, onNextClick: n, previousMonth: r, nextMonth: o, ...a } = e, { components: s, classNames: i, labels: { labelPrevious: c, labelNext: l } } = Nn(), u = Ae((f) => {
    o && (n == null || n(f));
  }, [o, n]), d = Ae((f) => {
    r && (t == null || t(f));
  }, [r, t]);
  return k.createElement(
    "nav",
    { ...a },
    k.createElement(
      s.PreviousMonthButton,
      { type: "button", className: i[j.PreviousMonthButton], tabIndex: r ? void 0 : -1, "aria-disabled": r ? void 0 : !0, "aria-label": c(r), onClick: d },
      k.createElement(s.Chevron, { disabled: r ? void 0 : !0, className: i[j.Chevron], orientation: "left" })
    ),
    k.createElement(
      s.NextMonthButton,
      { type: "button", className: i[j.NextMonthButton], tabIndex: o ? void 0 : -1, "aria-disabled": o ? void 0 : !0, "aria-label": l(o), onClick: u },
      k.createElement(s.Chevron, { disabled: o ? void 0 : !0, orientation: "right", className: i[j.Chevron] })
    )
  );
}
function qm(e) {
  const { components: t } = Nn();
  return k.createElement(t.Button, { ...e });
}
function Xm(e) {
  return k.createElement("option", { ...e });
}
function Km(e) {
  const { components: t } = Nn();
  return k.createElement(t.Button, { ...e });
}
function Qm(e) {
  const { rootRef: t, ...n } = e;
  return k.createElement("div", { ...n, ref: t });
}
function Zm(e) {
  return k.createElement("select", { ...e });
}
function Jm(e) {
  const { week: t, ...n } = e;
  return k.createElement("tr", { ...n });
}
function ep(e) {
  return k.createElement("th", { ...e });
}
function tp(e) {
  return k.createElement(
    "thead",
    { "aria-hidden": !0 },
    k.createElement("tr", { ...e })
  );
}
function np(e) {
  const { week: t, ...n } = e;
  return k.createElement("th", { ...n });
}
function rp(e) {
  return k.createElement("th", { ...e });
}
function op(e) {
  return k.createElement("tbody", { ...e });
}
function ap(e) {
  const { components: t } = Nn();
  return k.createElement(t.Dropdown, { ...e });
}
const sp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: _m,
  CaptionLabel: Im,
  Chevron: Wm,
  Day: $m,
  DayButton: Fm,
  Dropdown: Ym,
  DropdownNav: Bm,
  Footer: Lm,
  Month: Hm,
  MonthCaption: zm,
  MonthGrid: jm,
  Months: Vm,
  MonthsDropdown: Gm,
  Nav: Um,
  NextMonthButton: qm,
  Option: Xm,
  PreviousMonthButton: Km,
  Root: Qm,
  Select: Zm,
  Week: Jm,
  WeekNumber: np,
  WeekNumberHeader: rp,
  Weekday: ep,
  Weekdays: tp,
  Weeks: op,
  YearsDropdown: ap
}, Symbol.toStringTag, { value: "Module" }));
function ct(e, t, n = !1, r = ot) {
  let { from: o, to: a } = e;
  const { differenceInCalendarDays: s, isSameDay: i } = r;
  return o && a ? (s(a, o) < 0 && ([o, a] = [a, o]), s(t, o) >= (n ? 1 : 0) && s(a, t) >= (n ? 1 : 0)) : !n && a ? i(a, t) : !n && o ? i(o, t) : !1;
}
function wo(e) {
  return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function ur(e) {
  return !!(e && typeof e == "object" && "from" in e);
}
function xo(e) {
  return !!(e && typeof e == "object" && "after" in e);
}
function Co(e) {
  return !!(e && typeof e == "object" && "before" in e);
}
function ti(e) {
  return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function ni(e, t) {
  return Array.isArray(e) && e.every(t.isDate);
}
function lt(e, t, n = ot) {
  const r = Array.isArray(t) ? t : [t], { isSameDay: o, differenceInCalendarDays: a, isAfter: s } = n;
  return r.some((i) => {
    if (typeof i == "boolean")
      return i;
    if (n.isDate(i))
      return o(e, i);
    if (ni(i, n))
      return i.some((c) => o(e, c));
    if (ur(i))
      return ct(i, e, !1, n);
    if (ti(i))
      return Array.isArray(i.dayOfWeek) ? i.dayOfWeek.includes(e.getDay()) : i.dayOfWeek === e.getDay();
    if (wo(i)) {
      const c = a(i.before, e), l = a(i.after, e), u = c > 0, d = l < 0;
      return s(i.before, i.after) ? d && u : u || d;
    }
    return xo(i) ? a(e, i.after) > 0 : Co(i) ? a(i.before, e) > 0 : typeof i == "function" ? i(e) : !1;
  });
}
function ip(e, t, n, r, o) {
  const { disabled: a, hidden: s, modifiers: i, showOutsideDays: c, broadcastCalendar: l, today: u = o.today() } = t, { isSameDay: d, isSameMonth: f, startOfMonth: m, isBefore: y, endOfMonth: g, isAfter: b } = o, v = n && m(n), x = r && g(r), w = {
    [de.focused]: [],
    [de.outside]: [],
    [de.disabled]: [],
    [de.hidden]: [],
    [de.today]: []
  }, M = {};
  for (const N of e) {
    const { date: C, displayMonth: O } = N, _ = !!(O && !f(C, O)), B = !!(v && y(C, v)), I = !!(x && b(C, x)), F = !!(a && lt(C, a, o)), T = !!(s && lt(C, s, o)) || B || I || // Broadcast calendar will show outside days as default
    !l && !c && _ || l && c === !1 && _, Y = d(C, u);
    _ && w.outside.push(N), F && w.disabled.push(N), T && w.hidden.push(N), Y && w.today.push(N), i && Object.keys(i).forEach((D) => {
      const R = i == null ? void 0 : i[D];
      R && lt(C, R, o) && (M[D] ? M[D].push(N) : M[D] = [N]);
    });
  }
  return (N) => {
    const C = {
      [de.focused]: !1,
      [de.disabled]: !1,
      [de.hidden]: !1,
      [de.outside]: !1,
      [de.today]: !1
    }, O = {};
    for (const _ in w) {
      const B = w[_];
      C[_] = B.some((I) => I === N);
    }
    for (const _ in M)
      O[_] = M[_].some((B) => B === N);
    return {
      ...C,
      // custom modifiers should override all the previous ones
      ...O
    };
  };
}
function cp(e, t, n = {}) {
  return Object.entries(e).filter(([, o]) => o === !0).reduce((o, [a]) => (n[a] ? o.push(n[a]) : t[de[a]] ? o.push(t[de[a]]) : t[Be[a]] && o.push(t[Be[a]]), o), [t[j.Day]]);
}
function lp(e) {
  return {
    ...sp,
    ...e
  };
}
function dp(e) {
  const t = {
    "data-mode": e.mode ?? void 0,
    "data-required": "required" in e ? e.required : void 0,
    "data-multiple-months": e.numberOfMonths && e.numberOfMonths > 1 || void 0,
    "data-week-numbers": e.showWeekNumber || void 0,
    "data-broadcast-calendar": e.broadcastCalendar || void 0,
    "data-nav-layout": e.navLayout || void 0
  };
  return Object.entries(e).forEach(([n, r]) => {
    n.startsWith("data-") && (t[n] = r);
  }), t;
}
function up() {
  const e = {};
  for (const t in j)
    e[j[t]] = `rdp-${j[t]}`;
  for (const t in de)
    e[de[t]] = `rdp-${de[t]}`;
  for (const t in Be)
    e[Be[t]] = `rdp-${Be[t]}`;
  for (const t in Pe)
    e[Pe[t]] = `rdp-${Pe[t]}`;
  return e;
}
function ri(e, t, n) {
  return (n ?? new we(t)).formatMonthYear(e);
}
const fp = ri;
function hp(e, t, n) {
  return (n ?? new we(t)).format(e, "d");
}
function mp(e, t = ot) {
  return t.format(e, "LLLL");
}
function pp(e, t, n) {
  return (n ?? new we(t)).format(e, "cccccc");
}
function gp(e, t = ot) {
  return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
function bp() {
  return "";
}
function oi(e, t = ot) {
  return t.format(e, "yyyy");
}
const vp = oi, yp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  formatCaption: ri,
  formatDay: hp,
  formatMonthCaption: fp,
  formatMonthDropdown: mp,
  formatWeekNumber: gp,
  formatWeekNumberHeader: bp,
  formatWeekdayName: pp,
  formatYearCaption: vp,
  formatYearDropdown: oi
}, Symbol.toStringTag, { value: "Module" }));
function wp(e) {
  return e != null && e.formatMonthCaption && !e.formatCaption && (e.formatCaption = e.formatMonthCaption), e != null && e.formatYearCaption && !e.formatYearDropdown && (e.formatYearDropdown = e.formatYearCaption), {
    ...yp,
    ...e
  };
}
function ko(e, t, n, r) {
  let o = (r ?? new we(n)).format(e, "PPPP");
  return t.today && (o = `Today, ${o}`), t.selected && (o = `${o}, selected`), o;
}
const xp = ko;
function Mo(e, t, n) {
  return (n ?? new we(t)).formatMonthYear(e);
}
const Cp = Mo;
function ai(e, t, n, r) {
  let o = (r ?? new we(n)).format(e, "PPPP");
  return t != null && t.today && (o = `Today, ${o}`), o;
}
function si(e) {
  return "Choose the Month";
}
function ii() {
  return "";
}
const kp = "Go to the Next Month";
function ci(e, t) {
  return kp;
}
function li(e) {
  return "Go to the Previous Month";
}
function di(e, t, n) {
  return (n ?? new we(t)).format(e, "cccc");
}
function ui(e, t) {
  return `Week ${e}`;
}
function fi(e) {
  return "Week Number";
}
function hi(e) {
  return "Choose the Year";
}
const Mp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  labelCaption: Cp,
  labelDay: xp,
  labelDayButton: ko,
  labelGrid: Mo,
  labelGridcell: ai,
  labelMonthDropdown: si,
  labelNav: ii,
  labelNext: ci,
  labelPrevious: li,
  labelWeekNumber: ui,
  labelWeekNumberHeader: fi,
  labelWeekday: di,
  labelYearDropdown: hi
}, Symbol.toStringTag, { value: "Module" })), Ye = (e, t, n) => t || (n ? typeof n == "function" ? n : (...r) => n : e);
function Np(e, t) {
  var r;
  const n = ((r = t.locale) == null ? void 0 : r.labels) ?? {};
  return {
    ...Mp,
    ...e ?? {},
    labelDayButton: Ye(ko, e == null ? void 0 : e.labelDayButton, n.labelDayButton),
    labelMonthDropdown: Ye(si, e == null ? void 0 : e.labelMonthDropdown, n.labelMonthDropdown),
    labelNext: Ye(ci, e == null ? void 0 : e.labelNext, n.labelNext),
    labelPrevious: Ye(li, e == null ? void 0 : e.labelPrevious, n.labelPrevious),
    labelWeekNumber: Ye(ui, e == null ? void 0 : e.labelWeekNumber, n.labelWeekNumber),
    labelYearDropdown: Ye(hi, e == null ? void 0 : e.labelYearDropdown, n.labelYearDropdown),
    labelGrid: Ye(Mo, e == null ? void 0 : e.labelGrid, n.labelGrid),
    labelGridcell: Ye(ai, e == null ? void 0 : e.labelGridcell, n.labelGridcell),
    labelNav: Ye(ii, e == null ? void 0 : e.labelNav, n.labelNav),
    labelWeekNumberHeader: Ye(fi, e == null ? void 0 : e.labelWeekNumberHeader, n.labelWeekNumberHeader),
    labelWeekday: Ye(di, e == null ? void 0 : e.labelWeekday, n.labelWeekday)
  };
}
function Sp(e, t, n, r, o) {
  const { startOfMonth: a, startOfYear: s, endOfYear: i, eachMonthOfInterval: c, getMonth: l } = o;
  return c({
    start: s(e),
    end: i(e)
  }).map((f) => {
    const m = r.formatMonthDropdown(f, o), y = l(f), g = t && f < a(t) || n && f > a(n) || !1;
    return { value: y, label: m, disabled: g };
  });
}
function Dp(e, t = {}, n = {}) {
  let r = { ...t == null ? void 0 : t[j.Day] };
  return Object.entries(e).filter(([, o]) => o === !0).forEach(([o]) => {
    r = {
      ...r,
      ...n == null ? void 0 : n[o]
    };
  }), r;
}
function Op(e, t, n, r) {
  const o = r ?? e.today(), a = n ? e.startOfBroadcastWeek(o, e) : t ? e.startOfISOWeek(o) : e.startOfWeek(o), s = [];
  for (let i = 0; i < 7; i++) {
    const c = e.addDays(a, i);
    s.push(c);
  }
  return s;
}
function Ep(e, t, n, r, o = !1) {
  if (!e || !t)
    return;
  const { startOfYear: a, endOfYear: s, eachYearOfInterval: i, getYear: c } = r, l = a(e), u = s(t), d = i({ start: l, end: u });
  return o && d.reverse(), d.map((f) => {
    const m = n.formatYearDropdown(f, r);
    return {
      value: c(f),
      label: m,
      disabled: !1
    };
  });
}
function Pp(e, t = {}) {
  var i;
  const { weekStartsOn: n, locale: r } = t, o = n ?? ((i = r == null ? void 0 : r.options) == null ? void 0 : i.weekStartsOn) ?? 0, a = (c) => {
    const l = typeof c == "number" || typeof c == "string" ? new Date(c) : c;
    return new ke(l.getFullYear(), l.getMonth(), l.getDate(), 12, 0, 0, e);
  }, s = (c) => {
    const l = a(c);
    return new Date(l.getFullYear(), l.getMonth(), l.getDate(), 0, 0, 0, 0);
  };
  return {
    today: () => a(ke.tz(e)),
    newDate: (c, l, u) => new ke(c, l, u, 12, 0, 0, e),
    startOfDay: (c) => a(c),
    startOfWeek: (c, l) => {
      const u = a(c), d = (l == null ? void 0 : l.weekStartsOn) ?? o, f = (u.getDay() - d + 7) % 7;
      return u.setDate(u.getDate() - f), u;
    },
    startOfISOWeek: (c) => {
      const l = a(c), u = (l.getDay() - 1 + 7) % 7;
      return l.setDate(l.getDate() - u), l;
    },
    startOfMonth: (c) => {
      const l = a(c);
      return l.setDate(1), l;
    },
    startOfYear: (c) => {
      const l = a(c);
      return l.setMonth(0, 1), l;
    },
    endOfWeek: (c, l) => {
      const u = a(c), m = ((((l == null ? void 0 : l.weekStartsOn) ?? o) + 6) % 7 - u.getDay() + 7) % 7;
      return u.setDate(u.getDate() + m), u;
    },
    endOfISOWeek: (c) => {
      const l = a(c), u = (7 - l.getDay()) % 7;
      return l.setDate(l.getDate() + u), l;
    },
    endOfMonth: (c) => {
      const l = a(c);
      return l.setMonth(l.getMonth() + 1, 0), l;
    },
    endOfYear: (c) => {
      const l = a(c);
      return l.setMonth(11, 31), l;
    },
    eachMonthOfInterval: (c) => {
      const l = a(c.start), u = a(c.end), d = [], f = new ke(l.getFullYear(), l.getMonth(), 1, 12, 0, 0, e), m = u.getFullYear() * 12 + u.getMonth();
      for (; f.getFullYear() * 12 + f.getMonth() <= m; )
        d.push(new ke(f, e)), f.setMonth(f.getMonth() + 1, 1);
      return d;
    },
    // Normalize to noon once before arithmetic (avoid DST/midnight edge cases),
    // mutate the same TZDate, and return it.
    addDays: (c, l) => {
      const u = a(c);
      return u.setDate(u.getDate() + l), u;
    },
    addWeeks: (c, l) => {
      const u = a(c);
      return u.setDate(u.getDate() + l * 7), u;
    },
    addMonths: (c, l) => {
      const u = a(c);
      return u.setMonth(u.getMonth() + l), u;
    },
    addYears: (c, l) => {
      const u = a(c);
      return u.setFullYear(u.getFullYear() + l), u;
    },
    eachYearOfInterval: (c) => {
      const l = a(c.start), u = a(c.end), d = [], f = new ke(l.getFullYear(), 0, 1, 12, 0, 0, e);
      for (; f.getFullYear() <= u.getFullYear(); )
        d.push(new ke(f, e)), f.setFullYear(f.getFullYear() + 1, 0, 1);
      return d;
    },
    getWeek: (c, l) => {
      var d;
      const u = s(c);
      return yo(u, {
        weekStartsOn: (l == null ? void 0 : l.weekStartsOn) ?? o,
        firstWeekContainsDate: (l == null ? void 0 : l.firstWeekContainsDate) ?? ((d = r == null ? void 0 : r.options) == null ? void 0 : d.firstWeekContainsDate) ?? 1
      });
    },
    getISOWeek: (c) => {
      const l = s(c);
      return vo(l);
    },
    differenceInCalendarDays: (c, l) => {
      const u = s(c), d = s(l);
      return bo(u, d);
    },
    differenceInCalendarMonths: (c, l) => {
      const u = s(c), d = s(l);
      return js(u, d);
    }
  };
}
const Sn = (e) => e instanceof HTMLElement ? e : null, Fr = (e) => [
  ...e.querySelectorAll("[data-animated-month]") ?? []
], Rp = (e) => Sn(e.querySelector("[data-animated-month]")), Yr = (e) => Sn(e.querySelector("[data-animated-caption]")), Br = (e) => Sn(e.querySelector("[data-animated-weeks]")), Tp = (e) => Sn(e.querySelector("[data-animated-nav]")), Ap = (e) => Sn(e.querySelector("[data-animated-weekdays]"));
function _p(e, t, { classNames: n, months: r, focused: o, dateLib: a }) {
  const s = xt(null), i = xt(r), c = xt(!1);
  Aa(() => {
    const l = i.current;
    if (i.current = r, !t || !e.current || // safety check because the ref can be set to anything by consumers
    !(e.current instanceof HTMLElement) || // validation required for the animation to work as expected
    r.length === 0 || l.length === 0 || r.length !== l.length)
      return;
    const u = a.isSameMonth(r[0].date, l[0].date), d = a.isAfter(r[0].date, l[0].date), f = d ? n[Pe.caption_after_enter] : n[Pe.caption_before_enter], m = d ? n[Pe.weeks_after_enter] : n[Pe.weeks_before_enter], y = s.current, g = e.current.cloneNode(!0);
    if (g instanceof HTMLElement ? (Fr(g).forEach((w) => {
      if (!(w instanceof HTMLElement))
        return;
      const M = Rp(w);
      M && w.contains(M) && w.removeChild(M);
      const N = Yr(w);
      N && N.classList.remove(f);
      const C = Br(w);
      C && C.classList.remove(m);
    }), s.current = g) : s.current = null, c.current || u || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    o)
      return;
    const b = y instanceof HTMLElement ? Fr(y) : [], v = Fr(e.current);
    if (v != null && v.every((x) => x instanceof HTMLElement) && b && b.every((x) => x instanceof HTMLElement)) {
      c.current = !0, e.current.style.isolation = "isolate";
      const x = Tp(e.current);
      x && (x.style.zIndex = "1"), v.forEach((w, M) => {
        const N = b[M];
        if (!N)
          return;
        w.style.position = "relative", w.style.overflow = "hidden";
        const C = Yr(w);
        C && C.classList.add(f);
        const O = Br(w);
        O && O.classList.add(m);
        const _ = () => {
          c.current = !1, e.current && (e.current.style.isolation = ""), x && (x.style.zIndex = ""), C && C.classList.remove(f), O && O.classList.remove(m), w.style.position = "", w.style.overflow = "", w.contains(N) && w.removeChild(N);
        };
        N.style.pointerEvents = "none", N.style.position = "absolute", N.style.overflow = "hidden", N.setAttribute("aria-hidden", "true");
        const B = Ap(N);
        B && (B.style.opacity = "0");
        const I = Yr(N);
        I && (I.classList.add(d ? n[Pe.caption_before_exit] : n[Pe.caption_after_exit]), I.addEventListener("animationend", _));
        const F = Br(N);
        F && F.classList.add(d ? n[Pe.weeks_before_exit] : n[Pe.weeks_after_exit]), w.insertBefore(N, w.firstChild);
      });
    }
  });
}
function Ip(e, t, n, r) {
  const o = e[0], a = e[e.length - 1], { ISOWeek: s, fixedWeeks: i, broadcastCalendar: c } = n ?? {}, { addDays: l, differenceInCalendarDays: u, differenceInCalendarMonths: d, endOfBroadcastWeek: f, endOfISOWeek: m, endOfMonth: y, endOfWeek: g, isAfter: b, startOfBroadcastWeek: v, startOfISOWeek: x, startOfWeek: w } = r, M = c ? v(o, r) : s ? x(o) : w(o), N = c ? f(a) : s ? m(y(a)) : g(y(a)), C = t && (c ? f(t) : s ? m(t) : g(t)), O = C && b(N, C) ? C : N, _ = u(O, M), B = d(a, o) + 1, I = [];
  for (let Y = 0; Y <= _; Y++) {
    const D = l(M, Y);
    I.push(D);
  }
  const T = (c ? 35 : 42) * B;
  if (i && I.length < T) {
    const Y = T - I.length;
    for (let D = 0; D < Y; D++) {
      const R = l(I[I.length - 1], 1);
      I.push(R);
    }
  }
  return I;
}
function Wp(e) {
  const t = [];
  return e.reduce((n, r) => {
    const o = r.weeks.reduce((a, s) => a.concat(s.days.slice()), t.slice());
    return n.concat(o.slice());
  }, t.slice());
}
function $p(e, t, n, r) {
  const { numberOfMonths: o = 1 } = n, a = [];
  for (let s = 0; s < o; s++) {
    const i = r.addMonths(e, s);
    if (t && i > t)
      break;
    a.push(i);
  }
  return a;
}
function Sa(e, t, n, r) {
  const { month: o, defaultMonth: a, today: s = r.today(), numberOfMonths: i = 1 } = e;
  let c = o || a || s;
  const { differenceInCalendarMonths: l, addMonths: u, startOfMonth: d } = r;
  if (n && l(n, c) < i - 1) {
    const f = -1 * (i - 1);
    c = u(n, f);
  }
  return t && l(c, t) < 0 && (c = t), d(c);
}
function Fp(e, t, n, r) {
  const { addDays: o, endOfBroadcastWeek: a, endOfISOWeek: s, endOfMonth: i, endOfWeek: c, getISOWeek: l, getWeek: u, startOfBroadcastWeek: d, startOfISOWeek: f, startOfWeek: m } = r, y = e.reduce((g, b) => {
    const v = n.broadcastCalendar ? d(b, r) : n.ISOWeek ? f(b) : m(b), x = n.broadcastCalendar ? a(b) : n.ISOWeek ? s(i(b)) : c(i(b)), w = t.filter((O) => O >= v && O <= x), M = n.broadcastCalendar ? 35 : 42;
    if (n.fixedWeeks && w.length < M) {
      const O = t.filter((_) => {
        const B = M - w.length;
        return _ > x && _ <= o(x, B);
      });
      w.push(...O);
    }
    const N = w.reduce((O, _) => {
      const B = n.ISOWeek ? l(_) : u(_), I = O.find((T) => T.weekNumber === B), F = new Js(_, b, r);
      return I ? I.days.push(F) : O.push(new Am(B, [F])), O;
    }, []), C = new Tm(b, N);
    return g.push(C), g;
  }, []);
  return n.reverseMonths ? y.reverse() : y;
}
function Yp(e, t) {
  let { startMonth: n, endMonth: r } = e;
  const { startOfYear: o, startOfDay: a, startOfMonth: s, endOfMonth: i, addYears: c, endOfYear: l, newDate: u, today: d } = t, { fromYear: f, toYear: m, fromMonth: y, toMonth: g } = e;
  !n && y && (n = y), !n && f && (n = t.newDate(f, 0, 1)), !r && g && (r = g), !r && m && (r = u(m, 11, 31));
  const b = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
  return n ? n = s(n) : f ? n = u(f, 0, 1) : !n && b && (n = o(c(e.today ?? d(), -100))), r ? r = i(r) : m ? r = u(m, 11, 31) : !r && b && (r = l(e.today ?? d())), [
    n && a(n),
    r && a(r)
  ];
}
function Bp(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: a = 1 } = n, { startOfMonth: s, addMonths: i, differenceInCalendarMonths: c } = r, l = o ? a : 1, u = s(e);
  if (!t)
    return i(u, l);
  if (!(c(t, e) < a))
    return i(u, l);
}
function Lp(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: a } = n, { startOfMonth: s, addMonths: i, differenceInCalendarMonths: c } = r, l = o ? a ?? 1 : 1, u = s(e);
  if (!t)
    return i(u, -l);
  if (!(c(u, t) <= 0))
    return i(u, -l);
}
function Hp(e) {
  const t = [];
  return e.reduce((n, r) => n.concat(r.weeks.slice()), t.slice());
}
function fr(e, t) {
  const [n, r] = ye(e);
  return [t === void 0 ? n : t, r];
}
function zp(e, t) {
  var M;
  const [n, r] = Yp(e, t), { startOfMonth: o, endOfMonth: a } = t, s = Sa(e, n, r, t), [i, c] = fr(
    s,
    // initialMonth is always computed from props.month if provided
    e.month ? s : void 0
  );
  Tt(() => {
    const N = Sa(e, n, r, t);
    c(N);
  }, [e.timeZone]);
  const { months: l, weeks: u, days: d, previousMonth: f, nextMonth: m } = Ee(() => {
    const N = $p(i, r, { numberOfMonths: e.numberOfMonths }, t), C = Ip(N, e.endMonth ? a(e.endMonth) : void 0, {
      ISOWeek: e.ISOWeek,
      fixedWeeks: e.fixedWeeks,
      broadcastCalendar: e.broadcastCalendar
    }, t), O = Fp(N, C, {
      broadcastCalendar: e.broadcastCalendar,
      fixedWeeks: e.fixedWeeks,
      ISOWeek: e.ISOWeek,
      reverseMonths: e.reverseMonths
    }, t), _ = Hp(O), B = Wp(O), I = Lp(i, n, e, t), F = Bp(i, r, e, t);
    return {
      months: O,
      weeks: _,
      days: B,
      previousMonth: I,
      nextMonth: F
    };
  }, [
    t,
    i.getTime(),
    r == null ? void 0 : r.getTime(),
    n == null ? void 0 : n.getTime(),
    e.disableNavigation,
    e.broadcastCalendar,
    (M = e.endMonth) == null ? void 0 : M.getTime(),
    e.fixedWeeks,
    e.ISOWeek,
    e.numberOfMonths,
    e.pagedNavigation,
    e.reverseMonths
  ]), { disableNavigation: y, onMonthChange: g } = e, b = (N) => u.some((C) => C.days.some((O) => O.isEqualTo(N))), v = (N) => {
    if (y)
      return;
    let C = o(N);
    n && C < o(n) && (C = o(n)), r && C > o(r) && (C = o(r)), c(C), g == null || g(C);
  };
  return {
    months: l,
    weeks: u,
    days: d,
    navStart: n,
    navEnd: r,
    previousMonth: f,
    nextMonth: m,
    goToMonth: v,
    goToDay: (N) => {
      b(N) || v(N.date);
    }
  };
}
var qe;
(function(e) {
  e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(qe || (qe = {}));
function Da(e) {
  return !e[de.disabled] && !e[de.hidden] && !e[de.outside];
}
function jp(e, t, n, r) {
  let o, a = -1;
  for (const s of e) {
    const i = t(s);
    Da(i) && (i[de.focused] && a < qe.FocusedModifier ? (o = s, a = qe.FocusedModifier) : r != null && r.isEqualTo(s) && a < qe.LastFocused ? (o = s, a = qe.LastFocused) : n(s.date) && a < qe.Selected ? (o = s, a = qe.Selected) : i[de.today] && a < qe.Today && (o = s, a = qe.Today));
  }
  return o || (o = e.find((s) => Da(t(s)))), o;
}
function Vp(e, t, n, r, o, a, s) {
  const { ISOWeek: i, broadcastCalendar: c } = a, { addDays: l, addMonths: u, addWeeks: d, addYears: f, endOfBroadcastWeek: m, endOfISOWeek: y, endOfWeek: g, max: b, min: v, startOfBroadcastWeek: x, startOfISOWeek: w, startOfWeek: M } = s;
  let C = {
    day: l,
    week: d,
    month: u,
    year: f,
    startOfWeek: (O) => c ? x(O, s) : i ? w(O) : M(O),
    endOfWeek: (O) => c ? m(O) : i ? y(O) : g(O)
  }[e](n, t === "after" ? 1 : -1);
  return t === "before" && r ? C = b([r, C]) : t === "after" && o && (C = v([o, C])), C;
}
function mi(e, t, n, r, o, a, s, i = 0) {
  if (i > 365)
    return;
  const c = Vp(e, t, n.date, r, o, a, s), l = !!(a.disabled && lt(c, a.disabled, s)), u = !!(a.hidden && lt(c, a.hidden, s)), d = c, f = new Js(c, d, s);
  return !l && !u ? f : mi(e, t, f, r, o, a, s, i + 1);
}
function Gp(e, t, n, r, o) {
  const { autoFocus: a } = e, [s, i] = ye(), c = jp(t.days, n, r || (() => !1), s), [l, u] = ye(a ? c : void 0);
  return {
    isFocusTarget: (g) => !!(c != null && c.isEqualTo(g)),
    setFocused: u,
    focused: l,
    blur: () => {
      i(l), u(void 0);
    },
    moveFocus: (g, b) => {
      if (!l)
        return;
      const v = mi(g, b, l, t.navStart, t.navEnd, e, o);
      v && (e.disableNavigation && !t.days.some((w) => w.isEqualTo(v)) || (t.goToDay(v), u(v)));
    }
  };
}
function Up(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [a, s] = fr(n, o ? n : void 0), i = o ? n : a, { isSameDay: c } = t, l = (m) => (i == null ? void 0 : i.some((y) => c(y, m))) ?? !1, { min: u, max: d } = e;
  return {
    selected: i,
    select: (m, y, g) => {
      let b = [...i ?? []];
      if (l(m)) {
        if ((i == null ? void 0 : i.length) === u || r && (i == null ? void 0 : i.length) === 1)
          return;
        b = i == null ? void 0 : i.filter((v) => !c(v, m));
      } else
        (i == null ? void 0 : i.length) === d ? b = [m] : b = [...b, m];
      return o || s(b), o == null || o(b, m, y, g), b;
    },
    isSelected: l
  };
}
function qp(e, t, n = 0, r = 0, o = !1, a = ot) {
  const { from: s, to: i } = t || {}, { isSameDay: c, isAfter: l, isBefore: u } = a;
  let d;
  if (!s && !i)
    d = { from: e, to: n > 0 ? void 0 : e };
  else if (s && !i)
    c(s, e) ? n === 0 ? d = { from: s, to: e } : o ? d = { from: s, to: void 0 } : d = void 0 : u(e, s) ? d = { from: e, to: s } : d = { from: s, to: e };
  else if (s && i)
    if (c(s, e) && c(i, e))
      o ? d = { from: s, to: i } : d = void 0;
    else if (c(s, e))
      d = { from: s, to: n > 0 ? void 0 : e };
    else if (c(i, e))
      d = { from: e, to: n > 0 ? void 0 : e };
    else if (u(e, s))
      d = { from: e, to: i };
    else if (l(e, s))
      d = { from: s, to: e };
    else if (l(e, i))
      d = { from: s, to: e };
    else
      throw new Error("Invalid range");
  if (d != null && d.from && (d != null && d.to)) {
    const f = a.differenceInCalendarDays(d.to, d.from);
    r > 0 && f > r ? d = { from: e, to: void 0 } : n > 1 && f < n && (d = { from: e, to: void 0 });
  }
  return d;
}
function Xp(e, t, n = ot) {
  const r = Array.isArray(t) ? t : [t];
  let o = e.from;
  const a = n.differenceInCalendarDays(e.to, e.from), s = Math.min(a, 6);
  for (let i = 0; i <= s; i++) {
    if (r.includes(o.getDay()))
      return !0;
    o = n.addDays(o, 1);
  }
  return !1;
}
function Oa(e, t, n = ot) {
  return ct(e, t.from, !1, n) || ct(e, t.to, !1, n) || ct(t, e.from, !1, n) || ct(t, e.to, !1, n);
}
function Kp(e, t, n = ot) {
  const r = Array.isArray(t) ? t : [t];
  if (r.filter((i) => typeof i != "function").some((i) => typeof i == "boolean" ? i : n.isDate(i) ? ct(e, i, !1, n) : ni(i, n) ? i.some((c) => ct(e, c, !1, n)) : ur(i) ? i.from && i.to ? Oa(e, { from: i.from, to: i.to }, n) : !1 : ti(i) ? Xp(e, i.dayOfWeek, n) : wo(i) ? n.isAfter(i.before, i.after) ? Oa(e, {
    from: n.addDays(i.after, 1),
    to: n.addDays(i.before, -1)
  }, n) : lt(e.from, i, n) || lt(e.to, i, n) : xo(i) || Co(i) ? lt(e.from, i, n) || lt(e.to, i, n) : !1))
    return !0;
  const s = r.filter((i) => typeof i == "function");
  if (s.length) {
    let i = e.from;
    const c = n.differenceInCalendarDays(e.to, e.from);
    for (let l = 0; l <= c; l++) {
      if (s.some((u) => u(i)))
        return !0;
      i = n.addDays(i, 1);
    }
  }
  return !1;
}
function Qp(e, t) {
  const { disabled: n, excludeDisabled: r, selected: o, required: a, onSelect: s } = e, [i, c] = fr(o, s ? o : void 0), l = s ? o : i;
  return {
    selected: l,
    select: (f, m, y) => {
      const { min: g, max: b } = e, v = f ? qp(f, l, g, b, a, t) : void 0;
      return r && n && (v != null && v.from) && v.to && Kp({ from: v.from, to: v.to }, n, t) && (v.from = f, v.to = void 0), s || c(v), s == null || s(v, f, m, y), v;
    },
    isSelected: (f) => l && ct(l, f, !1, t)
  };
}
function Zp(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [a, s] = fr(n, o ? n : void 0), i = o ? n : a, { isSameDay: c } = t;
  return {
    selected: i,
    select: (d, f, m) => {
      let y = d;
      return !r && i && i && c(d, i) && (y = void 0), o || s(y), o == null || o(y, d, f, m), y;
    },
    isSelected: (d) => i ? c(i, d) : !1
  };
}
function Jp(e, t) {
  const n = Zp(e, t), r = Up(e, t), o = Qp(e, t);
  switch (e.mode) {
    case "single":
      return n;
    case "multiple":
      return r;
    case "range":
      return o;
    default:
      return;
  }
}
function _e(e, t) {
  return e instanceof ke && e.timeZone === t ? e : new ke(e, t);
}
function Vt(e, t, n) {
  return _e(e, t);
}
function Ea(e, t, n) {
  return typeof e == "boolean" || typeof e == "function" ? e : e instanceof Date ? Vt(e, t) : Array.isArray(e) ? e.map((r) => r instanceof Date ? Vt(r, t) : r) : ur(e) ? {
    ...e,
    from: e.from ? _e(e.from, t) : e.from,
    to: e.to ? _e(e.to, t) : e.to
  } : wo(e) ? {
    before: Vt(e.before, t),
    after: Vt(e.after, t)
  } : xo(e) ? {
    after: Vt(e.after, t)
  } : Co(e) ? {
    before: Vt(e.before, t)
  } : e;
}
function Lr(e, t, n) {
  return e && (Array.isArray(e) ? e.map((r) => Ea(r, t)) : Ea(e, t));
}
function pi(e) {
  var We;
  let t = e;
  const n = t.timeZone;
  if (n && (t = {
    ...e,
    timeZone: n
  }, t.today && (t.today = _e(t.today, n)), t.month && (t.month = _e(t.month, n)), t.defaultMonth && (t.defaultMonth = _e(t.defaultMonth, n)), t.startMonth && (t.startMonth = _e(t.startMonth, n)), t.endMonth && (t.endMonth = _e(t.endMonth, n)), t.mode === "single" && t.selected ? t.selected = _e(t.selected, n) : t.mode === "multiple" && t.selected ? t.selected = (We = t.selected) == null ? void 0 : We.map((X) => _e(X, n)) : t.mode === "range" && t.selected && (t.selected = {
    from: t.selected.from ? _e(t.selected.from, n) : t.selected.from,
    to: t.selected.to ? _e(t.selected.to, n) : t.selected.to
  }), t.disabled !== void 0 && (t.disabled = Lr(t.disabled, n)), t.hidden !== void 0 && (t.hidden = Lr(t.hidden, n)), t.modifiers)) {
    const X = {};
    Object.keys(t.modifiers).forEach((ne) => {
      var U;
      X[ne] = Lr((U = t.modifiers) == null ? void 0 : U[ne], n);
    }), t.modifiers = X;
  }
  const { components: r, formatters: o, labels: a, dateLib: s, locale: i, classNames: c } = Ee(() => {
    const X = { ...Zs, ...t.locale }, ne = t.broadcastCalendar ? 1 : t.weekStartsOn, U = t.noonSafe && t.timeZone ? Pp(t.timeZone, {
      weekStartsOn: ne,
      locale: X
    }) : void 0, J = t.dateLib && U ? { ...U, ...t.dateLib } : t.dateLib ?? U, V = new we({
      locale: X,
      weekStartsOn: ne,
      firstWeekContainsDate: t.firstWeekContainsDate,
      useAdditionalWeekYearTokens: t.useAdditionalWeekYearTokens,
      useAdditionalDayOfYearTokens: t.useAdditionalDayOfYearTokens,
      timeZone: t.timeZone,
      numerals: t.numerals
    }, J);
    return {
      dateLib: V,
      components: lp(t.components),
      formatters: wp(t.formatters),
      labels: Np(t.labels, V.options),
      locale: X,
      classNames: { ...up(), ...t.classNames }
    };
  }, [
    t.locale,
    t.broadcastCalendar,
    t.weekStartsOn,
    t.firstWeekContainsDate,
    t.useAdditionalWeekYearTokens,
    t.useAdditionalDayOfYearTokens,
    t.timeZone,
    t.numerals,
    t.dateLib,
    t.noonSafe,
    t.components,
    t.formatters,
    t.labels,
    t.classNames
  ]);
  t.today || (t = { ...t, today: s.today() });
  const { captionLayout: l, mode: u, navLayout: d, numberOfMonths: f = 1, onDayBlur: m, onDayClick: y, onDayFocus: g, onDayKeyDown: b, onDayMouseEnter: v, onDayMouseLeave: x, onNextClick: w, onPrevClick: M, showWeekNumber: N, styles: C } = t, { formatCaption: O, formatDay: _, formatMonthDropdown: B, formatWeekNumber: I, formatWeekNumberHeader: F, formatWeekdayName: T, formatYearDropdown: Y } = o, D = zp(t, s), { days: R, months: S, navStart: A, navEnd: E, previousMonth: W, nextMonth: $, goToMonth: z } = D, te = ip(R, t, A, E, s), { isSelected: H, select: q, selected: K } = Jp(t, s) ?? {}, { blur: le, focused: ue, isFocusTarget: Z, moveFocus: he, setFocused: se } = Gp(t, D, te, H ?? (() => !1), s), { labelDayButton: ge, labelGridcell: ve, labelGrid: De, labelMonthDropdown: mt, labelNav: Wt, labelPrevious: $t, labelNext: at, labelWeekday: Ft, labelWeekNumber: xe, labelWeekNumberHeader: Cr, labelYearDropdown: kr } = a, Me = Ee(() => Op(s, t.ISOWeek, t.broadcastCalendar, t.today), [s, t.ISOWeek, t.broadcastCalendar, t.today]), st = u !== void 0 || y !== void 0, sn = Ae(() => {
    W && (z(W), M == null || M(W));
  }, [W, z, M]), cn = Ae(() => {
    $ && (z($), w == null || w($));
  }, [z, $, w]), Yt = Ae((X, ne) => (U) => {
    U.preventDefault(), U.stopPropagation(), se(X), !ne.disabled && (q == null || q(X.date, ne, U), y == null || y(X.date, ne, U));
  }, [q, y, se]), Mr = Ae((X, ne) => (U) => {
    se(X), g == null || g(X.date, ne, U);
  }, [g, se]), En = Ae((X, ne) => (U) => {
    le(), m == null || m(X.date, ne, U);
  }, [le, m]), ln = Ae((X, ne) => (U) => {
    const J = {
      ArrowLeft: [
        U.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "after" : "before"
      ],
      ArrowRight: [
        U.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "before" : "after"
      ],
      ArrowDown: [U.shiftKey ? "year" : "week", "after"],
      ArrowUp: [U.shiftKey ? "year" : "week", "before"],
      PageUp: [U.shiftKey ? "year" : "month", "before"],
      PageDown: [U.shiftKey ? "year" : "month", "after"],
      Home: ["startOfWeek", "before"],
      End: ["endOfWeek", "after"]
    };
    if (J[U.key]) {
      U.preventDefault(), U.stopPropagation();
      const [V, G] = J[U.key];
      he(V, G);
    }
    b == null || b(X.date, ne, U);
  }, [he, b, t.dir]), pt = Ae((X, ne) => (U) => {
    v == null || v(X.date, ne, U);
  }, [v]), Pn = Ae((X, ne) => (U) => {
    x == null || x(X.date, ne, U);
  }, [x]), gt = Ae((X) => (ne) => {
    const U = Number(ne.target.value), J = s.setMonth(s.startOfMonth(X), U);
    z(J);
  }, [s, z]), Nr = Ae((X) => (ne) => {
    const U = Number(ne.target.value), J = s.setYear(s.startOfMonth(X), U);
    z(J);
  }, [s, z]), { className: Sr, style: Rn } = Ee(() => ({
    className: [c[j.Root], t.className].filter(Boolean).join(" "),
    style: { ...C == null ? void 0 : C[j.Root], ...t.style }
  }), [c, t.className, t.style, C]), Tn = dp(t), An = xt(null);
  _p(An, !!t.animate, {
    classNames: c,
    months: S,
    focused: ue,
    dateLib: s
  });
  const dn = {
    dayPickerProps: t,
    selected: K,
    select: q,
    isSelected: H,
    months: S,
    nextMonth: $,
    previousMonth: W,
    goToMonth: z,
    getModifiers: te,
    components: r,
    classNames: c,
    styles: C,
    labels: a,
    formatters: o
  };
  return k.createElement(
    ei.Provider,
    { value: dn },
    k.createElement(
      r.Root,
      { rootRef: t.animate ? An : void 0, className: Sr, style: Rn, dir: t.dir, id: t.id, lang: t.lang, nonce: t.nonce, title: t.title, role: t.role, "aria-label": t["aria-label"], "aria-labelledby": t["aria-labelledby"], ...Tn },
      k.createElement(
        r.Months,
        { className: c[j.Months], style: C == null ? void 0 : C[j.Months] },
        !t.hideNavigation && !d && k.createElement(r.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: c[j.Nav], style: C == null ? void 0 : C[j.Nav], "aria-label": Wt(), onPreviousClick: sn, onNextClick: cn, previousMonth: W, nextMonth: $ }),
        S.map((X, ne) => k.createElement(
          r.Month,
          {
            "data-animated-month": t.animate ? "true" : void 0,
            className: c[j.Month],
            style: C == null ? void 0 : C[j.Month],
            // biome-ignore lint/suspicious/noArrayIndexKey: breaks animation
            key: ne,
            displayIndex: ne,
            calendarMonth: X
          },
          d === "around" && !t.hideNavigation && ne === 0 && k.createElement(
            r.PreviousMonthButton,
            { type: "button", className: c[j.PreviousMonthButton], tabIndex: W ? void 0 : -1, "aria-disabled": W ? void 0 : !0, "aria-label": $t(W), onClick: sn, "data-animated-button": t.animate ? "true" : void 0 },
            k.createElement(r.Chevron, { disabled: W ? void 0 : !0, className: c[j.Chevron], orientation: t.dir === "rtl" ? "right" : "left" })
          ),
          k.createElement(r.MonthCaption, { "data-animated-caption": t.animate ? "true" : void 0, className: c[j.MonthCaption], style: C == null ? void 0 : C[j.MonthCaption], calendarMonth: X, displayIndex: ne }, l != null && l.startsWith("dropdown") ? k.createElement(
            r.DropdownNav,
            { className: c[j.Dropdowns], style: C == null ? void 0 : C[j.Dropdowns] },
            (() => {
              const U = l === "dropdown" || l === "dropdown-months" ? k.createElement(r.MonthsDropdown, { key: "month", className: c[j.MonthsDropdown], "aria-label": mt(), classNames: c, components: r, disabled: !!t.disableNavigation, onChange: gt(X.date), options: Sp(X.date, A, E, o, s), style: C == null ? void 0 : C[j.Dropdown], value: s.getMonth(X.date) }) : k.createElement("span", { key: "month" }, B(X.date, s)), J = l === "dropdown" || l === "dropdown-years" ? k.createElement(r.YearsDropdown, { key: "year", className: c[j.YearsDropdown], "aria-label": kr(s.options), classNames: c, components: r, disabled: !!t.disableNavigation, onChange: Nr(X.date), options: Ep(A, E, o, s, !!t.reverseYears), style: C == null ? void 0 : C[j.Dropdown], value: s.getYear(X.date) }) : k.createElement("span", { key: "year" }, Y(X.date, s));
              return s.getMonthYearOrder() === "year-first" ? [J, U] : [U, J];
            })(),
            k.createElement("span", { role: "status", "aria-live": "polite", style: {
              border: 0,
              clip: "rect(0 0 0 0)",
              height: "1px",
              margin: "-1px",
              overflow: "hidden",
              padding: 0,
              position: "absolute",
              width: "1px",
              whiteSpace: "nowrap",
              wordWrap: "normal"
            } }, O(X.date, s.options, s))
          ) : k.createElement(r.CaptionLabel, { className: c[j.CaptionLabel], role: "status", "aria-live": "polite" }, O(X.date, s.options, s))),
          d === "around" && !t.hideNavigation && ne === f - 1 && k.createElement(
            r.NextMonthButton,
            { type: "button", className: c[j.NextMonthButton], tabIndex: $ ? void 0 : -1, "aria-disabled": $ ? void 0 : !0, "aria-label": at($), onClick: cn, "data-animated-button": t.animate ? "true" : void 0 },
            k.createElement(r.Chevron, { disabled: $ ? void 0 : !0, className: c[j.Chevron], orientation: t.dir === "rtl" ? "left" : "right" })
          ),
          ne === f - 1 && d === "after" && !t.hideNavigation && k.createElement(r.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: c[j.Nav], style: C == null ? void 0 : C[j.Nav], "aria-label": Wt(), onPreviousClick: sn, onNextClick: cn, previousMonth: W, nextMonth: $ }),
          k.createElement(
            r.MonthGrid,
            { role: "grid", "aria-multiselectable": u === "multiple" || u === "range", "aria-label": De(X.date, s.options, s) || void 0, className: c[j.MonthGrid], style: C == null ? void 0 : C[j.MonthGrid] },
            !t.hideWeekdays && k.createElement(
              r.Weekdays,
              { "data-animated-weekdays": t.animate ? "true" : void 0, className: c[j.Weekdays], style: C == null ? void 0 : C[j.Weekdays] },
              N && k.createElement(r.WeekNumberHeader, { "aria-label": Cr(s.options), className: c[j.WeekNumberHeader], style: C == null ? void 0 : C[j.WeekNumberHeader], scope: "col" }, F()),
              Me.map((U) => k.createElement(r.Weekday, { "aria-label": Ft(U, s.options, s), className: c[j.Weekday], key: String(U), style: C == null ? void 0 : C[j.Weekday], scope: "col" }, T(U, s.options, s)))
            ),
            k.createElement(r.Weeks, { "data-animated-weeks": t.animate ? "true" : void 0, className: c[j.Weeks], style: C == null ? void 0 : C[j.Weeks] }, X.weeks.map((U) => k.createElement(
              r.Week,
              { className: c[j.Week], key: U.weekNumber, style: C == null ? void 0 : C[j.Week], week: U },
              N && k.createElement(r.WeekNumber, { week: U, style: C == null ? void 0 : C[j.WeekNumber], "aria-label": xe(U.weekNumber, {
                locale: i
              }), className: c[j.WeekNumber], scope: "row", role: "rowheader" }, I(U.weekNumber, s)),
              U.days.map((J) => {
                const { date: V } = J, G = te(J);
                if (G[de.focused] = !G.hidden && !!(ue != null && ue.isEqualTo(J)), G[Be.selected] = (H == null ? void 0 : H(V)) || G.selected, ur(K)) {
                  const { from: fe, to: Ce } = K;
                  G[Be.range_start] = !!(fe && Ce && s.isSameDay(V, fe)), G[Be.range_end] = !!(fe && Ce && s.isSameDay(V, Ce)), G[Be.range_middle] = ct(K, V, !0, s);
                }
                const be = Dp(G, C, t.modifiersStyles), Ne = cp(G, c, t.modifiersClassNames), Bt = !st && !G.hidden ? ve(V, G, s.options, s) : void 0;
                return k.createElement(r.Day, { key: `${J.isoDate}_${J.displayMonthId}`, day: J, modifiers: G, className: Ne.join(" "), style: be, role: "gridcell", "aria-selected": G.selected || void 0, "aria-label": Bt, "data-day": J.isoDate, "data-month": J.outside ? J.dateMonthId : void 0, "data-selected": G.selected || void 0, "data-disabled": G.disabled || void 0, "data-hidden": G.hidden || void 0, "data-outside": J.outside || void 0, "data-focused": G.focused || void 0, "data-today": G.today || void 0 }, !G.hidden && st ? k.createElement(r.DayButton, { className: c[j.DayButton], style: C == null ? void 0 : C[j.DayButton], type: "button", day: J, modifiers: G, disabled: !G.focused && G.disabled || void 0, "aria-disabled": G.focused && G.disabled || void 0, tabIndex: Z(J) ? 0 : -1, "aria-label": ge(V, G, s.options, s), onClick: Yt(J, G), onBlur: En(J, G), onFocus: Mr(J, G), onKeyDown: ln(J, G), onMouseEnter: pt(J, G), onMouseLeave: Pn(J, G) }, _(V, s.options, s)) : !G.hidden && _(J.date, s.options, s));
              })
            )))
          )
        ))
      ),
      t.footer && k.createElement(r.Footer, { className: c[j.Footer], style: C == null ? void 0 : C[j.Footer], role: "status", "aria-live": "polite" }, t.footer)
    )
  );
}
const gi = {
  ...Rm,
  labels: {
    labelDayButton: (e, t, n, r) => {
      let a = (r ?? new we(n)).format(e, "PPPP");
      return t.today && (a = `오늘, ${a}`), t.selected && (a = `${a}, 선택됨`), a;
    },
    labelMonthDropdown: "월 선택",
    labelNext: "다음 달로 이동",
    labelPrevious: "이전 달로 이동",
    labelWeekNumber: (e) => `주 ${e}`,
    labelYearDropdown: "연도 선택",
    labelGrid: (e, t, n) => (n ?? new we(t)).formatMonthYear(e),
    labelGridcell: (e, t, n, r) => {
      let a = (r ?? new we(n)).format(e, "PPPP");
      return t != null && t.today && (a = `오늘, ${a}`), a;
    },
    labelNav: "탐색 모음",
    labelWeekNumberHeader: "주 번호",
    labelWeekday: (e, t, n) => (n ?? new we(t)).format(e, "cccc")
  }
};
var eg = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function tg(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var bi = { exports: {} };
(function(e, t) {
  (function(n, r) {
    e.exports = r();
  })(eg, function() {
    var n = 1e3, r = 6e4, o = 36e5, a = "millisecond", s = "second", i = "minute", c = "hour", l = "day", u = "week", d = "month", f = "quarter", m = "year", y = "date", g = "Invalid Date", b = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, v = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, x = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(D) {
      var R = ["th", "st", "nd", "rd"], S = D % 100;
      return "[" + D + (R[(S - 20) % 10] || R[S] || R[0]) + "]";
    } }, w = function(D, R, S) {
      var A = String(D);
      return !A || A.length >= R ? D : "" + Array(R + 1 - A.length).join(S) + D;
    }, M = { s: w, z: function(D) {
      var R = -D.utcOffset(), S = Math.abs(R), A = Math.floor(S / 60), E = S % 60;
      return (R <= 0 ? "+" : "-") + w(A, 2, "0") + ":" + w(E, 2, "0");
    }, m: function D(R, S) {
      if (R.date() < S.date()) return -D(S, R);
      var A = 12 * (S.year() - R.year()) + (S.month() - R.month()), E = R.clone().add(A, d), W = S - E < 0, $ = R.clone().add(A + (W ? -1 : 1), d);
      return +(-(A + (S - E) / (W ? E - $ : $ - E)) || 0);
    }, a: function(D) {
      return D < 0 ? Math.ceil(D) || 0 : Math.floor(D);
    }, p: function(D) {
      return { M: d, y: m, w: u, d: l, D: y, h: c, m: i, s, ms: a, Q: f }[D] || String(D || "").toLowerCase().replace(/s$/, "");
    }, u: function(D) {
      return D === void 0;
    } }, N = "en", C = {};
    C[N] = x;
    var O = "$isDayjsObject", _ = function(D) {
      return D instanceof T || !(!D || !D[O]);
    }, B = function D(R, S, A) {
      var E;
      if (!R) return N;
      if (typeof R == "string") {
        var W = R.toLowerCase();
        C[W] && (E = W), S && (C[W] = S, E = W);
        var $ = R.split("-");
        if (!E && $.length > 1) return D($[0]);
      } else {
        var z = R.name;
        C[z] = R, E = z;
      }
      return !A && E && (N = E), E || !A && N;
    }, I = function(D, R) {
      if (_(D)) return D.clone();
      var S = typeof R == "object" ? R : {};
      return S.date = D, S.args = arguments, new T(S);
    }, F = M;
    F.l = B, F.i = _, F.w = function(D, R) {
      return I(D, { locale: R.$L, utc: R.$u, x: R.$x, $offset: R.$offset });
    };
    var T = function() {
      function D(S) {
        this.$L = B(S.locale, null, !0), this.parse(S), this.$x = this.$x || S.x || {}, this[O] = !0;
      }
      var R = D.prototype;
      return R.parse = function(S) {
        this.$d = function(A) {
          var E = A.date, W = A.utc;
          if (E === null) return /* @__PURE__ */ new Date(NaN);
          if (F.u(E)) return /* @__PURE__ */ new Date();
          if (E instanceof Date) return new Date(E);
          if (typeof E == "string" && !/Z$/i.test(E)) {
            var $ = E.match(b);
            if ($) {
              var z = $[2] - 1 || 0, te = ($[7] || "0").substring(0, 3);
              return W ? new Date(Date.UTC($[1], z, $[3] || 1, $[4] || 0, $[5] || 0, $[6] || 0, te)) : new Date($[1], z, $[3] || 1, $[4] || 0, $[5] || 0, $[6] || 0, te);
            }
          }
          return new Date(E);
        }(S), this.init();
      }, R.init = function() {
        var S = this.$d;
        this.$y = S.getFullYear(), this.$M = S.getMonth(), this.$D = S.getDate(), this.$W = S.getDay(), this.$H = S.getHours(), this.$m = S.getMinutes(), this.$s = S.getSeconds(), this.$ms = S.getMilliseconds();
      }, R.$utils = function() {
        return F;
      }, R.isValid = function() {
        return this.$d.toString() !== g;
      }, R.isSame = function(S, A) {
        var E = I(S);
        return this.startOf(A) <= E && E <= this.endOf(A);
      }, R.isAfter = function(S, A) {
        return I(S) < this.startOf(A);
      }, R.isBefore = function(S, A) {
        return this.endOf(A) < I(S);
      }, R.$g = function(S, A, E) {
        return F.u(S) ? this[A] : this.set(E, S);
      }, R.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, R.valueOf = function() {
        return this.$d.getTime();
      }, R.startOf = function(S, A) {
        var E = this, W = !!F.u(A) || A, $ = F.p(S), z = function(he, se) {
          var ge = F.w(E.$u ? Date.UTC(E.$y, se, he) : new Date(E.$y, se, he), E);
          return W ? ge : ge.endOf(l);
        }, te = function(he, se) {
          return F.w(E.toDate()[he].apply(E.toDate("s"), (W ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(se)), E);
        }, H = this.$W, q = this.$M, K = this.$D, le = "set" + (this.$u ? "UTC" : "");
        switch ($) {
          case m:
            return W ? z(1, 0) : z(31, 11);
          case d:
            return W ? z(1, q) : z(0, q + 1);
          case u:
            var ue = this.$locale().weekStart || 0, Z = (H < ue ? H + 7 : H) - ue;
            return z(W ? K - Z : K + (6 - Z), q);
          case l:
          case y:
            return te(le + "Hours", 0);
          case c:
            return te(le + "Minutes", 1);
          case i:
            return te(le + "Seconds", 2);
          case s:
            return te(le + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, R.endOf = function(S) {
        return this.startOf(S, !1);
      }, R.$set = function(S, A) {
        var E, W = F.p(S), $ = "set" + (this.$u ? "UTC" : ""), z = (E = {}, E[l] = $ + "Date", E[y] = $ + "Date", E[d] = $ + "Month", E[m] = $ + "FullYear", E[c] = $ + "Hours", E[i] = $ + "Minutes", E[s] = $ + "Seconds", E[a] = $ + "Milliseconds", E)[W], te = W === l ? this.$D + (A - this.$W) : A;
        if (W === d || W === m) {
          var H = this.clone().set(y, 1);
          H.$d[z](te), H.init(), this.$d = H.set(y, Math.min(this.$D, H.daysInMonth())).$d;
        } else z && this.$d[z](te);
        return this.init(), this;
      }, R.set = function(S, A) {
        return this.clone().$set(S, A);
      }, R.get = function(S) {
        return this[F.p(S)]();
      }, R.add = function(S, A) {
        var E, W = this;
        S = Number(S);
        var $ = F.p(A), z = function(q) {
          var K = I(W);
          return F.w(K.date(K.date() + Math.round(q * S)), W);
        };
        if ($ === d) return this.set(d, this.$M + S);
        if ($ === m) return this.set(m, this.$y + S);
        if ($ === l) return z(1);
        if ($ === u) return z(7);
        var te = (E = {}, E[i] = r, E[c] = o, E[s] = n, E)[$] || 1, H = this.$d.getTime() + S * te;
        return F.w(H, this);
      }, R.subtract = function(S, A) {
        return this.add(-1 * S, A);
      }, R.format = function(S) {
        var A = this, E = this.$locale();
        if (!this.isValid()) return E.invalidDate || g;
        var W = S || "YYYY-MM-DDTHH:mm:ssZ", $ = F.z(this), z = this.$H, te = this.$m, H = this.$M, q = E.weekdays, K = E.months, le = E.meridiem, ue = function(se, ge, ve, De) {
          return se && (se[ge] || se(A, W)) || ve[ge].slice(0, De);
        }, Z = function(se) {
          return F.s(z % 12 || 12, se, "0");
        }, he = le || function(se, ge, ve) {
          var De = se < 12 ? "AM" : "PM";
          return ve ? De.toLowerCase() : De;
        };
        return W.replace(v, function(se, ge) {
          return ge || function(ve) {
            switch (ve) {
              case "YY":
                return String(A.$y).slice(-2);
              case "YYYY":
                return F.s(A.$y, 4, "0");
              case "M":
                return H + 1;
              case "MM":
                return F.s(H + 1, 2, "0");
              case "MMM":
                return ue(E.monthsShort, H, K, 3);
              case "MMMM":
                return ue(K, H);
              case "D":
                return A.$D;
              case "DD":
                return F.s(A.$D, 2, "0");
              case "d":
                return String(A.$W);
              case "dd":
                return ue(E.weekdaysMin, A.$W, q, 2);
              case "ddd":
                return ue(E.weekdaysShort, A.$W, q, 3);
              case "dddd":
                return q[A.$W];
              case "H":
                return String(z);
              case "HH":
                return F.s(z, 2, "0");
              case "h":
                return Z(1);
              case "hh":
                return Z(2);
              case "a":
                return he(z, te, !0);
              case "A":
                return he(z, te, !1);
              case "m":
                return String(te);
              case "mm":
                return F.s(te, 2, "0");
              case "s":
                return String(A.$s);
              case "ss":
                return F.s(A.$s, 2, "0");
              case "SSS":
                return F.s(A.$ms, 3, "0");
              case "Z":
                return $;
            }
            return null;
          }(se) || $.replace(":", "");
        });
      }, R.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, R.diff = function(S, A, E) {
        var W, $ = this, z = F.p(A), te = I(S), H = (te.utcOffset() - this.utcOffset()) * r, q = this - te, K = function() {
          return F.m($, te);
        };
        switch (z) {
          case m:
            W = K() / 12;
            break;
          case d:
            W = K();
            break;
          case f:
            W = K() / 3;
            break;
          case u:
            W = (q - H) / 6048e5;
            break;
          case l:
            W = (q - H) / 864e5;
            break;
          case c:
            W = q / o;
            break;
          case i:
            W = q / r;
            break;
          case s:
            W = q / n;
            break;
          default:
            W = q;
        }
        return E ? W : F.a(W);
      }, R.daysInMonth = function() {
        return this.endOf(d).$D;
      }, R.$locale = function() {
        return C[this.$L];
      }, R.locale = function(S, A) {
        if (!S) return this.$L;
        var E = this.clone(), W = B(S, A, !0);
        return W && (E.$L = W), E;
      }, R.clone = function() {
        return F.w(this.$d, this);
      }, R.toDate = function() {
        return new Date(this.valueOf());
      }, R.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, R.toISOString = function() {
        return this.$d.toISOString();
      }, R.toString = function() {
        return this.$d.toUTCString();
      }, D;
    }(), Y = T.prototype;
    return I.prototype = Y, [["$ms", a], ["$s", s], ["$m", i], ["$H", c], ["$W", l], ["$M", d], ["$y", m], ["$D", y]].forEach(function(D) {
      Y[D[1]] = function(R) {
        return this.$g(R, D[0], D[1]);
      };
    }), I.extend = function(D, R) {
      return D.$i || (D(R, T, I), D.$i = !0), I;
    }, I.locale = B, I.isDayjs = _, I.unix = function(D) {
      return I(1e3 * D);
    }, I.en = C[N], I.Ls = C, I.p = {}, I;
  });
})(bi);
var ng = bi.exports;
const me = /* @__PURE__ */ tg(ng), rg = k.forwardRef(
  ({
    value: e,
    onChange: t,
    label: n,
    placeholder: r = "YYYY-MM-DD",
    min: o,
    max: a,
    disabled: s = !1,
    error: i = !1,
    errorMessage: c,
    helperText: l,
    className: u
  }, d) => {
    const [f, m] = ye(!1), [y, g] = ye(
      e ? me(e) : void 0
    );
    Tt(() => {
      g(e ? me(e) : void 0);
    }, [e]);
    const b = Ee(() => y == null ? void 0 : y.toDate(), [y]), v = (C) => {
      if (!C) {
        g(void 0);
        return;
      }
      const O = me(C);
      g(O);
    }, x = () => {
      y && (t == null || t(y.format("YYYY-MM-DD")), m(!1));
    }, w = () => {
      g(e ? me(e) : void 0), m(!1);
    }, M = Ee(() => e ? me(e).format("YYYY-MM-DD") : "", [e]), N = Ee(() => {
      const C = [];
      return o && C.push({ before: me(o).toDate() }), a && C.push({ after: me(a).toDate() }), C.length > 0 ? C : void 0;
    }, [o, a]);
    return /* @__PURE__ */ L("div", { ref: d, className: P("flex flex-col gap-1", u), children: [
      n && /* @__PURE__ */ h("label", { className: "text-sm font-medium text-gray-700", children: n }),
      /* @__PURE__ */ L(
        cr,
        {
          open: f && !s,
          onOpenChange: m,
          children: [
            /* @__PURE__ */ h(lr, { asChild: !0, children: /* @__PURE__ */ h("div", { className: "relative", children: /* @__PURE__ */ h(
              "input",
              {
                type: "text",
                readOnly: !0,
                value: M,
                placeholder: r,
                disabled: s,
                className: P(
                  "w-full h-10 px-3 border rounded bg-white text-sm",
                  "hover:bg-gray-50 hover:border-gray-400",
                  "focus:outline-none",
                  "transition-all duration-150",
                  "cursor-pointer",
                  i ? "border-red-500" : "border-gray-300",
                  s && P(
                    "bg-gray-100 cursor-not-allowed",
                    "hover:bg-gray-100 hover:border-gray-300"
                  )
                )
              }
            ) }) }),
            /* @__PURE__ */ h(dr, { children: /* @__PURE__ */ L(
              kn,
              {
                align: "start",
                sideOffset: 5,
                className: P(
                  "z-50 bg-white rounded-lg shadow-xl p-2",
                  "border border-gray-200",
                  "data-[state=open]:animate-in",
                  "data-[state=closed]:animate-out",
                  "data-[state=closed]:fade-out-0",
                  "data-[state=open]:fade-in-0",
                  "data-[state=closed]:zoom-out-95",
                  "data-[state=open]:zoom-in-95",
                  "data-[side=bottom]:slide-in-from-top-2",
                  "data-[side=top]:slide-in-from-bottom-2"
                ),
                children: [
                  /* @__PURE__ */ h("div", { className: "date-picker-calendar", children: /* @__PURE__ */ h(
                    pi,
                    {
                      mode: "single",
                      selected: b,
                      onSelect: v,
                      locale: gi,
                      disabled: N,
                      formatters: {
                        formatCaption: (C) => `${C.getFullYear()}년 ${C.getMonth() + 1}월`
                      }
                    }
                  ) }),
                  /* @__PURE__ */ L(
                    "div",
                    {
                      className: P(
                        "flex items-end justify-between mt-2 pt-2",
                        "border-t border-gray-200"
                      ),
                      children: [
                        /* @__PURE__ */ h("div", { className: "flex flex-col min-h-8", children: y ? /* @__PURE__ */ h("span", { className: "text-xs text-gray-700", children: y.format("YYYY-MM-DD") }) : /* @__PURE__ */ h("span", { className: "text-xs text-red-500", children: "날짜를 선택해 주세요." }) }),
                        /* @__PURE__ */ L("div", { className: "flex gap-2", children: [
                          /* @__PURE__ */ h(
                            "button",
                            {
                              onClick: w,
                              className: P(
                                "w-15 h-8 rounded cursor-pointer",
                                "text-xs font-medium text-gray-700",
                                "border border-gray-300 bg-transparent",
                                "transition-all duration-150",
                                "active:scale-95",
                                "hover:bg-gray-50"
                              ),
                              children: "취소"
                            }
                          ),
                          /* @__PURE__ */ h(
                            "button",
                            {
                              onClick: x,
                              disabled: !y,
                              className: P(
                                "border-0 cursor-pointer",
                                "w-15 h-8 bg-blue-600 rounded",
                                "text-xs text-white",
                                "hover:bg-blue-700",
                                "active:scale-95",
                                "disabled:bg-gray-300 ",
                                "disabled:cursor-not-allowed",
                                "disabled:active:scale-100",
                                "transition-all duration-150"
                              ),
                              children: "적용"
                            }
                          )
                        ] })
                      ]
                    }
                  )
                ]
              }
            ) })
          ]
        }
      ),
      (l || c) && /* @__PURE__ */ h("div", { children: i && c ? /* @__PURE__ */ h("p", { className: "text-xs text-red-500", children: c }) : l && /* @__PURE__ */ h("p", { className: "text-xs text-gray-500", children: l }) })
    ] });
  }
);
rg.displayName = "DatePicker";
const og = () => {
  const e = me();
  return [
    {
      label: "전체",
      getValue: () => [me("1970-01-01"), me("2099-12-31")]
    },
    {
      label: "오늘",
      getValue: () => [e, e]
    },
    {
      label: "내일",
      getValue: () => [e.add(1, "day"), e.add(1, "day")]
    },
    {
      label: "이번주",
      getValue: () => [e.startOf("week"), e.endOf("week")]
    },
    {
      label: "이번달",
      getValue: () => [e.startOf("month"), e.endOf("month")]
    },
    {
      label: "7일",
      getValue: () => [e, e.add(6, "day")]
    },
    {
      label: "30일",
      getValue: () => [e, e.add(29, "day")]
    },
    {
      label: "다음주",
      getValue: () => [
        e.add(1, "week").startOf("week"),
        e.add(1, "week").endOf("week")
      ]
    },
    {
      label: "다음달",
      getValue: () => [
        e.add(1, "month").startOf("month"),
        e.add(1, "month").endOf("month")
      ]
    }
  ];
}, ag = k.forwardRef(
  ({
    value: e,
    onChange: t,
    startLabel: n = "시작일자",
    endLabel: r = "종료일자",
    className: o
  }, a) => {
    const [s, i] = ye(!1), [c, l] = ye([
      e != null && e.start ? me(e.start) : void 0,
      e != null && e.end ? me(e.end) : void 0
    ]);
    Tt(() => {
      e && l([
        e.start ? me(e.start) : void 0,
        e.end ? me(e.end) : void 0
      ]);
    }, [e]);
    const [u, d] = c, f = Ee(() => {
      if (u)
        return {
          from: u.toDate(),
          to: d == null ? void 0 : d.toDate()
        };
    }, [u, d]), m = (w) => {
      const [M, N] = w.getValue();
      l([M, N]);
    }, y = (w) => {
      if (!w) {
        l([void 0, void 0]);
        return;
      }
      const M = w.from ? me(w.from) : void 0, N = w.to ? me(w.to) : void 0;
      l([M, N]);
    }, g = () => {
      u && d && (t == null || t({
        start: u.format("YYYY-MM-DD"),
        end: d.format("YYYY-MM-DD")
      }), i(!1));
    }, b = () => {
      l([
        e != null && e.start ? me(e.start) : void 0,
        e != null && e.end ? me(e.end) : void 0
      ]), i(!1);
    }, v = Ee(() => {
      if (!(!u || !d))
        return d.diff(u, "day") + 1;
    }, [u, d]), x = Ee(() => !(e != null && e.start) || !(e != null && e.end) ? { start: "", end: "" } : {
      start: me(e.start).format("YYYY-MM-DD"),
      end: me(e.end).format("YYYY-MM-DD")
    }, [e]);
    return /* @__PURE__ */ L(cr, { open: s, onOpenChange: i, children: [
      /* @__PURE__ */ h(lr, { asChild: !0, children: /* @__PURE__ */ L("div", { ref: a, className: P("flex items-center gap-0", o), children: [
        /* @__PURE__ */ L("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ h(
            "label",
            {
              className: P(
                "absolute left-3 top-1/2 -translate-y-1/2",
                "text-xs text-gray-500",
                "pointer-events-none"
              ),
              children: n
            }
          ),
          /* @__PURE__ */ h(
            "input",
            {
              type: "text",
              readOnly: !0,
              value: x.start,
              placeholder: "YYYY-MM-DD",
              className: P(
                "w-full h-10 pl-[59px] pr-3 bg-white text-sm",
                "focus:outline-none",
                "border border-gray-300 border-r-0 rounded-l",
                "hover:bg-gray-50 hover:border-gray-400",
                "transition-all duration-150",
                "cursor-pointer"
              )
            }
          )
        ] }),
        /* @__PURE__ */ L("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ h(
            "label",
            {
              className: P(
                "absolute left-3 top-1/2 -translate-y-1/2",
                "text-xs text-gray-500",
                "pointer-events-none"
              ),
              children: r
            }
          ),
          /* @__PURE__ */ h(
            "input",
            {
              type: "text",
              readOnly: !0,
              value: x.end,
              placeholder: "YYYY-MM-DD",
              className: P(
                "w-full h-10 pl-[59px] pr-3 bg-white",
                "text-sm",
                "border border-gray-300 rounded-r",
                "hover:bg-gray-50 hover:border-gray-400",
                "focus:outline-none",
                "transition-all duration-150",
                "cursor-pointer"
              )
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ h(dr, { children: /* @__PURE__ */ L(
        kn,
        {
          align: "start",
          sideOffset: 5,
          className: P(
            "z-50 p-2 bg-white rounded-lg",
            "border border-gray-200",
            "shadow-xl",
            "data-[state=open]:animate-in",
            "data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0",
            "data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95",
            "data-[state=open]:zoom-in-95",
            "data-[side=bottom]:slide-in-from-top-2",
            "data-[side=top]:slide-in-from-bottom-2"
          ),
          children: [
            /* @__PURE__ */ L("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ h("div", { className: "flex flex-col border-r border-gray-200 pr-2", children: og().map((w) => /* @__PURE__ */ h(
                "button",
                {
                  onClick: () => m(w),
                  className: P(
                    "border-0 cursor-pointer",
                    "w-[70px] h-[26px] px-2",
                    "text-left text-xs text-gray-700",
                    "bg-white",
                    "transition-all duration-150",
                    "hover:bg-blue-50",
                    "hover:font-medium",
                    "hover:text-blue-600"
                  ),
                  children: w.label
                },
                w.label
              )) }),
              /* @__PURE__ */ h("div", { className: "date-range-picker-calendar", children: /* @__PURE__ */ h(
                pi,
                {
                  mode: "range",
                  selected: f,
                  onSelect: y,
                  numberOfMonths: 2,
                  locale: gi,
                  formatters: {
                    formatCaption: (w) => `${w.getFullYear()}년 ${w.getMonth() + 1}월`
                  }
                }
              ) })
            ] }),
            /* @__PURE__ */ L(
              "div",
              {
                className: P(
                  "flex items-end justify-between mt-2 pt-2",
                  "border-t border-gray-200"
                ),
                children: [
                  /* @__PURE__ */ h("div", { className: "flex flex-col min-h-8", children: !u || !d ? /* @__PURE__ */ h("span", { className: "text-xs text-red-500", children: "종료일자를 선택해 주세요." }) : /* @__PURE__ */ L(Rt, { children: [
                    /* @__PURE__ */ L("span", { className: "text-xs text-gray-700", children: [
                      u.format("YYYY-MM-DD"),
                      " ~",
                      " ",
                      d.format("YYYY-MM-DD")
                    ] }),
                    /* @__PURE__ */ L("span", { className: "text-xs text-gray-500", children: [
                      "(",
                      v,
                      "일간)"
                    ] })
                  ] }) }),
                  /* @__PURE__ */ L("div", { className: "flex gap-2", children: [
                    /* @__PURE__ */ h(
                      "button",
                      {
                        onClick: b,
                        className: P(
                          "w-15 h-8 cursor-pointer",
                          "border border-gray-300 rounded bg-transparent",
                          "text-xs font-medium text-gray-700",
                          "transition-all duration-150",
                          "hover:bg-gray-50 active:scale-95"
                        ),
                        children: "취소"
                      }
                    ),
                    /* @__PURE__ */ h(
                      "button",
                      {
                        onClick: g,
                        disabled: !u || !d,
                        className: P(
                          "border-0 cursor-pointer",
                          "w-15 h-8",
                          "bg-blue-600 rounded",
                          "text-xs font-medium text-cms-white",
                          "hover:bg-blue-700 active:scale-95",
                          "disabled:bg-gray-300",
                          "disabled:active:scale-100",
                          "disabled:cursor-not-allowed",
                          "transition-all duration-150"
                        ),
                        children: "적용"
                      }
                    )
                  ] })
                ]
              }
            )
          ]
        }
      ) })
    ] });
  }
);
ag.displayName = "DateRangePicker";
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sg = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), ig = (e) => e.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (t, n, r) => r ? r.toUpperCase() : n.toLowerCase()
), Pa = (e) => {
  const t = ig(e);
  return t.charAt(0).toUpperCase() + t.slice(1);
}, vi = (...e) => e.filter((t, n, r) => !!t && t.trim() !== "" && r.indexOf(t) === n).join(" ").trim(), cg = (e) => {
  for (const t in e)
    if (t.startsWith("aria-") || t === "role" || t === "title")
      return !0;
};
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var lg = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dg = St(
  ({
    color: e = "currentColor",
    size: t = 24,
    strokeWidth: n = 2,
    absoluteStrokeWidth: r,
    className: o = "",
    children: a,
    iconNode: s,
    ...i
  }, c) => zr(
    "svg",
    {
      ref: c,
      ...lg,
      width: t,
      height: t,
      stroke: e,
      strokeWidth: r ? Number(n) * 24 / Number(t) : n,
      className: vi("lucide", o),
      ...!a && !cg(i) && { "aria-hidden": "true" },
      ...i
    },
    [
      ...s.map(([l, u]) => zr(l, u)),
      ...Array.isArray(a) ? a : [a]
    ]
  )
);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const je = (e, t) => {
  const n = St(
    ({ className: r, ...o }, a) => zr(dg, {
      ref: a,
      iconNode: t,
      className: vi(
        `lucide-${sg(Pa(e))}`,
        `lucide-${e}`,
        r
      ),
      ...o
    })
  );
  return n.displayName = Pa(e), n;
};
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ug = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], fg = je("check", ug);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hg = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], yi = je("chevron-down", hg);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mg = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], pg = je("chevron-right", mg);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gg = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]], bg = je("chevron-left", gg);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vg = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]], yg = je("chevron-up", vg);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wg = [
  ["path", { d: "m7 15 5 5 5-5", key: "1hf1tw" }],
  ["path", { d: "m7 9 5-5 5 5", key: "sgt6xg" }]
], xg = je("chevrons-up-down", wg);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Cg = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
], wi = je("circle-check", Cg);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kg = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
], Mg = je("circle-x", kg);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ng = [
  ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
], Sg = je("clock", Ng);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Dg = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
], xi = je("triangle-alert", Dg);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Og = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], Eg = je("x", Og), Pg = k.forwardRef(
  ({
    value: e,
    onChange: t,
    label: n,
    placeholder: r = "HH:MM",
    format: o = "24h",
    disabled: a = !1,
    error: s = !1,
    errorMessage: i,
    helperText: c,
    className: l,
    minuteStep: u = 1,
    showIcon: d = !0
  }, f) => {
    const [m, y] = ye(!1), [g, b] = ye(null), [v, x] = ye(null), [w, M] = ye("AM"), N = xt(null), C = xt(null);
    Tt(() => {
      if (!e) {
        b(null), x(null), M("AM");
        return;
      }
      const T = /^(\d{1,2}):(\d{2})$/, Y = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i;
      if (o === "24h") {
        const D = e.match(T);
        D && (b(parseInt(D[1], 10)), x(parseInt(D[2], 10)));
      } else {
        const D = e.match(Y);
        if (D) {
          let R = parseInt(D[1], 10);
          const S = D[3].toUpperCase();
          b(R), x(parseInt(D[2], 10)), M(S);
        }
      }
    }, [e, o]);
    const O = Ee(() => o === "24h" ? Array.from({ length: 24 }, (T, Y) => Y) : Array.from({ length: 12 }, (T, Y) => Y + 1), [o]), _ = Ee(() => {
      const T = [];
      for (let Y = 0; Y < 60; Y += u)
        T.push(Y);
      return T;
    }, [u]), B = Ee(() => {
      if (g === null || v === null) return "";
      const T = v.toString().padStart(2, "0");
      return o === "24h" ? `${g.toString().padStart(2, "0")}:${T}` : `${g}:${T} ${w}`;
    }, [g, v, w, o]), I = () => {
      g !== null && v !== null && (t == null || t(B), y(!1));
    }, F = () => {
      if (e) {
        const T = /^(\d{1,2}):(\d{2})$/, Y = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i;
        if (o === "24h") {
          const D = e.match(T);
          D && (b(parseInt(D[1], 10)), x(parseInt(D[2], 10)));
        } else {
          const D = e.match(Y);
          D && (b(parseInt(D[1], 10)), x(parseInt(D[2], 10)), M(D[3].toUpperCase()));
        }
      } else
        b(null), x(null), M("AM");
      y(!1);
    };
    return Tt(() => {
      m && g !== null && setTimeout(() => {
        var Y;
        const T = (Y = N.current) == null ? void 0 : Y.querySelector(
          `[data-value="${g}"]`
        );
        T == null || T.scrollIntoView({ block: "center" });
      }, 0), m && v !== null && setTimeout(() => {
        var Y;
        const T = (Y = C.current) == null ? void 0 : Y.querySelector(
          `[data-value="${v}"]`
        );
        T == null || T.scrollIntoView({ block: "center" });
      }, 0);
    }, [m, g, v]), /* @__PURE__ */ L("div", { ref: f, className: P("flex flex-col gap-1", l), children: [
      n && /* @__PURE__ */ h("label", { className: "text-sm font-medium text-gray-700", children: n }),
      /* @__PURE__ */ L(
        cr,
        {
          open: m && !a,
          onOpenChange: y,
          children: [
            /* @__PURE__ */ h(lr, { asChild: !0, children: /* @__PURE__ */ L("div", { className: "relative", children: [
              /* @__PURE__ */ h(
                "input",
                {
                  type: "text",
                  readOnly: !0,
                  value: B,
                  placeholder: r,
                  disabled: a,
                  className: P(
                    "w-full h-10 px-3 border rounded bg-white text-sm",
                    "hover:bg-gray-50 hover:border-gray-400",
                    "focus:outline-none",
                    "transition-all duration-150",
                    "cursor-pointer",
                    s ? "border-red-500" : "border-gray-300",
                    a && P(
                      "bg-gray-100 cursor-not-allowed",
                      "hover:bg-gray-100 hover:border-gray-300"
                    )
                  )
                }
              ),
              d && /* @__PURE__ */ h(
                Sg,
                {
                  className: P(
                    "absolute right-0 top-1/2 -translate-y-1/2",
                    "w-4 h-4 text-gray-400",
                    a && "opacity-50"
                  )
                }
              )
            ] }) }),
            /* @__PURE__ */ h(dr, { children: /* @__PURE__ */ L(
              kn,
              {
                align: "start",
                sideOffset: 5,
                className: P(
                  "z-50 bg-white rounded-lg shadow-xl",
                  "border border-gray-200",
                  "data-[state=open]:animate-in",
                  "data-[state=closed]:animate-out",
                  "data-[state=closed]:fade-out-0",
                  "data-[state=open]:fade-in-0",
                  "data-[state=closed]:zoom-out-95",
                  "data-[state=open]:zoom-in-95",
                  "data-[side=bottom]:slide-in-from-top-2",
                  "data-[side=top]:slide-in-from-bottom-2"
                ),
                children: [
                  /* @__PURE__ */ h("div", { className: "p-4", children: /* @__PURE__ */ L("div", { className: "flex gap-2", children: [
                    /* @__PURE__ */ L("div", { className: "flex flex-col", children: [
                      /* @__PURE__ */ h("div", { className: "text-xs text-gray-500 text-center mb-2 font-medium", children: o === "24h" ? "시" : "Hour" }),
                      /* @__PURE__ */ h(
                        "div",
                        {
                          ref: N,
                          className: "w-16 h-48 overflow-y-auto border border-gray-200 rounded cms-no-scrollbar",
                          children: O.map((T) => /* @__PURE__ */ h(
                            "button",
                            {
                              "data-value": T,
                              onClick: () => b(T),
                              className: P(
                                "border-0 cursor-pointer",
                                "w-full h-10 text-sm transition-colors",
                                "hover:bg-gray-100",
                                g === T ? "bg-blue-100 text-blue-700 font-medium" : "bg-white text-gray-700"
                              ),
                              "aria-label": `${T}${o === "24h" ? "시" : ""}`,
                              "aria-selected": g === T,
                              children: o === "24h" ? T.toString().padStart(2, "0") : T
                            },
                            T
                          ))
                        }
                      )
                    ] }),
                    /* @__PURE__ */ L("div", { className: "flex flex-col", children: [
                      /* @__PURE__ */ h("div", { className: "text-xs text-gray-500 text-center mb-2 font-medium", children: o === "24h" ? "분" : "Min" }),
                      /* @__PURE__ */ h(
                        "div",
                        {
                          ref: C,
                          className: "w-16 h-48 overflow-y-auto border border-gray-200 rounded cms-no-scrollbar",
                          children: _.map((T) => /* @__PURE__ */ h(
                            "button",
                            {
                              "data-value": T,
                              onClick: () => x(T),
                              className: P(
                                "border-0 cursor-pointer",
                                "w-full h-10 text-sm transition-colors",
                                "hover:bg-gray-100",
                                v === T ? "bg-blue-100 text-blue-700 font-medium" : "bg-white text-gray-700"
                              ),
                              "aria-label": `${T}${o === "24h" ? "분" : " minutes"}`,
                              "aria-selected": v === T,
                              children: T.toString().padStart(2, "0")
                            },
                            T
                          ))
                        }
                      )
                    ] }),
                    o === "12h" && /* @__PURE__ */ L("div", { className: "flex flex-col", children: [
                      /* @__PURE__ */ h("div", { className: "text-xs text-gray-500 text-center mb-2 font-medium", children: "Period" }),
                      /* @__PURE__ */ L("div", { className: "w-16 flex flex-col gap-1", children: [
                        /* @__PURE__ */ h(
                          "button",
                          {
                            onClick: () => M("AM"),
                            className: P(
                              "border-0 cursor-pointer",
                              "h-10 text-sm rounded transition-colors",
                              "hover:bg-gray-100",
                              w === "AM" ? "bg-blue-100 text-blue-700 font-medium" : "bg-white text-gray-700"
                            ),
                            "aria-label": "AM",
                            "aria-selected": w === "AM",
                            children: "AM"
                          }
                        ),
                        /* @__PURE__ */ h(
                          "button",
                          {
                            onClick: () => M("PM"),
                            className: P(
                              "border-0 cursor-pointer",
                              "h-10 text-sm rounded transition-colors",
                              "hover:bg-gray-100",
                              w === "PM" ? "bg-blue-100 text-blue-700 font-medium" : "bg-white text-gray-700"
                            ),
                            "aria-label": "PM",
                            "aria-selected": w === "PM",
                            children: "PM"
                          }
                        )
                      ] })
                    ] })
                  ] }) }),
                  /* @__PURE__ */ h(
                    "div",
                    {
                      className: P(
                        "flex items-end justify-end px-4 pb-4",
                        "border-t border-gray-200 pt-2"
                      ),
                      children: /* @__PURE__ */ L("div", { className: "flex gap-2", children: [
                        /* @__PURE__ */ h(
                          "button",
                          {
                            onClick: F,
                            className: P(
                              "w-15 h-8 rounded cursor-pointer",
                              "text-xs font-medium text-gray-700",
                              "border border-gray-300 bg-transparent",
                              "transition-all duration-150",
                              "active:scale-95",
                              "hover:bg-gray-50"
                            ),
                            children: "취소"
                          }
                        ),
                        /* @__PURE__ */ h(
                          "button",
                          {
                            onClick: I,
                            disabled: g === null || v === null,
                            className: P(
                              "border-0 cursor-pointer",
                              "w-15 h-8 bg-blue-600 rounded",
                              "text-xs text-white",
                              "hover:bg-blue-700",
                              "active:scale-95",
                              "disabled:bg-gray-300",
                              "disabled:cursor-not-allowed",
                              "disabled:active:scale-100",
                              "transition-all duration-150"
                            ),
                            children: "적용"
                          }
                        )
                      ] })
                    }
                  )
                ]
              }
            ) })
          ]
        }
      ),
      (c || i) && /* @__PURE__ */ h("div", { children: s && i ? /* @__PURE__ */ h("p", { className: "text-xs text-red-500", children: i }) : c && /* @__PURE__ */ h("p", { className: "text-xs text-gray-500", children: c }) })
    ] });
  }
);
Pg.displayName = "TimePicker";
function No(e) {
  const t = p.useRef({ value: e, previous: e });
  return p.useMemo(() => (t.current.value !== e && (t.current.previous = t.current.value, t.current.value = e), t.current.previous), [e]);
}
var hr = "Switch", [Rg] = Ie(hr), [Tg, Ag] = Rg(hr), Ci = p.forwardRef(
  (e, t) => {
    const {
      __scopeSwitch: n,
      name: r,
      checked: o,
      defaultChecked: a,
      required: s,
      disabled: i,
      value: c = "on",
      onCheckedChange: l,
      form: u,
      ...d
    } = e, [f, m] = p.useState(null), y = ce(t, (w) => m(w)), g = p.useRef(!1), b = f ? u || !!f.closest("form") : !0, [v, x] = rt({
      prop: o,
      defaultProp: a ?? !1,
      onChange: l,
      caller: hr
    });
    return /* @__PURE__ */ L(Tg, { scope: n, checked: v, disabled: i, children: [
      /* @__PURE__ */ h(
        re.button,
        {
          type: "button",
          role: "switch",
          "aria-checked": v,
          "aria-required": s,
          "data-state": Si(v),
          "data-disabled": i ? "" : void 0,
          disabled: i,
          value: c,
          ...d,
          ref: y,
          onClick: ee(e.onClick, (w) => {
            x((M) => !M), b && (g.current = w.isPropagationStopped(), g.current || w.stopPropagation());
          })
        }
      ),
      b && /* @__PURE__ */ h(
        Ni,
        {
          control: f,
          bubbles: !g.current,
          name: r,
          value: c,
          checked: v,
          required: s,
          disabled: i,
          form: u,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
Ci.displayName = hr;
var ki = "SwitchThumb", Mi = p.forwardRef(
  (e, t) => {
    const { __scopeSwitch: n, ...r } = e, o = Ag(ki, n);
    return /* @__PURE__ */ h(
      re.span,
      {
        "data-state": Si(o.checked),
        "data-disabled": o.disabled ? "" : void 0,
        ...r,
        ref: t
      }
    );
  }
);
Mi.displayName = ki;
var _g = "SwitchBubbleInput", Ni = p.forwardRef(
  ({
    __scopeSwitch: e,
    control: t,
    checked: n,
    bubbles: r = !0,
    ...o
  }, a) => {
    const s = p.useRef(null), i = ce(s, a), c = No(n), l = rr(t);
    return p.useEffect(() => {
      const u = s.current;
      if (!u) return;
      const d = window.HTMLInputElement.prototype, m = Object.getOwnPropertyDescriptor(
        d,
        "checked"
      ).set;
      if (c !== n && m) {
        const y = new Event("click", { bubbles: r });
        m.call(u, n), u.dispatchEvent(y);
      }
    }, [c, n, r]), /* @__PURE__ */ h(
      "input",
      {
        type: "checkbox",
        "aria-hidden": !0,
        defaultChecked: n,
        ...o,
        tabIndex: -1,
        ref: i,
        style: {
          ...o.style,
          ...l,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
Ni.displayName = _g;
function Si(e) {
  return e ? "checked" : "unchecked";
}
var Di = Ci, Ig = Mi;
const Wg = Se(
  P(
    "peer inline-flex items-center transition-colors ",
    "rounded-full border-2 border-transparent box-border",
    "h-6 w-10 shrink-0 py-0.5 px-[1px]",
    "cursor-pointer",
    "focus-visible:outline-none",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "data-[state=unchecked]:bg-cms-gray-300"
  ),
  {
    variants: {
      variant: {
        default: "data-[state=checked]:bg-cms-primary-200",
        green: "data-[state=checked]:bg-cms-green-500",
        black: "data-[state=checked]:bg-cms-black",
        blue: "data-[state=checked]:bg-cms-blue-700",
        red: "data-[state=checked]:bg-cms-red-400"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
), $g = k.forwardRef(({ className: e, variant: t, ...n }, r) => /* @__PURE__ */ h(
  Di,
  {
    className: P(Wg({ variant: t }), e),
    ...n,
    ref: r,
    children: /* @__PURE__ */ h(
      Ig,
      {
        className: P(
          "pointer-events-none block rounded-full ring-0",
          "bg-cms-white shadow-lg",
          "h-5 w-5",
          "data-[state=unchecked]:translate-x-0 cursor-pointer",
          "data-[state=checked]:translate-x-[14px]",
          "transition-transform"
        )
      }
    )
  }
));
$g.displayName = Di.displayName;
function Oi(e) {
  const t = e + "CollectionProvider", [n, r] = Ie(t), [o, a] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), s = (g) => {
    const { scope: b, children: v } = g, x = k.useRef(null), w = k.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ h(o, { scope: b, itemMap: w, collectionRef: x, children: v });
  };
  s.displayName = t;
  const i = e + "CollectionSlot", c = /* @__PURE__ */ pn(i), l = k.forwardRef(
    (g, b) => {
      const { scope: v, children: x } = g, w = a(i, v), M = ce(b, w.collectionRef);
      return /* @__PURE__ */ h(c, { ref: M, children: x });
    }
  );
  l.displayName = i;
  const u = e + "CollectionItemSlot", d = "data-radix-collection-item", f = /* @__PURE__ */ pn(u), m = k.forwardRef(
    (g, b) => {
      const { scope: v, children: x, ...w } = g, M = k.useRef(null), N = ce(b, M), C = a(u, v);
      return k.useEffect(() => (C.itemMap.set(M, { ref: M, ...w }), () => void C.itemMap.delete(M))), /* @__PURE__ */ h(f, { [d]: "", ref: N, children: x });
    }
  );
  m.displayName = u;
  function y(g) {
    const b = a(e + "CollectionConsumer", g);
    return k.useCallback(() => {
      const x = b.collectionRef.current;
      if (!x) return [];
      const w = Array.from(x.querySelectorAll(`[${d}]`));
      return Array.from(b.itemMap.values()).sort(
        (C, O) => w.indexOf(C.ref.current) - w.indexOf(O.ref.current)
      );
    }, [b.collectionRef, b.itemMap]);
  }
  return [
    { Provider: s, Slot: l, ItemSlot: m },
    y,
    r
  ];
}
var Fg = p.createContext(void 0);
function So(e) {
  const t = p.useContext(Fg);
  return e || t || "ltr";
}
var Hr = "rovingFocusGroup.onEntryFocus", Yg = { bubbles: !1, cancelable: !0 }, Dn = "RovingFocusGroup", [Qr, Ei, Bg] = Oi(Dn), [Lg, Pi] = Ie(
  Dn,
  [Bg]
), [Hg, zg] = Lg(Dn), Ri = p.forwardRef(
  (e, t) => /* @__PURE__ */ h(Qr.Provider, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ h(Qr.Slot, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ h(jg, { ...e, ref: t }) }) })
);
Ri.displayName = Dn;
var jg = p.forwardRef((e, t) => {
  const {
    __scopeRovingFocusGroup: n,
    orientation: r,
    loop: o = !1,
    dir: a,
    currentTabStopId: s,
    defaultCurrentTabStopId: i,
    onCurrentTabStopIdChange: c,
    onEntryFocus: l,
    preventScrollOnEntryFocus: u = !1,
    ...d
  } = e, f = p.useRef(null), m = ce(t, f), y = So(a), [g, b] = rt({
    prop: s,
    defaultProp: i ?? null,
    onChange: c,
    caller: Dn
  }), [v, x] = p.useState(!1), w = At(l), M = Ei(n), N = p.useRef(!1), [C, O] = p.useState(0);
  return p.useEffect(() => {
    const _ = f.current;
    if (_)
      return _.addEventListener(Hr, w), () => _.removeEventListener(Hr, w);
  }, [w]), /* @__PURE__ */ h(
    Hg,
    {
      scope: n,
      orientation: r,
      dir: y,
      loop: o,
      currentTabStopId: g,
      onItemFocus: p.useCallback(
        (_) => b(_),
        [b]
      ),
      onItemShiftTab: p.useCallback(() => x(!0), []),
      onFocusableItemAdd: p.useCallback(
        () => O((_) => _ + 1),
        []
      ),
      onFocusableItemRemove: p.useCallback(
        () => O((_) => _ - 1),
        []
      ),
      children: /* @__PURE__ */ h(
        re.div,
        {
          tabIndex: v || C === 0 ? -1 : 0,
          "data-orientation": r,
          ...d,
          ref: m,
          style: { outline: "none", ...e.style },
          onMouseDown: ee(e.onMouseDown, () => {
            N.current = !0;
          }),
          onFocus: ee(e.onFocus, (_) => {
            const B = !N.current;
            if (_.target === _.currentTarget && B && !v) {
              const I = new CustomEvent(Hr, Yg);
              if (_.currentTarget.dispatchEvent(I), !I.defaultPrevented) {
                const F = M().filter((S) => S.focusable), T = F.find((S) => S.active), Y = F.find((S) => S.id === g), R = [T, Y, ...F].filter(
                  Boolean
                ).map((S) => S.ref.current);
                _i(R, u);
              }
            }
            N.current = !1;
          }),
          onBlur: ee(e.onBlur, () => x(!1))
        }
      )
    }
  );
}), Ti = "RovingFocusGroupItem", Ai = p.forwardRef(
  (e, t) => {
    const {
      __scopeRovingFocusGroup: n,
      focusable: r = !0,
      active: o = !1,
      tabStopId: a,
      children: s,
      ...i
    } = e, c = Ct(), l = a || c, u = zg(Ti, n), d = u.currentTabStopId === l, f = Ei(n), { onFocusableItemAdd: m, onFocusableItemRemove: y, currentTabStopId: g } = u;
    return p.useEffect(() => {
      if (r)
        return m(), () => y();
    }, [r, m, y]), /* @__PURE__ */ h(
      Qr.ItemSlot,
      {
        scope: n,
        id: l,
        focusable: r,
        active: o,
        children: /* @__PURE__ */ h(
          re.span,
          {
            tabIndex: d ? 0 : -1,
            "data-orientation": u.orientation,
            ...i,
            ref: t,
            onMouseDown: ee(e.onMouseDown, (b) => {
              r ? u.onItemFocus(l) : b.preventDefault();
            }),
            onFocus: ee(e.onFocus, () => u.onItemFocus(l)),
            onKeyDown: ee(e.onKeyDown, (b) => {
              if (b.key === "Tab" && b.shiftKey) {
                u.onItemShiftTab();
                return;
              }
              if (b.target !== b.currentTarget) return;
              const v = Ug(b, u.orientation, u.dir);
              if (v !== void 0) {
                if (b.metaKey || b.ctrlKey || b.altKey || b.shiftKey) return;
                b.preventDefault();
                let w = f().filter((M) => M.focusable).map((M) => M.ref.current);
                if (v === "last") w.reverse();
                else if (v === "prev" || v === "next") {
                  v === "prev" && w.reverse();
                  const M = w.indexOf(b.currentTarget);
                  w = u.loop ? qg(w, M + 1) : w.slice(M + 1);
                }
                setTimeout(() => _i(w));
              }
            }),
            children: typeof s == "function" ? s({ isCurrentTabStop: d, hasTabStop: g != null }) : s
          }
        )
      }
    );
  }
);
Ai.displayName = Ti;
var Vg = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function Gg(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function Ug(e, t, n) {
  const r = Gg(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r)))
    return Vg[r];
}
function _i(e, t = !1) {
  const n = document.activeElement;
  for (const r of e)
    if (r === n || (r.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function qg(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var Xg = Ri, Kg = Ai, Do = "Radio", [Qg, Ii] = Ie(Do), [Zg, Jg] = Qg(Do), Wi = p.forwardRef(
  (e, t) => {
    const {
      __scopeRadio: n,
      name: r,
      checked: o = !1,
      required: a,
      disabled: s,
      value: i = "on",
      onCheck: c,
      form: l,
      ...u
    } = e, [d, f] = p.useState(null), m = ce(t, (b) => f(b)), y = p.useRef(!1), g = d ? l || !!d.closest("form") : !0;
    return /* @__PURE__ */ L(Zg, { scope: n, checked: o, disabled: s, children: [
      /* @__PURE__ */ h(
        re.button,
        {
          type: "button",
          role: "radio",
          "aria-checked": o,
          "data-state": Bi(o),
          "data-disabled": s ? "" : void 0,
          disabled: s,
          value: i,
          ...u,
          ref: m,
          onClick: ee(e.onClick, (b) => {
            o || c == null || c(), g && (y.current = b.isPropagationStopped(), y.current || b.stopPropagation());
          })
        }
      ),
      g && /* @__PURE__ */ h(
        Yi,
        {
          control: d,
          bubbles: !y.current,
          name: r,
          value: i,
          checked: o,
          required: a,
          disabled: s,
          form: l,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
Wi.displayName = Do;
var $i = "RadioIndicator", Fi = p.forwardRef(
  (e, t) => {
    const { __scopeRadio: n, forceMount: r, ...o } = e, a = Jg($i, n);
    return /* @__PURE__ */ h(ze, { present: r || a.checked, children: /* @__PURE__ */ h(
      re.span,
      {
        "data-state": Bi(a.checked),
        "data-disabled": a.disabled ? "" : void 0,
        ...o,
        ref: t
      }
    ) });
  }
);
Fi.displayName = $i;
var eb = "RadioBubbleInput", Yi = p.forwardRef(
  ({
    __scopeRadio: e,
    control: t,
    checked: n,
    bubbles: r = !0,
    ...o
  }, a) => {
    const s = p.useRef(null), i = ce(s, a), c = No(n), l = rr(t);
    return p.useEffect(() => {
      const u = s.current;
      if (!u) return;
      const d = window.HTMLInputElement.prototype, m = Object.getOwnPropertyDescriptor(
        d,
        "checked"
      ).set;
      if (c !== n && m) {
        const y = new Event("click", { bubbles: r });
        m.call(u, n), u.dispatchEvent(y);
      }
    }, [c, n, r]), /* @__PURE__ */ h(
      re.input,
      {
        type: "radio",
        "aria-hidden": !0,
        defaultChecked: n,
        ...o,
        tabIndex: -1,
        ref: i,
        style: {
          ...o.style,
          ...l,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
Yi.displayName = eb;
function Bi(e) {
  return e ? "checked" : "unchecked";
}
var tb = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], mr = "RadioGroup", [nb] = Ie(mr, [
  Pi,
  Ii
]), Li = Pi(), Hi = Ii(), [rb, ob] = nb(mr), zi = p.forwardRef(
  (e, t) => {
    const {
      __scopeRadioGroup: n,
      name: r,
      defaultValue: o,
      value: a,
      required: s = !1,
      disabled: i = !1,
      orientation: c,
      dir: l,
      loop: u = !0,
      onValueChange: d,
      ...f
    } = e, m = Li(n), y = So(l), [g, b] = rt({
      prop: a,
      defaultProp: o ?? null,
      onChange: d,
      caller: mr
    });
    return /* @__PURE__ */ h(
      rb,
      {
        scope: n,
        name: r,
        required: s,
        disabled: i,
        value: g,
        onValueChange: b,
        children: /* @__PURE__ */ h(
          Xg,
          {
            asChild: !0,
            ...m,
            orientation: c,
            dir: y,
            loop: u,
            children: /* @__PURE__ */ h(
              re.div,
              {
                role: "radiogroup",
                "aria-required": s,
                "aria-orientation": c,
                "data-disabled": i ? "" : void 0,
                dir: y,
                ...f,
                ref: t
              }
            )
          }
        )
      }
    );
  }
);
zi.displayName = mr;
var ji = "RadioGroupItem", Vi = p.forwardRef(
  (e, t) => {
    const { __scopeRadioGroup: n, disabled: r, ...o } = e, a = ob(ji, n), s = a.disabled || r, i = Li(n), c = Hi(n), l = p.useRef(null), u = ce(t, l), d = a.value === o.value, f = p.useRef(!1);
    return p.useEffect(() => {
      const m = (g) => {
        tb.includes(g.key) && (f.current = !0);
      }, y = () => f.current = !1;
      return document.addEventListener("keydown", m), document.addEventListener("keyup", y), () => {
        document.removeEventListener("keydown", m), document.removeEventListener("keyup", y);
      };
    }, []), /* @__PURE__ */ h(
      Kg,
      {
        asChild: !0,
        ...i,
        focusable: !s,
        active: d,
        children: /* @__PURE__ */ h(
          Wi,
          {
            disabled: s,
            required: a.required,
            checked: d,
            ...c,
            ...o,
            name: a.name,
            ref: u,
            onCheck: () => a.onValueChange(o.value),
            onKeyDown: ee((m) => {
              m.key === "Enter" && m.preventDefault();
            }),
            onFocus: ee(o.onFocus, () => {
              var m;
              f.current && ((m = l.current) == null || m.click());
            })
          }
        )
      }
    );
  }
);
Vi.displayName = ji;
var ab = "RadioGroupIndicator", Gi = p.forwardRef(
  (e, t) => {
    const { __scopeRadioGroup: n, ...r } = e, o = Hi(n);
    return /* @__PURE__ */ h(Fi, { ...o, ...r, ref: t });
  }
);
Gi.displayName = ab;
var Ui = zi, qi = Vi, sb = Gi;
const ib = k.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ h(Ui, { className: e, ...t, ref: n }));
ib.displayName = Ui.displayName;
const cb = Se(
  P(
    "flex items-center justify-center",
    "aspect-square rounded-full border-2 transition-colors",
    "focus:outline-none",
    "focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "cursor-pointer"
  ),
  {
    variants: {
      variant: {
        black: P(
          "border-cms-gray-300 text-cms-black",
          "data-[state=checked]:border-cms-black"
        ),
        default: P(
          "border-cms-gray-300 text-cms-primary-300",
          "data-[state=checked]:border-cms-primary-300"
        ),
        green: P(
          "border-cms-gray-300 text-cms-green-500",
          "data-[state=checked]:border-cms-green-500"
        ),
        blue: P(
          "border-cms-gray-300 text-cms-blue-700",
          "data-[state=checked]:border-cms-blue-700"
        ),
        red: P(
          "border-cms-gray-300 text-cms-red-400",
          "data-[state=checked]:border-cms-red-400"
        )
      },
      size: {
        sm: "size-4",
        md: "size-5",
        lg: "size-6"
      }
    },
    defaultVariants: {
      variant: "black",
      size: "md"
    }
  }
), lb = Se(
  "flex items-center justify-center rounded-full bg-current aspect-square",
  {
    variants: {
      variant: {
        // bg-current를 쓰면 부모 text color를 따라가므로 색상 정의 줄일 수 있음
        black: "text-cms-black",
        default: "text-cms-primary-300",
        green: "text-cms-green-500",
        blue: "text-cms-blue-700",
        red: "text-cms-red-400"
      },
      size: {
        sm: "size-2",
        md: "size-2.5",
        lg: "size-3"
      }
    },
    defaultVariants: {
      variant: "black",
      size: "md"
    }
  }
), db = k.forwardRef(({ className: e, variant: t, size: n, ...r }, o) => /* @__PURE__ */ h(
  qi,
  {
    ref: o,
    className: P(cb({ variant: t, size: n }), e),
    ...r,
    children: /* @__PURE__ */ h(
      sb,
      {
        className: P(lb({ variant: t, size: n }))
      }
    )
  }
));
db.displayName = qi.displayName;
var pr = "Collapsible", [ub, Xi] = Ie(pr), [fb, Oo] = ub(pr), Ki = p.forwardRef(
  (e, t) => {
    const {
      __scopeCollapsible: n,
      open: r,
      defaultOpen: o,
      disabled: a,
      onOpenChange: s,
      ...i
    } = e, [c, l] = rt({
      prop: r,
      defaultProp: o ?? !1,
      onChange: s,
      caller: pr
    });
    return /* @__PURE__ */ h(
      fb,
      {
        scope: n,
        disabled: a,
        contentId: Ct(),
        open: c,
        onOpenToggle: p.useCallback(() => l((u) => !u), [l]),
        children: /* @__PURE__ */ h(
          re.div,
          {
            "data-state": Po(c),
            "data-disabled": a ? "" : void 0,
            ...i,
            ref: t
          }
        )
      }
    );
  }
);
Ki.displayName = pr;
var Qi = "CollapsibleTrigger", Zi = p.forwardRef(
  (e, t) => {
    const { __scopeCollapsible: n, ...r } = e, o = Oo(Qi, n);
    return /* @__PURE__ */ h(
      re.button,
      {
        type: "button",
        "aria-controls": o.contentId,
        "aria-expanded": o.open || !1,
        "data-state": Po(o.open),
        "data-disabled": o.disabled ? "" : void 0,
        disabled: o.disabled,
        ...r,
        ref: t,
        onClick: ee(e.onClick, o.onOpenToggle)
      }
    );
  }
);
Zi.displayName = Qi;
var Eo = "CollapsibleContent", Ji = p.forwardRef(
  (e, t) => {
    const { forceMount: n, ...r } = e, o = Oo(Eo, e.__scopeCollapsible);
    return /* @__PURE__ */ h(ze, { present: n || o.open, children: ({ present: a }) => /* @__PURE__ */ h(hb, { ...r, ref: t, present: a }) });
  }
);
Ji.displayName = Eo;
var hb = p.forwardRef((e, t) => {
  const { __scopeCollapsible: n, present: r, children: o, ...a } = e, s = Oo(Eo, n), [i, c] = p.useState(r), l = p.useRef(null), u = ce(t, l), d = p.useRef(0), f = d.current, m = p.useRef(0), y = m.current, g = s.open || i, b = p.useRef(g), v = p.useRef(void 0);
  return p.useEffect(() => {
    const x = requestAnimationFrame(() => b.current = !1);
    return () => cancelAnimationFrame(x);
  }, []), ut(() => {
    const x = l.current;
    if (x) {
      v.current = v.current || {
        transitionDuration: x.style.transitionDuration,
        animationName: x.style.animationName
      }, x.style.transitionDuration = "0s", x.style.animationName = "none";
      const w = x.getBoundingClientRect();
      d.current = w.height, m.current = w.width, b.current || (x.style.transitionDuration = v.current.transitionDuration, x.style.animationName = v.current.animationName), c(r);
    }
  }, [s.open, r]), /* @__PURE__ */ h(
    re.div,
    {
      "data-state": Po(s.open),
      "data-disabled": s.disabled ? "" : void 0,
      id: s.contentId,
      hidden: !g,
      ...a,
      ref: u,
      style: {
        "--radix-collapsible-content-height": f ? `${f}px` : void 0,
        "--radix-collapsible-content-width": y ? `${y}px` : void 0,
        ...e.style
      },
      children: g && o
    }
  );
});
function Po(e) {
  return e ? "open" : "closed";
}
var mb = Ki, pb = Zi, gb = Ji, Ve = "Accordion", bb = ["Home", "End", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"], [Ro, vb, yb] = Oi(Ve), [gr] = Ie(Ve, [
  yb,
  Xi
]), To = Xi(), ec = k.forwardRef(
  (e, t) => {
    const { type: n, ...r } = e, o = r, a = r;
    return /* @__PURE__ */ h(Ro.Provider, { scope: e.__scopeAccordion, children: n === "multiple" ? /* @__PURE__ */ h(kb, { ...a, ref: t }) : /* @__PURE__ */ h(Cb, { ...o, ref: t }) });
  }
);
ec.displayName = Ve;
var [tc, wb] = gr(Ve), [nc, xb] = gr(
  Ve,
  { collapsible: !1 }
), Cb = k.forwardRef(
  (e, t) => {
    const {
      value: n,
      defaultValue: r,
      onValueChange: o = () => {
      },
      collapsible: a = !1,
      ...s
    } = e, [i, c] = rt({
      prop: n,
      defaultProp: r ?? "",
      onChange: o,
      caller: Ve
    });
    return /* @__PURE__ */ h(
      tc,
      {
        scope: e.__scopeAccordion,
        value: k.useMemo(() => i ? [i] : [], [i]),
        onItemOpen: c,
        onItemClose: k.useCallback(() => a && c(""), [a, c]),
        children: /* @__PURE__ */ h(nc, { scope: e.__scopeAccordion, collapsible: a, children: /* @__PURE__ */ h(rc, { ...s, ref: t }) })
      }
    );
  }
), kb = k.forwardRef((e, t) => {
  const {
    value: n,
    defaultValue: r,
    onValueChange: o = () => {
    },
    ...a
  } = e, [s, i] = rt({
    prop: n,
    defaultProp: r ?? [],
    onChange: o,
    caller: Ve
  }), c = k.useCallback(
    (u) => i((d = []) => [...d, u]),
    [i]
  ), l = k.useCallback(
    (u) => i((d = []) => d.filter((f) => f !== u)),
    [i]
  );
  return /* @__PURE__ */ h(
    tc,
    {
      scope: e.__scopeAccordion,
      value: s,
      onItemOpen: c,
      onItemClose: l,
      children: /* @__PURE__ */ h(nc, { scope: e.__scopeAccordion, collapsible: !0, children: /* @__PURE__ */ h(rc, { ...a, ref: t }) })
    }
  );
}), [Mb, br] = gr(Ve), rc = k.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, disabled: r, dir: o, orientation: a = "vertical", ...s } = e, i = k.useRef(null), c = ce(i, t), l = vb(n), d = So(o) === "ltr", f = ee(e.onKeyDown, (m) => {
      var _;
      if (!bb.includes(m.key)) return;
      const y = m.target, g = l().filter((B) => {
        var I;
        return !((I = B.ref.current) != null && I.disabled);
      }), b = g.findIndex((B) => B.ref.current === y), v = g.length;
      if (b === -1) return;
      m.preventDefault();
      let x = b;
      const w = 0, M = v - 1, N = () => {
        x = b + 1, x > M && (x = w);
      }, C = () => {
        x = b - 1, x < w && (x = M);
      };
      switch (m.key) {
        case "Home":
          x = w;
          break;
        case "End":
          x = M;
          break;
        case "ArrowRight":
          a === "horizontal" && (d ? N() : C());
          break;
        case "ArrowDown":
          a === "vertical" && N();
          break;
        case "ArrowLeft":
          a === "horizontal" && (d ? C() : N());
          break;
        case "ArrowUp":
          a === "vertical" && C();
          break;
      }
      const O = x % v;
      (_ = g[O].ref.current) == null || _.focus();
    });
    return /* @__PURE__ */ h(
      Mb,
      {
        scope: n,
        disabled: r,
        direction: o,
        orientation: a,
        children: /* @__PURE__ */ h(Ro.Slot, { scope: n, children: /* @__PURE__ */ h(
          re.div,
          {
            ...s,
            "data-orientation": a,
            ref: c,
            onKeyDown: r ? void 0 : f
          }
        ) })
      }
    );
  }
), Kn = "AccordionItem", [Nb, Ao] = gr(Kn), oc = k.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, value: r, ...o } = e, a = br(Kn, n), s = wb(Kn, n), i = To(n), c = Ct(), l = r && s.value.includes(r) || !1, u = a.disabled || e.disabled;
    return /* @__PURE__ */ h(
      Nb,
      {
        scope: n,
        open: l,
        disabled: u,
        triggerId: c,
        children: /* @__PURE__ */ h(
          mb,
          {
            "data-orientation": a.orientation,
            "data-state": dc(l),
            ...i,
            ...o,
            ref: t,
            disabled: u,
            open: l,
            onOpenChange: (d) => {
              d ? s.onItemOpen(r) : s.onItemClose(r);
            }
          }
        )
      }
    );
  }
);
oc.displayName = Kn;
var ac = "AccordionHeader", sc = k.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, ...r } = e, o = br(Ve, n), a = Ao(ac, n);
    return /* @__PURE__ */ h(
      re.h3,
      {
        "data-orientation": o.orientation,
        "data-state": dc(a.open),
        "data-disabled": a.disabled ? "" : void 0,
        ...r,
        ref: t
      }
    );
  }
);
sc.displayName = ac;
var Zr = "AccordionTrigger", ic = k.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, ...r } = e, o = br(Ve, n), a = Ao(Zr, n), s = xb(Zr, n), i = To(n);
    return /* @__PURE__ */ h(Ro.ItemSlot, { scope: n, children: /* @__PURE__ */ h(
      pb,
      {
        "aria-disabled": a.open && !s.collapsible || void 0,
        "data-orientation": o.orientation,
        id: a.triggerId,
        ...i,
        ...r,
        ref: t
      }
    ) });
  }
);
ic.displayName = Zr;
var cc = "AccordionContent", lc = k.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, ...r } = e, o = br(Ve, n), a = Ao(cc, n), s = To(n);
    return /* @__PURE__ */ h(
      gb,
      {
        role: "region",
        "aria-labelledby": a.triggerId,
        "data-orientation": o.orientation,
        ...s,
        ...r,
        ref: t,
        style: {
          "--radix-accordion-content-height": "var(--radix-collapsible-content-height)",
          "--radix-accordion-content-width": "var(--radix-collapsible-content-width)",
          ...e.style
        }
      }
    );
  }
);
lc.displayName = cc;
function dc(e) {
  return e ? "open" : "closed";
}
var Sb = ec, Db = oc, Ob = sc, Eb = ic, Pb = lc;
const Rb = ({
  menu: e,
  isOpen: t,
  isSelected: n,
  selectedUrl: r,
  onMenuClick: o
}) => {
  var s;
  const a = (s = e.subMenu) == null ? void 0 : s.some(
    (i) => i.url === r
  );
  return /* @__PURE__ */ L(Db, { value: e.url, className: "border-none", children: [
    /* @__PURE__ */ h(Ob, { className: "m-0", children: /* @__PURE__ */ L(
      Eb,
      {
        onClick: (i) => {
          e.subMenu || (i.preventDefault(), o(e.url));
        },
        className: P(
          "border-0 group flex items-center px-5 bg-cms-gray-850",
          "text-white font-bold text-lg",
          "w-full h-15",
          "transition-colors",
          "cursor-pointer",
          !a && "data-[state=open]:bg-transparent",
          !e.subMenu && n && "bg-cms-primary-400 text-cms-black",
          a && "bg-cms-primary-200 text-cms-black"
        ),
        children: [
          e.icon && /* @__PURE__ */ h(
            "div",
            {
              className: P(
                "mr-3 flex items-center",
                "[&>svg]:w-6 [&>svg]:h-6",
                !e.subMenu && n || a ? "text-cms-black" : "text-white"
              ),
              children: e.icon
            }
          ),
          /* @__PURE__ */ h(
            "span",
            {
              className: P(
                !e.subMenu && n || a ? "text-cms-black" : "text-white"
              ),
              children: e.title
            }
          ),
          e.subMenu && /* @__PURE__ */ h(
            yi,
            {
              className: P(
                "ml-auto transition-transform",
                !e.subMenu && n || a ? "text-cms-black" : "text-white",
                t && "rotate-180"
              ),
              size: 20
            }
          )
        ]
      }
    ) }),
    e.subMenu && /* @__PURE__ */ h(
      Pb,
      {
        className: P(
          "overflow-hidden",
          "data-[state=open]:animate-accordion-down",
          "data-[state=closed]:animate-accordion-up"
        ),
        children: e.subMenu.map((i) => {
          const c = i.url === r;
          return /* @__PURE__ */ h(
            "button",
            {
              onClick: () => o(i.url),
              className: P(
                "border-0 bg-transparent flex items-center",
                "w-full h-13 px-5 pl-14",
                "cursor-pointer",
                "transition-colors",
                "hover:bg-cms-gray-900"
              ),
              children: /* @__PURE__ */ h(
                "span",
                {
                  className: P(
                    "text-base font-bold",
                    "transition-colors",
                    c ? "text-cms-primary-400 font-bold" : "text-cms-white"
                  ),
                  children: i.title
                }
              )
            },
            i.url
          );
        })
      }
    )
  ] });
}, Tb = k.forwardRef(
  ({ title: e, menus: t, selectedUrl: n, onMenuClick: r, headerSlot: o, className: a, ...s }, i) => {
    const [c, l] = ye([]);
    return /* @__PURE__ */ L(
      "div",
      {
        ref: i,
        className: P(
          "flex flex-col",
          "w-70 min-w-70 max-w-70 h-full",
          "bg-cms-gray-850 text-white",
          a
        ),
        ...s,
        children: [
          o,
          e && !o && /* @__PURE__ */ h("div", { className: "px-5 py-4 border-b border-[#3a3b3e]", children: /* @__PURE__ */ h("h2", { className: "text-lg font-semibold text-white", children: e }) }),
          /* @__PURE__ */ h(
            "div",
            {
              className: P(
                "flex-1 overflow-y-auto",
                "scrollbar-thin",
                "scrollbar-thumb-[#3a3b3e]",
                "scrollbar-track-transparent"
              ),
              children: /* @__PURE__ */ h(
                Sb,
                {
                  type: "multiple",
                  value: c,
                  onValueChange: l,
                  children: t.map((u) => /* @__PURE__ */ h(
                    Rb,
                    {
                      menu: u,
                      isOpen: c.includes(u.url),
                      isSelected: n === u.url,
                      selectedUrl: n,
                      onMenuClick: r
                    },
                    u.url
                  ))
                }
              )
            }
          )
        ]
      }
    );
  }
);
Tb.displayName = "SideNavigation";
const Ln = Se(
  P(
    "inline-flex items-center justify-center",
    "h-10 min-w-10 px-2",
    "rounded-md",
    "text-sm font-medium",
    "transition-colors",
    "cursor-pointer",
    "focus-visible:outline-none focus-visible:ring-2"
  ),
  {
    variants: {
      variant: {
        default: P(
          "border border-cms-gray-400 bg-transparent",
          "text-cms-gray-700",
          "hover:bg-cms-gray-200"
        ),
        active: P(
          "bg-cms-primary-400 border border-cms-primary-400",
          "text-cms-black",
          "hover:bg-cms-primary-300"
        ),
        ellipsis: P(
          "border-0 bg-transparent",
          "text-cms-gray-700",
          "cursor-default pointer-events-none"
        )
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
), Ab = ({
  currentPage: e,
  totalPages: t,
  siblingCount: n = 1
}) => Ee(() => {
  const r = (l, u) => Array.from({ length: u - l + 1 }, (d, f) => l + f);
  if (n * 2 + 5 >= t)
    return r(1, t);
  const a = Math.max(e - n, 1), s = Math.min(e + n, t), i = a > 2, c = s < t - 1;
  return !i && c ? [...r(1, 3 + 2 * n), "...", t] : i && !c ? [1, "...", ...r(t - (2 + 2 * n), t)] : i && c ? [1, "...", ...r(a, s), "...", t] : [];
}, [e, t, n]), _b = k.forwardRef(
  ({
    currentPage: e,
    totalPages: t,
    onPageChange: n,
    siblingCount: r = 1,
    showPrevNext: o = !0,
    disabled: a = !1,
    className: s
  }, i) => {
    const c = Ab({ currentPage: e, totalPages: t, siblingCount: r }), l = () => {
      e > 1 && !a && n(e - 1);
    }, u = () => {
      e < t && !a && n(e + 1);
    }, d = (f) => {
      !a && f !== e && n(f);
    };
    return /* @__PURE__ */ L(
      "nav",
      {
        ref: i,
        role: "navigation",
        "aria-label": "페이지네이션",
        className: P("flex items-center gap-1", s),
        children: [
          o && /* @__PURE__ */ h(
            "button",
            {
              onClick: l,
              disabled: a || e === 1,
              "aria-label": "이전 페이지",
              className: P(
                Ln({ variant: "default" }),
                (a || e === 1) && "opacity-50 cursor-not-allowed pointer-events-none"
              ),
              children: /* @__PURE__ */ h(bg, { className: "w-4 h-4" })
            }
          ),
          c.map((f, m) => {
            if (f === "...")
              return /* @__PURE__ */ h(
                "span",
                {
                  className: P(
                    Ln({ variant: "ellipsis" })
                  ),
                  "aria-hidden": "true",
                  children: "..."
                },
                `ellipsis-${m}`
              );
            const y = f === e;
            return /* @__PURE__ */ h(
              "button",
              {
                onClick: () => d(f),
                disabled: a,
                "aria-label": `페이지 ${f}${y ? " (현재 페이지)" : "로 이동"}`,
                "aria-current": y ? "page" : void 0,
                className: P(
                  Ln({
                    variant: y ? "active" : "default"
                  }),
                  a && "opacity-50 cursor-not-allowed pointer-events-none"
                ),
                children: f
              },
              f
            );
          }),
          o && /* @__PURE__ */ h(
            "button",
            {
              onClick: u,
              disabled: a || e === t,
              "aria-label": "다음 페이지",
              className: P(
                Ln({ variant: "default" }),
                (a || e === t) && "opacity-50 cursor-not-allowed pointer-events-none"
              ),
              children: /* @__PURE__ */ h(pg, { className: "w-4 h-4" })
            }
          )
        ]
      }
    );
  }
);
_b.displayName = "Pagination";
var vr = "Checkbox", [Ib] = Ie(vr), [Wb, _o] = Ib(vr);
function $b(e) {
  const {
    __scopeCheckbox: t,
    checked: n,
    children: r,
    defaultChecked: o,
    disabled: a,
    form: s,
    name: i,
    onCheckedChange: c,
    required: l,
    value: u = "on",
    // @ts-expect-error
    internal_do_not_use_render: d
  } = e, [f, m] = rt({
    prop: n,
    defaultProp: o ?? !1,
    onChange: c,
    caller: vr
  }), [y, g] = p.useState(null), [b, v] = p.useState(null), x = p.useRef(!1), w = y ? !!s || !!y.closest("form") : (
    // We set this to true by default so that events bubble to forms without JS (SSR)
    !0
  ), M = {
    checked: f,
    disabled: a,
    setChecked: m,
    control: y,
    setControl: g,
    name: i,
    form: s,
    value: u,
    hasConsumerStoppedPropagationRef: x,
    required: l,
    defaultChecked: kt(o) ? !1 : o,
    isFormControl: w,
    bubbleInput: b,
    setBubbleInput: v
  };
  return /* @__PURE__ */ h(
    Wb,
    {
      scope: t,
      ...M,
      children: Fb(d) ? d(M) : r
    }
  );
}
var uc = "CheckboxTrigger", fc = p.forwardRef(
  ({ __scopeCheckbox: e, onKeyDown: t, onClick: n, ...r }, o) => {
    const {
      control: a,
      value: s,
      disabled: i,
      checked: c,
      required: l,
      setControl: u,
      setChecked: d,
      hasConsumerStoppedPropagationRef: f,
      isFormControl: m,
      bubbleInput: y
    } = _o(uc, e), g = ce(o, u), b = p.useRef(c);
    return p.useEffect(() => {
      const v = a == null ? void 0 : a.form;
      if (v) {
        const x = () => d(b.current);
        return v.addEventListener("reset", x), () => v.removeEventListener("reset", x);
      }
    }, [a, d]), /* @__PURE__ */ h(
      re.button,
      {
        type: "button",
        role: "checkbox",
        "aria-checked": kt(c) ? "mixed" : c,
        "aria-required": l,
        "data-state": vc(c),
        "data-disabled": i ? "" : void 0,
        disabled: i,
        value: s,
        ...r,
        ref: g,
        onKeyDown: ee(t, (v) => {
          v.key === "Enter" && v.preventDefault();
        }),
        onClick: ee(n, (v) => {
          d((x) => kt(x) ? !0 : !x), y && m && (f.current = v.isPropagationStopped(), f.current || v.stopPropagation());
        })
      }
    );
  }
);
fc.displayName = uc;
var hc = p.forwardRef(
  (e, t) => {
    const {
      __scopeCheckbox: n,
      name: r,
      checked: o,
      defaultChecked: a,
      required: s,
      disabled: i,
      value: c,
      onCheckedChange: l,
      form: u,
      ...d
    } = e;
    return /* @__PURE__ */ h(
      $b,
      {
        __scopeCheckbox: n,
        checked: o,
        defaultChecked: a,
        disabled: i,
        required: s,
        onCheckedChange: l,
        name: r,
        form: u,
        value: c,
        internal_do_not_use_render: ({ isFormControl: f }) => /* @__PURE__ */ L(Rt, { children: [
          /* @__PURE__ */ h(
            fc,
            {
              ...d,
              ref: t,
              __scopeCheckbox: n
            }
          ),
          f && /* @__PURE__ */ h(
            bc,
            {
              __scopeCheckbox: n
            }
          )
        ] })
      }
    );
  }
);
hc.displayName = vr;
var mc = "CheckboxIndicator", pc = p.forwardRef(
  (e, t) => {
    const { __scopeCheckbox: n, forceMount: r, ...o } = e, a = _o(mc, n);
    return /* @__PURE__ */ h(
      ze,
      {
        present: r || kt(a.checked) || a.checked === !0,
        children: /* @__PURE__ */ h(
          re.span,
          {
            "data-state": vc(a.checked),
            "data-disabled": a.disabled ? "" : void 0,
            ...o,
            ref: t,
            style: { pointerEvents: "none", ...e.style }
          }
        )
      }
    );
  }
);
pc.displayName = mc;
var gc = "CheckboxBubbleInput", bc = p.forwardRef(
  ({ __scopeCheckbox: e, ...t }, n) => {
    const {
      control: r,
      hasConsumerStoppedPropagationRef: o,
      checked: a,
      defaultChecked: s,
      required: i,
      disabled: c,
      name: l,
      value: u,
      form: d,
      bubbleInput: f,
      setBubbleInput: m
    } = _o(gc, e), y = ce(n, m), g = No(a), b = rr(r);
    p.useEffect(() => {
      const x = f;
      if (!x) return;
      const w = window.HTMLInputElement.prototype, N = Object.getOwnPropertyDescriptor(
        w,
        "checked"
      ).set, C = !o.current;
      if (g !== a && N) {
        const O = new Event("click", { bubbles: C });
        x.indeterminate = kt(a), N.call(x, kt(a) ? !1 : a), x.dispatchEvent(O);
      }
    }, [f, g, a, o]);
    const v = p.useRef(kt(a) ? !1 : a);
    return /* @__PURE__ */ h(
      re.input,
      {
        type: "checkbox",
        "aria-hidden": !0,
        defaultChecked: s ?? v.current,
        required: i,
        disabled: c,
        name: l,
        value: u,
        form: d,
        ...t,
        tabIndex: -1,
        ref: y,
        style: {
          ...t.style,
          ...b,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0,
          // We transform because the input is absolutely positioned but we have
          // rendered it **after** the button. This pulls it back to sit on top
          // of the button.
          transform: "translateX(-100%)"
        }
      }
    );
  }
);
bc.displayName = gc;
function Fb(e) {
  return typeof e == "function";
}
function kt(e) {
  return e === "indeterminate";
}
function vc(e) {
  return kt(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
const Yb = k.forwardRef(({ className: e, label: t, id: n, disabled: r, ...o }, a) => {
  const s = n || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
  return /* @__PURE__ */ L("div", { className: "flex items-center", children: [
    /* @__PURE__ */ h(
      hc,
      {
        ref: a,
        id: s,
        disabled: r,
        className: P(
          "peer h-5 w-5 shrink-0 rounded",
          "border border-gray-400 bg-white",
          "focus-visible:outline-none",
          "focus-visible:ring-2",
          "focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "data-[state=checked]:bg-black data-[state=checked]:border-black",
          "transition-colors",
          e
        ),
        ...o,
        children: /* @__PURE__ */ h(
          pc,
          {
            className: P("flex items-center justify-center", "text-white"),
            children: /* @__PURE__ */ h(fg, { className: "h-[18px] w-[18px]", strokeWidth: 4 })
          }
        )
      }
    ),
    t && /* @__PURE__ */ h(
      "label",
      {
        htmlFor: s,
        className: P(
          "ml-2 text-base font-normal text-gray-500",
          "hover:text-black transition-colors",
          r && "cursor-not-allowed opacity-50",
          "cursor-pointer select-none"
        ),
        children: t
      }
    )
  ] });
});
Yb.displayName = "Checkbox";
var yr = "Dialog", [yc] = Ie(yr), [Bb, Ge] = yc(yr), wc = (e) => {
  const {
    __scopeDialog: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: a,
    modal: s = !0
  } = e, i = p.useRef(null), c = p.useRef(null), [l, u] = rt({
    prop: r,
    defaultProp: o ?? !1,
    onChange: a,
    caller: yr
  });
  return /* @__PURE__ */ h(
    Bb,
    {
      scope: t,
      triggerRef: i,
      contentRef: c,
      contentId: Ct(),
      titleId: Ct(),
      descriptionId: Ct(),
      open: l,
      onOpenChange: u,
      onOpenToggle: p.useCallback(() => u((d) => !d), [u]),
      modal: s,
      children: n
    }
  );
};
wc.displayName = yr;
var xc = "DialogTrigger", Lb = p.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = Ge(xc, n), a = ce(t, o.triggerRef);
    return /* @__PURE__ */ h(
      re.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": o.open,
        "aria-controls": o.contentId,
        "data-state": $o(o.open),
        ...r,
        ref: a,
        onClick: ee(e.onClick, o.onOpenToggle)
      }
    );
  }
);
Lb.displayName = xc;
var Io = "DialogPortal", [Hb, Cc] = yc(Io, {
  forceMount: void 0
}), kc = (e) => {
  const { __scopeDialog: t, forceMount: n, children: r, container: o } = e, a = Ge(Io, t);
  return /* @__PURE__ */ h(Hb, { scope: t, forceMount: n, children: p.Children.map(r, (s) => /* @__PURE__ */ h(ze, { present: n || a.open, children: /* @__PURE__ */ h(ar, { asChild: !0, container: o, children: s }) })) });
};
kc.displayName = Io;
var Qn = "DialogOverlay", Mc = p.forwardRef(
  (e, t) => {
    const n = Cc(Qn, e.__scopeDialog), { forceMount: r = n.forceMount, ...o } = e, a = Ge(Qn, e.__scopeDialog);
    return a.modal ? /* @__PURE__ */ h(ze, { present: r || a.open, children: /* @__PURE__ */ h(jb, { ...o, ref: t }) }) : null;
  }
);
Mc.displayName = Qn;
var zb = /* @__PURE__ */ pn("DialogOverlay.RemoveScroll"), jb = p.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = Ge(Qn, n);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ h(po, { as: zb, allowPinchZoom: !0, shards: [o.contentRef], children: /* @__PURE__ */ h(
        re.div,
        {
          "data-state": $o(o.open),
          ...r,
          ref: t,
          style: { pointerEvents: "auto", ...r.style }
        }
      ) })
    );
  }
), It = "DialogContent", Nc = p.forwardRef(
  (e, t) => {
    const n = Cc(It, e.__scopeDialog), { forceMount: r = n.forceMount, ...o } = e, a = Ge(It, e.__scopeDialog);
    return /* @__PURE__ */ h(ze, { present: r || a.open, children: a.modal ? /* @__PURE__ */ h(Vb, { ...o, ref: t }) : /* @__PURE__ */ h(Gb, { ...o, ref: t }) });
  }
);
Nc.displayName = It;
var Vb = p.forwardRef(
  (e, t) => {
    const n = Ge(It, e.__scopeDialog), r = p.useRef(null), o = ce(t, n.contentRef, r);
    return p.useEffect(() => {
      const a = r.current;
      if (a) return ws(a);
    }, []), /* @__PURE__ */ h(
      Sc,
      {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: ee(e.onCloseAutoFocus, (a) => {
          var s;
          a.preventDefault(), (s = n.triggerRef.current) == null || s.focus();
        }),
        onPointerDownOutside: ee(e.onPointerDownOutside, (a) => {
          const s = a.detail.originalEvent, i = s.button === 0 && s.ctrlKey === !0;
          (s.button === 2 || i) && a.preventDefault();
        }),
        onFocusOutside: ee(
          e.onFocusOutside,
          (a) => a.preventDefault()
        )
      }
    );
  }
), Gb = p.forwardRef(
  (e, t) => {
    const n = Ge(It, e.__scopeDialog), r = p.useRef(!1), o = p.useRef(!1);
    return /* @__PURE__ */ h(
      Sc,
      {
        ...e,
        ref: t,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (a) => {
          var s, i;
          (s = e.onCloseAutoFocus) == null || s.call(e, a), a.defaultPrevented || (r.current || (i = n.triggerRef.current) == null || i.focus(), a.preventDefault()), r.current = !1, o.current = !1;
        },
        onInteractOutside: (a) => {
          var c, l;
          (c = e.onInteractOutside) == null || c.call(e, a), a.defaultPrevented || (r.current = !0, a.detail.originalEvent.type === "pointerdown" && (o.current = !0));
          const s = a.target;
          ((l = n.triggerRef.current) == null ? void 0 : l.contains(s)) && a.preventDefault(), a.detail.originalEvent.type === "focusin" && o.current && a.preventDefault();
        }
      }
    );
  }
), Sc = p.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, trapFocus: r, onOpenAutoFocus: o, onCloseAutoFocus: a, ...s } = e, i = Ge(It, n), c = p.useRef(null), l = ce(t, c);
    return Ua(), /* @__PURE__ */ L(Rt, { children: [
      /* @__PURE__ */ h(
        oo,
        {
          asChild: !0,
          loop: !0,
          trapped: r,
          onMountAutoFocus: o,
          onUnmountAutoFocus: a,
          children: /* @__PURE__ */ h(
            Zn,
            {
              role: "dialog",
              id: i.contentId,
              "aria-describedby": i.descriptionId,
              "aria-labelledby": i.titleId,
              "data-state": $o(i.open),
              ...s,
              ref: l,
              onDismiss: () => i.onOpenChange(!1)
            }
          )
        }
      ),
      /* @__PURE__ */ L(Rt, { children: [
        /* @__PURE__ */ h(Ub, { titleId: i.titleId }),
        /* @__PURE__ */ h(Xb, { contentRef: c, descriptionId: i.descriptionId })
      ] })
    ] });
  }
), Wo = "DialogTitle", Dc = p.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = Ge(Wo, n);
    return /* @__PURE__ */ h(re.h2, { id: o.titleId, ...r, ref: t });
  }
);
Dc.displayName = Wo;
var Oc = "DialogDescription", Ec = p.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = Ge(Oc, n);
    return /* @__PURE__ */ h(re.p, { id: o.descriptionId, ...r, ref: t });
  }
);
Ec.displayName = Oc;
var Pc = "DialogClose", Rc = p.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = Ge(Pc, n);
    return /* @__PURE__ */ h(
      re.button,
      {
        type: "button",
        ...r,
        ref: t,
        onClick: ee(e.onClick, () => o.onOpenChange(!1))
      }
    );
  }
);
Rc.displayName = Pc;
function $o(e) {
  return e ? "open" : "closed";
}
var Tc = "DialogTitleWarning", [Sy, Ac] = Rl(Tc, {
  contentName: It,
  titleName: Wo,
  docsSlug: "dialog"
}), Ub = ({ titleId: e }) => {
  const t = Ac(Tc), n = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;
  return p.useEffect(() => {
    e && (document.getElementById(e) || console.error(n));
  }, [n, e]), null;
}, qb = "DialogDescriptionWarning", Xb = ({ contentRef: e, descriptionId: t }) => {
  const r = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${Ac(qb).contentName}}.`;
  return p.useEffect(() => {
    var a;
    const o = (a = e.current) == null ? void 0 : a.getAttribute("aria-describedby");
    t && o && (document.getElementById(t) || console.warn(r));
  }, [r, e, t]), null;
}, Kb = wc, Qb = kc, Zb = Mc, Jb = Nc, ev = Dc, tv = Ec, nv = Rc;
const rv = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg"
}, an = k.forwardRef(
  ({
    open: e,
    onOpenChange: t,
    icon: n,
    title: r,
    children: o,
    footer: a,
    className: s,
    showCloseButton: i = !0,
    size: c = "md"
  }, l) => /* @__PURE__ */ h(Kb, { open: e, onOpenChange: t, children: /* @__PURE__ */ L(Qb, { children: [
    /* @__PURE__ */ h(
      Zb,
      {
        className: P(
          "fixed inset-0 z-50 bg-black/50",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        )
      }
    ),
    /* @__PURE__ */ L(
      Jb,
      {
        ref: l,
        className: P(
          "fixed left-[50%] top-[50%] z-50",
          "translate-x-[-50%] translate-y-[-50%]",
          "w-full",
          rv[c],
          "bg-white rounded-lg shadow-lg",
          "p-6",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          s
        ),
        children: [
          i && /* @__PURE__ */ h(nv, { asChild: !0, children: /* @__PURE__ */ L(
            dt,
            {
              variant: "ghost",
              size: "icon",
              className: P("h-6 w-6", "absolute right-4 top-4"),
              children: [
                /* @__PURE__ */ h(Eg, {}),
                /* @__PURE__ */ h("span", { className: "sr-only", children: "Close" })
              ]
            }
          ) }),
          n && /* @__PURE__ */ h("div", { className: "flex justify-center mb-4", children: n }),
          r && /* @__PURE__ */ h(
            ev,
            {
              className: P(
                "text-lg font-bold text-cms-gray-900 mb-2",
                "flex items-center justify-center"
              ),
              children: r
            }
          ),
          /* @__PURE__ */ h(tv, { className: "text-sm text-cms-gray-700 text-center", children: o }),
          a && /* @__PURE__ */ h("div", { className: "mt-6", children: a })
        ]
      }
    )
  ] }) })
);
an.displayName = "Modal";
const ov = k.forwardRef(
  ({
    open: e,
    onOpenChange: t,
    title: n = "확인",
    message: r,
    confirmText: o = "확인",
    onConfirm: a,
    className: s
  }, i) => /* @__PURE__ */ h(
    an,
    {
      ref: i,
      open: e,
      onOpenChange: t,
      title: n,
      footer: /* @__PURE__ */ h(
        dt,
        {
          onClick: () => {
            a == null || a(), t(!1);
          },
          className: "w-full h-12 bg-cms-gray-850 hover:bg-cms-gray-800",
          children: o
        }
      ),
      className: s,
      size: "sm",
      showCloseButton: !1,
      icon: /* @__PURE__ */ h(wi, { className: "w-15 h-15 text-cms-black" }),
      children: /* @__PURE__ */ h("div", { className: "text-sm text-cms-gray-700", children: r })
    }
  )
);
ov.displayName = "ConfirmModal";
const av = k.forwardRef(
  ({
    open: e,
    onOpenChange: t,
    title: n = "삭제",
    message: r = "정말로 삭제하시겠습니까?",
    confirmText: o = "삭제",
    cancelText: a = "취소",
    onConfirm: s,
    onCancel: i,
    className: c
  }, l) => /* @__PURE__ */ h(
    an,
    {
      ref: l,
      open: e,
      onOpenChange: t,
      icon: /* @__PURE__ */ h(xi, { className: "w-15 h-15 text-cms-red-400" }),
      title: n,
      footer: /* @__PURE__ */ L("div", { className: "flex gap-2 w-full", children: [
        /* @__PURE__ */ h(
          dt,
          {
            onClick: () => {
              i == null || i(), t(!1);
            },
            variant: "outline",
            className: "flex-1 h-12",
            children: a
          }
        ),
        /* @__PURE__ */ h(
          dt,
          {
            onClick: () => {
              s(), t(!1);
            },
            className: P(
              "flex-1 h-12",
              "bg-cms-red-400 hover:bg-cms-red-500"
            ),
            children: o
          }
        )
      ] }),
      className: c,
      size: "sm",
      showCloseButton: !1,
      children: /* @__PURE__ */ h("div", { className: "text-sm text-cms-gray-700", children: r })
    }
  )
);
av.displayName = "DeleteModal";
const sv = k.forwardRef(
  ({
    open: e,
    onOpenChange: t,
    title: n = "오류",
    message: r,
    confirmText: o = "확인",
    onConfirm: a,
    className: s
  }, i) => /* @__PURE__ */ h(
    an,
    {
      ref: i,
      open: e,
      onOpenChange: t,
      icon: /* @__PURE__ */ h(Mg, { className: "w-15 h-15 text-cms-red-400" }),
      title: n,
      footer: /* @__PURE__ */ h(
        dt,
        {
          onClick: () => {
            a == null || a(), t(!1);
          },
          className: "w-full h-12 bg-cms-gray-850 hover:bg-cms-gray-800",
          children: o
        }
      ),
      className: s,
      size: "sm",
      showCloseButton: !1,
      children: /* @__PURE__ */ h("div", { className: "text-sm text-cms-gray-700", children: r })
    }
  )
);
sv.displayName = "ErrorModal";
const iv = k.forwardRef(
  ({
    open: e,
    onOpenChange: t,
    title: n = "경고",
    message: r,
    confirmText: o = "확인",
    onConfirm: a,
    // 기본값 설정
    cancelText: s = "취소",
    onCancel: i,
    className: c
  }, l) => /* @__PURE__ */ h(
    an,
    {
      ref: l,
      open: e,
      onOpenChange: t,
      icon: /* @__PURE__ */ h(xi, { className: "w-15 h-15 text-cms-orange-500" }),
      title: n,
      footer: (
        // 버튼 두 개를 가로로 배치하기 위해 flex 컨테이너 사용
        /* @__PURE__ */ L("div", { className: "flex w-full gap-2", children: [
          /* @__PURE__ */ h(
            dt,
            {
              onClick: () => {
                i == null || i(), t(!1);
              },
              className: "flex-1 h-12 bg-white border border-cms-gray-200 text-cms-gray-700 hover:bg-cms-gray-50",
              children: s
            }
          ),
          /* @__PURE__ */ h(
            dt,
            {
              onClick: () => {
                a == null || a(), t(!1);
              },
              className: "flex-1 h-12 bg-cms-gray-850 hover:bg-cms-gray-800",
              children: o
            }
          )
        ] })
      ),
      className: c,
      size: "sm",
      showCloseButton: !1,
      children: /* @__PURE__ */ h("div", { className: "text-sm text-cms-gray-700", children: r })
    }
  )
);
iv.displayName = "WarningModal";
const cv = k.forwardRef(
  ({
    open: e,
    onOpenChange: t,
    title: n = "성공",
    message: r,
    confirmText: o = "확인",
    onConfirm: a,
    className: s
  }, i) => /* @__PURE__ */ h(
    an,
    {
      ref: i,
      open: e,
      onOpenChange: t,
      icon: /* @__PURE__ */ h(wi, { className: "w-15 h-15 text-cms-green-500 border-cms-green-500" }),
      title: n,
      footer: /* @__PURE__ */ h(
        dt,
        {
          onClick: () => {
            a == null || a(), t(!1);
          },
          className: "w-full h-12 bg-cms-gray-850 hover:bg-cms-gray-800",
          children: o
        }
      ),
      className: s,
      size: "sm",
      showCloseButton: !1,
      children: /* @__PURE__ */ h("div", { className: "text-sm text-cms-gray-700", children: r })
    }
  )
);
cv.displayName = "SuccessModal";
function lv(e) {
  if (typeof document > "u") return;
  let t = document.head || document.getElementsByTagName("head")[0], n = document.createElement("style");
  n.type = "text/css", t.appendChild(n), n.styleSheet ? n.styleSheet.cssText = e : n.appendChild(document.createTextNode(e));
}
const dv = (e) => {
  switch (e) {
    case "success":
      return hv;
    case "info":
      return pv;
    case "warning":
      return mv;
    case "error":
      return gv;
    default:
      return null;
  }
}, uv = Array(12).fill(0), fv = ({ visible: e, className: t }) => /* @__PURE__ */ k.createElement("div", {
  className: [
    "sonner-loading-wrapper",
    t
  ].filter(Boolean).join(" "),
  "data-visible": e
}, /* @__PURE__ */ k.createElement("div", {
  className: "sonner-spinner"
}, uv.map((n, r) => /* @__PURE__ */ k.createElement("div", {
  className: "sonner-loading-bar",
  key: `spinner-bar-${r}`
})))), hv = /* @__PURE__ */ k.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ k.createElement("path", {
  fillRule: "evenodd",
  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
  clipRule: "evenodd"
})), mv = /* @__PURE__ */ k.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ k.createElement("path", {
  fillRule: "evenodd",
  d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
  clipRule: "evenodd"
})), pv = /* @__PURE__ */ k.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ k.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
  clipRule: "evenodd"
})), gv = /* @__PURE__ */ k.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ k.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
  clipRule: "evenodd"
})), bv = /* @__PURE__ */ k.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "12",
  height: "12",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /* @__PURE__ */ k.createElement("line", {
  x1: "18",
  y1: "6",
  x2: "6",
  y2: "18"
}), /* @__PURE__ */ k.createElement("line", {
  x1: "6",
  y1: "6",
  x2: "18",
  y2: "18"
})), vv = () => {
  const [e, t] = k.useState(document.hidden);
  return k.useEffect(() => {
    const n = () => {
      t(document.hidden);
    };
    return document.addEventListener("visibilitychange", n), () => window.removeEventListener("visibilitychange", n);
  }, []), e;
};
let Jr = 1;
class yv {
  constructor() {
    this.subscribe = (t) => (this.subscribers.push(t), () => {
      const n = this.subscribers.indexOf(t);
      this.subscribers.splice(n, 1);
    }), this.publish = (t) => {
      this.subscribers.forEach((n) => n(t));
    }, this.addToast = (t) => {
      this.publish(t), this.toasts = [
        ...this.toasts,
        t
      ];
    }, this.create = (t) => {
      var n;
      const { message: r, ...o } = t, a = typeof (t == null ? void 0 : t.id) == "number" || ((n = t.id) == null ? void 0 : n.length) > 0 ? t.id : Jr++, s = this.toasts.find((c) => c.id === a), i = t.dismissible === void 0 ? !0 : t.dismissible;
      return this.dismissedToasts.has(a) && this.dismissedToasts.delete(a), s ? this.toasts = this.toasts.map((c) => c.id === a ? (this.publish({
        ...c,
        ...t,
        id: a,
        title: r
      }), {
        ...c,
        ...t,
        id: a,
        dismissible: i,
        title: r
      }) : c) : this.addToast({
        title: r,
        ...o,
        dismissible: i,
        id: a
      }), a;
    }, this.dismiss = (t) => (t ? (this.dismissedToasts.add(t), requestAnimationFrame(() => this.subscribers.forEach((n) => n({
      id: t,
      dismiss: !0
    })))) : this.toasts.forEach((n) => {
      this.subscribers.forEach((r) => r({
        id: n.id,
        dismiss: !0
      }));
    }), t), this.message = (t, n) => this.create({
      ...n,
      message: t
    }), this.error = (t, n) => this.create({
      ...n,
      message: t,
      type: "error"
    }), this.success = (t, n) => this.create({
      ...n,
      type: "success",
      message: t
    }), this.info = (t, n) => this.create({
      ...n,
      type: "info",
      message: t
    }), this.warning = (t, n) => this.create({
      ...n,
      type: "warning",
      message: t
    }), this.loading = (t, n) => this.create({
      ...n,
      type: "loading",
      message: t
    }), this.promise = (t, n) => {
      if (!n)
        return;
      let r;
      n.loading !== void 0 && (r = this.create({
        ...n,
        promise: t,
        type: "loading",
        message: n.loading,
        description: typeof n.description != "function" ? n.description : void 0
      }));
      const o = Promise.resolve(t instanceof Function ? t() : t);
      let a = r !== void 0, s;
      const i = o.then(async (l) => {
        if (s = [
          "resolve",
          l
        ], k.isValidElement(l))
          a = !1, this.create({
            id: r,
            type: "default",
            message: l
          });
        else if (xv(l) && !l.ok) {
          a = !1;
          const d = typeof n.error == "function" ? await n.error(`HTTP error! status: ${l.status}`) : n.error, f = typeof n.description == "function" ? await n.description(`HTTP error! status: ${l.status}`) : n.description, y = typeof d == "object" && !k.isValidElement(d) ? d : {
            message: d
          };
          this.create({
            id: r,
            type: "error",
            description: f,
            ...y
          });
        } else if (l instanceof Error) {
          a = !1;
          const d = typeof n.error == "function" ? await n.error(l) : n.error, f = typeof n.description == "function" ? await n.description(l) : n.description, y = typeof d == "object" && !k.isValidElement(d) ? d : {
            message: d
          };
          this.create({
            id: r,
            type: "error",
            description: f,
            ...y
          });
        } else if (n.success !== void 0) {
          a = !1;
          const d = typeof n.success == "function" ? await n.success(l) : n.success, f = typeof n.description == "function" ? await n.description(l) : n.description, y = typeof d == "object" && !k.isValidElement(d) ? d : {
            message: d
          };
          this.create({
            id: r,
            type: "success",
            description: f,
            ...y
          });
        }
      }).catch(async (l) => {
        if (s = [
          "reject",
          l
        ], n.error !== void 0) {
          a = !1;
          const u = typeof n.error == "function" ? await n.error(l) : n.error, d = typeof n.description == "function" ? await n.description(l) : n.description, m = typeof u == "object" && !k.isValidElement(u) ? u : {
            message: u
          };
          this.create({
            id: r,
            type: "error",
            description: d,
            ...m
          });
        }
      }).finally(() => {
        a && (this.dismiss(r), r = void 0), n.finally == null || n.finally.call(n);
      }), c = () => new Promise((l, u) => i.then(() => s[0] === "reject" ? u(s[1]) : l(s[1])).catch(u));
      return typeof r != "string" && typeof r != "number" ? {
        unwrap: c
      } : Object.assign(r, {
        unwrap: c
      });
    }, this.custom = (t, n) => {
      const r = (n == null ? void 0 : n.id) || Jr++;
      return this.create({
        jsx: t(r),
        id: r,
        ...n
      }), r;
    }, this.getActiveToasts = () => this.toasts.filter((t) => !this.dismissedToasts.has(t.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set();
  }
}
const Oe = new yv(), wv = (e, t) => {
  const n = (t == null ? void 0 : t.id) || Jr++;
  return Oe.addToast({
    title: e,
    ...t,
    id: n
  }), n;
}, xv = (e) => e && typeof e == "object" && "ok" in e && typeof e.ok == "boolean" && "status" in e && typeof e.status == "number", Cv = wv, kv = () => Oe.toasts, Mv = () => Oe.getActiveToasts(), Dy = Object.assign(Cv, {
  success: Oe.success,
  info: Oe.info,
  warning: Oe.warning,
  error: Oe.error,
  custom: Oe.custom,
  message: Oe.message,
  promise: Oe.promise,
  dismiss: Oe.dismiss,
  loading: Oe.loading
}, {
  getHistory: kv,
  getToasts: Mv
});
lv("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function Hn(e) {
  return e.label !== void 0;
}
const Nv = 3, Sv = "24px", Dv = "16px", Ra = 4e3, Ov = 356, Ev = 14, Pv = 45, Rv = 200;
function Ue(...e) {
  return e.filter(Boolean).join(" ");
}
function Tv(e) {
  const [t, n] = e.split("-"), r = [];
  return t && r.push(t), n && r.push(n), r;
}
const Av = (e) => {
  var t, n, r, o, a, s, i, c, l;
  const { invert: u, toast: d, unstyled: f, interacting: m, setHeights: y, visibleToasts: g, heights: b, index: v, toasts: x, expanded: w, removeToast: M, defaultRichColors: N, closeButton: C, style: O, cancelButtonStyle: _, actionButtonStyle: B, className: I = "", descriptionClassName: F = "", duration: T, position: Y, gap: D, expandByDefault: R, classNames: S, icons: A, closeButtonAriaLabel: E = "Close toast" } = e, [W, $] = k.useState(null), [z, te] = k.useState(null), [H, q] = k.useState(!1), [K, le] = k.useState(!1), [ue, Z] = k.useState(!1), [he, se] = k.useState(!1), [ge, ve] = k.useState(!1), [De, mt] = k.useState(0), [Wt, $t] = k.useState(0), at = k.useRef(d.duration || T || Ra), Ft = k.useRef(null), xe = k.useRef(null), Cr = v === 0, kr = v + 1 <= g, Me = d.type, st = d.dismissible !== !1, sn = d.className || "", cn = d.descriptionClassName || "", Yt = k.useMemo(() => b.findIndex((V) => V.toastId === d.id) || 0, [
    b,
    d.id
  ]), Mr = k.useMemo(() => {
    var V;
    return (V = d.closeButton) != null ? V : C;
  }, [
    d.closeButton,
    C
  ]), En = k.useMemo(() => d.duration || T || Ra, [
    d.duration,
    T
  ]), ln = k.useRef(0), pt = k.useRef(0), Pn = k.useRef(0), gt = k.useRef(null), [Nr, Sr] = Y.split("-"), Rn = k.useMemo(() => b.reduce((V, G, be) => be >= Yt ? V : V + G.height, 0), [
    b,
    Yt
  ]), Tn = vv(), An = d.invert || u, dn = Me === "loading";
  pt.current = k.useMemo(() => Yt * D + Rn, [
    Yt,
    Rn
  ]), k.useEffect(() => {
    at.current = En;
  }, [
    En
  ]), k.useEffect(() => {
    q(!0);
  }, []), k.useEffect(() => {
    const V = xe.current;
    if (V) {
      const G = V.getBoundingClientRect().height;
      return $t(G), y((be) => [
        {
          toastId: d.id,
          height: G,
          position: d.position
        },
        ...be
      ]), () => y((be) => be.filter((Ne) => Ne.toastId !== d.id));
    }
  }, [
    y,
    d.id
  ]), k.useLayoutEffect(() => {
    if (!H) return;
    const V = xe.current, G = V.style.height;
    V.style.height = "auto";
    const be = V.getBoundingClientRect().height;
    V.style.height = G, $t(be), y((Ne) => Ne.find((fe) => fe.toastId === d.id) ? Ne.map((fe) => fe.toastId === d.id ? {
      ...fe,
      height: be
    } : fe) : [
      {
        toastId: d.id,
        height: be,
        position: d.position
      },
      ...Ne
    ]);
  }, [
    H,
    d.title,
    d.description,
    y,
    d.id,
    d.jsx,
    d.action,
    d.cancel
  ]);
  const We = k.useCallback(() => {
    le(!0), mt(pt.current), y((V) => V.filter((G) => G.toastId !== d.id)), setTimeout(() => {
      M(d);
    }, Rv);
  }, [
    d,
    M,
    y,
    pt
  ]);
  k.useEffect(() => {
    if (d.promise && Me === "loading" || d.duration === 1 / 0 || d.type === "loading") return;
    let V;
    return w || m || Tn ? (() => {
      if (Pn.current < ln.current) {
        const Ne = (/* @__PURE__ */ new Date()).getTime() - ln.current;
        at.current = at.current - Ne;
      }
      Pn.current = (/* @__PURE__ */ new Date()).getTime();
    })() : (() => {
      at.current !== 1 / 0 && (ln.current = (/* @__PURE__ */ new Date()).getTime(), V = setTimeout(() => {
        d.onAutoClose == null || d.onAutoClose.call(d, d), We();
      }, at.current));
    })(), () => clearTimeout(V);
  }, [
    w,
    m,
    d,
    Me,
    Tn,
    We
  ]), k.useEffect(() => {
    d.delete && (We(), d.onDismiss == null || d.onDismiss.call(d, d));
  }, [
    We,
    d.delete
  ]);
  function X() {
    var V;
    if (A != null && A.loading) {
      var G;
      return /* @__PURE__ */ k.createElement("div", {
        className: Ue(S == null ? void 0 : S.loader, d == null || (G = d.classNames) == null ? void 0 : G.loader, "sonner-loader"),
        "data-visible": Me === "loading"
      }, A.loading);
    }
    return /* @__PURE__ */ k.createElement(fv, {
      className: Ue(S == null ? void 0 : S.loader, d == null || (V = d.classNames) == null ? void 0 : V.loader),
      visible: Me === "loading"
    });
  }
  const ne = d.icon || (A == null ? void 0 : A[Me]) || dv(Me);
  var U, J;
  return /* @__PURE__ */ k.createElement("li", {
    tabIndex: 0,
    ref: xe,
    className: Ue(I, sn, S == null ? void 0 : S.toast, d == null || (t = d.classNames) == null ? void 0 : t.toast, S == null ? void 0 : S.default, S == null ? void 0 : S[Me], d == null || (n = d.classNames) == null ? void 0 : n[Me]),
    "data-sonner-toast": "",
    "data-rich-colors": (U = d.richColors) != null ? U : N,
    "data-styled": !(d.jsx || d.unstyled || f),
    "data-mounted": H,
    "data-promise": !!d.promise,
    "data-swiped": ge,
    "data-removed": K,
    "data-visible": kr,
    "data-y-position": Nr,
    "data-x-position": Sr,
    "data-index": v,
    "data-front": Cr,
    "data-swiping": ue,
    "data-dismissible": st,
    "data-type": Me,
    "data-invert": An,
    "data-swipe-out": he,
    "data-swipe-direction": z,
    "data-expanded": !!(w || R && H),
    "data-testid": d.testId,
    style: {
      "--index": v,
      "--toasts-before": v,
      "--z-index": x.length - v,
      "--offset": `${K ? De : pt.current}px`,
      "--initial-height": R ? "auto" : `${Wt}px`,
      ...O,
      ...d.style
    },
    onDragEnd: () => {
      Z(!1), $(null), gt.current = null;
    },
    onPointerDown: (V) => {
      V.button !== 2 && (dn || !st || (Ft.current = /* @__PURE__ */ new Date(), mt(pt.current), V.target.setPointerCapture(V.pointerId), V.target.tagName !== "BUTTON" && (Z(!0), gt.current = {
        x: V.clientX,
        y: V.clientY
      })));
    },
    onPointerUp: () => {
      var V, G, be;
      if (he || !st) return;
      gt.current = null;
      const Ne = Number(((V = xe.current) == null ? void 0 : V.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0), Bt = Number(((G = xe.current) == null ? void 0 : G.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0), fe = (/* @__PURE__ */ new Date()).getTime() - ((be = Ft.current) == null ? void 0 : be.getTime()), Ce = W === "x" ? Ne : Bt, _n = Math.abs(Ce) / fe;
      if (Math.abs(Ce) >= Pv || _n > 0.11) {
        mt(pt.current), d.onDismiss == null || d.onDismiss.call(d, d), te(W === "x" ? Ne > 0 ? "right" : "left" : Bt > 0 ? "down" : "up"), We(), se(!0);
        return;
      } else {
        var $e, Fe;
        ($e = xe.current) == null || $e.style.setProperty("--swipe-amount-x", "0px"), (Fe = xe.current) == null || Fe.style.setProperty("--swipe-amount-y", "0px");
      }
      ve(!1), Z(!1), $(null);
    },
    onPointerMove: (V) => {
      var G, be, Ne;
      if (!gt.current || !st || ((G = window.getSelection()) == null ? void 0 : G.toString().length) > 0) return;
      const fe = V.clientY - gt.current.y, Ce = V.clientX - gt.current.x;
      var _n;
      const $e = (_n = e.swipeDirections) != null ? _n : Tv(Y);
      !W && (Math.abs(Ce) > 1 || Math.abs(fe) > 1) && $(Math.abs(Ce) > Math.abs(fe) ? "x" : "y");
      let Fe = {
        x: 0,
        y: 0
      };
      const Bo = (Ot) => 1 / (1.5 + Math.abs(Ot) / 20);
      if (W === "y") {
        if ($e.includes("top") || $e.includes("bottom"))
          if ($e.includes("top") && fe < 0 || $e.includes("bottom") && fe > 0)
            Fe.y = fe;
          else {
            const Ot = fe * Bo(fe);
            Fe.y = Math.abs(Ot) < Math.abs(fe) ? Ot : fe;
          }
      } else if (W === "x" && ($e.includes("left") || $e.includes("right")))
        if ($e.includes("left") && Ce < 0 || $e.includes("right") && Ce > 0)
          Fe.x = Ce;
        else {
          const Ot = Ce * Bo(Ce);
          Fe.x = Math.abs(Ot) < Math.abs(Ce) ? Ot : Ce;
        }
      (Math.abs(Fe.x) > 0 || Math.abs(Fe.y) > 0) && ve(!0), (be = xe.current) == null || be.style.setProperty("--swipe-amount-x", `${Fe.x}px`), (Ne = xe.current) == null || Ne.style.setProperty("--swipe-amount-y", `${Fe.y}px`);
    }
  }, Mr && !d.jsx && Me !== "loading" ? /* @__PURE__ */ k.createElement("button", {
    "aria-label": E,
    "data-disabled": dn,
    "data-close-button": !0,
    onClick: dn || !st ? () => {
    } : () => {
      We(), d.onDismiss == null || d.onDismiss.call(d, d);
    },
    className: Ue(S == null ? void 0 : S.closeButton, d == null || (r = d.classNames) == null ? void 0 : r.closeButton)
  }, (J = A == null ? void 0 : A.close) != null ? J : bv) : null, (Me || d.icon || d.promise) && d.icon !== null && ((A == null ? void 0 : A[Me]) !== null || d.icon) ? /* @__PURE__ */ k.createElement("div", {
    "data-icon": "",
    className: Ue(S == null ? void 0 : S.icon, d == null || (o = d.classNames) == null ? void 0 : o.icon)
  }, d.promise || d.type === "loading" && !d.icon ? d.icon || X() : null, d.type !== "loading" ? ne : null) : null, /* @__PURE__ */ k.createElement("div", {
    "data-content": "",
    className: Ue(S == null ? void 0 : S.content, d == null || (a = d.classNames) == null ? void 0 : a.content)
  }, /* @__PURE__ */ k.createElement("div", {
    "data-title": "",
    className: Ue(S == null ? void 0 : S.title, d == null || (s = d.classNames) == null ? void 0 : s.title)
  }, d.jsx ? d.jsx : typeof d.title == "function" ? d.title() : d.title), d.description ? /* @__PURE__ */ k.createElement("div", {
    "data-description": "",
    className: Ue(F, cn, S == null ? void 0 : S.description, d == null || (i = d.classNames) == null ? void 0 : i.description)
  }, typeof d.description == "function" ? d.description() : d.description) : null), /* @__PURE__ */ k.isValidElement(d.cancel) ? d.cancel : d.cancel && Hn(d.cancel) ? /* @__PURE__ */ k.createElement("button", {
    "data-button": !0,
    "data-cancel": !0,
    style: d.cancelButtonStyle || _,
    onClick: (V) => {
      Hn(d.cancel) && st && (d.cancel.onClick == null || d.cancel.onClick.call(d.cancel, V), We());
    },
    className: Ue(S == null ? void 0 : S.cancelButton, d == null || (c = d.classNames) == null ? void 0 : c.cancelButton)
  }, d.cancel.label) : null, /* @__PURE__ */ k.isValidElement(d.action) ? d.action : d.action && Hn(d.action) ? /* @__PURE__ */ k.createElement("button", {
    "data-button": !0,
    "data-action": !0,
    style: d.actionButtonStyle || B,
    onClick: (V) => {
      Hn(d.action) && (d.action.onClick == null || d.action.onClick.call(d.action, V), !V.defaultPrevented && We());
    },
    className: Ue(S == null ? void 0 : S.actionButton, d == null || (l = d.classNames) == null ? void 0 : l.actionButton)
  }, d.action.label) : null);
};
function Ta() {
  if (typeof window > "u" || typeof document > "u") return "ltr";
  const e = document.documentElement.getAttribute("dir");
  return e === "auto" || !e ? window.getComputedStyle(document.documentElement).direction : e;
}
function _v(e, t) {
  const n = {};
  return [
    e,
    t
  ].forEach((r, o) => {
    const a = o === 1, s = a ? "--mobile-offset" : "--offset", i = a ? Dv : Sv;
    function c(l) {
      [
        "top",
        "right",
        "bottom",
        "left"
      ].forEach((u) => {
        n[`${s}-${u}`] = typeof l == "number" ? `${l}px` : l;
      });
    }
    typeof r == "number" || typeof r == "string" ? c(r) : typeof r == "object" ? [
      "top",
      "right",
      "bottom",
      "left"
    ].forEach((l) => {
      r[l] === void 0 ? n[`${s}-${l}`] = i : n[`${s}-${l}`] = typeof r[l] == "number" ? `${r[l]}px` : r[l];
    }) : c(i);
  }), n;
}
const Iv = /* @__PURE__ */ k.forwardRef(function(t, n) {
  const { id: r, invert: o, position: a = "bottom-right", hotkey: s = [
    "altKey",
    "KeyT"
  ], expand: i, closeButton: c, className: l, offset: u, mobileOffset: d, theme: f = "light", richColors: m, duration: y, style: g, visibleToasts: b = Nv, toastOptions: v, dir: x = Ta(), gap: w = Ev, icons: M, containerAriaLabel: N = "Notifications" } = t, [C, O] = k.useState([]), _ = k.useMemo(() => r ? C.filter((H) => H.toasterId === r) : C.filter((H) => !H.toasterId), [
    C,
    r
  ]), B = k.useMemo(() => Array.from(new Set([
    a
  ].concat(_.filter((H) => H.position).map((H) => H.position)))), [
    _,
    a
  ]), [I, F] = k.useState([]), [T, Y] = k.useState(!1), [D, R] = k.useState(!1), [S, A] = k.useState(f !== "system" ? f : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), E = k.useRef(null), W = s.join("+").replace(/Key/g, "").replace(/Digit/g, ""), $ = k.useRef(null), z = k.useRef(!1), te = k.useCallback((H) => {
    O((q) => {
      var K;
      return (K = q.find((le) => le.id === H.id)) != null && K.delete || Oe.dismiss(H.id), q.filter(({ id: le }) => le !== H.id);
    });
  }, []);
  return k.useEffect(() => Oe.subscribe((H) => {
    if (H.dismiss) {
      requestAnimationFrame(() => {
        O((q) => q.map((K) => K.id === H.id ? {
          ...K,
          delete: !0
        } : K));
      });
      return;
    }
    setTimeout(() => {
      Ia.flushSync(() => {
        O((q) => {
          const K = q.findIndex((le) => le.id === H.id);
          return K !== -1 ? [
            ...q.slice(0, K),
            {
              ...q[K],
              ...H
            },
            ...q.slice(K + 1)
          ] : [
            H,
            ...q
          ];
        });
      });
    });
  }), [
    C
  ]), k.useEffect(() => {
    if (f !== "system") {
      A(f);
      return;
    }
    if (f === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? A("dark") : A("light")), typeof window > "u") return;
    const H = window.matchMedia("(prefers-color-scheme: dark)");
    try {
      H.addEventListener("change", ({ matches: q }) => {
        A(q ? "dark" : "light");
      });
    } catch {
      H.addListener(({ matches: K }) => {
        try {
          A(K ? "dark" : "light");
        } catch (le) {
          console.error(le);
        }
      });
    }
  }, [
    f
  ]), k.useEffect(() => {
    C.length <= 1 && Y(!1);
  }, [
    C
  ]), k.useEffect(() => {
    const H = (q) => {
      var K;
      if (s.every((Z) => q[Z] || q.code === Z)) {
        var ue;
        Y(!0), (ue = E.current) == null || ue.focus();
      }
      q.code === "Escape" && (document.activeElement === E.current || (K = E.current) != null && K.contains(document.activeElement)) && Y(!1);
    };
    return document.addEventListener("keydown", H), () => document.removeEventListener("keydown", H);
  }, [
    s
  ]), k.useEffect(() => {
    if (E.current)
      return () => {
        $.current && ($.current.focus({
          preventScroll: !0
        }), $.current = null, z.current = !1);
      };
  }, [
    E.current
  ]), // Remove item from normal navigation flow, only available via hotkey
  /* @__PURE__ */ k.createElement("section", {
    ref: n,
    "aria-label": `${N} ${W}`,
    tabIndex: -1,
    "aria-live": "polite",
    "aria-relevant": "additions text",
    "aria-atomic": "false",
    suppressHydrationWarning: !0
  }, B.map((H, q) => {
    var K;
    const [le, ue] = H.split("-");
    return _.length ? /* @__PURE__ */ k.createElement("ol", {
      key: H,
      dir: x === "auto" ? Ta() : x,
      tabIndex: -1,
      ref: E,
      className: l,
      "data-sonner-toaster": !0,
      "data-sonner-theme": S,
      "data-y-position": le,
      "data-x-position": ue,
      style: {
        "--front-toast-height": `${((K = I[0]) == null ? void 0 : K.height) || 0}px`,
        "--width": `${Ov}px`,
        "--gap": `${w}px`,
        ...g,
        ..._v(u, d)
      },
      onBlur: (Z) => {
        z.current && !Z.currentTarget.contains(Z.relatedTarget) && (z.current = !1, $.current && ($.current.focus({
          preventScroll: !0
        }), $.current = null));
      },
      onFocus: (Z) => {
        Z.target instanceof HTMLElement && Z.target.dataset.dismissible === "false" || z.current || (z.current = !0, $.current = Z.relatedTarget);
      },
      onMouseEnter: () => Y(!0),
      onMouseMove: () => Y(!0),
      onMouseLeave: () => {
        D || Y(!1);
      },
      onDragEnd: () => Y(!1),
      onPointerDown: (Z) => {
        Z.target instanceof HTMLElement && Z.target.dataset.dismissible === "false" || R(!0);
      },
      onPointerUp: () => R(!1)
    }, _.filter((Z) => !Z.position && q === 0 || Z.position === H).map((Z, he) => {
      var se, ge;
      return /* @__PURE__ */ k.createElement(Av, {
        key: Z.id,
        icons: M,
        index: he,
        toast: Z,
        defaultRichColors: m,
        duration: (se = v == null ? void 0 : v.duration) != null ? se : y,
        className: v == null ? void 0 : v.className,
        descriptionClassName: v == null ? void 0 : v.descriptionClassName,
        invert: o,
        visibleToasts: b,
        closeButton: (ge = v == null ? void 0 : v.closeButton) != null ? ge : c,
        interacting: D,
        position: H,
        style: v == null ? void 0 : v.style,
        unstyled: v == null ? void 0 : v.unstyled,
        classNames: v == null ? void 0 : v.classNames,
        cancelButtonStyle: v == null ? void 0 : v.cancelButtonStyle,
        actionButtonStyle: v == null ? void 0 : v.actionButtonStyle,
        closeButtonAriaLabel: v == null ? void 0 : v.closeButtonAriaLabel,
        removeToast: te,
        toasts: _.filter((ve) => ve.position == Z.position),
        heights: I.filter((ve) => ve.position == Z.position),
        setHeights: F,
        expandByDefault: i,
        gap: w,
        expanded: T,
        swipeDirections: t.swipeDirections
      });
    })) : null;
  }));
}), Oy = ({ position: e = "bottom-center", ...t }) => /* @__PURE__ */ h(
  Iv,
  {
    position: e,
    className: "toaster group",
    toastOptions: {
      classNames: {
        toast: "group toast w-full flex items-center gap-3 p-4 rounded-cms-lg shadow-lg bg-cms-white text-cms-gray-900 !border !border-cms-blue-600 [&_[data-content]]:!flex-row [&_[data-content]]:!items-baseline",
        title: "group-[.toast]:text-cms-gray-900 group-[.toast]:font-bold group-[.toast]:text-sm group-[.toast]:mr-2 group-[.toast]:!font-bold",
        description: "group-[.toast]:text-cms-gray-500 group-[.toast]:text-xs group-[.toast]:font-medium",
        actionButton: "group-[.toast]:bg-cms-gray-900 group-[.toast]:text-cms-white",
        cancelButton: "group-[.toast]:bg-cms-gray-100 group-[.toast]:text-cms-gray-500"
      }
    },
    ...t
  }
);
var Wv = Object.freeze({
  // See: https://github.com/twbs/bootstrap/blob/main/scss/mixins/_visually-hidden.scss
  position: "absolute",
  border: 0,
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  wordWrap: "normal"
}), $v = "VisuallyHidden", _c = p.forwardRef(
  (e, t) => /* @__PURE__ */ h(
    re.span,
    {
      ...e,
      ref: t,
      style: { ...Wv, ...e.style }
    }
  )
);
_c.displayName = $v;
var Fv = _c, [wr] = Ie("Tooltip", [
  or
]), xr = or(), Ic = "TooltipProvider", Yv = 700, eo = "tooltip.open", [Bv, Fo] = wr(Ic), Wc = (e) => {
  const {
    __scopeTooltip: t,
    delayDuration: n = Yv,
    skipDelayDuration: r = 300,
    disableHoverableContent: o = !1,
    children: a
  } = e, s = p.useRef(!0), i = p.useRef(!1), c = p.useRef(0);
  return p.useEffect(() => {
    const l = c.current;
    return () => window.clearTimeout(l);
  }, []), /* @__PURE__ */ h(
    Bv,
    {
      scope: t,
      isOpenDelayedRef: s,
      delayDuration: n,
      onOpen: p.useCallback(() => {
        window.clearTimeout(c.current), s.current = !1;
      }, []),
      onClose: p.useCallback(() => {
        window.clearTimeout(c.current), c.current = window.setTimeout(
          () => s.current = !0,
          r
        );
      }, [r]),
      isPointerInTransitRef: i,
      onPointerInTransitChange: p.useCallback((l) => {
        i.current = l;
      }, []),
      disableHoverableContent: o,
      children: a
    }
  );
};
Wc.displayName = Ic;
var wn = "Tooltip", [Lv, On] = wr(wn), $c = (e) => {
  const {
    __scopeTooltip: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: a,
    disableHoverableContent: s,
    delayDuration: i
  } = e, c = Fo(wn, e.__scopeTooltip), l = xr(t), [u, d] = p.useState(null), f = Ct(), m = p.useRef(0), y = s ?? c.disableHoverableContent, g = i ?? c.delayDuration, b = p.useRef(!1), [v, x] = rt({
    prop: r,
    defaultProp: o ?? !1,
    onChange: (O) => {
      O ? (c.onOpen(), document.dispatchEvent(new CustomEvent(eo))) : c.onClose(), a == null || a(O);
    },
    caller: wn
  }), w = p.useMemo(() => v ? b.current ? "delayed-open" : "instant-open" : "closed", [v]), M = p.useCallback(() => {
    window.clearTimeout(m.current), m.current = 0, b.current = !1, x(!0);
  }, [x]), N = p.useCallback(() => {
    window.clearTimeout(m.current), m.current = 0, x(!1);
  }, [x]), C = p.useCallback(() => {
    window.clearTimeout(m.current), m.current = window.setTimeout(() => {
      b.current = !0, x(!0), m.current = 0;
    }, g);
  }, [g, x]);
  return p.useEffect(() => () => {
    m.current && (window.clearTimeout(m.current), m.current = 0);
  }, []), /* @__PURE__ */ h(gs, { ...l, children: /* @__PURE__ */ h(
    Lv,
    {
      scope: t,
      contentId: f,
      open: v,
      stateAttribute: w,
      trigger: u,
      onTriggerChange: d,
      onTriggerEnter: p.useCallback(() => {
        c.isOpenDelayedRef.current ? C() : M();
      }, [c.isOpenDelayedRef, C, M]),
      onTriggerLeave: p.useCallback(() => {
        y ? N() : (window.clearTimeout(m.current), m.current = 0);
      }, [N, y]),
      onOpen: M,
      onClose: N,
      disableHoverableContent: y,
      children: n
    }
  ) });
};
$c.displayName = wn;
var to = "TooltipTrigger", Fc = p.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, o = On(to, n), a = Fo(to, n), s = xr(n), i = p.useRef(null), c = ce(t, i, o.onTriggerChange), l = p.useRef(!1), u = p.useRef(!1), d = p.useCallback(() => l.current = !1, []);
    return p.useEffect(() => () => document.removeEventListener("pointerup", d), [d]), /* @__PURE__ */ h(mo, { asChild: !0, ...s, children: /* @__PURE__ */ h(
      re.button,
      {
        "aria-describedby": o.open ? o.contentId : void 0,
        "data-state": o.stateAttribute,
        ...r,
        ref: c,
        onPointerMove: ee(e.onPointerMove, (f) => {
          f.pointerType !== "touch" && !u.current && !a.isPointerInTransitRef.current && (o.onTriggerEnter(), u.current = !0);
        }),
        onPointerLeave: ee(e.onPointerLeave, () => {
          o.onTriggerLeave(), u.current = !1;
        }),
        onPointerDown: ee(e.onPointerDown, () => {
          o.open && o.onClose(), l.current = !0, document.addEventListener("pointerup", d, { once: !0 });
        }),
        onFocus: ee(e.onFocus, () => {
          l.current || o.onOpen();
        }),
        onBlur: ee(e.onBlur, o.onClose),
        onClick: ee(e.onClick, o.onClose)
      }
    ) });
  }
);
Fc.displayName = to;
var Yo = "TooltipPortal", [Hv, zv] = wr(Yo, {
  forceMount: void 0
}), Yc = (e) => {
  const { __scopeTooltip: t, forceMount: n, children: r, container: o } = e, a = On(Yo, t);
  return /* @__PURE__ */ h(Hv, { scope: t, forceMount: n, children: /* @__PURE__ */ h(ze, { present: n || a.open, children: /* @__PURE__ */ h(ar, { asChild: !0, container: o, children: r }) }) });
};
Yc.displayName = Yo;
var en = "TooltipContent", Bc = p.forwardRef(
  (e, t) => {
    const n = zv(en, e.__scopeTooltip), { forceMount: r = n.forceMount, side: o = "top", ...a } = e, s = On(en, e.__scopeTooltip);
    return /* @__PURE__ */ h(ze, { present: r || s.open, children: s.disableHoverableContent ? /* @__PURE__ */ h(Lc, { side: o, ...a, ref: t }) : /* @__PURE__ */ h(jv, { side: o, ...a, ref: t }) });
  }
), jv = p.forwardRef((e, t) => {
  const n = On(en, e.__scopeTooltip), r = Fo(en, e.__scopeTooltip), o = p.useRef(null), a = ce(t, o), [s, i] = p.useState(null), { trigger: c, onClose: l } = n, u = o.current, { onPointerInTransitChange: d } = r, f = p.useCallback(() => {
    i(null), d(!1);
  }, [d]), m = p.useCallback(
    (y, g) => {
      const b = y.currentTarget, v = { x: y.clientX, y: y.clientY }, x = qv(v, b.getBoundingClientRect()), w = Xv(v, x), M = Kv(g.getBoundingClientRect()), N = Zv([...w, ...M]);
      i(N), d(!0);
    },
    [d]
  );
  return p.useEffect(() => () => f(), [f]), p.useEffect(() => {
    if (c && u) {
      const y = (b) => m(b, u), g = (b) => m(b, c);
      return c.addEventListener("pointerleave", y), u.addEventListener("pointerleave", g), () => {
        c.removeEventListener("pointerleave", y), u.removeEventListener("pointerleave", g);
      };
    }
  }, [c, u, m, f]), p.useEffect(() => {
    if (s) {
      const y = (g) => {
        const b = g.target, v = { x: g.clientX, y: g.clientY }, x = (c == null ? void 0 : c.contains(b)) || (u == null ? void 0 : u.contains(b)), w = !Qv(v, s);
        x ? f() : w && (f(), l());
      };
      return document.addEventListener("pointermove", y), () => document.removeEventListener("pointermove", y);
    }
  }, [c, u, s, l, f]), /* @__PURE__ */ h(Lc, { ...e, ref: a });
}), [Vv, Gv] = wr(wn, { isInside: !1 }), Uv = /* @__PURE__ */ _l("TooltipContent"), Lc = p.forwardRef(
  (e, t) => {
    const {
      __scopeTooltip: n,
      children: r,
      "aria-label": o,
      onEscapeKeyDown: a,
      onPointerDownOutside: s,
      ...i
    } = e, c = On(en, n), l = xr(n), { onClose: u } = c;
    return p.useEffect(() => (document.addEventListener(eo, u), () => document.removeEventListener(eo, u)), [u]), p.useEffect(() => {
      if (c.trigger) {
        const d = (f) => {
          const m = f.target;
          m != null && m.contains(c.trigger) && u();
        };
        return window.addEventListener("scroll", d, { capture: !0 }), () => window.removeEventListener("scroll", d, { capture: !0 });
      }
    }, [c.trigger, u]), /* @__PURE__ */ h(
      Zn,
      {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: a,
        onPointerDownOutside: s,
        onFocusOutside: (d) => d.preventDefault(),
        onDismiss: u,
        children: /* @__PURE__ */ L(
          bs,
          {
            "data-state": c.stateAttribute,
            ...l,
            ...i,
            ref: t,
            style: {
              ...i.style,
              "--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)",
              "--radix-tooltip-content-available-width": "var(--radix-popper-available-width)",
              "--radix-tooltip-content-available-height": "var(--radix-popper-available-height)",
              "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
              "--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)"
            },
            children: [
              /* @__PURE__ */ h(Uv, { children: r }),
              /* @__PURE__ */ h(Vv, { scope: n, isInside: !0, children: /* @__PURE__ */ h(Fv, { id: c.contentId, role: "tooltip", children: o || r }) })
            ]
          }
        )
      }
    );
  }
);
Bc.displayName = en;
var Hc = "TooltipArrow", zc = p.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, o = xr(n);
    return Gv(
      Hc,
      n
    ).isInside ? null : /* @__PURE__ */ h(vs, { ...o, ...r, ref: t });
  }
);
zc.displayName = Hc;
function qv(e, t) {
  const n = Math.abs(t.top - e.y), r = Math.abs(t.bottom - e.y), o = Math.abs(t.right - e.x), a = Math.abs(t.left - e.x);
  switch (Math.min(n, r, o, a)) {
    case a:
      return "left";
    case o:
      return "right";
    case n:
      return "top";
    case r:
      return "bottom";
    default:
      throw new Error("unreachable");
  }
}
function Xv(e, t, n = 5) {
  const r = [];
  switch (t) {
    case "top":
      r.push(
        { x: e.x - n, y: e.y + n },
        { x: e.x + n, y: e.y + n }
      );
      break;
    case "bottom":
      r.push(
        { x: e.x - n, y: e.y - n },
        { x: e.x + n, y: e.y - n }
      );
      break;
    case "left":
      r.push(
        { x: e.x + n, y: e.y - n },
        { x: e.x + n, y: e.y + n }
      );
      break;
    case "right":
      r.push(
        { x: e.x - n, y: e.y - n },
        { x: e.x - n, y: e.y + n }
      );
      break;
  }
  return r;
}
function Kv(e) {
  const { top: t, right: n, bottom: r, left: o } = e;
  return [
    { x: o, y: t },
    { x: n, y: t },
    { x: n, y: r },
    { x: o, y: r }
  ];
}
function Qv(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let a = 0, s = t.length - 1; a < t.length; s = a++) {
    const i = t[a], c = t[s], l = i.x, u = i.y, d = c.x, f = c.y;
    u > r != f > r && n < (d - l) * (r - u) / (f - u) + l && (o = !o);
  }
  return o;
}
function Zv(e) {
  const t = e.slice();
  return t.sort((n, r) => n.x < r.x ? -1 : n.x > r.x ? 1 : n.y < r.y ? -1 : n.y > r.y ? 1 : 0), Jv(t);
}
function Jv(e) {
  if (e.length <= 1) return e.slice();
  const t = [];
  for (let r = 0; r < e.length; r++) {
    const o = e[r];
    for (; t.length >= 2; ) {
      const a = t[t.length - 1], s = t[t.length - 2];
      if ((a.x - s.x) * (o.y - s.y) >= (a.y - s.y) * (o.x - s.x)) t.pop();
      else break;
    }
    t.push(o);
  }
  t.pop();
  const n = [];
  for (let r = e.length - 1; r >= 0; r--) {
    const o = e[r];
    for (; n.length >= 2; ) {
      const a = n[n.length - 1], s = n[n.length - 2];
      if ((a.x - s.x) * (o.y - s.y) >= (a.y - s.y) * (o.x - s.x)) n.pop();
      else break;
    }
    n.push(o);
  }
  return n.pop(), t.length === 1 && n.length === 1 && t[0].x === n[0].x && t[0].y === n[0].y ? t : t.concat(n);
}
var ey = Wc, ty = $c, ny = Fc, ry = Yc, oy = Bc, ay = zc;
const sy = k.forwardRef(
  ({
    children: e,
    content: t,
    side: n = "top",
    sideOffset: r = 4,
    align: o = "center",
    delayDuration: a = 200,
    skipDelayDuration: s = 300,
    disableHoverableContent: i,
    showArrow: c = !0,
    open: l,
    defaultOpen: u,
    onOpenChange: d,
    className: f,
    ...m
  }, y) => /* @__PURE__ */ h(
    ey,
    {
      delayDuration: a,
      skipDelayDuration: s,
      disableHoverableContent: i,
      children: /* @__PURE__ */ L(
        ty,
        {
          open: l,
          defaultOpen: u,
          onOpenChange: d,
          children: [
            /* @__PURE__ */ h(ny, { asChild: !0, children: e }),
            /* @__PURE__ */ h(ry, { children: /* @__PURE__ */ L(
              oy,
              {
                ref: y,
                side: n,
                sideOffset: r,
                align: o,
                className: P(
                  "z-50 px-3 py-1.5",
                  "rounded-md",
                  "bg-cms-black text-cms-white",
                  "text-xs font-medium",
                  "shadow-md",
                  "max-w-xs",
                  "animate-in fade-in-0 zoom-in-95",
                  "data-[state=closed]:animate-out",
                  "data-[state=closed]:fade-out-0",
                  "data-[state=closed]:zoom-out-95",
                  "data-[side=bottom]:slide-in-from-top-2",
                  "data-[side=left]:slide-in-from-right-2",
                  "data-[side=right]:slide-in-from-left-2",
                  "data-[side=top]:slide-in-from-bottom-2",
                  f
                ),
                ...m,
                children: [
                  t,
                  c && /* @__PURE__ */ h(ay, { className: "fill-cms-black" })
                ]
              }
            ) })
          ]
        }
      )
    }
  )
);
sy.displayName = "ToolTip";
const iy = Se(P("w-full caption-bottom text-sm [border-spacing:0]"), {
  variants: {
    bordered: {
      true: "",
      false: ""
    }
  },
  defaultVariants: {
    bordered: !1
  }
}), cy = k.forwardRef(
  ({ className: e, striped: t, hoverable: n, bordered: r, compact: o, ...a }, s) => /* @__PURE__ */ h(
    "div",
    {
      className: P(
        "relative w-full overflow-auto",
        r && "border border-cms-gray-300 rounded-lg"
      ),
      children: /* @__PURE__ */ h(
        "table",
        {
          ref: s,
          className: P(iy({ bordered: r }), e),
          "data-striped": t,
          "data-hoverable": n,
          "data-compact": o,
          ...a
        }
      )
    }
  )
);
cy.displayName = "Table";
const ly = k.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ h(
  "thead",
  {
    ref: n,
    className: P(
      "[&_tr]:border-0",
      "[&_th:first-child]:rounded-tl-lg",
      "[&_th:last-child]:rounded-tr-lg",
      e
    ),
    ...t
  }
));
ly.displayName = "TableHeader";
const dy = k.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ h(
  "tbody",
  {
    ref: n,
    className: P("[&_tr:last-child]:border-0", e),
    ...t
  }
));
dy.displayName = "TableBody";
const uy = k.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ h(
  "tfoot",
  {
    ref: n,
    className: P(
      "border-t bg-cms-gray-50 font-medium [&>tr]:last:border-b-0",
      e
    ),
    ...t
  }
));
uy.displayName = "TableFooter";
const fy = Se(P("border-b border-cms-gray-200"), {
  variants: {
    hoverable: {
      true: "hover:bg-cms-gray-100",
      false: ""
    },
    selected: {
      true: "bg-cms-primary-100",
      false: ""
    }
  },
  defaultVariants: {
    hoverable: !1,
    selected: !1
  }
}), hy = k.forwardRef(
  ({ className: e, selected: t, ...n }, r) => {
    var i, c, l;
    const o = (i = r == null ? void 0 : r.current) == null ? void 0 : i.closest("table"), a = ((c = o == null ? void 0 : o.dataset) == null ? void 0 : c.hoverable) === "true", s = ((l = o == null ? void 0 : o.dataset) == null ? void 0 : l.striped) === "true";
    return /* @__PURE__ */ h(
      "tr",
      {
        ref: r,
        className: P(
          fy({ hoverable: a, selected: t }),
          s && "even:bg-cms-gray-50",
          e
        ),
        "aria-selected": t,
        ...n
      }
    );
  }
);
hy.displayName = "TableRow";
const my = k.forwardRef(
  ({
    className: e,
    children: t,
    sortable: n,
    sortDirection: r,
    onSort: o,
    scope: a = "col",
    ...s
  }, i) => {
    const l = /* @__PURE__ */ L(Rt, { children: [
      t,
      n ? r === "asc" ? /* @__PURE__ */ h(yg, { className: "ml-2 h-4 w-4" }) : r === "desc" ? /* @__PURE__ */ h(yi, { className: "ml-2 h-4 w-4" }) : /* @__PURE__ */ h(xg, { className: "ml-2 h-4 w-4 opacity-50" }) : null
    ] });
    return /* @__PURE__ */ h(
      "th",
      {
        ref: i,
        scope: a,
        className: P(
          "h-12 px-4 text-left align-middle font-semibold text-cms-gray-800",
          "bg-amber-50 border-0",
          "[&:has([role=checkbox])]:pr-0",
          n && "cursor-pointer select-none hover:bg-amber-100",
          e
        ),
        onClick: n ? o : void 0,
        "aria-sort": r === "asc" ? "ascending" : r === "desc" ? "descending" : void 0,
        ...s,
        children: n ? /* @__PURE__ */ h("div", { className: "flex items-center", children: l }) : l
      }
    );
  }
);
my.displayName = "TableHead";
const py = Se(P("p-4 align-middle [&:has([role=checkbox])]:pr-0"), {
  variants: {
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right"
    }
  },
  defaultVariants: {
    align: "left"
  }
}), gy = k.forwardRef(
  ({ className: e, align: t, ...n }, r) => {
    var s, i;
    const o = (s = r == null ? void 0 : r.current) == null ? void 0 : s.closest("table"), a = ((i = o == null ? void 0 : o.dataset) == null ? void 0 : i.compact) === "true";
    return /* @__PURE__ */ h(
      "td",
      {
        ref: r,
        className: P(
          py({ align: t }),
          a && "p-2",
          e
        ),
        ...n
      }
    );
  }
);
gy.displayName = "TableCell";
const by = k.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ h(
  "caption",
  {
    ref: n,
    className: P("mt-4 text-sm text-cms-gray-600", e),
    ...t
  }
));
by.displayName = "TableCaption";
export {
  dt as Button,
  Yb as Checkbox,
  ky as ChevronRightIcon,
  Pl as Combobox,
  ov as ConfirmModal,
  rg as DatePicker,
  ag as DateRangePicker,
  av as DeleteModal,
  ro as Dropdown,
  sv as ErrorModal,
  Cy as LoadingCircle,
  an as Modal,
  _b as Pagination,
  My as Popover,
  Mf as PopoverContent,
  Sf as PopoverMenuItem,
  Ny as PopoverTrigger,
  ib as RadioGroup,
  db as RadioGroupItem,
  El as Select,
  Tb as SideNavigation,
  cv as SuccessModal,
  $g as Switch,
  cy as Table,
  dy as TableBody,
  by as TableCaption,
  gy as TableCell,
  uy as TableFooter,
  my as TableHead,
  ly as TableHeader,
  hy as TableRow,
  Of as Text,
  Rf as TextInput,
  Pg as TimePicker,
  Oy as Toaster,
  sy as ToolTip,
  iv as WarningModal,
  Ml as buttonVariants,
  P as cn,
  Sl as dropdownTriggerVariants,
  Nf as popoverMenuItemVariants,
  Dy as toast
};
//# sourceMappingURL=index.es.js.map
