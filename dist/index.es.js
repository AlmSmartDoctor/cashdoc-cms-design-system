import { jsx as E, jsxs as se } from "react/jsx-runtime";
import * as f from "react";
import { forwardRef as Ce, useState as Ne, useRef as It, useEffect as Ft, useLayoutEffect as Or } from "react";
import * as pn from "react-dom";
import Nr from "react-dom";
function mn(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (n = mn(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function hn() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++) (e = arguments[n]) && (t = mn(e)) && (r && (r += " "), r += t);
  return r;
}
const gt = "-", kr = (e) => {
  const t = Tr(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (a) => {
      const i = a.split(gt);
      return i[0] === "" && i.length !== 1 && i.shift(), gn(i, t) || Mr(a);
    },
    getConflictingClassGroupIds: (a, i) => {
      const u = n[a] || [];
      return i && r[a] ? [...u, ...r[a]] : u;
    }
  };
}, gn = (e, t) => {
  var a;
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], r = t.nextPart.get(n), o = r ? gn(e.slice(1), r) : void 0;
  if (o)
    return o;
  if (t.validators.length === 0)
    return;
  const s = e.join(gt);
  return (a = t.validators.find(({
    validator: i
  }) => i(s))) == null ? void 0 : a.classGroupId;
}, Wt = /^\[(.+)\]$/, Mr = (e) => {
  if (Wt.test(e)) {
    const t = Wt.exec(e)[1], n = t == null ? void 0 : t.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, Tr = (e) => {
  const {
    theme: t,
    prefix: n
  } = e, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return Dr(Object.entries(e.classGroups), n).forEach(([s, a]) => {
    ut(a, r, s, t);
  }), r;
}, ut = (e, t, n, r) => {
  e.forEach((o) => {
    if (typeof o == "string") {
      const s = o === "" ? t : zt(t, o);
      s.classGroupId = n;
      return;
    }
    if (typeof o == "function") {
      if (Lr(o)) {
        ut(o(r), t, n, r);
        return;
      }
      t.validators.push({
        validator: o,
        classGroupId: n
      });
      return;
    }
    Object.entries(o).forEach(([s, a]) => {
      ut(a, zt(t, s), n, r);
    });
  });
}, zt = (e, t) => {
  let n = e;
  return t.split(gt).forEach((r) => {
    n.nextPart.has(r) || n.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(r);
  }), n;
}, Lr = (e) => e.isThemeGetter, Dr = (e, t) => t ? e.map(([n, r]) => {
  const o = r.map((s) => typeof s == "string" ? t + s : typeof s == "object" ? Object.fromEntries(Object.entries(s).map(([a, i]) => [t + a, i])) : s);
  return [n, o];
}) : e, _r = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let t = 0, n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  const o = (s, a) => {
    n.set(s, a), t++, t > e && (t = 0, r = n, n = /* @__PURE__ */ new Map());
  };
  return {
    get(s) {
      let a = n.get(s);
      if (a !== void 0)
        return a;
      if ((a = r.get(s)) !== void 0)
        return o(s, a), a;
    },
    set(s, a) {
      n.has(s) ? n.set(s, a) : o(s, a);
    }
  };
}, vn = "!", Ir = (e) => {
  const {
    separator: t,
    experimentalParseClassName: n
  } = e, r = t.length === 1, o = t[0], s = t.length, a = (i) => {
    const u = [];
    let c = 0, l = 0, d;
    for (let g = 0; g < i.length; g++) {
      let v = i[g];
      if (c === 0) {
        if (v === o && (r || i.slice(g, g + s) === t)) {
          u.push(i.slice(l, g)), l = g + s;
          continue;
        }
        if (v === "/") {
          d = g;
          continue;
        }
      }
      v === "[" ? c++ : v === "]" && c--;
    }
    const m = u.length === 0 ? i : i.substring(l), h = m.startsWith(vn), b = h ? m.substring(1) : m, p = d && d > l ? d - l : void 0;
    return {
      modifiers: u,
      hasImportantModifier: h,
      baseClassName: b,
      maybePostfixModifierPosition: p
    };
  };
  return n ? (i) => n({
    className: i,
    parseClassName: a
  }) : a;
}, Fr = (e) => {
  if (e.length <= 1)
    return e;
  const t = [];
  let n = [];
  return e.forEach((r) => {
    r[0] === "[" ? (t.push(...n.sort(), r), n = []) : n.push(r);
  }), t.push(...n.sort()), t;
}, Wr = (e) => ({
  cache: _r(e.cacheSize),
  parseClassName: Ir(e),
  ...kr(e)
}), zr = /\s+/, $r = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: r,
    getConflictingClassGroupIds: o
  } = t, s = [], a = e.trim().split(zr);
  let i = "";
  for (let u = a.length - 1; u >= 0; u -= 1) {
    const c = a[u], {
      modifiers: l,
      hasImportantModifier: d,
      baseClassName: m,
      maybePostfixModifierPosition: h
    } = n(c);
    let b = !!h, p = r(b ? m.substring(0, h) : m);
    if (!p) {
      if (!b) {
        i = c + (i.length > 0 ? " " + i : i);
        continue;
      }
      if (p = r(m), !p) {
        i = c + (i.length > 0 ? " " + i : i);
        continue;
      }
      b = !1;
    }
    const g = Fr(l).join(":"), v = d ? g + vn : g, y = v + p;
    if (s.includes(y))
      continue;
    s.push(y);
    const w = o(p, b);
    for (let x = 0; x < w.length; ++x) {
      const C = w[x];
      s.push(v + C);
    }
    i = c + (i.length > 0 ? " " + i : i);
  }
  return i;
};
function Br() {
  let e = 0, t, n, r = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = bn(t)) && (r && (r += " "), r += n);
  return r;
}
const bn = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (t = bn(e[r])) && (n && (n += " "), n += t);
  return n;
};
function jr(e, ...t) {
  let n, r, o, s = a;
  function a(u) {
    const c = t.reduce((l, d) => d(l), e());
    return n = Wr(c), r = n.cache.get, o = n.cache.set, s = i, i(u);
  }
  function i(u) {
    const c = r(u);
    if (c)
      return c;
    const l = $r(u, n);
    return o(u, l), l;
  }
  return function() {
    return s(Br.apply(null, arguments));
  };
}
const D = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, yn = /^\[(?:([a-z-]+):)?(.+)\]$/i, Vr = /^\d+\/\d+$/, Hr = /* @__PURE__ */ new Set(["px", "full", "screen"]), Ur = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Gr = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Xr = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, Yr = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Kr = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Q = (e) => ge(e) || Hr.has(e) || Vr.test(e), ne = (e) => Ee(e, "length", ro), ge = (e) => !!e && !Number.isNaN(Number(e)), et = (e) => Ee(e, "number", ge), Re = (e) => !!e && Number.isInteger(Number(e)), Zr = (e) => e.endsWith("%") && ge(e.slice(0, -1)), O = (e) => yn.test(e), re = (e) => Ur.test(e), qr = /* @__PURE__ */ new Set(["length", "size", "percentage"]), Qr = (e) => Ee(e, qr, wn), Jr = (e) => Ee(e, "position", wn), eo = /* @__PURE__ */ new Set(["image", "url"]), to = (e) => Ee(e, eo, so), no = (e) => Ee(e, "", oo), Oe = () => !0, Ee = (e, t, n) => {
  const r = yn.exec(e);
  return r ? r[1] ? typeof t == "string" ? r[1] === t : t.has(r[1]) : n(r[2]) : !1;
}, ro = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Gr.test(e) && !Xr.test(e)
), wn = () => !1, oo = (e) => Yr.test(e), so = (e) => Kr.test(e), io = () => {
  const e = D("colors"), t = D("spacing"), n = D("blur"), r = D("brightness"), o = D("borderColor"), s = D("borderRadius"), a = D("borderSpacing"), i = D("borderWidth"), u = D("contrast"), c = D("grayscale"), l = D("hueRotate"), d = D("invert"), m = D("gap"), h = D("gradientColorStops"), b = D("gradientColorStopPositions"), p = D("inset"), g = D("margin"), v = D("opacity"), y = D("padding"), w = D("saturate"), x = D("scale"), C = D("sepia"), P = D("skew"), S = D("space"), k = D("translate"), T = () => ["auto", "contain", "none"], M = () => ["auto", "hidden", "clip", "visible", "scroll"], $ = () => ["auto", O, t], R = () => [O, t], _ = () => ["", Q, ne], A = () => ["auto", ge, O], I = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], L = () => ["solid", "dashed", "dotted", "double", "none"], F = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], N = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], W = () => ["", "0", O], j = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], B = () => [ge, O];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [Oe],
      spacing: [Q, ne],
      blur: ["none", "", re, O],
      brightness: B(),
      borderColor: [e],
      borderRadius: ["none", "", "full", re, O],
      borderSpacing: R(),
      borderWidth: _(),
      contrast: B(),
      grayscale: W(),
      hueRotate: B(),
      invert: W(),
      gap: R(),
      gradientColorStops: [e],
      gradientColorStopPositions: [Zr, ne],
      inset: $(),
      margin: $(),
      opacity: B(),
      padding: R(),
      saturate: B(),
      scale: B(),
      sepia: W(),
      skew: B(),
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
        aspect: ["auto", "square", "video", O]
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
        columns: [re]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": j()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": j()
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
        object: [...I(), O]
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
        overscroll: T()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": T()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": T()
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
        z: ["auto", Re, O]
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
        flex: ["1", "auto", "initial", "none", O]
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
        order: ["first", "last", "none", Re, O]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [Oe]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", Re, O]
        }, O]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": A()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": A()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [Oe]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [Re, O]
        }, O]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": A()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": A()
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
        "auto-cols": ["auto", "min", "max", "fr", O]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", O]
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
        justify: ["normal", ...N()]
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
        content: ["normal", ...N(), "baseline"]
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
        "place-content": [...N(), "baseline"]
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
        p: [y]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [y]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [y]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [y]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [y]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [y]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [y]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [y]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [y]
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
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", O, t]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [O, t, "min", "max", "fit"]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [O, t, "none", "full", "min", "max", "fit", "prose", {
          screen: [re]
        }, re]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [O, t, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": [O, t, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [O, t, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [O, t, "auto", "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", re, ne]
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
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", et]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [Oe]
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
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", O]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", ge, et]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", Q, O]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", O]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", O]
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
        decoration: [...L(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", Q, ne]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", Q, O]
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
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", O]
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
        content: ["none", O]
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
        bg: [...I(), Jr]
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
        bg: ["auto", "cover", "contain", Qr]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, to]
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
        from: [b]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [b]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [b]
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
        border: [...L(), "hidden"]
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
        divide: L()
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
        outline: ["", ...L()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [Q, O]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [Q, ne]
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
        ring: _()
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
        "ring-offset": [Q, ne]
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
        shadow: ["", "inner", "none", re, no]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [Oe]
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
        "mix-blend": [...F(), "plus-lighter", "plus-darker"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": F()
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
        "drop-shadow": ["", "none", re, O]
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
        sepia: [C]
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
        "backdrop-sepia": [C]
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
        "border-spacing": [a]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": [a]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": [a]
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
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", O]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: B()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", O]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: B()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", O]
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
        scale: [x]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [x]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [x]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [Re, O]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [k]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [k]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [P]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [P]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", O]
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", O]
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
        "will-change": ["auto", "scroll", "contents", "transform", O]
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
        stroke: [Q, ne, et]
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
}, ao = /* @__PURE__ */ jr(io);
function z(...e) {
  return ao(hn(e));
}
const $t = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, Bt = hn, vt = (e, t) => (n) => {
  var r;
  if ((t == null ? void 0 : t.variants) == null) return Bt(e, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
  const { variants: o, defaultVariants: s } = t, a = Object.keys(o).map((c) => {
    const l = n == null ? void 0 : n[c], d = s == null ? void 0 : s[c];
    if (l === null) return null;
    const m = $t(l) || $t(d);
    return o[c][m];
  }), i = n && Object.entries(n).reduce((c, l) => {
    let [d, m] = l;
    return m === void 0 || (c[d] = m), c;
  }, {}), u = t == null || (r = t.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((c, l) => {
    let { class: d, className: m, ...h } = l;
    return Object.entries(h).every((b) => {
      let [p, g] = b;
      return Array.isArray(g) ? g.includes({
        ...s,
        ...i
      }[p]) : {
        ...s,
        ...i
      }[p] === g;
    }) ? [
      ...c,
      d,
      m
    ] : c;
  }, []);
  return Bt(e, a, u, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
}, co = vt(
  z(
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
        secondary: z(
          "bg-cms-gray-300 text-cms-black",
          "hover:bg-cms-gray-200 hover:text-cms-gray-800"
        ),
        outline: z(
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
), lo = Ce(
  ({ className: e, variant: t, size: n, ...r }, o) => /* @__PURE__ */ E(
    "button",
    {
      className: z(co({ variant: t, size: n, className: e })),
      ref: o,
      ...r
    }
  )
);
lo.displayName = "Button";
const uo = {
  sm: "h-4 w-4",
  md: "h-8 w-8",
  lg: "h-16 w-16"
};
function Aa({ size: e = "lg", className: t }) {
  return /* @__PURE__ */ E("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ E(
    "div",
    {
      className: z(
        uo[e],
        "animate-spin rounded-full border-2 border-cms-gray-500 border-b-transparent",
        t
      )
    }
  ) });
}
const fo = vt(
  z(
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
        default: z(
          "bg-default text-black border border-cms-outline",
          "hover:bg-cms-gray-200"
        ),
        outline: z(
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
), po = ({
  className: e,
  isOpen: t
}) => /* @__PURE__ */ E(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "10",
    height: "6",
    viewBox: "0 0 10 6",
    fill: "none",
    className: z(
      "transition-transform duration-200",
      t && "rotate-180",
      e
    ),
    children: /* @__PURE__ */ E(
      "path",
      {
        d: "M8.75 0.75L4.57609 4.75L0.75 0.75",
        stroke: "currentColor",
        strokeWidth: "1.5",
        strokeLinecap: "round"
      }
    )
  }
), mo = ({ className: e }) => /* @__PURE__ */ E(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none",
    className: e,
    children: /* @__PURE__ */ E(
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
), bt = Ce(
  ({
    options: e,
    value: t,
    placeholder: n = "선택하세요",
    onValueChange: r,
    disabled: o = !1,
    className: s,
    dropdownClassName: a,
    variant: i,
    size: u,
    searchable: c = !1,
    clearable: l = !1,
    multiple: d = !1,
    maxHeight: m = 200,
    ...h
  }, b) => {
    const [p, g] = Ne(!1), [v, y] = Ne(""), [w, x] = Ne(
      d ? t ? [t] : [] : []
    ), C = It(null), P = It(null), S = e.find((A) => A.value === t), k = d ? w.length > 0 ? `${w.length}개 선택됨` : n : (S == null ? void 0 : S.label) || n, T = e.filter(
      (A) => A.label.toLowerCase().includes(v.toLowerCase())
    ), M = () => {
      o || (g(!p), y(""));
    }, $ = (A) => {
      if (!A.disabled)
        if (d) {
          const I = w.includes(A.value) ? w.filter((L) => L !== A.value) : [...w, A.value];
          x(I), r == null || r(I.join(","));
        } else
          r == null || r(A.value), g(!1);
    }, R = (A) => {
      A.stopPropagation(), d && x([]), r == null || r("");
    }, _ = (A) => {
      A.key === "Escape" ? g(!1) : (A.key === "Enter" || A.key === " ") && (A.preventDefault(), M());
    };
    return Ft(() => {
      const A = (I) => {
        C.current && !C.current.contains(I.target) && g(!1);
      };
      return document.addEventListener("mousedown", A), () => document.removeEventListener("mousedown", A);
    }, []), Ft(() => {
      p && c && P.current && P.current.focus();
    }, [p, c]), /* @__PURE__ */ se("div", { ref: C, className: "relative w-full", children: [
      /* @__PURE__ */ se(
        "button",
        {
          ref: b,
          type: "button",
          className: z(
            fo({ variant: i, size: u }),
            o && "opacity-50 cursor-not-allowed",
            s
          ),
          onClick: M,
          onKeyDown: _,
          disabled: o,
          "aria-expanded": p,
          "aria-haspopup": "listbox",
          ...h,
          children: [
            /* @__PURE__ */ E(
              "span",
              {
                className: z(
                  "truncate flex-1 text-left",
                  !S && !d && "text-cms-gray-400"
                ),
                children: k
              }
            ),
            /* @__PURE__ */ se("div", { className: "flex items-center gap-2 ml-3", children: [
              l && (t || w.length > 0) && /* @__PURE__ */ E(
                "button",
                {
                  type: "button",
                  className: z(
                    "p-1 rounded text-cms-gray-400 transition-colors",
                    "hover:text-cms-black"
                  ),
                  onClick: R,
                  "aria-label": "선택 취소",
                  children: /* @__PURE__ */ E(mo, { className: "w-3 h-3" })
                }
              ),
              /* @__PURE__ */ E(
                po,
                {
                  isOpen: p,
                  className: "w-4 h-4 text-cms-gray-400"
                }
              )
            ] })
          ]
        }
      ),
      p && /* @__PURE__ */ se(
        "div",
        {
          className: z(
            "absolute z-50 mt-1 py-1 w-full",
            "rounded-lg border border-cms-gray-400",
            "bg-white shadow-lg",
            a
          ),
          style: { maxHeight: `${m}px` },
          children: [
            c && /* @__PURE__ */ E("div", { className: "px-3 py-2 border-b border-cms-gray-400", children: /* @__PURE__ */ E(
              "input",
              {
                ref: P,
                type: "text",
                value: v,
                onChange: (A) => y(A.target.value),
                placeholder: "검색...",
                className: z(
                  "w-full px-2 py-1 text-sm",
                  "rounded outline-none",
                  "border border-cms-gray-400",
                  "focus:ring-1 focus:ring-cms-black"
                )
              }
            ) }),
            /* @__PURE__ */ E("div", { className: "max-h-48 overflow-y-auto", children: T.length === 0 ? /* @__PURE__ */ E("div", { className: "px-3 py-2 text-sm text-cms-gray-400 text-center", children: v ? "검색 결과가 없습니다" : "옵션이 없습니다" }) : T.map((A) => {
              const I = d ? w.includes(A.value) : t === A.value;
              return /* @__PURE__ */ se(
                "button",
                {
                  type: "button",
                  className: z(
                    "flex items-center justify-between gap-2",
                    "w-full px-3 py-2 ",
                    "text-left text-sm",
                    "transition-colors",
                    A.disabled ? "text-cms-gray-400 cursor-not-allowed" : "text-cms-black hover:bg-cms-gray-200 cursor-pointer",
                    I && "bg-cms-gray-400 font-medium"
                  ),
                  onClick: () => $(A),
                  disabled: A.disabled,
                  children: [
                    /* @__PURE__ */ E("span", { className: "truncate", children: A.label }),
                    I && /* @__PURE__ */ E(
                      "svg",
                      {
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "16",
                        height: "16",
                        viewBox: "0 0 16 16",
                        fill: "none",
                        className: "w-4 h-4 text-black shrink-0",
                        children: /* @__PURE__ */ E(
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
                A.value
              );
            }) })
          ]
        }
      )
    ] });
  }
);
bt.displayName = "Dropdown";
const ho = Ce(
  ({ label: e, helperText: t, error: n, required: r, className: o, ...s }, a) => /* @__PURE__ */ se("div", { className: z("space-y-1", o), children: [
    e && /* @__PURE__ */ se("label", { className: "block text-sm font-medium text-cms-black", children: [
      e,
      r && /* @__PURE__ */ E("span", { className: "text-cms-red-500 ml-1", children: "*" })
    ] }),
    /* @__PURE__ */ E(
      bt,
      {
        ref: a,
        ...s,
        className: z(n && "border-cms-red-500 focus:ring-cms-red-500")
      }
    ),
    (t || n) && /* @__PURE__ */ E(
      "p",
      {
        className: z(
          "text-xs",
          n ? "text-cms-red-500" : "text-cms-gray-400"
        ),
        children: n || t
      }
    )
  ] })
);
ho.displayName = "Select";
const go = Ce(
  ({ options: e, loading: t = !1, createable: n = !1, onCreateOption: r, ...o }, s) => {
    const [a] = Ne(""), i = e.filter(
      (l) => l.label.toLowerCase().includes(a.toLowerCase())
    ), u = i.some(
      (l) => l.label.toLowerCase() === a.toLowerCase()
    ), c = [
      ...i,
      ...n && a && !u ? [
        {
          value: `__create__${a}`,
          label: `"${a}" 생성`,
          disabled: !1
        }
      ] : []
    ];
    return /* @__PURE__ */ E(
      bt,
      {
        ref: s,
        ...o,
        options: c,
        searchable: !0,
        dropdownClassName: z(t && "opacity-75", o.dropdownClassName),
        onValueChange: (l) => {
          var d;
          if (l.startsWith("__create__")) {
            const m = l.replace("__create__", "");
            r == null || r(m);
          } else
            (d = o.onValueChange) == null || d.call(o, l);
        }
      }
    );
  }
);
go.displayName = "Combobox";
function Pa(e) {
  return /* @__PURE__ */ E(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "20",
      height: "20",
      viewBox: "0 0 20 20",
      fill: "none",
      ...e,
      children: /* @__PURE__ */ E(
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
function ie(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(o) {
    if (e == null || e(o), n === !1 || !o.defaultPrevented)
      return t == null ? void 0 : t(o);
  };
}
function jt(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function xn(...e) {
  return (t) => {
    let n = !1;
    const r = e.map((o) => {
      const s = jt(o, t);
      return !n && typeof s == "function" && (n = !0), s;
    });
    if (n)
      return () => {
        for (let o = 0; o < r.length; o++) {
          const s = r[o];
          typeof s == "function" ? s() : jt(e[o], null);
        }
      };
  };
}
function ue(...e) {
  return f.useCallback(xn(...e), e);
}
function Cn(e, t = []) {
  let n = [];
  function r(s, a) {
    const i = f.createContext(a), u = n.length;
    n = [...n, a];
    const c = (d) => {
      var v;
      const { scope: m, children: h, ...b } = d, p = ((v = m == null ? void 0 : m[e]) == null ? void 0 : v[u]) || i, g = f.useMemo(() => b, Object.values(b));
      return /* @__PURE__ */ E(p.Provider, { value: g, children: h });
    };
    c.displayName = s + "Provider";
    function l(d, m) {
      var p;
      const h = ((p = m == null ? void 0 : m[e]) == null ? void 0 : p[u]) || i, b = f.useContext(h);
      if (b) return b;
      if (a !== void 0) return a;
      throw new Error(`\`${d}\` must be used within \`${s}\``);
    }
    return [c, l];
  }
  const o = () => {
    const s = n.map((a) => f.createContext(a));
    return function(i) {
      const u = (i == null ? void 0 : i[e]) || s;
      return f.useMemo(
        () => ({ [`__scope${e}`]: { ...i, [e]: u } }),
        [i, u]
      );
    };
  };
  return o.scopeName = e, [r, vo(o, ...t)];
}
function vo(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((o) => ({
      useScope: o(),
      scopeName: o.scopeName
    }));
    return function(s) {
      const a = r.reduce((i, { useScope: u, scopeName: c }) => {
        const d = u(s)[`__scope${c}`];
        return { ...i, ...d };
      }, {});
      return f.useMemo(() => ({ [`__scope${t.scopeName}`]: a }), [a]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
// @__NO_SIDE_EFFECTS__
function En(e) {
  const t = /* @__PURE__ */ bo(e), n = f.forwardRef((r, o) => {
    const { children: s, ...a } = r, i = f.Children.toArray(s), u = i.find(wo);
    if (u) {
      const c = u.props.children, l = i.map((d) => d === u ? f.Children.count(c) > 1 ? f.Children.only(null) : f.isValidElement(c) ? c.props.children : null : d);
      return /* @__PURE__ */ E(t, { ...a, ref: o, children: f.isValidElement(c) ? f.cloneElement(c, void 0, l) : null });
    }
    return /* @__PURE__ */ E(t, { ...a, ref: o, children: s });
  });
  return n.displayName = `${e}.Slot`, n;
}
// @__NO_SIDE_EFFECTS__
function bo(e) {
  const t = f.forwardRef((n, r) => {
    const { children: o, ...s } = n;
    if (f.isValidElement(o)) {
      const a = Co(o), i = xo(s, o.props);
      return o.type !== f.Fragment && (i.ref = r ? xn(r, a) : a), f.cloneElement(o, i);
    }
    return f.Children.count(o) > 1 ? f.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var yo = Symbol("radix.slottable");
function wo(e) {
  return f.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === yo;
}
function xo(e, t) {
  const n = { ...t };
  for (const r in t) {
    const o = e[r], s = t[r];
    /^on[A-Z]/.test(r) ? o && s ? n[r] = (...i) => {
      const u = s(...i);
      return o(...i), u;
    } : o && (n[r] = o) : r === "style" ? n[r] = { ...o, ...s } : r === "className" && (n[r] = [o, s].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function Co(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var Eo = [
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
], te = Eo.reduce((e, t) => {
  const n = /* @__PURE__ */ En(`Primitive.${t}`), r = f.forwardRef((o, s) => {
    const { asChild: a, ...i } = o, u = a ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ E(u, { ...i, ref: s });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {});
function So(e, t) {
  e && pn.flushSync(() => e.dispatchEvent(t));
}
function ye(e) {
  const t = f.useRef(e);
  return f.useEffect(() => {
    t.current = e;
  }), f.useMemo(() => (...n) => {
    var r;
    return (r = t.current) == null ? void 0 : r.call(t, ...n);
  }, []);
}
function Ao(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = ye(e);
  f.useEffect(() => {
    const r = (o) => {
      o.key === "Escape" && n(o);
    };
    return t.addEventListener("keydown", r, { capture: !0 }), () => t.removeEventListener("keydown", r, { capture: !0 });
  }, [n, t]);
}
var Po = "DismissableLayer", dt = "dismissableLayer.update", Ro = "dismissableLayer.pointerDownOutside", Oo = "dismissableLayer.focusOutside", Vt, Sn = f.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), An = f.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: r,
      onPointerDownOutside: o,
      onFocusOutside: s,
      onInteractOutside: a,
      onDismiss: i,
      ...u
    } = e, c = f.useContext(Sn), [l, d] = f.useState(null), m = (l == null ? void 0 : l.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), [, h] = f.useState({}), b = ue(t, (S) => d(S)), p = Array.from(c.layers), [g] = [...c.layersWithOutsidePointerEventsDisabled].slice(-1), v = p.indexOf(g), y = l ? p.indexOf(l) : -1, w = c.layersWithOutsidePointerEventsDisabled.size > 0, x = y >= v, C = Mo((S) => {
      const k = S.target, T = [...c.branches].some((M) => M.contains(k));
      !x || T || (o == null || o(S), a == null || a(S), S.defaultPrevented || i == null || i());
    }, m), P = To((S) => {
      const k = S.target;
      [...c.branches].some((M) => M.contains(k)) || (s == null || s(S), a == null || a(S), S.defaultPrevented || i == null || i());
    }, m);
    return Ao((S) => {
      y === c.layers.size - 1 && (r == null || r(S), !S.defaultPrevented && i && (S.preventDefault(), i()));
    }, m), f.useEffect(() => {
      if (l)
        return n && (c.layersWithOutsidePointerEventsDisabled.size === 0 && (Vt = m.body.style.pointerEvents, m.body.style.pointerEvents = "none"), c.layersWithOutsidePointerEventsDisabled.add(l)), c.layers.add(l), Ht(), () => {
          n && c.layersWithOutsidePointerEventsDisabled.size === 1 && (m.body.style.pointerEvents = Vt);
        };
    }, [l, m, n, c]), f.useEffect(() => () => {
      l && (c.layers.delete(l), c.layersWithOutsidePointerEventsDisabled.delete(l), Ht());
    }, [l, c]), f.useEffect(() => {
      const S = () => h({});
      return document.addEventListener(dt, S), () => document.removeEventListener(dt, S);
    }, []), /* @__PURE__ */ E(
      te.div,
      {
        ...u,
        ref: b,
        style: {
          pointerEvents: w ? x ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: ie(e.onFocusCapture, P.onFocusCapture),
        onBlurCapture: ie(e.onBlurCapture, P.onBlurCapture),
        onPointerDownCapture: ie(
          e.onPointerDownCapture,
          C.onPointerDownCapture
        )
      }
    );
  }
);
An.displayName = Po;
var No = "DismissableLayerBranch", ko = f.forwardRef((e, t) => {
  const n = f.useContext(Sn), r = f.useRef(null), o = ue(t, r);
  return f.useEffect(() => {
    const s = r.current;
    if (s)
      return n.branches.add(s), () => {
        n.branches.delete(s);
      };
  }, [n.branches]), /* @__PURE__ */ E(te.div, { ...e, ref: o });
});
ko.displayName = No;
function Mo(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = ye(e), r = f.useRef(!1), o = f.useRef(() => {
  });
  return f.useEffect(() => {
    const s = (i) => {
      if (i.target && !r.current) {
        let u = function() {
          Pn(
            Ro,
            n,
            c,
            { discrete: !0 }
          );
        };
        const c = { originalEvent: i };
        i.pointerType === "touch" ? (t.removeEventListener("click", o.current), o.current = u, t.addEventListener("click", o.current, { once: !0 })) : u();
      } else
        t.removeEventListener("click", o.current);
      r.current = !1;
    }, a = window.setTimeout(() => {
      t.addEventListener("pointerdown", s);
    }, 0);
    return () => {
      window.clearTimeout(a), t.removeEventListener("pointerdown", s), t.removeEventListener("click", o.current);
    };
  }, [t, n]), {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => r.current = !0
  };
}
function To(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = ye(e), r = f.useRef(!1);
  return f.useEffect(() => {
    const o = (s) => {
      s.target && !r.current && Pn(Oo, n, { originalEvent: s }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o);
  }, [t, n]), {
    onFocusCapture: () => r.current = !0,
    onBlurCapture: () => r.current = !1
  };
}
function Ht() {
  const e = new CustomEvent(dt);
  document.dispatchEvent(e);
}
function Pn(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target, s = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && o.addEventListener(e, t, { once: !0 }), r ? So(o, s) : o.dispatchEvent(s);
}
var tt = 0;
function Lo() {
  f.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? Ut()), document.body.insertAdjacentElement("beforeend", e[1] ?? Ut()), tt++, () => {
      tt === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), tt--;
    };
  }, []);
}
function Ut() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var nt = "focusScope.autoFocusOnMount", rt = "focusScope.autoFocusOnUnmount", Gt = { bubbles: !1, cancelable: !0 }, Do = "FocusScope", Rn = f.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: r = !1,
    onMountAutoFocus: o,
    onUnmountAutoFocus: s,
    ...a
  } = e, [i, u] = f.useState(null), c = ye(o), l = ye(s), d = f.useRef(null), m = ue(t, (p) => u(p)), h = f.useRef({
    paused: !1,
    pause() {
      this.paused = !0;
    },
    resume() {
      this.paused = !1;
    }
  }).current;
  f.useEffect(() => {
    if (r) {
      let p = function(w) {
        if (h.paused || !i) return;
        const x = w.target;
        i.contains(x) ? d.current = x : oe(d.current, { select: !0 });
      }, g = function(w) {
        if (h.paused || !i) return;
        const x = w.relatedTarget;
        x !== null && (i.contains(x) || oe(d.current, { select: !0 }));
      }, v = function(w) {
        if (document.activeElement === document.body)
          for (const C of w)
            C.removedNodes.length > 0 && oe(i);
      };
      document.addEventListener("focusin", p), document.addEventListener("focusout", g);
      const y = new MutationObserver(v);
      return i && y.observe(i, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", p), document.removeEventListener("focusout", g), y.disconnect();
      };
    }
  }, [r, i, h.paused]), f.useEffect(() => {
    if (i) {
      Yt.add(h);
      const p = document.activeElement;
      if (!i.contains(p)) {
        const v = new CustomEvent(nt, Gt);
        i.addEventListener(nt, c), i.dispatchEvent(v), v.defaultPrevented || (_o($o(On(i)), { select: !0 }), document.activeElement === p && oe(i));
      }
      return () => {
        i.removeEventListener(nt, c), setTimeout(() => {
          const v = new CustomEvent(rt, Gt);
          i.addEventListener(rt, l), i.dispatchEvent(v), v.defaultPrevented || oe(p ?? document.body, { select: !0 }), i.removeEventListener(rt, l), Yt.remove(h);
        }, 0);
      };
    }
  }, [i, c, l, h]);
  const b = f.useCallback(
    (p) => {
      if (!n && !r || h.paused) return;
      const g = p.key === "Tab" && !p.altKey && !p.ctrlKey && !p.metaKey, v = document.activeElement;
      if (g && v) {
        const y = p.currentTarget, [w, x] = Io(y);
        w && x ? !p.shiftKey && v === x ? (p.preventDefault(), n && oe(w, { select: !0 })) : p.shiftKey && v === w && (p.preventDefault(), n && oe(x, { select: !0 })) : v === y && p.preventDefault();
      }
    },
    [n, r, h.paused]
  );
  return /* @__PURE__ */ E(te.div, { tabIndex: -1, ...a, ref: m, onKeyDown: b });
});
Rn.displayName = Do;
function _o(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if (oe(r, { select: t }), document.activeElement !== n) return;
}
function Io(e) {
  const t = On(e), n = Xt(t, e), r = Xt(t.reverse(), e);
  return [n, r];
}
function On(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function Xt(e, t) {
  for (const n of e)
    if (!Fo(n, { upTo: t })) return n;
}
function Fo(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function Wo(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function oe(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && Wo(e) && t && e.select();
  }
}
var Yt = zo();
function zo() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && (n == null || n.pause()), e = Kt(e, t), e.unshift(t);
    },
    remove(t) {
      var n;
      e = Kt(e, t), (n = e[0]) == null || n.resume();
    }
  };
}
function Kt(e, t) {
  const n = [...e], r = n.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
function $o(e) {
  return e.filter((t) => t.tagName !== "A");
}
var ae = globalThis != null && globalThis.document ? f.useLayoutEffect : () => {
}, Bo = f[" useId ".trim().toString()] || (() => {
}), jo = 0;
function Vo(e) {
  const [t, n] = f.useState(Bo());
  return ae(() => {
    n((r) => r ?? String(jo++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
const Ho = ["top", "right", "bottom", "left"], ce = Math.min, V = Math.max, He = Math.round, _e = Math.floor, K = (e) => ({
  x: e,
  y: e
}), Uo = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Go = {
  start: "end",
  end: "start"
};
function ft(e, t, n) {
  return V(e, ce(t, n));
}
function J(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function ee(e) {
  return e.split("-")[0];
}
function Se(e) {
  return e.split("-")[1];
}
function yt(e) {
  return e === "x" ? "y" : "x";
}
function wt(e) {
  return e === "y" ? "height" : "width";
}
const Xo = /* @__PURE__ */ new Set(["top", "bottom"]);
function Y(e) {
  return Xo.has(ee(e)) ? "y" : "x";
}
function xt(e) {
  return yt(Y(e));
}
function Yo(e, t, n) {
  n === void 0 && (n = !1);
  const r = Se(e), o = xt(e), s = wt(o);
  let a = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[s] > t.floating[s] && (a = Ue(a)), [a, Ue(a)];
}
function Ko(e) {
  const t = Ue(e);
  return [pt(e), t, pt(t)];
}
function pt(e) {
  return e.replace(/start|end/g, (t) => Go[t]);
}
const Zt = ["left", "right"], qt = ["right", "left"], Zo = ["top", "bottom"], qo = ["bottom", "top"];
function Qo(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? qt : Zt : t ? Zt : qt;
    case "left":
    case "right":
      return t ? Zo : qo;
    default:
      return [];
  }
}
function Jo(e, t, n, r) {
  const o = Se(e);
  let s = Qo(ee(e), n === "start", r);
  return o && (s = s.map((a) => a + "-" + o), t && (s = s.concat(s.map(pt)))), s;
}
function Ue(e) {
  return e.replace(/left|right|bottom|top/g, (t) => Uo[t]);
}
function es(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Nn(e) {
  return typeof e != "number" ? es(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function Ge(e) {
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
function Qt(e, t, n) {
  let {
    reference: r,
    floating: o
  } = e;
  const s = Y(t), a = xt(t), i = wt(a), u = ee(t), c = s === "y", l = r.x + r.width / 2 - o.width / 2, d = r.y + r.height / 2 - o.height / 2, m = r[i] / 2 - o[i] / 2;
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
        y: d
      };
      break;
    case "left":
      h = {
        x: r.x - o.width,
        y: d
      };
      break;
    default:
      h = {
        x: r.x,
        y: r.y
      };
  }
  switch (Se(t)) {
    case "start":
      h[a] -= m * (n && c ? -1 : 1);
      break;
    case "end":
      h[a] += m * (n && c ? -1 : 1);
      break;
  }
  return h;
}
const ts = async (e, t, n) => {
  const {
    placement: r = "bottom",
    strategy: o = "absolute",
    middleware: s = [],
    platform: a
  } = n, i = s.filter(Boolean), u = await (a.isRTL == null ? void 0 : a.isRTL(t));
  let c = await a.getElementRects({
    reference: e,
    floating: t,
    strategy: o
  }), {
    x: l,
    y: d
  } = Qt(c, r, u), m = r, h = {}, b = 0;
  for (let p = 0; p < i.length; p++) {
    const {
      name: g,
      fn: v
    } = i[p], {
      x: y,
      y: w,
      data: x,
      reset: C
    } = await v({
      x: l,
      y: d,
      initialPlacement: r,
      placement: m,
      strategy: o,
      middlewareData: h,
      rects: c,
      platform: a,
      elements: {
        reference: e,
        floating: t
      }
    });
    l = y ?? l, d = w ?? d, h = {
      ...h,
      [g]: {
        ...h[g],
        ...x
      }
    }, C && b <= 50 && (b++, typeof C == "object" && (C.placement && (m = C.placement), C.rects && (c = C.rects === !0 ? await a.getElementRects({
      reference: e,
      floating: t,
      strategy: o
    }) : C.rects), {
      x: l,
      y: d
    } = Qt(c, m, u)), p = -1);
  }
  return {
    x: l,
    y: d,
    placement: m,
    strategy: o,
    middlewareData: h
  };
};
async function ke(e, t) {
  var n;
  t === void 0 && (t = {});
  const {
    x: r,
    y: o,
    platform: s,
    rects: a,
    elements: i,
    strategy: u
  } = e, {
    boundary: c = "clippingAncestors",
    rootBoundary: l = "viewport",
    elementContext: d = "floating",
    altBoundary: m = !1,
    padding: h = 0
  } = J(t, e), b = Nn(h), g = i[m ? d === "floating" ? "reference" : "floating" : d], v = Ge(await s.getClippingRect({
    element: (n = await (s.isElement == null ? void 0 : s.isElement(g))) == null || n ? g : g.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(i.floating)),
    boundary: c,
    rootBoundary: l,
    strategy: u
  })), y = d === "floating" ? {
    x: r,
    y: o,
    width: a.floating.width,
    height: a.floating.height
  } : a.reference, w = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(i.floating)), x = await (s.isElement == null ? void 0 : s.isElement(w)) ? await (s.getScale == null ? void 0 : s.getScale(w)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, C = Ge(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: i,
    rect: y,
    offsetParent: w,
    strategy: u
  }) : y);
  return {
    top: (v.top - C.top + b.top) / x.y,
    bottom: (C.bottom - v.bottom + b.bottom) / x.y,
    left: (v.left - C.left + b.left) / x.x,
    right: (C.right - v.right + b.right) / x.x
  };
}
const ns = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      x: n,
      y: r,
      placement: o,
      rects: s,
      platform: a,
      elements: i,
      middlewareData: u
    } = t, {
      element: c,
      padding: l = 0
    } = J(e, t) || {};
    if (c == null)
      return {};
    const d = Nn(l), m = {
      x: n,
      y: r
    }, h = xt(o), b = wt(h), p = await a.getDimensions(c), g = h === "y", v = g ? "top" : "left", y = g ? "bottom" : "right", w = g ? "clientHeight" : "clientWidth", x = s.reference[b] + s.reference[h] - m[h] - s.floating[b], C = m[h] - s.reference[h], P = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(c));
    let S = P ? P[w] : 0;
    (!S || !await (a.isElement == null ? void 0 : a.isElement(P))) && (S = i.floating[w] || s.floating[b]);
    const k = x / 2 - C / 2, T = S / 2 - p[b] / 2 - 1, M = ce(d[v], T), $ = ce(d[y], T), R = M, _ = S - p[b] - $, A = S / 2 - p[b] / 2 + k, I = ft(R, A, _), L = !u.arrow && Se(o) != null && A !== I && s.reference[b] / 2 - (A < R ? M : $) - p[b] / 2 < 0, F = L ? A < R ? A - R : A - _ : 0;
    return {
      [h]: m[h] + F,
      data: {
        [h]: I,
        centerOffset: A - I - F,
        ...L && {
          alignmentOffset: F
        }
      },
      reset: L
    };
  }
}), rs = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var n, r;
      const {
        placement: o,
        middlewareData: s,
        rects: a,
        initialPlacement: i,
        platform: u,
        elements: c
      } = t, {
        mainAxis: l = !0,
        crossAxis: d = !0,
        fallbackPlacements: m,
        fallbackStrategy: h = "bestFit",
        fallbackAxisSideDirection: b = "none",
        flipAlignment: p = !0,
        ...g
      } = J(e, t);
      if ((n = s.arrow) != null && n.alignmentOffset)
        return {};
      const v = ee(o), y = Y(i), w = ee(i) === i, x = await (u.isRTL == null ? void 0 : u.isRTL(c.floating)), C = m || (w || !p ? [Ue(i)] : Ko(i)), P = b !== "none";
      !m && P && C.push(...Jo(i, p, b, x));
      const S = [i, ...C], k = await ke(t, g), T = [];
      let M = ((r = s.flip) == null ? void 0 : r.overflows) || [];
      if (l && T.push(k[v]), d) {
        const A = Yo(o, a, x);
        T.push(k[A[0]], k[A[1]]);
      }
      if (M = [...M, {
        placement: o,
        overflows: T
      }], !T.every((A) => A <= 0)) {
        var $, R;
        const A = ((($ = s.flip) == null ? void 0 : $.index) || 0) + 1, I = S[A];
        if (I && (!(d === "alignment" ? y !== Y(I) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        M.every((N) => Y(N.placement) === y ? N.overflows[0] > 0 : !0)))
          return {
            data: {
              index: A,
              overflows: M
            },
            reset: {
              placement: I
            }
          };
        let L = (R = M.filter((F) => F.overflows[0] <= 0).sort((F, N) => F.overflows[1] - N.overflows[1])[0]) == null ? void 0 : R.placement;
        if (!L)
          switch (h) {
            case "bestFit": {
              var _;
              const F = (_ = M.filter((N) => {
                if (P) {
                  const W = Y(N.placement);
                  return W === y || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  W === "y";
                }
                return !0;
              }).map((N) => [N.placement, N.overflows.filter((W) => W > 0).reduce((W, j) => W + j, 0)]).sort((N, W) => N[1] - W[1])[0]) == null ? void 0 : _[0];
              F && (L = F);
              break;
            }
            case "initialPlacement":
              L = i;
              break;
          }
        if (o !== L)
          return {
            reset: {
              placement: L
            }
          };
      }
      return {};
    }
  };
};
function Jt(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function en(e) {
  return Ho.some((t) => e[t] >= 0);
}
const os = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n
      } = t, {
        strategy: r = "referenceHidden",
        ...o
      } = J(e, t);
      switch (r) {
        case "referenceHidden": {
          const s = await ke(t, {
            ...o,
            elementContext: "reference"
          }), a = Jt(s, n.reference);
          return {
            data: {
              referenceHiddenOffsets: a,
              referenceHidden: en(a)
            }
          };
        }
        case "escaped": {
          const s = await ke(t, {
            ...o,
            altBoundary: !0
          }), a = Jt(s, n.floating);
          return {
            data: {
              escapedOffsets: a,
              escaped: en(a)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, kn = /* @__PURE__ */ new Set(["left", "top"]);
async function ss(e, t) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = e, s = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), a = ee(n), i = Se(n), u = Y(n) === "y", c = kn.has(a) ? -1 : 1, l = s && u ? -1 : 1, d = J(t, e);
  let {
    mainAxis: m,
    crossAxis: h,
    alignmentAxis: b
  } = typeof d == "number" ? {
    mainAxis: d,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: d.mainAxis || 0,
    crossAxis: d.crossAxis || 0,
    alignmentAxis: d.alignmentAxis
  };
  return i && typeof b == "number" && (h = i === "end" ? b * -1 : b), u ? {
    x: h * l,
    y: m * c
  } : {
    x: m * c,
    y: h * l
  };
}
const is = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var n, r;
      const {
        x: o,
        y: s,
        placement: a,
        middlewareData: i
      } = t, u = await ss(t, e);
      return a === ((n = i.offset) == null ? void 0 : n.placement) && (r = i.arrow) != null && r.alignmentOffset ? {} : {
        x: o + u.x,
        y: s + u.y,
        data: {
          ...u,
          placement: a
        }
      };
    }
  };
}, as = function(e) {
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
        crossAxis: a = !1,
        limiter: i = {
          fn: (g) => {
            let {
              x: v,
              y
            } = g;
            return {
              x: v,
              y
            };
          }
        },
        ...u
      } = J(e, t), c = {
        x: n,
        y: r
      }, l = await ke(t, u), d = Y(ee(o)), m = yt(d);
      let h = c[m], b = c[d];
      if (s) {
        const g = m === "y" ? "top" : "left", v = m === "y" ? "bottom" : "right", y = h + l[g], w = h - l[v];
        h = ft(y, h, w);
      }
      if (a) {
        const g = d === "y" ? "top" : "left", v = d === "y" ? "bottom" : "right", y = b + l[g], w = b - l[v];
        b = ft(y, b, w);
      }
      const p = i.fn({
        ...t,
        [m]: h,
        [d]: b
      });
      return {
        ...p,
        data: {
          x: p.x - n,
          y: p.y - r,
          enabled: {
            [m]: s,
            [d]: a
          }
        }
      };
    }
  };
}, cs = function(e) {
  return e === void 0 && (e = {}), {
    options: e,
    fn(t) {
      const {
        x: n,
        y: r,
        placement: o,
        rects: s,
        middlewareData: a
      } = t, {
        offset: i = 0,
        mainAxis: u = !0,
        crossAxis: c = !0
      } = J(e, t), l = {
        x: n,
        y: r
      }, d = Y(o), m = yt(d);
      let h = l[m], b = l[d];
      const p = J(i, t), g = typeof p == "number" ? {
        mainAxis: p,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...p
      };
      if (u) {
        const w = m === "y" ? "height" : "width", x = s.reference[m] - s.floating[w] + g.mainAxis, C = s.reference[m] + s.reference[w] - g.mainAxis;
        h < x ? h = x : h > C && (h = C);
      }
      if (c) {
        var v, y;
        const w = m === "y" ? "width" : "height", x = kn.has(ee(o)), C = s.reference[d] - s.floating[w] + (x && ((v = a.offset) == null ? void 0 : v[d]) || 0) + (x ? 0 : g.crossAxis), P = s.reference[d] + s.reference[w] + (x ? 0 : ((y = a.offset) == null ? void 0 : y[d]) || 0) - (x ? g.crossAxis : 0);
        b < C ? b = C : b > P && (b = P);
      }
      return {
        [m]: h,
        [d]: b
      };
    }
  };
}, ls = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(t) {
      var n, r;
      const {
        placement: o,
        rects: s,
        platform: a,
        elements: i
      } = t, {
        apply: u = () => {
        },
        ...c
      } = J(e, t), l = await ke(t, c), d = ee(o), m = Se(o), h = Y(o) === "y", {
        width: b,
        height: p
      } = s.floating;
      let g, v;
      d === "top" || d === "bottom" ? (g = d, v = m === (await (a.isRTL == null ? void 0 : a.isRTL(i.floating)) ? "start" : "end") ? "left" : "right") : (v = d, g = m === "end" ? "top" : "bottom");
      const y = p - l.top - l.bottom, w = b - l.left - l.right, x = ce(p - l[g], y), C = ce(b - l[v], w), P = !t.middlewareData.shift;
      let S = x, k = C;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (k = w), (r = t.middlewareData.shift) != null && r.enabled.y && (S = y), P && !m) {
        const M = V(l.left, 0), $ = V(l.right, 0), R = V(l.top, 0), _ = V(l.bottom, 0);
        h ? k = b - 2 * (M !== 0 || $ !== 0 ? M + $ : V(l.left, l.right)) : S = p - 2 * (R !== 0 || _ !== 0 ? R + _ : V(l.top, l.bottom));
      }
      await u({
        ...t,
        availableWidth: k,
        availableHeight: S
      });
      const T = await a.getDimensions(i.floating);
      return b !== T.width || p !== T.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function Ye() {
  return typeof window < "u";
}
function Ae(e) {
  return Mn(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function H(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function q(e) {
  var t;
  return (t = (Mn(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Mn(e) {
  return Ye() ? e instanceof Node || e instanceof H(e).Node : !1;
}
function U(e) {
  return Ye() ? e instanceof Element || e instanceof H(e).Element : !1;
}
function Z(e) {
  return Ye() ? e instanceof HTMLElement || e instanceof H(e).HTMLElement : !1;
}
function tn(e) {
  return !Ye() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof H(e).ShadowRoot;
}
const us = /* @__PURE__ */ new Set(["inline", "contents"]);
function Te(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: o
  } = G(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !us.has(o);
}
const ds = /* @__PURE__ */ new Set(["table", "td", "th"]);
function fs(e) {
  return ds.has(Ae(e));
}
const ps = [":popover-open", ":modal"];
function Ke(e) {
  return ps.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const ms = ["transform", "translate", "scale", "rotate", "perspective"], hs = ["transform", "translate", "scale", "rotate", "perspective", "filter"], gs = ["paint", "layout", "strict", "content"];
function Ct(e) {
  const t = Et(), n = U(e) ? G(e) : e;
  return ms.some((r) => n[r] ? n[r] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || hs.some((r) => (n.willChange || "").includes(r)) || gs.some((r) => (n.contain || "").includes(r));
}
function vs(e) {
  let t = le(e);
  for (; Z(t) && !we(t); ) {
    if (Ct(t))
      return t;
    if (Ke(t))
      return null;
    t = le(t);
  }
  return null;
}
function Et() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const bs = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function we(e) {
  return bs.has(Ae(e));
}
function G(e) {
  return H(e).getComputedStyle(e);
}
function Ze(e) {
  return U(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function le(e) {
  if (Ae(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    tn(e) && e.host || // Fallback.
    q(e)
  );
  return tn(t) ? t.host : t;
}
function Tn(e) {
  const t = le(e);
  return we(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : Z(t) && Te(t) ? t : Tn(t);
}
function Me(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = Tn(e), s = o === ((r = e.ownerDocument) == null ? void 0 : r.body), a = H(o);
  if (s) {
    const i = mt(a);
    return t.concat(a, a.visualViewport || [], Te(o) ? o : [], i && n ? Me(i) : []);
  }
  return t.concat(o, Me(o, [], n));
}
function mt(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function Ln(e) {
  const t = G(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const o = Z(e), s = o ? e.offsetWidth : n, a = o ? e.offsetHeight : r, i = He(n) !== s || He(r) !== a;
  return i && (n = s, r = a), {
    width: n,
    height: r,
    $: i
  };
}
function St(e) {
  return U(e) ? e : e.contextElement;
}
function ve(e) {
  const t = St(e);
  if (!Z(t))
    return K(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: o,
    $: s
  } = Ln(t);
  let a = (s ? He(n.width) : n.width) / r, i = (s ? He(n.height) : n.height) / o;
  return (!a || !Number.isFinite(a)) && (a = 1), (!i || !Number.isFinite(i)) && (i = 1), {
    x: a,
    y: i
  };
}
const ys = /* @__PURE__ */ K(0);
function Dn(e) {
  const t = H(e);
  return !Et() || !t.visualViewport ? ys : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function ws(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== H(e) ? !1 : t;
}
function fe(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), s = St(e);
  let a = K(1);
  t && (r ? U(r) && (a = ve(r)) : a = ve(e));
  const i = ws(s, n, r) ? Dn(s) : K(0);
  let u = (o.left + i.x) / a.x, c = (o.top + i.y) / a.y, l = o.width / a.x, d = o.height / a.y;
  if (s) {
    const m = H(s), h = r && U(r) ? H(r) : r;
    let b = m, p = mt(b);
    for (; p && r && h !== b; ) {
      const g = ve(p), v = p.getBoundingClientRect(), y = G(p), w = v.left + (p.clientLeft + parseFloat(y.paddingLeft)) * g.x, x = v.top + (p.clientTop + parseFloat(y.paddingTop)) * g.y;
      u *= g.x, c *= g.y, l *= g.x, d *= g.y, u += w, c += x, b = H(p), p = mt(b);
    }
  }
  return Ge({
    width: l,
    height: d,
    x: u,
    y: c
  });
}
function qe(e, t) {
  const n = Ze(e).scrollLeft;
  return t ? t.left + n : fe(q(e)).left + n;
}
function _n(e, t) {
  const n = e.getBoundingClientRect(), r = n.left + t.scrollLeft - qe(e, n), o = n.top + t.scrollTop;
  return {
    x: r,
    y: o
  };
}
function xs(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: r,
    strategy: o
  } = e;
  const s = o === "fixed", a = q(r), i = t ? Ke(t.floating) : !1;
  if (r === a || i && s)
    return n;
  let u = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = K(1);
  const l = K(0), d = Z(r);
  if ((d || !d && !s) && ((Ae(r) !== "body" || Te(a)) && (u = Ze(r)), Z(r))) {
    const h = fe(r);
    c = ve(r), l.x = h.x + r.clientLeft, l.y = h.y + r.clientTop;
  }
  const m = a && !d && !s ? _n(a, u) : K(0);
  return {
    width: n.width * c.x,
    height: n.height * c.y,
    x: n.x * c.x - u.scrollLeft * c.x + l.x + m.x,
    y: n.y * c.y - u.scrollTop * c.y + l.y + m.y
  };
}
function Cs(e) {
  return Array.from(e.getClientRects());
}
function Es(e) {
  const t = q(e), n = Ze(e), r = e.ownerDocument.body, o = V(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), s = V(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let a = -n.scrollLeft + qe(e);
  const i = -n.scrollTop;
  return G(r).direction === "rtl" && (a += V(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: s,
    x: a,
    y: i
  };
}
const nn = 25;
function Ss(e, t) {
  const n = H(e), r = q(e), o = n.visualViewport;
  let s = r.clientWidth, a = r.clientHeight, i = 0, u = 0;
  if (o) {
    s = o.width, a = o.height;
    const l = Et();
    (!l || l && t === "fixed") && (i = o.offsetLeft, u = o.offsetTop);
  }
  const c = qe(r);
  if (c <= 0) {
    const l = r.ownerDocument, d = l.body, m = getComputedStyle(d), h = l.compatMode === "CSS1Compat" && parseFloat(m.marginLeft) + parseFloat(m.marginRight) || 0, b = Math.abs(r.clientWidth - d.clientWidth - h);
    b <= nn && (s -= b);
  } else c <= nn && (s += c);
  return {
    width: s,
    height: a,
    x: i,
    y: u
  };
}
const As = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function Ps(e, t) {
  const n = fe(e, !0, t === "fixed"), r = n.top + e.clientTop, o = n.left + e.clientLeft, s = Z(e) ? ve(e) : K(1), a = e.clientWidth * s.x, i = e.clientHeight * s.y, u = o * s.x, c = r * s.y;
  return {
    width: a,
    height: i,
    x: u,
    y: c
  };
}
function rn(e, t, n) {
  let r;
  if (t === "viewport")
    r = Ss(e, n);
  else if (t === "document")
    r = Es(q(e));
  else if (U(t))
    r = Ps(t, n);
  else {
    const o = Dn(e);
    r = {
      x: t.x - o.x,
      y: t.y - o.y,
      width: t.width,
      height: t.height
    };
  }
  return Ge(r);
}
function In(e, t) {
  const n = le(e);
  return n === t || !U(n) || we(n) ? !1 : G(n).position === "fixed" || In(n, t);
}
function Rs(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = Me(e, [], !1).filter((i) => U(i) && Ae(i) !== "body"), o = null;
  const s = G(e).position === "fixed";
  let a = s ? le(e) : e;
  for (; U(a) && !we(a); ) {
    const i = G(a), u = Ct(a);
    !u && i.position === "fixed" && (o = null), (s ? !u && !o : !u && i.position === "static" && !!o && As.has(o.position) || Te(a) && !u && In(e, a)) ? r = r.filter((l) => l !== a) : o = i, a = le(a);
  }
  return t.set(e, r), r;
}
function Os(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = e;
  const a = [...n === "clippingAncestors" ? Ke(t) ? [] : Rs(t, this._c) : [].concat(n), r], i = a[0], u = a.reduce((c, l) => {
    const d = rn(t, l, o);
    return c.top = V(d.top, c.top), c.right = ce(d.right, c.right), c.bottom = ce(d.bottom, c.bottom), c.left = V(d.left, c.left), c;
  }, rn(t, i, o));
  return {
    width: u.right - u.left,
    height: u.bottom - u.top,
    x: u.left,
    y: u.top
  };
}
function Ns(e) {
  const {
    width: t,
    height: n
  } = Ln(e);
  return {
    width: t,
    height: n
  };
}
function ks(e, t, n) {
  const r = Z(t), o = q(t), s = n === "fixed", a = fe(e, !0, s, t);
  let i = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const u = K(0);
  function c() {
    u.x = qe(o);
  }
  if (r || !r && !s)
    if ((Ae(t) !== "body" || Te(o)) && (i = Ze(t)), r) {
      const h = fe(t, !0, s, t);
      u.x = h.x + t.clientLeft, u.y = h.y + t.clientTop;
    } else o && c();
  s && !r && o && c();
  const l = o && !r && !s ? _n(o, i) : K(0), d = a.left + i.scrollLeft - u.x - l.x, m = a.top + i.scrollTop - u.y - l.y;
  return {
    x: d,
    y: m,
    width: a.width,
    height: a.height
  };
}
function ot(e) {
  return G(e).position === "static";
}
function on(e, t) {
  if (!Z(e) || G(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return q(e) === n && (n = n.ownerDocument.body), n;
}
function Fn(e, t) {
  const n = H(e);
  if (Ke(e))
    return n;
  if (!Z(e)) {
    let o = le(e);
    for (; o && !we(o); ) {
      if (U(o) && !ot(o))
        return o;
      o = le(o);
    }
    return n;
  }
  let r = on(e, t);
  for (; r && fs(r) && ot(r); )
    r = on(r, t);
  return r && we(r) && ot(r) && !Ct(r) ? n : r || vs(e) || n;
}
const Ms = async function(e) {
  const t = this.getOffsetParent || Fn, n = this.getDimensions, r = await n(e.floating);
  return {
    reference: ks(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function Ts(e) {
  return G(e).direction === "rtl";
}
const Ls = {
  convertOffsetParentRelativeRectToViewportRelativeRect: xs,
  getDocumentElement: q,
  getClippingRect: Os,
  getOffsetParent: Fn,
  getElementRects: Ms,
  getClientRects: Cs,
  getDimensions: Ns,
  getScale: ve,
  isElement: U,
  isRTL: Ts
};
function Wn(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Ds(e, t) {
  let n = null, r;
  const o = q(e);
  function s() {
    var i;
    clearTimeout(r), (i = n) == null || i.disconnect(), n = null;
  }
  function a(i, u) {
    i === void 0 && (i = !1), u === void 0 && (u = 1), s();
    const c = e.getBoundingClientRect(), {
      left: l,
      top: d,
      width: m,
      height: h
    } = c;
    if (i || t(), !m || !h)
      return;
    const b = _e(d), p = _e(o.clientWidth - (l + m)), g = _e(o.clientHeight - (d + h)), v = _e(l), w = {
      rootMargin: -b + "px " + -p + "px " + -g + "px " + -v + "px",
      threshold: V(0, ce(1, u)) || 1
    };
    let x = !0;
    function C(P) {
      const S = P[0].intersectionRatio;
      if (S !== u) {
        if (!x)
          return a();
        S ? a(!1, S) : r = setTimeout(() => {
          a(!1, 1e-7);
        }, 1e3);
      }
      S === 1 && !Wn(c, e.getBoundingClientRect()) && a(), x = !1;
    }
    try {
      n = new IntersectionObserver(C, {
        ...w,
        // Handle <iframe>s
        root: o.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(C, w);
    }
    n.observe(e);
  }
  return a(!0), s;
}
function _s(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: s = !0,
    elementResize: a = typeof ResizeObserver == "function",
    layoutShift: i = typeof IntersectionObserver == "function",
    animationFrame: u = !1
  } = r, c = St(e), l = o || s ? [...c ? Me(c) : [], ...Me(t)] : [];
  l.forEach((v) => {
    o && v.addEventListener("scroll", n, {
      passive: !0
    }), s && v.addEventListener("resize", n);
  });
  const d = c && i ? Ds(c, n) : null;
  let m = -1, h = null;
  a && (h = new ResizeObserver((v) => {
    let [y] = v;
    y && y.target === c && h && (h.unobserve(t), cancelAnimationFrame(m), m = requestAnimationFrame(() => {
      var w;
      (w = h) == null || w.observe(t);
    })), n();
  }), c && !u && h.observe(c), h.observe(t));
  let b, p = u ? fe(e) : null;
  u && g();
  function g() {
    const v = fe(e);
    p && !Wn(p, v) && n(), p = v, b = requestAnimationFrame(g);
  }
  return n(), () => {
    var v;
    l.forEach((y) => {
      o && y.removeEventListener("scroll", n), s && y.removeEventListener("resize", n);
    }), d == null || d(), (v = h) == null || v.disconnect(), h = null, u && cancelAnimationFrame(b);
  };
}
const Is = is, Fs = as, Ws = rs, zs = ls, $s = os, sn = ns, Bs = cs, js = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: Ls,
    ...n
  }, s = {
    ...o.platform,
    _c: r
  };
  return ts(e, t, {
    ...o,
    platform: s
  });
};
var Vs = typeof document < "u", Hs = function() {
}, Be = Vs ? Or : Hs;
function Xe(e, t) {
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
        if (!Xe(e[r], t[r]))
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
      if (!(s === "_owner" && e.$$typeof) && !Xe(e[s], t[s]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function zn(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function an(e, t) {
  const n = zn(e);
  return Math.round(t * n) / n;
}
function st(e) {
  const t = f.useRef(e);
  return Be(() => {
    t.current = e;
  }), t;
}
function Us(e) {
  e === void 0 && (e = {});
  const {
    placement: t = "bottom",
    strategy: n = "absolute",
    middleware: r = [],
    platform: o,
    elements: {
      reference: s,
      floating: a
    } = {},
    transform: i = !0,
    whileElementsMounted: u,
    open: c
  } = e, [l, d] = f.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [m, h] = f.useState(r);
  Xe(m, r) || h(r);
  const [b, p] = f.useState(null), [g, v] = f.useState(null), y = f.useCallback((N) => {
    N !== P.current && (P.current = N, p(N));
  }, []), w = f.useCallback((N) => {
    N !== S.current && (S.current = N, v(N));
  }, []), x = s || b, C = a || g, P = f.useRef(null), S = f.useRef(null), k = f.useRef(l), T = u != null, M = st(u), $ = st(o), R = st(c), _ = f.useCallback(() => {
    if (!P.current || !S.current)
      return;
    const N = {
      placement: t,
      strategy: n,
      middleware: m
    };
    $.current && (N.platform = $.current), js(P.current, S.current, N).then((W) => {
      const j = {
        ...W,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: R.current !== !1
      };
      A.current && !Xe(k.current, j) && (k.current = j, pn.flushSync(() => {
        d(j);
      }));
    });
  }, [m, t, n, $, R]);
  Be(() => {
    c === !1 && k.current.isPositioned && (k.current.isPositioned = !1, d((N) => ({
      ...N,
      isPositioned: !1
    })));
  }, [c]);
  const A = f.useRef(!1);
  Be(() => (A.current = !0, () => {
    A.current = !1;
  }), []), Be(() => {
    if (x && (P.current = x), C && (S.current = C), x && C) {
      if (M.current)
        return M.current(x, C, _);
      _();
    }
  }, [x, C, _, M, T]);
  const I = f.useMemo(() => ({
    reference: P,
    floating: S,
    setReference: y,
    setFloating: w
  }), [y, w]), L = f.useMemo(() => ({
    reference: x,
    floating: C
  }), [x, C]), F = f.useMemo(() => {
    const N = {
      position: n,
      left: 0,
      top: 0
    };
    if (!L.floating)
      return N;
    const W = an(L.floating, l.x), j = an(L.floating, l.y);
    return i ? {
      ...N,
      transform: "translate(" + W + "px, " + j + "px)",
      ...zn(L.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: W,
      top: j
    };
  }, [n, i, L.floating, l.x, l.y]);
  return f.useMemo(() => ({
    ...l,
    update: _,
    refs: I,
    elements: L,
    floatingStyles: F
  }), [l, _, I, L, F]);
}
const Gs = (e) => {
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
      return r && t(r) ? r.current != null ? sn({
        element: r.current,
        padding: o
      }).fn(n) : {} : r ? sn({
        element: r,
        padding: o
      }).fn(n) : {};
    }
  };
}, Xs = (e, t) => ({
  ...Is(e),
  options: [e, t]
}), Ys = (e, t) => ({
  ...Fs(e),
  options: [e, t]
}), Ks = (e, t) => ({
  ...Bs(e),
  options: [e, t]
}), Zs = (e, t) => ({
  ...Ws(e),
  options: [e, t]
}), qs = (e, t) => ({
  ...zs(e),
  options: [e, t]
}), Qs = (e, t) => ({
  ...$s(e),
  options: [e, t]
}), Js = (e, t) => ({
  ...Gs(e),
  options: [e, t]
});
var ei = "Arrow", $n = f.forwardRef((e, t) => {
  const { children: n, width: r = 10, height: o = 5, ...s } = e;
  return /* @__PURE__ */ E(
    te.svg,
    {
      ...s,
      ref: t,
      width: r,
      height: o,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? n : /* @__PURE__ */ E("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
$n.displayName = ei;
var ti = $n;
function ni(e) {
  const [t, n] = f.useState(void 0);
  return ae(() => {
    if (e) {
      n({ width: e.offsetWidth, height: e.offsetHeight });
      const r = new ResizeObserver((o) => {
        if (!Array.isArray(o) || !o.length)
          return;
        const s = o[0];
        let a, i;
        if ("borderBoxSize" in s) {
          const u = s.borderBoxSize, c = Array.isArray(u) ? u[0] : u;
          a = c.inlineSize, i = c.blockSize;
        } else
          a = e.offsetWidth, i = e.offsetHeight;
        n({ width: a, height: i });
      });
      return r.observe(e, { box: "border-box" }), () => r.unobserve(e);
    } else
      n(void 0);
  }, [e]), t;
}
var At = "Popper", [Bn, jn] = Cn(At), [ri, Vn] = Bn(At), Hn = (e) => {
  const { __scopePopper: t, children: n } = e, [r, o] = f.useState(null);
  return /* @__PURE__ */ E(ri, { scope: t, anchor: r, onAnchorChange: o, children: n });
};
Hn.displayName = At;
var Un = "PopperAnchor", Gn = f.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: r, ...o } = e, s = Vn(Un, n), a = f.useRef(null), i = ue(t, a), u = f.useRef(null);
    return f.useEffect(() => {
      const c = u.current;
      u.current = (r == null ? void 0 : r.current) || a.current, c !== u.current && s.onAnchorChange(u.current);
    }), r ? null : /* @__PURE__ */ E(te.div, { ...o, ref: i });
  }
);
Gn.displayName = Un;
var Pt = "PopperContent", [oi, si] = Bn(Pt), Xn = f.forwardRef(
  (e, t) => {
    var Nt, kt, Mt, Tt, Lt, Dt;
    const {
      __scopePopper: n,
      side: r = "bottom",
      sideOffset: o = 0,
      align: s = "center",
      alignOffset: a = 0,
      arrowPadding: i = 0,
      avoidCollisions: u = !0,
      collisionBoundary: c = [],
      collisionPadding: l = 0,
      sticky: d = "partial",
      hideWhenDetached: m = !1,
      updatePositionStrategy: h = "optimized",
      onPlaced: b,
      ...p
    } = e, g = Vn(Pt, n), [v, y] = f.useState(null), w = ue(t, (Pe) => y(Pe)), [x, C] = f.useState(null), P = ni(x), S = (P == null ? void 0 : P.width) ?? 0, k = (P == null ? void 0 : P.height) ?? 0, T = r + (s !== "center" ? "-" + s : ""), M = typeof l == "number" ? l : { top: 0, right: 0, bottom: 0, left: 0, ...l }, $ = Array.isArray(c) ? c : [c], R = $.length > 0, _ = {
      padding: M,
      boundary: $.filter(ai),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: R
    }, { refs: A, floatingStyles: I, placement: L, isPositioned: F, middlewareData: N } = Us({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: T,
      whileElementsMounted: (...Pe) => _s(...Pe, {
        animationFrame: h === "always"
      }),
      elements: {
        reference: g.anchor
      },
      middleware: [
        Xs({ mainAxis: o + k, alignmentAxis: a }),
        u && Ys({
          mainAxis: !0,
          crossAxis: !1,
          limiter: d === "partial" ? Ks() : void 0,
          ..._
        }),
        u && Zs({ ..._ }),
        qs({
          ..._,
          apply: ({ elements: Pe, rects: _t, availableWidth: Sr, availableHeight: Ar }) => {
            const { width: Pr, height: Rr } = _t.reference, De = Pe.floating.style;
            De.setProperty("--radix-popper-available-width", `${Sr}px`), De.setProperty("--radix-popper-available-height", `${Ar}px`), De.setProperty("--radix-popper-anchor-width", `${Pr}px`), De.setProperty("--radix-popper-anchor-height", `${Rr}px`);
          }
        }),
        x && Js({ element: x, padding: i }),
        ci({ arrowWidth: S, arrowHeight: k }),
        m && Qs({ strategy: "referenceHidden", ..._ })
      ]
    }), [W, j] = Zn(L), B = ye(b);
    ae(() => {
      F && (B == null || B());
    }, [F, B]);
    const yr = (Nt = N.arrow) == null ? void 0 : Nt.x, wr = (kt = N.arrow) == null ? void 0 : kt.y, xr = ((Mt = N.arrow) == null ? void 0 : Mt.centerOffset) !== 0, [Cr, Er] = f.useState();
    return ae(() => {
      v && Er(window.getComputedStyle(v).zIndex);
    }, [v]), /* @__PURE__ */ E(
      "div",
      {
        ref: A.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...I,
          transform: F ? I.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: Cr,
          "--radix-popper-transform-origin": [
            (Tt = N.transformOrigin) == null ? void 0 : Tt.x,
            (Lt = N.transformOrigin) == null ? void 0 : Lt.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...((Dt = N.hide) == null ? void 0 : Dt.referenceHidden) && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: e.dir,
        children: /* @__PURE__ */ E(
          oi,
          {
            scope: n,
            placedSide: W,
            onArrowChange: C,
            arrowX: yr,
            arrowY: wr,
            shouldHideArrow: xr,
            children: /* @__PURE__ */ E(
              te.div,
              {
                "data-side": W,
                "data-align": j,
                ...p,
                ref: w,
                style: {
                  ...p.style,
                  // if the PopperContent hasn't been placed yet (not all measurements done)
                  // we prevent animations so that users's animation don't kick in too early referring wrong sides
                  animation: F ? void 0 : "none"
                }
              }
            )
          }
        )
      }
    );
  }
);
Xn.displayName = Pt;
var Yn = "PopperArrow", ii = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, Kn = f.forwardRef(function(t, n) {
  const { __scopePopper: r, ...o } = t, s = si(Yn, r), a = ii[s.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ E(
      "span",
      {
        ref: s.onArrowChange,
        style: {
          position: "absolute",
          left: s.arrowX,
          top: s.arrowY,
          [a]: 0,
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
        children: /* @__PURE__ */ E(
          ti,
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
Kn.displayName = Yn;
function ai(e) {
  return e !== null;
}
var ci = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    var g, v, y;
    const { placement: n, rects: r, middlewareData: o } = t, a = ((g = o.arrow) == null ? void 0 : g.centerOffset) !== 0, i = a ? 0 : e.arrowWidth, u = a ? 0 : e.arrowHeight, [c, l] = Zn(n), d = { start: "0%", center: "50%", end: "100%" }[l], m = (((v = o.arrow) == null ? void 0 : v.x) ?? 0) + i / 2, h = (((y = o.arrow) == null ? void 0 : y.y) ?? 0) + u / 2;
    let b = "", p = "";
    return c === "bottom" ? (b = a ? d : `${m}px`, p = `${-u}px`) : c === "top" ? (b = a ? d : `${m}px`, p = `${r.floating.height + u}px`) : c === "right" ? (b = `${-u}px`, p = a ? d : `${h}px`) : c === "left" && (b = `${r.floating.width + u}px`, p = a ? d : `${h}px`), { data: { x: b, y: p } };
  }
});
function Zn(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var li = Hn, qn = Gn, ui = Xn, di = Kn, fi = "Portal", Qn = f.forwardRef((e, t) => {
  var i;
  const { container: n, ...r } = e, [o, s] = f.useState(!1);
  ae(() => s(!0), []);
  const a = n || o && ((i = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : i.body);
  return a ? Nr.createPortal(/* @__PURE__ */ E(te.div, { ...r, ref: t }), a) : null;
});
Qn.displayName = fi;
function pi(e, t) {
  return f.useReducer((n, r) => t[n][r] ?? n, e);
}
var Rt = (e) => {
  const { present: t, children: n } = e, r = mi(t), o = typeof n == "function" ? n({ present: r.isPresent }) : f.Children.only(n), s = ue(r.ref, hi(o));
  return typeof n == "function" || r.isPresent ? f.cloneElement(o, { ref: s }) : null;
};
Rt.displayName = "Presence";
function mi(e) {
  const [t, n] = f.useState(), r = f.useRef(null), o = f.useRef(e), s = f.useRef("none"), a = e ? "mounted" : "unmounted", [i, u] = pi(a, {
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
  return f.useEffect(() => {
    const c = Ie(r.current);
    s.current = i === "mounted" ? c : "none";
  }, [i]), ae(() => {
    const c = r.current, l = o.current;
    if (l !== e) {
      const m = s.current, h = Ie(c);
      e ? u("MOUNT") : h === "none" || (c == null ? void 0 : c.display) === "none" ? u("UNMOUNT") : u(l && m !== h ? "ANIMATION_OUT" : "UNMOUNT"), o.current = e;
    }
  }, [e, u]), ae(() => {
    if (t) {
      let c;
      const l = t.ownerDocument.defaultView ?? window, d = (h) => {
        const p = Ie(r.current).includes(CSS.escape(h.animationName));
        if (h.target === t && p && (u("ANIMATION_END"), !o.current)) {
          const g = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", c = l.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = g);
          });
        }
      }, m = (h) => {
        h.target === t && (s.current = Ie(r.current));
      };
      return t.addEventListener("animationstart", m), t.addEventListener("animationcancel", d), t.addEventListener("animationend", d), () => {
        l.clearTimeout(c), t.removeEventListener("animationstart", m), t.removeEventListener("animationcancel", d), t.removeEventListener("animationend", d);
      };
    } else
      u("ANIMATION_END");
  }, [t, u]), {
    isPresent: ["mounted", "unmountSuspended"].includes(i),
    ref: f.useCallback((c) => {
      r.current = c ? getComputedStyle(c) : null, n(c);
    }, [])
  };
}
function Ie(e) {
  return (e == null ? void 0 : e.animationName) || "none";
}
function hi(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var gi = f[" useInsertionEffect ".trim().toString()] || ae;
function vi({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: r
}) {
  const [o, s, a] = bi({
    defaultProp: t,
    onChange: n
  }), i = e !== void 0, u = i ? e : o;
  {
    const l = f.useRef(e !== void 0);
    f.useEffect(() => {
      const d = l.current;
      d !== i && console.warn(
        `${r} is changing from ${d ? "controlled" : "uncontrolled"} to ${i ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), l.current = i;
    }, [i, r]);
  }
  const c = f.useCallback(
    (l) => {
      var d;
      if (i) {
        const m = yi(l) ? l(e) : l;
        m !== e && ((d = a.current) == null || d.call(a, m));
      } else
        s(l);
    },
    [i, e, s, a]
  );
  return [u, c];
}
function bi({
  defaultProp: e,
  onChange: t
}) {
  const [n, r] = f.useState(e), o = f.useRef(n), s = f.useRef(t);
  return gi(() => {
    s.current = t;
  }, [t]), f.useEffect(() => {
    var a;
    o.current !== n && ((a = s.current) == null || a.call(s, n), o.current = n);
  }, [n, o]), [n, r, s];
}
function yi(e) {
  return typeof e == "function";
}
var wi = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, pe = /* @__PURE__ */ new WeakMap(), Fe = /* @__PURE__ */ new WeakMap(), We = {}, it = 0, Jn = function(e) {
  return e && (e.host || Jn(e.parentNode));
}, xi = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var r = Jn(n);
    return r && e.contains(r) ? r : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, Ci = function(e, t, n, r) {
  var o = xi(t, Array.isArray(e) ? e : [e]);
  We[n] || (We[n] = /* @__PURE__ */ new WeakMap());
  var s = We[n], a = [], i = /* @__PURE__ */ new Set(), u = new Set(o), c = function(d) {
    !d || i.has(d) || (i.add(d), c(d.parentNode));
  };
  o.forEach(c);
  var l = function(d) {
    !d || u.has(d) || Array.prototype.forEach.call(d.children, function(m) {
      if (i.has(m))
        l(m);
      else
        try {
          var h = m.getAttribute(r), b = h !== null && h !== "false", p = (pe.get(m) || 0) + 1, g = (s.get(m) || 0) + 1;
          pe.set(m, p), s.set(m, g), a.push(m), p === 1 && b && Fe.set(m, !0), g === 1 && m.setAttribute(n, "true"), b || m.setAttribute(r, "true");
        } catch (v) {
          console.error("aria-hidden: cannot operate on ", m, v);
        }
    });
  };
  return l(t), i.clear(), it++, function() {
    a.forEach(function(d) {
      var m = pe.get(d) - 1, h = s.get(d) - 1;
      pe.set(d, m), s.set(d, h), m || (Fe.has(d) || d.removeAttribute(r), Fe.delete(d)), h || d.removeAttribute(n);
    }), it--, it || (pe = /* @__PURE__ */ new WeakMap(), pe = /* @__PURE__ */ new WeakMap(), Fe = /* @__PURE__ */ new WeakMap(), We = {});
  };
}, Ei = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var r = Array.from(Array.isArray(e) ? e : [e]), o = wi(e);
  return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live], script"))), Ci(r, o, n, "aria-hidden")) : function() {
    return null;
  };
}, X = function() {
  return X = Object.assign || function(t) {
    for (var n, r = 1, o = arguments.length; r < o; r++) {
      n = arguments[r];
      for (var s in n) Object.prototype.hasOwnProperty.call(n, s) && (t[s] = n[s]);
    }
    return t;
  }, X.apply(this, arguments);
};
function er(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  return n;
}
function Si(e, t, n) {
  if (n || arguments.length === 2) for (var r = 0, o = t.length, s; r < o; r++)
    (s || !(r in t)) && (s || (s = Array.prototype.slice.call(t, 0, r)), s[r] = t[r]);
  return e.concat(s || Array.prototype.slice.call(t));
}
var je = "right-scroll-bar-position", Ve = "width-before-scroll-bar", Ai = "with-scroll-bars-hidden", Pi = "--removed-body-scroll-bar-size";
function at(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function Ri(e, t) {
  var n = Ne(function() {
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
var Oi = typeof window < "u" ? f.useLayoutEffect : f.useEffect, cn = /* @__PURE__ */ new WeakMap();
function Ni(e, t) {
  var n = Ri(null, function(r) {
    return e.forEach(function(o) {
      return at(o, r);
    });
  });
  return Oi(function() {
    var r = cn.get(n);
    if (r) {
      var o = new Set(r), s = new Set(e), a = n.current;
      o.forEach(function(i) {
        s.has(i) || at(i, null);
      }), s.forEach(function(i) {
        o.has(i) || at(i, a);
      });
    }
    cn.set(n, e);
  }, [e]), n;
}
function ki(e) {
  return e;
}
function Mi(e, t) {
  t === void 0 && (t = ki);
  var n = [], r = !1, o = {
    read: function() {
      if (r)
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      return n.length ? n[n.length - 1] : e;
    },
    useMedium: function(s) {
      var a = t(s, r);
      return n.push(a), function() {
        n = n.filter(function(i) {
          return i !== a;
        });
      };
    },
    assignSyncMedium: function(s) {
      for (r = !0; n.length; ) {
        var a = n;
        n = [], a.forEach(s);
      }
      n = {
        push: function(i) {
          return s(i);
        },
        filter: function() {
          return n;
        }
      };
    },
    assignMedium: function(s) {
      r = !0;
      var a = [];
      if (n.length) {
        var i = n;
        n = [], i.forEach(s), a = n;
      }
      var u = function() {
        var l = a;
        a = [], l.forEach(s);
      }, c = function() {
        return Promise.resolve().then(u);
      };
      c(), n = {
        push: function(l) {
          a.push(l), c();
        },
        filter: function(l) {
          return a = a.filter(l), n;
        }
      };
    }
  };
  return o;
}
function Ti(e) {
  e === void 0 && (e = {});
  var t = Mi(null);
  return t.options = X({ async: !0, ssr: !1 }, e), t;
}
var tr = function(e) {
  var t = e.sideCar, n = er(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = t.read();
  if (!r)
    throw new Error("Sidecar medium not found");
  return f.createElement(r, X({}, n));
};
tr.isSideCarExport = !0;
function Li(e, t) {
  return e.useMedium(t), tr;
}
var nr = Ti(), ct = function() {
}, Qe = f.forwardRef(function(e, t) {
  var n = f.useRef(null), r = f.useState({
    onScrollCapture: ct,
    onWheelCapture: ct,
    onTouchMoveCapture: ct
  }), o = r[0], s = r[1], a = e.forwardProps, i = e.children, u = e.className, c = e.removeScrollBar, l = e.enabled, d = e.shards, m = e.sideCar, h = e.noRelative, b = e.noIsolation, p = e.inert, g = e.allowPinchZoom, v = e.as, y = v === void 0 ? "div" : v, w = e.gapMode, x = er(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), C = m, P = Ni([n, t]), S = X(X({}, x), o);
  return f.createElement(
    f.Fragment,
    null,
    l && f.createElement(C, { sideCar: nr, removeScrollBar: c, shards: d, noRelative: h, noIsolation: b, inert: p, setCallbacks: s, allowPinchZoom: !!g, lockRef: n, gapMode: w }),
    a ? f.cloneElement(f.Children.only(i), X(X({}, S), { ref: P })) : f.createElement(y, X({}, S, { className: u, ref: P }), i)
  );
});
Qe.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
Qe.classNames = {
  fullWidth: Ve,
  zeroRight: je
};
var Di = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function _i() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = Di();
  return t && e.setAttribute("nonce", t), e;
}
function Ii(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function Fi(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var Wi = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = _i()) && (Ii(t, n), Fi(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, zi = function() {
  var e = Wi();
  return function(t, n) {
    f.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, rr = function() {
  var e = zi(), t = function(n) {
    var r = n.styles, o = n.dynamic;
    return e(r, o), null;
  };
  return t;
}, $i = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, lt = function(e) {
  return parseInt(e || "", 10) || 0;
}, Bi = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [lt(n), lt(r), lt(o)];
}, ji = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return $i;
  var t = Bi(e), n = document.documentElement.clientWidth, r = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, r - n + t[2] - t[0])
  };
}, Vi = rr(), be = "data-scroll-locked", Hi = function(e, t, n, r) {
  var o = e.left, s = e.top, a = e.right, i = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(Ai, ` {
   overflow: hidden `).concat(r, `;
   padding-right: `).concat(i, "px ").concat(r, `;
  }
  body[`).concat(be, `] {
    overflow: hidden `).concat(r, `;
    overscroll-behavior: contain;
    `).concat([
    t && "position: relative ".concat(r, ";"),
    n === "margin" && `
    padding-left: `.concat(o, `px;
    padding-top: `).concat(s, `px;
    padding-right: `).concat(a, `px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(i, "px ").concat(r, `;
    `),
    n === "padding" && "padding-right: ".concat(i, "px ").concat(r, ";")
  ].filter(Boolean).join(""), `
  }
  
  .`).concat(je, ` {
    right: `).concat(i, "px ").concat(r, `;
  }
  
  .`).concat(Ve, ` {
    margin-right: `).concat(i, "px ").concat(r, `;
  }
  
  .`).concat(je, " .").concat(je, ` {
    right: 0 `).concat(r, `;
  }
  
  .`).concat(Ve, " .").concat(Ve, ` {
    margin-right: 0 `).concat(r, `;
  }
  
  body[`).concat(be, `] {
    `).concat(Pi, ": ").concat(i, `px;
  }
`);
}, ln = function() {
  var e = parseInt(document.body.getAttribute(be) || "0", 10);
  return isFinite(e) ? e : 0;
}, Ui = function() {
  f.useEffect(function() {
    return document.body.setAttribute(be, (ln() + 1).toString()), function() {
      var e = ln() - 1;
      e <= 0 ? document.body.removeAttribute(be) : document.body.setAttribute(be, e.toString());
    };
  }, []);
}, Gi = function(e) {
  var t = e.noRelative, n = e.noImportant, r = e.gapMode, o = r === void 0 ? "margin" : r;
  Ui();
  var s = f.useMemo(function() {
    return ji(o);
  }, [o]);
  return f.createElement(Vi, { styles: Hi(s, !t, o, n ? "" : "!important") });
}, ht = !1;
if (typeof window < "u")
  try {
    var ze = Object.defineProperty({}, "passive", {
      get: function() {
        return ht = !0, !0;
      }
    });
    window.addEventListener("test", ze, ze), window.removeEventListener("test", ze, ze);
  } catch {
    ht = !1;
  }
var me = ht ? { passive: !1 } : !1, Xi = function(e) {
  return e.tagName === "TEXTAREA";
}, or = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !Xi(e) && n[t] === "visible")
  );
}, Yi = function(e) {
  return or(e, "overflowY");
}, Ki = function(e) {
  return or(e, "overflowX");
}, un = function(e, t) {
  var n = t.ownerDocument, r = t;
  do {
    typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
    var o = sr(e, r);
    if (o) {
      var s = ir(e, r), a = s[1], i = s[2];
      if (a > i)
        return !0;
    }
    r = r.parentNode;
  } while (r && r !== n.body);
  return !1;
}, Zi = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, r = e.clientHeight;
  return [
    t,
    n,
    r
  ];
}, qi = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, r = e.clientWidth;
  return [
    t,
    n,
    r
  ];
}, sr = function(e, t) {
  return e === "v" ? Yi(t) : Ki(t);
}, ir = function(e, t) {
  return e === "v" ? Zi(t) : qi(t);
}, Qi = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, Ji = function(e, t, n, r, o) {
  var s = Qi(e, window.getComputedStyle(t).direction), a = s * r, i = n.target, u = t.contains(i), c = !1, l = a > 0, d = 0, m = 0;
  do {
    if (!i)
      break;
    var h = ir(e, i), b = h[0], p = h[1], g = h[2], v = p - g - s * b;
    (b || v) && sr(e, i) && (d += v, m += b);
    var y = i.parentNode;
    i = y && y.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? y.host : y;
  } while (
    // portaled content
    !u && i !== document.body || // self content
    u && (t.contains(i) || t === i)
  );
  return (l && Math.abs(d) < 1 || !l && Math.abs(m) < 1) && (c = !0), c;
}, $e = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, dn = function(e) {
  return [e.deltaX, e.deltaY];
}, fn = function(e) {
  return e && "current" in e ? e.current : e;
}, ea = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, ta = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, na = 0, he = [];
function ra(e) {
  var t = f.useRef([]), n = f.useRef([0, 0]), r = f.useRef(), o = f.useState(na++)[0], s = f.useState(rr)[0], a = f.useRef(e);
  f.useEffect(function() {
    a.current = e;
  }, [e]), f.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var p = Si([e.lockRef.current], (e.shards || []).map(fn), !0).filter(Boolean);
      return p.forEach(function(g) {
        return g.classList.add("allow-interactivity-".concat(o));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(o)), p.forEach(function(g) {
          return g.classList.remove("allow-interactivity-".concat(o));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var i = f.useCallback(function(p, g) {
    if ("touches" in p && p.touches.length === 2 || p.type === "wheel" && p.ctrlKey)
      return !a.current.allowPinchZoom;
    var v = $e(p), y = n.current, w = "deltaX" in p ? p.deltaX : y[0] - v[0], x = "deltaY" in p ? p.deltaY : y[1] - v[1], C, P = p.target, S = Math.abs(w) > Math.abs(x) ? "h" : "v";
    if ("touches" in p && S === "h" && P.type === "range")
      return !1;
    var k = un(S, P);
    if (!k)
      return !0;
    if (k ? C = S : (C = S === "v" ? "h" : "v", k = un(S, P)), !k)
      return !1;
    if (!r.current && "changedTouches" in p && (w || x) && (r.current = C), !C)
      return !0;
    var T = r.current || C;
    return Ji(T, g, p, T === "h" ? w : x);
  }, []), u = f.useCallback(function(p) {
    var g = p;
    if (!(!he.length || he[he.length - 1] !== s)) {
      var v = "deltaY" in g ? dn(g) : $e(g), y = t.current.filter(function(C) {
        return C.name === g.type && (C.target === g.target || g.target === C.shadowParent) && ea(C.delta, v);
      })[0];
      if (y && y.should) {
        g.cancelable && g.preventDefault();
        return;
      }
      if (!y) {
        var w = (a.current.shards || []).map(fn).filter(Boolean).filter(function(C) {
          return C.contains(g.target);
        }), x = w.length > 0 ? i(g, w[0]) : !a.current.noIsolation;
        x && g.cancelable && g.preventDefault();
      }
    }
  }, []), c = f.useCallback(function(p, g, v, y) {
    var w = { name: p, delta: g, target: v, should: y, shadowParent: oa(v) };
    t.current.push(w), setTimeout(function() {
      t.current = t.current.filter(function(x) {
        return x !== w;
      });
    }, 1);
  }, []), l = f.useCallback(function(p) {
    n.current = $e(p), r.current = void 0;
  }, []), d = f.useCallback(function(p) {
    c(p.type, dn(p), p.target, i(p, e.lockRef.current));
  }, []), m = f.useCallback(function(p) {
    c(p.type, $e(p), p.target, i(p, e.lockRef.current));
  }, []);
  f.useEffect(function() {
    return he.push(s), e.setCallbacks({
      onScrollCapture: d,
      onWheelCapture: d,
      onTouchMoveCapture: m
    }), document.addEventListener("wheel", u, me), document.addEventListener("touchmove", u, me), document.addEventListener("touchstart", l, me), function() {
      he = he.filter(function(p) {
        return p !== s;
      }), document.removeEventListener("wheel", u, me), document.removeEventListener("touchmove", u, me), document.removeEventListener("touchstart", l, me);
    };
  }, []);
  var h = e.removeScrollBar, b = e.inert;
  return f.createElement(
    f.Fragment,
    null,
    b ? f.createElement(s, { styles: ta(o) }) : null,
    h ? f.createElement(Gi, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function oa(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const sa = Li(nr, ra);
var ar = f.forwardRef(function(e, t) {
  return f.createElement(Qe, X({}, e, { ref: t, sideCar: sa }));
});
ar.classNames = Qe.classNames;
var Je = "Popover", [cr] = Cn(Je, [
  jn
]), Le = jn(), [ia, de] = cr(Je), lr = (e) => {
  const {
    __scopePopover: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: s,
    modal: a = !1
  } = e, i = Le(t), u = f.useRef(null), [c, l] = f.useState(!1), [d, m] = vi({
    prop: r,
    defaultProp: o ?? !1,
    onChange: s,
    caller: Je
  });
  return /* @__PURE__ */ E(li, { ...i, children: /* @__PURE__ */ E(
    ia,
    {
      scope: t,
      contentId: Vo(),
      triggerRef: u,
      open: d,
      onOpenChange: m,
      onOpenToggle: f.useCallback(() => m((h) => !h), [m]),
      hasCustomAnchor: c,
      onCustomAnchorAdd: f.useCallback(() => l(!0), []),
      onCustomAnchorRemove: f.useCallback(() => l(!1), []),
      modal: a,
      children: n
    }
  ) });
};
lr.displayName = Je;
var ur = "PopoverAnchor", aa = f.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = de(ur, n), s = Le(n), { onCustomAnchorAdd: a, onCustomAnchorRemove: i } = o;
    return f.useEffect(() => (a(), () => i()), [a, i]), /* @__PURE__ */ E(qn, { ...s, ...r, ref: t });
  }
);
aa.displayName = ur;
var dr = "PopoverTrigger", fr = f.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = de(dr, n), s = Le(n), a = ue(t, o.triggerRef), i = /* @__PURE__ */ E(
      te.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": o.open,
        "aria-controls": o.contentId,
        "data-state": vr(o.open),
        ...r,
        ref: a,
        onClick: ie(e.onClick, o.onOpenToggle)
      }
    );
    return o.hasCustomAnchor ? i : /* @__PURE__ */ E(qn, { asChild: !0, ...s, children: i });
  }
);
fr.displayName = dr;
var Ot = "PopoverPortal", [ca, la] = cr(Ot, {
  forceMount: void 0
}), pr = (e) => {
  const { __scopePopover: t, forceMount: n, children: r, container: o } = e, s = de(Ot, t);
  return /* @__PURE__ */ E(ca, { scope: t, forceMount: n, children: /* @__PURE__ */ E(Rt, { present: n || s.open, children: /* @__PURE__ */ E(Qn, { asChild: !0, container: o, children: r }) }) });
};
pr.displayName = Ot;
var xe = "PopoverContent", mr = f.forwardRef(
  (e, t) => {
    const n = la(xe, e.__scopePopover), { forceMount: r = n.forceMount, ...o } = e, s = de(xe, e.__scopePopover);
    return /* @__PURE__ */ E(Rt, { present: r || s.open, children: s.modal ? /* @__PURE__ */ E(da, { ...o, ref: t }) : /* @__PURE__ */ E(fa, { ...o, ref: t }) });
  }
);
mr.displayName = xe;
var ua = /* @__PURE__ */ En("PopoverContent.RemoveScroll"), da = f.forwardRef(
  (e, t) => {
    const n = de(xe, e.__scopePopover), r = f.useRef(null), o = ue(t, r), s = f.useRef(!1);
    return f.useEffect(() => {
      const a = r.current;
      if (a) return Ei(a);
    }, []), /* @__PURE__ */ E(ar, { as: ua, allowPinchZoom: !0, children: /* @__PURE__ */ E(
      hr,
      {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: ie(e.onCloseAutoFocus, (a) => {
          var i;
          a.preventDefault(), s.current || (i = n.triggerRef.current) == null || i.focus();
        }),
        onPointerDownOutside: ie(
          e.onPointerDownOutside,
          (a) => {
            const i = a.detail.originalEvent, u = i.button === 0 && i.ctrlKey === !0, c = i.button === 2 || u;
            s.current = c;
          },
          { checkForDefaultPrevented: !1 }
        ),
        onFocusOutside: ie(
          e.onFocusOutside,
          (a) => a.preventDefault(),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
), fa = f.forwardRef(
  (e, t) => {
    const n = de(xe, e.__scopePopover), r = f.useRef(!1), o = f.useRef(!1);
    return /* @__PURE__ */ E(
      hr,
      {
        ...e,
        ref: t,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (s) => {
          var a, i;
          (a = e.onCloseAutoFocus) == null || a.call(e, s), s.defaultPrevented || (r.current || (i = n.triggerRef.current) == null || i.focus(), s.preventDefault()), r.current = !1, o.current = !1;
        },
        onInteractOutside: (s) => {
          var u, c;
          (u = e.onInteractOutside) == null || u.call(e, s), s.defaultPrevented || (r.current = !0, s.detail.originalEvent.type === "pointerdown" && (o.current = !0));
          const a = s.target;
          ((c = n.triggerRef.current) == null ? void 0 : c.contains(a)) && s.preventDefault(), s.detail.originalEvent.type === "focusin" && o.current && s.preventDefault();
        }
      }
    );
  }
), hr = f.forwardRef(
  (e, t) => {
    const {
      __scopePopover: n,
      trapFocus: r,
      onOpenAutoFocus: o,
      onCloseAutoFocus: s,
      disableOutsidePointerEvents: a,
      onEscapeKeyDown: i,
      onPointerDownOutside: u,
      onFocusOutside: c,
      onInteractOutside: l,
      ...d
    } = e, m = de(xe, n), h = Le(n);
    return Lo(), /* @__PURE__ */ E(
      Rn,
      {
        asChild: !0,
        loop: !0,
        trapped: r,
        onMountAutoFocus: o,
        onUnmountAutoFocus: s,
        children: /* @__PURE__ */ E(
          An,
          {
            asChild: !0,
            disableOutsidePointerEvents: a,
            onInteractOutside: l,
            onEscapeKeyDown: i,
            onPointerDownOutside: u,
            onFocusOutside: c,
            onDismiss: () => m.onOpenChange(!1),
            children: /* @__PURE__ */ E(
              ui,
              {
                "data-state": vr(m.open),
                role: "dialog",
                id: m.contentId,
                ...h,
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
), gr = "PopoverClose", pa = f.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = de(gr, n);
    return /* @__PURE__ */ E(
      te.button,
      {
        type: "button",
        ...r,
        ref: t,
        onClick: ie(e.onClick, () => o.onOpenChange(!1))
      }
    );
  }
);
pa.displayName = gr;
var ma = "PopoverArrow", ha = f.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = Le(n);
    return /* @__PURE__ */ E(di, { ...o, ...r, ref: t });
  }
);
ha.displayName = ma;
function vr(e) {
  return e ? "open" : "closed";
}
var ga = lr, va = fr, ba = pr, br = mr;
const Ra = ga, Oa = va, ya = Ce(({ className: e, align: t = "end", sideOffset: n = 8, ...r }, o) => /* @__PURE__ */ E(ba, { children: /* @__PURE__ */ E(
  br,
  {
    ref: o,
    align: t,
    sideOffset: n,
    className: z(
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
ya.displayName = br.displayName;
const wa = vt(
  z(
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
), xa = Ce(
  ({ className: e, variant: t, icon: n, children: r, ...o }, s) => /* @__PURE__ */ se(
    "button",
    {
      ref: s,
      className: z(wa({ variant: t }), e),
      ...o,
      children: [
        n && /* @__PURE__ */ E("span", { className: "shrink-0", children: n }),
        r
      ]
    }
  )
);
xa.displayName = "PopoverMenuItem";
export {
  lo as Button,
  Pa as ChevronRightIcon,
  go as Combobox,
  bt as Dropdown,
  Aa as LoadingCircle,
  Ra as Popover,
  ya as PopoverContent,
  xa as PopoverMenuItem,
  Oa as PopoverTrigger,
  ho as Select,
  co as buttonVariants,
  z as cn,
  fo as dropdownTriggerVariants,
  wa as popoverMenuItemVariants
};
//# sourceMappingURL=index.es.js.map
