SLICK.Titanium = (function() {
    // initialise the module
    var module = {
        platformExec: function(fnCall, params) {
            Ti.App.fireEvent("platformExec", GRUNT.extend({
                call: fnCall
            }, params));
        }
    };
    
    // if we are running within titanium, call the logging inside titanium
    if (typeof Ti !== 'undefined') {
        // ATTACH a logging listener to send logging messages back to base
        GRUNT.Log.requestUpdates(function(message, level) {
            Ti.API[level](message);
        });    

        // add a new message handler that will route messages through titanium
        var nativeMessaging = new SLICK.Messaging.Handler({
            id: "messagebus.titanium",
            processUpdate: function(message) {
                if (message) {
                    Ti.App.fireEvent("clientMessage", message);
                } // if
            }
        });
    } // if
    
    // register the module with the native modules
    if (typeof SLICK.Native !== 'undefined') {
        SLICK.Native.registerPlatformModule("titanium", module);
    } // if 
    
    return module;
})();

