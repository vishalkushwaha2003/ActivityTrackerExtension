chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    const dataToSend = { hiii: "vishal" };
    console.log(message.data);
    chrome.runtime.sendMessage({ action: "sendDataToPopup", data: dataToSend });
  });
  
  //on acctive tab listener
  chrome.tabs.onActivated.addListener(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
      if (
        tab[0].url != "chrome://newtab/" &&
        tab[0].url != "" &&
        preTab != tab[0].url
      ) {
        if (preTab != "" && activeTabs[preTab]) {
          stopTimer();
          activeTabs[preTab].totalTime = `${hours}:${minutes}:${seconds}`;
          console.log(preTab);
          console.log(activeTabs[preTab].totalTime);
          resetTimer();
        }
        startTimer();
        if (!activeTabs[tab[0].url]) {
          activeTabs[tab[0].url] = {
            totalTime: `${hours}:${minutes}:${seconds}`,
          };
        }
        console.log(activeTabs);
        preTab = tab[0].url;
      }
  
      if (tab[0].url === "chrome://newtab/" || tab[0].url === "") {
        if (activeTabs[preTab]) {
          stopTimer();
          activeTabs[preTab].totalTime = `${hours}:${minutes}:${seconds}`;
          console.log(preTab);
          console.log(activeTabs[preTab].totalTime);
          resetTimer();
          preTab = tab[0].url;
        }
      }
    });
  });
  