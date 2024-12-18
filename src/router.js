import { createElement } from "./spa";
import { createStore, useStore } from "./store";

const routerStore = createStore({
  location: window.location.pathname,
  navigate: null,
});

const matchPath = (pattern, path) => {
  const paramNames = [];
  const regexPattern = pattern
    .replace(/:[^/]+/g, (match) => {
      paramNames.push(match.slice(1));
      return "([^/]+)";
    })
    .replace(/\*/g, ".*");

  const regex = new RegExp(`^${regexPattern}$`);
  const match = path.match(regex);

  if (!match) return null;

  const params = {};
  paramNames.forEach((name, index) => {
    params[name] = match[index + 1];
  });

  return params;
};

export function useRouter() {
  const store = useStore(routerStore);
  return store.getState();
}

export function useNavigate() {
  const store = useStore(routerStore);
  const { navigate } = store.getState();
  return navigate;
}

export function BrowserRouter({ router }) {
  const store = useStore(routerStore);

  const { location, navigate } = store.getState();

  if (!navigate) {
    store.setState((prev) => ({
      ...prev,
      navigate: (to) => {
        window.history.pushState({}, "", to);
        store.setState((prev) => ({ ...prev, location: to }));
      },
    }));

    window.addEventListener("popstate", () => {
      const newLocation = window.location.pathname;
      store.setState((prev) => ({ ...prev, location: newLocation }));
    });
  }

  for (const route of router) {
    const params = matchPath(route.path, location);
    if (params) {
      const element = createElement(route.element);
      return element;
    }
  }

  return null;
}

export function Navigate({ to }) {
  const navigate = useNavigate();

  navigate(to);

  return null;
}

export function Link({ to, children, ...props }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(to);
  };

  return createElement(
    "a",
    {
      href: to,
      onClick: handleClick,
      ...props,
    },
    children,
  );
}
