(function setupPublisherChange() {
  const PUBLISHER_KEY = "malibu_docs_publisher_name";
  function publisherEntered(input) {
    const publisherName = input || "";
    localStorage.setItem(PUBLISHER_KEY, publisherName);
    document.querySelectorAll("#main-content span[data-editor-path]").forEach(function (span) {
      if (publisherName) {
        var path = "https://" + publisherName + ".quintype.com" + span.getAttribute("data-editor-path");
        span.innerHTML = '<a href="' + path + '" target="_blank" rel="noopener">' + path + '</a>';
      } else {
        span.innerHTML = span.getAttribute("data-editor-path");
        span.onclick = (e) => e.target === span && document.querySelectorAll("#main-content #publisher-name").forEach(i => i.focus());
      }
    })
  }
  const initialPublisher = localStorage.getItem(PUBLISHER_KEY) || "";
  publisherEntered(initialPublisher);
  document.querySelectorAll("#main-content #publisher-name").forEach(function (input) {
    input.value = initialPublisher;
    input.onchange = () => publisherEntered(input.value);
  })
})();


document.querySelectorAll("#main-content a").forEach(function (link) {
  if (link.href.startsWith("/") || link.href.startsWith(location.origin)) {
  } else {
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener");
  }
})
