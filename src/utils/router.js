import { HASH_ROUTE, ROUTE } from "../constant";

const EVENT = {
  HASH_CHANGE: "hashchange",
  ROUTE_CHANGE: "routeChange",
  POP_STATE: "popstate",
};

const isCompletedMiddleware = (middlewares) => {
  if (!middlewares) return true;
  const isCompleted = middlewares.every((middleware) => middleware());
  return isCompleted;
};

const navigateTo = (path, options) => {
  if (options?.hash) {
    window.location.hash = path;
    dispatchEvent(new Event(EVENT.HASH_CHANGE));
  } else {
    history.pushState(null, {}, path);
    dispatchEvent(new CustomEvent(EVENT.ROUTE_CHANGE));
  }
};

const createRouter = (root) => {
  const routeMap = new Map();
  const middlewareMap = new Map();
  let currentPath = window.location.pathname;

  const addRoute = (route, element, middlewares = []) => {
    routeMap.set(route, element);
    middlewareMap.set(route, middlewares);
    return router;
  };

  const getElement = () => {
    const path = currentPath;

    const middlewares = middlewareMap.get(path);

    if (!isCompletedMiddleware(middlewares)) {
      return;
    }

    const element =
      routeMap.get(path) ||
      routeMap.get(ROUTE.WILDCARD) ||
      document.createElement("div");

    return element();
  };

  const handleRouteChange = () => {
    currentPath = window.location.pathname;
    root.render();
  };

  const handlePopState = () => {
    handleRouteChange(window.location.pathname);
    root.render();
  };

  const init = () => {
    window.addEventListener(EVENT.POP_STATE, handlePopState);
    window.addEventListener(EVENT.ROUTE_CHANGE, handleRouteChange);
    return router;
  };

  const router = {
    addRoute,
    getElement,
    init,
  };

  return router;
};

const createHashRouter = (root) => {
  const routeMap = new Map();
  const middlewareMap = new Map();
  let currentPath = window.location.hash;

  const addRoute = (route, element, middlewares = []) => {
    const hashRoute = `${HASH_ROUTE.PREFIX}${route}`;
    routeMap.set(hashRoute, element);
    middlewareMap.set(hashRoute, middlewares);
    return router;
  };

  const getElement = () => {
    const path = currentPath;

    const middlewares = middlewareMap.get(path);

    if (!isCompletedMiddleware(middlewares)) {
      return;
    }

    const element =
      routeMap.get(path) ||
      routeMap.get(`${HASH_ROUTE.PREFIX}${ROUTE.WILDCARD}`) ||
      document.createElement("div");

    return element();
  };

  const handleRouteChange = () => {
    currentPath = window.location.hash;
    root.render();
  };

  const init = () => {
    if (currentPath === "") {
      navigateTo(ROUTE.HOME, { hash: true });
    }
    window.addEventListener(EVENT.HASH_CHANGE, handleRouteChange);
    return router;
  };

  const router = {
    addRoute,
    getElement,
    init,
  };

  return router;
};

export { createRouter, createHashRouter, navigateTo };
