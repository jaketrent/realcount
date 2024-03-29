define(['./raphael.core'], function (Raphael) {

  function b(n, h, g, t, e, o) {
    o = o || {};
    var c = this, q = [], k = n.set(), s = n.set(), m = n.set(), x = [], z = e.length, A = 0, D = 0, C = 0, f = 9, B = true;

    function w(I, H, i, K, G, P) {
      var M = Math.PI / 180, E = I + i * Math.cos(-K * M), p = I + i * Math.cos(-G * M), J = I + i / 2 * Math.cos(-(K + (G - K) / 2) * M), O = H + i * Math.sin(-K * M), N = H + i * Math.sin(-G * M), F = H + i / 2 * Math.sin(-(K + (G - K) / 2) * M), L = ["M", I, H, "L", E, O, "A", i, i, 0, +(Math.abs(G - K) > 180), 1, p, N, "z"];
      L.middle = {x:J, y:F};
      return L
    }

    s.covers = k;
    if (z == 1) {
      m.push(n.circle(h, g, t).attr({fill:c.colors[0], stroke:o.stroke || "#fff", "stroke-width":o.strokewidth == null ? 1 : o.strokewidth}));
      k.push(n.circle(h, g, t).attr(c.shim));
      D = e[0];
      e[0] = {value:e[0], order:0, valueOf:function () {
        return this.value
      }};
      m[0].middle = {x:h, y:g};
      m[0].mangle = 180
    } else {
      for (var y = 0; y < z; y++) {
        D += e[y];
        e[y] = {value:e[y], order:y, valueOf:function () {
          return this.value
        }}
      }
      e.sort(function (p, i) {
        return i.value - p.value
      });
      for (y = 0; y < z; y++) {
        if (B && e[y] * 360 / D <= 1.5) {
          f = y;
          B = false
        }
        if (y > f) {
          B = false;
          e[f].value += e[y];
          e[f].others = true;
          C = e[f].value
        }
      }
      z = Math.min(f + 1, e.length);
      C && e.splice(z) && (e[f].others = true);
      for (y = 0; y < z; y++) {
        var j = A - 360 * e[y] / D / 2;
        if (!y) {
          A = 90 - j;
          j = A - 360 * e[y] / D / 2
        }
        if (o.init) {
          var l = w(h, g, 1, A, A - 360 * e[y] / D).join(",")
        }
        var v = w(h, g, t, A, A -= 360 * e[y] / D);
        var u = n.path(o.init ? l : v).attr({fill:o.colors && o.colors[y] || c.colors[y] || "#666", stroke:o.stroke || "#fff", "stroke-width":(o.strokewidth == null ? 1 : o.strokewidth), "stroke-linejoin":"round"});
        u.value = e[y];
        u.middle = v.middle;
        u.mangle = j;
        q.push(u);
        m.push(u);
        o.init && u.animate({path:v.join(",")}, (+o.init - 1) || 1000, ">")
      }
      for (y = 0; y < z; y++) {
        u = n.path(q[y].attr("path")).attr(c.shim);
        o.href && o.href[y] && u.attr({href:o.href[y]});
        u.attr = function () {
        };
        k.push(u);
        m.push(u)
      }
    }
    s.hover = function (F, r) {
      r = r || function () {
      };
      var E = this;
      for (var p = 0; p < z; p++) {
        (function (G, H, i) {
          var I = {sector:G, cover:H, cx:h, cy:g, mx:G.middle.x, my:G.middle.y, mangle:G.mangle, r:t, value:e[i], total:D, label:E.labels && E.labels[i]};
          H.mouseover(
            function () {
              F.call(I)
            }).mouseout(function () {
            r.call(I)
          })
        })(m[p], k[p], p)
      }
      return this
    };
    s.each = function (E) {
      var r = this;
      for (var p = 0; p < z; p++) {
        (function (F, G, i) {
          var H = {sector:F, cover:G, cx:h, cy:g, x:F.middle.x, y:F.middle.y, mangle:F.mangle, r:t, value:e[i], total:D, label:r.labels && r.labels[i]};
          E.call(H)
        })(m[p], k[p], p)
      }
      return this
    };
    s.click = function (E) {
      var r = this;
      for (var p = 0; p < z; p++) {
        (function (F, G, i) {
          var H = {sector:F, cover:G, cx:h, cy:g, mx:F.middle.x, my:F.middle.y, mangle:F.mangle, r:t, value:e[i], total:D, label:r.labels && r.labels[i]};
          G.click(function () {
            E.call(H)
          })
        })(m[p], k[p], p)
      }
      return this
    };
    s.inject = function (i) {
      i.insertBefore(k[0])
    };
    var d = function (J, E, r, p) {
      var N = h + t + t / 5, M = g, I = M + 10;
      J = J || [];
      p = (p && p.toLowerCase && p.toLowerCase()) || "east";
      r = n[r && r.toLowerCase()] || "circle";
      s.labels = n.set();
      for (var H = 0; H < z; H++) {
        var O = m[H].attr("fill"), F = e[H].order, G;
        e[H].others && (J[F] = E || "Others");
        J[F] = c.labelise(J[F], e[H], D);
        s.labels.push(n.set());
        s.labels[H].push(n[r](N + 5, I, 5).attr({fill:O, stroke:"none"}));
        s.labels[H].push(G = n.text(N + 20, I, J[F] || e[F]).attr(c.txtattr).attr({fill:o.legendcolor || "#000", "text-anchor":"start"}));
        k[H].label = s.labels[H];
        I += G.getBBox().height * 1.2
      }
      var K = s.labels.getBBox(), L = {east:[0, -K.height / 2], west:[-K.width - 2 * t - 20, -K.height / 2], north:[-t - K.width / 2, -t - K.height - 10], south:[-t - K.width / 2, t + 10]}[p];
      s.labels.translate.apply(s.labels, L);
      s.push(s.labels)
    };
    if (o.legend) {
      d(o.legend, o.legendothers, o.legendmark, o.legendpos)
    }
    s.push(m, k);
    s.series = m;
    s.covers = k;
    return s
  }

  var a = function () {
  };
  a.prototype = Raphael.g;
  b.prototype = new a;
  Raphael.fn.piechart = function (c, g, f, d, e) {
    return new b(this, c, g, f, d, e)
  }
});