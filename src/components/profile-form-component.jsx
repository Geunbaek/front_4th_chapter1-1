import { authStore, authStoreActions } from "@/stores/auth-store";
import { renderChild } from "../utils/element";

const ID = {
  PROFILE_FORM: "profile-form",
  USERNAME: "username",
  EMAIL: "email",
  BIO: "bio",
};

class ProfileFormComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.addEvent();
  }

  handleUpdateProfile() {
    const username = this.querySelector(`#${ID.USERNAME}`).value;
    const email = this.querySelector(`#${ID.EMAIL}`).value;
    const bio = this.querySelector(`#${ID.BIO}`).value;

    const user = {
      username,
      email,
      bio,
    };

    authStoreActions.updateUser(user);
  }

  handleSubmit(event) {
    event.preventDefault();
    const profileForm = this.querySelector(`#${ID.PROFILE_FORM}`);

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
      <form id={ID.PROFILE_FORM}>
        <div class="mb-4">
          <label
            for="username"
            class="block text-gray-700 text-sm font-bold mb-2"
          >
            사용자 이름
          </label>
          <input
            type="text"
            id={ID.USERNAME}
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
            id={ID.EMAIL}
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
            id={ID.BIO}
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
