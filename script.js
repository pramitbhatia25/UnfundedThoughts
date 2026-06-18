const indexView = document.querySelector("#index-view");
const articleView = document.querySelector("#article-view");
const navHome = document.querySelector("[data-nav-home]");
const currentCrumb = document.querySelector("[data-current-crumb]");
const crumbSeparator = currentCrumb.previousElementSibling;

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
renderRoute();
