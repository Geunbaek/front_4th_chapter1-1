import { userStore } from "../App";
import Input from "../components/Input";
import { useNavigate } from "../router";
import { useState } from "../spa";
import { useStore } from "../store";
import { setItem } from "../utils/localstorage";

function LoginPage() {
  const navigate = useNavigate();
  const store = useStore(userStore);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username) {
      return;
    }

    const user = { username, email: "", bio: "" };
    setItem("user", user);
    store.setState(() => user);

    navigate("/");
  };

  return (
    <main class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">
          항해플러스
        </h1>
        <form id="login-form" onSubmit={handleLogin}>
          <div class="mb-4">
            <Input
              id="username"
              type="text"
              placeholder="이메일 또는 전화번호"
              value={username}
              onChange={setUsername}
            />
          </div>
          <div class="mb-6">
            <Input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={setPassword}
            />
          </div>
          <button
            type="submit"
            class="w-full bg-blue-600 text-white p-2 rounded font-bold"
          >
            로그인
          </button>
        </form>
        <div class="mt-4 text-center">
          <a href="#" class="text-blue-600 text-sm">
            비밀번호를 잊으셨나요?
          </a>
        </div>
        <hr class="my-6" />
        <div class="text-center">
          <button class="bg-green-500 text-white px-4 py-2 rounded font-bold">
            새 계정 만들기
          </button>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
