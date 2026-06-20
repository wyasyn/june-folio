;(function () {
  try {
    var root = document.documentElement
    var lightThemeColor = root.dataset.themeColorLight
    var darkThemeColor = root.dataset.themeColorDark

    if (lightThemeColor && darkThemeColor) {
      var storedTheme = localStorage.getItem("theme")
      var isDark =
        storedTheme === "dark" ||
        (storedTheme !== "light" &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      var themeColor = isDark ? darkThemeColor : lightThemeColor
      var themeMeta = document.querySelectorAll('meta[name="theme-color"]')

      if (themeMeta.length) {
        themeMeta.forEach(function (meta) {
          meta.setAttribute("content", themeColor)
        })
      } else {
        var meta = document.createElement("meta")
        meta.name = "theme-color"
        meta.content = themeColor
        document.head.appendChild(meta)
      }
    }

    var fontSize = localStorage.getItem("preferences:font-size")
    if (fontSize === "small" || fontSize === "large") {
      root.setAttribute("data-font-size", fontSize)
    }

    var highContrast = localStorage.getItem("preferences:high-contrast")
    if (
      highContrast === null
        ? window.matchMedia("(prefers-contrast: more)").matches
        : highContrast === "true"
    ) {
      root.setAttribute("data-high-contrast", "")
    }

    var reduceMotion = localStorage.getItem("preferences:reduce-motion")
    if (
      reduceMotion === null
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : reduceMotion === "true"
    ) {
      root.setAttribute("data-reduce-motion", "")
    }
  } catch (e) {}
})()
