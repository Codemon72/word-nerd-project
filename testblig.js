var $jscomp = $jscomp || {}
$jscomp.scope = {}
$jscomp.owns = function (a, b) {
  return Object.prototype.hasOwnProperty.call(a, b)
}
$jscomp.ASSUME_ES5 = !1
$jscomp.ASSUME_NO_NATIVE_MAP = !1
$jscomp.ASSUME_NO_NATIVE_SET = !1
$jscomp.SIMPLE_FROUND_POLYFILL = !1
$jscomp.ISOLATE_POLYFILLS = !1
$jscomp.FORCE_POLYFILL_PROMISE = !1
$jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION = !1
$jscomp.defineProperty =
  $jscomp.ASSUME_ES5 || 'function' == typeof Object.defineProperties
    ? Object.defineProperty
    : function (a, b, c) {
        if (a == Array.prototype || a == Object.prototype) return a
        a[b] = c.value
        return a
      }
$jscomp.getGlobal = function (a) {
  a = [
    'object' == typeof globalThis && globalThis,
    a,
    'object' == typeof window && window,
    'object' == typeof self && self,
    'object' == typeof global && global,
  ]
  for (var b = 0; b < a.length; ++b) {
    var c = a[b]
    if (c && c.Math == Math) return c
  }
  throw Error('Cannot find global object')
}
$jscomp.global = $jscomp.getGlobal(this)
$jscomp.IS_SYMBOL_NATIVE =
  'function' === typeof Symbol && 'symbol' === typeof Symbol('x')
$jscomp.TRUST_ES6_POLYFILLS =
  !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE
$jscomp.polyfills = {}
$jscomp.propertyToPolyfillSymbol = {}
$jscomp.POLYFILL_PREFIX = '$jscp$'
var $jscomp$lookupPolyfilledValue = function (a, b) {
  var c = $jscomp.propertyToPolyfillSymbol[b]
  if (null == c) return a[b]
  c = a[c]
  return void 0 !== c ? c : a[b]
}
$jscomp.polyfill = function (a, b, c, e) {
  b &&
    ($jscomp.ISOLATE_POLYFILLS
      ? $jscomp.polyfillIsolated(a, b, c, e)
      : $jscomp.polyfillUnisolated(a, b, c, e))
}
$jscomp.polyfillUnisolated = function (a, b, c, e) {
  c = $jscomp.global
  a = a.split('.')
  for (e = 0; e < a.length - 1; e++) {
    var f = a[e]
    if (!(f in c)) return
    c = c[f]
  }
  a = a[a.length - 1]
  e = c[a]
  b = b(e)
  b != e &&
    null != b &&
    $jscomp.defineProperty(c, a, { configurable: !0, writable: !0, value: b })
}
$jscomp.polyfillIsolated = function (a, b, c, e) {
  var f = a.split('.')
  a = 1 === f.length
  e = f[0]
  e = !a && e in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global
  for (var m = 0; m < f.length - 1; m++) {
    var p = f[m]
    if (!(p in e)) return
    e = e[p]
  }
  f = f[f.length - 1]
  c = $jscomp.IS_SYMBOL_NATIVE && 'es6' === c ? e[f] : null
  b = b(c)
  null != b &&
    (a
      ? $jscomp.defineProperty($jscomp.polyfills, f, {
          configurable: !0,
          writable: !0,
          value: b,
        })
      : b !== c &&
        (void 0 === $jscomp.propertyToPolyfillSymbol[f] &&
          ((c = (1e9 * Math.random()) >>> 0),
          ($jscomp.propertyToPolyfillSymbol[f] = $jscomp.IS_SYMBOL_NATIVE
            ? $jscomp.global.Symbol(f)
            : $jscomp.POLYFILL_PREFIX + c + '$' + f)),
        $jscomp.defineProperty(e, $jscomp.propertyToPolyfillSymbol[f], {
          configurable: !0,
          writable: !0,
          value: b,
        })))
}
$jscomp.polyfill(
  'Object.values',
  function (a) {
    return a
      ? a
      : function (b) {
          var c = [],
            e
          for (e in b) $jscomp.owns(b, e) && c.push(b[e])
          return c
        }
  },
  'es8',
  'es3'
)
$jscomp.polyfill(
  'Object.is',
  function (a) {
    return a
      ? a
      : function (b, c) {
          return b === c ? 0 !== b || 1 / b === 1 / c : b !== b && c !== c
        }
  },
  'es6',
  'es3'
)
$jscomp.polyfill(
  'Array.prototype.includes',
  function (a) {
    return a
      ? a
      : function (b, c) {
          var e = this
          e instanceof String && (e = String(e))
          var f = e.length
          c = c || 0
          for (0 > c && (c = Math.max(c + f, 0)); c < f; c++) {
            var m = e[c]
            if (m === b || Object.is(m, b)) return !0
          }
          return !1
        }
  },
  'es7',
  'es3'
)
$jscomp.checkStringArgs = function (a, b, c) {
  if (null == a)
    throw new TypeError(
      "The 'this' value for String.prototype." +
        c +
        ' must not be null or undefined'
    )
  if (b instanceof RegExp)
    throw new TypeError(
      'First argument to String.prototype.' +
        c +
        ' must not be a regular expression'
    )
  return a + ''
}
$jscomp.polyfill(
  'String.prototype.includes',
  function (a) {
    return a
      ? a
      : function (b, c) {
          return (
            -1 !==
            $jscomp.checkStringArgs(this, b, 'includes').indexOf(b, c || 0)
          )
        }
  },
  'es6',
  'es3'
)
$jscomp.findInternal = function (a, b, c) {
  a instanceof String && (a = String(a))
  for (var e = a.length, f = 0; f < e; f++) {
    var m = a[f]
    if (b.call(c, m, f, a)) return { i: f, v: m }
  }
  return { i: -1, v: void 0 }
}
$jscomp.polyfill(
  'Array.prototype.find',
  function (a) {
    return a
      ? a
      : function (b, c) {
          return $jscomp.findInternal(this, b, c).v
        }
  },
  'es6',
  'es3'
)
$jscomp.checkEs6ConformanceViaProxy = function () {
  try {
    var a = {},
      b = Object.create(
        new $jscomp.global.Proxy(a, {
          get: function (c, e, f) {
            return c == a && 'q' == e && f == b
          },
        })
      )
    return !0 === b.q
  } catch (c) {
    return !1
  }
}
$jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS = !1
$jscomp.ES6_CONFORMANCE =
  $jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS &&
  $jscomp.checkEs6ConformanceViaProxy()
