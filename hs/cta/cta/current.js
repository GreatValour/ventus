window._hsq = window._hsq || [];
window.hbspt = window.hbspt || {};
window.hbspt.cta = window.hbspt.cta || {
  __hstc: "",
  __hssc: "",
  __hsfp: "",
  __utk: "",
  __generated_utk: "",
  email: "",
  __analyticsPageId: "",
  __path: "",
  __referrerPath: "",
  TRACKING_CODE_TIMEOUT: 2e3,
  placementsData: {},
  placementsLoadQueue: {},
  loadedQueue: !1,
  canonicalURL: "",
  queryStringToForward: [
    "tc_country",
    "tc_deviceCategory",
    "tc_visitSource",
    "tc_drillDownRule",
    "tc_language",
    "utm_campaign",
    "utm_medium",
  ],
  trackingKeys: {
    RENDER_SUCCESS: "cta-render-success",
    RENDER_TIMEOUT: "cta-render-timeout",
    CTA_JSON_SUCCESS: "cta-json-success",
    CTA_JSON_FAILURE: "cta-json-failure",
    WITH_ANALYTICS: "cta-with-analytics",
  },
  load: function (t, e, a) {
    var i = this,
      s = !1;
    i.utils.log(e + " loading");
    a || (a = { region: "na1" });
    a.region || (a.region = "na1");
    a.useNewLoader = !0;
    i.utils.setTrackingEnv(a.env, a.region, t);
    i.placementsData[e] = i.placementsData[e] || {
      portalId: t,
      loadCallTimestamp: new Date().getTime(),
    };
    i.utils.changeCtaVisibility(e, "hidden");
    i.__utk = i.__utk || i.utils.getCookieValue("hubspotutk");
    i.__hssc = i.__hssc || i.utils.getCookieValue("__hssc");
    i.__hstc = i.__hstc || i.utils.getCookieValue("__hstc");
    a.enforceTargetIsBlank && (i.enforceTargetIsBlank = !0);
    i.canonicalURL = i.canonicalURL || i.getCanonicalURL();
    i.utils.isPreviewUrl && (i.email = i.utils.getParameterByName("email"));
    i.setPlacementData(e, a, "t");
    function n(n) {
      if (!s) {
        i.__utk || (i.__generated_utk = i.utils.generateUtk());
        i.displayCta(t, e, a, n);
        s = !0;
      }
    }
    function r(t) {
      window._hsq.push(function (e) {
        i.utils.track(i.trackingKeys.WITH_ANALYTICS);
        i.__path = e.path;
        i.__referrerPath = e.referrerPath;
        i.__analyticsPageId =
          (window.hsVars && window.hsVars.analytics_page_id) || e.pageId;
        i.__hsfp = e._getFingerprint();
        if (e.utk) {
          i.__hstc = e.utk.get();
          i.__utk = e.utk.visitor;
        }
        e.session && (i.__hssc = e.session.get());
        e.contentType && (i.__contentType = e.contentType);
        t();
      });
    }
    if (a.useNewLoader) {
      i.addToQueue(t, e, a);
      i.utils.isPreviewUrl ||
        r(function () {
          i.utils.log("got tracker data");
        });
      i.utils.domReady(function () {
        if (!i.loadedQueue) {
          i.setupCMSAnalytics();
          i.loadedQueue = !0;
          setTimeout(function () {
            i.loadQueue();
          });
        }
      });
      window.setTimeout(function () {
        if (!i.placementsData[e].ctaLoaded) {
          i.utils.log(e + " timed out");
          i.utils.track(i.trackingKeys.RENDER_TIMEOUT);
          i.utils.changeCtaVisibility(e, "visible");
        }
      }, i.TRACKING_CODE_TIMEOUT);
    } else if (i.utils.isPreviewUrl) n();
    else {
      r(function () {
        i.utils.log(e + " get tracker data");
        n("a");
      });
      i.utils.domReady(function () {
        i.setupCMSAnalytics();
        var t = !!i.__analyticsPageId || !i.__isCos,
          e = !!i.__utk,
          a = !!i.__path || !i.shouldWaitForPath();
        e && t && a && n("d");
      });
      window.setTimeout(function () {
        if (!s) {
          i.utils.track(i.trackingKeys.RENDER_TIMEOUT);
          i.utils.log(e + " timed out");
          n("t");
        }
      }, i.TRACKING_CODE_TIMEOUT);
    }
  },
  shouldWaitForPath: function () {
    for (var t = 0; t < window._hsq.length; t++)
      if ("setPath" === window._hsq[t][0]) return !0;
    return !1;
  },
  getCanonicalURL: function () {
    for (
      var t = document.getElementsByTagName("link"), e = 0;
      e < t.length;
      e++
    ) {
      var a = t[e];
      if ("canonical" === a.rel) return a.href;
    }
    return window.location.href;
  },
  setupCMSAnalytics: function () {
    this.__isCos = this.utils.isCos();
    window.hsVars &&
      (this.__analyticsPageId =
        window.hsVars.analytics_page_id ||
        window.hsVars.dynamic_page_id ||
        window.hsVars.page_id);
  },
  generateLoaderQueryParams: function (t, e, a, s) {
    var n = {
      __hsfp: this.__hsfp,
      __hssc: this.__hssc,
      __hstc: this.__hstc,
      canon: this.canonicalURL,
      email: this.email,
      hsutk: this.__utk || this.__generated_utk,
      pageId: this.__analyticsPageId || s.options.analyticsPageId,
      contentType: s.options.contentType || this.__contentType,
      path: this.__path,
      pg: e,
      pid: t,
      referrer_path: this.__referrerPath,
      sv: this.constants.currentProjectVersion,
      utm_referrer: document.referrer,
    };
    for (i = 0; i < this.queryStringToForward.length; i++)
      n[this.queryStringToForward[i]] = this.utils.getParameterByName(
        this.queryStringToForward[i]
      );
    s.displayCallTimestamp = new Date().getTime();
    if (!this.utils.isPreviewUrl) {
      n.lag = s.displayCallTimestamp - s.loadCallTimestamp;
      n.rdy = this.utils.domReadyCalled ? 1 : 0;
      n.cos = this.__isCos ? 1 : 0;
      n.df = a;
    }
    return n;
  },
  getCtaLoaderScriptSrc: function (t, e, a, i) {
    if (i.loaderScriptUrl) return i.loaderScriptUrl;
    var s = this.generateLoaderQueryParams(t, e, a, i);
    window.hbspt.cta._relativeUrls && this.utils.isCos()
      ? (i.loaderScriptUrl =
          "/hs/cta/ctas/v2/public/cs/loader-v2.js?cos=1&" +
          this.utils.toQueryString(s))
      : (i.loaderScriptUrl =
          "//" +
          this.utils.getServiceDomain(i.options.env, i.options.region) +
          "/ctas/v2/public/cs/loader-v2.js?" +
          this.utils.toQueryString(s));
    return i.loaderScriptUrl;
  },
  getCtaLoadedScriptSrc: function (t, e) {
    var a = "d" == e.displayedFrom,
      i = {
        pid: e.portalId,
        pg: t,
        lt: e.loadCallTimestamp,
        dt: e.displayCallTimestamp,
        at: e.afterLoadCallTimestamp,
        ae: a || this.utils.analyticsEvaluated() ? 1 : 0,
        sl: a || this.utils.hasHubspotScriptLoader() ? 1 : 0,
        an: a || this.utils.hasHubspotAnalyticsScript() ? 1 : 0,
      };
    return window.hbspt.cta._relativeUrls && this.utils.isCos()
      ? "/hs/cta/ctas/v2/public/cs/cta-loaded.js?" + this.utils.toQueryString(i)
      : "//" +
          this.utils.getServiceDomain(e.options.env, e.options.region) +
          "/ctas/v2/public/cs/cta-loaded.js?" +
          this.utils.toQueryString(i);
  },
  displayCta: function (t, e, a, i) {
    this.placementsData[e].displayedFrom;
    var s = this.placementsData[e];
    this.utils.addScript(this.getCtaLoaderScriptSrc(t, e, i, s), e);
    var n = this;
    setTimeout(function () {
      try {
        var t = n.placementsData[e];
        if (!t.ctaLoaded) {
          n.utils.log(e + " trying to unhide default cta");
          n.utils.changeCtaVisibility(e, "visible");
        }
        n.callOnCtaReady(t);
      } catch (t) {
        n.utils.log(e + " was already gone");
      }
    }, 2500);
  },
  afterLoad: function (t) {
    var e = this;
    e.utils.log("after load was called");
    e.utils.track(e.trackingKeys.RENDER_SUCCESS);
    var a = e.placementsData[t];
    a.afterLoadCallTimestamp = new Date().getTime();
    this.utils.isPreviewUrl
      ? document.addEventListener("load", function () {
          this.utils.addScript(this.getCtaLoadedScriptSrc(t, a), t);
        })
      : this.utils.addScript(this.getCtaLoadedScriptSrc(t, a), t);
    e.enforceTargetIsBlank && e.utils.updatingTargetOnLinks();
    e.utils.isGooglebot ||
      (e.utils.isPreviewUrl ||
      (e.__hstc && e.__hssc && e.__hsfp && e.__utk && e.__contentType)
        ? e.utils.updateTrackingParamsOnLinks(
            e.__hstc,
            e.__hssc,
            e.__hsfp,
            e.__utk,
            e.__contentType,
            e.__analyticsPageId
          )
        : window._hsq.push(function (t) {
            e.utils.track(e.trackingKeys.WITH_ANALYTICS);
            e.__hsfp = t._getFingerprint();
            if (t.utk) {
              e.__hstc = t.utk.get();
              e.__utk = t.utk.visitor;
            }
            t.session && (e.__hssc = t.session.get());
            t.contentType && (e.__contentType = t.contentType);
            e.utils.updateTrackingParamsOnLinks(
              e.__hstc,
              e.__hssc,
              e.__hsfp,
              e.__utk,
              e.__contentType
            );
          }));
    e.callOnCtaReady(a);
  },
  callOnCtaReady: function (t) {
    if (0 == t.ctaLoaded && "function" == typeof t.options.onCTAReady)
      try {
        t.options.onCTAReady();
      } catch (t) {
        this.utils.log("Caught error while executing onCTAReady " + t);
      }
    t.ctaLoaded = !0;
  },
  setPlacementData: function (t, e, a) {
    this.placementsData[t].options = e || {};
    this.placementsData[t].ctaLoaded = !1;
    this.placementsData[t].displayedFrom = a;
    this.placementsData[t].displayCallTimestamp = new Date().getTime();
  },
  addToQueue: function (t, e, a) {
    var i =
      (this.placementsLoadQueue[t] &&
        this.placementsLoadQueue[t].placementGuids) ||
      [];
    i.push(e);
    this.placementsLoadQueue[t] = { options: a, placementGuids: i };
  },
  loadQueue: function () {
    var t = !!this.__analyticsPageId || !this.__isCos,
      e = !!this.__utk,
      a = !!this.__path || !this.shouldWaitForPath(),
      i = e && t && a ? "d" : "t";
    for (var s in this.placementsLoadQueue)
      if (Object.prototype.hasOwnProperty.call(this.placementsLoadQueue, s)) {
        var n = this.placementsLoadQueue[s];
        this.getCtaFromService(s, n.placementGuids, i, { options: n.options });
      }
  },
  resetQueue: function () {
    this.loadedQueue = !1;
    this.placementsLoadQueue = {};
  },
  addExternalCSSLinks: function (t, e) {
    var a, i;
    for (i = 0; i < t.length; i++) {
      (a = document.createElement("link")).rel = "stylesheet";
      a.type = "text/css";
      a.href = css_links[j];
      e.insertBefore(a, e.childNodes[0]);
    }
  },
  getTags: function (t) {
    var e,
      a,
      i,
      s,
      n,
      r = [];
    if (document.getElementsByClassName) {
      e = document.getElementsByClassName(t.placement_element_class);
      a = function (t) {
        return (
          ("DIV" == t.nodeName || "SPAN" == t.nodeName) &&
          !t.getAttribute("data-hs-drop")
        );
      };
    } else {
      e = [];
      s = document.getElementsByTagName("div");
      n = document.getElementsByTagName("span");
      for (i = 0; i < n.length; i++) e.push(n[i]);
      for (i = 0; i < s.length; i++) e.push(s[i]);
      a = function (e) {
        return (
          e.className.indexOf(t.placement_element_class) > -1 &&
          !e.getAttribute("data-hs-drop")
        );
      };
    }
    for (i = 0; i < e.length; ++i) a(e[i]) && r.push(e[i]);
    return r;
  },
  renderCTA: function (t) {
    var e,
      a,
      i,
      s = !!document.getElementById("hs-cta-ie-element"),
      n = t.image_html,
      r = this.getTags(t),
      o = t.is_image;
    if (!s && !o) {
      e =
        document.getElementsByTagName("head")[0] ||
        document.getElementsByTagName("body")[0];
      a = document.createElement("style");
      e.insertBefore(a, e.childNodes[0]);
      try {
        i =
          ".hs-cta-wrapper p, .hs-cta-wrapper div { margin: 0; padding: 0; }" +
          " " +
          t.css;
        a[document.all ? "innerText" : "textContent"] = i;
      } catch (t) {
        a.styleSheet.cssText = i;
      }
      t.has_external_links && this.addExternalCSSLinks(t.css_links, e);
      n = t.raw_html;
    }
    for (var c = null, l = 0; l < r.length; ++l) {
      for (
        var u = r[l], d = u.getElementsByTagName("img"), h = "", g = "", p = 0;
        p < d.length;
        p++
      ) {
        g = d[p].align;
        d[p].style.border = "";
        d[p].style.display = "";
        h = d[p].style.cssText;
        !c &&
          d[p].className.indexOf("hs-cta-img") > -1 &&
          "lazy" === d[p].loading &&
          (c = u);
      }
      if ("right" == g) {
        u.style.display = "block";
        u.style.textAlign = "right";
      } else if ("middle" == g) {
        u.style.display = "block";
        u.style.textAlign = "center";
      }
      u.innerHTML = n.replace("/*hs-extra-styles*/", h);
      u.style.visibility = "visible";
      u.setAttribute("data-hs-drop", "true");
      try {
        var m = new CustomEvent("onrenderhscta", { detail: u });
        document.dispatchEvent(m);
      } catch (t) {
        console.error("Custom event not supported in browser.");
      }
      window.hbspt &&
        hbspt.cta &&
        hbspt.cta.afterLoad &&
        hbspt.cta.afterLoad(t.placement_guid);
    }
    this.trackView(t.cta_guid, t.placement_guid, c);
    return r;
  },
  trackView: function (t, e, a) {
    window._hsq = window._hsq || [];
    a
      ? window._hsq.push(function (i) {
          if (
            (i.limitTrackingToCookieDomains && !i.cookie.currentDomain) ||
            !i.trackingEnabled ||
            i._hasDoNotTrack()
          )
            self.utils.log(
              "tracking not enabled, not tracking for: " + e + "-" + t
            );
          else {
            var s = {
                k: 12,
                aij: '["' + (e || "") + '","' + (t || "") + '"]',
                rfc: 8,
              },
              n = i._generateURL(s),
              r = document.createElement("img");
            r.src = n;
            r.width = 1;
            r.height = 1;
            r.loading = "lazy";
            r.id = "pixel-" + e + "-" + t;
            r.onload = function () {
              a.removeChild(r);
            };
            a.appendChild(r);
          }
        })
      : window._hsq.push(["trackCtaView", e, t]);
  },
  getCtaFromService: function (t, e, a, i) {
    for (
      var s = this,
        n = this.generateLoaderQueryParams(t, null, a, i),
        r = this.utils.toQueryString(n),
        o = 0;
      o < e.length;
      o++
    ) {
      r += "&pg=" + e[o];
    }
    var c =
      "https://" +
      this.utils.getServiceDomain(i.options.env, i.options.region) +
      "/ctas/v2/public/cs/cta-json?" +
      r;
    this.utils.getRequest(
      c,
      function (n, r = i.options.region) {
        if (r !== i.options.region) {
          s.utils.setTrackingEnv(i.options.env, r, t);
          i.options.region = r;
        }
        s.resetQueue();
        s.utils.track(s.trackingKeys.CTA_JSON_SUCCESS);
        for (var o in n)
          if (Object.prototype.hasOwnProperty.call(n, o)) {
            var c = n[o];
            if (c.error) {
              s.utils.log(
                e + " unhiding, error fetching cta. Error: " + c.error
              );
              s.utils.changeCtaVisibility(o, "visible");
            } else {
              s.placementsData[o].displayedFrom = a;
              s.renderCTA(n[o]);
            }
          }
      },
      function (t) {
        s.utils.track(s.trackingKeys.CTA_JSON_FAILURE);
        console.error(t);
        try {
          for (var a = 0; a < e.length; a++) {
            var i = e[a];
            s.utils.removeCta(i);
          }
        } catch (t) {
          console.error(t);
        }
      }
    );
  },
};
window.hbspt.cta.constants = {
  currentProjectVersion: "cta-embed-js/static-1.180/".replace(
    /\/(static(-\d+\.\d+)?)\//,
    "-$1"
  ),
};
!(function (t) {
  var e = { qa: "hubspotqa.com", prod: "hubspot.com" },
    a = { default: "cta-service-cms2", local: "local", hublet: "cta" };
  t.utils = {
    portalId: "",
    hublet: "",
    env: "",
    getCookieValue: function (t) {
      var e = new RegExp("(^|; )" + t + "=([^;]*)").exec(document.cookie),
        a = e ? e[2] : "";
      a && this.log("got cookie value " + t + " = " + a);
      return a;
    },
    decodeParameter: function (t) {
      try {
        return decodeURIComponent(t);
      } catch (t) {
        return "";
      }
    },
    getParameterByName: function (t) {
      t = t.replace(/[\\[]/, "\\\\[").replace(/[\\]]/, "\\\\]");
      var e = new RegExp("[\\\\?&]" + t + "=([^&#]*)").exec(
          window.location.search
        ),
        a = "";
      null !== e && (a = this.decodeParameter(e[1].replace(/\\+/g, " ")));
      return a;
    },
    toQueryString: function (t) {
      var e = [];
      for (var a in t)
        t.hasOwnProperty(a) &&
          t[a] &&
          e.push(encodeURIComponent(a) + "=" + encodeURIComponent(t[a]));
      return e.join("&");
    },
    isCos: function () {
      if (window.hsVars && window.hsVars.portal_id) return !0;
      for (
        var t = document.getElementsByTagName("meta"), e = 0;
        e < t.length;
        e++
      ) {
        var a = t[e];
        if (
          "generator" == a.getAttribute("name") &&
          "HubSpot" == a.getAttribute("content")
        )
          return !0;
      }
      return !1;
    },
    analyticsEvaluated: function () {
      return Boolean(window._hstc_loaded);
    },
    hasScriptThatMatchRegex: function (t) {
      for (
        var e = document.getElementsByTagName("script"), a = 0;
        a < e.length;
        a++
      ) {
        var i = e[a].getAttribute("src");
        if (i && t.test(i)) return !0;
      }
      return !1;
    },
    hasHubspotAnalyticsScript: function () {
      var t =
        /\/(js(-[^\.]+)?\.hs-analytics\.(com|net)|js(-[^\.]+)?\.hubspotqa\.com)\/analytics\/\d+\/\d+\.js/g;
      return this.hasScriptThatMatchRegex(t);
    },
    hasHubspotScriptLoader: function () {
      var t =
        /\/(js(-[^\.]+)?\.hs-scripts\.com|js(-[^\.]+)?\.hubspotqa\.com)\/\d+\.js/g;
      return this.hasScriptThatMatchRegex(t);
    },
    domReady: function (e) {
      if (t.domReady) return e();
      document.addEventListener
        ? document.addEventListener("DOMContentLoaded", function () {
            t.domReady = !0;
            e();
          })
        : window.attachEvent("onload", function () {
            t.domReady = !0;
            e();
          });
    },
    updatingTargetOnLinks: function () {
      for (
        var t = this.getElementsByClassName("cta_button"), e = 0;
        e < t.length;
        e++
      ) {
        var a = t[e];
        "a" == a.tagName.toLowerCase() && (a.target = "_blank");
      }
    },
    updateTrackingParamsOnLinks: function (t, e, a, i, s, n) {
      for (
        var r = this.getElementsByClassName("cta_button"), o = 0;
        o < r.length;
        o++
      ) {
        var c = r[o];
        if ("a" == c.tagName.toLowerCase()) {
          this.updateParamOnLink(c, "__hstc", t);
          this.updateParamOnLink(c, "__hssc", e);
          this.updateParamOnLink(c, "__hsfp", a);
          this.updateParamOnLink(c, "hsutk", i);
          this.updateParamOnLink(c, "contentType", s);
          this.updateParamOnLink(c, "pageId", n);
        }
      }
    },
    updateParamOnLink: function (t, e, a) {
      if (a && t && t.href && -1 === t.href.indexOf(e + "=" + a)) {
        t.href = this.updateQueryStringParameter(
          t.href,
          e,
          encodeURIComponent(a)
        );
        this.log("Added " + e + " = " + a + " to cta " + t.id);
      }
    },
    updateQueryStringParameter: function (t, e, a) {
      var i = t.indexOf("#"),
        s = -1 === i ? "" : t.substr(i),
        n = -1 === i ? t : t.substr(0, i),
        r = new RegExp("([?&])" + e + "=.*?(&|$)", "i"),
        o = -1 === n.indexOf("?") ? "?" : "&";
      return (
        (n = n.match(r)
          ? n.replace(r, "$1" + e + "=" + a + "$2")
          : n + o + e + "=" + a) + s
      );
    },
    getServiceDomain: function (t, i) {
      var s = "local" === t,
        n = i && "na1" !== i ? "-" + i : "",
        r = "qa" === t ? e.qa : e.prod,
        o = a.default;
      if (s) {
        o = a.local;
        r = e.qa;
      } else n && (o = a.hublet);
      return o + n + "." + r;
    },
    removeCta: function (t) {
      try {
        for (
          var e = this.getElementsByClassName("hs-cta-" + t),
            a = 0,
            i = e.length;
          a < i;
          a++
        ) {
          var s = e[a];
          s && s.parentNode.removeChild(s);
        }
      } catch (e) {
        this.log(t + " couldn't be change visibility to " + visibility);
      }
    },
    changeCtaVisibility: function (t, e) {
      try {
        for (
          var a = this.getElementsByClassName("hs-cta-" + t),
            i = 0,
            s = a.length;
          i < s;
          i++
        ) {
          var n = a[i];
          n.getAttribute("data-hs-drop") || (n.style.visibility = e);
        }
      } catch (a) {
        this.log(t + " couldn't be change visibility to " + e);
      }
    },
    isDebug: function () {
      return window.location.href.toLowerCase().indexOf("hsctadebug") >= 0;
    },
    log: function (t) {
      if (this.isDebug()) {
        t = new Date().getTime() + " [CTA]: " + t;
        window.console && window.console.log(t);
        if (this.getParameterByName("selenium")) {
          var e = document.getElementById("selenium_log");
          if (!e) {
            (e = document.createElement("pre")).id = "selenium_log";
            document.body.appendChild(e);
          }
          e.appendChild(document.createTextNode(t + "\n"));
        }
      }
    },
    generateUtk: function () {
      function t() {
        return (65536 * (1 + Math.random())).toString(16).substring(0, 4);
      }
      var e = new Date().getTime().toString(16);
      e = e.substring(e.length - 12 || 0, e.length);
      for (; e.length < 12; ) e = "0" + e;
      return "c7a00000" + t() + t() + t() + e;
    },
    addScript: function (t, e) {
      var a = document.createElement("script");
      a.type = "text/javascript";
      a.async = !0;
      a.src = t;
      this.isDebug() &&
        this.log(
          e +
            " adding script: " +
            a.src.replace(/&|\?/g, "\n").replace(/=/g, "\t= ")
        );
      (
        document.getElementsByTagName("head")[0] ||
        document.getElementsByTagName("body")[0]
      ).appendChild(a);
    },
    isPreviewUrlFn: function (e) {
      return (
        /preview(-[^\.]+)?\.hs-sites(qa)?(-[^\.]+)?\.com/g.test(e) ||
        /hubspotpreview(qa)?(-[^\.]+)?/.test(e) ||
        !!t.utils.getParameterByName("hs_preview")
      );
    },
    getRequest: function (t, e, a) {
      var i = new XMLHttpRequest();
      i.onreadystatechange = function () {
        if (4 === i.readyState) {
          if (200 === i.status)
            try {
              var t = JSON.parse(i.responseText),
                s = "";
              try {
                s = i.getResponseHeader("x-origin-hublet");
              } catch (t) {}
              e(t, s);
            } catch (t) {
              a(t);
            }
          i.status >= 400 && a();
        }
      };
      i.open("GET", t, !0);
      i.withCredentials = !0;
      i.send(null);
    },
    setTrackingEnv: function (t, e, a) {
      this.env = t || "prod";
      this.hublet = e || "na1";
      this.portalId = a;
    },
    track: function (t) {
      var e = this.hublet || "na1",
        a =
          "https://perf" +
          ("na1" !== e ? "-" + e : "") +
          ".hsforms" +
          ("qa" === (this.env || "prod") ? "qa" : "") +
          ".com/embed/v3/counters.gif?key=" +
          t +
          "&value=1";
      new Image().src = a;
    },
  };
  t.utils.isPreviewUrl = t.utils.isPreviewUrlFn(
    window.location.host,
    this.hublet
  );
  t.utils.isGooglebot = /googlebot/i.test(navigator.userAgent);
  t.utils.getElementsByClassName = document.getElementsByClassName
    ? document.getElementsByClassName.bind(document)
    : function (t) {
        document.querySelectorAll("." + t);
      };
  t.utils.domReady(function () {
    t.utils.domReadyCalled = !0;
  });
})(window.hbspt.cta);
