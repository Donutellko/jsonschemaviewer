(function(global) {

    function init() {
        console.log("init")
        setupListener()
    }

    function setupListener() {
        console.log("setupListener")
        function displayMessage (evt) {
            console.log("received data from parent frame", evt)
            visualizeView(evt.data.json)
        }

        if (window.addEventListener) {
            // For standards-compliant web browsers
            window.addEventListener("message", displayMessage, false);
        }
        else {
            window.attachEvent("onmessage", displayMessage);
        }
    }
    
    function visualizeView(schema) {
        if (typeof schema === 'string' || schema instanceof String) {
            schema = JSON.parse(schema)
        }
        console.log("Going to visualize", schema)

        NProgress.start();

        $('#waiting-label').css('display', 'none');
        $('#main-body').empty();

        $RefParser.dereference(schema).then(function(resolvedSchema) {
              //Prevent circular references.
              resolvedSchema = JSON.parse(stringify(resolvedSchema));
              JSV.init({
                plain: true,
                schema: resolvedSchema,
                viewerHeight: $('#main-body').height(),
                viewerWidth: $('#main-body').width()
            }, function() {
                $('#jsv-tree').css('width', '100%');
                JSV.resizeViewer();
            });
            NProgress.done();
        }).catch(function(err) {
            alert(err);
            NProgress.done();
        });
        
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
