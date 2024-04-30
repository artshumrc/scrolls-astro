import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import 'string-width';
import './chunks/astro_NCwqR3DN.mjs';
import 'clsx';
import { compile } from 'path-to-regexp';

if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return toPath;
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    })
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    ...serializedManifest,
    assets,
    componentMetadata,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"","routes":[{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/scrolls-astro/_astro/bibliography.DCwqtMQs.css"}],"routeData":{"route":"/","type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/scrolls-astro/_astro/bibliography.DCwqtMQs.css"}],"routeData":{"route":"/houghton-library","type":"page","pattern":"^\\/houghton-library\\/?$","segments":[[{"content":"houghton-library","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/houghton-library.astro","pathname":"/houghton-library","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":".article-body[data-astro-cid-2n3mgbdh] p[data-astro-cid-2n3mgbdh]{font-size:16px;font-weight:400;padding-left:48px;text-indent:-48px}\n"},{"type":"external","src":"/scrolls-astro/_astro/bibliography.DCwqtMQs.css"}],"routeData":{"route":"/bibliography","type":"page","pattern":"^\\/bibliography\\/?$","segments":[[{"content":"bibliography","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/bibliography.astro","pathname":"/bibliography","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":".search-page[data-astro-cid-3oce3ml3]{min-height:500px;padding:100px}#search[data-astro-cid-3oce3ml3]{margin-top:60px}\n"},{"type":"external","src":"/scrolls-astro/_astro/bibliography.DCwqtMQs.css"}],"routeData":{"route":"/scrolls","type":"page","pattern":"^\\/scrolls\\/?$","segments":[[{"content":"scrolls","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/scrolls/index.astro","pathname":"/scrolls","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/scrolls-astro/_astro/bibliography.DCwqtMQs.css"}],"routeData":{"route":"/scrolls/[...slug]","type":"page","pattern":"^\\/scrolls(?:\\/(.*?))?\\/?$","segments":[[{"content":"scrolls","dynamic":false,"spread":false}],[{"content":"...slug","dynamic":true,"spread":true}]],"params":["...slug"],"component":"src/pages/scrolls/[...slug].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/scrolls-astro/_astro/bibliography.DCwqtMQs.css"}],"routeData":{"route":"/intro","type":"page","pattern":"^\\/intro\\/?$","segments":[[{"content":"intro","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/intro.astro","pathname":"/intro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://artshumrc.github.io","base":"/scrolls-astro","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/runner/work/scrolls-astro/scrolls-astro/src/pages/bibliography.astro",{"propagation":"none","containsHead":true}],["/home/runner/work/scrolls-astro/scrolls-astro/src/pages/houghton-library.astro",{"propagation":"none","containsHead":true}],["/home/runner/work/scrolls-astro/scrolls-astro/src/pages/intro.astro",{"propagation":"none","containsHead":true}],["/home/runner/work/scrolls-astro/scrolls-astro/src/pages/scrolls/[...slug].astro",{"propagation":"none","containsHead":true}],["/home/runner/work/scrolls-astro/scrolls-astro/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/home/runner/work/scrolls-astro/scrolls-astro/src/pages/scrolls/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var r=(i,c,s)=>{let n=async()=>{await(await i())()},t=new IntersectionObserver(e=>{for(let o of e)if(o.isIntersecting){t.disconnect(),n();break}});for(let e of s.children)t.observe(e)};(self.Astro||(self.Astro={})).visible=r;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:src/pages/houghton-library@_@astro":"pages/houghton-library.astro.mjs","\u0000@astro-page:src/pages/bibliography@_@astro":"pages/bibliography.astro.mjs","\u0000@astro-page:src/pages/scrolls/index@_@astro":"pages/scrolls.astro.mjs","\u0000@astro-page:src/pages/scrolls/[...slug]@_@astro":"pages/scrolls/_---slug_.astro.mjs","\u0000@astro-page:src/pages/intro@_@astro":"pages/intro.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000empty-middleware":"_empty-middleware.mjs","/src/pages/houghton-library.astro":"chunks/pages/houghton-library_VQv13_Bi.mjs","/src/pages/intro.astro":"chunks/pages/intro_MurZ_fXq.mjs","\u0000@astrojs-manifest":"manifest_IuImfUYo.mjs","astro:scripts/before-hydration.js":""},"assets":[]});

export { manifest };
