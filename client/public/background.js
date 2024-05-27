importScripts('timer.js','onUpdateTab.js','onActiveTab.js');
  

inactivePreTabInfo = {};
tabdata=[];
activeTabs={}
user={"userId": "513a3660-257d-45f9-94eb-5e51d5cdfbaf"};

let hours = 0;
let minutes = 0;
let seconds = 0;
let preTab = "";
let preTab2 = "";

console.log(activeTabs);

chrome.windows.onRemoved.addListener((windowId) => {
  console.log(preTab);
  // chrome.storage.local.set({ preTab: preTab }).then(() => {
  //   console.log("Value is set", preTab);
  // });
});

chrome.windows.onCreated.addListener((window) => {
  console.log(preTab);
  // chrome.storage.local.get(["preTab"]).then((result) => {
  //   console.log("Value is " + result.preTab);
  // });
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  
  console.log(message.data);
  // console.log(sender);
  // console.log(sendResponse);
  chrome.runtime.sendMessage({ action: "sendDataToPopup", data:tabdata });
});




