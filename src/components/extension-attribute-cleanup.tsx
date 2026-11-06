/**
 * Development only. Some browser extensions stamp attributes such as
 * `bis_skin_checked` onto the server-rendered HTML before React hydrates, and
 * React then reports a hydration mismatch that the application did not cause.
 *
 * This inline script removes only those named attributes until hydration has
 * finished. It does not suppress hydration warnings, so a mismatch in the
 * application's own markup is still reported. Production builds do not check
 * attributes during hydration, so the script is not rendered there.
 */
const cleanupScript = `(function () {
  var names = ["bis_skin_checked", "bis_register", "cz-shortcut-listen"];
  function foreign(name) {
    return names.indexOf(name) !== -1 || name.indexOf("__processed_") === 0;
  }
  function clean(element) {
    for (var i = element.attributes.length - 1; i >= 0; i--) {
      var name = element.attributes[i].name;
      if (foreign(name)) element.removeAttribute(name);
    }
  }
  var observer = new MutationObserver(function (records) {
    for (var i = 0; i < records.length; i++) {
      var record = records[i];
      if (record.type === "attributes") {
        if (foreign(record.attributeName) && record.target.hasAttribute(record.attributeName))
          record.target.removeAttribute(record.attributeName);
        continue;
      }
      for (var j = 0; j < record.addedNodes.length; j++) {
        var node = record.addedNodes[j];
        if (node.nodeType !== 1) continue;
        clean(node);
        var nested = node.querySelectorAll("*");
        for (var k = 0; k < nested.length; k++) clean(nested[k]);
      }
    }
  });
  observer.observe(document.documentElement, {
    attributes: true,
    childList: true,
    subtree: true,
  });
  // Hydration starts before the load event. Stop shortly after it so the
  // extensions are left alone once React no longer compares the markup.
  window.addEventListener("load", function () {
    setTimeout(function () {
      observer.disconnect();
    }, 3000);
  });
})();`;

export default function ExtensionAttributeCleanup() {
  if (process.env.NODE_ENV !== "development") return null;
  return <script dangerouslySetInnerHTML={{ __html: cleanupScript }} />;
}
