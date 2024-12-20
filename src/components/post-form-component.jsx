import { postsStoreActions } from "../stores/posts-store";
import { authStore } from "../stores/auth-store";
import { renderChild } from "../utils/element";

class PostFormComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.addEvent();
  }

  handleAddForm() {
    const postContent = this.querySelector("#post-content");
    const { user, isLogin } = authStore.getState();

    if (!isLogin) {
      alert("로그인이 필요합니다.");
      return;
    }

    postsStoreActions.addPost({
      name: user.username,
      createdAt: "1분 전",
      content: postContent.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const postForm = this.querySelector("#post-form");
    if (event.target === postForm) {
      this.handleAddForm();
    }
  }

  addEvent() {
    this.addEventListener("submit", this.handleSubmit);
  }

  get element() {
    return (
      <form id="post-form" class="mb-4 bg-white rounded-lg shadow p-4">
        <textarea
          id="post-content"
          class="w-full p-2 border rounded"
          placeholder="무슨 생각을 하고 계신가요?"
        ></textarea>
        <button
          type="submit"
          class="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
        >
          게시
        </button>
      </form>
    );
  }

  render() {
    renderChild(this);
  }
}

customElements.define("post-form-component", PostFormComponent);
