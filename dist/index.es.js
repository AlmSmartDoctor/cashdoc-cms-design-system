import { jsx as v, jsxs as U } from "react/jsx-runtime";
import * as d from "react";
import L, { forwardRef as he, useState as Re, useRef as un, useEffect as dn, useLayoutEffect as Ho, createElement as Pt } from "react";
import * as zn from "react-dom";
import Ko from "react-dom";
function Vn(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (n = Vn(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function Gn() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++) (e = arguments[n]) && (t = Vn(e)) && (r && (r += " "), r += t);
  return r;
}
const Dt = "-", Yo = (e) => {
  const t = qo(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (i) => {
      const a = i.split(Dt);
      return a[0] === "" && a.length !== 1 && a.shift(), Un(a, t) || Xo(i);
    },
    getConflictingClassGroupIds: (i, a) => {
      const u = n[i] || [];
      return a && r[i] ? [...u, ...r[i]] : u;
    }
  };
}, Un = (e, t) => {
  var i;
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], r = t.nextPart.get(n), o = r ? Un(e.slice(1), r) : void 0;
  if (o)
    return o;
  if (t.validators.length === 0)
    return;
  const s = e.join(Dt);
  return (i = t.validators.find(({
    validator: a
  }) => a(s))) == null ? void 0 : i.classGroupId;
}, fn = /^\[(.+)\]$/, Xo = (e) => {
  if (fn.test(e)) {
    const t = fn.exec(e)[1], n = t == null ? void 0 : t.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, qo = (e) => {
  const {
    theme: t,
    prefix: n
  } = e, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return Qo(Object.entries(e.classGroups), n).forEach(([s, i]) => {
    Nt(i, r, s, t);
  }), r;
}, Nt = (e, t, n, r) => {
  e.forEach((o) => {
    if (typeof o == "string") {
      const s = o === "" ? t : pn(t, o);
      s.classGroupId = n;
      return;
    }
    if (typeof o == "function") {
      if (Zo(o)) {
        Nt(o(r), t, n, r);
        return;
      }
      t.validators.push({
        validator: o,
        classGroupId: n
      });
      return;
    }
    Object.entries(o).forEach(([s, i]) => {
      Nt(i, pn(t, s), n, r);
    });
  });
}, pn = (e, t) => {
  let n = e;
  return t.split(Dt).forEach((r) => {
    n.nextPart.has(r) || n.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(r);
  }), n;
}, Zo = (e) => e.isThemeGetter, Qo = (e, t) => t ? e.map(([n, r]) => {
  const o = r.map((s) => typeof s == "string" ? t + s : typeof s == "object" ? Object.fromEntries(Object.entries(s).map(([i, a]) => [t + i, a])) : s);
  return [n, o];
}) : e, Jo = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let t = 0, n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  const o = (s, i) => {
    n.set(s, i), t++, t > e && (t = 0, r = n, n = /* @__PURE__ */ new Map());
  };
  return {
    get(s) {
      let i = n.get(s);
      if (i !== void 0)
        return i;
      if ((i = r.get(s)) !== void 0)
        return o(s, i), i;
    },
    set(s, i) {
      n.has(s) ? n.set(s, i) : o(s, i);
    }
  };
}, jn = "!", es = (e) => {
  const {
    separator: t,
    experimentalParseClassName: n
  } = e, r = t.length === 1, o = t[0], s = t.length, i = (a) => {
    const u = [];
    let c = 0, l = 0, f;
    for (let g = 0; g < a.length; g++) {
      let b = a[g];
      if (c === 0) {
        if (b === o && (r || a.slice(g, g + s) === t)) {
          u.push(a.slice(l, g)), l = g + s;
          continue;
        }
        if (b === "/") {
          f = g;
          continue;
        }
      }
      b === "[" ? c++ : b === "]" && c--;
    }
    const m = u.length === 0 ? a : a.substring(l), h = m.startsWith(jn), y = h ? m.substring(1) : m, p = f && f > l ? f - l : void 0;
    return {
      modifiers: u,
      hasImportantModifier: h,
      baseClassName: y,
      maybePostfixModifierPosition: p
    };
  };
  return n ? (a) => n({
    className: a,
    parseClassName: i
  }) : i;
}, ts = (e) => {
  if (e.length <= 1)
    return e;
  const t = [];
  let n = [];
  return e.forEach((r) => {
    r[0] === "[" ? (t.push(...n.sort(), r), n = []) : n.push(r);
  }), t.push(...n.sort()), t;
}, ns = (e) => ({
  cache: Jo(e.cacheSize),
  parseClassName: es(e),
  ...Yo(e)
}), rs = /\s+/, os = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: r,
    getConflictingClassGroupIds: o
  } = t, s = [], i = e.trim().split(rs);
  let a = "";
  for (let u = i.length - 1; u >= 0; u -= 1) {
    const c = i[u], {
      modifiers: l,
      hasImportantModifier: f,
      baseClassName: m,
      maybePostfixModifierPosition: h
    } = n(c);
    let y = !!h, p = r(y ? m.substring(0, h) : m);
    if (!p) {
      if (!y) {
        a = c + (a.length > 0 ? " " + a : a);
        continue;
      }
      if (p = r(m), !p) {
        a = c + (a.length > 0 ? " " + a : a);
        continue;
      }
      y = !1;
    }
    const g = ts(l).join(":"), b = f ? g + jn : g, w = b + p;
    if (s.includes(w))
      continue;
    s.push(w);
    const x = o(p, y);
    for (let C = 0; C < x.length; ++C) {
      const R = x[C];
      s.push(b + R);
    }
    a = c + (a.length > 0 ? " " + a : a);
  }
  return a;
};
function ss() {
  let e = 0, t, n, r = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = Hn(t)) && (r && (r += " "), r += n);
  return r;
}
const Hn = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (t = Hn(e[r])) && (n && (n += " "), n += t);
  return n;
};
function is(e, ...t) {
  let n, r, o, s = i;
  function i(u) {
    const c = t.reduce((l, f) => f(l), e());
    return n = ns(c), r = n.cache.get, o = n.cache.set, s = a, a(u);
  }
  function a(u) {
    const c = r(u);
    if (c)
      return c;
    const l = os(u, n);
    return o(u, l), l;
  }
  return function() {
    return s(ss.apply(null, arguments));
  };
}
const W = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, Kn = /^\[(?:([a-z-]+):)?(.+)\]$/i, as = /^\d+\/\d+$/, cs = /* @__PURE__ */ new Set(["px", "full", "screen"]), ls = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, us = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, ds = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, fs = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, ps = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, se = (e) => Se(e) || cs.has(e) || as.test(e), ue = (e) => ke(e, "length", xs), Se = (e) => !!e && !Number.isNaN(Number(e)), gt = (e) => ke(e, "number", Se), Te = (e) => !!e && Number.isInteger(Number(e)), ms = (e) => e.endsWith("%") && Se(e.slice(0, -1)), k = (e) => Kn.test(e), de = (e) => ls.test(e), hs = /* @__PURE__ */ new Set(["length", "size", "percentage"]), gs = (e) => ke(e, hs, Yn), vs = (e) => ke(e, "position", Yn), bs = /* @__PURE__ */ new Set(["image", "url"]), ys = (e) => ke(e, bs, Rs), ws = (e) => ke(e, "", Cs), _e = () => !0, ke = (e, t, n) => {
  const r = Kn.exec(e);
  return r ? r[1] ? typeof t == "string" ? r[1] === t : t.has(r[1]) : n(r[2]) : !1;
}, xs = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  us.test(e) && !ds.test(e)
), Yn = () => !1, Cs = (e) => fs.test(e), Rs = (e) => ps.test(e), Ss = () => {
  const e = W("colors"), t = W("spacing"), n = W("blur"), r = W("brightness"), o = W("borderColor"), s = W("borderRadius"), i = W("borderSpacing"), a = W("borderWidth"), u = W("contrast"), c = W("grayscale"), l = W("hueRotate"), f = W("invert"), m = W("gap"), h = W("gradientColorStops"), y = W("gradientColorStopPositions"), p = W("inset"), g = W("margin"), b = W("opacity"), w = W("padding"), x = W("saturate"), C = W("scale"), R = W("sepia"), A = W("skew"), S = W("space"), P = W("translate"), _ = () => ["auto", "contain", "none"], M = () => ["auto", "hidden", "clip", "visible", "scroll"], $ = () => ["auto", k, t], N = () => [k, t], D = () => ["", se, ue], E = () => ["auto", Se, k], F = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], T = () => ["solid", "dashed", "dotted", "double", "none"], B = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], I = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], z = () => ["", "0", k], K = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], H = () => [Se, k];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [_e],
      spacing: [se, ue],
      blur: ["none", "", de, k],
      brightness: H(),
      borderColor: [e],
      borderRadius: ["none", "", "full", de, k],
      borderSpacing: N(),
      borderWidth: D(),
      contrast: H(),
      grayscale: z(),
      hueRotate: H(),
      invert: z(),
      gap: N(),
      gradientColorStops: [e],
      gradientColorStopPositions: [ms, ue],
      inset: $(),
      margin: $(),
      opacity: H(),
      padding: N(),
      saturate: H(),
      scale: H(),
      sepia: z(),
      skew: H(),
      space: N(),
      translate: N()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", k]
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
        columns: [de]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": K()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": K()
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
        object: [...F(), k]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: M()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": M()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": M()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: _()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": _()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": _()
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
        inset: [p]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [p]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [p]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [p]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [p]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [p]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [p]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [p]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [p]
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
        z: ["auto", Te, k]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: $()
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
        flex: ["1", "auto", "initial", "none", k]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: z()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: z()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", Te, k]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [_e]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", Te, k]
        }, k]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": E()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": E()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [_e]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [Te, k]
        }, k]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": E()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": E()
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
        "auto-cols": ["auto", "min", "max", "fr", k]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", k]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [m]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": [m]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": [m]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: ["normal", ...I()]
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
        content: ["normal", ...I(), "baseline"]
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
        "place-content": [...I(), "baseline"]
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
        p: [w]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [w]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [w]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [w]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [w]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [w]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [w]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [w]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [w]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [g]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [g]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [g]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [g]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [g]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [g]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [g]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [g]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [g]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      "space-x": [{
        "space-x": [S]
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
        "space-y": [S]
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
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", k, t]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [k, t, "min", "max", "fit"]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [k, t, "none", "full", "min", "max", "fit", "prose", {
          screen: [de]
        }, de]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [k, t, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": [k, t, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [k, t, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [k, t, "auto", "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", de, ue]
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
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", gt]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [_e]
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
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", k]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", Se, gt]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", se, k]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", k]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", k]
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
        "placeholder-opacity": [b]
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
        "text-opacity": [b]
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
        decoration: [...T(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", se, ue]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", se, k]
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
        indent: N()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", k]
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
        content: ["none", k]
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
        "bg-opacity": [b]
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
        bg: [...F(), vs]
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
        bg: ["auto", "cover", "contain", gs]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, ys]
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
        from: [h]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [h]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [h]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [s]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": [s]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": [s]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": [s]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": [s]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": [s]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": [s]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": [s]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": [s]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": [s]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": [s]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": [s]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": [s]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": [s]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": [s]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: [a]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": [a]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": [a]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": [a]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": [a]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": [a]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": [a]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": [a]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": [a]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      "border-opacity": [{
        "border-opacity": [b]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...T(), "hidden"]
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x": [{
        "divide-x": [a]
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
        "divide-y": [a]
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
        "divide-opacity": [b]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: T()
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
        outline: ["", ...T()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [se, k]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [se, ue]
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
        ring: D()
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
        "ring-opacity": [b]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [se, ue]
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
        shadow: ["", "inner", "none", de, ws]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [_e]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [b]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...B(), "plus-lighter", "plus-darker"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": B()
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
        contrast: [u]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", de, k]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [c]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [l]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [f]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [x]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [R]
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
        "backdrop-contrast": [u]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": [c]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [l]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": [f]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [b]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [x]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": [R]
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
        "border-spacing": [i]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": [i]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": [i]
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
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", k]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: H()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", k]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: H()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", k]
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
        scale: [C]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [C]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [C]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [Te, k]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [P]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [P]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [A]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [A]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", k]
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", k]
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
        "scroll-m": N()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": N()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": N()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": N()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": N()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": N()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": N()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": N()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": N()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": N()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": N()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": N()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": N()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": N()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": N()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": N()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": N()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": N()
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
        "will-change": ["auto", "scroll", "contents", "transform", k]
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
        stroke: [se, ue, gt]
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
}, As = /* @__PURE__ */ is(Ss);
function O(...e) {
  return As(Gn(e));
}
const mn = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, hn = Gn, Q = (e, t) => (n) => {
  var r;
  if ((t == null ? void 0 : t.variants) == null) return hn(e, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
  const { variants: o, defaultVariants: s } = t, i = Object.keys(o).map((c) => {
    const l = n == null ? void 0 : n[c], f = s == null ? void 0 : s[c];
    if (l === null) return null;
    const m = mn(l) || mn(f);
    return o[c][m];
  }), a = n && Object.entries(n).reduce((c, l) => {
    let [f, m] = l;
    return m === void 0 || (c[f] = m), c;
  }, {}), u = t == null || (r = t.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((c, l) => {
    let { class: f, className: m, ...h } = l;
    return Object.entries(h).every((y) => {
      let [p, g] = y;
      return Array.isArray(g) ? g.includes({
        ...s,
        ...a
      }[p]) : {
        ...s,
        ...a
      }[p] === g;
    }) ? [
      ...c,
      f,
      m
    ] : c;
  }, []);
  return hn(e, i, u, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
}, Es = Q(
  O(
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
        default: "bg-cms-gray-850 text-cms-white hover:bg-cms-gray-750",
        secondary: O(
          "bg-cms-gray-300 text-cms-black",
          "hover:bg-cms-gray-200 hover:text-cms-gray-800"
        ),
        outline: O(
          "border border-cms-gray-400 bg-transparent",
          "hover:bg-cms-gray-200 hover:text-cms-gray-900"
        ),
        ghost: "hover:bg-cms-gray-200 hover:text-cms-gray-800",
        link: "text-cms-black underline-offset-4 hover:underline"
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
), Ps = he(
  ({ className: e, variant: t, size: n, ...r }, o) => /* @__PURE__ */ v(
    "button",
    {
      className: O(Es({ variant: t, size: n, className: e })),
      ref: o,
      ...r
    }
  )
);
Ps.displayName = "Button";
const Ns = {
  sm: "h-4 w-4",
  md: "h-8 w-8",
  lg: "h-16 w-16"
};
function ru({ size: e = "lg", className: t }) {
  return /* @__PURE__ */ v("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ v(
    "div",
    {
      className: O(
        Ns[e],
        "animate-spin rounded-full border-2 border-cms-gray-500 border-b-transparent",
        t
      )
    }
  ) });
}
const ks = Q(
  O(
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
        default: O(
          "bg-default text-black border border-cms-outline",
          "hover:bg-cms-gray-200"
        ),
        outline: O(
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
), Os = ({
  className: e,
  isOpen: t
}) => /* @__PURE__ */ v(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "10",
    height: "6",
    viewBox: "0 0 10 6",
    fill: "none",
    className: O(
      "transition-transform duration-200",
      t && "rotate-180",
      e
    ),
    children: /* @__PURE__ */ v(
      "path",
      {
        d: "M8.75 0.75L4.57609 4.75L0.75 0.75",
        stroke: "currentColor",
        strokeWidth: "1.5",
        strokeLinecap: "round"
      }
    )
  }
), Is = ({ className: e }) => /* @__PURE__ */ v(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none",
    className: e,
    children: /* @__PURE__ */ v(
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
), Ft = he(
  ({
    options: e,
    value: t,
    placeholder: n = "선택하세요",
    onValueChange: r,
    disabled: o = !1,
    className: s,
    dropdownClassName: i,
    variant: a,
    size: u,
    searchable: c = !1,
    clearable: l = !1,
    multiple: f = !1,
    maxHeight: m = 200,
    ...h
  }, y) => {
    const [p, g] = Re(!1), [b, w] = Re(""), [x, C] = Re(
      f ? t ? [t] : [] : []
    ), R = un(null), A = un(null), S = e.find((E) => E.value === t), P = f ? x.length > 0 ? `${x.length}개 선택됨` : n : (S == null ? void 0 : S.label) || n, _ = e.filter(
      (E) => E.label.toLowerCase().includes(b.toLowerCase())
    ), M = () => {
      o || (g(!p), w(""));
    }, $ = (E) => {
      if (!E.disabled)
        if (f) {
          const F = x.includes(E.value) ? x.filter((T) => T !== E.value) : [...x, E.value];
          C(F), r == null || r(F.join(","));
        } else
          r == null || r(E.value), g(!1);
    }, N = (E) => {
      E.stopPropagation(), f && C([]), r == null || r("");
    }, D = (E) => {
      E.key === "Escape" ? g(!1) : (E.key === "Enter" || E.key === " ") && (E.preventDefault(), M());
    };
    return dn(() => {
      const E = (F) => {
        R.current && !R.current.contains(F.target) && g(!1);
      };
      return document.addEventListener("mousedown", E), () => document.removeEventListener("mousedown", E);
    }, []), dn(() => {
      p && c && A.current && A.current.focus();
    }, [p, c]), /* @__PURE__ */ U("div", { ref: R, className: "relative w-full", children: [
      /* @__PURE__ */ U(
        "button",
        {
          ref: y,
          type: "button",
          className: O(
            ks({ variant: a, size: u }),
            o && "opacity-50 cursor-not-allowed",
            s
          ),
          onClick: M,
          onKeyDown: D,
          disabled: o,
          "aria-expanded": p,
          "aria-haspopup": "listbox",
          ...h,
          children: [
            /* @__PURE__ */ v(
              "span",
              {
                className: O(
                  "truncate flex-1 text-left",
                  !S && !f && "text-cms-gray-400"
                ),
                children: P
              }
            ),
            /* @__PURE__ */ U("div", { className: "flex items-center gap-2 ml-3", children: [
              l && (t || x.length > 0) && /* @__PURE__ */ v(
                "button",
                {
                  type: "button",
                  className: O(
                    "p-1 rounded text-cms-gray-400 transition-colors",
                    "hover:text-cms-black"
                  ),
                  onClick: N,
                  "aria-label": "선택 취소",
                  children: /* @__PURE__ */ v(Is, { className: "w-3 h-3" })
                }
              ),
              /* @__PURE__ */ v(
                Os,
                {
                  isOpen: p,
                  className: "w-4 h-4 text-cms-gray-400"
                }
              )
            ] })
          ]
        }
      ),
      p && /* @__PURE__ */ U(
        "div",
        {
          className: O(
            "absolute z-50 mt-1 py-1 w-full",
            "rounded-lg border border-cms-gray-400",
            "bg-white shadow-lg",
            i
          ),
          style: { maxHeight: `${m}px` },
          children: [
            c && /* @__PURE__ */ v("div", { className: "px-3 py-2 border-b border-cms-gray-400", children: /* @__PURE__ */ v(
              "input",
              {
                ref: A,
                type: "text",
                value: b,
                onChange: (E) => w(E.target.value),
                placeholder: "검색...",
                className: O(
                  "w-full px-2 py-1 text-sm",
                  "rounded outline-none",
                  "border border-cms-gray-400",
                  "focus:ring-1 focus:ring-cms-black"
                )
              }
            ) }),
            /* @__PURE__ */ v("div", { className: "max-h-48 overflow-y-auto", children: _.length === 0 ? /* @__PURE__ */ v("div", { className: "px-3 py-2 text-sm text-cms-gray-400 text-center", children: b ? "검색 결과가 없습니다" : "옵션이 없습니다" }) : _.map((E) => {
              const F = f ? x.includes(E.value) : t === E.value;
              return /* @__PURE__ */ U(
                "button",
                {
                  type: "button",
                  className: O(
                    "flex items-center justify-between gap-2",
                    "w-full px-3 py-2 ",
                    "text-left text-sm",
                    "transition-colors",
                    E.disabled ? "text-cms-gray-400 cursor-not-allowed" : "text-cms-black hover:bg-cms-gray-200 cursor-pointer",
                    F && "bg-cms-gray-400 font-medium"
                  ),
                  onClick: () => $(E),
                  disabled: E.disabled,
                  children: [
                    /* @__PURE__ */ v("span", { className: "truncate", children: E.label }),
                    F && /* @__PURE__ */ v(
                      "svg",
                      {
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "16",
                        height: "16",
                        viewBox: "0 0 16 16",
                        fill: "none",
                        className: "w-4 h-4 text-black shrink-0",
                        children: /* @__PURE__ */ v(
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
                E.value
              );
            }) })
          ]
        }
      )
    ] });
  }
);
Ft.displayName = "Dropdown";
const Ms = he(
  ({ label: e, helperText: t, error: n, required: r, className: o, ...s }, i) => /* @__PURE__ */ U("div", { className: O("space-y-1", o), children: [
    e && /* @__PURE__ */ U("label", { className: "block text-sm font-medium text-cms-black", children: [
      e,
      r && /* @__PURE__ */ v("span", { className: "text-cms-red-500 ml-1", children: "*" })
    ] }),
    /* @__PURE__ */ v(
      Ft,
      {
        ref: i,
        ...s,
        className: O(n && "border-cms-red-500 focus:ring-cms-red-500")
      }
    ),
    (t || n) && /* @__PURE__ */ v(
      "p",
      {
        className: O(
          "text-xs",
          n ? "text-cms-red-500" : "text-cms-gray-400"
        ),
        children: n || t
      }
    )
  ] })
);
Ms.displayName = "Select";
const Ts = he(
  ({ options: e, loading: t = !1, createable: n = !1, onCreateOption: r, ...o }, s) => {
    const [i] = Re(""), a = e.filter(
      (l) => l.label.toLowerCase().includes(i.toLowerCase())
    ), u = a.some(
      (l) => l.label.toLowerCase() === i.toLowerCase()
    ), c = [
      ...a,
      ...n && i && !u ? [
        {
          value: `__create__${i}`,
          label: `"${i}" 생성`,
          disabled: !1
        }
      ] : []
    ];
    return /* @__PURE__ */ v(
      Ft,
      {
        ref: s,
        ...o,
        options: c,
        searchable: !0,
        dropdownClassName: O(t && "opacity-75", o.dropdownClassName),
        onValueChange: (l) => {
          var f;
          if (l.startsWith("__create__")) {
            const m = l.replace("__create__", "");
            r == null || r(m);
          } else
            (f = o.onValueChange) == null || f.call(o, l);
        }
      }
    );
  }
);
Ts.displayName = "Combobox";
function ou(e) {
  return /* @__PURE__ */ v(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "20",
      height: "20",
      viewBox: "0 0 20 20",
      fill: "none",
      ...e,
      children: /* @__PURE__ */ v(
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
function G(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(o) {
    if (e == null || e(o), n === !1 || !o.defaultPrevented)
      return t == null ? void 0 : t(o);
  };
}
function gn(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function Xn(...e) {
  return (t) => {
    let n = !1;
    const r = e.map((o) => {
      const s = gn(o, t);
      return !n && typeof s == "function" && (n = !0), s;
    });
    if (n)
      return () => {
        for (let o = 0; o < r.length; o++) {
          const s = r[o];
          typeof s == "function" ? s() : gn(e[o], null);
        }
      };
  };
}
function j(...e) {
  return d.useCallback(Xn(...e), e);
}
function le(e, t = []) {
  let n = [];
  function r(s, i) {
    const a = d.createContext(i), u = n.length;
    n = [...n, i];
    const c = (f) => {
      var b;
      const { scope: m, children: h, ...y } = f, p = ((b = m == null ? void 0 : m[e]) == null ? void 0 : b[u]) || a, g = d.useMemo(() => y, Object.values(y));
      return /* @__PURE__ */ v(p.Provider, { value: g, children: h });
    };
    c.displayName = s + "Provider";
    function l(f, m) {
      var p;
      const h = ((p = m == null ? void 0 : m[e]) == null ? void 0 : p[u]) || a, y = d.useContext(h);
      if (y) return y;
      if (i !== void 0) return i;
      throw new Error(`\`${f}\` must be used within \`${s}\``);
    }
    return [c, l];
  }
  const o = () => {
    const s = n.map((i) => d.createContext(i));
    return function(a) {
      const u = (a == null ? void 0 : a[e]) || s;
      return d.useMemo(
        () => ({ [`__scope${e}`]: { ...a, [e]: u } }),
        [a, u]
      );
    };
  };
  return o.scopeName = e, [r, _s(o, ...t)];
}
function _s(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((o) => ({
      useScope: o(),
      scopeName: o.scopeName
    }));
    return function(s) {
      const i = r.reduce((a, { useScope: u, scopeName: c }) => {
        const f = u(s)[`__scope${c}`];
        return { ...a, ...f };
      }, {});
      return d.useMemo(() => ({ [`__scope${t.scopeName}`]: i }), [i]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
// @__NO_SIDE_EFFECTS__
function Ze(e) {
  const t = /* @__PURE__ */ Ls(e), n = d.forwardRef((r, o) => {
    const { children: s, ...i } = r, a = d.Children.toArray(s), u = a.find(Fs);
    if (u) {
      const c = u.props.children, l = a.map((f) => f === u ? d.Children.count(c) > 1 ? d.Children.only(null) : d.isValidElement(c) ? c.props.children : null : f);
      return /* @__PURE__ */ v(t, { ...i, ref: o, children: d.isValidElement(c) ? d.cloneElement(c, void 0, l) : null });
    }
    return /* @__PURE__ */ v(t, { ...i, ref: o, children: s });
  });
  return n.displayName = `${e}.Slot`, n;
}
// @__NO_SIDE_EFFECTS__
function Ls(e) {
  const t = d.forwardRef((n, r) => {
    const { children: o, ...s } = n;
    if (d.isValidElement(o)) {
      const i = Ws(o), a = $s(s, o.props);
      return o.type !== d.Fragment && (a.ref = r ? Xn(r, i) : i), d.cloneElement(o, a);
    }
    return d.Children.count(o) > 1 ? d.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var Ds = Symbol("radix.slottable");
function Fs(e) {
  return d.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Ds;
}
function $s(e, t) {
  const n = { ...t };
  for (const r in t) {
    const o = e[r], s = t[r];
    /^on[A-Z]/.test(r) ? o && s ? n[r] = (...a) => {
      const u = s(...a);
      return o(...a), u;
    } : o && (n[r] = o) : r === "style" ? n[r] = { ...o, ...s } : r === "className" && (n[r] = [o, s].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function Ws(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var Bs = [
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
], V = Bs.reduce((e, t) => {
  const n = /* @__PURE__ */ Ze(`Primitive.${t}`), r = d.forwardRef((o, s) => {
    const { asChild: i, ...a } = o, u = i ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ v(u, { ...a, ref: s });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {});
function zs(e, t) {
  e && zn.flushSync(() => e.dispatchEvent(t));
}
function ve(e) {
  const t = d.useRef(e);
  return d.useEffect(() => {
    t.current = e;
  }), d.useMemo(() => (...n) => {
    var r;
    return (r = t.current) == null ? void 0 : r.call(t, ...n);
  }, []);
}
function Vs(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = ve(e);
  d.useEffect(() => {
    const r = (o) => {
      o.key === "Escape" && n(o);
    };
    return t.addEventListener("keydown", r, { capture: !0 }), () => t.removeEventListener("keydown", r, { capture: !0 });
  }, [n, t]);
}
var Gs = "DismissableLayer", kt = "dismissableLayer.update", Us = "dismissableLayer.pointerDownOutside", js = "dismissableLayer.focusOutside", vn, qn = d.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), Zn = d.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: r,
      onPointerDownOutside: o,
      onFocusOutside: s,
      onInteractOutside: i,
      onDismiss: a,
      ...u
    } = e, c = d.useContext(qn), [l, f] = d.useState(null), m = (l == null ? void 0 : l.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), [, h] = d.useState({}), y = j(t, (S) => f(S)), p = Array.from(c.layers), [g] = [...c.layersWithOutsidePointerEventsDisabled].slice(-1), b = p.indexOf(g), w = l ? p.indexOf(l) : -1, x = c.layersWithOutsidePointerEventsDisabled.size > 0, C = w >= b, R = Ys((S) => {
      const P = S.target, _ = [...c.branches].some((M) => M.contains(P));
      !C || _ || (o == null || o(S), i == null || i(S), S.defaultPrevented || a == null || a());
    }, m), A = Xs((S) => {
      const P = S.target;
      [...c.branches].some((M) => M.contains(P)) || (s == null || s(S), i == null || i(S), S.defaultPrevented || a == null || a());
    }, m);
    return Vs((S) => {
      w === c.layers.size - 1 && (r == null || r(S), !S.defaultPrevented && a && (S.preventDefault(), a()));
    }, m), d.useEffect(() => {
      if (l)
        return n && (c.layersWithOutsidePointerEventsDisabled.size === 0 && (vn = m.body.style.pointerEvents, m.body.style.pointerEvents = "none"), c.layersWithOutsidePointerEventsDisabled.add(l)), c.layers.add(l), bn(), () => {
          n && c.layersWithOutsidePointerEventsDisabled.size === 1 && (m.body.style.pointerEvents = vn);
        };
    }, [l, m, n, c]), d.useEffect(() => () => {
      l && (c.layers.delete(l), c.layersWithOutsidePointerEventsDisabled.delete(l), bn());
    }, [l, c]), d.useEffect(() => {
      const S = () => h({});
      return document.addEventListener(kt, S), () => document.removeEventListener(kt, S);
    }, []), /* @__PURE__ */ v(
      V.div,
      {
        ...u,
        ref: y,
        style: {
          pointerEvents: x ? C ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: G(e.onFocusCapture, A.onFocusCapture),
        onBlurCapture: G(e.onBlurCapture, A.onBlurCapture),
        onPointerDownCapture: G(
          e.onPointerDownCapture,
          R.onPointerDownCapture
        )
      }
    );
  }
);
Zn.displayName = Gs;
var Hs = "DismissableLayerBranch", Ks = d.forwardRef((e, t) => {
  const n = d.useContext(qn), r = d.useRef(null), o = j(t, r);
  return d.useEffect(() => {
    const s = r.current;
    if (s)
      return n.branches.add(s), () => {
        n.branches.delete(s);
      };
  }, [n.branches]), /* @__PURE__ */ v(V.div, { ...e, ref: o });
});
Ks.displayName = Hs;
function Ys(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = ve(e), r = d.useRef(!1), o = d.useRef(() => {
  });
  return d.useEffect(() => {
    const s = (a) => {
      if (a.target && !r.current) {
        let u = function() {
          Qn(
            Us,
            n,
            c,
            { discrete: !0 }
          );
        };
        const c = { originalEvent: a };
        a.pointerType === "touch" ? (t.removeEventListener("click", o.current), o.current = u, t.addEventListener("click", o.current, { once: !0 })) : u();
      } else
        t.removeEventListener("click", o.current);
      r.current = !1;
    }, i = window.setTimeout(() => {
      t.addEventListener("pointerdown", s);
    }, 0);
    return () => {
      window.clearTimeout(i), t.removeEventListener("pointerdown", s), t.removeEventListener("click", o.current);
    };
  }, [t, n]), {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => r.current = !0
  };
}
function Xs(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = ve(e), r = d.useRef(!1);
  return d.useEffect(() => {
    const o = (s) => {
      s.target && !r.current && Qn(js, n, { originalEvent: s }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o);
  }, [t, n]), {
    onFocusCapture: () => r.current = !0,
    onBlurCapture: () => r.current = !1
  };
}
function bn() {
  const e = new CustomEvent(kt);
  document.dispatchEvent(e);
}
function Qn(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target, s = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && o.addEventListener(e, t, { once: !0 }), r ? zs(o, s) : o.dispatchEvent(s);
}
var vt = 0;
function qs() {
  d.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? yn()), document.body.insertAdjacentElement("beforeend", e[1] ?? yn()), vt++, () => {
      vt === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), vt--;
    };
  }, []);
}
function yn() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var bt = "focusScope.autoFocusOnMount", yt = "focusScope.autoFocusOnUnmount", wn = { bubbles: !1, cancelable: !0 }, Zs = "FocusScope", Jn = d.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: r = !1,
    onMountAutoFocus: o,
    onUnmountAutoFocus: s,
    ...i
  } = e, [a, u] = d.useState(null), c = ve(o), l = ve(s), f = d.useRef(null), m = j(t, (p) => u(p)), h = d.useRef({
    paused: !1,
    pause() {
      this.paused = !0;
    },
    resume() {
      this.paused = !1;
    }
  }).current;
  d.useEffect(() => {
    if (r) {
      let p = function(x) {
        if (h.paused || !a) return;
        const C = x.target;
        a.contains(C) ? f.current = C : fe(f.current, { select: !0 });
      }, g = function(x) {
        if (h.paused || !a) return;
        const C = x.relatedTarget;
        C !== null && (a.contains(C) || fe(f.current, { select: !0 }));
      }, b = function(x) {
        if (document.activeElement === document.body)
          for (const R of x)
            R.removedNodes.length > 0 && fe(a);
      };
      document.addEventListener("focusin", p), document.addEventListener("focusout", g);
      const w = new MutationObserver(b);
      return a && w.observe(a, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", p), document.removeEventListener("focusout", g), w.disconnect();
      };
    }
  }, [r, a, h.paused]), d.useEffect(() => {
    if (a) {
      Cn.add(h);
      const p = document.activeElement;
      if (!a.contains(p)) {
        const b = new CustomEvent(bt, wn);
        a.addEventListener(bt, c), a.dispatchEvent(b), b.defaultPrevented || (Qs(ri(er(a)), { select: !0 }), document.activeElement === p && fe(a));
      }
      return () => {
        a.removeEventListener(bt, c), setTimeout(() => {
          const b = new CustomEvent(yt, wn);
          a.addEventListener(yt, l), a.dispatchEvent(b), b.defaultPrevented || fe(p ?? document.body, { select: !0 }), a.removeEventListener(yt, l), Cn.remove(h);
        }, 0);
      };
    }
  }, [a, c, l, h]);
  const y = d.useCallback(
    (p) => {
      if (!n && !r || h.paused) return;
      const g = p.key === "Tab" && !p.altKey && !p.ctrlKey && !p.metaKey, b = document.activeElement;
      if (g && b) {
        const w = p.currentTarget, [x, C] = Js(w);
        x && C ? !p.shiftKey && b === C ? (p.preventDefault(), n && fe(x, { select: !0 })) : p.shiftKey && b === x && (p.preventDefault(), n && fe(C, { select: !0 })) : b === w && p.preventDefault();
      }
    },
    [n, r, h.paused]
  );
  return /* @__PURE__ */ v(V.div, { tabIndex: -1, ...i, ref: m, onKeyDown: y });
});
Jn.displayName = Zs;
function Qs(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if (fe(r, { select: t }), document.activeElement !== n) return;
}
function Js(e) {
  const t = er(e), n = xn(t, e), r = xn(t.reverse(), e);
  return [n, r];
}
function er(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function xn(e, t) {
  for (const n of e)
    if (!ei(n, { upTo: t })) return n;
}
function ei(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function ti(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function fe(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && ti(e) && t && e.select();
  }
}
var Cn = ni();
function ni() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && (n == null || n.pause()), e = Rn(e, t), e.unshift(t);
    },
    remove(t) {
      var n;
      e = Rn(e, t), (n = e[0]) == null || n.resume();
    }
  };
}
function Rn(e, t) {
  const n = [...e], r = n.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
function ri(e) {
  return e.filter((t) => t.tagName !== "A");
}
var ie = globalThis != null && globalThis.document ? d.useLayoutEffect : () => {
}, oi = d[" useId ".trim().toString()] || (() => {
}), si = 0;
function ot(e) {
  const [t, n] = d.useState(oi());
  return ie(() => {
    n((r) => r ?? String(si++));
  }, [e]), t ? `radix-${t}` : "";
}
const ii = ["top", "right", "bottom", "left"], pe = Math.min, Y = Math.max, Qe = Math.round, Ve = Math.floor, ne = (e) => ({
  x: e,
  y: e
}), ai = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, ci = {
  start: "end",
  end: "start"
};
function Ot(e, t, n) {
  return Y(e, pe(t, n));
}
function ae(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function ce(e) {
  return e.split("-")[0];
}
function Oe(e) {
  return e.split("-")[1];
}
function $t(e) {
  return e === "x" ? "y" : "x";
}
function Wt(e) {
  return e === "y" ? "height" : "width";
}
const li = /* @__PURE__ */ new Set(["top", "bottom"]);
function te(e) {
  return li.has(ce(e)) ? "y" : "x";
}
function Bt(e) {
  return $t(te(e));
}
function ui(e, t, n) {
  n === void 0 && (n = !1);
  const r = Oe(e), o = Bt(e), s = Wt(o);
  let i = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[s] > t.floating[s] && (i = Je(i)), [i, Je(i)];
}
function di(e) {
  const t = Je(e);
  return [It(e), t, It(t)];
}
function It(e) {
  return e.replace(/start|end/g, (t) => ci[t]);
}
const Sn = ["left", "right"], An = ["right", "left"], fi = ["top", "bottom"], pi = ["bottom", "top"];
function mi(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? An : Sn : t ? Sn : An;
    case "left":
    case "right":
      return t ? fi : pi;
    default:
      return [];
  }
}
function hi(e, t, n, r) {
  const o = Oe(e);
  let s = mi(ce(e), n === "start", r);
  return o && (s = s.map((i) => i + "-" + o), t && (s = s.concat(s.map(It)))), s;
}
function Je(e) {
  return e.replace(/left|right|bottom|top/g, (t) => ai[t]);
}
function gi(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function tr(e) {
  return typeof e != "number" ? gi(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function et(e) {
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
function En(e, t, n) {
  let {
    reference: r,
    floating: o
  } = e;
  const s = te(t), i = Bt(t), a = Wt(i), u = ce(t), c = s === "y", l = r.x + r.width / 2 - o.width / 2, f = r.y + r.height / 2 - o.height / 2, m = r[a] / 2 - o[a] / 2;
  let h;
  switch (u) {
    case "top":
      h = {
        x: l,
        y: r.y - o.height
      };
      break;
    case "bottom":
      h = {
        x: l,
        y: r.y + r.height
      };
      break;
    case "right":
      h = {
        x: r.x + r.width,
        y: f
      };
      break;
    case "left":
      h = {
        x: r.x - o.width,
        y: f
      };
      break;
    default:
      h = {
        x: r.x,
        y: r.y
      };
  }
  switch (Oe(t)) {
    case "start":
      h[i] -= m * (n && c ? -1 : 1);
      break;
    case "end":
      h[i] += m * (n && c ? -1 : 1);
      break;
  }
  return h;
}
const vi = async (e, t, n) => {
  const {
    placement: r = "bottom",
    strategy: o = "absolute",
    middleware: s = [],
    platform: i
  } = n, a = s.filter(Boolean), u = await (i.isRTL == null ? void 0 : i.isRTL(t));
  let c = await i.getElementRects({
    reference: e,
    floating: t,
    strategy: o
  }), {
    x: l,
    y: f
  } = En(c, r, u), m = r, h = {}, y = 0;
  for (let p = 0; p < a.length; p++) {
    const {
      name: g,
      fn: b
    } = a[p], {
      x: w,
      y: x,
      data: C,
      reset: R
    } = await b({
      x: l,
      y: f,
      initialPlacement: r,
      placement: m,
      strategy: o,
      middlewareData: h,
      rects: c,
      platform: i,
      elements: {
        reference: e,
        floating: t
      }
    });
    l = w ?? l, f = x ?? f, h = {
      ...h,
      [g]: {
        ...h[g],
        ...C
      }
    }, R && y <= 50 && (y++, typeof R == "object" && (R.placement && (m = R.placement), R.rects && (c = R.rects === !0 ? await i.getElementRects({
      reference: e,
      floating: t,
      strategy: o
    }) : R.rects), {
      x: l,
      y: f
    } = En(c, m, u)), p = -1);
  }
  return {
    x: l,
    y: f,
    placement: m,
    strategy: o,
    middlewareData: h
  };
};
async function Le(e, t) {
  var n;
  t === void 0 && (t = {});
  const {
    x: r,
    y: o,
    platform: s,
    rects: i,
    elements: a,
    strategy: u
  } = e, {
    boundary: c = "clippingAncestors",
    rootBoundary: l = "viewport",
    elementContext: f = "floating",
    altBoundary: m = !1,
    padding: h = 0
  } = ae(t, e), y = tr(h), g = a[m ? f === "floating" ? "reference" : "floating" : f], b = et(await s.getClippingRect({
    element: (n = await (s.isElement == null ? void 0 : s.isElement(g))) == null || n ? g : g.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(a.floating)),
    boundary: c,
    rootBoundary: l,
    strategy: u
  })), w = f === "floating" ? {
    x: r,
    y: o,
    width: i.floating.width,
    height: i.floating.height
  } : i.reference, x = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(a.floating)), C = await (s.isElement == null ? void 0 : s.isElement(x)) ? await (s.getScale == null ? void 0 : s.getScale(x)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, R = et(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: a,
    rect: w,
    offsetParent: x,
    strategy: u
  }) : w);
  return {
    top: (b.top - R.top + y.top) / C.y,
    bottom: (R.bottom - b.bottom + y.bottom) / C.y,
    left: (b.left - R.left + y.left) / C.x,
    right: (R.right - b.right + y.right) / C.x
  };
}
const bi = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      x: n,
      y: r,
      placement: o,
      rects: s,
      platform: i,
      elements: a,
      middlewareData: u
    } = t, {
      element: c,
      padding: l = 0
    } = ae(e, t) || {};
    if (c == null)
      return {};
    const f = tr(l), m = {
      x: n,
      y: r
    }, h = Bt(o), y = Wt(h), p = await i.getDimensions(c), g = h === "y", b = g ? "top" : "left", w = g ? "bottom" : "right", x = g ? "clientHeight" : "clientWidth", C = s.reference[y] + s.reference[h] - m[h] - s.floating[y], R = m[h] - s.reference[h], A = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(c));
    let S = A ? A[x] : 0;
    (!S || !await (i.isElement == null ? void 0 : i.isElement(A))) && (S = a.floating[x] || s.floating[y]);
    const P = C / 2 - R / 2, _ = S / 2 - p[y] / 2 - 1, M = pe(f[b], _), $ = pe(f[w], _), N = M, D = S - p[y] - $, E = S / 2 - p[y] / 2 + P, F = Ot(N, E, D), T = !u.arrow && Oe(o) != null && E !== F && s.reference[y] / 2 - (E < N ? M : $) - p[y] / 2 < 0, B = T ? E < N ? E - N : E - D : 0;
    return {
      [h]: m[h] + B,
      data: {
        [h]: F,
        centerOffset: E - F - B,
        ...T && {
          alignmentOffset: B
        }
      },
      reset: T
    };
  }
}), yi = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var n, r;
      const {
        placement: o,
        middlewareData: s,
        rects: i,
        initialPlacement: a,
        platform: u,
        elements: c
      } = t, {
        mainAxis: l = !0,
        crossAxis: f = !0,
        fallbackPlacements: m,
        fallbackStrategy: h = "bestFit",
        fallbackAxisSideDirection: y = "none",
        flipAlignment: p = !0,
        ...g
      } = ae(e, t);
      if ((n = s.arrow) != null && n.alignmentOffset)
        return {};
      const b = ce(o), w = te(a), x = ce(a) === a, C = await (u.isRTL == null ? void 0 : u.isRTL(c.floating)), R = m || (x || !p ? [Je(a)] : di(a)), A = y !== "none";
      !m && A && R.push(...hi(a, p, y, C));
      const S = [a, ...R], P = await Le(t, g), _ = [];
      let M = ((r = s.flip) == null ? void 0 : r.overflows) || [];
      if (l && _.push(P[b]), f) {
        const E = ui(o, i, C);
        _.push(P[E[0]], P[E[1]]);
      }
      if (M = [...M, {
        placement: o,
        overflows: _
      }], !_.every((E) => E <= 0)) {
        var $, N;
        const E = ((($ = s.flip) == null ? void 0 : $.index) || 0) + 1, F = S[E];
        if (F && (!(f === "alignment" ? w !== te(F) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        M.every((I) => te(I.placement) === w ? I.overflows[0] > 0 : !0)))
          return {
            data: {
              index: E,
              overflows: M
            },
            reset: {
              placement: F
            }
          };
        let T = (N = M.filter((B) => B.overflows[0] <= 0).sort((B, I) => B.overflows[1] - I.overflows[1])[0]) == null ? void 0 : N.placement;
        if (!T)
          switch (h) {
            case "bestFit": {
              var D;
              const B = (D = M.filter((I) => {
                if (A) {
                  const z = te(I.placement);
                  return z === w || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  z === "y";
                }
                return !0;
              }).map((I) => [I.placement, I.overflows.filter((z) => z > 0).reduce((z, K) => z + K, 0)]).sort((I, z) => I[1] - z[1])[0]) == null ? void 0 : D[0];
              B && (T = B);
              break;
            }
            case "initialPlacement":
              T = a;
              break;
          }
        if (o !== T)
          return {
            reset: {
              placement: T
            }
          };
      }
      return {};
    }
  };
};
function Pn(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function Nn(e) {
  return ii.some((t) => e[t] >= 0);
}
const wi = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n
      } = t, {
        strategy: r = "referenceHidden",
        ...o
      } = ae(e, t);
      switch (r) {
        case "referenceHidden": {
          const s = await Le(t, {
            ...o,
            elementContext: "reference"
          }), i = Pn(s, n.reference);
          return {
            data: {
              referenceHiddenOffsets: i,
              referenceHidden: Nn(i)
            }
          };
        }
        case "escaped": {
          const s = await Le(t, {
            ...o,
            altBoundary: !0
          }), i = Pn(s, n.floating);
          return {
            data: {
              escapedOffsets: i,
              escaped: Nn(i)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, nr = /* @__PURE__ */ new Set(["left", "top"]);
async function xi(e, t) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = e, s = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), i = ce(n), a = Oe(n), u = te(n) === "y", c = nr.has(i) ? -1 : 1, l = s && u ? -1 : 1, f = ae(t, e);
  let {
    mainAxis: m,
    crossAxis: h,
    alignmentAxis: y
  } = typeof f == "number" ? {
    mainAxis: f,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: f.mainAxis || 0,
    crossAxis: f.crossAxis || 0,
    alignmentAxis: f.alignmentAxis
  };
  return a && typeof y == "number" && (h = a === "end" ? y * -1 : y), u ? {
    x: h * l,
    y: m * c
  } : {
    x: m * c,
    y: h * l
  };
}
const Ci = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var n, r;
      const {
        x: o,
        y: s,
        placement: i,
        middlewareData: a
      } = t, u = await xi(t, e);
      return i === ((n = a.offset) == null ? void 0 : n.placement) && (r = a.arrow) != null && r.alignmentOffset ? {} : {
        x: o + u.x,
        y: s + u.y,
        data: {
          ...u,
          placement: i
        }
      };
    }
  };
}, Ri = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const {
        x: n,
        y: r,
        placement: o
      } = t, {
        mainAxis: s = !0,
        crossAxis: i = !1,
        limiter: a = {
          fn: (g) => {
            let {
              x: b,
              y: w
            } = g;
            return {
              x: b,
              y: w
            };
          }
        },
        ...u
      } = ae(e, t), c = {
        x: n,
        y: r
      }, l = await Le(t, u), f = te(ce(o)), m = $t(f);
      let h = c[m], y = c[f];
      if (s) {
        const g = m === "y" ? "top" : "left", b = m === "y" ? "bottom" : "right", w = h + l[g], x = h - l[b];
        h = Ot(w, h, x);
      }
      if (i) {
        const g = f === "y" ? "top" : "left", b = f === "y" ? "bottom" : "right", w = y + l[g], x = y - l[b];
        y = Ot(w, y, x);
      }
      const p = a.fn({
        ...t,
        [m]: h,
        [f]: y
      });
      return {
        ...p,
        data: {
          x: p.x - n,
          y: p.y - r,
          enabled: {
            [m]: s,
            [f]: i
          }
        }
      };
    }
  };
}, Si = function(e) {
  return e === void 0 && (e = {}), {
    options: e,
    fn(t) {
      const {
        x: n,
        y: r,
        placement: o,
        rects: s,
        middlewareData: i
      } = t, {
        offset: a = 0,
        mainAxis: u = !0,
        crossAxis: c = !0
      } = ae(e, t), l = {
        x: n,
        y: r
      }, f = te(o), m = $t(f);
      let h = l[m], y = l[f];
      const p = ae(a, t), g = typeof p == "number" ? {
        mainAxis: p,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...p
      };
      if (u) {
        const x = m === "y" ? "height" : "width", C = s.reference[m] - s.floating[x] + g.mainAxis, R = s.reference[m] + s.reference[x] - g.mainAxis;
        h < C ? h = C : h > R && (h = R);
      }
      if (c) {
        var b, w;
        const x = m === "y" ? "width" : "height", C = nr.has(ce(o)), R = s.reference[f] - s.floating[x] + (C && ((b = i.offset) == null ? void 0 : b[f]) || 0) + (C ? 0 : g.crossAxis), A = s.reference[f] + s.reference[x] + (C ? 0 : ((w = i.offset) == null ? void 0 : w[f]) || 0) - (C ? g.crossAxis : 0);
        y < R ? y = R : y > A && (y = A);
      }
      return {
        [m]: h,
        [f]: y
      };
    }
  };
}, Ai = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(t) {
      var n, r;
      const {
        placement: o,
        rects: s,
        platform: i,
        elements: a
      } = t, {
        apply: u = () => {
        },
        ...c
      } = ae(e, t), l = await Le(t, c), f = ce(o), m = Oe(o), h = te(o) === "y", {
        width: y,
        height: p
      } = s.floating;
      let g, b;
      f === "top" || f === "bottom" ? (g = f, b = m === (await (i.isRTL == null ? void 0 : i.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (b = f, g = m === "end" ? "top" : "bottom");
      const w = p - l.top - l.bottom, x = y - l.left - l.right, C = pe(p - l[g], w), R = pe(y - l[b], x), A = !t.middlewareData.shift;
      let S = C, P = R;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (P = x), (r = t.middlewareData.shift) != null && r.enabled.y && (S = w), A && !m) {
        const M = Y(l.left, 0), $ = Y(l.right, 0), N = Y(l.top, 0), D = Y(l.bottom, 0);
        h ? P = y - 2 * (M !== 0 || $ !== 0 ? M + $ : Y(l.left, l.right)) : S = p - 2 * (N !== 0 || D !== 0 ? N + D : Y(l.top, l.bottom));
      }
      await u({
        ...t,
        availableWidth: P,
        availableHeight: S
      });
      const _ = await i.getDimensions(a.floating);
      return y !== _.width || p !== _.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function st() {
  return typeof window < "u";
}
function Ie(e) {
  return rr(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function X(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function oe(e) {
  var t;
  return (t = (rr(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function rr(e) {
  return st() ? e instanceof Node || e instanceof X(e).Node : !1;
}
function q(e) {
  return st() ? e instanceof Element || e instanceof X(e).Element : !1;
}
function re(e) {
  return st() ? e instanceof HTMLElement || e instanceof X(e).HTMLElement : !1;
}
function kn(e) {
  return !st() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof X(e).ShadowRoot;
}
const Ei = /* @__PURE__ */ new Set(["inline", "contents"]);
function Fe(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: o
  } = Z(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !Ei.has(o);
}
const Pi = /* @__PURE__ */ new Set(["table", "td", "th"]);
function Ni(e) {
  return Pi.has(Ie(e));
}
const ki = [":popover-open", ":modal"];
function it(e) {
  return ki.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const Oi = ["transform", "translate", "scale", "rotate", "perspective"], Ii = ["transform", "translate", "scale", "rotate", "perspective", "filter"], Mi = ["paint", "layout", "strict", "content"];
function zt(e) {
  const t = Vt(), n = q(e) ? Z(e) : e;
  return Oi.some((r) => n[r] ? n[r] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || Ii.some((r) => (n.willChange || "").includes(r)) || Mi.some((r) => (n.contain || "").includes(r));
}
function Ti(e) {
  let t = me(e);
  for (; re(t) && !Pe(t); ) {
    if (zt(t))
      return t;
    if (it(t))
      return null;
    t = me(t);
  }
  return null;
}
function Vt() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const _i = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function Pe(e) {
  return _i.has(Ie(e));
}
function Z(e) {
  return X(e).getComputedStyle(e);
}
function at(e) {
  return q(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function me(e) {
  if (Ie(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    kn(e) && e.host || // Fallback.
    oe(e)
  );
  return kn(t) ? t.host : t;
}
function or(e) {
  const t = me(e);
  return Pe(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : re(t) && Fe(t) ? t : or(t);
}
function De(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = or(e), s = o === ((r = e.ownerDocument) == null ? void 0 : r.body), i = X(o);
  if (s) {
    const a = Mt(i);
    return t.concat(i, i.visualViewport || [], Fe(o) ? o : [], a && n ? De(a) : []);
  }
  return t.concat(o, De(o, [], n));
}
function Mt(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function sr(e) {
  const t = Z(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const o = re(e), s = o ? e.offsetWidth : n, i = o ? e.offsetHeight : r, a = Qe(n) !== s || Qe(r) !== i;
  return a && (n = s, r = i), {
    width: n,
    height: r,
    $: a
  };
}
function Gt(e) {
  return q(e) ? e : e.contextElement;
}
function Ae(e) {
  const t = Gt(e);
  if (!re(t))
    return ne(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: o,
    $: s
  } = sr(t);
  let i = (s ? Qe(n.width) : n.width) / r, a = (s ? Qe(n.height) : n.height) / o;
  return (!i || !Number.isFinite(i)) && (i = 1), (!a || !Number.isFinite(a)) && (a = 1), {
    x: i,
    y: a
  };
}
const Li = /* @__PURE__ */ ne(0);
function ir(e) {
  const t = X(e);
  return !Vt() || !t.visualViewport ? Li : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function Di(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== X(e) ? !1 : t;
}
function be(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), s = Gt(e);
  let i = ne(1);
  t && (r ? q(r) && (i = Ae(r)) : i = Ae(e));
  const a = Di(s, n, r) ? ir(s) : ne(0);
  let u = (o.left + a.x) / i.x, c = (o.top + a.y) / i.y, l = o.width / i.x, f = o.height / i.y;
  if (s) {
    const m = X(s), h = r && q(r) ? X(r) : r;
    let y = m, p = Mt(y);
    for (; p && r && h !== y; ) {
      const g = Ae(p), b = p.getBoundingClientRect(), w = Z(p), x = b.left + (p.clientLeft + parseFloat(w.paddingLeft)) * g.x, C = b.top + (p.clientTop + parseFloat(w.paddingTop)) * g.y;
      u *= g.x, c *= g.y, l *= g.x, f *= g.y, u += x, c += C, y = X(p), p = Mt(y);
    }
  }
  return et({
    width: l,
    height: f,
    x: u,
    y: c
  });
}
function ct(e, t) {
  const n = at(e).scrollLeft;
  return t ? t.left + n : be(oe(e)).left + n;
}
function ar(e, t) {
  const n = e.getBoundingClientRect(), r = n.left + t.scrollLeft - ct(e, n), o = n.top + t.scrollTop;
  return {
    x: r,
    y: o
  };
}
function Fi(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: r,
    strategy: o
  } = e;
  const s = o === "fixed", i = oe(r), a = t ? it(t.floating) : !1;
  if (r === i || a && s)
    return n;
  let u = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = ne(1);
  const l = ne(0), f = re(r);
  if ((f || !f && !s) && ((Ie(r) !== "body" || Fe(i)) && (u = at(r)), re(r))) {
    const h = be(r);
    c = Ae(r), l.x = h.x + r.clientLeft, l.y = h.y + r.clientTop;
  }
  const m = i && !f && !s ? ar(i, u) : ne(0);
  return {
    width: n.width * c.x,
    height: n.height * c.y,
    x: n.x * c.x - u.scrollLeft * c.x + l.x + m.x,
    y: n.y * c.y - u.scrollTop * c.y + l.y + m.y
  };
}
function $i(e) {
  return Array.from(e.getClientRects());
}
function Wi(e) {
  const t = oe(e), n = at(e), r = e.ownerDocument.body, o = Y(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), s = Y(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let i = -n.scrollLeft + ct(e);
  const a = -n.scrollTop;
  return Z(r).direction === "rtl" && (i += Y(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: s,
    x: i,
    y: a
  };
}
const On = 25;
function Bi(e, t) {
  const n = X(e), r = oe(e), o = n.visualViewport;
  let s = r.clientWidth, i = r.clientHeight, a = 0, u = 0;
  if (o) {
    s = o.width, i = o.height;
    const l = Vt();
    (!l || l && t === "fixed") && (a = o.offsetLeft, u = o.offsetTop);
  }
  const c = ct(r);
  if (c <= 0) {
    const l = r.ownerDocument, f = l.body, m = getComputedStyle(f), h = l.compatMode === "CSS1Compat" && parseFloat(m.marginLeft) + parseFloat(m.marginRight) || 0, y = Math.abs(r.clientWidth - f.clientWidth - h);
    y <= On && (s -= y);
  } else c <= On && (s += c);
  return {
    width: s,
    height: i,
    x: a,
    y: u
  };
}
const zi = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function Vi(e, t) {
  const n = be(e, !0, t === "fixed"), r = n.top + e.clientTop, o = n.left + e.clientLeft, s = re(e) ? Ae(e) : ne(1), i = e.clientWidth * s.x, a = e.clientHeight * s.y, u = o * s.x, c = r * s.y;
  return {
    width: i,
    height: a,
    x: u,
    y: c
  };
}
function In(e, t, n) {
  let r;
  if (t === "viewport")
    r = Bi(e, n);
  else if (t === "document")
    r = Wi(oe(e));
  else if (q(t))
    r = Vi(t, n);
  else {
    const o = ir(e);
    r = {
      x: t.x - o.x,
      y: t.y - o.y,
      width: t.width,
      height: t.height
    };
  }
  return et(r);
}
function cr(e, t) {
  const n = me(e);
  return n === t || !q(n) || Pe(n) ? !1 : Z(n).position === "fixed" || cr(n, t);
}
function Gi(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = De(e, [], !1).filter((a) => q(a) && Ie(a) !== "body"), o = null;
  const s = Z(e).position === "fixed";
  let i = s ? me(e) : e;
  for (; q(i) && !Pe(i); ) {
    const a = Z(i), u = zt(i);
    !u && a.position === "fixed" && (o = null), (s ? !u && !o : !u && a.position === "static" && !!o && zi.has(o.position) || Fe(i) && !u && cr(e, i)) ? r = r.filter((l) => l !== i) : o = a, i = me(i);
  }
  return t.set(e, r), r;
}
function Ui(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = e;
  const i = [...n === "clippingAncestors" ? it(t) ? [] : Gi(t, this._c) : [].concat(n), r], a = i[0], u = i.reduce((c, l) => {
    const f = In(t, l, o);
    return c.top = Y(f.top, c.top), c.right = pe(f.right, c.right), c.bottom = pe(f.bottom, c.bottom), c.left = Y(f.left, c.left), c;
  }, In(t, a, o));
  return {
    width: u.right - u.left,
    height: u.bottom - u.top,
    x: u.left,
    y: u.top
  };
}
function ji(e) {
  const {
    width: t,
    height: n
  } = sr(e);
  return {
    width: t,
    height: n
  };
}
function Hi(e, t, n) {
  const r = re(t), o = oe(t), s = n === "fixed", i = be(e, !0, s, t);
  let a = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const u = ne(0);
  function c() {
    u.x = ct(o);
  }
  if (r || !r && !s)
    if ((Ie(t) !== "body" || Fe(o)) && (a = at(t)), r) {
      const h = be(t, !0, s, t);
      u.x = h.x + t.clientLeft, u.y = h.y + t.clientTop;
    } else o && c();
  s && !r && o && c();
  const l = o && !r && !s ? ar(o, a) : ne(0), f = i.left + a.scrollLeft - u.x - l.x, m = i.top + a.scrollTop - u.y - l.y;
  return {
    x: f,
    y: m,
    width: i.width,
    height: i.height
  };
}
function wt(e) {
  return Z(e).position === "static";
}
function Mn(e, t) {
  if (!re(e) || Z(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return oe(e) === n && (n = n.ownerDocument.body), n;
}
function lr(e, t) {
  const n = X(e);
  if (it(e))
    return n;
  if (!re(e)) {
    let o = me(e);
    for (; o && !Pe(o); ) {
      if (q(o) && !wt(o))
        return o;
      o = me(o);
    }
    return n;
  }
  let r = Mn(e, t);
  for (; r && Ni(r) && wt(r); )
    r = Mn(r, t);
  return r && Pe(r) && wt(r) && !zt(r) ? n : r || Ti(e) || n;
}
const Ki = async function(e) {
  const t = this.getOffsetParent || lr, n = this.getDimensions, r = await n(e.floating);
  return {
    reference: Hi(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function Yi(e) {
  return Z(e).direction === "rtl";
}
const Xi = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Fi,
  getDocumentElement: oe,
  getClippingRect: Ui,
  getOffsetParent: lr,
  getElementRects: Ki,
  getClientRects: $i,
  getDimensions: ji,
  getScale: Ae,
  isElement: q,
  isRTL: Yi
};
function ur(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function qi(e, t) {
  let n = null, r;
  const o = oe(e);
  function s() {
    var a;
    clearTimeout(r), (a = n) == null || a.disconnect(), n = null;
  }
  function i(a, u) {
    a === void 0 && (a = !1), u === void 0 && (u = 1), s();
    const c = e.getBoundingClientRect(), {
      left: l,
      top: f,
      width: m,
      height: h
    } = c;
    if (a || t(), !m || !h)
      return;
    const y = Ve(f), p = Ve(o.clientWidth - (l + m)), g = Ve(o.clientHeight - (f + h)), b = Ve(l), x = {
      rootMargin: -y + "px " + -p + "px " + -g + "px " + -b + "px",
      threshold: Y(0, pe(1, u)) || 1
    };
    let C = !0;
    function R(A) {
      const S = A[0].intersectionRatio;
      if (S !== u) {
        if (!C)
          return i();
        S ? i(!1, S) : r = setTimeout(() => {
          i(!1, 1e-7);
        }, 1e3);
      }
      S === 1 && !ur(c, e.getBoundingClientRect()) && i(), C = !1;
    }
    try {
      n = new IntersectionObserver(R, {
        ...x,
        // Handle <iframe>s
        root: o.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(R, x);
    }
    n.observe(e);
  }
  return i(!0), s;
}
function Zi(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: s = !0,
    elementResize: i = typeof ResizeObserver == "function",
    layoutShift: a = typeof IntersectionObserver == "function",
    animationFrame: u = !1
  } = r, c = Gt(e), l = o || s ? [...c ? De(c) : [], ...De(t)] : [];
  l.forEach((b) => {
    o && b.addEventListener("scroll", n, {
      passive: !0
    }), s && b.addEventListener("resize", n);
  });
  const f = c && a ? qi(c, n) : null;
  let m = -1, h = null;
  i && (h = new ResizeObserver((b) => {
    let [w] = b;
    w && w.target === c && h && (h.unobserve(t), cancelAnimationFrame(m), m = requestAnimationFrame(() => {
      var x;
      (x = h) == null || x.observe(t);
    })), n();
  }), c && !u && h.observe(c), h.observe(t));
  let y, p = u ? be(e) : null;
  u && g();
  function g() {
    const b = be(e);
    p && !ur(p, b) && n(), p = b, y = requestAnimationFrame(g);
  }
  return n(), () => {
    var b;
    l.forEach((w) => {
      o && w.removeEventListener("scroll", n), s && w.removeEventListener("resize", n);
    }), f == null || f(), (b = h) == null || b.disconnect(), h = null, u && cancelAnimationFrame(y);
  };
}
const Qi = Ci, Ji = Ri, ea = yi, ta = Ai, na = wi, Tn = bi, ra = Si, oa = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: Xi,
    ...n
  }, s = {
    ...o.platform,
    _c: r
  };
  return vi(e, t, {
    ...o,
    platform: s
  });
};
var sa = typeof document < "u", ia = function() {
}, Ye = sa ? Ho : ia;
function tt(e, t) {
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
        if (!tt(e[r], t[r]))
          return !1;
      return !0;
    }
    if (o = Object.keys(e), n = o.length, n !== Object.keys(t).length)
      return !1;
    for (r = n; r-- !== 0; )
      if (!{}.hasOwnProperty.call(t, o[r]))
        return !1;
    for (r = n; r-- !== 0; ) {
      const s = o[r];
      if (!(s === "_owner" && e.$$typeof) && !tt(e[s], t[s]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function dr(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function _n(e, t) {
  const n = dr(e);
  return Math.round(t * n) / n;
}
function xt(e) {
  const t = d.useRef(e);
  return Ye(() => {
    t.current = e;
  }), t;
}
function aa(e) {
  e === void 0 && (e = {});
  const {
    placement: t = "bottom",
    strategy: n = "absolute",
    middleware: r = [],
    platform: o,
    elements: {
      reference: s,
      floating: i
    } = {},
    transform: a = !0,
    whileElementsMounted: u,
    open: c
  } = e, [l, f] = d.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [m, h] = d.useState(r);
  tt(m, r) || h(r);
  const [y, p] = d.useState(null), [g, b] = d.useState(null), w = d.useCallback((I) => {
    I !== A.current && (A.current = I, p(I));
  }, []), x = d.useCallback((I) => {
    I !== S.current && (S.current = I, b(I));
  }, []), C = s || y, R = i || g, A = d.useRef(null), S = d.useRef(null), P = d.useRef(l), _ = u != null, M = xt(u), $ = xt(o), N = xt(c), D = d.useCallback(() => {
    if (!A.current || !S.current)
      return;
    const I = {
      placement: t,
      strategy: n,
      middleware: m
    };
    $.current && (I.platform = $.current), oa(A.current, S.current, I).then((z) => {
      const K = {
        ...z,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: N.current !== !1
      };
      E.current && !tt(P.current, K) && (P.current = K, zn.flushSync(() => {
        f(K);
      }));
    });
  }, [m, t, n, $, N]);
  Ye(() => {
    c === !1 && P.current.isPositioned && (P.current.isPositioned = !1, f((I) => ({
      ...I,
      isPositioned: !1
    })));
  }, [c]);
  const E = d.useRef(!1);
  Ye(() => (E.current = !0, () => {
    E.current = !1;
  }), []), Ye(() => {
    if (C && (A.current = C), R && (S.current = R), C && R) {
      if (M.current)
        return M.current(C, R, D);
      D();
    }
  }, [C, R, D, M, _]);
  const F = d.useMemo(() => ({
    reference: A,
    floating: S,
    setReference: w,
    setFloating: x
  }), [w, x]), T = d.useMemo(() => ({
    reference: C,
    floating: R
  }), [C, R]), B = d.useMemo(() => {
    const I = {
      position: n,
      left: 0,
      top: 0
    };
    if (!T.floating)
      return I;
    const z = _n(T.floating, l.x), K = _n(T.floating, l.y);
    return a ? {
      ...I,
      transform: "translate(" + z + "px, " + K + "px)",
      ...dr(T.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: z,
      top: K
    };
  }, [n, a, T.floating, l.x, l.y]);
  return d.useMemo(() => ({
    ...l,
    update: D,
    refs: F,
    elements: T,
    floatingStyles: B
  }), [l, D, F, T, B]);
}
const ca = (e) => {
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
      return r && t(r) ? r.current != null ? Tn({
        element: r.current,
        padding: o
      }).fn(n) : {} : r ? Tn({
        element: r,
        padding: o
      }).fn(n) : {};
    }
  };
}, la = (e, t) => ({
  ...Qi(e),
  options: [e, t]
}), ua = (e, t) => ({
  ...Ji(e),
  options: [e, t]
}), da = (e, t) => ({
  ...ra(e),
  options: [e, t]
}), fa = (e, t) => ({
  ...ea(e),
  options: [e, t]
}), pa = (e, t) => ({
  ...ta(e),
  options: [e, t]
}), ma = (e, t) => ({
  ...na(e),
  options: [e, t]
}), ha = (e, t) => ({
  ...ca(e),
  options: [e, t]
});
var ga = "Arrow", fr = d.forwardRef((e, t) => {
  const { children: n, width: r = 10, height: o = 5, ...s } = e;
  return /* @__PURE__ */ v(
    V.svg,
    {
      ...s,
      ref: t,
      width: r,
      height: o,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? n : /* @__PURE__ */ v("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
fr.displayName = ga;
var va = fr;
function Ut(e) {
  const [t, n] = d.useState(void 0);
  return ie(() => {
    if (e) {
      n({ width: e.offsetWidth, height: e.offsetHeight });
      const r = new ResizeObserver((o) => {
        if (!Array.isArray(o) || !o.length)
          return;
        const s = o[0];
        let i, a;
        if ("borderBoxSize" in s) {
          const u = s.borderBoxSize, c = Array.isArray(u) ? u[0] : u;
          i = c.inlineSize, a = c.blockSize;
        } else
          i = e.offsetWidth, a = e.offsetHeight;
        n({ width: i, height: a });
      });
      return r.observe(e, { box: "border-box" }), () => r.unobserve(e);
    } else
      n(void 0);
  }, [e]), t;
}
var jt = "Popper", [pr, mr] = le(jt), [ba, hr] = pr(jt), gr = (e) => {
  const { __scopePopper: t, children: n } = e, [r, o] = d.useState(null);
  return /* @__PURE__ */ v(ba, { scope: t, anchor: r, onAnchorChange: o, children: n });
};
gr.displayName = jt;
var vr = "PopperAnchor", br = d.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: r, ...o } = e, s = hr(vr, n), i = d.useRef(null), a = j(t, i), u = d.useRef(null);
    return d.useEffect(() => {
      const c = u.current;
      u.current = (r == null ? void 0 : r.current) || i.current, c !== u.current && s.onAnchorChange(u.current);
    }), r ? null : /* @__PURE__ */ v(V.div, { ...o, ref: a });
  }
);
br.displayName = vr;
var Ht = "PopperContent", [ya, wa] = pr(Ht), yr = d.forwardRef(
  (e, t) => {
    var nn, rn, on, sn, an, cn;
    const {
      __scopePopper: n,
      side: r = "bottom",
      sideOffset: o = 0,
      align: s = "center",
      alignOffset: i = 0,
      arrowPadding: a = 0,
      avoidCollisions: u = !0,
      collisionBoundary: c = [],
      collisionPadding: l = 0,
      sticky: f = "partial",
      hideWhenDetached: m = !1,
      updatePositionStrategy: h = "optimized",
      onPlaced: y,
      ...p
    } = e, g = hr(Ht, n), [b, w] = d.useState(null), x = j(t, (Me) => w(Me)), [C, R] = d.useState(null), A = Ut(C), S = (A == null ? void 0 : A.width) ?? 0, P = (A == null ? void 0 : A.height) ?? 0, _ = r + (s !== "center" ? "-" + s : ""), M = typeof l == "number" ? l : { top: 0, right: 0, bottom: 0, left: 0, ...l }, $ = Array.isArray(c) ? c : [c], N = $.length > 0, D = {
      padding: M,
      boundary: $.filter(Ca),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: N
    }, { refs: E, floatingStyles: F, placement: T, isPositioned: B, middlewareData: I } = aa({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: _,
      whileElementsMounted: (...Me) => Zi(...Me, {
        animationFrame: h === "always"
      }),
      elements: {
        reference: g.anchor
      },
      middleware: [
        la({ mainAxis: o + P, alignmentAxis: i }),
        u && ua({
          mainAxis: !0,
          crossAxis: !1,
          limiter: f === "partial" ? da() : void 0,
          ...D
        }),
        u && fa({ ...D }),
        pa({
          ...D,
          apply: ({ elements: Me, rects: ln, availableWidth: Vo, availableHeight: Go }) => {
            const { width: Uo, height: jo } = ln.reference, ze = Me.floating.style;
            ze.setProperty("--radix-popper-available-width", `${Vo}px`), ze.setProperty("--radix-popper-available-height", `${Go}px`), ze.setProperty("--radix-popper-anchor-width", `${Uo}px`), ze.setProperty("--radix-popper-anchor-height", `${jo}px`);
          }
        }),
        C && ha({ element: C, padding: a }),
        Ra({ arrowWidth: S, arrowHeight: P }),
        m && ma({ strategy: "referenceHidden", ...D })
      ]
    }), [z, K] = Cr(T), H = ve(y);
    ie(() => {
      B && (H == null || H());
    }, [B, H]);
    const Fo = (nn = I.arrow) == null ? void 0 : nn.x, $o = (rn = I.arrow) == null ? void 0 : rn.y, Wo = ((on = I.arrow) == null ? void 0 : on.centerOffset) !== 0, [Bo, zo] = d.useState();
    return ie(() => {
      b && zo(window.getComputedStyle(b).zIndex);
    }, [b]), /* @__PURE__ */ v(
      "div",
      {
        ref: E.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...F,
          transform: B ? F.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: Bo,
          "--radix-popper-transform-origin": [
            (sn = I.transformOrigin) == null ? void 0 : sn.x,
            (an = I.transformOrigin) == null ? void 0 : an.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...((cn = I.hide) == null ? void 0 : cn.referenceHidden) && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: e.dir,
        children: /* @__PURE__ */ v(
          ya,
          {
            scope: n,
            placedSide: z,
            onArrowChange: R,
            arrowX: Fo,
            arrowY: $o,
            shouldHideArrow: Wo,
            children: /* @__PURE__ */ v(
              V.div,
              {
                "data-side": z,
                "data-align": K,
                ...p,
                ref: x,
                style: {
                  ...p.style,
                  // if the PopperContent hasn't been placed yet (not all measurements done)
                  // we prevent animations so that users's animation don't kick in too early referring wrong sides
                  animation: B ? void 0 : "none"
                }
              }
            )
          }
        )
      }
    );
  }
);
yr.displayName = Ht;
var wr = "PopperArrow", xa = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, xr = d.forwardRef(function(t, n) {
  const { __scopePopper: r, ...o } = t, s = wa(wr, r), i = xa[s.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ v(
      "span",
      {
        ref: s.onArrowChange,
        style: {
          position: "absolute",
          left: s.arrowX,
          top: s.arrowY,
          [i]: 0,
          transformOrigin: {
            top: "",
            right: "0 0",
            bottom: "center 0",
            left: "100% 0"
          }[s.placedSide],
          transform: {
            top: "translateY(100%)",
            right: "translateY(50%) rotate(90deg) translateX(-50%)",
            bottom: "rotate(180deg)",
            left: "translateY(50%) rotate(-90deg) translateX(50%)"
          }[s.placedSide],
          visibility: s.shouldHideArrow ? "hidden" : void 0
        },
        children: /* @__PURE__ */ v(
          va,
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
xr.displayName = wr;
function Ca(e) {
  return e !== null;
}
var Ra = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    var g, b, w;
    const { placement: n, rects: r, middlewareData: o } = t, i = ((g = o.arrow) == null ? void 0 : g.centerOffset) !== 0, a = i ? 0 : e.arrowWidth, u = i ? 0 : e.arrowHeight, [c, l] = Cr(n), f = { start: "0%", center: "50%", end: "100%" }[l], m = (((b = o.arrow) == null ? void 0 : b.x) ?? 0) + a / 2, h = (((w = o.arrow) == null ? void 0 : w.y) ?? 0) + u / 2;
    let y = "", p = "";
    return c === "bottom" ? (y = i ? f : `${m}px`, p = `${-u}px`) : c === "top" ? (y = i ? f : `${m}px`, p = `${r.floating.height + u}px`) : c === "right" ? (y = `${-u}px`, p = i ? f : `${h}px`) : c === "left" && (y = `${r.floating.width + u}px`, p = i ? f : `${h}px`), { data: { x: y, y: p } };
  }
});
function Cr(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var Sa = gr, Rr = br, Aa = yr, Ea = xr, Pa = "Portal", Sr = d.forwardRef((e, t) => {
  var a;
  const { container: n, ...r } = e, [o, s] = d.useState(!1);
  ie(() => s(!0), []);
  const i = n || o && ((a = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : a.body);
  return i ? Ko.createPortal(/* @__PURE__ */ v(V.div, { ...r, ref: t }), i) : null;
});
Sr.displayName = Pa;
function Na(e, t) {
  return d.useReducer((n, r) => t[n][r] ?? n, e);
}
var $e = (e) => {
  const { present: t, children: n } = e, r = ka(t), o = typeof n == "function" ? n({ present: r.isPresent }) : d.Children.only(n), s = j(r.ref, Oa(o));
  return typeof n == "function" || r.isPresent ? d.cloneElement(o, { ref: s }) : null;
};
$e.displayName = "Presence";
function ka(e) {
  const [t, n] = d.useState(), r = d.useRef(null), o = d.useRef(e), s = d.useRef("none"), i = e ? "mounted" : "unmounted", [a, u] = Na(i, {
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
  return d.useEffect(() => {
    const c = Ge(r.current);
    s.current = a === "mounted" ? c : "none";
  }, [a]), ie(() => {
    const c = r.current, l = o.current;
    if (l !== e) {
      const m = s.current, h = Ge(c);
      e ? u("MOUNT") : h === "none" || (c == null ? void 0 : c.display) === "none" ? u("UNMOUNT") : u(l && m !== h ? "ANIMATION_OUT" : "UNMOUNT"), o.current = e;
    }
  }, [e, u]), ie(() => {
    if (t) {
      let c;
      const l = t.ownerDocument.defaultView ?? window, f = (h) => {
        const p = Ge(r.current).includes(CSS.escape(h.animationName));
        if (h.target === t && p && (u("ANIMATION_END"), !o.current)) {
          const g = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", c = l.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = g);
          });
        }
      }, m = (h) => {
        h.target === t && (s.current = Ge(r.current));
      };
      return t.addEventListener("animationstart", m), t.addEventListener("animationcancel", f), t.addEventListener("animationend", f), () => {
        l.clearTimeout(c), t.removeEventListener("animationstart", m), t.removeEventListener("animationcancel", f), t.removeEventListener("animationend", f);
      };
    } else
      u("ANIMATION_END");
  }, [t, u]), {
    isPresent: ["mounted", "unmountSuspended"].includes(a),
    ref: d.useCallback((c) => {
      r.current = c ? getComputedStyle(c) : null, n(c);
    }, [])
  };
}
function Ge(e) {
  return (e == null ? void 0 : e.animationName) || "none";
}
function Oa(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var Ia = d[" useInsertionEffect ".trim().toString()] || ie;
function ye({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: r
}) {
  const [o, s, i] = Ma({
    defaultProp: t,
    onChange: n
  }), a = e !== void 0, u = a ? e : o;
  {
    const l = d.useRef(e !== void 0);
    d.useEffect(() => {
      const f = l.current;
      f !== a && console.warn(
        `${r} is changing from ${f ? "controlled" : "uncontrolled"} to ${a ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), l.current = a;
    }, [a, r]);
  }
  const c = d.useCallback(
    (l) => {
      var f;
      if (a) {
        const m = Ta(l) ? l(e) : l;
        m !== e && ((f = i.current) == null || f.call(i, m));
      } else
        s(l);
    },
    [a, e, s, i]
  );
  return [u, c];
}
function Ma({
  defaultProp: e,
  onChange: t
}) {
  const [n, r] = d.useState(e), o = d.useRef(n), s = d.useRef(t);
  return Ia(() => {
    s.current = t;
  }, [t]), d.useEffect(() => {
    var i;
    o.current !== n && ((i = s.current) == null || i.call(s, n), o.current = n);
  }, [n, o]), [n, r, s];
}
function Ta(e) {
  return typeof e == "function";
}
var _a = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, we = /* @__PURE__ */ new WeakMap(), Ue = /* @__PURE__ */ new WeakMap(), je = {}, Ct = 0, Ar = function(e) {
  return e && (e.host || Ar(e.parentNode));
}, La = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var r = Ar(n);
    return r && e.contains(r) ? r : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, Da = function(e, t, n, r) {
  var o = La(t, Array.isArray(e) ? e : [e]);
  je[n] || (je[n] = /* @__PURE__ */ new WeakMap());
  var s = je[n], i = [], a = /* @__PURE__ */ new Set(), u = new Set(o), c = function(f) {
    !f || a.has(f) || (a.add(f), c(f.parentNode));
  };
  o.forEach(c);
  var l = function(f) {
    !f || u.has(f) || Array.prototype.forEach.call(f.children, function(m) {
      if (a.has(m))
        l(m);
      else
        try {
          var h = m.getAttribute(r), y = h !== null && h !== "false", p = (we.get(m) || 0) + 1, g = (s.get(m) || 0) + 1;
          we.set(m, p), s.set(m, g), i.push(m), p === 1 && y && Ue.set(m, !0), g === 1 && m.setAttribute(n, "true"), y || m.setAttribute(r, "true");
        } catch (b) {
          console.error("aria-hidden: cannot operate on ", m, b);
        }
    });
  };
  return l(t), a.clear(), Ct++, function() {
    i.forEach(function(f) {
      var m = we.get(f) - 1, h = s.get(f) - 1;
      we.set(f, m), s.set(f, h), m || (Ue.has(f) || f.removeAttribute(r), Ue.delete(f)), h || f.removeAttribute(n);
    }), Ct--, Ct || (we = /* @__PURE__ */ new WeakMap(), we = /* @__PURE__ */ new WeakMap(), Ue = /* @__PURE__ */ new WeakMap(), je = {});
  };
}, Fa = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var r = Array.from(Array.isArray(e) ? e : [e]), o = _a(e);
  return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live], script"))), Da(r, o, n, "aria-hidden")) : function() {
    return null;
  };
}, ee = function() {
  return ee = Object.assign || function(t) {
    for (var n, r = 1, o = arguments.length; r < o; r++) {
      n = arguments[r];
      for (var s in n) Object.prototype.hasOwnProperty.call(n, s) && (t[s] = n[s]);
    }
    return t;
  }, ee.apply(this, arguments);
};
function Er(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  return n;
}
function $a(e, t, n) {
  if (n || arguments.length === 2) for (var r = 0, o = t.length, s; r < o; r++)
    (s || !(r in t)) && (s || (s = Array.prototype.slice.call(t, 0, r)), s[r] = t[r]);
  return e.concat(s || Array.prototype.slice.call(t));
}
var Xe = "right-scroll-bar-position", qe = "width-before-scroll-bar", Wa = "with-scroll-bars-hidden", Ba = "--removed-body-scroll-bar-size";
function Rt(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function za(e, t) {
  var n = Re(function() {
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
var Va = typeof window < "u" ? d.useLayoutEffect : d.useEffect, Ln = /* @__PURE__ */ new WeakMap();
function Ga(e, t) {
  var n = za(null, function(r) {
    return e.forEach(function(o) {
      return Rt(o, r);
    });
  });
  return Va(function() {
    var r = Ln.get(n);
    if (r) {
      var o = new Set(r), s = new Set(e), i = n.current;
      o.forEach(function(a) {
        s.has(a) || Rt(a, null);
      }), s.forEach(function(a) {
        o.has(a) || Rt(a, i);
      });
    }
    Ln.set(n, e);
  }, [e]), n;
}
function Ua(e) {
  return e;
}
function ja(e, t) {
  t === void 0 && (t = Ua);
  var n = [], r = !1, o = {
    read: function() {
      if (r)
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      return n.length ? n[n.length - 1] : e;
    },
    useMedium: function(s) {
      var i = t(s, r);
      return n.push(i), function() {
        n = n.filter(function(a) {
          return a !== i;
        });
      };
    },
    assignSyncMedium: function(s) {
      for (r = !0; n.length; ) {
        var i = n;
        n = [], i.forEach(s);
      }
      n = {
        push: function(a) {
          return s(a);
        },
        filter: function() {
          return n;
        }
      };
    },
    assignMedium: function(s) {
      r = !0;
      var i = [];
      if (n.length) {
        var a = n;
        n = [], a.forEach(s), i = n;
      }
      var u = function() {
        var l = i;
        i = [], l.forEach(s);
      }, c = function() {
        return Promise.resolve().then(u);
      };
      c(), n = {
        push: function(l) {
          i.push(l), c();
        },
        filter: function(l) {
          return i = i.filter(l), n;
        }
      };
    }
  };
  return o;
}
function Ha(e) {
  e === void 0 && (e = {});
  var t = ja(null);
  return t.options = ee({ async: !0, ssr: !1 }, e), t;
}
var Pr = function(e) {
  var t = e.sideCar, n = Er(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = t.read();
  if (!r)
    throw new Error("Sidecar medium not found");
  return d.createElement(r, ee({}, n));
};
Pr.isSideCarExport = !0;
function Ka(e, t) {
  return e.useMedium(t), Pr;
}
var Nr = Ha(), St = function() {
}, lt = d.forwardRef(function(e, t) {
  var n = d.useRef(null), r = d.useState({
    onScrollCapture: St,
    onWheelCapture: St,
    onTouchMoveCapture: St
  }), o = r[0], s = r[1], i = e.forwardProps, a = e.children, u = e.className, c = e.removeScrollBar, l = e.enabled, f = e.shards, m = e.sideCar, h = e.noRelative, y = e.noIsolation, p = e.inert, g = e.allowPinchZoom, b = e.as, w = b === void 0 ? "div" : b, x = e.gapMode, C = Er(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), R = m, A = Ga([n, t]), S = ee(ee({}, C), o);
  return d.createElement(
    d.Fragment,
    null,
    l && d.createElement(R, { sideCar: Nr, removeScrollBar: c, shards: f, noRelative: h, noIsolation: y, inert: p, setCallbacks: s, allowPinchZoom: !!g, lockRef: n, gapMode: x }),
    i ? d.cloneElement(d.Children.only(a), ee(ee({}, S), { ref: A })) : d.createElement(w, ee({}, S, { className: u, ref: A }), a)
  );
});
lt.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
lt.classNames = {
  fullWidth: qe,
  zeroRight: Xe
};
var Ya = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function Xa() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = Ya();
  return t && e.setAttribute("nonce", t), e;
}
function qa(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function Za(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var Qa = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = Xa()) && (qa(t, n), Za(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, Ja = function() {
  var e = Qa();
  return function(t, n) {
    d.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, kr = function() {
  var e = Ja(), t = function(n) {
    var r = n.styles, o = n.dynamic;
    return e(r, o), null;
  };
  return t;
}, ec = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, At = function(e) {
  return parseInt(e || "", 10) || 0;
}, tc = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [At(n), At(r), At(o)];
}, nc = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return ec;
  var t = tc(e), n = document.documentElement.clientWidth, r = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, r - n + t[2] - t[0])
  };
}, rc = kr(), Ee = "data-scroll-locked", oc = function(e, t, n, r) {
  var o = e.left, s = e.top, i = e.right, a = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(Wa, ` {
   overflow: hidden `).concat(r, `;
   padding-right: `).concat(a, "px ").concat(r, `;
  }
  body[`).concat(Ee, `] {
    overflow: hidden `).concat(r, `;
    overscroll-behavior: contain;
    `).concat([
    t && "position: relative ".concat(r, ";"),
    n === "margin" && `
    padding-left: `.concat(o, `px;
    padding-top: `).concat(s, `px;
    padding-right: `).concat(i, `px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(a, "px ").concat(r, `;
    `),
    n === "padding" && "padding-right: ".concat(a, "px ").concat(r, ";")
  ].filter(Boolean).join(""), `
  }
  
  .`).concat(Xe, ` {
    right: `).concat(a, "px ").concat(r, `;
  }
  
  .`).concat(qe, ` {
    margin-right: `).concat(a, "px ").concat(r, `;
  }
  
  .`).concat(Xe, " .").concat(Xe, ` {
    right: 0 `).concat(r, `;
  }
  
  .`).concat(qe, " .").concat(qe, ` {
    margin-right: 0 `).concat(r, `;
  }
  
  body[`).concat(Ee, `] {
    `).concat(Ba, ": ").concat(a, `px;
  }
`);
}, Dn = function() {
  var e = parseInt(document.body.getAttribute(Ee) || "0", 10);
  return isFinite(e) ? e : 0;
}, sc = function() {
  d.useEffect(function() {
    return document.body.setAttribute(Ee, (Dn() + 1).toString()), function() {
      var e = Dn() - 1;
      e <= 0 ? document.body.removeAttribute(Ee) : document.body.setAttribute(Ee, e.toString());
    };
  }, []);
}, ic = function(e) {
  var t = e.noRelative, n = e.noImportant, r = e.gapMode, o = r === void 0 ? "margin" : r;
  sc();
  var s = d.useMemo(function() {
    return nc(o);
  }, [o]);
  return d.createElement(rc, { styles: oc(s, !t, o, n ? "" : "!important") });
}, Tt = !1;
if (typeof window < "u")
  try {
    var He = Object.defineProperty({}, "passive", {
      get: function() {
        return Tt = !0, !0;
      }
    });
    window.addEventListener("test", He, He), window.removeEventListener("test", He, He);
  } catch {
    Tt = !1;
  }
var xe = Tt ? { passive: !1 } : !1, ac = function(e) {
  return e.tagName === "TEXTAREA";
}, Or = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !ac(e) && n[t] === "visible")
  );
}, cc = function(e) {
  return Or(e, "overflowY");
}, lc = function(e) {
  return Or(e, "overflowX");
}, Fn = function(e, t) {
  var n = t.ownerDocument, r = t;
  do {
    typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
    var o = Ir(e, r);
    if (o) {
      var s = Mr(e, r), i = s[1], a = s[2];
      if (i > a)
        return !0;
    }
    r = r.parentNode;
  } while (r && r !== n.body);
  return !1;
}, uc = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, r = e.clientHeight;
  return [
    t,
    n,
    r
  ];
}, dc = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, r = e.clientWidth;
  return [
    t,
    n,
    r
  ];
}, Ir = function(e, t) {
  return e === "v" ? cc(t) : lc(t);
}, Mr = function(e, t) {
  return e === "v" ? uc(t) : dc(t);
}, fc = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, pc = function(e, t, n, r, o) {
  var s = fc(e, window.getComputedStyle(t).direction), i = s * r, a = n.target, u = t.contains(a), c = !1, l = i > 0, f = 0, m = 0;
  do {
    if (!a)
      break;
    var h = Mr(e, a), y = h[0], p = h[1], g = h[2], b = p - g - s * y;
    (y || b) && Ir(e, a) && (f += b, m += y);
    var w = a.parentNode;
    a = w && w.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? w.host : w;
  } while (
    // portaled content
    !u && a !== document.body || // self content
    u && (t.contains(a) || t === a)
  );
  return (l && Math.abs(f) < 1 || !l && Math.abs(m) < 1) && (c = !0), c;
}, Ke = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, $n = function(e) {
  return [e.deltaX, e.deltaY];
}, Wn = function(e) {
  return e && "current" in e ? e.current : e;
}, mc = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, hc = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, gc = 0, Ce = [];
function vc(e) {
  var t = d.useRef([]), n = d.useRef([0, 0]), r = d.useRef(), o = d.useState(gc++)[0], s = d.useState(kr)[0], i = d.useRef(e);
  d.useEffect(function() {
    i.current = e;
  }, [e]), d.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var p = $a([e.lockRef.current], (e.shards || []).map(Wn), !0).filter(Boolean);
      return p.forEach(function(g) {
        return g.classList.add("allow-interactivity-".concat(o));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(o)), p.forEach(function(g) {
          return g.classList.remove("allow-interactivity-".concat(o));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var a = d.useCallback(function(p, g) {
    if ("touches" in p && p.touches.length === 2 || p.type === "wheel" && p.ctrlKey)
      return !i.current.allowPinchZoom;
    var b = Ke(p), w = n.current, x = "deltaX" in p ? p.deltaX : w[0] - b[0], C = "deltaY" in p ? p.deltaY : w[1] - b[1], R, A = p.target, S = Math.abs(x) > Math.abs(C) ? "h" : "v";
    if ("touches" in p && S === "h" && A.type === "range")
      return !1;
    var P = Fn(S, A);
    if (!P)
      return !0;
    if (P ? R = S : (R = S === "v" ? "h" : "v", P = Fn(S, A)), !P)
      return !1;
    if (!r.current && "changedTouches" in p && (x || C) && (r.current = R), !R)
      return !0;
    var _ = r.current || R;
    return pc(_, g, p, _ === "h" ? x : C);
  }, []), u = d.useCallback(function(p) {
    var g = p;
    if (!(!Ce.length || Ce[Ce.length - 1] !== s)) {
      var b = "deltaY" in g ? $n(g) : Ke(g), w = t.current.filter(function(R) {
        return R.name === g.type && (R.target === g.target || g.target === R.shadowParent) && mc(R.delta, b);
      })[0];
      if (w && w.should) {
        g.cancelable && g.preventDefault();
        return;
      }
      if (!w) {
        var x = (i.current.shards || []).map(Wn).filter(Boolean).filter(function(R) {
          return R.contains(g.target);
        }), C = x.length > 0 ? a(g, x[0]) : !i.current.noIsolation;
        C && g.cancelable && g.preventDefault();
      }
    }
  }, []), c = d.useCallback(function(p, g, b, w) {
    var x = { name: p, delta: g, target: b, should: w, shadowParent: bc(b) };
    t.current.push(x), setTimeout(function() {
      t.current = t.current.filter(function(C) {
        return C !== x;
      });
    }, 1);
  }, []), l = d.useCallback(function(p) {
    n.current = Ke(p), r.current = void 0;
  }, []), f = d.useCallback(function(p) {
    c(p.type, $n(p), p.target, a(p, e.lockRef.current));
  }, []), m = d.useCallback(function(p) {
    c(p.type, Ke(p), p.target, a(p, e.lockRef.current));
  }, []);
  d.useEffect(function() {
    return Ce.push(s), e.setCallbacks({
      onScrollCapture: f,
      onWheelCapture: f,
      onTouchMoveCapture: m
    }), document.addEventListener("wheel", u, xe), document.addEventListener("touchmove", u, xe), document.addEventListener("touchstart", l, xe), function() {
      Ce = Ce.filter(function(p) {
        return p !== s;
      }), document.removeEventListener("wheel", u, xe), document.removeEventListener("touchmove", u, xe), document.removeEventListener("touchstart", l, xe);
    };
  }, []);
  var h = e.removeScrollBar, y = e.inert;
  return d.createElement(
    d.Fragment,
    null,
    y ? d.createElement(s, { styles: hc(o) }) : null,
    h ? d.createElement(ic, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function bc(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const yc = Ka(Nr, vc);
var Tr = d.forwardRef(function(e, t) {
  return d.createElement(lt, ee({}, e, { ref: t, sideCar: yc }));
});
Tr.classNames = lt.classNames;
var ut = "Popover", [_r] = le(ut, [
  mr
]), We = mr(), [wc, ge] = _r(ut), Lr = (e) => {
  const {
    __scopePopover: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: s,
    modal: i = !1
  } = e, a = We(t), u = d.useRef(null), [c, l] = d.useState(!1), [f, m] = ye({
    prop: r,
    defaultProp: o ?? !1,
    onChange: s,
    caller: ut
  });
  return /* @__PURE__ */ v(Sa, { ...a, children: /* @__PURE__ */ v(
    wc,
    {
      scope: t,
      contentId: ot(),
      triggerRef: u,
      open: f,
      onOpenChange: m,
      onOpenToggle: d.useCallback(() => m((h) => !h), [m]),
      hasCustomAnchor: c,
      onCustomAnchorAdd: d.useCallback(() => l(!0), []),
      onCustomAnchorRemove: d.useCallback(() => l(!1), []),
      modal: i,
      children: n
    }
  ) });
};
Lr.displayName = ut;
var Dr = "PopoverAnchor", xc = d.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = ge(Dr, n), s = We(n), { onCustomAnchorAdd: i, onCustomAnchorRemove: a } = o;
    return d.useEffect(() => (i(), () => a()), [i, a]), /* @__PURE__ */ v(Rr, { ...s, ...r, ref: t });
  }
);
xc.displayName = Dr;
var Fr = "PopoverTrigger", $r = d.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = ge(Fr, n), s = We(n), i = j(t, o.triggerRef), a = /* @__PURE__ */ v(
      V.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": o.open,
        "aria-controls": o.contentId,
        "data-state": Gr(o.open),
        ...r,
        ref: i,
        onClick: G(e.onClick, o.onOpenToggle)
      }
    );
    return o.hasCustomAnchor ? a : /* @__PURE__ */ v(Rr, { asChild: !0, ...s, children: a });
  }
);
$r.displayName = Fr;
var Kt = "PopoverPortal", [Cc, Rc] = _r(Kt, {
  forceMount: void 0
}), Wr = (e) => {
  const { __scopePopover: t, forceMount: n, children: r, container: o } = e, s = ge(Kt, t);
  return /* @__PURE__ */ v(Cc, { scope: t, forceMount: n, children: /* @__PURE__ */ v($e, { present: n || s.open, children: /* @__PURE__ */ v(Sr, { asChild: !0, container: o, children: r }) }) });
};
Wr.displayName = Kt;
var Ne = "PopoverContent", Br = d.forwardRef(
  (e, t) => {
    const n = Rc(Ne, e.__scopePopover), { forceMount: r = n.forceMount, ...o } = e, s = ge(Ne, e.__scopePopover);
    return /* @__PURE__ */ v($e, { present: r || s.open, children: s.modal ? /* @__PURE__ */ v(Ac, { ...o, ref: t }) : /* @__PURE__ */ v(Ec, { ...o, ref: t }) });
  }
);
Br.displayName = Ne;
var Sc = /* @__PURE__ */ Ze("PopoverContent.RemoveScroll"), Ac = d.forwardRef(
  (e, t) => {
    const n = ge(Ne, e.__scopePopover), r = d.useRef(null), o = j(t, r), s = d.useRef(!1);
    return d.useEffect(() => {
      const i = r.current;
      if (i) return Fa(i);
    }, []), /* @__PURE__ */ v(Tr, { as: Sc, allowPinchZoom: !0, children: /* @__PURE__ */ v(
      zr,
      {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: G(e.onCloseAutoFocus, (i) => {
          var a;
          i.preventDefault(), s.current || (a = n.triggerRef.current) == null || a.focus();
        }),
        onPointerDownOutside: G(
          e.onPointerDownOutside,
          (i) => {
            const a = i.detail.originalEvent, u = a.button === 0 && a.ctrlKey === !0, c = a.button === 2 || u;
            s.current = c;
          },
          { checkForDefaultPrevented: !1 }
        ),
        onFocusOutside: G(
          e.onFocusOutside,
          (i) => i.preventDefault(),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
), Ec = d.forwardRef(
  (e, t) => {
    const n = ge(Ne, e.__scopePopover), r = d.useRef(!1), o = d.useRef(!1);
    return /* @__PURE__ */ v(
      zr,
      {
        ...e,
        ref: t,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (s) => {
          var i, a;
          (i = e.onCloseAutoFocus) == null || i.call(e, s), s.defaultPrevented || (r.current || (a = n.triggerRef.current) == null || a.focus(), s.preventDefault()), r.current = !1, o.current = !1;
        },
        onInteractOutside: (s) => {
          var u, c;
          (u = e.onInteractOutside) == null || u.call(e, s), s.defaultPrevented || (r.current = !0, s.detail.originalEvent.type === "pointerdown" && (o.current = !0));
          const i = s.target;
          ((c = n.triggerRef.current) == null ? void 0 : c.contains(i)) && s.preventDefault(), s.detail.originalEvent.type === "focusin" && o.current && s.preventDefault();
        }
      }
    );
  }
), zr = d.forwardRef(
  (e, t) => {
    const {
      __scopePopover: n,
      trapFocus: r,
      onOpenAutoFocus: o,
      onCloseAutoFocus: s,
      disableOutsidePointerEvents: i,
      onEscapeKeyDown: a,
      onPointerDownOutside: u,
      onFocusOutside: c,
      onInteractOutside: l,
      ...f
    } = e, m = ge(Ne, n), h = We(n);
    return qs(), /* @__PURE__ */ v(
      Jn,
      {
        asChild: !0,
        loop: !0,
        trapped: r,
        onMountAutoFocus: o,
        onUnmountAutoFocus: s,
        children: /* @__PURE__ */ v(
          Zn,
          {
            asChild: !0,
            disableOutsidePointerEvents: i,
            onInteractOutside: l,
            onEscapeKeyDown: a,
            onPointerDownOutside: u,
            onFocusOutside: c,
            onDismiss: () => m.onOpenChange(!1),
            children: /* @__PURE__ */ v(
              Aa,
              {
                "data-state": Gr(m.open),
                role: "dialog",
                id: m.contentId,
                ...h,
                ...f,
                ref: t,
                style: {
                  ...f.style,
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
), Vr = "PopoverClose", Pc = d.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = ge(Vr, n);
    return /* @__PURE__ */ v(
      V.button,
      {
        type: "button",
        ...r,
        ref: t,
        onClick: G(e.onClick, () => o.onOpenChange(!1))
      }
    );
  }
);
Pc.displayName = Vr;
var Nc = "PopoverArrow", kc = d.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = We(n);
    return /* @__PURE__ */ v(Ea, { ...o, ...r, ref: t });
  }
);
kc.displayName = Nc;
function Gr(e) {
  return e ? "open" : "closed";
}
var Oc = Lr, Ic = $r, Mc = Wr, Ur = Br;
const su = Oc, iu = Ic, Tc = he(({ className: e, align: t = "end", sideOffset: n = 8, ...r }, o) => /* @__PURE__ */ v(Mc, { children: /* @__PURE__ */ v(
  Ur,
  {
    ref: o,
    align: t,
    sideOffset: n,
    className: O(
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
Tc.displayName = Ur.displayName;
const _c = Q(
  O(
    "flex w-full items-center gap-3 rounded-md px-3 py-2",
    "text-sm font-medium transition-colors",
    "hover:bg-cms-gray-200 active:bg-cms-gray-300",
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
), Lc = he(
  ({ className: e, variant: t, icon: n, children: r, ...o }, s) => /* @__PURE__ */ U(
    "button",
    {
      ref: s,
      className: O(_c({ variant: t }), e),
      ...o,
      children: [
        n && /* @__PURE__ */ v("span", { className: "shrink-0", children: n }),
        r
      ]
    }
  )
);
Lc.displayName = "PopoverMenuItem";
const Dc = Q("cms-font-pretendard cms-text-black", {
  variants: {
    variant: {
      h1: "text-cms-4xl font-bold",
      h2: "text-cms-3xl font-semibold",
      h3: "text-cms-xl font-semibold",
      subtitle: "text-cms-lg font-medium",
      body: "text-cms-md font-normal",
      emphasis: "text-cms-md font-semibold",
      caption: "text-cms-sm font-normal",
      price: "text-cms-xs font-bold"
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
}), Fc = L.forwardRef(
  ({
    className: e,
    variant: t,
    align: n,
    decoration: r,
    as: o = "p",
    children: s,
    ...i
  }, a) => /* @__PURE__ */ v(
    o,
    {
      className: O(Dc({ variant: t, align: n, decoration: r }), e),
      ref: a,
      ...i,
      children: s
    }
  )
);
Fc.displayName = "Text";
const $c = Q(
  O(
    "w-full box-border",
    "px-3 py-2",
    "rounded-cms-sm",
    "border border-solid",
    "font-normal leading-tight",
    "transition-colors duration-200",
    "outline-none",
    "text-cms-black text-cms-sm",
    "placeholder:text-cms-gray-500",
    "placeholder:text-cms-sm"
  ),
  {
    variants: {
      variant: {
        default: O(
          "bg-cms-white ",
          "border-cms-gray-450",
          "focus:border-cms-gray-800",
          "disabled:bg-cms-gray-150 disabled:text-cms-gray-400 disabled:cursor-not-allowed"
        ),
        error: O(
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
), Wc = Q("block text-cms-sm font-medium text-cms-black"), Bc = Q(
  "block text-cms-sm font-medium text-cms-red-400 mt-1"
), zc = Q(
  "block text-cms-sm font-normal text-cms-gray-700 mt-1"
), nt = L.forwardRef(
  ({
    className: e,
    variant: t,
    fullWidth: n,
    label: r,
    error: o,
    errorMessage: s,
    helperText: i,
    showCharCount: a,
    maxLength: u,
    value: c,
    defaultValue: l,
    onChange: f,
    id: m,
    ...h
  }, y) => {
    const [p, g] = L.useState(
      c || l || ""
    ), b = m || `input-${Math.random().toString(36).substr(2, 9)}`, w = o ? "error" : t, x = c !== void 0 ? c : p, C = (x == null ? void 0 : x.length) || 0, R = (S) => {
      c === void 0 && g(S.target.value), f == null || f(S);
    }, A = r || a && u;
    return /* @__PURE__ */ U("div", { className: O("w-full", !n && "w-auto"), children: [
      A && /* @__PURE__ */ U("div", { className: "flex justify-between items-center mb-2", children: [
        r ? /* @__PURE__ */ v("label", { htmlFor: b, className: Wc(), children: r }) : /* @__PURE__ */ v("div", {}),
        a && u && /* @__PURE__ */ U("span", { className: "text-cms-xs text-cms-gray-600", children: [
          C,
          " / ",
          u
        ] })
      ] }),
      /* @__PURE__ */ v(
        "input",
        {
          id: b,
          ref: y,
          className: O(
            $c({ variant: w, fullWidth: n }),
            e
          ),
          maxLength: u,
          value: c,
          defaultValue: l,
          onChange: R,
          ...h
        }
      ),
      o && s && /* @__PURE__ */ v("span", { className: Bc(), children: s }),
      !o && i && /* @__PURE__ */ v("span", { className: zc(), children: i })
    ] });
  }
);
nt.displayName = "TextInput";
const Vc = L.forwardRef(
  ({ value: e, onChange: t, min: n, max: r, ...o }, s) => /* @__PURE__ */ v(
    nt,
    {
      ref: s,
      type: "date",
      value: e,
      onChange: (a) => {
        t == null || t(a.target.value);
      },
      min: n,
      max: r,
      ...o
    }
  )
);
Vc.displayName = "DatePicker";
const Gc = L.forwardRef(
  ({
    value: e,
    onChange: t,
    startLabel: n = "시작일",
    endLabel: r = "종료일",
    startPlaceholder: o = "YYYY-MM-DD",
    endPlaceholder: s = "YYYY-MM-DD",
    min: i,
    max: a,
    label: u,
    error: c,
    errorMessage: l,
    helperText: f,
    fullWidth: m = !0,
    ...h
  }, y) => {
    const [p, g] = L.useState((e == null ? void 0 : e.start) || ""), [b, w] = L.useState((e == null ? void 0 : e.end) || "");
    L.useEffect(() => {
      e && (g(e.start), w(e.end));
    }, [e]);
    const x = (R) => {
      const A = R.target.value;
      g(A), t == null || t({ start: A, end: b });
    }, C = (R) => {
      const A = R.target.value;
      w(A), t == null || t({ start: p, end: A });
    };
    return /* @__PURE__ */ U("div", { ref: y, className: O("cms-w-full", !m && "cms-w-auto"), children: [
      u && /* @__PURE__ */ v("label", { className: "cms-block cms-text-cms-md cms-font-medium cms-text-black cms-mb-2", children: u }),
      /* @__PURE__ */ U("div", { className: "cms-flex cms-gap-4 cms-items-center", children: [
        /* @__PURE__ */ v(
          nt,
          {
            type: "date",
            value: p,
            onChange: x,
            placeholder: o,
            min: i,
            max: b || a,
            fullWidth: !0,
            ...h
          }
        ),
        /* @__PURE__ */ v("span", { className: "cms-text-cms-md cms-text-gray-600", children: "~" }),
        /* @__PURE__ */ v(
          nt,
          {
            type: "date",
            value: b,
            onChange: C,
            placeholder: s,
            min: p || i,
            max: a,
            fullWidth: !0,
            ...h
          }
        )
      ] }),
      c && l && /* @__PURE__ */ v("span", { className: "cms-block cms-text-cms-sm cms-font-medium cms-text-red-400 cms-mt-1", children: l }),
      !c && f && /* @__PURE__ */ v("span", { className: "cms-block cms-text-cms-sm cms-font-normal cms-text-gray-600 cms-mt-1", children: f })
    ] });
  }
);
Gc.displayName = "DateRangePicker";
function jr(e) {
  const t = d.useRef({ value: e, previous: e });
  return d.useMemo(() => (t.current.value !== e && (t.current.previous = t.current.value, t.current.value = e), t.current.previous), [e]);
}
var dt = "Switch", [Uc] = le(dt), [jc, Hc] = Uc(dt), Hr = d.forwardRef(
  (e, t) => {
    const {
      __scopeSwitch: n,
      name: r,
      checked: o,
      defaultChecked: s,
      required: i,
      disabled: a,
      value: u = "on",
      onCheckedChange: c,
      form: l,
      ...f
    } = e, [m, h] = d.useState(null), y = j(t, (x) => h(x)), p = d.useRef(!1), g = m ? l || !!m.closest("form") : !0, [b, w] = ye({
      prop: o,
      defaultProp: s ?? !1,
      onChange: c,
      caller: dt
    });
    return /* @__PURE__ */ U(jc, { scope: n, checked: b, disabled: a, children: [
      /* @__PURE__ */ v(
        V.button,
        {
          type: "button",
          role: "switch",
          "aria-checked": b,
          "aria-required": i,
          "data-state": qr(b),
          "data-disabled": a ? "" : void 0,
          disabled: a,
          value: u,
          ...f,
          ref: y,
          onClick: G(e.onClick, (x) => {
            w((C) => !C), g && (p.current = x.isPropagationStopped(), p.current || x.stopPropagation());
          })
        }
      ),
      g && /* @__PURE__ */ v(
        Xr,
        {
          control: m,
          bubbles: !p.current,
          name: r,
          value: u,
          checked: b,
          required: i,
          disabled: a,
          form: l,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
Hr.displayName = dt;
var Kr = "SwitchThumb", Yr = d.forwardRef(
  (e, t) => {
    const { __scopeSwitch: n, ...r } = e, o = Hc(Kr, n);
    return /* @__PURE__ */ v(
      V.span,
      {
        "data-state": qr(o.checked),
        "data-disabled": o.disabled ? "" : void 0,
        ...r,
        ref: t
      }
    );
  }
);
Yr.displayName = Kr;
var Kc = "SwitchBubbleInput", Xr = d.forwardRef(
  ({
    __scopeSwitch: e,
    control: t,
    checked: n,
    bubbles: r = !0,
    ...o
  }, s) => {
    const i = d.useRef(null), a = j(i, s), u = jr(n), c = Ut(t);
    return d.useEffect(() => {
      const l = i.current;
      if (!l) return;
      const f = window.HTMLInputElement.prototype, h = Object.getOwnPropertyDescriptor(
        f,
        "checked"
      ).set;
      if (u !== n && h) {
        const y = new Event("click", { bubbles: r });
        h.call(l, n), l.dispatchEvent(y);
      }
    }, [u, n, r]), /* @__PURE__ */ v(
      "input",
      {
        type: "checkbox",
        "aria-hidden": !0,
        defaultChecked: n,
        ...o,
        tabIndex: -1,
        ref: a,
        style: {
          ...o.style,
          ...c,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
Xr.displayName = Kc;
function qr(e) {
  return e ? "checked" : "unchecked";
}
var Zr = Hr, Yc = Yr;
const Xc = Q(
  O(
    "peer inline-flex items-center transition-colors ",
    "rounded-full border-2 border-transparent box-border",
    "h-6 w-10 shrink-0",
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
), qc = L.forwardRef(({ className: e, variant: t, ...n }, r) => /* @__PURE__ */ v(
  Zr,
  {
    className: O(Xc({ variant: t }), e),
    ...n,
    ref: r,
    children: /* @__PURE__ */ v(
      Yc,
      {
        className: O(
          "pointer-events-none block rounded-full ring-0",
          "bg-cms-white shadow-lg",
          "h-5 w-5",
          "data-[state=unchecked]:translate-x-0",
          "data-[state=checked]:translate-x-4",
          "transition-transform"
        )
      }
    )
  }
));
qc.displayName = Zr.displayName;
function Qr(e) {
  const t = e + "CollectionProvider", [n, r] = le(t), [o, s] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), i = (p) => {
    const { scope: g, children: b } = p, w = L.useRef(null), x = L.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ v(o, { scope: g, itemMap: x, collectionRef: w, children: b });
  };
  i.displayName = t;
  const a = e + "CollectionSlot", u = /* @__PURE__ */ Ze(a), c = L.forwardRef(
    (p, g) => {
      const { scope: b, children: w } = p, x = s(a, b), C = j(g, x.collectionRef);
      return /* @__PURE__ */ v(u, { ref: C, children: w });
    }
  );
  c.displayName = a;
  const l = e + "CollectionItemSlot", f = "data-radix-collection-item", m = /* @__PURE__ */ Ze(l), h = L.forwardRef(
    (p, g) => {
      const { scope: b, children: w, ...x } = p, C = L.useRef(null), R = j(g, C), A = s(l, b);
      return L.useEffect(() => (A.itemMap.set(C, { ref: C, ...x }), () => void A.itemMap.delete(C))), /* @__PURE__ */ v(m, { [f]: "", ref: R, children: w });
    }
  );
  h.displayName = l;
  function y(p) {
    const g = s(e + "CollectionConsumer", p);
    return L.useCallback(() => {
      const w = g.collectionRef.current;
      if (!w) return [];
      const x = Array.from(w.querySelectorAll(`[${f}]`));
      return Array.from(g.itemMap.values()).sort(
        (A, S) => x.indexOf(A.ref.current) - x.indexOf(S.ref.current)
      );
    }, [g.collectionRef, g.itemMap]);
  }
  return [
    { Provider: i, Slot: c, ItemSlot: h },
    y,
    r
  ];
}
var Zc = d.createContext(void 0);
function Yt(e) {
  const t = d.useContext(Zc);
  return e || t || "ltr";
}
var Et = "rovingFocusGroup.onEntryFocus", Qc = { bubbles: !1, cancelable: !0 }, Be = "RovingFocusGroup", [_t, Jr, Jc] = Qr(Be), [el, eo] = le(
  Be,
  [Jc]
), [tl, nl] = el(Be), to = d.forwardRef(
  (e, t) => /* @__PURE__ */ v(_t.Provider, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ v(_t.Slot, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ v(rl, { ...e, ref: t }) }) })
);
to.displayName = Be;
var rl = d.forwardRef((e, t) => {
  const {
    __scopeRovingFocusGroup: n,
    orientation: r,
    loop: o = !1,
    dir: s,
    currentTabStopId: i,
    defaultCurrentTabStopId: a,
    onCurrentTabStopIdChange: u,
    onEntryFocus: c,
    preventScrollOnEntryFocus: l = !1,
    ...f
  } = e, m = d.useRef(null), h = j(t, m), y = Yt(s), [p, g] = ye({
    prop: i,
    defaultProp: a ?? null,
    onChange: u,
    caller: Be
  }), [b, w] = d.useState(!1), x = ve(c), C = Jr(n), R = d.useRef(!1), [A, S] = d.useState(0);
  return d.useEffect(() => {
    const P = m.current;
    if (P)
      return P.addEventListener(Et, x), () => P.removeEventListener(Et, x);
  }, [x]), /* @__PURE__ */ v(
    tl,
    {
      scope: n,
      orientation: r,
      dir: y,
      loop: o,
      currentTabStopId: p,
      onItemFocus: d.useCallback(
        (P) => g(P),
        [g]
      ),
      onItemShiftTab: d.useCallback(() => w(!0), []),
      onFocusableItemAdd: d.useCallback(
        () => S((P) => P + 1),
        []
      ),
      onFocusableItemRemove: d.useCallback(
        () => S((P) => P - 1),
        []
      ),
      children: /* @__PURE__ */ v(
        V.div,
        {
          tabIndex: b || A === 0 ? -1 : 0,
          "data-orientation": r,
          ...f,
          ref: h,
          style: { outline: "none", ...e.style },
          onMouseDown: G(e.onMouseDown, () => {
            R.current = !0;
          }),
          onFocus: G(e.onFocus, (P) => {
            const _ = !R.current;
            if (P.target === P.currentTarget && _ && !b) {
              const M = new CustomEvent(Et, Qc);
              if (P.currentTarget.dispatchEvent(M), !M.defaultPrevented) {
                const $ = C().filter((T) => T.focusable), N = $.find((T) => T.active), D = $.find((T) => T.id === p), F = [N, D, ...$].filter(
                  Boolean
                ).map((T) => T.ref.current);
                oo(F, l);
              }
            }
            R.current = !1;
          }),
          onBlur: G(e.onBlur, () => w(!1))
        }
      )
    }
  );
}), no = "RovingFocusGroupItem", ro = d.forwardRef(
  (e, t) => {
    const {
      __scopeRovingFocusGroup: n,
      focusable: r = !0,
      active: o = !1,
      tabStopId: s,
      children: i,
      ...a
    } = e, u = ot(), c = s || u, l = nl(no, n), f = l.currentTabStopId === c, m = Jr(n), { onFocusableItemAdd: h, onFocusableItemRemove: y, currentTabStopId: p } = l;
    return d.useEffect(() => {
      if (r)
        return h(), () => y();
    }, [r, h, y]), /* @__PURE__ */ v(
      _t.ItemSlot,
      {
        scope: n,
        id: c,
        focusable: r,
        active: o,
        children: /* @__PURE__ */ v(
          V.span,
          {
            tabIndex: f ? 0 : -1,
            "data-orientation": l.orientation,
            ...a,
            ref: t,
            onMouseDown: G(e.onMouseDown, (g) => {
              r ? l.onItemFocus(c) : g.preventDefault();
            }),
            onFocus: G(e.onFocus, () => l.onItemFocus(c)),
            onKeyDown: G(e.onKeyDown, (g) => {
              if (g.key === "Tab" && g.shiftKey) {
                l.onItemShiftTab();
                return;
              }
              if (g.target !== g.currentTarget) return;
              const b = il(g, l.orientation, l.dir);
              if (b !== void 0) {
                if (g.metaKey || g.ctrlKey || g.altKey || g.shiftKey) return;
                g.preventDefault();
                let x = m().filter((C) => C.focusable).map((C) => C.ref.current);
                if (b === "last") x.reverse();
                else if (b === "prev" || b === "next") {
                  b === "prev" && x.reverse();
                  const C = x.indexOf(g.currentTarget);
                  x = l.loop ? al(x, C + 1) : x.slice(C + 1);
                }
                setTimeout(() => oo(x));
              }
            }),
            children: typeof i == "function" ? i({ isCurrentTabStop: f, hasTabStop: p != null }) : i
          }
        )
      }
    );
  }
);
ro.displayName = no;
var ol = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function sl(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function il(e, t, n) {
  const r = sl(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r)))
    return ol[r];
}
function oo(e, t = !1) {
  const n = document.activeElement;
  for (const r of e)
    if (r === n || (r.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function al(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var cl = to, ll = ro, Xt = "Radio", [ul, so] = le(Xt), [dl, fl] = ul(Xt), io = d.forwardRef(
  (e, t) => {
    const {
      __scopeRadio: n,
      name: r,
      checked: o = !1,
      required: s,
      disabled: i,
      value: a = "on",
      onCheck: u,
      form: c,
      ...l
    } = e, [f, m] = d.useState(null), h = j(t, (g) => m(g)), y = d.useRef(!1), p = f ? c || !!f.closest("form") : !0;
    return /* @__PURE__ */ U(dl, { scope: n, checked: o, disabled: i, children: [
      /* @__PURE__ */ v(
        V.button,
        {
          type: "button",
          role: "radio",
          "aria-checked": o,
          "data-state": uo(o),
          "data-disabled": i ? "" : void 0,
          disabled: i,
          value: a,
          ...l,
          ref: h,
          onClick: G(e.onClick, (g) => {
            o || u == null || u(), p && (y.current = g.isPropagationStopped(), y.current || g.stopPropagation());
          })
        }
      ),
      p && /* @__PURE__ */ v(
        lo,
        {
          control: f,
          bubbles: !y.current,
          name: r,
          value: a,
          checked: o,
          required: s,
          disabled: i,
          form: c,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
io.displayName = Xt;
var ao = "RadioIndicator", co = d.forwardRef(
  (e, t) => {
    const { __scopeRadio: n, forceMount: r, ...o } = e, s = fl(ao, n);
    return /* @__PURE__ */ v($e, { present: r || s.checked, children: /* @__PURE__ */ v(
      V.span,
      {
        "data-state": uo(s.checked),
        "data-disabled": s.disabled ? "" : void 0,
        ...o,
        ref: t
      }
    ) });
  }
);
co.displayName = ao;
var pl = "RadioBubbleInput", lo = d.forwardRef(
  ({
    __scopeRadio: e,
    control: t,
    checked: n,
    bubbles: r = !0,
    ...o
  }, s) => {
    const i = d.useRef(null), a = j(i, s), u = jr(n), c = Ut(t);
    return d.useEffect(() => {
      const l = i.current;
      if (!l) return;
      const f = window.HTMLInputElement.prototype, h = Object.getOwnPropertyDescriptor(
        f,
        "checked"
      ).set;
      if (u !== n && h) {
        const y = new Event("click", { bubbles: r });
        h.call(l, n), l.dispatchEvent(y);
      }
    }, [u, n, r]), /* @__PURE__ */ v(
      V.input,
      {
        type: "radio",
        "aria-hidden": !0,
        defaultChecked: n,
        ...o,
        tabIndex: -1,
        ref: a,
        style: {
          ...o.style,
          ...c,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
lo.displayName = pl;
function uo(e) {
  return e ? "checked" : "unchecked";
}
var ml = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], ft = "RadioGroup", [hl] = le(ft, [
  eo,
  so
]), fo = eo(), po = so(), [gl, vl] = hl(ft), mo = d.forwardRef(
  (e, t) => {
    const {
      __scopeRadioGroup: n,
      name: r,
      defaultValue: o,
      value: s,
      required: i = !1,
      disabled: a = !1,
      orientation: u,
      dir: c,
      loop: l = !0,
      onValueChange: f,
      ...m
    } = e, h = fo(n), y = Yt(c), [p, g] = ye({
      prop: s,
      defaultProp: o ?? null,
      onChange: f,
      caller: ft
    });
    return /* @__PURE__ */ v(
      gl,
      {
        scope: n,
        name: r,
        required: i,
        disabled: a,
        value: p,
        onValueChange: g,
        children: /* @__PURE__ */ v(
          cl,
          {
            asChild: !0,
            ...h,
            orientation: u,
            dir: y,
            loop: l,
            children: /* @__PURE__ */ v(
              V.div,
              {
                role: "radiogroup",
                "aria-required": i,
                "aria-orientation": u,
                "data-disabled": a ? "" : void 0,
                dir: y,
                ...m,
                ref: t
              }
            )
          }
        )
      }
    );
  }
);
mo.displayName = ft;
var ho = "RadioGroupItem", go = d.forwardRef(
  (e, t) => {
    const { __scopeRadioGroup: n, disabled: r, ...o } = e, s = vl(ho, n), i = s.disabled || r, a = fo(n), u = po(n), c = d.useRef(null), l = j(t, c), f = s.value === o.value, m = d.useRef(!1);
    return d.useEffect(() => {
      const h = (p) => {
        ml.includes(p.key) && (m.current = !0);
      }, y = () => m.current = !1;
      return document.addEventListener("keydown", h), document.addEventListener("keyup", y), () => {
        document.removeEventListener("keydown", h), document.removeEventListener("keyup", y);
      };
    }, []), /* @__PURE__ */ v(
      ll,
      {
        asChild: !0,
        ...a,
        focusable: !i,
        active: f,
        children: /* @__PURE__ */ v(
          io,
          {
            disabled: i,
            required: s.required,
            checked: f,
            ...u,
            ...o,
            name: s.name,
            ref: l,
            onCheck: () => s.onValueChange(o.value),
            onKeyDown: G((h) => {
              h.key === "Enter" && h.preventDefault();
            }),
            onFocus: G(o.onFocus, () => {
              var h;
              m.current && ((h = c.current) == null || h.click());
            })
          }
        )
      }
    );
  }
);
go.displayName = ho;
var bl = "RadioGroupIndicator", vo = d.forwardRef(
  (e, t) => {
    const { __scopeRadioGroup: n, ...r } = e, o = po(n);
    return /* @__PURE__ */ v(co, { ...o, ...r, ref: t });
  }
);
vo.displayName = bl;
var bo = mo, yo = go, yl = vo;
const wl = L.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ v(
  bo,
  {
    className: O("grid gap-2", e),
    ...t,
    ref: n
  }
));
wl.displayName = bo.displayName;
const xl = Q(
  O(
    "aspect-square rounded-full border-2 transition-colors",
    "focus:outline-none focus-visible:ring-2",
    "focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "cursor-pointer"
  ),
  {
    variants: {
      variant: {
        black: "border-cms-gray-300 text-cms-black data-[state=checked]:border-cms-black",
        default: "border-cms-gray-300 text-cms-primary-300 data-[state=checked]:border-cms-primary-300",
        green: "border-cms-gray-300 text-cms-green-500 data-[state=checked]:border-cms-green-500",
        blue: "border-cms-gray-300 text-cms-blue-700 data-[state=checked]:border-cms-blue-700",
        red: "border-cms-gray-300 text-cms-red-400 data-[state=checked]:border-cms-red-400"
      },
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6"
      }
    },
    defaultVariants: {
      variant: "black",
      size: "md"
    }
  }
), Cl = Q(
  'w-full h-full relative after:content-[""] after:block after:rounded-full after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2',
  {
    variants: {
      variant: {
        black: "after:bg-cms-black",
        default: "after:bg-cms-primary-300",
        green: "after:bg-cms-green-500",
        blue: "after:bg-cms-blue-700",
        red: "after:bg-cms-red-400"
      },
      size: {
        sm: "after:h-2 after:w-2",
        md: "after:h-2.5 after:w-2.5",
        lg: "after:h-3 after:w-3"
      }
    },
    defaultVariants: {
      variant: "black",
      size: "md"
    }
  }
), Rl = L.forwardRef(({ className: e, variant: t, size: n, ...r }, o) => /* @__PURE__ */ v(
  yo,
  {
    ref: o,
    className: O(xl({ variant: t, size: n }), e),
    ...r,
    children: /* @__PURE__ */ v(
      yl,
      {
        className: O(Cl({ variant: t, size: n }))
      }
    )
  }
));
Rl.displayName = yo.displayName;
var pt = "Collapsible", [Sl, wo] = le(pt), [Al, qt] = Sl(pt), xo = d.forwardRef(
  (e, t) => {
    const {
      __scopeCollapsible: n,
      open: r,
      defaultOpen: o,
      disabled: s,
      onOpenChange: i,
      ...a
    } = e, [u, c] = ye({
      prop: r,
      defaultProp: o ?? !1,
      onChange: i,
      caller: pt
    });
    return /* @__PURE__ */ v(
      Al,
      {
        scope: n,
        disabled: s,
        contentId: ot(),
        open: u,
        onOpenToggle: d.useCallback(() => c((l) => !l), [c]),
        children: /* @__PURE__ */ v(
          V.div,
          {
            "data-state": Qt(u),
            "data-disabled": s ? "" : void 0,
            ...a,
            ref: t
          }
        )
      }
    );
  }
);
xo.displayName = pt;
var Co = "CollapsibleTrigger", Ro = d.forwardRef(
  (e, t) => {
    const { __scopeCollapsible: n, ...r } = e, o = qt(Co, n);
    return /* @__PURE__ */ v(
      V.button,
      {
        type: "button",
        "aria-controls": o.contentId,
        "aria-expanded": o.open || !1,
        "data-state": Qt(o.open),
        "data-disabled": o.disabled ? "" : void 0,
        disabled: o.disabled,
        ...r,
        ref: t,
        onClick: G(e.onClick, o.onOpenToggle)
      }
    );
  }
);
Ro.displayName = Co;
var Zt = "CollapsibleContent", So = d.forwardRef(
  (e, t) => {
    const { forceMount: n, ...r } = e, o = qt(Zt, e.__scopeCollapsible);
    return /* @__PURE__ */ v($e, { present: n || o.open, children: ({ present: s }) => /* @__PURE__ */ v(El, { ...r, ref: t, present: s }) });
  }
);
So.displayName = Zt;
var El = d.forwardRef((e, t) => {
  const { __scopeCollapsible: n, present: r, children: o, ...s } = e, i = qt(Zt, n), [a, u] = d.useState(r), c = d.useRef(null), l = j(t, c), f = d.useRef(0), m = f.current, h = d.useRef(0), y = h.current, p = i.open || a, g = d.useRef(p), b = d.useRef(void 0);
  return d.useEffect(() => {
    const w = requestAnimationFrame(() => g.current = !1);
    return () => cancelAnimationFrame(w);
  }, []), ie(() => {
    const w = c.current;
    if (w) {
      b.current = b.current || {
        transitionDuration: w.style.transitionDuration,
        animationName: w.style.animationName
      }, w.style.transitionDuration = "0s", w.style.animationName = "none";
      const x = w.getBoundingClientRect();
      f.current = x.height, h.current = x.width, g.current || (w.style.transitionDuration = b.current.transitionDuration, w.style.animationName = b.current.animationName), u(r);
    }
  }, [i.open, r]), /* @__PURE__ */ v(
    V.div,
    {
      "data-state": Qt(i.open),
      "data-disabled": i.disabled ? "" : void 0,
      id: i.contentId,
      hidden: !p,
      ...s,
      ref: l,
      style: {
        "--radix-collapsible-content-height": m ? `${m}px` : void 0,
        "--radix-collapsible-content-width": y ? `${y}px` : void 0,
        ...e.style
      },
      children: p && o
    }
  );
});
function Qt(e) {
  return e ? "open" : "closed";
}
var Pl = xo, Nl = Ro, kl = So, J = "Accordion", Ol = ["Home", "End", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"], [Jt, Il, Ml] = Qr(J), [mt] = le(J, [
  Ml,
  wo
]), en = wo(), Ao = L.forwardRef(
  (e, t) => {
    const { type: n, ...r } = e, o = r, s = r;
    return /* @__PURE__ */ v(Jt.Provider, { scope: e.__scopeAccordion, children: n === "multiple" ? /* @__PURE__ */ v(Dl, { ...s, ref: t }) : /* @__PURE__ */ v(Ll, { ...o, ref: t }) });
  }
);
Ao.displayName = J;
var [Eo, Tl] = mt(J), [Po, _l] = mt(
  J,
  { collapsible: !1 }
), Ll = L.forwardRef(
  (e, t) => {
    const {
      value: n,
      defaultValue: r,
      onValueChange: o = () => {
      },
      collapsible: s = !1,
      ...i
    } = e, [a, u] = ye({
      prop: n,
      defaultProp: r ?? "",
      onChange: o,
      caller: J
    });
    return /* @__PURE__ */ v(
      Eo,
      {
        scope: e.__scopeAccordion,
        value: L.useMemo(() => a ? [a] : [], [a]),
        onItemOpen: u,
        onItemClose: L.useCallback(() => s && u(""), [s, u]),
        children: /* @__PURE__ */ v(Po, { scope: e.__scopeAccordion, collapsible: s, children: /* @__PURE__ */ v(No, { ...i, ref: t }) })
      }
    );
  }
), Dl = L.forwardRef((e, t) => {
  const {
    value: n,
    defaultValue: r,
    onValueChange: o = () => {
    },
    ...s
  } = e, [i, a] = ye({
    prop: n,
    defaultProp: r ?? [],
    onChange: o,
    caller: J
  }), u = L.useCallback(
    (l) => a((f = []) => [...f, l]),
    [a]
  ), c = L.useCallback(
    (l) => a((f = []) => f.filter((m) => m !== l)),
    [a]
  );
  return /* @__PURE__ */ v(
    Eo,
    {
      scope: e.__scopeAccordion,
      value: i,
      onItemOpen: u,
      onItemClose: c,
      children: /* @__PURE__ */ v(Po, { scope: e.__scopeAccordion, collapsible: !0, children: /* @__PURE__ */ v(No, { ...s, ref: t }) })
    }
  );
}), [Fl, ht] = mt(J), No = L.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, disabled: r, dir: o, orientation: s = "vertical", ...i } = e, a = L.useRef(null), u = j(a, t), c = Il(n), f = Yt(o) === "ltr", m = G(e.onKeyDown, (h) => {
      var P;
      if (!Ol.includes(h.key)) return;
      const y = h.target, p = c().filter((_) => {
        var M;
        return !((M = _.ref.current) != null && M.disabled);
      }), g = p.findIndex((_) => _.ref.current === y), b = p.length;
      if (g === -1) return;
      h.preventDefault();
      let w = g;
      const x = 0, C = b - 1, R = () => {
        w = g + 1, w > C && (w = x);
      }, A = () => {
        w = g - 1, w < x && (w = C);
      };
      switch (h.key) {
        case "Home":
          w = x;
          break;
        case "End":
          w = C;
          break;
        case "ArrowRight":
          s === "horizontal" && (f ? R() : A());
          break;
        case "ArrowDown":
          s === "vertical" && R();
          break;
        case "ArrowLeft":
          s === "horizontal" && (f ? A() : R());
          break;
        case "ArrowUp":
          s === "vertical" && A();
          break;
      }
      const S = w % b;
      (P = p[S].ref.current) == null || P.focus();
    });
    return /* @__PURE__ */ v(
      Fl,
      {
        scope: n,
        disabled: r,
        direction: o,
        orientation: s,
        children: /* @__PURE__ */ v(Jt.Slot, { scope: n, children: /* @__PURE__ */ v(
          V.div,
          {
            ...i,
            "data-orientation": s,
            ref: u,
            onKeyDown: r ? void 0 : m
          }
        ) })
      }
    );
  }
), rt = "AccordionItem", [$l, tn] = mt(rt), ko = L.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, value: r, ...o } = e, s = ht(rt, n), i = Tl(rt, n), a = en(n), u = ot(), c = r && i.value.includes(r) || !1, l = s.disabled || e.disabled;
    return /* @__PURE__ */ v(
      $l,
      {
        scope: n,
        open: c,
        disabled: l,
        triggerId: u,
        children: /* @__PURE__ */ v(
          Pl,
          {
            "data-orientation": s.orientation,
            "data-state": Lo(c),
            ...a,
            ...o,
            ref: t,
            disabled: l,
            open: c,
            onOpenChange: (f) => {
              f ? i.onItemOpen(r) : i.onItemClose(r);
            }
          }
        )
      }
    );
  }
);
ko.displayName = rt;
var Oo = "AccordionHeader", Io = L.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, ...r } = e, o = ht(J, n), s = tn(Oo, n);
    return /* @__PURE__ */ v(
      V.h3,
      {
        "data-orientation": o.orientation,
        "data-state": Lo(s.open),
        "data-disabled": s.disabled ? "" : void 0,
        ...r,
        ref: t
      }
    );
  }
);
Io.displayName = Oo;
var Lt = "AccordionTrigger", Mo = L.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, ...r } = e, o = ht(J, n), s = tn(Lt, n), i = _l(Lt, n), a = en(n);
    return /* @__PURE__ */ v(Jt.ItemSlot, { scope: n, children: /* @__PURE__ */ v(
      Nl,
      {
        "aria-disabled": s.open && !i.collapsible || void 0,
        "data-orientation": o.orientation,
        id: s.triggerId,
        ...a,
        ...r,
        ref: t
      }
    ) });
  }
);
Mo.displayName = Lt;
var To = "AccordionContent", _o = L.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, ...r } = e, o = ht(J, n), s = tn(To, n), i = en(n);
    return /* @__PURE__ */ v(
      kl,
      {
        role: "region",
        "aria-labelledby": s.triggerId,
        "data-orientation": o.orientation,
        ...i,
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
_o.displayName = To;
function Lo(e) {
  return e ? "open" : "closed";
}
var Wl = Ao, Bl = ko, zl = Io, Vl = Mo, Gl = _o;
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ul = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), jl = (e) => e.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (t, n, r) => r ? r.toUpperCase() : n.toLowerCase()
), Bn = (e) => {
  const t = jl(e);
  return t.charAt(0).toUpperCase() + t.slice(1);
}, Do = (...e) => e.filter((t, n, r) => !!t && t.trim() !== "" && r.indexOf(t) === n).join(" ").trim(), Hl = (e) => {
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
var Kl = {
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
const Yl = he(
  ({
    color: e = "currentColor",
    size: t = 24,
    strokeWidth: n = 2,
    absoluteStrokeWidth: r,
    className: o = "",
    children: s,
    iconNode: i,
    ...a
  }, u) => Pt(
    "svg",
    {
      ref: u,
      ...Kl,
      width: t,
      height: t,
      stroke: e,
      strokeWidth: r ? Number(n) * 24 / Number(t) : n,
      className: Do("lucide", o),
      ...!s && !Hl(a) && { "aria-hidden": "true" },
      ...a
    },
    [
      ...i.map(([c, l]) => Pt(c, l)),
      ...Array.isArray(s) ? s : [s]
    ]
  )
);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xl = (e, t) => {
  const n = he(
    ({ className: r, ...o }, s) => Pt(Yl, {
      ref: s,
      iconNode: t,
      className: Do(
        `lucide-${Ul(Bn(e))}`,
        `lucide-${e}`,
        r
      ),
      ...o
    })
  );
  return n.displayName = Bn(e), n;
};
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ql = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], Zl = Xl("chevron-down", ql), Ql = ({
  menu: e,
  isOpen: t,
  isSelected: n,
  selectedUrl: r,
  onMenuClick: o
}) => /* @__PURE__ */ U(Bl, { value: e.url, className: "border-none", children: [
  /* @__PURE__ */ v(zl, { className: "m-0", children: /* @__PURE__ */ U(
    Vl,
    {
      onClick: () => {
        e.subMenu || o(e.url);
      },
      className: O(
        "group w-full h-[52px] flex items-center px-5 text-white transition-colors hover:bg-[#3a3b3e]",
        "data-[state=open]:bg-transparent",
        !e.subMenu && n && "bg-[#3a3b3e]"
      ),
      children: [
        e.icon && /* @__PURE__ */ v("div", { className: "mr-3 flex items-center text-white [&>svg]:w-6 [&>svg]:h-6", children: e.icon }),
        /* @__PURE__ */ v("span", { className: "text-base font-normal text-white", children: e.title }),
        e.subMenu && /* @__PURE__ */ v(
          Zl,
          {
            className: O(
              "ml-auto transition-transform text-white",
              t && "rotate-180"
            ),
            size: 20
          }
        )
      ]
    }
  ) }),
  e.subMenu && /* @__PURE__ */ v(Gl, { className: "overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up bg-[#232427]", children: e.subMenu.map((s) => {
    const i = s.url === r;
    return /* @__PURE__ */ v(
      "div",
      {
        onClick: () => o(s.url),
        className: O(
          "flex items-center h-[44px] px-5 pl-14 cursor-pointer transition-colors hover:bg-[#2e2f32]",
          i && "bg-[#2e2f32]"
        ),
        children: /* @__PURE__ */ v(
          "span",
          {
            className: O(
              "text-sm font-normal",
              i ? "text-white font-medium" : "text-[#b4b4b4]"
            ),
            children: s.title
          }
        )
      },
      s.url
    );
  }) })
] }), Jl = L.forwardRef(
  ({ title: e, menus: t, selectedUrl: n, onMenuClick: r, headerSlot: o, className: s, ...i }, a) => {
    const [u, c] = Re([]);
    return /* @__PURE__ */ U(
      "div",
      {
        ref: a,
        className: O(
          "w-[280px] min-w-[280px] max-w-[280px] bg-[#2c2d30] flex flex-col text-white h-screen",
          s
        ),
        ...i,
        children: [
          o,
          e && !o && /* @__PURE__ */ v("div", { className: "px-5 py-4 border-b border-[#3a3b3e]", children: /* @__PURE__ */ v("h2", { className: "text-lg font-semibold text-white", children: e }) }),
          /* @__PURE__ */ v("div", { className: "flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#3a3b3e] scrollbar-track-transparent", children: /* @__PURE__ */ v(
            Wl,
            {
              type: "multiple",
              value: u,
              onValueChange: c,
              children: t.map((l) => /* @__PURE__ */ v(
                Ql,
                {
                  menu: l,
                  isOpen: u.includes(l.url),
                  isSelected: n === l.url,
                  selectedUrl: n,
                  onMenuClick: r
                },
                l.url
              ))
            }
          ) })
        ]
      }
    );
  }
);
Jl.displayName = "SideNavigation";
export {
  Ps as Button,
  ou as ChevronRightIcon,
  Ts as Combobox,
  Vc as DatePicker,
  Gc as DateRangePicker,
  Ft as Dropdown,
  ru as LoadingCircle,
  su as Popover,
  Tc as PopoverContent,
  Lc as PopoverMenuItem,
  iu as PopoverTrigger,
  wl as RadioGroup,
  Rl as RadioGroupItem,
  Ms as Select,
  Jl as SideNavigation,
  qc as Switch,
  Fc as Text,
  nt as TextInput,
  Es as buttonVariants,
  O as cn,
  ks as dropdownTriggerVariants,
  _c as popoverMenuItemVariants
};
//# sourceMappingURL=index.es.js.map
