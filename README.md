This is a fork from `navneethg` that allows to use his viewer within an iframe. 



### Live Demo
https://donutellko.github.io/jsonschemaviewer/iframe-demo

### Instructions
Write a JSON schema (refs supported) in the editor and click 'Visualize' to visualize it using a collapsible tree.
This project as of now is simply a rip off of https://github.com/jlblcc/json-schema-viewer with reduced functionality. Will rewrite soon.

### Integration

Firstly create an iframe:

```html
<iframe id="jsonschemaviewer-iframe" width="100%" height="512pt"
        src="https://<username>.github.io/jsonschemaviewer/iframe.html"></iframe>
```

And then use this code on the parent page to visualize the `schema` json.

```javascript
iframe = document.querySelector("#jsonschemaviewer-iframe");
sendToEmbed(iframe, schemaJsonString);

function sendToEmbed(iframe, jsonString) {
    console.log("sendToEmbed()", jsonString)
    iframe.contentWindow.postMessage({
      json: jsonString
    }, "*");
}
```