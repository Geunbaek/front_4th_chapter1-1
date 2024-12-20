import { postsStore } from "../stores/posts-store";
import { renderChild } from "../utils/element";

class MainPage extends HTMLElement {
  constructor() {
    super();
    postsStore.subscribe(this.render.bind(this));
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    postsStore.unsubscribe(this.render.bind(this));
  }

  get element() {
    const posts = postsStore.getState();
    return (
      <div class="bg-gray-100 min-h-screen flex justify-center">
        <div class="max-w-md w-full">
          <header-component></header-component>
          <nav-component></nav-component>
          <main class="p-4">
            <post-form-component></post-form-component>
            <div class="flex flex-col space-y-4">
              {posts.map((post) => (
                <post-card-component {...post}></post-card-component>
              ))}
            </div>
          </main>
          <footer-component></footer-component>
        </div>
      </div>
    );
  }

  render() {
    renderChild(this);
  }
}

customElements.define("main-page", MainPage);
