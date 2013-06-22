
function doInCurrentTab(tabCallback) {
  chrome.tabs.query(
    { currentWindow: true, active: true },
    function (tabArray) { tabCallback(tabArray[0]); }
  );
}

function openInHiddenIFrame(link){
  //console.log('Loading url ... - ' + link.url);
  //console.log('Title ... - ' + link.title);
  jQuery('#mainTitle').show();

  var iFrames = jQuery('#iFrames')[0];
  //var iframe = document.body.appendChild(document.createElement('iframe'));
  var iframe = iFrames.appendChild(document.createElement('iframe'));
  iframe.style = "display: none;";
  iframe.src = link.url;


  $('#visitedDocList').append(
      $('<li>').append(
          $('<a>').attr('href', link.url).append(
              $('<span>').attr('class', 'tab').append(link.title)
  )));   


  iframe.onload = function() {
    //console.log('Title = ' + link.title);
    //console.log('Url is loaded - ' + link.url);
    jQuery('#visitedDocList li a[href="' + link.url + '"]').parent().addClass('bulletNotDone');
    var totalLinks = jQuery('#visitedDocList li').length;
    var doneLinks = jQuery('#visitedDocList li.bulletNotDone').length;
    jQuery('#progressCtr').html('[' + doneLinks + '/' + totalLinks + ']');
    if(totalLinks == doneLinks){
      jQuery('#progressMsg').html('Visited All. Done!');
      jQuery('#doneSound')[0].play();
    }else{
      jQuery('#doneAllSound')[0].play();
    }

    //console.log(iframe.contentDocument.title);
  };
}

jQuery(function(){
  jQuery('#loginMessage').hide();
  jQuery('#visitingPagesMessage').hide();

  //console.log('pop page loaded');
  /*
  */
  doInCurrentTab(function(tab){
    chrome.tabs.sendMessage(tab.id, {action: "isLoggedIn" }, function(response) {
      //console.log('response received for isLoggedIn action');
      //console.log(response);
      if(!response.isLoggedIn){
        jQuery('#loginMessage').show();
        chrome.tabs.sendMessage(tab.id, {action: "login" }, function(response) {
          //console.log('response received for login action');
          //console.log(response);
        });
      }else{
        jQuery('#visitingPagesMessage').show();
        chrome.tabs.sendMessage(tab.id, {action: "getLinks" }, function(response) {
          //console.log('response received for getLinks action');
          //console.log(response);
          $.each(response.links, function(i, ele){
            openInHiddenIFrame(ele);
          });
        });
      }
    });
  });

});



