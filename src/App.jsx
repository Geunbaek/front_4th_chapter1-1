import ErrorPage from "./pages/Error";
import LoginPage from "./pages/Login";
import LogoutPage from "./pages/Logout";
import MainPage from "./pages/Main";
import ProfilePage from "./pages/Profile";
import { BrowserRouter } from "./router";
import { createRoot } from "./spa";
import { createStore } from "./store";
import { getItem } from "./utils/localstorage";

const router = [
  {
    path: "/",
    element: () => <MainPage />,
  },
  {
    path: "/profile",
    element: () => <ProfilePage />,
  },
  {
    path: "/login",
    element: () => <LoginPage />,
  },
  {
    path: "/logout",
    element: () => <LogoutPage />,
  },
  {
    path: "*",
    element: () => <ErrorPage />,
  },
];

export const userStore = createStore(getItem("user") || {});

function App() {
  return <BrowserRouter router={router} />;
}

const root = createRoot(document.getElementById("root"));
root.render(<App />, document.getElementById("root"));
