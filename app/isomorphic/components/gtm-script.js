import { useEffect } from "react";
import { useSelector } from "react-redux";
import get from "lodash/get";

const getScript = gtmId => {
  return (function(w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({
      "gtm.start": new Date().getTime(),
      event: "gtm.js"
    });
    var f = d.getElementsByTagName(s)[0];
    var j = d.createElement(s);
    var dl = l !== "dataLayer" ? "&l=" + l : "";
    j.async = true;
    j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
    f.parentNode.insertBefore(j, f);
  })(window, document, "script", "dataLayer", gtmId);
};

export const LoadGtmSscritp = () => {
  const gtm = useSelector(state => get(state, ["qt", "config", "publisher-attributes", "google_tag_manager"], {}));
  useEffect(() => {
    setTimeout(() => {
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.children = getScript(gtm.id);
      document.getElementsByTagName("head")[0].appendChild(script);
    }, 1500);
  });
  return null;
};
