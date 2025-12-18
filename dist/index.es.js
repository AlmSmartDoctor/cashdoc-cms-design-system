import { jsx as w, jsxs as U } from "react/jsx-runtime";
import * as d from "react";
import $, { forwardRef as Ee, useState as Me, useRef as Yt, useEffect as Xt, useLayoutEffect as mo } from "react";
import * as En from "react-dom";
import ho from "react-dom";
function Pn(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (n = Pn(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function An() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++) (e = arguments[n]) && (t = Pn(e)) && (r && (r += " "), r += t);
  return r;
}
const kt = "-", go = (e) => {
  const t = bo(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (a) => {
      const i = a.split(kt);
      return i[0] === "" && i.length !== 1 && i.shift(), kn(i, t) || vo(a);
    },
    getConflictingClassGroupIds: (a, i) => {
      const u = n[a] || [];
      return i && r[a] ? [...u, ...r[a]] : u;
    }
  };
}, kn = (e, t) => {
  var a;
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], r = t.nextPart.get(n), o = r ? kn(e.slice(1), r) : void 0;
  if (o)
    return o;
  if (t.validators.length === 0)
    return;
  const s = e.join(kt);
  return (a = t.validators.find(({
    validator: i
  }) => i(s))) == null ? void 0 : a.classGroupId;
}, qt = /^\[(.+)\]$/, vo = (e) => {
  if (qt.test(e)) {
    const t = qt.exec(e)[1], n = t == null ? void 0 : t.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, bo = (e) => {
  const {
    theme: t,
    prefix: n
  } = e, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return wo(Object.entries(e.classGroups), n).forEach(([s, a]) => {
    xt(a, r, s, t);
  }), r;
}, xt = (e, t, n, r) => {
  e.forEach((o) => {
    if (typeof o == "string") {
      const s = o === "" ? t : Zt(t, o);
      s.classGroupId = n;
      return;
    }
    if (typeof o == "function") {
      if (yo(o)) {
        xt(o(r), t, n, r);
        return;
      }
      t.validators.push({
        validator: o,
        classGroupId: n
      });
      return;
    }
    Object.entries(o).forEach(([s, a]) => {
      xt(a, Zt(t, s), n, r);
    });
  });
}, Zt = (e, t) => {
  let n = e;
  return t.split(kt).forEach((r) => {
    n.nextPart.has(r) || n.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(r);
  }), n;
}, yo = (e) => e.isThemeGetter, wo = (e, t) => t ? e.map(([n, r]) => {
  const o = r.map((s) => typeof s == "string" ? t + s : typeof s == "object" ? Object.fromEntries(Object.entries(s).map(([a, i]) => [t + a, i])) : s);
  return [n, o];
}) : e, xo = (e) => {
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
}, Nn = "!", Co = (e) => {
  const {
    separator: t,
    experimentalParseClassName: n
  } = e, r = t.length === 1, o = t[0], s = t.length, a = (i) => {
    const u = [];
    let c = 0, l = 0, f;
    for (let g = 0; g < i.length; g++) {
      let v = i[g];
      if (c === 0) {
        if (v === o && (r || i.slice(g, g + s) === t)) {
          u.push(i.slice(l, g)), l = g + s;
          continue;
        }
        if (v === "/") {
          f = g;
          continue;
        }
      }
      v === "[" ? c++ : v === "]" && c--;
    }
    const m = u.length === 0 ? i : i.substring(l), h = m.startsWith(Nn), b = h ? m.substring(1) : m, p = f && f > l ? f - l : void 0;
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
}, Ro = (e) => {
  if (e.length <= 1)
    return e;
  const t = [];
  let n = [];
  return e.forEach((r) => {
    r[0] === "[" ? (t.push(...n.sort(), r), n = []) : n.push(r);
  }), t.push(...n.sort()), t;
}, So = (e) => ({
  cache: xo(e.cacheSize),
  parseClassName: Co(e),
  ...go(e)
}), Eo = /\s+/, Po = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: r,
    getConflictingClassGroupIds: o
  } = t, s = [], a = e.trim().split(Eo);
  let i = "";
  for (let u = a.length - 1; u >= 0; u -= 1) {
    const c = a[u], {
      modifiers: l,
      hasImportantModifier: f,
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
    const g = Ro(l).join(":"), v = f ? g + Nn : g, x = v + p;
    if (s.includes(x))
      continue;
    s.push(x);
    const y = o(p, b);
    for (let C = 0; C < y.length; ++C) {
      const R = y[C];
      s.push(v + R);
    }
    i = c + (i.length > 0 ? " " + i : i);
  }
  return i;
};
function Ao() {
  let e = 0, t, n, r = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = On(t)) && (r && (r += " "), r += n);
  return r;
}
const On = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (t = On(e[r])) && (n && (n += " "), n += t);
  return n;
};
function ko(e, ...t) {
  let n, r, o, s = a;
  function a(u) {
    const c = t.reduce((l, f) => f(l), e());
    return n = So(c), r = n.cache.get, o = n.cache.set, s = i, i(u);
  }
  function i(u) {
    const c = r(u);
    if (c)
      return c;
    const l = Po(u, n);
    return o(u, l), l;
  }
  return function() {
    return s(Ao.apply(null, arguments));
  };
}
const W = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, Tn = /^\[(?:([a-z-]+):)?(.+)\]$/i, No = /^\d+\/\d+$/, Oo = /* @__PURE__ */ new Set(["px", "full", "screen"]), To = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Mo = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Io = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, Lo = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, _o = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, oe = (e) => we(e) || Oo.has(e) || No.test(e), ae = (e) => Pe(e, "length", Go), we = (e) => !!e && !Number.isNaN(Number(e)), ut = (e) => Pe(e, "number", we), Oe = (e) => !!e && Number.isInteger(Number(e)), Do = (e) => e.endsWith("%") && we(e.slice(0, -1)), N = (e) => Tn.test(e), ce = (e) => To.test(e), Fo = /* @__PURE__ */ new Set(["length", "size", "percentage"]), Wo = (e) => Pe(e, Fo, Mn), zo = (e) => Pe(e, "position", Mn), Bo = /* @__PURE__ */ new Set(["image", "url"]), $o = (e) => Pe(e, Bo, Uo), Vo = (e) => Pe(e, "", jo), Te = () => !0, Pe = (e, t, n) => {
  const r = Tn.exec(e);
  return r ? r[1] ? typeof t == "string" ? r[1] === t : t.has(r[1]) : n(r[2]) : !1;
}, Go = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Mo.test(e) && !Io.test(e)
), Mn = () => !1, jo = (e) => Lo.test(e), Uo = (e) => _o.test(e), Ho = () => {
  const e = W("colors"), t = W("spacing"), n = W("blur"), r = W("brightness"), o = W("borderColor"), s = W("borderRadius"), a = W("borderSpacing"), i = W("borderWidth"), u = W("contrast"), c = W("grayscale"), l = W("hueRotate"), f = W("invert"), m = W("gap"), h = W("gradientColorStops"), b = W("gradientColorStopPositions"), p = W("inset"), g = W("margin"), v = W("opacity"), x = W("padding"), y = W("saturate"), C = W("scale"), R = W("sepia"), E = W("skew"), S = W("space"), A = W("translate"), L = () => ["auto", "contain", "none"], I = () => ["auto", "hidden", "clip", "visible", "scroll"], F = () => ["auto", N, t], k = () => [N, t], _ = () => ["", oe, ae], P = () => ["auto", we, N], D = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], M = () => ["solid", "dashed", "dotted", "double", "none"], z = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], O = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], B = () => ["", "0", N], K = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], H = () => [we, N];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [Te],
      spacing: [oe, ae],
      blur: ["none", "", ce, N],
      brightness: H(),
      borderColor: [e],
      borderRadius: ["none", "", "full", ce, N],
      borderSpacing: k(),
      borderWidth: _(),
      contrast: H(),
      grayscale: B(),
      hueRotate: H(),
      invert: B(),
      gap: k(),
      gradientColorStops: [e],
      gradientColorStopPositions: [Do, ae],
      inset: F(),
      margin: F(),
      opacity: H(),
      padding: k(),
      saturate: H(),
      scale: H(),
      sepia: B(),
      skew: H(),
      space: k(),
      translate: k()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", N]
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
        object: [...D(), N]
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
        z: ["auto", Oe, N]
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
        flex: ["1", "auto", "initial", "none", N]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: B()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: B()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", Oe, N]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [Te]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", Oe, N]
        }, N]
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
        "grid-rows": [Te]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [Oe, N]
        }, N]
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
        "auto-cols": ["auto", "min", "max", "fr", N]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", N]
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
        justify: ["normal", ...O()]
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
        content: ["normal", ...O(), "baseline"]
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
        "place-content": [...O(), "baseline"]
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
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", N, t]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [N, t, "min", "max", "fit"]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [N, t, "none", "full", "min", "max", "fit", "prose", {
          screen: [ce]
        }, ce]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [N, t, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": [N, t, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [N, t, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [N, t, "auto", "min", "max", "fit"]
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
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", ut]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [Te]
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
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", N]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", we, ut]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", oe, N]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", N]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", N]
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
        decoration: [...M(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", oe, ae]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", oe, N]
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
        indent: k()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", N]
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
        content: ["none", N]
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
        bg: [...D(), zo]
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
        bg: ["auto", "cover", "contain", Wo]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, $o]
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
        border: [...M(), "hidden"]
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
        divide: M()
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
        outline: ["", ...M()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [oe, N]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [oe, ae]
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
        "ring-offset": [oe, ae]
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
        shadow: ["", "inner", "none", ce, Vo]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [Te]
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
        "mix-blend": [...z(), "plus-lighter", "plus-darker"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": z()
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
        "drop-shadow": ["", "none", ce, N]
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
        saturate: [y]
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
        "backdrop-opacity": [v]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [y]
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
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", N]
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
        ease: ["linear", "in", "out", "in-out", N]
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
        animate: ["none", "spin", "ping", "pulse", "bounce", N]
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
        rotate: [Oe, N]
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
        "skew-x": [E]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [E]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", N]
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", N]
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
        "scroll-m": k()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": k()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": k()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": k()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": k()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": k()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": k()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": k()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": k()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": k()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": k()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": k()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": k()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": k()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": k()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": k()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": k()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": k()
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
        "will-change": ["auto", "scroll", "contents", "transform", N]
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
        stroke: [oe, ae, ut]
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
}, Ko = /* @__PURE__ */ ko(Ho);
function T(...e) {
  return Ko(An(e));
}
const Qt = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, Jt = An, Q = (e, t) => (n) => {
  var r;
  if ((t == null ? void 0 : t.variants) == null) return Jt(e, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
  const { variants: o, defaultVariants: s } = t, a = Object.keys(o).map((c) => {
    const l = n == null ? void 0 : n[c], f = s == null ? void 0 : s[c];
    if (l === null) return null;
    const m = Qt(l) || Qt(f);
    return o[c][m];
  }), i = n && Object.entries(n).reduce((c, l) => {
    let [f, m] = l;
    return m === void 0 || (c[f] = m), c;
  }, {}), u = t == null || (r = t.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((c, l) => {
    let { class: f, className: m, ...h } = l;
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
      f,
      m
    ] : c;
  }, []);
  return Jt(e, a, u, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
}, Yo = Q(
  T(
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
        secondary: T(
          "bg-cms-gray-300 text-cms-black",
          "hover:bg-cms-gray-200 hover:text-cms-gray-800"
        ),
        outline: T(
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
), Xo = Ee(
  ({ className: e, variant: t, size: n, ...r }, o) => /* @__PURE__ */ w(
    "button",
    {
      className: T(Yo({ variant: t, size: n, className: e })),
      ref: o,
      ...r
    }
  )
);
Xo.displayName = "Button";
const qo = {
  sm: "h-4 w-4",
  md: "h-8 w-8",
  lg: "h-16 w-16"
};
function qc({ size: e = "lg", className: t }) {
  return /* @__PURE__ */ w("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ w(
    "div",
    {
      className: T(
        qo[e],
        "animate-spin rounded-full border-2 border-cms-gray-500 border-b-transparent",
        t
      )
    }
  ) });
}
const Zo = Q(
  T(
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
        default: T(
          "bg-default text-black border border-cms-outline",
          "hover:bg-cms-gray-200"
        ),
        outline: T(
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
), Qo = ({
  className: e,
  isOpen: t
}) => /* @__PURE__ */ w(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "10",
    height: "6",
    viewBox: "0 0 10 6",
    fill: "none",
    className: T(
      "transition-transform duration-200",
      t && "rotate-180",
      e
    ),
    children: /* @__PURE__ */ w(
      "path",
      {
        d: "M8.75 0.75L4.57609 4.75L0.75 0.75",
        stroke: "currentColor",
        strokeWidth: "1.5",
        strokeLinecap: "round"
      }
    )
  }
), Jo = ({ className: e }) => /* @__PURE__ */ w(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none",
    className: e,
    children: /* @__PURE__ */ w(
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
), Nt = Ee(
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
    multiple: f = !1,
    maxHeight: m = 200,
    ...h
  }, b) => {
    const [p, g] = Me(!1), [v, x] = Me(""), [y, C] = Me(
      f ? t ? [t] : [] : []
    ), R = Yt(null), E = Yt(null), S = e.find((P) => P.value === t), A = f ? y.length > 0 ? `${y.length}개 선택됨` : n : (S == null ? void 0 : S.label) || n, L = e.filter(
      (P) => P.label.toLowerCase().includes(v.toLowerCase())
    ), I = () => {
      o || (g(!p), x(""));
    }, F = (P) => {
      if (!P.disabled)
        if (f) {
          const D = y.includes(P.value) ? y.filter((M) => M !== P.value) : [...y, P.value];
          C(D), r == null || r(D.join(","));
        } else
          r == null || r(P.value), g(!1);
    }, k = (P) => {
      P.stopPropagation(), f && C([]), r == null || r("");
    }, _ = (P) => {
      P.key === "Escape" ? g(!1) : (P.key === "Enter" || P.key === " ") && (P.preventDefault(), I());
    };
    return Xt(() => {
      const P = (D) => {
        R.current && !R.current.contains(D.target) && g(!1);
      };
      return document.addEventListener("mousedown", P), () => document.removeEventListener("mousedown", P);
    }, []), Xt(() => {
      p && c && E.current && E.current.focus();
    }, [p, c]), /* @__PURE__ */ U("div", { ref: R, className: "relative w-full", children: [
      /* @__PURE__ */ U(
        "button",
        {
          ref: b,
          type: "button",
          className: T(
            Zo({ variant: i, size: u }),
            o && "opacity-50 cursor-not-allowed",
            s
          ),
          onClick: I,
          onKeyDown: _,
          disabled: o,
          "aria-expanded": p,
          "aria-haspopup": "listbox",
          ...h,
          children: [
            /* @__PURE__ */ w(
              "span",
              {
                className: T(
                  "truncate flex-1 text-left",
                  !S && !f && "text-cms-gray-400"
                ),
                children: A
              }
            ),
            /* @__PURE__ */ U("div", { className: "flex items-center gap-2 ml-3", children: [
              l && (t || y.length > 0) && /* @__PURE__ */ w(
                "button",
                {
                  type: "button",
                  className: T(
                    "p-1 rounded text-cms-gray-400 transition-colors",
                    "hover:text-cms-black"
                  ),
                  onClick: k,
                  "aria-label": "선택 취소",
                  children: /* @__PURE__ */ w(Jo, { className: "w-3 h-3" })
                }
              ),
              /* @__PURE__ */ w(
                Qo,
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
          className: T(
            "absolute z-50 mt-1 py-1 w-full",
            "rounded-lg border border-cms-gray-400",
            "bg-white shadow-lg",
            a
          ),
          style: { maxHeight: `${m}px` },
          children: [
            c && /* @__PURE__ */ w("div", { className: "px-3 py-2 border-b border-cms-gray-400", children: /* @__PURE__ */ w(
              "input",
              {
                ref: E,
                type: "text",
                value: v,
                onChange: (P) => x(P.target.value),
                placeholder: "검색...",
                className: T(
                  "w-full px-2 py-1 text-sm",
                  "rounded outline-none",
                  "border border-cms-gray-400",
                  "focus:ring-1 focus:ring-cms-black"
                )
              }
            ) }),
            /* @__PURE__ */ w("div", { className: "max-h-48 overflow-y-auto", children: L.length === 0 ? /* @__PURE__ */ w("div", { className: "px-3 py-2 text-sm text-cms-gray-400 text-center", children: v ? "검색 결과가 없습니다" : "옵션이 없습니다" }) : L.map((P) => {
              const D = f ? y.includes(P.value) : t === P.value;
              return /* @__PURE__ */ U(
                "button",
                {
                  type: "button",
                  className: T(
                    "flex items-center justify-between gap-2",
                    "w-full px-3 py-2 ",
                    "text-left text-sm",
                    "transition-colors",
                    P.disabled ? "text-cms-gray-400 cursor-not-allowed" : "text-cms-black hover:bg-cms-gray-200 cursor-pointer",
                    D && "bg-cms-gray-400 font-medium"
                  ),
                  onClick: () => F(P),
                  disabled: P.disabled,
                  children: [
                    /* @__PURE__ */ w("span", { className: "truncate", children: P.label }),
                    D && /* @__PURE__ */ w(
                      "svg",
                      {
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "16",
                        height: "16",
                        viewBox: "0 0 16 16",
                        fill: "none",
                        className: "w-4 h-4 text-black shrink-0",
                        children: /* @__PURE__ */ w(
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
Nt.displayName = "Dropdown";
const es = Ee(
  ({ label: e, helperText: t, error: n, required: r, className: o, ...s }, a) => /* @__PURE__ */ U("div", { className: T("space-y-1", o), children: [
    e && /* @__PURE__ */ U("label", { className: "block text-sm font-medium text-cms-black", children: [
      e,
      r && /* @__PURE__ */ w("span", { className: "text-cms-red-500 ml-1", children: "*" })
    ] }),
    /* @__PURE__ */ w(
      Nt,
      {
        ref: a,
        ...s,
        className: T(n && "border-cms-red-500 focus:ring-cms-red-500")
      }
    ),
    (t || n) && /* @__PURE__ */ w(
      "p",
      {
        className: T(
          "text-xs",
          n ? "text-cms-red-500" : "text-cms-gray-400"
        ),
        children: n || t
      }
    )
  ] })
);
es.displayName = "Select";
const ts = Ee(
  ({ options: e, loading: t = !1, createable: n = !1, onCreateOption: r, ...o }, s) => {
    const [a] = Me(""), i = e.filter(
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
    return /* @__PURE__ */ w(
      Nt,
      {
        ref: s,
        ...o,
        options: c,
        searchable: !0,
        dropdownClassName: T(t && "opacity-75", o.dropdownClassName),
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
ts.displayName = "Combobox";
function Zc(e) {
  return /* @__PURE__ */ w(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "20",
      height: "20",
      viewBox: "0 0 20 20",
      fill: "none",
      ...e,
      children: /* @__PURE__ */ w(
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
function V(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(o) {
    if (e == null || e(o), n === !1 || !o.defaultPrevented)
      return t == null ? void 0 : t(o);
  };
}
function en(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function In(...e) {
  return (t) => {
    let n = !1;
    const r = e.map((o) => {
      const s = en(o, t);
      return !n && typeof s == "function" && (n = !0), s;
    });
    if (n)
      return () => {
        for (let o = 0; o < r.length; o++) {
          const s = r[o];
          typeof s == "function" ? s() : en(e[o], null);
        }
      };
  };
}
function j(...e) {
  return d.useCallback(In(...e), e);
}
function ge(e, t = []) {
  let n = [];
  function r(s, a) {
    const i = d.createContext(a), u = n.length;
    n = [...n, a];
    const c = (f) => {
      var v;
      const { scope: m, children: h, ...b } = f, p = ((v = m == null ? void 0 : m[e]) == null ? void 0 : v[u]) || i, g = d.useMemo(() => b, Object.values(b));
      return /* @__PURE__ */ w(p.Provider, { value: g, children: h });
    };
    c.displayName = s + "Provider";
    function l(f, m) {
      var p;
      const h = ((p = m == null ? void 0 : m[e]) == null ? void 0 : p[u]) || i, b = d.useContext(h);
      if (b) return b;
      if (a !== void 0) return a;
      throw new Error(`\`${f}\` must be used within \`${s}\``);
    }
    return [c, l];
  }
  const o = () => {
    const s = n.map((a) => d.createContext(a));
    return function(i) {
      const u = (i == null ? void 0 : i[e]) || s;
      return d.useMemo(
        () => ({ [`__scope${e}`]: { ...i, [e]: u } }),
        [i, u]
      );
    };
  };
  return o.scopeName = e, [r, ns(o, ...t)];
}
function ns(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((o) => ({
      useScope: o(),
      scopeName: o.scopeName
    }));
    return function(s) {
      const a = r.reduce((i, { useScope: u, scopeName: c }) => {
        const f = u(s)[`__scope${c}`];
        return { ...i, ...f };
      }, {});
      return d.useMemo(() => ({ [`__scope${t.scopeName}`]: a }), [a]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
// @__NO_SIDE_EFFECTS__
function Ye(e) {
  const t = /* @__PURE__ */ rs(e), n = d.forwardRef((r, o) => {
    const { children: s, ...a } = r, i = d.Children.toArray(s), u = i.find(ss);
    if (u) {
      const c = u.props.children, l = i.map((f) => f === u ? d.Children.count(c) > 1 ? d.Children.only(null) : d.isValidElement(c) ? c.props.children : null : f);
      return /* @__PURE__ */ w(t, { ...a, ref: o, children: d.isValidElement(c) ? d.cloneElement(c, void 0, l) : null });
    }
    return /* @__PURE__ */ w(t, { ...a, ref: o, children: s });
  });
  return n.displayName = `${e}.Slot`, n;
}
// @__NO_SIDE_EFFECTS__
function rs(e) {
  const t = d.forwardRef((n, r) => {
    const { children: o, ...s } = n;
    if (d.isValidElement(o)) {
      const a = as(o), i = is(s, o.props);
      return o.type !== d.Fragment && (i.ref = r ? In(r, a) : a), d.cloneElement(o, i);
    }
    return d.Children.count(o) > 1 ? d.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var os = Symbol("radix.slottable");
function ss(e) {
  return d.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === os;
}
function is(e, t) {
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
function as(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var cs = [
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
], G = cs.reduce((e, t) => {
  const n = /* @__PURE__ */ Ye(`Primitive.${t}`), r = d.forwardRef((o, s) => {
    const { asChild: a, ...i } = o, u = a ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ w(u, { ...i, ref: s });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {});
function ls(e, t) {
  e && En.flushSync(() => e.dispatchEvent(t));
}
function me(e) {
  const t = d.useRef(e);
  return d.useEffect(() => {
    t.current = e;
  }), d.useMemo(() => (...n) => {
    var r;
    return (r = t.current) == null ? void 0 : r.call(t, ...n);
  }, []);
}
function us(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = me(e);
  d.useEffect(() => {
    const r = (o) => {
      o.key === "Escape" && n(o);
    };
    return t.addEventListener("keydown", r, { capture: !0 }), () => t.removeEventListener("keydown", r, { capture: !0 });
  }, [n, t]);
}
var ds = "DismissableLayer", Ct = "dismissableLayer.update", fs = "dismissableLayer.pointerDownOutside", ps = "dismissableLayer.focusOutside", tn, Ln = d.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), _n = d.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: r,
      onPointerDownOutside: o,
      onFocusOutside: s,
      onInteractOutside: a,
      onDismiss: i,
      ...u
    } = e, c = d.useContext(Ln), [l, f] = d.useState(null), m = (l == null ? void 0 : l.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), [, h] = d.useState({}), b = j(t, (S) => f(S)), p = Array.from(c.layers), [g] = [...c.layersWithOutsidePointerEventsDisabled].slice(-1), v = p.indexOf(g), x = l ? p.indexOf(l) : -1, y = c.layersWithOutsidePointerEventsDisabled.size > 0, C = x >= v, R = gs((S) => {
      const A = S.target, L = [...c.branches].some((I) => I.contains(A));
      !C || L || (o == null || o(S), a == null || a(S), S.defaultPrevented || i == null || i());
    }, m), E = vs((S) => {
      const A = S.target;
      [...c.branches].some((I) => I.contains(A)) || (s == null || s(S), a == null || a(S), S.defaultPrevented || i == null || i());
    }, m);
    return us((S) => {
      x === c.layers.size - 1 && (r == null || r(S), !S.defaultPrevented && i && (S.preventDefault(), i()));
    }, m), d.useEffect(() => {
      if (l)
        return n && (c.layersWithOutsidePointerEventsDisabled.size === 0 && (tn = m.body.style.pointerEvents, m.body.style.pointerEvents = "none"), c.layersWithOutsidePointerEventsDisabled.add(l)), c.layers.add(l), nn(), () => {
          n && c.layersWithOutsidePointerEventsDisabled.size === 1 && (m.body.style.pointerEvents = tn);
        };
    }, [l, m, n, c]), d.useEffect(() => () => {
      l && (c.layers.delete(l), c.layersWithOutsidePointerEventsDisabled.delete(l), nn());
    }, [l, c]), d.useEffect(() => {
      const S = () => h({});
      return document.addEventListener(Ct, S), () => document.removeEventListener(Ct, S);
    }, []), /* @__PURE__ */ w(
      G.div,
      {
        ...u,
        ref: b,
        style: {
          pointerEvents: y ? C ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: V(e.onFocusCapture, E.onFocusCapture),
        onBlurCapture: V(e.onBlurCapture, E.onBlurCapture),
        onPointerDownCapture: V(
          e.onPointerDownCapture,
          R.onPointerDownCapture
        )
      }
    );
  }
);
_n.displayName = ds;
var ms = "DismissableLayerBranch", hs = d.forwardRef((e, t) => {
  const n = d.useContext(Ln), r = d.useRef(null), o = j(t, r);
  return d.useEffect(() => {
    const s = r.current;
    if (s)
      return n.branches.add(s), () => {
        n.branches.delete(s);
      };
  }, [n.branches]), /* @__PURE__ */ w(G.div, { ...e, ref: o });
});
hs.displayName = ms;
function gs(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = me(e), r = d.useRef(!1), o = d.useRef(() => {
  });
  return d.useEffect(() => {
    const s = (i) => {
      if (i.target && !r.current) {
        let u = function() {
          Dn(
            fs,
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
function vs(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = me(e), r = d.useRef(!1);
  return d.useEffect(() => {
    const o = (s) => {
      s.target && !r.current && Dn(ps, n, { originalEvent: s }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o);
  }, [t, n]), {
    onFocusCapture: () => r.current = !0,
    onBlurCapture: () => r.current = !1
  };
}
function nn() {
  const e = new CustomEvent(Ct);
  document.dispatchEvent(e);
}
function Dn(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target, s = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && o.addEventListener(e, t, { once: !0 }), r ? ls(o, s) : o.dispatchEvent(s);
}
var dt = 0;
function bs() {
  d.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? rn()), document.body.insertAdjacentElement("beforeend", e[1] ?? rn()), dt++, () => {
      dt === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), dt--;
    };
  }, []);
}
function rn() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var ft = "focusScope.autoFocusOnMount", pt = "focusScope.autoFocusOnUnmount", on = { bubbles: !1, cancelable: !0 }, ys = "FocusScope", Fn = d.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: r = !1,
    onMountAutoFocus: o,
    onUnmountAutoFocus: s,
    ...a
  } = e, [i, u] = d.useState(null), c = me(o), l = me(s), f = d.useRef(null), m = j(t, (p) => u(p)), h = d.useRef({
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
      let p = function(y) {
        if (h.paused || !i) return;
        const C = y.target;
        i.contains(C) ? f.current = C : le(f.current, { select: !0 });
      }, g = function(y) {
        if (h.paused || !i) return;
        const C = y.relatedTarget;
        C !== null && (i.contains(C) || le(f.current, { select: !0 }));
      }, v = function(y) {
        if (document.activeElement === document.body)
          for (const R of y)
            R.removedNodes.length > 0 && le(i);
      };
      document.addEventListener("focusin", p), document.addEventListener("focusout", g);
      const x = new MutationObserver(v);
      return i && x.observe(i, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", p), document.removeEventListener("focusout", g), x.disconnect();
      };
    }
  }, [r, i, h.paused]), d.useEffect(() => {
    if (i) {
      an.add(h);
      const p = document.activeElement;
      if (!i.contains(p)) {
        const v = new CustomEvent(ft, on);
        i.addEventListener(ft, c), i.dispatchEvent(v), v.defaultPrevented || (ws(Es(Wn(i)), { select: !0 }), document.activeElement === p && le(i));
      }
      return () => {
        i.removeEventListener(ft, c), setTimeout(() => {
          const v = new CustomEvent(pt, on);
          i.addEventListener(pt, l), i.dispatchEvent(v), v.defaultPrevented || le(p ?? document.body, { select: !0 }), i.removeEventListener(pt, l), an.remove(h);
        }, 0);
      };
    }
  }, [i, c, l, h]);
  const b = d.useCallback(
    (p) => {
      if (!n && !r || h.paused) return;
      const g = p.key === "Tab" && !p.altKey && !p.ctrlKey && !p.metaKey, v = document.activeElement;
      if (g && v) {
        const x = p.currentTarget, [y, C] = xs(x);
        y && C ? !p.shiftKey && v === C ? (p.preventDefault(), n && le(y, { select: !0 })) : p.shiftKey && v === y && (p.preventDefault(), n && le(C, { select: !0 })) : v === x && p.preventDefault();
      }
    },
    [n, r, h.paused]
  );
  return /* @__PURE__ */ w(G.div, { tabIndex: -1, ...a, ref: m, onKeyDown: b });
});
Fn.displayName = ys;
function ws(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if (le(r, { select: t }), document.activeElement !== n) return;
}
function xs(e) {
  const t = Wn(e), n = sn(t, e), r = sn(t.reverse(), e);
  return [n, r];
}
function Wn(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function sn(e, t) {
  for (const n of e)
    if (!Cs(n, { upTo: t })) return n;
}
function Cs(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function Rs(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function le(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && Rs(e) && t && e.select();
  }
}
var an = Ss();
function Ss() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && (n == null || n.pause()), e = cn(e, t), e.unshift(t);
    },
    remove(t) {
      var n;
      e = cn(e, t), (n = e[0]) == null || n.resume();
    }
  };
}
function cn(e, t) {
  const n = [...e], r = n.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
function Es(e) {
  return e.filter((t) => t.tagName !== "A");
}
var ue = globalThis != null && globalThis.document ? d.useLayoutEffect : () => {
}, Ps = d[" useId ".trim().toString()] || (() => {
}), As = 0;
function zn(e) {
  const [t, n] = d.useState(Ps());
  return ue(() => {
    n((r) => r ?? String(As++));
  }, [e]), t ? `radix-${t}` : "";
}
const ks = ["top", "right", "bottom", "left"], de = Math.min, Y = Math.max, Xe = Math.round, ze = Math.floor, te = (e) => ({
  x: e,
  y: e
}), Ns = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Os = {
  start: "end",
  end: "start"
};
function Rt(e, t, n) {
  return Y(e, de(t, n));
}
function se(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function ie(e) {
  return e.split("-")[0];
}
function Ae(e) {
  return e.split("-")[1];
}
function Ot(e) {
  return e === "x" ? "y" : "x";
}
function Tt(e) {
  return e === "y" ? "height" : "width";
}
const Ts = /* @__PURE__ */ new Set(["top", "bottom"]);
function ee(e) {
  return Ts.has(ie(e)) ? "y" : "x";
}
function Mt(e) {
  return Ot(ee(e));
}
function Ms(e, t, n) {
  n === void 0 && (n = !1);
  const r = Ae(e), o = Mt(e), s = Tt(o);
  let a = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[s] > t.floating[s] && (a = qe(a)), [a, qe(a)];
}
function Is(e) {
  const t = qe(e);
  return [St(e), t, St(t)];
}
function St(e) {
  return e.replace(/start|end/g, (t) => Os[t]);
}
const ln = ["left", "right"], un = ["right", "left"], Ls = ["top", "bottom"], _s = ["bottom", "top"];
function Ds(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? un : ln : t ? ln : un;
    case "left":
    case "right":
      return t ? Ls : _s;
    default:
      return [];
  }
}
function Fs(e, t, n, r) {
  const o = Ae(e);
  let s = Ds(ie(e), n === "start", r);
  return o && (s = s.map((a) => a + "-" + o), t && (s = s.concat(s.map(St)))), s;
}
function qe(e) {
  return e.replace(/left|right|bottom|top/g, (t) => Ns[t]);
}
function Ws(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Bn(e) {
  return typeof e != "number" ? Ws(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function Ze(e) {
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
function dn(e, t, n) {
  let {
    reference: r,
    floating: o
  } = e;
  const s = ee(t), a = Mt(t), i = Tt(a), u = ie(t), c = s === "y", l = r.x + r.width / 2 - o.width / 2, f = r.y + r.height / 2 - o.height / 2, m = r[i] / 2 - o[i] / 2;
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
  switch (Ae(t)) {
    case "start":
      h[a] -= m * (n && c ? -1 : 1);
      break;
    case "end":
      h[a] += m * (n && c ? -1 : 1);
      break;
  }
  return h;
}
const zs = async (e, t, n) => {
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
    y: f
  } = dn(c, r, u), m = r, h = {}, b = 0;
  for (let p = 0; p < i.length; p++) {
    const {
      name: g,
      fn: v
    } = i[p], {
      x,
      y,
      data: C,
      reset: R
    } = await v({
      x: l,
      y: f,
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
    l = x ?? l, f = y ?? f, h = {
      ...h,
      [g]: {
        ...h[g],
        ...C
      }
    }, R && b <= 50 && (b++, typeof R == "object" && (R.placement && (m = R.placement), R.rects && (c = R.rects === !0 ? await a.getElementRects({
      reference: e,
      floating: t,
      strategy: o
    }) : R.rects), {
      x: l,
      y: f
    } = dn(c, m, u)), p = -1);
  }
  return {
    x: l,
    y: f,
    placement: m,
    strategy: o,
    middlewareData: h
  };
};
async function Ie(e, t) {
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
    elementContext: f = "floating",
    altBoundary: m = !1,
    padding: h = 0
  } = se(t, e), b = Bn(h), g = i[m ? f === "floating" ? "reference" : "floating" : f], v = Ze(await s.getClippingRect({
    element: (n = await (s.isElement == null ? void 0 : s.isElement(g))) == null || n ? g : g.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(i.floating)),
    boundary: c,
    rootBoundary: l,
    strategy: u
  })), x = f === "floating" ? {
    x: r,
    y: o,
    width: a.floating.width,
    height: a.floating.height
  } : a.reference, y = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(i.floating)), C = await (s.isElement == null ? void 0 : s.isElement(y)) ? await (s.getScale == null ? void 0 : s.getScale(y)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, R = Ze(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: i,
    rect: x,
    offsetParent: y,
    strategy: u
  }) : x);
  return {
    top: (v.top - R.top + b.top) / C.y,
    bottom: (R.bottom - v.bottom + b.bottom) / C.y,
    left: (v.left - R.left + b.left) / C.x,
    right: (R.right - v.right + b.right) / C.x
  };
}
const Bs = (e) => ({
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
    } = se(e, t) || {};
    if (c == null)
      return {};
    const f = Bn(l), m = {
      x: n,
      y: r
    }, h = Mt(o), b = Tt(h), p = await a.getDimensions(c), g = h === "y", v = g ? "top" : "left", x = g ? "bottom" : "right", y = g ? "clientHeight" : "clientWidth", C = s.reference[b] + s.reference[h] - m[h] - s.floating[b], R = m[h] - s.reference[h], E = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(c));
    let S = E ? E[y] : 0;
    (!S || !await (a.isElement == null ? void 0 : a.isElement(E))) && (S = i.floating[y] || s.floating[b]);
    const A = C / 2 - R / 2, L = S / 2 - p[b] / 2 - 1, I = de(f[v], L), F = de(f[x], L), k = I, _ = S - p[b] - F, P = S / 2 - p[b] / 2 + A, D = Rt(k, P, _), M = !u.arrow && Ae(o) != null && P !== D && s.reference[b] / 2 - (P < k ? I : F) - p[b] / 2 < 0, z = M ? P < k ? P - k : P - _ : 0;
    return {
      [h]: m[h] + z,
      data: {
        [h]: D,
        centerOffset: P - D - z,
        ...M && {
          alignmentOffset: z
        }
      },
      reset: M
    };
  }
}), $s = function(e) {
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
        crossAxis: f = !0,
        fallbackPlacements: m,
        fallbackStrategy: h = "bestFit",
        fallbackAxisSideDirection: b = "none",
        flipAlignment: p = !0,
        ...g
      } = se(e, t);
      if ((n = s.arrow) != null && n.alignmentOffset)
        return {};
      const v = ie(o), x = ee(i), y = ie(i) === i, C = await (u.isRTL == null ? void 0 : u.isRTL(c.floating)), R = m || (y || !p ? [qe(i)] : Is(i)), E = b !== "none";
      !m && E && R.push(...Fs(i, p, b, C));
      const S = [i, ...R], A = await Ie(t, g), L = [];
      let I = ((r = s.flip) == null ? void 0 : r.overflows) || [];
      if (l && L.push(A[v]), f) {
        const P = Ms(o, a, C);
        L.push(A[P[0]], A[P[1]]);
      }
      if (I = [...I, {
        placement: o,
        overflows: L
      }], !L.every((P) => P <= 0)) {
        var F, k;
        const P = (((F = s.flip) == null ? void 0 : F.index) || 0) + 1, D = S[P];
        if (D && (!(f === "alignment" ? x !== ee(D) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        I.every((O) => ee(O.placement) === x ? O.overflows[0] > 0 : !0)))
          return {
            data: {
              index: P,
              overflows: I
            },
            reset: {
              placement: D
            }
          };
        let M = (k = I.filter((z) => z.overflows[0] <= 0).sort((z, O) => z.overflows[1] - O.overflows[1])[0]) == null ? void 0 : k.placement;
        if (!M)
          switch (h) {
            case "bestFit": {
              var _;
              const z = (_ = I.filter((O) => {
                if (E) {
                  const B = ee(O.placement);
                  return B === x || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  B === "y";
                }
                return !0;
              }).map((O) => [O.placement, O.overflows.filter((B) => B > 0).reduce((B, K) => B + K, 0)]).sort((O, B) => O[1] - B[1])[0]) == null ? void 0 : _[0];
              z && (M = z);
              break;
            }
            case "initialPlacement":
              M = i;
              break;
          }
        if (o !== M)
          return {
            reset: {
              placement: M
            }
          };
      }
      return {};
    }
  };
};
function fn(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function pn(e) {
  return ks.some((t) => e[t] >= 0);
}
const Vs = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n
      } = t, {
        strategy: r = "referenceHidden",
        ...o
      } = se(e, t);
      switch (r) {
        case "referenceHidden": {
          const s = await Ie(t, {
            ...o,
            elementContext: "reference"
          }), a = fn(s, n.reference);
          return {
            data: {
              referenceHiddenOffsets: a,
              referenceHidden: pn(a)
            }
          };
        }
        case "escaped": {
          const s = await Ie(t, {
            ...o,
            altBoundary: !0
          }), a = fn(s, n.floating);
          return {
            data: {
              escapedOffsets: a,
              escaped: pn(a)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, $n = /* @__PURE__ */ new Set(["left", "top"]);
async function Gs(e, t) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = e, s = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), a = ie(n), i = Ae(n), u = ee(n) === "y", c = $n.has(a) ? -1 : 1, l = s && u ? -1 : 1, f = se(t, e);
  let {
    mainAxis: m,
    crossAxis: h,
    alignmentAxis: b
  } = typeof f == "number" ? {
    mainAxis: f,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: f.mainAxis || 0,
    crossAxis: f.crossAxis || 0,
    alignmentAxis: f.alignmentAxis
  };
  return i && typeof b == "number" && (h = i === "end" ? b * -1 : b), u ? {
    x: h * l,
    y: m * c
  } : {
    x: m * c,
    y: h * l
  };
}
const js = function(e) {
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
      } = t, u = await Gs(t, e);
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
}, Us = function(e) {
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
              y: x
            } = g;
            return {
              x: v,
              y: x
            };
          }
        },
        ...u
      } = se(e, t), c = {
        x: n,
        y: r
      }, l = await Ie(t, u), f = ee(ie(o)), m = Ot(f);
      let h = c[m], b = c[f];
      if (s) {
        const g = m === "y" ? "top" : "left", v = m === "y" ? "bottom" : "right", x = h + l[g], y = h - l[v];
        h = Rt(x, h, y);
      }
      if (a) {
        const g = f === "y" ? "top" : "left", v = f === "y" ? "bottom" : "right", x = b + l[g], y = b - l[v];
        b = Rt(x, b, y);
      }
      const p = i.fn({
        ...t,
        [m]: h,
        [f]: b
      });
      return {
        ...p,
        data: {
          x: p.x - n,
          y: p.y - r,
          enabled: {
            [m]: s,
            [f]: a
          }
        }
      };
    }
  };
}, Hs = function(e) {
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
      } = se(e, t), l = {
        x: n,
        y: r
      }, f = ee(o), m = Ot(f);
      let h = l[m], b = l[f];
      const p = se(i, t), g = typeof p == "number" ? {
        mainAxis: p,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...p
      };
      if (u) {
        const y = m === "y" ? "height" : "width", C = s.reference[m] - s.floating[y] + g.mainAxis, R = s.reference[m] + s.reference[y] - g.mainAxis;
        h < C ? h = C : h > R && (h = R);
      }
      if (c) {
        var v, x;
        const y = m === "y" ? "width" : "height", C = $n.has(ie(o)), R = s.reference[f] - s.floating[y] + (C && ((v = a.offset) == null ? void 0 : v[f]) || 0) + (C ? 0 : g.crossAxis), E = s.reference[f] + s.reference[y] + (C ? 0 : ((x = a.offset) == null ? void 0 : x[f]) || 0) - (C ? g.crossAxis : 0);
        b < R ? b = R : b > E && (b = E);
      }
      return {
        [m]: h,
        [f]: b
      };
    }
  };
}, Ks = function(e) {
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
      } = se(e, t), l = await Ie(t, c), f = ie(o), m = Ae(o), h = ee(o) === "y", {
        width: b,
        height: p
      } = s.floating;
      let g, v;
      f === "top" || f === "bottom" ? (g = f, v = m === (await (a.isRTL == null ? void 0 : a.isRTL(i.floating)) ? "start" : "end") ? "left" : "right") : (v = f, g = m === "end" ? "top" : "bottom");
      const x = p - l.top - l.bottom, y = b - l.left - l.right, C = de(p - l[g], x), R = de(b - l[v], y), E = !t.middlewareData.shift;
      let S = C, A = R;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (A = y), (r = t.middlewareData.shift) != null && r.enabled.y && (S = x), E && !m) {
        const I = Y(l.left, 0), F = Y(l.right, 0), k = Y(l.top, 0), _ = Y(l.bottom, 0);
        h ? A = b - 2 * (I !== 0 || F !== 0 ? I + F : Y(l.left, l.right)) : S = p - 2 * (k !== 0 || _ !== 0 ? k + _ : Y(l.top, l.bottom));
      }
      await u({
        ...t,
        availableWidth: A,
        availableHeight: S
      });
      const L = await a.getDimensions(i.floating);
      return b !== L.width || p !== L.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function et() {
  return typeof window < "u";
}
function ke(e) {
  return Vn(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function X(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function re(e) {
  var t;
  return (t = (Vn(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Vn(e) {
  return et() ? e instanceof Node || e instanceof X(e).Node : !1;
}
function q(e) {
  return et() ? e instanceof Element || e instanceof X(e).Element : !1;
}
function ne(e) {
  return et() ? e instanceof HTMLElement || e instanceof X(e).HTMLElement : !1;
}
function mn(e) {
  return !et() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof X(e).ShadowRoot;
}
const Ys = /* @__PURE__ */ new Set(["inline", "contents"]);
function _e(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: o
  } = Z(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !Ys.has(o);
}
const Xs = /* @__PURE__ */ new Set(["table", "td", "th"]);
function qs(e) {
  return Xs.has(ke(e));
}
const Zs = [":popover-open", ":modal"];
function tt(e) {
  return Zs.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const Qs = ["transform", "translate", "scale", "rotate", "perspective"], Js = ["transform", "translate", "scale", "rotate", "perspective", "filter"], ei = ["paint", "layout", "strict", "content"];
function It(e) {
  const t = Lt(), n = q(e) ? Z(e) : e;
  return Qs.some((r) => n[r] ? n[r] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || Js.some((r) => (n.willChange || "").includes(r)) || ei.some((r) => (n.contain || "").includes(r));
}
function ti(e) {
  let t = fe(e);
  for (; ne(t) && !Re(t); ) {
    if (It(t))
      return t;
    if (tt(t))
      return null;
    t = fe(t);
  }
  return null;
}
function Lt() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const ni = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function Re(e) {
  return ni.has(ke(e));
}
function Z(e) {
  return X(e).getComputedStyle(e);
}
function nt(e) {
  return q(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function fe(e) {
  if (ke(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    mn(e) && e.host || // Fallback.
    re(e)
  );
  return mn(t) ? t.host : t;
}
function Gn(e) {
  const t = fe(e);
  return Re(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : ne(t) && _e(t) ? t : Gn(t);
}
function Le(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = Gn(e), s = o === ((r = e.ownerDocument) == null ? void 0 : r.body), a = X(o);
  if (s) {
    const i = Et(a);
    return t.concat(a, a.visualViewport || [], _e(o) ? o : [], i && n ? Le(i) : []);
  }
  return t.concat(o, Le(o, [], n));
}
function Et(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function jn(e) {
  const t = Z(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const o = ne(e), s = o ? e.offsetWidth : n, a = o ? e.offsetHeight : r, i = Xe(n) !== s || Xe(r) !== a;
  return i && (n = s, r = a), {
    width: n,
    height: r,
    $: i
  };
}
function _t(e) {
  return q(e) ? e : e.contextElement;
}
function xe(e) {
  const t = _t(e);
  if (!ne(t))
    return te(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: o,
    $: s
  } = jn(t);
  let a = (s ? Xe(n.width) : n.width) / r, i = (s ? Xe(n.height) : n.height) / o;
  return (!a || !Number.isFinite(a)) && (a = 1), (!i || !Number.isFinite(i)) && (i = 1), {
    x: a,
    y: i
  };
}
const ri = /* @__PURE__ */ te(0);
function Un(e) {
  const t = X(e);
  return !Lt() || !t.visualViewport ? ri : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function oi(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== X(e) ? !1 : t;
}
function he(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), s = _t(e);
  let a = te(1);
  t && (r ? q(r) && (a = xe(r)) : a = xe(e));
  const i = oi(s, n, r) ? Un(s) : te(0);
  let u = (o.left + i.x) / a.x, c = (o.top + i.y) / a.y, l = o.width / a.x, f = o.height / a.y;
  if (s) {
    const m = X(s), h = r && q(r) ? X(r) : r;
    let b = m, p = Et(b);
    for (; p && r && h !== b; ) {
      const g = xe(p), v = p.getBoundingClientRect(), x = Z(p), y = v.left + (p.clientLeft + parseFloat(x.paddingLeft)) * g.x, C = v.top + (p.clientTop + parseFloat(x.paddingTop)) * g.y;
      u *= g.x, c *= g.y, l *= g.x, f *= g.y, u += y, c += C, b = X(p), p = Et(b);
    }
  }
  return Ze({
    width: l,
    height: f,
    x: u,
    y: c
  });
}
function rt(e, t) {
  const n = nt(e).scrollLeft;
  return t ? t.left + n : he(re(e)).left + n;
}
function Hn(e, t) {
  const n = e.getBoundingClientRect(), r = n.left + t.scrollLeft - rt(e, n), o = n.top + t.scrollTop;
  return {
    x: r,
    y: o
  };
}
function si(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: r,
    strategy: o
  } = e;
  const s = o === "fixed", a = re(r), i = t ? tt(t.floating) : !1;
  if (r === a || i && s)
    return n;
  let u = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = te(1);
  const l = te(0), f = ne(r);
  if ((f || !f && !s) && ((ke(r) !== "body" || _e(a)) && (u = nt(r)), ne(r))) {
    const h = he(r);
    c = xe(r), l.x = h.x + r.clientLeft, l.y = h.y + r.clientTop;
  }
  const m = a && !f && !s ? Hn(a, u) : te(0);
  return {
    width: n.width * c.x,
    height: n.height * c.y,
    x: n.x * c.x - u.scrollLeft * c.x + l.x + m.x,
    y: n.y * c.y - u.scrollTop * c.y + l.y + m.y
  };
}
function ii(e) {
  return Array.from(e.getClientRects());
}
function ai(e) {
  const t = re(e), n = nt(e), r = e.ownerDocument.body, o = Y(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), s = Y(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let a = -n.scrollLeft + rt(e);
  const i = -n.scrollTop;
  return Z(r).direction === "rtl" && (a += Y(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: s,
    x: a,
    y: i
  };
}
const hn = 25;
function ci(e, t) {
  const n = X(e), r = re(e), o = n.visualViewport;
  let s = r.clientWidth, a = r.clientHeight, i = 0, u = 0;
  if (o) {
    s = o.width, a = o.height;
    const l = Lt();
    (!l || l && t === "fixed") && (i = o.offsetLeft, u = o.offsetTop);
  }
  const c = rt(r);
  if (c <= 0) {
    const l = r.ownerDocument, f = l.body, m = getComputedStyle(f), h = l.compatMode === "CSS1Compat" && parseFloat(m.marginLeft) + parseFloat(m.marginRight) || 0, b = Math.abs(r.clientWidth - f.clientWidth - h);
    b <= hn && (s -= b);
  } else c <= hn && (s += c);
  return {
    width: s,
    height: a,
    x: i,
    y: u
  };
}
const li = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function ui(e, t) {
  const n = he(e, !0, t === "fixed"), r = n.top + e.clientTop, o = n.left + e.clientLeft, s = ne(e) ? xe(e) : te(1), a = e.clientWidth * s.x, i = e.clientHeight * s.y, u = o * s.x, c = r * s.y;
  return {
    width: a,
    height: i,
    x: u,
    y: c
  };
}
function gn(e, t, n) {
  let r;
  if (t === "viewport")
    r = ci(e, n);
  else if (t === "document")
    r = ai(re(e));
  else if (q(t))
    r = ui(t, n);
  else {
    const o = Un(e);
    r = {
      x: t.x - o.x,
      y: t.y - o.y,
      width: t.width,
      height: t.height
    };
  }
  return Ze(r);
}
function Kn(e, t) {
  const n = fe(e);
  return n === t || !q(n) || Re(n) ? !1 : Z(n).position === "fixed" || Kn(n, t);
}
function di(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = Le(e, [], !1).filter((i) => q(i) && ke(i) !== "body"), o = null;
  const s = Z(e).position === "fixed";
  let a = s ? fe(e) : e;
  for (; q(a) && !Re(a); ) {
    const i = Z(a), u = It(a);
    !u && i.position === "fixed" && (o = null), (s ? !u && !o : !u && i.position === "static" && !!o && li.has(o.position) || _e(a) && !u && Kn(e, a)) ? r = r.filter((l) => l !== a) : o = i, a = fe(a);
  }
  return t.set(e, r), r;
}
function fi(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = e;
  const a = [...n === "clippingAncestors" ? tt(t) ? [] : di(t, this._c) : [].concat(n), r], i = a[0], u = a.reduce((c, l) => {
    const f = gn(t, l, o);
    return c.top = Y(f.top, c.top), c.right = de(f.right, c.right), c.bottom = de(f.bottom, c.bottom), c.left = Y(f.left, c.left), c;
  }, gn(t, i, o));
  return {
    width: u.right - u.left,
    height: u.bottom - u.top,
    x: u.left,
    y: u.top
  };
}
function pi(e) {
  const {
    width: t,
    height: n
  } = jn(e);
  return {
    width: t,
    height: n
  };
}
function mi(e, t, n) {
  const r = ne(t), o = re(t), s = n === "fixed", a = he(e, !0, s, t);
  let i = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const u = te(0);
  function c() {
    u.x = rt(o);
  }
  if (r || !r && !s)
    if ((ke(t) !== "body" || _e(o)) && (i = nt(t)), r) {
      const h = he(t, !0, s, t);
      u.x = h.x + t.clientLeft, u.y = h.y + t.clientTop;
    } else o && c();
  s && !r && o && c();
  const l = o && !r && !s ? Hn(o, i) : te(0), f = a.left + i.scrollLeft - u.x - l.x, m = a.top + i.scrollTop - u.y - l.y;
  return {
    x: f,
    y: m,
    width: a.width,
    height: a.height
  };
}
function mt(e) {
  return Z(e).position === "static";
}
function vn(e, t) {
  if (!ne(e) || Z(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return re(e) === n && (n = n.ownerDocument.body), n;
}
function Yn(e, t) {
  const n = X(e);
  if (tt(e))
    return n;
  if (!ne(e)) {
    let o = fe(e);
    for (; o && !Re(o); ) {
      if (q(o) && !mt(o))
        return o;
      o = fe(o);
    }
    return n;
  }
  let r = vn(e, t);
  for (; r && qs(r) && mt(r); )
    r = vn(r, t);
  return r && Re(r) && mt(r) && !It(r) ? n : r || ti(e) || n;
}
const hi = async function(e) {
  const t = this.getOffsetParent || Yn, n = this.getDimensions, r = await n(e.floating);
  return {
    reference: mi(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function gi(e) {
  return Z(e).direction === "rtl";
}
const vi = {
  convertOffsetParentRelativeRectToViewportRelativeRect: si,
  getDocumentElement: re,
  getClippingRect: fi,
  getOffsetParent: Yn,
  getElementRects: hi,
  getClientRects: ii,
  getDimensions: pi,
  getScale: xe,
  isElement: q,
  isRTL: gi
};
function Xn(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function bi(e, t) {
  let n = null, r;
  const o = re(e);
  function s() {
    var i;
    clearTimeout(r), (i = n) == null || i.disconnect(), n = null;
  }
  function a(i, u) {
    i === void 0 && (i = !1), u === void 0 && (u = 1), s();
    const c = e.getBoundingClientRect(), {
      left: l,
      top: f,
      width: m,
      height: h
    } = c;
    if (i || t(), !m || !h)
      return;
    const b = ze(f), p = ze(o.clientWidth - (l + m)), g = ze(o.clientHeight - (f + h)), v = ze(l), y = {
      rootMargin: -b + "px " + -p + "px " + -g + "px " + -v + "px",
      threshold: Y(0, de(1, u)) || 1
    };
    let C = !0;
    function R(E) {
      const S = E[0].intersectionRatio;
      if (S !== u) {
        if (!C)
          return a();
        S ? a(!1, S) : r = setTimeout(() => {
          a(!1, 1e-7);
        }, 1e3);
      }
      S === 1 && !Xn(c, e.getBoundingClientRect()) && a(), C = !1;
    }
    try {
      n = new IntersectionObserver(R, {
        ...y,
        // Handle <iframe>s
        root: o.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(R, y);
    }
    n.observe(e);
  }
  return a(!0), s;
}
function yi(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: s = !0,
    elementResize: a = typeof ResizeObserver == "function",
    layoutShift: i = typeof IntersectionObserver == "function",
    animationFrame: u = !1
  } = r, c = _t(e), l = o || s ? [...c ? Le(c) : [], ...Le(t)] : [];
  l.forEach((v) => {
    o && v.addEventListener("scroll", n, {
      passive: !0
    }), s && v.addEventListener("resize", n);
  });
  const f = c && i ? bi(c, n) : null;
  let m = -1, h = null;
  a && (h = new ResizeObserver((v) => {
    let [x] = v;
    x && x.target === c && h && (h.unobserve(t), cancelAnimationFrame(m), m = requestAnimationFrame(() => {
      var y;
      (y = h) == null || y.observe(t);
    })), n();
  }), c && !u && h.observe(c), h.observe(t));
  let b, p = u ? he(e) : null;
  u && g();
  function g() {
    const v = he(e);
    p && !Xn(p, v) && n(), p = v, b = requestAnimationFrame(g);
  }
  return n(), () => {
    var v;
    l.forEach((x) => {
      o && x.removeEventListener("scroll", n), s && x.removeEventListener("resize", n);
    }), f == null || f(), (v = h) == null || v.disconnect(), h = null, u && cancelAnimationFrame(b);
  };
}
const wi = js, xi = Us, Ci = $s, Ri = Ks, Si = Vs, bn = Bs, Ei = Hs, Pi = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: vi,
    ...n
  }, s = {
    ...o.platform,
    _c: r
  };
  return zs(e, t, {
    ...o,
    platform: s
  });
};
var Ai = typeof document < "u", ki = function() {
}, Ue = Ai ? mo : ki;
function Qe(e, t) {
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
        if (!Qe(e[r], t[r]))
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
      if (!(s === "_owner" && e.$$typeof) && !Qe(e[s], t[s]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function qn(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function yn(e, t) {
  const n = qn(e);
  return Math.round(t * n) / n;
}
function ht(e) {
  const t = d.useRef(e);
  return Ue(() => {
    t.current = e;
  }), t;
}
function Ni(e) {
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
  } = e, [l, f] = d.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [m, h] = d.useState(r);
  Qe(m, r) || h(r);
  const [b, p] = d.useState(null), [g, v] = d.useState(null), x = d.useCallback((O) => {
    O !== E.current && (E.current = O, p(O));
  }, []), y = d.useCallback((O) => {
    O !== S.current && (S.current = O, v(O));
  }, []), C = s || b, R = a || g, E = d.useRef(null), S = d.useRef(null), A = d.useRef(l), L = u != null, I = ht(u), F = ht(o), k = ht(c), _ = d.useCallback(() => {
    if (!E.current || !S.current)
      return;
    const O = {
      placement: t,
      strategy: n,
      middleware: m
    };
    F.current && (O.platform = F.current), Pi(E.current, S.current, O).then((B) => {
      const K = {
        ...B,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: k.current !== !1
      };
      P.current && !Qe(A.current, K) && (A.current = K, En.flushSync(() => {
        f(K);
      }));
    });
  }, [m, t, n, F, k]);
  Ue(() => {
    c === !1 && A.current.isPositioned && (A.current.isPositioned = !1, f((O) => ({
      ...O,
      isPositioned: !1
    })));
  }, [c]);
  const P = d.useRef(!1);
  Ue(() => (P.current = !0, () => {
    P.current = !1;
  }), []), Ue(() => {
    if (C && (E.current = C), R && (S.current = R), C && R) {
      if (I.current)
        return I.current(C, R, _);
      _();
    }
  }, [C, R, _, I, L]);
  const D = d.useMemo(() => ({
    reference: E,
    floating: S,
    setReference: x,
    setFloating: y
  }), [x, y]), M = d.useMemo(() => ({
    reference: C,
    floating: R
  }), [C, R]), z = d.useMemo(() => {
    const O = {
      position: n,
      left: 0,
      top: 0
    };
    if (!M.floating)
      return O;
    const B = yn(M.floating, l.x), K = yn(M.floating, l.y);
    return i ? {
      ...O,
      transform: "translate(" + B + "px, " + K + "px)",
      ...qn(M.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: B,
      top: K
    };
  }, [n, i, M.floating, l.x, l.y]);
  return d.useMemo(() => ({
    ...l,
    update: _,
    refs: D,
    elements: M,
    floatingStyles: z
  }), [l, _, D, M, z]);
}
const Oi = (e) => {
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
      return r && t(r) ? r.current != null ? bn({
        element: r.current,
        padding: o
      }).fn(n) : {} : r ? bn({
        element: r,
        padding: o
      }).fn(n) : {};
    }
  };
}, Ti = (e, t) => ({
  ...wi(e),
  options: [e, t]
}), Mi = (e, t) => ({
  ...xi(e),
  options: [e, t]
}), Ii = (e, t) => ({
  ...Ei(e),
  options: [e, t]
}), Li = (e, t) => ({
  ...Ci(e),
  options: [e, t]
}), _i = (e, t) => ({
  ...Ri(e),
  options: [e, t]
}), Di = (e, t) => ({
  ...Si(e),
  options: [e, t]
}), Fi = (e, t) => ({
  ...Oi(e),
  options: [e, t]
});
var Wi = "Arrow", Zn = d.forwardRef((e, t) => {
  const { children: n, width: r = 10, height: o = 5, ...s } = e;
  return /* @__PURE__ */ w(
    G.svg,
    {
      ...s,
      ref: t,
      width: r,
      height: o,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? n : /* @__PURE__ */ w("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
Zn.displayName = Wi;
var zi = Zn;
function Dt(e) {
  const [t, n] = d.useState(void 0);
  return ue(() => {
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
var Ft = "Popper", [Qn, Jn] = ge(Ft), [Bi, er] = Qn(Ft), tr = (e) => {
  const { __scopePopper: t, children: n } = e, [r, o] = d.useState(null);
  return /* @__PURE__ */ w(Bi, { scope: t, anchor: r, onAnchorChange: o, children: n });
};
tr.displayName = Ft;
var nr = "PopperAnchor", rr = d.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: r, ...o } = e, s = er(nr, n), a = d.useRef(null), i = j(t, a), u = d.useRef(null);
    return d.useEffect(() => {
      const c = u.current;
      u.current = (r == null ? void 0 : r.current) || a.current, c !== u.current && s.onAnchorChange(u.current);
    }), r ? null : /* @__PURE__ */ w(G.div, { ...o, ref: i });
  }
);
rr.displayName = nr;
var Wt = "PopperContent", [$i, Vi] = Qn(Wt), or = d.forwardRef(
  (e, t) => {
    var $t, Vt, Gt, jt, Ut, Ht;
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
      sticky: f = "partial",
      hideWhenDetached: m = !1,
      updatePositionStrategy: h = "optimized",
      onPlaced: b,
      ...p
    } = e, g = er(Wt, n), [v, x] = d.useState(null), y = j(t, (Ne) => x(Ne)), [C, R] = d.useState(null), E = Dt(C), S = (E == null ? void 0 : E.width) ?? 0, A = (E == null ? void 0 : E.height) ?? 0, L = r + (s !== "center" ? "-" + s : ""), I = typeof l == "number" ? l : { top: 0, right: 0, bottom: 0, left: 0, ...l }, F = Array.isArray(c) ? c : [c], k = F.length > 0, _ = {
      padding: I,
      boundary: F.filter(ji),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: k
    }, { refs: P, floatingStyles: D, placement: M, isPositioned: z, middlewareData: O } = Ni({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: L,
      whileElementsMounted: (...Ne) => yi(...Ne, {
        animationFrame: h === "always"
      }),
      elements: {
        reference: g.anchor
      },
      middleware: [
        Ti({ mainAxis: o + A, alignmentAxis: a }),
        u && Mi({
          mainAxis: !0,
          crossAxis: !1,
          limiter: f === "partial" ? Ii() : void 0,
          ..._
        }),
        u && Li({ ..._ }),
        _i({
          ..._,
          apply: ({ elements: Ne, rects: Kt, availableWidth: lo, availableHeight: uo }) => {
            const { width: fo, height: po } = Kt.reference, We = Ne.floating.style;
            We.setProperty("--radix-popper-available-width", `${lo}px`), We.setProperty("--radix-popper-available-height", `${uo}px`), We.setProperty("--radix-popper-anchor-width", `${fo}px`), We.setProperty("--radix-popper-anchor-height", `${po}px`);
          }
        }),
        C && Fi({ element: C, padding: i }),
        Ui({ arrowWidth: S, arrowHeight: A }),
        m && Di({ strategy: "referenceHidden", ..._ })
      ]
    }), [B, K] = ar(M), H = me(b);
    ue(() => {
      z && (H == null || H());
    }, [z, H]);
    const oo = ($t = O.arrow) == null ? void 0 : $t.x, so = (Vt = O.arrow) == null ? void 0 : Vt.y, io = ((Gt = O.arrow) == null ? void 0 : Gt.centerOffset) !== 0, [ao, co] = d.useState();
    return ue(() => {
      v && co(window.getComputedStyle(v).zIndex);
    }, [v]), /* @__PURE__ */ w(
      "div",
      {
        ref: P.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...D,
          transform: z ? D.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: ao,
          "--radix-popper-transform-origin": [
            (jt = O.transformOrigin) == null ? void 0 : jt.x,
            (Ut = O.transformOrigin) == null ? void 0 : Ut.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...((Ht = O.hide) == null ? void 0 : Ht.referenceHidden) && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: e.dir,
        children: /* @__PURE__ */ w(
          $i,
          {
            scope: n,
            placedSide: B,
            onArrowChange: R,
            arrowX: oo,
            arrowY: so,
            shouldHideArrow: io,
            children: /* @__PURE__ */ w(
              G.div,
              {
                "data-side": B,
                "data-align": K,
                ...p,
                ref: y,
                style: {
                  ...p.style,
                  // if the PopperContent hasn't been placed yet (not all measurements done)
                  // we prevent animations so that users's animation don't kick in too early referring wrong sides
                  animation: z ? void 0 : "none"
                }
              }
            )
          }
        )
      }
    );
  }
);
or.displayName = Wt;
var sr = "PopperArrow", Gi = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, ir = d.forwardRef(function(t, n) {
  const { __scopePopper: r, ...o } = t, s = Vi(sr, r), a = Gi[s.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ w(
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
        children: /* @__PURE__ */ w(
          zi,
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
ir.displayName = sr;
function ji(e) {
  return e !== null;
}
var Ui = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    var g, v, x;
    const { placement: n, rects: r, middlewareData: o } = t, a = ((g = o.arrow) == null ? void 0 : g.centerOffset) !== 0, i = a ? 0 : e.arrowWidth, u = a ? 0 : e.arrowHeight, [c, l] = ar(n), f = { start: "0%", center: "50%", end: "100%" }[l], m = (((v = o.arrow) == null ? void 0 : v.x) ?? 0) + i / 2, h = (((x = o.arrow) == null ? void 0 : x.y) ?? 0) + u / 2;
    let b = "", p = "";
    return c === "bottom" ? (b = a ? f : `${m}px`, p = `${-u}px`) : c === "top" ? (b = a ? f : `${m}px`, p = `${r.floating.height + u}px`) : c === "right" ? (b = `${-u}px`, p = a ? f : `${h}px`) : c === "left" && (b = `${r.floating.width + u}px`, p = a ? f : `${h}px`), { data: { x: b, y: p } };
  }
});
function ar(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var Hi = tr, cr = rr, Ki = or, Yi = ir, Xi = "Portal", lr = d.forwardRef((e, t) => {
  var i;
  const { container: n, ...r } = e, [o, s] = d.useState(!1);
  ue(() => s(!0), []);
  const a = n || o && ((i = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : i.body);
  return a ? ho.createPortal(/* @__PURE__ */ w(G.div, { ...r, ref: t }), a) : null;
});
lr.displayName = Xi;
function qi(e, t) {
  return d.useReducer((n, r) => t[n][r] ?? n, e);
}
var ot = (e) => {
  const { present: t, children: n } = e, r = Zi(t), o = typeof n == "function" ? n({ present: r.isPresent }) : d.Children.only(n), s = j(r.ref, Qi(o));
  return typeof n == "function" || r.isPresent ? d.cloneElement(o, { ref: s }) : null;
};
ot.displayName = "Presence";
function Zi(e) {
  const [t, n] = d.useState(), r = d.useRef(null), o = d.useRef(e), s = d.useRef("none"), a = e ? "mounted" : "unmounted", [i, u] = qi(a, {
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
    const c = Be(r.current);
    s.current = i === "mounted" ? c : "none";
  }, [i]), ue(() => {
    const c = r.current, l = o.current;
    if (l !== e) {
      const m = s.current, h = Be(c);
      e ? u("MOUNT") : h === "none" || (c == null ? void 0 : c.display) === "none" ? u("UNMOUNT") : u(l && m !== h ? "ANIMATION_OUT" : "UNMOUNT"), o.current = e;
    }
  }, [e, u]), ue(() => {
    if (t) {
      let c;
      const l = t.ownerDocument.defaultView ?? window, f = (h) => {
        const p = Be(r.current).includes(CSS.escape(h.animationName));
        if (h.target === t && p && (u("ANIMATION_END"), !o.current)) {
          const g = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", c = l.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = g);
          });
        }
      }, m = (h) => {
        h.target === t && (s.current = Be(r.current));
      };
      return t.addEventListener("animationstart", m), t.addEventListener("animationcancel", f), t.addEventListener("animationend", f), () => {
        l.clearTimeout(c), t.removeEventListener("animationstart", m), t.removeEventListener("animationcancel", f), t.removeEventListener("animationend", f);
      };
    } else
      u("ANIMATION_END");
  }, [t, u]), {
    isPresent: ["mounted", "unmountSuspended"].includes(i),
    ref: d.useCallback((c) => {
      r.current = c ? getComputedStyle(c) : null, n(c);
    }, [])
  };
}
function Be(e) {
  return (e == null ? void 0 : e.animationName) || "none";
}
function Qi(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var Ji = d[" useInsertionEffect ".trim().toString()] || ue;
function st({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: r
}) {
  const [o, s, a] = ea({
    defaultProp: t,
    onChange: n
  }), i = e !== void 0, u = i ? e : o;
  {
    const l = d.useRef(e !== void 0);
    d.useEffect(() => {
      const f = l.current;
      f !== i && console.warn(
        `${r} is changing from ${f ? "controlled" : "uncontrolled"} to ${i ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), l.current = i;
    }, [i, r]);
  }
  const c = d.useCallback(
    (l) => {
      var f;
      if (i) {
        const m = ta(l) ? l(e) : l;
        m !== e && ((f = a.current) == null || f.call(a, m));
      } else
        s(l);
    },
    [i, e, s, a]
  );
  return [u, c];
}
function ea({
  defaultProp: e,
  onChange: t
}) {
  const [n, r] = d.useState(e), o = d.useRef(n), s = d.useRef(t);
  return Ji(() => {
    s.current = t;
  }, [t]), d.useEffect(() => {
    var a;
    o.current !== n && ((a = s.current) == null || a.call(s, n), o.current = n);
  }, [n, o]), [n, r, s];
}
function ta(e) {
  return typeof e == "function";
}
var na = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, ve = /* @__PURE__ */ new WeakMap(), $e = /* @__PURE__ */ new WeakMap(), Ve = {}, gt = 0, ur = function(e) {
  return e && (e.host || ur(e.parentNode));
}, ra = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var r = ur(n);
    return r && e.contains(r) ? r : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, oa = function(e, t, n, r) {
  var o = ra(t, Array.isArray(e) ? e : [e]);
  Ve[n] || (Ve[n] = /* @__PURE__ */ new WeakMap());
  var s = Ve[n], a = [], i = /* @__PURE__ */ new Set(), u = new Set(o), c = function(f) {
    !f || i.has(f) || (i.add(f), c(f.parentNode));
  };
  o.forEach(c);
  var l = function(f) {
    !f || u.has(f) || Array.prototype.forEach.call(f.children, function(m) {
      if (i.has(m))
        l(m);
      else
        try {
          var h = m.getAttribute(r), b = h !== null && h !== "false", p = (ve.get(m) || 0) + 1, g = (s.get(m) || 0) + 1;
          ve.set(m, p), s.set(m, g), a.push(m), p === 1 && b && $e.set(m, !0), g === 1 && m.setAttribute(n, "true"), b || m.setAttribute(r, "true");
        } catch (v) {
          console.error("aria-hidden: cannot operate on ", m, v);
        }
    });
  };
  return l(t), i.clear(), gt++, function() {
    a.forEach(function(f) {
      var m = ve.get(f) - 1, h = s.get(f) - 1;
      ve.set(f, m), s.set(f, h), m || ($e.has(f) || f.removeAttribute(r), $e.delete(f)), h || f.removeAttribute(n);
    }), gt--, gt || (ve = /* @__PURE__ */ new WeakMap(), ve = /* @__PURE__ */ new WeakMap(), $e = /* @__PURE__ */ new WeakMap(), Ve = {});
  };
}, sa = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var r = Array.from(Array.isArray(e) ? e : [e]), o = na(e);
  return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live], script"))), oa(r, o, n, "aria-hidden")) : function() {
    return null;
  };
}, J = function() {
  return J = Object.assign || function(t) {
    for (var n, r = 1, o = arguments.length; r < o; r++) {
      n = arguments[r];
      for (var s in n) Object.prototype.hasOwnProperty.call(n, s) && (t[s] = n[s]);
    }
    return t;
  }, J.apply(this, arguments);
};
function dr(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  return n;
}
function ia(e, t, n) {
  if (n || arguments.length === 2) for (var r = 0, o = t.length, s; r < o; r++)
    (s || !(r in t)) && (s || (s = Array.prototype.slice.call(t, 0, r)), s[r] = t[r]);
  return e.concat(s || Array.prototype.slice.call(t));
}
var He = "right-scroll-bar-position", Ke = "width-before-scroll-bar", aa = "with-scroll-bars-hidden", ca = "--removed-body-scroll-bar-size";
function vt(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function la(e, t) {
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
var ua = typeof window < "u" ? d.useLayoutEffect : d.useEffect, wn = /* @__PURE__ */ new WeakMap();
function da(e, t) {
  var n = la(null, function(r) {
    return e.forEach(function(o) {
      return vt(o, r);
    });
  });
  return ua(function() {
    var r = wn.get(n);
    if (r) {
      var o = new Set(r), s = new Set(e), a = n.current;
      o.forEach(function(i) {
        s.has(i) || vt(i, null);
      }), s.forEach(function(i) {
        o.has(i) || vt(i, a);
      });
    }
    wn.set(n, e);
  }, [e]), n;
}
function fa(e) {
  return e;
}
function pa(e, t) {
  t === void 0 && (t = fa);
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
function ma(e) {
  e === void 0 && (e = {});
  var t = pa(null);
  return t.options = J({ async: !0, ssr: !1 }, e), t;
}
var fr = function(e) {
  var t = e.sideCar, n = dr(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = t.read();
  if (!r)
    throw new Error("Sidecar medium not found");
  return d.createElement(r, J({}, n));
};
fr.isSideCarExport = !0;
function ha(e, t) {
  return e.useMedium(t), fr;
}
var pr = ma(), bt = function() {
}, it = d.forwardRef(function(e, t) {
  var n = d.useRef(null), r = d.useState({
    onScrollCapture: bt,
    onWheelCapture: bt,
    onTouchMoveCapture: bt
  }), o = r[0], s = r[1], a = e.forwardProps, i = e.children, u = e.className, c = e.removeScrollBar, l = e.enabled, f = e.shards, m = e.sideCar, h = e.noRelative, b = e.noIsolation, p = e.inert, g = e.allowPinchZoom, v = e.as, x = v === void 0 ? "div" : v, y = e.gapMode, C = dr(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), R = m, E = da([n, t]), S = J(J({}, C), o);
  return d.createElement(
    d.Fragment,
    null,
    l && d.createElement(R, { sideCar: pr, removeScrollBar: c, shards: f, noRelative: h, noIsolation: b, inert: p, setCallbacks: s, allowPinchZoom: !!g, lockRef: n, gapMode: y }),
    a ? d.cloneElement(d.Children.only(i), J(J({}, S), { ref: E })) : d.createElement(x, J({}, S, { className: u, ref: E }), i)
  );
});
it.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
it.classNames = {
  fullWidth: Ke,
  zeroRight: He
};
var ga = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function va() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = ga();
  return t && e.setAttribute("nonce", t), e;
}
function ba(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function ya(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var wa = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = va()) && (ba(t, n), ya(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, xa = function() {
  var e = wa();
  return function(t, n) {
    d.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, mr = function() {
  var e = xa(), t = function(n) {
    var r = n.styles, o = n.dynamic;
    return e(r, o), null;
  };
  return t;
}, Ca = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, yt = function(e) {
  return parseInt(e || "", 10) || 0;
}, Ra = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [yt(n), yt(r), yt(o)];
}, Sa = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return Ca;
  var t = Ra(e), n = document.documentElement.clientWidth, r = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, r - n + t[2] - t[0])
  };
}, Ea = mr(), Ce = "data-scroll-locked", Pa = function(e, t, n, r) {
  var o = e.left, s = e.top, a = e.right, i = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(aa, ` {
   overflow: hidden `).concat(r, `;
   padding-right: `).concat(i, "px ").concat(r, `;
  }
  body[`).concat(Ce, `] {
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
  
  .`).concat(Ke, ` {
    margin-right: `).concat(i, "px ").concat(r, `;
  }
  
  .`).concat(He, " .").concat(He, ` {
    right: 0 `).concat(r, `;
  }
  
  .`).concat(Ke, " .").concat(Ke, ` {
    margin-right: 0 `).concat(r, `;
  }
  
  body[`).concat(Ce, `] {
    `).concat(ca, ": ").concat(i, `px;
  }
`);
}, xn = function() {
  var e = parseInt(document.body.getAttribute(Ce) || "0", 10);
  return isFinite(e) ? e : 0;
}, Aa = function() {
  d.useEffect(function() {
    return document.body.setAttribute(Ce, (xn() + 1).toString()), function() {
      var e = xn() - 1;
      e <= 0 ? document.body.removeAttribute(Ce) : document.body.setAttribute(Ce, e.toString());
    };
  }, []);
}, ka = function(e) {
  var t = e.noRelative, n = e.noImportant, r = e.gapMode, o = r === void 0 ? "margin" : r;
  Aa();
  var s = d.useMemo(function() {
    return Sa(o);
  }, [o]);
  return d.createElement(Ea, { styles: Pa(s, !t, o, n ? "" : "!important") });
}, Pt = !1;
if (typeof window < "u")
  try {
    var Ge = Object.defineProperty({}, "passive", {
      get: function() {
        return Pt = !0, !0;
      }
    });
    window.addEventListener("test", Ge, Ge), window.removeEventListener("test", Ge, Ge);
  } catch {
    Pt = !1;
  }
var be = Pt ? { passive: !1 } : !1, Na = function(e) {
  return e.tagName === "TEXTAREA";
}, hr = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !Na(e) && n[t] === "visible")
  );
}, Oa = function(e) {
  return hr(e, "overflowY");
}, Ta = function(e) {
  return hr(e, "overflowX");
}, Cn = function(e, t) {
  var n = t.ownerDocument, r = t;
  do {
    typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
    var o = gr(e, r);
    if (o) {
      var s = vr(e, r), a = s[1], i = s[2];
      if (a > i)
        return !0;
    }
    r = r.parentNode;
  } while (r && r !== n.body);
  return !1;
}, Ma = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, r = e.clientHeight;
  return [
    t,
    n,
    r
  ];
}, Ia = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, r = e.clientWidth;
  return [
    t,
    n,
    r
  ];
}, gr = function(e, t) {
  return e === "v" ? Oa(t) : Ta(t);
}, vr = function(e, t) {
  return e === "v" ? Ma(t) : Ia(t);
}, La = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, _a = function(e, t, n, r, o) {
  var s = La(e, window.getComputedStyle(t).direction), a = s * r, i = n.target, u = t.contains(i), c = !1, l = a > 0, f = 0, m = 0;
  do {
    if (!i)
      break;
    var h = vr(e, i), b = h[0], p = h[1], g = h[2], v = p - g - s * b;
    (b || v) && gr(e, i) && (f += v, m += b);
    var x = i.parentNode;
    i = x && x.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? x.host : x;
  } while (
    // portaled content
    !u && i !== document.body || // self content
    u && (t.contains(i) || t === i)
  );
  return (l && Math.abs(f) < 1 || !l && Math.abs(m) < 1) && (c = !0), c;
}, je = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, Rn = function(e) {
  return [e.deltaX, e.deltaY];
}, Sn = function(e) {
  return e && "current" in e ? e.current : e;
}, Da = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, Fa = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, Wa = 0, ye = [];
function za(e) {
  var t = d.useRef([]), n = d.useRef([0, 0]), r = d.useRef(), o = d.useState(Wa++)[0], s = d.useState(mr)[0], a = d.useRef(e);
  d.useEffect(function() {
    a.current = e;
  }, [e]), d.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var p = ia([e.lockRef.current], (e.shards || []).map(Sn), !0).filter(Boolean);
      return p.forEach(function(g) {
        return g.classList.add("allow-interactivity-".concat(o));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(o)), p.forEach(function(g) {
          return g.classList.remove("allow-interactivity-".concat(o));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var i = d.useCallback(function(p, g) {
    if ("touches" in p && p.touches.length === 2 || p.type === "wheel" && p.ctrlKey)
      return !a.current.allowPinchZoom;
    var v = je(p), x = n.current, y = "deltaX" in p ? p.deltaX : x[0] - v[0], C = "deltaY" in p ? p.deltaY : x[1] - v[1], R, E = p.target, S = Math.abs(y) > Math.abs(C) ? "h" : "v";
    if ("touches" in p && S === "h" && E.type === "range")
      return !1;
    var A = Cn(S, E);
    if (!A)
      return !0;
    if (A ? R = S : (R = S === "v" ? "h" : "v", A = Cn(S, E)), !A)
      return !1;
    if (!r.current && "changedTouches" in p && (y || C) && (r.current = R), !R)
      return !0;
    var L = r.current || R;
    return _a(L, g, p, L === "h" ? y : C);
  }, []), u = d.useCallback(function(p) {
    var g = p;
    if (!(!ye.length || ye[ye.length - 1] !== s)) {
      var v = "deltaY" in g ? Rn(g) : je(g), x = t.current.filter(function(R) {
        return R.name === g.type && (R.target === g.target || g.target === R.shadowParent) && Da(R.delta, v);
      })[0];
      if (x && x.should) {
        g.cancelable && g.preventDefault();
        return;
      }
      if (!x) {
        var y = (a.current.shards || []).map(Sn).filter(Boolean).filter(function(R) {
          return R.contains(g.target);
        }), C = y.length > 0 ? i(g, y[0]) : !a.current.noIsolation;
        C && g.cancelable && g.preventDefault();
      }
    }
  }, []), c = d.useCallback(function(p, g, v, x) {
    var y = { name: p, delta: g, target: v, should: x, shadowParent: Ba(v) };
    t.current.push(y), setTimeout(function() {
      t.current = t.current.filter(function(C) {
        return C !== y;
      });
    }, 1);
  }, []), l = d.useCallback(function(p) {
    n.current = je(p), r.current = void 0;
  }, []), f = d.useCallback(function(p) {
    c(p.type, Rn(p), p.target, i(p, e.lockRef.current));
  }, []), m = d.useCallback(function(p) {
    c(p.type, je(p), p.target, i(p, e.lockRef.current));
  }, []);
  d.useEffect(function() {
    return ye.push(s), e.setCallbacks({
      onScrollCapture: f,
      onWheelCapture: f,
      onTouchMoveCapture: m
    }), document.addEventListener("wheel", u, be), document.addEventListener("touchmove", u, be), document.addEventListener("touchstart", l, be), function() {
      ye = ye.filter(function(p) {
        return p !== s;
      }), document.removeEventListener("wheel", u, be), document.removeEventListener("touchmove", u, be), document.removeEventListener("touchstart", l, be);
    };
  }, []);
  var h = e.removeScrollBar, b = e.inert;
  return d.createElement(
    d.Fragment,
    null,
    b ? d.createElement(s, { styles: Fa(o) }) : null,
    h ? d.createElement(ka, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function Ba(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const $a = ha(pr, za);
var br = d.forwardRef(function(e, t) {
  return d.createElement(it, J({}, e, { ref: t, sideCar: $a }));
});
br.classNames = it.classNames;
var at = "Popover", [yr] = ge(at, [
  Jn
]), De = Jn(), [Va, pe] = yr(at), wr = (e) => {
  const {
    __scopePopover: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: s,
    modal: a = !1
  } = e, i = De(t), u = d.useRef(null), [c, l] = d.useState(!1), [f, m] = st({
    prop: r,
    defaultProp: o ?? !1,
    onChange: s,
    caller: at
  });
  return /* @__PURE__ */ w(Hi, { ...i, children: /* @__PURE__ */ w(
    Va,
    {
      scope: t,
      contentId: zn(),
      triggerRef: u,
      open: f,
      onOpenChange: m,
      onOpenToggle: d.useCallback(() => m((h) => !h), [m]),
      hasCustomAnchor: c,
      onCustomAnchorAdd: d.useCallback(() => l(!0), []),
      onCustomAnchorRemove: d.useCallback(() => l(!1), []),
      modal: a,
      children: n
    }
  ) });
};
wr.displayName = at;
var xr = "PopoverAnchor", Ga = d.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = pe(xr, n), s = De(n), { onCustomAnchorAdd: a, onCustomAnchorRemove: i } = o;
    return d.useEffect(() => (a(), () => i()), [a, i]), /* @__PURE__ */ w(cr, { ...s, ...r, ref: t });
  }
);
Ga.displayName = xr;
var Cr = "PopoverTrigger", Rr = d.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = pe(Cr, n), s = De(n), a = j(t, o.triggerRef), i = /* @__PURE__ */ w(
      G.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": o.open,
        "aria-controls": o.contentId,
        "data-state": kr(o.open),
        ...r,
        ref: a,
        onClick: V(e.onClick, o.onOpenToggle)
      }
    );
    return o.hasCustomAnchor ? i : /* @__PURE__ */ w(cr, { asChild: !0, ...s, children: i });
  }
);
Rr.displayName = Cr;
var zt = "PopoverPortal", [ja, Ua] = yr(zt, {
  forceMount: void 0
}), Sr = (e) => {
  const { __scopePopover: t, forceMount: n, children: r, container: o } = e, s = pe(zt, t);
  return /* @__PURE__ */ w(ja, { scope: t, forceMount: n, children: /* @__PURE__ */ w(ot, { present: n || s.open, children: /* @__PURE__ */ w(lr, { asChild: !0, container: o, children: r }) }) });
};
Sr.displayName = zt;
var Se = "PopoverContent", Er = d.forwardRef(
  (e, t) => {
    const n = Ua(Se, e.__scopePopover), { forceMount: r = n.forceMount, ...o } = e, s = pe(Se, e.__scopePopover);
    return /* @__PURE__ */ w(ot, { present: r || s.open, children: s.modal ? /* @__PURE__ */ w(Ka, { ...o, ref: t }) : /* @__PURE__ */ w(Ya, { ...o, ref: t }) });
  }
);
Er.displayName = Se;
var Ha = /* @__PURE__ */ Ye("PopoverContent.RemoveScroll"), Ka = d.forwardRef(
  (e, t) => {
    const n = pe(Se, e.__scopePopover), r = d.useRef(null), o = j(t, r), s = d.useRef(!1);
    return d.useEffect(() => {
      const a = r.current;
      if (a) return sa(a);
    }, []), /* @__PURE__ */ w(br, { as: Ha, allowPinchZoom: !0, children: /* @__PURE__ */ w(
      Pr,
      {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: V(e.onCloseAutoFocus, (a) => {
          var i;
          a.preventDefault(), s.current || (i = n.triggerRef.current) == null || i.focus();
        }),
        onPointerDownOutside: V(
          e.onPointerDownOutside,
          (a) => {
            const i = a.detail.originalEvent, u = i.button === 0 && i.ctrlKey === !0, c = i.button === 2 || u;
            s.current = c;
          },
          { checkForDefaultPrevented: !1 }
        ),
        onFocusOutside: V(
          e.onFocusOutside,
          (a) => a.preventDefault(),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
), Ya = d.forwardRef(
  (e, t) => {
    const n = pe(Se, e.__scopePopover), r = d.useRef(!1), o = d.useRef(!1);
    return /* @__PURE__ */ w(
      Pr,
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
), Pr = d.forwardRef(
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
      ...f
    } = e, m = pe(Se, n), h = De(n);
    return bs(), /* @__PURE__ */ w(
      Fn,
      {
        asChild: !0,
        loop: !0,
        trapped: r,
        onMountAutoFocus: o,
        onUnmountAutoFocus: s,
        children: /* @__PURE__ */ w(
          _n,
          {
            asChild: !0,
            disableOutsidePointerEvents: a,
            onInteractOutside: l,
            onEscapeKeyDown: i,
            onPointerDownOutside: u,
            onFocusOutside: c,
            onDismiss: () => m.onOpenChange(!1),
            children: /* @__PURE__ */ w(
              Ki,
              {
                "data-state": kr(m.open),
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
), Ar = "PopoverClose", Xa = d.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = pe(Ar, n);
    return /* @__PURE__ */ w(
      G.button,
      {
        type: "button",
        ...r,
        ref: t,
        onClick: V(e.onClick, () => o.onOpenChange(!1))
      }
    );
  }
);
Xa.displayName = Ar;
var qa = "PopoverArrow", Za = d.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = De(n);
    return /* @__PURE__ */ w(Yi, { ...o, ...r, ref: t });
  }
);
Za.displayName = qa;
function kr(e) {
  return e ? "open" : "closed";
}
var Qa = wr, Ja = Rr, ec = Sr, Nr = Er;
const Qc = Qa, Jc = Ja, tc = Ee(({ className: e, align: t = "end", sideOffset: n = 8, ...r }, o) => /* @__PURE__ */ w(ec, { children: /* @__PURE__ */ w(
  Nr,
  {
    ref: o,
    align: t,
    sideOffset: n,
    className: T(
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
tc.displayName = Nr.displayName;
const nc = Q(
  T(
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
), rc = Ee(
  ({ className: e, variant: t, icon: n, children: r, ...o }, s) => /* @__PURE__ */ U(
    "button",
    {
      ref: s,
      className: T(nc({ variant: t }), e),
      ...o,
      children: [
        n && /* @__PURE__ */ w("span", { className: "shrink-0", children: n }),
        r
      ]
    }
  )
);
rc.displayName = "PopoverMenuItem";
const oc = Q("cms-font-pretendard cms-text-black", {
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
}), sc = $.forwardRef(
  ({
    className: e,
    variant: t,
    align: n,
    decoration: r,
    as: o = "p",
    children: s,
    ...a
  }, i) => /* @__PURE__ */ w(
    o,
    {
      className: T(oc({ variant: t, align: n, decoration: r }), e),
      ref: i,
      ...a,
      children: s
    }
  )
);
sc.displayName = "Text";
const ic = Q(
  T(
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
        default: T(
          "bg-cms-white ",
          "border-cms-gray-450",
          "focus:border-cms-gray-800",
          "disabled:bg-cms-gray-150 disabled:text-cms-gray-400 disabled:cursor-not-allowed"
        ),
        error: T(
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
), ac = Q("block text-cms-sm font-medium text-cms-black"), cc = Q(
  "block text-cms-sm font-medium text-cms-red-400 mt-1"
), lc = Q(
  "block text-cms-sm font-normal text-cms-gray-700 mt-1"
), Je = $.forwardRef(
  ({
    className: e,
    variant: t,
    fullWidth: n,
    label: r,
    error: o,
    errorMessage: s,
    helperText: a,
    showCharCount: i,
    maxLength: u,
    value: c,
    defaultValue: l,
    onChange: f,
    id: m,
    ...h
  }, b) => {
    const [p, g] = $.useState(
      c || l || ""
    ), v = m || `input-${Math.random().toString(36).substr(2, 9)}`, x = o ? "error" : t, y = c !== void 0 ? c : p, C = (y == null ? void 0 : y.length) || 0, R = (S) => {
      c === void 0 && g(S.target.value), f == null || f(S);
    }, E = r || i && u;
    return /* @__PURE__ */ U("div", { className: T("w-full", !n && "w-auto"), children: [
      E && /* @__PURE__ */ U("div", { className: "flex justify-between items-center mb-2", children: [
        r ? /* @__PURE__ */ w("label", { htmlFor: v, className: ac(), children: r }) : /* @__PURE__ */ w("div", {}),
        i && u && /* @__PURE__ */ U("span", { className: "text-cms-xs text-cms-gray-600", children: [
          C,
          " / ",
          u
        ] })
      ] }),
      /* @__PURE__ */ w(
        "input",
        {
          id: v,
          ref: b,
          className: T(
            ic({ variant: x, fullWidth: n }),
            e
          ),
          maxLength: u,
          value: c,
          defaultValue: l,
          onChange: R,
          ...h
        }
      ),
      o && s && /* @__PURE__ */ w("span", { className: cc(), children: s }),
      !o && a && /* @__PURE__ */ w("span", { className: lc(), children: a })
    ] });
  }
);
Je.displayName = "TextInput";
const uc = $.forwardRef(
  ({ value: e, onChange: t, min: n, max: r, ...o }, s) => /* @__PURE__ */ w(
    Je,
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
uc.displayName = "DatePicker";
const dc = $.forwardRef(
  ({
    value: e,
    onChange: t,
    startLabel: n = "시작일",
    endLabel: r = "종료일",
    startPlaceholder: o = "YYYY-MM-DD",
    endPlaceholder: s = "YYYY-MM-DD",
    min: a,
    max: i,
    label: u,
    error: c,
    errorMessage: l,
    helperText: f,
    fullWidth: m = !0,
    ...h
  }, b) => {
    const [p, g] = $.useState((e == null ? void 0 : e.start) || ""), [v, x] = $.useState((e == null ? void 0 : e.end) || "");
    $.useEffect(() => {
      e && (g(e.start), x(e.end));
    }, [e]);
    const y = (R) => {
      const E = R.target.value;
      g(E), t == null || t({ start: E, end: v });
    }, C = (R) => {
      const E = R.target.value;
      x(E), t == null || t({ start: p, end: E });
    };
    return /* @__PURE__ */ U("div", { ref: b, className: T("cms-w-full", !m && "cms-w-auto"), children: [
      u && /* @__PURE__ */ w("label", { className: "cms-block cms-text-cms-md cms-font-medium cms-text-black cms-mb-2", children: u }),
      /* @__PURE__ */ U("div", { className: "cms-flex cms-gap-4 cms-items-center", children: [
        /* @__PURE__ */ w(
          Je,
          {
            type: "date",
            value: p,
            onChange: y,
            placeholder: o,
            min: a,
            max: v || i,
            fullWidth: !0,
            ...h
          }
        ),
        /* @__PURE__ */ w("span", { className: "cms-text-cms-md cms-text-gray-600", children: "~" }),
        /* @__PURE__ */ w(
          Je,
          {
            type: "date",
            value: v,
            onChange: C,
            placeholder: s,
            min: p || a,
            max: i,
            fullWidth: !0,
            ...h
          }
        )
      ] }),
      c && l && /* @__PURE__ */ w("span", { className: "cms-block cms-text-cms-sm cms-font-medium cms-text-red-400 cms-mt-1", children: l }),
      !c && f && /* @__PURE__ */ w("span", { className: "cms-block cms-text-cms-sm cms-font-normal cms-text-gray-600 cms-mt-1", children: f })
    ] });
  }
);
dc.displayName = "DateRangePicker";
function Or(e) {
  const t = d.useRef({ value: e, previous: e });
  return d.useMemo(() => (t.current.value !== e && (t.current.previous = t.current.value, t.current.value = e), t.current.previous), [e]);
}
var ct = "Switch", [fc] = ge(ct), [pc, mc] = fc(ct), Tr = d.forwardRef(
  (e, t) => {
    const {
      __scopeSwitch: n,
      name: r,
      checked: o,
      defaultChecked: s,
      required: a,
      disabled: i,
      value: u = "on",
      onCheckedChange: c,
      form: l,
      ...f
    } = e, [m, h] = d.useState(null), b = j(t, (y) => h(y)), p = d.useRef(!1), g = m ? l || !!m.closest("form") : !0, [v, x] = st({
      prop: o,
      defaultProp: s ?? !1,
      onChange: c,
      caller: ct
    });
    return /* @__PURE__ */ U(pc, { scope: n, checked: v, disabled: i, children: [
      /* @__PURE__ */ w(
        G.button,
        {
          type: "button",
          role: "switch",
          "aria-checked": v,
          "aria-required": a,
          "data-state": _r(v),
          "data-disabled": i ? "" : void 0,
          disabled: i,
          value: u,
          ...f,
          ref: b,
          onClick: V(e.onClick, (y) => {
            x((C) => !C), g && (p.current = y.isPropagationStopped(), p.current || y.stopPropagation());
          })
        }
      ),
      g && /* @__PURE__ */ w(
        Lr,
        {
          control: m,
          bubbles: !p.current,
          name: r,
          value: u,
          checked: v,
          required: a,
          disabled: i,
          form: l,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
Tr.displayName = ct;
var Mr = "SwitchThumb", Ir = d.forwardRef(
  (e, t) => {
    const { __scopeSwitch: n, ...r } = e, o = mc(Mr, n);
    return /* @__PURE__ */ w(
      G.span,
      {
        "data-state": _r(o.checked),
        "data-disabled": o.disabled ? "" : void 0,
        ...r,
        ref: t
      }
    );
  }
);
Ir.displayName = Mr;
var hc = "SwitchBubbleInput", Lr = d.forwardRef(
  ({
    __scopeSwitch: e,
    control: t,
    checked: n,
    bubbles: r = !0,
    ...o
  }, s) => {
    const a = d.useRef(null), i = j(a, s), u = Or(n), c = Dt(t);
    return d.useEffect(() => {
      const l = a.current;
      if (!l) return;
      const f = window.HTMLInputElement.prototype, h = Object.getOwnPropertyDescriptor(
        f,
        "checked"
      ).set;
      if (u !== n && h) {
        const b = new Event("click", { bubbles: r });
        h.call(l, n), l.dispatchEvent(b);
      }
    }, [u, n, r]), /* @__PURE__ */ w(
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
Lr.displayName = hc;
function _r(e) {
  return e ? "checked" : "unchecked";
}
var Dr = Tr, gc = Ir;
const vc = Q(
  T(
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
), bc = $.forwardRef(({ className: e, variant: t, ...n }, r) => /* @__PURE__ */ w(
  Dr,
  {
    className: T(vc({ variant: t }), e),
    ...n,
    ref: r,
    children: /* @__PURE__ */ w(
      gc,
      {
        className: T(
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
bc.displayName = Dr.displayName;
function yc(e) {
  const t = e + "CollectionProvider", [n, r] = ge(t), [o, s] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), a = (p) => {
    const { scope: g, children: v } = p, x = $.useRef(null), y = $.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ w(o, { scope: g, itemMap: y, collectionRef: x, children: v });
  };
  a.displayName = t;
  const i = e + "CollectionSlot", u = /* @__PURE__ */ Ye(i), c = $.forwardRef(
    (p, g) => {
      const { scope: v, children: x } = p, y = s(i, v), C = j(g, y.collectionRef);
      return /* @__PURE__ */ w(u, { ref: C, children: x });
    }
  );
  c.displayName = i;
  const l = e + "CollectionItemSlot", f = "data-radix-collection-item", m = /* @__PURE__ */ Ye(l), h = $.forwardRef(
    (p, g) => {
      const { scope: v, children: x, ...y } = p, C = $.useRef(null), R = j(g, C), E = s(l, v);
      return $.useEffect(() => (E.itemMap.set(C, { ref: C, ...y }), () => void E.itemMap.delete(C))), /* @__PURE__ */ w(m, { [f]: "", ref: R, children: x });
    }
  );
  h.displayName = l;
  function b(p) {
    const g = s(e + "CollectionConsumer", p);
    return $.useCallback(() => {
      const x = g.collectionRef.current;
      if (!x) return [];
      const y = Array.from(x.querySelectorAll(`[${f}]`));
      return Array.from(g.itemMap.values()).sort(
        (E, S) => y.indexOf(E.ref.current) - y.indexOf(S.ref.current)
      );
    }, [g.collectionRef, g.itemMap]);
  }
  return [
    { Provider: a, Slot: c, ItemSlot: h },
    b,
    r
  ];
}
var wc = d.createContext(void 0);
function Fr(e) {
  const t = d.useContext(wc);
  return e || t || "ltr";
}
var wt = "rovingFocusGroup.onEntryFocus", xc = { bubbles: !1, cancelable: !0 }, Fe = "RovingFocusGroup", [At, Wr, Cc] = yc(Fe), [Rc, zr] = ge(
  Fe,
  [Cc]
), [Sc, Ec] = Rc(Fe), Br = d.forwardRef(
  (e, t) => /* @__PURE__ */ w(At.Provider, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ w(At.Slot, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ w(Pc, { ...e, ref: t }) }) })
);
Br.displayName = Fe;
var Pc = d.forwardRef((e, t) => {
  const {
    __scopeRovingFocusGroup: n,
    orientation: r,
    loop: o = !1,
    dir: s,
    currentTabStopId: a,
    defaultCurrentTabStopId: i,
    onCurrentTabStopIdChange: u,
    onEntryFocus: c,
    preventScrollOnEntryFocus: l = !1,
    ...f
  } = e, m = d.useRef(null), h = j(t, m), b = Fr(s), [p, g] = st({
    prop: a,
    defaultProp: i ?? null,
    onChange: u,
    caller: Fe
  }), [v, x] = d.useState(!1), y = me(c), C = Wr(n), R = d.useRef(!1), [E, S] = d.useState(0);
  return d.useEffect(() => {
    const A = m.current;
    if (A)
      return A.addEventListener(wt, y), () => A.removeEventListener(wt, y);
  }, [y]), /* @__PURE__ */ w(
    Sc,
    {
      scope: n,
      orientation: r,
      dir: b,
      loop: o,
      currentTabStopId: p,
      onItemFocus: d.useCallback(
        (A) => g(A),
        [g]
      ),
      onItemShiftTab: d.useCallback(() => x(!0), []),
      onFocusableItemAdd: d.useCallback(
        () => S((A) => A + 1),
        []
      ),
      onFocusableItemRemove: d.useCallback(
        () => S((A) => A - 1),
        []
      ),
      children: /* @__PURE__ */ w(
        G.div,
        {
          tabIndex: v || E === 0 ? -1 : 0,
          "data-orientation": r,
          ...f,
          ref: h,
          style: { outline: "none", ...e.style },
          onMouseDown: V(e.onMouseDown, () => {
            R.current = !0;
          }),
          onFocus: V(e.onFocus, (A) => {
            const L = !R.current;
            if (A.target === A.currentTarget && L && !v) {
              const I = new CustomEvent(wt, xc);
              if (A.currentTarget.dispatchEvent(I), !I.defaultPrevented) {
                const F = C().filter((M) => M.focusable), k = F.find((M) => M.active), _ = F.find((M) => M.id === p), D = [k, _, ...F].filter(
                  Boolean
                ).map((M) => M.ref.current);
                Gr(D, l);
              }
            }
            R.current = !1;
          }),
          onBlur: V(e.onBlur, () => x(!1))
        }
      )
    }
  );
}), $r = "RovingFocusGroupItem", Vr = d.forwardRef(
  (e, t) => {
    const {
      __scopeRovingFocusGroup: n,
      focusable: r = !0,
      active: o = !1,
      tabStopId: s,
      children: a,
      ...i
    } = e, u = zn(), c = s || u, l = Ec($r, n), f = l.currentTabStopId === c, m = Wr(n), { onFocusableItemAdd: h, onFocusableItemRemove: b, currentTabStopId: p } = l;
    return d.useEffect(() => {
      if (r)
        return h(), () => b();
    }, [r, h, b]), /* @__PURE__ */ w(
      At.ItemSlot,
      {
        scope: n,
        id: c,
        focusable: r,
        active: o,
        children: /* @__PURE__ */ w(
          G.span,
          {
            tabIndex: f ? 0 : -1,
            "data-orientation": l.orientation,
            ...i,
            ref: t,
            onMouseDown: V(e.onMouseDown, (g) => {
              r ? l.onItemFocus(c) : g.preventDefault();
            }),
            onFocus: V(e.onFocus, () => l.onItemFocus(c)),
            onKeyDown: V(e.onKeyDown, (g) => {
              if (g.key === "Tab" && g.shiftKey) {
                l.onItemShiftTab();
                return;
              }
              if (g.target !== g.currentTarget) return;
              const v = Nc(g, l.orientation, l.dir);
              if (v !== void 0) {
                if (g.metaKey || g.ctrlKey || g.altKey || g.shiftKey) return;
                g.preventDefault();
                let y = m().filter((C) => C.focusable).map((C) => C.ref.current);
                if (v === "last") y.reverse();
                else if (v === "prev" || v === "next") {
                  v === "prev" && y.reverse();
                  const C = y.indexOf(g.currentTarget);
                  y = l.loop ? Oc(y, C + 1) : y.slice(C + 1);
                }
                setTimeout(() => Gr(y));
              }
            }),
            children: typeof a == "function" ? a({ isCurrentTabStop: f, hasTabStop: p != null }) : a
          }
        )
      }
    );
  }
);
Vr.displayName = $r;
var Ac = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function kc(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function Nc(e, t, n) {
  const r = kc(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r)))
    return Ac[r];
}
function Gr(e, t = !1) {
  const n = document.activeElement;
  for (const r of e)
    if (r === n || (r.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function Oc(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var Tc = Br, Mc = Vr, Bt = "Radio", [Ic, jr] = ge(Bt), [Lc, _c] = Ic(Bt), Ur = d.forwardRef(
  (e, t) => {
    const {
      __scopeRadio: n,
      name: r,
      checked: o = !1,
      required: s,
      disabled: a,
      value: i = "on",
      onCheck: u,
      form: c,
      ...l
    } = e, [f, m] = d.useState(null), h = j(t, (g) => m(g)), b = d.useRef(!1), p = f ? c || !!f.closest("form") : !0;
    return /* @__PURE__ */ U(Lc, { scope: n, checked: o, disabled: a, children: [
      /* @__PURE__ */ w(
        G.button,
        {
          type: "button",
          role: "radio",
          "aria-checked": o,
          "data-state": Xr(o),
          "data-disabled": a ? "" : void 0,
          disabled: a,
          value: i,
          ...l,
          ref: h,
          onClick: V(e.onClick, (g) => {
            o || u == null || u(), p && (b.current = g.isPropagationStopped(), b.current || g.stopPropagation());
          })
        }
      ),
      p && /* @__PURE__ */ w(
        Yr,
        {
          control: f,
          bubbles: !b.current,
          name: r,
          value: i,
          checked: o,
          required: s,
          disabled: a,
          form: c,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
Ur.displayName = Bt;
var Hr = "RadioIndicator", Kr = d.forwardRef(
  (e, t) => {
    const { __scopeRadio: n, forceMount: r, ...o } = e, s = _c(Hr, n);
    return /* @__PURE__ */ w(ot, { present: r || s.checked, children: /* @__PURE__ */ w(
      G.span,
      {
        "data-state": Xr(s.checked),
        "data-disabled": s.disabled ? "" : void 0,
        ...o,
        ref: t
      }
    ) });
  }
);
Kr.displayName = Hr;
var Dc = "RadioBubbleInput", Yr = d.forwardRef(
  ({
    __scopeRadio: e,
    control: t,
    checked: n,
    bubbles: r = !0,
    ...o
  }, s) => {
    const a = d.useRef(null), i = j(a, s), u = Or(n), c = Dt(t);
    return d.useEffect(() => {
      const l = a.current;
      if (!l) return;
      const f = window.HTMLInputElement.prototype, h = Object.getOwnPropertyDescriptor(
        f,
        "checked"
      ).set;
      if (u !== n && h) {
        const b = new Event("click", { bubbles: r });
        h.call(l, n), l.dispatchEvent(b);
      }
    }, [u, n, r]), /* @__PURE__ */ w(
      G.input,
      {
        type: "radio",
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
Yr.displayName = Dc;
function Xr(e) {
  return e ? "checked" : "unchecked";
}
var Fc = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], lt = "RadioGroup", [Wc] = ge(lt, [
  zr,
  jr
]), qr = zr(), Zr = jr(), [zc, Bc] = Wc(lt), Qr = d.forwardRef(
  (e, t) => {
    const {
      __scopeRadioGroup: n,
      name: r,
      defaultValue: o,
      value: s,
      required: a = !1,
      disabled: i = !1,
      orientation: u,
      dir: c,
      loop: l = !0,
      onValueChange: f,
      ...m
    } = e, h = qr(n), b = Fr(c), [p, g] = st({
      prop: s,
      defaultProp: o ?? null,
      onChange: f,
      caller: lt
    });
    return /* @__PURE__ */ w(
      zc,
      {
        scope: n,
        name: r,
        required: a,
        disabled: i,
        value: p,
        onValueChange: g,
        children: /* @__PURE__ */ w(
          Tc,
          {
            asChild: !0,
            ...h,
            orientation: u,
            dir: b,
            loop: l,
            children: /* @__PURE__ */ w(
              G.div,
              {
                role: "radiogroup",
                "aria-required": a,
                "aria-orientation": u,
                "data-disabled": i ? "" : void 0,
                dir: b,
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
Qr.displayName = lt;
var Jr = "RadioGroupItem", eo = d.forwardRef(
  (e, t) => {
    const { __scopeRadioGroup: n, disabled: r, ...o } = e, s = Bc(Jr, n), a = s.disabled || r, i = qr(n), u = Zr(n), c = d.useRef(null), l = j(t, c), f = s.value === o.value, m = d.useRef(!1);
    return d.useEffect(() => {
      const h = (p) => {
        Fc.includes(p.key) && (m.current = !0);
      }, b = () => m.current = !1;
      return document.addEventListener("keydown", h), document.addEventListener("keyup", b), () => {
        document.removeEventListener("keydown", h), document.removeEventListener("keyup", b);
      };
    }, []), /* @__PURE__ */ w(
      Mc,
      {
        asChild: !0,
        ...i,
        focusable: !a,
        active: f,
        children: /* @__PURE__ */ w(
          Ur,
          {
            disabled: a,
            required: s.required,
            checked: f,
            ...u,
            ...o,
            name: s.name,
            ref: l,
            onCheck: () => s.onValueChange(o.value),
            onKeyDown: V((h) => {
              h.key === "Enter" && h.preventDefault();
            }),
            onFocus: V(o.onFocus, () => {
              var h;
              m.current && ((h = c.current) == null || h.click());
            })
          }
        )
      }
    );
  }
);
eo.displayName = Jr;
var $c = "RadioGroupIndicator", to = d.forwardRef(
  (e, t) => {
    const { __scopeRadioGroup: n, ...r } = e, o = Zr(n);
    return /* @__PURE__ */ w(Kr, { ...o, ...r, ref: t });
  }
);
to.displayName = $c;
var no = Qr, ro = eo, Vc = to;
const Gc = $.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w(
  no,
  {
    className: T("grid gap-2", e),
    ...t,
    ref: n
  }
));
Gc.displayName = no.displayName;
const jc = Q(
  T(
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
), Uc = Q(
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
), Hc = $.forwardRef(({ className: e, variant: t, size: n, ...r }, o) => /* @__PURE__ */ w(
  ro,
  {
    ref: o,
    className: T(jc({ variant: t, size: n }), e),
    ...r,
    children: /* @__PURE__ */ w(
      Vc,
      {
        className: T(Uc({ variant: t, size: n }))
      }
    )
  }
));
Hc.displayName = ro.displayName;
export {
  Xo as Button,
  Zc as ChevronRightIcon,
  ts as Combobox,
  uc as DatePicker,
  dc as DateRangePicker,
  Nt as Dropdown,
  qc as LoadingCircle,
  Qc as Popover,
  tc as PopoverContent,
  rc as PopoverMenuItem,
  Jc as PopoverTrigger,
  Gc as RadioGroup,
  Hc as RadioGroupItem,
  es as Select,
  bc as Switch,
  sc as Text,
  Je as TextInput,
  Yo as buttonVariants,
  T as cn,
  Zo as dropdownTriggerVariants,
  nc as popoverMenuItemVariants
};
//# sourceMappingURL=index.es.js.map
