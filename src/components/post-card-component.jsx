import { renderChild } from "../utils/element";

const ATTRIBUTE = {
  NAME: "name",
  CREATED_AT: "createdAt",
  CONTENT: "content",
};

class PostCardComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  get element() {
    const name = this.getAttribute(ATTRIBUTE.NAME);
    const createdAt = this.getAttribute(ATTRIBUTE.CREATED_AT);
    const content = this.getAttribute(ATTRIBUTE.CONTENT);

    return (
      <div class="bg-white rounded-lg shadow p-4">
        <div class="flex items-center mb-2">
          <img
            src="https://via.placeholder.com/40"
            alt="프로필"
            class="rounded-full mr-2"
          />
          <div>
            <p class="font-bold">{name}</p>
            <p class="text-sm text-gray-500">{createdAt}</p>
          </div>
        </div>
        <p>{content}</p>
        <div class="mt-2 flex justify-between text-gray-500">
          <button>좋아요</button>
          <button>댓글</button>
          <button>공유</button>
        </div>
      </div>
    );
  }

  render() {
    renderChild(this);
  }
}

customElements.define("post-card-component", PostCardComponent);
