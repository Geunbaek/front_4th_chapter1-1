import { userStore } from "../App";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Input from "../components/Input";
import Nav from "../components/Nav";
import { useNavigate } from "../router";
import { useState } from "../spa";
import { useStore } from "../store";

function ProfilePage() {
  const navigate = useNavigate();

  const store = useStore(userStore);
  const user = store.getState();

  if (!user?.username) {
    navigate("/login");
    return <></>;
  }

  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.bio);

  const handleChangeProfile = (e) => {
    e.preventDefault();
    const user = { username, email, bio };
    store.setState(() => user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  return (
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        <Header />
        <Nav />
        <main class="p-4">
          <div class="bg-white p-8 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
              내 프로필
            </h2>
            <form id="profile-form" onSubmit={handleChangeProfile}>
              <div class="mb-4">
                <label
                  for="username"
                  class="block text-gray-700 text-sm font-bold mb-2"
                >
                  사용자 이름
                </label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="사용자 이름"
                  value={username}
                  onChange={setUsername}
                />
              </div>
              <div class="mb-4">
                <label
                  for="email"
                  class="block text-gray-700 text-sm font-bold mb-2"
                >
                  이메일
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="이메일"
                  value={email}
                  onChange={setEmail}
                />
              </div>
              <div class="mb-6">
                <label
                  for="bio"
                  class="block text-gray-700 text-sm font-bold mb-2"
                >
                  자기소개
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows="4"
                  class="w-full p-2 border rounded"
                  value={bio}
                  onInput={(e) => setBio(e.target.value)}
                ></textarea>
              </div>
              <button
                type="submit"
                class="w-full bg-blue-600 text-white p-2 rounded font-bold"
              >
                프로필 업데이트
              </button>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default ProfilePage;
