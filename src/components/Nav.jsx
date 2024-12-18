import { userStore } from "../App";
import { Link, useRouter } from "../router";
import { useStore } from "../store";

function Nav() {
  const { location } = useRouter();

  const store = useStore(userStore);
  const user = store.getState();

  const isMatchedLocation = (pathname) => {
    return location === pathname;
  };

  return (
    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li>
          <Link
            to="/"
            className={
              isMatchedLocation("/") ? "text-blue-600" : "text-gray-600"
            }
          >
            홈
          </Link>
        </li>
        <li>
          <Link
            to="/profile"
            className={
              isMatchedLocation("/profile") ? "text-blue-600" : "text-gray-600"
            }
          >
            프로필
          </Link>
        </li>
        <li>
          {user?.username ? (
            <Link
              id="logout"
              to="/logout"
              className={
                isMatchedLocation("#") ? "text-blue-600" : "text-gray-600"
              }
            >
              로그아웃
            </Link>
          ) : (
            <Link
              to="/login"
              className={
                isMatchedLocation("/login") ? "text-blue-600" : "text-gray-600"
              }
            >
              로그인
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
