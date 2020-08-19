const createTag = (element, classes = "", text = "") => {
  const tag = document.createElement(element);
  tag.setAttribute("class", classes);
  tag.innerText = text;

  return tag;
};

const createShowBtn = () => {
  const span = createTag("span", "", "Show Completed");
  span.setAttribute("id", "showBtnText");

  const anchorTag = createTag("a", "nav-link show active");

  anchorTag.appendChild(span);

  const showBtn = createTag("li", "nav-item ml-auto");
  showBtn.appendChild(anchorTag);

  return showBtn;
};

const appendShowBtn = () => {
  let tabsNav = document.getElementsByClassName(
    "tabs-animated-shadow tabs-animated nav"
  )[0];

  tabsNav.appendChild(createShowBtn());
};

const filterChallenges = (todo = "COMPLETED") => {
  let url = window.location.href;
  let elements;
  if (url.endsWith("progress")) {
    elements = document.getElementsByTagName("tr");
  } else {
    elements = document.getElementsByClassName("project-progress-row");
  }
  if (todo === "COMPLETED") {
    [...elements].forEach((el) => {
      if (el.innerText.includes(`${todo}`)) {
        el.style.display = "none";
      }
    });
  } else {
    [...elements].forEach((el) => el.removeAttribute("style"));
  }

  let label = todo === "COMPLETED" ? "Show Completed" : "Hide Completed";
};

const toggleFilter = () => {
  const btn = document.getElementById("showBtnText");
  let text = btn.innerText;
  let filter;
  text.startsWith("Show") ? (filter = "") : (filter = "COMPLETED");
  filterChallenges(filter);
  btn.innerText = text.startsWith("Show") ? "Hide Completed" : "Show Completed";
};

filterChallenges();
appendShowBtn();

showBtnText = document.getElementById("showBtnText");
showBtnText.addEventListener("click", toggleFilter);
