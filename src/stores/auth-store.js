import { getItem, removeItem, setItem } from "@/utils/storage";
import { createStore } from "@/utils/store";
import { navigateTo } from "../utils/router";
import { ROUTE } from "../constant";

const USER_STORE_KEY = "user";

const user = getItem(USER_STORE_KEY);

const initialState = {
  isLogin: user ? true : false,
  user,
};

const authStore = createStore(initialState);

const authStoreActions = {
  login: (user) => {
    setItem(USER_STORE_KEY, user);
    authStore.setState({ isLogin: true, user });
  },
  logout: () => {
    removeItem(USER_STORE_KEY);
    authStore.setState({ isLogin: false, user: null });
  },
  updateUser: (user) => {
    setItem(USER_STORE_KEY, user);
    authStore.setState((prev) => ({ ...prev, user }));
  },
};

const authGuardMiddleware = () => {
  const { isLogin } = authStore.getState();

  if (!isLogin) {
    navigateTo(ROUTE.LOGIN, { hash: window.isHash });
    return false;
  }

  return true;
};

const guestGuardMiddleware = () => {
  const { isLogin } = authStore.getState();

  if (isLogin) {
    navigateTo(ROUTE.HOME, { hash: window.isHash });
    return false;
  }

  return true;
};

export {
  authStore,
  authStoreActions,
  authGuardMiddleware,
  guestGuardMiddleware,
};
