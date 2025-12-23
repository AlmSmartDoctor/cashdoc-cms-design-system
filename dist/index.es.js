import { jsx as g, jsxs as V, Fragment as dn } from "react/jsx-runtime";
import * as p from "react";
import P, { forwardRef as it, useState as ve, useRef as Ct, useEffect as Bt, useLayoutEffect as jo, createContext as ac, useContext as sc, useCallback as xe, useMemo as Be, createElement as rr } from "react";
import * as Vo from "react-dom";
import ic from "react-dom";
function Go(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (n = Go(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function qo() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++) (e = arguments[n]) && (t = Go(e)) && (r && (r += " "), r += t);
  return r;
}
const hr = "-", cc = (e) => {
  const t = dc(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (s) => {
      const i = s.split(hr);
      return i[0] === "" && i.length !== 1 && i.shift(), Uo(i, t) || lc(s);
    },
    getConflictingClassGroupIds: (s, i) => {
      const c = n[s] || [];
      return i && r[s] ? [...c, ...r[s]] : c;
    }
  };
}, Uo = (e, t) => {
  var s;
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], r = t.nextPart.get(n), o = r ? Uo(e.slice(1), r) : void 0;
  if (o)
    return o;
  if (t.validators.length === 0)
    return;
  const a = e.join(hr);
  return (s = t.validators.find(({
    validator: i
  }) => i(a))) == null ? void 0 : s.classGroupId;
}, to = /^\[(.+)\]$/, lc = (e) => {
  if (to.test(e)) {
    const t = to.exec(e)[1], n = t == null ? void 0 : t.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, dc = (e) => {
  const {
    theme: t,
    prefix: n
  } = e, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return fc(Object.entries(e.classGroups), n).forEach(([a, s]) => {
    or(s, r, a, t);
  }), r;
}, or = (e, t, n, r) => {
  e.forEach((o) => {
    if (typeof o == "string") {
      const a = o === "" ? t : no(t, o);
      a.classGroupId = n;
      return;
    }
    if (typeof o == "function") {
      if (uc(o)) {
        or(o(r), t, n, r);
        return;
      }
      t.validators.push({
        validator: o,
        classGroupId: n
      });
      return;
    }
    Object.entries(o).forEach(([a, s]) => {
      or(s, no(t, a), n, r);
    });
  });
}, no = (e, t) => {
  let n = e;
  return t.split(hr).forEach((r) => {
    n.nextPart.has(r) || n.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(r);
  }), n;
}, uc = (e) => e.isThemeGetter, fc = (e, t) => t ? e.map(([n, r]) => {
  const o = r.map((a) => typeof a == "string" ? t + a : typeof a == "object" ? Object.fromEntries(Object.entries(a).map(([s, i]) => [t + s, i])) : a);
  return [n, o];
}) : e, hc = (e) => {
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
}, Xo = "!", mc = (e) => {
  const {
    separator: t,
    experimentalParseClassName: n
  } = e, r = t.length === 1, o = t[0], a = t.length, s = (i) => {
    const c = [];
    let l = 0, d = 0, u;
    for (let b = 0; b < i.length; b++) {
      let v = i[b];
      if (l === 0) {
        if (v === o && (r || i.slice(b, b + a) === t)) {
          c.push(i.slice(d, b)), d = b + a;
          continue;
        }
        if (v === "/") {
          u = b;
          continue;
        }
      }
      v === "[" ? l++ : v === "]" && l--;
    }
    const f = c.length === 0 ? i : i.substring(d), h = f.startsWith(Xo), y = h ? f.substring(1) : f, m = u && u > d ? u - d : void 0;
    return {
      modifiers: c,
      hasImportantModifier: h,
      baseClassName: y,
      maybePostfixModifierPosition: m
    };
  };
  return n ? (i) => n({
    className: i,
    parseClassName: s
  }) : s;
}, pc = (e) => {
  if (e.length <= 1)
    return e;
  const t = [];
  let n = [];
  return e.forEach((r) => {
    r[0] === "[" ? (t.push(...n.sort(), r), n = []) : n.push(r);
  }), t.push(...n.sort()), t;
}, gc = (e) => ({
  cache: hc(e.cacheSize),
  parseClassName: mc(e),
  ...cc(e)
}), bc = /\s+/, vc = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: r,
    getConflictingClassGroupIds: o
  } = t, a = [], s = e.trim().split(bc);
  let i = "";
  for (let c = s.length - 1; c >= 0; c -= 1) {
    const l = s[c], {
      modifiers: d,
      hasImportantModifier: u,
      baseClassName: f,
      maybePostfixModifierPosition: h
    } = n(l);
    let y = !!h, m = r(y ? f.substring(0, h) : f);
    if (!m) {
      if (!y) {
        i = l + (i.length > 0 ? " " + i : i);
        continue;
      }
      if (m = r(f), !m) {
        i = l + (i.length > 0 ? " " + i : i);
        continue;
      }
      y = !1;
    }
    const b = pc(d).join(":"), v = u ? b + Xo : b, x = v + m;
    if (a.includes(x))
      continue;
    a.push(x);
    const w = o(m, y);
    for (let k = 0; k < w.length; ++k) {
      const M = w[k];
      a.push(v + M);
    }
    i = l + (i.length > 0 ? " " + i : i);
  }
  return i;
};
function yc() {
  let e = 0, t, n, r = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = Ko(t)) && (r && (r += " "), r += n);
  return r;
}
const Ko = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (t = Ko(e[r])) && (n && (n += " "), n += t);
  return n;
};
function wc(e, ...t) {
  let n, r, o, a = s;
  function s(c) {
    const l = t.reduce((d, u) => u(d), e());
    return n = gc(l), r = n.cache.get, o = n.cache.set, a = i, i(c);
  }
  function i(c) {
    const l = r(c);
    if (l)
      return l;
    const d = vc(c, n);
    return o(c, d), d;
  }
  return function() {
    return a(yc.apply(null, arguments));
  };
}
const ne = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, Qo = /^\[(?:([a-z-]+):)?(.+)\]$/i, xc = /^\d+\/\d+$/, Cc = /* @__PURE__ */ new Set(["px", "full", "screen"]), kc = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Mc = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Dc = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, Oc = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Sc = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Ve = (e) => kt(e) || Cc.has(e) || xc.test(e), Je = (e) => Et(e, "length", Wc), kt = (e) => !!e && !Number.isNaN(Number(e)), Ln = (e) => Et(e, "number", kt), It = (e) => !!e && Number.isInteger(Number(e)), Nc = (e) => e.endsWith("%") && kt(e.slice(0, -1)), j = (e) => Qo.test(e), et = (e) => kc.test(e), Pc = /* @__PURE__ */ new Set(["length", "size", "percentage"]), Ec = (e) => Et(e, Pc, Zo), Rc = (e) => Et(e, "position", Zo), Ac = /* @__PURE__ */ new Set(["image", "url"]), Tc = (e) => Et(e, Ac, $c), _c = (e) => Et(e, "", Ic), $t = () => !0, Et = (e, t, n) => {
  const r = Qo.exec(e);
  return r ? r[1] ? typeof t == "string" ? r[1] === t : t.has(r[1]) : n(r[2]) : !1;
}, Wc = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Mc.test(e) && !Dc.test(e)
), Zo = () => !1, Ic = (e) => Oc.test(e), $c = (e) => Sc.test(e), Fc = () => {
  const e = ne("colors"), t = ne("spacing"), n = ne("blur"), r = ne("brightness"), o = ne("borderColor"), a = ne("borderRadius"), s = ne("borderSpacing"), i = ne("borderWidth"), c = ne("contrast"), l = ne("grayscale"), d = ne("hueRotate"), u = ne("invert"), f = ne("gap"), h = ne("gradientColorStops"), y = ne("gradientColorStopPositions"), m = ne("inset"), b = ne("margin"), v = ne("opacity"), x = ne("padding"), w = ne("saturate"), k = ne("scale"), M = ne("sepia"), C = ne("skew"), D = ne("space"), A = ne("translate"), F = () => ["auto", "contain", "none"], T = () => ["auto", "hidden", "clip", "visible", "scroll"], I = () => ["auto", j, t], Y = () => [j, t], G = () => ["", Ve, Je], O = () => ["auto", kt, j], E = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], S = () => ["solid", "dashed", "dotted", "double", "none"], R = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], N = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], _ = () => ["", "0", j], $ = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], L = () => [kt, j];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [$t],
      spacing: [Ve, Je],
      blur: ["none", "", et, j],
      brightness: L(),
      borderColor: [e],
      borderRadius: ["none", "", "full", et, j],
      borderSpacing: Y(),
      borderWidth: G(),
      contrast: L(),
      grayscale: _(),
      hueRotate: L(),
      invert: _(),
      gap: Y(),
      gradientColorStops: [e],
      gradientColorStopPositions: [Nc, Je],
      inset: I(),
      margin: I(),
      opacity: L(),
      padding: Y(),
      saturate: L(),
      scale: L(),
      sepia: _(),
      skew: L(),
      space: Y(),
      translate: Y()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", j]
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
        columns: [et]
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
        object: [...E(), j]
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
        overscroll: F()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": F()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": F()
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
        z: ["auto", It, j]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: I()
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
        flex: ["1", "auto", "initial", "none", j]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: _()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: _()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", It, j]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [$t]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", It, j]
        }, j]
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
        "grid-rows": [$t]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [It, j]
        }, j]
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
        "auto-cols": ["auto", "min", "max", "fr", j]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", j]
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
        "space-x": [D]
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
        "space-y": [D]
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
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", j, t]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [j, t, "min", "max", "fit"]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [j, t, "none", "full", "min", "max", "fit", "prose", {
          screen: [et]
        }, et]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [j, t, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": [j, t, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [j, t, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [j, t, "auto", "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", et, Je]
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
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", Ln]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [$t]
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
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", j]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", kt, Ln]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", Ve, j]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", j]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", j]
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
        decoration: ["auto", "from-font", Ve, Je]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", Ve, j]
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
        indent: Y()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", j]
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
        content: ["none", j]
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
        bg: [...E(), Rc]
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
        bg: ["auto", "cover", "contain", Ec]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, Tc]
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
        "outline-offset": [Ve, j]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [Ve, Je]
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
        "ring-opacity": [v]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [Ve, Je]
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
        shadow: ["", "inner", "none", et, _c]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [$t]
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
        contrast: [c]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", et, j]
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
        "hue-rotate": [d]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [u]
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
        sepia: [M]
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
        "backdrop-hue-rotate": [d]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": [u]
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
        "backdrop-sepia": [M]
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
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", j]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: L()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", j]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: L()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", j]
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
        scale: [k]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [k]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [k]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [It, j]
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
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", j]
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", j]
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
        "scroll-m": Y()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": Y()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": Y()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": Y()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": Y()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": Y()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": Y()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": Y()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": Y()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": Y()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": Y()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": Y()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": Y()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": Y()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": Y()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": Y()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": Y()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": Y()
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
        "will-change": ["auto", "scroll", "contents", "transform", j]
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
        stroke: [Ve, Je, Ln]
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
}, Yc = /* @__PURE__ */ wc(Fc);
function W(...e) {
  return Yc(qo(e));
}
const ro = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, oo = qo, Ne = (e, t) => (n) => {
  var r;
  if ((t == null ? void 0 : t.variants) == null) return oo(e, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
  const { variants: o, defaultVariants: a } = t, s = Object.keys(o).map((l) => {
    const d = n == null ? void 0 : n[l], u = a == null ? void 0 : a[l];
    if (d === null) return null;
    const f = ro(d) || ro(u);
    return o[l][f];
  }), i = n && Object.entries(n).reduce((l, d) => {
    let [u, f] = d;
    return f === void 0 || (l[u] = f), l;
  }, {}), c = t == null || (r = t.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((l, d) => {
    let { class: u, className: f, ...h } = d;
    return Object.entries(h).every((y) => {
      let [m, b] = y;
      return Array.isArray(b) ? b.includes({
        ...a,
        ...i
      }[m]) : {
        ...a,
        ...i
      }[m] === b;
    }) ? [
      ...l,
      u,
      f
    ] : l;
  }, []);
  return oo(e, s, c, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
}, Bc = Ne(
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
), ot = it(
  ({ className: e, variant: t, size: n, ...r }, o) => /* @__PURE__ */ g(
    "button",
    {
      className: W(Bc({ variant: t, size: n, className: e })),
      ref: o,
      ...r
    }
  )
);
ot.displayName = "Button";
const Lc = {
  sm: "h-4 w-4",
  md: "h-8 w-8",
  lg: "h-16 w-16"
};
function xb({ size: e = "lg", className: t }) {
  return /* @__PURE__ */ g("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ g(
    "div",
    {
      className: W(
        Lc[e],
        "animate-spin rounded-full",
        "border-2 border-cms-gray-500 border-b-transparent",
        t
      )
    }
  ) });
}
const zc = Ne(
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
), Hc = ({
  className: e,
  isOpen: t
}) => /* @__PURE__ */ g(
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
    children: /* @__PURE__ */ g(
      "path",
      {
        d: "M8.75 0.75L4.57609 4.75L0.75 0.75",
        stroke: "currentColor",
        strokeWidth: "1.5",
        strokeLinecap: "round"
      }
    )
  }
), jc = ({ className: e }) => /* @__PURE__ */ g(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none",
    className: e,
    children: /* @__PURE__ */ g(
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
), mr = it(
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
    clearable: d = !1,
    multiple: u = !1,
    maxHeight: f = 200,
    ...h
  }, y) => {
    const [m, b] = ve(!1), [v, x] = ve(""), [w, k] = ve(
      u ? t ? [t] : [] : []
    ), M = Ct(null), C = Ct(null), D = e.find((O) => O.value === t), A = u ? w.length > 0 ? `${w.length}개 선택됨` : n : (D == null ? void 0 : D.label) || n, F = e.filter(
      (O) => O.label.toLowerCase().includes(v.toLowerCase())
    ), T = () => {
      o || (b(!m), x(""));
    }, I = (O) => {
      if (!O.disabled)
        if (u) {
          const E = w.includes(O.value) ? w.filter((S) => S !== O.value) : [...w, O.value];
          k(E), r == null || r(E.join(","));
        } else
          r == null || r(O.value), b(!1);
    }, Y = (O) => {
      O.stopPropagation(), u && k([]), r == null || r("");
    }, G = (O) => {
      O.key === "Escape" ? b(!1) : (O.key === "Enter" || O.key === " ") && (O.preventDefault(), T());
    };
    return Bt(() => {
      const O = (E) => {
        M.current && !M.current.contains(E.target) && b(!1);
      };
      return document.addEventListener("mousedown", O), () => document.removeEventListener("mousedown", O);
    }, []), Bt(() => {
      m && l && C.current && C.current.focus();
    }, [m, l]), /* @__PURE__ */ V("div", { ref: M, className: "relative w-full", children: [
      /* @__PURE__ */ V(
        "button",
        {
          ref: y,
          type: "button",
          className: W(
            zc({ variant: i, size: c }),
            o && "opacity-50 cursor-not-allowed",
            a
          ),
          onClick: T,
          onKeyDown: G,
          disabled: o,
          "aria-expanded": m,
          "aria-haspopup": "listbox",
          ...h,
          children: [
            /* @__PURE__ */ g(
              "span",
              {
                className: W(
                  "truncate flex-1 text-left",
                  !D && !u && "text-cms-gray-400"
                ),
                children: A
              }
            ),
            /* @__PURE__ */ V("div", { className: "flex items-center gap-2 ml-3", children: [
              d && (t || w.length > 0) && /* @__PURE__ */ g(
                "button",
                {
                  type: "button",
                  className: W(
                    "p-1 rounded text-cms-gray-400 transition-colors",
                    "hover:text-cms-black"
                  ),
                  onClick: Y,
                  "aria-label": "선택 취소",
                  children: /* @__PURE__ */ g(jc, { className: "w-3 h-3" })
                }
              ),
              /* @__PURE__ */ g(
                Hc,
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
          className: W(
            "absolute z-50 mt-1 py-1 w-full",
            "rounded-lg border border-cms-gray-400",
            "bg-white shadow-lg",
            s
          ),
          style: { maxHeight: `${f}px` },
          children: [
            l && /* @__PURE__ */ g("div", { className: "px-3 py-2 border-b border-cms-gray-400", children: /* @__PURE__ */ g(
              "input",
              {
                ref: C,
                type: "text",
                value: v,
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
            /* @__PURE__ */ g("div", { className: "max-h-48 overflow-y-auto", children: F.length === 0 ? /* @__PURE__ */ g("div", { className: "px-3 py-2 text-sm text-cms-gray-400 text-center", children: v ? "검색 결과가 없습니다" : "옵션이 없습니다" }) : F.map((O) => {
              const E = u ? w.includes(O.value) : t === O.value;
              return /* @__PURE__ */ V(
                "button",
                {
                  type: "button",
                  className: W(
                    "flex items-center justify-between gap-2",
                    "w-full px-3 py-2 ",
                    "text-left text-sm",
                    "transition-colors",
                    O.disabled ? "text-cms-gray-400 cursor-not-allowed" : "text-cms-black hover:bg-cms-gray-200 cursor-pointer",
                    E && "bg-cms-gray-400 font-medium"
                  ),
                  onClick: () => I(O),
                  disabled: O.disabled,
                  children: [
                    /* @__PURE__ */ g("span", { className: "truncate", children: O.label }),
                    E && /* @__PURE__ */ g(
                      "svg",
                      {
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "16",
                        height: "16",
                        viewBox: "0 0 16 16",
                        fill: "none",
                        className: "w-4 h-4 text-black shrink-0",
                        children: /* @__PURE__ */ g(
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
mr.displayName = "Dropdown";
const Vc = it(
  ({ label: e, helperText: t, error: n, required: r, className: o, ...a }, s) => /* @__PURE__ */ V("div", { className: W("space-y-1", o), children: [
    e && /* @__PURE__ */ V("label", { className: "block text-sm font-medium text-cms-black", children: [
      e,
      r && /* @__PURE__ */ g("span", { className: "text-cms-red-500 ml-1", children: "*" })
    ] }),
    /* @__PURE__ */ g(
      mr,
      {
        ref: s,
        ...a,
        className: W(n && "border-cms-red-500 focus:ring-cms-red-500")
      }
    ),
    (t || n) && /* @__PURE__ */ g(
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
Vc.displayName = "Select";
const Gc = it(
  ({ options: e, loading: t = !1, createable: n = !1, onCreateOption: r, ...o }, a) => {
    const [s] = ve(""), i = e.filter(
      (d) => d.label.toLowerCase().includes(s.toLowerCase())
    ), c = i.some(
      (d) => d.label.toLowerCase() === s.toLowerCase()
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
    return /* @__PURE__ */ g(
      mr,
      {
        ref: a,
        ...o,
        options: l,
        searchable: !0,
        dropdownClassName: W(t && "opacity-75", o.dropdownClassName),
        onValueChange: (d) => {
          var u;
          if (d.startsWith("__create__")) {
            const f = d.replace("__create__", "");
            r == null || r(f);
          } else
            (u = o.onValueChange) == null || u.call(o, d);
        }
      }
    );
  }
);
Gc.displayName = "Combobox";
function Cb(e) {
  return /* @__PURE__ */ g(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "20",
      height: "20",
      viewBox: "0 0 20 20",
      fill: "none",
      ...e,
      children: /* @__PURE__ */ g(
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
function ao(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function Jo(...e) {
  return (t) => {
    let n = !1;
    const r = e.map((o) => {
      const a = ao(o, t);
      return !n && typeof a == "function" && (n = !0), a;
    });
    if (n)
      return () => {
        for (let o = 0; o < r.length; o++) {
          const a = r[o];
          typeof a == "function" ? a() : ao(e[o], null);
        }
      };
  };
}
function ae(...e) {
  return p.useCallback(Jo(...e), e);
}
function qc(e, t) {
  const n = p.createContext(t), r = (a) => {
    const { children: s, ...i } = a, c = p.useMemo(() => i, Object.values(i));
    return /* @__PURE__ */ g(n.Provider, { value: c, children: s });
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
function Pe(e, t = []) {
  let n = [];
  function r(a, s) {
    const i = p.createContext(s), c = n.length;
    n = [...n, s];
    const l = (u) => {
      var v;
      const { scope: f, children: h, ...y } = u, m = ((v = f == null ? void 0 : f[e]) == null ? void 0 : v[c]) || i, b = p.useMemo(() => y, Object.values(y));
      return /* @__PURE__ */ g(m.Provider, { value: b, children: h });
    };
    l.displayName = a + "Provider";
    function d(u, f) {
      var m;
      const h = ((m = f == null ? void 0 : f[e]) == null ? void 0 : m[c]) || i, y = p.useContext(h);
      if (y) return y;
      if (s !== void 0) return s;
      throw new Error(`\`${u}\` must be used within \`${a}\``);
    }
    return [l, d];
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
  return o.scopeName = e, [r, Uc(o, ...t)];
}
function Uc(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((o) => ({
      useScope: o(),
      scopeName: o.scopeName
    }));
    return function(a) {
      const s = r.reduce((i, { useScope: c, scopeName: l }) => {
        const u = c(a)[`__scope${l}`];
        return { ...i, ...u };
      }, {});
      return p.useMemo(() => ({ [`__scope${t.scopeName}`]: s }), [s]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
// @__NO_SIDE_EFFECTS__
function Lt(e) {
  const t = /* @__PURE__ */ Xc(e), n = p.forwardRef((r, o) => {
    const { children: a, ...s } = r, i = p.Children.toArray(a), c = i.find(Qc);
    if (c) {
      const l = c.props.children, d = i.map((u) => u === c ? p.Children.count(l) > 1 ? p.Children.only(null) : p.isValidElement(l) ? l.props.children : null : u);
      return /* @__PURE__ */ g(t, { ...s, ref: o, children: p.isValidElement(l) ? p.cloneElement(l, void 0, d) : null });
    }
    return /* @__PURE__ */ g(t, { ...s, ref: o, children: a });
  });
  return n.displayName = `${e}.Slot`, n;
}
// @__NO_SIDE_EFFECTS__
function Xc(e) {
  const t = p.forwardRef((n, r) => {
    const { children: o, ...a } = n;
    if (p.isValidElement(o)) {
      const s = Jc(o), i = Zc(a, o.props);
      return o.type !== p.Fragment && (i.ref = r ? Jo(r, s) : s), p.cloneElement(o, i);
    }
    return p.Children.count(o) > 1 ? p.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var Kc = Symbol("radix.slottable");
function Qc(e) {
  return p.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Kc;
}
function Zc(e, t) {
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
function Jc(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var el = [
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
], K = el.reduce((e, t) => {
  const n = /* @__PURE__ */ Lt(`Primitive.${t}`), r = p.forwardRef((o, a) => {
    const { asChild: s, ...i } = o, c = s ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ g(c, { ...i, ref: a });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {});
function tl(e, t) {
  e && Vo.flushSync(() => e.dispatchEvent(t));
}
function ft(e) {
  const t = p.useRef(e);
  return p.useEffect(() => {
    t.current = e;
  }), p.useMemo(() => (...n) => {
    var r;
    return (r = t.current) == null ? void 0 : r.call(t, ...n);
  }, []);
}
function nl(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = ft(e);
  p.useEffect(() => {
    const r = (o) => {
      o.key === "Escape" && n(o);
    };
    return t.addEventListener("keydown", r, { capture: !0 }), () => t.removeEventListener("keydown", r, { capture: !0 });
  }, [n, t]);
}
var rl = "DismissableLayer", ar = "dismissableLayer.update", ol = "dismissableLayer.pointerDownOutside", al = "dismissableLayer.focusOutside", so, ea = p.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), pr = p.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: r,
      onPointerDownOutside: o,
      onFocusOutside: a,
      onInteractOutside: s,
      onDismiss: i,
      ...c
    } = e, l = p.useContext(ea), [d, u] = p.useState(null), f = (d == null ? void 0 : d.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), [, h] = p.useState({}), y = ae(t, (D) => u(D)), m = Array.from(l.layers), [b] = [...l.layersWithOutsidePointerEventsDisabled].slice(-1), v = m.indexOf(b), x = d ? m.indexOf(d) : -1, w = l.layersWithOutsidePointerEventsDisabled.size > 0, k = x >= v, M = cl((D) => {
      const A = D.target, F = [...l.branches].some((T) => T.contains(A));
      !k || F || (o == null || o(D), s == null || s(D), D.defaultPrevented || i == null || i());
    }, f), C = ll((D) => {
      const A = D.target;
      [...l.branches].some((T) => T.contains(A)) || (a == null || a(D), s == null || s(D), D.defaultPrevented || i == null || i());
    }, f);
    return nl((D) => {
      x === l.layers.size - 1 && (r == null || r(D), !D.defaultPrevented && i && (D.preventDefault(), i()));
    }, f), p.useEffect(() => {
      if (d)
        return n && (l.layersWithOutsidePointerEventsDisabled.size === 0 && (so = f.body.style.pointerEvents, f.body.style.pointerEvents = "none"), l.layersWithOutsidePointerEventsDisabled.add(d)), l.layers.add(d), io(), () => {
          n && l.layersWithOutsidePointerEventsDisabled.size === 1 && (f.body.style.pointerEvents = so);
        };
    }, [d, f, n, l]), p.useEffect(() => () => {
      d && (l.layers.delete(d), l.layersWithOutsidePointerEventsDisabled.delete(d), io());
    }, [d, l]), p.useEffect(() => {
      const D = () => h({});
      return document.addEventListener(ar, D), () => document.removeEventListener(ar, D);
    }, []), /* @__PURE__ */ g(
      K.div,
      {
        ...c,
        ref: y,
        style: {
          pointerEvents: w ? k ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: ee(e.onFocusCapture, C.onFocusCapture),
        onBlurCapture: ee(e.onBlurCapture, C.onBlurCapture),
        onPointerDownCapture: ee(
          e.onPointerDownCapture,
          M.onPointerDownCapture
        )
      }
    );
  }
);
pr.displayName = rl;
var sl = "DismissableLayerBranch", il = p.forwardRef((e, t) => {
  const n = p.useContext(ea), r = p.useRef(null), o = ae(t, r);
  return p.useEffect(() => {
    const a = r.current;
    if (a)
      return n.branches.add(a), () => {
        n.branches.delete(a);
      };
  }, [n.branches]), /* @__PURE__ */ g(K.div, { ...e, ref: o });
});
il.displayName = sl;
function cl(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = ft(e), r = p.useRef(!1), o = p.useRef(() => {
  });
  return p.useEffect(() => {
    const a = (i) => {
      if (i.target && !r.current) {
        let c = function() {
          ta(
            ol,
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
function ll(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = ft(e), r = p.useRef(!1);
  return p.useEffect(() => {
    const o = (a) => {
      a.target && !r.current && ta(al, n, { originalEvent: a }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o);
  }, [t, n]), {
    onFocusCapture: () => r.current = !0,
    onBlurCapture: () => r.current = !1
  };
}
function io() {
  const e = new CustomEvent(ar);
  document.dispatchEvent(e);
}
function ta(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target, a = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && o.addEventListener(e, t, { once: !0 }), r ? tl(o, a) : o.dispatchEvent(a);
}
var zn = 0;
function na() {
  p.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? co()), document.body.insertAdjacentElement("beforeend", e[1] ?? co()), zn++, () => {
      zn === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), zn--;
    };
  }, []);
}
function co() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var Hn = "focusScope.autoFocusOnMount", jn = "focusScope.autoFocusOnUnmount", lo = { bubbles: !1, cancelable: !0 }, dl = "FocusScope", gr = p.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: r = !1,
    onMountAutoFocus: o,
    onUnmountAutoFocus: a,
    ...s
  } = e, [i, c] = p.useState(null), l = ft(o), d = ft(a), u = p.useRef(null), f = ae(t, (m) => c(m)), h = p.useRef({
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
      let m = function(w) {
        if (h.paused || !i) return;
        const k = w.target;
        i.contains(k) ? u.current = k : nt(u.current, { select: !0 });
      }, b = function(w) {
        if (h.paused || !i) return;
        const k = w.relatedTarget;
        k !== null && (i.contains(k) || nt(u.current, { select: !0 }));
      }, v = function(w) {
        if (document.activeElement === document.body)
          for (const M of w)
            M.removedNodes.length > 0 && nt(i);
      };
      document.addEventListener("focusin", m), document.addEventListener("focusout", b);
      const x = new MutationObserver(v);
      return i && x.observe(i, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", m), document.removeEventListener("focusout", b), x.disconnect();
      };
    }
  }, [r, i, h.paused]), p.useEffect(() => {
    if (i) {
      fo.add(h);
      const m = document.activeElement;
      if (!i.contains(m)) {
        const v = new CustomEvent(Hn, lo);
        i.addEventListener(Hn, l), i.dispatchEvent(v), v.defaultPrevented || (ul(gl(ra(i)), { select: !0 }), document.activeElement === m && nt(i));
      }
      return () => {
        i.removeEventListener(Hn, l), setTimeout(() => {
          const v = new CustomEvent(jn, lo);
          i.addEventListener(jn, d), i.dispatchEvent(v), v.defaultPrevented || nt(m ?? document.body, { select: !0 }), i.removeEventListener(jn, d), fo.remove(h);
        }, 0);
      };
    }
  }, [i, l, d, h]);
  const y = p.useCallback(
    (m) => {
      if (!n && !r || h.paused) return;
      const b = m.key === "Tab" && !m.altKey && !m.ctrlKey && !m.metaKey, v = document.activeElement;
      if (b && v) {
        const x = m.currentTarget, [w, k] = fl(x);
        w && k ? !m.shiftKey && v === k ? (m.preventDefault(), n && nt(w, { select: !0 })) : m.shiftKey && v === w && (m.preventDefault(), n && nt(k, { select: !0 })) : v === x && m.preventDefault();
      }
    },
    [n, r, h.paused]
  );
  return /* @__PURE__ */ g(K.div, { tabIndex: -1, ...s, ref: f, onKeyDown: y });
});
gr.displayName = dl;
function ul(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if (nt(r, { select: t }), document.activeElement !== n) return;
}
function fl(e) {
  const t = ra(e), n = uo(t, e), r = uo(t.reverse(), e);
  return [n, r];
}
function ra(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function uo(e, t) {
  for (const n of e)
    if (!hl(n, { upTo: t })) return n;
}
function hl(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function ml(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function nt(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && ml(e) && t && e.select();
  }
}
var fo = pl();
function pl() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && (n == null || n.pause()), e = ho(e, t), e.unshift(t);
    },
    remove(t) {
      var n;
      e = ho(e, t), (n = e[0]) == null || n.resume();
    }
  };
}
function ho(e, t) {
  const n = [...e], r = n.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
function gl(e) {
  return e.filter((t) => t.tagName !== "A");
}
var Ue = globalThis != null && globalThis.document ? p.useLayoutEffect : () => {
}, bl = p[" useId ".trim().toString()] || (() => {
}), vl = 0;
function ut(e) {
  const [t, n] = p.useState(bl());
  return Ue(() => {
    n((r) => r ?? String(vl++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
const yl = ["top", "right", "bottom", "left"], at = Math.min, be = Math.max, un = Math.round, en = Math.floor, Le = (e) => ({
  x: e,
  y: e
}), wl = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, xl = {
  start: "end",
  end: "start"
};
function sr(e, t, n) {
  return be(e, at(t, n));
}
function Xe(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Ke(e) {
  return e.split("-")[0];
}
function Rt(e) {
  return e.split("-")[1];
}
function br(e) {
  return e === "x" ? "y" : "x";
}
function vr(e) {
  return e === "y" ? "height" : "width";
}
const Cl = /* @__PURE__ */ new Set(["top", "bottom"]);
function Fe(e) {
  return Cl.has(Ke(e)) ? "y" : "x";
}
function yr(e) {
  return br(Fe(e));
}
function kl(e, t, n) {
  n === void 0 && (n = !1);
  const r = Rt(e), o = yr(e), a = vr(o);
  let s = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[a] > t.floating[a] && (s = fn(s)), [s, fn(s)];
}
function Ml(e) {
  const t = fn(e);
  return [ir(e), t, ir(t)];
}
function ir(e) {
  return e.replace(/start|end/g, (t) => xl[t]);
}
const mo = ["left", "right"], po = ["right", "left"], Dl = ["top", "bottom"], Ol = ["bottom", "top"];
function Sl(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? po : mo : t ? mo : po;
    case "left":
    case "right":
      return t ? Dl : Ol;
    default:
      return [];
  }
}
function Nl(e, t, n, r) {
  const o = Rt(e);
  let a = Sl(Ke(e), n === "start", r);
  return o && (a = a.map((s) => s + "-" + o), t && (a = a.concat(a.map(ir)))), a;
}
function fn(e) {
  return e.replace(/left|right|bottom|top/g, (t) => wl[t]);
}
function Pl(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function oa(e) {
  return typeof e != "number" ? Pl(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function hn(e) {
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
function go(e, t, n) {
  let {
    reference: r,
    floating: o
  } = e;
  const a = Fe(t), s = yr(t), i = vr(s), c = Ke(t), l = a === "y", d = r.x + r.width / 2 - o.width / 2, u = r.y + r.height / 2 - o.height / 2, f = r[i] / 2 - o[i] / 2;
  let h;
  switch (c) {
    case "top":
      h = {
        x: d,
        y: r.y - o.height
      };
      break;
    case "bottom":
      h = {
        x: d,
        y: r.y + r.height
      };
      break;
    case "right":
      h = {
        x: r.x + r.width,
        y: u
      };
      break;
    case "left":
      h = {
        x: r.x - o.width,
        y: u
      };
      break;
    default:
      h = {
        x: r.x,
        y: r.y
      };
  }
  switch (Rt(t)) {
    case "start":
      h[s] -= f * (n && l ? -1 : 1);
      break;
    case "end":
      h[s] += f * (n && l ? -1 : 1);
      break;
  }
  return h;
}
const El = async (e, t, n) => {
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
    x: d,
    y: u
  } = go(l, r, c), f = r, h = {}, y = 0;
  for (let m = 0; m < i.length; m++) {
    const {
      name: b,
      fn: v
    } = i[m], {
      x,
      y: w,
      data: k,
      reset: M
    } = await v({
      x: d,
      y: u,
      initialPlacement: r,
      placement: f,
      strategy: o,
      middlewareData: h,
      rects: l,
      platform: s,
      elements: {
        reference: e,
        floating: t
      }
    });
    d = x ?? d, u = w ?? u, h = {
      ...h,
      [b]: {
        ...h[b],
        ...k
      }
    }, M && y <= 50 && (y++, typeof M == "object" && (M.placement && (f = M.placement), M.rects && (l = M.rects === !0 ? await s.getElementRects({
      reference: e,
      floating: t,
      strategy: o
    }) : M.rects), {
      x: d,
      y: u
    } = go(l, f, c)), m = -1);
  }
  return {
    x: d,
    y: u,
    placement: f,
    strategy: o,
    middlewareData: h
  };
};
async function zt(e, t) {
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
    rootBoundary: d = "viewport",
    elementContext: u = "floating",
    altBoundary: f = !1,
    padding: h = 0
  } = Xe(t, e), y = oa(h), b = i[f ? u === "floating" ? "reference" : "floating" : u], v = hn(await a.getClippingRect({
    element: (n = await (a.isElement == null ? void 0 : a.isElement(b))) == null || n ? b : b.contextElement || await (a.getDocumentElement == null ? void 0 : a.getDocumentElement(i.floating)),
    boundary: l,
    rootBoundary: d,
    strategy: c
  })), x = u === "floating" ? {
    x: r,
    y: o,
    width: s.floating.width,
    height: s.floating.height
  } : s.reference, w = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(i.floating)), k = await (a.isElement == null ? void 0 : a.isElement(w)) ? await (a.getScale == null ? void 0 : a.getScale(w)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, M = hn(a.convertOffsetParentRelativeRectToViewportRelativeRect ? await a.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: i,
    rect: x,
    offsetParent: w,
    strategy: c
  }) : x);
  return {
    top: (v.top - M.top + y.top) / k.y,
    bottom: (M.bottom - v.bottom + y.bottom) / k.y,
    left: (v.left - M.left + y.left) / k.x,
    right: (M.right - v.right + y.right) / k.x
  };
}
const Rl = (e) => ({
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
      padding: d = 0
    } = Xe(e, t) || {};
    if (l == null)
      return {};
    const u = oa(d), f = {
      x: n,
      y: r
    }, h = yr(o), y = vr(h), m = await s.getDimensions(l), b = h === "y", v = b ? "top" : "left", x = b ? "bottom" : "right", w = b ? "clientHeight" : "clientWidth", k = a.reference[y] + a.reference[h] - f[h] - a.floating[y], M = f[h] - a.reference[h], C = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(l));
    let D = C ? C[w] : 0;
    (!D || !await (s.isElement == null ? void 0 : s.isElement(C))) && (D = i.floating[w] || a.floating[y]);
    const A = k / 2 - M / 2, F = D / 2 - m[y] / 2 - 1, T = at(u[v], F), I = at(u[x], F), Y = T, G = D - m[y] - I, O = D / 2 - m[y] / 2 + A, E = sr(Y, O, G), S = !c.arrow && Rt(o) != null && O !== E && a.reference[y] / 2 - (O < Y ? T : I) - m[y] / 2 < 0, R = S ? O < Y ? O - Y : O - G : 0;
    return {
      [h]: f[h] + R,
      data: {
        [h]: E,
        centerOffset: O - E - R,
        ...S && {
          alignmentOffset: R
        }
      },
      reset: S
    };
  }
}), Al = function(e) {
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
        mainAxis: d = !0,
        crossAxis: u = !0,
        fallbackPlacements: f,
        fallbackStrategy: h = "bestFit",
        fallbackAxisSideDirection: y = "none",
        flipAlignment: m = !0,
        ...b
      } = Xe(e, t);
      if ((n = a.arrow) != null && n.alignmentOffset)
        return {};
      const v = Ke(o), x = Fe(i), w = Ke(i) === i, k = await (c.isRTL == null ? void 0 : c.isRTL(l.floating)), M = f || (w || !m ? [fn(i)] : Ml(i)), C = y !== "none";
      !f && C && M.push(...Nl(i, m, y, k));
      const D = [i, ...M], A = await zt(t, b), F = [];
      let T = ((r = a.flip) == null ? void 0 : r.overflows) || [];
      if (d && F.push(A[v]), u) {
        const O = kl(o, s, k);
        F.push(A[O[0]], A[O[1]]);
      }
      if (T = [...T, {
        placement: o,
        overflows: F
      }], !F.every((O) => O <= 0)) {
        var I, Y;
        const O = (((I = a.flip) == null ? void 0 : I.index) || 0) + 1, E = D[O];
        if (E && (!(u === "alignment" ? x !== Fe(E) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        T.every((N) => Fe(N.placement) === x ? N.overflows[0] > 0 : !0)))
          return {
            data: {
              index: O,
              overflows: T
            },
            reset: {
              placement: E
            }
          };
        let S = (Y = T.filter((R) => R.overflows[0] <= 0).sort((R, N) => R.overflows[1] - N.overflows[1])[0]) == null ? void 0 : Y.placement;
        if (!S)
          switch (h) {
            case "bestFit": {
              var G;
              const R = (G = T.filter((N) => {
                if (C) {
                  const _ = Fe(N.placement);
                  return _ === x || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  _ === "y";
                }
                return !0;
              }).map((N) => [N.placement, N.overflows.filter((_) => _ > 0).reduce((_, $) => _ + $, 0)]).sort((N, _) => N[1] - _[1])[0]) == null ? void 0 : G[0];
              R && (S = R);
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
function bo(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function vo(e) {
  return yl.some((t) => e[t] >= 0);
}
const Tl = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n
      } = t, {
        strategy: r = "referenceHidden",
        ...o
      } = Xe(e, t);
      switch (r) {
        case "referenceHidden": {
          const a = await zt(t, {
            ...o,
            elementContext: "reference"
          }), s = bo(a, n.reference);
          return {
            data: {
              referenceHiddenOffsets: s,
              referenceHidden: vo(s)
            }
          };
        }
        case "escaped": {
          const a = await zt(t, {
            ...o,
            altBoundary: !0
          }), s = bo(a, n.floating);
          return {
            data: {
              escapedOffsets: s,
              escaped: vo(s)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, aa = /* @__PURE__ */ new Set(["left", "top"]);
async function _l(e, t) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), s = Ke(n), i = Rt(n), c = Fe(n) === "y", l = aa.has(s) ? -1 : 1, d = a && c ? -1 : 1, u = Xe(t, e);
  let {
    mainAxis: f,
    crossAxis: h,
    alignmentAxis: y
  } = typeof u == "number" ? {
    mainAxis: u,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: u.mainAxis || 0,
    crossAxis: u.crossAxis || 0,
    alignmentAxis: u.alignmentAxis
  };
  return i && typeof y == "number" && (h = i === "end" ? y * -1 : y), c ? {
    x: h * d,
    y: f * l
  } : {
    x: f * l,
    y: h * d
  };
}
const Wl = function(e) {
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
      } = t, c = await _l(t, e);
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
}, Il = function(e) {
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
      } = Xe(e, t), l = {
        x: n,
        y: r
      }, d = await zt(t, c), u = Fe(Ke(o)), f = br(u);
      let h = l[f], y = l[u];
      if (a) {
        const b = f === "y" ? "top" : "left", v = f === "y" ? "bottom" : "right", x = h + d[b], w = h - d[v];
        h = sr(x, h, w);
      }
      if (s) {
        const b = u === "y" ? "top" : "left", v = u === "y" ? "bottom" : "right", x = y + d[b], w = y - d[v];
        y = sr(x, y, w);
      }
      const m = i.fn({
        ...t,
        [f]: h,
        [u]: y
      });
      return {
        ...m,
        data: {
          x: m.x - n,
          y: m.y - r,
          enabled: {
            [f]: a,
            [u]: s
          }
        }
      };
    }
  };
}, $l = function(e) {
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
      } = Xe(e, t), d = {
        x: n,
        y: r
      }, u = Fe(o), f = br(u);
      let h = d[f], y = d[u];
      const m = Xe(i, t), b = typeof m == "number" ? {
        mainAxis: m,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...m
      };
      if (c) {
        const w = f === "y" ? "height" : "width", k = a.reference[f] - a.floating[w] + b.mainAxis, M = a.reference[f] + a.reference[w] - b.mainAxis;
        h < k ? h = k : h > M && (h = M);
      }
      if (l) {
        var v, x;
        const w = f === "y" ? "width" : "height", k = aa.has(Ke(o)), M = a.reference[u] - a.floating[w] + (k && ((v = s.offset) == null ? void 0 : v[u]) || 0) + (k ? 0 : b.crossAxis), C = a.reference[u] + a.reference[w] + (k ? 0 : ((x = s.offset) == null ? void 0 : x[u]) || 0) - (k ? b.crossAxis : 0);
        y < M ? y = M : y > C && (y = C);
      }
      return {
        [f]: h,
        [u]: y
      };
    }
  };
}, Fl = function(e) {
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
      } = Xe(e, t), d = await zt(t, l), u = Ke(o), f = Rt(o), h = Fe(o) === "y", {
        width: y,
        height: m
      } = a.floating;
      let b, v;
      u === "top" || u === "bottom" ? (b = u, v = f === (await (s.isRTL == null ? void 0 : s.isRTL(i.floating)) ? "start" : "end") ? "left" : "right") : (v = u, b = f === "end" ? "top" : "bottom");
      const x = m - d.top - d.bottom, w = y - d.left - d.right, k = at(m - d[b], x), M = at(y - d[v], w), C = !t.middlewareData.shift;
      let D = k, A = M;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (A = w), (r = t.middlewareData.shift) != null && r.enabled.y && (D = x), C && !f) {
        const T = be(d.left, 0), I = be(d.right, 0), Y = be(d.top, 0), G = be(d.bottom, 0);
        h ? A = y - 2 * (T !== 0 || I !== 0 ? T + I : be(d.left, d.right)) : D = m - 2 * (Y !== 0 || G !== 0 ? Y + G : be(d.top, d.bottom));
      }
      await c({
        ...t,
        availableWidth: A,
        availableHeight: D
      });
      const F = await s.getDimensions(i.floating);
      return y !== F.width || m !== F.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function bn() {
  return typeof window < "u";
}
function At(e) {
  return sa(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function ye(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function He(e) {
  var t;
  return (t = (sa(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function sa(e) {
  return bn() ? e instanceof Node || e instanceof ye(e).Node : !1;
}
function Oe(e) {
  return bn() ? e instanceof Element || e instanceof ye(e).Element : !1;
}
function ze(e) {
  return bn() ? e instanceof HTMLElement || e instanceof ye(e).HTMLElement : !1;
}
function yo(e) {
  return !bn() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof ye(e).ShadowRoot;
}
const Yl = /* @__PURE__ */ new Set(["inline", "contents"]);
function Gt(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: o
  } = Se(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !Yl.has(o);
}
const Bl = /* @__PURE__ */ new Set(["table", "td", "th"]);
function Ll(e) {
  return Bl.has(At(e));
}
const zl = [":popover-open", ":modal"];
function vn(e) {
  return zl.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const Hl = ["transform", "translate", "scale", "rotate", "perspective"], jl = ["transform", "translate", "scale", "rotate", "perspective", "filter"], Vl = ["paint", "layout", "strict", "content"];
function wr(e) {
  const t = xr(), n = Oe(e) ? Se(e) : e;
  return Hl.some((r) => n[r] ? n[r] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || jl.some((r) => (n.willChange || "").includes(r)) || Vl.some((r) => (n.contain || "").includes(r));
}
function Gl(e) {
  let t = st(e);
  for (; ze(t) && !St(t); ) {
    if (wr(t))
      return t;
    if (vn(t))
      return null;
    t = st(t);
  }
  return null;
}
function xr() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const ql = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function St(e) {
  return ql.has(At(e));
}
function Se(e) {
  return ye(e).getComputedStyle(e);
}
function yn(e) {
  return Oe(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function st(e) {
  if (At(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    yo(e) && e.host || // Fallback.
    He(e)
  );
  return yo(t) ? t.host : t;
}
function ia(e) {
  const t = st(e);
  return St(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : ze(t) && Gt(t) ? t : ia(t);
}
function Ht(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = ia(e), a = o === ((r = e.ownerDocument) == null ? void 0 : r.body), s = ye(o);
  if (a) {
    const i = cr(s);
    return t.concat(s, s.visualViewport || [], Gt(o) ? o : [], i && n ? Ht(i) : []);
  }
  return t.concat(o, Ht(o, [], n));
}
function cr(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function ca(e) {
  const t = Se(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const o = ze(e), a = o ? e.offsetWidth : n, s = o ? e.offsetHeight : r, i = un(n) !== a || un(r) !== s;
  return i && (n = a, r = s), {
    width: n,
    height: r,
    $: i
  };
}
function Cr(e) {
  return Oe(e) ? e : e.contextElement;
}
function Mt(e) {
  const t = Cr(e);
  if (!ze(t))
    return Le(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: o,
    $: a
  } = ca(t);
  let s = (a ? un(n.width) : n.width) / r, i = (a ? un(n.height) : n.height) / o;
  return (!s || !Number.isFinite(s)) && (s = 1), (!i || !Number.isFinite(i)) && (i = 1), {
    x: s,
    y: i
  };
}
const Ul = /* @__PURE__ */ Le(0);
function la(e) {
  const t = ye(e);
  return !xr() || !t.visualViewport ? Ul : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function Xl(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== ye(e) ? !1 : t;
}
function ht(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), a = Cr(e);
  let s = Le(1);
  t && (r ? Oe(r) && (s = Mt(r)) : s = Mt(e));
  const i = Xl(a, n, r) ? la(a) : Le(0);
  let c = (o.left + i.x) / s.x, l = (o.top + i.y) / s.y, d = o.width / s.x, u = o.height / s.y;
  if (a) {
    const f = ye(a), h = r && Oe(r) ? ye(r) : r;
    let y = f, m = cr(y);
    for (; m && r && h !== y; ) {
      const b = Mt(m), v = m.getBoundingClientRect(), x = Se(m), w = v.left + (m.clientLeft + parseFloat(x.paddingLeft)) * b.x, k = v.top + (m.clientTop + parseFloat(x.paddingTop)) * b.y;
      c *= b.x, l *= b.y, d *= b.x, u *= b.y, c += w, l += k, y = ye(m), m = cr(y);
    }
  }
  return hn({
    width: d,
    height: u,
    x: c,
    y: l
  });
}
function wn(e, t) {
  const n = yn(e).scrollLeft;
  return t ? t.left + n : ht(He(e)).left + n;
}
function da(e, t) {
  const n = e.getBoundingClientRect(), r = n.left + t.scrollLeft - wn(e, n), o = n.top + t.scrollTop;
  return {
    x: r,
    y: o
  };
}
function Kl(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: r,
    strategy: o
  } = e;
  const a = o === "fixed", s = He(r), i = t ? vn(t.floating) : !1;
  if (r === s || i && a)
    return n;
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = Le(1);
  const d = Le(0), u = ze(r);
  if ((u || !u && !a) && ((At(r) !== "body" || Gt(s)) && (c = yn(r)), ze(r))) {
    const h = ht(r);
    l = Mt(r), d.x = h.x + r.clientLeft, d.y = h.y + r.clientTop;
  }
  const f = s && !u && !a ? da(s, c) : Le(0);
  return {
    width: n.width * l.x,
    height: n.height * l.y,
    x: n.x * l.x - c.scrollLeft * l.x + d.x + f.x,
    y: n.y * l.y - c.scrollTop * l.y + d.y + f.y
  };
}
function Ql(e) {
  return Array.from(e.getClientRects());
}
function Zl(e) {
  const t = He(e), n = yn(e), r = e.ownerDocument.body, o = be(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), a = be(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let s = -n.scrollLeft + wn(e);
  const i = -n.scrollTop;
  return Se(r).direction === "rtl" && (s += be(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: a,
    x: s,
    y: i
  };
}
const wo = 25;
function Jl(e, t) {
  const n = ye(e), r = He(e), o = n.visualViewport;
  let a = r.clientWidth, s = r.clientHeight, i = 0, c = 0;
  if (o) {
    a = o.width, s = o.height;
    const d = xr();
    (!d || d && t === "fixed") && (i = o.offsetLeft, c = o.offsetTop);
  }
  const l = wn(r);
  if (l <= 0) {
    const d = r.ownerDocument, u = d.body, f = getComputedStyle(u), h = d.compatMode === "CSS1Compat" && parseFloat(f.marginLeft) + parseFloat(f.marginRight) || 0, y = Math.abs(r.clientWidth - u.clientWidth - h);
    y <= wo && (a -= y);
  } else l <= wo && (a += l);
  return {
    width: a,
    height: s,
    x: i,
    y: c
  };
}
const ed = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function td(e, t) {
  const n = ht(e, !0, t === "fixed"), r = n.top + e.clientTop, o = n.left + e.clientLeft, a = ze(e) ? Mt(e) : Le(1), s = e.clientWidth * a.x, i = e.clientHeight * a.y, c = o * a.x, l = r * a.y;
  return {
    width: s,
    height: i,
    x: c,
    y: l
  };
}
function xo(e, t, n) {
  let r;
  if (t === "viewport")
    r = Jl(e, n);
  else if (t === "document")
    r = Zl(He(e));
  else if (Oe(t))
    r = td(t, n);
  else {
    const o = la(e);
    r = {
      x: t.x - o.x,
      y: t.y - o.y,
      width: t.width,
      height: t.height
    };
  }
  return hn(r);
}
function ua(e, t) {
  const n = st(e);
  return n === t || !Oe(n) || St(n) ? !1 : Se(n).position === "fixed" || ua(n, t);
}
function nd(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = Ht(e, [], !1).filter((i) => Oe(i) && At(i) !== "body"), o = null;
  const a = Se(e).position === "fixed";
  let s = a ? st(e) : e;
  for (; Oe(s) && !St(s); ) {
    const i = Se(s), c = wr(s);
    !c && i.position === "fixed" && (o = null), (a ? !c && !o : !c && i.position === "static" && !!o && ed.has(o.position) || Gt(s) && !c && ua(e, s)) ? r = r.filter((d) => d !== s) : o = i, s = st(s);
  }
  return t.set(e, r), r;
}
function rd(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = e;
  const s = [...n === "clippingAncestors" ? vn(t) ? [] : nd(t, this._c) : [].concat(n), r], i = s[0], c = s.reduce((l, d) => {
    const u = xo(t, d, o);
    return l.top = be(u.top, l.top), l.right = at(u.right, l.right), l.bottom = at(u.bottom, l.bottom), l.left = be(u.left, l.left), l;
  }, xo(t, i, o));
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top
  };
}
function od(e) {
  const {
    width: t,
    height: n
  } = ca(e);
  return {
    width: t,
    height: n
  };
}
function ad(e, t, n) {
  const r = ze(t), o = He(t), a = n === "fixed", s = ht(e, !0, a, t);
  let i = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = Le(0);
  function l() {
    c.x = wn(o);
  }
  if (r || !r && !a)
    if ((At(t) !== "body" || Gt(o)) && (i = yn(t)), r) {
      const h = ht(t, !0, a, t);
      c.x = h.x + t.clientLeft, c.y = h.y + t.clientTop;
    } else o && l();
  a && !r && o && l();
  const d = o && !r && !a ? da(o, i) : Le(0), u = s.left + i.scrollLeft - c.x - d.x, f = s.top + i.scrollTop - c.y - d.y;
  return {
    x: u,
    y: f,
    width: s.width,
    height: s.height
  };
}
function Vn(e) {
  return Se(e).position === "static";
}
function Co(e, t) {
  if (!ze(e) || Se(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return He(e) === n && (n = n.ownerDocument.body), n;
}
function fa(e, t) {
  const n = ye(e);
  if (vn(e))
    return n;
  if (!ze(e)) {
    let o = st(e);
    for (; o && !St(o); ) {
      if (Oe(o) && !Vn(o))
        return o;
      o = st(o);
    }
    return n;
  }
  let r = Co(e, t);
  for (; r && Ll(r) && Vn(r); )
    r = Co(r, t);
  return r && St(r) && Vn(r) && !wr(r) ? n : r || Gl(e) || n;
}
const sd = async function(e) {
  const t = this.getOffsetParent || fa, n = this.getDimensions, r = await n(e.floating);
  return {
    reference: ad(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function id(e) {
  return Se(e).direction === "rtl";
}
const cd = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Kl,
  getDocumentElement: He,
  getClippingRect: rd,
  getOffsetParent: fa,
  getElementRects: sd,
  getClientRects: Ql,
  getDimensions: od,
  getScale: Mt,
  isElement: Oe,
  isRTL: id
};
function ha(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function ld(e, t) {
  let n = null, r;
  const o = He(e);
  function a() {
    var i;
    clearTimeout(r), (i = n) == null || i.disconnect(), n = null;
  }
  function s(i, c) {
    i === void 0 && (i = !1), c === void 0 && (c = 1), a();
    const l = e.getBoundingClientRect(), {
      left: d,
      top: u,
      width: f,
      height: h
    } = l;
    if (i || t(), !f || !h)
      return;
    const y = en(u), m = en(o.clientWidth - (d + f)), b = en(o.clientHeight - (u + h)), v = en(d), w = {
      rootMargin: -y + "px " + -m + "px " + -b + "px " + -v + "px",
      threshold: be(0, at(1, c)) || 1
    };
    let k = !0;
    function M(C) {
      const D = C[0].intersectionRatio;
      if (D !== c) {
        if (!k)
          return s();
        D ? s(!1, D) : r = setTimeout(() => {
          s(!1, 1e-7);
        }, 1e3);
      }
      D === 1 && !ha(l, e.getBoundingClientRect()) && s(), k = !1;
    }
    try {
      n = new IntersectionObserver(M, {
        ...w,
        // Handle <iframe>s
        root: o.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(M, w);
    }
    n.observe(e);
  }
  return s(!0), a;
}
function dd(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: a = !0,
    elementResize: s = typeof ResizeObserver == "function",
    layoutShift: i = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = r, l = Cr(e), d = o || a ? [...l ? Ht(l) : [], ...Ht(t)] : [];
  d.forEach((v) => {
    o && v.addEventListener("scroll", n, {
      passive: !0
    }), a && v.addEventListener("resize", n);
  });
  const u = l && i ? ld(l, n) : null;
  let f = -1, h = null;
  s && (h = new ResizeObserver((v) => {
    let [x] = v;
    x && x.target === l && h && (h.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
      var w;
      (w = h) == null || w.observe(t);
    })), n();
  }), l && !c && h.observe(l), h.observe(t));
  let y, m = c ? ht(e) : null;
  c && b();
  function b() {
    const v = ht(e);
    m && !ha(m, v) && n(), m = v, y = requestAnimationFrame(b);
  }
  return n(), () => {
    var v;
    d.forEach((x) => {
      o && x.removeEventListener("scroll", n), a && x.removeEventListener("resize", n);
    }), u == null || u(), (v = h) == null || v.disconnect(), h = null, c && cancelAnimationFrame(y);
  };
}
const ud = Wl, fd = Il, hd = Al, md = Fl, pd = Tl, ko = Rl, gd = $l, bd = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: cd,
    ...n
  }, a = {
    ...o.platform,
    _c: r
  };
  return El(e, t, {
    ...o,
    platform: a
  });
};
var vd = typeof document < "u", yd = function() {
}, sn = vd ? jo : yd;
function mn(e, t) {
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
        if (!mn(e[r], t[r]))
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
      if (!(a === "_owner" && e.$$typeof) && !mn(e[a], t[a]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function ma(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Mo(e, t) {
  const n = ma(e);
  return Math.round(t * n) / n;
}
function Gn(e) {
  const t = p.useRef(e);
  return sn(() => {
    t.current = e;
  }), t;
}
function wd(e) {
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
  } = e, [d, u] = p.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [f, h] = p.useState(r);
  mn(f, r) || h(r);
  const [y, m] = p.useState(null), [b, v] = p.useState(null), x = p.useCallback((N) => {
    N !== C.current && (C.current = N, m(N));
  }, []), w = p.useCallback((N) => {
    N !== D.current && (D.current = N, v(N));
  }, []), k = a || y, M = s || b, C = p.useRef(null), D = p.useRef(null), A = p.useRef(d), F = c != null, T = Gn(c), I = Gn(o), Y = Gn(l), G = p.useCallback(() => {
    if (!C.current || !D.current)
      return;
    const N = {
      placement: t,
      strategy: n,
      middleware: f
    };
    I.current && (N.platform = I.current), bd(C.current, D.current, N).then((_) => {
      const $ = {
        ..._,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: Y.current !== !1
      };
      O.current && !mn(A.current, $) && (A.current = $, Vo.flushSync(() => {
        u($);
      }));
    });
  }, [f, t, n, I, Y]);
  sn(() => {
    l === !1 && A.current.isPositioned && (A.current.isPositioned = !1, u((N) => ({
      ...N,
      isPositioned: !1
    })));
  }, [l]);
  const O = p.useRef(!1);
  sn(() => (O.current = !0, () => {
    O.current = !1;
  }), []), sn(() => {
    if (k && (C.current = k), M && (D.current = M), k && M) {
      if (T.current)
        return T.current(k, M, G);
      G();
    }
  }, [k, M, G, T, F]);
  const E = p.useMemo(() => ({
    reference: C,
    floating: D,
    setReference: x,
    setFloating: w
  }), [x, w]), S = p.useMemo(() => ({
    reference: k,
    floating: M
  }), [k, M]), R = p.useMemo(() => {
    const N = {
      position: n,
      left: 0,
      top: 0
    };
    if (!S.floating)
      return N;
    const _ = Mo(S.floating, d.x), $ = Mo(S.floating, d.y);
    return i ? {
      ...N,
      transform: "translate(" + _ + "px, " + $ + "px)",
      ...ma(S.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: _,
      top: $
    };
  }, [n, i, S.floating, d.x, d.y]);
  return p.useMemo(() => ({
    ...d,
    update: G,
    refs: E,
    elements: S,
    floatingStyles: R
  }), [d, G, E, S, R]);
}
const xd = (e) => {
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
      return r && t(r) ? r.current != null ? ko({
        element: r.current,
        padding: o
      }).fn(n) : {} : r ? ko({
        element: r,
        padding: o
      }).fn(n) : {};
    }
  };
}, Cd = (e, t) => ({
  ...ud(e),
  options: [e, t]
}), kd = (e, t) => ({
  ...fd(e),
  options: [e, t]
}), Md = (e, t) => ({
  ...gd(e),
  options: [e, t]
}), Dd = (e, t) => ({
  ...hd(e),
  options: [e, t]
}), Od = (e, t) => ({
  ...md(e),
  options: [e, t]
}), Sd = (e, t) => ({
  ...pd(e),
  options: [e, t]
}), Nd = (e, t) => ({
  ...xd(e),
  options: [e, t]
});
var Pd = "Arrow", pa = p.forwardRef((e, t) => {
  const { children: n, width: r = 10, height: o = 5, ...a } = e;
  return /* @__PURE__ */ g(
    K.svg,
    {
      ...a,
      ref: t,
      width: r,
      height: o,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? n : /* @__PURE__ */ g("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
pa.displayName = Pd;
var Ed = pa;
function xn(e) {
  const [t, n] = p.useState(void 0);
  return Ue(() => {
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
var kr = "Popper", [ga, ba] = Pe(kr), [Rd, va] = ga(kr), ya = (e) => {
  const { __scopePopper: t, children: n } = e, [r, o] = p.useState(null);
  return /* @__PURE__ */ g(Rd, { scope: t, anchor: r, onAnchorChange: o, children: n });
};
ya.displayName = kr;
var wa = "PopperAnchor", xa = p.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: r, ...o } = e, a = va(wa, n), s = p.useRef(null), i = ae(t, s), c = p.useRef(null);
    return p.useEffect(() => {
      const l = c.current;
      c.current = (r == null ? void 0 : r.current) || s.current, l !== c.current && a.onAnchorChange(c.current);
    }), r ? null : /* @__PURE__ */ g(K.div, { ...o, ref: i });
  }
);
xa.displayName = wa;
var Mr = "PopperContent", [Ad, Td] = ga(Mr), Ca = p.forwardRef(
  (e, t) => {
    var fe, Ae, he, se, me, Te;
    const {
      __scopePopper: n,
      side: r = "bottom",
      sideOffset: o = 0,
      align: a = "center",
      alignOffset: s = 0,
      arrowPadding: i = 0,
      avoidCollisions: c = !0,
      collisionBoundary: l = [],
      collisionPadding: d = 0,
      sticky: u = "partial",
      hideWhenDetached: f = !1,
      updatePositionStrategy: h = "optimized",
      onPlaced: y,
      ...m
    } = e, b = va(Mr, n), [v, x] = p.useState(null), w = ae(t, (we) => x(we)), [k, M] = p.useState(null), C = xn(k), D = (C == null ? void 0 : C.width) ?? 0, A = (C == null ? void 0 : C.height) ?? 0, F = r + (a !== "center" ? "-" + a : ""), T = typeof d == "number" ? d : { top: 0, right: 0, bottom: 0, left: 0, ...d }, I = Array.isArray(l) ? l : [l], Y = I.length > 0, G = {
      padding: T,
      boundary: I.filter(Wd),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: Y
    }, { refs: O, floatingStyles: E, placement: S, isPositioned: R, middlewareData: N } = wd({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: F,
      whileElementsMounted: (...we) => dd(...we, {
        animationFrame: h === "always"
      }),
      elements: {
        reference: b.anchor
      },
      middleware: [
        Cd({ mainAxis: o + A, alignmentAxis: s }),
        c && kd({
          mainAxis: !0,
          crossAxis: !1,
          limiter: u === "partial" ? Md() : void 0,
          ...G
        }),
        c && Dd({ ...G }),
        Od({
          ...G,
          apply: ({ elements: we, rects: Zt, availableWidth: Jt, availableHeight: _n }) => {
            const { width: Wn, height: In } = Zt.reference, pt = we.floating.style;
            pt.setProperty("--radix-popper-available-width", `${Jt}px`), pt.setProperty("--radix-popper-available-height", `${_n}px`), pt.setProperty("--radix-popper-anchor-width", `${Wn}px`), pt.setProperty("--radix-popper-anchor-height", `${In}px`);
          }
        }),
        k && Nd({ element: k, padding: i }),
        Id({ arrowWidth: D, arrowHeight: A }),
        f && Sd({ strategy: "referenceHidden", ...G })
      ]
    }), [_, $] = Da(S), L = ft(y);
    Ue(() => {
      R && (L == null || L());
    }, [R, L]);
    const J = (fe = N.arrow) == null ? void 0 : fe.x, te = (Ae = N.arrow) == null ? void 0 : Ae.y, re = ((he = N.arrow) == null ? void 0 : he.centerOffset) !== 0, [le, ke] = p.useState();
    return Ue(() => {
      v && ke(window.getComputedStyle(v).zIndex);
    }, [v]), /* @__PURE__ */ g(
      "div",
      {
        ref: O.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...E,
          transform: R ? E.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: le,
          "--radix-popper-transform-origin": [
            (se = N.transformOrigin) == null ? void 0 : se.x,
            (me = N.transformOrigin) == null ? void 0 : me.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...((Te = N.hide) == null ? void 0 : Te.referenceHidden) && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: e.dir,
        children: /* @__PURE__ */ g(
          Ad,
          {
            scope: n,
            placedSide: _,
            onArrowChange: M,
            arrowX: J,
            arrowY: te,
            shouldHideArrow: re,
            children: /* @__PURE__ */ g(
              K.div,
              {
                "data-side": _,
                "data-align": $,
                ...m,
                ref: w,
                style: {
                  ...m.style,
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
Ca.displayName = Mr;
var ka = "PopperArrow", _d = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, Ma = p.forwardRef(function(t, n) {
  const { __scopePopper: r, ...o } = t, a = Td(ka, r), s = _d[a.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ g(
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
        children: /* @__PURE__ */ g(
          Ed,
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
Ma.displayName = ka;
function Wd(e) {
  return e !== null;
}
var Id = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    var b, v, x;
    const { placement: n, rects: r, middlewareData: o } = t, s = ((b = o.arrow) == null ? void 0 : b.centerOffset) !== 0, i = s ? 0 : e.arrowWidth, c = s ? 0 : e.arrowHeight, [l, d] = Da(n), u = { start: "0%", center: "50%", end: "100%" }[d], f = (((v = o.arrow) == null ? void 0 : v.x) ?? 0) + i / 2, h = (((x = o.arrow) == null ? void 0 : x.y) ?? 0) + c / 2;
    let y = "", m = "";
    return l === "bottom" ? (y = s ? u : `${f}px`, m = `${-c}px`) : l === "top" ? (y = s ? u : `${f}px`, m = `${r.floating.height + c}px`) : l === "right" ? (y = `${-c}px`, m = s ? u : `${h}px`) : l === "left" && (y = `${r.floating.width + c}px`, m = s ? u : `${h}px`), { data: { x: y, y: m } };
  }
});
function Da(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var $d = ya, Oa = xa, Fd = Ca, Yd = Ma, Bd = "Portal", Dr = p.forwardRef((e, t) => {
  var i;
  const { container: n, ...r } = e, [o, a] = p.useState(!1);
  Ue(() => a(!0), []);
  const s = n || o && ((i = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : i.body);
  return s ? ic.createPortal(/* @__PURE__ */ g(K.div, { ...r, ref: t }), s) : null;
});
Dr.displayName = Bd;
function Ld(e, t) {
  return p.useReducer((n, r) => t[n][r] ?? n, e);
}
var Qe = (e) => {
  const { present: t, children: n } = e, r = zd(t), o = typeof n == "function" ? n({ present: r.isPresent }) : p.Children.only(n), a = ae(r.ref, Hd(o));
  return typeof n == "function" || r.isPresent ? p.cloneElement(o, { ref: a }) : null;
};
Qe.displayName = "Presence";
function zd(e) {
  const [t, n] = p.useState(), r = p.useRef(null), o = p.useRef(e), a = p.useRef("none"), s = e ? "mounted" : "unmounted", [i, c] = Ld(s, {
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
    const l = tn(r.current);
    a.current = i === "mounted" ? l : "none";
  }, [i]), Ue(() => {
    const l = r.current, d = o.current;
    if (d !== e) {
      const f = a.current, h = tn(l);
      e ? c("MOUNT") : h === "none" || (l == null ? void 0 : l.display) === "none" ? c("UNMOUNT") : c(d && f !== h ? "ANIMATION_OUT" : "UNMOUNT"), o.current = e;
    }
  }, [e, c]), Ue(() => {
    if (t) {
      let l;
      const d = t.ownerDocument.defaultView ?? window, u = (h) => {
        const m = tn(r.current).includes(CSS.escape(h.animationName));
        if (h.target === t && m && (c("ANIMATION_END"), !o.current)) {
          const b = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", l = d.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = b);
          });
        }
      }, f = (h) => {
        h.target === t && (a.current = tn(r.current));
      };
      return t.addEventListener("animationstart", f), t.addEventListener("animationcancel", u), t.addEventListener("animationend", u), () => {
        d.clearTimeout(l), t.removeEventListener("animationstart", f), t.removeEventListener("animationcancel", u), t.removeEventListener("animationend", u);
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
function tn(e) {
  return (e == null ? void 0 : e.animationName) || "none";
}
function Hd(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var jd = p[" useInsertionEffect ".trim().toString()] || Ue;
function Ze({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: r
}) {
  const [o, a, s] = Vd({
    defaultProp: t,
    onChange: n
  }), i = e !== void 0, c = i ? e : o;
  {
    const d = p.useRef(e !== void 0);
    p.useEffect(() => {
      const u = d.current;
      u !== i && console.warn(
        `${r} is changing from ${u ? "controlled" : "uncontrolled"} to ${i ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), d.current = i;
    }, [i, r]);
  }
  const l = p.useCallback(
    (d) => {
      var u;
      if (i) {
        const f = Gd(d) ? d(e) : d;
        f !== e && ((u = s.current) == null || u.call(s, f));
      } else
        a(d);
    },
    [i, e, a, s]
  );
  return [c, l];
}
function Vd({
  defaultProp: e,
  onChange: t
}) {
  const [n, r] = p.useState(e), o = p.useRef(n), a = p.useRef(t);
  return jd(() => {
    a.current = t;
  }, [t]), p.useEffect(() => {
    var s;
    o.current !== n && ((s = a.current) == null || s.call(a, n), o.current = n);
  }, [n, o]), [n, r, a];
}
function Gd(e) {
  return typeof e == "function";
}
var qd = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, gt = /* @__PURE__ */ new WeakMap(), nn = /* @__PURE__ */ new WeakMap(), rn = {}, qn = 0, Sa = function(e) {
  return e && (e.host || Sa(e.parentNode));
}, Ud = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var r = Sa(n);
    return r && e.contains(r) ? r : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, Xd = function(e, t, n, r) {
  var o = Ud(t, Array.isArray(e) ? e : [e]);
  rn[n] || (rn[n] = /* @__PURE__ */ new WeakMap());
  var a = rn[n], s = [], i = /* @__PURE__ */ new Set(), c = new Set(o), l = function(u) {
    !u || i.has(u) || (i.add(u), l(u.parentNode));
  };
  o.forEach(l);
  var d = function(u) {
    !u || c.has(u) || Array.prototype.forEach.call(u.children, function(f) {
      if (i.has(f))
        d(f);
      else
        try {
          var h = f.getAttribute(r), y = h !== null && h !== "false", m = (gt.get(f) || 0) + 1, b = (a.get(f) || 0) + 1;
          gt.set(f, m), a.set(f, b), s.push(f), m === 1 && y && nn.set(f, !0), b === 1 && f.setAttribute(n, "true"), y || f.setAttribute(r, "true");
        } catch (v) {
          console.error("aria-hidden: cannot operate on ", f, v);
        }
    });
  };
  return d(t), i.clear(), qn++, function() {
    s.forEach(function(u) {
      var f = gt.get(u) - 1, h = a.get(u) - 1;
      gt.set(u, f), a.set(u, h), f || (nn.has(u) || u.removeAttribute(r), nn.delete(u)), h || u.removeAttribute(n);
    }), qn--, qn || (gt = /* @__PURE__ */ new WeakMap(), gt = /* @__PURE__ */ new WeakMap(), nn = /* @__PURE__ */ new WeakMap(), rn = {});
  };
}, Na = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var r = Array.from(Array.isArray(e) ? e : [e]), o = qd(e);
  return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live], script"))), Xd(r, o, n, "aria-hidden")) : function() {
    return null;
  };
}, We = function() {
  return We = Object.assign || function(t) {
    for (var n, r = 1, o = arguments.length; r < o; r++) {
      n = arguments[r];
      for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (t[a] = n[a]);
    }
    return t;
  }, We.apply(this, arguments);
};
function Pa(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  return n;
}
function Kd(e, t, n) {
  if (n || arguments.length === 2) for (var r = 0, o = t.length, a; r < o; r++)
    (a || !(r in t)) && (a || (a = Array.prototype.slice.call(t, 0, r)), a[r] = t[r]);
  return e.concat(a || Array.prototype.slice.call(t));
}
var cn = "right-scroll-bar-position", ln = "width-before-scroll-bar", Qd = "with-scroll-bars-hidden", Zd = "--removed-body-scroll-bar-size";
function Un(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function Jd(e, t) {
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
var eu = typeof window < "u" ? p.useLayoutEffect : p.useEffect, Do = /* @__PURE__ */ new WeakMap();
function tu(e, t) {
  var n = Jd(null, function(r) {
    return e.forEach(function(o) {
      return Un(o, r);
    });
  });
  return eu(function() {
    var r = Do.get(n);
    if (r) {
      var o = new Set(r), a = new Set(e), s = n.current;
      o.forEach(function(i) {
        a.has(i) || Un(i, null);
      }), a.forEach(function(i) {
        o.has(i) || Un(i, s);
      });
    }
    Do.set(n, e);
  }, [e]), n;
}
function nu(e) {
  return e;
}
function ru(e, t) {
  t === void 0 && (t = nu);
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
        var d = s;
        s = [], d.forEach(a);
      }, l = function() {
        return Promise.resolve().then(c);
      };
      l(), n = {
        push: function(d) {
          s.push(d), l();
        },
        filter: function(d) {
          return s = s.filter(d), n;
        }
      };
    }
  };
  return o;
}
function ou(e) {
  e === void 0 && (e = {});
  var t = ru(null);
  return t.options = We({ async: !0, ssr: !1 }, e), t;
}
var Ea = function(e) {
  var t = e.sideCar, n = Pa(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = t.read();
  if (!r)
    throw new Error("Sidecar medium not found");
  return p.createElement(r, We({}, n));
};
Ea.isSideCarExport = !0;
function au(e, t) {
  return e.useMedium(t), Ea;
}
var Ra = ou(), Xn = function() {
}, Cn = p.forwardRef(function(e, t) {
  var n = p.useRef(null), r = p.useState({
    onScrollCapture: Xn,
    onWheelCapture: Xn,
    onTouchMoveCapture: Xn
  }), o = r[0], a = r[1], s = e.forwardProps, i = e.children, c = e.className, l = e.removeScrollBar, d = e.enabled, u = e.shards, f = e.sideCar, h = e.noRelative, y = e.noIsolation, m = e.inert, b = e.allowPinchZoom, v = e.as, x = v === void 0 ? "div" : v, w = e.gapMode, k = Pa(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), M = f, C = tu([n, t]), D = We(We({}, k), o);
  return p.createElement(
    p.Fragment,
    null,
    d && p.createElement(M, { sideCar: Ra, removeScrollBar: l, shards: u, noRelative: h, noIsolation: y, inert: m, setCallbacks: a, allowPinchZoom: !!b, lockRef: n, gapMode: w }),
    s ? p.cloneElement(p.Children.only(i), We(We({}, D), { ref: C })) : p.createElement(x, We({}, D, { className: c, ref: C }), i)
  );
});
Cn.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
Cn.classNames = {
  fullWidth: ln,
  zeroRight: cn
};
var su = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function iu() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = su();
  return t && e.setAttribute("nonce", t), e;
}
function cu(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function lu(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var du = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = iu()) && (cu(t, n), lu(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, uu = function() {
  var e = du();
  return function(t, n) {
    p.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, Aa = function() {
  var e = uu(), t = function(n) {
    var r = n.styles, o = n.dynamic;
    return e(r, o), null;
  };
  return t;
}, fu = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, Kn = function(e) {
  return parseInt(e || "", 10) || 0;
}, hu = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [Kn(n), Kn(r), Kn(o)];
}, mu = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return fu;
  var t = hu(e), n = document.documentElement.clientWidth, r = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, r - n + t[2] - t[0])
  };
}, pu = Aa(), Dt = "data-scroll-locked", gu = function(e, t, n, r) {
  var o = e.left, a = e.top, s = e.right, i = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(Qd, ` {
   overflow: hidden `).concat(r, `;
   padding-right: `).concat(i, "px ").concat(r, `;
  }
  body[`).concat(Dt, `] {
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
  
  .`).concat(cn, ` {
    right: `).concat(i, "px ").concat(r, `;
  }
  
  .`).concat(ln, ` {
    margin-right: `).concat(i, "px ").concat(r, `;
  }
  
  .`).concat(cn, " .").concat(cn, ` {
    right: 0 `).concat(r, `;
  }
  
  .`).concat(ln, " .").concat(ln, ` {
    margin-right: 0 `).concat(r, `;
  }
  
  body[`).concat(Dt, `] {
    `).concat(Zd, ": ").concat(i, `px;
  }
`);
}, Oo = function() {
  var e = parseInt(document.body.getAttribute(Dt) || "0", 10);
  return isFinite(e) ? e : 0;
}, bu = function() {
  p.useEffect(function() {
    return document.body.setAttribute(Dt, (Oo() + 1).toString()), function() {
      var e = Oo() - 1;
      e <= 0 ? document.body.removeAttribute(Dt) : document.body.setAttribute(Dt, e.toString());
    };
  }, []);
}, vu = function(e) {
  var t = e.noRelative, n = e.noImportant, r = e.gapMode, o = r === void 0 ? "margin" : r;
  bu();
  var a = p.useMemo(function() {
    return mu(o);
  }, [o]);
  return p.createElement(pu, { styles: gu(a, !t, o, n ? "" : "!important") });
}, lr = !1;
if (typeof window < "u")
  try {
    var on = Object.defineProperty({}, "passive", {
      get: function() {
        return lr = !0, !0;
      }
    });
    window.addEventListener("test", on, on), window.removeEventListener("test", on, on);
  } catch {
    lr = !1;
  }
var bt = lr ? { passive: !1 } : !1, yu = function(e) {
  return e.tagName === "TEXTAREA";
}, Ta = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !yu(e) && n[t] === "visible")
  );
}, wu = function(e) {
  return Ta(e, "overflowY");
}, xu = function(e) {
  return Ta(e, "overflowX");
}, So = function(e, t) {
  var n = t.ownerDocument, r = t;
  do {
    typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
    var o = _a(e, r);
    if (o) {
      var a = Wa(e, r), s = a[1], i = a[2];
      if (s > i)
        return !0;
    }
    r = r.parentNode;
  } while (r && r !== n.body);
  return !1;
}, Cu = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, r = e.clientHeight;
  return [
    t,
    n,
    r
  ];
}, ku = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, r = e.clientWidth;
  return [
    t,
    n,
    r
  ];
}, _a = function(e, t) {
  return e === "v" ? wu(t) : xu(t);
}, Wa = function(e, t) {
  return e === "v" ? Cu(t) : ku(t);
}, Mu = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, Du = function(e, t, n, r, o) {
  var a = Mu(e, window.getComputedStyle(t).direction), s = a * r, i = n.target, c = t.contains(i), l = !1, d = s > 0, u = 0, f = 0;
  do {
    if (!i)
      break;
    var h = Wa(e, i), y = h[0], m = h[1], b = h[2], v = m - b - a * y;
    (y || v) && _a(e, i) && (u += v, f += y);
    var x = i.parentNode;
    i = x && x.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? x.host : x;
  } while (
    // portaled content
    !c && i !== document.body || // self content
    c && (t.contains(i) || t === i)
  );
  return (d && Math.abs(u) < 1 || !d && Math.abs(f) < 1) && (l = !0), l;
}, an = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, No = function(e) {
  return [e.deltaX, e.deltaY];
}, Po = function(e) {
  return e && "current" in e ? e.current : e;
}, Ou = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, Su = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, Nu = 0, vt = [];
function Pu(e) {
  var t = p.useRef([]), n = p.useRef([0, 0]), r = p.useRef(), o = p.useState(Nu++)[0], a = p.useState(Aa)[0], s = p.useRef(e);
  p.useEffect(function() {
    s.current = e;
  }, [e]), p.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var m = Kd([e.lockRef.current], (e.shards || []).map(Po), !0).filter(Boolean);
      return m.forEach(function(b) {
        return b.classList.add("allow-interactivity-".concat(o));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(o)), m.forEach(function(b) {
          return b.classList.remove("allow-interactivity-".concat(o));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var i = p.useCallback(function(m, b) {
    if ("touches" in m && m.touches.length === 2 || m.type === "wheel" && m.ctrlKey)
      return !s.current.allowPinchZoom;
    var v = an(m), x = n.current, w = "deltaX" in m ? m.deltaX : x[0] - v[0], k = "deltaY" in m ? m.deltaY : x[1] - v[1], M, C = m.target, D = Math.abs(w) > Math.abs(k) ? "h" : "v";
    if ("touches" in m && D === "h" && C.type === "range")
      return !1;
    var A = So(D, C);
    if (!A)
      return !0;
    if (A ? M = D : (M = D === "v" ? "h" : "v", A = So(D, C)), !A)
      return !1;
    if (!r.current && "changedTouches" in m && (w || k) && (r.current = M), !M)
      return !0;
    var F = r.current || M;
    return Du(F, b, m, F === "h" ? w : k);
  }, []), c = p.useCallback(function(m) {
    var b = m;
    if (!(!vt.length || vt[vt.length - 1] !== a)) {
      var v = "deltaY" in b ? No(b) : an(b), x = t.current.filter(function(M) {
        return M.name === b.type && (M.target === b.target || b.target === M.shadowParent) && Ou(M.delta, v);
      })[0];
      if (x && x.should) {
        b.cancelable && b.preventDefault();
        return;
      }
      if (!x) {
        var w = (s.current.shards || []).map(Po).filter(Boolean).filter(function(M) {
          return M.contains(b.target);
        }), k = w.length > 0 ? i(b, w[0]) : !s.current.noIsolation;
        k && b.cancelable && b.preventDefault();
      }
    }
  }, []), l = p.useCallback(function(m, b, v, x) {
    var w = { name: m, delta: b, target: v, should: x, shadowParent: Eu(v) };
    t.current.push(w), setTimeout(function() {
      t.current = t.current.filter(function(k) {
        return k !== w;
      });
    }, 1);
  }, []), d = p.useCallback(function(m) {
    n.current = an(m), r.current = void 0;
  }, []), u = p.useCallback(function(m) {
    l(m.type, No(m), m.target, i(m, e.lockRef.current));
  }, []), f = p.useCallback(function(m) {
    l(m.type, an(m), m.target, i(m, e.lockRef.current));
  }, []);
  p.useEffect(function() {
    return vt.push(a), e.setCallbacks({
      onScrollCapture: u,
      onWheelCapture: u,
      onTouchMoveCapture: f
    }), document.addEventListener("wheel", c, bt), document.addEventListener("touchmove", c, bt), document.addEventListener("touchstart", d, bt), function() {
      vt = vt.filter(function(m) {
        return m !== a;
      }), document.removeEventListener("wheel", c, bt), document.removeEventListener("touchmove", c, bt), document.removeEventListener("touchstart", d, bt);
    };
  }, []);
  var h = e.removeScrollBar, y = e.inert;
  return p.createElement(
    p.Fragment,
    null,
    y ? p.createElement(a, { styles: Su(o) }) : null,
    h ? p.createElement(vu, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function Eu(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const Ru = au(Ra, Pu);
var Or = p.forwardRef(function(e, t) {
  return p.createElement(Cn, We({}, e, { ref: t, sideCar: Ru }));
});
Or.classNames = Cn.classNames;
var kn = "Popover", [Ia] = Pe(kn, [
  ba
]), qt = ba(), [Au, ct] = Ia(kn), $a = (e) => {
  const {
    __scopePopover: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: a,
    modal: s = !1
  } = e, i = qt(t), c = p.useRef(null), [l, d] = p.useState(!1), [u, f] = Ze({
    prop: r,
    defaultProp: o ?? !1,
    onChange: a,
    caller: kn
  });
  return /* @__PURE__ */ g($d, { ...i, children: /* @__PURE__ */ g(
    Au,
    {
      scope: t,
      contentId: ut(),
      triggerRef: c,
      open: u,
      onOpenChange: f,
      onOpenToggle: p.useCallback(() => f((h) => !h), [f]),
      hasCustomAnchor: l,
      onCustomAnchorAdd: p.useCallback(() => d(!0), []),
      onCustomAnchorRemove: p.useCallback(() => d(!1), []),
      modal: s,
      children: n
    }
  ) });
};
$a.displayName = kn;
var Fa = "PopoverAnchor", Tu = p.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = ct(Fa, n), a = qt(n), { onCustomAnchorAdd: s, onCustomAnchorRemove: i } = o;
    return p.useEffect(() => (s(), () => i()), [s, i]), /* @__PURE__ */ g(Oa, { ...a, ...r, ref: t });
  }
);
Tu.displayName = Fa;
var Ya = "PopoverTrigger", Ba = p.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = ct(Ya, n), a = qt(n), s = ae(t, o.triggerRef), i = /* @__PURE__ */ g(
      K.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": o.open,
        "aria-controls": o.contentId,
        "data-state": Va(o.open),
        ...r,
        ref: s,
        onClick: ee(e.onClick, o.onOpenToggle)
      }
    );
    return o.hasCustomAnchor ? i : /* @__PURE__ */ g(Oa, { asChild: !0, ...a, children: i });
  }
);
Ba.displayName = Ya;
var Sr = "PopoverPortal", [_u, Wu] = Ia(Sr, {
  forceMount: void 0
}), La = (e) => {
  const { __scopePopover: t, forceMount: n, children: r, container: o } = e, a = ct(Sr, t);
  return /* @__PURE__ */ g(_u, { scope: t, forceMount: n, children: /* @__PURE__ */ g(Qe, { present: n || a.open, children: /* @__PURE__ */ g(Dr, { asChild: !0, container: o, children: r }) }) });
};
La.displayName = Sr;
var Nt = "PopoverContent", za = p.forwardRef(
  (e, t) => {
    const n = Wu(Nt, e.__scopePopover), { forceMount: r = n.forceMount, ...o } = e, a = ct(Nt, e.__scopePopover);
    return /* @__PURE__ */ g(Qe, { present: r || a.open, children: a.modal ? /* @__PURE__ */ g($u, { ...o, ref: t }) : /* @__PURE__ */ g(Fu, { ...o, ref: t }) });
  }
);
za.displayName = Nt;
var Iu = /* @__PURE__ */ Lt("PopoverContent.RemoveScroll"), $u = p.forwardRef(
  (e, t) => {
    const n = ct(Nt, e.__scopePopover), r = p.useRef(null), o = ae(t, r), a = p.useRef(!1);
    return p.useEffect(() => {
      const s = r.current;
      if (s) return Na(s);
    }, []), /* @__PURE__ */ g(Or, { as: Iu, allowPinchZoom: !0, children: /* @__PURE__ */ g(
      Ha,
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
), Fu = p.forwardRef(
  (e, t) => {
    const n = ct(Nt, e.__scopePopover), r = p.useRef(!1), o = p.useRef(!1);
    return /* @__PURE__ */ g(
      Ha,
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
), Ha = p.forwardRef(
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
      onInteractOutside: d,
      ...u
    } = e, f = ct(Nt, n), h = qt(n);
    return na(), /* @__PURE__ */ g(
      gr,
      {
        asChild: !0,
        loop: !0,
        trapped: r,
        onMountAutoFocus: o,
        onUnmountAutoFocus: a,
        children: /* @__PURE__ */ g(
          pr,
          {
            asChild: !0,
            disableOutsidePointerEvents: s,
            onInteractOutside: d,
            onEscapeKeyDown: i,
            onPointerDownOutside: c,
            onFocusOutside: l,
            onDismiss: () => f.onOpenChange(!1),
            children: /* @__PURE__ */ g(
              Fd,
              {
                "data-state": Va(f.open),
                role: "dialog",
                id: f.contentId,
                ...h,
                ...u,
                ref: t,
                style: {
                  ...u.style,
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
), ja = "PopoverClose", Yu = p.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = ct(ja, n);
    return /* @__PURE__ */ g(
      K.button,
      {
        type: "button",
        ...r,
        ref: t,
        onClick: ee(e.onClick, () => o.onOpenChange(!1))
      }
    );
  }
);
Yu.displayName = ja;
var Bu = "PopoverArrow", Lu = p.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = qt(n);
    return /* @__PURE__ */ g(Yd, { ...o, ...r, ref: t });
  }
);
Lu.displayName = Bu;
function Va(e) {
  return e ? "open" : "closed";
}
var Nr = $a, Pr = Ba, Er = La, Mn = za;
const kb = Nr, Mb = Pr, zu = it(({ className: e, align: t = "end", sideOffset: n = 8, ...r }, o) => /* @__PURE__ */ g(Er, { children: /* @__PURE__ */ g(
  Mn,
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
zu.displayName = Mn.displayName;
const Hu = Ne(
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
), ju = it(
  ({ className: e, variant: t, icon: n, children: r, ...o }, a) => /* @__PURE__ */ V(
    "button",
    {
      ref: a,
      className: W(Hu({ variant: t }), e),
      ...o,
      children: [
        n && /* @__PURE__ */ g("span", { className: "shrink-0", children: n }),
        r
      ]
    }
  )
);
ju.displayName = "PopoverMenuItem";
const Vu = Ne("cms-font-pretendard cms-text-black", {
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
}), Gu = P.forwardRef(
  ({
    className: e,
    variant: t,
    align: n,
    decoration: r,
    as: o = "p",
    children: a,
    ...s
  }, i) => /* @__PURE__ */ g(
    o,
    {
      className: W(Vu({ variant: t, align: n, decoration: r }), e),
      ref: i,
      ...s,
      children: a
    }
  )
);
Gu.displayName = "Text";
const qu = Ne(
  W(
    "w-full box-border",
    "px-3 py-2",
    "rounded-cms-sm",
    "border border-solid",
    "font-normal leading-tight",
    "transition-colors duration-200",
    "outline-none",
    "text-cms-black text-xs",
    "placeholder:text-cms-gray-500",
    "placeholder:text-xs"
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
), Uu = Ne("block text-xs font-medium text-cms-black"), Xu = Ne(
  "block text-xs font-medium text-cms-red-400 mt-1"
), Ku = Ne(
  "block text-xs font-normal text-cms-gray-700 mt-1"
), Qu = P.forwardRef(
  ({
    className: e,
    variant: t,
    fullWidth: n,
    label: r,
    error: o,
    errorMessage: a,
    helperText: s,
    showCharCount: i,
    maxLength: c,
    value: l,
    defaultValue: d,
    onChange: u,
    id: f,
    ...h
  }, y) => {
    const [m, b] = P.useState(
      l || d || ""
    ), v = f || `input-${Math.random().toString(36).substr(2, 9)}`, x = o ? "error" : t, w = l !== void 0 ? l : m, k = (w == null ? void 0 : w.length) || 0, M = (D) => {
      l === void 0 && b(D.target.value), u == null || u(D);
    }, C = r || i && c;
    return /* @__PURE__ */ V("div", { className: W("w-full", !n && "w-auto"), children: [
      C && /* @__PURE__ */ V("div", { className: "flex justify-between items-center mb-2", children: [
        r ? /* @__PURE__ */ g("label", { htmlFor: v, className: Uu(), children: r }) : /* @__PURE__ */ g("div", {}),
        i && c && /* @__PURE__ */ V("span", { className: "text-xs text-cms-gray-600", children: [
          k,
          " / ",
          c
        ] })
      ] }),
      /* @__PURE__ */ g(
        "input",
        {
          id: v,
          ref: y,
          className: W(
            qu({ variant: x, fullWidth: n }),
            e
          ),
          maxLength: c,
          value: l,
          defaultValue: d,
          onChange: M,
          ...h
        }
      ),
      o && a && /* @__PURE__ */ g("span", { className: Xu(), children: a }),
      !o && s && /* @__PURE__ */ g("span", { className: Ku(), children: s })
    ] });
  }
);
Qu.displayName = "TextInput";
function Zu(e, t, n = "long") {
  return new Intl.DateTimeFormat("en-US", {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: "numeric",
    timeZone: e,
    timeZoneName: n
  }).format(t).split(/\s/g).slice(2).join(" ");
}
const Qn = {}, Ft = {};
function dt(e, t) {
  try {
    const r = (Qn[e] || (Qn[e] = new Intl.DateTimeFormat("en-US", {
      timeZone: e,
      timeZoneName: "longOffset"
    }).format))(t).split("GMT")[1];
    return r in Ft ? Ft[r] : Eo(r, r.split(":"));
  } catch {
    if (e in Ft) return Ft[e];
    const n = e == null ? void 0 : e.match(Ju);
    return n ? Eo(e, n.slice(1)) : NaN;
  }
}
const Ju = /([+-]\d\d):?(\d\d)?/;
function Eo(e, t) {
  const n = +(t[0] || 0), r = +(t[1] || 0), o = +(t[2] || 0) / 60;
  return Ft[e] = n * 60 + r > 0 ? n * 60 + r + o : n * 60 - r - o;
}
class Ye extends Date {
  //#region static
  constructor(...t) {
    super(), t.length > 1 && typeof t[t.length - 1] == "string" && (this.timeZone = t.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(dt(this.timeZone, this)) ? this.setTime(NaN) : t.length ? typeof t[0] == "number" && (t.length === 1 || t.length === 2 && typeof t[1] != "number") ? this.setTime(t[0]) : typeof t[0] == "string" ? this.setTime(+new Date(t[0])) : t[0] instanceof Date ? this.setTime(+t[0]) : (this.setTime(+new Date(...t)), Ga(this), dr(this)) : this.setTime(Date.now());
  }
  static tz(t, ...n) {
    return n.length ? new Ye(...n, t) : new Ye(Date.now(), t);
  }
  //#endregion
  //#region time zone
  withTimeZone(t) {
    return new Ye(+this, t);
  }
  getTimezoneOffset() {
    const t = -dt(this.timeZone, this);
    return t > 0 ? Math.floor(t) : Math.ceil(t);
  }
  //#endregion
  //#region time
  setTime(t) {
    return Date.prototype.setTime.apply(this, arguments), dr(this), +this;
  }
  //#endregion
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new Ye(+new Date(t), this.timeZone);
  }
  //#endregion
}
const Ro = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
  if (!Ro.test(e)) return;
  const t = e.replace(Ro, "$1UTC");
  Ye.prototype[t] && (e.startsWith("get") ? Ye.prototype[e] = function() {
    return this.internal[t]();
  } : (Ye.prototype[e] = function() {
    return Date.prototype[t].apply(this.internal, arguments), ef(this), +this;
  }, Ye.prototype[t] = function() {
    return Date.prototype[t].apply(this, arguments), dr(this), +this;
  }));
});
function dr(e) {
  e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - Math.round(-dt(e.timeZone, e) * 60));
}
function ef(e) {
  Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), Ga(e);
}
function Ga(e) {
  const t = dt(e.timeZone, e), n = t > 0 ? Math.floor(t) : Math.ceil(t), r = /* @__PURE__ */ new Date(+e);
  r.setUTCHours(r.getUTCHours() - 1);
  const o = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), a = -(/* @__PURE__ */ new Date(+r)).getTimezoneOffset(), s = o - a, i = Date.prototype.getHours.apply(e) !== e.internal.getUTCHours();
  s && i && e.internal.setUTCMinutes(e.internal.getUTCMinutes() + s);
  const c = o - n;
  c && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + c);
  const l = /* @__PURE__ */ new Date(+e);
  l.setUTCSeconds(0);
  const d = o > 0 ? l.getSeconds() : (l.getSeconds() - 60) % 60, u = Math.round(-(dt(e.timeZone, e) * 60)) % 60;
  (u || d) && (e.internal.setUTCSeconds(e.internal.getUTCSeconds() + u), Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + u + d));
  const f = dt(e.timeZone, e), h = f > 0 ? Math.floor(f) : Math.ceil(f), m = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - h, b = h !== n, v = m - c;
  if (b && v) {
    Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + v);
    const x = dt(e.timeZone, e), w = x > 0 ? Math.floor(x) : Math.ceil(x), k = h - w;
    k && (e.internal.setUTCMinutes(e.internal.getUTCMinutes() + k), Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + k));
  }
}
class ue extends Ye {
  //#region static
  static tz(t, ...n) {
    return n.length ? new ue(...n, t) : new ue(Date.now(), t);
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
    return `${t} GMT${n}${r}${o} (${Zu(this.timeZone, this)})`;
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
    return new ue(+this, t);
  }
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new ue(+new Date(t), this.timeZone);
  }
  //#endregion
}
const qa = 6048e5, tf = 864e5, Ao = Symbol.for("constructDateFrom");
function ce(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && Ao in e ? e[Ao](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function Z(e, t) {
  return ce(t || e, e);
}
function Ua(e, t, n) {
  const r = Z(e, n == null ? void 0 : n.in);
  return isNaN(t) ? ce(e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
function Xa(e, t, n) {
  const r = Z(e, n == null ? void 0 : n.in);
  if (isNaN(t)) return ce(e, NaN);
  if (!t)
    return r;
  const o = r.getDate(), a = ce(e, r.getTime());
  a.setMonth(r.getMonth() + t + 1, 0);
  const s = a.getDate();
  return o >= s ? a : (r.setFullYear(
    a.getFullYear(),
    a.getMonth(),
    o
  ), r);
}
let nf = {};
function Ut() {
  return nf;
}
function Pt(e, t) {
  var i, c, l, d;
  const n = Ut(), r = (t == null ? void 0 : t.weekStartsOn) ?? ((c = (i = t == null ? void 0 : t.locale) == null ? void 0 : i.options) == null ? void 0 : c.weekStartsOn) ?? n.weekStartsOn ?? ((d = (l = n.locale) == null ? void 0 : l.options) == null ? void 0 : d.weekStartsOn) ?? 0, o = Z(e, t == null ? void 0 : t.in), a = o.getDay(), s = (a < r ? 7 : 0) + a - r;
  return o.setDate(o.getDate() - s), o.setHours(0, 0, 0, 0), o;
}
function jt(e, t) {
  return Pt(e, { ...t, weekStartsOn: 1 });
}
function Ka(e, t) {
  const n = Z(e, t == null ? void 0 : t.in), r = n.getFullYear(), o = ce(n, 0);
  o.setFullYear(r + 1, 0, 4), o.setHours(0, 0, 0, 0);
  const a = jt(o), s = ce(n, 0);
  s.setFullYear(r, 0, 4), s.setHours(0, 0, 0, 0);
  const i = jt(s);
  return n.getTime() >= a.getTime() ? r + 1 : n.getTime() >= i.getTime() ? r : r - 1;
}
function To(e) {
  const t = Z(e), n = new Date(
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
function Tt(e, ...t) {
  const n = ce.bind(
    null,
    t.find((r) => typeof r == "object")
  );
  return t.map(n);
}
function Vt(e, t) {
  const n = Z(e, t == null ? void 0 : t.in);
  return n.setHours(0, 0, 0, 0), n;
}
function Rr(e, t, n) {
  const [r, o] = Tt(
    n == null ? void 0 : n.in,
    e,
    t
  ), a = Vt(r), s = Vt(o), i = +a - To(a), c = +s - To(s);
  return Math.round((i - c) / tf);
}
function rf(e, t) {
  const n = Ka(e, t), r = ce(e, 0);
  return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), jt(r);
}
function of(e, t, n) {
  return Ua(e, t * 7, n);
}
function af(e, t, n) {
  return Xa(e, t * 12, n);
}
function sf(e, t) {
  let n, r = t == null ? void 0 : t.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = ce.bind(null, o));
    const a = Z(o, r);
    (!n || n < a || isNaN(+a)) && (n = a);
  }), ce(r, n || NaN);
}
function cf(e, t) {
  let n, r = t == null ? void 0 : t.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = ce.bind(null, o));
    const a = Z(o, r);
    (!n || n > a || isNaN(+a)) && (n = a);
  }), ce(r, n || NaN);
}
function lf(e, t, n) {
  const [r, o] = Tt(
    n == null ? void 0 : n.in,
    e,
    t
  );
  return +Vt(r) == +Vt(o);
}
function Qa(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function df(e) {
  return !(!Qa(e) && typeof e != "number" || isNaN(+Z(e)));
}
function Za(e, t, n) {
  const [r, o] = Tt(
    n == null ? void 0 : n.in,
    e,
    t
  ), a = r.getFullYear() - o.getFullYear(), s = r.getMonth() - o.getMonth();
  return a * 12 + s;
}
function uf(e, t) {
  const n = Z(e, t == null ? void 0 : t.in), r = n.getMonth();
  return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
function Ja(e, t) {
  const [n, r] = Tt(e, t.start, t.end);
  return { start: n, end: r };
}
function ff(e, t) {
  const { start: n, end: r } = Ja(t == null ? void 0 : t.in, e);
  let o = +n > +r;
  const a = o ? +n : +r, s = o ? r : n;
  s.setHours(0, 0, 0, 0), s.setDate(1);
  let i = 1;
  const c = [];
  for (; +s <= a; )
    c.push(ce(n, s)), s.setMonth(s.getMonth() + i);
  return o ? c.reverse() : c;
}
function hf(e, t) {
  const n = Z(e, t == null ? void 0 : t.in);
  return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function mf(e, t) {
  const n = Z(e, t == null ? void 0 : t.in), r = n.getFullYear();
  return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
function es(e, t) {
  const n = Z(e, t == null ? void 0 : t.in);
  return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function pf(e, t) {
  const { start: n, end: r } = Ja(t == null ? void 0 : t.in, e);
  let o = +n > +r;
  const a = o ? +n : +r, s = o ? r : n;
  s.setHours(0, 0, 0, 0), s.setMonth(0, 1);
  let i = 1;
  const c = [];
  for (; +s <= a; )
    c.push(ce(n, s)), s.setFullYear(s.getFullYear() + i);
  return o ? c.reverse() : c;
}
function ts(e, t) {
  var i, c, l, d;
  const n = Ut(), r = (t == null ? void 0 : t.weekStartsOn) ?? ((c = (i = t == null ? void 0 : t.locale) == null ? void 0 : i.options) == null ? void 0 : c.weekStartsOn) ?? n.weekStartsOn ?? ((d = (l = n.locale) == null ? void 0 : l.options) == null ? void 0 : d.weekStartsOn) ?? 0, o = Z(e, t == null ? void 0 : t.in), a = o.getDay(), s = (a < r ? -7 : 0) + 6 - (a - r);
  return o.setDate(o.getDate() + s), o.setHours(23, 59, 59, 999), o;
}
function gf(e, t) {
  return ts(e, { ...t, weekStartsOn: 1 });
}
const bf = {
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
}, vf = (e, t, n) => {
  let r;
  const o = bf[e];
  return typeof o == "string" ? r = o : t === 1 ? r = o.one : r = o.other.replace("{{count}}", t.toString()), n != null && n.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
function Ot(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
const yf = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, wf = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, xf = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, Cf = {
  date: Ot({
    formats: yf,
    defaultWidth: "full"
  }),
  time: Ot({
    formats: wf,
    defaultWidth: "full"
  }),
  dateTime: Ot({
    formats: xf,
    defaultWidth: "full"
  })
}, kf = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, Mf = (e, t, n, r) => kf[e];
function Ie(e) {
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
const Df = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, Of = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, Sf = {
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
}, Nf = {
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
}, Pf = {
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
}, Ef = {
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
}, Rf = (e, t) => {
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
}, Af = {
  ordinalNumber: Rf,
  era: Ie({
    values: Df,
    defaultWidth: "wide"
  }),
  quarter: Ie({
    values: Of,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: Ie({
    values: Sf,
    defaultWidth: "wide"
  }),
  day: Ie({
    values: Nf,
    defaultWidth: "wide"
  }),
  dayPeriod: Ie({
    values: Pf,
    defaultWidth: "wide",
    formattingValues: Ef,
    defaultFormattingWidth: "wide"
  })
};
function $e(e) {
  return (t, n = {}) => {
    const r = n.width, o = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], a = t.match(o);
    if (!a)
      return null;
    const s = a[0], i = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], c = Array.isArray(i) ? _f(i, (u) => u.test(s)) : (
      // [TODO] -- I challenge you to fix the type
      Tf(i, (u) => u.test(s))
    );
    let l;
    l = e.valueCallback ? e.valueCallback(c) : c, l = n.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      n.valueCallback(l)
    ) : l;
    const d = t.slice(s.length);
    return { value: l, rest: d };
  };
}
function Tf(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function _f(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function ns(e) {
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
const Wf = /^(\d+)(th|st|nd|rd)?/i, If = /\d+/i, $f = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, Ff = {
  any: [/^b/i, /^(a|c)/i]
}, Yf = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, Bf = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Lf = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, zf = {
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
}, Hf = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, jf = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, Vf = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, Gf = {
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
}, qf = {
  ordinalNumber: ns({
    matchPattern: Wf,
    parsePattern: If,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: $e({
    matchPatterns: $f,
    defaultMatchWidth: "wide",
    parsePatterns: Ff,
    defaultParseWidth: "any"
  }),
  quarter: $e({
    matchPatterns: Yf,
    defaultMatchWidth: "wide",
    parsePatterns: Bf,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: $e({
    matchPatterns: Lf,
    defaultMatchWidth: "wide",
    parsePatterns: zf,
    defaultParseWidth: "any"
  }),
  day: $e({
    matchPatterns: Hf,
    defaultMatchWidth: "wide",
    parsePatterns: jf,
    defaultParseWidth: "any"
  }),
  dayPeriod: $e({
    matchPatterns: Vf,
    defaultMatchWidth: "any",
    parsePatterns: Gf,
    defaultParseWidth: "any"
  })
}, xt = {
  code: "en-US",
  formatDistance: vf,
  formatLong: Cf,
  formatRelative: Mf,
  localize: Af,
  match: qf,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function Uf(e, t) {
  const n = Z(e, t == null ? void 0 : t.in);
  return Rr(n, es(n)) + 1;
}
function Ar(e, t) {
  const n = Z(e, t == null ? void 0 : t.in), r = +jt(n) - +rf(n);
  return Math.round(r / qa) + 1;
}
function rs(e, t) {
  var d, u, f, h;
  const n = Z(e, t == null ? void 0 : t.in), r = n.getFullYear(), o = Ut(), a = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((u = (d = t == null ? void 0 : t.locale) == null ? void 0 : d.options) == null ? void 0 : u.firstWeekContainsDate) ?? o.firstWeekContainsDate ?? ((h = (f = o.locale) == null ? void 0 : f.options) == null ? void 0 : h.firstWeekContainsDate) ?? 1, s = ce((t == null ? void 0 : t.in) || e, 0);
  s.setFullYear(r + 1, 0, a), s.setHours(0, 0, 0, 0);
  const i = Pt(s, t), c = ce((t == null ? void 0 : t.in) || e, 0);
  c.setFullYear(r, 0, a), c.setHours(0, 0, 0, 0);
  const l = Pt(c, t);
  return +n >= +i ? r + 1 : +n >= +l ? r : r - 1;
}
function Xf(e, t) {
  var i, c, l, d;
  const n = Ut(), r = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((c = (i = t == null ? void 0 : t.locale) == null ? void 0 : i.options) == null ? void 0 : c.firstWeekContainsDate) ?? n.firstWeekContainsDate ?? ((d = (l = n.locale) == null ? void 0 : l.options) == null ? void 0 : d.firstWeekContainsDate) ?? 1, o = rs(e, t), a = ce((t == null ? void 0 : t.in) || e, 0);
  return a.setFullYear(o, 0, r), a.setHours(0, 0, 0, 0), Pt(a, t);
}
function Tr(e, t) {
  const n = Z(e, t == null ? void 0 : t.in), r = +Pt(n, t) - +Xf(n, t);
  return Math.round(r / qa) + 1;
}
function Q(e, t) {
  const n = e < 0 ? "-" : "", r = Math.abs(e).toString().padStart(t, "0");
  return n + r;
}
const tt = {
  // Year
  y(e, t) {
    const n = e.getFullYear(), r = n > 0 ? n : 1 - n;
    return Q(t === "yy" ? r % 100 : r, t.length);
  },
  // Month
  M(e, t) {
    const n = e.getMonth();
    return t === "M" ? String(n + 1) : Q(n + 1, 2);
  },
  // Day of the month
  d(e, t) {
    return Q(e.getDate(), t.length);
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
    return Q(e.getHours() % 12 || 12, t.length);
  },
  // Hour [0-23]
  H(e, t) {
    return Q(e.getHours(), t.length);
  },
  // Minute
  m(e, t) {
    return Q(e.getMinutes(), t.length);
  },
  // Second
  s(e, t) {
    return Q(e.getSeconds(), t.length);
  },
  // Fraction of second
  S(e, t) {
    const n = t.length, r = e.getMilliseconds(), o = Math.trunc(
      r * Math.pow(10, n - 3)
    );
    return Q(o, t.length);
  }
}, yt = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, _o = {
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
    return tt.y(e, t);
  },
  // Local week-numbering year
  Y: function(e, t, n, r) {
    const o = rs(e, r), a = o > 0 ? o : 1 - o;
    if (t === "YY") {
      const s = a % 100;
      return Q(s, 2);
    }
    return t === "Yo" ? n.ordinalNumber(a, { unit: "year" }) : Q(a, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const n = Ka(e);
    return Q(n, t.length);
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
    return Q(n, t.length);
  },
  // Quarter
  Q: function(e, t, n) {
    const r = Math.ceil((e.getMonth() + 1) / 3);
    switch (t) {
      case "Q":
        return String(r);
      case "QQ":
        return Q(r, 2);
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
        return Q(r, 2);
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
        return tt.M(e, t);
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
        return Q(r + 1, 2);
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
    const o = Tr(e, r);
    return t === "wo" ? n.ordinalNumber(o, { unit: "week" }) : Q(o, t.length);
  },
  // ISO week of year
  I: function(e, t, n) {
    const r = Ar(e);
    return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : Q(r, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : tt.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const r = Uf(e);
    return t === "Do" ? n.ordinalNumber(r, { unit: "dayOfYear" }) : Q(r, t.length);
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
        return Q(a, 2);
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
        return Q(a, t.length);
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
        return Q(o, t.length);
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
    switch (r === 12 ? o = yt.noon : r === 0 ? o = yt.midnight : o = r / 12 >= 1 ? "pm" : "am", t) {
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
    switch (r >= 17 ? o = yt.evening : r >= 12 ? o = yt.afternoon : r >= 4 ? o = yt.morning : o = yt.night, t) {
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
    return tt.h(e, t);
  },
  // Hour [0-23]
  H: function(e, t, n) {
    return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : tt.H(e, t);
  },
  // Hour [0-11]
  K: function(e, t, n) {
    const r = e.getHours() % 12;
    return t === "Ko" ? n.ordinalNumber(r, { unit: "hour" }) : Q(r, t.length);
  },
  // Hour [1-24]
  k: function(e, t, n) {
    let r = e.getHours();
    return r === 0 && (r = 24), t === "ko" ? n.ordinalNumber(r, { unit: "hour" }) : Q(r, t.length);
  },
  // Minute
  m: function(e, t, n) {
    return t === "mo" ? n.ordinalNumber(e.getMinutes(), { unit: "minute" }) : tt.m(e, t);
  },
  // Second
  s: function(e, t, n) {
    return t === "so" ? n.ordinalNumber(e.getSeconds(), { unit: "second" }) : tt.s(e, t);
  },
  // Fraction of second
  S: function(e, t) {
    return tt.S(e, t);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(e, t, n) {
    const r = e.getTimezoneOffset();
    if (r === 0)
      return "Z";
    switch (t) {
      case "X":
        return Io(r);
      case "XXXX":
      case "XX":
        return lt(r);
      case "XXXXX":
      case "XXX":
      default:
        return lt(r, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      case "x":
        return Io(r);
      case "xxxx":
      case "xx":
        return lt(r);
      case "xxxxx":
      case "xxx":
      default:
        return lt(r, ":");
    }
  },
  // Timezone (GMT)
  O: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + Wo(r, ":");
      case "OOOO":
      default:
        return "GMT" + lt(r, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + Wo(r, ":");
      case "zzzz":
      default:
        return "GMT" + lt(r, ":");
    }
  },
  // Seconds timestamp
  t: function(e, t, n) {
    const r = Math.trunc(+e / 1e3);
    return Q(r, t.length);
  },
  // Milliseconds timestamp
  T: function(e, t, n) {
    return Q(+e, t.length);
  }
};
function Wo(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = Math.trunc(r / 60), a = r % 60;
  return a === 0 ? n + String(o) : n + String(o) + t + Q(a, 2);
}
function Io(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + Q(Math.abs(e) / 60, 2) : lt(e, t);
}
function lt(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = Q(Math.trunc(r / 60), 2), a = Q(r % 60, 2);
  return n + o + t + a;
}
const $o = (e, t) => {
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
}, os = (e, t) => {
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
}, Kf = (e, t) => {
  const n = e.match(/(P+)(p+)?/) || [], r = n[1], o = n[2];
  if (!o)
    return $o(e, t);
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
  return a.replace("{{date}}", $o(r, t)).replace("{{time}}", os(o, t));
}, Qf = {
  p: os,
  P: Kf
}, Zf = /^D+$/, Jf = /^Y+$/, eh = ["D", "DD", "YY", "YYYY"];
function th(e) {
  return Zf.test(e);
}
function nh(e) {
  return Jf.test(e);
}
function rh(e, t, n) {
  const r = oh(e, t, n);
  if (console.warn(r), eh.includes(e)) throw new RangeError(r);
}
function oh(e, t, n) {
  const r = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const ah = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, sh = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, ih = /^'([^]*?)'?$/, ch = /''/g, lh = /[a-zA-Z]/;
function Yt(e, t, n) {
  var d, u, f, h, y, m, b, v;
  const r = Ut(), o = (n == null ? void 0 : n.locale) ?? r.locale ?? xt, a = (n == null ? void 0 : n.firstWeekContainsDate) ?? ((u = (d = n == null ? void 0 : n.locale) == null ? void 0 : d.options) == null ? void 0 : u.firstWeekContainsDate) ?? r.firstWeekContainsDate ?? ((h = (f = r.locale) == null ? void 0 : f.options) == null ? void 0 : h.firstWeekContainsDate) ?? 1, s = (n == null ? void 0 : n.weekStartsOn) ?? ((m = (y = n == null ? void 0 : n.locale) == null ? void 0 : y.options) == null ? void 0 : m.weekStartsOn) ?? r.weekStartsOn ?? ((v = (b = r.locale) == null ? void 0 : b.options) == null ? void 0 : v.weekStartsOn) ?? 0, i = Z(e, n == null ? void 0 : n.in);
  if (!df(i))
    throw new RangeError("Invalid time value");
  let c = t.match(sh).map((x) => {
    const w = x[0];
    if (w === "p" || w === "P") {
      const k = Qf[w];
      return k(x, o.formatLong);
    }
    return x;
  }).join("").match(ah).map((x) => {
    if (x === "''")
      return { isToken: !1, value: "'" };
    const w = x[0];
    if (w === "'")
      return { isToken: !1, value: dh(x) };
    if (_o[w])
      return { isToken: !0, value: x };
    if (w.match(lh))
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
    (!(n != null && n.useAdditionalWeekYearTokens) && nh(w) || !(n != null && n.useAdditionalDayOfYearTokens) && th(w)) && rh(w, t, String(e));
    const k = _o[w[0]];
    return k(i, w, o.localize, l);
  }).join("");
}
function dh(e) {
  const t = e.match(ih);
  return t ? t[1].replace(ch, "'") : e;
}
function uh(e, t) {
  const n = Z(e, t == null ? void 0 : t.in), r = n.getFullYear(), o = n.getMonth(), a = ce(n, 0);
  return a.setFullYear(r, o + 1, 0), a.setHours(0, 0, 0, 0), a.getDate();
}
function fh(e, t) {
  return Z(e, t == null ? void 0 : t.in).getMonth();
}
function hh(e, t) {
  return Z(e, t == null ? void 0 : t.in).getFullYear();
}
function mh(e, t) {
  return +Z(e) > +Z(t);
}
function ph(e, t) {
  return +Z(e) < +Z(t);
}
function gh(e, t, n) {
  const [r, o] = Tt(
    n == null ? void 0 : n.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear() && r.getMonth() === o.getMonth();
}
function bh(e, t, n) {
  const [r, o] = Tt(
    n == null ? void 0 : n.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear();
}
function vh(e, t, n) {
  const r = Z(e, n == null ? void 0 : n.in), o = r.getFullYear(), a = r.getDate(), s = ce(e, 0);
  s.setFullYear(o, t, 15), s.setHours(0, 0, 0, 0);
  const i = uh(s);
  return r.setMonth(t, Math.min(a, i)), r;
}
function yh(e, t, n) {
  const r = Z(e, n == null ? void 0 : n.in);
  return isNaN(+r) ? ce(e, NaN) : (r.setFullYear(t), r);
}
const Fo = 5, wh = 4;
function xh(e, t) {
  const n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, o = t.addDays(e, -r + 1), a = t.addDays(o, Fo * 7 - 1);
  return t.getMonth(e) === t.getMonth(a) ? Fo : wh;
}
function as(e, t) {
  const n = t.startOfMonth(e), r = n.getDay();
  return r === 1 ? n : r === 0 ? t.addDays(n, -1 * 6) : t.addDays(n, -1 * (r - 1));
}
function Ch(e, t) {
  const n = as(e, t), r = xh(e, t);
  return t.addDays(n, r * 7 - 1);
}
const kh = {
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
}, Mh = (e, t, n) => {
  let r;
  const o = kh[e];
  return typeof o == "string" ? r = o : t === 1 ? r = o.one : r = o.other.replace("{{count}}", t.toString()), n != null && n.addSuffix ? n.comparison && n.comparison > 0 ? r + " 후" : r + " 전" : r;
}, Dh = {
  full: "y년 M월 d일 EEEE",
  long: "y년 M월 d일",
  medium: "y.MM.dd",
  short: "y.MM.dd"
}, Oh = {
  full: "a H시 mm분 ss초 zzzz",
  long: "a H:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
}, Sh = {
  full: "{{date}} {{time}}",
  long: "{{date}} {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
}, Nh = {
  date: Ot({
    formats: Dh,
    defaultWidth: "full"
  }),
  time: Ot({
    formats: Oh,
    defaultWidth: "full"
  }),
  dateTime: Ot({
    formats: Sh,
    defaultWidth: "full"
  })
}, Ph = {
  lastWeek: "'지난' eeee p",
  yesterday: "'어제' p",
  today: "'오늘' p",
  tomorrow: "'내일' p",
  nextWeek: "'다음' eeee p",
  other: "P"
}, Eh = (e, t, n, r) => Ph[e], Rh = {
  narrow: ["BC", "AD"],
  abbreviated: ["BC", "AD"],
  wide: ["기원전", "서기"]
}, Ah = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1분기", "2분기", "3분기", "4분기"]
}, Th = {
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
}, _h = {
  narrow: ["일", "월", "화", "수", "목", "금", "토"],
  short: ["일", "월", "화", "수", "목", "금", "토"],
  abbreviated: ["일", "월", "화", "수", "목", "금", "토"],
  wide: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"]
}, Wh = {
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
}, Ih = {
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
}, $h = (e, t) => {
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
}, Fh = {
  ordinalNumber: $h,
  era: Ie({
    values: Rh,
    defaultWidth: "wide"
  }),
  quarter: Ie({
    values: Ah,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: Ie({
    values: Th,
    defaultWidth: "wide"
  }),
  day: Ie({
    values: _h,
    defaultWidth: "wide"
  }),
  dayPeriod: Ie({
    values: Wh,
    defaultWidth: "wide",
    formattingValues: Ih,
    defaultFormattingWidth: "wide"
  })
}, Yh = /^(\d+)(일|번째)?/i, Bh = /\d+/i, Lh = {
  narrow: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(기원전|서기)/i
}, zh = {
  any: [/^(bc|기원전)/i, /^(ad|서기)/i]
}, Hh = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234]사?분기/i
}, jh = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Vh = {
  narrow: /^(1[012]|[123456789])/,
  abbreviated: /^(1[012]|[123456789])월/i,
  wide: /^(1[012]|[123456789])월/i
}, Gh = {
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
}, qh = {
  narrow: /^[일월화수목금토]/,
  short: /^[일월화수목금토]/,
  abbreviated: /^[일월화수목금토]/,
  wide: /^[일월화수목금토]요일/
}, Uh = {
  any: [/^일/, /^월/, /^화/, /^수/, /^목/, /^금/, /^토/]
}, Xh = {
  any: /^(am|pm|오전|오후|자정|정오|아침|저녁|밤)/i
}, Kh = {
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
}, Qh = {
  ordinalNumber: ns({
    matchPattern: Yh,
    parsePattern: Bh,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: $e({
    matchPatterns: Lh,
    defaultMatchWidth: "wide",
    parsePatterns: zh,
    defaultParseWidth: "any"
  }),
  quarter: $e({
    matchPatterns: Hh,
    defaultMatchWidth: "wide",
    parsePatterns: jh,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: $e({
    matchPatterns: Vh,
    defaultMatchWidth: "wide",
    parsePatterns: Gh,
    defaultParseWidth: "any"
  }),
  day: $e({
    matchPatterns: qh,
    defaultMatchWidth: "wide",
    parsePatterns: Uh,
    defaultParseWidth: "any"
  }),
  dayPeriod: $e({
    matchPatterns: Xh,
    defaultMatchWidth: "any",
    parsePatterns: Kh,
    defaultParseWidth: "any"
  })
}, Zh = {
  code: "ko",
  formatDistance: Mh,
  formatLong: Nh,
  formatRelative: Eh,
  localize: Fh,
  match: Qh,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
}, ss = {
  ...xt,
  labels: {
    labelDayButton: (e, t, n, r) => {
      let o;
      r && typeof r.format == "function" ? o = r.format.bind(r) : o = (s, i) => Yt(s, i, { locale: xt, ...n });
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
      return n && typeof n.format == "function" ? r = n.format.bind(n) : r = (o, a) => Yt(o, a, { locale: xt, ...t }), r(e, "LLLL yyyy");
    },
    labelGridcell: (e, t, n, r) => {
      let o;
      r && typeof r.format == "function" ? o = r.format.bind(r) : o = (s, i) => Yt(s, i, { locale: xt, ...n });
      let a = o(e, "PPPP");
      return t != null && t.today && (a = `Today, ${a}`), a;
    },
    labelNav: "Navigation bar",
    labelWeekNumberHeader: "Week Number",
    labelWeekday: (e, t, n) => {
      let r;
      return n && typeof n.format == "function" ? r = n.format.bind(n) : r = (o, a) => Yt(o, a, { locale: xt, ...t }), r(e, "cccc");
    }
  }
};
class de {
  /**
   * Creates an instance of `DateLib`.
   *
   * @param options Configuration options for the date library.
   * @param overrides Custom overrides for the date library functions.
   */
  constructor(t, n) {
    this.Date = Date, this.today = () => {
      var r;
      return (r = this.overrides) != null && r.today ? this.overrides.today() : this.options.timeZone ? ue.tz(this.options.timeZone) : new this.Date();
    }, this.newDate = (r, o, a) => {
      var s;
      return (s = this.overrides) != null && s.newDate ? this.overrides.newDate(r, o, a) : this.options.timeZone ? new ue(r, o, a, this.options.timeZone) : new Date(r, o, a);
    }, this.addDays = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.addDays ? this.overrides.addDays(r, o) : Ua(r, o);
    }, this.addMonths = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.addMonths ? this.overrides.addMonths(r, o) : Xa(r, o);
    }, this.addWeeks = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.addWeeks ? this.overrides.addWeeks(r, o) : of(r, o);
    }, this.addYears = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.addYears ? this.overrides.addYears(r, o) : af(r, o);
    }, this.differenceInCalendarDays = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(r, o) : Rr(r, o);
    }, this.differenceInCalendarMonths = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(r, o) : Za(r, o);
    }, this.eachMonthOfInterval = (r) => {
      var o;
      return (o = this.overrides) != null && o.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(r) : ff(r);
    }, this.eachYearOfInterval = (r) => {
      var i;
      const o = (i = this.overrides) != null && i.eachYearOfInterval ? this.overrides.eachYearOfInterval(r) : pf(r), a = new Set(o.map((c) => this.getYear(c)));
      if (a.size === o.length)
        return o;
      const s = [];
      return a.forEach((c) => {
        s.push(new Date(c, 0, 1));
      }), s;
    }, this.endOfBroadcastWeek = (r) => {
      var o;
      return (o = this.overrides) != null && o.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(r) : Ch(r, this);
    }, this.endOfISOWeek = (r) => {
      var o;
      return (o = this.overrides) != null && o.endOfISOWeek ? this.overrides.endOfISOWeek(r) : gf(r);
    }, this.endOfMonth = (r) => {
      var o;
      return (o = this.overrides) != null && o.endOfMonth ? this.overrides.endOfMonth(r) : uf(r);
    }, this.endOfWeek = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.endOfWeek ? this.overrides.endOfWeek(r, o) : ts(r, this.options);
    }, this.endOfYear = (r) => {
      var o;
      return (o = this.overrides) != null && o.endOfYear ? this.overrides.endOfYear(r) : mf(r);
    }, this.format = (r, o, a) => {
      var i;
      const s = (i = this.overrides) != null && i.format ? this.overrides.format(r, o, this.options) : Yt(r, o, this.options);
      return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(s) : s;
    }, this.getISOWeek = (r) => {
      var o;
      return (o = this.overrides) != null && o.getISOWeek ? this.overrides.getISOWeek(r) : Ar(r);
    }, this.getMonth = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.getMonth ? this.overrides.getMonth(r, this.options) : fh(r, this.options);
    }, this.getYear = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.getYear ? this.overrides.getYear(r, this.options) : hh(r, this.options);
    }, this.getWeek = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.getWeek ? this.overrides.getWeek(r, this.options) : Tr(r, this.options);
    }, this.isAfter = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isAfter ? this.overrides.isAfter(r, o) : mh(r, o);
    }, this.isBefore = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isBefore ? this.overrides.isBefore(r, o) : ph(r, o);
    }, this.isDate = (r) => {
      var o;
      return (o = this.overrides) != null && o.isDate ? this.overrides.isDate(r) : Qa(r);
    }, this.isSameDay = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isSameDay ? this.overrides.isSameDay(r, o) : lf(r, o);
    }, this.isSameMonth = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isSameMonth ? this.overrides.isSameMonth(r, o) : gh(r, o);
    }, this.isSameYear = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isSameYear ? this.overrides.isSameYear(r, o) : bh(r, o);
    }, this.max = (r) => {
      var o;
      return (o = this.overrides) != null && o.max ? this.overrides.max(r) : sf(r);
    }, this.min = (r) => {
      var o;
      return (o = this.overrides) != null && o.min ? this.overrides.min(r) : cf(r);
    }, this.setMonth = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.setMonth ? this.overrides.setMonth(r, o) : vh(r, o);
    }, this.setYear = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.setYear ? this.overrides.setYear(r, o) : yh(r, o);
    }, this.startOfBroadcastWeek = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(r, this) : as(r, this);
    }, this.startOfDay = (r) => {
      var o;
      return (o = this.overrides) != null && o.startOfDay ? this.overrides.startOfDay(r) : Vt(r);
    }, this.startOfISOWeek = (r) => {
      var o;
      return (o = this.overrides) != null && o.startOfISOWeek ? this.overrides.startOfISOWeek(r) : jt(r);
    }, this.startOfMonth = (r) => {
      var o;
      return (o = this.overrides) != null && o.startOfMonth ? this.overrides.startOfMonth(r) : hf(r);
    }, this.startOfWeek = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.startOfWeek ? this.overrides.startOfWeek(r, this.options) : Pt(r, this.options);
    }, this.startOfYear = (r) => {
      var o;
      return (o = this.overrides) != null && o.startOfYear ? this.overrides.startOfYear(r) : es(r);
    }, this.options = { locale: ss, ...t }, this.overrides = n;
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
    return t && de.yearFirstLocales.has(t) ? "year-first" : "month-first";
  }
  /**
   * Formats the month/year pair respecting locale conventions.
   *
   * @since 9.11.0
   */
  formatMonthYear(t) {
    const { locale: n, timeZone: r, numerals: o } = this.options, a = n == null ? void 0 : n.code;
    if (a && de.yearFirstLocales.has(a))
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
de.yearFirstLocales = /* @__PURE__ */ new Set([
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
const je = new de();
class is {
  constructor(t, n, r = je) {
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
class Jh {
  constructor(t, n) {
    this.date = t, this.weeks = n;
  }
}
class em {
  constructor(t, n) {
    this.days = n, this.weekNumber = t;
  }
}
function tm(e) {
  return P.createElement("button", { ...e });
}
function nm(e) {
  return P.createElement("span", { ...e });
}
function rm(e) {
  const { size: t = 24, orientation: n = "left", className: r } = e;
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: handled by the parent component
    P.createElement(
      "svg",
      { className: r, width: t, height: t, viewBox: "0 0 24 24" },
      n === "up" && P.createElement("polygon", { points: "6.77 17 12.5 11.43 18.24 17 20 15.28 12.5 8 5 15.28" }),
      n === "down" && P.createElement("polygon", { points: "6.77 8 12.5 13.57 18.24 8 20 9.72 12.5 17 5 9.72" }),
      n === "left" && P.createElement("polygon", { points: "16 18.112 9.81111111 12 16 5.87733333 14.0888889 4 6 12 14.0888889 20" }),
      n === "right" && P.createElement("polygon", { points: "8 18.112 14.18888889 12 8 5.87733333 9.91111111 4 18 12 9.91111111 20" })
    )
  );
}
function om(e) {
  const { day: t, modifiers: n, ...r } = e;
  return P.createElement("td", { ...r });
}
function am(e) {
  const { day: t, modifiers: n, ...r } = e, o = P.useRef(null);
  return P.useEffect(() => {
    var a;
    n.focused && ((a = o.current) == null || a.focus());
  }, [n.focused]), P.createElement("button", { ref: o, ...r });
}
var B;
(function(e) {
  e.Root = "root", e.Chevron = "chevron", e.Day = "day", e.DayButton = "day_button", e.CaptionLabel = "caption_label", e.Dropdowns = "dropdowns", e.Dropdown = "dropdown", e.DropdownRoot = "dropdown_root", e.Footer = "footer", e.MonthGrid = "month_grid", e.MonthCaption = "month_caption", e.MonthsDropdown = "months_dropdown", e.Month = "month", e.Months = "months", e.Nav = "nav", e.NextMonthButton = "button_next", e.PreviousMonthButton = "button_previous", e.Week = "week", e.Weeks = "weeks", e.Weekday = "weekday", e.Weekdays = "weekdays", e.WeekNumber = "week_number", e.WeekNumberHeader = "week_number_header", e.YearsDropdown = "years_dropdown";
})(B || (B = {}));
var oe;
(function(e) {
  e.disabled = "disabled", e.hidden = "hidden", e.outside = "outside", e.focused = "focused", e.today = "today";
})(oe || (oe = {}));
var De;
(function(e) {
  e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})(De || (De = {}));
var ge;
(function(e) {
  e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})(ge || (ge = {}));
function sm(e) {
  const { options: t, className: n, components: r, classNames: o, ...a } = e, s = [o[B.Dropdown], n].join(" "), i = t == null ? void 0 : t.find(({ value: c }) => c === a.value);
  return P.createElement(
    "span",
    { "data-disabled": a.disabled, className: o[B.DropdownRoot] },
    P.createElement(r.Select, { className: s, ...a }, t == null ? void 0 : t.map(({ value: c, label: l, disabled: d }) => P.createElement(r.Option, { key: c, value: c, disabled: d }, l))),
    P.createElement(
      "span",
      { className: o[B.CaptionLabel], "aria-hidden": !0 },
      i == null ? void 0 : i.label,
      P.createElement(r.Chevron, { orientation: "down", size: 18, className: o[B.Chevron] })
    )
  );
}
function im(e) {
  return P.createElement("div", { ...e });
}
function cm(e) {
  return P.createElement("div", { ...e });
}
function lm(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return P.createElement("div", { ...r }, e.children);
}
function dm(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return P.createElement("div", { ...r });
}
function um(e) {
  return P.createElement("table", { ...e });
}
function fm(e) {
  return P.createElement("div", { ...e });
}
const cs = ac(void 0);
function Xt() {
  const e = sc(cs);
  if (e === void 0)
    throw new Error("useDayPicker() must be used within a custom component.");
  return e;
}
function hm(e) {
  const { components: t } = Xt();
  return P.createElement(t.Dropdown, { ...e });
}
function mm(e) {
  const { onPreviousClick: t, onNextClick: n, previousMonth: r, nextMonth: o, ...a } = e, { components: s, classNames: i, labels: { labelPrevious: c, labelNext: l } } = Xt(), d = xe((f) => {
    o && (n == null || n(f));
  }, [o, n]), u = xe((f) => {
    r && (t == null || t(f));
  }, [r, t]);
  return P.createElement(
    "nav",
    { ...a },
    P.createElement(
      s.PreviousMonthButton,
      { type: "button", className: i[B.PreviousMonthButton], tabIndex: r ? void 0 : -1, "aria-disabled": r ? void 0 : !0, "aria-label": c(r), onClick: u },
      P.createElement(s.Chevron, { disabled: r ? void 0 : !0, className: i[B.Chevron], orientation: "left" })
    ),
    P.createElement(
      s.NextMonthButton,
      { type: "button", className: i[B.NextMonthButton], tabIndex: o ? void 0 : -1, "aria-disabled": o ? void 0 : !0, "aria-label": l(o), onClick: d },
      P.createElement(s.Chevron, { disabled: o ? void 0 : !0, orientation: "right", className: i[B.Chevron] })
    )
  );
}
function pm(e) {
  const { components: t } = Xt();
  return P.createElement(t.Button, { ...e });
}
function gm(e) {
  return P.createElement("option", { ...e });
}
function bm(e) {
  const { components: t } = Xt();
  return P.createElement(t.Button, { ...e });
}
function vm(e) {
  const { rootRef: t, ...n } = e;
  return P.createElement("div", { ...n, ref: t });
}
function ym(e) {
  return P.createElement("select", { ...e });
}
function wm(e) {
  const { week: t, ...n } = e;
  return P.createElement("tr", { ...n });
}
function xm(e) {
  return P.createElement("th", { ...e });
}
function Cm(e) {
  return P.createElement(
    "thead",
    { "aria-hidden": !0 },
    P.createElement("tr", { ...e })
  );
}
function km(e) {
  const { week: t, ...n } = e;
  return P.createElement("th", { ...n });
}
function Mm(e) {
  return P.createElement("th", { ...e });
}
function Dm(e) {
  return P.createElement("tbody", { ...e });
}
function Om(e) {
  const { components: t } = Xt();
  return P.createElement(t.Dropdown, { ...e });
}
const Sm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: tm,
  CaptionLabel: nm,
  Chevron: rm,
  Day: om,
  DayButton: am,
  Dropdown: sm,
  DropdownNav: im,
  Footer: cm,
  Month: lm,
  MonthCaption: dm,
  MonthGrid: um,
  Months: fm,
  MonthsDropdown: hm,
  Nav: mm,
  NextMonthButton: pm,
  Option: gm,
  PreviousMonthButton: bm,
  Root: vm,
  Select: ym,
  Week: wm,
  WeekNumber: km,
  WeekNumberHeader: Mm,
  Weekday: xm,
  Weekdays: Cm,
  Weeks: Dm,
  YearsDropdown: Om
}, Symbol.toStringTag, { value: "Module" }));
function Ge(e, t, n = !1, r = je) {
  let { from: o, to: a } = e;
  const { differenceInCalendarDays: s, isSameDay: i } = r;
  return o && a ? (s(a, o) < 0 && ([o, a] = [a, o]), s(t, o) >= (n ? 1 : 0) && s(a, t) >= (n ? 1 : 0)) : !n && a ? i(a, t) : !n && o ? i(o, t) : !1;
}
function _r(e) {
  return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function Dn(e) {
  return !!(e && typeof e == "object" && "from" in e);
}
function Wr(e) {
  return !!(e && typeof e == "object" && "after" in e);
}
function Ir(e) {
  return !!(e && typeof e == "object" && "before" in e);
}
function ls(e) {
  return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function ds(e, t) {
  return Array.isArray(e) && e.every(t.isDate);
}
function qe(e, t, n = je) {
  const r = Array.isArray(t) ? t : [t], { isSameDay: o, differenceInCalendarDays: a, isAfter: s } = n;
  return r.some((i) => {
    if (typeof i == "boolean")
      return i;
    if (n.isDate(i))
      return o(e, i);
    if (ds(i, n))
      return i.some((c) => o(e, c));
    if (Dn(i))
      return Ge(i, e, !1, n);
    if (ls(i))
      return Array.isArray(i.dayOfWeek) ? i.dayOfWeek.includes(e.getDay()) : i.dayOfWeek === e.getDay();
    if (_r(i)) {
      const c = a(i.before, e), l = a(i.after, e), d = c > 0, u = l < 0;
      return s(i.before, i.after) ? u && d : d || u;
    }
    return Wr(i) ? a(e, i.after) > 0 : Ir(i) ? a(i.before, e) > 0 : typeof i == "function" ? i(e) : !1;
  });
}
function Nm(e, t, n, r, o) {
  const { disabled: a, hidden: s, modifiers: i, showOutsideDays: c, broadcastCalendar: l, today: d = o.today() } = t, { isSameDay: u, isSameMonth: f, startOfMonth: h, isBefore: y, endOfMonth: m, isAfter: b } = o, v = n && h(n), x = r && m(r), w = {
    [oe.focused]: [],
    [oe.outside]: [],
    [oe.disabled]: [],
    [oe.hidden]: [],
    [oe.today]: []
  }, k = {};
  for (const M of e) {
    const { date: C, displayMonth: D } = M, A = !!(D && !f(C, D)), F = !!(v && y(C, v)), T = !!(x && b(C, x)), I = !!(a && qe(C, a, o)), Y = !!(s && qe(C, s, o)) || F || T || // Broadcast calendar will show outside days as default
    !l && !c && A || l && c === !1 && A, G = u(C, d);
    A && w.outside.push(M), I && w.disabled.push(M), Y && w.hidden.push(M), G && w.today.push(M), i && Object.keys(i).forEach((O) => {
      const E = i == null ? void 0 : i[O];
      E && qe(C, E, o) && (k[O] ? k[O].push(M) : k[O] = [M]);
    });
  }
  return (M) => {
    const C = {
      [oe.focused]: !1,
      [oe.disabled]: !1,
      [oe.hidden]: !1,
      [oe.outside]: !1,
      [oe.today]: !1
    }, D = {};
    for (const A in w) {
      const F = w[A];
      C[A] = F.some((T) => T === M);
    }
    for (const A in k)
      D[A] = k[A].some((F) => F === M);
    return {
      ...C,
      // custom modifiers should override all the previous ones
      ...D
    };
  };
}
function Pm(e, t, n = {}) {
  return Object.entries(e).filter(([, o]) => o === !0).reduce((o, [a]) => (n[a] ? o.push(n[a]) : t[oe[a]] ? o.push(t[oe[a]]) : t[De[a]] && o.push(t[De[a]]), o), [t[B.Day]]);
}
function Em(e) {
  return {
    ...Sm,
    ...e
  };
}
function Rm(e) {
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
function Am() {
  const e = {};
  for (const t in B)
    e[B[t]] = `rdp-${B[t]}`;
  for (const t in oe)
    e[oe[t]] = `rdp-${oe[t]}`;
  for (const t in De)
    e[De[t]] = `rdp-${De[t]}`;
  for (const t in ge)
    e[ge[t]] = `rdp-${ge[t]}`;
  return e;
}
function us(e, t, n) {
  return (n ?? new de(t)).formatMonthYear(e);
}
const Tm = us;
function _m(e, t, n) {
  return (n ?? new de(t)).format(e, "d");
}
function Wm(e, t = je) {
  return t.format(e, "LLLL");
}
function Im(e, t, n) {
  return (n ?? new de(t)).format(e, "cccccc");
}
function $m(e, t = je) {
  return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
function Fm() {
  return "";
}
function fs(e, t = je) {
  return t.format(e, "yyyy");
}
const Ym = fs, Bm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  formatCaption: us,
  formatDay: _m,
  formatMonthCaption: Tm,
  formatMonthDropdown: Wm,
  formatWeekNumber: $m,
  formatWeekNumberHeader: Fm,
  formatWeekdayName: Im,
  formatYearCaption: Ym,
  formatYearDropdown: fs
}, Symbol.toStringTag, { value: "Module" }));
function Lm(e) {
  return e != null && e.formatMonthCaption && !e.formatCaption && (e.formatCaption = e.formatMonthCaption), e != null && e.formatYearCaption && !e.formatYearDropdown && (e.formatYearDropdown = e.formatYearCaption), {
    ...Bm,
    ...e
  };
}
function $r(e, t, n, r) {
  let o = (r ?? new de(n)).format(e, "PPPP");
  return t.today && (o = `Today, ${o}`), t.selected && (o = `${o}, selected`), o;
}
const zm = $r;
function Fr(e, t, n) {
  return (n ?? new de(t)).formatMonthYear(e);
}
const Hm = Fr;
function hs(e, t, n, r) {
  let o = (r ?? new de(n)).format(e, "PPPP");
  return t != null && t.today && (o = `Today, ${o}`), o;
}
function ms(e) {
  return "Choose the Month";
}
function ps() {
  return "";
}
const jm = "Go to the Next Month";
function gs(e, t) {
  return jm;
}
function bs(e) {
  return "Go to the Previous Month";
}
function vs(e, t, n) {
  return (n ?? new de(t)).format(e, "cccc");
}
function ys(e, t) {
  return `Week ${e}`;
}
function ws(e) {
  return "Week Number";
}
function xs(e) {
  return "Choose the Year";
}
const Vm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  labelCaption: Hm,
  labelDay: zm,
  labelDayButton: $r,
  labelGrid: Fr,
  labelGridcell: hs,
  labelMonthDropdown: ms,
  labelNav: ps,
  labelNext: gs,
  labelPrevious: bs,
  labelWeekNumber: ys,
  labelWeekNumberHeader: ws,
  labelWeekday: vs,
  labelYearDropdown: xs
}, Symbol.toStringTag, { value: "Module" })), Me = (e, t, n) => t || (n ? typeof n == "function" ? n : (...r) => n : e);
function Gm(e, t) {
  var r;
  const n = ((r = t.locale) == null ? void 0 : r.labels) ?? {};
  return {
    ...Vm,
    ...e ?? {},
    labelDayButton: Me($r, e == null ? void 0 : e.labelDayButton, n.labelDayButton),
    labelMonthDropdown: Me(ms, e == null ? void 0 : e.labelMonthDropdown, n.labelMonthDropdown),
    labelNext: Me(gs, e == null ? void 0 : e.labelNext, n.labelNext),
    labelPrevious: Me(bs, e == null ? void 0 : e.labelPrevious, n.labelPrevious),
    labelWeekNumber: Me(ys, e == null ? void 0 : e.labelWeekNumber, n.labelWeekNumber),
    labelYearDropdown: Me(xs, e == null ? void 0 : e.labelYearDropdown, n.labelYearDropdown),
    labelGrid: Me(Fr, e == null ? void 0 : e.labelGrid, n.labelGrid),
    labelGridcell: Me(hs, e == null ? void 0 : e.labelGridcell, n.labelGridcell),
    labelNav: Me(ps, e == null ? void 0 : e.labelNav, n.labelNav),
    labelWeekNumberHeader: Me(ws, e == null ? void 0 : e.labelWeekNumberHeader, n.labelWeekNumberHeader),
    labelWeekday: Me(vs, e == null ? void 0 : e.labelWeekday, n.labelWeekday)
  };
}
function qm(e, t, n, r, o) {
  const { startOfMonth: a, startOfYear: s, endOfYear: i, eachMonthOfInterval: c, getMonth: l } = o;
  return c({
    start: s(e),
    end: i(e)
  }).map((f) => {
    const h = r.formatMonthDropdown(f, o), y = l(f), m = t && f < a(t) || n && f > a(n) || !1;
    return { value: y, label: h, disabled: m };
  });
}
function Um(e, t = {}, n = {}) {
  let r = { ...t == null ? void 0 : t[B.Day] };
  return Object.entries(e).filter(([, o]) => o === !0).forEach(([o]) => {
    r = {
      ...r,
      ...n == null ? void 0 : n[o]
    };
  }), r;
}
function Xm(e, t, n, r) {
  const o = r ?? e.today(), a = n ? e.startOfBroadcastWeek(o, e) : t ? e.startOfISOWeek(o) : e.startOfWeek(o), s = [];
  for (let i = 0; i < 7; i++) {
    const c = e.addDays(a, i);
    s.push(c);
  }
  return s;
}
function Km(e, t, n, r, o = !1) {
  if (!e || !t)
    return;
  const { startOfYear: a, endOfYear: s, eachYearOfInterval: i, getYear: c } = r, l = a(e), d = s(t), u = i({ start: l, end: d });
  return o && u.reverse(), u.map((f) => {
    const h = n.formatYearDropdown(f, r);
    return {
      value: c(f),
      label: h,
      disabled: !1
    };
  });
}
function Qm(e, t = {}) {
  var i;
  const { weekStartsOn: n, locale: r } = t, o = n ?? ((i = r == null ? void 0 : r.options) == null ? void 0 : i.weekStartsOn) ?? 0, a = (c) => {
    const l = typeof c == "number" || typeof c == "string" ? new Date(c) : c;
    return new ue(l.getFullYear(), l.getMonth(), l.getDate(), 12, 0, 0, e);
  }, s = (c) => {
    const l = a(c);
    return new Date(l.getFullYear(), l.getMonth(), l.getDate(), 0, 0, 0, 0);
  };
  return {
    today: () => a(ue.tz(e)),
    newDate: (c, l, d) => new ue(c, l, d, 12, 0, 0, e),
    startOfDay: (c) => a(c),
    startOfWeek: (c, l) => {
      const d = a(c), u = (l == null ? void 0 : l.weekStartsOn) ?? o, f = (d.getDay() - u + 7) % 7;
      return d.setDate(d.getDate() - f), d;
    },
    startOfISOWeek: (c) => {
      const l = a(c), d = (l.getDay() - 1 + 7) % 7;
      return l.setDate(l.getDate() - d), l;
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
      const d = a(c), h = ((((l == null ? void 0 : l.weekStartsOn) ?? o) + 6) % 7 - d.getDay() + 7) % 7;
      return d.setDate(d.getDate() + h), d;
    },
    endOfISOWeek: (c) => {
      const l = a(c), d = (7 - l.getDay()) % 7;
      return l.setDate(l.getDate() + d), l;
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
      const l = a(c.start), d = a(c.end), u = [], f = new ue(l.getFullYear(), l.getMonth(), 1, 12, 0, 0, e), h = d.getFullYear() * 12 + d.getMonth();
      for (; f.getFullYear() * 12 + f.getMonth() <= h; )
        u.push(new ue(f, e)), f.setMonth(f.getMonth() + 1, 1);
      return u;
    },
    // Normalize to noon once before arithmetic (avoid DST/midnight edge cases),
    // mutate the same TZDate, and return it.
    addDays: (c, l) => {
      const d = a(c);
      return d.setDate(d.getDate() + l), d;
    },
    addWeeks: (c, l) => {
      const d = a(c);
      return d.setDate(d.getDate() + l * 7), d;
    },
    addMonths: (c, l) => {
      const d = a(c);
      return d.setMonth(d.getMonth() + l), d;
    },
    addYears: (c, l) => {
      const d = a(c);
      return d.setFullYear(d.getFullYear() + l), d;
    },
    eachYearOfInterval: (c) => {
      const l = a(c.start), d = a(c.end), u = [], f = new ue(l.getFullYear(), 0, 1, 12, 0, 0, e);
      for (; f.getFullYear() <= d.getFullYear(); )
        u.push(new ue(f, e)), f.setFullYear(f.getFullYear() + 1, 0, 1);
      return u;
    },
    getWeek: (c, l) => {
      var u;
      const d = s(c);
      return Tr(d, {
        weekStartsOn: (l == null ? void 0 : l.weekStartsOn) ?? o,
        firstWeekContainsDate: (l == null ? void 0 : l.firstWeekContainsDate) ?? ((u = r == null ? void 0 : r.options) == null ? void 0 : u.firstWeekContainsDate) ?? 1
      });
    },
    getISOWeek: (c) => {
      const l = s(c);
      return Ar(l);
    },
    differenceInCalendarDays: (c, l) => {
      const d = s(c), u = s(l);
      return Rr(d, u);
    },
    differenceInCalendarMonths: (c, l) => {
      const d = s(c), u = s(l);
      return Za(d, u);
    }
  };
}
const Kt = (e) => e instanceof HTMLElement ? e : null, Zn = (e) => [
  ...e.querySelectorAll("[data-animated-month]") ?? []
], Zm = (e) => Kt(e.querySelector("[data-animated-month]")), Jn = (e) => Kt(e.querySelector("[data-animated-caption]")), er = (e) => Kt(e.querySelector("[data-animated-weeks]")), Jm = (e) => Kt(e.querySelector("[data-animated-nav]")), ep = (e) => Kt(e.querySelector("[data-animated-weekdays]"));
function tp(e, t, { classNames: n, months: r, focused: o, dateLib: a }) {
  const s = Ct(null), i = Ct(r), c = Ct(!1);
  jo(() => {
    const l = i.current;
    if (i.current = r, !t || !e.current || // safety check because the ref can be set to anything by consumers
    !(e.current instanceof HTMLElement) || // validation required for the animation to work as expected
    r.length === 0 || l.length === 0 || r.length !== l.length)
      return;
    const d = a.isSameMonth(r[0].date, l[0].date), u = a.isAfter(r[0].date, l[0].date), f = u ? n[ge.caption_after_enter] : n[ge.caption_before_enter], h = u ? n[ge.weeks_after_enter] : n[ge.weeks_before_enter], y = s.current, m = e.current.cloneNode(!0);
    if (m instanceof HTMLElement ? (Zn(m).forEach((w) => {
      if (!(w instanceof HTMLElement))
        return;
      const k = Zm(w);
      k && w.contains(k) && w.removeChild(k);
      const M = Jn(w);
      M && M.classList.remove(f);
      const C = er(w);
      C && C.classList.remove(h);
    }), s.current = m) : s.current = null, c.current || d || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    o)
      return;
    const b = y instanceof HTMLElement ? Zn(y) : [], v = Zn(e.current);
    if (v != null && v.every((x) => x instanceof HTMLElement) && b && b.every((x) => x instanceof HTMLElement)) {
      c.current = !0, e.current.style.isolation = "isolate";
      const x = Jm(e.current);
      x && (x.style.zIndex = "1"), v.forEach((w, k) => {
        const M = b[k];
        if (!M)
          return;
        w.style.position = "relative", w.style.overflow = "hidden";
        const C = Jn(w);
        C && C.classList.add(f);
        const D = er(w);
        D && D.classList.add(h);
        const A = () => {
          c.current = !1, e.current && (e.current.style.isolation = ""), x && (x.style.zIndex = ""), C && C.classList.remove(f), D && D.classList.remove(h), w.style.position = "", w.style.overflow = "", w.contains(M) && w.removeChild(M);
        };
        M.style.pointerEvents = "none", M.style.position = "absolute", M.style.overflow = "hidden", M.setAttribute("aria-hidden", "true");
        const F = ep(M);
        F && (F.style.opacity = "0");
        const T = Jn(M);
        T && (T.classList.add(u ? n[ge.caption_before_exit] : n[ge.caption_after_exit]), T.addEventListener("animationend", A));
        const I = er(M);
        I && I.classList.add(u ? n[ge.weeks_before_exit] : n[ge.weeks_after_exit]), w.insertBefore(M, w.firstChild);
      });
    }
  });
}
function np(e, t, n, r) {
  const o = e[0], a = e[e.length - 1], { ISOWeek: s, fixedWeeks: i, broadcastCalendar: c } = n ?? {}, { addDays: l, differenceInCalendarDays: d, differenceInCalendarMonths: u, endOfBroadcastWeek: f, endOfISOWeek: h, endOfMonth: y, endOfWeek: m, isAfter: b, startOfBroadcastWeek: v, startOfISOWeek: x, startOfWeek: w } = r, k = c ? v(o, r) : s ? x(o) : w(o), M = c ? f(a) : s ? h(y(a)) : m(y(a)), C = t && (c ? f(t) : s ? h(t) : m(t)), D = C && b(M, C) ? C : M, A = d(D, k), F = u(a, o) + 1, T = [];
  for (let G = 0; G <= A; G++) {
    const O = l(k, G);
    T.push(O);
  }
  const Y = (c ? 35 : 42) * F;
  if (i && T.length < Y) {
    const G = Y - T.length;
    for (let O = 0; O < G; O++) {
      const E = l(T[T.length - 1], 1);
      T.push(E);
    }
  }
  return T;
}
function rp(e) {
  const t = [];
  return e.reduce((n, r) => {
    const o = r.weeks.reduce((a, s) => a.concat(s.days.slice()), t.slice());
    return n.concat(o.slice());
  }, t.slice());
}
function op(e, t, n, r) {
  const { numberOfMonths: o = 1 } = n, a = [];
  for (let s = 0; s < o; s++) {
    const i = r.addMonths(e, s);
    if (t && i > t)
      break;
    a.push(i);
  }
  return a;
}
function Yo(e, t, n, r) {
  const { month: o, defaultMonth: a, today: s = r.today(), numberOfMonths: i = 1 } = e;
  let c = o || a || s;
  const { differenceInCalendarMonths: l, addMonths: d, startOfMonth: u } = r;
  if (n && l(n, c) < i - 1) {
    const f = -1 * (i - 1);
    c = d(n, f);
  }
  return t && l(c, t) < 0 && (c = t), u(c);
}
function ap(e, t, n, r) {
  const { addDays: o, endOfBroadcastWeek: a, endOfISOWeek: s, endOfMonth: i, endOfWeek: c, getISOWeek: l, getWeek: d, startOfBroadcastWeek: u, startOfISOWeek: f, startOfWeek: h } = r, y = e.reduce((m, b) => {
    const v = n.broadcastCalendar ? u(b, r) : n.ISOWeek ? f(b) : h(b), x = n.broadcastCalendar ? a(b) : n.ISOWeek ? s(i(b)) : c(i(b)), w = t.filter((D) => D >= v && D <= x), k = n.broadcastCalendar ? 35 : 42;
    if (n.fixedWeeks && w.length < k) {
      const D = t.filter((A) => {
        const F = k - w.length;
        return A > x && A <= o(x, F);
      });
      w.push(...D);
    }
    const M = w.reduce((D, A) => {
      const F = n.ISOWeek ? l(A) : d(A), T = D.find((Y) => Y.weekNumber === F), I = new is(A, b, r);
      return T ? T.days.push(I) : D.push(new em(F, [I])), D;
    }, []), C = new Jh(b, M);
    return m.push(C), m;
  }, []);
  return n.reverseMonths ? y.reverse() : y;
}
function sp(e, t) {
  let { startMonth: n, endMonth: r } = e;
  const { startOfYear: o, startOfDay: a, startOfMonth: s, endOfMonth: i, addYears: c, endOfYear: l, newDate: d, today: u } = t, { fromYear: f, toYear: h, fromMonth: y, toMonth: m } = e;
  !n && y && (n = y), !n && f && (n = t.newDate(f, 0, 1)), !r && m && (r = m), !r && h && (r = d(h, 11, 31));
  const b = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
  return n ? n = s(n) : f ? n = d(f, 0, 1) : !n && b && (n = o(c(e.today ?? u(), -100))), r ? r = i(r) : h ? r = d(h, 11, 31) : !r && b && (r = l(e.today ?? u())), [
    n && a(n),
    r && a(r)
  ];
}
function ip(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: a = 1 } = n, { startOfMonth: s, addMonths: i, differenceInCalendarMonths: c } = r, l = o ? a : 1, d = s(e);
  if (!t)
    return i(d, l);
  if (!(c(t, e) < a))
    return i(d, l);
}
function cp(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: a } = n, { startOfMonth: s, addMonths: i, differenceInCalendarMonths: c } = r, l = o ? a ?? 1 : 1, d = s(e);
  if (!t)
    return i(d, -l);
  if (!(c(d, t) <= 0))
    return i(d, -l);
}
function lp(e) {
  const t = [];
  return e.reduce((n, r) => n.concat(r.weeks.slice()), t.slice());
}
function On(e, t) {
  const [n, r] = ve(e);
  return [t === void 0 ? n : t, r];
}
function dp(e, t) {
  var k;
  const [n, r] = sp(e, t), { startOfMonth: o, endOfMonth: a } = t, s = Yo(e, n, r, t), [i, c] = On(
    s,
    // initialMonth is always computed from props.month if provided
    e.month ? s : void 0
  );
  Bt(() => {
    const M = Yo(e, n, r, t);
    c(M);
  }, [e.timeZone]);
  const { months: l, weeks: d, days: u, previousMonth: f, nextMonth: h } = Be(() => {
    const M = op(i, r, { numberOfMonths: e.numberOfMonths }, t), C = np(M, e.endMonth ? a(e.endMonth) : void 0, {
      ISOWeek: e.ISOWeek,
      fixedWeeks: e.fixedWeeks,
      broadcastCalendar: e.broadcastCalendar
    }, t), D = ap(M, C, {
      broadcastCalendar: e.broadcastCalendar,
      fixedWeeks: e.fixedWeeks,
      ISOWeek: e.ISOWeek,
      reverseMonths: e.reverseMonths
    }, t), A = lp(D), F = rp(D), T = cp(i, n, e, t), I = ip(i, r, e, t);
    return {
      months: D,
      weeks: A,
      days: F,
      previousMonth: T,
      nextMonth: I
    };
  }, [
    t,
    i.getTime(),
    r == null ? void 0 : r.getTime(),
    n == null ? void 0 : n.getTime(),
    e.disableNavigation,
    e.broadcastCalendar,
    (k = e.endMonth) == null ? void 0 : k.getTime(),
    e.fixedWeeks,
    e.ISOWeek,
    e.numberOfMonths,
    e.pagedNavigation,
    e.reverseMonths
  ]), { disableNavigation: y, onMonthChange: m } = e, b = (M) => d.some((C) => C.days.some((D) => D.isEqualTo(M))), v = (M) => {
    if (y)
      return;
    let C = o(M);
    n && C < o(n) && (C = o(n)), r && C > o(r) && (C = o(r)), c(C), m == null || m(C);
  };
  return {
    months: l,
    weeks: d,
    days: u,
    navStart: n,
    navEnd: r,
    previousMonth: f,
    nextMonth: h,
    goToMonth: v,
    goToDay: (M) => {
      b(M) || v(M.date);
    }
  };
}
var _e;
(function(e) {
  e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(_e || (_e = {}));
function Bo(e) {
  return !e[oe.disabled] && !e[oe.hidden] && !e[oe.outside];
}
function up(e, t, n, r) {
  let o, a = -1;
  for (const s of e) {
    const i = t(s);
    Bo(i) && (i[oe.focused] && a < _e.FocusedModifier ? (o = s, a = _e.FocusedModifier) : r != null && r.isEqualTo(s) && a < _e.LastFocused ? (o = s, a = _e.LastFocused) : n(s.date) && a < _e.Selected ? (o = s, a = _e.Selected) : i[oe.today] && a < _e.Today && (o = s, a = _e.Today));
  }
  return o || (o = e.find((s) => Bo(t(s)))), o;
}
function fp(e, t, n, r, o, a, s) {
  const { ISOWeek: i, broadcastCalendar: c } = a, { addDays: l, addMonths: d, addWeeks: u, addYears: f, endOfBroadcastWeek: h, endOfISOWeek: y, endOfWeek: m, max: b, min: v, startOfBroadcastWeek: x, startOfISOWeek: w, startOfWeek: k } = s;
  let C = {
    day: l,
    week: u,
    month: d,
    year: f,
    startOfWeek: (D) => c ? x(D, s) : i ? w(D) : k(D),
    endOfWeek: (D) => c ? h(D) : i ? y(D) : m(D)
  }[e](n, t === "after" ? 1 : -1);
  return t === "before" && r ? C = b([r, C]) : t === "after" && o && (C = v([o, C])), C;
}
function Cs(e, t, n, r, o, a, s, i = 0) {
  if (i > 365)
    return;
  const c = fp(e, t, n.date, r, o, a, s), l = !!(a.disabled && qe(c, a.disabled, s)), d = !!(a.hidden && qe(c, a.hidden, s)), u = c, f = new is(c, u, s);
  return !l && !d ? f : Cs(e, t, f, r, o, a, s, i + 1);
}
function hp(e, t, n, r, o) {
  const { autoFocus: a } = e, [s, i] = ve(), c = up(t.days, n, r || (() => !1), s), [l, d] = ve(a ? c : void 0);
  return {
    isFocusTarget: (m) => !!(c != null && c.isEqualTo(m)),
    setFocused: d,
    focused: l,
    blur: () => {
      i(l), d(void 0);
    },
    moveFocus: (m, b) => {
      if (!l)
        return;
      const v = Cs(m, b, l, t.navStart, t.navEnd, e, o);
      v && (e.disableNavigation && !t.days.some((w) => w.isEqualTo(v)) || (t.goToDay(v), d(v)));
    }
  };
}
function mp(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [a, s] = On(n, o ? n : void 0), i = o ? n : a, { isSameDay: c } = t, l = (h) => (i == null ? void 0 : i.some((y) => c(y, h))) ?? !1, { min: d, max: u } = e;
  return {
    selected: i,
    select: (h, y, m) => {
      let b = [...i ?? []];
      if (l(h)) {
        if ((i == null ? void 0 : i.length) === d || r && (i == null ? void 0 : i.length) === 1)
          return;
        b = i == null ? void 0 : i.filter((v) => !c(v, h));
      } else
        (i == null ? void 0 : i.length) === u ? b = [h] : b = [...b, h];
      return o || s(b), o == null || o(b, h, y, m), b;
    },
    isSelected: l
  };
}
function pp(e, t, n = 0, r = 0, o = !1, a = je) {
  const { from: s, to: i } = t || {}, { isSameDay: c, isAfter: l, isBefore: d } = a;
  let u;
  if (!s && !i)
    u = { from: e, to: n > 0 ? void 0 : e };
  else if (s && !i)
    c(s, e) ? n === 0 ? u = { from: s, to: e } : o ? u = { from: s, to: void 0 } : u = void 0 : d(e, s) ? u = { from: e, to: s } : u = { from: s, to: e };
  else if (s && i)
    if (c(s, e) && c(i, e))
      o ? u = { from: s, to: i } : u = void 0;
    else if (c(s, e))
      u = { from: s, to: n > 0 ? void 0 : e };
    else if (c(i, e))
      u = { from: e, to: n > 0 ? void 0 : e };
    else if (d(e, s))
      u = { from: e, to: i };
    else if (l(e, s))
      u = { from: s, to: e };
    else if (l(e, i))
      u = { from: s, to: e };
    else
      throw new Error("Invalid range");
  if (u != null && u.from && (u != null && u.to)) {
    const f = a.differenceInCalendarDays(u.to, u.from);
    r > 0 && f > r ? u = { from: e, to: void 0 } : n > 1 && f < n && (u = { from: e, to: void 0 });
  }
  return u;
}
function gp(e, t, n = je) {
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
function Lo(e, t, n = je) {
  return Ge(e, t.from, !1, n) || Ge(e, t.to, !1, n) || Ge(t, e.from, !1, n) || Ge(t, e.to, !1, n);
}
function bp(e, t, n = je) {
  const r = Array.isArray(t) ? t : [t];
  if (r.filter((i) => typeof i != "function").some((i) => typeof i == "boolean" ? i : n.isDate(i) ? Ge(e, i, !1, n) : ds(i, n) ? i.some((c) => Ge(e, c, !1, n)) : Dn(i) ? i.from && i.to ? Lo(e, { from: i.from, to: i.to }, n) : !1 : ls(i) ? gp(e, i.dayOfWeek, n) : _r(i) ? n.isAfter(i.before, i.after) ? Lo(e, {
    from: n.addDays(i.after, 1),
    to: n.addDays(i.before, -1)
  }, n) : qe(e.from, i, n) || qe(e.to, i, n) : Wr(i) || Ir(i) ? qe(e.from, i, n) || qe(e.to, i, n) : !1))
    return !0;
  const s = r.filter((i) => typeof i == "function");
  if (s.length) {
    let i = e.from;
    const c = n.differenceInCalendarDays(e.to, e.from);
    for (let l = 0; l <= c; l++) {
      if (s.some((d) => d(i)))
        return !0;
      i = n.addDays(i, 1);
    }
  }
  return !1;
}
function vp(e, t) {
  const { disabled: n, excludeDisabled: r, selected: o, required: a, onSelect: s } = e, [i, c] = On(o, s ? o : void 0), l = s ? o : i;
  return {
    selected: l,
    select: (f, h, y) => {
      const { min: m, max: b } = e, v = f ? pp(f, l, m, b, a, t) : void 0;
      return r && n && (v != null && v.from) && v.to && bp({ from: v.from, to: v.to }, n, t) && (v.from = f, v.to = void 0), s || c(v), s == null || s(v, f, h, y), v;
    },
    isSelected: (f) => l && Ge(l, f, !1, t)
  };
}
function yp(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [a, s] = On(n, o ? n : void 0), i = o ? n : a, { isSameDay: c } = t;
  return {
    selected: i,
    select: (u, f, h) => {
      let y = u;
      return !r && i && i && c(u, i) && (y = void 0), o || s(y), o == null || o(y, u, f, h), y;
    },
    isSelected: (u) => i ? c(i, u) : !1
  };
}
function wp(e, t) {
  const n = yp(e, t), r = mp(e, t), o = vp(e, t);
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
function Ce(e, t) {
  return e instanceof ue && e.timeZone === t ? e : new ue(e, t);
}
function wt(e, t, n) {
  return Ce(e, t);
}
function zo(e, t, n) {
  return typeof e == "boolean" || typeof e == "function" ? e : e instanceof Date ? wt(e, t) : Array.isArray(e) ? e.map((r) => r instanceof Date ? wt(r, t) : r) : Dn(e) ? {
    ...e,
    from: e.from ? Ce(e.from, t) : e.from,
    to: e.to ? Ce(e.to, t) : e.to
  } : _r(e) ? {
    before: wt(e.before, t),
    after: wt(e.after, t)
  } : Wr(e) ? {
    after: wt(e.after, t)
  } : Ir(e) ? {
    before: wt(e.before, t)
  } : e;
}
function tr(e, t, n) {
  return e && (Array.isArray(e) ? e.map((r) => zo(r, t)) : zo(e, t));
}
function ks(e) {
  var eo;
  let t = e;
  const n = t.timeZone;
  if (n && (t = {
    ...e,
    timeZone: n
  }, t.today && (t.today = Ce(t.today, n)), t.month && (t.month = Ce(t.month, n)), t.defaultMonth && (t.defaultMonth = Ce(t.defaultMonth, n)), t.startMonth && (t.startMonth = Ce(t.startMonth, n)), t.endMonth && (t.endMonth = Ce(t.endMonth, n)), t.mode === "single" && t.selected ? t.selected = Ce(t.selected, n) : t.mode === "multiple" && t.selected ? t.selected = (eo = t.selected) == null ? void 0 : eo.map((H) => Ce(H, n)) : t.mode === "range" && t.selected && (t.selected = {
    from: t.selected.from ? Ce(t.selected.from, n) : t.selected.from,
    to: t.selected.to ? Ce(t.selected.to, n) : t.selected.to
  }), t.disabled !== void 0 && (t.disabled = tr(t.disabled, n)), t.hidden !== void 0 && (t.hidden = tr(t.hidden, n)), t.modifiers)) {
    const H = {};
    Object.keys(t.modifiers).forEach((X) => {
      var z;
      H[X] = tr((z = t.modifiers) == null ? void 0 : z[X], n);
    }), t.modifiers = H;
  }
  const { components: r, formatters: o, labels: a, dateLib: s, locale: i, classNames: c } = Be(() => {
    const H = { ...ss, ...t.locale }, X = t.broadcastCalendar ? 1 : t.weekStartsOn, z = t.noonSafe && t.timeZone ? Qm(t.timeZone, {
      weekStartsOn: X,
      locale: H
    }) : void 0, U = t.dateLib && z ? { ...z, ...t.dateLib } : t.dateLib ?? z, pe = new de({
      locale: H,
      weekStartsOn: X,
      firstWeekContainsDate: t.firstWeekContainsDate,
      useAdditionalWeekYearTokens: t.useAdditionalWeekYearTokens,
      useAdditionalDayOfYearTokens: t.useAdditionalDayOfYearTokens,
      timeZone: t.timeZone,
      numerals: t.numerals
    }, U);
    return {
      dateLib: pe,
      components: Em(t.components),
      formatters: Lm(t.formatters),
      labels: Gm(t.labels, pe.options),
      locale: H,
      classNames: { ...Am(), ...t.classNames }
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
  const { captionLayout: l, mode: d, navLayout: u, numberOfMonths: f = 1, onDayBlur: h, onDayClick: y, onDayFocus: m, onDayKeyDown: b, onDayMouseEnter: v, onDayMouseLeave: x, onNextClick: w, onPrevClick: k, showWeekNumber: M, styles: C } = t, { formatCaption: D, formatDay: A, formatMonthDropdown: F, formatWeekNumber: T, formatWeekNumberHeader: I, formatWeekdayName: Y, formatYearDropdown: G } = o, O = dp(t, s), { days: E, months: S, navStart: R, navEnd: N, previousMonth: _, nextMonth: $, goToMonth: L } = O, J = Nm(E, t, R, N, s), { isSelected: te, select: re, selected: le } = wp(t, s) ?? {}, { blur: ke, focused: fe, isFocusTarget: Ae, moveFocus: he, setFocused: se } = hp(t, O, J, te ?? (() => !1), s), { labelDayButton: me, labelGridcell: Te, labelGrid: we, labelMonthDropdown: Zt, labelNav: Jt, labelPrevious: _n, labelNext: Wn, labelWeekday: In, labelWeekNumber: pt, labelWeekNumberHeader: Li, labelYearDropdown: zi } = a, Hi = Be(() => Xm(s, t.ISOWeek, t.broadcastCalendar, t.today), [s, t.ISOWeek, t.broadcastCalendar, t.today]), Zr = d !== void 0 || y !== void 0, $n = xe(() => {
    _ && (L(_), k == null || k(_));
  }, [_, L, k]), Fn = xe(() => {
    $ && (L($), w == null || w($));
  }, [L, $, w]), ji = xe((H, X) => (z) => {
    z.preventDefault(), z.stopPropagation(), se(H), !X.disabled && (re == null || re(H.date, X, z), y == null || y(H.date, X, z));
  }, [re, y, se]), Vi = xe((H, X) => (z) => {
    se(H), m == null || m(H.date, X, z);
  }, [m, se]), Gi = xe((H, X) => (z) => {
    ke(), h == null || h(H.date, X, z);
  }, [ke, h]), qi = xe((H, X) => (z) => {
    const U = {
      ArrowLeft: [
        z.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "after" : "before"
      ],
      ArrowRight: [
        z.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "before" : "after"
      ],
      ArrowDown: [z.shiftKey ? "year" : "week", "after"],
      ArrowUp: [z.shiftKey ? "year" : "week", "before"],
      PageUp: [z.shiftKey ? "year" : "month", "before"],
      PageDown: [z.shiftKey ? "year" : "month", "after"],
      Home: ["startOfWeek", "before"],
      End: ["endOfWeek", "after"]
    };
    if (U[z.key]) {
      z.preventDefault(), z.stopPropagation();
      const [pe, q] = U[z.key];
      he(pe, q);
    }
    b == null || b(H.date, X, z);
  }, [he, b, t.dir]), Ui = xe((H, X) => (z) => {
    v == null || v(H.date, X, z);
  }, [v]), Xi = xe((H, X) => (z) => {
    x == null || x(H.date, X, z);
  }, [x]), Ki = xe((H) => (X) => {
    const z = Number(X.target.value), U = s.setMonth(s.startOfMonth(H), z);
    L(U);
  }, [s, L]), Qi = xe((H) => (X) => {
    const z = Number(X.target.value), U = s.setYear(s.startOfMonth(H), z);
    L(U);
  }, [s, L]), { className: Zi, style: Ji } = Be(() => ({
    className: [c[B.Root], t.className].filter(Boolean).join(" "),
    style: { ...C == null ? void 0 : C[B.Root], ...t.style }
  }), [c, t.className, t.style, C]), ec = Rm(t), Jr = Ct(null);
  tp(Jr, !!t.animate, {
    classNames: c,
    months: S,
    focused: fe,
    dateLib: s
  });
  const tc = {
    dayPickerProps: t,
    selected: le,
    select: re,
    isSelected: te,
    months: S,
    nextMonth: $,
    previousMonth: _,
    goToMonth: L,
    getModifiers: J,
    components: r,
    classNames: c,
    styles: C,
    labels: a,
    formatters: o
  };
  return P.createElement(
    cs.Provider,
    { value: tc },
    P.createElement(
      r.Root,
      { rootRef: t.animate ? Jr : void 0, className: Zi, style: Ji, dir: t.dir, id: t.id, lang: t.lang, nonce: t.nonce, title: t.title, role: t.role, "aria-label": t["aria-label"], "aria-labelledby": t["aria-labelledby"], ...ec },
      P.createElement(
        r.Months,
        { className: c[B.Months], style: C == null ? void 0 : C[B.Months] },
        !t.hideNavigation && !u && P.createElement(r.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: c[B.Nav], style: C == null ? void 0 : C[B.Nav], "aria-label": Jt(), onPreviousClick: $n, onNextClick: Fn, previousMonth: _, nextMonth: $ }),
        S.map((H, X) => P.createElement(
          r.Month,
          {
            "data-animated-month": t.animate ? "true" : void 0,
            className: c[B.Month],
            style: C == null ? void 0 : C[B.Month],
            // biome-ignore lint/suspicious/noArrayIndexKey: breaks animation
            key: X,
            displayIndex: X,
            calendarMonth: H
          },
          u === "around" && !t.hideNavigation && X === 0 && P.createElement(
            r.PreviousMonthButton,
            { type: "button", className: c[B.PreviousMonthButton], tabIndex: _ ? void 0 : -1, "aria-disabled": _ ? void 0 : !0, "aria-label": _n(_), onClick: $n, "data-animated-button": t.animate ? "true" : void 0 },
            P.createElement(r.Chevron, { disabled: _ ? void 0 : !0, className: c[B.Chevron], orientation: t.dir === "rtl" ? "right" : "left" })
          ),
          P.createElement(r.MonthCaption, { "data-animated-caption": t.animate ? "true" : void 0, className: c[B.MonthCaption], style: C == null ? void 0 : C[B.MonthCaption], calendarMonth: H, displayIndex: X }, l != null && l.startsWith("dropdown") ? P.createElement(
            r.DropdownNav,
            { className: c[B.Dropdowns], style: C == null ? void 0 : C[B.Dropdowns] },
            (() => {
              const z = l === "dropdown" || l === "dropdown-months" ? P.createElement(r.MonthsDropdown, { key: "month", className: c[B.MonthsDropdown], "aria-label": Zt(), classNames: c, components: r, disabled: !!t.disableNavigation, onChange: Ki(H.date), options: qm(H.date, R, N, o, s), style: C == null ? void 0 : C[B.Dropdown], value: s.getMonth(H.date) }) : P.createElement("span", { key: "month" }, F(H.date, s)), U = l === "dropdown" || l === "dropdown-years" ? P.createElement(r.YearsDropdown, { key: "year", className: c[B.YearsDropdown], "aria-label": zi(s.options), classNames: c, components: r, disabled: !!t.disableNavigation, onChange: Qi(H.date), options: Km(R, N, o, s, !!t.reverseYears), style: C == null ? void 0 : C[B.Dropdown], value: s.getYear(H.date) }) : P.createElement("span", { key: "year" }, G(H.date, s));
              return s.getMonthYearOrder() === "year-first" ? [U, z] : [z, U];
            })(),
            P.createElement("span", { role: "status", "aria-live": "polite", style: {
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
            } }, D(H.date, s.options, s))
          ) : P.createElement(r.CaptionLabel, { className: c[B.CaptionLabel], role: "status", "aria-live": "polite" }, D(H.date, s.options, s))),
          u === "around" && !t.hideNavigation && X === f - 1 && P.createElement(
            r.NextMonthButton,
            { type: "button", className: c[B.NextMonthButton], tabIndex: $ ? void 0 : -1, "aria-disabled": $ ? void 0 : !0, "aria-label": Wn($), onClick: Fn, "data-animated-button": t.animate ? "true" : void 0 },
            P.createElement(r.Chevron, { disabled: $ ? void 0 : !0, className: c[B.Chevron], orientation: t.dir === "rtl" ? "left" : "right" })
          ),
          X === f - 1 && u === "after" && !t.hideNavigation && P.createElement(r.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: c[B.Nav], style: C == null ? void 0 : C[B.Nav], "aria-label": Jt(), onPreviousClick: $n, onNextClick: Fn, previousMonth: _, nextMonth: $ }),
          P.createElement(
            r.MonthGrid,
            { role: "grid", "aria-multiselectable": d === "multiple" || d === "range", "aria-label": we(H.date, s.options, s) || void 0, className: c[B.MonthGrid], style: C == null ? void 0 : C[B.MonthGrid] },
            !t.hideWeekdays && P.createElement(
              r.Weekdays,
              { "data-animated-weekdays": t.animate ? "true" : void 0, className: c[B.Weekdays], style: C == null ? void 0 : C[B.Weekdays] },
              M && P.createElement(r.WeekNumberHeader, { "aria-label": Li(s.options), className: c[B.WeekNumberHeader], style: C == null ? void 0 : C[B.WeekNumberHeader], scope: "col" }, I()),
              Hi.map((z) => P.createElement(r.Weekday, { "aria-label": In(z, s.options, s), className: c[B.Weekday], key: String(z), style: C == null ? void 0 : C[B.Weekday], scope: "col" }, Y(z, s.options, s)))
            ),
            P.createElement(r.Weeks, { "data-animated-weeks": t.animate ? "true" : void 0, className: c[B.Weeks], style: C == null ? void 0 : C[B.Weeks] }, H.weeks.map((z) => P.createElement(
              r.Week,
              { className: c[B.Week], key: z.weekNumber, style: C == null ? void 0 : C[B.Week], week: z },
              M && P.createElement(r.WeekNumber, { week: z, style: C == null ? void 0 : C[B.WeekNumber], "aria-label": pt(z.weekNumber, {
                locale: i
              }), className: c[B.WeekNumber], scope: "row", role: "rowheader" }, T(z.weekNumber, s)),
              z.days.map((U) => {
                const { date: pe } = U, q = J(U);
                if (q[oe.focused] = !q.hidden && !!(fe != null && fe.isEqualTo(U)), q[De.selected] = (te == null ? void 0 : te(pe)) || q.selected, Dn(le)) {
                  const { from: Yn, to: Bn } = le;
                  q[De.range_start] = !!(Yn && Bn && s.isSameDay(pe, Yn)), q[De.range_end] = !!(Yn && Bn && s.isSameDay(pe, Bn)), q[De.range_middle] = Ge(le, pe, !0, s);
                }
                const nc = Um(q, C, t.modifiersStyles), rc = Pm(q, c, t.modifiersClassNames), oc = !Zr && !q.hidden ? Te(pe, q, s.options, s) : void 0;
                return P.createElement(r.Day, { key: `${U.isoDate}_${U.displayMonthId}`, day: U, modifiers: q, className: rc.join(" "), style: nc, role: "gridcell", "aria-selected": q.selected || void 0, "aria-label": oc, "data-day": U.isoDate, "data-month": U.outside ? U.dateMonthId : void 0, "data-selected": q.selected || void 0, "data-disabled": q.disabled || void 0, "data-hidden": q.hidden || void 0, "data-outside": U.outside || void 0, "data-focused": q.focused || void 0, "data-today": q.today || void 0 }, !q.hidden && Zr ? P.createElement(r.DayButton, { className: c[B.DayButton], style: C == null ? void 0 : C[B.DayButton], type: "button", day: U, modifiers: q, disabled: !q.focused && q.disabled || void 0, "aria-disabled": q.focused && q.disabled || void 0, tabIndex: Ae(U) ? 0 : -1, "aria-label": me(pe, q, s.options, s), onClick: ji(U, q), onBlur: Gi(U, q), onFocus: Vi(U, q), onKeyDown: qi(U, q), onMouseEnter: Ui(U, q), onMouseLeave: Xi(U, q) }, A(pe, s.options, s)) : !q.hidden && A(U.date, s.options, s));
              })
            )))
          )
        ))
      ),
      t.footer && P.createElement(r.Footer, { className: c[B.Footer], style: C == null ? void 0 : C[B.Footer], role: "status", "aria-live": "polite" }, t.footer)
    )
  );
}
const Ms = {
  ...Zh,
  labels: {
    labelDayButton: (e, t, n, r) => {
      let a = (r ?? new de(n)).format(e, "PPPP");
      return t.today && (a = `오늘, ${a}`), t.selected && (a = `${a}, 선택됨`), a;
    },
    labelMonthDropdown: "월 선택",
    labelNext: "다음 달로 이동",
    labelPrevious: "이전 달로 이동",
    labelWeekNumber: (e) => `주 ${e}`,
    labelYearDropdown: "연도 선택",
    labelGrid: (e, t, n) => (n ?? new de(t)).formatMonthYear(e),
    labelGridcell: (e, t, n, r) => {
      let a = (r ?? new de(n)).format(e, "PPPP");
      return t != null && t.today && (a = `오늘, ${a}`), a;
    },
    labelNav: "탐색 모음",
    labelWeekNumberHeader: "주 번호",
    labelWeekday: (e, t, n) => (n ?? new de(t)).format(e, "cccc")
  }
};
var xp = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Cp(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ds = { exports: {} };
(function(e, t) {
  (function(n, r) {
    e.exports = r();
  })(xp, function() {
    var n = 1e3, r = 6e4, o = 36e5, a = "millisecond", s = "second", i = "minute", c = "hour", l = "day", d = "week", u = "month", f = "quarter", h = "year", y = "date", m = "Invalid Date", b = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, v = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, x = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(O) {
      var E = ["th", "st", "nd", "rd"], S = O % 100;
      return "[" + O + (E[(S - 20) % 10] || E[S] || E[0]) + "]";
    } }, w = function(O, E, S) {
      var R = String(O);
      return !R || R.length >= E ? O : "" + Array(E + 1 - R.length).join(S) + O;
    }, k = { s: w, z: function(O) {
      var E = -O.utcOffset(), S = Math.abs(E), R = Math.floor(S / 60), N = S % 60;
      return (E <= 0 ? "+" : "-") + w(R, 2, "0") + ":" + w(N, 2, "0");
    }, m: function O(E, S) {
      if (E.date() < S.date()) return -O(S, E);
      var R = 12 * (S.year() - E.year()) + (S.month() - E.month()), N = E.clone().add(R, u), _ = S - N < 0, $ = E.clone().add(R + (_ ? -1 : 1), u);
      return +(-(R + (S - N) / (_ ? N - $ : $ - N)) || 0);
    }, a: function(O) {
      return O < 0 ? Math.ceil(O) || 0 : Math.floor(O);
    }, p: function(O) {
      return { M: u, y: h, w: d, d: l, D: y, h: c, m: i, s, ms: a, Q: f }[O] || String(O || "").toLowerCase().replace(/s$/, "");
    }, u: function(O) {
      return O === void 0;
    } }, M = "en", C = {};
    C[M] = x;
    var D = "$isDayjsObject", A = function(O) {
      return O instanceof Y || !(!O || !O[D]);
    }, F = function O(E, S, R) {
      var N;
      if (!E) return M;
      if (typeof E == "string") {
        var _ = E.toLowerCase();
        C[_] && (N = _), S && (C[_] = S, N = _);
        var $ = E.split("-");
        if (!N && $.length > 1) return O($[0]);
      } else {
        var L = E.name;
        C[L] = E, N = L;
      }
      return !R && N && (M = N), N || !R && M;
    }, T = function(O, E) {
      if (A(O)) return O.clone();
      var S = typeof E == "object" ? E : {};
      return S.date = O, S.args = arguments, new Y(S);
    }, I = k;
    I.l = F, I.i = A, I.w = function(O, E) {
      return T(O, { locale: E.$L, utc: E.$u, x: E.$x, $offset: E.$offset });
    };
    var Y = function() {
      function O(S) {
        this.$L = F(S.locale, null, !0), this.parse(S), this.$x = this.$x || S.x || {}, this[D] = !0;
      }
      var E = O.prototype;
      return E.parse = function(S) {
        this.$d = function(R) {
          var N = R.date, _ = R.utc;
          if (N === null) return /* @__PURE__ */ new Date(NaN);
          if (I.u(N)) return /* @__PURE__ */ new Date();
          if (N instanceof Date) return new Date(N);
          if (typeof N == "string" && !/Z$/i.test(N)) {
            var $ = N.match(b);
            if ($) {
              var L = $[2] - 1 || 0, J = ($[7] || "0").substring(0, 3);
              return _ ? new Date(Date.UTC($[1], L, $[3] || 1, $[4] || 0, $[5] || 0, $[6] || 0, J)) : new Date($[1], L, $[3] || 1, $[4] || 0, $[5] || 0, $[6] || 0, J);
            }
          }
          return new Date(N);
        }(S), this.init();
      }, E.init = function() {
        var S = this.$d;
        this.$y = S.getFullYear(), this.$M = S.getMonth(), this.$D = S.getDate(), this.$W = S.getDay(), this.$H = S.getHours(), this.$m = S.getMinutes(), this.$s = S.getSeconds(), this.$ms = S.getMilliseconds();
      }, E.$utils = function() {
        return I;
      }, E.isValid = function() {
        return this.$d.toString() !== m;
      }, E.isSame = function(S, R) {
        var N = T(S);
        return this.startOf(R) <= N && N <= this.endOf(R);
      }, E.isAfter = function(S, R) {
        return T(S) < this.startOf(R);
      }, E.isBefore = function(S, R) {
        return this.endOf(R) < T(S);
      }, E.$g = function(S, R, N) {
        return I.u(S) ? this[R] : this.set(N, S);
      }, E.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, E.valueOf = function() {
        return this.$d.getTime();
      }, E.startOf = function(S, R) {
        var N = this, _ = !!I.u(R) || R, $ = I.p(S), L = function(he, se) {
          var me = I.w(N.$u ? Date.UTC(N.$y, se, he) : new Date(N.$y, se, he), N);
          return _ ? me : me.endOf(l);
        }, J = function(he, se) {
          return I.w(N.toDate()[he].apply(N.toDate("s"), (_ ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(se)), N);
        }, te = this.$W, re = this.$M, le = this.$D, ke = "set" + (this.$u ? "UTC" : "");
        switch ($) {
          case h:
            return _ ? L(1, 0) : L(31, 11);
          case u:
            return _ ? L(1, re) : L(0, re + 1);
          case d:
            var fe = this.$locale().weekStart || 0, Ae = (te < fe ? te + 7 : te) - fe;
            return L(_ ? le - Ae : le + (6 - Ae), re);
          case l:
          case y:
            return J(ke + "Hours", 0);
          case c:
            return J(ke + "Minutes", 1);
          case i:
            return J(ke + "Seconds", 2);
          case s:
            return J(ke + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, E.endOf = function(S) {
        return this.startOf(S, !1);
      }, E.$set = function(S, R) {
        var N, _ = I.p(S), $ = "set" + (this.$u ? "UTC" : ""), L = (N = {}, N[l] = $ + "Date", N[y] = $ + "Date", N[u] = $ + "Month", N[h] = $ + "FullYear", N[c] = $ + "Hours", N[i] = $ + "Minutes", N[s] = $ + "Seconds", N[a] = $ + "Milliseconds", N)[_], J = _ === l ? this.$D + (R - this.$W) : R;
        if (_ === u || _ === h) {
          var te = this.clone().set(y, 1);
          te.$d[L](J), te.init(), this.$d = te.set(y, Math.min(this.$D, te.daysInMonth())).$d;
        } else L && this.$d[L](J);
        return this.init(), this;
      }, E.set = function(S, R) {
        return this.clone().$set(S, R);
      }, E.get = function(S) {
        return this[I.p(S)]();
      }, E.add = function(S, R) {
        var N, _ = this;
        S = Number(S);
        var $ = I.p(R), L = function(re) {
          var le = T(_);
          return I.w(le.date(le.date() + Math.round(re * S)), _);
        };
        if ($ === u) return this.set(u, this.$M + S);
        if ($ === h) return this.set(h, this.$y + S);
        if ($ === l) return L(1);
        if ($ === d) return L(7);
        var J = (N = {}, N[i] = r, N[c] = o, N[s] = n, N)[$] || 1, te = this.$d.getTime() + S * J;
        return I.w(te, this);
      }, E.subtract = function(S, R) {
        return this.add(-1 * S, R);
      }, E.format = function(S) {
        var R = this, N = this.$locale();
        if (!this.isValid()) return N.invalidDate || m;
        var _ = S || "YYYY-MM-DDTHH:mm:ssZ", $ = I.z(this), L = this.$H, J = this.$m, te = this.$M, re = N.weekdays, le = N.months, ke = N.meridiem, fe = function(se, me, Te, we) {
          return se && (se[me] || se(R, _)) || Te[me].slice(0, we);
        }, Ae = function(se) {
          return I.s(L % 12 || 12, se, "0");
        }, he = ke || function(se, me, Te) {
          var we = se < 12 ? "AM" : "PM";
          return Te ? we.toLowerCase() : we;
        };
        return _.replace(v, function(se, me) {
          return me || function(Te) {
            switch (Te) {
              case "YY":
                return String(R.$y).slice(-2);
              case "YYYY":
                return I.s(R.$y, 4, "0");
              case "M":
                return te + 1;
              case "MM":
                return I.s(te + 1, 2, "0");
              case "MMM":
                return fe(N.monthsShort, te, le, 3);
              case "MMMM":
                return fe(le, te);
              case "D":
                return R.$D;
              case "DD":
                return I.s(R.$D, 2, "0");
              case "d":
                return String(R.$W);
              case "dd":
                return fe(N.weekdaysMin, R.$W, re, 2);
              case "ddd":
                return fe(N.weekdaysShort, R.$W, re, 3);
              case "dddd":
                return re[R.$W];
              case "H":
                return String(L);
              case "HH":
                return I.s(L, 2, "0");
              case "h":
                return Ae(1);
              case "hh":
                return Ae(2);
              case "a":
                return he(L, J, !0);
              case "A":
                return he(L, J, !1);
              case "m":
                return String(J);
              case "mm":
                return I.s(J, 2, "0");
              case "s":
                return String(R.$s);
              case "ss":
                return I.s(R.$s, 2, "0");
              case "SSS":
                return I.s(R.$ms, 3, "0");
              case "Z":
                return $;
            }
            return null;
          }(se) || $.replace(":", "");
        });
      }, E.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, E.diff = function(S, R, N) {
        var _, $ = this, L = I.p(R), J = T(S), te = (J.utcOffset() - this.utcOffset()) * r, re = this - J, le = function() {
          return I.m($, J);
        };
        switch (L) {
          case h:
            _ = le() / 12;
            break;
          case u:
            _ = le();
            break;
          case f:
            _ = le() / 3;
            break;
          case d:
            _ = (re - te) / 6048e5;
            break;
          case l:
            _ = (re - te) / 864e5;
            break;
          case c:
            _ = re / o;
            break;
          case i:
            _ = re / r;
            break;
          case s:
            _ = re / n;
            break;
          default:
            _ = re;
        }
        return N ? _ : I.a(_);
      }, E.daysInMonth = function() {
        return this.endOf(u).$D;
      }, E.$locale = function() {
        return C[this.$L];
      }, E.locale = function(S, R) {
        if (!S) return this.$L;
        var N = this.clone(), _ = F(S, R, !0);
        return _ && (N.$L = _), N;
      }, E.clone = function() {
        return I.w(this.$d, this);
      }, E.toDate = function() {
        return new Date(this.valueOf());
      }, E.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, E.toISOString = function() {
        return this.$d.toISOString();
      }, E.toString = function() {
        return this.$d.toUTCString();
      }, O;
    }(), G = Y.prototype;
    return T.prototype = G, [["$ms", a], ["$s", s], ["$m", i], ["$H", c], ["$W", l], ["$M", u], ["$y", h], ["$D", y]].forEach(function(O) {
      G[O[1]] = function(E) {
        return this.$g(E, O[0], O[1]);
      };
    }), T.extend = function(O, E) {
      return O.$i || (O(E, Y, T), O.$i = !0), T;
    }, T.locale = F, T.isDayjs = A, T.unix = function(O) {
      return T(1e3 * O);
    }, T.en = C[M], T.Ls = C, T.p = {}, T;
  });
})(Ds);
var kp = Ds.exports;
const ie = /* @__PURE__ */ Cp(kp), Mp = P.forwardRef(
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
    className: d
  }, u) => {
    const [f, h] = ve(!1), [y, m] = ve(
      e ? ie(e) : void 0
    );
    Bt(() => {
      m(e ? ie(e) : void 0);
    }, [e]);
    const b = Be(() => y == null ? void 0 : y.toDate(), [y]), v = (C) => {
      if (!C) {
        m(void 0);
        return;
      }
      const D = ie(C);
      m(D);
    }, x = () => {
      y && (t == null || t(y.format("YYYY-MM-DD")), h(!1));
    }, w = () => {
      m(e ? ie(e) : void 0), h(!1);
    }, k = Be(() => e ? ie(e).format("YYYY-MM-DD") : "", [e]), M = Be(() => {
      const C = [];
      return o && C.push({ before: ie(o).toDate() }), a && C.push({ after: ie(a).toDate() }), C.length > 0 ? C : void 0;
    }, [o, a]);
    return /* @__PURE__ */ V("div", { ref: u, className: W("flex flex-col gap-1", d), children: [
      n && /* @__PURE__ */ g("label", { className: "text-sm font-medium text-gray-700", children: n }),
      /* @__PURE__ */ V(
        Nr,
        {
          open: f && !s,
          onOpenChange: h,
          children: [
            /* @__PURE__ */ g(Pr, { asChild: !0, children: /* @__PURE__ */ g("div", { className: "relative", children: /* @__PURE__ */ g(
              "input",
              {
                type: "text",
                readOnly: !0,
                value: k,
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
            /* @__PURE__ */ g(Er, { children: /* @__PURE__ */ V(
              Mn,
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
                  /* @__PURE__ */ g("div", { className: "date-picker-calendar", children: /* @__PURE__ */ g(
                    ks,
                    {
                      mode: "single",
                      selected: b,
                      onSelect: v,
                      locale: Ms,
                      disabled: M,
                      formatters: {
                        formatCaption: (C) => `${C.getFullYear()}년 ${C.getMonth() + 1}월`
                      }
                    }
                  ) }),
                  /* @__PURE__ */ V(
                    "div",
                    {
                      className: W(
                        "flex items-end justify-between mt-2 pt-2",
                        "border-t border-gray-200"
                      ),
                      children: [
                        /* @__PURE__ */ g("div", { className: "flex flex-col min-h-8", children: y ? /* @__PURE__ */ g("span", { className: "text-xs text-gray-700", children: y.format("YYYY-MM-DD") }) : /* @__PURE__ */ g("span", { className: "text-xs text-red-500", children: "날짜를 선택해 주세요." }) }),
                        /* @__PURE__ */ V("div", { className: "flex gap-2", children: [
                          /* @__PURE__ */ g(
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
                          /* @__PURE__ */ g(
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
      (l || c) && /* @__PURE__ */ g("div", { children: i && c ? /* @__PURE__ */ g("p", { className: "text-xs text-red-500", children: c }) : l && /* @__PURE__ */ g("p", { className: "text-xs text-gray-500", children: l }) })
    ] });
  }
);
Mp.displayName = "DatePicker";
const Dp = () => {
  const e = ie();
  return [
    {
      label: "전체",
      getValue: () => [ie("1970-01-01"), ie("2099-12-31")]
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
}, Op = P.forwardRef(
  ({
    value: e,
    onChange: t,
    startLabel: n = "시작일자",
    endLabel: r = "종료일자",
    className: o
  }, a) => {
    const [s, i] = ve(!1), [c, l] = ve([
      e != null && e.start ? ie(e.start) : void 0,
      e != null && e.end ? ie(e.end) : void 0
    ]);
    Bt(() => {
      e && l([
        e.start ? ie(e.start) : void 0,
        e.end ? ie(e.end) : void 0
      ]);
    }, [e]);
    const [d, u] = c, f = Be(() => {
      if (d)
        return {
          from: d.toDate(),
          to: u == null ? void 0 : u.toDate()
        };
    }, [d, u]), h = (w) => {
      const [k, M] = w.getValue();
      l([k, M]);
    }, y = (w) => {
      if (!w) {
        l([void 0, void 0]);
        return;
      }
      const k = w.from ? ie(w.from) : void 0, M = w.to ? ie(w.to) : void 0;
      l([k, M]);
    }, m = () => {
      d && u && (t == null || t({
        start: d.format("YYYY-MM-DD"),
        end: u.format("YYYY-MM-DD")
      }), i(!1));
    }, b = () => {
      l([
        e != null && e.start ? ie(e.start) : void 0,
        e != null && e.end ? ie(e.end) : void 0
      ]), i(!1);
    }, v = Be(() => {
      if (!(!d || !u))
        return u.diff(d, "day") + 1;
    }, [d, u]), x = Be(() => !(e != null && e.start) || !(e != null && e.end) ? { start: "", end: "" } : {
      start: ie(e.start).format("YYYY-MM-DD"),
      end: ie(e.end).format("YYYY-MM-DD")
    }, [e]);
    return /* @__PURE__ */ V(Nr, { open: s, onOpenChange: i, children: [
      /* @__PURE__ */ g(Pr, { asChild: !0, children: /* @__PURE__ */ V("div", { ref: a, className: W("flex items-center gap-0", o), children: [
        /* @__PURE__ */ V("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ g(
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
          /* @__PURE__ */ g(
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
        /* @__PURE__ */ V("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ g(
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
          /* @__PURE__ */ g(
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
      /* @__PURE__ */ g(Er, { children: /* @__PURE__ */ V(
        Mn,
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
            /* @__PURE__ */ V("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ g("div", { className: "flex flex-col border-r border-gray-200 pr-2", children: Dp().map((w) => /* @__PURE__ */ g(
                "button",
                {
                  onClick: () => h(w),
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
              /* @__PURE__ */ g("div", { className: "date-range-picker-calendar", children: /* @__PURE__ */ g(
                ks,
                {
                  mode: "range",
                  selected: f,
                  onSelect: y,
                  numberOfMonths: 2,
                  locale: Ms,
                  formatters: {
                    formatCaption: (w) => `${w.getFullYear()}년 ${w.getMonth() + 1}월`
                  }
                }
              ) })
            ] }),
            /* @__PURE__ */ V(
              "div",
              {
                className: W(
                  "flex items-end justify-between mt-2 pt-2",
                  "border-t border-gray-200"
                ),
                children: [
                  /* @__PURE__ */ g("div", { className: "flex flex-col min-h-8", children: !d || !u ? /* @__PURE__ */ g("span", { className: "text-xs text-red-500", children: "종료일자를 선택해 주세요." }) : /* @__PURE__ */ V(dn, { children: [
                    /* @__PURE__ */ V("span", { className: "text-xs text-gray-700", children: [
                      d.format("YYYY-MM-DD"),
                      " ~",
                      " ",
                      u.format("YYYY-MM-DD")
                    ] }),
                    /* @__PURE__ */ V("span", { className: "text-xs text-gray-500", children: [
                      "(",
                      v,
                      "일간)"
                    ] })
                  ] }) }),
                  /* @__PURE__ */ V("div", { className: "flex gap-2", children: [
                    /* @__PURE__ */ g(
                      "button",
                      {
                        onClick: b,
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
                    /* @__PURE__ */ g(
                      "button",
                      {
                        onClick: m,
                        disabled: !d || !u,
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
Op.displayName = "DateRangePicker";
function Yr(e) {
  const t = p.useRef({ value: e, previous: e });
  return p.useMemo(() => (t.current.value !== e && (t.current.previous = t.current.value, t.current.value = e), t.current.previous), [e]);
}
var Sn = "Switch", [Sp] = Pe(Sn), [Np, Pp] = Sp(Sn), Os = p.forwardRef(
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
      form: d,
      ...u
    } = e, [f, h] = p.useState(null), y = ae(t, (w) => h(w)), m = p.useRef(!1), b = f ? d || !!f.closest("form") : !0, [v, x] = Ze({
      prop: o,
      defaultProp: a ?? !1,
      onChange: l,
      caller: Sn
    });
    return /* @__PURE__ */ V(Np, { scope: n, checked: v, disabled: i, children: [
      /* @__PURE__ */ g(
        K.button,
        {
          type: "button",
          role: "switch",
          "aria-checked": v,
          "aria-required": s,
          "data-state": Es(v),
          "data-disabled": i ? "" : void 0,
          disabled: i,
          value: c,
          ...u,
          ref: y,
          onClick: ee(e.onClick, (w) => {
            x((k) => !k), b && (m.current = w.isPropagationStopped(), m.current || w.stopPropagation());
          })
        }
      ),
      b && /* @__PURE__ */ g(
        Ps,
        {
          control: f,
          bubbles: !m.current,
          name: r,
          value: c,
          checked: v,
          required: s,
          disabled: i,
          form: d,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
Os.displayName = Sn;
var Ss = "SwitchThumb", Ns = p.forwardRef(
  (e, t) => {
    const { __scopeSwitch: n, ...r } = e, o = Pp(Ss, n);
    return /* @__PURE__ */ g(
      K.span,
      {
        "data-state": Es(o.checked),
        "data-disabled": o.disabled ? "" : void 0,
        ...r,
        ref: t
      }
    );
  }
);
Ns.displayName = Ss;
var Ep = "SwitchBubbleInput", Ps = p.forwardRef(
  ({
    __scopeSwitch: e,
    control: t,
    checked: n,
    bubbles: r = !0,
    ...o
  }, a) => {
    const s = p.useRef(null), i = ae(s, a), c = Yr(n), l = xn(t);
    return p.useEffect(() => {
      const d = s.current;
      if (!d) return;
      const u = window.HTMLInputElement.prototype, h = Object.getOwnPropertyDescriptor(
        u,
        "checked"
      ).set;
      if (c !== n && h) {
        const y = new Event("click", { bubbles: r });
        h.call(d, n), d.dispatchEvent(y);
      }
    }, [c, n, r]), /* @__PURE__ */ g(
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
Ps.displayName = Ep;
function Es(e) {
  return e ? "checked" : "unchecked";
}
var Rs = Os, Rp = Ns;
const Ap = Ne(
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
), Tp = P.forwardRef(({ className: e, variant: t, ...n }, r) => /* @__PURE__ */ g(
  Rs,
  {
    className: W(Ap({ variant: t }), e),
    ...n,
    ref: r,
    children: /* @__PURE__ */ g(
      Rp,
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
Tp.displayName = Rs.displayName;
function As(e) {
  const t = e + "CollectionProvider", [n, r] = Pe(t), [o, a] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), s = (m) => {
    const { scope: b, children: v } = m, x = P.useRef(null), w = P.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ g(o, { scope: b, itemMap: w, collectionRef: x, children: v });
  };
  s.displayName = t;
  const i = e + "CollectionSlot", c = /* @__PURE__ */ Lt(i), l = P.forwardRef(
    (m, b) => {
      const { scope: v, children: x } = m, w = a(i, v), k = ae(b, w.collectionRef);
      return /* @__PURE__ */ g(c, { ref: k, children: x });
    }
  );
  l.displayName = i;
  const d = e + "CollectionItemSlot", u = "data-radix-collection-item", f = /* @__PURE__ */ Lt(d), h = P.forwardRef(
    (m, b) => {
      const { scope: v, children: x, ...w } = m, k = P.useRef(null), M = ae(b, k), C = a(d, v);
      return P.useEffect(() => (C.itemMap.set(k, { ref: k, ...w }), () => void C.itemMap.delete(k))), /* @__PURE__ */ g(f, { [u]: "", ref: M, children: x });
    }
  );
  h.displayName = d;
  function y(m) {
    const b = a(e + "CollectionConsumer", m);
    return P.useCallback(() => {
      const x = b.collectionRef.current;
      if (!x) return [];
      const w = Array.from(x.querySelectorAll(`[${u}]`));
      return Array.from(b.itemMap.values()).sort(
        (C, D) => w.indexOf(C.ref.current) - w.indexOf(D.ref.current)
      );
    }, [b.collectionRef, b.itemMap]);
  }
  return [
    { Provider: s, Slot: l, ItemSlot: h },
    y,
    r
  ];
}
var _p = p.createContext(void 0);
function Br(e) {
  const t = p.useContext(_p);
  return e || t || "ltr";
}
var nr = "rovingFocusGroup.onEntryFocus", Wp = { bubbles: !1, cancelable: !0 }, Qt = "RovingFocusGroup", [ur, Ts, Ip] = As(Qt), [$p, _s] = Pe(
  Qt,
  [Ip]
), [Fp, Yp] = $p(Qt), Ws = p.forwardRef(
  (e, t) => /* @__PURE__ */ g(ur.Provider, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ g(ur.Slot, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ g(Bp, { ...e, ref: t }) }) })
);
Ws.displayName = Qt;
var Bp = p.forwardRef((e, t) => {
  const {
    __scopeRovingFocusGroup: n,
    orientation: r,
    loop: o = !1,
    dir: a,
    currentTabStopId: s,
    defaultCurrentTabStopId: i,
    onCurrentTabStopIdChange: c,
    onEntryFocus: l,
    preventScrollOnEntryFocus: d = !1,
    ...u
  } = e, f = p.useRef(null), h = ae(t, f), y = Br(a), [m, b] = Ze({
    prop: s,
    defaultProp: i ?? null,
    onChange: c,
    caller: Qt
  }), [v, x] = p.useState(!1), w = ft(l), k = Ts(n), M = p.useRef(!1), [C, D] = p.useState(0);
  return p.useEffect(() => {
    const A = f.current;
    if (A)
      return A.addEventListener(nr, w), () => A.removeEventListener(nr, w);
  }, [w]), /* @__PURE__ */ g(
    Fp,
    {
      scope: n,
      orientation: r,
      dir: y,
      loop: o,
      currentTabStopId: m,
      onItemFocus: p.useCallback(
        (A) => b(A),
        [b]
      ),
      onItemShiftTab: p.useCallback(() => x(!0), []),
      onFocusableItemAdd: p.useCallback(
        () => D((A) => A + 1),
        []
      ),
      onFocusableItemRemove: p.useCallback(
        () => D((A) => A - 1),
        []
      ),
      children: /* @__PURE__ */ g(
        K.div,
        {
          tabIndex: v || C === 0 ? -1 : 0,
          "data-orientation": r,
          ...u,
          ref: h,
          style: { outline: "none", ...e.style },
          onMouseDown: ee(e.onMouseDown, () => {
            M.current = !0;
          }),
          onFocus: ee(e.onFocus, (A) => {
            const F = !M.current;
            if (A.target === A.currentTarget && F && !v) {
              const T = new CustomEvent(nr, Wp);
              if (A.currentTarget.dispatchEvent(T), !T.defaultPrevented) {
                const I = k().filter((S) => S.focusable), Y = I.find((S) => S.active), G = I.find((S) => S.id === m), E = [Y, G, ...I].filter(
                  Boolean
                ).map((S) => S.ref.current);
                Fs(E, d);
              }
            }
            M.current = !1;
          }),
          onBlur: ee(e.onBlur, () => x(!1))
        }
      )
    }
  );
}), Is = "RovingFocusGroupItem", $s = p.forwardRef(
  (e, t) => {
    const {
      __scopeRovingFocusGroup: n,
      focusable: r = !0,
      active: o = !1,
      tabStopId: a,
      children: s,
      ...i
    } = e, c = ut(), l = a || c, d = Yp(Is, n), u = d.currentTabStopId === l, f = Ts(n), { onFocusableItemAdd: h, onFocusableItemRemove: y, currentTabStopId: m } = d;
    return p.useEffect(() => {
      if (r)
        return h(), () => y();
    }, [r, h, y]), /* @__PURE__ */ g(
      ur.ItemSlot,
      {
        scope: n,
        id: l,
        focusable: r,
        active: o,
        children: /* @__PURE__ */ g(
          K.span,
          {
            tabIndex: u ? 0 : -1,
            "data-orientation": d.orientation,
            ...i,
            ref: t,
            onMouseDown: ee(e.onMouseDown, (b) => {
              r ? d.onItemFocus(l) : b.preventDefault();
            }),
            onFocus: ee(e.onFocus, () => d.onItemFocus(l)),
            onKeyDown: ee(e.onKeyDown, (b) => {
              if (b.key === "Tab" && b.shiftKey) {
                d.onItemShiftTab();
                return;
              }
              if (b.target !== b.currentTarget) return;
              const v = Hp(b, d.orientation, d.dir);
              if (v !== void 0) {
                if (b.metaKey || b.ctrlKey || b.altKey || b.shiftKey) return;
                b.preventDefault();
                let w = f().filter((k) => k.focusable).map((k) => k.ref.current);
                if (v === "last") w.reverse();
                else if (v === "prev" || v === "next") {
                  v === "prev" && w.reverse();
                  const k = w.indexOf(b.currentTarget);
                  w = d.loop ? jp(w, k + 1) : w.slice(k + 1);
                }
                setTimeout(() => Fs(w));
              }
            }),
            children: typeof s == "function" ? s({ isCurrentTabStop: u, hasTabStop: m != null }) : s
          }
        )
      }
    );
  }
);
$s.displayName = Is;
var Lp = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function zp(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function Hp(e, t, n) {
  const r = zp(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r)))
    return Lp[r];
}
function Fs(e, t = !1) {
  const n = document.activeElement;
  for (const r of e)
    if (r === n || (r.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function jp(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var Vp = Ws, Gp = $s, Lr = "Radio", [qp, Ys] = Pe(Lr), [Up, Xp] = qp(Lr), Bs = p.forwardRef(
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
      ...d
    } = e, [u, f] = p.useState(null), h = ae(t, (b) => f(b)), y = p.useRef(!1), m = u ? l || !!u.closest("form") : !0;
    return /* @__PURE__ */ V(Up, { scope: n, checked: o, disabled: s, children: [
      /* @__PURE__ */ g(
        K.button,
        {
          type: "button",
          role: "radio",
          "aria-checked": o,
          "data-state": js(o),
          "data-disabled": s ? "" : void 0,
          disabled: s,
          value: i,
          ...d,
          ref: h,
          onClick: ee(e.onClick, (b) => {
            o || c == null || c(), m && (y.current = b.isPropagationStopped(), y.current || b.stopPropagation());
          })
        }
      ),
      m && /* @__PURE__ */ g(
        Hs,
        {
          control: u,
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
Bs.displayName = Lr;
var Ls = "RadioIndicator", zs = p.forwardRef(
  (e, t) => {
    const { __scopeRadio: n, forceMount: r, ...o } = e, a = Xp(Ls, n);
    return /* @__PURE__ */ g(Qe, { present: r || a.checked, children: /* @__PURE__ */ g(
      K.span,
      {
        "data-state": js(a.checked),
        "data-disabled": a.disabled ? "" : void 0,
        ...o,
        ref: t
      }
    ) });
  }
);
zs.displayName = Ls;
var Kp = "RadioBubbleInput", Hs = p.forwardRef(
  ({
    __scopeRadio: e,
    control: t,
    checked: n,
    bubbles: r = !0,
    ...o
  }, a) => {
    const s = p.useRef(null), i = ae(s, a), c = Yr(n), l = xn(t);
    return p.useEffect(() => {
      const d = s.current;
      if (!d) return;
      const u = window.HTMLInputElement.prototype, h = Object.getOwnPropertyDescriptor(
        u,
        "checked"
      ).set;
      if (c !== n && h) {
        const y = new Event("click", { bubbles: r });
        h.call(d, n), d.dispatchEvent(y);
      }
    }, [c, n, r]), /* @__PURE__ */ g(
      K.input,
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
Hs.displayName = Kp;
function js(e) {
  return e ? "checked" : "unchecked";
}
var Qp = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], Nn = "RadioGroup", [Zp] = Pe(Nn, [
  _s,
  Ys
]), Vs = _s(), Gs = Ys(), [Jp, eg] = Zp(Nn), qs = p.forwardRef(
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
      loop: d = !0,
      onValueChange: u,
      ...f
    } = e, h = Vs(n), y = Br(l), [m, b] = Ze({
      prop: a,
      defaultProp: o ?? null,
      onChange: u,
      caller: Nn
    });
    return /* @__PURE__ */ g(
      Jp,
      {
        scope: n,
        name: r,
        required: s,
        disabled: i,
        value: m,
        onValueChange: b,
        children: /* @__PURE__ */ g(
          Vp,
          {
            asChild: !0,
            ...h,
            orientation: c,
            dir: y,
            loop: d,
            children: /* @__PURE__ */ g(
              K.div,
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
qs.displayName = Nn;
var Us = "RadioGroupItem", Xs = p.forwardRef(
  (e, t) => {
    const { __scopeRadioGroup: n, disabled: r, ...o } = e, a = eg(Us, n), s = a.disabled || r, i = Vs(n), c = Gs(n), l = p.useRef(null), d = ae(t, l), u = a.value === o.value, f = p.useRef(!1);
    return p.useEffect(() => {
      const h = (m) => {
        Qp.includes(m.key) && (f.current = !0);
      }, y = () => f.current = !1;
      return document.addEventListener("keydown", h), document.addEventListener("keyup", y), () => {
        document.removeEventListener("keydown", h), document.removeEventListener("keyup", y);
      };
    }, []), /* @__PURE__ */ g(
      Gp,
      {
        asChild: !0,
        ...i,
        focusable: !s,
        active: u,
        children: /* @__PURE__ */ g(
          Bs,
          {
            disabled: s,
            required: a.required,
            checked: u,
            ...c,
            ...o,
            name: a.name,
            ref: d,
            onCheck: () => a.onValueChange(o.value),
            onKeyDown: ee((h) => {
              h.key === "Enter" && h.preventDefault();
            }),
            onFocus: ee(o.onFocus, () => {
              var h;
              f.current && ((h = l.current) == null || h.click());
            })
          }
        )
      }
    );
  }
);
Xs.displayName = Us;
var tg = "RadioGroupIndicator", Ks = p.forwardRef(
  (e, t) => {
    const { __scopeRadioGroup: n, ...r } = e, o = Gs(n);
    return /* @__PURE__ */ g(zs, { ...o, ...r, ref: t });
  }
);
Ks.displayName = tg;
var Qs = qs, Zs = Xs, ng = Ks;
const rg = P.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ g(Qs, { className: e, ...t, ref: n }));
rg.displayName = Qs.displayName;
const og = Ne(
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
), ag = Ne(
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
), sg = P.forwardRef(({ className: e, variant: t, size: n, ...r }, o) => /* @__PURE__ */ g(
  Zs,
  {
    ref: o,
    className: W(og({ variant: t, size: n }), e),
    ...r,
    children: /* @__PURE__ */ g(
      ng,
      {
        className: W(ag({ variant: t, size: n }))
      }
    )
  }
));
sg.displayName = Zs.displayName;
var Pn = "Collapsible", [ig, Js] = Pe(Pn), [cg, zr] = ig(Pn), ei = p.forwardRef(
  (e, t) => {
    const {
      __scopeCollapsible: n,
      open: r,
      defaultOpen: o,
      disabled: a,
      onOpenChange: s,
      ...i
    } = e, [c, l] = Ze({
      prop: r,
      defaultProp: o ?? !1,
      onChange: s,
      caller: Pn
    });
    return /* @__PURE__ */ g(
      cg,
      {
        scope: n,
        disabled: a,
        contentId: ut(),
        open: c,
        onOpenToggle: p.useCallback(() => l((d) => !d), [l]),
        children: /* @__PURE__ */ g(
          K.div,
          {
            "data-state": jr(c),
            "data-disabled": a ? "" : void 0,
            ...i,
            ref: t
          }
        )
      }
    );
  }
);
ei.displayName = Pn;
var ti = "CollapsibleTrigger", ni = p.forwardRef(
  (e, t) => {
    const { __scopeCollapsible: n, ...r } = e, o = zr(ti, n);
    return /* @__PURE__ */ g(
      K.button,
      {
        type: "button",
        "aria-controls": o.contentId,
        "aria-expanded": o.open || !1,
        "data-state": jr(o.open),
        "data-disabled": o.disabled ? "" : void 0,
        disabled: o.disabled,
        ...r,
        ref: t,
        onClick: ee(e.onClick, o.onOpenToggle)
      }
    );
  }
);
ni.displayName = ti;
var Hr = "CollapsibleContent", ri = p.forwardRef(
  (e, t) => {
    const { forceMount: n, ...r } = e, o = zr(Hr, e.__scopeCollapsible);
    return /* @__PURE__ */ g(Qe, { present: n || o.open, children: ({ present: a }) => /* @__PURE__ */ g(lg, { ...r, ref: t, present: a }) });
  }
);
ri.displayName = Hr;
var lg = p.forwardRef((e, t) => {
  const { __scopeCollapsible: n, present: r, children: o, ...a } = e, s = zr(Hr, n), [i, c] = p.useState(r), l = p.useRef(null), d = ae(t, l), u = p.useRef(0), f = u.current, h = p.useRef(0), y = h.current, m = s.open || i, b = p.useRef(m), v = p.useRef(void 0);
  return p.useEffect(() => {
    const x = requestAnimationFrame(() => b.current = !1);
    return () => cancelAnimationFrame(x);
  }, []), Ue(() => {
    const x = l.current;
    if (x) {
      v.current = v.current || {
        transitionDuration: x.style.transitionDuration,
        animationName: x.style.animationName
      }, x.style.transitionDuration = "0s", x.style.animationName = "none";
      const w = x.getBoundingClientRect();
      u.current = w.height, h.current = w.width, b.current || (x.style.transitionDuration = v.current.transitionDuration, x.style.animationName = v.current.animationName), c(r);
    }
  }, [s.open, r]), /* @__PURE__ */ g(
    K.div,
    {
      "data-state": jr(s.open),
      "data-disabled": s.disabled ? "" : void 0,
      id: s.contentId,
      hidden: !m,
      ...a,
      ref: d,
      style: {
        "--radix-collapsible-content-height": f ? `${f}px` : void 0,
        "--radix-collapsible-content-width": y ? `${y}px` : void 0,
        ...e.style
      },
      children: m && o
    }
  );
});
function jr(e) {
  return e ? "open" : "closed";
}
var dg = ei, ug = ni, fg = ri, Ee = "Accordion", hg = ["Home", "End", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"], [Vr, mg, pg] = As(Ee), [En] = Pe(Ee, [
  pg,
  Js
]), Gr = Js(), oi = P.forwardRef(
  (e, t) => {
    const { type: n, ...r } = e, o = r, a = r;
    return /* @__PURE__ */ g(Vr.Provider, { scope: e.__scopeAccordion, children: n === "multiple" ? /* @__PURE__ */ g(yg, { ...a, ref: t }) : /* @__PURE__ */ g(vg, { ...o, ref: t }) });
  }
);
oi.displayName = Ee;
var [ai, gg] = En(Ee), [si, bg] = En(
  Ee,
  { collapsible: !1 }
), vg = P.forwardRef(
  (e, t) => {
    const {
      value: n,
      defaultValue: r,
      onValueChange: o = () => {
      },
      collapsible: a = !1,
      ...s
    } = e, [i, c] = Ze({
      prop: n,
      defaultProp: r ?? "",
      onChange: o,
      caller: Ee
    });
    return /* @__PURE__ */ g(
      ai,
      {
        scope: e.__scopeAccordion,
        value: P.useMemo(() => i ? [i] : [], [i]),
        onItemOpen: c,
        onItemClose: P.useCallback(() => a && c(""), [a, c]),
        children: /* @__PURE__ */ g(si, { scope: e.__scopeAccordion, collapsible: a, children: /* @__PURE__ */ g(ii, { ...s, ref: t }) })
      }
    );
  }
), yg = P.forwardRef((e, t) => {
  const {
    value: n,
    defaultValue: r,
    onValueChange: o = () => {
    },
    ...a
  } = e, [s, i] = Ze({
    prop: n,
    defaultProp: r ?? [],
    onChange: o,
    caller: Ee
  }), c = P.useCallback(
    (d) => i((u = []) => [...u, d]),
    [i]
  ), l = P.useCallback(
    (d) => i((u = []) => u.filter((f) => f !== d)),
    [i]
  );
  return /* @__PURE__ */ g(
    ai,
    {
      scope: e.__scopeAccordion,
      value: s,
      onItemOpen: c,
      onItemClose: l,
      children: /* @__PURE__ */ g(si, { scope: e.__scopeAccordion, collapsible: !0, children: /* @__PURE__ */ g(ii, { ...a, ref: t }) })
    }
  );
}), [wg, Rn] = En(Ee), ii = P.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, disabled: r, dir: o, orientation: a = "vertical", ...s } = e, i = P.useRef(null), c = ae(i, t), l = mg(n), u = Br(o) === "ltr", f = ee(e.onKeyDown, (h) => {
      var A;
      if (!hg.includes(h.key)) return;
      const y = h.target, m = l().filter((F) => {
        var T;
        return !((T = F.ref.current) != null && T.disabled);
      }), b = m.findIndex((F) => F.ref.current === y), v = m.length;
      if (b === -1) return;
      h.preventDefault();
      let x = b;
      const w = 0, k = v - 1, M = () => {
        x = b + 1, x > k && (x = w);
      }, C = () => {
        x = b - 1, x < w && (x = k);
      };
      switch (h.key) {
        case "Home":
          x = w;
          break;
        case "End":
          x = k;
          break;
        case "ArrowRight":
          a === "horizontal" && (u ? M() : C());
          break;
        case "ArrowDown":
          a === "vertical" && M();
          break;
        case "ArrowLeft":
          a === "horizontal" && (u ? C() : M());
          break;
        case "ArrowUp":
          a === "vertical" && C();
          break;
      }
      const D = x % v;
      (A = m[D].ref.current) == null || A.focus();
    });
    return /* @__PURE__ */ g(
      wg,
      {
        scope: n,
        disabled: r,
        direction: o,
        orientation: a,
        children: /* @__PURE__ */ g(Vr.Slot, { scope: n, children: /* @__PURE__ */ g(
          K.div,
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
), pn = "AccordionItem", [xg, qr] = En(pn), ci = P.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, value: r, ...o } = e, a = Rn(pn, n), s = gg(pn, n), i = Gr(n), c = ut(), l = r && s.value.includes(r) || !1, d = a.disabled || e.disabled;
    return /* @__PURE__ */ g(
      xg,
      {
        scope: n,
        open: l,
        disabled: d,
        triggerId: c,
        children: /* @__PURE__ */ g(
          dg,
          {
            "data-orientation": a.orientation,
            "data-state": mi(l),
            ...i,
            ...o,
            ref: t,
            disabled: d,
            open: l,
            onOpenChange: (u) => {
              u ? s.onItemOpen(r) : s.onItemClose(r);
            }
          }
        )
      }
    );
  }
);
ci.displayName = pn;
var li = "AccordionHeader", di = P.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, ...r } = e, o = Rn(Ee, n), a = qr(li, n);
    return /* @__PURE__ */ g(
      K.h3,
      {
        "data-orientation": o.orientation,
        "data-state": mi(a.open),
        "data-disabled": a.disabled ? "" : void 0,
        ...r,
        ref: t
      }
    );
  }
);
di.displayName = li;
var fr = "AccordionTrigger", ui = P.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, ...r } = e, o = Rn(Ee, n), a = qr(fr, n), s = bg(fr, n), i = Gr(n);
    return /* @__PURE__ */ g(Vr.ItemSlot, { scope: n, children: /* @__PURE__ */ g(
      ug,
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
ui.displayName = fr;
var fi = "AccordionContent", hi = P.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, ...r } = e, o = Rn(Ee, n), a = qr(fi, n), s = Gr(n);
    return /* @__PURE__ */ g(
      fg,
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
hi.displayName = fi;
function mi(e) {
  return e ? "open" : "closed";
}
var Cg = oi, kg = ci, Mg = di, Dg = ui, Og = hi;
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sg = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Ng = (e) => e.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (t, n, r) => r ? r.toUpperCase() : n.toLowerCase()
), Ho = (e) => {
  const t = Ng(e);
  return t.charAt(0).toUpperCase() + t.slice(1);
}, pi = (...e) => e.filter((t, n, r) => !!t && t.trim() !== "" && r.indexOf(t) === n).join(" ").trim(), Pg = (e) => {
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
var Eg = {
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
const Rg = it(
  ({
    color: e = "currentColor",
    size: t = 24,
    strokeWidth: n = 2,
    absoluteStrokeWidth: r,
    className: o = "",
    children: a,
    iconNode: s,
    ...i
  }, c) => rr(
    "svg",
    {
      ref: c,
      ...Eg,
      width: t,
      height: t,
      stroke: e,
      strokeWidth: r ? Number(n) * 24 / Number(t) : n,
      className: pi("lucide", o),
      ...!a && !Pg(i) && { "aria-hidden": "true" },
      ...i
    },
    [
      ...s.map(([l, d]) => rr(l, d)),
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
  const n = it(
    ({ className: r, ...o }, a) => rr(Rg, {
      ref: a,
      iconNode: t,
      className: pi(
        `lucide-${Sg(Ho(e))}`,
        `lucide-${e}`,
        r
      ),
      ...o
    })
  );
  return n.displayName = Ho(e), n;
};
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ag = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], Tg = _t("check", Ag);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _g = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], Wg = _t("chevron-down", _g);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ig = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
], gi = _t("circle-check", Ig);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $g = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
], Fg = _t("circle-x", $g);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Yg = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
], bi = _t("triangle-alert", Yg);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bg = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], Lg = _t("x", Bg), zg = ({
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
  return /* @__PURE__ */ V(kg, { value: e.url, className: "border-none", children: [
    /* @__PURE__ */ g(Mg, { className: "m-0", children: /* @__PURE__ */ V(
      Dg,
      {
        onClick: (i) => {
          e.subMenu || (i.preventDefault(), o(e.url));
        },
        className: W(
          "group flex items-center px-5",
          "text-white",
          "w-full h-13",
          !a && "data-[state=open]:bg-transparent",
          "transition-colors",
          !e.subMenu && n && "bg-cms-primary-400 text-cms-black",
          a && "bg-cms-primary-200 text-cms-black",
          "cursor-pointer"
        ),
        children: [
          e.icon && /* @__PURE__ */ g(
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
          /* @__PURE__ */ g(
            "span",
            {
              className: W(
                !e.subMenu && n || a ? "text-cms-black" : "text-white"
              ),
              children: e.title
            }
          ),
          e.subMenu && /* @__PURE__ */ g(
            Wg,
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
    e.subMenu && /* @__PURE__ */ g(
      Og,
      {
        className: W(
          "overflow-hidden",
          "bg-[#232427]",
          "data-[state=open]:animate-accordion-down",
          "data-[state=closed]:animate-accordion-up"
        ),
        children: e.subMenu.map((i) => {
          const c = i.url === r;
          return /* @__PURE__ */ g(
            "div",
            {
              onClick: () => o(i.url),
              className: W(
                "flex items-center",
                "h-11 px-5 pl-14",
                "cursor-pointer",
                "transition-colors",
                "hover:bg-[#2e2f32]"
              ),
              children: /* @__PURE__ */ g(
                "span",
                {
                  className: W(
                    "text-sm font-normal",
                    c ? "text-cms-primary-400 font-medium" : "text-[#b4b4b4]",
                    "transition-colors"
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
}, Hg = P.forwardRef(
  ({ title: e, menus: t, selectedUrl: n, onMenuClick: r, headerSlot: o, className: a, ...s }, i) => {
    const [c, l] = ve([]);
    return /* @__PURE__ */ V(
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
          e && !o && /* @__PURE__ */ g("div", { className: "px-5 py-4 border-b border-[#3a3b3e]", children: /* @__PURE__ */ g("h2", { className: "text-lg font-semibold text-white", children: e }) }),
          /* @__PURE__ */ g(
            "div",
            {
              className: W(
                "flex-1 overflow-y-auto",
                "scrollbar-thin",
                "scrollbar-thumb-[#3a3b3e]",
                "scrollbar-track-transparent"
              ),
              children: /* @__PURE__ */ g(
                Cg,
                {
                  type: "multiple",
                  value: c,
                  onValueChange: l,
                  children: t.map((d) => /* @__PURE__ */ g(
                    zg,
                    {
                      menu: d,
                      isOpen: c.includes(d.url),
                      isSelected: n === d.url,
                      selectedUrl: n,
                      onMenuClick: r
                    },
                    d.url
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
Hg.displayName = "SideNavigation";
var An = "Checkbox", [jg] = Pe(An), [Vg, Ur] = jg(An);
function Gg(e) {
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
    value: d = "on",
    // @ts-expect-error
    internal_do_not_use_render: u
  } = e, [f, h] = Ze({
    prop: n,
    defaultProp: o ?? !1,
    onChange: c,
    caller: An
  }), [y, m] = p.useState(null), [b, v] = p.useState(null), x = p.useRef(!1), w = y ? !!s || !!y.closest("form") : (
    // We set this to true by default so that events bubble to forms without JS (SSR)
    !0
  ), k = {
    checked: f,
    disabled: a,
    setChecked: h,
    control: y,
    setControl: m,
    name: i,
    form: s,
    value: d,
    hasConsumerStoppedPropagationRef: x,
    required: l,
    defaultChecked: rt(o) ? !1 : o,
    isFormControl: w,
    bubbleInput: b,
    setBubbleInput: v
  };
  return /* @__PURE__ */ g(
    Vg,
    {
      scope: t,
      ...k,
      children: qg(u) ? u(k) : r
    }
  );
}
var vi = "CheckboxTrigger", yi = p.forwardRef(
  ({ __scopeCheckbox: e, onKeyDown: t, onClick: n, ...r }, o) => {
    const {
      control: a,
      value: s,
      disabled: i,
      checked: c,
      required: l,
      setControl: d,
      setChecked: u,
      hasConsumerStoppedPropagationRef: f,
      isFormControl: h,
      bubbleInput: y
    } = Ur(vi, e), m = ae(o, d), b = p.useRef(c);
    return p.useEffect(() => {
      const v = a == null ? void 0 : a.form;
      if (v) {
        const x = () => u(b.current);
        return v.addEventListener("reset", x), () => v.removeEventListener("reset", x);
      }
    }, [a, u]), /* @__PURE__ */ g(
      K.button,
      {
        type: "button",
        role: "checkbox",
        "aria-checked": rt(c) ? "mixed" : c,
        "aria-required": l,
        "data-state": Di(c),
        "data-disabled": i ? "" : void 0,
        disabled: i,
        value: s,
        ...r,
        ref: m,
        onKeyDown: ee(t, (v) => {
          v.key === "Enter" && v.preventDefault();
        }),
        onClick: ee(n, (v) => {
          u((x) => rt(x) ? !0 : !x), y && h && (f.current = v.isPropagationStopped(), f.current || v.stopPropagation());
        })
      }
    );
  }
);
yi.displayName = vi;
var wi = p.forwardRef(
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
      form: d,
      ...u
    } = e;
    return /* @__PURE__ */ g(
      Gg,
      {
        __scopeCheckbox: n,
        checked: o,
        defaultChecked: a,
        disabled: i,
        required: s,
        onCheckedChange: l,
        name: r,
        form: d,
        value: c,
        internal_do_not_use_render: ({ isFormControl: f }) => /* @__PURE__ */ V(dn, { children: [
          /* @__PURE__ */ g(
            yi,
            {
              ...u,
              ref: t,
              __scopeCheckbox: n
            }
          ),
          f && /* @__PURE__ */ g(
            Mi,
            {
              __scopeCheckbox: n
            }
          )
        ] })
      }
    );
  }
);
wi.displayName = An;
var xi = "CheckboxIndicator", Ci = p.forwardRef(
  (e, t) => {
    const { __scopeCheckbox: n, forceMount: r, ...o } = e, a = Ur(xi, n);
    return /* @__PURE__ */ g(
      Qe,
      {
        present: r || rt(a.checked) || a.checked === !0,
        children: /* @__PURE__ */ g(
          K.span,
          {
            "data-state": Di(a.checked),
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
Ci.displayName = xi;
var ki = "CheckboxBubbleInput", Mi = p.forwardRef(
  ({ __scopeCheckbox: e, ...t }, n) => {
    const {
      control: r,
      hasConsumerStoppedPropagationRef: o,
      checked: a,
      defaultChecked: s,
      required: i,
      disabled: c,
      name: l,
      value: d,
      form: u,
      bubbleInput: f,
      setBubbleInput: h
    } = Ur(ki, e), y = ae(n, h), m = Yr(a), b = xn(r);
    p.useEffect(() => {
      const x = f;
      if (!x) return;
      const w = window.HTMLInputElement.prototype, M = Object.getOwnPropertyDescriptor(
        w,
        "checked"
      ).set, C = !o.current;
      if (m !== a && M) {
        const D = new Event("click", { bubbles: C });
        x.indeterminate = rt(a), M.call(x, rt(a) ? !1 : a), x.dispatchEvent(D);
      }
    }, [f, m, a, o]);
    const v = p.useRef(rt(a) ? !1 : a);
    return /* @__PURE__ */ g(
      K.input,
      {
        type: "checkbox",
        "aria-hidden": !0,
        defaultChecked: s ?? v.current,
        required: i,
        disabled: c,
        name: l,
        value: d,
        form: u,
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
Mi.displayName = ki;
function qg(e) {
  return typeof e == "function";
}
function rt(e) {
  return e === "indeterminate";
}
function Di(e) {
  return rt(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
const Ug = P.forwardRef(({ className: e, label: t, id: n, disabled: r, ...o }, a) => {
  const s = n || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
  return /* @__PURE__ */ V("div", { className: "flex items-center", children: [
    /* @__PURE__ */ g(
      wi,
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
        children: /* @__PURE__ */ g(
          Ci,
          {
            className: W("flex items-center justify-center", "text-white"),
            children: /* @__PURE__ */ g(Tg, { className: "h-3 w-3", strokeWidth: 3 })
          }
        )
      }
    ),
    t && /* @__PURE__ */ g(
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
Ug.displayName = "Checkbox";
var Tn = "Dialog", [Oi] = Pe(Tn), [Xg, Re] = Oi(Tn), Si = (e) => {
  const {
    __scopeDialog: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: a,
    modal: s = !0
  } = e, i = p.useRef(null), c = p.useRef(null), [l, d] = Ze({
    prop: r,
    defaultProp: o ?? !1,
    onChange: a,
    caller: Tn
  });
  return /* @__PURE__ */ g(
    Xg,
    {
      scope: t,
      triggerRef: i,
      contentRef: c,
      contentId: ut(),
      titleId: ut(),
      descriptionId: ut(),
      open: l,
      onOpenChange: d,
      onOpenToggle: p.useCallback(() => d((u) => !u), [d]),
      modal: s,
      children: n
    }
  );
};
Si.displayName = Tn;
var Ni = "DialogTrigger", Kg = p.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = Re(Ni, n), a = ae(t, o.triggerRef);
    return /* @__PURE__ */ g(
      K.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": o.open,
        "aria-controls": o.contentId,
        "data-state": Qr(o.open),
        ...r,
        ref: a,
        onClick: ee(e.onClick, o.onOpenToggle)
      }
    );
  }
);
Kg.displayName = Ni;
var Xr = "DialogPortal", [Qg, Pi] = Oi(Xr, {
  forceMount: void 0
}), Ei = (e) => {
  const { __scopeDialog: t, forceMount: n, children: r, container: o } = e, a = Re(Xr, t);
  return /* @__PURE__ */ g(Qg, { scope: t, forceMount: n, children: p.Children.map(r, (s) => /* @__PURE__ */ g(Qe, { present: n || a.open, children: /* @__PURE__ */ g(Dr, { asChild: !0, container: o, children: s }) })) });
};
Ei.displayName = Xr;
var gn = "DialogOverlay", Ri = p.forwardRef(
  (e, t) => {
    const n = Pi(gn, e.__scopeDialog), { forceMount: r = n.forceMount, ...o } = e, a = Re(gn, e.__scopeDialog);
    return a.modal ? /* @__PURE__ */ g(Qe, { present: r || a.open, children: /* @__PURE__ */ g(Jg, { ...o, ref: t }) }) : null;
  }
);
Ri.displayName = gn;
var Zg = /* @__PURE__ */ Lt("DialogOverlay.RemoveScroll"), Jg = p.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = Re(gn, n);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ g(Or, { as: Zg, allowPinchZoom: !0, shards: [o.contentRef], children: /* @__PURE__ */ g(
        K.div,
        {
          "data-state": Qr(o.open),
          ...r,
          ref: t,
          style: { pointerEvents: "auto", ...r.style }
        }
      ) })
    );
  }
), mt = "DialogContent", Ai = p.forwardRef(
  (e, t) => {
    const n = Pi(mt, e.__scopeDialog), { forceMount: r = n.forceMount, ...o } = e, a = Re(mt, e.__scopeDialog);
    return /* @__PURE__ */ g(Qe, { present: r || a.open, children: a.modal ? /* @__PURE__ */ g(eb, { ...o, ref: t }) : /* @__PURE__ */ g(tb, { ...o, ref: t }) });
  }
);
Ai.displayName = mt;
var eb = p.forwardRef(
  (e, t) => {
    const n = Re(mt, e.__scopeDialog), r = p.useRef(null), o = ae(t, n.contentRef, r);
    return p.useEffect(() => {
      const a = r.current;
      if (a) return Na(a);
    }, []), /* @__PURE__ */ g(
      Ti,
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
), tb = p.forwardRef(
  (e, t) => {
    const n = Re(mt, e.__scopeDialog), r = p.useRef(!1), o = p.useRef(!1);
    return /* @__PURE__ */ g(
      Ti,
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
), Ti = p.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, trapFocus: r, onOpenAutoFocus: o, onCloseAutoFocus: a, ...s } = e, i = Re(mt, n), c = p.useRef(null), l = ae(t, c);
    return na(), /* @__PURE__ */ V(dn, { children: [
      /* @__PURE__ */ g(
        gr,
        {
          asChild: !0,
          loop: !0,
          trapped: r,
          onMountAutoFocus: o,
          onUnmountAutoFocus: a,
          children: /* @__PURE__ */ g(
            pr,
            {
              role: "dialog",
              id: i.contentId,
              "aria-describedby": i.descriptionId,
              "aria-labelledby": i.titleId,
              "data-state": Qr(i.open),
              ...s,
              ref: l,
              onDismiss: () => i.onOpenChange(!1)
            }
          )
        }
      ),
      /* @__PURE__ */ V(dn, { children: [
        /* @__PURE__ */ g(nb, { titleId: i.titleId }),
        /* @__PURE__ */ g(ob, { contentRef: c, descriptionId: i.descriptionId })
      ] })
    ] });
  }
), Kr = "DialogTitle", _i = p.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = Re(Kr, n);
    return /* @__PURE__ */ g(K.h2, { id: o.titleId, ...r, ref: t });
  }
);
_i.displayName = Kr;
var Wi = "DialogDescription", Ii = p.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = Re(Wi, n);
    return /* @__PURE__ */ g(K.p, { id: o.descriptionId, ...r, ref: t });
  }
);
Ii.displayName = Wi;
var $i = "DialogClose", Fi = p.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = Re($i, n);
    return /* @__PURE__ */ g(
      K.button,
      {
        type: "button",
        ...r,
        ref: t,
        onClick: ee(e.onClick, () => o.onOpenChange(!1))
      }
    );
  }
);
Fi.displayName = $i;
function Qr(e) {
  return e ? "open" : "closed";
}
var Yi = "DialogTitleWarning", [Db, Bi] = qc(Yi, {
  contentName: mt,
  titleName: Kr,
  docsSlug: "dialog"
}), nb = ({ titleId: e }) => {
  const t = Bi(Yi), n = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;
  return p.useEffect(() => {
    e && (document.getElementById(e) || console.error(n));
  }, [n, e]), null;
}, rb = "DialogDescriptionWarning", ob = ({ contentRef: e, descriptionId: t }) => {
  const r = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${Bi(rb).contentName}}.`;
  return p.useEffect(() => {
    var a;
    const o = (a = e.current) == null ? void 0 : a.getAttribute("aria-describedby");
    t && o && (document.getElementById(t) || console.warn(r));
  }, [r, e, t]), null;
}, ab = Si, sb = Ei, ib = Ri, cb = Ai, lb = _i, db = Ii, ub = Fi;
const fb = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg"
}, Wt = P.forwardRef(
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
  }, l) => /* @__PURE__ */ g(ab, { open: e, onOpenChange: t, children: /* @__PURE__ */ V(sb, { children: [
    /* @__PURE__ */ g(
      ib,
      {
        className: W(
          "fixed inset-0 z-50 bg-black/50",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        )
      }
    ),
    /* @__PURE__ */ V(
      cb,
      {
        ref: l,
        className: W(
          "fixed left-[50%] top-[50%] z-50",
          "translate-x-[-50%] translate-y-[-50%]",
          "w-full",
          fb[c],
          "bg-white rounded-lg shadow-lg",
          "p-6",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          s
        ),
        children: [
          i && /* @__PURE__ */ V(
            ub,
            {
              className: W(
                "absolute right-4 top-4 rounded-sm opacity-70",
                "transition-opacity hover:opacity-100",
                "focus:outline-none focus:ring-2 focus:ring-cms-gray-400",
                "disabled:pointer-events-none"
              ),
              children: [
                /* @__PURE__ */ g(Lg, { className: "h-4 w-4" }),
                /* @__PURE__ */ g("span", { className: "sr-only", children: "Close" })
              ]
            }
          ),
          n && /* @__PURE__ */ g("div", { className: "flex justify-center mb-4", children: n }),
          r && /* @__PURE__ */ g(
            lb,
            {
              className: W(
                "text-lg font-bold text-cms-gray-900 mb-2",
                "flex items-center justify-center"
              ),
              children: r
            }
          ),
          /* @__PURE__ */ g(db, { className: "text-sm text-cms-gray-700 text-center", children: o }),
          a && /* @__PURE__ */ g("div", { className: "mt-6", children: a })
        ]
      }
    )
  ] }) })
);
Wt.displayName = "Modal";
const hb = P.forwardRef(
  ({
    open: e,
    onOpenChange: t,
    title: n = "확인",
    message: r,
    confirmText: o = "확인",
    onConfirm: a,
    className: s
  }, i) => /* @__PURE__ */ g(
    Wt,
    {
      ref: i,
      open: e,
      onOpenChange: t,
      title: n,
      footer: /* @__PURE__ */ g(
        ot,
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
      icon: /* @__PURE__ */ g(gi, { className: "w-15 h-15 text-cms-black" }),
      children: /* @__PURE__ */ g("div", { className: "text-sm text-cms-gray-700", children: r })
    }
  )
);
hb.displayName = "ConfirmModal";
const mb = P.forwardRef(
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
  }, l) => /* @__PURE__ */ g(
    Wt,
    {
      ref: l,
      open: e,
      onOpenChange: t,
      icon: /* @__PURE__ */ g(bi, { className: "w-15 h-15 text-cms-red-400" }),
      title: n,
      footer: /* @__PURE__ */ V("div", { className: "flex gap-2 w-full", children: [
        /* @__PURE__ */ g(
          ot,
          {
            onClick: () => {
              i == null || i(), t(!1);
            },
            variant: "outline",
            className: "flex-1 h-12",
            children: a
          }
        ),
        /* @__PURE__ */ g(
          ot,
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
      className: c,
      size: "sm",
      showCloseButton: !1,
      children: /* @__PURE__ */ g("div", { className: "text-sm text-cms-gray-700", children: r })
    }
  )
);
mb.displayName = "DeleteModal";
const pb = P.forwardRef(
  ({
    open: e,
    onOpenChange: t,
    title: n = "오류",
    message: r,
    confirmText: o = "확인",
    onConfirm: a,
    className: s
  }, i) => /* @__PURE__ */ g(
    Wt,
    {
      ref: i,
      open: e,
      onOpenChange: t,
      icon: /* @__PURE__ */ g(Fg, { className: "w-15 h-15 text-cms-red-400" }),
      title: n,
      footer: /* @__PURE__ */ g(
        ot,
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
      children: /* @__PURE__ */ g("div", { className: "text-sm text-cms-gray-700", children: r })
    }
  )
);
pb.displayName = "ErrorModal";
const gb = P.forwardRef(
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
  }, l) => /* @__PURE__ */ g(
    Wt,
    {
      ref: l,
      open: e,
      onOpenChange: t,
      icon: /* @__PURE__ */ g(bi, { className: "w-15 h-15 text-cms-orange-500" }),
      title: n,
      footer: (
        // 버튼 두 개를 가로로 배치하기 위해 flex 컨테이너 사용
        /* @__PURE__ */ V("div", { className: "flex w-full gap-2", children: [
          /* @__PURE__ */ g(
            ot,
            {
              onClick: () => {
                i == null || i(), t(!1);
              },
              className: "flex-1 h-12 bg-white border border-cms-gray-200 text-cms-gray-700 hover:bg-cms-gray-50",
              children: s
            }
          ),
          /* @__PURE__ */ g(
            ot,
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
      children: /* @__PURE__ */ g("div", { className: "text-sm text-cms-gray-700", children: r })
    }
  )
);
gb.displayName = "WarningModal";
const bb = P.forwardRef(
  ({
    open: e,
    onOpenChange: t,
    title: n = "성공",
    message: r,
    confirmText: o = "확인",
    onConfirm: a,
    className: s
  }, i) => /* @__PURE__ */ g(
    Wt,
    {
      ref: i,
      open: e,
      onOpenChange: t,
      icon: /* @__PURE__ */ g(gi, { className: "w-15 h-15 text-cms-green-500 border-cms-green-500" }),
      title: n,
      footer: /* @__PURE__ */ g(
        ot,
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
      children: /* @__PURE__ */ g("div", { className: "text-sm text-cms-gray-700", children: r })
    }
  )
);
bb.displayName = "SuccessModal";
export {
  ot as Button,
  Ug as Checkbox,
  Cb as ChevronRightIcon,
  Gc as Combobox,
  hb as ConfirmModal,
  Mp as DatePicker,
  Op as DateRangePicker,
  mb as DeleteModal,
  mr as Dropdown,
  pb as ErrorModal,
  xb as LoadingCircle,
  Wt as Modal,
  kb as Popover,
  zu as PopoverContent,
  ju as PopoverMenuItem,
  Mb as PopoverTrigger,
  rg as RadioGroup,
  sg as RadioGroupItem,
  Vc as Select,
  Hg as SideNavigation,
  bb as SuccessModal,
  Tp as Switch,
  Gu as Text,
  Qu as TextInput,
  gb as WarningModal,
  Bc as buttonVariants,
  W as cn,
  zc as dropdownTriggerVariants,
  Hu as popoverMenuItemVariants
};
//# sourceMappingURL=index.es.js.map
