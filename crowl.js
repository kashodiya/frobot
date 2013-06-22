//console.log('jQuery 1 !!!');
//console.log(jQuery);

//jQuery("a:contains('My Profile')")
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log('message handler in crowl.js received login message.');
    if (request.action == "login"){
      sendResponse({status: 'Loading_Login_Page'});
      document.location.href = 'http://www.forrester.com/reg/login.xhtml';
    }else if(request.action == "isLoggedIn"){
      var answer = false;
      if( jQuery('#tool_settings').length > 0){
        answer = true;
      }
      sendResponse({isLoggedIn: answer});
    }else if(request.action == "goToUrl"){
      console.log('message handler in crowl.js received goToUrl message.');
      document.location.href = request.url;
    }else if(request.action == "fillLoginForm"){
      console.log('message handler in crowl.js received fillLoginForm message.');
    }else if(request.action == "getLinks"){
      console.log('message handler in crowl.js received fillLoginForm message.');
      sendResponse({links: getLinks()});
    }

  }
);



function getLinks(){
  var links = [];
  jQuery('.search_resultlist_custom h4 a').each(function(i, ele){
    console.log(ele.href);
    links.push({url: ele.href, title: jQuery(ele).text()});
  });
  return links;
}

//console.log('crowl.js is on!');

