import { jsx as x, jsxs as V } from "react/jsx-runtime";
import * as f from "react";
import ne, { forwardRef as Ee, useState as Me, useRef as Bt, useEffect as $t, useLayoutEffect as zr } from "react";
import * as vn from "react-dom";
import Br from "react-dom";
function bn(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (n = bn(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function yn() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++) (e = arguments[n]) && (t = bn(e)) && (r && (r += " "), r += t);
  return r;
}
const wt = "-", $r = (e) => {
  const t = jr(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (a) => {
      const i = a.split(wt);
      return i[0] === "" && i.length !== 1 && i.shift(), wn(i, t) || Vr(a);
    },
    getConflictingClassGroupIds: (a, i) => {
      const l = n[a] || [];
      return i && r[a] ? [...l, ...r[a]] : l;
    }
  };
}, wn = (e, t) => {
  var a;
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], r = t.nextPart.get(n), o = r ? wn(e.slice(1), r) : void 0;
  if (o)
    return o;
  if (t.validators.length === 0)
    return;
  const s = e.join(wt);
  return (a = t.validators.find(({
    validator: i
  }) => i(s))) == null ? void 0 : a.classGroupId;
}, Vt = /^\[(.+)\]$/, Vr = (e) => {
  if (Vt.test(e)) {
    const t = Vt.exec(e)[1], n = t == null ? void 0 : t.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, jr = (e) => {
  const {
    theme: t,
    prefix: n
  } = e, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return Ur(Object.entries(e.classGroups), n).forEach(([s, a]) => {
    pt(a, r, s, t);
  }), r;
}, pt = (e, t, n, r) => {
  e.forEach((o) => {
    if (typeof o == "string") {
      const s = o === "" ? t : jt(t, o);
      s.classGroupId = n;
      return;
    }
    if (typeof o == "function") {
      if (Hr(o)) {
        pt(o(r), t, n, r);
        return;
      }
      t.validators.push({
        validator: o,
        classGroupId: n
      });
      return;
    }
    Object.entries(o).forEach(([s, a]) => {
      pt(a, jt(t, s), n, r);
    });
  });
}, jt = (e, t) => {
  let n = e;
  return t.split(wt).forEach((r) => {
    n.nextPart.has(r) || n.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(r);
  }), n;
}, Hr = (e) => e.isThemeGetter, Ur = (e, t) => t ? e.map(([n, r]) => {
  const o = r.map((s) => typeof s == "string" ? t + s : typeof s == "object" ? Object.fromEntries(Object.entries(s).map(([a, i]) => [t + a, i])) : s);
  return [n, o];
}) : e, Gr = (e) => {
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
}, xn = "!", Yr = (e) => {
  const {
    separator: t,
    experimentalParseClassName: n
  } = e, r = t.length === 1, o = t[0], s = t.length, a = (i) => {
    const l = [];
    let c = 0, u = 0, d;
    for (let g = 0; g < i.length; g++) {
      let v = i[g];
      if (c === 0) {
        if (v === o && (r || i.slice(g, g + s) === t)) {
          l.push(i.slice(u, g)), u = g + s;
          continue;
        }
        if (v === "/") {
          d = g;
          continue;
        }
      }
      v === "[" ? c++ : v === "]" && c--;
    }
    const p = l.length === 0 ? i : i.substring(u), h = p.startsWith(xn), b = h ? p.substring(1) : p, m = d && d > u ? d - u : void 0;
    return {
      modifiers: l,
      hasImportantModifier: h,
      baseClassName: b,
      maybePostfixModifierPosition: m
    };
  };
  return n ? (i) => n({
    className: i,
    parseClassName: a
  }) : a;
}, Xr = (e) => {
  if (e.length <= 1)
    return e;
  const t = [];
  let n = [];
  return e.forEach((r) => {
    r[0] === "[" ? (t.push(...n.sort(), r), n = []) : n.push(r);
  }), t.push(...n.sort()), t;
}, Kr = (e) => ({
  cache: Gr(e.cacheSize),
  parseClassName: Yr(e),
  ...$r(e)
}), qr = /\s+/, Zr = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: r,
    getConflictingClassGroupIds: o
  } = t, s = [], a = e.trim().split(qr);
  let i = "";
  for (let l = a.length - 1; l >= 0; l -= 1) {
    const c = a[l], {
      modifiers: u,
      hasImportantModifier: d,
      baseClassName: p,
      maybePostfixModifierPosition: h
    } = n(c);
    let b = !!h, m = r(b ? p.substring(0, h) : p);
    if (!m) {
      if (!b) {
        i = c + (i.length > 0 ? " " + i : i);
        continue;
      }
      if (m = r(p), !m) {
        i = c + (i.length > 0 ? " " + i : i);
        continue;
      }
      b = !1;
    }
    const g = Xr(u).join(":"), v = d ? g + xn : g, y = v + m;
    if (s.includes(y))
      continue;
    s.push(y);
    const w = o(m, b);
    for (let C = 0; C < w.length; ++C) {
      const S = w[C];
      s.push(v + S);
    }
    i = c + (i.length > 0 ? " " + i : i);
  }
  return i;
};
function Qr() {
  let e = 0, t, n, r = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = Cn(t)) && (r && (r += " "), r += n);
  return r;
}
const Cn = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (t = Cn(e[r])) && (n && (n += " "), n += t);
  return n;
};
function Jr(e, ...t) {
  let n, r, o, s = a;
  function a(l) {
    const c = t.reduce((u, d) => d(u), e());
    return n = Kr(c), r = n.cache.get, o = n.cache.set, s = i, i(l);
  }
  function i(l) {
    const c = r(l);
    if (c)
      return c;
    const u = Zr(l, n);
    return o(l, u), u;
  }
  return function() {
    return s(Qr.apply(null, arguments));
  };
}
const _ = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, Sn = /^\[(?:([a-z-]+):)?(.+)\]$/i, eo = /^\d+\/\d+$/, to = /* @__PURE__ */ new Set(["px", "full", "screen"]), no = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, ro = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, oo = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, so = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, io = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, te = (e) => be(e) || to.has(e) || eo.test(e), ae = (e) => Pe(e, "length", ho), be = (e) => !!e && !Number.isNaN(Number(e)), ot = (e) => Pe(e, "number", be), Ne = (e) => !!e && Number.isInteger(Number(e)), ao = (e) => e.endsWith("%") && be(e.slice(0, -1)), k = (e) => Sn.test(e), ce = (e) => no.test(e), co = /* @__PURE__ */ new Set(["length", "size", "percentage"]), lo = (e) => Pe(e, co, En), uo = (e) => Pe(e, "position", En), fo = /* @__PURE__ */ new Set(["image", "url"]), mo = (e) => Pe(e, fo, vo), po = (e) => Pe(e, "", go), Oe = () => !0, Pe = (e, t, n) => {
  const r = Sn.exec(e);
  return r ? r[1] ? typeof t == "string" ? r[1] === t : t.has(r[1]) : n(r[2]) : !1;
}, ho = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  ro.test(e) && !oo.test(e)
), En = () => !1, go = (e) => so.test(e), vo = (e) => io.test(e), bo = () => {
  const e = _("colors"), t = _("spacing"), n = _("blur"), r = _("brightness"), o = _("borderColor"), s = _("borderRadius"), a = _("borderSpacing"), i = _("borderWidth"), l = _("contrast"), c = _("grayscale"), u = _("hueRotate"), d = _("invert"), p = _("gap"), h = _("gradientColorStops"), b = _("gradientColorStopPositions"), m = _("inset"), g = _("margin"), v = _("opacity"), y = _("padding"), w = _("saturate"), C = _("scale"), S = _("sepia"), A = _("skew"), E = _("space"), O = _("translate"), L = () => ["auto", "contain", "none"], T = () => ["auto", "hidden", "clip", "visible", "scroll"], B = () => ["auto", k, t], R = () => [k, t], I = () => ["", te, ae], P = () => ["auto", be, k], F = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], D = () => ["solid", "dashed", "dotted", "double", "none"], W = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], N = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], z = () => ["", "0", k], j = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], $ = () => [be, k];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [Oe],
      spacing: [te, ae],
      blur: ["none", "", ce, k],
      brightness: $(),
      borderColor: [e],
      borderRadius: ["none", "", "full", ce, k],
      borderSpacing: R(),
      borderWidth: I(),
      contrast: $(),
      grayscale: z(),
      hueRotate: $(),
      invert: z(),
      gap: R(),
      gradientColorStops: [e],
      gradientColorStopPositions: [ao, ae],
      inset: B(),
      margin: B(),
      opacity: $(),
      padding: R(),
      saturate: $(),
      scale: $(),
      sepia: z(),
      skew: $(),
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
        columns: [ce]
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
        object: [...F(), k]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: T()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": T()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": T()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: L()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": L()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": L()
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
        inset: [m]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [m]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [m]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [m]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [m]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [m]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [m]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [m]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [m]
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
        z: ["auto", Ne, k]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: B()
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
        order: ["first", "last", "none", Ne, k]
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
          span: ["full", Ne, k]
        }, k]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": P()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": P()
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
          span: [Ne, k]
        }, k]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": P()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": P()
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
        gap: [p]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": [p]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": [p]
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
        "space-x": [E]
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
        "space-y": [E]
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
          screen: [ce]
        }, ce]
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
        text: ["base", ce, ae]
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
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", ot]
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
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", k]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", be, ot]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", te, k]
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
        decoration: [...D(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", te, ae]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", te, k]
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
        bg: [...F(), uo]
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
        bg: ["auto", "cover", "contain", lo]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, mo]
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
        "divide-opacity": [v]
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
        "outline-offset": [te, k]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [te, ae]
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
        ring: I()
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
        "ring-offset": [te, ae]
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
        shadow: ["", "inner", "none", ce, po]
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
        "mix-blend": [...W(), "plus-lighter", "plus-darker"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": W()
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
        "drop-shadow": ["", "none", ce, k]
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
        "backdrop-grayscale": [c]
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
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", k]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: $()
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
        delay: $()
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
        rotate: [Ne, k]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [O]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [O]
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
        stroke: [te, ae, ot]
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
}, yo = /* @__PURE__ */ Jr(bo);
function M(...e) {
  return yo(yn(e));
}
const Ht = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, Ut = yn, ie = (e, t) => (n) => {
  var r;
  if ((t == null ? void 0 : t.variants) == null) return Ut(e, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
  const { variants: o, defaultVariants: s } = t, a = Object.keys(o).map((c) => {
    const u = n == null ? void 0 : n[c], d = s == null ? void 0 : s[c];
    if (u === null) return null;
    const p = Ht(u) || Ht(d);
    return o[c][p];
  }), i = n && Object.entries(n).reduce((c, u) => {
    let [d, p] = u;
    return p === void 0 || (c[d] = p), c;
  }, {}), l = t == null || (r = t.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((c, u) => {
    let { class: d, className: p, ...h } = u;
    return Object.entries(h).every((b) => {
      let [m, g] = b;
      return Array.isArray(g) ? g.includes({
        ...s,
        ...i
      }[m]) : {
        ...s,
        ...i
      }[m] === g;
    }) ? [
      ...c,
      d,
      p
    ] : c;
  }, []);
  return Ut(e, a, l, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
}, wo = ie(
  M(
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
        secondary: M(
          "bg-cms-gray-300 text-cms-black",
          "hover:bg-cms-gray-200 hover:text-cms-gray-800"
        ),
        outline: M(
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
), xo = Ee(
  ({ className: e, variant: t, size: n, ...r }, o) => /* @__PURE__ */ x(
    "button",
    {
      className: M(wo({ variant: t, size: n, className: e })),
      ref: o,
      ...r
    }
  )
);
xo.displayName = "Button";
const Co = {
  sm: "h-4 w-4",
  md: "h-8 w-8",
  lg: "h-16 w-16"
};
function qa({ size: e = "lg", className: t }) {
  return /* @__PURE__ */ x("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ x(
    "div",
    {
      className: M(
        Co[e],
        "animate-spin rounded-full border-2 border-cms-gray-500 border-b-transparent",
        t
      )
    }
  ) });
}
const So = ie(
  M(
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
        default: M(
          "bg-default text-black border border-cms-outline",
          "hover:bg-cms-gray-200"
        ),
        outline: M(
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
), Eo = ({
  className: e,
  isOpen: t
}) => /* @__PURE__ */ x(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "10",
    height: "6",
    viewBox: "0 0 10 6",
    fill: "none",
    className: M(
      "transition-transform duration-200",
      t && "rotate-180",
      e
    ),
    children: /* @__PURE__ */ x(
      "path",
      {
        d: "M8.75 0.75L4.57609 4.75L0.75 0.75",
        stroke: "currentColor",
        strokeWidth: "1.5",
        strokeLinecap: "round"
      }
    )
  }
), Po = ({ className: e }) => /* @__PURE__ */ x(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none",
    className: e,
    children: /* @__PURE__ */ x(
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
), xt = Ee(
  ({
    options: e,
    value: t,
    placeholder: n = "선택하세요",
    onValueChange: r,
    disabled: o = !1,
    className: s,
    dropdownClassName: a,
    variant: i,
    size: l,
    searchable: c = !1,
    clearable: u = !1,
    multiple: d = !1,
    maxHeight: p = 200,
    ...h
  }, b) => {
    const [m, g] = Me(!1), [v, y] = Me(""), [w, C] = Me(
      d ? t ? [t] : [] : []
    ), S = Bt(null), A = Bt(null), E = e.find((P) => P.value === t), O = d ? w.length > 0 ? `${w.length}개 선택됨` : n : (E == null ? void 0 : E.label) || n, L = e.filter(
      (P) => P.label.toLowerCase().includes(v.toLowerCase())
    ), T = () => {
      o || (g(!m), y(""));
    }, B = (P) => {
      if (!P.disabled)
        if (d) {
          const F = w.includes(P.value) ? w.filter((D) => D !== P.value) : [...w, P.value];
          C(F), r == null || r(F.join(","));
        } else
          r == null || r(P.value), g(!1);
    }, R = (P) => {
      P.stopPropagation(), d && C([]), r == null || r("");
    }, I = (P) => {
      P.key === "Escape" ? g(!1) : (P.key === "Enter" || P.key === " ") && (P.preventDefault(), T());
    };
    return $t(() => {
      const P = (F) => {
        S.current && !S.current.contains(F.target) && g(!1);
      };
      return document.addEventListener("mousedown", P), () => document.removeEventListener("mousedown", P);
    }, []), $t(() => {
      m && c && A.current && A.current.focus();
    }, [m, c]), /* @__PURE__ */ V("div", { ref: S, className: "relative w-full", children: [
      /* @__PURE__ */ V(
        "button",
        {
          ref: b,
          type: "button",
          className: M(
            So({ variant: i, size: l }),
            o && "opacity-50 cursor-not-allowed",
            s
          ),
          onClick: T,
          onKeyDown: I,
          disabled: o,
          "aria-expanded": m,
          "aria-haspopup": "listbox",
          ...h,
          children: [
            /* @__PURE__ */ x(
              "span",
              {
                className: M(
                  "truncate flex-1 text-left",
                  !E && !d && "text-cms-gray-400"
                ),
                children: O
              }
            ),
            /* @__PURE__ */ V("div", { className: "flex items-center gap-2 ml-3", children: [
              u && (t || w.length > 0) && /* @__PURE__ */ x(
                "button",
                {
                  type: "button",
                  className: M(
                    "p-1 rounded text-cms-gray-400 transition-colors",
                    "hover:text-cms-black"
                  ),
                  onClick: R,
                  "aria-label": "선택 취소",
                  children: /* @__PURE__ */ x(Po, { className: "w-3 h-3" })
                }
              ),
              /* @__PURE__ */ x(
                Eo,
                {
                  isOpen: m,
                  className: "w-4 h-4 text-cms-gray-400"
                }
              )
            ] })
          ]
        }
      ),
      m && /* @__PURE__ */ V(
        "div",
        {
          className: M(
            "absolute z-50 mt-1 py-1 w-full",
            "rounded-lg border border-cms-gray-400",
            "bg-white shadow-lg",
            a
          ),
          style: { maxHeight: `${p}px` },
          children: [
            c && /* @__PURE__ */ x("div", { className: "px-3 py-2 border-b border-cms-gray-400", children: /* @__PURE__ */ x(
              "input",
              {
                ref: A,
                type: "text",
                value: v,
                onChange: (P) => y(P.target.value),
                placeholder: "검색...",
                className: M(
                  "w-full px-2 py-1 text-sm",
                  "rounded outline-none",
                  "border border-cms-gray-400",
                  "focus:ring-1 focus:ring-cms-black"
                )
              }
            ) }),
            /* @__PURE__ */ x("div", { className: "max-h-48 overflow-y-auto", children: L.length === 0 ? /* @__PURE__ */ x("div", { className: "px-3 py-2 text-sm text-cms-gray-400 text-center", children: v ? "검색 결과가 없습니다" : "옵션이 없습니다" }) : L.map((P) => {
              const F = d ? w.includes(P.value) : t === P.value;
              return /* @__PURE__ */ V(
                "button",
                {
                  type: "button",
                  className: M(
                    "flex items-center justify-between gap-2",
                    "w-full px-3 py-2 ",
                    "text-left text-sm",
                    "transition-colors",
                    P.disabled ? "text-cms-gray-400 cursor-not-allowed" : "text-cms-black hover:bg-cms-gray-200 cursor-pointer",
                    F && "bg-cms-gray-400 font-medium"
                  ),
                  onClick: () => B(P),
                  disabled: P.disabled,
                  children: [
                    /* @__PURE__ */ x("span", { className: "truncate", children: P.label }),
                    F && /* @__PURE__ */ x(
                      "svg",
                      {
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "16",
                        height: "16",
                        viewBox: "0 0 16 16",
                        fill: "none",
                        className: "w-4 h-4 text-black shrink-0",
                        children: /* @__PURE__ */ x(
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
                P.value
              );
            }) })
          ]
        }
      )
    ] });
  }
);
xt.displayName = "Dropdown";
const Ao = Ee(
  ({ label: e, helperText: t, error: n, required: r, className: o, ...s }, a) => /* @__PURE__ */ V("div", { className: M("space-y-1", o), children: [
    e && /* @__PURE__ */ V("label", { className: "block text-sm font-medium text-cms-black", children: [
      e,
      r && /* @__PURE__ */ x("span", { className: "text-cms-red-500 ml-1", children: "*" })
    ] }),
    /* @__PURE__ */ x(
      xt,
      {
        ref: a,
        ...s,
        className: M(n && "border-cms-red-500 focus:ring-cms-red-500")
      }
    ),
    (t || n) && /* @__PURE__ */ x(
      "p",
      {
        className: M(
          "text-xs",
          n ? "text-cms-red-500" : "text-cms-gray-400"
        ),
        children: n || t
      }
    )
  ] })
);
Ao.displayName = "Select";
const Ro = Ee(
  ({ options: e, loading: t = !1, createable: n = !1, onCreateOption: r, ...o }, s) => {
    const [a] = Me(""), i = e.filter(
      (u) => u.label.toLowerCase().includes(a.toLowerCase())
    ), l = i.some(
      (u) => u.label.toLowerCase() === a.toLowerCase()
    ), c = [
      ...i,
      ...n && a && !l ? [
        {
          value: `__create__${a}`,
          label: `"${a}" 생성`,
          disabled: !1
        }
      ] : []
    ];
    return /* @__PURE__ */ x(
      xt,
      {
        ref: s,
        ...o,
        options: c,
        searchable: !0,
        dropdownClassName: M(t && "opacity-75", o.dropdownClassName),
        onValueChange: (u) => {
          var d;
          if (u.startsWith("__create__")) {
            const p = u.replace("__create__", "");
            r == null || r(p);
          } else
            (d = o.onValueChange) == null || d.call(o, u);
        }
      }
    );
  }
);
Ro.displayName = "Combobox";
function Za(e) {
  return /* @__PURE__ */ x(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "20",
      height: "20",
      viewBox: "0 0 20 20",
      fill: "none",
      ...e,
      children: /* @__PURE__ */ x(
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
function re(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(o) {
    if (e == null || e(o), n === !1 || !o.defaultPrevented)
      return t == null ? void 0 : t(o);
  };
}
function Gt(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function Pn(...e) {
  return (t) => {
    let n = !1;
    const r = e.map((o) => {
      const s = Gt(o, t);
      return !n && typeof s == "function" && (n = !0), s;
    });
    if (n)
      return () => {
        for (let o = 0; o < r.length; o++) {
          const s = r[o];
          typeof s == "function" ? s() : Gt(e[o], null);
        }
      };
  };
}
function J(...e) {
  return f.useCallback(Pn(...e), e);
}
function Ct(e, t = []) {
  let n = [];
  function r(s, a) {
    const i = f.createContext(a), l = n.length;
    n = [...n, a];
    const c = (d) => {
      var v;
      const { scope: p, children: h, ...b } = d, m = ((v = p == null ? void 0 : p[e]) == null ? void 0 : v[l]) || i, g = f.useMemo(() => b, Object.values(b));
      return /* @__PURE__ */ x(m.Provider, { value: g, children: h });
    };
    c.displayName = s + "Provider";
    function u(d, p) {
      var m;
      const h = ((m = p == null ? void 0 : p[e]) == null ? void 0 : m[l]) || i, b = f.useContext(h);
      if (b) return b;
      if (a !== void 0) return a;
      throw new Error(`\`${d}\` must be used within \`${s}\``);
    }
    return [c, u];
  }
  const o = () => {
    const s = n.map((a) => f.createContext(a));
    return function(i) {
      const l = (i == null ? void 0 : i[e]) || s;
      return f.useMemo(
        () => ({ [`__scope${e}`]: { ...i, [e]: l } }),
        [i, l]
      );
    };
  };
  return o.scopeName = e, [r, ko(o, ...t)];
}
function ko(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((o) => ({
      useScope: o(),
      scopeName: o.scopeName
    }));
    return function(s) {
      const a = r.reduce((i, { useScope: l, scopeName: c }) => {
        const d = l(s)[`__scope${c}`];
        return { ...i, ...d };
      }, {});
      return f.useMemo(() => ({ [`__scope${t.scopeName}`]: a }), [a]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
// @__NO_SIDE_EFFECTS__
function An(e) {
  const t = /* @__PURE__ */ No(e), n = f.forwardRef((r, o) => {
    const { children: s, ...a } = r, i = f.Children.toArray(s), l = i.find(Mo);
    if (l) {
      const c = l.props.children, u = i.map((d) => d === l ? f.Children.count(c) > 1 ? f.Children.only(null) : f.isValidElement(c) ? c.props.children : null : d);
      return /* @__PURE__ */ x(t, { ...a, ref: o, children: f.isValidElement(c) ? f.cloneElement(c, void 0, u) : null });
    }
    return /* @__PURE__ */ x(t, { ...a, ref: o, children: s });
  });
  return n.displayName = `${e}.Slot`, n;
}
// @__NO_SIDE_EFFECTS__
function No(e) {
  const t = f.forwardRef((n, r) => {
    const { children: o, ...s } = n;
    if (f.isValidElement(o)) {
      const a = Lo(o), i = To(s, o.props);
      return o.type !== f.Fragment && (i.ref = r ? Pn(r, a) : a), f.cloneElement(o, i);
    }
    return f.Children.count(o) > 1 ? f.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var Oo = Symbol("radix.slottable");
function Mo(e) {
  return f.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Oo;
}
function To(e, t) {
  const n = { ...t };
  for (const r in t) {
    const o = e[r], s = t[r];
    /^on[A-Z]/.test(r) ? o && s ? n[r] = (...i) => {
      const l = s(...i);
      return o(...i), l;
    } : o && (n[r] = o) : r === "style" ? n[r] = { ...o, ...s } : r === "className" && (n[r] = [o, s].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function Lo(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var Do = [
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
], X = Do.reduce((e, t) => {
  const n = /* @__PURE__ */ An(`Primitive.${t}`), r = f.forwardRef((o, s) => {
    const { asChild: a, ...i } = o, l = a ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ x(l, { ...i, ref: s });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {});
function _o(e, t) {
  e && vn.flushSync(() => e.dispatchEvent(t));
}
function xe(e) {
  const t = f.useRef(e);
  return f.useEffect(() => {
    t.current = e;
  }), f.useMemo(() => (...n) => {
    var r;
    return (r = t.current) == null ? void 0 : r.call(t, ...n);
  }, []);
}
function Io(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = xe(e);
  f.useEffect(() => {
    const r = (o) => {
      o.key === "Escape" && n(o);
    };
    return t.addEventListener("keydown", r, { capture: !0 }), () => t.removeEventListener("keydown", r, { capture: !0 });
  }, [n, t]);
}
var Fo = "DismissableLayer", ht = "dismissableLayer.update", Wo = "dismissableLayer.pointerDownOutside", zo = "dismissableLayer.focusOutside", Yt, Rn = f.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), kn = f.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: r,
      onPointerDownOutside: o,
      onFocusOutside: s,
      onInteractOutside: a,
      onDismiss: i,
      ...l
    } = e, c = f.useContext(Rn), [u, d] = f.useState(null), p = (u == null ? void 0 : u.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), [, h] = f.useState({}), b = J(t, (E) => d(E)), m = Array.from(c.layers), [g] = [...c.layersWithOutsidePointerEventsDisabled].slice(-1), v = m.indexOf(g), y = u ? m.indexOf(u) : -1, w = c.layersWithOutsidePointerEventsDisabled.size > 0, C = y >= v, S = Vo((E) => {
      const O = E.target, L = [...c.branches].some((T) => T.contains(O));
      !C || L || (o == null || o(E), a == null || a(E), E.defaultPrevented || i == null || i());
    }, p), A = jo((E) => {
      const O = E.target;
      [...c.branches].some((T) => T.contains(O)) || (s == null || s(E), a == null || a(E), E.defaultPrevented || i == null || i());
    }, p);
    return Io((E) => {
      y === c.layers.size - 1 && (r == null || r(E), !E.defaultPrevented && i && (E.preventDefault(), i()));
    }, p), f.useEffect(() => {
      if (u)
        return n && (c.layersWithOutsidePointerEventsDisabled.size === 0 && (Yt = p.body.style.pointerEvents, p.body.style.pointerEvents = "none"), c.layersWithOutsidePointerEventsDisabled.add(u)), c.layers.add(u), Xt(), () => {
          n && c.layersWithOutsidePointerEventsDisabled.size === 1 && (p.body.style.pointerEvents = Yt);
        };
    }, [u, p, n, c]), f.useEffect(() => () => {
      u && (c.layers.delete(u), c.layersWithOutsidePointerEventsDisabled.delete(u), Xt());
    }, [u, c]), f.useEffect(() => {
      const E = () => h({});
      return document.addEventListener(ht, E), () => document.removeEventListener(ht, E);
    }, []), /* @__PURE__ */ x(
      X.div,
      {
        ...l,
        ref: b,
        style: {
          pointerEvents: w ? C ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: re(e.onFocusCapture, A.onFocusCapture),
        onBlurCapture: re(e.onBlurCapture, A.onBlurCapture),
        onPointerDownCapture: re(
          e.onPointerDownCapture,
          S.onPointerDownCapture
        )
      }
    );
  }
);
kn.displayName = Fo;
var Bo = "DismissableLayerBranch", $o = f.forwardRef((e, t) => {
  const n = f.useContext(Rn), r = f.useRef(null), o = J(t, r);
  return f.useEffect(() => {
    const s = r.current;
    if (s)
      return n.branches.add(s), () => {
        n.branches.delete(s);
      };
  }, [n.branches]), /* @__PURE__ */ x(X.div, { ...e, ref: o });
});
$o.displayName = Bo;
function Vo(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = xe(e), r = f.useRef(!1), o = f.useRef(() => {
  });
  return f.useEffect(() => {
    const s = (i) => {
      if (i.target && !r.current) {
        let l = function() {
          Nn(
            Wo,
            n,
            c,
            { discrete: !0 }
          );
        };
        const c = { originalEvent: i };
        i.pointerType === "touch" ? (t.removeEventListener("click", o.current), o.current = l, t.addEventListener("click", o.current, { once: !0 })) : l();
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
function jo(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = xe(e), r = f.useRef(!1);
  return f.useEffect(() => {
    const o = (s) => {
      s.target && !r.current && Nn(zo, n, { originalEvent: s }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o);
  }, [t, n]), {
    onFocusCapture: () => r.current = !0,
    onBlurCapture: () => r.current = !1
  };
}
function Xt() {
  const e = new CustomEvent(ht);
  document.dispatchEvent(e);
}
function Nn(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target, s = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && o.addEventListener(e, t, { once: !0 }), r ? _o(o, s) : o.dispatchEvent(s);
}
var st = 0;
function Ho() {
  f.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? Kt()), document.body.insertAdjacentElement("beforeend", e[1] ?? Kt()), st++, () => {
      st === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), st--;
    };
  }, []);
}
function Kt() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var it = "focusScope.autoFocusOnMount", at = "focusScope.autoFocusOnUnmount", qt = { bubbles: !1, cancelable: !0 }, Uo = "FocusScope", On = f.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: r = !1,
    onMountAutoFocus: o,
    onUnmountAutoFocus: s,
    ...a
  } = e, [i, l] = f.useState(null), c = xe(o), u = xe(s), d = f.useRef(null), p = J(t, (m) => l(m)), h = f.useRef({
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
      let m = function(w) {
        if (h.paused || !i) return;
        const C = w.target;
        i.contains(C) ? d.current = C : le(d.current, { select: !0 });
      }, g = function(w) {
        if (h.paused || !i) return;
        const C = w.relatedTarget;
        C !== null && (i.contains(C) || le(d.current, { select: !0 }));
      }, v = function(w) {
        if (document.activeElement === document.body)
          for (const S of w)
            S.removedNodes.length > 0 && le(i);
      };
      document.addEventListener("focusin", m), document.addEventListener("focusout", g);
      const y = new MutationObserver(v);
      return i && y.observe(i, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", m), document.removeEventListener("focusout", g), y.disconnect();
      };
    }
  }, [r, i, h.paused]), f.useEffect(() => {
    if (i) {
      Qt.add(h);
      const m = document.activeElement;
      if (!i.contains(m)) {
        const v = new CustomEvent(it, qt);
        i.addEventListener(it, c), i.dispatchEvent(v), v.defaultPrevented || (Go(Zo(Mn(i)), { select: !0 }), document.activeElement === m && le(i));
      }
      return () => {
        i.removeEventListener(it, c), setTimeout(() => {
          const v = new CustomEvent(at, qt);
          i.addEventListener(at, u), i.dispatchEvent(v), v.defaultPrevented || le(m ?? document.body, { select: !0 }), i.removeEventListener(at, u), Qt.remove(h);
        }, 0);
      };
    }
  }, [i, c, u, h]);
  const b = f.useCallback(
    (m) => {
      if (!n && !r || h.paused) return;
      const g = m.key === "Tab" && !m.altKey && !m.ctrlKey && !m.metaKey, v = document.activeElement;
      if (g && v) {
        const y = m.currentTarget, [w, C] = Yo(y);
        w && C ? !m.shiftKey && v === C ? (m.preventDefault(), n && le(w, { select: !0 })) : m.shiftKey && v === w && (m.preventDefault(), n && le(C, { select: !0 })) : v === y && m.preventDefault();
      }
    },
    [n, r, h.paused]
  );
  return /* @__PURE__ */ x(X.div, { tabIndex: -1, ...a, ref: p, onKeyDown: b });
});
On.displayName = Uo;
function Go(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if (le(r, { select: t }), document.activeElement !== n) return;
}
function Yo(e) {
  const t = Mn(e), n = Zt(t, e), r = Zt(t.reverse(), e);
  return [n, r];
}
function Mn(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function Zt(e, t) {
  for (const n of e)
    if (!Xo(n, { upTo: t })) return n;
}
function Xo(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function Ko(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function le(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && Ko(e) && t && e.select();
  }
}
var Qt = qo();
function qo() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && (n == null || n.pause()), e = Jt(e, t), e.unshift(t);
    },
    remove(t) {
      var n;
      e = Jt(e, t), (n = e[0]) == null || n.resume();
    }
  };
}
function Jt(e, t) {
  const n = [...e], r = n.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
function Zo(e) {
  return e.filter((t) => t.tagName !== "A");
}
var ue = globalThis != null && globalThis.document ? f.useLayoutEffect : () => {
}, Qo = f[" useId ".trim().toString()] || (() => {
}), Jo = 0;
function es(e) {
  const [t, n] = f.useState(Qo());
  return ue(() => {
    n((r) => r ?? String(Jo++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
const ts = ["top", "right", "bottom", "left"], de = Math.min, H = Math.max, Ge = Math.round, Fe = Math.floor, Z = (e) => ({
  x: e,
  y: e
}), ns = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, rs = {
  start: "end",
  end: "start"
};
function gt(e, t, n) {
  return H(e, de(t, n));
}
function oe(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function se(e) {
  return e.split("-")[0];
}
function Ae(e) {
  return e.split("-")[1];
}
function St(e) {
  return e === "x" ? "y" : "x";
}
function Et(e) {
  return e === "y" ? "height" : "width";
}
const os = /* @__PURE__ */ new Set(["top", "bottom"]);
function q(e) {
  return os.has(se(e)) ? "y" : "x";
}
function Pt(e) {
  return St(q(e));
}
function ss(e, t, n) {
  n === void 0 && (n = !1);
  const r = Ae(e), o = Pt(e), s = Et(o);
  let a = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[s] > t.floating[s] && (a = Ye(a)), [a, Ye(a)];
}
function is(e) {
  const t = Ye(e);
  return [vt(e), t, vt(t)];
}
function vt(e) {
  return e.replace(/start|end/g, (t) => rs[t]);
}
const en = ["left", "right"], tn = ["right", "left"], as = ["top", "bottom"], cs = ["bottom", "top"];
function ls(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? tn : en : t ? en : tn;
    case "left":
    case "right":
      return t ? as : cs;
    default:
      return [];
  }
}
function us(e, t, n, r) {
  const o = Ae(e);
  let s = ls(se(e), n === "start", r);
  return o && (s = s.map((a) => a + "-" + o), t && (s = s.concat(s.map(vt)))), s;
}
function Ye(e) {
  return e.replace(/left|right|bottom|top/g, (t) => ns[t]);
}
function ds(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Tn(e) {
  return typeof e != "number" ? ds(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function Xe(e) {
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
function nn(e, t, n) {
  let {
    reference: r,
    floating: o
  } = e;
  const s = q(t), a = Pt(t), i = Et(a), l = se(t), c = s === "y", u = r.x + r.width / 2 - o.width / 2, d = r.y + r.height / 2 - o.height / 2, p = r[i] / 2 - o[i] / 2;
  let h;
  switch (l) {
    case "top":
      h = {
        x: u,
        y: r.y - o.height
      };
      break;
    case "bottom":
      h = {
        x: u,
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
  switch (Ae(t)) {
    case "start":
      h[a] -= p * (n && c ? -1 : 1);
      break;
    case "end":
      h[a] += p * (n && c ? -1 : 1);
      break;
  }
  return h;
}
const fs = async (e, t, n) => {
  const {
    placement: r = "bottom",
    strategy: o = "absolute",
    middleware: s = [],
    platform: a
  } = n, i = s.filter(Boolean), l = await (a.isRTL == null ? void 0 : a.isRTL(t));
  let c = await a.getElementRects({
    reference: e,
    floating: t,
    strategy: o
  }), {
    x: u,
    y: d
  } = nn(c, r, l), p = r, h = {}, b = 0;
  for (let m = 0; m < i.length; m++) {
    const {
      name: g,
      fn: v
    } = i[m], {
      x: y,
      y: w,
      data: C,
      reset: S
    } = await v({
      x: u,
      y: d,
      initialPlacement: r,
      placement: p,
      strategy: o,
      middlewareData: h,
      rects: c,
      platform: a,
      elements: {
        reference: e,
        floating: t
      }
    });
    u = y ?? u, d = w ?? d, h = {
      ...h,
      [g]: {
        ...h[g],
        ...C
      }
    }, S && b <= 50 && (b++, typeof S == "object" && (S.placement && (p = S.placement), S.rects && (c = S.rects === !0 ? await a.getElementRects({
      reference: e,
      floating: t,
      strategy: o
    }) : S.rects), {
      x: u,
      y: d
    } = nn(c, p, l)), m = -1);
  }
  return {
    x: u,
    y: d,
    placement: p,
    strategy: o,
    middlewareData: h
  };
};
async function Te(e, t) {
  var n;
  t === void 0 && (t = {});
  const {
    x: r,
    y: o,
    platform: s,
    rects: a,
    elements: i,
    strategy: l
  } = e, {
    boundary: c = "clippingAncestors",
    rootBoundary: u = "viewport",
    elementContext: d = "floating",
    altBoundary: p = !1,
    padding: h = 0
  } = oe(t, e), b = Tn(h), g = i[p ? d === "floating" ? "reference" : "floating" : d], v = Xe(await s.getClippingRect({
    element: (n = await (s.isElement == null ? void 0 : s.isElement(g))) == null || n ? g : g.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(i.floating)),
    boundary: c,
    rootBoundary: u,
    strategy: l
  })), y = d === "floating" ? {
    x: r,
    y: o,
    width: a.floating.width,
    height: a.floating.height
  } : a.reference, w = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(i.floating)), C = await (s.isElement == null ? void 0 : s.isElement(w)) ? await (s.getScale == null ? void 0 : s.getScale(w)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, S = Xe(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: i,
    rect: y,
    offsetParent: w,
    strategy: l
  }) : y);
  return {
    top: (v.top - S.top + b.top) / C.y,
    bottom: (S.bottom - v.bottom + b.bottom) / C.y,
    left: (v.left - S.left + b.left) / C.x,
    right: (S.right - v.right + b.right) / C.x
  };
}
const ms = (e) => ({
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
      middlewareData: l
    } = t, {
      element: c,
      padding: u = 0
    } = oe(e, t) || {};
    if (c == null)
      return {};
    const d = Tn(u), p = {
      x: n,
      y: r
    }, h = Pt(o), b = Et(h), m = await a.getDimensions(c), g = h === "y", v = g ? "top" : "left", y = g ? "bottom" : "right", w = g ? "clientHeight" : "clientWidth", C = s.reference[b] + s.reference[h] - p[h] - s.floating[b], S = p[h] - s.reference[h], A = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(c));
    let E = A ? A[w] : 0;
    (!E || !await (a.isElement == null ? void 0 : a.isElement(A))) && (E = i.floating[w] || s.floating[b]);
    const O = C / 2 - S / 2, L = E / 2 - m[b] / 2 - 1, T = de(d[v], L), B = de(d[y], L), R = T, I = E - m[b] - B, P = E / 2 - m[b] / 2 + O, F = gt(R, P, I), D = !l.arrow && Ae(o) != null && P !== F && s.reference[b] / 2 - (P < R ? T : B) - m[b] / 2 < 0, W = D ? P < R ? P - R : P - I : 0;
    return {
      [h]: p[h] + W,
      data: {
        [h]: F,
        centerOffset: P - F - W,
        ...D && {
          alignmentOffset: W
        }
      },
      reset: D
    };
  }
}), ps = function(e) {
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
        platform: l,
        elements: c
      } = t, {
        mainAxis: u = !0,
        crossAxis: d = !0,
        fallbackPlacements: p,
        fallbackStrategy: h = "bestFit",
        fallbackAxisSideDirection: b = "none",
        flipAlignment: m = !0,
        ...g
      } = oe(e, t);
      if ((n = s.arrow) != null && n.alignmentOffset)
        return {};
      const v = se(o), y = q(i), w = se(i) === i, C = await (l.isRTL == null ? void 0 : l.isRTL(c.floating)), S = p || (w || !m ? [Ye(i)] : is(i)), A = b !== "none";
      !p && A && S.push(...us(i, m, b, C));
      const E = [i, ...S], O = await Te(t, g), L = [];
      let T = ((r = s.flip) == null ? void 0 : r.overflows) || [];
      if (u && L.push(O[v]), d) {
        const P = ss(o, a, C);
        L.push(O[P[0]], O[P[1]]);
      }
      if (T = [...T, {
        placement: o,
        overflows: L
      }], !L.every((P) => P <= 0)) {
        var B, R;
        const P = (((B = s.flip) == null ? void 0 : B.index) || 0) + 1, F = E[P];
        if (F && (!(d === "alignment" ? y !== q(F) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        T.every((N) => q(N.placement) === y ? N.overflows[0] > 0 : !0)))
          return {
            data: {
              index: P,
              overflows: T
            },
            reset: {
              placement: F
            }
          };
        let D = (R = T.filter((W) => W.overflows[0] <= 0).sort((W, N) => W.overflows[1] - N.overflows[1])[0]) == null ? void 0 : R.placement;
        if (!D)
          switch (h) {
            case "bestFit": {
              var I;
              const W = (I = T.filter((N) => {
                if (A) {
                  const z = q(N.placement);
                  return z === y || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  z === "y";
                }
                return !0;
              }).map((N) => [N.placement, N.overflows.filter((z) => z > 0).reduce((z, j) => z + j, 0)]).sort((N, z) => N[1] - z[1])[0]) == null ? void 0 : I[0];
              W && (D = W);
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
function rn(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function on(e) {
  return ts.some((t) => e[t] >= 0);
}
const hs = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n
      } = t, {
        strategy: r = "referenceHidden",
        ...o
      } = oe(e, t);
      switch (r) {
        case "referenceHidden": {
          const s = await Te(t, {
            ...o,
            elementContext: "reference"
          }), a = rn(s, n.reference);
          return {
            data: {
              referenceHiddenOffsets: a,
              referenceHidden: on(a)
            }
          };
        }
        case "escaped": {
          const s = await Te(t, {
            ...o,
            altBoundary: !0
          }), a = rn(s, n.floating);
          return {
            data: {
              escapedOffsets: a,
              escaped: on(a)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, Ln = /* @__PURE__ */ new Set(["left", "top"]);
async function gs(e, t) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = e, s = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), a = se(n), i = Ae(n), l = q(n) === "y", c = Ln.has(a) ? -1 : 1, u = s && l ? -1 : 1, d = oe(t, e);
  let {
    mainAxis: p,
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
  return i && typeof b == "number" && (h = i === "end" ? b * -1 : b), l ? {
    x: h * u,
    y: p * c
  } : {
    x: p * c,
    y: h * u
  };
}
const vs = function(e) {
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
      } = t, l = await gs(t, e);
      return a === ((n = i.offset) == null ? void 0 : n.placement) && (r = i.arrow) != null && r.alignmentOffset ? {} : {
        x: o + l.x,
        y: s + l.y,
        data: {
          ...l,
          placement: a
        }
      };
    }
  };
}, bs = function(e) {
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
        ...l
      } = oe(e, t), c = {
        x: n,
        y: r
      }, u = await Te(t, l), d = q(se(o)), p = St(d);
      let h = c[p], b = c[d];
      if (s) {
        const g = p === "y" ? "top" : "left", v = p === "y" ? "bottom" : "right", y = h + u[g], w = h - u[v];
        h = gt(y, h, w);
      }
      if (a) {
        const g = d === "y" ? "top" : "left", v = d === "y" ? "bottom" : "right", y = b + u[g], w = b - u[v];
        b = gt(y, b, w);
      }
      const m = i.fn({
        ...t,
        [p]: h,
        [d]: b
      });
      return {
        ...m,
        data: {
          x: m.x - n,
          y: m.y - r,
          enabled: {
            [p]: s,
            [d]: a
          }
        }
      };
    }
  };
}, ys = function(e) {
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
        mainAxis: l = !0,
        crossAxis: c = !0
      } = oe(e, t), u = {
        x: n,
        y: r
      }, d = q(o), p = St(d);
      let h = u[p], b = u[d];
      const m = oe(i, t), g = typeof m == "number" ? {
        mainAxis: m,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...m
      };
      if (l) {
        const w = p === "y" ? "height" : "width", C = s.reference[p] - s.floating[w] + g.mainAxis, S = s.reference[p] + s.reference[w] - g.mainAxis;
        h < C ? h = C : h > S && (h = S);
      }
      if (c) {
        var v, y;
        const w = p === "y" ? "width" : "height", C = Ln.has(se(o)), S = s.reference[d] - s.floating[w] + (C && ((v = a.offset) == null ? void 0 : v[d]) || 0) + (C ? 0 : g.crossAxis), A = s.reference[d] + s.reference[w] + (C ? 0 : ((y = a.offset) == null ? void 0 : y[d]) || 0) - (C ? g.crossAxis : 0);
        b < S ? b = S : b > A && (b = A);
      }
      return {
        [p]: h,
        [d]: b
      };
    }
  };
}, ws = function(e) {
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
        apply: l = () => {
        },
        ...c
      } = oe(e, t), u = await Te(t, c), d = se(o), p = Ae(o), h = q(o) === "y", {
        width: b,
        height: m
      } = s.floating;
      let g, v;
      d === "top" || d === "bottom" ? (g = d, v = p === (await (a.isRTL == null ? void 0 : a.isRTL(i.floating)) ? "start" : "end") ? "left" : "right") : (v = d, g = p === "end" ? "top" : "bottom");
      const y = m - u.top - u.bottom, w = b - u.left - u.right, C = de(m - u[g], y), S = de(b - u[v], w), A = !t.middlewareData.shift;
      let E = C, O = S;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (O = w), (r = t.middlewareData.shift) != null && r.enabled.y && (E = y), A && !p) {
        const T = H(u.left, 0), B = H(u.right, 0), R = H(u.top, 0), I = H(u.bottom, 0);
        h ? O = b - 2 * (T !== 0 || B !== 0 ? T + B : H(u.left, u.right)) : E = m - 2 * (R !== 0 || I !== 0 ? R + I : H(u.top, u.bottom));
      }
      await l({
        ...t,
        availableWidth: O,
        availableHeight: E
      });
      const L = await a.getDimensions(i.floating);
      return b !== L.width || m !== L.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function Ze() {
  return typeof window < "u";
}
function Re(e) {
  return Dn(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function U(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function ee(e) {
  var t;
  return (t = (Dn(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Dn(e) {
  return Ze() ? e instanceof Node || e instanceof U(e).Node : !1;
}
function G(e) {
  return Ze() ? e instanceof Element || e instanceof U(e).Element : !1;
}
function Q(e) {
  return Ze() ? e instanceof HTMLElement || e instanceof U(e).HTMLElement : !1;
}
function sn(e) {
  return !Ze() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof U(e).ShadowRoot;
}
const xs = /* @__PURE__ */ new Set(["inline", "contents"]);
function De(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: o
  } = Y(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !xs.has(o);
}
const Cs = /* @__PURE__ */ new Set(["table", "td", "th"]);
function Ss(e) {
  return Cs.has(Re(e));
}
const Es = [":popover-open", ":modal"];
function Qe(e) {
  return Es.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const Ps = ["transform", "translate", "scale", "rotate", "perspective"], As = ["transform", "translate", "scale", "rotate", "perspective", "filter"], Rs = ["paint", "layout", "strict", "content"];
function At(e) {
  const t = Rt(), n = G(e) ? Y(e) : e;
  return Ps.some((r) => n[r] ? n[r] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || As.some((r) => (n.willChange || "").includes(r)) || Rs.some((r) => (n.contain || "").includes(r));
}
function ks(e) {
  let t = fe(e);
  for (; Q(t) && !Ce(t); ) {
    if (At(t))
      return t;
    if (Qe(t))
      return null;
    t = fe(t);
  }
  return null;
}
function Rt() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const Ns = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function Ce(e) {
  return Ns.has(Re(e));
}
function Y(e) {
  return U(e).getComputedStyle(e);
}
function Je(e) {
  return G(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function fe(e) {
  if (Re(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    sn(e) && e.host || // Fallback.
    ee(e)
  );
  return sn(t) ? t.host : t;
}
function _n(e) {
  const t = fe(e);
  return Ce(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : Q(t) && De(t) ? t : _n(t);
}
function Le(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = _n(e), s = o === ((r = e.ownerDocument) == null ? void 0 : r.body), a = U(o);
  if (s) {
    const i = bt(a);
    return t.concat(a, a.visualViewport || [], De(o) ? o : [], i && n ? Le(i) : []);
  }
  return t.concat(o, Le(o, [], n));
}
function bt(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function In(e) {
  const t = Y(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const o = Q(e), s = o ? e.offsetWidth : n, a = o ? e.offsetHeight : r, i = Ge(n) !== s || Ge(r) !== a;
  return i && (n = s, r = a), {
    width: n,
    height: r,
    $: i
  };
}
function kt(e) {
  return G(e) ? e : e.contextElement;
}
function ye(e) {
  const t = kt(e);
  if (!Q(t))
    return Z(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: o,
    $: s
  } = In(t);
  let a = (s ? Ge(n.width) : n.width) / r, i = (s ? Ge(n.height) : n.height) / o;
  return (!a || !Number.isFinite(a)) && (a = 1), (!i || !Number.isFinite(i)) && (i = 1), {
    x: a,
    y: i
  };
}
const Os = /* @__PURE__ */ Z(0);
function Fn(e) {
  const t = U(e);
  return !Rt() || !t.visualViewport ? Os : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function Ms(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== U(e) ? !1 : t;
}
function pe(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), s = kt(e);
  let a = Z(1);
  t && (r ? G(r) && (a = ye(r)) : a = ye(e));
  const i = Ms(s, n, r) ? Fn(s) : Z(0);
  let l = (o.left + i.x) / a.x, c = (o.top + i.y) / a.y, u = o.width / a.x, d = o.height / a.y;
  if (s) {
    const p = U(s), h = r && G(r) ? U(r) : r;
    let b = p, m = bt(b);
    for (; m && r && h !== b; ) {
      const g = ye(m), v = m.getBoundingClientRect(), y = Y(m), w = v.left + (m.clientLeft + parseFloat(y.paddingLeft)) * g.x, C = v.top + (m.clientTop + parseFloat(y.paddingTop)) * g.y;
      l *= g.x, c *= g.y, u *= g.x, d *= g.y, l += w, c += C, b = U(m), m = bt(b);
    }
  }
  return Xe({
    width: u,
    height: d,
    x: l,
    y: c
  });
}
function et(e, t) {
  const n = Je(e).scrollLeft;
  return t ? t.left + n : pe(ee(e)).left + n;
}
function Wn(e, t) {
  const n = e.getBoundingClientRect(), r = n.left + t.scrollLeft - et(e, n), o = n.top + t.scrollTop;
  return {
    x: r,
    y: o
  };
}
function Ts(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: r,
    strategy: o
  } = e;
  const s = o === "fixed", a = ee(r), i = t ? Qe(t.floating) : !1;
  if (r === a || i && s)
    return n;
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = Z(1);
  const u = Z(0), d = Q(r);
  if ((d || !d && !s) && ((Re(r) !== "body" || De(a)) && (l = Je(r)), Q(r))) {
    const h = pe(r);
    c = ye(r), u.x = h.x + r.clientLeft, u.y = h.y + r.clientTop;
  }
  const p = a && !d && !s ? Wn(a, l) : Z(0);
  return {
    width: n.width * c.x,
    height: n.height * c.y,
    x: n.x * c.x - l.scrollLeft * c.x + u.x + p.x,
    y: n.y * c.y - l.scrollTop * c.y + u.y + p.y
  };
}
function Ls(e) {
  return Array.from(e.getClientRects());
}
function Ds(e) {
  const t = ee(e), n = Je(e), r = e.ownerDocument.body, o = H(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), s = H(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let a = -n.scrollLeft + et(e);
  const i = -n.scrollTop;
  return Y(r).direction === "rtl" && (a += H(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: s,
    x: a,
    y: i
  };
}
const an = 25;
function _s(e, t) {
  const n = U(e), r = ee(e), o = n.visualViewport;
  let s = r.clientWidth, a = r.clientHeight, i = 0, l = 0;
  if (o) {
    s = o.width, a = o.height;
    const u = Rt();
    (!u || u && t === "fixed") && (i = o.offsetLeft, l = o.offsetTop);
  }
  const c = et(r);
  if (c <= 0) {
    const u = r.ownerDocument, d = u.body, p = getComputedStyle(d), h = u.compatMode === "CSS1Compat" && parseFloat(p.marginLeft) + parseFloat(p.marginRight) || 0, b = Math.abs(r.clientWidth - d.clientWidth - h);
    b <= an && (s -= b);
  } else c <= an && (s += c);
  return {
    width: s,
    height: a,
    x: i,
    y: l
  };
}
const Is = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function Fs(e, t) {
  const n = pe(e, !0, t === "fixed"), r = n.top + e.clientTop, o = n.left + e.clientLeft, s = Q(e) ? ye(e) : Z(1), a = e.clientWidth * s.x, i = e.clientHeight * s.y, l = o * s.x, c = r * s.y;
  return {
    width: a,
    height: i,
    x: l,
    y: c
  };
}
function cn(e, t, n) {
  let r;
  if (t === "viewport")
    r = _s(e, n);
  else if (t === "document")
    r = Ds(ee(e));
  else if (G(t))
    r = Fs(t, n);
  else {
    const o = Fn(e);
    r = {
      x: t.x - o.x,
      y: t.y - o.y,
      width: t.width,
      height: t.height
    };
  }
  return Xe(r);
}
function zn(e, t) {
  const n = fe(e);
  return n === t || !G(n) || Ce(n) ? !1 : Y(n).position === "fixed" || zn(n, t);
}
function Ws(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = Le(e, [], !1).filter((i) => G(i) && Re(i) !== "body"), o = null;
  const s = Y(e).position === "fixed";
  let a = s ? fe(e) : e;
  for (; G(a) && !Ce(a); ) {
    const i = Y(a), l = At(a);
    !l && i.position === "fixed" && (o = null), (s ? !l && !o : !l && i.position === "static" && !!o && Is.has(o.position) || De(a) && !l && zn(e, a)) ? r = r.filter((u) => u !== a) : o = i, a = fe(a);
  }
  return t.set(e, r), r;
}
function zs(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = e;
  const a = [...n === "clippingAncestors" ? Qe(t) ? [] : Ws(t, this._c) : [].concat(n), r], i = a[0], l = a.reduce((c, u) => {
    const d = cn(t, u, o);
    return c.top = H(d.top, c.top), c.right = de(d.right, c.right), c.bottom = de(d.bottom, c.bottom), c.left = H(d.left, c.left), c;
  }, cn(t, i, o));
  return {
    width: l.right - l.left,
    height: l.bottom - l.top,
    x: l.left,
    y: l.top
  };
}
function Bs(e) {
  const {
    width: t,
    height: n
  } = In(e);
  return {
    width: t,
    height: n
  };
}
function $s(e, t, n) {
  const r = Q(t), o = ee(t), s = n === "fixed", a = pe(e, !0, s, t);
  let i = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const l = Z(0);
  function c() {
    l.x = et(o);
  }
  if (r || !r && !s)
    if ((Re(t) !== "body" || De(o)) && (i = Je(t)), r) {
      const h = pe(t, !0, s, t);
      l.x = h.x + t.clientLeft, l.y = h.y + t.clientTop;
    } else o && c();
  s && !r && o && c();
  const u = o && !r && !s ? Wn(o, i) : Z(0), d = a.left + i.scrollLeft - l.x - u.x, p = a.top + i.scrollTop - l.y - u.y;
  return {
    x: d,
    y: p,
    width: a.width,
    height: a.height
  };
}
function ct(e) {
  return Y(e).position === "static";
}
function ln(e, t) {
  if (!Q(e) || Y(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return ee(e) === n && (n = n.ownerDocument.body), n;
}
function Bn(e, t) {
  const n = U(e);
  if (Qe(e))
    return n;
  if (!Q(e)) {
    let o = fe(e);
    for (; o && !Ce(o); ) {
      if (G(o) && !ct(o))
        return o;
      o = fe(o);
    }
    return n;
  }
  let r = ln(e, t);
  for (; r && Ss(r) && ct(r); )
    r = ln(r, t);
  return r && Ce(r) && ct(r) && !At(r) ? n : r || ks(e) || n;
}
const Vs = async function(e) {
  const t = this.getOffsetParent || Bn, n = this.getDimensions, r = await n(e.floating);
  return {
    reference: $s(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function js(e) {
  return Y(e).direction === "rtl";
}
const Hs = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Ts,
  getDocumentElement: ee,
  getClippingRect: zs,
  getOffsetParent: Bn,
  getElementRects: Vs,
  getClientRects: Ls,
  getDimensions: Bs,
  getScale: ye,
  isElement: G,
  isRTL: js
};
function $n(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Us(e, t) {
  let n = null, r;
  const o = ee(e);
  function s() {
    var i;
    clearTimeout(r), (i = n) == null || i.disconnect(), n = null;
  }
  function a(i, l) {
    i === void 0 && (i = !1), l === void 0 && (l = 1), s();
    const c = e.getBoundingClientRect(), {
      left: u,
      top: d,
      width: p,
      height: h
    } = c;
    if (i || t(), !p || !h)
      return;
    const b = Fe(d), m = Fe(o.clientWidth - (u + p)), g = Fe(o.clientHeight - (d + h)), v = Fe(u), w = {
      rootMargin: -b + "px " + -m + "px " + -g + "px " + -v + "px",
      threshold: H(0, de(1, l)) || 1
    };
    let C = !0;
    function S(A) {
      const E = A[0].intersectionRatio;
      if (E !== l) {
        if (!C)
          return a();
        E ? a(!1, E) : r = setTimeout(() => {
          a(!1, 1e-7);
        }, 1e3);
      }
      E === 1 && !$n(c, e.getBoundingClientRect()) && a(), C = !1;
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
  return a(!0), s;
}
function Gs(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: s = !0,
    elementResize: a = typeof ResizeObserver == "function",
    layoutShift: i = typeof IntersectionObserver == "function",
    animationFrame: l = !1
  } = r, c = kt(e), u = o || s ? [...c ? Le(c) : [], ...Le(t)] : [];
  u.forEach((v) => {
    o && v.addEventListener("scroll", n, {
      passive: !0
    }), s && v.addEventListener("resize", n);
  });
  const d = c && i ? Us(c, n) : null;
  let p = -1, h = null;
  a && (h = new ResizeObserver((v) => {
    let [y] = v;
    y && y.target === c && h && (h.unobserve(t), cancelAnimationFrame(p), p = requestAnimationFrame(() => {
      var w;
      (w = h) == null || w.observe(t);
    })), n();
  }), c && !l && h.observe(c), h.observe(t));
  let b, m = l ? pe(e) : null;
  l && g();
  function g() {
    const v = pe(e);
    m && !$n(m, v) && n(), m = v, b = requestAnimationFrame(g);
  }
  return n(), () => {
    var v;
    u.forEach((y) => {
      o && y.removeEventListener("scroll", n), s && y.removeEventListener("resize", n);
    }), d == null || d(), (v = h) == null || v.disconnect(), h = null, l && cancelAnimationFrame(b);
  };
}
const Ys = vs, Xs = bs, Ks = ps, qs = ws, Zs = hs, un = ms, Qs = ys, Js = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: Hs,
    ...n
  }, s = {
    ...o.platform,
    _c: r
  };
  return fs(e, t, {
    ...o,
    platform: s
  });
};
var ei = typeof document < "u", ti = function() {
}, je = ei ? zr : ti;
function Ke(e, t) {
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
        if (!Ke(e[r], t[r]))
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
      if (!(s === "_owner" && e.$$typeof) && !Ke(e[s], t[s]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function Vn(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function dn(e, t) {
  const n = Vn(e);
  return Math.round(t * n) / n;
}
function lt(e) {
  const t = f.useRef(e);
  return je(() => {
    t.current = e;
  }), t;
}
function ni(e) {
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
    whileElementsMounted: l,
    open: c
  } = e, [u, d] = f.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [p, h] = f.useState(r);
  Ke(p, r) || h(r);
  const [b, m] = f.useState(null), [g, v] = f.useState(null), y = f.useCallback((N) => {
    N !== A.current && (A.current = N, m(N));
  }, []), w = f.useCallback((N) => {
    N !== E.current && (E.current = N, v(N));
  }, []), C = s || b, S = a || g, A = f.useRef(null), E = f.useRef(null), O = f.useRef(u), L = l != null, T = lt(l), B = lt(o), R = lt(c), I = f.useCallback(() => {
    if (!A.current || !E.current)
      return;
    const N = {
      placement: t,
      strategy: n,
      middleware: p
    };
    B.current && (N.platform = B.current), Js(A.current, E.current, N).then((z) => {
      const j = {
        ...z,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: R.current !== !1
      };
      P.current && !Ke(O.current, j) && (O.current = j, vn.flushSync(() => {
        d(j);
      }));
    });
  }, [p, t, n, B, R]);
  je(() => {
    c === !1 && O.current.isPositioned && (O.current.isPositioned = !1, d((N) => ({
      ...N,
      isPositioned: !1
    })));
  }, [c]);
  const P = f.useRef(!1);
  je(() => (P.current = !0, () => {
    P.current = !1;
  }), []), je(() => {
    if (C && (A.current = C), S && (E.current = S), C && S) {
      if (T.current)
        return T.current(C, S, I);
      I();
    }
  }, [C, S, I, T, L]);
  const F = f.useMemo(() => ({
    reference: A,
    floating: E,
    setReference: y,
    setFloating: w
  }), [y, w]), D = f.useMemo(() => ({
    reference: C,
    floating: S
  }), [C, S]), W = f.useMemo(() => {
    const N = {
      position: n,
      left: 0,
      top: 0
    };
    if (!D.floating)
      return N;
    const z = dn(D.floating, u.x), j = dn(D.floating, u.y);
    return i ? {
      ...N,
      transform: "translate(" + z + "px, " + j + "px)",
      ...Vn(D.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: z,
      top: j
    };
  }, [n, i, D.floating, u.x, u.y]);
  return f.useMemo(() => ({
    ...u,
    update: I,
    refs: F,
    elements: D,
    floatingStyles: W
  }), [u, I, F, D, W]);
}
const ri = (e) => {
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
      return r && t(r) ? r.current != null ? un({
        element: r.current,
        padding: o
      }).fn(n) : {} : r ? un({
        element: r,
        padding: o
      }).fn(n) : {};
    }
  };
}, oi = (e, t) => ({
  ...Ys(e),
  options: [e, t]
}), si = (e, t) => ({
  ...Xs(e),
  options: [e, t]
}), ii = (e, t) => ({
  ...Qs(e),
  options: [e, t]
}), ai = (e, t) => ({
  ...Ks(e),
  options: [e, t]
}), ci = (e, t) => ({
  ...qs(e),
  options: [e, t]
}), li = (e, t) => ({
  ...Zs(e),
  options: [e, t]
}), ui = (e, t) => ({
  ...ri(e),
  options: [e, t]
});
var di = "Arrow", jn = f.forwardRef((e, t) => {
  const { children: n, width: r = 10, height: o = 5, ...s } = e;
  return /* @__PURE__ */ x(
    X.svg,
    {
      ...s,
      ref: t,
      width: r,
      height: o,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? n : /* @__PURE__ */ x("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
jn.displayName = di;
var fi = jn;
function Hn(e) {
  const [t, n] = f.useState(void 0);
  return ue(() => {
    if (e) {
      n({ width: e.offsetWidth, height: e.offsetHeight });
      const r = new ResizeObserver((o) => {
        if (!Array.isArray(o) || !o.length)
          return;
        const s = o[0];
        let a, i;
        if ("borderBoxSize" in s) {
          const l = s.borderBoxSize, c = Array.isArray(l) ? l[0] : l;
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
var Nt = "Popper", [Un, Gn] = Ct(Nt), [mi, Yn] = Un(Nt), Xn = (e) => {
  const { __scopePopper: t, children: n } = e, [r, o] = f.useState(null);
  return /* @__PURE__ */ x(mi, { scope: t, anchor: r, onAnchorChange: o, children: n });
};
Xn.displayName = Nt;
var Kn = "PopperAnchor", qn = f.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: r, ...o } = e, s = Yn(Kn, n), a = f.useRef(null), i = J(t, a), l = f.useRef(null);
    return f.useEffect(() => {
      const c = l.current;
      l.current = (r == null ? void 0 : r.current) || a.current, c !== l.current && s.onAnchorChange(l.current);
    }), r ? null : /* @__PURE__ */ x(X.div, { ...o, ref: i });
  }
);
qn.displayName = Kn;
var Ot = "PopperContent", [pi, hi] = Un(Ot), Zn = f.forwardRef(
  (e, t) => {
    var Lt, Dt, _t, It, Ft, Wt;
    const {
      __scopePopper: n,
      side: r = "bottom",
      sideOffset: o = 0,
      align: s = "center",
      alignOffset: a = 0,
      arrowPadding: i = 0,
      avoidCollisions: l = !0,
      collisionBoundary: c = [],
      collisionPadding: u = 0,
      sticky: d = "partial",
      hideWhenDetached: p = !1,
      updatePositionStrategy: h = "optimized",
      onPlaced: b,
      ...m
    } = e, g = Yn(Ot, n), [v, y] = f.useState(null), w = J(t, (ke) => y(ke)), [C, S] = f.useState(null), A = Hn(C), E = (A == null ? void 0 : A.width) ?? 0, O = (A == null ? void 0 : A.height) ?? 0, L = r + (s !== "center" ? "-" + s : ""), T = typeof u == "number" ? u : { top: 0, right: 0, bottom: 0, left: 0, ...u }, B = Array.isArray(c) ? c : [c], R = B.length > 0, I = {
      padding: T,
      boundary: B.filter(vi),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: R
    }, { refs: P, floatingStyles: F, placement: D, isPositioned: W, middlewareData: N } = ni({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: L,
      whileElementsMounted: (...ke) => Gs(...ke, {
        animationFrame: h === "always"
      }),
      elements: {
        reference: g.anchor
      },
      middleware: [
        oi({ mainAxis: o + O, alignmentAxis: a }),
        l && si({
          mainAxis: !0,
          crossAxis: !1,
          limiter: d === "partial" ? ii() : void 0,
          ...I
        }),
        l && ai({ ...I }),
        ci({
          ...I,
          apply: ({ elements: ke, rects: zt, availableWidth: _r, availableHeight: Ir }) => {
            const { width: Fr, height: Wr } = zt.reference, Ie = ke.floating.style;
            Ie.setProperty("--radix-popper-available-width", `${_r}px`), Ie.setProperty("--radix-popper-available-height", `${Ir}px`), Ie.setProperty("--radix-popper-anchor-width", `${Fr}px`), Ie.setProperty("--radix-popper-anchor-height", `${Wr}px`);
          }
        }),
        C && ui({ element: C, padding: i }),
        bi({ arrowWidth: E, arrowHeight: O }),
        p && li({ strategy: "referenceHidden", ...I })
      ]
    }), [z, j] = er(D), $ = xe(b);
    ue(() => {
      W && ($ == null || $());
    }, [W, $]);
    const Or = (Lt = N.arrow) == null ? void 0 : Lt.x, Mr = (Dt = N.arrow) == null ? void 0 : Dt.y, Tr = ((_t = N.arrow) == null ? void 0 : _t.centerOffset) !== 0, [Lr, Dr] = f.useState();
    return ue(() => {
      v && Dr(window.getComputedStyle(v).zIndex);
    }, [v]), /* @__PURE__ */ x(
      "div",
      {
        ref: P.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...F,
          transform: W ? F.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: Lr,
          "--radix-popper-transform-origin": [
            (It = N.transformOrigin) == null ? void 0 : It.x,
            (Ft = N.transformOrigin) == null ? void 0 : Ft.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...((Wt = N.hide) == null ? void 0 : Wt.referenceHidden) && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: e.dir,
        children: /* @__PURE__ */ x(
          pi,
          {
            scope: n,
            placedSide: z,
            onArrowChange: S,
            arrowX: Or,
            arrowY: Mr,
            shouldHideArrow: Tr,
            children: /* @__PURE__ */ x(
              X.div,
              {
                "data-side": z,
                "data-align": j,
                ...m,
                ref: w,
                style: {
                  ...m.style,
                  // if the PopperContent hasn't been placed yet (not all measurements done)
                  // we prevent animations so that users's animation don't kick in too early referring wrong sides
                  animation: W ? void 0 : "none"
                }
              }
            )
          }
        )
      }
    );
  }
);
Zn.displayName = Ot;
var Qn = "PopperArrow", gi = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, Jn = f.forwardRef(function(t, n) {
  const { __scopePopper: r, ...o } = t, s = hi(Qn, r), a = gi[s.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ x(
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
        children: /* @__PURE__ */ x(
          fi,
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
Jn.displayName = Qn;
function vi(e) {
  return e !== null;
}
var bi = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    var g, v, y;
    const { placement: n, rects: r, middlewareData: o } = t, a = ((g = o.arrow) == null ? void 0 : g.centerOffset) !== 0, i = a ? 0 : e.arrowWidth, l = a ? 0 : e.arrowHeight, [c, u] = er(n), d = { start: "0%", center: "50%", end: "100%" }[u], p = (((v = o.arrow) == null ? void 0 : v.x) ?? 0) + i / 2, h = (((y = o.arrow) == null ? void 0 : y.y) ?? 0) + l / 2;
    let b = "", m = "";
    return c === "bottom" ? (b = a ? d : `${p}px`, m = `${-l}px`) : c === "top" ? (b = a ? d : `${p}px`, m = `${r.floating.height + l}px`) : c === "right" ? (b = `${-l}px`, m = a ? d : `${h}px`) : c === "left" && (b = `${r.floating.width + l}px`, m = a ? d : `${h}px`), { data: { x: b, y: m } };
  }
});
function er(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var yi = Xn, tr = qn, wi = Zn, xi = Jn, Ci = "Portal", nr = f.forwardRef((e, t) => {
  var i;
  const { container: n, ...r } = e, [o, s] = f.useState(!1);
  ue(() => s(!0), []);
  const a = n || o && ((i = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : i.body);
  return a ? Br.createPortal(/* @__PURE__ */ x(X.div, { ...r, ref: t }), a) : null;
});
nr.displayName = Ci;
function Si(e, t) {
  return f.useReducer((n, r) => t[n][r] ?? n, e);
}
var Mt = (e) => {
  const { present: t, children: n } = e, r = Ei(t), o = typeof n == "function" ? n({ present: r.isPresent }) : f.Children.only(n), s = J(r.ref, Pi(o));
  return typeof n == "function" || r.isPresent ? f.cloneElement(o, { ref: s }) : null;
};
Mt.displayName = "Presence";
function Ei(e) {
  const [t, n] = f.useState(), r = f.useRef(null), o = f.useRef(e), s = f.useRef("none"), a = e ? "mounted" : "unmounted", [i, l] = Si(a, {
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
    const c = We(r.current);
    s.current = i === "mounted" ? c : "none";
  }, [i]), ue(() => {
    const c = r.current, u = o.current;
    if (u !== e) {
      const p = s.current, h = We(c);
      e ? l("MOUNT") : h === "none" || (c == null ? void 0 : c.display) === "none" ? l("UNMOUNT") : l(u && p !== h ? "ANIMATION_OUT" : "UNMOUNT"), o.current = e;
    }
  }, [e, l]), ue(() => {
    if (t) {
      let c;
      const u = t.ownerDocument.defaultView ?? window, d = (h) => {
        const m = We(r.current).includes(CSS.escape(h.animationName));
        if (h.target === t && m && (l("ANIMATION_END"), !o.current)) {
          const g = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", c = u.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = g);
          });
        }
      }, p = (h) => {
        h.target === t && (s.current = We(r.current));
      };
      return t.addEventListener("animationstart", p), t.addEventListener("animationcancel", d), t.addEventListener("animationend", d), () => {
        u.clearTimeout(c), t.removeEventListener("animationstart", p), t.removeEventListener("animationcancel", d), t.removeEventListener("animationend", d);
      };
    } else
      l("ANIMATION_END");
  }, [t, l]), {
    isPresent: ["mounted", "unmountSuspended"].includes(i),
    ref: f.useCallback((c) => {
      r.current = c ? getComputedStyle(c) : null, n(c);
    }, [])
  };
}
function We(e) {
  return (e == null ? void 0 : e.animationName) || "none";
}
function Pi(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var Ai = f[" useInsertionEffect ".trim().toString()] || ue;
function rr({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: r
}) {
  const [o, s, a] = Ri({
    defaultProp: t,
    onChange: n
  }), i = e !== void 0, l = i ? e : o;
  {
    const u = f.useRef(e !== void 0);
    f.useEffect(() => {
      const d = u.current;
      d !== i && console.warn(
        `${r} is changing from ${d ? "controlled" : "uncontrolled"} to ${i ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), u.current = i;
    }, [i, r]);
  }
  const c = f.useCallback(
    (u) => {
      var d;
      if (i) {
        const p = ki(u) ? u(e) : u;
        p !== e && ((d = a.current) == null || d.call(a, p));
      } else
        s(u);
    },
    [i, e, s, a]
  );
  return [l, c];
}
function Ri({
  defaultProp: e,
  onChange: t
}) {
  const [n, r] = f.useState(e), o = f.useRef(n), s = f.useRef(t);
  return Ai(() => {
    s.current = t;
  }, [t]), f.useEffect(() => {
    var a;
    o.current !== n && ((a = s.current) == null || a.call(s, n), o.current = n);
  }, [n, o]), [n, r, s];
}
function ki(e) {
  return typeof e == "function";
}
var Ni = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, he = /* @__PURE__ */ new WeakMap(), ze = /* @__PURE__ */ new WeakMap(), Be = {}, ut = 0, or = function(e) {
  return e && (e.host || or(e.parentNode));
}, Oi = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var r = or(n);
    return r && e.contains(r) ? r : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, Mi = function(e, t, n, r) {
  var o = Oi(t, Array.isArray(e) ? e : [e]);
  Be[n] || (Be[n] = /* @__PURE__ */ new WeakMap());
  var s = Be[n], a = [], i = /* @__PURE__ */ new Set(), l = new Set(o), c = function(d) {
    !d || i.has(d) || (i.add(d), c(d.parentNode));
  };
  o.forEach(c);
  var u = function(d) {
    !d || l.has(d) || Array.prototype.forEach.call(d.children, function(p) {
      if (i.has(p))
        u(p);
      else
        try {
          var h = p.getAttribute(r), b = h !== null && h !== "false", m = (he.get(p) || 0) + 1, g = (s.get(p) || 0) + 1;
          he.set(p, m), s.set(p, g), a.push(p), m === 1 && b && ze.set(p, !0), g === 1 && p.setAttribute(n, "true"), b || p.setAttribute(r, "true");
        } catch (v) {
          console.error("aria-hidden: cannot operate on ", p, v);
        }
    });
  };
  return u(t), i.clear(), ut++, function() {
    a.forEach(function(d) {
      var p = he.get(d) - 1, h = s.get(d) - 1;
      he.set(d, p), s.set(d, h), p || (ze.has(d) || d.removeAttribute(r), ze.delete(d)), h || d.removeAttribute(n);
    }), ut--, ut || (he = /* @__PURE__ */ new WeakMap(), he = /* @__PURE__ */ new WeakMap(), ze = /* @__PURE__ */ new WeakMap(), Be = {});
  };
}, Ti = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var r = Array.from(Array.isArray(e) ? e : [e]), o = Ni(e);
  return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live], script"))), Mi(r, o, n, "aria-hidden")) : function() {
    return null;
  };
}, K = function() {
  return K = Object.assign || function(t) {
    for (var n, r = 1, o = arguments.length; r < o; r++) {
      n = arguments[r];
      for (var s in n) Object.prototype.hasOwnProperty.call(n, s) && (t[s] = n[s]);
    }
    return t;
  }, K.apply(this, arguments);
};
function sr(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  return n;
}
function Li(e, t, n) {
  if (n || arguments.length === 2) for (var r = 0, o = t.length, s; r < o; r++)
    (s || !(r in t)) && (s || (s = Array.prototype.slice.call(t, 0, r)), s[r] = t[r]);
  return e.concat(s || Array.prototype.slice.call(t));
}
var He = "right-scroll-bar-position", Ue = "width-before-scroll-bar", Di = "with-scroll-bars-hidden", _i = "--removed-body-scroll-bar-size";
function dt(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function Ii(e, t) {
  var n = Me(function() {
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
var Fi = typeof window < "u" ? f.useLayoutEffect : f.useEffect, fn = /* @__PURE__ */ new WeakMap();
function Wi(e, t) {
  var n = Ii(null, function(r) {
    return e.forEach(function(o) {
      return dt(o, r);
    });
  });
  return Fi(function() {
    var r = fn.get(n);
    if (r) {
      var o = new Set(r), s = new Set(e), a = n.current;
      o.forEach(function(i) {
        s.has(i) || dt(i, null);
      }), s.forEach(function(i) {
        o.has(i) || dt(i, a);
      });
    }
    fn.set(n, e);
  }, [e]), n;
}
function zi(e) {
  return e;
}
function Bi(e, t) {
  t === void 0 && (t = zi);
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
      var l = function() {
        var u = a;
        a = [], u.forEach(s);
      }, c = function() {
        return Promise.resolve().then(l);
      };
      c(), n = {
        push: function(u) {
          a.push(u), c();
        },
        filter: function(u) {
          return a = a.filter(u), n;
        }
      };
    }
  };
  return o;
}
function $i(e) {
  e === void 0 && (e = {});
  var t = Bi(null);
  return t.options = K({ async: !0, ssr: !1 }, e), t;
}
var ir = function(e) {
  var t = e.sideCar, n = sr(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = t.read();
  if (!r)
    throw new Error("Sidecar medium not found");
  return f.createElement(r, K({}, n));
};
ir.isSideCarExport = !0;
function Vi(e, t) {
  return e.useMedium(t), ir;
}
var ar = $i(), ft = function() {
}, tt = f.forwardRef(function(e, t) {
  var n = f.useRef(null), r = f.useState({
    onScrollCapture: ft,
    onWheelCapture: ft,
    onTouchMoveCapture: ft
  }), o = r[0], s = r[1], a = e.forwardProps, i = e.children, l = e.className, c = e.removeScrollBar, u = e.enabled, d = e.shards, p = e.sideCar, h = e.noRelative, b = e.noIsolation, m = e.inert, g = e.allowPinchZoom, v = e.as, y = v === void 0 ? "div" : v, w = e.gapMode, C = sr(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), S = p, A = Wi([n, t]), E = K(K({}, C), o);
  return f.createElement(
    f.Fragment,
    null,
    u && f.createElement(S, { sideCar: ar, removeScrollBar: c, shards: d, noRelative: h, noIsolation: b, inert: m, setCallbacks: s, allowPinchZoom: !!g, lockRef: n, gapMode: w }),
    a ? f.cloneElement(f.Children.only(i), K(K({}, E), { ref: A })) : f.createElement(y, K({}, E, { className: l, ref: A }), i)
  );
});
tt.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
tt.classNames = {
  fullWidth: Ue,
  zeroRight: He
};
var ji = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function Hi() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = ji();
  return t && e.setAttribute("nonce", t), e;
}
function Ui(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function Gi(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var Yi = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = Hi()) && (Ui(t, n), Gi(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, Xi = function() {
  var e = Yi();
  return function(t, n) {
    f.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, cr = function() {
  var e = Xi(), t = function(n) {
    var r = n.styles, o = n.dynamic;
    return e(r, o), null;
  };
  return t;
}, Ki = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, mt = function(e) {
  return parseInt(e || "", 10) || 0;
}, qi = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [mt(n), mt(r), mt(o)];
}, Zi = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return Ki;
  var t = qi(e), n = document.documentElement.clientWidth, r = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, r - n + t[2] - t[0])
  };
}, Qi = cr(), we = "data-scroll-locked", Ji = function(e, t, n, r) {
  var o = e.left, s = e.top, a = e.right, i = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(Di, ` {
   overflow: hidden `).concat(r, `;
   padding-right: `).concat(i, "px ").concat(r, `;
  }
  body[`).concat(we, `] {
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
  
  .`).concat(He, ` {
    right: `).concat(i, "px ").concat(r, `;
  }
  
  .`).concat(Ue, ` {
    margin-right: `).concat(i, "px ").concat(r, `;
  }
  
  .`).concat(He, " .").concat(He, ` {
    right: 0 `).concat(r, `;
  }
  
  .`).concat(Ue, " .").concat(Ue, ` {
    margin-right: 0 `).concat(r, `;
  }
  
  body[`).concat(we, `] {
    `).concat(_i, ": ").concat(i, `px;
  }
`);
}, mn = function() {
  var e = parseInt(document.body.getAttribute(we) || "0", 10);
  return isFinite(e) ? e : 0;
}, ea = function() {
  f.useEffect(function() {
    return document.body.setAttribute(we, (mn() + 1).toString()), function() {
      var e = mn() - 1;
      e <= 0 ? document.body.removeAttribute(we) : document.body.setAttribute(we, e.toString());
    };
  }, []);
}, ta = function(e) {
  var t = e.noRelative, n = e.noImportant, r = e.gapMode, o = r === void 0 ? "margin" : r;
  ea();
  var s = f.useMemo(function() {
    return Zi(o);
  }, [o]);
  return f.createElement(Qi, { styles: Ji(s, !t, o, n ? "" : "!important") });
}, yt = !1;
if (typeof window < "u")
  try {
    var $e = Object.defineProperty({}, "passive", {
      get: function() {
        return yt = !0, !0;
      }
    });
    window.addEventListener("test", $e, $e), window.removeEventListener("test", $e, $e);
  } catch {
    yt = !1;
  }
var ge = yt ? { passive: !1 } : !1, na = function(e) {
  return e.tagName === "TEXTAREA";
}, lr = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !na(e) && n[t] === "visible")
  );
}, ra = function(e) {
  return lr(e, "overflowY");
}, oa = function(e) {
  return lr(e, "overflowX");
}, pn = function(e, t) {
  var n = t.ownerDocument, r = t;
  do {
    typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
    var o = ur(e, r);
    if (o) {
      var s = dr(e, r), a = s[1], i = s[2];
      if (a > i)
        return !0;
    }
    r = r.parentNode;
  } while (r && r !== n.body);
  return !1;
}, sa = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, r = e.clientHeight;
  return [
    t,
    n,
    r
  ];
}, ia = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, r = e.clientWidth;
  return [
    t,
    n,
    r
  ];
}, ur = function(e, t) {
  return e === "v" ? ra(t) : oa(t);
}, dr = function(e, t) {
  return e === "v" ? sa(t) : ia(t);
}, aa = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, ca = function(e, t, n, r, o) {
  var s = aa(e, window.getComputedStyle(t).direction), a = s * r, i = n.target, l = t.contains(i), c = !1, u = a > 0, d = 0, p = 0;
  do {
    if (!i)
      break;
    var h = dr(e, i), b = h[0], m = h[1], g = h[2], v = m - g - s * b;
    (b || v) && ur(e, i) && (d += v, p += b);
    var y = i.parentNode;
    i = y && y.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? y.host : y;
  } while (
    // portaled content
    !l && i !== document.body || // self content
    l && (t.contains(i) || t === i)
  );
  return (u && Math.abs(d) < 1 || !u && Math.abs(p) < 1) && (c = !0), c;
}, Ve = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, hn = function(e) {
  return [e.deltaX, e.deltaY];
}, gn = function(e) {
  return e && "current" in e ? e.current : e;
}, la = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, ua = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, da = 0, ve = [];
function fa(e) {
  var t = f.useRef([]), n = f.useRef([0, 0]), r = f.useRef(), o = f.useState(da++)[0], s = f.useState(cr)[0], a = f.useRef(e);
  f.useEffect(function() {
    a.current = e;
  }, [e]), f.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var m = Li([e.lockRef.current], (e.shards || []).map(gn), !0).filter(Boolean);
      return m.forEach(function(g) {
        return g.classList.add("allow-interactivity-".concat(o));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(o)), m.forEach(function(g) {
          return g.classList.remove("allow-interactivity-".concat(o));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var i = f.useCallback(function(m, g) {
    if ("touches" in m && m.touches.length === 2 || m.type === "wheel" && m.ctrlKey)
      return !a.current.allowPinchZoom;
    var v = Ve(m), y = n.current, w = "deltaX" in m ? m.deltaX : y[0] - v[0], C = "deltaY" in m ? m.deltaY : y[1] - v[1], S, A = m.target, E = Math.abs(w) > Math.abs(C) ? "h" : "v";
    if ("touches" in m && E === "h" && A.type === "range")
      return !1;
    var O = pn(E, A);
    if (!O)
      return !0;
    if (O ? S = E : (S = E === "v" ? "h" : "v", O = pn(E, A)), !O)
      return !1;
    if (!r.current && "changedTouches" in m && (w || C) && (r.current = S), !S)
      return !0;
    var L = r.current || S;
    return ca(L, g, m, L === "h" ? w : C);
  }, []), l = f.useCallback(function(m) {
    var g = m;
    if (!(!ve.length || ve[ve.length - 1] !== s)) {
      var v = "deltaY" in g ? hn(g) : Ve(g), y = t.current.filter(function(S) {
        return S.name === g.type && (S.target === g.target || g.target === S.shadowParent) && la(S.delta, v);
      })[0];
      if (y && y.should) {
        g.cancelable && g.preventDefault();
        return;
      }
      if (!y) {
        var w = (a.current.shards || []).map(gn).filter(Boolean).filter(function(S) {
          return S.contains(g.target);
        }), C = w.length > 0 ? i(g, w[0]) : !a.current.noIsolation;
        C && g.cancelable && g.preventDefault();
      }
    }
  }, []), c = f.useCallback(function(m, g, v, y) {
    var w = { name: m, delta: g, target: v, should: y, shadowParent: ma(v) };
    t.current.push(w), setTimeout(function() {
      t.current = t.current.filter(function(C) {
        return C !== w;
      });
    }, 1);
  }, []), u = f.useCallback(function(m) {
    n.current = Ve(m), r.current = void 0;
  }, []), d = f.useCallback(function(m) {
    c(m.type, hn(m), m.target, i(m, e.lockRef.current));
  }, []), p = f.useCallback(function(m) {
    c(m.type, Ve(m), m.target, i(m, e.lockRef.current));
  }, []);
  f.useEffect(function() {
    return ve.push(s), e.setCallbacks({
      onScrollCapture: d,
      onWheelCapture: d,
      onTouchMoveCapture: p
    }), document.addEventListener("wheel", l, ge), document.addEventListener("touchmove", l, ge), document.addEventListener("touchstart", u, ge), function() {
      ve = ve.filter(function(m) {
        return m !== s;
      }), document.removeEventListener("wheel", l, ge), document.removeEventListener("touchmove", l, ge), document.removeEventListener("touchstart", u, ge);
    };
  }, []);
  var h = e.removeScrollBar, b = e.inert;
  return f.createElement(
    f.Fragment,
    null,
    b ? f.createElement(s, { styles: ua(o) }) : null,
    h ? f.createElement(ta, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function ma(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const pa = Vi(ar, fa);
var fr = f.forwardRef(function(e, t) {
  return f.createElement(tt, K({}, e, { ref: t, sideCar: pa }));
});
fr.classNames = tt.classNames;
var nt = "Popover", [mr] = Ct(nt, [
  Gn
]), _e = Gn(), [ha, me] = mr(nt), pr = (e) => {
  const {
    __scopePopover: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: s,
    modal: a = !1
  } = e, i = _e(t), l = f.useRef(null), [c, u] = f.useState(!1), [d, p] = rr({
    prop: r,
    defaultProp: o ?? !1,
    onChange: s,
    caller: nt
  });
  return /* @__PURE__ */ x(yi, { ...i, children: /* @__PURE__ */ x(
    ha,
    {
      scope: t,
      contentId: es(),
      triggerRef: l,
      open: d,
      onOpenChange: p,
      onOpenToggle: f.useCallback(() => p((h) => !h), [p]),
      hasCustomAnchor: c,
      onCustomAnchorAdd: f.useCallback(() => u(!0), []),
      onCustomAnchorRemove: f.useCallback(() => u(!1), []),
      modal: a,
      children: n
    }
  ) });
};
pr.displayName = nt;
var hr = "PopoverAnchor", ga = f.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = me(hr, n), s = _e(n), { onCustomAnchorAdd: a, onCustomAnchorRemove: i } = o;
    return f.useEffect(() => (a(), () => i()), [a, i]), /* @__PURE__ */ x(tr, { ...s, ...r, ref: t });
  }
);
ga.displayName = hr;
var gr = "PopoverTrigger", vr = f.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = me(gr, n), s = _e(n), a = J(t, o.triggerRef), i = /* @__PURE__ */ x(
      X.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": o.open,
        "aria-controls": o.contentId,
        "data-state": Cr(o.open),
        ...r,
        ref: a,
        onClick: re(e.onClick, o.onOpenToggle)
      }
    );
    return o.hasCustomAnchor ? i : /* @__PURE__ */ x(tr, { asChild: !0, ...s, children: i });
  }
);
vr.displayName = gr;
var Tt = "PopoverPortal", [va, ba] = mr(Tt, {
  forceMount: void 0
}), br = (e) => {
  const { __scopePopover: t, forceMount: n, children: r, container: o } = e, s = me(Tt, t);
  return /* @__PURE__ */ x(va, { scope: t, forceMount: n, children: /* @__PURE__ */ x(Mt, { present: n || s.open, children: /* @__PURE__ */ x(nr, { asChild: !0, container: o, children: r }) }) });
};
br.displayName = Tt;
var Se = "PopoverContent", yr = f.forwardRef(
  (e, t) => {
    const n = ba(Se, e.__scopePopover), { forceMount: r = n.forceMount, ...o } = e, s = me(Se, e.__scopePopover);
    return /* @__PURE__ */ x(Mt, { present: r || s.open, children: s.modal ? /* @__PURE__ */ x(wa, { ...o, ref: t }) : /* @__PURE__ */ x(xa, { ...o, ref: t }) });
  }
);
yr.displayName = Se;
var ya = /* @__PURE__ */ An("PopoverContent.RemoveScroll"), wa = f.forwardRef(
  (e, t) => {
    const n = me(Se, e.__scopePopover), r = f.useRef(null), o = J(t, r), s = f.useRef(!1);
    return f.useEffect(() => {
      const a = r.current;
      if (a) return Ti(a);
    }, []), /* @__PURE__ */ x(fr, { as: ya, allowPinchZoom: !0, children: /* @__PURE__ */ x(
      wr,
      {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: re(e.onCloseAutoFocus, (a) => {
          var i;
          a.preventDefault(), s.current || (i = n.triggerRef.current) == null || i.focus();
        }),
        onPointerDownOutside: re(
          e.onPointerDownOutside,
          (a) => {
            const i = a.detail.originalEvent, l = i.button === 0 && i.ctrlKey === !0, c = i.button === 2 || l;
            s.current = c;
          },
          { checkForDefaultPrevented: !1 }
        ),
        onFocusOutside: re(
          e.onFocusOutside,
          (a) => a.preventDefault(),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
), xa = f.forwardRef(
  (e, t) => {
    const n = me(Se, e.__scopePopover), r = f.useRef(!1), o = f.useRef(!1);
    return /* @__PURE__ */ x(
      wr,
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
          var l, c;
          (l = e.onInteractOutside) == null || l.call(e, s), s.defaultPrevented || (r.current = !0, s.detail.originalEvent.type === "pointerdown" && (o.current = !0));
          const a = s.target;
          ((c = n.triggerRef.current) == null ? void 0 : c.contains(a)) && s.preventDefault(), s.detail.originalEvent.type === "focusin" && o.current && s.preventDefault();
        }
      }
    );
  }
), wr = f.forwardRef(
  (e, t) => {
    const {
      __scopePopover: n,
      trapFocus: r,
      onOpenAutoFocus: o,
      onCloseAutoFocus: s,
      disableOutsidePointerEvents: a,
      onEscapeKeyDown: i,
      onPointerDownOutside: l,
      onFocusOutside: c,
      onInteractOutside: u,
      ...d
    } = e, p = me(Se, n), h = _e(n);
    return Ho(), /* @__PURE__ */ x(
      On,
      {
        asChild: !0,
        loop: !0,
        trapped: r,
        onMountAutoFocus: o,
        onUnmountAutoFocus: s,
        children: /* @__PURE__ */ x(
          kn,
          {
            asChild: !0,
            disableOutsidePointerEvents: a,
            onInteractOutside: u,
            onEscapeKeyDown: i,
            onPointerDownOutside: l,
            onFocusOutside: c,
            onDismiss: () => p.onOpenChange(!1),
            children: /* @__PURE__ */ x(
              wi,
              {
                "data-state": Cr(p.open),
                role: "dialog",
                id: p.contentId,
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
), xr = "PopoverClose", Ca = f.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = me(xr, n);
    return /* @__PURE__ */ x(
      X.button,
      {
        type: "button",
        ...r,
        ref: t,
        onClick: re(e.onClick, () => o.onOpenChange(!1))
      }
    );
  }
);
Ca.displayName = xr;
var Sa = "PopoverArrow", Ea = f.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = _e(n);
    return /* @__PURE__ */ x(xi, { ...o, ...r, ref: t });
  }
);
Ea.displayName = Sa;
function Cr(e) {
  return e ? "open" : "closed";
}
var Pa = pr, Aa = vr, Ra = br, Sr = yr;
const Qa = Pa, Ja = Aa, ka = Ee(({ className: e, align: t = "end", sideOffset: n = 8, ...r }, o) => /* @__PURE__ */ x(Ra, { children: /* @__PURE__ */ x(
  Sr,
  {
    ref: o,
    align: t,
    sideOffset: n,
    className: M(
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
ka.displayName = Sr.displayName;
const Na = ie(
  M(
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
), Oa = Ee(
  ({ className: e, variant: t, icon: n, children: r, ...o }, s) => /* @__PURE__ */ V(
    "button",
    {
      ref: s,
      className: M(Na({ variant: t }), e),
      ...o,
      children: [
        n && /* @__PURE__ */ x("span", { className: "shrink-0", children: n }),
        r
      ]
    }
  )
);
Oa.displayName = "PopoverMenuItem";
const Ma = ie("cms-font-pretendard cms-text-black", {
  variants: {
    variant: {
      h1: "text-cms-4xl font-bold",
      h2: "text-cms-2xl font-semibold",
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
}), Ta = ne.forwardRef(
  ({
    className: e,
    variant: t,
    align: n,
    decoration: r,
    as: o = "p",
    children: s,
    ...a
  }, i) => /* @__PURE__ */ x(
    o,
    {
      className: M(Ma({ variant: t, align: n, decoration: r }), e),
      ref: i,
      ...a,
      children: s
    }
  )
);
Ta.displayName = "Text";
const La = ie(
  M(
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
        default: M(
          "bg-cms-white ",
          "border-cms-gray-450",
          "focus:border-cms-gray-800",
          "disabled:bg-cms-gray-150 disabled:text-cms-gray-400 disabled:cursor-not-allowed"
        ),
        error: M(
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
), Da = ie("block text-cms-sm font-medium text-cms-black"), _a = ie(
  "block text-cms-sm font-medium text-cms-red-400 mt-1"
), Ia = ie(
  "block text-cms-sm font-normal text-cms-gray-700 mt-1"
), qe = ne.forwardRef(
  ({
    className: e,
    variant: t,
    fullWidth: n,
    label: r,
    error: o,
    errorMessage: s,
    helperText: a,
    showCharCount: i,
    maxLength: l,
    value: c,
    defaultValue: u,
    onChange: d,
    id: p,
    ...h
  }, b) => {
    const [m, g] = ne.useState(
      c || u || ""
    ), v = p || `input-${Math.random().toString(36).substr(2, 9)}`, y = o ? "error" : t, w = c !== void 0 ? c : m, C = (w == null ? void 0 : w.length) || 0, S = (E) => {
      c === void 0 && g(E.target.value), d == null || d(E);
    }, A = r || i && l;
    return /* @__PURE__ */ V("div", { className: M("w-full", !n && "w-auto"), children: [
      A && /* @__PURE__ */ V("div", { className: "flex justify-between items-center mb-2", children: [
        r ? /* @__PURE__ */ x("label", { htmlFor: v, className: Da(), children: r }) : /* @__PURE__ */ x("div", {}),
        i && l && /* @__PURE__ */ V("span", { className: "text-cms-xs text-cms-gray-600", children: [
          C,
          " / ",
          l
        ] })
      ] }),
      /* @__PURE__ */ x(
        "input",
        {
          id: v,
          ref: b,
          className: M(
            La({ variant: y, fullWidth: n }),
            e
          ),
          maxLength: l,
          value: c,
          defaultValue: u,
          onChange: S,
          ...h
        }
      ),
      o && s && /* @__PURE__ */ x("span", { className: _a(), children: s }),
      !o && a && /* @__PURE__ */ x("span", { className: Ia(), children: a })
    ] });
  }
);
qe.displayName = "TextInput";
const Fa = ne.forwardRef(
  ({ value: e, onChange: t, min: n, max: r, ...o }, s) => /* @__PURE__ */ x(
    qe,
    {
      ref: s,
      type: "date",
      value: e,
      onChange: (i) => {
        t == null || t(i.target.value);
      },
      min: n,
      max: r,
      ...o
    }
  )
);
Fa.displayName = "DatePicker";
const Wa = ne.forwardRef(
  ({
    value: e,
    onChange: t,
    startLabel: n = "시작일",
    endLabel: r = "종료일",
    startPlaceholder: o = "YYYY-MM-DD",
    endPlaceholder: s = "YYYY-MM-DD",
    min: a,
    max: i,
    label: l,
    error: c,
    errorMessage: u,
    helperText: d,
    fullWidth: p = !0,
    ...h
  }, b) => {
    const [m, g] = ne.useState((e == null ? void 0 : e.start) || ""), [v, y] = ne.useState((e == null ? void 0 : e.end) || "");
    ne.useEffect(() => {
      e && (g(e.start), y(e.end));
    }, [e]);
    const w = (S) => {
      const A = S.target.value;
      g(A), t == null || t({ start: A, end: v });
    }, C = (S) => {
      const A = S.target.value;
      y(A), t == null || t({ start: m, end: A });
    };
    return /* @__PURE__ */ V("div", { ref: b, className: M("cms-w-full", !p && "cms-w-auto"), children: [
      l && /* @__PURE__ */ x("label", { className: "cms-block cms-text-cms-md cms-font-medium cms-text-black cms-mb-2", children: l }),
      /* @__PURE__ */ V("div", { className: "cms-flex cms-gap-4 cms-items-center", children: [
        /* @__PURE__ */ x(
          qe,
          {
            type: "date",
            value: m,
            onChange: w,
            placeholder: o,
            min: a,
            max: v || i,
            fullWidth: !0,
            ...h
          }
        ),
        /* @__PURE__ */ x("span", { className: "cms-text-cms-md cms-text-gray-600", children: "~" }),
        /* @__PURE__ */ x(
          qe,
          {
            type: "date",
            value: v,
            onChange: C,
            placeholder: s,
            min: m || a,
            max: i,
            fullWidth: !0,
            ...h
          }
        )
      ] }),
      c && u && /* @__PURE__ */ x("span", { className: "cms-block cms-text-cms-sm cms-font-medium cms-text-red-400 cms-mt-1", children: u }),
      !c && d && /* @__PURE__ */ x("span", { className: "cms-block cms-text-cms-sm cms-font-normal cms-text-gray-600 cms-mt-1", children: d })
    ] });
  }
);
Wa.displayName = "DateRangePicker";
function za(e) {
  const t = f.useRef({ value: e, previous: e });
  return f.useMemo(() => (t.current.value !== e && (t.current.previous = t.current.value, t.current.value = e), t.current.previous), [e]);
}
var rt = "Switch", [Ba] = Ct(rt), [$a, Va] = Ba(rt), Er = f.forwardRef(
  (e, t) => {
    const {
      __scopeSwitch: n,
      name: r,
      checked: o,
      defaultChecked: s,
      required: a,
      disabled: i,
      value: l = "on",
      onCheckedChange: c,
      form: u,
      ...d
    } = e, [p, h] = f.useState(null), b = J(t, (w) => h(w)), m = f.useRef(!1), g = p ? u || !!p.closest("form") : !0, [v, y] = rr({
      prop: o,
      defaultProp: s ?? !1,
      onChange: c,
      caller: rt
    });
    return /* @__PURE__ */ V($a, { scope: n, checked: v, disabled: i, children: [
      /* @__PURE__ */ x(
        X.button,
        {
          type: "button",
          role: "switch",
          "aria-checked": v,
          "aria-required": a,
          "data-state": kr(v),
          "data-disabled": i ? "" : void 0,
          disabled: i,
          value: l,
          ...d,
          ref: b,
          onClick: re(e.onClick, (w) => {
            y((C) => !C), g && (m.current = w.isPropagationStopped(), m.current || w.stopPropagation());
          })
        }
      ),
      g && /* @__PURE__ */ x(
        Rr,
        {
          control: p,
          bubbles: !m.current,
          name: r,
          value: l,
          checked: v,
          required: a,
          disabled: i,
          form: u,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
Er.displayName = rt;
var Pr = "SwitchThumb", Ar = f.forwardRef(
  (e, t) => {
    const { __scopeSwitch: n, ...r } = e, o = Va(Pr, n);
    return /* @__PURE__ */ x(
      X.span,
      {
        "data-state": kr(o.checked),
        "data-disabled": o.disabled ? "" : void 0,
        ...r,
        ref: t
      }
    );
  }
);
Ar.displayName = Pr;
var ja = "SwitchBubbleInput", Rr = f.forwardRef(
  ({
    __scopeSwitch: e,
    control: t,
    checked: n,
    bubbles: r = !0,
    ...o
  }, s) => {
    const a = f.useRef(null), i = J(a, s), l = za(n), c = Hn(t);
    return f.useEffect(() => {
      const u = a.current;
      if (!u) return;
      const d = window.HTMLInputElement.prototype, h = Object.getOwnPropertyDescriptor(
        d,
        "checked"
      ).set;
      if (l !== n && h) {
        const b = new Event("click", { bubbles: r });
        h.call(u, n), u.dispatchEvent(b);
      }
    }, [l, n, r]), /* @__PURE__ */ x(
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
Rr.displayName = ja;
function kr(e) {
  return e ? "checked" : "unchecked";
}
var Nr = Er, Ha = Ar;
const Ua = ie(
  M(
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
), Ga = ne.forwardRef(({ className: e, variant: t, ...n }, r) => /* @__PURE__ */ x(
  Nr,
  {
    className: M(Ua({ variant: t }), e),
    ...n,
    ref: r,
    children: /* @__PURE__ */ x(
      Ha,
      {
        className: M(
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
Ga.displayName = Nr.displayName;
export {
  xo as Button,
  Za as ChevronRightIcon,
  Ro as Combobox,
  Fa as DatePicker,
  Wa as DateRangePicker,
  xt as Dropdown,
  qa as LoadingCircle,
  Qa as Popover,
  ka as PopoverContent,
  Oa as PopoverMenuItem,
  Ja as PopoverTrigger,
  Ao as Select,
  Ga as Switch,
  Ta as Text,
  qe as TextInput,
  wo as buttonVariants,
  M as cn,
  So as dropdownTriggerVariants,
  Na as popoverMenuItemVariants
};
//# sourceMappingURL=index.es.js.map
