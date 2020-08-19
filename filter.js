const createTag = (element, classes = "", text = "") => {
  const tag = document.createElement(element);
  tag.setAttribute("class", classes);
  tag.innerText = text;

  return tag;
};

const createShowBtn = (label) => {
  // const span = createTag("span", "", "Show Completed");
  const span = createTag("span", "", label);
  span.setAttribute("id", "showBtnText");

  const anchorTag = createTag("a", "nav-link show active");
  let arg = label === "Show Completed" ? "SHOW" : "COMPLETED";
  // anchorTag.setAttribute("href", `javascript: filterChallenges(${arg})`);

  anchorTag.appendChild(span);

  const showBtn = createTag("li", "nav-item ml-auto");
  showBtn.appendChild(anchorTag);

  return showBtn;
};

const appendShowBtn = (label) => {
  let tabsNav = document.getElementsByClassName(
    "tabs-animated-shadow tabs-animated nav"
  )[0];

  tabsNav.appendChild(createShowBtn(label));
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
  appendShowBtn(label);
};

const toggleFilter = () => {
  const btn = document.getElementById("showBtnText");
  let text = btn.innerText;
  alert(text);
};

filterChallenges();
// appendShowBtn();

showBtnText = document.getElementById("showBtnText");
showBtnText.addEventListener("click", toggleFilter);
