
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
         console.log("first previous tab data",inactivePreTabInfo)
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

      inactivePreTabInfo = {
        "id":tab[0].id,
        "windowId":tab[0].windowId,
        "userId":user.userId,
      }




      // Send new active tab data to the API
      // console.log("userId",user.userId);
     const createTab={...tab[0],...user};
      sendCreatTabData(createTab);
      // console.log(createTab);
      
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
        console.log("second pretabinfo",inactivePreTabInfo)
        
        sendPreTabData(inactivePreTabInfo);


        preTab = tab[0].url;
      }
    }
  });
});







function sendPreTabData(tabData) {
  console.log(tabData);
  fetch('http://13.233.68.11:8080/tabs/closedTab', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tabData),
  })
  .then(response => {
    const contentType = response.headers.get('Content-Type');
    
    if (contentType && contentType.includes('application/json')) {
      return response.json().then(data => ({ data, contentType }));
    } else {
      return response.text().then(data => ({ data, contentType }));
    }
  })
  .then(({ data, contentType }) => {
    if (contentType && contentType.includes('application/json')) {
      console.log('Close tab Success (JSON):', data);
    } else {
      console.log('Close tab Success (Non-JSON):', data);
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}



function sendCreatTabData(tabData) {
  console.log(tabData);
  fetch('http://13.233.68.11:8080/tabs/activeTab', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tabData),
  })
  .then(response => {
    const contentType = response.headers.get('Content-Type');
    
    if (contentType && contentType.includes('application/json')) {
      return response.json().then(data => ({ data, contentType }));
    } else {
      return response.text().then(data => ({ data, contentType }));
    }
  })
  .then(({ data, contentType }) => {
    if (contentType && contentType.includes('application/json')) {
      console.log('create tab Success (JSON):', data);
    } else {
      console.log('create tab Success (Non-JSON):', data);
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

