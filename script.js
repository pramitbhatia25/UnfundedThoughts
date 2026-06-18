const indexView = document.querySelector("#index-view");
const articleView = document.querySelector("#article-view");
const navHome = document.querySelector("[data-nav-home]");
const currentCrumb = document.querySelector("[data-current-crumb]");
const crumbSeparator = currentCrumb.previousElementSibling;
const copyLinkButton = document.querySelector("[data-copy-link]");
let copiedTimer;

function renderRoute() {
  const isArticle = window.location.hash === "#post/itch-to-startup";

  indexView.hidden = isArticle;
  articleView.hidden = !isArticle;
  if (isArticle) {
    navHome.removeAttribute("aria-current");
    currentCrumb.hidden = false;
    crumbSeparator.hidden = false;
  } else {
    navHome.setAttribute("aria-current", "page");
    currentCrumb.hidden = true;
    crumbSeparator.hidden = true;
  }
  document.title = isArticle
    ? "The Itch to Startup - Unfunded Thoughts"
    : "Unfunded Thoughts";
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", renderRoute);

copyLinkButton.addEventListener("click", async () => {
  const articleUrl = new URL("#post/itch-to-startup", window.location.href).href;

  try {
    if (!navigator.clipboard) {
      throw new Error("Clipboard API unavailable");
    }
    await navigator.clipboard.writeText(articleUrl);
  } catch {
    const textArea = document.createElement("textarea");
    textArea.value = articleUrl;
    textArea.setAttribute("readonly", "");
    textArea.style.position = "fixed";
    textArea.style.top = "-999px";
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    textArea.remove();
  }

  copyLinkButton.classList.add("copied");
  window.clearTimeout(copiedTimer);
  copiedTimer = window.setTimeout(() => {
    copyLinkButton.classList.remove("copied");
  }, 1400);
});

renderRoute();
