self.skipWaiting();
self.addEventListener("install", () => {});
self.addEventListener("activate", (evt) => {
  evt.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((e) => !e.endsWith(VERSION))
            .map((key) => caches.delete(key))
        )
      )
      .then(() => {
        clients.claim();
        self.skipWaiting();
      })
  );
});
const retry = async (retries = 0, req) => {
  try {
    return await fetch(
      req,
      req.url.startsWith(SITE_URL) ? {} : { mode: "no-cors" }
    );
  } catch (_) {
    if (retries > 0) return retry(retries - 1, req);
  }
};

const cacheFirst = async (e, cacheName, isRetry /* , expiration */) => {
  try {
    const req = e.request;
    const Cache = await caches.open(cacheName);
    const match = await Cache.match(req.url);
    if (match) return match;
    let res;
    if (isRetry) res = await retry(5, req);
    else
      res = await fetch(
        req,
        req.url.startsWith(SITE_URL) ? {} : { mode: "no-cors" }
      );
    if ((res && res.ok) || (res && !req.url.startsWith(SITE_URL))) {
      const clone = res.clone();
      await Cache.put(req.url, clone);
    }
    return res;
  } catch (_) {
    return Response.error();
  }
};

const NetworkFirst = async (e, cacheName) => {
  const req = e.request;
  const Cache = await caches.open(cacheName);
  try {
    const res = await fetch(
      req,
      req.url.startsWith(SITE_URL) ? {} : { mode: "no-cors" }
    );
    if ((res && res.ok) || (res && !req.url.startsWith(SITE_URL))) {
      const clone = res.clone();
      Cache.put(req.url, clone);
    }
    return res;
  } catch (_) {
    const match = await Cache.match(req.url);
    if (match) return match;
    return Response.error();
  }
};
async function fetchAndCacheIfOk(req, Cache) {
  try {
    const response = await fetch(
      req,
      req.url.startsWith(SITE_URL) ? {} : { mode: "no-cors" }
    );
    if (
      (response && response.ok) ||
      (response && !req.url.startsWith(SITE_URL))
    ) {
      const res = response.clone();
      await Cache.put(req.url, res);
    }
    return response;
  } catch (_) {
    return Response.error();
  }
}
const StaleWhileRevalidate = async (e, cacheName) => {
  const req = e.request;
  const Cache = await caches.open(cacheName);
  const match = await Cache.match(req.url);
  if (!!match) {
    fetchAndCacheIfOk(req, Cache);
    return match;
  } else return fetchAndCacheIfOk(req, Cache);
};
self.addEventListener("fetch", async (evt) => {
  const url = evt.request.url;
  if (evt.request?.method === "GET" && url.indexOf(SITE_URL + "/api/") === -1) {
    let staticNext = url.indexOf("/_next/static") > -1;
    let prefetch = url.indexOf("?_rsc=");
    let publicJS = /^https:\/\/almuqarn\.pages\.dev\/.+\.js$/;
    let publicCSS = /^https:\/\/almuqarn\.pages\.dev\/.+\.(?:css|less)$/;
    let glocalAssets = /\/(manifest.json)/;
    if (staticNext)
      evt.respondWith(cacheFirst(evt, `next-static-${VERSION}`, true));
    else if (publicJS.test(url))
      evt.respondWith(cacheFirst(evt, `public-JS-${VERSION}`, true));
    else if (publicCSS.test(url))
      evt.respondWith(cacheFirst(evt, `public-CSS-${VERSION}`, true));
    else if (glocalAssets.test(url))
      evt.respondWith(cacheFirst(evt, `glocal-assets-${VERSION}`, true));
    else if (/^https:\/\/fonts\.gstatic\.com\/.*/i.test(url))
      evt.respondWith(cacheFirst(evt, `google-fonts-static-${VERSION}`, true));
    else if (/^https:\/\/fonts\.googleapis\.com\/.*/i.test(url))
      evt.respondWith(StaleWhileRevalidate(evt, `google-fonts-${VERSION}`));
    else if (/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i.test(url))
      evt.respondWith(cacheFirst(evt, `static-image-${VERSION}`, true));
    else if (/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i.test(url))
      evt.respondWith(cacheFirst(evt, `static-font-${VERSION}`, true));
    else if (/\.(?:css|less)$/i.test(url))
      evt.respondWith(StaleWhileRevalidate(evt, `static-style-${VERSION}`));
    else if (prefetch && evt.request.headers.get("rsc") == "1")
      evt.respondWith(StaleWhileRevalidate(evt, `pages-prefetch-${VERSION}`));
    else if (
      evt.request.destination === "document" &&
      evt.request.headers.get("accept")?.indexOf("text/html") !== -1
    )
      evt.respondWith(NetworkFirst(evt, `pages-${VERSION}`));
  }
});
