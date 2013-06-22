var currentTabId = 0;

function checkForValidUrl(tabId, changeInfo, tab) {
  if (tab.url.indexOf('www.forrester.com') > -1) {
    chrome.pageAction.show(tabId);
    currentTabId = tabId;
  }
};

chrome.tabs.onUpdated.addListener(checkForValidUrl);

chrome.webRequest.onCompleted.addListener(function(req) { 
    //console.log('post was done!');
    //console.log(arguments);
    //console.log(req.method);
    if(req.method == 'POST'){
      var url = "http://www.forrester.com/reg/dataexplorer.xhtml#/reports/latest";
      chrome.tabs.sendMessage(currentTabId, {action: "goToUrl", url:  url}, function(response) {
        console.log('response received for goToUrl action');
        console.log(response);
      });
    }
  },
  { urls: ["http://www.forrester.com/reg/login.xhtml"] },
  ["responseHeaders"]
);

