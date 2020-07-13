let contextMenus = {};

contextMenus.createFilter = chrome.contextMenus.create(
  {
    title: 'Remove Completed',
  },
  function () {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError.message);
    }
  }
);

const contextMenuHandler = (info, tab) => {
  if (info.menuItemId === contextMenus.createFilter) {
    chrome.tabs.executeScript({
      file: 'filter.js',
    });
  }
};

chrome.contextMenus.onClicked.addListener(contextMenuHandler);
