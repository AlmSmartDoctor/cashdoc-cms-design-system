import { jsx as C, jsxs as U, Fragment as Po } from "react/jsx-runtime";
import * as g from "react";
import P, { forwardRef as rt, useState as ve, useRef as bt, useEffect as Wt, useLayoutEffect as Eo, createContext as Ai, useContext as Ri, useCallback as xe, useMemo as Fe, createElement as Xn } from "react";
import * as Ao from "react-dom";
import Ti from "react-dom";
function Ro(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (n = Ro(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function To() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++) (e = arguments[n]) && (t = Ro(e)) && (r && (r += " "), r += t);
  return r;
}
const ar = "-", Wi = (e) => {
  const t = Ii(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (s) => {
      const i = s.split(ar);
      return i[0] === "" && i.length !== 1 && i.shift(), Wo(i, t) || _i(s);
    },
    getConflictingClassGroupIds: (s, i) => {
      const c = n[s] || [];
      return i && r[s] ? [...c, ...r[s]] : c;
    }
  };
}, Wo = (e, t) => {
  var s;
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], r = t.nextPart.get(n), o = r ? Wo(e.slice(1), r) : void 0;
  if (o)
    return o;
  if (t.validators.length === 0)
    return;
  const a = e.join(ar);
  return (s = t.validators.find(({
    validator: i
  }) => i(a))) == null ? void 0 : s.classGroupId;
}, Br = /^\[(.+)\]$/, _i = (e) => {
  if (Br.test(e)) {
    const t = Br.exec(e)[1], n = t == null ? void 0 : t.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, Ii = (e) => {
  const {
    theme: t,
    prefix: n
  } = e, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return Fi(Object.entries(e.classGroups), n).forEach(([a, s]) => {
    Kn(s, r, a, t);
  }), r;
}, Kn = (e, t, n, r) => {
  e.forEach((o) => {
    if (typeof o == "string") {
      const a = o === "" ? t : Lr(t, o);
      a.classGroupId = n;
      return;
    }
    if (typeof o == "function") {
      if ($i(o)) {
        Kn(o(r), t, n, r);
        return;
      }
      t.validators.push({
        validator: o,
        classGroupId: n
      });
      return;
    }
    Object.entries(o).forEach(([a, s]) => {
      Kn(s, Lr(t, a), n, r);
    });
  });
}, Lr = (e, t) => {
  let n = e;
  return t.split(ar).forEach((r) => {
    n.nextPart.has(r) || n.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(r);
  }), n;
}, $i = (e) => e.isThemeGetter, Fi = (e, t) => t ? e.map(([n, r]) => {
  const o = r.map((a) => typeof a == "string" ? t + a : typeof a == "object" ? Object.fromEntries(Object.entries(a).map(([s, i]) => [t + s, i])) : a);
  return [n, o];
}) : e, Yi = (e) => {
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
}, _o = "!", Bi = (e) => {
  const {
    separator: t,
    experimentalParseClassName: n
  } = e, r = t.length === 1, o = t[0], a = t.length, s = (i) => {
    const c = [];
    let l = 0, u = 0, d;
    for (let p = 0; p < i.length; p++) {
      let b = i[p];
      if (l === 0) {
        if (b === o && (r || i.slice(p, p + a) === t)) {
          c.push(i.slice(u, p)), u = p + a;
          continue;
        }
        if (b === "/") {
          d = p;
          continue;
        }
      }
      b === "[" ? l++ : b === "]" && l--;
    }
    const f = c.length === 0 ? i : i.substring(u), h = f.startsWith(_o), v = h ? f.substring(1) : f, m = d && d > u ? d - u : void 0;
    return {
      modifiers: c,
      hasImportantModifier: h,
      baseClassName: v,
      maybePostfixModifierPosition: m
    };
  };
  return n ? (i) => n({
    className: i,
    parseClassName: s
  }) : s;
}, Li = (e) => {
  if (e.length <= 1)
    return e;
  const t = [];
  let n = [];
  return e.forEach((r) => {
    r[0] === "[" ? (t.push(...n.sort(), r), n = []) : n.push(r);
  }), t.push(...n.sort()), t;
}, Hi = (e) => ({
  cache: Yi(e.cacheSize),
  parseClassName: Bi(e),
  ...Wi(e)
}), zi = /\s+/, Vi = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: r,
    getConflictingClassGroupIds: o
  } = t, a = [], s = e.trim().split(zi);
  let i = "";
  for (let c = s.length - 1; c >= 0; c -= 1) {
    const l = s[c], {
      modifiers: u,
      hasImportantModifier: d,
      baseClassName: f,
      maybePostfixModifierPosition: h
    } = n(l);
    let v = !!h, m = r(v ? f.substring(0, h) : f);
    if (!m) {
      if (!v) {
        i = l + (i.length > 0 ? " " + i : i);
        continue;
      }
      if (m = r(f), !m) {
        i = l + (i.length > 0 ? " " + i : i);
        continue;
      }
      v = !1;
    }
    const p = Li(u).join(":"), b = d ? p + _o : p, w = b + m;
    if (a.includes(w))
      continue;
    a.push(w);
    const y = o(m, v);
    for (let k = 0; k < y.length; ++k) {
      const M = y[k];
      a.push(b + M);
    }
    i = l + (i.length > 0 ? " " + i : i);
  }
  return i;
};
function ji() {
  let e = 0, t, n, r = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = Io(t)) && (r && (r += " "), r += n);
  return r;
}
const Io = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (t = Io(e[r])) && (n && (n += " "), n += t);
  return n;
};
function Gi(e, ...t) {
  let n, r, o, a = s;
  function s(c) {
    const l = t.reduce((u, d) => d(u), e());
    return n = Hi(l), r = n.cache.get, o = n.cache.set, a = i, i(c);
  }
  function i(c) {
    const l = r(c);
    if (l)
      return l;
    const u = Vi(c, n);
    return o(c, u), u;
  }
  return function() {
    return a(ji.apply(null, arguments));
  };
}
const ee = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, $o = /^\[(?:([a-z-]+):)?(.+)\]$/i, Ui = /^\d+\/\d+$/, qi = /* @__PURE__ */ new Set(["px", "full", "screen"]), Xi = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Ki = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Qi = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, Zi = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Ji = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Ve = (e) => vt(e) || qi.has(e) || Ui.test(e), Ke = (e) => St(e, "length", ic), vt = (e) => !!e && !Number.isNaN(Number(e)), Tn = (e) => St(e, "number", vt), Et = (e) => !!e && Number.isInteger(Number(e)), ec = (e) => e.endsWith("%") && vt(e.slice(0, -1)), V = (e) => $o.test(e), Qe = (e) => Xi.test(e), tc = /* @__PURE__ */ new Set(["length", "size", "percentage"]), nc = (e) => St(e, tc, Fo), rc = (e) => St(e, "position", Fo), oc = /* @__PURE__ */ new Set(["image", "url"]), ac = (e) => St(e, oc, lc), sc = (e) => St(e, "", cc), At = () => !0, St = (e, t, n) => {
  const r = $o.exec(e);
  return r ? r[1] ? typeof t == "string" ? r[1] === t : t.has(r[1]) : n(r[2]) : !1;
}, ic = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Ki.test(e) && !Qi.test(e)
), Fo = () => !1, cc = (e) => Zi.test(e), lc = (e) => Ji.test(e), uc = () => {
  const e = ee("colors"), t = ee("spacing"), n = ee("blur"), r = ee("brightness"), o = ee("borderColor"), a = ee("borderRadius"), s = ee("borderSpacing"), i = ee("borderWidth"), c = ee("contrast"), l = ee("grayscale"), u = ee("hueRotate"), d = ee("invert"), f = ee("gap"), h = ee("gradientColorStops"), v = ee("gradientColorStopPositions"), m = ee("inset"), p = ee("margin"), b = ee("opacity"), w = ee("padding"), y = ee("saturate"), k = ee("scale"), M = ee("sepia"), x = ee("skew"), S = ee("space"), R = ee("translate"), $ = () => ["auto", "contain", "none"], T = () => ["auto", "hidden", "clip", "visible", "scroll"], _ = () => ["auto", V, t], F = () => [V, t], j = () => ["", Ve, Ke], O = () => ["auto", vt, V], E = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], D = () => ["solid", "dashed", "dotted", "double", "none"], A = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], N = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], W = () => ["", "0", V], I = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], B = () => [vt, V];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [At],
      spacing: [Ve, Ke],
      blur: ["none", "", Qe, V],
      brightness: B(),
      borderColor: [e],
      borderRadius: ["none", "", "full", Qe, V],
      borderSpacing: F(),
      borderWidth: j(),
      contrast: B(),
      grayscale: W(),
      hueRotate: B(),
      invert: W(),
      gap: F(),
      gradientColorStops: [e],
      gradientColorStopPositions: [ec, Ke],
      inset: _(),
      margin: _(),
      opacity: B(),
      padding: F(),
      saturate: B(),
      scale: B(),
      sepia: W(),
      skew: B(),
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
        aspect: ["auto", "square", "video", V]
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
        columns: [Qe]
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
        object: [...E(), V]
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
        overscroll: $()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": $()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": $()
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
        z: ["auto", Et, V]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: _()
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
        flex: ["1", "auto", "initial", "none", V]
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
        order: ["first", "last", "none", Et, V]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [At]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", Et, V]
        }, V]
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
        "grid-rows": [At]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [Et, V]
        }, V]
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
        "auto-cols": ["auto", "min", "max", "fr", V]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", V]
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
        m: [p]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [p]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [p]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [p]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [p]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [p]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [p]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [p]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [p]
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
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", V, t]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [V, t, "min", "max", "fit"]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [V, t, "none", "full", "min", "max", "fit", "prose", {
          screen: [Qe]
        }, Qe]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [V, t, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": [V, t, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [V, t, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [V, t, "auto", "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", Qe, Ke]
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
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", Tn]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [At]
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
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", V]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", vt, Tn]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", Ve, V]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", V]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", V]
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
        decoration: ["auto", "from-font", Ve, Ke]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", Ve, V]
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
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", V]
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
        content: ["none", V]
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
        bg: [...E(), rc]
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
        bg: ["auto", "cover", "contain", nc]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, ac]
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
        "outline-offset": [Ve, V]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [Ve, Ke]
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
        ring: j()
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
        "ring-offset": [Ve, Ke]
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
        shadow: ["", "inner", "none", Qe, sc]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [At]
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
        "drop-shadow": ["", "none", Qe, V]
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
        saturate: [y]
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
        "backdrop-opacity": [b]
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
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", V]
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
        ease: ["linear", "in", "out", "in-out", V]
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
        animate: ["none", "spin", "ping", "pulse", "bounce", V]
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
        rotate: [Et, V]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [R]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [R]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [x]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [x]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", V]
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", V]
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
        "will-change": ["auto", "scroll", "contents", "transform", V]
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
        stroke: [Ve, Ke, Tn]
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
}, dc = /* @__PURE__ */ Gi(uc);
function H(...e) {
  return dc(To(e));
}
const Hr = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, zr = To, Ne = (e, t) => (n) => {
  var r;
  if ((t == null ? void 0 : t.variants) == null) return zr(e, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
  const { variants: o, defaultVariants: a } = t, s = Object.keys(o).map((l) => {
    const u = n == null ? void 0 : n[l], d = a == null ? void 0 : a[l];
    if (u === null) return null;
    const f = Hr(u) || Hr(d);
    return o[l][f];
  }), i = n && Object.entries(n).reduce((l, u) => {
    let [d, f] = u;
    return f === void 0 || (l[d] = f), l;
  }, {}), c = t == null || (r = t.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((l, u) => {
    let { class: d, className: f, ...h } = u;
    return Object.entries(h).every((v) => {
      let [m, p] = v;
      return Array.isArray(p) ? p.includes({
        ...a,
        ...i
      }[m]) : {
        ...a,
        ...i
      }[m] === p;
    }) ? [
      ...l,
      d,
      f
    ] : l;
  }, []);
  return zr(e, s, c, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
}, fc = Ne(
  H(
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
        secondary: H(
          "bg-cms-gray-300 text-cms-black",
          "hover:bg-cms-gray-200 hover:text-cms-gray-800"
        ),
        outline: H(
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
), hc = rt(
  ({ className: e, variant: t, size: n, ...r }, o) => /* @__PURE__ */ C(
    "button",
    {
      className: H(fc({ variant: t, size: n, className: e })),
      ref: o,
      ...r
    }
  )
);
hc.displayName = "Button";
const mc = {
  sm: "h-4 w-4",
  md: "h-8 w-8",
  lg: "h-16 w-16"
};
function wg({ size: e = "lg", className: t }) {
  return /* @__PURE__ */ C("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ C(
    "div",
    {
      className: H(
        mc[e],
        "animate-spin rounded-full border-2 border-cms-gray-500 border-b-transparent",
        t
      )
    }
  ) });
}
const pc = Ne(
  H(
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
        default: H(
          "bg-default text-black border border-cms-outline",
          "hover:bg-cms-gray-200"
        ),
        outline: H(
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
), gc = ({
  className: e,
  isOpen: t
}) => /* @__PURE__ */ C(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "10",
    height: "6",
    viewBox: "0 0 10 6",
    fill: "none",
    className: H(
      "transition-transform duration-200",
      t && "rotate-180",
      e
    ),
    children: /* @__PURE__ */ C(
      "path",
      {
        d: "M8.75 0.75L4.57609 4.75L0.75 0.75",
        stroke: "currentColor",
        strokeWidth: "1.5",
        strokeLinecap: "round"
      }
    )
  }
), bc = ({ className: e }) => /* @__PURE__ */ C(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none",
    className: e,
    children: /* @__PURE__ */ C(
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
), sr = rt(
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
    ...h
  }, v) => {
    const [m, p] = ve(!1), [b, w] = ve(""), [y, k] = ve(
      d ? t ? [t] : [] : []
    ), M = bt(null), x = bt(null), S = e.find((O) => O.value === t), R = d ? y.length > 0 ? `${y.length}개 선택됨` : n : (S == null ? void 0 : S.label) || n, $ = e.filter(
      (O) => O.label.toLowerCase().includes(b.toLowerCase())
    ), T = () => {
      o || (p(!m), w(""));
    }, _ = (O) => {
      if (!O.disabled)
        if (d) {
          const E = y.includes(O.value) ? y.filter((D) => D !== O.value) : [...y, O.value];
          k(E), r == null || r(E.join(","));
        } else
          r == null || r(O.value), p(!1);
    }, F = (O) => {
      O.stopPropagation(), d && k([]), r == null || r("");
    }, j = (O) => {
      O.key === "Escape" ? p(!1) : (O.key === "Enter" || O.key === " ") && (O.preventDefault(), T());
    };
    return Wt(() => {
      const O = (E) => {
        M.current && !M.current.contains(E.target) && p(!1);
      };
      return document.addEventListener("mousedown", O), () => document.removeEventListener("mousedown", O);
    }, []), Wt(() => {
      m && l && x.current && x.current.focus();
    }, [m, l]), /* @__PURE__ */ U("div", { ref: M, className: "relative w-full", children: [
      /* @__PURE__ */ U(
        "button",
        {
          ref: v,
          type: "button",
          className: H(
            pc({ variant: i, size: c }),
            o && "opacity-50 cursor-not-allowed",
            a
          ),
          onClick: T,
          onKeyDown: j,
          disabled: o,
          "aria-expanded": m,
          "aria-haspopup": "listbox",
          ...h,
          children: [
            /* @__PURE__ */ C(
              "span",
              {
                className: H(
                  "truncate flex-1 text-left",
                  !S && !d && "text-cms-gray-400"
                ),
                children: R
              }
            ),
            /* @__PURE__ */ U("div", { className: "flex items-center gap-2 ml-3", children: [
              u && (t || y.length > 0) && /* @__PURE__ */ C(
                "button",
                {
                  type: "button",
                  className: H(
                    "p-1 rounded text-cms-gray-400 transition-colors",
                    "hover:text-cms-black"
                  ),
                  onClick: F,
                  "aria-label": "선택 취소",
                  children: /* @__PURE__ */ C(bc, { className: "w-3 h-3" })
                }
              ),
              /* @__PURE__ */ C(
                gc,
                {
                  isOpen: m,
                  className: "w-4 h-4 text-cms-gray-400"
                }
              )
            ] })
          ]
        }
      ),
      m && /* @__PURE__ */ U(
        "div",
        {
          className: H(
            "absolute z-50 mt-1 py-1 w-full",
            "rounded-lg border border-cms-gray-400",
            "bg-white shadow-lg",
            s
          ),
          style: { maxHeight: `${f}px` },
          children: [
            l && /* @__PURE__ */ C("div", { className: "px-3 py-2 border-b border-cms-gray-400", children: /* @__PURE__ */ C(
              "input",
              {
                ref: x,
                type: "text",
                value: b,
                onChange: (O) => w(O.target.value),
                placeholder: "검색...",
                className: H(
                  "w-full px-2 py-1 text-sm",
                  "rounded outline-none",
                  "border border-cms-gray-400",
                  "focus:ring-1 focus:ring-cms-black"
                )
              }
            ) }),
            /* @__PURE__ */ C("div", { className: "max-h-48 overflow-y-auto", children: $.length === 0 ? /* @__PURE__ */ C("div", { className: "px-3 py-2 text-sm text-cms-gray-400 text-center", children: b ? "검색 결과가 없습니다" : "옵션이 없습니다" }) : $.map((O) => {
              const E = d ? y.includes(O.value) : t === O.value;
              return /* @__PURE__ */ U(
                "button",
                {
                  type: "button",
                  className: H(
                    "flex items-center justify-between gap-2",
                    "w-full px-3 py-2 ",
                    "text-left text-sm",
                    "transition-colors",
                    O.disabled ? "text-cms-gray-400 cursor-not-allowed" : "text-cms-black hover:bg-cms-gray-200 cursor-pointer",
                    E && "bg-cms-gray-400 font-medium"
                  ),
                  onClick: () => _(O),
                  disabled: O.disabled,
                  children: [
                    /* @__PURE__ */ C("span", { className: "truncate", children: O.label }),
                    E && /* @__PURE__ */ C(
                      "svg",
                      {
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "16",
                        height: "16",
                        viewBox: "0 0 16 16",
                        fill: "none",
                        className: "w-4 h-4 text-black shrink-0",
                        children: /* @__PURE__ */ C(
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
sr.displayName = "Dropdown";
const vc = rt(
  ({ label: e, helperText: t, error: n, required: r, className: o, ...a }, s) => /* @__PURE__ */ U("div", { className: H("space-y-1", o), children: [
    e && /* @__PURE__ */ U("label", { className: "block text-sm font-medium text-cms-black", children: [
      e,
      r && /* @__PURE__ */ C("span", { className: "text-cms-red-500 ml-1", children: "*" })
    ] }),
    /* @__PURE__ */ C(
      sr,
      {
        ref: s,
        ...a,
        className: H(n && "border-cms-red-500 focus:ring-cms-red-500")
      }
    ),
    (t || n) && /* @__PURE__ */ C(
      "p",
      {
        className: H(
          "text-xs",
          n ? "text-cms-red-500" : "text-cms-gray-400"
        ),
        children: n || t
      }
    )
  ] })
);
vc.displayName = "Select";
const yc = rt(
  ({ options: e, loading: t = !1, createable: n = !1, onCreateOption: r, ...o }, a) => {
    const [s] = ve(""), i = e.filter(
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
    return /* @__PURE__ */ C(
      sr,
      {
        ref: a,
        ...o,
        options: l,
        searchable: !0,
        dropdownClassName: H(t && "opacity-75", o.dropdownClassName),
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
yc.displayName = "Combobox";
function xg(e) {
  return /* @__PURE__ */ C(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "20",
      height: "20",
      viewBox: "0 0 20 20",
      fill: "none",
      ...e,
      children: /* @__PURE__ */ C(
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
function ae(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(o) {
    if (e == null || e(o), n === !1 || !o.defaultPrevented)
      return t == null ? void 0 : t(o);
  };
}
function Vr(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function Yo(...e) {
  return (t) => {
    let n = !1;
    const r = e.map((o) => {
      const a = Vr(o, t);
      return !n && typeof a == "function" && (n = !0), a;
    });
    if (n)
      return () => {
        for (let o = 0; o < r.length; o++) {
          const a = r[o];
          typeof a == "function" ? a() : Vr(e[o], null);
        }
      };
  };
}
function ie(...e) {
  return g.useCallback(Yo(...e), e);
}
function Le(e, t = []) {
  let n = [];
  function r(a, s) {
    const i = g.createContext(s), c = n.length;
    n = [...n, s];
    const l = (d) => {
      var b;
      const { scope: f, children: h, ...v } = d, m = ((b = f == null ? void 0 : f[e]) == null ? void 0 : b[c]) || i, p = g.useMemo(() => v, Object.values(v));
      return /* @__PURE__ */ C(m.Provider, { value: p, children: h });
    };
    l.displayName = a + "Provider";
    function u(d, f) {
      var m;
      const h = ((m = f == null ? void 0 : f[e]) == null ? void 0 : m[c]) || i, v = g.useContext(h);
      if (v) return v;
      if (s !== void 0) return s;
      throw new Error(`\`${d}\` must be used within \`${a}\``);
    }
    return [l, u];
  }
  const o = () => {
    const a = n.map((s) => g.createContext(s));
    return function(i) {
      const c = (i == null ? void 0 : i[e]) || a;
      return g.useMemo(
        () => ({ [`__scope${e}`]: { ...i, [e]: c } }),
        [i, c]
      );
    };
  };
  return o.scopeName = e, [r, wc(o, ...t)];
}
function wc(...e) {
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
      return g.useMemo(() => ({ [`__scope${t.scopeName}`]: s }), [s]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
// @__NO_SIDE_EFFECTS__
function nn(e) {
  const t = /* @__PURE__ */ xc(e), n = g.forwardRef((r, o) => {
    const { children: a, ...s } = r, i = g.Children.toArray(a), c = i.find(kc);
    if (c) {
      const l = c.props.children, u = i.map((d) => d === c ? g.Children.count(l) > 1 ? g.Children.only(null) : g.isValidElement(l) ? l.props.children : null : d);
      return /* @__PURE__ */ C(t, { ...s, ref: o, children: g.isValidElement(l) ? g.cloneElement(l, void 0, u) : null });
    }
    return /* @__PURE__ */ C(t, { ...s, ref: o, children: a });
  });
  return n.displayName = `${e}.Slot`, n;
}
// @__NO_SIDE_EFFECTS__
function xc(e) {
  const t = g.forwardRef((n, r) => {
    const { children: o, ...a } = n;
    if (g.isValidElement(o)) {
      const s = Sc(o), i = Mc(a, o.props);
      return o.type !== g.Fragment && (i.ref = r ? Yo(r, s) : s), g.cloneElement(o, i);
    }
    return g.Children.count(o) > 1 ? g.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var Cc = Symbol("radix.slottable");
function kc(e) {
  return g.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Cc;
}
function Mc(e, t) {
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
function Sc(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var Oc = [
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
], te = Oc.reduce((e, t) => {
  const n = /* @__PURE__ */ nn(`Primitive.${t}`), r = g.forwardRef((o, a) => {
    const { asChild: s, ...i } = o, c = s ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ C(c, { ...i, ref: a });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {});
function Dc(e, t) {
  e && Ao.flushSync(() => e.dispatchEvent(t));
}
function ct(e) {
  const t = g.useRef(e);
  return g.useEffect(() => {
    t.current = e;
  }), g.useMemo(() => (...n) => {
    var r;
    return (r = t.current) == null ? void 0 : r.call(t, ...n);
  }, []);
}
function Nc(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = ct(e);
  g.useEffect(() => {
    const r = (o) => {
      o.key === "Escape" && n(o);
    };
    return t.addEventListener("keydown", r, { capture: !0 }), () => t.removeEventListener("keydown", r, { capture: !0 });
  }, [n, t]);
}
var Pc = "DismissableLayer", Qn = "dismissableLayer.update", Ec = "dismissableLayer.pointerDownOutside", Ac = "dismissableLayer.focusOutside", jr, Bo = g.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), Lo = g.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: r,
      onPointerDownOutside: o,
      onFocusOutside: a,
      onInteractOutside: s,
      onDismiss: i,
      ...c
    } = e, l = g.useContext(Bo), [u, d] = g.useState(null), f = (u == null ? void 0 : u.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), [, h] = g.useState({}), v = ie(t, (S) => d(S)), m = Array.from(l.layers), [p] = [...l.layersWithOutsidePointerEventsDisabled].slice(-1), b = m.indexOf(p), w = u ? m.indexOf(u) : -1, y = l.layersWithOutsidePointerEventsDisabled.size > 0, k = w >= b, M = Wc((S) => {
      const R = S.target, $ = [...l.branches].some((T) => T.contains(R));
      !k || $ || (o == null || o(S), s == null || s(S), S.defaultPrevented || i == null || i());
    }, f), x = _c((S) => {
      const R = S.target;
      [...l.branches].some((T) => T.contains(R)) || (a == null || a(S), s == null || s(S), S.defaultPrevented || i == null || i());
    }, f);
    return Nc((S) => {
      w === l.layers.size - 1 && (r == null || r(S), !S.defaultPrevented && i && (S.preventDefault(), i()));
    }, f), g.useEffect(() => {
      if (u)
        return n && (l.layersWithOutsidePointerEventsDisabled.size === 0 && (jr = f.body.style.pointerEvents, f.body.style.pointerEvents = "none"), l.layersWithOutsidePointerEventsDisabled.add(u)), l.layers.add(u), Gr(), () => {
          n && l.layersWithOutsidePointerEventsDisabled.size === 1 && (f.body.style.pointerEvents = jr);
        };
    }, [u, f, n, l]), g.useEffect(() => () => {
      u && (l.layers.delete(u), l.layersWithOutsidePointerEventsDisabled.delete(u), Gr());
    }, [u, l]), g.useEffect(() => {
      const S = () => h({});
      return document.addEventListener(Qn, S), () => document.removeEventListener(Qn, S);
    }, []), /* @__PURE__ */ C(
      te.div,
      {
        ...c,
        ref: v,
        style: {
          pointerEvents: y ? k ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: ae(e.onFocusCapture, x.onFocusCapture),
        onBlurCapture: ae(e.onBlurCapture, x.onBlurCapture),
        onPointerDownCapture: ae(
          e.onPointerDownCapture,
          M.onPointerDownCapture
        )
      }
    );
  }
);
Lo.displayName = Pc;
var Rc = "DismissableLayerBranch", Tc = g.forwardRef((e, t) => {
  const n = g.useContext(Bo), r = g.useRef(null), o = ie(t, r);
  return g.useEffect(() => {
    const a = r.current;
    if (a)
      return n.branches.add(a), () => {
        n.branches.delete(a);
      };
  }, [n.branches]), /* @__PURE__ */ C(te.div, { ...e, ref: o });
});
Tc.displayName = Rc;
function Wc(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = ct(e), r = g.useRef(!1), o = g.useRef(() => {
  });
  return g.useEffect(() => {
    const a = (i) => {
      if (i.target && !r.current) {
        let c = function() {
          Ho(
            Ec,
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
function _c(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = ct(e), r = g.useRef(!1);
  return g.useEffect(() => {
    const o = (a) => {
      a.target && !r.current && Ho(Ac, n, { originalEvent: a }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o);
  }, [t, n]), {
    onFocusCapture: () => r.current = !0,
    onBlurCapture: () => r.current = !1
  };
}
function Gr() {
  const e = new CustomEvent(Qn);
  document.dispatchEvent(e);
}
function Ho(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target, a = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && o.addEventListener(e, t, { once: !0 }), r ? Dc(o, a) : o.dispatchEvent(a);
}
var Wn = 0;
function Ic() {
  g.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? Ur()), document.body.insertAdjacentElement("beforeend", e[1] ?? Ur()), Wn++, () => {
      Wn === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), Wn--;
    };
  }, []);
}
function Ur() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var _n = "focusScope.autoFocusOnMount", In = "focusScope.autoFocusOnUnmount", qr = { bubbles: !1, cancelable: !0 }, $c = "FocusScope", zo = g.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: r = !1,
    onMountAutoFocus: o,
    onUnmountAutoFocus: a,
    ...s
  } = e, [i, c] = g.useState(null), l = ct(o), u = ct(a), d = g.useRef(null), f = ie(t, (m) => c(m)), h = g.useRef({
    paused: !1,
    pause() {
      this.paused = !0;
    },
    resume() {
      this.paused = !1;
    }
  }).current;
  g.useEffect(() => {
    if (r) {
      let m = function(y) {
        if (h.paused || !i) return;
        const k = y.target;
        i.contains(k) ? d.current = k : Je(d.current, { select: !0 });
      }, p = function(y) {
        if (h.paused || !i) return;
        const k = y.relatedTarget;
        k !== null && (i.contains(k) || Je(d.current, { select: !0 }));
      }, b = function(y) {
        if (document.activeElement === document.body)
          for (const M of y)
            M.removedNodes.length > 0 && Je(i);
      };
      document.addEventListener("focusin", m), document.addEventListener("focusout", p);
      const w = new MutationObserver(b);
      return i && w.observe(i, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", m), document.removeEventListener("focusout", p), w.disconnect();
      };
    }
  }, [r, i, h.paused]), g.useEffect(() => {
    if (i) {
      Kr.add(h);
      const m = document.activeElement;
      if (!i.contains(m)) {
        const b = new CustomEvent(_n, qr);
        i.addEventListener(_n, l), i.dispatchEvent(b), b.defaultPrevented || (Fc(zc(Vo(i)), { select: !0 }), document.activeElement === m && Je(i));
      }
      return () => {
        i.removeEventListener(_n, l), setTimeout(() => {
          const b = new CustomEvent(In, qr);
          i.addEventListener(In, u), i.dispatchEvent(b), b.defaultPrevented || Je(m ?? document.body, { select: !0 }), i.removeEventListener(In, u), Kr.remove(h);
        }, 0);
      };
    }
  }, [i, l, u, h]);
  const v = g.useCallback(
    (m) => {
      if (!n && !r || h.paused) return;
      const p = m.key === "Tab" && !m.altKey && !m.ctrlKey && !m.metaKey, b = document.activeElement;
      if (p && b) {
        const w = m.currentTarget, [y, k] = Yc(w);
        y && k ? !m.shiftKey && b === k ? (m.preventDefault(), n && Je(y, { select: !0 })) : m.shiftKey && b === y && (m.preventDefault(), n && Je(k, { select: !0 })) : b === w && m.preventDefault();
      }
    },
    [n, r, h.paused]
  );
  return /* @__PURE__ */ C(te.div, { tabIndex: -1, ...s, ref: f, onKeyDown: v });
});
zo.displayName = $c;
function Fc(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if (Je(r, { select: t }), document.activeElement !== n) return;
}
function Yc(e) {
  const t = Vo(e), n = Xr(t, e), r = Xr(t.reverse(), e);
  return [n, r];
}
function Vo(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function Xr(e, t) {
  for (const n of e)
    if (!Bc(n, { upTo: t })) return n;
}
function Bc(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function Lc(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function Je(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && Lc(e) && t && e.select();
  }
}
var Kr = Hc();
function Hc() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && (n == null || n.pause()), e = Qr(e, t), e.unshift(t);
    },
    remove(t) {
      var n;
      e = Qr(e, t), (n = e[0]) == null || n.resume();
    }
  };
}
function Qr(e, t) {
  const n = [...e], r = n.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
function zc(e) {
  return e.filter((t) => t.tagName !== "A");
}
var Ue = globalThis != null && globalThis.document ? g.useLayoutEffect : () => {
}, Vc = g[" useId ".trim().toString()] || (() => {
}), jc = 0;
function ln(e) {
  const [t, n] = g.useState(Vc());
  return Ue(() => {
    n((r) => r ?? String(jc++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
const Gc = ["top", "right", "bottom", "left"], tt = Math.min, be = Math.max, rn = Math.round, Ut = Math.floor, Ye = (e) => ({
  x: e,
  y: e
}), Uc = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, qc = {
  start: "end",
  end: "start"
};
function Zn(e, t, n) {
  return be(e, tt(t, n));
}
function qe(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Xe(e) {
  return e.split("-")[0];
}
function Ot(e) {
  return e.split("-")[1];
}
function ir(e) {
  return e === "x" ? "y" : "x";
}
function cr(e) {
  return e === "y" ? "height" : "width";
}
const Xc = /* @__PURE__ */ new Set(["top", "bottom"]);
function Ie(e) {
  return Xc.has(Xe(e)) ? "y" : "x";
}
function lr(e) {
  return ir(Ie(e));
}
function Kc(e, t, n) {
  n === void 0 && (n = !1);
  const r = Ot(e), o = lr(e), a = cr(o);
  let s = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[a] > t.floating[a] && (s = on(s)), [s, on(s)];
}
function Qc(e) {
  const t = on(e);
  return [Jn(e), t, Jn(t)];
}
function Jn(e) {
  return e.replace(/start|end/g, (t) => qc[t]);
}
const Zr = ["left", "right"], Jr = ["right", "left"], Zc = ["top", "bottom"], Jc = ["bottom", "top"];
function el(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? Jr : Zr : t ? Zr : Jr;
    case "left":
    case "right":
      return t ? Zc : Jc;
    default:
      return [];
  }
}
function tl(e, t, n, r) {
  const o = Ot(e);
  let a = el(Xe(e), n === "start", r);
  return o && (a = a.map((s) => s + "-" + o), t && (a = a.concat(a.map(Jn)))), a;
}
function on(e) {
  return e.replace(/left|right|bottom|top/g, (t) => Uc[t]);
}
function nl(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function jo(e) {
  return typeof e != "number" ? nl(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function an(e) {
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
function eo(e, t, n) {
  let {
    reference: r,
    floating: o
  } = e;
  const a = Ie(t), s = lr(t), i = cr(s), c = Xe(t), l = a === "y", u = r.x + r.width / 2 - o.width / 2, d = r.y + r.height / 2 - o.height / 2, f = r[i] / 2 - o[i] / 2;
  let h;
  switch (c) {
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
  switch (Ot(t)) {
    case "start":
      h[s] -= f * (n && l ? -1 : 1);
      break;
    case "end":
      h[s] += f * (n && l ? -1 : 1);
      break;
  }
  return h;
}
const rl = async (e, t, n) => {
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
  } = eo(l, r, c), f = r, h = {}, v = 0;
  for (let m = 0; m < i.length; m++) {
    const {
      name: p,
      fn: b
    } = i[m], {
      x: w,
      y,
      data: k,
      reset: M
    } = await b({
      x: u,
      y: d,
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
    u = w ?? u, d = y ?? d, h = {
      ...h,
      [p]: {
        ...h[p],
        ...k
      }
    }, M && v <= 50 && (v++, typeof M == "object" && (M.placement && (f = M.placement), M.rects && (l = M.rects === !0 ? await s.getElementRects({
      reference: e,
      floating: t,
      strategy: o
    }) : M.rects), {
      x: u,
      y: d
    } = eo(l, f, c)), m = -1);
  }
  return {
    x: u,
    y: d,
    placement: f,
    strategy: o,
    middlewareData: h
  };
};
async function _t(e, t) {
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
    padding: h = 0
  } = qe(t, e), v = jo(h), p = i[f ? d === "floating" ? "reference" : "floating" : d], b = an(await a.getClippingRect({
    element: (n = await (a.isElement == null ? void 0 : a.isElement(p))) == null || n ? p : p.contextElement || await (a.getDocumentElement == null ? void 0 : a.getDocumentElement(i.floating)),
    boundary: l,
    rootBoundary: u,
    strategy: c
  })), w = d === "floating" ? {
    x: r,
    y: o,
    width: s.floating.width,
    height: s.floating.height
  } : s.reference, y = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(i.floating)), k = await (a.isElement == null ? void 0 : a.isElement(y)) ? await (a.getScale == null ? void 0 : a.getScale(y)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, M = an(a.convertOffsetParentRelativeRectToViewportRelativeRect ? await a.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: i,
    rect: w,
    offsetParent: y,
    strategy: c
  }) : w);
  return {
    top: (b.top - M.top + v.top) / k.y,
    bottom: (M.bottom - b.bottom + v.bottom) / k.y,
    left: (b.left - M.left + v.left) / k.x,
    right: (M.right - b.right + v.right) / k.x
  };
}
const ol = (e) => ({
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
    } = qe(e, t) || {};
    if (l == null)
      return {};
    const d = jo(u), f = {
      x: n,
      y: r
    }, h = lr(o), v = cr(h), m = await s.getDimensions(l), p = h === "y", b = p ? "top" : "left", w = p ? "bottom" : "right", y = p ? "clientHeight" : "clientWidth", k = a.reference[v] + a.reference[h] - f[h] - a.floating[v], M = f[h] - a.reference[h], x = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(l));
    let S = x ? x[y] : 0;
    (!S || !await (s.isElement == null ? void 0 : s.isElement(x))) && (S = i.floating[y] || a.floating[v]);
    const R = k / 2 - M / 2, $ = S / 2 - m[v] / 2 - 1, T = tt(d[b], $), _ = tt(d[w], $), F = T, j = S - m[v] - _, O = S / 2 - m[v] / 2 + R, E = Zn(F, O, j), D = !c.arrow && Ot(o) != null && O !== E && a.reference[v] / 2 - (O < F ? T : _) - m[v] / 2 < 0, A = D ? O < F ? O - F : O - j : 0;
    return {
      [h]: f[h] + A,
      data: {
        [h]: E,
        centerOffset: O - E - A,
        ...D && {
          alignmentOffset: A
        }
      },
      reset: D
    };
  }
}), al = function(e) {
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
        fallbackStrategy: h = "bestFit",
        fallbackAxisSideDirection: v = "none",
        flipAlignment: m = !0,
        ...p
      } = qe(e, t);
      if ((n = a.arrow) != null && n.alignmentOffset)
        return {};
      const b = Xe(o), w = Ie(i), y = Xe(i) === i, k = await (c.isRTL == null ? void 0 : c.isRTL(l.floating)), M = f || (y || !m ? [on(i)] : Qc(i)), x = v !== "none";
      !f && x && M.push(...tl(i, m, v, k));
      const S = [i, ...M], R = await _t(t, p), $ = [];
      let T = ((r = a.flip) == null ? void 0 : r.overflows) || [];
      if (u && $.push(R[b]), d) {
        const O = Kc(o, s, k);
        $.push(R[O[0]], R[O[1]]);
      }
      if (T = [...T, {
        placement: o,
        overflows: $
      }], !$.every((O) => O <= 0)) {
        var _, F;
        const O = (((_ = a.flip) == null ? void 0 : _.index) || 0) + 1, E = S[O];
        if (E && (!(d === "alignment" ? w !== Ie(E) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        T.every((N) => Ie(N.placement) === w ? N.overflows[0] > 0 : !0)))
          return {
            data: {
              index: O,
              overflows: T
            },
            reset: {
              placement: E
            }
          };
        let D = (F = T.filter((A) => A.overflows[0] <= 0).sort((A, N) => A.overflows[1] - N.overflows[1])[0]) == null ? void 0 : F.placement;
        if (!D)
          switch (h) {
            case "bestFit": {
              var j;
              const A = (j = T.filter((N) => {
                if (x) {
                  const W = Ie(N.placement);
                  return W === w || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  W === "y";
                }
                return !0;
              }).map((N) => [N.placement, N.overflows.filter((W) => W > 0).reduce((W, I) => W + I, 0)]).sort((N, W) => N[1] - W[1])[0]) == null ? void 0 : j[0];
              A && (D = A);
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
function to(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function no(e) {
  return Gc.some((t) => e[t] >= 0);
}
const sl = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n
      } = t, {
        strategy: r = "referenceHidden",
        ...o
      } = qe(e, t);
      switch (r) {
        case "referenceHidden": {
          const a = await _t(t, {
            ...o,
            elementContext: "reference"
          }), s = to(a, n.reference);
          return {
            data: {
              referenceHiddenOffsets: s,
              referenceHidden: no(s)
            }
          };
        }
        case "escaped": {
          const a = await _t(t, {
            ...o,
            altBoundary: !0
          }), s = to(a, n.floating);
          return {
            data: {
              escapedOffsets: s,
              escaped: no(s)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, Go = /* @__PURE__ */ new Set(["left", "top"]);
async function il(e, t) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), s = Xe(n), i = Ot(n), c = Ie(n) === "y", l = Go.has(s) ? -1 : 1, u = a && c ? -1 : 1, d = qe(t, e);
  let {
    mainAxis: f,
    crossAxis: h,
    alignmentAxis: v
  } = typeof d == "number" ? {
    mainAxis: d,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: d.mainAxis || 0,
    crossAxis: d.crossAxis || 0,
    alignmentAxis: d.alignmentAxis
  };
  return i && typeof v == "number" && (h = i === "end" ? v * -1 : v), c ? {
    x: h * u,
    y: f * l
  } : {
    x: f * l,
    y: h * u
  };
}
const cl = function(e) {
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
      } = t, c = await il(t, e);
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
}, ll = function(e) {
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
          fn: (p) => {
            let {
              x: b,
              y: w
            } = p;
            return {
              x: b,
              y: w
            };
          }
        },
        ...c
      } = qe(e, t), l = {
        x: n,
        y: r
      }, u = await _t(t, c), d = Ie(Xe(o)), f = ir(d);
      let h = l[f], v = l[d];
      if (a) {
        const p = f === "y" ? "top" : "left", b = f === "y" ? "bottom" : "right", w = h + u[p], y = h - u[b];
        h = Zn(w, h, y);
      }
      if (s) {
        const p = d === "y" ? "top" : "left", b = d === "y" ? "bottom" : "right", w = v + u[p], y = v - u[b];
        v = Zn(w, v, y);
      }
      const m = i.fn({
        ...t,
        [f]: h,
        [d]: v
      });
      return {
        ...m,
        data: {
          x: m.x - n,
          y: m.y - r,
          enabled: {
            [f]: a,
            [d]: s
          }
        }
      };
    }
  };
}, ul = function(e) {
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
      } = qe(e, t), u = {
        x: n,
        y: r
      }, d = Ie(o), f = ir(d);
      let h = u[f], v = u[d];
      const m = qe(i, t), p = typeof m == "number" ? {
        mainAxis: m,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...m
      };
      if (c) {
        const y = f === "y" ? "height" : "width", k = a.reference[f] - a.floating[y] + p.mainAxis, M = a.reference[f] + a.reference[y] - p.mainAxis;
        h < k ? h = k : h > M && (h = M);
      }
      if (l) {
        var b, w;
        const y = f === "y" ? "width" : "height", k = Go.has(Xe(o)), M = a.reference[d] - a.floating[y] + (k && ((b = s.offset) == null ? void 0 : b[d]) || 0) + (k ? 0 : p.crossAxis), x = a.reference[d] + a.reference[y] + (k ? 0 : ((w = s.offset) == null ? void 0 : w[d]) || 0) - (k ? p.crossAxis : 0);
        v < M ? v = M : v > x && (v = x);
      }
      return {
        [f]: h,
        [d]: v
      };
    }
  };
}, dl = function(e) {
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
      } = qe(e, t), u = await _t(t, l), d = Xe(o), f = Ot(o), h = Ie(o) === "y", {
        width: v,
        height: m
      } = a.floating;
      let p, b;
      d === "top" || d === "bottom" ? (p = d, b = f === (await (s.isRTL == null ? void 0 : s.isRTL(i.floating)) ? "start" : "end") ? "left" : "right") : (b = d, p = f === "end" ? "top" : "bottom");
      const w = m - u.top - u.bottom, y = v - u.left - u.right, k = tt(m - u[p], w), M = tt(v - u[b], y), x = !t.middlewareData.shift;
      let S = k, R = M;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (R = y), (r = t.middlewareData.shift) != null && r.enabled.y && (S = w), x && !f) {
        const T = be(u.left, 0), _ = be(u.right, 0), F = be(u.top, 0), j = be(u.bottom, 0);
        h ? R = v - 2 * (T !== 0 || _ !== 0 ? T + _ : be(u.left, u.right)) : S = m - 2 * (F !== 0 || j !== 0 ? F + j : be(u.top, u.bottom));
      }
      await c({
        ...t,
        availableWidth: R,
        availableHeight: S
      });
      const $ = await s.getDimensions(i.floating);
      return v !== $.width || m !== $.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function un() {
  return typeof window < "u";
}
function Dt(e) {
  return Uo(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function ye(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function He(e) {
  var t;
  return (t = (Uo(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Uo(e) {
  return un() ? e instanceof Node || e instanceof ye(e).Node : !1;
}
function Oe(e) {
  return un() ? e instanceof Element || e instanceof ye(e).Element : !1;
}
function Be(e) {
  return un() ? e instanceof HTMLElement || e instanceof ye(e).HTMLElement : !1;
}
function ro(e) {
  return !un() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof ye(e).ShadowRoot;
}
const fl = /* @__PURE__ */ new Set(["inline", "contents"]);
function Yt(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: o
  } = De(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !fl.has(o);
}
const hl = /* @__PURE__ */ new Set(["table", "td", "th"]);
function ml(e) {
  return hl.has(Dt(e));
}
const pl = [":popover-open", ":modal"];
function dn(e) {
  return pl.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const gl = ["transform", "translate", "scale", "rotate", "perspective"], bl = ["transform", "translate", "scale", "rotate", "perspective", "filter"], vl = ["paint", "layout", "strict", "content"];
function ur(e) {
  const t = dr(), n = Oe(e) ? De(e) : e;
  return gl.some((r) => n[r] ? n[r] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || bl.some((r) => (n.willChange || "").includes(r)) || vl.some((r) => (n.contain || "").includes(r));
}
function yl(e) {
  let t = nt(e);
  for (; Be(t) && !Ct(t); ) {
    if (ur(t))
      return t;
    if (dn(t))
      return null;
    t = nt(t);
  }
  return null;
}
function dr() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const wl = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function Ct(e) {
  return wl.has(Dt(e));
}
function De(e) {
  return ye(e).getComputedStyle(e);
}
function fn(e) {
  return Oe(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function nt(e) {
  if (Dt(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    ro(e) && e.host || // Fallback.
    He(e)
  );
  return ro(t) ? t.host : t;
}
function qo(e) {
  const t = nt(e);
  return Ct(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : Be(t) && Yt(t) ? t : qo(t);
}
function It(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = qo(e), a = o === ((r = e.ownerDocument) == null ? void 0 : r.body), s = ye(o);
  if (a) {
    const i = er(s);
    return t.concat(s, s.visualViewport || [], Yt(o) ? o : [], i && n ? It(i) : []);
  }
  return t.concat(o, It(o, [], n));
}
function er(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function Xo(e) {
  const t = De(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const o = Be(e), a = o ? e.offsetWidth : n, s = o ? e.offsetHeight : r, i = rn(n) !== a || rn(r) !== s;
  return i && (n = a, r = s), {
    width: n,
    height: r,
    $: i
  };
}
function fr(e) {
  return Oe(e) ? e : e.contextElement;
}
function yt(e) {
  const t = fr(e);
  if (!Be(t))
    return Ye(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: o,
    $: a
  } = Xo(t);
  let s = (a ? rn(n.width) : n.width) / r, i = (a ? rn(n.height) : n.height) / o;
  return (!s || !Number.isFinite(s)) && (s = 1), (!i || !Number.isFinite(i)) && (i = 1), {
    x: s,
    y: i
  };
}
const xl = /* @__PURE__ */ Ye(0);
function Ko(e) {
  const t = ye(e);
  return !dr() || !t.visualViewport ? xl : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function Cl(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== ye(e) ? !1 : t;
}
function lt(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), a = fr(e);
  let s = Ye(1);
  t && (r ? Oe(r) && (s = yt(r)) : s = yt(e));
  const i = Cl(a, n, r) ? Ko(a) : Ye(0);
  let c = (o.left + i.x) / s.x, l = (o.top + i.y) / s.y, u = o.width / s.x, d = o.height / s.y;
  if (a) {
    const f = ye(a), h = r && Oe(r) ? ye(r) : r;
    let v = f, m = er(v);
    for (; m && r && h !== v; ) {
      const p = yt(m), b = m.getBoundingClientRect(), w = De(m), y = b.left + (m.clientLeft + parseFloat(w.paddingLeft)) * p.x, k = b.top + (m.clientTop + parseFloat(w.paddingTop)) * p.y;
      c *= p.x, l *= p.y, u *= p.x, d *= p.y, c += y, l += k, v = ye(m), m = er(v);
    }
  }
  return an({
    width: u,
    height: d,
    x: c,
    y: l
  });
}
function hn(e, t) {
  const n = fn(e).scrollLeft;
  return t ? t.left + n : lt(He(e)).left + n;
}
function Qo(e, t) {
  const n = e.getBoundingClientRect(), r = n.left + t.scrollLeft - hn(e, n), o = n.top + t.scrollTop;
  return {
    x: r,
    y: o
  };
}
function kl(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: r,
    strategy: o
  } = e;
  const a = o === "fixed", s = He(r), i = t ? dn(t.floating) : !1;
  if (r === s || i && a)
    return n;
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = Ye(1);
  const u = Ye(0), d = Be(r);
  if ((d || !d && !a) && ((Dt(r) !== "body" || Yt(s)) && (c = fn(r)), Be(r))) {
    const h = lt(r);
    l = yt(r), u.x = h.x + r.clientLeft, u.y = h.y + r.clientTop;
  }
  const f = s && !d && !a ? Qo(s, c) : Ye(0);
  return {
    width: n.width * l.x,
    height: n.height * l.y,
    x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
    y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
  };
}
function Ml(e) {
  return Array.from(e.getClientRects());
}
function Sl(e) {
  const t = He(e), n = fn(e), r = e.ownerDocument.body, o = be(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), a = be(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let s = -n.scrollLeft + hn(e);
  const i = -n.scrollTop;
  return De(r).direction === "rtl" && (s += be(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: a,
    x: s,
    y: i
  };
}
const oo = 25;
function Ol(e, t) {
  const n = ye(e), r = He(e), o = n.visualViewport;
  let a = r.clientWidth, s = r.clientHeight, i = 0, c = 0;
  if (o) {
    a = o.width, s = o.height;
    const u = dr();
    (!u || u && t === "fixed") && (i = o.offsetLeft, c = o.offsetTop);
  }
  const l = hn(r);
  if (l <= 0) {
    const u = r.ownerDocument, d = u.body, f = getComputedStyle(d), h = u.compatMode === "CSS1Compat" && parseFloat(f.marginLeft) + parseFloat(f.marginRight) || 0, v = Math.abs(r.clientWidth - d.clientWidth - h);
    v <= oo && (a -= v);
  } else l <= oo && (a += l);
  return {
    width: a,
    height: s,
    x: i,
    y: c
  };
}
const Dl = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function Nl(e, t) {
  const n = lt(e, !0, t === "fixed"), r = n.top + e.clientTop, o = n.left + e.clientLeft, a = Be(e) ? yt(e) : Ye(1), s = e.clientWidth * a.x, i = e.clientHeight * a.y, c = o * a.x, l = r * a.y;
  return {
    width: s,
    height: i,
    x: c,
    y: l
  };
}
function ao(e, t, n) {
  let r;
  if (t === "viewport")
    r = Ol(e, n);
  else if (t === "document")
    r = Sl(He(e));
  else if (Oe(t))
    r = Nl(t, n);
  else {
    const o = Ko(e);
    r = {
      x: t.x - o.x,
      y: t.y - o.y,
      width: t.width,
      height: t.height
    };
  }
  return an(r);
}
function Zo(e, t) {
  const n = nt(e);
  return n === t || !Oe(n) || Ct(n) ? !1 : De(n).position === "fixed" || Zo(n, t);
}
function Pl(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = It(e, [], !1).filter((i) => Oe(i) && Dt(i) !== "body"), o = null;
  const a = De(e).position === "fixed";
  let s = a ? nt(e) : e;
  for (; Oe(s) && !Ct(s); ) {
    const i = De(s), c = ur(s);
    !c && i.position === "fixed" && (o = null), (a ? !c && !o : !c && i.position === "static" && !!o && Dl.has(o.position) || Yt(s) && !c && Zo(e, s)) ? r = r.filter((u) => u !== s) : o = i, s = nt(s);
  }
  return t.set(e, r), r;
}
function El(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = e;
  const s = [...n === "clippingAncestors" ? dn(t) ? [] : Pl(t, this._c) : [].concat(n), r], i = s[0], c = s.reduce((l, u) => {
    const d = ao(t, u, o);
    return l.top = be(d.top, l.top), l.right = tt(d.right, l.right), l.bottom = tt(d.bottom, l.bottom), l.left = be(d.left, l.left), l;
  }, ao(t, i, o));
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top
  };
}
function Al(e) {
  const {
    width: t,
    height: n
  } = Xo(e);
  return {
    width: t,
    height: n
  };
}
function Rl(e, t, n) {
  const r = Be(t), o = He(t), a = n === "fixed", s = lt(e, !0, a, t);
  let i = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = Ye(0);
  function l() {
    c.x = hn(o);
  }
  if (r || !r && !a)
    if ((Dt(t) !== "body" || Yt(o)) && (i = fn(t)), r) {
      const h = lt(t, !0, a, t);
      c.x = h.x + t.clientLeft, c.y = h.y + t.clientTop;
    } else o && l();
  a && !r && o && l();
  const u = o && !r && !a ? Qo(o, i) : Ye(0), d = s.left + i.scrollLeft - c.x - u.x, f = s.top + i.scrollTop - c.y - u.y;
  return {
    x: d,
    y: f,
    width: s.width,
    height: s.height
  };
}
function $n(e) {
  return De(e).position === "static";
}
function so(e, t) {
  if (!Be(e) || De(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return He(e) === n && (n = n.ownerDocument.body), n;
}
function Jo(e, t) {
  const n = ye(e);
  if (dn(e))
    return n;
  if (!Be(e)) {
    let o = nt(e);
    for (; o && !Ct(o); ) {
      if (Oe(o) && !$n(o))
        return o;
      o = nt(o);
    }
    return n;
  }
  let r = so(e, t);
  for (; r && ml(r) && $n(r); )
    r = so(r, t);
  return r && Ct(r) && $n(r) && !ur(r) ? n : r || yl(e) || n;
}
const Tl = async function(e) {
  const t = this.getOffsetParent || Jo, n = this.getDimensions, r = await n(e.floating);
  return {
    reference: Rl(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function Wl(e) {
  return De(e).direction === "rtl";
}
const _l = {
  convertOffsetParentRelativeRectToViewportRelativeRect: kl,
  getDocumentElement: He,
  getClippingRect: El,
  getOffsetParent: Jo,
  getElementRects: Tl,
  getClientRects: Ml,
  getDimensions: Al,
  getScale: yt,
  isElement: Oe,
  isRTL: Wl
};
function ea(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Il(e, t) {
  let n = null, r;
  const o = He(e);
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
      height: h
    } = l;
    if (i || t(), !f || !h)
      return;
    const v = Ut(d), m = Ut(o.clientWidth - (u + f)), p = Ut(o.clientHeight - (d + h)), b = Ut(u), y = {
      rootMargin: -v + "px " + -m + "px " + -p + "px " + -b + "px",
      threshold: be(0, tt(1, c)) || 1
    };
    let k = !0;
    function M(x) {
      const S = x[0].intersectionRatio;
      if (S !== c) {
        if (!k)
          return s();
        S ? s(!1, S) : r = setTimeout(() => {
          s(!1, 1e-7);
        }, 1e3);
      }
      S === 1 && !ea(l, e.getBoundingClientRect()) && s(), k = !1;
    }
    try {
      n = new IntersectionObserver(M, {
        ...y,
        // Handle <iframe>s
        root: o.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(M, y);
    }
    n.observe(e);
  }
  return s(!0), a;
}
function $l(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: a = !0,
    elementResize: s = typeof ResizeObserver == "function",
    layoutShift: i = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = r, l = fr(e), u = o || a ? [...l ? It(l) : [], ...It(t)] : [];
  u.forEach((b) => {
    o && b.addEventListener("scroll", n, {
      passive: !0
    }), a && b.addEventListener("resize", n);
  });
  const d = l && i ? Il(l, n) : null;
  let f = -1, h = null;
  s && (h = new ResizeObserver((b) => {
    let [w] = b;
    w && w.target === l && h && (h.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
      var y;
      (y = h) == null || y.observe(t);
    })), n();
  }), l && !c && h.observe(l), h.observe(t));
  let v, m = c ? lt(e) : null;
  c && p();
  function p() {
    const b = lt(e);
    m && !ea(m, b) && n(), m = b, v = requestAnimationFrame(p);
  }
  return n(), () => {
    var b;
    u.forEach((w) => {
      o && w.removeEventListener("scroll", n), a && w.removeEventListener("resize", n);
    }), d == null || d(), (b = h) == null || b.disconnect(), h = null, c && cancelAnimationFrame(v);
  };
}
const Fl = cl, Yl = ll, Bl = al, Ll = dl, Hl = sl, io = ol, zl = ul, Vl = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: _l,
    ...n
  }, a = {
    ...o.platform,
    _c: r
  };
  return rl(e, t, {
    ...o,
    platform: a
  });
};
var jl = typeof document < "u", Gl = function() {
}, Jt = jl ? Eo : Gl;
function sn(e, t) {
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
        if (!sn(e[r], t[r]))
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
      if (!(a === "_owner" && e.$$typeof) && !sn(e[a], t[a]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function ta(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function co(e, t) {
  const n = ta(e);
  return Math.round(t * n) / n;
}
function Fn(e) {
  const t = g.useRef(e);
  return Jt(() => {
    t.current = e;
  }), t;
}
function Ul(e) {
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
  } = e, [u, d] = g.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [f, h] = g.useState(r);
  sn(f, r) || h(r);
  const [v, m] = g.useState(null), [p, b] = g.useState(null), w = g.useCallback((N) => {
    N !== x.current && (x.current = N, m(N));
  }, []), y = g.useCallback((N) => {
    N !== S.current && (S.current = N, b(N));
  }, []), k = a || v, M = s || p, x = g.useRef(null), S = g.useRef(null), R = g.useRef(u), $ = c != null, T = Fn(c), _ = Fn(o), F = Fn(l), j = g.useCallback(() => {
    if (!x.current || !S.current)
      return;
    const N = {
      placement: t,
      strategy: n,
      middleware: f
    };
    _.current && (N.platform = _.current), Vl(x.current, S.current, N).then((W) => {
      const I = {
        ...W,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: F.current !== !1
      };
      O.current && !sn(R.current, I) && (R.current = I, Ao.flushSync(() => {
        d(I);
      }));
    });
  }, [f, t, n, _, F]);
  Jt(() => {
    l === !1 && R.current.isPositioned && (R.current.isPositioned = !1, d((N) => ({
      ...N,
      isPositioned: !1
    })));
  }, [l]);
  const O = g.useRef(!1);
  Jt(() => (O.current = !0, () => {
    O.current = !1;
  }), []), Jt(() => {
    if (k && (x.current = k), M && (S.current = M), k && M) {
      if (T.current)
        return T.current(k, M, j);
      j();
    }
  }, [k, M, j, T, $]);
  const E = g.useMemo(() => ({
    reference: x,
    floating: S,
    setReference: w,
    setFloating: y
  }), [w, y]), D = g.useMemo(() => ({
    reference: k,
    floating: M
  }), [k, M]), A = g.useMemo(() => {
    const N = {
      position: n,
      left: 0,
      top: 0
    };
    if (!D.floating)
      return N;
    const W = co(D.floating, u.x), I = co(D.floating, u.y);
    return i ? {
      ...N,
      transform: "translate(" + W + "px, " + I + "px)",
      ...ta(D.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: W,
      top: I
    };
  }, [n, i, D.floating, u.x, u.y]);
  return g.useMemo(() => ({
    ...u,
    update: j,
    refs: E,
    elements: D,
    floatingStyles: A
  }), [u, j, E, D, A]);
}
const ql = (e) => {
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
      return r && t(r) ? r.current != null ? io({
        element: r.current,
        padding: o
      }).fn(n) : {} : r ? io({
        element: r,
        padding: o
      }).fn(n) : {};
    }
  };
}, Xl = (e, t) => ({
  ...Fl(e),
  options: [e, t]
}), Kl = (e, t) => ({
  ...Yl(e),
  options: [e, t]
}), Ql = (e, t) => ({
  ...zl(e),
  options: [e, t]
}), Zl = (e, t) => ({
  ...Bl(e),
  options: [e, t]
}), Jl = (e, t) => ({
  ...Ll(e),
  options: [e, t]
}), eu = (e, t) => ({
  ...Hl(e),
  options: [e, t]
}), tu = (e, t) => ({
  ...ql(e),
  options: [e, t]
});
var nu = "Arrow", na = g.forwardRef((e, t) => {
  const { children: n, width: r = 10, height: o = 5, ...a } = e;
  return /* @__PURE__ */ C(
    te.svg,
    {
      ...a,
      ref: t,
      width: r,
      height: o,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? n : /* @__PURE__ */ C("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
na.displayName = nu;
var ru = na;
function mn(e) {
  const [t, n] = g.useState(void 0);
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
var hr = "Popper", [ra, oa] = Le(hr), [ou, aa] = ra(hr), sa = (e) => {
  const { __scopePopper: t, children: n } = e, [r, o] = g.useState(null);
  return /* @__PURE__ */ C(ou, { scope: t, anchor: r, onAnchorChange: o, children: n });
};
sa.displayName = hr;
var ia = "PopperAnchor", ca = g.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: r, ...o } = e, a = aa(ia, n), s = g.useRef(null), i = ie(t, s), c = g.useRef(null);
    return g.useEffect(() => {
      const l = c.current;
      c.current = (r == null ? void 0 : r.current) || s.current, l !== c.current && a.onAnchorChange(c.current);
    }), r ? null : /* @__PURE__ */ C(te.div, { ...o, ref: i });
  }
);
ca.displayName = ia;
var mr = "PopperContent", [au, su] = ra(mr), la = g.forwardRef(
  (e, t) => {
    var fe, Ee, he, oe, me, Ae;
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
      updatePositionStrategy: h = "optimized",
      onPlaced: v,
      ...m
    } = e, p = aa(mr, n), [b, w] = g.useState(null), y = ie(t, (we) => w(we)), [k, M] = g.useState(null), x = mn(k), S = (x == null ? void 0 : x.width) ?? 0, R = (x == null ? void 0 : x.height) ?? 0, $ = r + (a !== "center" ? "-" + a : ""), T = typeof u == "number" ? u : { top: 0, right: 0, bottom: 0, left: 0, ...u }, _ = Array.isArray(l) ? l : [l], F = _.length > 0, j = {
      padding: T,
      boundary: _.filter(cu),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: F
    }, { refs: O, floatingStyles: E, placement: D, isPositioned: A, middlewareData: N } = Ul({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: $,
      whileElementsMounted: (...we) => $l(...we, {
        animationFrame: h === "always"
      }),
      elements: {
        reference: p.anchor
      },
      middleware: [
        Xl({ mainAxis: o + R, alignmentAxis: s }),
        c && Kl({
          mainAxis: !0,
          crossAxis: !1,
          limiter: d === "partial" ? Ql() : void 0,
          ...j
        }),
        c && Zl({ ...j }),
        Jl({
          ...j,
          apply: ({ elements: we, rects: jt, availableWidth: Gt, availableHeight: On }) => {
            const { width: Dn, height: Nn } = jt.reference, ut = we.floating.style;
            ut.setProperty("--radix-popper-available-width", `${Gt}px`), ut.setProperty("--radix-popper-available-height", `${On}px`), ut.setProperty("--radix-popper-anchor-width", `${Dn}px`), ut.setProperty("--radix-popper-anchor-height", `${Nn}px`);
          }
        }),
        k && tu({ element: k, padding: i }),
        lu({ arrowWidth: S, arrowHeight: R }),
        f && eu({ strategy: "referenceHidden", ...j })
      ]
    }), [W, I] = fa(D), B = ct(v);
    Ue(() => {
      A && (B == null || B());
    }, [A, B]);
    const Z = (fe = N.arrow) == null ? void 0 : fe.x, J = (Ee = N.arrow) == null ? void 0 : Ee.y, ne = ((he = N.arrow) == null ? void 0 : he.centerOffset) !== 0, [le, ke] = g.useState();
    return Ue(() => {
      b && ke(window.getComputedStyle(b).zIndex);
    }, [b]), /* @__PURE__ */ C(
      "div",
      {
        ref: O.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...E,
          transform: A ? E.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: le,
          "--radix-popper-transform-origin": [
            (oe = N.transformOrigin) == null ? void 0 : oe.x,
            (me = N.transformOrigin) == null ? void 0 : me.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...((Ae = N.hide) == null ? void 0 : Ae.referenceHidden) && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: e.dir,
        children: /* @__PURE__ */ C(
          au,
          {
            scope: n,
            placedSide: W,
            onArrowChange: M,
            arrowX: Z,
            arrowY: J,
            shouldHideArrow: ne,
            children: /* @__PURE__ */ C(
              te.div,
              {
                "data-side": W,
                "data-align": I,
                ...m,
                ref: y,
                style: {
                  ...m.style,
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
la.displayName = mr;
var ua = "PopperArrow", iu = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, da = g.forwardRef(function(t, n) {
  const { __scopePopper: r, ...o } = t, a = su(ua, r), s = iu[a.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ C(
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
        children: /* @__PURE__ */ C(
          ru,
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
da.displayName = ua;
function cu(e) {
  return e !== null;
}
var lu = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    var p, b, w;
    const { placement: n, rects: r, middlewareData: o } = t, s = ((p = o.arrow) == null ? void 0 : p.centerOffset) !== 0, i = s ? 0 : e.arrowWidth, c = s ? 0 : e.arrowHeight, [l, u] = fa(n), d = { start: "0%", center: "50%", end: "100%" }[u], f = (((b = o.arrow) == null ? void 0 : b.x) ?? 0) + i / 2, h = (((w = o.arrow) == null ? void 0 : w.y) ?? 0) + c / 2;
    let v = "", m = "";
    return l === "bottom" ? (v = s ? d : `${f}px`, m = `${-c}px`) : l === "top" ? (v = s ? d : `${f}px`, m = `${r.floating.height + c}px`) : l === "right" ? (v = `${-c}px`, m = s ? d : `${h}px`) : l === "left" && (v = `${r.floating.width + c}px`, m = s ? d : `${h}px`), { data: { x: v, y: m } };
  }
});
function fa(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var uu = sa, ha = ca, du = la, fu = da, hu = "Portal", ma = g.forwardRef((e, t) => {
  var i;
  const { container: n, ...r } = e, [o, a] = g.useState(!1);
  Ue(() => a(!0), []);
  const s = n || o && ((i = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : i.body);
  return s ? Ti.createPortal(/* @__PURE__ */ C(te.div, { ...r, ref: t }), s) : null;
});
ma.displayName = hu;
function mu(e, t) {
  return g.useReducer((n, r) => t[n][r] ?? n, e);
}
var Nt = (e) => {
  const { present: t, children: n } = e, r = pu(t), o = typeof n == "function" ? n({ present: r.isPresent }) : g.Children.only(n), a = ie(r.ref, gu(o));
  return typeof n == "function" || r.isPresent ? g.cloneElement(o, { ref: a }) : null;
};
Nt.displayName = "Presence";
function pu(e) {
  const [t, n] = g.useState(), r = g.useRef(null), o = g.useRef(e), a = g.useRef("none"), s = e ? "mounted" : "unmounted", [i, c] = mu(s, {
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
  return g.useEffect(() => {
    const l = qt(r.current);
    a.current = i === "mounted" ? l : "none";
  }, [i]), Ue(() => {
    const l = r.current, u = o.current;
    if (u !== e) {
      const f = a.current, h = qt(l);
      e ? c("MOUNT") : h === "none" || (l == null ? void 0 : l.display) === "none" ? c("UNMOUNT") : c(u && f !== h ? "ANIMATION_OUT" : "UNMOUNT"), o.current = e;
    }
  }, [e, c]), Ue(() => {
    if (t) {
      let l;
      const u = t.ownerDocument.defaultView ?? window, d = (h) => {
        const m = qt(r.current).includes(CSS.escape(h.animationName));
        if (h.target === t && m && (c("ANIMATION_END"), !o.current)) {
          const p = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", l = u.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = p);
          });
        }
      }, f = (h) => {
        h.target === t && (a.current = qt(r.current));
      };
      return t.addEventListener("animationstart", f), t.addEventListener("animationcancel", d), t.addEventListener("animationend", d), () => {
        u.clearTimeout(l), t.removeEventListener("animationstart", f), t.removeEventListener("animationcancel", d), t.removeEventListener("animationend", d);
      };
    } else
      c("ANIMATION_END");
  }, [t, c]), {
    isPresent: ["mounted", "unmountSuspended"].includes(i),
    ref: g.useCallback((l) => {
      r.current = l ? getComputedStyle(l) : null, n(l);
    }, [])
  };
}
function qt(e) {
  return (e == null ? void 0 : e.animationName) || "none";
}
function gu(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var bu = g[" useInsertionEffect ".trim().toString()] || Ue;
function ot({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: r
}) {
  const [o, a, s] = vu({
    defaultProp: t,
    onChange: n
  }), i = e !== void 0, c = i ? e : o;
  {
    const u = g.useRef(e !== void 0);
    g.useEffect(() => {
      const d = u.current;
      d !== i && console.warn(
        `${r} is changing from ${d ? "controlled" : "uncontrolled"} to ${i ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), u.current = i;
    }, [i, r]);
  }
  const l = g.useCallback(
    (u) => {
      var d;
      if (i) {
        const f = yu(u) ? u(e) : u;
        f !== e && ((d = s.current) == null || d.call(s, f));
      } else
        a(u);
    },
    [i, e, a, s]
  );
  return [c, l];
}
function vu({
  defaultProp: e,
  onChange: t
}) {
  const [n, r] = g.useState(e), o = g.useRef(n), a = g.useRef(t);
  return bu(() => {
    a.current = t;
  }, [t]), g.useEffect(() => {
    var s;
    o.current !== n && ((s = a.current) == null || s.call(a, n), o.current = n);
  }, [n, o]), [n, r, a];
}
function yu(e) {
  return typeof e == "function";
}
var wu = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, dt = /* @__PURE__ */ new WeakMap(), Xt = /* @__PURE__ */ new WeakMap(), Kt = {}, Yn = 0, pa = function(e) {
  return e && (e.host || pa(e.parentNode));
}, xu = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var r = pa(n);
    return r && e.contains(r) ? r : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, Cu = function(e, t, n, r) {
  var o = xu(t, Array.isArray(e) ? e : [e]);
  Kt[n] || (Kt[n] = /* @__PURE__ */ new WeakMap());
  var a = Kt[n], s = [], i = /* @__PURE__ */ new Set(), c = new Set(o), l = function(d) {
    !d || i.has(d) || (i.add(d), l(d.parentNode));
  };
  o.forEach(l);
  var u = function(d) {
    !d || c.has(d) || Array.prototype.forEach.call(d.children, function(f) {
      if (i.has(f))
        u(f);
      else
        try {
          var h = f.getAttribute(r), v = h !== null && h !== "false", m = (dt.get(f) || 0) + 1, p = (a.get(f) || 0) + 1;
          dt.set(f, m), a.set(f, p), s.push(f), m === 1 && v && Xt.set(f, !0), p === 1 && f.setAttribute(n, "true"), v || f.setAttribute(r, "true");
        } catch (b) {
          console.error("aria-hidden: cannot operate on ", f, b);
        }
    });
  };
  return u(t), i.clear(), Yn++, function() {
    s.forEach(function(d) {
      var f = dt.get(d) - 1, h = a.get(d) - 1;
      dt.set(d, f), a.set(d, h), f || (Xt.has(d) || d.removeAttribute(r), Xt.delete(d)), h || d.removeAttribute(n);
    }), Yn--, Yn || (dt = /* @__PURE__ */ new WeakMap(), dt = /* @__PURE__ */ new WeakMap(), Xt = /* @__PURE__ */ new WeakMap(), Kt = {});
  };
}, ku = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var r = Array.from(Array.isArray(e) ? e : [e]), o = wu(e);
  return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live], script"))), Cu(r, o, n, "aria-hidden")) : function() {
    return null;
  };
}, Te = function() {
  return Te = Object.assign || function(t) {
    for (var n, r = 1, o = arguments.length; r < o; r++) {
      n = arguments[r];
      for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (t[a] = n[a]);
    }
    return t;
  }, Te.apply(this, arguments);
};
function ga(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  return n;
}
function Mu(e, t, n) {
  if (n || arguments.length === 2) for (var r = 0, o = t.length, a; r < o; r++)
    (a || !(r in t)) && (a || (a = Array.prototype.slice.call(t, 0, r)), a[r] = t[r]);
  return e.concat(a || Array.prototype.slice.call(t));
}
var en = "right-scroll-bar-position", tn = "width-before-scroll-bar", Su = "with-scroll-bars-hidden", Ou = "--removed-body-scroll-bar-size";
function Bn(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function Du(e, t) {
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
var Nu = typeof window < "u" ? g.useLayoutEffect : g.useEffect, lo = /* @__PURE__ */ new WeakMap();
function Pu(e, t) {
  var n = Du(null, function(r) {
    return e.forEach(function(o) {
      return Bn(o, r);
    });
  });
  return Nu(function() {
    var r = lo.get(n);
    if (r) {
      var o = new Set(r), a = new Set(e), s = n.current;
      o.forEach(function(i) {
        a.has(i) || Bn(i, null);
      }), a.forEach(function(i) {
        o.has(i) || Bn(i, s);
      });
    }
    lo.set(n, e);
  }, [e]), n;
}
function Eu(e) {
  return e;
}
function Au(e, t) {
  t === void 0 && (t = Eu);
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
function Ru(e) {
  e === void 0 && (e = {});
  var t = Au(null);
  return t.options = Te({ async: !0, ssr: !1 }, e), t;
}
var ba = function(e) {
  var t = e.sideCar, n = ga(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = t.read();
  if (!r)
    throw new Error("Sidecar medium not found");
  return g.createElement(r, Te({}, n));
};
ba.isSideCarExport = !0;
function Tu(e, t) {
  return e.useMedium(t), ba;
}
var va = Ru(), Ln = function() {
}, pn = g.forwardRef(function(e, t) {
  var n = g.useRef(null), r = g.useState({
    onScrollCapture: Ln,
    onWheelCapture: Ln,
    onTouchMoveCapture: Ln
  }), o = r[0], a = r[1], s = e.forwardProps, i = e.children, c = e.className, l = e.removeScrollBar, u = e.enabled, d = e.shards, f = e.sideCar, h = e.noRelative, v = e.noIsolation, m = e.inert, p = e.allowPinchZoom, b = e.as, w = b === void 0 ? "div" : b, y = e.gapMode, k = ga(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), M = f, x = Pu([n, t]), S = Te(Te({}, k), o);
  return g.createElement(
    g.Fragment,
    null,
    u && g.createElement(M, { sideCar: va, removeScrollBar: l, shards: d, noRelative: h, noIsolation: v, inert: m, setCallbacks: a, allowPinchZoom: !!p, lockRef: n, gapMode: y }),
    s ? g.cloneElement(g.Children.only(i), Te(Te({}, S), { ref: x })) : g.createElement(w, Te({}, S, { className: c, ref: x }), i)
  );
});
pn.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
pn.classNames = {
  fullWidth: tn,
  zeroRight: en
};
var Wu = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function _u() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = Wu();
  return t && e.setAttribute("nonce", t), e;
}
function Iu(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function $u(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var Fu = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = _u()) && (Iu(t, n), $u(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, Yu = function() {
  var e = Fu();
  return function(t, n) {
    g.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, ya = function() {
  var e = Yu(), t = function(n) {
    var r = n.styles, o = n.dynamic;
    return e(r, o), null;
  };
  return t;
}, Bu = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, Hn = function(e) {
  return parseInt(e || "", 10) || 0;
}, Lu = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [Hn(n), Hn(r), Hn(o)];
}, Hu = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return Bu;
  var t = Lu(e), n = document.documentElement.clientWidth, r = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, r - n + t[2] - t[0])
  };
}, zu = ya(), wt = "data-scroll-locked", Vu = function(e, t, n, r) {
  var o = e.left, a = e.top, s = e.right, i = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(Su, ` {
   overflow: hidden `).concat(r, `;
   padding-right: `).concat(i, "px ").concat(r, `;
  }
  body[`).concat(wt, `] {
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
  
  .`).concat(en, ` {
    right: `).concat(i, "px ").concat(r, `;
  }
  
  .`).concat(tn, ` {
    margin-right: `).concat(i, "px ").concat(r, `;
  }
  
  .`).concat(en, " .").concat(en, ` {
    right: 0 `).concat(r, `;
  }
  
  .`).concat(tn, " .").concat(tn, ` {
    margin-right: 0 `).concat(r, `;
  }
  
  body[`).concat(wt, `] {
    `).concat(Ou, ": ").concat(i, `px;
  }
`);
}, uo = function() {
  var e = parseInt(document.body.getAttribute(wt) || "0", 10);
  return isFinite(e) ? e : 0;
}, ju = function() {
  g.useEffect(function() {
    return document.body.setAttribute(wt, (uo() + 1).toString()), function() {
      var e = uo() - 1;
      e <= 0 ? document.body.removeAttribute(wt) : document.body.setAttribute(wt, e.toString());
    };
  }, []);
}, Gu = function(e) {
  var t = e.noRelative, n = e.noImportant, r = e.gapMode, o = r === void 0 ? "margin" : r;
  ju();
  var a = g.useMemo(function() {
    return Hu(o);
  }, [o]);
  return g.createElement(zu, { styles: Vu(a, !t, o, n ? "" : "!important") });
}, tr = !1;
if (typeof window < "u")
  try {
    var Qt = Object.defineProperty({}, "passive", {
      get: function() {
        return tr = !0, !0;
      }
    });
    window.addEventListener("test", Qt, Qt), window.removeEventListener("test", Qt, Qt);
  } catch {
    tr = !1;
  }
var ft = tr ? { passive: !1 } : !1, Uu = function(e) {
  return e.tagName === "TEXTAREA";
}, wa = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !Uu(e) && n[t] === "visible")
  );
}, qu = function(e) {
  return wa(e, "overflowY");
}, Xu = function(e) {
  return wa(e, "overflowX");
}, fo = function(e, t) {
  var n = t.ownerDocument, r = t;
  do {
    typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
    var o = xa(e, r);
    if (o) {
      var a = Ca(e, r), s = a[1], i = a[2];
      if (s > i)
        return !0;
    }
    r = r.parentNode;
  } while (r && r !== n.body);
  return !1;
}, Ku = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, r = e.clientHeight;
  return [
    t,
    n,
    r
  ];
}, Qu = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, r = e.clientWidth;
  return [
    t,
    n,
    r
  ];
}, xa = function(e, t) {
  return e === "v" ? qu(t) : Xu(t);
}, Ca = function(e, t) {
  return e === "v" ? Ku(t) : Qu(t);
}, Zu = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, Ju = function(e, t, n, r, o) {
  var a = Zu(e, window.getComputedStyle(t).direction), s = a * r, i = n.target, c = t.contains(i), l = !1, u = s > 0, d = 0, f = 0;
  do {
    if (!i)
      break;
    var h = Ca(e, i), v = h[0], m = h[1], p = h[2], b = m - p - a * v;
    (v || b) && xa(e, i) && (d += b, f += v);
    var w = i.parentNode;
    i = w && w.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? w.host : w;
  } while (
    // portaled content
    !c && i !== document.body || // self content
    c && (t.contains(i) || t === i)
  );
  return (u && Math.abs(d) < 1 || !u && Math.abs(f) < 1) && (l = !0), l;
}, Zt = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, ho = function(e) {
  return [e.deltaX, e.deltaY];
}, mo = function(e) {
  return e && "current" in e ? e.current : e;
}, ed = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, td = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, nd = 0, ht = [];
function rd(e) {
  var t = g.useRef([]), n = g.useRef([0, 0]), r = g.useRef(), o = g.useState(nd++)[0], a = g.useState(ya)[0], s = g.useRef(e);
  g.useEffect(function() {
    s.current = e;
  }, [e]), g.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var m = Mu([e.lockRef.current], (e.shards || []).map(mo), !0).filter(Boolean);
      return m.forEach(function(p) {
        return p.classList.add("allow-interactivity-".concat(o));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(o)), m.forEach(function(p) {
          return p.classList.remove("allow-interactivity-".concat(o));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var i = g.useCallback(function(m, p) {
    if ("touches" in m && m.touches.length === 2 || m.type === "wheel" && m.ctrlKey)
      return !s.current.allowPinchZoom;
    var b = Zt(m), w = n.current, y = "deltaX" in m ? m.deltaX : w[0] - b[0], k = "deltaY" in m ? m.deltaY : w[1] - b[1], M, x = m.target, S = Math.abs(y) > Math.abs(k) ? "h" : "v";
    if ("touches" in m && S === "h" && x.type === "range")
      return !1;
    var R = fo(S, x);
    if (!R)
      return !0;
    if (R ? M = S : (M = S === "v" ? "h" : "v", R = fo(S, x)), !R)
      return !1;
    if (!r.current && "changedTouches" in m && (y || k) && (r.current = M), !M)
      return !0;
    var $ = r.current || M;
    return Ju($, p, m, $ === "h" ? y : k);
  }, []), c = g.useCallback(function(m) {
    var p = m;
    if (!(!ht.length || ht[ht.length - 1] !== a)) {
      var b = "deltaY" in p ? ho(p) : Zt(p), w = t.current.filter(function(M) {
        return M.name === p.type && (M.target === p.target || p.target === M.shadowParent) && ed(M.delta, b);
      })[0];
      if (w && w.should) {
        p.cancelable && p.preventDefault();
        return;
      }
      if (!w) {
        var y = (s.current.shards || []).map(mo).filter(Boolean).filter(function(M) {
          return M.contains(p.target);
        }), k = y.length > 0 ? i(p, y[0]) : !s.current.noIsolation;
        k && p.cancelable && p.preventDefault();
      }
    }
  }, []), l = g.useCallback(function(m, p, b, w) {
    var y = { name: m, delta: p, target: b, should: w, shadowParent: od(b) };
    t.current.push(y), setTimeout(function() {
      t.current = t.current.filter(function(k) {
        return k !== y;
      });
    }, 1);
  }, []), u = g.useCallback(function(m) {
    n.current = Zt(m), r.current = void 0;
  }, []), d = g.useCallback(function(m) {
    l(m.type, ho(m), m.target, i(m, e.lockRef.current));
  }, []), f = g.useCallback(function(m) {
    l(m.type, Zt(m), m.target, i(m, e.lockRef.current));
  }, []);
  g.useEffect(function() {
    return ht.push(a), e.setCallbacks({
      onScrollCapture: d,
      onWheelCapture: d,
      onTouchMoveCapture: f
    }), document.addEventListener("wheel", c, ft), document.addEventListener("touchmove", c, ft), document.addEventListener("touchstart", u, ft), function() {
      ht = ht.filter(function(m) {
        return m !== a;
      }), document.removeEventListener("wheel", c, ft), document.removeEventListener("touchmove", c, ft), document.removeEventListener("touchstart", u, ft);
    };
  }, []);
  var h = e.removeScrollBar, v = e.inert;
  return g.createElement(
    g.Fragment,
    null,
    v ? g.createElement(a, { styles: td(o) }) : null,
    h ? g.createElement(Gu, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function od(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const ad = Tu(va, rd);
var ka = g.forwardRef(function(e, t) {
  return g.createElement(pn, Te({}, e, { ref: t, sideCar: ad }));
});
ka.classNames = pn.classNames;
var gn = "Popover", [Ma] = Le(gn, [
  oa
]), Bt = oa(), [sd, at] = Ma(gn), Sa = (e) => {
  const {
    __scopePopover: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: a,
    modal: s = !1
  } = e, i = Bt(t), c = g.useRef(null), [l, u] = g.useState(!1), [d, f] = ot({
    prop: r,
    defaultProp: o ?? !1,
    onChange: a,
    caller: gn
  });
  return /* @__PURE__ */ C(uu, { ...i, children: /* @__PURE__ */ C(
    sd,
    {
      scope: t,
      contentId: ln(),
      triggerRef: c,
      open: d,
      onOpenChange: f,
      onOpenToggle: g.useCallback(() => f((h) => !h), [f]),
      hasCustomAnchor: l,
      onCustomAnchorAdd: g.useCallback(() => u(!0), []),
      onCustomAnchorRemove: g.useCallback(() => u(!1), []),
      modal: s,
      children: n
    }
  ) });
};
Sa.displayName = gn;
var Oa = "PopoverAnchor", id = g.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = at(Oa, n), a = Bt(n), { onCustomAnchorAdd: s, onCustomAnchorRemove: i } = o;
    return g.useEffect(() => (s(), () => i()), [s, i]), /* @__PURE__ */ C(ha, { ...a, ...r, ref: t });
  }
);
id.displayName = Oa;
var Da = "PopoverTrigger", Na = g.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = at(Da, n), a = Bt(n), s = ie(t, o.triggerRef), i = /* @__PURE__ */ C(
      te.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": o.open,
        "aria-controls": o.contentId,
        "data-state": Ta(o.open),
        ...r,
        ref: s,
        onClick: ae(e.onClick, o.onOpenToggle)
      }
    );
    return o.hasCustomAnchor ? i : /* @__PURE__ */ C(ha, { asChild: !0, ...a, children: i });
  }
);
Na.displayName = Da;
var pr = "PopoverPortal", [cd, ld] = Ma(pr, {
  forceMount: void 0
}), Pa = (e) => {
  const { __scopePopover: t, forceMount: n, children: r, container: o } = e, a = at(pr, t);
  return /* @__PURE__ */ C(cd, { scope: t, forceMount: n, children: /* @__PURE__ */ C(Nt, { present: n || a.open, children: /* @__PURE__ */ C(ma, { asChild: !0, container: o, children: r }) }) });
};
Pa.displayName = pr;
var kt = "PopoverContent", Ea = g.forwardRef(
  (e, t) => {
    const n = ld(kt, e.__scopePopover), { forceMount: r = n.forceMount, ...o } = e, a = at(kt, e.__scopePopover);
    return /* @__PURE__ */ C(Nt, { present: r || a.open, children: a.modal ? /* @__PURE__ */ C(dd, { ...o, ref: t }) : /* @__PURE__ */ C(fd, { ...o, ref: t }) });
  }
);
Ea.displayName = kt;
var ud = /* @__PURE__ */ nn("PopoverContent.RemoveScroll"), dd = g.forwardRef(
  (e, t) => {
    const n = at(kt, e.__scopePopover), r = g.useRef(null), o = ie(t, r), a = g.useRef(!1);
    return g.useEffect(() => {
      const s = r.current;
      if (s) return ku(s);
    }, []), /* @__PURE__ */ C(ka, { as: ud, allowPinchZoom: !0, children: /* @__PURE__ */ C(
      Aa,
      {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: ae(e.onCloseAutoFocus, (s) => {
          var i;
          s.preventDefault(), a.current || (i = n.triggerRef.current) == null || i.focus();
        }),
        onPointerDownOutside: ae(
          e.onPointerDownOutside,
          (s) => {
            const i = s.detail.originalEvent, c = i.button === 0 && i.ctrlKey === !0, l = i.button === 2 || c;
            a.current = l;
          },
          { checkForDefaultPrevented: !1 }
        ),
        onFocusOutside: ae(
          e.onFocusOutside,
          (s) => s.preventDefault(),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
), fd = g.forwardRef(
  (e, t) => {
    const n = at(kt, e.__scopePopover), r = g.useRef(!1), o = g.useRef(!1);
    return /* @__PURE__ */ C(
      Aa,
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
), Aa = g.forwardRef(
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
    } = e, f = at(kt, n), h = Bt(n);
    return Ic(), /* @__PURE__ */ C(
      zo,
      {
        asChild: !0,
        loop: !0,
        trapped: r,
        onMountAutoFocus: o,
        onUnmountAutoFocus: a,
        children: /* @__PURE__ */ C(
          Lo,
          {
            asChild: !0,
            disableOutsidePointerEvents: s,
            onInteractOutside: u,
            onEscapeKeyDown: i,
            onPointerDownOutside: c,
            onFocusOutside: l,
            onDismiss: () => f.onOpenChange(!1),
            children: /* @__PURE__ */ C(
              du,
              {
                "data-state": Ta(f.open),
                role: "dialog",
                id: f.contentId,
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
), Ra = "PopoverClose", hd = g.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = at(Ra, n);
    return /* @__PURE__ */ C(
      te.button,
      {
        type: "button",
        ...r,
        ref: t,
        onClick: ae(e.onClick, () => o.onOpenChange(!1))
      }
    );
  }
);
hd.displayName = Ra;
var md = "PopoverArrow", pd = g.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = Bt(n);
    return /* @__PURE__ */ C(fu, { ...o, ...r, ref: t });
  }
);
pd.displayName = md;
function Ta(e) {
  return e ? "open" : "closed";
}
var gr = Sa, br = Na, vr = Pa, bn = Ea;
const Cg = gr, kg = br, gd = rt(({ className: e, align: t = "end", sideOffset: n = 8, ...r }, o) => /* @__PURE__ */ C(vr, { children: /* @__PURE__ */ C(
  bn,
  {
    ref: o,
    align: t,
    sideOffset: n,
    className: H(
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
gd.displayName = bn.displayName;
const bd = Ne(
  H(
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
), vd = rt(
  ({ className: e, variant: t, icon: n, children: r, ...o }, a) => /* @__PURE__ */ U(
    "button",
    {
      ref: a,
      className: H(bd({ variant: t }), e),
      ...o,
      children: [
        n && /* @__PURE__ */ C("span", { className: "shrink-0", children: n }),
        r
      ]
    }
  )
);
vd.displayName = "PopoverMenuItem";
const yd = Ne("cms-font-pretendard cms-text-black", {
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
}), wd = P.forwardRef(
  ({
    className: e,
    variant: t,
    align: n,
    decoration: r,
    as: o = "p",
    children: a,
    ...s
  }, i) => /* @__PURE__ */ C(
    o,
    {
      className: H(yd({ variant: t, align: n, decoration: r }), e),
      ref: i,
      ...s,
      children: a
    }
  )
);
wd.displayName = "Text";
const xd = Ne(
  H(
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
        default: H(
          "bg-cms-white ",
          "border-cms-gray-450",
          "focus:border-cms-gray-800",
          "disabled:bg-cms-gray-150 disabled:text-cms-gray-400 disabled:cursor-not-allowed"
        ),
        error: H(
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
), Cd = Ne("block text-cms-sm font-medium text-cms-black"), kd = Ne(
  "block text-cms-sm font-medium text-cms-red-400 mt-1"
), Md = Ne(
  "block text-cms-sm font-normal text-cms-gray-700 mt-1"
), Sd = P.forwardRef(
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
    defaultValue: u,
    onChange: d,
    id: f,
    ...h
  }, v) => {
    const [m, p] = P.useState(
      l || u || ""
    ), b = f || `input-${Math.random().toString(36).substr(2, 9)}`, w = o ? "error" : t, y = l !== void 0 ? l : m, k = (y == null ? void 0 : y.length) || 0, M = (S) => {
      l === void 0 && p(S.target.value), d == null || d(S);
    }, x = r || i && c;
    return /* @__PURE__ */ U("div", { className: H("w-full", !n && "w-auto"), children: [
      x && /* @__PURE__ */ U("div", { className: "flex justify-between items-center mb-2", children: [
        r ? /* @__PURE__ */ C("label", { htmlFor: b, className: Cd(), children: r }) : /* @__PURE__ */ C("div", {}),
        i && c && /* @__PURE__ */ U("span", { className: "text-cms-xs text-cms-gray-600", children: [
          k,
          " / ",
          c
        ] })
      ] }),
      /* @__PURE__ */ C(
        "input",
        {
          id: b,
          ref: v,
          className: H(
            xd({ variant: w, fullWidth: n }),
            e
          ),
          maxLength: c,
          value: l,
          defaultValue: u,
          onChange: M,
          ...h
        }
      ),
      o && a && /* @__PURE__ */ C("span", { className: kd(), children: a }),
      !o && s && /* @__PURE__ */ C("span", { className: Md(), children: s })
    ] });
  }
);
Sd.displayName = "TextInput";
function Od(e, t, n = "long") {
  return new Intl.DateTimeFormat("en-US", {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: "numeric",
    timeZone: e,
    timeZoneName: n
  }).format(t).split(/\s/g).slice(2).join(" ");
}
const zn = {}, Rt = {};
function it(e, t) {
  try {
    const r = (zn[e] || (zn[e] = new Intl.DateTimeFormat("en-US", {
      timeZone: e,
      timeZoneName: "longOffset"
    }).format))(t).split("GMT")[1];
    return r in Rt ? Rt[r] : po(r, r.split(":"));
  } catch {
    if (e in Rt) return Rt[e];
    const n = e == null ? void 0 : e.match(Dd);
    return n ? po(e, n.slice(1)) : NaN;
  }
}
const Dd = /([+-]\d\d):?(\d\d)?/;
function po(e, t) {
  const n = +(t[0] || 0), r = +(t[1] || 0), o = +(t[2] || 0) / 60;
  return Rt[e] = n * 60 + r > 0 ? n * 60 + r + o : n * 60 - r - o;
}
class $e extends Date {
  //#region static
  constructor(...t) {
    super(), t.length > 1 && typeof t[t.length - 1] == "string" && (this.timeZone = t.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(it(this.timeZone, this)) ? this.setTime(NaN) : t.length ? typeof t[0] == "number" && (t.length === 1 || t.length === 2 && typeof t[1] != "number") ? this.setTime(t[0]) : typeof t[0] == "string" ? this.setTime(+new Date(t[0])) : t[0] instanceof Date ? this.setTime(+t[0]) : (this.setTime(+new Date(...t)), Wa(this), nr(this)) : this.setTime(Date.now());
  }
  static tz(t, ...n) {
    return n.length ? new $e(...n, t) : new $e(Date.now(), t);
  }
  //#endregion
  //#region time zone
  withTimeZone(t) {
    return new $e(+this, t);
  }
  getTimezoneOffset() {
    const t = -it(this.timeZone, this);
    return t > 0 ? Math.floor(t) : Math.ceil(t);
  }
  //#endregion
  //#region time
  setTime(t) {
    return Date.prototype.setTime.apply(this, arguments), nr(this), +this;
  }
  //#endregion
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new $e(+new Date(t), this.timeZone);
  }
  //#endregion
}
const go = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
  if (!go.test(e)) return;
  const t = e.replace(go, "$1UTC");
  $e.prototype[t] && (e.startsWith("get") ? $e.prototype[e] = function() {
    return this.internal[t]();
  } : ($e.prototype[e] = function() {
    return Date.prototype[t].apply(this.internal, arguments), Nd(this), +this;
  }, $e.prototype[t] = function() {
    return Date.prototype[t].apply(this, arguments), nr(this), +this;
  }));
});
function nr(e) {
  e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - Math.round(-it(e.timeZone, e) * 60));
}
function Nd(e) {
  Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), Wa(e);
}
function Wa(e) {
  const t = it(e.timeZone, e), n = t > 0 ? Math.floor(t) : Math.ceil(t), r = /* @__PURE__ */ new Date(+e);
  r.setUTCHours(r.getUTCHours() - 1);
  const o = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), a = -(/* @__PURE__ */ new Date(+r)).getTimezoneOffset(), s = o - a, i = Date.prototype.getHours.apply(e) !== e.internal.getUTCHours();
  s && i && e.internal.setUTCMinutes(e.internal.getUTCMinutes() + s);
  const c = o - n;
  c && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + c);
  const l = /* @__PURE__ */ new Date(+e);
  l.setUTCSeconds(0);
  const u = o > 0 ? l.getSeconds() : (l.getSeconds() - 60) % 60, d = Math.round(-(it(e.timeZone, e) * 60)) % 60;
  (d || u) && (e.internal.setUTCSeconds(e.internal.getUTCSeconds() + d), Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + d + u));
  const f = it(e.timeZone, e), h = f > 0 ? Math.floor(f) : Math.ceil(f), m = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - h, p = h !== n, b = m - c;
  if (p && b) {
    Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + b);
    const w = it(e.timeZone, e), y = w > 0 ? Math.floor(w) : Math.ceil(w), k = h - y;
    k && (e.internal.setUTCMinutes(e.internal.getUTCMinutes() + k), Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + k));
  }
}
class de extends $e {
  //#region static
  static tz(t, ...n) {
    return n.length ? new de(...n, t) : new de(Date.now(), t);
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
    return `${t} GMT${n}${r}${o} (${Od(this.timeZone, this)})`;
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
    return new de(+this, t);
  }
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new de(+new Date(t), this.timeZone);
  }
  //#endregion
}
const _a = 6048e5, Pd = 864e5, bo = Symbol.for("constructDateFrom");
function ce(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && bo in e ? e[bo](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function Q(e, t) {
  return ce(t || e, e);
}
function Ia(e, t, n) {
  const r = Q(e, n == null ? void 0 : n.in);
  return isNaN(t) ? ce(e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
function $a(e, t, n) {
  const r = Q(e, n == null ? void 0 : n.in);
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
let Ed = {};
function Lt() {
  return Ed;
}
function Mt(e, t) {
  var i, c, l, u;
  const n = Lt(), r = (t == null ? void 0 : t.weekStartsOn) ?? ((c = (i = t == null ? void 0 : t.locale) == null ? void 0 : i.options) == null ? void 0 : c.weekStartsOn) ?? n.weekStartsOn ?? ((u = (l = n.locale) == null ? void 0 : l.options) == null ? void 0 : u.weekStartsOn) ?? 0, o = Q(e, t == null ? void 0 : t.in), a = o.getDay(), s = (a < r ? 7 : 0) + a - r;
  return o.setDate(o.getDate() - s), o.setHours(0, 0, 0, 0), o;
}
function $t(e, t) {
  return Mt(e, { ...t, weekStartsOn: 1 });
}
function Fa(e, t) {
  const n = Q(e, t == null ? void 0 : t.in), r = n.getFullYear(), o = ce(n, 0);
  o.setFullYear(r + 1, 0, 4), o.setHours(0, 0, 0, 0);
  const a = $t(o), s = ce(n, 0);
  s.setFullYear(r, 0, 4), s.setHours(0, 0, 0, 0);
  const i = $t(s);
  return n.getTime() >= a.getTime() ? r + 1 : n.getTime() >= i.getTime() ? r : r - 1;
}
function vo(e) {
  const t = Q(e), n = new Date(
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
function Pt(e, ...t) {
  const n = ce.bind(
    null,
    t.find((r) => typeof r == "object")
  );
  return t.map(n);
}
function Ft(e, t) {
  const n = Q(e, t == null ? void 0 : t.in);
  return n.setHours(0, 0, 0, 0), n;
}
function yr(e, t, n) {
  const [r, o] = Pt(
    n == null ? void 0 : n.in,
    e,
    t
  ), a = Ft(r), s = Ft(o), i = +a - vo(a), c = +s - vo(s);
  return Math.round((i - c) / Pd);
}
function Ad(e, t) {
  const n = Fa(e, t), r = ce(e, 0);
  return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), $t(r);
}
function Rd(e, t, n) {
  return Ia(e, t * 7, n);
}
function Td(e, t, n) {
  return $a(e, t * 12, n);
}
function Wd(e, t) {
  let n, r = t == null ? void 0 : t.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = ce.bind(null, o));
    const a = Q(o, r);
    (!n || n < a || isNaN(+a)) && (n = a);
  }), ce(r, n || NaN);
}
function _d(e, t) {
  let n, r = t == null ? void 0 : t.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = ce.bind(null, o));
    const a = Q(o, r);
    (!n || n > a || isNaN(+a)) && (n = a);
  }), ce(r, n || NaN);
}
function Id(e, t, n) {
  const [r, o] = Pt(
    n == null ? void 0 : n.in,
    e,
    t
  );
  return +Ft(r) == +Ft(o);
}
function Ya(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function $d(e) {
  return !(!Ya(e) && typeof e != "number" || isNaN(+Q(e)));
}
function Ba(e, t, n) {
  const [r, o] = Pt(
    n == null ? void 0 : n.in,
    e,
    t
  ), a = r.getFullYear() - o.getFullYear(), s = r.getMonth() - o.getMonth();
  return a * 12 + s;
}
function Fd(e, t) {
  const n = Q(e, t == null ? void 0 : t.in), r = n.getMonth();
  return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
function La(e, t) {
  const [n, r] = Pt(e, t.start, t.end);
  return { start: n, end: r };
}
function Yd(e, t) {
  const { start: n, end: r } = La(t == null ? void 0 : t.in, e);
  let o = +n > +r;
  const a = o ? +n : +r, s = o ? r : n;
  s.setHours(0, 0, 0, 0), s.setDate(1);
  let i = 1;
  const c = [];
  for (; +s <= a; )
    c.push(ce(n, s)), s.setMonth(s.getMonth() + i);
  return o ? c.reverse() : c;
}
function Bd(e, t) {
  const n = Q(e, t == null ? void 0 : t.in);
  return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function Ld(e, t) {
  const n = Q(e, t == null ? void 0 : t.in), r = n.getFullYear();
  return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
function Ha(e, t) {
  const n = Q(e, t == null ? void 0 : t.in);
  return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function Hd(e, t) {
  const { start: n, end: r } = La(t == null ? void 0 : t.in, e);
  let o = +n > +r;
  const a = o ? +n : +r, s = o ? r : n;
  s.setHours(0, 0, 0, 0), s.setMonth(0, 1);
  let i = 1;
  const c = [];
  for (; +s <= a; )
    c.push(ce(n, s)), s.setFullYear(s.getFullYear() + i);
  return o ? c.reverse() : c;
}
function za(e, t) {
  var i, c, l, u;
  const n = Lt(), r = (t == null ? void 0 : t.weekStartsOn) ?? ((c = (i = t == null ? void 0 : t.locale) == null ? void 0 : i.options) == null ? void 0 : c.weekStartsOn) ?? n.weekStartsOn ?? ((u = (l = n.locale) == null ? void 0 : l.options) == null ? void 0 : u.weekStartsOn) ?? 0, o = Q(e, t == null ? void 0 : t.in), a = o.getDay(), s = (a < r ? -7 : 0) + 6 - (a - r);
  return o.setDate(o.getDate() + s), o.setHours(23, 59, 59, 999), o;
}
function zd(e, t) {
  return za(e, { ...t, weekStartsOn: 1 });
}
const Vd = {
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
}, jd = (e, t, n) => {
  let r;
  const o = Vd[e];
  return typeof o == "string" ? r = o : t === 1 ? r = o.one : r = o.other.replace("{{count}}", t.toString()), n != null && n.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
function xt(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
const Gd = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, Ud = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, qd = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, Xd = {
  date: xt({
    formats: Gd,
    defaultWidth: "full"
  }),
  time: xt({
    formats: Ud,
    defaultWidth: "full"
  }),
  dateTime: xt({
    formats: qd,
    defaultWidth: "full"
  })
}, Kd = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, Qd = (e, t, n, r) => Kd[e];
function We(e) {
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
const Zd = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, Jd = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, ef = {
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
}, tf = {
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
}, nf = {
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
}, rf = {
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
}, of = (e, t) => {
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
}, af = {
  ordinalNumber: of,
  era: We({
    values: Zd,
    defaultWidth: "wide"
  }),
  quarter: We({
    values: Jd,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: We({
    values: ef,
    defaultWidth: "wide"
  }),
  day: We({
    values: tf,
    defaultWidth: "wide"
  }),
  dayPeriod: We({
    values: nf,
    defaultWidth: "wide",
    formattingValues: rf,
    defaultFormattingWidth: "wide"
  })
};
function _e(e) {
  return (t, n = {}) => {
    const r = n.width, o = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], a = t.match(o);
    if (!a)
      return null;
    const s = a[0], i = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], c = Array.isArray(i) ? cf(i, (d) => d.test(s)) : (
      // [TODO] -- I challenge you to fix the type
      sf(i, (d) => d.test(s))
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
function sf(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function cf(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function Va(e) {
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
const lf = /^(\d+)(th|st|nd|rd)?/i, uf = /\d+/i, df = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, ff = {
  any: [/^b/i, /^(a|c)/i]
}, hf = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, mf = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, pf = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, gf = {
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
}, bf = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, vf = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, yf = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, wf = {
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
}, xf = {
  ordinalNumber: Va({
    matchPattern: lf,
    parsePattern: uf,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: _e({
    matchPatterns: df,
    defaultMatchWidth: "wide",
    parsePatterns: ff,
    defaultParseWidth: "any"
  }),
  quarter: _e({
    matchPatterns: hf,
    defaultMatchWidth: "wide",
    parsePatterns: mf,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: _e({
    matchPatterns: pf,
    defaultMatchWidth: "wide",
    parsePatterns: gf,
    defaultParseWidth: "any"
  }),
  day: _e({
    matchPatterns: bf,
    defaultMatchWidth: "wide",
    parsePatterns: vf,
    defaultParseWidth: "any"
  }),
  dayPeriod: _e({
    matchPatterns: yf,
    defaultMatchWidth: "any",
    parsePatterns: wf,
    defaultParseWidth: "any"
  })
}, gt = {
  code: "en-US",
  formatDistance: jd,
  formatLong: Xd,
  formatRelative: Qd,
  localize: af,
  match: xf,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function Cf(e, t) {
  const n = Q(e, t == null ? void 0 : t.in);
  return yr(n, Ha(n)) + 1;
}
function wr(e, t) {
  const n = Q(e, t == null ? void 0 : t.in), r = +$t(n) - +Ad(n);
  return Math.round(r / _a) + 1;
}
function ja(e, t) {
  var u, d, f, h;
  const n = Q(e, t == null ? void 0 : t.in), r = n.getFullYear(), o = Lt(), a = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((d = (u = t == null ? void 0 : t.locale) == null ? void 0 : u.options) == null ? void 0 : d.firstWeekContainsDate) ?? o.firstWeekContainsDate ?? ((h = (f = o.locale) == null ? void 0 : f.options) == null ? void 0 : h.firstWeekContainsDate) ?? 1, s = ce((t == null ? void 0 : t.in) || e, 0);
  s.setFullYear(r + 1, 0, a), s.setHours(0, 0, 0, 0);
  const i = Mt(s, t), c = ce((t == null ? void 0 : t.in) || e, 0);
  c.setFullYear(r, 0, a), c.setHours(0, 0, 0, 0);
  const l = Mt(c, t);
  return +n >= +i ? r + 1 : +n >= +l ? r : r - 1;
}
function kf(e, t) {
  var i, c, l, u;
  const n = Lt(), r = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((c = (i = t == null ? void 0 : t.locale) == null ? void 0 : i.options) == null ? void 0 : c.firstWeekContainsDate) ?? n.firstWeekContainsDate ?? ((u = (l = n.locale) == null ? void 0 : l.options) == null ? void 0 : u.firstWeekContainsDate) ?? 1, o = ja(e, t), a = ce((t == null ? void 0 : t.in) || e, 0);
  return a.setFullYear(o, 0, r), a.setHours(0, 0, 0, 0), Mt(a, t);
}
function xr(e, t) {
  const n = Q(e, t == null ? void 0 : t.in), r = +Mt(n, t) - +kf(n, t);
  return Math.round(r / _a) + 1;
}
function K(e, t) {
  const n = e < 0 ? "-" : "", r = Math.abs(e).toString().padStart(t, "0");
  return n + r;
}
const Ze = {
  // Year
  y(e, t) {
    const n = e.getFullYear(), r = n > 0 ? n : 1 - n;
    return K(t === "yy" ? r % 100 : r, t.length);
  },
  // Month
  M(e, t) {
    const n = e.getMonth();
    return t === "M" ? String(n + 1) : K(n + 1, 2);
  },
  // Day of the month
  d(e, t) {
    return K(e.getDate(), t.length);
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
    return K(e.getHours() % 12 || 12, t.length);
  },
  // Hour [0-23]
  H(e, t) {
    return K(e.getHours(), t.length);
  },
  // Minute
  m(e, t) {
    return K(e.getMinutes(), t.length);
  },
  // Second
  s(e, t) {
    return K(e.getSeconds(), t.length);
  },
  // Fraction of second
  S(e, t) {
    const n = t.length, r = e.getMilliseconds(), o = Math.trunc(
      r * Math.pow(10, n - 3)
    );
    return K(o, t.length);
  }
}, mt = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, yo = {
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
    return Ze.y(e, t);
  },
  // Local week-numbering year
  Y: function(e, t, n, r) {
    const o = ja(e, r), a = o > 0 ? o : 1 - o;
    if (t === "YY") {
      const s = a % 100;
      return K(s, 2);
    }
    return t === "Yo" ? n.ordinalNumber(a, { unit: "year" }) : K(a, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const n = Fa(e);
    return K(n, t.length);
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
    return K(n, t.length);
  },
  // Quarter
  Q: function(e, t, n) {
    const r = Math.ceil((e.getMonth() + 1) / 3);
    switch (t) {
      case "Q":
        return String(r);
      case "QQ":
        return K(r, 2);
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
        return K(r, 2);
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
        return Ze.M(e, t);
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
        return K(r + 1, 2);
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
    const o = xr(e, r);
    return t === "wo" ? n.ordinalNumber(o, { unit: "week" }) : K(o, t.length);
  },
  // ISO week of year
  I: function(e, t, n) {
    const r = wr(e);
    return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : K(r, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : Ze.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const r = Cf(e);
    return t === "Do" ? n.ordinalNumber(r, { unit: "dayOfYear" }) : K(r, t.length);
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
        return K(a, 2);
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
        return K(a, t.length);
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
        return K(o, t.length);
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
    switch (r === 12 ? o = mt.noon : r === 0 ? o = mt.midnight : o = r / 12 >= 1 ? "pm" : "am", t) {
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
    switch (r >= 17 ? o = mt.evening : r >= 12 ? o = mt.afternoon : r >= 4 ? o = mt.morning : o = mt.night, t) {
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
    return Ze.h(e, t);
  },
  // Hour [0-23]
  H: function(e, t, n) {
    return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : Ze.H(e, t);
  },
  // Hour [0-11]
  K: function(e, t, n) {
    const r = e.getHours() % 12;
    return t === "Ko" ? n.ordinalNumber(r, { unit: "hour" }) : K(r, t.length);
  },
  // Hour [1-24]
  k: function(e, t, n) {
    let r = e.getHours();
    return r === 0 && (r = 24), t === "ko" ? n.ordinalNumber(r, { unit: "hour" }) : K(r, t.length);
  },
  // Minute
  m: function(e, t, n) {
    return t === "mo" ? n.ordinalNumber(e.getMinutes(), { unit: "minute" }) : Ze.m(e, t);
  },
  // Second
  s: function(e, t, n) {
    return t === "so" ? n.ordinalNumber(e.getSeconds(), { unit: "second" }) : Ze.s(e, t);
  },
  // Fraction of second
  S: function(e, t) {
    return Ze.S(e, t);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(e, t, n) {
    const r = e.getTimezoneOffset();
    if (r === 0)
      return "Z";
    switch (t) {
      case "X":
        return xo(r);
      case "XXXX":
      case "XX":
        return st(r);
      case "XXXXX":
      case "XXX":
      default:
        return st(r, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      case "x":
        return xo(r);
      case "xxxx":
      case "xx":
        return st(r);
      case "xxxxx":
      case "xxx":
      default:
        return st(r, ":");
    }
  },
  // Timezone (GMT)
  O: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + wo(r, ":");
      case "OOOO":
      default:
        return "GMT" + st(r, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + wo(r, ":");
      case "zzzz":
      default:
        return "GMT" + st(r, ":");
    }
  },
  // Seconds timestamp
  t: function(e, t, n) {
    const r = Math.trunc(+e / 1e3);
    return K(r, t.length);
  },
  // Milliseconds timestamp
  T: function(e, t, n) {
    return K(+e, t.length);
  }
};
function wo(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = Math.trunc(r / 60), a = r % 60;
  return a === 0 ? n + String(o) : n + String(o) + t + K(a, 2);
}
function xo(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + K(Math.abs(e) / 60, 2) : st(e, t);
}
function st(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = K(Math.trunc(r / 60), 2), a = K(r % 60, 2);
  return n + o + t + a;
}
const Co = (e, t) => {
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
}, Ga = (e, t) => {
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
}, Mf = (e, t) => {
  const n = e.match(/(P+)(p+)?/) || [], r = n[1], o = n[2];
  if (!o)
    return Co(e, t);
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
  return a.replace("{{date}}", Co(r, t)).replace("{{time}}", Ga(o, t));
}, Sf = {
  p: Ga,
  P: Mf
}, Of = /^D+$/, Df = /^Y+$/, Nf = ["D", "DD", "YY", "YYYY"];
function Pf(e) {
  return Of.test(e);
}
function Ef(e) {
  return Df.test(e);
}
function Af(e, t, n) {
  const r = Rf(e, t, n);
  if (console.warn(r), Nf.includes(e)) throw new RangeError(r);
}
function Rf(e, t, n) {
  const r = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const Tf = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Wf = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, _f = /^'([^]*?)'?$/, If = /''/g, $f = /[a-zA-Z]/;
function Tt(e, t, n) {
  var u, d, f, h, v, m, p, b;
  const r = Lt(), o = (n == null ? void 0 : n.locale) ?? r.locale ?? gt, a = (n == null ? void 0 : n.firstWeekContainsDate) ?? ((d = (u = n == null ? void 0 : n.locale) == null ? void 0 : u.options) == null ? void 0 : d.firstWeekContainsDate) ?? r.firstWeekContainsDate ?? ((h = (f = r.locale) == null ? void 0 : f.options) == null ? void 0 : h.firstWeekContainsDate) ?? 1, s = (n == null ? void 0 : n.weekStartsOn) ?? ((m = (v = n == null ? void 0 : n.locale) == null ? void 0 : v.options) == null ? void 0 : m.weekStartsOn) ?? r.weekStartsOn ?? ((b = (p = r.locale) == null ? void 0 : p.options) == null ? void 0 : b.weekStartsOn) ?? 0, i = Q(e, n == null ? void 0 : n.in);
  if (!$d(i))
    throw new RangeError("Invalid time value");
  let c = t.match(Wf).map((w) => {
    const y = w[0];
    if (y === "p" || y === "P") {
      const k = Sf[y];
      return k(w, o.formatLong);
    }
    return w;
  }).join("").match(Tf).map((w) => {
    if (w === "''")
      return { isToken: !1, value: "'" };
    const y = w[0];
    if (y === "'")
      return { isToken: !1, value: Ff(w) };
    if (yo[y])
      return { isToken: !0, value: w };
    if (y.match($f))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + y + "`"
      );
    return { isToken: !1, value: w };
  });
  o.localize.preprocessor && (c = o.localize.preprocessor(i, c));
  const l = {
    firstWeekContainsDate: a,
    weekStartsOn: s,
    locale: o
  };
  return c.map((w) => {
    if (!w.isToken) return w.value;
    const y = w.value;
    (!(n != null && n.useAdditionalWeekYearTokens) && Ef(y) || !(n != null && n.useAdditionalDayOfYearTokens) && Pf(y)) && Af(y, t, String(e));
    const k = yo[y[0]];
    return k(i, y, o.localize, l);
  }).join("");
}
function Ff(e) {
  const t = e.match(_f);
  return t ? t[1].replace(If, "'") : e;
}
function Yf(e, t) {
  const n = Q(e, t == null ? void 0 : t.in), r = n.getFullYear(), o = n.getMonth(), a = ce(n, 0);
  return a.setFullYear(r, o + 1, 0), a.setHours(0, 0, 0, 0), a.getDate();
}
function Bf(e, t) {
  return Q(e, t == null ? void 0 : t.in).getMonth();
}
function Lf(e, t) {
  return Q(e, t == null ? void 0 : t.in).getFullYear();
}
function Hf(e, t) {
  return +Q(e) > +Q(t);
}
function zf(e, t) {
  return +Q(e) < +Q(t);
}
function Vf(e, t, n) {
  const [r, o] = Pt(
    n == null ? void 0 : n.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear() && r.getMonth() === o.getMonth();
}
function jf(e, t, n) {
  const [r, o] = Pt(
    n == null ? void 0 : n.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear();
}
function Gf(e, t, n) {
  const r = Q(e, n == null ? void 0 : n.in), o = r.getFullYear(), a = r.getDate(), s = ce(e, 0);
  s.setFullYear(o, t, 15), s.setHours(0, 0, 0, 0);
  const i = Yf(s);
  return r.setMonth(t, Math.min(a, i)), r;
}
function Uf(e, t, n) {
  const r = Q(e, n == null ? void 0 : n.in);
  return isNaN(+r) ? ce(e, NaN) : (r.setFullYear(t), r);
}
const ko = 5, qf = 4;
function Xf(e, t) {
  const n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, o = t.addDays(e, -r + 1), a = t.addDays(o, ko * 7 - 1);
  return t.getMonth(e) === t.getMonth(a) ? ko : qf;
}
function Ua(e, t) {
  const n = t.startOfMonth(e), r = n.getDay();
  return r === 1 ? n : r === 0 ? t.addDays(n, -1 * 6) : t.addDays(n, -1 * (r - 1));
}
function Kf(e, t) {
  const n = Ua(e, t), r = Xf(e, t);
  return t.addDays(n, r * 7 - 1);
}
const Qf = {
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
}, Zf = (e, t, n) => {
  let r;
  const o = Qf[e];
  return typeof o == "string" ? r = o : t === 1 ? r = o.one : r = o.other.replace("{{count}}", t.toString()), n != null && n.addSuffix ? n.comparison && n.comparison > 0 ? r + " 후" : r + " 전" : r;
}, Jf = {
  full: "y년 M월 d일 EEEE",
  long: "y년 M월 d일",
  medium: "y.MM.dd",
  short: "y.MM.dd"
}, eh = {
  full: "a H시 mm분 ss초 zzzz",
  long: "a H:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
}, th = {
  full: "{{date}} {{time}}",
  long: "{{date}} {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
}, nh = {
  date: xt({
    formats: Jf,
    defaultWidth: "full"
  }),
  time: xt({
    formats: eh,
    defaultWidth: "full"
  }),
  dateTime: xt({
    formats: th,
    defaultWidth: "full"
  })
}, rh = {
  lastWeek: "'지난' eeee p",
  yesterday: "'어제' p",
  today: "'오늘' p",
  tomorrow: "'내일' p",
  nextWeek: "'다음' eeee p",
  other: "P"
}, oh = (e, t, n, r) => rh[e], ah = {
  narrow: ["BC", "AD"],
  abbreviated: ["BC", "AD"],
  wide: ["기원전", "서기"]
}, sh = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1분기", "2분기", "3분기", "4분기"]
}, ih = {
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
}, ch = {
  narrow: ["일", "월", "화", "수", "목", "금", "토"],
  short: ["일", "월", "화", "수", "목", "금", "토"],
  abbreviated: ["일", "월", "화", "수", "목", "금", "토"],
  wide: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"]
}, lh = {
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
}, uh = {
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
}, dh = (e, t) => {
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
}, fh = {
  ordinalNumber: dh,
  era: We({
    values: ah,
    defaultWidth: "wide"
  }),
  quarter: We({
    values: sh,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: We({
    values: ih,
    defaultWidth: "wide"
  }),
  day: We({
    values: ch,
    defaultWidth: "wide"
  }),
  dayPeriod: We({
    values: lh,
    defaultWidth: "wide",
    formattingValues: uh,
    defaultFormattingWidth: "wide"
  })
}, hh = /^(\d+)(일|번째)?/i, mh = /\d+/i, ph = {
  narrow: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(기원전|서기)/i
}, gh = {
  any: [/^(bc|기원전)/i, /^(ad|서기)/i]
}, bh = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234]사?분기/i
}, vh = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, yh = {
  narrow: /^(1[012]|[123456789])/,
  abbreviated: /^(1[012]|[123456789])월/i,
  wide: /^(1[012]|[123456789])월/i
}, wh = {
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
}, xh = {
  narrow: /^[일월화수목금토]/,
  short: /^[일월화수목금토]/,
  abbreviated: /^[일월화수목금토]/,
  wide: /^[일월화수목금토]요일/
}, Ch = {
  any: [/^일/, /^월/, /^화/, /^수/, /^목/, /^금/, /^토/]
}, kh = {
  any: /^(am|pm|오전|오후|자정|정오|아침|저녁|밤)/i
}, Mh = {
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
}, Sh = {
  ordinalNumber: Va({
    matchPattern: hh,
    parsePattern: mh,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: _e({
    matchPatterns: ph,
    defaultMatchWidth: "wide",
    parsePatterns: gh,
    defaultParseWidth: "any"
  }),
  quarter: _e({
    matchPatterns: bh,
    defaultMatchWidth: "wide",
    parsePatterns: vh,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: _e({
    matchPatterns: yh,
    defaultMatchWidth: "wide",
    parsePatterns: wh,
    defaultParseWidth: "any"
  }),
  day: _e({
    matchPatterns: xh,
    defaultMatchWidth: "wide",
    parsePatterns: Ch,
    defaultParseWidth: "any"
  }),
  dayPeriod: _e({
    matchPatterns: kh,
    defaultMatchWidth: "any",
    parsePatterns: Mh,
    defaultParseWidth: "any"
  })
}, Oh = {
  code: "ko",
  formatDistance: Zf,
  formatLong: nh,
  formatRelative: oh,
  localize: fh,
  match: Sh,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
}, qa = {
  ...gt,
  labels: {
    labelDayButton: (e, t, n, r) => {
      let o;
      r && typeof r.format == "function" ? o = r.format.bind(r) : o = (s, i) => Tt(s, i, { locale: gt, ...n });
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
      return n && typeof n.format == "function" ? r = n.format.bind(n) : r = (o, a) => Tt(o, a, { locale: gt, ...t }), r(e, "LLLL yyyy");
    },
    labelGridcell: (e, t, n, r) => {
      let o;
      r && typeof r.format == "function" ? o = r.format.bind(r) : o = (s, i) => Tt(s, i, { locale: gt, ...n });
      let a = o(e, "PPPP");
      return t != null && t.today && (a = `Today, ${a}`), a;
    },
    labelNav: "Navigation bar",
    labelWeekNumberHeader: "Week Number",
    labelWeekday: (e, t, n) => {
      let r;
      return n && typeof n.format == "function" ? r = n.format.bind(n) : r = (o, a) => Tt(o, a, { locale: gt, ...t }), r(e, "cccc");
    }
  }
};
class ue {
  /**
   * Creates an instance of `DateLib`.
   *
   * @param options Configuration options for the date library.
   * @param overrides Custom overrides for the date library functions.
   */
  constructor(t, n) {
    this.Date = Date, this.today = () => {
      var r;
      return (r = this.overrides) != null && r.today ? this.overrides.today() : this.options.timeZone ? de.tz(this.options.timeZone) : new this.Date();
    }, this.newDate = (r, o, a) => {
      var s;
      return (s = this.overrides) != null && s.newDate ? this.overrides.newDate(r, o, a) : this.options.timeZone ? new de(r, o, a, this.options.timeZone) : new Date(r, o, a);
    }, this.addDays = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.addDays ? this.overrides.addDays(r, o) : Ia(r, o);
    }, this.addMonths = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.addMonths ? this.overrides.addMonths(r, o) : $a(r, o);
    }, this.addWeeks = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.addWeeks ? this.overrides.addWeeks(r, o) : Rd(r, o);
    }, this.addYears = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.addYears ? this.overrides.addYears(r, o) : Td(r, o);
    }, this.differenceInCalendarDays = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(r, o) : yr(r, o);
    }, this.differenceInCalendarMonths = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(r, o) : Ba(r, o);
    }, this.eachMonthOfInterval = (r) => {
      var o;
      return (o = this.overrides) != null && o.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(r) : Yd(r);
    }, this.eachYearOfInterval = (r) => {
      var i;
      const o = (i = this.overrides) != null && i.eachYearOfInterval ? this.overrides.eachYearOfInterval(r) : Hd(r), a = new Set(o.map((c) => this.getYear(c)));
      if (a.size === o.length)
        return o;
      const s = [];
      return a.forEach((c) => {
        s.push(new Date(c, 0, 1));
      }), s;
    }, this.endOfBroadcastWeek = (r) => {
      var o;
      return (o = this.overrides) != null && o.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(r) : Kf(r, this);
    }, this.endOfISOWeek = (r) => {
      var o;
      return (o = this.overrides) != null && o.endOfISOWeek ? this.overrides.endOfISOWeek(r) : zd(r);
    }, this.endOfMonth = (r) => {
      var o;
      return (o = this.overrides) != null && o.endOfMonth ? this.overrides.endOfMonth(r) : Fd(r);
    }, this.endOfWeek = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.endOfWeek ? this.overrides.endOfWeek(r, o) : za(r, this.options);
    }, this.endOfYear = (r) => {
      var o;
      return (o = this.overrides) != null && o.endOfYear ? this.overrides.endOfYear(r) : Ld(r);
    }, this.format = (r, o, a) => {
      var i;
      const s = (i = this.overrides) != null && i.format ? this.overrides.format(r, o, this.options) : Tt(r, o, this.options);
      return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(s) : s;
    }, this.getISOWeek = (r) => {
      var o;
      return (o = this.overrides) != null && o.getISOWeek ? this.overrides.getISOWeek(r) : wr(r);
    }, this.getMonth = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.getMonth ? this.overrides.getMonth(r, this.options) : Bf(r, this.options);
    }, this.getYear = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.getYear ? this.overrides.getYear(r, this.options) : Lf(r, this.options);
    }, this.getWeek = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.getWeek ? this.overrides.getWeek(r, this.options) : xr(r, this.options);
    }, this.isAfter = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isAfter ? this.overrides.isAfter(r, o) : Hf(r, o);
    }, this.isBefore = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isBefore ? this.overrides.isBefore(r, o) : zf(r, o);
    }, this.isDate = (r) => {
      var o;
      return (o = this.overrides) != null && o.isDate ? this.overrides.isDate(r) : Ya(r);
    }, this.isSameDay = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isSameDay ? this.overrides.isSameDay(r, o) : Id(r, o);
    }, this.isSameMonth = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isSameMonth ? this.overrides.isSameMonth(r, o) : Vf(r, o);
    }, this.isSameYear = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isSameYear ? this.overrides.isSameYear(r, o) : jf(r, o);
    }, this.max = (r) => {
      var o;
      return (o = this.overrides) != null && o.max ? this.overrides.max(r) : Wd(r);
    }, this.min = (r) => {
      var o;
      return (o = this.overrides) != null && o.min ? this.overrides.min(r) : _d(r);
    }, this.setMonth = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.setMonth ? this.overrides.setMonth(r, o) : Gf(r, o);
    }, this.setYear = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.setYear ? this.overrides.setYear(r, o) : Uf(r, o);
    }, this.startOfBroadcastWeek = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(r, this) : Ua(r, this);
    }, this.startOfDay = (r) => {
      var o;
      return (o = this.overrides) != null && o.startOfDay ? this.overrides.startOfDay(r) : Ft(r);
    }, this.startOfISOWeek = (r) => {
      var o;
      return (o = this.overrides) != null && o.startOfISOWeek ? this.overrides.startOfISOWeek(r) : $t(r);
    }, this.startOfMonth = (r) => {
      var o;
      return (o = this.overrides) != null && o.startOfMonth ? this.overrides.startOfMonth(r) : Bd(r);
    }, this.startOfWeek = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.startOfWeek ? this.overrides.startOfWeek(r, this.options) : Mt(r, this.options);
    }, this.startOfYear = (r) => {
      var o;
      return (o = this.overrides) != null && o.startOfYear ? this.overrides.startOfYear(r) : Ha(r);
    }, this.options = { locale: qa, ...t }, this.overrides = n;
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
    return t && ue.yearFirstLocales.has(t) ? "year-first" : "month-first";
  }
  /**
   * Formats the month/year pair respecting locale conventions.
   *
   * @since 9.11.0
   */
  formatMonthYear(t) {
    const { locale: n, timeZone: r, numerals: o } = this.options, a = n == null ? void 0 : n.code;
    if (a && ue.yearFirstLocales.has(a))
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
ue.yearFirstLocales = /* @__PURE__ */ new Set([
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
const ze = new ue();
class Xa {
  constructor(t, n, r = ze) {
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
class Dh {
  constructor(t, n) {
    this.date = t, this.weeks = n;
  }
}
class Nh {
  constructor(t, n) {
    this.days = n, this.weekNumber = t;
  }
}
function Ph(e) {
  return P.createElement("button", { ...e });
}
function Eh(e) {
  return P.createElement("span", { ...e });
}
function Ah(e) {
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
function Rh(e) {
  const { day: t, modifiers: n, ...r } = e;
  return P.createElement("td", { ...r });
}
function Th(e) {
  const { day: t, modifiers: n, ...r } = e, o = P.useRef(null);
  return P.useEffect(() => {
    var a;
    n.focused && ((a = o.current) == null || a.focus());
  }, [n.focused]), P.createElement("button", { ref: o, ...r });
}
var Y;
(function(e) {
  e.Root = "root", e.Chevron = "chevron", e.Day = "day", e.DayButton = "day_button", e.CaptionLabel = "caption_label", e.Dropdowns = "dropdowns", e.Dropdown = "dropdown", e.DropdownRoot = "dropdown_root", e.Footer = "footer", e.MonthGrid = "month_grid", e.MonthCaption = "month_caption", e.MonthsDropdown = "months_dropdown", e.Month = "month", e.Months = "months", e.Nav = "nav", e.NextMonthButton = "button_next", e.PreviousMonthButton = "button_previous", e.Week = "week", e.Weeks = "weeks", e.Weekday = "weekday", e.Weekdays = "weekdays", e.WeekNumber = "week_number", e.WeekNumberHeader = "week_number_header", e.YearsDropdown = "years_dropdown";
})(Y || (Y = {}));
var re;
(function(e) {
  e.disabled = "disabled", e.hidden = "hidden", e.outside = "outside", e.focused = "focused", e.today = "today";
})(re || (re = {}));
var Se;
(function(e) {
  e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})(Se || (Se = {}));
var ge;
(function(e) {
  e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})(ge || (ge = {}));
function Wh(e) {
  const { options: t, className: n, components: r, classNames: o, ...a } = e, s = [o[Y.Dropdown], n].join(" "), i = t == null ? void 0 : t.find(({ value: c }) => c === a.value);
  return P.createElement(
    "span",
    { "data-disabled": a.disabled, className: o[Y.DropdownRoot] },
    P.createElement(r.Select, { className: s, ...a }, t == null ? void 0 : t.map(({ value: c, label: l, disabled: u }) => P.createElement(r.Option, { key: c, value: c, disabled: u }, l))),
    P.createElement(
      "span",
      { className: o[Y.CaptionLabel], "aria-hidden": !0 },
      i == null ? void 0 : i.label,
      P.createElement(r.Chevron, { orientation: "down", size: 18, className: o[Y.Chevron] })
    )
  );
}
function _h(e) {
  return P.createElement("div", { ...e });
}
function Ih(e) {
  return P.createElement("div", { ...e });
}
function $h(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return P.createElement("div", { ...r }, e.children);
}
function Fh(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return P.createElement("div", { ...r });
}
function Yh(e) {
  return P.createElement("table", { ...e });
}
function Bh(e) {
  return P.createElement("div", { ...e });
}
const Ka = Ai(void 0);
function Ht() {
  const e = Ri(Ka);
  if (e === void 0)
    throw new Error("useDayPicker() must be used within a custom component.");
  return e;
}
function Lh(e) {
  const { components: t } = Ht();
  return P.createElement(t.Dropdown, { ...e });
}
function Hh(e) {
  const { onPreviousClick: t, onNextClick: n, previousMonth: r, nextMonth: o, ...a } = e, { components: s, classNames: i, labels: { labelPrevious: c, labelNext: l } } = Ht(), u = xe((f) => {
    o && (n == null || n(f));
  }, [o, n]), d = xe((f) => {
    r && (t == null || t(f));
  }, [r, t]);
  return P.createElement(
    "nav",
    { ...a },
    P.createElement(
      s.PreviousMonthButton,
      { type: "button", className: i[Y.PreviousMonthButton], tabIndex: r ? void 0 : -1, "aria-disabled": r ? void 0 : !0, "aria-label": c(r), onClick: d },
      P.createElement(s.Chevron, { disabled: r ? void 0 : !0, className: i[Y.Chevron], orientation: "left" })
    ),
    P.createElement(
      s.NextMonthButton,
      { type: "button", className: i[Y.NextMonthButton], tabIndex: o ? void 0 : -1, "aria-disabled": o ? void 0 : !0, "aria-label": l(o), onClick: u },
      P.createElement(s.Chevron, { disabled: o ? void 0 : !0, orientation: "right", className: i[Y.Chevron] })
    )
  );
}
function zh(e) {
  const { components: t } = Ht();
  return P.createElement(t.Button, { ...e });
}
function Vh(e) {
  return P.createElement("option", { ...e });
}
function jh(e) {
  const { components: t } = Ht();
  return P.createElement(t.Button, { ...e });
}
function Gh(e) {
  const { rootRef: t, ...n } = e;
  return P.createElement("div", { ...n, ref: t });
}
function Uh(e) {
  return P.createElement("select", { ...e });
}
function qh(e) {
  const { week: t, ...n } = e;
  return P.createElement("tr", { ...n });
}
function Xh(e) {
  return P.createElement("th", { ...e });
}
function Kh(e) {
  return P.createElement(
    "thead",
    { "aria-hidden": !0 },
    P.createElement("tr", { ...e })
  );
}
function Qh(e) {
  const { week: t, ...n } = e;
  return P.createElement("th", { ...n });
}
function Zh(e) {
  return P.createElement("th", { ...e });
}
function Jh(e) {
  return P.createElement("tbody", { ...e });
}
function em(e) {
  const { components: t } = Ht();
  return P.createElement(t.Dropdown, { ...e });
}
const tm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: Ph,
  CaptionLabel: Eh,
  Chevron: Ah,
  Day: Rh,
  DayButton: Th,
  Dropdown: Wh,
  DropdownNav: _h,
  Footer: Ih,
  Month: $h,
  MonthCaption: Fh,
  MonthGrid: Yh,
  Months: Bh,
  MonthsDropdown: Lh,
  Nav: Hh,
  NextMonthButton: zh,
  Option: Vh,
  PreviousMonthButton: jh,
  Root: Gh,
  Select: Uh,
  Week: qh,
  WeekNumber: Qh,
  WeekNumberHeader: Zh,
  Weekday: Xh,
  Weekdays: Kh,
  Weeks: Jh,
  YearsDropdown: em
}, Symbol.toStringTag, { value: "Module" }));
function je(e, t, n = !1, r = ze) {
  let { from: o, to: a } = e;
  const { differenceInCalendarDays: s, isSameDay: i } = r;
  return o && a ? (s(a, o) < 0 && ([o, a] = [a, o]), s(t, o) >= (n ? 1 : 0) && s(a, t) >= (n ? 1 : 0)) : !n && a ? i(a, t) : !n && o ? i(o, t) : !1;
}
function Cr(e) {
  return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function vn(e) {
  return !!(e && typeof e == "object" && "from" in e);
}
function kr(e) {
  return !!(e && typeof e == "object" && "after" in e);
}
function Mr(e) {
  return !!(e && typeof e == "object" && "before" in e);
}
function Qa(e) {
  return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function Za(e, t) {
  return Array.isArray(e) && e.every(t.isDate);
}
function Ge(e, t, n = ze) {
  const r = Array.isArray(t) ? t : [t], { isSameDay: o, differenceInCalendarDays: a, isAfter: s } = n;
  return r.some((i) => {
    if (typeof i == "boolean")
      return i;
    if (n.isDate(i))
      return o(e, i);
    if (Za(i, n))
      return i.some((c) => o(e, c));
    if (vn(i))
      return je(i, e, !1, n);
    if (Qa(i))
      return Array.isArray(i.dayOfWeek) ? i.dayOfWeek.includes(e.getDay()) : i.dayOfWeek === e.getDay();
    if (Cr(i)) {
      const c = a(i.before, e), l = a(i.after, e), u = c > 0, d = l < 0;
      return s(i.before, i.after) ? d && u : u || d;
    }
    return kr(i) ? a(e, i.after) > 0 : Mr(i) ? a(i.before, e) > 0 : typeof i == "function" ? i(e) : !1;
  });
}
function nm(e, t, n, r, o) {
  const { disabled: a, hidden: s, modifiers: i, showOutsideDays: c, broadcastCalendar: l, today: u = o.today() } = t, { isSameDay: d, isSameMonth: f, startOfMonth: h, isBefore: v, endOfMonth: m, isAfter: p } = o, b = n && h(n), w = r && m(r), y = {
    [re.focused]: [],
    [re.outside]: [],
    [re.disabled]: [],
    [re.hidden]: [],
    [re.today]: []
  }, k = {};
  for (const M of e) {
    const { date: x, displayMonth: S } = M, R = !!(S && !f(x, S)), $ = !!(b && v(x, b)), T = !!(w && p(x, w)), _ = !!(a && Ge(x, a, o)), F = !!(s && Ge(x, s, o)) || $ || T || // Broadcast calendar will show outside days as default
    !l && !c && R || l && c === !1 && R, j = d(x, u);
    R && y.outside.push(M), _ && y.disabled.push(M), F && y.hidden.push(M), j && y.today.push(M), i && Object.keys(i).forEach((O) => {
      const E = i == null ? void 0 : i[O];
      E && Ge(x, E, o) && (k[O] ? k[O].push(M) : k[O] = [M]);
    });
  }
  return (M) => {
    const x = {
      [re.focused]: !1,
      [re.disabled]: !1,
      [re.hidden]: !1,
      [re.outside]: !1,
      [re.today]: !1
    }, S = {};
    for (const R in y) {
      const $ = y[R];
      x[R] = $.some((T) => T === M);
    }
    for (const R in k)
      S[R] = k[R].some(($) => $ === M);
    return {
      ...x,
      // custom modifiers should override all the previous ones
      ...S
    };
  };
}
function rm(e, t, n = {}) {
  return Object.entries(e).filter(([, o]) => o === !0).reduce((o, [a]) => (n[a] ? o.push(n[a]) : t[re[a]] ? o.push(t[re[a]]) : t[Se[a]] && o.push(t[Se[a]]), o), [t[Y.Day]]);
}
function om(e) {
  return {
    ...tm,
    ...e
  };
}
function am(e) {
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
function sm() {
  const e = {};
  for (const t in Y)
    e[Y[t]] = `rdp-${Y[t]}`;
  for (const t in re)
    e[re[t]] = `rdp-${re[t]}`;
  for (const t in Se)
    e[Se[t]] = `rdp-${Se[t]}`;
  for (const t in ge)
    e[ge[t]] = `rdp-${ge[t]}`;
  return e;
}
function Ja(e, t, n) {
  return (n ?? new ue(t)).formatMonthYear(e);
}
const im = Ja;
function cm(e, t, n) {
  return (n ?? new ue(t)).format(e, "d");
}
function lm(e, t = ze) {
  return t.format(e, "LLLL");
}
function um(e, t, n) {
  return (n ?? new ue(t)).format(e, "cccccc");
}
function dm(e, t = ze) {
  return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
function fm() {
  return "";
}
function es(e, t = ze) {
  return t.format(e, "yyyy");
}
const hm = es, mm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  formatCaption: Ja,
  formatDay: cm,
  formatMonthCaption: im,
  formatMonthDropdown: lm,
  formatWeekNumber: dm,
  formatWeekNumberHeader: fm,
  formatWeekdayName: um,
  formatYearCaption: hm,
  formatYearDropdown: es
}, Symbol.toStringTag, { value: "Module" }));
function pm(e) {
  return e != null && e.formatMonthCaption && !e.formatCaption && (e.formatCaption = e.formatMonthCaption), e != null && e.formatYearCaption && !e.formatYearDropdown && (e.formatYearDropdown = e.formatYearCaption), {
    ...mm,
    ...e
  };
}
function Sr(e, t, n, r) {
  let o = (r ?? new ue(n)).format(e, "PPPP");
  return t.today && (o = `Today, ${o}`), t.selected && (o = `${o}, selected`), o;
}
const gm = Sr;
function Or(e, t, n) {
  return (n ?? new ue(t)).formatMonthYear(e);
}
const bm = Or;
function ts(e, t, n, r) {
  let o = (r ?? new ue(n)).format(e, "PPPP");
  return t != null && t.today && (o = `Today, ${o}`), o;
}
function ns(e) {
  return "Choose the Month";
}
function rs() {
  return "";
}
const vm = "Go to the Next Month";
function os(e, t) {
  return vm;
}
function as(e) {
  return "Go to the Previous Month";
}
function ss(e, t, n) {
  return (n ?? new ue(t)).format(e, "cccc");
}
function is(e, t) {
  return `Week ${e}`;
}
function cs(e) {
  return "Week Number";
}
function ls(e) {
  return "Choose the Year";
}
const ym = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  labelCaption: bm,
  labelDay: gm,
  labelDayButton: Sr,
  labelGrid: Or,
  labelGridcell: ts,
  labelMonthDropdown: ns,
  labelNav: rs,
  labelNext: os,
  labelPrevious: as,
  labelWeekNumber: is,
  labelWeekNumberHeader: cs,
  labelWeekday: ss,
  labelYearDropdown: ls
}, Symbol.toStringTag, { value: "Module" })), Me = (e, t, n) => t || (n ? typeof n == "function" ? n : (...r) => n : e);
function wm(e, t) {
  var r;
  const n = ((r = t.locale) == null ? void 0 : r.labels) ?? {};
  return {
    ...ym,
    ...e ?? {},
    labelDayButton: Me(Sr, e == null ? void 0 : e.labelDayButton, n.labelDayButton),
    labelMonthDropdown: Me(ns, e == null ? void 0 : e.labelMonthDropdown, n.labelMonthDropdown),
    labelNext: Me(os, e == null ? void 0 : e.labelNext, n.labelNext),
    labelPrevious: Me(as, e == null ? void 0 : e.labelPrevious, n.labelPrevious),
    labelWeekNumber: Me(is, e == null ? void 0 : e.labelWeekNumber, n.labelWeekNumber),
    labelYearDropdown: Me(ls, e == null ? void 0 : e.labelYearDropdown, n.labelYearDropdown),
    labelGrid: Me(Or, e == null ? void 0 : e.labelGrid, n.labelGrid),
    labelGridcell: Me(ts, e == null ? void 0 : e.labelGridcell, n.labelGridcell),
    labelNav: Me(rs, e == null ? void 0 : e.labelNav, n.labelNav),
    labelWeekNumberHeader: Me(cs, e == null ? void 0 : e.labelWeekNumberHeader, n.labelWeekNumberHeader),
    labelWeekday: Me(ss, e == null ? void 0 : e.labelWeekday, n.labelWeekday)
  };
}
function xm(e, t, n, r, o) {
  const { startOfMonth: a, startOfYear: s, endOfYear: i, eachMonthOfInterval: c, getMonth: l } = o;
  return c({
    start: s(e),
    end: i(e)
  }).map((f) => {
    const h = r.formatMonthDropdown(f, o), v = l(f), m = t && f < a(t) || n && f > a(n) || !1;
    return { value: v, label: h, disabled: m };
  });
}
function Cm(e, t = {}, n = {}) {
  let r = { ...t == null ? void 0 : t[Y.Day] };
  return Object.entries(e).filter(([, o]) => o === !0).forEach(([o]) => {
    r = {
      ...r,
      ...n == null ? void 0 : n[o]
    };
  }), r;
}
function km(e, t, n, r) {
  const o = r ?? e.today(), a = n ? e.startOfBroadcastWeek(o, e) : t ? e.startOfISOWeek(o) : e.startOfWeek(o), s = [];
  for (let i = 0; i < 7; i++) {
    const c = e.addDays(a, i);
    s.push(c);
  }
  return s;
}
function Mm(e, t, n, r, o = !1) {
  if (!e || !t)
    return;
  const { startOfYear: a, endOfYear: s, eachYearOfInterval: i, getYear: c } = r, l = a(e), u = s(t), d = i({ start: l, end: u });
  return o && d.reverse(), d.map((f) => {
    const h = n.formatYearDropdown(f, r);
    return {
      value: c(f),
      label: h,
      disabled: !1
    };
  });
}
function Sm(e, t = {}) {
  var i;
  const { weekStartsOn: n, locale: r } = t, o = n ?? ((i = r == null ? void 0 : r.options) == null ? void 0 : i.weekStartsOn) ?? 0, a = (c) => {
    const l = typeof c == "number" || typeof c == "string" ? new Date(c) : c;
    return new de(l.getFullYear(), l.getMonth(), l.getDate(), 12, 0, 0, e);
  }, s = (c) => {
    const l = a(c);
    return new Date(l.getFullYear(), l.getMonth(), l.getDate(), 0, 0, 0, 0);
  };
  return {
    today: () => a(de.tz(e)),
    newDate: (c, l, u) => new de(c, l, u, 12, 0, 0, e),
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
      const u = a(c), h = ((((l == null ? void 0 : l.weekStartsOn) ?? o) + 6) % 7 - u.getDay() + 7) % 7;
      return u.setDate(u.getDate() + h), u;
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
      const l = a(c.start), u = a(c.end), d = [], f = new de(l.getFullYear(), l.getMonth(), 1, 12, 0, 0, e), h = u.getFullYear() * 12 + u.getMonth();
      for (; f.getFullYear() * 12 + f.getMonth() <= h; )
        d.push(new de(f, e)), f.setMonth(f.getMonth() + 1, 1);
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
      const l = a(c.start), u = a(c.end), d = [], f = new de(l.getFullYear(), 0, 1, 12, 0, 0, e);
      for (; f.getFullYear() <= u.getFullYear(); )
        d.push(new de(f, e)), f.setFullYear(f.getFullYear() + 1, 0, 1);
      return d;
    },
    getWeek: (c, l) => {
      var d;
      const u = s(c);
      return xr(u, {
        weekStartsOn: (l == null ? void 0 : l.weekStartsOn) ?? o,
        firstWeekContainsDate: (l == null ? void 0 : l.firstWeekContainsDate) ?? ((d = r == null ? void 0 : r.options) == null ? void 0 : d.firstWeekContainsDate) ?? 1
      });
    },
    getISOWeek: (c) => {
      const l = s(c);
      return wr(l);
    },
    differenceInCalendarDays: (c, l) => {
      const u = s(c), d = s(l);
      return yr(u, d);
    },
    differenceInCalendarMonths: (c, l) => {
      const u = s(c), d = s(l);
      return Ba(u, d);
    }
  };
}
const zt = (e) => e instanceof HTMLElement ? e : null, Vn = (e) => [
  ...e.querySelectorAll("[data-animated-month]") ?? []
], Om = (e) => zt(e.querySelector("[data-animated-month]")), jn = (e) => zt(e.querySelector("[data-animated-caption]")), Gn = (e) => zt(e.querySelector("[data-animated-weeks]")), Dm = (e) => zt(e.querySelector("[data-animated-nav]")), Nm = (e) => zt(e.querySelector("[data-animated-weekdays]"));
function Pm(e, t, { classNames: n, months: r, focused: o, dateLib: a }) {
  const s = bt(null), i = bt(r), c = bt(!1);
  Eo(() => {
    const l = i.current;
    if (i.current = r, !t || !e.current || // safety check because the ref can be set to anything by consumers
    !(e.current instanceof HTMLElement) || // validation required for the animation to work as expected
    r.length === 0 || l.length === 0 || r.length !== l.length)
      return;
    const u = a.isSameMonth(r[0].date, l[0].date), d = a.isAfter(r[0].date, l[0].date), f = d ? n[ge.caption_after_enter] : n[ge.caption_before_enter], h = d ? n[ge.weeks_after_enter] : n[ge.weeks_before_enter], v = s.current, m = e.current.cloneNode(!0);
    if (m instanceof HTMLElement ? (Vn(m).forEach((y) => {
      if (!(y instanceof HTMLElement))
        return;
      const k = Om(y);
      k && y.contains(k) && y.removeChild(k);
      const M = jn(y);
      M && M.classList.remove(f);
      const x = Gn(y);
      x && x.classList.remove(h);
    }), s.current = m) : s.current = null, c.current || u || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    o)
      return;
    const p = v instanceof HTMLElement ? Vn(v) : [], b = Vn(e.current);
    if (b != null && b.every((w) => w instanceof HTMLElement) && p && p.every((w) => w instanceof HTMLElement)) {
      c.current = !0, e.current.style.isolation = "isolate";
      const w = Dm(e.current);
      w && (w.style.zIndex = "1"), b.forEach((y, k) => {
        const M = p[k];
        if (!M)
          return;
        y.style.position = "relative", y.style.overflow = "hidden";
        const x = jn(y);
        x && x.classList.add(f);
        const S = Gn(y);
        S && S.classList.add(h);
        const R = () => {
          c.current = !1, e.current && (e.current.style.isolation = ""), w && (w.style.zIndex = ""), x && x.classList.remove(f), S && S.classList.remove(h), y.style.position = "", y.style.overflow = "", y.contains(M) && y.removeChild(M);
        };
        M.style.pointerEvents = "none", M.style.position = "absolute", M.style.overflow = "hidden", M.setAttribute("aria-hidden", "true");
        const $ = Nm(M);
        $ && ($.style.opacity = "0");
        const T = jn(M);
        T && (T.classList.add(d ? n[ge.caption_before_exit] : n[ge.caption_after_exit]), T.addEventListener("animationend", R));
        const _ = Gn(M);
        _ && _.classList.add(d ? n[ge.weeks_before_exit] : n[ge.weeks_after_exit]), y.insertBefore(M, y.firstChild);
      });
    }
  });
}
function Em(e, t, n, r) {
  const o = e[0], a = e[e.length - 1], { ISOWeek: s, fixedWeeks: i, broadcastCalendar: c } = n ?? {}, { addDays: l, differenceInCalendarDays: u, differenceInCalendarMonths: d, endOfBroadcastWeek: f, endOfISOWeek: h, endOfMonth: v, endOfWeek: m, isAfter: p, startOfBroadcastWeek: b, startOfISOWeek: w, startOfWeek: y } = r, k = c ? b(o, r) : s ? w(o) : y(o), M = c ? f(a) : s ? h(v(a)) : m(v(a)), x = t && (c ? f(t) : s ? h(t) : m(t)), S = x && p(M, x) ? x : M, R = u(S, k), $ = d(a, o) + 1, T = [];
  for (let j = 0; j <= R; j++) {
    const O = l(k, j);
    T.push(O);
  }
  const F = (c ? 35 : 42) * $;
  if (i && T.length < F) {
    const j = F - T.length;
    for (let O = 0; O < j; O++) {
      const E = l(T[T.length - 1], 1);
      T.push(E);
    }
  }
  return T;
}
function Am(e) {
  const t = [];
  return e.reduce((n, r) => {
    const o = r.weeks.reduce((a, s) => a.concat(s.days.slice()), t.slice());
    return n.concat(o.slice());
  }, t.slice());
}
function Rm(e, t, n, r) {
  const { numberOfMonths: o = 1 } = n, a = [];
  for (let s = 0; s < o; s++) {
    const i = r.addMonths(e, s);
    if (t && i > t)
      break;
    a.push(i);
  }
  return a;
}
function Mo(e, t, n, r) {
  const { month: o, defaultMonth: a, today: s = r.today(), numberOfMonths: i = 1 } = e;
  let c = o || a || s;
  const { differenceInCalendarMonths: l, addMonths: u, startOfMonth: d } = r;
  if (n && l(n, c) < i - 1) {
    const f = -1 * (i - 1);
    c = u(n, f);
  }
  return t && l(c, t) < 0 && (c = t), d(c);
}
function Tm(e, t, n, r) {
  const { addDays: o, endOfBroadcastWeek: a, endOfISOWeek: s, endOfMonth: i, endOfWeek: c, getISOWeek: l, getWeek: u, startOfBroadcastWeek: d, startOfISOWeek: f, startOfWeek: h } = r, v = e.reduce((m, p) => {
    const b = n.broadcastCalendar ? d(p, r) : n.ISOWeek ? f(p) : h(p), w = n.broadcastCalendar ? a(p) : n.ISOWeek ? s(i(p)) : c(i(p)), y = t.filter((S) => S >= b && S <= w), k = n.broadcastCalendar ? 35 : 42;
    if (n.fixedWeeks && y.length < k) {
      const S = t.filter((R) => {
        const $ = k - y.length;
        return R > w && R <= o(w, $);
      });
      y.push(...S);
    }
    const M = y.reduce((S, R) => {
      const $ = n.ISOWeek ? l(R) : u(R), T = S.find((F) => F.weekNumber === $), _ = new Xa(R, p, r);
      return T ? T.days.push(_) : S.push(new Nh($, [_])), S;
    }, []), x = new Dh(p, M);
    return m.push(x), m;
  }, []);
  return n.reverseMonths ? v.reverse() : v;
}
function Wm(e, t) {
  let { startMonth: n, endMonth: r } = e;
  const { startOfYear: o, startOfDay: a, startOfMonth: s, endOfMonth: i, addYears: c, endOfYear: l, newDate: u, today: d } = t, { fromYear: f, toYear: h, fromMonth: v, toMonth: m } = e;
  !n && v && (n = v), !n && f && (n = t.newDate(f, 0, 1)), !r && m && (r = m), !r && h && (r = u(h, 11, 31));
  const p = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
  return n ? n = s(n) : f ? n = u(f, 0, 1) : !n && p && (n = o(c(e.today ?? d(), -100))), r ? r = i(r) : h ? r = u(h, 11, 31) : !r && p && (r = l(e.today ?? d())), [
    n && a(n),
    r && a(r)
  ];
}
function _m(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: a = 1 } = n, { startOfMonth: s, addMonths: i, differenceInCalendarMonths: c } = r, l = o ? a : 1, u = s(e);
  if (!t)
    return i(u, l);
  if (!(c(t, e) < a))
    return i(u, l);
}
function Im(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: a } = n, { startOfMonth: s, addMonths: i, differenceInCalendarMonths: c } = r, l = o ? a ?? 1 : 1, u = s(e);
  if (!t)
    return i(u, -l);
  if (!(c(u, t) <= 0))
    return i(u, -l);
}
function $m(e) {
  const t = [];
  return e.reduce((n, r) => n.concat(r.weeks.slice()), t.slice());
}
function yn(e, t) {
  const [n, r] = ve(e);
  return [t === void 0 ? n : t, r];
}
function Fm(e, t) {
  var k;
  const [n, r] = Wm(e, t), { startOfMonth: o, endOfMonth: a } = t, s = Mo(e, n, r, t), [i, c] = yn(
    s,
    // initialMonth is always computed from props.month if provided
    e.month ? s : void 0
  );
  Wt(() => {
    const M = Mo(e, n, r, t);
    c(M);
  }, [e.timeZone]);
  const { months: l, weeks: u, days: d, previousMonth: f, nextMonth: h } = Fe(() => {
    const M = Rm(i, r, { numberOfMonths: e.numberOfMonths }, t), x = Em(M, e.endMonth ? a(e.endMonth) : void 0, {
      ISOWeek: e.ISOWeek,
      fixedWeeks: e.fixedWeeks,
      broadcastCalendar: e.broadcastCalendar
    }, t), S = Tm(M, x, {
      broadcastCalendar: e.broadcastCalendar,
      fixedWeeks: e.fixedWeeks,
      ISOWeek: e.ISOWeek,
      reverseMonths: e.reverseMonths
    }, t), R = $m(S), $ = Am(S), T = Im(i, n, e, t), _ = _m(i, r, e, t);
    return {
      months: S,
      weeks: R,
      days: $,
      previousMonth: T,
      nextMonth: _
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
  ]), { disableNavigation: v, onMonthChange: m } = e, p = (M) => u.some((x) => x.days.some((S) => S.isEqualTo(M))), b = (M) => {
    if (v)
      return;
    let x = o(M);
    n && x < o(n) && (x = o(n)), r && x > o(r) && (x = o(r)), c(x), m == null || m(x);
  };
  return {
    months: l,
    weeks: u,
    days: d,
    navStart: n,
    navEnd: r,
    previousMonth: f,
    nextMonth: h,
    goToMonth: b,
    goToDay: (M) => {
      p(M) || b(M.date);
    }
  };
}
var Re;
(function(e) {
  e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(Re || (Re = {}));
function So(e) {
  return !e[re.disabled] && !e[re.hidden] && !e[re.outside];
}
function Ym(e, t, n, r) {
  let o, a = -1;
  for (const s of e) {
    const i = t(s);
    So(i) && (i[re.focused] && a < Re.FocusedModifier ? (o = s, a = Re.FocusedModifier) : r != null && r.isEqualTo(s) && a < Re.LastFocused ? (o = s, a = Re.LastFocused) : n(s.date) && a < Re.Selected ? (o = s, a = Re.Selected) : i[re.today] && a < Re.Today && (o = s, a = Re.Today));
  }
  return o || (o = e.find((s) => So(t(s)))), o;
}
function Bm(e, t, n, r, o, a, s) {
  const { ISOWeek: i, broadcastCalendar: c } = a, { addDays: l, addMonths: u, addWeeks: d, addYears: f, endOfBroadcastWeek: h, endOfISOWeek: v, endOfWeek: m, max: p, min: b, startOfBroadcastWeek: w, startOfISOWeek: y, startOfWeek: k } = s;
  let x = {
    day: l,
    week: d,
    month: u,
    year: f,
    startOfWeek: (S) => c ? w(S, s) : i ? y(S) : k(S),
    endOfWeek: (S) => c ? h(S) : i ? v(S) : m(S)
  }[e](n, t === "after" ? 1 : -1);
  return t === "before" && r ? x = p([r, x]) : t === "after" && o && (x = b([o, x])), x;
}
function us(e, t, n, r, o, a, s, i = 0) {
  if (i > 365)
    return;
  const c = Bm(e, t, n.date, r, o, a, s), l = !!(a.disabled && Ge(c, a.disabled, s)), u = !!(a.hidden && Ge(c, a.hidden, s)), d = c, f = new Xa(c, d, s);
  return !l && !u ? f : us(e, t, f, r, o, a, s, i + 1);
}
function Lm(e, t, n, r, o) {
  const { autoFocus: a } = e, [s, i] = ve(), c = Ym(t.days, n, r || (() => !1), s), [l, u] = ve(a ? c : void 0);
  return {
    isFocusTarget: (m) => !!(c != null && c.isEqualTo(m)),
    setFocused: u,
    focused: l,
    blur: () => {
      i(l), u(void 0);
    },
    moveFocus: (m, p) => {
      if (!l)
        return;
      const b = us(m, p, l, t.navStart, t.navEnd, e, o);
      b && (e.disableNavigation && !t.days.some((y) => y.isEqualTo(b)) || (t.goToDay(b), u(b)));
    }
  };
}
function Hm(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [a, s] = yn(n, o ? n : void 0), i = o ? n : a, { isSameDay: c } = t, l = (h) => (i == null ? void 0 : i.some((v) => c(v, h))) ?? !1, { min: u, max: d } = e;
  return {
    selected: i,
    select: (h, v, m) => {
      let p = [...i ?? []];
      if (l(h)) {
        if ((i == null ? void 0 : i.length) === u || r && (i == null ? void 0 : i.length) === 1)
          return;
        p = i == null ? void 0 : i.filter((b) => !c(b, h));
      } else
        (i == null ? void 0 : i.length) === d ? p = [h] : p = [...p, h];
      return o || s(p), o == null || o(p, h, v, m), p;
    },
    isSelected: l
  };
}
function zm(e, t, n = 0, r = 0, o = !1, a = ze) {
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
function Vm(e, t, n = ze) {
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
function Oo(e, t, n = ze) {
  return je(e, t.from, !1, n) || je(e, t.to, !1, n) || je(t, e.from, !1, n) || je(t, e.to, !1, n);
}
function jm(e, t, n = ze) {
  const r = Array.isArray(t) ? t : [t];
  if (r.filter((i) => typeof i != "function").some((i) => typeof i == "boolean" ? i : n.isDate(i) ? je(e, i, !1, n) : Za(i, n) ? i.some((c) => je(e, c, !1, n)) : vn(i) ? i.from && i.to ? Oo(e, { from: i.from, to: i.to }, n) : !1 : Qa(i) ? Vm(e, i.dayOfWeek, n) : Cr(i) ? n.isAfter(i.before, i.after) ? Oo(e, {
    from: n.addDays(i.after, 1),
    to: n.addDays(i.before, -1)
  }, n) : Ge(e.from, i, n) || Ge(e.to, i, n) : kr(i) || Mr(i) ? Ge(e.from, i, n) || Ge(e.to, i, n) : !1))
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
function Gm(e, t) {
  const { disabled: n, excludeDisabled: r, selected: o, required: a, onSelect: s } = e, [i, c] = yn(o, s ? o : void 0), l = s ? o : i;
  return {
    selected: l,
    select: (f, h, v) => {
      const { min: m, max: p } = e, b = f ? zm(f, l, m, p, a, t) : void 0;
      return r && n && (b != null && b.from) && b.to && jm({ from: b.from, to: b.to }, n, t) && (b.from = f, b.to = void 0), s || c(b), s == null || s(b, f, h, v), b;
    },
    isSelected: (f) => l && je(l, f, !1, t)
  };
}
function Um(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [a, s] = yn(n, o ? n : void 0), i = o ? n : a, { isSameDay: c } = t;
  return {
    selected: i,
    select: (d, f, h) => {
      let v = d;
      return !r && i && i && c(d, i) && (v = void 0), o || s(v), o == null || o(v, d, f, h), v;
    },
    isSelected: (d) => i ? c(i, d) : !1
  };
}
function qm(e, t) {
  const n = Um(e, t), r = Hm(e, t), o = Gm(e, t);
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
  return e instanceof de && e.timeZone === t ? e : new de(e, t);
}
function pt(e, t, n) {
  return Ce(e, t);
}
function Do(e, t, n) {
  return typeof e == "boolean" || typeof e == "function" ? e : e instanceof Date ? pt(e, t) : Array.isArray(e) ? e.map((r) => r instanceof Date ? pt(r, t) : r) : vn(e) ? {
    ...e,
    from: e.from ? Ce(e.from, t) : e.from,
    to: e.to ? Ce(e.to, t) : e.to
  } : Cr(e) ? {
    before: pt(e.before, t),
    after: pt(e.after, t)
  } : kr(e) ? {
    after: pt(e.after, t)
  } : Mr(e) ? {
    before: pt(e.before, t)
  } : e;
}
function Un(e, t, n) {
  return e && (Array.isArray(e) ? e.map((r) => Do(r, t)) : Do(e, t));
}
function ds(e) {
  var Yr;
  let t = e;
  const n = t.timeZone;
  if (n && (t = {
    ...e,
    timeZone: n
  }, t.today && (t.today = Ce(t.today, n)), t.month && (t.month = Ce(t.month, n)), t.defaultMonth && (t.defaultMonth = Ce(t.defaultMonth, n)), t.startMonth && (t.startMonth = Ce(t.startMonth, n)), t.endMonth && (t.endMonth = Ce(t.endMonth, n)), t.mode === "single" && t.selected ? t.selected = Ce(t.selected, n) : t.mode === "multiple" && t.selected ? t.selected = (Yr = t.selected) == null ? void 0 : Yr.map((z) => Ce(z, n)) : t.mode === "range" && t.selected && (t.selected = {
    from: t.selected.from ? Ce(t.selected.from, n) : t.selected.from,
    to: t.selected.to ? Ce(t.selected.to, n) : t.selected.to
  }), t.disabled !== void 0 && (t.disabled = Un(t.disabled, n)), t.hidden !== void 0 && (t.hidden = Un(t.hidden, n)), t.modifiers)) {
    const z = {};
    Object.keys(t.modifiers).forEach((X) => {
      var L;
      z[X] = Un((L = t.modifiers) == null ? void 0 : L[X], n);
    }), t.modifiers = z;
  }
  const { components: r, formatters: o, labels: a, dateLib: s, locale: i, classNames: c } = Fe(() => {
    const z = { ...qa, ...t.locale }, X = t.broadcastCalendar ? 1 : t.weekStartsOn, L = t.noonSafe && t.timeZone ? Sm(t.timeZone, {
      weekStartsOn: X,
      locale: z
    }) : void 0, q = t.dateLib && L ? { ...L, ...t.dateLib } : t.dateLib ?? L, pe = new ue({
      locale: z,
      weekStartsOn: X,
      firstWeekContainsDate: t.firstWeekContainsDate,
      useAdditionalWeekYearTokens: t.useAdditionalWeekYearTokens,
      useAdditionalDayOfYearTokens: t.useAdditionalDayOfYearTokens,
      timeZone: t.timeZone,
      numerals: t.numerals
    }, q);
    return {
      dateLib: pe,
      components: om(t.components),
      formatters: pm(t.formatters),
      labels: wm(t.labels, pe.options),
      locale: z,
      classNames: { ...sm(), ...t.classNames }
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
  const { captionLayout: l, mode: u, navLayout: d, numberOfMonths: f = 1, onDayBlur: h, onDayClick: v, onDayFocus: m, onDayKeyDown: p, onDayMouseEnter: b, onDayMouseLeave: w, onNextClick: y, onPrevClick: k, showWeekNumber: M, styles: x } = t, { formatCaption: S, formatDay: R, formatMonthDropdown: $, formatWeekNumber: T, formatWeekNumberHeader: _, formatWeekdayName: F, formatYearDropdown: j } = o, O = Fm(t, s), { days: E, months: D, navStart: A, navEnd: N, previousMonth: W, nextMonth: I, goToMonth: B } = O, Z = nm(E, t, A, N, s), { isSelected: J, select: ne, selected: le } = qm(t, s) ?? {}, { blur: ke, focused: fe, isFocusTarget: Ee, moveFocus: he, setFocused: oe } = Lm(t, O, Z, J ?? (() => !1), s), { labelDayButton: me, labelGridcell: Ae, labelGrid: we, labelMonthDropdown: jt, labelNav: Gt, labelPrevious: On, labelNext: Dn, labelWeekday: Nn, labelWeekNumber: ut, labelWeekNumberHeader: hi, labelYearDropdown: mi } = a, pi = Fe(() => km(s, t.ISOWeek, t.broadcastCalendar, t.today), [s, t.ISOWeek, t.broadcastCalendar, t.today]), $r = u !== void 0 || v !== void 0, Pn = xe(() => {
    W && (B(W), k == null || k(W));
  }, [W, B, k]), En = xe(() => {
    I && (B(I), y == null || y(I));
  }, [B, I, y]), gi = xe((z, X) => (L) => {
    L.preventDefault(), L.stopPropagation(), oe(z), !X.disabled && (ne == null || ne(z.date, X, L), v == null || v(z.date, X, L));
  }, [ne, v, oe]), bi = xe((z, X) => (L) => {
    oe(z), m == null || m(z.date, X, L);
  }, [m, oe]), vi = xe((z, X) => (L) => {
    ke(), h == null || h(z.date, X, L);
  }, [ke, h]), yi = xe((z, X) => (L) => {
    const q = {
      ArrowLeft: [
        L.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "after" : "before"
      ],
      ArrowRight: [
        L.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "before" : "after"
      ],
      ArrowDown: [L.shiftKey ? "year" : "week", "after"],
      ArrowUp: [L.shiftKey ? "year" : "week", "before"],
      PageUp: [L.shiftKey ? "year" : "month", "before"],
      PageDown: [L.shiftKey ? "year" : "month", "after"],
      Home: ["startOfWeek", "before"],
      End: ["endOfWeek", "after"]
    };
    if (q[L.key]) {
      L.preventDefault(), L.stopPropagation();
      const [pe, G] = q[L.key];
      he(pe, G);
    }
    p == null || p(z.date, X, L);
  }, [he, p, t.dir]), wi = xe((z, X) => (L) => {
    b == null || b(z.date, X, L);
  }, [b]), xi = xe((z, X) => (L) => {
    w == null || w(z.date, X, L);
  }, [w]), Ci = xe((z) => (X) => {
    const L = Number(X.target.value), q = s.setMonth(s.startOfMonth(z), L);
    B(q);
  }, [s, B]), ki = xe((z) => (X) => {
    const L = Number(X.target.value), q = s.setYear(s.startOfMonth(z), L);
    B(q);
  }, [s, B]), { className: Mi, style: Si } = Fe(() => ({
    className: [c[Y.Root], t.className].filter(Boolean).join(" "),
    style: { ...x == null ? void 0 : x[Y.Root], ...t.style }
  }), [c, t.className, t.style, x]), Oi = am(t), Fr = bt(null);
  Pm(Fr, !!t.animate, {
    classNames: c,
    months: D,
    focused: fe,
    dateLib: s
  });
  const Di = {
    dayPickerProps: t,
    selected: le,
    select: ne,
    isSelected: J,
    months: D,
    nextMonth: I,
    previousMonth: W,
    goToMonth: B,
    getModifiers: Z,
    components: r,
    classNames: c,
    styles: x,
    labels: a,
    formatters: o
  };
  return P.createElement(
    Ka.Provider,
    { value: Di },
    P.createElement(
      r.Root,
      { rootRef: t.animate ? Fr : void 0, className: Mi, style: Si, dir: t.dir, id: t.id, lang: t.lang, nonce: t.nonce, title: t.title, role: t.role, "aria-label": t["aria-label"], "aria-labelledby": t["aria-labelledby"], ...Oi },
      P.createElement(
        r.Months,
        { className: c[Y.Months], style: x == null ? void 0 : x[Y.Months] },
        !t.hideNavigation && !d && P.createElement(r.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: c[Y.Nav], style: x == null ? void 0 : x[Y.Nav], "aria-label": Gt(), onPreviousClick: Pn, onNextClick: En, previousMonth: W, nextMonth: I }),
        D.map((z, X) => P.createElement(
          r.Month,
          {
            "data-animated-month": t.animate ? "true" : void 0,
            className: c[Y.Month],
            style: x == null ? void 0 : x[Y.Month],
            // biome-ignore lint/suspicious/noArrayIndexKey: breaks animation
            key: X,
            displayIndex: X,
            calendarMonth: z
          },
          d === "around" && !t.hideNavigation && X === 0 && P.createElement(
            r.PreviousMonthButton,
            { type: "button", className: c[Y.PreviousMonthButton], tabIndex: W ? void 0 : -1, "aria-disabled": W ? void 0 : !0, "aria-label": On(W), onClick: Pn, "data-animated-button": t.animate ? "true" : void 0 },
            P.createElement(r.Chevron, { disabled: W ? void 0 : !0, className: c[Y.Chevron], orientation: t.dir === "rtl" ? "right" : "left" })
          ),
          P.createElement(r.MonthCaption, { "data-animated-caption": t.animate ? "true" : void 0, className: c[Y.MonthCaption], style: x == null ? void 0 : x[Y.MonthCaption], calendarMonth: z, displayIndex: X }, l != null && l.startsWith("dropdown") ? P.createElement(
            r.DropdownNav,
            { className: c[Y.Dropdowns], style: x == null ? void 0 : x[Y.Dropdowns] },
            (() => {
              const L = l === "dropdown" || l === "dropdown-months" ? P.createElement(r.MonthsDropdown, { key: "month", className: c[Y.MonthsDropdown], "aria-label": jt(), classNames: c, components: r, disabled: !!t.disableNavigation, onChange: Ci(z.date), options: xm(z.date, A, N, o, s), style: x == null ? void 0 : x[Y.Dropdown], value: s.getMonth(z.date) }) : P.createElement("span", { key: "month" }, $(z.date, s)), q = l === "dropdown" || l === "dropdown-years" ? P.createElement(r.YearsDropdown, { key: "year", className: c[Y.YearsDropdown], "aria-label": mi(s.options), classNames: c, components: r, disabled: !!t.disableNavigation, onChange: ki(z.date), options: Mm(A, N, o, s, !!t.reverseYears), style: x == null ? void 0 : x[Y.Dropdown], value: s.getYear(z.date) }) : P.createElement("span", { key: "year" }, j(z.date, s));
              return s.getMonthYearOrder() === "year-first" ? [q, L] : [L, q];
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
            } }, S(z.date, s.options, s))
          ) : P.createElement(r.CaptionLabel, { className: c[Y.CaptionLabel], role: "status", "aria-live": "polite" }, S(z.date, s.options, s))),
          d === "around" && !t.hideNavigation && X === f - 1 && P.createElement(
            r.NextMonthButton,
            { type: "button", className: c[Y.NextMonthButton], tabIndex: I ? void 0 : -1, "aria-disabled": I ? void 0 : !0, "aria-label": Dn(I), onClick: En, "data-animated-button": t.animate ? "true" : void 0 },
            P.createElement(r.Chevron, { disabled: I ? void 0 : !0, className: c[Y.Chevron], orientation: t.dir === "rtl" ? "left" : "right" })
          ),
          X === f - 1 && d === "after" && !t.hideNavigation && P.createElement(r.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: c[Y.Nav], style: x == null ? void 0 : x[Y.Nav], "aria-label": Gt(), onPreviousClick: Pn, onNextClick: En, previousMonth: W, nextMonth: I }),
          P.createElement(
            r.MonthGrid,
            { role: "grid", "aria-multiselectable": u === "multiple" || u === "range", "aria-label": we(z.date, s.options, s) || void 0, className: c[Y.MonthGrid], style: x == null ? void 0 : x[Y.MonthGrid] },
            !t.hideWeekdays && P.createElement(
              r.Weekdays,
              { "data-animated-weekdays": t.animate ? "true" : void 0, className: c[Y.Weekdays], style: x == null ? void 0 : x[Y.Weekdays] },
              M && P.createElement(r.WeekNumberHeader, { "aria-label": hi(s.options), className: c[Y.WeekNumberHeader], style: x == null ? void 0 : x[Y.WeekNumberHeader], scope: "col" }, _()),
              pi.map((L) => P.createElement(r.Weekday, { "aria-label": Nn(L, s.options, s), className: c[Y.Weekday], key: String(L), style: x == null ? void 0 : x[Y.Weekday], scope: "col" }, F(L, s.options, s)))
            ),
            P.createElement(r.Weeks, { "data-animated-weeks": t.animate ? "true" : void 0, className: c[Y.Weeks], style: x == null ? void 0 : x[Y.Weeks] }, z.weeks.map((L) => P.createElement(
              r.Week,
              { className: c[Y.Week], key: L.weekNumber, style: x == null ? void 0 : x[Y.Week], week: L },
              M && P.createElement(r.WeekNumber, { week: L, style: x == null ? void 0 : x[Y.WeekNumber], "aria-label": ut(L.weekNumber, {
                locale: i
              }), className: c[Y.WeekNumber], scope: "row", role: "rowheader" }, T(L.weekNumber, s)),
              L.days.map((q) => {
                const { date: pe } = q, G = Z(q);
                if (G[re.focused] = !G.hidden && !!(fe != null && fe.isEqualTo(q)), G[Se.selected] = (J == null ? void 0 : J(pe)) || G.selected, vn(le)) {
                  const { from: An, to: Rn } = le;
                  G[Se.range_start] = !!(An && Rn && s.isSameDay(pe, An)), G[Se.range_end] = !!(An && Rn && s.isSameDay(pe, Rn)), G[Se.range_middle] = je(le, pe, !0, s);
                }
                const Ni = Cm(G, x, t.modifiersStyles), Pi = rm(G, c, t.modifiersClassNames), Ei = !$r && !G.hidden ? Ae(pe, G, s.options, s) : void 0;
                return P.createElement(r.Day, { key: `${q.isoDate}_${q.displayMonthId}`, day: q, modifiers: G, className: Pi.join(" "), style: Ni, role: "gridcell", "aria-selected": G.selected || void 0, "aria-label": Ei, "data-day": q.isoDate, "data-month": q.outside ? q.dateMonthId : void 0, "data-selected": G.selected || void 0, "data-disabled": G.disabled || void 0, "data-hidden": G.hidden || void 0, "data-outside": q.outside || void 0, "data-focused": G.focused || void 0, "data-today": G.today || void 0 }, !G.hidden && $r ? P.createElement(r.DayButton, { className: c[Y.DayButton], style: x == null ? void 0 : x[Y.DayButton], type: "button", day: q, modifiers: G, disabled: !G.focused && G.disabled || void 0, "aria-disabled": G.focused && G.disabled || void 0, tabIndex: Ee(q) ? 0 : -1, "aria-label": me(pe, G, s.options, s), onClick: gi(q, G), onBlur: vi(q, G), onFocus: bi(q, G), onKeyDown: yi(q, G), onMouseEnter: wi(q, G), onMouseLeave: xi(q, G) }, R(pe, s.options, s)) : !G.hidden && R(q.date, s.options, s));
              })
            )))
          )
        ))
      ),
      t.footer && P.createElement(r.Footer, { className: c[Y.Footer], style: x == null ? void 0 : x[Y.Footer], role: "status", "aria-live": "polite" }, t.footer)
    )
  );
}
const fs = {
  ...Oh,
  labels: {
    labelDayButton: (e, t, n, r) => {
      let a = (r ?? new ue(n)).format(e, "PPPP");
      return t.today && (a = `오늘, ${a}`), t.selected && (a = `${a}, 선택됨`), a;
    },
    labelMonthDropdown: "월 선택",
    labelNext: "다음 달로 이동",
    labelPrevious: "이전 달로 이동",
    labelWeekNumber: (e) => `주 ${e}`,
    labelYearDropdown: "연도 선택",
    labelGrid: (e, t, n) => (n ?? new ue(t)).formatMonthYear(e),
    labelGridcell: (e, t, n, r) => {
      let a = (r ?? new ue(n)).format(e, "PPPP");
      return t != null && t.today && (a = `오늘, ${a}`), a;
    },
    labelNav: "탐색 모음",
    labelWeekNumberHeader: "주 번호",
    labelWeekday: (e, t, n) => (n ?? new ue(t)).format(e, "cccc")
  }
};
var Xm = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Km(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var hs = { exports: {} };
(function(e, t) {
  (function(n, r) {
    e.exports = r();
  })(Xm, function() {
    var n = 1e3, r = 6e4, o = 36e5, a = "millisecond", s = "second", i = "minute", c = "hour", l = "day", u = "week", d = "month", f = "quarter", h = "year", v = "date", m = "Invalid Date", p = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, b = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, w = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(O) {
      var E = ["th", "st", "nd", "rd"], D = O % 100;
      return "[" + O + (E[(D - 20) % 10] || E[D] || E[0]) + "]";
    } }, y = function(O, E, D) {
      var A = String(O);
      return !A || A.length >= E ? O : "" + Array(E + 1 - A.length).join(D) + O;
    }, k = { s: y, z: function(O) {
      var E = -O.utcOffset(), D = Math.abs(E), A = Math.floor(D / 60), N = D % 60;
      return (E <= 0 ? "+" : "-") + y(A, 2, "0") + ":" + y(N, 2, "0");
    }, m: function O(E, D) {
      if (E.date() < D.date()) return -O(D, E);
      var A = 12 * (D.year() - E.year()) + (D.month() - E.month()), N = E.clone().add(A, d), W = D - N < 0, I = E.clone().add(A + (W ? -1 : 1), d);
      return +(-(A + (D - N) / (W ? N - I : I - N)) || 0);
    }, a: function(O) {
      return O < 0 ? Math.ceil(O) || 0 : Math.floor(O);
    }, p: function(O) {
      return { M: d, y: h, w: u, d: l, D: v, h: c, m: i, s, ms: a, Q: f }[O] || String(O || "").toLowerCase().replace(/s$/, "");
    }, u: function(O) {
      return O === void 0;
    } }, M = "en", x = {};
    x[M] = w;
    var S = "$isDayjsObject", R = function(O) {
      return O instanceof F || !(!O || !O[S]);
    }, $ = function O(E, D, A) {
      var N;
      if (!E) return M;
      if (typeof E == "string") {
        var W = E.toLowerCase();
        x[W] && (N = W), D && (x[W] = D, N = W);
        var I = E.split("-");
        if (!N && I.length > 1) return O(I[0]);
      } else {
        var B = E.name;
        x[B] = E, N = B;
      }
      return !A && N && (M = N), N || !A && M;
    }, T = function(O, E) {
      if (R(O)) return O.clone();
      var D = typeof E == "object" ? E : {};
      return D.date = O, D.args = arguments, new F(D);
    }, _ = k;
    _.l = $, _.i = R, _.w = function(O, E) {
      return T(O, { locale: E.$L, utc: E.$u, x: E.$x, $offset: E.$offset });
    };
    var F = function() {
      function O(D) {
        this.$L = $(D.locale, null, !0), this.parse(D), this.$x = this.$x || D.x || {}, this[S] = !0;
      }
      var E = O.prototype;
      return E.parse = function(D) {
        this.$d = function(A) {
          var N = A.date, W = A.utc;
          if (N === null) return /* @__PURE__ */ new Date(NaN);
          if (_.u(N)) return /* @__PURE__ */ new Date();
          if (N instanceof Date) return new Date(N);
          if (typeof N == "string" && !/Z$/i.test(N)) {
            var I = N.match(p);
            if (I) {
              var B = I[2] - 1 || 0, Z = (I[7] || "0").substring(0, 3);
              return W ? new Date(Date.UTC(I[1], B, I[3] || 1, I[4] || 0, I[5] || 0, I[6] || 0, Z)) : new Date(I[1], B, I[3] || 1, I[4] || 0, I[5] || 0, I[6] || 0, Z);
            }
          }
          return new Date(N);
        }(D), this.init();
      }, E.init = function() {
        var D = this.$d;
        this.$y = D.getFullYear(), this.$M = D.getMonth(), this.$D = D.getDate(), this.$W = D.getDay(), this.$H = D.getHours(), this.$m = D.getMinutes(), this.$s = D.getSeconds(), this.$ms = D.getMilliseconds();
      }, E.$utils = function() {
        return _;
      }, E.isValid = function() {
        return this.$d.toString() !== m;
      }, E.isSame = function(D, A) {
        var N = T(D);
        return this.startOf(A) <= N && N <= this.endOf(A);
      }, E.isAfter = function(D, A) {
        return T(D) < this.startOf(A);
      }, E.isBefore = function(D, A) {
        return this.endOf(A) < T(D);
      }, E.$g = function(D, A, N) {
        return _.u(D) ? this[A] : this.set(N, D);
      }, E.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, E.valueOf = function() {
        return this.$d.getTime();
      }, E.startOf = function(D, A) {
        var N = this, W = !!_.u(A) || A, I = _.p(D), B = function(he, oe) {
          var me = _.w(N.$u ? Date.UTC(N.$y, oe, he) : new Date(N.$y, oe, he), N);
          return W ? me : me.endOf(l);
        }, Z = function(he, oe) {
          return _.w(N.toDate()[he].apply(N.toDate("s"), (W ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(oe)), N);
        }, J = this.$W, ne = this.$M, le = this.$D, ke = "set" + (this.$u ? "UTC" : "");
        switch (I) {
          case h:
            return W ? B(1, 0) : B(31, 11);
          case d:
            return W ? B(1, ne) : B(0, ne + 1);
          case u:
            var fe = this.$locale().weekStart || 0, Ee = (J < fe ? J + 7 : J) - fe;
            return B(W ? le - Ee : le + (6 - Ee), ne);
          case l:
          case v:
            return Z(ke + "Hours", 0);
          case c:
            return Z(ke + "Minutes", 1);
          case i:
            return Z(ke + "Seconds", 2);
          case s:
            return Z(ke + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, E.endOf = function(D) {
        return this.startOf(D, !1);
      }, E.$set = function(D, A) {
        var N, W = _.p(D), I = "set" + (this.$u ? "UTC" : ""), B = (N = {}, N[l] = I + "Date", N[v] = I + "Date", N[d] = I + "Month", N[h] = I + "FullYear", N[c] = I + "Hours", N[i] = I + "Minutes", N[s] = I + "Seconds", N[a] = I + "Milliseconds", N)[W], Z = W === l ? this.$D + (A - this.$W) : A;
        if (W === d || W === h) {
          var J = this.clone().set(v, 1);
          J.$d[B](Z), J.init(), this.$d = J.set(v, Math.min(this.$D, J.daysInMonth())).$d;
        } else B && this.$d[B](Z);
        return this.init(), this;
      }, E.set = function(D, A) {
        return this.clone().$set(D, A);
      }, E.get = function(D) {
        return this[_.p(D)]();
      }, E.add = function(D, A) {
        var N, W = this;
        D = Number(D);
        var I = _.p(A), B = function(ne) {
          var le = T(W);
          return _.w(le.date(le.date() + Math.round(ne * D)), W);
        };
        if (I === d) return this.set(d, this.$M + D);
        if (I === h) return this.set(h, this.$y + D);
        if (I === l) return B(1);
        if (I === u) return B(7);
        var Z = (N = {}, N[i] = r, N[c] = o, N[s] = n, N)[I] || 1, J = this.$d.getTime() + D * Z;
        return _.w(J, this);
      }, E.subtract = function(D, A) {
        return this.add(-1 * D, A);
      }, E.format = function(D) {
        var A = this, N = this.$locale();
        if (!this.isValid()) return N.invalidDate || m;
        var W = D || "YYYY-MM-DDTHH:mm:ssZ", I = _.z(this), B = this.$H, Z = this.$m, J = this.$M, ne = N.weekdays, le = N.months, ke = N.meridiem, fe = function(oe, me, Ae, we) {
          return oe && (oe[me] || oe(A, W)) || Ae[me].slice(0, we);
        }, Ee = function(oe) {
          return _.s(B % 12 || 12, oe, "0");
        }, he = ke || function(oe, me, Ae) {
          var we = oe < 12 ? "AM" : "PM";
          return Ae ? we.toLowerCase() : we;
        };
        return W.replace(b, function(oe, me) {
          return me || function(Ae) {
            switch (Ae) {
              case "YY":
                return String(A.$y).slice(-2);
              case "YYYY":
                return _.s(A.$y, 4, "0");
              case "M":
                return J + 1;
              case "MM":
                return _.s(J + 1, 2, "0");
              case "MMM":
                return fe(N.monthsShort, J, le, 3);
              case "MMMM":
                return fe(le, J);
              case "D":
                return A.$D;
              case "DD":
                return _.s(A.$D, 2, "0");
              case "d":
                return String(A.$W);
              case "dd":
                return fe(N.weekdaysMin, A.$W, ne, 2);
              case "ddd":
                return fe(N.weekdaysShort, A.$W, ne, 3);
              case "dddd":
                return ne[A.$W];
              case "H":
                return String(B);
              case "HH":
                return _.s(B, 2, "0");
              case "h":
                return Ee(1);
              case "hh":
                return Ee(2);
              case "a":
                return he(B, Z, !0);
              case "A":
                return he(B, Z, !1);
              case "m":
                return String(Z);
              case "mm":
                return _.s(Z, 2, "0");
              case "s":
                return String(A.$s);
              case "ss":
                return _.s(A.$s, 2, "0");
              case "SSS":
                return _.s(A.$ms, 3, "0");
              case "Z":
                return I;
            }
            return null;
          }(oe) || I.replace(":", "");
        });
      }, E.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, E.diff = function(D, A, N) {
        var W, I = this, B = _.p(A), Z = T(D), J = (Z.utcOffset() - this.utcOffset()) * r, ne = this - Z, le = function() {
          return _.m(I, Z);
        };
        switch (B) {
          case h:
            W = le() / 12;
            break;
          case d:
            W = le();
            break;
          case f:
            W = le() / 3;
            break;
          case u:
            W = (ne - J) / 6048e5;
            break;
          case l:
            W = (ne - J) / 864e5;
            break;
          case c:
            W = ne / o;
            break;
          case i:
            W = ne / r;
            break;
          case s:
            W = ne / n;
            break;
          default:
            W = ne;
        }
        return N ? W : _.a(W);
      }, E.daysInMonth = function() {
        return this.endOf(d).$D;
      }, E.$locale = function() {
        return x[this.$L];
      }, E.locale = function(D, A) {
        if (!D) return this.$L;
        var N = this.clone(), W = $(D, A, !0);
        return W && (N.$L = W), N;
      }, E.clone = function() {
        return _.w(this.$d, this);
      }, E.toDate = function() {
        return new Date(this.valueOf());
      }, E.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, E.toISOString = function() {
        return this.$d.toISOString();
      }, E.toString = function() {
        return this.$d.toUTCString();
      }, O;
    }(), j = F.prototype;
    return T.prototype = j, [["$ms", a], ["$s", s], ["$m", i], ["$H", c], ["$W", l], ["$M", d], ["$y", h], ["$D", v]].forEach(function(O) {
      j[O[1]] = function(E) {
        return this.$g(E, O[0], O[1]);
      };
    }), T.extend = function(O, E) {
      return O.$i || (O(E, F, T), O.$i = !0), T;
    }, T.locale = $, T.isDayjs = R, T.unix = function(O) {
      return T(1e3 * O);
    }, T.en = x[M], T.Ls = x, T.p = {}, T;
  });
})(hs);
var Qm = hs.exports;
const se = /* @__PURE__ */ Km(Qm), Zm = P.forwardRef(
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
    const [f, h] = ve(!1), [v, m] = ve(
      e ? se(e) : void 0
    );
    Wt(() => {
      m(e ? se(e) : void 0);
    }, [e]);
    const p = Fe(() => v == null ? void 0 : v.toDate(), [v]), b = (x) => {
      if (!x) {
        m(void 0);
        return;
      }
      const S = se(x);
      m(S);
    }, w = () => {
      v && (t == null || t(v.format("YYYY-MM-DD")), h(!1));
    }, y = () => {
      m(e ? se(e) : void 0), h(!1);
    }, k = Fe(() => e ? se(e).format("YYYY-MM-DD") : "", [e]), M = Fe(() => {
      const x = [];
      return o && x.push({ before: se(o).toDate() }), a && x.push({ after: se(a).toDate() }), x.length > 0 ? x : void 0;
    }, [o, a]);
    return /* @__PURE__ */ U("div", { ref: d, className: H("flex flex-col gap-1", u), children: [
      n && /* @__PURE__ */ C("label", { className: "text-sm font-medium text-gray-700", children: n }),
      /* @__PURE__ */ U(gr, { open: f && !s, onOpenChange: h, children: [
        /* @__PURE__ */ C(br, { asChild: !0, children: /* @__PURE__ */ C("div", { className: "relative", children: /* @__PURE__ */ C(
          "input",
          {
            type: "text",
            readOnly: !0,
            value: k,
            placeholder: r,
            disabled: s,
            className: H(
              "w-full h-10 px-3 border rounded bg-white text-sm cursor-pointer hover:bg-gray-50 hover:border-gray-400 focus:outline-none transition-all duration-150",
              i ? "border-red-500" : "border-gray-300",
              s && "bg-gray-100 cursor-not-allowed hover:bg-gray-100 hover:border-gray-300"
            )
          }
        ) }) }),
        /* @__PURE__ */ C(vr, { children: /* @__PURE__ */ U(
          bn,
          {
            align: "start",
            sideOffset: 5,
            className: "z-50 bg-white rounded-lg shadow-xl p-2 border border-gray-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
            children: [
              /* @__PURE__ */ C("div", { className: "date-picker-calendar", children: /* @__PURE__ */ C(
                ds,
                {
                  mode: "single",
                  selected: p,
                  onSelect: b,
                  locale: fs,
                  disabled: M,
                  formatters: {
                    formatCaption: (x) => `${x.getFullYear()}년 ${x.getMonth() + 1}월`
                  }
                }
              ) }),
              /* @__PURE__ */ U("div", { className: "flex items-end justify-between mt-2 pt-2 border-t border-gray-200", children: [
                /* @__PURE__ */ C("div", { className: "flex flex-col min-h-[32px]", children: v ? /* @__PURE__ */ C("span", { className: "text-xs text-gray-700", children: v.format("YYYY-MM-DD") }) : /* @__PURE__ */ C("span", { className: "text-xs text-red-500", children: "날짜를 선택해 주세요." }) }),
                /* @__PURE__ */ U("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ C(
                    "button",
                    {
                      onClick: y,
                      className: "w-[60px] h-8 border border-gray-300 rounded text-xs font-medium text-gray-700 hover:bg-gray-50 active:scale-95 transition-all duration-150",
                      children: "취소"
                    }
                  ),
                  /* @__PURE__ */ C(
                    "button",
                    {
                      onClick: w,
                      disabled: !v,
                      className: "w-[60px] h-8 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700 active:scale-95 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:active:scale-100 transition-all duration-150",
                      children: "적용"
                    }
                  )
                ] })
              ] })
            ]
          }
        ) })
      ] }),
      (l || c) && /* @__PURE__ */ C("div", { children: i && c ? /* @__PURE__ */ C("p", { className: "text-xs text-red-500", children: c }) : l && /* @__PURE__ */ C("p", { className: "text-xs text-gray-500", children: l }) })
    ] });
  }
);
Zm.displayName = "DatePicker";
const Jm = () => {
  const e = se();
  return [
    {
      label: "전체",
      getValue: () => [se("2000-01-01"), se("2099-12-31")]
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
}, ep = P.forwardRef(
  ({
    value: e,
    onChange: t,
    startLabel: n = "시작일자",
    endLabel: r = "종료일자",
    className: o
  }, a) => {
    const [s, i] = ve(!1), [c, l] = ve([
      e != null && e.start ? se(e.start) : void 0,
      e != null && e.end ? se(e.end) : void 0
    ]);
    Wt(() => {
      e && l([
        e.start ? se(e.start) : void 0,
        e.end ? se(e.end) : void 0
      ]);
    }, [e]);
    const [u, d] = c, f = Fe(() => {
      if (u)
        return {
          from: u.toDate(),
          to: d == null ? void 0 : d.toDate()
        };
    }, [u, d]), h = (y) => {
      const [k, M] = y.getValue();
      l([k, M]);
    }, v = (y) => {
      if (!y) {
        l([void 0, void 0]);
        return;
      }
      const k = y.from ? se(y.from) : void 0, M = y.to ? se(y.to) : void 0;
      l([k, M]);
    }, m = () => {
      u && d && (t == null || t({
        start: u.format("YYYY-MM-DD"),
        end: d.format("YYYY-MM-DD")
      }), i(!1));
    }, p = () => {
      l([
        e != null && e.start ? se(e.start) : void 0,
        e != null && e.end ? se(e.end) : void 0
      ]), i(!1);
    }, b = Fe(() => {
      if (!(!u || !d))
        return d.diff(u, "day") + 1;
    }, [u, d]), w = Fe(() => !(e != null && e.start) || !(e != null && e.end) ? { start: "", end: "" } : {
      start: se(e.start).format("YYYY-MM-DD"),
      end: se(e.end).format("YYYY-MM-DD")
    }, [e]);
    return /* @__PURE__ */ U(gr, { open: s, onOpenChange: i, children: [
      /* @__PURE__ */ C(br, { asChild: !0, children: /* @__PURE__ */ U(
        "div",
        {
          ref: a,
          className: H("flex items-center gap-0", o),
          children: [
            /* @__PURE__ */ U("div", { className: "relative flex-1", children: [
              /* @__PURE__ */ C("label", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 pointer-events-none", children: n }),
              /* @__PURE__ */ C(
                "input",
                {
                  type: "text",
                  readOnly: !0,
                  value: w.start,
                  placeholder: "YYYY-MM-DD",
                  className: "w-full h-10 pl-[59px] pr-3 border border-gray-300 border-r-0 rounded-l bg-white text-sm cursor-pointer hover:bg-gray-50 hover:border-gray-400 focus:outline-none transition-all duration-150"
                }
              )
            ] }),
            /* @__PURE__ */ U("div", { className: "relative flex-1", children: [
              /* @__PURE__ */ C("label", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 pointer-events-none", children: r }),
              /* @__PURE__ */ C(
                "input",
                {
                  type: "text",
                  readOnly: !0,
                  value: w.end,
                  placeholder: "YYYY-MM-DD",
                  className: "w-full h-10 pl-[59px] pr-3 border border-gray-300 rounded-r bg-white text-sm cursor-pointer hover:bg-gray-50 hover:border-gray-400 focus:outline-none transition-all duration-150"
                }
              )
            ] })
          ]
        }
      ) }),
      /* @__PURE__ */ C(vr, { children: /* @__PURE__ */ U(
        bn,
        {
          align: "start",
          sideOffset: 5,
          className: "z-50 bg-white rounded-lg shadow-xl p-2 border border-gray-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
          children: [
            /* @__PURE__ */ U("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ C("div", { className: "flex flex-col border-r border-gray-200 pr-2", children: Jm().map((y) => /* @__PURE__ */ C(
                "button",
                {
                  onClick: () => h(y),
                  className: "w-[70px] h-[26px] px-2 text-left text-xs text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:font-medium border-b border-gray-200 last:border-b-0 transition-all duration-150 rounded-sm",
                  children: y.label
                },
                y.label
              )) }),
              /* @__PURE__ */ C("div", { className: "date-range-picker-calendar", children: /* @__PURE__ */ C(
                ds,
                {
                  mode: "range",
                  selected: f,
                  onSelect: v,
                  numberOfMonths: 2,
                  locale: fs,
                  formatters: {
                    formatCaption: (y) => `${y.getFullYear()}년 ${y.getMonth() + 1}월`
                  }
                }
              ) })
            ] }),
            /* @__PURE__ */ U("div", { className: "flex items-end justify-between mt-2 pt-2 border-t border-gray-200", children: [
              /* @__PURE__ */ C("div", { className: "flex flex-col min-h-[32px]", children: !u || !d ? /* @__PURE__ */ C("span", { className: "text-xs text-red-500", children: "종료일자를 선택해 주세요." }) : /* @__PURE__ */ U(Po, { children: [
                /* @__PURE__ */ U("span", { className: "text-xs text-gray-700", children: [
                  u.format("YYYY-MM-DD"),
                  " ~",
                  " ",
                  d.format("YYYY-MM-DD")
                ] }),
                /* @__PURE__ */ U("span", { className: "text-xs text-gray-500", children: [
                  "(",
                  b,
                  "일간)"
                ] })
              ] }) }),
              /* @__PURE__ */ U("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ C(
                  "button",
                  {
                    onClick: p,
                    className: "w-[60px] h-8 border border-gray-300 rounded text-xs font-medium text-gray-700 hover:bg-gray-50 active:scale-95 transition-all duration-150",
                    children: "취소"
                  }
                ),
                /* @__PURE__ */ C(
                  "button",
                  {
                    onClick: m,
                    disabled: !u || !d,
                    className: "w-[60px] h-8 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700 active:scale-95 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:active:scale-100 transition-all duration-150",
                    children: "적용"
                  }
                )
              ] })
            ] })
          ]
        }
      ) })
    ] });
  }
);
ep.displayName = "DateRangePicker";
function Dr(e) {
  const t = g.useRef({ value: e, previous: e });
  return g.useMemo(() => (t.current.value !== e && (t.current.previous = t.current.value, t.current.value = e), t.current.previous), [e]);
}
var wn = "Switch", [tp] = Le(wn), [np, rp] = tp(wn), ms = g.forwardRef(
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
    } = e, [f, h] = g.useState(null), v = ie(t, (y) => h(y)), m = g.useRef(!1), p = f ? u || !!f.closest("form") : !0, [b, w] = ot({
      prop: o,
      defaultProp: a ?? !1,
      onChange: l,
      caller: wn
    });
    return /* @__PURE__ */ U(np, { scope: n, checked: b, disabled: i, children: [
      /* @__PURE__ */ C(
        te.button,
        {
          type: "button",
          role: "switch",
          "aria-checked": b,
          "aria-required": s,
          "data-state": vs(b),
          "data-disabled": i ? "" : void 0,
          disabled: i,
          value: c,
          ...d,
          ref: v,
          onClick: ae(e.onClick, (y) => {
            w((k) => !k), p && (m.current = y.isPropagationStopped(), m.current || y.stopPropagation());
          })
        }
      ),
      p && /* @__PURE__ */ C(
        bs,
        {
          control: f,
          bubbles: !m.current,
          name: r,
          value: c,
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
ms.displayName = wn;
var ps = "SwitchThumb", gs = g.forwardRef(
  (e, t) => {
    const { __scopeSwitch: n, ...r } = e, o = rp(ps, n);
    return /* @__PURE__ */ C(
      te.span,
      {
        "data-state": vs(o.checked),
        "data-disabled": o.disabled ? "" : void 0,
        ...r,
        ref: t
      }
    );
  }
);
gs.displayName = ps;
var op = "SwitchBubbleInput", bs = g.forwardRef(
  ({
    __scopeSwitch: e,
    control: t,
    checked: n,
    bubbles: r = !0,
    ...o
  }, a) => {
    const s = g.useRef(null), i = ie(s, a), c = Dr(n), l = mn(t);
    return g.useEffect(() => {
      const u = s.current;
      if (!u) return;
      const d = window.HTMLInputElement.prototype, h = Object.getOwnPropertyDescriptor(
        d,
        "checked"
      ).set;
      if (c !== n && h) {
        const v = new Event("click", { bubbles: r });
        h.call(u, n), u.dispatchEvent(v);
      }
    }, [c, n, r]), /* @__PURE__ */ C(
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
bs.displayName = op;
function vs(e) {
  return e ? "checked" : "unchecked";
}
var ys = ms, ap = gs;
const sp = Ne(
  H(
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
), ip = P.forwardRef(({ className: e, variant: t, ...n }, r) => /* @__PURE__ */ C(
  ys,
  {
    className: H(sp({ variant: t }), e),
    ...n,
    ref: r,
    children: /* @__PURE__ */ C(
      ap,
      {
        className: H(
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
ip.displayName = ys.displayName;
function ws(e) {
  const t = e + "CollectionProvider", [n, r] = Le(t), [o, a] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), s = (m) => {
    const { scope: p, children: b } = m, w = P.useRef(null), y = P.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ C(o, { scope: p, itemMap: y, collectionRef: w, children: b });
  };
  s.displayName = t;
  const i = e + "CollectionSlot", c = /* @__PURE__ */ nn(i), l = P.forwardRef(
    (m, p) => {
      const { scope: b, children: w } = m, y = a(i, b), k = ie(p, y.collectionRef);
      return /* @__PURE__ */ C(c, { ref: k, children: w });
    }
  );
  l.displayName = i;
  const u = e + "CollectionItemSlot", d = "data-radix-collection-item", f = /* @__PURE__ */ nn(u), h = P.forwardRef(
    (m, p) => {
      const { scope: b, children: w, ...y } = m, k = P.useRef(null), M = ie(p, k), x = a(u, b);
      return P.useEffect(() => (x.itemMap.set(k, { ref: k, ...y }), () => void x.itemMap.delete(k))), /* @__PURE__ */ C(f, { [d]: "", ref: M, children: w });
    }
  );
  h.displayName = u;
  function v(m) {
    const p = a(e + "CollectionConsumer", m);
    return P.useCallback(() => {
      const w = p.collectionRef.current;
      if (!w) return [];
      const y = Array.from(w.querySelectorAll(`[${d}]`));
      return Array.from(p.itemMap.values()).sort(
        (x, S) => y.indexOf(x.ref.current) - y.indexOf(S.ref.current)
      );
    }, [p.collectionRef, p.itemMap]);
  }
  return [
    { Provider: s, Slot: l, ItemSlot: h },
    v,
    r
  ];
}
var cp = g.createContext(void 0);
function Nr(e) {
  const t = g.useContext(cp);
  return e || t || "ltr";
}
var qn = "rovingFocusGroup.onEntryFocus", lp = { bubbles: !1, cancelable: !0 }, Vt = "RovingFocusGroup", [rr, xs, up] = ws(Vt), [dp, Cs] = Le(
  Vt,
  [up]
), [fp, hp] = dp(Vt), ks = g.forwardRef(
  (e, t) => /* @__PURE__ */ C(rr.Provider, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ C(rr.Slot, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ C(mp, { ...e, ref: t }) }) })
);
ks.displayName = Vt;
var mp = g.forwardRef((e, t) => {
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
  } = e, f = g.useRef(null), h = ie(t, f), v = Nr(a), [m, p] = ot({
    prop: s,
    defaultProp: i ?? null,
    onChange: c,
    caller: Vt
  }), [b, w] = g.useState(!1), y = ct(l), k = xs(n), M = g.useRef(!1), [x, S] = g.useState(0);
  return g.useEffect(() => {
    const R = f.current;
    if (R)
      return R.addEventListener(qn, y), () => R.removeEventListener(qn, y);
  }, [y]), /* @__PURE__ */ C(
    fp,
    {
      scope: n,
      orientation: r,
      dir: v,
      loop: o,
      currentTabStopId: m,
      onItemFocus: g.useCallback(
        (R) => p(R),
        [p]
      ),
      onItemShiftTab: g.useCallback(() => w(!0), []),
      onFocusableItemAdd: g.useCallback(
        () => S((R) => R + 1),
        []
      ),
      onFocusableItemRemove: g.useCallback(
        () => S((R) => R - 1),
        []
      ),
      children: /* @__PURE__ */ C(
        te.div,
        {
          tabIndex: b || x === 0 ? -1 : 0,
          "data-orientation": r,
          ...d,
          ref: h,
          style: { outline: "none", ...e.style },
          onMouseDown: ae(e.onMouseDown, () => {
            M.current = !0;
          }),
          onFocus: ae(e.onFocus, (R) => {
            const $ = !M.current;
            if (R.target === R.currentTarget && $ && !b) {
              const T = new CustomEvent(qn, lp);
              if (R.currentTarget.dispatchEvent(T), !T.defaultPrevented) {
                const _ = k().filter((D) => D.focusable), F = _.find((D) => D.active), j = _.find((D) => D.id === m), E = [F, j, ..._].filter(
                  Boolean
                ).map((D) => D.ref.current);
                Os(E, u);
              }
            }
            M.current = !1;
          }),
          onBlur: ae(e.onBlur, () => w(!1))
        }
      )
    }
  );
}), Ms = "RovingFocusGroupItem", Ss = g.forwardRef(
  (e, t) => {
    const {
      __scopeRovingFocusGroup: n,
      focusable: r = !0,
      active: o = !1,
      tabStopId: a,
      children: s,
      ...i
    } = e, c = ln(), l = a || c, u = hp(Ms, n), d = u.currentTabStopId === l, f = xs(n), { onFocusableItemAdd: h, onFocusableItemRemove: v, currentTabStopId: m } = u;
    return g.useEffect(() => {
      if (r)
        return h(), () => v();
    }, [r, h, v]), /* @__PURE__ */ C(
      rr.ItemSlot,
      {
        scope: n,
        id: l,
        focusable: r,
        active: o,
        children: /* @__PURE__ */ C(
          te.span,
          {
            tabIndex: d ? 0 : -1,
            "data-orientation": u.orientation,
            ...i,
            ref: t,
            onMouseDown: ae(e.onMouseDown, (p) => {
              r ? u.onItemFocus(l) : p.preventDefault();
            }),
            onFocus: ae(e.onFocus, () => u.onItemFocus(l)),
            onKeyDown: ae(e.onKeyDown, (p) => {
              if (p.key === "Tab" && p.shiftKey) {
                u.onItemShiftTab();
                return;
              }
              if (p.target !== p.currentTarget) return;
              const b = bp(p, u.orientation, u.dir);
              if (b !== void 0) {
                if (p.metaKey || p.ctrlKey || p.altKey || p.shiftKey) return;
                p.preventDefault();
                let y = f().filter((k) => k.focusable).map((k) => k.ref.current);
                if (b === "last") y.reverse();
                else if (b === "prev" || b === "next") {
                  b === "prev" && y.reverse();
                  const k = y.indexOf(p.currentTarget);
                  y = u.loop ? vp(y, k + 1) : y.slice(k + 1);
                }
                setTimeout(() => Os(y));
              }
            }),
            children: typeof s == "function" ? s({ isCurrentTabStop: d, hasTabStop: m != null }) : s
          }
        )
      }
    );
  }
);
Ss.displayName = Ms;
var pp = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function gp(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function bp(e, t, n) {
  const r = gp(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r)))
    return pp[r];
}
function Os(e, t = !1) {
  const n = document.activeElement;
  for (const r of e)
    if (r === n || (r.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function vp(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var yp = ks, wp = Ss, Pr = "Radio", [xp, Ds] = Le(Pr), [Cp, kp] = xp(Pr), Ns = g.forwardRef(
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
    } = e, [d, f] = g.useState(null), h = ie(t, (p) => f(p)), v = g.useRef(!1), m = d ? l || !!d.closest("form") : !0;
    return /* @__PURE__ */ U(Cp, { scope: n, checked: o, disabled: s, children: [
      /* @__PURE__ */ C(
        te.button,
        {
          type: "button",
          role: "radio",
          "aria-checked": o,
          "data-state": Rs(o),
          "data-disabled": s ? "" : void 0,
          disabled: s,
          value: i,
          ...u,
          ref: h,
          onClick: ae(e.onClick, (p) => {
            o || c == null || c(), m && (v.current = p.isPropagationStopped(), v.current || p.stopPropagation());
          })
        }
      ),
      m && /* @__PURE__ */ C(
        As,
        {
          control: d,
          bubbles: !v.current,
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
Ns.displayName = Pr;
var Ps = "RadioIndicator", Es = g.forwardRef(
  (e, t) => {
    const { __scopeRadio: n, forceMount: r, ...o } = e, a = kp(Ps, n);
    return /* @__PURE__ */ C(Nt, { present: r || a.checked, children: /* @__PURE__ */ C(
      te.span,
      {
        "data-state": Rs(a.checked),
        "data-disabled": a.disabled ? "" : void 0,
        ...o,
        ref: t
      }
    ) });
  }
);
Es.displayName = Ps;
var Mp = "RadioBubbleInput", As = g.forwardRef(
  ({
    __scopeRadio: e,
    control: t,
    checked: n,
    bubbles: r = !0,
    ...o
  }, a) => {
    const s = g.useRef(null), i = ie(s, a), c = Dr(n), l = mn(t);
    return g.useEffect(() => {
      const u = s.current;
      if (!u) return;
      const d = window.HTMLInputElement.prototype, h = Object.getOwnPropertyDescriptor(
        d,
        "checked"
      ).set;
      if (c !== n && h) {
        const v = new Event("click", { bubbles: r });
        h.call(u, n), u.dispatchEvent(v);
      }
    }, [c, n, r]), /* @__PURE__ */ C(
      te.input,
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
As.displayName = Mp;
function Rs(e) {
  return e ? "checked" : "unchecked";
}
var Sp = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], xn = "RadioGroup", [Op] = Le(xn, [
  Cs,
  Ds
]), Ts = Cs(), Ws = Ds(), [Dp, Np] = Op(xn), _s = g.forwardRef(
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
    } = e, h = Ts(n), v = Nr(l), [m, p] = ot({
      prop: a,
      defaultProp: o ?? null,
      onChange: d,
      caller: xn
    });
    return /* @__PURE__ */ C(
      Dp,
      {
        scope: n,
        name: r,
        required: s,
        disabled: i,
        value: m,
        onValueChange: p,
        children: /* @__PURE__ */ C(
          yp,
          {
            asChild: !0,
            ...h,
            orientation: c,
            dir: v,
            loop: u,
            children: /* @__PURE__ */ C(
              te.div,
              {
                role: "radiogroup",
                "aria-required": s,
                "aria-orientation": c,
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
_s.displayName = xn;
var Is = "RadioGroupItem", $s = g.forwardRef(
  (e, t) => {
    const { __scopeRadioGroup: n, disabled: r, ...o } = e, a = Np(Is, n), s = a.disabled || r, i = Ts(n), c = Ws(n), l = g.useRef(null), u = ie(t, l), d = a.value === o.value, f = g.useRef(!1);
    return g.useEffect(() => {
      const h = (m) => {
        Sp.includes(m.key) && (f.current = !0);
      }, v = () => f.current = !1;
      return document.addEventListener("keydown", h), document.addEventListener("keyup", v), () => {
        document.removeEventListener("keydown", h), document.removeEventListener("keyup", v);
      };
    }, []), /* @__PURE__ */ C(
      wp,
      {
        asChild: !0,
        ...i,
        focusable: !s,
        active: d,
        children: /* @__PURE__ */ C(
          Ns,
          {
            disabled: s,
            required: a.required,
            checked: d,
            ...c,
            ...o,
            name: a.name,
            ref: u,
            onCheck: () => a.onValueChange(o.value),
            onKeyDown: ae((h) => {
              h.key === "Enter" && h.preventDefault();
            }),
            onFocus: ae(o.onFocus, () => {
              var h;
              f.current && ((h = l.current) == null || h.click());
            })
          }
        )
      }
    );
  }
);
$s.displayName = Is;
var Pp = "RadioGroupIndicator", Fs = g.forwardRef(
  (e, t) => {
    const { __scopeRadioGroup: n, ...r } = e, o = Ws(n);
    return /* @__PURE__ */ C(Es, { ...o, ...r, ref: t });
  }
);
Fs.displayName = Pp;
var Ys = _s, Bs = $s, Ep = Fs;
const Ap = P.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ C(
  Ys,
  {
    className: H("grid gap-2", e),
    ...t,
    ref: n
  }
));
Ap.displayName = Ys.displayName;
const Rp = Ne(
  H(
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
), Tp = Ne(
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
), Wp = P.forwardRef(({ className: e, variant: t, size: n, ...r }, o) => /* @__PURE__ */ C(
  Bs,
  {
    ref: o,
    className: H(Rp({ variant: t, size: n }), e),
    ...r,
    children: /* @__PURE__ */ C(
      Ep,
      {
        className: H(Tp({ variant: t, size: n }))
      }
    )
  }
));
Wp.displayName = Bs.displayName;
var Cn = "Collapsible", [_p, Ls] = Le(Cn), [Ip, Er] = _p(Cn), Hs = g.forwardRef(
  (e, t) => {
    const {
      __scopeCollapsible: n,
      open: r,
      defaultOpen: o,
      disabled: a,
      onOpenChange: s,
      ...i
    } = e, [c, l] = ot({
      prop: r,
      defaultProp: o ?? !1,
      onChange: s,
      caller: Cn
    });
    return /* @__PURE__ */ C(
      Ip,
      {
        scope: n,
        disabled: a,
        contentId: ln(),
        open: c,
        onOpenToggle: g.useCallback(() => l((u) => !u), [l]),
        children: /* @__PURE__ */ C(
          te.div,
          {
            "data-state": Rr(c),
            "data-disabled": a ? "" : void 0,
            ...i,
            ref: t
          }
        )
      }
    );
  }
);
Hs.displayName = Cn;
var zs = "CollapsibleTrigger", Vs = g.forwardRef(
  (e, t) => {
    const { __scopeCollapsible: n, ...r } = e, o = Er(zs, n);
    return /* @__PURE__ */ C(
      te.button,
      {
        type: "button",
        "aria-controls": o.contentId,
        "aria-expanded": o.open || !1,
        "data-state": Rr(o.open),
        "data-disabled": o.disabled ? "" : void 0,
        disabled: o.disabled,
        ...r,
        ref: t,
        onClick: ae(e.onClick, o.onOpenToggle)
      }
    );
  }
);
Vs.displayName = zs;
var Ar = "CollapsibleContent", js = g.forwardRef(
  (e, t) => {
    const { forceMount: n, ...r } = e, o = Er(Ar, e.__scopeCollapsible);
    return /* @__PURE__ */ C(Nt, { present: n || o.open, children: ({ present: a }) => /* @__PURE__ */ C($p, { ...r, ref: t, present: a }) });
  }
);
js.displayName = Ar;
var $p = g.forwardRef((e, t) => {
  const { __scopeCollapsible: n, present: r, children: o, ...a } = e, s = Er(Ar, n), [i, c] = g.useState(r), l = g.useRef(null), u = ie(t, l), d = g.useRef(0), f = d.current, h = g.useRef(0), v = h.current, m = s.open || i, p = g.useRef(m), b = g.useRef(void 0);
  return g.useEffect(() => {
    const w = requestAnimationFrame(() => p.current = !1);
    return () => cancelAnimationFrame(w);
  }, []), Ue(() => {
    const w = l.current;
    if (w) {
      b.current = b.current || {
        transitionDuration: w.style.transitionDuration,
        animationName: w.style.animationName
      }, w.style.transitionDuration = "0s", w.style.animationName = "none";
      const y = w.getBoundingClientRect();
      d.current = y.height, h.current = y.width, p.current || (w.style.transitionDuration = b.current.transitionDuration, w.style.animationName = b.current.animationName), c(r);
    }
  }, [s.open, r]), /* @__PURE__ */ C(
    te.div,
    {
      "data-state": Rr(s.open),
      "data-disabled": s.disabled ? "" : void 0,
      id: s.contentId,
      hidden: !m,
      ...a,
      ref: u,
      style: {
        "--radix-collapsible-content-height": f ? `${f}px` : void 0,
        "--radix-collapsible-content-width": v ? `${v}px` : void 0,
        ...e.style
      },
      children: m && o
    }
  );
});
function Rr(e) {
  return e ? "open" : "closed";
}
var Fp = Hs, Yp = Vs, Bp = js, Pe = "Accordion", Lp = ["Home", "End", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"], [Tr, Hp, zp] = ws(Pe), [kn] = Le(Pe, [
  zp,
  Ls
]), Wr = Ls(), Gs = P.forwardRef(
  (e, t) => {
    const { type: n, ...r } = e, o = r, a = r;
    return /* @__PURE__ */ C(Tr.Provider, { scope: e.__scopeAccordion, children: n === "multiple" ? /* @__PURE__ */ C(Up, { ...a, ref: t }) : /* @__PURE__ */ C(Gp, { ...o, ref: t }) });
  }
);
Gs.displayName = Pe;
var [Us, Vp] = kn(Pe), [qs, jp] = kn(
  Pe,
  { collapsible: !1 }
), Gp = P.forwardRef(
  (e, t) => {
    const {
      value: n,
      defaultValue: r,
      onValueChange: o = () => {
      },
      collapsible: a = !1,
      ...s
    } = e, [i, c] = ot({
      prop: n,
      defaultProp: r ?? "",
      onChange: o,
      caller: Pe
    });
    return /* @__PURE__ */ C(
      Us,
      {
        scope: e.__scopeAccordion,
        value: P.useMemo(() => i ? [i] : [], [i]),
        onItemOpen: c,
        onItemClose: P.useCallback(() => a && c(""), [a, c]),
        children: /* @__PURE__ */ C(qs, { scope: e.__scopeAccordion, collapsible: a, children: /* @__PURE__ */ C(Xs, { ...s, ref: t }) })
      }
    );
  }
), Up = P.forwardRef((e, t) => {
  const {
    value: n,
    defaultValue: r,
    onValueChange: o = () => {
    },
    ...a
  } = e, [s, i] = ot({
    prop: n,
    defaultProp: r ?? [],
    onChange: o,
    caller: Pe
  }), c = P.useCallback(
    (u) => i((d = []) => [...d, u]),
    [i]
  ), l = P.useCallback(
    (u) => i((d = []) => d.filter((f) => f !== u)),
    [i]
  );
  return /* @__PURE__ */ C(
    Us,
    {
      scope: e.__scopeAccordion,
      value: s,
      onItemOpen: c,
      onItemClose: l,
      children: /* @__PURE__ */ C(qs, { scope: e.__scopeAccordion, collapsible: !0, children: /* @__PURE__ */ C(Xs, { ...a, ref: t }) })
    }
  );
}), [qp, Mn] = kn(Pe), Xs = P.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, disabled: r, dir: o, orientation: a = "vertical", ...s } = e, i = P.useRef(null), c = ie(i, t), l = Hp(n), d = Nr(o) === "ltr", f = ae(e.onKeyDown, (h) => {
      var R;
      if (!Lp.includes(h.key)) return;
      const v = h.target, m = l().filter(($) => {
        var T;
        return !((T = $.ref.current) != null && T.disabled);
      }), p = m.findIndex(($) => $.ref.current === v), b = m.length;
      if (p === -1) return;
      h.preventDefault();
      let w = p;
      const y = 0, k = b - 1, M = () => {
        w = p + 1, w > k && (w = y);
      }, x = () => {
        w = p - 1, w < y && (w = k);
      };
      switch (h.key) {
        case "Home":
          w = y;
          break;
        case "End":
          w = k;
          break;
        case "ArrowRight":
          a === "horizontal" && (d ? M() : x());
          break;
        case "ArrowDown":
          a === "vertical" && M();
          break;
        case "ArrowLeft":
          a === "horizontal" && (d ? x() : M());
          break;
        case "ArrowUp":
          a === "vertical" && x();
          break;
      }
      const S = w % b;
      (R = m[S].ref.current) == null || R.focus();
    });
    return /* @__PURE__ */ C(
      qp,
      {
        scope: n,
        disabled: r,
        direction: o,
        orientation: a,
        children: /* @__PURE__ */ C(Tr.Slot, { scope: n, children: /* @__PURE__ */ C(
          te.div,
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
), cn = "AccordionItem", [Xp, _r] = kn(cn), Ks = P.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, value: r, ...o } = e, a = Mn(cn, n), s = Vp(cn, n), i = Wr(n), c = ln(), l = r && s.value.includes(r) || !1, u = a.disabled || e.disabled;
    return /* @__PURE__ */ C(
      Xp,
      {
        scope: n,
        open: l,
        disabled: u,
        triggerId: c,
        children: /* @__PURE__ */ C(
          Fp,
          {
            "data-orientation": a.orientation,
            "data-state": ni(l),
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
Ks.displayName = cn;
var Qs = "AccordionHeader", Zs = P.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, ...r } = e, o = Mn(Pe, n), a = _r(Qs, n);
    return /* @__PURE__ */ C(
      te.h3,
      {
        "data-orientation": o.orientation,
        "data-state": ni(a.open),
        "data-disabled": a.disabled ? "" : void 0,
        ...r,
        ref: t
      }
    );
  }
);
Zs.displayName = Qs;
var or = "AccordionTrigger", Js = P.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, ...r } = e, o = Mn(Pe, n), a = _r(or, n), s = jp(or, n), i = Wr(n);
    return /* @__PURE__ */ C(Tr.ItemSlot, { scope: n, children: /* @__PURE__ */ C(
      Yp,
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
Js.displayName = or;
var ei = "AccordionContent", ti = P.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, ...r } = e, o = Mn(Pe, n), a = _r(ei, n), s = Wr(n);
    return /* @__PURE__ */ C(
      Bp,
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
ti.displayName = ei;
function ni(e) {
  return e ? "open" : "closed";
}
var Kp = Gs, Qp = Ks, Zp = Zs, Jp = Js, eg = ti;
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tg = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), ng = (e) => e.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (t, n, r) => r ? r.toUpperCase() : n.toLowerCase()
), No = (e) => {
  const t = ng(e);
  return t.charAt(0).toUpperCase() + t.slice(1);
}, ri = (...e) => e.filter((t, n, r) => !!t && t.trim() !== "" && r.indexOf(t) === n).join(" ").trim(), rg = (e) => {
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
var og = {
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
const ag = rt(
  ({
    color: e = "currentColor",
    size: t = 24,
    strokeWidth: n = 2,
    absoluteStrokeWidth: r,
    className: o = "",
    children: a,
    iconNode: s,
    ...i
  }, c) => Xn(
    "svg",
    {
      ref: c,
      ...og,
      width: t,
      height: t,
      stroke: e,
      strokeWidth: r ? Number(n) * 24 / Number(t) : n,
      className: ri("lucide", o),
      ...!a && !rg(i) && { "aria-hidden": "true" },
      ...i
    },
    [
      ...s.map(([l, u]) => Xn(l, u)),
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
const oi = (e, t) => {
  const n = rt(
    ({ className: r, ...o }, a) => Xn(ag, {
      ref: a,
      iconNode: t,
      className: ri(
        `lucide-${tg(No(e))}`,
        `lucide-${e}`,
        r
      ),
      ...o
    })
  );
  return n.displayName = No(e), n;
};
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sg = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], ig = oi("check", sg);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const cg = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], lg = oi("chevron-down", cg), ug = ({
  menu: e,
  isOpen: t,
  isSelected: n,
  selectedUrl: r,
  onMenuClick: o
}) => /* @__PURE__ */ U(Qp, { value: e.url, className: "border-none", children: [
  /* @__PURE__ */ C(Zp, { className: "m-0", children: /* @__PURE__ */ U(
    Jp,
    {
      onClick: () => {
        e.subMenu || o(e.url);
      },
      className: H(
        "group w-full h-[52px] flex items-center px-5 text-white transition-colors hover:bg-[#3a3b3e]",
        "data-[state=open]:bg-transparent",
        !e.subMenu && n && "bg-[#3a3b3e]"
      ),
      children: [
        e.icon && /* @__PURE__ */ C("div", { className: "mr-3 flex items-center text-white [&>svg]:w-6 [&>svg]:h-6", children: e.icon }),
        /* @__PURE__ */ C("span", { className: "text-base font-normal text-white", children: e.title }),
        e.subMenu && /* @__PURE__ */ C(
          lg,
          {
            className: H(
              "ml-auto transition-transform text-white",
              t && "rotate-180"
            ),
            size: 20
          }
        )
      ]
    }
  ) }),
  e.subMenu && /* @__PURE__ */ C(eg, { className: "overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up bg-[#232427]", children: e.subMenu.map((a) => {
    const s = a.url === r;
    return /* @__PURE__ */ C(
      "div",
      {
        onClick: () => o(a.url),
        className: H(
          "flex items-center h-[44px] px-5 pl-14 cursor-pointer transition-colors hover:bg-[#2e2f32]",
          s && "bg-[#2e2f32]"
        ),
        children: /* @__PURE__ */ C(
          "span",
          {
            className: H(
              "text-sm font-normal",
              s ? "text-white font-medium" : "text-[#b4b4b4]"
            ),
            children: a.title
          }
        )
      },
      a.url
    );
  }) })
] }), dg = P.forwardRef(
  ({ title: e, menus: t, selectedUrl: n, onMenuClick: r, headerSlot: o, className: a, ...s }, i) => {
    const [c, l] = ve([]);
    return /* @__PURE__ */ U(
      "div",
      {
        ref: i,
        className: H(
          "w-[280px] min-w-[280px] max-w-[280px] bg-[#2c2d30] flex flex-col text-white h-screen",
          a
        ),
        ...s,
        children: [
          o,
          e && !o && /* @__PURE__ */ C("div", { className: "px-5 py-4 border-b border-[#3a3b3e]", children: /* @__PURE__ */ C("h2", { className: "text-lg font-semibold text-white", children: e }) }),
          /* @__PURE__ */ C("div", { className: "flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#3a3b3e] scrollbar-track-transparent", children: /* @__PURE__ */ C(
            Kp,
            {
              type: "multiple",
              value: c,
              onValueChange: l,
              children: t.map((u) => /* @__PURE__ */ C(
                ug,
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
          ) })
        ]
      }
    );
  }
);
dg.displayName = "SideNavigation";
var Sn = "Checkbox", [fg] = Le(Sn), [hg, Ir] = fg(Sn);
function mg(e) {
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
  } = e, [f, h] = ot({
    prop: n,
    defaultProp: o ?? !1,
    onChange: c,
    caller: Sn
  }), [v, m] = g.useState(null), [p, b] = g.useState(null), w = g.useRef(!1), y = v ? !!s || !!v.closest("form") : (
    // We set this to true by default so that events bubble to forms without JS (SSR)
    !0
  ), k = {
    checked: f,
    disabled: a,
    setChecked: h,
    control: v,
    setControl: m,
    name: i,
    form: s,
    value: u,
    hasConsumerStoppedPropagationRef: w,
    required: l,
    defaultChecked: et(o) ? !1 : o,
    isFormControl: y,
    bubbleInput: p,
    setBubbleInput: b
  };
  return /* @__PURE__ */ C(
    hg,
    {
      scope: t,
      ...k,
      children: pg(d) ? d(k) : r
    }
  );
}
var ai = "CheckboxTrigger", si = g.forwardRef(
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
      isFormControl: h,
      bubbleInput: v
    } = Ir(ai, e), m = ie(o, u), p = g.useRef(c);
    return g.useEffect(() => {
      const b = a == null ? void 0 : a.form;
      if (b) {
        const w = () => d(p.current);
        return b.addEventListener("reset", w), () => b.removeEventListener("reset", w);
      }
    }, [a, d]), /* @__PURE__ */ C(
      te.button,
      {
        type: "button",
        role: "checkbox",
        "aria-checked": et(c) ? "mixed" : c,
        "aria-required": l,
        "data-state": fi(c),
        "data-disabled": i ? "" : void 0,
        disabled: i,
        value: s,
        ...r,
        ref: m,
        onKeyDown: ae(t, (b) => {
          b.key === "Enter" && b.preventDefault();
        }),
        onClick: ae(n, (b) => {
          d((w) => et(w) ? !0 : !w), v && h && (f.current = b.isPropagationStopped(), f.current || b.stopPropagation());
        })
      }
    );
  }
);
si.displayName = ai;
var ii = g.forwardRef(
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
    return /* @__PURE__ */ C(
      mg,
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
        internal_do_not_use_render: ({ isFormControl: f }) => /* @__PURE__ */ U(Po, { children: [
          /* @__PURE__ */ C(
            si,
            {
              ...d,
              ref: t,
              __scopeCheckbox: n
            }
          ),
          f && /* @__PURE__ */ C(
            di,
            {
              __scopeCheckbox: n
            }
          )
        ] })
      }
    );
  }
);
ii.displayName = Sn;
var ci = "CheckboxIndicator", li = g.forwardRef(
  (e, t) => {
    const { __scopeCheckbox: n, forceMount: r, ...o } = e, a = Ir(ci, n);
    return /* @__PURE__ */ C(
      Nt,
      {
        present: r || et(a.checked) || a.checked === !0,
        children: /* @__PURE__ */ C(
          te.span,
          {
            "data-state": fi(a.checked),
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
li.displayName = ci;
var ui = "CheckboxBubbleInput", di = g.forwardRef(
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
      setBubbleInput: h
    } = Ir(ui, e), v = ie(n, h), m = Dr(a), p = mn(r);
    g.useEffect(() => {
      const w = f;
      if (!w) return;
      const y = window.HTMLInputElement.prototype, M = Object.getOwnPropertyDescriptor(
        y,
        "checked"
      ).set, x = !o.current;
      if (m !== a && M) {
        const S = new Event("click", { bubbles: x });
        w.indeterminate = et(a), M.call(w, et(a) ? !1 : a), w.dispatchEvent(S);
      }
    }, [f, m, a, o]);
    const b = g.useRef(et(a) ? !1 : a);
    return /* @__PURE__ */ C(
      te.input,
      {
        type: "checkbox",
        "aria-hidden": !0,
        defaultChecked: s ?? b.current,
        required: i,
        disabled: c,
        name: l,
        value: u,
        form: d,
        ...t,
        tabIndex: -1,
        ref: v,
        style: {
          ...t.style,
          ...p,
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
di.displayName = ui;
function pg(e) {
  return typeof e == "function";
}
function et(e) {
  return e === "indeterminate";
}
function fi(e) {
  return et(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
const gg = P.forwardRef(({ className: e, label: t, id: n, disabled: r, ...o }, a) => {
  const s = n || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
  return /* @__PURE__ */ U("div", { className: "flex items-center", children: [
    /* @__PURE__ */ C(
      ii,
      {
        ref: a,
        id: s,
        disabled: r,
        className: H(
          "peer h-[17px] w-[17px] shrink-0 rounded border border-gray-400 bg-white",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "data-[state=checked]:bg-black data-[state=checked]:border-black",
          "transition-colors",
          e
        ),
        ...o,
        children: /* @__PURE__ */ C(li, { className: "flex items-center justify-center text-white", children: /* @__PURE__ */ C(ig, { className: "h-3 w-3", strokeWidth: 3 }) })
      }
    ),
    t && /* @__PURE__ */ C(
      "label",
      {
        htmlFor: s,
        className: H(
          "ml-2 text-base font-normal text-gray-500 cursor-pointer select-none",
          "hover:text-black transition-colors",
          r && "cursor-not-allowed opacity-50"
        ),
        children: t
      }
    )
  ] });
});
gg.displayName = "Checkbox";
export {
  hc as Button,
  gg as Checkbox,
  xg as ChevronRightIcon,
  yc as Combobox,
  Zm as DatePicker,
  ep as DateRangePicker,
  sr as Dropdown,
  wg as LoadingCircle,
  Cg as Popover,
  gd as PopoverContent,
  vd as PopoverMenuItem,
  kg as PopoverTrigger,
  Ap as RadioGroup,
  Wp as RadioGroupItem,
  vc as Select,
  dg as SideNavigation,
  ip as Switch,
  wd as Text,
  Sd as TextInput,
  fc as buttonVariants,
  H as cn,
  pc as dropdownTriggerVariants,
  bd as popoverMenuItemVariants
};
//# sourceMappingURL=index.es.js.map
