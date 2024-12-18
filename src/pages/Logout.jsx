import { userStore } from "../App";
import { Navigate } from "../router";
import { useStore } from "../store";

function LogoutPage() {
  const store = useStore(userStore);

  localStorage.removeItem("user");
  store.setState(() => {});

  return <Navigate to="/" />;
}

export default LogoutPage;
