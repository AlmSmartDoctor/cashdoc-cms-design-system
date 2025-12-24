import { jsx as p, jsxs as j, Fragment as mn } from "react/jsx-runtime";
import * as b from "react";
import C, { forwardRef as Mt, useState as ve, useRef as vt, useEffect as Pt, useLayoutEffect as xa, createContext as vc, useContext as wc, useCallback as Ae, useMemo as Pe, createElement as _r } from "react";
import * as ka from "react-dom";
import Ca from "react-dom";
function Ma(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (n = Ma(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function Sa() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++) (e = arguments[n]) && (t = Ma(e)) && (r && (r += " "), r += t);
  return r;
}
const Vr = "-", xc = (e) => {
  const t = Cc(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (s) => {
      const i = s.split(Vr);
      return i[0] === "" && i.length !== 1 && i.shift(), Na(i, t) || kc(s);
    },
    getConflictingClassGroupIds: (s, i) => {
      const l = n[s] || [];
      return i && r[s] ? [...l, ...r[s]] : l;
    }
  };
}, Na = (e, t) => {
  var s;
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], r = t.nextPart.get(n), o = r ? Na(e.slice(1), r) : void 0;
  if (o)
    return o;
  if (t.validators.length === 0)
    return;
  const a = e.join(Vr);
  return (s = t.validators.find(({
    validator: i
  }) => i(a))) == null ? void 0 : s.classGroupId;
}, Eo = /^\[(.+)\]$/, kc = (e) => {
  if (Eo.test(e)) {
    const t = Eo.exec(e)[1], n = t == null ? void 0 : t.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, Cc = (e) => {
  const {
    theme: t,
    prefix: n
  } = e, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return Sc(Object.entries(e.classGroups), n).forEach(([a, s]) => {
    Ir(s, r, a, t);
  }), r;
}, Ir = (e, t, n, r) => {
  e.forEach((o) => {
    if (typeof o == "string") {
      const a = o === "" ? t : Po(t, o);
      a.classGroupId = n;
      return;
    }
    if (typeof o == "function") {
      if (Mc(o)) {
        Ir(o(r), t, n, r);
        return;
      }
      t.validators.push({
        validator: o,
        classGroupId: n
      });
      return;
    }
    Object.entries(o).forEach(([a, s]) => {
      Ir(s, Po(t, a), n, r);
    });
  });
}, Po = (e, t) => {
  let n = e;
  return t.split(Vr).forEach((r) => {
    n.nextPart.has(r) || n.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(r);
  }), n;
}, Mc = (e) => e.isThemeGetter, Sc = (e, t) => t ? e.map(([n, r]) => {
  const o = r.map((a) => typeof a == "string" ? t + a : typeof a == "object" ? Object.fromEntries(Object.entries(a).map(([s, i]) => [t + s, i])) : a);
  return [n, o];
}) : e, Nc = (e) => {
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
}, Da = "!", Dc = (e) => {
  const {
    separator: t,
    experimentalParseClassName: n
  } = e, r = t.length === 1, o = t[0], a = t.length, s = (i) => {
    const l = [];
    let d = 0, u = 0, c;
    for (let y = 0; y < i.length; y++) {
      let g = i[y];
      if (d === 0) {
        if (g === o && (r || i.slice(y, y + a) === t)) {
          l.push(i.slice(u, y)), u = y + a;
          continue;
        }
        if (g === "/") {
          c = y;
          continue;
        }
      }
      g === "[" ? d++ : g === "]" && d--;
    }
    const f = l.length === 0 ? i : i.substring(u), m = f.startsWith(Da), v = m ? f.substring(1) : f, h = c && c > u ? c - u : void 0;
    return {
      modifiers: l,
      hasImportantModifier: m,
      baseClassName: v,
      maybePostfixModifierPosition: h
    };
  };
  return n ? (i) => n({
    className: i,
    parseClassName: s
  }) : s;
}, Oc = (e) => {
  if (e.length <= 1)
    return e;
  const t = [];
  let n = [];
  return e.forEach((r) => {
    r[0] === "[" ? (t.push(...n.sort(), r), n = []) : n.push(r);
  }), t.push(...n.sort()), t;
}, Ec = (e) => ({
  cache: Nc(e.cacheSize),
  parseClassName: Dc(e),
  ...xc(e)
}), Pc = /\s+/, Rc = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: r,
    getConflictingClassGroupIds: o
  } = t, a = [], s = e.trim().split(Pc);
  let i = "";
  for (let l = s.length - 1; l >= 0; l -= 1) {
    const d = s[l], {
      modifiers: u,
      hasImportantModifier: c,
      baseClassName: f,
      maybePostfixModifierPosition: m
    } = n(d);
    let v = !!m, h = r(v ? f.substring(0, m) : f);
    if (!h) {
      if (!v) {
        i = d + (i.length > 0 ? " " + i : i);
        continue;
      }
      if (h = r(f), !h) {
        i = d + (i.length > 0 ? " " + i : i);
        continue;
      }
      v = !1;
    }
    const y = Oc(u).join(":"), g = c ? y + Da : y, x = g + h;
    if (a.includes(x))
      continue;
    a.push(x);
    const w = o(h, v);
    for (let M = 0; M < w.length; ++M) {
      const S = w[M];
      a.push(g + S);
    }
    i = d + (i.length > 0 ? " " + i : i);
  }
  return i;
};
function Ac() {
  let e = 0, t, n, r = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = Oa(t)) && (r && (r += " "), r += n);
  return r;
}
const Oa = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (t = Oa(e[r])) && (n && (n += " "), n += t);
  return n;
};
function Tc(e, ...t) {
  let n, r, o, a = s;
  function s(l) {
    const d = t.reduce((u, c) => c(u), e());
    return n = Ec(d), r = n.cache.get, o = n.cache.set, a = i, i(l);
  }
  function i(l) {
    const d = r(l);
    if (d)
      return d;
    const u = Rc(l, n);
    return o(l, u), u;
  }
  return function() {
    return a(Ac.apply(null, arguments));
  };
}
const ie = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, Ea = /^\[(?:([a-z-]+):)?(.+)\]$/i, _c = /^\d+\/\d+$/, Ic = /* @__PURE__ */ new Set(["px", "full", "screen"]), Wc = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, $c = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Fc = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, Yc = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Bc = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, ot = (e) => Gt(e) || Ic.has(e) || _c.test(e), pt = (e) => Jt(e, "length", qc), Gt = (e) => !!e && !Number.isNaN(Number(e)), yr = (e) => Jt(e, "number", Gt), ln = (e) => !!e && Number.isInteger(Number(e)), zc = (e) => e.endsWith("%") && Gt(e.slice(0, -1)), Q = (e) => Ea.test(e), gt = (e) => Wc.test(e), Hc = /* @__PURE__ */ new Set(["length", "size", "percentage"]), Lc = (e) => Jt(e, Hc, Pa), jc = (e) => Jt(e, "position", Pa), Vc = /* @__PURE__ */ new Set(["image", "url"]), Gc = (e) => Jt(e, Vc, Kc), Uc = (e) => Jt(e, "", Xc), dn = () => !0, Jt = (e, t, n) => {
  const r = Ea.exec(e);
  return r ? r[1] ? typeof t == "string" ? r[1] === t : t.has(r[1]) : n(r[2]) : !1;
}, qc = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  $c.test(e) && !Fc.test(e)
), Pa = () => !1, Xc = (e) => Yc.test(e), Kc = (e) => Bc.test(e), Qc = () => {
  const e = ie("colors"), t = ie("spacing"), n = ie("blur"), r = ie("brightness"), o = ie("borderColor"), a = ie("borderRadius"), s = ie("borderSpacing"), i = ie("borderWidth"), l = ie("contrast"), d = ie("grayscale"), u = ie("hueRotate"), c = ie("invert"), f = ie("gap"), m = ie("gradientColorStops"), v = ie("gradientColorStopPositions"), h = ie("inset"), y = ie("margin"), g = ie("opacity"), x = ie("padding"), w = ie("saturate"), M = ie("scale"), S = ie("sepia"), k = ie("skew"), O = ie("space"), T = ie("translate"), B = () => ["auto", "contain", "none"], I = () => ["auto", "hidden", "clip", "visible", "scroll"], F = () => ["auto", Q, t], R = () => [Q, t], Y = () => ["", ot, pt], D = () => ["auto", Gt, Q], P = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], N = () => ["solid", "dashed", "dotted", "double", "none"], A = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], E = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], W = () => ["", "0", Q], $ = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], H = () => [Gt, Q];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [dn],
      spacing: [ot, pt],
      blur: ["none", "", gt, Q],
      brightness: H(),
      borderColor: [e],
      borderRadius: ["none", "", "full", gt, Q],
      borderSpacing: R(),
      borderWidth: Y(),
      contrast: H(),
      grayscale: W(),
      hueRotate: H(),
      invert: W(),
      gap: R(),
      gradientColorStops: [e],
      gradientColorStopPositions: [zc, pt],
      inset: F(),
      margin: F(),
      opacity: H(),
      padding: R(),
      saturate: H(),
      scale: H(),
      sepia: W(),
      skew: H(),
      space: R(),
      translate: R()
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
        columns: [gt]
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
        object: [...P(), Q]
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
        inset: [h]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [h]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [h]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [h]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [h]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [h]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [h]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [h]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [h]
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
        z: ["auto", ln, Q]
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
        order: ["first", "last", "none", ln, Q]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [dn]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", ln, Q]
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
        "grid-rows": [dn]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [ln, Q]
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
        m: [y]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [y]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [y]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [y]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [y]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [y]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [y]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [y]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [y]
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
          screen: [gt]
        }, gt]
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
        text: ["base", gt, pt]
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
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", yr]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [dn]
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
        "line-clamp": ["none", Gt, yr]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", ot, Q]
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
        "placeholder-opacity": [g]
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
        "text-opacity": [g]
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
        decoration: [...N(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", ot, pt]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", ot, Q]
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
        indent: R()
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
        "bg-opacity": [g]
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
        bg: [...P(), jc]
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
        bg: ["auto", "cover", "contain", Lc]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, Gc]
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
        from: [v]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [v]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [v]
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
        "border-opacity": [g]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...N(), "hidden"]
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
        "divide-opacity": [g]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: N()
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
        outline: ["", ...N()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [ot, Q]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [ot, pt]
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
        "ring-opacity": [g]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [ot, pt]
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
        shadow: ["", "inner", "none", gt, Uc]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [dn]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [g]
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
        contrast: [l]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", gt, Q]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [d]
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
        invert: [c]
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
        sepia: [S]
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
        "backdrop-contrast": [l]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": [d]
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
        "backdrop-invert": [c]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [g]
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
        "backdrop-sepia": [S]
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
        duration: H()
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
        delay: H()
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
        rotate: [ln, Q]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [T]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [T]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [k]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [k]
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
        "scroll-m": R()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": R()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": R()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": R()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": R()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": R()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": R()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": R()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": R()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": R()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": R()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": R()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": R()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": R()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": R()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": R()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": R()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": R()
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
        stroke: [ot, pt, yr]
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
}, Zc = /* @__PURE__ */ Tc(Qc);
function _(...e) {
  return Zc(Sa(e));
}
const Ro = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, Ao = Sa, ze = (e, t) => (n) => {
  var r;
  if ((t == null ? void 0 : t.variants) == null) return Ao(e, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
  const { variants: o, defaultVariants: a } = t, s = Object.keys(o).map((d) => {
    const u = n == null ? void 0 : n[d], c = a == null ? void 0 : a[d];
    if (u === null) return null;
    const f = Ro(u) || Ro(c);
    return o[d][f];
  }), i = n && Object.entries(n).reduce((d, u) => {
    let [c, f] = u;
    return f === void 0 || (d[c] = f), d;
  }, {}), l = t == null || (r = t.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((d, u) => {
    let { class: c, className: f, ...m } = u;
    return Object.entries(m).every((v) => {
      let [h, y] = v;
      return Array.isArray(y) ? y.includes({
        ...a,
        ...i
      }[h]) : {
        ...a,
        ...i
      }[h] === y;
    }) ? [
      ...d,
      c,
      f
    ] : d;
  }, []);
  return Ao(e, s, l, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
}, Jc = ze(
  _(
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
        secondary: _(
          "bg-cms-gray-300 text-cms-black",
          "hover:bg-cms-gray-200 hover:text-cms-gray-800"
        ),
        outline: _(
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
), xt = Mt(
  ({ className: e, variant: t, size: n, ...r }, o) => /* @__PURE__ */ p(
    "button",
    {
      className: _(Jc({ variant: t, size: n, className: e })),
      ref: o,
      ...r
    }
  )
);
xt.displayName = "Button";
const el = {
  sm: "h-4 w-4",
  md: "h-8 w-8",
  lg: "h-16 w-16"
};
function ly({ size: e = "lg", className: t }) {
  return /* @__PURE__ */ p("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ p(
    "div",
    {
      className: _(
        el[e],
        "animate-spin rounded-full",
        "border-2 border-cms-gray-500 border-b-transparent",
        t
      )
    }
  ) });
}
const tl = ze(
  _(
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
        default: _(
          "bg-default text-black border border-cms-outline",
          "hover:bg-cms-gray-200"
        ),
        outline: _(
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
), nl = ({
  className: e,
  isOpen: t
}) => /* @__PURE__ */ p(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "10",
    height: "6",
    viewBox: "0 0 10 6",
    fill: "none",
    className: _(
      "transition-transform duration-200",
      t && "rotate-180",
      e
    ),
    children: /* @__PURE__ */ p(
      "path",
      {
        d: "M8.75 0.75L4.57609 4.75L0.75 0.75",
        stroke: "currentColor",
        strokeWidth: "1.5",
        strokeLinecap: "round"
      }
    )
  }
), rl = ({ className: e }) => /* @__PURE__ */ p(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none",
    className: e,
    children: /* @__PURE__ */ p(
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
), Gr = Mt(
  ({
    options: e,
    value: t,
    placeholder: n = "선택하세요",
    onValueChange: r,
    disabled: o = !1,
    className: a,
    dropdownClassName: s,
    variant: i,
    size: l,
    searchable: d = !1,
    clearable: u = !1,
    multiple: c = !1,
    maxHeight: f = 200,
    ...m
  }, v) => {
    const [h, y] = ve(!1), [g, x] = ve(""), [w, M] = ve(
      c ? t ? [t] : [] : []
    ), S = vt(null), k = vt(null), O = e.find((D) => D.value === t), T = c ? w.length > 0 ? `${w.length}개 선택됨` : n : (O == null ? void 0 : O.label) || n, B = e.filter(
      (D) => D.label.toLowerCase().includes(g.toLowerCase())
    ), I = () => {
      o || (y(!h), x(""));
    }, F = (D) => {
      if (!D.disabled)
        if (c) {
          const P = w.includes(D.value) ? w.filter((N) => N !== D.value) : [...w, D.value];
          M(P), r == null || r(P.join(","));
        } else
          r == null || r(D.value), y(!1);
    }, R = (D) => {
      D.stopPropagation(), c && M([]), r == null || r("");
    }, Y = (D) => {
      D.key === "Escape" ? y(!1) : (D.key === "Enter" || D.key === " ") && (D.preventDefault(), I());
    };
    return Pt(() => {
      const D = (P) => {
        S.current && !S.current.contains(P.target) && y(!1);
      };
      return document.addEventListener("mousedown", D), () => document.removeEventListener("mousedown", D);
    }, []), Pt(() => {
      h && d && k.current && k.current.focus();
    }, [h, d]), /* @__PURE__ */ j("div", { ref: S, className: "relative w-full", children: [
      /* @__PURE__ */ j(
        "button",
        {
          ref: v,
          type: "button",
          className: _(
            tl({ variant: i, size: l }),
            o && "opacity-50 cursor-not-allowed",
            a
          ),
          onClick: I,
          onKeyDown: Y,
          disabled: o,
          "aria-expanded": h,
          "aria-haspopup": "listbox",
          ...m,
          children: [
            /* @__PURE__ */ p(
              "span",
              {
                className: _(
                  "truncate flex-1 text-left",
                  !O && !c && "text-cms-gray-400"
                ),
                children: T
              }
            ),
            /* @__PURE__ */ j("div", { className: "flex items-center gap-2 ml-3", children: [
              u && (t || w.length > 0) && /* @__PURE__ */ p(
                "button",
                {
                  type: "button",
                  className: _(
                    "p-1 rounded text-cms-gray-400 transition-colors",
                    "hover:text-cms-black"
                  ),
                  onClick: R,
                  "aria-label": "선택 취소",
                  children: /* @__PURE__ */ p(rl, { className: "w-3 h-3" })
                }
              ),
              /* @__PURE__ */ p(
                nl,
                {
                  isOpen: h,
                  className: "w-4 h-4 text-cms-gray-400"
                }
              )
            ] })
          ]
        }
      ),
      h && /* @__PURE__ */ j(
        "div",
        {
          className: _(
            "absolute z-50 mt-1 py-1 w-full",
            "rounded-lg border border-cms-gray-400",
            "bg-white shadow-lg",
            s
          ),
          style: { maxHeight: `${f}px` },
          children: [
            d && /* @__PURE__ */ p("div", { className: "px-3 py-2 border-b border-cms-gray-400", children: /* @__PURE__ */ p(
              "input",
              {
                ref: k,
                type: "text",
                value: g,
                onChange: (D) => x(D.target.value),
                placeholder: "검색...",
                className: _(
                  "w-full px-2 py-1 text-sm",
                  "rounded outline-none",
                  "border border-cms-gray-400",
                  "focus:ring-1 focus:ring-cms-black"
                )
              }
            ) }),
            /* @__PURE__ */ p("div", { className: "max-h-48 overflow-y-auto", children: B.length === 0 ? /* @__PURE__ */ p("div", { className: "px-3 py-2 text-sm text-cms-gray-400 text-center", children: g ? "검색 결과가 없습니다" : "옵션이 없습니다" }) : B.map((D) => {
              const P = c ? w.includes(D.value) : t === D.value;
              return /* @__PURE__ */ j(
                "button",
                {
                  type: "button",
                  className: _(
                    "flex items-center justify-between gap-2",
                    "w-full px-3 py-2 ",
                    "text-left text-sm",
                    "transition-colors",
                    D.disabled ? "text-cms-gray-400 cursor-not-allowed" : "text-cms-black hover:bg-cms-gray-200 cursor-pointer",
                    P && "bg-cms-gray-400 font-medium"
                  ),
                  onClick: () => F(D),
                  disabled: D.disabled,
                  children: [
                    /* @__PURE__ */ p("span", { className: "truncate", children: D.label }),
                    P && /* @__PURE__ */ p(
                      "svg",
                      {
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "16",
                        height: "16",
                        viewBox: "0 0 16 16",
                        fill: "none",
                        className: "w-4 h-4 text-black shrink-0",
                        children: /* @__PURE__ */ p(
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
Gr.displayName = "Dropdown";
const ol = Mt(
  ({ label: e, helperText: t, error: n, required: r, className: o, ...a }, s) => /* @__PURE__ */ j("div", { className: _("space-y-1", o), children: [
    e && /* @__PURE__ */ j("label", { className: "block text-sm font-medium text-cms-black", children: [
      e,
      r && /* @__PURE__ */ p("span", { className: "text-cms-red-500 ml-1", children: "*" })
    ] }),
    /* @__PURE__ */ p(
      Gr,
      {
        ref: s,
        ...a,
        className: _(n && "border-cms-red-500 focus:ring-cms-red-500")
      }
    ),
    (t || n) && /* @__PURE__ */ p(
      "p",
      {
        className: _(
          "text-xs",
          n ? "text-cms-red-500" : "text-cms-gray-400"
        ),
        children: n || t
      }
    )
  ] })
);
ol.displayName = "Select";
const al = Mt(
  ({ options: e, loading: t = !1, createable: n = !1, onCreateOption: r, ...o }, a) => {
    const [s] = ve(""), i = e.filter(
      (u) => u.label.toLowerCase().includes(s.toLowerCase())
    ), l = i.some(
      (u) => u.label.toLowerCase() === s.toLowerCase()
    ), d = [
      ...i,
      ...n && s && !l ? [
        {
          value: `__create__${s}`,
          label: `"${s}" 생성`,
          disabled: !1
        }
      ] : []
    ];
    return /* @__PURE__ */ p(
      Gr,
      {
        ref: a,
        ...o,
        options: d,
        searchable: !0,
        dropdownClassName: _(t && "opacity-75", o.dropdownClassName),
        onValueChange: (u) => {
          var c;
          if (u.startsWith("__create__")) {
            const f = u.replace("__create__", "");
            r == null || r(f);
          } else
            (c = o.onValueChange) == null || c.call(o, u);
        }
      }
    );
  }
);
al.displayName = "Combobox";
function dy(e) {
  return /* @__PURE__ */ p(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "20",
      height: "20",
      viewBox: "0 0 20 20",
      fill: "none",
      ...e,
      children: /* @__PURE__ */ p(
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
function se(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(o) {
    if (e == null || e(o), n === !1 || !o.defaultPrevented)
      return t == null ? void 0 : t(o);
  };
}
function To(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function Ra(...e) {
  return (t) => {
    let n = !1;
    const r = e.map((o) => {
      const a = To(o, t);
      return !n && typeof a == "function" && (n = !0), a;
    });
    if (n)
      return () => {
        for (let o = 0; o < r.length; o++) {
          const a = r[o];
          typeof a == "function" ? a() : To(e[o], null);
        }
      };
  };
}
function de(...e) {
  return b.useCallback(Ra(...e), e);
}
function sl(e, t) {
  const n = b.createContext(t), r = (a) => {
    const { children: s, ...i } = a, l = b.useMemo(() => i, Object.values(i));
    return /* @__PURE__ */ p(n.Provider, { value: l, children: s });
  };
  r.displayName = e + "Provider";
  function o(a) {
    const s = b.useContext(n);
    if (s) return s;
    if (t !== void 0) return t;
    throw new Error(`\`${a}\` must be used within \`${e}\``);
  }
  return [r, o];
}
function He(e, t = []) {
  let n = [];
  function r(a, s) {
    const i = b.createContext(s), l = n.length;
    n = [...n, s];
    const d = (c) => {
      var g;
      const { scope: f, children: m, ...v } = c, h = ((g = f == null ? void 0 : f[e]) == null ? void 0 : g[l]) || i, y = b.useMemo(() => v, Object.values(v));
      return /* @__PURE__ */ p(h.Provider, { value: y, children: m });
    };
    d.displayName = a + "Provider";
    function u(c, f) {
      var h;
      const m = ((h = f == null ? void 0 : f[e]) == null ? void 0 : h[l]) || i, v = b.useContext(m);
      if (v) return v;
      if (s !== void 0) return s;
      throw new Error(`\`${c}\` must be used within \`${a}\``);
    }
    return [d, u];
  }
  const o = () => {
    const a = n.map((s) => b.createContext(s));
    return function(i) {
      const l = (i == null ? void 0 : i[e]) || a;
      return b.useMemo(
        () => ({ [`__scope${e}`]: { ...i, [e]: l } }),
        [i, l]
      );
    };
  };
  return o.scopeName = e, [r, il(o, ...t)];
}
function il(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((o) => ({
      useScope: o(),
      scopeName: o.scopeName
    }));
    return function(a) {
      const s = r.reduce((i, { useScope: l, scopeName: d }) => {
        const c = l(a)[`__scope${d}`];
        return { ...i, ...c };
      }, {});
      return b.useMemo(() => ({ [`__scope${t.scopeName}`]: s }), [s]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
// @__NO_SIDE_EFFECTS__
function hn(e) {
  const t = /* @__PURE__ */ cl(e), n = b.forwardRef((r, o) => {
    const { children: a, ...s } = r, i = b.Children.toArray(a), l = i.find(dl);
    if (l) {
      const d = l.props.children, u = i.map((c) => c === l ? b.Children.count(d) > 1 ? b.Children.only(null) : b.isValidElement(d) ? d.props.children : null : c);
      return /* @__PURE__ */ p(t, { ...s, ref: o, children: b.isValidElement(d) ? b.cloneElement(d, void 0, u) : null });
    }
    return /* @__PURE__ */ p(t, { ...s, ref: o, children: a });
  });
  return n.displayName = `${e}.Slot`, n;
}
// @__NO_SIDE_EFFECTS__
function cl(e) {
  const t = b.forwardRef((n, r) => {
    const { children: o, ...a } = n;
    if (b.isValidElement(o)) {
      const s = fl(o), i = ul(a, o.props);
      return o.type !== b.Fragment && (i.ref = r ? Ra(r, s) : s), b.cloneElement(o, i);
    }
    return b.Children.count(o) > 1 ? b.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var ll = Symbol("radix.slottable");
function dl(e) {
  return b.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === ll;
}
function ul(e, t) {
  const n = { ...t };
  for (const r in t) {
    const o = e[r], a = t[r];
    /^on[A-Z]/.test(r) ? o && a ? n[r] = (...i) => {
      const l = a(...i);
      return o(...i), l;
    } : o && (n[r] = o) : r === "style" ? n[r] = { ...o, ...a } : r === "className" && (n[r] = [o, a].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function fl(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var ml = [
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
], ne = ml.reduce((e, t) => {
  const n = /* @__PURE__ */ hn(`Primitive.${t}`), r = b.forwardRef((o, a) => {
    const { asChild: s, ...i } = o, l = s ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ p(l, { ...i, ref: a });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {});
function hl(e, t) {
  e && ka.flushSync(() => e.dispatchEvent(t));
}
function Rt(e) {
  const t = b.useRef(e);
  return b.useEffect(() => {
    t.current = e;
  }), b.useMemo(() => (...n) => {
    var r;
    return (r = t.current) == null ? void 0 : r.call(t, ...n);
  }, []);
}
function pl(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = Rt(e);
  b.useEffect(() => {
    const r = (o) => {
      o.key === "Escape" && n(o);
    };
    return t.addEventListener("keydown", r, { capture: !0 }), () => t.removeEventListener("keydown", r, { capture: !0 });
  }, [n, t]);
}
var gl = "DismissableLayer", Wr = "dismissableLayer.update", bl = "dismissableLayer.pointerDownOutside", yl = "dismissableLayer.focusOutside", _o, Aa = b.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), Ur = b.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: r,
      onPointerDownOutside: o,
      onFocusOutside: a,
      onInteractOutside: s,
      onDismiss: i,
      ...l
    } = e, d = b.useContext(Aa), [u, c] = b.useState(null), f = (u == null ? void 0 : u.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), [, m] = b.useState({}), v = de(t, (O) => c(O)), h = Array.from(d.layers), [y] = [...d.layersWithOutsidePointerEventsDisabled].slice(-1), g = h.indexOf(y), x = u ? h.indexOf(u) : -1, w = d.layersWithOutsidePointerEventsDisabled.size > 0, M = x >= g, S = xl((O) => {
      const T = O.target, B = [...d.branches].some((I) => I.contains(T));
      !M || B || (o == null || o(O), s == null || s(O), O.defaultPrevented || i == null || i());
    }, f), k = kl((O) => {
      const T = O.target;
      [...d.branches].some((I) => I.contains(T)) || (a == null || a(O), s == null || s(O), O.defaultPrevented || i == null || i());
    }, f);
    return pl((O) => {
      x === d.layers.size - 1 && (r == null || r(O), !O.defaultPrevented && i && (O.preventDefault(), i()));
    }, f), b.useEffect(() => {
      if (u)
        return n && (d.layersWithOutsidePointerEventsDisabled.size === 0 && (_o = f.body.style.pointerEvents, f.body.style.pointerEvents = "none"), d.layersWithOutsidePointerEventsDisabled.add(u)), d.layers.add(u), Io(), () => {
          n && d.layersWithOutsidePointerEventsDisabled.size === 1 && (f.body.style.pointerEvents = _o);
        };
    }, [u, f, n, d]), b.useEffect(() => () => {
      u && (d.layers.delete(u), d.layersWithOutsidePointerEventsDisabled.delete(u), Io());
    }, [u, d]), b.useEffect(() => {
      const O = () => m({});
      return document.addEventListener(Wr, O), () => document.removeEventListener(Wr, O);
    }, []), /* @__PURE__ */ p(
      ne.div,
      {
        ...l,
        ref: v,
        style: {
          pointerEvents: w ? M ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: se(e.onFocusCapture, k.onFocusCapture),
        onBlurCapture: se(e.onBlurCapture, k.onBlurCapture),
        onPointerDownCapture: se(
          e.onPointerDownCapture,
          S.onPointerDownCapture
        )
      }
    );
  }
);
Ur.displayName = gl;
var vl = "DismissableLayerBranch", wl = b.forwardRef((e, t) => {
  const n = b.useContext(Aa), r = b.useRef(null), o = de(t, r);
  return b.useEffect(() => {
    const a = r.current;
    if (a)
      return n.branches.add(a), () => {
        n.branches.delete(a);
      };
  }, [n.branches]), /* @__PURE__ */ p(ne.div, { ...e, ref: o });
});
wl.displayName = vl;
function xl(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = Rt(e), r = b.useRef(!1), o = b.useRef(() => {
  });
  return b.useEffect(() => {
    const a = (i) => {
      if (i.target && !r.current) {
        let l = function() {
          Ta(
            bl,
            n,
            d,
            { discrete: !0 }
          );
        };
        const d = { originalEvent: i };
        i.pointerType === "touch" ? (t.removeEventListener("click", o.current), o.current = l, t.addEventListener("click", o.current, { once: !0 })) : l();
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
function kl(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = Rt(e), r = b.useRef(!1);
  return b.useEffect(() => {
    const o = (a) => {
      a.target && !r.current && Ta(yl, n, { originalEvent: a }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o);
  }, [t, n]), {
    onFocusCapture: () => r.current = !0,
    onBlurCapture: () => r.current = !1
  };
}
function Io() {
  const e = new CustomEvent(Wr);
  document.dispatchEvent(e);
}
function Ta(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target, a = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && o.addEventListener(e, t, { once: !0 }), r ? hl(o, a) : o.dispatchEvent(a);
}
var vr = 0;
function _a() {
  b.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? Wo()), document.body.insertAdjacentElement("beforeend", e[1] ?? Wo()), vr++, () => {
      vr === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), vr--;
    };
  }, []);
}
function Wo() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var wr = "focusScope.autoFocusOnMount", xr = "focusScope.autoFocusOnUnmount", $o = { bubbles: !1, cancelable: !0 }, Cl = "FocusScope", qr = b.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: r = !1,
    onMountAutoFocus: o,
    onUnmountAutoFocus: a,
    ...s
  } = e, [i, l] = b.useState(null), d = Rt(o), u = Rt(a), c = b.useRef(null), f = de(t, (h) => l(h)), m = b.useRef({
    paused: !1,
    pause() {
      this.paused = !0;
    },
    resume() {
      this.paused = !1;
    }
  }).current;
  b.useEffect(() => {
    if (r) {
      let h = function(w) {
        if (m.paused || !i) return;
        const M = w.target;
        i.contains(M) ? c.current = M : yt(c.current, { select: !0 });
      }, y = function(w) {
        if (m.paused || !i) return;
        const M = w.relatedTarget;
        M !== null && (i.contains(M) || yt(c.current, { select: !0 }));
      }, g = function(w) {
        if (document.activeElement === document.body)
          for (const S of w)
            S.removedNodes.length > 0 && yt(i);
      };
      document.addEventListener("focusin", h), document.addEventListener("focusout", y);
      const x = new MutationObserver(g);
      return i && x.observe(i, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", h), document.removeEventListener("focusout", y), x.disconnect();
      };
    }
  }, [r, i, m.paused]), b.useEffect(() => {
    if (i) {
      Yo.add(m);
      const h = document.activeElement;
      if (!i.contains(h)) {
        const g = new CustomEvent(wr, $o);
        i.addEventListener(wr, d), i.dispatchEvent(g), g.defaultPrevented || (Ml(El(Ia(i)), { select: !0 }), document.activeElement === h && yt(i));
      }
      return () => {
        i.removeEventListener(wr, d), setTimeout(() => {
          const g = new CustomEvent(xr, $o);
          i.addEventListener(xr, u), i.dispatchEvent(g), g.defaultPrevented || yt(h ?? document.body, { select: !0 }), i.removeEventListener(xr, u), Yo.remove(m);
        }, 0);
      };
    }
  }, [i, d, u, m]);
  const v = b.useCallback(
    (h) => {
      if (!n && !r || m.paused) return;
      const y = h.key === "Tab" && !h.altKey && !h.ctrlKey && !h.metaKey, g = document.activeElement;
      if (y && g) {
        const x = h.currentTarget, [w, M] = Sl(x);
        w && M ? !h.shiftKey && g === M ? (h.preventDefault(), n && yt(w, { select: !0 })) : h.shiftKey && g === w && (h.preventDefault(), n && yt(M, { select: !0 })) : g === x && h.preventDefault();
      }
    },
    [n, r, m.paused]
  );
  return /* @__PURE__ */ p(ne.div, { tabIndex: -1, ...s, ref: f, onKeyDown: v });
});
qr.displayName = Cl;
function Ml(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if (yt(r, { select: t }), document.activeElement !== n) return;
}
function Sl(e) {
  const t = Ia(e), n = Fo(t, e), r = Fo(t.reverse(), e);
  return [n, r];
}
function Ia(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function Fo(e, t) {
  for (const n of e)
    if (!Nl(n, { upTo: t })) return n;
}
function Nl(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function Dl(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function yt(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && Dl(e) && t && e.select();
  }
}
var Yo = Ol();
function Ol() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && (n == null || n.pause()), e = Bo(e, t), e.unshift(t);
    },
    remove(t) {
      var n;
      e = Bo(e, t), (n = e[0]) == null || n.resume();
    }
  };
}
function Bo(e, t) {
  const n = [...e], r = n.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
function El(e) {
  return e.filter((t) => t.tagName !== "A");
}
var it = globalThis != null && globalThis.document ? b.useLayoutEffect : () => {
}, Pl = b[" useId ".trim().toString()] || (() => {
}), Rl = 0;
function Et(e) {
  const [t, n] = b.useState(Pl());
  return it(() => {
    n((r) => r ?? String(Rl++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
const Al = ["top", "right", "bottom", "left"], kt = Math.min, Ee = Math.max, Hn = Math.round, An = Math.floor, Ze = (e) => ({
  x: e,
  y: e
}), Tl = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, _l = {
  start: "end",
  end: "start"
};
function $r(e, t, n) {
  return Ee(e, kt(t, n));
}
function ct(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function lt(e) {
  return e.split("-")[0];
}
function en(e) {
  return e.split("-")[1];
}
function Xr(e) {
  return e === "x" ? "y" : "x";
}
function Kr(e) {
  return e === "y" ? "height" : "width";
}
const Il = /* @__PURE__ */ new Set(["top", "bottom"]);
function Ke(e) {
  return Il.has(lt(e)) ? "y" : "x";
}
function Qr(e) {
  return Xr(Ke(e));
}
function Wl(e, t, n) {
  n === void 0 && (n = !1);
  const r = en(e), o = Qr(e), a = Kr(o);
  let s = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[a] > t.floating[a] && (s = Ln(s)), [s, Ln(s)];
}
function $l(e) {
  const t = Ln(e);
  return [Fr(e), t, Fr(t)];
}
function Fr(e) {
  return e.replace(/start|end/g, (t) => _l[t]);
}
const zo = ["left", "right"], Ho = ["right", "left"], Fl = ["top", "bottom"], Yl = ["bottom", "top"];
function Bl(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? Ho : zo : t ? zo : Ho;
    case "left":
    case "right":
      return t ? Fl : Yl;
    default:
      return [];
  }
}
function zl(e, t, n, r) {
  const o = en(e);
  let a = Bl(lt(e), n === "start", r);
  return o && (a = a.map((s) => s + "-" + o), t && (a = a.concat(a.map(Fr)))), a;
}
function Ln(e) {
  return e.replace(/left|right|bottom|top/g, (t) => Tl[t]);
}
function Hl(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Wa(e) {
  return typeof e != "number" ? Hl(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function jn(e) {
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
function Lo(e, t, n) {
  let {
    reference: r,
    floating: o
  } = e;
  const a = Ke(t), s = Qr(t), i = Kr(s), l = lt(t), d = a === "y", u = r.x + r.width / 2 - o.width / 2, c = r.y + r.height / 2 - o.height / 2, f = r[i] / 2 - o[i] / 2;
  let m;
  switch (l) {
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
        y: c
      };
      break;
    case "left":
      m = {
        x: r.x - o.width,
        y: c
      };
      break;
    default:
      m = {
        x: r.x,
        y: r.y
      };
  }
  switch (en(t)) {
    case "start":
      m[s] -= f * (n && d ? -1 : 1);
      break;
    case "end":
      m[s] += f * (n && d ? -1 : 1);
      break;
  }
  return m;
}
const Ll = async (e, t, n) => {
  const {
    placement: r = "bottom",
    strategy: o = "absolute",
    middleware: a = [],
    platform: s
  } = n, i = a.filter(Boolean), l = await (s.isRTL == null ? void 0 : s.isRTL(t));
  let d = await s.getElementRects({
    reference: e,
    floating: t,
    strategy: o
  }), {
    x: u,
    y: c
  } = Lo(d, r, l), f = r, m = {}, v = 0;
  for (let h = 0; h < i.length; h++) {
    const {
      name: y,
      fn: g
    } = i[h], {
      x,
      y: w,
      data: M,
      reset: S
    } = await g({
      x: u,
      y: c,
      initialPlacement: r,
      placement: f,
      strategy: o,
      middlewareData: m,
      rects: d,
      platform: s,
      elements: {
        reference: e,
        floating: t
      }
    });
    u = x ?? u, c = w ?? c, m = {
      ...m,
      [y]: {
        ...m[y],
        ...M
      }
    }, S && v <= 50 && (v++, typeof S == "object" && (S.placement && (f = S.placement), S.rects && (d = S.rects === !0 ? await s.getElementRects({
      reference: e,
      floating: t,
      strategy: o
    }) : S.rects), {
      x: u,
      y: c
    } = Lo(d, f, l)), h = -1);
  }
  return {
    x: u,
    y: c,
    placement: f,
    strategy: o,
    middlewareData: m
  };
};
async function pn(e, t) {
  var n;
  t === void 0 && (t = {});
  const {
    x: r,
    y: o,
    platform: a,
    rects: s,
    elements: i,
    strategy: l
  } = e, {
    boundary: d = "clippingAncestors",
    rootBoundary: u = "viewport",
    elementContext: c = "floating",
    altBoundary: f = !1,
    padding: m = 0
  } = ct(t, e), v = Wa(m), y = i[f ? c === "floating" ? "reference" : "floating" : c], g = jn(await a.getClippingRect({
    element: (n = await (a.isElement == null ? void 0 : a.isElement(y))) == null || n ? y : y.contextElement || await (a.getDocumentElement == null ? void 0 : a.getDocumentElement(i.floating)),
    boundary: d,
    rootBoundary: u,
    strategy: l
  })), x = c === "floating" ? {
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
  }, S = jn(a.convertOffsetParentRelativeRectToViewportRelativeRect ? await a.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: i,
    rect: x,
    offsetParent: w,
    strategy: l
  }) : x);
  return {
    top: (g.top - S.top + v.top) / M.y,
    bottom: (S.bottom - g.bottom + v.bottom) / M.y,
    left: (g.left - S.left + v.left) / M.x,
    right: (S.right - g.right + v.right) / M.x
  };
}
const jl = (e) => ({
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
      middlewareData: l
    } = t, {
      element: d,
      padding: u = 0
    } = ct(e, t) || {};
    if (d == null)
      return {};
    const c = Wa(u), f = {
      x: n,
      y: r
    }, m = Qr(o), v = Kr(m), h = await s.getDimensions(d), y = m === "y", g = y ? "top" : "left", x = y ? "bottom" : "right", w = y ? "clientHeight" : "clientWidth", M = a.reference[v] + a.reference[m] - f[m] - a.floating[v], S = f[m] - a.reference[m], k = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(d));
    let O = k ? k[w] : 0;
    (!O || !await (s.isElement == null ? void 0 : s.isElement(k))) && (O = i.floating[w] || a.floating[v]);
    const T = M / 2 - S / 2, B = O / 2 - h[v] / 2 - 1, I = kt(c[g], B), F = kt(c[x], B), R = I, Y = O - h[v] - F, D = O / 2 - h[v] / 2 + T, P = $r(R, D, Y), N = !l.arrow && en(o) != null && D !== P && a.reference[v] / 2 - (D < R ? I : F) - h[v] / 2 < 0, A = N ? D < R ? D - R : D - Y : 0;
    return {
      [m]: f[m] + A,
      data: {
        [m]: P,
        centerOffset: D - P - A,
        ...N && {
          alignmentOffset: A
        }
      },
      reset: N
    };
  }
}), Vl = function(e) {
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
        platform: l,
        elements: d
      } = t, {
        mainAxis: u = !0,
        crossAxis: c = !0,
        fallbackPlacements: f,
        fallbackStrategy: m = "bestFit",
        fallbackAxisSideDirection: v = "none",
        flipAlignment: h = !0,
        ...y
      } = ct(e, t);
      if ((n = a.arrow) != null && n.alignmentOffset)
        return {};
      const g = lt(o), x = Ke(i), w = lt(i) === i, M = await (l.isRTL == null ? void 0 : l.isRTL(d.floating)), S = f || (w || !h ? [Ln(i)] : $l(i)), k = v !== "none";
      !f && k && S.push(...zl(i, h, v, M));
      const O = [i, ...S], T = await pn(t, y), B = [];
      let I = ((r = a.flip) == null ? void 0 : r.overflows) || [];
      if (u && B.push(T[g]), c) {
        const D = Wl(o, s, M);
        B.push(T[D[0]], T[D[1]]);
      }
      if (I = [...I, {
        placement: o,
        overflows: B
      }], !B.every((D) => D <= 0)) {
        var F, R;
        const D = (((F = a.flip) == null ? void 0 : F.index) || 0) + 1, P = O[D];
        if (P && (!(c === "alignment" ? x !== Ke(P) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        I.every((E) => Ke(E.placement) === x ? E.overflows[0] > 0 : !0)))
          return {
            data: {
              index: D,
              overflows: I
            },
            reset: {
              placement: P
            }
          };
        let N = (R = I.filter((A) => A.overflows[0] <= 0).sort((A, E) => A.overflows[1] - E.overflows[1])[0]) == null ? void 0 : R.placement;
        if (!N)
          switch (m) {
            case "bestFit": {
              var Y;
              const A = (Y = I.filter((E) => {
                if (k) {
                  const W = Ke(E.placement);
                  return W === x || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  W === "y";
                }
                return !0;
              }).map((E) => [E.placement, E.overflows.filter((W) => W > 0).reduce((W, $) => W + $, 0)]).sort((E, W) => E[1] - W[1])[0]) == null ? void 0 : Y[0];
              A && (N = A);
              break;
            }
            case "initialPlacement":
              N = i;
              break;
          }
        if (o !== N)
          return {
            reset: {
              placement: N
            }
          };
      }
      return {};
    }
  };
};
function jo(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function Vo(e) {
  return Al.some((t) => e[t] >= 0);
}
const Gl = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n
      } = t, {
        strategy: r = "referenceHidden",
        ...o
      } = ct(e, t);
      switch (r) {
        case "referenceHidden": {
          const a = await pn(t, {
            ...o,
            elementContext: "reference"
          }), s = jo(a, n.reference);
          return {
            data: {
              referenceHiddenOffsets: s,
              referenceHidden: Vo(s)
            }
          };
        }
        case "escaped": {
          const a = await pn(t, {
            ...o,
            altBoundary: !0
          }), s = jo(a, n.floating);
          return {
            data: {
              escapedOffsets: s,
              escaped: Vo(s)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, $a = /* @__PURE__ */ new Set(["left", "top"]);
async function Ul(e, t) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), s = lt(n), i = en(n), l = Ke(n) === "y", d = $a.has(s) ? -1 : 1, u = a && l ? -1 : 1, c = ct(t, e);
  let {
    mainAxis: f,
    crossAxis: m,
    alignmentAxis: v
  } = typeof c == "number" ? {
    mainAxis: c,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: c.mainAxis || 0,
    crossAxis: c.crossAxis || 0,
    alignmentAxis: c.alignmentAxis
  };
  return i && typeof v == "number" && (m = i === "end" ? v * -1 : v), l ? {
    x: m * u,
    y: f * d
  } : {
    x: f * d,
    y: m * u
  };
}
const ql = function(e) {
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
      } = t, l = await Ul(t, e);
      return s === ((n = i.offset) == null ? void 0 : n.placement) && (r = i.arrow) != null && r.alignmentOffset ? {} : {
        x: o + l.x,
        y: a + l.y,
        data: {
          ...l,
          placement: s
        }
      };
    }
  };
}, Xl = function(e) {
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
          fn: (y) => {
            let {
              x: g,
              y: x
            } = y;
            return {
              x: g,
              y: x
            };
          }
        },
        ...l
      } = ct(e, t), d = {
        x: n,
        y: r
      }, u = await pn(t, l), c = Ke(lt(o)), f = Xr(c);
      let m = d[f], v = d[c];
      if (a) {
        const y = f === "y" ? "top" : "left", g = f === "y" ? "bottom" : "right", x = m + u[y], w = m - u[g];
        m = $r(x, m, w);
      }
      if (s) {
        const y = c === "y" ? "top" : "left", g = c === "y" ? "bottom" : "right", x = v + u[y], w = v - u[g];
        v = $r(x, v, w);
      }
      const h = i.fn({
        ...t,
        [f]: m,
        [c]: v
      });
      return {
        ...h,
        data: {
          x: h.x - n,
          y: h.y - r,
          enabled: {
            [f]: a,
            [c]: s
          }
        }
      };
    }
  };
}, Kl = function(e) {
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
        mainAxis: l = !0,
        crossAxis: d = !0
      } = ct(e, t), u = {
        x: n,
        y: r
      }, c = Ke(o), f = Xr(c);
      let m = u[f], v = u[c];
      const h = ct(i, t), y = typeof h == "number" ? {
        mainAxis: h,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...h
      };
      if (l) {
        const w = f === "y" ? "height" : "width", M = a.reference[f] - a.floating[w] + y.mainAxis, S = a.reference[f] + a.reference[w] - y.mainAxis;
        m < M ? m = M : m > S && (m = S);
      }
      if (d) {
        var g, x;
        const w = f === "y" ? "width" : "height", M = $a.has(lt(o)), S = a.reference[c] - a.floating[w] + (M && ((g = s.offset) == null ? void 0 : g[c]) || 0) + (M ? 0 : y.crossAxis), k = a.reference[c] + a.reference[w] + (M ? 0 : ((x = s.offset) == null ? void 0 : x[c]) || 0) - (M ? y.crossAxis : 0);
        v < S ? v = S : v > k && (v = k);
      }
      return {
        [f]: m,
        [c]: v
      };
    }
  };
}, Ql = function(e) {
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
        apply: l = () => {
        },
        ...d
      } = ct(e, t), u = await pn(t, d), c = lt(o), f = en(o), m = Ke(o) === "y", {
        width: v,
        height: h
      } = a.floating;
      let y, g;
      c === "top" || c === "bottom" ? (y = c, g = f === (await (s.isRTL == null ? void 0 : s.isRTL(i.floating)) ? "start" : "end") ? "left" : "right") : (g = c, y = f === "end" ? "top" : "bottom");
      const x = h - u.top - u.bottom, w = v - u.left - u.right, M = kt(h - u[y], x), S = kt(v - u[g], w), k = !t.middlewareData.shift;
      let O = M, T = S;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (T = w), (r = t.middlewareData.shift) != null && r.enabled.y && (O = x), k && !f) {
        const I = Ee(u.left, 0), F = Ee(u.right, 0), R = Ee(u.top, 0), Y = Ee(u.bottom, 0);
        m ? T = v - 2 * (I !== 0 || F !== 0 ? I + F : Ee(u.left, u.right)) : O = h - 2 * (R !== 0 || Y !== 0 ? R + Y : Ee(u.top, u.bottom));
      }
      await l({
        ...t,
        availableWidth: T,
        availableHeight: O
      });
      const B = await s.getDimensions(i.floating);
      return v !== B.width || h !== B.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function qn() {
  return typeof window < "u";
}
function tn(e) {
  return Fa(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Re(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function et(e) {
  var t;
  return (t = (Fa(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Fa(e) {
  return qn() ? e instanceof Node || e instanceof Re(e).Node : !1;
}
function Ye(e) {
  return qn() ? e instanceof Element || e instanceof Re(e).Element : !1;
}
function Je(e) {
  return qn() ? e instanceof HTMLElement || e instanceof Re(e).HTMLElement : !1;
}
function Go(e) {
  return !qn() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Re(e).ShadowRoot;
}
const Zl = /* @__PURE__ */ new Set(["inline", "contents"]);
function vn(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: o
  } = Be(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !Zl.has(o);
}
const Jl = /* @__PURE__ */ new Set(["table", "td", "th"]);
function ed(e) {
  return Jl.has(tn(e));
}
const td = [":popover-open", ":modal"];
function Xn(e) {
  return td.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const nd = ["transform", "translate", "scale", "rotate", "perspective"], rd = ["transform", "translate", "scale", "rotate", "perspective", "filter"], od = ["paint", "layout", "strict", "content"];
function Zr(e) {
  const t = Jr(), n = Ye(e) ? Be(e) : e;
  return nd.some((r) => n[r] ? n[r] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || rd.some((r) => (n.willChange || "").includes(r)) || od.some((r) => (n.contain || "").includes(r));
}
function ad(e) {
  let t = Ct(e);
  for (; Je(t) && !Kt(t); ) {
    if (Zr(t))
      return t;
    if (Xn(t))
      return null;
    t = Ct(t);
  }
  return null;
}
function Jr() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const sd = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function Kt(e) {
  return sd.has(tn(e));
}
function Be(e) {
  return Re(e).getComputedStyle(e);
}
function Kn(e) {
  return Ye(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function Ct(e) {
  if (tn(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    Go(e) && e.host || // Fallback.
    et(e)
  );
  return Go(t) ? t.host : t;
}
function Ya(e) {
  const t = Ct(e);
  return Kt(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : Je(t) && vn(t) ? t : Ya(t);
}
function gn(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = Ya(e), a = o === ((r = e.ownerDocument) == null ? void 0 : r.body), s = Re(o);
  if (a) {
    const i = Yr(s);
    return t.concat(s, s.visualViewport || [], vn(o) ? o : [], i && n ? gn(i) : []);
  }
  return t.concat(o, gn(o, [], n));
}
function Yr(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function Ba(e) {
  const t = Be(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const o = Je(e), a = o ? e.offsetWidth : n, s = o ? e.offsetHeight : r, i = Hn(n) !== a || Hn(r) !== s;
  return i && (n = a, r = s), {
    width: n,
    height: r,
    $: i
  };
}
function eo(e) {
  return Ye(e) ? e : e.contextElement;
}
function Ut(e) {
  const t = eo(e);
  if (!Je(t))
    return Ze(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: o,
    $: a
  } = Ba(t);
  let s = (a ? Hn(n.width) : n.width) / r, i = (a ? Hn(n.height) : n.height) / o;
  return (!s || !Number.isFinite(s)) && (s = 1), (!i || !Number.isFinite(i)) && (i = 1), {
    x: s,
    y: i
  };
}
const id = /* @__PURE__ */ Ze(0);
function za(e) {
  const t = Re(e);
  return !Jr() || !t.visualViewport ? id : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function cd(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== Re(e) ? !1 : t;
}
function At(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), a = eo(e);
  let s = Ze(1);
  t && (r ? Ye(r) && (s = Ut(r)) : s = Ut(e));
  const i = cd(a, n, r) ? za(a) : Ze(0);
  let l = (o.left + i.x) / s.x, d = (o.top + i.y) / s.y, u = o.width / s.x, c = o.height / s.y;
  if (a) {
    const f = Re(a), m = r && Ye(r) ? Re(r) : r;
    let v = f, h = Yr(v);
    for (; h && r && m !== v; ) {
      const y = Ut(h), g = h.getBoundingClientRect(), x = Be(h), w = g.left + (h.clientLeft + parseFloat(x.paddingLeft)) * y.x, M = g.top + (h.clientTop + parseFloat(x.paddingTop)) * y.y;
      l *= y.x, d *= y.y, u *= y.x, c *= y.y, l += w, d += M, v = Re(h), h = Yr(v);
    }
  }
  return jn({
    width: u,
    height: c,
    x: l,
    y: d
  });
}
function Qn(e, t) {
  const n = Kn(e).scrollLeft;
  return t ? t.left + n : At(et(e)).left + n;
}
function Ha(e, t) {
  const n = e.getBoundingClientRect(), r = n.left + t.scrollLeft - Qn(e, n), o = n.top + t.scrollTop;
  return {
    x: r,
    y: o
  };
}
function ld(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: r,
    strategy: o
  } = e;
  const a = o === "fixed", s = et(r), i = t ? Xn(t.floating) : !1;
  if (r === s || i && a)
    return n;
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  }, d = Ze(1);
  const u = Ze(0), c = Je(r);
  if ((c || !c && !a) && ((tn(r) !== "body" || vn(s)) && (l = Kn(r)), Je(r))) {
    const m = At(r);
    d = Ut(r), u.x = m.x + r.clientLeft, u.y = m.y + r.clientTop;
  }
  const f = s && !c && !a ? Ha(s, l) : Ze(0);
  return {
    width: n.width * d.x,
    height: n.height * d.y,
    x: n.x * d.x - l.scrollLeft * d.x + u.x + f.x,
    y: n.y * d.y - l.scrollTop * d.y + u.y + f.y
  };
}
function dd(e) {
  return Array.from(e.getClientRects());
}
function ud(e) {
  const t = et(e), n = Kn(e), r = e.ownerDocument.body, o = Ee(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), a = Ee(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let s = -n.scrollLeft + Qn(e);
  const i = -n.scrollTop;
  return Be(r).direction === "rtl" && (s += Ee(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: a,
    x: s,
    y: i
  };
}
const Uo = 25;
function fd(e, t) {
  const n = Re(e), r = et(e), o = n.visualViewport;
  let a = r.clientWidth, s = r.clientHeight, i = 0, l = 0;
  if (o) {
    a = o.width, s = o.height;
    const u = Jr();
    (!u || u && t === "fixed") && (i = o.offsetLeft, l = o.offsetTop);
  }
  const d = Qn(r);
  if (d <= 0) {
    const u = r.ownerDocument, c = u.body, f = getComputedStyle(c), m = u.compatMode === "CSS1Compat" && parseFloat(f.marginLeft) + parseFloat(f.marginRight) || 0, v = Math.abs(r.clientWidth - c.clientWidth - m);
    v <= Uo && (a -= v);
  } else d <= Uo && (a += d);
  return {
    width: a,
    height: s,
    x: i,
    y: l
  };
}
const md = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function hd(e, t) {
  const n = At(e, !0, t === "fixed"), r = n.top + e.clientTop, o = n.left + e.clientLeft, a = Je(e) ? Ut(e) : Ze(1), s = e.clientWidth * a.x, i = e.clientHeight * a.y, l = o * a.x, d = r * a.y;
  return {
    width: s,
    height: i,
    x: l,
    y: d
  };
}
function qo(e, t, n) {
  let r;
  if (t === "viewport")
    r = fd(e, n);
  else if (t === "document")
    r = ud(et(e));
  else if (Ye(t))
    r = hd(t, n);
  else {
    const o = za(e);
    r = {
      x: t.x - o.x,
      y: t.y - o.y,
      width: t.width,
      height: t.height
    };
  }
  return jn(r);
}
function La(e, t) {
  const n = Ct(e);
  return n === t || !Ye(n) || Kt(n) ? !1 : Be(n).position === "fixed" || La(n, t);
}
function pd(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = gn(e, [], !1).filter((i) => Ye(i) && tn(i) !== "body"), o = null;
  const a = Be(e).position === "fixed";
  let s = a ? Ct(e) : e;
  for (; Ye(s) && !Kt(s); ) {
    const i = Be(s), l = Zr(s);
    !l && i.position === "fixed" && (o = null), (a ? !l && !o : !l && i.position === "static" && !!o && md.has(o.position) || vn(s) && !l && La(e, s)) ? r = r.filter((u) => u !== s) : o = i, s = Ct(s);
  }
  return t.set(e, r), r;
}
function gd(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = e;
  const s = [...n === "clippingAncestors" ? Xn(t) ? [] : pd(t, this._c) : [].concat(n), r], i = s[0], l = s.reduce((d, u) => {
    const c = qo(t, u, o);
    return d.top = Ee(c.top, d.top), d.right = kt(c.right, d.right), d.bottom = kt(c.bottom, d.bottom), d.left = Ee(c.left, d.left), d;
  }, qo(t, i, o));
  return {
    width: l.right - l.left,
    height: l.bottom - l.top,
    x: l.left,
    y: l.top
  };
}
function bd(e) {
  const {
    width: t,
    height: n
  } = Ba(e);
  return {
    width: t,
    height: n
  };
}
function yd(e, t, n) {
  const r = Je(t), o = et(t), a = n === "fixed", s = At(e, !0, a, t);
  let i = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const l = Ze(0);
  function d() {
    l.x = Qn(o);
  }
  if (r || !r && !a)
    if ((tn(t) !== "body" || vn(o)) && (i = Kn(t)), r) {
      const m = At(t, !0, a, t);
      l.x = m.x + t.clientLeft, l.y = m.y + t.clientTop;
    } else o && d();
  a && !r && o && d();
  const u = o && !r && !a ? Ha(o, i) : Ze(0), c = s.left + i.scrollLeft - l.x - u.x, f = s.top + i.scrollTop - l.y - u.y;
  return {
    x: c,
    y: f,
    width: s.width,
    height: s.height
  };
}
function kr(e) {
  return Be(e).position === "static";
}
function Xo(e, t) {
  if (!Je(e) || Be(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return et(e) === n && (n = n.ownerDocument.body), n;
}
function ja(e, t) {
  const n = Re(e);
  if (Xn(e))
    return n;
  if (!Je(e)) {
    let o = Ct(e);
    for (; o && !Kt(o); ) {
      if (Ye(o) && !kr(o))
        return o;
      o = Ct(o);
    }
    return n;
  }
  let r = Xo(e, t);
  for (; r && ed(r) && kr(r); )
    r = Xo(r, t);
  return r && Kt(r) && kr(r) && !Zr(r) ? n : r || ad(e) || n;
}
const vd = async function(e) {
  const t = this.getOffsetParent || ja, n = this.getDimensions, r = await n(e.floating);
  return {
    reference: yd(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function wd(e) {
  return Be(e).direction === "rtl";
}
const xd = {
  convertOffsetParentRelativeRectToViewportRelativeRect: ld,
  getDocumentElement: et,
  getClippingRect: gd,
  getOffsetParent: ja,
  getElementRects: vd,
  getClientRects: dd,
  getDimensions: bd,
  getScale: Ut,
  isElement: Ye,
  isRTL: wd
};
function Va(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function kd(e, t) {
  let n = null, r;
  const o = et(e);
  function a() {
    var i;
    clearTimeout(r), (i = n) == null || i.disconnect(), n = null;
  }
  function s(i, l) {
    i === void 0 && (i = !1), l === void 0 && (l = 1), a();
    const d = e.getBoundingClientRect(), {
      left: u,
      top: c,
      width: f,
      height: m
    } = d;
    if (i || t(), !f || !m)
      return;
    const v = An(c), h = An(o.clientWidth - (u + f)), y = An(o.clientHeight - (c + m)), g = An(u), w = {
      rootMargin: -v + "px " + -h + "px " + -y + "px " + -g + "px",
      threshold: Ee(0, kt(1, l)) || 1
    };
    let M = !0;
    function S(k) {
      const O = k[0].intersectionRatio;
      if (O !== l) {
        if (!M)
          return s();
        O ? s(!1, O) : r = setTimeout(() => {
          s(!1, 1e-7);
        }, 1e3);
      }
      O === 1 && !Va(d, e.getBoundingClientRect()) && s(), M = !1;
    }
    try {
      n = new IntersectionObserver(S, {
        ...w,
        // Handle <iframe>s
        root: o.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(S, w);
    }
    n.observe(e);
  }
  return s(!0), a;
}
function Cd(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: a = !0,
    elementResize: s = typeof ResizeObserver == "function",
    layoutShift: i = typeof IntersectionObserver == "function",
    animationFrame: l = !1
  } = r, d = eo(e), u = o || a ? [...d ? gn(d) : [], ...gn(t)] : [];
  u.forEach((g) => {
    o && g.addEventListener("scroll", n, {
      passive: !0
    }), a && g.addEventListener("resize", n);
  });
  const c = d && i ? kd(d, n) : null;
  let f = -1, m = null;
  s && (m = new ResizeObserver((g) => {
    let [x] = g;
    x && x.target === d && m && (m.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
      var w;
      (w = m) == null || w.observe(t);
    })), n();
  }), d && !l && m.observe(d), m.observe(t));
  let v, h = l ? At(e) : null;
  l && y();
  function y() {
    const g = At(e);
    h && !Va(h, g) && n(), h = g, v = requestAnimationFrame(y);
  }
  return n(), () => {
    var g;
    u.forEach((x) => {
      o && x.removeEventListener("scroll", n), a && x.removeEventListener("resize", n);
    }), c == null || c(), (g = m) == null || g.disconnect(), m = null, l && cancelAnimationFrame(v);
  };
}
const Md = ql, Sd = Xl, Nd = Vl, Dd = Ql, Od = Gl, Ko = jl, Ed = Kl, Pd = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: xd,
    ...n
  }, a = {
    ...o.platform,
    _c: r
  };
  return Ll(e, t, {
    ...o,
    platform: a
  });
};
var Rd = typeof document < "u", Ad = function() {
}, Yn = Rd ? xa : Ad;
function Vn(e, t) {
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
        if (!Vn(e[r], t[r]))
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
      if (!(a === "_owner" && e.$$typeof) && !Vn(e[a], t[a]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function Ga(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Qo(e, t) {
  const n = Ga(e);
  return Math.round(t * n) / n;
}
function Cr(e) {
  const t = b.useRef(e);
  return Yn(() => {
    t.current = e;
  }), t;
}
function Td(e) {
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
    whileElementsMounted: l,
    open: d
  } = e, [u, c] = b.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [f, m] = b.useState(r);
  Vn(f, r) || m(r);
  const [v, h] = b.useState(null), [y, g] = b.useState(null), x = b.useCallback((E) => {
    E !== k.current && (k.current = E, h(E));
  }, []), w = b.useCallback((E) => {
    E !== O.current && (O.current = E, g(E));
  }, []), M = a || v, S = s || y, k = b.useRef(null), O = b.useRef(null), T = b.useRef(u), B = l != null, I = Cr(l), F = Cr(o), R = Cr(d), Y = b.useCallback(() => {
    if (!k.current || !O.current)
      return;
    const E = {
      placement: t,
      strategy: n,
      middleware: f
    };
    F.current && (E.platform = F.current), Pd(k.current, O.current, E).then((W) => {
      const $ = {
        ...W,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: R.current !== !1
      };
      D.current && !Vn(T.current, $) && (T.current = $, ka.flushSync(() => {
        c($);
      }));
    });
  }, [f, t, n, F, R]);
  Yn(() => {
    d === !1 && T.current.isPositioned && (T.current.isPositioned = !1, c((E) => ({
      ...E,
      isPositioned: !1
    })));
  }, [d]);
  const D = b.useRef(!1);
  Yn(() => (D.current = !0, () => {
    D.current = !1;
  }), []), Yn(() => {
    if (M && (k.current = M), S && (O.current = S), M && S) {
      if (I.current)
        return I.current(M, S, Y);
      Y();
    }
  }, [M, S, Y, I, B]);
  const P = b.useMemo(() => ({
    reference: k,
    floating: O,
    setReference: x,
    setFloating: w
  }), [x, w]), N = b.useMemo(() => ({
    reference: M,
    floating: S
  }), [M, S]), A = b.useMemo(() => {
    const E = {
      position: n,
      left: 0,
      top: 0
    };
    if (!N.floating)
      return E;
    const W = Qo(N.floating, u.x), $ = Qo(N.floating, u.y);
    return i ? {
      ...E,
      transform: "translate(" + W + "px, " + $ + "px)",
      ...Ga(N.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: W,
      top: $
    };
  }, [n, i, N.floating, u.x, u.y]);
  return b.useMemo(() => ({
    ...u,
    update: Y,
    refs: P,
    elements: N,
    floatingStyles: A
  }), [u, Y, P, N, A]);
}
const _d = (e) => {
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
      return r && t(r) ? r.current != null ? Ko({
        element: r.current,
        padding: o
      }).fn(n) : {} : r ? Ko({
        element: r,
        padding: o
      }).fn(n) : {};
    }
  };
}, Id = (e, t) => ({
  ...Md(e),
  options: [e, t]
}), Wd = (e, t) => ({
  ...Sd(e),
  options: [e, t]
}), $d = (e, t) => ({
  ...Ed(e),
  options: [e, t]
}), Fd = (e, t) => ({
  ...Nd(e),
  options: [e, t]
}), Yd = (e, t) => ({
  ...Dd(e),
  options: [e, t]
}), Bd = (e, t) => ({
  ...Od(e),
  options: [e, t]
}), zd = (e, t) => ({
  ..._d(e),
  options: [e, t]
});
var Hd = "Arrow", Ua = b.forwardRef((e, t) => {
  const { children: n, width: r = 10, height: o = 5, ...a } = e;
  return /* @__PURE__ */ p(
    ne.svg,
    {
      ...a,
      ref: t,
      width: r,
      height: o,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? n : /* @__PURE__ */ p("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
Ua.displayName = Hd;
var Ld = Ua;
function Zn(e) {
  const [t, n] = b.useState(void 0);
  return it(() => {
    if (e) {
      n({ width: e.offsetWidth, height: e.offsetHeight });
      const r = new ResizeObserver((o) => {
        if (!Array.isArray(o) || !o.length)
          return;
        const a = o[0];
        let s, i;
        if ("borderBoxSize" in a) {
          const l = a.borderBoxSize, d = Array.isArray(l) ? l[0] : l;
          s = d.inlineSize, i = d.blockSize;
        } else
          s = e.offsetWidth, i = e.offsetHeight;
        n({ width: s, height: i });
      });
      return r.observe(e, { box: "border-box" }), () => r.unobserve(e);
    } else
      n(void 0);
  }, [e]), t;
}
var to = "Popper", [qa, Xa] = He(to), [jd, Ka] = qa(to), Qa = (e) => {
  const { __scopePopper: t, children: n } = e, [r, o] = b.useState(null);
  return /* @__PURE__ */ p(jd, { scope: t, anchor: r, onAnchorChange: o, children: n });
};
Qa.displayName = to;
var Za = "PopperAnchor", Ja = b.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: r, ...o } = e, a = Ka(Za, n), s = b.useRef(null), i = de(t, s), l = b.useRef(null);
    return b.useEffect(() => {
      const d = l.current;
      l.current = (r == null ? void 0 : r.current) || s.current, d !== l.current && a.onAnchorChange(l.current);
    }), r ? null : /* @__PURE__ */ p(ne.div, { ...o, ref: i });
  }
);
Ja.displayName = Za;
var no = "PopperContent", [Vd, Gd] = qa(no), es = b.forwardRef(
  (e, t) => {
    var ue, Z, me, ae, ge, ye;
    const {
      __scopePopper: n,
      side: r = "bottom",
      sideOffset: o = 0,
      align: a = "center",
      alignOffset: s = 0,
      arrowPadding: i = 0,
      avoidCollisions: l = !0,
      collisionBoundary: d = [],
      collisionPadding: u = 0,
      sticky: c = "partial",
      hideWhenDetached: f = !1,
      updatePositionStrategy: m = "optimized",
      onPlaced: v,
      ...h
    } = e, y = Ka(no, n), [g, x] = b.useState(null), w = de(t, (Ne) => x(Ne)), [M, S] = b.useState(null), k = Zn(M), O = (k == null ? void 0 : k.width) ?? 0, T = (k == null ? void 0 : k.height) ?? 0, B = r + (a !== "center" ? "-" + a : ""), I = typeof u == "number" ? u : { top: 0, right: 0, bottom: 0, left: 0, ...u }, F = Array.isArray(d) ? d : [d], R = F.length > 0, Y = {
      padding: I,
      boundary: F.filter(qd),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: R
    }, { refs: D, floatingStyles: P, placement: N, isPositioned: A, middlewareData: E } = Td({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: B,
      whileElementsMounted: (...Ne) => Cd(...Ne, {
        animationFrame: m === "always"
      }),
      elements: {
        reference: y.anchor
      },
      middleware: [
        Id({ mainAxis: o + T, alignmentAxis: s }),
        l && Wd({
          mainAxis: !0,
          crossAxis: !1,
          limiter: c === "partial" ? $d() : void 0,
          ...Y
        }),
        l && Fd({ ...Y }),
        Yd({
          ...Y,
          apply: ({ elements: Ne, rects: ft, availableWidth: It, availableHeight: Wt }) => {
            const { width: nt, height: $t } = ft.reference, xe = Ne.floating.style;
            xe.setProperty("--radix-popper-available-width", `${It}px`), xe.setProperty("--radix-popper-available-height", `${Wt}px`), xe.setProperty("--radix-popper-anchor-width", `${nt}px`), xe.setProperty("--radix-popper-anchor-height", `${$t}px`);
          }
        }),
        M && zd({ element: M, padding: i }),
        Xd({ arrowWidth: O, arrowHeight: T }),
        f && Bd({ strategy: "referenceHidden", ...Y })
      ]
    }), [W, $] = rs(N), H = Rt(v);
    it(() => {
      A && (H == null || H());
    }, [A, H]);
    const ee = (ue = E.arrow) == null ? void 0 : ue.x, z = (Z = E.arrow) == null ? void 0 : Z.y, q = ((me = E.arrow) == null ? void 0 : me.centerOffset) !== 0, [K, ce] = b.useState();
    return it(() => {
      g && ce(window.getComputedStyle(g).zIndex);
    }, [g]), /* @__PURE__ */ p(
      "div",
      {
        ref: D.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...P,
          transform: A ? P.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: K,
          "--radix-popper-transform-origin": [
            (ae = E.transformOrigin) == null ? void 0 : ae.x,
            (ge = E.transformOrigin) == null ? void 0 : ge.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...((ye = E.hide) == null ? void 0 : ye.referenceHidden) && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: e.dir,
        children: /* @__PURE__ */ p(
          Vd,
          {
            scope: n,
            placedSide: W,
            onArrowChange: S,
            arrowX: ee,
            arrowY: z,
            shouldHideArrow: q,
            children: /* @__PURE__ */ p(
              ne.div,
              {
                "data-side": W,
                "data-align": $,
                ...h,
                ref: w,
                style: {
                  ...h.style,
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
es.displayName = no;
var ts = "PopperArrow", Ud = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, ns = b.forwardRef(function(t, n) {
  const { __scopePopper: r, ...o } = t, a = Gd(ts, r), s = Ud[a.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ p(
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
        children: /* @__PURE__ */ p(
          Ld,
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
ns.displayName = ts;
function qd(e) {
  return e !== null;
}
var Xd = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    var y, g, x;
    const { placement: n, rects: r, middlewareData: o } = t, s = ((y = o.arrow) == null ? void 0 : y.centerOffset) !== 0, i = s ? 0 : e.arrowWidth, l = s ? 0 : e.arrowHeight, [d, u] = rs(n), c = { start: "0%", center: "50%", end: "100%" }[u], f = (((g = o.arrow) == null ? void 0 : g.x) ?? 0) + i / 2, m = (((x = o.arrow) == null ? void 0 : x.y) ?? 0) + l / 2;
    let v = "", h = "";
    return d === "bottom" ? (v = s ? c : `${f}px`, h = `${-l}px`) : d === "top" ? (v = s ? c : `${f}px`, h = `${r.floating.height + l}px`) : d === "right" ? (v = `${-l}px`, h = s ? c : `${m}px`) : d === "left" && (v = `${r.floating.width + l}px`, h = s ? c : `${m}px`), { data: { x: v, y: h } };
  }
});
function rs(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var Kd = Qa, os = Ja, Qd = es, Zd = ns, Jd = "Portal", ro = b.forwardRef((e, t) => {
  var i;
  const { container: n, ...r } = e, [o, a] = b.useState(!1);
  it(() => a(!0), []);
  const s = n || o && ((i = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : i.body);
  return s ? Ca.createPortal(/* @__PURE__ */ p(ne.div, { ...r, ref: t }), s) : null;
});
ro.displayName = Jd;
function eu(e, t) {
  return b.useReducer((n, r) => t[n][r] ?? n, e);
}
var dt = (e) => {
  const { present: t, children: n } = e, r = tu(t), o = typeof n == "function" ? n({ present: r.isPresent }) : b.Children.only(n), a = de(r.ref, nu(o));
  return typeof n == "function" || r.isPresent ? b.cloneElement(o, { ref: a }) : null;
};
dt.displayName = "Presence";
function tu(e) {
  const [t, n] = b.useState(), r = b.useRef(null), o = b.useRef(e), a = b.useRef("none"), s = e ? "mounted" : "unmounted", [i, l] = eu(s, {
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
  return b.useEffect(() => {
    const d = Tn(r.current);
    a.current = i === "mounted" ? d : "none";
  }, [i]), it(() => {
    const d = r.current, u = o.current;
    if (u !== e) {
      const f = a.current, m = Tn(d);
      e ? l("MOUNT") : m === "none" || (d == null ? void 0 : d.display) === "none" ? l("UNMOUNT") : l(u && f !== m ? "ANIMATION_OUT" : "UNMOUNT"), o.current = e;
    }
  }, [e, l]), it(() => {
    if (t) {
      let d;
      const u = t.ownerDocument.defaultView ?? window, c = (m) => {
        const h = Tn(r.current).includes(CSS.escape(m.animationName));
        if (m.target === t && h && (l("ANIMATION_END"), !o.current)) {
          const y = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", d = u.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = y);
          });
        }
      }, f = (m) => {
        m.target === t && (a.current = Tn(r.current));
      };
      return t.addEventListener("animationstart", f), t.addEventListener("animationcancel", c), t.addEventListener("animationend", c), () => {
        u.clearTimeout(d), t.removeEventListener("animationstart", f), t.removeEventListener("animationcancel", c), t.removeEventListener("animationend", c);
      };
    } else
      l("ANIMATION_END");
  }, [t, l]), {
    isPresent: ["mounted", "unmountSuspended"].includes(i),
    ref: b.useCallback((d) => {
      r.current = d ? getComputedStyle(d) : null, n(d);
    }, [])
  };
}
function Tn(e) {
  return (e == null ? void 0 : e.animationName) || "none";
}
function nu(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var ru = b[" useInsertionEffect ".trim().toString()] || it;
function ut({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: r
}) {
  const [o, a, s] = ou({
    defaultProp: t,
    onChange: n
  }), i = e !== void 0, l = i ? e : o;
  {
    const u = b.useRef(e !== void 0);
    b.useEffect(() => {
      const c = u.current;
      c !== i && console.warn(
        `${r} is changing from ${c ? "controlled" : "uncontrolled"} to ${i ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), u.current = i;
    }, [i, r]);
  }
  const d = b.useCallback(
    (u) => {
      var c;
      if (i) {
        const f = au(u) ? u(e) : u;
        f !== e && ((c = s.current) == null || c.call(s, f));
      } else
        a(u);
    },
    [i, e, a, s]
  );
  return [l, d];
}
function ou({
  defaultProp: e,
  onChange: t
}) {
  const [n, r] = b.useState(e), o = b.useRef(n), a = b.useRef(t);
  return ru(() => {
    a.current = t;
  }, [t]), b.useEffect(() => {
    var s;
    o.current !== n && ((s = a.current) == null || s.call(a, n), o.current = n);
  }, [n, o]), [n, r, a];
}
function au(e) {
  return typeof e == "function";
}
var su = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, Bt = /* @__PURE__ */ new WeakMap(), _n = /* @__PURE__ */ new WeakMap(), In = {}, Mr = 0, as = function(e) {
  return e && (e.host || as(e.parentNode));
}, iu = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var r = as(n);
    return r && e.contains(r) ? r : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, cu = function(e, t, n, r) {
  var o = iu(t, Array.isArray(e) ? e : [e]);
  In[n] || (In[n] = /* @__PURE__ */ new WeakMap());
  var a = In[n], s = [], i = /* @__PURE__ */ new Set(), l = new Set(o), d = function(c) {
    !c || i.has(c) || (i.add(c), d(c.parentNode));
  };
  o.forEach(d);
  var u = function(c) {
    !c || l.has(c) || Array.prototype.forEach.call(c.children, function(f) {
      if (i.has(f))
        u(f);
      else
        try {
          var m = f.getAttribute(r), v = m !== null && m !== "false", h = (Bt.get(f) || 0) + 1, y = (a.get(f) || 0) + 1;
          Bt.set(f, h), a.set(f, y), s.push(f), h === 1 && v && _n.set(f, !0), y === 1 && f.setAttribute(n, "true"), v || f.setAttribute(r, "true");
        } catch (g) {
          console.error("aria-hidden: cannot operate on ", f, g);
        }
    });
  };
  return u(t), i.clear(), Mr++, function() {
    s.forEach(function(c) {
      var f = Bt.get(c) - 1, m = a.get(c) - 1;
      Bt.set(c, f), a.set(c, m), f || (_n.has(c) || c.removeAttribute(r), _n.delete(c)), m || c.removeAttribute(n);
    }), Mr--, Mr || (Bt = /* @__PURE__ */ new WeakMap(), Bt = /* @__PURE__ */ new WeakMap(), _n = /* @__PURE__ */ new WeakMap(), In = {});
  };
}, ss = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var r = Array.from(Array.isArray(e) ? e : [e]), o = su(e);
  return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live], script"))), cu(r, o, n, "aria-hidden")) : function() {
    return null;
  };
}, Ue = function() {
  return Ue = Object.assign || function(t) {
    for (var n, r = 1, o = arguments.length; r < o; r++) {
      n = arguments[r];
      for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (t[a] = n[a]);
    }
    return t;
  }, Ue.apply(this, arguments);
};
function is(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  return n;
}
function lu(e, t, n) {
  if (n || arguments.length === 2) for (var r = 0, o = t.length, a; r < o; r++)
    (a || !(r in t)) && (a || (a = Array.prototype.slice.call(t, 0, r)), a[r] = t[r]);
  return e.concat(a || Array.prototype.slice.call(t));
}
var Bn = "right-scroll-bar-position", zn = "width-before-scroll-bar", du = "with-scroll-bars-hidden", uu = "--removed-body-scroll-bar-size";
function Sr(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function fu(e, t) {
  var n = ve(function() {
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
var mu = typeof window < "u" ? b.useLayoutEffect : b.useEffect, Zo = /* @__PURE__ */ new WeakMap();
function hu(e, t) {
  var n = fu(null, function(r) {
    return e.forEach(function(o) {
      return Sr(o, r);
    });
  });
  return mu(function() {
    var r = Zo.get(n);
    if (r) {
      var o = new Set(r), a = new Set(e), s = n.current;
      o.forEach(function(i) {
        a.has(i) || Sr(i, null);
      }), a.forEach(function(i) {
        o.has(i) || Sr(i, s);
      });
    }
    Zo.set(n, e);
  }, [e]), n;
}
function pu(e) {
  return e;
}
function gu(e, t) {
  t === void 0 && (t = pu);
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
      var l = function() {
        var u = s;
        s = [], u.forEach(a);
      }, d = function() {
        return Promise.resolve().then(l);
      };
      d(), n = {
        push: function(u) {
          s.push(u), d();
        },
        filter: function(u) {
          return s = s.filter(u), n;
        }
      };
    }
  };
  return o;
}
function bu(e) {
  e === void 0 && (e = {});
  var t = gu(null);
  return t.options = Ue({ async: !0, ssr: !1 }, e), t;
}
var cs = function(e) {
  var t = e.sideCar, n = is(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = t.read();
  if (!r)
    throw new Error("Sidecar medium not found");
  return b.createElement(r, Ue({}, n));
};
cs.isSideCarExport = !0;
function yu(e, t) {
  return e.useMedium(t), cs;
}
var ls = bu(), Nr = function() {
}, Jn = b.forwardRef(function(e, t) {
  var n = b.useRef(null), r = b.useState({
    onScrollCapture: Nr,
    onWheelCapture: Nr,
    onTouchMoveCapture: Nr
  }), o = r[0], a = r[1], s = e.forwardProps, i = e.children, l = e.className, d = e.removeScrollBar, u = e.enabled, c = e.shards, f = e.sideCar, m = e.noRelative, v = e.noIsolation, h = e.inert, y = e.allowPinchZoom, g = e.as, x = g === void 0 ? "div" : g, w = e.gapMode, M = is(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), S = f, k = hu([n, t]), O = Ue(Ue({}, M), o);
  return b.createElement(
    b.Fragment,
    null,
    u && b.createElement(S, { sideCar: ls, removeScrollBar: d, shards: c, noRelative: m, noIsolation: v, inert: h, setCallbacks: a, allowPinchZoom: !!y, lockRef: n, gapMode: w }),
    s ? b.cloneElement(b.Children.only(i), Ue(Ue({}, O), { ref: k })) : b.createElement(x, Ue({}, O, { className: l, ref: k }), i)
  );
});
Jn.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
Jn.classNames = {
  fullWidth: zn,
  zeroRight: Bn
};
var vu = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function wu() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = vu();
  return t && e.setAttribute("nonce", t), e;
}
function xu(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function ku(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var Cu = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = wu()) && (xu(t, n), ku(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, Mu = function() {
  var e = Cu();
  return function(t, n) {
    b.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, ds = function() {
  var e = Mu(), t = function(n) {
    var r = n.styles, o = n.dynamic;
    return e(r, o), null;
  };
  return t;
}, Su = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, Dr = function(e) {
  return parseInt(e || "", 10) || 0;
}, Nu = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [Dr(n), Dr(r), Dr(o)];
}, Du = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return Su;
  var t = Nu(e), n = document.documentElement.clientWidth, r = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, r - n + t[2] - t[0])
  };
}, Ou = ds(), qt = "data-scroll-locked", Eu = function(e, t, n, r) {
  var o = e.left, a = e.top, s = e.right, i = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(du, ` {
   overflow: hidden `).concat(r, `;
   padding-right: `).concat(i, "px ").concat(r, `;
  }
  body[`).concat(qt, `] {
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
  
  .`).concat(Bn, ` {
    right: `).concat(i, "px ").concat(r, `;
  }
  
  .`).concat(zn, ` {
    margin-right: `).concat(i, "px ").concat(r, `;
  }
  
  .`).concat(Bn, " .").concat(Bn, ` {
    right: 0 `).concat(r, `;
  }
  
  .`).concat(zn, " .").concat(zn, ` {
    margin-right: 0 `).concat(r, `;
  }
  
  body[`).concat(qt, `] {
    `).concat(uu, ": ").concat(i, `px;
  }
`);
}, Jo = function() {
  var e = parseInt(document.body.getAttribute(qt) || "0", 10);
  return isFinite(e) ? e : 0;
}, Pu = function() {
  b.useEffect(function() {
    return document.body.setAttribute(qt, (Jo() + 1).toString()), function() {
      var e = Jo() - 1;
      e <= 0 ? document.body.removeAttribute(qt) : document.body.setAttribute(qt, e.toString());
    };
  }, []);
}, Ru = function(e) {
  var t = e.noRelative, n = e.noImportant, r = e.gapMode, o = r === void 0 ? "margin" : r;
  Pu();
  var a = b.useMemo(function() {
    return Du(o);
  }, [o]);
  return b.createElement(Ou, { styles: Eu(a, !t, o, n ? "" : "!important") });
}, Br = !1;
if (typeof window < "u")
  try {
    var Wn = Object.defineProperty({}, "passive", {
      get: function() {
        return Br = !0, !0;
      }
    });
    window.addEventListener("test", Wn, Wn), window.removeEventListener("test", Wn, Wn);
  } catch {
    Br = !1;
  }
var zt = Br ? { passive: !1 } : !1, Au = function(e) {
  return e.tagName === "TEXTAREA";
}, us = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !Au(e) && n[t] === "visible")
  );
}, Tu = function(e) {
  return us(e, "overflowY");
}, _u = function(e) {
  return us(e, "overflowX");
}, ea = function(e, t) {
  var n = t.ownerDocument, r = t;
  do {
    typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
    var o = fs(e, r);
    if (o) {
      var a = ms(e, r), s = a[1], i = a[2];
      if (s > i)
        return !0;
    }
    r = r.parentNode;
  } while (r && r !== n.body);
  return !1;
}, Iu = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, r = e.clientHeight;
  return [
    t,
    n,
    r
  ];
}, Wu = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, r = e.clientWidth;
  return [
    t,
    n,
    r
  ];
}, fs = function(e, t) {
  return e === "v" ? Tu(t) : _u(t);
}, ms = function(e, t) {
  return e === "v" ? Iu(t) : Wu(t);
}, $u = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, Fu = function(e, t, n, r, o) {
  var a = $u(e, window.getComputedStyle(t).direction), s = a * r, i = n.target, l = t.contains(i), d = !1, u = s > 0, c = 0, f = 0;
  do {
    if (!i)
      break;
    var m = ms(e, i), v = m[0], h = m[1], y = m[2], g = h - y - a * v;
    (v || g) && fs(e, i) && (c += g, f += v);
    var x = i.parentNode;
    i = x && x.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? x.host : x;
  } while (
    // portaled content
    !l && i !== document.body || // self content
    l && (t.contains(i) || t === i)
  );
  return (u && Math.abs(c) < 1 || !u && Math.abs(f) < 1) && (d = !0), d;
}, $n = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, ta = function(e) {
  return [e.deltaX, e.deltaY];
}, na = function(e) {
  return e && "current" in e ? e.current : e;
}, Yu = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, Bu = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, zu = 0, Ht = [];
function Hu(e) {
  var t = b.useRef([]), n = b.useRef([0, 0]), r = b.useRef(), o = b.useState(zu++)[0], a = b.useState(ds)[0], s = b.useRef(e);
  b.useEffect(function() {
    s.current = e;
  }, [e]), b.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var h = lu([e.lockRef.current], (e.shards || []).map(na), !0).filter(Boolean);
      return h.forEach(function(y) {
        return y.classList.add("allow-interactivity-".concat(o));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(o)), h.forEach(function(y) {
          return y.classList.remove("allow-interactivity-".concat(o));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var i = b.useCallback(function(h, y) {
    if ("touches" in h && h.touches.length === 2 || h.type === "wheel" && h.ctrlKey)
      return !s.current.allowPinchZoom;
    var g = $n(h), x = n.current, w = "deltaX" in h ? h.deltaX : x[0] - g[0], M = "deltaY" in h ? h.deltaY : x[1] - g[1], S, k = h.target, O = Math.abs(w) > Math.abs(M) ? "h" : "v";
    if ("touches" in h && O === "h" && k.type === "range")
      return !1;
    var T = ea(O, k);
    if (!T)
      return !0;
    if (T ? S = O : (S = O === "v" ? "h" : "v", T = ea(O, k)), !T)
      return !1;
    if (!r.current && "changedTouches" in h && (w || M) && (r.current = S), !S)
      return !0;
    var B = r.current || S;
    return Fu(B, y, h, B === "h" ? w : M);
  }, []), l = b.useCallback(function(h) {
    var y = h;
    if (!(!Ht.length || Ht[Ht.length - 1] !== a)) {
      var g = "deltaY" in y ? ta(y) : $n(y), x = t.current.filter(function(S) {
        return S.name === y.type && (S.target === y.target || y.target === S.shadowParent) && Yu(S.delta, g);
      })[0];
      if (x && x.should) {
        y.cancelable && y.preventDefault();
        return;
      }
      if (!x) {
        var w = (s.current.shards || []).map(na).filter(Boolean).filter(function(S) {
          return S.contains(y.target);
        }), M = w.length > 0 ? i(y, w[0]) : !s.current.noIsolation;
        M && y.cancelable && y.preventDefault();
      }
    }
  }, []), d = b.useCallback(function(h, y, g, x) {
    var w = { name: h, delta: y, target: g, should: x, shadowParent: Lu(g) };
    t.current.push(w), setTimeout(function() {
      t.current = t.current.filter(function(M) {
        return M !== w;
      });
    }, 1);
  }, []), u = b.useCallback(function(h) {
    n.current = $n(h), r.current = void 0;
  }, []), c = b.useCallback(function(h) {
    d(h.type, ta(h), h.target, i(h, e.lockRef.current));
  }, []), f = b.useCallback(function(h) {
    d(h.type, $n(h), h.target, i(h, e.lockRef.current));
  }, []);
  b.useEffect(function() {
    return Ht.push(a), e.setCallbacks({
      onScrollCapture: c,
      onWheelCapture: c,
      onTouchMoveCapture: f
    }), document.addEventListener("wheel", l, zt), document.addEventListener("touchmove", l, zt), document.addEventListener("touchstart", u, zt), function() {
      Ht = Ht.filter(function(h) {
        return h !== a;
      }), document.removeEventListener("wheel", l, zt), document.removeEventListener("touchmove", l, zt), document.removeEventListener("touchstart", u, zt);
    };
  }, []);
  var m = e.removeScrollBar, v = e.inert;
  return b.createElement(
    b.Fragment,
    null,
    v ? b.createElement(a, { styles: Bu(o) }) : null,
    m ? b.createElement(Ru, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function Lu(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const ju = yu(ls, Hu);
var oo = b.forwardRef(function(e, t) {
  return b.createElement(Jn, Ue({}, e, { ref: t, sideCar: ju }));
});
oo.classNames = Jn.classNames;
var er = "Popover", [hs] = He(er, [
  Xa
]), wn = Xa(), [Vu, St] = hs(er), ps = (e) => {
  const {
    __scopePopover: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: a,
    modal: s = !1
  } = e, i = wn(t), l = b.useRef(null), [d, u] = b.useState(!1), [c, f] = ut({
    prop: r,
    defaultProp: o ?? !1,
    onChange: a,
    caller: er
  });
  return /* @__PURE__ */ p(Kd, { ...i, children: /* @__PURE__ */ p(
    Vu,
    {
      scope: t,
      contentId: Et(),
      triggerRef: l,
      open: c,
      onOpenChange: f,
      onOpenToggle: b.useCallback(() => f((m) => !m), [f]),
      hasCustomAnchor: d,
      onCustomAnchorAdd: b.useCallback(() => u(!0), []),
      onCustomAnchorRemove: b.useCallback(() => u(!1), []),
      modal: s,
      children: n
    }
  ) });
};
ps.displayName = er;
var gs = "PopoverAnchor", Gu = b.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = St(gs, n), a = wn(n), { onCustomAnchorAdd: s, onCustomAnchorRemove: i } = o;
    return b.useEffect(() => (s(), () => i()), [s, i]), /* @__PURE__ */ p(os, { ...a, ...r, ref: t });
  }
);
Gu.displayName = gs;
var bs = "PopoverTrigger", ys = b.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = St(bs, n), a = wn(n), s = de(t, o.triggerRef), i = /* @__PURE__ */ p(
      ne.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": o.open,
        "aria-controls": o.contentId,
        "data-state": Cs(o.open),
        ...r,
        ref: s,
        onClick: se(e.onClick, o.onOpenToggle)
      }
    );
    return o.hasCustomAnchor ? i : /* @__PURE__ */ p(os, { asChild: !0, ...a, children: i });
  }
);
ys.displayName = bs;
var ao = "PopoverPortal", [Uu, qu] = hs(ao, {
  forceMount: void 0
}), vs = (e) => {
  const { __scopePopover: t, forceMount: n, children: r, container: o } = e, a = St(ao, t);
  return /* @__PURE__ */ p(Uu, { scope: t, forceMount: n, children: /* @__PURE__ */ p(dt, { present: n || a.open, children: /* @__PURE__ */ p(ro, { asChild: !0, container: o, children: r }) }) });
};
vs.displayName = ao;
var Qt = "PopoverContent", ws = b.forwardRef(
  (e, t) => {
    const n = qu(Qt, e.__scopePopover), { forceMount: r = n.forceMount, ...o } = e, a = St(Qt, e.__scopePopover);
    return /* @__PURE__ */ p(dt, { present: r || a.open, children: a.modal ? /* @__PURE__ */ p(Ku, { ...o, ref: t }) : /* @__PURE__ */ p(Qu, { ...o, ref: t }) });
  }
);
ws.displayName = Qt;
var Xu = /* @__PURE__ */ hn("PopoverContent.RemoveScroll"), Ku = b.forwardRef(
  (e, t) => {
    const n = St(Qt, e.__scopePopover), r = b.useRef(null), o = de(t, r), a = b.useRef(!1);
    return b.useEffect(() => {
      const s = r.current;
      if (s) return ss(s);
    }, []), /* @__PURE__ */ p(oo, { as: Xu, allowPinchZoom: !0, children: /* @__PURE__ */ p(
      xs,
      {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: se(e.onCloseAutoFocus, (s) => {
          var i;
          s.preventDefault(), a.current || (i = n.triggerRef.current) == null || i.focus();
        }),
        onPointerDownOutside: se(
          e.onPointerDownOutside,
          (s) => {
            const i = s.detail.originalEvent, l = i.button === 0 && i.ctrlKey === !0, d = i.button === 2 || l;
            a.current = d;
          },
          { checkForDefaultPrevented: !1 }
        ),
        onFocusOutside: se(
          e.onFocusOutside,
          (s) => s.preventDefault(),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
), Qu = b.forwardRef(
  (e, t) => {
    const n = St(Qt, e.__scopePopover), r = b.useRef(!1), o = b.useRef(!1);
    return /* @__PURE__ */ p(
      xs,
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
          var l, d;
          (l = e.onInteractOutside) == null || l.call(e, a), a.defaultPrevented || (r.current = !0, a.detail.originalEvent.type === "pointerdown" && (o.current = !0));
          const s = a.target;
          ((d = n.triggerRef.current) == null ? void 0 : d.contains(s)) && a.preventDefault(), a.detail.originalEvent.type === "focusin" && o.current && a.preventDefault();
        }
      }
    );
  }
), xs = b.forwardRef(
  (e, t) => {
    const {
      __scopePopover: n,
      trapFocus: r,
      onOpenAutoFocus: o,
      onCloseAutoFocus: a,
      disableOutsidePointerEvents: s,
      onEscapeKeyDown: i,
      onPointerDownOutside: l,
      onFocusOutside: d,
      onInteractOutside: u,
      ...c
    } = e, f = St(Qt, n), m = wn(n);
    return _a(), /* @__PURE__ */ p(
      qr,
      {
        asChild: !0,
        loop: !0,
        trapped: r,
        onMountAutoFocus: o,
        onUnmountAutoFocus: a,
        children: /* @__PURE__ */ p(
          Ur,
          {
            asChild: !0,
            disableOutsidePointerEvents: s,
            onInteractOutside: u,
            onEscapeKeyDown: i,
            onPointerDownOutside: l,
            onFocusOutside: d,
            onDismiss: () => f.onOpenChange(!1),
            children: /* @__PURE__ */ p(
              Qd,
              {
                "data-state": Cs(f.open),
                role: "dialog",
                id: f.contentId,
                ...m,
                ...c,
                ref: t,
                style: {
                  ...c.style,
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
), ks = "PopoverClose", Zu = b.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = St(ks, n);
    return /* @__PURE__ */ p(
      ne.button,
      {
        type: "button",
        ...r,
        ref: t,
        onClick: se(e.onClick, () => o.onOpenChange(!1))
      }
    );
  }
);
Zu.displayName = ks;
var Ju = "PopoverArrow", ef = b.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = wn(n);
    return /* @__PURE__ */ p(Zd, { ...o, ...r, ref: t });
  }
);
ef.displayName = Ju;
function Cs(e) {
  return e ? "open" : "closed";
}
var tr = ps, nr = ys, rr = vs, xn = ws;
const uy = tr, fy = nr, tf = Mt(({ className: e, align: t = "end", sideOffset: n = 8, ...r }, o) => /* @__PURE__ */ p(rr, { children: /* @__PURE__ */ p(
  xn,
  {
    ref: o,
    align: t,
    sideOffset: n,
    className: _(
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
tf.displayName = xn.displayName;
const nf = ze(
  _(
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
), rf = Mt(
  ({ className: e, variant: t, icon: n, children: r, ...o }, a) => /* @__PURE__ */ j(
    "button",
    {
      ref: a,
      className: _(nf({ variant: t }), e),
      ...o,
      children: [
        n && /* @__PURE__ */ p("span", { className: "shrink-0", children: n }),
        r
      ]
    }
  )
);
rf.displayName = "PopoverMenuItem";
const of = ze("cms-font-pretendard cms-text-black", {
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
}), af = C.forwardRef(
  ({
    className: e,
    variant: t,
    align: n,
    decoration: r,
    as: o = "p",
    children: a,
    ...s
  }, i) => /* @__PURE__ */ p(
    o,
    {
      className: _(of({ variant: t, align: n, decoration: r }), e),
      ref: i,
      ...s,
      children: a
    }
  )
);
af.displayName = "Text";
const ra = ze(
  _(
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
        default: _(
          "bg-cms-white ",
          "border-cms-gray-450",
          "focus:border-cms-gray-800",
          "disabled:bg-cms-gray-150",
          "disabled:text-cms-gray-400",
          "disabled:cursor-not-allowed"
        ),
        error: _(
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
), oa = ze("block text-md font-medium text-cms-black"), sf = ze(
  "block text-sm font-medium text-cms-red-400 mt-1"
), cf = ze(
  "block text-sm font-normal text-cms-gray-700 mt-1"
), lf = C.forwardRef(
  ({
    className: e,
    variant: t,
    fullWidth: n,
    label: r,
    required: o,
    error: a,
    errorMessage: s,
    helperText: i,
    showCharCount: l,
    maxLength: d,
    value: u,
    defaultValue: c,
    onChange: f,
    id: m,
    labelLayout: v = "vertical",
    labelWidth: h = "120px",
    ...y
  }, g) => {
    const [x, w] = C.useState(
      u || c || ""
    ), M = m || `input-${Math.random().toString(36).substr(2, 9)}`, S = a ? "error" : t, k = u !== void 0 ? u : x, O = (k == null ? void 0 : k.length) || 0, T = (F) => {
      u === void 0 && w(F.target.value), f == null || f(F);
    }, B = r || l && d, I = v === "horizontal";
    return /* @__PURE__ */ j("div", { className: _("w-full", !n && "w-auto"), children: [
      I && B ? /* @__PURE__ */ j("div", { className: "flex items-center gap-3", children: [
        r && /* @__PURE__ */ j(
          "label",
          {
            htmlFor: M,
            className: _(oa(), "mb-0 shrink-0"),
            style: { width: h },
            children: [
              r,
              o && /* @__PURE__ */ p("span", { className: "text-cms-red-400 ml-1", children: "*" })
            ]
          }
        ),
        /* @__PURE__ */ p("div", { className: "flex-1", children: /* @__PURE__ */ p(
          "input",
          {
            id: M,
            ref: g,
            className: _(
              ra({ variant: S, fullWidth: !0 }),
              e
            ),
            maxLength: d,
            value: u,
            defaultValue: c,
            onChange: T,
            required: o,
            ...y
          }
        ) }),
        l && d && /* @__PURE__ */ j("span", { className: "text-sm text-cms-gray-600 shrink-0", children: [
          O,
          " / ",
          d
        ] })
      ] }) : /* @__PURE__ */ j(mn, { children: [
        B && /* @__PURE__ */ j("div", { className: "flex justify-between items-center mb-2", children: [
          r ? /* @__PURE__ */ j("label", { htmlFor: M, className: oa(), children: [
            r,
            o && /* @__PURE__ */ p("span", { className: "text-cms-red-400 ml-1", children: "*" })
          ] }) : /* @__PURE__ */ p("div", {}),
          l && d && /* @__PURE__ */ j("span", { className: "text-sm text-cms-gray-600", children: [
            O,
            " / ",
            d
          ] })
        ] }),
        /* @__PURE__ */ p(
          "input",
          {
            id: M,
            ref: g,
            className: _(
              ra({ variant: S, fullWidth: n }),
              e
            ),
            maxLength: d,
            value: u,
            defaultValue: c,
            onChange: T,
            required: o,
            ...y
          }
        )
      ] }),
      a && s && /* @__PURE__ */ p("span", { className: sf(), children: s }),
      !a && i && /* @__PURE__ */ p("span", { className: cf(), children: i })
    ] });
  }
);
lf.displayName = "TextInput";
function df(e, t, n = "long") {
  return new Intl.DateTimeFormat("en-US", {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: "numeric",
    timeZone: e,
    timeZoneName: n
  }).format(t).split(/\s/g).slice(2).join(" ");
}
const Or = {}, un = {};
function Ot(e, t) {
  try {
    const r = (Or[e] || (Or[e] = new Intl.DateTimeFormat("en-US", {
      timeZone: e,
      timeZoneName: "longOffset"
    }).format))(t).split("GMT")[1];
    return r in un ? un[r] : aa(r, r.split(":"));
  } catch {
    if (e in un) return un[e];
    const n = e == null ? void 0 : e.match(uf);
    return n ? aa(e, n.slice(1)) : NaN;
  }
}
const uf = /([+-]\d\d):?(\d\d)?/;
function aa(e, t) {
  const n = +(t[0] || 0), r = +(t[1] || 0), o = +(t[2] || 0) / 60;
  return un[e] = n * 60 + r > 0 ? n * 60 + r + o : n * 60 - r - o;
}
class Qe extends Date {
  //#region static
  constructor(...t) {
    super(), t.length > 1 && typeof t[t.length - 1] == "string" && (this.timeZone = t.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(Ot(this.timeZone, this)) ? this.setTime(NaN) : t.length ? typeof t[0] == "number" && (t.length === 1 || t.length === 2 && typeof t[1] != "number") ? this.setTime(t[0]) : typeof t[0] == "string" ? this.setTime(+new Date(t[0])) : t[0] instanceof Date ? this.setTime(+t[0]) : (this.setTime(+new Date(...t)), Ms(this), zr(this)) : this.setTime(Date.now());
  }
  static tz(t, ...n) {
    return n.length ? new Qe(...n, t) : new Qe(Date.now(), t);
  }
  //#endregion
  //#region time zone
  withTimeZone(t) {
    return new Qe(+this, t);
  }
  getTimezoneOffset() {
    const t = -Ot(this.timeZone, this);
    return t > 0 ? Math.floor(t) : Math.ceil(t);
  }
  //#endregion
  //#region time
  setTime(t) {
    return Date.prototype.setTime.apply(this, arguments), zr(this), +this;
  }
  //#endregion
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new Qe(+new Date(t), this.timeZone);
  }
  //#endregion
}
const sa = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
  if (!sa.test(e)) return;
  const t = e.replace(sa, "$1UTC");
  Qe.prototype[t] && (e.startsWith("get") ? Qe.prototype[e] = function() {
    return this.internal[t]();
  } : (Qe.prototype[e] = function() {
    return Date.prototype[t].apply(this.internal, arguments), ff(this), +this;
  }, Qe.prototype[t] = function() {
    return Date.prototype[t].apply(this, arguments), zr(this), +this;
  }));
});
function zr(e) {
  e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - Math.round(-Ot(e.timeZone, e) * 60));
}
function ff(e) {
  Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), Ms(e);
}
function Ms(e) {
  const t = Ot(e.timeZone, e), n = t > 0 ? Math.floor(t) : Math.ceil(t), r = /* @__PURE__ */ new Date(+e);
  r.setUTCHours(r.getUTCHours() - 1);
  const o = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), a = -(/* @__PURE__ */ new Date(+r)).getTimezoneOffset(), s = o - a, i = Date.prototype.getHours.apply(e) !== e.internal.getUTCHours();
  s && i && e.internal.setUTCMinutes(e.internal.getUTCMinutes() + s);
  const l = o - n;
  l && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + l);
  const d = /* @__PURE__ */ new Date(+e);
  d.setUTCSeconds(0);
  const u = o > 0 ? d.getSeconds() : (d.getSeconds() - 60) % 60, c = Math.round(-(Ot(e.timeZone, e) * 60)) % 60;
  (c || u) && (e.internal.setUTCSeconds(e.internal.getUTCSeconds() + c), Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + c + u));
  const f = Ot(e.timeZone, e), m = f > 0 ? Math.floor(f) : Math.ceil(f), h = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - m, y = m !== n, g = h - l;
  if (y && g) {
    Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + g);
    const x = Ot(e.timeZone, e), w = x > 0 ? Math.floor(x) : Math.ceil(x), M = m - w;
    M && (e.internal.setUTCMinutes(e.internal.getUTCMinutes() + M), Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + M));
  }
}
class Ce extends Qe {
  //#region static
  static tz(t, ...n) {
    return n.length ? new Ce(...n, t) : new Ce(Date.now(), t);
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
    return `${t} GMT${n}${r}${o} (${df(this.timeZone, this)})`;
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
    return new Ce(+this, t);
  }
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new Ce(+new Date(t), this.timeZone);
  }
  //#endregion
}
const Ss = 6048e5, mf = 864e5, ia = Symbol.for("constructDateFrom");
function pe(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && ia in e ? e[ia](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function oe(e, t) {
  return pe(t || e, e);
}
function Ns(e, t, n) {
  const r = oe(e, n == null ? void 0 : n.in);
  return isNaN(t) ? pe(e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
function Ds(e, t, n) {
  const r = oe(e, n == null ? void 0 : n.in);
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
let hf = {};
function kn() {
  return hf;
}
function Zt(e, t) {
  var i, l, d, u;
  const n = kn(), r = (t == null ? void 0 : t.weekStartsOn) ?? ((l = (i = t == null ? void 0 : t.locale) == null ? void 0 : i.options) == null ? void 0 : l.weekStartsOn) ?? n.weekStartsOn ?? ((u = (d = n.locale) == null ? void 0 : d.options) == null ? void 0 : u.weekStartsOn) ?? 0, o = oe(e, t == null ? void 0 : t.in), a = o.getDay(), s = (a < r ? 7 : 0) + a - r;
  return o.setDate(o.getDate() - s), o.setHours(0, 0, 0, 0), o;
}
function bn(e, t) {
  return Zt(e, { ...t, weekStartsOn: 1 });
}
function Os(e, t) {
  const n = oe(e, t == null ? void 0 : t.in), r = n.getFullYear(), o = pe(n, 0);
  o.setFullYear(r + 1, 0, 4), o.setHours(0, 0, 0, 0);
  const a = bn(o), s = pe(n, 0);
  s.setFullYear(r, 0, 4), s.setHours(0, 0, 0, 0);
  const i = bn(s);
  return n.getTime() >= a.getTime() ? r + 1 : n.getTime() >= i.getTime() ? r : r - 1;
}
function ca(e) {
  const t = oe(e), n = new Date(
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
function nn(e, ...t) {
  const n = pe.bind(
    null,
    t.find((r) => typeof r == "object")
  );
  return t.map(n);
}
function yn(e, t) {
  const n = oe(e, t == null ? void 0 : t.in);
  return n.setHours(0, 0, 0, 0), n;
}
function so(e, t, n) {
  const [r, o] = nn(
    n == null ? void 0 : n.in,
    e,
    t
  ), a = yn(r), s = yn(o), i = +a - ca(a), l = +s - ca(s);
  return Math.round((i - l) / mf);
}
function pf(e, t) {
  const n = Os(e, t), r = pe(e, 0);
  return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), bn(r);
}
function gf(e, t, n) {
  return Ns(e, t * 7, n);
}
function bf(e, t, n) {
  return Ds(e, t * 12, n);
}
function yf(e, t) {
  let n, r = t == null ? void 0 : t.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = pe.bind(null, o));
    const a = oe(o, r);
    (!n || n < a || isNaN(+a)) && (n = a);
  }), pe(r, n || NaN);
}
function vf(e, t) {
  let n, r = t == null ? void 0 : t.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = pe.bind(null, o));
    const a = oe(o, r);
    (!n || n > a || isNaN(+a)) && (n = a);
  }), pe(r, n || NaN);
}
function wf(e, t, n) {
  const [r, o] = nn(
    n == null ? void 0 : n.in,
    e,
    t
  );
  return +yn(r) == +yn(o);
}
function Es(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function xf(e) {
  return !(!Es(e) && typeof e != "number" || isNaN(+oe(e)));
}
function Ps(e, t, n) {
  const [r, o] = nn(
    n == null ? void 0 : n.in,
    e,
    t
  ), a = r.getFullYear() - o.getFullYear(), s = r.getMonth() - o.getMonth();
  return a * 12 + s;
}
function kf(e, t) {
  const n = oe(e, t == null ? void 0 : t.in), r = n.getMonth();
  return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
function Rs(e, t) {
  const [n, r] = nn(e, t.start, t.end);
  return { start: n, end: r };
}
function Cf(e, t) {
  const { start: n, end: r } = Rs(t == null ? void 0 : t.in, e);
  let o = +n > +r;
  const a = o ? +n : +r, s = o ? r : n;
  s.setHours(0, 0, 0, 0), s.setDate(1);
  let i = 1;
  const l = [];
  for (; +s <= a; )
    l.push(pe(n, s)), s.setMonth(s.getMonth() + i);
  return o ? l.reverse() : l;
}
function Mf(e, t) {
  const n = oe(e, t == null ? void 0 : t.in);
  return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function Sf(e, t) {
  const n = oe(e, t == null ? void 0 : t.in), r = n.getFullYear();
  return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
function As(e, t) {
  const n = oe(e, t == null ? void 0 : t.in);
  return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function Nf(e, t) {
  const { start: n, end: r } = Rs(t == null ? void 0 : t.in, e);
  let o = +n > +r;
  const a = o ? +n : +r, s = o ? r : n;
  s.setHours(0, 0, 0, 0), s.setMonth(0, 1);
  let i = 1;
  const l = [];
  for (; +s <= a; )
    l.push(pe(n, s)), s.setFullYear(s.getFullYear() + i);
  return o ? l.reverse() : l;
}
function Ts(e, t) {
  var i, l, d, u;
  const n = kn(), r = (t == null ? void 0 : t.weekStartsOn) ?? ((l = (i = t == null ? void 0 : t.locale) == null ? void 0 : i.options) == null ? void 0 : l.weekStartsOn) ?? n.weekStartsOn ?? ((u = (d = n.locale) == null ? void 0 : d.options) == null ? void 0 : u.weekStartsOn) ?? 0, o = oe(e, t == null ? void 0 : t.in), a = o.getDay(), s = (a < r ? -7 : 0) + 6 - (a - r);
  return o.setDate(o.getDate() + s), o.setHours(23, 59, 59, 999), o;
}
function Df(e, t) {
  return Ts(e, { ...t, weekStartsOn: 1 });
}
const Of = {
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
}, Ef = (e, t, n) => {
  let r;
  const o = Of[e];
  return typeof o == "string" ? r = o : t === 1 ? r = o.one : r = o.other.replace("{{count}}", t.toString()), n != null && n.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
function Xt(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
const Pf = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, Rf = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, Af = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, Tf = {
  date: Xt({
    formats: Pf,
    defaultWidth: "full"
  }),
  time: Xt({
    formats: Rf,
    defaultWidth: "full"
  }),
  dateTime: Xt({
    formats: Af,
    defaultWidth: "full"
  })
}, _f = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, If = (e, t, n, r) => _f[e];
function qe(e) {
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
const Wf = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, $f = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, Ff = {
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
}, Yf = {
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
}, Bf = {
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
}, zf = {
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
}, Hf = (e, t) => {
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
}, Lf = {
  ordinalNumber: Hf,
  era: qe({
    values: Wf,
    defaultWidth: "wide"
  }),
  quarter: qe({
    values: $f,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: qe({
    values: Ff,
    defaultWidth: "wide"
  }),
  day: qe({
    values: Yf,
    defaultWidth: "wide"
  }),
  dayPeriod: qe({
    values: Bf,
    defaultWidth: "wide",
    formattingValues: zf,
    defaultFormattingWidth: "wide"
  })
};
function Xe(e) {
  return (t, n = {}) => {
    const r = n.width, o = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], a = t.match(o);
    if (!a)
      return null;
    const s = a[0], i = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], l = Array.isArray(i) ? Vf(i, (c) => c.test(s)) : (
      // [TODO] -- I challenge you to fix the type
      jf(i, (c) => c.test(s))
    );
    let d;
    d = e.valueCallback ? e.valueCallback(l) : l, d = n.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      n.valueCallback(d)
    ) : d;
    const u = t.slice(s.length);
    return { value: d, rest: u };
  };
}
function jf(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function Vf(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function _s(e) {
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
const Gf = /^(\d+)(th|st|nd|rd)?/i, Uf = /\d+/i, qf = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, Xf = {
  any: [/^b/i, /^(a|c)/i]
}, Kf = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, Qf = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Zf = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, Jf = {
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
}, em = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, tm = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, nm = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, rm = {
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
}, om = {
  ordinalNumber: _s({
    matchPattern: Gf,
    parsePattern: Uf,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: Xe({
    matchPatterns: qf,
    defaultMatchWidth: "wide",
    parsePatterns: Xf,
    defaultParseWidth: "any"
  }),
  quarter: Xe({
    matchPatterns: Kf,
    defaultMatchWidth: "wide",
    parsePatterns: Qf,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: Xe({
    matchPatterns: Zf,
    defaultMatchWidth: "wide",
    parsePatterns: Jf,
    defaultParseWidth: "any"
  }),
  day: Xe({
    matchPatterns: em,
    defaultMatchWidth: "wide",
    parsePatterns: tm,
    defaultParseWidth: "any"
  }),
  dayPeriod: Xe({
    matchPatterns: nm,
    defaultMatchWidth: "any",
    parsePatterns: rm,
    defaultParseWidth: "any"
  })
}, Vt = {
  code: "en-US",
  formatDistance: Ef,
  formatLong: Tf,
  formatRelative: If,
  localize: Lf,
  match: om,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function am(e, t) {
  const n = oe(e, t == null ? void 0 : t.in);
  return so(n, As(n)) + 1;
}
function io(e, t) {
  const n = oe(e, t == null ? void 0 : t.in), r = +bn(n) - +pf(n);
  return Math.round(r / Ss) + 1;
}
function Is(e, t) {
  var u, c, f, m;
  const n = oe(e, t == null ? void 0 : t.in), r = n.getFullYear(), o = kn(), a = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((c = (u = t == null ? void 0 : t.locale) == null ? void 0 : u.options) == null ? void 0 : c.firstWeekContainsDate) ?? o.firstWeekContainsDate ?? ((m = (f = o.locale) == null ? void 0 : f.options) == null ? void 0 : m.firstWeekContainsDate) ?? 1, s = pe((t == null ? void 0 : t.in) || e, 0);
  s.setFullYear(r + 1, 0, a), s.setHours(0, 0, 0, 0);
  const i = Zt(s, t), l = pe((t == null ? void 0 : t.in) || e, 0);
  l.setFullYear(r, 0, a), l.setHours(0, 0, 0, 0);
  const d = Zt(l, t);
  return +n >= +i ? r + 1 : +n >= +d ? r : r - 1;
}
function sm(e, t) {
  var i, l, d, u;
  const n = kn(), r = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((l = (i = t == null ? void 0 : t.locale) == null ? void 0 : i.options) == null ? void 0 : l.firstWeekContainsDate) ?? n.firstWeekContainsDate ?? ((u = (d = n.locale) == null ? void 0 : d.options) == null ? void 0 : u.firstWeekContainsDate) ?? 1, o = Is(e, t), a = pe((t == null ? void 0 : t.in) || e, 0);
  return a.setFullYear(o, 0, r), a.setHours(0, 0, 0, 0), Zt(a, t);
}
function co(e, t) {
  const n = oe(e, t == null ? void 0 : t.in), r = +Zt(n, t) - +sm(n, t);
  return Math.round(r / Ss) + 1;
}
function re(e, t) {
  const n = e < 0 ? "-" : "", r = Math.abs(e).toString().padStart(t, "0");
  return n + r;
}
const bt = {
  // Year
  y(e, t) {
    const n = e.getFullYear(), r = n > 0 ? n : 1 - n;
    return re(t === "yy" ? r % 100 : r, t.length);
  },
  // Month
  M(e, t) {
    const n = e.getMonth();
    return t === "M" ? String(n + 1) : re(n + 1, 2);
  },
  // Day of the month
  d(e, t) {
    return re(e.getDate(), t.length);
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
    return re(e.getHours() % 12 || 12, t.length);
  },
  // Hour [0-23]
  H(e, t) {
    return re(e.getHours(), t.length);
  },
  // Minute
  m(e, t) {
    return re(e.getMinutes(), t.length);
  },
  // Second
  s(e, t) {
    return re(e.getSeconds(), t.length);
  },
  // Fraction of second
  S(e, t) {
    const n = t.length, r = e.getMilliseconds(), o = Math.trunc(
      r * Math.pow(10, n - 3)
    );
    return re(o, t.length);
  }
}, Lt = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, la = {
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
    return bt.y(e, t);
  },
  // Local week-numbering year
  Y: function(e, t, n, r) {
    const o = Is(e, r), a = o > 0 ? o : 1 - o;
    if (t === "YY") {
      const s = a % 100;
      return re(s, 2);
    }
    return t === "Yo" ? n.ordinalNumber(a, { unit: "year" }) : re(a, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const n = Os(e);
    return re(n, t.length);
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
    return re(n, t.length);
  },
  // Quarter
  Q: function(e, t, n) {
    const r = Math.ceil((e.getMonth() + 1) / 3);
    switch (t) {
      case "Q":
        return String(r);
      case "QQ":
        return re(r, 2);
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
        return re(r, 2);
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
        return bt.M(e, t);
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
        return re(r + 1, 2);
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
    const o = co(e, r);
    return t === "wo" ? n.ordinalNumber(o, { unit: "week" }) : re(o, t.length);
  },
  // ISO week of year
  I: function(e, t, n) {
    const r = io(e);
    return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : re(r, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : bt.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const r = am(e);
    return t === "Do" ? n.ordinalNumber(r, { unit: "dayOfYear" }) : re(r, t.length);
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
        return re(a, 2);
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
        return re(a, t.length);
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
        return re(o, t.length);
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
    switch (r === 12 ? o = Lt.noon : r === 0 ? o = Lt.midnight : o = r / 12 >= 1 ? "pm" : "am", t) {
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
    switch (r >= 17 ? o = Lt.evening : r >= 12 ? o = Lt.afternoon : r >= 4 ? o = Lt.morning : o = Lt.night, t) {
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
    return bt.h(e, t);
  },
  // Hour [0-23]
  H: function(e, t, n) {
    return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : bt.H(e, t);
  },
  // Hour [0-11]
  K: function(e, t, n) {
    const r = e.getHours() % 12;
    return t === "Ko" ? n.ordinalNumber(r, { unit: "hour" }) : re(r, t.length);
  },
  // Hour [1-24]
  k: function(e, t, n) {
    let r = e.getHours();
    return r === 0 && (r = 24), t === "ko" ? n.ordinalNumber(r, { unit: "hour" }) : re(r, t.length);
  },
  // Minute
  m: function(e, t, n) {
    return t === "mo" ? n.ordinalNumber(e.getMinutes(), { unit: "minute" }) : bt.m(e, t);
  },
  // Second
  s: function(e, t, n) {
    return t === "so" ? n.ordinalNumber(e.getSeconds(), { unit: "second" }) : bt.s(e, t);
  },
  // Fraction of second
  S: function(e, t) {
    return bt.S(e, t);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(e, t, n) {
    const r = e.getTimezoneOffset();
    if (r === 0)
      return "Z";
    switch (t) {
      case "X":
        return ua(r);
      case "XXXX":
      case "XX":
        return Dt(r);
      case "XXXXX":
      case "XXX":
      default:
        return Dt(r, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      case "x":
        return ua(r);
      case "xxxx":
      case "xx":
        return Dt(r);
      case "xxxxx":
      case "xxx":
      default:
        return Dt(r, ":");
    }
  },
  // Timezone (GMT)
  O: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + da(r, ":");
      case "OOOO":
      default:
        return "GMT" + Dt(r, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + da(r, ":");
      case "zzzz":
      default:
        return "GMT" + Dt(r, ":");
    }
  },
  // Seconds timestamp
  t: function(e, t, n) {
    const r = Math.trunc(+e / 1e3);
    return re(r, t.length);
  },
  // Milliseconds timestamp
  T: function(e, t, n) {
    return re(+e, t.length);
  }
};
function da(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = Math.trunc(r / 60), a = r % 60;
  return a === 0 ? n + String(o) : n + String(o) + t + re(a, 2);
}
function ua(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + re(Math.abs(e) / 60, 2) : Dt(e, t);
}
function Dt(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = re(Math.trunc(r / 60), 2), a = re(r % 60, 2);
  return n + o + t + a;
}
const fa = (e, t) => {
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
}, Ws = (e, t) => {
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
}, im = (e, t) => {
  const n = e.match(/(P+)(p+)?/) || [], r = n[1], o = n[2];
  if (!o)
    return fa(e, t);
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
  return a.replace("{{date}}", fa(r, t)).replace("{{time}}", Ws(o, t));
}, cm = {
  p: Ws,
  P: im
}, lm = /^D+$/, dm = /^Y+$/, um = ["D", "DD", "YY", "YYYY"];
function fm(e) {
  return lm.test(e);
}
function mm(e) {
  return dm.test(e);
}
function hm(e, t, n) {
  const r = pm(e, t, n);
  if (console.warn(r), um.includes(e)) throw new RangeError(r);
}
function pm(e, t, n) {
  const r = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const gm = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, bm = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, ym = /^'([^]*?)'?$/, vm = /''/g, wm = /[a-zA-Z]/;
function fn(e, t, n) {
  var u, c, f, m, v, h, y, g;
  const r = kn(), o = (n == null ? void 0 : n.locale) ?? r.locale ?? Vt, a = (n == null ? void 0 : n.firstWeekContainsDate) ?? ((c = (u = n == null ? void 0 : n.locale) == null ? void 0 : u.options) == null ? void 0 : c.firstWeekContainsDate) ?? r.firstWeekContainsDate ?? ((m = (f = r.locale) == null ? void 0 : f.options) == null ? void 0 : m.firstWeekContainsDate) ?? 1, s = (n == null ? void 0 : n.weekStartsOn) ?? ((h = (v = n == null ? void 0 : n.locale) == null ? void 0 : v.options) == null ? void 0 : h.weekStartsOn) ?? r.weekStartsOn ?? ((g = (y = r.locale) == null ? void 0 : y.options) == null ? void 0 : g.weekStartsOn) ?? 0, i = oe(e, n == null ? void 0 : n.in);
  if (!xf(i))
    throw new RangeError("Invalid time value");
  let l = t.match(bm).map((x) => {
    const w = x[0];
    if (w === "p" || w === "P") {
      const M = cm[w];
      return M(x, o.formatLong);
    }
    return x;
  }).join("").match(gm).map((x) => {
    if (x === "''")
      return { isToken: !1, value: "'" };
    const w = x[0];
    if (w === "'")
      return { isToken: !1, value: xm(x) };
    if (la[w])
      return { isToken: !0, value: x };
    if (w.match(wm))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + w + "`"
      );
    return { isToken: !1, value: x };
  });
  o.localize.preprocessor && (l = o.localize.preprocessor(i, l));
  const d = {
    firstWeekContainsDate: a,
    weekStartsOn: s,
    locale: o
  };
  return l.map((x) => {
    if (!x.isToken) return x.value;
    const w = x.value;
    (!(n != null && n.useAdditionalWeekYearTokens) && mm(w) || !(n != null && n.useAdditionalDayOfYearTokens) && fm(w)) && hm(w, t, String(e));
    const M = la[w[0]];
    return M(i, w, o.localize, d);
  }).join("");
}
function xm(e) {
  const t = e.match(ym);
  return t ? t[1].replace(vm, "'") : e;
}
function km(e, t) {
  const n = oe(e, t == null ? void 0 : t.in), r = n.getFullYear(), o = n.getMonth(), a = pe(n, 0);
  return a.setFullYear(r, o + 1, 0), a.setHours(0, 0, 0, 0), a.getDate();
}
function Cm(e, t) {
  return oe(e, t == null ? void 0 : t.in).getMonth();
}
function Mm(e, t) {
  return oe(e, t == null ? void 0 : t.in).getFullYear();
}
function Sm(e, t) {
  return +oe(e) > +oe(t);
}
function Nm(e, t) {
  return +oe(e) < +oe(t);
}
function Dm(e, t, n) {
  const [r, o] = nn(
    n == null ? void 0 : n.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear() && r.getMonth() === o.getMonth();
}
function Om(e, t, n) {
  const [r, o] = nn(
    n == null ? void 0 : n.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear();
}
function Em(e, t, n) {
  const r = oe(e, n == null ? void 0 : n.in), o = r.getFullYear(), a = r.getDate(), s = pe(e, 0);
  s.setFullYear(o, t, 15), s.setHours(0, 0, 0, 0);
  const i = km(s);
  return r.setMonth(t, Math.min(a, i)), r;
}
function Pm(e, t, n) {
  const r = oe(e, n == null ? void 0 : n.in);
  return isNaN(+r) ? pe(e, NaN) : (r.setFullYear(t), r);
}
const ma = 5, Rm = 4;
function Am(e, t) {
  const n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, o = t.addDays(e, -r + 1), a = t.addDays(o, ma * 7 - 1);
  return t.getMonth(e) === t.getMonth(a) ? ma : Rm;
}
function $s(e, t) {
  const n = t.startOfMonth(e), r = n.getDay();
  return r === 1 ? n : r === 0 ? t.addDays(n, -1 * 6) : t.addDays(n, -1 * (r - 1));
}
function Tm(e, t) {
  const n = $s(e, t), r = Am(e, t);
  return t.addDays(n, r * 7 - 1);
}
const _m = {
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
}, Im = (e, t, n) => {
  let r;
  const o = _m[e];
  return typeof o == "string" ? r = o : t === 1 ? r = o.one : r = o.other.replace("{{count}}", t.toString()), n != null && n.addSuffix ? n.comparison && n.comparison > 0 ? r + " 후" : r + " 전" : r;
}, Wm = {
  full: "y년 M월 d일 EEEE",
  long: "y년 M월 d일",
  medium: "y.MM.dd",
  short: "y.MM.dd"
}, $m = {
  full: "a H시 mm분 ss초 zzzz",
  long: "a H:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
}, Fm = {
  full: "{{date}} {{time}}",
  long: "{{date}} {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
}, Ym = {
  date: Xt({
    formats: Wm,
    defaultWidth: "full"
  }),
  time: Xt({
    formats: $m,
    defaultWidth: "full"
  }),
  dateTime: Xt({
    formats: Fm,
    defaultWidth: "full"
  })
}, Bm = {
  lastWeek: "'지난' eeee p",
  yesterday: "'어제' p",
  today: "'오늘' p",
  tomorrow: "'내일' p",
  nextWeek: "'다음' eeee p",
  other: "P"
}, zm = (e, t, n, r) => Bm[e], Hm = {
  narrow: ["BC", "AD"],
  abbreviated: ["BC", "AD"],
  wide: ["기원전", "서기"]
}, Lm = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1분기", "2분기", "3분기", "4분기"]
}, jm = {
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
}, Vm = {
  narrow: ["일", "월", "화", "수", "목", "금", "토"],
  short: ["일", "월", "화", "수", "목", "금", "토"],
  abbreviated: ["일", "월", "화", "수", "목", "금", "토"],
  wide: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"]
}, Gm = {
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
}, Um = {
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
}, qm = (e, t) => {
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
}, Xm = {
  ordinalNumber: qm,
  era: qe({
    values: Hm,
    defaultWidth: "wide"
  }),
  quarter: qe({
    values: Lm,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: qe({
    values: jm,
    defaultWidth: "wide"
  }),
  day: qe({
    values: Vm,
    defaultWidth: "wide"
  }),
  dayPeriod: qe({
    values: Gm,
    defaultWidth: "wide",
    formattingValues: Um,
    defaultFormattingWidth: "wide"
  })
}, Km = /^(\d+)(일|번째)?/i, Qm = /\d+/i, Zm = {
  narrow: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(기원전|서기)/i
}, Jm = {
  any: [/^(bc|기원전)/i, /^(ad|서기)/i]
}, eh = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234]사?분기/i
}, th = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, nh = {
  narrow: /^(1[012]|[123456789])/,
  abbreviated: /^(1[012]|[123456789])월/i,
  wide: /^(1[012]|[123456789])월/i
}, rh = {
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
}, oh = {
  narrow: /^[일월화수목금토]/,
  short: /^[일월화수목금토]/,
  abbreviated: /^[일월화수목금토]/,
  wide: /^[일월화수목금토]요일/
}, ah = {
  any: [/^일/, /^월/, /^화/, /^수/, /^목/, /^금/, /^토/]
}, sh = {
  any: /^(am|pm|오전|오후|자정|정오|아침|저녁|밤)/i
}, ih = {
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
}, ch = {
  ordinalNumber: _s({
    matchPattern: Km,
    parsePattern: Qm,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: Xe({
    matchPatterns: Zm,
    defaultMatchWidth: "wide",
    parsePatterns: Jm,
    defaultParseWidth: "any"
  }),
  quarter: Xe({
    matchPatterns: eh,
    defaultMatchWidth: "wide",
    parsePatterns: th,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: Xe({
    matchPatterns: nh,
    defaultMatchWidth: "wide",
    parsePatterns: rh,
    defaultParseWidth: "any"
  }),
  day: Xe({
    matchPatterns: oh,
    defaultMatchWidth: "wide",
    parsePatterns: ah,
    defaultParseWidth: "any"
  }),
  dayPeriod: Xe({
    matchPatterns: sh,
    defaultMatchWidth: "any",
    parsePatterns: ih,
    defaultParseWidth: "any"
  })
}, lh = {
  code: "ko",
  formatDistance: Im,
  formatLong: Ym,
  formatRelative: zm,
  localize: Xm,
  match: ch,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
}, Fs = {
  ...Vt,
  labels: {
    labelDayButton: (e, t, n, r) => {
      let o;
      r && typeof r.format == "function" ? o = r.format.bind(r) : o = (s, i) => fn(s, i, { locale: Vt, ...n });
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
      return n && typeof n.format == "function" ? r = n.format.bind(n) : r = (o, a) => fn(o, a, { locale: Vt, ...t }), r(e, "LLLL yyyy");
    },
    labelGridcell: (e, t, n, r) => {
      let o;
      r && typeof r.format == "function" ? o = r.format.bind(r) : o = (s, i) => fn(s, i, { locale: Vt, ...n });
      let a = o(e, "PPPP");
      return t != null && t.today && (a = `Today, ${a}`), a;
    },
    labelNav: "Navigation bar",
    labelWeekNumberHeader: "Week Number",
    labelWeekday: (e, t, n) => {
      let r;
      return n && typeof n.format == "function" ? r = n.format.bind(n) : r = (o, a) => fn(o, a, { locale: Vt, ...t }), r(e, "cccc");
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
      return (r = this.overrides) != null && r.today ? this.overrides.today() : this.options.timeZone ? Ce.tz(this.options.timeZone) : new this.Date();
    }, this.newDate = (r, o, a) => {
      var s;
      return (s = this.overrides) != null && s.newDate ? this.overrides.newDate(r, o, a) : this.options.timeZone ? new Ce(r, o, a, this.options.timeZone) : new Date(r, o, a);
    }, this.addDays = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.addDays ? this.overrides.addDays(r, o) : Ns(r, o);
    }, this.addMonths = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.addMonths ? this.overrides.addMonths(r, o) : Ds(r, o);
    }, this.addWeeks = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.addWeeks ? this.overrides.addWeeks(r, o) : gf(r, o);
    }, this.addYears = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.addYears ? this.overrides.addYears(r, o) : bf(r, o);
    }, this.differenceInCalendarDays = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(r, o) : so(r, o);
    }, this.differenceInCalendarMonths = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(r, o) : Ps(r, o);
    }, this.eachMonthOfInterval = (r) => {
      var o;
      return (o = this.overrides) != null && o.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(r) : Cf(r);
    }, this.eachYearOfInterval = (r) => {
      var i;
      const o = (i = this.overrides) != null && i.eachYearOfInterval ? this.overrides.eachYearOfInterval(r) : Nf(r), a = new Set(o.map((l) => this.getYear(l)));
      if (a.size === o.length)
        return o;
      const s = [];
      return a.forEach((l) => {
        s.push(new Date(l, 0, 1));
      }), s;
    }, this.endOfBroadcastWeek = (r) => {
      var o;
      return (o = this.overrides) != null && o.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(r) : Tm(r, this);
    }, this.endOfISOWeek = (r) => {
      var o;
      return (o = this.overrides) != null && o.endOfISOWeek ? this.overrides.endOfISOWeek(r) : Df(r);
    }, this.endOfMonth = (r) => {
      var o;
      return (o = this.overrides) != null && o.endOfMonth ? this.overrides.endOfMonth(r) : kf(r);
    }, this.endOfWeek = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.endOfWeek ? this.overrides.endOfWeek(r, o) : Ts(r, this.options);
    }, this.endOfYear = (r) => {
      var o;
      return (o = this.overrides) != null && o.endOfYear ? this.overrides.endOfYear(r) : Sf(r);
    }, this.format = (r, o, a) => {
      var i;
      const s = (i = this.overrides) != null && i.format ? this.overrides.format(r, o, this.options) : fn(r, o, this.options);
      return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(s) : s;
    }, this.getISOWeek = (r) => {
      var o;
      return (o = this.overrides) != null && o.getISOWeek ? this.overrides.getISOWeek(r) : io(r);
    }, this.getMonth = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.getMonth ? this.overrides.getMonth(r, this.options) : Cm(r, this.options);
    }, this.getYear = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.getYear ? this.overrides.getYear(r, this.options) : Mm(r, this.options);
    }, this.getWeek = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.getWeek ? this.overrides.getWeek(r, this.options) : co(r, this.options);
    }, this.isAfter = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isAfter ? this.overrides.isAfter(r, o) : Sm(r, o);
    }, this.isBefore = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isBefore ? this.overrides.isBefore(r, o) : Nm(r, o);
    }, this.isDate = (r) => {
      var o;
      return (o = this.overrides) != null && o.isDate ? this.overrides.isDate(r) : Es(r);
    }, this.isSameDay = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isSameDay ? this.overrides.isSameDay(r, o) : wf(r, o);
    }, this.isSameMonth = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isSameMonth ? this.overrides.isSameMonth(r, o) : Dm(r, o);
    }, this.isSameYear = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isSameYear ? this.overrides.isSameYear(r, o) : Om(r, o);
    }, this.max = (r) => {
      var o;
      return (o = this.overrides) != null && o.max ? this.overrides.max(r) : yf(r);
    }, this.min = (r) => {
      var o;
      return (o = this.overrides) != null && o.min ? this.overrides.min(r) : vf(r);
    }, this.setMonth = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.setMonth ? this.overrides.setMonth(r, o) : Em(r, o);
    }, this.setYear = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.setYear ? this.overrides.setYear(r, o) : Pm(r, o);
    }, this.startOfBroadcastWeek = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(r, this) : $s(r, this);
    }, this.startOfDay = (r) => {
      var o;
      return (o = this.overrides) != null && o.startOfDay ? this.overrides.startOfDay(r) : yn(r);
    }, this.startOfISOWeek = (r) => {
      var o;
      return (o = this.overrides) != null && o.startOfISOWeek ? this.overrides.startOfISOWeek(r) : bn(r);
    }, this.startOfMonth = (r) => {
      var o;
      return (o = this.overrides) != null && o.startOfMonth ? this.overrides.startOfMonth(r) : Mf(r);
    }, this.startOfWeek = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.startOfWeek ? this.overrides.startOfWeek(r, this.options) : Zt(r, this.options);
    }, this.startOfYear = (r) => {
      var o;
      return (o = this.overrides) != null && o.startOfYear ? this.overrides.startOfYear(r) : As(r);
    }, this.options = { locale: Fs, ...t }, this.overrides = n;
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
const tt = new we();
class Ys {
  constructor(t, n, r = tt) {
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
class dh {
  constructor(t, n) {
    this.date = t, this.weeks = n;
  }
}
class uh {
  constructor(t, n) {
    this.days = n, this.weekNumber = t;
  }
}
function fh(e) {
  return C.createElement("button", { ...e });
}
function mh(e) {
  return C.createElement("span", { ...e });
}
function hh(e) {
  const { size: t = 24, orientation: n = "left", className: r } = e;
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: handled by the parent component
    C.createElement(
      "svg",
      { className: r, width: t, height: t, viewBox: "0 0 24 24" },
      n === "up" && C.createElement("polygon", { points: "6.77 17 12.5 11.43 18.24 17 20 15.28 12.5 8 5 15.28" }),
      n === "down" && C.createElement("polygon", { points: "6.77 8 12.5 13.57 18.24 8 20 9.72 12.5 17 5 9.72" }),
      n === "left" && C.createElement("polygon", { points: "16 18.112 9.81111111 12 16 5.87733333 14.0888889 4 6 12 14.0888889 20" }),
      n === "right" && C.createElement("polygon", { points: "8 18.112 14.18888889 12 8 5.87733333 9.91111111 4 18 12 9.91111111 20" })
    )
  );
}
function ph(e) {
  const { day: t, modifiers: n, ...r } = e;
  return C.createElement("td", { ...r });
}
function gh(e) {
  const { day: t, modifiers: n, ...r } = e, o = C.useRef(null);
  return C.useEffect(() => {
    var a;
    n.focused && ((a = o.current) == null || a.focus());
  }, [n.focused]), C.createElement("button", { ref: o, ...r });
}
var L;
(function(e) {
  e.Root = "root", e.Chevron = "chevron", e.Day = "day", e.DayButton = "day_button", e.CaptionLabel = "caption_label", e.Dropdowns = "dropdowns", e.Dropdown = "dropdown", e.DropdownRoot = "dropdown_root", e.Footer = "footer", e.MonthGrid = "month_grid", e.MonthCaption = "month_caption", e.MonthsDropdown = "months_dropdown", e.Month = "month", e.Months = "months", e.Nav = "nav", e.NextMonthButton = "button_next", e.PreviousMonthButton = "button_previous", e.Week = "week", e.Weeks = "weeks", e.Weekday = "weekday", e.Weekdays = "weekdays", e.WeekNumber = "week_number", e.WeekNumberHeader = "week_number_header", e.YearsDropdown = "years_dropdown";
})(L || (L = {}));
var le;
(function(e) {
  e.disabled = "disabled", e.hidden = "hidden", e.outside = "outside", e.focused = "focused", e.today = "today";
})(le || (le = {}));
var Fe;
(function(e) {
  e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})(Fe || (Fe = {}));
var Oe;
(function(e) {
  e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})(Oe || (Oe = {}));
function bh(e) {
  const { options: t, className: n, components: r, classNames: o, ...a } = e, s = [o[L.Dropdown], n].join(" "), i = t == null ? void 0 : t.find(({ value: l }) => l === a.value);
  return C.createElement(
    "span",
    { "data-disabled": a.disabled, className: o[L.DropdownRoot] },
    C.createElement(r.Select, { className: s, ...a }, t == null ? void 0 : t.map(({ value: l, label: d, disabled: u }) => C.createElement(r.Option, { key: l, value: l, disabled: u }, d))),
    C.createElement(
      "span",
      { className: o[L.CaptionLabel], "aria-hidden": !0 },
      i == null ? void 0 : i.label,
      C.createElement(r.Chevron, { orientation: "down", size: 18, className: o[L.Chevron] })
    )
  );
}
function yh(e) {
  return C.createElement("div", { ...e });
}
function vh(e) {
  return C.createElement("div", { ...e });
}
function wh(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return C.createElement("div", { ...r }, e.children);
}
function xh(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return C.createElement("div", { ...r });
}
function kh(e) {
  return C.createElement("table", { ...e });
}
function Ch(e) {
  return C.createElement("div", { ...e });
}
const Bs = vc(void 0);
function Cn() {
  const e = wc(Bs);
  if (e === void 0)
    throw new Error("useDayPicker() must be used within a custom component.");
  return e;
}
function Mh(e) {
  const { components: t } = Cn();
  return C.createElement(t.Dropdown, { ...e });
}
function Sh(e) {
  const { onPreviousClick: t, onNextClick: n, previousMonth: r, nextMonth: o, ...a } = e, { components: s, classNames: i, labels: { labelPrevious: l, labelNext: d } } = Cn(), u = Ae((f) => {
    o && (n == null || n(f));
  }, [o, n]), c = Ae((f) => {
    r && (t == null || t(f));
  }, [r, t]);
  return C.createElement(
    "nav",
    { ...a },
    C.createElement(
      s.PreviousMonthButton,
      { type: "button", className: i[L.PreviousMonthButton], tabIndex: r ? void 0 : -1, "aria-disabled": r ? void 0 : !0, "aria-label": l(r), onClick: c },
      C.createElement(s.Chevron, { disabled: r ? void 0 : !0, className: i[L.Chevron], orientation: "left" })
    ),
    C.createElement(
      s.NextMonthButton,
      { type: "button", className: i[L.NextMonthButton], tabIndex: o ? void 0 : -1, "aria-disabled": o ? void 0 : !0, "aria-label": d(o), onClick: u },
      C.createElement(s.Chevron, { disabled: o ? void 0 : !0, orientation: "right", className: i[L.Chevron] })
    )
  );
}
function Nh(e) {
  const { components: t } = Cn();
  return C.createElement(t.Button, { ...e });
}
function Dh(e) {
  return C.createElement("option", { ...e });
}
function Oh(e) {
  const { components: t } = Cn();
  return C.createElement(t.Button, { ...e });
}
function Eh(e) {
  const { rootRef: t, ...n } = e;
  return C.createElement("div", { ...n, ref: t });
}
function Ph(e) {
  return C.createElement("select", { ...e });
}
function Rh(e) {
  const { week: t, ...n } = e;
  return C.createElement("tr", { ...n });
}
function Ah(e) {
  return C.createElement("th", { ...e });
}
function Th(e) {
  return C.createElement(
    "thead",
    { "aria-hidden": !0 },
    C.createElement("tr", { ...e })
  );
}
function _h(e) {
  const { week: t, ...n } = e;
  return C.createElement("th", { ...n });
}
function Ih(e) {
  return C.createElement("th", { ...e });
}
function Wh(e) {
  return C.createElement("tbody", { ...e });
}
function $h(e) {
  const { components: t } = Cn();
  return C.createElement(t.Dropdown, { ...e });
}
const Fh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: fh,
  CaptionLabel: mh,
  Chevron: hh,
  Day: ph,
  DayButton: gh,
  Dropdown: bh,
  DropdownNav: yh,
  Footer: vh,
  Month: wh,
  MonthCaption: xh,
  MonthGrid: kh,
  Months: Ch,
  MonthsDropdown: Mh,
  Nav: Sh,
  NextMonthButton: Nh,
  Option: Dh,
  PreviousMonthButton: Oh,
  Root: Eh,
  Select: Ph,
  Week: Rh,
  WeekNumber: _h,
  WeekNumberHeader: Ih,
  Weekday: Ah,
  Weekdays: Th,
  Weeks: Wh,
  YearsDropdown: $h
}, Symbol.toStringTag, { value: "Module" }));
function at(e, t, n = !1, r = tt) {
  let { from: o, to: a } = e;
  const { differenceInCalendarDays: s, isSameDay: i } = r;
  return o && a ? (s(a, o) < 0 && ([o, a] = [a, o]), s(t, o) >= (n ? 1 : 0) && s(a, t) >= (n ? 1 : 0)) : !n && a ? i(a, t) : !n && o ? i(o, t) : !1;
}
function lo(e) {
  return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function or(e) {
  return !!(e && typeof e == "object" && "from" in e);
}
function uo(e) {
  return !!(e && typeof e == "object" && "after" in e);
}
function fo(e) {
  return !!(e && typeof e == "object" && "before" in e);
}
function zs(e) {
  return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function Hs(e, t) {
  return Array.isArray(e) && e.every(t.isDate);
}
function st(e, t, n = tt) {
  const r = Array.isArray(t) ? t : [t], { isSameDay: o, differenceInCalendarDays: a, isAfter: s } = n;
  return r.some((i) => {
    if (typeof i == "boolean")
      return i;
    if (n.isDate(i))
      return o(e, i);
    if (Hs(i, n))
      return i.some((l) => o(e, l));
    if (or(i))
      return at(i, e, !1, n);
    if (zs(i))
      return Array.isArray(i.dayOfWeek) ? i.dayOfWeek.includes(e.getDay()) : i.dayOfWeek === e.getDay();
    if (lo(i)) {
      const l = a(i.before, e), d = a(i.after, e), u = l > 0, c = d < 0;
      return s(i.before, i.after) ? c && u : u || c;
    }
    return uo(i) ? a(e, i.after) > 0 : fo(i) ? a(i.before, e) > 0 : typeof i == "function" ? i(e) : !1;
  });
}
function Yh(e, t, n, r, o) {
  const { disabled: a, hidden: s, modifiers: i, showOutsideDays: l, broadcastCalendar: d, today: u = o.today() } = t, { isSameDay: c, isSameMonth: f, startOfMonth: m, isBefore: v, endOfMonth: h, isAfter: y } = o, g = n && m(n), x = r && h(r), w = {
    [le.focused]: [],
    [le.outside]: [],
    [le.disabled]: [],
    [le.hidden]: [],
    [le.today]: []
  }, M = {};
  for (const S of e) {
    const { date: k, displayMonth: O } = S, T = !!(O && !f(k, O)), B = !!(g && v(k, g)), I = !!(x && y(k, x)), F = !!(a && st(k, a, o)), R = !!(s && st(k, s, o)) || B || I || // Broadcast calendar will show outside days as default
    !d && !l && T || d && l === !1 && T, Y = c(k, u);
    T && w.outside.push(S), F && w.disabled.push(S), R && w.hidden.push(S), Y && w.today.push(S), i && Object.keys(i).forEach((D) => {
      const P = i == null ? void 0 : i[D];
      P && st(k, P, o) && (M[D] ? M[D].push(S) : M[D] = [S]);
    });
  }
  return (S) => {
    const k = {
      [le.focused]: !1,
      [le.disabled]: !1,
      [le.hidden]: !1,
      [le.outside]: !1,
      [le.today]: !1
    }, O = {};
    for (const T in w) {
      const B = w[T];
      k[T] = B.some((I) => I === S);
    }
    for (const T in M)
      O[T] = M[T].some((B) => B === S);
    return {
      ...k,
      // custom modifiers should override all the previous ones
      ...O
    };
  };
}
function Bh(e, t, n = {}) {
  return Object.entries(e).filter(([, o]) => o === !0).reduce((o, [a]) => (n[a] ? o.push(n[a]) : t[le[a]] ? o.push(t[le[a]]) : t[Fe[a]] && o.push(t[Fe[a]]), o), [t[L.Day]]);
}
function zh(e) {
  return {
    ...Fh,
    ...e
  };
}
function Hh(e) {
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
function Lh() {
  const e = {};
  for (const t in L)
    e[L[t]] = `rdp-${L[t]}`;
  for (const t in le)
    e[le[t]] = `rdp-${le[t]}`;
  for (const t in Fe)
    e[Fe[t]] = `rdp-${Fe[t]}`;
  for (const t in Oe)
    e[Oe[t]] = `rdp-${Oe[t]}`;
  return e;
}
function Ls(e, t, n) {
  return (n ?? new we(t)).formatMonthYear(e);
}
const jh = Ls;
function Vh(e, t, n) {
  return (n ?? new we(t)).format(e, "d");
}
function Gh(e, t = tt) {
  return t.format(e, "LLLL");
}
function Uh(e, t, n) {
  return (n ?? new we(t)).format(e, "cccccc");
}
function qh(e, t = tt) {
  return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
function Xh() {
  return "";
}
function js(e, t = tt) {
  return t.format(e, "yyyy");
}
const Kh = js, Qh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  formatCaption: Ls,
  formatDay: Vh,
  formatMonthCaption: jh,
  formatMonthDropdown: Gh,
  formatWeekNumber: qh,
  formatWeekNumberHeader: Xh,
  formatWeekdayName: Uh,
  formatYearCaption: Kh,
  formatYearDropdown: js
}, Symbol.toStringTag, { value: "Module" }));
function Zh(e) {
  return e != null && e.formatMonthCaption && !e.formatCaption && (e.formatCaption = e.formatMonthCaption), e != null && e.formatYearCaption && !e.formatYearDropdown && (e.formatYearDropdown = e.formatYearCaption), {
    ...Qh,
    ...e
  };
}
function mo(e, t, n, r) {
  let o = (r ?? new we(n)).format(e, "PPPP");
  return t.today && (o = `Today, ${o}`), t.selected && (o = `${o}, selected`), o;
}
const Jh = mo;
function ho(e, t, n) {
  return (n ?? new we(t)).formatMonthYear(e);
}
const ep = ho;
function Vs(e, t, n, r) {
  let o = (r ?? new we(n)).format(e, "PPPP");
  return t != null && t.today && (o = `Today, ${o}`), o;
}
function Gs(e) {
  return "Choose the Month";
}
function Us() {
  return "";
}
const tp = "Go to the Next Month";
function qs(e, t) {
  return tp;
}
function Xs(e) {
  return "Go to the Previous Month";
}
function Ks(e, t, n) {
  return (n ?? new we(t)).format(e, "cccc");
}
function Qs(e, t) {
  return `Week ${e}`;
}
function Zs(e) {
  return "Week Number";
}
function Js(e) {
  return "Choose the Year";
}
const np = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  labelCaption: ep,
  labelDay: Jh,
  labelDayButton: mo,
  labelGrid: ho,
  labelGridcell: Vs,
  labelMonthDropdown: Gs,
  labelNav: Us,
  labelNext: qs,
  labelPrevious: Xs,
  labelWeekNumber: Qs,
  labelWeekNumberHeader: Zs,
  labelWeekday: Ks,
  labelYearDropdown: Js
}, Symbol.toStringTag, { value: "Module" })), $e = (e, t, n) => t || (n ? typeof n == "function" ? n : (...r) => n : e);
function rp(e, t) {
  var r;
  const n = ((r = t.locale) == null ? void 0 : r.labels) ?? {};
  return {
    ...np,
    ...e ?? {},
    labelDayButton: $e(mo, e == null ? void 0 : e.labelDayButton, n.labelDayButton),
    labelMonthDropdown: $e(Gs, e == null ? void 0 : e.labelMonthDropdown, n.labelMonthDropdown),
    labelNext: $e(qs, e == null ? void 0 : e.labelNext, n.labelNext),
    labelPrevious: $e(Xs, e == null ? void 0 : e.labelPrevious, n.labelPrevious),
    labelWeekNumber: $e(Qs, e == null ? void 0 : e.labelWeekNumber, n.labelWeekNumber),
    labelYearDropdown: $e(Js, e == null ? void 0 : e.labelYearDropdown, n.labelYearDropdown),
    labelGrid: $e(ho, e == null ? void 0 : e.labelGrid, n.labelGrid),
    labelGridcell: $e(Vs, e == null ? void 0 : e.labelGridcell, n.labelGridcell),
    labelNav: $e(Us, e == null ? void 0 : e.labelNav, n.labelNav),
    labelWeekNumberHeader: $e(Zs, e == null ? void 0 : e.labelWeekNumberHeader, n.labelWeekNumberHeader),
    labelWeekday: $e(Ks, e == null ? void 0 : e.labelWeekday, n.labelWeekday)
  };
}
function op(e, t, n, r, o) {
  const { startOfMonth: a, startOfYear: s, endOfYear: i, eachMonthOfInterval: l, getMonth: d } = o;
  return l({
    start: s(e),
    end: i(e)
  }).map((f) => {
    const m = r.formatMonthDropdown(f, o), v = d(f), h = t && f < a(t) || n && f > a(n) || !1;
    return { value: v, label: m, disabled: h };
  });
}
function ap(e, t = {}, n = {}) {
  let r = { ...t == null ? void 0 : t[L.Day] };
  return Object.entries(e).filter(([, o]) => o === !0).forEach(([o]) => {
    r = {
      ...r,
      ...n == null ? void 0 : n[o]
    };
  }), r;
}
function sp(e, t, n, r) {
  const o = r ?? e.today(), a = n ? e.startOfBroadcastWeek(o, e) : t ? e.startOfISOWeek(o) : e.startOfWeek(o), s = [];
  for (let i = 0; i < 7; i++) {
    const l = e.addDays(a, i);
    s.push(l);
  }
  return s;
}
function ip(e, t, n, r, o = !1) {
  if (!e || !t)
    return;
  const { startOfYear: a, endOfYear: s, eachYearOfInterval: i, getYear: l } = r, d = a(e), u = s(t), c = i({ start: d, end: u });
  return o && c.reverse(), c.map((f) => {
    const m = n.formatYearDropdown(f, r);
    return {
      value: l(f),
      label: m,
      disabled: !1
    };
  });
}
function cp(e, t = {}) {
  var i;
  const { weekStartsOn: n, locale: r } = t, o = n ?? ((i = r == null ? void 0 : r.options) == null ? void 0 : i.weekStartsOn) ?? 0, a = (l) => {
    const d = typeof l == "number" || typeof l == "string" ? new Date(l) : l;
    return new Ce(d.getFullYear(), d.getMonth(), d.getDate(), 12, 0, 0, e);
  }, s = (l) => {
    const d = a(l);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
  };
  return {
    today: () => a(Ce.tz(e)),
    newDate: (l, d, u) => new Ce(l, d, u, 12, 0, 0, e),
    startOfDay: (l) => a(l),
    startOfWeek: (l, d) => {
      const u = a(l), c = (d == null ? void 0 : d.weekStartsOn) ?? o, f = (u.getDay() - c + 7) % 7;
      return u.setDate(u.getDate() - f), u;
    },
    startOfISOWeek: (l) => {
      const d = a(l), u = (d.getDay() - 1 + 7) % 7;
      return d.setDate(d.getDate() - u), d;
    },
    startOfMonth: (l) => {
      const d = a(l);
      return d.setDate(1), d;
    },
    startOfYear: (l) => {
      const d = a(l);
      return d.setMonth(0, 1), d;
    },
    endOfWeek: (l, d) => {
      const u = a(l), m = ((((d == null ? void 0 : d.weekStartsOn) ?? o) + 6) % 7 - u.getDay() + 7) % 7;
      return u.setDate(u.getDate() + m), u;
    },
    endOfISOWeek: (l) => {
      const d = a(l), u = (7 - d.getDay()) % 7;
      return d.setDate(d.getDate() + u), d;
    },
    endOfMonth: (l) => {
      const d = a(l);
      return d.setMonth(d.getMonth() + 1, 0), d;
    },
    endOfYear: (l) => {
      const d = a(l);
      return d.setMonth(11, 31), d;
    },
    eachMonthOfInterval: (l) => {
      const d = a(l.start), u = a(l.end), c = [], f = new Ce(d.getFullYear(), d.getMonth(), 1, 12, 0, 0, e), m = u.getFullYear() * 12 + u.getMonth();
      for (; f.getFullYear() * 12 + f.getMonth() <= m; )
        c.push(new Ce(f, e)), f.setMonth(f.getMonth() + 1, 1);
      return c;
    },
    // Normalize to noon once before arithmetic (avoid DST/midnight edge cases),
    // mutate the same TZDate, and return it.
    addDays: (l, d) => {
      const u = a(l);
      return u.setDate(u.getDate() + d), u;
    },
    addWeeks: (l, d) => {
      const u = a(l);
      return u.setDate(u.getDate() + d * 7), u;
    },
    addMonths: (l, d) => {
      const u = a(l);
      return u.setMonth(u.getMonth() + d), u;
    },
    addYears: (l, d) => {
      const u = a(l);
      return u.setFullYear(u.getFullYear() + d), u;
    },
    eachYearOfInterval: (l) => {
      const d = a(l.start), u = a(l.end), c = [], f = new Ce(d.getFullYear(), 0, 1, 12, 0, 0, e);
      for (; f.getFullYear() <= u.getFullYear(); )
        c.push(new Ce(f, e)), f.setFullYear(f.getFullYear() + 1, 0, 1);
      return c;
    },
    getWeek: (l, d) => {
      var c;
      const u = s(l);
      return co(u, {
        weekStartsOn: (d == null ? void 0 : d.weekStartsOn) ?? o,
        firstWeekContainsDate: (d == null ? void 0 : d.firstWeekContainsDate) ?? ((c = r == null ? void 0 : r.options) == null ? void 0 : c.firstWeekContainsDate) ?? 1
      });
    },
    getISOWeek: (l) => {
      const d = s(l);
      return io(d);
    },
    differenceInCalendarDays: (l, d) => {
      const u = s(l), c = s(d);
      return so(u, c);
    },
    differenceInCalendarMonths: (l, d) => {
      const u = s(l), c = s(d);
      return Ps(u, c);
    }
  };
}
const Mn = (e) => e instanceof HTMLElement ? e : null, Er = (e) => [
  ...e.querySelectorAll("[data-animated-month]") ?? []
], lp = (e) => Mn(e.querySelector("[data-animated-month]")), Pr = (e) => Mn(e.querySelector("[data-animated-caption]")), Rr = (e) => Mn(e.querySelector("[data-animated-weeks]")), dp = (e) => Mn(e.querySelector("[data-animated-nav]")), up = (e) => Mn(e.querySelector("[data-animated-weekdays]"));
function fp(e, t, { classNames: n, months: r, focused: o, dateLib: a }) {
  const s = vt(null), i = vt(r), l = vt(!1);
  xa(() => {
    const d = i.current;
    if (i.current = r, !t || !e.current || // safety check because the ref can be set to anything by consumers
    !(e.current instanceof HTMLElement) || // validation required for the animation to work as expected
    r.length === 0 || d.length === 0 || r.length !== d.length)
      return;
    const u = a.isSameMonth(r[0].date, d[0].date), c = a.isAfter(r[0].date, d[0].date), f = c ? n[Oe.caption_after_enter] : n[Oe.caption_before_enter], m = c ? n[Oe.weeks_after_enter] : n[Oe.weeks_before_enter], v = s.current, h = e.current.cloneNode(!0);
    if (h instanceof HTMLElement ? (Er(h).forEach((w) => {
      if (!(w instanceof HTMLElement))
        return;
      const M = lp(w);
      M && w.contains(M) && w.removeChild(M);
      const S = Pr(w);
      S && S.classList.remove(f);
      const k = Rr(w);
      k && k.classList.remove(m);
    }), s.current = h) : s.current = null, l.current || u || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    o)
      return;
    const y = v instanceof HTMLElement ? Er(v) : [], g = Er(e.current);
    if (g != null && g.every((x) => x instanceof HTMLElement) && y && y.every((x) => x instanceof HTMLElement)) {
      l.current = !0, e.current.style.isolation = "isolate";
      const x = dp(e.current);
      x && (x.style.zIndex = "1"), g.forEach((w, M) => {
        const S = y[M];
        if (!S)
          return;
        w.style.position = "relative", w.style.overflow = "hidden";
        const k = Pr(w);
        k && k.classList.add(f);
        const O = Rr(w);
        O && O.classList.add(m);
        const T = () => {
          l.current = !1, e.current && (e.current.style.isolation = ""), x && (x.style.zIndex = ""), k && k.classList.remove(f), O && O.classList.remove(m), w.style.position = "", w.style.overflow = "", w.contains(S) && w.removeChild(S);
        };
        S.style.pointerEvents = "none", S.style.position = "absolute", S.style.overflow = "hidden", S.setAttribute("aria-hidden", "true");
        const B = up(S);
        B && (B.style.opacity = "0");
        const I = Pr(S);
        I && (I.classList.add(c ? n[Oe.caption_before_exit] : n[Oe.caption_after_exit]), I.addEventListener("animationend", T));
        const F = Rr(S);
        F && F.classList.add(c ? n[Oe.weeks_before_exit] : n[Oe.weeks_after_exit]), w.insertBefore(S, w.firstChild);
      });
    }
  });
}
function mp(e, t, n, r) {
  const o = e[0], a = e[e.length - 1], { ISOWeek: s, fixedWeeks: i, broadcastCalendar: l } = n ?? {}, { addDays: d, differenceInCalendarDays: u, differenceInCalendarMonths: c, endOfBroadcastWeek: f, endOfISOWeek: m, endOfMonth: v, endOfWeek: h, isAfter: y, startOfBroadcastWeek: g, startOfISOWeek: x, startOfWeek: w } = r, M = l ? g(o, r) : s ? x(o) : w(o), S = l ? f(a) : s ? m(v(a)) : h(v(a)), k = t && (l ? f(t) : s ? m(t) : h(t)), O = k && y(S, k) ? k : S, T = u(O, M), B = c(a, o) + 1, I = [];
  for (let Y = 0; Y <= T; Y++) {
    const D = d(M, Y);
    I.push(D);
  }
  const R = (l ? 35 : 42) * B;
  if (i && I.length < R) {
    const Y = R - I.length;
    for (let D = 0; D < Y; D++) {
      const P = d(I[I.length - 1], 1);
      I.push(P);
    }
  }
  return I;
}
function hp(e) {
  const t = [];
  return e.reduce((n, r) => {
    const o = r.weeks.reduce((a, s) => a.concat(s.days.slice()), t.slice());
    return n.concat(o.slice());
  }, t.slice());
}
function pp(e, t, n, r) {
  const { numberOfMonths: o = 1 } = n, a = [];
  for (let s = 0; s < o; s++) {
    const i = r.addMonths(e, s);
    if (t && i > t)
      break;
    a.push(i);
  }
  return a;
}
function ha(e, t, n, r) {
  const { month: o, defaultMonth: a, today: s = r.today(), numberOfMonths: i = 1 } = e;
  let l = o || a || s;
  const { differenceInCalendarMonths: d, addMonths: u, startOfMonth: c } = r;
  if (n && d(n, l) < i - 1) {
    const f = -1 * (i - 1);
    l = u(n, f);
  }
  return t && d(l, t) < 0 && (l = t), c(l);
}
function gp(e, t, n, r) {
  const { addDays: o, endOfBroadcastWeek: a, endOfISOWeek: s, endOfMonth: i, endOfWeek: l, getISOWeek: d, getWeek: u, startOfBroadcastWeek: c, startOfISOWeek: f, startOfWeek: m } = r, v = e.reduce((h, y) => {
    const g = n.broadcastCalendar ? c(y, r) : n.ISOWeek ? f(y) : m(y), x = n.broadcastCalendar ? a(y) : n.ISOWeek ? s(i(y)) : l(i(y)), w = t.filter((O) => O >= g && O <= x), M = n.broadcastCalendar ? 35 : 42;
    if (n.fixedWeeks && w.length < M) {
      const O = t.filter((T) => {
        const B = M - w.length;
        return T > x && T <= o(x, B);
      });
      w.push(...O);
    }
    const S = w.reduce((O, T) => {
      const B = n.ISOWeek ? d(T) : u(T), I = O.find((R) => R.weekNumber === B), F = new Ys(T, y, r);
      return I ? I.days.push(F) : O.push(new uh(B, [F])), O;
    }, []), k = new dh(y, S);
    return h.push(k), h;
  }, []);
  return n.reverseMonths ? v.reverse() : v;
}
function bp(e, t) {
  let { startMonth: n, endMonth: r } = e;
  const { startOfYear: o, startOfDay: a, startOfMonth: s, endOfMonth: i, addYears: l, endOfYear: d, newDate: u, today: c } = t, { fromYear: f, toYear: m, fromMonth: v, toMonth: h } = e;
  !n && v && (n = v), !n && f && (n = t.newDate(f, 0, 1)), !r && h && (r = h), !r && m && (r = u(m, 11, 31));
  const y = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
  return n ? n = s(n) : f ? n = u(f, 0, 1) : !n && y && (n = o(l(e.today ?? c(), -100))), r ? r = i(r) : m ? r = u(m, 11, 31) : !r && y && (r = d(e.today ?? c())), [
    n && a(n),
    r && a(r)
  ];
}
function yp(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: a = 1 } = n, { startOfMonth: s, addMonths: i, differenceInCalendarMonths: l } = r, d = o ? a : 1, u = s(e);
  if (!t)
    return i(u, d);
  if (!(l(t, e) < a))
    return i(u, d);
}
function vp(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: a } = n, { startOfMonth: s, addMonths: i, differenceInCalendarMonths: l } = r, d = o ? a ?? 1 : 1, u = s(e);
  if (!t)
    return i(u, -d);
  if (!(l(u, t) <= 0))
    return i(u, -d);
}
function wp(e) {
  const t = [];
  return e.reduce((n, r) => n.concat(r.weeks.slice()), t.slice());
}
function ar(e, t) {
  const [n, r] = ve(e);
  return [t === void 0 ? n : t, r];
}
function xp(e, t) {
  var M;
  const [n, r] = bp(e, t), { startOfMonth: o, endOfMonth: a } = t, s = ha(e, n, r, t), [i, l] = ar(
    s,
    // initialMonth is always computed from props.month if provided
    e.month ? s : void 0
  );
  Pt(() => {
    const S = ha(e, n, r, t);
    l(S);
  }, [e.timeZone]);
  const { months: d, weeks: u, days: c, previousMonth: f, nextMonth: m } = Pe(() => {
    const S = pp(i, r, { numberOfMonths: e.numberOfMonths }, t), k = mp(S, e.endMonth ? a(e.endMonth) : void 0, {
      ISOWeek: e.ISOWeek,
      fixedWeeks: e.fixedWeeks,
      broadcastCalendar: e.broadcastCalendar
    }, t), O = gp(S, k, {
      broadcastCalendar: e.broadcastCalendar,
      fixedWeeks: e.fixedWeeks,
      ISOWeek: e.ISOWeek,
      reverseMonths: e.reverseMonths
    }, t), T = wp(O), B = hp(O), I = vp(i, n, e, t), F = yp(i, r, e, t);
    return {
      months: O,
      weeks: T,
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
  ]), { disableNavigation: v, onMonthChange: h } = e, y = (S) => u.some((k) => k.days.some((O) => O.isEqualTo(S))), g = (S) => {
    if (v)
      return;
    let k = o(S);
    n && k < o(n) && (k = o(n)), r && k > o(r) && (k = o(r)), l(k), h == null || h(k);
  };
  return {
    months: d,
    weeks: u,
    days: c,
    navStart: n,
    navEnd: r,
    previousMonth: f,
    nextMonth: m,
    goToMonth: g,
    goToDay: (S) => {
      y(S) || g(S.date);
    }
  };
}
var Ge;
(function(e) {
  e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(Ge || (Ge = {}));
function pa(e) {
  return !e[le.disabled] && !e[le.hidden] && !e[le.outside];
}
function kp(e, t, n, r) {
  let o, a = -1;
  for (const s of e) {
    const i = t(s);
    pa(i) && (i[le.focused] && a < Ge.FocusedModifier ? (o = s, a = Ge.FocusedModifier) : r != null && r.isEqualTo(s) && a < Ge.LastFocused ? (o = s, a = Ge.LastFocused) : n(s.date) && a < Ge.Selected ? (o = s, a = Ge.Selected) : i[le.today] && a < Ge.Today && (o = s, a = Ge.Today));
  }
  return o || (o = e.find((s) => pa(t(s)))), o;
}
function Cp(e, t, n, r, o, a, s) {
  const { ISOWeek: i, broadcastCalendar: l } = a, { addDays: d, addMonths: u, addWeeks: c, addYears: f, endOfBroadcastWeek: m, endOfISOWeek: v, endOfWeek: h, max: y, min: g, startOfBroadcastWeek: x, startOfISOWeek: w, startOfWeek: M } = s;
  let k = {
    day: d,
    week: c,
    month: u,
    year: f,
    startOfWeek: (O) => l ? x(O, s) : i ? w(O) : M(O),
    endOfWeek: (O) => l ? m(O) : i ? v(O) : h(O)
  }[e](n, t === "after" ? 1 : -1);
  return t === "before" && r ? k = y([r, k]) : t === "after" && o && (k = g([o, k])), k;
}
function ei(e, t, n, r, o, a, s, i = 0) {
  if (i > 365)
    return;
  const l = Cp(e, t, n.date, r, o, a, s), d = !!(a.disabled && st(l, a.disabled, s)), u = !!(a.hidden && st(l, a.hidden, s)), c = l, f = new Ys(l, c, s);
  return !d && !u ? f : ei(e, t, f, r, o, a, s, i + 1);
}
function Mp(e, t, n, r, o) {
  const { autoFocus: a } = e, [s, i] = ve(), l = kp(t.days, n, r || (() => !1), s), [d, u] = ve(a ? l : void 0);
  return {
    isFocusTarget: (h) => !!(l != null && l.isEqualTo(h)),
    setFocused: u,
    focused: d,
    blur: () => {
      i(d), u(void 0);
    },
    moveFocus: (h, y) => {
      if (!d)
        return;
      const g = ei(h, y, d, t.navStart, t.navEnd, e, o);
      g && (e.disableNavigation && !t.days.some((w) => w.isEqualTo(g)) || (t.goToDay(g), u(g)));
    }
  };
}
function Sp(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [a, s] = ar(n, o ? n : void 0), i = o ? n : a, { isSameDay: l } = t, d = (m) => (i == null ? void 0 : i.some((v) => l(v, m))) ?? !1, { min: u, max: c } = e;
  return {
    selected: i,
    select: (m, v, h) => {
      let y = [...i ?? []];
      if (d(m)) {
        if ((i == null ? void 0 : i.length) === u || r && (i == null ? void 0 : i.length) === 1)
          return;
        y = i == null ? void 0 : i.filter((g) => !l(g, m));
      } else
        (i == null ? void 0 : i.length) === c ? y = [m] : y = [...y, m];
      return o || s(y), o == null || o(y, m, v, h), y;
    },
    isSelected: d
  };
}
function Np(e, t, n = 0, r = 0, o = !1, a = tt) {
  const { from: s, to: i } = t || {}, { isSameDay: l, isAfter: d, isBefore: u } = a;
  let c;
  if (!s && !i)
    c = { from: e, to: n > 0 ? void 0 : e };
  else if (s && !i)
    l(s, e) ? n === 0 ? c = { from: s, to: e } : o ? c = { from: s, to: void 0 } : c = void 0 : u(e, s) ? c = { from: e, to: s } : c = { from: s, to: e };
  else if (s && i)
    if (l(s, e) && l(i, e))
      o ? c = { from: s, to: i } : c = void 0;
    else if (l(s, e))
      c = { from: s, to: n > 0 ? void 0 : e };
    else if (l(i, e))
      c = { from: e, to: n > 0 ? void 0 : e };
    else if (u(e, s))
      c = { from: e, to: i };
    else if (d(e, s))
      c = { from: s, to: e };
    else if (d(e, i))
      c = { from: s, to: e };
    else
      throw new Error("Invalid range");
  if (c != null && c.from && (c != null && c.to)) {
    const f = a.differenceInCalendarDays(c.to, c.from);
    r > 0 && f > r ? c = { from: e, to: void 0 } : n > 1 && f < n && (c = { from: e, to: void 0 });
  }
  return c;
}
function Dp(e, t, n = tt) {
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
function ga(e, t, n = tt) {
  return at(e, t.from, !1, n) || at(e, t.to, !1, n) || at(t, e.from, !1, n) || at(t, e.to, !1, n);
}
function Op(e, t, n = tt) {
  const r = Array.isArray(t) ? t : [t];
  if (r.filter((i) => typeof i != "function").some((i) => typeof i == "boolean" ? i : n.isDate(i) ? at(e, i, !1, n) : Hs(i, n) ? i.some((l) => at(e, l, !1, n)) : or(i) ? i.from && i.to ? ga(e, { from: i.from, to: i.to }, n) : !1 : zs(i) ? Dp(e, i.dayOfWeek, n) : lo(i) ? n.isAfter(i.before, i.after) ? ga(e, {
    from: n.addDays(i.after, 1),
    to: n.addDays(i.before, -1)
  }, n) : st(e.from, i, n) || st(e.to, i, n) : uo(i) || fo(i) ? st(e.from, i, n) || st(e.to, i, n) : !1))
    return !0;
  const s = r.filter((i) => typeof i == "function");
  if (s.length) {
    let i = e.from;
    const l = n.differenceInCalendarDays(e.to, e.from);
    for (let d = 0; d <= l; d++) {
      if (s.some((u) => u(i)))
        return !0;
      i = n.addDays(i, 1);
    }
  }
  return !1;
}
function Ep(e, t) {
  const { disabled: n, excludeDisabled: r, selected: o, required: a, onSelect: s } = e, [i, l] = ar(o, s ? o : void 0), d = s ? o : i;
  return {
    selected: d,
    select: (f, m, v) => {
      const { min: h, max: y } = e, g = f ? Np(f, d, h, y, a, t) : void 0;
      return r && n && (g != null && g.from) && g.to && Op({ from: g.from, to: g.to }, n, t) && (g.from = f, g.to = void 0), s || l(g), s == null || s(g, f, m, v), g;
    },
    isSelected: (f) => d && at(d, f, !1, t)
  };
}
function Pp(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [a, s] = ar(n, o ? n : void 0), i = o ? n : a, { isSameDay: l } = t;
  return {
    selected: i,
    select: (c, f, m) => {
      let v = c;
      return !r && i && i && l(c, i) && (v = void 0), o || s(v), o == null || o(v, c, f, m), v;
    },
    isSelected: (c) => i ? l(i, c) : !1
  };
}
function Rp(e, t) {
  const n = Pp(e, t), r = Sp(e, t), o = Ep(e, t);
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
function Te(e, t) {
  return e instanceof Ce && e.timeZone === t ? e : new Ce(e, t);
}
function jt(e, t, n) {
  return Te(e, t);
}
function ba(e, t, n) {
  return typeof e == "boolean" || typeof e == "function" ? e : e instanceof Date ? jt(e, t) : Array.isArray(e) ? e.map((r) => r instanceof Date ? jt(r, t) : r) : or(e) ? {
    ...e,
    from: e.from ? Te(e.from, t) : e.from,
    to: e.to ? Te(e.to, t) : e.to
  } : lo(e) ? {
    before: jt(e.before, t),
    after: jt(e.after, t)
  } : uo(e) ? {
    after: jt(e.after, t)
  } : fo(e) ? {
    before: jt(e.before, t)
  } : e;
}
function Ar(e, t, n) {
  return e && (Array.isArray(e) ? e.map((r) => ba(r, t)) : ba(e, t));
}
function ti(e) {
  var _e;
  let t = e;
  const n = t.timeZone;
  if (n && (t = {
    ...e,
    timeZone: n
  }, t.today && (t.today = Te(t.today, n)), t.month && (t.month = Te(t.month, n)), t.defaultMonth && (t.defaultMonth = Te(t.defaultMonth, n)), t.startMonth && (t.startMonth = Te(t.startMonth, n)), t.endMonth && (t.endMonth = Te(t.endMonth, n)), t.mode === "single" && t.selected ? t.selected = Te(t.selected, n) : t.mode === "multiple" && t.selected ? t.selected = (_e = t.selected) == null ? void 0 : _e.map((X) => Te(X, n)) : t.mode === "range" && t.selected && (t.selected = {
    from: t.selected.from ? Te(t.selected.from, n) : t.selected.from,
    to: t.selected.to ? Te(t.selected.to, n) : t.selected.to
  }), t.disabled !== void 0 && (t.disabled = Ar(t.disabled, n)), t.hidden !== void 0 && (t.hidden = Ar(t.hidden, n)), t.modifiers)) {
    const X = {};
    Object.keys(t.modifiers).forEach((te) => {
      var U;
      X[te] = Ar((U = t.modifiers) == null ? void 0 : U[te], n);
    }), t.modifiers = X;
  }
  const { components: r, formatters: o, labels: a, dateLib: s, locale: i, classNames: l } = Pe(() => {
    const X = { ...Fs, ...t.locale }, te = t.broadcastCalendar ? 1 : t.weekStartsOn, U = t.noonSafe && t.timeZone ? cp(t.timeZone, {
      weekStartsOn: te,
      locale: X
    }) : void 0, J = t.dateLib && U ? { ...U, ...t.dateLib } : t.dateLib ?? U, V = new we({
      locale: X,
      weekStartsOn: te,
      firstWeekContainsDate: t.firstWeekContainsDate,
      useAdditionalWeekYearTokens: t.useAdditionalWeekYearTokens,
      useAdditionalDayOfYearTokens: t.useAdditionalDayOfYearTokens,
      timeZone: t.timeZone,
      numerals: t.numerals
    }, J);
    return {
      dateLib: V,
      components: zh(t.components),
      formatters: Zh(t.formatters),
      labels: rp(t.labels, V.options),
      locale: X,
      classNames: { ...Lh(), ...t.classNames }
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
  const { captionLayout: d, mode: u, navLayout: c, numberOfMonths: f = 1, onDayBlur: m, onDayClick: v, onDayFocus: h, onDayKeyDown: y, onDayMouseEnter: g, onDayMouseLeave: x, onNextClick: w, onPrevClick: M, showWeekNumber: S, styles: k } = t, { formatCaption: O, formatDay: T, formatMonthDropdown: B, formatWeekNumber: I, formatWeekNumberHeader: F, formatWeekdayName: R, formatYearDropdown: Y } = o, D = xp(t, s), { days: P, months: N, navStart: A, navEnd: E, previousMonth: W, nextMonth: $, goToMonth: H } = D, ee = Yh(P, t, A, E, s), { isSelected: z, select: q, selected: K } = Rp(t, s) ?? {}, { blur: ce, focused: ue, isFocusTarget: Z, moveFocus: me, setFocused: ae } = Mp(t, D, ee, z ?? (() => !1), s), { labelDayButton: ge, labelGridcell: ye, labelGrid: Ne, labelMonthDropdown: ft, labelNav: It, labelPrevious: Wt, labelNext: nt, labelWeekday: $t, labelWeekNumber: xe, labelWeekNumberHeader: mr, labelYearDropdown: hr } = a, Me = Pe(() => sp(s, t.ISOWeek, t.broadcastCalendar, t.today), [s, t.ISOWeek, t.broadcastCalendar, t.today]), rt = u !== void 0 || v !== void 0, on = Ae(() => {
    W && (H(W), M == null || M(W));
  }, [W, H, M]), an = Ae(() => {
    $ && (H($), w == null || w($));
  }, [H, $, w]), Ft = Ae((X, te) => (U) => {
    U.preventDefault(), U.stopPropagation(), ae(X), !te.disabled && (q == null || q(X.date, te, U), v == null || v(X.date, te, U));
  }, [q, v, ae]), pr = Ae((X, te) => (U) => {
    ae(X), h == null || h(X.date, te, U);
  }, [h, ae]), Nn = Ae((X, te) => (U) => {
    ce(), m == null || m(X.date, te, U);
  }, [ce, m]), sn = Ae((X, te) => (U) => {
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
      me(V, G);
    }
    y == null || y(X.date, te, U);
  }, [me, y, t.dir]), mt = Ae((X, te) => (U) => {
    g == null || g(X.date, te, U);
  }, [g]), Dn = Ae((X, te) => (U) => {
    x == null || x(X.date, te, U);
  }, [x]), ht = Ae((X) => (te) => {
    const U = Number(te.target.value), J = s.setMonth(s.startOfMonth(X), U);
    H(J);
  }, [s, H]), gr = Ae((X) => (te) => {
    const U = Number(te.target.value), J = s.setYear(s.startOfMonth(X), U);
    H(J);
  }, [s, H]), { className: br, style: On } = Pe(() => ({
    className: [l[L.Root], t.className].filter(Boolean).join(" "),
    style: { ...k == null ? void 0 : k[L.Root], ...t.style }
  }), [l, t.className, t.style, k]), En = Hh(t), Pn = vt(null);
  fp(Pn, !!t.animate, {
    classNames: l,
    months: N,
    focused: ue,
    dateLib: s
  });
  const cn = {
    dayPickerProps: t,
    selected: K,
    select: q,
    isSelected: z,
    months: N,
    nextMonth: $,
    previousMonth: W,
    goToMonth: H,
    getModifiers: ee,
    components: r,
    classNames: l,
    styles: k,
    labels: a,
    formatters: o
  };
  return C.createElement(
    Bs.Provider,
    { value: cn },
    C.createElement(
      r.Root,
      { rootRef: t.animate ? Pn : void 0, className: br, style: On, dir: t.dir, id: t.id, lang: t.lang, nonce: t.nonce, title: t.title, role: t.role, "aria-label": t["aria-label"], "aria-labelledby": t["aria-labelledby"], ...En },
      C.createElement(
        r.Months,
        { className: l[L.Months], style: k == null ? void 0 : k[L.Months] },
        !t.hideNavigation && !c && C.createElement(r.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: l[L.Nav], style: k == null ? void 0 : k[L.Nav], "aria-label": It(), onPreviousClick: on, onNextClick: an, previousMonth: W, nextMonth: $ }),
        N.map((X, te) => C.createElement(
          r.Month,
          {
            "data-animated-month": t.animate ? "true" : void 0,
            className: l[L.Month],
            style: k == null ? void 0 : k[L.Month],
            // biome-ignore lint/suspicious/noArrayIndexKey: breaks animation
            key: te,
            displayIndex: te,
            calendarMonth: X
          },
          c === "around" && !t.hideNavigation && te === 0 && C.createElement(
            r.PreviousMonthButton,
            { type: "button", className: l[L.PreviousMonthButton], tabIndex: W ? void 0 : -1, "aria-disabled": W ? void 0 : !0, "aria-label": Wt(W), onClick: on, "data-animated-button": t.animate ? "true" : void 0 },
            C.createElement(r.Chevron, { disabled: W ? void 0 : !0, className: l[L.Chevron], orientation: t.dir === "rtl" ? "right" : "left" })
          ),
          C.createElement(r.MonthCaption, { "data-animated-caption": t.animate ? "true" : void 0, className: l[L.MonthCaption], style: k == null ? void 0 : k[L.MonthCaption], calendarMonth: X, displayIndex: te }, d != null && d.startsWith("dropdown") ? C.createElement(
            r.DropdownNav,
            { className: l[L.Dropdowns], style: k == null ? void 0 : k[L.Dropdowns] },
            (() => {
              const U = d === "dropdown" || d === "dropdown-months" ? C.createElement(r.MonthsDropdown, { key: "month", className: l[L.MonthsDropdown], "aria-label": ft(), classNames: l, components: r, disabled: !!t.disableNavigation, onChange: ht(X.date), options: op(X.date, A, E, o, s), style: k == null ? void 0 : k[L.Dropdown], value: s.getMonth(X.date) }) : C.createElement("span", { key: "month" }, B(X.date, s)), J = d === "dropdown" || d === "dropdown-years" ? C.createElement(r.YearsDropdown, { key: "year", className: l[L.YearsDropdown], "aria-label": hr(s.options), classNames: l, components: r, disabled: !!t.disableNavigation, onChange: gr(X.date), options: ip(A, E, o, s, !!t.reverseYears), style: k == null ? void 0 : k[L.Dropdown], value: s.getYear(X.date) }) : C.createElement("span", { key: "year" }, Y(X.date, s));
              return s.getMonthYearOrder() === "year-first" ? [J, U] : [U, J];
            })(),
            C.createElement("span", { role: "status", "aria-live": "polite", style: {
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
          ) : C.createElement(r.CaptionLabel, { className: l[L.CaptionLabel], role: "status", "aria-live": "polite" }, O(X.date, s.options, s))),
          c === "around" && !t.hideNavigation && te === f - 1 && C.createElement(
            r.NextMonthButton,
            { type: "button", className: l[L.NextMonthButton], tabIndex: $ ? void 0 : -1, "aria-disabled": $ ? void 0 : !0, "aria-label": nt($), onClick: an, "data-animated-button": t.animate ? "true" : void 0 },
            C.createElement(r.Chevron, { disabled: $ ? void 0 : !0, className: l[L.Chevron], orientation: t.dir === "rtl" ? "left" : "right" })
          ),
          te === f - 1 && c === "after" && !t.hideNavigation && C.createElement(r.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: l[L.Nav], style: k == null ? void 0 : k[L.Nav], "aria-label": It(), onPreviousClick: on, onNextClick: an, previousMonth: W, nextMonth: $ }),
          C.createElement(
            r.MonthGrid,
            { role: "grid", "aria-multiselectable": u === "multiple" || u === "range", "aria-label": Ne(X.date, s.options, s) || void 0, className: l[L.MonthGrid], style: k == null ? void 0 : k[L.MonthGrid] },
            !t.hideWeekdays && C.createElement(
              r.Weekdays,
              { "data-animated-weekdays": t.animate ? "true" : void 0, className: l[L.Weekdays], style: k == null ? void 0 : k[L.Weekdays] },
              S && C.createElement(r.WeekNumberHeader, { "aria-label": mr(s.options), className: l[L.WeekNumberHeader], style: k == null ? void 0 : k[L.WeekNumberHeader], scope: "col" }, F()),
              Me.map((U) => C.createElement(r.Weekday, { "aria-label": $t(U, s.options, s), className: l[L.Weekday], key: String(U), style: k == null ? void 0 : k[L.Weekday], scope: "col" }, R(U, s.options, s)))
            ),
            C.createElement(r.Weeks, { "data-animated-weeks": t.animate ? "true" : void 0, className: l[L.Weeks], style: k == null ? void 0 : k[L.Weeks] }, X.weeks.map((U) => C.createElement(
              r.Week,
              { className: l[L.Week], key: U.weekNumber, style: k == null ? void 0 : k[L.Week], week: U },
              S && C.createElement(r.WeekNumber, { week: U, style: k == null ? void 0 : k[L.WeekNumber], "aria-label": xe(U.weekNumber, {
                locale: i
              }), className: l[L.WeekNumber], scope: "row", role: "rowheader" }, I(U.weekNumber, s)),
              U.days.map((J) => {
                const { date: V } = J, G = ee(J);
                if (G[le.focused] = !G.hidden && !!(ue != null && ue.isEqualTo(J)), G[Fe.selected] = (z == null ? void 0 : z(V)) || G.selected, or(K)) {
                  const { from: fe, to: ke } = K;
                  G[Fe.range_start] = !!(fe && ke && s.isSameDay(V, fe)), G[Fe.range_end] = !!(fe && ke && s.isSameDay(V, ke)), G[Fe.range_middle] = at(K, V, !0, s);
                }
                const be = ap(G, k, t.modifiersStyles), Se = Bh(G, l, t.modifiersClassNames), Yt = !rt && !G.hidden ? ye(V, G, s.options, s) : void 0;
                return C.createElement(r.Day, { key: `${J.isoDate}_${J.displayMonthId}`, day: J, modifiers: G, className: Se.join(" "), style: be, role: "gridcell", "aria-selected": G.selected || void 0, "aria-label": Yt, "data-day": J.isoDate, "data-month": J.outside ? J.dateMonthId : void 0, "data-selected": G.selected || void 0, "data-disabled": G.disabled || void 0, "data-hidden": G.hidden || void 0, "data-outside": J.outside || void 0, "data-focused": G.focused || void 0, "data-today": G.today || void 0 }, !G.hidden && rt ? C.createElement(r.DayButton, { className: l[L.DayButton], style: k == null ? void 0 : k[L.DayButton], type: "button", day: J, modifiers: G, disabled: !G.focused && G.disabled || void 0, "aria-disabled": G.focused && G.disabled || void 0, tabIndex: Z(J) ? 0 : -1, "aria-label": ge(V, G, s.options, s), onClick: Ft(J, G), onBlur: Nn(J, G), onFocus: pr(J, G), onKeyDown: sn(J, G), onMouseEnter: mt(J, G), onMouseLeave: Dn(J, G) }, T(V, s.options, s)) : !G.hidden && T(J.date, s.options, s));
              })
            )))
          )
        ))
      ),
      t.footer && C.createElement(r.Footer, { className: l[L.Footer], style: k == null ? void 0 : k[L.Footer], role: "status", "aria-live": "polite" }, t.footer)
    )
  );
}
const ni = {
  ...lh,
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
var Ap = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Tp(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var ri = { exports: {} };
(function(e, t) {
  (function(n, r) {
    e.exports = r();
  })(Ap, function() {
    var n = 1e3, r = 6e4, o = 36e5, a = "millisecond", s = "second", i = "minute", l = "hour", d = "day", u = "week", c = "month", f = "quarter", m = "year", v = "date", h = "Invalid Date", y = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, g = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, x = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(D) {
      var P = ["th", "st", "nd", "rd"], N = D % 100;
      return "[" + D + (P[(N - 20) % 10] || P[N] || P[0]) + "]";
    } }, w = function(D, P, N) {
      var A = String(D);
      return !A || A.length >= P ? D : "" + Array(P + 1 - A.length).join(N) + D;
    }, M = { s: w, z: function(D) {
      var P = -D.utcOffset(), N = Math.abs(P), A = Math.floor(N / 60), E = N % 60;
      return (P <= 0 ? "+" : "-") + w(A, 2, "0") + ":" + w(E, 2, "0");
    }, m: function D(P, N) {
      if (P.date() < N.date()) return -D(N, P);
      var A = 12 * (N.year() - P.year()) + (N.month() - P.month()), E = P.clone().add(A, c), W = N - E < 0, $ = P.clone().add(A + (W ? -1 : 1), c);
      return +(-(A + (N - E) / (W ? E - $ : $ - E)) || 0);
    }, a: function(D) {
      return D < 0 ? Math.ceil(D) || 0 : Math.floor(D);
    }, p: function(D) {
      return { M: c, y: m, w: u, d, D: v, h: l, m: i, s, ms: a, Q: f }[D] || String(D || "").toLowerCase().replace(/s$/, "");
    }, u: function(D) {
      return D === void 0;
    } }, S = "en", k = {};
    k[S] = x;
    var O = "$isDayjsObject", T = function(D) {
      return D instanceof R || !(!D || !D[O]);
    }, B = function D(P, N, A) {
      var E;
      if (!P) return S;
      if (typeof P == "string") {
        var W = P.toLowerCase();
        k[W] && (E = W), N && (k[W] = N, E = W);
        var $ = P.split("-");
        if (!E && $.length > 1) return D($[0]);
      } else {
        var H = P.name;
        k[H] = P, E = H;
      }
      return !A && E && (S = E), E || !A && S;
    }, I = function(D, P) {
      if (T(D)) return D.clone();
      var N = typeof P == "object" ? P : {};
      return N.date = D, N.args = arguments, new R(N);
    }, F = M;
    F.l = B, F.i = T, F.w = function(D, P) {
      return I(D, { locale: P.$L, utc: P.$u, x: P.$x, $offset: P.$offset });
    };
    var R = function() {
      function D(N) {
        this.$L = B(N.locale, null, !0), this.parse(N), this.$x = this.$x || N.x || {}, this[O] = !0;
      }
      var P = D.prototype;
      return P.parse = function(N) {
        this.$d = function(A) {
          var E = A.date, W = A.utc;
          if (E === null) return /* @__PURE__ */ new Date(NaN);
          if (F.u(E)) return /* @__PURE__ */ new Date();
          if (E instanceof Date) return new Date(E);
          if (typeof E == "string" && !/Z$/i.test(E)) {
            var $ = E.match(y);
            if ($) {
              var H = $[2] - 1 || 0, ee = ($[7] || "0").substring(0, 3);
              return W ? new Date(Date.UTC($[1], H, $[3] || 1, $[4] || 0, $[5] || 0, $[6] || 0, ee)) : new Date($[1], H, $[3] || 1, $[4] || 0, $[5] || 0, $[6] || 0, ee);
            }
          }
          return new Date(E);
        }(N), this.init();
      }, P.init = function() {
        var N = this.$d;
        this.$y = N.getFullYear(), this.$M = N.getMonth(), this.$D = N.getDate(), this.$W = N.getDay(), this.$H = N.getHours(), this.$m = N.getMinutes(), this.$s = N.getSeconds(), this.$ms = N.getMilliseconds();
      }, P.$utils = function() {
        return F;
      }, P.isValid = function() {
        return this.$d.toString() !== h;
      }, P.isSame = function(N, A) {
        var E = I(N);
        return this.startOf(A) <= E && E <= this.endOf(A);
      }, P.isAfter = function(N, A) {
        return I(N) < this.startOf(A);
      }, P.isBefore = function(N, A) {
        return this.endOf(A) < I(N);
      }, P.$g = function(N, A, E) {
        return F.u(N) ? this[A] : this.set(E, N);
      }, P.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, P.valueOf = function() {
        return this.$d.getTime();
      }, P.startOf = function(N, A) {
        var E = this, W = !!F.u(A) || A, $ = F.p(N), H = function(me, ae) {
          var ge = F.w(E.$u ? Date.UTC(E.$y, ae, me) : new Date(E.$y, ae, me), E);
          return W ? ge : ge.endOf(d);
        }, ee = function(me, ae) {
          return F.w(E.toDate()[me].apply(E.toDate("s"), (W ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(ae)), E);
        }, z = this.$W, q = this.$M, K = this.$D, ce = "set" + (this.$u ? "UTC" : "");
        switch ($) {
          case m:
            return W ? H(1, 0) : H(31, 11);
          case c:
            return W ? H(1, q) : H(0, q + 1);
          case u:
            var ue = this.$locale().weekStart || 0, Z = (z < ue ? z + 7 : z) - ue;
            return H(W ? K - Z : K + (6 - Z), q);
          case d:
          case v:
            return ee(ce + "Hours", 0);
          case l:
            return ee(ce + "Minutes", 1);
          case i:
            return ee(ce + "Seconds", 2);
          case s:
            return ee(ce + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, P.endOf = function(N) {
        return this.startOf(N, !1);
      }, P.$set = function(N, A) {
        var E, W = F.p(N), $ = "set" + (this.$u ? "UTC" : ""), H = (E = {}, E[d] = $ + "Date", E[v] = $ + "Date", E[c] = $ + "Month", E[m] = $ + "FullYear", E[l] = $ + "Hours", E[i] = $ + "Minutes", E[s] = $ + "Seconds", E[a] = $ + "Milliseconds", E)[W], ee = W === d ? this.$D + (A - this.$W) : A;
        if (W === c || W === m) {
          var z = this.clone().set(v, 1);
          z.$d[H](ee), z.init(), this.$d = z.set(v, Math.min(this.$D, z.daysInMonth())).$d;
        } else H && this.$d[H](ee);
        return this.init(), this;
      }, P.set = function(N, A) {
        return this.clone().$set(N, A);
      }, P.get = function(N) {
        return this[F.p(N)]();
      }, P.add = function(N, A) {
        var E, W = this;
        N = Number(N);
        var $ = F.p(A), H = function(q) {
          var K = I(W);
          return F.w(K.date(K.date() + Math.round(q * N)), W);
        };
        if ($ === c) return this.set(c, this.$M + N);
        if ($ === m) return this.set(m, this.$y + N);
        if ($ === d) return H(1);
        if ($ === u) return H(7);
        var ee = (E = {}, E[i] = r, E[l] = o, E[s] = n, E)[$] || 1, z = this.$d.getTime() + N * ee;
        return F.w(z, this);
      }, P.subtract = function(N, A) {
        return this.add(-1 * N, A);
      }, P.format = function(N) {
        var A = this, E = this.$locale();
        if (!this.isValid()) return E.invalidDate || h;
        var W = N || "YYYY-MM-DDTHH:mm:ssZ", $ = F.z(this), H = this.$H, ee = this.$m, z = this.$M, q = E.weekdays, K = E.months, ce = E.meridiem, ue = function(ae, ge, ye, Ne) {
          return ae && (ae[ge] || ae(A, W)) || ye[ge].slice(0, Ne);
        }, Z = function(ae) {
          return F.s(H % 12 || 12, ae, "0");
        }, me = ce || function(ae, ge, ye) {
          var Ne = ae < 12 ? "AM" : "PM";
          return ye ? Ne.toLowerCase() : Ne;
        };
        return W.replace(g, function(ae, ge) {
          return ge || function(ye) {
            switch (ye) {
              case "YY":
                return String(A.$y).slice(-2);
              case "YYYY":
                return F.s(A.$y, 4, "0");
              case "M":
                return z + 1;
              case "MM":
                return F.s(z + 1, 2, "0");
              case "MMM":
                return ue(E.monthsShort, z, K, 3);
              case "MMMM":
                return ue(K, z);
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
                return String(H);
              case "HH":
                return F.s(H, 2, "0");
              case "h":
                return Z(1);
              case "hh":
                return Z(2);
              case "a":
                return me(H, ee, !0);
              case "A":
                return me(H, ee, !1);
              case "m":
                return String(ee);
              case "mm":
                return F.s(ee, 2, "0");
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
          }(ae) || $.replace(":", "");
        });
      }, P.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, P.diff = function(N, A, E) {
        var W, $ = this, H = F.p(A), ee = I(N), z = (ee.utcOffset() - this.utcOffset()) * r, q = this - ee, K = function() {
          return F.m($, ee);
        };
        switch (H) {
          case m:
            W = K() / 12;
            break;
          case c:
            W = K();
            break;
          case f:
            W = K() / 3;
            break;
          case u:
            W = (q - z) / 6048e5;
            break;
          case d:
            W = (q - z) / 864e5;
            break;
          case l:
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
      }, P.daysInMonth = function() {
        return this.endOf(c).$D;
      }, P.$locale = function() {
        return k[this.$L];
      }, P.locale = function(N, A) {
        if (!N) return this.$L;
        var E = this.clone(), W = B(N, A, !0);
        return W && (E.$L = W), E;
      }, P.clone = function() {
        return F.w(this.$d, this);
      }, P.toDate = function() {
        return new Date(this.valueOf());
      }, P.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, P.toISOString = function() {
        return this.$d.toISOString();
      }, P.toString = function() {
        return this.$d.toUTCString();
      }, D;
    }(), Y = R.prototype;
    return I.prototype = Y, [["$ms", a], ["$s", s], ["$m", i], ["$H", l], ["$W", d], ["$M", c], ["$y", m], ["$D", v]].forEach(function(D) {
      Y[D[1]] = function(P) {
        return this.$g(P, D[0], D[1]);
      };
    }), I.extend = function(D, P) {
      return D.$i || (D(P, R, I), D.$i = !0), I;
    }, I.locale = B, I.isDayjs = T, I.unix = function(D) {
      return I(1e3 * D);
    }, I.en = k[S], I.Ls = k, I.p = {}, I;
  });
})(ri);
var _p = ri.exports;
const he = /* @__PURE__ */ Tp(_p), Ip = C.forwardRef(
  ({
    value: e,
    onChange: t,
    label: n,
    placeholder: r = "YYYY-MM-DD",
    min: o,
    max: a,
    disabled: s = !1,
    error: i = !1,
    errorMessage: l,
    helperText: d,
    className: u
  }, c) => {
    const [f, m] = ve(!1), [v, h] = ve(
      e ? he(e) : void 0
    );
    Pt(() => {
      h(e ? he(e) : void 0);
    }, [e]);
    const y = Pe(() => v == null ? void 0 : v.toDate(), [v]), g = (k) => {
      if (!k) {
        h(void 0);
        return;
      }
      const O = he(k);
      h(O);
    }, x = () => {
      v && (t == null || t(v.format("YYYY-MM-DD")), m(!1));
    }, w = () => {
      h(e ? he(e) : void 0), m(!1);
    }, M = Pe(() => e ? he(e).format("YYYY-MM-DD") : "", [e]), S = Pe(() => {
      const k = [];
      return o && k.push({ before: he(o).toDate() }), a && k.push({ after: he(a).toDate() }), k.length > 0 ? k : void 0;
    }, [o, a]);
    return /* @__PURE__ */ j("div", { ref: c, className: _("flex flex-col gap-1", u), children: [
      n && /* @__PURE__ */ p("label", { className: "text-sm font-medium text-gray-700", children: n }),
      /* @__PURE__ */ j(
        tr,
        {
          open: f && !s,
          onOpenChange: m,
          children: [
            /* @__PURE__ */ p(nr, { asChild: !0, children: /* @__PURE__ */ p("div", { className: "relative", children: /* @__PURE__ */ p(
              "input",
              {
                type: "text",
                readOnly: !0,
                value: M,
                placeholder: r,
                disabled: s,
                className: _(
                  "w-full h-10 px-3 border rounded bg-white text-sm",
                  "hover:bg-gray-50 hover:border-gray-400",
                  "focus:outline-none",
                  "transition-all duration-150",
                  "cursor-pointer",
                  i ? "border-red-500" : "border-gray-300",
                  s && _(
                    "bg-gray-100 cursor-not-allowed",
                    "hover:bg-gray-100 hover:border-gray-300"
                  )
                )
              }
            ) }) }),
            /* @__PURE__ */ p(rr, { children: /* @__PURE__ */ j(
              xn,
              {
                align: "start",
                sideOffset: 5,
                className: _(
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
                  /* @__PURE__ */ p("div", { className: "date-picker-calendar", children: /* @__PURE__ */ p(
                    ti,
                    {
                      mode: "single",
                      selected: y,
                      onSelect: g,
                      locale: ni,
                      disabled: S,
                      formatters: {
                        formatCaption: (k) => `${k.getFullYear()}년 ${k.getMonth() + 1}월`
                      }
                    }
                  ) }),
                  /* @__PURE__ */ j(
                    "div",
                    {
                      className: _(
                        "flex items-end justify-between mt-2 pt-2",
                        "border-t border-gray-200"
                      ),
                      children: [
                        /* @__PURE__ */ p("div", { className: "flex flex-col min-h-8", children: v ? /* @__PURE__ */ p("span", { className: "text-xs text-gray-700", children: v.format("YYYY-MM-DD") }) : /* @__PURE__ */ p("span", { className: "text-xs text-red-500", children: "날짜를 선택해 주세요." }) }),
                        /* @__PURE__ */ j("div", { className: "flex gap-2", children: [
                          /* @__PURE__ */ p(
                            "button",
                            {
                              onClick: w,
                              className: _(
                                "w-15 h-8 rounded",
                                "text-xs font-medium text-gray-700",
                                "border border-gray-300",
                                "transition-all duration-150",
                                "active:scale-95",
                                "hover:bg-gray-50"
                              ),
                              children: "취소"
                            }
                          ),
                          /* @__PURE__ */ p(
                            "button",
                            {
                              onClick: x,
                              disabled: !v,
                              className: _(
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
      (d || l) && /* @__PURE__ */ p("div", { children: i && l ? /* @__PURE__ */ p("p", { className: "text-xs text-red-500", children: l }) : d && /* @__PURE__ */ p("p", { className: "text-xs text-gray-500", children: d }) })
    ] });
  }
);
Ip.displayName = "DatePicker";
const Wp = () => {
  const e = he();
  return [
    {
      label: "전체",
      getValue: () => [he("1970-01-01"), he("2099-12-31")]
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
}, $p = C.forwardRef(
  ({
    value: e,
    onChange: t,
    startLabel: n = "시작일자",
    endLabel: r = "종료일자",
    className: o
  }, a) => {
    const [s, i] = ve(!1), [l, d] = ve([
      e != null && e.start ? he(e.start) : void 0,
      e != null && e.end ? he(e.end) : void 0
    ]);
    Pt(() => {
      e && d([
        e.start ? he(e.start) : void 0,
        e.end ? he(e.end) : void 0
      ]);
    }, [e]);
    const [u, c] = l, f = Pe(() => {
      if (u)
        return {
          from: u.toDate(),
          to: c == null ? void 0 : c.toDate()
        };
    }, [u, c]), m = (w) => {
      const [M, S] = w.getValue();
      d([M, S]);
    }, v = (w) => {
      if (!w) {
        d([void 0, void 0]);
        return;
      }
      const M = w.from ? he(w.from) : void 0, S = w.to ? he(w.to) : void 0;
      d([M, S]);
    }, h = () => {
      u && c && (t == null || t({
        start: u.format("YYYY-MM-DD"),
        end: c.format("YYYY-MM-DD")
      }), i(!1));
    }, y = () => {
      d([
        e != null && e.start ? he(e.start) : void 0,
        e != null && e.end ? he(e.end) : void 0
      ]), i(!1);
    }, g = Pe(() => {
      if (!(!u || !c))
        return c.diff(u, "day") + 1;
    }, [u, c]), x = Pe(() => !(e != null && e.start) || !(e != null && e.end) ? { start: "", end: "" } : {
      start: he(e.start).format("YYYY-MM-DD"),
      end: he(e.end).format("YYYY-MM-DD")
    }, [e]);
    return /* @__PURE__ */ j(tr, { open: s, onOpenChange: i, children: [
      /* @__PURE__ */ p(nr, { asChild: !0, children: /* @__PURE__ */ j("div", { ref: a, className: _("flex items-center gap-0", o), children: [
        /* @__PURE__ */ j("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ p(
            "label",
            {
              className: _(
                "absolute left-3 top-1/2 -translate-y-1/2",
                "text-xs text-gray-500",
                "pointer-events-none"
              ),
              children: n
            }
          ),
          /* @__PURE__ */ p(
            "input",
            {
              type: "text",
              readOnly: !0,
              value: x.start,
              placeholder: "YYYY-MM-DD",
              className: _(
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
        /* @__PURE__ */ j("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ p(
            "label",
            {
              className: _(
                "absolute left-3 top-1/2 -translate-y-1/2",
                "text-xs text-gray-500",
                "pointer-events-none"
              ),
              children: r
            }
          ),
          /* @__PURE__ */ p(
            "input",
            {
              type: "text",
              readOnly: !0,
              value: x.end,
              placeholder: "YYYY-MM-DD",
              className: _(
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
      /* @__PURE__ */ p(rr, { children: /* @__PURE__ */ j(
        xn,
        {
          align: "start",
          sideOffset: 5,
          className: _(
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
            /* @__PURE__ */ j("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ p("div", { className: "flex flex-col border-r border-gray-200 pr-2", children: Wp().map((w) => /* @__PURE__ */ p(
                "button",
                {
                  onClick: () => m(w),
                  className: _(
                    "w-[70px] h-[26px] px-2",
                    "text-left text-xs text-gray-700",
                    "border-b border-gray-200 rounded-sm",
                    "last:border-b-0",
                    "transition-all duration-150",
                    "hover:bg-blue-50",
                    "hover:font-medium",
                    "hover:text-blue-600"
                  ),
                  children: w.label
                },
                w.label
              )) }),
              /* @__PURE__ */ p("div", { className: "date-range-picker-calendar", children: /* @__PURE__ */ p(
                ti,
                {
                  mode: "range",
                  selected: f,
                  onSelect: v,
                  numberOfMonths: 2,
                  locale: ni,
                  formatters: {
                    formatCaption: (w) => `${w.getFullYear()}년 ${w.getMonth() + 1}월`
                  }
                }
              ) })
            ] }),
            /* @__PURE__ */ j(
              "div",
              {
                className: _(
                  "flex items-end justify-between mt-2 pt-2",
                  "border-t border-gray-200"
                ),
                children: [
                  /* @__PURE__ */ p("div", { className: "flex flex-col min-h-8", children: !u || !c ? /* @__PURE__ */ p("span", { className: "text-xs text-red-500", children: "종료일자를 선택해 주세요." }) : /* @__PURE__ */ j(mn, { children: [
                    /* @__PURE__ */ j("span", { className: "text-xs text-gray-700", children: [
                      u.format("YYYY-MM-DD"),
                      " ~",
                      " ",
                      c.format("YYYY-MM-DD")
                    ] }),
                    /* @__PURE__ */ j("span", { className: "text-xs text-gray-500", children: [
                      "(",
                      g,
                      "일간)"
                    ] })
                  ] }) }),
                  /* @__PURE__ */ j("div", { className: "flex gap-2", children: [
                    /* @__PURE__ */ p(
                      "button",
                      {
                        onClick: y,
                        className: _(
                          "w-15 h-8",
                          "border border-gray-300 rounded",
                          "text-xs font-medium text-gray-700",
                          "transition-all duration-150",
                          "hover:bg-gray-50 active:scale-95"
                        ),
                        children: "취소"
                      }
                    ),
                    /* @__PURE__ */ p(
                      "button",
                      {
                        onClick: h,
                        disabled: !u || !c,
                        className: _(
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
$p.displayName = "DateRangePicker";
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fp = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Yp = (e) => e.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (t, n, r) => r ? r.toUpperCase() : n.toLowerCase()
), ya = (e) => {
  const t = Yp(e);
  return t.charAt(0).toUpperCase() + t.slice(1);
}, oi = (...e) => e.filter((t, n, r) => !!t && t.trim() !== "" && r.indexOf(t) === n).join(" ").trim(), Bp = (e) => {
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
var zp = {
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
const Hp = Mt(
  ({
    color: e = "currentColor",
    size: t = 24,
    strokeWidth: n = 2,
    absoluteStrokeWidth: r,
    className: o = "",
    children: a,
    iconNode: s,
    ...i
  }, l) => _r(
    "svg",
    {
      ref: l,
      ...zp,
      width: t,
      height: t,
      stroke: e,
      strokeWidth: r ? Number(n) * 24 / Number(t) : n,
      className: oi("lucide", o),
      ...!a && !Bp(i) && { "aria-hidden": "true" },
      ...i
    },
    [
      ...s.map(([d, u]) => _r(d, u)),
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
const _t = (e, t) => {
  const n = Mt(
    ({ className: r, ...o }, a) => _r(Hp, {
      ref: a,
      iconNode: t,
      className: oi(
        `lucide-${Fp(ya(e))}`,
        `lucide-${e}`,
        r
      ),
      ...o
    })
  );
  return n.displayName = ya(e), n;
};
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Lp = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], jp = _t("check", Lp);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vp = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], Gp = _t("chevron-down", Vp);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Up = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
], ai = _t("circle-check", Up);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qp = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
], Xp = _t("circle-x", qp);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Kp = [
  ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
], Qp = _t("clock", Kp);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zp = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
], si = _t("triangle-alert", Zp);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Jp = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], eg = _t("x", Jp), tg = C.forwardRef(
  ({
    value: e,
    onChange: t,
    label: n,
    placeholder: r = "HH:MM",
    format: o = "24h",
    disabled: a = !1,
    error: s = !1,
    errorMessage: i,
    helperText: l,
    className: d,
    minuteStep: u = 1,
    showIcon: c = !0
  }, f) => {
    const [m, v] = ve(!1), [h, y] = ve(null), [g, x] = ve(null), [w, M] = ve("AM"), S = vt(null), k = vt(null);
    Pt(() => {
      if (!e) {
        y(null), x(null), M("AM");
        return;
      }
      const R = /^(\d{1,2}):(\d{2})$/, Y = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i;
      if (o === "24h") {
        const D = e.match(R);
        D && (y(parseInt(D[1], 10)), x(parseInt(D[2], 10)));
      } else {
        const D = e.match(Y);
        if (D) {
          let P = parseInt(D[1], 10);
          const N = D[3].toUpperCase();
          y(P), x(parseInt(D[2], 10)), M(N);
        }
      }
    }, [e, o]);
    const O = Pe(() => o === "24h" ? Array.from({ length: 24 }, (R, Y) => Y) : Array.from({ length: 12 }, (R, Y) => Y + 1), [o]), T = Pe(() => {
      const R = [];
      for (let Y = 0; Y < 60; Y += u)
        R.push(Y);
      return R;
    }, [u]), B = Pe(() => {
      if (h === null || g === null) return "";
      const R = g.toString().padStart(2, "0");
      return o === "24h" ? `${h.toString().padStart(2, "0")}:${R}` : `${h}:${R} ${w}`;
    }, [h, g, w, o]), I = () => {
      h !== null && g !== null && (t == null || t(B), v(!1));
    }, F = () => {
      if (e) {
        const R = /^(\d{1,2}):(\d{2})$/, Y = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i;
        if (o === "24h") {
          const D = e.match(R);
          D && (y(parseInt(D[1], 10)), x(parseInt(D[2], 10)));
        } else {
          const D = e.match(Y);
          D && (y(parseInt(D[1], 10)), x(parseInt(D[2], 10)), M(D[3].toUpperCase()));
        }
      } else
        y(null), x(null), M("AM");
      v(!1);
    };
    return Pt(() => {
      m && h !== null && setTimeout(() => {
        var Y;
        const R = (Y = S.current) == null ? void 0 : Y.querySelector(
          `[data-value="${h}"]`
        );
        R == null || R.scrollIntoView({ block: "center" });
      }, 0), m && g !== null && setTimeout(() => {
        var Y;
        const R = (Y = k.current) == null ? void 0 : Y.querySelector(
          `[data-value="${g}"]`
        );
        R == null || R.scrollIntoView({ block: "center" });
      }, 0);
    }, [m, h, g]), /* @__PURE__ */ j("div", { ref: f, className: _("flex flex-col gap-1", d), children: [
      n && /* @__PURE__ */ p("label", { className: "text-sm font-medium text-gray-700", children: n }),
      /* @__PURE__ */ j(
        tr,
        {
          open: m && !a,
          onOpenChange: v,
          children: [
            /* @__PURE__ */ p(nr, { asChild: !0, children: /* @__PURE__ */ j("div", { className: "relative", children: [
              /* @__PURE__ */ p(
                "input",
                {
                  type: "text",
                  readOnly: !0,
                  value: B,
                  placeholder: r,
                  disabled: a,
                  className: _(
                    "w-full h-10 px-3 border rounded bg-white text-sm",
                    c && "pr-10",
                    "hover:bg-gray-50 hover:border-gray-400",
                    "focus:outline-none",
                    "transition-all duration-150",
                    "cursor-pointer",
                    s ? "border-red-500" : "border-gray-300",
                    a && _(
                      "bg-gray-100 cursor-not-allowed",
                      "hover:bg-gray-100 hover:border-gray-300"
                    )
                  )
                }
              ),
              c && /* @__PURE__ */ p(
                Qp,
                {
                  className: _(
                    "absolute right-3 top-1/2 -translate-y-1/2",
                    "w-4 h-4 text-gray-400",
                    a && "opacity-50"
                  )
                }
              )
            ] }) }),
            /* @__PURE__ */ p(rr, { children: /* @__PURE__ */ j(
              xn,
              {
                align: "start",
                sideOffset: 5,
                className: _(
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
                  /* @__PURE__ */ p("div", { className: "p-4", children: /* @__PURE__ */ j("div", { className: "flex gap-2", children: [
                    /* @__PURE__ */ j("div", { className: "flex flex-col", children: [
                      /* @__PURE__ */ p("div", { className: "text-xs text-gray-500 text-center mb-2 font-medium", children: o === "24h" ? "시" : "Hour" }),
                      /* @__PURE__ */ p(
                        "div",
                        {
                          ref: S,
                          className: "w-16 h-48 overflow-y-auto border border-gray-200 rounded scrollbar-thin",
                          children: O.map((R) => /* @__PURE__ */ p(
                            "button",
                            {
                              "data-value": R,
                              onClick: () => y(R),
                              className: _(
                                "w-full h-10 text-sm transition-colors",
                                "hover:bg-gray-100",
                                h === R ? "bg-blue-100 text-blue-700 font-medium" : "text-gray-700"
                              ),
                              "aria-label": `${R}${o === "24h" ? "시" : ""}`,
                              "aria-selected": h === R,
                              children: o === "24h" ? R.toString().padStart(2, "0") : R
                            },
                            R
                          ))
                        }
                      )
                    ] }),
                    /* @__PURE__ */ j("div", { className: "flex flex-col", children: [
                      /* @__PURE__ */ p("div", { className: "text-xs text-gray-500 text-center mb-2 font-medium", children: o === "24h" ? "분" : "Min" }),
                      /* @__PURE__ */ p(
                        "div",
                        {
                          ref: k,
                          className: "w-16 h-48 overflow-y-auto border border-gray-200 rounded scrollbar-thin",
                          children: T.map((R) => /* @__PURE__ */ p(
                            "button",
                            {
                              "data-value": R,
                              onClick: () => x(R),
                              className: _(
                                "w-full h-10 text-sm transition-colors",
                                "hover:bg-gray-100",
                                g === R ? "bg-blue-100 text-blue-700 font-medium" : "text-gray-700"
                              ),
                              "aria-label": `${R}${o === "24h" ? "분" : " minutes"}`,
                              "aria-selected": g === R,
                              children: R.toString().padStart(2, "0")
                            },
                            R
                          ))
                        }
                      )
                    ] }),
                    o === "12h" && /* @__PURE__ */ j("div", { className: "flex flex-col", children: [
                      /* @__PURE__ */ p("div", { className: "text-xs text-gray-500 text-center mb-2 font-medium", children: "Period" }),
                      /* @__PURE__ */ j("div", { className: "w-16 flex flex-col gap-1", children: [
                        /* @__PURE__ */ p(
                          "button",
                          {
                            onClick: () => M("AM"),
                            className: _(
                              "h-10 text-sm rounded transition-colors",
                              "hover:bg-gray-100",
                              w === "AM" ? "bg-blue-100 text-blue-700 font-medium" : "text-gray-700"
                            ),
                            "aria-label": "AM",
                            "aria-selected": w === "AM",
                            children: "AM"
                          }
                        ),
                        /* @__PURE__ */ p(
                          "button",
                          {
                            onClick: () => M("PM"),
                            className: _(
                              "h-10 text-sm rounded transition-colors",
                              "hover:bg-gray-100",
                              w === "PM" ? "bg-blue-100 text-blue-700 font-medium" : "text-gray-700"
                            ),
                            "aria-label": "PM",
                            "aria-selected": w === "PM",
                            children: "PM"
                          }
                        )
                      ] })
                    ] })
                  ] }) }),
                  /* @__PURE__ */ p(
                    "div",
                    {
                      className: _(
                        "flex items-end justify-end px-4 pb-4",
                        "border-t border-gray-200 pt-2"
                      ),
                      children: /* @__PURE__ */ j("div", { className: "flex gap-2", children: [
                        /* @__PURE__ */ p(
                          "button",
                          {
                            onClick: F,
                            className: _(
                              "w-15 h-8 rounded",
                              "text-xs font-medium text-gray-700",
                              "border border-gray-300",
                              "transition-all duration-150",
                              "active:scale-95",
                              "hover:bg-gray-50"
                            ),
                            children: "취소"
                          }
                        ),
                        /* @__PURE__ */ p(
                          "button",
                          {
                            onClick: I,
                            disabled: h === null || g === null,
                            className: _(
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
      (l || i) && /* @__PURE__ */ p("div", { children: s && i ? /* @__PURE__ */ p("p", { className: "text-xs text-red-500", children: i }) : l && /* @__PURE__ */ p("p", { className: "text-xs text-gray-500", children: l }) })
    ] });
  }
);
tg.displayName = "TimePicker";
function po(e) {
  const t = b.useRef({ value: e, previous: e });
  return b.useMemo(() => (t.current.value !== e && (t.current.previous = t.current.value, t.current.value = e), t.current.previous), [e]);
}
var sr = "Switch", [ng] = He(sr), [rg, og] = ng(sr), ii = b.forwardRef(
  (e, t) => {
    const {
      __scopeSwitch: n,
      name: r,
      checked: o,
      defaultChecked: a,
      required: s,
      disabled: i,
      value: l = "on",
      onCheckedChange: d,
      form: u,
      ...c
    } = e, [f, m] = b.useState(null), v = de(t, (w) => m(w)), h = b.useRef(!1), y = f ? u || !!f.closest("form") : !0, [g, x] = ut({
      prop: o,
      defaultProp: a ?? !1,
      onChange: d,
      caller: sr
    });
    return /* @__PURE__ */ j(rg, { scope: n, checked: g, disabled: i, children: [
      /* @__PURE__ */ p(
        ne.button,
        {
          type: "button",
          role: "switch",
          "aria-checked": g,
          "aria-required": s,
          "data-state": ui(g),
          "data-disabled": i ? "" : void 0,
          disabled: i,
          value: l,
          ...c,
          ref: v,
          onClick: se(e.onClick, (w) => {
            x((M) => !M), y && (h.current = w.isPropagationStopped(), h.current || w.stopPropagation());
          })
        }
      ),
      y && /* @__PURE__ */ p(
        di,
        {
          control: f,
          bubbles: !h.current,
          name: r,
          value: l,
          checked: g,
          required: s,
          disabled: i,
          form: u,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
ii.displayName = sr;
var ci = "SwitchThumb", li = b.forwardRef(
  (e, t) => {
    const { __scopeSwitch: n, ...r } = e, o = og(ci, n);
    return /* @__PURE__ */ p(
      ne.span,
      {
        "data-state": ui(o.checked),
        "data-disabled": o.disabled ? "" : void 0,
        ...r,
        ref: t
      }
    );
  }
);
li.displayName = ci;
var ag = "SwitchBubbleInput", di = b.forwardRef(
  ({
    __scopeSwitch: e,
    control: t,
    checked: n,
    bubbles: r = !0,
    ...o
  }, a) => {
    const s = b.useRef(null), i = de(s, a), l = po(n), d = Zn(t);
    return b.useEffect(() => {
      const u = s.current;
      if (!u) return;
      const c = window.HTMLInputElement.prototype, m = Object.getOwnPropertyDescriptor(
        c,
        "checked"
      ).set;
      if (l !== n && m) {
        const v = new Event("click", { bubbles: r });
        m.call(u, n), u.dispatchEvent(v);
      }
    }, [l, n, r]), /* @__PURE__ */ p(
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
          ...d,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
di.displayName = ag;
function ui(e) {
  return e ? "checked" : "unchecked";
}
var fi = ii, sg = li;
const ig = ze(
  _(
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
), cg = C.forwardRef(({ className: e, variant: t, ...n }, r) => /* @__PURE__ */ p(
  fi,
  {
    className: _(ig({ variant: t }), e),
    ...n,
    ref: r,
    children: /* @__PURE__ */ p(
      sg,
      {
        className: _(
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
cg.displayName = fi.displayName;
function mi(e) {
  const t = e + "CollectionProvider", [n, r] = He(t), [o, a] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), s = (h) => {
    const { scope: y, children: g } = h, x = C.useRef(null), w = C.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ p(o, { scope: y, itemMap: w, collectionRef: x, children: g });
  };
  s.displayName = t;
  const i = e + "CollectionSlot", l = /* @__PURE__ */ hn(i), d = C.forwardRef(
    (h, y) => {
      const { scope: g, children: x } = h, w = a(i, g), M = de(y, w.collectionRef);
      return /* @__PURE__ */ p(l, { ref: M, children: x });
    }
  );
  d.displayName = i;
  const u = e + "CollectionItemSlot", c = "data-radix-collection-item", f = /* @__PURE__ */ hn(u), m = C.forwardRef(
    (h, y) => {
      const { scope: g, children: x, ...w } = h, M = C.useRef(null), S = de(y, M), k = a(u, g);
      return C.useEffect(() => (k.itemMap.set(M, { ref: M, ...w }), () => void k.itemMap.delete(M))), /* @__PURE__ */ p(f, { [c]: "", ref: S, children: x });
    }
  );
  m.displayName = u;
  function v(h) {
    const y = a(e + "CollectionConsumer", h);
    return C.useCallback(() => {
      const x = y.collectionRef.current;
      if (!x) return [];
      const w = Array.from(x.querySelectorAll(`[${c}]`));
      return Array.from(y.itemMap.values()).sort(
        (k, O) => w.indexOf(k.ref.current) - w.indexOf(O.ref.current)
      );
    }, [y.collectionRef, y.itemMap]);
  }
  return [
    { Provider: s, Slot: d, ItemSlot: m },
    v,
    r
  ];
}
var lg = b.createContext(void 0);
function go(e) {
  const t = b.useContext(lg);
  return e || t || "ltr";
}
var Tr = "rovingFocusGroup.onEntryFocus", dg = { bubbles: !1, cancelable: !0 }, Sn = "RovingFocusGroup", [Hr, hi, ug] = mi(Sn), [fg, pi] = He(
  Sn,
  [ug]
), [mg, hg] = fg(Sn), gi = b.forwardRef(
  (e, t) => /* @__PURE__ */ p(Hr.Provider, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ p(Hr.Slot, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ p(pg, { ...e, ref: t }) }) })
);
gi.displayName = Sn;
var pg = b.forwardRef((e, t) => {
  const {
    __scopeRovingFocusGroup: n,
    orientation: r,
    loop: o = !1,
    dir: a,
    currentTabStopId: s,
    defaultCurrentTabStopId: i,
    onCurrentTabStopIdChange: l,
    onEntryFocus: d,
    preventScrollOnEntryFocus: u = !1,
    ...c
  } = e, f = b.useRef(null), m = de(t, f), v = go(a), [h, y] = ut({
    prop: s,
    defaultProp: i ?? null,
    onChange: l,
    caller: Sn
  }), [g, x] = b.useState(!1), w = Rt(d), M = hi(n), S = b.useRef(!1), [k, O] = b.useState(0);
  return b.useEffect(() => {
    const T = f.current;
    if (T)
      return T.addEventListener(Tr, w), () => T.removeEventListener(Tr, w);
  }, [w]), /* @__PURE__ */ p(
    mg,
    {
      scope: n,
      orientation: r,
      dir: v,
      loop: o,
      currentTabStopId: h,
      onItemFocus: b.useCallback(
        (T) => y(T),
        [y]
      ),
      onItemShiftTab: b.useCallback(() => x(!0), []),
      onFocusableItemAdd: b.useCallback(
        () => O((T) => T + 1),
        []
      ),
      onFocusableItemRemove: b.useCallback(
        () => O((T) => T - 1),
        []
      ),
      children: /* @__PURE__ */ p(
        ne.div,
        {
          tabIndex: g || k === 0 ? -1 : 0,
          "data-orientation": r,
          ...c,
          ref: m,
          style: { outline: "none", ...e.style },
          onMouseDown: se(e.onMouseDown, () => {
            S.current = !0;
          }),
          onFocus: se(e.onFocus, (T) => {
            const B = !S.current;
            if (T.target === T.currentTarget && B && !g) {
              const I = new CustomEvent(Tr, dg);
              if (T.currentTarget.dispatchEvent(I), !I.defaultPrevented) {
                const F = M().filter((N) => N.focusable), R = F.find((N) => N.active), Y = F.find((N) => N.id === h), P = [R, Y, ...F].filter(
                  Boolean
                ).map((N) => N.ref.current);
                vi(P, u);
              }
            }
            S.current = !1;
          }),
          onBlur: se(e.onBlur, () => x(!1))
        }
      )
    }
  );
}), bi = "RovingFocusGroupItem", yi = b.forwardRef(
  (e, t) => {
    const {
      __scopeRovingFocusGroup: n,
      focusable: r = !0,
      active: o = !1,
      tabStopId: a,
      children: s,
      ...i
    } = e, l = Et(), d = a || l, u = hg(bi, n), c = u.currentTabStopId === d, f = hi(n), { onFocusableItemAdd: m, onFocusableItemRemove: v, currentTabStopId: h } = u;
    return b.useEffect(() => {
      if (r)
        return m(), () => v();
    }, [r, m, v]), /* @__PURE__ */ p(
      Hr.ItemSlot,
      {
        scope: n,
        id: d,
        focusable: r,
        active: o,
        children: /* @__PURE__ */ p(
          ne.span,
          {
            tabIndex: c ? 0 : -1,
            "data-orientation": u.orientation,
            ...i,
            ref: t,
            onMouseDown: se(e.onMouseDown, (y) => {
              r ? u.onItemFocus(d) : y.preventDefault();
            }),
            onFocus: se(e.onFocus, () => u.onItemFocus(d)),
            onKeyDown: se(e.onKeyDown, (y) => {
              if (y.key === "Tab" && y.shiftKey) {
                u.onItemShiftTab();
                return;
              }
              if (y.target !== y.currentTarget) return;
              const g = yg(y, u.orientation, u.dir);
              if (g !== void 0) {
                if (y.metaKey || y.ctrlKey || y.altKey || y.shiftKey) return;
                y.preventDefault();
                let w = f().filter((M) => M.focusable).map((M) => M.ref.current);
                if (g === "last") w.reverse();
                else if (g === "prev" || g === "next") {
                  g === "prev" && w.reverse();
                  const M = w.indexOf(y.currentTarget);
                  w = u.loop ? vg(w, M + 1) : w.slice(M + 1);
                }
                setTimeout(() => vi(w));
              }
            }),
            children: typeof s == "function" ? s({ isCurrentTabStop: c, hasTabStop: h != null }) : s
          }
        )
      }
    );
  }
);
yi.displayName = bi;
var gg = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function bg(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function yg(e, t, n) {
  const r = bg(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r)))
    return gg[r];
}
function vi(e, t = !1) {
  const n = document.activeElement;
  for (const r of e)
    if (r === n || (r.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function vg(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var wg = gi, xg = yi, bo = "Radio", [kg, wi] = He(bo), [Cg, Mg] = kg(bo), xi = b.forwardRef(
  (e, t) => {
    const {
      __scopeRadio: n,
      name: r,
      checked: o = !1,
      required: a,
      disabled: s,
      value: i = "on",
      onCheck: l,
      form: d,
      ...u
    } = e, [c, f] = b.useState(null), m = de(t, (y) => f(y)), v = b.useRef(!1), h = c ? d || !!c.closest("form") : !0;
    return /* @__PURE__ */ j(Cg, { scope: n, checked: o, disabled: s, children: [
      /* @__PURE__ */ p(
        ne.button,
        {
          type: "button",
          role: "radio",
          "aria-checked": o,
          "data-state": Si(o),
          "data-disabled": s ? "" : void 0,
          disabled: s,
          value: i,
          ...u,
          ref: m,
          onClick: se(e.onClick, (y) => {
            o || l == null || l(), h && (v.current = y.isPropagationStopped(), v.current || y.stopPropagation());
          })
        }
      ),
      h && /* @__PURE__ */ p(
        Mi,
        {
          control: c,
          bubbles: !v.current,
          name: r,
          value: i,
          checked: o,
          required: a,
          disabled: s,
          form: d,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
xi.displayName = bo;
var ki = "RadioIndicator", Ci = b.forwardRef(
  (e, t) => {
    const { __scopeRadio: n, forceMount: r, ...o } = e, a = Mg(ki, n);
    return /* @__PURE__ */ p(dt, { present: r || a.checked, children: /* @__PURE__ */ p(
      ne.span,
      {
        "data-state": Si(a.checked),
        "data-disabled": a.disabled ? "" : void 0,
        ...o,
        ref: t
      }
    ) });
  }
);
Ci.displayName = ki;
var Sg = "RadioBubbleInput", Mi = b.forwardRef(
  ({
    __scopeRadio: e,
    control: t,
    checked: n,
    bubbles: r = !0,
    ...o
  }, a) => {
    const s = b.useRef(null), i = de(s, a), l = po(n), d = Zn(t);
    return b.useEffect(() => {
      const u = s.current;
      if (!u) return;
      const c = window.HTMLInputElement.prototype, m = Object.getOwnPropertyDescriptor(
        c,
        "checked"
      ).set;
      if (l !== n && m) {
        const v = new Event("click", { bubbles: r });
        m.call(u, n), u.dispatchEvent(v);
      }
    }, [l, n, r]), /* @__PURE__ */ p(
      ne.input,
      {
        type: "radio",
        "aria-hidden": !0,
        defaultChecked: n,
        ...o,
        tabIndex: -1,
        ref: i,
        style: {
          ...o.style,
          ...d,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
Mi.displayName = Sg;
function Si(e) {
  return e ? "checked" : "unchecked";
}
var Ng = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], ir = "RadioGroup", [Dg] = He(ir, [
  pi,
  wi
]), Ni = pi(), Di = wi(), [Og, Eg] = Dg(ir), Oi = b.forwardRef(
  (e, t) => {
    const {
      __scopeRadioGroup: n,
      name: r,
      defaultValue: o,
      value: a,
      required: s = !1,
      disabled: i = !1,
      orientation: l,
      dir: d,
      loop: u = !0,
      onValueChange: c,
      ...f
    } = e, m = Ni(n), v = go(d), [h, y] = ut({
      prop: a,
      defaultProp: o ?? null,
      onChange: c,
      caller: ir
    });
    return /* @__PURE__ */ p(
      Og,
      {
        scope: n,
        name: r,
        required: s,
        disabled: i,
        value: h,
        onValueChange: y,
        children: /* @__PURE__ */ p(
          wg,
          {
            asChild: !0,
            ...m,
            orientation: l,
            dir: v,
            loop: u,
            children: /* @__PURE__ */ p(
              ne.div,
              {
                role: "radiogroup",
                "aria-required": s,
                "aria-orientation": l,
                "data-disabled": i ? "" : void 0,
                dir: v,
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
Oi.displayName = ir;
var Ei = "RadioGroupItem", Pi = b.forwardRef(
  (e, t) => {
    const { __scopeRadioGroup: n, disabled: r, ...o } = e, a = Eg(Ei, n), s = a.disabled || r, i = Ni(n), l = Di(n), d = b.useRef(null), u = de(t, d), c = a.value === o.value, f = b.useRef(!1);
    return b.useEffect(() => {
      const m = (h) => {
        Ng.includes(h.key) && (f.current = !0);
      }, v = () => f.current = !1;
      return document.addEventListener("keydown", m), document.addEventListener("keyup", v), () => {
        document.removeEventListener("keydown", m), document.removeEventListener("keyup", v);
      };
    }, []), /* @__PURE__ */ p(
      xg,
      {
        asChild: !0,
        ...i,
        focusable: !s,
        active: c,
        children: /* @__PURE__ */ p(
          xi,
          {
            disabled: s,
            required: a.required,
            checked: c,
            ...l,
            ...o,
            name: a.name,
            ref: u,
            onCheck: () => a.onValueChange(o.value),
            onKeyDown: se((m) => {
              m.key === "Enter" && m.preventDefault();
            }),
            onFocus: se(o.onFocus, () => {
              var m;
              f.current && ((m = d.current) == null || m.click());
            })
          }
        )
      }
    );
  }
);
Pi.displayName = Ei;
var Pg = "RadioGroupIndicator", Ri = b.forwardRef(
  (e, t) => {
    const { __scopeRadioGroup: n, ...r } = e, o = Di(n);
    return /* @__PURE__ */ p(Ci, { ...o, ...r, ref: t });
  }
);
Ri.displayName = Pg;
var Ai = Oi, Ti = Pi, Rg = Ri;
const Ag = C.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ p(Ai, { className: e, ...t, ref: n }));
Ag.displayName = Ai.displayName;
const Tg = ze(
  _(
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
        black: _(
          "border-cms-gray-300 text-cms-black",
          "data-[state=checked]:border-cms-black"
        ),
        default: _(
          "border-cms-gray-300 text-cms-primary-300",
          "data-[state=checked]:border-cms-primary-300"
        ),
        green: _(
          "border-cms-gray-300 text-cms-green-500",
          "data-[state=checked]:border-cms-green-500"
        ),
        blue: _(
          "border-cms-gray-300 text-cms-blue-700",
          "data-[state=checked]:border-cms-blue-700"
        ),
        red: _(
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
), _g = ze(
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
), Ig = C.forwardRef(({ className: e, variant: t, size: n, ...r }, o) => /* @__PURE__ */ p(
  Ti,
  {
    ref: o,
    className: _(Tg({ variant: t, size: n }), e),
    ...r,
    children: /* @__PURE__ */ p(
      Rg,
      {
        className: _(_g({ variant: t, size: n }))
      }
    )
  }
));
Ig.displayName = Ti.displayName;
var cr = "Collapsible", [Wg, _i] = He(cr), [$g, yo] = Wg(cr), Ii = b.forwardRef(
  (e, t) => {
    const {
      __scopeCollapsible: n,
      open: r,
      defaultOpen: o,
      disabled: a,
      onOpenChange: s,
      ...i
    } = e, [l, d] = ut({
      prop: r,
      defaultProp: o ?? !1,
      onChange: s,
      caller: cr
    });
    return /* @__PURE__ */ p(
      $g,
      {
        scope: n,
        disabled: a,
        contentId: Et(),
        open: l,
        onOpenToggle: b.useCallback(() => d((u) => !u), [d]),
        children: /* @__PURE__ */ p(
          ne.div,
          {
            "data-state": wo(l),
            "data-disabled": a ? "" : void 0,
            ...i,
            ref: t
          }
        )
      }
    );
  }
);
Ii.displayName = cr;
var Wi = "CollapsibleTrigger", $i = b.forwardRef(
  (e, t) => {
    const { __scopeCollapsible: n, ...r } = e, o = yo(Wi, n);
    return /* @__PURE__ */ p(
      ne.button,
      {
        type: "button",
        "aria-controls": o.contentId,
        "aria-expanded": o.open || !1,
        "data-state": wo(o.open),
        "data-disabled": o.disabled ? "" : void 0,
        disabled: o.disabled,
        ...r,
        ref: t,
        onClick: se(e.onClick, o.onOpenToggle)
      }
    );
  }
);
$i.displayName = Wi;
var vo = "CollapsibleContent", Fi = b.forwardRef(
  (e, t) => {
    const { forceMount: n, ...r } = e, o = yo(vo, e.__scopeCollapsible);
    return /* @__PURE__ */ p(dt, { present: n || o.open, children: ({ present: a }) => /* @__PURE__ */ p(Fg, { ...r, ref: t, present: a }) });
  }
);
Fi.displayName = vo;
var Fg = b.forwardRef((e, t) => {
  const { __scopeCollapsible: n, present: r, children: o, ...a } = e, s = yo(vo, n), [i, l] = b.useState(r), d = b.useRef(null), u = de(t, d), c = b.useRef(0), f = c.current, m = b.useRef(0), v = m.current, h = s.open || i, y = b.useRef(h), g = b.useRef(void 0);
  return b.useEffect(() => {
    const x = requestAnimationFrame(() => y.current = !1);
    return () => cancelAnimationFrame(x);
  }, []), it(() => {
    const x = d.current;
    if (x) {
      g.current = g.current || {
        transitionDuration: x.style.transitionDuration,
        animationName: x.style.animationName
      }, x.style.transitionDuration = "0s", x.style.animationName = "none";
      const w = x.getBoundingClientRect();
      c.current = w.height, m.current = w.width, y.current || (x.style.transitionDuration = g.current.transitionDuration, x.style.animationName = g.current.animationName), l(r);
    }
  }, [s.open, r]), /* @__PURE__ */ p(
    ne.div,
    {
      "data-state": wo(s.open),
      "data-disabled": s.disabled ? "" : void 0,
      id: s.contentId,
      hidden: !h,
      ...a,
      ref: u,
      style: {
        "--radix-collapsible-content-height": f ? `${f}px` : void 0,
        "--radix-collapsible-content-width": v ? `${v}px` : void 0,
        ...e.style
      },
      children: h && o
    }
  );
});
function wo(e) {
  return e ? "open" : "closed";
}
var Yg = Ii, Bg = $i, zg = Fi, Le = "Accordion", Hg = ["Home", "End", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"], [xo, Lg, jg] = mi(Le), [lr] = He(Le, [
  jg,
  _i
]), ko = _i(), Yi = C.forwardRef(
  (e, t) => {
    const { type: n, ...r } = e, o = r, a = r;
    return /* @__PURE__ */ p(xo.Provider, { scope: e.__scopeAccordion, children: n === "multiple" ? /* @__PURE__ */ p(qg, { ...a, ref: t }) : /* @__PURE__ */ p(Ug, { ...o, ref: t }) });
  }
);
Yi.displayName = Le;
var [Bi, Vg] = lr(Le), [zi, Gg] = lr(
  Le,
  { collapsible: !1 }
), Ug = C.forwardRef(
  (e, t) => {
    const {
      value: n,
      defaultValue: r,
      onValueChange: o = () => {
      },
      collapsible: a = !1,
      ...s
    } = e, [i, l] = ut({
      prop: n,
      defaultProp: r ?? "",
      onChange: o,
      caller: Le
    });
    return /* @__PURE__ */ p(
      Bi,
      {
        scope: e.__scopeAccordion,
        value: C.useMemo(() => i ? [i] : [], [i]),
        onItemOpen: l,
        onItemClose: C.useCallback(() => a && l(""), [a, l]),
        children: /* @__PURE__ */ p(zi, { scope: e.__scopeAccordion, collapsible: a, children: /* @__PURE__ */ p(Hi, { ...s, ref: t }) })
      }
    );
  }
), qg = C.forwardRef((e, t) => {
  const {
    value: n,
    defaultValue: r,
    onValueChange: o = () => {
    },
    ...a
  } = e, [s, i] = ut({
    prop: n,
    defaultProp: r ?? [],
    onChange: o,
    caller: Le
  }), l = C.useCallback(
    (u) => i((c = []) => [...c, u]),
    [i]
  ), d = C.useCallback(
    (u) => i((c = []) => c.filter((f) => f !== u)),
    [i]
  );
  return /* @__PURE__ */ p(
    Bi,
    {
      scope: e.__scopeAccordion,
      value: s,
      onItemOpen: l,
      onItemClose: d,
      children: /* @__PURE__ */ p(zi, { scope: e.__scopeAccordion, collapsible: !0, children: /* @__PURE__ */ p(Hi, { ...a, ref: t }) })
    }
  );
}), [Xg, dr] = lr(Le), Hi = C.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, disabled: r, dir: o, orientation: a = "vertical", ...s } = e, i = C.useRef(null), l = de(i, t), d = Lg(n), c = go(o) === "ltr", f = se(e.onKeyDown, (m) => {
      var T;
      if (!Hg.includes(m.key)) return;
      const v = m.target, h = d().filter((B) => {
        var I;
        return !((I = B.ref.current) != null && I.disabled);
      }), y = h.findIndex((B) => B.ref.current === v), g = h.length;
      if (y === -1) return;
      m.preventDefault();
      let x = y;
      const w = 0, M = g - 1, S = () => {
        x = y + 1, x > M && (x = w);
      }, k = () => {
        x = y - 1, x < w && (x = M);
      };
      switch (m.key) {
        case "Home":
          x = w;
          break;
        case "End":
          x = M;
          break;
        case "ArrowRight":
          a === "horizontal" && (c ? S() : k());
          break;
        case "ArrowDown":
          a === "vertical" && S();
          break;
        case "ArrowLeft":
          a === "horizontal" && (c ? k() : S());
          break;
        case "ArrowUp":
          a === "vertical" && k();
          break;
      }
      const O = x % g;
      (T = h[O].ref.current) == null || T.focus();
    });
    return /* @__PURE__ */ p(
      Xg,
      {
        scope: n,
        disabled: r,
        direction: o,
        orientation: a,
        children: /* @__PURE__ */ p(xo.Slot, { scope: n, children: /* @__PURE__ */ p(
          ne.div,
          {
            ...s,
            "data-orientation": a,
            ref: l,
            onKeyDown: r ? void 0 : f
          }
        ) })
      }
    );
  }
), Gn = "AccordionItem", [Kg, Co] = lr(Gn), Li = C.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, value: r, ...o } = e, a = dr(Gn, n), s = Vg(Gn, n), i = ko(n), l = Et(), d = r && s.value.includes(r) || !1, u = a.disabled || e.disabled;
    return /* @__PURE__ */ p(
      Kg,
      {
        scope: n,
        open: d,
        disabled: u,
        triggerId: l,
        children: /* @__PURE__ */ p(
          Yg,
          {
            "data-orientation": a.orientation,
            "data-state": Xi(d),
            ...i,
            ...o,
            ref: t,
            disabled: u,
            open: d,
            onOpenChange: (c) => {
              c ? s.onItemOpen(r) : s.onItemClose(r);
            }
          }
        )
      }
    );
  }
);
Li.displayName = Gn;
var ji = "AccordionHeader", Vi = C.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, ...r } = e, o = dr(Le, n), a = Co(ji, n);
    return /* @__PURE__ */ p(
      ne.h3,
      {
        "data-orientation": o.orientation,
        "data-state": Xi(a.open),
        "data-disabled": a.disabled ? "" : void 0,
        ...r,
        ref: t
      }
    );
  }
);
Vi.displayName = ji;
var Lr = "AccordionTrigger", Gi = C.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, ...r } = e, o = dr(Le, n), a = Co(Lr, n), s = Gg(Lr, n), i = ko(n);
    return /* @__PURE__ */ p(xo.ItemSlot, { scope: n, children: /* @__PURE__ */ p(
      Bg,
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
Gi.displayName = Lr;
var Ui = "AccordionContent", qi = C.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, ...r } = e, o = dr(Le, n), a = Co(Ui, n), s = ko(n);
    return /* @__PURE__ */ p(
      zg,
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
qi.displayName = Ui;
function Xi(e) {
  return e ? "open" : "closed";
}
var Qg = Yi, Zg = Li, Jg = Vi, eb = Gi, tb = qi;
const nb = ({
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
  return /* @__PURE__ */ j(Zg, { value: e.url, className: "border-none", children: [
    /* @__PURE__ */ p(Jg, { className: "m-0", children: /* @__PURE__ */ j(
      eb,
      {
        onClick: (i) => {
          e.subMenu || (i.preventDefault(), o(e.url));
        },
        className: _(
          "group flex items-center px-5",
          "text-white font-bold text-lg",
          "w-full h-15",
          "transition-colors",
          "cursor-pointer",
          !a && "data-[state=open]:bg-transparent",
          !e.subMenu && n && "bg-cms-primary-400 text-cms-black",
          a && "bg-cms-primary-200 text-cms-black"
        ),
        children: [
          e.icon && /* @__PURE__ */ p(
            "div",
            {
              className: _(
                "mr-3 flex items-center",
                "[&>svg]:w-6 [&>svg]:h-6",
                !e.subMenu && n || a ? "text-cms-black" : "text-white"
              ),
              children: e.icon
            }
          ),
          /* @__PURE__ */ p(
            "span",
            {
              className: _(
                !e.subMenu && n || a ? "text-cms-black" : "text-white"
              ),
              children: e.title
            }
          ),
          e.subMenu && /* @__PURE__ */ p(
            Gp,
            {
              className: _(
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
    e.subMenu && /* @__PURE__ */ p(
      tb,
      {
        className: _(
          "overflow-hidden",
          "bg-[#232427]",
          "data-[state=open]:animate-accordion-down",
          "data-[state=closed]:animate-accordion-up"
        ),
        children: e.subMenu.map((i) => {
          const l = i.url === r;
          return /* @__PURE__ */ p(
            "div",
            {
              onClick: () => o(i.url),
              className: _(
                "flex items-center",
                "h-13 px-5 pl-14",
                "cursor-pointer",
                "transition-colors",
                "hover:bg-[#2e2f32]"
              ),
              children: /* @__PURE__ */ p(
                "span",
                {
                  className: _(
                    "text-base font-bold",
                    "transition-colors",
                    l ? "text-cms-primary-400 font-bold" : "text-cms-white"
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
}, rb = C.forwardRef(
  ({ title: e, menus: t, selectedUrl: n, onMenuClick: r, headerSlot: o, className: a, ...s }, i) => {
    const [l, d] = ve([]);
    return /* @__PURE__ */ j(
      "div",
      {
        ref: i,
        className: _(
          "flex flex-col",
          "w-70 min-w-70 max-w-70 h-full",
          "bg-[#2c2d30] text-white",
          a
        ),
        ...s,
        children: [
          o,
          e && !o && /* @__PURE__ */ p("div", { className: "px-5 py-4 border-b border-[#3a3b3e]", children: /* @__PURE__ */ p("h2", { className: "text-lg font-semibold text-white", children: e }) }),
          /* @__PURE__ */ p(
            "div",
            {
              className: _(
                "flex-1 overflow-y-auto",
                "scrollbar-thin",
                "scrollbar-thumb-[#3a3b3e]",
                "scrollbar-track-transparent"
              ),
              children: /* @__PURE__ */ p(
                Qg,
                {
                  type: "multiple",
                  value: l,
                  onValueChange: d,
                  children: t.map((u) => /* @__PURE__ */ p(
                    nb,
                    {
                      menu: u,
                      isOpen: l.includes(u.url),
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
rb.displayName = "SideNavigation";
var ur = "Checkbox", [ob] = He(ur), [ab, Mo] = ob(ur);
function sb(e) {
  const {
    __scopeCheckbox: t,
    checked: n,
    children: r,
    defaultChecked: o,
    disabled: a,
    form: s,
    name: i,
    onCheckedChange: l,
    required: d,
    value: u = "on",
    // @ts-expect-error
    internal_do_not_use_render: c
  } = e, [f, m] = ut({
    prop: n,
    defaultProp: o ?? !1,
    onChange: l,
    caller: ur
  }), [v, h] = b.useState(null), [y, g] = b.useState(null), x = b.useRef(!1), w = v ? !!s || !!v.closest("form") : (
    // We set this to true by default so that events bubble to forms without JS (SSR)
    !0
  ), M = {
    checked: f,
    disabled: a,
    setChecked: m,
    control: v,
    setControl: h,
    name: i,
    form: s,
    value: u,
    hasConsumerStoppedPropagationRef: x,
    required: d,
    defaultChecked: wt(o) ? !1 : o,
    isFormControl: w,
    bubbleInput: y,
    setBubbleInput: g
  };
  return /* @__PURE__ */ p(
    ab,
    {
      scope: t,
      ...M,
      children: ib(c) ? c(M) : r
    }
  );
}
var Ki = "CheckboxTrigger", Qi = b.forwardRef(
  ({ __scopeCheckbox: e, onKeyDown: t, onClick: n, ...r }, o) => {
    const {
      control: a,
      value: s,
      disabled: i,
      checked: l,
      required: d,
      setControl: u,
      setChecked: c,
      hasConsumerStoppedPropagationRef: f,
      isFormControl: m,
      bubbleInput: v
    } = Mo(Ki, e), h = de(o, u), y = b.useRef(l);
    return b.useEffect(() => {
      const g = a == null ? void 0 : a.form;
      if (g) {
        const x = () => c(y.current);
        return g.addEventListener("reset", x), () => g.removeEventListener("reset", x);
      }
    }, [a, c]), /* @__PURE__ */ p(
      ne.button,
      {
        type: "button",
        role: "checkbox",
        "aria-checked": wt(l) ? "mixed" : l,
        "aria-required": d,
        "data-state": rc(l),
        "data-disabled": i ? "" : void 0,
        disabled: i,
        value: s,
        ...r,
        ref: h,
        onKeyDown: se(t, (g) => {
          g.key === "Enter" && g.preventDefault();
        }),
        onClick: se(n, (g) => {
          c((x) => wt(x) ? !0 : !x), v && m && (f.current = g.isPropagationStopped(), f.current || g.stopPropagation());
        })
      }
    );
  }
);
Qi.displayName = Ki;
var Zi = b.forwardRef(
  (e, t) => {
    const {
      __scopeCheckbox: n,
      name: r,
      checked: o,
      defaultChecked: a,
      required: s,
      disabled: i,
      value: l,
      onCheckedChange: d,
      form: u,
      ...c
    } = e;
    return /* @__PURE__ */ p(
      sb,
      {
        __scopeCheckbox: n,
        checked: o,
        defaultChecked: a,
        disabled: i,
        required: s,
        onCheckedChange: d,
        name: r,
        form: u,
        value: l,
        internal_do_not_use_render: ({ isFormControl: f }) => /* @__PURE__ */ j(mn, { children: [
          /* @__PURE__ */ p(
            Qi,
            {
              ...c,
              ref: t,
              __scopeCheckbox: n
            }
          ),
          f && /* @__PURE__ */ p(
            nc,
            {
              __scopeCheckbox: n
            }
          )
        ] })
      }
    );
  }
);
Zi.displayName = ur;
var Ji = "CheckboxIndicator", ec = b.forwardRef(
  (e, t) => {
    const { __scopeCheckbox: n, forceMount: r, ...o } = e, a = Mo(Ji, n);
    return /* @__PURE__ */ p(
      dt,
      {
        present: r || wt(a.checked) || a.checked === !0,
        children: /* @__PURE__ */ p(
          ne.span,
          {
            "data-state": rc(a.checked),
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
ec.displayName = Ji;
var tc = "CheckboxBubbleInput", nc = b.forwardRef(
  ({ __scopeCheckbox: e, ...t }, n) => {
    const {
      control: r,
      hasConsumerStoppedPropagationRef: o,
      checked: a,
      defaultChecked: s,
      required: i,
      disabled: l,
      name: d,
      value: u,
      form: c,
      bubbleInput: f,
      setBubbleInput: m
    } = Mo(tc, e), v = de(n, m), h = po(a), y = Zn(r);
    b.useEffect(() => {
      const x = f;
      if (!x) return;
      const w = window.HTMLInputElement.prototype, S = Object.getOwnPropertyDescriptor(
        w,
        "checked"
      ).set, k = !o.current;
      if (h !== a && S) {
        const O = new Event("click", { bubbles: k });
        x.indeterminate = wt(a), S.call(x, wt(a) ? !1 : a), x.dispatchEvent(O);
      }
    }, [f, h, a, o]);
    const g = b.useRef(wt(a) ? !1 : a);
    return /* @__PURE__ */ p(
      ne.input,
      {
        type: "checkbox",
        "aria-hidden": !0,
        defaultChecked: s ?? g.current,
        required: i,
        disabled: l,
        name: d,
        value: u,
        form: c,
        ...t,
        tabIndex: -1,
        ref: v,
        style: {
          ...t.style,
          ...y,
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
nc.displayName = tc;
function ib(e) {
  return typeof e == "function";
}
function wt(e) {
  return e === "indeterminate";
}
function rc(e) {
  return wt(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
const cb = C.forwardRef(({ className: e, label: t, id: n, disabled: r, ...o }, a) => {
  const s = n || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
  return /* @__PURE__ */ j("div", { className: "flex items-center", children: [
    /* @__PURE__ */ p(
      Zi,
      {
        ref: a,
        id: s,
        disabled: r,
        className: _(
          "peer h-[17px] w-[17px] shrink-0 rounded",
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
        children: /* @__PURE__ */ p(
          ec,
          {
            className: _("flex items-center justify-center", "text-white"),
            children: /* @__PURE__ */ p(jp, { className: "h-3 w-3", strokeWidth: 3 })
          }
        )
      }
    ),
    t && /* @__PURE__ */ p(
      "label",
      {
        htmlFor: s,
        className: _(
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
cb.displayName = "Checkbox";
var fr = "Dialog", [oc] = He(fr), [lb, je] = oc(fr), ac = (e) => {
  const {
    __scopeDialog: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: a,
    modal: s = !0
  } = e, i = b.useRef(null), l = b.useRef(null), [d, u] = ut({
    prop: r,
    defaultProp: o ?? !1,
    onChange: a,
    caller: fr
  });
  return /* @__PURE__ */ p(
    lb,
    {
      scope: t,
      triggerRef: i,
      contentRef: l,
      contentId: Et(),
      titleId: Et(),
      descriptionId: Et(),
      open: d,
      onOpenChange: u,
      onOpenToggle: b.useCallback(() => u((c) => !c), [u]),
      modal: s,
      children: n
    }
  );
};
ac.displayName = fr;
var sc = "DialogTrigger", db = b.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = je(sc, n), a = de(t, o.triggerRef);
    return /* @__PURE__ */ p(
      ne.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": o.open,
        "aria-controls": o.contentId,
        "data-state": Do(o.open),
        ...r,
        ref: a,
        onClick: se(e.onClick, o.onOpenToggle)
      }
    );
  }
);
db.displayName = sc;
var So = "DialogPortal", [ub, ic] = oc(So, {
  forceMount: void 0
}), cc = (e) => {
  const { __scopeDialog: t, forceMount: n, children: r, container: o } = e, a = je(So, t);
  return /* @__PURE__ */ p(ub, { scope: t, forceMount: n, children: b.Children.map(r, (s) => /* @__PURE__ */ p(dt, { present: n || a.open, children: /* @__PURE__ */ p(ro, { asChild: !0, container: o, children: s }) })) });
};
cc.displayName = So;
var Un = "DialogOverlay", lc = b.forwardRef(
  (e, t) => {
    const n = ic(Un, e.__scopeDialog), { forceMount: r = n.forceMount, ...o } = e, a = je(Un, e.__scopeDialog);
    return a.modal ? /* @__PURE__ */ p(dt, { present: r || a.open, children: /* @__PURE__ */ p(mb, { ...o, ref: t }) }) : null;
  }
);
lc.displayName = Un;
var fb = /* @__PURE__ */ hn("DialogOverlay.RemoveScroll"), mb = b.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = je(Un, n);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ p(oo, { as: fb, allowPinchZoom: !0, shards: [o.contentRef], children: /* @__PURE__ */ p(
        ne.div,
        {
          "data-state": Do(o.open),
          ...r,
          ref: t,
          style: { pointerEvents: "auto", ...r.style }
        }
      ) })
    );
  }
), Tt = "DialogContent", dc = b.forwardRef(
  (e, t) => {
    const n = ic(Tt, e.__scopeDialog), { forceMount: r = n.forceMount, ...o } = e, a = je(Tt, e.__scopeDialog);
    return /* @__PURE__ */ p(dt, { present: r || a.open, children: a.modal ? /* @__PURE__ */ p(hb, { ...o, ref: t }) : /* @__PURE__ */ p(pb, { ...o, ref: t }) });
  }
);
dc.displayName = Tt;
var hb = b.forwardRef(
  (e, t) => {
    const n = je(Tt, e.__scopeDialog), r = b.useRef(null), o = de(t, n.contentRef, r);
    return b.useEffect(() => {
      const a = r.current;
      if (a) return ss(a);
    }, []), /* @__PURE__ */ p(
      uc,
      {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: se(e.onCloseAutoFocus, (a) => {
          var s;
          a.preventDefault(), (s = n.triggerRef.current) == null || s.focus();
        }),
        onPointerDownOutside: se(e.onPointerDownOutside, (a) => {
          const s = a.detail.originalEvent, i = s.button === 0 && s.ctrlKey === !0;
          (s.button === 2 || i) && a.preventDefault();
        }),
        onFocusOutside: se(
          e.onFocusOutside,
          (a) => a.preventDefault()
        )
      }
    );
  }
), pb = b.forwardRef(
  (e, t) => {
    const n = je(Tt, e.__scopeDialog), r = b.useRef(!1), o = b.useRef(!1);
    return /* @__PURE__ */ p(
      uc,
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
          var l, d;
          (l = e.onInteractOutside) == null || l.call(e, a), a.defaultPrevented || (r.current = !0, a.detail.originalEvent.type === "pointerdown" && (o.current = !0));
          const s = a.target;
          ((d = n.triggerRef.current) == null ? void 0 : d.contains(s)) && a.preventDefault(), a.detail.originalEvent.type === "focusin" && o.current && a.preventDefault();
        }
      }
    );
  }
), uc = b.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, trapFocus: r, onOpenAutoFocus: o, onCloseAutoFocus: a, ...s } = e, i = je(Tt, n), l = b.useRef(null), d = de(t, l);
    return _a(), /* @__PURE__ */ j(mn, { children: [
      /* @__PURE__ */ p(
        qr,
        {
          asChild: !0,
          loop: !0,
          trapped: r,
          onMountAutoFocus: o,
          onUnmountAutoFocus: a,
          children: /* @__PURE__ */ p(
            Ur,
            {
              role: "dialog",
              id: i.contentId,
              "aria-describedby": i.descriptionId,
              "aria-labelledby": i.titleId,
              "data-state": Do(i.open),
              ...s,
              ref: d,
              onDismiss: () => i.onOpenChange(!1)
            }
          )
        }
      ),
      /* @__PURE__ */ j(mn, { children: [
        /* @__PURE__ */ p(gb, { titleId: i.titleId }),
        /* @__PURE__ */ p(yb, { contentRef: l, descriptionId: i.descriptionId })
      ] })
    ] });
  }
), No = "DialogTitle", fc = b.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = je(No, n);
    return /* @__PURE__ */ p(ne.h2, { id: o.titleId, ...r, ref: t });
  }
);
fc.displayName = No;
var mc = "DialogDescription", hc = b.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = je(mc, n);
    return /* @__PURE__ */ p(ne.p, { id: o.descriptionId, ...r, ref: t });
  }
);
hc.displayName = mc;
var pc = "DialogClose", gc = b.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = je(pc, n);
    return /* @__PURE__ */ p(
      ne.button,
      {
        type: "button",
        ...r,
        ref: t,
        onClick: se(e.onClick, () => o.onOpenChange(!1))
      }
    );
  }
);
gc.displayName = pc;
function Do(e) {
  return e ? "open" : "closed";
}
var bc = "DialogTitleWarning", [my, yc] = sl(bc, {
  contentName: Tt,
  titleName: No,
  docsSlug: "dialog"
}), gb = ({ titleId: e }) => {
  const t = yc(bc), n = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;
  return b.useEffect(() => {
    e && (document.getElementById(e) || console.error(n));
  }, [n, e]), null;
}, bb = "DialogDescriptionWarning", yb = ({ contentRef: e, descriptionId: t }) => {
  const r = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${yc(bb).contentName}}.`;
  return b.useEffect(() => {
    var a;
    const o = (a = e.current) == null ? void 0 : a.getAttribute("aria-describedby");
    t && o && (document.getElementById(t) || console.warn(r));
  }, [r, e, t]), null;
}, vb = ac, wb = cc, xb = lc, kb = dc, Cb = fc, Mb = hc, Sb = gc;
const Nb = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg"
}, rn = C.forwardRef(
  ({
    open: e,
    onOpenChange: t,
    icon: n,
    title: r,
    children: o,
    footer: a,
    className: s,
    showCloseButton: i = !0,
    size: l = "md"
  }, d) => /* @__PURE__ */ p(vb, { open: e, onOpenChange: t, children: /* @__PURE__ */ j(wb, { children: [
    /* @__PURE__ */ p(
      xb,
      {
        className: _(
          "fixed inset-0 z-50 bg-black/50",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        )
      }
    ),
    /* @__PURE__ */ j(
      kb,
      {
        ref: d,
        className: _(
          "fixed left-[50%] top-[50%] z-50",
          "translate-x-[-50%] translate-y-[-50%]",
          "w-full",
          Nb[l],
          "bg-white rounded-lg shadow-lg",
          "p-6",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          s
        ),
        children: [
          i && /* @__PURE__ */ j(
            Sb,
            {
              className: _(
                "absolute right-4 top-4 rounded-sm opacity-70",
                "transition-opacity hover:opacity-100",
                "focus:outline-none focus:ring-2 focus:ring-cms-gray-400",
                "disabled:pointer-events-none"
              ),
              children: [
                /* @__PURE__ */ p(eg, { className: "h-4 w-4" }),
                /* @__PURE__ */ p("span", { className: "sr-only", children: "Close" })
              ]
            }
          ),
          n && /* @__PURE__ */ p("div", { className: "flex justify-center mb-4", children: n }),
          r && /* @__PURE__ */ p(
            Cb,
            {
              className: _(
                "text-lg font-bold text-cms-gray-900 mb-2",
                "flex items-center justify-center"
              ),
              children: r
            }
          ),
          /* @__PURE__ */ p(Mb, { className: "text-sm text-cms-gray-700 text-center", children: o }),
          a && /* @__PURE__ */ p("div", { className: "mt-6", children: a })
        ]
      }
    )
  ] }) })
);
rn.displayName = "Modal";
const Db = C.forwardRef(
  ({
    open: e,
    onOpenChange: t,
    title: n = "확인",
    message: r,
    confirmText: o = "확인",
    onConfirm: a,
    className: s
  }, i) => /* @__PURE__ */ p(
    rn,
    {
      ref: i,
      open: e,
      onOpenChange: t,
      title: n,
      footer: /* @__PURE__ */ p(
        xt,
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
      icon: /* @__PURE__ */ p(ai, { className: "w-15 h-15 text-cms-black" }),
      children: /* @__PURE__ */ p("div", { className: "text-sm text-cms-gray-700", children: r })
    }
  )
);
Db.displayName = "ConfirmModal";
const Ob = C.forwardRef(
  ({
    open: e,
    onOpenChange: t,
    title: n = "삭제",
    message: r = "정말로 삭제하시겠습니까?",
    confirmText: o = "삭제",
    cancelText: a = "취소",
    onConfirm: s,
    onCancel: i,
    className: l
  }, d) => /* @__PURE__ */ p(
    rn,
    {
      ref: d,
      open: e,
      onOpenChange: t,
      icon: /* @__PURE__ */ p(si, { className: "w-15 h-15 text-cms-red-400" }),
      title: n,
      footer: /* @__PURE__ */ j("div", { className: "flex gap-2 w-full", children: [
        /* @__PURE__ */ p(
          xt,
          {
            onClick: () => {
              i == null || i(), t(!1);
            },
            variant: "outline",
            className: "flex-1 h-12",
            children: a
          }
        ),
        /* @__PURE__ */ p(
          xt,
          {
            onClick: () => {
              s(), t(!1);
            },
            className: _(
              "flex-1 h-12",
              "bg-cms-red-400 hover:bg-cms-red-500"
            ),
            children: o
          }
        )
      ] }),
      className: l,
      size: "sm",
      showCloseButton: !1,
      children: /* @__PURE__ */ p("div", { className: "text-sm text-cms-gray-700", children: r })
    }
  )
);
Ob.displayName = "DeleteModal";
const Eb = C.forwardRef(
  ({
    open: e,
    onOpenChange: t,
    title: n = "오류",
    message: r,
    confirmText: o = "확인",
    onConfirm: a,
    className: s
  }, i) => /* @__PURE__ */ p(
    rn,
    {
      ref: i,
      open: e,
      onOpenChange: t,
      icon: /* @__PURE__ */ p(Xp, { className: "w-15 h-15 text-cms-red-400" }),
      title: n,
      footer: /* @__PURE__ */ p(
        xt,
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
      children: /* @__PURE__ */ p("div", { className: "text-sm text-cms-gray-700", children: r })
    }
  )
);
Eb.displayName = "ErrorModal";
const Pb = C.forwardRef(
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
    className: l
  }, d) => /* @__PURE__ */ p(
    rn,
    {
      ref: d,
      open: e,
      onOpenChange: t,
      icon: /* @__PURE__ */ p(si, { className: "w-15 h-15 text-cms-orange-500" }),
      title: n,
      footer: (
        // 버튼 두 개를 가로로 배치하기 위해 flex 컨테이너 사용
        /* @__PURE__ */ j("div", { className: "flex w-full gap-2", children: [
          /* @__PURE__ */ p(
            xt,
            {
              onClick: () => {
                i == null || i(), t(!1);
              },
              className: "flex-1 h-12 bg-white border border-cms-gray-200 text-cms-gray-700 hover:bg-cms-gray-50",
              children: s
            }
          ),
          /* @__PURE__ */ p(
            xt,
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
      className: l,
      size: "sm",
      showCloseButton: !1,
      children: /* @__PURE__ */ p("div", { className: "text-sm text-cms-gray-700", children: r })
    }
  )
);
Pb.displayName = "WarningModal";
const Rb = C.forwardRef(
  ({
    open: e,
    onOpenChange: t,
    title: n = "성공",
    message: r,
    confirmText: o = "확인",
    onConfirm: a,
    className: s
  }, i) => /* @__PURE__ */ p(
    rn,
    {
      ref: i,
      open: e,
      onOpenChange: t,
      icon: /* @__PURE__ */ p(ai, { className: "w-15 h-15 text-cms-green-500 border-cms-green-500" }),
      title: n,
      footer: /* @__PURE__ */ p(
        xt,
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
      children: /* @__PURE__ */ p("div", { className: "text-sm text-cms-gray-700", children: r })
    }
  )
);
Rb.displayName = "SuccessModal";
function Ab(e) {
  if (typeof document > "u") return;
  let t = document.head || document.getElementsByTagName("head")[0], n = document.createElement("style");
  n.type = "text/css", t.appendChild(n), n.styleSheet ? n.styleSheet.cssText = e : n.appendChild(document.createTextNode(e));
}
const Tb = (e) => {
  switch (e) {
    case "success":
      return Wb;
    case "info":
      return Fb;
    case "warning":
      return $b;
    case "error":
      return Yb;
    default:
      return null;
  }
}, _b = Array(12).fill(0), Ib = ({ visible: e, className: t }) => /* @__PURE__ */ C.createElement("div", {
  className: [
    "sonner-loading-wrapper",
    t
  ].filter(Boolean).join(" "),
  "data-visible": e
}, /* @__PURE__ */ C.createElement("div", {
  className: "sonner-spinner"
}, _b.map((n, r) => /* @__PURE__ */ C.createElement("div", {
  className: "sonner-loading-bar",
  key: `spinner-bar-${r}`
})))), Wb = /* @__PURE__ */ C.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ C.createElement("path", {
  fillRule: "evenodd",
  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
  clipRule: "evenodd"
})), $b = /* @__PURE__ */ C.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ C.createElement("path", {
  fillRule: "evenodd",
  d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
  clipRule: "evenodd"
})), Fb = /* @__PURE__ */ C.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ C.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
  clipRule: "evenodd"
})), Yb = /* @__PURE__ */ C.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ C.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
  clipRule: "evenodd"
})), Bb = /* @__PURE__ */ C.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "12",
  height: "12",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /* @__PURE__ */ C.createElement("line", {
  x1: "18",
  y1: "6",
  x2: "6",
  y2: "18"
}), /* @__PURE__ */ C.createElement("line", {
  x1: "6",
  y1: "6",
  x2: "18",
  y2: "18"
})), zb = () => {
  const [e, t] = C.useState(document.hidden);
  return C.useEffect(() => {
    const n = () => {
      t(document.hidden);
    };
    return document.addEventListener("visibilitychange", n), () => window.removeEventListener("visibilitychange", n);
  }, []), e;
};
let jr = 1;
class Hb {
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
      const { message: r, ...o } = t, a = typeof (t == null ? void 0 : t.id) == "number" || ((n = t.id) == null ? void 0 : n.length) > 0 ? t.id : jr++, s = this.toasts.find((l) => l.id === a), i = t.dismissible === void 0 ? !0 : t.dismissible;
      return this.dismissedToasts.has(a) && this.dismissedToasts.delete(a), s ? this.toasts = this.toasts.map((l) => l.id === a ? (this.publish({
        ...l,
        ...t,
        id: a,
        title: r
      }), {
        ...l,
        ...t,
        id: a,
        dismissible: i,
        title: r
      }) : l) : this.addToast({
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
      const i = o.then(async (d) => {
        if (s = [
          "resolve",
          d
        ], C.isValidElement(d))
          a = !1, this.create({
            id: r,
            type: "default",
            message: d
          });
        else if (jb(d) && !d.ok) {
          a = !1;
          const c = typeof n.error == "function" ? await n.error(`HTTP error! status: ${d.status}`) : n.error, f = typeof n.description == "function" ? await n.description(`HTTP error! status: ${d.status}`) : n.description, v = typeof c == "object" && !C.isValidElement(c) ? c : {
            message: c
          };
          this.create({
            id: r,
            type: "error",
            description: f,
            ...v
          });
        } else if (d instanceof Error) {
          a = !1;
          const c = typeof n.error == "function" ? await n.error(d) : n.error, f = typeof n.description == "function" ? await n.description(d) : n.description, v = typeof c == "object" && !C.isValidElement(c) ? c : {
            message: c
          };
          this.create({
            id: r,
            type: "error",
            description: f,
            ...v
          });
        } else if (n.success !== void 0) {
          a = !1;
          const c = typeof n.success == "function" ? await n.success(d) : n.success, f = typeof n.description == "function" ? await n.description(d) : n.description, v = typeof c == "object" && !C.isValidElement(c) ? c : {
            message: c
          };
          this.create({
            id: r,
            type: "success",
            description: f,
            ...v
          });
        }
      }).catch(async (d) => {
        if (s = [
          "reject",
          d
        ], n.error !== void 0) {
          a = !1;
          const u = typeof n.error == "function" ? await n.error(d) : n.error, c = typeof n.description == "function" ? await n.description(d) : n.description, m = typeof u == "object" && !C.isValidElement(u) ? u : {
            message: u
          };
          this.create({
            id: r,
            type: "error",
            description: c,
            ...m
          });
        }
      }).finally(() => {
        a && (this.dismiss(r), r = void 0), n.finally == null || n.finally.call(n);
      }), l = () => new Promise((d, u) => i.then(() => s[0] === "reject" ? u(s[1]) : d(s[1])).catch(u));
      return typeof r != "string" && typeof r != "number" ? {
        unwrap: l
      } : Object.assign(r, {
        unwrap: l
      });
    }, this.custom = (t, n) => {
      const r = (n == null ? void 0 : n.id) || jr++;
      return this.create({
        jsx: t(r),
        id: r,
        ...n
      }), r;
    }, this.getActiveToasts = () => this.toasts.filter((t) => !this.dismissedToasts.has(t.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set();
  }
}
const De = new Hb(), Lb = (e, t) => {
  const n = (t == null ? void 0 : t.id) || jr++;
  return De.addToast({
    title: e,
    ...t,
    id: n
  }), n;
}, jb = (e) => e && typeof e == "object" && "ok" in e && typeof e.ok == "boolean" && "status" in e && typeof e.status == "number", Vb = Lb, Gb = () => De.toasts, Ub = () => De.getActiveToasts(), hy = Object.assign(Vb, {
  success: De.success,
  info: De.info,
  warning: De.warning,
  error: De.error,
  custom: De.custom,
  message: De.message,
  promise: De.promise,
  dismiss: De.dismiss,
  loading: De.loading
}, {
  getHistory: Gb,
  getToasts: Ub
});
Ab("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function Fn(e) {
  return e.label !== void 0;
}
const qb = 3, Xb = "24px", Kb = "16px", va = 4e3, Qb = 356, Zb = 14, Jb = 45, ey = 200;
function Ve(...e) {
  return e.filter(Boolean).join(" ");
}
function ty(e) {
  const [t, n] = e.split("-"), r = [];
  return t && r.push(t), n && r.push(n), r;
}
const ny = (e) => {
  var t, n, r, o, a, s, i, l, d;
  const { invert: u, toast: c, unstyled: f, interacting: m, setHeights: v, visibleToasts: h, heights: y, index: g, toasts: x, expanded: w, removeToast: M, defaultRichColors: S, closeButton: k, style: O, cancelButtonStyle: T, actionButtonStyle: B, className: I = "", descriptionClassName: F = "", duration: R, position: Y, gap: D, expandByDefault: P, classNames: N, icons: A, closeButtonAriaLabel: E = "Close toast" } = e, [W, $] = C.useState(null), [H, ee] = C.useState(null), [z, q] = C.useState(!1), [K, ce] = C.useState(!1), [ue, Z] = C.useState(!1), [me, ae] = C.useState(!1), [ge, ye] = C.useState(!1), [Ne, ft] = C.useState(0), [It, Wt] = C.useState(0), nt = C.useRef(c.duration || R || va), $t = C.useRef(null), xe = C.useRef(null), mr = g === 0, hr = g + 1 <= h, Me = c.type, rt = c.dismissible !== !1, on = c.className || "", an = c.descriptionClassName || "", Ft = C.useMemo(() => y.findIndex((V) => V.toastId === c.id) || 0, [
    y,
    c.id
  ]), pr = C.useMemo(() => {
    var V;
    return (V = c.closeButton) != null ? V : k;
  }, [
    c.closeButton,
    k
  ]), Nn = C.useMemo(() => c.duration || R || va, [
    c.duration,
    R
  ]), sn = C.useRef(0), mt = C.useRef(0), Dn = C.useRef(0), ht = C.useRef(null), [gr, br] = Y.split("-"), On = C.useMemo(() => y.reduce((V, G, be) => be >= Ft ? V : V + G.height, 0), [
    y,
    Ft
  ]), En = zb(), Pn = c.invert || u, cn = Me === "loading";
  mt.current = C.useMemo(() => Ft * D + On, [
    Ft,
    On
  ]), C.useEffect(() => {
    nt.current = Nn;
  }, [
    Nn
  ]), C.useEffect(() => {
    q(!0);
  }, []), C.useEffect(() => {
    const V = xe.current;
    if (V) {
      const G = V.getBoundingClientRect().height;
      return Wt(G), v((be) => [
        {
          toastId: c.id,
          height: G,
          position: c.position
        },
        ...be
      ]), () => v((be) => be.filter((Se) => Se.toastId !== c.id));
    }
  }, [
    v,
    c.id
  ]), C.useLayoutEffect(() => {
    if (!z) return;
    const V = xe.current, G = V.style.height;
    V.style.height = "auto";
    const be = V.getBoundingClientRect().height;
    V.style.height = G, Wt(be), v((Se) => Se.find((fe) => fe.toastId === c.id) ? Se.map((fe) => fe.toastId === c.id ? {
      ...fe,
      height: be
    } : fe) : [
      {
        toastId: c.id,
        height: be,
        position: c.position
      },
      ...Se
    ]);
  }, [
    z,
    c.title,
    c.description,
    v,
    c.id,
    c.jsx,
    c.action,
    c.cancel
  ]);
  const _e = C.useCallback(() => {
    ce(!0), ft(mt.current), v((V) => V.filter((G) => G.toastId !== c.id)), setTimeout(() => {
      M(c);
    }, ey);
  }, [
    c,
    M,
    v,
    mt
  ]);
  C.useEffect(() => {
    if (c.promise && Me === "loading" || c.duration === 1 / 0 || c.type === "loading") return;
    let V;
    return w || m || En ? (() => {
      if (Dn.current < sn.current) {
        const Se = (/* @__PURE__ */ new Date()).getTime() - sn.current;
        nt.current = nt.current - Se;
      }
      Dn.current = (/* @__PURE__ */ new Date()).getTime();
    })() : (() => {
      nt.current !== 1 / 0 && (sn.current = (/* @__PURE__ */ new Date()).getTime(), V = setTimeout(() => {
        c.onAutoClose == null || c.onAutoClose.call(c, c), _e();
      }, nt.current));
    })(), () => clearTimeout(V);
  }, [
    w,
    m,
    c,
    Me,
    En,
    _e
  ]), C.useEffect(() => {
    c.delete && (_e(), c.onDismiss == null || c.onDismiss.call(c, c));
  }, [
    _e,
    c.delete
  ]);
  function X() {
    var V;
    if (A != null && A.loading) {
      var G;
      return /* @__PURE__ */ C.createElement("div", {
        className: Ve(N == null ? void 0 : N.loader, c == null || (G = c.classNames) == null ? void 0 : G.loader, "sonner-loader"),
        "data-visible": Me === "loading"
      }, A.loading);
    }
    return /* @__PURE__ */ C.createElement(Ib, {
      className: Ve(N == null ? void 0 : N.loader, c == null || (V = c.classNames) == null ? void 0 : V.loader),
      visible: Me === "loading"
    });
  }
  const te = c.icon || (A == null ? void 0 : A[Me]) || Tb(Me);
  var U, J;
  return /* @__PURE__ */ C.createElement("li", {
    tabIndex: 0,
    ref: xe,
    className: Ve(I, on, N == null ? void 0 : N.toast, c == null || (t = c.classNames) == null ? void 0 : t.toast, N == null ? void 0 : N.default, N == null ? void 0 : N[Me], c == null || (n = c.classNames) == null ? void 0 : n[Me]),
    "data-sonner-toast": "",
    "data-rich-colors": (U = c.richColors) != null ? U : S,
    "data-styled": !(c.jsx || c.unstyled || f),
    "data-mounted": z,
    "data-promise": !!c.promise,
    "data-swiped": ge,
    "data-removed": K,
    "data-visible": hr,
    "data-y-position": gr,
    "data-x-position": br,
    "data-index": g,
    "data-front": mr,
    "data-swiping": ue,
    "data-dismissible": rt,
    "data-type": Me,
    "data-invert": Pn,
    "data-swipe-out": me,
    "data-swipe-direction": H,
    "data-expanded": !!(w || P && z),
    "data-testid": c.testId,
    style: {
      "--index": g,
      "--toasts-before": g,
      "--z-index": x.length - g,
      "--offset": `${K ? Ne : mt.current}px`,
      "--initial-height": P ? "auto" : `${It}px`,
      ...O,
      ...c.style
    },
    onDragEnd: () => {
      Z(!1), $(null), ht.current = null;
    },
    onPointerDown: (V) => {
      V.button !== 2 && (cn || !rt || ($t.current = /* @__PURE__ */ new Date(), ft(mt.current), V.target.setPointerCapture(V.pointerId), V.target.tagName !== "BUTTON" && (Z(!0), ht.current = {
        x: V.clientX,
        y: V.clientY
      })));
    },
    onPointerUp: () => {
      var V, G, be;
      if (me || !rt) return;
      ht.current = null;
      const Se = Number(((V = xe.current) == null ? void 0 : V.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0), Yt = Number(((G = xe.current) == null ? void 0 : G.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0), fe = (/* @__PURE__ */ new Date()).getTime() - ((be = $t.current) == null ? void 0 : be.getTime()), ke = W === "x" ? Se : Yt, Rn = Math.abs(ke) / fe;
      if (Math.abs(ke) >= Jb || Rn > 0.11) {
        ft(mt.current), c.onDismiss == null || c.onDismiss.call(c, c), ee(W === "x" ? Se > 0 ? "right" : "left" : Yt > 0 ? "down" : "up"), _e(), ae(!0);
        return;
      } else {
        var Ie, We;
        (Ie = xe.current) == null || Ie.style.setProperty("--swipe-amount-x", "0px"), (We = xe.current) == null || We.style.setProperty("--swipe-amount-y", "0px");
      }
      ye(!1), Z(!1), $(null);
    },
    onPointerMove: (V) => {
      var G, be, Se;
      if (!ht.current || !rt || ((G = window.getSelection()) == null ? void 0 : G.toString().length) > 0) return;
      const fe = V.clientY - ht.current.y, ke = V.clientX - ht.current.x;
      var Rn;
      const Ie = (Rn = e.swipeDirections) != null ? Rn : ty(Y);
      !W && (Math.abs(ke) > 1 || Math.abs(fe) > 1) && $(Math.abs(ke) > Math.abs(fe) ? "x" : "y");
      let We = {
        x: 0,
        y: 0
      };
      const Oo = (Nt) => 1 / (1.5 + Math.abs(Nt) / 20);
      if (W === "y") {
        if (Ie.includes("top") || Ie.includes("bottom"))
          if (Ie.includes("top") && fe < 0 || Ie.includes("bottom") && fe > 0)
            We.y = fe;
          else {
            const Nt = fe * Oo(fe);
            We.y = Math.abs(Nt) < Math.abs(fe) ? Nt : fe;
          }
      } else if (W === "x" && (Ie.includes("left") || Ie.includes("right")))
        if (Ie.includes("left") && ke < 0 || Ie.includes("right") && ke > 0)
          We.x = ke;
        else {
          const Nt = ke * Oo(ke);
          We.x = Math.abs(Nt) < Math.abs(ke) ? Nt : ke;
        }
      (Math.abs(We.x) > 0 || Math.abs(We.y) > 0) && ye(!0), (be = xe.current) == null || be.style.setProperty("--swipe-amount-x", `${We.x}px`), (Se = xe.current) == null || Se.style.setProperty("--swipe-amount-y", `${We.y}px`);
    }
  }, pr && !c.jsx && Me !== "loading" ? /* @__PURE__ */ C.createElement("button", {
    "aria-label": E,
    "data-disabled": cn,
    "data-close-button": !0,
    onClick: cn || !rt ? () => {
    } : () => {
      _e(), c.onDismiss == null || c.onDismiss.call(c, c);
    },
    className: Ve(N == null ? void 0 : N.closeButton, c == null || (r = c.classNames) == null ? void 0 : r.closeButton)
  }, (J = A == null ? void 0 : A.close) != null ? J : Bb) : null, (Me || c.icon || c.promise) && c.icon !== null && ((A == null ? void 0 : A[Me]) !== null || c.icon) ? /* @__PURE__ */ C.createElement("div", {
    "data-icon": "",
    className: Ve(N == null ? void 0 : N.icon, c == null || (o = c.classNames) == null ? void 0 : o.icon)
  }, c.promise || c.type === "loading" && !c.icon ? c.icon || X() : null, c.type !== "loading" ? te : null) : null, /* @__PURE__ */ C.createElement("div", {
    "data-content": "",
    className: Ve(N == null ? void 0 : N.content, c == null || (a = c.classNames) == null ? void 0 : a.content)
  }, /* @__PURE__ */ C.createElement("div", {
    "data-title": "",
    className: Ve(N == null ? void 0 : N.title, c == null || (s = c.classNames) == null ? void 0 : s.title)
  }, c.jsx ? c.jsx : typeof c.title == "function" ? c.title() : c.title), c.description ? /* @__PURE__ */ C.createElement("div", {
    "data-description": "",
    className: Ve(F, an, N == null ? void 0 : N.description, c == null || (i = c.classNames) == null ? void 0 : i.description)
  }, typeof c.description == "function" ? c.description() : c.description) : null), /* @__PURE__ */ C.isValidElement(c.cancel) ? c.cancel : c.cancel && Fn(c.cancel) ? /* @__PURE__ */ C.createElement("button", {
    "data-button": !0,
    "data-cancel": !0,
    style: c.cancelButtonStyle || T,
    onClick: (V) => {
      Fn(c.cancel) && rt && (c.cancel.onClick == null || c.cancel.onClick.call(c.cancel, V), _e());
    },
    className: Ve(N == null ? void 0 : N.cancelButton, c == null || (l = c.classNames) == null ? void 0 : l.cancelButton)
  }, c.cancel.label) : null, /* @__PURE__ */ C.isValidElement(c.action) ? c.action : c.action && Fn(c.action) ? /* @__PURE__ */ C.createElement("button", {
    "data-button": !0,
    "data-action": !0,
    style: c.actionButtonStyle || B,
    onClick: (V) => {
      Fn(c.action) && (c.action.onClick == null || c.action.onClick.call(c.action, V), !V.defaultPrevented && _e());
    },
    className: Ve(N == null ? void 0 : N.actionButton, c == null || (d = c.classNames) == null ? void 0 : d.actionButton)
  }, c.action.label) : null);
};
function wa() {
  if (typeof window > "u" || typeof document > "u") return "ltr";
  const e = document.documentElement.getAttribute("dir");
  return e === "auto" || !e ? window.getComputedStyle(document.documentElement).direction : e;
}
function ry(e, t) {
  const n = {};
  return [
    e,
    t
  ].forEach((r, o) => {
    const a = o === 1, s = a ? "--mobile-offset" : "--offset", i = a ? Kb : Xb;
    function l(d) {
      [
        "top",
        "right",
        "bottom",
        "left"
      ].forEach((u) => {
        n[`${s}-${u}`] = typeof d == "number" ? `${d}px` : d;
      });
    }
    typeof r == "number" || typeof r == "string" ? l(r) : typeof r == "object" ? [
      "top",
      "right",
      "bottom",
      "left"
    ].forEach((d) => {
      r[d] === void 0 ? n[`${s}-${d}`] = i : n[`${s}-${d}`] = typeof r[d] == "number" ? `${r[d]}px` : r[d];
    }) : l(i);
  }), n;
}
const oy = /* @__PURE__ */ C.forwardRef(function(t, n) {
  const { id: r, invert: o, position: a = "bottom-right", hotkey: s = [
    "altKey",
    "KeyT"
  ], expand: i, closeButton: l, className: d, offset: u, mobileOffset: c, theme: f = "light", richColors: m, duration: v, style: h, visibleToasts: y = qb, toastOptions: g, dir: x = wa(), gap: w = Zb, icons: M, containerAriaLabel: S = "Notifications" } = t, [k, O] = C.useState([]), T = C.useMemo(() => r ? k.filter((z) => z.toasterId === r) : k.filter((z) => !z.toasterId), [
    k,
    r
  ]), B = C.useMemo(() => Array.from(new Set([
    a
  ].concat(T.filter((z) => z.position).map((z) => z.position)))), [
    T,
    a
  ]), [I, F] = C.useState([]), [R, Y] = C.useState(!1), [D, P] = C.useState(!1), [N, A] = C.useState(f !== "system" ? f : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), E = C.useRef(null), W = s.join("+").replace(/Key/g, "").replace(/Digit/g, ""), $ = C.useRef(null), H = C.useRef(!1), ee = C.useCallback((z) => {
    O((q) => {
      var K;
      return (K = q.find((ce) => ce.id === z.id)) != null && K.delete || De.dismiss(z.id), q.filter(({ id: ce }) => ce !== z.id);
    });
  }, []);
  return C.useEffect(() => De.subscribe((z) => {
    if (z.dismiss) {
      requestAnimationFrame(() => {
        O((q) => q.map((K) => K.id === z.id ? {
          ...K,
          delete: !0
        } : K));
      });
      return;
    }
    setTimeout(() => {
      Ca.flushSync(() => {
        O((q) => {
          const K = q.findIndex((ce) => ce.id === z.id);
          return K !== -1 ? [
            ...q.slice(0, K),
            {
              ...q[K],
              ...z
            },
            ...q.slice(K + 1)
          ] : [
            z,
            ...q
          ];
        });
      });
    });
  }), [
    k
  ]), C.useEffect(() => {
    if (f !== "system") {
      A(f);
      return;
    }
    if (f === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? A("dark") : A("light")), typeof window > "u") return;
    const z = window.matchMedia("(prefers-color-scheme: dark)");
    try {
      z.addEventListener("change", ({ matches: q }) => {
        A(q ? "dark" : "light");
      });
    } catch {
      z.addListener(({ matches: K }) => {
        try {
          A(K ? "dark" : "light");
        } catch (ce) {
          console.error(ce);
        }
      });
    }
  }, [
    f
  ]), C.useEffect(() => {
    k.length <= 1 && Y(!1);
  }, [
    k
  ]), C.useEffect(() => {
    const z = (q) => {
      var K;
      if (s.every((Z) => q[Z] || q.code === Z)) {
        var ue;
        Y(!0), (ue = E.current) == null || ue.focus();
      }
      q.code === "Escape" && (document.activeElement === E.current || (K = E.current) != null && K.contains(document.activeElement)) && Y(!1);
    };
    return document.addEventListener("keydown", z), () => document.removeEventListener("keydown", z);
  }, [
    s
  ]), C.useEffect(() => {
    if (E.current)
      return () => {
        $.current && ($.current.focus({
          preventScroll: !0
        }), $.current = null, H.current = !1);
      };
  }, [
    E.current
  ]), // Remove item from normal navigation flow, only available via hotkey
  /* @__PURE__ */ C.createElement("section", {
    ref: n,
    "aria-label": `${S} ${W}`,
    tabIndex: -1,
    "aria-live": "polite",
    "aria-relevant": "additions text",
    "aria-atomic": "false",
    suppressHydrationWarning: !0
  }, B.map((z, q) => {
    var K;
    const [ce, ue] = z.split("-");
    return T.length ? /* @__PURE__ */ C.createElement("ol", {
      key: z,
      dir: x === "auto" ? wa() : x,
      tabIndex: -1,
      ref: E,
      className: d,
      "data-sonner-toaster": !0,
      "data-sonner-theme": N,
      "data-y-position": ce,
      "data-x-position": ue,
      style: {
        "--front-toast-height": `${((K = I[0]) == null ? void 0 : K.height) || 0}px`,
        "--width": `${Qb}px`,
        "--gap": `${w}px`,
        ...h,
        ...ry(u, c)
      },
      onBlur: (Z) => {
        H.current && !Z.currentTarget.contains(Z.relatedTarget) && (H.current = !1, $.current && ($.current.focus({
          preventScroll: !0
        }), $.current = null));
      },
      onFocus: (Z) => {
        Z.target instanceof HTMLElement && Z.target.dataset.dismissible === "false" || H.current || (H.current = !0, $.current = Z.relatedTarget);
      },
      onMouseEnter: () => Y(!0),
      onMouseMove: () => Y(!0),
      onMouseLeave: () => {
        D || Y(!1);
      },
      onDragEnd: () => Y(!1),
      onPointerDown: (Z) => {
        Z.target instanceof HTMLElement && Z.target.dataset.dismissible === "false" || P(!0);
      },
      onPointerUp: () => P(!1)
    }, T.filter((Z) => !Z.position && q === 0 || Z.position === z).map((Z, me) => {
      var ae, ge;
      return /* @__PURE__ */ C.createElement(ny, {
        key: Z.id,
        icons: M,
        index: me,
        toast: Z,
        defaultRichColors: m,
        duration: (ae = g == null ? void 0 : g.duration) != null ? ae : v,
        className: g == null ? void 0 : g.className,
        descriptionClassName: g == null ? void 0 : g.descriptionClassName,
        invert: o,
        visibleToasts: y,
        closeButton: (ge = g == null ? void 0 : g.closeButton) != null ? ge : l,
        interacting: D,
        position: z,
        style: g == null ? void 0 : g.style,
        unstyled: g == null ? void 0 : g.unstyled,
        classNames: g == null ? void 0 : g.classNames,
        cancelButtonStyle: g == null ? void 0 : g.cancelButtonStyle,
        actionButtonStyle: g == null ? void 0 : g.actionButtonStyle,
        closeButtonAriaLabel: g == null ? void 0 : g.closeButtonAriaLabel,
        removeToast: ee,
        toasts: T.filter((ye) => ye.position == Z.position),
        heights: I.filter((ye) => ye.position == Z.position),
        setHeights: F,
        expandByDefault: i,
        gap: w,
        expanded: R,
        swipeDirections: t.swipeDirections
      });
    })) : null;
  }));
}), py = ({ position: e = "bottom-center", ...t }) => /* @__PURE__ */ p(
  oy,
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
export {
  xt as Button,
  cb as Checkbox,
  dy as ChevronRightIcon,
  al as Combobox,
  Db as ConfirmModal,
  Ip as DatePicker,
  $p as DateRangePicker,
  Ob as DeleteModal,
  Gr as Dropdown,
  Eb as ErrorModal,
  ly as LoadingCircle,
  rn as Modal,
  uy as Popover,
  tf as PopoverContent,
  rf as PopoverMenuItem,
  fy as PopoverTrigger,
  Ag as RadioGroup,
  Ig as RadioGroupItem,
  ol as Select,
  rb as SideNavigation,
  Rb as SuccessModal,
  cg as Switch,
  af as Text,
  lf as TextInput,
  tg as TimePicker,
  py as Toaster,
  Pb as WarningModal,
  Jc as buttonVariants,
  _ as cn,
  tl as dropdownTriggerVariants,
  nf as popoverMenuItemVariants,
  hy as toast
};
//# sourceMappingURL=index.es.js.map
