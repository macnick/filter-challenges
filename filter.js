const filterChallenges = (todo = 'COMPLETED') => {
  let elements = document.getElementsByTagName('tr');
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].innerText.includes(`${todo}`)) {
      elements[i].remove();
      i--;
    }
  }
};

filterChallenges();
