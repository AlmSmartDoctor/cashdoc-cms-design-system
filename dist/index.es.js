import { jsx as C, jsxs as H } from "react/jsx-runtime";
import * as m from "react";
import ie, { forwardRef as Ee, useState as Me, useRef as Wt, useEffect as zt, useLayoutEffect as kr } from "react";
import * as hn from "react-dom";
import Mr from "react-dom";
function gn(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (n = gn(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function vn() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++) (e = arguments[n]) && (t = gn(e)) && (r && (r += " "), r += t);
  return r;
}
const yt = "-", Tr = (e) => {
  const t = Dr(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (a) => {
      const i = a.split(yt);
      return i[0] === "" && i.length !== 1 && i.shift(), bn(i, t) || Lr(a);
    },
    getConflictingClassGroupIds: (a, i) => {
      const l = n[a] || [];
      return i && r[a] ? [...l, ...r[a]] : l;
    }
  };
}, bn = (e, t) => {
  var a;
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], r = t.nextPart.get(n), o = r ? bn(e.slice(1), r) : void 0;
  if (o)
    return o;
  if (t.validators.length === 0)
    return;
  const s = e.join(yt);
  return (a = t.validators.find(({
    validator: i
  }) => i(s))) == null ? void 0 : a.classGroupId;
}, $t = /^\[(.+)\]$/, Lr = (e) => {
  if ($t.test(e)) {
    const t = $t.exec(e)[1], n = t == null ? void 0 : t.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, Dr = (e) => {
  const {
    theme: t,
    prefix: n
  } = e, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return Ir(Object.entries(e.classGroups), n).forEach(([s, a]) => {
    mt(a, r, s, t);
  }), r;
}, mt = (e, t, n, r) => {
  e.forEach((o) => {
    if (typeof o == "string") {
      const s = o === "" ? t : Bt(t, o);
      s.classGroupId = n;
      return;
    }
    if (typeof o == "function") {
      if (_r(o)) {
        mt(o(r), t, n, r);
        return;
      }
      t.validators.push({
        validator: o,
        classGroupId: n
      });
      return;
    }
    Object.entries(o).forEach(([s, a]) => {
      mt(a, Bt(t, s), n, r);
    });
  });
}, Bt = (e, t) => {
  let n = e;
  return t.split(yt).forEach((r) => {
    n.nextPart.has(r) || n.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(r);
  }), n;
}, _r = (e) => e.isThemeGetter, Ir = (e, t) => t ? e.map(([n, r]) => {
  const o = r.map((s) => typeof s == "string" ? t + s : typeof s == "object" ? Object.fromEntries(Object.entries(s).map(([a, i]) => [t + a, i])) : s);
  return [n, o];
}) : e, Fr = (e) => {
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
}, yn = "!", Wr = (e) => {
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
    const p = l.length === 0 ? i : i.substring(u), h = p.startsWith(yn), b = h ? p.substring(1) : p, f = d && d > u ? d - u : void 0;
    return {
      modifiers: l,
      hasImportantModifier: h,
      baseClassName: b,
      maybePostfixModifierPosition: f
    };
  };
  return n ? (i) => n({
    className: i,
    parseClassName: a
  }) : a;
}, zr = (e) => {
  if (e.length <= 1)
    return e;
  const t = [];
  let n = [];
  return e.forEach((r) => {
    r[0] === "[" ? (t.push(...n.sort(), r), n = []) : n.push(r);
  }), t.push(...n.sort()), t;
}, $r = (e) => ({
  cache: Fr(e.cacheSize),
  parseClassName: Wr(e),
  ...Tr(e)
}), Br = /\s+/, jr = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: r,
    getConflictingClassGroupIds: o
  } = t, s = [], a = e.trim().split(Br);
  let i = "";
  for (let l = a.length - 1; l >= 0; l -= 1) {
    const c = a[l], {
      modifiers: u,
      hasImportantModifier: d,
      baseClassName: p,
      maybePostfixModifierPosition: h
    } = n(c);
    let b = !!h, f = r(b ? p.substring(0, h) : p);
    if (!f) {
      if (!b) {
        i = c + (i.length > 0 ? " " + i : i);
        continue;
      }
      if (f = r(p), !f) {
        i = c + (i.length > 0 ? " " + i : i);
        continue;
      }
      b = !1;
    }
    const g = zr(u).join(":"), v = d ? g + yn : g, y = v + f;
    if (s.includes(y))
      continue;
    s.push(y);
    const w = o(f, b);
    for (let x = 0; x < w.length; ++x) {
      const S = w[x];
      s.push(v + S);
    }
    i = c + (i.length > 0 ? " " + i : i);
  }
  return i;
};
function Vr() {
  let e = 0, t, n, r = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = wn(t)) && (r && (r += " "), r += n);
  return r;
}
const wn = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (t = wn(e[r])) && (n && (n += " "), n += t);
  return n;
};
function Hr(e, ...t) {
  let n, r, o, s = a;
  function a(l) {
    const c = t.reduce((u, d) => d(u), e());
    return n = $r(c), r = n.cache.get, o = n.cache.set, s = i, i(l);
  }
  function i(l) {
    const c = r(l);
    if (c)
      return c;
    const u = jr(l, n);
    return o(l, u), u;
  }
  return function() {
    return s(Vr.apply(null, arguments));
  };
}
const _ = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, xn = /^\[(?:([a-z-]+):)?(.+)\]$/i, Ur = /^\d+\/\d+$/, Gr = /* @__PURE__ */ new Set(["px", "full", "screen"]), Yr = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Xr = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Kr = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, Zr = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, qr = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, J = (e) => be(e) || Gr.has(e) || Ur.test(e), re = (e) => Pe(e, "length", so), be = (e) => !!e && !Number.isNaN(Number(e)), rt = (e) => Pe(e, "number", be), Ne = (e) => !!e && Number.isInteger(Number(e)), Qr = (e) => e.endsWith("%") && be(e.slice(0, -1)), O = (e) => xn.test(e), oe = (e) => Yr.test(e), Jr = /* @__PURE__ */ new Set(["length", "size", "percentage"]), eo = (e) => Pe(e, Jr, Cn), to = (e) => Pe(e, "position", Cn), no = /* @__PURE__ */ new Set(["image", "url"]), ro = (e) => Pe(e, no, ao), oo = (e) => Pe(e, "", io), ke = () => !0, Pe = (e, t, n) => {
  const r = xn.exec(e);
  return r ? r[1] ? typeof t == "string" ? r[1] === t : t.has(r[1]) : n(r[2]) : !1;
}, so = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Xr.test(e) && !Kr.test(e)
), Cn = () => !1, io = (e) => Zr.test(e), ao = (e) => qr.test(e), co = () => {
  const e = _("colors"), t = _("spacing"), n = _("blur"), r = _("brightness"), o = _("borderColor"), s = _("borderRadius"), a = _("borderSpacing"), i = _("borderWidth"), l = _("contrast"), c = _("grayscale"), u = _("hueRotate"), d = _("invert"), p = _("gap"), h = _("gradientColorStops"), b = _("gradientColorStopPositions"), f = _("inset"), g = _("margin"), v = _("opacity"), y = _("padding"), w = _("saturate"), x = _("scale"), S = _("sepia"), A = _("skew"), E = _("space"), k = _("translate"), L = () => ["auto", "contain", "none"], M = () => ["auto", "hidden", "clip", "visible", "scroll"], $ = () => ["auto", O, t], R = () => [O, t], I = () => ["", J, re], P = () => ["auto", be, O], F = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], D = () => ["solid", "dashed", "dotted", "double", "none"], W = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], N = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], z = () => ["", "0", O], j = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], B = () => [be, O];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [ke],
      spacing: [J, re],
      blur: ["none", "", oe, O],
      brightness: B(),
      borderColor: [e],
      borderRadius: ["none", "", "full", oe, O],
      borderSpacing: R(),
      borderWidth: I(),
      contrast: B(),
      grayscale: z(),
      hueRotate: B(),
      invert: z(),
      gap: R(),
      gradientColorStops: [e],
      gradientColorStopPositions: [Qr, re],
      inset: $(),
      margin: $(),
      opacity: B(),
      padding: R(),
      saturate: B(),
      scale: B(),
      sepia: z(),
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
        columns: [oe]
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
        object: [...F(), O]
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
        inset: [f]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [f]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [f]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [f]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [f]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [f]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [f]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [f]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [f]
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
        z: ["auto", Ne, O]
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
        order: ["first", "last", "none", Ne, O]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [ke]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", Ne, O]
        }, O]
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
        "grid-rows": [ke]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [Ne, O]
        }, O]
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
          screen: [oe]
        }, oe]
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
        text: ["base", oe, re]
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
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", rt]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [ke]
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
        "line-clamp": ["none", be, rt]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", J, O]
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
        decoration: [...D(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", J, re]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", J, O]
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
        bg: [...F(), to]
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
        bg: ["auto", "cover", "contain", eo]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, ro]
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
        "outline-offset": [J, O]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [J, re]
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
        "ring-offset": [J, re]
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
        shadow: ["", "inner", "none", oe, oo]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [ke]
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
        "drop-shadow": ["", "none", oe, O]
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
        rotate: [Ne, O]
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
        stroke: [J, re, rt]
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
}, lo = /* @__PURE__ */ Hr(co);
function T(...e) {
  return lo(vn(e));
}
const jt = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, Vt = vn, de = (e, t) => (n) => {
  var r;
  if ((t == null ? void 0 : t.variants) == null) return Vt(e, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
  const { variants: o, defaultVariants: s } = t, a = Object.keys(o).map((c) => {
    const u = n == null ? void 0 : n[c], d = s == null ? void 0 : s[c];
    if (u === null) return null;
    const p = jt(u) || jt(d);
    return o[c][p];
  }), i = n && Object.entries(n).reduce((c, u) => {
    let [d, p] = u;
    return p === void 0 || (c[d] = p), c;
  }, {}), l = t == null || (r = t.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((c, u) => {
    let { class: d, className: p, ...h } = u;
    return Object.entries(h).every((b) => {
      let [f, g] = b;
      return Array.isArray(g) ? g.includes({
        ...s,
        ...i
      }[f]) : {
        ...s,
        ...i
      }[f] === g;
    }) ? [
      ...c,
      d,
      p
    ] : c;
  }, []);
  return Vt(e, a, l, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
}, uo = de(
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
), fo = Ee(
  ({ className: e, variant: t, size: n, ...r }, o) => /* @__PURE__ */ C(
    "button",
    {
      className: T(uo({ variant: t, size: n, className: e })),
      ref: o,
      ...r
    }
  )
);
fo.displayName = "Button";
const mo = {
  sm: "h-4 w-4",
  md: "h-8 w-8",
  lg: "h-16 w-16"
};
function _a({ size: e = "lg", className: t }) {
  return /* @__PURE__ */ C("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ C(
    "div",
    {
      className: T(
        mo[e],
        "animate-spin rounded-full border-2 border-cms-gray-500 border-b-transparent",
        t
      )
    }
  ) });
}
const po = de(
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
), ho = ({
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
    className: T(
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
), go = ({ className: e }) => /* @__PURE__ */ C(
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
), wt = Ee(
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
    const [f, g] = Me(!1), [v, y] = Me(""), [w, x] = Me(
      d ? t ? [t] : [] : []
    ), S = Wt(null), A = Wt(null), E = e.find((P) => P.value === t), k = d ? w.length > 0 ? `${w.length}개 선택됨` : n : (E == null ? void 0 : E.label) || n, L = e.filter(
      (P) => P.label.toLowerCase().includes(v.toLowerCase())
    ), M = () => {
      o || (g(!f), y(""));
    }, $ = (P) => {
      if (!P.disabled)
        if (d) {
          const F = w.includes(P.value) ? w.filter((D) => D !== P.value) : [...w, P.value];
          x(F), r == null || r(F.join(","));
        } else
          r == null || r(P.value), g(!1);
    }, R = (P) => {
      P.stopPropagation(), d && x([]), r == null || r("");
    }, I = (P) => {
      P.key === "Escape" ? g(!1) : (P.key === "Enter" || P.key === " ") && (P.preventDefault(), M());
    };
    return zt(() => {
      const P = (F) => {
        S.current && !S.current.contains(F.target) && g(!1);
      };
      return document.addEventListener("mousedown", P), () => document.removeEventListener("mousedown", P);
    }, []), zt(() => {
      f && c && A.current && A.current.focus();
    }, [f, c]), /* @__PURE__ */ H("div", { ref: S, className: "relative w-full", children: [
      /* @__PURE__ */ H(
        "button",
        {
          ref: b,
          type: "button",
          className: T(
            po({ variant: i, size: l }),
            o && "opacity-50 cursor-not-allowed",
            s
          ),
          onClick: M,
          onKeyDown: I,
          disabled: o,
          "aria-expanded": f,
          "aria-haspopup": "listbox",
          ...h,
          children: [
            /* @__PURE__ */ C(
              "span",
              {
                className: T(
                  "truncate flex-1 text-left",
                  !E && !d && "text-cms-gray-400"
                ),
                children: k
              }
            ),
            /* @__PURE__ */ H("div", { className: "flex items-center gap-2 ml-3", children: [
              u && (t || w.length > 0) && /* @__PURE__ */ C(
                "button",
                {
                  type: "button",
                  className: T(
                    "p-1 rounded text-cms-gray-400 transition-colors",
                    "hover:text-cms-black"
                  ),
                  onClick: R,
                  "aria-label": "선택 취소",
                  children: /* @__PURE__ */ C(go, { className: "w-3 h-3" })
                }
              ),
              /* @__PURE__ */ C(
                ho,
                {
                  isOpen: f,
                  className: "w-4 h-4 text-cms-gray-400"
                }
              )
            ] })
          ]
        }
      ),
      f && /* @__PURE__ */ H(
        "div",
        {
          className: T(
            "absolute z-50 mt-1 py-1 w-full",
            "rounded-lg border border-cms-gray-400",
            "bg-white shadow-lg",
            a
          ),
          style: { maxHeight: `${p}px` },
          children: [
            c && /* @__PURE__ */ C("div", { className: "px-3 py-2 border-b border-cms-gray-400", children: /* @__PURE__ */ C(
              "input",
              {
                ref: A,
                type: "text",
                value: v,
                onChange: (P) => y(P.target.value),
                placeholder: "검색...",
                className: T(
                  "w-full px-2 py-1 text-sm",
                  "rounded outline-none",
                  "border border-cms-gray-400",
                  "focus:ring-1 focus:ring-cms-black"
                )
              }
            ) }),
            /* @__PURE__ */ C("div", { className: "max-h-48 overflow-y-auto", children: L.length === 0 ? /* @__PURE__ */ C("div", { className: "px-3 py-2 text-sm text-cms-gray-400 text-center", children: v ? "검색 결과가 없습니다" : "옵션이 없습니다" }) : L.map((P) => {
              const F = d ? w.includes(P.value) : t === P.value;
              return /* @__PURE__ */ H(
                "button",
                {
                  type: "button",
                  className: T(
                    "flex items-center justify-between gap-2",
                    "w-full px-3 py-2 ",
                    "text-left text-sm",
                    "transition-colors",
                    P.disabled ? "text-cms-gray-400 cursor-not-allowed" : "text-cms-black hover:bg-cms-gray-200 cursor-pointer",
                    F && "bg-cms-gray-400 font-medium"
                  ),
                  onClick: () => $(P),
                  disabled: P.disabled,
                  children: [
                    /* @__PURE__ */ C("span", { className: "truncate", children: P.label }),
                    F && /* @__PURE__ */ C(
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
                P.value
              );
            }) })
          ]
        }
      )
    ] });
  }
);
wt.displayName = "Dropdown";
const vo = Ee(
  ({ label: e, helperText: t, error: n, required: r, className: o, ...s }, a) => /* @__PURE__ */ H("div", { className: T("space-y-1", o), children: [
    e && /* @__PURE__ */ H("label", { className: "block text-sm font-medium text-cms-black", children: [
      e,
      r && /* @__PURE__ */ C("span", { className: "text-cms-red-500 ml-1", children: "*" })
    ] }),
    /* @__PURE__ */ C(
      wt,
      {
        ref: a,
        ...s,
        className: T(n && "border-cms-red-500 focus:ring-cms-red-500")
      }
    ),
    (t || n) && /* @__PURE__ */ C(
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
vo.displayName = "Select";
const bo = Ee(
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
    return /* @__PURE__ */ C(
      wt,
      {
        ref: s,
        ...o,
        options: c,
        searchable: !0,
        dropdownClassName: T(t && "opacity-75", o.dropdownClassName),
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
bo.displayName = "Combobox";
function Ia(e) {
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
function Ht(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function Sn(...e) {
  return (t) => {
    let n = !1;
    const r = e.map((o) => {
      const s = Ht(o, t);
      return !n && typeof s == "function" && (n = !0), s;
    });
    if (n)
      return () => {
        for (let o = 0; o < r.length; o++) {
          const s = r[o];
          typeof s == "function" ? s() : Ht(e[o], null);
        }
      };
  };
}
function fe(...e) {
  return m.useCallback(Sn(...e), e);
}
function En(e, t = []) {
  let n = [];
  function r(s, a) {
    const i = m.createContext(a), l = n.length;
    n = [...n, a];
    const c = (d) => {
      var v;
      const { scope: p, children: h, ...b } = d, f = ((v = p == null ? void 0 : p[e]) == null ? void 0 : v[l]) || i, g = m.useMemo(() => b, Object.values(b));
      return /* @__PURE__ */ C(f.Provider, { value: g, children: h });
    };
    c.displayName = s + "Provider";
    function u(d, p) {
      var f;
      const h = ((f = p == null ? void 0 : p[e]) == null ? void 0 : f[l]) || i, b = m.useContext(h);
      if (b) return b;
      if (a !== void 0) return a;
      throw new Error(`\`${d}\` must be used within \`${s}\``);
    }
    return [c, u];
  }
  const o = () => {
    const s = n.map((a) => m.createContext(a));
    return function(i) {
      const l = (i == null ? void 0 : i[e]) || s;
      return m.useMemo(
        () => ({ [`__scope${e}`]: { ...i, [e]: l } }),
        [i, l]
      );
    };
  };
  return o.scopeName = e, [r, yo(o, ...t)];
}
function yo(...e) {
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
      return m.useMemo(() => ({ [`__scope${t.scopeName}`]: a }), [a]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
// @__NO_SIDE_EFFECTS__
function Pn(e) {
  const t = /* @__PURE__ */ wo(e), n = m.forwardRef((r, o) => {
    const { children: s, ...a } = r, i = m.Children.toArray(s), l = i.find(Co);
    if (l) {
      const c = l.props.children, u = i.map((d) => d === l ? m.Children.count(c) > 1 ? m.Children.only(null) : m.isValidElement(c) ? c.props.children : null : d);
      return /* @__PURE__ */ C(t, { ...a, ref: o, children: m.isValidElement(c) ? m.cloneElement(c, void 0, u) : null });
    }
    return /* @__PURE__ */ C(t, { ...a, ref: o, children: s });
  });
  return n.displayName = `${e}.Slot`, n;
}
// @__NO_SIDE_EFFECTS__
function wo(e) {
  const t = m.forwardRef((n, r) => {
    const { children: o, ...s } = n;
    if (m.isValidElement(o)) {
      const a = Eo(o), i = So(s, o.props);
      return o.type !== m.Fragment && (i.ref = r ? Sn(r, a) : a), m.cloneElement(o, i);
    }
    return m.Children.count(o) > 1 ? m.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var xo = Symbol("radix.slottable");
function Co(e) {
  return m.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === xo;
}
function So(e, t) {
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
function Eo(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var Po = [
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
], ne = Po.reduce((e, t) => {
  const n = /* @__PURE__ */ Pn(`Primitive.${t}`), r = m.forwardRef((o, s) => {
    const { asChild: a, ...i } = o, l = a ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ C(l, { ...i, ref: s });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {});
function Ao(e, t) {
  e && hn.flushSync(() => e.dispatchEvent(t));
}
function xe(e) {
  const t = m.useRef(e);
  return m.useEffect(() => {
    t.current = e;
  }), m.useMemo(() => (...n) => {
    var r;
    return (r = t.current) == null ? void 0 : r.call(t, ...n);
  }, []);
}
function Ro(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = xe(e);
  m.useEffect(() => {
    const r = (o) => {
      o.key === "Escape" && n(o);
    };
    return t.addEventListener("keydown", r, { capture: !0 }), () => t.removeEventListener("keydown", r, { capture: !0 });
  }, [n, t]);
}
var Oo = "DismissableLayer", pt = "dismissableLayer.update", No = "dismissableLayer.pointerDownOutside", ko = "dismissableLayer.focusOutside", Ut, An = m.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), Rn = m.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: r,
      onPointerDownOutside: o,
      onFocusOutside: s,
      onInteractOutside: a,
      onDismiss: i,
      ...l
    } = e, c = m.useContext(An), [u, d] = m.useState(null), p = (u == null ? void 0 : u.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), [, h] = m.useState({}), b = fe(t, (E) => d(E)), f = Array.from(c.layers), [g] = [...c.layersWithOutsidePointerEventsDisabled].slice(-1), v = f.indexOf(g), y = u ? f.indexOf(u) : -1, w = c.layersWithOutsidePointerEventsDisabled.size > 0, x = y >= v, S = Lo((E) => {
      const k = E.target, L = [...c.branches].some((M) => M.contains(k));
      !x || L || (o == null || o(E), a == null || a(E), E.defaultPrevented || i == null || i());
    }, p), A = Do((E) => {
      const k = E.target;
      [...c.branches].some((M) => M.contains(k)) || (s == null || s(E), a == null || a(E), E.defaultPrevented || i == null || i());
    }, p);
    return Ro((E) => {
      y === c.layers.size - 1 && (r == null || r(E), !E.defaultPrevented && i && (E.preventDefault(), i()));
    }, p), m.useEffect(() => {
      if (u)
        return n && (c.layersWithOutsidePointerEventsDisabled.size === 0 && (Ut = p.body.style.pointerEvents, p.body.style.pointerEvents = "none"), c.layersWithOutsidePointerEventsDisabled.add(u)), c.layers.add(u), Gt(), () => {
          n && c.layersWithOutsidePointerEventsDisabled.size === 1 && (p.body.style.pointerEvents = Ut);
        };
    }, [u, p, n, c]), m.useEffect(() => () => {
      u && (c.layers.delete(u), c.layersWithOutsidePointerEventsDisabled.delete(u), Gt());
    }, [u, c]), m.useEffect(() => {
      const E = () => h({});
      return document.addEventListener(pt, E), () => document.removeEventListener(pt, E);
    }, []), /* @__PURE__ */ C(
      ne.div,
      {
        ...l,
        ref: b,
        style: {
          pointerEvents: w ? x ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: ae(e.onFocusCapture, A.onFocusCapture),
        onBlurCapture: ae(e.onBlurCapture, A.onBlurCapture),
        onPointerDownCapture: ae(
          e.onPointerDownCapture,
          S.onPointerDownCapture
        )
      }
    );
  }
);
Rn.displayName = Oo;
var Mo = "DismissableLayerBranch", To = m.forwardRef((e, t) => {
  const n = m.useContext(An), r = m.useRef(null), o = fe(t, r);
  return m.useEffect(() => {
    const s = r.current;
    if (s)
      return n.branches.add(s), () => {
        n.branches.delete(s);
      };
  }, [n.branches]), /* @__PURE__ */ C(ne.div, { ...e, ref: o });
});
To.displayName = Mo;
function Lo(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = xe(e), r = m.useRef(!1), o = m.useRef(() => {
  });
  return m.useEffect(() => {
    const s = (i) => {
      if (i.target && !r.current) {
        let l = function() {
          On(
            No,
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
function Do(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = xe(e), r = m.useRef(!1);
  return m.useEffect(() => {
    const o = (s) => {
      s.target && !r.current && On(ko, n, { originalEvent: s }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o);
  }, [t, n]), {
    onFocusCapture: () => r.current = !0,
    onBlurCapture: () => r.current = !1
  };
}
function Gt() {
  const e = new CustomEvent(pt);
  document.dispatchEvent(e);
}
function On(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target, s = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && o.addEventListener(e, t, { once: !0 }), r ? Ao(o, s) : o.dispatchEvent(s);
}
var ot = 0;
function _o() {
  m.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? Yt()), document.body.insertAdjacentElement("beforeend", e[1] ?? Yt()), ot++, () => {
      ot === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), ot--;
    };
  }, []);
}
function Yt() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var st = "focusScope.autoFocusOnMount", it = "focusScope.autoFocusOnUnmount", Xt = { bubbles: !1, cancelable: !0 }, Io = "FocusScope", Nn = m.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: r = !1,
    onMountAutoFocus: o,
    onUnmountAutoFocus: s,
    ...a
  } = e, [i, l] = m.useState(null), c = xe(o), u = xe(s), d = m.useRef(null), p = fe(t, (f) => l(f)), h = m.useRef({
    paused: !1,
    pause() {
      this.paused = !0;
    },
    resume() {
      this.paused = !1;
    }
  }).current;
  m.useEffect(() => {
    if (r) {
      let f = function(w) {
        if (h.paused || !i) return;
        const x = w.target;
        i.contains(x) ? d.current = x : se(d.current, { select: !0 });
      }, g = function(w) {
        if (h.paused || !i) return;
        const x = w.relatedTarget;
        x !== null && (i.contains(x) || se(d.current, { select: !0 }));
      }, v = function(w) {
        if (document.activeElement === document.body)
          for (const S of w)
            S.removedNodes.length > 0 && se(i);
      };
      document.addEventListener("focusin", f), document.addEventListener("focusout", g);
      const y = new MutationObserver(v);
      return i && y.observe(i, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", f), document.removeEventListener("focusout", g), y.disconnect();
      };
    }
  }, [r, i, h.paused]), m.useEffect(() => {
    if (i) {
      Zt.add(h);
      const f = document.activeElement;
      if (!i.contains(f)) {
        const v = new CustomEvent(st, Xt);
        i.addEventListener(st, c), i.dispatchEvent(v), v.defaultPrevented || (Fo(jo(kn(i)), { select: !0 }), document.activeElement === f && se(i));
      }
      return () => {
        i.removeEventListener(st, c), setTimeout(() => {
          const v = new CustomEvent(it, Xt);
          i.addEventListener(it, u), i.dispatchEvent(v), v.defaultPrevented || se(f ?? document.body, { select: !0 }), i.removeEventListener(it, u), Zt.remove(h);
        }, 0);
      };
    }
  }, [i, c, u, h]);
  const b = m.useCallback(
    (f) => {
      if (!n && !r || h.paused) return;
      const g = f.key === "Tab" && !f.altKey && !f.ctrlKey && !f.metaKey, v = document.activeElement;
      if (g && v) {
        const y = f.currentTarget, [w, x] = Wo(y);
        w && x ? !f.shiftKey && v === x ? (f.preventDefault(), n && se(w, { select: !0 })) : f.shiftKey && v === w && (f.preventDefault(), n && se(x, { select: !0 })) : v === y && f.preventDefault();
      }
    },
    [n, r, h.paused]
  );
  return /* @__PURE__ */ C(ne.div, { tabIndex: -1, ...a, ref: p, onKeyDown: b });
});
Nn.displayName = Io;
function Fo(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if (se(r, { select: t }), document.activeElement !== n) return;
}
function Wo(e) {
  const t = kn(e), n = Kt(t, e), r = Kt(t.reverse(), e);
  return [n, r];
}
function kn(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function Kt(e, t) {
  for (const n of e)
    if (!zo(n, { upTo: t })) return n;
}
function zo(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function $o(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function se(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && $o(e) && t && e.select();
  }
}
var Zt = Bo();
function Bo() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && (n == null || n.pause()), e = qt(e, t), e.unshift(t);
    },
    remove(t) {
      var n;
      e = qt(e, t), (n = e[0]) == null || n.resume();
    }
  };
}
function qt(e, t) {
  const n = [...e], r = n.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
function jo(e) {
  return e.filter((t) => t.tagName !== "A");
}
var ce = globalThis != null && globalThis.document ? m.useLayoutEffect : () => {
}, Vo = m[" useId ".trim().toString()] || (() => {
}), Ho = 0;
function Uo(e) {
  const [t, n] = m.useState(Vo());
  return ce(() => {
    n((r) => r ?? String(Ho++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
const Go = ["top", "right", "bottom", "left"], le = Math.min, V = Math.max, Ge = Math.round, Fe = Math.floor, Z = (e) => ({
  x: e,
  y: e
}), Yo = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Xo = {
  start: "end",
  end: "start"
};
function ht(e, t, n) {
  return V(e, le(t, n));
}
function ee(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function te(e) {
  return e.split("-")[0];
}
function Ae(e) {
  return e.split("-")[1];
}
function xt(e) {
  return e === "x" ? "y" : "x";
}
function Ct(e) {
  return e === "y" ? "height" : "width";
}
const Ko = /* @__PURE__ */ new Set(["top", "bottom"]);
function K(e) {
  return Ko.has(te(e)) ? "y" : "x";
}
function St(e) {
  return xt(K(e));
}
function Zo(e, t, n) {
  n === void 0 && (n = !1);
  const r = Ae(e), o = St(e), s = Ct(o);
  let a = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[s] > t.floating[s] && (a = Ye(a)), [a, Ye(a)];
}
function qo(e) {
  const t = Ye(e);
  return [gt(e), t, gt(t)];
}
function gt(e) {
  return e.replace(/start|end/g, (t) => Xo[t]);
}
const Qt = ["left", "right"], Jt = ["right", "left"], Qo = ["top", "bottom"], Jo = ["bottom", "top"];
function es(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? Jt : Qt : t ? Qt : Jt;
    case "left":
    case "right":
      return t ? Qo : Jo;
    default:
      return [];
  }
}
function ts(e, t, n, r) {
  const o = Ae(e);
  let s = es(te(e), n === "start", r);
  return o && (s = s.map((a) => a + "-" + o), t && (s = s.concat(s.map(gt)))), s;
}
function Ye(e) {
  return e.replace(/left|right|bottom|top/g, (t) => Yo[t]);
}
function ns(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Mn(e) {
  return typeof e != "number" ? ns(e) : {
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
function en(e, t, n) {
  let {
    reference: r,
    floating: o
  } = e;
  const s = K(t), a = St(t), i = Ct(a), l = te(t), c = s === "y", u = r.x + r.width / 2 - o.width / 2, d = r.y + r.height / 2 - o.height / 2, p = r[i] / 2 - o[i] / 2;
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
const rs = async (e, t, n) => {
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
  } = en(c, r, l), p = r, h = {}, b = 0;
  for (let f = 0; f < i.length; f++) {
    const {
      name: g,
      fn: v
    } = i[f], {
      x: y,
      y: w,
      data: x,
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
        ...x
      }
    }, S && b <= 50 && (b++, typeof S == "object" && (S.placement && (p = S.placement), S.rects && (c = S.rects === !0 ? await a.getElementRects({
      reference: e,
      floating: t,
      strategy: o
    }) : S.rects), {
      x: u,
      y: d
    } = en(c, p, l)), f = -1);
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
  } = ee(t, e), b = Mn(h), g = i[p ? d === "floating" ? "reference" : "floating" : d], v = Xe(await s.getClippingRect({
    element: (n = await (s.isElement == null ? void 0 : s.isElement(g))) == null || n ? g : g.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(i.floating)),
    boundary: c,
    rootBoundary: u,
    strategy: l
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
  }, S = Xe(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: i,
    rect: y,
    offsetParent: w,
    strategy: l
  }) : y);
  return {
    top: (v.top - S.top + b.top) / x.y,
    bottom: (S.bottom - v.bottom + b.bottom) / x.y,
    left: (v.left - S.left + b.left) / x.x,
    right: (S.right - v.right + b.right) / x.x
  };
}
const os = (e) => ({
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
    } = ee(e, t) || {};
    if (c == null)
      return {};
    const d = Mn(u), p = {
      x: n,
      y: r
    }, h = St(o), b = Ct(h), f = await a.getDimensions(c), g = h === "y", v = g ? "top" : "left", y = g ? "bottom" : "right", w = g ? "clientHeight" : "clientWidth", x = s.reference[b] + s.reference[h] - p[h] - s.floating[b], S = p[h] - s.reference[h], A = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(c));
    let E = A ? A[w] : 0;
    (!E || !await (a.isElement == null ? void 0 : a.isElement(A))) && (E = i.floating[w] || s.floating[b]);
    const k = x / 2 - S / 2, L = E / 2 - f[b] / 2 - 1, M = le(d[v], L), $ = le(d[y], L), R = M, I = E - f[b] - $, P = E / 2 - f[b] / 2 + k, F = ht(R, P, I), D = !l.arrow && Ae(o) != null && P !== F && s.reference[b] / 2 - (P < R ? M : $) - f[b] / 2 < 0, W = D ? P < R ? P - R : P - I : 0;
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
}), ss = function(e) {
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
        flipAlignment: f = !0,
        ...g
      } = ee(e, t);
      if ((n = s.arrow) != null && n.alignmentOffset)
        return {};
      const v = te(o), y = K(i), w = te(i) === i, x = await (l.isRTL == null ? void 0 : l.isRTL(c.floating)), S = p || (w || !f ? [Ye(i)] : qo(i)), A = b !== "none";
      !p && A && S.push(...ts(i, f, b, x));
      const E = [i, ...S], k = await Te(t, g), L = [];
      let M = ((r = s.flip) == null ? void 0 : r.overflows) || [];
      if (u && L.push(k[v]), d) {
        const P = Zo(o, a, x);
        L.push(k[P[0]], k[P[1]]);
      }
      if (M = [...M, {
        placement: o,
        overflows: L
      }], !L.every((P) => P <= 0)) {
        var $, R;
        const P = ((($ = s.flip) == null ? void 0 : $.index) || 0) + 1, F = E[P];
        if (F && (!(d === "alignment" ? y !== K(F) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        M.every((N) => K(N.placement) === y ? N.overflows[0] > 0 : !0)))
          return {
            data: {
              index: P,
              overflows: M
            },
            reset: {
              placement: F
            }
          };
        let D = (R = M.filter((W) => W.overflows[0] <= 0).sort((W, N) => W.overflows[1] - N.overflows[1])[0]) == null ? void 0 : R.placement;
        if (!D)
          switch (h) {
            case "bestFit": {
              var I;
              const W = (I = M.filter((N) => {
                if (A) {
                  const z = K(N.placement);
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
function tn(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function nn(e) {
  return Go.some((t) => e[t] >= 0);
}
const is = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n
      } = t, {
        strategy: r = "referenceHidden",
        ...o
      } = ee(e, t);
      switch (r) {
        case "referenceHidden": {
          const s = await Te(t, {
            ...o,
            elementContext: "reference"
          }), a = tn(s, n.reference);
          return {
            data: {
              referenceHiddenOffsets: a,
              referenceHidden: nn(a)
            }
          };
        }
        case "escaped": {
          const s = await Te(t, {
            ...o,
            altBoundary: !0
          }), a = tn(s, n.floating);
          return {
            data: {
              escapedOffsets: a,
              escaped: nn(a)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, Tn = /* @__PURE__ */ new Set(["left", "top"]);
async function as(e, t) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = e, s = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), a = te(n), i = Ae(n), l = K(n) === "y", c = Tn.has(a) ? -1 : 1, u = s && l ? -1 : 1, d = ee(t, e);
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
const cs = function(e) {
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
      } = t, l = await as(t, e);
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
}, ls = function(e) {
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
      } = ee(e, t), c = {
        x: n,
        y: r
      }, u = await Te(t, l), d = K(te(o)), p = xt(d);
      let h = c[p], b = c[d];
      if (s) {
        const g = p === "y" ? "top" : "left", v = p === "y" ? "bottom" : "right", y = h + u[g], w = h - u[v];
        h = ht(y, h, w);
      }
      if (a) {
        const g = d === "y" ? "top" : "left", v = d === "y" ? "bottom" : "right", y = b + u[g], w = b - u[v];
        b = ht(y, b, w);
      }
      const f = i.fn({
        ...t,
        [p]: h,
        [d]: b
      });
      return {
        ...f,
        data: {
          x: f.x - n,
          y: f.y - r,
          enabled: {
            [p]: s,
            [d]: a
          }
        }
      };
    }
  };
}, us = function(e) {
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
      } = ee(e, t), u = {
        x: n,
        y: r
      }, d = K(o), p = xt(d);
      let h = u[p], b = u[d];
      const f = ee(i, t), g = typeof f == "number" ? {
        mainAxis: f,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...f
      };
      if (l) {
        const w = p === "y" ? "height" : "width", x = s.reference[p] - s.floating[w] + g.mainAxis, S = s.reference[p] + s.reference[w] - g.mainAxis;
        h < x ? h = x : h > S && (h = S);
      }
      if (c) {
        var v, y;
        const w = p === "y" ? "width" : "height", x = Tn.has(te(o)), S = s.reference[d] - s.floating[w] + (x && ((v = a.offset) == null ? void 0 : v[d]) || 0) + (x ? 0 : g.crossAxis), A = s.reference[d] + s.reference[w] + (x ? 0 : ((y = a.offset) == null ? void 0 : y[d]) || 0) - (x ? g.crossAxis : 0);
        b < S ? b = S : b > A && (b = A);
      }
      return {
        [p]: h,
        [d]: b
      };
    }
  };
}, ds = function(e) {
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
      } = ee(e, t), u = await Te(t, c), d = te(o), p = Ae(o), h = K(o) === "y", {
        width: b,
        height: f
      } = s.floating;
      let g, v;
      d === "top" || d === "bottom" ? (g = d, v = p === (await (a.isRTL == null ? void 0 : a.isRTL(i.floating)) ? "start" : "end") ? "left" : "right") : (v = d, g = p === "end" ? "top" : "bottom");
      const y = f - u.top - u.bottom, w = b - u.left - u.right, x = le(f - u[g], y), S = le(b - u[v], w), A = !t.middlewareData.shift;
      let E = x, k = S;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (k = w), (r = t.middlewareData.shift) != null && r.enabled.y && (E = y), A && !p) {
        const M = V(u.left, 0), $ = V(u.right, 0), R = V(u.top, 0), I = V(u.bottom, 0);
        h ? k = b - 2 * (M !== 0 || $ !== 0 ? M + $ : V(u.left, u.right)) : E = f - 2 * (R !== 0 || I !== 0 ? R + I : V(u.top, u.bottom));
      }
      await l({
        ...t,
        availableWidth: k,
        availableHeight: E
      });
      const L = await a.getDimensions(i.floating);
      return b !== L.width || f !== L.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function qe() {
  return typeof window < "u";
}
function Re(e) {
  return Ln(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function U(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Q(e) {
  var t;
  return (t = (Ln(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Ln(e) {
  return qe() ? e instanceof Node || e instanceof U(e).Node : !1;
}
function G(e) {
  return qe() ? e instanceof Element || e instanceof U(e).Element : !1;
}
function q(e) {
  return qe() ? e instanceof HTMLElement || e instanceof U(e).HTMLElement : !1;
}
function rn(e) {
  return !qe() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof U(e).ShadowRoot;
}
const fs = /* @__PURE__ */ new Set(["inline", "contents"]);
function De(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: o
  } = Y(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !fs.has(o);
}
const ms = /* @__PURE__ */ new Set(["table", "td", "th"]);
function ps(e) {
  return ms.has(Re(e));
}
const hs = [":popover-open", ":modal"];
function Qe(e) {
  return hs.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const gs = ["transform", "translate", "scale", "rotate", "perspective"], vs = ["transform", "translate", "scale", "rotate", "perspective", "filter"], bs = ["paint", "layout", "strict", "content"];
function Et(e) {
  const t = Pt(), n = G(e) ? Y(e) : e;
  return gs.some((r) => n[r] ? n[r] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || vs.some((r) => (n.willChange || "").includes(r)) || bs.some((r) => (n.contain || "").includes(r));
}
function ys(e) {
  let t = ue(e);
  for (; q(t) && !Ce(t); ) {
    if (Et(t))
      return t;
    if (Qe(t))
      return null;
    t = ue(t);
  }
  return null;
}
function Pt() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const ws = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function Ce(e) {
  return ws.has(Re(e));
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
function ue(e) {
  if (Re(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    rn(e) && e.host || // Fallback.
    Q(e)
  );
  return rn(t) ? t.host : t;
}
function Dn(e) {
  const t = ue(e);
  return Ce(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : q(t) && De(t) ? t : Dn(t);
}
function Le(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = Dn(e), s = o === ((r = e.ownerDocument) == null ? void 0 : r.body), a = U(o);
  if (s) {
    const i = vt(a);
    return t.concat(a, a.visualViewport || [], De(o) ? o : [], i && n ? Le(i) : []);
  }
  return t.concat(o, Le(o, [], n));
}
function vt(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function _n(e) {
  const t = Y(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const o = q(e), s = o ? e.offsetWidth : n, a = o ? e.offsetHeight : r, i = Ge(n) !== s || Ge(r) !== a;
  return i && (n = s, r = a), {
    width: n,
    height: r,
    $: i
  };
}
function At(e) {
  return G(e) ? e : e.contextElement;
}
function ye(e) {
  const t = At(e);
  if (!q(t))
    return Z(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: o,
    $: s
  } = _n(t);
  let a = (s ? Ge(n.width) : n.width) / r, i = (s ? Ge(n.height) : n.height) / o;
  return (!a || !Number.isFinite(a)) && (a = 1), (!i || !Number.isFinite(i)) && (i = 1), {
    x: a,
    y: i
  };
}
const xs = /* @__PURE__ */ Z(0);
function In(e) {
  const t = U(e);
  return !Pt() || !t.visualViewport ? xs : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function Cs(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== U(e) ? !1 : t;
}
function pe(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), s = At(e);
  let a = Z(1);
  t && (r ? G(r) && (a = ye(r)) : a = ye(e));
  const i = Cs(s, n, r) ? In(s) : Z(0);
  let l = (o.left + i.x) / a.x, c = (o.top + i.y) / a.y, u = o.width / a.x, d = o.height / a.y;
  if (s) {
    const p = U(s), h = r && G(r) ? U(r) : r;
    let b = p, f = vt(b);
    for (; f && r && h !== b; ) {
      const g = ye(f), v = f.getBoundingClientRect(), y = Y(f), w = v.left + (f.clientLeft + parseFloat(y.paddingLeft)) * g.x, x = v.top + (f.clientTop + parseFloat(y.paddingTop)) * g.y;
      l *= g.x, c *= g.y, u *= g.x, d *= g.y, l += w, c += x, b = U(f), f = vt(b);
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
  return t ? t.left + n : pe(Q(e)).left + n;
}
function Fn(e, t) {
  const n = e.getBoundingClientRect(), r = n.left + t.scrollLeft - et(e, n), o = n.top + t.scrollTop;
  return {
    x: r,
    y: o
  };
}
function Ss(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: r,
    strategy: o
  } = e;
  const s = o === "fixed", a = Q(r), i = t ? Qe(t.floating) : !1;
  if (r === a || i && s)
    return n;
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = Z(1);
  const u = Z(0), d = q(r);
  if ((d || !d && !s) && ((Re(r) !== "body" || De(a)) && (l = Je(r)), q(r))) {
    const h = pe(r);
    c = ye(r), u.x = h.x + r.clientLeft, u.y = h.y + r.clientTop;
  }
  const p = a && !d && !s ? Fn(a, l) : Z(0);
  return {
    width: n.width * c.x,
    height: n.height * c.y,
    x: n.x * c.x - l.scrollLeft * c.x + u.x + p.x,
    y: n.y * c.y - l.scrollTop * c.y + u.y + p.y
  };
}
function Es(e) {
  return Array.from(e.getClientRects());
}
function Ps(e) {
  const t = Q(e), n = Je(e), r = e.ownerDocument.body, o = V(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), s = V(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let a = -n.scrollLeft + et(e);
  const i = -n.scrollTop;
  return Y(r).direction === "rtl" && (a += V(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: s,
    x: a,
    y: i
  };
}
const on = 25;
function As(e, t) {
  const n = U(e), r = Q(e), o = n.visualViewport;
  let s = r.clientWidth, a = r.clientHeight, i = 0, l = 0;
  if (o) {
    s = o.width, a = o.height;
    const u = Pt();
    (!u || u && t === "fixed") && (i = o.offsetLeft, l = o.offsetTop);
  }
  const c = et(r);
  if (c <= 0) {
    const u = r.ownerDocument, d = u.body, p = getComputedStyle(d), h = u.compatMode === "CSS1Compat" && parseFloat(p.marginLeft) + parseFloat(p.marginRight) || 0, b = Math.abs(r.clientWidth - d.clientWidth - h);
    b <= on && (s -= b);
  } else c <= on && (s += c);
  return {
    width: s,
    height: a,
    x: i,
    y: l
  };
}
const Rs = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function Os(e, t) {
  const n = pe(e, !0, t === "fixed"), r = n.top + e.clientTop, o = n.left + e.clientLeft, s = q(e) ? ye(e) : Z(1), a = e.clientWidth * s.x, i = e.clientHeight * s.y, l = o * s.x, c = r * s.y;
  return {
    width: a,
    height: i,
    x: l,
    y: c
  };
}
function sn(e, t, n) {
  let r;
  if (t === "viewport")
    r = As(e, n);
  else if (t === "document")
    r = Ps(Q(e));
  else if (G(t))
    r = Os(t, n);
  else {
    const o = In(e);
    r = {
      x: t.x - o.x,
      y: t.y - o.y,
      width: t.width,
      height: t.height
    };
  }
  return Xe(r);
}
function Wn(e, t) {
  const n = ue(e);
  return n === t || !G(n) || Ce(n) ? !1 : Y(n).position === "fixed" || Wn(n, t);
}
function Ns(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = Le(e, [], !1).filter((i) => G(i) && Re(i) !== "body"), o = null;
  const s = Y(e).position === "fixed";
  let a = s ? ue(e) : e;
  for (; G(a) && !Ce(a); ) {
    const i = Y(a), l = Et(a);
    !l && i.position === "fixed" && (o = null), (s ? !l && !o : !l && i.position === "static" && !!o && Rs.has(o.position) || De(a) && !l && Wn(e, a)) ? r = r.filter((u) => u !== a) : o = i, a = ue(a);
  }
  return t.set(e, r), r;
}
function ks(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = e;
  const a = [...n === "clippingAncestors" ? Qe(t) ? [] : Ns(t, this._c) : [].concat(n), r], i = a[0], l = a.reduce((c, u) => {
    const d = sn(t, u, o);
    return c.top = V(d.top, c.top), c.right = le(d.right, c.right), c.bottom = le(d.bottom, c.bottom), c.left = V(d.left, c.left), c;
  }, sn(t, i, o));
  return {
    width: l.right - l.left,
    height: l.bottom - l.top,
    x: l.left,
    y: l.top
  };
}
function Ms(e) {
  const {
    width: t,
    height: n
  } = _n(e);
  return {
    width: t,
    height: n
  };
}
function Ts(e, t, n) {
  const r = q(t), o = Q(t), s = n === "fixed", a = pe(e, !0, s, t);
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
  const u = o && !r && !s ? Fn(o, i) : Z(0), d = a.left + i.scrollLeft - l.x - u.x, p = a.top + i.scrollTop - l.y - u.y;
  return {
    x: d,
    y: p,
    width: a.width,
    height: a.height
  };
}
function at(e) {
  return Y(e).position === "static";
}
function an(e, t) {
  if (!q(e) || Y(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return Q(e) === n && (n = n.ownerDocument.body), n;
}
function zn(e, t) {
  const n = U(e);
  if (Qe(e))
    return n;
  if (!q(e)) {
    let o = ue(e);
    for (; o && !Ce(o); ) {
      if (G(o) && !at(o))
        return o;
      o = ue(o);
    }
    return n;
  }
  let r = an(e, t);
  for (; r && ps(r) && at(r); )
    r = an(r, t);
  return r && Ce(r) && at(r) && !Et(r) ? n : r || ys(e) || n;
}
const Ls = async function(e) {
  const t = this.getOffsetParent || zn, n = this.getDimensions, r = await n(e.floating);
  return {
    reference: Ts(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function Ds(e) {
  return Y(e).direction === "rtl";
}
const _s = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Ss,
  getDocumentElement: Q,
  getClippingRect: ks,
  getOffsetParent: zn,
  getElementRects: Ls,
  getClientRects: Es,
  getDimensions: Ms,
  getScale: ye,
  isElement: G,
  isRTL: Ds
};
function $n(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Is(e, t) {
  let n = null, r;
  const o = Q(e);
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
    const b = Fe(d), f = Fe(o.clientWidth - (u + p)), g = Fe(o.clientHeight - (d + h)), v = Fe(u), w = {
      rootMargin: -b + "px " + -f + "px " + -g + "px " + -v + "px",
      threshold: V(0, le(1, l)) || 1
    };
    let x = !0;
    function S(A) {
      const E = A[0].intersectionRatio;
      if (E !== l) {
        if (!x)
          return a();
        E ? a(!1, E) : r = setTimeout(() => {
          a(!1, 1e-7);
        }, 1e3);
      }
      E === 1 && !$n(c, e.getBoundingClientRect()) && a(), x = !1;
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
function Fs(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: s = !0,
    elementResize: a = typeof ResizeObserver == "function",
    layoutShift: i = typeof IntersectionObserver == "function",
    animationFrame: l = !1
  } = r, c = At(e), u = o || s ? [...c ? Le(c) : [], ...Le(t)] : [];
  u.forEach((v) => {
    o && v.addEventListener("scroll", n, {
      passive: !0
    }), s && v.addEventListener("resize", n);
  });
  const d = c && i ? Is(c, n) : null;
  let p = -1, h = null;
  a && (h = new ResizeObserver((v) => {
    let [y] = v;
    y && y.target === c && h && (h.unobserve(t), cancelAnimationFrame(p), p = requestAnimationFrame(() => {
      var w;
      (w = h) == null || w.observe(t);
    })), n();
  }), c && !l && h.observe(c), h.observe(t));
  let b, f = l ? pe(e) : null;
  l && g();
  function g() {
    const v = pe(e);
    f && !$n(f, v) && n(), f = v, b = requestAnimationFrame(g);
  }
  return n(), () => {
    var v;
    u.forEach((y) => {
      o && y.removeEventListener("scroll", n), s && y.removeEventListener("resize", n);
    }), d == null || d(), (v = h) == null || v.disconnect(), h = null, l && cancelAnimationFrame(b);
  };
}
const Ws = cs, zs = ls, $s = ss, Bs = ds, js = is, cn = os, Vs = us, Hs = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: _s,
    ...n
  }, s = {
    ...o.platform,
    _c: r
  };
  return rs(e, t, {
    ...o,
    platform: s
  });
};
var Us = typeof document < "u", Gs = function() {
}, Ve = Us ? kr : Gs;
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
function Bn(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function ln(e, t) {
  const n = Bn(e);
  return Math.round(t * n) / n;
}
function ct(e) {
  const t = m.useRef(e);
  return Ve(() => {
    t.current = e;
  }), t;
}
function Ys(e) {
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
  } = e, [u, d] = m.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [p, h] = m.useState(r);
  Ke(p, r) || h(r);
  const [b, f] = m.useState(null), [g, v] = m.useState(null), y = m.useCallback((N) => {
    N !== A.current && (A.current = N, f(N));
  }, []), w = m.useCallback((N) => {
    N !== E.current && (E.current = N, v(N));
  }, []), x = s || b, S = a || g, A = m.useRef(null), E = m.useRef(null), k = m.useRef(u), L = l != null, M = ct(l), $ = ct(o), R = ct(c), I = m.useCallback(() => {
    if (!A.current || !E.current)
      return;
    const N = {
      placement: t,
      strategy: n,
      middleware: p
    };
    $.current && (N.platform = $.current), Hs(A.current, E.current, N).then((z) => {
      const j = {
        ...z,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: R.current !== !1
      };
      P.current && !Ke(k.current, j) && (k.current = j, hn.flushSync(() => {
        d(j);
      }));
    });
  }, [p, t, n, $, R]);
  Ve(() => {
    c === !1 && k.current.isPositioned && (k.current.isPositioned = !1, d((N) => ({
      ...N,
      isPositioned: !1
    })));
  }, [c]);
  const P = m.useRef(!1);
  Ve(() => (P.current = !0, () => {
    P.current = !1;
  }), []), Ve(() => {
    if (x && (A.current = x), S && (E.current = S), x && S) {
      if (M.current)
        return M.current(x, S, I);
      I();
    }
  }, [x, S, I, M, L]);
  const F = m.useMemo(() => ({
    reference: A,
    floating: E,
    setReference: y,
    setFloating: w
  }), [y, w]), D = m.useMemo(() => ({
    reference: x,
    floating: S
  }), [x, S]), W = m.useMemo(() => {
    const N = {
      position: n,
      left: 0,
      top: 0
    };
    if (!D.floating)
      return N;
    const z = ln(D.floating, u.x), j = ln(D.floating, u.y);
    return i ? {
      ...N,
      transform: "translate(" + z + "px, " + j + "px)",
      ...Bn(D.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: z,
      top: j
    };
  }, [n, i, D.floating, u.x, u.y]);
  return m.useMemo(() => ({
    ...u,
    update: I,
    refs: F,
    elements: D,
    floatingStyles: W
  }), [u, I, F, D, W]);
}
const Xs = (e) => {
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
      return r && t(r) ? r.current != null ? cn({
        element: r.current,
        padding: o
      }).fn(n) : {} : r ? cn({
        element: r,
        padding: o
      }).fn(n) : {};
    }
  };
}, Ks = (e, t) => ({
  ...Ws(e),
  options: [e, t]
}), Zs = (e, t) => ({
  ...zs(e),
  options: [e, t]
}), qs = (e, t) => ({
  ...Vs(e),
  options: [e, t]
}), Qs = (e, t) => ({
  ...$s(e),
  options: [e, t]
}), Js = (e, t) => ({
  ...Bs(e),
  options: [e, t]
}), ei = (e, t) => ({
  ...js(e),
  options: [e, t]
}), ti = (e, t) => ({
  ...Xs(e),
  options: [e, t]
});
var ni = "Arrow", jn = m.forwardRef((e, t) => {
  const { children: n, width: r = 10, height: o = 5, ...s } = e;
  return /* @__PURE__ */ C(
    ne.svg,
    {
      ...s,
      ref: t,
      width: r,
      height: o,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? n : /* @__PURE__ */ C("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
jn.displayName = ni;
var ri = jn;
function oi(e) {
  const [t, n] = m.useState(void 0);
  return ce(() => {
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
var Rt = "Popper", [Vn, Hn] = En(Rt), [si, Un] = Vn(Rt), Gn = (e) => {
  const { __scopePopper: t, children: n } = e, [r, o] = m.useState(null);
  return /* @__PURE__ */ C(si, { scope: t, anchor: r, onAnchorChange: o, children: n });
};
Gn.displayName = Rt;
var Yn = "PopperAnchor", Xn = m.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: r, ...o } = e, s = Un(Yn, n), a = m.useRef(null), i = fe(t, a), l = m.useRef(null);
    return m.useEffect(() => {
      const c = l.current;
      l.current = (r == null ? void 0 : r.current) || a.current, c !== l.current && s.onAnchorChange(l.current);
    }), r ? null : /* @__PURE__ */ C(ne.div, { ...o, ref: i });
  }
);
Xn.displayName = Yn;
var Ot = "PopperContent", [ii, ai] = Vn(Ot), Kn = m.forwardRef(
  (e, t) => {
    var Mt, Tt, Lt, Dt, _t, It;
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
      ...f
    } = e, g = Un(Ot, n), [v, y] = m.useState(null), w = fe(t, (Oe) => y(Oe)), [x, S] = m.useState(null), A = oi(x), E = (A == null ? void 0 : A.width) ?? 0, k = (A == null ? void 0 : A.height) ?? 0, L = r + (s !== "center" ? "-" + s : ""), M = typeof u == "number" ? u : { top: 0, right: 0, bottom: 0, left: 0, ...u }, $ = Array.isArray(c) ? c : [c], R = $.length > 0, I = {
      padding: M,
      boundary: $.filter(li),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: R
    }, { refs: P, floatingStyles: F, placement: D, isPositioned: W, middlewareData: N } = Ys({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: L,
      whileElementsMounted: (...Oe) => Fs(...Oe, {
        animationFrame: h === "always"
      }),
      elements: {
        reference: g.anchor
      },
      middleware: [
        Ks({ mainAxis: o + k, alignmentAxis: a }),
        l && Zs({
          mainAxis: !0,
          crossAxis: !1,
          limiter: d === "partial" ? qs() : void 0,
          ...I
        }),
        l && Qs({ ...I }),
        Js({
          ...I,
          apply: ({ elements: Oe, rects: Ft, availableWidth: Ar, availableHeight: Rr }) => {
            const { width: Or, height: Nr } = Ft.reference, Ie = Oe.floating.style;
            Ie.setProperty("--radix-popper-available-width", `${Ar}px`), Ie.setProperty("--radix-popper-available-height", `${Rr}px`), Ie.setProperty("--radix-popper-anchor-width", `${Or}px`), Ie.setProperty("--radix-popper-anchor-height", `${Nr}px`);
          }
        }),
        x && ti({ element: x, padding: i }),
        ui({ arrowWidth: E, arrowHeight: k }),
        p && ei({ strategy: "referenceHidden", ...I })
      ]
    }), [z, j] = Qn(D), B = xe(b);
    ce(() => {
      W && (B == null || B());
    }, [W, B]);
    const xr = (Mt = N.arrow) == null ? void 0 : Mt.x, Cr = (Tt = N.arrow) == null ? void 0 : Tt.y, Sr = ((Lt = N.arrow) == null ? void 0 : Lt.centerOffset) !== 0, [Er, Pr] = m.useState();
    return ce(() => {
      v && Pr(window.getComputedStyle(v).zIndex);
    }, [v]), /* @__PURE__ */ C(
      "div",
      {
        ref: P.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...F,
          transform: W ? F.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: Er,
          "--radix-popper-transform-origin": [
            (Dt = N.transformOrigin) == null ? void 0 : Dt.x,
            (_t = N.transformOrigin) == null ? void 0 : _t.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...((It = N.hide) == null ? void 0 : It.referenceHidden) && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: e.dir,
        children: /* @__PURE__ */ C(
          ii,
          {
            scope: n,
            placedSide: z,
            onArrowChange: S,
            arrowX: xr,
            arrowY: Cr,
            shouldHideArrow: Sr,
            children: /* @__PURE__ */ C(
              ne.div,
              {
                "data-side": z,
                "data-align": j,
                ...f,
                ref: w,
                style: {
                  ...f.style,
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
Kn.displayName = Ot;
var Zn = "PopperArrow", ci = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, qn = m.forwardRef(function(t, n) {
  const { __scopePopper: r, ...o } = t, s = ai(Zn, r), a = ci[s.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ C(
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
        children: /* @__PURE__ */ C(
          ri,
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
qn.displayName = Zn;
function li(e) {
  return e !== null;
}
var ui = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    var g, v, y;
    const { placement: n, rects: r, middlewareData: o } = t, a = ((g = o.arrow) == null ? void 0 : g.centerOffset) !== 0, i = a ? 0 : e.arrowWidth, l = a ? 0 : e.arrowHeight, [c, u] = Qn(n), d = { start: "0%", center: "50%", end: "100%" }[u], p = (((v = o.arrow) == null ? void 0 : v.x) ?? 0) + i / 2, h = (((y = o.arrow) == null ? void 0 : y.y) ?? 0) + l / 2;
    let b = "", f = "";
    return c === "bottom" ? (b = a ? d : `${p}px`, f = `${-l}px`) : c === "top" ? (b = a ? d : `${p}px`, f = `${r.floating.height + l}px`) : c === "right" ? (b = `${-l}px`, f = a ? d : `${h}px`) : c === "left" && (b = `${r.floating.width + l}px`, f = a ? d : `${h}px`), { data: { x: b, y: f } };
  }
});
function Qn(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var di = Gn, Jn = Xn, fi = Kn, mi = qn, pi = "Portal", er = m.forwardRef((e, t) => {
  var i;
  const { container: n, ...r } = e, [o, s] = m.useState(!1);
  ce(() => s(!0), []);
  const a = n || o && ((i = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : i.body);
  return a ? Mr.createPortal(/* @__PURE__ */ C(ne.div, { ...r, ref: t }), a) : null;
});
er.displayName = pi;
function hi(e, t) {
  return m.useReducer((n, r) => t[n][r] ?? n, e);
}
var Nt = (e) => {
  const { present: t, children: n } = e, r = gi(t), o = typeof n == "function" ? n({ present: r.isPresent }) : m.Children.only(n), s = fe(r.ref, vi(o));
  return typeof n == "function" || r.isPresent ? m.cloneElement(o, { ref: s }) : null;
};
Nt.displayName = "Presence";
function gi(e) {
  const [t, n] = m.useState(), r = m.useRef(null), o = m.useRef(e), s = m.useRef("none"), a = e ? "mounted" : "unmounted", [i, l] = hi(a, {
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
  return m.useEffect(() => {
    const c = We(r.current);
    s.current = i === "mounted" ? c : "none";
  }, [i]), ce(() => {
    const c = r.current, u = o.current;
    if (u !== e) {
      const p = s.current, h = We(c);
      e ? l("MOUNT") : h === "none" || (c == null ? void 0 : c.display) === "none" ? l("UNMOUNT") : l(u && p !== h ? "ANIMATION_OUT" : "UNMOUNT"), o.current = e;
    }
  }, [e, l]), ce(() => {
    if (t) {
      let c;
      const u = t.ownerDocument.defaultView ?? window, d = (h) => {
        const f = We(r.current).includes(CSS.escape(h.animationName));
        if (h.target === t && f && (l("ANIMATION_END"), !o.current)) {
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
    ref: m.useCallback((c) => {
      r.current = c ? getComputedStyle(c) : null, n(c);
    }, [])
  };
}
function We(e) {
  return (e == null ? void 0 : e.animationName) || "none";
}
function vi(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var bi = m[" useInsertionEffect ".trim().toString()] || ce;
function yi({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: r
}) {
  const [o, s, a] = wi({
    defaultProp: t,
    onChange: n
  }), i = e !== void 0, l = i ? e : o;
  {
    const u = m.useRef(e !== void 0);
    m.useEffect(() => {
      const d = u.current;
      d !== i && console.warn(
        `${r} is changing from ${d ? "controlled" : "uncontrolled"} to ${i ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), u.current = i;
    }, [i, r]);
  }
  const c = m.useCallback(
    (u) => {
      var d;
      if (i) {
        const p = xi(u) ? u(e) : u;
        p !== e && ((d = a.current) == null || d.call(a, p));
      } else
        s(u);
    },
    [i, e, s, a]
  );
  return [l, c];
}
function wi({
  defaultProp: e,
  onChange: t
}) {
  const [n, r] = m.useState(e), o = m.useRef(n), s = m.useRef(t);
  return bi(() => {
    s.current = t;
  }, [t]), m.useEffect(() => {
    var a;
    o.current !== n && ((a = s.current) == null || a.call(s, n), o.current = n);
  }, [n, o]), [n, r, s];
}
function xi(e) {
  return typeof e == "function";
}
var Ci = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, he = /* @__PURE__ */ new WeakMap(), ze = /* @__PURE__ */ new WeakMap(), $e = {}, lt = 0, tr = function(e) {
  return e && (e.host || tr(e.parentNode));
}, Si = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var r = tr(n);
    return r && e.contains(r) ? r : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, Ei = function(e, t, n, r) {
  var o = Si(t, Array.isArray(e) ? e : [e]);
  $e[n] || ($e[n] = /* @__PURE__ */ new WeakMap());
  var s = $e[n], a = [], i = /* @__PURE__ */ new Set(), l = new Set(o), c = function(d) {
    !d || i.has(d) || (i.add(d), c(d.parentNode));
  };
  o.forEach(c);
  var u = function(d) {
    !d || l.has(d) || Array.prototype.forEach.call(d.children, function(p) {
      if (i.has(p))
        u(p);
      else
        try {
          var h = p.getAttribute(r), b = h !== null && h !== "false", f = (he.get(p) || 0) + 1, g = (s.get(p) || 0) + 1;
          he.set(p, f), s.set(p, g), a.push(p), f === 1 && b && ze.set(p, !0), g === 1 && p.setAttribute(n, "true"), b || p.setAttribute(r, "true");
        } catch (v) {
          console.error("aria-hidden: cannot operate on ", p, v);
        }
    });
  };
  return u(t), i.clear(), lt++, function() {
    a.forEach(function(d) {
      var p = he.get(d) - 1, h = s.get(d) - 1;
      he.set(d, p), s.set(d, h), p || (ze.has(d) || d.removeAttribute(r), ze.delete(d)), h || d.removeAttribute(n);
    }), lt--, lt || (he = /* @__PURE__ */ new WeakMap(), he = /* @__PURE__ */ new WeakMap(), ze = /* @__PURE__ */ new WeakMap(), $e = {});
  };
}, Pi = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var r = Array.from(Array.isArray(e) ? e : [e]), o = Ci(e);
  return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live], script"))), Ei(r, o, n, "aria-hidden")) : function() {
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
function nr(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  return n;
}
function Ai(e, t, n) {
  if (n || arguments.length === 2) for (var r = 0, o = t.length, s; r < o; r++)
    (s || !(r in t)) && (s || (s = Array.prototype.slice.call(t, 0, r)), s[r] = t[r]);
  return e.concat(s || Array.prototype.slice.call(t));
}
var He = "right-scroll-bar-position", Ue = "width-before-scroll-bar", Ri = "with-scroll-bars-hidden", Oi = "--removed-body-scroll-bar-size";
function ut(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function Ni(e, t) {
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
var ki = typeof window < "u" ? m.useLayoutEffect : m.useEffect, un = /* @__PURE__ */ new WeakMap();
function Mi(e, t) {
  var n = Ni(null, function(r) {
    return e.forEach(function(o) {
      return ut(o, r);
    });
  });
  return ki(function() {
    var r = un.get(n);
    if (r) {
      var o = new Set(r), s = new Set(e), a = n.current;
      o.forEach(function(i) {
        s.has(i) || ut(i, null);
      }), s.forEach(function(i) {
        o.has(i) || ut(i, a);
      });
    }
    un.set(n, e);
  }, [e]), n;
}
function Ti(e) {
  return e;
}
function Li(e, t) {
  t === void 0 && (t = Ti);
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
function Di(e) {
  e === void 0 && (e = {});
  var t = Li(null);
  return t.options = X({ async: !0, ssr: !1 }, e), t;
}
var rr = function(e) {
  var t = e.sideCar, n = nr(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = t.read();
  if (!r)
    throw new Error("Sidecar medium not found");
  return m.createElement(r, X({}, n));
};
rr.isSideCarExport = !0;
function _i(e, t) {
  return e.useMedium(t), rr;
}
var or = Di(), dt = function() {
}, tt = m.forwardRef(function(e, t) {
  var n = m.useRef(null), r = m.useState({
    onScrollCapture: dt,
    onWheelCapture: dt,
    onTouchMoveCapture: dt
  }), o = r[0], s = r[1], a = e.forwardProps, i = e.children, l = e.className, c = e.removeScrollBar, u = e.enabled, d = e.shards, p = e.sideCar, h = e.noRelative, b = e.noIsolation, f = e.inert, g = e.allowPinchZoom, v = e.as, y = v === void 0 ? "div" : v, w = e.gapMode, x = nr(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), S = p, A = Mi([n, t]), E = X(X({}, x), o);
  return m.createElement(
    m.Fragment,
    null,
    u && m.createElement(S, { sideCar: or, removeScrollBar: c, shards: d, noRelative: h, noIsolation: b, inert: f, setCallbacks: s, allowPinchZoom: !!g, lockRef: n, gapMode: w }),
    a ? m.cloneElement(m.Children.only(i), X(X({}, E), { ref: A })) : m.createElement(y, X({}, E, { className: l, ref: A }), i)
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
var Ii = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function Fi() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = Ii();
  return t && e.setAttribute("nonce", t), e;
}
function Wi(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function zi(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var $i = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = Fi()) && (Wi(t, n), zi(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, Bi = function() {
  var e = $i();
  return function(t, n) {
    m.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, sr = function() {
  var e = Bi(), t = function(n) {
    var r = n.styles, o = n.dynamic;
    return e(r, o), null;
  };
  return t;
}, ji = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, ft = function(e) {
  return parseInt(e || "", 10) || 0;
}, Vi = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [ft(n), ft(r), ft(o)];
}, Hi = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return ji;
  var t = Vi(e), n = document.documentElement.clientWidth, r = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, r - n + t[2] - t[0])
  };
}, Ui = sr(), we = "data-scroll-locked", Gi = function(e, t, n, r) {
  var o = e.left, s = e.top, a = e.right, i = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(Ri, ` {
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
    `).concat(Oi, ": ").concat(i, `px;
  }
`);
}, dn = function() {
  var e = parseInt(document.body.getAttribute(we) || "0", 10);
  return isFinite(e) ? e : 0;
}, Yi = function() {
  m.useEffect(function() {
    return document.body.setAttribute(we, (dn() + 1).toString()), function() {
      var e = dn() - 1;
      e <= 0 ? document.body.removeAttribute(we) : document.body.setAttribute(we, e.toString());
    };
  }, []);
}, Xi = function(e) {
  var t = e.noRelative, n = e.noImportant, r = e.gapMode, o = r === void 0 ? "margin" : r;
  Yi();
  var s = m.useMemo(function() {
    return Hi(o);
  }, [o]);
  return m.createElement(Ui, { styles: Gi(s, !t, o, n ? "" : "!important") });
}, bt = !1;
if (typeof window < "u")
  try {
    var Be = Object.defineProperty({}, "passive", {
      get: function() {
        return bt = !0, !0;
      }
    });
    window.addEventListener("test", Be, Be), window.removeEventListener("test", Be, Be);
  } catch {
    bt = !1;
  }
var ge = bt ? { passive: !1 } : !1, Ki = function(e) {
  return e.tagName === "TEXTAREA";
}, ir = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !Ki(e) && n[t] === "visible")
  );
}, Zi = function(e) {
  return ir(e, "overflowY");
}, qi = function(e) {
  return ir(e, "overflowX");
}, fn = function(e, t) {
  var n = t.ownerDocument, r = t;
  do {
    typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
    var o = ar(e, r);
    if (o) {
      var s = cr(e, r), a = s[1], i = s[2];
      if (a > i)
        return !0;
    }
    r = r.parentNode;
  } while (r && r !== n.body);
  return !1;
}, Qi = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, r = e.clientHeight;
  return [
    t,
    n,
    r
  ];
}, Ji = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, r = e.clientWidth;
  return [
    t,
    n,
    r
  ];
}, ar = function(e, t) {
  return e === "v" ? Zi(t) : qi(t);
}, cr = function(e, t) {
  return e === "v" ? Qi(t) : Ji(t);
}, ea = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, ta = function(e, t, n, r, o) {
  var s = ea(e, window.getComputedStyle(t).direction), a = s * r, i = n.target, l = t.contains(i), c = !1, u = a > 0, d = 0, p = 0;
  do {
    if (!i)
      break;
    var h = cr(e, i), b = h[0], f = h[1], g = h[2], v = f - g - s * b;
    (b || v) && ar(e, i) && (d += v, p += b);
    var y = i.parentNode;
    i = y && y.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? y.host : y;
  } while (
    // portaled content
    !l && i !== document.body || // self content
    l && (t.contains(i) || t === i)
  );
  return (u && Math.abs(d) < 1 || !u && Math.abs(p) < 1) && (c = !0), c;
}, je = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, mn = function(e) {
  return [e.deltaX, e.deltaY];
}, pn = function(e) {
  return e && "current" in e ? e.current : e;
}, na = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, ra = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, oa = 0, ve = [];
function sa(e) {
  var t = m.useRef([]), n = m.useRef([0, 0]), r = m.useRef(), o = m.useState(oa++)[0], s = m.useState(sr)[0], a = m.useRef(e);
  m.useEffect(function() {
    a.current = e;
  }, [e]), m.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var f = Ai([e.lockRef.current], (e.shards || []).map(pn), !0).filter(Boolean);
      return f.forEach(function(g) {
        return g.classList.add("allow-interactivity-".concat(o));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(o)), f.forEach(function(g) {
          return g.classList.remove("allow-interactivity-".concat(o));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var i = m.useCallback(function(f, g) {
    if ("touches" in f && f.touches.length === 2 || f.type === "wheel" && f.ctrlKey)
      return !a.current.allowPinchZoom;
    var v = je(f), y = n.current, w = "deltaX" in f ? f.deltaX : y[0] - v[0], x = "deltaY" in f ? f.deltaY : y[1] - v[1], S, A = f.target, E = Math.abs(w) > Math.abs(x) ? "h" : "v";
    if ("touches" in f && E === "h" && A.type === "range")
      return !1;
    var k = fn(E, A);
    if (!k)
      return !0;
    if (k ? S = E : (S = E === "v" ? "h" : "v", k = fn(E, A)), !k)
      return !1;
    if (!r.current && "changedTouches" in f && (w || x) && (r.current = S), !S)
      return !0;
    var L = r.current || S;
    return ta(L, g, f, L === "h" ? w : x);
  }, []), l = m.useCallback(function(f) {
    var g = f;
    if (!(!ve.length || ve[ve.length - 1] !== s)) {
      var v = "deltaY" in g ? mn(g) : je(g), y = t.current.filter(function(S) {
        return S.name === g.type && (S.target === g.target || g.target === S.shadowParent) && na(S.delta, v);
      })[0];
      if (y && y.should) {
        g.cancelable && g.preventDefault();
        return;
      }
      if (!y) {
        var w = (a.current.shards || []).map(pn).filter(Boolean).filter(function(S) {
          return S.contains(g.target);
        }), x = w.length > 0 ? i(g, w[0]) : !a.current.noIsolation;
        x && g.cancelable && g.preventDefault();
      }
    }
  }, []), c = m.useCallback(function(f, g, v, y) {
    var w = { name: f, delta: g, target: v, should: y, shadowParent: ia(v) };
    t.current.push(w), setTimeout(function() {
      t.current = t.current.filter(function(x) {
        return x !== w;
      });
    }, 1);
  }, []), u = m.useCallback(function(f) {
    n.current = je(f), r.current = void 0;
  }, []), d = m.useCallback(function(f) {
    c(f.type, mn(f), f.target, i(f, e.lockRef.current));
  }, []), p = m.useCallback(function(f) {
    c(f.type, je(f), f.target, i(f, e.lockRef.current));
  }, []);
  m.useEffect(function() {
    return ve.push(s), e.setCallbacks({
      onScrollCapture: d,
      onWheelCapture: d,
      onTouchMoveCapture: p
    }), document.addEventListener("wheel", l, ge), document.addEventListener("touchmove", l, ge), document.addEventListener("touchstart", u, ge), function() {
      ve = ve.filter(function(f) {
        return f !== s;
      }), document.removeEventListener("wheel", l, ge), document.removeEventListener("touchmove", l, ge), document.removeEventListener("touchstart", u, ge);
    };
  }, []);
  var h = e.removeScrollBar, b = e.inert;
  return m.createElement(
    m.Fragment,
    null,
    b ? m.createElement(s, { styles: ra(o) }) : null,
    h ? m.createElement(Xi, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function ia(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const aa = _i(or, sa);
var lr = m.forwardRef(function(e, t) {
  return m.createElement(tt, X({}, e, { ref: t, sideCar: aa }));
});
lr.classNames = tt.classNames;
var nt = "Popover", [ur] = En(nt, [
  Hn
]), _e = Hn(), [ca, me] = ur(nt), dr = (e) => {
  const {
    __scopePopover: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: s,
    modal: a = !1
  } = e, i = _e(t), l = m.useRef(null), [c, u] = m.useState(!1), [d, p] = yi({
    prop: r,
    defaultProp: o ?? !1,
    onChange: s,
    caller: nt
  });
  return /* @__PURE__ */ C(di, { ...i, children: /* @__PURE__ */ C(
    ca,
    {
      scope: t,
      contentId: Uo(),
      triggerRef: l,
      open: d,
      onOpenChange: p,
      onOpenToggle: m.useCallback(() => p((h) => !h), [p]),
      hasCustomAnchor: c,
      onCustomAnchorAdd: m.useCallback(() => u(!0), []),
      onCustomAnchorRemove: m.useCallback(() => u(!1), []),
      modal: a,
      children: n
    }
  ) });
};
dr.displayName = nt;
var fr = "PopoverAnchor", la = m.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = me(fr, n), s = _e(n), { onCustomAnchorAdd: a, onCustomAnchorRemove: i } = o;
    return m.useEffect(() => (a(), () => i()), [a, i]), /* @__PURE__ */ C(Jn, { ...s, ...r, ref: t });
  }
);
la.displayName = fr;
var mr = "PopoverTrigger", pr = m.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = me(mr, n), s = _e(n), a = fe(t, o.triggerRef), i = /* @__PURE__ */ C(
      ne.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": o.open,
        "aria-controls": o.contentId,
        "data-state": yr(o.open),
        ...r,
        ref: a,
        onClick: ae(e.onClick, o.onOpenToggle)
      }
    );
    return o.hasCustomAnchor ? i : /* @__PURE__ */ C(Jn, { asChild: !0, ...s, children: i });
  }
);
pr.displayName = mr;
var kt = "PopoverPortal", [ua, da] = ur(kt, {
  forceMount: void 0
}), hr = (e) => {
  const { __scopePopover: t, forceMount: n, children: r, container: o } = e, s = me(kt, t);
  return /* @__PURE__ */ C(ua, { scope: t, forceMount: n, children: /* @__PURE__ */ C(Nt, { present: n || s.open, children: /* @__PURE__ */ C(er, { asChild: !0, container: o, children: r }) }) });
};
hr.displayName = kt;
var Se = "PopoverContent", gr = m.forwardRef(
  (e, t) => {
    const n = da(Se, e.__scopePopover), { forceMount: r = n.forceMount, ...o } = e, s = me(Se, e.__scopePopover);
    return /* @__PURE__ */ C(Nt, { present: r || s.open, children: s.modal ? /* @__PURE__ */ C(ma, { ...o, ref: t }) : /* @__PURE__ */ C(pa, { ...o, ref: t }) });
  }
);
gr.displayName = Se;
var fa = /* @__PURE__ */ Pn("PopoverContent.RemoveScroll"), ma = m.forwardRef(
  (e, t) => {
    const n = me(Se, e.__scopePopover), r = m.useRef(null), o = fe(t, r), s = m.useRef(!1);
    return m.useEffect(() => {
      const a = r.current;
      if (a) return Pi(a);
    }, []), /* @__PURE__ */ C(lr, { as: fa, allowPinchZoom: !0, children: /* @__PURE__ */ C(
      vr,
      {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: ae(e.onCloseAutoFocus, (a) => {
          var i;
          a.preventDefault(), s.current || (i = n.triggerRef.current) == null || i.focus();
        }),
        onPointerDownOutside: ae(
          e.onPointerDownOutside,
          (a) => {
            const i = a.detail.originalEvent, l = i.button === 0 && i.ctrlKey === !0, c = i.button === 2 || l;
            s.current = c;
          },
          { checkForDefaultPrevented: !1 }
        ),
        onFocusOutside: ae(
          e.onFocusOutside,
          (a) => a.preventDefault(),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
), pa = m.forwardRef(
  (e, t) => {
    const n = me(Se, e.__scopePopover), r = m.useRef(!1), o = m.useRef(!1);
    return /* @__PURE__ */ C(
      vr,
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
), vr = m.forwardRef(
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
    return _o(), /* @__PURE__ */ C(
      Nn,
      {
        asChild: !0,
        loop: !0,
        trapped: r,
        onMountAutoFocus: o,
        onUnmountAutoFocus: s,
        children: /* @__PURE__ */ C(
          Rn,
          {
            asChild: !0,
            disableOutsidePointerEvents: a,
            onInteractOutside: u,
            onEscapeKeyDown: i,
            onPointerDownOutside: l,
            onFocusOutside: c,
            onDismiss: () => p.onOpenChange(!1),
            children: /* @__PURE__ */ C(
              fi,
              {
                "data-state": yr(p.open),
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
), br = "PopoverClose", ha = m.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = me(br, n);
    return /* @__PURE__ */ C(
      ne.button,
      {
        type: "button",
        ...r,
        ref: t,
        onClick: ae(e.onClick, () => o.onOpenChange(!1))
      }
    );
  }
);
ha.displayName = br;
var ga = "PopoverArrow", va = m.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = _e(n);
    return /* @__PURE__ */ C(mi, { ...o, ...r, ref: t });
  }
);
va.displayName = ga;
function yr(e) {
  return e ? "open" : "closed";
}
var ba = dr, ya = pr, wa = hr, wr = gr;
const Fa = ba, Wa = ya, xa = Ee(({ className: e, align: t = "end", sideOffset: n = 8, ...r }, o) => /* @__PURE__ */ C(wa, { children: /* @__PURE__ */ C(
  wr,
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
xa.displayName = wr.displayName;
const Ca = de(
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
), Sa = Ee(
  ({ className: e, variant: t, icon: n, children: r, ...o }, s) => /* @__PURE__ */ H(
    "button",
    {
      ref: s,
      className: T(Ca({ variant: t }), e),
      ...o,
      children: [
        n && /* @__PURE__ */ C("span", { className: "shrink-0", children: n }),
        r
      ]
    }
  )
);
Sa.displayName = "PopoverMenuItem";
const Ea = de("cms-font-pretendard cms-text-black", {
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
}), Pa = ie.forwardRef(
  ({
    className: e,
    variant: t,
    align: n,
    decoration: r,
    as: o = "p",
    children: s,
    ...a
  }, i) => /* @__PURE__ */ C(
    o,
    {
      className: T(Ea({ variant: t, align: n, decoration: r }), e),
      ref: i,
      ...a,
      children: s
    }
  )
);
Pa.displayName = "Text";
const Aa = de(
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
), Ra = de("block text-cms-sm font-medium text-cms-black"), Oa = de(
  "block text-cms-sm font-medium text-cms-red-400 mt-1"
), Na = de(
  "block text-cms-sm font-normal text-cms-gray-700 mt-1"
), Ze = ie.forwardRef(
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
    const [f, g] = ie.useState(
      c || u || ""
    ), v = p || `input-${Math.random().toString(36).substr(2, 9)}`, y = o ? "error" : t, w = c !== void 0 ? c : f, x = (w == null ? void 0 : w.length) || 0, S = (E) => {
      c === void 0 && g(E.target.value), d == null || d(E);
    }, A = r || i && l;
    return /* @__PURE__ */ H("div", { className: T("w-full", !n && "w-auto"), children: [
      A && /* @__PURE__ */ H("div", { className: "flex justify-between items-center mb-2", children: [
        r ? /* @__PURE__ */ C("label", { htmlFor: v, className: Ra(), children: r }) : /* @__PURE__ */ C("div", {}),
        i && l && /* @__PURE__ */ H("span", { className: "text-cms-xs text-cms-gray-600", children: [
          x,
          " / ",
          l
        ] })
      ] }),
      /* @__PURE__ */ C(
        "input",
        {
          id: v,
          ref: b,
          className: T(
            Aa({ variant: y, fullWidth: n }),
            e
          ),
          maxLength: l,
          value: c,
          defaultValue: u,
          onChange: S,
          ...h
        }
      ),
      o && s && /* @__PURE__ */ C("span", { className: Oa(), children: s }),
      !o && a && /* @__PURE__ */ C("span", { className: Na(), children: a })
    ] });
  }
);
Ze.displayName = "TextInput";
const ka = ie.forwardRef(
  ({ value: e, onChange: t, min: n, max: r, ...o }, s) => /* @__PURE__ */ C(
    Ze,
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
ka.displayName = "DatePicker";
const Ma = ie.forwardRef(
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
    const [f, g] = ie.useState((e == null ? void 0 : e.start) || ""), [v, y] = ie.useState((e == null ? void 0 : e.end) || "");
    ie.useEffect(() => {
      e && (g(e.start), y(e.end));
    }, [e]);
    const w = (S) => {
      const A = S.target.value;
      g(A), t == null || t({ start: A, end: v });
    }, x = (S) => {
      const A = S.target.value;
      y(A), t == null || t({ start: f, end: A });
    };
    return /* @__PURE__ */ H("div", { ref: b, className: T("cms-w-full", !p && "cms-w-auto"), children: [
      l && /* @__PURE__ */ C("label", { className: "cms-block cms-text-cms-md cms-font-medium cms-text-black cms-mb-2", children: l }),
      /* @__PURE__ */ H("div", { className: "cms-flex cms-gap-4 cms-items-center", children: [
        /* @__PURE__ */ C(
          Ze,
          {
            type: "date",
            value: f,
            onChange: w,
            placeholder: o,
            min: a,
            max: v || i,
            fullWidth: !0,
            ...h
          }
        ),
        /* @__PURE__ */ C("span", { className: "cms-text-cms-md cms-text-gray-600", children: "~" }),
        /* @__PURE__ */ C(
          Ze,
          {
            type: "date",
            value: v,
            onChange: x,
            placeholder: s,
            min: f || a,
            max: i,
            fullWidth: !0,
            ...h
          }
        )
      ] }),
      c && u && /* @__PURE__ */ C("span", { className: "cms-block cms-text-cms-sm cms-font-medium cms-text-red-400 cms-mt-1", children: u }),
      !c && d && /* @__PURE__ */ C("span", { className: "cms-block cms-text-cms-sm cms-font-normal cms-text-gray-600 cms-mt-1", children: d })
    ] });
  }
);
Ma.displayName = "DateRangePicker";
export {
  fo as Button,
  Ia as ChevronRightIcon,
  bo as Combobox,
  ka as DatePicker,
  Ma as DateRangePicker,
  wt as Dropdown,
  _a as LoadingCircle,
  Fa as Popover,
  xa as PopoverContent,
  Sa as PopoverMenuItem,
  Wa as PopoverTrigger,
  vo as Select,
  Pa as Text,
  Ze as TextInput,
  uo as buttonVariants,
  T as cn,
  po as dropdownTriggerVariants,
  Ca as popoverMenuItemVariants
};
//# sourceMappingURL=index.es.js.map