$jscomp.arrayIteratorImpl = function (a) {
  var b = 0
  return function () {
    return b < a.length ? { done: !1, value: a[b++] } : { done: !0 }
  }
}
$jscomp.arrayIterator = function (a) {
  return { next: $jscomp.arrayIteratorImpl(a) }
}
$jscomp.initSymbol = function () {}
$jscomp.polyfill(
  'Symbol',
  function (a) {
    if (a) return a
    var b = function (m, p) {
      this.$jscomp$symbol$id_ = m
      $jscomp.defineProperty(this, 'description', {
        configurable: !0,
        writable: !0,
        value: p,
      })
    }
    b.prototype.toString = function () {
      return this.$jscomp$symbol$id_
    }
    var c = 'jscomp_symbol_' + ((1e9 * Math.random()) >>> 0) + '_',
      e = 0,
      f = function (m) {
        if (this instanceof f)
          throw new TypeError('Symbol is not a constructor')
        return new b(c + (m || '') + '_' + e++, m)
      }
    return f
  },
  'es6',
  'es3'
)
$jscomp.polyfill(
  'Symbol.iterator',
  function (a) {
    if (a) return a
    a = Symbol('Symbol.iterator')
    for (
      var b =
          'Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array'.split(
            ' '
          ),
        c = 0;
      c < b.length;
      c++
    ) {
      var e = $jscomp.global[b[c]]
      'function' === typeof e &&
        'function' != typeof e.prototype[a] &&
        $jscomp.defineProperty(e.prototype, a, {
          configurable: !0,
          writable: !0,
          value: function () {
            return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this))
          },
        })
    }
    return a
  },
  'es6',
  'es3'
)
$jscomp.iteratorPrototype = function (a) {
  a = { next: a }
  a[Symbol.iterator] = function () {
    return this
  }
  return a
}
$jscomp.makeIterator = function (a) {
  var b = 'undefined' != typeof Symbol && Symbol.iterator && a[Symbol.iterator]
  return b ? b.call(a) : $jscomp.arrayIterator(a)
}
$jscomp.polyfill(
  'WeakMap',
  function (a) {
    function b() {
      if (!a || !Object.seal) return !1
      try {
        var k = Object.seal({}),
          h = Object.seal({}),
          q = new a([
            [k, 2],
            [h, 3],
          ])
        if (2 != q.get(k) || 3 != q.get(h)) return !1
        q.delete(k)
        q.set(h, 4)
        return !q.has(k) && 4 == q.get(h)
      } catch (v) {
        return !1
      }
    }
    function c() {}
    function e(k) {
      var h = typeof k
      return ('object' === h && null !== k) || 'function' === h
    }
    function f(k) {
      if (!$jscomp.owns(k, p)) {
        var h = new c()
        $jscomp.defineProperty(k, p, { value: h })
      }
    }
    function m(k) {
      if (!$jscomp.ISOLATE_POLYFILLS) {
        var h = Object[k]
        h &&
          (Object[k] = function (q) {
            if (q instanceof c) return q
            Object.isExtensible(q) && f(q)
            return h(q)
          })
      }
    }
    if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
      if (a && $jscomp.ES6_CONFORMANCE) return a
    } else if (b()) return a
    var p = '$jscomp_hidden_' + Math.random()
    m('freeze')
    m('preventExtensions')
    m('seal')
    var w = 0,
      g = function (k) {
        this.id_ = (w += Math.random() + 1).toString()
        if (k) {
          k = $jscomp.makeIterator(k)
          for (var h; !(h = k.next()).done; )
            (h = h.value), this.set(h[0], h[1])
        }
      }
    g.prototype.set = function (k, h) {
      if (!e(k)) throw Error('Invalid WeakMap key')
      f(k)
      if (!$jscomp.owns(k, p)) throw Error('WeakMap key fail: ' + k)
      k[p][this.id_] = h
      return this
    }
    g.prototype.get = function (k) {
      return e(k) && $jscomp.owns(k, p) ? k[p][this.id_] : void 0
    }
    g.prototype.has = function (k) {
      return e(k) && $jscomp.owns(k, p) && $jscomp.owns(k[p], this.id_)
    }
    g.prototype.delete = function (k) {
      return e(k) && $jscomp.owns(k, p) && $jscomp.owns(k[p], this.id_)
        ? delete k[p][this.id_]
        : !1
    }
    return g
  },
  'es6',
  'es3'
)
$jscomp.MapEntry = function () {}
$jscomp.polyfill(
  'Map',
  function (a) {
    function b() {
      if (
        $jscomp.ASSUME_NO_NATIVE_MAP ||
        !a ||
        'function' != typeof a ||
        !a.prototype.entries ||
        'function' != typeof Object.seal
      )
        return !1
      try {
        var g = Object.seal({ x: 4 }),
          k = new a($jscomp.makeIterator([[g, 's']]))
        if (
          's' != k.get(g) ||
          1 != k.size ||
          k.get({ x: 4 }) ||
          k.set({ x: 4 }, 't') != k ||
          2 != k.size
        )
          return !1
        var h = k.entries(),
          q = h.next()
        if (q.done || q.value[0] != g || 's' != q.value[1]) return !1
        q = h.next()
        return q.done ||
          4 != q.value[0].x ||
          't' != q.value[1] ||
          !h.next().done
          ? !1
          : !0
      } catch (v) {
        return !1
      }
    }
    if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
      if (a && $jscomp.ES6_CONFORMANCE) return a
    } else if (b()) return a
    var c = new WeakMap(),
      e = function (g) {
        this.data_ = {}
        this.head_ = p()
        this.size = 0
        if (g) {
          g = $jscomp.makeIterator(g)
          for (var k; !(k = g.next()).done; )
            (k = k.value), this.set(k[0], k[1])
        }
      }
    e.prototype.set = function (g, k) {
      g = 0 === g ? 0 : g
      var h = f(this, g)
      h.list || (h.list = this.data_[h.id] = [])
      h.entry
        ? (h.entry.value = k)
        : ((h.entry = {
            next: this.head_,
            previous: this.head_.previous,
            head: this.head_,
            key: g,
            value: k,
          }),
          h.list.push(h.entry),
          (this.head_.previous.next = h.entry),
          (this.head_.previous = h.entry),
          this.size++)
      return this
    }
    e.prototype.delete = function (g) {
      g = f(this, g)
      return g.entry && g.list
        ? (g.list.splice(g.index, 1),
          g.list.length || delete this.data_[g.id],
          (g.entry.previous.next = g.entry.next),
          (g.entry.next.previous = g.entry.previous),
          (g.entry.head = null),
          this.size--,
          !0)
        : !1
    }
    e.prototype.clear = function () {
      this.data_ = {}
      this.head_ = this.head_.previous = p()
      this.size = 0
    }
    e.prototype.has = function (g) {
      return !!f(this, g).entry
    }
    e.prototype.get = function (g) {
      return (g = f(this, g).entry) && g.value
    }
    e.prototype.entries = function () {
      return m(this, function (g) {
        return [g.key, g.value]
      })
    }
    e.prototype.keys = function () {
      return m(this, function (g) {
        return g.key
      })
    }
    e.prototype.values = function () {
      return m(this, function (g) {
        return g.value
      })
    }
    e.prototype.forEach = function (g, k) {
      for (var h = this.entries(), q; !(q = h.next()).done; )
        (q = q.value), g.call(k, q[1], q[0], this)
    }
    e.prototype[Symbol.iterator] = e.prototype.entries
    var f = function (g, k) {
        var h = k && typeof k
        'object' == h || 'function' == h
          ? c.has(k)
            ? (h = c.get(k))
            : ((h = '' + ++w), c.set(k, h))
          : (h = 'p_' + k)
        var q = g.data_[h]
        if (q && $jscomp.owns(g.data_, h))
          for (g = 0; g < q.length; g++) {
            var v = q[g]
            if ((k !== k && v.key !== v.key) || k === v.key)
              return { id: h, list: q, index: g, entry: v }
          }
        return { id: h, list: q, index: -1, entry: void 0 }
      },
      m = function (g, k) {
        var h = g.head_
        return $jscomp.iteratorPrototype(function () {
          if (h) {
            for (; h.head != g.head_; ) h = h.previous
            for (; h.next != h.head; )
              return (h = h.next), { done: !1, value: k(h) }
            h = null
          }
          return { done: !0, value: void 0 }
        })
      },
      p = function () {
        var g = {}
        return (g.previous = g.next = g.head = g)
      },
      w = 0
    return e
  },
  'es6',
  'es3'
)
$jscomp.polyfill(
  'Set',
  function (a) {
    function b() {
      if (
        $jscomp.ASSUME_NO_NATIVE_SET ||
        !a ||
        'function' != typeof a ||
        !a.prototype.entries ||
        'function' != typeof Object.seal
      )
        return !1
      try {
        var e = Object.seal({ x: 4 }),
          f = new a($jscomp.makeIterator([e]))
        if (
          !f.has(e) ||
          1 != f.size ||
          f.add(e) != f ||
          1 != f.size ||
          f.add({ x: 4 }) != f ||
          2 != f.size
        )
          return !1
        var m = f.entries(),
          p = m.next()
        if (p.done || p.value[0] != e || p.value[1] != e) return !1
        p = m.next()
        return p.done ||
          p.value[0] == e ||
          4 != p.value[0].x ||
          p.value[1] != p.value[0]
          ? !1
          : m.next().done
      } catch (w) {
        return !1
      }
    }
    if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
      if (a && $jscomp.ES6_CONFORMANCE) return a
    } else if (b()) return a
    var c = function (e) {
      this.map_ = new Map()
      if (e) {
        e = $jscomp.makeIterator(e)
        for (var f; !(f = e.next()).done; ) this.add(f.value)
      }
      this.size = this.map_.size
    }
    c.prototype.add = function (e) {
      e = 0 === e ? 0 : e
      this.map_.set(e, e)
      this.size = this.map_.size
      return this
    }
    c.prototype.delete = function (e) {
      e = this.map_.delete(e)
      this.size = this.map_.size
      return e
    }
    c.prototype.clear = function () {
      this.map_.clear()
      this.size = 0
    }
    c.prototype.has = function (e) {
      return this.map_.has(e)
    }
    c.prototype.entries = function () {
      return this.map_.entries()
    }
    c.prototype.values = function () {
      return this.map_.values()
    }
    c.prototype.keys = c.prototype.values
    c.prototype[Symbol.iterator] = c.prototype.values
    c.prototype.forEach = function (e, f) {
      var m = this
      this.map_.forEach(function (p) {
        return e.call(f, p, p, m)
      })
    }
    return c
  },
  'es6',
  'es3'
)
$jscomp.polyfill(
  'String.prototype.endsWith',
  function (a) {
    return a
      ? a
      : function (b, c) {
          var e = $jscomp.checkStringArgs(this, b, 'endsWith')
          b += ''
          void 0 === c && (c = e.length)
          c = Math.max(0, Math.min(c | 0, e.length))
          for (var f = b.length; 0 < f && 0 < c; )
            if (e[--c] != b[--f]) return !1
          return 0 >= f
        }
  },
  'es6',
  'es3'
)
var filter_term = '',
  filter_startswith = '',
  filter_endswith = '',
  filter_relatedto = '',
  filter_rhymeswith = '',
  filter_soundslike = '',
  filter_vowelslike = '',
  filter_stresspattern = '',
  filter_numberofletters = '',
  filter_numberofsyllables = '',
  filter_relatedto_original = '',
  requested_lang = '',
  full_api_query = '',
  panelToStartIndex = [],
  sortOrderCode = 'rv1',
  sense_id = '',
  sortTopN = 100,
  viz_mode = !1,
  panelToPrefix = [],
  panelToContent = [],
  currentPanelId = 0,
  selected_res_id = null,
  selected_res = null,
  query_cluster_title = null,
  COLORS = {
    blue: 'lightblue',
    pink: 'pink',
    red: '#FFCCCB',
    green: 'lightgreen',
    yellow: 'lightyellow',
    brown: '#D4B494',
    orange: '#FED8B1',
    purple: 'purple',
    gold: '#F1E5AC',
  },
  MAX_TOPDEF_LENGTH_CHARS = 2e3,
  MAX_TOPDEF_LENGTH_CHARS_NO_SENSE = 300,
  STRESS_PATTERNS = '/ /x x/ // /xx x/x xx/ /xxx x/xx xx/x xxx/'.split(' '),
  SYLLABLE_COUNTS = '123456789'.split(''),
  LETTER_COUNTS = '1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20+'.split(
    ' '
  ),
  STYLE_MARKERS = {
    idiomatic: 'Idioms/Slang',
    figuratively: 'Idioms/Slang',
    slang: 'Idioms/Slang',
    historical: 'Old',
    obsolete: 'Old',
    archaic: 'Old',
    dated: 'Old',
  },
  VOWEL_SOUND_PROTOTYPES =
    'a (as in ball);a (as in bat);a (as in bay);e (as in bet);e (as in bee);i (as in bit);i (as in bite);o (as in bob);o (as in boat);oo (as in book);oo (as in boo);ou (as in bout);oy (as in boy);er (as in burr);u (as in but)'.split(
      ';'
    ),
  XREF_REGEX =
    /^(.{1,30} (in|of|to) )(being |a |an |the )?([^.,(]{1,30})([., ])*$/,
  resultData = []
function getUrlVars() {
  var a = [],
    b = window.location.href
      .slice(window.location.href.indexOf('?') + 1)
      .split('&'),
    c
  for (c = 0; c < b.length; c++) {
    var e = b[c].split('=')
    a.push(e[0])
    a[e[0]] = decodeURIComponent(e[1])
  }
  return a
}
function rfc3986EncodeURIComponent(a) {
  return encodeURIComponent(a).replace(/[!'()*]/g, escape)
}
function isBot() {
  return /(bot|crawler)/i.test(navigator.userAgent)
}
function is_touch_device() {
  return (
    'ontouchstart' in window ||
    0 < navigator.MaxTouchPoints ||
    0 < navigator.msMaxTouchPoints
  )
}
function showFiltersIfActive() {
  areFiltersActive() && showFilters()
}
function clickVowelTeaser() {
  filtersAreOpen() || showFilters()
  $('#filter_vowelslike').autocomplete('search', '')
}
function clickSense(a) {
  a = $(a.target).attr('thessense')
  a = makeCurrentUrl(null) + '&senseid=' + a
  window.location.href = a
}
function thesInit(a) {
  var b = getUrlVars()
  ;(a = b[a]) || (a = b.s)
  var c = $('#thesinput')
  clearFilters()
  'undefined' != typeof b.lang
    ? (requested_lang = b.lang)
    : window.location.href.match(/\/tesauro/) && (requested_lang = 'es')
  beta_mode = window.location.href.match(/\/thesaurus-beta/) ? !0 : !1
  'undefined' != typeof a &&
    ((filter_term = a.replace(/[+]/gm, ' ').replace(/[<>=]/gm, '')),
    'undefined' != typeof b.f_sw && (filter_startswith = b.f_sw),
    'undefined' != typeof b.f_ew && (filter_endswith = b.f_ew),
    'undefined' != typeof b.f_sl && (filter_soundslike = b.f_sl),
    'undefined' != typeof b.f_vl && (filter_vowelslike = b.f_vl),
    'undefined' != typeof b.f_nl && (filter_numberofletters = b.f_nl),
    'undefined' != typeof b.f_ns && (filter_numberofsyllables = b.f_ns),
    'undefined' != typeof b.f_rw && (filter_rhymeswith = b.f_rw),
    'undefined' != typeof b.f_stress && (filter_stresspattern = b.f_stress),
    'undefined' != typeof b.f_rt && (filter_relatedto = b.f_rt),
    'undefined' != typeof b.viz && (viz_mode = !0),
    'undefined' != typeof b.senseid && (sense_id = b.senseid),
    'undefined' != typeof b.sortby &&
      ((sortOrderCode = b.sortby),
      $('#sortOrderControl').val(sortOrderCode),
      'rv1' === sortOrderCode
        ? $('#rerank_topn').hide()
        : $('#rerank_topn').show()),
    'undefined' != typeof b.sorttopn &&
      ((sortTopN = parseInt(b.sorttopn)),
      $('#sortTopNControl').val(b.sorttopn)),
    0 < c.length &&
      (currentQueryIsClusterQuery() ? c.val('') : c.val(filter_term),
      (document.title = makeTitle()),
      document
        .querySelector('meta[name="apple-itunes-app"]')
        .setAttribute(
          'content',
          'app-id=1615071061, app-argument=' +
            encodeURIComponent(makeCurrentUrl(null))
        ),
      c[0].focus()),
    setHelplineSpinner(),
    lookup(),
    setFilters(),
    showFiltersIfActive())
  '' === $('#helpline1').val() &&
    'undefined' === typeof THESAURUS_SUPPRESS_BASE_HELPLINE &&
    setHelpline('<i>' + locText('ENTER_HELP') + '</i>')
  $('#tabs').hide()
  $('#sortOrderControl').selectmenu({ width: 220 })
  $('#sortTopNControl').selectmenu({ width: 140 })
  $('#sortOrderControl').on('selectmenuchange', function () {
    sortOrderCode = this.value
    if (
      currentQueryHasWildcard() ||
      currentQueryIsClusterQuery() ||
      0 != currentPanelId
    )
      sortTopN = 1e3
    filter_relatedto_original = filter_relatedto
    filter_relatedto = ''
    rerank(currentPanelId)
    'rv1' === sortOrderCode ||
    currentQueryHasWildcard() ||
    currentQueryIsClusterQuery()
      ? $('#rerank_topn').hide()
      : $('#rerank_topn').show()
    0 != currentPanelId &&
      ($('#sortTopNControl').val('1000'),
      $('#sortTopNControl').selectmenu('refresh'))
  })
  $('#sortTopNControl').on('selectmenuchange', function () {
    sortTopN = parseInt(this.value)
    rerank()
  })
  $('body').click(globalOnclick)
  $(document).tooltip({ show: { delay: 800 } })
}
function makeTooltip(a, b, c, e, f, m, p, w, g, k) {
  var h =
    "<button class='close_btn' type='button'><iconify-icon inline icon='bi:x' height='25'></iconify-icon></button>"
  var q = a.toLowerCase(),
    v = THESAURUS_QUICKLINK_TEMPLATE
  'undefined' != typeof v &&
    '' !== v &&
    (h +=
      "<div class='thes_ql'>" +
      v.replace(/%s/g, a).replace(/%o/g, makeCurrentUrl(a)) +
      '</div> ')
  v = !1
  if (q in b) {
    b = b[q]
    c = c[q] ? c[q] : a
    var y = e[q]
    null == y && (y = e[c])
    e = format_usage_string(p[q], m[q])
    f = format_defs(b, f, c, y, w, e, g, k[q])
    '' !== f &&
      ((h +=
        "<div class='thes_defs'>" +
        f +
        "</div><div class='dynamic-def-content'></div>"),
      (v = !0))
  }
  '' !== h &&
    (v ||
      (h +=
        "<div class='thes_defs'><b class='thes_ql_title'><i>" +
        a +
        "</i></b><div class='dynamic-def-content'></div></div>"))
  return h
}
function makeTitle() {
  var a = filter_term
  if (currentQueryIsClusterQuery())
    if (query_cluster_title) a = query_cluster_title
    else return 'OneLook Thesaurus'
  return a + ': OneLook Thesaurus'
}
function reorderPanels() {
  if (4 <= panelToContent.length) {
    var a = panelToPrefix[1],
      b = panelToPrefix[2],
      c = ''
    'n' === a
      ? (c = 'adj')
      : 'adj' === a
      ? (c = 'n')
      : 'v' === a
      ? (c = 'adv')
      : 'adv' === a && (c = 'v')
    if ('' !== c && c !== b)
      for (a = 3; a < panelToContent.length; a++)
        if (panelToPrefix[a] === c) {
          panelToPrefix[a] = panelToPrefix[2]
          panelToPrefix[2] = c
          c = panelToContent[2]
          panelToContent[2] = panelToContent[a]
          panelToContent[a] = c
          break
        }
  }
  c = []
  a = {}
  for (b = 0; b < panelToPrefix.length; b++) {
    var e = panelToPrefix[b]
    ;('all' !== e && 'adj' !== e && 'n' !== e && 'v' !== e && 'adv' !== e) ||
      c.push(e)
    a[e] = panelToContent[b]
  }
  e = Object.values(STYLE_MARKERS)
  for (b = 0; b < e.length; b++) {
    var f = 'style:' + e[b]
    !c.includes(f) && panelToPrefix.includes(f) && c.push('style:' + e[b])
  }
  panelToContent = []
  for (b = 0; b < c.length; b++) panelToContent.push(a[c[b]])
  panelToPrefix = c
}
function vizButtonStr(a, b) {
  return (
    '<button id="vizbutton" onClick="viz_mode_' + a + '();">' + b + '</button>'
  )
}
function rerank(a) {
  panelToStartIndex = []
  a || (a = 0)
  layoutResults(a)
  saveWindowState(!1)
}
function viz_mode_on() {
  viz_mode = !0
  layoutResults(0)
  $('#vizspan').html(vizButtonStr('off', locText('VIZ_BUTTON_OFF')))
  saveWindowState(!0)
}
function viz_mode_off() {
  viz_mode = !1
  layoutResults(0)
  $('#vizspan').html(vizButtonStr('on', locText('VIZ_BUTTON_ON')))
  saveWindowState(!0)
}
function click_meter_filter(a) {
  filt_meter(a)
  showFiltersIfActive()
  inputBlur($('#filter_stresspattern')[0], 'Meter')
}
function addFilterHiddenParam(a, b, c) {
  var e = $('#form1')
  if ('undefined' != typeof e) {
    var f = $('#rzform_filt_' + a)
    'undefined' != typeof f && f.remove()
    '' !== c &&
      e.append(
        '<input id="rzform_filt_' +
          a +
          '" type="hidden" name="' +
          b +
          '" value="' +
          c +
          '">'
      )
  }
}
function filt_meter(a) {
  filter_stresspattern = a
  filter_numberofsyllables = ''
  clearFilter('numberofsyllables', 'Num. syllables')
  filter_soundslike = ''
  clearFilter('soundslike', 'Sounds like')
  filter_vowelslike = ''
  clearFilter('vowelslike', 'Primary vowel')
  $('#filter_stresspattern').val(filter_stresspattern)
  getResults(!1)
}
function filt_sylcount(a) {
  filter_numberofsyllables = a
  filter_soundslike = ''
  clearFilter('soundslike', 'Sounds like')
  filter_vowelslike = ''
  clearFilter('vowelslike', 'Primary vowel')
  filter_stresspattern = ''
  clearFilter('stresspattern', 'Stress')
  getResults(!1)
}
function filt_lettercount(a) {
  filter_numberofletters = a
  getResults(!1)
}
function filt_vowels(a) {
  filter_vowelslike = a
  filter_soundslike = ''
  clearFilter('soundslike', 'Sounds like')
  filter_numberofsyllables = ''
  clearFilter('numberofsyllables', 'Num. syllables')
  filter_stresspattern = ''
  clearFilter('stresspattern', 'Stress')
  getResults(!1)
}
function attributionString(a) {
  return a.match(/[ ][ ]$/) ? 'wiki' : a.match(/[ ]$/) ? 'wikt' : ''
}
function definitionStyleTags(a) {
  var b = []
  a = /\(([^)]+)\)/.exec(a)
  if (null != a && 1 < a.length) {
    a = a[1].split(',')
    var c
    for (c = 0; c < a.length; c++) {
      var e = a[c].trim()
      e = e.replace('chiefly ', '')
      e = e.replace(' spelling', '')
      void 0 !== STYLE_MARKERS[e] && b.push('style:' + STYLE_MARKERS[e])
    }
  }
  return b
}
function addLinksToGloss(a) {
  return a.replace(XREF_REGEX, function (b, c, e, f, m, p) {
    link = makeCurrentUrl(null)
    link += '&loc=xref'
    link = link.replace(
      's=' + encodeURIComponent(filter_term),
      's=' + encodeURIComponent(m)
    )
    link = '<a href="' + link + '">' + m + '</a>'
    f && (link = f + link)
    p && (link += p)
    return c + link
  })
}
function makeCurrentUrl(a) {
  urlPath = '?s=' + encodeURIComponent(filter_term)
  '' !== filter_startswith &&
    (urlPath += '&f_sw=' + encodeURIComponent(filter_startswith))
  '' !== filter_endswith &&
    (urlPath += '&f_ew=' + encodeURIComponent(filter_endswith))
  null !== a
    ? (urlPath += '&f_rt=' + encodeURIComponent(a.replace(' ', '_')))
    : '' !== filter_relatedto &&
      (urlPath += '&f_rt=' + encodeURIComponent(filter_relatedto))
  '' !== filter_rhymeswith &&
    (urlPath += '&f_rw=' + encodeURIComponent(filter_rhymeswith))
  '' !== filter_soundslike &&
    (urlPath += '&f_sl=' + encodeURIComponent(filter_soundslike))
  '' !== filter_vowelslike &&
    (urlPath += '&f_vl=' + encodeURIComponent(filter_vowelslike))
  '' !== filter_stresspattern &&
    (urlPath += '&f_stress=' + encodeURIComponent(filter_stresspattern))
  '' !== filter_numberofletters &&
    (urlPath += '&f_nl=' + encodeURIComponent(filter_numberofletters))
  '' !== filter_numberofsyllables &&
    (urlPath += '&f_ns=' + encodeURIComponent(filter_numberofsyllables))
  'rv1' !== sortOrderCode && (urlPath += '&sortby=' + sortOrderCode)
  100 !== sortTopN && (urlPath += '&sorttopn=' + sortTopN.toString())
  viz_mode && (urlPath += '&viz=1')
  'es' === requested_lang && (urlPath += '&lang=es')
  null != selected_res_id && (urlPath += '&res=' + selected_res_id)
  return urlPath
}
function saveWindowState(a) {
  if (!(0 >= $('#thesinput').length)) {
    var b = makeTitle(),
      c = makeCurrentUrl(null)
    try {
      a && window.history && window.history.pushState
        ? window.history.pushState({}, b, c)
        : window.history && window.history.replaceState
        ? window.history.replaceState({}, b, c)
        : (window.location.hash = c),
        (document.title = b),
        document
          .querySelector('meta[name="apple-itunes-app"]')
          .setAttribute(
            'content',
            'app-id=1615071061, app-argument=' +
              encodeURIComponent(makeCurrentUrl(null))
          ),
        document
          .querySelector('meta[name="description"]')
          .setAttribute('content', b),
        document
          .querySelector('meta[name="og:description"]')
          .setAttribute('content', b),
        document
          .querySelector('meta[name="og:title"]')
          .setAttribute('content', b)
    } catch (e) {
      console.log(e)
    }
  }
}
function setHelpline(a) {
  var b = $('#helpline1')
  0 < b.length && b.html(a)
}
function setHelplineSpinner() {
  var a = $('#helpline1')
  0 < a.length && a.html('<div class="loader"></div>')
}
function areFiltersActive() {
  return (
    '' !== filter_startswith ||
    '' !== filter_endswith ||
    ('' !== filter_relatedto && !currentQueryIsClusterQuery()) ||
    '' !== filter_rhymeswith ||
    '' !== filter_soundslike ||
    '' !== filter_vowelslike ||
    '' !== filter_numberofsyllables ||
    '' !== filter_stresspattern ||
    '' !== filter_numberofletters
  )
}
function setBaseHelpline(a) {
  if ('undefined' != typeof THESAURUS_SUPPRESS_BASE_HELPLINE) setHelpline(' ')
  else {
    a = locText('SHOWING_1')
    areFiltersActive() && (a = locText('SHOWING_2'))
    var b = locText('SORT_' + sortOrderCode)
    if ('' !== filter_term) {
      var c = filter_term
      hasWildcard(filter_term)
        ? setHelpline(
            '<i>' +
              a +
              ' ' +
              locText('SHOWING_PATTERN') +
              ' <b>' +
              c +
              '</b>, ' +
              locText('SHOWING_RANKED') +
              ' ' +
              b +
              '.</i>'
          )
        : ((c = '<b>' + c + '</b>'),
          '' !== filter_relatedto &&
            'rv1' === rankStr &&
            (b =
              locText('SHOWING_BY_SIM_TO') +
              ' <b>' +
              filter_relatedto +
              '</b>'),
          setHelpline(
            '<i>' +
              a +
              ' ' +
              locText('SHOWING_RELATED_TO') +
              ' ' +
              c +
              ', ' +
              locText('SHOWING_RANKED') +
              ' ' +
              b +
              '</b>.</i>'
          ))
    } else
      areFiltersActive() &&
        setHelpline(
          '<i>' + a + ', ' + locText('SHOWING_RANKED') + ' ' + b + '.</i>'
        )
  }
}
function prevMouseOver() {}
function firstPageMouseOver() {}
function nextMouseOver() {}
function clearFilter(a, b) {
  a = $('#filter_' + a)
  a.val('')
  inputBlur(a[0], b)
}
function hasWildcard(a) {
  return (
    -1 != a.indexOf('*') ||
    -1 != a.indexOf('@') ||
    -1 != a.indexOf('//') ||
    -1 != a.indexOf('#') ||
    (-1 < a.indexOf('?') && a.indexOf('?') < a.length - 1)
  )
}
function currentQueryHasWildcard() {
  return hasWildcard(filter_term) || '' === filter_term
}
function currentQueryIsClusterQuery() {
  return filter_term.match(/^cluster:/)
}
function currentQueryIsWordVectorQuery() {
  return (
    -1 != filter_term.indexOf(',') &&
    !filter_term.match(/[^, ]+[ ]+[^, ]+[ ]+[^, ]+/)
  )
}
function setFilter(a, b, c) {
  a = $('#filter_' + a)
  a.val(c)
  inputBlur(a[0], b)
}
function setFilters() {
  setFilter('startswith', 'Starts with', filter_startswith)
  setFilter('endswith', 'End with', filter_endswith)
  setFilter('soundslike', 'Sounds like', filter_soundslike)
  setFilter('vowelslike', 'Primary vowel', filter_vowelslike)
  setFilter('stresspattern', 'Meter', filter_stresspattern)
  setFilter('numberofletters', 'Letters', filter_numberofletters)
  setFilter('numberofsyllables', 'Syllables', filter_numberofsyllables)
  setFilter('rhymeswith', 'Rhymes with', filter_rhymeswith)
  setFilter('relatedto', 'Related to', filter_relatedto)
}
function addFilterHiddenParams() {
  addFilterHiddenParam('startswith', 'f_sw', filter_startswith)
  addFilterHiddenParam('endswith', 'f_ew', filter_endswith)
  addFilterHiddenParam('soundslike', 'f_sl', filter_soundslike)
  addFilterHiddenParam('vowelslike', 'f_vl', filter_vowelslike)
  addFilterHiddenParam('stresspattern', 'f_stress', filter_stresspattern)
  addFilterHiddenParam('numberofletters', 'f_nl', filter_numberofletters)
  addFilterHiddenParam('numberofsyllables', 'f_ns', filter_numberofsyllables)
  addFilterHiddenParam('rhymeswith', 'f_rw', filter_rhymeswith)
  addFilterHiddenParam('relatedto', 'f_rt', filter_relatedto)
}
function clearFilters() {
  filter_startswith =
    filter_endswith =
    filter_relatedto =
    filter_rhymeswith =
    filter_vowelslike =
    filter_stresspattern =
    filter_soundslike =
    filter_numberofsyllables =
    filter_numberofletters =
      ''
  clearFilter('soundslike', 'Sounds like')
  clearFilter('vowelslike', 'Primary vowel')
  clearFilter('stresspattern', 'Meter')
  clearFilter('startswith', 'Starts with')
  clearFilter('endswith', 'Ends with')
  clearFilter('relatedto', 'Related to')
  clearFilter('rhymeswith', 'Rhymes with')
  clearFilter('numberofletters', 'Num. letters')
  clearFilter('numberofsyllables', 'Num. syllables')
}
function getResults(a) {
  $(this)
  var b = $(this.element),
    c = b.data('jqXHR')
  c && c.abort()
  panelToStartIndex = []
  setHelplineSpinner()
  sense_id = ''
  if ((c = lookup()))
    b.data('jqXHR', c), 0 < $('#thesinput').length && saveWindowState(a)
}
function layoutResults(a) {
  panelToPrefix = []
  panelToContent = []
  var b = {},
    c = THESAURUS_MAX_ITEMS_PER_PAGE / THESAURUS_MAX_COLUMNS,
    e = {},
    f = {},
    m = {},
    p = {},
    w = {},
    g = {},
    k = '',
    h = null,
    q = [],
    v = {},
    y = [],
    A = [],
    B = [],
    E = {},
    D = {},
    F = {},
    G = {},
    H = {},
    I = {}
  if (viz_mode)
    $('#content').html(
      '<center><div id="root"></div></center>\n<script type="module"> \n import render from "https://onelook.com/thesaurus/viz/assets/brainstorming-viz.es.js?v=1"; window.viz_render = render; window.viz_result_data = resultData; window.viz_render(); \x3c/script>'
    ),
      $('#content').show(),
      $('#tabs').hide(),
      $('#rerank').hide(),
      $('#filtertitle').hide(),
      $('#content').addClass('content-with-viz'),
      $('#vizspan').html(vizButtonStr('off', locText('VIZ_BUTTON_OFF'))),
      document
        .getElementById('root')
        .scrollIntoView({
          inline: 'center',
          block: 'center',
          behavior: 'smooth',
        })
  else {
    var l
    for (l = 0; l < resultData.length; l++) {
      var n = resultData[l].word
      if (l > sortTopN && 'rv1' !== sortOrderCode) break
      var t =
        'undefined' == typeof resultData[l].tags
          ? ['all']
          : ['all'].concat(resultData[l].tags)
      n in COLORS && '' === k && (k = COLORS[n])
      var u = void 0
      for (u = 1; u < t.length; u++)
        'syn' === t[u]
          ? (e[n] = 1)
          : 'prop' === t[u]
          ? (p[n] = 1)
          : 'ant' === t[u]
          ? (f[n] = 1)
          : t[u].match(/^f:/)
          ? (m[n] = Number(parseFloat(t[u].replace('f:', '')).toPrecision(2)))
          : t[u].match(/^cluster:/)
          ? (E[n] = t[u].replace('cluster:', ''))
          : t[u].match(/^year_avg:/)
          ? (D[n] = Number(parseFloat(t[u].replace('year_avg:', ''))))
          : t[u].match(/^f_lyr:/)
          ? (F[n] = Number(parseFloat(t[u].replace('f_lyr:', ''))))
          : t[u].match(/^f_hu:/)
          ? (H[n] = Number(parseFloat(t[u].replace('f_hu:', ''))))
          : t[u].match(/^f_etym:/)
          ? (I[n] = 1)
          : t[u].match(/^f_legal:/)
          ? (G[n] = Number(parseFloat(t[u].replace('f_legal:', ''))))
          : t[u].match(/^cluster_titles:/)
          ? (v = JSON.parse(t[u].replace('cluster_titles:', '')))
          : t[u].match(/^cluster_top:/)
          ? (y = JSON.parse(t[u].replace('cluster_top:', '')))
          : t[u].match(/^def_clusters:/)
          ? (A = JSON.parse(t[u].replace('def_clusters:', '')))
          : t[u].match(/^def_senses:/) &&
            (B = JSON.parse(t[u].replace('def_senses:', '')))
      'undefined' != typeof resultData[l].defHeadword &&
        (g[n] = resultData[l].defHeadword)
      'undefined' != typeof resultData[l].defs && (w[n] = resultData[l].defs)
      null != h ||
        null == resultData[l].defs ||
        currentQueryIsWordVectorQuery() ||
        currentQueryIsClusterQuery() ||
        (h = resultData[l])
      if (-1 !== $.inArray('query', t)) {
        if (!areFiltersActive() && 'undefined' != typeof resultData[l].tags)
          for (n = void 0, n = 0; n < resultData[l].tags.length; n++)
            (t = resultData[l].tags[n]),
              t.match(/^spellcor:/) &&
                ((t = t.replace('spellcor:', '')), q.push(t))
      } else {
        if (w[n])
          for (u = void 0, u = 0; u < Math.min(1, w[n].length); u++) {
            var x = w[n][u].split('\t')
            x = definitionStyleTags(x[1])
            var C = void 0
            for (C = 0; C < x.length; C++) t.includes(x[C]) || t.push(x[C])
          }
        for (u = 0; u < t.length; u++)
          if (
            ((x = t[u]),
            'all' === x ||
              'adj' === x ||
              'n' === x ||
              'v' === x ||
              'adv' === x ||
              x.match(/^style:/))
          )
            x in b
              ? (panelId = b[x])
              : ((b[x] = panelToContent.length),
                (panelToPrefix[panelToContent.length] = x),
                (panelId = panelToContent.length)),
              panelToContent[panelId]
                ? panelToContent[panelId].push(n)
                : (panelToContent[panelId] = [n])
      }
    }
    reorderPanels()
    b = 0
    $('#tabs').empty()
    $('#content').empty()
    for (l = 0; l < panelToContent.length; l++)
      if (
        ((b = l + 1),
        (n = '<b>' + panelHeader(panelToPrefix[l]) + '</b>'),
        'style:Idioms/Slang' === panelToPrefix[l] &&
          20 < panelToContent[l].length &&
          (n = '<b>Idioms/Slang</b>'),
        '<b>Uncategorized</b>' !== n || 2 != panelToContent.length)
      ) {
        $('#tabs').append(
          '<li><a href="#" name="zone' + b.toString() + '">' + n + '</a></li>'
        )
        d = $('#zone' + b.toString())
        content = '<div class="thesaurus_results">'
        content += '<table width=100%><tr><td valign=top>'
        panelToStartIndex.length <= l && (panelToStartIndex[l] = 0)
        t = panelToStartIndex[l]
        u = Math.min(panelToContent[l].length, t + THESAURUS_MAX_ITEMS_PER_PAGE)
        'rv1' !== sortOrderCode &&
          ((n = sortOrderCode.substring(0, 2)),
          panelToContent[l].sort(
            {
              le: function (r, z) {
                return r.length - z.length
              },
              al: function (r, z) {
                return r.localeCompare(z)
              },
              co: function (r, z) {
                return (m[r] || 0) - (m[z] || 0)
              },
              mo: function (r, z) {
                return (D[r] || 0) - (D[z] || 0)
              },
              lg: function (r, z) {
                return (G[r] || 0) - (G[z] || 0)
              },
              ly: function (r, z) {
                return (F[r] || 0) - (F[z] || 0)
              },
              hu: function (r, z) {
                return (H[r] || 0) - (H[z] || 0)
              },
            }[n]
          ),
          '1' === sortOrderCode.charAt(2) && panelToContent[l].reverse(),
          'mo' === n &&
            (panelToContent[l] = panelToContent[l]
              .filter(function (r) {
                return null != D[r]
              })
              .concat(
                panelToContent[l].filter(function (r) {
                  return null == D[r]
                })
              )),
          'co' === n &&
            (panelToContent[l] = panelToContent[l]
              .filter(function (r) {
                return null != m[r]
              })
              .concat(
                panelToContent[l].filter(function (r) {
                  return null == m[r]
                })
              )),
          'ly' === n &&
            ((panelToContent[l] = panelToContent[l]
              .filter(function (r) {
                return null != F[r]
              })
              .concat(
                panelToContent[l].filter(function (r) {
                  return null == F[r]
                })
              )),
            (panelToContent[l] = panelToContent[l]
              .filter(function (r) {
                return 0.1 <= m[r]
              })
              .concat(
                panelToContent[l].filter(function (r) {
                  return 0.1 > m[r]
                })
              ))),
          'hu' === n &&
            (panelToContent[l] = panelToContent[l]
              .filter(function (r) {
                return null != H[r]
              })
              .concat(
                panelToContent[l].filter(function (r) {
                  return null == H[r]
                })
              )),
          'lg' === n &&
            ((panelToContent[l] = panelToContent[l]
              .filter(function (r) {
                return null != G[r]
              })
              .concat(
                panelToContent[l].filter(function (r) {
                  return null == G[r]
                })
              )),
            (panelToContent[l] = panelToContent[l]
              .filter(function (r) {
                return 0.1 <= m[r]
              })
              .concat(
                panelToContent[l].filter(function (r) {
                  return 0.1 > m[r]
                })
              ))))
        for (j = t; j < u; j++)
          (n = panelToContent[l][j]),
            (x = ''),
            1 == e[n] ? (x = 'ressyn') : 1 == f[n] && (x = 'resant'),
            null != E[n] && (x += ' cluster-' + E[n]),
            'undefined' != typeof g[n] && g[n].toLowerCase() === n
              ? (n = g[n])
              : 1 == p[n] && (!w[n] || 2 > w[n].length) && (n = toTitleCase(n)),
            (C = (j + 1).toString()),
            (x =
              "<span class='resnum'>" +
              (j + 1).toString() +
              ".</span> <span id='res_" +
              C +
              "' resid='" +
              C +
              "' thesw='" +
              rfc3986EncodeURIComponent(n) +
              "' class='res relres " +
              x +
              "'>" +
              thesianchor(n, panelToPrefix[l], j)),
            (tooltip = makeTooltip(
              n,
              w,
              g,
              E,
              panelToPrefix[l],
              D,
              m,
              v,
              null,
              I
            )),
            (x +=
              "<div class='more-info'><div class= 'popover'>" +
              tooltip +
              '</div></div>'),
            (x += '</span>'),
            (content += x + '<br>'),
            j % c == c - 1 && (content += '</td><td valign=top>')
        content += '</td></tr></table>'
        content += '</div>'
        n = '#previous_page_marker_' + l.toString()
        x = '#next_page_marker_' + l.toString()
        0 < t &&
          (t > THESAURUS_MAX_ITEMS_PER_PAGE &&
            (content +=
              '<span onClick="pageChange(' +
              (l.toString() + ',0);" class="prevlink firstlink" id=') +
              n +
              '><button>&lt;&lt;&lt; First page&nbsp;&nbsp;</button></span>&nbsp;&nbsp;'),
          (C =
            'pageChange(' +
            l.toString() +
            ',' +
            Math.max(0, t - THESAURUS_MAX_ITEMS_PER_PAGE) +
            ');'),
          (content +=
            '<span onClick="' +
            C +
            '" class="prevlink" id=' +
            n +
            '><button>&lt;&lt; ' +
            locText('PREVIOUS_RESULTS') +
            '</button></span>'),
          $('.prevlink').mouseover(prevMouseOver))
        u < panelToContent[l].length &&
          ((C =
            'pageChange(' +
            l.toString() +
            ',' +
            (t + THESAURUS_MAX_ITEMS_PER_PAGE) +
            ');'),
          (content +=
            '<span onClick="' +
            C +
            '" class="nextlink" id=' +
            x +
            '><button>' +
            locText('NEXT_RESULTS') +
            ' &gt;&gt;</button></span>'),
          $('.nextlink').mouseover(nextMouseOver))
        $('#content').append(
          '<div id="zone' + b.toString() + '">' + content + '</div>'
        )
      }
    0 === panelToContent.length
      ? 0 < q.length
        ? showDidYouMean(q, !1)
        : currentQueryHasWildcard()
        ? showDidYouMean([], !1)
        : fetchSpellCorsAndShowDym(!1)
      : 0 < q.length && showDidYouMean(q, !0)
    areFiltersActive() &&
      ((c =
        "<center><span class='filterinnertitle' id='clearfilter'><a onClick='clearFilters(); getResults(false);'><button id=\"clearfilterbutton\">" +
        locText('CLEAR_FILTERS') +
        '</button></a></span></center>'),
      $('#filtertitle').html(c))
    $('#tabs li:nth-child(' + (a + 1).toString() + ')').attr('id', 'current')
    $('#content').find("[id^='zone']").hide()
    $('#content #zone' + (a + 1).toString()).show()
    $('#tabs a').click(function (r) {
      r.preventDefault()
      'current' !== $(this).closest('li').attr('id') &&
        ((currentPanelId = $(this).closest('li').index()),
        $('#content').find("[id^='zone']").hide(),
        $('#tabs li').attr('id', ''),
        $(this).parent().attr('id', 'current'),
        $('#' + $(this).attr('name')).show())
    })
    0 !== panelToContent.length && $('#tabs').show()
    $('#content').removeClass('content-with-viz')
    $('#content').show()
    $('#filtertitle').show()
    $('#rerank').show()
    showFiltersIfActive()
  }
  viz_mode
    ? setHelpline(' ')
    : null != v && currentQueryIsClusterQuery()
    ? ((window.query_cluster_title = v[filter_term.replace('cluster:', '')][0]),
      saveWindowState(!1),
      (help_text =
        'Showing terms in the concept cluster <b>"' +
        window.query_cluster_title +
        '"</b><br><br>'),
      setHelpline(help_text),
      (filter_relatedto_original = filter_relatedto),
      (filter_relatedto = ''),
      clearFilter('relatedto'))
    : '' !== sense_id
    ? setHelpline(
        'Showing terms related to the above-highlighted sense of the word.  Re-submit the query to clear.<br><br>'
      )
    : null != v &&
      0 !== panelToContent.length &&
      (null !== B && 1 < B.length
        ? setHelpline(
            'Tip:  Click on a definition above to specialize your search to that sense of the word <i>' +
              filter_term +
              '</i><br><br>'
          )
        : setHelpline('Tip:  Click on a result below to see more details.'))
  c = $('#defbox')
  e = $('#defbutton')
  if ((0 < c.length || 0 < e.length) && null != h) {
    p = h.word
    q = h.defs
    var J
    'undefined' != typeof q
      ? (J = format_compact_defs(q, 'all', g[p] ? g[p] : p, f, B, I[p]))
      : filter_term.match(/[ #@?*,\/]/) ||
        (J = format_compact_defs([], 'all', p, f, null, I[p]))
    tooltip = makeTooltip(h.word, w, g, E, 'all', D, m, v, B, I)
    tooltip =
      '<div class="query-res-spacer"></div><span id=res_0 resid=\'0\' class="res query-res" thesw="' +
      h.word +
      "\">&nbsp;More &#9654;<div class='more-info'><div class='popover'>" +
      tooltip +
      '</div></div></span>'
    0 < e.length && (e.empty(), e.append(tooltip.replace('More ', '')))
    0 < c.length &&
      (c.empty(),
      c.append(
        "<div class='def-box-info'><div class='def-box-defs'>" +
          J +
          tooltip +
          '</div></div>'
      ))
  }
  if (0 < $('#clusterbox').length) {
    f = ''
    if (viz_mode)
      f =
        "<br><center>This is an experimental OneLook feature to help you brainstorm ideas about any topic.  We've grouped words and phrases into thousands of clusters based on a statistical analysis of how they are used in writing.  This page lets you explore the clusters that pertain to your search query.  The blue box contains the words most similar to your search query, and the green boxes show closely related concepts.  Click on a box to bring it to the center, or click on a word within the center box to see more information about the word.  Note:  The names of the clusters (in <font color=red>red</font>) were written automatically and may not precisely describe every word within the cluster; furthermore, the clusters may be missing some entries that you'd normally associate with their names."
    else if (0 < y.length) {
      w = new Set()
      f = ''
      if (0 < A.length && !currentQueryIsClusterQuery()) {
        f += '<br>Found in concepts: &nbsp;'
        for (h = 0; h < A.length; h++)
          0 < h && (f += ' '),
            w.has(A[h]) ||
              ((g = clusterlink(v, A[h])),
              null != g &&
                ((g = g.replace('thescls2', 'thescls4')),
                (f += g),
                w.add(A[h])))
        f += '<br>'
      }
      h = !1
      for (B = 0; B < Math.min(y.length, 12); B++)
        w.has(y[B][0]) ||
          (0 < B && (f += ' '),
          (g = clusterlink(v, y[B][0])),
          null != g &&
            (h || ((f += '<br>Related concepts: &nbsp;'), (h = !0)),
            (f += g + ' '),
            w.add(A[B])))
      viz_url = makeCurrentUrl(null) + '&viz=1'
      f +=
        '<br><br><center><button id=viz-teaser-button onClick="viz_mode_on();">Idea Map (beta)</center>'
    }
    currentQueryIsClusterQuery() &&
      !viz_mode &&
      (f +=
        "<br><center><i>Concept clusters like this one are an experimental OneLook feature.  We've grouped words and phrases into thousands of clusters based on a statistical analysis of how they are used in writing.  Some of the words and concepts may be vulgar or offensive. The names of the clusters were written automatically and may not precisely describe every word within the cluster; furthermore, the clusters may be missing some entries that you'd normally associate with their names. Click on a word to see a list of definitions; the first definition in the list is the sense in which it belongs to the concept cluster.</i></center>")
    $('#clusterbox').html(f)
  }
  0 < $('#phrasebox').length &&
    !currentQueryIsClusterQuery() &&
    !currentQueryHasWildcard() &&
    fetchAndShowPhrases()
  0 < $('#wotdbox').length &&
    !currentQueryIsClusterQuery() &&
    !currentQueryHasWildcard() &&
    fetchAndShowWotd()
  c = $('#quickfilters')
  if (0 < c.length) {
    v = locText('RESTRICT_TO_METER') + ':<br>'
    for (y = 0; y < STRESS_PATTERNS.length; y++)
      (A = STRESS_PATTERNS[y]),
        (f =
          filter_stresspattern === A
            ? 'meter_btn_selected'
            : 'meter_btn_unselected'),
        (w = filter_stresspattern === A ? '' : A),
        (n =
          "'/' means stressed, 'x' means unstressed.  Click a button to find words that match a certain meter."),
        (v +=
          '<button title="' +
          n +
          '" class="' +
          f +
          '" onClick=\'click_meter_filter("' +
          w +
          '");\'>' +
          A +
          '</button>')
    c.html(v)
  }
  addFilterHiddenParams()
  c = $('#thesinput')
  0 < c.length && $('#thesinput').autocomplete('close')
  $('.res').click(clickres)
  $('.top-cluster').hover(hovercluster)
  $('.thesaurus-top-gloss-sense').click(clickSense)
  c = $('.logo-img')
  0 < c.length && c.addClass('logo-img-results-page')
  '' !== k && $('#thesinput').css('box-shadow', '0 0 5px 5px ' + k)
  'rv1' !== sortOrderCode
    ? $('#sortOrderControl-button').addClass('activesort')
    : $('#sortOrderControl-button').removeClass('activesort')
  c = $('#olthes_intro_text')
  0 < c.length && c.hide()
  0 < $('#filter_startswith').length &&
    0 < $('#filter_numberofletters').length &&
    (hasWildcard(filter_term)
      ? ($('#filter_startswith').hide(),
        $('#filter_endsswith').hide(),
        $('#filter_numberofletters').hide(),
        $('#filter_numberofsyllables').hide(),
        $('#filter_vowelslike').hide(),
        $('#filter_stresspattern').hide())
      : ($('#filter_startswith').show(),
        $('#filter_endswith').show(),
        $('#filter_numberofletters').show(),
        $('#filter_numberofsyllables').show(),
        $('#filter_vowelslike').show(),
        $('#filter_stresspattern').show()))
  currentPanelId = a
  'undefined' != typeof submitted && (submitted = !1)
}
function pageChange(a, b) {
  panelToStartIndex[a] = b
  layoutResults(a)
}
function theslink(a) {
  return THESAURUS_BASE_URL + encodeURIComponent(a)
}
function etym_link(a, b) {
  a = 'https://rhymezone.com/r/rd.cgi?c=etym&url=' + encodeURIComponent(a)
  return b
    ? ' <a href="' +
        a +
        '"><button id="thesaurus_etym_button">origin</button></a>'
    : '(<a href="' + a + '">Origin&nbsp;info</a>)'
}
function panelHeader(a) {
  return 'all' === a
    ? locText('POS_ALL')
    : 'adj' === a
    ? locText('POS_ADJECTIVES')
    : 'n' === a
    ? locText('POS_NOUNS')
    : 'v' === a
    ? locText('POS_VERBS')
    : 'adv' === a
    ? locText('POS_ADVERBS')
    : a.match(/^style:/)
    ? a.replace('style:', '')
    : locText('POS_UNCATEGORIZED')
}
function toggleres(a) {
  var b = $(a).find('.more-info')
  b.hasClass('more-info-selected')
    ? (b.removeClass('more-info-selected'), (selected_res = null))
    : (b.addClass('more-info-selected'), (selected_res = a))
}
function globalOnclick(a) {
  null !== selected_res &&
    (toggleres(selected_res), (selected_res_id = null), saveWindowState(!1))
}
function hoverres(a) {}
function hovercluster(a) {
  a.stopPropagation()
  a = $(a.target).attr('thescluster')
  $('.res').removeClass('topcluster-hover')
  $('.cluster-' + a).addClass('topcluster-hover')
}
function mouseleavecluster(a) {
  $('.res').removeClass('topcluster-hover')
}
function clickres(a) {
  a.stopPropagation()
  a = a.target
  if (null !== selected_res)
    if ($(selected_res).is($(a))) {
      var b = decodeURIComponent($(selected_res).attr('thesw'))
      window.location.href = THESAURUS_RELATED_TEMPLATE.replace(/%s/g, b)
    } else if ($.contains(selected_res, a)) {
      if ($(a).hasClass('defgloss'))
        (window.examples_topic = $(a).text()),
          (window.examples_pos = $(a).attr('thespos')),
          $('.defgloss_selected').removeClass('defgloss_selected'),
          $(a).addClass('defgloss_selected')
      else {
        $(a).parents('.close_btn').length && globalOnclick()
        return
      }
      a = selected_res
    } else
      toggleres(selected_res), (selected_res_id = null), saveWindowState(!1)
  $(selected_res).is($(a)) ||
    ((selected_res_id = $(a).attr('id')),
    toggleres(a),
    (window.example_span_id = 'example_' + new Date().getTime()),
    (window.selected_headword = $(a)
      .attr('thesw')
      .trim()
      .replace(/[%]20/g, '_')
      .replace(/[ ]/g, '_')),
    currentQueryIsClusterQuery()
      ? (window.examples_topic = window.query_cluster_title)
      : filter_term === selected_headword || currentQueryHasWildcard()
      ? (window.examples_topic = null)
      : (window.examples_topic = filter_term),
    (window.examples_pos = null),
    saveWindowState(!1),
    $('.ql_copy_btn').click(copyToClipboard))
  a =
    '<div class="test-thes-centering"><div class="thes-usage-span" id="' +
    window.example_span_id +
    '"></div></div><script type="module"> \n import gen_sentences from "https://onelook.com/thesaurus/example_sentences.js"; window.gen_sentences = gen_sentences;  window.gen_sentences(window.selected_headword, "' +
    getApiBaseUrl() +
    '", "#" + window.example_span_id, false, "<br><strong>Usage examples:</strong><br><br>", 10, false, window.examples_topic, window.examples_pos);\x3c/script>'
  $(selected_res).find('.dynamic-def-content').html(a)
}
function thesianchor(a, b, c) {
  var e = a
  30 < e.length
    ? (b && 0 < c && (e = e.replace(b, '...')),
      40 < e.length && (e = e.substring(0, 29) + '...'),
      (a = THESAURUS_CLICKABLE_ENTRIES
        ? '<a title="' + a + '" href="' + theslink(a) + '">' + e + '</a>'
        : e))
    : (a = THESAURUS_CLICKABLE_ENTRIES
        ? '<a href="' + theslink(a) + '">' + e + '</a>'
        : e)
  return a
}
function clusterlink(a, b) {
  if (!a[b]) return null
  a = a[b][0]
  return a.match(/^Untitled/) || filter_term === 'cluster:' + b.toString()
    ? null
    : ((url = currentQueryIsClusterQuery()
        ? makeCurrentUrl(filter_relatedto_original) + '&loc=thescls3'
        : makeCurrentUrl(filter_term) + '&loc=thescls2'),
      (url = url.replace(/s=[^&]*([&]|$)/, 's=cluster:' + b + '$1')),
      (url = url + '&concept=' + encodeURIComponent(a)),
      (clslink =
        '<a href="' +
        url +
        '"><button thescluster=' +
        b +
        ' class="top-cluster">' +
        a +
        '</button></a>'))
}
function format_defs(a, b, c, e, f, m, p, w) {
  s = ''
  m = new Set()
  var g
  for (g = 0; g < a.length; g++) {
    var k = a[g].split('\t')
    if (1 < k.length) {
      var h = k[0]
      k = k[1]
      var q = definitionStyleTags(k),
        v = '<li class="thes-defline thes-defline-pos-' + h + '"/> '
      if (null != p && p.length > g) {
        var y = makeCurrentUrl(null) + '&senseid=' + p[g].toString()
        v +=
          '<a class="thes_defs_marker thes_defs_marker_with_sense" title="Specialize your search to this particular sense of the word." href="' +
          y +
          '">&#128262;</a>'
      } else v += '<span class="thes_defs_marker">&#128262;</a>'
      m.add(attributionString(k))
      if ('all' === b || b === h || (b.match(/^style:/) && q.includes(b)))
        '' === s &&
          (s =
            'undefined' != typeof c
              ? "<b class='thes_ql_title'>" + c + '</b>:<br><ul>'
              : '<ul>'),
          (s +=
            v +
            ' <span class="defgloss" thespos="' +
            h +
            '"> ' +
            addLinksToGloss(k) +
            '</span><br>')
    } else console.log('Definition error for: ' + a[g])
  }
  '' !== s && (s += '</ul>')
  if (m.has('wiki') || m.has('wikt'))
    (s += '<div class="thes_defattrib">Definitions from '),
      m.has('wiki')
        ? (s +=
            ' <a href="https://en.wikipedia.org/wiki/' +
            encodeURIComponent(c) +
            '">Wikipedia</a>. ')
        : m.has('wikt') &&
          (s +=
            ' <a href="https://en.wiktionary.org/wiki/' +
            encodeURIComponent(c) +
            '">Wiktionary</a>. '),
      w && (s += etym_link(c, !1) + ' '),
      null != p &&
        1 < p.length &&
        (s +=
          'Click on a &#128262; to refine your search to that sense of <i>' +
          c +
          '</i>.'),
      (s += '</div>')
  null != e &&
    '0' != e &&
    e in f &&
    ((a = f[e][0]),
    a.match(/^Untitled/) ||
      ((url = makeCurrentUrl(c) + '&loc=thescls'),
      (url = url.replace(/s=[^&]*([&]|$)/, 's=cluster:' + e + '$1')),
      (url = url + '&concept=' + encodeURIComponent(a)),
      (clslink =
        '<a class="thes_usage_cluster" href="' + url + '">' + a + '</a>'),
      (s +=
        '<div class="thes_defmorewords">Concept cluster: <span class="thes_usage"><b>' +
        clslink +
        '</b></span></div>')))
  return s
}
function format_usage_string(a, b) {
  if (a) {
    var c =
      0.05 > a
        ? 'very rare'
        : 0.2 > a
        ? 'rare'
        : 0.5 > a
        ? 'somewhat rare'
        : 1 > a
        ? 'moderate'
        : 10 > a
        ? 'somewhat common'
        : 25 > a
        ? 'common'
        : 35 > a
        ? 'very common'
        : 'extremely common'
    a = 'Occurs ' + a.toString() + ' times per million words in Google Books.'
    b &&
      (1900 > b
        ? (c += ', outdated')
        : 1930 > b
        ? (c += ', old-fashioned')
        : 2010 < b
        ? (c += ', very recent')
        : 2e3 < b && (c += ', modern'),
      (a += ' Median year of use: ' + Math.round(b).toString()))
    return (
      '<span class="thes_usage" title="' +
      a +
      ' ">Usage in writing: ' +
      c +
      ' [?]</span>'
    )
  }
  return ''
}
function format_compact_defs(a, b, c, e, f, m) {
  s = ''
  var p = !1,
    w = !1,
    g
  for (g = 0; g < a.length; g++) {
    var k = a[g].split('\t')
    if (1 < k.length) {
      var h = k[0]
      'adj' === h && (p = !0)
      'n' === h && (w = !0)
      if ('all' === b || b === h) {
        s =
          '' === s
            ? 'undefined' != typeof c
              ? '<b><i>' + c + '</i></b>: '
              : ''
            : null == f || f.length <= g
            ? s + '; '
            : s + ' '
        h = 'thesaurus-top-gloss'
        var q = ''
        null != f &&
          f.length > g &&
          ((h += ' thesaurus-top-gloss-sense'),
          (senseLookupLink =
            '<a title="Refine your search to this particular sense of the word." href="' +
            (makeCurrentUrl(null) + '&senseid=' + f[g].toString()) +
            '">&#128262;</a>'),
          (q = 'thessense="' + f[g].toString() + '" '),
          (s += senseLookupLink),
          f[g].toString() === sense_id &&
            (h += ' thesaurus-top-gloss-selected'))
        s +=
          '  <span ' +
          q +
          'class="' +
          h +
          '">' +
          addLinksToGloss(k[1]) +
          '</span>'
      }
    }
    if (
      s.length > MAX_TOPDEF_LENGTH_CHARS ||
      ((null == f || 0 >= f.length) &&
        s.length > MAX_TOPDEF_LENGTH_CHARS_NO_SENSE)
    ) {
      s += '... '
      break
    }
  }
  m && (s += etym_link(c, !0))
  window.antonym_headword = c
  if (!$.isEmptyObject(e) || p)
    (s += '<span id="thesaurus_ants">' + formatAntonyms(e) + '</span>'),
      (s +=
        ' <button id="thesaurus_ants_button" onClick="clickAntonyms();">opposite</button>')
  w &&
    ((s += '<span id="thesaurus_typeof"></span>'),
    (s +=
      ' <button id="thesaurus_typeof_button" onClick="clickTypesOf();">types</button>'))
  return s
}
function formatAntonyms(a) {
  var b = '',
    c
  for (c in a)
    (a =
      '<a class="resant" href="' +
      THESAURUS_RELATED_TEMPLATE.replace(/%s/g, encodeURIComponent(c)) +
      '&loc=ant">' +
      c +
      '</a>'),
      (b += a + ' ')
  return b
}
function clickAntonyms() {
  '' === $('#thesaurus_ants').html()
    ? (window.location.href = THESAURUS_RELATED_TEMPLATE.replace(
        /%s/g,
        encodeURIComponent('opposite of ' + window.antonym_headword)
      ))
    : ($('#thesaurus_ants_button').hide(), $('#thesaurus_ants').show())
}
function clickTypesOf() {
  window.location.href =
    THESAURUS_RELATED_TEMPLATE.replace(
      /%s/g,
      encodeURIComponent('types of ' + window.antonym_headword)
    ) + '&loc=tres'
}
function lookup() {
  var a = filter_term
  if ('' !== full_api_query) var b = full_api_query
  else
    (b = getApiBaseUrl() + '/words?k=olt_test2&max=1000&qe=ml&rif=1&md=dpfy'),
      '' !== a &&
        '*' !== a &&
        (b += '&ml=' + encodeURIComponent(a.replace(/[:].*/, ''))),
      '' !== requested_lang && (b += '&v=' + encodeURIComponent(requested_lang))
  var c = ''
  '' !== filter_numberofletters
    ? ((c = parseInt(filter_numberofletters)),
      (c = Math.min(c, 20)),
      (c =
        '' !== filter_startswith
          ? filter_startswith +
            Array(c - filter_startswith.length + 1).join('?')
          : Array(c + 1).join('?')),
      '' !== filter_endswith &&
        (c =
          c.substring(0, c.length - filter_endswith.length) + filter_endswith),
      filter_numberofletters.endsWith('+') && (c += '*'))
    : ('' !== filter_startswith && (c = filter_startswith + '*'),
      '' !== filter_endswith && (c = c + '*' + filter_endswith))
  '' !== c && (b += '&sp=' + encodeURIComponent(c))
  '' !== filter_relatedto &&
    (b += '&topics=' + encodeURIComponent(filter_relatedto))
  '' !== filter_rhymeswith &&
    (b += '&sl=rhy:' + encodeURIComponent(filter_rhymeswith))
  '' !== sense_id && (b += '&senseid=' + sense_id)
  '' !== filter_soundslike
    ? (b += '&sl=' + encodeURIComponent(filter_soundslike))
    : '' !== filter_stresspattern
    ? ((c = filter_stresspattern.replace(/[xX]/g, '0').replace(/[/]/g, '1')),
      (b += '&sl=stress:' + encodeURIComponent(c)))
    : '' !== filter_vowelslike
    ? (b += '&sl=vowels:' + encodeURIComponent(filter_vowelslike))
    : '' !== filter_numberofsyllables &&
      ((c = parseInt(filter_numberofsyllables)),
      (c = Math.min(c, 20)),
      (c = Array(c + 1).join('?')),
      (b += '&sl=pp:' + encodeURIComponent(c)))
  if ('undefined' === typeof THESAURUS_RESULTS || areFiltersActive())
    return $.ajax({
      dataType: 'json',
      type: 'Get',
      url: b,
      error: function (e, f, m) {
        e = 'Sorry, we could not connect to the database.'
        f = THESAURUS_FALLBACK_URL + encodeURIComponent(a.replace(/[:].*/, ''))
        e += ' <a href="' + f + '">' + THESAURUS_FALLBACK_MSG + '</a>'
        setHelpline(e)
      },
      success: function (e) {
        resultData = e
        layoutResults(0)
      },
    })
  resultData = THESAURUS_RESULTS
  rerank()
}
function inputFocus(a) {
  var b = $(a)
  b.addClass('activefilter')
  ;-1 !== a.value.indexOf(':')
    ? (a.value = b.data('prev'))
    : a.value == a.defaultValue && (a.value = '')
  b = '<b>' + locText('FILT_HELP_HEADER') + '</b>: '
  var c = ''
  'Starts with...' === a.defaultValue
    ? (c = locText('FILT_HELP_STARTS_WITH'))
    : 'Ends with...' === a.defaultValue
    ? (c = locText('FILT_HELP_ENDS_WITH'))
    : 'Letter count...' === a.defaultValue
    ? (c = locText('FILT_HELP_NUM_LETTERS'))
    : 'Also related to...' === a.defaultValue
    ? (c = locText('FILT_HELP_ALSO_RELATED'))
    : 'Rhymes with...' === a.defaultValue
    ? (c = locText('FILT_HELP_RHYMES'))
    : 'Sounds like...' === a.defaultValue
    ? (c = locText('FILT_HELP_SOUNDS_LIKE'))
    : 'Primary vowel...' === a.defaultValue
    ? (c =
        '' === filter_term
          ? locText('FILT_HELP_NEEDS_TOPIC')
          : locText('FILT_HELP_VOWELS_LIKE'))
    : 'Meter...' === a.defaultValue
    ? (c =
        '' === filter_term
          ? locText('FILT_HELP_NEEDS_TOPIC')
          : locText('FILT_HELP_METER'))
    : 'Syllable count...' === a.defaultValue &&
      (c =
        '' === filter_term
          ? locText('FILT_HELP_NEEDS_TOPIC')
          : locText('FILT_HELP_NUM_SYLLABLES'))
  '' !== c && setHelpline(b + '<i>' + c + '</i>')
  'Meter...' === a.defaultValue &&
    $('#filter_stresspattern').autocomplete('search', '')
  'Letter count...' === a.defaultValue &&
    $('#filter_numberofletters').autocomplete('search', '')
  'Syllable count...' === a.defaultValue &&
    $('#filter_numberofsyllables').autocomplete('search', '')
  'Primary vowel...' === a.defaultValue &&
    $('#filter_vowelslike').autocomplete('search', '')
}
function inputBlur(a, b) {
  var c = $(a)
  '' === a.value
    ? ((a.value = a.defaultValue),
      c.removeClass('activefilter'),
      c.addClass('inactivefilter'))
    : (c.data('prev', a.value),
      (a.value = b + ': ' + a.value),
      19 < a.value.length && (a.value = a.value.substring(0, 16) + '...'),
      c.removeClass('inactivefilter'),
      c.addClass('activefilter'))
}
function thesInputBlur(a) {
  a = $(a)
  if (a.val() || !currentQueryIsClusterQuery()) filter_term = a.val()
  full_api_query = getApiUrl(filter_term, !1)
}
function copyToClipboard(a) {
  a.stopPropagation()
  a = a.target
  var b = $(a).parents('.res').first()
  'undefined' != typeof $(b).attr('thesw') &&
    navigator.clipboard.writeText(decodeURIComponent(b.attr('thesw')))
  $(a).parents('.ql_copy_btn').first().html('(Copied)')
}
function endsWith(a, b) {
  return -1 !== a.indexOf(b, a.length - b.length)
}
function getApiBaseUrl() {
  return THESAURUS_API_URL
}
function getApiUrl(a, b) {
  var c = getApiBaseUrl()
  6 < a.length &&
    endsWith(a, '?') &&
    !hasWildcard(a.substring(0, a.length - 1)) &&
    !b &&
    (a = a.substring(0, a.length - 1))
  var e = -1 != a.indexOf(',') && !a.match(/[^, ]+[ ]+[^, ]+[ ]+[^, ]+/)
  if (a.match(/^cluster:/)) {
    a = a.split(':')
    c += '/words?rel_cls=' + a[1] + '&rand=' + Math.random().toString()
    var f = '5'
  } else
    hasWildcard(a)
      ? ((a = a.split(':')),
        1 < a.length
          ? ((f = '2'),
            (c +=
              '/words?sp=' +
              encodeURIComponent(a[0]) +
              '&ml=' +
              encodeURIComponent(a[1])))
          : ((f = '1'),
            (c += '/words?v=ol_gte2&sp=' + encodeURIComponent(a[0]))))
      : ((a = a.replace(':', '')),
        b
          ? ((f = '3'),
            (c += '/sug?v=ol_gte2_suggest&s=' + encodeURIComponent(a)))
          : ((f = '4'),
            (c += '/words?ml=' + encodeURIComponent(a)),
            e || (c += '&qe=ml'),
            a.toLowerCase().match(/^rhymes( of | with | for )/) &&
              ((f = a.toLowerCase().replace(/^rhymes( of | with | for )/, '')),
              (c = c.replace(
                '/words?ml=' + encodeURIComponent(a),
                '/words?arhy=1&sl=' + encodeURIComponent(f)
              )),
              (f = '6'))))
  e && (c += '&awv=1')
  c = b
    ? c + ('&max=10&k=olthes_ac' + f)
    : c + ('&md=dpfcy&max=850&rif=1&k=olthes_r' + f)
  '' !== requested_lang &&
    ((c = c.replace(/v=[^&]*[&]/, '')),
    (c += '&v=' + encodeURIComponent(requested_lang)),
    (c = c.replace('md=dpfcy', 'md=dpfy')))
  isBot() &&
    ((c = c.replace('k=', 'k=bot-')), (c = c.replace('max=1000', 'max=995')))
  return c
}
function toTitleCase(a) {
  return a.replace(/\w\S*/g, function (b) {
    return b.charAt(0).toUpperCase() + b.substr(1).toLowerCase()
  })
}
function filtersAreOpen() {
  return 'block' === document.getElementById('filteroptions').style.display
}
function showFilters(a) {
  filtersAreOpen() ||
    ($('#filteroptions').show(),
    $('#filtertitle').html(''),
    (more_info =
      '(<a target="_blank" href="https://onelook.com/thesaurus/whatsnew/?fh=1#filters">' +
      locText('HELP') +
      '</a>)'),
    '' === filter_term
      ? setHelpline('')
      : areFiltersActive()
      ? setHelpline('')
      : setHelpline(locText('FILT_HELP_TOP') + ' ' + more_info + '</i>'),
    $('#filterpane').show())
}
$(function () {
  $('#filter_startswith').autocomplete({
    minLength: 0,
    delay: 200,
    source: function (a, b) {
      filter_startswith = a.term
      getResults(!1)
    },
  })
  $('#filter_endswith').autocomplete({
    minLength: 0,
    delay: 200,
    source: function (a, b) {
      filter_endswith = a.term
      getResults(!1)
    },
  })
  $('#filter_relatedto').autocomplete({
    minLength: 0,
    delay: 200,
    source: function (a, b) {
      filter_relatedto = a.term
      getResults(!1)
    },
  })
  $('#filter_rhymeswith').autocomplete({
    minLength: 0,
    delay: 200,
    source: function (a, b) {
      filter_rhymeswith = a.term
      getResults(!1)
    },
  })
  $('#filter_soundslike').autocomplete({
    minLength: 0,
    delay: 200,
    source: function (a, b) {
      filter_soundslike = a.term
      filter_numberofsyllables = ''
      clearFilter('numberofsyllables', 'Num. syllables')
      filter_vowelslike = ''
      clearFilter('vowelslike', 'Primary vowel')
      getResults(!1)
    },
  })
  $('#filter_vowelslike').autocomplete({
    minLength: 0,
    delay: 0,
    source: function (a, b) {
      a = VOWEL_SOUND_PROTOTYPES.concat(['Pick a vowel sound above'])
      b(a)
    },
    search: function (a, b) {
      '' === $('#filter_vowelslike').val() &&
        '' !== filter_vowelslike &&
        filt_vowels('')
    },
    select: function (a, b) {
      b.item.value.match('Pick')
        ? (b.item.value = $('#filter_vowelslike').val())
        : ((a = b.item.value.replace(/.* in /gm, '').replace(')', '')),
          $('#filter_vowelslike').val(a),
          filt_vowels(a))
    },
  })
  $('#filter_stresspattern').autocomplete({
    minLength: 0,
    delay: 0,
    source: function (a, b) {
      var c = STRESS_PATTERNS.concat(['Pick or type a stress pattern'])
      b(c)
      '' !== a.term && filt_meter(a.term)
    },
    search: function (a, b) {
      '' === $('#filter_stresspattern').val() &&
        '' !== filter_stresspattern &&
        filt_meter('')
    },
    select: function (a, b) {
      b.item.value.match('Pick')
        ? (b.item.value = $('#filter_stresspattern').val())
        : ($('#filter_stresspattern').val(b.item.value),
          filt_meter(b.item.value))
    },
  })
  $('#filter_numberofletters').autocomplete({
    minLength: 0,
    delay: 0,
    source: function (a, b) {
      var c = LETTER_COUNTS.concat([
        "Pick or type a letter count.  5+ means '5 or more'",
      ])
      b(c)
      '' !== a.term && filt_lettercount(a.term)
    },
    search: function (a, b) {
      '' === $('#filter_numberofletters').val() &&
        '' !== filter_numberofletters &&
        filt_lettercount('')
    },
    select: function (a, b) {
      b.item.value.match('Pick')
        ? (b.item.value = $('#filter_numberofletters').val())
        : ($('#filter_numberofletters').val(b.item.value),
          filt_lettercount(b.item.value))
    },
  })
  $('#filter_numberofsyllables').autocomplete({
    minLength: 0,
    delay: 0,
    source: function (a, b) {
      var c = SYLLABLE_COUNTS.concat(['Pick or type a syllable count'])
      b(c)
      '' !== a.term && filt_sylcount(a.term)
    },
    search: function (a, b) {
      '' === $('#filter_numberofsyllables').val() &&
        '' !== filter_numberofsyllables &&
        filt_sylcount('')
    },
    select: function (a, b) {
      b.item.value.match('Pick')
        ? (b.item.value = $('#filter_numberofsyllables').val())
        : ($('#filter_numberofsyllables').val(b.item.value),
          filt_sylcount(b.item.value))
    },
  })
})
function fetchSpellCorsAndShowDym(a) {
  var b =
    getApiBaseUrl() +
    '/words?k=olt_spellcheck&max=1&sp=' +
    encodeURIComponent(filter_term)
  return $.ajax({
    dataType: 'json',
    type: 'Get',
    url: b,
    success: function (c) {
      var e = [],
        f
      for (f = 0; f < c.length; f++)
        c[f].word !== filter_term && e.push(c[f].word)
      showDidYouMean(e, a)
    },
  })
}
function showDidYouMean(a, b) {
  var c = ''
  b || ((c = 'No results found.'), setHelpline(' '))
  if (0 < a.length && !areFiltersActive()) {
    c += '<br>' + locText('DID_YOU_MEAN') + ': '
    var e
    for (e = 0; e < a.length; e++) {
      var f = THESAURUS_RELATED_TEMPLATE.replace(
        /%s/g,
        encodeURIComponent(a[e])
      )
      '' !== requested_lang && (f += '&lang=' + requested_lang)
      f += '&loc=jsdym'
      b && (f += '2')
      0 < e && (c += ' or ')
      c += ' <a href="' + f + '">' + a[e] + '</a>'
    }
    c += '?'
  }
  '' !== c &&
    $('#content').append(
      '<div class="nonefound" id="zone1">' + c + '</div><br>'
    )
}
function fetchAndShowPhrases() {
  var a =
    getApiBaseUrl() +
    '/sug?v=ol_gte2_suggest&k=olt_phrases&max=200&s=' +
    encodeURIComponent(filter_term)
  return $.ajax({
    dataType: 'json',
    type: 'Get',
    url: a,
    success: function (b) {
      var c = [],
        e
      for (
        e = 0;
        e < b.length &&
        !(
          b[e].word !== filter_term &&
          (' ' + b[e].word.toLowerCase() + ' ').match(
            ' ' + filter_term + ' '
          ) &&
          (c.push(b[e].word), 100 < c.length)
        );
        e++
      );
      showPhrases(c)
    },
  })
}
function showPhrases(a) {
  var b = ''
  if (0 < a.length) {
    b += '<br>' + locText('PHRASES') + ': &nbsp;&nbsp;'
    var c
    for (c = 0; c < a.length; c++) {
      var e = THESAURUS_RELATED_TEMPLATE.replace(
        /%s/g,
        encodeURIComponent(a[c])
      )
      '' !== requested_lang && (e += '&lang=' + requested_lang)
      e += '&loc=jsphrase'
      0 < c && (b += ',&nbsp; ')
      var f = new RegExp('(' + filter_term + ')', 'gi'),
        m = a[c].match(f)
      0 < m.length &&
        ((f = a[c].replace(f, '<b>' + m[0] + '</b>')),
        (b += ' <a href="' + e + '">' + f + '</a>'))
    }
  }
  '' !== b ? $('#phrasebox').html(b) : $('#phrasebox').html('')
}
function fetchAndShowWotd() {
  var a =
    getApiBaseUrl() +
    '/words?k=ol_wotd&max=1&qe=s&wotd=wotd-ol-en-2022-22&s=' +
    encodeURIComponent(filter_term)
  return $.ajax({
    dataType: 'json',
    type: 'Get',
    url: a,
    success: function (b) {
      var c = ''
      if (0 < b.length && 'undefined' != typeof b[0].tags) {
        b = b[0].tags
        var e
        for (e = 0; e < b.length; e++) {
          var f = b[e]
          if (f.match(/^wotd:/)) {
            f = f.replace('wotd:', '')
            parseFloat(f)
              ? (console.log(parseFloat(f)),
                (sim = 1 / parseFloat(f) - 1),
                (c = 0),
                1 > sim ? (c = 4) : 5 > sim ? (c = 3) : 20 > sim && (c = 2),
                (c =
                  'You are ' +
                  sim.toFixed(c) +
                  " kilometers away from today's secret word!"))
              : ((b = f.split('\t')),
                2 <= b.length &&
                  (c = '<font size=3><b>' + b[1] + '</b></font>'))
            break
          }
        }
      }
      $('#wotdbox').html(c)
    },
  })
}
function locText(a) {
  return 'ALPHABETIZE' === a
    ? 'es' === requested_lang
      ? 'Alfabetizar'
      : 'Alphabetize'
    : 'VIZ_BUTTON_ON' === a
    ? 'Idea map'
    : 'VIZ_BUTTON_OFF' === a
    ? 'Back to results'
    : 'POS_ALL' === a
    ? 'es' === requested_lang
      ? 'Todas'
      : 'All'
    : 'POS_NOUNS' === a
    ? 'es' === requested_lang
      ? 'Sustantivos'
      : 'Nouns'
    : 'POS_VERBS' === a
    ? 'es' === requested_lang
      ? 'Verbos'
      : 'Verbs'
    : 'POS_ADVERBS' === a
    ? 'es' === requested_lang
      ? 'Adverbios'
      : 'Adverbs'
    : 'POS_UNCATEGORIZED' === a
    ? 'es' === requested_lang
      ? 'Otro'
      : 'Uncategorized'
    : 'POS_ADJECTIVES' === a
    ? 'es' === requested_lang
      ? 'Adjetivos'
      : 'Adjectives'
    : 'DID_YOU_MEAN' === a
    ? 'es' === requested_lang
      ? '&iquest;Quieras decir'
      : 'Did you mean'
    : 'SHOW_FILTERS' === a
    ? 'es' === requested_lang
      ? 'Limitar'
      : 'Advanced filters'
    : 'CLEAR_FILTERS' === a
    ? 'es' === requested_lang
      ? 'Cerrar'
      : 'Clear filters'
    : 'FILT_HELP_STARTS_WITH' === a
    ? 'es' === requested_lang
      ? 'Escriba cualquier letras para mostrar palabras que empiezan con esas letras'
      : 'Type any letters to show words that begin with those letters'
    : 'FILT_HELP_ENDS_WITH' === a
    ? 'es' === requested_lang
      ? 'Escriba cualquier letras para mostrar palabras que terminan con esas letras'
      : 'Type any letters to show words that end with those letters'
    : 'FILT_HELP_NUM_LETTERS' === a
    ? 'es' === requested_lang
      ? 'Escriba un n\u00famero para mostrar palabras que tienen ese n\u00famero de letras'
      : 'Type a number to show words that are that many letters, or 0 to sort by length'
    : 'FILT_HELP_ALSO_RELATED' === a
    ? 'es' === requested_lang
      ? 'Escriba un concepto para subir palabras relacionadas'
      : 'Type any concept to bring words related to that concept to the top'
    : 'FILT_HELP_RHYMES' === a
    ? 'es' === requested_lang
      ? 'Escriba una palabra para mostrar s\u00f3lo las palabras que riman con esa palabra'
      : 'Type a word to show only words that rhyme with it'
    : 'FILT_HELP_SOUNDS_LIKE' === a
    ? 'es' === requested_lang
      ? 'Escriba cualquier letras para mostrar s\u00f3lo palabras pronunciadas con esas letras'
      : 'Type a word to show only words pronounced similarly to it'
    : 'FILT_HELP_VOWELS_LIKE' === a
    ? 'es' === requested_lang
      ? 'Escriba una palabra para mostrar s\u00f3lo las palabras que tienen la misma vocal primaria'
      : 'Pick a primary vowel sound from the list'
    : 'FILT_HELP_METER' === a
    ? 'es' === requested_lang
      ? "Escriba una secuencia de 'x' (sin acento) y '/' (con acento), para mostrar palabras que tienen ese acentuaci\u00f3n"
      : 'Pick a meter using \'/\' for stressed, \'x\' for unstressed (<a target="_blank" href="https://en.wikipedia.org/wiki/Scansion#2-level_notations">Help</a>)'
    : 'FILT_HELP_NUM_SYLLABLES' === a
    ? 'es' === requested_lang
      ? 'Escriba un n\u00famero para mostrar palabras que tienen ese n\u00famero de s\u00edlabas'
      : 'Type a number to show words that have that many syllables'
    : 'FILT_HELP_NEEDS_TOPIC' === a
    ? 'es' === requested_lang
      ? 'Lo sentimos, este filtro no funciona actualmente a menos que tambi\u00e9n haya un tema previamente especificado.'
      : "Sorry, this filter does not currently work unless there's also a topic specified above."
    : 'RESTRICT_TO_METER' === a
    ? 'es' === requested_lang
      ? 'Ritmo'
      : 'Restrict to meter'
    : 'PREVIOUS_RESULTS' === a
    ? 'es' === requested_lang
      ? 'Anterior'
      : 'Previous results'
    : 'NEXT_RESULTS' === a
    ? 'es' === requested_lang
      ? 'Siguiente'
      : 'Next results'
    : 'FILT_HELP_TOP' === a
    ? 'es' === requested_lang
      ? '<b>Filtrar</b>: Seleccione un filtro para reducir las palabras relacionadas'
      : '<b>Filter results</b>: <i>Choose a filter to narrow down the list of results'
    : 'FILT_HELP_TOP_ACTIVE' === a
    ? 'es' === requested_lang
      ? '<b>Filtrar</b>: Seleccione un filtro para reducir las palabras relacionadas'
      : '<i>The filters in green below are active</i>'
    : 'FILT_HELP_HEADER' === a
    ? 'es' === requested_lang
      ? 'Filtrar'
      : 'Filter'
    : 'HELP' === a
    ? 'es' === requested_lang
      ? 'Ayuda'
      : 'Help'
    : 'ENTER_HELP' === a
    ? 'es' === requested_lang
      ? 'Ingrese una palabra, frase, definici\u00f3n o patr\u00f3n arriba para buscar palabras relacionadas.'
      : 'Enter a word, phrase, description, or pattern above to find related words.'
    : 'SHOWING_1' === a
    ? 'es' === requested_lang
      ? 'Palabras'
      : 'Showing words'
    : 'SHOWING_2' === a
    ? 'es' === requested_lang
      ? 'Palabras filtradas'
      : 'Showing filtered words'
    : 'SHOWING_ALPHA' === a
    ? 'es' === requested_lang
      ? 'alfab&eacute;ticamente'
      : 'alphabetically'
    : 'SHOWING_POP' === a
    ? 'es' === requested_lang
      ? 'por popularidad'
      : 'by popularity'
    : 'SHOWING_RELEVANCE' === a
    ? 'es' === requested_lang
      ? 'por relevancia'
      : 'by relevance'
    : 'SHOWING_RANKED' === a
    ? 'es' === requested_lang
      ? 'ordenados'
      : 'ranked'
    : 'SHOWING_PATTERN' === a
    ? 'es' === requested_lang
      ? 'que encajan con el patr\u00f3n'
      : 'matching the pattern'
    : 'SHOWING_RELATED_TO' === a
    ? 'es' === requested_lang
      ? 'relacionado con'
      : 'related to'
    : 'SHOWING_BY_SIM_TO' === a
    ? 'es' === requested_lang
      ? 'por similitud con'
      : 'by similarity to'
    : 'SHOWING_LENGTH' === a
    ? 'es' === requested_lang
      ? 'por longitud'
      : 'by length'
    : 'PHRASES' === a
    ? 'es' === requested_lang
      ? 'Frases'
      : 'Phrases'
    : a
}
