
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
        
        // Send previous tab data to the API
        
        sendPreTabData(inactivePreTabInfo);
      }
      startTimer();
      if (!activeTabs[tab[0].url]) {
        activeTabs[tab[0].url] = {
          totalTime: `${hours}:${minutes}:${seconds}`,
        };
        tabdata.push(tab[0]);
       
      }
      console.log(activeTabs);

      preTab = tab[0].url;

      // Send new active tab data to the API
      console.log("userId",user.userId);
     const createTab={...tab[0],...user};
      sendCreatTabData(createTab);
      console.log(createTab);
      
    }

    if (tab[0].url === "chrome://newtab/" || tab[0].url === "") {
      if (activeTabs[preTab]) {
        stopTimer();
        activeTabs[preTab].totalTime = `${hours}:${minutes}:${seconds}`;
        console.log(preTab);
        console.log(activeTabs[preTab].totalTime);
        resetTimer();
        
        // Send previous tab data to the API
       
        
        inactivePreTabInfo = {
          "id":tab[0].id,
          "windowId":tab[0].windowId,
          "userId":user.userId,
        }

        sendPreTabData(inactivePreTabInfo);
        preTab = tab[0].url;
      }
    }
  });
});







function sendPreTabData(tabData) {
  fetch('http://192.168.0.96:8080/tabs/closedTab', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tabData),
  })
  .then(response => {
    response.json(); 
  const res=response.json();
  console.log("response from server by closed tab successfully",res);
})
  .then(data => {
    console.log(' close tab Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}


function sendCreatTabData(tabData) {
  fetch('http://192.168.0.96:8080/tabs/activeTab', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tabData),
  })
  .then(response => {
    const res=response.json()
    console.log("response from server by create tab successfully",res);
  })
  .then(data => {
    console.log('create tab Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}
