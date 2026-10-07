// The landing page's behavior: copy buttons, English / Japanese, package search.
// (package-list-action also renders this file with Scriban, so it must not contain two opening braces in a row.)
(function () {
  "use strict";

  // ---------- language ----------
  var KEY = "vpm-lang";
  function stored() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function store(v) { try { localStorage.setItem(KEY, v); } catch (e) { /* private mode */ } }

  var lang = stored() || ((navigator.language || "").toLowerCase().indexOf("ja") === 0 ? "ja" : "en");

  function apply(l) {
    lang = l;
    document.documentElement.lang = l;
    document.querySelectorAll("[data-en]").forEach(function (el) {
      var text = el.getAttribute("data-" + l);
      if (text !== null) el.textContent = text;
    });
    document.querySelectorAll("[data-en-placeholder]").forEach(function (el) {
      el.placeholder = el.getAttribute("data-" + l + "-placeholder") || el.placeholder;
    });
  }
  apply(lang);

  var toggle = document.getElementById("lang");
  if (toggle) toggle.addEventListener("click", function () {
    var next = lang === "ja" ? "en" : "ja";
    store(next);
    apply(next);
  });

  // ---------- copy ----------
  function flash(button) {
    var use = button.querySelector("use");
    var label = button.querySelector("span[data-en]");
    var oldIcon = use && use.getAttribute("href");
    var oldText = label && label.textContent;
    if (use) use.setAttribute("href", "#i-check");
    if (label) label.textContent = lang === "ja" ? "コピーしました" : "Copied";
    button.classList.add("copied");
    setTimeout(function () {
      if (use) use.setAttribute("href", oldIcon);
      if (label) label.textContent = oldText;
      button.classList.remove("copied");
    }, 1600);
  }

  function selectText(button) {
    var code = button.querySelector("code") || document.getElementById("repo-url");
    if (!code) return;
    var range = document.createRange();
    range.selectNodeContents(code);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }

  document.querySelectorAll("[data-copy]").forEach(function (button) {
    button.addEventListener("click", function () {
      var text = button.getAttribute("data-copy");
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { flash(button); }, function () { selectText(button); });
      } else {
        selectText(button);
      }
    });
  });

  // ---------- search (shown when there are many packages) ----------
  var search = document.getElementById("search");
  if (search) search.addEventListener("input", function () {
    var q = search.value.trim().toLowerCase();
    var shown = 0;
    document.querySelectorAll(".card").forEach(function (card) {
      var hit = !q || (card.getAttribute("data-search") || "").toLowerCase().indexOf(q) >= 0;
      card.hidden = !hit;
      if (hit) shown++;
    });
    document.getElementById("no-hits").hidden = shown > 0;
  });
})();
