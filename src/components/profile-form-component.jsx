import { authStore, authStoreActions } from "@/stores/auth-store";
import { navigateTo } from "@/utils/router";
import { renderChild } from "../utils/element";

class ProfileFormComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.addEvent();
  }

  handleUpdateProfile() {
    const username = this.querySelector("#username").value;
    const email = this.querySelector("#email").value;
    const bio = this.querySelector("#bio").value;

    const user = {
      username,
      email,
      bio,
    };

    authStoreActions.updateUser(user);
    navigateTo("/profile");
  }

  handleSubmit(event) {
    event.preventDefault();
    const profileForm = this.querySelector("#profile-form");

    if (event.target === profileForm) {
      this.handleUpdateProfile();
    }
  }

  addEvent() {
    this.addEventListener("submit", this.handleSubmit.bind(this));
  }

  get element() {
    const { user } = authStore.getState();
    const { username, email, bio } = user;
    return (
      <form id="profile-form">
        <div class="mb-4">
          <label
            for="username"
            class="block text-gray-700 text-sm font-bold mb-2"
          >
            사용자 이름
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            class="w-full p-2 border rounded"
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-gray-700 text-sm font-bold mb-2">
            이메일
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            class="w-full p-2 border rounded"
          />
        </div>
        <div class="mb-6">
          <label for="bio" class="block text-gray-700 text-sm font-bold mb-2">
            자기소개
          </label>
          <textarea
            id="bio"
            name="bio"
            rows="4"
            class="w-full p-2 border rounded"
          >
            {bio}
          </textarea>
        </div>
        <button
          type="submit"
          class="w-full bg-blue-600 text-white p-2 rounded font-bold"
        >
          프로필 업데이트
        </button>
      </form>
    );
  }

  render() {
    renderChild(this, this.element);
  }
}

customElements.define("profile-form-component", ProfileFormComponent);
