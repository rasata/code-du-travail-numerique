import Router from "next/router";

export function initPiwik({
  siteId,
  piwikUrl,
  jsTrackerFile = "matomo.js",
  phpTrackerFile = "matomo.php",
}) {
  window._paq = window._paq || [];
  if (!piwikUrl) {
    return;
  }
  let previousPath = "";
  // order is important -_- so campaign are detected
  matopush(["trackPageView"]);
  matopush(["enableLinkTracking"]);
  matopush(["setTrackerUrl", `${piwikUrl}/${phpTrackerFile}`]);
  matopush(["setSiteId", siteId]);

  /**
   * for intial loading we use the location.pathname
   * as the first url visited.
   * Once user navigate accross the site,
   * we rely on Router.pathname
   */

  const scriptElement = document.createElement("script");
  const refElement = document.getElementsByTagName("script")[0];
  scriptElement.type = "text/javascript";
  scriptElement.async = true;
  scriptElement.defer = true;
  scriptElement.src = `${piwikUrl}/${jsTrackerFile}`;
  refElement.parentNode.insertBefore(scriptElement, refElement);
  previousPath = location.pathname;

  Router.events.on("routeChangeStart", (path) => {
    // We use only the part of the url without the querystring to ensure piwik is happy
    // It seems that piwik doesn't track well page with querystring
    const [pathname] = path.split("?");

    if (previousPath) {
      matopush(["setReferrerUrl", `${previousPath}`]);
    }
    matopush(["setCustomUrl", pathname]);
    matopush(["deleteCustomVariables", "page"]);
    previousPath = pathname;
  });

  Router.events.on("routeChangeComplete", () => {
    // In order to ensure that the page title had been updated,
    // we delayed pushing the tracking to the next tick.
    setTimeout(() => {
      const { q } = Router.query;
      matopush(["setDocumentTitle", document.title]);
      if (/^\/recherche/.test(previousPath) && q) {
        matopush(["trackSiteSearch", q]);
      } else {
        matopush(["trackPageView"]);
      }
      matopush(["enableLinkTracking"]);
    }, 0);
  });
}

export function matopush(args) {
  if (window && window._paq) {
    window._paq.push(args);
  }
}
