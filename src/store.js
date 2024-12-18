import { useState } from "./spa";

function createStore(initialState = {}) {
  let state = initialState;
  const listeners = new Set();

  function getState() {
    return state;
  }

  function setState(nextState) {
    const prevState = state;
    state =
      typeof nextState === "function"
        ? nextState(prevState)
        : { ...prevState, ...nextState };

    notify();
  }

  function subscribe(listener) {
    listeners.add(listener);
  }

  function unsubcribe(listener) {
    listeners.delete(listener);
  }

  function notify() {
    listeners.forEach((listener) => listener());
  }

  return {
    state,
    getState,
    setState,
    subscribe,
    unsubcribe,
  };
}

const useStore = (store) => {
  const [, forceUpdate] = useState({});

  const handleRender = () => {
    const nextState = store.getState();
    forceUpdate(nextState);
  };

  store.subscribe(handleRender);

  return store;
};

export { createStore, useStore };
