chrome.tabs.executeScript( {
  code: "window.getSelection().toString();"
}, function(selection) {
  var x = selection[0];
  var text = document.getElementById('text');
  text.value += x;
  // This is where we need to send the string to google docs.
});
