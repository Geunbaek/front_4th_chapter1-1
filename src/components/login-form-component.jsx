import { authStoreActions } from "@/stores/auth-store";
import { navigateTo } from "@/utils/router";
import { renderChild } from "../utils/element";
import { ROUTE } from "../constant";

const ID = {
  USERNAME: "username",
  LOGIN_FORM: "login-form",
};

class LoginFormComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.addEvent();
  }

  handleLogin() {
    const username = this.querySelector(`#${ID.USERNAME}`).value;

    if (!username) {
      return;
    }

    navigateTo(ROUTE.HOME, { hash: window.isHash });

    const user = {
      username,
      email: "",
      bio: "",
    };

    authStoreActions.login(user);
  }

  handleSubmit(event) {
    event.preventDefault();
    const loginForm = this.querySelector(`#${ID.LOGIN_FORM}`);

    if (event.target === loginForm) {
      this.handleLogin();
    }
  }

  addEvent() {
    this.addEventListener("submit", this.handleSubmit);
  }

  get element() {
    return (
      <form id={ID.LOGIN_FORM}>
        <div class="mb-4">
          <input
            type="text"
            id={ID.USERNAME}
            name="username"
            placeholder="사용자 이름"
            class="w-full p-2 border rounded"
          />
        </div>
        <div class="mb-6">
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            class="w-full p-2 border rounded"
          />
        </div>
        <button
          role="button"
          type="submit"
          class="w-full bg-blue-600 text-white p-2 rounded font-bold"
        >
          로그인
        </button>
      </form>
    );
  }

  render() {
    renderChild(this);
  }
}

customElements.define("login-form-component", LoginFormComponent);
