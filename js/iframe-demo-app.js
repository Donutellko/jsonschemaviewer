(function(global) { 
    
    function init() {
    
        setupEditor();
        
        setupEvents();

    }
    
    function setupEditor() {
    
        global.jsonEditor = ace.edit("editor");
        global.jsonEditor.setTheme("ace/theme/chrome");
        global.jsonEditor.getSession().setMode("ace/mode/json");
        global.jsonEditor.setFontSize(14);

    }
    
    function setupEvents() {
        $('#visualizeButton').click(visualizeView);
    }
    
    function visualizeView() {
        
        var schema = {};
        
        try {
            schema = JSON.parse(global.jsonEditor.getValue());
        } catch (e) {
            alert(e.toString());
            return;
        }
        
        NProgress.start();

        iframe = document.querySelector("#jsonschemaviewer-iframe");
        sendToEmbed(iframe, schema);
    }

    function sendToEmbed(iframe, jsonString) {
        console.log("sendToEmbed()", jsonString)
        iframe.contentWindow.postMessage({
          json: jsonString
        }, "*");
    }
    
    /* json-stringify-safe*/
    function stringify(obj, replacer, spaces, cycleReplacer) {
  return JSON.stringify(obj, serializer(replacer, cycleReplacer), spaces)
}

    function serializer(replacer, cycleReplacer) {
  var stack = [], keys = []

  if (cycleReplacer == null) cycleReplacer = function(key, value) {
    if (stack[0] === value) return "[Circular ~]"
    return "[Circular ~." + keys.slice(0, stack.indexOf(value)).join(".") + "]"
  }

  return function(key, value) {
    if (stack.length > 0) {
      var thisPos = stack.indexOf(this)
      ~thisPos ? stack.splice(thisPos + 1) : stack.push(this)
      ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key)
      if (~stack.indexOf(value)) value = cycleReplacer.call(this, key, value)
    }
    else stack.push(value)

    return replacer == null ? value : replacer.call(this, key, value)
  }
}

    $(init);
    
})(window);