import { jsx as f, jsxs as I, Fragment as Tt } from "react/jsx-runtime";
import * as p from "react";
import w, { forwardRef as Dt, useState as be, useRef as Ct, useEffect as At, useLayoutEffect as Wa, createContext as qc, useContext as Xc, useCallback as Ee, useMemo as Pe, createElement as jr } from "react";
import * as $a from "react-dom";
import Fa from "react-dom";
import { useDropzone as Ya } from "react-dropzone";
function La(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (n = La(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function Ba() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++) (e = arguments[n]) && (t = La(e)) && (r && (r += " "), r += t);
  return r;
}
const oo = "-", Kc = (e) => {
  const t = Qc(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (s) => {
      const i = s.split(oo);
      return i[0] === "" && i.length !== 1 && i.shift(), Ha(i, t) || Zc(s);
    },
    getConflictingClassGroupIds: (s, i) => {
      const c = n[s] || [];
      return i && r[s] ? [...c, ...r[s]] : c;
    }
  };
}, Ha = (e, t) => {
  var s;
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], r = t.nextPart.get(n), o = r ? Ha(e.slice(1), r) : void 0;
  if (o)
    return o;
  if (t.validators.length === 0)
    return;
  const a = e.join(oo);
  return (s = t.validators.find(({
    validator: i
  }) => i(a))) == null ? void 0 : s.classGroupId;
}, Vo = /^\[(.+)\]$/, Zc = (e) => {
  if (Vo.test(e)) {
    const t = Vo.exec(e)[1], n = t == null ? void 0 : t.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, Qc = (e) => {
  const {
    theme: t,
    prefix: n
  } = e, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return el(Object.entries(e.classGroups), n).forEach(([a, s]) => {
    Gr(s, r, a, t);
  }), r;
}, Gr = (e, t, n, r) => {
  e.forEach((o) => {
    if (typeof o == "string") {
      const a = o === "" ? t : jo(t, o);
      a.classGroupId = n;
      return;
    }
    if (typeof o == "function") {
      if (Jc(o)) {
        Gr(o(r), t, n, r);
        return;
      }
      t.validators.push({
        validator: o,
        classGroupId: n
      });
      return;
    }
    Object.entries(o).forEach(([a, s]) => {
      Gr(s, jo(t, a), n, r);
    });
  });
}, jo = (e, t) => {
  let n = e;
  return t.split(oo).forEach((r) => {
    n.nextPart.has(r) || n.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(r);
  }), n;
}, Jc = (e) => e.isThemeGetter, el = (e, t) => t ? e.map(([n, r]) => {
  const o = r.map((a) => typeof a == "string" ? t + a : typeof a == "object" ? Object.fromEntries(Object.entries(a).map(([s, i]) => [t + s, i])) : a);
  return [n, o];
}) : e, tl = (e) => {
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
}, za = "!", nl = (e) => {
  const {
    separator: t,
    experimentalParseClassName: n
  } = e, r = t.length === 1, o = t[0], a = t.length, s = (i) => {
    const c = [];
    let l = 0, u = 0, d;
    for (let y = 0; y < i.length; y++) {
      let b = i[y];
      if (l === 0) {
        if (b === o && (r || i.slice(y, y + a) === t)) {
          c.push(i.slice(u, y)), u = y + a;
          continue;
        }
        if (b === "/") {
          d = y;
          continue;
        }
      }
      b === "[" ? l++ : b === "]" && l--;
    }
    const h = c.length === 0 ? i : i.substring(u), m = h.startsWith(za), v = m ? h.substring(1) : h, g = d && d > u ? d - u : void 0;
    return {
      modifiers: c,
      hasImportantModifier: m,
      baseClassName: v,
      maybePostfixModifierPosition: g
    };
  };
  return n ? (i) => n({
    className: i,
    parseClassName: s
  }) : s;
}, rl = (e) => {
  if (e.length <= 1)
    return e;
  const t = [];
  let n = [];
  return e.forEach((r) => {
    r[0] === "[" ? (t.push(...n.sort(), r), n = []) : n.push(r);
  }), t.push(...n.sort()), t;
}, ol = (e) => ({
  cache: tl(e.cacheSize),
  parseClassName: nl(e),
  ...Kc(e)
}), al = /\s+/, sl = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: r,
    getConflictingClassGroupIds: o
  } = t, a = [], s = e.trim().split(al);
  let i = "";
  for (let c = s.length - 1; c >= 0; c -= 1) {
    const l = s[c], {
      modifiers: u,
      hasImportantModifier: d,
      baseClassName: h,
      maybePostfixModifierPosition: m
    } = n(l);
    let v = !!m, g = r(v ? h.substring(0, m) : h);
    if (!g) {
      if (!v) {
        i = l + (i.length > 0 ? " " + i : i);
        continue;
      }
      if (g = r(h), !g) {
        i = l + (i.length > 0 ? " " + i : i);
        continue;
      }
      v = !1;
    }
    const y = rl(u).join(":"), b = d ? y + za : y, x = b + g;
    if (a.includes(x))
      continue;
    a.push(x);
    const C = o(g, v);
    for (let M = 0; M < C.length; ++M) {
      const N = C[M];
      a.push(b + N);
    }
    i = l + (i.length > 0 ? " " + i : i);
  }
  return i;
};
function il() {
  let e = 0, t, n, r = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = Va(t)) && (r && (r += " "), r += n);
  return r;
}
const Va = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (t = Va(e[r])) && (n && (n += " "), n += t);
  return n;
};
function cl(e, ...t) {
  let n, r, o, a = s;
  function s(c) {
    const l = t.reduce((u, d) => d(u), e());
    return n = ol(l), r = n.cache.get, o = n.cache.set, a = i, i(c);
  }
  function i(c) {
    const l = r(c);
    if (l)
      return l;
    const u = sl(c, n);
    return o(c, u), u;
  }
  return function() {
    return a(il.apply(null, arguments));
  };
}
const ce = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, ja = /^\[(?:([a-z-]+):)?(.+)\]$/i, ll = /^\d+\/\d+$/, dl = /* @__PURE__ */ new Set(["px", "full", "screen"]), ul = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, fl = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, hl = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, ml = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, pl = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, ct = (e) => qt(e) || dl.has(e) || ll.test(e), yt = (e) => nn(e, "length", kl), qt = (e) => !!e && !Number.isNaN(Number(e)), Er = (e) => nn(e, "number", qt), fn = (e) => !!e && Number.isInteger(Number(e)), gl = (e) => e.endsWith("%") && qt(e.slice(0, -1)), Z = (e) => ja.test(e), vt = (e) => ul.test(e), bl = /* @__PURE__ */ new Set(["length", "size", "percentage"]), yl = (e) => nn(e, bl, Ga), vl = (e) => nn(e, "position", Ga), wl = /* @__PURE__ */ new Set(["image", "url"]), xl = (e) => nn(e, wl, Nl), Cl = (e) => nn(e, "", Ml), hn = () => !0, nn = (e, t, n) => {
  const r = ja.exec(e);
  return r ? r[1] ? typeof t == "string" ? r[1] === t : t.has(r[1]) : n(r[2]) : !1;
}, kl = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  fl.test(e) && !hl.test(e)
), Ga = () => !1, Ml = (e) => ml.test(e), Nl = (e) => pl.test(e), Sl = () => {
  const e = ce("colors"), t = ce("spacing"), n = ce("blur"), r = ce("brightness"), o = ce("borderColor"), a = ce("borderRadius"), s = ce("borderSpacing"), i = ce("borderWidth"), c = ce("contrast"), l = ce("grayscale"), u = ce("hueRotate"), d = ce("invert"), h = ce("gap"), m = ce("gradientColorStops"), v = ce("gradientColorStopPositions"), g = ce("inset"), y = ce("margin"), b = ce("opacity"), x = ce("padding"), C = ce("saturate"), M = ce("scale"), N = ce("sepia"), k = ce("skew"), O = ce("space"), T = ce("translate"), Y = () => ["auto", "contain", "none"], _ = () => ["auto", "hidden", "clip", "visible", "scroll"], $ = () => ["auto", Z, t], P = () => [Z, t], B = () => ["", ct, yt], S = () => ["auto", qt, Z], A = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], D = () => ["solid", "dashed", "dotted", "double", "none"], W = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], R = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], F = () => ["", "0", Z], L = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], z = () => [qt, Z];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [hn],
      spacing: [ct, yt],
      blur: ["none", "", vt, Z],
      brightness: z(),
      borderColor: [e],
      borderRadius: ["none", "", "full", vt, Z],
      borderSpacing: P(),
      borderWidth: B(),
      contrast: z(),
      grayscale: F(),
      hueRotate: z(),
      invert: F(),
      gap: P(),
      gradientColorStops: [e],
      gradientColorStopPositions: [gl, yt],
      inset: $(),
      margin: $(),
      opacity: z(),
      padding: P(),
      saturate: z(),
      scale: z(),
      sepia: F(),
      skew: z(),
      space: P(),
      translate: P()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", Z]
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
        "break-after": L()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": L()
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
        object: [...A(), Z]
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
        z: ["auto", fn, Z]
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
        flex: ["1", "auto", "initial", "none", Z]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: F()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: F()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", fn, Z]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [hn]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", fn, Z]
        }, Z]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": S()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": S()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [hn]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [fn, Z]
        }, Z]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": S()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": S()
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
        "auto-cols": ["auto", "min", "max", "fr", Z]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", Z]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [h]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": [h]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": [h]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: ["normal", ...R()]
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
        content: ["normal", ...R(), "baseline"]
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
        "place-content": [...R(), "baseline"]
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
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", Z, t]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [Z, t, "min", "max", "fit"]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [Z, t, "none", "full", "min", "max", "fit", "prose", {
          screen: [vt]
        }, vt]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [Z, t, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": [Z, t, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [Z, t, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [Z, t, "auto", "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", vt, yt]
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
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", Er]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [hn]
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
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", Z]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", qt, Er]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", ct, Z]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", Z]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", Z]
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
        decoration: ["auto", "from-font", ct, yt]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", ct, Z]
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
        indent: P()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", Z]
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
        content: ["none", Z]
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
        bg: [...A(), vl]
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
        bg: ["auto", "cover", "contain", yl]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, xl]
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
        "outline-offset": [ct, Z]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [ct, yt]
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
        ring: B()
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
        "ring-offset": [ct, yt]
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
        shadow: ["", "inner", "none", vt, Cl]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [hn]
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
        contrast: [c]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", vt, Z]
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
        saturate: [C]
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
        "backdrop-opacity": [b]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [C]
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
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", Z]
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
        ease: ["linear", "in", "out", "in-out", Z]
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
        animate: ["none", "spin", "ping", "pulse", "bounce", Z]
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
        rotate: [fn, Z]
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
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", Z]
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", Z]
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
        "scroll-m": P()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": P()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": P()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": P()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": P()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": P()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": P()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": P()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": P()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": P()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": P()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": P()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": P()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": P()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": P()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": P()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": P()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": P()
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
        "will-change": ["auto", "scroll", "contents", "transform", Z]
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
        stroke: [ct, yt, Er]
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
}, Dl = /* @__PURE__ */ cl(Sl);
function E(...e) {
  return Dl(Ba(e));
}
const Go = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, Uo = Ba, De = (e, t) => (n) => {
  var r;
  if ((t == null ? void 0 : t.variants) == null) return Uo(e, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
  const { variants: o, defaultVariants: a } = t, s = Object.keys(o).map((l) => {
    const u = n == null ? void 0 : n[l], d = a == null ? void 0 : a[l];
    if (u === null) return null;
    const h = Go(u) || Go(d);
    return o[l][h];
  }), i = n && Object.entries(n).reduce((l, u) => {
    let [d, h] = u;
    return h === void 0 || (l[d] = h), l;
  }, {}), c = t == null || (r = t.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((l, u) => {
    let { class: d, className: h, ...m } = u;
    return Object.entries(m).every((v) => {
      let [g, y] = v;
      return Array.isArray(y) ? y.includes({
        ...a,
        ...i
      }[g]) : {
        ...a,
        ...i
      }[g] === y;
    }) ? [
      ...l,
      d,
      h
    ] : l;
  }, []);
  return Uo(e, s, c, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
}, Ol = De(
  E(
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
        secondary: E(
          "border-0 bg-cms-gray-300 text-cms-black",
          "hover:bg-cms-gray-200 hover:text-cms-gray-800"
        ),
        outline: E(
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
), ut = Dt(
  ({ className: e, variant: t, size: n, ...r }, o) => /* @__PURE__ */ f(
    "button",
    {
      className: E(Ol({ variant: t, size: n, className: e })),
      ref: o,
      ...r
    }
  )
);
ut.displayName = "Button";
const El = {
  sm: "h-4 w-4",
  md: "h-8 w-8",
  lg: "h-16 w-16"
};
function T0({ size: e = "lg", className: t }) {
  return /* @__PURE__ */ f("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ f(
    "div",
    {
      className: E(
        El[e],
        "animate-spin rounded-full",
        "border-2 border-cms-gray-500 border-b-transparent",
        t
      )
    }
  ) });
}
const ao = 40, Rl = 2, te = w.forwardRef(
  ({
    children: e,
    className: t,
    size: n = ao,
    strokeWidth: r = Rl,
    viewBox: o = "0 0 24 24",
    ...a
  }, s) => /* @__PURE__ */ f(
    "svg",
    {
      ref: s,
      width: n,
      height: n,
      viewBox: o,
      fill: "none",
      stroke: "currentColor",
      strokeWidth: r,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: E("text-current", t),
      xmlns: "http://www.w3.org/2000/svg",
      ...a,
      children: e
    }
  )
);
te.displayName = "IconWrapper";
const Pl = w.forwardRef(
  (e, t) => /* @__PURE__ */ f(te, { ref: t, ...e, children: /* @__PURE__ */ f("path", { d: "M6 9L12 15L18 9" }) })
), A0 = w.forwardRef(
  (e, t) => /* @__PURE__ */ f(te, { ref: t, ...e, children: /* @__PURE__ */ f("path", { d: "M18 15L12 9L6 15" }) })
), _0 = w.forwardRef(
  (e, t) => /* @__PURE__ */ f(te, { ref: t, ...e, children: /* @__PURE__ */ f("path", { d: "M15 18L9 12L15 6" }) })
), I0 = w.forwardRef(
  (e, t) => /* @__PURE__ */ f(te, { ref: t, ...e, children: /* @__PURE__ */ f("path", { d: "M9 18L15 12L9 6" }) })
), W0 = w.forwardRef(
  (e, t) => /* @__PURE__ */ I(te, { ref: t, ...e, children: [
    /* @__PURE__ */ f("path", { d: "M11 17L6 12L11 7" }),
    /* @__PURE__ */ f("path", { d: "M18 17L13 12L18 7" })
  ] })
), $0 = w.forwardRef(
  (e, t) => /* @__PURE__ */ I(te, { ref: t, ...e, children: [
    /* @__PURE__ */ f("path", { d: "M13 17L18 12L13 7" }),
    /* @__PURE__ */ f("path", { d: "M6 17L11 12L6 7" })
  ] })
), F0 = w.forwardRef(
  (e, t) => /* @__PURE__ */ I(te, { ref: t, ...e, children: [
    /* @__PURE__ */ f("path", { d: "M19 12H5" }),
    /* @__PURE__ */ f("path", { d: "M12 19L5 12L12 5" })
  ] })
), Y0 = w.forwardRef(
  (e, t) => /* @__PURE__ */ I(te, { ref: t, ...e, children: [
    /* @__PURE__ */ f("path", { d: "M5 12H19" }),
    /* @__PURE__ */ f("path", { d: "M12 5L19 12L12 19" })
  ] })
), L0 = w.forwardRef(
  (e, t) => /* @__PURE__ */ I(te, { ref: t, ...e, children: [
    /* @__PURE__ */ f("line", { x1: "4", x2: "20", y1: "12", y2: "12" }),
    /* @__PURE__ */ f("line", { x1: "4", x2: "20", y1: "6", y2: "6" }),
    /* @__PURE__ */ f("line", { x1: "4", x2: "20", y1: "18", y2: "18" })
  ] })
), B0 = w.forwardRef(
  (e, t) => /* @__PURE__ */ I(te, { ref: t, ...e, children: [
    /* @__PURE__ */ f("circle", { cx: "9", cy: "12", r: "1", fill: "currentColor" }),
    /* @__PURE__ */ f("circle", { cx: "9", cy: "5", r: "1", fill: "currentColor" }),
    /* @__PURE__ */ f("circle", { cx: "9", cy: "19", r: "1", fill: "currentColor" }),
    /* @__PURE__ */ f("circle", { cx: "15", cy: "12", r: "1", fill: "currentColor" }),
    /* @__PURE__ */ f("circle", { cx: "15", cy: "5", r: "1", fill: "currentColor" }),
    /* @__PURE__ */ f("circle", { cx: "15", cy: "19", r: "1", fill: "currentColor" })
  ] })
), Un = w.forwardRef(
  (e, t) => /* @__PURE__ */ I(te, { ref: t, ...e, children: [
    /* @__PURE__ */ f("circle", { cx: "12", cy: "12", r: "10" }),
    /* @__PURE__ */ f("path", { d: "m15 9-6 6" }),
    /* @__PURE__ */ f("path", { d: "m9 9 6 6" })
  ] })
), H0 = w.forwardRef(
  (e, t) => /* @__PURE__ */ f(te, { ref: t, ...e, children: /* @__PURE__ */ f("path", { d: "M20 6L9 17L4 12" }) })
), z0 = w.forwardRef(
  (e, t) => /* @__PURE__ */ I(te, { ref: t, ...e, children: [
    /* @__PURE__ */ f("path", { d: "M22 11.08V12A10 10 0 1 1 16.07 2.86" }),
    /* @__PURE__ */ f("path", { d: "M22 4L11 15L8 12" })
  ] })
), V0 = w.forwardRef(
  (e, t) => /* @__PURE__ */ I(te, { ref: t, ...e, children: [
    /* @__PURE__ */ f("circle", { cx: "12", cy: "12", r: "10" }),
    /* @__PURE__ */ f("line", { x1: "12", x2: "12", y1: "16", y2: "12" }),
    /* @__PURE__ */ f("line", { x1: "12", x2: "12.01", y1: "8", y2: "8" })
  ] })
), j0 = w.forwardRef(
  (e, t) => /* @__PURE__ */ I(te, { ref: t, ...e, children: [
    /* @__PURE__ */ f("circle", { cx: "12", cy: "12", r: "10" }),
    /* @__PURE__ */ f("line", { x1: "12", x2: "12", y1: "8", y2: "12" }),
    /* @__PURE__ */ f("line", { x1: "12", x2: "12.01", y1: "16", y2: "16" })
  ] })
), G0 = w.forwardRef(
  (e, t) => /* @__PURE__ */ I(te, { ref: t, ...e, children: [
    /* @__PURE__ */ f("path", { d: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" }),
    /* @__PURE__ */ f("line", { x1: "12", x2: "12", y1: "9", y2: "13" }),
    /* @__PURE__ */ f("line", { x1: "12", x2: "12.01", y1: "17", y2: "17" })
  ] })
), U0 = w.forwardRef(
  (e, t) => /* @__PURE__ */ I(te, { ref: t, ...e, children: [
    /* @__PURE__ */ f("circle", { cx: "12", cy: "12", r: "10" }),
    /* @__PURE__ */ f("path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" }),
    /* @__PURE__ */ f("line", { x1: "12", x2: "12.01", y1: "17", y2: "17" })
  ] })
), q0 = w.forwardRef(
  (e, t) => /* @__PURE__ */ I(te, { ref: t, ...e, children: [
    /* @__PURE__ */ f("path", { d: "M18 6L6 18" }),
    /* @__PURE__ */ f("path", { d: "M6 6L18 18" })
  ] })
), X0 = w.forwardRef(
  (e, t) => /* @__PURE__ */ I(te, { ref: t, ...e, children: [
    /* @__PURE__ */ f("line", { x1: "12", x2: "12", y1: "5", y2: "19" }),
    /* @__PURE__ */ f("line", { x1: "5", x2: "19", y1: "12", y2: "12" })
  ] })
), K0 = w.forwardRef(
  (e, t) => /* @__PURE__ */ I(te, { ref: t, ...e, children: [
    /* @__PURE__ */ f("circle", { cx: "12", cy: "12", r: "10" }),
    /* @__PURE__ */ f("line", { x1: "12", x2: "12", y1: "8", y2: "16" }),
    /* @__PURE__ */ f("line", { x1: "8", x2: "16", y1: "12", y2: "12" })
  ] })
), Z0 = w.forwardRef(
  (e, t) => /* @__PURE__ */ I(te, { ref: t, ...e, children: [
    /* @__PURE__ */ f("path", { d: "M3 6H21" }),
    /* @__PURE__ */ f("path", { d: "M19 6V20A2 2 0 0 1 17 22H7A2 2 0 0 1 5 20V6" }),
    /* @__PURE__ */ f("path", { d: "M8 6V4A2 2 0 0 1 10 2H14A2 2 0 0 1 16 4V6" }),
    /* @__PURE__ */ f("line", { x1: "10", x2: "10", y1: "11", y2: "17" }),
    /* @__PURE__ */ f("line", { x1: "14", x2: "14", y1: "11", y2: "17" })
  ] })
), Q0 = w.forwardRef(
  (e, t) => /* @__PURE__ */ I(te, { ref: t, ...e, children: [
    /* @__PURE__ */ f("path", { d: "M19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H16L21 8V19A2 2 0 0 1 19 21Z" }),
    /* @__PURE__ */ f("polyline", { points: "17 21 17 13 7 13 7 21" }),
    /* @__PURE__ */ f("polyline", { points: "7 3 7 8 15 8" })
  ] })
), J0 = w.forwardRef(
  (e, t) => /* @__PURE__ */ I(te, { ref: t, ...e, children: [
    /* @__PURE__ */ f("path", { d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" }),
    /* @__PURE__ */ f("circle", { cx: "12", cy: "12", r: "3" })
  ] })
), ev = w.forwardRef(
  (e, t) => /* @__PURE__ */ I(te, { ref: t, ...e, children: [
    /* @__PURE__ */ f("path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" }),
    /* @__PURE__ */ f("path", { d: "M21 3V8H16" }),
    /* @__PURE__ */ f("path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" }),
    /* @__PURE__ */ f("path", { d: "M3 21V16H8" })
  ] })
), tv = w.forwardRef(
  (e, t) => /* @__PURE__ */ I(te, { ref: t, ...e, children: [
    /* @__PURE__ */ f("path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" }),
    /* @__PURE__ */ f("path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" })
  ] })
), nv = w.forwardRef(
  (e, t) => /* @__PURE__ */ I(te, { ref: t, ...e, children: [
    /* @__PURE__ */ f("line", { x1: "12", x2: "12", y1: "17", y2: "22" }),
    /* @__PURE__ */ f("path", { d: "M5 17H19V15.24A2 2 0 0 0 17.89 13.45L16.1 12.55A0.5 0.5 0 0 1 15.8 12.3V8A4 4 0 0 0 7.8 8V12.3A0.5 0.5 0 0 1 7.5 12.55L5.71 13.45A2 2 0 0 0 4.6 15.24V17Z" })
  ] })
), Tl = w.forwardRef(
  (e, t) => /* @__PURE__ */ I(te, { ref: t, ...e, children: [
    /* @__PURE__ */ f("path", { d: "M14.5 2H6A2 2 0 0 0 4 4V20A2 2 0 0 0 6 22H18A2 2 0 0 0 20 20V7.5L14.5 2Z" }),
    /* @__PURE__ */ f("polyline", { points: "14 2 14 8 20 8" })
  ] })
), rv = w.forwardRef(
  (e, t) => /* @__PURE__ */ I(te, { ref: t, ...e, children: [
    /* @__PURE__ */ f("path", { d: "M14.5 2H6A2 2 0 0 0 4 4V20A2 2 0 0 0 6 22H18A2 2 0 0 0 20 20V7.5L14.5 2Z" }),
    /* @__PURE__ */ f("polyline", { points: "14 2 14 8 20 8" }),
    /* @__PURE__ */ f("line", { x1: "8", x2: "16", y1: "13", y2: "13" }),
    /* @__PURE__ */ f("line", { x1: "8", x2: "16", y1: "17", y2: "17" }),
    /* @__PURE__ */ f("line", { x1: "8", x2: "12", y1: "9", y2: "9" })
  ] })
), ov = w.forwardRef(
  (e, t) => /* @__PURE__ */ I(te, { ref: t, ...e, children: [
    /* @__PURE__ */ f("path", { d: "M14.5 2H6A2 2 0 0 0 4 4V20A2 2 0 0 0 6 22H18A2 2 0 0 0 20 20V7.5L14.5 2Z" }),
    /* @__PURE__ */ f("polyline", { points: "14 2 14 8 20 8" }),
    /* @__PURE__ */ f("rect", { x: "8", y: "13", width: "8", height: "6", rx: "1" }),
    /* @__PURE__ */ f("line", { x1: "12", x2: "12", y1: "13", y2: "19" }),
    /* @__PURE__ */ f("line", { x1: "8", x2: "16", y1: "16", y2: "16" })
  ] })
), Al = w.forwardRef(
  (e, t) => /* @__PURE__ */ I(te, { ref: t, ...e, children: [
    /* @__PURE__ */ f("path", { d: "M14.5 2H6A2 2 0 0 0 4 4V20A2 2 0 0 0 6 22H18A2 2 0 0 0 20 20V7.5L14.5 2Z" }),
    /* @__PURE__ */ f("polyline", { points: "14 2 14 8 20 8" }),
    /* @__PURE__ */ f("path", { d: "M12 12V18" }),
    /* @__PURE__ */ f("path", { d: "M15 15L12 12L9 15" })
  ] })
), _l = w.forwardRef(
  (e, t) => /* @__PURE__ */ I(te, { ref: t, ...e, children: [
    /* @__PURE__ */ f("rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }),
    /* @__PURE__ */ f("circle", { cx: "9", cy: "9", r: "2" }),
    /* @__PURE__ */ f("path", { d: "M21 15L17.91 11.91A2 2 0 0 0 15.09 11.91L6 21" }),
    /* @__PURE__ */ f("path", { d: "M16 12L18.5 9.5A2 2 0 0 1 21.32 9.5L21 12" })
  ] })
), av = w.forwardRef(
  (e, t) => /* @__PURE__ */ I(te, { ref: t, ...e, children: [
    /* @__PURE__ */ f("rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", ry: "2" }),
    /* @__PURE__ */ f("line", { x1: "16", x2: "16", y1: "2", y2: "6" }),
    /* @__PURE__ */ f("line", { x1: "8", x2: "8", y1: "2", y2: "6" }),
    /* @__PURE__ */ f("line", { x1: "3", x2: "21", y1: "10", y2: "10" })
  ] })
), sv = w.forwardRef(
  ({ className: e, size: t = ao, ...n }, r) => /* @__PURE__ */ f(
    "svg",
    {
      ref: r,
      width: t,
      height: t,
      viewBox: "0 0 24 22",
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      className: E("text-current", e),
      ...n,
      children: /* @__PURE__ */ I("g", { fill: "currentColor", children: [
        /* @__PURE__ */ f("path", { d: "M17.9361 18.3242C18.5184 19.9414 20.3015 20.7804 21.9188 20.1981C23.536 19.6157 24.375 17.8326 23.7927 16.2154L19.2776 3.67591C18.6953 2.05867 16.9122 1.21969 15.2949 1.802C13.6777 2.38432 12.8387 4.16742 13.421 5.78466L17.9361 18.3242Z" }),
        /* @__PURE__ */ f("path", { d: "M13.3741 3.67585C13.9564 2.0586 15.7395 1.21962 17.3568 1.80194C18.974 2.38425 19.813 4.16735 19.2307 5.7846L14.7156 18.3241C14.1333 19.9413 12.3502 20.7803 10.7329 20.198C9.11569 19.6157 8.27671 17.8326 8.85903 16.2153L13.3741 3.67585Z" }),
        /* @__PURE__ */ f(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M1.21568 15.8655L3.40558 9.78358L8.00981 11.4414L5.81991 17.5233C5.36212 18.7948 3.96031 19.4543 2.68888 18.9965C1.41746 18.5387 0.757885 17.1369 1.21568 15.8655ZM6.82668 17.8858C6.16868 19.7133 4.15382 20.6613 2.32638 20.0033C0.498935 19.3453 -0.449084 17.3305 0.208918 15.503L2.39882 9.42108L2.76131 8.41435L2.76123 8.41432L4.55271 3.43893C5.21071 1.61148 7.22556 0.663465 9.05301 1.32147C10.8804 1.97947 11.8285 3.99432 11.1705 5.82177L9.379 10.7971L9.37908 10.7972L9.01658 11.8039L6.82668 17.8858ZM8.31315 10.1149C8.24214 10.3082 8.02787 10.4074 7.83456 10.3364C7.64124 10.2654 7.54209 10.0511 7.6131 9.85778L9.13383 5.71775C9.20484 5.52444 9.41912 5.42529 9.61243 5.4963C9.80575 5.56731 9.90489 5.78158 9.83388 5.9749L8.31315 10.1149ZM9.96695 4.76687C10.1639 4.76687 10.3236 4.60718 10.3236 4.41019C10.3236 4.2132 10.1639 4.05351 9.96695 4.05351C9.76996 4.05351 9.61027 4.2132 9.61027 4.41019C9.61027 4.60718 9.76996 4.76687 9.96695 4.76687Z"
          }
        )
      ] })
    }
  )
), iv = w.forwardRef(
  ({ className: e, size: t = ao, ...n }, r) => /* @__PURE__ */ f(
    "svg",
    {
      ref: r,
      width: t,
      height: t,
      viewBox: "0 0 12 12",
      fill: "none",
      className: E(e),
      ...n,
      children: /* @__PURE__ */ I("g", { transform: "translate(-1841 -61)", children: [
        /* @__PURE__ */ f(
          "circle",
          {
            cx: "6",
            cy: "6",
            r: "6",
            transform: "translate(1841 61)",
            fill: "#ffd200"
          }
        ),
        /* @__PURE__ */ f(
          "text",
          {
            transform: "translate(1844 70)",
            fill: "#424242",
            fontSize: "8",
            fontFamily: "Pretendard-Bold, Pretendard",
            fontWeight: "700",
            children: /* @__PURE__ */ f("tspan", { x: "0", y: "0", children: "N" })
          }
        )
      ] })
    }
  )
), Il = De(
  E(
    "flex items-center justify-between",
    "rounded-md px-4 py-2.5",
    "text-sm font-medium",
    "outline-none",
    "transition-all",
    "w-full min-w-0"
  ),
  {
    variants: {
      variant: {
        default: E(
          "bg-white text-cms-black border border-black",
          "hover:bg-cms-gray-100"
        ),
        outline: E(
          "border border-cms-outline bg-transparent",
          "hover:bg-cms-gray-200"
        ),
        ghost: "border-none bg-transparent hover:bg-cms-gray-200 hover:text-black"
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
), so = Dt(
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
    maxHeight: h = 200,
    ...m
  }, v) => {
    const [g, y] = be(!1), [b, x] = be(""), [C, M] = be(
      d ? t ? [t] : [] : []
    ), N = Ct(null), k = Ct(null), O = e.find((S) => S.value === t), T = d ? C.length > 0 ? `${C.length}개 선택됨` : n : (O == null ? void 0 : O.label) || n, Y = e.filter(
      (S) => S.label.toLowerCase().includes(b.toLowerCase())
    ), _ = () => {
      o || (y(!g), x(""));
    }, $ = (S) => {
      if (!S.disabled)
        if (d) {
          const A = C.includes(S.value) ? C.filter((D) => D !== S.value) : [...C, S.value];
          M(A), r == null || r(A.join(","));
        } else
          r == null || r(S.value), y(!1);
    }, P = (S) => {
      S.stopPropagation(), d && M([]), r == null || r("");
    }, B = (S) => {
      S.key === "Escape" ? y(!1) : (S.key === "Enter" || S.key === " ") && (S.preventDefault(), _());
    };
    return At(() => {
      const S = (A) => {
        N.current && !N.current.contains(A.target) && y(!1);
      };
      return document.addEventListener("mousedown", S), () => document.removeEventListener("mousedown", S);
    }, []), At(() => {
      g && l && k.current && k.current.focus();
    }, [g, l]), /* @__PURE__ */ I("div", { ref: N, className: "relative w-full", children: [
      /* @__PURE__ */ I(
        "button",
        {
          ref: v,
          type: "button",
          className: E(
            Il({ variant: i, size: c }),
            o && "opacity-50 cursor-not-allowed",
            a
          ),
          onClick: _,
          onKeyDown: B,
          disabled: o,
          "aria-expanded": g,
          "aria-haspopup": "listbox",
          ...m,
          children: [
            /* @__PURE__ */ f(
              "span",
              {
                className: E(
                  "truncate flex-1 text-left",
                  !O && !d && "text-cms-gray-400"
                ),
                children: T
              }
            ),
            /* @__PURE__ */ I("div", { className: "flex items-center gap-2 ml-3", children: [
              u && (t || C.length > 0) && /* @__PURE__ */ f(
                "button",
                {
                  type: "button",
                  className: E(
                    "border-0 bg-transparent",
                    "p-1 rounded text-cms-gray-400 transition-colors",
                    "hover:text-cms-black"
                  ),
                  onClick: P,
                  "aria-label": "선택 취소",
                  children: /* @__PURE__ */ f(Un, { className: "w-3 h-3" })
                }
              ),
              /* @__PURE__ */ f(
                Pl,
                {
                  className: E("w-3 h-3 transition-transform duration-200", g && "rotate-180")
                }
              )
            ] })
          ]
        }
      ),
      g && /* @__PURE__ */ I(
        "div",
        {
          className: E(
            "absolute z-50 mt-1 py-1 w-full min-w-0",
            "rounded-md border border-cms-gray-300",
            "bg-white shadow-lg",
            s
          ),
          style: { maxHeight: `${h}px` },
          children: [
            l && /* @__PURE__ */ f("div", { className: "px-3 py-2 border-b border-cms-gray-200", children: /* @__PURE__ */ f(
              "input",
              {
                ref: k,
                type: "text",
                value: b,
                onChange: (S) => x(S.target.value),
                placeholder: "검색...",
                className: E(
                  "w-full px-2 py-1 text-sm",
                  "rounded outline-none",
                  "border border-cms-gray-300",
                  "focus:ring-1 focus:ring-cms-gray-400"
                )
              }
            ) }),
            /* @__PURE__ */ f("div", { className: "max-h-48 overflow-y-auto", children: Y.length === 0 ? /* @__PURE__ */ f("div", { className: "px-3 py-2 text-sm text-cms-gray-400 text-center", children: b ? "검색 결과가 없습니다" : "옵션이 없습니다" }) : Y.map((S) => {
              const A = d ? C.includes(S.value) : t === S.value;
              return /* @__PURE__ */ I(
                "button",
                {
                  type: "button",
                  className: E(
                    "border-0",
                    "flex items-center justify-between gap-2",
                    "w-full px-3 py-2 ",
                    "text-left text-sm",
                    "transition-colors",
                    S.disabled ? "text-cms-gray-400 cursor-not-allowed bg-white" : "text-cms-black bg-white hover:bg-cms-gray-100 cursor-pointer",
                    A && "bg-cms-gray-150 font-medium"
                  ),
                  onClick: () => $(S),
                  disabled: S.disabled,
                  children: [
                    /* @__PURE__ */ f("span", { className: "truncate", children: S.label }),
                    A && /* @__PURE__ */ f(
                      "svg",
                      {
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "16",
                        height: "16",
                        viewBox: "0 0 16 16",
                        fill: "none",
                        className: "w-4 h-4 text-black shrink-0",
                        children: /* @__PURE__ */ f(
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
                S.value
              );
            }) })
          ]
        }
      )
    ] });
  }
);
so.displayName = "Dropdown";
const Wl = Dt(
  ({ label: e, helperText: t, error: n, required: r, className: o, ...a }, s) => /* @__PURE__ */ I("div", { className: E("space-y-1", o), children: [
    e && /* @__PURE__ */ I("label", { className: "block text-sm font-medium text-cms-black", children: [
      e,
      r && /* @__PURE__ */ f("span", { className: "text-cms-red-500 ml-1", children: "*" })
    ] }),
    /* @__PURE__ */ f(
      so,
      {
        ref: s,
        ...a,
        className: E(n && "border-cms-red-500 focus:ring-cms-red-500")
      }
    ),
    (t || n) && /* @__PURE__ */ f(
      "p",
      {
        className: E(
          "text-xs",
          n ? "text-cms-red-500" : "text-cms-gray-400"
        ),
        children: n || t
      }
    )
  ] })
);
Wl.displayName = "Select";
const $l = Dt(
  ({ options: e, loading: t = !1, createable: n = !1, onCreateOption: r, ...o }, a) => {
    const [s] = be(""), i = e.filter(
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
    return /* @__PURE__ */ f(
      so,
      {
        ref: a,
        ...o,
        options: l,
        searchable: !0,
        dropdownClassName: E(t && "opacity-75", o.dropdownClassName),
        onValueChange: (u) => {
          var d;
          if (u.startsWith("__create__")) {
            const h = u.replace("__create__", "");
            r == null || r(h);
          } else
            (d = o.onValueChange) == null || d.call(o, u);
        }
      }
    );
  }
);
$l.displayName = "Combobox";
function ee(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(o) {
    if (e == null || e(o), n === !1 || !o.defaultPrevented)
      return t == null ? void 0 : t(o);
  };
}
function qo(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function Ua(...e) {
  return (t) => {
    let n = !1;
    const r = e.map((o) => {
      const a = qo(o, t);
      return !n && typeof a == "function" && (n = !0), a;
    });
    if (n)
      return () => {
        for (let o = 0; o < r.length; o++) {
          const a = r[o];
          typeof a == "function" ? a() : qo(e[o], null);
        }
      };
  };
}
function le(...e) {
  return p.useCallback(Ua(...e), e);
}
function Fl(e, t) {
  const n = p.createContext(t), r = (a) => {
    const { children: s, ...i } = a, c = p.useMemo(() => i, Object.values(i));
    return /* @__PURE__ */ f(n.Provider, { value: c, children: s });
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
function We(e, t = []) {
  let n = [];
  function r(a, s) {
    const i = p.createContext(s), c = n.length;
    n = [...n, s];
    const l = (d) => {
      var b;
      const { scope: h, children: m, ...v } = d, g = ((b = h == null ? void 0 : h[e]) == null ? void 0 : b[c]) || i, y = p.useMemo(() => v, Object.values(v));
      return /* @__PURE__ */ f(g.Provider, { value: y, children: m });
    };
    l.displayName = a + "Provider";
    function u(d, h) {
      var g;
      const m = ((g = h == null ? void 0 : h[e]) == null ? void 0 : g[c]) || i, v = p.useContext(m);
      if (v) return v;
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
  return o.scopeName = e, [r, Yl(o, ...t)];
}
function Yl(...e) {
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
function gn(e) {
  const t = /* @__PURE__ */ Ll(e), n = p.forwardRef((r, o) => {
    const { children: a, ...s } = r, i = p.Children.toArray(a), c = i.find(Hl);
    if (c) {
      const l = c.props.children, u = i.map((d) => d === c ? p.Children.count(l) > 1 ? p.Children.only(null) : p.isValidElement(l) ? l.props.children : null : d);
      return /* @__PURE__ */ f(t, { ...s, ref: o, children: p.isValidElement(l) ? p.cloneElement(l, void 0, u) : null });
    }
    return /* @__PURE__ */ f(t, { ...s, ref: o, children: a });
  });
  return n.displayName = `${e}.Slot`, n;
}
// @__NO_SIDE_EFFECTS__
function Ll(e) {
  const t = p.forwardRef((n, r) => {
    const { children: o, ...a } = n;
    if (p.isValidElement(o)) {
      const s = Vl(o), i = zl(a, o.props);
      return o.type !== p.Fragment && (i.ref = r ? Ua(r, s) : s), p.cloneElement(o, i);
    }
    return p.Children.count(o) > 1 ? p.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var qa = Symbol("radix.slottable");
// @__NO_SIDE_EFFECTS__
function Bl(e) {
  const t = ({ children: n }) => /* @__PURE__ */ f(Tt, { children: n });
  return t.displayName = `${e}.Slottable`, t.__radixId = qa, t;
}
function Hl(e) {
  return p.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === qa;
}
function zl(e, t) {
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
function Vl(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var jl = [
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
], oe = jl.reduce((e, t) => {
  const n = /* @__PURE__ */ gn(`Primitive.${t}`), r = p.forwardRef((o, a) => {
    const { asChild: s, ...i } = o, c = s ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ f(c, { ...i, ref: a });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {});
function Gl(e, t) {
  e && $a.flushSync(() => e.dispatchEvent(t));
}
function _t(e) {
  const t = p.useRef(e);
  return p.useEffect(() => {
    t.current = e;
  }), p.useMemo(() => (...n) => {
    var r;
    return (r = t.current) == null ? void 0 : r.call(t, ...n);
  }, []);
}
function Ul(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = _t(e);
  p.useEffect(() => {
    const r = (o) => {
      o.key === "Escape" && n(o);
    };
    return t.addEventListener("keydown", r, { capture: !0 }), () => t.removeEventListener("keydown", r, { capture: !0 });
  }, [n, t]);
}
var ql = "DismissableLayer", Ur = "dismissableLayer.update", Xl = "dismissableLayer.pointerDownOutside", Kl = "dismissableLayer.focusOutside", Xo, Xa = p.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), er = p.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: r,
      onPointerDownOutside: o,
      onFocusOutside: a,
      onInteractOutside: s,
      onDismiss: i,
      ...c
    } = e, l = p.useContext(Xa), [u, d] = p.useState(null), h = (u == null ? void 0 : u.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), [, m] = p.useState({}), v = le(t, (O) => d(O)), g = Array.from(l.layers), [y] = [...l.layersWithOutsidePointerEventsDisabled].slice(-1), b = g.indexOf(y), x = u ? g.indexOf(u) : -1, C = l.layersWithOutsidePointerEventsDisabled.size > 0, M = x >= b, N = Jl((O) => {
      const T = O.target, Y = [...l.branches].some((_) => _.contains(T));
      !M || Y || (o == null || o(O), s == null || s(O), O.defaultPrevented || i == null || i());
    }, h), k = ed((O) => {
      const T = O.target;
      [...l.branches].some((_) => _.contains(T)) || (a == null || a(O), s == null || s(O), O.defaultPrevented || i == null || i());
    }, h);
    return Ul((O) => {
      x === l.layers.size - 1 && (r == null || r(O), !O.defaultPrevented && i && (O.preventDefault(), i()));
    }, h), p.useEffect(() => {
      if (u)
        return n && (l.layersWithOutsidePointerEventsDisabled.size === 0 && (Xo = h.body.style.pointerEvents, h.body.style.pointerEvents = "none"), l.layersWithOutsidePointerEventsDisabled.add(u)), l.layers.add(u), Ko(), () => {
          n && l.layersWithOutsidePointerEventsDisabled.size === 1 && (h.body.style.pointerEvents = Xo);
        };
    }, [u, h, n, l]), p.useEffect(() => () => {
      u && (l.layers.delete(u), l.layersWithOutsidePointerEventsDisabled.delete(u), Ko());
    }, [u, l]), p.useEffect(() => {
      const O = () => m({});
      return document.addEventListener(Ur, O), () => document.removeEventListener(Ur, O);
    }, []), /* @__PURE__ */ f(
      oe.div,
      {
        ...c,
        ref: v,
        style: {
          pointerEvents: C ? M ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: ee(e.onFocusCapture, k.onFocusCapture),
        onBlurCapture: ee(e.onBlurCapture, k.onBlurCapture),
        onPointerDownCapture: ee(
          e.onPointerDownCapture,
          N.onPointerDownCapture
        )
      }
    );
  }
);
er.displayName = ql;
var Zl = "DismissableLayerBranch", Ql = p.forwardRef((e, t) => {
  const n = p.useContext(Xa), r = p.useRef(null), o = le(t, r);
  return p.useEffect(() => {
    const a = r.current;
    if (a)
      return n.branches.add(a), () => {
        n.branches.delete(a);
      };
  }, [n.branches]), /* @__PURE__ */ f(oe.div, { ...e, ref: o });
});
Ql.displayName = Zl;
function Jl(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = _t(e), r = p.useRef(!1), o = p.useRef(() => {
  });
  return p.useEffect(() => {
    const a = (i) => {
      if (i.target && !r.current) {
        let c = function() {
          Ka(
            Xl,
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
function ed(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = _t(e), r = p.useRef(!1);
  return p.useEffect(() => {
    const o = (a) => {
      a.target && !r.current && Ka(Kl, n, { originalEvent: a }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o);
  }, [t, n]), {
    onFocusCapture: () => r.current = !0,
    onBlurCapture: () => r.current = !1
  };
}
function Ko() {
  const e = new CustomEvent(Ur);
  document.dispatchEvent(e);
}
function Ka(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target, a = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && o.addEventListener(e, t, { once: !0 }), r ? Gl(o, a) : o.dispatchEvent(a);
}
var Rr = 0;
function Za() {
  p.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? Zo()), document.body.insertAdjacentElement("beforeend", e[1] ?? Zo()), Rr++, () => {
      Rr === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), Rr--;
    };
  }, []);
}
function Zo() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var Pr = "focusScope.autoFocusOnMount", Tr = "focusScope.autoFocusOnUnmount", Qo = { bubbles: !1, cancelable: !0 }, td = "FocusScope", io = p.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: r = !1,
    onMountAutoFocus: o,
    onUnmountAutoFocus: a,
    ...s
  } = e, [i, c] = p.useState(null), l = _t(o), u = _t(a), d = p.useRef(null), h = le(t, (g) => c(g)), m = p.useRef({
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
      let g = function(C) {
        if (m.paused || !i) return;
        const M = C.target;
        i.contains(M) ? d.current = M : xt(d.current, { select: !0 });
      }, y = function(C) {
        if (m.paused || !i) return;
        const M = C.relatedTarget;
        M !== null && (i.contains(M) || xt(d.current, { select: !0 }));
      }, b = function(C) {
        if (document.activeElement === document.body)
          for (const N of C)
            N.removedNodes.length > 0 && xt(i);
      };
      document.addEventListener("focusin", g), document.addEventListener("focusout", y);
      const x = new MutationObserver(b);
      return i && x.observe(i, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", g), document.removeEventListener("focusout", y), x.disconnect();
      };
    }
  }, [r, i, m.paused]), p.useEffect(() => {
    if (i) {
      ea.add(m);
      const g = document.activeElement;
      if (!i.contains(g)) {
        const b = new CustomEvent(Pr, Qo);
        i.addEventListener(Pr, l), i.dispatchEvent(b), b.defaultPrevented || (nd(id(Qa(i)), { select: !0 }), document.activeElement === g && xt(i));
      }
      return () => {
        i.removeEventListener(Pr, l), setTimeout(() => {
          const b = new CustomEvent(Tr, Qo);
          i.addEventListener(Tr, u), i.dispatchEvent(b), b.defaultPrevented || xt(g ?? document.body, { select: !0 }), i.removeEventListener(Tr, u), ea.remove(m);
        }, 0);
      };
    }
  }, [i, l, u, m]);
  const v = p.useCallback(
    (g) => {
      if (!n && !r || m.paused) return;
      const y = g.key === "Tab" && !g.altKey && !g.ctrlKey && !g.metaKey, b = document.activeElement;
      if (y && b) {
        const x = g.currentTarget, [C, M] = rd(x);
        C && M ? !g.shiftKey && b === M ? (g.preventDefault(), n && xt(C, { select: !0 })) : g.shiftKey && b === C && (g.preventDefault(), n && xt(M, { select: !0 })) : b === x && g.preventDefault();
      }
    },
    [n, r, m.paused]
  );
  return /* @__PURE__ */ f(oe.div, { tabIndex: -1, ...s, ref: h, onKeyDown: v });
});
io.displayName = td;
function nd(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if (xt(r, { select: t }), document.activeElement !== n) return;
}
function rd(e) {
  const t = Qa(e), n = Jo(t, e), r = Jo(t.reverse(), e);
  return [n, r];
}
function Qa(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function Jo(e, t) {
  for (const n of e)
    if (!od(n, { upTo: t })) return n;
}
function od(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function ad(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function xt(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && ad(e) && t && e.select();
  }
}
var ea = sd();
function sd() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && (n == null || n.pause()), e = ta(e, t), e.unshift(t);
    },
    remove(t) {
      var n;
      e = ta(e, t), (n = e[0]) == null || n.resume();
    }
  };
}
function ta(e, t) {
  const n = [...e], r = n.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
function id(e) {
  return e.filter((t) => t.tagName !== "A");
}
var ft = globalThis != null && globalThis.document ? p.useLayoutEffect : () => {
}, cd = p[" useId ".trim().toString()] || (() => {
}), ld = 0;
function kt(e) {
  const [t, n] = p.useState(cd());
  return ft(() => {
    n((r) => r ?? String(ld++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
const dd = ["top", "right", "bottom", "left"], Nt = Math.min, Ae = Math.max, qn = Math.round, Wn = Math.floor, tt = (e) => ({
  x: e,
  y: e
}), ud = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, fd = {
  start: "end",
  end: "start"
};
function qr(e, t, n) {
  return Ae(e, Nt(t, n));
}
function ht(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function mt(e) {
  return e.split("-")[0];
}
function rn(e) {
  return e.split("-")[1];
}
function co(e) {
  return e === "x" ? "y" : "x";
}
function lo(e) {
  return e === "y" ? "height" : "width";
}
const hd = /* @__PURE__ */ new Set(["top", "bottom"]);
function Je(e) {
  return hd.has(mt(e)) ? "y" : "x";
}
function uo(e) {
  return co(Je(e));
}
function md(e, t, n) {
  n === void 0 && (n = !1);
  const r = rn(e), o = uo(e), a = lo(o);
  let s = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[a] > t.floating[a] && (s = Xn(s)), [s, Xn(s)];
}
function pd(e) {
  const t = Xn(e);
  return [Xr(e), t, Xr(t)];
}
function Xr(e) {
  return e.replace(/start|end/g, (t) => fd[t]);
}
const na = ["left", "right"], ra = ["right", "left"], gd = ["top", "bottom"], bd = ["bottom", "top"];
function yd(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? ra : na : t ? na : ra;
    case "left":
    case "right":
      return t ? gd : bd;
    default:
      return [];
  }
}
function vd(e, t, n, r) {
  const o = rn(e);
  let a = yd(mt(e), n === "start", r);
  return o && (a = a.map((s) => s + "-" + o), t && (a = a.concat(a.map(Xr)))), a;
}
function Xn(e) {
  return e.replace(/left|right|bottom|top/g, (t) => ud[t]);
}
function wd(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Ja(e) {
  return typeof e != "number" ? wd(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function Kn(e) {
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
function oa(e, t, n) {
  let {
    reference: r,
    floating: o
  } = e;
  const a = Je(t), s = uo(t), i = lo(s), c = mt(t), l = a === "y", u = r.x + r.width / 2 - o.width / 2, d = r.y + r.height / 2 - o.height / 2, h = r[i] / 2 - o[i] / 2;
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
  switch (rn(t)) {
    case "start":
      m[s] -= h * (n && l ? -1 : 1);
      break;
    case "end":
      m[s] += h * (n && l ? -1 : 1);
      break;
  }
  return m;
}
const xd = async (e, t, n) => {
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
  } = oa(l, r, c), h = r, m = {}, v = 0;
  for (let g = 0; g < i.length; g++) {
    const {
      name: y,
      fn: b
    } = i[g], {
      x,
      y: C,
      data: M,
      reset: N
    } = await b({
      x: u,
      y: d,
      initialPlacement: r,
      placement: h,
      strategy: o,
      middlewareData: m,
      rects: l,
      platform: s,
      elements: {
        reference: e,
        floating: t
      }
    });
    u = x ?? u, d = C ?? d, m = {
      ...m,
      [y]: {
        ...m[y],
        ...M
      }
    }, N && v <= 50 && (v++, typeof N == "object" && (N.placement && (h = N.placement), N.rects && (l = N.rects === !0 ? await s.getElementRects({
      reference: e,
      floating: t,
      strategy: o
    }) : N.rects), {
      x: u,
      y: d
    } = oa(l, h, c)), g = -1);
  }
  return {
    x: u,
    y: d,
    placement: h,
    strategy: o,
    middlewareData: m
  };
};
async function bn(e, t) {
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
    altBoundary: h = !1,
    padding: m = 0
  } = ht(t, e), v = Ja(m), y = i[h ? d === "floating" ? "reference" : "floating" : d], b = Kn(await a.getClippingRect({
    element: (n = await (a.isElement == null ? void 0 : a.isElement(y))) == null || n ? y : y.contextElement || await (a.getDocumentElement == null ? void 0 : a.getDocumentElement(i.floating)),
    boundary: l,
    rootBoundary: u,
    strategy: c
  })), x = d === "floating" ? {
    x: r,
    y: o,
    width: s.floating.width,
    height: s.floating.height
  } : s.reference, C = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(i.floating)), M = await (a.isElement == null ? void 0 : a.isElement(C)) ? await (a.getScale == null ? void 0 : a.getScale(C)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, N = Kn(a.convertOffsetParentRelativeRectToViewportRelativeRect ? await a.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: i,
    rect: x,
    offsetParent: C,
    strategy: c
  }) : x);
  return {
    top: (b.top - N.top + v.top) / M.y,
    bottom: (N.bottom - b.bottom + v.bottom) / M.y,
    left: (b.left - N.left + v.left) / M.x,
    right: (N.right - b.right + v.right) / M.x
  };
}
const Cd = (e) => ({
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
    } = ht(e, t) || {};
    if (l == null)
      return {};
    const d = Ja(u), h = {
      x: n,
      y: r
    }, m = uo(o), v = lo(m), g = await s.getDimensions(l), y = m === "y", b = y ? "top" : "left", x = y ? "bottom" : "right", C = y ? "clientHeight" : "clientWidth", M = a.reference[v] + a.reference[m] - h[m] - a.floating[v], N = h[m] - a.reference[m], k = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(l));
    let O = k ? k[C] : 0;
    (!O || !await (s.isElement == null ? void 0 : s.isElement(k))) && (O = i.floating[C] || a.floating[v]);
    const T = M / 2 - N / 2, Y = O / 2 - g[v] / 2 - 1, _ = Nt(d[b], Y), $ = Nt(d[x], Y), P = _, B = O - g[v] - $, S = O / 2 - g[v] / 2 + T, A = qr(P, S, B), D = !c.arrow && rn(o) != null && S !== A && a.reference[v] / 2 - (S < P ? _ : $) - g[v] / 2 < 0, W = D ? S < P ? S - P : S - B : 0;
    return {
      [m]: h[m] + W,
      data: {
        [m]: A,
        centerOffset: S - A - W,
        ...D && {
          alignmentOffset: W
        }
      },
      reset: D
    };
  }
}), kd = function(e) {
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
        fallbackPlacements: h,
        fallbackStrategy: m = "bestFit",
        fallbackAxisSideDirection: v = "none",
        flipAlignment: g = !0,
        ...y
      } = ht(e, t);
      if ((n = a.arrow) != null && n.alignmentOffset)
        return {};
      const b = mt(o), x = Je(i), C = mt(i) === i, M = await (c.isRTL == null ? void 0 : c.isRTL(l.floating)), N = h || (C || !g ? [Xn(i)] : pd(i)), k = v !== "none";
      !h && k && N.push(...vd(i, g, v, M));
      const O = [i, ...N], T = await bn(t, y), Y = [];
      let _ = ((r = a.flip) == null ? void 0 : r.overflows) || [];
      if (u && Y.push(T[b]), d) {
        const S = md(o, s, M);
        Y.push(T[S[0]], T[S[1]]);
      }
      if (_ = [..._, {
        placement: o,
        overflows: Y
      }], !Y.every((S) => S <= 0)) {
        var $, P;
        const S = ((($ = a.flip) == null ? void 0 : $.index) || 0) + 1, A = O[S];
        if (A && (!(d === "alignment" ? x !== Je(A) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        _.every((R) => Je(R.placement) === x ? R.overflows[0] > 0 : !0)))
          return {
            data: {
              index: S,
              overflows: _
            },
            reset: {
              placement: A
            }
          };
        let D = (P = _.filter((W) => W.overflows[0] <= 0).sort((W, R) => W.overflows[1] - R.overflows[1])[0]) == null ? void 0 : P.placement;
        if (!D)
          switch (m) {
            case "bestFit": {
              var B;
              const W = (B = _.filter((R) => {
                if (k) {
                  const F = Je(R.placement);
                  return F === x || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  F === "y";
                }
                return !0;
              }).map((R) => [R.placement, R.overflows.filter((F) => F > 0).reduce((F, L) => F + L, 0)]).sort((R, F) => R[1] - F[1])[0]) == null ? void 0 : B[0];
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
function aa(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function sa(e) {
  return dd.some((t) => e[t] >= 0);
}
const Md = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n
      } = t, {
        strategy: r = "referenceHidden",
        ...o
      } = ht(e, t);
      switch (r) {
        case "referenceHidden": {
          const a = await bn(t, {
            ...o,
            elementContext: "reference"
          }), s = aa(a, n.reference);
          return {
            data: {
              referenceHiddenOffsets: s,
              referenceHidden: sa(s)
            }
          };
        }
        case "escaped": {
          const a = await bn(t, {
            ...o,
            altBoundary: !0
          }), s = aa(a, n.floating);
          return {
            data: {
              escapedOffsets: s,
              escaped: sa(s)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, es = /* @__PURE__ */ new Set(["left", "top"]);
async function Nd(e, t) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), s = mt(n), i = rn(n), c = Je(n) === "y", l = es.has(s) ? -1 : 1, u = a && c ? -1 : 1, d = ht(t, e);
  let {
    mainAxis: h,
    crossAxis: m,
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
  return i && typeof v == "number" && (m = i === "end" ? v * -1 : v), c ? {
    x: m * u,
    y: h * l
  } : {
    x: h * l,
    y: m * u
  };
}
const Sd = function(e) {
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
      } = t, c = await Nd(t, e);
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
}, Dd = function(e) {
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
              x: b,
              y: x
            } = y;
            return {
              x: b,
              y: x
            };
          }
        },
        ...c
      } = ht(e, t), l = {
        x: n,
        y: r
      }, u = await bn(t, c), d = Je(mt(o)), h = co(d);
      let m = l[h], v = l[d];
      if (a) {
        const y = h === "y" ? "top" : "left", b = h === "y" ? "bottom" : "right", x = m + u[y], C = m - u[b];
        m = qr(x, m, C);
      }
      if (s) {
        const y = d === "y" ? "top" : "left", b = d === "y" ? "bottom" : "right", x = v + u[y], C = v - u[b];
        v = qr(x, v, C);
      }
      const g = i.fn({
        ...t,
        [h]: m,
        [d]: v
      });
      return {
        ...g,
        data: {
          x: g.x - n,
          y: g.y - r,
          enabled: {
            [h]: a,
            [d]: s
          }
        }
      };
    }
  };
}, Od = function(e) {
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
      } = ht(e, t), u = {
        x: n,
        y: r
      }, d = Je(o), h = co(d);
      let m = u[h], v = u[d];
      const g = ht(i, t), y = typeof g == "number" ? {
        mainAxis: g,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...g
      };
      if (c) {
        const C = h === "y" ? "height" : "width", M = a.reference[h] - a.floating[C] + y.mainAxis, N = a.reference[h] + a.reference[C] - y.mainAxis;
        m < M ? m = M : m > N && (m = N);
      }
      if (l) {
        var b, x;
        const C = h === "y" ? "width" : "height", M = es.has(mt(o)), N = a.reference[d] - a.floating[C] + (M && ((b = s.offset) == null ? void 0 : b[d]) || 0) + (M ? 0 : y.crossAxis), k = a.reference[d] + a.reference[C] + (M ? 0 : ((x = s.offset) == null ? void 0 : x[d]) || 0) - (M ? y.crossAxis : 0);
        v < N ? v = N : v > k && (v = k);
      }
      return {
        [h]: m,
        [d]: v
      };
    }
  };
}, Ed = function(e) {
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
      } = ht(e, t), u = await bn(t, l), d = mt(o), h = rn(o), m = Je(o) === "y", {
        width: v,
        height: g
      } = a.floating;
      let y, b;
      d === "top" || d === "bottom" ? (y = d, b = h === (await (s.isRTL == null ? void 0 : s.isRTL(i.floating)) ? "start" : "end") ? "left" : "right") : (b = d, y = h === "end" ? "top" : "bottom");
      const x = g - u.top - u.bottom, C = v - u.left - u.right, M = Nt(g - u[y], x), N = Nt(v - u[b], C), k = !t.middlewareData.shift;
      let O = M, T = N;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (T = C), (r = t.middlewareData.shift) != null && r.enabled.y && (O = x), k && !h) {
        const _ = Ae(u.left, 0), $ = Ae(u.right, 0), P = Ae(u.top, 0), B = Ae(u.bottom, 0);
        m ? T = v - 2 * (_ !== 0 || $ !== 0 ? _ + $ : Ae(u.left, u.right)) : O = g - 2 * (P !== 0 || B !== 0 ? P + B : Ae(u.top, u.bottom));
      }
      await c({
        ...t,
        availableWidth: T,
        availableHeight: O
      });
      const Y = await s.getDimensions(i.floating);
      return v !== Y.width || g !== Y.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function tr() {
  return typeof window < "u";
}
function on(e) {
  return ts(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function _e(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function rt(e) {
  var t;
  return (t = (ts(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function ts(e) {
  return tr() ? e instanceof Node || e instanceof _e(e).Node : !1;
}
function He(e) {
  return tr() ? e instanceof Element || e instanceof _e(e).Element : !1;
}
function nt(e) {
  return tr() ? e instanceof HTMLElement || e instanceof _e(e).HTMLElement : !1;
}
function ia(e) {
  return !tr() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof _e(e).ShadowRoot;
}
const Rd = /* @__PURE__ */ new Set(["inline", "contents"]);
function Cn(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: o
  } = ze(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !Rd.has(o);
}
const Pd = /* @__PURE__ */ new Set(["table", "td", "th"]);
function Td(e) {
  return Pd.has(on(e));
}
const Ad = [":popover-open", ":modal"];
function nr(e) {
  return Ad.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const _d = ["transform", "translate", "scale", "rotate", "perspective"], Id = ["transform", "translate", "scale", "rotate", "perspective", "filter"], Wd = ["paint", "layout", "strict", "content"];
function fo(e) {
  const t = ho(), n = He(e) ? ze(e) : e;
  return _d.some((r) => n[r] ? n[r] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || Id.some((r) => (n.willChange || "").includes(r)) || Wd.some((r) => (n.contain || "").includes(r));
}
function $d(e) {
  let t = St(e);
  for (; nt(t) && !Qt(t); ) {
    if (fo(t))
      return t;
    if (nr(t))
      return null;
    t = St(t);
  }
  return null;
}
function ho() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const Fd = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function Qt(e) {
  return Fd.has(on(e));
}
function ze(e) {
  return _e(e).getComputedStyle(e);
}
function rr(e) {
  return He(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function St(e) {
  if (on(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    ia(e) && e.host || // Fallback.
    rt(e)
  );
  return ia(t) ? t.host : t;
}
function ns(e) {
  const t = St(e);
  return Qt(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : nt(t) && Cn(t) ? t : ns(t);
}
function yn(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = ns(e), a = o === ((r = e.ownerDocument) == null ? void 0 : r.body), s = _e(o);
  if (a) {
    const i = Kr(s);
    return t.concat(s, s.visualViewport || [], Cn(o) ? o : [], i && n ? yn(i) : []);
  }
  return t.concat(o, yn(o, [], n));
}
function Kr(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function rs(e) {
  const t = ze(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const o = nt(e), a = o ? e.offsetWidth : n, s = o ? e.offsetHeight : r, i = qn(n) !== a || qn(r) !== s;
  return i && (n = a, r = s), {
    width: n,
    height: r,
    $: i
  };
}
function mo(e) {
  return He(e) ? e : e.contextElement;
}
function Xt(e) {
  const t = mo(e);
  if (!nt(t))
    return tt(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: o,
    $: a
  } = rs(t);
  let s = (a ? qn(n.width) : n.width) / r, i = (a ? qn(n.height) : n.height) / o;
  return (!s || !Number.isFinite(s)) && (s = 1), (!i || !Number.isFinite(i)) && (i = 1), {
    x: s,
    y: i
  };
}
const Yd = /* @__PURE__ */ tt(0);
function os(e) {
  const t = _e(e);
  return !ho() || !t.visualViewport ? Yd : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function Ld(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== _e(e) ? !1 : t;
}
function It(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), a = mo(e);
  let s = tt(1);
  t && (r ? He(r) && (s = Xt(r)) : s = Xt(e));
  const i = Ld(a, n, r) ? os(a) : tt(0);
  let c = (o.left + i.x) / s.x, l = (o.top + i.y) / s.y, u = o.width / s.x, d = o.height / s.y;
  if (a) {
    const h = _e(a), m = r && He(r) ? _e(r) : r;
    let v = h, g = Kr(v);
    for (; g && r && m !== v; ) {
      const y = Xt(g), b = g.getBoundingClientRect(), x = ze(g), C = b.left + (g.clientLeft + parseFloat(x.paddingLeft)) * y.x, M = b.top + (g.clientTop + parseFloat(x.paddingTop)) * y.y;
      c *= y.x, l *= y.y, u *= y.x, d *= y.y, c += C, l += M, v = _e(g), g = Kr(v);
    }
  }
  return Kn({
    width: u,
    height: d,
    x: c,
    y: l
  });
}
function or(e, t) {
  const n = rr(e).scrollLeft;
  return t ? t.left + n : It(rt(e)).left + n;
}
function as(e, t) {
  const n = e.getBoundingClientRect(), r = n.left + t.scrollLeft - or(e, n), o = n.top + t.scrollTop;
  return {
    x: r,
    y: o
  };
}
function Bd(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: r,
    strategy: o
  } = e;
  const a = o === "fixed", s = rt(r), i = t ? nr(t.floating) : !1;
  if (r === s || i && a)
    return n;
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = tt(1);
  const u = tt(0), d = nt(r);
  if ((d || !d && !a) && ((on(r) !== "body" || Cn(s)) && (c = rr(r)), nt(r))) {
    const m = It(r);
    l = Xt(r), u.x = m.x + r.clientLeft, u.y = m.y + r.clientTop;
  }
  const h = s && !d && !a ? as(s, c) : tt(0);
  return {
    width: n.width * l.x,
    height: n.height * l.y,
    x: n.x * l.x - c.scrollLeft * l.x + u.x + h.x,
    y: n.y * l.y - c.scrollTop * l.y + u.y + h.y
  };
}
function Hd(e) {
  return Array.from(e.getClientRects());
}
function zd(e) {
  const t = rt(e), n = rr(e), r = e.ownerDocument.body, o = Ae(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), a = Ae(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let s = -n.scrollLeft + or(e);
  const i = -n.scrollTop;
  return ze(r).direction === "rtl" && (s += Ae(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: a,
    x: s,
    y: i
  };
}
const ca = 25;
function Vd(e, t) {
  const n = _e(e), r = rt(e), o = n.visualViewport;
  let a = r.clientWidth, s = r.clientHeight, i = 0, c = 0;
  if (o) {
    a = o.width, s = o.height;
    const u = ho();
    (!u || u && t === "fixed") && (i = o.offsetLeft, c = o.offsetTop);
  }
  const l = or(r);
  if (l <= 0) {
    const u = r.ownerDocument, d = u.body, h = getComputedStyle(d), m = u.compatMode === "CSS1Compat" && parseFloat(h.marginLeft) + parseFloat(h.marginRight) || 0, v = Math.abs(r.clientWidth - d.clientWidth - m);
    v <= ca && (a -= v);
  } else l <= ca && (a += l);
  return {
    width: a,
    height: s,
    x: i,
    y: c
  };
}
const jd = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function Gd(e, t) {
  const n = It(e, !0, t === "fixed"), r = n.top + e.clientTop, o = n.left + e.clientLeft, a = nt(e) ? Xt(e) : tt(1), s = e.clientWidth * a.x, i = e.clientHeight * a.y, c = o * a.x, l = r * a.y;
  return {
    width: s,
    height: i,
    x: c,
    y: l
  };
}
function la(e, t, n) {
  let r;
  if (t === "viewport")
    r = Vd(e, n);
  else if (t === "document")
    r = zd(rt(e));
  else if (He(t))
    r = Gd(t, n);
  else {
    const o = os(e);
    r = {
      x: t.x - o.x,
      y: t.y - o.y,
      width: t.width,
      height: t.height
    };
  }
  return Kn(r);
}
function ss(e, t) {
  const n = St(e);
  return n === t || !He(n) || Qt(n) ? !1 : ze(n).position === "fixed" || ss(n, t);
}
function Ud(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = yn(e, [], !1).filter((i) => He(i) && on(i) !== "body"), o = null;
  const a = ze(e).position === "fixed";
  let s = a ? St(e) : e;
  for (; He(s) && !Qt(s); ) {
    const i = ze(s), c = fo(s);
    !c && i.position === "fixed" && (o = null), (a ? !c && !o : !c && i.position === "static" && !!o && jd.has(o.position) || Cn(s) && !c && ss(e, s)) ? r = r.filter((u) => u !== s) : o = i, s = St(s);
  }
  return t.set(e, r), r;
}
function qd(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = e;
  const s = [...n === "clippingAncestors" ? nr(t) ? [] : Ud(t, this._c) : [].concat(n), r], i = s[0], c = s.reduce((l, u) => {
    const d = la(t, u, o);
    return l.top = Ae(d.top, l.top), l.right = Nt(d.right, l.right), l.bottom = Nt(d.bottom, l.bottom), l.left = Ae(d.left, l.left), l;
  }, la(t, i, o));
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top
  };
}
function Xd(e) {
  const {
    width: t,
    height: n
  } = rs(e);
  return {
    width: t,
    height: n
  };
}
function Kd(e, t, n) {
  const r = nt(t), o = rt(t), a = n === "fixed", s = It(e, !0, a, t);
  let i = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = tt(0);
  function l() {
    c.x = or(o);
  }
  if (r || !r && !a)
    if ((on(t) !== "body" || Cn(o)) && (i = rr(t)), r) {
      const m = It(t, !0, a, t);
      c.x = m.x + t.clientLeft, c.y = m.y + t.clientTop;
    } else o && l();
  a && !r && o && l();
  const u = o && !r && !a ? as(o, i) : tt(0), d = s.left + i.scrollLeft - c.x - u.x, h = s.top + i.scrollTop - c.y - u.y;
  return {
    x: d,
    y: h,
    width: s.width,
    height: s.height
  };
}
function Ar(e) {
  return ze(e).position === "static";
}
function da(e, t) {
  if (!nt(e) || ze(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return rt(e) === n && (n = n.ownerDocument.body), n;
}
function is(e, t) {
  const n = _e(e);
  if (nr(e))
    return n;
  if (!nt(e)) {
    let o = St(e);
    for (; o && !Qt(o); ) {
      if (He(o) && !Ar(o))
        return o;
      o = St(o);
    }
    return n;
  }
  let r = da(e, t);
  for (; r && Td(r) && Ar(r); )
    r = da(r, t);
  return r && Qt(r) && Ar(r) && !fo(r) ? n : r || $d(e) || n;
}
const Zd = async function(e) {
  const t = this.getOffsetParent || is, n = this.getDimensions, r = await n(e.floating);
  return {
    reference: Kd(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function Qd(e) {
  return ze(e).direction === "rtl";
}
const Jd = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Bd,
  getDocumentElement: rt,
  getClippingRect: qd,
  getOffsetParent: is,
  getElementRects: Zd,
  getClientRects: Hd,
  getDimensions: Xd,
  getScale: Xt,
  isElement: He,
  isRTL: Qd
};
function cs(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function eu(e, t) {
  let n = null, r;
  const o = rt(e);
  function a() {
    var i;
    clearTimeout(r), (i = n) == null || i.disconnect(), n = null;
  }
  function s(i, c) {
    i === void 0 && (i = !1), c === void 0 && (c = 1), a();
    const l = e.getBoundingClientRect(), {
      left: u,
      top: d,
      width: h,
      height: m
    } = l;
    if (i || t(), !h || !m)
      return;
    const v = Wn(d), g = Wn(o.clientWidth - (u + h)), y = Wn(o.clientHeight - (d + m)), b = Wn(u), C = {
      rootMargin: -v + "px " + -g + "px " + -y + "px " + -b + "px",
      threshold: Ae(0, Nt(1, c)) || 1
    };
    let M = !0;
    function N(k) {
      const O = k[0].intersectionRatio;
      if (O !== c) {
        if (!M)
          return s();
        O ? s(!1, O) : r = setTimeout(() => {
          s(!1, 1e-7);
        }, 1e3);
      }
      O === 1 && !cs(l, e.getBoundingClientRect()) && s(), M = !1;
    }
    try {
      n = new IntersectionObserver(N, {
        ...C,
        // Handle <iframe>s
        root: o.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(N, C);
    }
    n.observe(e);
  }
  return s(!0), a;
}
function tu(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: a = !0,
    elementResize: s = typeof ResizeObserver == "function",
    layoutShift: i = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = r, l = mo(e), u = o || a ? [...l ? yn(l) : [], ...yn(t)] : [];
  u.forEach((b) => {
    o && b.addEventListener("scroll", n, {
      passive: !0
    }), a && b.addEventListener("resize", n);
  });
  const d = l && i ? eu(l, n) : null;
  let h = -1, m = null;
  s && (m = new ResizeObserver((b) => {
    let [x] = b;
    x && x.target === l && m && (m.unobserve(t), cancelAnimationFrame(h), h = requestAnimationFrame(() => {
      var C;
      (C = m) == null || C.observe(t);
    })), n();
  }), l && !c && m.observe(l), m.observe(t));
  let v, g = c ? It(e) : null;
  c && y();
  function y() {
    const b = It(e);
    g && !cs(g, b) && n(), g = b, v = requestAnimationFrame(y);
  }
  return n(), () => {
    var b;
    u.forEach((x) => {
      o && x.removeEventListener("scroll", n), a && x.removeEventListener("resize", n);
    }), d == null || d(), (b = m) == null || b.disconnect(), m = null, c && cancelAnimationFrame(v);
  };
}
const nu = Sd, ru = Dd, ou = kd, au = Ed, su = Md, ua = Cd, iu = Od, cu = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: Jd,
    ...n
  }, a = {
    ...o.platform,
    _c: r
  };
  return xd(e, t, {
    ...o,
    platform: a
  });
};
var lu = typeof document < "u", du = function() {
}, Vn = lu ? Wa : du;
function Zn(e, t) {
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
        if (!Zn(e[r], t[r]))
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
      if (!(a === "_owner" && e.$$typeof) && !Zn(e[a], t[a]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function ls(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function fa(e, t) {
  const n = ls(e);
  return Math.round(t * n) / n;
}
function _r(e) {
  const t = p.useRef(e);
  return Vn(() => {
    t.current = e;
  }), t;
}
function uu(e) {
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
  }), [h, m] = p.useState(r);
  Zn(h, r) || m(r);
  const [v, g] = p.useState(null), [y, b] = p.useState(null), x = p.useCallback((R) => {
    R !== k.current && (k.current = R, g(R));
  }, []), C = p.useCallback((R) => {
    R !== O.current && (O.current = R, b(R));
  }, []), M = a || v, N = s || y, k = p.useRef(null), O = p.useRef(null), T = p.useRef(u), Y = c != null, _ = _r(c), $ = _r(o), P = _r(l), B = p.useCallback(() => {
    if (!k.current || !O.current)
      return;
    const R = {
      placement: t,
      strategy: n,
      middleware: h
    };
    $.current && (R.platform = $.current), cu(k.current, O.current, R).then((F) => {
      const L = {
        ...F,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: P.current !== !1
      };
      S.current && !Zn(T.current, L) && (T.current = L, $a.flushSync(() => {
        d(L);
      }));
    });
  }, [h, t, n, $, P]);
  Vn(() => {
    l === !1 && T.current.isPositioned && (T.current.isPositioned = !1, d((R) => ({
      ...R,
      isPositioned: !1
    })));
  }, [l]);
  const S = p.useRef(!1);
  Vn(() => (S.current = !0, () => {
    S.current = !1;
  }), []), Vn(() => {
    if (M && (k.current = M), N && (O.current = N), M && N) {
      if (_.current)
        return _.current(M, N, B);
      B();
    }
  }, [M, N, B, _, Y]);
  const A = p.useMemo(() => ({
    reference: k,
    floating: O,
    setReference: x,
    setFloating: C
  }), [x, C]), D = p.useMemo(() => ({
    reference: M,
    floating: N
  }), [M, N]), W = p.useMemo(() => {
    const R = {
      position: n,
      left: 0,
      top: 0
    };
    if (!D.floating)
      return R;
    const F = fa(D.floating, u.x), L = fa(D.floating, u.y);
    return i ? {
      ...R,
      transform: "translate(" + F + "px, " + L + "px)",
      ...ls(D.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: F,
      top: L
    };
  }, [n, i, D.floating, u.x, u.y]);
  return p.useMemo(() => ({
    ...u,
    update: B,
    refs: A,
    elements: D,
    floatingStyles: W
  }), [u, B, A, D, W]);
}
const fu = (e) => {
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
      return r && t(r) ? r.current != null ? ua({
        element: r.current,
        padding: o
      }).fn(n) : {} : r ? ua({
        element: r,
        padding: o
      }).fn(n) : {};
    }
  };
}, hu = (e, t) => ({
  ...nu(e),
  options: [e, t]
}), mu = (e, t) => ({
  ...ru(e),
  options: [e, t]
}), pu = (e, t) => ({
  ...iu(e),
  options: [e, t]
}), gu = (e, t) => ({
  ...ou(e),
  options: [e, t]
}), bu = (e, t) => ({
  ...au(e),
  options: [e, t]
}), yu = (e, t) => ({
  ...su(e),
  options: [e, t]
}), vu = (e, t) => ({
  ...fu(e),
  options: [e, t]
});
var wu = "Arrow", ds = p.forwardRef((e, t) => {
  const { children: n, width: r = 10, height: o = 5, ...a } = e;
  return /* @__PURE__ */ f(
    oe.svg,
    {
      ...a,
      ref: t,
      width: r,
      height: o,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? n : /* @__PURE__ */ f("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
ds.displayName = wu;
var xu = ds;
function ar(e) {
  const [t, n] = p.useState(void 0);
  return ft(() => {
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
var po = "Popper", [us, sr] = We(po), [Cu, fs] = us(po), hs = (e) => {
  const { __scopePopper: t, children: n } = e, [r, o] = p.useState(null);
  return /* @__PURE__ */ f(Cu, { scope: t, anchor: r, onAnchorChange: o, children: n });
};
hs.displayName = po;
var ms = "PopperAnchor", ps = p.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: r, ...o } = e, a = fs(ms, n), s = p.useRef(null), i = le(t, s), c = p.useRef(null);
    return p.useEffect(() => {
      const l = c.current;
      c.current = (r == null ? void 0 : r.current) || s.current, l !== c.current && a.onAnchorChange(c.current);
    }), r ? null : /* @__PURE__ */ f(oe.div, { ...o, ref: i });
  }
);
ps.displayName = ms;
var go = "PopperContent", [ku, Mu] = us(go), gs = p.forwardRef(
  (e, t) => {
    var fe, Q, me, ie, ye, we;
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
      hideWhenDetached: h = !1,
      updatePositionStrategy: m = "optimized",
      onPlaced: v,
      ...g
    } = e, y = fs(go, n), [b, x] = p.useState(null), C = le(t, (Oe) => x(Oe)), [M, N] = p.useState(null), k = ar(M), O = (k == null ? void 0 : k.width) ?? 0, T = (k == null ? void 0 : k.height) ?? 0, Y = r + (a !== "center" ? "-" + a : ""), _ = typeof u == "number" ? u : { top: 0, right: 0, bottom: 0, left: 0, ...u }, $ = Array.isArray(l) ? l : [l], P = $.length > 0, B = {
      padding: _,
      boundary: $.filter(Su),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: P
    }, { refs: S, floatingStyles: A, placement: D, isPositioned: W, middlewareData: R } = uu({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: Y,
      whileElementsMounted: (...Oe) => tu(...Oe, {
        animationFrame: m === "always"
      }),
      elements: {
        reference: y.anchor
      },
      middleware: [
        hu({ mainAxis: o + T, alignmentAxis: s }),
        c && mu({
          mainAxis: !0,
          crossAxis: !1,
          limiter: d === "partial" ? pu() : void 0,
          ...B
        }),
        c && gu({ ...B }),
        bu({
          ...B,
          apply: ({ elements: Oe, rects: pt, availableWidth: $t, availableHeight: Ft }) => {
            const { width: st, height: Yt } = pt.reference, Ce = Oe.floating.style;
            Ce.setProperty("--radix-popper-available-width", `${$t}px`), Ce.setProperty("--radix-popper-available-height", `${Ft}px`), Ce.setProperty("--radix-popper-anchor-width", `${st}px`), Ce.setProperty("--radix-popper-anchor-height", `${Yt}px`);
          }
        }),
        M && vu({ element: M, padding: i }),
        Du({ arrowWidth: O, arrowHeight: T }),
        h && yu({ strategy: "referenceHidden", ...B })
      ]
    }), [F, L] = vs(D), z = _t(v);
    ft(() => {
      W && (z == null || z());
    }, [W, z]);
    const ne = (fe = R.arrow) == null ? void 0 : fe.x, H = (Q = R.arrow) == null ? void 0 : Q.y, q = ((me = R.arrow) == null ? void 0 : me.centerOffset) !== 0, [K, de] = p.useState();
    return ft(() => {
      b && de(window.getComputedStyle(b).zIndex);
    }, [b]), /* @__PURE__ */ f(
      "div",
      {
        ref: S.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...A,
          transform: W ? A.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: K,
          "--radix-popper-transform-origin": [
            (ie = R.transformOrigin) == null ? void 0 : ie.x,
            (ye = R.transformOrigin) == null ? void 0 : ye.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...((we = R.hide) == null ? void 0 : we.referenceHidden) && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: e.dir,
        children: /* @__PURE__ */ f(
          ku,
          {
            scope: n,
            placedSide: F,
            onArrowChange: N,
            arrowX: ne,
            arrowY: H,
            shouldHideArrow: q,
            children: /* @__PURE__ */ f(
              oe.div,
              {
                "data-side": F,
                "data-align": L,
                ...g,
                ref: C,
                style: {
                  ...g.style,
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
gs.displayName = go;
var bs = "PopperArrow", Nu = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, ys = p.forwardRef(function(t, n) {
  const { __scopePopper: r, ...o } = t, a = Mu(bs, r), s = Nu[a.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ f(
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
        children: /* @__PURE__ */ f(
          xu,
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
ys.displayName = bs;
function Su(e) {
  return e !== null;
}
var Du = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    var y, b, x;
    const { placement: n, rects: r, middlewareData: o } = t, s = ((y = o.arrow) == null ? void 0 : y.centerOffset) !== 0, i = s ? 0 : e.arrowWidth, c = s ? 0 : e.arrowHeight, [l, u] = vs(n), d = { start: "0%", center: "50%", end: "100%" }[u], h = (((b = o.arrow) == null ? void 0 : b.x) ?? 0) + i / 2, m = (((x = o.arrow) == null ? void 0 : x.y) ?? 0) + c / 2;
    let v = "", g = "";
    return l === "bottom" ? (v = s ? d : `${h}px`, g = `${-c}px`) : l === "top" ? (v = s ? d : `${h}px`, g = `${r.floating.height + c}px`) : l === "right" ? (v = `${-c}px`, g = s ? d : `${m}px`) : l === "left" && (v = `${r.floating.width + c}px`, g = s ? d : `${m}px`), { data: { x: v, y: g } };
  }
});
function vs(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var ws = hs, bo = ps, xs = gs, Cs = ys, Ou = "Portal", ir = p.forwardRef((e, t) => {
  var i;
  const { container: n, ...r } = e, [o, a] = p.useState(!1);
  ft(() => a(!0), []);
  const s = n || o && ((i = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : i.body);
  return s ? Fa.createPortal(/* @__PURE__ */ f(oe.div, { ...r, ref: t }), s) : null;
});
ir.displayName = Ou;
function Eu(e, t) {
  return p.useReducer((n, r) => t[n][r] ?? n, e);
}
var Ve = (e) => {
  const { present: t, children: n } = e, r = Ru(t), o = typeof n == "function" ? n({ present: r.isPresent }) : p.Children.only(n), a = le(r.ref, Pu(o));
  return typeof n == "function" || r.isPresent ? p.cloneElement(o, { ref: a }) : null;
};
Ve.displayName = "Presence";
function Ru(e) {
  const [t, n] = p.useState(), r = p.useRef(null), o = p.useRef(e), a = p.useRef("none"), s = e ? "mounted" : "unmounted", [i, c] = Eu(s, {
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
    const l = $n(r.current);
    a.current = i === "mounted" ? l : "none";
  }, [i]), ft(() => {
    const l = r.current, u = o.current;
    if (u !== e) {
      const h = a.current, m = $n(l);
      e ? c("MOUNT") : m === "none" || (l == null ? void 0 : l.display) === "none" ? c("UNMOUNT") : c(u && h !== m ? "ANIMATION_OUT" : "UNMOUNT"), o.current = e;
    }
  }, [e, c]), ft(() => {
    if (t) {
      let l;
      const u = t.ownerDocument.defaultView ?? window, d = (m) => {
        const g = $n(r.current).includes(CSS.escape(m.animationName));
        if (m.target === t && g && (c("ANIMATION_END"), !o.current)) {
          const y = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", l = u.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = y);
          });
        }
      }, h = (m) => {
        m.target === t && (a.current = $n(r.current));
      };
      return t.addEventListener("animationstart", h), t.addEventListener("animationcancel", d), t.addEventListener("animationend", d), () => {
        u.clearTimeout(l), t.removeEventListener("animationstart", h), t.removeEventListener("animationcancel", d), t.removeEventListener("animationend", d);
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
function $n(e) {
  return (e == null ? void 0 : e.animationName) || "none";
}
function Pu(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var Tu = p[" useInsertionEffect ".trim().toString()] || ft;
function ot({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: r
}) {
  const [o, a, s] = Au({
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
        const h = _u(u) ? u(e) : u;
        h !== e && ((d = s.current) == null || d.call(s, h));
      } else
        a(u);
    },
    [i, e, a, s]
  );
  return [c, l];
}
function Au({
  defaultProp: e,
  onChange: t
}) {
  const [n, r] = p.useState(e), o = p.useRef(n), a = p.useRef(t);
  return Tu(() => {
    a.current = t;
  }, [t]), p.useEffect(() => {
    var s;
    o.current !== n && ((s = a.current) == null || s.call(a, n), o.current = n);
  }, [n, o]), [n, r, a];
}
function _u(e) {
  return typeof e == "function";
}
var Iu = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, Ht = /* @__PURE__ */ new WeakMap(), Fn = /* @__PURE__ */ new WeakMap(), Yn = {}, Ir = 0, ks = function(e) {
  return e && (e.host || ks(e.parentNode));
}, Wu = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var r = ks(n);
    return r && e.contains(r) ? r : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, $u = function(e, t, n, r) {
  var o = Wu(t, Array.isArray(e) ? e : [e]);
  Yn[n] || (Yn[n] = /* @__PURE__ */ new WeakMap());
  var a = Yn[n], s = [], i = /* @__PURE__ */ new Set(), c = new Set(o), l = function(d) {
    !d || i.has(d) || (i.add(d), l(d.parentNode));
  };
  o.forEach(l);
  var u = function(d) {
    !d || c.has(d) || Array.prototype.forEach.call(d.children, function(h) {
      if (i.has(h))
        u(h);
      else
        try {
          var m = h.getAttribute(r), v = m !== null && m !== "false", g = (Ht.get(h) || 0) + 1, y = (a.get(h) || 0) + 1;
          Ht.set(h, g), a.set(h, y), s.push(h), g === 1 && v && Fn.set(h, !0), y === 1 && h.setAttribute(n, "true"), v || h.setAttribute(r, "true");
        } catch (b) {
          console.error("aria-hidden: cannot operate on ", h, b);
        }
    });
  };
  return u(t), i.clear(), Ir++, function() {
    s.forEach(function(d) {
      var h = Ht.get(d) - 1, m = a.get(d) - 1;
      Ht.set(d, h), a.set(d, m), h || (Fn.has(d) || d.removeAttribute(r), Fn.delete(d)), m || d.removeAttribute(n);
    }), Ir--, Ir || (Ht = /* @__PURE__ */ new WeakMap(), Ht = /* @__PURE__ */ new WeakMap(), Fn = /* @__PURE__ */ new WeakMap(), Yn = {});
  };
}, Ms = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var r = Array.from(Array.isArray(e) ? e : [e]), o = Iu(e);
  return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live], script"))), $u(r, o, n, "aria-hidden")) : function() {
    return null;
  };
}, Ke = function() {
  return Ke = Object.assign || function(t) {
    for (var n, r = 1, o = arguments.length; r < o; r++) {
      n = arguments[r];
      for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (t[a] = n[a]);
    }
    return t;
  }, Ke.apply(this, arguments);
};
function Ns(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  return n;
}
function Fu(e, t, n) {
  if (n || arguments.length === 2) for (var r = 0, o = t.length, a; r < o; r++)
    (a || !(r in t)) && (a || (a = Array.prototype.slice.call(t, 0, r)), a[r] = t[r]);
  return e.concat(a || Array.prototype.slice.call(t));
}
var jn = "right-scroll-bar-position", Gn = "width-before-scroll-bar", Yu = "with-scroll-bars-hidden", Lu = "--removed-body-scroll-bar-size";
function Wr(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function Bu(e, t) {
  var n = be(function() {
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
var Hu = typeof window < "u" ? p.useLayoutEffect : p.useEffect, ha = /* @__PURE__ */ new WeakMap();
function zu(e, t) {
  var n = Bu(null, function(r) {
    return e.forEach(function(o) {
      return Wr(o, r);
    });
  });
  return Hu(function() {
    var r = ha.get(n);
    if (r) {
      var o = new Set(r), a = new Set(e), s = n.current;
      o.forEach(function(i) {
        a.has(i) || Wr(i, null);
      }), a.forEach(function(i) {
        o.has(i) || Wr(i, s);
      });
    }
    ha.set(n, e);
  }, [e]), n;
}
function Vu(e) {
  return e;
}
function ju(e, t) {
  t === void 0 && (t = Vu);
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
function Gu(e) {
  e === void 0 && (e = {});
  var t = ju(null);
  return t.options = Ke({ async: !0, ssr: !1 }, e), t;
}
var Ss = function(e) {
  var t = e.sideCar, n = Ns(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = t.read();
  if (!r)
    throw new Error("Sidecar medium not found");
  return p.createElement(r, Ke({}, n));
};
Ss.isSideCarExport = !0;
function Uu(e, t) {
  return e.useMedium(t), Ss;
}
var Ds = Gu(), $r = function() {
}, cr = p.forwardRef(function(e, t) {
  var n = p.useRef(null), r = p.useState({
    onScrollCapture: $r,
    onWheelCapture: $r,
    onTouchMoveCapture: $r
  }), o = r[0], a = r[1], s = e.forwardProps, i = e.children, c = e.className, l = e.removeScrollBar, u = e.enabled, d = e.shards, h = e.sideCar, m = e.noRelative, v = e.noIsolation, g = e.inert, y = e.allowPinchZoom, b = e.as, x = b === void 0 ? "div" : b, C = e.gapMode, M = Ns(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), N = h, k = zu([n, t]), O = Ke(Ke({}, M), o);
  return p.createElement(
    p.Fragment,
    null,
    u && p.createElement(N, { sideCar: Ds, removeScrollBar: l, shards: d, noRelative: m, noIsolation: v, inert: g, setCallbacks: a, allowPinchZoom: !!y, lockRef: n, gapMode: C }),
    s ? p.cloneElement(p.Children.only(i), Ke(Ke({}, O), { ref: k })) : p.createElement(x, Ke({}, O, { className: c, ref: k }), i)
  );
});
cr.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
cr.classNames = {
  fullWidth: Gn,
  zeroRight: jn
};
var qu = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function Xu() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = qu();
  return t && e.setAttribute("nonce", t), e;
}
function Ku(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function Zu(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var Qu = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = Xu()) && (Ku(t, n), Zu(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, Ju = function() {
  var e = Qu();
  return function(t, n) {
    p.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, Os = function() {
  var e = Ju(), t = function(n) {
    var r = n.styles, o = n.dynamic;
    return e(r, o), null;
  };
  return t;
}, ef = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, Fr = function(e) {
  return parseInt(e || "", 10) || 0;
}, tf = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [Fr(n), Fr(r), Fr(o)];
}, nf = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return ef;
  var t = tf(e), n = document.documentElement.clientWidth, r = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, r - n + t[2] - t[0])
  };
}, rf = Os(), Kt = "data-scroll-locked", of = function(e, t, n, r) {
  var o = e.left, a = e.top, s = e.right, i = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(Yu, ` {
   overflow: hidden `).concat(r, `;
   padding-right: `).concat(i, "px ").concat(r, `;
  }
  body[`).concat(Kt, `] {
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
  
  .`).concat(Gn, ` {
    margin-right: `).concat(i, "px ").concat(r, `;
  }
  
  .`).concat(jn, " .").concat(jn, ` {
    right: 0 `).concat(r, `;
  }
  
  .`).concat(Gn, " .").concat(Gn, ` {
    margin-right: 0 `).concat(r, `;
  }
  
  body[`).concat(Kt, `] {
    `).concat(Lu, ": ").concat(i, `px;
  }
`);
}, ma = function() {
  var e = parseInt(document.body.getAttribute(Kt) || "0", 10);
  return isFinite(e) ? e : 0;
}, af = function() {
  p.useEffect(function() {
    return document.body.setAttribute(Kt, (ma() + 1).toString()), function() {
      var e = ma() - 1;
      e <= 0 ? document.body.removeAttribute(Kt) : document.body.setAttribute(Kt, e.toString());
    };
  }, []);
}, sf = function(e) {
  var t = e.noRelative, n = e.noImportant, r = e.gapMode, o = r === void 0 ? "margin" : r;
  af();
  var a = p.useMemo(function() {
    return nf(o);
  }, [o]);
  return p.createElement(rf, { styles: of(a, !t, o, n ? "" : "!important") });
}, Zr = !1;
if (typeof window < "u")
  try {
    var Ln = Object.defineProperty({}, "passive", {
      get: function() {
        return Zr = !0, !0;
      }
    });
    window.addEventListener("test", Ln, Ln), window.removeEventListener("test", Ln, Ln);
  } catch {
    Zr = !1;
  }
var zt = Zr ? { passive: !1 } : !1, cf = function(e) {
  return e.tagName === "TEXTAREA";
}, Es = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !cf(e) && n[t] === "visible")
  );
}, lf = function(e) {
  return Es(e, "overflowY");
}, df = function(e) {
  return Es(e, "overflowX");
}, pa = function(e, t) {
  var n = t.ownerDocument, r = t;
  do {
    typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
    var o = Rs(e, r);
    if (o) {
      var a = Ps(e, r), s = a[1], i = a[2];
      if (s > i)
        return !0;
    }
    r = r.parentNode;
  } while (r && r !== n.body);
  return !1;
}, uf = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, r = e.clientHeight;
  return [
    t,
    n,
    r
  ];
}, ff = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, r = e.clientWidth;
  return [
    t,
    n,
    r
  ];
}, Rs = function(e, t) {
  return e === "v" ? lf(t) : df(t);
}, Ps = function(e, t) {
  return e === "v" ? uf(t) : ff(t);
}, hf = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, mf = function(e, t, n, r, o) {
  var a = hf(e, window.getComputedStyle(t).direction), s = a * r, i = n.target, c = t.contains(i), l = !1, u = s > 0, d = 0, h = 0;
  do {
    if (!i)
      break;
    var m = Ps(e, i), v = m[0], g = m[1], y = m[2], b = g - y - a * v;
    (v || b) && Rs(e, i) && (d += b, h += v);
    var x = i.parentNode;
    i = x && x.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? x.host : x;
  } while (
    // portaled content
    !c && i !== document.body || // self content
    c && (t.contains(i) || t === i)
  );
  return (u && Math.abs(d) < 1 || !u && Math.abs(h) < 1) && (l = !0), l;
}, Bn = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, ga = function(e) {
  return [e.deltaX, e.deltaY];
}, ba = function(e) {
  return e && "current" in e ? e.current : e;
}, pf = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, gf = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, bf = 0, Vt = [];
function yf(e) {
  var t = p.useRef([]), n = p.useRef([0, 0]), r = p.useRef(), o = p.useState(bf++)[0], a = p.useState(Os)[0], s = p.useRef(e);
  p.useEffect(function() {
    s.current = e;
  }, [e]), p.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var g = Fu([e.lockRef.current], (e.shards || []).map(ba), !0).filter(Boolean);
      return g.forEach(function(y) {
        return y.classList.add("allow-interactivity-".concat(o));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(o)), g.forEach(function(y) {
          return y.classList.remove("allow-interactivity-".concat(o));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var i = p.useCallback(function(g, y) {
    if ("touches" in g && g.touches.length === 2 || g.type === "wheel" && g.ctrlKey)
      return !s.current.allowPinchZoom;
    var b = Bn(g), x = n.current, C = "deltaX" in g ? g.deltaX : x[0] - b[0], M = "deltaY" in g ? g.deltaY : x[1] - b[1], N, k = g.target, O = Math.abs(C) > Math.abs(M) ? "h" : "v";
    if ("touches" in g && O === "h" && k.type === "range")
      return !1;
    var T = pa(O, k);
    if (!T)
      return !0;
    if (T ? N = O : (N = O === "v" ? "h" : "v", T = pa(O, k)), !T)
      return !1;
    if (!r.current && "changedTouches" in g && (C || M) && (r.current = N), !N)
      return !0;
    var Y = r.current || N;
    return mf(Y, y, g, Y === "h" ? C : M);
  }, []), c = p.useCallback(function(g) {
    var y = g;
    if (!(!Vt.length || Vt[Vt.length - 1] !== a)) {
      var b = "deltaY" in y ? ga(y) : Bn(y), x = t.current.filter(function(N) {
        return N.name === y.type && (N.target === y.target || y.target === N.shadowParent) && pf(N.delta, b);
      })[0];
      if (x && x.should) {
        y.cancelable && y.preventDefault();
        return;
      }
      if (!x) {
        var C = (s.current.shards || []).map(ba).filter(Boolean).filter(function(N) {
          return N.contains(y.target);
        }), M = C.length > 0 ? i(y, C[0]) : !s.current.noIsolation;
        M && y.cancelable && y.preventDefault();
      }
    }
  }, []), l = p.useCallback(function(g, y, b, x) {
    var C = { name: g, delta: y, target: b, should: x, shadowParent: vf(b) };
    t.current.push(C), setTimeout(function() {
      t.current = t.current.filter(function(M) {
        return M !== C;
      });
    }, 1);
  }, []), u = p.useCallback(function(g) {
    n.current = Bn(g), r.current = void 0;
  }, []), d = p.useCallback(function(g) {
    l(g.type, ga(g), g.target, i(g, e.lockRef.current));
  }, []), h = p.useCallback(function(g) {
    l(g.type, Bn(g), g.target, i(g, e.lockRef.current));
  }, []);
  p.useEffect(function() {
    return Vt.push(a), e.setCallbacks({
      onScrollCapture: d,
      onWheelCapture: d,
      onTouchMoveCapture: h
    }), document.addEventListener("wheel", c, zt), document.addEventListener("touchmove", c, zt), document.addEventListener("touchstart", u, zt), function() {
      Vt = Vt.filter(function(g) {
        return g !== a;
      }), document.removeEventListener("wheel", c, zt), document.removeEventListener("touchmove", c, zt), document.removeEventListener("touchstart", u, zt);
    };
  }, []);
  var m = e.removeScrollBar, v = e.inert;
  return p.createElement(
    p.Fragment,
    null,
    v ? p.createElement(a, { styles: gf(o) }) : null,
    m ? p.createElement(sf, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function vf(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const wf = Uu(Ds, yf);
var yo = p.forwardRef(function(e, t) {
  return p.createElement(cr, Ke({}, e, { ref: t, sideCar: wf }));
});
yo.classNames = cr.classNames;
var lr = "Popover", [Ts] = We(lr, [
  sr
]), kn = sr(), [xf, Ot] = Ts(lr), As = (e) => {
  const {
    __scopePopover: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: a,
    modal: s = !1
  } = e, i = kn(t), c = p.useRef(null), [l, u] = p.useState(!1), [d, h] = ot({
    prop: r,
    defaultProp: o ?? !1,
    onChange: a,
    caller: lr
  });
  return /* @__PURE__ */ f(ws, { ...i, children: /* @__PURE__ */ f(
    xf,
    {
      scope: t,
      contentId: kt(),
      triggerRef: c,
      open: d,
      onOpenChange: h,
      onOpenToggle: p.useCallback(() => h((m) => !m), [h]),
      hasCustomAnchor: l,
      onCustomAnchorAdd: p.useCallback(() => u(!0), []),
      onCustomAnchorRemove: p.useCallback(() => u(!1), []),
      modal: s,
      children: n
    }
  ) });
};
As.displayName = lr;
var _s = "PopoverAnchor", Cf = p.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = Ot(_s, n), a = kn(n), { onCustomAnchorAdd: s, onCustomAnchorRemove: i } = o;
    return p.useEffect(() => (s(), () => i()), [s, i]), /* @__PURE__ */ f(bo, { ...a, ...r, ref: t });
  }
);
Cf.displayName = _s;
var Is = "PopoverTrigger", Ws = p.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = Ot(Is, n), a = kn(n), s = le(t, o.triggerRef), i = /* @__PURE__ */ f(
      oe.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": o.open,
        "aria-controls": o.contentId,
        "data-state": Bs(o.open),
        ...r,
        ref: s,
        onClick: ee(e.onClick, o.onOpenToggle)
      }
    );
    return o.hasCustomAnchor ? i : /* @__PURE__ */ f(bo, { asChild: !0, ...a, children: i });
  }
);
Ws.displayName = Is;
var vo = "PopoverPortal", [kf, Mf] = Ts(vo, {
  forceMount: void 0
}), $s = (e) => {
  const { __scopePopover: t, forceMount: n, children: r, container: o } = e, a = Ot(vo, t);
  return /* @__PURE__ */ f(kf, { scope: t, forceMount: n, children: /* @__PURE__ */ f(Ve, { present: n || a.open, children: /* @__PURE__ */ f(ir, { asChild: !0, container: o, children: r }) }) });
};
$s.displayName = vo;
var Jt = "PopoverContent", Fs = p.forwardRef(
  (e, t) => {
    const n = Mf(Jt, e.__scopePopover), { forceMount: r = n.forceMount, ...o } = e, a = Ot(Jt, e.__scopePopover);
    return /* @__PURE__ */ f(Ve, { present: r || a.open, children: a.modal ? /* @__PURE__ */ f(Sf, { ...o, ref: t }) : /* @__PURE__ */ f(Df, { ...o, ref: t }) });
  }
);
Fs.displayName = Jt;
var Nf = /* @__PURE__ */ gn("PopoverContent.RemoveScroll"), Sf = p.forwardRef(
  (e, t) => {
    const n = Ot(Jt, e.__scopePopover), r = p.useRef(null), o = le(t, r), a = p.useRef(!1);
    return p.useEffect(() => {
      const s = r.current;
      if (s) return Ms(s);
    }, []), /* @__PURE__ */ f(yo, { as: Nf, allowPinchZoom: !0, children: /* @__PURE__ */ f(
      Ys,
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
), Df = p.forwardRef(
  (e, t) => {
    const n = Ot(Jt, e.__scopePopover), r = p.useRef(!1), o = p.useRef(!1);
    return /* @__PURE__ */ f(
      Ys,
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
), Ys = p.forwardRef(
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
    } = e, h = Ot(Jt, n), m = kn(n);
    return Za(), /* @__PURE__ */ f(
      io,
      {
        asChild: !0,
        loop: !0,
        trapped: r,
        onMountAutoFocus: o,
        onUnmountAutoFocus: a,
        children: /* @__PURE__ */ f(
          er,
          {
            asChild: !0,
            disableOutsidePointerEvents: s,
            onInteractOutside: u,
            onEscapeKeyDown: i,
            onPointerDownOutside: c,
            onFocusOutside: l,
            onDismiss: () => h.onOpenChange(!1),
            children: /* @__PURE__ */ f(
              xs,
              {
                "data-state": Bs(h.open),
                role: "dialog",
                id: h.contentId,
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
), Ls = "PopoverClose", Of = p.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = Ot(Ls, n);
    return /* @__PURE__ */ f(
      oe.button,
      {
        type: "button",
        ...r,
        ref: t,
        onClick: ee(e.onClick, () => o.onOpenChange(!1))
      }
    );
  }
);
Of.displayName = Ls;
var Ef = "PopoverArrow", Rf = p.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = kn(n);
    return /* @__PURE__ */ f(Cs, { ...o, ...r, ref: t });
  }
);
Rf.displayName = Ef;
function Bs(e) {
  return e ? "open" : "closed";
}
var dr = As, ur = Ws, fr = $s, Mn = Fs;
const cv = dr, lv = ur, Pf = Dt(({ className: e, align: t = "end", sideOffset: n = 8, ...r }, o) => /* @__PURE__ */ f(fr, { children: /* @__PURE__ */ f(
  Mn,
  {
    ref: o,
    align: t,
    sideOffset: n,
    className: E(
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
Pf.displayName = Mn.displayName;
const Tf = De(
  E(
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
), Af = Dt(
  ({ className: e, variant: t, icon: n, children: r, ...o }, a) => /* @__PURE__ */ I(
    "button",
    {
      ref: a,
      className: E(Tf({ variant: t }), e),
      ...o,
      children: [
        n && /* @__PURE__ */ f("span", { className: "shrink-0", children: n }),
        r
      ]
    }
  )
);
Af.displayName = "PopoverMenuItem";
const _f = De("cms-font-pretendard cms-text-black", {
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
}), If = w.forwardRef(
  ({
    className: e,
    variant: t,
    align: n,
    decoration: r,
    as: o = "p",
    children: a,
    ...s
  }, i) => /* @__PURE__ */ f(
    o,
    {
      className: E(_f({ variant: t, align: n, decoration: r }), e),
      ref: i,
      ...s,
      children: a
    }
  )
);
If.displayName = "Text";
const ya = De(
  E(
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
        default: E(
          "bg-cms-white ",
          "border-cms-gray-450",
          "focus:border-cms-gray-800",
          "disabled:bg-cms-gray-150",
          "disabled:text-cms-gray-400",
          "disabled:cursor-not-allowed"
        ),
        error: E(
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
), va = De("block text-md font-medium text-cms-black"), Wf = De(
  "block text-sm font-medium text-cms-red-400 mt-1"
), $f = De(
  "block text-sm font-normal text-cms-gray-700 mt-1"
), Ff = w.forwardRef(
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
    onChange: h,
    id: m,
    labelLayout: v = "vertical",
    labelWidth: g = "120px",
    ...y
  }, b) => {
    const [x, C] = w.useState(
      u || d || ""
    ), M = m || `input-${Math.random().toString(36).substr(2, 9)}`, N = a ? "error" : t, k = u !== void 0 ? u : x, O = (k == null ? void 0 : k.length) || 0, T = ($) => {
      u === void 0 && C($.target.value), h == null || h($);
    }, Y = r || c && l, _ = v === "horizontal";
    return /* @__PURE__ */ I("div", { className: E("w-full", !n && "w-auto"), children: [
      _ && Y ? /* @__PURE__ */ I("div", { className: "flex items-center gap-3", children: [
        r && /* @__PURE__ */ I(
          "label",
          {
            htmlFor: M,
            className: E(va(), "mb-0 shrink-0"),
            style: { width: g },
            children: [
              r,
              o && /* @__PURE__ */ f("span", { className: "text-cms-red-400 ml-1", children: "*" })
            ]
          }
        ),
        /* @__PURE__ */ f("div", { className: "flex-1", children: /* @__PURE__ */ f(
          "input",
          {
            id: M,
            ref: b,
            className: E(
              ya({ variant: N, fullWidth: !0 }),
              e
            ),
            maxLength: l,
            value: u,
            defaultValue: d,
            onChange: T,
            required: o,
            ...y
          }
        ) }),
        c && l && /* @__PURE__ */ I("span", { className: "text-sm text-cms-gray-600 shrink-0", children: [
          O,
          " / ",
          l
        ] })
      ] }) : /* @__PURE__ */ I(Tt, { children: [
        Y && /* @__PURE__ */ I("div", { className: "flex justify-between items-center mb-2", children: [
          r ? /* @__PURE__ */ I("label", { htmlFor: M, className: va(), children: [
            r,
            o && /* @__PURE__ */ f("span", { className: "text-cms-red-400 ml-1", children: "*" })
          ] }) : /* @__PURE__ */ f("div", {}),
          c && l && /* @__PURE__ */ I("span", { className: "text-sm text-cms-gray-600", children: [
            O,
            " / ",
            l
          ] })
        ] }),
        /* @__PURE__ */ f(
          "input",
          {
            id: M,
            ref: b,
            className: E(
              ya({ variant: N, fullWidth: n }),
              e
            ),
            maxLength: l,
            value: u,
            defaultValue: d,
            onChange: T,
            required: o,
            ...y
          }
        )
      ] }),
      a && s && /* @__PURE__ */ f("span", { className: Wf(), children: s }),
      !a && i && /* @__PURE__ */ f("span", { className: $f(), children: i })
    ] });
  }
);
Ff.displayName = "TextInput";
function Yf(e, t, n = "long") {
  return new Intl.DateTimeFormat("en-US", {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: "numeric",
    timeZone: e,
    timeZoneName: n
  }).format(t).split(/\s/g).slice(2).join(" ");
}
const Yr = {}, mn = {};
function Pt(e, t) {
  try {
    const r = (Yr[e] || (Yr[e] = new Intl.DateTimeFormat("en-US", {
      timeZone: e,
      timeZoneName: "longOffset"
    }).format))(t).split("GMT")[1];
    return r in mn ? mn[r] : wa(r, r.split(":"));
  } catch {
    if (e in mn) return mn[e];
    const n = e == null ? void 0 : e.match(Lf);
    return n ? wa(e, n.slice(1)) : NaN;
  }
}
const Lf = /([+-]\d\d):?(\d\d)?/;
function wa(e, t) {
  const n = +(t[0] || 0), r = +(t[1] || 0), o = +(t[2] || 0) / 60;
  return mn[e] = n * 60 + r > 0 ? n * 60 + r + o : n * 60 - r - o;
}
class et extends Date {
  //#region static
  constructor(...t) {
    super(), t.length > 1 && typeof t[t.length - 1] == "string" && (this.timeZone = t.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(Pt(this.timeZone, this)) ? this.setTime(NaN) : t.length ? typeof t[0] == "number" && (t.length === 1 || t.length === 2 && typeof t[1] != "number") ? this.setTime(t[0]) : typeof t[0] == "string" ? this.setTime(+new Date(t[0])) : t[0] instanceof Date ? this.setTime(+t[0]) : (this.setTime(+new Date(...t)), Hs(this), Qr(this)) : this.setTime(Date.now());
  }
  static tz(t, ...n) {
    return n.length ? new et(...n, t) : new et(Date.now(), t);
  }
  //#endregion
  //#region time zone
  withTimeZone(t) {
    return new et(+this, t);
  }
  getTimezoneOffset() {
    const t = -Pt(this.timeZone, this);
    return t > 0 ? Math.floor(t) : Math.ceil(t);
  }
  //#endregion
  //#region time
  setTime(t) {
    return Date.prototype.setTime.apply(this, arguments), Qr(this), +this;
  }
  //#endregion
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new et(+new Date(t), this.timeZone);
  }
  //#endregion
}
const xa = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
  if (!xa.test(e)) return;
  const t = e.replace(xa, "$1UTC");
  et.prototype[t] && (e.startsWith("get") ? et.prototype[e] = function() {
    return this.internal[t]();
  } : (et.prototype[e] = function() {
    return Date.prototype[t].apply(this.internal, arguments), Bf(this), +this;
  }, et.prototype[t] = function() {
    return Date.prototype[t].apply(this, arguments), Qr(this), +this;
  }));
});
function Qr(e) {
  e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - Math.round(-Pt(e.timeZone, e) * 60));
}
function Bf(e) {
  Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), Hs(e);
}
function Hs(e) {
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
  const h = Pt(e.timeZone, e), m = h > 0 ? Math.floor(h) : Math.ceil(h), g = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - m, y = m !== n, b = g - c;
  if (y && b) {
    Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + b);
    const x = Pt(e.timeZone, e), C = x > 0 ? Math.floor(x) : Math.ceil(x), M = m - C;
    M && (e.internal.setUTCMinutes(e.internal.getUTCMinutes() + M), Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + M));
  }
}
class Me extends et {
  //#region static
  static tz(t, ...n) {
    return n.length ? new Me(...n, t) : new Me(Date.now(), t);
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
    return `${t} GMT${n}${r}${o} (${Yf(this.timeZone, this)})`;
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
    return new Me(+this, t);
  }
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new Me(+new Date(t), this.timeZone);
  }
  //#endregion
}
const zs = 6048e5, Hf = 864e5, Ca = Symbol.for("constructDateFrom");
function ge(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && Ca in e ? e[Ca](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function se(e, t) {
  return ge(t || e, e);
}
function Vs(e, t, n) {
  const r = se(e, n == null ? void 0 : n.in);
  return isNaN(t) ? ge(e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
function js(e, t, n) {
  const r = se(e, n == null ? void 0 : n.in);
  if (isNaN(t)) return ge(e, NaN);
  if (!t)
    return r;
  const o = r.getDate(), a = ge(e, r.getTime());
  a.setMonth(r.getMonth() + t + 1, 0);
  const s = a.getDate();
  return o >= s ? a : (r.setFullYear(
    a.getFullYear(),
    a.getMonth(),
    o
  ), r);
}
let zf = {};
function Nn() {
  return zf;
}
function en(e, t) {
  var i, c, l, u;
  const n = Nn(), r = (t == null ? void 0 : t.weekStartsOn) ?? ((c = (i = t == null ? void 0 : t.locale) == null ? void 0 : i.options) == null ? void 0 : c.weekStartsOn) ?? n.weekStartsOn ?? ((u = (l = n.locale) == null ? void 0 : l.options) == null ? void 0 : u.weekStartsOn) ?? 0, o = se(e, t == null ? void 0 : t.in), a = o.getDay(), s = (a < r ? 7 : 0) + a - r;
  return o.setDate(o.getDate() - s), o.setHours(0, 0, 0, 0), o;
}
function vn(e, t) {
  return en(e, { ...t, weekStartsOn: 1 });
}
function Gs(e, t) {
  const n = se(e, t == null ? void 0 : t.in), r = n.getFullYear(), o = ge(n, 0);
  o.setFullYear(r + 1, 0, 4), o.setHours(0, 0, 0, 0);
  const a = vn(o), s = ge(n, 0);
  s.setFullYear(r, 0, 4), s.setHours(0, 0, 0, 0);
  const i = vn(s);
  return n.getTime() >= a.getTime() ? r + 1 : n.getTime() >= i.getTime() ? r : r - 1;
}
function ka(e) {
  const t = se(e), n = new Date(
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
function an(e, ...t) {
  const n = ge.bind(
    null,
    t.find((r) => typeof r == "object")
  );
  return t.map(n);
}
function wn(e, t) {
  const n = se(e, t == null ? void 0 : t.in);
  return n.setHours(0, 0, 0, 0), n;
}
function wo(e, t, n) {
  const [r, o] = an(
    n == null ? void 0 : n.in,
    e,
    t
  ), a = wn(r), s = wn(o), i = +a - ka(a), c = +s - ka(s);
  return Math.round((i - c) / Hf);
}
function Vf(e, t) {
  const n = Gs(e, t), r = ge(e, 0);
  return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), vn(r);
}
function jf(e, t, n) {
  return Vs(e, t * 7, n);
}
function Gf(e, t, n) {
  return js(e, t * 12, n);
}
function Uf(e, t) {
  let n, r = t == null ? void 0 : t.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = ge.bind(null, o));
    const a = se(o, r);
    (!n || n < a || isNaN(+a)) && (n = a);
  }), ge(r, n || NaN);
}
function qf(e, t) {
  let n, r = t == null ? void 0 : t.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = ge.bind(null, o));
    const a = se(o, r);
    (!n || n > a || isNaN(+a)) && (n = a);
  }), ge(r, n || NaN);
}
function Xf(e, t, n) {
  const [r, o] = an(
    n == null ? void 0 : n.in,
    e,
    t
  );
  return +wn(r) == +wn(o);
}
function Us(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function Kf(e) {
  return !(!Us(e) && typeof e != "number" || isNaN(+se(e)));
}
function qs(e, t, n) {
  const [r, o] = an(
    n == null ? void 0 : n.in,
    e,
    t
  ), a = r.getFullYear() - o.getFullYear(), s = r.getMonth() - o.getMonth();
  return a * 12 + s;
}
function Zf(e, t) {
  const n = se(e, t == null ? void 0 : t.in), r = n.getMonth();
  return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
function Xs(e, t) {
  const [n, r] = an(e, t.start, t.end);
  return { start: n, end: r };
}
function Qf(e, t) {
  const { start: n, end: r } = Xs(t == null ? void 0 : t.in, e);
  let o = +n > +r;
  const a = o ? +n : +r, s = o ? r : n;
  s.setHours(0, 0, 0, 0), s.setDate(1);
  let i = 1;
  const c = [];
  for (; +s <= a; )
    c.push(ge(n, s)), s.setMonth(s.getMonth() + i);
  return o ? c.reverse() : c;
}
function Jf(e, t) {
  const n = se(e, t == null ? void 0 : t.in);
  return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function eh(e, t) {
  const n = se(e, t == null ? void 0 : t.in), r = n.getFullYear();
  return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
function Ks(e, t) {
  const n = se(e, t == null ? void 0 : t.in);
  return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function th(e, t) {
  const { start: n, end: r } = Xs(t == null ? void 0 : t.in, e);
  let o = +n > +r;
  const a = o ? +n : +r, s = o ? r : n;
  s.setHours(0, 0, 0, 0), s.setMonth(0, 1);
  let i = 1;
  const c = [];
  for (; +s <= a; )
    c.push(ge(n, s)), s.setFullYear(s.getFullYear() + i);
  return o ? c.reverse() : c;
}
function Zs(e, t) {
  var i, c, l, u;
  const n = Nn(), r = (t == null ? void 0 : t.weekStartsOn) ?? ((c = (i = t == null ? void 0 : t.locale) == null ? void 0 : i.options) == null ? void 0 : c.weekStartsOn) ?? n.weekStartsOn ?? ((u = (l = n.locale) == null ? void 0 : l.options) == null ? void 0 : u.weekStartsOn) ?? 0, o = se(e, t == null ? void 0 : t.in), a = o.getDay(), s = (a < r ? -7 : 0) + 6 - (a - r);
  return o.setDate(o.getDate() + s), o.setHours(23, 59, 59, 999), o;
}
function nh(e, t) {
  return Zs(e, { ...t, weekStartsOn: 1 });
}
const rh = {
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
}, oh = (e, t, n) => {
  let r;
  const o = rh[e];
  return typeof o == "string" ? r = o : t === 1 ? r = o.one : r = o.other.replace("{{count}}", t.toString()), n != null && n.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
function Zt(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
const ah = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, sh = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, ih = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, ch = {
  date: Zt({
    formats: ah,
    defaultWidth: "full"
  }),
  time: Zt({
    formats: sh,
    defaultWidth: "full"
  }),
  dateTime: Zt({
    formats: ih,
    defaultWidth: "full"
  })
}, lh = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, dh = (e, t, n, r) => lh[e];
function Ze(e) {
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
const uh = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, fh = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, hh = {
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
}, mh = {
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
}, ph = {
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
}, gh = {
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
}, bh = (e, t) => {
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
}, yh = {
  ordinalNumber: bh,
  era: Ze({
    values: uh,
    defaultWidth: "wide"
  }),
  quarter: Ze({
    values: fh,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: Ze({
    values: hh,
    defaultWidth: "wide"
  }),
  day: Ze({
    values: mh,
    defaultWidth: "wide"
  }),
  dayPeriod: Ze({
    values: ph,
    defaultWidth: "wide",
    formattingValues: gh,
    defaultFormattingWidth: "wide"
  })
};
function Qe(e) {
  return (t, n = {}) => {
    const r = n.width, o = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], a = t.match(o);
    if (!a)
      return null;
    const s = a[0], i = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], c = Array.isArray(i) ? wh(i, (d) => d.test(s)) : (
      // [TODO] -- I challenge you to fix the type
      vh(i, (d) => d.test(s))
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
function vh(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function wh(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function Qs(e) {
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
const xh = /^(\d+)(th|st|nd|rd)?/i, Ch = /\d+/i, kh = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, Mh = {
  any: [/^b/i, /^(a|c)/i]
}, Nh = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, Sh = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Dh = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, Oh = {
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
}, Eh = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, Rh = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, Ph = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, Th = {
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
}, Ah = {
  ordinalNumber: Qs({
    matchPattern: xh,
    parsePattern: Ch,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: Qe({
    matchPatterns: kh,
    defaultMatchWidth: "wide",
    parsePatterns: Mh,
    defaultParseWidth: "any"
  }),
  quarter: Qe({
    matchPatterns: Nh,
    defaultMatchWidth: "wide",
    parsePatterns: Sh,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: Qe({
    matchPatterns: Dh,
    defaultMatchWidth: "wide",
    parsePatterns: Oh,
    defaultParseWidth: "any"
  }),
  day: Qe({
    matchPatterns: Eh,
    defaultMatchWidth: "wide",
    parsePatterns: Rh,
    defaultParseWidth: "any"
  }),
  dayPeriod: Qe({
    matchPatterns: Ph,
    defaultMatchWidth: "any",
    parsePatterns: Th,
    defaultParseWidth: "any"
  })
}, Ut = {
  code: "en-US",
  formatDistance: oh,
  formatLong: ch,
  formatRelative: dh,
  localize: yh,
  match: Ah,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function _h(e, t) {
  const n = se(e, t == null ? void 0 : t.in);
  return wo(n, Ks(n)) + 1;
}
function xo(e, t) {
  const n = se(e, t == null ? void 0 : t.in), r = +vn(n) - +Vf(n);
  return Math.round(r / zs) + 1;
}
function Js(e, t) {
  var u, d, h, m;
  const n = se(e, t == null ? void 0 : t.in), r = n.getFullYear(), o = Nn(), a = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((d = (u = t == null ? void 0 : t.locale) == null ? void 0 : u.options) == null ? void 0 : d.firstWeekContainsDate) ?? o.firstWeekContainsDate ?? ((m = (h = o.locale) == null ? void 0 : h.options) == null ? void 0 : m.firstWeekContainsDate) ?? 1, s = ge((t == null ? void 0 : t.in) || e, 0);
  s.setFullYear(r + 1, 0, a), s.setHours(0, 0, 0, 0);
  const i = en(s, t), c = ge((t == null ? void 0 : t.in) || e, 0);
  c.setFullYear(r, 0, a), c.setHours(0, 0, 0, 0);
  const l = en(c, t);
  return +n >= +i ? r + 1 : +n >= +l ? r : r - 1;
}
function Ih(e, t) {
  var i, c, l, u;
  const n = Nn(), r = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((c = (i = t == null ? void 0 : t.locale) == null ? void 0 : i.options) == null ? void 0 : c.firstWeekContainsDate) ?? n.firstWeekContainsDate ?? ((u = (l = n.locale) == null ? void 0 : l.options) == null ? void 0 : u.firstWeekContainsDate) ?? 1, o = Js(e, t), a = ge((t == null ? void 0 : t.in) || e, 0);
  return a.setFullYear(o, 0, r), a.setHours(0, 0, 0, 0), en(a, t);
}
function Co(e, t) {
  const n = se(e, t == null ? void 0 : t.in), r = +en(n, t) - +Ih(n, t);
  return Math.round(r / zs) + 1;
}
function ae(e, t) {
  const n = e < 0 ? "-" : "", r = Math.abs(e).toString().padStart(t, "0");
  return n + r;
}
const wt = {
  // Year
  y(e, t) {
    const n = e.getFullYear(), r = n > 0 ? n : 1 - n;
    return ae(t === "yy" ? r % 100 : r, t.length);
  },
  // Month
  M(e, t) {
    const n = e.getMonth();
    return t === "M" ? String(n + 1) : ae(n + 1, 2);
  },
  // Day of the month
  d(e, t) {
    return ae(e.getDate(), t.length);
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
    return ae(e.getHours() % 12 || 12, t.length);
  },
  // Hour [0-23]
  H(e, t) {
    return ae(e.getHours(), t.length);
  },
  // Minute
  m(e, t) {
    return ae(e.getMinutes(), t.length);
  },
  // Second
  s(e, t) {
    return ae(e.getSeconds(), t.length);
  },
  // Fraction of second
  S(e, t) {
    const n = t.length, r = e.getMilliseconds(), o = Math.trunc(
      r * Math.pow(10, n - 3)
    );
    return ae(o, t.length);
  }
}, jt = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, Ma = {
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
    return wt.y(e, t);
  },
  // Local week-numbering year
  Y: function(e, t, n, r) {
    const o = Js(e, r), a = o > 0 ? o : 1 - o;
    if (t === "YY") {
      const s = a % 100;
      return ae(s, 2);
    }
    return t === "Yo" ? n.ordinalNumber(a, { unit: "year" }) : ae(a, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const n = Gs(e);
    return ae(n, t.length);
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
    return ae(n, t.length);
  },
  // Quarter
  Q: function(e, t, n) {
    const r = Math.ceil((e.getMonth() + 1) / 3);
    switch (t) {
      case "Q":
        return String(r);
      case "QQ":
        return ae(r, 2);
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
        return ae(r, 2);
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
        return wt.M(e, t);
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
        return ae(r + 1, 2);
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
    const o = Co(e, r);
    return t === "wo" ? n.ordinalNumber(o, { unit: "week" }) : ae(o, t.length);
  },
  // ISO week of year
  I: function(e, t, n) {
    const r = xo(e);
    return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : ae(r, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : wt.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const r = _h(e);
    return t === "Do" ? n.ordinalNumber(r, { unit: "dayOfYear" }) : ae(r, t.length);
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
        return ae(a, 2);
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
        return ae(a, t.length);
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
        return ae(o, t.length);
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
    return wt.h(e, t);
  },
  // Hour [0-23]
  H: function(e, t, n) {
    return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : wt.H(e, t);
  },
  // Hour [0-11]
  K: function(e, t, n) {
    const r = e.getHours() % 12;
    return t === "Ko" ? n.ordinalNumber(r, { unit: "hour" }) : ae(r, t.length);
  },
  // Hour [1-24]
  k: function(e, t, n) {
    let r = e.getHours();
    return r === 0 && (r = 24), t === "ko" ? n.ordinalNumber(r, { unit: "hour" }) : ae(r, t.length);
  },
  // Minute
  m: function(e, t, n) {
    return t === "mo" ? n.ordinalNumber(e.getMinutes(), { unit: "minute" }) : wt.m(e, t);
  },
  // Second
  s: function(e, t, n) {
    return t === "so" ? n.ordinalNumber(e.getSeconds(), { unit: "second" }) : wt.s(e, t);
  },
  // Fraction of second
  S: function(e, t) {
    return wt.S(e, t);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(e, t, n) {
    const r = e.getTimezoneOffset();
    if (r === 0)
      return "Z";
    switch (t) {
      case "X":
        return Sa(r);
      case "XXXX":
      case "XX":
        return Rt(r);
      case "XXXXX":
      case "XXX":
      default:
        return Rt(r, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      case "x":
        return Sa(r);
      case "xxxx":
      case "xx":
        return Rt(r);
      case "xxxxx":
      case "xxx":
      default:
        return Rt(r, ":");
    }
  },
  // Timezone (GMT)
  O: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + Na(r, ":");
      case "OOOO":
      default:
        return "GMT" + Rt(r, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + Na(r, ":");
      case "zzzz":
      default:
        return "GMT" + Rt(r, ":");
    }
  },
  // Seconds timestamp
  t: function(e, t, n) {
    const r = Math.trunc(+e / 1e3);
    return ae(r, t.length);
  },
  // Milliseconds timestamp
  T: function(e, t, n) {
    return ae(+e, t.length);
  }
};
function Na(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = Math.trunc(r / 60), a = r % 60;
  return a === 0 ? n + String(o) : n + String(o) + t + ae(a, 2);
}
function Sa(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + ae(Math.abs(e) / 60, 2) : Rt(e, t);
}
function Rt(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = ae(Math.trunc(r / 60), 2), a = ae(r % 60, 2);
  return n + o + t + a;
}
const Da = (e, t) => {
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
}, ei = (e, t) => {
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
}, Wh = (e, t) => {
  const n = e.match(/(P+)(p+)?/) || [], r = n[1], o = n[2];
  if (!o)
    return Da(e, t);
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
  return a.replace("{{date}}", Da(r, t)).replace("{{time}}", ei(o, t));
}, $h = {
  p: ei,
  P: Wh
}, Fh = /^D+$/, Yh = /^Y+$/, Lh = ["D", "DD", "YY", "YYYY"];
function Bh(e) {
  return Fh.test(e);
}
function Hh(e) {
  return Yh.test(e);
}
function zh(e, t, n) {
  const r = Vh(e, t, n);
  if (console.warn(r), Lh.includes(e)) throw new RangeError(r);
}
function Vh(e, t, n) {
  const r = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const jh = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Gh = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Uh = /^'([^]*?)'?$/, qh = /''/g, Xh = /[a-zA-Z]/;
function pn(e, t, n) {
  var u, d, h, m, v, g, y, b;
  const r = Nn(), o = (n == null ? void 0 : n.locale) ?? r.locale ?? Ut, a = (n == null ? void 0 : n.firstWeekContainsDate) ?? ((d = (u = n == null ? void 0 : n.locale) == null ? void 0 : u.options) == null ? void 0 : d.firstWeekContainsDate) ?? r.firstWeekContainsDate ?? ((m = (h = r.locale) == null ? void 0 : h.options) == null ? void 0 : m.firstWeekContainsDate) ?? 1, s = (n == null ? void 0 : n.weekStartsOn) ?? ((g = (v = n == null ? void 0 : n.locale) == null ? void 0 : v.options) == null ? void 0 : g.weekStartsOn) ?? r.weekStartsOn ?? ((b = (y = r.locale) == null ? void 0 : y.options) == null ? void 0 : b.weekStartsOn) ?? 0, i = se(e, n == null ? void 0 : n.in);
  if (!Kf(i))
    throw new RangeError("Invalid time value");
  let c = t.match(Gh).map((x) => {
    const C = x[0];
    if (C === "p" || C === "P") {
      const M = $h[C];
      return M(x, o.formatLong);
    }
    return x;
  }).join("").match(jh).map((x) => {
    if (x === "''")
      return { isToken: !1, value: "'" };
    const C = x[0];
    if (C === "'")
      return { isToken: !1, value: Kh(x) };
    if (Ma[C])
      return { isToken: !0, value: x };
    if (C.match(Xh))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + C + "`"
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
    const C = x.value;
    (!(n != null && n.useAdditionalWeekYearTokens) && Hh(C) || !(n != null && n.useAdditionalDayOfYearTokens) && Bh(C)) && zh(C, t, String(e));
    const M = Ma[C[0]];
    return M(i, C, o.localize, l);
  }).join("");
}
function Kh(e) {
  const t = e.match(Uh);
  return t ? t[1].replace(qh, "'") : e;
}
function Zh(e, t) {
  const n = se(e, t == null ? void 0 : t.in), r = n.getFullYear(), o = n.getMonth(), a = ge(n, 0);
  return a.setFullYear(r, o + 1, 0), a.setHours(0, 0, 0, 0), a.getDate();
}
function Qh(e, t) {
  return se(e, t == null ? void 0 : t.in).getMonth();
}
function Jh(e, t) {
  return se(e, t == null ? void 0 : t.in).getFullYear();
}
function em(e, t) {
  return +se(e) > +se(t);
}
function tm(e, t) {
  return +se(e) < +se(t);
}
function nm(e, t, n) {
  const [r, o] = an(
    n == null ? void 0 : n.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear() && r.getMonth() === o.getMonth();
}
function rm(e, t, n) {
  const [r, o] = an(
    n == null ? void 0 : n.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear();
}
function om(e, t, n) {
  const r = se(e, n == null ? void 0 : n.in), o = r.getFullYear(), a = r.getDate(), s = ge(e, 0);
  s.setFullYear(o, t, 15), s.setHours(0, 0, 0, 0);
  const i = Zh(s);
  return r.setMonth(t, Math.min(a, i)), r;
}
function am(e, t, n) {
  const r = se(e, n == null ? void 0 : n.in);
  return isNaN(+r) ? ge(e, NaN) : (r.setFullYear(t), r);
}
const Oa = 5, sm = 4;
function im(e, t) {
  const n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, o = t.addDays(e, -r + 1), a = t.addDays(o, Oa * 7 - 1);
  return t.getMonth(e) === t.getMonth(a) ? Oa : sm;
}
function ti(e, t) {
  const n = t.startOfMonth(e), r = n.getDay();
  return r === 1 ? n : r === 0 ? t.addDays(n, -1 * 6) : t.addDays(n, -1 * (r - 1));
}
function cm(e, t) {
  const n = ti(e, t), r = im(e, t);
  return t.addDays(n, r * 7 - 1);
}
const lm = {
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
}, dm = (e, t, n) => {
  let r;
  const o = lm[e];
  return typeof o == "string" ? r = o : t === 1 ? r = o.one : r = o.other.replace("{{count}}", t.toString()), n != null && n.addSuffix ? n.comparison && n.comparison > 0 ? r + " 후" : r + " 전" : r;
}, um = {
  full: "y년 M월 d일 EEEE",
  long: "y년 M월 d일",
  medium: "y.MM.dd",
  short: "y.MM.dd"
}, fm = {
  full: "a H시 mm분 ss초 zzzz",
  long: "a H:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
}, hm = {
  full: "{{date}} {{time}}",
  long: "{{date}} {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
}, mm = {
  date: Zt({
    formats: um,
    defaultWidth: "full"
  }),
  time: Zt({
    formats: fm,
    defaultWidth: "full"
  }),
  dateTime: Zt({
    formats: hm,
    defaultWidth: "full"
  })
}, pm = {
  lastWeek: "'지난' eeee p",
  yesterday: "'어제' p",
  today: "'오늘' p",
  tomorrow: "'내일' p",
  nextWeek: "'다음' eeee p",
  other: "P"
}, gm = (e, t, n, r) => pm[e], bm = {
  narrow: ["BC", "AD"],
  abbreviated: ["BC", "AD"],
  wide: ["기원전", "서기"]
}, ym = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1분기", "2분기", "3분기", "4분기"]
}, vm = {
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
}, wm = {
  narrow: ["일", "월", "화", "수", "목", "금", "토"],
  short: ["일", "월", "화", "수", "목", "금", "토"],
  abbreviated: ["일", "월", "화", "수", "목", "금", "토"],
  wide: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"]
}, xm = {
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
}, Cm = {
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
}, km = (e, t) => {
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
}, Mm = {
  ordinalNumber: km,
  era: Ze({
    values: bm,
    defaultWidth: "wide"
  }),
  quarter: Ze({
    values: ym,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: Ze({
    values: vm,
    defaultWidth: "wide"
  }),
  day: Ze({
    values: wm,
    defaultWidth: "wide"
  }),
  dayPeriod: Ze({
    values: xm,
    defaultWidth: "wide",
    formattingValues: Cm,
    defaultFormattingWidth: "wide"
  })
}, Nm = /^(\d+)(일|번째)?/i, Sm = /\d+/i, Dm = {
  narrow: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(기원전|서기)/i
}, Om = {
  any: [/^(bc|기원전)/i, /^(ad|서기)/i]
}, Em = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234]사?분기/i
}, Rm = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Pm = {
  narrow: /^(1[012]|[123456789])/,
  abbreviated: /^(1[012]|[123456789])월/i,
  wide: /^(1[012]|[123456789])월/i
}, Tm = {
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
}, Am = {
  narrow: /^[일월화수목금토]/,
  short: /^[일월화수목금토]/,
  abbreviated: /^[일월화수목금토]/,
  wide: /^[일월화수목금토]요일/
}, _m = {
  any: [/^일/, /^월/, /^화/, /^수/, /^목/, /^금/, /^토/]
}, Im = {
  any: /^(am|pm|오전|오후|자정|정오|아침|저녁|밤)/i
}, Wm = {
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
}, $m = {
  ordinalNumber: Qs({
    matchPattern: Nm,
    parsePattern: Sm,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: Qe({
    matchPatterns: Dm,
    defaultMatchWidth: "wide",
    parsePatterns: Om,
    defaultParseWidth: "any"
  }),
  quarter: Qe({
    matchPatterns: Em,
    defaultMatchWidth: "wide",
    parsePatterns: Rm,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: Qe({
    matchPatterns: Pm,
    defaultMatchWidth: "wide",
    parsePatterns: Tm,
    defaultParseWidth: "any"
  }),
  day: Qe({
    matchPatterns: Am,
    defaultMatchWidth: "wide",
    parsePatterns: _m,
    defaultParseWidth: "any"
  }),
  dayPeriod: Qe({
    matchPatterns: Im,
    defaultMatchWidth: "any",
    parsePatterns: Wm,
    defaultParseWidth: "any"
  })
}, Fm = {
  code: "ko",
  formatDistance: dm,
  formatLong: mm,
  formatRelative: gm,
  localize: Mm,
  match: $m,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
}, ni = {
  ...Ut,
  labels: {
    labelDayButton: (e, t, n, r) => {
      let o;
      r && typeof r.format == "function" ? o = r.format.bind(r) : o = (s, i) => pn(s, i, { locale: Ut, ...n });
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
      return n && typeof n.format == "function" ? r = n.format.bind(n) : r = (o, a) => pn(o, a, { locale: Ut, ...t }), r(e, "LLLL yyyy");
    },
    labelGridcell: (e, t, n, r) => {
      let o;
      r && typeof r.format == "function" ? o = r.format.bind(r) : o = (s, i) => pn(s, i, { locale: Ut, ...n });
      let a = o(e, "PPPP");
      return t != null && t.today && (a = `Today, ${a}`), a;
    },
    labelNav: "Navigation bar",
    labelWeekNumberHeader: "Week Number",
    labelWeekday: (e, t, n) => {
      let r;
      return n && typeof n.format == "function" ? r = n.format.bind(n) : r = (o, a) => pn(o, a, { locale: Ut, ...t }), r(e, "cccc");
    }
  }
};
class xe {
  /**
   * Creates an instance of `DateLib`.
   *
   * @param options Configuration options for the date library.
   * @param overrides Custom overrides for the date library functions.
   */
  constructor(t, n) {
    this.Date = Date, this.today = () => {
      var r;
      return (r = this.overrides) != null && r.today ? this.overrides.today() : this.options.timeZone ? Me.tz(this.options.timeZone) : new this.Date();
    }, this.newDate = (r, o, a) => {
      var s;
      return (s = this.overrides) != null && s.newDate ? this.overrides.newDate(r, o, a) : this.options.timeZone ? new Me(r, o, a, this.options.timeZone) : new Date(r, o, a);
    }, this.addDays = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.addDays ? this.overrides.addDays(r, o) : Vs(r, o);
    }, this.addMonths = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.addMonths ? this.overrides.addMonths(r, o) : js(r, o);
    }, this.addWeeks = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.addWeeks ? this.overrides.addWeeks(r, o) : jf(r, o);
    }, this.addYears = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.addYears ? this.overrides.addYears(r, o) : Gf(r, o);
    }, this.differenceInCalendarDays = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(r, o) : wo(r, o);
    }, this.differenceInCalendarMonths = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(r, o) : qs(r, o);
    }, this.eachMonthOfInterval = (r) => {
      var o;
      return (o = this.overrides) != null && o.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(r) : Qf(r);
    }, this.eachYearOfInterval = (r) => {
      var i;
      const o = (i = this.overrides) != null && i.eachYearOfInterval ? this.overrides.eachYearOfInterval(r) : th(r), a = new Set(o.map((c) => this.getYear(c)));
      if (a.size === o.length)
        return o;
      const s = [];
      return a.forEach((c) => {
        s.push(new Date(c, 0, 1));
      }), s;
    }, this.endOfBroadcastWeek = (r) => {
      var o;
      return (o = this.overrides) != null && o.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(r) : cm(r, this);
    }, this.endOfISOWeek = (r) => {
      var o;
      return (o = this.overrides) != null && o.endOfISOWeek ? this.overrides.endOfISOWeek(r) : nh(r);
    }, this.endOfMonth = (r) => {
      var o;
      return (o = this.overrides) != null && o.endOfMonth ? this.overrides.endOfMonth(r) : Zf(r);
    }, this.endOfWeek = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.endOfWeek ? this.overrides.endOfWeek(r, o) : Zs(r, this.options);
    }, this.endOfYear = (r) => {
      var o;
      return (o = this.overrides) != null && o.endOfYear ? this.overrides.endOfYear(r) : eh(r);
    }, this.format = (r, o, a) => {
      var i;
      const s = (i = this.overrides) != null && i.format ? this.overrides.format(r, o, this.options) : pn(r, o, this.options);
      return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(s) : s;
    }, this.getISOWeek = (r) => {
      var o;
      return (o = this.overrides) != null && o.getISOWeek ? this.overrides.getISOWeek(r) : xo(r);
    }, this.getMonth = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.getMonth ? this.overrides.getMonth(r, this.options) : Qh(r, this.options);
    }, this.getYear = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.getYear ? this.overrides.getYear(r, this.options) : Jh(r, this.options);
    }, this.getWeek = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.getWeek ? this.overrides.getWeek(r, this.options) : Co(r, this.options);
    }, this.isAfter = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isAfter ? this.overrides.isAfter(r, o) : em(r, o);
    }, this.isBefore = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isBefore ? this.overrides.isBefore(r, o) : tm(r, o);
    }, this.isDate = (r) => {
      var o;
      return (o = this.overrides) != null && o.isDate ? this.overrides.isDate(r) : Us(r);
    }, this.isSameDay = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isSameDay ? this.overrides.isSameDay(r, o) : Xf(r, o);
    }, this.isSameMonth = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isSameMonth ? this.overrides.isSameMonth(r, o) : nm(r, o);
    }, this.isSameYear = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isSameYear ? this.overrides.isSameYear(r, o) : rm(r, o);
    }, this.max = (r) => {
      var o;
      return (o = this.overrides) != null && o.max ? this.overrides.max(r) : Uf(r);
    }, this.min = (r) => {
      var o;
      return (o = this.overrides) != null && o.min ? this.overrides.min(r) : qf(r);
    }, this.setMonth = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.setMonth ? this.overrides.setMonth(r, o) : om(r, o);
    }, this.setYear = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.setYear ? this.overrides.setYear(r, o) : am(r, o);
    }, this.startOfBroadcastWeek = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(r, this) : ti(r, this);
    }, this.startOfDay = (r) => {
      var o;
      return (o = this.overrides) != null && o.startOfDay ? this.overrides.startOfDay(r) : wn(r);
    }, this.startOfISOWeek = (r) => {
      var o;
      return (o = this.overrides) != null && o.startOfISOWeek ? this.overrides.startOfISOWeek(r) : vn(r);
    }, this.startOfMonth = (r) => {
      var o;
      return (o = this.overrides) != null && o.startOfMonth ? this.overrides.startOfMonth(r) : Jf(r);
    }, this.startOfWeek = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.startOfWeek ? this.overrides.startOfWeek(r, this.options) : en(r, this.options);
    }, this.startOfYear = (r) => {
      var o;
      return (o = this.overrides) != null && o.startOfYear ? this.overrides.startOfYear(r) : Ks(r);
    }, this.options = { locale: ni, ...t }, this.overrides = n;
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
    return t && xe.yearFirstLocales.has(t) ? "year-first" : "month-first";
  }
  /**
   * Formats the month/year pair respecting locale conventions.
   *
   * @since 9.11.0
   */
  formatMonthYear(t) {
    const { locale: n, timeZone: r, numerals: o } = this.options, a = n == null ? void 0 : n.code;
    if (a && xe.yearFirstLocales.has(a))
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
xe.yearFirstLocales = /* @__PURE__ */ new Set([
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
const at = new xe();
class ri {
  constructor(t, n, r = at) {
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
class Ym {
  constructor(t, n) {
    this.date = t, this.weeks = n;
  }
}
class Lm {
  constructor(t, n) {
    this.days = n, this.weekNumber = t;
  }
}
function Bm(e) {
  return w.createElement("button", { ...e });
}
function Hm(e) {
  return w.createElement("span", { ...e });
}
function zm(e) {
  const { size: t = 24, orientation: n = "left", className: r } = e;
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: handled by the parent component
    w.createElement(
      "svg",
      { className: r, width: t, height: t, viewBox: "0 0 24 24" },
      n === "up" && w.createElement("polygon", { points: "6.77 17 12.5 11.43 18.24 17 20 15.28 12.5 8 5 15.28" }),
      n === "down" && w.createElement("polygon", { points: "6.77 8 12.5 13.57 18.24 8 20 9.72 12.5 17 5 9.72" }),
      n === "left" && w.createElement("polygon", { points: "16 18.112 9.81111111 12 16 5.87733333 14.0888889 4 6 12 14.0888889 20" }),
      n === "right" && w.createElement("polygon", { points: "8 18.112 14.18888889 12 8 5.87733333 9.91111111 4 18 12 9.91111111 20" })
    )
  );
}
function Vm(e) {
  const { day: t, modifiers: n, ...r } = e;
  return w.createElement("td", { ...r });
}
function jm(e) {
  const { day: t, modifiers: n, ...r } = e, o = w.useRef(null);
  return w.useEffect(() => {
    var a;
    n.focused && ((a = o.current) == null || a.focus());
  }, [n.focused]), w.createElement("button", { ref: o, ...r });
}
var V;
(function(e) {
  e.Root = "root", e.Chevron = "chevron", e.Day = "day", e.DayButton = "day_button", e.CaptionLabel = "caption_label", e.Dropdowns = "dropdowns", e.Dropdown = "dropdown", e.DropdownRoot = "dropdown_root", e.Footer = "footer", e.MonthGrid = "month_grid", e.MonthCaption = "month_caption", e.MonthsDropdown = "months_dropdown", e.Month = "month", e.Months = "months", e.Nav = "nav", e.NextMonthButton = "button_next", e.PreviousMonthButton = "button_previous", e.Week = "week", e.Weeks = "weeks", e.Weekday = "weekday", e.Weekdays = "weekdays", e.WeekNumber = "week_number", e.WeekNumberHeader = "week_number_header", e.YearsDropdown = "years_dropdown";
})(V || (V = {}));
var ue;
(function(e) {
  e.disabled = "disabled", e.hidden = "hidden", e.outside = "outside", e.focused = "focused", e.today = "today";
})(ue || (ue = {}));
var Be;
(function(e) {
  e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})(Be || (Be = {}));
var Te;
(function(e) {
  e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})(Te || (Te = {}));
function Gm(e) {
  const { options: t, className: n, components: r, classNames: o, ...a } = e, s = [o[V.Dropdown], n].join(" "), i = t == null ? void 0 : t.find(({ value: c }) => c === a.value);
  return w.createElement(
    "span",
    { "data-disabled": a.disabled, className: o[V.DropdownRoot] },
    w.createElement(r.Select, { className: s, ...a }, t == null ? void 0 : t.map(({ value: c, label: l, disabled: u }) => w.createElement(r.Option, { key: c, value: c, disabled: u }, l))),
    w.createElement(
      "span",
      { className: o[V.CaptionLabel], "aria-hidden": !0 },
      i == null ? void 0 : i.label,
      w.createElement(r.Chevron, { orientation: "down", size: 18, className: o[V.Chevron] })
    )
  );
}
function Um(e) {
  return w.createElement("div", { ...e });
}
function qm(e) {
  return w.createElement("div", { ...e });
}
function Xm(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return w.createElement("div", { ...r }, e.children);
}
function Km(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return w.createElement("div", { ...r });
}
function Zm(e) {
  return w.createElement("table", { ...e });
}
function Qm(e) {
  return w.createElement("div", { ...e });
}
const oi = qc(void 0);
function Sn() {
  const e = Xc(oi);
  if (e === void 0)
    throw new Error("useDayPicker() must be used within a custom component.");
  return e;
}
function Jm(e) {
  const { components: t } = Sn();
  return w.createElement(t.Dropdown, { ...e });
}
function ep(e) {
  const { onPreviousClick: t, onNextClick: n, previousMonth: r, nextMonth: o, ...a } = e, { components: s, classNames: i, labels: { labelPrevious: c, labelNext: l } } = Sn(), u = Ee((h) => {
    o && (n == null || n(h));
  }, [o, n]), d = Ee((h) => {
    r && (t == null || t(h));
  }, [r, t]);
  return w.createElement(
    "nav",
    { ...a },
    w.createElement(
      s.PreviousMonthButton,
      { type: "button", className: i[V.PreviousMonthButton], tabIndex: r ? void 0 : -1, "aria-disabled": r ? void 0 : !0, "aria-label": c(r), onClick: d },
      w.createElement(s.Chevron, { disabled: r ? void 0 : !0, className: i[V.Chevron], orientation: "left" })
    ),
    w.createElement(
      s.NextMonthButton,
      { type: "button", className: i[V.NextMonthButton], tabIndex: o ? void 0 : -1, "aria-disabled": o ? void 0 : !0, "aria-label": l(o), onClick: u },
      w.createElement(s.Chevron, { disabled: o ? void 0 : !0, orientation: "right", className: i[V.Chevron] })
    )
  );
}
function tp(e) {
  const { components: t } = Sn();
  return w.createElement(t.Button, { ...e });
}
function np(e) {
  return w.createElement("option", { ...e });
}
function rp(e) {
  const { components: t } = Sn();
  return w.createElement(t.Button, { ...e });
}
function op(e) {
  const { rootRef: t, ...n } = e;
  return w.createElement("div", { ...n, ref: t });
}
function ap(e) {
  return w.createElement("select", { ...e });
}
function sp(e) {
  const { week: t, ...n } = e;
  return w.createElement("tr", { ...n });
}
function ip(e) {
  return w.createElement("th", { ...e });
}
function cp(e) {
  return w.createElement(
    "thead",
    { "aria-hidden": !0 },
    w.createElement("tr", { ...e })
  );
}
function lp(e) {
  const { week: t, ...n } = e;
  return w.createElement("th", { ...n });
}
function dp(e) {
  return w.createElement("th", { ...e });
}
function up(e) {
  return w.createElement("tbody", { ...e });
}
function fp(e) {
  const { components: t } = Sn();
  return w.createElement(t.Dropdown, { ...e });
}
const hp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: Bm,
  CaptionLabel: Hm,
  Chevron: zm,
  Day: Vm,
  DayButton: jm,
  Dropdown: Gm,
  DropdownNav: Um,
  Footer: qm,
  Month: Xm,
  MonthCaption: Km,
  MonthGrid: Zm,
  Months: Qm,
  MonthsDropdown: Jm,
  Nav: ep,
  NextMonthButton: tp,
  Option: np,
  PreviousMonthButton: rp,
  Root: op,
  Select: ap,
  Week: sp,
  WeekNumber: lp,
  WeekNumberHeader: dp,
  Weekday: ip,
  Weekdays: cp,
  Weeks: up,
  YearsDropdown: fp
}, Symbol.toStringTag, { value: "Module" }));
function lt(e, t, n = !1, r = at) {
  let { from: o, to: a } = e;
  const { differenceInCalendarDays: s, isSameDay: i } = r;
  return o && a ? (s(a, o) < 0 && ([o, a] = [a, o]), s(t, o) >= (n ? 1 : 0) && s(a, t) >= (n ? 1 : 0)) : !n && a ? i(a, t) : !n && o ? i(o, t) : !1;
}
function ko(e) {
  return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function hr(e) {
  return !!(e && typeof e == "object" && "from" in e);
}
function Mo(e) {
  return !!(e && typeof e == "object" && "after" in e);
}
function No(e) {
  return !!(e && typeof e == "object" && "before" in e);
}
function ai(e) {
  return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function si(e, t) {
  return Array.isArray(e) && e.every(t.isDate);
}
function dt(e, t, n = at) {
  const r = Array.isArray(t) ? t : [t], { isSameDay: o, differenceInCalendarDays: a, isAfter: s } = n;
  return r.some((i) => {
    if (typeof i == "boolean")
      return i;
    if (n.isDate(i))
      return o(e, i);
    if (si(i, n))
      return i.some((c) => o(e, c));
    if (hr(i))
      return lt(i, e, !1, n);
    if (ai(i))
      return Array.isArray(i.dayOfWeek) ? i.dayOfWeek.includes(e.getDay()) : i.dayOfWeek === e.getDay();
    if (ko(i)) {
      const c = a(i.before, e), l = a(i.after, e), u = c > 0, d = l < 0;
      return s(i.before, i.after) ? d && u : u || d;
    }
    return Mo(i) ? a(e, i.after) > 0 : No(i) ? a(i.before, e) > 0 : typeof i == "function" ? i(e) : !1;
  });
}
function mp(e, t, n, r, o) {
  const { disabled: a, hidden: s, modifiers: i, showOutsideDays: c, broadcastCalendar: l, today: u = o.today() } = t, { isSameDay: d, isSameMonth: h, startOfMonth: m, isBefore: v, endOfMonth: g, isAfter: y } = o, b = n && m(n), x = r && g(r), C = {
    [ue.focused]: [],
    [ue.outside]: [],
    [ue.disabled]: [],
    [ue.hidden]: [],
    [ue.today]: []
  }, M = {};
  for (const N of e) {
    const { date: k, displayMonth: O } = N, T = !!(O && !h(k, O)), Y = !!(b && v(k, b)), _ = !!(x && y(k, x)), $ = !!(a && dt(k, a, o)), P = !!(s && dt(k, s, o)) || Y || _ || // Broadcast calendar will show outside days as default
    !l && !c && T || l && c === !1 && T, B = d(k, u);
    T && C.outside.push(N), $ && C.disabled.push(N), P && C.hidden.push(N), B && C.today.push(N), i && Object.keys(i).forEach((S) => {
      const A = i == null ? void 0 : i[S];
      A && dt(k, A, o) && (M[S] ? M[S].push(N) : M[S] = [N]);
    });
  }
  return (N) => {
    const k = {
      [ue.focused]: !1,
      [ue.disabled]: !1,
      [ue.hidden]: !1,
      [ue.outside]: !1,
      [ue.today]: !1
    }, O = {};
    for (const T in C) {
      const Y = C[T];
      k[T] = Y.some((_) => _ === N);
    }
    for (const T in M)
      O[T] = M[T].some((Y) => Y === N);
    return {
      ...k,
      // custom modifiers should override all the previous ones
      ...O
    };
  };
}
function pp(e, t, n = {}) {
  return Object.entries(e).filter(([, o]) => o === !0).reduce((o, [a]) => (n[a] ? o.push(n[a]) : t[ue[a]] ? o.push(t[ue[a]]) : t[Be[a]] && o.push(t[Be[a]]), o), [t[V.Day]]);
}
function gp(e) {
  return {
    ...hp,
    ...e
  };
}
function bp(e) {
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
function yp() {
  const e = {};
  for (const t in V)
    e[V[t]] = `rdp-${V[t]}`;
  for (const t in ue)
    e[ue[t]] = `rdp-${ue[t]}`;
  for (const t in Be)
    e[Be[t]] = `rdp-${Be[t]}`;
  for (const t in Te)
    e[Te[t]] = `rdp-${Te[t]}`;
  return e;
}
function ii(e, t, n) {
  return (n ?? new xe(t)).formatMonthYear(e);
}
const vp = ii;
function wp(e, t, n) {
  return (n ?? new xe(t)).format(e, "d");
}
function xp(e, t = at) {
  return t.format(e, "LLLL");
}
function Cp(e, t, n) {
  return (n ?? new xe(t)).format(e, "cccccc");
}
function kp(e, t = at) {
  return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
function Mp() {
  return "";
}
function ci(e, t = at) {
  return t.format(e, "yyyy");
}
const Np = ci, Sp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  formatCaption: ii,
  formatDay: wp,
  formatMonthCaption: vp,
  formatMonthDropdown: xp,
  formatWeekNumber: kp,
  formatWeekNumberHeader: Mp,
  formatWeekdayName: Cp,
  formatYearCaption: Np,
  formatYearDropdown: ci
}, Symbol.toStringTag, { value: "Module" }));
function Dp(e) {
  return e != null && e.formatMonthCaption && !e.formatCaption && (e.formatCaption = e.formatMonthCaption), e != null && e.formatYearCaption && !e.formatYearDropdown && (e.formatYearDropdown = e.formatYearCaption), {
    ...Sp,
    ...e
  };
}
function So(e, t, n, r) {
  let o = (r ?? new xe(n)).format(e, "PPPP");
  return t.today && (o = `Today, ${o}`), t.selected && (o = `${o}, selected`), o;
}
const Op = So;
function Do(e, t, n) {
  return (n ?? new xe(t)).formatMonthYear(e);
}
const Ep = Do;
function li(e, t, n, r) {
  let o = (r ?? new xe(n)).format(e, "PPPP");
  return t != null && t.today && (o = `Today, ${o}`), o;
}
function di(e) {
  return "Choose the Month";
}
function ui() {
  return "";
}
const Rp = "Go to the Next Month";
function fi(e, t) {
  return Rp;
}
function hi(e) {
  return "Go to the Previous Month";
}
function mi(e, t, n) {
  return (n ?? new xe(t)).format(e, "cccc");
}
function pi(e, t) {
  return `Week ${e}`;
}
function gi(e) {
  return "Week Number";
}
function bi(e) {
  return "Choose the Year";
}
const Pp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  labelCaption: Ep,
  labelDay: Op,
  labelDayButton: So,
  labelGrid: Do,
  labelGridcell: li,
  labelMonthDropdown: di,
  labelNav: ui,
  labelNext: fi,
  labelPrevious: hi,
  labelWeekNumber: pi,
  labelWeekNumberHeader: gi,
  labelWeekday: mi,
  labelYearDropdown: bi
}, Symbol.toStringTag, { value: "Module" })), Le = (e, t, n) => t || (n ? typeof n == "function" ? n : (...r) => n : e);
function Tp(e, t) {
  var r;
  const n = ((r = t.locale) == null ? void 0 : r.labels) ?? {};
  return {
    ...Pp,
    ...e ?? {},
    labelDayButton: Le(So, e == null ? void 0 : e.labelDayButton, n.labelDayButton),
    labelMonthDropdown: Le(di, e == null ? void 0 : e.labelMonthDropdown, n.labelMonthDropdown),
    labelNext: Le(fi, e == null ? void 0 : e.labelNext, n.labelNext),
    labelPrevious: Le(hi, e == null ? void 0 : e.labelPrevious, n.labelPrevious),
    labelWeekNumber: Le(pi, e == null ? void 0 : e.labelWeekNumber, n.labelWeekNumber),
    labelYearDropdown: Le(bi, e == null ? void 0 : e.labelYearDropdown, n.labelYearDropdown),
    labelGrid: Le(Do, e == null ? void 0 : e.labelGrid, n.labelGrid),
    labelGridcell: Le(li, e == null ? void 0 : e.labelGridcell, n.labelGridcell),
    labelNav: Le(ui, e == null ? void 0 : e.labelNav, n.labelNav),
    labelWeekNumberHeader: Le(gi, e == null ? void 0 : e.labelWeekNumberHeader, n.labelWeekNumberHeader),
    labelWeekday: Le(mi, e == null ? void 0 : e.labelWeekday, n.labelWeekday)
  };
}
function Ap(e, t, n, r, o) {
  const { startOfMonth: a, startOfYear: s, endOfYear: i, eachMonthOfInterval: c, getMonth: l } = o;
  return c({
    start: s(e),
    end: i(e)
  }).map((h) => {
    const m = r.formatMonthDropdown(h, o), v = l(h), g = t && h < a(t) || n && h > a(n) || !1;
    return { value: v, label: m, disabled: g };
  });
}
function _p(e, t = {}, n = {}) {
  let r = { ...t == null ? void 0 : t[V.Day] };
  return Object.entries(e).filter(([, o]) => o === !0).forEach(([o]) => {
    r = {
      ...r,
      ...n == null ? void 0 : n[o]
    };
  }), r;
}
function Ip(e, t, n, r) {
  const o = r ?? e.today(), a = n ? e.startOfBroadcastWeek(o, e) : t ? e.startOfISOWeek(o) : e.startOfWeek(o), s = [];
  for (let i = 0; i < 7; i++) {
    const c = e.addDays(a, i);
    s.push(c);
  }
  return s;
}
function Wp(e, t, n, r, o = !1) {
  if (!e || !t)
    return;
  const { startOfYear: a, endOfYear: s, eachYearOfInterval: i, getYear: c } = r, l = a(e), u = s(t), d = i({ start: l, end: u });
  return o && d.reverse(), d.map((h) => {
    const m = n.formatYearDropdown(h, r);
    return {
      value: c(h),
      label: m,
      disabled: !1
    };
  });
}
function $p(e, t = {}) {
  var i;
  const { weekStartsOn: n, locale: r } = t, o = n ?? ((i = r == null ? void 0 : r.options) == null ? void 0 : i.weekStartsOn) ?? 0, a = (c) => {
    const l = typeof c == "number" || typeof c == "string" ? new Date(c) : c;
    return new Me(l.getFullYear(), l.getMonth(), l.getDate(), 12, 0, 0, e);
  }, s = (c) => {
    const l = a(c);
    return new Date(l.getFullYear(), l.getMonth(), l.getDate(), 0, 0, 0, 0);
  };
  return {
    today: () => a(Me.tz(e)),
    newDate: (c, l, u) => new Me(c, l, u, 12, 0, 0, e),
    startOfDay: (c) => a(c),
    startOfWeek: (c, l) => {
      const u = a(c), d = (l == null ? void 0 : l.weekStartsOn) ?? o, h = (u.getDay() - d + 7) % 7;
      return u.setDate(u.getDate() - h), u;
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
      const l = a(c.start), u = a(c.end), d = [], h = new Me(l.getFullYear(), l.getMonth(), 1, 12, 0, 0, e), m = u.getFullYear() * 12 + u.getMonth();
      for (; h.getFullYear() * 12 + h.getMonth() <= m; )
        d.push(new Me(h, e)), h.setMonth(h.getMonth() + 1, 1);
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
      const l = a(c.start), u = a(c.end), d = [], h = new Me(l.getFullYear(), 0, 1, 12, 0, 0, e);
      for (; h.getFullYear() <= u.getFullYear(); )
        d.push(new Me(h, e)), h.setFullYear(h.getFullYear() + 1, 0, 1);
      return d;
    },
    getWeek: (c, l) => {
      var d;
      const u = s(c);
      return Co(u, {
        weekStartsOn: (l == null ? void 0 : l.weekStartsOn) ?? o,
        firstWeekContainsDate: (l == null ? void 0 : l.firstWeekContainsDate) ?? ((d = r == null ? void 0 : r.options) == null ? void 0 : d.firstWeekContainsDate) ?? 1
      });
    },
    getISOWeek: (c) => {
      const l = s(c);
      return xo(l);
    },
    differenceInCalendarDays: (c, l) => {
      const u = s(c), d = s(l);
      return wo(u, d);
    },
    differenceInCalendarMonths: (c, l) => {
      const u = s(c), d = s(l);
      return qs(u, d);
    }
  };
}
const Dn = (e) => e instanceof HTMLElement ? e : null, Lr = (e) => [
  ...e.querySelectorAll("[data-animated-month]") ?? []
], Fp = (e) => Dn(e.querySelector("[data-animated-month]")), Br = (e) => Dn(e.querySelector("[data-animated-caption]")), Hr = (e) => Dn(e.querySelector("[data-animated-weeks]")), Yp = (e) => Dn(e.querySelector("[data-animated-nav]")), Lp = (e) => Dn(e.querySelector("[data-animated-weekdays]"));
function Bp(e, t, { classNames: n, months: r, focused: o, dateLib: a }) {
  const s = Ct(null), i = Ct(r), c = Ct(!1);
  Wa(() => {
    const l = i.current;
    if (i.current = r, !t || !e.current || // safety check because the ref can be set to anything by consumers
    !(e.current instanceof HTMLElement) || // validation required for the animation to work as expected
    r.length === 0 || l.length === 0 || r.length !== l.length)
      return;
    const u = a.isSameMonth(r[0].date, l[0].date), d = a.isAfter(r[0].date, l[0].date), h = d ? n[Te.caption_after_enter] : n[Te.caption_before_enter], m = d ? n[Te.weeks_after_enter] : n[Te.weeks_before_enter], v = s.current, g = e.current.cloneNode(!0);
    if (g instanceof HTMLElement ? (Lr(g).forEach((C) => {
      if (!(C instanceof HTMLElement))
        return;
      const M = Fp(C);
      M && C.contains(M) && C.removeChild(M);
      const N = Br(C);
      N && N.classList.remove(h);
      const k = Hr(C);
      k && k.classList.remove(m);
    }), s.current = g) : s.current = null, c.current || u || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    o)
      return;
    const y = v instanceof HTMLElement ? Lr(v) : [], b = Lr(e.current);
    if (b != null && b.every((x) => x instanceof HTMLElement) && y && y.every((x) => x instanceof HTMLElement)) {
      c.current = !0, e.current.style.isolation = "isolate";
      const x = Yp(e.current);
      x && (x.style.zIndex = "1"), b.forEach((C, M) => {
        const N = y[M];
        if (!N)
          return;
        C.style.position = "relative", C.style.overflow = "hidden";
        const k = Br(C);
        k && k.classList.add(h);
        const O = Hr(C);
        O && O.classList.add(m);
        const T = () => {
          c.current = !1, e.current && (e.current.style.isolation = ""), x && (x.style.zIndex = ""), k && k.classList.remove(h), O && O.classList.remove(m), C.style.position = "", C.style.overflow = "", C.contains(N) && C.removeChild(N);
        };
        N.style.pointerEvents = "none", N.style.position = "absolute", N.style.overflow = "hidden", N.setAttribute("aria-hidden", "true");
        const Y = Lp(N);
        Y && (Y.style.opacity = "0");
        const _ = Br(N);
        _ && (_.classList.add(d ? n[Te.caption_before_exit] : n[Te.caption_after_exit]), _.addEventListener("animationend", T));
        const $ = Hr(N);
        $ && $.classList.add(d ? n[Te.weeks_before_exit] : n[Te.weeks_after_exit]), C.insertBefore(N, C.firstChild);
      });
    }
  });
}
function Hp(e, t, n, r) {
  const o = e[0], a = e[e.length - 1], { ISOWeek: s, fixedWeeks: i, broadcastCalendar: c } = n ?? {}, { addDays: l, differenceInCalendarDays: u, differenceInCalendarMonths: d, endOfBroadcastWeek: h, endOfISOWeek: m, endOfMonth: v, endOfWeek: g, isAfter: y, startOfBroadcastWeek: b, startOfISOWeek: x, startOfWeek: C } = r, M = c ? b(o, r) : s ? x(o) : C(o), N = c ? h(a) : s ? m(v(a)) : g(v(a)), k = t && (c ? h(t) : s ? m(t) : g(t)), O = k && y(N, k) ? k : N, T = u(O, M), Y = d(a, o) + 1, _ = [];
  for (let B = 0; B <= T; B++) {
    const S = l(M, B);
    _.push(S);
  }
  const P = (c ? 35 : 42) * Y;
  if (i && _.length < P) {
    const B = P - _.length;
    for (let S = 0; S < B; S++) {
      const A = l(_[_.length - 1], 1);
      _.push(A);
    }
  }
  return _;
}
function zp(e) {
  const t = [];
  return e.reduce((n, r) => {
    const o = r.weeks.reduce((a, s) => a.concat(s.days.slice()), t.slice());
    return n.concat(o.slice());
  }, t.slice());
}
function Vp(e, t, n, r) {
  const { numberOfMonths: o = 1 } = n, a = [];
  for (let s = 0; s < o; s++) {
    const i = r.addMonths(e, s);
    if (t && i > t)
      break;
    a.push(i);
  }
  return a;
}
function Ea(e, t, n, r) {
  const { month: o, defaultMonth: a, today: s = r.today(), numberOfMonths: i = 1 } = e;
  let c = o || a || s;
  const { differenceInCalendarMonths: l, addMonths: u, startOfMonth: d } = r;
  if (n && l(n, c) < i - 1) {
    const h = -1 * (i - 1);
    c = u(n, h);
  }
  return t && l(c, t) < 0 && (c = t), d(c);
}
function jp(e, t, n, r) {
  const { addDays: o, endOfBroadcastWeek: a, endOfISOWeek: s, endOfMonth: i, endOfWeek: c, getISOWeek: l, getWeek: u, startOfBroadcastWeek: d, startOfISOWeek: h, startOfWeek: m } = r, v = e.reduce((g, y) => {
    const b = n.broadcastCalendar ? d(y, r) : n.ISOWeek ? h(y) : m(y), x = n.broadcastCalendar ? a(y) : n.ISOWeek ? s(i(y)) : c(i(y)), C = t.filter((O) => O >= b && O <= x), M = n.broadcastCalendar ? 35 : 42;
    if (n.fixedWeeks && C.length < M) {
      const O = t.filter((T) => {
        const Y = M - C.length;
        return T > x && T <= o(x, Y);
      });
      C.push(...O);
    }
    const N = C.reduce((O, T) => {
      const Y = n.ISOWeek ? l(T) : u(T), _ = O.find((P) => P.weekNumber === Y), $ = new ri(T, y, r);
      return _ ? _.days.push($) : O.push(new Lm(Y, [$])), O;
    }, []), k = new Ym(y, N);
    return g.push(k), g;
  }, []);
  return n.reverseMonths ? v.reverse() : v;
}
function Gp(e, t) {
  let { startMonth: n, endMonth: r } = e;
  const { startOfYear: o, startOfDay: a, startOfMonth: s, endOfMonth: i, addYears: c, endOfYear: l, newDate: u, today: d } = t, { fromYear: h, toYear: m, fromMonth: v, toMonth: g } = e;
  !n && v && (n = v), !n && h && (n = t.newDate(h, 0, 1)), !r && g && (r = g), !r && m && (r = u(m, 11, 31));
  const y = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
  return n ? n = s(n) : h ? n = u(h, 0, 1) : !n && y && (n = o(c(e.today ?? d(), -100))), r ? r = i(r) : m ? r = u(m, 11, 31) : !r && y && (r = l(e.today ?? d())), [
    n && a(n),
    r && a(r)
  ];
}
function Up(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: a = 1 } = n, { startOfMonth: s, addMonths: i, differenceInCalendarMonths: c } = r, l = o ? a : 1, u = s(e);
  if (!t)
    return i(u, l);
  if (!(c(t, e) < a))
    return i(u, l);
}
function qp(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: a } = n, { startOfMonth: s, addMonths: i, differenceInCalendarMonths: c } = r, l = o ? a ?? 1 : 1, u = s(e);
  if (!t)
    return i(u, -l);
  if (!(c(u, t) <= 0))
    return i(u, -l);
}
function Xp(e) {
  const t = [];
  return e.reduce((n, r) => n.concat(r.weeks.slice()), t.slice());
}
function mr(e, t) {
  const [n, r] = be(e);
  return [t === void 0 ? n : t, r];
}
function Kp(e, t) {
  var M;
  const [n, r] = Gp(e, t), { startOfMonth: o, endOfMonth: a } = t, s = Ea(e, n, r, t), [i, c] = mr(
    s,
    // initialMonth is always computed from props.month if provided
    e.month ? s : void 0
  );
  At(() => {
    const N = Ea(e, n, r, t);
    c(N);
  }, [e.timeZone]);
  const { months: l, weeks: u, days: d, previousMonth: h, nextMonth: m } = Pe(() => {
    const N = Vp(i, r, { numberOfMonths: e.numberOfMonths }, t), k = Hp(N, e.endMonth ? a(e.endMonth) : void 0, {
      ISOWeek: e.ISOWeek,
      fixedWeeks: e.fixedWeeks,
      broadcastCalendar: e.broadcastCalendar
    }, t), O = jp(N, k, {
      broadcastCalendar: e.broadcastCalendar,
      fixedWeeks: e.fixedWeeks,
      ISOWeek: e.ISOWeek,
      reverseMonths: e.reverseMonths
    }, t), T = Xp(O), Y = zp(O), _ = qp(i, n, e, t), $ = Up(i, r, e, t);
    return {
      months: O,
      weeks: T,
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
  ]), { disableNavigation: v, onMonthChange: g } = e, y = (N) => u.some((k) => k.days.some((O) => O.isEqualTo(N))), b = (N) => {
    if (v)
      return;
    let k = o(N);
    n && k < o(n) && (k = o(n)), r && k > o(r) && (k = o(r)), c(k), g == null || g(k);
  };
  return {
    months: l,
    weeks: u,
    days: d,
    navStart: n,
    navEnd: r,
    previousMonth: h,
    nextMonth: m,
    goToMonth: b,
    goToDay: (N) => {
      y(N) || b(N.date);
    }
  };
}
var Xe;
(function(e) {
  e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(Xe || (Xe = {}));
function Ra(e) {
  return !e[ue.disabled] && !e[ue.hidden] && !e[ue.outside];
}
function Zp(e, t, n, r) {
  let o, a = -1;
  for (const s of e) {
    const i = t(s);
    Ra(i) && (i[ue.focused] && a < Xe.FocusedModifier ? (o = s, a = Xe.FocusedModifier) : r != null && r.isEqualTo(s) && a < Xe.LastFocused ? (o = s, a = Xe.LastFocused) : n(s.date) && a < Xe.Selected ? (o = s, a = Xe.Selected) : i[ue.today] && a < Xe.Today && (o = s, a = Xe.Today));
  }
  return o || (o = e.find((s) => Ra(t(s)))), o;
}
function Qp(e, t, n, r, o, a, s) {
  const { ISOWeek: i, broadcastCalendar: c } = a, { addDays: l, addMonths: u, addWeeks: d, addYears: h, endOfBroadcastWeek: m, endOfISOWeek: v, endOfWeek: g, max: y, min: b, startOfBroadcastWeek: x, startOfISOWeek: C, startOfWeek: M } = s;
  let k = {
    day: l,
    week: d,
    month: u,
    year: h,
    startOfWeek: (O) => c ? x(O, s) : i ? C(O) : M(O),
    endOfWeek: (O) => c ? m(O) : i ? v(O) : g(O)
  }[e](n, t === "after" ? 1 : -1);
  return t === "before" && r ? k = y([r, k]) : t === "after" && o && (k = b([o, k])), k;
}
function yi(e, t, n, r, o, a, s, i = 0) {
  if (i > 365)
    return;
  const c = Qp(e, t, n.date, r, o, a, s), l = !!(a.disabled && dt(c, a.disabled, s)), u = !!(a.hidden && dt(c, a.hidden, s)), d = c, h = new ri(c, d, s);
  return !l && !u ? h : yi(e, t, h, r, o, a, s, i + 1);
}
function Jp(e, t, n, r, o) {
  const { autoFocus: a } = e, [s, i] = be(), c = Zp(t.days, n, r || (() => !1), s), [l, u] = be(a ? c : void 0);
  return {
    isFocusTarget: (g) => !!(c != null && c.isEqualTo(g)),
    setFocused: u,
    focused: l,
    blur: () => {
      i(l), u(void 0);
    },
    moveFocus: (g, y) => {
      if (!l)
        return;
      const b = yi(g, y, l, t.navStart, t.navEnd, e, o);
      b && (e.disableNavigation && !t.days.some((C) => C.isEqualTo(b)) || (t.goToDay(b), u(b)));
    }
  };
}
function eg(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [a, s] = mr(n, o ? n : void 0), i = o ? n : a, { isSameDay: c } = t, l = (m) => (i == null ? void 0 : i.some((v) => c(v, m))) ?? !1, { min: u, max: d } = e;
  return {
    selected: i,
    select: (m, v, g) => {
      let y = [...i ?? []];
      if (l(m)) {
        if ((i == null ? void 0 : i.length) === u || r && (i == null ? void 0 : i.length) === 1)
          return;
        y = i == null ? void 0 : i.filter((b) => !c(b, m));
      } else
        (i == null ? void 0 : i.length) === d ? y = [m] : y = [...y, m];
      return o || s(y), o == null || o(y, m, v, g), y;
    },
    isSelected: l
  };
}
function tg(e, t, n = 0, r = 0, o = !1, a = at) {
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
    const h = a.differenceInCalendarDays(d.to, d.from);
    r > 0 && h > r ? d = { from: e, to: void 0 } : n > 1 && h < n && (d = { from: e, to: void 0 });
  }
  return d;
}
function ng(e, t, n = at) {
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
function Pa(e, t, n = at) {
  return lt(e, t.from, !1, n) || lt(e, t.to, !1, n) || lt(t, e.from, !1, n) || lt(t, e.to, !1, n);
}
function rg(e, t, n = at) {
  const r = Array.isArray(t) ? t : [t];
  if (r.filter((i) => typeof i != "function").some((i) => typeof i == "boolean" ? i : n.isDate(i) ? lt(e, i, !1, n) : si(i, n) ? i.some((c) => lt(e, c, !1, n)) : hr(i) ? i.from && i.to ? Pa(e, { from: i.from, to: i.to }, n) : !1 : ai(i) ? ng(e, i.dayOfWeek, n) : ko(i) ? n.isAfter(i.before, i.after) ? Pa(e, {
    from: n.addDays(i.after, 1),
    to: n.addDays(i.before, -1)
  }, n) : dt(e.from, i, n) || dt(e.to, i, n) : Mo(i) || No(i) ? dt(e.from, i, n) || dt(e.to, i, n) : !1))
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
function og(e, t) {
  const { disabled: n, excludeDisabled: r, selected: o, required: a, onSelect: s } = e, [i, c] = mr(o, s ? o : void 0), l = s ? o : i;
  return {
    selected: l,
    select: (h, m, v) => {
      const { min: g, max: y } = e, b = h ? tg(h, l, g, y, a, t) : void 0;
      return r && n && (b != null && b.from) && b.to && rg({ from: b.from, to: b.to }, n, t) && (b.from = h, b.to = void 0), s || c(b), s == null || s(b, h, m, v), b;
    },
    isSelected: (h) => l && lt(l, h, !1, t)
  };
}
function ag(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [a, s] = mr(n, o ? n : void 0), i = o ? n : a, { isSameDay: c } = t;
  return {
    selected: i,
    select: (d, h, m) => {
      let v = d;
      return !r && i && i && c(d, i) && (v = void 0), o || s(v), o == null || o(v, d, h, m), v;
    },
    isSelected: (d) => i ? c(i, d) : !1
  };
}
function sg(e, t) {
  const n = ag(e, t), r = eg(e, t), o = og(e, t);
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
function Ie(e, t) {
  return e instanceof Me && e.timeZone === t ? e : new Me(e, t);
}
function Gt(e, t, n) {
  return Ie(e, t);
}
function Ta(e, t, n) {
  return typeof e == "boolean" || typeof e == "function" ? e : e instanceof Date ? Gt(e, t) : Array.isArray(e) ? e.map((r) => r instanceof Date ? Gt(r, t) : r) : hr(e) ? {
    ...e,
    from: e.from ? Ie(e.from, t) : e.from,
    to: e.to ? Ie(e.to, t) : e.to
  } : ko(e) ? {
    before: Gt(e.before, t),
    after: Gt(e.after, t)
  } : Mo(e) ? {
    after: Gt(e.after, t)
  } : No(e) ? {
    before: Gt(e.before, t)
  } : e;
}
function zr(e, t, n) {
  return e && (Array.isArray(e) ? e.map((r) => Ta(r, t)) : Ta(e, t));
}
function vi(e) {
  var $e;
  let t = e;
  const n = t.timeZone;
  if (n && (t = {
    ...e,
    timeZone: n
  }, t.today && (t.today = Ie(t.today, n)), t.month && (t.month = Ie(t.month, n)), t.defaultMonth && (t.defaultMonth = Ie(t.defaultMonth, n)), t.startMonth && (t.startMonth = Ie(t.startMonth, n)), t.endMonth && (t.endMonth = Ie(t.endMonth, n)), t.mode === "single" && t.selected ? t.selected = Ie(t.selected, n) : t.mode === "multiple" && t.selected ? t.selected = ($e = t.selected) == null ? void 0 : $e.map((X) => Ie(X, n)) : t.mode === "range" && t.selected && (t.selected = {
    from: t.selected.from ? Ie(t.selected.from, n) : t.selected.from,
    to: t.selected.to ? Ie(t.selected.to, n) : t.selected.to
  }), t.disabled !== void 0 && (t.disabled = zr(t.disabled, n)), t.hidden !== void 0 && (t.hidden = zr(t.hidden, n)), t.modifiers)) {
    const X = {};
    Object.keys(t.modifiers).forEach((re) => {
      var U;
      X[re] = zr((U = t.modifiers) == null ? void 0 : U[re], n);
    }), t.modifiers = X;
  }
  const { components: r, formatters: o, labels: a, dateLib: s, locale: i, classNames: c } = Pe(() => {
    const X = { ...ni, ...t.locale }, re = t.broadcastCalendar ? 1 : t.weekStartsOn, U = t.noonSafe && t.timeZone ? $p(t.timeZone, {
      weekStartsOn: re,
      locale: X
    }) : void 0, J = t.dateLib && U ? { ...U, ...t.dateLib } : t.dateLib ?? U, j = new xe({
      locale: X,
      weekStartsOn: re,
      firstWeekContainsDate: t.firstWeekContainsDate,
      useAdditionalWeekYearTokens: t.useAdditionalWeekYearTokens,
      useAdditionalDayOfYearTokens: t.useAdditionalDayOfYearTokens,
      timeZone: t.timeZone,
      numerals: t.numerals
    }, J);
    return {
      dateLib: j,
      components: gp(t.components),
      formatters: Dp(t.formatters),
      labels: Tp(t.labels, j.options),
      locale: X,
      classNames: { ...yp(), ...t.classNames }
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
  const { captionLayout: l, mode: u, navLayout: d, numberOfMonths: h = 1, onDayBlur: m, onDayClick: v, onDayFocus: g, onDayKeyDown: y, onDayMouseEnter: b, onDayMouseLeave: x, onNextClick: C, onPrevClick: M, showWeekNumber: N, styles: k } = t, { formatCaption: O, formatDay: T, formatMonthDropdown: Y, formatWeekNumber: _, formatWeekNumberHeader: $, formatWeekdayName: P, formatYearDropdown: B } = o, S = Kp(t, s), { days: A, months: D, navStart: W, navEnd: R, previousMonth: F, nextMonth: L, goToMonth: z } = S, ne = mp(A, t, W, R, s), { isSelected: H, select: q, selected: K } = sg(t, s) ?? {}, { blur: de, focused: fe, isFocusTarget: Q, moveFocus: me, setFocused: ie } = Jp(t, S, ne, H ?? (() => !1), s), { labelDayButton: ye, labelGridcell: we, labelGrid: Oe, labelMonthDropdown: pt, labelNav: $t, labelPrevious: Ft, labelNext: st, labelWeekday: Yt, labelWeekNumber: Ce, labelWeekNumberHeader: Mr, labelYearDropdown: Nr } = a, Ne = Pe(() => Ip(s, t.ISOWeek, t.broadcastCalendar, t.today), [s, t.ISOWeek, t.broadcastCalendar, t.today]), it = u !== void 0 || v !== void 0, cn = Ee(() => {
    F && (z(F), M == null || M(F));
  }, [F, z, M]), ln = Ee(() => {
    L && (z(L), C == null || C(L));
  }, [z, L, C]), Lt = Ee((X, re) => (U) => {
    U.preventDefault(), U.stopPropagation(), ie(X), !re.disabled && (q == null || q(X.date, re, U), v == null || v(X.date, re, U));
  }, [q, v, ie]), Sr = Ee((X, re) => (U) => {
    ie(X), g == null || g(X.date, re, U);
  }, [g, ie]), Rn = Ee((X, re) => (U) => {
    de(), m == null || m(X.date, re, U);
  }, [de, m]), dn = Ee((X, re) => (U) => {
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
      const [j, G] = J[U.key];
      me(j, G);
    }
    y == null || y(X.date, re, U);
  }, [me, y, t.dir]), gt = Ee((X, re) => (U) => {
    b == null || b(X.date, re, U);
  }, [b]), Pn = Ee((X, re) => (U) => {
    x == null || x(X.date, re, U);
  }, [x]), bt = Ee((X) => (re) => {
    const U = Number(re.target.value), J = s.setMonth(s.startOfMonth(X), U);
    z(J);
  }, [s, z]), Dr = Ee((X) => (re) => {
    const U = Number(re.target.value), J = s.setYear(s.startOfMonth(X), U);
    z(J);
  }, [s, z]), { className: Or, style: Tn } = Pe(() => ({
    className: [c[V.Root], t.className].filter(Boolean).join(" "),
    style: { ...k == null ? void 0 : k[V.Root], ...t.style }
  }), [c, t.className, t.style, k]), An = bp(t), _n = Ct(null);
  Bp(_n, !!t.animate, {
    classNames: c,
    months: D,
    focused: fe,
    dateLib: s
  });
  const un = {
    dayPickerProps: t,
    selected: K,
    select: q,
    isSelected: H,
    months: D,
    nextMonth: L,
    previousMonth: F,
    goToMonth: z,
    getModifiers: ne,
    components: r,
    classNames: c,
    styles: k,
    labels: a,
    formatters: o
  };
  return w.createElement(
    oi.Provider,
    { value: un },
    w.createElement(
      r.Root,
      { rootRef: t.animate ? _n : void 0, className: Or, style: Tn, dir: t.dir, id: t.id, lang: t.lang, nonce: t.nonce, title: t.title, role: t.role, "aria-label": t["aria-label"], "aria-labelledby": t["aria-labelledby"], ...An },
      w.createElement(
        r.Months,
        { className: c[V.Months], style: k == null ? void 0 : k[V.Months] },
        !t.hideNavigation && !d && w.createElement(r.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: c[V.Nav], style: k == null ? void 0 : k[V.Nav], "aria-label": $t(), onPreviousClick: cn, onNextClick: ln, previousMonth: F, nextMonth: L }),
        D.map((X, re) => w.createElement(
          r.Month,
          {
            "data-animated-month": t.animate ? "true" : void 0,
            className: c[V.Month],
            style: k == null ? void 0 : k[V.Month],
            // biome-ignore lint/suspicious/noArrayIndexKey: breaks animation
            key: re,
            displayIndex: re,
            calendarMonth: X
          },
          d === "around" && !t.hideNavigation && re === 0 && w.createElement(
            r.PreviousMonthButton,
            { type: "button", className: c[V.PreviousMonthButton], tabIndex: F ? void 0 : -1, "aria-disabled": F ? void 0 : !0, "aria-label": Ft(F), onClick: cn, "data-animated-button": t.animate ? "true" : void 0 },
            w.createElement(r.Chevron, { disabled: F ? void 0 : !0, className: c[V.Chevron], orientation: t.dir === "rtl" ? "right" : "left" })
          ),
          w.createElement(r.MonthCaption, { "data-animated-caption": t.animate ? "true" : void 0, className: c[V.MonthCaption], style: k == null ? void 0 : k[V.MonthCaption], calendarMonth: X, displayIndex: re }, l != null && l.startsWith("dropdown") ? w.createElement(
            r.DropdownNav,
            { className: c[V.Dropdowns], style: k == null ? void 0 : k[V.Dropdowns] },
            (() => {
              const U = l === "dropdown" || l === "dropdown-months" ? w.createElement(r.MonthsDropdown, { key: "month", className: c[V.MonthsDropdown], "aria-label": pt(), classNames: c, components: r, disabled: !!t.disableNavigation, onChange: bt(X.date), options: Ap(X.date, W, R, o, s), style: k == null ? void 0 : k[V.Dropdown], value: s.getMonth(X.date) }) : w.createElement("span", { key: "month" }, Y(X.date, s)), J = l === "dropdown" || l === "dropdown-years" ? w.createElement(r.YearsDropdown, { key: "year", className: c[V.YearsDropdown], "aria-label": Nr(s.options), classNames: c, components: r, disabled: !!t.disableNavigation, onChange: Dr(X.date), options: Wp(W, R, o, s, !!t.reverseYears), style: k == null ? void 0 : k[V.Dropdown], value: s.getYear(X.date) }) : w.createElement("span", { key: "year" }, B(X.date, s));
              return s.getMonthYearOrder() === "year-first" ? [J, U] : [U, J];
            })(),
            w.createElement("span", { role: "status", "aria-live": "polite", style: {
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
          ) : w.createElement(r.CaptionLabel, { className: c[V.CaptionLabel], role: "status", "aria-live": "polite" }, O(X.date, s.options, s))),
          d === "around" && !t.hideNavigation && re === h - 1 && w.createElement(
            r.NextMonthButton,
            { type: "button", className: c[V.NextMonthButton], tabIndex: L ? void 0 : -1, "aria-disabled": L ? void 0 : !0, "aria-label": st(L), onClick: ln, "data-animated-button": t.animate ? "true" : void 0 },
            w.createElement(r.Chevron, { disabled: L ? void 0 : !0, className: c[V.Chevron], orientation: t.dir === "rtl" ? "left" : "right" })
          ),
          re === h - 1 && d === "after" && !t.hideNavigation && w.createElement(r.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: c[V.Nav], style: k == null ? void 0 : k[V.Nav], "aria-label": $t(), onPreviousClick: cn, onNextClick: ln, previousMonth: F, nextMonth: L }),
          w.createElement(
            r.MonthGrid,
            { role: "grid", "aria-multiselectable": u === "multiple" || u === "range", "aria-label": Oe(X.date, s.options, s) || void 0, className: c[V.MonthGrid], style: k == null ? void 0 : k[V.MonthGrid] },
            !t.hideWeekdays && w.createElement(
              r.Weekdays,
              { "data-animated-weekdays": t.animate ? "true" : void 0, className: c[V.Weekdays], style: k == null ? void 0 : k[V.Weekdays] },
              N && w.createElement(r.WeekNumberHeader, { "aria-label": Mr(s.options), className: c[V.WeekNumberHeader], style: k == null ? void 0 : k[V.WeekNumberHeader], scope: "col" }, $()),
              Ne.map((U) => w.createElement(r.Weekday, { "aria-label": Yt(U, s.options, s), className: c[V.Weekday], key: String(U), style: k == null ? void 0 : k[V.Weekday], scope: "col" }, P(U, s.options, s)))
            ),
            w.createElement(r.Weeks, { "data-animated-weeks": t.animate ? "true" : void 0, className: c[V.Weeks], style: k == null ? void 0 : k[V.Weeks] }, X.weeks.map((U) => w.createElement(
              r.Week,
              { className: c[V.Week], key: U.weekNumber, style: k == null ? void 0 : k[V.Week], week: U },
              N && w.createElement(r.WeekNumber, { week: U, style: k == null ? void 0 : k[V.WeekNumber], "aria-label": Ce(U.weekNumber, {
                locale: i
              }), className: c[V.WeekNumber], scope: "row", role: "rowheader" }, _(U.weekNumber, s)),
              U.days.map((J) => {
                const { date: j } = J, G = ne(J);
                if (G[ue.focused] = !G.hidden && !!(fe != null && fe.isEqualTo(J)), G[Be.selected] = (H == null ? void 0 : H(j)) || G.selected, hr(K)) {
                  const { from: he, to: ke } = K;
                  G[Be.range_start] = !!(he && ke && s.isSameDay(j, he)), G[Be.range_end] = !!(he && ke && s.isSameDay(j, ke)), G[Be.range_middle] = lt(K, j, !0, s);
                }
                const ve = _p(G, k, t.modifiersStyles), Se = pp(G, c, t.modifiersClassNames), Bt = !it && !G.hidden ? we(j, G, s.options, s) : void 0;
                return w.createElement(r.Day, { key: `${J.isoDate}_${J.displayMonthId}`, day: J, modifiers: G, className: Se.join(" "), style: ve, role: "gridcell", "aria-selected": G.selected || void 0, "aria-label": Bt, "data-day": J.isoDate, "data-month": J.outside ? J.dateMonthId : void 0, "data-selected": G.selected || void 0, "data-disabled": G.disabled || void 0, "data-hidden": G.hidden || void 0, "data-outside": J.outside || void 0, "data-focused": G.focused || void 0, "data-today": G.today || void 0 }, !G.hidden && it ? w.createElement(r.DayButton, { className: c[V.DayButton], style: k == null ? void 0 : k[V.DayButton], type: "button", day: J, modifiers: G, disabled: !G.focused && G.disabled || void 0, "aria-disabled": G.focused && G.disabled || void 0, tabIndex: Q(J) ? 0 : -1, "aria-label": ye(j, G, s.options, s), onClick: Lt(J, G), onBlur: Rn(J, G), onFocus: Sr(J, G), onKeyDown: dn(J, G), onMouseEnter: gt(J, G), onMouseLeave: Pn(J, G) }, T(j, s.options, s)) : !G.hidden && T(J.date, s.options, s));
              })
            )))
          )
        ))
      ),
      t.footer && w.createElement(r.Footer, { className: c[V.Footer], style: k == null ? void 0 : k[V.Footer], role: "status", "aria-live": "polite" }, t.footer)
    )
  );
}
const wi = {
  ...Fm,
  labels: {
    labelDayButton: (e, t, n, r) => {
      let a = (r ?? new xe(n)).format(e, "PPPP");
      return t.today && (a = `오늘, ${a}`), t.selected && (a = `${a}, 선택됨`), a;
    },
    labelMonthDropdown: "월 선택",
    labelNext: "다음 달로 이동",
    labelPrevious: "이전 달로 이동",
    labelWeekNumber: (e) => `주 ${e}`,
    labelYearDropdown: "연도 선택",
    labelGrid: (e, t, n) => (n ?? new xe(t)).formatMonthYear(e),
    labelGridcell: (e, t, n, r) => {
      let a = (r ?? new xe(n)).format(e, "PPPP");
      return t != null && t.today && (a = `오늘, ${a}`), a;
    },
    labelNav: "탐색 모음",
    labelWeekNumberHeader: "주 번호",
    labelWeekday: (e, t, n) => (n ?? new xe(t)).format(e, "cccc")
  }
};
var ig = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function cg(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var xi = { exports: {} };
(function(e, t) {
  (function(n, r) {
    e.exports = r();
  })(ig, function() {
    var n = 1e3, r = 6e4, o = 36e5, a = "millisecond", s = "second", i = "minute", c = "hour", l = "day", u = "week", d = "month", h = "quarter", m = "year", v = "date", g = "Invalid Date", y = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, b = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, x = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(S) {
      var A = ["th", "st", "nd", "rd"], D = S % 100;
      return "[" + S + (A[(D - 20) % 10] || A[D] || A[0]) + "]";
    } }, C = function(S, A, D) {
      var W = String(S);
      return !W || W.length >= A ? S : "" + Array(A + 1 - W.length).join(D) + S;
    }, M = { s: C, z: function(S) {
      var A = -S.utcOffset(), D = Math.abs(A), W = Math.floor(D / 60), R = D % 60;
      return (A <= 0 ? "+" : "-") + C(W, 2, "0") + ":" + C(R, 2, "0");
    }, m: function S(A, D) {
      if (A.date() < D.date()) return -S(D, A);
      var W = 12 * (D.year() - A.year()) + (D.month() - A.month()), R = A.clone().add(W, d), F = D - R < 0, L = A.clone().add(W + (F ? -1 : 1), d);
      return +(-(W + (D - R) / (F ? R - L : L - R)) || 0);
    }, a: function(S) {
      return S < 0 ? Math.ceil(S) || 0 : Math.floor(S);
    }, p: function(S) {
      return { M: d, y: m, w: u, d: l, D: v, h: c, m: i, s, ms: a, Q: h }[S] || String(S || "").toLowerCase().replace(/s$/, "");
    }, u: function(S) {
      return S === void 0;
    } }, N = "en", k = {};
    k[N] = x;
    var O = "$isDayjsObject", T = function(S) {
      return S instanceof P || !(!S || !S[O]);
    }, Y = function S(A, D, W) {
      var R;
      if (!A) return N;
      if (typeof A == "string") {
        var F = A.toLowerCase();
        k[F] && (R = F), D && (k[F] = D, R = F);
        var L = A.split("-");
        if (!R && L.length > 1) return S(L[0]);
      } else {
        var z = A.name;
        k[z] = A, R = z;
      }
      return !W && R && (N = R), R || !W && N;
    }, _ = function(S, A) {
      if (T(S)) return S.clone();
      var D = typeof A == "object" ? A : {};
      return D.date = S, D.args = arguments, new P(D);
    }, $ = M;
    $.l = Y, $.i = T, $.w = function(S, A) {
      return _(S, { locale: A.$L, utc: A.$u, x: A.$x, $offset: A.$offset });
    };
    var P = function() {
      function S(D) {
        this.$L = Y(D.locale, null, !0), this.parse(D), this.$x = this.$x || D.x || {}, this[O] = !0;
      }
      var A = S.prototype;
      return A.parse = function(D) {
        this.$d = function(W) {
          var R = W.date, F = W.utc;
          if (R === null) return /* @__PURE__ */ new Date(NaN);
          if ($.u(R)) return /* @__PURE__ */ new Date();
          if (R instanceof Date) return new Date(R);
          if (typeof R == "string" && !/Z$/i.test(R)) {
            var L = R.match(y);
            if (L) {
              var z = L[2] - 1 || 0, ne = (L[7] || "0").substring(0, 3);
              return F ? new Date(Date.UTC(L[1], z, L[3] || 1, L[4] || 0, L[5] || 0, L[6] || 0, ne)) : new Date(L[1], z, L[3] || 1, L[4] || 0, L[5] || 0, L[6] || 0, ne);
            }
          }
          return new Date(R);
        }(D), this.init();
      }, A.init = function() {
        var D = this.$d;
        this.$y = D.getFullYear(), this.$M = D.getMonth(), this.$D = D.getDate(), this.$W = D.getDay(), this.$H = D.getHours(), this.$m = D.getMinutes(), this.$s = D.getSeconds(), this.$ms = D.getMilliseconds();
      }, A.$utils = function() {
        return $;
      }, A.isValid = function() {
        return this.$d.toString() !== g;
      }, A.isSame = function(D, W) {
        var R = _(D);
        return this.startOf(W) <= R && R <= this.endOf(W);
      }, A.isAfter = function(D, W) {
        return _(D) < this.startOf(W);
      }, A.isBefore = function(D, W) {
        return this.endOf(W) < _(D);
      }, A.$g = function(D, W, R) {
        return $.u(D) ? this[W] : this.set(R, D);
      }, A.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, A.valueOf = function() {
        return this.$d.getTime();
      }, A.startOf = function(D, W) {
        var R = this, F = !!$.u(W) || W, L = $.p(D), z = function(me, ie) {
          var ye = $.w(R.$u ? Date.UTC(R.$y, ie, me) : new Date(R.$y, ie, me), R);
          return F ? ye : ye.endOf(l);
        }, ne = function(me, ie) {
          return $.w(R.toDate()[me].apply(R.toDate("s"), (F ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(ie)), R);
        }, H = this.$W, q = this.$M, K = this.$D, de = "set" + (this.$u ? "UTC" : "");
        switch (L) {
          case m:
            return F ? z(1, 0) : z(31, 11);
          case d:
            return F ? z(1, q) : z(0, q + 1);
          case u:
            var fe = this.$locale().weekStart || 0, Q = (H < fe ? H + 7 : H) - fe;
            return z(F ? K - Q : K + (6 - Q), q);
          case l:
          case v:
            return ne(de + "Hours", 0);
          case c:
            return ne(de + "Minutes", 1);
          case i:
            return ne(de + "Seconds", 2);
          case s:
            return ne(de + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, A.endOf = function(D) {
        return this.startOf(D, !1);
      }, A.$set = function(D, W) {
        var R, F = $.p(D), L = "set" + (this.$u ? "UTC" : ""), z = (R = {}, R[l] = L + "Date", R[v] = L + "Date", R[d] = L + "Month", R[m] = L + "FullYear", R[c] = L + "Hours", R[i] = L + "Minutes", R[s] = L + "Seconds", R[a] = L + "Milliseconds", R)[F], ne = F === l ? this.$D + (W - this.$W) : W;
        if (F === d || F === m) {
          var H = this.clone().set(v, 1);
          H.$d[z](ne), H.init(), this.$d = H.set(v, Math.min(this.$D, H.daysInMonth())).$d;
        } else z && this.$d[z](ne);
        return this.init(), this;
      }, A.set = function(D, W) {
        return this.clone().$set(D, W);
      }, A.get = function(D) {
        return this[$.p(D)]();
      }, A.add = function(D, W) {
        var R, F = this;
        D = Number(D);
        var L = $.p(W), z = function(q) {
          var K = _(F);
          return $.w(K.date(K.date() + Math.round(q * D)), F);
        };
        if (L === d) return this.set(d, this.$M + D);
        if (L === m) return this.set(m, this.$y + D);
        if (L === l) return z(1);
        if (L === u) return z(7);
        var ne = (R = {}, R[i] = r, R[c] = o, R[s] = n, R)[L] || 1, H = this.$d.getTime() + D * ne;
        return $.w(H, this);
      }, A.subtract = function(D, W) {
        return this.add(-1 * D, W);
      }, A.format = function(D) {
        var W = this, R = this.$locale();
        if (!this.isValid()) return R.invalidDate || g;
        var F = D || "YYYY-MM-DDTHH:mm:ssZ", L = $.z(this), z = this.$H, ne = this.$m, H = this.$M, q = R.weekdays, K = R.months, de = R.meridiem, fe = function(ie, ye, we, Oe) {
          return ie && (ie[ye] || ie(W, F)) || we[ye].slice(0, Oe);
        }, Q = function(ie) {
          return $.s(z % 12 || 12, ie, "0");
        }, me = de || function(ie, ye, we) {
          var Oe = ie < 12 ? "AM" : "PM";
          return we ? Oe.toLowerCase() : Oe;
        };
        return F.replace(b, function(ie, ye) {
          return ye || function(we) {
            switch (we) {
              case "YY":
                return String(W.$y).slice(-2);
              case "YYYY":
                return $.s(W.$y, 4, "0");
              case "M":
                return H + 1;
              case "MM":
                return $.s(H + 1, 2, "0");
              case "MMM":
                return fe(R.monthsShort, H, K, 3);
              case "MMMM":
                return fe(K, H);
              case "D":
                return W.$D;
              case "DD":
                return $.s(W.$D, 2, "0");
              case "d":
                return String(W.$W);
              case "dd":
                return fe(R.weekdaysMin, W.$W, q, 2);
              case "ddd":
                return fe(R.weekdaysShort, W.$W, q, 3);
              case "dddd":
                return q[W.$W];
              case "H":
                return String(z);
              case "HH":
                return $.s(z, 2, "0");
              case "h":
                return Q(1);
              case "hh":
                return Q(2);
              case "a":
                return me(z, ne, !0);
              case "A":
                return me(z, ne, !1);
              case "m":
                return String(ne);
              case "mm":
                return $.s(ne, 2, "0");
              case "s":
                return String(W.$s);
              case "ss":
                return $.s(W.$s, 2, "0");
              case "SSS":
                return $.s(W.$ms, 3, "0");
              case "Z":
                return L;
            }
            return null;
          }(ie) || L.replace(":", "");
        });
      }, A.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, A.diff = function(D, W, R) {
        var F, L = this, z = $.p(W), ne = _(D), H = (ne.utcOffset() - this.utcOffset()) * r, q = this - ne, K = function() {
          return $.m(L, ne);
        };
        switch (z) {
          case m:
            F = K() / 12;
            break;
          case d:
            F = K();
            break;
          case h:
            F = K() / 3;
            break;
          case u:
            F = (q - H) / 6048e5;
            break;
          case l:
            F = (q - H) / 864e5;
            break;
          case c:
            F = q / o;
            break;
          case i:
            F = q / r;
            break;
          case s:
            F = q / n;
            break;
          default:
            F = q;
        }
        return R ? F : $.a(F);
      }, A.daysInMonth = function() {
        return this.endOf(d).$D;
      }, A.$locale = function() {
        return k[this.$L];
      }, A.locale = function(D, W) {
        if (!D) return this.$L;
        var R = this.clone(), F = Y(D, W, !0);
        return F && (R.$L = F), R;
      }, A.clone = function() {
        return $.w(this.$d, this);
      }, A.toDate = function() {
        return new Date(this.valueOf());
      }, A.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, A.toISOString = function() {
        return this.$d.toISOString();
      }, A.toString = function() {
        return this.$d.toUTCString();
      }, S;
    }(), B = P.prototype;
    return _.prototype = B, [["$ms", a], ["$s", s], ["$m", i], ["$H", c], ["$W", l], ["$M", d], ["$y", m], ["$D", v]].forEach(function(S) {
      B[S[1]] = function(A) {
        return this.$g(A, S[0], S[1]);
      };
    }), _.extend = function(S, A) {
      return S.$i || (S(A, P, _), S.$i = !0), _;
    }, _.locale = Y, _.isDayjs = T, _.unix = function(S) {
      return _(1e3 * S);
    }, _.en = k[N], _.Ls = k, _.p = {}, _;
  });
})(xi);
var lg = xi.exports;
const pe = /* @__PURE__ */ cg(lg), dg = w.forwardRef(
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
    const [h, m] = be(!1), [v, g] = be(
      e ? pe(e) : void 0
    );
    At(() => {
      g(e ? pe(e) : void 0);
    }, [e]);
    const y = Pe(() => v == null ? void 0 : v.toDate(), [v]), b = (k) => {
      if (!k) {
        g(void 0);
        return;
      }
      const O = pe(k);
      g(O);
    }, x = () => {
      v && (t == null || t(v.format("YYYY-MM-DD")), m(!1));
    }, C = () => {
      g(e ? pe(e) : void 0), m(!1);
    }, M = Pe(() => e ? pe(e).format("YYYY-MM-DD") : "", [e]), N = Pe(() => {
      const k = [];
      return o && k.push({ before: pe(o).toDate() }), a && k.push({ after: pe(a).toDate() }), k.length > 0 ? k : void 0;
    }, [o, a]);
    return /* @__PURE__ */ I("div", { ref: d, className: E("flex flex-col gap-1", u), children: [
      n && /* @__PURE__ */ f("label", { className: "text-sm font-medium text-gray-700", children: n }),
      /* @__PURE__ */ I(
        dr,
        {
          open: h && !s,
          onOpenChange: m,
          children: [
            /* @__PURE__ */ f(ur, { asChild: !0, children: /* @__PURE__ */ f("div", { className: "relative", children: /* @__PURE__ */ f(
              "input",
              {
                type: "text",
                readOnly: !0,
                value: M,
                placeholder: r,
                disabled: s,
                className: E(
                  "w-full h-10 px-3 border rounded bg-white text-sm",
                  "hover:bg-gray-50 hover:border-gray-400",
                  "focus:outline-none",
                  "transition-all duration-150",
                  "cursor-pointer",
                  i ? "border-red-500" : "border-gray-300",
                  s && E(
                    "bg-gray-100 cursor-not-allowed",
                    "hover:bg-gray-100 hover:border-gray-300"
                  )
                )
              }
            ) }) }),
            /* @__PURE__ */ f(fr, { children: /* @__PURE__ */ I(
              Mn,
              {
                align: "start",
                sideOffset: 5,
                className: E(
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
                  /* @__PURE__ */ f("div", { className: "date-picker-calendar", children: /* @__PURE__ */ f(
                    vi,
                    {
                      mode: "single",
                      selected: y,
                      onSelect: b,
                      locale: wi,
                      disabled: N,
                      formatters: {
                        formatCaption: (k) => `${k.getFullYear()}년 ${k.getMonth() + 1}월`
                      }
                    }
                  ) }),
                  /* @__PURE__ */ I(
                    "div",
                    {
                      className: E(
                        "flex items-end justify-between mt-2 pt-2",
                        "border-t border-gray-200"
                      ),
                      children: [
                        /* @__PURE__ */ f("div", { className: "flex flex-col min-h-8", children: v ? /* @__PURE__ */ f("span", { className: "text-xs text-gray-700", children: v.format("YYYY-MM-DD") }) : /* @__PURE__ */ f("span", { className: "text-xs text-red-500", children: "날짜를 선택해 주세요." }) }),
                        /* @__PURE__ */ I("div", { className: "flex gap-2", children: [
                          /* @__PURE__ */ f(
                            "button",
                            {
                              onClick: C,
                              className: E(
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
                          /* @__PURE__ */ f(
                            "button",
                            {
                              onClick: x,
                              disabled: !v,
                              className: E(
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
      (l || c) && /* @__PURE__ */ f("div", { children: i && c ? /* @__PURE__ */ f("p", { className: "text-xs text-red-500", children: c }) : l && /* @__PURE__ */ f("p", { className: "text-xs text-gray-500", children: l }) })
    ] });
  }
);
dg.displayName = "DatePicker";
const ug = () => {
  const e = pe();
  return [
    {
      label: "전체",
      getValue: () => [pe("1970-01-01"), pe("2099-12-31")]
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
}, fg = w.forwardRef(
  ({
    value: e,
    onChange: t,
    startLabel: n = "시작일자",
    endLabel: r = "종료일자",
    className: o
  }, a) => {
    const [s, i] = be(!1), [c, l] = be([
      e != null && e.start ? pe(e.start) : void 0,
      e != null && e.end ? pe(e.end) : void 0
    ]);
    At(() => {
      e && l([
        e.start ? pe(e.start) : void 0,
        e.end ? pe(e.end) : void 0
      ]);
    }, [e]);
    const [u, d] = c, h = Pe(() => {
      if (u)
        return {
          from: u.toDate(),
          to: d == null ? void 0 : d.toDate()
        };
    }, [u, d]), m = (C) => {
      const [M, N] = C.getValue();
      l([M, N]);
    }, v = (C) => {
      if (!C) {
        l([void 0, void 0]);
        return;
      }
      const M = C.from ? pe(C.from) : void 0, N = C.to ? pe(C.to) : void 0;
      l([M, N]);
    }, g = () => {
      u && d && (t == null || t({
        start: u.format("YYYY-MM-DD"),
        end: d.format("YYYY-MM-DD")
      }), i(!1));
    }, y = () => {
      l([
        e != null && e.start ? pe(e.start) : void 0,
        e != null && e.end ? pe(e.end) : void 0
      ]), i(!1);
    }, b = Pe(() => {
      if (!(!u || !d))
        return d.diff(u, "day") + 1;
    }, [u, d]), x = Pe(() => !(e != null && e.start) || !(e != null && e.end) ? { start: "", end: "" } : {
      start: pe(e.start).format("YYYY-MM-DD"),
      end: pe(e.end).format("YYYY-MM-DD")
    }, [e]);
    return /* @__PURE__ */ I(dr, { open: s, onOpenChange: i, children: [
      /* @__PURE__ */ f(ur, { asChild: !0, children: /* @__PURE__ */ I("div", { ref: a, className: E("flex items-center gap-0", o), children: [
        /* @__PURE__ */ I("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ f(
            "label",
            {
              className: E(
                "absolute left-3 top-1/2 -translate-y-1/2",
                "text-xs text-gray-500",
                "pointer-events-none"
              ),
              children: n
            }
          ),
          /* @__PURE__ */ f(
            "input",
            {
              type: "text",
              readOnly: !0,
              value: x.start,
              placeholder: "YYYY-MM-DD",
              className: E(
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
        /* @__PURE__ */ I("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ f(
            "label",
            {
              className: E(
                "absolute left-3 top-1/2 -translate-y-1/2",
                "text-xs text-gray-500",
                "pointer-events-none"
              ),
              children: r
            }
          ),
          /* @__PURE__ */ f(
            "input",
            {
              type: "text",
              readOnly: !0,
              value: x.end,
              placeholder: "YYYY-MM-DD",
              className: E(
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
      /* @__PURE__ */ f(fr, { children: /* @__PURE__ */ I(
        Mn,
        {
          align: "start",
          sideOffset: 5,
          className: E(
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
            /* @__PURE__ */ I("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ f("div", { className: "flex flex-col border-r border-gray-200 pr-2", children: ug().map((C) => /* @__PURE__ */ f(
                "button",
                {
                  onClick: () => m(C),
                  className: E(
                    "border-0 cursor-pointer",
                    "w-[70px] h-[26px] px-2",
                    "text-left text-xs text-gray-700",
                    "bg-white",
                    "transition-all duration-150",
                    "hover:bg-blue-50",
                    "hover:font-medium",
                    "hover:text-blue-600"
                  ),
                  children: C.label
                },
                C.label
              )) }),
              /* @__PURE__ */ f("div", { className: "date-range-picker-calendar", children: /* @__PURE__ */ f(
                vi,
                {
                  mode: "range",
                  selected: h,
                  onSelect: v,
                  numberOfMonths: 2,
                  locale: wi,
                  formatters: {
                    formatCaption: (C) => `${C.getFullYear()}년 ${C.getMonth() + 1}월`
                  }
                }
              ) })
            ] }),
            /* @__PURE__ */ I(
              "div",
              {
                className: E(
                  "flex items-end justify-between mt-2 pt-2",
                  "border-t border-gray-200"
                ),
                children: [
                  /* @__PURE__ */ f("div", { className: "flex flex-col min-h-8", children: !u || !d ? /* @__PURE__ */ f("span", { className: "text-xs text-red-500", children: "종료일자를 선택해 주세요." }) : /* @__PURE__ */ I(Tt, { children: [
                    /* @__PURE__ */ I("span", { className: "text-xs text-gray-700", children: [
                      u.format("YYYY-MM-DD"),
                      " ~",
                      " ",
                      d.format("YYYY-MM-DD")
                    ] }),
                    /* @__PURE__ */ I("span", { className: "text-xs text-gray-500", children: [
                      "(",
                      b,
                      "일간)"
                    ] })
                  ] }) }),
                  /* @__PURE__ */ I("div", { className: "flex gap-2", children: [
                    /* @__PURE__ */ f(
                      "button",
                      {
                        onClick: y,
                        className: E(
                          "w-15 h-8 cursor-pointer",
                          "border border-gray-300 rounded bg-transparent",
                          "text-xs font-medium text-gray-700",
                          "transition-all duration-150",
                          "hover:bg-gray-50 active:scale-95"
                        ),
                        children: "취소"
                      }
                    ),
                    /* @__PURE__ */ f(
                      "button",
                      {
                        onClick: g,
                        disabled: !u || !d,
                        className: E(
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
fg.displayName = "DateRangePicker";
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hg = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), mg = (e) => e.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (t, n, r) => r ? r.toUpperCase() : n.toLowerCase()
), Aa = (e) => {
  const t = mg(e);
  return t.charAt(0).toUpperCase() + t.slice(1);
}, Ci = (...e) => e.filter((t, n, r) => !!t && t.trim() !== "" && r.indexOf(t) === n).join(" ").trim(), pg = (e) => {
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
var gg = {
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
const bg = Dt(
  ({
    color: e = "currentColor",
    size: t = 24,
    strokeWidth: n = 2,
    absoluteStrokeWidth: r,
    className: o = "",
    children: a,
    iconNode: s,
    ...i
  }, c) => jr(
    "svg",
    {
      ref: c,
      ...gg,
      width: t,
      height: t,
      stroke: e,
      strokeWidth: r ? Number(n) * 24 / Number(t) : n,
      className: Ci("lucide", o),
      ...!a && !pg(i) && { "aria-hidden": "true" },
      ...i
    },
    [
      ...s.map(([l, u]) => jr(l, u)),
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
  const n = Dt(
    ({ className: r, ...o }, a) => jr(bg, {
      ref: a,
      iconNode: t,
      className: Ci(
        `lucide-${hg(Aa(e))}`,
        `lucide-${e}`,
        r
      ),
      ...o
    })
  );
  return n.displayName = Aa(e), n;
};
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yg = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], vg = je("check", yg);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wg = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], ki = je("chevron-down", wg);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xg = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], Cg = je("chevron-right", xg);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kg = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]], Mg = je("chevron-left", kg);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ng = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]], Sg = je("chevron-up", Ng);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Dg = [
  ["path", { d: "m7 15 5 5 5-5", key: "1hf1tw" }],
  ["path", { d: "m7 9 5-5 5 5", key: "sgt6xg" }]
], Og = je("chevrons-up-down", Dg);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Eg = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
], Mi = je("circle-check", Eg);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rg = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
], Pg = je("circle-x", Rg);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Tg = [
  ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
], Ag = je("clock", Tg);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _g = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
], Ni = je("triangle-alert", _g);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ig = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], Wg = je("x", Ig), $g = w.forwardRef(
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
  }, h) => {
    const [m, v] = be(!1), [g, y] = be(null), [b, x] = be(null), [C, M] = be("AM"), N = Ct(null), k = Ct(null);
    At(() => {
      if (!e) {
        y(null), x(null), M("AM");
        return;
      }
      const P = /^(\d{1,2}):(\d{2})$/, B = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i;
      if (o === "24h") {
        const S = e.match(P);
        S && (y(parseInt(S[1], 10)), x(parseInt(S[2], 10)));
      } else {
        const S = e.match(B);
        if (S) {
          let A = parseInt(S[1], 10);
          const D = S[3].toUpperCase();
          y(A), x(parseInt(S[2], 10)), M(D);
        }
      }
    }, [e, o]);
    const O = Pe(() => o === "24h" ? Array.from({ length: 24 }, (P, B) => B) : Array.from({ length: 12 }, (P, B) => B + 1), [o]), T = Pe(() => {
      const P = [];
      for (let B = 0; B < 60; B += u)
        P.push(B);
      return P;
    }, [u]), Y = Pe(() => {
      if (g === null || b === null) return "";
      const P = b.toString().padStart(2, "0");
      return o === "24h" ? `${g.toString().padStart(2, "0")}:${P}` : `${g}:${P} ${C}`;
    }, [g, b, C, o]), _ = () => {
      g !== null && b !== null && (t == null || t(Y), v(!1));
    }, $ = () => {
      if (e) {
        const P = /^(\d{1,2}):(\d{2})$/, B = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i;
        if (o === "24h") {
          const S = e.match(P);
          S && (y(parseInt(S[1], 10)), x(parseInt(S[2], 10)));
        } else {
          const S = e.match(B);
          S && (y(parseInt(S[1], 10)), x(parseInt(S[2], 10)), M(S[3].toUpperCase()));
        }
      } else
        y(null), x(null), M("AM");
      v(!1);
    };
    return At(() => {
      m && g !== null && setTimeout(() => {
        var B;
        const P = (B = N.current) == null ? void 0 : B.querySelector(
          `[data-value="${g}"]`
        );
        P == null || P.scrollIntoView({ block: "center" });
      }, 0), m && b !== null && setTimeout(() => {
        var B;
        const P = (B = k.current) == null ? void 0 : B.querySelector(
          `[data-value="${b}"]`
        );
        P == null || P.scrollIntoView({ block: "center" });
      }, 0);
    }, [m, g, b]), /* @__PURE__ */ I("div", { ref: h, className: E("flex flex-col gap-1", l), children: [
      n && /* @__PURE__ */ f("label", { className: "text-sm font-medium text-gray-700", children: n }),
      /* @__PURE__ */ I(
        dr,
        {
          open: m && !a,
          onOpenChange: v,
          children: [
            /* @__PURE__ */ f(ur, { asChild: !0, children: /* @__PURE__ */ I("div", { className: "relative", children: [
              /* @__PURE__ */ f(
                "input",
                {
                  type: "text",
                  readOnly: !0,
                  value: Y,
                  placeholder: r,
                  disabled: a,
                  className: E(
                    "w-full h-10 px-3 border rounded bg-white text-sm",
                    "hover:bg-gray-50 hover:border-gray-400",
                    "focus:outline-none",
                    "transition-all duration-150",
                    "cursor-pointer",
                    s ? "border-red-500" : "border-gray-300",
                    a && E(
                      "bg-gray-100 cursor-not-allowed",
                      "hover:bg-gray-100 hover:border-gray-300"
                    )
                  )
                }
              ),
              d && /* @__PURE__ */ f(
                Ag,
                {
                  className: E(
                    "absolute right-0 top-1/2 -translate-y-1/2",
                    "w-4 h-4 text-gray-400",
                    a && "opacity-50"
                  )
                }
              )
            ] }) }),
            /* @__PURE__ */ f(fr, { children: /* @__PURE__ */ I(
              Mn,
              {
                align: "start",
                sideOffset: 5,
                className: E(
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
                  /* @__PURE__ */ f("div", { className: "p-4", children: /* @__PURE__ */ I("div", { className: "flex gap-2", children: [
                    /* @__PURE__ */ I("div", { className: "flex flex-col", children: [
                      /* @__PURE__ */ f("div", { className: "text-xs text-gray-500 text-center mb-2 font-medium", children: o === "24h" ? "시" : "Hour" }),
                      /* @__PURE__ */ f(
                        "div",
                        {
                          ref: N,
                          className: "w-16 h-48 overflow-y-auto border border-gray-200 rounded cms-no-scrollbar",
                          children: O.map((P) => /* @__PURE__ */ f(
                            "button",
                            {
                              "data-value": P,
                              onClick: () => y(P),
                              className: E(
                                "border-0 cursor-pointer",
                                "w-full h-10 text-sm transition-colors",
                                "hover:bg-gray-100",
                                g === P ? "bg-blue-100 text-blue-700 font-medium" : "bg-white text-gray-700"
                              ),
                              "aria-label": `${P}${o === "24h" ? "시" : ""}`,
                              "aria-selected": g === P,
                              children: o === "24h" ? P.toString().padStart(2, "0") : P
                            },
                            P
                          ))
                        }
                      )
                    ] }),
                    /* @__PURE__ */ I("div", { className: "flex flex-col", children: [
                      /* @__PURE__ */ f("div", { className: "text-xs text-gray-500 text-center mb-2 font-medium", children: o === "24h" ? "분" : "Min" }),
                      /* @__PURE__ */ f(
                        "div",
                        {
                          ref: k,
                          className: "w-16 h-48 overflow-y-auto border border-gray-200 rounded cms-no-scrollbar",
                          children: T.map((P) => /* @__PURE__ */ f(
                            "button",
                            {
                              "data-value": P,
                              onClick: () => x(P),
                              className: E(
                                "border-0 cursor-pointer",
                                "w-full h-10 text-sm transition-colors",
                                "hover:bg-gray-100",
                                b === P ? "bg-blue-100 text-blue-700 font-medium" : "bg-white text-gray-700"
                              ),
                              "aria-label": `${P}${o === "24h" ? "분" : " minutes"}`,
                              "aria-selected": b === P,
                              children: P.toString().padStart(2, "0")
                            },
                            P
                          ))
                        }
                      )
                    ] }),
                    o === "12h" && /* @__PURE__ */ I("div", { className: "flex flex-col", children: [
                      /* @__PURE__ */ f("div", { className: "text-xs text-gray-500 text-center mb-2 font-medium", children: "Period" }),
                      /* @__PURE__ */ I("div", { className: "w-16 flex flex-col gap-1", children: [
                        /* @__PURE__ */ f(
                          "button",
                          {
                            onClick: () => M("AM"),
                            className: E(
                              "border-0 cursor-pointer",
                              "h-10 text-sm rounded transition-colors",
                              "hover:bg-gray-100",
                              C === "AM" ? "bg-blue-100 text-blue-700 font-medium" : "bg-white text-gray-700"
                            ),
                            "aria-label": "AM",
                            "aria-selected": C === "AM",
                            children: "AM"
                          }
                        ),
                        /* @__PURE__ */ f(
                          "button",
                          {
                            onClick: () => M("PM"),
                            className: E(
                              "border-0 cursor-pointer",
                              "h-10 text-sm rounded transition-colors",
                              "hover:bg-gray-100",
                              C === "PM" ? "bg-blue-100 text-blue-700 font-medium" : "bg-white text-gray-700"
                            ),
                            "aria-label": "PM",
                            "aria-selected": C === "PM",
                            children: "PM"
                          }
                        )
                      ] })
                    ] })
                  ] }) }),
                  /* @__PURE__ */ f(
                    "div",
                    {
                      className: E(
                        "flex items-end justify-end px-4 pb-4",
                        "border-t border-gray-200 pt-2"
                      ),
                      children: /* @__PURE__ */ I("div", { className: "flex gap-2", children: [
                        /* @__PURE__ */ f(
                          "button",
                          {
                            onClick: $,
                            className: E(
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
                        /* @__PURE__ */ f(
                          "button",
                          {
                            onClick: _,
                            disabled: g === null || b === null,
                            className: E(
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
      (c || i) && /* @__PURE__ */ f("div", { children: s && i ? /* @__PURE__ */ f("p", { className: "text-xs text-red-500", children: i }) : c && /* @__PURE__ */ f("p", { className: "text-xs text-gray-500", children: c }) })
    ] });
  }
);
$g.displayName = "TimePicker";
function Oo(e) {
  const t = p.useRef({ value: e, previous: e });
  return p.useMemo(() => (t.current.value !== e && (t.current.previous = t.current.value, t.current.value = e), t.current.previous), [e]);
}
var pr = "Switch", [Fg] = We(pr), [Yg, Lg] = Fg(pr), Si = p.forwardRef(
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
    } = e, [h, m] = p.useState(null), v = le(t, (C) => m(C)), g = p.useRef(!1), y = h ? u || !!h.closest("form") : !0, [b, x] = ot({
      prop: o,
      defaultProp: a ?? !1,
      onChange: l,
      caller: pr
    });
    return /* @__PURE__ */ I(Yg, { scope: n, checked: b, disabled: i, children: [
      /* @__PURE__ */ f(
        oe.button,
        {
          type: "button",
          role: "switch",
          "aria-checked": b,
          "aria-required": s,
          "data-state": Ri(b),
          "data-disabled": i ? "" : void 0,
          disabled: i,
          value: c,
          ...d,
          ref: v,
          onClick: ee(e.onClick, (C) => {
            x((M) => !M), y && (g.current = C.isPropagationStopped(), g.current || C.stopPropagation());
          })
        }
      ),
      y && /* @__PURE__ */ f(
        Ei,
        {
          control: h,
          bubbles: !g.current,
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
Si.displayName = pr;
var Di = "SwitchThumb", Oi = p.forwardRef(
  (e, t) => {
    const { __scopeSwitch: n, ...r } = e, o = Lg(Di, n);
    return /* @__PURE__ */ f(
      oe.span,
      {
        "data-state": Ri(o.checked),
        "data-disabled": o.disabled ? "" : void 0,
        ...r,
        ref: t
      }
    );
  }
);
Oi.displayName = Di;
var Bg = "SwitchBubbleInput", Ei = p.forwardRef(
  ({
    __scopeSwitch: e,
    control: t,
    checked: n,
    bubbles: r = !0,
    ...o
  }, a) => {
    const s = p.useRef(null), i = le(s, a), c = Oo(n), l = ar(t);
    return p.useEffect(() => {
      const u = s.current;
      if (!u) return;
      const d = window.HTMLInputElement.prototype, m = Object.getOwnPropertyDescriptor(
        d,
        "checked"
      ).set;
      if (c !== n && m) {
        const v = new Event("click", { bubbles: r });
        m.call(u, n), u.dispatchEvent(v);
      }
    }, [c, n, r]), /* @__PURE__ */ f(
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
Ei.displayName = Bg;
function Ri(e) {
  return e ? "checked" : "unchecked";
}
var Pi = Si, Hg = Oi;
const zg = De(
  E(
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
), Vg = w.forwardRef(({ className: e, variant: t, ...n }, r) => /* @__PURE__ */ f(
  Pi,
  {
    className: E(zg({ variant: t }), e),
    ...n,
    ref: r,
    children: /* @__PURE__ */ f(
      Hg,
      {
        className: E(
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
Vg.displayName = Pi.displayName;
function Ti(e) {
  const t = e + "CollectionProvider", [n, r] = We(t), [o, a] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), s = (g) => {
    const { scope: y, children: b } = g, x = w.useRef(null), C = w.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ f(o, { scope: y, itemMap: C, collectionRef: x, children: b });
  };
  s.displayName = t;
  const i = e + "CollectionSlot", c = /* @__PURE__ */ gn(i), l = w.forwardRef(
    (g, y) => {
      const { scope: b, children: x } = g, C = a(i, b), M = le(y, C.collectionRef);
      return /* @__PURE__ */ f(c, { ref: M, children: x });
    }
  );
  l.displayName = i;
  const u = e + "CollectionItemSlot", d = "data-radix-collection-item", h = /* @__PURE__ */ gn(u), m = w.forwardRef(
    (g, y) => {
      const { scope: b, children: x, ...C } = g, M = w.useRef(null), N = le(y, M), k = a(u, b);
      return w.useEffect(() => (k.itemMap.set(M, { ref: M, ...C }), () => void k.itemMap.delete(M))), /* @__PURE__ */ f(h, { [d]: "", ref: N, children: x });
    }
  );
  m.displayName = u;
  function v(g) {
    const y = a(e + "CollectionConsumer", g);
    return w.useCallback(() => {
      const x = y.collectionRef.current;
      if (!x) return [];
      const C = Array.from(x.querySelectorAll(`[${d}]`));
      return Array.from(y.itemMap.values()).sort(
        (k, O) => C.indexOf(k.ref.current) - C.indexOf(O.ref.current)
      );
    }, [y.collectionRef, y.itemMap]);
  }
  return [
    { Provider: s, Slot: l, ItemSlot: m },
    v,
    r
  ];
}
var jg = p.createContext(void 0);
function Eo(e) {
  const t = p.useContext(jg);
  return e || t || "ltr";
}
var Vr = "rovingFocusGroup.onEntryFocus", Gg = { bubbles: !1, cancelable: !0 }, On = "RovingFocusGroup", [Jr, Ai, Ug] = Ti(On), [qg, _i] = We(
  On,
  [Ug]
), [Xg, Kg] = qg(On), Ii = p.forwardRef(
  (e, t) => /* @__PURE__ */ f(Jr.Provider, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ f(Jr.Slot, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ f(Zg, { ...e, ref: t }) }) })
);
Ii.displayName = On;
var Zg = p.forwardRef((e, t) => {
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
  } = e, h = p.useRef(null), m = le(t, h), v = Eo(a), [g, y] = ot({
    prop: s,
    defaultProp: i ?? null,
    onChange: c,
    caller: On
  }), [b, x] = p.useState(!1), C = _t(l), M = Ai(n), N = p.useRef(!1), [k, O] = p.useState(0);
  return p.useEffect(() => {
    const T = h.current;
    if (T)
      return T.addEventListener(Vr, C), () => T.removeEventListener(Vr, C);
  }, [C]), /* @__PURE__ */ f(
    Xg,
    {
      scope: n,
      orientation: r,
      dir: v,
      loop: o,
      currentTabStopId: g,
      onItemFocus: p.useCallback(
        (T) => y(T),
        [y]
      ),
      onItemShiftTab: p.useCallback(() => x(!0), []),
      onFocusableItemAdd: p.useCallback(
        () => O((T) => T + 1),
        []
      ),
      onFocusableItemRemove: p.useCallback(
        () => O((T) => T - 1),
        []
      ),
      children: /* @__PURE__ */ f(
        oe.div,
        {
          tabIndex: b || k === 0 ? -1 : 0,
          "data-orientation": r,
          ...d,
          ref: m,
          style: { outline: "none", ...e.style },
          onMouseDown: ee(e.onMouseDown, () => {
            N.current = !0;
          }),
          onFocus: ee(e.onFocus, (T) => {
            const Y = !N.current;
            if (T.target === T.currentTarget && Y && !b) {
              const _ = new CustomEvent(Vr, Gg);
              if (T.currentTarget.dispatchEvent(_), !_.defaultPrevented) {
                const $ = M().filter((D) => D.focusable), P = $.find((D) => D.active), B = $.find((D) => D.id === g), A = [P, B, ...$].filter(
                  Boolean
                ).map((D) => D.ref.current);
                Fi(A, u);
              }
            }
            N.current = !1;
          }),
          onBlur: ee(e.onBlur, () => x(!1))
        }
      )
    }
  );
}), Wi = "RovingFocusGroupItem", $i = p.forwardRef(
  (e, t) => {
    const {
      __scopeRovingFocusGroup: n,
      focusable: r = !0,
      active: o = !1,
      tabStopId: a,
      children: s,
      ...i
    } = e, c = kt(), l = a || c, u = Kg(Wi, n), d = u.currentTabStopId === l, h = Ai(n), { onFocusableItemAdd: m, onFocusableItemRemove: v, currentTabStopId: g } = u;
    return p.useEffect(() => {
      if (r)
        return m(), () => v();
    }, [r, m, v]), /* @__PURE__ */ f(
      Jr.ItemSlot,
      {
        scope: n,
        id: l,
        focusable: r,
        active: o,
        children: /* @__PURE__ */ f(
          oe.span,
          {
            tabIndex: d ? 0 : -1,
            "data-orientation": u.orientation,
            ...i,
            ref: t,
            onMouseDown: ee(e.onMouseDown, (y) => {
              r ? u.onItemFocus(l) : y.preventDefault();
            }),
            onFocus: ee(e.onFocus, () => u.onItemFocus(l)),
            onKeyDown: ee(e.onKeyDown, (y) => {
              if (y.key === "Tab" && y.shiftKey) {
                u.onItemShiftTab();
                return;
              }
              if (y.target !== y.currentTarget) return;
              const b = eb(y, u.orientation, u.dir);
              if (b !== void 0) {
                if (y.metaKey || y.ctrlKey || y.altKey || y.shiftKey) return;
                y.preventDefault();
                let C = h().filter((M) => M.focusable).map((M) => M.ref.current);
                if (b === "last") C.reverse();
                else if (b === "prev" || b === "next") {
                  b === "prev" && C.reverse();
                  const M = C.indexOf(y.currentTarget);
                  C = u.loop ? tb(C, M + 1) : C.slice(M + 1);
                }
                setTimeout(() => Fi(C));
              }
            }),
            children: typeof s == "function" ? s({ isCurrentTabStop: d, hasTabStop: g != null }) : s
          }
        )
      }
    );
  }
);
$i.displayName = Wi;
var Qg = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function Jg(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function eb(e, t, n) {
  const r = Jg(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r)))
    return Qg[r];
}
function Fi(e, t = !1) {
  const n = document.activeElement;
  for (const r of e)
    if (r === n || (r.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function tb(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var nb = Ii, rb = $i, Ro = "Radio", [ob, Yi] = We(Ro), [ab, sb] = ob(Ro), Li = p.forwardRef(
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
    } = e, [d, h] = p.useState(null), m = le(t, (y) => h(y)), v = p.useRef(!1), g = d ? l || !!d.closest("form") : !0;
    return /* @__PURE__ */ I(ab, { scope: n, checked: o, disabled: s, children: [
      /* @__PURE__ */ f(
        oe.button,
        {
          type: "button",
          role: "radio",
          "aria-checked": o,
          "data-state": Vi(o),
          "data-disabled": s ? "" : void 0,
          disabled: s,
          value: i,
          ...u,
          ref: m,
          onClick: ee(e.onClick, (y) => {
            o || c == null || c(), g && (v.current = y.isPropagationStopped(), v.current || y.stopPropagation());
          })
        }
      ),
      g && /* @__PURE__ */ f(
        zi,
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
Li.displayName = Ro;
var Bi = "RadioIndicator", Hi = p.forwardRef(
  (e, t) => {
    const { __scopeRadio: n, forceMount: r, ...o } = e, a = sb(Bi, n);
    return /* @__PURE__ */ f(Ve, { present: r || a.checked, children: /* @__PURE__ */ f(
      oe.span,
      {
        "data-state": Vi(a.checked),
        "data-disabled": a.disabled ? "" : void 0,
        ...o,
        ref: t
      }
    ) });
  }
);
Hi.displayName = Bi;
var ib = "RadioBubbleInput", zi = p.forwardRef(
  ({
    __scopeRadio: e,
    control: t,
    checked: n,
    bubbles: r = !0,
    ...o
  }, a) => {
    const s = p.useRef(null), i = le(s, a), c = Oo(n), l = ar(t);
    return p.useEffect(() => {
      const u = s.current;
      if (!u) return;
      const d = window.HTMLInputElement.prototype, m = Object.getOwnPropertyDescriptor(
        d,
        "checked"
      ).set;
      if (c !== n && m) {
        const v = new Event("click", { bubbles: r });
        m.call(u, n), u.dispatchEvent(v);
      }
    }, [c, n, r]), /* @__PURE__ */ f(
      oe.input,
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
zi.displayName = ib;
function Vi(e) {
  return e ? "checked" : "unchecked";
}
var cb = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], gr = "RadioGroup", [lb] = We(gr, [
  _i,
  Yi
]), ji = _i(), Gi = Yi(), [db, ub] = lb(gr), Ui = p.forwardRef(
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
      ...h
    } = e, m = ji(n), v = Eo(l), [g, y] = ot({
      prop: a,
      defaultProp: o ?? null,
      onChange: d,
      caller: gr
    });
    return /* @__PURE__ */ f(
      db,
      {
        scope: n,
        name: r,
        required: s,
        disabled: i,
        value: g,
        onValueChange: y,
        children: /* @__PURE__ */ f(
          nb,
          {
            asChild: !0,
            ...m,
            orientation: c,
            dir: v,
            loop: u,
            children: /* @__PURE__ */ f(
              oe.div,
              {
                role: "radiogroup",
                "aria-required": s,
                "aria-orientation": c,
                "data-disabled": i ? "" : void 0,
                dir: v,
                ...h,
                ref: t
              }
            )
          }
        )
      }
    );
  }
);
Ui.displayName = gr;
var qi = "RadioGroupItem", Xi = p.forwardRef(
  (e, t) => {
    const { __scopeRadioGroup: n, disabled: r, ...o } = e, a = ub(qi, n), s = a.disabled || r, i = ji(n), c = Gi(n), l = p.useRef(null), u = le(t, l), d = a.value === o.value, h = p.useRef(!1);
    return p.useEffect(() => {
      const m = (g) => {
        cb.includes(g.key) && (h.current = !0);
      }, v = () => h.current = !1;
      return document.addEventListener("keydown", m), document.addEventListener("keyup", v), () => {
        document.removeEventListener("keydown", m), document.removeEventListener("keyup", v);
      };
    }, []), /* @__PURE__ */ f(
      rb,
      {
        asChild: !0,
        ...i,
        focusable: !s,
        active: d,
        children: /* @__PURE__ */ f(
          Li,
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
              h.current && ((m = l.current) == null || m.click());
            })
          }
        )
      }
    );
  }
);
Xi.displayName = qi;
var fb = "RadioGroupIndicator", Ki = p.forwardRef(
  (e, t) => {
    const { __scopeRadioGroup: n, ...r } = e, o = Gi(n);
    return /* @__PURE__ */ f(Hi, { ...o, ...r, ref: t });
  }
);
Ki.displayName = fb;
var Zi = Ui, Qi = Xi, hb = Ki;
const mb = w.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ f(Zi, { className: e, ...t, ref: n }));
mb.displayName = Zi.displayName;
const pb = De(
  E(
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
        black: E(
          "border-cms-gray-300 text-cms-black",
          "data-[state=checked]:border-cms-black"
        ),
        default: E(
          "border-cms-gray-300 text-cms-primary-300",
          "data-[state=checked]:border-cms-primary-300"
        ),
        green: E(
          "border-cms-gray-300 text-cms-green-500",
          "data-[state=checked]:border-cms-green-500"
        ),
        blue: E(
          "border-cms-gray-300 text-cms-blue-700",
          "data-[state=checked]:border-cms-blue-700"
        ),
        red: E(
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
), gb = De(
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
), bb = w.forwardRef(({ className: e, variant: t, size: n, ...r }, o) => /* @__PURE__ */ f(
  Qi,
  {
    ref: o,
    className: E(pb({ variant: t, size: n }), e),
    ...r,
    children: /* @__PURE__ */ f(
      hb,
      {
        className: E(gb({ variant: t, size: n }))
      }
    )
  }
));
bb.displayName = Qi.displayName;
var br = "Collapsible", [yb, Ji] = We(br), [vb, Po] = yb(br), ec = p.forwardRef(
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
      caller: br
    });
    return /* @__PURE__ */ f(
      vb,
      {
        scope: n,
        disabled: a,
        contentId: kt(),
        open: c,
        onOpenToggle: p.useCallback(() => l((u) => !u), [l]),
        children: /* @__PURE__ */ f(
          oe.div,
          {
            "data-state": Ao(c),
            "data-disabled": a ? "" : void 0,
            ...i,
            ref: t
          }
        )
      }
    );
  }
);
ec.displayName = br;
var tc = "CollapsibleTrigger", nc = p.forwardRef(
  (e, t) => {
    const { __scopeCollapsible: n, ...r } = e, o = Po(tc, n);
    return /* @__PURE__ */ f(
      oe.button,
      {
        type: "button",
        "aria-controls": o.contentId,
        "aria-expanded": o.open || !1,
        "data-state": Ao(o.open),
        "data-disabled": o.disabled ? "" : void 0,
        disabled: o.disabled,
        ...r,
        ref: t,
        onClick: ee(e.onClick, o.onOpenToggle)
      }
    );
  }
);
nc.displayName = tc;
var To = "CollapsibleContent", rc = p.forwardRef(
  (e, t) => {
    const { forceMount: n, ...r } = e, o = Po(To, e.__scopeCollapsible);
    return /* @__PURE__ */ f(Ve, { present: n || o.open, children: ({ present: a }) => /* @__PURE__ */ f(wb, { ...r, ref: t, present: a }) });
  }
);
rc.displayName = To;
var wb = p.forwardRef((e, t) => {
  const { __scopeCollapsible: n, present: r, children: o, ...a } = e, s = Po(To, n), [i, c] = p.useState(r), l = p.useRef(null), u = le(t, l), d = p.useRef(0), h = d.current, m = p.useRef(0), v = m.current, g = s.open || i, y = p.useRef(g), b = p.useRef(void 0);
  return p.useEffect(() => {
    const x = requestAnimationFrame(() => y.current = !1);
    return () => cancelAnimationFrame(x);
  }, []), ft(() => {
    const x = l.current;
    if (x) {
      b.current = b.current || {
        transitionDuration: x.style.transitionDuration,
        animationName: x.style.animationName
      }, x.style.transitionDuration = "0s", x.style.animationName = "none";
      const C = x.getBoundingClientRect();
      d.current = C.height, m.current = C.width, y.current || (x.style.transitionDuration = b.current.transitionDuration, x.style.animationName = b.current.animationName), c(r);
    }
  }, [s.open, r]), /* @__PURE__ */ f(
    oe.div,
    {
      "data-state": Ao(s.open),
      "data-disabled": s.disabled ? "" : void 0,
      id: s.contentId,
      hidden: !g,
      ...a,
      ref: u,
      style: {
        "--radix-collapsible-content-height": h ? `${h}px` : void 0,
        "--radix-collapsible-content-width": v ? `${v}px` : void 0,
        ...e.style
      },
      children: g && o
    }
  );
});
function Ao(e) {
  return e ? "open" : "closed";
}
var xb = ec, Cb = nc, kb = rc, Ge = "Accordion", Mb = ["Home", "End", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"], [_o, Nb, Sb] = Ti(Ge), [yr] = We(Ge, [
  Sb,
  Ji
]), Io = Ji(), oc = w.forwardRef(
  (e, t) => {
    const { type: n, ...r } = e, o = r, a = r;
    return /* @__PURE__ */ f(_o.Provider, { scope: e.__scopeAccordion, children: n === "multiple" ? /* @__PURE__ */ f(Rb, { ...a, ref: t }) : /* @__PURE__ */ f(Eb, { ...o, ref: t }) });
  }
);
oc.displayName = Ge;
var [ac, Db] = yr(Ge), [sc, Ob] = yr(
  Ge,
  { collapsible: !1 }
), Eb = w.forwardRef(
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
      caller: Ge
    });
    return /* @__PURE__ */ f(
      ac,
      {
        scope: e.__scopeAccordion,
        value: w.useMemo(() => i ? [i] : [], [i]),
        onItemOpen: c,
        onItemClose: w.useCallback(() => a && c(""), [a, c]),
        children: /* @__PURE__ */ f(sc, { scope: e.__scopeAccordion, collapsible: a, children: /* @__PURE__ */ f(ic, { ...s, ref: t }) })
      }
    );
  }
), Rb = w.forwardRef((e, t) => {
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
    caller: Ge
  }), c = w.useCallback(
    (u) => i((d = []) => [...d, u]),
    [i]
  ), l = w.useCallback(
    (u) => i((d = []) => d.filter((h) => h !== u)),
    [i]
  );
  return /* @__PURE__ */ f(
    ac,
    {
      scope: e.__scopeAccordion,
      value: s,
      onItemOpen: c,
      onItemClose: l,
      children: /* @__PURE__ */ f(sc, { scope: e.__scopeAccordion, collapsible: !0, children: /* @__PURE__ */ f(ic, { ...a, ref: t }) })
    }
  );
}), [Pb, vr] = yr(Ge), ic = w.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, disabled: r, dir: o, orientation: a = "vertical", ...s } = e, i = w.useRef(null), c = le(i, t), l = Nb(n), d = Eo(o) === "ltr", h = ee(e.onKeyDown, (m) => {
      var T;
      if (!Mb.includes(m.key)) return;
      const v = m.target, g = l().filter((Y) => {
        var _;
        return !((_ = Y.ref.current) != null && _.disabled);
      }), y = g.findIndex((Y) => Y.ref.current === v), b = g.length;
      if (y === -1) return;
      m.preventDefault();
      let x = y;
      const C = 0, M = b - 1, N = () => {
        x = y + 1, x > M && (x = C);
      }, k = () => {
        x = y - 1, x < C && (x = M);
      };
      switch (m.key) {
        case "Home":
          x = C;
          break;
        case "End":
          x = M;
          break;
        case "ArrowRight":
          a === "horizontal" && (d ? N() : k());
          break;
        case "ArrowDown":
          a === "vertical" && N();
          break;
        case "ArrowLeft":
          a === "horizontal" && (d ? k() : N());
          break;
        case "ArrowUp":
          a === "vertical" && k();
          break;
      }
      const O = x % b;
      (T = g[O].ref.current) == null || T.focus();
    });
    return /* @__PURE__ */ f(
      Pb,
      {
        scope: n,
        disabled: r,
        direction: o,
        orientation: a,
        children: /* @__PURE__ */ f(_o.Slot, { scope: n, children: /* @__PURE__ */ f(
          oe.div,
          {
            ...s,
            "data-orientation": a,
            ref: c,
            onKeyDown: r ? void 0 : h
          }
        ) })
      }
    );
  }
), Qn = "AccordionItem", [Tb, Wo] = yr(Qn), cc = w.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, value: r, ...o } = e, a = vr(Qn, n), s = Db(Qn, n), i = Io(n), c = kt(), l = r && s.value.includes(r) || !1, u = a.disabled || e.disabled;
    return /* @__PURE__ */ f(
      Tb,
      {
        scope: n,
        open: l,
        disabled: u,
        triggerId: c,
        children: /* @__PURE__ */ f(
          xb,
          {
            "data-orientation": a.orientation,
            "data-state": mc(l),
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
cc.displayName = Qn;
var lc = "AccordionHeader", dc = w.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, ...r } = e, o = vr(Ge, n), a = Wo(lc, n);
    return /* @__PURE__ */ f(
      oe.h3,
      {
        "data-orientation": o.orientation,
        "data-state": mc(a.open),
        "data-disabled": a.disabled ? "" : void 0,
        ...r,
        ref: t
      }
    );
  }
);
dc.displayName = lc;
var eo = "AccordionTrigger", uc = w.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, ...r } = e, o = vr(Ge, n), a = Wo(eo, n), s = Ob(eo, n), i = Io(n);
    return /* @__PURE__ */ f(_o.ItemSlot, { scope: n, children: /* @__PURE__ */ f(
      Cb,
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
uc.displayName = eo;
var fc = "AccordionContent", hc = w.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, ...r } = e, o = vr(Ge, n), a = Wo(fc, n), s = Io(n);
    return /* @__PURE__ */ f(
      kb,
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
hc.displayName = fc;
function mc(e) {
  return e ? "open" : "closed";
}
var Ab = oc, _b = cc, Ib = dc, Wb = uc, $b = hc;
const Fb = ({
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
  return /* @__PURE__ */ I(_b, { value: e.url, className: "border-none", children: [
    /* @__PURE__ */ f(Ib, { className: "m-0", children: /* @__PURE__ */ I(
      Wb,
      {
        onClick: (i) => {
          e.subMenu || (i.preventDefault(), o(e.url));
        },
        className: E(
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
          e.icon && /* @__PURE__ */ f(
            "div",
            {
              className: E(
                "mr-3 flex items-center",
                "[&>svg]:w-6 [&>svg]:h-6",
                !e.subMenu && n || a ? "text-cms-black" : "text-white"
              ),
              children: e.icon
            }
          ),
          /* @__PURE__ */ f(
            "span",
            {
              className: E(
                !e.subMenu && n || a ? "text-cms-black" : "text-white"
              ),
              children: e.title
            }
          ),
          e.subMenu && /* @__PURE__ */ f(
            ki,
            {
              className: E(
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
    e.subMenu && /* @__PURE__ */ f(
      $b,
      {
        className: E(
          "overflow-hidden",
          "data-[state=open]:animate-accordion-down",
          "data-[state=closed]:animate-accordion-up"
        ),
        children: e.subMenu.map((i) => {
          const c = i.url === r;
          return /* @__PURE__ */ f(
            "button",
            {
              onClick: () => o(i.url),
              className: E(
                "border-0 bg-transparent flex items-center",
                "w-full h-13 px-5 pl-14",
                "cursor-pointer",
                "transition-colors",
                "hover:bg-cms-gray-900"
              ),
              children: /* @__PURE__ */ f(
                "span",
                {
                  className: E(
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
}, Yb = w.forwardRef(
  ({ title: e, menus: t, selectedUrl: n, onMenuClick: r, headerSlot: o, className: a, ...s }, i) => {
    const [c, l] = be([]);
    return /* @__PURE__ */ I(
      "div",
      {
        ref: i,
        className: E(
          "flex flex-col",
          "w-70 min-w-70 max-w-70 h-full",
          "bg-cms-gray-850 text-white",
          a
        ),
        ...s,
        children: [
          o,
          e && !o && /* @__PURE__ */ f("div", { className: "px-5 py-4 border-b border-[#3a3b3e]", children: /* @__PURE__ */ f("h2", { className: "text-lg font-semibold text-white", children: e }) }),
          /* @__PURE__ */ f(
            "div",
            {
              className: E(
                "flex-1 overflow-y-auto",
                "scrollbar-thin",
                "scrollbar-thumb-[#3a3b3e]",
                "scrollbar-track-transparent"
              ),
              children: /* @__PURE__ */ f(
                Ab,
                {
                  type: "multiple",
                  value: c,
                  onValueChange: l,
                  children: t.map((u) => /* @__PURE__ */ f(
                    Fb,
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
Yb.displayName = "SideNavigation";
const Hn = De(
  E(
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
        default: E(
          "border border-cms-gray-400 bg-transparent",
          "text-cms-gray-700",
          "hover:bg-cms-gray-200"
        ),
        active: E(
          "bg-cms-primary-400 border border-cms-primary-400",
          "text-cms-black",
          "hover:bg-cms-primary-300"
        ),
        ellipsis: E(
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
), Lb = ({
  currentPage: e,
  totalPages: t,
  siblingCount: n = 1
}) => Pe(() => {
  const r = (l, u) => Array.from({ length: u - l + 1 }, (d, h) => l + h);
  if (n * 2 + 5 >= t)
    return r(1, t);
  const a = Math.max(e - n, 1), s = Math.min(e + n, t), i = a > 2, c = s < t - 1;
  return !i && c ? [...r(1, 3 + 2 * n), "...", t] : i && !c ? [1, "...", ...r(t - (2 + 2 * n), t)] : i && c ? [1, "...", ...r(a, s), "...", t] : [];
}, [e, t, n]), Bb = w.forwardRef(
  ({
    currentPage: e,
    totalPages: t,
    onPageChange: n,
    siblingCount: r = 1,
    showPrevNext: o = !0,
    disabled: a = !1,
    className: s
  }, i) => {
    const c = Lb({ currentPage: e, totalPages: t, siblingCount: r }), l = () => {
      e > 1 && !a && n(e - 1);
    }, u = () => {
      e < t && !a && n(e + 1);
    }, d = (h) => {
      !a && h !== e && n(h);
    };
    return /* @__PURE__ */ I(
      "nav",
      {
        ref: i,
        role: "navigation",
        "aria-label": "페이지네이션",
        className: E("flex items-center gap-1", s),
        children: [
          o && /* @__PURE__ */ f(
            "button",
            {
              onClick: l,
              disabled: a || e === 1,
              "aria-label": "이전 페이지",
              className: E(
                Hn({ variant: "default" }),
                (a || e === 1) && "opacity-50 cursor-not-allowed pointer-events-none"
              ),
              children: /* @__PURE__ */ f(Mg, { className: "w-4 h-4" })
            }
          ),
          c.map((h, m) => {
            if (h === "...")
              return /* @__PURE__ */ f(
                "span",
                {
                  className: E(
                    Hn({ variant: "ellipsis" })
                  ),
                  "aria-hidden": "true",
                  children: "..."
                },
                `ellipsis-${m}`
              );
            const v = h === e;
            return /* @__PURE__ */ f(
              "button",
              {
                onClick: () => d(h),
                disabled: a,
                "aria-label": `페이지 ${h}${v ? " (현재 페이지)" : "로 이동"}`,
                "aria-current": v ? "page" : void 0,
                className: E(
                  Hn({
                    variant: v ? "active" : "default"
                  }),
                  a && "opacity-50 cursor-not-allowed pointer-events-none"
                ),
                children: h
              },
              h
            );
          }),
          o && /* @__PURE__ */ f(
            "button",
            {
              onClick: u,
              disabled: a || e === t,
              "aria-label": "다음 페이지",
              className: E(
                Hn({ variant: "default" }),
                (a || e === t) && "opacity-50 cursor-not-allowed pointer-events-none"
              ),
              children: /* @__PURE__ */ f(Cg, { className: "w-4 h-4" })
            }
          )
        ]
      }
    );
  }
);
Bb.displayName = "Pagination";
var wr = "Checkbox", [Hb] = We(wr), [zb, $o] = Hb(wr);
function Vb(e) {
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
  } = e, [h, m] = ot({
    prop: n,
    defaultProp: o ?? !1,
    onChange: c,
    caller: wr
  }), [v, g] = p.useState(null), [y, b] = p.useState(null), x = p.useRef(!1), C = v ? !!s || !!v.closest("form") : (
    // We set this to true by default so that events bubble to forms without JS (SSR)
    !0
  ), M = {
    checked: h,
    disabled: a,
    setChecked: m,
    control: v,
    setControl: g,
    name: i,
    form: s,
    value: u,
    hasConsumerStoppedPropagationRef: x,
    required: l,
    defaultChecked: Mt(o) ? !1 : o,
    isFormControl: C,
    bubbleInput: y,
    setBubbleInput: b
  };
  return /* @__PURE__ */ f(
    zb,
    {
      scope: t,
      ...M,
      children: jb(d) ? d(M) : r
    }
  );
}
var pc = "CheckboxTrigger", gc = p.forwardRef(
  ({ __scopeCheckbox: e, onKeyDown: t, onClick: n, ...r }, o) => {
    const {
      control: a,
      value: s,
      disabled: i,
      checked: c,
      required: l,
      setControl: u,
      setChecked: d,
      hasConsumerStoppedPropagationRef: h,
      isFormControl: m,
      bubbleInput: v
    } = $o(pc, e), g = le(o, u), y = p.useRef(c);
    return p.useEffect(() => {
      const b = a == null ? void 0 : a.form;
      if (b) {
        const x = () => d(y.current);
        return b.addEventListener("reset", x), () => b.removeEventListener("reset", x);
      }
    }, [a, d]), /* @__PURE__ */ f(
      oe.button,
      {
        type: "button",
        role: "checkbox",
        "aria-checked": Mt(c) ? "mixed" : c,
        "aria-required": l,
        "data-state": Cc(c),
        "data-disabled": i ? "" : void 0,
        disabled: i,
        value: s,
        ...r,
        ref: g,
        onKeyDown: ee(t, (b) => {
          b.key === "Enter" && b.preventDefault();
        }),
        onClick: ee(n, (b) => {
          d((x) => Mt(x) ? !0 : !x), v && m && (h.current = b.isPropagationStopped(), h.current || b.stopPropagation());
        })
      }
    );
  }
);
gc.displayName = pc;
var bc = p.forwardRef(
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
    return /* @__PURE__ */ f(
      Vb,
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
        internal_do_not_use_render: ({ isFormControl: h }) => /* @__PURE__ */ I(Tt, { children: [
          /* @__PURE__ */ f(
            gc,
            {
              ...d,
              ref: t,
              __scopeCheckbox: n
            }
          ),
          h && /* @__PURE__ */ f(
            xc,
            {
              __scopeCheckbox: n
            }
          )
        ] })
      }
    );
  }
);
bc.displayName = wr;
var yc = "CheckboxIndicator", vc = p.forwardRef(
  (e, t) => {
    const { __scopeCheckbox: n, forceMount: r, ...o } = e, a = $o(yc, n);
    return /* @__PURE__ */ f(
      Ve,
      {
        present: r || Mt(a.checked) || a.checked === !0,
        children: /* @__PURE__ */ f(
          oe.span,
          {
            "data-state": Cc(a.checked),
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
vc.displayName = yc;
var wc = "CheckboxBubbleInput", xc = p.forwardRef(
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
      bubbleInput: h,
      setBubbleInput: m
    } = $o(wc, e), v = le(n, m), g = Oo(a), y = ar(r);
    p.useEffect(() => {
      const x = h;
      if (!x) return;
      const C = window.HTMLInputElement.prototype, N = Object.getOwnPropertyDescriptor(
        C,
        "checked"
      ).set, k = !o.current;
      if (g !== a && N) {
        const O = new Event("click", { bubbles: k });
        x.indeterminate = Mt(a), N.call(x, Mt(a) ? !1 : a), x.dispatchEvent(O);
      }
    }, [h, g, a, o]);
    const b = p.useRef(Mt(a) ? !1 : a);
    return /* @__PURE__ */ f(
      oe.input,
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
xc.displayName = wc;
function jb(e) {
  return typeof e == "function";
}
function Mt(e) {
  return e === "indeterminate";
}
function Cc(e) {
  return Mt(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
const Gb = w.forwardRef(({ className: e, label: t, id: n, disabled: r, ...o }, a) => {
  const s = n || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
  return /* @__PURE__ */ I("div", { className: "flex items-center", children: [
    /* @__PURE__ */ f(
      bc,
      {
        ref: a,
        id: s,
        disabled: r,
        className: E(
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
        children: /* @__PURE__ */ f(
          vc,
          {
            className: E("flex items-center justify-center", "text-white"),
            children: /* @__PURE__ */ f(vg, { className: "h-[18px] w-[18px]", strokeWidth: 4 })
          }
        )
      }
    ),
    t && /* @__PURE__ */ f(
      "label",
      {
        htmlFor: s,
        className: E(
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
Gb.displayName = "Checkbox";
var xr = "Dialog", [kc] = We(xr), [Ub, Ue] = kc(xr), Mc = (e) => {
  const {
    __scopeDialog: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: a,
    modal: s = !0
  } = e, i = p.useRef(null), c = p.useRef(null), [l, u] = ot({
    prop: r,
    defaultProp: o ?? !1,
    onChange: a,
    caller: xr
  });
  return /* @__PURE__ */ f(
    Ub,
    {
      scope: t,
      triggerRef: i,
      contentRef: c,
      contentId: kt(),
      titleId: kt(),
      descriptionId: kt(),
      open: l,
      onOpenChange: u,
      onOpenToggle: p.useCallback(() => u((d) => !d), [u]),
      modal: s,
      children: n
    }
  );
};
Mc.displayName = xr;
var Nc = "DialogTrigger", qb = p.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = Ue(Nc, n), a = le(t, o.triggerRef);
    return /* @__PURE__ */ f(
      oe.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": o.open,
        "aria-controls": o.contentId,
        "data-state": Lo(o.open),
        ...r,
        ref: a,
        onClick: ee(e.onClick, o.onOpenToggle)
      }
    );
  }
);
qb.displayName = Nc;
var Fo = "DialogPortal", [Xb, Sc] = kc(Fo, {
  forceMount: void 0
}), Dc = (e) => {
  const { __scopeDialog: t, forceMount: n, children: r, container: o } = e, a = Ue(Fo, t);
  return /* @__PURE__ */ f(Xb, { scope: t, forceMount: n, children: p.Children.map(r, (s) => /* @__PURE__ */ f(Ve, { present: n || a.open, children: /* @__PURE__ */ f(ir, { asChild: !0, container: o, children: s }) })) });
};
Dc.displayName = Fo;
var Jn = "DialogOverlay", Oc = p.forwardRef(
  (e, t) => {
    const n = Sc(Jn, e.__scopeDialog), { forceMount: r = n.forceMount, ...o } = e, a = Ue(Jn, e.__scopeDialog);
    return a.modal ? /* @__PURE__ */ f(Ve, { present: r || a.open, children: /* @__PURE__ */ f(Zb, { ...o, ref: t }) }) : null;
  }
);
Oc.displayName = Jn;
var Kb = /* @__PURE__ */ gn("DialogOverlay.RemoveScroll"), Zb = p.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = Ue(Jn, n);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ f(yo, { as: Kb, allowPinchZoom: !0, shards: [o.contentRef], children: /* @__PURE__ */ f(
        oe.div,
        {
          "data-state": Lo(o.open),
          ...r,
          ref: t,
          style: { pointerEvents: "auto", ...r.style }
        }
      ) })
    );
  }
), Wt = "DialogContent", Ec = p.forwardRef(
  (e, t) => {
    const n = Sc(Wt, e.__scopeDialog), { forceMount: r = n.forceMount, ...o } = e, a = Ue(Wt, e.__scopeDialog);
    return /* @__PURE__ */ f(Ve, { present: r || a.open, children: a.modal ? /* @__PURE__ */ f(Qb, { ...o, ref: t }) : /* @__PURE__ */ f(Jb, { ...o, ref: t }) });
  }
);
Ec.displayName = Wt;
var Qb = p.forwardRef(
  (e, t) => {
    const n = Ue(Wt, e.__scopeDialog), r = p.useRef(null), o = le(t, n.contentRef, r);
    return p.useEffect(() => {
      const a = r.current;
      if (a) return Ms(a);
    }, []), /* @__PURE__ */ f(
      Rc,
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
), Jb = p.forwardRef(
  (e, t) => {
    const n = Ue(Wt, e.__scopeDialog), r = p.useRef(!1), o = p.useRef(!1);
    return /* @__PURE__ */ f(
      Rc,
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
), Rc = p.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, trapFocus: r, onOpenAutoFocus: o, onCloseAutoFocus: a, ...s } = e, i = Ue(Wt, n), c = p.useRef(null), l = le(t, c);
    return Za(), /* @__PURE__ */ I(Tt, { children: [
      /* @__PURE__ */ f(
        io,
        {
          asChild: !0,
          loop: !0,
          trapped: r,
          onMountAutoFocus: o,
          onUnmountAutoFocus: a,
          children: /* @__PURE__ */ f(
            er,
            {
              role: "dialog",
              id: i.contentId,
              "aria-describedby": i.descriptionId,
              "aria-labelledby": i.titleId,
              "data-state": Lo(i.open),
              ...s,
              ref: l,
              onDismiss: () => i.onOpenChange(!1)
            }
          )
        }
      ),
      /* @__PURE__ */ I(Tt, { children: [
        /* @__PURE__ */ f(ey, { titleId: i.titleId }),
        /* @__PURE__ */ f(ny, { contentRef: c, descriptionId: i.descriptionId })
      ] })
    ] });
  }
), Yo = "DialogTitle", Pc = p.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = Ue(Yo, n);
    return /* @__PURE__ */ f(oe.h2, { id: o.titleId, ...r, ref: t });
  }
);
Pc.displayName = Yo;
var Tc = "DialogDescription", Ac = p.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = Ue(Tc, n);
    return /* @__PURE__ */ f(oe.p, { id: o.descriptionId, ...r, ref: t });
  }
);
Ac.displayName = Tc;
var _c = "DialogClose", Ic = p.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = Ue(_c, n);
    return /* @__PURE__ */ f(
      oe.button,
      {
        type: "button",
        ...r,
        ref: t,
        onClick: ee(e.onClick, () => o.onOpenChange(!1))
      }
    );
  }
);
Ic.displayName = _c;
function Lo(e) {
  return e ? "open" : "closed";
}
var Wc = "DialogTitleWarning", [dv, $c] = Fl(Wc, {
  contentName: Wt,
  titleName: Yo,
  docsSlug: "dialog"
}), ey = ({ titleId: e }) => {
  const t = $c(Wc), n = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;
  return p.useEffect(() => {
    e && (document.getElementById(e) || console.error(n));
  }, [n, e]), null;
}, ty = "DialogDescriptionWarning", ny = ({ contentRef: e, descriptionId: t }) => {
  const r = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${$c(ty).contentName}}.`;
  return p.useEffect(() => {
    var a;
    const o = (a = e.current) == null ? void 0 : a.getAttribute("aria-describedby");
    t && o && (document.getElementById(t) || console.warn(r));
  }, [r, e, t]), null;
}, ry = Mc, oy = Dc, ay = Oc, sy = Ec, iy = Pc, cy = Ac, ly = Ic;
const dy = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg"
}, sn = w.forwardRef(
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
  }, l) => /* @__PURE__ */ f(ry, { open: e, onOpenChange: t, children: /* @__PURE__ */ I(oy, { children: [
    /* @__PURE__ */ f(
      ay,
      {
        className: E(
          "fixed inset-0 z-150 bg-black/50",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        )
      }
    ),
    /* @__PURE__ */ I(
      sy,
      {
        ref: l,
        className: E(
          "fixed left-[50%] top-[50%] z-150",
          "translate-x-[-50%] translate-y-[-50%]",
          "w-full",
          dy[c],
          "bg-white rounded-lg shadow-lg",
          "p-6",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          s
        ),
        children: [
          i && /* @__PURE__ */ f(ly, { asChild: !0, children: /* @__PURE__ */ I(
            ut,
            {
              variant: "ghost",
              size: "icon",
              className: E("h-6 w-6", "absolute right-4 top-4"),
              children: [
                /* @__PURE__ */ f(Wg, {}),
                /* @__PURE__ */ f("span", { className: "sr-only", children: "Close" })
              ]
            }
          ) }),
          n && /* @__PURE__ */ f("div", { className: "flex justify-center mb-4", children: n }),
          r && /* @__PURE__ */ f(
            iy,
            {
              className: E(
                "text-lg font-bold text-cms-gray-900 mb-2",
                "flex items-center justify-center"
              ),
              children: r
            }
          ),
          /* @__PURE__ */ f(cy, { className: "text-sm text-cms-gray-700 text-center", children: o }),
          a && /* @__PURE__ */ f("div", { className: "mt-6", children: a })
        ]
      }
    )
  ] }) })
);
sn.displayName = "Modal";
const uy = w.forwardRef(
  ({
    open: e,
    onOpenChange: t,
    title: n = "확인",
    message: r,
    confirmText: o = "확인",
    onConfirm: a,
    className: s
  }, i) => /* @__PURE__ */ f(
    sn,
    {
      ref: i,
      open: e,
      onOpenChange: t,
      title: n,
      footer: /* @__PURE__ */ f(
        ut,
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
      icon: /* @__PURE__ */ f(Mi, { className: "w-15 h-15 text-cms-black" }),
      children: /* @__PURE__ */ f("div", { className: "text-sm text-cms-gray-700", children: r })
    }
  )
);
uy.displayName = "ConfirmModal";
const fy = w.forwardRef(
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
  }, l) => /* @__PURE__ */ f(
    sn,
    {
      ref: l,
      open: e,
      onOpenChange: t,
      icon: /* @__PURE__ */ f(Ni, { className: "w-15 h-15 text-cms-red-400" }),
      title: n,
      footer: /* @__PURE__ */ I("div", { className: "flex gap-2 w-full", children: [
        /* @__PURE__ */ f(
          ut,
          {
            onClick: () => {
              i == null || i(), t(!1);
            },
            variant: "outline",
            className: "flex-1 h-12",
            children: a
          }
        ),
        /* @__PURE__ */ f(
          ut,
          {
            onClick: () => {
              s(), t(!1);
            },
            className: E(
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
      children: /* @__PURE__ */ f("div", { className: "text-sm text-cms-gray-700", children: r })
    }
  )
);
fy.displayName = "DeleteModal";
const hy = w.forwardRef(
  ({
    open: e,
    onOpenChange: t,
    title: n = "오류",
    message: r,
    confirmText: o = "확인",
    onConfirm: a,
    className: s
  }, i) => /* @__PURE__ */ f(
    sn,
    {
      ref: i,
      open: e,
      onOpenChange: t,
      icon: /* @__PURE__ */ f(Pg, { className: "w-15 h-15 text-cms-red-400" }),
      title: n,
      footer: /* @__PURE__ */ f(
        ut,
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
      children: /* @__PURE__ */ f("div", { className: "text-sm text-cms-gray-700", children: r })
    }
  )
);
hy.displayName = "ErrorModal";
const my = w.forwardRef(
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
  }, l) => /* @__PURE__ */ f(
    sn,
    {
      ref: l,
      open: e,
      onOpenChange: t,
      icon: /* @__PURE__ */ f(Ni, { className: "w-15 h-15 text-cms-orange-500" }),
      title: n,
      footer: (
        // 버튼 두 개를 가로로 배치하기 위해 flex 컨테이너 사용
        /* @__PURE__ */ I("div", { className: "flex w-full gap-2", children: [
          /* @__PURE__ */ f(
            ut,
            {
              onClick: () => {
                i == null || i(), t(!1);
              },
              className: "flex-1 h-12 bg-white border border-cms-gray-200 text-cms-gray-700 hover:bg-cms-gray-50",
              children: s
            }
          ),
          /* @__PURE__ */ f(
            ut,
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
      children: /* @__PURE__ */ f("div", { className: "text-sm text-cms-gray-700", children: r })
    }
  )
);
my.displayName = "WarningModal";
const py = w.forwardRef(
  ({
    open: e,
    onOpenChange: t,
    title: n = "성공",
    message: r,
    confirmText: o = "확인",
    onConfirm: a,
    className: s
  }, i) => /* @__PURE__ */ f(
    sn,
    {
      ref: i,
      open: e,
      onOpenChange: t,
      icon: /* @__PURE__ */ f(Mi, { className: "w-15 h-15 text-cms-green-500 border-cms-green-500" }),
      title: n,
      footer: /* @__PURE__ */ f(
        ut,
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
      children: /* @__PURE__ */ f("div", { className: "text-sm text-cms-gray-700", children: r })
    }
  )
);
py.displayName = "SuccessModal";
function gy(e) {
  if (typeof document > "u") return;
  let t = document.head || document.getElementsByTagName("head")[0], n = document.createElement("style");
  n.type = "text/css", t.appendChild(n), n.styleSheet ? n.styleSheet.cssText = e : n.appendChild(document.createTextNode(e));
}
const by = (e) => {
  switch (e) {
    case "success":
      return wy;
    case "info":
      return Cy;
    case "warning":
      return xy;
    case "error":
      return ky;
    default:
      return null;
  }
}, yy = Array(12).fill(0), vy = ({ visible: e, className: t }) => /* @__PURE__ */ w.createElement("div", {
  className: [
    "sonner-loading-wrapper",
    t
  ].filter(Boolean).join(" "),
  "data-visible": e
}, /* @__PURE__ */ w.createElement("div", {
  className: "sonner-spinner"
}, yy.map((n, r) => /* @__PURE__ */ w.createElement("div", {
  className: "sonner-loading-bar",
  key: `spinner-bar-${r}`
})))), wy = /* @__PURE__ */ w.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ w.createElement("path", {
  fillRule: "evenodd",
  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
  clipRule: "evenodd"
})), xy = /* @__PURE__ */ w.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ w.createElement("path", {
  fillRule: "evenodd",
  d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
  clipRule: "evenodd"
})), Cy = /* @__PURE__ */ w.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ w.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
  clipRule: "evenodd"
})), ky = /* @__PURE__ */ w.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ w.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
  clipRule: "evenodd"
})), My = /* @__PURE__ */ w.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "12",
  height: "12",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /* @__PURE__ */ w.createElement("line", {
  x1: "18",
  y1: "6",
  x2: "6",
  y2: "18"
}), /* @__PURE__ */ w.createElement("line", {
  x1: "6",
  y1: "6",
  x2: "18",
  y2: "18"
})), Ny = () => {
  const [e, t] = w.useState(document.hidden);
  return w.useEffect(() => {
    const n = () => {
      t(document.hidden);
    };
    return document.addEventListener("visibilitychange", n), () => window.removeEventListener("visibilitychange", n);
  }, []), e;
};
let to = 1;
class Sy {
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
      const { message: r, ...o } = t, a = typeof (t == null ? void 0 : t.id) == "number" || ((n = t.id) == null ? void 0 : n.length) > 0 ? t.id : to++, s = this.toasts.find((c) => c.id === a), i = t.dismissible === void 0 ? !0 : t.dismissible;
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
        ], w.isValidElement(l))
          a = !1, this.create({
            id: r,
            type: "default",
            message: l
          });
        else if (Oy(l) && !l.ok) {
          a = !1;
          const d = typeof n.error == "function" ? await n.error(`HTTP error! status: ${l.status}`) : n.error, h = typeof n.description == "function" ? await n.description(`HTTP error! status: ${l.status}`) : n.description, v = typeof d == "object" && !w.isValidElement(d) ? d : {
            message: d
          };
          this.create({
            id: r,
            type: "error",
            description: h,
            ...v
          });
        } else if (l instanceof Error) {
          a = !1;
          const d = typeof n.error == "function" ? await n.error(l) : n.error, h = typeof n.description == "function" ? await n.description(l) : n.description, v = typeof d == "object" && !w.isValidElement(d) ? d : {
            message: d
          };
          this.create({
            id: r,
            type: "error",
            description: h,
            ...v
          });
        } else if (n.success !== void 0) {
          a = !1;
          const d = typeof n.success == "function" ? await n.success(l) : n.success, h = typeof n.description == "function" ? await n.description(l) : n.description, v = typeof d == "object" && !w.isValidElement(d) ? d : {
            message: d
          };
          this.create({
            id: r,
            type: "success",
            description: h,
            ...v
          });
        }
      }).catch(async (l) => {
        if (s = [
          "reject",
          l
        ], n.error !== void 0) {
          a = !1;
          const u = typeof n.error == "function" ? await n.error(l) : n.error, d = typeof n.description == "function" ? await n.description(l) : n.description, m = typeof u == "object" && !w.isValidElement(u) ? u : {
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
      const r = (n == null ? void 0 : n.id) || to++;
      return this.create({
        jsx: t(r),
        id: r,
        ...n
      }), r;
    }, this.getActiveToasts = () => this.toasts.filter((t) => !this.dismissedToasts.has(t.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set();
  }
}
const Re = new Sy(), Dy = (e, t) => {
  const n = (t == null ? void 0 : t.id) || to++;
  return Re.addToast({
    title: e,
    ...t,
    id: n
  }), n;
}, Oy = (e) => e && typeof e == "object" && "ok" in e && typeof e.ok == "boolean" && "status" in e && typeof e.status == "number", Ey = Dy, Ry = () => Re.toasts, Py = () => Re.getActiveToasts(), uv = Object.assign(Ey, {
  success: Re.success,
  info: Re.info,
  warning: Re.warning,
  error: Re.error,
  custom: Re.custom,
  message: Re.message,
  promise: Re.promise,
  dismiss: Re.dismiss,
  loading: Re.loading
}, {
  getHistory: Ry,
  getToasts: Py
});
gy("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function zn(e) {
  return e.label !== void 0;
}
const Ty = 3, Ay = "24px", _y = "16px", _a = 4e3, Iy = 356, Wy = 14, $y = 45, Fy = 200;
function qe(...e) {
  return e.filter(Boolean).join(" ");
}
function Yy(e) {
  const [t, n] = e.split("-"), r = [];
  return t && r.push(t), n && r.push(n), r;
}
const Ly = (e) => {
  var t, n, r, o, a, s, i, c, l;
  const { invert: u, toast: d, unstyled: h, interacting: m, setHeights: v, visibleToasts: g, heights: y, index: b, toasts: x, expanded: C, removeToast: M, defaultRichColors: N, closeButton: k, style: O, cancelButtonStyle: T, actionButtonStyle: Y, className: _ = "", descriptionClassName: $ = "", duration: P, position: B, gap: S, expandByDefault: A, classNames: D, icons: W, closeButtonAriaLabel: R = "Close toast" } = e, [F, L] = w.useState(null), [z, ne] = w.useState(null), [H, q] = w.useState(!1), [K, de] = w.useState(!1), [fe, Q] = w.useState(!1), [me, ie] = w.useState(!1), [ye, we] = w.useState(!1), [Oe, pt] = w.useState(0), [$t, Ft] = w.useState(0), st = w.useRef(d.duration || P || _a), Yt = w.useRef(null), Ce = w.useRef(null), Mr = b === 0, Nr = b + 1 <= g, Ne = d.type, it = d.dismissible !== !1, cn = d.className || "", ln = d.descriptionClassName || "", Lt = w.useMemo(() => y.findIndex((j) => j.toastId === d.id) || 0, [
    y,
    d.id
  ]), Sr = w.useMemo(() => {
    var j;
    return (j = d.closeButton) != null ? j : k;
  }, [
    d.closeButton,
    k
  ]), Rn = w.useMemo(() => d.duration || P || _a, [
    d.duration,
    P
  ]), dn = w.useRef(0), gt = w.useRef(0), Pn = w.useRef(0), bt = w.useRef(null), [Dr, Or] = B.split("-"), Tn = w.useMemo(() => y.reduce((j, G, ve) => ve >= Lt ? j : j + G.height, 0), [
    y,
    Lt
  ]), An = Ny(), _n = d.invert || u, un = Ne === "loading";
  gt.current = w.useMemo(() => Lt * S + Tn, [
    Lt,
    Tn
  ]), w.useEffect(() => {
    st.current = Rn;
  }, [
    Rn
  ]), w.useEffect(() => {
    q(!0);
  }, []), w.useEffect(() => {
    const j = Ce.current;
    if (j) {
      const G = j.getBoundingClientRect().height;
      return Ft(G), v((ve) => [
        {
          toastId: d.id,
          height: G,
          position: d.position
        },
        ...ve
      ]), () => v((ve) => ve.filter((Se) => Se.toastId !== d.id));
    }
  }, [
    v,
    d.id
  ]), w.useLayoutEffect(() => {
    if (!H) return;
    const j = Ce.current, G = j.style.height;
    j.style.height = "auto";
    const ve = j.getBoundingClientRect().height;
    j.style.height = G, Ft(ve), v((Se) => Se.find((he) => he.toastId === d.id) ? Se.map((he) => he.toastId === d.id ? {
      ...he,
      height: ve
    } : he) : [
      {
        toastId: d.id,
        height: ve,
        position: d.position
      },
      ...Se
    ]);
  }, [
    H,
    d.title,
    d.description,
    v,
    d.id,
    d.jsx,
    d.action,
    d.cancel
  ]);
  const $e = w.useCallback(() => {
    de(!0), pt(gt.current), v((j) => j.filter((G) => G.toastId !== d.id)), setTimeout(() => {
      M(d);
    }, Fy);
  }, [
    d,
    M,
    v,
    gt
  ]);
  w.useEffect(() => {
    if (d.promise && Ne === "loading" || d.duration === 1 / 0 || d.type === "loading") return;
    let j;
    return C || m || An ? (() => {
      if (Pn.current < dn.current) {
        const Se = (/* @__PURE__ */ new Date()).getTime() - dn.current;
        st.current = st.current - Se;
      }
      Pn.current = (/* @__PURE__ */ new Date()).getTime();
    })() : (() => {
      st.current !== 1 / 0 && (dn.current = (/* @__PURE__ */ new Date()).getTime(), j = setTimeout(() => {
        d.onAutoClose == null || d.onAutoClose.call(d, d), $e();
      }, st.current));
    })(), () => clearTimeout(j);
  }, [
    C,
    m,
    d,
    Ne,
    An,
    $e
  ]), w.useEffect(() => {
    d.delete && ($e(), d.onDismiss == null || d.onDismiss.call(d, d));
  }, [
    $e,
    d.delete
  ]);
  function X() {
    var j;
    if (W != null && W.loading) {
      var G;
      return /* @__PURE__ */ w.createElement("div", {
        className: qe(D == null ? void 0 : D.loader, d == null || (G = d.classNames) == null ? void 0 : G.loader, "sonner-loader"),
        "data-visible": Ne === "loading"
      }, W.loading);
    }
    return /* @__PURE__ */ w.createElement(vy, {
      className: qe(D == null ? void 0 : D.loader, d == null || (j = d.classNames) == null ? void 0 : j.loader),
      visible: Ne === "loading"
    });
  }
  const re = d.icon || (W == null ? void 0 : W[Ne]) || by(Ne);
  var U, J;
  return /* @__PURE__ */ w.createElement("li", {
    tabIndex: 0,
    ref: Ce,
    className: qe(_, cn, D == null ? void 0 : D.toast, d == null || (t = d.classNames) == null ? void 0 : t.toast, D == null ? void 0 : D.default, D == null ? void 0 : D[Ne], d == null || (n = d.classNames) == null ? void 0 : n[Ne]),
    "data-sonner-toast": "",
    "data-rich-colors": (U = d.richColors) != null ? U : N,
    "data-styled": !(d.jsx || d.unstyled || h),
    "data-mounted": H,
    "data-promise": !!d.promise,
    "data-swiped": ye,
    "data-removed": K,
    "data-visible": Nr,
    "data-y-position": Dr,
    "data-x-position": Or,
    "data-index": b,
    "data-front": Mr,
    "data-swiping": fe,
    "data-dismissible": it,
    "data-type": Ne,
    "data-invert": _n,
    "data-swipe-out": me,
    "data-swipe-direction": z,
    "data-expanded": !!(C || A && H),
    "data-testid": d.testId,
    style: {
      "--index": b,
      "--toasts-before": b,
      "--z-index": x.length - b,
      "--offset": `${K ? Oe : gt.current}px`,
      "--initial-height": A ? "auto" : `${$t}px`,
      ...O,
      ...d.style
    },
    onDragEnd: () => {
      Q(!1), L(null), bt.current = null;
    },
    onPointerDown: (j) => {
      j.button !== 2 && (un || !it || (Yt.current = /* @__PURE__ */ new Date(), pt(gt.current), j.target.setPointerCapture(j.pointerId), j.target.tagName !== "BUTTON" && (Q(!0), bt.current = {
        x: j.clientX,
        y: j.clientY
      })));
    },
    onPointerUp: () => {
      var j, G, ve;
      if (me || !it) return;
      bt.current = null;
      const Se = Number(((j = Ce.current) == null ? void 0 : j.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0), Bt = Number(((G = Ce.current) == null ? void 0 : G.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0), he = (/* @__PURE__ */ new Date()).getTime() - ((ve = Yt.current) == null ? void 0 : ve.getTime()), ke = F === "x" ? Se : Bt, In = Math.abs(ke) / he;
      if (Math.abs(ke) >= $y || In > 0.11) {
        pt(gt.current), d.onDismiss == null || d.onDismiss.call(d, d), ne(F === "x" ? Se > 0 ? "right" : "left" : Bt > 0 ? "down" : "up"), $e(), ie(!0);
        return;
      } else {
        var Fe, Ye;
        (Fe = Ce.current) == null || Fe.style.setProperty("--swipe-amount-x", "0px"), (Ye = Ce.current) == null || Ye.style.setProperty("--swipe-amount-y", "0px");
      }
      we(!1), Q(!1), L(null);
    },
    onPointerMove: (j) => {
      var G, ve, Se;
      if (!bt.current || !it || ((G = window.getSelection()) == null ? void 0 : G.toString().length) > 0) return;
      const he = j.clientY - bt.current.y, ke = j.clientX - bt.current.x;
      var In;
      const Fe = (In = e.swipeDirections) != null ? In : Yy(B);
      !F && (Math.abs(ke) > 1 || Math.abs(he) > 1) && L(Math.abs(ke) > Math.abs(he) ? "x" : "y");
      let Ye = {
        x: 0,
        y: 0
      };
      const zo = (Et) => 1 / (1.5 + Math.abs(Et) / 20);
      if (F === "y") {
        if (Fe.includes("top") || Fe.includes("bottom"))
          if (Fe.includes("top") && he < 0 || Fe.includes("bottom") && he > 0)
            Ye.y = he;
          else {
            const Et = he * zo(he);
            Ye.y = Math.abs(Et) < Math.abs(he) ? Et : he;
          }
      } else if (F === "x" && (Fe.includes("left") || Fe.includes("right")))
        if (Fe.includes("left") && ke < 0 || Fe.includes("right") && ke > 0)
          Ye.x = ke;
        else {
          const Et = ke * zo(ke);
          Ye.x = Math.abs(Et) < Math.abs(ke) ? Et : ke;
        }
      (Math.abs(Ye.x) > 0 || Math.abs(Ye.y) > 0) && we(!0), (ve = Ce.current) == null || ve.style.setProperty("--swipe-amount-x", `${Ye.x}px`), (Se = Ce.current) == null || Se.style.setProperty("--swipe-amount-y", `${Ye.y}px`);
    }
  }, Sr && !d.jsx && Ne !== "loading" ? /* @__PURE__ */ w.createElement("button", {
    "aria-label": R,
    "data-disabled": un,
    "data-close-button": !0,
    onClick: un || !it ? () => {
    } : () => {
      $e(), d.onDismiss == null || d.onDismiss.call(d, d);
    },
    className: qe(D == null ? void 0 : D.closeButton, d == null || (r = d.classNames) == null ? void 0 : r.closeButton)
  }, (J = W == null ? void 0 : W.close) != null ? J : My) : null, (Ne || d.icon || d.promise) && d.icon !== null && ((W == null ? void 0 : W[Ne]) !== null || d.icon) ? /* @__PURE__ */ w.createElement("div", {
    "data-icon": "",
    className: qe(D == null ? void 0 : D.icon, d == null || (o = d.classNames) == null ? void 0 : o.icon)
  }, d.promise || d.type === "loading" && !d.icon ? d.icon || X() : null, d.type !== "loading" ? re : null) : null, /* @__PURE__ */ w.createElement("div", {
    "data-content": "",
    className: qe(D == null ? void 0 : D.content, d == null || (a = d.classNames) == null ? void 0 : a.content)
  }, /* @__PURE__ */ w.createElement("div", {
    "data-title": "",
    className: qe(D == null ? void 0 : D.title, d == null || (s = d.classNames) == null ? void 0 : s.title)
  }, d.jsx ? d.jsx : typeof d.title == "function" ? d.title() : d.title), d.description ? /* @__PURE__ */ w.createElement("div", {
    "data-description": "",
    className: qe($, ln, D == null ? void 0 : D.description, d == null || (i = d.classNames) == null ? void 0 : i.description)
  }, typeof d.description == "function" ? d.description() : d.description) : null), /* @__PURE__ */ w.isValidElement(d.cancel) ? d.cancel : d.cancel && zn(d.cancel) ? /* @__PURE__ */ w.createElement("button", {
    "data-button": !0,
    "data-cancel": !0,
    style: d.cancelButtonStyle || T,
    onClick: (j) => {
      zn(d.cancel) && it && (d.cancel.onClick == null || d.cancel.onClick.call(d.cancel, j), $e());
    },
    className: qe(D == null ? void 0 : D.cancelButton, d == null || (c = d.classNames) == null ? void 0 : c.cancelButton)
  }, d.cancel.label) : null, /* @__PURE__ */ w.isValidElement(d.action) ? d.action : d.action && zn(d.action) ? /* @__PURE__ */ w.createElement("button", {
    "data-button": !0,
    "data-action": !0,
    style: d.actionButtonStyle || Y,
    onClick: (j) => {
      zn(d.action) && (d.action.onClick == null || d.action.onClick.call(d.action, j), !j.defaultPrevented && $e());
    },
    className: qe(D == null ? void 0 : D.actionButton, d == null || (l = d.classNames) == null ? void 0 : l.actionButton)
  }, d.action.label) : null);
};
function Ia() {
  if (typeof window > "u" || typeof document > "u") return "ltr";
  const e = document.documentElement.getAttribute("dir");
  return e === "auto" || !e ? window.getComputedStyle(document.documentElement).direction : e;
}
function By(e, t) {
  const n = {};
  return [
    e,
    t
  ].forEach((r, o) => {
    const a = o === 1, s = a ? "--mobile-offset" : "--offset", i = a ? _y : Ay;
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
const Hy = /* @__PURE__ */ w.forwardRef(function(t, n) {
  const { id: r, invert: o, position: a = "bottom-right", hotkey: s = [
    "altKey",
    "KeyT"
  ], expand: i, closeButton: c, className: l, offset: u, mobileOffset: d, theme: h = "light", richColors: m, duration: v, style: g, visibleToasts: y = Ty, toastOptions: b, dir: x = Ia(), gap: C = Wy, icons: M, containerAriaLabel: N = "Notifications" } = t, [k, O] = w.useState([]), T = w.useMemo(() => r ? k.filter((H) => H.toasterId === r) : k.filter((H) => !H.toasterId), [
    k,
    r
  ]), Y = w.useMemo(() => Array.from(new Set([
    a
  ].concat(T.filter((H) => H.position).map((H) => H.position)))), [
    T,
    a
  ]), [_, $] = w.useState([]), [P, B] = w.useState(!1), [S, A] = w.useState(!1), [D, W] = w.useState(h !== "system" ? h : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), R = w.useRef(null), F = s.join("+").replace(/Key/g, "").replace(/Digit/g, ""), L = w.useRef(null), z = w.useRef(!1), ne = w.useCallback((H) => {
    O((q) => {
      var K;
      return (K = q.find((de) => de.id === H.id)) != null && K.delete || Re.dismiss(H.id), q.filter(({ id: de }) => de !== H.id);
    });
  }, []);
  return w.useEffect(() => Re.subscribe((H) => {
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
      Fa.flushSync(() => {
        O((q) => {
          const K = q.findIndex((de) => de.id === H.id);
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
    k
  ]), w.useEffect(() => {
    if (h !== "system") {
      W(h);
      return;
    }
    if (h === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? W("dark") : W("light")), typeof window > "u") return;
    const H = window.matchMedia("(prefers-color-scheme: dark)");
    try {
      H.addEventListener("change", ({ matches: q }) => {
        W(q ? "dark" : "light");
      });
    } catch {
      H.addListener(({ matches: K }) => {
        try {
          W(K ? "dark" : "light");
        } catch (de) {
          console.error(de);
        }
      });
    }
  }, [
    h
  ]), w.useEffect(() => {
    k.length <= 1 && B(!1);
  }, [
    k
  ]), w.useEffect(() => {
    const H = (q) => {
      var K;
      if (s.every((Q) => q[Q] || q.code === Q)) {
        var fe;
        B(!0), (fe = R.current) == null || fe.focus();
      }
      q.code === "Escape" && (document.activeElement === R.current || (K = R.current) != null && K.contains(document.activeElement)) && B(!1);
    };
    return document.addEventListener("keydown", H), () => document.removeEventListener("keydown", H);
  }, [
    s
  ]), w.useEffect(() => {
    if (R.current)
      return () => {
        L.current && (L.current.focus({
          preventScroll: !0
        }), L.current = null, z.current = !1);
      };
  }, [
    R.current
  ]), // Remove item from normal navigation flow, only available via hotkey
  /* @__PURE__ */ w.createElement("section", {
    ref: n,
    "aria-label": `${N} ${F}`,
    tabIndex: -1,
    "aria-live": "polite",
    "aria-relevant": "additions text",
    "aria-atomic": "false",
    suppressHydrationWarning: !0
  }, Y.map((H, q) => {
    var K;
    const [de, fe] = H.split("-");
    return T.length ? /* @__PURE__ */ w.createElement("ol", {
      key: H,
      dir: x === "auto" ? Ia() : x,
      tabIndex: -1,
      ref: R,
      className: l,
      "data-sonner-toaster": !0,
      "data-sonner-theme": D,
      "data-y-position": de,
      "data-x-position": fe,
      style: {
        "--front-toast-height": `${((K = _[0]) == null ? void 0 : K.height) || 0}px`,
        "--width": `${Iy}px`,
        "--gap": `${C}px`,
        ...g,
        ...By(u, d)
      },
      onBlur: (Q) => {
        z.current && !Q.currentTarget.contains(Q.relatedTarget) && (z.current = !1, L.current && (L.current.focus({
          preventScroll: !0
        }), L.current = null));
      },
      onFocus: (Q) => {
        Q.target instanceof HTMLElement && Q.target.dataset.dismissible === "false" || z.current || (z.current = !0, L.current = Q.relatedTarget);
      },
      onMouseEnter: () => B(!0),
      onMouseMove: () => B(!0),
      onMouseLeave: () => {
        S || B(!1);
      },
      onDragEnd: () => B(!1),
      onPointerDown: (Q) => {
        Q.target instanceof HTMLElement && Q.target.dataset.dismissible === "false" || A(!0);
      },
      onPointerUp: () => A(!1)
    }, T.filter((Q) => !Q.position && q === 0 || Q.position === H).map((Q, me) => {
      var ie, ye;
      return /* @__PURE__ */ w.createElement(Ly, {
        key: Q.id,
        icons: M,
        index: me,
        toast: Q,
        defaultRichColors: m,
        duration: (ie = b == null ? void 0 : b.duration) != null ? ie : v,
        className: b == null ? void 0 : b.className,
        descriptionClassName: b == null ? void 0 : b.descriptionClassName,
        invert: o,
        visibleToasts: y,
        closeButton: (ye = b == null ? void 0 : b.closeButton) != null ? ye : c,
        interacting: S,
        position: H,
        style: b == null ? void 0 : b.style,
        unstyled: b == null ? void 0 : b.unstyled,
        classNames: b == null ? void 0 : b.classNames,
        cancelButtonStyle: b == null ? void 0 : b.cancelButtonStyle,
        actionButtonStyle: b == null ? void 0 : b.actionButtonStyle,
        closeButtonAriaLabel: b == null ? void 0 : b.closeButtonAriaLabel,
        removeToast: ne,
        toasts: T.filter((we) => we.position == Q.position),
        heights: _.filter((we) => we.position == Q.position),
        setHeights: $,
        expandByDefault: i,
        gap: C,
        expanded: P,
        swipeDirections: t.swipeDirections
      });
    })) : null;
  }));
}), fv = ({ position: e = "bottom-center", ...t }) => /* @__PURE__ */ f(
  Hy,
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
var zy = Object.freeze({
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
}), Vy = "VisuallyHidden", Fc = p.forwardRef(
  (e, t) => /* @__PURE__ */ f(
    oe.span,
    {
      ...e,
      ref: t,
      style: { ...zy, ...e.style }
    }
  )
);
Fc.displayName = Vy;
var jy = Fc, [Cr] = We("Tooltip", [
  sr
]), kr = sr(), Yc = "TooltipProvider", Gy = 700, no = "tooltip.open", [Uy, Bo] = Cr(Yc), Lc = (e) => {
  const {
    __scopeTooltip: t,
    delayDuration: n = Gy,
    skipDelayDuration: r = 300,
    disableHoverableContent: o = !1,
    children: a
  } = e, s = p.useRef(!0), i = p.useRef(!1), c = p.useRef(0);
  return p.useEffect(() => {
    const l = c.current;
    return () => window.clearTimeout(l);
  }, []), /* @__PURE__ */ f(
    Uy,
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
Lc.displayName = Yc;
var xn = "Tooltip", [qy, En] = Cr(xn), Bc = (e) => {
  const {
    __scopeTooltip: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: a,
    disableHoverableContent: s,
    delayDuration: i
  } = e, c = Bo(xn, e.__scopeTooltip), l = kr(t), [u, d] = p.useState(null), h = kt(), m = p.useRef(0), v = s ?? c.disableHoverableContent, g = i ?? c.delayDuration, y = p.useRef(!1), [b, x] = ot({
    prop: r,
    defaultProp: o ?? !1,
    onChange: (O) => {
      O ? (c.onOpen(), document.dispatchEvent(new CustomEvent(no))) : c.onClose(), a == null || a(O);
    },
    caller: xn
  }), C = p.useMemo(() => b ? y.current ? "delayed-open" : "instant-open" : "closed", [b]), M = p.useCallback(() => {
    window.clearTimeout(m.current), m.current = 0, y.current = !1, x(!0);
  }, [x]), N = p.useCallback(() => {
    window.clearTimeout(m.current), m.current = 0, x(!1);
  }, [x]), k = p.useCallback(() => {
    window.clearTimeout(m.current), m.current = window.setTimeout(() => {
      y.current = !0, x(!0), m.current = 0;
    }, g);
  }, [g, x]);
  return p.useEffect(() => () => {
    m.current && (window.clearTimeout(m.current), m.current = 0);
  }, []), /* @__PURE__ */ f(ws, { ...l, children: /* @__PURE__ */ f(
    qy,
    {
      scope: t,
      contentId: h,
      open: b,
      stateAttribute: C,
      trigger: u,
      onTriggerChange: d,
      onTriggerEnter: p.useCallback(() => {
        c.isOpenDelayedRef.current ? k() : M();
      }, [c.isOpenDelayedRef, k, M]),
      onTriggerLeave: p.useCallback(() => {
        v ? N() : (window.clearTimeout(m.current), m.current = 0);
      }, [N, v]),
      onOpen: M,
      onClose: N,
      disableHoverableContent: v,
      children: n
    }
  ) });
};
Bc.displayName = xn;
var ro = "TooltipTrigger", Hc = p.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, o = En(ro, n), a = Bo(ro, n), s = kr(n), i = p.useRef(null), c = le(t, i, o.onTriggerChange), l = p.useRef(!1), u = p.useRef(!1), d = p.useCallback(() => l.current = !1, []);
    return p.useEffect(() => () => document.removeEventListener("pointerup", d), [d]), /* @__PURE__ */ f(bo, { asChild: !0, ...s, children: /* @__PURE__ */ f(
      oe.button,
      {
        "aria-describedby": o.open ? o.contentId : void 0,
        "data-state": o.stateAttribute,
        ...r,
        ref: c,
        onPointerMove: ee(e.onPointerMove, (h) => {
          h.pointerType !== "touch" && !u.current && !a.isPointerInTransitRef.current && (o.onTriggerEnter(), u.current = !0);
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
Hc.displayName = ro;
var Ho = "TooltipPortal", [Xy, Ky] = Cr(Ho, {
  forceMount: void 0
}), zc = (e) => {
  const { __scopeTooltip: t, forceMount: n, children: r, container: o } = e, a = En(Ho, t);
  return /* @__PURE__ */ f(Xy, { scope: t, forceMount: n, children: /* @__PURE__ */ f(Ve, { present: n || a.open, children: /* @__PURE__ */ f(ir, { asChild: !0, container: o, children: r }) }) });
};
zc.displayName = Ho;
var tn = "TooltipContent", Vc = p.forwardRef(
  (e, t) => {
    const n = Ky(tn, e.__scopeTooltip), { forceMount: r = n.forceMount, side: o = "top", ...a } = e, s = En(tn, e.__scopeTooltip);
    return /* @__PURE__ */ f(Ve, { present: r || s.open, children: s.disableHoverableContent ? /* @__PURE__ */ f(jc, { side: o, ...a, ref: t }) : /* @__PURE__ */ f(Zy, { side: o, ...a, ref: t }) });
  }
), Zy = p.forwardRef((e, t) => {
  const n = En(tn, e.__scopeTooltip), r = Bo(tn, e.__scopeTooltip), o = p.useRef(null), a = le(t, o), [s, i] = p.useState(null), { trigger: c, onClose: l } = n, u = o.current, { onPointerInTransitChange: d } = r, h = p.useCallback(() => {
    i(null), d(!1);
  }, [d]), m = p.useCallback(
    (v, g) => {
      const y = v.currentTarget, b = { x: v.clientX, y: v.clientY }, x = t0(b, y.getBoundingClientRect()), C = n0(b, x), M = r0(g.getBoundingClientRect()), N = a0([...C, ...M]);
      i(N), d(!0);
    },
    [d]
  );
  return p.useEffect(() => () => h(), [h]), p.useEffect(() => {
    if (c && u) {
      const v = (y) => m(y, u), g = (y) => m(y, c);
      return c.addEventListener("pointerleave", v), u.addEventListener("pointerleave", g), () => {
        c.removeEventListener("pointerleave", v), u.removeEventListener("pointerleave", g);
      };
    }
  }, [c, u, m, h]), p.useEffect(() => {
    if (s) {
      const v = (g) => {
        const y = g.target, b = { x: g.clientX, y: g.clientY }, x = (c == null ? void 0 : c.contains(y)) || (u == null ? void 0 : u.contains(y)), C = !o0(b, s);
        x ? h() : C && (h(), l());
      };
      return document.addEventListener("pointermove", v), () => document.removeEventListener("pointermove", v);
    }
  }, [c, u, s, l, h]), /* @__PURE__ */ f(jc, { ...e, ref: a });
}), [Qy, Jy] = Cr(xn, { isInside: !1 }), e0 = /* @__PURE__ */ Bl("TooltipContent"), jc = p.forwardRef(
  (e, t) => {
    const {
      __scopeTooltip: n,
      children: r,
      "aria-label": o,
      onEscapeKeyDown: a,
      onPointerDownOutside: s,
      ...i
    } = e, c = En(tn, n), l = kr(n), { onClose: u } = c;
    return p.useEffect(() => (document.addEventListener(no, u), () => document.removeEventListener(no, u)), [u]), p.useEffect(() => {
      if (c.trigger) {
        const d = (h) => {
          const m = h.target;
          m != null && m.contains(c.trigger) && u();
        };
        return window.addEventListener("scroll", d, { capture: !0 }), () => window.removeEventListener("scroll", d, { capture: !0 });
      }
    }, [c.trigger, u]), /* @__PURE__ */ f(
      er,
      {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: a,
        onPointerDownOutside: s,
        onFocusOutside: (d) => d.preventDefault(),
        onDismiss: u,
        children: /* @__PURE__ */ I(
          xs,
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
              /* @__PURE__ */ f(e0, { children: r }),
              /* @__PURE__ */ f(Qy, { scope: n, isInside: !0, children: /* @__PURE__ */ f(jy, { id: c.contentId, role: "tooltip", children: o || r }) })
            ]
          }
        )
      }
    );
  }
);
Vc.displayName = tn;
var Gc = "TooltipArrow", Uc = p.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, o = kr(n);
    return Jy(
      Gc,
      n
    ).isInside ? null : /* @__PURE__ */ f(Cs, { ...o, ...r, ref: t });
  }
);
Uc.displayName = Gc;
function t0(e, t) {
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
function n0(e, t, n = 5) {
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
function r0(e) {
  const { top: t, right: n, bottom: r, left: o } = e;
  return [
    { x: o, y: t },
    { x: n, y: t },
    { x: n, y: r },
    { x: o, y: r }
  ];
}
function o0(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let a = 0, s = t.length - 1; a < t.length; s = a++) {
    const i = t[a], c = t[s], l = i.x, u = i.y, d = c.x, h = c.y;
    u > r != h > r && n < (d - l) * (r - u) / (h - u) + l && (o = !o);
  }
  return o;
}
function a0(e) {
  const t = e.slice();
  return t.sort((n, r) => n.x < r.x ? -1 : n.x > r.x ? 1 : n.y < r.y ? -1 : n.y > r.y ? 1 : 0), s0(t);
}
function s0(e) {
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
var i0 = Lc, c0 = Bc, l0 = Hc, d0 = zc, u0 = Vc, f0 = Uc;
const h0 = w.forwardRef(
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
    className: h,
    ...m
  }, v) => /* @__PURE__ */ f(
    i0,
    {
      delayDuration: a,
      skipDelayDuration: s,
      disableHoverableContent: i,
      children: /* @__PURE__ */ I(
        c0,
        {
          open: l,
          defaultOpen: u,
          onOpenChange: d,
          children: [
            /* @__PURE__ */ f(l0, { asChild: !0, children: e }),
            /* @__PURE__ */ f(d0, { children: /* @__PURE__ */ I(
              u0,
              {
                ref: v,
                side: n,
                sideOffset: r,
                align: o,
                className: E(
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
                  h
                ),
                ...m,
                children: [
                  t,
                  c && /* @__PURE__ */ f(f0, { className: "fill-cms-black" })
                ]
              }
            ) })
          ]
        }
      )
    }
  )
);
h0.displayName = "ToolTip";
const m0 = De(E("w-full caption-bottom text-sm [border-spacing:0]"), {
  variants: {
    bordered: {
      true: "",
      false: ""
    }
  },
  defaultVariants: {
    bordered: !1
  }
}), p0 = w.forwardRef(
  ({ className: e, striped: t, hoverable: n, bordered: r, compact: o, ...a }, s) => /* @__PURE__ */ f(
    "div",
    {
      className: E(
        "relative w-full overflow-auto",
        r && "border border-cms-gray-300 rounded-lg"
      ),
      children: /* @__PURE__ */ f(
        "table",
        {
          ref: s,
          className: E(m0({ bordered: r }), e),
          "data-striped": t,
          "data-hoverable": n,
          "data-compact": o,
          ...a
        }
      )
    }
  )
);
p0.displayName = "Table";
const g0 = w.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ f(
  "thead",
  {
    ref: n,
    className: E(
      "[&_tr]:border-0",
      "[&_th:first-child]:rounded-tl-lg",
      "[&_th:last-child]:rounded-tr-lg",
      e
    ),
    ...t
  }
));
g0.displayName = "TableHeader";
const b0 = w.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ f(
  "tbody",
  {
    ref: n,
    className: E("[&_tr:last-child]:border-0", e),
    ...t
  }
));
b0.displayName = "TableBody";
const y0 = w.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ f(
  "tfoot",
  {
    ref: n,
    className: E(
      "border-t bg-cms-gray-50 font-medium [&>tr]:last:border-b-0",
      e
    ),
    ...t
  }
));
y0.displayName = "TableFooter";
const v0 = De(E("border-b border-cms-gray-200"), {
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
}), w0 = w.forwardRef(
  ({ className: e, selected: t, ...n }, r) => {
    var i, c, l;
    const o = (i = r == null ? void 0 : r.current) == null ? void 0 : i.closest("table"), a = ((c = o == null ? void 0 : o.dataset) == null ? void 0 : c.hoverable) === "true", s = ((l = o == null ? void 0 : o.dataset) == null ? void 0 : l.striped) === "true";
    return /* @__PURE__ */ f(
      "tr",
      {
        ref: r,
        className: E(
          v0({ hoverable: a, selected: t }),
          s && "even:bg-cms-gray-50",
          e
        ),
        "aria-selected": t,
        ...n
      }
    );
  }
);
w0.displayName = "TableRow";
const x0 = w.forwardRef(
  ({
    className: e,
    children: t,
    sortable: n,
    sortDirection: r,
    onSort: o,
    scope: a = "col",
    ...s
  }, i) => {
    const l = /* @__PURE__ */ I(Tt, { children: [
      t,
      n ? r === "asc" ? /* @__PURE__ */ f(Sg, { className: "ml-2 h-4 w-4" }) : r === "desc" ? /* @__PURE__ */ f(ki, { className: "ml-2 h-4 w-4" }) : /* @__PURE__ */ f(Og, { className: "ml-2 h-4 w-4 opacity-50" }) : null
    ] });
    return /* @__PURE__ */ f(
      "th",
      {
        ref: i,
        scope: a,
        className: E(
          "h-12 px-4 text-left align-middle font-semibold text-cms-gray-800",
          "bg-amber-50 border-0",
          "[&:has([role=checkbox])]:pr-0",
          n && "cursor-pointer select-none hover:bg-amber-100",
          e
        ),
        onClick: n ? o : void 0,
        "aria-sort": r === "asc" ? "ascending" : r === "desc" ? "descending" : void 0,
        ...s,
        children: n ? /* @__PURE__ */ f("div", { className: "flex items-center", children: l }) : l
      }
    );
  }
);
x0.displayName = "TableHead";
const C0 = De(E("p-4 align-middle [&:has([role=checkbox])]:pr-0"), {
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
}), k0 = w.forwardRef(
  ({ className: e, align: t, ...n }, r) => {
    var s, i;
    const o = (s = r == null ? void 0 : r.current) == null ? void 0 : s.closest("table"), a = ((i = o == null ? void 0 : o.dataset) == null ? void 0 : i.compact) === "true";
    return /* @__PURE__ */ f(
      "td",
      {
        ref: r,
        className: E(
          C0({ align: t }),
          a && "p-2",
          e
        ),
        ...n
      }
    );
  }
);
k0.displayName = "TableCell";
const M0 = w.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ f(
  "caption",
  {
    ref: n,
    className: E("mt-4 text-sm text-cms-gray-600", e),
    ...t
  }
));
M0.displayName = "TableCaption";
const N0 = ({
  value: e = [],
  onChange: t,
  maxFiles: n = 1,
  maxSize: r = 5 * 1024 * 1024,
  // 5MB
  accept: o = { "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"] },
  disabled: a = !1,
  className: s,
  showPreview: i = !0,
  error: c = !1,
  onError: l,
  validateImage: u,
  placeholder: d = "클릭하거나 파일을 드래그하세요",
  placeholderActive: h = "파일을 여기에 놓으세요"
}) => {
  const [m, v] = be(e), g = (T) => new Promise((Y, _) => {
    const $ = new Image(), P = URL.createObjectURL(T);
    $.onload = () => {
      URL.revokeObjectURL(P), Y({
        width: $.width,
        height: $.height,
        aspectRatio: $.width / $.height,
        size: T.size
      });
    }, $.onerror = () => {
      URL.revokeObjectURL(P), _(new Error("이미지를 로드할 수 없습니다."));
    }, $.src = P;
  }), y = Ee(
    async (T, Y) => {
      if (Y.length > 0) {
        const _ = Y[0].errors[0];
        _.code === "file-too-large" ? l == null || l(`파일 크기는 ${r / 1024 / 1024}MB를 초과할 수 없습니다.`) : _.code === "file-invalid-type" ? l == null || l("지원하지 않는 파일 형식입니다.") : _.code === "too-many-files" && (l == null || l(`최대 ${n}개의 파일만 업로드할 수 있습니다.`));
        return;
      }
      if (u) {
        const _ = [];
        for (const P of T)
          try {
            const B = await g(P), S = await u(P, B);
            if (S) {
              l == null || l(S);
              continue;
            }
            _.push(P);
          } catch (B) {
            l == null || l(B.message);
          }
        if (_.length === 0) return;
        const $ = n === 1 ? _ : [...m, ..._].slice(0, n);
        v($), t == null || t($);
      } else {
        const _ = n === 1 ? T : [...m, ...T].slice(0, n);
        v(_), t == null || t(_);
      }
    },
    [m, n, r, t, l, u]
  ), { getRootProps: b, getInputProps: x, isDragActive: C } = Ya({
    onDrop: y,
    accept: o,
    maxSize: r,
    maxFiles: n,
    disabled: a,
    multiple: n > 1
  }), M = (T) => {
    const Y = m.filter((_, $) => $ !== T);
    v(Y), t == null || t(Y);
  }, N = n === 1, k = m.length > 0, O = m.length >= n;
  return /* @__PURE__ */ I("div", { className: E("w-full", s), children: [
    !(!N && O) && /* @__PURE__ */ I(
      "div",
      {
        ...b(),
        className: E(
          "relative rounded-md border-2 border-solid",
          "transition-colors cursor-pointer",
          "flex flex-col items-center justify-center",
          "min-h-[200px]",
          c ? "border-red-500" : C ? "border-cms-black bg-cms-gray-100" : "border-cms-gray-300 bg-white hover:bg-cms-gray-50",
          a && "opacity-50 cursor-not-allowed pointer-events-none",
          N && k && "p-0"
        ),
        children: [
          /* @__PURE__ */ f("input", { ...x() }),
          N && k && i ? /* @__PURE__ */ I("div", { className: "relative w-full h-full min-h-[200px] group flex items-center justify-center bg-cms-gray-100 rounded-md overflow-hidden", children: [
            /* @__PURE__ */ f(
              "img",
              {
                src: URL.createObjectURL(m[0]),
                alt: m[0].name,
                className: "max-w-full max-h-full object-contain"
              }
            ),
            /* @__PURE__ */ f(
              "button",
              {
                type: "button",
                onClick: (T) => {
                  T.stopPropagation(), M(0);
                },
                className: E(
                  "absolute top-2 right-2",
                  "w-8 h-8 rounded-full",
                  "flex items-center justify-center",
                  "bg-white shadow-md",
                  "hover:bg-cms-gray-100",
                  "cursor-pointer",
                  "border-none"
                ),
                "aria-label": "파일 제거",
                children: /* @__PURE__ */ f(Un, { className: "w-4 h-4" })
              }
            )
          ] }) : /* @__PURE__ */ I("div", { className: "p-6 flex flex-col items-center", children: [
            /* @__PURE__ */ f(_l, { className: "text-cms-gray-400" }),
            /* @__PURE__ */ f("p", { className: "mt-4 text-sm font-medium text-cms-black text-center", children: C ? h : d }),
            /* @__PURE__ */ I("p", { className: "mt-1 text-xs text-cms-gray-400 text-center", children: [
              n > 1 ? `최대 ${n}개` : "1개",
              " 파일, 최대",
              " ",
              r / 1024 / 1024,
              "MB"
            ] })
          ] })
        ]
      }
    ),
    !N && i && m.length > 0 && /* @__PURE__ */ f("div", { className: "mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 justify-items-center", children: m.map((T, Y) => /* @__PURE__ */ I(
      "div",
      {
        className: "relative group rounded-md overflow-hidden border border-cms-gray-300",
        children: [
          /* @__PURE__ */ f("div", { className: "aspect-square bg-cms-gray-100", children: /* @__PURE__ */ f(
            "img",
            {
              src: URL.createObjectURL(T),
              alt: T.name,
              className: "w-full h-full object-cover"
            }
          ) }),
          /* @__PURE__ */ f(
            "button",
            {
              type: "button",
              onClick: (_) => {
                _.stopPropagation(), M(Y);
              },
              className: E(
                "absolute top-2 right-2",
                "w-7 h-7 rounded-full",
                "flex items-center justify-center",
                "bg-white shadow-md",
                "hover:bg-cms-gray-100",
                "cursor-pointer",
                "border-none"
              ),
              "aria-label": "파일 제거",
              children: /* @__PURE__ */ f(Un, { className: "w-3 h-3" })
            }
          ),
          /* @__PURE__ */ I("div", { className: "px-2 py-1.5 bg-white border-t border-cms-gray-300", children: [
            /* @__PURE__ */ f("p", { className: "text-xs text-cms-gray-600 truncate", children: T.name }),
            /* @__PURE__ */ I("p", { className: "text-xs text-cms-gray-400", children: [
              (T.size / 1024).toFixed(1),
              " KB"
            ] })
          ] })
        ]
      },
      Y
    )) })
  ] });
};
N0.displayName = "ImageUpload";
const S0 = ({
  value: e = [],
  onChange: t,
  maxFiles: n = 5,
  maxSize: r = 10 * 1024 * 1024,
  // 10MB
  accept: o,
  disabled: a = !1,
  className: s,
  onError: i
}) => {
  const [c, l] = be(e), u = Ee(
    (b, x) => {
      if (x.length > 0) {
        const M = x[0].errors[0];
        M.code === "file-too-large" ? i == null || i(
          `파일 크기는 ${r / 1024 / 1024}MB를 초과할 수 없습니다.`
        ) : M.code === "file-invalid-type" ? i == null || i("지원하지 않는 파일 형식입니다.") : M.code === "too-many-files" && (i == null || i(`최대 ${n}개의 파일만 업로드할 수 있습니다.`));
        return;
      }
      const C = [...c, ...b].slice(0, n);
      l(C), t == null || t(C);
    },
    [c, n, r, t, i]
  ), { getRootProps: d, getInputProps: h, isDragActive: m } = Ya({
    onDrop: u,
    accept: o,
    maxSize: r,
    maxFiles: n,
    disabled: a,
    multiple: n > 1
  }), v = (b) => {
    const x = c.filter((C, M) => M !== b);
    l(x), t == null || t(x);
  }, g = (b) => b < 1024 ? `${b} B` : b < 1024 * 1024 ? `${(b / 1024).toFixed(1)} KB` : `${(b / 1024 / 1024).toFixed(1)} MB`, y = c.length >= n;
  return /* @__PURE__ */ I("div", { className: E("w-full", s), children: [
    !y && /* @__PURE__ */ I(
      "div",
      {
        ...d(),
        className: E(
          "relative rounded-md border-2 border-dashed",
          "transition-colors cursor-pointer",
          "flex flex-col items-center justify-center",
          "min-h-[200px] p-6",
          m ? "border-cms-black bg-cms-gray-100" : "border-cms-gray-300 bg-white hover:bg-cms-gray-50",
          a && "opacity-50 cursor-not-allowed pointer-events-none"
        ),
        children: [
          /* @__PURE__ */ f("input", { ...h() }),
          /* @__PURE__ */ f(Al, { className: "text-cms-gray-400" }),
          /* @__PURE__ */ f("p", { className: "mt-4 text-sm font-medium text-cms-black text-center", children: m ? "파일을 여기에 놓으세요" : "클릭하거나 파일을 드래그하세요" }),
          /* @__PURE__ */ I("p", { className: "mt-1 text-xs text-cms-gray-400 text-center", children: [
            "최대 ",
            n,
            "개 파일, 최대 ",
            r / 1024 / 1024,
            "MB"
          ] })
        ]
      }
    ),
    c.length > 0 && /* @__PURE__ */ f("div", { className: E("space-y-1.5", y ? "" : "mt-4"), children: c.map((b, x) => /* @__PURE__ */ I(
      "div",
      {
        className: E(
          "flex items-center gap-2 px-3 py-2",
          "rounded-md border border-cms-gray-300",
          "bg-white hover:bg-cms-gray-50",
          "transition-colors group"
        ),
        children: [
          /* @__PURE__ */ f(Tl, { className: "w-8 h-8" }),
          /* @__PURE__ */ I("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ f("p", { className: "text-sm font-medium text-cms-black truncate leading-tight", children: b.name }),
            /* @__PURE__ */ f("p", { className: "text-xs text-cms-gray-400 leading-tight", children: g(b.size) })
          ] }),
          /* @__PURE__ */ f(
            "button",
            {
              type: "button",
              onClick: () => v(x),
              className: E(
                "w-7 h-7 rounded-full shrink-0",
                "flex items-center justify-center",
                "text-cms-gray-400",
                "hover:bg-cms-gray-100 hover:text-cms-black",
                "transition-colors",
                "border-none"
              ),
              "aria-label": "파일 제거",
              children: /* @__PURE__ */ f(Un, { className: "w-4 h-4" })
            }
          )
        ]
      },
      x
    )) })
  ] });
};
S0.displayName = "FileUpload";
export {
  B0 as AlignIcon,
  F0 as ArrowLeftIcon,
  Y0 as ArrowRightIcon,
  ut as Button,
  av as CalendarIcon,
  z0 as CheckCircleIcon,
  H0 as CheckIcon,
  Gb as Checkbox,
  Pl as ChevronDownIcon,
  _0 as ChevronLeftIcon,
  I0 as ChevronRightIcon,
  A0 as ChevronUpIcon,
  W0 as ChevronsLeftIcon,
  $0 as ChevronsRightIcon,
  q0 as CloseIcon,
  $l as Combobox,
  uy as ConfirmModal,
  dg as DatePicker,
  fg as DateRangePicker,
  fy as DeleteModal,
  so as Dropdown,
  j0 as ErrorIcon,
  hy as ErrorModal,
  ov as ExcelIcon,
  Tl as FileIcon,
  rv as FileTextIcon,
  S0 as FileUpload,
  Al as FileUploadIcon,
  U0 as HelpIcon,
  N0 as ImageUpload,
  _l as ImageUploadIcon,
  V0 as InfoIcon,
  tv as LinkIcon,
  T0 as LoadingCircle,
  sv as MedicashIcon,
  L0 as MenuIcon,
  sn as Modal,
  iv as NewBadgeIcon,
  Bb as Pagination,
  nv as PinIcon,
  K0 as PlusCircleIcon,
  X0 as PlusIcon,
  cv as Popover,
  Pf as PopoverContent,
  Af as PopoverMenuItem,
  lv as PopoverTrigger,
  mb as RadioGroup,
  bb as RadioGroupItem,
  ev as RefreshIcon,
  Q0 as SaveIcon,
  Wl as Select,
  J0 as SettingsIcon,
  Yb as SideNavigation,
  py as SuccessModal,
  Vg as Switch,
  p0 as Table,
  b0 as TableBody,
  M0 as TableCaption,
  k0 as TableCell,
  y0 as TableFooter,
  x0 as TableHead,
  g0 as TableHeader,
  w0 as TableRow,
  If as Text,
  Ff as TextInput,
  $g as TimePicker,
  fv as Toaster,
  h0 as ToolTip,
  Z0 as TrashIcon,
  G0 as WarningIcon,
  my as WarningModal,
  Un as XIcon,
  Ol as buttonVariants,
  E as cn,
  Il as dropdownTriggerVariants,
  Tf as popoverMenuItemVariants,
  uv as toast
};
//# sourceMappingURL=index.es.js.map
