import { authStore, authStoreActions } from "@/stores/auth-store";
import { navigateTo } from "@/utils/router";
import { renderChild } from "../utils/element";

const getSitemap = (isLogin) => {
  const baseSitemap = [
    {
      id: "home",
      href: "/",
      label: "홈",
    },
    {
      id: "profile",
      href: "/profile",
      label: "프로필",
    },
  ];

  return isLogin
    ? [
        ...baseSitemap,
        {
          id: "logout",
          href: "/logout",
          label: "로그아웃",
        },
      ]
    : [
        ...baseSitemap,
        {
          id: "login",
          href: "/login",
          label: "로그인",
        },
      ];
};

class NavComponent extends HTMLElement {
  constructor() {
    super();
    authStore.subscribe(this.render.bind(this));
  }

  connectedCallback() {
    this.render();
    this.addEvent();
  }

  disconnectedCallback() {
    authStore.unsubscribe(this.render.bind(this));
  }

  handleNavigate(path) {
    navigateTo(path, { hash: window.isHash });
  }

  handleLogout() {
    authStoreActions.logout();
    navigateTo("/login", { hash: window.isHash });
  }

  handleClick(event) {
    const logoutButton = this.querySelector("#logout");

    Array.from([...this.querySelectorAll("a")]).forEach((el) => {
      event.preventDefault();
      const url = new URL(el.href);

      if (event.target === logoutButton) {
        this.handleLogout();
        return;
      }

      if (event.target === el) {
        this.handleNavigate(url.pathname);
        return;
      }
    });
  }

  addEvent() {
    this.addEventListener("click", this.handleClick);
  }

  get element() {
    const { isLogin } = authStore.getState();

    const checkCurrentPath = (path) => {
      const prefix = "#";
      return window.isHash
        ? window.location.hash === prefix + path
        : window.location.pathname === path;
    };

    return (
      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          {getSitemap(isLogin).map(({ id, href, label }) => (
            <li>
              <a
                id={id}
                href={href}
                class={
                  checkCurrentPath(href)
                    ? "text-blue-600 font-bold"
                    : "text-gray-600"
                }
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  render() {
    renderChild(this);
  }
}

customElements.define("nav-component", NavComponent);
