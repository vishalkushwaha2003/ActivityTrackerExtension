//on update tabs events
chrome.tabs.onUpdated.addListener((p, t, tab2) => {
 
    if (tab2.url != "chrome://newtab/" && preTab != tab2.url) {
      if (preTab != "" && activeTabs[preTab]) {
        tabdata.push(tab2);
        stopTimer();
        activeTabs[preTab].totalTime = `${hours}:${minutes}:${seconds}`;
        console.log(preTab);
        console.log(activeTabs[preTab].totalTime);
        resetTimer();
      }
  
      if (tab2.active && tab2.windowId !== chrome.windows.WINDOW_ID_NONE) {
        startTimer();
        if (!activeTabs[tab2.url]) {
          activeTabs[tab2.url] = {
            totalTime: `${hours}:${minutes}:${seconds}`,
          };
        }
      }
      console.log(activeTabs);
      preTab = tab2.url;
    }
  });
  