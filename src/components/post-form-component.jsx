import { postsStoreActions } from "../stores/posts-store";
import { authStore } from "../stores/auth-store";
import { renderChild } from "../utils/element";

const ID = {
  POST_CONTENT: "post-content",
  POST_FORM: "post-form",
};

class PostFormComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.addEvent();
  }

  handleAddPost() {
    const postContent = this.querySelector(`#${ID.POST_CONTENT}`);
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
    const postForm = this.querySelector(`#${ID.POST_FORM}`);
    if (event.target === postForm) {
      this.handleAddPost();
    }
  }

  addEvent() {
    this.addEventListener("submit", this.handleSubmit);
  }

  get element() {
    return (
      <form id={ID.POST_FORM} class="mb-4 bg-white rounded-lg shadow p-4">
        <textarea
          id={ID.POST_CONTENT}
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
