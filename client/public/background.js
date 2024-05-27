importScripts('timer.js','onUpdateTab.js','onActiveTab.js');
  

inactivePreTabInfo1 = {};
inactivePreTabInfo = {};

tabdata=[];
activeTabs={}
user={"userId": "42f252dc-4652-4030-9a5c-a6c5c444bac0"};

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




