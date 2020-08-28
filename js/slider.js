! function(t, e) {
	"object" == typeof exports && "undefined" != typeof module ? e(exports, require("jquery"), require("popper.js")) : "function" == typeof define && define.amd ? define(["exports", "jquery", "popper.js"], e) : e((t = t || self).bootstrap = {}, t.jQuery, t.Popper)
}(this, function(t, g, u) {
	"use strict";

	function i(t, e) {
		for (var n = 0; n < e.length; n++) {
			var i = e[n];
			i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
		}
	}

	function s(t, e, n) {
		return e && i(t.prototype, e), n && i(t, n), t
	}

	function e(e, t) {
		var n = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var i = Object.getOwnPropertySymbols(e);
			t && (i = i.filter(function(t) {
				return Object.getOwnPropertyDescriptor(e, t).enumerable
			})), n.push.apply(n, i)
		}
		return n
	}

	function l(o) {
		for (var t = 1; t < arguments.length; t++) {
			var r = null != arguments[t] ? arguments[t] : {};
			t % 2 ? e(Object(r), !0).forEach(function(t) {
				var e, n, i;
				e = o, i = r[n = t], n in e ? Object.defineProperty(e, n, {
					value: i,
					enumerable: !0,
					configurable: !0,
					writable: !0
				}) : e[n] = i
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(r)) : e(Object(r)).forEach(function(t) {
				Object.defineProperty(o, t, Object.getOwnPropertyDescriptor(r, t))
			})
		}
		return o
	}
	g = g && g.hasOwnProperty("default") ? g.default : g, u = u && u.hasOwnProperty("default") ? u.default : u;
	var n = "transitionend";

	function o(t) {
		var e = this,
			n = !1;
		return g(this).one(_.TRANSITION_END, function() {
			n = !0
		}), setTimeout(function() {
			n || _.triggerTransitionEnd(e)
		}, t), this
	}
	var _ = {
		TRANSITION_END: "bsTransitionEnd",
		getUID: function(t) {
			for (; t += ~~(1e6 * Math.random()), document.getElementById(t););
			return t
		},
		getSelectorFromElement: function(t) {
			var e = t.getAttribute("data-target");
			if (!e || "#" === e) {
				var n = t.getAttribute("href");
				e = n && "#" !== n ? n.trim() : ""
			}
			try {
				return document.querySelector(e) ? e : null
			} catch (t) {
				return null
			}
		},
		getTransitionDurationFromElement: function(t) {
			if (!t) return 0;
			var e = g(t).css("transition-duration"),
				n = g(t).css("transition-delay"),
				i = parseFloat(e),
				o = parseFloat(n);
			return i || o ? (e = e.split(",")[0], n = n.split(",")[0], 1e3 * (parseFloat(e) + parseFloat(n))) : 0
		},
		reflow: function(t) {
			return t.offsetHeight
		},
		triggerTransitionEnd: function(t) {
			g(t).trigger(n)
		},
		supportsTransitionEnd: function() {
			return Boolean(n)
		},
		isElement: function(t) {
			return (t[0] || t).nodeType
		},
		typeCheckConfig: function(t, e, n) {
			for (var i in n)
				if (Object.prototype.hasOwnProperty.call(n, i)) {
					var o = n[i],
						r = e[i],
						s = r && _.isElement(r) ? "element" : (a = r, {}.toString.call(a).match(/\s([a-z]+)/i)[1].toLowerCase());
					if (!new RegExp(o).test(s)) throw new Error(t.toUpperCase() + ': Option "' + i + '" provided type "' + s + '" but expected type "' + o + '".')
				}
			var a
		},
		findShadowRoot: function(t) {
			if (!document.documentElement.attachShadow) return null;
			if ("function" != typeof t.getRootNode) return t instanceof ShadowRoot ? t : t.parentNode ? _.findShadowRoot(t.parentNode) : null;
			var e = t.getRootNode();
			return e instanceof ShadowRoot ? e : null
		},
		jQueryDetection: function() {
			if ("undefined" == typeof g) throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
			var t = g.fn.jquery.split(" ")[0].split(".");
			if (t[0] < 2 && t[1] < 9 || 1 === t[0] && 9 === t[1] && t[2] < 1 || 4 <= t[0]) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
		}
	};
	_.jQueryDetection(), g.fn.emulateTransitionEnd = o, g.event.special[_.TRANSITION_END] = {
		bindType: n,
		delegateType: n,
		handle: function(t) {
			if (g(t.target).is(this)) return t.handleObj.handler.apply(this, arguments)
		}
	};
	var r = "alert",
		a = "bs.alert",
		c = "." + a,
		h = g.fn[r],
		f = {
			CLOSE: "close" + c,
			CLOSED: "closed" + c,
			CLICK_DATA_API: "click" + c + ".data-api"
		},
		d = "alert",
		m = "fade",
		p = "show",
		v = function() {
			function i(t) {
				this._element = t
			}
			var t = i.prototype;
			return t.close = function(t) {
				var e = this._element;
				t && (e = this._getRootElement(t)), this._triggerCloseEvent(e).isDefaultPrevented() || this._removeElement(e)
			}, t.dispose = function() {
				g.removeData(this._element, a), this._element = null
			}, t._getRootElement = function(t) {
				var e = _.getSelectorFromElement(t),
					n = !1;
				return e && (n = document.querySelector(e)), n = n || g(t).closest("." + d)[0]
			}, t._triggerCloseEvent = function(t) {
				var e = g.Event(f.CLOSE);
				return g(t).trigger(e), e
			}, t._removeElement = function(e) {
				var n = this;
				if (g(e).removeClass(p), g(e).hasClass(m)) {
					var t = _.getTransitionDurationFromElement(e);
					g(e).one(_.TRANSITION_END, function(t) {
						return n._destroyElement(e, t)
					}).emulateTransitionEnd(t)
				} else this._destroyElement(e)
			}, t._destroyElement = function(t) {
				g(t).detach().trigger(f.CLOSED).remove()
			}, i._jQueryInterface = function(n) {
				return this.each(function() {
					var t = g(this),
						e = t.data(a);
					e || (e = new i(this), t.data(a, e)), "close" === n && e[n](this)
				})
			}, i._handleDismiss = function(e) {
				return function(t) {
					t && t.preventDefault(), e.close(this)
				}
			}, s(i, null, [{
				key: "VERSION",
				get: function() {
					return "4.4.1"
				}
			}]), i
		}();
	g(document).on(f.CLICK_DATA_API, '[data-dismiss="alert"]', v._handleDismiss(new v)), g.fn[r] = v._jQueryInterface, g.fn[r].Constructor = v, g.fn[r].noConflict = function() {
		return g.fn[r] = h, v._jQueryInterface
	};
	
	var R = "carousel",
		x = "bs.carousel",
		F = "." + x,
		U = ".data-api",
		W = g.fn[R],
		q = {
			interval: 5e3,
			keyboard: !0,
			slide: !1,
			pause: "hover",
			wrap: !0,
			touch: !0
		},
		M = {
			interval: "(number|boolean)",
			keyboard: "boolean",
			slide: "(boolean|string)",
			pause: "(string|boolean)",
			wrap: "boolean",
			touch: "boolean"
		},
		K = "next",
		Q = "prev",
		B = "left",
		V = "right",
		Y = {
			SLIDE: "slide" + F,
			SLID: "slid" + F,
			KEYDOWN: "keydown" + F,
			MOUSEENTER: "mouseenter" + F,
			MOUSELEAVE: "mouseleave" + F,
			TOUCHSTART: "touchstart" + F,
			TOUCHMOVE: "touchmove" + F,
			TOUCHEND: "touchend" + F,
			POINTERDOWN: "pointerdown" + F,
			POINTERUP: "pointerup" + F,
			DRAG_START: "dragstart" + F,
			LOAD_DATA_API: "load" + F + U,
			CLICK_DATA_API: "click" + F + U
		},
		z = "carousel",
		X = "active",
		$ = "slide",
		G = "carousel-item-right",
		J = "carousel-item-left",
		Z = "carousel-item-next",
		tt = "carousel-item-prev",
		et = "pointer-event",
		nt = ".active",
		it = ".active.carousel-item",
		ot = ".carousel-item",
		rt = ".carousel-item img",
		st = ".carousel-item-next, .carousel-item-prev",
		at = ".carousel-indicators",
		lt = "[data-slide], [data-slide-to]",
		ct = '[data-ride="carousel"]',
		ht = {
			TOUCH: "touch",
			PEN: "pen"
		},
		ut = function() {
			function r(t, e) {
				this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this.touchStartX = 0, this.touchDeltaX = 0, this._config = this._getConfig(e), this._element = t, this._indicatorsElement = this._element.querySelector(at), this._touchSupported = "ontouchstart" in document.documentElement || 0 < navigator.maxTouchPoints, this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent), this._addEventListeners()
			}
			var t = r.prototype;
			return t.next = function() {
				this._isSliding || this._slide(K)
			}, t.nextWhenVisible = function() {
				!document.hidden && g(this._element).is(":visible") && "hidden" !== g(this._element).css("visibility") && this.next()
			}, t.prev = function() {
				this._isSliding || this._slide(Q)
			}, t.pause = function(t) {
				t || (this._isPaused = !0), this._element.querySelector(st) && (_.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
			}, t.cycle = function(t) {
				t || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
			}, t.to = function(t) {
				var e = this;
				this._activeElement = this._element.querySelector(it);
				var n = this._getItemIndex(this._activeElement);
				if (!(t > this._items.length - 1 || t < 0))
					if (this._isSliding) g(this._element).one(Y.SLID, function() {
						return e.to(t)
					});
					else {
						if (n === t) return this.pause(), void this.cycle();
						var i = n < t ? K : Q;
						this._slide(i, this._items[t])
					}
			}, t.dispose = function() {
				g(this._element).off(F), g.removeData(this._element, x), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null
			}, t._getConfig = function(t) {
				return t = l({}, q, {}, t), _.typeCheckConfig(R, t, M), t
			}, t._handleSwipe = function() {
				var t = Math.abs(this.touchDeltaX);
				if (!(t <= 40)) {
					var e = t / this.touchDeltaX;
					(this.touchDeltaX = 0) < e && this.prev(), e < 0 && this.next()
				}
			}, t._addEventListeners = function() {
				var e = this;
				this._config.keyboard && g(this._element).on(Y.KEYDOWN, function(t) {
					return e._keydown(t)
				}), "hover" === this._config.pause && g(this._element).on(Y.MOUSEENTER, function(t) {
					return e.pause(t)
				}).on(Y.MOUSELEAVE, function(t) {
					return e.cycle(t)
				}), this._config.touch && this._addTouchEventListeners()
			}, t._addTouchEventListeners = function() {
				var e = this;
				if (this._touchSupported) {
					var n = function(t) {
							e._pointerEvent && ht[t.originalEvent.pointerType.toUpperCase()] ? e.touchStartX = t.originalEvent.clientX : e._pointerEvent || (e.touchStartX = t.originalEvent.touches[0].clientX)
						},
						i = function(t) {
							e._pointerEvent && ht[t.originalEvent.pointerType.toUpperCase()] && (e.touchDeltaX = t.originalEvent.clientX - e.touchStartX), e._handleSwipe(), "hover" === e._config.pause && (e.pause(), e.touchTimeout && clearTimeout(e.touchTimeout), e.touchTimeout = setTimeout(function(t) {
								return e.cycle(t)
							}, 500 + e._config.interval))
						};
					g(this._element.querySelectorAll(rt)).on(Y.DRAG_START, function(t) {
						return t.preventDefault()
					}), this._pointerEvent ? (g(this._element).on(Y.POINTERDOWN, function(t) {
						return n(t)
					}), g(this._element).on(Y.POINTERUP, function(t) {
						return i(t)
					}), this._element.classList.add(et)) : (g(this._element).on(Y.TOUCHSTART, function(t) {
						return n(t)
					}), g(this._element).on(Y.TOUCHMOVE, function(t) {
						return function(t) {
							t.originalEvent.touches && 1 < t.originalEvent.touches.length ? e.touchDeltaX = 0 : e.touchDeltaX = t.originalEvent.touches[0].clientX - e.touchStartX
						}(t)
					}), g(this._element).on(Y.TOUCHEND, function(t) {
						return i(t)
					}))
				}
			}, t._keydown = function(t) {
				if (!/input|textarea/i.test(t.target.tagName)) switch (t.which) {
					case 37:
						t.preventDefault(), this.prev();
						break;
					case 39:
						t.preventDefault(), this.next()
				}
			}, t._getItemIndex = function(t) {
				return this._items = t && t.parentNode ? [].slice.call(t.parentNode.querySelectorAll(ot)) : [], this._items.indexOf(t)
			}, t._getItemByDirection = function(t, e) {
				var n = t === K,
					i = t === Q,
					o = this._getItemIndex(e),
					r = this._items.length - 1;
				if ((i && 0 === o || n && o === r) && !this._config.wrap) return e;
				var s = (o + (t === Q ? -1 : 1)) % this._items.length;
				return -1 == s ? this._items[this._items.length - 1] : this._items[s]
			}, t._triggerSlideEvent = function(t, e) {
				var n = this._getItemIndex(t),
					i = this._getItemIndex(this._element.querySelector(it)),
					o = g.Event(Y.SLIDE, {
						relatedTarget: t,
						direction: e,
						from: i,
						to: n
					});
				return g(this._element).trigger(o), o
			}, t._setActiveIndicatorElement = function(t) {
				if (this._indicatorsElement) {
					var e = [].slice.call(this._indicatorsElement.querySelectorAll(nt));
					g(e).removeClass(X);
					var n = this._indicatorsElement.children[this._getItemIndex(t)];
					n && g(n).addClass(X)
				}
			}, t._slide = function(t, e) {
				var n, i, o, r = this,
					s = this._element.querySelector(it),
					a = this._getItemIndex(s),
					l = e || s && this._getItemByDirection(t, s),
					c = this._getItemIndex(l),
					h = Boolean(this._interval);
					
				if (o = t === K ? (n = J, i = Z, B) : (n = G, i = tt, V), l && g(l).hasClass(X)) this._isSliding = !1;
				else if (!this._triggerSlideEvent(l, o).isDefaultPrevented() && s && l) {
					this._isSliding = !0, h && this.pause(), this._setActiveIndicatorElement(l);
					var u = g.Event(Y.SLID, {
						relatedTarget: l,
						direction: o,
						from: a,
						to: c
					});
					if (g(this._element).hasClass($)) {
						g(l).addClass(i), _.reflow(l), g(s).addClass(n), g(l).addClass(n);
						var f = parseInt(l.getAttribute("data-interval"), 10);
						f ? (this._config.defaultInterval = this._config.defaultInterval || this._config.interval, this._config.interval = f) : this._config.interval = this._config.defaultInterval || this._config.interval;
						var d = _.getTransitionDurationFromElement(s);
						g(s).one(_.TRANSITION_END, function() {
							g(l).removeClass(n + " " + i).addClass(X), g(s).removeClass(X + " " + i + " " + n), r._isSliding = !1, setTimeout(function() {
								return g(r._element).trigger(u)
							}, 0)
						}).emulateTransitionEnd(d)
					} else g(s).removeClass(X), g(l).addClass(X), this._isSliding = !1, g(this._element).trigger(u);
					h && this.cycle()
				};

				var number = null;
					var carouselItemActive = document.getElementsByClassName('li active')
					if(carouselItemActive.length >0) { number = carouselItemActive[0].getAttribute("data-slide-to");}
					var target = document.getElementById("number");
					var nums = Number(number);
					target.textContent = nums + 1;

			}, r._jQueryInterface = function(i) {
				return this.each(function() {
					var t = g(this).data(x),
						e = l({}, q, {}, g(this).data());
					"object" == typeof i && (e = l({}, e, {}, i));
					var n = "string" == typeof i ? i : e.slide;
					if (t || (t = new r(this, e), g(this).data(x, t)), "number" == typeof i) t.to(i);
					else if ("string" == typeof n) {
						if ("undefined" == typeof t[n]) throw new TypeError('No method named "' + n + '"');
						t[n]()
					} else e.interval && e.ride && (t.pause(), t.cycle())
				})
			}, r._dataApiClickHandler = function(t) {
				var e = _.getSelectorFromElement(this);
				if (e) {
					var n = g(e)[0];
					if (n && g(n).hasClass(z)) {
						var i = l({}, g(n).data(), {}, g(this).data()),
							o = this.getAttribute("data-slide-to");
							o && (i.interval = !1), r._jQueryInterface.call(g(n), i), o && g(n).data(x).to(o), t.preventDefault()
					}
				}
			}, s(r, null, [{
				key: "VERSION",
				get: function() {
					return "4.4.1"
				}
			}, {
				key: "Default",
				get: function() {
					return q
				}
			}]), r
		}();
	g(document).on(Y.CLICK_DATA_API, lt, ut._dataApiClickHandler), g(window).on(Y.LOAD_DATA_API, function() {
		for (var t = [].slice.call(document.querySelectorAll(ct)), e = 0, n = t.length; e < n; e++) {
			var i = g(t[e]);
			ut._jQueryInterface.call(i, i.data())
		}
	}), g.fn[R] = ut._jQueryInterface, g.fn[R].Constructor = ut, g.fn[R].noConflict = function() {
		return g.fn[R] = W, ut._jQueryInterface
	};	
});
