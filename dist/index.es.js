import { jsx as v, jsxs as Q, Fragment as Bn } from "react/jsx-runtime";
import * as p from "react";
import C, { forwardRef as Ct, useState as Ee, useRef as Ht, useEffect as fn, useLayoutEffect as ya, createContext as bc, useContext as vc, useCallback as Re, useMemo as Qe, createElement as Rr } from "react";
import * as wa from "react-dom";
import xa from "react-dom";
function ka(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (n = ka(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function Ca() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++) (e = arguments[n]) && (t = ka(e)) && (r && (r += " "), r += t);
  return r;
}
const Lr = "-", yc = (e) => {
  const t = xc(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (s) => {
      const i = s.split(Lr);
      return i[0] === "" && i.length !== 1 && i.shift(), Ma(i, t) || wc(s);
    },
    getConflictingClassGroupIds: (s, i) => {
      const l = n[s] || [];
      return i && r[s] ? [...l, ...r[s]] : l;
    }
  };
}, Ma = (e, t) => {
  var s;
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], r = t.nextPart.get(n), o = r ? Ma(e.slice(1), r) : void 0;
  if (o)
    return o;
  if (t.validators.length === 0)
    return;
  const a = e.join(Lr);
  return (s = t.validators.find(({
    validator: i
  }) => i(a))) == null ? void 0 : s.classGroupId;
}, Eo = /^\[(.+)\]$/, wc = (e) => {
  if (Eo.test(e)) {
    const t = Eo.exec(e)[1], n = t == null ? void 0 : t.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, xc = (e) => {
  const {
    theme: t,
    prefix: n
  } = e, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return Cc(Object.entries(e.classGroups), n).forEach(([a, s]) => {
    Ar(s, r, a, t);
  }), r;
}, Ar = (e, t, n, r) => {
  e.forEach((o) => {
    if (typeof o == "string") {
      const a = o === "" ? t : Po(t, o);
      a.classGroupId = n;
      return;
    }
    if (typeof o == "function") {
      if (kc(o)) {
        Ar(o(r), t, n, r);
        return;
      }
      t.validators.push({
        validator: o,
        classGroupId: n
      });
      return;
    }
    Object.entries(o).forEach(([a, s]) => {
      Ar(s, Po(t, a), n, r);
    });
  });
}, Po = (e, t) => {
  let n = e;
  return t.split(Lr).forEach((r) => {
    n.nextPart.has(r) || n.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(r);
  }), n;
}, kc = (e) => e.isThemeGetter, Cc = (e, t) => t ? e.map(([n, r]) => {
  const o = r.map((a) => typeof a == "string" ? t + a : typeof a == "object" ? Object.fromEntries(Object.entries(a).map(([s, i]) => [t + s, i])) : a);
  return [n, o];
}) : e, Mc = (e) => {
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
}, Sa = "!", Sc = (e) => {
  const {
    separator: t,
    experimentalParseClassName: n
  } = e, r = t.length === 1, o = t[0], a = t.length, s = (i) => {
    const l = [];
    let d = 0, u = 0, c;
    for (let g = 0; g < i.length; g++) {
      let b = i[g];
      if (d === 0) {
        if (b === o && (r || i.slice(g, g + a) === t)) {
          l.push(i.slice(u, g)), u = g + a;
          continue;
        }
        if (b === "/") {
          c = g;
          continue;
        }
      }
      b === "[" ? d++ : b === "]" && d--;
    }
    const f = l.length === 0 ? i : i.substring(u), m = f.startsWith(Sa), y = m ? f.substring(1) : f, h = c && c > u ? c - u : void 0;
    return {
      modifiers: l,
      hasImportantModifier: m,
      baseClassName: y,
      maybePostfixModifierPosition: h
    };
  };
  return n ? (i) => n({
    className: i,
    parseClassName: s
  }) : s;
}, Dc = (e) => {
  if (e.length <= 1)
    return e;
  const t = [];
  let n = [];
  return e.forEach((r) => {
    r[0] === "[" ? (t.push(...n.sort(), r), n = []) : n.push(r);
  }), t.push(...n.sort()), t;
}, Nc = (e) => ({
  cache: Mc(e.cacheSize),
  parseClassName: Sc(e),
  ...yc(e)
}), Oc = /\s+/, Ec = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: r,
    getConflictingClassGroupIds: o
  } = t, a = [], s = e.trim().split(Oc);
  let i = "";
  for (let l = s.length - 1; l >= 0; l -= 1) {
    const d = s[l], {
      modifiers: u,
      hasImportantModifier: c,
      baseClassName: f,
      maybePostfixModifierPosition: m
    } = n(d);
    let y = !!m, h = r(y ? f.substring(0, m) : f);
    if (!h) {
      if (!y) {
        i = d + (i.length > 0 ? " " + i : i);
        continue;
      }
      if (h = r(f), !h) {
        i = d + (i.length > 0 ? " " + i : i);
        continue;
      }
      y = !1;
    }
    const g = Dc(u).join(":"), b = c ? g + Sa : g, x = b + h;
    if (a.includes(x))
      continue;
    a.push(x);
    const w = o(h, y);
    for (let M = 0; M < w.length; ++M) {
      const S = w[M];
      a.push(b + S);
    }
    i = d + (i.length > 0 ? " " + i : i);
  }
  return i;
};
function Pc() {
  let e = 0, t, n, r = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = Da(t)) && (r && (r += " "), r += n);
  return r;
}
const Da = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (t = Da(e[r])) && (n && (n += " "), n += t);
  return n;
};
function Rc(e, ...t) {
  let n, r, o, a = s;
  function s(l) {
    const d = t.reduce((u, c) => c(u), e());
    return n = Nc(d), r = n.cache.get, o = n.cache.set, a = i, i(l);
  }
  function i(l) {
    const d = r(l);
    if (d)
      return d;
    const u = Ec(l, n);
    return o(l, u), u;
  }
  return function() {
    return a(Pc.apply(null, arguments));
  };
}
const ie = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, Na = /^\[(?:([a-z-]+):)?(.+)\]$/i, Ac = /^\d+\/\d+$/, Tc = /* @__PURE__ */ new Set(["px", "full", "screen"]), _c = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Ic = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Wc = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, $c = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Fc = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, ot = (e) => jt(e) || Tc.has(e) || Ac.test(e), pt = (e) => Qt(e, "length", Gc), jt = (e) => !!e && !Number.isNaN(Number(e)), pr = (e) => Qt(e, "number", jt), cn = (e) => !!e && Number.isInteger(Number(e)), Yc = (e) => e.endsWith("%") && jt(e.slice(0, -1)), K = (e) => Na.test(e), gt = (e) => _c.test(e), Bc = /* @__PURE__ */ new Set(["length", "size", "percentage"]), zc = (e) => Qt(e, Bc, Oa), Lc = (e) => Qt(e, "position", Oa), Hc = /* @__PURE__ */ new Set(["image", "url"]), jc = (e) => Qt(e, Hc, qc), Vc = (e) => Qt(e, "", Uc), ln = () => !0, Qt = (e, t, n) => {
  const r = Na.exec(e);
  return r ? r[1] ? typeof t == "string" ? r[1] === t : t.has(r[1]) : n(r[2]) : !1;
}, Gc = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Ic.test(e) && !Wc.test(e)
), Oa = () => !1, Uc = (e) => $c.test(e), qc = (e) => Fc.test(e), Xc = () => {
  const e = ie("colors"), t = ie("spacing"), n = ie("blur"), r = ie("brightness"), o = ie("borderColor"), a = ie("borderRadius"), s = ie("borderSpacing"), i = ie("borderWidth"), l = ie("contrast"), d = ie("grayscale"), u = ie("hueRotate"), c = ie("invert"), f = ie("gap"), m = ie("gradientColorStops"), y = ie("gradientColorStopPositions"), h = ie("inset"), g = ie("margin"), b = ie("opacity"), x = ie("padding"), w = ie("saturate"), M = ie("scale"), S = ie("sepia"), k = ie("skew"), N = ie("space"), A = ie("translate"), Y = () => ["auto", "contain", "none"], _ = () => ["auto", "hidden", "clip", "visible", "scroll"], $ = () => ["auto", K, t], F = () => [K, t], G = () => ["", ot, pt], O = () => ["auto", jt, K], P = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], D = () => ["solid", "dashed", "dotted", "double", "none"], R = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], E = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], T = () => ["", "0", K], I = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], z = () => [jt, K];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [ln],
      spacing: [ot, pt],
      blur: ["none", "", gt, K],
      brightness: z(),
      borderColor: [e],
      borderRadius: ["none", "", "full", gt, K],
      borderSpacing: F(),
      borderWidth: G(),
      contrast: z(),
      grayscale: T(),
      hueRotate: z(),
      invert: T(),
      gap: F(),
      gradientColorStops: [e],
      gradientColorStopPositions: [Yc, pt],
      inset: $(),
      margin: $(),
      opacity: z(),
      padding: F(),
      saturate: z(),
      scale: z(),
      sepia: T(),
      skew: z(),
      space: F(),
      translate: F()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", K]
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
        "break-after": I()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": I()
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
        object: [...P(), K]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: _()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": _()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": _()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: Y()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": Y()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": Y()
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
        z: ["auto", cn, K]
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
        flex: ["1", "auto", "initial", "none", K]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: T()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: T()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", cn, K]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [ln]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", cn, K]
        }, K]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": O()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": O()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [ln]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [cn, K]
        }, K]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": O()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": O()
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
        "auto-cols": ["auto", "min", "max", "fr", K]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", K]
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
        "space-x": [N]
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
        "space-y": [N]
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
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", K, t]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [K, t, "min", "max", "fit"]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [K, t, "none", "full", "min", "max", "fit", "prose", {
          screen: [gt]
        }, gt]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [K, t, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": [K, t, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [K, t, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [K, t, "auto", "min", "max", "fit"]
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
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", pr]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [ln]
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
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", K]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", jt, pr]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", ot, K]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", K]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", K]
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
        decoration: [...D(), "wavy"]
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
        "underline-offset": ["auto", ot, K]
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
        indent: F()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", K]
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
        content: ["none", K]
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
        bg: [...P(), Lc]
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
        bg: ["auto", "cover", "contain", zc]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, jc]
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
        "border-opacity": [b]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...D(), "hidden"]
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
        "divide-opacity": [b]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: D()
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
        outline: ["", ...D()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [ot, K]
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
        ring: G()
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
        shadow: ["", "inner", "none", gt, Vc]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [ln]
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
        "mix-blend": [...R(), "plus-lighter", "plus-darker"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": R()
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
        "drop-shadow": ["", "none", gt, K]
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
        "backdrop-opacity": [b]
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
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", K]
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
        ease: ["linear", "in", "out", "in-out", K]
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
        animate: ["none", "spin", "ping", "pulse", "bounce", K]
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
        rotate: [cn, K]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [A]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [A]
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
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", K]
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", K]
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
        "scroll-m": F()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": F()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": F()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": F()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": F()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": F()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": F()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": F()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": F()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": F()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": F()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": F()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": F()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": F()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": F()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": F()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": F()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": F()
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
        "will-change": ["auto", "scroll", "contents", "transform", K]
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
        stroke: [ot, pt, pr]
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
}, Kc = /* @__PURE__ */ Rc(Xc);
function W(...e) {
  return Kc(Ca(e));
}
const Ro = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, Ao = Ca, Be = (e, t) => (n) => {
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
    return Object.entries(m).every((y) => {
      let [h, g] = y;
      return Array.isArray(g) ? g.includes({
        ...a,
        ...i
      }[h]) : {
        ...a,
        ...i
      }[h] === g;
    }) ? [
      ...d,
      c,
      f
    ] : d;
  }, []);
  return Ao(e, s, l, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
}, Qc = Be(
  W(
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
        secondary: W(
          "bg-cms-gray-300 text-cms-black",
          "hover:bg-cms-gray-200 hover:text-cms-gray-800"
        ),
        outline: W(
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
), wt = Ct(
  ({ className: e, variant: t, size: n, ...r }, o) => /* @__PURE__ */ v(
    "button",
    {
      className: W(Qc({ variant: t, size: n, className: e })),
      ref: o,
      ...r
    }
  )
);
wt.displayName = "Button";
const Zc = {
  sm: "h-4 w-4",
  md: "h-8 w-8",
  lg: "h-16 w-16"
};
function sv({ size: e = "lg", className: t }) {
  return /* @__PURE__ */ v("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ v(
    "div",
    {
      className: W(
        Zc[e],
        "animate-spin rounded-full",
        "border-2 border-cms-gray-500 border-b-transparent",
        t
      )
    }
  ) });
}
const Jc = Be(
  W(
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
        default: W(
          "bg-default text-black border border-cms-outline",
          "hover:bg-cms-gray-200"
        ),
        outline: W(
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
), el = ({
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
    className: W(
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
), tl = ({ className: e }) => /* @__PURE__ */ v(
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
), Hr = Ct(
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
  }, y) => {
    const [h, g] = Ee(!1), [b, x] = Ee(""), [w, M] = Ee(
      c ? t ? [t] : [] : []
    ), S = Ht(null), k = Ht(null), N = e.find((O) => O.value === t), A = c ? w.length > 0 ? `${w.length}개 선택됨` : n : (N == null ? void 0 : N.label) || n, Y = e.filter(
      (O) => O.label.toLowerCase().includes(b.toLowerCase())
    ), _ = () => {
      o || (g(!h), x(""));
    }, $ = (O) => {
      if (!O.disabled)
        if (c) {
          const P = w.includes(O.value) ? w.filter((D) => D !== O.value) : [...w, O.value];
          M(P), r == null || r(P.join(","));
        } else
          r == null || r(O.value), g(!1);
    }, F = (O) => {
      O.stopPropagation(), c && M([]), r == null || r("");
    }, G = (O) => {
      O.key === "Escape" ? g(!1) : (O.key === "Enter" || O.key === " ") && (O.preventDefault(), _());
    };
    return fn(() => {
      const O = (P) => {
        S.current && !S.current.contains(P.target) && g(!1);
      };
      return document.addEventListener("mousedown", O), () => document.removeEventListener("mousedown", O);
    }, []), fn(() => {
      h && d && k.current && k.current.focus();
    }, [h, d]), /* @__PURE__ */ Q("div", { ref: S, className: "relative w-full", children: [
      /* @__PURE__ */ Q(
        "button",
        {
          ref: y,
          type: "button",
          className: W(
            Jc({ variant: i, size: l }),
            o && "opacity-50 cursor-not-allowed",
            a
          ),
          onClick: _,
          onKeyDown: G,
          disabled: o,
          "aria-expanded": h,
          "aria-haspopup": "listbox",
          ...m,
          children: [
            /* @__PURE__ */ v(
              "span",
              {
                className: W(
                  "truncate flex-1 text-left",
                  !N && !c && "text-cms-gray-400"
                ),
                children: A
              }
            ),
            /* @__PURE__ */ Q("div", { className: "flex items-center gap-2 ml-3", children: [
              u && (t || w.length > 0) && /* @__PURE__ */ v(
                "button",
                {
                  type: "button",
                  className: W(
                    "p-1 rounded text-cms-gray-400 transition-colors",
                    "hover:text-cms-black"
                  ),
                  onClick: F,
                  "aria-label": "선택 취소",
                  children: /* @__PURE__ */ v(tl, { className: "w-3 h-3" })
                }
              ),
              /* @__PURE__ */ v(
                el,
                {
                  isOpen: h,
                  className: "w-4 h-4 text-cms-gray-400"
                }
              )
            ] })
          ]
        }
      ),
      h && /* @__PURE__ */ Q(
        "div",
        {
          className: W(
            "absolute z-50 mt-1 py-1 w-full",
            "rounded-lg border border-cms-gray-400",
            "bg-white shadow-lg",
            s
          ),
          style: { maxHeight: `${f}px` },
          children: [
            d && /* @__PURE__ */ v("div", { className: "px-3 py-2 border-b border-cms-gray-400", children: /* @__PURE__ */ v(
              "input",
              {
                ref: k,
                type: "text",
                value: b,
                onChange: (O) => x(O.target.value),
                placeholder: "검색...",
                className: W(
                  "w-full px-2 py-1 text-sm",
                  "rounded outline-none",
                  "border border-cms-gray-400",
                  "focus:ring-1 focus:ring-cms-black"
                )
              }
            ) }),
            /* @__PURE__ */ v("div", { className: "max-h-48 overflow-y-auto", children: Y.length === 0 ? /* @__PURE__ */ v("div", { className: "px-3 py-2 text-sm text-cms-gray-400 text-center", children: b ? "검색 결과가 없습니다" : "옵션이 없습니다" }) : Y.map((O) => {
              const P = c ? w.includes(O.value) : t === O.value;
              return /* @__PURE__ */ Q(
                "button",
                {
                  type: "button",
                  className: W(
                    "flex items-center justify-between gap-2",
                    "w-full px-3 py-2 ",
                    "text-left text-sm",
                    "transition-colors",
                    O.disabled ? "text-cms-gray-400 cursor-not-allowed" : "text-cms-black hover:bg-cms-gray-200 cursor-pointer",
                    P && "bg-cms-gray-400 font-medium"
                  ),
                  onClick: () => $(O),
                  disabled: O.disabled,
                  children: [
                    /* @__PURE__ */ v("span", { className: "truncate", children: O.label }),
                    P && /* @__PURE__ */ v(
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
                O.value
              );
            }) })
          ]
        }
      )
    ] });
  }
);
Hr.displayName = "Dropdown";
const nl = Ct(
  ({ label: e, helperText: t, error: n, required: r, className: o, ...a }, s) => /* @__PURE__ */ Q("div", { className: W("space-y-1", o), children: [
    e && /* @__PURE__ */ Q("label", { className: "block text-sm font-medium text-cms-black", children: [
      e,
      r && /* @__PURE__ */ v("span", { className: "text-cms-red-500 ml-1", children: "*" })
    ] }),
    /* @__PURE__ */ v(
      Hr,
      {
        ref: s,
        ...a,
        className: W(n && "border-cms-red-500 focus:ring-cms-red-500")
      }
    ),
    (t || n) && /* @__PURE__ */ v(
      "p",
      {
        className: W(
          "text-xs",
          n ? "text-cms-red-500" : "text-cms-gray-400"
        ),
        children: n || t
      }
    )
  ] })
);
nl.displayName = "Select";
const rl = Ct(
  ({ options: e, loading: t = !1, createable: n = !1, onCreateOption: r, ...o }, a) => {
    const [s] = Ee(""), i = e.filter(
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
    return /* @__PURE__ */ v(
      Hr,
      {
        ref: a,
        ...o,
        options: d,
        searchable: !0,
        dropdownClassName: W(t && "opacity-75", o.dropdownClassName),
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
rl.displayName = "Combobox";
function iv(e) {
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
function Ea(...e) {
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
  return p.useCallback(Ea(...e), e);
}
function ol(e, t) {
  const n = p.createContext(t), r = (a) => {
    const { children: s, ...i } = a, l = p.useMemo(() => i, Object.values(i));
    return /* @__PURE__ */ v(n.Provider, { value: l, children: s });
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
function ze(e, t = []) {
  let n = [];
  function r(a, s) {
    const i = p.createContext(s), l = n.length;
    n = [...n, s];
    const d = (c) => {
      var b;
      const { scope: f, children: m, ...y } = c, h = ((b = f == null ? void 0 : f[e]) == null ? void 0 : b[l]) || i, g = p.useMemo(() => y, Object.values(y));
      return /* @__PURE__ */ v(h.Provider, { value: g, children: m });
    };
    d.displayName = a + "Provider";
    function u(c, f) {
      var h;
      const m = ((h = f == null ? void 0 : f[e]) == null ? void 0 : h[l]) || i, y = p.useContext(m);
      if (y) return y;
      if (s !== void 0) return s;
      throw new Error(`\`${c}\` must be used within \`${a}\``);
    }
    return [d, u];
  }
  const o = () => {
    const a = n.map((s) => p.createContext(s));
    return function(i) {
      const l = (i == null ? void 0 : i[e]) || a;
      return p.useMemo(
        () => ({ [`__scope${e}`]: { ...i, [e]: l } }),
        [i, l]
      );
    };
  };
  return o.scopeName = e, [r, al(o, ...t)];
}
function al(...e) {
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
      return p.useMemo(() => ({ [`__scope${t.scopeName}`]: s }), [s]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
// @__NO_SIDE_EFFECTS__
function mn(e) {
  const t = /* @__PURE__ */ sl(e), n = p.forwardRef((r, o) => {
    const { children: a, ...s } = r, i = p.Children.toArray(a), l = i.find(cl);
    if (l) {
      const d = l.props.children, u = i.map((c) => c === l ? p.Children.count(d) > 1 ? p.Children.only(null) : p.isValidElement(d) ? d.props.children : null : c);
      return /* @__PURE__ */ v(t, { ...s, ref: o, children: p.isValidElement(d) ? p.cloneElement(d, void 0, u) : null });
    }
    return /* @__PURE__ */ v(t, { ...s, ref: o, children: a });
  });
  return n.displayName = `${e}.Slot`, n;
}
// @__NO_SIDE_EFFECTS__
function sl(e) {
  const t = p.forwardRef((n, r) => {
    const { children: o, ...a } = n;
    if (p.isValidElement(o)) {
      const s = dl(o), i = ll(a, o.props);
      return o.type !== p.Fragment && (i.ref = r ? Ea(r, s) : s), p.cloneElement(o, i);
    }
    return p.Children.count(o) > 1 ? p.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var il = Symbol("radix.slottable");
function cl(e) {
  return p.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === il;
}
function ll(e, t) {
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
function dl(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var ul = [
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
], ne = ul.reduce((e, t) => {
  const n = /* @__PURE__ */ mn(`Primitive.${t}`), r = p.forwardRef((o, a) => {
    const { asChild: s, ...i } = o, l = s ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ v(l, { ...i, ref: a });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {});
function fl(e, t) {
  e && wa.flushSync(() => e.dispatchEvent(t));
}
function Et(e) {
  const t = p.useRef(e);
  return p.useEffect(() => {
    t.current = e;
  }), p.useMemo(() => (...n) => {
    var r;
    return (r = t.current) == null ? void 0 : r.call(t, ...n);
  }, []);
}
function ml(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = Et(e);
  p.useEffect(() => {
    const r = (o) => {
      o.key === "Escape" && n(o);
    };
    return t.addEventListener("keydown", r, { capture: !0 }), () => t.removeEventListener("keydown", r, { capture: !0 });
  }, [n, t]);
}
var hl = "DismissableLayer", Tr = "dismissableLayer.update", pl = "dismissableLayer.pointerDownOutside", gl = "dismissableLayer.focusOutside", _o, Pa = p.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), jr = p.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: r,
      onPointerDownOutside: o,
      onFocusOutside: a,
      onInteractOutside: s,
      onDismiss: i,
      ...l
    } = e, d = p.useContext(Pa), [u, c] = p.useState(null), f = (u == null ? void 0 : u.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), [, m] = p.useState({}), y = de(t, (N) => c(N)), h = Array.from(d.layers), [g] = [...d.layersWithOutsidePointerEventsDisabled].slice(-1), b = h.indexOf(g), x = u ? h.indexOf(u) : -1, w = d.layersWithOutsidePointerEventsDisabled.size > 0, M = x >= b, S = yl((N) => {
      const A = N.target, Y = [...d.branches].some((_) => _.contains(A));
      !M || Y || (o == null || o(N), s == null || s(N), N.defaultPrevented || i == null || i());
    }, f), k = wl((N) => {
      const A = N.target;
      [...d.branches].some((_) => _.contains(A)) || (a == null || a(N), s == null || s(N), N.defaultPrevented || i == null || i());
    }, f);
    return ml((N) => {
      x === d.layers.size - 1 && (r == null || r(N), !N.defaultPrevented && i && (N.preventDefault(), i()));
    }, f), p.useEffect(() => {
      if (u)
        return n && (d.layersWithOutsidePointerEventsDisabled.size === 0 && (_o = f.body.style.pointerEvents, f.body.style.pointerEvents = "none"), d.layersWithOutsidePointerEventsDisabled.add(u)), d.layers.add(u), Io(), () => {
          n && d.layersWithOutsidePointerEventsDisabled.size === 1 && (f.body.style.pointerEvents = _o);
        };
    }, [u, f, n, d]), p.useEffect(() => () => {
      u && (d.layers.delete(u), d.layersWithOutsidePointerEventsDisabled.delete(u), Io());
    }, [u, d]), p.useEffect(() => {
      const N = () => m({});
      return document.addEventListener(Tr, N), () => document.removeEventListener(Tr, N);
    }, []), /* @__PURE__ */ v(
      ne.div,
      {
        ...l,
        ref: y,
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
jr.displayName = hl;
var bl = "DismissableLayerBranch", vl = p.forwardRef((e, t) => {
  const n = p.useContext(Pa), r = p.useRef(null), o = de(t, r);
  return p.useEffect(() => {
    const a = r.current;
    if (a)
      return n.branches.add(a), () => {
        n.branches.delete(a);
      };
  }, [n.branches]), /* @__PURE__ */ v(ne.div, { ...e, ref: o });
});
vl.displayName = bl;
function yl(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = Et(e), r = p.useRef(!1), o = p.useRef(() => {
  });
  return p.useEffect(() => {
    const a = (i) => {
      if (i.target && !r.current) {
        let l = function() {
          Ra(
            pl,
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
function wl(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = Et(e), r = p.useRef(!1);
  return p.useEffect(() => {
    const o = (a) => {
      a.target && !r.current && Ra(gl, n, { originalEvent: a }, {
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
  const e = new CustomEvent(Tr);
  document.dispatchEvent(e);
}
function Ra(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target, a = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && o.addEventListener(e, t, { once: !0 }), r ? fl(o, a) : o.dispatchEvent(a);
}
var gr = 0;
function Aa() {
  p.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? Wo()), document.body.insertAdjacentElement("beforeend", e[1] ?? Wo()), gr++, () => {
      gr === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), gr--;
    };
  }, []);
}
function Wo() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var br = "focusScope.autoFocusOnMount", vr = "focusScope.autoFocusOnUnmount", $o = { bubbles: !1, cancelable: !0 }, xl = "FocusScope", Vr = p.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: r = !1,
    onMountAutoFocus: o,
    onUnmountAutoFocus: a,
    ...s
  } = e, [i, l] = p.useState(null), d = Et(o), u = Et(a), c = p.useRef(null), f = de(t, (h) => l(h)), m = p.useRef({
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
      let h = function(w) {
        if (m.paused || !i) return;
        const M = w.target;
        i.contains(M) ? c.current = M : vt(c.current, { select: !0 });
      }, g = function(w) {
        if (m.paused || !i) return;
        const M = w.relatedTarget;
        M !== null && (i.contains(M) || vt(c.current, { select: !0 }));
      }, b = function(w) {
        if (document.activeElement === document.body)
          for (const S of w)
            S.removedNodes.length > 0 && vt(i);
      };
      document.addEventListener("focusin", h), document.addEventListener("focusout", g);
      const x = new MutationObserver(b);
      return i && x.observe(i, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", h), document.removeEventListener("focusout", g), x.disconnect();
      };
    }
  }, [r, i, m.paused]), p.useEffect(() => {
    if (i) {
      Yo.add(m);
      const h = document.activeElement;
      if (!i.contains(h)) {
        const b = new CustomEvent(br, $o);
        i.addEventListener(br, d), i.dispatchEvent(b), b.defaultPrevented || (kl(Nl(Ta(i)), { select: !0 }), document.activeElement === h && vt(i));
      }
      return () => {
        i.removeEventListener(br, d), setTimeout(() => {
          const b = new CustomEvent(vr, $o);
          i.addEventListener(vr, u), i.dispatchEvent(b), b.defaultPrevented || vt(h ?? document.body, { select: !0 }), i.removeEventListener(vr, u), Yo.remove(m);
        }, 0);
      };
    }
  }, [i, d, u, m]);
  const y = p.useCallback(
    (h) => {
      if (!n && !r || m.paused) return;
      const g = h.key === "Tab" && !h.altKey && !h.ctrlKey && !h.metaKey, b = document.activeElement;
      if (g && b) {
        const x = h.currentTarget, [w, M] = Cl(x);
        w && M ? !h.shiftKey && b === M ? (h.preventDefault(), n && vt(w, { select: !0 })) : h.shiftKey && b === w && (h.preventDefault(), n && vt(M, { select: !0 })) : b === x && h.preventDefault();
      }
    },
    [n, r, m.paused]
  );
  return /* @__PURE__ */ v(ne.div, { tabIndex: -1, ...s, ref: f, onKeyDown: y });
});
Vr.displayName = xl;
function kl(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if (vt(r, { select: t }), document.activeElement !== n) return;
}
function Cl(e) {
  const t = Ta(e), n = Fo(t, e), r = Fo(t.reverse(), e);
  return [n, r];
}
function Ta(e) {
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
    if (!Ml(n, { upTo: t })) return n;
}
function Ml(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function Sl(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function vt(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && Sl(e) && t && e.select();
  }
}
var Yo = Dl();
function Dl() {
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
function Nl(e) {
  return e.filter((t) => t.tagName !== "A");
}
var it = globalThis != null && globalThis.document ? p.useLayoutEffect : () => {
}, Ol = p[" useId ".trim().toString()] || (() => {
}), El = 0;
function Ot(e) {
  const [t, n] = p.useState(Ol());
  return it(() => {
    n((r) => r ?? String(El++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
const Pl = ["top", "right", "bottom", "left"], xt = Math.min, Oe = Math.max, zn = Math.round, Pn = Math.floor, Ze = (e) => ({
  x: e,
  y: e
}), Rl = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Al = {
  start: "end",
  end: "start"
};
function _r(e, t, n) {
  return Oe(e, xt(t, n));
}
function ct(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function lt(e) {
  return e.split("-")[0];
}
function Zt(e) {
  return e.split("-")[1];
}
function Gr(e) {
  return e === "x" ? "y" : "x";
}
function Ur(e) {
  return e === "y" ? "height" : "width";
}
const Tl = /* @__PURE__ */ new Set(["top", "bottom"]);
function Xe(e) {
  return Tl.has(lt(e)) ? "y" : "x";
}
function qr(e) {
  return Gr(Xe(e));
}
function _l(e, t, n) {
  n === void 0 && (n = !1);
  const r = Zt(e), o = qr(e), a = Ur(o);
  let s = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[a] > t.floating[a] && (s = Ln(s)), [s, Ln(s)];
}
function Il(e) {
  const t = Ln(e);
  return [Ir(e), t, Ir(t)];
}
function Ir(e) {
  return e.replace(/start|end/g, (t) => Al[t]);
}
const zo = ["left", "right"], Lo = ["right", "left"], Wl = ["top", "bottom"], $l = ["bottom", "top"];
function Fl(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? Lo : zo : t ? zo : Lo;
    case "left":
    case "right":
      return t ? Wl : $l;
    default:
      return [];
  }
}
function Yl(e, t, n, r) {
  const o = Zt(e);
  let a = Fl(lt(e), n === "start", r);
  return o && (a = a.map((s) => s + "-" + o), t && (a = a.concat(a.map(Ir)))), a;
}
function Ln(e) {
  return e.replace(/left|right|bottom|top/g, (t) => Rl[t]);
}
function Bl(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function _a(e) {
  return typeof e != "number" ? Bl(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function Hn(e) {
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
function Ho(e, t, n) {
  let {
    reference: r,
    floating: o
  } = e;
  const a = Xe(t), s = qr(t), i = Ur(s), l = lt(t), d = a === "y", u = r.x + r.width / 2 - o.width / 2, c = r.y + r.height / 2 - o.height / 2, f = r[i] / 2 - o[i] / 2;
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
  switch (Zt(t)) {
    case "start":
      m[s] -= f * (n && d ? -1 : 1);
      break;
    case "end":
      m[s] += f * (n && d ? -1 : 1);
      break;
  }
  return m;
}
const zl = async (e, t, n) => {
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
  } = Ho(d, r, l), f = r, m = {}, y = 0;
  for (let h = 0; h < i.length; h++) {
    const {
      name: g,
      fn: b
    } = i[h], {
      x,
      y: w,
      data: M,
      reset: S
    } = await b({
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
      [g]: {
        ...m[g],
        ...M
      }
    }, S && y <= 50 && (y++, typeof S == "object" && (S.placement && (f = S.placement), S.rects && (d = S.rects === !0 ? await s.getElementRects({
      reference: e,
      floating: t,
      strategy: o
    }) : S.rects), {
      x: u,
      y: c
    } = Ho(d, f, l)), h = -1);
  }
  return {
    x: u,
    y: c,
    placement: f,
    strategy: o,
    middlewareData: m
  };
};
async function hn(e, t) {
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
  } = ct(t, e), y = _a(m), g = i[f ? c === "floating" ? "reference" : "floating" : c], b = Hn(await a.getClippingRect({
    element: (n = await (a.isElement == null ? void 0 : a.isElement(g))) == null || n ? g : g.contextElement || await (a.getDocumentElement == null ? void 0 : a.getDocumentElement(i.floating)),
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
  }, S = Hn(a.convertOffsetParentRelativeRectToViewportRelativeRect ? await a.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: i,
    rect: x,
    offsetParent: w,
    strategy: l
  }) : x);
  return {
    top: (b.top - S.top + y.top) / M.y,
    bottom: (S.bottom - b.bottom + y.bottom) / M.y,
    left: (b.left - S.left + y.left) / M.x,
    right: (S.right - b.right + y.right) / M.x
  };
}
const Ll = (e) => ({
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
    const c = _a(u), f = {
      x: n,
      y: r
    }, m = qr(o), y = Ur(m), h = await s.getDimensions(d), g = m === "y", b = g ? "top" : "left", x = g ? "bottom" : "right", w = g ? "clientHeight" : "clientWidth", M = a.reference[y] + a.reference[m] - f[m] - a.floating[y], S = f[m] - a.reference[m], k = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(d));
    let N = k ? k[w] : 0;
    (!N || !await (s.isElement == null ? void 0 : s.isElement(k))) && (N = i.floating[w] || a.floating[y]);
    const A = M / 2 - S / 2, Y = N / 2 - h[y] / 2 - 1, _ = xt(c[b], Y), $ = xt(c[x], Y), F = _, G = N - h[y] - $, O = N / 2 - h[y] / 2 + A, P = _r(F, O, G), D = !l.arrow && Zt(o) != null && O !== P && a.reference[y] / 2 - (O < F ? _ : $) - h[y] / 2 < 0, R = D ? O < F ? O - F : O - G : 0;
    return {
      [m]: f[m] + R,
      data: {
        [m]: P,
        centerOffset: O - P - R,
        ...D && {
          alignmentOffset: R
        }
      },
      reset: D
    };
  }
}), Hl = function(e) {
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
        fallbackAxisSideDirection: y = "none",
        flipAlignment: h = !0,
        ...g
      } = ct(e, t);
      if ((n = a.arrow) != null && n.alignmentOffset)
        return {};
      const b = lt(o), x = Xe(i), w = lt(i) === i, M = await (l.isRTL == null ? void 0 : l.isRTL(d.floating)), S = f || (w || !h ? [Ln(i)] : Il(i)), k = y !== "none";
      !f && k && S.push(...Yl(i, h, y, M));
      const N = [i, ...S], A = await hn(t, g), Y = [];
      let _ = ((r = a.flip) == null ? void 0 : r.overflows) || [];
      if (u && Y.push(A[b]), c) {
        const O = _l(o, s, M);
        Y.push(A[O[0]], A[O[1]]);
      }
      if (_ = [..._, {
        placement: o,
        overflows: Y
      }], !Y.every((O) => O <= 0)) {
        var $, F;
        const O = ((($ = a.flip) == null ? void 0 : $.index) || 0) + 1, P = N[O];
        if (P && (!(c === "alignment" ? x !== Xe(P) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        _.every((E) => Xe(E.placement) === x ? E.overflows[0] > 0 : !0)))
          return {
            data: {
              index: O,
              overflows: _
            },
            reset: {
              placement: P
            }
          };
        let D = (F = _.filter((R) => R.overflows[0] <= 0).sort((R, E) => R.overflows[1] - E.overflows[1])[0]) == null ? void 0 : F.placement;
        if (!D)
          switch (m) {
            case "bestFit": {
              var G;
              const R = (G = _.filter((E) => {
                if (k) {
                  const T = Xe(E.placement);
                  return T === x || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  T === "y";
                }
                return !0;
              }).map((E) => [E.placement, E.overflows.filter((T) => T > 0).reduce((T, I) => T + I, 0)]).sort((E, T) => E[1] - T[1])[0]) == null ? void 0 : G[0];
              R && (D = R);
              break;
            }
            case "initialPlacement":
              D = i;
              break;
          }
        if (o !== D)
          return {
            reset: {
              placement: D
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
  return Pl.some((t) => e[t] >= 0);
}
const jl = function(e) {
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
          const a = await hn(t, {
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
          const a = await hn(t, {
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
}, Ia = /* @__PURE__ */ new Set(["left", "top"]);
async function Vl(e, t) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), s = lt(n), i = Zt(n), l = Xe(n) === "y", d = Ia.has(s) ? -1 : 1, u = a && l ? -1 : 1, c = ct(t, e);
  let {
    mainAxis: f,
    crossAxis: m,
    alignmentAxis: y
  } = typeof c == "number" ? {
    mainAxis: c,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: c.mainAxis || 0,
    crossAxis: c.crossAxis || 0,
    alignmentAxis: c.alignmentAxis
  };
  return i && typeof y == "number" && (m = i === "end" ? y * -1 : y), l ? {
    x: m * u,
    y: f * d
  } : {
    x: f * d,
    y: m * u
  };
}
const Gl = function(e) {
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
      } = t, l = await Vl(t, e);
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
}, Ul = function(e) {
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
          fn: (g) => {
            let {
              x: b,
              y: x
            } = g;
            return {
              x: b,
              y: x
            };
          }
        },
        ...l
      } = ct(e, t), d = {
        x: n,
        y: r
      }, u = await hn(t, l), c = Xe(lt(o)), f = Gr(c);
      let m = d[f], y = d[c];
      if (a) {
        const g = f === "y" ? "top" : "left", b = f === "y" ? "bottom" : "right", x = m + u[g], w = m - u[b];
        m = _r(x, m, w);
      }
      if (s) {
        const g = c === "y" ? "top" : "left", b = c === "y" ? "bottom" : "right", x = y + u[g], w = y - u[b];
        y = _r(x, y, w);
      }
      const h = i.fn({
        ...t,
        [f]: m,
        [c]: y
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
}, ql = function(e) {
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
      }, c = Xe(o), f = Gr(c);
      let m = u[f], y = u[c];
      const h = ct(i, t), g = typeof h == "number" ? {
        mainAxis: h,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...h
      };
      if (l) {
        const w = f === "y" ? "height" : "width", M = a.reference[f] - a.floating[w] + g.mainAxis, S = a.reference[f] + a.reference[w] - g.mainAxis;
        m < M ? m = M : m > S && (m = S);
      }
      if (d) {
        var b, x;
        const w = f === "y" ? "width" : "height", M = Ia.has(lt(o)), S = a.reference[c] - a.floating[w] + (M && ((b = s.offset) == null ? void 0 : b[c]) || 0) + (M ? 0 : g.crossAxis), k = a.reference[c] + a.reference[w] + (M ? 0 : ((x = s.offset) == null ? void 0 : x[c]) || 0) - (M ? g.crossAxis : 0);
        y < S ? y = S : y > k && (y = k);
      }
      return {
        [f]: m,
        [c]: y
      };
    }
  };
}, Xl = function(e) {
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
      } = ct(e, t), u = await hn(t, d), c = lt(o), f = Zt(o), m = Xe(o) === "y", {
        width: y,
        height: h
      } = a.floating;
      let g, b;
      c === "top" || c === "bottom" ? (g = c, b = f === (await (s.isRTL == null ? void 0 : s.isRTL(i.floating)) ? "start" : "end") ? "left" : "right") : (b = c, g = f === "end" ? "top" : "bottom");
      const x = h - u.top - u.bottom, w = y - u.left - u.right, M = xt(h - u[g], x), S = xt(y - u[b], w), k = !t.middlewareData.shift;
      let N = M, A = S;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (A = w), (r = t.middlewareData.shift) != null && r.enabled.y && (N = x), k && !f) {
        const _ = Oe(u.left, 0), $ = Oe(u.right, 0), F = Oe(u.top, 0), G = Oe(u.bottom, 0);
        m ? A = y - 2 * (_ !== 0 || $ !== 0 ? _ + $ : Oe(u.left, u.right)) : N = h - 2 * (F !== 0 || G !== 0 ? F + G : Oe(u.top, u.bottom));
      }
      await l({
        ...t,
        availableWidth: A,
        availableHeight: N
      });
      const Y = await s.getDimensions(i.floating);
      return y !== Y.width || h !== Y.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function Un() {
  return typeof window < "u";
}
function Jt(e) {
  return Wa(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Pe(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function et(e) {
  var t;
  return (t = (Wa(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Wa(e) {
  return Un() ? e instanceof Node || e instanceof Pe(e).Node : !1;
}
function Fe(e) {
  return Un() ? e instanceof Element || e instanceof Pe(e).Element : !1;
}
function Je(e) {
  return Un() ? e instanceof HTMLElement || e instanceof Pe(e).HTMLElement : !1;
}
function Go(e) {
  return !Un() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Pe(e).ShadowRoot;
}
const Kl = /* @__PURE__ */ new Set(["inline", "contents"]);
function vn(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: o
  } = Ye(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !Kl.has(o);
}
const Ql = /* @__PURE__ */ new Set(["table", "td", "th"]);
function Zl(e) {
  return Ql.has(Jt(e));
}
const Jl = [":popover-open", ":modal"];
function qn(e) {
  return Jl.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const ed = ["transform", "translate", "scale", "rotate", "perspective"], td = ["transform", "translate", "scale", "rotate", "perspective", "filter"], nd = ["paint", "layout", "strict", "content"];
function Xr(e) {
  const t = Kr(), n = Fe(e) ? Ye(e) : e;
  return ed.some((r) => n[r] ? n[r] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || td.some((r) => (n.willChange || "").includes(r)) || nd.some((r) => (n.contain || "").includes(r));
}
function rd(e) {
  let t = kt(e);
  for (; Je(t) && !qt(t); ) {
    if (Xr(t))
      return t;
    if (qn(t))
      return null;
    t = kt(t);
  }
  return null;
}
function Kr() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const od = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function qt(e) {
  return od.has(Jt(e));
}
function Ye(e) {
  return Pe(e).getComputedStyle(e);
}
function Xn(e) {
  return Fe(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function kt(e) {
  if (Jt(e) === "html")
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
function $a(e) {
  const t = kt(e);
  return qt(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : Je(t) && vn(t) ? t : $a(t);
}
function pn(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = $a(e), a = o === ((r = e.ownerDocument) == null ? void 0 : r.body), s = Pe(o);
  if (a) {
    const i = Wr(s);
    return t.concat(s, s.visualViewport || [], vn(o) ? o : [], i && n ? pn(i) : []);
  }
  return t.concat(o, pn(o, [], n));
}
function Wr(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function Fa(e) {
  const t = Ye(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const o = Je(e), a = o ? e.offsetWidth : n, s = o ? e.offsetHeight : r, i = zn(n) !== a || zn(r) !== s;
  return i && (n = a, r = s), {
    width: n,
    height: r,
    $: i
  };
}
function Qr(e) {
  return Fe(e) ? e : e.contextElement;
}
function Vt(e) {
  const t = Qr(e);
  if (!Je(t))
    return Ze(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: o,
    $: a
  } = Fa(t);
  let s = (a ? zn(n.width) : n.width) / r, i = (a ? zn(n.height) : n.height) / o;
  return (!s || !Number.isFinite(s)) && (s = 1), (!i || !Number.isFinite(i)) && (i = 1), {
    x: s,
    y: i
  };
}
const ad = /* @__PURE__ */ Ze(0);
function Ya(e) {
  const t = Pe(e);
  return !Kr() || !t.visualViewport ? ad : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function sd(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== Pe(e) ? !1 : t;
}
function Pt(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), a = Qr(e);
  let s = Ze(1);
  t && (r ? Fe(r) && (s = Vt(r)) : s = Vt(e));
  const i = sd(a, n, r) ? Ya(a) : Ze(0);
  let l = (o.left + i.x) / s.x, d = (o.top + i.y) / s.y, u = o.width / s.x, c = o.height / s.y;
  if (a) {
    const f = Pe(a), m = r && Fe(r) ? Pe(r) : r;
    let y = f, h = Wr(y);
    for (; h && r && m !== y; ) {
      const g = Vt(h), b = h.getBoundingClientRect(), x = Ye(h), w = b.left + (h.clientLeft + parseFloat(x.paddingLeft)) * g.x, M = b.top + (h.clientTop + parseFloat(x.paddingTop)) * g.y;
      l *= g.x, d *= g.y, u *= g.x, c *= g.y, l += w, d += M, y = Pe(h), h = Wr(y);
    }
  }
  return Hn({
    width: u,
    height: c,
    x: l,
    y: d
  });
}
function Kn(e, t) {
  const n = Xn(e).scrollLeft;
  return t ? t.left + n : Pt(et(e)).left + n;
}
function Ba(e, t) {
  const n = e.getBoundingClientRect(), r = n.left + t.scrollLeft - Kn(e, n), o = n.top + t.scrollTop;
  return {
    x: r,
    y: o
  };
}
function id(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: r,
    strategy: o
  } = e;
  const a = o === "fixed", s = et(r), i = t ? qn(t.floating) : !1;
  if (r === s || i && a)
    return n;
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  }, d = Ze(1);
  const u = Ze(0), c = Je(r);
  if ((c || !c && !a) && ((Jt(r) !== "body" || vn(s)) && (l = Xn(r)), Je(r))) {
    const m = Pt(r);
    d = Vt(r), u.x = m.x + r.clientLeft, u.y = m.y + r.clientTop;
  }
  const f = s && !c && !a ? Ba(s, l) : Ze(0);
  return {
    width: n.width * d.x,
    height: n.height * d.y,
    x: n.x * d.x - l.scrollLeft * d.x + u.x + f.x,
    y: n.y * d.y - l.scrollTop * d.y + u.y + f.y
  };
}
function cd(e) {
  return Array.from(e.getClientRects());
}
function ld(e) {
  const t = et(e), n = Xn(e), r = e.ownerDocument.body, o = Oe(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), a = Oe(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let s = -n.scrollLeft + Kn(e);
  const i = -n.scrollTop;
  return Ye(r).direction === "rtl" && (s += Oe(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: a,
    x: s,
    y: i
  };
}
const Uo = 25;
function dd(e, t) {
  const n = Pe(e), r = et(e), o = n.visualViewport;
  let a = r.clientWidth, s = r.clientHeight, i = 0, l = 0;
  if (o) {
    a = o.width, s = o.height;
    const u = Kr();
    (!u || u && t === "fixed") && (i = o.offsetLeft, l = o.offsetTop);
  }
  const d = Kn(r);
  if (d <= 0) {
    const u = r.ownerDocument, c = u.body, f = getComputedStyle(c), m = u.compatMode === "CSS1Compat" && parseFloat(f.marginLeft) + parseFloat(f.marginRight) || 0, y = Math.abs(r.clientWidth - c.clientWidth - m);
    y <= Uo && (a -= y);
  } else d <= Uo && (a += d);
  return {
    width: a,
    height: s,
    x: i,
    y: l
  };
}
const ud = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function fd(e, t) {
  const n = Pt(e, !0, t === "fixed"), r = n.top + e.clientTop, o = n.left + e.clientLeft, a = Je(e) ? Vt(e) : Ze(1), s = e.clientWidth * a.x, i = e.clientHeight * a.y, l = o * a.x, d = r * a.y;
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
    r = dd(e, n);
  else if (t === "document")
    r = ld(et(e));
  else if (Fe(t))
    r = fd(t, n);
  else {
    const o = Ya(e);
    r = {
      x: t.x - o.x,
      y: t.y - o.y,
      width: t.width,
      height: t.height
    };
  }
  return Hn(r);
}
function za(e, t) {
  const n = kt(e);
  return n === t || !Fe(n) || qt(n) ? !1 : Ye(n).position === "fixed" || za(n, t);
}
function md(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = pn(e, [], !1).filter((i) => Fe(i) && Jt(i) !== "body"), o = null;
  const a = Ye(e).position === "fixed";
  let s = a ? kt(e) : e;
  for (; Fe(s) && !qt(s); ) {
    const i = Ye(s), l = Xr(s);
    !l && i.position === "fixed" && (o = null), (a ? !l && !o : !l && i.position === "static" && !!o && ud.has(o.position) || vn(s) && !l && za(e, s)) ? r = r.filter((u) => u !== s) : o = i, s = kt(s);
  }
  return t.set(e, r), r;
}
function hd(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = e;
  const s = [...n === "clippingAncestors" ? qn(t) ? [] : md(t, this._c) : [].concat(n), r], i = s[0], l = s.reduce((d, u) => {
    const c = qo(t, u, o);
    return d.top = Oe(c.top, d.top), d.right = xt(c.right, d.right), d.bottom = xt(c.bottom, d.bottom), d.left = Oe(c.left, d.left), d;
  }, qo(t, i, o));
  return {
    width: l.right - l.left,
    height: l.bottom - l.top,
    x: l.left,
    y: l.top
  };
}
function pd(e) {
  const {
    width: t,
    height: n
  } = Fa(e);
  return {
    width: t,
    height: n
  };
}
function gd(e, t, n) {
  const r = Je(t), o = et(t), a = n === "fixed", s = Pt(e, !0, a, t);
  let i = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const l = Ze(0);
  function d() {
    l.x = Kn(o);
  }
  if (r || !r && !a)
    if ((Jt(t) !== "body" || vn(o)) && (i = Xn(t)), r) {
      const m = Pt(t, !0, a, t);
      l.x = m.x + t.clientLeft, l.y = m.y + t.clientTop;
    } else o && d();
  a && !r && o && d();
  const u = o && !r && !a ? Ba(o, i) : Ze(0), c = s.left + i.scrollLeft - l.x - u.x, f = s.top + i.scrollTop - l.y - u.y;
  return {
    x: c,
    y: f,
    width: s.width,
    height: s.height
  };
}
function yr(e) {
  return Ye(e).position === "static";
}
function Xo(e, t) {
  if (!Je(e) || Ye(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return et(e) === n && (n = n.ownerDocument.body), n;
}
function La(e, t) {
  const n = Pe(e);
  if (qn(e))
    return n;
  if (!Je(e)) {
    let o = kt(e);
    for (; o && !qt(o); ) {
      if (Fe(o) && !yr(o))
        return o;
      o = kt(o);
    }
    return n;
  }
  let r = Xo(e, t);
  for (; r && Zl(r) && yr(r); )
    r = Xo(r, t);
  return r && qt(r) && yr(r) && !Xr(r) ? n : r || rd(e) || n;
}
const bd = async function(e) {
  const t = this.getOffsetParent || La, n = this.getDimensions, r = await n(e.floating);
  return {
    reference: gd(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function vd(e) {
  return Ye(e).direction === "rtl";
}
const yd = {
  convertOffsetParentRelativeRectToViewportRelativeRect: id,
  getDocumentElement: et,
  getClippingRect: hd,
  getOffsetParent: La,
  getElementRects: bd,
  getClientRects: cd,
  getDimensions: pd,
  getScale: Vt,
  isElement: Fe,
  isRTL: vd
};
function Ha(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function wd(e, t) {
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
    const y = Pn(c), h = Pn(o.clientWidth - (u + f)), g = Pn(o.clientHeight - (c + m)), b = Pn(u), w = {
      rootMargin: -y + "px " + -h + "px " + -g + "px " + -b + "px",
      threshold: Oe(0, xt(1, l)) || 1
    };
    let M = !0;
    function S(k) {
      const N = k[0].intersectionRatio;
      if (N !== l) {
        if (!M)
          return s();
        N ? s(!1, N) : r = setTimeout(() => {
          s(!1, 1e-7);
        }, 1e3);
      }
      N === 1 && !Ha(d, e.getBoundingClientRect()) && s(), M = !1;
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
function xd(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: a = !0,
    elementResize: s = typeof ResizeObserver == "function",
    layoutShift: i = typeof IntersectionObserver == "function",
    animationFrame: l = !1
  } = r, d = Qr(e), u = o || a ? [...d ? pn(d) : [], ...pn(t)] : [];
  u.forEach((b) => {
    o && b.addEventListener("scroll", n, {
      passive: !0
    }), a && b.addEventListener("resize", n);
  });
  const c = d && i ? wd(d, n) : null;
  let f = -1, m = null;
  s && (m = new ResizeObserver((b) => {
    let [x] = b;
    x && x.target === d && m && (m.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
      var w;
      (w = m) == null || w.observe(t);
    })), n();
  }), d && !l && m.observe(d), m.observe(t));
  let y, h = l ? Pt(e) : null;
  l && g();
  function g() {
    const b = Pt(e);
    h && !Ha(h, b) && n(), h = b, y = requestAnimationFrame(g);
  }
  return n(), () => {
    var b;
    u.forEach((x) => {
      o && x.removeEventListener("scroll", n), a && x.removeEventListener("resize", n);
    }), c == null || c(), (b = m) == null || b.disconnect(), m = null, l && cancelAnimationFrame(y);
  };
}
const kd = Gl, Cd = Ul, Md = Hl, Sd = Xl, Dd = jl, Ko = Ll, Nd = ql, Od = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: yd,
    ...n
  }, a = {
    ...o.platform,
    _c: r
  };
  return zl(e, t, {
    ...o,
    platform: a
  });
};
var Ed = typeof document < "u", Pd = function() {
}, $n = Ed ? ya : Pd;
function jn(e, t) {
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
        if (!jn(e[r], t[r]))
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
      if (!(a === "_owner" && e.$$typeof) && !jn(e[a], t[a]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function ja(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Qo(e, t) {
  const n = ja(e);
  return Math.round(t * n) / n;
}
function wr(e) {
  const t = p.useRef(e);
  return $n(() => {
    t.current = e;
  }), t;
}
function Rd(e) {
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
  } = e, [u, c] = p.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [f, m] = p.useState(r);
  jn(f, r) || m(r);
  const [y, h] = p.useState(null), [g, b] = p.useState(null), x = p.useCallback((E) => {
    E !== k.current && (k.current = E, h(E));
  }, []), w = p.useCallback((E) => {
    E !== N.current && (N.current = E, b(E));
  }, []), M = a || y, S = s || g, k = p.useRef(null), N = p.useRef(null), A = p.useRef(u), Y = l != null, _ = wr(l), $ = wr(o), F = wr(d), G = p.useCallback(() => {
    if (!k.current || !N.current)
      return;
    const E = {
      placement: t,
      strategy: n,
      middleware: f
    };
    $.current && (E.platform = $.current), Od(k.current, N.current, E).then((T) => {
      const I = {
        ...T,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: F.current !== !1
      };
      O.current && !jn(A.current, I) && (A.current = I, wa.flushSync(() => {
        c(I);
      }));
    });
  }, [f, t, n, $, F]);
  $n(() => {
    d === !1 && A.current.isPositioned && (A.current.isPositioned = !1, c((E) => ({
      ...E,
      isPositioned: !1
    })));
  }, [d]);
  const O = p.useRef(!1);
  $n(() => (O.current = !0, () => {
    O.current = !1;
  }), []), $n(() => {
    if (M && (k.current = M), S && (N.current = S), M && S) {
      if (_.current)
        return _.current(M, S, G);
      G();
    }
  }, [M, S, G, _, Y]);
  const P = p.useMemo(() => ({
    reference: k,
    floating: N,
    setReference: x,
    setFloating: w
  }), [x, w]), D = p.useMemo(() => ({
    reference: M,
    floating: S
  }), [M, S]), R = p.useMemo(() => {
    const E = {
      position: n,
      left: 0,
      top: 0
    };
    if (!D.floating)
      return E;
    const T = Qo(D.floating, u.x), I = Qo(D.floating, u.y);
    return i ? {
      ...E,
      transform: "translate(" + T + "px, " + I + "px)",
      ...ja(D.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: T,
      top: I
    };
  }, [n, i, D.floating, u.x, u.y]);
  return p.useMemo(() => ({
    ...u,
    update: G,
    refs: P,
    elements: D,
    floatingStyles: R
  }), [u, G, P, D, R]);
}
const Ad = (e) => {
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
}, Td = (e, t) => ({
  ...kd(e),
  options: [e, t]
}), _d = (e, t) => ({
  ...Cd(e),
  options: [e, t]
}), Id = (e, t) => ({
  ...Nd(e),
  options: [e, t]
}), Wd = (e, t) => ({
  ...Md(e),
  options: [e, t]
}), $d = (e, t) => ({
  ...Sd(e),
  options: [e, t]
}), Fd = (e, t) => ({
  ...Dd(e),
  options: [e, t]
}), Yd = (e, t) => ({
  ...Ad(e),
  options: [e, t]
});
var Bd = "Arrow", Va = p.forwardRef((e, t) => {
  const { children: n, width: r = 10, height: o = 5, ...a } = e;
  return /* @__PURE__ */ v(
    ne.svg,
    {
      ...a,
      ref: t,
      width: r,
      height: o,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? n : /* @__PURE__ */ v("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
Va.displayName = Bd;
var zd = Va;
function Qn(e) {
  const [t, n] = p.useState(void 0);
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
var Zr = "Popper", [Ga, Ua] = ze(Zr), [Ld, qa] = Ga(Zr), Xa = (e) => {
  const { __scopePopper: t, children: n } = e, [r, o] = p.useState(null);
  return /* @__PURE__ */ v(Ld, { scope: t, anchor: r, onAnchorChange: o, children: n });
};
Xa.displayName = Zr;
var Ka = "PopperAnchor", Qa = p.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: r, ...o } = e, a = qa(Ka, n), s = p.useRef(null), i = de(t, s), l = p.useRef(null);
    return p.useEffect(() => {
      const d = l.current;
      l.current = (r == null ? void 0 : r.current) || s.current, d !== l.current && a.onAnchorChange(l.current);
    }), r ? null : /* @__PURE__ */ v(ne.div, { ...o, ref: i });
  }
);
Qa.displayName = Ka;
var Jr = "PopperContent", [Hd, jd] = Ga(Jr), Za = p.forwardRef(
  (e, t) => {
    var ue, Z, me, ae, ge, ve;
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
      onPlaced: y,
      ...h
    } = e, g = qa(Jr, n), [b, x] = p.useState(null), w = de(t, (Se) => x(Se)), [M, S] = p.useState(null), k = Qn(M), N = (k == null ? void 0 : k.width) ?? 0, A = (k == null ? void 0 : k.height) ?? 0, Y = r + (a !== "center" ? "-" + a : ""), _ = typeof u == "number" ? u : { top: 0, right: 0, bottom: 0, left: 0, ...u }, $ = Array.isArray(d) ? d : [d], F = $.length > 0, G = {
      padding: _,
      boundary: $.filter(Gd),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: F
    }, { refs: O, floatingStyles: P, placement: D, isPositioned: R, middlewareData: E } = Rd({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: Y,
      whileElementsMounted: (...Se) => xd(...Se, {
        animationFrame: m === "always"
      }),
      elements: {
        reference: g.anchor
      },
      middleware: [
        Td({ mainAxis: o + A, alignmentAxis: s }),
        l && _d({
          mainAxis: !0,
          crossAxis: !1,
          limiter: c === "partial" ? Id() : void 0,
          ...G
        }),
        l && Wd({ ...G }),
        $d({
          ...G,
          apply: ({ elements: Se, rects: ft, availableWidth: At, availableHeight: Tt }) => {
            const { width: nt, height: _t } = ft.reference, we = Se.floating.style;
            we.setProperty("--radix-popper-available-width", `${At}px`), we.setProperty("--radix-popper-available-height", `${Tt}px`), we.setProperty("--radix-popper-anchor-width", `${nt}px`), we.setProperty("--radix-popper-anchor-height", `${_t}px`);
          }
        }),
        M && Yd({ element: M, padding: i }),
        Ud({ arrowWidth: N, arrowHeight: A }),
        f && Fd({ strategy: "referenceHidden", ...G })
      ]
    }), [T, I] = ts(D), z = Et(y);
    it(() => {
      R && (z == null || z());
    }, [R, z]);
    const ee = (ue = E.arrow) == null ? void 0 : ue.x, B = (Z = E.arrow) == null ? void 0 : Z.y, U = ((me = E.arrow) == null ? void 0 : me.centerOffset) !== 0, [X, ce] = p.useState();
    return it(() => {
      b && ce(window.getComputedStyle(b).zIndex);
    }, [b]), /* @__PURE__ */ v(
      "div",
      {
        ref: O.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...P,
          transform: R ? P.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: X,
          "--radix-popper-transform-origin": [
            (ae = E.transformOrigin) == null ? void 0 : ae.x,
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
        children: /* @__PURE__ */ v(
          Hd,
          {
            scope: n,
            placedSide: T,
            onArrowChange: S,
            arrowX: ee,
            arrowY: B,
            shouldHideArrow: U,
            children: /* @__PURE__ */ v(
              ne.div,
              {
                "data-side": T,
                "data-align": I,
                ...h,
                ref: w,
                style: {
                  ...h.style,
                  // if the PopperContent hasn't been placed yet (not all measurements done)
                  // we prevent animations so that users's animation don't kick in too early referring wrong sides
                  animation: R ? void 0 : "none"
                }
              }
            )
          }
        )
      }
    );
  }
);
Za.displayName = Jr;
var Ja = "PopperArrow", Vd = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, es = p.forwardRef(function(t, n) {
  const { __scopePopper: r, ...o } = t, a = jd(Ja, r), s = Vd[a.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ v(
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
        children: /* @__PURE__ */ v(
          zd,
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
es.displayName = Ja;
function Gd(e) {
  return e !== null;
}
var Ud = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    var g, b, x;
    const { placement: n, rects: r, middlewareData: o } = t, s = ((g = o.arrow) == null ? void 0 : g.centerOffset) !== 0, i = s ? 0 : e.arrowWidth, l = s ? 0 : e.arrowHeight, [d, u] = ts(n), c = { start: "0%", center: "50%", end: "100%" }[u], f = (((b = o.arrow) == null ? void 0 : b.x) ?? 0) + i / 2, m = (((x = o.arrow) == null ? void 0 : x.y) ?? 0) + l / 2;
    let y = "", h = "";
    return d === "bottom" ? (y = s ? c : `${f}px`, h = `${-l}px`) : d === "top" ? (y = s ? c : `${f}px`, h = `${r.floating.height + l}px`) : d === "right" ? (y = `${-l}px`, h = s ? c : `${m}px`) : d === "left" && (y = `${r.floating.width + l}px`, h = s ? c : `${m}px`), { data: { x: y, y: h } };
  }
});
function ts(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var qd = Xa, ns = Qa, Xd = Za, Kd = es, Qd = "Portal", eo = p.forwardRef((e, t) => {
  var i;
  const { container: n, ...r } = e, [o, a] = p.useState(!1);
  it(() => a(!0), []);
  const s = n || o && ((i = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : i.body);
  return s ? xa.createPortal(/* @__PURE__ */ v(ne.div, { ...r, ref: t }), s) : null;
});
eo.displayName = Qd;
function Zd(e, t) {
  return p.useReducer((n, r) => t[n][r] ?? n, e);
}
var dt = (e) => {
  const { present: t, children: n } = e, r = Jd(t), o = typeof n == "function" ? n({ present: r.isPresent }) : p.Children.only(n), a = de(r.ref, eu(o));
  return typeof n == "function" || r.isPresent ? p.cloneElement(o, { ref: a }) : null;
};
dt.displayName = "Presence";
function Jd(e) {
  const [t, n] = p.useState(), r = p.useRef(null), o = p.useRef(e), a = p.useRef("none"), s = e ? "mounted" : "unmounted", [i, l] = Zd(s, {
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
    const d = Rn(r.current);
    a.current = i === "mounted" ? d : "none";
  }, [i]), it(() => {
    const d = r.current, u = o.current;
    if (u !== e) {
      const f = a.current, m = Rn(d);
      e ? l("MOUNT") : m === "none" || (d == null ? void 0 : d.display) === "none" ? l("UNMOUNT") : l(u && f !== m ? "ANIMATION_OUT" : "UNMOUNT"), o.current = e;
    }
  }, [e, l]), it(() => {
    if (t) {
      let d;
      const u = t.ownerDocument.defaultView ?? window, c = (m) => {
        const h = Rn(r.current).includes(CSS.escape(m.animationName));
        if (m.target === t && h && (l("ANIMATION_END"), !o.current)) {
          const g = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", d = u.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = g);
          });
        }
      }, f = (m) => {
        m.target === t && (a.current = Rn(r.current));
      };
      return t.addEventListener("animationstart", f), t.addEventListener("animationcancel", c), t.addEventListener("animationend", c), () => {
        u.clearTimeout(d), t.removeEventListener("animationstart", f), t.removeEventListener("animationcancel", c), t.removeEventListener("animationend", c);
      };
    } else
      l("ANIMATION_END");
  }, [t, l]), {
    isPresent: ["mounted", "unmountSuspended"].includes(i),
    ref: p.useCallback((d) => {
      r.current = d ? getComputedStyle(d) : null, n(d);
    }, [])
  };
}
function Rn(e) {
  return (e == null ? void 0 : e.animationName) || "none";
}
function eu(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var tu = p[" useInsertionEffect ".trim().toString()] || it;
function ut({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: r
}) {
  const [o, a, s] = nu({
    defaultProp: t,
    onChange: n
  }), i = e !== void 0, l = i ? e : o;
  {
    const u = p.useRef(e !== void 0);
    p.useEffect(() => {
      const c = u.current;
      c !== i && console.warn(
        `${r} is changing from ${c ? "controlled" : "uncontrolled"} to ${i ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), u.current = i;
    }, [i, r]);
  }
  const d = p.useCallback(
    (u) => {
      var c;
      if (i) {
        const f = ru(u) ? u(e) : u;
        f !== e && ((c = s.current) == null || c.call(s, f));
      } else
        a(u);
    },
    [i, e, a, s]
  );
  return [l, d];
}
function nu({
  defaultProp: e,
  onChange: t
}) {
  const [n, r] = p.useState(e), o = p.useRef(n), a = p.useRef(t);
  return tu(() => {
    a.current = t;
  }, [t]), p.useEffect(() => {
    var s;
    o.current !== n && ((s = a.current) == null || s.call(a, n), o.current = n);
  }, [n, o]), [n, r, a];
}
function ru(e) {
  return typeof e == "function";
}
var ou = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, $t = /* @__PURE__ */ new WeakMap(), An = /* @__PURE__ */ new WeakMap(), Tn = {}, xr = 0, rs = function(e) {
  return e && (e.host || rs(e.parentNode));
}, au = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var r = rs(n);
    return r && e.contains(r) ? r : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, su = function(e, t, n, r) {
  var o = au(t, Array.isArray(e) ? e : [e]);
  Tn[n] || (Tn[n] = /* @__PURE__ */ new WeakMap());
  var a = Tn[n], s = [], i = /* @__PURE__ */ new Set(), l = new Set(o), d = function(c) {
    !c || i.has(c) || (i.add(c), d(c.parentNode));
  };
  o.forEach(d);
  var u = function(c) {
    !c || l.has(c) || Array.prototype.forEach.call(c.children, function(f) {
      if (i.has(f))
        u(f);
      else
        try {
          var m = f.getAttribute(r), y = m !== null && m !== "false", h = ($t.get(f) || 0) + 1, g = (a.get(f) || 0) + 1;
          $t.set(f, h), a.set(f, g), s.push(f), h === 1 && y && An.set(f, !0), g === 1 && f.setAttribute(n, "true"), y || f.setAttribute(r, "true");
        } catch (b) {
          console.error("aria-hidden: cannot operate on ", f, b);
        }
    });
  };
  return u(t), i.clear(), xr++, function() {
    s.forEach(function(c) {
      var f = $t.get(c) - 1, m = a.get(c) - 1;
      $t.set(c, f), a.set(c, m), f || (An.has(c) || c.removeAttribute(r), An.delete(c)), m || c.removeAttribute(n);
    }), xr--, xr || ($t = /* @__PURE__ */ new WeakMap(), $t = /* @__PURE__ */ new WeakMap(), An = /* @__PURE__ */ new WeakMap(), Tn = {});
  };
}, os = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var r = Array.from(Array.isArray(e) ? e : [e]), o = ou(e);
  return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live], script"))), su(r, o, n, "aria-hidden")) : function() {
    return null;
  };
}, Ge = function() {
  return Ge = Object.assign || function(t) {
    for (var n, r = 1, o = arguments.length; r < o; r++) {
      n = arguments[r];
      for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (t[a] = n[a]);
    }
    return t;
  }, Ge.apply(this, arguments);
};
function as(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  return n;
}
function iu(e, t, n) {
  if (n || arguments.length === 2) for (var r = 0, o = t.length, a; r < o; r++)
    (a || !(r in t)) && (a || (a = Array.prototype.slice.call(t, 0, r)), a[r] = t[r]);
  return e.concat(a || Array.prototype.slice.call(t));
}
var Fn = "right-scroll-bar-position", Yn = "width-before-scroll-bar", cu = "with-scroll-bars-hidden", lu = "--removed-body-scroll-bar-size";
function kr(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function du(e, t) {
  var n = Ee(function() {
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
var uu = typeof window < "u" ? p.useLayoutEffect : p.useEffect, Zo = /* @__PURE__ */ new WeakMap();
function fu(e, t) {
  var n = du(null, function(r) {
    return e.forEach(function(o) {
      return kr(o, r);
    });
  });
  return uu(function() {
    var r = Zo.get(n);
    if (r) {
      var o = new Set(r), a = new Set(e), s = n.current;
      o.forEach(function(i) {
        a.has(i) || kr(i, null);
      }), a.forEach(function(i) {
        o.has(i) || kr(i, s);
      });
    }
    Zo.set(n, e);
  }, [e]), n;
}
function mu(e) {
  return e;
}
function hu(e, t) {
  t === void 0 && (t = mu);
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
function pu(e) {
  e === void 0 && (e = {});
  var t = hu(null);
  return t.options = Ge({ async: !0, ssr: !1 }, e), t;
}
var ss = function(e) {
  var t = e.sideCar, n = as(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = t.read();
  if (!r)
    throw new Error("Sidecar medium not found");
  return p.createElement(r, Ge({}, n));
};
ss.isSideCarExport = !0;
function gu(e, t) {
  return e.useMedium(t), ss;
}
var is = pu(), Cr = function() {
}, Zn = p.forwardRef(function(e, t) {
  var n = p.useRef(null), r = p.useState({
    onScrollCapture: Cr,
    onWheelCapture: Cr,
    onTouchMoveCapture: Cr
  }), o = r[0], a = r[1], s = e.forwardProps, i = e.children, l = e.className, d = e.removeScrollBar, u = e.enabled, c = e.shards, f = e.sideCar, m = e.noRelative, y = e.noIsolation, h = e.inert, g = e.allowPinchZoom, b = e.as, x = b === void 0 ? "div" : b, w = e.gapMode, M = as(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), S = f, k = fu([n, t]), N = Ge(Ge({}, M), o);
  return p.createElement(
    p.Fragment,
    null,
    u && p.createElement(S, { sideCar: is, removeScrollBar: d, shards: c, noRelative: m, noIsolation: y, inert: h, setCallbacks: a, allowPinchZoom: !!g, lockRef: n, gapMode: w }),
    s ? p.cloneElement(p.Children.only(i), Ge(Ge({}, N), { ref: k })) : p.createElement(x, Ge({}, N, { className: l, ref: k }), i)
  );
});
Zn.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
Zn.classNames = {
  fullWidth: Yn,
  zeroRight: Fn
};
var bu = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function vu() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = bu();
  return t && e.setAttribute("nonce", t), e;
}
function yu(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function wu(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var xu = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = vu()) && (yu(t, n), wu(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, ku = function() {
  var e = xu();
  return function(t, n) {
    p.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, cs = function() {
  var e = ku(), t = function(n) {
    var r = n.styles, o = n.dynamic;
    return e(r, o), null;
  };
  return t;
}, Cu = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, Mr = function(e) {
  return parseInt(e || "", 10) || 0;
}, Mu = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [Mr(n), Mr(r), Mr(o)];
}, Su = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return Cu;
  var t = Mu(e), n = document.documentElement.clientWidth, r = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, r - n + t[2] - t[0])
  };
}, Du = cs(), Gt = "data-scroll-locked", Nu = function(e, t, n, r) {
  var o = e.left, a = e.top, s = e.right, i = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(cu, ` {
   overflow: hidden `).concat(r, `;
   padding-right: `).concat(i, "px ").concat(r, `;
  }
  body[`).concat(Gt, `] {
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
  
  .`).concat(Fn, ` {
    right: `).concat(i, "px ").concat(r, `;
  }
  
  .`).concat(Yn, ` {
    margin-right: `).concat(i, "px ").concat(r, `;
  }
  
  .`).concat(Fn, " .").concat(Fn, ` {
    right: 0 `).concat(r, `;
  }
  
  .`).concat(Yn, " .").concat(Yn, ` {
    margin-right: 0 `).concat(r, `;
  }
  
  body[`).concat(Gt, `] {
    `).concat(lu, ": ").concat(i, `px;
  }
`);
}, Jo = function() {
  var e = parseInt(document.body.getAttribute(Gt) || "0", 10);
  return isFinite(e) ? e : 0;
}, Ou = function() {
  p.useEffect(function() {
    return document.body.setAttribute(Gt, (Jo() + 1).toString()), function() {
      var e = Jo() - 1;
      e <= 0 ? document.body.removeAttribute(Gt) : document.body.setAttribute(Gt, e.toString());
    };
  }, []);
}, Eu = function(e) {
  var t = e.noRelative, n = e.noImportant, r = e.gapMode, o = r === void 0 ? "margin" : r;
  Ou();
  var a = p.useMemo(function() {
    return Su(o);
  }, [o]);
  return p.createElement(Du, { styles: Nu(a, !t, o, n ? "" : "!important") });
}, $r = !1;
if (typeof window < "u")
  try {
    var _n = Object.defineProperty({}, "passive", {
      get: function() {
        return $r = !0, !0;
      }
    });
    window.addEventListener("test", _n, _n), window.removeEventListener("test", _n, _n);
  } catch {
    $r = !1;
  }
var Ft = $r ? { passive: !1 } : !1, Pu = function(e) {
  return e.tagName === "TEXTAREA";
}, ls = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !Pu(e) && n[t] === "visible")
  );
}, Ru = function(e) {
  return ls(e, "overflowY");
}, Au = function(e) {
  return ls(e, "overflowX");
}, ea = function(e, t) {
  var n = t.ownerDocument, r = t;
  do {
    typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
    var o = ds(e, r);
    if (o) {
      var a = us(e, r), s = a[1], i = a[2];
      if (s > i)
        return !0;
    }
    r = r.parentNode;
  } while (r && r !== n.body);
  return !1;
}, Tu = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, r = e.clientHeight;
  return [
    t,
    n,
    r
  ];
}, _u = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, r = e.clientWidth;
  return [
    t,
    n,
    r
  ];
}, ds = function(e, t) {
  return e === "v" ? Ru(t) : Au(t);
}, us = function(e, t) {
  return e === "v" ? Tu(t) : _u(t);
}, Iu = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, Wu = function(e, t, n, r, o) {
  var a = Iu(e, window.getComputedStyle(t).direction), s = a * r, i = n.target, l = t.contains(i), d = !1, u = s > 0, c = 0, f = 0;
  do {
    if (!i)
      break;
    var m = us(e, i), y = m[0], h = m[1], g = m[2], b = h - g - a * y;
    (y || b) && ds(e, i) && (c += b, f += y);
    var x = i.parentNode;
    i = x && x.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? x.host : x;
  } while (
    // portaled content
    !l && i !== document.body || // self content
    l && (t.contains(i) || t === i)
  );
  return (u && Math.abs(c) < 1 || !u && Math.abs(f) < 1) && (d = !0), d;
}, In = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, ta = function(e) {
  return [e.deltaX, e.deltaY];
}, na = function(e) {
  return e && "current" in e ? e.current : e;
}, $u = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, Fu = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, Yu = 0, Yt = [];
function Bu(e) {
  var t = p.useRef([]), n = p.useRef([0, 0]), r = p.useRef(), o = p.useState(Yu++)[0], a = p.useState(cs)[0], s = p.useRef(e);
  p.useEffect(function() {
    s.current = e;
  }, [e]), p.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var h = iu([e.lockRef.current], (e.shards || []).map(na), !0).filter(Boolean);
      return h.forEach(function(g) {
        return g.classList.add("allow-interactivity-".concat(o));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(o)), h.forEach(function(g) {
          return g.classList.remove("allow-interactivity-".concat(o));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var i = p.useCallback(function(h, g) {
    if ("touches" in h && h.touches.length === 2 || h.type === "wheel" && h.ctrlKey)
      return !s.current.allowPinchZoom;
    var b = In(h), x = n.current, w = "deltaX" in h ? h.deltaX : x[0] - b[0], M = "deltaY" in h ? h.deltaY : x[1] - b[1], S, k = h.target, N = Math.abs(w) > Math.abs(M) ? "h" : "v";
    if ("touches" in h && N === "h" && k.type === "range")
      return !1;
    var A = ea(N, k);
    if (!A)
      return !0;
    if (A ? S = N : (S = N === "v" ? "h" : "v", A = ea(N, k)), !A)
      return !1;
    if (!r.current && "changedTouches" in h && (w || M) && (r.current = S), !S)
      return !0;
    var Y = r.current || S;
    return Wu(Y, g, h, Y === "h" ? w : M);
  }, []), l = p.useCallback(function(h) {
    var g = h;
    if (!(!Yt.length || Yt[Yt.length - 1] !== a)) {
      var b = "deltaY" in g ? ta(g) : In(g), x = t.current.filter(function(S) {
        return S.name === g.type && (S.target === g.target || g.target === S.shadowParent) && $u(S.delta, b);
      })[0];
      if (x && x.should) {
        g.cancelable && g.preventDefault();
        return;
      }
      if (!x) {
        var w = (s.current.shards || []).map(na).filter(Boolean).filter(function(S) {
          return S.contains(g.target);
        }), M = w.length > 0 ? i(g, w[0]) : !s.current.noIsolation;
        M && g.cancelable && g.preventDefault();
      }
    }
  }, []), d = p.useCallback(function(h, g, b, x) {
    var w = { name: h, delta: g, target: b, should: x, shadowParent: zu(b) };
    t.current.push(w), setTimeout(function() {
      t.current = t.current.filter(function(M) {
        return M !== w;
      });
    }, 1);
  }, []), u = p.useCallback(function(h) {
    n.current = In(h), r.current = void 0;
  }, []), c = p.useCallback(function(h) {
    d(h.type, ta(h), h.target, i(h, e.lockRef.current));
  }, []), f = p.useCallback(function(h) {
    d(h.type, In(h), h.target, i(h, e.lockRef.current));
  }, []);
  p.useEffect(function() {
    return Yt.push(a), e.setCallbacks({
      onScrollCapture: c,
      onWheelCapture: c,
      onTouchMoveCapture: f
    }), document.addEventListener("wheel", l, Ft), document.addEventListener("touchmove", l, Ft), document.addEventListener("touchstart", u, Ft), function() {
      Yt = Yt.filter(function(h) {
        return h !== a;
      }), document.removeEventListener("wheel", l, Ft), document.removeEventListener("touchmove", l, Ft), document.removeEventListener("touchstart", u, Ft);
    };
  }, []);
  var m = e.removeScrollBar, y = e.inert;
  return p.createElement(
    p.Fragment,
    null,
    y ? p.createElement(a, { styles: Fu(o) }) : null,
    m ? p.createElement(Eu, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function zu(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const Lu = gu(is, Bu);
var to = p.forwardRef(function(e, t) {
  return p.createElement(Zn, Ge({}, e, { ref: t, sideCar: Lu }));
});
to.classNames = Zn.classNames;
var Jn = "Popover", [fs] = ze(Jn, [
  Ua
]), yn = Ua(), [Hu, Mt] = fs(Jn), ms = (e) => {
  const {
    __scopePopover: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: a,
    modal: s = !1
  } = e, i = yn(t), l = p.useRef(null), [d, u] = p.useState(!1), [c, f] = ut({
    prop: r,
    defaultProp: o ?? !1,
    onChange: a,
    caller: Jn
  });
  return /* @__PURE__ */ v(qd, { ...i, children: /* @__PURE__ */ v(
    Hu,
    {
      scope: t,
      contentId: Ot(),
      triggerRef: l,
      open: c,
      onOpenChange: f,
      onOpenToggle: p.useCallback(() => f((m) => !m), [f]),
      hasCustomAnchor: d,
      onCustomAnchorAdd: p.useCallback(() => u(!0), []),
      onCustomAnchorRemove: p.useCallback(() => u(!1), []),
      modal: s,
      children: n
    }
  ) });
};
ms.displayName = Jn;
var hs = "PopoverAnchor", ju = p.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = Mt(hs, n), a = yn(n), { onCustomAnchorAdd: s, onCustomAnchorRemove: i } = o;
    return p.useEffect(() => (s(), () => i()), [s, i]), /* @__PURE__ */ v(ns, { ...a, ...r, ref: t });
  }
);
ju.displayName = hs;
var ps = "PopoverTrigger", gs = p.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = Mt(ps, n), a = yn(n), s = de(t, o.triggerRef), i = /* @__PURE__ */ v(
      ne.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": o.open,
        "aria-controls": o.contentId,
        "data-state": xs(o.open),
        ...r,
        ref: s,
        onClick: se(e.onClick, o.onOpenToggle)
      }
    );
    return o.hasCustomAnchor ? i : /* @__PURE__ */ v(ns, { asChild: !0, ...a, children: i });
  }
);
gs.displayName = ps;
var no = "PopoverPortal", [Vu, Gu] = fs(no, {
  forceMount: void 0
}), bs = (e) => {
  const { __scopePopover: t, forceMount: n, children: r, container: o } = e, a = Mt(no, t);
  return /* @__PURE__ */ v(Vu, { scope: t, forceMount: n, children: /* @__PURE__ */ v(dt, { present: n || a.open, children: /* @__PURE__ */ v(eo, { asChild: !0, container: o, children: r }) }) });
};
bs.displayName = no;
var Xt = "PopoverContent", vs = p.forwardRef(
  (e, t) => {
    const n = Gu(Xt, e.__scopePopover), { forceMount: r = n.forceMount, ...o } = e, a = Mt(Xt, e.__scopePopover);
    return /* @__PURE__ */ v(dt, { present: r || a.open, children: a.modal ? /* @__PURE__ */ v(qu, { ...o, ref: t }) : /* @__PURE__ */ v(Xu, { ...o, ref: t }) });
  }
);
vs.displayName = Xt;
var Uu = /* @__PURE__ */ mn("PopoverContent.RemoveScroll"), qu = p.forwardRef(
  (e, t) => {
    const n = Mt(Xt, e.__scopePopover), r = p.useRef(null), o = de(t, r), a = p.useRef(!1);
    return p.useEffect(() => {
      const s = r.current;
      if (s) return os(s);
    }, []), /* @__PURE__ */ v(to, { as: Uu, allowPinchZoom: !0, children: /* @__PURE__ */ v(
      ys,
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
), Xu = p.forwardRef(
  (e, t) => {
    const n = Mt(Xt, e.__scopePopover), r = p.useRef(!1), o = p.useRef(!1);
    return /* @__PURE__ */ v(
      ys,
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
), ys = p.forwardRef(
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
    } = e, f = Mt(Xt, n), m = yn(n);
    return Aa(), /* @__PURE__ */ v(
      Vr,
      {
        asChild: !0,
        loop: !0,
        trapped: r,
        onMountAutoFocus: o,
        onUnmountAutoFocus: a,
        children: /* @__PURE__ */ v(
          jr,
          {
            asChild: !0,
            disableOutsidePointerEvents: s,
            onInteractOutside: u,
            onEscapeKeyDown: i,
            onPointerDownOutside: l,
            onFocusOutside: d,
            onDismiss: () => f.onOpenChange(!1),
            children: /* @__PURE__ */ v(
              Xd,
              {
                "data-state": xs(f.open),
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
), ws = "PopoverClose", Ku = p.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = Mt(ws, n);
    return /* @__PURE__ */ v(
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
Ku.displayName = ws;
var Qu = "PopoverArrow", Zu = p.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = yn(n);
    return /* @__PURE__ */ v(Kd, { ...o, ...r, ref: t });
  }
);
Zu.displayName = Qu;
function xs(e) {
  return e ? "open" : "closed";
}
var ro = ms, oo = gs, ao = bs, er = vs;
const cv = ro, lv = oo, Ju = Ct(({ className: e, align: t = "end", sideOffset: n = 8, ...r }, o) => /* @__PURE__ */ v(ao, { children: /* @__PURE__ */ v(
  er,
  {
    ref: o,
    align: t,
    sideOffset: n,
    className: W(
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
Ju.displayName = er.displayName;
const ef = Be(
  W(
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
), tf = Ct(
  ({ className: e, variant: t, icon: n, children: r, ...o }, a) => /* @__PURE__ */ Q(
    "button",
    {
      ref: a,
      className: W(ef({ variant: t }), e),
      ...o,
      children: [
        n && /* @__PURE__ */ v("span", { className: "shrink-0", children: n }),
        r
      ]
    }
  )
);
tf.displayName = "PopoverMenuItem";
const nf = Be("cms-font-pretendard cms-text-black", {
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
}), rf = C.forwardRef(
  ({
    className: e,
    variant: t,
    align: n,
    decoration: r,
    as: o = "p",
    children: a,
    ...s
  }, i) => /* @__PURE__ */ v(
    o,
    {
      className: W(nf({ variant: t, align: n, decoration: r }), e),
      ref: i,
      ...s,
      children: a
    }
  )
);
rf.displayName = "Text";
const of = Be(
  W(
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
        default: W(
          "bg-cms-white ",
          "border-cms-gray-450",
          "focus:border-cms-gray-800",
          "disabled:bg-cms-gray-150",
          "disabled:text-cms-gray-400",
          "disabled:cursor-not-allowed"
        ),
        error: W(
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
), af = Be("block text-sm font-medium text-cms-black"), sf = Be(
  "block text-sm font-medium text-cms-red-400 mt-1"
), cf = Be(
  "block text-sm font-normal text-cms-gray-700 mt-1"
), lf = C.forwardRef(
  ({
    className: e,
    variant: t,
    fullWidth: n,
    label: r,
    error: o,
    errorMessage: a,
    helperText: s,
    showCharCount: i,
    maxLength: l,
    value: d,
    defaultValue: u,
    onChange: c,
    id: f,
    ...m
  }, y) => {
    const [h, g] = C.useState(
      d || u || ""
    ), b = f || `input-${Math.random().toString(36).substr(2, 9)}`, x = o ? "error" : t, w = d !== void 0 ? d : h, M = (w == null ? void 0 : w.length) || 0, S = (N) => {
      d === void 0 && g(N.target.value), c == null || c(N);
    }, k = r || i && l;
    return /* @__PURE__ */ Q("div", { className: W("w-full", !n && "w-auto"), children: [
      k && /* @__PURE__ */ Q("div", { className: "flex justify-between items-center mb-2", children: [
        r ? /* @__PURE__ */ v("label", { htmlFor: b, className: af(), children: r }) : /* @__PURE__ */ v("div", {}),
        i && l && /* @__PURE__ */ Q("span", { className: "text-sm text-cms-gray-600", children: [
          M,
          " / ",
          l
        ] })
      ] }),
      /* @__PURE__ */ v(
        "input",
        {
          id: b,
          ref: y,
          className: W(
            of({ variant: x, fullWidth: n }),
            e
          ),
          maxLength: l,
          value: d,
          defaultValue: u,
          onChange: S,
          ...m
        }
      ),
      o && a && /* @__PURE__ */ v("span", { className: sf(), children: a }),
      !o && s && /* @__PURE__ */ v("span", { className: cf(), children: s })
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
const Sr = {}, dn = {};
function Nt(e, t) {
  try {
    const r = (Sr[e] || (Sr[e] = new Intl.DateTimeFormat("en-US", {
      timeZone: e,
      timeZoneName: "longOffset"
    }).format))(t).split("GMT")[1];
    return r in dn ? dn[r] : ra(r, r.split(":"));
  } catch {
    if (e in dn) return dn[e];
    const n = e == null ? void 0 : e.match(uf);
    return n ? ra(e, n.slice(1)) : NaN;
  }
}
const uf = /([+-]\d\d):?(\d\d)?/;
function ra(e, t) {
  const n = +(t[0] || 0), r = +(t[1] || 0), o = +(t[2] || 0) / 60;
  return dn[e] = n * 60 + r > 0 ? n * 60 + r + o : n * 60 - r - o;
}
class Ke extends Date {
  //#region static
  constructor(...t) {
    super(), t.length > 1 && typeof t[t.length - 1] == "string" && (this.timeZone = t.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(Nt(this.timeZone, this)) ? this.setTime(NaN) : t.length ? typeof t[0] == "number" && (t.length === 1 || t.length === 2 && typeof t[1] != "number") ? this.setTime(t[0]) : typeof t[0] == "string" ? this.setTime(+new Date(t[0])) : t[0] instanceof Date ? this.setTime(+t[0]) : (this.setTime(+new Date(...t)), ks(this), Fr(this)) : this.setTime(Date.now());
  }
  static tz(t, ...n) {
    return n.length ? new Ke(...n, t) : new Ke(Date.now(), t);
  }
  //#endregion
  //#region time zone
  withTimeZone(t) {
    return new Ke(+this, t);
  }
  getTimezoneOffset() {
    const t = -Nt(this.timeZone, this);
    return t > 0 ? Math.floor(t) : Math.ceil(t);
  }
  //#endregion
  //#region time
  setTime(t) {
    return Date.prototype.setTime.apply(this, arguments), Fr(this), +this;
  }
  //#endregion
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new Ke(+new Date(t), this.timeZone);
  }
  //#endregion
}
const oa = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
  if (!oa.test(e)) return;
  const t = e.replace(oa, "$1UTC");
  Ke.prototype[t] && (e.startsWith("get") ? Ke.prototype[e] = function() {
    return this.internal[t]();
  } : (Ke.prototype[e] = function() {
    return Date.prototype[t].apply(this.internal, arguments), ff(this), +this;
  }, Ke.prototype[t] = function() {
    return Date.prototype[t].apply(this, arguments), Fr(this), +this;
  }));
});
function Fr(e) {
  e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - Math.round(-Nt(e.timeZone, e) * 60));
}
function ff(e) {
  Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), ks(e);
}
function ks(e) {
  const t = Nt(e.timeZone, e), n = t > 0 ? Math.floor(t) : Math.ceil(t), r = /* @__PURE__ */ new Date(+e);
  r.setUTCHours(r.getUTCHours() - 1);
  const o = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), a = -(/* @__PURE__ */ new Date(+r)).getTimezoneOffset(), s = o - a, i = Date.prototype.getHours.apply(e) !== e.internal.getUTCHours();
  s && i && e.internal.setUTCMinutes(e.internal.getUTCMinutes() + s);
  const l = o - n;
  l && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + l);
  const d = /* @__PURE__ */ new Date(+e);
  d.setUTCSeconds(0);
  const u = o > 0 ? d.getSeconds() : (d.getSeconds() - 60) % 60, c = Math.round(-(Nt(e.timeZone, e) * 60)) % 60;
  (c || u) && (e.internal.setUTCSeconds(e.internal.getUTCSeconds() + c), Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + c + u));
  const f = Nt(e.timeZone, e), m = f > 0 ? Math.floor(f) : Math.ceil(f), h = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - m, g = m !== n, b = h - l;
  if (g && b) {
    Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + b);
    const x = Nt(e.timeZone, e), w = x > 0 ? Math.floor(x) : Math.ceil(x), M = m - w;
    M && (e.internal.setUTCMinutes(e.internal.getUTCMinutes() + M), Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + M));
  }
}
class ke extends Ke {
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
    return new ke(+this, t);
  }
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new ke(+new Date(t), this.timeZone);
  }
  //#endregion
}
const Cs = 6048e5, mf = 864e5, aa = Symbol.for("constructDateFrom");
function pe(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && aa in e ? e[aa](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function oe(e, t) {
  return pe(t || e, e);
}
function Ms(e, t, n) {
  const r = oe(e, n == null ? void 0 : n.in);
  return isNaN(t) ? pe(e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
function Ss(e, t, n) {
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
function wn() {
  return hf;
}
function Kt(e, t) {
  var i, l, d, u;
  const n = wn(), r = (t == null ? void 0 : t.weekStartsOn) ?? ((l = (i = t == null ? void 0 : t.locale) == null ? void 0 : i.options) == null ? void 0 : l.weekStartsOn) ?? n.weekStartsOn ?? ((u = (d = n.locale) == null ? void 0 : d.options) == null ? void 0 : u.weekStartsOn) ?? 0, o = oe(e, t == null ? void 0 : t.in), a = o.getDay(), s = (a < r ? 7 : 0) + a - r;
  return o.setDate(o.getDate() - s), o.setHours(0, 0, 0, 0), o;
}
function gn(e, t) {
  return Kt(e, { ...t, weekStartsOn: 1 });
}
function Ds(e, t) {
  const n = oe(e, t == null ? void 0 : t.in), r = n.getFullYear(), o = pe(n, 0);
  o.setFullYear(r + 1, 0, 4), o.setHours(0, 0, 0, 0);
  const a = gn(o), s = pe(n, 0);
  s.setFullYear(r, 0, 4), s.setHours(0, 0, 0, 0);
  const i = gn(s);
  return n.getTime() >= a.getTime() ? r + 1 : n.getTime() >= i.getTime() ? r : r - 1;
}
function sa(e) {
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
function en(e, ...t) {
  const n = pe.bind(
    null,
    t.find((r) => typeof r == "object")
  );
  return t.map(n);
}
function bn(e, t) {
  const n = oe(e, t == null ? void 0 : t.in);
  return n.setHours(0, 0, 0, 0), n;
}
function so(e, t, n) {
  const [r, o] = en(
    n == null ? void 0 : n.in,
    e,
    t
  ), a = bn(r), s = bn(o), i = +a - sa(a), l = +s - sa(s);
  return Math.round((i - l) / mf);
}
function pf(e, t) {
  const n = Ds(e, t), r = pe(e, 0);
  return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), gn(r);
}
function gf(e, t, n) {
  return Ms(e, t * 7, n);
}
function bf(e, t, n) {
  return Ss(e, t * 12, n);
}
function vf(e, t) {
  let n, r = t == null ? void 0 : t.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = pe.bind(null, o));
    const a = oe(o, r);
    (!n || n < a || isNaN(+a)) && (n = a);
  }), pe(r, n || NaN);
}
function yf(e, t) {
  let n, r = t == null ? void 0 : t.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = pe.bind(null, o));
    const a = oe(o, r);
    (!n || n > a || isNaN(+a)) && (n = a);
  }), pe(r, n || NaN);
}
function wf(e, t, n) {
  const [r, o] = en(
    n == null ? void 0 : n.in,
    e,
    t
  );
  return +bn(r) == +bn(o);
}
function Ns(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function xf(e) {
  return !(!Ns(e) && typeof e != "number" || isNaN(+oe(e)));
}
function Os(e, t, n) {
  const [r, o] = en(
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
function Es(e, t) {
  const [n, r] = en(e, t.start, t.end);
  return { start: n, end: r };
}
function Cf(e, t) {
  const { start: n, end: r } = Es(t == null ? void 0 : t.in, e);
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
function Ps(e, t) {
  const n = oe(e, t == null ? void 0 : t.in);
  return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function Df(e, t) {
  const { start: n, end: r } = Es(t == null ? void 0 : t.in, e);
  let o = +n > +r;
  const a = o ? +n : +r, s = o ? r : n;
  s.setHours(0, 0, 0, 0), s.setMonth(0, 1);
  let i = 1;
  const l = [];
  for (; +s <= a; )
    l.push(pe(n, s)), s.setFullYear(s.getFullYear() + i);
  return o ? l.reverse() : l;
}
function Rs(e, t) {
  var i, l, d, u;
  const n = wn(), r = (t == null ? void 0 : t.weekStartsOn) ?? ((l = (i = t == null ? void 0 : t.locale) == null ? void 0 : i.options) == null ? void 0 : l.weekStartsOn) ?? n.weekStartsOn ?? ((u = (d = n.locale) == null ? void 0 : d.options) == null ? void 0 : u.weekStartsOn) ?? 0, o = oe(e, t == null ? void 0 : t.in), a = o.getDay(), s = (a < r ? -7 : 0) + 6 - (a - r);
  return o.setDate(o.getDate() + s), o.setHours(23, 59, 59, 999), o;
}
function Nf(e, t) {
  return Rs(e, { ...t, weekStartsOn: 1 });
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
function Ut(e) {
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
  date: Ut({
    formats: Pf,
    defaultWidth: "full"
  }),
  time: Ut({
    formats: Rf,
    defaultWidth: "full"
  }),
  dateTime: Ut({
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
function Ue(e) {
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
}, Lf = (e, t) => {
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
}, Hf = {
  ordinalNumber: Lf,
  era: Ue({
    values: Wf,
    defaultWidth: "wide"
  }),
  quarter: Ue({
    values: $f,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: Ue({
    values: Ff,
    defaultWidth: "wide"
  }),
  day: Ue({
    values: Yf,
    defaultWidth: "wide"
  }),
  dayPeriod: Ue({
    values: Bf,
    defaultWidth: "wide",
    formattingValues: zf,
    defaultFormattingWidth: "wide"
  })
};
function qe(e) {
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
function As(e) {
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
  ordinalNumber: As({
    matchPattern: Gf,
    parsePattern: Uf,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: qe({
    matchPatterns: qf,
    defaultMatchWidth: "wide",
    parsePatterns: Xf,
    defaultParseWidth: "any"
  }),
  quarter: qe({
    matchPatterns: Kf,
    defaultMatchWidth: "wide",
    parsePatterns: Qf,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: qe({
    matchPatterns: Zf,
    defaultMatchWidth: "wide",
    parsePatterns: Jf,
    defaultParseWidth: "any"
  }),
  day: qe({
    matchPatterns: em,
    defaultMatchWidth: "wide",
    parsePatterns: tm,
    defaultParseWidth: "any"
  }),
  dayPeriod: qe({
    matchPatterns: nm,
    defaultMatchWidth: "any",
    parsePatterns: rm,
    defaultParseWidth: "any"
  })
}, Lt = {
  code: "en-US",
  formatDistance: Ef,
  formatLong: Tf,
  formatRelative: If,
  localize: Hf,
  match: om,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function am(e, t) {
  const n = oe(e, t == null ? void 0 : t.in);
  return so(n, Ps(n)) + 1;
}
function io(e, t) {
  const n = oe(e, t == null ? void 0 : t.in), r = +gn(n) - +pf(n);
  return Math.round(r / Cs) + 1;
}
function Ts(e, t) {
  var u, c, f, m;
  const n = oe(e, t == null ? void 0 : t.in), r = n.getFullYear(), o = wn(), a = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((c = (u = t == null ? void 0 : t.locale) == null ? void 0 : u.options) == null ? void 0 : c.firstWeekContainsDate) ?? o.firstWeekContainsDate ?? ((m = (f = o.locale) == null ? void 0 : f.options) == null ? void 0 : m.firstWeekContainsDate) ?? 1, s = pe((t == null ? void 0 : t.in) || e, 0);
  s.setFullYear(r + 1, 0, a), s.setHours(0, 0, 0, 0);
  const i = Kt(s, t), l = pe((t == null ? void 0 : t.in) || e, 0);
  l.setFullYear(r, 0, a), l.setHours(0, 0, 0, 0);
  const d = Kt(l, t);
  return +n >= +i ? r + 1 : +n >= +d ? r : r - 1;
}
function sm(e, t) {
  var i, l, d, u;
  const n = wn(), r = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((l = (i = t == null ? void 0 : t.locale) == null ? void 0 : i.options) == null ? void 0 : l.firstWeekContainsDate) ?? n.firstWeekContainsDate ?? ((u = (d = n.locale) == null ? void 0 : d.options) == null ? void 0 : u.firstWeekContainsDate) ?? 1, o = Ts(e, t), a = pe((t == null ? void 0 : t.in) || e, 0);
  return a.setFullYear(o, 0, r), a.setHours(0, 0, 0, 0), Kt(a, t);
}
function co(e, t) {
  const n = oe(e, t == null ? void 0 : t.in), r = +Kt(n, t) - +sm(n, t);
  return Math.round(r / Cs) + 1;
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
}, Bt = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, ia = {
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
    const o = Ts(e, r), a = o > 0 ? o : 1 - o;
    if (t === "YY") {
      const s = a % 100;
      return re(s, 2);
    }
    return t === "Yo" ? n.ordinalNumber(a, { unit: "year" }) : re(a, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const n = Ds(e);
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
    switch (r === 12 ? o = Bt.noon : r === 0 ? o = Bt.midnight : o = r / 12 >= 1 ? "pm" : "am", t) {
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
    switch (r >= 17 ? o = Bt.evening : r >= 12 ? o = Bt.afternoon : r >= 4 ? o = Bt.morning : o = Bt.night, t) {
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
        return la(r);
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
        return la(r);
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
        return "GMT" + ca(r, ":");
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
        return "GMT" + ca(r, ":");
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
function ca(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = Math.trunc(r / 60), a = r % 60;
  return a === 0 ? n + String(o) : n + String(o) + t + re(a, 2);
}
function la(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + re(Math.abs(e) / 60, 2) : Dt(e, t);
}
function Dt(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = re(Math.trunc(r / 60), 2), a = re(r % 60, 2);
  return n + o + t + a;
}
const da = (e, t) => {
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
}, _s = (e, t) => {
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
    return da(e, t);
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
  return a.replace("{{date}}", da(r, t)).replace("{{time}}", _s(o, t));
}, cm = {
  p: _s,
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
const gm = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, bm = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, vm = /^'([^]*?)'?$/, ym = /''/g, wm = /[a-zA-Z]/;
function un(e, t, n) {
  var u, c, f, m, y, h, g, b;
  const r = wn(), o = (n == null ? void 0 : n.locale) ?? r.locale ?? Lt, a = (n == null ? void 0 : n.firstWeekContainsDate) ?? ((c = (u = n == null ? void 0 : n.locale) == null ? void 0 : u.options) == null ? void 0 : c.firstWeekContainsDate) ?? r.firstWeekContainsDate ?? ((m = (f = r.locale) == null ? void 0 : f.options) == null ? void 0 : m.firstWeekContainsDate) ?? 1, s = (n == null ? void 0 : n.weekStartsOn) ?? ((h = (y = n == null ? void 0 : n.locale) == null ? void 0 : y.options) == null ? void 0 : h.weekStartsOn) ?? r.weekStartsOn ?? ((b = (g = r.locale) == null ? void 0 : g.options) == null ? void 0 : b.weekStartsOn) ?? 0, i = oe(e, n == null ? void 0 : n.in);
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
    if (ia[w])
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
    const M = ia[w[0]];
    return M(i, w, o.localize, d);
  }).join("");
}
function xm(e) {
  const t = e.match(vm);
  return t ? t[1].replace(ym, "'") : e;
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
function Dm(e, t) {
  return +oe(e) < +oe(t);
}
function Nm(e, t, n) {
  const [r, o] = en(
    n == null ? void 0 : n.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear() && r.getMonth() === o.getMonth();
}
function Om(e, t, n) {
  const [r, o] = en(
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
const ua = 5, Rm = 4;
function Am(e, t) {
  const n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, o = t.addDays(e, -r + 1), a = t.addDays(o, ua * 7 - 1);
  return t.getMonth(e) === t.getMonth(a) ? ua : Rm;
}
function Is(e, t) {
  const n = t.startOfMonth(e), r = n.getDay();
  return r === 1 ? n : r === 0 ? t.addDays(n, -1 * 6) : t.addDays(n, -1 * (r - 1));
}
function Tm(e, t) {
  const n = Is(e, t), r = Am(e, t);
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
  date: Ut({
    formats: Wm,
    defaultWidth: "full"
  }),
  time: Ut({
    formats: $m,
    defaultWidth: "full"
  }),
  dateTime: Ut({
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
}, zm = (e, t, n, r) => Bm[e], Lm = {
  narrow: ["BC", "AD"],
  abbreviated: ["BC", "AD"],
  wide: ["기원전", "서기"]
}, Hm = {
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
  era: Ue({
    values: Lm,
    defaultWidth: "wide"
  }),
  quarter: Ue({
    values: Hm,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: Ue({
    values: jm,
    defaultWidth: "wide"
  }),
  day: Ue({
    values: Vm,
    defaultWidth: "wide"
  }),
  dayPeriod: Ue({
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
  ordinalNumber: As({
    matchPattern: Km,
    parsePattern: Qm,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: qe({
    matchPatterns: Zm,
    defaultMatchWidth: "wide",
    parsePatterns: Jm,
    defaultParseWidth: "any"
  }),
  quarter: qe({
    matchPatterns: eh,
    defaultMatchWidth: "wide",
    parsePatterns: th,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: qe({
    matchPatterns: nh,
    defaultMatchWidth: "wide",
    parsePatterns: rh,
    defaultParseWidth: "any"
  }),
  day: qe({
    matchPatterns: oh,
    defaultMatchWidth: "wide",
    parsePatterns: ah,
    defaultParseWidth: "any"
  }),
  dayPeriod: qe({
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
}, Ws = {
  ...Lt,
  labels: {
    labelDayButton: (e, t, n, r) => {
      let o;
      r && typeof r.format == "function" ? o = r.format.bind(r) : o = (s, i) => un(s, i, { locale: Lt, ...n });
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
      return n && typeof n.format == "function" ? r = n.format.bind(n) : r = (o, a) => un(o, a, { locale: Lt, ...t }), r(e, "LLLL yyyy");
    },
    labelGridcell: (e, t, n, r) => {
      let o;
      r && typeof r.format == "function" ? o = r.format.bind(r) : o = (s, i) => un(s, i, { locale: Lt, ...n });
      let a = o(e, "PPPP");
      return t != null && t.today && (a = `Today, ${a}`), a;
    },
    labelNav: "Navigation bar",
    labelWeekNumberHeader: "Week Number",
    labelWeekday: (e, t, n) => {
      let r;
      return n && typeof n.format == "function" ? r = n.format.bind(n) : r = (o, a) => un(o, a, { locale: Lt, ...t }), r(e, "cccc");
    }
  }
};
class ye {
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
      return (a = this.overrides) != null && a.addDays ? this.overrides.addDays(r, o) : Ms(r, o);
    }, this.addMonths = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.addMonths ? this.overrides.addMonths(r, o) : Ss(r, o);
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
      return (a = this.overrides) != null && a.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(r, o) : Os(r, o);
    }, this.eachMonthOfInterval = (r) => {
      var o;
      return (o = this.overrides) != null && o.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(r) : Cf(r);
    }, this.eachYearOfInterval = (r) => {
      var i;
      const o = (i = this.overrides) != null && i.eachYearOfInterval ? this.overrides.eachYearOfInterval(r) : Df(r), a = new Set(o.map((l) => this.getYear(l)));
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
      return (o = this.overrides) != null && o.endOfISOWeek ? this.overrides.endOfISOWeek(r) : Nf(r);
    }, this.endOfMonth = (r) => {
      var o;
      return (o = this.overrides) != null && o.endOfMonth ? this.overrides.endOfMonth(r) : kf(r);
    }, this.endOfWeek = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.endOfWeek ? this.overrides.endOfWeek(r, o) : Rs(r, this.options);
    }, this.endOfYear = (r) => {
      var o;
      return (o = this.overrides) != null && o.endOfYear ? this.overrides.endOfYear(r) : Sf(r);
    }, this.format = (r, o, a) => {
      var i;
      const s = (i = this.overrides) != null && i.format ? this.overrides.format(r, o, this.options) : un(r, o, this.options);
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
      return (a = this.overrides) != null && a.isBefore ? this.overrides.isBefore(r, o) : Dm(r, o);
    }, this.isDate = (r) => {
      var o;
      return (o = this.overrides) != null && o.isDate ? this.overrides.isDate(r) : Ns(r);
    }, this.isSameDay = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isSameDay ? this.overrides.isSameDay(r, o) : wf(r, o);
    }, this.isSameMonth = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isSameMonth ? this.overrides.isSameMonth(r, o) : Nm(r, o);
    }, this.isSameYear = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isSameYear ? this.overrides.isSameYear(r, o) : Om(r, o);
    }, this.max = (r) => {
      var o;
      return (o = this.overrides) != null && o.max ? this.overrides.max(r) : vf(r);
    }, this.min = (r) => {
      var o;
      return (o = this.overrides) != null && o.min ? this.overrides.min(r) : yf(r);
    }, this.setMonth = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.setMonth ? this.overrides.setMonth(r, o) : Em(r, o);
    }, this.setYear = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.setYear ? this.overrides.setYear(r, o) : Pm(r, o);
    }, this.startOfBroadcastWeek = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(r, this) : Is(r, this);
    }, this.startOfDay = (r) => {
      var o;
      return (o = this.overrides) != null && o.startOfDay ? this.overrides.startOfDay(r) : bn(r);
    }, this.startOfISOWeek = (r) => {
      var o;
      return (o = this.overrides) != null && o.startOfISOWeek ? this.overrides.startOfISOWeek(r) : gn(r);
    }, this.startOfMonth = (r) => {
      var o;
      return (o = this.overrides) != null && o.startOfMonth ? this.overrides.startOfMonth(r) : Mf(r);
    }, this.startOfWeek = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.startOfWeek ? this.overrides.startOfWeek(r, this.options) : Kt(r, this.options);
    }, this.startOfYear = (r) => {
      var o;
      return (o = this.overrides) != null && o.startOfYear ? this.overrides.startOfYear(r) : Ps(r);
    }, this.options = { locale: Ws, ...t }, this.overrides = n;
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
    return t && ye.yearFirstLocales.has(t) ? "year-first" : "month-first";
  }
  /**
   * Formats the month/year pair respecting locale conventions.
   *
   * @since 9.11.0
   */
  formatMonthYear(t) {
    const { locale: n, timeZone: r, numerals: o } = this.options, a = n == null ? void 0 : n.code;
    if (a && ye.yearFirstLocales.has(a))
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
ye.yearFirstLocales = /* @__PURE__ */ new Set([
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
const tt = new ye();
class $s {
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
var $e;
(function(e) {
  e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})($e || ($e = {}));
var Ne;
(function(e) {
  e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})(Ne || (Ne = {}));
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
function vh(e) {
  return C.createElement("div", { ...e });
}
function yh(e) {
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
const Fs = bc(void 0);
function xn() {
  const e = vc(Fs);
  if (e === void 0)
    throw new Error("useDayPicker() must be used within a custom component.");
  return e;
}
function Mh(e) {
  const { components: t } = xn();
  return C.createElement(t.Dropdown, { ...e });
}
function Sh(e) {
  const { onPreviousClick: t, onNextClick: n, previousMonth: r, nextMonth: o, ...a } = e, { components: s, classNames: i, labels: { labelPrevious: l, labelNext: d } } = xn(), u = Re((f) => {
    o && (n == null || n(f));
  }, [o, n]), c = Re((f) => {
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
function Dh(e) {
  const { components: t } = xn();
  return C.createElement(t.Button, { ...e });
}
function Nh(e) {
  return C.createElement("option", { ...e });
}
function Oh(e) {
  const { components: t } = xn();
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
  const { components: t } = xn();
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
  DropdownNav: vh,
  Footer: yh,
  Month: wh,
  MonthCaption: xh,
  MonthGrid: kh,
  Months: Ch,
  MonthsDropdown: Mh,
  Nav: Sh,
  NextMonthButton: Dh,
  Option: Nh,
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
function tr(e) {
  return !!(e && typeof e == "object" && "from" in e);
}
function uo(e) {
  return !!(e && typeof e == "object" && "after" in e);
}
function fo(e) {
  return !!(e && typeof e == "object" && "before" in e);
}
function Ys(e) {
  return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function Bs(e, t) {
  return Array.isArray(e) && e.every(t.isDate);
}
function st(e, t, n = tt) {
  const r = Array.isArray(t) ? t : [t], { isSameDay: o, differenceInCalendarDays: a, isAfter: s } = n;
  return r.some((i) => {
    if (typeof i == "boolean")
      return i;
    if (n.isDate(i))
      return o(e, i);
    if (Bs(i, n))
      return i.some((l) => o(e, l));
    if (tr(i))
      return at(i, e, !1, n);
    if (Ys(i))
      return Array.isArray(i.dayOfWeek) ? i.dayOfWeek.includes(e.getDay()) : i.dayOfWeek === e.getDay();
    if (lo(i)) {
      const l = a(i.before, e), d = a(i.after, e), u = l > 0, c = d < 0;
      return s(i.before, i.after) ? c && u : u || c;
    }
    return uo(i) ? a(e, i.after) > 0 : fo(i) ? a(i.before, e) > 0 : typeof i == "function" ? i(e) : !1;
  });
}
function Yh(e, t, n, r, o) {
  const { disabled: a, hidden: s, modifiers: i, showOutsideDays: l, broadcastCalendar: d, today: u = o.today() } = t, { isSameDay: c, isSameMonth: f, startOfMonth: m, isBefore: y, endOfMonth: h, isAfter: g } = o, b = n && m(n), x = r && h(r), w = {
    [le.focused]: [],
    [le.outside]: [],
    [le.disabled]: [],
    [le.hidden]: [],
    [le.today]: []
  }, M = {};
  for (const S of e) {
    const { date: k, displayMonth: N } = S, A = !!(N && !f(k, N)), Y = !!(b && y(k, b)), _ = !!(x && g(k, x)), $ = !!(a && st(k, a, o)), F = !!(s && st(k, s, o)) || Y || _ || // Broadcast calendar will show outside days as default
    !d && !l && A || d && l === !1 && A, G = c(k, u);
    A && w.outside.push(S), $ && w.disabled.push(S), F && w.hidden.push(S), G && w.today.push(S), i && Object.keys(i).forEach((O) => {
      const P = i == null ? void 0 : i[O];
      P && st(k, P, o) && (M[O] ? M[O].push(S) : M[O] = [S]);
    });
  }
  return (S) => {
    const k = {
      [le.focused]: !1,
      [le.disabled]: !1,
      [le.hidden]: !1,
      [le.outside]: !1,
      [le.today]: !1
    }, N = {};
    for (const A in w) {
      const Y = w[A];
      k[A] = Y.some((_) => _ === S);
    }
    for (const A in M)
      N[A] = M[A].some((Y) => Y === S);
    return {
      ...k,
      // custom modifiers should override all the previous ones
      ...N
    };
  };
}
function Bh(e, t, n = {}) {
  return Object.entries(e).filter(([, o]) => o === !0).reduce((o, [a]) => (n[a] ? o.push(n[a]) : t[le[a]] ? o.push(t[le[a]]) : t[$e[a]] && o.push(t[$e[a]]), o), [t[L.Day]]);
}
function zh(e) {
  return {
    ...Fh,
    ...e
  };
}
function Lh(e) {
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
function Hh() {
  const e = {};
  for (const t in L)
    e[L[t]] = `rdp-${L[t]}`;
  for (const t in le)
    e[le[t]] = `rdp-${le[t]}`;
  for (const t in $e)
    e[$e[t]] = `rdp-${$e[t]}`;
  for (const t in Ne)
    e[Ne[t]] = `rdp-${Ne[t]}`;
  return e;
}
function zs(e, t, n) {
  return (n ?? new ye(t)).formatMonthYear(e);
}
const jh = zs;
function Vh(e, t, n) {
  return (n ?? new ye(t)).format(e, "d");
}
function Gh(e, t = tt) {
  return t.format(e, "LLLL");
}
function Uh(e, t, n) {
  return (n ?? new ye(t)).format(e, "cccccc");
}
function qh(e, t = tt) {
  return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
function Xh() {
  return "";
}
function Ls(e, t = tt) {
  return t.format(e, "yyyy");
}
const Kh = Ls, Qh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  formatCaption: zs,
  formatDay: Vh,
  formatMonthCaption: jh,
  formatMonthDropdown: Gh,
  formatWeekNumber: qh,
  formatWeekNumberHeader: Xh,
  formatWeekdayName: Uh,
  formatYearCaption: Kh,
  formatYearDropdown: Ls
}, Symbol.toStringTag, { value: "Module" }));
function Zh(e) {
  return e != null && e.formatMonthCaption && !e.formatCaption && (e.formatCaption = e.formatMonthCaption), e != null && e.formatYearCaption && !e.formatYearDropdown && (e.formatYearDropdown = e.formatYearCaption), {
    ...Qh,
    ...e
  };
}
function mo(e, t, n, r) {
  let o = (r ?? new ye(n)).format(e, "PPPP");
  return t.today && (o = `Today, ${o}`), t.selected && (o = `${o}, selected`), o;
}
const Jh = mo;
function ho(e, t, n) {
  return (n ?? new ye(t)).formatMonthYear(e);
}
const ep = ho;
function Hs(e, t, n, r) {
  let o = (r ?? new ye(n)).format(e, "PPPP");
  return t != null && t.today && (o = `Today, ${o}`), o;
}
function js(e) {
  return "Choose the Month";
}
function Vs() {
  return "";
}
const tp = "Go to the Next Month";
function Gs(e, t) {
  return tp;
}
function Us(e) {
  return "Go to the Previous Month";
}
function qs(e, t, n) {
  return (n ?? new ye(t)).format(e, "cccc");
}
function Xs(e, t) {
  return `Week ${e}`;
}
function Ks(e) {
  return "Week Number";
}
function Qs(e) {
  return "Choose the Year";
}
const np = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  labelCaption: ep,
  labelDay: Jh,
  labelDayButton: mo,
  labelGrid: ho,
  labelGridcell: Hs,
  labelMonthDropdown: js,
  labelNav: Vs,
  labelNext: Gs,
  labelPrevious: Us,
  labelWeekNumber: Xs,
  labelWeekNumberHeader: Ks,
  labelWeekday: qs,
  labelYearDropdown: Qs
}, Symbol.toStringTag, { value: "Module" })), We = (e, t, n) => t || (n ? typeof n == "function" ? n : (...r) => n : e);
function rp(e, t) {
  var r;
  const n = ((r = t.locale) == null ? void 0 : r.labels) ?? {};
  return {
    ...np,
    ...e ?? {},
    labelDayButton: We(mo, e == null ? void 0 : e.labelDayButton, n.labelDayButton),
    labelMonthDropdown: We(js, e == null ? void 0 : e.labelMonthDropdown, n.labelMonthDropdown),
    labelNext: We(Gs, e == null ? void 0 : e.labelNext, n.labelNext),
    labelPrevious: We(Us, e == null ? void 0 : e.labelPrevious, n.labelPrevious),
    labelWeekNumber: We(Xs, e == null ? void 0 : e.labelWeekNumber, n.labelWeekNumber),
    labelYearDropdown: We(Qs, e == null ? void 0 : e.labelYearDropdown, n.labelYearDropdown),
    labelGrid: We(ho, e == null ? void 0 : e.labelGrid, n.labelGrid),
    labelGridcell: We(Hs, e == null ? void 0 : e.labelGridcell, n.labelGridcell),
    labelNav: We(Vs, e == null ? void 0 : e.labelNav, n.labelNav),
    labelWeekNumberHeader: We(Ks, e == null ? void 0 : e.labelWeekNumberHeader, n.labelWeekNumberHeader),
    labelWeekday: We(qs, e == null ? void 0 : e.labelWeekday, n.labelWeekday)
  };
}
function op(e, t, n, r, o) {
  const { startOfMonth: a, startOfYear: s, endOfYear: i, eachMonthOfInterval: l, getMonth: d } = o;
  return l({
    start: s(e),
    end: i(e)
  }).map((f) => {
    const m = r.formatMonthDropdown(f, o), y = d(f), h = t && f < a(t) || n && f > a(n) || !1;
    return { value: y, label: m, disabled: h };
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
    return new ke(d.getFullYear(), d.getMonth(), d.getDate(), 12, 0, 0, e);
  }, s = (l) => {
    const d = a(l);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
  };
  return {
    today: () => a(ke.tz(e)),
    newDate: (l, d, u) => new ke(l, d, u, 12, 0, 0, e),
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
      const d = a(l.start), u = a(l.end), c = [], f = new ke(d.getFullYear(), d.getMonth(), 1, 12, 0, 0, e), m = u.getFullYear() * 12 + u.getMonth();
      for (; f.getFullYear() * 12 + f.getMonth() <= m; )
        c.push(new ke(f, e)), f.setMonth(f.getMonth() + 1, 1);
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
      const d = a(l.start), u = a(l.end), c = [], f = new ke(d.getFullYear(), 0, 1, 12, 0, 0, e);
      for (; f.getFullYear() <= u.getFullYear(); )
        c.push(new ke(f, e)), f.setFullYear(f.getFullYear() + 1, 0, 1);
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
      return Os(u, c);
    }
  };
}
const kn = (e) => e instanceof HTMLElement ? e : null, Dr = (e) => [
  ...e.querySelectorAll("[data-animated-month]") ?? []
], lp = (e) => kn(e.querySelector("[data-animated-month]")), Nr = (e) => kn(e.querySelector("[data-animated-caption]")), Or = (e) => kn(e.querySelector("[data-animated-weeks]")), dp = (e) => kn(e.querySelector("[data-animated-nav]")), up = (e) => kn(e.querySelector("[data-animated-weekdays]"));
function fp(e, t, { classNames: n, months: r, focused: o, dateLib: a }) {
  const s = Ht(null), i = Ht(r), l = Ht(!1);
  ya(() => {
    const d = i.current;
    if (i.current = r, !t || !e.current || // safety check because the ref can be set to anything by consumers
    !(e.current instanceof HTMLElement) || // validation required for the animation to work as expected
    r.length === 0 || d.length === 0 || r.length !== d.length)
      return;
    const u = a.isSameMonth(r[0].date, d[0].date), c = a.isAfter(r[0].date, d[0].date), f = c ? n[Ne.caption_after_enter] : n[Ne.caption_before_enter], m = c ? n[Ne.weeks_after_enter] : n[Ne.weeks_before_enter], y = s.current, h = e.current.cloneNode(!0);
    if (h instanceof HTMLElement ? (Dr(h).forEach((w) => {
      if (!(w instanceof HTMLElement))
        return;
      const M = lp(w);
      M && w.contains(M) && w.removeChild(M);
      const S = Nr(w);
      S && S.classList.remove(f);
      const k = Or(w);
      k && k.classList.remove(m);
    }), s.current = h) : s.current = null, l.current || u || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    o)
      return;
    const g = y instanceof HTMLElement ? Dr(y) : [], b = Dr(e.current);
    if (b != null && b.every((x) => x instanceof HTMLElement) && g && g.every((x) => x instanceof HTMLElement)) {
      l.current = !0, e.current.style.isolation = "isolate";
      const x = dp(e.current);
      x && (x.style.zIndex = "1"), b.forEach((w, M) => {
        const S = g[M];
        if (!S)
          return;
        w.style.position = "relative", w.style.overflow = "hidden";
        const k = Nr(w);
        k && k.classList.add(f);
        const N = Or(w);
        N && N.classList.add(m);
        const A = () => {
          l.current = !1, e.current && (e.current.style.isolation = ""), x && (x.style.zIndex = ""), k && k.classList.remove(f), N && N.classList.remove(m), w.style.position = "", w.style.overflow = "", w.contains(S) && w.removeChild(S);
        };
        S.style.pointerEvents = "none", S.style.position = "absolute", S.style.overflow = "hidden", S.setAttribute("aria-hidden", "true");
        const Y = up(S);
        Y && (Y.style.opacity = "0");
        const _ = Nr(S);
        _ && (_.classList.add(c ? n[Ne.caption_before_exit] : n[Ne.caption_after_exit]), _.addEventListener("animationend", A));
        const $ = Or(S);
        $ && $.classList.add(c ? n[Ne.weeks_before_exit] : n[Ne.weeks_after_exit]), w.insertBefore(S, w.firstChild);
      });
    }
  });
}
function mp(e, t, n, r) {
  const o = e[0], a = e[e.length - 1], { ISOWeek: s, fixedWeeks: i, broadcastCalendar: l } = n ?? {}, { addDays: d, differenceInCalendarDays: u, differenceInCalendarMonths: c, endOfBroadcastWeek: f, endOfISOWeek: m, endOfMonth: y, endOfWeek: h, isAfter: g, startOfBroadcastWeek: b, startOfISOWeek: x, startOfWeek: w } = r, M = l ? b(o, r) : s ? x(o) : w(o), S = l ? f(a) : s ? m(y(a)) : h(y(a)), k = t && (l ? f(t) : s ? m(t) : h(t)), N = k && g(S, k) ? k : S, A = u(N, M), Y = c(a, o) + 1, _ = [];
  for (let G = 0; G <= A; G++) {
    const O = d(M, G);
    _.push(O);
  }
  const F = (l ? 35 : 42) * Y;
  if (i && _.length < F) {
    const G = F - _.length;
    for (let O = 0; O < G; O++) {
      const P = d(_[_.length - 1], 1);
      _.push(P);
    }
  }
  return _;
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
function fa(e, t, n, r) {
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
  const { addDays: o, endOfBroadcastWeek: a, endOfISOWeek: s, endOfMonth: i, endOfWeek: l, getISOWeek: d, getWeek: u, startOfBroadcastWeek: c, startOfISOWeek: f, startOfWeek: m } = r, y = e.reduce((h, g) => {
    const b = n.broadcastCalendar ? c(g, r) : n.ISOWeek ? f(g) : m(g), x = n.broadcastCalendar ? a(g) : n.ISOWeek ? s(i(g)) : l(i(g)), w = t.filter((N) => N >= b && N <= x), M = n.broadcastCalendar ? 35 : 42;
    if (n.fixedWeeks && w.length < M) {
      const N = t.filter((A) => {
        const Y = M - w.length;
        return A > x && A <= o(x, Y);
      });
      w.push(...N);
    }
    const S = w.reduce((N, A) => {
      const Y = n.ISOWeek ? d(A) : u(A), _ = N.find((F) => F.weekNumber === Y), $ = new $s(A, g, r);
      return _ ? _.days.push($) : N.push(new uh(Y, [$])), N;
    }, []), k = new dh(g, S);
    return h.push(k), h;
  }, []);
  return n.reverseMonths ? y.reverse() : y;
}
function bp(e, t) {
  let { startMonth: n, endMonth: r } = e;
  const { startOfYear: o, startOfDay: a, startOfMonth: s, endOfMonth: i, addYears: l, endOfYear: d, newDate: u, today: c } = t, { fromYear: f, toYear: m, fromMonth: y, toMonth: h } = e;
  !n && y && (n = y), !n && f && (n = t.newDate(f, 0, 1)), !r && h && (r = h), !r && m && (r = u(m, 11, 31));
  const g = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
  return n ? n = s(n) : f ? n = u(f, 0, 1) : !n && g && (n = o(l(e.today ?? c(), -100))), r ? r = i(r) : m ? r = u(m, 11, 31) : !r && g && (r = d(e.today ?? c())), [
    n && a(n),
    r && a(r)
  ];
}
function vp(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: a = 1 } = n, { startOfMonth: s, addMonths: i, differenceInCalendarMonths: l } = r, d = o ? a : 1, u = s(e);
  if (!t)
    return i(u, d);
  if (!(l(t, e) < a))
    return i(u, d);
}
function yp(e, t, n, r) {
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
function nr(e, t) {
  const [n, r] = Ee(e);
  return [t === void 0 ? n : t, r];
}
function xp(e, t) {
  var M;
  const [n, r] = bp(e, t), { startOfMonth: o, endOfMonth: a } = t, s = fa(e, n, r, t), [i, l] = nr(
    s,
    // initialMonth is always computed from props.month if provided
    e.month ? s : void 0
  );
  fn(() => {
    const S = fa(e, n, r, t);
    l(S);
  }, [e.timeZone]);
  const { months: d, weeks: u, days: c, previousMonth: f, nextMonth: m } = Qe(() => {
    const S = pp(i, r, { numberOfMonths: e.numberOfMonths }, t), k = mp(S, e.endMonth ? a(e.endMonth) : void 0, {
      ISOWeek: e.ISOWeek,
      fixedWeeks: e.fixedWeeks,
      broadcastCalendar: e.broadcastCalendar
    }, t), N = gp(S, k, {
      broadcastCalendar: e.broadcastCalendar,
      fixedWeeks: e.fixedWeeks,
      ISOWeek: e.ISOWeek,
      reverseMonths: e.reverseMonths
    }, t), A = wp(N), Y = hp(N), _ = yp(i, n, e, t), $ = vp(i, r, e, t);
    return {
      months: N,
      weeks: A,
      days: Y,
      previousMonth: _,
      nextMonth: $
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
  ]), { disableNavigation: y, onMonthChange: h } = e, g = (S) => u.some((k) => k.days.some((N) => N.isEqualTo(S))), b = (S) => {
    if (y)
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
    goToMonth: b,
    goToDay: (S) => {
      g(S) || b(S.date);
    }
  };
}
var Ve;
(function(e) {
  e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(Ve || (Ve = {}));
function ma(e) {
  return !e[le.disabled] && !e[le.hidden] && !e[le.outside];
}
function kp(e, t, n, r) {
  let o, a = -1;
  for (const s of e) {
    const i = t(s);
    ma(i) && (i[le.focused] && a < Ve.FocusedModifier ? (o = s, a = Ve.FocusedModifier) : r != null && r.isEqualTo(s) && a < Ve.LastFocused ? (o = s, a = Ve.LastFocused) : n(s.date) && a < Ve.Selected ? (o = s, a = Ve.Selected) : i[le.today] && a < Ve.Today && (o = s, a = Ve.Today));
  }
  return o || (o = e.find((s) => ma(t(s)))), o;
}
function Cp(e, t, n, r, o, a, s) {
  const { ISOWeek: i, broadcastCalendar: l } = a, { addDays: d, addMonths: u, addWeeks: c, addYears: f, endOfBroadcastWeek: m, endOfISOWeek: y, endOfWeek: h, max: g, min: b, startOfBroadcastWeek: x, startOfISOWeek: w, startOfWeek: M } = s;
  let k = {
    day: d,
    week: c,
    month: u,
    year: f,
    startOfWeek: (N) => l ? x(N, s) : i ? w(N) : M(N),
    endOfWeek: (N) => l ? m(N) : i ? y(N) : h(N)
  }[e](n, t === "after" ? 1 : -1);
  return t === "before" && r ? k = g([r, k]) : t === "after" && o && (k = b([o, k])), k;
}
function Zs(e, t, n, r, o, a, s, i = 0) {
  if (i > 365)
    return;
  const l = Cp(e, t, n.date, r, o, a, s), d = !!(a.disabled && st(l, a.disabled, s)), u = !!(a.hidden && st(l, a.hidden, s)), c = l, f = new $s(l, c, s);
  return !d && !u ? f : Zs(e, t, f, r, o, a, s, i + 1);
}
function Mp(e, t, n, r, o) {
  const { autoFocus: a } = e, [s, i] = Ee(), l = kp(t.days, n, r || (() => !1), s), [d, u] = Ee(a ? l : void 0);
  return {
    isFocusTarget: (h) => !!(l != null && l.isEqualTo(h)),
    setFocused: u,
    focused: d,
    blur: () => {
      i(d), u(void 0);
    },
    moveFocus: (h, g) => {
      if (!d)
        return;
      const b = Zs(h, g, d, t.navStart, t.navEnd, e, o);
      b && (e.disableNavigation && !t.days.some((w) => w.isEqualTo(b)) || (t.goToDay(b), u(b)));
    }
  };
}
function Sp(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [a, s] = nr(n, o ? n : void 0), i = o ? n : a, { isSameDay: l } = t, d = (m) => (i == null ? void 0 : i.some((y) => l(y, m))) ?? !1, { min: u, max: c } = e;
  return {
    selected: i,
    select: (m, y, h) => {
      let g = [...i ?? []];
      if (d(m)) {
        if ((i == null ? void 0 : i.length) === u || r && (i == null ? void 0 : i.length) === 1)
          return;
        g = i == null ? void 0 : i.filter((b) => !l(b, m));
      } else
        (i == null ? void 0 : i.length) === c ? g = [m] : g = [...g, m];
      return o || s(g), o == null || o(g, m, y, h), g;
    },
    isSelected: d
  };
}
function Dp(e, t, n = 0, r = 0, o = !1, a = tt) {
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
function Np(e, t, n = tt) {
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
function ha(e, t, n = tt) {
  return at(e, t.from, !1, n) || at(e, t.to, !1, n) || at(t, e.from, !1, n) || at(t, e.to, !1, n);
}
function Op(e, t, n = tt) {
  const r = Array.isArray(t) ? t : [t];
  if (r.filter((i) => typeof i != "function").some((i) => typeof i == "boolean" ? i : n.isDate(i) ? at(e, i, !1, n) : Bs(i, n) ? i.some((l) => at(e, l, !1, n)) : tr(i) ? i.from && i.to ? ha(e, { from: i.from, to: i.to }, n) : !1 : Ys(i) ? Np(e, i.dayOfWeek, n) : lo(i) ? n.isAfter(i.before, i.after) ? ha(e, {
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
  const { disabled: n, excludeDisabled: r, selected: o, required: a, onSelect: s } = e, [i, l] = nr(o, s ? o : void 0), d = s ? o : i;
  return {
    selected: d,
    select: (f, m, y) => {
      const { min: h, max: g } = e, b = f ? Dp(f, d, h, g, a, t) : void 0;
      return r && n && (b != null && b.from) && b.to && Op({ from: b.from, to: b.to }, n, t) && (b.from = f, b.to = void 0), s || l(b), s == null || s(b, f, m, y), b;
    },
    isSelected: (f) => d && at(d, f, !1, t)
  };
}
function Pp(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [a, s] = nr(n, o ? n : void 0), i = o ? n : a, { isSameDay: l } = t;
  return {
    selected: i,
    select: (c, f, m) => {
      let y = c;
      return !r && i && i && l(c, i) && (y = void 0), o || s(y), o == null || o(y, c, f, m), y;
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
function Ae(e, t) {
  return e instanceof ke && e.timeZone === t ? e : new ke(e, t);
}
function zt(e, t, n) {
  return Ae(e, t);
}
function pa(e, t, n) {
  return typeof e == "boolean" || typeof e == "function" ? e : e instanceof Date ? zt(e, t) : Array.isArray(e) ? e.map((r) => r instanceof Date ? zt(r, t) : r) : tr(e) ? {
    ...e,
    from: e.from ? Ae(e.from, t) : e.from,
    to: e.to ? Ae(e.to, t) : e.to
  } : lo(e) ? {
    before: zt(e.before, t),
    after: zt(e.after, t)
  } : uo(e) ? {
    after: zt(e.after, t)
  } : fo(e) ? {
    before: zt(e.before, t)
  } : e;
}
function Er(e, t, n) {
  return e && (Array.isArray(e) ? e.map((r) => pa(r, t)) : pa(e, t));
}
function Js(e) {
  var Te;
  let t = e;
  const n = t.timeZone;
  if (n && (t = {
    ...e,
    timeZone: n
  }, t.today && (t.today = Ae(t.today, n)), t.month && (t.month = Ae(t.month, n)), t.defaultMonth && (t.defaultMonth = Ae(t.defaultMonth, n)), t.startMonth && (t.startMonth = Ae(t.startMonth, n)), t.endMonth && (t.endMonth = Ae(t.endMonth, n)), t.mode === "single" && t.selected ? t.selected = Ae(t.selected, n) : t.mode === "multiple" && t.selected ? t.selected = (Te = t.selected) == null ? void 0 : Te.map((q) => Ae(q, n)) : t.mode === "range" && t.selected && (t.selected = {
    from: t.selected.from ? Ae(t.selected.from, n) : t.selected.from,
    to: t.selected.to ? Ae(t.selected.to, n) : t.selected.to
  }), t.disabled !== void 0 && (t.disabled = Er(t.disabled, n)), t.hidden !== void 0 && (t.hidden = Er(t.hidden, n)), t.modifiers)) {
    const q = {};
    Object.keys(t.modifiers).forEach((te) => {
      var V;
      q[te] = Er((V = t.modifiers) == null ? void 0 : V[te], n);
    }), t.modifiers = q;
  }
  const { components: r, formatters: o, labels: a, dateLib: s, locale: i, classNames: l } = Qe(() => {
    const q = { ...Ws, ...t.locale }, te = t.broadcastCalendar ? 1 : t.weekStartsOn, V = t.noonSafe && t.timeZone ? cp(t.timeZone, {
      weekStartsOn: te,
      locale: q
    }) : void 0, J = t.dateLib && V ? { ...V, ...t.dateLib } : t.dateLib ?? V, H = new ye({
      locale: q,
      weekStartsOn: te,
      firstWeekContainsDate: t.firstWeekContainsDate,
      useAdditionalWeekYearTokens: t.useAdditionalWeekYearTokens,
      useAdditionalDayOfYearTokens: t.useAdditionalDayOfYearTokens,
      timeZone: t.timeZone,
      numerals: t.numerals
    }, J);
    return {
      dateLib: H,
      components: zh(t.components),
      formatters: Zh(t.formatters),
      labels: rp(t.labels, H.options),
      locale: q,
      classNames: { ...Hh(), ...t.classNames }
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
  const { captionLayout: d, mode: u, navLayout: c, numberOfMonths: f = 1, onDayBlur: m, onDayClick: y, onDayFocus: h, onDayKeyDown: g, onDayMouseEnter: b, onDayMouseLeave: x, onNextClick: w, onPrevClick: M, showWeekNumber: S, styles: k } = t, { formatCaption: N, formatDay: A, formatMonthDropdown: Y, formatWeekNumber: _, formatWeekNumberHeader: $, formatWeekdayName: F, formatYearDropdown: G } = o, O = xp(t, s), { days: P, months: D, navStart: R, navEnd: E, previousMonth: T, nextMonth: I, goToMonth: z } = O, ee = Yh(P, t, R, E, s), { isSelected: B, select: U, selected: X } = Rp(t, s) ?? {}, { blur: ce, focused: ue, isFocusTarget: Z, moveFocus: me, setFocused: ae } = Mp(t, O, ee, B ?? (() => !1), s), { labelDayButton: ge, labelGridcell: ve, labelGrid: Se, labelMonthDropdown: ft, labelNav: At, labelPrevious: Tt, labelNext: nt, labelWeekday: _t, labelWeekNumber: we, labelWeekNumberHeader: dr, labelYearDropdown: ur } = a, Ce = Qe(() => sp(s, t.ISOWeek, t.broadcastCalendar, t.today), [s, t.ISOWeek, t.broadcastCalendar, t.today]), rt = u !== void 0 || y !== void 0, rn = Re(() => {
    T && (z(T), M == null || M(T));
  }, [T, z, M]), on = Re(() => {
    I && (z(I), w == null || w(I));
  }, [z, I, w]), It = Re((q, te) => (V) => {
    V.preventDefault(), V.stopPropagation(), ae(q), !te.disabled && (U == null || U(q.date, te, V), y == null || y(q.date, te, V));
  }, [U, y, ae]), fr = Re((q, te) => (V) => {
    ae(q), h == null || h(q.date, te, V);
  }, [h, ae]), Mn = Re((q, te) => (V) => {
    ce(), m == null || m(q.date, te, V);
  }, [ce, m]), an = Re((q, te) => (V) => {
    const J = {
      ArrowLeft: [
        V.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "after" : "before"
      ],
      ArrowRight: [
        V.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "before" : "after"
      ],
      ArrowDown: [V.shiftKey ? "year" : "week", "after"],
      ArrowUp: [V.shiftKey ? "year" : "week", "before"],
      PageUp: [V.shiftKey ? "year" : "month", "before"],
      PageDown: [V.shiftKey ? "year" : "month", "after"],
      Home: ["startOfWeek", "before"],
      End: ["endOfWeek", "after"]
    };
    if (J[V.key]) {
      V.preventDefault(), V.stopPropagation();
      const [H, j] = J[V.key];
      me(H, j);
    }
    g == null || g(q.date, te, V);
  }, [me, g, t.dir]), mt = Re((q, te) => (V) => {
    b == null || b(q.date, te, V);
  }, [b]), Sn = Re((q, te) => (V) => {
    x == null || x(q.date, te, V);
  }, [x]), ht = Re((q) => (te) => {
    const V = Number(te.target.value), J = s.setMonth(s.startOfMonth(q), V);
    z(J);
  }, [s, z]), mr = Re((q) => (te) => {
    const V = Number(te.target.value), J = s.setYear(s.startOfMonth(q), V);
    z(J);
  }, [s, z]), { className: hr, style: Dn } = Qe(() => ({
    className: [l[L.Root], t.className].filter(Boolean).join(" "),
    style: { ...k == null ? void 0 : k[L.Root], ...t.style }
  }), [l, t.className, t.style, k]), Nn = Lh(t), On = Ht(null);
  fp(On, !!t.animate, {
    classNames: l,
    months: D,
    focused: ue,
    dateLib: s
  });
  const sn = {
    dayPickerProps: t,
    selected: X,
    select: U,
    isSelected: B,
    months: D,
    nextMonth: I,
    previousMonth: T,
    goToMonth: z,
    getModifiers: ee,
    components: r,
    classNames: l,
    styles: k,
    labels: a,
    formatters: o
  };
  return C.createElement(
    Fs.Provider,
    { value: sn },
    C.createElement(
      r.Root,
      { rootRef: t.animate ? On : void 0, className: hr, style: Dn, dir: t.dir, id: t.id, lang: t.lang, nonce: t.nonce, title: t.title, role: t.role, "aria-label": t["aria-label"], "aria-labelledby": t["aria-labelledby"], ...Nn },
      C.createElement(
        r.Months,
        { className: l[L.Months], style: k == null ? void 0 : k[L.Months] },
        !t.hideNavigation && !c && C.createElement(r.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: l[L.Nav], style: k == null ? void 0 : k[L.Nav], "aria-label": At(), onPreviousClick: rn, onNextClick: on, previousMonth: T, nextMonth: I }),
        D.map((q, te) => C.createElement(
          r.Month,
          {
            "data-animated-month": t.animate ? "true" : void 0,
            className: l[L.Month],
            style: k == null ? void 0 : k[L.Month],
            // biome-ignore lint/suspicious/noArrayIndexKey: breaks animation
            key: te,
            displayIndex: te,
            calendarMonth: q
          },
          c === "around" && !t.hideNavigation && te === 0 && C.createElement(
            r.PreviousMonthButton,
            { type: "button", className: l[L.PreviousMonthButton], tabIndex: T ? void 0 : -1, "aria-disabled": T ? void 0 : !0, "aria-label": Tt(T), onClick: rn, "data-animated-button": t.animate ? "true" : void 0 },
            C.createElement(r.Chevron, { disabled: T ? void 0 : !0, className: l[L.Chevron], orientation: t.dir === "rtl" ? "right" : "left" })
          ),
          C.createElement(r.MonthCaption, { "data-animated-caption": t.animate ? "true" : void 0, className: l[L.MonthCaption], style: k == null ? void 0 : k[L.MonthCaption], calendarMonth: q, displayIndex: te }, d != null && d.startsWith("dropdown") ? C.createElement(
            r.DropdownNav,
            { className: l[L.Dropdowns], style: k == null ? void 0 : k[L.Dropdowns] },
            (() => {
              const V = d === "dropdown" || d === "dropdown-months" ? C.createElement(r.MonthsDropdown, { key: "month", className: l[L.MonthsDropdown], "aria-label": ft(), classNames: l, components: r, disabled: !!t.disableNavigation, onChange: ht(q.date), options: op(q.date, R, E, o, s), style: k == null ? void 0 : k[L.Dropdown], value: s.getMonth(q.date) }) : C.createElement("span", { key: "month" }, Y(q.date, s)), J = d === "dropdown" || d === "dropdown-years" ? C.createElement(r.YearsDropdown, { key: "year", className: l[L.YearsDropdown], "aria-label": ur(s.options), classNames: l, components: r, disabled: !!t.disableNavigation, onChange: mr(q.date), options: ip(R, E, o, s, !!t.reverseYears), style: k == null ? void 0 : k[L.Dropdown], value: s.getYear(q.date) }) : C.createElement("span", { key: "year" }, G(q.date, s));
              return s.getMonthYearOrder() === "year-first" ? [J, V] : [V, J];
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
            } }, N(q.date, s.options, s))
          ) : C.createElement(r.CaptionLabel, { className: l[L.CaptionLabel], role: "status", "aria-live": "polite" }, N(q.date, s.options, s))),
          c === "around" && !t.hideNavigation && te === f - 1 && C.createElement(
            r.NextMonthButton,
            { type: "button", className: l[L.NextMonthButton], tabIndex: I ? void 0 : -1, "aria-disabled": I ? void 0 : !0, "aria-label": nt(I), onClick: on, "data-animated-button": t.animate ? "true" : void 0 },
            C.createElement(r.Chevron, { disabled: I ? void 0 : !0, className: l[L.Chevron], orientation: t.dir === "rtl" ? "left" : "right" })
          ),
          te === f - 1 && c === "after" && !t.hideNavigation && C.createElement(r.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: l[L.Nav], style: k == null ? void 0 : k[L.Nav], "aria-label": At(), onPreviousClick: rn, onNextClick: on, previousMonth: T, nextMonth: I }),
          C.createElement(
            r.MonthGrid,
            { role: "grid", "aria-multiselectable": u === "multiple" || u === "range", "aria-label": Se(q.date, s.options, s) || void 0, className: l[L.MonthGrid], style: k == null ? void 0 : k[L.MonthGrid] },
            !t.hideWeekdays && C.createElement(
              r.Weekdays,
              { "data-animated-weekdays": t.animate ? "true" : void 0, className: l[L.Weekdays], style: k == null ? void 0 : k[L.Weekdays] },
              S && C.createElement(r.WeekNumberHeader, { "aria-label": dr(s.options), className: l[L.WeekNumberHeader], style: k == null ? void 0 : k[L.WeekNumberHeader], scope: "col" }, $()),
              Ce.map((V) => C.createElement(r.Weekday, { "aria-label": _t(V, s.options, s), className: l[L.Weekday], key: String(V), style: k == null ? void 0 : k[L.Weekday], scope: "col" }, F(V, s.options, s)))
            ),
            C.createElement(r.Weeks, { "data-animated-weeks": t.animate ? "true" : void 0, className: l[L.Weeks], style: k == null ? void 0 : k[L.Weeks] }, q.weeks.map((V) => C.createElement(
              r.Week,
              { className: l[L.Week], key: V.weekNumber, style: k == null ? void 0 : k[L.Week], week: V },
              S && C.createElement(r.WeekNumber, { week: V, style: k == null ? void 0 : k[L.WeekNumber], "aria-label": we(V.weekNumber, {
                locale: i
              }), className: l[L.WeekNumber], scope: "row", role: "rowheader" }, _(V.weekNumber, s)),
              V.days.map((J) => {
                const { date: H } = J, j = ee(J);
                if (j[le.focused] = !j.hidden && !!(ue != null && ue.isEqualTo(J)), j[$e.selected] = (B == null ? void 0 : B(H)) || j.selected, tr(X)) {
                  const { from: fe, to: xe } = X;
                  j[$e.range_start] = !!(fe && xe && s.isSameDay(H, fe)), j[$e.range_end] = !!(fe && xe && s.isSameDay(H, xe)), j[$e.range_middle] = at(X, H, !0, s);
                }
                const be = ap(j, k, t.modifiersStyles), Me = Bh(j, l, t.modifiersClassNames), Wt = !rt && !j.hidden ? ve(H, j, s.options, s) : void 0;
                return C.createElement(r.Day, { key: `${J.isoDate}_${J.displayMonthId}`, day: J, modifiers: j, className: Me.join(" "), style: be, role: "gridcell", "aria-selected": j.selected || void 0, "aria-label": Wt, "data-day": J.isoDate, "data-month": J.outside ? J.dateMonthId : void 0, "data-selected": j.selected || void 0, "data-disabled": j.disabled || void 0, "data-hidden": j.hidden || void 0, "data-outside": J.outside || void 0, "data-focused": j.focused || void 0, "data-today": j.today || void 0 }, !j.hidden && rt ? C.createElement(r.DayButton, { className: l[L.DayButton], style: k == null ? void 0 : k[L.DayButton], type: "button", day: J, modifiers: j, disabled: !j.focused && j.disabled || void 0, "aria-disabled": j.focused && j.disabled || void 0, tabIndex: Z(J) ? 0 : -1, "aria-label": ge(H, j, s.options, s), onClick: It(J, j), onBlur: Mn(J, j), onFocus: fr(J, j), onKeyDown: an(J, j), onMouseEnter: mt(J, j), onMouseLeave: Sn(J, j) }, A(H, s.options, s)) : !j.hidden && A(J.date, s.options, s));
              })
            )))
          )
        ))
      ),
      t.footer && C.createElement(r.Footer, { className: l[L.Footer], style: k == null ? void 0 : k[L.Footer], role: "status", "aria-live": "polite" }, t.footer)
    )
  );
}
const ei = {
  ...lh,
  labels: {
    labelDayButton: (e, t, n, r) => {
      let a = (r ?? new ye(n)).format(e, "PPPP");
      return t.today && (a = `오늘, ${a}`), t.selected && (a = `${a}, 선택됨`), a;
    },
    labelMonthDropdown: "월 선택",
    labelNext: "다음 달로 이동",
    labelPrevious: "이전 달로 이동",
    labelWeekNumber: (e) => `주 ${e}`,
    labelYearDropdown: "연도 선택",
    labelGrid: (e, t, n) => (n ?? new ye(t)).formatMonthYear(e),
    labelGridcell: (e, t, n, r) => {
      let a = (r ?? new ye(n)).format(e, "PPPP");
      return t != null && t.today && (a = `오늘, ${a}`), a;
    },
    labelNav: "탐색 모음",
    labelWeekNumberHeader: "주 번호",
    labelWeekday: (e, t, n) => (n ?? new ye(t)).format(e, "cccc")
  }
};
var Ap = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Tp(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var ti = { exports: {} };
(function(e, t) {
  (function(n, r) {
    e.exports = r();
  })(Ap, function() {
    var n = 1e3, r = 6e4, o = 36e5, a = "millisecond", s = "second", i = "minute", l = "hour", d = "day", u = "week", c = "month", f = "quarter", m = "year", y = "date", h = "Invalid Date", g = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, b = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, x = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(O) {
      var P = ["th", "st", "nd", "rd"], D = O % 100;
      return "[" + O + (P[(D - 20) % 10] || P[D] || P[0]) + "]";
    } }, w = function(O, P, D) {
      var R = String(O);
      return !R || R.length >= P ? O : "" + Array(P + 1 - R.length).join(D) + O;
    }, M = { s: w, z: function(O) {
      var P = -O.utcOffset(), D = Math.abs(P), R = Math.floor(D / 60), E = D % 60;
      return (P <= 0 ? "+" : "-") + w(R, 2, "0") + ":" + w(E, 2, "0");
    }, m: function O(P, D) {
      if (P.date() < D.date()) return -O(D, P);
      var R = 12 * (D.year() - P.year()) + (D.month() - P.month()), E = P.clone().add(R, c), T = D - E < 0, I = P.clone().add(R + (T ? -1 : 1), c);
      return +(-(R + (D - E) / (T ? E - I : I - E)) || 0);
    }, a: function(O) {
      return O < 0 ? Math.ceil(O) || 0 : Math.floor(O);
    }, p: function(O) {
      return { M: c, y: m, w: u, d, D: y, h: l, m: i, s, ms: a, Q: f }[O] || String(O || "").toLowerCase().replace(/s$/, "");
    }, u: function(O) {
      return O === void 0;
    } }, S = "en", k = {};
    k[S] = x;
    var N = "$isDayjsObject", A = function(O) {
      return O instanceof F || !(!O || !O[N]);
    }, Y = function O(P, D, R) {
      var E;
      if (!P) return S;
      if (typeof P == "string") {
        var T = P.toLowerCase();
        k[T] && (E = T), D && (k[T] = D, E = T);
        var I = P.split("-");
        if (!E && I.length > 1) return O(I[0]);
      } else {
        var z = P.name;
        k[z] = P, E = z;
      }
      return !R && E && (S = E), E || !R && S;
    }, _ = function(O, P) {
      if (A(O)) return O.clone();
      var D = typeof P == "object" ? P : {};
      return D.date = O, D.args = arguments, new F(D);
    }, $ = M;
    $.l = Y, $.i = A, $.w = function(O, P) {
      return _(O, { locale: P.$L, utc: P.$u, x: P.$x, $offset: P.$offset });
    };
    var F = function() {
      function O(D) {
        this.$L = Y(D.locale, null, !0), this.parse(D), this.$x = this.$x || D.x || {}, this[N] = !0;
      }
      var P = O.prototype;
      return P.parse = function(D) {
        this.$d = function(R) {
          var E = R.date, T = R.utc;
          if (E === null) return /* @__PURE__ */ new Date(NaN);
          if ($.u(E)) return /* @__PURE__ */ new Date();
          if (E instanceof Date) return new Date(E);
          if (typeof E == "string" && !/Z$/i.test(E)) {
            var I = E.match(g);
            if (I) {
              var z = I[2] - 1 || 0, ee = (I[7] || "0").substring(0, 3);
              return T ? new Date(Date.UTC(I[1], z, I[3] || 1, I[4] || 0, I[5] || 0, I[6] || 0, ee)) : new Date(I[1], z, I[3] || 1, I[4] || 0, I[5] || 0, I[6] || 0, ee);
            }
          }
          return new Date(E);
        }(D), this.init();
      }, P.init = function() {
        var D = this.$d;
        this.$y = D.getFullYear(), this.$M = D.getMonth(), this.$D = D.getDate(), this.$W = D.getDay(), this.$H = D.getHours(), this.$m = D.getMinutes(), this.$s = D.getSeconds(), this.$ms = D.getMilliseconds();
      }, P.$utils = function() {
        return $;
      }, P.isValid = function() {
        return this.$d.toString() !== h;
      }, P.isSame = function(D, R) {
        var E = _(D);
        return this.startOf(R) <= E && E <= this.endOf(R);
      }, P.isAfter = function(D, R) {
        return _(D) < this.startOf(R);
      }, P.isBefore = function(D, R) {
        return this.endOf(R) < _(D);
      }, P.$g = function(D, R, E) {
        return $.u(D) ? this[R] : this.set(E, D);
      }, P.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, P.valueOf = function() {
        return this.$d.getTime();
      }, P.startOf = function(D, R) {
        var E = this, T = !!$.u(R) || R, I = $.p(D), z = function(me, ae) {
          var ge = $.w(E.$u ? Date.UTC(E.$y, ae, me) : new Date(E.$y, ae, me), E);
          return T ? ge : ge.endOf(d);
        }, ee = function(me, ae) {
          return $.w(E.toDate()[me].apply(E.toDate("s"), (T ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(ae)), E);
        }, B = this.$W, U = this.$M, X = this.$D, ce = "set" + (this.$u ? "UTC" : "");
        switch (I) {
          case m:
            return T ? z(1, 0) : z(31, 11);
          case c:
            return T ? z(1, U) : z(0, U + 1);
          case u:
            var ue = this.$locale().weekStart || 0, Z = (B < ue ? B + 7 : B) - ue;
            return z(T ? X - Z : X + (6 - Z), U);
          case d:
          case y:
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
      }, P.endOf = function(D) {
        return this.startOf(D, !1);
      }, P.$set = function(D, R) {
        var E, T = $.p(D), I = "set" + (this.$u ? "UTC" : ""), z = (E = {}, E[d] = I + "Date", E[y] = I + "Date", E[c] = I + "Month", E[m] = I + "FullYear", E[l] = I + "Hours", E[i] = I + "Minutes", E[s] = I + "Seconds", E[a] = I + "Milliseconds", E)[T], ee = T === d ? this.$D + (R - this.$W) : R;
        if (T === c || T === m) {
          var B = this.clone().set(y, 1);
          B.$d[z](ee), B.init(), this.$d = B.set(y, Math.min(this.$D, B.daysInMonth())).$d;
        } else z && this.$d[z](ee);
        return this.init(), this;
      }, P.set = function(D, R) {
        return this.clone().$set(D, R);
      }, P.get = function(D) {
        return this[$.p(D)]();
      }, P.add = function(D, R) {
        var E, T = this;
        D = Number(D);
        var I = $.p(R), z = function(U) {
          var X = _(T);
          return $.w(X.date(X.date() + Math.round(U * D)), T);
        };
        if (I === c) return this.set(c, this.$M + D);
        if (I === m) return this.set(m, this.$y + D);
        if (I === d) return z(1);
        if (I === u) return z(7);
        var ee = (E = {}, E[i] = r, E[l] = o, E[s] = n, E)[I] || 1, B = this.$d.getTime() + D * ee;
        return $.w(B, this);
      }, P.subtract = function(D, R) {
        return this.add(-1 * D, R);
      }, P.format = function(D) {
        var R = this, E = this.$locale();
        if (!this.isValid()) return E.invalidDate || h;
        var T = D || "YYYY-MM-DDTHH:mm:ssZ", I = $.z(this), z = this.$H, ee = this.$m, B = this.$M, U = E.weekdays, X = E.months, ce = E.meridiem, ue = function(ae, ge, ve, Se) {
          return ae && (ae[ge] || ae(R, T)) || ve[ge].slice(0, Se);
        }, Z = function(ae) {
          return $.s(z % 12 || 12, ae, "0");
        }, me = ce || function(ae, ge, ve) {
          var Se = ae < 12 ? "AM" : "PM";
          return ve ? Se.toLowerCase() : Se;
        };
        return T.replace(b, function(ae, ge) {
          return ge || function(ve) {
            switch (ve) {
              case "YY":
                return String(R.$y).slice(-2);
              case "YYYY":
                return $.s(R.$y, 4, "0");
              case "M":
                return B + 1;
              case "MM":
                return $.s(B + 1, 2, "0");
              case "MMM":
                return ue(E.monthsShort, B, X, 3);
              case "MMMM":
                return ue(X, B);
              case "D":
                return R.$D;
              case "DD":
                return $.s(R.$D, 2, "0");
              case "d":
                return String(R.$W);
              case "dd":
                return ue(E.weekdaysMin, R.$W, U, 2);
              case "ddd":
                return ue(E.weekdaysShort, R.$W, U, 3);
              case "dddd":
                return U[R.$W];
              case "H":
                return String(z);
              case "HH":
                return $.s(z, 2, "0");
              case "h":
                return Z(1);
              case "hh":
                return Z(2);
              case "a":
                return me(z, ee, !0);
              case "A":
                return me(z, ee, !1);
              case "m":
                return String(ee);
              case "mm":
                return $.s(ee, 2, "0");
              case "s":
                return String(R.$s);
              case "ss":
                return $.s(R.$s, 2, "0");
              case "SSS":
                return $.s(R.$ms, 3, "0");
              case "Z":
                return I;
            }
            return null;
          }(ae) || I.replace(":", "");
        });
      }, P.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, P.diff = function(D, R, E) {
        var T, I = this, z = $.p(R), ee = _(D), B = (ee.utcOffset() - this.utcOffset()) * r, U = this - ee, X = function() {
          return $.m(I, ee);
        };
        switch (z) {
          case m:
            T = X() / 12;
            break;
          case c:
            T = X();
            break;
          case f:
            T = X() / 3;
            break;
          case u:
            T = (U - B) / 6048e5;
            break;
          case d:
            T = (U - B) / 864e5;
            break;
          case l:
            T = U / o;
            break;
          case i:
            T = U / r;
            break;
          case s:
            T = U / n;
            break;
          default:
            T = U;
        }
        return E ? T : $.a(T);
      }, P.daysInMonth = function() {
        return this.endOf(c).$D;
      }, P.$locale = function() {
        return k[this.$L];
      }, P.locale = function(D, R) {
        if (!D) return this.$L;
        var E = this.clone(), T = Y(D, R, !0);
        return T && (E.$L = T), E;
      }, P.clone = function() {
        return $.w(this.$d, this);
      }, P.toDate = function() {
        return new Date(this.valueOf());
      }, P.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, P.toISOString = function() {
        return this.$d.toISOString();
      }, P.toString = function() {
        return this.$d.toUTCString();
      }, O;
    }(), G = F.prototype;
    return _.prototype = G, [["$ms", a], ["$s", s], ["$m", i], ["$H", l], ["$W", d], ["$M", c], ["$y", m], ["$D", y]].forEach(function(O) {
      G[O[1]] = function(P) {
        return this.$g(P, O[0], O[1]);
      };
    }), _.extend = function(O, P) {
      return O.$i || (O(P, F, _), O.$i = !0), _;
    }, _.locale = Y, _.isDayjs = A, _.unix = function(O) {
      return _(1e3 * O);
    }, _.en = k[S], _.Ls = k, _.p = {}, _;
  });
})(ti);
var _p = ti.exports;
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
    const [f, m] = Ee(!1), [y, h] = Ee(
      e ? he(e) : void 0
    );
    fn(() => {
      h(e ? he(e) : void 0);
    }, [e]);
    const g = Qe(() => y == null ? void 0 : y.toDate(), [y]), b = (k) => {
      if (!k) {
        h(void 0);
        return;
      }
      const N = he(k);
      h(N);
    }, x = () => {
      y && (t == null || t(y.format("YYYY-MM-DD")), m(!1));
    }, w = () => {
      h(e ? he(e) : void 0), m(!1);
    }, M = Qe(() => e ? he(e).format("YYYY-MM-DD") : "", [e]), S = Qe(() => {
      const k = [];
      return o && k.push({ before: he(o).toDate() }), a && k.push({ after: he(a).toDate() }), k.length > 0 ? k : void 0;
    }, [o, a]);
    return /* @__PURE__ */ Q("div", { ref: c, className: W("flex flex-col gap-1", u), children: [
      n && /* @__PURE__ */ v("label", { className: "text-sm font-medium text-gray-700", children: n }),
      /* @__PURE__ */ Q(
        ro,
        {
          open: f && !s,
          onOpenChange: m,
          children: [
            /* @__PURE__ */ v(oo, { asChild: !0, children: /* @__PURE__ */ v("div", { className: "relative", children: /* @__PURE__ */ v(
              "input",
              {
                type: "text",
                readOnly: !0,
                value: M,
                placeholder: r,
                disabled: s,
                className: W(
                  "w-full h-10 px-3 border rounded bg-white text-sm",
                  "hover:bg-gray-50 hover:border-gray-400",
                  "focus:outline-none",
                  "transition-all duration-150",
                  "cursor-pointer",
                  i ? "border-red-500" : "border-gray-300",
                  s && W(
                    "bg-gray-100 cursor-not-allowed",
                    "hover:bg-gray-100 hover:border-gray-300"
                  )
                )
              }
            ) }) }),
            /* @__PURE__ */ v(ao, { children: /* @__PURE__ */ Q(
              er,
              {
                align: "start",
                sideOffset: 5,
                className: W(
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
                  /* @__PURE__ */ v("div", { className: "date-picker-calendar", children: /* @__PURE__ */ v(
                    Js,
                    {
                      mode: "single",
                      selected: g,
                      onSelect: b,
                      locale: ei,
                      disabled: S,
                      formatters: {
                        formatCaption: (k) => `${k.getFullYear()}년 ${k.getMonth() + 1}월`
                      }
                    }
                  ) }),
                  /* @__PURE__ */ Q(
                    "div",
                    {
                      className: W(
                        "flex items-end justify-between mt-2 pt-2",
                        "border-t border-gray-200"
                      ),
                      children: [
                        /* @__PURE__ */ v("div", { className: "flex flex-col min-h-8", children: y ? /* @__PURE__ */ v("span", { className: "text-xs text-gray-700", children: y.format("YYYY-MM-DD") }) : /* @__PURE__ */ v("span", { className: "text-xs text-red-500", children: "날짜를 선택해 주세요." }) }),
                        /* @__PURE__ */ Q("div", { className: "flex gap-2", children: [
                          /* @__PURE__ */ v(
                            "button",
                            {
                              onClick: w,
                              className: W(
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
                          /* @__PURE__ */ v(
                            "button",
                            {
                              onClick: x,
                              disabled: !y,
                              className: W(
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
      (d || l) && /* @__PURE__ */ v("div", { children: i && l ? /* @__PURE__ */ v("p", { className: "text-xs text-red-500", children: l }) : d && /* @__PURE__ */ v("p", { className: "text-xs text-gray-500", children: d }) })
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
    const [s, i] = Ee(!1), [l, d] = Ee([
      e != null && e.start ? he(e.start) : void 0,
      e != null && e.end ? he(e.end) : void 0
    ]);
    fn(() => {
      e && d([
        e.start ? he(e.start) : void 0,
        e.end ? he(e.end) : void 0
      ]);
    }, [e]);
    const [u, c] = l, f = Qe(() => {
      if (u)
        return {
          from: u.toDate(),
          to: c == null ? void 0 : c.toDate()
        };
    }, [u, c]), m = (w) => {
      const [M, S] = w.getValue();
      d([M, S]);
    }, y = (w) => {
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
    }, g = () => {
      d([
        e != null && e.start ? he(e.start) : void 0,
        e != null && e.end ? he(e.end) : void 0
      ]), i(!1);
    }, b = Qe(() => {
      if (!(!u || !c))
        return c.diff(u, "day") + 1;
    }, [u, c]), x = Qe(() => !(e != null && e.start) || !(e != null && e.end) ? { start: "", end: "" } : {
      start: he(e.start).format("YYYY-MM-DD"),
      end: he(e.end).format("YYYY-MM-DD")
    }, [e]);
    return /* @__PURE__ */ Q(ro, { open: s, onOpenChange: i, children: [
      /* @__PURE__ */ v(oo, { asChild: !0, children: /* @__PURE__ */ Q("div", { ref: a, className: W("flex items-center gap-0", o), children: [
        /* @__PURE__ */ Q("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ v(
            "label",
            {
              className: W(
                "absolute left-3 top-1/2 -translate-y-1/2",
                "text-xs text-gray-500",
                "pointer-events-none"
              ),
              children: n
            }
          ),
          /* @__PURE__ */ v(
            "input",
            {
              type: "text",
              readOnly: !0,
              value: x.start,
              placeholder: "YYYY-MM-DD",
              className: W(
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
        /* @__PURE__ */ Q("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ v(
            "label",
            {
              className: W(
                "absolute left-3 top-1/2 -translate-y-1/2",
                "text-xs text-gray-500",
                "pointer-events-none"
              ),
              children: r
            }
          ),
          /* @__PURE__ */ v(
            "input",
            {
              type: "text",
              readOnly: !0,
              value: x.end,
              placeholder: "YYYY-MM-DD",
              className: W(
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
      /* @__PURE__ */ v(ao, { children: /* @__PURE__ */ Q(
        er,
        {
          align: "start",
          sideOffset: 5,
          className: W(
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
            /* @__PURE__ */ Q("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ v("div", { className: "flex flex-col border-r border-gray-200 pr-2", children: Wp().map((w) => /* @__PURE__ */ v(
                "button",
                {
                  onClick: () => m(w),
                  className: W(
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
              /* @__PURE__ */ v("div", { className: "date-range-picker-calendar", children: /* @__PURE__ */ v(
                Js,
                {
                  mode: "range",
                  selected: f,
                  onSelect: y,
                  numberOfMonths: 2,
                  locale: ei,
                  formatters: {
                    formatCaption: (w) => `${w.getFullYear()}년 ${w.getMonth() + 1}월`
                  }
                }
              ) })
            ] }),
            /* @__PURE__ */ Q(
              "div",
              {
                className: W(
                  "flex items-end justify-between mt-2 pt-2",
                  "border-t border-gray-200"
                ),
                children: [
                  /* @__PURE__ */ v("div", { className: "flex flex-col min-h-8", children: !u || !c ? /* @__PURE__ */ v("span", { className: "text-xs text-red-500", children: "종료일자를 선택해 주세요." }) : /* @__PURE__ */ Q(Bn, { children: [
                    /* @__PURE__ */ Q("span", { className: "text-xs text-gray-700", children: [
                      u.format("YYYY-MM-DD"),
                      " ~",
                      " ",
                      c.format("YYYY-MM-DD")
                    ] }),
                    /* @__PURE__ */ Q("span", { className: "text-xs text-gray-500", children: [
                      "(",
                      b,
                      "일간)"
                    ] })
                  ] }) }),
                  /* @__PURE__ */ Q("div", { className: "flex gap-2", children: [
                    /* @__PURE__ */ v(
                      "button",
                      {
                        onClick: g,
                        className: W(
                          "w-15 h-8",
                          "border border-gray-300 rounded",
                          "text-xs font-medium text-gray-700",
                          "transition-all duration-150",
                          "hover:bg-gray-50 active:scale-95"
                        ),
                        children: "취소"
                      }
                    ),
                    /* @__PURE__ */ v(
                      "button",
                      {
                        onClick: h,
                        disabled: !u || !c,
                        className: W(
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
function po(e) {
  const t = p.useRef({ value: e, previous: e });
  return p.useMemo(() => (t.current.value !== e && (t.current.previous = t.current.value, t.current.value = e), t.current.previous), [e]);
}
var rr = "Switch", [Fp] = ze(rr), [Yp, Bp] = Fp(rr), ni = p.forwardRef(
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
    } = e, [f, m] = p.useState(null), y = de(t, (w) => m(w)), h = p.useRef(!1), g = f ? u || !!f.closest("form") : !0, [b, x] = ut({
      prop: o,
      defaultProp: a ?? !1,
      onChange: d,
      caller: rr
    });
    return /* @__PURE__ */ Q(Yp, { scope: n, checked: b, disabled: i, children: [
      /* @__PURE__ */ v(
        ne.button,
        {
          type: "button",
          role: "switch",
          "aria-checked": b,
          "aria-required": s,
          "data-state": si(b),
          "data-disabled": i ? "" : void 0,
          disabled: i,
          value: l,
          ...c,
          ref: y,
          onClick: se(e.onClick, (w) => {
            x((M) => !M), g && (h.current = w.isPropagationStopped(), h.current || w.stopPropagation());
          })
        }
      ),
      g && /* @__PURE__ */ v(
        ai,
        {
          control: f,
          bubbles: !h.current,
          name: r,
          value: l,
          checked: b,
          required: s,
          disabled: i,
          form: u,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
ni.displayName = rr;
var ri = "SwitchThumb", oi = p.forwardRef(
  (e, t) => {
    const { __scopeSwitch: n, ...r } = e, o = Bp(ri, n);
    return /* @__PURE__ */ v(
      ne.span,
      {
        "data-state": si(o.checked),
        "data-disabled": o.disabled ? "" : void 0,
        ...r,
        ref: t
      }
    );
  }
);
oi.displayName = ri;
var zp = "SwitchBubbleInput", ai = p.forwardRef(
  ({
    __scopeSwitch: e,
    control: t,
    checked: n,
    bubbles: r = !0,
    ...o
  }, a) => {
    const s = p.useRef(null), i = de(s, a), l = po(n), d = Qn(t);
    return p.useEffect(() => {
      const u = s.current;
      if (!u) return;
      const c = window.HTMLInputElement.prototype, m = Object.getOwnPropertyDescriptor(
        c,
        "checked"
      ).set;
      if (l !== n && m) {
        const y = new Event("click", { bubbles: r });
        m.call(u, n), u.dispatchEvent(y);
      }
    }, [l, n, r]), /* @__PURE__ */ v(
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
ai.displayName = zp;
function si(e) {
  return e ? "checked" : "unchecked";
}
var ii = ni, Lp = oi;
const Hp = Be(
  W(
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
), jp = C.forwardRef(({ className: e, variant: t, ...n }, r) => /* @__PURE__ */ v(
  ii,
  {
    className: W(Hp({ variant: t }), e),
    ...n,
    ref: r,
    children: /* @__PURE__ */ v(
      Lp,
      {
        className: W(
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
jp.displayName = ii.displayName;
function ci(e) {
  const t = e + "CollectionProvider", [n, r] = ze(t), [o, a] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), s = (h) => {
    const { scope: g, children: b } = h, x = C.useRef(null), w = C.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ v(o, { scope: g, itemMap: w, collectionRef: x, children: b });
  };
  s.displayName = t;
  const i = e + "CollectionSlot", l = /* @__PURE__ */ mn(i), d = C.forwardRef(
    (h, g) => {
      const { scope: b, children: x } = h, w = a(i, b), M = de(g, w.collectionRef);
      return /* @__PURE__ */ v(l, { ref: M, children: x });
    }
  );
  d.displayName = i;
  const u = e + "CollectionItemSlot", c = "data-radix-collection-item", f = /* @__PURE__ */ mn(u), m = C.forwardRef(
    (h, g) => {
      const { scope: b, children: x, ...w } = h, M = C.useRef(null), S = de(g, M), k = a(u, b);
      return C.useEffect(() => (k.itemMap.set(M, { ref: M, ...w }), () => void k.itemMap.delete(M))), /* @__PURE__ */ v(f, { [c]: "", ref: S, children: x });
    }
  );
  m.displayName = u;
  function y(h) {
    const g = a(e + "CollectionConsumer", h);
    return C.useCallback(() => {
      const x = g.collectionRef.current;
      if (!x) return [];
      const w = Array.from(x.querySelectorAll(`[${c}]`));
      return Array.from(g.itemMap.values()).sort(
        (k, N) => w.indexOf(k.ref.current) - w.indexOf(N.ref.current)
      );
    }, [g.collectionRef, g.itemMap]);
  }
  return [
    { Provider: s, Slot: d, ItemSlot: m },
    y,
    r
  ];
}
var Vp = p.createContext(void 0);
function go(e) {
  const t = p.useContext(Vp);
  return e || t || "ltr";
}
var Pr = "rovingFocusGroup.onEntryFocus", Gp = { bubbles: !1, cancelable: !0 }, Cn = "RovingFocusGroup", [Yr, li, Up] = ci(Cn), [qp, di] = ze(
  Cn,
  [Up]
), [Xp, Kp] = qp(Cn), ui = p.forwardRef(
  (e, t) => /* @__PURE__ */ v(Yr.Provider, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ v(Yr.Slot, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ v(Qp, { ...e, ref: t }) }) })
);
ui.displayName = Cn;
var Qp = p.forwardRef((e, t) => {
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
  } = e, f = p.useRef(null), m = de(t, f), y = go(a), [h, g] = ut({
    prop: s,
    defaultProp: i ?? null,
    onChange: l,
    caller: Cn
  }), [b, x] = p.useState(!1), w = Et(d), M = li(n), S = p.useRef(!1), [k, N] = p.useState(0);
  return p.useEffect(() => {
    const A = f.current;
    if (A)
      return A.addEventListener(Pr, w), () => A.removeEventListener(Pr, w);
  }, [w]), /* @__PURE__ */ v(
    Xp,
    {
      scope: n,
      orientation: r,
      dir: y,
      loop: o,
      currentTabStopId: h,
      onItemFocus: p.useCallback(
        (A) => g(A),
        [g]
      ),
      onItemShiftTab: p.useCallback(() => x(!0), []),
      onFocusableItemAdd: p.useCallback(
        () => N((A) => A + 1),
        []
      ),
      onFocusableItemRemove: p.useCallback(
        () => N((A) => A - 1),
        []
      ),
      children: /* @__PURE__ */ v(
        ne.div,
        {
          tabIndex: b || k === 0 ? -1 : 0,
          "data-orientation": r,
          ...c,
          ref: m,
          style: { outline: "none", ...e.style },
          onMouseDown: se(e.onMouseDown, () => {
            S.current = !0;
          }),
          onFocus: se(e.onFocus, (A) => {
            const Y = !S.current;
            if (A.target === A.currentTarget && Y && !b) {
              const _ = new CustomEvent(Pr, Gp);
              if (A.currentTarget.dispatchEvent(_), !_.defaultPrevented) {
                const $ = M().filter((D) => D.focusable), F = $.find((D) => D.active), G = $.find((D) => D.id === h), P = [F, G, ...$].filter(
                  Boolean
                ).map((D) => D.ref.current);
                hi(P, u);
              }
            }
            S.current = !1;
          }),
          onBlur: se(e.onBlur, () => x(!1))
        }
      )
    }
  );
}), fi = "RovingFocusGroupItem", mi = p.forwardRef(
  (e, t) => {
    const {
      __scopeRovingFocusGroup: n,
      focusable: r = !0,
      active: o = !1,
      tabStopId: a,
      children: s,
      ...i
    } = e, l = Ot(), d = a || l, u = Kp(fi, n), c = u.currentTabStopId === d, f = li(n), { onFocusableItemAdd: m, onFocusableItemRemove: y, currentTabStopId: h } = u;
    return p.useEffect(() => {
      if (r)
        return m(), () => y();
    }, [r, m, y]), /* @__PURE__ */ v(
      Yr.ItemSlot,
      {
        scope: n,
        id: d,
        focusable: r,
        active: o,
        children: /* @__PURE__ */ v(
          ne.span,
          {
            tabIndex: c ? 0 : -1,
            "data-orientation": u.orientation,
            ...i,
            ref: t,
            onMouseDown: se(e.onMouseDown, (g) => {
              r ? u.onItemFocus(d) : g.preventDefault();
            }),
            onFocus: se(e.onFocus, () => u.onItemFocus(d)),
            onKeyDown: se(e.onKeyDown, (g) => {
              if (g.key === "Tab" && g.shiftKey) {
                u.onItemShiftTab();
                return;
              }
              if (g.target !== g.currentTarget) return;
              const b = eg(g, u.orientation, u.dir);
              if (b !== void 0) {
                if (g.metaKey || g.ctrlKey || g.altKey || g.shiftKey) return;
                g.preventDefault();
                let w = f().filter((M) => M.focusable).map((M) => M.ref.current);
                if (b === "last") w.reverse();
                else if (b === "prev" || b === "next") {
                  b === "prev" && w.reverse();
                  const M = w.indexOf(g.currentTarget);
                  w = u.loop ? tg(w, M + 1) : w.slice(M + 1);
                }
                setTimeout(() => hi(w));
              }
            }),
            children: typeof s == "function" ? s({ isCurrentTabStop: c, hasTabStop: h != null }) : s
          }
        )
      }
    );
  }
);
mi.displayName = fi;
var Zp = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function Jp(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function eg(e, t, n) {
  const r = Jp(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r)))
    return Zp[r];
}
function hi(e, t = !1) {
  const n = document.activeElement;
  for (const r of e)
    if (r === n || (r.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function tg(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var ng = ui, rg = mi, bo = "Radio", [og, pi] = ze(bo), [ag, sg] = og(bo), gi = p.forwardRef(
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
    } = e, [c, f] = p.useState(null), m = de(t, (g) => f(g)), y = p.useRef(!1), h = c ? d || !!c.closest("form") : !0;
    return /* @__PURE__ */ Q(ag, { scope: n, checked: o, disabled: s, children: [
      /* @__PURE__ */ v(
        ne.button,
        {
          type: "button",
          role: "radio",
          "aria-checked": o,
          "data-state": wi(o),
          "data-disabled": s ? "" : void 0,
          disabled: s,
          value: i,
          ...u,
          ref: m,
          onClick: se(e.onClick, (g) => {
            o || l == null || l(), h && (y.current = g.isPropagationStopped(), y.current || g.stopPropagation());
          })
        }
      ),
      h && /* @__PURE__ */ v(
        yi,
        {
          control: c,
          bubbles: !y.current,
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
gi.displayName = bo;
var bi = "RadioIndicator", vi = p.forwardRef(
  (e, t) => {
    const { __scopeRadio: n, forceMount: r, ...o } = e, a = sg(bi, n);
    return /* @__PURE__ */ v(dt, { present: r || a.checked, children: /* @__PURE__ */ v(
      ne.span,
      {
        "data-state": wi(a.checked),
        "data-disabled": a.disabled ? "" : void 0,
        ...o,
        ref: t
      }
    ) });
  }
);
vi.displayName = bi;
var ig = "RadioBubbleInput", yi = p.forwardRef(
  ({
    __scopeRadio: e,
    control: t,
    checked: n,
    bubbles: r = !0,
    ...o
  }, a) => {
    const s = p.useRef(null), i = de(s, a), l = po(n), d = Qn(t);
    return p.useEffect(() => {
      const u = s.current;
      if (!u) return;
      const c = window.HTMLInputElement.prototype, m = Object.getOwnPropertyDescriptor(
        c,
        "checked"
      ).set;
      if (l !== n && m) {
        const y = new Event("click", { bubbles: r });
        m.call(u, n), u.dispatchEvent(y);
      }
    }, [l, n, r]), /* @__PURE__ */ v(
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
yi.displayName = ig;
function wi(e) {
  return e ? "checked" : "unchecked";
}
var cg = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], or = "RadioGroup", [lg] = ze(or, [
  di,
  pi
]), xi = di(), ki = pi(), [dg, ug] = lg(or), Ci = p.forwardRef(
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
    } = e, m = xi(n), y = go(d), [h, g] = ut({
      prop: a,
      defaultProp: o ?? null,
      onChange: c,
      caller: or
    });
    return /* @__PURE__ */ v(
      dg,
      {
        scope: n,
        name: r,
        required: s,
        disabled: i,
        value: h,
        onValueChange: g,
        children: /* @__PURE__ */ v(
          ng,
          {
            asChild: !0,
            ...m,
            orientation: l,
            dir: y,
            loop: u,
            children: /* @__PURE__ */ v(
              ne.div,
              {
                role: "radiogroup",
                "aria-required": s,
                "aria-orientation": l,
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
Ci.displayName = or;
var Mi = "RadioGroupItem", Si = p.forwardRef(
  (e, t) => {
    const { __scopeRadioGroup: n, disabled: r, ...o } = e, a = ug(Mi, n), s = a.disabled || r, i = xi(n), l = ki(n), d = p.useRef(null), u = de(t, d), c = a.value === o.value, f = p.useRef(!1);
    return p.useEffect(() => {
      const m = (h) => {
        cg.includes(h.key) && (f.current = !0);
      }, y = () => f.current = !1;
      return document.addEventListener("keydown", m), document.addEventListener("keyup", y), () => {
        document.removeEventListener("keydown", m), document.removeEventListener("keyup", y);
      };
    }, []), /* @__PURE__ */ v(
      rg,
      {
        asChild: !0,
        ...i,
        focusable: !s,
        active: c,
        children: /* @__PURE__ */ v(
          gi,
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
Si.displayName = Mi;
var fg = "RadioGroupIndicator", Di = p.forwardRef(
  (e, t) => {
    const { __scopeRadioGroup: n, ...r } = e, o = ki(n);
    return /* @__PURE__ */ v(vi, { ...o, ...r, ref: t });
  }
);
Di.displayName = fg;
var Ni = Ci, Oi = Si, mg = Di;
const hg = C.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ v(Ni, { className: e, ...t, ref: n }));
hg.displayName = Ni.displayName;
const pg = Be(
  W(
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
        black: W(
          "border-cms-gray-300 text-cms-black",
          "data-[state=checked]:border-cms-black"
        ),
        default: W(
          "border-cms-gray-300 text-cms-primary-300",
          "data-[state=checked]:border-cms-primary-300"
        ),
        green: W(
          "border-cms-gray-300 text-cms-green-500",
          "data-[state=checked]:border-cms-green-500"
        ),
        blue: W(
          "border-cms-gray-300 text-cms-blue-700",
          "data-[state=checked]:border-cms-blue-700"
        ),
        red: W(
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
), gg = Be(
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
), bg = C.forwardRef(({ className: e, variant: t, size: n, ...r }, o) => /* @__PURE__ */ v(
  Oi,
  {
    ref: o,
    className: W(pg({ variant: t, size: n }), e),
    ...r,
    children: /* @__PURE__ */ v(
      mg,
      {
        className: W(gg({ variant: t, size: n }))
      }
    )
  }
));
bg.displayName = Oi.displayName;
var ar = "Collapsible", [vg, Ei] = ze(ar), [yg, vo] = vg(ar), Pi = p.forwardRef(
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
      caller: ar
    });
    return /* @__PURE__ */ v(
      yg,
      {
        scope: n,
        disabled: a,
        contentId: Ot(),
        open: l,
        onOpenToggle: p.useCallback(() => d((u) => !u), [d]),
        children: /* @__PURE__ */ v(
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
Pi.displayName = ar;
var Ri = "CollapsibleTrigger", Ai = p.forwardRef(
  (e, t) => {
    const { __scopeCollapsible: n, ...r } = e, o = vo(Ri, n);
    return /* @__PURE__ */ v(
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
Ai.displayName = Ri;
var yo = "CollapsibleContent", Ti = p.forwardRef(
  (e, t) => {
    const { forceMount: n, ...r } = e, o = vo(yo, e.__scopeCollapsible);
    return /* @__PURE__ */ v(dt, { present: n || o.open, children: ({ present: a }) => /* @__PURE__ */ v(wg, { ...r, ref: t, present: a }) });
  }
);
Ti.displayName = yo;
var wg = p.forwardRef((e, t) => {
  const { __scopeCollapsible: n, present: r, children: o, ...a } = e, s = vo(yo, n), [i, l] = p.useState(r), d = p.useRef(null), u = de(t, d), c = p.useRef(0), f = c.current, m = p.useRef(0), y = m.current, h = s.open || i, g = p.useRef(h), b = p.useRef(void 0);
  return p.useEffect(() => {
    const x = requestAnimationFrame(() => g.current = !1);
    return () => cancelAnimationFrame(x);
  }, []), it(() => {
    const x = d.current;
    if (x) {
      b.current = b.current || {
        transitionDuration: x.style.transitionDuration,
        animationName: x.style.animationName
      }, x.style.transitionDuration = "0s", x.style.animationName = "none";
      const w = x.getBoundingClientRect();
      c.current = w.height, m.current = w.width, g.current || (x.style.transitionDuration = b.current.transitionDuration, x.style.animationName = b.current.animationName), l(r);
    }
  }, [s.open, r]), /* @__PURE__ */ v(
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
        "--radix-collapsible-content-width": y ? `${y}px` : void 0,
        ...e.style
      },
      children: h && o
    }
  );
});
function wo(e) {
  return e ? "open" : "closed";
}
var xg = Pi, kg = Ai, Cg = Ti, Le = "Accordion", Mg = ["Home", "End", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"], [xo, Sg, Dg] = ci(Le), [sr] = ze(Le, [
  Dg,
  Ei
]), ko = Ei(), _i = C.forwardRef(
  (e, t) => {
    const { type: n, ...r } = e, o = r, a = r;
    return /* @__PURE__ */ v(xo.Provider, { scope: e.__scopeAccordion, children: n === "multiple" ? /* @__PURE__ */ v(Pg, { ...a, ref: t }) : /* @__PURE__ */ v(Eg, { ...o, ref: t }) });
  }
);
_i.displayName = Le;
var [Ii, Ng] = sr(Le), [Wi, Og] = sr(
  Le,
  { collapsible: !1 }
), Eg = C.forwardRef(
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
    return /* @__PURE__ */ v(
      Ii,
      {
        scope: e.__scopeAccordion,
        value: C.useMemo(() => i ? [i] : [], [i]),
        onItemOpen: l,
        onItemClose: C.useCallback(() => a && l(""), [a, l]),
        children: /* @__PURE__ */ v(Wi, { scope: e.__scopeAccordion, collapsible: a, children: /* @__PURE__ */ v($i, { ...s, ref: t }) })
      }
    );
  }
), Pg = C.forwardRef((e, t) => {
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
  return /* @__PURE__ */ v(
    Ii,
    {
      scope: e.__scopeAccordion,
      value: s,
      onItemOpen: l,
      onItemClose: d,
      children: /* @__PURE__ */ v(Wi, { scope: e.__scopeAccordion, collapsible: !0, children: /* @__PURE__ */ v($i, { ...a, ref: t }) })
    }
  );
}), [Rg, ir] = sr(Le), $i = C.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, disabled: r, dir: o, orientation: a = "vertical", ...s } = e, i = C.useRef(null), l = de(i, t), d = Sg(n), c = go(o) === "ltr", f = se(e.onKeyDown, (m) => {
      var A;
      if (!Mg.includes(m.key)) return;
      const y = m.target, h = d().filter((Y) => {
        var _;
        return !((_ = Y.ref.current) != null && _.disabled);
      }), g = h.findIndex((Y) => Y.ref.current === y), b = h.length;
      if (g === -1) return;
      m.preventDefault();
      let x = g;
      const w = 0, M = b - 1, S = () => {
        x = g + 1, x > M && (x = w);
      }, k = () => {
        x = g - 1, x < w && (x = M);
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
      const N = x % b;
      (A = h[N].ref.current) == null || A.focus();
    });
    return /* @__PURE__ */ v(
      Rg,
      {
        scope: n,
        disabled: r,
        direction: o,
        orientation: a,
        children: /* @__PURE__ */ v(xo.Slot, { scope: n, children: /* @__PURE__ */ v(
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
), Vn = "AccordionItem", [Ag, Co] = sr(Vn), Fi = C.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, value: r, ...o } = e, a = ir(Vn, n), s = Ng(Vn, n), i = ko(n), l = Ot(), d = r && s.value.includes(r) || !1, u = a.disabled || e.disabled;
    return /* @__PURE__ */ v(
      Ag,
      {
        scope: n,
        open: d,
        disabled: u,
        triggerId: l,
        children: /* @__PURE__ */ v(
          xg,
          {
            "data-orientation": a.orientation,
            "data-state": ji(d),
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
Fi.displayName = Vn;
var Yi = "AccordionHeader", Bi = C.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, ...r } = e, o = ir(Le, n), a = Co(Yi, n);
    return /* @__PURE__ */ v(
      ne.h3,
      {
        "data-orientation": o.orientation,
        "data-state": ji(a.open),
        "data-disabled": a.disabled ? "" : void 0,
        ...r,
        ref: t
      }
    );
  }
);
Bi.displayName = Yi;
var Br = "AccordionTrigger", zi = C.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, ...r } = e, o = ir(Le, n), a = Co(Br, n), s = Og(Br, n), i = ko(n);
    return /* @__PURE__ */ v(xo.ItemSlot, { scope: n, children: /* @__PURE__ */ v(
      kg,
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
zi.displayName = Br;
var Li = "AccordionContent", Hi = C.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, ...r } = e, o = ir(Le, n), a = Co(Li, n), s = ko(n);
    return /* @__PURE__ */ v(
      Cg,
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
Hi.displayName = Li;
function ji(e) {
  return e ? "open" : "closed";
}
var Tg = _i, _g = Fi, Ig = Bi, Wg = zi, $g = Hi;
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fg = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Yg = (e) => e.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (t, n, r) => r ? r.toUpperCase() : n.toLowerCase()
), ga = (e) => {
  const t = Yg(e);
  return t.charAt(0).toUpperCase() + t.slice(1);
}, Vi = (...e) => e.filter((t, n, r) => !!t && t.trim() !== "" && r.indexOf(t) === n).join(" ").trim(), Bg = (e) => {
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
var zg = {
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
const Lg = Ct(
  ({
    color: e = "currentColor",
    size: t = 24,
    strokeWidth: n = 2,
    absoluteStrokeWidth: r,
    className: o = "",
    children: a,
    iconNode: s,
    ...i
  }, l) => Rr(
    "svg",
    {
      ref: l,
      ...zg,
      width: t,
      height: t,
      stroke: e,
      strokeWidth: r ? Number(n) * 24 / Number(t) : n,
      className: Vi("lucide", o),
      ...!a && !Bg(i) && { "aria-hidden": "true" },
      ...i
    },
    [
      ...s.map(([d, u]) => Rr(d, u)),
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
const tn = (e, t) => {
  const n = Ct(
    ({ className: r, ...o }, a) => Rr(Lg, {
      ref: a,
      iconNode: t,
      className: Vi(
        `lucide-${Fg(ga(e))}`,
        `lucide-${e}`,
        r
      ),
      ...o
    })
  );
  return n.displayName = ga(e), n;
};
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hg = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], jg = tn("check", Hg);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vg = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], Gg = tn("chevron-down", Vg);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ug = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
], Gi = tn("circle-check", Ug);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qg = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
], Xg = tn("circle-x", qg);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Kg = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
], Ui = tn("triangle-alert", Kg);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qg = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], Zg = tn("x", Qg), Jg = ({
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
  return /* @__PURE__ */ Q(_g, { value: e.url, className: "border-none", children: [
    /* @__PURE__ */ v(Ig, { className: "m-0", children: /* @__PURE__ */ Q(
      Wg,
      {
        onClick: (i) => {
          e.subMenu || (i.preventDefault(), o(e.url));
        },
        className: W(
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
          e.icon && /* @__PURE__ */ v(
            "div",
            {
              className: W(
                "mr-3 flex items-center",
                "[&>svg]:w-6 [&>svg]:h-6",
                !e.subMenu && n || a ? "text-cms-black" : "text-white"
              ),
              children: e.icon
            }
          ),
          /* @__PURE__ */ v(
            "span",
            {
              className: W(
                !e.subMenu && n || a ? "text-cms-black" : "text-white"
              ),
              children: e.title
            }
          ),
          e.subMenu && /* @__PURE__ */ v(
            Gg,
            {
              className: W(
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
    e.subMenu && /* @__PURE__ */ v(
      $g,
      {
        className: W(
          "overflow-hidden",
          "bg-[#232427]",
          "data-[state=open]:animate-accordion-down",
          "data-[state=closed]:animate-accordion-up"
        ),
        children: e.subMenu.map((i) => {
          const l = i.url === r;
          return /* @__PURE__ */ v(
            "div",
            {
              onClick: () => o(i.url),
              className: W(
                "flex items-center",
                "h-13 px-5 pl-14",
                "cursor-pointer",
                "transition-colors",
                "hover:bg-[#2e2f32]"
              ),
              children: /* @__PURE__ */ v(
                "span",
                {
                  className: W(
                    "text-md font-bold",
                    "transition-colors",
                    l ? "text-cms-primary-400 font-bold" : "text-[#b4b4b4]"
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
}, eb = C.forwardRef(
  ({ title: e, menus: t, selectedUrl: n, onMenuClick: r, headerSlot: o, className: a, ...s }, i) => {
    const [l, d] = Ee([]);
    return /* @__PURE__ */ Q(
      "div",
      {
        ref: i,
        className: W(
          "flex flex-col",
          "w-70 min-w-70 max-w-70 h-screen",
          "bg-[#2c2d30] text-white",
          a
        ),
        ...s,
        children: [
          o,
          e && !o && /* @__PURE__ */ v("div", { className: "px-5 py-4 border-b border-[#3a3b3e]", children: /* @__PURE__ */ v("h2", { className: "text-lg font-semibold text-white", children: e }) }),
          /* @__PURE__ */ v(
            "div",
            {
              className: W(
                "flex-1 overflow-y-auto",
                "scrollbar-thin",
                "scrollbar-thumb-[#3a3b3e]",
                "scrollbar-track-transparent"
              ),
              children: /* @__PURE__ */ v(
                Tg,
                {
                  type: "multiple",
                  value: l,
                  onValueChange: d,
                  children: t.map((u) => /* @__PURE__ */ v(
                    Jg,
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
eb.displayName = "SideNavigation";
var cr = "Checkbox", [tb] = ze(cr), [nb, Mo] = tb(cr);
function rb(e) {
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
    caller: cr
  }), [y, h] = p.useState(null), [g, b] = p.useState(null), x = p.useRef(!1), w = y ? !!s || !!y.closest("form") : (
    // We set this to true by default so that events bubble to forms without JS (SSR)
    !0
  ), M = {
    checked: f,
    disabled: a,
    setChecked: m,
    control: y,
    setControl: h,
    name: i,
    form: s,
    value: u,
    hasConsumerStoppedPropagationRef: x,
    required: d,
    defaultChecked: yt(o) ? !1 : o,
    isFormControl: w,
    bubbleInput: g,
    setBubbleInput: b
  };
  return /* @__PURE__ */ v(
    nb,
    {
      scope: t,
      ...M,
      children: ob(c) ? c(M) : r
    }
  );
}
var qi = "CheckboxTrigger", Xi = p.forwardRef(
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
      bubbleInput: y
    } = Mo(qi, e), h = de(o, u), g = p.useRef(l);
    return p.useEffect(() => {
      const b = a == null ? void 0 : a.form;
      if (b) {
        const x = () => c(g.current);
        return b.addEventListener("reset", x), () => b.removeEventListener("reset", x);
      }
    }, [a, c]), /* @__PURE__ */ v(
      ne.button,
      {
        type: "button",
        role: "checkbox",
        "aria-checked": yt(l) ? "mixed" : l,
        "aria-required": d,
        "data-state": tc(l),
        "data-disabled": i ? "" : void 0,
        disabled: i,
        value: s,
        ...r,
        ref: h,
        onKeyDown: se(t, (b) => {
          b.key === "Enter" && b.preventDefault();
        }),
        onClick: se(n, (b) => {
          c((x) => yt(x) ? !0 : !x), y && m && (f.current = b.isPropagationStopped(), f.current || b.stopPropagation());
        })
      }
    );
  }
);
Xi.displayName = qi;
var Ki = p.forwardRef(
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
    return /* @__PURE__ */ v(
      rb,
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
        internal_do_not_use_render: ({ isFormControl: f }) => /* @__PURE__ */ Q(Bn, { children: [
          /* @__PURE__ */ v(
            Xi,
            {
              ...c,
              ref: t,
              __scopeCheckbox: n
            }
          ),
          f && /* @__PURE__ */ v(
            ec,
            {
              __scopeCheckbox: n
            }
          )
        ] })
      }
    );
  }
);
Ki.displayName = cr;
var Qi = "CheckboxIndicator", Zi = p.forwardRef(
  (e, t) => {
    const { __scopeCheckbox: n, forceMount: r, ...o } = e, a = Mo(Qi, n);
    return /* @__PURE__ */ v(
      dt,
      {
        present: r || yt(a.checked) || a.checked === !0,
        children: /* @__PURE__ */ v(
          ne.span,
          {
            "data-state": tc(a.checked),
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
Zi.displayName = Qi;
var Ji = "CheckboxBubbleInput", ec = p.forwardRef(
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
    } = Mo(Ji, e), y = de(n, m), h = po(a), g = Qn(r);
    p.useEffect(() => {
      const x = f;
      if (!x) return;
      const w = window.HTMLInputElement.prototype, S = Object.getOwnPropertyDescriptor(
        w,
        "checked"
      ).set, k = !o.current;
      if (h !== a && S) {
        const N = new Event("click", { bubbles: k });
        x.indeterminate = yt(a), S.call(x, yt(a) ? !1 : a), x.dispatchEvent(N);
      }
    }, [f, h, a, o]);
    const b = p.useRef(yt(a) ? !1 : a);
    return /* @__PURE__ */ v(
      ne.input,
      {
        type: "checkbox",
        "aria-hidden": !0,
        defaultChecked: s ?? b.current,
        required: i,
        disabled: l,
        name: d,
        value: u,
        form: c,
        ...t,
        tabIndex: -1,
        ref: y,
        style: {
          ...t.style,
          ...g,
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
ec.displayName = Ji;
function ob(e) {
  return typeof e == "function";
}
function yt(e) {
  return e === "indeterminate";
}
function tc(e) {
  return yt(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
const ab = C.forwardRef(({ className: e, label: t, id: n, disabled: r, ...o }, a) => {
  const s = n || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
  return /* @__PURE__ */ Q("div", { className: "flex items-center", children: [
    /* @__PURE__ */ v(
      Ki,
      {
        ref: a,
        id: s,
        disabled: r,
        className: W(
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
        children: /* @__PURE__ */ v(
          Zi,
          {
            className: W("flex items-center justify-center", "text-white"),
            children: /* @__PURE__ */ v(jg, { className: "h-3 w-3", strokeWidth: 3 })
          }
        )
      }
    ),
    t && /* @__PURE__ */ v(
      "label",
      {
        htmlFor: s,
        className: W(
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
ab.displayName = "Checkbox";
var lr = "Dialog", [nc] = ze(lr), [sb, He] = nc(lr), rc = (e) => {
  const {
    __scopeDialog: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: a,
    modal: s = !0
  } = e, i = p.useRef(null), l = p.useRef(null), [d, u] = ut({
    prop: r,
    defaultProp: o ?? !1,
    onChange: a,
    caller: lr
  });
  return /* @__PURE__ */ v(
    sb,
    {
      scope: t,
      triggerRef: i,
      contentRef: l,
      contentId: Ot(),
      titleId: Ot(),
      descriptionId: Ot(),
      open: d,
      onOpenChange: u,
      onOpenToggle: p.useCallback(() => u((c) => !c), [u]),
      modal: s,
      children: n
    }
  );
};
rc.displayName = lr;
var oc = "DialogTrigger", ib = p.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = He(oc, n), a = de(t, o.triggerRef);
    return /* @__PURE__ */ v(
      ne.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": o.open,
        "aria-controls": o.contentId,
        "data-state": No(o.open),
        ...r,
        ref: a,
        onClick: se(e.onClick, o.onOpenToggle)
      }
    );
  }
);
ib.displayName = oc;
var So = "DialogPortal", [cb, ac] = nc(So, {
  forceMount: void 0
}), sc = (e) => {
  const { __scopeDialog: t, forceMount: n, children: r, container: o } = e, a = He(So, t);
  return /* @__PURE__ */ v(cb, { scope: t, forceMount: n, children: p.Children.map(r, (s) => /* @__PURE__ */ v(dt, { present: n || a.open, children: /* @__PURE__ */ v(eo, { asChild: !0, container: o, children: s }) })) });
};
sc.displayName = So;
var Gn = "DialogOverlay", ic = p.forwardRef(
  (e, t) => {
    const n = ac(Gn, e.__scopeDialog), { forceMount: r = n.forceMount, ...o } = e, a = He(Gn, e.__scopeDialog);
    return a.modal ? /* @__PURE__ */ v(dt, { present: r || a.open, children: /* @__PURE__ */ v(db, { ...o, ref: t }) }) : null;
  }
);
ic.displayName = Gn;
var lb = /* @__PURE__ */ mn("DialogOverlay.RemoveScroll"), db = p.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = He(Gn, n);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ v(to, { as: lb, allowPinchZoom: !0, shards: [o.contentRef], children: /* @__PURE__ */ v(
        ne.div,
        {
          "data-state": No(o.open),
          ...r,
          ref: t,
          style: { pointerEvents: "auto", ...r.style }
        }
      ) })
    );
  }
), Rt = "DialogContent", cc = p.forwardRef(
  (e, t) => {
    const n = ac(Rt, e.__scopeDialog), { forceMount: r = n.forceMount, ...o } = e, a = He(Rt, e.__scopeDialog);
    return /* @__PURE__ */ v(dt, { present: r || a.open, children: a.modal ? /* @__PURE__ */ v(ub, { ...o, ref: t }) : /* @__PURE__ */ v(fb, { ...o, ref: t }) });
  }
);
cc.displayName = Rt;
var ub = p.forwardRef(
  (e, t) => {
    const n = He(Rt, e.__scopeDialog), r = p.useRef(null), o = de(t, n.contentRef, r);
    return p.useEffect(() => {
      const a = r.current;
      if (a) return os(a);
    }, []), /* @__PURE__ */ v(
      lc,
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
), fb = p.forwardRef(
  (e, t) => {
    const n = He(Rt, e.__scopeDialog), r = p.useRef(!1), o = p.useRef(!1);
    return /* @__PURE__ */ v(
      lc,
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
), lc = p.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, trapFocus: r, onOpenAutoFocus: o, onCloseAutoFocus: a, ...s } = e, i = He(Rt, n), l = p.useRef(null), d = de(t, l);
    return Aa(), /* @__PURE__ */ Q(Bn, { children: [
      /* @__PURE__ */ v(
        Vr,
        {
          asChild: !0,
          loop: !0,
          trapped: r,
          onMountAutoFocus: o,
          onUnmountAutoFocus: a,
          children: /* @__PURE__ */ v(
            jr,
            {
              role: "dialog",
              id: i.contentId,
              "aria-describedby": i.descriptionId,
              "aria-labelledby": i.titleId,
              "data-state": No(i.open),
              ...s,
              ref: d,
              onDismiss: () => i.onOpenChange(!1)
            }
          )
        }
      ),
      /* @__PURE__ */ Q(Bn, { children: [
        /* @__PURE__ */ v(mb, { titleId: i.titleId }),
        /* @__PURE__ */ v(pb, { contentRef: l, descriptionId: i.descriptionId })
      ] })
    ] });
  }
), Do = "DialogTitle", dc = p.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = He(Do, n);
    return /* @__PURE__ */ v(ne.h2, { id: o.titleId, ...r, ref: t });
  }
);
dc.displayName = Do;
var uc = "DialogDescription", fc = p.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = He(uc, n);
    return /* @__PURE__ */ v(ne.p, { id: o.descriptionId, ...r, ref: t });
  }
);
fc.displayName = uc;
var mc = "DialogClose", hc = p.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = He(mc, n);
    return /* @__PURE__ */ v(
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
hc.displayName = mc;
function No(e) {
  return e ? "open" : "closed";
}
var pc = "DialogTitleWarning", [dv, gc] = ol(pc, {
  contentName: Rt,
  titleName: Do,
  docsSlug: "dialog"
}), mb = ({ titleId: e }) => {
  const t = gc(pc), n = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;
  return p.useEffect(() => {
    e && (document.getElementById(e) || console.error(n));
  }, [n, e]), null;
}, hb = "DialogDescriptionWarning", pb = ({ contentRef: e, descriptionId: t }) => {
  const r = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${gc(hb).contentName}}.`;
  return p.useEffect(() => {
    var a;
    const o = (a = e.current) == null ? void 0 : a.getAttribute("aria-describedby");
    t && o && (document.getElementById(t) || console.warn(r));
  }, [r, e, t]), null;
}, gb = rc, bb = sc, vb = ic, yb = cc, wb = dc, xb = fc, kb = hc;
const Cb = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg"
}, nn = C.forwardRef(
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
  }, d) => /* @__PURE__ */ v(gb, { open: e, onOpenChange: t, children: /* @__PURE__ */ Q(bb, { children: [
    /* @__PURE__ */ v(
      vb,
      {
        className: W(
          "fixed inset-0 z-50 bg-black/50",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        )
      }
    ),
    /* @__PURE__ */ Q(
      yb,
      {
        ref: d,
        className: W(
          "fixed left-[50%] top-[50%] z-50",
          "translate-x-[-50%] translate-y-[-50%]",
          "w-full",
          Cb[l],
          "bg-white rounded-lg shadow-lg",
          "p-6",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          s
        ),
        children: [
          i && /* @__PURE__ */ Q(
            kb,
            {
              className: W(
                "absolute right-4 top-4 rounded-sm opacity-70",
                "transition-opacity hover:opacity-100",
                "focus:outline-none focus:ring-2 focus:ring-cms-gray-400",
                "disabled:pointer-events-none"
              ),
              children: [
                /* @__PURE__ */ v(Zg, { className: "h-4 w-4" }),
                /* @__PURE__ */ v("span", { className: "sr-only", children: "Close" })
              ]
            }
          ),
          n && /* @__PURE__ */ v("div", { className: "flex justify-center mb-4", children: n }),
          r && /* @__PURE__ */ v(
            wb,
            {
              className: W(
                "text-lg font-bold text-cms-gray-900 mb-2",
                "flex items-center justify-center"
              ),
              children: r
            }
          ),
          /* @__PURE__ */ v(xb, { className: "text-sm text-cms-gray-700 text-center", children: o }),
          a && /* @__PURE__ */ v("div", { className: "mt-6", children: a })
        ]
      }
    )
  ] }) })
);
nn.displayName = "Modal";
const Mb = C.forwardRef(
  ({
    open: e,
    onOpenChange: t,
    title: n = "확인",
    message: r,
    confirmText: o = "확인",
    onConfirm: a,
    className: s
  }, i) => /* @__PURE__ */ v(
    nn,
    {
      ref: i,
      open: e,
      onOpenChange: t,
      title: n,
      footer: /* @__PURE__ */ v(
        wt,
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
      icon: /* @__PURE__ */ v(Gi, { className: "w-15 h-15 text-cms-black" }),
      children: /* @__PURE__ */ v("div", { className: "text-sm text-cms-gray-700", children: r })
    }
  )
);
Mb.displayName = "ConfirmModal";
const Sb = C.forwardRef(
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
  }, d) => /* @__PURE__ */ v(
    nn,
    {
      ref: d,
      open: e,
      onOpenChange: t,
      icon: /* @__PURE__ */ v(Ui, { className: "w-15 h-15 text-cms-red-400" }),
      title: n,
      footer: /* @__PURE__ */ Q("div", { className: "flex gap-2 w-full", children: [
        /* @__PURE__ */ v(
          wt,
          {
            onClick: () => {
              i == null || i(), t(!1);
            },
            variant: "outline",
            className: "flex-1 h-12",
            children: a
          }
        ),
        /* @__PURE__ */ v(
          wt,
          {
            onClick: () => {
              s(), t(!1);
            },
            className: W(
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
      children: /* @__PURE__ */ v("div", { className: "text-sm text-cms-gray-700", children: r })
    }
  )
);
Sb.displayName = "DeleteModal";
const Db = C.forwardRef(
  ({
    open: e,
    onOpenChange: t,
    title: n = "오류",
    message: r,
    confirmText: o = "확인",
    onConfirm: a,
    className: s
  }, i) => /* @__PURE__ */ v(
    nn,
    {
      ref: i,
      open: e,
      onOpenChange: t,
      icon: /* @__PURE__ */ v(Xg, { className: "w-15 h-15 text-cms-red-400" }),
      title: n,
      footer: /* @__PURE__ */ v(
        wt,
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
      children: /* @__PURE__ */ v("div", { className: "text-sm text-cms-gray-700", children: r })
    }
  )
);
Db.displayName = "ErrorModal";
const Nb = C.forwardRef(
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
  }, d) => /* @__PURE__ */ v(
    nn,
    {
      ref: d,
      open: e,
      onOpenChange: t,
      icon: /* @__PURE__ */ v(Ui, { className: "w-15 h-15 text-cms-orange-500" }),
      title: n,
      footer: (
        // 버튼 두 개를 가로로 배치하기 위해 flex 컨테이너 사용
        /* @__PURE__ */ Q("div", { className: "flex w-full gap-2", children: [
          /* @__PURE__ */ v(
            wt,
            {
              onClick: () => {
                i == null || i(), t(!1);
              },
              className: "flex-1 h-12 bg-white border border-cms-gray-200 text-cms-gray-700 hover:bg-cms-gray-50",
              children: s
            }
          ),
          /* @__PURE__ */ v(
            wt,
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
      children: /* @__PURE__ */ v("div", { className: "text-sm text-cms-gray-700", children: r })
    }
  )
);
Nb.displayName = "WarningModal";
const Ob = C.forwardRef(
  ({
    open: e,
    onOpenChange: t,
    title: n = "성공",
    message: r,
    confirmText: o = "확인",
    onConfirm: a,
    className: s
  }, i) => /* @__PURE__ */ v(
    nn,
    {
      ref: i,
      open: e,
      onOpenChange: t,
      icon: /* @__PURE__ */ v(Gi, { className: "w-15 h-15 text-cms-green-500 border-cms-green-500" }),
      title: n,
      footer: /* @__PURE__ */ v(
        wt,
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
      children: /* @__PURE__ */ v("div", { className: "text-sm text-cms-gray-700", children: r })
    }
  )
);
Ob.displayName = "SuccessModal";
function Eb(e) {
  if (typeof document > "u") return;
  let t = document.head || document.getElementsByTagName("head")[0], n = document.createElement("style");
  n.type = "text/css", t.appendChild(n), n.styleSheet ? n.styleSheet.cssText = e : n.appendChild(document.createTextNode(e));
}
const Pb = (e) => {
  switch (e) {
    case "success":
      return Tb;
    case "info":
      return Ib;
    case "warning":
      return _b;
    case "error":
      return Wb;
    default:
      return null;
  }
}, Rb = Array(12).fill(0), Ab = ({ visible: e, className: t }) => /* @__PURE__ */ C.createElement("div", {
  className: [
    "sonner-loading-wrapper",
    t
  ].filter(Boolean).join(" "),
  "data-visible": e
}, /* @__PURE__ */ C.createElement("div", {
  className: "sonner-spinner"
}, Rb.map((n, r) => /* @__PURE__ */ C.createElement("div", {
  className: "sonner-loading-bar",
  key: `spinner-bar-${r}`
})))), Tb = /* @__PURE__ */ C.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ C.createElement("path", {
  fillRule: "evenodd",
  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
  clipRule: "evenodd"
})), _b = /* @__PURE__ */ C.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ C.createElement("path", {
  fillRule: "evenodd",
  d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
  clipRule: "evenodd"
})), Ib = /* @__PURE__ */ C.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ C.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
  clipRule: "evenodd"
})), Wb = /* @__PURE__ */ C.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ C.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
  clipRule: "evenodd"
})), $b = /* @__PURE__ */ C.createElement("svg", {
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
})), Fb = () => {
  const [e, t] = C.useState(document.hidden);
  return C.useEffect(() => {
    const n = () => {
      t(document.hidden);
    };
    return document.addEventListener("visibilitychange", n), () => window.removeEventListener("visibilitychange", n);
  }, []), e;
};
let zr = 1;
class Yb {
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
      const { message: r, ...o } = t, a = typeof (t == null ? void 0 : t.id) == "number" || ((n = t.id) == null ? void 0 : n.length) > 0 ? t.id : zr++, s = this.toasts.find((l) => l.id === a), i = t.dismissible === void 0 ? !0 : t.dismissible;
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
        else if (zb(d) && !d.ok) {
          a = !1;
          const c = typeof n.error == "function" ? await n.error(`HTTP error! status: ${d.status}`) : n.error, f = typeof n.description == "function" ? await n.description(`HTTP error! status: ${d.status}`) : n.description, y = typeof c == "object" && !C.isValidElement(c) ? c : {
            message: c
          };
          this.create({
            id: r,
            type: "error",
            description: f,
            ...y
          });
        } else if (d instanceof Error) {
          a = !1;
          const c = typeof n.error == "function" ? await n.error(d) : n.error, f = typeof n.description == "function" ? await n.description(d) : n.description, y = typeof c == "object" && !C.isValidElement(c) ? c : {
            message: c
          };
          this.create({
            id: r,
            type: "error",
            description: f,
            ...y
          });
        } else if (n.success !== void 0) {
          a = !1;
          const c = typeof n.success == "function" ? await n.success(d) : n.success, f = typeof n.description == "function" ? await n.description(d) : n.description, y = typeof c == "object" && !C.isValidElement(c) ? c : {
            message: c
          };
          this.create({
            id: r,
            type: "success",
            description: f,
            ...y
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
      const r = (n == null ? void 0 : n.id) || zr++;
      return this.create({
        jsx: t(r),
        id: r,
        ...n
      }), r;
    }, this.getActiveToasts = () => this.toasts.filter((t) => !this.dismissedToasts.has(t.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set();
  }
}
const De = new Yb(), Bb = (e, t) => {
  const n = (t == null ? void 0 : t.id) || zr++;
  return De.addToast({
    title: e,
    ...t,
    id: n
  }), n;
}, zb = (e) => e && typeof e == "object" && "ok" in e && typeof e.ok == "boolean" && "status" in e && typeof e.status == "number", Lb = Bb, Hb = () => De.toasts, jb = () => De.getActiveToasts(), uv = Object.assign(Lb, {
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
  getHistory: Hb,
  getToasts: jb
});
Eb("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function Wn(e) {
  return e.label !== void 0;
}
const Vb = 3, Gb = "24px", Ub = "16px", ba = 4e3, qb = 356, Xb = 14, Kb = 45, Qb = 200;
function je(...e) {
  return e.filter(Boolean).join(" ");
}
function Zb(e) {
  const [t, n] = e.split("-"), r = [];
  return t && r.push(t), n && r.push(n), r;
}
const Jb = (e) => {
  var t, n, r, o, a, s, i, l, d;
  const { invert: u, toast: c, unstyled: f, interacting: m, setHeights: y, visibleToasts: h, heights: g, index: b, toasts: x, expanded: w, removeToast: M, defaultRichColors: S, closeButton: k, style: N, cancelButtonStyle: A, actionButtonStyle: Y, className: _ = "", descriptionClassName: $ = "", duration: F, position: G, gap: O, expandByDefault: P, classNames: D, icons: R, closeButtonAriaLabel: E = "Close toast" } = e, [T, I] = C.useState(null), [z, ee] = C.useState(null), [B, U] = C.useState(!1), [X, ce] = C.useState(!1), [ue, Z] = C.useState(!1), [me, ae] = C.useState(!1), [ge, ve] = C.useState(!1), [Se, ft] = C.useState(0), [At, Tt] = C.useState(0), nt = C.useRef(c.duration || F || ba), _t = C.useRef(null), we = C.useRef(null), dr = b === 0, ur = b + 1 <= h, Ce = c.type, rt = c.dismissible !== !1, rn = c.className || "", on = c.descriptionClassName || "", It = C.useMemo(() => g.findIndex((H) => H.toastId === c.id) || 0, [
    g,
    c.id
  ]), fr = C.useMemo(() => {
    var H;
    return (H = c.closeButton) != null ? H : k;
  }, [
    c.closeButton,
    k
  ]), Mn = C.useMemo(() => c.duration || F || ba, [
    c.duration,
    F
  ]), an = C.useRef(0), mt = C.useRef(0), Sn = C.useRef(0), ht = C.useRef(null), [mr, hr] = G.split("-"), Dn = C.useMemo(() => g.reduce((H, j, be) => be >= It ? H : H + j.height, 0), [
    g,
    It
  ]), Nn = Fb(), On = c.invert || u, sn = Ce === "loading";
  mt.current = C.useMemo(() => It * O + Dn, [
    It,
    Dn
  ]), C.useEffect(() => {
    nt.current = Mn;
  }, [
    Mn
  ]), C.useEffect(() => {
    U(!0);
  }, []), C.useEffect(() => {
    const H = we.current;
    if (H) {
      const j = H.getBoundingClientRect().height;
      return Tt(j), y((be) => [
        {
          toastId: c.id,
          height: j,
          position: c.position
        },
        ...be
      ]), () => y((be) => be.filter((Me) => Me.toastId !== c.id));
    }
  }, [
    y,
    c.id
  ]), C.useLayoutEffect(() => {
    if (!B) return;
    const H = we.current, j = H.style.height;
    H.style.height = "auto";
    const be = H.getBoundingClientRect().height;
    H.style.height = j, Tt(be), y((Me) => Me.find((fe) => fe.toastId === c.id) ? Me.map((fe) => fe.toastId === c.id ? {
      ...fe,
      height: be
    } : fe) : [
      {
        toastId: c.id,
        height: be,
        position: c.position
      },
      ...Me
    ]);
  }, [
    B,
    c.title,
    c.description,
    y,
    c.id,
    c.jsx,
    c.action,
    c.cancel
  ]);
  const Te = C.useCallback(() => {
    ce(!0), ft(mt.current), y((H) => H.filter((j) => j.toastId !== c.id)), setTimeout(() => {
      M(c);
    }, Qb);
  }, [
    c,
    M,
    y,
    mt
  ]);
  C.useEffect(() => {
    if (c.promise && Ce === "loading" || c.duration === 1 / 0 || c.type === "loading") return;
    let H;
    return w || m || Nn ? (() => {
      if (Sn.current < an.current) {
        const Me = (/* @__PURE__ */ new Date()).getTime() - an.current;
        nt.current = nt.current - Me;
      }
      Sn.current = (/* @__PURE__ */ new Date()).getTime();
    })() : (() => {
      nt.current !== 1 / 0 && (an.current = (/* @__PURE__ */ new Date()).getTime(), H = setTimeout(() => {
        c.onAutoClose == null || c.onAutoClose.call(c, c), Te();
      }, nt.current));
    })(), () => clearTimeout(H);
  }, [
    w,
    m,
    c,
    Ce,
    Nn,
    Te
  ]), C.useEffect(() => {
    c.delete && (Te(), c.onDismiss == null || c.onDismiss.call(c, c));
  }, [
    Te,
    c.delete
  ]);
  function q() {
    var H;
    if (R != null && R.loading) {
      var j;
      return /* @__PURE__ */ C.createElement("div", {
        className: je(D == null ? void 0 : D.loader, c == null || (j = c.classNames) == null ? void 0 : j.loader, "sonner-loader"),
        "data-visible": Ce === "loading"
      }, R.loading);
    }
    return /* @__PURE__ */ C.createElement(Ab, {
      className: je(D == null ? void 0 : D.loader, c == null || (H = c.classNames) == null ? void 0 : H.loader),
      visible: Ce === "loading"
    });
  }
  const te = c.icon || (R == null ? void 0 : R[Ce]) || Pb(Ce);
  var V, J;
  return /* @__PURE__ */ C.createElement("li", {
    tabIndex: 0,
    ref: we,
    className: je(_, rn, D == null ? void 0 : D.toast, c == null || (t = c.classNames) == null ? void 0 : t.toast, D == null ? void 0 : D.default, D == null ? void 0 : D[Ce], c == null || (n = c.classNames) == null ? void 0 : n[Ce]),
    "data-sonner-toast": "",
    "data-rich-colors": (V = c.richColors) != null ? V : S,
    "data-styled": !(c.jsx || c.unstyled || f),
    "data-mounted": B,
    "data-promise": !!c.promise,
    "data-swiped": ge,
    "data-removed": X,
    "data-visible": ur,
    "data-y-position": mr,
    "data-x-position": hr,
    "data-index": b,
    "data-front": dr,
    "data-swiping": ue,
    "data-dismissible": rt,
    "data-type": Ce,
    "data-invert": On,
    "data-swipe-out": me,
    "data-swipe-direction": z,
    "data-expanded": !!(w || P && B),
    "data-testid": c.testId,
    style: {
      "--index": b,
      "--toasts-before": b,
      "--z-index": x.length - b,
      "--offset": `${X ? Se : mt.current}px`,
      "--initial-height": P ? "auto" : `${At}px`,
      ...N,
      ...c.style
    },
    onDragEnd: () => {
      Z(!1), I(null), ht.current = null;
    },
    onPointerDown: (H) => {
      H.button !== 2 && (sn || !rt || (_t.current = /* @__PURE__ */ new Date(), ft(mt.current), H.target.setPointerCapture(H.pointerId), H.target.tagName !== "BUTTON" && (Z(!0), ht.current = {
        x: H.clientX,
        y: H.clientY
      })));
    },
    onPointerUp: () => {
      var H, j, be;
      if (me || !rt) return;
      ht.current = null;
      const Me = Number(((H = we.current) == null ? void 0 : H.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0), Wt = Number(((j = we.current) == null ? void 0 : j.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0), fe = (/* @__PURE__ */ new Date()).getTime() - ((be = _t.current) == null ? void 0 : be.getTime()), xe = T === "x" ? Me : Wt, En = Math.abs(xe) / fe;
      if (Math.abs(xe) >= Kb || En > 0.11) {
        ft(mt.current), c.onDismiss == null || c.onDismiss.call(c, c), ee(T === "x" ? Me > 0 ? "right" : "left" : Wt > 0 ? "down" : "up"), Te(), ae(!0);
        return;
      } else {
        var _e, Ie;
        (_e = we.current) == null || _e.style.setProperty("--swipe-amount-x", "0px"), (Ie = we.current) == null || Ie.style.setProperty("--swipe-amount-y", "0px");
      }
      ve(!1), Z(!1), I(null);
    },
    onPointerMove: (H) => {
      var j, be, Me;
      if (!ht.current || !rt || ((j = window.getSelection()) == null ? void 0 : j.toString().length) > 0) return;
      const fe = H.clientY - ht.current.y, xe = H.clientX - ht.current.x;
      var En;
      const _e = (En = e.swipeDirections) != null ? En : Zb(G);
      !T && (Math.abs(xe) > 1 || Math.abs(fe) > 1) && I(Math.abs(xe) > Math.abs(fe) ? "x" : "y");
      let Ie = {
        x: 0,
        y: 0
      };
      const Oo = (St) => 1 / (1.5 + Math.abs(St) / 20);
      if (T === "y") {
        if (_e.includes("top") || _e.includes("bottom"))
          if (_e.includes("top") && fe < 0 || _e.includes("bottom") && fe > 0)
            Ie.y = fe;
          else {
            const St = fe * Oo(fe);
            Ie.y = Math.abs(St) < Math.abs(fe) ? St : fe;
          }
      } else if (T === "x" && (_e.includes("left") || _e.includes("right")))
        if (_e.includes("left") && xe < 0 || _e.includes("right") && xe > 0)
          Ie.x = xe;
        else {
          const St = xe * Oo(xe);
          Ie.x = Math.abs(St) < Math.abs(xe) ? St : xe;
        }
      (Math.abs(Ie.x) > 0 || Math.abs(Ie.y) > 0) && ve(!0), (be = we.current) == null || be.style.setProperty("--swipe-amount-x", `${Ie.x}px`), (Me = we.current) == null || Me.style.setProperty("--swipe-amount-y", `${Ie.y}px`);
    }
  }, fr && !c.jsx && Ce !== "loading" ? /* @__PURE__ */ C.createElement("button", {
    "aria-label": E,
    "data-disabled": sn,
    "data-close-button": !0,
    onClick: sn || !rt ? () => {
    } : () => {
      Te(), c.onDismiss == null || c.onDismiss.call(c, c);
    },
    className: je(D == null ? void 0 : D.closeButton, c == null || (r = c.classNames) == null ? void 0 : r.closeButton)
  }, (J = R == null ? void 0 : R.close) != null ? J : $b) : null, (Ce || c.icon || c.promise) && c.icon !== null && ((R == null ? void 0 : R[Ce]) !== null || c.icon) ? /* @__PURE__ */ C.createElement("div", {
    "data-icon": "",
    className: je(D == null ? void 0 : D.icon, c == null || (o = c.classNames) == null ? void 0 : o.icon)
  }, c.promise || c.type === "loading" && !c.icon ? c.icon || q() : null, c.type !== "loading" ? te : null) : null, /* @__PURE__ */ C.createElement("div", {
    "data-content": "",
    className: je(D == null ? void 0 : D.content, c == null || (a = c.classNames) == null ? void 0 : a.content)
  }, /* @__PURE__ */ C.createElement("div", {
    "data-title": "",
    className: je(D == null ? void 0 : D.title, c == null || (s = c.classNames) == null ? void 0 : s.title)
  }, c.jsx ? c.jsx : typeof c.title == "function" ? c.title() : c.title), c.description ? /* @__PURE__ */ C.createElement("div", {
    "data-description": "",
    className: je($, on, D == null ? void 0 : D.description, c == null || (i = c.classNames) == null ? void 0 : i.description)
  }, typeof c.description == "function" ? c.description() : c.description) : null), /* @__PURE__ */ C.isValidElement(c.cancel) ? c.cancel : c.cancel && Wn(c.cancel) ? /* @__PURE__ */ C.createElement("button", {
    "data-button": !0,
    "data-cancel": !0,
    style: c.cancelButtonStyle || A,
    onClick: (H) => {
      Wn(c.cancel) && rt && (c.cancel.onClick == null || c.cancel.onClick.call(c.cancel, H), Te());
    },
    className: je(D == null ? void 0 : D.cancelButton, c == null || (l = c.classNames) == null ? void 0 : l.cancelButton)
  }, c.cancel.label) : null, /* @__PURE__ */ C.isValidElement(c.action) ? c.action : c.action && Wn(c.action) ? /* @__PURE__ */ C.createElement("button", {
    "data-button": !0,
    "data-action": !0,
    style: c.actionButtonStyle || Y,
    onClick: (H) => {
      Wn(c.action) && (c.action.onClick == null || c.action.onClick.call(c.action, H), !H.defaultPrevented && Te());
    },
    className: je(D == null ? void 0 : D.actionButton, c == null || (d = c.classNames) == null ? void 0 : d.actionButton)
  }, c.action.label) : null);
};
function va() {
  if (typeof window > "u" || typeof document > "u") return "ltr";
  const e = document.documentElement.getAttribute("dir");
  return e === "auto" || !e ? window.getComputedStyle(document.documentElement).direction : e;
}
function ev(e, t) {
  const n = {};
  return [
    e,
    t
  ].forEach((r, o) => {
    const a = o === 1, s = a ? "--mobile-offset" : "--offset", i = a ? Ub : Gb;
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
const tv = /* @__PURE__ */ C.forwardRef(function(t, n) {
  const { id: r, invert: o, position: a = "bottom-right", hotkey: s = [
    "altKey",
    "KeyT"
  ], expand: i, closeButton: l, className: d, offset: u, mobileOffset: c, theme: f = "light", richColors: m, duration: y, style: h, visibleToasts: g = Vb, toastOptions: b, dir: x = va(), gap: w = Xb, icons: M, containerAriaLabel: S = "Notifications" } = t, [k, N] = C.useState([]), A = C.useMemo(() => r ? k.filter((B) => B.toasterId === r) : k.filter((B) => !B.toasterId), [
    k,
    r
  ]), Y = C.useMemo(() => Array.from(new Set([
    a
  ].concat(A.filter((B) => B.position).map((B) => B.position)))), [
    A,
    a
  ]), [_, $] = C.useState([]), [F, G] = C.useState(!1), [O, P] = C.useState(!1), [D, R] = C.useState(f !== "system" ? f : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), E = C.useRef(null), T = s.join("+").replace(/Key/g, "").replace(/Digit/g, ""), I = C.useRef(null), z = C.useRef(!1), ee = C.useCallback((B) => {
    N((U) => {
      var X;
      return (X = U.find((ce) => ce.id === B.id)) != null && X.delete || De.dismiss(B.id), U.filter(({ id: ce }) => ce !== B.id);
    });
  }, []);
  return C.useEffect(() => De.subscribe((B) => {
    if (B.dismiss) {
      requestAnimationFrame(() => {
        N((U) => U.map((X) => X.id === B.id ? {
          ...X,
          delete: !0
        } : X));
      });
      return;
    }
    setTimeout(() => {
      xa.flushSync(() => {
        N((U) => {
          const X = U.findIndex((ce) => ce.id === B.id);
          return X !== -1 ? [
            ...U.slice(0, X),
            {
              ...U[X],
              ...B
            },
            ...U.slice(X + 1)
          ] : [
            B,
            ...U
          ];
        });
      });
    });
  }), [
    k
  ]), C.useEffect(() => {
    if (f !== "system") {
      R(f);
      return;
    }
    if (f === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? R("dark") : R("light")), typeof window > "u") return;
    const B = window.matchMedia("(prefers-color-scheme: dark)");
    try {
      B.addEventListener("change", ({ matches: U }) => {
        R(U ? "dark" : "light");
      });
    } catch {
      B.addListener(({ matches: X }) => {
        try {
          R(X ? "dark" : "light");
        } catch (ce) {
          console.error(ce);
        }
      });
    }
  }, [
    f
  ]), C.useEffect(() => {
    k.length <= 1 && G(!1);
  }, [
    k
  ]), C.useEffect(() => {
    const B = (U) => {
      var X;
      if (s.every((Z) => U[Z] || U.code === Z)) {
        var ue;
        G(!0), (ue = E.current) == null || ue.focus();
      }
      U.code === "Escape" && (document.activeElement === E.current || (X = E.current) != null && X.contains(document.activeElement)) && G(!1);
    };
    return document.addEventListener("keydown", B), () => document.removeEventListener("keydown", B);
  }, [
    s
  ]), C.useEffect(() => {
    if (E.current)
      return () => {
        I.current && (I.current.focus({
          preventScroll: !0
        }), I.current = null, z.current = !1);
      };
  }, [
    E.current
  ]), // Remove item from normal navigation flow, only available via hotkey
  /* @__PURE__ */ C.createElement("section", {
    ref: n,
    "aria-label": `${S} ${T}`,
    tabIndex: -1,
    "aria-live": "polite",
    "aria-relevant": "additions text",
    "aria-atomic": "false",
    suppressHydrationWarning: !0
  }, Y.map((B, U) => {
    var X;
    const [ce, ue] = B.split("-");
    return A.length ? /* @__PURE__ */ C.createElement("ol", {
      key: B,
      dir: x === "auto" ? va() : x,
      tabIndex: -1,
      ref: E,
      className: d,
      "data-sonner-toaster": !0,
      "data-sonner-theme": D,
      "data-y-position": ce,
      "data-x-position": ue,
      style: {
        "--front-toast-height": `${((X = _[0]) == null ? void 0 : X.height) || 0}px`,
        "--width": `${qb}px`,
        "--gap": `${w}px`,
        ...h,
        ...ev(u, c)
      },
      onBlur: (Z) => {
        z.current && !Z.currentTarget.contains(Z.relatedTarget) && (z.current = !1, I.current && (I.current.focus({
          preventScroll: !0
        }), I.current = null));
      },
      onFocus: (Z) => {
        Z.target instanceof HTMLElement && Z.target.dataset.dismissible === "false" || z.current || (z.current = !0, I.current = Z.relatedTarget);
      },
      onMouseEnter: () => G(!0),
      onMouseMove: () => G(!0),
      onMouseLeave: () => {
        O || G(!1);
      },
      onDragEnd: () => G(!1),
      onPointerDown: (Z) => {
        Z.target instanceof HTMLElement && Z.target.dataset.dismissible === "false" || P(!0);
      },
      onPointerUp: () => P(!1)
    }, A.filter((Z) => !Z.position && U === 0 || Z.position === B).map((Z, me) => {
      var ae, ge;
      return /* @__PURE__ */ C.createElement(Jb, {
        key: Z.id,
        icons: M,
        index: me,
        toast: Z,
        defaultRichColors: m,
        duration: (ae = b == null ? void 0 : b.duration) != null ? ae : y,
        className: b == null ? void 0 : b.className,
        descriptionClassName: b == null ? void 0 : b.descriptionClassName,
        invert: o,
        visibleToasts: g,
        closeButton: (ge = b == null ? void 0 : b.closeButton) != null ? ge : l,
        interacting: O,
        position: B,
        style: b == null ? void 0 : b.style,
        unstyled: b == null ? void 0 : b.unstyled,
        classNames: b == null ? void 0 : b.classNames,
        cancelButtonStyle: b == null ? void 0 : b.cancelButtonStyle,
        actionButtonStyle: b == null ? void 0 : b.actionButtonStyle,
        closeButtonAriaLabel: b == null ? void 0 : b.closeButtonAriaLabel,
        removeToast: ee,
        toasts: A.filter((ve) => ve.position == Z.position),
        heights: _.filter((ve) => ve.position == Z.position),
        setHeights: $,
        expandByDefault: i,
        gap: w,
        expanded: F,
        swipeDirections: t.swipeDirections
      });
    })) : null;
  }));
}), fv = ({ position: e = "bottom-center", ...t }) => /* @__PURE__ */ v(
  tv,
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
  wt as Button,
  ab as Checkbox,
  iv as ChevronRightIcon,
  rl as Combobox,
  Mb as ConfirmModal,
  Ip as DatePicker,
  $p as DateRangePicker,
  Sb as DeleteModal,
  Hr as Dropdown,
  Db as ErrorModal,
  sv as LoadingCircle,
  nn as Modal,
  cv as Popover,
  Ju as PopoverContent,
  tf as PopoverMenuItem,
  lv as PopoverTrigger,
  hg as RadioGroup,
  bg as RadioGroupItem,
  nl as Select,
  eb as SideNavigation,
  Ob as SuccessModal,
  jp as Switch,
  rf as Text,
  lf as TextInput,
  fv as Toaster,
  Nb as WarningModal,
  Qc as buttonVariants,
  W as cn,
  Jc as dropdownTriggerVariants,
  ef as popoverMenuItemVariants,
  uv as toast
};
//# sourceMappingURL=index.es.js.map
