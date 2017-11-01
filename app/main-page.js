/**
 * Do you actually have a file called 'main-view-model.js' in the same
 * folder as this file? In any case, it's not used in your example code
 * so I commented it out.
 */
//var vmModule = require("./main-view-model");
var webViewModule = require("ui/web-view");

/**
 * Here you are creating a NEW webview. If you want to, you can create
 * element dynamically and then attach them to the view. However, in your
 * example you already have a webview in your xml file so there's no need
 * to create a new one.
 */
//var webView = new webViewModule.WebView();

function pageLoaded(args) {
    var page = args.object;
    /**
     * Corrected the line below. What you're doing here is pretty
     * much equal to $('#webView') in jQuery. You're selecting
     * an element
     */
    var web = page.getViewById("webView");
    //var web = page.getViewById(webViewModule.WebView,"webView");
    web.src = "https://www.youtube.com/user/brickbuilder23";
    web.src = "https://www.instagram.com/gabrielrufian/";
    web.src = "https://twitter.com/kabi_rules";
    
}
exports.pageLoaded = pageLoaded;