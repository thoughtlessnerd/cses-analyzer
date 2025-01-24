chrome.runtime.onInstalled.addListener(function () {
  chrome.tabs.onActivated.addListener(async (info) => {
    const tab = await chrome.tabs.get(info.tabId);
    const isCSES = tab.url.startsWith("https://cses.fi/problemset/");
    console.log(isCSES);
    isCSES ? chrome.action.enable(tab.tabId) : chrome.action.disable(tab.tabId);
  });
});

chrome.commands.onCommand.addListener((shortcut) => {
  console.log('lets reload');
  console.log(shortcut);
  if(shortcut.includes("+M")) {
      chrome.runtime.reload();
  }
})