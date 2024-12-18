const componentStates = new WeakMap();

let root = null;
let currentComponent = null;
let rootComponent = null;
let hookIndex = 0;

let isRendering = false;
let pendingRender = false;

const isEvent = (key) => key.startsWith("on");
const isAttribute = (key) => !isEvent(key) && key !== "children";
const isClassName = (key) => key === "className";

const createFragment = ({ children = [] }) => {
  const fragment = document.createDocumentFragment();
  fragment.isFragmentContainer = true;
  updateChildren(fragment, children);
  return fragment;
};

const updateAttributes = (element, props) => {
  const oldProps = element.props ?? {};
  Object.entries(oldProps).forEach(([key, value]) => {
    if (isClassName(key)) {
      element.removeAttribute("class");
      return;
    }

    if (isAttribute(key)) {
      element.removeAttribute(key);
      return;
    }

    if (isEvent(key)) {
      const eventType = key.toLowerCase().substring(2);
      element.removeEventListener(eventType, value);
      return;
    }
  });

  element.props = props;
  Object.entries(props ?? {}).forEach(([key, value]) => {
    if (isClassName(key)) {
      element.setAttribute("class", value);
      return;
    }

    if (isAttribute(key)) {
      element.setAttribute(key, value);
      return;
    }

    if (isEvent(key)) {
      const eventType = key.toLowerCase().substring(2);
      element.addEventListener(eventType, value);
      return;
    }
  });
};

const updateChildren = (element, children) => {
  children.forEach((child) => {
    if (Array.isArray(child)) {
      updateChildren(element, child);
    } else if (typeof child === "string" || typeof child === "number") {
      element.append(document.createTextNode(child));
    } else if (child !== null && child !== undefined) {
      element.append(child);
    }
  });
};

const scheduleRerender = () => {
  if (isRendering) {
    pendingRender = true;
    return;
  }

  performRerender();
};

const performRerender = () => {
  isRendering = true;
  try {
    const newElement = createElement(rootComponent, rootComponent.props);
    reconcile(root, root.firstChild, newElement);
  } finally {
    isRendering = false;
    if (pendingRender) {
      requestAnimationFrame(() => {
        pendingRender = false;
        performRerender();
      });
    }
  }
};

const useState = (initialState) => {
  if (!componentStates.has(currentComponent)) {
    componentStates.set(currentComponent, []);
  }

  const states = componentStates.get(currentComponent);
  const stateIndex = hookIndex++;

  if (states[stateIndex] === undefined) {
    states[stateIndex] = initialState;
  }

  const setState = (nextState) => {
    if (isRendering) {
      requestAnimationFrame(() => {
        const prevState = states[stateIndex];
        const newState =
          typeof nextState === "function" ? nextState(prevState) : nextState;

        if (prevState !== newState) {
          states[stateIndex] = newState;
          scheduleRerender();
        }
      });
      return;
    }

    const prevState = states[stateIndex];
    const newState =
      typeof nextState === "function" ? nextState(prevState) : nextState;

    if (prevState !== newState) {
      states[stateIndex] = newState;
      scheduleRerender();
    }
  };

  return [states[stateIndex], setState];
};

const createElement = (type, props, ...children) => {
  if (typeof type === "function") {
    const prevComponent = currentComponent;
    currentComponent = type;

    if (!rootComponent) {
      rootComponent = type;
      rootComponent.props = props;
    }

    hookIndex = 0;
    const element = type({ ...props, children });

    currentComponent = prevComponent;
    return element;
  }

  const element = document.createElement(type);
  updateAttributes(element, props);
  updateChildren(element, children.flat());

  return element;
};

const createRoot = (container) => {
  root = container;

  const render = (element) => {
    reconcile(root, root.firstChild, element);
  };

  return {
    render,
  };
};

const reconcile = (parent, prevElement, nextElement) => {
  if (!prevElement && nextElement) {
    if (nextElement.isFragmentContainer) {
      Array.from(nextElement.childNodes).forEach((child) => {
        parent.appendChild(child);
      });
    } else {
      parent.appendChild(nextElement);
    }
    return;
  }

  if (prevElement && !nextElement) {
    parent.removeChild(prevElement);
    return;
  }

  if (
    prevElement &&
    nextElement &&
    (prevElement.isFragmentContainer || nextElement.isFragmentContainer)
  ) {
    const prevChildren = prevElement.isFragmentContainer
      ? Array.from(prevElement.childNodes)
      : [prevElement];
    const nextChildren = nextElement.isFragmentContainer
      ? Array.from(nextElement.childNodes)
      : [nextElement];

    const maxLength = Math.max(prevChildren.length, nextChildren.length);

    for (let i = 0; i < maxLength; i++) {
      reconcile(parent, prevChildren[i], nextChildren[i]);
    }
    return;
  }

  if (
    prevElement.nodeType !== nextElement.nodeType ||
    prevElement.nodeName !== nextElement.nodeName
  ) {
    parent.replaceChild(nextElement, prevElement);
    return;
  }

  if (prevElement.nodeType === Node.TEXT_NODE) {
    if (prevElement.textContent !== nextElement.textContent) {
      prevElement.textContent = nextElement.textContent;
    }
    return;
  }

  updateAttributes(prevElement, nextElement.props);

  const prevChildren = Array.from(prevElement.childNodes);
  const nextChildren = Array.from(nextElement.childNodes);
  const maxLength = Math.max(prevChildren.length, nextChildren.length);

  for (let i = 0; i < maxLength; i++) {
    reconcile(prevElement, prevChildren[i], nextChildren[i]);
  }
};

export { createFragment, createElement, createRoot, useState };
