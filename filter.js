const createTag = (element, classes='', text='') => {
  const tag = document.createElement(element);
  tag.setAttribute('class', classes);
  tag.innerText = text;

  return tag;
};

const createShowBtn = () => {
  const span = createTag('span', '', 'Show Completed');
  span.setAttribute('id', 'showBtnText');

  const anchorTag = createTag('a', 'nav-link show active');
  anchorTag.setAttribute('href', 'javascript: showCompleted()');

  anchorTag.appendChild(span);
  
  const showBtn = createTag('li', 'nav-item ml-auto');
  showBtn.appendChild(anchorTag);
  

  return showBtn;
};

const appendShowBtn = () => {
  let tabsNav = document.getElementsByClassName('tabs-animated-shadow tabs-animated nav')[0];

  tabsNav.appendChild(createShowBtn());
};

const filterChallenges = (todo = 'COMPLETED') => {
  let elements = document.getElementsByTagName('tr');
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].innerText.includes(`${todo}`)) {
      elements[i].style.display = "none";
      i--;
    }
  }
};

const filterProjects = (todo = 'ASSIGNMENT COMPLETED') => {
  let elements = document.getElementsByClassName('project-progress-row');
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].innerText.includes(`${todo}`)) {
      elements[i].style.display = "none";
      i--;
    }
  }
};

const injectScript = () => {
  var newScript = document.createElement("script");
  var inlineScript = document.createTextNode(`
    const showCompleted = () => {
      const actionDecider = (status, element) => {
        if (status === 'Show Completed') {
          element.removeAttribute('style');
        } else {
          element.style.display = "none";
        }
      };
      
      const elementIterator = (elements, text, status) => {
        for (let i = 0; i < elements.length; i++) {
          if (elements[i].innerText.includes(text)) {
            actionDecider(status, elements[i]);
            i--;
          }
        }  
      };
    
      let elementsTr = document.getElementsByTagName('tr');
      let elementsDiv = document.getElementsByClassName('project-progress-row');
    
      const showBtnText = document.getElementById('showBtnText');
    
      if (showBtnText.innerText === 'Show Completed') {
        showBtnText.innerText = 'Hide Completed';
    
        elementIterator(elementsDiv, 'Assignment Completed', 'Show Completed');
        elementIterator(elementsTr, 'Completed', 'Show Completed');
        elementIterator(elementsTr, 'Project completed', 'Show Completed');
      } else {
        showBtnText.innerText = 'Show Completed';
    
        elementIterator(elementsDiv, 'ASSIGNMENT COMPLETED', 'Hide Completed');
        elementIterator(elementsTr, 'COMPLETED', 'Hide Completed');
        elementIterator(elementsTr, 'PROJECT COMPLETED', 'Hide Completed');
      }  
    };
  `);
  
  newScript.appendChild(inlineScript); 
  const head = document.getElementsByTagName('head')[0];
  head.appendChild(newScript);
};

filterChallenges();
filterProjects();
appendShowBtn();
injectScript();
